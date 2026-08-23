import { existsSync, readFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import type { KnowledgeGraph, KGNode } from '../kg/types.ts';
import { evalExpr } from '../kg/parse.ts';
import type { BoardSourceRef, GeneratedHandler, GeneratedPromPalettePlan, GeneratedRamPalettePlan, GeneratedVideoPlan } from '../ir/board.ts';
import { MameAstIndex, parseMameAst, splitMameArgs, type MameFunction } from './ast.ts';
import { normalizeMameExecutionSource } from './cpu-compiler.ts';
import { compileMameHandler } from './handler-ir.ts';

export interface CompiledMameVideo {
  plan: GeneratedVideoPlan;
  handlers: GeneratedHandler[];
}

const TILEMAP_FRAMEWORK_HEADER = 'src/emu/tilemap.h';

export function compileMameVideo(
  graph: KnowledgeGraph,
  mameSrc: string,
  machineId: string,
): CompiledMameVideo | undefined {
  const fail = (reason: string): undefined => {
    if (process.env.MAMEKIT_DEBUG_VIDEO === '1') console.error(`video compiler: ${reason}`);
    return undefined;
  };
  const machine = graph.nodes.find(node => node.id === machineId);
  if (!machine) return fail(`missing machine ${machineId}`);
  const driver = graph.meta.driverFile;
  const driverStem = basename(driver).replace(/\.cpp$/, '');
  const driverDir = dirname(driver);
  const candidates = graph.nodes
    .filter(node => node.label === 'SourceFile')
    .map(node => String(node.props.path));
  candidates.push(
    driver,
    join(driverDir, `${driverStem}.h`),
    join(driverDir, `${driverStem}_v.cpp`),
    join(driverDir, `${driverStem}_a.cpp`),
  );
  const files: string[] = [];
  for (const candidate of candidates) {
    const resolved = [
      candidate,
      join(driverDir, candidate),
    ].find(file => existsSync(join(mameSrc, file)));
    if (!resolved || files.includes(resolved)) continue;
    files.push(resolved);
    if (/\.h(?:pp)?$/.test(resolved)) {
      for (const suffix of ['.cpp', '_v.cpp', '_a.cpp']) {
        const implementation = resolved.replace(/\.h(?:pp)?$/, suffix);
        if (existsSync(join(mameSrc, implementation)) && !files.includes(implementation)) {
          files.push(implementation);
        }
      }
    }
  }
  if (!files.includes(driver) && existsSync(join(mameSrc, driver))) files.push(driver);
  const ast = new MameAstIndex(parseMameAst(
    [...new Set(files)].map(file => ({ file, source: readFileSync(join(mameSrc, file), 'utf8') })),
  ));
  const source = [...new Set(files)]
    .map(file => readFileSync(join(mameSrc, file), 'utf8'))
    .join('\n');
  const regionBindings = sourceRegionBindings(source);
  // MAME's tilemap framework header is part of the vocabulary driver video code
  // uses: TILEMAP_DRAW_LAYERn, TILE_FLIPYX and kin are declared there, not in
  // the driver. Driver constants take precedence over framework ones.
  const constants: Record<string, number> = {
    // Device input-line constants live in the emulator framework rather than
    // most driver translation units, but driver-init methods assign them to
    // board state (for example Double Dragon selects NMI for its sprite CPU).
    INPUT_LINE_NMI: -1,
    INPUT_LINE_RESET: -2,
    INPUT_LINE_IRQ0: 0,
    ...sourceNumericConstants(readFileSync(join(mameSrc, TILEMAP_FRAMEWORK_HEADER), 'utf8')),
    ...sourceNumericConstants(source),
  };
  const memberDefaults = sourceMemberDefaults(source, constants);
  const machineIds = machineConfigClosure(graph, machineId);
  const screenCallback = graph.nodes.find(node =>
    node.label === 'Callback' &&
    node.props.signal === 'set_screen_update');
  const screenClass = String(screenCallback?.props.targetClass ?? machine.props.cls);
  const screenMethod = String(screenCallback?.props.targetMethod ?? '');
  const screen = ast.findFunctionInHierarchy(screenClass, screenMethod)
    ?? ast.ast.units.flatMap(unit => unit.functions)
      .find(candidate => candidate.name === screenMethod);
  if (screenClass === 'vector_device' && screenMethod === 'video_output_update') {
    const dvg = /\bDVG\s*\(\s*config\s*,\s*(m_\w+)[^)]*\)[\s\S]*?\1\s*->\s*set_memory\s*\([^,]+,[^,]+,\s*(0x[\da-f]+|\d+)\s*\)/i
      .exec(source);
    if (dvg) {
      let doneInput: NonNullable<GeneratedVideoPlan['vector']>['doneInput'];
      for (const port of source.matchAll(
        /PORT_START\s*\(\s*"([^"]+)"\s*\)([\s\S]*?)(?=PORT_START\s*\(|INPUT_PORTS_END)/g,
      )) {
        const done = /PORT_BIT\s*\(\s*(0x[\da-f]+|\d+)\s*,\s*(IP_ACTIVE_LOW|IP_ACTIVE_HIGH)[^)]*\)\s*PORT_READ_LINE_DEVICE_MEMBER\s*\(\s*"dvg"\s*,\s*FUNC\s*\(\s*dvg_device::done_r\s*\)\s*\)/i
          .exec(port[2]!);
        if (!done) continue;
        doneInput = {
          port: port[1]!,
          mask: Number(done[1]),
          activeLow: done[2] === 'IP_ACTIVE_LOW',
        };
        break;
      }
      const config = ast.findFunction(String(machine.props.cls), String(machine.props.name));
      return {
        plan: {
          gfx: [],
          tilemaps: [],
          initialState: memberDefaults,
          vector: {
            type: 'DVG',
            memoryBase: Number(dvg[2]),
            coordinateBits: 10,
            ...(doneInput ? { doneInput } : {}),
          },
          ...(config ? { source: sourceRef(config) } : {}),
        },
        handlers: [],
      };
    }
  }
  if (
    screen?.body.includes('video_update_common(bitmap, cliprect,') &&
    source.includes('void taitosj_state::draw_layers()') &&
    source.includes('m_gfxdecode->gfx(m_colorbank[0] & 0x08 ? 2 : 0)->transpen') &&
    source.includes('void taitosj_state::draw_sprites(bitmap_ind16 &bitmap)') &&
    source.includes('copyscrollbitmap_trans(bitmap, m_layer_bitmap[which]')
  ) {
    const handlers: GeneratedHandler[] = [];
    addHandlerClosure(handlers, ast, [
      `${screen.className}.${screen.name}`,
      `${screen.className}.video_update_common`,
      `${screen.className}.draw_layers`,
      `${screen.className}.draw_sprites`,
    ], constants);
    return {
      plan: {
        gfx: [],
        ...(Object.keys(regionBindings).length ? { regionBindings } : {}),
        tilemaps: [],
        initialState: memberDefaults,
        source: sourceRef(screen),
      },
      handlers,
    };
  }
  // Sega Vic Dual boards draw characters from CPU-writable character RAM and
  // therefore intentionally have no GFXDECODE table. Preserve the source
  // screen handler and its ROM-region binding so the runtime's source-shaped
  // direct executor can reproduce that dynamic raster.
  if (
    screen?.body.includes('m_videoram[offs]') &&
    screen.body.includes('m_characterram[offs]') &&
    screen.body.includes('m_palette_bank << 3') &&
    screen.body.includes('color_prom[offs]')
  ) {
    return {
      plan: {
        gfx: [],
        ...(Object.keys(regionBindings).length ? { regionBindings } : {}),
        tilemaps: [],
        initialState: memberDefaults,
        source: sourceRef(screen),
      },
      handlers: [],
    };
  }
  if (
    screen?.body.includes('uint8_t const *const source = &m_videoram[y]') &&
    screen.body.includes('source[(x / 2) * 256]') &&
    screen.body.includes('m_palette->pen_color(m_paletteram[x])')
  ) {
    return {
      plan: {
        gfx: [],
        ...(Object.keys(regionBindings).length ? { regionBindings } : {}),
        tilemaps: [],
        initialState: memberDefaults,
        source: sourceRef(screen),
      },
      handlers: [],
    };
  }
  // A screen-update entry point may select between source-defined renderers
  // (Tutankham dispatches to its Scramble and bootleg bitmap paths). Probe the
  // directly called methods as well as the entry point; a bitmap plan is valid
  // only when one of those source bodies proves the packed-memory geometry.
  const bitmapCandidates = screen
    ? [
        screen,
        ...calledSourceMethods(screen.body)
          .map(name => ast.findFunctionInHierarchy(screen.className, name))
          .filter((fn): fn is MameFunction => Boolean(fn)),
      ]
    : [];
  const bitmap = bitmapCandidates
    .map(candidate =>
      compilePackedPaletteBitmap(graph, ast, source, constants, candidate) ??
      compileDirectBitmap(graph, candidate.className, candidate.name, candidate))
    .find((candidate): candidate is NonNullable<GeneratedVideoPlan['bitmap']> =>
      Boolean(candidate)) ?? compileCrtcPackedBitmap(graph, ast, source, constants);
  if (bitmap) {
    const scale = Number(constants.GALAXIAN_XSCALE ?? 1);
    return {
      plan: {
        gfx: [],
        ...(Object.keys(regionBindings).length ? { regionBindings } : {}),
        tilemaps: [],
        initialState: memberDefaults,
        bitmap,
        ...(scale !== 1 ? { renderScale: { x: scale, y: 1 } } : {}),
        source: bitmap.source,
      },
      handlers: [],
    };
  }
  const config = ast.findFunction(String(machine.props.cls), String(machine.props.name));
  if (!config) return fail(`missing config source ${String(machine.props.cls)}::${String(machine.props.name)}`);
  const configFunctions = [...machineIds]
    .map(id => graph.nodes.find(node => node.id === id))
    .filter((node): node is KGNode => Boolean(node))
    .map(node => ast.findFunction(String(node.props.cls), String(node.props.name)))
    .filter((fn): fn is MameFunction => Boolean(fn));
  const startMatch = configFunctions
    .map(fn => /MCFG_VIDEO_START_OVERRIDE\s*\(\s*(\w+)\s*,\s*(\w+)\s*\)/.exec(fn.body))
    .find((match): match is RegExpExecArray => Boolean(match));
  const start = startMatch
    // MCFG may spell the selected derived driver class even when the
    // VIDEO_START_MEMBER implementation is inherited from its base class
    // (pengo_state selects pacman_state::video_start_pacman).
    ? ast.findFunctionInHierarchy(startMatch[1]!, `video_start_${startMatch[2]}`)
    : ast.findFunctionInHierarchy(String(machine.props.cls), 'video_start');
  if (!start && !screen) {
    return fail(`missing video_start and screen update for ${String(machine.props.cls)}`);
  }

  const decodes = effectiveGfxDecodes(graph, machineId);
  if (!decodes.length) return fail(`missing gfx decode in machine composition`);
  const decodeBindings = compileDecodeBindings(graph, machineIds);
  const renderScale = gfxRenderScale(graph, machineId);
  const numericDefaults = numericState(memberDefaults);
  const configState = machineConfigInitialState(ast, source, config, constants);
  const game = graph.nodes.find(node => node.label === 'Game');
  const boardSpecificState = compileCps1GameConfig(
    source,
    String(game?.props.name ?? ''),
    constants,
  );
  const driverInit = ast.findFunctionInHierarchy(
    String(machine.props.cls),
    String(game?.props.init ?? ''),
  );
  const driverInitState = driverInit
    ? methodInitialState(ast, driverInit, { ...constants, ...numericDefaults })
    : {};
  const allocatedState = start
    ? allocatedVideoState(ast, start, { ...constants, ...numericDefaults })
    : {};
  const lifecycleArrays = start ? staticNumericArrays(start.body, constants) : {};
  const tilemaps = start
    ? compileTilemaps(
        start,
        { ...constants, ...numericDefaults, ...configState, ...driverInitState },
        ast,
      )
      .filter((tilemap, index, all) =>
        all.findIndex(candidate => candidate.member === tilemap.member) === index)
    : [];
  // Some boards allocate temporary bitmaps in video_start and render decoded
  // gfx into them directly (Mat Mania is the common example).  A video_start
  // with no tilemap is therefore still a valid source-derived video plan when
  // the selected screen handler exists; the generated runtime supplies the
  // temporary bitmap and copy primitives used by that handler.
  if (start && !tilemaps.length && !screen) return fail(`video_start emitted no tilemaps`);
  // FUNC() in an inherited video_start often names the selected derived
  // state even though the TILE_GET_INFO implementation lives on its base.
  // Store the declaring-class key used by the compiled handler registry.
  const executableTilemaps = tilemaps.map(tilemap => ({
    ...tilemap,
    tileInfo: resolvedHandlerKey(ast, tilemap.tileInfo),
    mapper: tilemap.mapper.startsWith('TILEMAP_SCAN_')
      ? tilemap.mapper
      : resolvedHandlerKey(ast, tilemap.mapper),
  }));
  const handlers: GeneratedHandler[] = [];
  const delegates = compileInitDelegates(
    ast,
    String(machine.props.cls),
    String(game?.props.init ?? ''),
  );
  const roots = [
    ...executableTilemaps.flatMap(tilemap => [tilemap.mapper, tilemap.tileInfo]),
    ...(screen ? [`${screen.className}.${screen.name}`] : []),
    ...Object.values(delegates).filter((target): target is string => target !== null),
  ];
  addHandlerClosure(handlers, ast, roots, constants, String(machine.props.cls));
  const bankedBackground = compileBankedBackground(handlers);
  const updateMode = handlers.some(handler =>
    handler.body?.includes('cliprect.max_y - 1') &&
    handler.body.includes('sprite') &&
    handler.body.includes('transpen'))
    ? 'scanline' as const
    : undefined;
  const gfx = decodes.flatMap(decode => {
    const binding = decodeBindings.get(String(decode.props.name));
    return graph.edges
      .filter(edge => edge.from === decode.id && edge.rel === 'HAS_ENTRY')
      .map(edge => graph.nodes.find(node => node.id === edge.to))
      .filter((node): node is KGNode => Boolean(node))
      .map(entry => {
      const layoutEdge = graph.edges.find(edge => edge.from === entry.id && edge.rel === 'USES_LAYOUT');
      const layout = layoutEdge && graph.nodes.find(node => node.id === layoutEdge.to);
      if (!layout) throw new Error(`${machineId}: gfx entry ${entry.id} has no layout`);
      return {
        region: String(entry.props.region),
        offset: Number(entry.props.offset),
        ...(entry.props.ram ? { ram: true } : {}),
        ...(binding?.decodeMember ? { decodeMember: binding.decodeMember } : {}),
        ...(binding?.paletteMember ? { paletteMember: binding.paletteMember } : {}),
        colorBase: Number(entry.props.colorBase),
        colorCount: Number(entry.props.colorCount),
        xscale: Number(entry.props.xscale ?? 1),
        yscale: Number(entry.props.yscale ?? 1),
        layout: {
          width: Number(layout.props.width),
          height: Number(layout.props.height),
          total: layout.props.total as number | string,
          planes: Number(layout.props.planes),
          planeOffsets: layout.props.planeOffsets as (number | string)[],
          xOffsets: layout.props.xOffsets as (number | string)[],
          yOffsets: layout.props.yOffsets as (number | string)[],
          charIncrement: Number(layout.props.charIncrement),
        },
      };
    });
  });
  const paletteMembers = [...new Set(
    [...decodeBindings.values()].map(binding => binding.paletteMember),
  )];
  const palettes = paletteMembers.length > 1
    ? compileNamedPalettes(graph, ast, source, constants, paletteMembers)
    : [];
  const palette = palettes.length
    ? undefined
    : (
      compilePalette(graph, machineIds, ast, source, constants) ??
      compileBuiltinPromPalette(graph, machineIds, mameSrc, constants)
    );
  const pointerBindings = palette
    ? sourceAssignedRegionPointers(ast, palette, constants)
    : { bindings: {}, offsets: {} };
  Object.assign(regionBindings, pointerBindings.bindings);
  // A palette_device with no init callback colors CPU-writable palette RAM
  // through the set_format converter named in the machine configuration.
  const ramPalette = palette || palettes.length
    ? undefined
    : (
      compileSetFormatRamPalette(
        graph,
        machineIds,
        mameSrc,
        ast,
        String(machine.props.cls),
        constants,
      ) ?? compileHandlerRamPalette(
        graph,
        machineIds,
        ast,
        constants,
      ) ?? compileDriverManagedPalette(
        graph,
        machineIds,
        source,
        constants,
      )
    );
  if (!palette && !ramPalette && palettes.length !== paletteMembers.length) {
    return fail(`palette callback did not lower`);
  }
  const colorTables = compileVideoColorTables(source, constants);
  const lfsrTable = compileVideoLfsr(ast, String(machine.props.cls), constants);
  const needsClassDefaults = renderScale !== 1 ||
    Object.keys(delegates).length > 0 ||
    Boolean(lfsrTable);

  return {
    plan: {
      ...(updateMode ? { updateMode } : {}),
      gfx,
      ...(Object.keys(regionBindings).length ? { regionBindings } : {}),
      ...(Object.keys(pointerBindings.offsets).length
        ? { regionBindingOffsets: pointerBindings.offsets }
        : {}),
      ...(palette ? { palette } : {}),
      ...(palettes.length ? { palettes } : {}),
      ...(ramPalette ? { ramPalette } : {}),
      tilemaps: executableTilemaps,
      initialState: {
        ...arrayState(memberDefaults),
        ...(needsClassDefaults ? memberDefaults : {}),
        ...configState,
        ...(start
          ? initialState(start.body, { ...constants, ...numericDefaults })
          : {}),
        ...lifecycleArrays,
        ...allocatedState,
        ...driverInitState,
        ...boardSpecificState,
      },
      ...(renderScale !== 1 ? { renderScale: { x: renderScale, y: 1 } } : {}),
      ...(bankedBackground ? { bankedBackground } : {}),
      ...(Object.keys(delegates).length ? { delegates } : {}),
      ...(Object.keys(colorTables).length ? { colorTables } : {}),
      ...(lfsrTable ? { lfsrTable } : {}),
      source: sourceRef(start ?? screen!),
    },
    handlers,
  };
}

function compileCps1GameConfig(
  source: string,
  game: string,
  constants: Record<string, number>,
): Record<string, unknown> {
  if (!game || !source.includes('static const struct CPS1config cps1_config_table[]')) {
    return {};
  }
  const row = source.split('\n').find(line =>
    new RegExp(`^\\s*\\{\\s*"${game.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"\\s*,`)
      .test(line));
  if (!row) return {};
  const start = row.indexOf('{');
  const end = row.lastIndexOf('}');
  if (start < 0 || end <= start) return {};
  const entry = splitMameArgs(row.slice(start + 1, end));
  const cpsbName = entry[1]?.trim();
  const mapperName = entry[2]?.trim();
  if (!cpsbName || !mapperName) return {};

  const macro = new RegExp(`^\\s*#define\\s+${cpsbName}\\s+(.+)$`, 'm').exec(source)?.[1]
    ?.replace(/__not_applicable__/g, '-1,-1,-1,-1,-1,-1,-1');
  const mapper = new RegExp(`^\\s*#define\\s+${mapperName}\\s+(.+)$`, 'm')
    .exec(source)?.[1];
  if (!macro || !mapper) return {};
  const fields = splitMameArgs(macro);
  const mapperFields = splitMameArgs(mapper);
  if (fields.length < 13 || mapperFields.length < 2) return {};
  const number = (value: string | undefined): number => {
    if (!value) return 0;
    const evaluated = evalExpr(value.trim(), constants);
    return typeof evaluated === 'number' && Number.isFinite(evaluated)
      ? evaluated
      : Number(value) || 0;
  };
  const array = (value: string | undefined): number[] => {
    const body = value?.trim().replace(/^\{/, '').replace(/\}$/, '') ?? '';
    return splitMameArgs(body).map(number);
  };
  const tableName = mapperFields[1]!.trim();
  const tableBody = new RegExp(
    `static\\s+const\\s+struct\\s+gfx_range\\s+${tableName}\\s*\\[\\s*\\]\\s*=\\s*\\{([\\s\\S]*?)\\n\\};`,
  ).exec(source)?.[1] ?? '';
  const bankMapper = [...tableBody.matchAll(/\{([^{}]+)\}/g)]
    .map(match => splitMameArgs(match[1]!))
    .filter(values => values.length >= 1)
    .map(values => ({
      type: number(values[0]),
      start: number(values[1]),
      end: number(values[2]),
      bank: number(values[3]),
    }));

  return {
    m_game_config: {
      name: game,
      cpsb_addr: number(fields[0]),
      cpsb_value: number(fields[1]),
      mult_factor1: number(fields[2]),
      mult_factor2: number(fields[3]),
      mult_result_lo: number(fields[4]),
      mult_result_hi: number(fields[5]),
      unknown1: number(fields[6]),
      unknown2: number(fields[7]),
      unknown3: number(fields[8]),
      layer_control: number(fields[9]),
      priority: array(fields[10]),
      palette_control: number(fields[11]),
      layer_enable_mask: array(fields[12]),
      bank_sizes: array(mapperFields[0]),
      bank_mapper: bankMapper,
      in2_addr: number(entry[3]),
      in3_addr: number(entry[4]),
      out2_addr: number(entry[5]),
      bootleg_kludge: number(entry[6]),
    },
  };
}

/**
 * Some boards allocate a plain palette_device and rebuild its pens directly
 * from board video RAM during screen update.  There is no set_format callback
 * to lower: the source-compiled set_pen_color calls are the converter.  Emit
 * the writable palette surface they target and let those handlers own colors.
 */
function compileDriverManagedPalette(
  graph: KnowledgeGraph,
  machineIds: Set<string>,
  source: string,
  constants: Record<string, number>,
): GeneratedRamPalettePlan | undefined {
  if (!/m_palette\s*->\s*set_pen_color\s*\(/.test(source)) return undefined;
  const deviceIds = new Set(graph.edges
    .filter(edge => machineIds.has(edge.from) && edge.rel === 'HAS_DEVICE')
    .map(edge => edge.to));
  const palette = graph.nodes.find(node =>
    deviceIds.has(node.id) && node.label === 'Device' && node.props.type === 'PALETTE');
  if (!palette) return undefined;
  const raw = ((palette.props.config as string[] | undefined) ?? []).join('\n');
  const entries = Math.max(0, ...[...raw.matchAll(/(?:\.|->)set_entries\s*\(\s*([^)]+)\)/g)]
    .map(match => expressionNumber(match[1], constants)));
  if (!entries) return undefined;
  return {
    tag: String(palette.props.tag),
    entries,
    bytesPerEntry: 2,
    channels: [
      { channel: 'r', bits: 4, shift: 8 },
      { channel: 'g', bits: 4, shift: 4 },
      { channel: 'b', bits: 4, shift: 0 },
    ],
    ...(palette.props.sourceFile ? {
      source: {
        file: String(palette.props.sourceFile),
        line: Number(palette.props.sourceLine ?? 1),
        column: Number(palette.props.sourceColumn ?? 1),
      },
    } : {}),
  };
}

/**
 * Lower boards whose palette RAM handler supplies the extra address-wired
 * color bit and then calls a palNbit-based color helper (Midway MCR is the
 * canonical circuit). The executable handler remains authoritative for each
 * write; this plan supplies the palette surface used by generated gfx.
 */
function compileHandlerRamPalette(
  graph: KnowledgeGraph,
  machineIds: Set<string>,
  ast: MameAstIndex,
  constants: Record<string, number>,
): GeneratedRamPalettePlan | undefined {
  const deviceIds = new Set(graph.edges
    .filter(edge => machineIds.has(edge.from) && edge.rel === 'HAS_DEVICE')
    .map(edge => edge.to));
  const devices = graph.nodes.filter(node =>
    deviceIds.has(node.id) && node.label === 'Device' && node.props.type === 'PALETTE');
  if (!devices.length) return undefined;
  const raw = devices.flatMap(device =>
    (device.props.config as string[] | undefined) ?? []).join('\n');
  // A derived config can patch the base palette's entry count (Spy Hunter
  // extends MCR's 64 RAM colors with four hard-wired alpha pens). Preserve
  // the largest reachable declaration rather than the first base setter.
  const entries = Math.max(0, ...[...raw.matchAll(/(?:\.|->)set_entries\s*\(\s*([^)]+)\)/g)]
    .map(match => expressionNumber(match[1], constants)));
  if (!entries) return undefined;

  const initialColors: { pen: number; color: number }[] = [];
  for (const callback of raw.matchAll(/\.set_init\s*\(\s*FUNC\(\s*(\w+)::(\w+)\s*\)\s*\)/g)) {
    const fn = ast.findFunctionInHierarchy(callback[1]!, callback[2]!);
    if (!fn) continue;
    for (const call of findCallArgumentLists(fn.body, 'palette.set_pen_color')) {
      const args = splitMameArgs(call);
      if (args.length !== 2) continue;
      const pen = expressionNumber(args[0], constants);
      const rgb = findCallArguments(args[1]!, 'rgb_t');
      if (!rgb) continue;
      const components = splitMameArgs(rgb).map(component =>
        expressionNumber(component, constants));
      if (components.length !== 3) continue;
      const [red, green, blue] = components;
      initialColors.push({
        pen,
        color: (0xff000000 | (blue! & 0xff) << 16 | (green! & 0xff) << 8 | (red! & 0xff)) >>> 0,
      });
    }
  }

  const ranges = graph.nodes.filter(node =>
    node.label === 'AddressRange' && typeof node.props.share === 'string');
  for (const range of ranges) {
    const write = graph.edges.find(edge => edge.from === range.id && edge.rel === 'WRITES');
    const writeHandler = write && graph.nodes.find(node => node.id === write.to);
    if (!writeHandler) continue;
    const writeBody = String(writeHandler.props.sourceBody ?? '');
    const helperName = /\b(\w+)\s*\(\s*offset\s*\/\s*2\s*,\s*data\s*\|\s*\(\s*\(\s*offset\s*&\s*1\s*\)\s*<<\s*\d+\s*\)\s*\)/
      .exec(writeBody)?.[1];
    if (!helperName || !writeBody.includes('m_paletteram[offset] = data')) continue;
    const helper = graph.nodes.find(node =>
      node.label === 'Handler' && node.props.method === helperName && node.props.sourceBody);
    if (!helper) continue;
    const helperBody = String(helper.props.sourceBody);
    const colorCall = findCallArguments(helperBody, 'set_pen_color');
    if (!colorCall) continue;
    const colorArgs = splitMameArgs(colorCall);
    if (colorArgs.length !== 4 || colorArgs[0]?.trim() !== 'index') continue;
    const components = colorArgs.slice(1);
    const channelNames = ['r', 'g', 'b'] as const;
    const channels = components.map((component, index) => {
      const match = /pal(\d+)bit\s*\(\s*data\s*>>\s*(\d+)\s*\)/.exec(component);
      return match ? {
        channel: channelNames[index]!,
        bits: Number(match[1]),
        shift: Number(match[2]),
      } : undefined;
    });
    if (channels.some(channel => !channel)) continue;
    return {
      tag: String(range.props.share),
      entries,
      bytesPerEntry: 1,
      channels: channels as GeneratedRamPalettePlan['channels'],
      ...(initialColors.length ? { initialColors } : {}),
      ...(helper.props.sourceFile ? {
        source: {
          file: String(helper.props.sourceFile),
          line: Number(helper.props.sourceLine ?? 1),
          column: Number(helper.props.sourceColumn ?? 1),
        },
      } : {}),
    };
  }
  return undefined;
}

/**
 * Extract finder bindings whose C++ member name cannot safely be inferred
 * from the ROM tag. Only region_ptr declarations are included; device and
 * shared-memory finders have separate runtime binding paths.
 */
export function sourceRegionBindings(source: string): Record<string, string> {
  /** member -> declared array extent (0 for a scalar region_ptr). */
  const regionMembers = new Map<string, number>();
  for (const match of source.matchAll(
    /\b(?:required|optional)_region_ptr(_array)?\s*<[^;{}]*?(?:,\s*(\d+)\s*)?>\s+(m_\w+)\b/g,
  )) {
    regionMembers.set(match[3]!, match[1] ? Number(match[2] ?? 0) : 0);
  }
  const bindings: Record<string, string> = {};
  for (const match of source.matchAll(
    /\b(m_\w+)\s*\(\s*\*this\s*,\s*"([^"]+)"\s*(?:,\s*(\d+)U?\s*)?\)/g,
  )) {
    const extent = regionMembers.get(match[1]!);
    if (extent === undefined) continue;
    if (!extent) {
      bindings[match[1]!] = match[2]!;
      continue;
    }
    // Array finder with a printf tag pattern: m_adpcm_rom(*this, "adpcm%u", 1U)
    const start = Number(match[3] ?? 0);
    for (let index = 0; index < extent; index++) {
      bindings[`${match[1]}[${index}]`] = match[2]!.replace('%u', String(start + index));
    }
  }
  // Array finder with explicit tags: m_rom(*this, {"a", "b"})
  for (const match of source.matchAll(
    /\b(m_\w+)\s*\(\s*\*this\s*,\s*\{([^}]*)\}\s*\)/g,
  )) {
    const extent = regionMembers.get(match[1]!);
    if (!extent) continue;
    [...match[2]!.matchAll(/"([^"]+)"/g)].forEach((tagMatch, index) => {
      bindings[`${match[1]}[${index}]`] = tagMatch[1]!;
    });
  }
  return bindings;
}

/**
 * Region pointers a palette callback hands to driver members.
 *
 * A PROM region usually holds more than the color network the palette plan
 * lowers: the bytes past the RGB table are a second table the driver reads
 * directly (Zaxxon's per-column character color codes live at `proms` + 256).
 * MAME publishes that table by pointing a member at the local PROM pointer,
 * which the declarative palette plan alone would drop, leaving every tile that
 * reads it colored from an unbound member.
 *
 * All three MAME spellings of the same fact are recognised: advancing the
 * pointer and assigning it (`color_prom += 32; m_x = color_prom;`), taking the
 * address of an element (`m_x = &color_prom[256];`) and adding a displacement
 * (`m_x = color_prom + 256;`).
 */
export function sourceAssignedRegionPointers(
  ast: MameAstIndex,
  palette: GeneratedPromPalettePlan,
  constants: Record<string, number>,
): { bindings: Record<string, string>; offsets: Record<string, number> } {
  if (!palette.source) return { bindings: {}, offsets: {} };
  const fn = ast.ast.units.flatMap(unit => unit.functions).find(candidate =>
    candidate.span.file === palette.source!.file &&
    candidate.span.line === palette.source!.line);
  if (!fn) return { bindings: {}, offsets: {} };
  // `const` binds either side of the element type and may repeat after the
  // star, so `uint8_t const *const color_prom` is the same declaration as
  // `const uint8_t *color_prom`.
  const local = /(?:const\s+)?(?:u?int8_t|u8|char)\s*(?:\bconst\b\s*)?\*\s*(?:\bconst\b\s*)?(\w+)\s*=\s*memregion\(\s*"([^"]+)"\s*\)->base\(\)/.exec(
    fn.body,
  );
  if (!local) return { bindings: {}, offsets: {} };
  const [_, pointer, region] = local;
  let offset = 0;
  const bindings: Record<string, string> = {};
  const offsets: Record<string, number> = {};
  const events = [
    ...fn.body.matchAll(new RegExp(
      `\\b${pointer}\\s*\\+=\\s*([^;]+);` +
      `|\\b(m_\\w+)\\s*=\\s*&\\s*${pointer}\\s*\\[([^\\]]+)\\]\\s*;` +
      `|\\b(m_\\w+)\\s*=\\s*${pointer}\\s*(?:\\+([^;]+))?;`,
      'g',
    )),
  ];
  for (const event of events) {
    if (event[1]) offset += expressionNumber(event[1], constants);
    const member = event[2] ?? event[4];
    if (!member) continue;
    const displacement = event[3] ?? event[5];
    bindings[member] = region!;
    offsets[member] = offset +
      (displacement ? expressionNumber(displacement, constants) : 0);
  }
  return { bindings, offsets };
}

function compilePackedPaletteBitmap(
  graph: KnowledgeGraph,
  ast: MameAstIndex,
  source: string,
  constants: Record<string, number>,
  screen: MameFunction,
): NonNullable<GeneratedVideoPlan['bitmap']> | undefined {
  const fail = (reason: string): undefined => {
    if (process.env.MAMEKIT_DEBUG_VIDEO === '1') {
      console.error(`packed bitmap: ${reason}`);
    }
    return undefined;
  };
  const body = screen.body;
  const access = /\b(m_\w+)\s*\[\s*(\w+)\s*\*\s*(\d+)\s*\+\s*(\w+)\s*\/\s*(\d+)\s*\]/.exec(body);
  const shift = />>\s*\(\s*(\d+)\s*\*\s*\(\s*\w+\s*&\s*(\d+)\s*\)\s*\)/.exec(body);
  if (!access || !shift) return fail(`pixel access missing in ${screen.className}::${screen.name}`);
  const bytesPerRow = Number(access[3]);
  const pixelsPerByte = Number(access[5]);
  const bitsPerPixel = Number(shift[1]);
  if (
    !Number.isInteger(bytesPerRow) ||
    pixelsPerByte !== 2 ||
    bitsPerPixel !== 4
  ) return fail('packed pixel geometry did not lower');
  const palette = compileRawRamPalette(graph, ast, source, constants);
  if (!palette) return fail('palette RAM network did not lower');
  const screenDevice = graph.nodes.find(node =>
    node.label === 'Device' && node.props.type === 'SCREEN');
  const raw = screenDevice?.props.screenRaw as number[] | undefined;
  if (!raw || raw.length < 7) return fail('screen raw timing is missing');
  const rowStart = Number(raw[5]);
  const rows = Number(raw[6]) - rowStart;
  if (!Number.isInteger(rowStart) || !Number.isInteger(rows) || rows <= 0) {
    return fail('visible row timing is invalid');
  }
  return {
    member: access[1]!,
    rowStart,
    rows,
    bytesPerRow,
    xOffset: 0,
    lsbFirst: true,
    bitsPerPixel,
    paletteRam: palette,
    ...(/\bm_flipscreen_x\b/.test(body) ? { flipXMember: 'm_flipscreen_x' } : {}),
    ...(/\bm_flipscreen_y\b/.test(body) ? { flipYMember: 'm_flipscreen_y' } : {}),
    black: 0xff000000,
    white: 0xffffffff,
    source: sourceRef(screen),
  };
}

/**
 * Lower the common MC6845 pattern where an update-row callback reads a packed
 * framebuffer and selects a page of palette RAM. The geometry checks prove
 * that MAME's MA/RA wiring is a contiguous 256-byte row before the simpler
 * browser bitmap plan is emitted.
 */
function compileCrtcPackedBitmap(
  graph: KnowledgeGraph,
  ast: MameAstIndex,
  source: string,
  constants: Record<string, number>,
): NonNullable<GeneratedVideoPlan['bitmap']> | undefined {
  const crtc = graph.nodes.find(node =>
    node.label === 'Device' && node.props.type === 'MC6845');
  const config = ((crtc?.props.config as string[] | undefined) ?? []).join('\n');
  const callback = /set_update_row_callback\s*\(\s*FUNC\s*\(\s*(\w+)::(\w+)\s*\)\s*\)/
    .exec(config);
  if (!callback) return undefined;
  const declaration = new RegExp(
    `MC6845_UPDATE_ROW\\s*\\(\\s*${callback[1]}::${callback[2]}\\s*\\)\\s*\\{`,
  ).exec(source);
  if (!declaration) return undefined;
  const open = source.indexOf('{', declaration.index);
  const close = matchingSourceBrace(source, open);
  if (open < 0 || close < 0) return undefined;
  const body = source.slice(open + 1, close);
  const member = /\bpens\s*\[\s*(m_\w+)\s*\[\s*\([^;\]]*\boffs\b[^;\]]*\]\s*\]\s*\]/.exec(body)?.[1]
    ?? /\bpens\s*\[\s*(m_\w+)\s*\[/.exec(body)?.[1];
  const paletteBank = /pens\s*\(\s*\)\s*\[\s*(m_\w+)\s*<<\s*8\s*\]/.exec(body)?.[1];
  const contiguousAddress =
    /\(\s*\(\s*ma\s*<<\s*6\s*\)\s*&\s*0xf800\s*\)\s*\|\s*\(\s*\(\s*ra\s*<<\s*8\s*\)\s*&\s*0x0700\s*\)/i
      .test(body);
  const bytePixels = /x\s*<\s*x_count\s*\*\s*8/.test(body);
  const charWidth = /set_char_width\s*\(\s*8\s*\)/.test(config);
  if (!member || !paletteBank || !contiguousAddress || !bytePixels || !charWidth) {
    return undefined;
  }
  const paletteRam =
    compileRawRamPalette(graph, ast, source, constants) ??
    compileLookupRamPalette(graph, ast);
  if (!paletteRam || paletteRam.entries < 0x400) return undefined;
  return {
    member,
    rowStart: 0,
    rows: 256,
    bytesPerRow: 256,
    xOffset: 0,
    lsbFirst: true,
    bitsPerPixel: 8,
    paletteRam,
    paletteBankMember: paletteBank,
    ...(/\boffs_xor\s*=\s*m_(\w+)\s*\?\s*0xffff/.test(body)
      ? {
          flipXMember: `m_${/\boffs_xor\s*=\s*(m_\w+)/.exec(body)?.[1]?.replace(/^m_/, '')}`,
          flipYMember: `m_${/\boffs_xor\s*=\s*(m_\w+)/.exec(body)?.[1]?.replace(/^m_/, '')}`,
        }
      : {}),
    black: 0xff000000,
    white: 0xffffffff,
    source: {
      file: String(crtc?.props.sourceFile ?? graph.meta.driverFile),
      line: Number(crtc?.props.sourceLine ?? 1),
      column: 1,
    },
  };
}

function matchingSourceBrace(source: string, open: number): number {
  let depth = 0;
  let quote = '';
  let escaped = false;
  for (let index = open; index < source.length; index++) {
    const char = source[index]!;
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = '';
      continue;
    }
    if (char === '"' || char === '\'') quote = char;
    else if (char === '{') depth++;
    else if (char === '}' && --depth === 0) return index;
  }
  return -1;
}

function compileLookupRamPalette(
  graph: KnowledgeGraph,
  ast: MameAstIndex,
): NonNullable<NonNullable<GeneratedVideoPlan['bitmap']>['paletteRam']> | undefined {
  const palette = graph.nodes.find(node =>
    node.label === 'Device' && node.props.type === 'PALETTE');
  const config = ((palette?.props.config as string[] | undefined) ?? []).join('\n');
  const declaration =
    /PALETTE\s*\(\s*config\s*,\s*(m_\w+)(?:\s*,[^)]*)?\)[^;]*?set_format\s*\(([\s\S]+)\)/
      .exec(config);
  const callback = declaration && /(\w+)::(\w+)/.exec(declaration[2]!);
  const entries = Number(declaration && splitMameArgs(declaration[2]!).at(-1));
  if (!declaration || !callback || !Number.isInteger(entries) || entries <= 0) {
    return undefined;
  }
  const fn = ast.findFunctionInHierarchy(callback[1]!, callback[2]!);
  if (!fn) return undefined;
  const table = /static\s+const\s+uint8_t\s+\w+\s*\[[^\]]+\]\s*=\s*\{([\s\S]*?)\}/
    .exec(fn.body)?.[1]
    ?.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g, '')
    .split(',')
    .map(value => Number(value.trim()))
    .filter(Number.isFinite);
  const intensity =
    /\bint(?:\s+const)?\s+intensity\s*=\s*\(\s*raw\s*>>\s*(\d+)\s*\)\s*&\s*(0x[\da-f]+|\d+)/i
      .exec(fn.body);
  if (!table?.length || !intensity) return undefined;
  const channels: {
    channel: 'r' | 'g' | 'b';
    valueShift: number;
    valueMask: number;
    valueTableShift: number;
  }[] = [];
  let cursor = 0;
  for (const channel of ['r', 'g', 'b'] as const) {
    const segment = fn.body.slice(cursor);
    const result = new RegExp(
      `\\bbits\\s*=\\s*\\(\\s*raw\\s*>>\\s*(\\d+)\\s*\\)\\s*&\\s*(0x[\\da-f]+|\\d+)` +
      `[\\s\\S]*?\\b${channel}\\s*=\\s*\\w+\\s*\\[\\s*\\(\\s*bits\\s*<<\\s*(\\d+)\\s*\\)\\s*\\|\\s*intensity\\s*\\]`,
      'i',
    ).exec(segment);
    if (!result) return undefined;
    channels.push({
      channel,
      valueShift: Number(result[1]),
      valueMask: Number(result[2]),
      valueTableShift: Number(result[3]),
    });
    cursor += result.index + result[0].length;
  }
  return {
    member: declaration[1]!,
    entries,
    min: 0,
    max: 255,
    scaler: 1,
    channels: [],
    lookup: {
      values: table,
      intensityShift: Number(intensity[1]),
      intensityMask: Number(intensity[2]),
      channels,
    },
  };
}

function compileRawRamPalette(
  graph: KnowledgeGraph,
  ast: MameAstIndex,
  source: string,
  constants: Record<string, number>,
): NonNullable<NonNullable<GeneratedVideoPlan['bitmap']>['paletteRam']> | undefined {
  const fail = (reason: string): undefined => {
    if (process.env.MAMEKIT_DEBUG_VIDEO === '1') {
      console.error(`video RAM palette: ${reason}`);
    }
    return undefined;
  };
  const palette = graph.nodes.find(node =>
    node.label === 'Device' && node.props.type === 'PALETTE');
  const config = ((palette?.props.config as string[] | undefined) ?? []).join('\n');
  const declaration = /PALETTE\s*\(\s*config\s*,\s*(m_\w+)(?:\s*,[^)]*)?\)[^;]*?set_format\s*\(([\s\S]+)\)/.exec(config);
  const callback = declaration && /(\w+)::(\w+)/.exec(declaration[2]!);
  const entries = Number(declaration && splitMameArgs(declaration[2]!).at(-1));
  if (!declaration || !callback || !Number.isInteger(entries) || entries <= 0) {
    return fail('set_format declaration did not lower');
  }
  const fn = ast.findFunctionInHierarchy(callback[1]!, callback[2]!);
  if (!fn) return fail(`missing ${callback[1]}::${callback[2]}`);
  const networks = compilePaletteNetworks(source, fn.body, constants);
  const channels: {
    channel: 'r' | 'g' | 'b';
    bits: number[];
    network: PaletteNetwork;
  }[] = [];
  let start = 0;
  for (const channel of ['r', 'g', 'b'] as const) {
    const result = new RegExp(
      `\\b(?:int\\s+const|int)\\s+${channel}\\s*=\\s*combine_weights\\s*\\(\\s*(\\w+)[^;]*\\)\\s*;`,
    ).exec(fn.body.slice(start));
    if (!result) return fail(`missing ${channel} combine_weights result`);
    const absolute = start + result.index;
    const segment = fn.body.slice(start, absolute);
    const bits = [...segment.matchAll(/\bbit\d+\s*=\s*BIT\s*\(\s*raw\s*,\s*(\d+)\s*\)/g)]
      .map(match => Number(match[1]));
    const network = networks.get(result[1]!);
    if (!network || bits.length !== network.resistances.length) {
      return fail(
        `${channel} network mismatch (${String(result[1])}, ` +
        `${bits.length}/${network?.resistances.length ?? 0} bits)`,
      );
    }
    channels.push({ channel, bits, network });
    start = absolute + result[0].length;
  }
  return {
    member: declaration[1]!,
    entries,
    min: channels[0]!.network.min,
    max: channels[0]!.network.max,
    scaler: channels[0]!.network.scaler,
    channels: channels.map(({ channel, bits, network }) => ({
      channel,
      bits,
      resistances: network.resistances,
      pulldown: network.pulldown,
      pullup: network.pullup,
    })),
  };
}

function compileDirectBitmap(
  graph: KnowledgeGraph,
  ownerClass: string,
  method: string,
  screen: MameFunction,
): NonNullable<GeneratedVideoPlan['bitmap']> | undefined {
  const body = screen.body;
  const offset = /\b(?:offs_t|u\d+)\s+(?:const\s+)?\w+\s*=\s*(?:\(\(offs_t\)(\w+)\s*<<\s*(\d+)\)|\(\s*offs_t\(\s*(\w+)\s*\)\s*<<\s*(\d+)\s*\))\s*\|\s*\(\w+\s*>>\s*(\d+)\)/.exec(body);
  const rowVariable = offset?.[1] ?? offset?.[3];
  const row = offset && new RegExp(
    `\\b(?:u?int8_t|u8)\\s+${rowVariable}\\s*=\\s*(\\w+)\\s*;`,
  ).exec(body);
  const member = /\b\w+\s*=\s*(m_\w+)\s*\[\s*\w+\s*\]\s*;/.exec(body)?.[1];
  const phase = /\(\s*\w+\s*&\s*(0x[\da-f]+|\d+)\s*\)\s*==\s*(0x[\da-f]+|\d+)/i.exec(body);
  if (!row || !offset || !member || !phase) return undefined;
  if (!body.includes('video_data = video_data >> 1')) return undefined;
  const handler = graph.nodes.find(node =>
    node.label === 'Handler' &&
    node.props.ownerClass === ownerClass &&
    node.props.method === method);
  const constants = Object.fromEntries(
    (Array.isArray(handler?.props.sourceConstants) ? handler.props.sourceConstants : [])
      .map(value => /^([^=]+)=(-?(?:\d+(?:\.\d+)?|Infinity))$/.exec(String(value)))
      .filter((match): match is RegExpExecArray => Boolean(match))
      .map(match => [match[1], Number(match[2])]),
  );
  const rowStart = constants[row[1]!] ?? Number(row[1]);
  const rowShift = Number(offset[2] ?? offset[4]);
  const pixelShift = Number(offset[5]);
  const xOffset = Number(phase[2]);
  if (
    !Number.isInteger(rowStart) || rowStart < 0 || rowStart > 255 ||
    !Number.isInteger(rowShift) || rowShift < 0 || rowShift > 16 ||
    pixelShift !== 3 || !Number.isInteger(xOffset) || xOffset < 0
  ) return undefined;
  return {
    member,
    rowStart,
    rows: 256 - rowStart,
    bytesPerRow: 1 << rowShift,
    xOffset,
    lsbFirst: true,
    ...(/\bm_flip_screen\b/.test(body)
      ? { flipXMember: 'm_flip_screen', flipYMember: 'm_flip_screen' }
      : {}),
    black: 0xff000000,
    white: 0xffffffff,
    source: sourceRef(screen),
  };
}

function compileTilemaps(
  start: MameFunction,
  values: Record<string, number> = {},
  ast?: MameAstIndex,
  seen = new Set<string>(),
): GeneratedVideoPlan['tilemaps'] {
  const key = `${start.className}.${start.name}`;
  if (seen.has(key)) return [];
  seen.add(key);
  const body = expandConstantTilemapLoops(start.body, values);
  const plans: GeneratedVideoPlan['tilemaps'] = [];
  const createRe = /\b(m_\w+(?:\[\s*\d+\s*\])?)\s*=(?!=)\s*&?[^;]*?\.create\s*\(/g;
  let match: RegExpExecArray | null;
  while ((match = createRe.exec(body)) !== null) {
    if (!constantTilemapBranchActive(body, match.index, values)) continue;
    const open = body.indexOf('(', match.index + match[0].length - 1);
    const close = matchingPair(body, open, '(', ')');
    if (close < 0) continue;
    const args = splitMameArgs(body.slice(open + 1, close));
    const tileInfo = funcKey(args[1]);
    const mapper = funcKey(args[2]) ?? standardTilemapMapper(args[2]);
    if (!tileInfo || !mapper || args.length < 7) continue;
    const member = match[1]!;
    const escapedMember = member.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const nextCreate = body.slice(close + 1).search(createRe);
    const setupEnd = nextCreate < 0 ? body.length : close + 1 + nextCreate;
    const setup = body.slice(close + 1, setupEnd);
    const scrollColumns = expressionNumber(
      new RegExp(`${escapedMember}->set_scroll_cols\\s*\\(([^)]+)\\)`).exec(body)?.[1],
      values,
    );
    const scrollRows = expressionNumber(
      new RegExp(`${escapedMember}->set_scroll_rows\\s*\\(([^)]+)\\)`).exec(body)?.[1],
      values,
    );
    const scrollDx = tilemapScrollDelta(body, escapedMember, 'x', values);
    const scrollDy = tilemapScrollDelta(body, escapedMember, 'y', values);
    const transparentExpression =
      new RegExp(`${escapedMember}->set_transparent_pen\\s*\\(([^)]+)\\)`).exec(setup)?.[1]
        ?? new RegExp(`${escapedMember}->set_transparent_pen\\s*\\(([^)]+)\\)`).exec(body)?.[1];
    const transparentPen = transparentExpression === undefined
      ? undefined
      : expressionNumber(transparentExpression, values);
    const transparentIndirectExpression = new RegExp(
      `${escapedMember}->configure_groups\\s*\\([^,]+,\\s*([^)]+)\\)`,
    ).exec(setup)?.[1] ?? new RegExp(
      `${escapedMember}->configure_groups\\s*\\([^,]+,\\s*([^)]+)\\)`,
    ).exec(body)?.[1];
    const transparentIndirect = transparentIndirectExpression === undefined
      ? undefined
      : expressionNumber(transparentIndirectExpression, values);
    const transmasks = tilemapTransmasks(`${setup}\n${body}`, escapedMember, values);
    const userDataExpression = new RegExp(
      `${escapedMember}->set_user_data\\s*\\(([^)]+(?:\\)[^)]*)?)\\)`,
    ).exec(setup)?.[1];
    const userDataMember = userDataExpression && /\b(m_\w+)\b/.exec(userDataExpression)?.[1];
    const userDataOffset = userDataExpression
      ? expressionNumber(
          userDataExpression
            .replace(new RegExp(`\\b${userDataMember}\\s*\\.\\s*get\\(\\)`), '0')
            .replace(new RegExp(`\\b${userDataMember}\\b`), '0'),
          values,
        )
      : undefined;
    const tileInfoFunction = ast && tileInfo
      ? ast.findFunctionInHierarchy(...splitHandlerKey(tileInfo))
      : undefined;
    const bytesPerTile = Number(
      tileInfoFunction && /tile_index\s*\*\s*(\d+)/.exec(tileInfoFunction.body)?.[1] || 1,
    );
    plans.push({
      member,
      ...(userDataMember ? {
        userDataMember,
        userDataOffset: userDataOffset ?? 0,
        userDataBytes:
          expressionNumber(args[5], values) * expressionNumber(args[6], values) * bytesPerTile,
      } : {}),
      ...(/\b(m_\w+)\b/.exec(args[0] ?? '')?.[1]
        ? { decodeMember: /\b(m_\w+)\b/.exec(args[0] ?? '')![1] }
        : {}),
      tileWidth: expressionNumber(args[3], values),
      tileHeight: expressionNumber(args[4], values),
      columns: expressionNumber(args[5], values),
      rows: expressionNumber(args[6], values),
      mapper,
      tileInfo,
      ...(scrollColumns > 0 ? { scrollColumns } : {}),
      ...(scrollRows > 0 ? { scrollRows } : {}),
      ...(scrollDx ? { scrollDx } : {}),
      ...(scrollDy ? { scrollDy } : {}),
      ...(transparentPen !== undefined && transparentPen >= 0 ? { transparentPen } : {}),
      ...(transparentIndirect !== undefined && transparentIndirect >= 0
        ? { transparentIndirect }
        : {}),
      ...(transmasks.length ? { transmasks } : {}),
      source: sourceRef(start),
    });
    createRe.lastIndex = close + 1;
  }
  if (!plans.length && ast) {
    const callRe = /\b(\w+)\s*\(/g;
    let call: RegExpExecArray | null;
    while ((call = callRe.exec(start.body)) !== null) {
      const helper = ast.findFunctionInHierarchy(start.className, call[1]!);
      if (!helper || !helper.body.includes('.create(')) continue;
      const open = start.body.indexOf('(', call.index + call[1]!.length);
      const close = matchingPair(start.body, open, '(', ')');
      if (close < 0) continue;
      const args = splitMameArgs(start.body.slice(open + 1, close));
      const parameters = splitMameArgs(helper.parameters)
        .map(parameter => /(\w+)\s*$/.exec(parameter.trim())?.[1])
        .filter((name): name is string => Boolean(name));
      let body = helper.body;
      for (const [index, parameter] of parameters.entries()) {
        if (args[index] === undefined) continue;
        body = body.replace(
          new RegExp(`\\b${parameter}\\b`, 'g'),
          args[index]!,
        );
      }
      plans.push(...compileTilemaps({ ...helper, body }, values, ast, seen));
      callRe.lastIndex = close + 1;
    }
  }
  return plans;
}

/** Source-owned byte arrays allocated during video_start and its helpers. */
function allocatedVideoState(
  ast: MameAstIndex,
  fn: MameFunction,
  values: Record<string, number>,
  seen = new Set<string>(),
): Record<string, number[]> {
  const key = `${fn.className}.${fn.name}:${JSON.stringify(values)}`;
  if (seen.has(key)) return {};
  seen.add(key);
  const state: Record<string, number[]> = {};
  for (const match of fn.body.matchAll(
    /\b(m_\w+)\s*=\s*make_unique_clear\s*<[^>]*\[\]\s*>\s*\(([^)]+)\)/g,
  )) {
    const length = expressionNumber(match[2], values);
    if (Number.isInteger(length) && length >= 0 && length <= 0x10_0000) {
      state[match[1]!] = new Array(length).fill(0);
    }
  }
  for (const match of fn.body.matchAll(/\b(m_\w+)\.resize\s*\(\s*([^)]+)\)/g)) {
    const length = expressionNumber(match[2], values);
    if (Number.isInteger(length) && length >= 0 && length <= 0x10_0000) {
      state[match[1]!] = new Array(length).fill(0);
    }
  }
  for (const call of fn.body.matchAll(/\b(\w+)\s*\(([^;()]*)\)\s*;/g)) {
    const helper = ast.findFunctionInHierarchy(fn.className, call[1]!);
    if (!helper || helper === fn) continue;
    const parameters = splitMameArgs(helper.parameters)
      .map(parameter => /(\w+)\s*$/.exec(parameter.trim())?.[1])
      .filter((name): name is string => Boolean(name));
    const args = splitMameArgs(call[2]!);
    const helperValues = { ...values };
    parameters.forEach((parameter, index) => {
      helperValues[parameter] = expressionNumber(args[index], values);
    });
    Object.assign(state, allocatedVideoState(ast, helper, helperValues, seen));
  }
  return state;
}

/** Unroll constant video-start loops so tilemap finder arrays become plans. */
function expandConstantTilemapLoops(
  source: string,
  values: Record<string, number>,
): string {
  let expanded = source;
  const loop = /\bfor\s*\(\s*(?:int\s+)?(\w+)\s*=\s*([^;]+);\s*\1\s*<\s*([^;]+);\s*(?:\1\+\+|\+\+\1)\s*\)\s*\{/g;
  for (;;) {
    const match = loop.exec(expanded);
    if (!match) break;
    const open = expanded.indexOf('{', match.index + match[0].length - 1);
    const close = matchingPair(expanded, open, '{', '}');
    if (close < 0) break;
    const start = expressionNumber(match[2], values);
    const end = expressionNumber(match[3], values);
    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end < start || end - start > 64) {
      loop.lastIndex = close + 1;
      continue;
    }
    const block = expanded.slice(open + 1, close);
    const variable = new RegExp(`\\b${match[1]}\\b`, 'g');
    const replacement = Array.from({ length: end - start }, (_unused, index) =>
      block.replace(variable, String(start + index))).join('\n');
    expanded = expanded.slice(0, match.index) + replacement + expanded.slice(close + 1);
    loop.lastIndex = 0;
  }
  return expanded;
}

/**
 * MAME video_start methods sometimes select one of two tile callbacks from a
 * driver-init constant. Ignore create calls in the inactive braced branch so
 * one machine does not accidentally combine another sibling's tilemap.
 */
function constantTilemapBranchActive(
  body: string,
  position: number,
  values: Record<string, number>,
): boolean {
  const branch = /\bif\s*\(\s*(m_\w+)\s*(==|!=)\s*(0x[\da-f]+|\d+)\s*\)\s*(?:\/\/[^\n]*\n\s*)?\{/gi;
  let match: RegExpExecArray | null;
  while ((match = branch.exec(body)) !== null) {
    const live = values[match[1]!];
    if (live === undefined) continue;
    const open = body.indexOf('{', match.index + match[0].length - 1);
    const close = matchingPair(body, open, '{', '}');
    if (close < 0) continue;
    const expected = Number(match[3]);
    const condition = match[2] === '==' ? live === expected : live !== expected;
    if (position > open && position < close && !condition) return false;
    const tail = body.slice(close + 1);
    const elseMatch = /^\s*else\s*(?:\/\/[^\n]*\n\s*)?\{/.exec(tail);
    if (!elseMatch) continue;
    const elseOpen = body.indexOf('{', close + 1 + elseMatch.index);
    const elseClose = matchingPair(body, elseOpen, '{', '}');
    if (elseClose >= 0 && position > elseOpen && position < elseClose && condition) {
      return false;
    }
  }
  return true;
}

function tilemapTransmasks(
  source: string,
  member: string,
  values: Record<string, number>,
): NonNullable<GeneratedVideoPlan['tilemaps'][number]['transmasks']> {
  const masks = new Map<number, {
    group: number;
    foreground: number;
    background: number;
  }>();
  const pattern = new RegExp(
    `${member}->set_transmask\\s*\\(([^,]+),\\s*([^,]+),\\s*([^)]+)\\)`,
    'g',
  );
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(source)) !== null) {
    const group = expressionNumber(match[1], values);
    masks.set(group, {
      group,
      foreground: expressionNumber(match[2], values) >>> 0,
      background: expressionNumber(match[3], values) >>> 0,
    });
  }
  return [...masks.values()].sort((left, right) => left.group - right.group);
}

function tilemapScrollDelta(
  source: string,
  member: string,
  axis: 'x' | 'y',
  values: Record<string, number>,
): [number, number] | undefined {
  const match = new RegExp(
    `${member}->set_scrolld${axis}\\s*\\(\\s*([^,]+)\\s*,\\s*([^)]+)\\)`,
  ).exec(source);
  if (!match) return undefined;
  return [
    expressionNumber(match[1], values),
    expressionNumber(match[2], values),
  ];
}

function compileDecodeBindings(
  graph: KnowledgeGraph,
  machineIds: Set<string>,
): Map<string, { decodeMember: string; paletteMember: string }> {
  const deviceIds = new Set(graph.edges
    .filter(edge => machineIds.has(edge.from) && edge.rel === 'HAS_DEVICE')
    .map(edge => edge.to));
  const bindings = new Map<string, { decodeMember: string; paletteMember: string }>();
  const bindingsByTag = new Map<string, { decodeMember: string; paletteMember: string }>();
  for (const device of graph.nodes.filter(node =>
    deviceIds.has(node.id) &&
    node.label === 'Device' &&
    node.props.type === 'GFXDECODE')) {
    const raw = ((device.props.config as string[] | undefined) ?? []).join('\n');
    const args = /GFXDECODE(?:_SCALE)?\s*\(\s*config\s*,\s*(m_\w+)\s*,\s*(m_\w+)\s*,\s*(\w+)/.exec(raw);
    if (!args) continue;
    const binding = {
      decodeMember: args[1]!,
      paletteMember: args[2]!,
    };
    bindings.set(args[3]!, binding);
    bindingsByTag.set(String(device.props.tag), binding);
  }
  // A derived machine can replace the layout table of a GFXDECODE device
  // instantiated by its base config (`m_gfxdecode->set_info(gfx_pacmanbl)`).
  // Carry the original device's member/palette binding onto the replacement.
  for (const edge of graph.edges.filter(edge =>
    machineIds.has(edge.from) && edge.rel === 'DECODES')) {
    const deviceTag = String(edge.props?.deviceTag ?? '');
    const binding = bindingsByTag.get(deviceTag);
    const decode = graph.nodes.find(node => node.id === edge.to);
    if (binding && decode) bindings.set(String(decode.props.name), binding);
  }
  return bindings;
}

interface PaletteNetwork {
  min: number;
  max: number;
  scaler: number;
  resistances: number[];
  pulldown: number;
  pullup: number;
}

function compileNamedPalettes(
  graph: KnowledgeGraph,
  ast: MameAstIndex,
  source: string,
  constants: Record<string, number>,
  members: string[],
): NonNullable<GeneratedVideoPlan['palettes']> {
  const functions = ast.ast.units.flatMap(unit => unit.functions);
  const scalars = compilePaletteScalars(source, constants);
  return members.flatMap(member => {
    let fn = functions.find(candidate =>
      new RegExp(`\\b${member}->set_(?:pen|indirect)`).test(candidate.body));
    if (!fn) {
      const device = graph.nodes.find(node =>
        node.label === 'Device' &&
        Array.isArray(node.props.config) &&
        node.props.config.some(raw => new RegExp(
          `\\bPALETTE\\s*\\(\\s*config\\s*,\\s*${member}\\s*,`,
        ).test(String(raw))));
      const raw = ((device?.props.config as string[] | undefined) ?? []).join('\n');
      const callback = /FUNC\(\s*(\w+)::(\w+)\s*\)/.exec(raw);
      if (callback) fn = ast.findFunction(callback[1]!, callback[2]!);
    }
    if (!fn) return [];
    const plan = compileNamedPalette(
      graph,
      source,
      fn,
      member,
      { ...constants, ...scalars },
    );
    const resNetPlan = plan ?? compileResNetAllPalette(graph, source, fn, constants);
    return resNetPlan ? [{ member, plan: resNetPlan }] : [];
  });
}

/**
 * Lower MAME's shared compute_res_net_all palette helper. Drivers using this
 * form describe the PROM bit slices in res_net_decode_info and the electrical
 * channel in res_net_info instead of spelling out set_pen_color loops.
 */
function compileResNetAllPalette(
  graph: KnowledgeGraph,
  source: string,
  fn: MameFunction,
  constants: Record<string, number>,
): GeneratedPromPalettePlan | undefined {
  const call = /compute_res_net_all\s*\(\s*\w+\s*,\s*(\w+)\s*,\s*(\w+)\s*,\s*(\w+)\s*\)/
    .exec(fn.body);
  if (!call) return undefined;
  const [, regionSource, decodeName, netName] = call;
  const region = new RegExp(
    `\\b${regionSource}\\s*\\(\\s*\\*this\\s*,\\s*"([^"]+)"\\s*\\)`,
  ).exec(source)?.[1] ?? /memregion\(\s*"([^"]+)"\s*\)/.exec(fn.body)?.[1];
  if (!region || !graph.nodes.some(node =>
    node.label === 'RomRegion' && node.props.tag === region)) return undefined;

  const initializer = (type: string, name: string): string | undefined => {
    const match = new RegExp(`\\b${type}\\s+${name}\\s*=\\s*\\{`).exec(source);
    if (!match) return undefined;
    const open = source.indexOf('{', match.index);
    const close = matchingPair(source, open, '{', '}');
    return close < 0 ? undefined : source.slice(open + 1, close);
  };
  const decode = initializer('res_net_decode_info', decodeName!);
  const net = initializer('res_net_info', netName!);
  if (!decode || !net) return undefined;
  const decodeText = decode
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '');
  const scalarPrefix = /^\s*([^,]+),\s*([^,]+),\s*([^,]+),/.exec(decodeText);
  const arrays = [...decodeText.matchAll(/\{([^{}]+)\}/g)]
    .map(match => splitMameArgs(match[1]!).map(value => expressionNumber(value, constants)));
  if (!scalarPrefix || arrays.length < 3) return undefined;
  const start = expressionNumber(scalarPrefix[2], constants);
  const end = expressionNumber(scalarPrefix[3], constants);
  const [offsets, shifts, masks] = arrays.slice(-3);
  if (
    !Number.isInteger(start) ||
    !Number.isInteger(end) ||
    !offsets || !shifts || !masks ||
    offsets.length < 3 || shifts.length < 3 || masks.length < 3
  ) return undefined;

  const channelRows = [...net.matchAll(
    /\{\s*(RES_NET_AMP_\w+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*(\d+)\s*,\s*\{([^{}]+)\}\s*\}/g,
  )];
  if (channelRows.length < 3) return undefined;
  const channels = (['r', 'g', 'b'] as const).map((channel, index) => {
    const row = channelRows[index]!;
    const count = Number(row[4]);
    const networkResistances = splitMameArgs(row[5]!)
      .slice(0, count)
      .map(value => expressionNumber(value, constants));
    const bits: number[] = [];
    const channelOffsets: number[] = [];
    const resistances: number[] = [];
    for (let sourceIndex = index; sourceIndex < masks.length; sourceIndex += 3) {
      const mask = masks[sourceIndex]!;
      for (let outputBit = 0; outputBit < count; outputBit++) {
        if (!(mask & (1 << outputBit))) continue;
        bits.push(outputBit + shifts[sourceIndex]!);
        channelOffsets.push(offsets[sourceIndex]!);
        resistances.push(networkResistances[outputBit]!);
      }
    }
    return {
      channel,
      bits,
      offsets: channelOffsets,
      resistances,
      pulldown: expressionNumber(row[3], constants),
      pullup: expressionNumber(row[2], constants),
    };
  });
  const count = Math.max(0, end - start + 1);
  const forceBlackMatch = /if\s*\(\s*\(\s*(\w+)\s*&\s*([^)]+?)\s*\)\s*==\s*([^)]+?)\s*\)[\s\S]*?compute_res_net\s*\([^,]+,[^,]+,\s*(\w+)\s*\)[\s\S]*?set_pen_color\s*\(\s*\1\s*,/m
    .exec(fn.body);
  let forceBlack: GeneratedPromPalettePlan['forceBlack'];
  if (forceBlackMatch) {
    const overrideNet = initializer('res_net_info', forceBlackMatch[4]!);
    const zeroInputChannels = overrideNet
      ? [...overrideNet.matchAll(
        /\{\s*RES_NET_AMP_\w+\s*,\s*[^,]+\s*,\s*[^,]+\s*,\s*(\d+)\s*,/g,
      )].slice(0, 3).every(row => Number(row[1]) === 0)
      : false;
    const mask = expressionNumber(forceBlackMatch[2]!, constants);
    const value = expressionNumber(forceBlackMatch[3]!, constants);
    if (zeroInputChannels && Number.isInteger(mask) && Number.isInteger(value)) {
      forceBlack = { mask, value };
    }
  }
  const exactResNet =
    /RES_NET_VCC_5V/.test(net) &&
    /RES_NET_VBIAS_5V/.test(net) &&
    /RES_NET_VIN_(?:MB7052|TTL_OUT)/.test(net) &&
    /RES_NET_MONITOR_SANYO_EZV20/.test(net) &&
    channelRows.every((row, index) => channels[index]!.resistances.length === Number(row[4]));
  const amplifiers = channelRows.map(row =>
    row[1] === 'RES_NET_AMP_DARLINGTON'
      ? 'darlington' as const
      : row[1] === 'RES_NET_AMP_EMITTER'
        ? 'emitter' as const
        : 'none' as const);
  const normalizeCall = /normalize_range\s*\(\s*([^,]+)\s*,\s*([^,)]+)(?:\s*,\s*([^,]+)\s*,\s*([^)]+))?\)/
    .exec(fn.body);
  const normalize = normalizeCall
    ? {
        start: expressionNumber(normalizeCall[1]!, constants),
        end: expressionNumber(normalizeCall[2]!, constants),
        lumMin: normalizeCall[3] ? expressionNumber(normalizeCall[3], constants) : 0,
        lumMax: normalizeCall[4] ? expressionNumber(normalizeCall[4], constants) : 255,
      }
    : undefined;
  const bitswap = new RegExp(
    String.raw`(?:int\s+const|int)\s+(\w+)\s*=\s*bitswap<(\d+)>\s*` +
    String.raw`\(\s*(\w+)\s*,\s*([^)]+)\)\s*;[\s\S]*?` +
    String.raw`set_pen_color\s*\(\s*\3\s*,\s*\w+\s*\[\s*\1\s*\]\s*\)`,
  ).exec(fn.body);
  let colorIndexMap: number[] | undefined;
  if (bitswap) {
    const width = Number(bitswap[2]);
    const sourceBits = splitMameArgs(bitswap[4]!)
      .map(value => expressionNumber(value, constants));
    if (
      Number.isInteger(width) && width > 0 && width <= 31 &&
      sourceBits.length === width && sourceBits.every(Number.isInteger)
    ) {
      colorIndexMap = Array.from({ length: count }, (_unused, destination) =>
        sourceBits.reduce((mapped, sourceBit, position) =>
          mapped | (((destination >>> sourceBit) & 1) << (width - position - 1)), 0));
    }
  }
  return {
    region,
    colorCount: count,
    min: 0,
    max: 255,
    scaler: -1,
    channels,
    ...(exactResNet ? {
      resNet: { input: 'ttl' as const, monitor: 'sanyo' as const, amplifiers },
    } : {}),
    ...(normalize && Object.values(normalize).every(Number.isFinite) ? { normalize } : {}),
    ...(colorIndexMap ? { colorIndexMap } : {}),
    ...(forceBlack ? { forceBlack } : {}),
    lookupOffset: start,
    lookupCount: count,
    lookupMask: count - 1,
    banks: [{
      penOffset: 0,
      colorOr: 0,
      lookupOffset: start,
      lookupCount: count,
      direct: true,
    }],
    transparentIndirect: 0,
    source: sourceRef(fn),
  };
}

function compileNamedPalette(
  graph: KnowledgeGraph,
  source: string,
  fn: MameFunction,
  member: string,
  constants: Record<string, number>,
): GeneratedPromPalettePlan | undefined {
  const fail = (reason: string): undefined => {
    if (process.env.MAMEKIT_DEBUG_VIDEO === '1') {
      console.error(`video palette ${member}: ${reason}`);
    }
    return undefined;
  };
  const regionByVariable = new Map(
    [...fn.body.matchAll(
      /\b(\w+)\s*=\s*memregion\(\s*"([^"]+)"\s*\)->base\(\)/g,
    )].map(match => [match[1]!, match[2]!]),
  );
  const loops = numericForLoops(fn.body);
  const colorLoop = loops.find(loop =>
    new RegExp(`\\b${member}->set_(?:pen_color|indirect_color)`).test(loop.body));
  if (!colorLoop) return fail('color loop missing');
  const colorSource = /\b\w+\s*=\s*(\w+)\s*\[\s*i\s*\]/.exec(colorLoop.body)?.[1];
  const region = colorSource && regionByVariable.get(colorSource);
  if (!region) return fail(`color PROM region missing for ${String(colorSource)}`);

  const networks = compilePaletteNetworks(source, fn.body, constants);
  const channels: GeneratedPromPalettePlan['channels'] = [];
  const channelRe =
    /(?:int(?:\s+const)?|const\s+int)\s+([rgb])\s*=\s*combine_weights\(\s*(\w+)\s*,\s*([^;]+)\)\s*;/g;
  let channel: RegExpExecArray | null;
  while ((channel = channelRe.exec(colorLoop.body)) !== null) {
    const network = networks.get(channel[2]!);
    if (!network) continue;
    const bits = [...channel[3]!.matchAll(/BIT\(\s*\w+\s*,\s*(\d+)\s*\)/g)]
      .map(bit => Number(bit[1]));
    if (!bits.length) continue;
    channels.push({
      channel: channel[1] as 'r' | 'g' | 'b',
      bits,
      resistances: network.resistances,
      pulldown: network.pulldown,
      pullup: network.pullup,
    });
  }
  if (channels.length !== 3) {
    return fail(`expected three resistor channels, got ${channels.length}`);
  }

  const count = Math.max(0, colorLoop.end - colorLoop.start);
  const direct = new RegExp(`\\b${member}->set_pen_color`).test(colorLoop.body);
  const banks: GeneratedPromPalettePlan['banks'] = [];
  let lookupRegion: string | undefined;
  if (direct) {
    banks.push({
      penOffset: 0,
      colorOr: 0,
      lookupOffset: 0,
      lookupCount: count,
      direct: true,
    });
  } else {
    for (const loop of loops.filter(candidate =>
      new RegExp(`\\b${member}->set_pen_indirect`).test(candidate.body))) {
      const call = findCallArguments(loop.body, `${member}->set_pen_indirect`);
      if (!call) continue;
      const args = splitMameArgs(call);
      const valueName = args[1]?.trim();
      const sourceVariable = valueName &&
        new RegExp(`\\b${valueName}\\s*=\\s*(\\w+)\\s*\\[\\s*([^\\]]+)\\s*\\]`)
          .exec(loop.body);
      const sourceRegion = sourceVariable && regionByVariable.get(sourceVariable[1]!);
      if (!sourceRegion) continue;
      lookupRegion = sourceRegion;
      banks.push({
        penOffset: expressionAt(args[0] ?? '0', loop.start),
        colorOr: expressionNumber(
          /(?:\||\+)\s*(-?(?:0x[\da-f]+|\d+))/i.exec(args[1] ?? '')?.[1],
        ),
        lookupOffset: expressionAt(sourceVariable[2] ?? 'i', loop.start),
        lookupCount: Math.max(0, loop.end - loop.start),
      });
    }
    // Some dual lookup-PROM boards ground A7 and use the loop's high bit to
    // select a second physical PROM. Expand that folded local address into
    // affine banks the generated runtime can apply without re-parsing C++.
    const folded = /\b\w+\s*=\s*\(\s*i\s*<<\s*\d+\s*&\s*(0x[\da-f]+|\d+)\s*\)\s*\|\s*\(\s*i\s*&\s*(0x[\da-f]+|\d+)\s*\)/i
      .exec(fn.body);
    if (folded && banks.length === 2) {
      const high = Number(folded[1]);
      const lowMask = Number(folded[2]);
      const count = lowMask + 1;
      const lookupBase = banks[0]!.lookupOffset ?? 0;
      const penDeltas = [...fn.body.matchAll(
        /\bset_pen_indirect\s*\(\s*\w+\s*(?:\|\s*(0x[\da-f]+|\d+))?/gi,
      )].slice(0, banks.length).map(match => Number(match[1] ?? 0));
      if (
        Number.isInteger(high) && high > lowMask &&
        Number.isInteger(count) && count > 0 &&
        penDeltas.length === banks.length
      ) {
        const foldedBanks: GeneratedPromPalettePlan['banks'] = [];
        for (const sourceBase of [0, high]) {
          for (let index = 0; index < banks.length; index++) {
            const lookupTerms = banks[index]!.lookupTerms?.map(term => ({
              ...term,
              offset: term.offset + sourceBase,
            }));
            foldedBanks.push({
              ...banks[index]!,
              penOffset: sourceBase + penDeltas[index]!,
              lookupOffset: lookupBase + sourceBase,
              lookupCount: count,
              ...(lookupTerms ? { lookupTerms } : {}),
            });
          }
        }
        banks.splice(0, banks.length, ...foldedBanks);
      }
    }
    const fixedCall = new RegExp(
      `${member}->set_pen_indirect\\s*\\(([^;]+)\\)\\s*;`,
      'g',
    );
    for (const call of fn.body.matchAll(fixedCall)) {
      const args = splitMameArgs(call[1]!);
      if (
        args.length < 2 ||
        /\bi\b/.test(args[0]!) ||
        /\b(?:promval|color_prom)\b/.test(args[1]!)
      ) continue;
      banks.push({
        penOffset: expressionNumber(args[0], constants),
        colorOr: expressionNumber(args[1], constants),
        lookupOffset: 0,
        lookupCount: 1,
        direct: true,
      });
    }
  }
  if (!banks.length) return fail('pen lookup banks missing');
  const network = networks.values().next().value as PaletteNetwork | undefined;
  if (!network) return fail('resistor network missing');
  return {
    region,
    ...(lookupRegion && lookupRegion !== region ? { lookupRegion } : {}),
    colorCount: count,
    min: network.min,
    max: network.max,
    scaler: network.scaler,
    channels,
    lookupOffset: banks[0]!.lookupOffset ?? 0,
    lookupCount: banks[0]!.lookupCount ?? 0,
    lookupMask: 0xff,
    banks,
    transparentIndirect: 0,
    source: sourceRef(fn),
  };
}

function compilePaletteNetworks(
  source: string,
  body: string,
  constants: Record<string, number>,
): Map<string, PaletteNetwork> {
  const arrays = paletteResistanceArrays(source);
  const call = findCallArguments(body, 'compute_resistor_weights');
  const result = new Map<string, PaletteNetwork>();
  if (!call) return result;
  const args = splitMameArgs(call);
  const min = expressionNumber(args[0], constants);
  const max = expressionNumber(args[1], constants);
  const scaler = expressionNumber(args[2], constants);
  for (let index = 3; index + 4 < args.length; index += 5) {
    const count = expressionNumber(args[index], constants);
    if (!count) continue;
    const resistanceName = /^(\w+)/.exec((args[index + 1] ?? '').replace(/^&/, '').trim())?.[1];
    const resistances = resistanceName ? arrays.get(resistanceName) : undefined;
    if (!resistances) continue;
    const offset = Number(/\[\s*(\d+)\s*\]/.exec(args[index + 1] ?? '')?.[1] ?? 0);
    const name = (args[index + 2] ?? '').replace(/^&/, '').trim();
    result.set(name, {
      min,
      max,
      scaler,
      resistances: resistances.slice(offset, offset + count),
      pulldown: paletteResistanceValue(args[index + 3], arrays, constants),
      pullup: paletteResistanceValue(args[index + 4], arrays, constants),
    });
  }
  return result;
}

function compilePaletteScalars(
  source: string,
  constants: Record<string, number>,
): Record<string, number> {
  const arrays = paletteResistanceArrays(source);
  const values: Record<string, number> = {};
  const assignment = /\b(\w+)\s*=\s*compute_resistor_weights\s*\(/g;
  let match: RegExpExecArray | null;
  while ((match = assignment.exec(source)) !== null) {
    const open = source.indexOf('(', match.index + match[0].length - 1);
    const close = matchingPair(source, open, '(', ')');
    if (close < 0) continue;
    const args = splitMameArgs(source.slice(open + 1, close));
    const max = expressionNumber(args[1], constants);
    const requested = evalExpr(substituteNumbers(args[2] ?? '', constants));
    if (requested != null && requested >= 0) {
      values[match[1]!] = requested;
      continue;
    }
    let maximum = 0;
    for (let index = 3; index + 4 < args.length; index += 5) {
      const count = expressionNumber(args[index], constants);
      const resistanceName = /^(\w+)/.exec((args[index + 1] ?? '').trim())?.[1];
      const resistances = resistanceName ? arrays.get(resistanceName)?.slice(0, count) : undefined;
      if (!resistances?.length) continue;
      const pulldown = paletteResistanceValue(args[index + 3], arrays, constants);
      const pullup = paletteResistanceValue(args[index + 4], arrays, constants);
      maximum = Math.max(maximum, resistorMaximum(resistances, pulldown, pullup, max));
    }
    if (maximum > 0) values[match[1]!] = max / maximum;
  }
  return values;
}

function paletteResistanceArrays(source: string): Map<string, number[]> {
  return new Map(
    [...source.matchAll(
      /(?:static\s+)?(?:constexpr|const)\s+int\s+(\w+)\s*\[[^\]]*\]\s*=\s*\{([^}]+)\}/g,
    )].map(match => [
      match[1]!,
      splitMameArgs(match[2]!).map(value => expressionNumber(value)),
    ]),
  );
}

function paletteResistanceValue(
  value: string | undefined,
  arrays: Map<string, number[]>,
  constants: Record<string, number>,
): number {
  const reference = value && /^(\w+)\s*\[\s*(\d+)\s*\]$/.exec(value.trim());
  if (reference) return arrays.get(reference[1]!)?.[Number(reference[2])] ?? 0;
  return expressionNumber(value, constants);
}

function resistorMaximum(
  resistances: number[],
  pulldown: number,
  pullup: number,
  maximum: number,
): number {
  return resistances.reduce((sum, _resistance, selected) => {
    let low = pulldown ? 1 / pulldown : 1 / 1e12;
    let high = pullup ? 1 / pullup : 1 / 1e12;
    resistances.forEach((resistance, index) => {
      if (!resistance) return;
      if (index === selected) high += 1 / resistance;
      else low += 1 / resistance;
    });
    const r0 = 1 / low;
    const r1 = 1 / high;
    return sum + Math.min(maximum, Math.max(0, maximum * r0 / (r1 + r0)));
  }, 0);
}

/**
 * Lower a palette_device that colors CPU-writable palette RAM through a
 * set_format converter instead of a color PROM.
 *
 * Everything comes from MAME: the machine configuration names the format
 * enumerator and entry count, emupal.h maps that enumerator to its overload
 * type, emupal.cpp's overload gives bytes-per-entry and the
 * standard_rgb_decoder bit widths and shifts, and palette_device::device_start
 * defines the base/ext share tags.
 */
function compileSetFormatRamPalette(
  graph: KnowledgeGraph,
  machineIds: Set<string>,
  mameSrc: string,
  ast: MameAstIndex,
  className: string,
  constants: Record<string, number>,
): GeneratedRamPalettePlan | undefined {
  const fail = (reason: string): undefined => {
    if (process.env.MAMEKIT_DEBUG_VIDEO === '1') console.error(`ram palette: ${reason}`);
    return undefined;
  };
  const deviceIds = new Set(graph.edges
    .filter(edge => machineIds.has(edge.from) && edge.rel === 'HAS_DEVICE')
    .map(edge => edge.to));
  const device = graph.nodes.find(node =>
    deviceIds.has(node.id) && node.label === 'Device' && node.props.type === 'PALETTE');
  if (!device) return fail('no PALETTE device in machine composition');
  const raw = ((device.props.config as string[] | undefined) ?? []).join('\n');
  const format = /\.set_format\s*\(\s*(?:palette_device::)?(\w+)\s*,\s*([^,)]+)/.exec(raw);
  if (!format) return fail(`no set_format in ${raw}`);
  const entries = expressionNumber(format[2]);
  if (!entries) return fail(`set_format entry count did not evaluate: ${format[2]}`);

  const headerFile = 'src/emu/emupal.h';
  const sourceFile = 'src/emu/emupal.cpp';
  const header = readFileSync(join(mameSrc, headerFile), 'utf8');
  const implementation = readFileSync(join(mameSrc, sourceFile), 'utf8');
  // emupal.h declares one enum per format; its tag is the set_format overload
  // parameter type, e.g. `enum rgbx_444_t { RGBx_444, RRRRGGGGBBBBxxxx };`.
  const overloadType = [...header.matchAll(/enum\s+(\w+_t)\s*\{([^}]*)\}/g)]
    .find(match => splitMameArgs(match[2]!).some(name => name.trim() === format[1]))?.[1];
  if (!overloadType) return fail(`no emupal.h enum declares ${format[1]}`);
  const overload = new RegExp(
    `palette_device::set_format\\s*\\(\\s*${overloadType}\\s*,[^)]*\\)\\s*\\{([\\s\\S]*?)\\n\\}`,
  ).exec(implementation);
  if (!overload) return fail(`emupal.cpp has no set_format(${overloadType}) overload`);
  const decoder = /set_format\s*\(\s*(\d+)\s*,\s*&raw_to_rgb_converter::(\w+)_rgb_decoder\s*<([^>]*)>/
    .exec(overload[1]!);
  if (!decoder) return fail(`set_format(${overloadType}) is not a standard rgb decoder`);
  const template = splitMameArgs(decoder[3]!).map(value => Number(value.trim()));
  const irgb = decoder[2] === 'standard_i';
  if ((irgb ? template.length !== 8 : template.length !== 6) ||
    template.some(value => !Number.isFinite(value))) {
    return fail(`unsupported rgb decoder template <${decoder[3]}>`);
  }
  const inverted = decoder[2] === 'inverted';
  if (!inverted && decoder[2] !== 'standard' && !irgb) {
    return fail(`unsupported rgb decoder kind ${decoder[2]}`);
  }
  const configuredEndianness =
    /\.set_endianness\s*\(\s*ENDIANNESS_(LITTLE|BIG)\s*\)/.exec(raw)?.[1];
  const endianness = configuredEndianness?.toLowerCase() as
    'little' | 'big' | undefined;

  // palette_device::device_start binds memshare(tag()) and tag() + "_ext".
  const tag = String(device.props.tag);
  const shares = new Set(graph.nodes
    .filter(node => node.label === 'AddressRange')
    .map(node => String(node.props.share ?? '')));
  if (!shares.has(tag)) return fail(`no address-map share named "${tag}"`);
  const extShare = `${tag}_ext`;
  const reset = compileRamPaletteReset(
    ast,
    className,
    `m_${tag}`,
    entries * (Number(decoder[1]) / (shares.has(extShare) ? 2 : 1)),
    shares.has(extShare),
    constants,
  );
  return {
    tag,
    ...(endianness ? { endianness } : {}),
    ...(shares.has(extShare) ? { extShare } : {}),
    entries,
    bytesPerEntry: Number(decoder[1]),
    channels: (['r', 'g', 'b'] as const).map((channel, index) => ({
      channel,
      bits: template[index + (irgb ? 1 : 0)]!,
      shift: template[index + (irgb ? 5 : 3)]!,
    })),
    ...(irgb ? { intensity: { bits: template[0]!, shift: template[4]! } } : {}),
    ...(inverted ? { inverted: true } : {}),
    ...(reset?.writes.length ? {
      resetWrites: reset.writes,
      resetSource: reset.source,
    } : {}),
    source: { file: sourceFile, line: lineOf(implementation, overload.index) },
  };
}

/**
 * Lower direct palette basemem()/extmem() initialization performed by a
 * driver's machine_reset(). These writes are semantically different from
 * ordinary address-map writes: they establish the palette state that makes a
 * board's power-on self-test visible before the game initializes palette RAM.
 */
function compileRamPaletteReset(
  ast: MameAstIndex,
  className: string,
  member: string,
  bytes: number,
  hasExt: boolean,
  constants: Record<string, number>,
): {
  writes: NonNullable<GeneratedRamPalettePlan['resetWrites']>;
  source: BoardSourceRef;
} | undefined {
  const reset = ast.findFunctionInHierarchy(className, 'machine_reset');
  if (!reset || !new RegExp(`\\b${member}->(?:base|ext)mem\\(\\)\\.write8`).test(reset.body)) {
    return undefined;
  }
  const writes: NonNullable<GeneratedRamPalettePlan['resetWrites']> = [];
  const loopPattern =
    /for\s*\(\s*int\s+i\s*=\s*([^;]+)\s*;\s*i\s*<\s*([^;]+)\s*;\s*(?:i\s*\+=\s*([^)]+)|(?:i\+\+|\+\+i))\s*\)\s*\{/g;
  let loop: RegExpExecArray | null;
  while ((loop = loopPattern.exec(reset.body)) !== null) {
    const open = reset.body.indexOf('{', loop.index + loop[0].length - 1);
    const close = matchingPair(reset.body, open, '{', '}');
    if (close < 0) continue;
    const body = reset.body.slice(open + 1, close);
    const calls = [...body.matchAll(new RegExp(
      `\\b${member}->(basemem|extmem)\\(\\)\\.write8\\s*\\(([^;]+)\\)`,
      'g',
    ))].flatMap(call => {
      const args = splitMameArgs(call[2]!);
      return args.length >= 2
        ? [{ ext: call[1] === 'extmem', offset: args[0]!, data: args[1]! }]
        : [];
    });
    if (!calls.length) continue;
    const start = expressionNumber(loop[1], constants);
    const end = expressionNumber(loop[2], constants);
    const step = loop[3] ? expressionNumber(loop[3], constants) : 1;
    if (!Number.isInteger(step) || step <= 0 || end < start) continue;
    for (let i = start; i < end; i += step) {
      for (const call of calls) {
        if (call.ext && !hasExt) continue;
        const offset = expressionNumber(call.offset.replace(/\bi\b/g, String(i)), constants);
        const data = expressionNumber(call.data.replace(/\bi\b/g, String(i)), constants);
        if (!Number.isInteger(offset) || offset < 0 || offset >= bytes) continue;
        writes.push({
          offset,
          data: data & 0xff,
          ...(call.ext ? { ext: true } : {}),
        });
      }
    }
    loopPattern.lastIndex = close + 1;
  }
  return writes.length ? { writes, source: sourceRef(reset) } : undefined;
}

function lineOf(source: string, offset: number): number {
  return source.slice(0, offset).split('\n').length;
}

function compilePalette(
  graph: KnowledgeGraph,
  machineIds: Set<string>,
  ast: MameAstIndex,
  source: string,
  constants: Record<string, number> = {},
): GeneratedPromPalettePlan | undefined {
  const deviceIds = new Set(graph.edges
    .filter(edge => machineIds.has(edge.from) && edge.rel === 'HAS_DEVICE')
    .map(edge => edge.to));
  const palette = graph.nodes.find(node =>
    deviceIds.has(node.id) && node.label === 'Device' && node.props.type === 'PALETTE');
  const raw = ((palette?.props.config as string[] | undefined) ?? []).join('\n');
  const callback = /FUNC\(\s*(\w+)::(\w+)\s*\)/.exec(raw);
  if (!callback) {
    if (process.env.MAMEKIT_DEBUG_VIDEO === '1') console.error('video palette: callback missing', raw);
    return undefined;
  }
  const fn = ast.findFunctionInHierarchy(callback[1]!, callback[2]!);
  if (!fn) {
    if (process.env.MAMEKIT_DEBUG_VIDEO === '1') console.error('video palette: source function missing', callback[0]);
    return undefined;
  }
  // Palette callbacks sometimes delegate RGB creation to a same-class helper
  // and keep only the lookup-table loops in the configured callback (1942).
  // Compile the source bodies together while retaining the callback's source
  // identity for provenance.
  const paletteHelpers = fn.statements
    .flatMap(statement => statement.calls)
    .map(call => ast.findFunctionInHierarchy(fn.className, call.name))
    .filter((candidate): candidate is MameFunction => Boolean(
      candidate && /set_(?:indirect_color|pen_color)/.test(candidate.body),
    ));
  const paletteFn: MameFunction = paletteHelpers.length
    ? { ...fn, body: [...paletteHelpers.map(helper => helper.body), fn.body].join('\n') }
    : fn;
  const resNet = compileResNetAllPalette(graph, source, paletteFn, constants);
  if (resNet) return resNet;
  const body = paletteFn.body;
  let region = /memregion\(\s*"([^"]+)"\s*\)/.exec(body)?.[1];
  const weightsCall = findCallArguments(body, 'compute_resistor_weights');
  const loops = numericForLoops(body);
  const paletteLoop = loops.find(loop =>
    loop.body.includes('set_indirect_color') ||
    loop.body.includes('set_pen_color') ||
    /\bpalette_val\s*\[\s*i\s*\]\s*=\s*rgb_t/.test(loop.body));
  // System 1 derives its 256 indirect colors entirely from the palette index
  // when the optional PROM finder is absent, then CPU palette RAM selects one
  // of those colors for each pen. Preserve that computed resistor network and
  // initialize the pen table to color zero until paletteram_w runs.
  if (!region) {
    const colorMember = /\buint8_t\s*\*\s*color_prom\s*=\s*(m_\w+)\s*\+\s*16\s*\*/
      .exec(body)?.[1];
    const spriteMember = /\buint8_t\s*\*\s*color_prom\s*=\s*(m_\w+)\s*\+\s*32\s*\*/
      .exec(body)?.[1];
    const memberRegion = (member: string | undefined): string | undefined => member
      ? new RegExp(`${member.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\(\\s*\\*this\\s*,\\s*"([^"]+)"`)
        .exec(source)?.[1]
      : undefined;
    const colorRegion = memberRegion(colorMember);
    const spriteRegion = memberRegion(spriteMember);
    if (
      colorRegion && spriteRegion &&
      body.includes('m_palette_bank ^ m_palette_bank_cache') &&
      body.includes('compute_res_net_all(rgb, color_prom, mb7051_decode_info') &&
      body.includes('compute_res_net_all(rgb, color_prom, mb7052_decode_info') &&
      body.includes('set_pen_colors(48, rgb)')
    ) {
      return {
        dynamic: { kind: 'tnx1-banked', colorRegion, spriteRegion },
        region: colorRegion,
        colorCount: 0,
        min: 0,
        max: 255,
        scaler: -1,
        channels: [],
        lookupOffset: 0,
        lookupCount: 80,
        lookupMask: 0xff,
        banks: [{
          penOffset: 0,
          colorOr: 0,
          lookupOffset: 0,
          lookupCount: 80,
          direct: true,
        }],
        transparentIndirect: 0,
        source: sourceRef(fn),
      };
    }
    const computedColors = compileComputedColorGroups(body, paletteLoop, loops);
    const carrier = graph.nodes.find(node =>
      node.label === 'RomRegion' && typeof node.props.tag === 'string')?.props.tag;
    const entries = expressionNumber(/\.set_entries\s*\(\s*([^,)]+)/.exec(raw)?.[1], constants);
    if (!computedColors.length || !carrier || !entries) {
      if (process.env.MAMEKIT_DEBUG_VIDEO === '1') {
        console.error('video palette: computed-only output', {
          computedColors: computedColors.length,
          carrier,
          entries,
        });
      }
      return undefined;
    }
    region = String(carrier);
    return {
      region,
      colorCount: 0,
      min: 0,
      max: 255,
      scaler: -1,
      channels: [],
      computedColors,
      lookupOffset: 0,
      lookupCount: entries,
      lookupMask: 0xff,
      banks: [{
        penOffset: 0,
        colorOr: 0,
        colorStride: 0,
        lookupOffset: 0,
        lookupCount: entries,
        direct: true,
      }],
      transparentIndirect: 0,
      source: sourceRef(fn),
    };
  }
  const channels = weightsCall
    ? compileResistorChannels(body, weightsCall)
    : compileFixedWeightChannels(
      paletteLoop?.body ?? body,
      paletteLoop?.start ?? 0,
    );
  const indexedColors = compileIndexedColorGroups(loops, constants);
  if (channels.length !== 3 && !indexedColors.length) {
    if (process.env.MAMEKIT_DEBUG_VIDEO === '1') console.error('video palette: channels', channels.length);
    return undefined;
  }
  const lookupLoops = loops.filter(loop =>
    loop.body.includes('set_pen_indirect') || loop.body.includes('set_pen_color'));
  const lookupOffset = expressionNumber(/color_prom\s*\+=\s*([^;]+)/.exec(body)?.[1]);
  let lookupMask = expressionNumber(/color_prom[^;]*?&\s*(0x[\da-f]+|\d+)/i.exec(
    lookupLoops.map(loop => loop.body).join('\n'),
  )?.[1]);
  let postIncrementOffset = lookupOffset + (
    paletteLoop?.body.includes('color_prom++')
      ? Math.max(0, paletteLoop.end - paletteLoop.start)
      : 0
  );
  const regionByVariable = new Map(
    [...body.matchAll(
      /\b(\w+)\s*=\s*memregion\(\s*"([^"]+)"\s*\)->base\(\)/g,
    )].map(match => [match[1]!, match[2]!]),
  );
  const banks: GeneratedPromPalettePlan['banks'] = lookupLoops.flatMap(loop => {
    const method = loop.body.includes('set_pen_indirect')
      ? 'palette.set_pen_indirect'
      : 'palette.set_pen_color';
    return findCallArgumentLists(loop.body, method).flatMap(
      (call): GeneratedPromPalettePlan['banks'] => {
      const args = splitMameArgs(call);
      if (process.env.MAMEKIT_DEBUG_VIDEO === '1') {
        console.error('video palette: lookup loop', {
          start: loop.start,
          end: loop.end,
          body: loop.body.trim(),
          args,
        });
      }
      const lookupExpression = args[1] ?? '';
      const colorExpression = /ctabentry\s*=\s*([^;]+)/.exec(loop.body)?.[1]
        ?? lookupExpression;
      const expandedColorExpression = expandPaletteLoopLocals(
        colorExpression,
        loop.body,
      );
      const lookupIndex = /color_prom\[\s*([^\]]+)\s*\]/
        .exec(expandedColorExpression)?.[1];
      const usesPostIncrement = /\*\s*color_prom\s*\+\+/.test(colorExpression);
      const lookupTerms = compilePaletteLookupTerms(
        expandedColorExpression,
        body,
        loop.sourceOffset,
        loop.start,
        regionByVariable,
        constants,
      ).filter((term, index, all) => all.findIndex(candidate =>
        candidate.region === term.region &&
        candidate.offset === term.offset &&
        candidate.mask === term.mask &&
        candidate.shift === term.shift) === index);
      // Identity mappings like set_pen_indirect(base + i, 32 + i) carry no
      // PROM lookup: the loop expressions fully describe pen and color steps.
      if (
        method === 'palette.set_pen_indirect' &&
        !lookupIndex && !usesPostIncrement &&
        !colorExpression.includes('color_prom') && !lookupTerms.length
      ) {
        const penOffset = expressionAt(args[0]!, loop.start);
        const penStride = expressionAt(args[0]!, loop.start + 1) - penOffset;
        const colorOr = expressionAt(lookupExpression, loop.start);
        const colorStride = expressionAt(lookupExpression, loop.start + 1) - colorOr;
        return [{
          penOffset,
          ...(penStride !== 1 ? { penStride } : {}),
          colorOr,
          ...(colorStride !== 1 ? { colorStride } : {}),
          lookupOffset: 0,
          lookupCount: Math.max(0, loop.end - loop.start),
          direct: true,
        }];
      }
      const currentPostIncrementOffset = postIncrementOffset;
      if (usesPostIncrement) postIncrementOffset += Math.max(0, loop.end - loop.start);
      const scalarLookupExpression = lookupExpression.replace(
        /\b\w+\s*\[[^\]]+\]/g,
        'PROM',
      );
      const scalarColorExpression = colorExpression.replace(
        /\b\w+\s*\[[^\]]+\]/g,
        'PROM',
      );
      const expandedScalarColorExpression = expandedColorExpression.replace(
        /\b\w+\s*\[[^\]]+\]/g,
        'PROM',
      );
      const colorOrExpression =
        /(?:\||\+)\s*(-?(?:0x[\da-f]+|\d+))/i.exec(scalarLookupExpression)?.[1]
        ?? /(?:\||\+)\s*(-?(?:0x[\da-f]+|\d+))/i.exec(scalarColorExpression)?.[1]
        ?? /(-?(?:0x[\da-f]+|\d+))\s*(?:\||\+)\s*\(*PROM\b/i
          .exec(expandedScalarColorExpression)?.[1]
        // A direct set_pen_color may index a local palette array with the
        // PROM value plus a bank base, e.g. palette_val[(prom & 0x0f)+0x10].
        // Replacing the outer array access with PROM hides that base, so
        // retain it from the source expression before falling back.
        ?? /\bpalette_val\s*\[[^\]]*(?:\||\+)\s*(-?(?:0x[\da-f]+|\d+))\s*\]/i
          .exec(colorExpression)?.[1]
        ?? /(-?(?:0x[\da-f]+|\d+))\s*\|/i.exec(scalarLookupExpression)?.[1]
        ?? /(-?(?:0x[\da-f]+|\d+))\s*\|/i.exec(scalarColorExpression)?.[1];
      const lookupOverride = new RegExp(
        `(?:PROM|\\w+\\s*\\[[^\\]]+\\])\\)*\\s*!=\\s*` +
        `(-?(?:0x[\\da-f]+|\\d+))[\\s\\S]*?:\\s*` +
        `(-?(?:0x[\\da-f]+|\\d+))`,
        'i',
      ).exec(expandedScalarColorExpression);
      return [{
        penOffset: paletteExpressionAt(
          args[0]!, loop.start, body, loop.sourceOffset, constants,
        ),
        colorOr: expressionNumber(colorOrExpression),
        lookupOffset: usesPostIncrement
          ? currentPostIncrementOffset
          : postIncrementOffset + expressionAt(lookupIndex ?? 'i', loop.start),
        lookupCount: Math.max(0, loop.end - loop.start),
        ...(lookupTerms.length ? { lookupTerms } : {}),
        ...(lookupOverride ? {
          lookupValueOverride: expressionNumber(lookupOverride[1]),
          overrideColor: expressionNumber(lookupOverride[2]),
        } : {}),
      }];
    });
  });
  const folded = /\b\w+\s*=\s*\(\s*i\s*<<\s*\d+\s*&\s*(0x[\da-f]+|\d+)\s*\)\s*\|\s*\(\s*i\s*&\s*(0x[\da-f]+|\d+)\s*\)/i
    .exec(lookupLoops.map(loop => loop.body).join('\n'));
  if (folded && banks.length === 2) {
    const high = Number(folded[1]);
    const lowMask = Number(folded[2]);
    const count = lowMask + 1;
    const lookupBase = banks[0]!.lookupOffset ?? 0;
    const penDeltas = [...body.matchAll(
      /\bset_pen_indirect\s*\(\s*\w+\s*(?:\|\s*(0x[\da-f]+|\d+))?/gi,
    )].slice(0, banks.length).map(match => Number(match[1] ?? 0));
    if (
      Number.isInteger(high) && high > lowMask &&
      Number.isInteger(count) && count > 0 &&
      penDeltas.length === banks.length
    ) {
      const foldedBanks: GeneratedPromPalettePlan['banks'] = [];
      for (const sourceBase of [0, high]) {
        for (let index = 0; index < banks.length; index++) {
          const lookupTerms = banks[index]!.lookupTerms?.map(term => ({
            ...term,
            offset: term.offset + sourceBase,
          }));
          foldedBanks.push({
            ...banks[index]!,
            penOffset: sourceBase + penDeltas[index]!,
            lookupOffset: lookupBase + sourceBase,
            lookupCount: count,
            ...(lookupTerms ? { lookupTerms } : {}),
          });
        }
      }
      banks.splice(0, banks.length, ...foldedBanks);
    }
  }
  const palettePenCall = paletteLoop?.body.includes('set_pen_color')
    ? findCallArguments(paletteLoop.body, 'palette.set_pen_color')
    : undefined;
  const direct = Boolean(
    palettePenCall && splitMameArgs(palettePenCall)[1]?.includes('rgb_t('),
  );
  if (direct) {
    const regionNode = graph.nodes.find(node =>
      node.label === 'RomRegion' && node.props.tag === region);
    const count = Number(regionNode?.props.size ?? 0);
    if (!count) return undefined;
    lookupMask = 0xff;
    banks.splice(0, banks.length, {
      penOffset: 0,
      colorOr: 0,
      lookupOffset: 0,
      lookupCount: count,
      direct: true,
    });
  }
  // Keep the established compact representation when a lookup is exactly the
  // plan's default PROM region/offset/mask. lookupTerms is only needed when a
  // bank selects another ROM or combines multiple PROM bitfields.
  for (const bank of banks) {
    const term = bank.lookupTerms?.length === 1 ? bank.lookupTerms[0] : undefined;
    if (
      term?.region === region &&
      term.offset === bank.lookupOffset &&
      term.mask === lookupMask &&
      term.shift === 0
    ) {
      delete bank.lookupTerms;
    }
  }
  if (!lookupMask && banks.some(bank => bank.lookupTerms?.length)) lookupMask = 0xff;
  if (!paletteLoop || !banks.length || !lookupMask) {
    if (process.env.MAMEKIT_DEBUG_VIDEO === '1') console.error('video palette: output', {
      paletteLoop: Boolean(paletteLoop), banks: banks.length, lookupMask, direct,
    });
    return undefined;
  }
  const args = weightsCall ? splitMameArgs(weightsCall) : [];
  const computedColors = compileComputedColorGroups(body, paletteLoop, loops);
  const promColors = weightsCall ? [] : loops.flatMap(loop => {
    if (loop === paletteLoop || !loop.body.includes('set_indirect_color')) return [];
    if (!loop.body.includes('color_prom')) return [];
    const call = findCallArguments(loop.body, 'palette.set_indirect_color') ??
      findCallArguments(loop.body, 'set_indirect_color');
    const groupChannels = compileFixedWeightChannels(loop.body, loop.start);
    if (!call || groupChannels.length !== 3) return [];
    return [{
      base: expressionAt(splitMameArgs(call)[0] ?? '0', loop.start),
      count: Math.max(0, loop.end - loop.start),
      channels: groupChannels,
    }];
  });
  return {
    region,
    colorCount: direct
      ? Number(graph.nodes.find(node => node.label === 'RomRegion' && node.props.tag === region)?.props.size ?? 0)
      : Math.max(0, paletteLoop.end - paletteLoop.start),
    min: weightsCall ? expressionNumber(args[0], constants) : 0,
    max: weightsCall ? expressionNumber(args[1], constants) : 255,
    scaler: weightsCall ? Number(args[2]) || -1 : 1,
    channels,
    ...(indexedColors.length ? { indexedColors } : {}),
    ...(computedColors.length ? { computedColors } : {}),
    ...(promColors.length ? { promColors } : {}),
    lookupOffset,
    lookupCount: banks[0]!.lookupCount ?? 0,
    lookupMask,
    banks,
    transparentIndirect: 0,
    source: sourceRef(fn),
  };
}

/** Inline simple per-loop aliases before extracting PROM lookup expressions. */
function expandPaletteLoopLocals(expression: string, loopBody: string): string {
  let expanded = expression;
  const declarations = [...loopBody.matchAll(
    /\b(?:int|unsigned|u8|u16|u32|uint8_t|uint16_t|uint32_t)(?:\s+const)?\s+(\w+)\s*=\s*([^;]+);/g,
  )];
  // A declaration can depend on an earlier alias; a few reverse passes are
  // sufficient for the straight-line palette loops used by MAME drivers.
  for (let pass = 0; pass < declarations.length + 1; pass++) {
    let changed = false;
    for (const declaration of declarations) {
      const name = declaration[1]!;
      if (!new RegExp(`\\b${name}\\b`).test(expanded)) continue;
      const next = expanded.replace(
        new RegExp(`\\b${name}\\b`, 'g'),
        `(${declaration[2]!.trim()})`,
      );
      changed ||= next !== expanded;
      expanded = next;
    }
    if (!changed) break;
  }
  return expanded;
}

/**
 * Lower palette loops whose RGB values are functions of the loop index rather
 * than PROM data. This covers TTL palettes expressed with MAME's palNbit
 * helpers, including conditional pulls such as Cosmic/Panic's 2/3 blue level.
 */
function compileIndexedColorGroups(
  loops: { start: number; end: number; body: string }[],
  constants: Record<string, number>,
): NonNullable<GeneratedPromPalettePlan['indexedColors']> {
  return loops.flatMap(loop => {
    if (!loop.body.includes('set_indirect_color') || loop.body.includes('color_prom')) return [];
    const call = findCallArguments(loop.body, 'palette.set_indirect_color') ??
      findCallArguments(loop.body, 'set_indirect_color');
    if (!call) return [];
    const args = splitMameArgs(call);
    const rgb = /rgb_t\s*\(([^)]*)\)/.exec(args[1] ?? '');
    if (!rgb) return [];
    const channelExpressions = splitMameArgs(rgb[1]!);
    if (channelExpressions.length !== 3) return [];
    const declarations = [...loop.body.matchAll(
      /\b(?:int|unsigned|u8|u16|u32|uint8_t|uint16_t|uint32_t)(?:\s+const)?\s+(\w+)\s*=\s*([^;]+);/g,
    )].map(match => ({ name: match[1]!, expression: match[2]! }));
    const colors: number[] = [];
    for (let index = loop.start; index < loop.end; index++) {
      const values: Record<string, number> = { ...constants, i: index };
      for (const declaration of declarations) {
        const value = evaluateIndexedPaletteExpression(declaration.expression, values);
        if (value === null) return [];
        values[declaration.name] = value;
      }
      const channels = channelExpressions.map(expression =>
        evaluateIndexedPaletteExpression(expression, values));
      if (channels.some(value => value === null)) return [];
      colors.push(packRgb(channels[0]!, channels[1]!, channels[2]!));
    }
    const base = paletteExpressionAt(args[0] ?? '0', loop.start, loop.body, 0, constants);
    return [{ base, colors }];
  });
}

function evaluateIndexedPaletteExpression(
  expression: string,
  values: Record<string, number>,
): number | null {
  let source = expression.trim();
  while (source.startsWith('(') && matchingPair(source, 0, '(', ')') === source.length - 1) {
    source = source.slice(1, -1).trim();
  }
  const question = topLevelOperator(source, '?');
  if (question >= 0) {
    const colon = topLevelOperator(source, ':', question + 1);
    if (colon < 0) return null;
    const condition = source.slice(0, question).trim().replace(/^\((.*)\)$/s, '$1');
    const comparison = /^(.*?)\s*(==|!=)\s*(.*?)$/.exec(condition);
    if (!comparison) return null;
    const left = evaluateIndexedPaletteExpression(comparison[1]!, values);
    const right = evaluateIndexedPaletteExpression(comparison[3]!, values);
    if (left === null || right === null) return null;
    const matched = comparison[2] === '==' ? left === right : left !== right;
    return evaluateIndexedPaletteExpression(
      source.slice(matched ? question + 1 : colon + 1, matched ? colon : undefined),
      values,
    );
  }
  let changed = true;
  while (changed) {
    changed = false;
    source = source.replace(/pal([1-8])bit\s*\(([^()]*)\)/g, (_match, width, inner) => {
      const value = evaluateIndexedPaletteExpression(inner, values);
      if (value === null) return _match;
      changed = true;
      const bits = Number(width);
      const mask = (1 << bits) - 1;
      const raw = value & mask;
      let expanded = 0;
      for (let filled = 0; filled < 8;) {
        const take = Math.min(bits, 8 - filled);
        expanded = ((expanded << take) | (raw >>> (bits - take))) & 0xff;
        filled += take;
      }
      return String(expanded);
    });
  }
  return evalExpr(substituteNumbers(source, values));
}

function topLevelOperator(source: string, operator: string, start = 0): number {
  let depth = 0;
  for (let index = start; index < source.length; index++) {
    const char = source[index];
    if (char === '(' || char === '[' || char === '{') depth++;
    else if (char === ')' || char === ']' || char === '}') depth--;
    else if (char === operator && depth === 0) return index;
  }
  return -1;
}

/**
 * Lower palette_device's source-defined RGB_444_PROMS constructor. Unlike
 * driver palette callbacks, this initializer lives in emupal.cpp and is
 * selected by an enum argument in PALETTE(...), so it is not represented by a
 * FUNC callback in the driver's AST.
 */
function compileBuiltinPromPalette(
  graph: KnowledgeGraph,
  machineIds: Set<string>,
  mameSrc: string,
  constants: Record<string, number>,
): GeneratedPromPalettePlan | undefined {
  const deviceIds = new Set(graph.edges
    .filter(edge => machineIds.has(edge.from) && edge.rel === 'HAS_DEVICE')
    .map(edge => edge.to));
  const palette = graph.nodes.find(node =>
    deviceIds.has(node.id) && node.label === 'Device' && node.props.type === 'PALETTE');
  const raw = ((palette?.props.config as string[] | undefined) ?? []).join('\n');
  const call = findCallArguments(raw, 'PALETTE');
  if (!call) return undefined;
  const args = splitMameArgs(call);
  if (!/(?:palette_device::)?(?:RGB_444_PROMS|RRRRGGGGBBBB_PROMS)\b/.test(args[2] ?? '')) {
    return undefined;
  }
  const region = /^"([^"]+)"$/.exec(args[3]?.trim() ?? '')?.[1];
  const entries = expressionNumber(args[4], constants);
  if (!region || entries <= 0) return undefined;

  const file = 'src/emu/emupal.cpp';
  const source = readFileSync(join(mameSrc, file), 'utf8');
  const signature = source.indexOf('void palette_device::palette_init_rgb_444_proms');
  const open = signature < 0 ? -1 : source.indexOf('{', signature);
  const close = open < 0 ? -1 : matchingPair(source, open, '{', '}');
  if (open < 0 || close < 0) return undefined;
  const body = source.slice(open + 1, close);
  if (!/palette\.set_pen_color\s*\(\s*i\s*,\s*rgb_t\s*\(\s*r\s*,\s*g\s*,\s*b\s*\)\s*\)/.test(body)) {
    return undefined;
  }

  const channels: GeneratedPromPalettePlan['channels'] = [];
  for (const [name, channel] of [
    ['red', 'r'],
    ['green', 'g'],
    ['blue', 'b'],
  ] as const) {
    const component = new RegExp(
      `//\\s*${name} component([\\s\\S]*?)int\\s+${channel}\\s*=\\s*([^;]+);`,
    ).exec(body);
    if (!component) return undefined;
    const sources = new Map<string, { bit: number; offset: number }>();
    for (const bit of component[1]!.matchAll(
      /\b(bit\d+)\s*=\s*\(colors\[\s*([^\]]+)\s*\]\s*>>\s*(\d+)\)\s*&/g,
    )) {
      const offsetExpression = bit[2]!
        .replace(/palette\.entries\(\)/g, String(entries))
        .replace(/\bi\b/g, '0');
      sources.set(bit[1]!, {
        bit: Number(bit[3]),
        offset: expressionNumber(offsetExpression, constants),
      });
    }
    const terms = [...component[2]!.matchAll(
      /(-?(?:0x[\da-f]+|\d+))\s*\*\s*(bit\d+)/gi,
    )];
    const termSources = terms.map(term => sources.get(term[2]!));
    if (!terms.length || termSources.some(sourceBit => !sourceBit)) return undefined;
    channels.push({
      channel,
      bits: termSources.map(sourceBit => sourceBit!.bit),
      offsets: termSources.map(sourceBit => sourceBit!.offset),
      weights: terms.map(term => expressionNumber(term[1])),
      resistances: [],
      pulldown: 0,
      pullup: 0,
    });
  }

  return {
    region,
    colorCount: entries,
    min: 0,
    max: 255,
    scaler: 1,
    channels,
    lookupOffset: 0,
    lookupCount: entries,
    lookupMask: 0xff,
    banks: [{
      penOffset: 0,
      colorOr: 0,
      lookupOffset: 0,
      lookupCount: entries,
      direct: true,
    }],
    transparentIndirect: 0,
    source: { file, line: lineOf(source, signature), column: 1 },
  };
}

/**
 * Lower indirect-color loops whose channels are computed from the color
 * INDEX bits through their own resistor network — MAME's 05xx star palette
 * shape: `r = combine_weights(rsweights, BIT(i, 0), BIT(i, 1))` followed by
 * `set_indirect_color(base + i, rgb_t(r, g, b))`.
 */
function compileComputedColorGroups(
  body: string,
  paletteLoop: { start: number; end: number; body: string } | undefined,
  loops: { start: number; end: number; body: string }[],
): NonNullable<GeneratedPromPalettePlan['computedColors']> {
  const networks = parseResistorNetworks(body);
  const groups: NonNullable<GeneratedPromPalettePlan['computedColors']> = [];
  for (const loop of loops) {
    // A callback with mutually exclusive optional-PROM/direct-resistor paths
    // can make the computed loop the first (paletteLoop) candidate. It is
    // still a complete color group when it does not read the PROM.
    if (!loop.body.includes('set_indirect_color')) continue;
    if (loop === paletteLoop && loop.body.includes('color_prom')) continue;
    if (loop.body.includes('color_prom')) continue;
    const call = findCallArguments(loop.body, 'palette.set_indirect_color') ??
      findCallArguments(loop.body, 'set_indirect_color');
    if (!call) continue;
    const base = expressionAt(splitMameArgs(call)[0] ?? '0', loop.start);
    const channelRe =
      /(?:int\s+const|const\s+int)\s+([rgb])\s*=\s*combine_weights\(\s*(\w+)\s*,\s*([^;]+)\)\s*;/g;
    const channels: NonNullable<GeneratedPromPalettePlan['computedColors']>[number]['channels'] = [];
    let network:
      | { resistances: number[]; pulldown: number; pullup: number;
          min: number; max: number; scaler: number }
      | undefined;
    let match: RegExpExecArray | null;
    while ((match = channelRe.exec(loop.body)) !== null) {
      const candidate = networks.get(match[2]!);
      if (!candidate) continue;
      let bits = [...match[3]!.matchAll(/BIT\(\s*i\s*,\s*(\d+)\s*\)/g)]
        .map(bit => Number(bit[1]));
      // Some callbacks assign BIT(i,n) to reused bit0/bit1/bit2 locals before
      // combine_weights. Resolve the most recent assignment for each argument.
      if (!bits.length) {
        const prefix = loop.body.slice(0, match.index);
        bits = splitMameArgs(match[3]!).flatMap(argument => {
          const name = argument.trim();
          const assignments = [...prefix.matchAll(
            new RegExp(`\\b${name}\\s*=\\s*BIT\\(\\s*i\\s*,\\s*(\\d+)\\s*\\)`, 'g'),
          )];
          const bit = assignments.at(-1)?.[1];
          return bit === undefined ? [] : [Number(bit)];
        });
      }
      if (!bits.length) continue;
      network = candidate;
      channels.push({
        channel: match[1] as 'r' | 'g' | 'b',
        bits,
        resistances: candidate.resistances,
        pulldown: candidate.pulldown,
        pullup: candidate.pullup,
      });
    }
    if (channels.length !== 3 || !network) continue;
    groups.push({
      base,
      count: Math.max(0, loop.end - loop.start),
      min: network.min,
      max: network.max,
      scaler: network.scaler,
      channels,
    });
  }
  return groups;
}

/** Parse every compute_resistor_weights call into weight-variable networks. */
function parseResistorNetworks(body: string): Map<string, {
  resistances: number[];
  pulldown: number;
  pullup: number;
  min: number;
  max: number;
  scaler: number;
}> {
  const resistanceArrays = new Map(
    [...body.matchAll(
      /(?:static\s+)?(?:constexpr|const)\s+int\s+(\w+)\s*\[[^\]]*\]\s*=\s*\{([^}]+)\}/g,
    )].map(match => [
      match[1]!,
      splitMameArgs(match[2]!).map(value => expressionNumber(value)),
    ]),
  );
  const networks = new Map<string, {
    resistances: number[];
    pulldown: number;
    pullup: number;
    min: number;
    max: number;
    scaler: number;
  }>();
  let at = 0;
  while (true) {
    const index = body.indexOf('compute_resistor_weights(', at);
    if (index < 0) break;
    const open = body.indexOf('(', index);
    const close = matchingPair(body, open, '(', ')');
    if (close < 0) break;
    at = close;
    const args = splitMameArgs(body.slice(open + 1, close));
    const min = expressionNumber(args[0]);
    const max = expressionNumber(args[1]);
    const scaler = Number(args[2]) || -1;
    for (let position = 3; position + 4 < args.length; position += 5) {
      const count = expressionNumber(args[position]);
      if (!count) continue;
      const resistanceArg = (args[position + 1] ?? '').replace(/^&/, '').trim();
      const resistanceName = /^(\w+)/.exec(resistanceArg)?.[1] ?? '';
      const resistanceValues = resistanceArrays.get(resistanceName);
      if (!resistanceValues) continue;
      const offset = Number(/\[\s*(\d+)\s*\]/.exec(resistanceArg)?.[1] ?? 0);
      const weightName = (args[position + 2] ?? '').replace(/^&/, '').trim();
      // Pulldown/pullup may reference the resistor table (resistances[0]).
      const resistorValue = (value: string | undefined): number => {
        const reference = value && /^(\w+)\s*\[\s*(\d+)\s*\]$/.exec(value.trim());
        if (reference) return resistanceArrays.get(reference[1]!)?.[Number(reference[2])] ?? 0;
        return expressionNumber(value);
      };
      networks.set(weightName, {
        resistances: resistanceValues.slice(offset, offset + count),
        pulldown: resistorValue(args[position + 3]),
        pullup: resistorValue(args[position + 4]),
        min,
        max,
        scaler,
      });
    }
  }
  return networks;
}

function compileFixedWeightChannels(
  body: string,
  indexValue = 0,
): GeneratedPromPalettePlan['channels'] {
  const bits = new Map<string, { offset: number; bit: number }>();
  const channels: GeneratedPromPalettePlan['channels'] = [];
  const sourceRe =
    /\b(bit\d+)\s*=\s*BIT\(\s*(?:color_prom\[\s*([^\]]+)\s*\]|\*\s*color_prom)\s*,\s*(\d+)\s*\)|(?:int\s+const|const\s+int)\s+([rgb])\s*=\s*([^;]+)/g;
  let match: RegExpExecArray | null;
  while ((match = sourceRe.exec(body)) !== null) {
    if (match[1]) {
      bits.set(match[1], {
        offset: expressionAt(match[2] ?? '0', indexValue),
        bit: Number(match[3]),
      });
      continue;
    }
    const terms = [...match[5]!.matchAll(
      /(-?(?:0x[\da-f]+|\d+))\s*\*\s*(bit\d+)/gi,
    )];
    const sources = terms.map(term => bits.get(term[2]!));
    if (!terms.length || sources.some(source => !source)) continue;
    channels.push({
      channel: match[4] as 'r' | 'g' | 'b',
      bits: sources.map(source => source!.bit),
      offsets: sources.map(source => source!.offset),
      weights: terms.map(term => expressionNumber(term[1])),
      resistances: [],
      pulldown: 0,
      pullup: 0,
    });
  }
  // pal4bit is MAME's exact four-bit expansion helper (v -> vvvvvvvv).
  // Represent it as the equivalent fixed contribution of each PROM bit.
  for (const expanded of body.matchAll(
    /(?:int\s+const|const\s+int)\s+([rgb])\s*=\s*pal4bit\(\s*\w+\s*\[\s*([^\]]+)\s*\]\s*\)/g,
  )) {
    channels.push({
      channel: expanded[1] as 'r' | 'g' | 'b',
      bits: [0, 1, 2, 3],
      offsets: [0, 1, 2, 3].map(() => expressionAt(expanded[2]!, indexValue)),
      weights: [0x11, 0x22, 0x44, 0x88],
      resistances: [],
      pulldown: 0,
      pullup: 0,
    });
  }
  return channels;
}

function compileResistorChannels(
  body: string,
  weightsCall: string,
): GeneratedPromPalettePlan['channels'] {
  const resistanceArrays = new Map(
    [...body.matchAll(
      /(?:static\s+)?(?:constexpr|const)\s+int\s+(\w+)\s*\[[^\]]+\]\s*=\s*\{([^}]+)\}/g,
    )].map(match => [
      match[1]!,
      splitMameArgs(match[2]!).map(value => expressionNumber(value)),
    ]),
  );
  const args = splitMameArgs(weightsCall);
  const networks = new Map<string, {
    resistances: number[];
    pulldown: number;
    pullup: number;
  }>();
  for (let index = 3; index + 4 < args.length; index += 5) {
    const count = expressionNumber(args[index]);
    if (!count) continue;
    const resistanceArg = (args[index + 1] ?? '').replace(/^&/, '').trim();
    const resistanceName = /^(\w+)/.exec(resistanceArg)?.[1] ?? '';
    const resistanceValues = resistanceArrays.get(resistanceName);
    if (!resistanceValues) continue;
    const offset = Number(/\[\s*(\d+)\s*\]/.exec(resistanceArg)?.[1] ?? 0);
    const weightName = (args[index + 2] ?? '').replace(/^&/, '').trim();
    networks.set(weightName, {
      resistances: resistanceValues.slice(offset, offset + count),
      pulldown: expressionNumber(args[index + 3]),
      pullup: expressionNumber(args[index + 4]),
    });
  }
  const channels: GeneratedPromPalettePlan['channels'] = [];
  const bitVariables = new Map<string, number>();
  const colorRe =
    /\b(bit\d+)\s*=\s*BIT\(\s*(?:color_prom\[i\]|\*\s*color_prom)\s*,\s*(\d+)\s*\)|(?:int\s+const|const\s+int)\s+([rgb])\s*=\s*combine_weights\(\s*(\w+)\s*,\s*([^)]+)\)/g;
  let color: RegExpExecArray | null;
  while ((color = colorRe.exec(body)) !== null) {
    if (color[1]) {
      bitVariables.set(color[1], Number(color[2]));
      continue;
    }
    const network = networks.get(color[4]!);
    if (!network) continue;
    channels.push({
      channel: color[3] as 'r' | 'g' | 'b',
      bits: splitMameArgs(color[5]!).map(bit => bitVariables.get(bit.trim()) ?? 0),
      ...network,
    });
  }
  return channels;
}

/**
 * Lower nibble-packed background RAM addressing out of draw_background.
 *
 * Popeye's board revisions wire the row and column counters to different
 * background RAM address and nibble-select pins; only the numbers change, so
 * the pixel loop reads them from here instead of assuming one revision.
 */
function compileBankedBackground(
  handlers: GeneratedHandler[],
): GeneratedVideoPlan['bankedBackground'] {
  const body = handlers.find(handler => handler.method === 'draw_background')?.body ?? '';
  const address = /m_background_ram\[\s*BIT\(rovi,\s*8\)\s*\?\s*\(BIT\(rovi,\s*(\d+),\s*6\)\s*<<\s*6\)\s*\|\s*BIT\(roh,\s*(\d+),\s*6\)\s*:\s*0\s*\]/
    .exec(body);
  const nibble = /\bshift\s*=\s*BIT\((rovi|roh),\s*(\d+)\)\s*\?\s*4\s*:\s*0/.exec(body);
  if (!address || !nibble) return undefined;
  return {
    rowShift: Number(address[1]),
    columnShift: Number(address[2]),
    nibble: { source: nibble[1] === 'rovi' ? 'row' : 'column', bit: Number(nibble[2]) },
    columnHighFromScroll: /BIT\(m_background_scroll\[2\],\s*0\)\s*<<\s*8/.test(body),
  };
}

function addHandler(
  handlers: GeneratedHandler[],
  fn: MameFunction,
  constants: Record<string, number> = {},
): void {
  if (handlers.some(handler => handler.ownerClass === fn.className && handler.method === fn.name)) {
    return;
  }
  const executableBody = normalizeMameExecutionSource(lowerSequentialArrayPointers(fn.body))
    // Container type spelling has no run-time behavior; handlers interact
    // with the local through ordinary calls after declaration.
    .replace(/\bstd::vector\s*<[^;{}>]+>\s+(\w+)\s*;/g, 'auto $1;');
  handlers.push({
    id: `handler:${fn.className}.${fn.name}`,
    ownerClass: fn.className,
    method: fn.name,
    parameters: fn.parameters.trim(),
    body: fn.body.trim(),
    program: compileMameHandler(executableBody),
    constants: Object.fromEntries(
      Object.entries(constants).filter(([name]) => new RegExp(`\\b${name}\\b`).test(fn.body)),
    ),
    source: sourceRef(fn),
  });
}

/** Lower a local C array's advancing pointer to an explicit array index. */
function lowerSequentialArrayPointers(source: string): string {
  let lowered = source;
  for (const match of source.matchAll(
    /\b(?:u?int(?:8|16|32)_t|pen_t)\s*\*\s*(\w+)\s*=\s*(\w+)\s*;/g,
  )) {
    const pointer = match[1]!;
    const array = match[2]!;
    if (!new RegExp(`\\b${array}\\s*\\[`).test(source)) continue;
    const dereference = new RegExp(`\\*\\s*${pointer}\\s*\\+\\+`, 'g');
    if (!dereference.test(source)) continue;
    lowered = lowered
      .replace(match[0], `int ${pointer} = 0;`)
      .replace(dereference, `${array}[${pointer}++]`);
  }
  return lowered;
}

function addHandlerClosure(
  handlers: GeneratedHandler[],
  ast: MameAstIndex,
  roots: string[],
  constants: Record<string, number>,
  driverClass?: string,
): void {
  const queue = [...roots];
  const seen = new Set<string>();
  while (queue.length) {
    const key = queue.shift()!;
    if (seen.has(key)) continue;
    seen.add(key);
    const [ownerClass, method] = splitHandlerKey(key);
    // The driver class the GAME macro selected owns every virtual call, even
    // the ones written inside a base class it inherited.
    const fn = ast.findDispatchedFunction(driverClass, ownerClass, method);
    if (!fn) continue;
    addHandler(handlers, fn, constants);
    queue.push(...calledSourceMethods(fn.body).map(name => `${fn.className}.${name}`));
  }
}

function machineConfigClosure(graph: KnowledgeGraph, machineId: string): Set<string> {
  const result = new Set<string>();
  const queue = [machineId];
  while (queue.length) {
    const id = queue.shift()!;
    if (result.has(id)) continue;
    result.add(id);
    queue.push(...graph.edges
      .filter(edge => edge.from === id && edge.rel === 'CALLS')
      .map(edge => edge.to));
  }
  return result;
}

/**
 * Resolve the active graphics table for each GFXDECODE device. Machine config
 * calls are ordered most-derived to base, so the first DECODES edge for a
 * device tag is MAME's effective set_info value.
 */
export function effectiveGfxDecodes(
  graph: KnowledgeGraph,
  machineId: string,
): KGNode[] {
  const result: KGNode[] = [];
  const seenDevices = new Set<string>();
  for (const id of machineConfigClosure(graph, machineId)) {
    for (const edge of graph.edges.filter(edge =>
      edge.from === id && edge.rel === 'DECODES')) {
      const deviceTag = String(edge.props?.deviceTag ?? edge.to);
      if (seenDevices.has(deviceTag)) continue;
      const decode = graph.nodes.find(node => node.id === edge.to);
      if (!decode) continue;
      seenDevices.add(deviceTag);
      result.push(decode);
    }
  }
  return result;
}

/**
 * Horizontal prescale the framebuffer can be rendered back down to.
 *
 * The galaxian family decodes every gfx element at GALAXIAN_XSCALE and widens
 * the screen h params to match, so the whole frame is one uniform horizontal
 * stretch and drawing it at native width is lossless. That only holds when
 * every decode shares the same xscale and nothing is scaled vertically. Boards
 * like popeye and mcr3 scale one decode 2x2 for a 16x16 tilemap built from 8x8
 * chars while their sprites stay 1:1: the screen is genuinely 512 wide, so
 * halving it would throw away every odd sprite column.
 */
export function gfxRenderScale(graph: KnowledgeGraph, machineId: string): number {
  const entries = effectiveGfxDecodes(graph, machineId)
    .flatMap(decode => graph.edges
      .filter(edge => edge.from === decode.id && edge.rel === 'HAS_ENTRY'))
    .map(edge => graph.nodes.find(node => node.id === edge.to))
    .filter((node): node is KGNode => Boolean(node));
  if (!entries.length) return 1;
  const scales = entries.map(entry => ({
    x: Number(entry.props.xscale ?? 1),
    y: Number(entry.props.yscale ?? 1),
  }));
  if (scales.some(scale => scale.y !== 1 || scale.x !== scales[0]!.x)) return 1;
  return scales[0]!.x;
}

function sourceNumericConstants(source: string): Record<string, number> {
  const expressions = new Map<string, string>();
  for (const match of source.matchAll(/^\s*#define\s+(\w+)\s+([^/\r\n]+)/gm)) {
    if (!match[2]!.includes('(') || /^\s*\(+[\dA-Za-z_]/.test(match[2]!)) {
      expressions.set(match[1]!, match[2]!.trim());
    }
  }
  for (const match of source.matchAll(
    /\b(?:static\s+)?constexpr\s+(?:\w+\s+)+(\w+)\s*(?:\([^)]*\))?\s*=\s*([^;]+);/g,
  )) {
    expressions.set(match[1]!, match[2]!.trim());
  }
  const values: Record<string, number> = {};
  for (let pass = 0; pass < expressions.size + 1; pass++) {
    let changed = false;
    for (const [name, expression] of expressions) {
      if (values[name] !== undefined) continue;
      const normalized = substituteNumbers(expression, values)
        .replace(/([\d.]+)_MHz_XTAL/g, '($1*1000000)')
        .replace(/([\d.]+)_kHz_XTAL/g, '($1*1000)')
        .replace(/\(\s*(\d+)\s*<<\s*(\d+)\s*\)/g, (_match, value, shift) =>
          String(Number(value) * 2 ** Number(shift)))
        .replace(/\.dvalue\(\)/g, '');
      const value = evalExpr(normalized);
      if (value == null || !Number.isFinite(value)) continue;
      values[name] = value;
      changed = true;
    }
    if (!changed) break;
  }
  return values;
}

function sourceMemberDefaults(
  source: string,
  constants: Record<string, number>,
): Record<string, number | number[]> {
  const defaults: Record<string, number | number[]> = {};
  const mameConstants = {
    INPUT_LINE_NMI: -1,
    INPUT_LINE_RESET: -2,
    INPUT_LINE_IRQ0: 0,
  };
  for (const match of source.matchAll(
    /\b(?:bool|int|u?int(?:8|16|32)_t|u8|u16|u32)\s+(m_\w+)\s*=\s*([^;]+);/g,
  )) {
    const expression = substituteNumbers(match[2]!, {
      ...mameConstants,
      ...constants,
      ...numericState(defaults),
    })
      .replace(/\bfalse\b/g, '0')
      .replace(/\btrue\b/g, '1')
      .replace(/\b(0x[\da-f]+|\d+)[uUlL]+\b/gi, '$1');
    const value = evalExpr(expression);
    if (value != null && Number.isFinite(value)) defaults[match[1]!] = value;
  }
  for (const match of source.matchAll(
    /\b(?:bool|double|int|u?int(?:8|16|32)_t|u8|u16|u32)\s+(m_\w+)\s*\[\s*(\d+)\s*\]\s*(?:=\s*)?\{\s*\}\s*;/g,
  )) {
    defaults[match[1]!] = new Array(Number(match[2])).fill(0);
  }
  for (const match of source.matchAll(/(?:^|[:,])\s*(m_\w+)\s*\{\s*([^{}]+)\s*\}/gm)) {
    const values = splitMameArgs(match[2]!).map(expression =>
      expressionNumber(expression, { ...constants, ...numericState(defaults) }));
    if (values.length && values.every(Number.isFinite)) defaults[match[1]!] = values;
  }
  return defaults;
}

function staticNumericArrays(
  body: string,
  constants: Record<string, number>,
): Record<string, number[]> {
  const arrays: Record<string, number[]> = {};
  for (const match of body.matchAll(
    /\bstatic\s+const\s+(?:double|int|u?int(?:8|16|32)_t|u8|u16|u32)\s+(\w+)\s*\[\s*\d+\s*\]\s*=\s*\{([^{}]*)\}\s*;/g,
  )) {
    const values = splitMameArgs(match[2]!).map(value => expressionNumber(value, constants));
    if (values.length && values.every(Number.isFinite)) arrays[match[1]!] = values;
  }
  return arrays;
}

function substituteNumbers(source: string, values: Record<string, number>): string {
  return source.replace(/\b[A-Za-z_]\w*\b/g, token =>
    values[token] === undefined ? token : `(${values[token]})`);
}

function compileInitDelegates(
  ast: MameAstIndex,
  ownerClass: string,
  initName: string,
): Record<string, string | null> {
  const init = initName && ast.findFunctionInHierarchy(ownerClass, initName);
  if (!init) return {};
  const delegates: Record<string, string | null> = {};
  for (const call of calledSourceMethods(init.body)) {
    const helper = ast.findFunctionInHierarchy(ownerClass, call);
    const rawArgs = findCallArguments(init.body, call);
    if (!helper || rawArgs === undefined) continue;
    const args = splitMameArgs(rawArgs);
    const parameters = helper.parameters.split(',').map(parameter =>
      /(\w+)\s*$/.exec(parameter.trim())?.[1] ?? '');
    const byParameter = Object.fromEntries(parameters.map((name, index) => [name, args[index] ?? '']));
    const assignment = /\b(m_\w+)\s*=\s*\w+_delegate\(\s*(\w+)\s*\?\s*\2\s*:\s*&([A-Za-z_]\w*)::(\w+)/g;
    for (const match of helper.body.matchAll(assignment)) {
      const selected = /&([A-Za-z_]\w*)::(\w+)/.exec(byParameter[match[2]!] ?? '');
      delegates[match[1]!] = selected
        ? `${selected[1]}.${selected[2]}`
        : `${match[3]}.${match[4]}`;
    }
  }

  // Driver init can deliberately clear a delegate after a shared helper has
  // supplied its family default. Zig Zag does this for Galaxian's bullet
  // renderer: common_init() installs galaxian_draw_bullet, then
  // `m_draw_bullet_ptr = draw_bullet_delegate()` disables it. Preserve that
  // source ordering instead of retaining the helper's earlier assignment.
  for (const match of init.body.matchAll(
    /\b(m_\w+)\s*=\s*\w+_delegate\(\s*\)\s*;/g,
  )) {
    delegates[match[1]!] = null;
  }
  return delegates;
}

function compileVideoColorTables(
  source: string,
  constants: Record<string, number>,
): Record<string, number[]> {
  const tables: Record<string, number[]> = {};
  if (source.includes('m_star_color[i]') && constants.RGB_MAXIMUM) {
    const maximum = constants.RGB_MAXIMUM;
    const min = Math.trunc(maximum * 130 / 150);
    const mid = Math.trunc(maximum * 130 / 100);
    const max = Math.trunc(maximum * 130 / 60);
    const map = [0, min, min + Math.trunc((255 - min) * (mid - min) / (max - min)), 255];
    tables.m_star_color = Array.from({ length: 64 }, (_, index) => packRgb(
      map[(((index >> 4) & 1) << 1) | ((index >> 5) & 1)]!,
      map[(((index >> 2) & 1) << 1) | ((index >> 3) & 1)]!,
      map[((index & 1) << 1) | ((index >> 1) & 1)]!,
    ));
  }
  if (source.includes('m_bullet_color[7]') && source.includes('rgb_t(0xff,0xff,0x00)')) {
    tables.m_bullet_color = [
      ...Array.from({ length: 7 }, () => packRgb(255, 255, 255)),
      packRgb(255, 255, 0),
    ];
  }
  return tables;
}

function compileVideoLfsr(
  ast: MameAstIndex,
  ownerClass: string,
  constants: Record<string, number>,
): GeneratedVideoPlan['lfsrTable'] | undefined {
  const fn = ast.findFunctionInHierarchy(ownerClass, 'stars_init');
  if (!fn) return undefined;
  const enabled = /\(shiftreg\s*&\s*(0x[\da-f]+|\d+)\)\s*==\s*(0x[\da-f]+|\d+)/i.exec(fn.body);
  const color = /~shiftreg\s*&\s*(0x[\da-f]+|\d+)\)\s*>>\s*(\d+)/i.exec(fn.body);
  const feedback = /shiftreg\s*>>\s*(\d+)\)\s*\^\s*~shiftreg[\s\S]*?<<\s*(\d+)/.exec(fn.body);
  const period = constants.STAR_RNG_PERIOD;
  if (!enabled || !color || !feedback || !period) return undefined;
  const row = ast.findFunctionInHierarchy(ownerClass, 'stars_draw_row');
  const colorMember = row && /m_star_color\s*\[/.exec(row.body)?.[0]
    ? /\b(m_\w+)\s*\[\s*star\s*&/.exec(row.body)?.[1]
    : undefined;
  const scaleMember = row && /bitmap\.pix\s*\(\s*y\s*,\s*(m_\w+)\s*\*\s*x/.exec(row.body)?.[1];
  return {
    member: 'm_stars',
    period,
    enabledMask: Number(enabled[1]),
    enabledValue: Number(enabled[2]),
    colorMask: Number(color[1]),
    colorShift: Number(color[2]),
    feedbackTap: Number(feedback[1]),
    feedbackInvertTap: 0,
    feedbackWidth: Number(feedback[2]) + 1,
    ...(row && colorMember && scaleMember
      ? { rowRenderer: { method: row.name, colorMember, scaleMember } }
      : {}),
  };
}

function packRgb(red: number, green: number, blue: number): number {
  return (0xff000000 | (blue << 16) | (green << 8) | red) >>> 0;
}

function initialState(
  body: string,
  values: Record<string, number> = {},
): Record<string, number> {
  const state: Record<string, number> = {};
  for (const match of body.matchAll(/\b(m_\w+)\s*=\s*([^;]+)\s*;/g)) {
    const expression = substituteNumbers(match[2]!, { ...values, ...state })
      .replace(/\bfalse\b/g, '0')
      .replace(/\btrue\b/g, '1')
      .replace(/\b(0x[\da-f]+|\d+)[uUlL]+\b/gi, '$1');
    const value = evalExpr(expression);
    if (value != null && Number.isFinite(value)) state[match[1]!] = value;
  }
  return state;
}

/** Apply no-argument driver-init helpers before the selected init's writes. */
function methodInitialState(
  ast: MameAstIndex,
  method: MameFunction,
  values: Record<string, number>,
  seen = new Set<string>(),
): Record<string, number> {
  const key = `${method.className}.${method.name}`;
  if (seen.has(key)) return {};
  seen.add(key);
  const state: Record<string, number> = {};
  for (const call of method.body.matchAll(/\b(\w+)\s*\(\s*\)\s*;/g)) {
    const helper = ast.findFunctionInHierarchy(method.className, call[1]!);
    if (!helper) continue;
    Object.assign(state, methodInitialState(ast, helper, { ...values, ...state }, seen));
  }
  const expandedAssignments = method.body.replace(
    /\b(m_\w+)\s*=\s*(m_\w+)\s*=\s*([^;]+);/g,
    '$2 = $3; $1 = $2;',
  );
  Object.assign(state, initialState(expandedAssignments, { ...values, ...state }));
  return state;
}

/**
 * Numeric driver setters called by a machine config are source-defined board
 * facts. For example, Zig Zag calls set_num_spritegens(2), whose inline MAME
 * body assigns m_numspritegens. Apply those simple assignments after class
 * defaults and before video_start, matching MAME's construction order.
 */
function machineConfigInitialState(
  ast: MameAstIndex,
  source: string,
  config: MameFunction,
  constants: Record<string, number>,
): Record<string, number> {
  const state: Record<string, number> = {};
  for (const match of config.body.matchAll(
    /\b((?:set_\w+)|(?:\w+_video_config))\s*\(([^;()]*)\)\s*;/g,
  )) {
    const method = ast.findFunctionInHierarchy(config.className, match[1]!)
      ?? inlineSetter(source, match[1]!);
    if (!method) continue;
    const arguments_ = splitMameArgs(match[2]!).map(argument =>
      evalExpr(
        substituteNumbers(argument, constants)
          .replace(/\bfalse\b/g, '0')
          .replace(/\btrue\b/g, '1'),
        constants,
      ));
    if (arguments_.some(value => value === null)) continue;
    const parameters = splitMameArgs(method.parameters)
      .map(parameter => /(\w+)\s*$/.exec(parameter.trim())?.[1])
      .filter((name): name is string => Boolean(name));
    const values = {
      ...constants,
      ...Object.fromEntries(parameters.map((name, index) => [name, arguments_[index] ?? 0])),
    };
    Object.assign(state, initialState(method.body, { ...values, ...state }));
  }
  return state;
}

function inlineSetter(
  source: string,
  name: string,
): { parameters: string; body: string } | undefined {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const declaration = new RegExp(
    `\\b(?:void|int|unsigned|bool|u(?:8|16|32|64)|s(?:8|16|32|64))\\s+` +
    `${escaped}\\s*\\(([^)]*)\\)\\s*\\{`,
  ).exec(source);
  if (!declaration) return undefined;
  const open = source.indexOf('{', declaration.index + declaration[0].length - 1);
  const close = matchingPair(source, open, '{', '}');
  return close < 0
    ? undefined
    : {
        parameters: declaration[1]!,
        body: source.slice(open + 1, close),
      };
}

function numericState(
  values: Record<string, number | number[]>,
): Record<string, number> {
  return Object.fromEntries(
    Object.entries(values).filter((entry): entry is [string, number] =>
      typeof entry[1] === 'number'),
  );
}

function arrayState(
  values: Record<string, number | number[]>,
): Record<string, number[]> {
  return Object.fromEntries(
    Object.entries(values).filter((entry): entry is [string, number[]] =>
      Array.isArray(entry[1])),
  );
}

function calledSourceMethods(body: string): string[] {
  return [...body.matchAll(/\b([A-Za-z_]\w*)\s*\(/g)].map(match => match[1]!);
}

function splitHandlerKey(key: string): [string, string] {
  const index = key.lastIndexOf('.');
  return [key.slice(0, index), key.slice(index + 1)];
}

function resolvedHandlerKey(ast: MameAstIndex, key: string): string {
  const [ownerClass, method] = splitHandlerKey(key);
  if (!ownerClass || !method) return key;
  const fn = ast.findFunctionInHierarchy(ownerClass, method);
  return fn ? `${fn.className}.${fn.name}` : key;
}

function funcKey(value: string | undefined): string | undefined {
  const match = value && /FUNC\(\s*(\w+)::(\w+)\s*\)/.exec(value);
  return match ? `${match[1]}.${match[2]}` : undefined;
}

function standardTilemapMapper(value: string | undefined): string | undefined {
  const mapper = value?.trim();
  return mapper && /^TILEMAP_SCAN_(?:ROWS|COLS)$/.test(mapper) ? mapper : undefined;
}

function findCallArguments(source: string, name: string): string | undefined {
  const at = source.indexOf(`${name}(`);
  if (at < 0) return undefined;
  const open = source.indexOf('(', at + name.length);
  const close = matchingPair(source, open, '(', ')');
  return close < 0 ? undefined : source.slice(open + 1, close);
}

function findCallArgumentLists(source: string, name: string): string[] {
  const calls: string[] = [];
  let cursor = 0;
  while (cursor < source.length) {
    const at = source.indexOf(`${name}(`, cursor);
    if (at < 0) break;
    const open = source.indexOf('(', at + name.length);
    const close = matchingPair(source, open, '(', ')');
    if (close < 0) break;
    calls.push(source.slice(open + 1, close));
    cursor = close + 1;
  }
  return calls;
}

function matchingPair(source: string, open: number, left: string, right: string): number {
  let depth = 0;
  for (let index = open; index < source.length; index++) {
    if (source[index] === left) depth++;
    else if (source[index] === right && --depth === 0) return index;
  }
  return -1;
}

function expressionNumber(
  value: string | undefined,
  constants: Record<string, number> = {},
): number {
  if (!value) return 0;
  return evalExpr(substituteNumbers(value.trim(), constants)) ?? 0;
}

function expressionAt(source: string, index: number): number {
  return expressionNumber(source.replace(/\bi\b/g, String(index)));
}

/** Evaluate a loop expression after replaying numeric locals declared earlier. */
function paletteExpressionAt(
  source: string,
  index: number,
  body: string,
  before: number,
  constants: Record<string, number>,
): number {
  const values: Record<string, number> = { ...constants };
  const prefix = body.slice(0, before);
  const events = /\b(?:int|unsigned|u8|u16|u32|uint8_t|uint16_t|uint32_t)(?:\s+const)?\s+(\w+)\s*=\s*([^;]+);|\b(\w+)\s*\+=\s*([^;]+);/g;
  let event: RegExpExecArray | null;
  while ((event = events.exec(prefix)) !== null) {
    const name = event[1] ?? event[3]!;
    const expression = event[2] ?? event[4]!;
    const value = evalExpr(substituteNumbers(expression.trim(), values));
    if (value === null) continue;
    values[name] = event[3] ? (values[name] ?? 0) + value : value;
  }
  return expressionNumber(source.replace(/\bi\b/g, String(index)), values);
}

function compilePaletteLookupTerms(
  expression: string,
  body: string,
  before: number,
  index: number,
  regions: Map<string, string>,
  constants: Record<string, number>,
): NonNullable<GeneratedPromPalettePlan['banks'][number]['lookupTerms']> {
  const terms: NonNullable<GeneratedPromPalettePlan['banks'][number]['lookupTerms']> = [];
  const access = /\b(\w+)\s*\[\s*([^\]]+)\s*\]/g;
  let match: RegExpExecArray | null;
  while ((match = access.exec(expression)) !== null) {
    const region = regions.get(match[1]!);
    if (!region) continue;
    const tail = expression.slice(access.lastIndex);
    const operation = /^\s*(?:&\s*(-?(?:0x[\da-f]+|\d+)))?\s*\)*\s*(?:<<\s*(\d+))?/i.exec(tail);
    const pointerAdvance = [...body.slice(0, before).matchAll(
      new RegExp(`\\b${match[1]}\\s*\\+=\\s*([^;]+);`, 'g'),
    )].reduce((total, advance) => total + expressionNumber(advance[1], constants), 0);
    // A palette loop commonly consumes its PROM pointer one byte at a time
    // (`color_prom++`) before a later lookup-table loop indexes that same
    // pointer.  The compact bank offset already accounts for those consumed
    // bytes; explicit lookup terms must do the same or they take precedence
    // at runtime and incorrectly read from the start of the color PROM.
    // Bank Panic is the canonical two-layer case: its lookup tables begin at
    // 0x20/0x120, and reading offset zero makes one layer transparent while
    // mapping the other to a solid pink field.
    const pointerPostIncrement = numericForLoops(body)
      .filter(loop => loop.sourceOffset < before)
      .reduce((total, loop) => {
        const increments = [
          ...loop.body.matchAll(new RegExp(`\\b${match![1]}\\s*\\+\\+`, 'g')),
          ...loop.body.matchAll(new RegExp(`\\+\\+\\s*${match![1]}\\b`, 'g')),
        ].length;
        return total + increments * Math.max(0, loop.end - loop.start);
      }, 0);
    terms.push({
      region,
      offset: pointerAdvance + pointerPostIncrement + paletteExpressionAt(
        match[2]!, index, body, before, constants,
      ),
      mask: expressionNumber(operation?.[1] ?? '0xff'),
      shift: expressionNumber(operation?.[2] ?? '0'),
    });
  }
  return terms;
}

function numericForLoops(source: string): {
  start: number;
  end: number;
  body: string;
  sourceOffset: number;
}[] {
  const loops: { start: number; end: number; body: string; sourceOffset: number }[] = [];
  const pattern =
    /for\s*\(\s*int\s+i\s*=\s*([^;]+)\s*;\s*i\s*<\s*([^;]+)\s*;\s*(?:i\+\+|\+\+i)\s*\)\s*\{/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(source)) !== null) {
    const open = source.indexOf('{', match.index + match[0].length - 1);
    const close = matchingPair(source, open, '{', '}');
    if (close < 0) continue;
    loops.push({
      start: expressionNumber(match[1]),
      end: expressionNumber(match[2]),
      body: source.slice(open + 1, close),
      sourceOffset: match.index,
    });
    pattern.lastIndex = close + 1;
  }
  const singleStatementPattern =
    /for\s*\(\s*int\s+i\s*=\s*([^;]+)\s*;\s*i\s*<\s*([^;]+)\s*;\s*(?:i\+\+|\+\+i)\s*\)\s*(?!\{)([^;]+;)/g;
  while ((match = singleStatementPattern.exec(source)) !== null) {
    if (match[3]!.trimStart().startsWith('{')) continue;
    loops.push({
      start: expressionNumber(match[1]),
      end: expressionNumber(match[2]),
      body: match[3]!,
      sourceOffset: match.index,
    });
  }
  return loops.sort((left, right) => left.sourceOffset - right.sourceOffset);
}

function sourceRef(fn: MameFunction): BoardSourceRef {
  return { file: fn.span.file, line: fn.span.line, column: fn.span.column };
}
