import { existsSync, readFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import type { KnowledgeGraph, KGNode } from '../kg/types.ts';
import { evalExpr, parseGfxLayouts, stripComments } from '../kg/parse.ts';
import type { BoardSourceRef, GeneratedGfxLayout, GeneratedHandler, GeneratedPromPalettePlan, GeneratedRamPalettePlan, GeneratedVideoPlan } from '../ir/board.ts';
import {
  functionArity, lowerOverloadedCalls, MameAstIndex, overloadedName, parseMameAst, parseOverloadedName, splitMameArgs,
  type MameFunction,
} from './ast.ts';
import { normalizeMameExecutionSource } from './cpu-compiler.ts';
import { compileMameHandler } from './handler-ir.ts';
import { lowerDriverMemberPointers } from './member-pointers.ts';
import {
  collectBitAliasMacros, collectMemberAliasMacros, collectMemberExpressionMacros, expandMemberAliasMacros,
  expandStatementMacros,
} from './preprocessor.ts';

export interface CompiledMameVideo {
  plan: GeneratedVideoPlan;
  handlers: GeneratedHandler[];
  /**
   * The palette_device init callbacks the board runs at each palette's
   * device_start (execution.paletteInits), when no plan colours them.
   */
  paletteCallbacks?: PaletteCallback[];
}

const TILEMAP_FRAMEWORK_HEADER = 'src/emu/tilemap.h';

export function compileMameVideo(
  graph: KnowledgeGraph,
  mameSrc: string,
  machineId: string,
  /** The target's short name; a driver file's graph holds every game in it. */
  gameName?: string,
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
  const activeDevices = graph.edges
    .filter(edge => machineIds.has(edge.from) && edge.rel === 'HAS_DEVICE')
    .map(edge => graph.nodes.find(node => node.id === edge.to))
    .filter((node): node is KGNode => node !== undefined && node.label === 'Device');
  const deviceByType = (type: string): KGNode | undefined =>
    activeDevices.find(device => String(device.props.type) === type);
  const screenCallback = graph.nodes.find(node =>
    node.label === 'Callback' &&
    node.props.signal === 'set_screen_update');
  const screenClass = String(screenCallback?.props.targetClass ?? machine.props.cls);
  const screenMethod = String(screenCallback?.props.targetMethod ?? '');
  const screen = ast.findFunctionInHierarchy(screenClass, screenMethod)
    ?? ast.ast.units.flatMap(unit => unit.functions)
      .find(candidate => candidate.name === screenMethod);
  // MAME renamed vector_device's update from video_output_update to
  // screen_update (57cf10f09f7). Matching only the old spelling silently
  // dropped the whole vector plan the day the checkout moved past it, and
  // asteroid came up with no video at all.
  if (screenClass === 'vector_device' &&
      (screenMethod === 'video_output_update' || screenMethod === 'screen_update')) {
    // A vector generator the board composes as a generated device, pointed at
    // the display with `set_vector` (Battlezone's AVG). It fills the display
    // list itself; the plan only says whose list it is.
    const generator = activeDevices.find(device =>
      (Array.isArray(device.props.config) ? device.props.config.map(String) : [])
        .some(line => /\bset_vector\s*\(/.test(line)));
    if (generator) {
      const config = ast.findFunction(String(machine.props.cls), String(machine.props.name));
      return {
        plan: {
          gfx: [],
          tilemaps: [],
          initialState: memberDefaults,
          vector: { type: 'device', generator: String(generator.props.tag) },
          ...(config ? { source: sourceRef(config) } : {}),
        },
        handlers: [],
      };
    }
  }
  if (
    screen?.body.includes('uint8_t const *const source = &m_videoram[y]') &&
    screen.body.includes('source[(x / 2) * 256]') &&
    screen.body.includes('m_palette->pen_color(m_paletteram[x])')
  ) {
    const paletteCallbacks = compileCallbackPalettes(graph, machineIds).filter(callback => callback.handler).slice(0, 1);
    if (!paletteCallbacks.length) return fail('index-derived screen palette did not lower');
    return {
      plan: {
        gfx: [],
        ...(Object.keys(regionBindings).length ? { regionBindings } : {}),
        tilemaps: [],
        initialState: memberDefaults,
        source: sourceRef(screen),
      },
      handlers: [],
      ...(paletteCallbacks.length ? { paletteCallbacks } : {}),
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
      // The converter a paletteRam plan names is lowered by the knowledge
      // graph, with the MAME libraries it calls (kg/build.ts recordPaletteInit).
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
  const driverStart = startMatch
    // MCFG may spell the selected derived driver class even when the
    // VIDEO_START_MEMBER implementation is inherited from its base class
    // (pengo_state selects pacman_state::video_start_pacman).
    ? ast.findFunctionInHierarchy(startMatch[1]!, `video_start_${startMatch[2]}`)
    : ast.findFunctionInHierarchy(String(machine.props.cls), 'video_start');
  // A plain device_t can own the tilemap and decoded-gfx finder while the
  // driver merely delegates its screen update to that device. Lady Bug is the
  // canonical shape: LADYBUG_VIDEO(...).set_gfxdecode_tag("gfxdecode") points
  // the device back at the driver's GFXDECODE, and its device_start creates
  // the only tilemap on the board. Treat that lifecycle method as video_start
  // so the tilemap, its callback and its gfx binding all enter the plan.
  const deviceStart = !driverStart && screen
    ? configuredGfxDeviceStart(configFunctions, screen, ast, source)
    : undefined;
  const start = driverStart ?? deviceStart;
  // A screen updated by a device (`set_screen_update("maincpu",
  // FUNC(tms34010_device::tms340x0_ind16))`) draws through that device; the
  // palette and gfx the driver configures still belong in the plan.
  if (!start && !screen && !screenCallback?.props.targetTag) {
    return fail(`missing video_start and screen update for ${String(machine.props.cls)}`);
  }

  const decodes = effectiveGfxDecodes(graph, machineId);
  const konamiGfx = konamiDeviceGfx(source, activeDevices);
  // A device-drawn screen may have no GFXDECODE at all: the T-Unit blits
  // from ROM into VRAM and its screen update copies VRAM through the palette.
  const deviceDrawnScreen = !start && !screen && Boolean(screenCallback?.props.targetTag);
  // A screen update that draws every pixel itself needs no GFXDECODE: Sega's
  // Vic Dual reads its character RAM straight into the bitmap.
  if (!decodes.length && !konamiGfx.length && !deviceDrawnScreen && !screen) {
    return fail(`missing gfx decode in machine composition`);
  }
  const decodeBindings = compileDecodeBindings(graph, machineIds);
  const renderScale = gfxRenderScale(graph, machineId);
  const numericDefaults = numericState(memberDefaults);
  const configState = machineConfigInitialState(ast, source, config, constants);
  // The target's own GAME entry, not the file's first: atarisy1.cpp lists
  // Peter Pack Rat first, and Marble Madness took its init_peterpak --
  // `m_trackball_type = 0`, a joystick -- so the trackball was never read.
  const game = (gameName
    ? graph.nodes.find(node => node.label === 'Game' && node.props.name === gameName)
    : undefined) ?? graph.nodes.find(node => node.label === 'Game');
  const driverInit = ast.findFunctionInHierarchy(
    String(machine.props.cls),
    String(game?.props.init ?? ''),
  );
  const driverInitState = driverInit
    ? methodInitialState(ast, driverInit, { ...constants, ...numericDefaults })
    : {};
  const machineStart = ast.findFunctionInHierarchy(
    String(machine.props.cls),
    'machine_start',
  );
  // Driver-owned video buffers are sometimes allocated in machine_start
  // rather than video_start. Simpsons' staging sprite RAM is one such buffer:
  // CPU writes target it, then vblank DMA copies active objects into K053246.
  // Preserve both lifecycle allocation sites in the board's initial state.
  const allocatedState = {
    ...(machineStart
      ? allocatedVideoState(ast, machineStart, { ...constants, ...numericDefaults })
      : {}),
    ...(start
      ? allocatedVideoState(ast, start, { ...constants, ...numericDefaults })
      : {}),
  };
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
  // The K052109 owns its three tilemaps and decode table. Drivers only call
  // tilemap_draw, so their video_start has no create() call for the ordinary
  // graph-based extractor to see. Lower the device lifecycle source through
  // the same tilemap compiler and bind the result to that device's gfx set.
  const k052109Start = deviceByType('K052109')
    ? ast.findFunction('k052109_device', 'device_start')
    : undefined;
  const k052109Member = deviceByType('K052109')
    ? String(deviceByType('K052109')!.props.member ?? 'm_k052109')
    : undefined;
  const deviceTilemaps = k052109Start && k052109Member
    ? compileTilemaps(k052109Start, constants, ast).map(tilemap => ({
        ...tilemap,
        decodeMember: k052109Member,
      }))
    : [];
  // A tilemap the machine configuration declares rather than video_start.
  const configuredTilemaps = compileDeviceTilemaps(graph, machineIds, ast, constants)
    .filter(tilemap => !tilemaps.some(created => created.member === tilemap.member));
  // Some boards allocate temporary bitmaps in video_start and render decoded
  // gfx into them directly (Mat Mania is the common example).  A video_start
  // with no tilemap is therefore still a valid source-derived video plan when
  // the selected screen handler exists; the generated runtime supplies the
  // temporary bitmap and copy primitives used by that handler.
  if (start && !tilemaps.length && !configuredTilemaps.length && !screen) {
    return fail(`video_start emitted no tilemaps`);
  }
  // FUNC() in an inherited video_start often names the selected derived
  // state even though the TILE_GET_INFO implementation lives on its base.
  // Store the declaring-class key used by the compiled handler registry.
  const executableTilemaps = [...tilemaps, ...deviceTilemaps, ...configuredTilemaps].map(tilemap => ({
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
    ...configuredVideoCallbacks(configFunctions),
    ...Object.values(delegates).filter((target): target is string => target !== null),
  ];
  addHandlerClosure(handlers, ast, roots, constants, String(machine.props.cls));
  if (deviceTilemaps.length) {
    addHandlerClosure(
      handlers,
      ast,
      deviceTilemaps.flatMap(tilemap => [tilemap.mapper, tilemap.tileInfo]),
      constants,
    );
  }
  const bankedBackground = compileBankedBackground(handlers);
  const updateMode = handlers.some(handler =>
    handler.body?.includes('cliprect.max_y - 1') &&
    handler.body.includes('sprite') &&
    handler.body.includes('transpen'))
    ? 'scanline' as const
    : undefined;
  const gfx = [...decodes.flatMap(decode => {
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
  }), ...konamiGfx];
  const paletteMembers = [...new Set(
    [...decodeBindings.values()]
      .map(binding => binding.paletteMember)
      .filter((member): member is string => Boolean(member)),
  )];
  // Every palette_device whose init callback compiles. A board with several
  // (Kung-Fu Master's character and sprite palettes) runs each one's own.
  const callbackPalettes = compileCallbackPalettes(graph, machineIds);
  const namedByCallback = paletteMembers.length > 1 &&
    paletteMembers.every(member => callbackPalettes.some(callback => callback.member === member));
  // A palette_device built from PROMs by one of MAME's own init routines
  // (palette_device::RRRRGGGGBBBB_proms) decodes through those fixed weights.
  // Every other palette is the driver's own callback, run as a handler.
  const builtinPalette = namedByCallback
    ? undefined
    : compileBuiltinPromPalette(graph, machineIds, mameSrc, constants);
  let palette = builtinPalette;
  // A palette_device with no init callback colors CPU-writable palette RAM
  // through the set_format converter named in the machine configuration.
  const ramPalette = palette || namedByCallback
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
      ) ?? compileSystem16RamPalette(graph, machineIds, source, constants)
        ?? compileDriverManagedPalette(
        graph,
        machineIds,
        source,
        constants,
      )
    );
  // Konami custom video devices declare their gfx layouts independently of
  // the host palette, then size the color-code space from palette().entries()
  // in device_start.  Preserve that source relationship in the static plan;
  // leaving the extracted placeholder at one collapses every tile/sprite to
  // the same palette group.
  const paletteAwareGfx = ramPalette
    ? gfx.map(entry => entry.decodeMember && entry.colorCount <= 1
      ? {
          ...entry,
          colorCount: Math.max(
            1,
            Math.floor(ramPalette.entries / (1 << entry.layout.planes)),
          ),
        }
      : entry)
    : gfx;
  // A driver's own palette callback runs as the board handler it already is,
  // at the palette's device_start (execution.paletteInits), against the
  // driver's state: MAME's resnet.cpp is in its call closure, and what it
  // assigns (`m_color_codes = color_prom`) lands where every other handler
  // reads it. A palette the driver re-banks at run time (TNX1's
  // update_palette) is the same code again, called from its screen update.
  const singleCallback = ramPalette || namedByCallback || builtinPalette
    ? undefined
    : callbackPalettes.find(callback => callback.handler && callback.member === 'm_palette') ??
      (callbackPalettes.length === 1 && callbackPalettes[0]!.handler ? callbackPalettes[0] : undefined);
  const paletteCallbacks = namedByCallback
    ? callbackPalettes.filter(callback => paletteMembers.includes(callback.member))
    : singleCallback ? [singleCallback] : [];
  if (paletteCallbacks.length) palette = undefined;
  if (!palette && !ramPalette && !paletteCallbacks.length) {
    return fail(`palette callback did not lower`);
  }
  const paletteGroups = compilePaletteGroups(
    graph,
    machineIds,
    ramPalette?.entries ?? paletteCallbacks[0]?.entries,
  );
  const runtimeGfxLayouts = compileRuntimeGfxLayouts(source);
  const needsClassDefaults = renderScale !== 1 ||
    Object.keys(delegates).length > 0;

  return {
    plan: {
      ...(updateMode ? { updateMode } : {}),
      gfx: paletteAwareGfx,
      ...(Object.keys(regionBindings).length ? { regionBindings } : {}),
      ...(palette ? { palette } : {}),
      ...(ramPalette ? { ramPalette } : {}),
      ...(paletteGroups ? { paletteGroups } : {}),
      tilemaps: executableTilemaps,
      ...(Object.keys(runtimeGfxLayouts).length ? { gfxLayouts: runtimeGfxLayouts } : {}),
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
      },
      ...(renderScale !== 1 ? { renderScale: { x: renderScale, y: 1 } } : {}),
      ...(bankedBackground ? { bankedBackground } : {}),
      ...(Object.keys(delegates).length ? { delegates } : {}),
      // A device-drawn screen is sourced where the driver configured it.
      source: start ?? screen
        ? sourceRef(start ?? screen!)
        : { file: String(screenCallback?.props.sourceFile ?? ''), line: Number(screenCallback?.props.sourceLine ?? 0) },
    },
    handlers,
    ...(paletteCallbacks.length ? { paletteCallbacks } : {}),
  };
}

/**
 * Layouts a driver hands to `std::make_unique<gfx_element>(palette, layout,
 * ...)` at run time rather than naming in a GFXDECODE table. Atari System 1
 * builds one graphics set per ROM bank this way, as its PROMs select them.
 */
function compileRuntimeGfxLayouts(source: string): Record<string, GeneratedGfxLayout> {
  const used = new Set([...source.matchAll(
    /make_unique\s*<\s*gfx_element\s*>\s*\(\s*[^,()]+,\s*(\w+)\s*,/g,
  )].map(match => match[1]!));
  const layouts: Record<string, GeneratedGfxLayout> = {};
  if (!used.size) return layouts;
  for (const layout of parseGfxLayouts(stripComments(source))) {
    if (!used.has(layout.name)) continue;
    const { name: _name, ...shape } = layout;
    layouts[layout.name] = shape;
  }
  return layouts;
}

/**
 * Graphics tables owned by Konami's device_gfx_interface customs.
 *
 * These are admitted only while the corresponding declarations are present
 * in the selected MAME source closure. The values are the lowered gfx_layout
 * tables, so a similarly named but source-incompatible device fails closed.
 */
function konamiDeviceGfx(
  source: string,
  devices: readonly KGNode[],
): GeneratedVideoPlan['gfx'] {
  const result: GeneratedVideoPlan['gfx'] = [];
  const device = (type: string): KGNode | undefined =>
    devices.find(candidate => String(candidate.props.type) === type);
  const member = (entry: KGNode): string =>
    String(entry.props.member ?? `m_${String(entry.props.tag)}`);
  const common = {
    offset: 0,
    colorBase: 0,
    colorCount: 1,
    xscale: 1,
    yscale: 1,
  };

  const tiles = device('K052109');
  if (
    tiles &&
    /k052109_device::charlayout\s*=/.test(source) &&
    /GFXDECODE_DEVICE\s*\(\s*DEVICE_SELF\s*,\s*0\s*,\s*charlayout/.test(source)
  ) {
    result.push({
      ...common,
      region: String(tiles.props.tag),
      decodeMember: member(tiles),
      layout: {
        width: 8, height: 8, total: 'RGN_FRAC(1,1)', planes: 4,
        planeOffsets: [24, 16, 8, 0],
        xOffsets: [0, 1, 2, 3, 4, 5, 6, 7],
        yOffsets: [0, 32, 64, 96, 128, 160, 192, 224],
        charIncrement: 256,
      },
    });
  }

  const oldSprites = device('K051960');
  if (
    oldSprites &&
    /k051960_device::spritelayout_reverse\s*=/.test(source) &&
    /GFXDECODE_DEVICE\s*\(\s*DEVICE_SELF\s*,\s*0\s*,\s*spritelayout_reverse/.test(source)
  ) {
    const reverse = /set_plane_order\s*\(\s*K051960_PLANEORDER_MIA\s*\)/.test(source);
    result.push({
      ...common,
      region: String(oldSprites.props.tag),
      decodeMember: member(oldSprites),
      layout: {
        width: 16, height: 16, total: 'RGN_FRAC(1,1)', planes: 4,
        planeOffsets: reverse ? [24, 16, 8, 0] : [0, 8, 16, 24],
        xOffsets: [
          0, 1, 2, 3, 4, 5, 6, 7,
          256, 257, 258, 259, 260, 261, 262, 263,
        ],
        yOffsets: [
          0, 32, 64, 96, 128, 160, 192, 224,
          512, 544, 576, 608, 640, 672, 704, 736,
        ],
        charIncrement: 1024,
      },
    });
  }

  return result;
}

/**
 * palette_device's enable_shadows() / enable_highlights(), from the machine
 * configuration: either chained on PALETTE(config, ...) or called on the
 * member afterwards (`m_palette->enable_shadows()`). MAME then allocates a
 * colour group for each after the palette's own entries.
 */
function compilePaletteGroups(
  graph: KnowledgeGraph,
  machineIds: Set<string>,
  entries: number | undefined,
): GeneratedVideoPlan['paletteGroups'] {
  const deviceIds = new Set(graph.edges
    .filter(edge => machineIds.has(edge.from) && edge.rel === 'HAS_DEVICE')
    .map(edge => edge.to));
  const palettes = graph.nodes.filter(node =>
    deviceIds.has(node.id) && node.label === 'Device' && node.props.type === 'PALETTE');
  if (palettes.length !== 1 || !entries) return undefined;
  const config = ((palettes[0]!.props.config as string[] | undefined) ?? []).join('\n');
  const shadows = /(?:\.|->)\s*enable_shadows\s*\(\s*\)/.test(config);
  const highlights = /(?:\.|->)\s*enable_highlights\s*\(\s*\)/.test(config);
  return shadows || highlights ? { entries, shadows, highlights } : undefined;
}

/**
 * Sega's shared System 16 base owns its palette writer rather than attaching
 * it directly to the PALETTE(config, ...) declaration.  Lower the documented
 * sBGR-BBBB-GGGG-RRRR word layout so mapper-installed palette RAM remains a
 * generated writable palette instead of blocking the whole video plan.
 */
function compileSystem16RamPalette(
  graph: KnowledgeGraph,
  machineIds: Set<string>,
  source: string,
  constants: Record<string, number>,
): GeneratedRamPalettePlan | undefined {
  const deviceIds = new Set(graph.edges
    .filter(edge => machineIds.has(edge.from) && edge.rel === 'HAS_DEVICE')
    .map(edge => edge.to));
  if (!graph.nodes.some(node =>
    deviceIds.has(node.id) && node.label === 'Device' && node.props.type === 'SEGAIC16VID')) {
    return undefined;
  }
  if (!source.includes('paletteram_w') || !source.includes('"paletteram"')) return undefined;
  const palette = graph.nodes.find(node =>
    deviceIds.has(node.id) && node.label === 'Device' && node.props.type === 'PALETTE');
  const raw = ((palette?.props.config as string[] | undefined) ?? []).join('\n');
  const entriesExpression = /\.set_entries\s*\(\s*([^)]*)\)/.exec(raw)?.[1];
  const entries = entriesExpression
    ? expressionNumber(entriesExpression, constants)
    : undefined;
  if (!entries) return undefined;
  return {
    tag: 'paletteram',
    endianness: 'big',
    entries,
    bytesPerEntry: 2,
    channels: [
      { channel: 'r', bits: 4, shift: 0 },
      { channel: 'g', bits: 4, shift: 4 },
      { channel: 'b', bits: 4, shift: 8 },
    ],
    ...(palette?.props.sourceFile && palette.props.sourceLine ? {
      source: {
        file: String(palette.props.sourceFile),
        line: Number(palette.props.sourceLine),
        ...(palette.props.sourceColumn
          ? { column: Number(palette.props.sourceColumn) }
          : {}),
      },
    } : {}),
  };
}

/**
 * Find a source-defined video device selected through set_gfxdecode_tag.
 *
 * Unlike a device_gfx_interface device, this component does not own a decode
 * table in its constructor. The machine config supplies a tag and the device
 * creates its tilemap later in device_start, so that setter is the composition
 * edge that proves which otherwise-unrelated lifecycle method belongs to the
 * active screen path.
 */
function configuredGfxDeviceStart(
  configFunctions: MameFunction[],
  screen: MameFunction,
  ast: MameAstIndex,
  source: string,
): MameFunction | undefined {
  const deviceClasses = new Map<string, string>();
  for (const match of source.matchAll(
    /\bDEFINE_DEVICE_TYPE\s*\(\s*([A-Z][A-Z0-9_]*)\s*,\s*(\w+)/g,
  )) {
    deviceClasses.set(match[1]!, match[2]!);
  }
  for (const config of configFunctions) {
    for (const match of config.body.matchAll(
      /\b([A-Z][A-Z0-9_]*)\s*\(\s*config\s*,\s*(m_\w+)[^;\n]*?\)\s*\.\s*set_gfxdecode_tag\s*\(\s*"[^"]+"\s*\)/g,
    )) {
      const [, type, member] = match;
      if (!screen.body.includes(`${member}->`)) continue;
      const className = deviceClasses.get(type!);
      if (!className) continue;
      const start = ast.findFunction(className, 'device_start');
      if (start) return start;
    }
  }
  return undefined;
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
/**
 * A driver's `memory_region` finders, by member: `optional_memory_region
 * m_region_mainbios` found as `m_region_mainbios(*this, "mainbios")`. Neo Geo's
 * vector handler reads the BIOS through one.
 */
export function sourceMemoryRegions(source: string): Record<string, string> {
  const members = new Set([...source.matchAll(/\b(?:required|optional)_memory_region\s+(m_\w+)\s*;/g)].map(match => match[1]!));
  const regions: Record<string, string> = {};
  for (const match of source.matchAll(/\b(m_\w+)\s*\(\s*\*this\s*,\s*"([^"]+)"\s*\)/g)) {
    if (members.has(match[1]!)) regions[match[1]!] = match[2]!;
  }
  return regions;
}

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
  // The converter itself runs, as palette_device::write8 runs it for each
  // entry written: MAME's own resnet.cpp computes its weights.
  return {
    member: declaration[1]!,
    entries,
    min: 0,
    max: 255,
    scaler: 1,
    channels: [],
    converter: `${fn.className}.${fn.name}`,
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

/**
 * Lower `tilemap_device` instances declared in the machine configuration.
 *
 * MAME offers two ways to spell the same tilemap. A driver may call
 * `tilemap_create(gfxdecode, tile_info, mapper, w, h, cols, rows)` from
 * `video_start`, which compileTilemaps reads, or it may declare a
 * TILEMAP device and let the machine config carry the identical parameters:
 *
 *   TILEMAP(config, m_playfield_tilemap, m_gfxdecode, 2, 8,8,
 *           TILEMAP_SCAN_ROWS, 64,64).set_info_callback(FUNC(...))
 *
 * (emu/tilemap.h: the constructor forwards these to set_gfxdecode,
 * set_bytes_per_entry, set_layout and set_tile_size, with an optional
 * trailing transparent pen.) Only the first form was lowered, so Atari's
 * boards produced no tilemaps at all and had to be composed by a
 * hand-written renderer instead of their own screen update.
 */
function compileDeviceTilemaps(
  graph: KnowledgeGraph,
  machineIds: Set<string>,
  ast: MameAstIndex | undefined,
  constants: Record<string, number>,
): GeneratedVideoPlan['tilemaps'] {
  const deviceIds = new Set(graph.edges
    .filter(edge => machineIds.has(edge.from) && edge.rel === 'HAS_DEVICE')
    .map(edge => edge.to));
  const plans: GeneratedVideoPlan['tilemaps'] = [];
  for (const device of graph.nodes) {
    if (!deviceIds.has(device.id) || device.label !== 'Device') continue;
    if (device.props.type !== 'TILEMAP') continue;
    const member = String(device.props.member ?? '');
    const raw = (Array.isArray(device.props.config) ? device.props.config.map(String) : []);
    const construction = raw.find(line => line.startsWith('TILEMAP('));
    if (!member || !construction) continue;
    const open = construction.indexOf('(');
    const close = matchingPair(construction, open, '(', ')');
    if (close < 0) continue;
    // (config, tag, gfxtag, entrybytes, tilewidth, tileheight, mapper,
    //  columns, rows[, transpen])
    const args = splitMameArgs(construction.slice(open + 1, close));
    if (args.length < 9) continue;
    const chained = raw.join('\n');
    const tileInfo = funcKey(
      /\.set_info_callback\s*\(([^;]*?)\)\s*$/.exec(chained.trim())?.[1] ??
      /\.set_info_callback\s*\(\s*(FUNC\([^)]*\))/.exec(chained)?.[1],
    );
    const mapper = funcKey(args[6]) ?? standardTilemapMapper(args[6]);
    if (!tileInfo || !mapper) continue;
    const transparentPen = args.length > 9
      ? expressionNumber(args[9], constants)
      : undefined;
    // tilemap_device::device_start binds m_basemem to memshare(tag()), the
    // same tag-named convention palette_device uses.
    const tag = String(device.props.tag ?? '');
    const hasShare = graph.nodes.some(node =>
      node.label === 'AddressRange' && node.props.share === tag);
    plans.push({
      member,
      ...(hasShare ? { baseShare: tag, bytesPerEntry: expressionNumber(args[3], constants) } : {}),
      ...(/\b(m_\w+)\b/.exec(args[2] ?? '')?.[1]
        ? { decodeMember: /\b(m_\w+)\b/.exec(args[2] ?? '')![1] }
        : {}),
      tileWidth: expressionNumber(args[4], constants),
      tileHeight: expressionNumber(args[5], constants),
      columns: expressionNumber(args[7], constants),
      rows: expressionNumber(args[8], constants),
      mapper,
      tileInfo: ast ? resolvedHandlerKey(ast, tileInfo) : tileInfo,
      ...(transparentPen !== undefined && transparentPen >= 0 ? { transparentPen } : {}),
      ...(typeof device.props.sourceFile === 'string' &&
        typeof device.props.sourceLine === 'number'
        ? { source: { file: device.props.sourceFile, line: device.props.sourceLine } }
        : {}),
    });
  }
  return plans;
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
): Map<string, { decodeMember: string; paletteMember?: string }> {
  const deviceIds = new Set(graph.edges
    .filter(edge => machineIds.has(edge.from) && edge.rel === 'HAS_DEVICE')
    .map(edge => edge.to));
  const bindings = new Map<string, { decodeMember: string; paletteMember?: string }>();
  const bindingsByTag = new Map<string, { decodeMember: string; paletteMember?: string }>();
  for (const device of graph.nodes.filter(node =>
    deviceIds.has(node.id) &&
    node.label === 'Device' &&
    node.props.type === 'GFXDECODE')) {
    const raw = ((device.props.config as string[] | undefined) ?? []).join('\n');
    const args = /GFXDECODE(?:_SCALE)?\s*\(\s*config\s*,\s*(m_\w+|"[^"]+")\s*,\s*(m_\w+|"[^"]+")\s*,\s*(\w+)/.exec(raw);
    if (!args) continue;
    const decodeMember = configuredDeviceMember(args[1]!);
    if (!decodeMember) continue;
    // A quoted palette tag proves which device gfxdecode uses, but not that
    // the owning C++ object exposes a correspondingly named member. The
    // generated gfx elements already use the board's sole palette by default;
    // retain a palette binding only when MAME names an actual member.
    const paletteMember = /^m_\w+$/.test(args[2]!.trim())
      ? args[2]!.trim()
      : undefined;
    const binding = {
      decodeMember,
      ...(paletteMember ? { paletteMember } : {}),
    };
    bindings.set(args[3]!, binding);
    bindingsByTag.set(String(device.props.tag), binding);
  }
  // A derived machine can replace the layout table of a GFXDECODE device
  // instantiated by its base config (`m_gfxdecode->set_info(gfx_pacmanbl)`).
  // Carry the original device's member/palette binding onto the replacement.
  //
  // The same edge also carries decodes owned by a device_gfx_interface device
  // rather than by GFXDECODE — TECMO_SPRITE(config, m_sprgen, m_palette,
  // gfx_tecmo_spr). Those answer their own gfx(n), so they need their own
  // member binding; without one the entries never reach the plan and the
  // device draws nothing.
  for (const edge of graph.edges.filter(edge =>
    machineIds.has(edge.from) && edge.rel === 'DECODES')) {
    const deviceTag = String(edge.props?.deviceTag ?? '');
    const decode = graph.nodes.find(node => node.id === edge.to);
    if (!decode) continue;
    const binding = bindingsByTag.get(deviceTag)
      ?? deviceGfxInterfaceBinding(graph, deviceIds, deviceTag);
    if (binding) bindings.set(String(decode.props.name), binding);
  }
  return bindings;
}

/**
 * Modern MAME machine configs commonly use either a required-device member or
 * its simple tag for GFXDECODE. Both forms name the conventional decode finder
 * (`m_gfxdecode` / `"gfxdecode"`, for example), so retain that gfx grouping for
 * generated video plans. Hierarchical tags are deliberately excluded: a
 * colon-separated tag cannot be mapped to a C++ member without source type
 * information.
 */
function configuredDeviceMember(value: string): string | undefined {
  const token = value.trim();
  if (/^m_\w+$/.test(token)) return token;
  const tag = /^"([A-Za-z_]\w*)"$/.exec(token)?.[1];
  return tag ? `m_${tag}` : undefined;
}

/**
 * Member/palette binding for a non-GFXDECODE device that owns a decode table.
 *
 * MAME's device_gfx_interface constructor takes the palette and the table in
 * the two arguments after the device reference, which is the same shape the
 * GFXDECODE macro uses.
 */
function deviceGfxInterfaceBinding(
  graph: KnowledgeGraph,
  deviceIds: Set<string>,
  deviceTag: string,
): { decodeMember: string; paletteMember: string } | undefined {
  const device = graph.nodes.find(node =>
    deviceIds.has(node.id) &&
    node.label === 'Device' &&
    String(node.props.tag) === deviceTag);
  if (!device) return undefined;
  const raw = ((device.props.config as string[] | undefined) ?? []).join('\n');
  const args = new RegExp(
    `\\b[A-Z][A-Z0-9_]+\\s*\\(\\s*config\\s*,\\s*(m_\\w+)\\s*,\\s*(m_\\w+)\\s*,\\s*(\\w+)`,
  ).exec(raw);
  if (!args) return undefined;
  return { decodeMember: args[1]!, paletteMember: args[2]! };
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
  // The converter's own name, whole: emupal.h spells the intensity decoder
  // `standard_irgb_decoder`, one word, so a pattern anchored on `_rgb_decoder`
  // walked straight past it. That is the format Atari's boards use
  // (`IRGB_4444`), and missing it is why Gauntlet had no source-derived
  // palette at all and Marble Madness would not compile a video plan.
  const decoder = /set_format\s*\(\s*(\d+)\s*,\s*&raw_to_rgb_converter::(\w+)_decoder\s*<([^>]*)>/
    .exec(overload[1]!);
  if (!decoder) return fail(`set_format(${overloadType}) is not a templated rgb decoder`);
  const template = splitMameArgs(decoder[3]!).map(value => Number(value.trim()));
  const irgb = decoder[2] === 'standard_irgb';
  const inverted = decoder[2] === 'inverted_rgb';
  if (!irgb && !inverted && decoder[2] !== 'standard_rgb') {
    return fail(`unsupported rgb decoder kind ${decoder[2]}`);
  }
  // standard/inverted take <RBits,GBits,BBits, RShift,GShift,BShift>; the
  // intensity decoder prepends an intensity width and shift to each triple.
  if ((irgb ? template.length !== 8 : template.length !== 6) ||
    template.some(value => !Number.isFinite(value))) {
    return fail(`unsupported rgb decoder template <${decoder[3]}>`);
  }
  const configuredEndianness =
    /\.set_endianness\s*\(\s*ENDIANNESS_(LITTLE|BIG)\s*\)/.exec(raw)?.[1];
  const endianness = (configuredEndianness?.toLowerCase() ??
    paletteShareEndianness(graph, String(device.props.tag))) as
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
 * palette_device inherits the byte order of the memory share it binds. Find
 * the CPU whose address map owns that share and mirror MAME's CPU-space order
 * when the driver did not explicitly call set_endianness().
 */
export function paletteShareEndianness(
  graph: KnowledgeGraph,
  share: string,
): 'little' | 'big' | undefined {
  const rangeIds = new Set(graph.nodes
    .filter(node => node.label === 'AddressRange' && node.props.share === share)
    .map(node => node.id));
  const mapIds = new Set(graph.edges
    .filter(edge => edge.rel === 'HAS_RANGE' && rangeIds.has(edge.to))
    .map(edge => edge.from));
  const deviceId = graph.edges.find(edge =>
    edge.rel === 'HAS_MAP' && mapIds.has(edge.to))?.from;
  const type = String(graph.nodes.find(node => node.id === deviceId)?.props.type ?? '');
  if (!type) return undefined;
  // These MAME CPU families expose big-endian program address spaces. Width
  // is deliberately irrelevant: an 8-bit 6809 share still orders a packed
  // two-byte palette entry most-significant byte first.
  return /^(?:M68|MC68|HD63|KONAMI|SCC68070|PPC|POWERPC|R3000BE|MIPS\w*BE|SH\w*BE)/
    .test(type) ? 'big' : 'little';
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

/** A palette_device and the init callback that colours it. */
export interface PaletteCallback {
  /** The device's finder member (`m_palette`, `m_spr_palette`). */
  member: string;
  /** Absent when the driver's own code colours the palette (Moon Patrol's init_palette). */
  handler?: string;
  entries: number;
  indirectEntries?: number;
}

/**
 * The machine's palette_devices: each one's finder member, its configured
 * pen counts, and the init callback that colours it when that callback
 * compiles as a board handler. The board runs each callback at its palette's
 * device_start, as MAME does. Compiled the way the board compiles every
 * handler (emit-machine.ts), so a callback that lowers here is the one the
 * board will run.
 */
function compileCallbackPalettes(
  graph: KnowledgeGraph,
  machineIds: Set<string>,
): PaletteCallback[] {
  const deviceIds = new Set(graph.edges
    .filter(edge => machineIds.has(edge.from) && edge.rel === 'HAS_DEVICE')
    .map(edge => edge.to));
  return graph.nodes
    .filter(node => deviceIds.has(node.id) && node.label === 'Device' && node.props.type === 'PALETTE')
    .flatMap(device => {
      const config = ((device.props.config as string[] | undefined) ?? []).join('\n');
      const construction = /\bPALETTE\s*\(/.exec(config);
      if (!construction) return [];
      const open = config.indexOf('(', construction.index);
      // PALETTE(config, finder, init, entries [, indirect_entries]), or the
      // counts set after it: `PALETTE(config, m_sp_palette).set_entries(256, 32)`.
      const [, finder = '', , ...constructed] = splitMameArgs(config.slice(open + 1, matchingPair(config, open, '(', ')')))
        .map(argument => argument.trim());
      const set = /\bset_entries\s*\(/.exec(config);
      const counts = set
        ? splitMameArgs(config.slice(config.indexOf('(', set.index) + 1, matchingPair(config, config.indexOf('(', set.index), '(', ')')))
          .map(argument => argument.trim())
        : constructed;
      const entries = counts[0] !== undefined ? evalExpr(counts[0], {}) ?? 0 : 0;
      const indirectEntries = counts[1] !== undefined ? evalExpr(counts[1], {}) ?? undefined : undefined;
      // `PALETTE(config, "palette", ...)` names the tag, whose finder is m_<tag>.
      const member = /^m_\w+$/.test(finder) ? finder : `m_${finder.replace(/"/g, '') || String(device.props.tag ?? 'palette')}`;
      const callbackId = graph.edges.find(edge => edge.from === device.id && edge.rel === 'HAS_CALLBACK' &&
        graph.nodes.find(node => node.id === edge.to)?.props.signal === 'palette_init')?.to;
      const callback = graph.nodes.find(node => node.id === callbackId);
      const handlerId = graph.edges.find(edge => edge.from === callbackId && edge.rel === 'CALLS_HANDLER')?.to;
      const handler = graph.nodes.find(node => node.id === handlerId);
      const counted = Number(callback?.props.entries ?? entries);
      if (!counted) return [];
      const shape = {
        member,
        entries: counted,
        ...((callback?.props.indirectEntries ?? indirectEntries) !== undefined
          ? { indirectEntries: Number(callback?.props.indirectEntries ?? indirectEntries) }
          : {}),
      };
      if (!callback) return [shape];
      if (!handler || typeof handler.props.sourceBody !== 'string') return [];
      const program = compileMameHandler(normalizeMameExecutionSource(handler.props.sourceBody));
      if (program.diagnostics.length) {
        if (process.env.MAMEKIT_DEBUG_VIDEO === '1') {
          console.error('callback palette: callback did not compile', program.diagnostics);
        }
        return [];
      }
      return [{ ...shape, handler: `${callback.props.targetClass}.${callback.props.targetMethod}` }];
    });
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

/** Driver delegates installed on source-owned video devices are render roots. */
function configuredVideoCallbacks(configFunctions: MameFunction[]): string[] {
  const callbacks = new Set<string>();
  const pattern = /\bset_(?:tile|sprite)_callback\s*\(\s*FUNC\s*\(\s*(\w+)::(\w+)\s*\)\s*\)/g;
  for (const config of configFunctions) {
    for (const match of config.body.matchAll(pattern)) {
      callbacks.add(`${match[1]}.${match[2]}`);
    }
  }
  return [...callbacks];
}

function addHandler(
  handlers: GeneratedHandler[],
  fn: MameFunction,
  constants: Record<string, number> = {},
  fallbackOwnerClass?: string,
  unitSource = '',
  classNames: readonly string[] = [],
  ast?: MameAstIndex,
  /** The handler's name, when it is not the function's: one overload's `name__aN`. */
  method = fn.name,
): void {
  const ownerClass = fn.className || fallbackOwnerClass || 'source_helper';
  if (handlers.some(handler => handler.ownerClass === ownerClass && handler.method === method)) {
    return;
  }
  // The same preparation the knowledge graph gives a handler (kg/build.ts
  // handlerProps): the file's member-reading #defines -- taitosj's
  // `GLOBAL_FLIP_X (*m_video_mode & 0x01)` -- and its overloads by arity.
  // Without them this copy of draw_layers drew every layer unflipped.
  const macros = [
    ...collectMemberAliasMacros(unitSource), ...collectBitAliasMacros(unitSource), ...collectMemberExpressionMacros(unitSource)];
  const prepared = lowerDriverMemberPointers(
    expandMemberAliasMacros(expandStatementMacros(fn.body, unitSource), macros), classNames);
  const executableBody = normalizeMameExecutionSource(lowerSequentialArrayPointers(
    ast && fn.className ? lowerOverloadedCalls(prepared, ast, fn.className) : prepared));
  handlers.push({
    id: `handler:${ownerClass}.${method}`,
    ownerClass,
    method,
    parameters: fn.parameters.trim(),
    body: fn.body.trim(),
    program: compileMameHandler(executableBody, fn.returnType ? { returnType: fn.returnType } : {}),
    constants: Object.fromEntries([
      ...Object.entries(constants).filter(([name]) => new RegExp(`\\b${name}\\b`).test(fn.body)),
      // A class-scoped constant is declared unqualified and used qualified:
      // atarimo.h declares PRIORITY_MASK inside atari_motion_objects_device,
      // and Atari's screen update names it
      // `atari_motion_objects_device::PRIORITY_MASK`. Carry the value under
      // the spelling the body uses, or the emitter falls back to a member
      // lookup and writes `members.atari_motion_objects_device::PRIORITY_MASK`,
      // which is not valid JavaScript and fails the whole app compile.
      ...(fn.body.match(/\b[A-Za-z_]\w*::[A-Za-z_]\w*\b/g) ?? []).flatMap(name => {
        const tail = name.slice(name.indexOf('::') + 2);
        return constants[tail] !== undefined ? [[name, constants[tail]!] as const] : [];
      }),
    ]),
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
    // One overload, by the arity its name carries (`copy_layer__a6`).
    const overload = parseOverloadedName(method);
    // The driver class the GAME macro selected owns every virtual call, even
    // the ones written inside a base class it inherited.
    const fn = overload
      ? ast.overloadsInHierarchy(driverClass ?? ownerClass, overload.name).find(candidate => functionArity(candidate) === overload.arity) ??
        ast.overloadsInHierarchy(ownerClass, overload.name).find(candidate => functionArity(candidate) === overload.arity)
      : ast.findDispatchedFunction(driverClass, ownerClass, method);
    if (!fn) continue;
    addHandler(handlers, fn, constants, driverClass,
      ast.ast.units.find(unit => unit.file === fn.span.file)?.source ?? '',
      ast.ast.units.flatMap(unit => unit.classes.map(declaration => declaration.name)),
      ast, overload ? method : fn.name);
    // An overloaded callee is every one of its overloads, each its own handler.
    queue.push(...calledSourceMethods(fn.body).flatMap(name => {
      const overloads = ast.overloadsInHierarchy(fn.className, name);
      return overloads.length
        ? overloads.map(candidate => `${fn.className}.${overloadedName(name, functionArity(candidate))}`)
        : [`${fn.className}.${name}`];
    }));
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
  // `const` as well as `constexpr`: MAME still declares class-scoped
  // constants the older way, and atarimo.h's PRIORITY_SHIFT/PRIORITY_MASK --
  // which Atari's screen update tests every sprite pixel against -- are
  // written `static const uint16_t NAME = expr;`.
  for (const match of source.matchAll(
    /\b(?:static\s+)?(?:constexpr|const)\s+(?:\w+\s+)+(\w+)\s*(?:\([^)]*\))?\s*=\s*([^;]+);/g,
  )) {
    // A static declaration may carry several declarators (Bomb Jack's
    // `static inline constexpr u16 HTOTAL = 384, HBSTART = 256, HBEND = 0;`).
    // Function-local `const` lists are left alone: they are not constants of
    // the translation unit.
    const lineStart = source.lastIndexOf('\n', match.index) + 1;
    const declarators = /\bstatic\b/.test(source.slice(lineStart, match.index + match[0].length))
      ? splitMameArgs(match[2]!)
      : [match[2]!];
    expressions.set(match[1]!, declarators[0]!.trim());
    for (const declarator of declarators.slice(1)) {
      const next = /^\s*(\w+)\s*=\s*([\s\S]+)$/.exec(declarator);
      if (next) expressions.set(next[1]!, next[2]!.trim());
    }
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
  return [
    ...[...body.matchAll(/\b([A-Za-z_]\w*)\s*\(/g)].map(match => match[1]!),
    // Named as a value through a member-function pointer (`&cls::method`),
    // and called through it.
    ...[...body.matchAll(/&\s*\w+\s*::\s*(\w+)\b(?!\s*\()/g)].map(match => match[1]!),
  ];
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
  return findCallArgumentEntries(source, name).map(entry => entry.arguments);
}

function findCallArgumentEntries(
  source: string,
  name: string,
): { arguments: string; offset: number }[] {
  const calls: { arguments: string; offset: number }[] = [];
  let cursor = 0;
  while (cursor < source.length) {
    const at = source.indexOf(`${name}(`, cursor);
    if (at < 0) break;
    const open = source.indexOf('(', at + name.length);
    const close = matchingPair(source, open, '(', ')');
    if (close < 0) break;
    calls.push({ arguments: source.slice(open + 1, close), offset: at });
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

function sourceRef(fn: MameFunction): BoardSourceRef {
  return { file: fn.span.file, line: fn.span.line, column: fn.span.column };
}
