import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { GraphBuilder, type KnowledgeGraph, type PropValue } from './types.ts';
import {
  MameAstIndex, parseCallChain, parseMameAst, spanProps, splitMameArgs,
  type MameFunction, type SourceSpan,
} from '../mame/ast.ts';
import { compileMameHandler } from '../mame/handler-ir.ts';
import {
  executeGeneratedHandler,
  type GeneratedHandlerBindings,
} from '../ir/execute.ts';
import { deviceConfiguredScreen } from '../mame/screen-config.ts';
import {
  stripComments, parseDefines, parseGames, parseRomSets, parseAddressMaps,
  parseMachineConfigs, parseMemberTags, parseInputPorts, parseGfxLayouts,
  parseStateClassConstants,
  parseGfxDecodes, parseIncludes, parseDeviceTypeDecls, parseDeviceDefaultClocks,
  parseInitPatches, parseInitRomTransforms, parseInstalledHandlers, parseTextMacros, parseMemoryBanks, evalExpr,
  parseEnumConstants, normalizeTemplatedMethod,
  type InputPortsDef,
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
export function buildGraph(mameSrc: string, driverFile: string): KnowledgeGraph {
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

  // driver header credits (parsed from RAW text — comments are stripped below)
  const driverRaw = readFileSync(join(dir, driverBase), 'utf8');
  const license = /^\/\/\s*license\s*:\s*(.+)$/m.exec(driverRaw)?.[1].trim();
  const copyrightHolders = /^\/\/\s*copyright-holders\s*:\s*(.+)$/m.exec(driverRaw)?.[1].trim();

  let combined = '';
  const sourceUnits: { file: string; source: string }[] = [];
  const slashIncludes: string[] = [];
  for (const file of family) {
    const raw = readFileSync(file, 'utf8');
    const rel = file.slice(mameSrc.length + 1);
    sourceUnits.push({ file: rel, source: raw });
    g.node('SourceFile', `file:${rel}`, { path: rel });
    for (const inc of parseIncludes(raw)) {
      if (inc.includes('/') && !slashIncludes.includes(inc)) slashIncludes.push(inc);
      g.node('SourceFile', `file:${inc}`, { path: inc, external: true });
      g.edge(`file:${rel}`, `file:${inc}`, 'INCLUDES');
    }
    combined += `\n// ==== ${rel} ====\n` + stripComments(raw);
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
  const pendingExternalIncludes = [...slashIncludes];
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
  const consts = parseDefines(combined, extConsts);
  const textMacros = parseTextMacros(combined);
  const ioportMembers = parseIoportMembers(combined, textMacros.strings);
  emitSourceTimerCallbacks(g, ast, consts, definedIn);
  const memberTags = parseMemberTags(combined);
  const stateClassConstants = parseStateClassConstants(combined);
  const deviceTypes = parseDeviceTypeDecls(combined);

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
    const installedHandlers = initFunction
      ? parseInstalledHandlers(initFunction.body, consts)
      : [];
    g.node('Game', id, {
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
    if (gm.parent !== '0') g.edge(id, `game:${gm.parent}`, 'CLONE_OF');
    g.edge(id, `machine:${gm.cls}.${gm.machine}`, 'USES_MACHINE');
    g.edge(id, `inputs:${gm.input}`, 'USES_INPUTS');
    g.edge(id, `romset:${gm.name}`, 'USES_ROMSET');
    for (const installed of installedHandlers) {
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
  for (const set of parseRomSets(combined, consts)) {
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
        if (load.status) props.status = load.status;
        g.node('Rom', romId, props);
        g.edge(regId, romId, 'LOADS');
      }
    }
  }

  // --- address maps ---
  const maps = parseAddressMaps(combined);
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
          edgeProps.deviceTag = memberTags[h.deviceRef] ?? h.deviceRef.replace(/^m_/, '');
        }
        g.edge(rangeId, hid, dir === 'read' ? 'READS' : 'WRITES',
          h.deviceRef ? edgeProps : undefined);
      }
    });
  }

  // --- machine configs ---
  const gfxDecodes = parseGfxDecodes(combined, consts);
  const machineConfigs = parseMachineConfigs(combined, memberTags, consts);
  const cfgByName = new Map(machineConfigs.map(c => [c.name, c]));
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
  for (const cfg of machineConfigs) {
    for (const dev of cfg.devices) {
      const devCls = deviceTypes[dev.type];
      if (!devCls || dev.clock === null) continue;
      const sub = machineConfigs.find(c => c.cls === devCls && c.name === 'device_add_mconfig');
      for (const sd of sub?.devices ?? []) {
        const clock = derivedDeviceClock(sd.clockExpr, dev.clock, consts);
        if (clock !== undefined) { sd.clock = clock; delete sd.clockExpr; }
      }
    }
  }
  for (const cfg of machineConfigs) {
    const cfgId = `machine:${cfg.cls}.${cfg.name}`;
    const cfgFunction = ast.findFunction(cfg.cls, cfg.name);
    const machineStart = ast.findFunctionInHierarchy(cfg.cls, 'machine_start');
    const installedHandlers = machineStart
      ? parseInstalledHandlers(machineStart.body, consts)
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
    g.node('MachineConfig', cfgId, {
      cls: cfg.cls,
      name: cfg.name,
      calls: cfg.calls,
      ...(perfectQuantum ? { perfectQuantum: true } : {}),
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
    const bankSources = [
      ...bankFunctions.flatMap(fn =>
        parseMemoryBanks(fn.body, memberTags, consts).map(bank => ({ bank, source: fn.span }))),
      ...overrideBankSources,
    ];
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
      const listId = `softlist:${list.name}`;
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
      );
    }
    for (const dev of cfg.devices) {
      // namespaced by class AND config name: every device-board class has a
      // config called device_add_mconfig, and different classes reuse tags
      // (m52/m62 audio boards both have an "iremsound" cpu)
      const devId = `device:${cfg.cls}.${cfg.name}/${dev.tag}`;
      const props: Record<string, PropValue> = {
        type: dev.type, tag: dev.tag, clock: dev.clock, config: dev.config,
        // The C++ classes DEFINE_DEVICE_TYPE gave this device type, most
        // derived first. Composition needs them to tell whose compiled
        // handlers a `m_member->method()` call belongs to when the device has
        // no executable core of its own and its methods are the board's
        // generated handlers (two unrelated devices both declare reset_w).
        ...(deviceTypes[dev.type]
          ? {
              cls: deviceTypes[dev.type],
              clsHierarchy: sourceClassHierarchy(ast, deviceTypes[dev.type]!),
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
        const values = splitMameArgs(call[2]!).map(value => evalExpr(value, consts));
        return values.every((value): value is number => value !== null)
          ? [`${call[1]}(${values.join(',')})`]
          : [];
      });
      if (configCalls.length) props.configCalls = configCalls;
      if (dev.clockExpr) props.clockExpr = dev.clockExpr;
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
        dev.clock ?? undefined,
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
        const sub = machineConfigs.find(c => c.cls === devCls && c.name === 'device_add_mconfig');
        if (sub) g.edge(devId, `machine:${sub.cls}.${sub.name}`, 'CALLS');
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

/**
 * Resolve a legacy MAME lifecycle override in base-first execution order.
 *
 * MACHINE_RESET_CALL_MEMBER is deliberately removed from the executable
 * handler body by the AST parser. Its source spelling still determines this
 * ordered plan, preventing the macro from becoming an unresolved runtime call.
 */
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
    const scanlines = evaluateTimerScanlines(
      ast,
      callback,
      reset,
      allocation.timer,
      constants,
    );
    if (!scanlines.length) continue;

    const callbackId = `callback:timer/${allocation.ownerClass}.${allocation.method}`;
    const props: Record<string, PropValue> = {
      ownerTag: allocation.timer.replace(/^m_/, ''),
      signal: 'timer',
      operation: 'adjust',
      targetClass: allocation.ownerClass,
      targetMethod: allocation.method,
      scanlines,
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

export function evaluateTimerScanlines(
  ast: MameAstIndex,
  callback: MameFunction,
  reset: MameFunction,
  timer: string,
  constants: Record<string, number>,
): number[] {
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
  if (resetProgram.diagnostics.length || callbackProgram.diagnostics.length) return [];

  executeGeneratedHandler(resetProgram, bindings);
  if (!Number.isFinite(adjustedLine)) return [];
  currentLine = Math.trunc(adjustedLine!);
  let currentParam = adjustedParam;
  const lines: number[] = [];
  for (let iteration = 0; iteration < 32; iteration++) {
    if (lines.includes(currentLine)) break;
    lines.push(currentLine);
    adjustedLine = undefined;
    executeGeneratedHandler(callbackProgram, bindings, { param: currentParam });
    if (!Number.isFinite(adjustedLine)) return [];
    currentLine = Math.trunc(adjustedLine!);
    currentParam = adjustedParam;
  }
  return lines.length > 1 ? lines : [];
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

const CALLBACK_OPERATIONS = new Set([
  'set', 'append', 'set_ioport', 'set_inputline', 'append_inputline', 'set_nop',
  'set_screen_update', 'set_vblank_int', 'set_periodic_int',
  'set_irq_acknowledge_callback',
  'set_maincpu', 'configure_scanline',
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
 * A device class and its MAME-declared base classes, most derived first.
 *
 * Only classes the parsed sources actually declare are listed; MAME's own
 * device_t roots are not part of any generated handler set.
 */
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

function emitCallbacks(
  g: GraphBuilder,
  ast: MameAstIndex,
  cfgFunction: MameFunction | undefined,
  devId: string,
  deviceTag: string,
  config: string[],
  memberTags: Record<string, string>,
  constants: Record<string, number>,
  deviceClock?: number,
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
          call.args.some(arg => /FUNC\s*\(/.test(arg)))
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
    const props: Record<string, PropValue> = {
      signal: signal.name,
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
      const hz = period ? attotimeFrequency(period, constants, deviceClock) : undefined;
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
      const targetArg = operation.args.find(arg =>
        /^m_\w+(?:\[\d+\])?$/.test(arg.trim()));
      const targetTag = targetArg ? memberTags[targetArg.trim()] : undefined;
      if (targetTag) {
        props.targetTag = targetTag;
        const target = findConfigDevice(targetTag);
        if (target) g.edge(callbackId, target.id, 'TARGETS_DEVICE');
      }
    }
  }
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
    for (const table of source.matchAll(
      /\bstatic\s+(?:(?:const|constexpr)\s+)+[\w:]+\s+(\w+)\s*\[[^\]]*\]\s*=\s*\{([^{}]+)\}\s*;/g,
    )) {
      if (!new RegExp(`\\b${table[1]}\\s*\\[`).test(body)) continue;
      const values = splitMameArgs(table[2]!).map(value => value.trim());
      if (body.includes(table[0])) body = body.replace(table[0], '');
      body = body.replace(
        new RegExp(`\\b${table[1]}\\s*\\[([^\\]]+)\\]`, 'g'),
        (_entry, index: string) => `TABLE(${index}, ${values.join(', ')})`,
      );
    }
  }
  const identifiers = new Set(body?.match(/\b[A-Za-z_]\w*\b/g) ?? []);
  const specializedConstants: Record<string, number> = {};
  const specialization = /_(-?\d+)$/.exec(method);
  if (fn && specialization) {
    const unit = ast.ast.units.find(candidate => candidate.file === fn.span.file);
    const prefix = unit?.source.slice(Math.max(0, fn.span.start - 256), fn.span.start) ?? '';
    const template = /template\s*<\s*(?:[\w:]+\s+)+(\w+)(?:\s*=\s*[^>]+)?\s*>\s*$/.exec(prefix);
    if (template && identifiers.has(template[1]!)) {
      specializedConstants[template[1]!] = Number(specialization[1]);
    }
  }
  const sourceConstants = Object.entries({ ...constants, ...specializedConstants })
    .filter(([name]) => identifiers.has(name))
    .map(([name, value]) => `${name}=${value}`);
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
    } : {}),
  };
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
  machineConfigs: { cls: string; name: string; devices: { tag: string; slotOptions?: string; slotDefault?: string }[] }[],
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

  for (const cfg of machineConfigs) {
    for (const dev of cfg.devices) {
      if (!dev.slotOptions || !dev.slotDefault) continue;
      const inputsId = resolve(dev.slotOptions, dev.slotDefault);
      if (!inputsId) continue;
      g.edge(`device:${cfg.cls}.${cfg.name}/${dev.tag}`, inputsId, 'USES_INPUTS', { option: dev.slotDefault });
    }
  }
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
        id !== rootGameId && id.startsWith('game:') &&
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
  // An override that chains to its base (tpp2_state::screen_vblank calls
  // tnx1_state::screen_vblank) needs both bodies live at once, and qualified
  // calls are not distinguished from virtual ones downstream, so those keep
  // the base implementation rather than recursing into themselves.
  const classRank = new Map<string, number>();
  for (const [index, configId] of configOrder.entries()) {
    const cls = String(nodes.find(node => node.id === configId)?.props.cls ?? '');
    if (cls && !classRank.has(cls)) classRank.set(cls, index);
  }
  const overriddenBy = edges.filter(edge => edge.rel === 'OVERRIDDEN_BY');
  if (overriddenBy.length) {
    const byId = new Map(nodes.map(node => [node.id, node]));
    const rehomed: typeof edges = [];
    for (const node of nodes) {
      if (node.label !== 'Handler') continue;
      const baseRank = classRank.get(String(node.props.ownerClass));
      if (baseRank === undefined) continue;
      const [chosen] = overriddenBy
        .filter(edge => edge.from === node.id)
        .map(edge => byId.get(edge.to))
        .filter(candidate => candidate !== undefined)
        .filter(candidate => (classRank.get(String(candidate.props.ownerClass)) ?? baseRank) < baseRank)
        .filter(candidate => !new RegExp(`\\w+::${node.props.method}\\s*\\(`)
          .test(String(candidate.props.sourceBody ?? '')))
        .sort((left, right) =>
          classRank.get(String(left.props.ownerClass))! -
          classRank.get(String(right.props.ownerClass))!);
      if (!chosen) continue;
      for (const prop of VIRTUAL_IMPLEMENTATION_PROPS) {
        if (chosen.props[prop] === undefined) delete node.props[prop];
        else node.props[prop] = chosen.props[prop];
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
