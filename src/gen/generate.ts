// Phase 2: knowledge-graph subgraph -> generated browser app.
// Emits categorized game data, MAME-derived executable modules, one shared
// runtime, and a small app shell. Everything game-specific comes from the graph.

import { mkdirSync, writeFileSync, cpSync, existsSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import type { KnowledgeGraph, KGNode } from '../kg/types.ts';
import { parseSoftwareList, buildCatalog } from '../kg/softlist.ts';
import {
  buildRuntimeReport, runtimeReportMarkdown, type RuntimeConfigShape,
} from './runtime-report.ts';
import {
  emitGeneratedMachine,
  lowerAudioRoutes,
  lowerAuxiliaryAudioDevices,
} from './emit-machine.ts';
import type { BoardConfig } from '../runtime/types.ts';
import type {
  GeneratedDiscreteDacPlan,
  GeneratedDiscreteEffectsPlan,
} from '../ir/audio-protocol.ts';
import { compileMameVideo, effectiveGfxDecodes } from '../mame/video-compiler.ts';
import {
  compileDiscreteDacAttenuator,
  compileDiscreteDacReferenceLevels,
  compileDiscreteEffects,
  compileDiscreteMixer,
  compileMameSpeakerFilter,
  compileNamco54Discrete,
  compilePoleposDiscrete,
} from '../mame/audio-compiler.ts';
import { mameDeviceRomSet, mameDeviceShortName } from '../mame/device-compiler.ts';
import { compileNesApu } from '../mame/nes-apu-compiler.ts';
import { MameAstIndex, parseMameAst } from '../mame/ast.ts';
import { compileSegaZ80RomTransform } from '../mame/sega-z80-compiler.ts';
import { compileDriverRomTransforms } from '../mame/driver-rom-compiler.ts';
import { capabilityForType, HARDWARE_CAPABILITIES } from '../hardware/registry.ts';
import { artworkDir, romsDir } from '../paths.ts';
import { cartArtIndex, type CartArt } from './cart-art.ts';
import {
  GAME_CATEGORIES,
  gameDataPath,
  gameOutputDir,
} from './output-layout.ts';
import {
  machineDossierMarkdown as renderDossierMarkdown,
  type DossierData,
} from './dossier.ts';
import { emitArchiveRoutes } from './archive.ts';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, '../..');

export interface GenerateOptions {
  mameSrc: string;
  outDir: string;
  game: string;
  /** full driver graph (all sets) — enables clone-family ROM alternates */
  fullGraph?: KnowledgeGraph;
}

// keyboard bindings per MAME input type (player 1 / non-cocktail only)
const KEYMAP: Record<string, string[]> = {
  IPT_JOYSTICK_LEFT: ['ArrowLeft'],
  IPT_JOYSTICK_RIGHT: ['ArrowRight'],
  IPT_JOYSTICK_UP: ['ArrowUp'],
  IPT_JOYSTICK_DOWN: ['ArrowDown'],
  // MAME names the two physical sticks independently on twin-stick panels.
  // Keep those keys distinct from the shared arrow-key joystick so a title
  // that combines ordinary movement with a second firing stick (Tutankham)
  // can drive both controls at once.
  IPT_JOYSTICKLEFT_LEFT: ['KeyA'],
  IPT_JOYSTICKLEFT_RIGHT: ['KeyD'],
  IPT_JOYSTICKLEFT_UP: ['KeyW'],
  IPT_JOYSTICKLEFT_DOWN: ['KeyS'],
  IPT_JOYSTICKRIGHT_LEFT: ['KeyJ'],
  IPT_JOYSTICKRIGHT_RIGHT: ['KeyL'],
  IPT_JOYSTICKRIGHT_UP: ['KeyI'],
  IPT_JOYSTICKRIGHT_DOWN: ['KeyK'],
  // NOTE: never bind Ctrl — macOS eats Ctrl+Arrow (Mission Control), which
  // force-releases left/right movement while firing (user directive)
  IPT_BUTTON1: ['Space', 'KeyX'],
  IPT_BUTTON2: ['KeyZ'],
  IPT_BUTTON3: ['KeyC'],
  IPT_START1: ['Digit1'],
  IPT_START2: ['Digit2'],
  IPT_COIN1: ['Digit5'],
  IPT_COIN2: ['Digit6'],
  IPT_SERVICE1: ['Digit9'],
  IPT_SERVICE2: ['Digit8'],
  IPT_SERVICE3: ['Digit7'],
  IPT_SERVICE4: ['Digit0'],
  // Analog cabinet controls. Absolute pedals use their source PORT_MINMAX
  // range; relative dials are expanded into left/right pulse bindings below.
  IPT_PEDAL: ['ArrowUp'],
  IPT_PEDAL2: ['ArrowDown'],
  // Cabinet operator buttons used by first-boot audits (Defender's ADVANCE
  // and HIGH SCORE RESET are the common case).
  IPT_SERVICE: ['F2'],
  IPT_MEMORY_RESET: ['F3'],
  // console pads (nes joypad: A=IPT_BUTTON2 -> KeyZ, B=IPT_BUTTON1 -> KeyX/Space)
  IPT_START: ['Enter'],
  IPT_SELECT: ['ShiftRight'],
};

// Games whose physical control order differs from the shared two-button
// convention. Keep these local: swapping the global X/Z mapping would silently
// change every established game and the NES pad.
const GAME_KEYMAP: Record<string, Record<string, string[]>> = {
  asteroid: {
    // Asteroids numbers its buttons by schematic input rather than by role.
    // Keep the cabinet controls intuitive while avoiding macOS-reserved
    // Ctrl+Arrow combinations: rotate on arrows, fire/thrust on X/Z, and
    // hyperspace on Space.
    IPT_BUTTON1: ['ArrowLeft'],
    IPT_BUTTON2: ['ArrowRight'],
    IPT_BUTTON3: ['KeyX'],
    IPT_BUTTON4: ['KeyZ'],
    IPT_BUTTON5: ['Space'],
  },
  bankp: {
    IPT_BUTTON1: ['KeyZ'],
    IPT_BUTTON2: ['KeyX'],
    IPT_BUTTON3: ['KeyC'],
  },
};

export function inputKeys(game: string, type: string): string[] | undefined {
  return GAME_KEYMAP[game]?.[type] ?? KEYMAP[type];
}

// Cart-slot options (mappers/PCBs) each runtime board family implements —
// a device-library capability table like CPU_TYPES, not a game fact. The
// softlist catalog carries every cart's slot; the app greys out the rest.
const CART_SLOT_SUPPORT: Record<string, string[]> = {
  nes: ['nrom', 'uxrom', 'cnrom', 'sxrom', 'txrom'], // iNES mappers 0, 2, 3, 1, 4
};

const CART_INTERFACE_BY_FAMILY: Record<string, string> = {
  nes: 'nes_cart',
};

// Explicitly supported cartridge titles (softlist parent short-names; clones
// of a listed parent count too). Playability is gated on THIS list, not just
// the mapper — titles are added one at a time as they're verified end-to-end
// (user directive 2026-07-07: "support explicit games, not all, so I can
// test"). The full catalog still identifies every cart on the shelf.
const CART_GAME_SUPPORT: Record<string, string[]> = {
  nes: ['smb'], // Super Mario Bros. (parent set; covers smb1 "World" etc.)
};

class Graph {
  private byId: Map<string, KGNode>;
  private g: KnowledgeGraph;
  constructor(g: KnowledgeGraph) {
    this.g = g;
    this.byId = new Map(g.nodes.map(n => [n.id, n]));
  }
  node(id: string): KGNode | undefined { return this.byId.get(id); }
  out(id: string, rel?: string) {
    return this.g.edges
      .filter(e => e.from === id && (!rel || e.rel === rel))
      .map(e => ({ edge: e, node: this.byId.get(e.to)! }))
      .filter(x => x.node);
  }
  byLabel(label: string): KGNode[] { return this.g.nodes.filter(n => n.label === label); }
}

function chunkTriples(values: number[]): [number, number, number][] {
  const triples: [number, number, number][] = [];
  for (let index = 0; index + 2 < values.length; index += 3) {
    triples.push([values[index]!, values[index + 1]!, values[index + 2]!]);
  }
  return triples;
}

/**
 * Lower the common NVRAM custom-handler shape used by arcade boards: clear a
 * share, then copy a source-declared byte table into its beginning. This is
 * power-on state, not a ROM patch; omitting it can leave bookkeeping/coinage
 * data invalid even though the game reaches attract mode.
 */
export function sourceNvramInitializers(
  devices: readonly KGNode[],
  mameSrc: string,
): { share: string; bytes?: number[]; fill?: number }[] {
  const result: { share: string; bytes?: number[]; fill?: number }[] = [];
  for (const device of devices.filter(node => node.props.type === 'NVRAM')) {
    const config = Array.isArray(device.props.config)
      ? device.props.config.map(String).join('\n')
      : String(device.props.config ?? '');
    // nvram_device applies this value before attempting to load a persisted
    // image. A generated board without persistence still needs the same cold
    // boot contents; several drivers use all-ones as an erased-memory marker.
    if (/\bNVRAM\s*\([^\n;]*\bDEFAULT_ALL_1\b/.test(config)) {
      result.push({ share: String(device.props.tag), fill: 0xff });
      continue;
    }
    const callback = /set_custom_handler\s*\(\s*FUNC\s*\(\s*(\w+)::(\w+)\s*\)\s*\)/
      .exec(config);
    const sourceFile = String(device.props.sourceFile ?? '');
    if (!callback || !sourceFile || !existsSync(join(mameSrc, sourceFile))) continue;
    const source = readFileSync(join(mameSrc, sourceFile), 'utf8');
    const ast = new MameAstIndex(parseMameAst([{ file: sourceFile, source }]));
    const fn = ast.findFunctionInHierarchy(callback[1]!, callback[2]!);
    if (!fn) continue;
    const table = /static\s+const\s+(?:u?int8_t|u8)\s+(\w+)\s*\[\s*(\d+)\s*\]\s*=\s*\{([\s\S]*?)\}\s*;/
      .exec(fn.body);
    if (!table) continue;
    const name = table[1]!;
    if (
      !new RegExp(`memset\\s*\\(\\s*data\\s*,\\s*(?:0x00|0)\\s*,\\s*size\\s*\\)`).test(fn.body) ||
      !new RegExp(`memcpy\\s*\\(\\s*data\\s*,\\s*${name}\\s*,\\s*sizeof\\s*\\(\\s*${name}\\s*\\)\\s*\\)`).test(fn.body)
    ) continue;
    const bytes = [...table[3]!.matchAll(/\b(?:0x[\da-f]+|\d+)\b/gi)]
      .map(match => Number(match[0]));
    if (bytes.length !== Number(table[2]) || bytes.some(value => value > 0xff)) continue;
    result.push({ share: String(device.props.tag), bytes });
  }
  return result;
}

export async function generate(graph: KnowledgeGraph, opts: GenerateOptions): Promise<void> {
  const g = new Graph(graph);
  const game = g.node(`game:${opts.game}`);
  if (!game) throw new Error(`game:${opts.game} missing from graph`);

  const machine = g.out(game.id, 'USES_MACHINE')[0]?.node;
  const romset = g.out(game.id, 'USES_ROMSET')[0]?.node;
  const inputs = g.out(game.id, 'USES_INPUTS')[0]?.node;
  if (!machine || !romset || !inputs) {
    throw new Error(`graph incomplete for ${opts.game}: machine=${!!machine} romset=${!!romset} inputs=${!!inputs}`);
  }

  // Board family selects the runtime board module. It defaults to the driver
  // file stem, but a single driver file can host several distinct boards
  // (galaga.cpp defines both galaga and digdug, with different maps/video/I/O).
  // A machine whose board differs from its file's default is remapped by name.
  const FAMILY_BY_MACHINE: Record<string, string> = { digdug: 'digdug' };
  const family = FAMILY_BY_MACHINE[String(machine.props.name)]
    ?? basename(String(graph.meta.driverFile)).replace(/\.cpp$/, '');

  // machine configs compose via helper calls (galaxian(config) -> galaxian_base(config));
  // walk the CALLS chain and collect devices from every config in it
  const devices: KGNode[] = [];
  /** set_addrmap patches in chain order (most-derived config first) */
  const mapPatches: { space: string; tag: string; mapId: string }[] = [];
  /** remove_addrmap operations in chain order (most-derived config first). */
  const mapRemovals: { space: string; tag: string }[] = [];
  const mapOperations: Array<
    { kind: 'set'; mapId: string; space: string; tag: string } |
    { kind: 'remove'; space: string; tag: string }
  > = [];
  /** SOFTWARE_LIST declarations (consoles/computers) in chain order */
  const softlistNodes: KGNode[] = [];
  /** Address-space handlers installed by machine_start in chain order. */
  const machineInstalledHandlers: Array<{
    space: string;
    kind: 'read' | 'write';
    start: number;
    end: number;
    mirror?: number;
    className: string;
    method: string;
  }> = [];
  {
    const seen = new Set<string>();
    const queue: { id: string; hostTag?: string }[] = [{ id: machine.id }];
    while (queue.length) {
      const { id, hostTag } = queue.shift()!;
      const visitKey = `${id}\0${hostTag ?? ''}`;
      if (seen.has(visitKey)) continue;
      seen.add(visitKey);
      for (const d of g.out(id, 'HAS_DEVICE')) {
        const rawTag = String(d.node.props.tag);
        // Devices installed by a composite device's machine config live in
        // that device's tag namespace in MAME, even when the graph reuses a
        // single Device node and therefore cannot reveal the collision by
        // counting declarations (for example Venture's two "pia" devices).
        const tag = hostTag && !rawTag.includes(':') ? `${hostTag}:${rawTag}` : rawTag;
        devices.push(tag === rawTag ? d.node : {
          ...d.node,
          props: { ...d.node.props, tag },
        });
        // board-style devices carry a sub-machine (device_add_mconfig)
        queue.push(...g.out(d.node.id, 'CALLS').map(c => ({
          id: c.node.id,
          hostTag: tag,
        })));
      }
      for (const p of g.out(id, 'PATCHES_MAP')) {
        mapPatches.push({
          space: String(p.edge.props?.space),
          tag: String(p.edge.props?.deviceTag),
          mapId: p.node.id,
        });
        mapOperations.push(Object.assign({ kind: 'set' as const, mapId: p.node.id }, {
          space: String(p.edge.props?.space),
          tag: String(p.edge.props?.deviceTag),
        }));
      }
      const removedAddrMaps = g.node(id)?.props.removedAddrMaps;
      for (const encoded of Array.isArray(removedAddrMaps)
        ? removedAddrMaps.map(String)
        : []) {
        const separator = encoded.indexOf('=');
        if (separator > 0) {
          const removal = { tag: encoded.slice(0, separator), space: encoded.slice(separator + 1) };
          mapRemovals.push(removal);
          mapOperations.push(Object.assign({ kind: 'remove' as const }, removal));
        }
      }
      softlistNodes.push(...g.out(id, 'HAS_SOFTLIST').map(s => s.node));
      const installed = g.node(id)?.props.installedHandlers;
      if (Array.isArray(installed)) {
        machineInstalledHandlers.push(...installed.map(value => JSON.parse(String(value))));
      }
      queue.push(...g.out(id, 'CALLS').map(c => ({
        id: c.node.id,
        ...(hostTag ? { hostTag } : {}),
      })));
    }
  }
  const kind: 'console' | undefined = game.props.kind === 'console' ? 'console' : undefined;
  const category = game.props.kind === 'arcade' ? 'arcade' : 'consoles';
  const dataPath = gameDataPath(category, opts.game);
  const byTag = new Map(devices.map(d => [String(d.props.tag), d]));

  // --- cpus + address maps ----------------------------------------------------
  // Every CPU carries its own program map (and io map when the driver has
  // one). Device type -> runtime core is a device-library mapping.
  const CPU_TYPES: Record<string, string> = { Z80: 'z80', Z8002: 'z8002', KONAMI: 'konami', KONAMI1: 'konami1', I8035: 'i8035', I8039: 'i8039', MB8884: 'mb8884', M58715: 'm58715', I8080: 'i8080', I8085A: 'i8085a', I8088: 'i8088', V30: 'v30', M6502: 'm6502', M6801U4: 'm6801u4', M6802: 'm6802', M6803: 'm6803', M6808: 'm6808', M68000: 'm68000', M68010: 'm68010', NSC8105: 'nsc8105', MC6809: 'mc6809', MC6809E: 'mc6809e', HD6309E: 'hd6309e', HD63701Y0: 'hd63701y0', RP2A03: 'rp2a03', RP2A03G: 'rp2a03', SEGA_315_5098: 'sega_315_5098', SEGA_315_5177: 'sega_315_5177' };
  // ROM windows installed by a CPU's own internal address map. They do not
  // appear in the driver's set_addrmap graph, but still map DEVICE_SELF ROM.
  const CPU_INTERNAL_ROM: Record<string, { start: number; end: number; romOffset: number }> = {
    HD63701Y0: { start: 0xc000, end: 0xffff, romOffset: 0 },
  };
  const cpuDevs = devices.filter(d => String(d.props.type) in CPU_TYPES);
  if (cpuDevs.length === 0) throw new Error('no supported CPU devices found in machine config');

  // address maps compose via helper calls too (galaxian_map = base + discrete);
  // flatten ranges depth-first in statement order
  const collectRanges = (mapId: string, seen = new Set<string>()): KGNode[] => {
    if (seen.has(mapId)) return [];
    seen.add(mapId);
    const own = g.out(mapId, 'HAS_RANGE').map(r => r.node);
    const called = g.out(mapId, 'INCLUDES_MAP').flatMap(m => collectRanges(m.node.id, seen));
    return [...called, ...own];
  };
  const inheritedGlobalMask = (
    mapId: string,
    seen = new Set<string>(),
  ): number | undefined => {
    if (seen.has(mapId)) return undefined;
    seen.add(mapId);
    const map = g.node(mapId);
    if (map?.props.globalMask !== undefined) return Number(map.props.globalMask);
    for (const included of g.out(mapId, 'INCLUDES_MAP')) {
      const mask = inheritedGlobalMask(included.node.id, seen);
      if (mask !== undefined) return mask;
    }
    return undefined;
  };

  const handlerKey = (
    h: { edge: { props?: Record<string, unknown> }; node: KGNode },
    ownerTag?: string,
  ) => {
    const rawTag = h.edge.props?.deviceTag;
    let tag = rawTag === undefined ? undefined : String(rawTag);
    if (tag && ownerTag?.includes(':') && !tag.includes(':')) {
      const namespace = ownerTag.slice(0, ownerTag.lastIndexOf(':'));
      const scoped = `${namespace}:${tag}`;
      if (byTag.has(scoped)) tag = scoped;
    }
    if (tag && !byTag.has(tag)) {
      const matches = [...byTag.keys()].filter(candidate => candidate.endsWith(`:${tag}`));
      if (matches.length === 1) tag = matches[0];
    }
    const owner = tag ?? String(h.node.props.ownerClass);
    return `${owner}.${h.node.props.method}`;
  };
  const rangeSpec = (r: KGNode, ownerTag?: string) => {
    const reads = g.out(r.id, 'READS');
    const writes = g.out(r.id, 'WRITES');
    const raw = String(r.props.raw ?? '');
    const spec: Record<string, unknown> = {
      start: Number(r.props.start),
      end: Number(r.props.end),
      kind: r.props.rom
        ? 'rom'
        : r.props.ram || r.props.readonly || r.props.writeonly
          ? 'ram'
          : 'handler',
    };
    if (r.props.mirror) spec.mirror = Number(r.props.mirror);
    const select = /\.select\s*\(\s*(0x[\da-f]+|\d+)\s*\)/i.exec(raw);
    if (select) spec.select = Number(select[1]);
    if (r.props.regionOffset !== undefined) spec.romOffset = Number(r.props.regionOffset);
    if (r.props.share) spec.share = String(r.props.share);
    if (r.props.viewTag) spec.viewTag = String(r.props.viewTag);
    if (r.props.viewEntry !== undefined) spec.viewEntry = Number(r.props.viewEntry);
    if (r.props.readonly || r.props.nopw) spec.readOnly = true;
    if (r.props.writeonly || r.props.nopr) spec.writeOnly = true;
    if (reads[0]) spec.read = handlerKey(reads[0], ownerTag);
    if (writes[0]) {
      spec.write = handlerKey(writes[0], ownerTag);
      const sourceBody = String(writes[0].node.props.sourceBody ?? '');
      if (handlerOwnsSharedRam(sourceBody, String(r.props.share ?? ''))) {
        spec.writeHandlerOwnsRam = true;
      }
    }
    // .portr("IN0") -> read handler key "port.IN0" (boards register these from InputPorts)
    if (r.props.portRead) spec.read = `port.${r.props.portRead}`;
    if (r.props.portWrite) spec.write = `port.${r.props.portWrite}`;
    // .bankr(m_mainbank) -> "bank.mainbank" (the board owns bank switching)
    if (r.props.bankRead) spec.read = `bank.${r.props.bankRead}`;
    if (r.props.bankWrite) spec.write = `bank.${r.props.bankWrite}`;
    // MAME embeds the MOS6532's RAM and register maps with `.m(...)`. Preserve
    // those source-declared submaps as executable device handlers instead of
    // collapsing them to NOP ranges. Composite-device tags inherit their
    // owning CPU's namespace (soundbd:audiocpu -> soundbd:riot).
    const riotSubmap = /\.m\s*\(\s*(m_)?([\w:]+)\s*,\s*FUNC\s*\(\s*mos6532_device::(ram_map|io_map)\s*\)\s*\)/
      .exec(raw);
    if (riotSubmap) {
      const localTag = riotSubmap[2]!;
      const namespace = ownerTag?.includes(':')
        ? ownerTag.slice(0, ownerTag.lastIndexOf(':'))
        : undefined;
      const scopedTag = namespace && byTag.has(`${namespace}:${localTag}`)
        ? `${namespace}:${localTag}`
        : localTag;
      const method = riotSubmap[3] === 'ram_map' ? 'ram' : 'io';
      spec.kind = 'handler';
      spec.read = `${scopedTag}.${method}_read`;
      spec.write = `${scopedTag}.${method}_write`;
    }
    if (spec.kind === 'handler' && !spec.read && !spec.write) spec.kind = 'nop';
    return spec;
  };

  const cpuMaps = (dev: KGNode) => {
    // a set_addrmap patch from the game's config chain (most-derived first)
    // overrides the map set at device instantiation
    const mapRefs = g.out(dev.id, 'HAS_MAP');
    const forSpace = (space: string): KGNode | undefined => {
      const operation = mapOperations.find(candidate =>
        candidate.tag === String(dev.props.tag) && candidate.space === space);
      if (operation?.kind === 'set') return g.node(operation.mapId);
      if (operation?.kind === 'remove') return undefined;
      return mapRefs.find(m => (m.edge.props?.space ?? 'AS_PROGRAM') === space)?.node;
    };
    const programMap = forSpace('AS_PROGRAM');
    if (!programMap && dev.props.type !== 'M6801U4') {
      throw new Error(`no address map on ${dev.props.tag}`);
    }
    const rangeNodes = programMap ? collectRanges(programMap.id) : [];
    const driverRanges = programMap
      ? rangeNodes.map(range => rangeSpec(range, String(dev.props.tag)))
      : [{ start: 0xf000, end: 0xffff, kind: 'rom', romOffset: 0 }];
    const internalRom = CPU_INTERNAL_ROM[String(dev.props.type)];
    const ranges = internalRom && !driverRanges.some(range =>
      range.kind === 'rom' && Number(range.start) <= internalRom.start &&
      Number(range.end) >= internalRom.end)
      ? [...driverRanges, { ...internalRom, kind: 'rom' }]
      : driverRanges;
    const explicitRegions = [...new Set(
      rangeNodes
        .map(range => range.props.region)
        .filter((region): region is string => typeof region === 'string' && region.length > 0),
    )];
    // program-space global_mask (the Irem sound 6803 masks to 0x7fff so its
    // reset vector at $FFFE reads ROM $7FFE)
    const mask = programMap ? inheritedGlobalMask(programMap.id) : undefined;
    const opcodeMap = forSpace('AS_OPCODES');
    let opcode: Record<string, unknown> | undefined;
    if (opcodeMap) {
      const opcodeRanges = collectRanges(opcodeMap.id)
        .map(range => rangeSpec(range, String(dev.props.tag)));
      opcode = {
        ranges: opcodeRanges,
        region: opcodeRanges.find(range => range.share)?.share ?? String(dev.props.tag),
      };
      const opcodeMask = inheritedGlobalMask(opcodeMap.id);
      if (opcodeMask !== undefined) opcode.globalMask = opcodeMask;
    }
    const ioMap = forSpace('AS_IO');
    let io: Record<string, unknown> | undefined;
    if (ioMap) {
      io = {
        ranges: collectRanges(ioMap.id)
          .map(range => rangeSpec(range, String(dev.props.tag))),
      };
      const ioMask = inheritedGlobalMask(ioMap.id);
      if (ioMask !== undefined) io.globalMask = ioMask;
    }
    return {
      ranges,
      ...(mask !== undefined ? { mask } : {}),
      ...(opcode ? { opcode } : {}),
      io,
      ...(explicitRegions.length === 1 ? { region: explicitRegions[0] } : {}),
    };
  };

  const cpus = cpuDevs.map(d => {
    const maps = cpuMaps(d);
    const installedHandlers = Array.isArray(game.props.installedHandlers)
      ? game.props.installedHandlers.map(value => JSON.parse(String(value)) as {
          space: string;
          kind: 'read' | 'write';
          start: number;
          end: number;
          mirror?: number;
          className: string;
          method: string;
        })
      : [];
    installedHandlers.push(...machineInstalledHandlers);
    const programInstalls = String(d.props.tag) === 'maincpu'
      ? installedHandlers.filter(handler => handler.space === 'AS_PROGRAM')
      : [];
    const ioInstalls = String(d.props.tag) === 'maincpu'
      ? installedHandlers.filter(handler => handler.space === 'AS_IO')
      : [];
    const existingIoRanges = Array.isArray(maps.io?.ranges) ? maps.io.ranges : [];
    return {
      tag: String(d.props.tag),
      type: CPU_TYPES[String(d.props.type)],
      clock: Number(d.props.clock),
      region: maps.region ?? String(d.props.tag),
      ...maps,
      ...(programInstalls.length ? {
        ranges: [
          ...maps.ranges,
          ...programInstalls.map(handler => ({
            start: handler.start,
            end: handler.end,
            kind: 'handler' as const,
            ...(handler.mirror !== undefined ? { mirror: handler.mirror } : {}),
            [handler.kind]: `${handler.className}.${handler.method}`,
          })),
        ],
      } : {}),
      ...(ioInstalls.length ? {
        io: {
          ...(maps.io ?? {}),
          ranges: [
            ...existingIoRanges,
            ...ioInstalls.map(handler => ({
              start: handler.start,
              end: handler.end,
              kind: 'handler' as const,
              ...(handler.mirror !== undefined ? { mirror: handler.mirror } : {}),
              [handler.kind]: `${handler.className}.${handler.method}`,
            })),
          ],
        },
      } : {}),
    };
  });

  if (family === 'neogeo') {
    const main = cpus.find(cpu => cpu.tag === 'maincpu');
    if (main) {
      // set_slot_idx installs the fixed cartridge window and its initial 1 MiB
      // bank dynamically. Fixed arcade carts select slot zero at machine start;
      // expressing those source-owned installs as ranges lets the generated
      // bus execute the BIOS-to-cartridge handoff before dynamic bank changes.
      main.ranges = [
        {
          start: 0x000080,
          end: 0x0fffff,
          kind: 'rom' as const,
          region: 'cslot1:maincpu',
          romOffset: 0x80,
        },
        {
          start: 0x200000,
          end: 0x2fffff,
          kind: 'rom' as const,
          region: 'cslot1:maincpu',
          romOffset: 0x100000,
        },
        ...main.ranges,
        {
          start: 0x000000,
          end: 0x00007f,
          kind: 'rom' as const,
          region: 'mainbios',
          romOffset: 0,
        },
      ];
    }
  }

  // legacy alias: boards for single-map families read cpus[n].ranges; the
  // shared `ranges` field mirrors cpu[0] for the galaga family's shared map
  const ranges = cpus[0].ranges;
  const io = cpus[0].io;

  // --- screen ------------------------------------------------------------------
  // Arcade drivers use set_raw; consoles (nes.cpp) use the
  // set_refresh_hz/set_size/set_visarea trio instead.
  const screenDev = devices.find(d => d.props.type === 'SCREEN');
  const raw = screenDev?.props.screenRaw as number[] | undefined;
  let pixclock: number, htotal: number, hbend: number, hbstart: number, vtotal: number, vbend: number, vbstart: number;
  if (raw) {
    [pixclock, htotal, hbend, hbstart, vtotal, vbend, vbstart] = raw;
  } else if (screenDev?.props.screenRefreshHz && screenDev.props.screenSize && screenDev.props.screenVisarea) {
    const [w] = screenDev.props.screenSize as number[];
    const [x0, x1, y0, y1] = screenDev.props.screenVisarea as number[];
    vtotal = (screenDev.props.screenSize as number[])[1];
    hbend = x0; hbstart = x1 + 1;
    vbend = y0; vbstart = y1 + 1;
    htotal = w;
    pixclock = Number(screenDev.props.screenRefreshHz) * htotal * vtotal;
  } else {
    throw new Error('screen raw params missing');
  }

  // the galaxian driver renders horizontally pre-scaled (GFXDECODE_SCALE
  // xscale 3, h params scaled to match); divide back to native pixels
  let xscale = 1;
  {
    for (const dec of effectiveGfxDecodes(graph, machine.id)) {
      for (const { node: e } of g.out(dec.id, 'HAS_ENTRY')) {
        xscale = Math.max(xscale, Number(e.props.xscale ?? 1));
      }
    }
    if (xscale === 1) {
      const screenCallback = graph.nodes.find(node =>
        node.label === 'Callback' && node.props.signal === 'set_screen_update');
      const screenHandler = graph.nodes.find(node =>
        node.label === 'Handler' &&
        node.props.ownerClass === screenCallback?.props.targetClass &&
        node.props.method === screenCallback?.props.targetMethod);
      const body = String(screenHandler?.props.sourceBody ?? '');
      const values = Object.fromEntries(
        (Array.isArray(screenHandler?.props.sourceConstants)
          ? screenHandler.props.sourceConstants
          : [])
          .map(value => /^([^=]+)=(-?(?:\d+(?:\.\d+)?|Infinity))$/.exec(String(value)))
          .filter((match): match is RegExpExecArray => Boolean(match))
          .map(match => [match[1], Number(match[2])]),
      );
      for (const [name, value] of Object.entries(values)) {
        if (
          value > 1 &&
          body.includes(`cliprect.min_x / ${name}`) &&
          body.includes(`x * ${name}`)
        ) {
          xscale = Math.max(xscale, value);
        }
      }
    }
  }

  const monitor = String(game.props.monitor);
  const screen = {
    width: (hbstart - hbend) / xscale,
    height: vbstart - vbend,
    xOffset: hbend / xscale,
    yOffset: vbend,
    refresh: pixclock / (htotal * vtotal),
    vtotal,
    vbstart,
    vbend,
    updateMode: (screenDev?.props.screenVideoAttributes as string[] | undefined)
      ?.includes('VIDEO_UPDATE_SCANLINE')
      ? 'scanline' as const
      : graph.nodes.some(node =>
          node.label === 'Handler' &&
          String(node.props.sourceBody ?? '').includes('update_partial('))
        ? 'partial' as const
        : 'frame' as const,
    rotate: monitor === 'ROT90' ? 90 : monitor === 'ROT270' ? 270 : monitor === 'ROT180' ? 180 : 0,
  };

  // --- clocks + sound -------------------------------------------------------------
  const clocks = {
    namco06: Number(byTag.get('06xx')?.props.clock ?? 48000),
    wsg: Number(byTag.get('namco')?.props.clock ?? 96000),
  };
  // sound device -> runtime SoundCore kind (device-library mapping, not game-specific)
  const ayChips = devices.filter(d =>
    ['AY8910', 'AY8912', 'YM2149'].includes(String(d.props.type)));
  const ayRoutes = lowerAudioRoutes(
    graph,
    ayChips.map(device => ({ id: device.id, tag: String(device.props.tag) })),
  );
  let auxiliaryAudioDevices = lowerAuxiliaryAudioDevices(
    graph,
    devices.map(device => ({
      id: device.id,
      tag: String(device.props.tag),
      type: String(device.props.type),
      ...(configuredDeviceMember(device.props)
        ? { member: configuredDeviceMember(device.props) }
        : {}),
      ...(typeof device.props.clock === 'number' ? { clock: device.props.clock } : {}),
    })),
  );
  auxiliaryAudioDevices = auxiliaryAudioDevices.map(device => {
    const referenceTag = device.referenceControl?.deviceTag;
    if (!referenceTag) return device;
    const referenceDevice = devices.find(candidate => candidate.props.tag === referenceTag);
    const config = Array.isArray(referenceDevice?.props.config)
      ? referenceDevice.props.config.map(String).join('\n')
      : '';
    const netlist = /\bDISCRETE\s*\([^,]+,[^,]+,\s*(\w+)\s*\)/.exec(config)?.[1];
    const referenceLevels = netlist
      ? compileDiscreteDacReferenceLevels(opts.mameSrc, String(graph.meta.driverFile), netlist)
      : undefined;
    return referenceLevels ? { ...device, referenceLevels } : device;
  });
  const ymChips = devices.filter(d =>
    d.props.type === 'YM2203' || d.props.type === 'YM2610');
  const ym2610SampleRegion = g.out(romset.id, 'HAS_REGION')
    .map(({ node: region }) => String(region.props.tag))
    .find(region => region.endsWith(':ymsnd:adpcma'));
  const opmChips = devices.filter(d => d.props.type === 'YM2151');
  const oplChips = devices.filter(d => d.props.type === 'YM3526');
  const snChips = devices.filter(d =>
    ['SN76496', 'SN76489', 'SN76489A', 'SN76494', 'SN94624', 'NCR8496', 'PSSJ3',
      'GAMEGEAR', 'SEGAPSG'].includes(String(d.props.type)));
  const dacChips = devices.filter(d =>
    ['DAC_1BIT', 'DAC_4BIT_R2R', 'DAC_8BIT_R2R', 'MC1408', 'AD7533',
      'NETLIST_INT_INPUT']
      .includes(String(d.props.type)));
  const sampleChips = devices.filter(d => d.props.type === 'SAMPLES');
  const berzerkSound = devices.find(d =>
    d.props.type === 'EXIDY' || d.props.type === 'EXIDY_VENTURE');
  const discreteDevice = devices.some(device => device.props.type === 'DISCRETE')
    ? devices.find(device => {
        const type = String(device.props.type);
        return type.endsWith('_AUDIO') || type.endsWith('_SOUND');
      })
    : undefined;
  const sound = devices.some(d => String(d.props.type).startsWith('RP2A03'))
    // the NES APU lives on the CPU die — the RP2A03 is its own sound device
    ? { kind: 'nes', clock: cpus[0].clock }
    : devices.some(d => ['NAMCO_WSG', 'POLEPOS_WSG', 'NAMCO'].includes(String(d.props.type)))
    ? {
        kind: 'wsg',
        clock: Number(byTag.get('namco')?.props.clock ?? 96000),
        waveRegion: 'namco',
        ...(devices.some(device => device.props.type === 'POLEPOS_SOUND')
          ? { sampleRegion: 'engine', worklet: 'polepos-wsg' }
          : {}),
        ...(auxiliaryAudioDevices.length ? { auxiliaryDevices: auxiliaryAudioDevices } : {}),
      }
    : opmChips.length
      ? {
          kind: 'ym2151',
          clock: Number(opmChips[0]!.props.clock),
          chips: opmChips.length,
          ...(lowerAudioRoutes(
            graph,
            opmChips.map(device => ({ id: device.id, tag: String(device.props.tag) })),
          ).length ? {
              routes: lowerAudioRoutes(
                graph,
                opmChips.map(device => ({ id: device.id, tag: String(device.props.tag) })),
              ),
            } : {}),
          ...(auxiliaryAudioDevices.length
            ? { auxiliaryDevices: auxiliaryAudioDevices }
            : {}),
          ...(auxiliaryAudioDevices.some(device => device.type === 'OKIM6295')
            ? { sampleRegion: auxiliaryAudioDevices.find(device =>
                device.type === 'OKIM6295')!.deviceTag }
            : {}),
        }
    : ymChips.length || oplChips.length
      ? (() => {
          const ymRoutes = lowerAudioRoutes(
            graph,
            ymChips.map(device => ({ id: device.id, tag: String(device.props.tag) })),
          );
          return {
            kind: 'ym2203',
            clock: Number((ymChips[0] ?? oplChips[0]).props.clock),
            chips: ymChips.length,
            ...(ymChips.length ? { deviceType: String(ymChips[0]!.props.type) } : {}),
            ...(ymChips.some(chip => chip.props.type === 'YM2610') && ym2610SampleRegion
              ? { sampleRegion: ym2610SampleRegion }
              : {}),
            ...(ymRoutes.length ? { routes: ymRoutes } : {}),
            ...(auxiliaryAudioDevices.length
              ? { auxiliaryDevices: auxiliaryAudioDevices }
              : {}),
          };
        })()
      : ayChips.length
        ? {
            kind: 'ay8910',
            clock: Number(ayChips[0].props.clock),
            chips: ayChips.length,
            deviceTags: ayChips.map(chip => String(chip.props.tag)),
            ...(ayRoutes.length ? { routes: ayRoutes } : {}),
            ...(auxiliaryAudioDevices.length
              ? { auxiliaryDevices: auxiliaryAudioDevices }
              : {}),
          }
        : snChips.length
          ? (() => {
              const snRoutes = lowerAudioRoutes(
                graph,
                snChips.map(device => ({ id: device.id, tag: String(device.props.tag) })),
              );
              return {
                kind: 'sn76489',
                clock: Number(snChips[0].props.clock),
                chips: snChips.length,
                ...(snRoutes.length ? { routes: snRoutes } : {}),
              };
            })()
          : dacChips.length && !(sampleChips.length && dacChips.every(device =>
              device.props.type === 'DAC_1BIT'))
            ? {
                kind: 'dac',
                clock: cpus.find(cpu => /sound|audio/.test(cpu.tag))?.clock ?? cpus[0].clock,
                chips: dacChips.length,
                routes: lowerAudioRoutes(
                  graph,
                  dacChips.map(device => ({ id: device.id, tag: String(device.props.tag) })),
                ),
                ...(auxiliaryAudioDevices.length
                  ? { auxiliaryDevices: auxiliaryAudioDevices }
                  : {}),
              }
        : berzerkSound
          ? {
              kind: berzerkSound.props.type === 'EXIDY_VENTURE' ? 'exidy' : 'berzerk',
              deviceType: String(berzerkSound.props.type),
              clock: Number(berzerkSound.props.clock) ||
                cpus.find(cpu => /sound|audio/.test(cpu.tag))?.clock ||
                cpus[0].clock,
              worklet: 'berzerk-sound',
              ...(devices.some(device => device.props.type === 'S14001A')
                ? { sampleRegion: 'speech' }
                : {}),
            }
        : sampleChips.length
          ? {
              kind: 'samples',
              clock: cpus[0].clock,
              chips: sampleChips.length,
            }
        : discreteDevice
          ? {
              kind: 'discrete',
              clock: cpus[0].clock,
              worklet: String(discreteDevice.props.type).toLowerCase().replace(/_/g, '-'),
            }
    : { kind: 'none' };
  const nesApu = sound.kind === 'nes' ? compileNesApu(opts.mameSrc) : undefined;
  // The post-mix level belongs to the sound family's capability package, so
  // the shell reads it from the generated config instead of keeping a table
  // that every new family would have to be added to.
  const poleposWsgDevices = devices.filter(device => device.props.type === 'POLEPOS_WSG');
  const routedWsgGain = lowerAudioRoutes(
    graph,
    poleposWsgDevices.map(device => ({ id: device.id, tag: String(device.props.tag) })),
  )[0]?.gain;
  const soundGain = sound.kind === 'ay8910' && auxiliaryAudioDevices.some(device =>
    (device.referenceLevels?.length ?? 0) > 0)
    ? 1
    : routedWsgGain !== undefined
    ? routedWsgGain
    : devices
    .map(device => capabilityForType(HARDWARE_CAPABILITIES, String(device.props.type)))
    .find(capability => capability?.masterGain !== undefined)?.masterGain;
  if (soundGain !== undefined) Object.assign(sound, { masterGain: soundGain });

  const discreteNetlist = devices
    .filter(device => device.props.type === 'DISCRETE')
    .flatMap(device => Array.isArray(device.props.config) ? device.props.config : [])
    .map(String)
    .map(value => /\bDISCRETE\s*\([^,]+,[^,]+,\s*(\w+)\s*\)/.exec(value)?.[1])
    .find((value): value is string => Boolean(value));
  if (sound.kind === 'none' && discreteNetlist) {
    const sourceFiles = [
      String(graph.meta.driverFile),
      ...graph.nodes
        .filter(node => node.label === 'SourceFile')
        .map(node => String(node.props.path)),
    ];
    const discreteDac = compileDiscreteDacAttenuator(
      opts.mameSrc,
      sourceFiles,
      discreteNetlist,
    );
    if (discreteDac) {
      Object.assign(sound, {
        kind: 'discrete',
        clock: cpus[0].clock,
        worklet: '../../hardware/discrete-dac/discrete-dac',
        discreteDac,
      });
    } else {
      const discreteEffects = compileDiscreteEffects(
        opts.mameSrc,
        sourceFiles,
        discreteNetlist,
      );
      if (discreteEffects) {
        Object.assign(sound, {
          kind: 'discrete',
          clock: cpus[0].clock,
          worklet: '../../hardware/discrete-effects/discrete-effects',
          discreteEffects,
        });
      }
    }
  }
  if (sound.kind === 'wsg' && discreteNetlist) {
    const poleposWsg = devices.some(device => device.props.type === 'POLEPOS_WSG');
    Object.assign(sound, {
      auxiliary: (poleposWsg ? compilePoleposDiscrete : compileNamco54Discrete)(
        opts.mameSrc,
        String(graph.meta.driverFile),
        discreteNetlist,
      ),
    });
  }
  if (sound.kind === 'ay8910' && discreteNetlist) {
    const discreteMixer = compileDiscreteMixer(
      opts.mameSrc,
      [
        String(graph.meta.driverFile),
        ...graph.nodes
          .filter(node => node.label === 'SourceFile')
          .map(node => String(node.props.path)),
      ],
      discreteNetlist,
    );
    if (discreteMixer) Object.assign(sound, { discreteMixer });
  }
  if (sound.kind !== 'none') {
    Object.assign(sound, {
      speakerFilter: compileMameSpeakerFilter(opts.mameSrc),
    });
  }

  // --- roms ----------------------------------------------------------------------
  // Clone-family alternates: MAME renames/redumps program ROMs across
  // revisions (current "gng" wants mm_c_04; a classic set carries gg4.bin
  // with a different CRC — both are real Ghosts'n Goblins). Any sibling
  // set's chip occupying the same region/offset/size slot is an acceptable
  // alternative, derived entirely from the driver's other ROM_START blocks.
  const altSlots = new Map<string, { file: string; crc: string }[]>();
  if (opts.fullGraph) {
    const full = new Graph(opts.fullGraph);
    const gameId = `game:${opts.game}`;
    const parentId = full.out(gameId, 'CLONE_OF')[0]?.node.id ?? gameId;
    const family = opts.fullGraph.nodes.filter(n =>
      n.label === 'Game' && n.id !== gameId &&
      (n.id === parentId || full.out(n.id, 'CLONE_OF')[0]?.node.id === parentId));
    for (const sib of family) {
      const sibSet = full.out(sib.id, 'USES_ROMSET')[0]?.node;
      if (!sibSet) continue;
      for (const { node: region } of full.out(sibSet.id, 'HAS_REGION')) {
        for (const { node: rom } of full.out(region.id, 'LOADS')) {
          const key = `${region.props.tag}/${rom.props.offset}/${rom.props.size}`;
          (altSlots.get(key) ?? altSlots.set(key, []).get(key)!)
            .push({ file: String(rom.props.file), crc: String(rom.props.crc) });
        }
      }
    }
  }
  const parentGame = g.out(`game:${opts.game}`, 'CLONE_OF')[0]?.node;
  const biosRomSet = parentGame && String(parentGame.props.flags ?? '').includes('MACHINE_IS_BIOS_ROOT')
    ? g.out(parentGame.id, 'USES_ROMSET')[0]?.node
    : undefined;
  const inheritedBiosSet = (region: KGNode): string | undefined => {
    if (!biosRomSet) return undefined;
    const parentRegion = g.out(biosRomSet.id, 'HAS_REGION')
      .map(edge => edge.node)
      .find(candidate => candidate.props.tag === region.props.tag);
    if (!parentRegion) return undefined;
    const parentLoads = g.out(parentRegion.id, 'LOADS').map(edge => edge.node);
    const loads = g.out(region.id, 'LOADS').map(edge => edge.node);
    if (!loads.length || !loads.every(load => parentLoads.some(parent =>
      parent.props.file === load.props.file &&
      parent.props.crc === load.props.crc &&
      parent.props.offset === load.props.offset &&
      parent.props.size === load.props.size))) return undefined;
    return String(biosRomSet.props.name);
  };
  const roms = g.out(romset.id, 'HAS_REGION').map(({ node: region }) => ({
    region: String(region.props.tag),
    size: Number(region.props.size),
    ...(inheritedBiosSet(region) ? { romSet: inheritedBiosSet(region) } : {}),
    ...(String(region.props.flags).includes('ROMREGION_ERASEFF') ? { fill: 0xff } : {}),
    ...(String(region.props.flags).includes('ROMREGION_INVERT') ? { invert: true } : {}),
    ...(region.props.fills ? {
      fills: chunkTriples(region.props.fills as number[]).map(
        ([offset, size, value]) => ({ offset, size, value }),
      ),
    } : {}),
    loads: g.out(region.id, 'LOADS').map(({ node: rom }) => {
      const crc = String(rom.props.crc);
      const alts = (altSlots.get(`${region.props.tag}/${rom.props.offset}/${rom.props.size}`) ?? [])
        .filter((a, i, arr) => a.crc !== crc && arr.findIndex(x => x.crc === a.crc) === i);
      return {
        file: String(rom.props.file),
        offset: Number(rom.props.offset),
        size: Number(rom.props.size),
        crc,
        ...(alts.length ? { alt: alts } : {}),
        ...(rom.props.reloadOffsets ? { reloadOffsets: rom.props.reloadOffsets as number[] } : {}),
        ...(rom.props.groupSize ? { groupSize: Number(rom.props.groupSize) } : {}),
        ...(rom.props.skip ? { skip: Number(rom.props.skip) } : {}),
        ...(rom.props.reverse ? { reverse: true } : {}),
        ...(rom.props.nibbleShift !== undefined
          ? { nibbleShift: Number(rom.props.nibbleShift) as 0 | 4 }
          : {}),
        ...(rom.props.continueSegments ? {
          continueSegments: chunkTriples(rom.props.continueSegments as number[]).map(
            ([offset, size, fileOffset]) => ({ offset, size, fileOffset }),
          ),
        } : {}),
        ...(rom.props.status ? { status: rom.props.status as 'nodump' | 'baddump' } : {}),
      };
    }),
  }));
  // BIOS-root parents contribute board ROM regions that cartridge sets do not
  // repeat (Neo Geo's main BIOS and initial Z80 BIOS window). Duplicate parent
  // regions are already recognized above and loaded from the BIOS zip; append
  // only parent-only regions that contain physical chips.
  if (biosRomSet) {
    const present = new Set(roms.map(region => region.region));
    for (const { node: region } of g.out(biosRomSet.id, 'HAS_REGION')) {
      const tag = String(region.props.tag);
      const loads = g.out(region.id, 'LOADS').map(({ node: rom }) => ({
        file: String(rom.props.file),
        offset: Number(rom.props.offset),
        size: Number(rom.props.size),
        crc: String(rom.props.crc),
        ...(rom.props.reloadOffsets ? { reloadOffsets: rom.props.reloadOffsets as number[] } : {}),
        ...(rom.props.groupSize ? { groupSize: Number(rom.props.groupSize) } : {}),
        ...(rom.props.skip ? { skip: Number(rom.props.skip) } : {}),
        ...(rom.props.reverse ? { reverse: true } : {}),
        ...(rom.props.continueSegments ? {
          continueSegments: chunkTriples(rom.props.continueSegments as number[]).map(
            ([offset, size, fileOffset]) => ({ offset, size, fileOffset }),
          ),
        } : {}),
        ...(rom.props.status ? { status: rom.props.status as 'nodump' | 'baddump' } : {}),
      }));
      if (present.has(tag) || loads.length === 0) continue;
      roms.push({
        region: tag,
        size: Number(region.props.size),
        romSet: String(biosRomSet.props.name),
        ...(String(region.props.flags).includes('ROMREGION_ERASEFF') ? { fill: 0xff } : {}),
        ...(String(region.props.flags).includes('ROMREGION_INVERT') ? { invert: true } : {}),
        loads,
      });
      present.add(tag);
    }
  }
  if (opts.fullGraph) {
    const full = new Graph(opts.fullGraph);
    // A device hosted inside another source-defined device may own a dumped
    // ROM set (Namco's 51/52/53/54xx MCUs are one family, but this is not
    // specific to them). Discover those sets from the declaring host class
    // instead of naming one processor model here. Devices without
    // device_rom_region simply contribute nothing.
    for (const nested of devices) {
      const ownerConfigEdge = graph.edges.find(edge =>
        edge.rel === 'HAS_DEVICE' && edge.to === nested.id);
      const ownerConfig = ownerConfigEdge && g.node(ownerConfigEdge.from);
      const hostEdge = ownerConfigEdge && graph.edges.find(edge =>
        edge.rel === 'CALLS' && edge.to === ownerConfigEdge.from &&
        g.node(edge.from)?.label === 'Device');
      const host = hostEdge && g.node(hostEdge.from);
      if (!ownerConfig || !host) continue;
      const sourceFile = String(ownerConfig.props.sourceFile ?? '');
      const className = String(ownerConfig.props.cls ?? '');
      const romSetName = sourceFile && className
        ? mameDeviceRomSet(opts.mameSrc, sourceFile, className)
        : undefined;
      const deviceRomSet = romSetName && full.node(`romset:${romSetName}`);
      if (!deviceRomSet) continue;
      // MAME loads a device's ROMs from its own set, named by the device short
      // name in DEFINE_DEVICE_TYPE — namco54.zip, not the parent game's zip.
      const romSet = mameDeviceShortName(opts.mameSrc, sourceFile, className);
      for (const { node: region } of full.out(deviceRomSet.id, 'HAS_REGION')) {
        const regionTag = `${host.props.tag}:${region.props.tag}`;
        if (roms.some(candidate => candidate.region === regionTag)) continue;
        roms.push({
          region: regionTag,
          size: Number(region.props.size),
          ...(romSet ? { romSet } : {}),
          loads: full.out(region.id, 'LOADS').map(({ node: rom }) => ({
            file: String(rom.props.file),
            offset: Number(rom.props.offset),
            size: Number(rom.props.size),
            crc: String(rom.props.crc),
            ...(rom.props.status ? { status: rom.props.status as 'nodump' | 'baddump' } : {}),
          })),
        });
      }
    }
  }

  // --- inputs -----------------------------------------------------------------------
  // Port polarity comes from the graph per field: galaga/pacman inputs are
  // active-low, galaxian's are active-HIGH (coin bit 0 at rest) — the resting
  // ("init") byte must be computed per port or galaxian sees a stuck coin switch.
  //
  // PORT_INCLUDE resolution: walk every INCLUDES_PORTS branch root-first and
  // merge — a PORT_START in a derived set replaces the whole port; a
  // PORT_MODIFY replaces base fields whose masks overlap (mpatrol inherits
  // m52's coin/start/service ports and modifies the joystick bits).
  interface EffPort { tag: string; fields: KGNode[] }
  const inputsChain: KGNode[] = [];
  const inputSetsSeen = new Set<string>();
  const appendInputSet = (node: KGNode | undefined): void => {
    if (!node || inputSetsSeen.has(node.id)) return;
    inputSetsSeen.add(node.id);
    for (const include of g.out(node.id, 'INCLUDES_PORTS')) {
      appendInputSet(include.node);
    }
    inputsChain.push(node);
  };
  appendInputSet(inputs);
  const effPorts = new Map<string, EffPort>();
  for (const setNode of inputsChain) {
    for (const { node: port } of g.out(setNode.id, 'HAS_PORT')) {
      const tag = String(port.props.tag);
      const fields = g.out(port.id, 'HAS_FIELD').map(f => f.node);
      if (port.props.modify && effPorts.has(tag)) {
        const eff = effPorts.get(tag)!;
        for (const f of fields) {
          const mask = Number(f.props.mask);
          eff.fields = eff.fields.filter(b => (Number(b.props.mask) & mask) === 0);
          eff.fields.push(f);
        }
      } else {
        effPorts.set(tag, { tag, fields });
      }
    }
  }
  const ports = [...effPorts.values()];
  const portSpecs: { tag: string; init: number }[] = [];
  const bindings: unknown[] = [];
  const dipDefaults: unknown[] = [];
  const customs: NonNullable<BoardConfig['customs']> = [];
  const inputLatches: NonNullable<BoardConfig['inputLatches']> = [];
  const changedLatchMembers = new Map<string, string | undefined>();
  const changedLatchMember = (className: string, method: string): string | undefined => {
    const key = `${className}.${method}`;
    if (changedLatchMembers.has(key)) return changedLatchMembers.get(key);
    for (const sourceNode of graph.nodes.filter(node => node.label === 'SourceFile')) {
      const path = join(opts.mameSrc, String(sourceNode.props.path));
      if (!existsSync(path)) continue;
      const source = readFileSync(path, 'utf8');
      const marker = `INPUT_CHANGED_MEMBER(${className}::${method})`;
      const start = source.indexOf(marker);
      if (start < 0) continue;
      // PORT_CHANGED_MEMBER supplies newval and param.  Preserve the common
      // hardware shape where a rising switch edge sets one indexed latch;
      // its separate output-latch callback remains source-compiled and owns
      // clearing that state.
      const body = source.slice(start, start + 800);
      const match = /\bnewval\b[\s\S]{0,300}?\b(m_\w+)\s*\[\s*param\s*\]\s*=\s*(?:1|true)\s*;/.exec(body);
      if (match) {
        changedLatchMembers.set(key, match[1]);
        return match[1];
      }
    }
    changedLatchMembers.set(key, undefined);
    return undefined;
  };
  for (const port of ports) {
    const tag = port.tag;
    let init = 0;
    for (const f of port.fields) {
      const kind = f.props.kind;
      const mask = Number(f.props.mask);
      const activeLow = f.props.activeLow !== false; // default LOW (classic hardware)
      if (kind === 'dip') {
        const value = Number(f.props.defaultValue ?? mask); // unused dips default to off (active low)
        init = (init & ~mask) | (value & mask);
        dipDefaults.push({ port: tag, mask, value, name: String(f.props.name ?? '') });
      } else if (kind === 'service') {
        const value = Number(f.props.defaultValue ?? (activeLow ? mask : 0));
        init = (init & ~mask) | (value & mask);
        dipDefaults.push({ port: tag, mask, value, name: 'Service Mode' });
      } else if (kind === 'bit') {
        if (activeLow) init |= mask; // released = bit set; active-high released = bit clear
        const type = String(f.props.type ?? '');
        const mods = (f.props.modifiers as string[] | undefined) ?? [];
        const changed = mods
          .map(modifier => /PORT_CHANGED_MEMBER\s*\([^,]+,\s*FUNC\s*\(\s*(\w+)::(\w+)/.exec(modifier))
          .find((match): match is RegExpExecArray => Boolean(match));
        if (changed) {
          const stateMember = changedLatchMember(changed[1]!, changed[2]!);
          if (stateMember && mask > 0 && (mask & (mask - 1)) === 0) {
            inputLatches.push({
              port: tag,
              mask,
              activeLow,
              stateMember,
              index: Math.log2(mask),
              handler: `${changed[1]}.${changed[2]}`,
            });
          }
        }
        // IPT_CUSTOM bits are synthesized from other ports by a named driver
        // member (invaders reads CONTP1 into IN0/IN1/IN2 bits 4-6) — emit
        // the wiring fact for the board's member table
        const custom = mods
          .map(modifier => /PORT_(?:CUSTOM_MEMBER|READ_LINE_MEMBER)\s*\(\s*FUNC\s*\(\s*(\w+)::(\w+)(?:\s*<\s*(\d+)\s*>)?/.exec(modifier))
          .find((match): match is RegExpExecArray => Boolean(match));
        if (type === 'IPT_CUSTOM' && custom) {
          const method = custom[3] === undefined
            ? custom[2]!
            : `${custom[2]}_${Number(custom[3])}`;
          customs.push({
            port: tag,
            mask,
            member: method,
            handler: `${custom[1]}.${method}`,
            activeLow,
          });
          continue;
        }
        const deviceLine = mods
          .map(modifier => /PORT_READ_LINE_DEVICE_MEMBER\s*\(\s*"([^"]+)"\s*,\s*FUNC\s*\(\s*screen_device::vblank/.exec(modifier))
          .find((match): match is RegExpExecArray => Boolean(match));
        if (type === 'IPT_CUSTOM' && deviceLine) {
          customs.push({
            port: tag,
            mask,
            member: 'vblank',
            source: 'screen-vblank',
            activeLow,
          });
          continue;
        }
        const rtcLine = mods
          .map(modifier => /PORT_READ_LINE_DEVICE_MEMBER\s*\(\s*"([^"]+)"\s*,\s*FUNC\s*\(\s*upd1990a_device::(tp_r|data_out_r)/.exec(modifier))
          .find((match): match is RegExpExecArray => Boolean(match));
        if (type === 'IPT_CUSTOM' && rtcLine) {
          customs.push({
            port: tag,
            mask,
            member: rtcLine[2]!,
            source: rtcLine[2] === 'tp_r' ? 'rtc-tp' : 'rtc-data',
            activeLow,
          });
          continue;
        }
        if (mods.includes('PORT_COCKTAIL')) continue;  // player-2 cocktail path: unbound
        if (mods.includes('PORT_PLAYER(2)')) continue; // don't double-bind P1 keys
        const sourceNumber = (value: string): number => Number(value.trim());
        const minMax = mods
          .map(modifier => /PORT_MINMAX\s*\(\s*([^,]+),\s*([^\)]+)\)/.exec(modifier))
          .find((match): match is RegExpExecArray => Boolean(match));
        const keyDelta = mods
          .map(modifier => /PORT_KEYDELTA\s*\(\s*([^\)]+)\)/.exec(modifier))
          .find((match): match is RegExpExecArray => Boolean(match));
        const named = mods
          .map(modifier => /PORT_NAME\("(?:%p )?([^"]+)"\)/.exec(modifier)?.[1])
          .find(Boolean);
        if (type === 'IPT_DIAL') {
          const delta = keyDelta ? sourceNumber(keyDelta[1]!) : 1;
          bindings.push({
            port: tag, mask, keys: ['ArrowLeft'], label: named ? `${named} Left` : `${type}_LEFT`,
            activeLow: false, relativeDelta: -delta,
          });
          bindings.push({
            port: tag, mask, keys: ['ArrowRight'], label: named ? `${named} Right` : `${type}_RIGHT`,
            activeLow: false, relativeDelta: delta,
          });
          continue;
        }
        const keys = inputKeys(opts.game, type);
        if (keys) bindings.push({
          port: tag,
          mask,
          keys,
          label: named ?? type,
          activeLow,
          ...(/^IPT_PEDAL\d*$/.test(type)
            ? { activeValue: minMax ? sourceNumber(minMax[2]!) : mask }
            : {}),
          ...(mods.includes('PORT_TOGGLE') ? { toggle: true } : {}),
        });
      }
    }
    portSpecs.push({ tag, init });
  }

  // Control ports may live on a default slot device rather than the driver
  // (NES joypads and Neo Geo's MVS edge connector are concrete examples).
  // Port tags are namespaced `${devTag}:${portTag}`. Only the first physical
  // controller is keyboard-bound; player-2/cocktail fields remain available
  // as raw ports without stealing player-1 keys.
  {
    let boundController = false;
    for (const dev of devices) {
      const slotInputs = g.out(dev.id, 'USES_INPUTS')[0]?.node;
      if (!slotInputs) continue;
      for (const { node: port } of g.out(slotInputs.id, 'HAS_PORT')) {
        const tag = `${dev.props.tag}:${port.props.tag}`;
        let init = 0;
        for (const f of g.out(port.id, 'HAS_FIELD').map(x => x.node)) {
          if (f.props.kind !== 'bit') continue;
          const mask = Number(f.props.mask);
          const activeLow = f.props.activeLow !== false;
          if (activeLow) init |= mask;
          if (boundController) continue;
          const type = String(f.props.type ?? '');
          const mods = (f.props.modifiers as string[] | undefined) ?? [];
          if (mods.includes('PORT_COCKTAIL') || mods.includes('PORT_PLAYER(2)')) continue;
          const keys = inputKeys(opts.game, type);
          if (!keys) continue;
          const named = mods.map(m => /PORT_NAME\("(?:%p )?([^"]+)"\)/.exec(m)?.[1]).find(Boolean);
          bindings.push({
            port: tag,
            mask,
            keys,
            label: named ?? type,
            activeLow,
            ...(mods.includes('PORT_TOGGLE') ? { toggle: true } : {}),
          });
        }
        portSpecs.push({ tag, init });
      }
      boundController = true;
    }
  }

  // --- emit ---------------------------------------------------------------------------
  const title = `${game.props.fullname} (${game.props.company}, ${game.props.year})`;

  // Console cart catalog: the machine's primary software list (first
  // status:'original' whose hash/<name>.xml exists) extracted to a sibling
  // artifact — dist/<machine>/softlist.json. The graph carries the LIST fact;
  // the 4,500+ cart entries stay out of graph.json (they'd swamp the viewer).
  let cart: Record<string, unknown> | undefined;
  let cartEntries = 0;
  if (kind === 'console') {
    mkdirSync(opts.outDir, { recursive: true });
    for (const listNode of softlistNodes) {
      if (listNode.props.status !== 'original') continue;
      const listName = String(listNode.props.name);
      const xmlPath = join(opts.mameSrc, 'hash', `${listName}.xml`);
      const catalogPath = join(opts.outDir, 'softlist.json');
      const catalog = existsSync(xmlPath)
        ? buildCatalog(
            parseSoftwareList(readFileSync(xmlPath, 'utf8')),
            listNode.props.filter ? String(listNode.props.filter) : undefined,
          )
        : existsSync(catalogPath)
          ? JSON.parse(readFileSync(catalogPath, 'utf8'))
          : null;
      if (!catalog) continue;
      if (existsSync(xmlPath)) {
        // compact on purpose: ~4.5k entries; indented it triples in size
        writeFileSync(catalogPath, JSON.stringify(catalog));
      }
      const set = `${category}/${opts.game}`;
      const cartArt = localCartArt(listName);
      const artCount = Object.keys(cartArt).length;
      const shelved = writeCartShelfIndex(
        join(romsDir(projectRoot), category, opts.game), opts.outDir, set);
      cart = {
        interface: catalog.interface,
        list: listName,
        catalogUrl: 'softlist.json',
        ...(shelved ? { cartsUrl: 'carts.json' } : {}),
        ...(artCount ? { cartArt } : {}),
        slots: CART_SLOT_SUPPORT[family] ?? [],
        games: CART_GAME_SUPPORT[family] ?? [],
      };
      if (shelved) console.log(`cart shelf index: ${shelved} dumps available for ${set}`);
      if (artCount) console.log(`cart artwork: ${artCount} cartridge(s) with local photography`);
      cartEntries = catalog.entries.length;
      console.log(`softlist "${listName}": ${catalog.entries.length} cartridges catalogued`);
      break;
    }
    if (!cart) {
      const listNode = softlistNodes.find(node => node.props.status === 'original');
      const cartInterface = CART_INTERFACE_BY_FAMILY[family];
      if (listNode && cartInterface) {
        cart = {
          interface: cartInterface,
          list: String(listNode.props.name),
          catalogUrl: 'softlist.json',
          slots: CART_SLOT_SUPPORT[family] ?? [],
          games: CART_GAME_SUPPORT[family] ?? [],
        };
      }
    }
    if (!cart) console.warn('  ! console machine has no resolvable software list — carts will be header-identified only');
  }

  // driver-init ROM byte patches (rocnrope's one-instruction fix), applied by
  // the shell after region assembly
  const romPatches = Array.isArray(game.props.romPatches)
    ? game.props.romPatches.map(s => {
        const [region, offset, value] = String(s).split(':');
        return { region, offset: Number(offset), value: Number(value) };
      })
    : undefined;
  const romTransforms = Array.isArray(game.props.romTransforms)
    ? game.props.romTransforms.map(value =>
        JSON.parse(String(value)) as Record<string, unknown>)
    : [];
  romTransforms.push(...compileDriverRomTransforms(
    opts.mameSrc,
    String(graph.meta.driverFile),
    String(game.props.cls),
    Object.fromEntries(roms.map(region => [region.region, region.size])),
  ) as unknown as Record<string, unknown>[]);
  for (const [index, device] of cpuDevs.entries()) {
    const cpu = cpus[index]!;
    if (!cpu.opcode) continue;
    const transform = compileSegaZ80RomTransform(
      opts.mameSrc,
      String(device.props.type),
      String(cpu.region),
      String((cpu.opcode as { region: string }).region),
    );
    if (transform) romTransforms.push(transform as unknown as Record<string, unknown>);
  }
  const initialShares = sourceNvramInitializers(devices, opts.mameSrc);

  const compiledVideo = compileMameVideo(graph, opts.mameSrc, machine.id);
  if (compiledVideo?.plan.updateMode) {
    screen.updateMode = compiledVideo.plan.updateMode;
  }
  // Packed-framebuffer drivers can expose a raw pixel-clock width that is a
  // multiple of the actual RAM raster (Tutankham uses GALAXIAN_XSCALE=3 but
  // has no GFX decode entry from which the screen pass can discover it).  The
  // bitmap layout is source-proven geometry, so use it to remove that clock
  // multiplier before the shell rotates and presents the native framebuffer.
  const packedBitmap = compiledVideo?.plan.bitmap;
  if (packedBitmap) {
    const packedWidth = packedBitmap.xOffset +
      packedBitmap.bytesPerRow * (8 / (packedBitmap.bitsPerPixel ?? 1));
    if (
      Number.isInteger(packedWidth) &&
      packedWidth > 0 &&
      screen.width > packedWidth &&
      screen.width % packedWidth === 0
    ) {
      const rawScale = screen.width / packedWidth;
      screen.width = packedWidth;
      screen.xOffset /= rawScale;
    }
  }
  const config = {
    game: opts.game,
    title,
    family,
    ...(kind ? { kind } : {}),
    dataPath,
    board: {
      family,
      cpus,
      ranges,
      ...(io ? { io } : {}),
      ...(initialShares.length ? { initialShares } : {}),
      ...(customs.length ? { customs } : {}),
      ...(inputLatches.length ? { inputLatches } : {}),
      screen,
      clocks,
      videoMode: compiledVideo?.plan.bitmap
        ? 'bitmap'
        : compiledVideo?.plan.vector
          ? 'vector'
          : 'handler',
    },
    sound,
    roms,
    ...(romPatches ? { romPatches } : {}),
    ...(romTransforms.length ? { romTransforms } : {}),
    ...(cart ? { cart } : {}),
    bindings,
    dipDefaults,
    ports: portSpecs,
    // no romUrl: ROMs are never fetched — the shell only accepts user drops
    // (console carts are remembered per-browser in IndexedDB via
    // runtime/cartstore.ts, by explicit user approval 2026-07-07)
    runtimeUrl: '../runtime/generated/audio/',
    menuUrl: './',
  };

  // per-game metadata for the boot menu manifest + "learn" modal:
  // driver credits from the source header, contribution history from the
  // MAME git checkout (best effort — absent when git/history unavailable)
  let gitHistory: Record<string, unknown> | undefined;
  try {
    const log = spawnSync('git', ['-C', opts.mameSrc, 'log', '--follow', '--format=%as|%an', '--', String(graph.meta.driverFile)],
      { encoding: 'utf8', timeout: 30000 });
    const lines = (log.stdout ?? '').trim().split('\n').filter(Boolean);
    if (lines.length) {
      const authors = new Map<string, {
        commits: number;
        firstCommit: string;
        lastCommit: string;
      }>();
      for (const l of lines) {
        const [date, name] = l.split('|');
        if (!name || !date) continue;
        const author = authors.get(name);
        if (author) {
          author.commits++;
          author.firstCommit = date;
        } else {
          authors.set(name, {
            commits: 1,
            firstCommit: date,
            lastCommit: date,
          });
        }
      }
      const authorStats = [...authors.entries()]
        .map(([name, author]) => ({ name, ...author }))
        .sort((a, b) => b.commits - a.commits || a.name.localeCompare(b.name));
      gitHistory = {
        firstCommit: lines[lines.length - 1].split('|')[0],
        lastCommit: lines[0].split('|')[0],
        commits: lines.length,
        contributors: authors.size,
        topAuthors: authorStats.slice(0, 5).map(author => author.name),
        authorStats,
      };
    }
  } catch { /* no git history available */ }

  // Prefer a local curated story when preservation research has more detail
  // than the shared Gaming History entry. Both live with the gitignored
  // presentation package; attribution is carried into the generated app.
  let hasHistory = false;
  let historyText = '';
  let historyCredit = '';
  const historyDir = join(artworkDir(projectRoot), 'data/history');
  const curatedHistoryPath = join(historyDir, `${opts.game}.txt`);
  const historyXmlPath = join(historyDir, 'history.xml');
  if (existsSync(curatedHistoryPath)) {
    try {
      historyText = readFileSync(curatedHistoryPath, 'utf8')
        .replace(/\r\n/g, '\n')
        .trim();
      if (historyText) {
        historyCredit = 'Curated from the preservation sources cited in the story';
        writeFileSync(join(opts.outDir, 'history.txt'), `${historyText}\n`);
        hasHistory = true;
      }
    } catch { /* unreadable local story — fall back to Gaming History */ }
  }
  if (!hasHistory && existsSync(historyXmlPath)) {
    try {
      const xml = readFileSync(historyXmlPath, 'utf8');
      const at = xml.indexOf(`<system name="${opts.game}"`);
      if (at >= 0) {
        const entryStart = xml.lastIndexOf('<entry>', at);
        const textStart = xml.indexOf('<text>', entryStart);
        const textEnd = xml.indexOf('</text>', textStart);
        if (entryStart >= 0 && textStart >= 0 && textEnd > textStart) {
          historyText = xml.slice(textStart + 6, textEnd)
            .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
            .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
            .replace(/\r\n/g, '\n') // the .dat ships CRLF; regexes downstream assume \n
            .trim();
          writeFileSync(join(opts.outDir, 'history.txt'),
            historyText + '\n\n— Gaming History (arcade-history.com)\n');
          historyCredit = 'Story courtesy of Gaming History (arcade-history.com)';
          hasHistory = true;
        }
      }
    } catch { /* malformed dat — skip */ }
  }

  writeFileSync(join(opts.outDir, 'meta.json'), JSON.stringify({
    game: opts.game,
    title,
    fullname: game.props.fullname,
    year: game.props.year,
    manufacturer: game.props.company,
    family,
    ...(kind ? { kind } : {}),
    driverFile: graph.meta.driverFile,
    ...(graph.meta.license ? { license: graph.meta.license } : {}),
    ...(graph.meta.copyrightHolders ? { copyrightHolders: graph.meta.copyrightHolders } : {}),
    ...(gitHistory ? { gitHistory } : {}),
    ...(hasHistory ? { hasHistory: true } : {}),
    ...(historyCredit ? { historyCredit } : {}),
  }, null, 2));

  // the game itself is pure knowledge-graph data — the unified app at
  // out/app loads it at runtime (no per-game compile)
  writeFileSync(join(opts.outDir, 'config.json'), JSON.stringify(config, null, 2));
  const runtimeReport = buildRuntimeReport(graph, config as unknown as RuntimeConfigShape);
  writeFileSync(join(opts.outDir, 'runtime-report.json'), JSON.stringify(runtimeReport, null, 2));
  writeFileSync(join(opts.outDir, 'runtime-report.md'), runtimeReportMarkdown(runtimeReport));
  emitGeneratedMachine(
    graph,
    opts.game,
    family,
    opts.outDir,
    config.board as unknown as BoardConfig,
    compiledVideo,
    nesApu,
    'discreteDac' in sound
      ? sound.discreteDac as GeneratedDiscreteDacPlan
      : 'discreteEffects' in sound
        ? sound.discreteEffects as GeneratedDiscreteEffectsPlan
      : undefined,
  );

  // The canonical dossier data feeds both the portable Markdown download and
  // the styled in-site HTML route emitted by buildApp.
  const dossier: DossierData = {
    game: opts.game, title, fullname: String(game.props.fullname),
    year: String(game.props.year), company: String(game.props.company),
    family, driverFile: String(graph.meta.driverFile),
    license: graph.meta.license as string | undefined,
    copyrightHolders: graph.meta.copyrightHolders as string | undefined,
    cpus, sound, screen, roms, bindings, dipDefaults, gitHistory, historyText,
    historyCredit,
    ...(cart ? {
      cart: { list: String(cart.list), entries: cartEntries, slots: cart.slots as string[] },
    } : {}),
  };
  const dossierMarkdown = renderDossierMarkdown(dossier);
  writeFileSync(join(opts.outDir, 'dossier.json'), JSON.stringify(dossier, null, 2));
  writeFileSync(join(opts.outDir, 'DOSSIER.md'), dossierMarkdown);
  writeFileSync(join(opts.outDir, `${opts.game}-dossier.md`), dossierMarkdown);
  console.log(`\ngenerated ${join(opts.outDir, 'config.json')} (+ meta.json, dossier, runtime report)`);
  if (!existsSync(join(romsDir(projectRoot), `${opts.game}.zip`))) {
    console.log(`note: put ${opts.game}.zip in ${romsDir(projectRoot)}/ to auto-load ROMs (or drop the zip onto the page)`);
  }
}

export function handlerOwnsSharedRam(sourceBody: string, share: string): boolean {
  if (!share) return false;
  const member = `m_${share.replace(/[^A-Za-z0-9_]/g, '_')}`;
  return new RegExp(`\\b${member}\\s*\\[[^\\]]+\\]\\s*[-+*/&|^]?=`).test(sourceBody);
}

function configuredDeviceMember(props: Record<string, unknown>): string | undefined {
  const config = Array.isArray(props.config) ? props.config.map(String).join('\n') : '';
  return /\(\s*config\s*,\s*(m_\w+(?:\[\d+\])?)/.exec(config)?.[1];
}

/**
 * Render the per-game dossier: the same knowledge-graph facts the app shows,
 * as one standalone markdown document. Nothing here is hand-written — every
 * fact flows from the graph (or MAME git / presentation-package side-channels).
 */
function machineDossierMarkdown(d: {
  game: string; title: string; fullname: string; year: string; company: string;
  family: string; driverFile: string; license?: string; copyrightHolders?: string;
  cpus: { tag: string; type?: string; clock: number; ranges: unknown[] }[];
  sound: { kind: string; clock?: number; chips?: number };
  screen: { width: number; height: number; refresh: number; rotate?: number };
  roms: { region: string; size: number; loads: { file: string; offset: number; size: number; crc: string }[] }[];
  bindings: unknown[]; dipDefaults: unknown[];
  gitHistory?: Record<string, unknown>; historyText: string; historyCredit: string;
  cart?: { list: string; entries: number; slots: string[] };
}): string {
  const hex = (n: number) => '0x' + n.toString(16);
  const prettyKey = (k: string) => k.replace(/^Key|^Arrow|^Digit/, '');
  const prettyIpt = (l: string) => l.replace(/^IPT_/, '').replace(/_/g, ' ').toLowerCase();
  const md: string[] = [];

  md.push(`# ${d.fullname}`);
  md.push('');
  md.push(`**${d.company} · ${d.year}** — transpiled from the MAME driver \`${d.driverFile}\` by mamekit.`);
  md.push('');
  md.push(`![marquee](/artwork/media/marquees/${d.game}.png)`);
  md.push('');
  md.push(`| Cover | Cabinet |`);
  md.push(`| --- | --- |`);
  md.push(`| ![flyer](/artwork/covers/${d.game}.png) | ![cabinet](/artwork/media/cabinets/${d.game}.png) |`);
  md.push('');

  md.push('## The machine');
  md.push('');
  md.push('| CPU | Type | Clock | Mapped ranges |');
  md.push('| --- | --- | --- | --- |');
  for (const c of d.cpus) {
    md.push(`| \`${c.tag}\` | ${(c.type ?? 'z80').toUpperCase()} | ${(c.clock / 1e6).toFixed(3)} MHz | ${c.ranges.length} |`);
  }
  md.push('');
  md.push(`- **Sound:** ${d.sound.kind === 'none' ? 'discrete analog board' : d.sound.kind}` +
    (d.sound.chips ? ` × ${d.sound.chips}` : '') +
    (d.sound.clock ? ` @ ${(d.sound.clock / 1e6).toFixed(3)} MHz` : ''));
  md.push(`- **Screen:** ${d.screen.width}×${d.screen.height} @ ${d.screen.refresh.toFixed(2)} Hz` +
    (d.screen.rotate ? ` · rotated ${d.screen.rotate}°` : ''));
  md.push('');

  if (d.cart) {
    md.push('### Cartridges');
    md.push('');
    md.push(`The machine itself needs no ROMs — all software comes on cartridges. ` +
      `${d.cart.entries.toLocaleString('en-US')} cartridges are catalogued from the MAME \`${d.cart.list}\` ` +
      `software list; ${d.cart.slots.length} PCB types are currently supported ` +
      `(${d.cart.slots.map(s => `\`${s}\``).join(', ')}). Drop your own legally-dumped ` +
      `cart files onto the console page to play.`);
    md.push('');
  } else {
    md.push('### ROM chips');
    md.push('');
    md.push('| Region | Chip | Offset | Size | CRC |');
    md.push('| --- | --- | --- | --- | --- |');
    for (const r of d.roms) {
      for (const l of r.loads) {
        md.push(`| \`${r.region}\` | \`${l.file}\` | ${hex(l.offset)} | ${hex(l.size)} | \`${l.crc}\` |`);
      }
    }
    md.push('');
  }

  const binds = d.bindings as { port: string; mask: number; keys: string[]; label: string }[];
  if (binds.length) {
    md.push('## Controls');
    md.push('');
    md.push('| Key | Function | Port | Bit |');
    md.push('| --- | --- | --- | --- |');
    for (const b of binds) {
      md.push(`| ${b.keys.map(prettyKey).join(' / ')} | ${prettyIpt(b.label)} | \`${b.port}\` | ${hex(b.mask)} |`);
    }
    md.push('');
  }

  const dips = (d.dipDefaults as { port: string; mask: number; value: number; name: string }[])
    .filter(x => x.name);
  if (dips.length) {
    md.push('## DIP switches (factory defaults)');
    md.push('');
    md.push('| Setting | Port | Mask | Default |');
    md.push('| --- | --- | --- | --- |');
    for (const x of dips) md.push(`| ${x.name} | \`${x.port}\` | ${hex(x.mask)} | ${hex(x.value)} |`);
    md.push('');
  }

  md.push('## The MAME driver — the people who reverse-engineered it');
  md.push('');
  md.push(`- **Driver source:** \`${d.driverFile}\``);
  if (d.copyrightHolders) md.push(`- **Written by:** ${d.copyrightHolders}`);
  if (d.license) md.push(`- **License:** ${d.license}`);
  if (d.gitHistory) {
    const gh = d.gitHistory as { firstCommit: string; lastCommit: string; commits: number; contributors: number; topAuthors: string[] };
    md.push(`- **Development:** ${gh.commits} commits by ${gh.contributors} contributors, ${gh.firstCommit.slice(0, 4)}–${gh.lastCommit.slice(0, 4)}`);
    md.push(`- **Top contributors:** ${gh.topAuthors.join(', ')}`);
  }
  md.push('');

  if (d.historyText) {
    md.push('## The story');
    md.push('');
    // Gaming History marks chapters as "- TRIVIA -" lines: promote to headings
    md.push(d.historyText.replace(/^- ([A-Z][A-Z0-9 .&'/-]{2,}) -\s*$/gm,
      (_, name: string) => `### ${name.charAt(0) + name.slice(1).toLowerCase()}`));
    md.push('');
    md.push(`*${d.historyCredit || 'Story from the local presentation package'}.*`);
    md.push('');
  }

  md.push('---');
  md.push('');
  md.push(`*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver \`${d.family}\`. Play it at [../../../app/g/${d.game}/](../../../app/g/${d.game}/) or [explore the knowledge graph](viewer.html).*`);
  md.push('');
  return md.join('\n');
}

/** Build the app, shared runtime, and canonical per-game executable modules. */
export function buildApp(outRoot: string): boolean {
  const appDir = join(outRoot, 'app');
  const runtimeCoreDir = join(outRoot, 'runtime/core');
  const buildDir = join(outRoot, '.build');
  const srcDir = join(buildDir, 'src');
  // Recreate every compiled tree so renamed modules cannot survive a rebuild.
  rmSync(appDir, { recursive: true, force: true });
  rmSync(runtimeCoreDir, { recursive: true, force: true });
  rmSync(buildDir, { recursive: true, force: true });
  mkdirSync(appDir, { recursive: true });
  mkdirSync(join(srcDir, 'app'), { recursive: true });

  cpSync(join(projectRoot, 'src/runtime'), join(srcDir, 'runtime/core'), {
    recursive: true,
    filter: source => !source.endsWith('.spec.ts'),
  });
  // The neutral IR ships alongside the runtime as dist/runtime/ir. Staging it
  // one level above runtime/core keeps every `../ir/...` import resolving to
  // the same place it does in src, so no path rewriting is needed.
  cpSync(join(projectRoot, 'src/ir'), join(srcDir, 'runtime/ir'), {
    recursive: true,
    filter: source => !source.endsWith('.spec.ts'),
  });
  // Capability packages ship only their runtime-facing files. extract.ts pulls
  // in the compiler and acceptance.ts drives dist from Node; neither belongs in
  // the browser bundle, and excluding them here is what keeps that true.
  cpSync(join(projectRoot, 'src/hardware'), join(srcDir, 'runtime/hardware'), {
    recursive: true,
    filter: source => !['.spec.ts', '/extract.ts', '/acceptance.ts', '/registry.ts',
      '/acceptance-registry.ts'].some(name => source.endsWith(name)),
  });
  const hardwareImports: string[] = [];
  const cpuBindings: string[] = [];
  const deviceBindings: string[] = [];
  const hardwareManifestPath = join(outRoot, 'runtime/generated/hardware-manifest.json');
  if (existsSync(hardwareManifestPath)) {
    cpSync(
      join(outRoot, 'runtime/generated'),
      join(srcDir, 'runtime/generated'),
      { recursive: true },
    );
    const manifest = JSON.parse(readFileSync(hardwareManifestPath, 'utf8')) as {
      hardware?: {
        type: string;
        executable?: boolean;
        executableKind?: 'cpu' | 'device' | 'audio' | 'composition';
        executableArtifact?: string;
      }[];
    };
    for (const hardware of manifest.hardware ?? []) {
      if (!hardware.executable) continue;
      const slug = hardware.type.toLowerCase();
      if (!['cpu', 'device'].includes(hardware.executableKind ?? '')) continue;
      const binding = hardware.executableKind === 'device'
        ? `device_${deviceBindings.length}`
        : `cpu_${cpuBindings.length}`;
      hardwareImports.push(
        `import ${binding} from '../runtime/generated/devices/${slug}.ts';`,
      );
      if (hardware.executableKind === 'device') deviceBindings.push(binding);
      else cpuBindings.push(binding);
    }
  }
  const generatedImports: string[] = [];
  const generatedEntries: { binding: string; dataPath: string }[] = [];
  for (const category of GAME_CATEGORIES) {
    const categoryDir = join(outRoot, 'games', category);
    if (!existsSync(categoryDir)) continue;
    for (const entry of readdirSync(categoryDir).sort()) {
      const generatedDir = join(gameOutputDir(outRoot, category, entry), 'generated');
      if (!existsSync(join(generatedDir, 'board.ts'))) continue;
      const target = join(srcDir, gameDataPath(category, entry), 'generated');
      mkdirSync(target, { recursive: true });
      cpSync(generatedDir, target, { recursive: true });
      const binding = `board_${generatedImports.length}`;
      const dataPath = gameDataPath(category, entry);
      generatedImports.push(
        `import ${binding} from '../${dataPath}/generated/board.ts';`,
      );
      generatedEntries.push({ binding, dataPath });
    }
  }
  writeFileSync(join(srcDir, 'app/registry.ts'), `// GENERATED by mamekit — do not edit.
import { registerGeneratedMachine } from '../runtime/core/generated-machine.ts';
import { registerGeneratedBoard } from '../runtime/core/generated-board.ts';
import { registerGeneratedCpu } from '../runtime/core/generated-cpu.ts';
import { registerGeneratedDevice } from '../runtime/core/generated-device.ts';
${hardwareImports.join('\n')}
${generatedImports.join('\n')}

const games = [
${generatedEntries.map(entry =>
    `  { dataPath: '${entry.dataPath}', board: ${entry.binding} },`).join('\n')}
];

export function registerGeneratedMachines(): void {
  for (const cpu of [${cpuBindings.join(', ')}]) registerGeneratedCpu(cpu);
  for (const device of [${deviceBindings.join(', ')}]) registerGeneratedDevice(device);
  for (const { board } of games) {
    registerGeneratedMachine(board.machine);
    registerGeneratedBoard(board.machine.game, board.createBoard);
  }
}

export function generatedGamePath(game: string): string | undefined {
  return games.find(entry => entry.board.machine.game === game)?.dataPath;
}
`);

  writeFileSync(join(srcDir, 'app/main.ts'), `// GENERATED by mamekit — do not edit.
// Unified app: no ?g= -> boot menu; ?g=<game> -> load that game's generated
// config (pure knowledge-graph data) and run it.
import { runShell, type ShellConfig } from '../runtime/core/shell.ts';
import { runConsole } from '../runtime/core/console.ts';
import { runMenu } from '../runtime/core/menu.ts';
import { generatedGamePath, registerGeneratedMachines } from './registry.ts';

registerGeneratedMachines();

// force https on real domains: AudioWorklet (all sound) needs a secure
// context, and github's own enforcement only kicks in after cert issuance
if (location.protocol === 'http:' && !/^(localhost|127\\.|192\\.168\\.|10\\.)/.test(location.hostname)) {
  location.replace(location.href.replace(/^http:/, 'https:'));
}

// game comes from the pretty route /app/g/<game>/ or the legacy ?g= param
const game = decodeURIComponent(/\\/g\\/([^/]+)\\/?$/.exec(location.pathname)?.[1] ?? '')
  || new URLSearchParams(location.search).get('g');
const fail = (err: unknown) => {
  console.error(err);
  document.body.insertAdjacentHTML('beforeend',
    '<pre style="color:#f66;padding:12px">' + String((err as Error)?.stack ?? err) + '</pre>');
};
if (game) {
  const dataPath = generatedGamePath(game);
  if (!dataPath) fail(new Error(\`no generated board for "\${game}"\`));
  else fetch(\`../\${dataPath}/config.json\`)
    .then(r => { if (!r.ok) throw new Error(\`no generated config for "\${game}" — run: mamekit \${game}\`); return r.json(); })
    .then(cfg => (cfg as ShellConfig).kind === 'console'
      ? runConsole(cfg as ShellConfig)   // console room: cart shelf, drop zone, per-cart boot
      : runShell(cfg as ShellConfig))
    .catch(fail);
} else {
  runMenu().catch(fail);
}
`);

  writeFileSync(join(buildDir, 'tsconfig.json'), JSON.stringify({
    compilerOptions: {
      target: 'ES2022', module: 'ESNext', moduleResolution: 'bundler',
      lib: ['ES2022', 'DOM', 'DOM.Iterable'], strict: true,
      resolveJsonModule: true,
      allowImportingTsExtensions: true, rewriteRelativeImportExtensions: true,
      erasableSyntaxOnly: true, verbatimModuleSyntax: true, skipLibCheck: true,
      outDir: 'out', rootDir: 'src',
    },
    include: ['src'],
  }, null, 2));

  // per-build stamp on the module URL: browsers cache module scripts hard,
  // and pages' CDN adds 10 min — the query flips both on every deploy
  const stamp = Date.now().toString(36);
  writeFileSync(join(appDir, 'index.html'), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>MAME History</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><text y='13' font-size='13'>👾</text></svg>">
</head>
<body>
<script type="module" src="./main.js?v=${stamp}"></script>
<noscript>mamekit needs JavaScript.</noscript>
</body>
</html>
`);

  // root convenience redirect: / -> app/ (relative — works under a Pages base path)
  writeFileSync(join(outRoot, 'index.html'),
    '<!doctype html><meta http-equiv="refresh" content="0;url=app/">');

  // pretty per-game routes: /app/g/<game>/ as REAL directories (static hosts
  // have no rewrites). <base href="../../"> makes every relative URL resolve
  // exactly as it does on /app/, so the one compiled bundle serves all routes.
  for (const category of GAME_CATEGORIES) {
    const categoryDir = join(outRoot, 'games', category);
    if (!existsSync(categoryDir)) continue;
    for (const entry of readdirSync(categoryDir)) {
      const gameDir = gameOutputDir(outRoot, category, entry);
      if (!existsSync(join(gameDir, 'meta.json'))) continue;
      let title = entry;
      try { title = JSON.parse(readFileSync(join(gameDir, 'meta.json'), 'utf8')).title ?? entry; } catch { /* keep slug */ }
      const dir = join(appDir, 'g', entry);
      mkdirSync(dir, { recursive: true });
      writeFileSync(join(dir, 'index.html'), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<base href="../../">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><text y='13' font-size='13'>👾</text></svg>">
</head>
<body>
<script type="module" src="./main.js?v=${stamp}"></script>
<noscript>mamekit needs JavaScript.</noscript>
</body>
</html>
`);
    }
  }

  console.log('compiling unified app with tsc...');
  const tsc = spawnSync(process.execPath, [
    join(projectRoot, 'node_modules/typescript/bin/tsc'),
    '-p',
    join(buildDir, 'tsconfig.json'),
  ], {
    stdio: 'inherit',
  });
  if (tsc.status !== 0) {
    console.error('tsc failed — app emitted but not compiled');
    rmSync(buildDir, { recursive: true, force: true });
    rmSync(appDir, { recursive: true, force: true });
    rmSync(runtimeCoreDir, { recursive: true, force: true });
    return false;
  }
  const compiledDir = join(buildDir, 'out');
  for (const group of ['app', 'runtime', 'games']) {
    const compiledGroup = join(compiledDir, group);
    if (!existsSync(compiledGroup)) continue;
    cpSync(compiledGroup, join(outRoot, group), { recursive: true });
  }
  // tsc only emits JSON modules that are imported by executable code. The
  // closure manifest, hardware graph/report and device IR are build products
  // consumed by audits and the catalog, so restore the complete staged
  // generated tree after overlaying its compiled JavaScript modules.
  const stagedGenerated = join(srcDir, 'runtime/generated');
  if (existsSync(stagedGenerated)) {
    cpSync(stagedGenerated, join(outRoot, 'runtime/generated'), {
      recursive: true,
      // Incremental hardware generation replaces the TypeScript/IR first.
      // Any JavaScript beside it belongs to the previous compilation and must
      // not overwrite the modules tsc just emitted into the output tree.
      filter: source => !source.endsWith('.js') && !source.endsWith('.js.map'),
    });
  }
  const archive = emitArchiveRoutes(outRoot, appDir);
  rmSync(buildDir, { recursive: true, force: true });
  console.log(
    `archive ready: ${archive.games} games, ${archive.facetValues} facet pages, ` +
    `${archive.dossiers} dossiers`,
  );
  console.log(`app ready: ${join(appDir, 'index.html')}`);
  return true;
}

/**
 * Slim cartridge availability index for the console room.
 *
 * The local dump audit writes _manifest.json beside the set's zips, recording
 * which cartridges are bit-exact matches for their nes.xml entry (verified) and
 * which are not (experimental). That file carries every per-cart hash and runs
 * close to a megabyte; the shelf needs only the bucket key, the softlist short
 * name to join on, and the tier. Emitting the reduction beside the generated
 * machine keeps the room's first paint same-origin and instant instead of
 * pulling the whole manifest from the mirror on every visit.
 *
 * Returns the entry count, or 0 when there is no local audit to reduce.
 */
/**
 * Real cartridge photography for the console room, kept local and gitignored
 * (same copyright treatment as arcade flyers). The naming convention and the
 * scan itself live in gen/cart-art.ts, shared with the dev server so a running
 * server sees art added after generation.
 *
 * The index is baked into config.json because a shelf shows thousands of
 * cartridges: letting the browser probe for art it does not have would mean
 * thousands of 404s per visit on a deployed site.
 */
function localCartArt(list: string): Record<string, CartArt> {
  return cartArtIndex(join(artworkDir(projectRoot), 'carts', list));
}

function writeCartShelfIndex(setDir: string, outDir: string, set: string): number {
  const manifestPath = join(setDir, '_manifest.json');
  if (!existsSync(manifestPath)) return 0;
  let manifest: { carts?: unknown[] };
  try {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as { carts?: unknown[] };
  } catch {
    console.warn(`  ! ${manifestPath} is not readable JSON — cart shelf index skipped`);
    return 0;
  }
  const carts: { file: string; name?: string; tier: 'verified' | 'experimental' }[] = [];
  for (const raw of manifest.carts ?? []) {
    const cart = raw as { file?: string; target?: string; status?: string; match?: { name?: string } };
    const file = cart.target ?? cart.file;
    if (typeof file !== 'string' || !file.toLowerCase().endsWith('.zip')) continue;
    if (cart.status === 'verified' && cart.match?.name) {
      carts.push({ file, name: cart.match.name, tier: 'verified' });
    } else {
      carts.push({ file, tier: 'experimental' });
    }
  }
  if (!carts.length) return 0;
  // compact on purpose: one line per thousand carts is still ~60 KB
  writeFileSync(join(outDir, 'carts.json'), JSON.stringify({ set, carts }));
  return carts.length;
}
