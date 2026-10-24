import { softwareListPeripherals } from './softlist.ts';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { GraphBuilder, type KnowledgeGraph, type PropValue } from './types.ts';
import {
  MameAstIndex, parseCallChain, parseMameAst, parseMameSource, spanProps, splitMameArgs,
  type MameClass, type MameFunction, type SourceSpan,
} from '../mame/ast.ts';
import { compileMameHandler } from '../mame/handler-ir.ts';
import { DEFAULT_CONSTANTS } from '../ir/execute.ts';
import { collectBitAliasMacros, collectMemberAliasMacros, expandMemberAliasMacros } from '../mame/preprocessor.ts';
import {
  executeGeneratedHandler,
  type GeneratedHandlerBindings,
} from '../ir/execute.ts';
import { deviceConfiguredScreen } from '../mame/screen-config.ts';
import { indexMameHardware } from '../mame/hardware.ts';
import {
  coreAddressSpaces,
  integerBits,
  constructorInitialValues,
  integerSigned,
  memberDeclarations,
} from '../mame/device-compiler.ts';
import {
  stripComments, parseDefines, parseGames, parseRomSets, parseAddressMaps,
  evaluateRectangle, statementAudioRoutes, parseAddrMapForwarders, parseMachineConfigs, resolveLiteralConditionals, parseMemberTags, parseClassMemberTags, parseInputPorts, parseGfxLayouts,
  parseStateClassConstants,
  parseGfxDecodes, parseIncludes, parseDeviceTypeDecls, parseDeviceDefaultClocks,
  parseInitPatches, parseInitRomTransforms, parseInstalledHandlers, parseTextMacros, parseMemoryBanks, evalExpr,
  parseEnumConstants, normalizeTemplatedMethod, matchParen,
  type InputPortsDef,
  type AddressMapDef,
  type AddressRangeDef,
  type HandlerRef,
} from './parse.ts';

const VERSION = '0.1.0';

/** Body of legacy MACHINE_START_MEMBER(cls, name) selected by a config macro. */
function machineStartMemberBody(source: string, className: string, name: string): string | undefined {
  const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const declaration = new RegExp(
    `MACHINE_START_MEMBER\\s*\\(\\s*${escape(className)}\\s*,\\s*${escape(name)}\\s*\\)`,
  ).exec(source);
  if (!declaration) return undefined;
  const open = source.indexOf('{', declaration.index + declaration[0].length);
  if (open < 0) return undefined;
  let depth = 1;
  let quote = '';
  for (let index = open + 1; index < source.length; index++) {
    const character = source[index]!;
    if (quote) {
      if (character === '\\') index++;
      else if (character === quote) quote = '';
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }
    if (character === '{') depth++;
    else if (character === '}' && --depth === 0) return source.slice(open + 1, index);
  }
  return undefined;
}

/**
 * Build the knowledge graph for one MAME driver file (plus its .h header and
 * any sibling _m/_v/_a compilation units, which share the state class).
 */
export function buildGraph(mameSrc: string, driverFile: string, cardUnits: readonly string[] = []): KnowledgeGraph {
  const g = new GraphBuilder();
  const driverBase = basename(driverFile); // e.g. galaga.cpp
  const dir = dirname(driverFile);

  // gather the compilation-unit family: galaga.cpp, galaga.h, galaga_v.cpp,
  // galaga_a.cpp — plus same-directory includes and their .cpp twins
  // (m52.cpp includes irem.h; irem.cpp holds the audio-board device's
  // device_add_mconfig with the M6803 + AY8910s + MSM5205)
  const stem = driverBase.replace(/\.cpp$/, '');
  const family = [
    driverBase,
    `${stem}.h`,
    `${stem}_m.cpp`,
    `${stem}_v.cpp`,
    `${stem}_a.cpp`,
  ]
    .map(f => join(dir, f))
    .filter(f => existsSync(f));

  for (let familyIndex = 0; familyIndex < family.length; familyIndex++) {
    const file = family[familyIndex]!;
    for (const inc of parseIncludes(readFileSync(file, 'utf8'))) {
      if (inc.includes('/')) continue; // same-directory includes only
      // MAME's build puts src/mame/shared on every driver's include path
      // (rocnrope.cpp includes "timeplt_a.h" which lives there)
      const incDir = existsSync(join(dir, inc)) ? dir : join(mameSrc, 'src/mame/shared');
      const includedStem = inc.replace(/\.h$/, '');
      for (const extra of [
        join(incDir, inc),
        join(incDir, `${includedStem}.cpp`),
        join(incDir, `${includedStem}_m.cpp`),
        join(incDir, `${includedStem}_v.cpp`),
        join(incDir, `${includedStem}_a.cpp`),
      ]) {
        if (existsSync(extra) && !family.includes(extra)) family.push(extra);
      }
    }
  }

  // A slot's default card that brings its own processor (a disk drive) is
  // composed into the machine, so its source joins the family; see
  // processorSlotCards.
  for (const unit of cardUnits) if (!family.includes(unit)) family.push(unit);

  // driver header credits (parsed from RAW text — comments are stripped below)
  const driverRaw = readFileSync(join(dir, driverBase), 'utf8');
  const license = /^\/\/\s*license\s*:\s*(.+)$/m.exec(driverRaw)?.[1].trim();
  const copyrightHolders = /^\/\/\s*copyright-holders\s*:\s*(.+)$/m.exec(driverRaw)?.[1].trim();

  let combined = '';
  // Where the composed slot cards' source starts: the driver's own finders
  // are the flat member-tag map, and a card's only answer for its own class.
  let driverSourceEnd: number | undefined;
  const sourceUnits: { file: string; source: string }[] = [];
  const slashIncludes: string[] = [];
  for (const file of family) {
    if (driverSourceEnd === undefined && cardUnits.includes(file)) driverSourceEnd = combined.length;
    const raw = readFileSync(file, 'utf8');
    const rel = file.slice(mameSrc.length + 1);
    sourceUnits.push({ file: rel, source: raw });
    g.node('SourceFile', `file:${rel}`, { path: rel });
    for (const inc of parseIncludes(raw)) {
      if (inc.includes('/') && !slashIncludes.includes(inc)) slashIncludes.push(inc);
      g.node('SourceFile', `file:${inc}`, { path: inc, external: true });
      g.edge(`file:${rel}`, `file:${inc}`, 'INCLUDES');
    }
    combined += `\n// ==== ${rel} ====\n` + resolveLiteralConditionals(stripComments(raw));
  }
  const driverRel = driverFile.slice(mameSrc.length + 1);
  const fileId = `file:${driverRel}`;
  const ast = new MameAstIndex(parseMameAst(sourceUnits));
  const definedIn = (nodeId: string, source?: SourceSpan): void => {
    const target = source ? `file:${source.file}` : fileId;
    g.edge(nodeId, target, 'DEFINED_IN', source ? spanProps(source) : undefined);
  };

  // constants from external includes (clock XTALs live in device headers:
  // cpu/m6502/rp2a03.h defines NTSC_APU_CLOCK) — defines only, no graph nodes.
  // Externals seed first, the driver family's own defines win.
  const externalSources: string[] = [];
  // Framework vocabulary every driver reaches through emu.h rather than an
  // include of its own: digfx.h's MAX_GFX_ELEMENTS bounds the free-slot scan a
  // driver runs before building a graphics set at run time (Atari System 1),
  // and unresolved it made that loop run zero times. distate.h's generic state
  // indices are how a core names its PC to the driver: z80.h's `Z80_PC =
  // STATE_GENPC`, which the Spectrum's snapshot loader sets last.
  const pendingExternalIncludes = ['emu/digfx.h', 'emu/distate.h', ...slashIncludes];
  const seenExternalIncludes = new Set<string>();
  while (pendingExternalIncludes.length) {
    const inc = pendingExternalIncludes.shift()!;
    if (seenExternalIncludes.has(inc)) continue;
    seenExternalIncludes.add(inc);
    for (const cand of [
      join(mameSrc, 'src/devices', inc),
      join(mameSrc, 'src', inc),
      join(mameSrc, 'src/mame', inc),
    ]) {
      if (!existsSync(cand)) continue;
      const source = readFileSync(cand, 'utf8');
      externalSources.push(source);
      for (const nested of parseIncludes(source)) {
        if (nested.includes('/')) pendingExternalIncludes.push(nested);
      }
      break;
    }
  }
  let extConsts: Record<string, number> = {};
  // Includes are discovered parent-first. Iterate so a child header can seed
  // an enum expression in the parent on the following pass.
  for (let pass = 0; pass <= externalSources.length; pass++) {
    for (const source of externalSources) {
      extConsts = parseDefines(stripComments(source), extConsts);
      extConsts = parseEnumConstants(source, extConsts);
    }
  }
  // A driver's own enums, not only those of the headers it includes. MAME
  // spells a register's bit names that way -- `enum { SIO_ENABLED = 0x80, ... }`
  // inside the state class -- and without them every such test was an
  // unresolved reference: the Game Boy's serial control bits resolved to
  // nothing, and the handler that reads them could not be compiled either.
  const consts = parseEnumConstants(combined, parseDefines(combined, extConsts));
  const textMacros = parseTextMacros(combined);
  textMacros.strings = Object.assign({}, ...externalSources.map(source => parseTextMacros(source).strings), textMacros.strings);
  const ioportMembers = parseIoportMembers(combined, textMacros.strings);
  emitSourceTimerCallbacks(g, ast, consts, definedIn);
  const memberTags = {
    ...textMacros.strings,
    ...parseMemberTags(combined.slice(0, driverSourceEnd), textMacros.strings),
    ...parseClassMemberTags(combined, textMacros.strings),
  };
  // MAME's address-space indices (AS_PROGRAM, AS_IO, ...), for setters that
  // name a space by constant.
  const addressSpaces = coreAddressSpaces(mameSrc);
  const stateClassConstants = parseStateClassConstants(combined);
  const deviceTypes = parseDeviceTypeDecls(combined);

  const configHelpers = externalSources.flatMap((source, index) =>
    /static\s+void\s+\w+\s*\(\s*machine_config/.test(source)
      ? parseMameAst([{ file: `external-config-${index}.h`, source }]).units.flatMap(unit =>
          unit.functions.filter(fn => /^machine_config\s*&/.test(fn.parameters)))
      : []).concat(
    // A driver's own config member that takes more than `config` is a helper
    // expanded at its call site: Bomb Jack's
    // `template <typename T> bombjack_base(machine_config &config, T &&psg_type)`
    // instantiates `psg_type(config, m_ay8910[0], ...)` with the caller's AY8910.
    ast.ast.units.flatMap(unit => unit.functions.filter(fn =>
      /^machine_config\s*&\s*\w+\s*,/.test(fn.parameters))),
  // One definition per helper: a composed card's same-directory headers join
  // the family (the 1541 brings cbmiec.h), and then the bus's own static
  // `cbm_iec_slot_device::add` is found as an external and a family member
  // both, and an ambiguous helper expands to nothing.
  ).filter((fn, index, all) =>
    all.findIndex(other => other.className === fn.className && other.name === fn.name) === index);
  const machineConfigs = parseMachineConfigs(
    combined, memberTags, consts, configHelpers,
    Object.assign({}, ...externalSources.map(parseAddrMapForwarders)),
  );

  // A device sub-config that calls its base class's config, which then
  // configures a device the derived one created: the Spectrum AY cards build
  // `m_ay0` themselves and spectrum_ay_device::device_add_mconfig routes it.
  for (const cfg of machineConfigs) {
    for (const call of cfg.calls) {
      const qualified = /^(\w+)::(\w+)$/.exec(call);
      const callee = qualified
        ? machineConfigs.find(candidate => candidate.cls === qualified[1] && candidate.name === qualified[2])
        : undefined;
      for (const patch of callee?.devicePatches ?? []) {
        const device = cfg.devices.find(candidate => candidate.tag === patch.tag);
        if (!device) continue;
        device.config.push(...patch.config);
        for (const statement of patch.config) {
          const routes = statementAudioRoutes(statement, consts);
          if (routes.length) (device.audioRoutes ??= []).push(...routes);
        }
      }
    }
  }

  // A slot's third argument is an address on some buses (the IEC slot's
  // unit 8) and the clock on others (`AY_SLOT(config, "ay_slot",
  // X1_128_SINCLAIR / 20, ...)`): the slot's own constructor says which.
  for (const cfg of machineConfigs) {
    for (const dev of cfg.devices) {
      if (dev.slotAddress === undefined) continue;
      const slotClass = deviceTypes[dev.type] ?? indexMameHardware(mameSrc).get(dev.type)?.className;
      if (slotClass && slotThirdArgument(slotClass, [combined, ...externalSources]) === 'clock') {
        dev.clock = dev.slotAddress;
        delete dev.slotAddress;
      }
    }
  }

  // --- games ---
  const games = parseGames(combined);
  const initPatches = parseInitPatches(combined, consts);
  const initRomTransforms = parseInitRomTransforms(combined, consts);
  for (const gm of games) {
    const id = `game:${gm.name}`;
    const source = ast.findAnyMacro(
      ['GAME', 'GAMEX', 'GAMEL', 'CONS', 'SYST', 'COMP'], 1, gm.name,
    )?.span;
    const initFunction = ast.findFunctionInHierarchy(gm.cls, gm.init);
    // `m_ram->size()` is the RAM device's configured default: the Spectrum's
    // init installs `0x5b00 .. m_ram->size() + 0x3fff` into its bank space.
    const ramSizes = configuredRamSizes(machineConfigs, gm.machine, memberTags);
    const sizedInitBody = (body: string): string => body.replace(
      /\b(m_\w+)\s*->\s*size\s*\(\s*\)/g,
      (all, member: string) => ramSizes[member] !== undefined ? String(ramSizes[member]) : all,
    );
    const installedHandlers = initFunction
      ? parseInstalledHandlers(sizedInitBody(effectiveInitBody(ast, gm.cls, initFunction, consts)), consts)
          .flatMap(handler => {
            // The CPU whose space the install targets; the main CPU's when the
            // source does not say.
            const cpu = !handler.target || handler.target === 'm_maincpu'
              ? memberTags.m_maincpu ?? 'maincpu'
              : installTargetTag(ast, gm.cls, handler.target, memberTags);
            if (!cpu) {
              throw new Error(`${gm.name}: cannot resolve the space "${handler.target}" an init install targets`);
            }
            return [{ ...handler, cpu }];
          })
      : [];
    const initTables = initFunction
      ? initStaticTables(ast, effectiveInitBody(ast, gm.cls, initFunction, consts), consts)
      : [];
    // A driver init may wire a device's delegates itself: Spy Hunter's
    // init_spyhunt calls `m_ssio->set_custom_input(2, 0xff, *m_adc,
    // FUNC(adc0804_device::read))`. Those are configuration exactly as a
    // machine config's lines are, but they belong to this game alone, so the
    // callbacks hang off its Game node, not the shared device (#178).
    const initDelegateLines = new Map<string, string[]>();
    if (initFunction) {
      const body = effectiveInitBody(ast, gm.cls, initFunction, consts);
      for (const match of body.matchAll(/\b(m_\w+)\s*->\s*(\w+)\s*\(/g)) {
        const open = match.index! + match[0].length - 1;
        const close = matchParen(body, open);
        const args = body.slice(open + 1, close);
        if (!/FUNC\s*\(/.test(args) || !forwardingDelegateSetter(ast, match[2]!)) continue;
        const tag = memberTags[`${gm.cls}::${match[1]}`] ?? memberTags[match[1]!];
        if (!tag) throw new Error(`${gm.name}: cannot resolve the device ${match[1]} its init configures`);
        initDelegateLines.set(tag, [...(initDelegateLines.get(tag) ?? []), `${match[1]}->${match[2]}(${args})`]);
      }
    }
    g.node('Game', id, {
      ...(initTables.length ? { initTables: initTables.map(table => JSON.stringify(table)) } : {}),
      name: gm.name, year: gm.year, company: gm.company, fullname: gm.fullname,
      monitor: gm.monitor, cls: gm.cls, init: gm.init, flags: gm.flags,
      kind: gm.kind,
      ...spanProps(source),
      // driver init fns that patch ROM bytes (rocnrope's one-instruction fix)
      // flow through as "region:offset:value" triples
      ...(initPatches[gm.init]
        ? { romPatches: initPatches[gm.init].map(p => `${p.region}:${p.offset}:${p.value}`) }
        : {}),
      ...(initRomTransforms[gm.init]
        ? { romTransforms: initRomTransforms[gm.init].map(transform => JSON.stringify(transform)) }
        : {}),
      ...(installedHandlers.length
        ? { installedHandlers: installedHandlers.map(handler => JSON.stringify(handler)) }
        : {}),
      // compat (CONS/SYST/COMP arg 4) is a software-compatibility group, NOT
      // a clone relationship — famicom is compat with nes but its own machine
      ...(gm.compat !== '0' ? { compat: gm.compat } : {}),
      // Numeric members this game's state class fixes in its constructor. A
      // machine config shared with a sibling game reads them as unevaluated
      // expressions, and only the game knows their values.
      ...(stateClassConstants[gm.cls]
        ? { classConstants: JSON.stringify(stateClassConstants[gm.cls]) }
        : {}),
    });
    definedIn(id, source);
    for (const [tag, lines] of initDelegateLines) {
      emitCallbacks(g, ast, initFunction, id, tag, lines, memberTags, consts);
    }
    if (gm.parent !== '0') g.edge(id, `game:${gm.parent}`, 'CLONE_OF');
    g.edge(id, `machine:${gm.cls}.${gm.machine}`, 'USES_MACHINE');
    g.edge(id, `inputs:${gm.input}`, 'USES_INPUTS');
    g.edge(id, `romset:${gm.name}`, 'USES_ROMSET');
    for (const installed of installedHandlers) {
      if (installed.kind === 'ram') continue;
      const handlerId = emitSourceHandlerClosure(
        g,
        ast,
        installed.className,
        installed.method,
        consts,
        initFunction?.span,
      );
      annotateInputHandlerClosure(g, handlerId, ioportMembers, textMacros.strings);
      g.edge(id, handlerId, 'CALLS_HANDLER');
    }
  }

  // --- rom sets ---
  for (const set of parseRomSets(combined, consts, textMacros.strings)) {
    const setId = `romset:${set.name}`;
    const setSource = ast.findMacro('ROM_START', 0, set.name)?.span;
    g.node('RomSet', setId, { name: set.name, ...spanProps(setSource) });
    definedIn(setId, setSource);
    for (const region of set.regions) {
      const regId = `region:${set.name}/${region.tag}`;
      const regionSource = ast.findMacro('ROM_REGION', 1, region.tag)?.span;
      g.node('RomRegion', regId, {
        tag: region.tag, size: region.size, flags: region.flags,
        ...(region.fills.length ? {
          fills: region.fills.flatMap(fill => [fill.offset, fill.size, fill.value]),
        } : {}),
        ...spanProps(regionSource),
      });
      g.edge(setId, regId, 'HAS_REGION');
      for (const load of region.loads) {
        // region-scoped: the same FILE NAME can be two different ROMs in two
        // regions (gyruss has two distinct "gyrussk.4" chips)
        const romId = `rom:${set.name}/${region.tag}/${load.file}`;
        const props: Record<string, PropValue> = {
          file: load.file, offset: load.offset, size: load.size, crc: load.crc, sha1: load.sha1,
          ...spanProps(ast.findMacro('ROM_LOAD', 0, load.file)?.span),
        };
        if (load.reloadOffsets.length) props.reloadOffsets = load.reloadOffsets;
        if (load.groupSize !== undefined) props.groupSize = load.groupSize;
        if (load.skip !== undefined) props.skip = load.skip;
        if (load.reverse) props.reverse = true;
        if (load.nibbleShift !== undefined) props.nibbleShift = load.nibbleShift;
        if (load.continueSegments.length) {
          props.continueSegments = load.continueSegments.flatMap(segment => [
            segment.offset,
            segment.size,
            segment.fileOffset,
          ]);
        }
        if (load.ignoredBytes) props.ignoredBytes = load.ignoredBytes;
        if (load.status) props.status = load.status;
        g.node('Rom', romId, props);
        g.edge(regId, romId, 'LOADS');
      }
    }
  }

  // --- address maps ---
  const maps = parseAddressMaps(combined);
  expandDeviceSubmaps(maps, mameSrc, seenExternalIncludes);
  const mapByName = new Map(maps.map(m => [m.name, m]));
  // same-class match first: different state classes in one driver file can
  // reuse map names (m52_state::main_map vs alpha1v_state::main_map)
  const resolveMap = (cls: string, name: string) => {
    const qualified = /^(\w+)::(\w+)$/.exec(name);
    return qualified
      ? maps.find(m => m.cls === qualified[1] && m.name === qualified[2])
      : maps.find(m => m.cls === cls && m.name === name) ?? mapByName.get(name);
  };
  for (const map of maps) {
    const mapId = `map:${map.cls}.${map.name}`;
    const mapFunction = ast.findFunction(map.cls, map.name);
    const mapProps: Record<string, PropValue> = {
      cls: map.cls, name: map.name, ...spanProps(mapFunction?.span),
    };
    if (map.calls.length) mapProps.calls = map.calls;
    if (map.globalMask !== undefined) mapProps.globalMask = map.globalMask;
    if (map.unmapHigh) mapProps.unmapHigh = true;
    g.node('AddressMap', mapId, mapProps);
    definedIn(mapId, mapFunction?.span);
    for (const callee of map.calls) {
      const target = resolveMap(map.cls, callee);
      if (target) g.edge(mapId, `map:${target.cls}.${target.name}`, 'INCLUDES_MAP');
    }
    map.ranges.forEach((r, i) => {
      const rangeId = `${mapId}/range${i}`;
      const rangeSource = ast.findStatement(r.raw, mapFunction)?.span;
      const props: Record<string, PropValue> = {
        start: r.start, end: r.end, raw: r.raw, ...spanProps(rangeSource),
      };
      if (r.mirror !== undefined) props.mirror = r.mirror;
      for (const flag of ['rom', 'ram', 'readonly', 'writeonly', 'nopw', 'nopr'] as const) {
        if (r[flag]) props[flag] = true;
      }
      if (r.share) props.share = r.share;
      if (r.umask !== undefined) props.umask = r.umask;
      if (r.viewTag) props.viewTag = r.viewTag;
      if (r.viewEntry !== undefined) props.viewEntry = r.viewEntry;
      if (r.portRead) props.portRead = r.portRead;
      if (r.portWrite) props.portWrite = r.portWrite;
      if (r.bankRead) props.bankRead = memberTags[`m_${r.bankRead}`] ?? r.bankRead;
      if (r.bankWrite) props.bankWrite = memberTags[`m_${r.bankWrite}`] ?? r.bankWrite;
      if (r.region) {
        // Address maps may name a required/optional_region_ptr member rather
        // than a literal tag: `.region(m_soundrom, 0)`. Resolve it through the
        // driver's finder declarations so the executable CPU consumes the
        // actual ROM region (`soundrom`), not the C++ member spelling.
        props.region = (memberTags[r.region] ?? r.region).replace(/^:/, '');
      }
      if (r.regionOffset !== undefined) props.regionOffset = r.regionOffset;
      g.node('AddressRange', rangeId, props);
      g.edge(mapId, rangeId, 'HAS_RANGE');
      for (const dir of ['read', 'write'] as const) {
        const h = r[dir];
        if (!h) continue;
        const owner = h.deviceClass ?? map.cls;
        const hid = `handler:${owner}.${h.method}`;
        if (h.inlineBody !== undefined) {
          g.node('Handler', hid, handlerProps(ast, owner, h.method, consts, rangeSource, h));
        } else {
          emitSourceHandlerClosure(g, ast, owner, h.method, consts, rangeSource);
        }
        const edgeProps: Record<string, PropValue> = {};
        if (h.deviceRef) {
          // The map's own class first, as a machine config resolves its
          // finders: Elevator Action's map and its interface both say m_mcu.
          edgeProps.deviceTag = memberTags[`${map.cls}::${h.deviceRef}`] ??
            memberTags[h.deviceRef] ?? h.deviceRef.replace(/^m_/, '');
        }
        g.edge(rangeId, hid, dir === 'read' ? 'READS' : 'WRITES',
          h.deviceRef ? edgeProps : undefined);
      }
    });
  }

  // --- machine configs ---
  const gfxDecodes = parseGfxDecodes(combined, consts);
  // A slot whose default card runs a program of its own is part of the
  // machine MAME builds: the C64's iec8 holds a 1541, whose 6502 runs the
  // drive's DOS against two VIAs and a GCR gate array. The card's source is
  // not in the driver's family, so the first pass that finds one rebuilds the
  // graph with it parsed; the card then appears as a device of the slot's
  // config, tagged as MAME tags it (`iec8:c1541`), and its own
  // device_add_mconfig composes under that tag.
  const processorCards = processorSlotCards(mameSrc, slashIncludes, machineConfigs);
  const composedCards = new Set<string>();
  const cardFiles = [...new Set([...processorCards.values()].flatMap(card => card.files))]
    .map(file => join(mameSrc, file))
    .filter(file => !family.includes(file));
  if (cardFiles.length) return buildGraph(mameSrc, driverFile, [...cardUnits, ...cardFiles]);
  for (const cfg of machineConfigs) {
    for (const dev of [...cfg.devices]) {
      const card = dev.slotOptions && dev.slotDefault
        ? processorCards.get(`${dev.slotOptions}/${dev.slotDefault}`)
        : undefined;
      if (card) {
        // MAME clocks a card with its slot's clock when the option names none.
        cfg.devices.push({ type: card.type, tag: `${dev.tag}:${dev.slotDefault}`, clock: dev.clock ?? null, addrMaps: {}, config: [] });
        composedCards.add(`device:${cfg.cls}.${cfg.name}/${dev.tag}:${dev.slotDefault}`);
        continue;
      }
      // A connector configured in place rather than through an options
      // table: the 1541 builds its floppy connector with
      // `connector.option_add("525ssqd", ALPS_3255190X)` and
      // `set_default_option("525ssqd")`, and the drive mechanism MAME
      // instantiates there is the device the gate array reads.
      const defaultOption = dev.config
        .map(statement => /\bset_default_option\s*\(\s*"([^"]+)"\s*\)/.exec(statement)?.[1])
        .find(Boolean);
      const optionType = defaultOption && dev.config
        .map(statement => new RegExp(`\\boption_add\\s*\\(\\s*"${defaultOption}"\\s*,\\s*(\\w+)\\s*\\)`).exec(statement)?.[1])
        .find(Boolean);
      if (defaultOption && optionType) {
        cfg.devices.push({ type: optionType, tag: `${dev.tag}:${defaultOption}`, clock: null, addrMaps: {}, config: [] });
      }
    }
  }
  const cfgByName = new Map(machineConfigs.map(c => [c.name, c]));
  // A device class's own sub-machine, inherited when the class does not
  // override it: every 1541 variant composes c1541_device_base's.
  const deviceMachineConfig = (cls: string) => {
    for (const owner of sourceClassHierarchy(ast, cls)) {
      const found = machineConfigs.find(c => c.cls === owner && c.name === 'device_add_mconfig');
      if (found) return found;
    }
    return undefined;
  };
  const resolveConfig = (cfg: (typeof machineConfigs)[number], callee: string) => {
    const qualified = /^(\w+)::(\w+)$/.exec(callee);
    if (qualified) {
      const resolved = ast.findFunctionInHierarchy(qualified[1]!, qualified[2]!);
      return machineConfigs.find(candidate => candidate.cls === resolved?.className
        && candidate.name === resolved?.name);
    }
    return machineConfigs.find(candidate => candidate.cls === cfg.cls && candidate.name === callee)
      ?? cfgByName.get(callee);
  };
  const virtualMethod = (className: string, method: string): boolean => {
    const seen = new Set<string>();
    const visit = (candidate: string): boolean => {
      if (seen.has(candidate)) return false;
      seen.add(candidate);
      const declaration = ast.ast.units
        .flatMap(unit => unit.classes)
        .find(cls => cls.name === candidate);
      if (!declaration) return false;
      const escaped = method.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const declaredVirtual = new RegExp(
        `(?:\\bvirtual\\s+[^;{}]*\\b${escaped}\\s*\\(` +
        `|\\b${escaped}\\s*\\([^;{}]*\\)[^;{}]*(?:override|final)\\b)`,
      ).test(declaration.body);
      return declaredVirtual || declaration.bases.some(base =>
        visit(base.split('::').at(-1)!));
    };
    return visit(className);
  };
  const inheritedVirtualMapPatches = (cfg: (typeof machineConfigs)[number]) => {
    const patches: { tag: string; space: string; mapId: string }[] = [];
    const seenConfigs = new Set<string>();
    const seenPatches = new Set<string>();
    const visit = (current: (typeof machineConfigs)[number]): void => {
      const configKey = `${current.cls}.${current.name}`;
      if (seenConfigs.has(configKey)) return;
      seenConfigs.add(configKey);
      for (const device of current.devices) {
        for (const [space, mapName] of Object.entries(device.addrMaps)) {
          const declared = resolveMap(current.cls, mapName);
          if (!declared || !virtualMethod(declared.cls, declared.name)) continue;
          const effective = ast.findFunctionInHierarchy(cfg.cls, declared.name);
          const target = effective && resolveMap(effective.className, effective.name);
          if (!target || target.cls === declared.cls) continue;
          const key = `${device.tag}\0${space}`;
          if (seenPatches.has(key)) continue;
          seenPatches.add(key);
          patches.push({
            tag: device.tag,
            space,
            mapId: `map:${target.cls}.${target.name}`,
          });
        }
      }
      for (const callee of current.calls) {
        const target = resolveConfig(current, callee);
        if (target) visit(target);
      }
    };
    visit(cfg);
    return patches;
  };

  // Clock resolution: a device instantiated with no clock runs at its
  // constructor default (timeplt_a.h: `uint32_t clock = 14'318'181`), and
  // DERIVED_CLOCK(n, d) inside its device_add_mconfig is that clock * n/d.
  const defaultClocks = parseDeviceDefaultClocks(combined);
  for (const cfg of machineConfigs) {
    for (const dev of cfg.devices) {
      if (dev.clock !== null || dev.clockExpr) continue;
      const cls = deviceTypes[dev.type];
      if (cls && defaultClocks[cls] !== undefined) dev.clock = defaultClocks[cls];
    }
  }
  // What `clock()` means inside a class's own device_add_mconfig: the clock of
  // the device being configured, never a sub-device's. Midway's SSIO derives
  // both its Z80 (DERIVED_CLOCK(1, 2*4)) and that Z80's periodic /SINT
  // (clock() / (2*16*10)) from the board's 16 MHz; resolving clock() against
  // the sub-device ran the sound board's whole interrupt engine 8x slow.
  const ownerClocks: Record<string, number> = {};
  for (const cfg of machineConfigs) {
    for (const dev of cfg.devices) {
      const devCls = deviceTypes[dev.type];
      if (!devCls || dev.clock === null) continue;
      ownerClocks[devCls] = dev.clock;
      const sub = deviceMachineConfig(devCls);
      for (const sd of sub?.devices ?? []) {
        const clock = derivedDeviceClock(sd.clockExpr, dev.clock, consts);
        if (clock !== undefined) { sd.clock = clock; delete sd.clockExpr; }
      }
    }
  }
  // device_start, deferred until every other handler is on the graph: whether
  // to lower it at all depends on what else the class contributes. See the
  // post-pass below.
  const pendingDeviceStarts: { devId: string; fn: MameFunction }[] = [];
  for (const cfg of machineConfigs) {
    const cfgId = `machine:${cfg.cls}.${cfg.name}`;
    const cfgFunction = ast.findFunction(cfg.cls, cfg.name);
    // `clock()` in a device_add_mconfig body is the configured device's own
    // clock; a driver's machine config has no clock() to resolve.
    const configClock = cfg.name === 'device_add_mconfig'
      ? ownerClocks[cfg.cls] ?? defaultClocks[cfg.cls]
      : undefined;
    const machineStart = ast.findFunctionInHierarchy(cfg.cls, 'machine_start');
    const timerStartHandlers = new Set<string>();
    const pendingTimerStarts = resolveMachineLifecycle(
      ast,
      cfg.cls,
      cfg.name,
      'start',
    );
    // video_start is a start too, and where the Spectrum allocates its
    // interrupt and screen-finish timers.
    const timerVideoStart = ast.findFunctionInHierarchy(cfg.cls, 'video_start');
    if (timerVideoStart) pendingTimerStarts.push(timerVideoStart);
    while (pendingTimerStarts.length) {
      const fn = pendingTimerStarts.shift()!;
      const key = `${fn.className}.${fn.name}`;
      if (timerStartHandlers.has(key)) continue;
      timerStartHandlers.add(key);
      // A qualified call reaches the class it names, not the override:
      // `spectrum_state::video_start()` from the 128K's own video_start.
      for (const call of fn.body.matchAll(/\b(\w+)::(\w+)\s*\(/g)) {
        const target = ast.findFunction(call[1]!, call[2]!);
        if (target) pendingTimerStarts.push(target);
      }
      // Drivers commonly allocate their scanline timers in a helper called
      // by machine_start (Berzerk uses create_irq_timer/create_nmi_timer).
      // The timer callback is part of the selected machine whenever that
      // allocation helper is in the lifecycle closure, not only when the
      // timer_alloc expression appears in machine_start itself.
      for (const statement of fn.statements) {
        for (const call of statement.calls) {
          const target = ast.findFunctionInHierarchy(fn.className, call.name);
          if (target) pendingTimerStarts.push(target);
        }
      }
    }
    // Handlers only: machine_start installs are placed on the main CPU, and
    // a storage install there has no target resolution yet.
    const installedHandlers = machineStart
      ? parseInstalledHandlers(machineStart.body, consts).filter(handler => handler.kind !== 'ram')
      : [];
    const resetFunctions = resolveMachineLifecycle(
      ast,
      cfg.cls,
      cfg.name,
      'reset',
    );
    const resetHandlers = resetFunctions.map(fn => `${fn.className}.${fn.name}`);
    const videoStartOverride = [...cfg.raw.matchAll(
      /MCFG_VIDEO_START_OVERRIDE\s*\(\s*(\w+)\s*,\s*(\w+)\s*\)/g,
    )].at(-1);
    const videoStart = videoStartOverride
      ? ast.findFunctionInHierarchy(
          videoStartOverride[1]!,
          `video_start_${videoStartOverride[2]}`,
        )
      : ast.findFunctionInHierarchy(cfg.cls, 'video_start');
    const startHandlers = videoStart ? [`${videoStart.className}.${videoStart.name}`] : [];
    // MAME `machine_config::set_perfect_quantum(device)`: this board is
    // interleaved as finely as the scheduler can manage, for the whole run.
    // Qix's three processors share RAM through a handshake that will not
    // survive anything coarser.
    const perfectQuantum = /\bset_perfect_quantum\s*\(/.test(cfg.raw);
    // `m_x = timer_alloc(...)` in the machine-start closure: a driver's own
    // emu_timer. The board models `adjust()`/`enabled()` for these, and
    // without them Simpsons' four-cycle NMI block never blocked anything --
    // its sound CPU took the NMI before the HALT it is meant to arm, and the
    // whole sound board went quiet as soon as the schedule interleaved as
    // finely as MAME's own does.
    const driverTimers = [...new Set([...timerStartHandlers].flatMap(key => {
      const [className, method] = key.split('.');
      const fn = className && method
        ? ast.findFunctionInHierarchy(className, method)
        : undefined;
      if (!fn) return [];
      return [...fn.body.matchAll(
        /\b(m_\w+)\s*=\s*timer_alloc\s*\(\s*(?:FUNC\(\s*(\w+)::(\w+)\s*\)|timer_expired_delegate\s*\(\s*\))/g,
      )].map(match => `${match[1]}=${match[2] && match[3] ? `${match[2]}.${match[3]}` : ''}`);
    }))];
    // A driver timer with a real callback, allocated and first armed in the
    // machine-start closure (Missile Command's scanline IRQ and CPU-speed
    // timers). Recorded with the start function that arms it; emit-machine
    // lowers it only when nothing else already reaches that callback.
    const armedTimers = [...timerStartHandlers].flatMap(key => {
      const [className, method] = key.split('.');
      const fn = className && method ? ast.findFunctionInHierarchy(className, method) : undefined;
      if (!fn) return [];
      return [...fn.body.matchAll(/\b(m_\w+)\s*=\s*timer_alloc\s*\(\s*FUNC\(\s*(\w+)::(\w+)\s*\)/g)]
        // Armed by the function that allocates it, through its own closure
        // (missile's machine_start arms m_irq_timer via schedule_next_irq).
        // Or, for one video_start allocates, armed by another handler of the
        // driver's: the Spectrum's vblank callback arms its IRQ timer, whose
        // callback arms the one that clears the line again. Only there: a
        // machine-start timer armed elsewhere is one the runtime already
        // schedules its own way (Neo Geo's raster interrupts, Simpsons'
        // sprite DMA), and lowering it too fires it twice.
        .flatMap(match => functionClosureContains(ast, fn, body => body.includes(`${match[1]}->adjust`)) ||
          (method === 'video_start' &&
            ast.ast.units.some(unit => unit.functions.some(candidate => candidate.body.includes(`${match[1]}->adjust`))))
          ? [`${match[1]}=${match[2]}.${match[3]}@${key}`]
          : []);
    });
    // A timer armed inside a line rather than at its start: MAME's
    // `time_until_pos(v, h)` with a pixel, or a duration in clocks (the
    // Spectrum's IRQ, raised at the screen area's left edge and held for 32
    // T-states). Only those need the board to fire them between instructions;
    // one aimed at a line start keeps its line (Missile Command's).
    const preciseTimers = armedTimers.map(entry => /^([^=]+)=/.exec(entry)![1]!).filter(member =>
      ast.ast.units.some(unit => unit.functions.some(fn => {
        for (const call of fn.body.matchAll(new RegExp(`\\b${member}\\s*->\\s*adjust\\s*\\(`, 'g'))) {
          const open = call.index + call[0].length - 1;
          const close = matchingParenthesis(fn.body, open);
          const argument = fn.body.slice(open + 1, close < 0 ? undefined : close);
          if (/\bclocks_to_attotime\s*\(|\bfrom_ticks\s*\(/.test(argument)) return true;
          const position = /\btime_until_pos\s*\(/.exec(argument);
          if (position) {
            const start = position.index + position[0].length - 1;
            const end = matchingParenthesis(argument, start);
            const args = splitMameArgs(argument.slice(start + 1, end < 0 ? undefined : end));
            if (args.length > 1 && args[1]!.trim() !== '0') return true;
          }
        }
        return false;
      })));
    for (const entry of armedTimers) {
      const [, handler, arming] = /^[^=]+=([^@]+)@(.+)$/.exec(entry)!;
      for (const key of [handler!, arming!]) {
        const [className, method] = key.split('.');
        const fn = className && method ? ast.findFunctionInHierarchy(className, method) : undefined;
        if (!fn) continue;
        const handlerId = emitSourceHandlerClosure(g, ast, fn.className, fn.name, consts, fn.span);
        g.edge(cfgId, handlerId, 'CALLS_HANDLER');
      }
    }
    g.node('MachineConfig', cfgId, {
      cls: cfg.cls,
      name: cfg.name,
      calls: cfg.calls,
      ...(armedTimers.length ? { armedTimers } : {}),
      ...(preciseTimers.length ? { preciseTimers } : {}),
      ...(driverStateMembers(ast, cfg.cls).length
        ? { stateMembers: driverStateMembers(ast, cfg.cls).map(member => JSON.stringify(member)) }
        : {}),
      ...(perfectQuantum ? { perfectQuantum: true } : {}),
      ...(driverTimers.length ? { driverTimers } : {}),
      ...(resetHandlers.length ? { resetHandlers } : {}),
      ...(startHandlers.length ? { startHandlers } : {}),
      ...(installedHandlers.length
        ? { installedHandlers: installedHandlers.map(handler => JSON.stringify(handler)) }
        : {}),
      ...(cfg.devicePatches.length
        ? { devicePatches: cfg.devicePatches.map(patch => JSON.stringify(patch)) }
        : {}),
      ...(cfg.removedAddrMaps.length
        ? { removedAddrMaps: cfg.removedAddrMaps.map(removal =>
            `${removal.tag}=${removal.space}`) }
        : {}),
      ...(cfg.removedDevices.length
        ? { removedDevices: cfg.removedDevices.map(removal => removal.tag) }
        : {}),
      ...spanProps(cfgFunction?.span),
    });
    definedIn(cfgId, cfgFunction?.span);
    for (const fn of resetFunctions) {
      const handlerId = emitSourceHandlerClosure(
        g,
        ast,
        fn.className,
        fn.name,
        consts,
        fn.span,
      );
      g.edge(cfgId, handlerId, 'CALLS_HANDLER');
    }
    if (videoStart) {
      const handlerId = emitSourceHandlerClosure(
        g,
        ast,
        videoStart.className,
        videoStart.name,
        consts,
        videoStart.span,
      );
      g.edge(cfgId, handlerId, 'CALLS_HANDLER');
    }
    for (const installed of installedHandlers) {
      const handlerId = emitSourceHandlerClosure(
        g,
        ast,
        installed.className,
        installed.method,
        consts,
        machineStart?.span,
      );
      annotateInputHandlerClosure(g, handlerId, ioportMembers, textMacros.strings);
      g.edge(cfgId, handlerId, 'CALLS_HANDLER');
    }
    for (const callback of g.nodes.values()) {
      if (callback.label !== 'Callback' || callback.props.signal !== 'timer') continue;
      const targetClass = String(callback.props.targetClass ?? '');
      const targetMethod = String(callback.props.targetMethod ?? '');
      const startHandler = `${String(callback.props.startClass ?? '')}.${String(callback.props.startMethod ?? '')}`;
      if (!timerStartHandlers.has(startHandler)) continue;
      const resolved = ast.findFunctionInHierarchy(cfg.cls, targetMethod);
      if (resolved?.className === targetClass) g.edge(cfgId, callback.id, 'HAS_CALLBACK');
    }
    cfg.calls.forEach((callee, index) => {
      const target = resolveConfig(cfg, callee);
      // The call's position among this config's own device declarations, so
      // composition can be replayed in MAME's statement order.
      if (target) {
        g.edge(cfgId, `machine:${target.cls}.${target.name}`, 'CALLS', {
          order: cfg.callOrders[index] ?? cfg.devices.length,
        });
      }
    });
    const bankRoots = [
      ...(machineStart ? [machineStart] : []),
      ...(videoStart ? [videoStart] : []),
      ...games
        .filter(game => game.cls === cfg.cls && game.machine === cfg.name)
        .flatMap(game => {
          const init = ast.findFunctionInHierarchy(cfg.cls, game.init);
          return init ? [init] : [];
        }),
    ];
    const bankFunctions: MameFunction[] = [];
    const pendingBankFunctions = [...bankRoots];
    const seenBankFunctions = new Set<string>();
    while (pendingBankFunctions.length) {
      const fn = pendingBankFunctions.shift()!;
      const key = `${fn.className}.${fn.name}`;
      if (seenBankFunctions.has(key)) continue;
      seenBankFunctions.add(key);
      bankFunctions.push(fn);
      const discoveredCalls = new Set<string>();
      for (const statement of fn.statements) {
        for (const call of statement.calls) {
          const qualified = new RegExp(`\\b(\\w+)::${call.name}\\b`).exec(statement.text)?.[1];
          const target = qualified
            ? ast.findFunction(qualified, call.name)
            : ast.findFunctionInHierarchy(fn.className, call.name);
          if (target) {
            discoveredCalls.add(`${target.className}.${target.name}`);
            pendingBankFunctions.push(target);
          }
        }
      }
      // The statement AST intentionally keeps compound statements opaque. Bank
      // setup is commonly nested in an if/switch (Neo Geo's set_slot_idx is a
      // prominent example), so also discover source-local method calls from the
      // complete body. Resolution against the class hierarchy filters ordinary
      // language and device calls out of this traversal.
      for (const call of fn.body.matchAll(/\b(?:(\w+)::)?(\w+)\s*\(/g)) {
        const target = call[1]
          ? ast.findFunction(call[1], call[2]!)
          : ast.findFunctionInHierarchy(fn.className, call[2]!);
        if (!target || discoveredCalls.has(`${target.className}.${target.name}`)) continue;
        discoveredCalls.add(`${target.className}.${target.name}`);
        pendingBankFunctions.push(target);
      }
    }
    const overrideBankSources = [...cfg.raw.matchAll(
      /MCFG_MACHINE_START_OVERRIDE\s*\(\s*(\w+)\s*,\s*(\w+)\s*\)/g,
    )].flatMap(match => {
      const body = machineStartMemberBody(combined, match[1]!, match[2]!);
      return body
        ? parseMemoryBanks(body, memberTags, consts).map(bank => ({
            bank,
            source: cfgFunction?.span,
          }))
        : [];
    });
    // A device that owns a CPU configures that CPU's banks in its own
    // device_start, against regions named relative to itself: the Williams
    // ADPCM board banks `adpcm:cpu` into `rombank` and `romupper`.
    const deviceBankSources = cfg.devices.flatMap(device => {
      const cls = deviceTypes[device.type];
      const start = cls ? ast.findFunctionInHierarchy(cls, 'device_start') : undefined;
      return start
        ? parseMemoryBanks(start.body, memberTags, consts, device.tag)
          .map(bank => ({ bank, source: start.span }))
        : [];
    });
    // `m_ram->size()` is the RAM device's configured size: the 128K counts
    // its bank entries as `m_ram->size() / 0x4000`.
    const bankRamSizes = configuredRamSizes(machineConfigs, cfg.name, memberTags);
    const sizedBankBody = (body: string): string => body.replace(
      /\b(m_\w+)\s*->\s*size\s*\(\s*\)/g,
      (all, member: string) => bankRamSizes[member] !== undefined ? String(bankRamSizes[member]) : all,
    );
    const bankSources = [
      ...bankFunctions.flatMap(fn =>
        parseMemoryBanks(sizedBankBody(fn.body), memberTags, consts).map(bank => ({ bank, source: fn.span }))),
      ...overrideBankSources,
      ...deviceBankSources,
    ];
    // `m_maincpu->space(AS_PROGRAM).specific(m_program)`: a member the driver
    // reads a processor's space through (the 128K fetches every opcode with
    // `m_program.read_byte`), bound where the machine starts.
    const spaceAccessors = [...new Set(bankFunctions.flatMap(fn => [...fn.body.matchAll(
      /\b(m_\w+)\s*->\s*space\s*\(\s*(AS_\w+)?\s*\)\s*\.\s*(?:specific|cache)\s*\(\s*(m_\w+)\s*\)/g,
    )].flatMap(match => {
      const cpu = memberTags[match[1]!]?.replace(/^:/, '');
      const space = { AS_PROGRAM: 'program', AS_IO: 'io', AS_OPCODES: 'opcodes' }[match[2] ?? 'AS_PROGRAM'];
      return cpu && space ? [`${match[3]}=${cpu}:${space}`] : [];
    })))];
    if (spaceAccessors.length) g.node('MachineConfig', cfgId, { spaceAccessors });
    for (const [index, { bank, source }] of bankSources.entries()) {
      // One node per configure call: a bank's entries may be placed by several.
      const window = bankSources.filter(other => other.bank.tag === bank.tag).length > 1
        ? `/${index}`
        : '';
      const bankId = `bank:${cfg.cls}.${cfg.name}/${bank.tag}${window}`;
      g.node('MemoryBank', bankId, {
        tag: bank.tag,
        member: bank.member,
        startEntry: bank.startEntry,
        entries: bank.entries,
        ...(bank.region ? { region: bank.region } : {}),
        ...(bank.entryMember ? { entryMember: bank.entryMember } : {}),
        ...(bank.device ? { device: bank.device } : {}),
        offset: bank.offset,
        stride: bank.stride,
        ...(bank.dynamicShift !== undefined ? { dynamicShift: bank.dynamicShift } : {}),
        ...(bank.initialEntry !== undefined ? { initialEntry: bank.initialEntry } : {}),
        raw: bank.raw,
        ...spanProps(source),
      });
      g.edge(cfgId, bankId, 'HAS_BANK');
      definedIn(bankId, source);
    }
    for (const list of cfg.softwareLists) {
      // Scoped to the machine config that declares it, because a list's tag
      // and original/compatible status are that config's facts, not the
      // list's. gb.cpp declares "gameboy" as cart_list/original from the Game
      // Boy and as gb_list/compatible from the Game Boy Color; keyed on the
      // name alone the second declaration overwrote the first, and the Game
      // Boy silently catalogued the Color's 1,718 cartridges as its own.
      const listId = `softlist:${cfg.cls}.${cfg.name}/${list.name}`;
      g.node('SoftwareList', listId, {
        name: list.name, tag: list.tag, status: list.status,
        ...(list.filter ? { filter: list.filter } : {}),
      });
      g.edge(cfgId, listId, 'HAS_SOFTLIST');
    }
    // patches: set_addrmap on devices instantiated in a CALLED config. The
    // edge lives on the PATCHING config (not the shared device node —
    // attaching there would leak one game's map into every other game that
    // calls the same base config, e.g. cannonbp's protection map into
    // pacman). The generator resolves patches along the game's CALLS chain.
    for (const patch of cfg.patches) {
      for (const [space, mapName] of Object.entries(patch.addrMaps)) {
        const target = resolveMap(cfg.cls, mapName);
        if (!target) continue;
        g.edge(cfgId, `map:${target.cls}.${target.name}`, 'PATCHES_MAP', { space, deviceTag: patch.tag });
      }
    }
    // A set_addrmap callback is a C++ member-function delegate. When the
    // referenced map is virtual, MAME dispatches it on the selected driver
    // object even if the device was installed by a called base config. Model
    // that implicit dispatch as the same per-config patch used by an explicit
    // derived set_addrmap call (Popeye's tpp2_state moves RAM from $8000 to
    // $8800 this way).
    for (const patch of inheritedVirtualMapPatches(cfg)) {
      if (cfg.patches.some(explicit =>
        explicit.tag === patch.tag && explicit.addrMaps[patch.space] !== undefined)) continue;
      g.edge(cfgId, patch.mapId, 'PATCHES_MAP', {
        space: patch.space,
        deviceTag: patch.tag,
      });
    }
    for (const patch of cfg.gfxDecodePatches) {
      g.edge(cfgId, `gfxdecode:${patch.name}`, 'DECODES', {
        deviceTag: patch.tag,
        override: true,
      });
    }
    for (const patch of cfg.devicePatches) {
      emitCallbacks(
        g,
        ast,
        cfgFunction,
        cfgId,
        patch.tag,
        patch.config,
        memberTags,
        consts,
        configClock,
      );
    }
    let hardwareIndex: ReturnType<typeof indexMameHardware> | undefined;
    for (const dev of cfg.devices) {
      // namespaced by class AND config name: every device-board class has a
      // config called device_add_mconfig, and different classes reuse tags
      // (m52/m62 audio boards both have an "iremsound" cpu)
      const devId = `device:${cfg.cls}.${cfg.name}/${dev.tag}`;
      const owners = sourceClassHierarchy(ast, cfg.cls);
      const finders = [...new Set(ast.ast.units.flatMap(unit => unit.classes)
        .filter(declaration => owners.includes(declaration.name))
        .flatMap(declaration => memberDeclarations(declaration)
          .map(member => ({ member, tag: memberTags[`${declaration.name}::${member.name}`] ?? memberTags[member.name] })))
        .filter(({ member, tag }) => /^(?:required|optional)_device\s*</.test(member.valueType) && tag === dev.tag)
        .map(({ member }) => member.name))];
      const deviceStart = deviceTypes[dev.type]
        ? ast.findFunctionInHierarchy(deviceTypes[dev.type]!, 'device_start')
        : undefined;
      // `AY8912(config, m_ay0, clock())` inside a card's device_add_mconfig:
      // clock() is the card's own, which MAME gives it from the slot.
      if (dev.clock === null && dev.clockExpr && configClock !== undefined && /\bclock\s*\(\s*\)/.test(dev.clockExpr)) {
        const clock = evalExpr(dev.clockExpr.replace(/\bclock\s*\(\s*\)/g, String(configClock)), consts);
        if (clock !== null) { dev.clock = clock; delete dev.clockExpr; }
      }
      const props: Record<string, PropValue> = {
        type: dev.type, tag: dev.tag, clock: dev.clock, config: dev.config,
        ...(finders.length === 1 ? { member: finders[0]! } : {}),
        // The C++ classes DEFINE_DEVICE_TYPE gave this device type, most
        // derived first. Composition needs them to tell whose compiled
        // handlers a `m_member->method()` call belongs to when the device has
        // no executable core of its own and its methods are the board's
        // generated handlers (two unrelated devices both declare reset_w).
        ...(deviceTypes[dev.type]
          ? {
              cls: deviceTypes[dev.type],
              clsHierarchy: sourceClassHierarchy(ast, deviceTypes[dev.type]!),
              ...(sourceImageInterface(ast, deviceTypes[dev.type]!) ? { imageInterface: true } : {}),
            }
          : {}),
        ...spanProps(ast.findStatement(dev.config[0] ?? '', cfgFunction)?.span),
      };
      const configCalls = dev.config.flatMap(raw => {
        // Device finder arrays retain their source spelling (`m_pia[0]`).
        // Accept the subscript here so their constant machine-config setters
        // are lowered just like setters on scalar finder members.
        const call = /(?:\w+|m_\w+(?:\[\d+\])?)\s*(?:->|\.)\s*(\w+)\s*\(([\s\S]*)\)\s*;?$/.exec(raw.trim());
        if (!call) return [];
        // Numbers, and the tags a setter hands another device: a string
        // literal, or a device finder resolved to its tag (the Battlezone
        // AVG's `set_memory(m_maincpu, AS_PROGRAM, 0x2000)`).
        const values = splitMameArgs(call[2]!).map(value => {
          const number = evalExpr(value, { ...addressSpaces, ...consts });
          if (number !== null) return String(number);
          const text = value.trim();
          if (/^"[^"]*"$/.test(text)) return text;
          const finder = /^m_\w+$/.test(text) ? memberTags[text] : undefined;
          if (finder) return JSON.stringify(finder);
          // A format list, which the device keeps by name (`set_formats(tzx_cassette_formats)`).
          if (call[1] === 'set_formats' && /^\w+$/.test(text)) return JSON.stringify(text);
          // A rectangle the config computes: the Spectrum ULA's
          // `set_screen(m_screen, get_screen_area())`.
          const rectangle = evaluateRectangle(text, cfgFunction?.body ?? cfg.raw, cfg.cls, combined, consts);
          if (rectangle) return JSON.stringify({ rectangle });
          // A `static const` table the config hands over whole: the
          // Spectrum's `set_levels(4, speaker_levels)` beeper volumes.
          const table = /^\w+$/.test(text) ? staticTableValues(combined, text, consts) : undefined;
          return table ? JSON.stringify(table) : null;
        });
        return values.every((value): value is string => value !== null)
          ? [`${call[1]}(${values.join(',')})`]
          : [];
      });
      // Arguments past the tag that select a constructor overload of setters.
      // A framework device (src/devices) is declared outside the family, so its
      // class comes from MAME's hardware index, read only when one is added so.
      const addition = dev.config[0] ?? '';
      const typeCall = new RegExp(`\\b${dev.type}\\s*\\(`).exec(addition);
      const addOpen = typeCall ? typeCall.index + typeCall[0].length - 1 : addition.indexOf('(');
      const addClose = addOpen < 0 ? -1 : matchingParenthesis(addition, addOpen);
      const addedArgs = addOpen < 0 ? [] : splitMameArgs(addition.slice(addOpen + 1, addClose < 0 ? undefined : addClose));
      const addedWith = addedArgs.length;
      // A third argument is a clock unless it is a string: the snapshot's
      // `SNAPSHOT(config, "snapshot", "sna,z80")` is its extension list.
      const constructorArgument = addedWith > 3 || /^\s*"/.test(addedArgs[2] ?? '');
      const deviceClass = deviceTypes[dev.type] ?? (constructorArgument
        ? (hardwareIndex ??= indexMameHardware(mameSrc)).get(dev.type)?.className
        : undefined);
      const constructed = deviceClass
        ? constructorConfigCalls(dev.config[0] ?? '', deviceClass, [combined, ...externalSources], consts)
        : { calls: [], clockConsumed: false };
      configCalls.push(...constructed.calls);

      if (configCalls.length) props.configCalls = configCalls;
      // A third argument a setter took is the constructor's, not a clock: the
      // quickload's is its extension list. The OKI6295's constructor passes
      // its third on as the clock and sets only pin 7 from the fourth.
      if (dev.clockExpr && !constructed.clockConsumed) props.clockExpr = dev.clockExpr;
      if (dev.screenRaw) {
        props.screenRaw = [
          dev.screenRaw.pixclock, dev.screenRaw.htotal, dev.screenRaw.hbend, dev.screenRaw.hbstart,
          dev.screenRaw.vtotal, dev.screenRaw.vbend, dev.screenRaw.vbstart,
        ];
      }
      if (dev.screenRawExpr) props.screenRawExpr = dev.screenRawExpr;
      if (dev.screenRefreshHz !== undefined) props.screenRefreshHz = dev.screenRefreshHz;
      if (dev.screenSize) props.screenSize = [dev.screenSize.w, dev.screenSize.h];
      if (dev.screenVisarea) {
        props.screenVisarea = [dev.screenVisarea.x0, dev.screenVisarea.x1, dev.screenVisarea.y0, dev.screenVisarea.y1];
      }
      if (dev.screenVideoAttributes?.length) props.screenVideoAttributes = dev.screenVideoAttributes;
      if (dev.slotOptions) props.slotOptions = dev.slotOptions;
      if (dev.slotDefault) props.slotDefault = dev.slotDefault;
      if (dev.slotAddress !== undefined) props.slotAddress = dev.slotAddress;
      g.node('Device', devId, props);
      g.edge(cfgId, devId, 'HAS_DEVICE');
      for (const [index, route] of (dev.audioRoutes ?? []).entries()) {
        const routeId = `audioroute:${devId}/${index}`;
        g.node('AudioRoute', routeId, {
          output: route.output,
          target: route.target,
          gain: route.gain,
          ...(route.input !== undefined ? { input: route.input } : {}),
          raw: route.raw,
          ...spanProps(ast.findStatement(route.raw, cfgFunction)?.span),
        });
        g.edge(devId, routeId, 'HAS_AUDIO_ROUTE');
      }
      emitCallbacks(
        g,
        ast,
        cfgFunction,
        devId,
        dev.tag,
        dev.config,
        memberTags,
        consts,
        configClock,
      );
      // Since MAME split screen_device by display type, a vector display is
      // its own video-output device and renders itself: the driver no longer
      // routes a screen update through set_screen_update, it just adds a
      // VECTOR and the device's video_output_update draws the beam list.
      // Bind that entry point as the machine's screen update so a vector
      // board carries the same video plan shape as a raster one.
      const boundByScreenUpdate = (raw: string): boolean =>
        raw.includes('set_screen_update') && raw.includes(`"${dev.tag}"`);
      if (dev.type === 'VECTOR' && ![...cfg.devices, ...cfg.devicePatches]
        .some(other => other.config.some(boundByScreenUpdate))) {
        const callbackId = `${devId}/callback:${dev.tag.replace(/[^A-Za-z0-9_]+/g, '_')}:video_output`;
        g.node('Callback', callbackId, {
          signal: 'set_screen_update',
          operation: 'set_screen_update',
          raw: dev.config[0] ?? '',
          ownerTag: dev.tag,
          targetTag: dev.tag,
          targetClass: 'vector_device',
          targetMethod: 'video_output_update',
          ...spanProps(ast.findStatement(dev.config[0] ?? '', cfgFunction)?.span),
        });
        g.edge(devId, callbackId, 'HAS_CALLBACK');
        g.edge(callbackId, emitSourceHandlerClosure(
          g,
          ast,
          'vector_device',
          'video_output_update',
          consts,
          ast.findStatement(dev.config[0] ?? '', cfgFunction)?.span,
        ), 'CALLS_HANDLER');
      }
      // board-style devices (IREM_M52_SOUNDC_AUDIO...) carry their own
      // sub-machine in device_add_mconfig — link so the subgraph walk
      // reaches the M6803/AY8910s/MSM5205 inside
      const devCls = deviceTypes[dev.type];
      if (devCls) {
        const sub = deviceMachineConfig(devCls);
        if (sub) g.edge(devId, `machine:${sub.cls}.${sub.name}`, 'CALLS');
        if (deviceStart) pendingDeviceStarts.push({ devId, fn: deviceStart });
      }
      for (const [space, mapName] of Object.entries(dev.addrMaps)) {
        // resolve by map NAME: set_addrmap may reference the map through a
        // derived class while the function is defined on the base
        // (m52_soundc_audio_device -> irem_audio_device::m52_small_sound_map)
        const target = resolveMap(cfg.cls, mapName);
        g.edge(devId, target ? `map:${target.cls}.${target.name}` : `map:${cfg.cls}.${mapName}`, 'HAS_MAP', { space });
      }
      if (dev.gfxDecodeName) {
        g.edge(cfgId, `gfxdecode:${dev.gfxDecodeName}`, 'DECODES', { deviceTag: dev.tag });
      }
    }
  }

  // --- device start ---
  // device_start is where a device derives the constants its own methods then
  // read: Midway's SSIO reads its 82S123 duty-cycle PROM there, and every AY
  // output gain it ever sets comes out of that table -- unstarted, each gain
  // it wrote was NaN.
  //
  // Only for a device whose methods the board runs *as handlers*, which is the
  // condition that gives it nowhere else to do this. A device with a generated
  // core of its own starts itself, and a second, partially lowered device_start
  // run over its state does nothing but corrupt what the core already derived:
  // lowering Atari's motion-object and slapstic starts unconditionally moved
  // gauntlet off its golden from frame 60. The test has to run here, after
  // every address map and devcb has put its own handlers on the graph.
  const classesWithHandlers = new Set([...g.nodes.values()]
    .filter(node => node.label === 'Handler')
    .map(node => String(node.props.ownerClass ?? '')));
  for (const { devId, fn } of pendingDeviceStarts) {
    if (!classesWithHandlers.has(fn.className)) continue;
    const device = g.nodes.get(devId);
    if (device) device.props.startHandler = `${fn.className}.device_start`;
    // The device's own emu_timers. Nothing else drives a composed board's
    // timers -- the Williams ADPCM board hands every sound command to its CPU
    // through a zero-delay sync_command timer -- so they are lowered with
    // their callbacks, unlike a driver's (see driverTimers).
    const deviceTimers = [...fn.body.matchAll(
      /\b(m_\w+)\s*=\s*timer_alloc\s*\(\s*FUNC\(\s*(\w+)::(\w+)\s*\)/g,
    )].map(match => `${match[1]}=${match[2]}.${match[3]}`);
    if (device && deviceTimers.length) device.props.deviceTimers = deviceTimers;
    g.edge(devId, emitSourceHandlerClosure(
      g,
      ast,
      fn.className,
      'device_start',
      consts,
      fn.span,
    ), 'CALLS_HANDLER');
  }

  // A composed slot card is reached by its bus through the interface it
  // implements, not through a devcb: the IEC bus calls a drive's
  // `cbm_iec_atn` and `cbm_iec_reset` on every line change. Those overrides
  // join the card's handler closure, and the board learns them by name; its
  // device_reset (the 1541 resets its own CPU and VIAs there) likewise.
  for (const devId of composedCards) {
    const device = g.nodes.get(devId);
    const cls = device && typeof device.props.cls === 'string' ? device.props.cls : undefined;
    if (!device || !cls) continue;
    const hierarchy = sourceClassHierarchy(ast, cls);
    const declarations = ast.ast.units.flatMap(unit => unit.classes)
      .filter(declaration => hierarchy.includes(declaration.name));
    const interfaceMethods = [...new Set(declarations.flatMap(declaration =>
      [...stripComments(declaration.body).matchAll(/\bvirtual\s+[\w:<>*&\s]+?\b(\w+)\s*\([^;{]*\)\s*(?:const\s*)?override\b/g)]
        .map(match => match[1]!)))]
      .filter(name => !/^device_|^rom_region$|^memory_space_config$/.test(name));
    const handlers: string[] = [];
    for (const name of interfaceMethods) {
      const fn = ast.findFunctionInHierarchy(cls, name);
      if (!fn) continue;
      g.edge(devId, emitSourceHandlerClosure(g, ast, fn.className, name, consts, fn.span), 'CALLS_HANDLER');
      handlers.push(`${fn.className}.${name}`);
    }
    if (handlers.length) device.props.interfaceHandlers = handlers;
    // The data members the card's classes declare. Some are set by a device
    // the card plugs into rather than by the card's own handlers -- the IEC
    // bus's add_device writes `m_bus` and `m_slot` into every drive -- so the
    // board's compiler cannot discover them from the handlers, and without
    // them the 1541's serial-port handlers stayed interpreted.
    const card = [...processorCards.values()].find(candidate => candidate.cls === cls);
    const members = [...new Set([
      ...declarations,
      ...(card ? includedBaseDeclarations(mameSrc, card.files, declarations) : []),
    ].flatMap(declaration =>
      memberDeclarations(declaration)
        .filter(member => !/\bconst\b/.test(member.valueType) &&
          !/^(?:enum|struct|union|class)$/.test(member.name))
        .map(member => member.name)))].sort();
    if (members.length) device.props.cardMembers = members;
    const reset = ast.findFunctionInHierarchy(cls, 'device_reset');
    if (reset) {
      g.edge(devId, emitSourceHandlerClosure(g, ast, reset.className, 'device_reset', consts, reset.span), 'CALLS_HANDLER');
      device.props.resetHandler = `${reset.className}.device_reset`;
    }
  }

  // --- inputs ---
  for (const inp of parseInputPorts(combined, textMacros)) {
    const source = ast.findMacro('INPUT_PORTS_START', 0, inp.name)?.span;
    emitInputPorts(g, inp, source ? `file:${source.file}` : fileId, source, {
      ast,
      constants: consts,
      ioportMembers,
      stringConstants: textMacros.strings,
    });
  }

  // --- console control-port inputs (live on the default slot device, not the
  // driver: nes.cpp's INPUT_PORTS_START(nes) is empty; the joypad fields are
  // in bus/nes_ctrl/joypad.cpp) ---
  resolveSlotInputs(g, mameSrc, slashIncludes, machineConfigs);

  // --- gfx ---
  // MAME exposes standard layouts from emu/video/generic.cpp via extern
  // declarations. Include that source-owned table so driver graphs retain
  // the concrete layout instead of an unresolved symbol.
  const genericGfxFile = join(mameSrc, 'src/emu/video/generic.cpp');
  const gfxLayoutSource = existsSync(genericGfxFile)
    ? `${combined}\n${stripComments(readFileSync(genericGfxFile, 'utf8'))}`
    : combined;
  for (const layout of parseGfxLayouts(gfxLayoutSource)) {
    g.node('GfxLayout', `gfxlayout:${layout.name}`, {
      name: layout.name, width: layout.width, height: layout.height,
      total: layout.total, planes: layout.planes,
      planeOffsets: layout.planeOffsets, xOffsets: layout.xOffsets, yOffsets: layout.yOffsets,
      charIncrement: layout.charIncrement,
    });
    g.edge(`gfxlayout:${layout.name}`, fileId, 'DEFINED_IN');
  }
  for (const dec of gfxDecodes) {
    const decId = `gfxdecode:${dec.name}`;
    const source = ast.findMacro('GFXDECODE_START', 0, dec.name)?.span;
    g.node('GfxDecode', decId, { name: dec.name, ...spanProps(source) });
    definedIn(decId, source);
    dec.entries.forEach((e, i) => {
      const eid = `${decId}/e${i}`;
      g.node('GfxDecodeEntry', eid, {
        region: e.region, offset: e.offset, layout: e.layout,
        colorBase: e.colorBase, colorCount: e.colorCount,
        ...(e.ram ? { ram: true } : {}),
        xscale: e.xscale, yscale: e.yscale,
      });
      g.edge(decId, eid, 'HAS_ENTRY');
      g.edge(eid, `gfxlayout:${e.layout}`, 'USES_LAYOUT');
    });
  }

  for (const handler of g.nodes.values()) {
    if (handler.label !== 'Handler') continue;
    annotateInputHandlerClosure(
      g,
      handler.id,
      ioportMembers,
      textMacros.strings,
    );
  }

  recordDeviceConfiguredScreen(g, mameSrc);
  recordPaletteInit(g, ast, consts, driverRel);
  annotateIndexedScreenUpdate(g, mameSrc);

  return g.toGraph({
    tool: 'mamekit',
    version: VERSION,
    schemaVersion: 2,
    mameSrc,
    driverFile: driverRel,
    generatedAt: new Date().toISOString(),
    ...(license ? { license } : {}),
    ...(copyrightHolders ? { copyrightHolders } : {}),
  });
}

/** Evaluate MAME DERIVED_CLOCK numerator/denominator expressions. */
export function derivedDeviceClock(
  expression: string | undefined,
  parentClock: number,
  constants: Record<string, number> = {},
): number | undefined {
  const match = expression && /^DERIVED_CLOCK\(\s*([^,]+)\s*,\s*([^)]+)\s*\)$/.exec(expression);
  if (!match) return undefined;
  const numerator = evalExpr(match[1]!, constants);
  const denominator = evalExpr(match[2]!, constants);
  return numerator !== null && denominator !== null && denominator !== 0
    ? parentClock * numerator / denominator
    : undefined;
}

/** Resolve a MAME lifecycle override in base-first execution order. */
export function resolveMachineLifecycle(
  ast: MameAstIndex,
  className: string,
  machineName: string,
  kind: 'start' | 'reset',
): MameFunction[] {
  const root = ast.findFunctionInHierarchy(
    className,
    `machine_${kind}_${machineName}`,
  ) ?? ast.findFunctionInHierarchy(className, `machine_${kind}`);
  if (!root) return [];

  const ordered: MameFunction[] = [];
  const visited = new Set<string>();
  const visit = (fn: MameFunction): void => {
    const key = `${fn.className}.${fn.name}`;
    if (visited.has(key)) return;
    visited.add(key);
    const unit = ast.ast.units.find(candidate =>
      candidate.file === fn.bodySpan.file);
    const rawBody = unit?.source.slice(fn.bodySpan.start, fn.bodySpan.end) ?? '';
    // Modern drivers spell the inherited lifecycle call directly. Resolve the
    // declaring class exactly: hierarchy lookup from the derived class would
    // rediscover this override and silently omit the base setup.
    const qualifiedCallRe = new RegExp(
      `\\b([A-Za-z_]\\w*(?:::[A-Za-z_]\\w*)*)::machine_${kind}\\s*\\(`,
      'g',
    );
    for (const call of rawBody.matchAll(qualifiedCallRe)) {
      const owner = call[1]!.split('::').at(-1)!;
      const dependency = ast.findFunction(owner, `machine_${kind}`);
      if (dependency) visit(dependency);
    }
    const callRe = new RegExp(
      `\\bMACHINE_${kind.toUpperCase()}_CALL_MEMBER\\s*\\(\\s*(\\w+)\\s*\\)`,
      'g',
    );
    for (const call of rawBody.matchAll(callRe)) {
      const dependency = ast.findFunctionInHierarchy(
        fn.className,
        `machine_${kind}_${call[1]}`,
      );
      if (dependency) visit(dependency);
    }
    ordered.push(fn);
  };
  visit(root);
  return ordered;
}

function emitSourceTimerCallbacks(
  g: GraphBuilder,
  ast: MameAstIndex,
  constants: Record<string, number>,
  definedIn: (nodeId: string, source?: SourceSpan) => void,
): void {
  const functions = ast.ast.units.flatMap(unit => unit.functions);
  const allocations = functions.flatMap(fn =>
    [...fn.body.matchAll(
      /\b(m_\w+)\s*=\s*timer_alloc\s*\(\s*FUNC\(\s*(\w+)::(\w+)\s*\)/g,
    )].map(match => ({
      timer: match[1],
      ownerClass: match[2],
      method: match[3],
      startClass: fn.className,
      startMethod: fn.name,
    })),
  );

  for (const allocation of allocations) {
    const callback = ast.findFunctionInHierarchy(allocation.ownerClass, allocation.method);
    const reset = functions.find(fn =>
      /(?:machine_reset|reset)$/.test(fn.name) &&
      functionClosureContains(
        ast,
        fn,
        body => body.includes(`${allocation.timer}->adjust`),
      ));
    if (!callback || !reset) continue;
    const schedule = evaluateTimerSchedule(
      ast,
      callback,
      reset,
      allocation.timer,
      constants,
    );
    if (!schedule) continue;

    const callbackId = `callback:timer/${allocation.ownerClass}.${allocation.method}`;
    const props: Record<string, PropValue> = {
      ownerTag: allocation.timer.replace(/^m_/, ''),
      signal: 'timer',
      operation: 'adjust',
      targetClass: allocation.ownerClass,
      targetMethod: allocation.method,
      startClass: allocation.startClass,
      startMethod: allocation.startMethod,
      ...schedule,
      ...spanProps(callback.span),
    };
    g.node('Callback', callbackId, props);
    definedIn(callbackId, callback.span);
    const handlerId = emitSourceHandlerClosure(
      g,
      ast,
      allocation.ownerClass,
      allocation.method,
      constants,
      callback.span,
    );
    g.edge(callbackId, handlerId, 'CALLS_HANDLER');
  }
}

function functionClosureContains(
  ast: MameAstIndex,
  root: MameFunction,
  predicate: (body: string) => boolean,
): boolean {
  const pending = [root];
  const visited = new Set<string>();
  while (pending.length) {
    const fn = pending.shift()!;
    const key = `${fn.className}.${fn.name}`;
    if (visited.has(key)) continue;
    visited.add(key);
    if (predicate(fn.body)) return true;
    for (const statement of fn.statements) {
      for (const call of statement.calls) {
        const target = ast.findFunctionInHierarchy(fn.className, call.name);
        if (target) pending.push(target);
      }
    }
  }
  return false;
}

export interface SourceTimerSchedule {
  scanlines?: number[];
  scanlineStart?: number;
  scanlineIncrement?: number;
}

/**
 * Execute a source timer far enough to recover either its finite sequence or
 * a scanline cadence. The large synthetic screen height keeps callbacks that
 * wrap at screen().height() advancing while their increment is measured; the
 * real vtotal is applied later when the machine's frame events are emitted.
 */
export function evaluateTimerSchedule(
  ast: MameAstIndex,
  callback: MameFunction,
  reset: MameFunction,
  timer: string,
  constants: Record<string, number>,
): SourceTimerSchedule | undefined {
  const programs = new Map(
    ast.ast.units
      .flatMap(unit => unit.functions)
      .map(fn => [`${fn.className}.${fn.name}`, {
        fn,
        program: compileMameHandler(fn.body),
      }]),
  );
  let currentLine = 0;
  let adjustedLine: number | undefined;
  let adjustedParam = 0;
  const calls: Record<string, (...args: number[]) => unknown> = {
    'm_screen.vpos': () => currentLine,
    'm_screen.time_until_pos': line => line,
    'm_screen.height': () => 0x10000,
    'machine().time': () => 0,
    [`${timer}.adjust`]: (...args) => {
      adjustedLine = args[0];
      adjustedParam = args.length > 1 ? Number(args[1]) : 0;
    },
    'm_maincpu.set_input_line': () => 0,
    'm_subcpu2.pulse_input_line': () => 0,
  };
  const invoke = (className: string, name: string, args: number[]): number => {
    const entry = programs.get(`${className}.${name}`) ??
      (() => {
        const inherited = ast.findFunctionInHierarchy(className, name);
        return inherited ? programs.get(`${inherited.className}.${inherited.name}`) : undefined;
      })();
    if (!entry || entry.program.diagnostics.length) return 0;
    const names = entry.fn.parameters
      .split(',')
      .map(parameter => /(\w+)\s*$/.exec(parameter.trim())?.[1])
      .filter((name): name is string => Boolean(name));
    return executeGeneratedHandler(
      entry.program,
      bindings,
      Object.fromEntries(names.map((name, index) => [name, args[index] ?? 0])),
    ) ?? 0;
  };
  for (const { fn } of programs.values()) {
    calls[fn.name] ??= (...args) => invoke(callback.className, fn.name, args);
  }
  const bindings: GeneratedHandlerBindings = {
    constants,
    members: {
      m_int_enable: 1,
      m_sub2_nmi_mask: 0,
      ...Object.fromEntries(ast.ast.units.flatMap(unit =>
        [...unit.source.matchAll(
          /\b(?:static\s+)?const\s+(?:u?int(?:8|16|32)_t|u(?:8|16|32)|int)\s+(\w+)\s*\[[^\]]+\]\s*=\s*\{([^}]*)\}/g,
        )].map(match => [
          match[1]!,
          match[2]!.split(',').map(value => {
            const expression = value.trim();
            return evalExpr(expression, constants) ?? Number(expression);
          }),
        ]),
      )),
    },
    calls,
  };
  const resetProgram = compileMameHandler(reset.body);
  const callbackProgram = compileMameHandler(callback.body);
  if (resetProgram.diagnostics.length || callbackProgram.diagnostics.length) return undefined;

  try {
    executeGeneratedHandler(resetProgram, bindings);
  } catch {
    // Timer probing is best-effort static evaluation. A reset routine may
    // touch unrelated structs/devices that the probe intentionally does not
    // instantiate; retain the source callback and let runtime reporting name
    // the unresolved schedule instead of aborting graph extraction.
    return undefined;
  }
  if (!Number.isFinite(adjustedLine)) return undefined;
  currentLine = Math.trunc(adjustedLine!);
  let currentParam = adjustedParam;
  const lines: number[] = [];
  for (let iteration = 0; iteration < 32; iteration++) {
    if (lines.includes(currentLine)) return lines.length > 1 ? { scanlines: lines } : undefined;
    lines.push(currentLine);
    adjustedLine = undefined;
    try {
      executeGeneratedHandler(callbackProgram, bindings, { param: currentParam });
    } catch {
      return undefined;
    }
    if (!Number.isFinite(adjustedLine)) return undefined;
    currentLine = Math.trunc(adjustedLine!);
    currentParam = adjustedParam;
  }
  const increment = lines[1]! - lines[0]!;
  const linear = increment > 0 && lines.slice(2).every(
    (line, index) => line - lines[index + 1]! === increment,
  );
  if (linear && /->height\s*\(\s*\)/.test(callback.body)) {
    return { scanlineStart: lines[0]!, scanlineIncrement: increment };
  }
  return undefined;
}

export function evaluateTimerScanlines(
  ast: MameAstIndex,
  callback: MameFunction,
  reset: MameFunction,
  timer: string,
  constants: Record<string, number>,
): number[] {
  return evaluateTimerSchedule(ast, callback, reset, timer, constants)?.scanlines ?? [];
}

function emitInputPorts(
  g: GraphBuilder,
  inp: InputPortsDef,
  fileId: string,
  source?: SourceSpan,
  context?: {
    ast: MameAstIndex;
    constants: Record<string, number>;
    ioportMembers: Record<string, string[]>;
    stringConstants: Record<string, string>;
  },
): void {
  const inpId = `inputs:${inp.name}`;
  g.node('InputPorts', inpId, { name: inp.name, ...spanProps(source) });
  g.edge(inpId, fileId, 'DEFINED_IN', source ? spanProps(source) : undefined);
  for (const include of inp.includes ?? []) {
    g.edge(inpId, `inputs:${include}`, 'INCLUDES_PORTS');
  }
  const portOccurrences = new Map<string, number>();
  for (const port of inp.ports) {
    // A source block may PORT_START a tag and later PORT_MODIFY the same tag.
    // Keep both declarations as ordered graph facts so the generator can
    // apply the modifier mask-by-mask. Reusing the bare tag ID here caused
    // the modifier's f0/f1/... nodes to overwrite unrelated base controls.
    const occurrence = portOccurrences.get(port.tag) ?? 0;
    portOccurrences.set(port.tag, occurrence + 1);
    const portId = occurrence === 0
      ? `${inpId}/${port.tag}`
      : `${inpId}/${port.tag}#${occurrence}`;
    g.node('Port', portId, { tag: port.tag, modify: port.modify ?? false });
    g.edge(inpId, portId, 'HAS_PORT');
    port.fields.forEach((f, i) => {
      const fid = `${portId}/f${i}`;
      const props: Record<string, PropValue> = { kind: f.kind, mask: f.mask };
      if (f.activeLow !== undefined) props.activeLow = f.activeLow;
      if (f.type) props.type = f.type;
      if (f.modifiers) props.modifiers = f.modifiers;
      if (f.name) props.name = f.name;
      if (f.defaultValue !== undefined) props.defaultValue = f.defaultValue;
      if (f.location) props.location = f.location;
      if (f.config) props.config = true;
      if (f.settings?.length) {
        props.settings = f.settings.map(s => `${s.value}=${s.name}${s.condition ? ` [if ${s.condition}]` : ''}`);
      }
      g.node('PortField', fid, props);
      g.edge(portId, fid, 'HAS_FIELD');
      const custom = f.modifiers
        ?.map(modifier => /PORT_(?:CUSTOM_MEMBER|READ_LINE_MEMBER)\s*\(\s*FUNC\s*\(\s*(\w+)::(\w+)(?:\s*<\s*(\d+)\s*>)?\s*\)/.exec(modifier))
        .find((match): match is RegExpExecArray => Boolean(match));
      if (custom && context) {
        // MAME commonly binds a function-template specialization directly to
        // an input bit (for example zaxxon_coin_r<0>). Give each
        // specialization its own generated handler and make the template
        // argument available to the source compiler as a constant.
        const templateArgument = custom[3] === undefined ? undefined : Number(custom[3]);
        const method = templateArgument === undefined
          ? custom[2]!
          : `${custom[2]}_${templateArgument}`;
        const handlerId = emitSourceHandlerClosure(
          g,
          context.ast,
          custom[1]!,
          method,
          templateArgument === undefined
            ? context.constants
            : { ...context.constants, Num: templateArgument },
          source,
        );
        g.edge(fid, handlerId, 'CALLS_HANDLER');
        annotateInputHandlerClosure(g, handlerId, context.ioportMembers, context.stringConstants);
      }
    });
  }
}

export function parseIoportMembers(
  source: string,
  stringConstants: Record<string, string>,
): Record<string, string[]> {
  const sizes = new Map<string, number>();
  for (const match of source.matchAll(
    /\b(?:required|optional)_ioport(?:_array\s*<\s*(\d+)\s*>)?\s+(m_\w+)\s*;/g,
  )) {
    sizes.set(match[2]!, Number(match[1] ?? 1));
  }

  const members: Record<string, string[]> = {};
  for (const [member, size] of sizes) {
    const listed = new RegExp(
      `\\b${member}\\s*\\(\\s*\\*this\\s*,\\s*\\{([^}]*)\\}\\s*\\)`,
    ).exec(source);
    if (listed) {
      const tags = [...listed[1]!.matchAll(/"([^"]+)"/g)].map(match => match[1]!);
      if (tags.length === size) members[member] = tags;
      continue;
    }
    const initializer = new RegExp(
      `\\b${member}\\s*\\(\\s*\\*this\\s*,\\s*("[^"]+"|\\w+)` +
      `(?:\\s*,\\s*((?:\\d+)(?:ULL|UL|U)?|'[^']'))?\\s*\\)`,
    ).exec(source);
    if (!initializer) continue;
    const expression = initializer[1]!;
    const pattern = expression.startsWith('"')
      ? expression.slice(1, -1)
      : stringConstants[expression];
    if (!pattern) continue;
    const startToken = initializer[2] ?? '0';
    const start = startToken.startsWith("'")
      ? startToken.charCodeAt(1)
      : Number.parseInt(startToken, 10);
    members[member] = pattern.includes('%u')
      ? Array.from({ length: size }, (_, index) => pattern.replace('%u', String(start + index)))
      : pattern.includes('%c')
        ? Array.from(
            { length: size },
            (_, index) => pattern.replace('%c', String.fromCharCode(start + index)),
          )
        : [pattern];
  }
  return members;
}

function annotateInputHandlerClosure(
  g: GraphBuilder,
  root: string,
  ioportMembers: Record<string, string[]>,
  stringConstants: Record<string, string>,
): void {
  const pending = [root];
  const seen = new Set<string>();
  while (pending.length) {
    const id = pending.pop()!;
    if (seen.has(id)) continue;
    seen.add(id);
    const handler = g.nodes.get(id);
    if (handler?.label === 'Handler' && typeof handler.props.sourceBody === 'string') {
      let body = handler.props.sourceBody;
      for (const [name, value] of Object.entries(stringConstants)) {
        body = body.replace(new RegExp(`\\b${name}\\b`, 'g'), JSON.stringify(value));
      }
      handler.props.sourceBody = body;
      const inputs = Object.entries(ioportMembers)
        .filter(([member]) => new RegExp(`\\b${member}\\b`).test(body))
        .map(([member, tags]) => `${member}=${tags.join(',')}`);
      if (inputs.length) handler.props.inputMembers = inputs;
    }
    for (const edge of g.edges) {
      if (edge.from === id && edge.rel === 'CALLS_HANDLER') pending.push(edge.to);
    }
  }
}

/** MAME's inline device_delegate setter: set_<name>_callback / set_<name>_cb. */
const DELEGATE_SETTER_RE = /^set_\w+_(?:callback|cb)$/;

/** A device setter in MAME's forwarding-delegate idiom; see forwardingDelegateSetter. */
interface ForwardingDelegateSetter {
  /** The delegate the setter binds, and the expression that indexes it, if any. */
  member: string;
  index?: string;
  /** The setter's named parameters, in order; the forwarded pack follows them. */
  parameters: string[];
  /** Other members the setter assigns from its parameters. */
  assignments: { member: string; index?: string; value: string; size?: number }[];
  /** A delegate array's element count (`read8smo_delegate::array<5>`). */
  size?: number;
}

/**
 * A device setter written as MAME's forwarding-delegate idiom, from the
 * declaring class's own inline definition:
 *
 *   template <typename... T> void set_custom_input(int which, uint8_t mask, T &&... args)
 *   { m_custom_input_mask[which] = mask; m_custom_input[which].set(std::forward<T>(args)...); }
 *
 * Midway's SSIO wires Spy Hunter's wheel ADC, its sound board's status and
 * its lamp and sound-command port this way. The naming is free, so the shape
 * is matched rather than `set_*_callback`; unmatched, the whole call was
 * dropped and every one of those delegates answered nothing (#178).
 */
function forwardingDelegateSetter(ast: MameAstIndex, name: string): ForwardingDelegateSetter | undefined {
  const definition = new RegExp(
    `template\\s*<[^>]*>\\s*void\\s+${name}\\s*\\(([^)]*)\\)\\s*\\{([^{}]*)\\}`,
  );
  for (const declaration of ast.ast.units.flatMap(unit => unit.classes)) {
    const match = definition.exec(declaration.body);
    if (!match) continue;
    const body = match[2]!;
    const set = /\b(m_\w+)(?:\s*\[([^\]]+)\])?\s*\.\s*set\s*\(\s*std::forward\s*<\s*\w+\s*>\s*\(\s*\w+\s*\)\s*\.\.\.\s*\)/.exec(body);
    if (!set) continue;
    const named = splitMameArgs(match[1]!)
      .map(parameter => parameter.trim())
      .filter(parameter => parameter && !parameter.includes('...'));
    const parameters = named.map(parameter => /(\w+)\s*$/.exec(parameter)?.[1] ?? '');
    const size = (member: string) => {
      const declared = new RegExp(
        `(?:::array\\s*<\\s*(\\d+)\\s*>\\s+${member}\\b|\\b${member}\\s*\\[\\s*(\\d+)\\s*\\])`,
      ).exec(declaration.body);
      const count = Number(declared?.[1] ?? declared?.[2]);
      return Number.isInteger(count) && count > 0 ? count : undefined;
    };
    const assignments = [...body.matchAll(/\b(m_\w+)(?:\s*\[([^\]]+)\])?\s*=\s*([^;]+);/g)]
      .map(assignment => ({
        member: assignment[1]!,
        ...(assignment[2] ? { index: assignment[2].trim() } : {}),
        value: assignment[3]!.trim(),
        ...(size(assignment[1]!) ? { size: size(assignment[1]!) } : {}),
      }));
    return {
      member: set[1]!,
      ...(set[2] ? { index: set[2].trim() } : {}),
      parameters,
      assignments,
      ...(size(set[1]!) ? { size: size(set[1]!) } : {}),
    };
  }
  return undefined;
}

const CALLBACK_OPERATIONS = new Set([
  'set', 'append', 'set_ioport', 'set_inputline', 'append_inputline', 'set_nop',
  'set_screen_update', 'set_vblank_int', 'set_periodic_int',
  'set_irq_acknowledge_callback',
  'set_maincpu', 'configure_scanline',
  // A generic TIMER is armed by the driver rather than by a period, but the
  // method it names still has to be lowered: without this, Atari System 1's
  // int3_callback and int3off_callback were never compiled at all, so the
  // scanline-interrupt chain had nothing to run even once `adjust` existed.
  'configure_generic',
]);

/** Return the complete argument of attotime::from_hz, including nested parens. */
export function fromHzExpression(value: string): string | undefined {
  const marker = 'from_hz(';
  const start = value.indexOf(marker);
  if (start < 0) return undefined;
  let depth = 1;
  const expressionStart = start + marker.length;
  for (let index = expressionStart; index < value.length; index++) {
    if (value[index] === '(') depth++;
    else if (value[index] === ')' && --depth === 0) {
      return value.slice(expressionStart, index);
    }
  }
  return undefined;
}

/** Resolve the frequency represented by the common attotime constructors. */
export function attotimeFrequency(
  value: string,
  constants: Record<string, number> = {},
  deviceClock?: number,
): number | undefined {
  if (deviceClock !== undefined && Number.isFinite(deviceClock)) {
    value = value.replace(/\bclock\s*\(\s*\)/g, String(deviceClock));
  }
  const hzExpression = fromHzExpression(value);
  if (hzExpression) return evalExpr(hzExpression, constants) ?? undefined;
  const ticks = /\bfrom_ticks\s*\(\s*([^,]+)\s*,\s*([^)]+)\)/.exec(value);
  if (!ticks) return undefined;
  const count = evalExpr(ticks[1]!, constants);
  const clock = evalExpr(ticks[2]!, constants);
  return count !== null && count > 0 && clock !== null
    ? clock / count
    : undefined;
}

/**
 * Seconds from a MAME `attotime::from_*` expression.
 *
 * A devcb may append a scheduler request rather than an output: Gauntlet's
 * sound latch asks for `perfect_quantum(attotime::from_usec(100))` so the
 * sound board is given a real timeslice as soon as it has a command.
 */
export function attotimeSeconds(
  value: string,
  constants: Record<string, number> = {},
): number | undefined {
  const unit = /\bfrom_(usec|msec|nsec|seconds|ticks|hz)\s*\(/.exec(value)?.[1];
  if (!unit) return undefined;
  if (unit === 'hz' || unit === 'ticks') {
    const hz = attotimeFrequency(value, constants);
    return hz !== undefined && hz > 0 ? 1 / hz : undefined;
  }
  const argument = /\bfrom_\w+\s*\(([^)]*)\)/.exec(value)?.[1];
  const amount = argument === undefined ? null : evalExpr(argument, constants);
  if (amount === null) return undefined;
  const scale = unit === 'usec' ? 1e-6 : unit === 'msec' ? 1e-3 : unit === 'nsec' ? 1e-9 : 1;
  return amount * scale;
}

/**
 * The driver state class's own integer data members, with the widths MAME
 * declared them at.
 *
 * A board's state object is built from what its handlers write, so nothing
 * else records that `uint8_t m_gb_io[0x10]` is eight bits wide or that
 * `uint16_t m_divcount` wraps at 0x10000. Unbounded, the Game Boy's TIMECNT
 * counted past 255 and never came back to zero -- the single event that raises
 * its timer interrupt -- so every game whose music driver runs off that
 * interrupt played silence while its graphics ran perfectly.
 *
 * Integer members only. Anything the runtime binds to an object -- a device
 * finder, an ioport, a shared pointer -- is not a width and must keep whatever
 * the board put there.
 */
function driverStateMembers(
  ast: MameAstIndex,
  className: string,
): { name: string; bits: 1 | 8 | 16 | 32; signed?: boolean; arrayLength?: number; initial?: number }[] {
  const classes = new Map(
    ast.ast.units.flatMap(unit => unit.classes).map(entry => [entry.name, entry]),
  );
  const members: {
    name: string; bits: 1 | 8 | 16 | 32; signed?: boolean; arrayLength?: number; initial?: number;
  }[] = [];
  // A member the driver uses to carry an input line. MAME's own
  // `INPUT_LINE_NMI` is 64 and sits in a `uint8_t` happily -- Double Dragon
  // keeps `uint8_t m_sprite_irq = INPUT_LINE_NMI` and raises its sprite
  // processor through it -- but this compiler lowers the input-line constants
  // to negative tokens of its own, and narrowing one to eight bits turns the
  // NMI into ordinary line 255. Such a member carries no width until those
  // constants carry MAME's values.
  const lineCarriers = new Set(
    ast.ast.units.flatMap(unit => [
      ...unit.functions.flatMap(fn =>
        [...fn.body.matchAll(/\b(\w+)\s*=\s*INPUT_LINE_\w+/g)].map(match => match[1]!)),
      ...unit.classes.flatMap(entry =>
        [...entry.body.matchAll(/\b(\w+)\s*=\s*INPUT_LINE_\w+/g)].map(match => match[1]!)),
    ]),
  );
  // Base-first, so a derived class's redeclaration is the one that stands.
  for (const name of sourceClassHierarchy(ast, className).reverse()) {
    const declaration = classes.get(name);
    if (!declaration) continue;
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const initial = constructorInitialValues(name, declaration.body.replace(
      new RegExp(`\\b${escapedName}\\s*\\(`, 'g'), `${name}::${name}(`));
    for (const member of memberDeclarations(declaration)) {
      // A multi-dimensional member is left alone: its rows are objects, and
      // the width belongs to the innermost one.
      if (member.arrayShape) continue;
      // A `const` member is a compile-time constant resolved by name, not
      // board state, and giving it a zeroed slot would shadow that.
      if (/\bconst\b/.test(member.valueType)) continue;
      if (lineCarriers.has(member.name)) continue;
      const bits = integerBits(member.valueType);
      if (!bits) continue;
      const entry = {
        name: member.name,
        bits,
        ...(integerSigned(member.valueType) ? { signed: true } : {}),
        ...(member.arrayLength ? { arrayLength: member.arrayLength } : {}),
        ...(!member.arrayLength && initial[member.name] !== undefined
          ? { initial: initial[member.name] } : {}),
      };
      const existing = members.findIndex(candidate => candidate.name === member.name);
      if (existing >= 0) members[existing] = entry;
      else members.push(entry);
    }
  }
  return members;
}

/**
 * A device class and its MAME-declared base classes, most derived first.
 *
 * Only classes the parsed sources actually declare are listed; MAME's own
 * device_t roots are not part of any generated handler set.
 */
/**
 * Base classes of a card's hierarchy that its own units do not declare: the
 * bus interface a drive implements is declared with the bus
 * (`device_cbm_iec_interface` in cbmiec.h), and the parallel cable's with the
 * cable. Read from the headers the card's units include, beside the unit or
 * under src/devices, one level deep.
 */
function includedBaseDeclarations(
  mameSrc: string,
  files: readonly string[],
  declarations: readonly MameClass[],
): MameClass[] {
  const known = new Set(declarations.map(declaration => declaration.name));
  const wanted = new Set(declarations
    .flatMap(declaration => declaration.bases.map(base => base.split('::').at(-1)!))
    .filter(name => !known.has(name)));
  const found: MameClass[] = [];
  if (!wanted.size) return found;
  for (const file of files) {
    const path = join(mameSrc, file);
    if (!existsSync(path)) continue;
    for (const include of parseIncludes(readFileSync(path, 'utf8'))) {
      const header = [join(dirname(path), include), join(mameSrc, 'src/devices', include)]
        .find(candidate => existsSync(candidate));
      if (!header) continue;
      const unit = parseMameSource(header.slice(mameSrc.length + 1), stripComments(readFileSync(header, 'utf8')));
      for (const declaration of unit.classes) {
        if (wanted.has(declaration.name) && !found.some(entry => entry.name === declaration.name)) {
          found.push(declaration);
        }
      }
    }
  }
  return found;
}

function sourceClassHierarchy(ast: MameAstIndex, className: string): string[] {
  const classes = new Map(
    ast.ast.units.flatMap(unit => unit.classes).map(entry => [entry.name, entry]),
  );
  const result: string[] = [];
  const seen = new Set<string>();
  const visit = (name: string): void => {
    if (seen.has(name)) return;
    seen.add(name);
    const declaration = classes.get(name);
    if (!declaration) return;
    result.push(name);
    for (const base of declaration.bases) visit(base.split('::').at(-1)!);
  };
  visit(className);
  return result;
}

/**
 * Whether a device class is a MAME image device: some class in its hierarchy
 * derives from one of the `device_*image_interface`s (the Neo Geo memory card's
 * `device_memcard_image_interface`).
 */
function sourceImageInterface(ast: MameAstIndex, className: string): boolean {
  const classes = new Map(
    ast.ast.units.flatMap(unit => unit.classes).map(entry => [entry.name, entry]),
  );
  return sourceClassHierarchy(ast, className).some(name =>
    classes.get(name)?.bases.some(base => /^device_\w*image_interface$/.test(base.split('::').at(-1)!.trim())));
}

/**
 * A MAME method body that only computes and returns a value.
 *
 * Anything that assigns, increments or calls out is excluded: the generated
 * handlers share one member namespace, so a speculatively compiled mutator can
 * write a member another class owns.
 */
function isSourceAccessor(body: string): boolean {
  const statements = stripComments(body).trim();
  return /^return\b[^;]*;$/.test(statements) && !/[-+]{2}|[^=!<>]=[^=]/.test(statements);
}


/**
 * The devcb member a `auto <accessor>() { return m_x.bind(); }` hands out.
 *
 * MAME declares every devcb this way, so the accessor a machine
 * configuration calls and the member the device's own code calls are both in
 * the class declaration and need not share a name.
 */
function devcbAccessorMember(ast: MameAstIndex, accessor: string): string | undefined {
  // Both MAME spellings: a devcb hands out `m_x.bind()`, a device_delegate is
  // assigned through a forwarding setter that calls `m_x.set(...)`.
  const patterns = [
    new RegExp(
      `\\bauto\\s+${accessor}\\s*\\(\\s*\\)[^{;]*\\{\\s*return\\s+(m_\\w+)(?:\\[[^\\]]*\\])?\\.bind\\s*\\(`,
    ),
    new RegExp(
      `\\b${accessor}\\s*\\([^)]*\\)\\s*\\{\\s*(m_\\w+)(?:\\[[^\\]]*\\])?\\.set\\s*\\(`,
    ),
  ];
  for (const unit of ast.ast.units) {
    for (const declaration of unit.classes) {
      for (const pattern of patterns) {
        const found = pattern.exec(declaration.body ?? '');
        if (found) return found[1];
      }
    }
  }
  return undefined;
}

function emitCallbacks(
  g: GraphBuilder,
  ast: MameAstIndex,
  cfgFunction: MameFunction | undefined,
  devId: string,
  deviceTag: string,
  config: string[],
  memberTags: Record<string, string>,
  constants: Record<string, number>,
  /** What `clock()` resolves to in this config: the configured device's clock. */
  configClock?: number,
): void {
  let callbackIndex = 0;
  const configPrefix = devId.slice(0, devId.lastIndexOf('/') + 1);
  const findConfigDevice = (tag: string) => [...g.nodes.values()].find(node =>
    node.label === 'Device' &&
    node.id.startsWith(configPrefix) &&
    String(node.props.tag) === tag,
  );
  for (const raw of config) {
    const statement = ast.findStatement(raw, cfgFunction);
    const source = statement?.span;
    const calls = statement?.calls ?? parseCallChain(
      source?.file ?? 'unknown', raw, source?.start ?? 0,
    );
    const operationIndex = calls.findIndex(call =>
      (
        CALLBACK_OPERATIONS.has(call.name) ||
        // A device_delegate is configured through an inline forwarding setter
        // rather than a devcb chain: TECMO_SPRITE's sprite priority arrives as
        // m_sprgen->set_pri_callback(FUNC(tecmo_state::pri_cb)). The naming is
        // a MAME-wide convention, so match the shape, not the device.
        (DELEGATE_SETTER_RE.test(call.name) &&
          call.args.some(arg => /FUNC\s*\(/.test(arg))) ||
        (call.args.some(arg => /FUNC\s*\(/.test(arg)) &&
          forwardingDelegateSetter(ast, call.name) !== undefined)
      ) &&
      (call.name !== 'set' || call.args.some(arg => /FUNC\s*\(|INPUT_LINE_/.test(arg))),
    );
    if (operationIndex < 0) continue;

    const operation = calls[operationIndex];
    const chainedBinding = new Set([
      'set',
      'append',
      'set_ioport',
      'set_inputline',
      'append_inputline',
      'set_nop',
    ]).has(operation.name);
    const signal = chainedBinding && operationIndex > 0
      ? calls[operationIndex - 1]
      : operation;
    const transforms = calls.slice(operationIndex + 1).map(call =>
      `${call.name}${call.args.length ? `(${call.args.join(', ')})` : ''}`,
    );
    const callbackOwner = deviceTag.replace(/[^A-Za-z0-9_]+/g, '_');
    const callbackId = `${devId}/callback:${callbackOwner}:${callbackIndex++}`;
    // The devcb member behind this accessor, from the owning device class's
    // own declaration. MAME usually names the accessor after the member
    // (`busack_cb()` over `m_busack_cb`), and the runtime's `m_<signal>`
    // guess works whenever it does -- but it need not: toaplan_dsp_device
    // spells `auto halt_callback() { return m_halt_cb.bind(); }`, so
    // `m_halt_cb(ASSERT_LINE)` in its own handler resolved to nothing and the
    // host CPU was never halted. Record the real member instead of guessing.
    const devcbMember = devcbAccessorMember(ast, signal.name);
    const props: Record<string, PropValue> = {
      signal: signal.name,
      ...(devcbMember && devcbMember !== `m_${signal.name}` ? { member: devcbMember } : {}),
      // A device_delegate setter is machine configuration, not a devcb the
      // board dispatches at runtime: the device calls the delegate itself.
      ...(DELEGATE_SETTER_RE.test(operation.name) &&
        !CALLBACK_OPERATIONS.has(operation.name)
        ? { delegate: 1 }
        : {}),
      // A devcb whose appended lambda only asks the scheduler for a finer
      // interleave is a scheduling fact, not an unconnected output.
      operation: operation.name === 'append' && raw.includes('perfect_quantum(')
        ? 'perfect_quantum'
        : operation.name,
      raw,
      ownerTag: deviceTag,
      ...spanProps(source),
    };
    if (props.operation === 'perfect_quantum') {
      const request = /perfect_quantum\s*\(([^;]*?)\)\s*;/.exec(raw)?.[1];
      const seconds = request ? attotimeSeconds(request, constants) : undefined;
      if (seconds === undefined) {
        throw new Error(
          `${source?.file ?? 'unknown'}: perfect_quantum request "${raw}" has no duration`,
        );
      }
      props.quantumSeconds = seconds;
    }
    if (signal.templateArgs.length) props.slot = signal.templateArgs.join(',');
    const forwarding = !CALLBACK_OPERATIONS.has(operation.name) && !DELEGATE_SETTER_RE.test(operation.name)
      ? forwardingDelegateSetter(ast, operation.name)
      : undefined;
    if (forwarding) {
      // The setter's parameters take the call's leading arguments; whatever
      // they index or assign is evaluated with those values.
      const values: Record<string, number> = { ...constants };
      forwarding.parameters.forEach((parameter, position) => {
        const value = evalExpr(operation.args[position] ?? '', constants);
        if (parameter && value !== null) values[parameter] = value;
      });
      props.delegate = 1;
      props.member = forwarding.member;
      if (forwarding.index !== undefined) {
        const slot = evalExpr(forwarding.index, values);
        if (slot === null) throw new Error(`${source?.file ?? 'unknown'}: cannot index ${forwarding.member} in "${raw}"`);
        props.slot = slot;
      }
      if (forwarding.size !== undefined) props.slots = forwarding.size;
      const memberValues = forwarding.assignments.map(assignment => {
        const value = evalExpr(assignment.value, values);
        const index = assignment.index === undefined ? undefined : evalExpr(assignment.index, values);
        if (value === null || index === null) {
          throw new Error(`${source?.file ?? 'unknown'}: cannot evaluate ${assignment.member} in "${raw}"`);
        }
        return { member: assignment.member, ...(index !== undefined ? { index } : {}), value,
          ...(assignment.size !== undefined ? { size: assignment.size } : {}) };
      });
      if (memberValues.length) props.memberValues = JSON.stringify(memberValues);
    }
    if (transforms.length) props.transforms = transforms;
    if (operation.name === 'set_periodic_int') {
      const periodArg = operation.args.find(arg => arg.includes('from_'))
        ?? operation.args.at(-1);
      const localPeriod = periodArg && /^\w+$/.test(periodArg.trim())
        ? new RegExp(
            `\\b(?:const\\s+)?attotime\\s+${periodArg.trim()}\\s*=\\s*([^;]+);`,
          ).exec(cfgFunction?.body ?? '')?.[1]
        : undefined;
      const period = localPeriod ?? periodArg;
      const hz = period ? attotimeFrequency(period, constants, configClock) : undefined;
      if (hz !== undefined) props.periodHz = hz;
      if (period) props.periodExpr = period;
    }
    if (operation.name === 'configure_scanline') {
      props.signal = 'configure_scanline';
      const start = evalExpr(operation.args[2] ?? '', constants);
      const increment = evalExpr(operation.args[3] ?? '', constants);
      if (start !== null) props.scanlineStart = start;
      if (increment !== null) props.scanlineIncrement = increment;
    }

    const funcArg = operation.args.find(arg => arg.includes('FUNC('));
    const func = funcArg
      ? /FUNC\(\s*(?:(\w+)::)?(\w+(?:<[^>]+>)?)\s*\)/.exec(funcArg)
      : null;
    const quotedTarget = operation.name === 'configure_scanline'
      ? undefined
      : operation.args
        .map(arg => /^"([^"]+)"$/.exec(arg.trim())?.[1])
        .find((value): value is string => value !== undefined);
    if (quotedTarget) props.targetTag = quotedTarget;
    if (operation.name === 'set_ioport' && quotedTarget) props.targetPort = quotedTarget;
    if (operation.name.includes('inputline')) {
      const line = operation.args.find(arg => {
        const value = arg.trim();
        if (['ASSERT_LINE', 'CLEAR_LINE', 'HOLD_LINE', 'PULSE_LINE'].includes(value)) return false;
        return /^(?:INPUT_LINE_[A-Z0-9_]+|M68K_IRQ_[1-7]|[A-Z][A-Z0-9_]*_INPUT_(?:LINE_)?[A-Z0-9_]+|[A-Z][A-Z0-9_]*(?:IRQ\d*|FIRQ\d*|NMI|RESET)_LINE|\w+::(?:IRQ\d*|FIRQ\d*|NMI|RESET)_LINE|\d+)$/.test(value);
      });
      if (line) props.inputLine = line.trim();
    }
    if (operation.name === 'set_maincpu') {
      props.signal = 'nmi';
      props.inputLine = 'INPUT_LINE_NMI';
    }
    if (func) {
      props.targetClass = func[1] ?? '';
      props.targetMethod = normalizeTemplatedMethod(func[2]);
    }

    g.node('Callback', callbackId, props);
    g.edge(devId, callbackId, 'HAS_CALLBACK');

    if (func) {
      const owner = func[1] ?? '';
      const method = func[2].replace(/<([^>]+)>/, (_match, argument: string) =>
        `_${argument.replace(/[^A-Za-z0-9_]+/g, '_')}`);
      const handlerId = emitSourceHandlerClosure(
        g,
        ast,
        owner || 'driver',
        method,
        constants,
        source,
      );
      g.edge(callbackId, handlerId, 'CALLS_HANDLER');
    }

    if (quotedTarget) {
      const target = findConfigDevice(quotedTarget);
      if (target) g.edge(callbackId, target.id, 'TARGETS_DEVICE');
    } else {
      // A delegate's object is passed by reference: `*m_adc, FUNC(adc0804_device::read)`.
      const targetArg = operation.args.find(arg =>
        memberTags[arg.trim().replace(/^\*\s*/, '')] !== undefined);
      const targetTag = targetArg ? memberTags[targetArg.trim().replace(/^\*\s*/, '')] : undefined;
      if (targetTag) {
        props.targetTag = targetTag;
        const target = findConfigDevice(targetTag);
        if (target) g.edge(callbackId, target.id, 'TARGETS_DEVICE');
      }
    }
  }
}

/** A `static const`/`constexpr` array's values, when every entry is a constant. */
function staticTableValues(source: string, name: string, consts: Record<string, number>): number[] | undefined {
  const declaration = new RegExp(
    `\\bstatic\\s+(?:(?:const|constexpr|inline)\\s+)+[\\w:]+\\s+${name}\\s*\\[[^\\]]*\\]\\s*=\\s*\\{([^{}]*)\\}`,
  ).exec(source);
  if (!declaration) return undefined;
  const values = splitMameArgs(declaration[1]!).map(value => value.trim()).filter(Boolean)
    .map(value => evalExpr(value.replace(/(\d)f$/i, '$1'), consts));
  return values.length && values.every((value): value is number => value !== null) ? values : undefined;
}

function handlerProps(
  ast: MameAstIndex,
  ownerClass: string,
  method: string,
  constants: Record<string, number>,
  fallbackSource?: SourceSpan,
  inline?: { inlineParameters?: string; inlineBody?: string },
): Record<string, PropValue> {
  // A numeric suffix is our encoding for a bound function-template argument,
  // but it can also be part of a literal MAME method name (clock_14024). An
  // exact definition must therefore win before attempting specialization.
  const exactFunction = ast.findFunctionInHierarchy(ownerClass, method);
  const sourceName = exactFunction ? method : method.replace(/_-?\d+$/, '');
  const fn = exactFunction ?? ast.findFunctionInHierarchy(ownerClass, sourceName);
  let body = inline?.inlineBody ?? fn?.body;
  if (body && fn) {
    const source = ast.ast.units.map(unit => unit.source).join('\n');
    // A driver names its board's registers the way the schematic does:
    // `#define JOYPAD m_gb_io[0x00]`, and thereafter `JOYPAD = 0xCF | data;`.
    // The name stands for nothing but the subscript, so it has to become the
    // subscript before lowering -- unexpanded, the Game Boy's joypad register
    // was never written and every button read as held down.
    body = expandMemberAliasMacros(body, [...collectMemberAliasMacros(source), ...collectBitAliasMacros(source)]);
    for (const table of source.matchAll(
      /\bstatic\s+(?:(?:const|constexpr)\s+)+([\w:]+)\s+(\w+)\s*\[[^\]]*\]\s*=\s*\{((?:[^{}]|\{[^{}]*\})*?)\}\s*;/g,
    )) {
      const [, valueType, name, declared] = table;
      if (!new RegExp(`\\b${name}\\s*\\[`).test(body)) continue;
      // MAME annotates its tables, and comments out alternatives it kept:
      // `palette_gb` carries a whole disused black-and-white palette inside
      // `/* ... */`. Read as data those numbers become the table.
      const entries = declared!.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
      // A table of colours is written as braced triples: `static constexpr
      // rgb_t palette_gb[] = { { 0xff,0xfb,0x87 }, ... }`. Read as a flat
      // list it matched nothing at all, so a machine that sets its palette
      // from one got four zero pens -- a picture drawn entirely in
      // transparent black.
      const values = valueType === 'rgb_t' && /^\s*\{/.test(entries)
        ? [...entries.matchAll(/\{([^{}]*)\}/g)].map(entry => {
            const [red, green, blue] = splitMameArgs(entry[1]!)
              .map(component => Number(evalExpr(component.trim(), constants) ?? 0));
            return String(
              ((0xff << 24) | ((blue ?? 0) << 16) | ((green ?? 0) << 8) | (red ?? 0)) >>> 0,
            );
          })
        : splitMameArgs(entries).map(value => value.trim());
      if (body.includes(table[0])) body = body.replace(table[0], '');
      body = body.replace(
        new RegExp(`\\b${name}\\s*\\[([^\\]]+)\\]`, 'g'),
        (_entry, index: string) => `TABLE(${index}, ${values.join(', ')})`,
      );
    }
  }
  const identifiers = new Set(body?.match(/\b[A-Za-z_]\w*\b/g) ?? []);
  const specializedConstants: Record<string, number> = {};
  const specialization = /_(-?\d+(?:_-?\d+)*)$/.exec(method);
  if (fn && specialization) {
    const unit = ast.ast.units.find(candidate => candidate.file === fn.span.file);
    const prefix = unit?.source.slice(Math.max(0, fn.span.start - 256), fn.span.start) ?? '';
    // The whole parameter list, not just a lone parameter: MAME writes the
    // Williams sound-command callback as
    // `template <unsigned A, unsigned... B>`, and a pattern that only matched
    // a single parameter left `A` unresolved, so the specialized handler
    // addressed `m_pia[A]` and reached no PIA at all. A pack contributes no
    // parameter, which is what an empty pack is.
    // The AST read the header wherever it sits; `template <u8 Bank> u8
    // spectrum_128_state::spectrum_128_ram_r(...)` keeps it on the function's
    // own line, inside the span, where the prefix below never sees it.
    const declaration = /template\s*<([^<>]*)>\s*$/.exec(prefix);
    const names = !declaration && fn.templateParameters?.length ? fn.templateParameters : splitMameArgs(declaration?.[1] ?? '').flatMap(parameter => {
      const text = parameter.trim();
      if (!text || text.includes('...')) return [];
      const name = /([A-Za-z_]\w*)\s*(?:=.*)?$/.exec(text)?.[1];
      return name ? [name] : [];
    });
    const values = specialization[1]!.split('_').map(Number);
    for (const [index, name] of names.entries()) {
      const value = values[index];
      if (value !== undefined && Number.isInteger(value) && identifiers.has(name)) {
        specializedConstants[name] = value;
      }
    }
  }
  const available = { ...constants, ...specializedConstants };
  // A class-scoped constant is written qualified where it is used and
  // unqualified where it is declared: atarimo.h declares PRIORITY_MASK inside
  // atari_motion_objects_device, and Atari's screen update names it
  // `atari_motion_objects_device::PRIORITY_MASK`. Carry the value under the
  // spelling the body actually uses, or the emitter falls back to a member
  // lookup and writes `members.atari_motion_objects_device::PRIORITY_MASK`,
  // which is not even valid JavaScript.
  // A framework enum keeps its own value: `machine_phase::RUNNING` is 3, not
  // the 64H156's `RUNNING` live state, and taking the leaf made the 1541's
  // motor and stepper writes return before they did anything.
  const qualified = (body?.match(/\b[A-Za-z_]\w*::[A-Za-z_]\w*\b/g) ?? [])
    .flatMap(name => {
      const tail = name.slice(name.indexOf('::') + 2);
      const value = available[name] ?? DEFAULT_CONSTANTS[name] ?? available[tail];
      // A carried constant is JSON: `attotime::never` (Infinity) would come
      // back as null. The runtime spells those itself.
      return value !== undefined && Number.isFinite(value) ? [[name, value] as const] : [];
    });
  const sourceConstants = [
    ...Object.entries(available).filter(([name]) => identifiers.has(name)),
    ...qualified,
  ].map(([name, value]) => `${name}=${value}`);
  return {
    method,
    ownerClass,
    ...spanProps(fn?.span ?? fallbackSource),
    ...(sourceConstants.length ? { sourceConstants } : {}),
    ...(inline?.inlineBody !== undefined ? {
      sourceParameters: inline.inlineParameters ?? '',
      sourceBody: body ?? inline.inlineBody,
      inline: true,
    } : fn ? {
      sourceParameters: fn.parameters.trim(),
      sourceBody: body!.trim(),
      ...(fn.returnType ? { sourceReturnType: fn.returnType } : {}),
    } : {}),
  };
}

/**
 * The machine-config setters a device's own constructor runs on the arguments
 * it was added with. MAME's quickload is added as
 * `QUICKLOAD(config, "quickload", "p00,prg,t64", CBM_QUICKLOAD_DELAY)`, and the
 * constructor overload those arguments select is two setters:
 * `set_extensions(extensions); set_delay(delay);` (snapquik.h). Only an
 * overload whose body is nothing but setters of its own parameters is read,
 * and a duration is an attotime, which a generated device holds as seconds.
 * `clockConsumed` says a setter took the third argument, the one that is
 * otherwise the clock.
 */
/** The name a slot's templated constructor gives the argument after `owner`. */
function slotThirdArgument(className: string, sources: readonly string[]): string | undefined {
  for (const source of sources) {
    const constructor = new RegExp(
      `\\b${className}\\s*\\(\\s*(?:const\\s+)?machine_config\\s+(?:const\\s+)?&\\s*\\w+\\s*,[^,]*,[^,]*,\\s*[\\w\\s]+?\\b(\\w+)\\s*,\\s*T\\s*&&`,
    ).exec(source);
    if (constructor) return constructor[1];
  }
  return undefined;
}

export function constructorConfigCalls(
  addStatement: string,
  className: string,
  sources: readonly string[],
  constants: Record<string, number>,
): { calls: string[]; clockConsumed: boolean } {
  const none = { calls: [], clockConsumed: false };
  // `TYPE(config, ...)`, or the same wrapped to keep a reference:
  // `snapshot_image_device &snapshot(SNAPSHOT(config, "snapshot", "sna,z80"))`.
  const added = /^\s*\w+\s*\(/.exec(addStatement) ?? /\b[A-Z][A-Z0-9_]*\s*\(\s*config\b/.exec(addStatement);
  if (!added) return none;
  const open = addStatement.indexOf('(', added.index);
  let depth = 0;
  let close = -1;
  for (let index = open; index < addStatement.length; index++) {
    if (addStatement[index] === '(') depth++;
    else if (addStatement[index] === ')' && --depth === 0) { close = index; break; }
  }
  if (close < 0) return none;
  const extra = splitMameArgs(addStatement.slice(open + 1, close)).slice(2);
  if (!extra.length) return none;
  for (const source of sources) {
    const declared = new RegExp(`\\bclass\\s+${className}\\b[^;{]*\\{`).exec(source);
    if (!declared) continue;
    const body = source.slice(declared.index + declared[0].length);
    for (const constructor of body.matchAll(new RegExp(`\\b${className}\\s*\\(`, 'g'))) {
      const start = constructor.index + constructor[0].length;
      let level = 1;
      let end = start;
      for (; end < body.length && level; end++) {
        if (body[end] === '(') level++;
        else if (body[end] === ')') level--;
      }
      const parameters = splitMameArgs(body.slice(start, end - 1));
      if (parameters.length < 3 + extra.length) continue;
      // `const char *tag` or `char const *tag`: MAME spells it both ways.
      if (!/machine_config/.test(parameters[0] ?? '') || !/\bchar\b[\w\s]*\*/.test(parameters[1] ?? '') ||
        !/device_t\s*\*/.test(parameters[2] ?? '')) continue;
      const after = /^\s*(?::[^{;]*)?\{([^{}]*)\}/.exec(body.slice(end));
      if (!after) continue;
      const statements = after[1]!.split(';').map(statement => statement.trim()).filter(Boolean);
      const names = parameters.slice(3).map(parameter => /(\w+)\s*(?:=.*)?$/.exec(parameter)?.[1]);
      // The setters of the constructor's own parameters. Anything else it
      // does -- the IEC slot's `set_options(std::forward<T>(opts), dflt,
      // false)` -- is configuration this graph records another way.
      // A slot's default option is the graph's `slotDefault` already.
      const setters = statements.map(statement => /^(\w+)\s*\(\s*(\w+)\s*\)$/.exec(statement))
        .filter((setter): setter is RegExpExecArray => Boolean(setter && names.includes(setter[2]) &&
          setter[1] !== 'set_default_option' && setter[1] !== 'set_fixed'));
      if (!setters.length) continue;
      const calls = setters.flatMap(setter => {
        const position = names.indexOf(setter[2]);
        const argument = extra[position];
        if (argument === undefined) return [];
        const value = configArgument(argument, sources, constants);
        return value === undefined ? [] : [`${setter[1]}(${value})`];
      });
      return { calls, clockConsumed: setters.some(setter => names.indexOf(setter[2]) === 0) };
    }
  }
  return none;
}

/** A config argument as a setter takes it: a string literal, or a number (an attotime as seconds). */
function configArgument(text: string, sources: readonly string[], constants: Record<string, number>): string | undefined {
  let value = text.trim();
  if (/^"[^"]*"$/.test(value)) return value;
  // Object-like defines, a level or two deep: CBM_QUICKLOAD_DELAY is
  // `(attotime::from_seconds(3))`.
  for (let pass = 0; pass < 3; pass++) {
    const name = /^\(?\s*([A-Z_][A-Z0-9_]*)\s*\)?$/.exec(value)?.[1];
    if (!name) break;
    const defined = sources.map(source => new RegExp(`^[ \\t]*#define\\s+${name}\\s+(.+)$`, 'm').exec(source)?.[1])
      .find(Boolean);
    if (!defined) break;
    value = defined.trim();
  }
  const seconds = value
    .replace(/attotime::zero/g, '0')
    .replace(/attotime::from_seconds\s*\(([^()]*)\)/g, '($1)')
    .replace(/attotime::from_msec\s*\(([^()]*)\)/g, '(($1)/1000)')
    .replace(/attotime::from_usec\s*\(([^()]*)\)/g, '(($1)/1000000)')
    .replace(/attotime::from_nsec\s*\(([^()]*)\)/g, '(($1)/1000000000)')
    .replace(/attotime::from_hz\s*\(([^()]*)\)/g, '(1/($1))');
  const number = evalExpr(seconds, constants);
  return number === null ? undefined : String(number);
}

function emitSourceHandlerClosure(
  g: GraphBuilder,
  ast: MameAstIndex,
  ownerClass: string,
  method: string,
  constants: Record<string, number>,
  fallbackSource?: SourceSpan,
  visited = new Set<string>(),
): string {
  const exactFunction = ast.findFunctionInHierarchy(ownerClass, method);
  const sourceName = exactFunction ? method : method.replace(/_-?\d+$/, '');
  const fn = exactFunction ?? ast.findFunctionInHierarchy(ownerClass, sourceName);
  const handlerId = `handler:${ownerClass}.${method}`;
  if (visited.has(handlerId)) return handlerId;
  visited.add(handlerId);
  g.node('Handler', handlerId, handlerProps(
    ast,
    ownerClass,
    method,
    constants,
    fallbackSource,
  ));
  if (!fn) return handlerId;

  // Virtual dispatch: a driver class further down the chain may redefine this
  // method, and it is the GAME macro's class -- not the class this call is
  // written in -- that picks the implementation. Record every candidate here;
  // gameSubgraph resolves the one the selected machine actually runs.
  for (const override of ast.overridesOf(fn.className, fn.name)) {
    const overrideId = emitSourceHandlerClosure(
      g,
      ast,
      override.className,
      override.name,
      constants,
      override.span,
      visited,
    );
    g.edge(handlerId, overrideId, 'OVERRIDDEN_BY', { class: override.className });
  }

  const callNames = new Set(
    fn.statements.flatMap(statement => statement.calls).map(call => call.name),
  );
  // The statement index records calls on the statement itself, but nested
  // switch/if bodies can contain source helpers that are not surfaced there.
  // Those helpers are still part of the executable closure (Neo Geo's
  // video_register_w -> acknowledge_interrupt path is one example). Scan
  // unqualified call syntax as a conservative supplement; AST lookup below
  // rejects keywords, macros and unrelated functions.
  // Reads through a device finder (`m_mcuintf->host_semaphore_r()`) that the
  // statement index missed. Arkanoid's semaphore field reads two of them and
  // only the second was ever compiled, so the host half silently answered zero
  // for the whole boot handshake. Only side-effect-free accessors are followed
  // here: every generated handler shares one member namespace, so compiling a
  // mutating device method this speculatively can overwrite a driver share of
  // the same name (atari_motion_objects_device::set_xscroll and Gauntlet's
  // m_xscroll are the pair that proved it).
  const accessorNames = new Set<string>();
  for (const match of fn.body.matchAll(/\b([A-Za-z_]\w*)\s*(?:<[^;{}()]+>)?\s*\(/g)) {
    const before = match.index ? fn.body[match.index - 1] : '';
    if (before === '.' || before === '>' || before === ':') {
      if (before === '>' && match.index > 1 && fn.body[match.index - 2] === '-') {
        accessorNames.add(match[1]!);
      }
      continue;
    }
    callNames.add(match[1]!);
  }
  // An explicit base call -- `base_state::machine_reset()` -- names the exact
  // implementation to run, so virtual dispatch never reaches it and the scan
  // above skips it (the `::` lands on the `before === ':'` guard). Left out,
  // the base method is never lowered at all: the Game Boy's divider and serial
  // power-on values were never assigned, so `m_shift` stayed undefined and
  // `m_divcount` ran away from its first frame.
  for (const match of fn.body.matchAll(/\b(\w+)::(\w+)\s*\(/g)) {
    const [, baseClass, baseMethod] = match;
    const base = ast.findFunction(baseClass!, baseMethod!);
    if (!base || base === fn) continue;
    const baseId = emitSourceHandlerClosure(
      g,
      ast,
      base.className,
      base.name,
      constants,
      base.span,
      visited,
    );
    g.edge(handlerId, baseId, 'CALLS_HANDLER');
  }
  // A call through a typed finder into a board device defined in the driver
  // tree (`m_adpcm_sound->write(data)`, required_device<williams_adpcm_sound_device>)
  // names exactly one method, so it is followed even when it mutates: without
  // it, Mortal Kombat's sound board never received a command. Framework and
  // src/devices classes are generated devices or MAME services, and stay out.
  for (const match of fn.body.matchAll(/\b(m_\w+)\s*->\s*(\w+)\s*\(/g)) {
    const [, member, callName] = match;
    const finderClass = ast.finderClass(fn.className, member!);
    if (!finderClass) continue;
    // Only a composed board device with its own processor, whose handlers the
    // board already lowers because that processor maps them. A custom sound
    // device a family runtime serves (berzerk's exidy_sound_device) binds
    // these calls itself, and lowering its methods here displaced that binding.
    const mconfig = ast.findFunctionInHierarchy(finderClass, 'device_add_mconfig');
    if (!mconfig || !/\bset_addrmap\s*\(\s*AS_PROGRAM\b/.test(mconfig.body)) continue;
    const target = ast.findFunctionInHierarchy(finderClass, callName!);
    if (!target || target === fn || !target.span.file.startsWith('src/mame/')) continue;
    const targetId = emitSourceHandlerClosure(
      g,
      ast,
      target.className,
      target.name,
      constants,
      target.span,
      visited,
    );
    g.edge(handlerId, targetId, 'CALLS_HANDLER', { finder: `${member}.${callName}` });
  }
  // A free function passed as a value -- a function pointer, which MAME's
  // CBM quickload takes for the routine that sets BASIC's end pointers
  // (`general_cbm_loadsnap(image, space, 0, cbm_quick_sethiaddress)`) -- is
  // as much a dependency as one that is called.
  for (const match of fn.body.matchAll(/[(,]\s*([A-Za-z_]\w*)\s*(?=[,)])/g)) {
    const named = ast.findUniqueFunction(match[1]!);
    if (named && named.className === '') callNames.add(match[1]!);
  }
  for (const callName of accessorNames) {
    if (callNames.has(callName)) continue;
    const accessor = ast.findFunctionInHierarchy(fn.className, callName)
      ?? ast.findUniqueFunction(callName);
    if (accessor && isSourceAccessor(accessor.body)) callNames.add(callName);
  }
  for (const callName of callNames) {
    // Calls through a required_device member may enter a composed device
    // class (tutankhm_state::sound_on_w ->
    // timeplt_audio_device::sh_irqtrigger_w). Preserve that source method when
    // its declaration is unambiguous; ordinary same-class calls still win.
    const dependency: MameFunction | undefined = ast.findFunctionInHierarchy(fn.className, callName)
      ?? ast.findUniqueFunction(callName);
    if (!dependency || dependency === fn) continue;
    const dependencyId = emitSourceHandlerClosure(
      g,
      ast,
      dependency.className,
      dependency.name,
      constants,
      dependency.span,
      visited,
    );
    g.edge(handlerId, dependencyId, 'CALLS_HANDLER');
  }
  // timer_expired_delegate and similar wrappers carry their callback as
  // FUNC(owner::method), not as an ordinary call in the statement AST.
  for (const reference of fn.body.matchAll(
    /\bFUNC\s*\(\s*(\w+)::(\w+(?:<\d+>)?)\s*\)/g,
  )) {
    const dependencyMethod = reference[2]!.replace(/<(\d+)>/, '_$1');
    const dependency = ast.findFunctionInHierarchy(
      reference[1]!,
      dependencyMethod.replace(/_\d+$/, ''),
    );
    if (!dependency || dependency === fn) continue;
    const dependencyId = emitSourceHandlerClosure(
      g,
      ast,
      dependency.className,
      dependencyMethod,
      constants,
      dependency.span,
      visited,
    );
    g.edge(handlerId, dependencyId, 'CALLS_HANDLER');
  }
  return handlerId;
}

/**
 * For slot devices declared with an options table and a quoted default
 * (NES_CONTROL_PORT(config, m_ctrl1, nes_control_port1_devices, "joypad")),
 * resolve the default option to its device class and extract that device's
 * INPUT_PORTS. Emits an InputPorts subtree plus a Device->InputPorts
 * USES_INPUTS edge with { option } props. Warn-and-continue on any miss —
 * generation then ships without bindings rather than failing.
 */
function resolveSlotInputs(
  g: GraphBuilder,
  mameSrc: string,
  slashIncludes: string[],
  machineConfigs: {
    cls: string;
    name: string;
    devices: { tag: string; slotOptions?: string; slotDefault?: string }[];
    softwareLists?: { name: string }[];
  }[],
): void {
  const busDirs = [...new Set(
    slashIncludes.filter(inc => inc.startsWith('bus/')).map(inc => join(mameSrc, 'src/devices', dirname(inc))),
  )].filter(d => existsSync(d));
  if (!busDirs.length) return;

  // (slotOptions, slotDefault) -> InputPorts node id, or null when unresolved
  const cache = new Map<string, string | null>();

  const resolve = (slotOptions: string, slotDefault: string): string | null => {
    const key = `${slotOptions}/${slotDefault}`;
    if (cache.has(key)) return cache.get(key)!;
    let result: string | null = null;
    for (const dir of busDirs) {
      const files = readdirSync(dir).filter(f => f.endsWith('.cpp'));
      // 1) the options function: void nes_control_port1_devices(device_slot_interface &device)
      let deviceType: string | undefined;
      for (const f of files) {
        const src = readFileSync(join(dir, f), 'utf8');
        const optionFunction = new RegExp(
          `void\\s+${slotOptions}\\s*\\(\\s*device_slot_interface\\s*&[^)]*\\)\\s*\\{([\\s\\S]*?)\\}`,
        ).exec(src);
        if (!optionFunction) continue;
        const m = new RegExp(
          `option_add(?:_internal)?\\(\\s*"${slotDefault}"\\s*,\\s*(\\w+)\\s*\\)`,
        ).exec(optionFunction[1]!);
        if (m) { deviceType = m[1]; break; }
      }
      if (!deviceType) continue;
      // 2) the device definition: DEFINE_DEVICE_TYPE(NES_JOYPAD, nes_joypad_device, ...)
      for (const f of files) {
        const raw = readFileSync(join(dir, f), 'utf8');
        const dm = new RegExp(`DEFINE_DEVICE_TYPE\\(\\s*${deviceType}\\s*,\\s*(\\w+)\\s*,`).exec(raw);
        if (!dm) continue;
        const cls = dm[1];
        // 3) ioport_constructor cls::device_input_ports() { return INPUT_PORTS_NAME(nes_joypad); }
        const stripped = stripComments(raw);
        const pm = new RegExp(
          `${cls}::device_input_ports\\(\\)[^{]*\\{[^}]*INPUT_PORTS_NAME\\(\\s*(\\w+)\\s*\\)`,
        ).exec(stripped);
        if (!pm) continue;
        const portsName = pm[1];
        const def = parseInputPorts(stripped, parseTextMacros(stripped)).find(p => p.name === portsName);
        if (!def) continue;
        const rel = join(dir, f).slice(mameSrc.length + 1);
        g.node('SourceFile', `file:${rel}`, { path: rel });
        emitInputPorts(g, def, `file:${rel}`);
        result = `inputs:${portsName}`;
        break;
      }
      if (result) break;
    }
    if (!result) {
      console.warn(`  ! slot inputs unresolved: ${slotOptions} default "${slotDefault}"`);
    }
    cache.set(key, result);
    return result;
  };

  // The cards a title's medium puts in the slot instead of its default: one
  // that declares a software list and the cartridge slot that reads it (the
  // ZX Interface 2 and its `spectrum_cart`). Its controls are the machine's
  // while that title plays -- the Interface 2's two Sinclair joysticks.
  const mediumCards = (slotOptions: string): string[] => {
    for (const dir of busDirs) {
      for (const f of readdirSync(dir).filter(name => name.endsWith('.cpp'))) {
        const table = new RegExp(
          `void\\s+${slotOptions}\\s*\\(\\s*device_slot_interface\\s*&[^)]*\\)\\s*\\{([\\s\\S]*?)\\}`,
        ).exec(readFileSync(join(dir, f), 'utf8'))?.[1];
        if (!table) continue;
        const types = new Map([...table.matchAll(/option_add(?:_internal)?\(\s*"([^"]+)"\s*,\s*(\w+)\s*\)/g)]
          .map(match => [match[2]!, match[1]!]));
        const sources = readdirSync(dir).filter(name => name.endsWith('.cpp'))
          .map(name => stripComments(readFileSync(join(dir, name), 'utf8')));
        return [...types].flatMap(([type, option]) => {
          const source = sources.find(text => new RegExp(`DEFINE_DEVICE_TYPE\\(\\s*${type}\\s*,`).test(text));
          return source && /\bSOFTWARE_LIST\s*\(/.test(source) && /\bGENERIC_CARTSLOT\s*\(/.test(source) ? [option] : [];
        });
      }
    }
    return [];
  };
  // The controllers a title asks for: a software list's `peripheral` feature
  // names a card in a control port's own option table (nes.xml's `zapper`,
  // `vaus`, `powerpad`). MAME leaves fitting it to the user (`-ctrl2
  // zapper`); the host fits it in the last port that offers it, which is the
  // NES's second, where its light gun and paddle plug in.
  const peripheralsByList = new Map<string, Set<string>>();
  const listPeripherals = (name: string): Set<string> => {
    let found = peripheralsByList.get(name);
    if (!found) {
      const xml = join(mameSrc, 'hash', `${name}.xml`);
      found = existsSync(xml) ? softwareListPeripherals(readFileSync(xml, 'utf8')) : new Set();
      peripheralsByList.set(name, found);
    }
    return found;
  };
  const tableOptions = (slotOptions: string): string[] => {
    for (const dir of busDirs) {
      for (const f of readdirSync(dir).filter(name => name.endsWith('.cpp'))) {
        const table = new RegExp(
          `void\\s+${slotOptions}\\s*\\(\\s*device_slot_interface\\s*&[^)]*\\)\\s*\\{([\\s\\S]*?)\\}`,
        ).exec(readFileSync(join(dir, f), 'utf8'))?.[1];
        if (table) return [...table.matchAll(/option_add(?:_internal)?\(\s*"([^"]+)"/g)].map(match => match[1]!);
      }
    }
    return [];
  };
  for (const cfg of machineConfigs) {
    const wanted = new Set((cfg.softwareLists ?? []).flatMap(list => [...listPeripherals(list.name)]));
    const fitted = new Map<string, string>();
    if (wanted.size) {
      for (const dev of cfg.devices) {
        if (!dev.slotOptions) continue;
        for (const option of tableOptions(dev.slotOptions)) if (wanted.has(option)) fitted.set(option, dev.tag);
      }
    }
    for (const dev of cfg.devices) {
      if (!dev.slotOptions) continue;
      const peripherals = [...fitted].filter(([, tag]) => tag === dev.tag).map(([option]) => option);
      const options = [...new Set([...(dev.slotDefault ? [dev.slotDefault] : []), ...mediumCards(dev.slotOptions)])];
      for (const option of [...options, ...peripherals.filter(option => !options.includes(option))]) {
        const inputsId = resolve(dev.slotOptions, option);
        if (!inputsId) continue;
        g.edge(`device:${cfg.cls}.${cfg.name}/${dev.tag}`, inputsId, 'USES_INPUTS', {
          option,
          ...(peripherals.includes(option) && option !== dev.slotDefault ? { peripheral: true } : {}),
        });
      }
    }
  }
}

/**
 * Slot default cards that carry a processor with a program map of their own.
 *
 * A slot normally holds a passive card -- a joystick, a cassette deck -- that
 * a hardware package models as the slot's option. A card whose
 * device_add_mconfig gives a CPU an AS_PROGRAM map is a computer of its own
 * (the 1541 disk drive is a 6502, 2 KB of RAM, two VIAs and its DOS ROM), and
 * the frame runner has to schedule that processor beside the host's, so the
 * board composes it the way it composes any device that hosts a CPU. Keyed
 * `${slotOptions}/${slotDefault}`; `files` are the card's source unit and
 * header, relative to the MAME root.
 */
function processorSlotCards(
  mameSrc: string,
  slashIncludes: string[],
  machineConfigs: { devices: { slotOptions?: string; slotDefault?: string }[] }[],
): Map<string, { type: string; cls: string; files: string[] }> {
  const cards = new Map<string, { type: string; cls: string; files: string[] }>();
  let hardware: ReturnType<typeof indexMameHardware> | undefined;
  const busDirs = [...new Set(
    slashIncludes.filter(inc => inc.startsWith('bus/')).map(inc => join(mameSrc, 'src/devices', dirname(inc))),
  )].filter(dir => existsSync(dir));
  if (!busDirs.length) return cards;
  const sources = new Map<string, string>();
  const read = (file: string): string => {
    let text = sources.get(file);
    if (text === undefined) { text = stripComments(readFileSync(file, 'utf8')); sources.set(file, text); }
    return text;
  };
  const files = busDirs.flatMap(dir => readdirSync(dir).filter(name => name.endsWith('.cpp')).map(name => join(dir, name)));
  const seen = new Set<string>();
  for (const cfg of machineConfigs) {
    for (const dev of cfg.devices) {
      if (!dev.slotOptions || !dev.slotDefault) continue;
      const key = `${dev.slotOptions}/${dev.slotDefault}`;
      if (seen.has(key)) continue;
      seen.add(key);
      let type: string | undefined;
      for (const file of files) {
        const options = new RegExp(
          `void\\s+${dev.slotOptions}\\s*\\(\\s*device_slot_interface\\s*&[^)]*\\)\\s*\\{([\\s\\S]*?)\\n\\}`,
        ).exec(read(file));
        type = options ? new RegExp(
          `option_add(?:_internal)?\\(\\s*"${dev.slotDefault}"\\s*,\\s*(\\w+)\\s*\\)`,
        ).exec(options[1]!)?.[1] : undefined;
        if (type) break;
      }
      if (!type) continue;
      // `DEFINE_DEVICE_TYPE(T, cls, ...)`, or the private form whose class
      // sits in a namespace: `DEFINE_DEVICE_TYPE_PRIVATE(AY_SLOT_AY8912,
      // device_ay_slot_interface, bus::spectrum::ay_slot::ay8912_device, ...)`.
      const definition = files.map(file => ({
        file,
        match: new RegExp(`DEFINE_DEVICE_TYPE\\(\\s*${type}\\s*,\\s*(\\w+)\\s*,`).exec(read(file)) ??
          new RegExp(`DEFINE_DEVICE_TYPE_PRIVATE\\(\\s*${type}\\s*,\\s*\\w+\\s*,\\s*(?:\\w+::)*(\\w+)\\s*,`).exec(read(file)),
      })).find(candidate => candidate.match);
      if (!definition) continue;
      const header = definition.file.replace(/\.cpp$/, '.h');
      // The card's own unit, and the same-directory headers it includes with
      // their implementations: a card's base class (the Spectrum AY cards'
      // spectrum_ay_device) is declared beside the slot, not with the card.
      const units = [definition.file, ...(existsSync(header) ? [header] : [])];
      for (let index = 0; index < units.length; index++) {
        for (const included of parseIncludes(read(units[index]!))) {
          if (included.includes('/')) continue;
          for (const candidate of [join(dirname(definition.file), included), join(dirname(definition.file), included.replace(/\.h$/, '.cpp'))]) {
            if (existsSync(candidate) && !units.includes(candidate)) units.push(candidate);
          }
        }
      }
      const parsed = units.map(file => parseMameSource(file.slice(mameSrc.length + 1), read(file)));
      const classes = new Map(parsed.flatMap(unit => unit.classes).map(entry => [entry.name, entry]));
      const hierarchy: string[] = [];
      for (let cls: string | undefined = definition.match![1]!; cls && !hierarchy.includes(cls);) {
        hierarchy.push(cls);
        cls = classes.get(cls)?.bases.map(base => base.split('::').at(-1)!).find(base => classes.has(base));
      }
      const mconfig = hierarchy.map(cls => parsed.flatMap(unit => unit.functions)
        .find(fn => fn.className === cls && fn.name === 'device_add_mconfig')).find(Boolean);
      // A card that runs a program (the 1541), or one that carries a sound
      // chip (the Spectrum 128's AY8912 behind its AY slot): either is part
      // of the machine MAME builds and has to run with it.
      const sounding = mconfig && [...mconfig.body.matchAll(/\b([A-Z][A-Z0-9_]{2,})\s*\(\s*config\s*,/g)]
        .some(device => (hardware ??= indexMameHardware(mameSrc)).get(device[1]!)?.sourceFile.startsWith('src/devices/sound/'));
      if (!mconfig || (!/set_addrmap\s*\(\s*AS_PROGRAM\b/.test(mconfig.body) && !sounding)) continue;
      cards.set(key, {
        type,
        cls: definition.match![1]!,
        // The card's own unit and header, and of the sibling units read to
        // find its bases only the one whose device_add_mconfig builds it (the
        // AY cards' spectrum_ay_device). The 1541's c1541.cpp includes
        // cbmiec.h, the bus it plugs into, which is no part of the card and
        // must not join the machine's own source.
        files: units.filter((file, index) =>
          index === 0 || file === header || file.endsWith(mconfig.span.file))
          .map(file => file.slice(mameSrc.length + 1)),
      });
    }
  }
  return cards;
}

/**
 * Extract the subgraph reachable from one game (clones resolve to parents for
 * shared machine/inputs). Everything the generator needs, nothing else.
 */
/** Props that carry a source method's implementation rather than its identity. */
const VIRTUAL_IMPLEMENTATION_PROPS = [
  'sourceBody',
  'sourceParameters',
  'sourceConstants',
  'inline',
  'sourceFile',
  'sourceLine',
  'sourceColumn',
] as const;

export function gameSubgraph(graph: KnowledgeGraph, game: string): KnowledgeGraph {
  const byId = new Map(graph.nodes.map(n => [n.id, n]));
  const out = new Map<string, boolean>();
  const outEdges = new Map<string, typeof graph.edges>();
  for (const e of graph.edges) {
    let list = outEdges.get(e.from);
    if (!list) { list = []; outEdges.set(e.from, list); }
    list.push(e);
  }
  const keepEdges: typeof graph.edges = [];
  const rootGameId = `game:${game}`;
  const queue = [rootGameId];
  while (queue.length) {
    const id = queue.shift()!;
    if (out.has(id) || !byId.has(id)) continue;
    out.set(id, true);
    for (const e of outEdges.get(id) ?? []) {
      // A clone inherits the parent's ROM set, but its own GAME declaration
      // selects the effective machine and inputs. Pulling the parent machine
      // as well gave Neo Geo one-slot carts six-slot controller devices.
      if (
        id !== rootGameId && byId.get(id)?.label === 'Game' &&
        !['DEFINED_IN', 'USES_ROMSET', 'CLONE_OF'].includes(e.rel)
      ) continue;
      keepEdges.push(e);
      queue.push(e.to);
    }
  }
  const nodes = graph.nodes
    .filter(n => out.has(n.id))
    .map(node => ({ ...node, props: { ...node.props } }));
  let edges = keepEdges.filter(e => out.has(e.from) && out.has(e.to));

  // Apply inherited-device configuration in most-derived-first order. MAME
  // machine configs routinely call a base helper and then alter its CPU or
  // screen. The full graph must keep the shared base immutable, while this
  // per-game subgraph can expose the effective device facts to every compiler.
  const selectedMachine = edges.find(edge =>
    edge.from === `game:${game}` && edge.rel === 'USES_MACHINE')?.to;
  const configOrder: string[] = [];
  if (selectedMachine) {
    const pending = [selectedMachine];
    const seen = new Set<string>();
    while (pending.length) {
      const id = pending.shift()!;
      if (seen.has(id)) continue;
      seen.add(id);
      configOrder.push(id);
      pending.push(...edges
        .filter(edge => edge.from === id && edge.rel === 'CALLS')
        .map(edge => edge.to));
    }
  }
  const patchedClocks = new Set<string>();
  const patchedScreenRaws = new Set<string>();
  for (const configId of configOrder) {
    const config = nodes.find(node => node.id === configId);
    const encoded = Array.isArray(config?.props.devicePatches)
      ? config.props.devicePatches.map(String)
      : [];
    for (const value of encoded) {
      const patch = JSON.parse(value) as {
        tag: string;
        config: string[];
        replacementType?: string;
        clock?: number;
        slotOptions?: string;
        slotDefault?: string;
        screenRaw?: {
          pixclock: number; htotal: number; hbend: number; hbstart: number;
          vtotal: number; vbend: number; vbstart: number;
        };
      };
      const deviceIds = new Set(configOrder.flatMap(id => edges
        .filter(edge => edge.from === id && edge.rel === 'HAS_DEVICE')
        .map(edge => edge.to)));
      const device = nodes.find(node =>
        deviceIds.has(node.id) &&
        node.label === 'Device' &&
        String(node.props.tag) === patch.tag);
      if (!device) continue;
      if (patch.replacementType) device.props.type = patch.replacementType;
      if (patch.slotOptions !== undefined) {
        device.props.slotOptions = patch.slotOptions;
        device.props.slotDefault = patch.slotDefault ?? '';
      }
      if (patch.clock !== undefined && !patchedClocks.has(patch.tag)) {
        device.props.clock = patch.clock;
        patchedClocks.add(patch.tag);
      }
      if (patch.screenRaw && !patchedScreenRaws.has(patch.tag)) {
        device.props.screenRaw = [
          patch.screenRaw.pixclock,
          patch.screenRaw.htotal,
          patch.screenRaw.hbend,
          patch.screenRaw.hbstart,
          patch.screenRaw.vtotal,
          patch.screenRaw.vbend,
          patch.screenRaw.vbstart,
        ];
        patchedScreenRaws.add(patch.tag);
      }
      const raw = Array.isArray(device.props.config)
        ? device.props.config.map(String)
        : [];
      device.props.config = [...raw, ...patch.config];
    }
  }

  // Apply device_remove from most-derived to base.  Only devices declared by
  // the removing config or one of its callees are affected, so a device with
  // the same tag re-added by a still-more-derived config remains present.
  const removedDeviceIds = new Set<string>();
  for (const [configIndex, configId] of configOrder.entries()) {
    const config = nodes.find(node => node.id === configId);
    const removedTags = Array.isArray(config?.props.removedDevices)
      ? config.props.removedDevices.map(String)
      : [];
    if (!removedTags.length) continue;
    const affectedConfigs = new Set(configOrder.slice(configIndex));
    for (const edge of edges) {
      if (
        edge.rel !== 'HAS_DEVICE' ||
        !affectedConfigs.has(edge.from)
      ) continue;
      const device = nodes.find(node => node.id === edge.to);
      if (
        device?.label === 'Device' &&
        removedTags.includes(String(device.props.tag))
      ) removedDeviceIds.add(device.id);
    }
  }
  if (removedDeviceIds.size) {
    edges = edges.filter(edge =>
      !removedDeviceIds.has(edge.from) && !removedDeviceIds.has(edge.to));
  }

  // A setter in the derived config replaces the same callback binding from a
  // called config. Drop the shadowed callback and its outgoing closure so
  // consumers cannot accidentally select the base screen update by node order.
  const shadowedCallbacks = new Set<string>();
  const callbackKeys = new Set<string>();
  for (const configId of configOrder) {
    const levelKeys = new Set<string>();
    const owners = new Set([
      configId,
      ...edges
        .filter(edge => edge.from === configId && edge.rel === 'HAS_DEVICE')
        .map(edge => edge.to),
    ]);
    for (const edge of edges.filter(candidate =>
      owners.has(candidate.from) && candidate.rel === 'HAS_CALLBACK')) {
      const callback = nodes.find(node => node.id === edge.to);
      if (!callback) continue;
      const key = [
        String(callback.props.ownerTag),
        String(callback.props.signal),
        callback.props.slot === undefined ? '' : String(callback.props.slot),
      ].join(':');
      if (callbackKeys.has(key)) shadowedCallbacks.add(callback.id);
      else if (String(callback.props.operation).startsWith('set')) levelKeys.add(key);
    }
    for (const key of levelKeys) callbackKeys.add(key);
  }
  if (shadowedCallbacks.size) {
    edges = edges.filter(edge =>
      !shadowedCallbacks.has(edge.from) && !shadowedCallbacks.has(edge.to));
  }

  // Virtual dispatch. The GAME macro selects one driver class, and a virtual
  // call written inside an inherited method runs that class's redefinition:
  // popeye's screen_update lives in tnx1_state but must reach
  // tpp2_state::draw_background. OVERRIDDEN_BY carries every candidate; fold
  // the selected implementation onto the handler consumers already reference.
  //
  // An override that chains to its base needs both bodies live at once. When
  // it calls the very handler it replaces (`ngarcade_base_state::io_control_w`
  // runs `neogeo_base_state::io_control_w(offset, data)` for the cases it does
  // not handle), the base body is kept as its own handler, `method__base`, and
  // the override's qualified call is pointed at it. Before #178 the base body
  // simply won, and Neo Geo never ran the override's coin lockout and coin
  // counter writes. An override that chains to some other class still keeps
  // the base implementation, since qualified calls are not otherwise
  // distinguished from virtual ones downstream.
  const classRank = new Map<string, number>();
  for (const [index, configId] of configOrder.entries()) {
    const cls = String(nodes.find(node => node.id === configId)?.props.cls ?? '');
    if (cls && !classRank.has(cls)) classRank.set(cls, index);
  }
  const overriddenBy = edges.filter(edge => edge.rel === 'OVERRIDDEN_BY');
  if (overriddenBy.length) {
    const byId = new Map(nodes.map(node => [node.id, node]));
    const rehomed: typeof edges = [];
    const kept: typeof nodes = [];
    for (const node of nodes) {
      if (node.label !== 'Handler') continue;
      const baseRank = classRank.get(String(node.props.ownerClass));
      if (baseRank === undefined) continue;
      const method = String(node.props.method);
      const ownerClass = String(node.props.ownerClass);
      const callsOwnBase = new RegExp(`\\b${ownerClass}::${method}\\s*\\(`);
      const [chosen] = overriddenBy
        .filter(edge => edge.from === node.id)
        .map(edge => byId.get(edge.to))
        .filter(candidate => candidate !== undefined)
        .filter(candidate => (classRank.get(String(candidate.props.ownerClass)) ?? baseRank) < baseRank)
        .filter(candidate => {
          const body = String(candidate.props.sourceBody ?? '');
          return callsOwnBase.test(body) || !new RegExp(`\\w+::${method}\\s*\\(`).test(body);
        })
        .sort((left, right) =>
          classRank.get(String(left.props.ownerClass))! -
          classRank.get(String(right.props.ownerClass))!);
      if (!chosen) continue;
      const chosenBody = String(chosen.props.sourceBody ?? '');
      if (callsOwnBase.test(chosenBody)) {
        const baseId = `${node.id}__base`;
        kept.push({ ...node, id: baseId, props: { ...node.props, method: `${method}__base` } });
        for (const edge of edges) {
          if (edge.from === node.id && edge.rel !== 'OVERRIDDEN_BY') rehomed.push({ ...edge, from: baseId });
        }
        rehomed.push({ from: node.id, to: baseId, rel: 'CALLS_HANDLER' });
      }
      for (const prop of VIRTUAL_IMPLEMENTATION_PROPS) {
        if (chosen.props[prop] === undefined) delete node.props[prop];
        else node.props[prop] = chosen.props[prop];
      }
      if (callsOwnBase.test(chosenBody)) {
        node.props.sourceBody = chosenBody.replace(
          new RegExp(`\\b${ownerClass}::${method}(\\s*\\()`, 'g'),
          `${ownerClass}::${method}__base$1`,
        );
      }
      node.props.dispatchedFrom = String(chosen.props.ownerClass);
      // The selected body calls the selected class's helpers, so its closure
      // becomes the base handler's closure.
      for (const edge of edges) {
        if (edge.from !== chosen.id || edge.rel === 'OVERRIDDEN_BY') continue;
        rehomed.push({ ...edge, from: node.id });
      }
    }
    edges = [...edges, ...rehomed].filter(edge => edge.rel !== 'OVERRIDDEN_BY');
    nodes.push(...kept);
  }

  // Dropping shadowed callbacks and unselected overrides can orphan whole
  // closures; keep only what the game still reaches.
  const reachable = new Set<string>();
  const pending = [rootGameId];
  while (pending.length) {
    const id = pending.shift()!;
    if (reachable.has(id)) continue;
    reachable.add(id);
    for (const edge of edges) if (edge.from === id) pending.push(edge.to);
  }

  return {
    meta: graph.meta,
    nodes: nodes.filter(node =>
      reachable.has(node.id) &&
      !shadowedCallbacks.has(node.id) && !removedDeviceIds.has(node.id)),
    edges: edges.filter(edge => reachable.has(edge.from) && reachable.has(edge.to)),
  };
}

/**
 * Say whether a screen update writes palette indices rather than colours.
 *
 * MAME declares it in the update's own signature -- `bitmap_ind16 &` against
 * `bitmap_rgb32 &` -- and the driver's Handler node carries that when the
 * driver draws. When a device draws, the method belongs to the device's source
 * rather than the driver's, so the signature is read from there. Reading it
 * wrong is silent: the Game Boy's four pen numbers went into the framebuffer
 * as colours, which are all transparent black, so the machine ran and drew
 * nothing anyone could see.
 */
function annotateIndexedScreenUpdate(g: GraphBuilder, mameSrc: string): void {
  // Only a device-drawn screen needs asking. When the driver draws, its own
  // Handler node already carries the signature, and the generator reads it
  // from there.
  //
  // The gate is not a micro-optimisation. indexMameHardware parses every file
  // under src/devices and src/mame to build its index, and a target's graph is
  // built in its own process -- so calling it unconditionally here added that
  // whole-tree parse to all 65 targets and took one target's generation from
  // 1s to 22s. The only other caller reaches it behind an early return, which
  // is why nothing had paid this before.
  const deviceTags = new Set(
    [...g.nodes.values()]
      .filter(node => node.label === 'Device')
      .map(node => String(node.props.tag ?? '')),
  );
  const drawnByDevice = [...g.nodes.values()].filter(node =>
    node.label === 'Callback' &&
    node.props.signal === 'set_screen_update' &&
    node.props.targetClass &&
    node.props.targetMethod &&
    deviceTags.has(String(node.props.deviceTag ?? node.props.targetTag ?? '')));
  if (!drawnByDevice.length) return;

  const definitions = indexMameHardware(mameSrc);
  const byClass = new Map<string, string>();
  for (const definition of definitions.values()) {
    byClass.set(definition.className, definition.sourceFile);
  }
  for (const callback of drawnByDevice) {
    const className = String(callback.props.targetClass ?? '');
    const method = String(callback.props.targetMethod ?? '');
    const sourceFile = byClass.get(className);
    if (!className || !method || !sourceFile) continue;
    const declaration = new RegExp(
      `\\b${method}\\s*\\(([^;{}]*)\\)`,
    ).exec(readFileSync(join(mameSrc, sourceFile.replace(/\.cpp$/, '.h')), 'utf8'));
    if (declaration && /\bbitmap_ind16\b/.test(declaration[1]!)) {
      callback.props.indexed = 1;
    }
  }
}

/**
 * Record the routine a palette device is constructed with.
 *
 * MAME's `palette_device` takes its init as a constructor argument rather than
 * a chained setter -- `PALETTE(config, m_palette, FUNC(gb_state::gb_palette),
 * 4)` -- so the devcb pass, which walks fluent chains, never saw it. A machine
 * whose colours come from code rather than from a colour PROM therefore had no
 * palette at all: every Game Boy pixel resolved to pen zero, which is
 * transparent black, and the picture was invisible rather than wrong.
 */
function recordPaletteInit(
  g: GraphBuilder,
  ast: MameAstIndex,
  constants: Record<string, number>,
  driverFile: string,
): void {
  for (const device of [...g.nodes.values()]) {
    if (device.label !== 'Device' || device.props.type !== 'PALETTE') continue;
    const config = Array.isArray(device.props.config) ? device.props.config.map(String) : [];
    const construction = config.find(line => /^\s*PALETTE\s*\(/.test(line));
    // The pen count: `set_entries(8)`, or the constructor's trailing count.
    const entryCount = config
      .map(line => /\bset_entries\s*\(\s*([^)]+)\)/.exec(line)?.[1]?.trim())
      .find((value): value is string => Boolean(value))
      ?? (construction && /,\s*([^,()]+)\s*\)\s*$/.exec(construction)?.[1]?.trim());
    const paletteEntries = entryCount !== undefined ? evalExpr(entryCount, constants) : null;
    if (paletteEntries !== null && paletteEntries > 0) device.props.paletteEntries = paletteEntries;
    const func = construction && /FUNC\s*\(\s*(\w+)::(\w+)\s*\)/.exec(construction);
    if (!func) continue;
    const entries = /,\s*([^,()]+)\s*\)\s*$/.exec(construction!)?.[1]?.trim();
    const callbackId = `${device.id}/callback:palette_init`;
    g.node('Callback', callbackId, {
      signal: 'palette_init',
      operation: 'palette_init',
      raw: construction!,
      ownerTag: String(device.props.tag ?? ''),
      targetClass: func[1]!,
      targetMethod: func[2]!,
      ...(entries !== undefined && evalExpr(entries, constants) !== null
        ? { entries: evalExpr(entries, constants)! }
        : {}),
      ...(device.props.sourceFile ? { sourceFile: device.props.sourceFile } : {}),
      ...(device.props.sourceLine ? { sourceLine: device.props.sourceLine } : {}),
    });
    g.edge(device.id, callbackId, 'HAS_CALLBACK');
    const handlerId = emitSourceHandlerClosure(
      g, ast, func[1]!, func[2]!, constants, { file: driverFile, start: 0, end: 0, line: 0, column: 0, endLine: 0, endColumn: 0 },
    );
    g.edge(callbackId, handlerId, 'CALLS_HANDLER');
  }
}

/**
 * Record what a video-display processor configures on the screen it owns.
 *
 * A driver normally sets its screen up itself -- raw parameters, and
 * `m_screen->set_screen_update(FUNC(pacman_state::screen_update_pacman))`. A
 * machine built around a VDP does neither: coleco.cpp writes only
 * `SCREEN(config, "screen")`, and the TMS9928A fills both in from its own
 * `device_config_complete()`. Those calls are as real as a driver's, so the
 * graph carries their results -- the geometry on the screen, and the update as
 * the callback it is, owned by the SCREEN and pointing at the device that
 * draws.
 */
function recordDeviceConfiguredScreen(g: GraphBuilder, mameSrc: string): void {
  const nodes = [...g.nodes.values()];
  if (nodes.some(node =>
    node.label === 'Callback' && node.props.signal === 'set_screen_update')) return;
  const screen = nodes.find(node =>
    node.label === 'Device' && node.props.type === 'SCREEN');
  const tag = screen && String(screen.props.tag ?? '');
  if (!screen || !tag) return;
  // Geometry already declared by the driver means the screen is the driver's
  // to configure, and a device did not claim it.
  if (screen.props.screenRaw || screen.props.screenRefreshHz) return;
  const claims = new RegExp(`\\.set_screen\\(\\s*"${tag}"\\s*\\)`);
  for (const device of nodes) {
    if (device.label !== 'Device' || device === screen) continue;
    const config = Array.isArray(device.props.config) ? device.props.config.map(String) : [];
    if (!config.some(line => claims.test(line))) continue;
    const configured = deviceConfiguredScreen(
      mameSrc,
      String(device.props.type),
      Number(device.props.clock ?? 0),
    );
    if (!configured) continue;
    const { raw } = configured;
    screen.props.screenRaw = [
      raw.pixclock, raw.htotal, raw.hbend, raw.hbstart,
      raw.vtotal, raw.vbend, raw.vbstart,
    ];
    if (!configured.screenUpdate) return;
    const className = String(
      device.props.cls ?? `${String(device.props.type).toLowerCase()}_device`);
    const id = `${screen.id}/callback:${tag}:device`;
    g.node('Callback', id, {
      signal: 'set_screen_update',
      operation: 'set_screen_update',
      raw: `screen().set_screen_update(*this, FUNC(${className}::${configured.screenUpdate}))`,
      ownerTag: tag,
      deviceTag: String(device.props.tag),
      targetClass: className,
      targetMethod: configured.screenUpdate,
      ...(device.props.sourceFile ? { sourceFile: device.props.sourceFile } : {}),
      ...(device.props.sourceLine ? { sourceLine: device.props.sourceLine } : {}),
    });
    g.edge(screen.id, id, 'HAS_CALLBACK');
    return;
  }
}

/**
 * Replace every `map(...).m(tag, FUNC(device::map))` window with the ranges the
 * device's own address map declares inside it.
 *
 * MAME installs a device's map into a window of the owner's space, so the two
 * compose: an inner range sits at the window's start, and the window's mirror
 * applies on top of the inner one. Without this the window decoded to nothing
 * at all -- the Atari 2600's RIOT registers, its timer included, lowered as a
 * silent `nop`, and so did Defender's blitter and Double Dragon's bank device.
 *
 * The device's map lives in its own implementation file, which the driver
 * reaches only through a header. MAME pairs the two by name, so the `.cpp`
 * beside each included `.h` is where to look.
 */
function expandDeviceSubmaps(
  maps: AddressMapDef[],
  mameSrc: string,
  includes: ReadonlySet<string>,
): void {
  if (!maps.some(map => map.ranges.some(range => range.deviceMap))) return;
  const implementations: string[] = [];
  for (const include of includes) {
    if (!include.endsWith('.h')) continue;
    const implementation = include.replace(/\.h$/, '.cpp');
    for (const candidate of [
      join(mameSrc, 'src/devices', implementation),
      join(mameSrc, 'src', implementation),
      join(mameSrc, 'src/mame', implementation),
    ]) {
      if (!existsSync(candidate)) continue;
      implementations.push(stripComments(readFileSync(candidate, 'utf8')));
      break;
    }
  }
  const deviceMaps = parseAddressMaps(implementations.join('\n'));
  // A driver's own map installed through `.m(FUNC(cls::map))` has no device
  // reference; it resolves against the driver's maps and may itself install
  // further submaps, so expansion repeats until nothing resolves any more.
  const ownMap = (className: string, method: string): AddressMapDef | undefined => {
    const named = maps.filter(candidate => candidate.name === method);
    return named.find(candidate => candidate.cls === className) ??
      (named.length === 1 ? named[0] : undefined);
  };
  for (let depth = 0; depth < 4; depth++) {
    let expanded = false;
    for (const map of maps) {
      map.ranges = map.ranges.flatMap(range => {
        const inner = expandSubmap(range, deviceMaps, ownMap);
        if (inner) expanded = true;
        return inner ?? [range];
      });
    }
    if (!expanded) break;
  }
}

function expandSubmap(
  range: AddressRangeDef,
  deviceMaps: readonly AddressMapDef[],
  ownMap: (className: string, method: string) => AddressMapDef | undefined,
): AddressRangeDef[] | undefined {
  const submap = range.deviceMap;
  if (!submap) return undefined;
  const declared = submap.ref
    ? deviceMaps.find(candidate =>
      candidate.cls === submap.className && candidate.name === submap.method)
    : ownMap(submap.className, submap.method);
  // Left as-is rather than dropped: an unresolved submap keeps its window
  // and stays visible in the graph as a range that decodes nothing, which
  // is what it is.
  if (!declared) return undefined;
  const reference = submap.ref.replace(/^m_/, '');
  return declared.ranges.map(inner => {
    // `address_map_bank_device::amap8` maps the whole 32-bit space; the
    // window is what MAME actually installs, so the inner end clamps to it.
    const start = range.start + inner.start;
    const end = Math.min(range.start + inner.end, range.end);
    const withDevice = (handler?: HandlerRef): HandlerRef | undefined =>
      handler && (reference ? { ...handler, deviceRef: handler.deviceRef ?? reference } : handler);
    return {
      ...inner,
      start,
      end,
      ...((range.mirror ?? 0) | (inner.mirror ?? 0)
        ? { mirror: (range.mirror ?? 0) | (inner.mirror ?? 0) }
        : {}),
      read: withDevice(inner.read),
      write: withDevice(inner.write),
      raw: `${range.raw} -> ${inner.raw}`,
    };
  }).filter(inner => inner.end >= inner.start);
}


/**
 * A driver init with the same-class helpers it calls inlined: their constant
 * arguments substituted and each branch those constants decide chosen. NBA
 * Jam's init is one call, `init_nbajam_common(0)`, whose `if (!te_protection)`
 * picks between two protection layouts; reading the helper whole installed
 * both.
 */
export function effectiveInitBody(
  ast: MameAstIndex,
  className: string,
  fn: MameFunction,
  consts: Record<string, number>,
  depth = 0,
): string {
  if (depth > 4) return fn.body;
  return selectConstantBranches(fn.body.replace(
    /(^\s*|[;{}]\s*)(\w+)\s*\(([^;{}]*)\)\s*;/g,
    (all, lead: string, name: string, argumentText: string) => {
      const helper = ast.findFunctionInHierarchy(className, name);
      if (!helper || helper === fn) return all;
      const names = helper.parameters.split(',').map(parameter =>
        /(\w+)\s*(?:=[^,]*)?$/.exec(parameter.trim())?.[1]).filter(Boolean) as string[];
      const values = argumentText.trim() ? argumentText.split(',').map(argument => evalExpr(argument.trim(), consts)) : [];
      if (values.length !== names.length || values.some(value => value === null)) return all;
      let body = effectiveInitBody(ast, className, helper, consts, depth + 1);
      names.forEach((parameter, index) => {
        body = body.replace(new RegExp(`\\b${parameter}\\b`, 'g'), String(values[index]));
      });
      return `${lead}{${selectConstantBranches(body, consts)}}`;
    },
  ), consts);
}

/** `if (constant) {A} else {B}` as the block the constant selects. */
function selectConstantBranches(text: string, consts: Record<string, number> = {}): string {
  const block = (at: number): [number, number] | undefined => {
    let index = at;
    while (/\s/.test(text[index] ?? '')) index++;
    if (text[index] !== '{') {
      // A braceless branch is the one statement up to its semicolon.
      if (/^(?:if|for|while|switch|do)\b/.test(text.slice(index))) return undefined;
      const semicolon = text.indexOf(';', index);
      return semicolon < 0 ? undefined : [index, semicolon + 1];
    }
    let depth = 0;
    for (let end = index; end < text.length; end++) {
      if (text[end] === '{') depth++;
      else if (text[end] === '}' && --depth === 0) return [index, end + 1];
    }
    return undefined;
  };
  for (let from = 0; ;) {
    const match = /\bif\s*\(/g;
    match.lastIndex = from;
    const found = match.exec(text);
    if (!found) return text;
    const open = found.index + found[0].length - 1;
    let depth = 0;
    let close = open;
    for (; close < text.length; close++) {
      if (text[close] === '(') depth++;
      else if (text[close] === ')' && --depth === 0) break;
    }
    const condition = evalCondition(text.slice(open + 1, close), consts);
    const then = block(close + 1);
    if (condition === null || !then) { from = found.index + 2; continue; }
    const elseMatch = /^\s*else\b/.exec(text.slice(then[1]));
    const otherwise = elseMatch ? block(then[1] + elseMatch[0].length) : undefined;
    const end = otherwise ? otherwise[1] : then[1];
    const chosen = condition
      ? text.slice(then[0], then[1])
      : otherwise ? text.slice(otherwise[0], otherwise[1]) : '';
    text = text.slice(0, found.index) + chosen + text.slice(end);
    from = found.index;
  }
}

function evalCondition(condition: string, consts: Record<string, number>): boolean | null {
  let text = condition.trim();
  while (text.startsWith('(') && text.endsWith(')')) {
    let depth = 0;
    let wraps = true;
    for (let index = 0; index < text.length - 1; index++) {
      if (text[index] === '(') depth++;
      else if (text[index] === ')' && --depth === 0) { wraps = false; break; }
    }
    if (!wraps) break;
    text = text.slice(1, -1).trim();
  }
  const split = (operator: string): string[] | undefined => {
    let depth = 0;
    for (let index = 0; index < text.length - 1; index++) {
      if (text[index] === '(') depth++;
      else if (text[index] === ')') depth--;
      else if (depth === 0 && text.startsWith(operator, index)) {
        return [text.slice(0, index), text.slice(index + operator.length)];
      }
    }
    return undefined;
  };
  for (const operator of ['||', '&&']) {
    const parts = split(operator);
    if (!parts) continue;
    const left = evalCondition(parts[0]!, consts);
    const right = evalCondition(parts[1]!, consts);
    if (left === null || right === null) return null;
    return operator === '||' ? left || right : left && right;
  }
  for (const operator of ['==', '!=']) {
    const parts = split(operator);
    if (!parts) continue;
    const left = evalExpr(parts[0]!.trim(), consts);
    const right = evalExpr(parts[1]!.trim(), consts);
    if (left === null || right === null) return null;
    return operator === '==' ? left === right : left !== right;
  }
  if (text.startsWith('!')) {
    const inner = evalCondition(text.slice(1), consts);
    return inner === null ? null : !inner;
  }
  const value = evalExpr(text, consts);
  return value === null ? null : value !== 0;
}

/**
 * The tag of the CPU an install's space belongs to: `m_maincpu` is the
 * maincpu finder; `m_adpcm_sound->get_cpu()` is the Williams ADPCM board's
 * `m_cpu`, a child of the device (`adpcm:cpu`).
 */
/**
 * The default size of every RAM device a machine config (and the configs it
 * calls) adds, by the finder member that reaches it: `RAM(config, m_ram)
 * .set_default_size("48K")` is 49152 under `m_ram`.
 */
function configuredRamSizes(
  configs: readonly ReturnType<typeof parseMachineConfigs>[number][],
  machine: string,
  memberTags: Record<string, string>,
): Record<string, number> {
  const sizes: Record<string, number> = {};
  const seen = new Set<string>();
  const visit = (name: string): void => {
    if (seen.has(name)) return;
    seen.add(name);
    const cfg = configs.find(candidate => candidate.name === name);
    if (!cfg) return;
    for (const called of cfg.calls) visit(called);
    for (const device of cfg.devices) {
      if (device.type !== 'RAM') continue;
      const size = [...device.config.join('\n').matchAll(/set_default_size\s*\(\s*"(\d+)([KM]?)"/gi)].at(-1);
      if (!size) continue;
      const bytes = Number(size[1]) * (size[2]?.toUpperCase() === 'M' ? 1 << 20 : size[2] ? 1 << 10 : 1);
      for (const [member, tag] of Object.entries(memberTags)) {
        if (tag === device.tag && member.startsWith('m_')) sizes[member] = bytes;
      }
    }
    // A derived config resizes the base's device: the 128K's
    // `m_ram->set_default_size("128K")` after the 48K's own declaration.
    for (const patch of cfg.devicePatches) {
      const size = [...patch.config.join('\n').matchAll(/set_default_size\s*\(\s*"(\d+)([KM]?)"/gi)].at(-1);
      if (!size) continue;
      const bytes = Number(size[1]) * (size[2]?.toUpperCase() === 'M' ? 1 << 20 : size[2] ? 1 << 10 : 1);
      for (const [member, tag] of Object.entries(memberTags)) {
        if (tag === patch.tag && member.startsWith('m_')) sizes[member] = bytes;
      }
    }
  };
  visit(machine);
  return sizes;
}

function installTargetTag(
  ast: MameAstIndex,
  className: string,
  target: string,
  memberTags: Record<string, string>,
): string | undefined {
  const parts = target.split('->').map(part => part.trim());
  const first = parts[0]!;
  const tag = memberTags[first];
  if (!tag) return undefined;
  let owner = ast.finderClass(className, first);
  let path = tag;
  for (const accessor of parts.slice(1)) {
    const method = /^(\w+)\s*\(\s*\)$/.exec(accessor)?.[1];
    if (!owner || !method) return undefined;
    const declaration = ast.ast.units.flatMap(unit => unit.classes).find(cls => cls.name === owner);
    const member = declaration
      ? new RegExp(`\\b${method}\\s*\\(\\s*\\)\\s*\\{\\s*return\\s+(m_\\w+)\\s*;`).exec(declaration.body)?.[1]
      : undefined;
    if (!member) return undefined;
    const constructorTag = ast.ast.units.map(unit => new RegExp(
      `${owner}::${owner}\\s*\\([^)]*\\)\\s*:[^{]*?\\b${member}\\s*\\(\\s*\\*\\s*this\\s*,\\s*"([^"%]+)"`,
    ).exec(unit.source)?.[1]).find(Boolean);
    if (!constructorTag) return undefined;
    path = `${path}:${constructorTag}`;
    owner = ast.finderClass(owner, member);
  }
  return path;
}


/**
 * `m_member = file_scope_table;` in a driver init: the member is a pointer the
 * handlers index, and what it points at is known at build time.
 */
function initStaticTables(
  ast: MameAstIndex,
  body: string,
  consts: Record<string, number>,
): { name: string; bits: 8 | 16 | 32; signed?: boolean; arrayLength: number; initialValues: number[] }[] {
  const source = ast.ast.units.map(unit => unit.source).join('\n');
  const tables = [];
  for (const [, member, table] of body.matchAll(/\b(m_\w+)\s*=\s*(\w+)\s*;/g)) {
    const declaration = new RegExp(
      `\\bstatic\\s+(?:(?:const|constexpr)\\s+)+(u?int(8|16|32)_t)\\s+${table}\\s*\\[[^\\]]*\\]\\s*=\\s*\\{([^{}]*)\\}\\s*;`,
    ).exec(source);
    if (!declaration) continue;
    const entries = declaration[3]!.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
    const values = splitMameArgs(entries).map(value => value.trim()).filter(Boolean)
      .map(value => evalExpr(value, consts));
    if (values.some(value => value === null)) continue;
    tables.push({
      name: member!,
      bits: Number(declaration[2]) as 8 | 16 | 32,
      ...(declaration[1]!.startsWith('u') ? {} : { signed: true }),
      arrayLength: values.length,
      initialValues: values as number[],
    });
  }
  return tables;
}

/** The index of the parenthesis closing the one at `open`, or -1. */
function matchingParenthesis(text: string, open: number): number {
  let depth = 0;
  for (let index = open; index < text.length; index++) {
    if (text[index] === '"') {
      for (index++; index < text.length && text[index] !== '"'; index++) if (text[index] === '\\') index++;
    } else if (text[index] === '(') depth++;
    else if (text[index] === ')' && --depth === 0) return index;
  }
  return -1;
}
