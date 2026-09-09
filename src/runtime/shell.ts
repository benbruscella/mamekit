// Browser shell: ROM loading, canvas presentation (with screen rotation),
// keyboard and gamepad input, audio bring-up, and the fixed-timestep run loop.
// Pure DOM — no libraries.

import { createBoard } from './generated-board.ts';
import { loadArtwork, type ArtTint, type ArtWindow } from './artwork.ts';
import { KeyboardInput, type FieldBinding, type DipDefault, type PortSpec } from './input.ts';
import { GamepadInput, padName } from './gamepad.ts';
import { PointerInput } from './pointer.ts';
import { AudioOutput } from './audio.ts';
import { readZip, crc32 } from './zip.ts';
import type { Regions, BoardConfig, CassetteMedia, MachineState } from './types.ts';
import type { GeneratedAudioRoute, GeneratedHandlerProgram } from '../ir/board.ts';
import { executeGeneratedHandler } from '../ir/execute.ts';
import type { GeneratedAuxiliaryAudioDevice, GeneratedBiquadStage, GeneratedDacChip, GeneratedDacFilterPlan, GeneratedDiscreteDacPlan, GeneratedDiscreteEffectsPlan, GeneratedDiscreteMixerPlan, GeneratedSpeakerFilterPlan } from '../ir/audio-protocol.ts';
import { fetchRomBytes } from './rom-source.ts';
import { machineIdentity, openSaveStore, saveId, type SaveRecord } from './savestore.ts';

export interface RomLoad {
  file: string; offset: number; size: number; crc: string;
  /** same-slot chips from sibling sets (other revisions of the same game) */
  alt?: { file: string; crc: string }[];
  reloadOffsets?: number[];
  /** Extra slices from later in this same file (MAME ROM_CONTINUE semantics). */
  continueSegments?: { offset: number; size: number; fileOffset: number }[];
  /**
   * MAME's dump status for the chip. `nodump` means no copy exists anywhere,
   * so no ROM set can supply it and MAME leaves those bytes erased; it is not
   * an incomplete set. `baddump` bytes are known-imperfect but usable.
   */
  status?: 'nodump' | 'baddump';
  groupSize?: number;
  skip?: number;
  reverse?: boolean;
  /** Merge the source's low nibble into the low or high destination nibble. */
  nibbleShift?: 0 | 4;
}
export interface RomRegionSpec {
  region: string;
  size: number;
  /** MAME ROMREGION_ERASE00/ERASEFF initialization for unloaded bytes. */
  fill?: number;
  /** MAME ROMREGION_INVERT complements every byte after the region is loaded. */
  invert?: boolean;
  /** Source ROM_FILL directives applied after physical chips are loaded. */
  fills?: { offset: number; size: number; value: number }[];
  /**
   * MAME device short name owning this region's ROMs, when they come from a
   * device set rather than the game set. MAME commonised device ROMs so one
   * copy serves every board using the part, and loads them from
   * `<romSet>.zip` — namco54.zip, not galaga.zip.
   */
  romSet?: string;
  loads: RomLoad[];
}

/** A chip MAME says exists on the board and can actually be supplied. */
export function isDumpedRom(load: RomLoad): boolean {
  return load.status !== 'nodump';
}

/**
 * Regions whose absence cannot produce a usable machine.  In addition to the
 * board CPUs, this includes firmware owned by MAME device ROM sets.  Split
 * MAME collections keep those chips in (for example) namco51.zip rather than
 * the game's zip; silently zero-filling them can pass the main-CPU boot ROM
 * check while leaving I/O or sound controllers dead.
 */
export function requiredRomRegions(specs: RomRegionSpec[], cpuRegions: Iterable<string>): Set<string> {
  const required = new Set(cpuRegions);
  for (const spec of specs) {
    if (spec.romSet && spec.loads.some(isDumpedRom)) required.add(spec.region);
  }
  return required;
}

/** Distinct external device sets needed alongside the game's own zip. */
export function dependencyRomSets(specs: RomRegionSpec[], game: string): string[] {
  return [...new Set(specs.flatMap(spec => spec.romSet && spec.loads.some(isDumpedRom) ? [spec.romSet] : []))]
    .filter(set => set !== game);
}

/**
 * External ROM archives still needed after inspecting the primary archive.
 *
 * Merged collections commonly bundle a clone's parent files in the same zip.
 * Requiring `<parent>.zip` by name even when every required CRC is already
 * present turns a complete set into an environment failure (Pac-Man's
 * `pacman.zip` containing its `puckman` parent is the canonical example).
 */
export function unresolvedDependencyRomSets(
  specs: RomRegionSpec[],
  game: string,
  files: Map<string, Uint8Array>,
): string[] {
  return dependencyRomSets(specs, game).filter(romSet => {
    const owned = specs.filter(spec => spec.romSet === romSet);
    const required = new Set(owned.map(spec => spec.region));
    const check = checkRomSet(owned, files, required);
    return check.missingCritical.length > 0 || check.crcMismatch.length > 0;
  });
}

export interface SoundSpec {
  /** Generic SoundCore/AudioWorklet processor kind. */
  kind: string;
  /** Concrete MAME chip hosted by a shared worklet family (YM2203/YM2610). */
  deviceType?: string;
  /** Generated worklet artifact stem when several MAME devices share a processor kind. */
  worklet?: string;
  clock?: number;
  /** rom region holding the wavetable (wsg only) */
  waveRegion?: string;
  /** optional source-device sample ROM mixed by the primary worklet */
  sampleRegion?: string;
  /** number of sound chips (ay8910: gyruss has 5) */
  chips?: number;
  /** MAME device tags in chip-index order. */
  deviceTags?: string[];
  /** MAME device type in chip-index order, when a bank mixes several chips. */
  deviceTypes?: string[];
  /** Per-chip clock in chip-index order, when a bank clocks them differently. */
  clocks?: number[];
  /** Resolution, coding and gain of each DAC, lowered from MAME source. */
  dacs?: GeneratedDacChip[];
  /** Per-output routes lowered from MAME add_route calls. */
  routes?: GeneratedAudioRoute[];
  /** MAME discrete DAC/filter network mixed with the primary core. */
  auxiliary?: GeneratedDacFilterPlan;
  /** Source-routed secondary stream devices mixed by the generated worklet. */
  auxiliaryDevices?: GeneratedAuxiliaryAudioDevice[];
  /** FILTER_BIQUAD stages between the sound core and the board output. */
  filterChain?: GeneratedBiquadStage[];
  /** MAME DISCRETE_SOUND_START network consuming primary stream outputs. */
  discreteMixer?: GeneratedDiscreteMixerPlan;
  discreteDac?: GeneratedDiscreteDacPlan;
  discreteEffects?: GeneratedDiscreteEffectsPlan;
  /** MAME's source-derived post-mix speaker effect. */
  speakerFilter?: GeneratedSpeakerFilterPlan;
  /**
   * Post-mix level for this sound family, from its capability package. MAME's
   * add_route gains set the relative mix between chips; this is the single
   * master level the shell applies.
   */
  masterGain?: number;
}

/** the ROM drop target's visual states (built by buildDom().dropZone) */
export interface DropZone {
  el: HTMLElement;
  /** a file is hovering over the window */
  armed: () => void;
  idle: () => void;
  busy: (name: string) => void;
  error: (msg: string) => void;
  /** per-chip validation result: colors the manifest + summary line */
  verdict: (check: RomCheck) => void;
  /** the "Try web search" affordance: button ↔ progress bar */
  search: {
    button: HTMLButtonElement;
    start: () => void;
    progress: (frac: number, label?: string) => void;
    /** bring the button back (nothing found / set rejected) */
    reset: () => void;
    /** collapse the affordance for good (set accepted) */
    hide: () => void;
  };
}

/**
 * Look for the romset on the web. Sources and their order live in
 * rom-source.ts, shared with the console room's cartridge fetch.
 */
async function fetchRomSet(game: string, category = 'arcade', firmwareKey?: string): Promise<Uint8Array> {
  // A computer's firmware is filed under the machine's own dump directory
  // (computers/c64/bios/c64.zip), beside the software it runs; a console's or
  // arcade board's set sits at the category root.
  // A clone's firmware is its parent's chips under a different set name --
  // the PAL C64 loads the NTSC machine's ROMs -- and the audit files the one
  // zip under the family, so that name is tried too; the chips are matched by
  // name and CRC either way.
  const family = firmwareKey?.split('/').pop();
  const keys = firmwareKey
    ? [...new Set([`${firmwareKey}/bios/${game}.zip`, `${firmwareKey}/bios/${family}.zip`, `${category}/${game}.zip`])]
    : [`${category}/${game}.zip`];
  for (const key of keys) {
    const bytes = await fetchRomBytes(key);
    if (bytes) return bytes;
  }
  throw new Error(`no web source had ${game}.zip`);
}

/**
 * Where this machine's own romset lives, mirroring the .data/roms layout:
 * "arcade/pacman.zip", "consoles/coleco.zip". A console's cartridges sit one
 * level deeper, under the machine's own directory.
 */
function romCategory(dataPath: string): string {
  return dataPath.replace(/^games\//, '').split('/')[0] ?? 'arcade';
}

/** result of checking an uploaded zip against the knowledge-graph manifest */
export interface RomCheck {
  perFile: { region: string; file: string; critical: boolean; status: 'ok' | 'crc' | 'missing' }[];
  missingCritical: string[];
  missingOther: string[];
  crcMismatch: string[];
}

/**
 * Find the zip entry satisfying one manifest slot: the primary chip by
 * name / dash-underscore-swapped name / CRC, else any clone-revision
 * alternate (same slot in a sibling set) by CRC or name.
 */
export function findRomBytes(
  load: RomLoad,
  files: Map<string, Uint8Array>,
  byCrc: Map<number, Uint8Array>,
): { bytes: Uint8Array | null; exact: boolean } {
  const expected = parseInt(load.crc, 16) >>> 0;
  const primary = files.get(load.file.toLowerCase())
    ?? files.get(load.file.toLowerCase().replace(/_/g, '-'))
    ?? byCrc.get(expected);
  if (primary && crc32(primary) === expected) return { bytes: primary, exact: true };
  for (const alt of load.alt ?? []) {
    const altCrc = parseInt(alt.crc, 16) >>> 0;
    const f = byCrc.get(altCrc) ?? files.get(alt.file.toLowerCase());
    if (f && crc32(f) === altCrc) return { bytes: f, exact: true };
  }
  // name matched but unknown bytes: usable, flagged as a CRC difference
  return { bytes: primary ?? null, exact: false };
}

/** Match a zip's contents against the romset manifest without assembling. */
export function checkRomSet(
  specs: RomRegionSpec[],
  files: Map<string, Uint8Array>,
  critical: Set<string>,
): RomCheck {
  const byCrc = new Map<number, Uint8Array>();
  for (const bytes of files.values()) byCrc.set(crc32(bytes), bytes);
  const check: RomCheck = { perFile: [], missingCritical: [], missingOther: [], crcMismatch: [] };
  for (const spec of specs) {
    for (const load of spec.loads) {
      // An undumped chip cannot be in any ROM set. Reporting it as missing
      // told users to go looking for a file that does not exist.
      if (!isDumpedRom(load)) continue;
      const isCrit = critical.has(spec.region);
      const { bytes, exact } = findRomBytes(load, files, byCrc);
      let status: 'ok' | 'crc' | 'missing';
      if (!bytes) {
        status = 'missing';
        (isCrit ? check.missingCritical : check.missingOther).push(load.file);
      } else if (!exact) {
        status = 'crc';
        check.crcMismatch.push(load.file);
      } else {
        status = 'ok';
      }
      check.perFile.push({ region: spec.region, file: load.file, critical: isCrit, status });
    }
  }
  return check;
}

export interface ShellConfig {
  game: string;
  title: string;
  family: string;
  /** 'console' machines route to the console room first (default arcade) */
  kind?: 'arcade' | 'console' | 'computer';
  /** canonical generated artifact directory relative to the distribution root */
  dataPath: string;
  board: BoardConfig;
  sound: SoundSpec;
  roms: RomRegionSpec[];
  /** driver-init byte patches applied to assembled regions (from the graph) */
  romPatches?: { region: string; offset: number; value: number }[];
  /** source-derived driver-init transforms applied before graphics decoding */
  romTransforms?: RomTransform[];
  bindings: FieldBinding[];
  dipDefaults: DipDefault[];
  ports: PortSpec[];
  /** console cart facts from the generator (catalog url, capability lists) */
  cart?: {
    interface: string; list: string; catalogUrl: string; slots: string[]; games: string[];
    /**
     * The slot option a cartridge takes when its software-list entry names
     * none, as MAME's own slot device declares it. coleco.xml names a slot on
     * no entry at all, so without this every ColecoVision cartridge would
     * resolve to no board.
     */
    defaultSlot?: string;
    /** ROM region a cartridge PCB loads into, as MAME's rom_alloc names it. */
    romRegion?: string;
    /**
     * What the cartridge slot accepts, from its own
     * `device_image_interface::file_extensions()`: ".bin"/".a26" for the VCS,
     * ".rom"/".col"/".bin" for the ColecoVision, ".nes"/".unf"/".unif" here.
     */
    extensions?: string[];
    /** generated cartridge availability index, when a local dump audit existed */
    cartsUrl?: string;
    /**
     * Local cartridge photography under /artwork/carts/<list>, keyed by softlist
     * short name: `cart` is the whole shell, `sticker` is the label only.
     */
    cartArt?: Record<string, { cart?: string; sticker?: string }>;
  };
  /**
   * A computer's software shelves from the generator: one per MAME software
   * list the driver declares, each with its own catalogue and the medium it
   * arrives on. The software room browses these; the shell only mounts what
   * the room hands it.
   */
  software?: SoftwareShelves;
  /** base url of the compiled runtime dir (for worklet modules) */
  runtimeUrl: string;
  /** where Esc returns to (the boot menu) */
  menuUrl?: string;
  /**
   * The machine is exposed as a beta: compiled and playable, but without
   * gameplay acceptance yet. Set by the room from the manifest's preview flag
   * so the page says so wherever the machine is named.
   */
  preview?: boolean;
}

/** A small BETA pill for a machine exposed before its acceptance exists. */
export function betaBadge(): HTMLElement {
  const badge = document.createElement('span');
  badge.setAttribute('data-beta', '');
  badge.textContent = 'BETA';
  badge.title = 'This machine is in beta: it boots and plays, but its emulation has not passed gameplay acceptance yet';
  badge.style.cssText = `display:inline-block;vertical-align:middle;margin-left:8px;padding:2px 7px;border-radius:5px;
    font:800 10px ui-monospace,monospace;letter-spacing:1.2px;color:#1b1b1b;background:#f2c200`;
  return badge;
}

/** The medium a software list arrives on, as its part interface says. */
export type MediumKind = 'cassette' | 'cartridge' | 'floppy' | 'quickload';

export interface SoftwareShelf {
  /** MAME software list short name: "c64_cass" */
  list: string;
  /** the list's own description: "Commodore 64 cassettes" */
  description: string;
  /** part interface: "cbm_cass", "c64_cart", "floppy_5_25" */
  interface: string;
  kind: MediumKind;
  /** generated catalogue, relative to the machine's data directory */
  catalogUrl: string;
  /** generated availability index, when a local dump audit existed */
  availableUrl?: string;
  /** image file extensions the list's sets actually hold: ["tap", "wav"] */
  extensions: string[];
  entries: number;
  /**
   * Whether the generated board can mount this medium today. A list whose
   * transport is not yet generated is still browsable, but display only.
   */
  mountable: boolean;
}

export interface SoftwareShelves {
  /** bucket / .data key the dumps live under: "computers/c64" */
  dumpsKey: string;
  shelves: SoftwareShelf[];
}

/** One media image the software room hands the shell to mount at power-on. */
export interface MountedImage {
  name: string;
  bytes: Uint8Array;
}

export type RomTransform =
  | {
      kind: 'address-byte-bitswap';
      region: string;
      start: number;
      end: number;
      addressBits: number[];
      addressXor: number;
      dataBits: number[];
    }
  | {
      kind: 'conditional-byte-swap';
      region: string;
      indexMask: number;
      indexValue: number;
      displacement: number;
    }
  | {
      kind: 'byte-bitswap';
      region: string;
      start: number;
      end: number;
      bits: number[];
    }
  | {
      /** Source `bitswap<N>` applied independently to little-endian ROM words. */
      kind: 'word-bitswap';
      region: string;
      wordBits: number;
      bits: number[];
    }
  | {
      /** PROM-selected permutation of low ROM word-address lines. */
      kind: 'prom-word-address';
      region: string;
      promRegion: string;
      wordBytes: number;
      addressKeepMask: number;
      tableAddressMask: number;
      tableAddressShift: number;
      tableEntryMask: number;
      bitPickTable: number[][];
    }
  | {
      kind: 'byte-substitution';
      sourceRegion: string;
      targetRegion: string;
      start: number;
      end: number;
      table: number[];
    }
  | {
      /**
       * MAME's driver init preserved as a program, for the inits whose work has
       * no declarative shape (Ms. Pac-Man decrypts a whole second bank through
       * address and data bit permutations, then patches it). Executed over the
       * assembled regions, exactly where MAME runs it.
       */
      kind: 'init-program';
      method: string;
      parameters: string;
      program: GeneratedHandlerProgram;
      helpers: { method: string; parameters: string; program: GeneratedHandlerProgram }[];
      source?: { file: string; line: number; column?: number };
    }
  | {
      kind: 'sega-z80-decrypt';
      algorithm: 'segacrpt' | 'segacrp2';
      sourceRegion: string;
      targetRegion: string;
      start: number;
      end: number;
      convtable?: number[];
      xorTable?: number[];
      swapTable?: number[];
    };

/**
 * Run a lowered driver init over the assembled ROM regions.
 *
 * The environment is deliberately small: MAME's region finder, and the memory
 * bank finder as a recorder. Bank configuration is already lowered declaratively
 * from the same function, so the calls the init makes into it are accepted and
 * discarded rather than being a reason to refuse the program.
 */
function executeDriverInitProgram(
  transform: Extract<RomTransform, { kind: 'init-program' }>,
  regions: Regions,
): void {
  const where = transform.source
    ? `${transform.source.file}:${transform.source.line}`
    : transform.method;
  const referenceCalls: Record<string, (...args: unknown[]) => unknown> = {
    memregion: (...args: unknown[]) => {
      const tag = String(argumentValue(args[0]) ?? '');
      const bytes = regions[tag];
      if (!bytes) throw new Error(`${where}: driver init has no ROM region "${tag}"`);
      return { base: () => bytes, bytes: () => bytes.length };
    },
    membank: () => ({
      configure_entries: () => 0,
      configure_entry: () => 0,
      set_entry: () => 0,
    }),
  };
  for (const helper of transform.helpers) {
    const names = helper.parameters
      .split(',')
      .map(parameter => /(\w+)\s*$/.exec(parameter.trim())?.[1])
      .filter((name): name is string => Boolean(name));
    referenceCalls[helper.method] = (...args: unknown[]) => executeGeneratedHandler(
      helper.program,
      { constants: {}, members: {}, referenceCalls },
      Object.fromEntries(names.map((name, index) => [name, argumentValue(args[index])])),
    );
  }
  executeGeneratedHandler(
    transform.program,
    { constants: {}, members: {}, referenceCalls },
  );
}

/** Unwrap the l-value a generated call receives for a reference parameter. */
function argumentValue(value: unknown): unknown {
  return value && typeof value === 'object' &&
    typeof (value as { get?: unknown }).get === 'function'
    ? (value as { get(): unknown }).get()
    : value;
}

export function applyRomTransforms(regions: Regions, transforms: readonly RomTransform[]): void {
  for (const transform of transforms) {
    if (transform.kind === 'address-byte-bitswap') {
      const region = regions[transform.region];
      if (
        !region || transform.start < 0 || transform.end < transform.start ||
        transform.end > region.length || transform.addressBits.length !== 16 ||
        transform.dataBits.length !== 8 || new Set(transform.addressBits).size !== 16 ||
        new Set(transform.dataBits).size !== 8
      ) {
        throw new Error(`ROM address/data bitswap for "${transform.region}" is invalid`);
      }
      const source = region.slice();
      const bitswap = (value: number, bits: readonly number[]) => bits.reduce(
        (result, sourceBit, outputIndex) =>
          result | (((value >>> sourceBit) & 1) << (bits.length - outputIndex - 1)),
        0,
      );
      for (let index = transform.start; index < transform.end; index++) {
        const address = bitswap(index, transform.addressBits) ^ transform.addressXor;
        if (address < 0 || address >= source.length) {
          throw new Error(`ROM address bitswap for "${transform.region}" reads ${address}`);
        }
        region[index] = bitswap(source[address]!, transform.dataBits);
      }
      continue;
    }
    if (transform.kind === 'conditional-byte-swap') {
      const region = regions[transform.region];
      if (!region) throw new Error(`ROM transform has no region "${transform.region}"`);
      for (let index = 0; index < region.length; index++) {
        if (((index & transform.indexMask) >>> 0) !== (transform.indexValue >>> 0)) continue;
        const other = index + transform.displacement;
        if (other < 0 || other >= region.length) {
          throw new Error(
            `ROM transform for "${transform.region}" swaps ${index} with out-of-range ${other}`,
          );
        }
        const value = region[index]!;
        region[index] = region[other]!;
        region[other] = value;
      }
      continue;
    }
    if (transform.kind === 'byte-bitswap') {
      const region = regions[transform.region];
      if (
        !region ||
        transform.start < 0 ||
        transform.end < transform.start ||
        transform.end > region.length ||
        transform.bits.length !== 8 ||
        transform.bits.some(bit => bit < 0 || bit > 7) ||
        new Set(transform.bits).size !== 8
      ) {
        throw new Error(
          `ROM byte bitswap for "${transform.region}" has invalid bounds or bit order`,
        );
      }
      for (let index = transform.start; index < transform.end; index++) {
        const value = region[index]!;
        region[index] = transform.bits.reduce(
          (result, sourceBit, outputIndex) =>
            result | (((value >> sourceBit) & 1) << (7 - outputIndex)),
          0,
        );
      }
      continue;
    }
    if (transform.kind === 'word-bitswap') {
      const region = regions[transform.region];
      const bytesPerWord = transform.wordBits / 8;
      if (
        !region || transform.wordBits !== 32 || region.length % bytesPerWord !== 0 ||
        transform.bits.length !== transform.wordBits ||
        transform.bits.some(bit => bit < 0 || bit >= transform.wordBits) ||
        new Set(transform.bits).size !== transform.wordBits
      ) {
        throw new Error(`ROM word bitswap for "${transform.region}" is invalid`);
      }
      for (let offset = 0; offset < region.length; offset += bytesPerWord) {
        const source = (
          region[offset]! |
          (region[offset + 1]! << 8) |
          (region[offset + 2]! << 16) |
          (region[offset + 3]! << 24)
        ) >>> 0;
        const value = transform.bits.reduce(
          (result, sourceBit, outputIndex) =>
            (result | (((source >>> sourceBit) & 1) << (31 - outputIndex))) >>> 0,
          0,
        );
        region[offset] = value;
        region[offset + 1] = value >>> 8;
        region[offset + 2] = value >>> 16;
        region[offset + 3] = value >>> 24;
      }
      continue;
    }
    if (transform.kind === 'prom-word-address') {
      const region = regions[transform.region];
      const prom = regions[transform.promRegion];
      const rowCount = transform.bitPickTable.length;
      if (
        !region || !prom || transform.wordBytes <= 0 || region.length % transform.wordBytes !== 0 ||
        !rowCount || transform.bitPickTable.some(row =>
          row.length <= transform.tableEntryMask ||
          row.some(bit => bit < 0 || bit >= rowCount))
      ) {
        throw new Error(`PROM word-address transform for "${transform.region}" is invalid`);
      }
      const source = region.slice();
      const wordCount = region.length / transform.wordBytes;
      for (let address = 0; address < wordCount; address++) {
        const tableAddress = (address & transform.tableAddressMask) >>>
          transform.tableAddressShift;
        const entry = (prom[tableAddress] ?? 0) & transform.tableEntryMask;
        let sourceAddress = address & transform.addressKeepMask;
        for (let bit = 0; bit < rowCount; bit++) {
          sourceAddress |= ((address >>> transform.bitPickTable[bit]![entry]!) & 1) << bit;
        }
        if (sourceAddress < 0 || sourceAddress >= wordCount) {
          throw new Error(
            `PROM word-address transform for "${transform.region}" reads ${sourceAddress}`,
          );
        }
        const targetOffset = address * transform.wordBytes;
        const sourceOffset = sourceAddress * transform.wordBytes;
        region.set(
          source.subarray(sourceOffset, sourceOffset + transform.wordBytes),
          targetOffset,
        );
      }
      continue;
    }
    if (transform.kind === 'init-program') {
      executeDriverInitProgram(transform, regions);
      continue;
    }
    const source = regions[transform.sourceRegion];
    if (!source) {
      throw new Error(`ROM transform has no source region "${transform.sourceRegion}"`);
    }
    if (transform.kind === 'sega-z80-decrypt') {
      if (!source || transform.start < 0 || transform.end < transform.start ||
          transform.end > source.length) {
        throw new Error(`Sega Z80 transform for "${transform.sourceRegion}" has invalid bounds`);
      }
      const target = source.slice();
      if (transform.algorithm === 'segacrpt') {
        if (transform.convtable?.length !== 128) {
          throw new Error('Sega Z80 transform has no 32x4 conversion table');
        }
        for (let address = transform.start; address < transform.end; address++) {
          const src = source[address]!;
          const row = (address & 1) | (((address >>> 4) & 1) << 1) |
            (((address >>> 8) & 1) << 2) | (((address >>> 12) & 1) << 3);
          let column = ((src >>> 3) & 1) | (((src >>> 5) & 1) << 1);
          let xor = 0;
          if (src & 0x80) { column = 3 - column; xor = 0xa8; }
          const opcodeKey = transform.convtable[2 * row * 4 + column]!;
          const dataKey = transform.convtable[(2 * row + 1) * 4 + column]!;
          target[address] = opcodeKey === 0xff
            ? 0xee : (src & ~0xa8) | (opcodeKey ^ xor);
          source[address] = dataKey === 0xff
            ? 0xee : (src & ~0xa8) | (dataKey ^ xor);
        }
      } else {
        if (transform.xorTable?.length !== 128 || transform.swapTable?.length !== 128) {
          throw new Error('Sega Z80 transform has no 128-entry XOR/swap tables');
        }
        const swaps = [
          [6, 4, 2, 0], [4, 6, 2, 0], [2, 4, 6, 0], [0, 4, 2, 6],
          [6, 2, 4, 0], [6, 0, 2, 4], [6, 4, 0, 2], [2, 6, 4, 0],
          [4, 2, 6, 0], [4, 6, 0, 2], [6, 0, 4, 2], [0, 6, 4, 2],
          [4, 0, 6, 2], [0, 4, 6, 2], [6, 2, 0, 4], [2, 6, 0, 4],
          [0, 6, 2, 4], [2, 0, 6, 4], [0, 2, 6, 4], [4, 2, 0, 6],
          [2, 4, 0, 6], [4, 0, 2, 6], [2, 0, 4, 6], [0, 2, 4, 6],
        ];
        const decode = (value: number, tableIndex: number, xor: number): number => {
          const bits = swaps[tableIndex]!;
          return (((((value >>> 7) & 1) << 7) |
            (((value >>> bits[0]!) & 1) << 6) |
            (((value >>> 5) & 1) << 5) |
            (((value >>> bits[1]!) & 1) << 4) |
            (((value >>> 3) & 1) << 3) |
            (((value >>> bits[2]!) & 1) << 2) |
            (((value >>> 1) & 1) << 1) |
            ((value >>> bits[3]!) & 1)) ^ xor) & 0xff;
        };
        for (let address = transform.start; address < transform.end; address++) {
          const src = source[address]!;
          const row = (((address >>> 14) & 1) << 5) |
            (((address >>> 12) & 1) << 4) | (((address >>> 9) & 1) << 3) |
            (((address >>> 6) & 1) << 2) | (((address >>> 3) & 1) << 1) |
            (address & 1);
          target[address] = decode(src, transform.swapTable[2 * row]!, transform.xorTable[2 * row]!);
          source[address] = decode(src, transform.swapTable[2 * row + 1]!, transform.xorTable[2 * row + 1]!);
        }
      }
      regions[transform.targetRegion] = target;
      continue;
    }
    if (
      transform.start < 0 ||
      transform.end < transform.start ||
      transform.end > source.length ||
      transform.table.length !== 256
    ) {
      throw new Error(
        `ROM byte substitution for "${transform.targetRegion}" has invalid bounds or table`,
      );
    }
    const target = source.slice();
    for (let index = transform.start; index < transform.end; index++) {
      target[index] = transform.table[source[index]!]!;
    }
    regions[transform.targetRegion] = target;
  }
}

/**
 * `preloaded` bypasses the drop-zone/manifest path: the console room hands
 * over already-verified cart regions (regions.prg/chr) after identification.
 */
export async function runShell(
  cfg: ShellConfig,
  preloaded?: Regions,
  mounted: MountedImage[] = [],
): Promise<void> {
  const ui = buildDom(cfg);

  // Cabinet bezels are arcade presentation. Console carts boot into the clean
  // television viewport from their room and must not probe for an arcade
  // artwork zip that cannot exist.
  if (cfg.kind !== 'console') {
    void loadArtwork(cfg.game).then(art => {
      if (art?.window) ui.setBezel(art.bmp, art.window, art.tints);
    });
  }

  // Esc: back to the boot menu (registered first + capture so a single press
  // always works, at any stage of loading)
  addEventListener('keydown', ev => {
    if (ev.code !== 'Escape') return;
    ev.preventDefault();
    location.href = cfg.menuUrl ?? './';
  }, { capture: true });

  // --- ROM acquisition -------------------------------------------------------
  // ROMs never touch the mamekit server and are never auto-fetched. Arcade
  // path: a drag-drop in this page load, bytes die with the page — plus the
  // opt-in "Try web search" button, which fetches from the public mirror
  // bucket only on an explicit click (user directive 2026-07-19, arcade only).
  // Console path: the room hands in cart regions it already identified
  // (persisted only in the visitor's own browser via cartstore, by explicit
  // user approval 2026-07-07).
  let regions: Regions;
  // A cartridge is the whole machine only when the machine needs no ROM files
  // of its own. The NES declares a maincpu region with nothing in it -- the
  // cartridge fills it -- while the ColecoVision declares a real BIOS, so its
  // cartridge mounts ON TOP of the romset rather than instead of it. Keying on
  // the region list instead of the loads inside it would send the NES looking
  // for an nes.zip that does not exist.
  const needsRomFiles = cfg.roms.some(spec => spec.loads.length > 0);
  if (preloaded && !needsRomFiles) {
    regions = preloaded;
  } else {
    // Device firmware is just as boot-critical as CPU code even though MAME
    // stores it in a separate split-set zip.
    const critical = requiredRomRegions(cfg.roms, cfg.board.cpus.map(c => c.region));
    const dependencies = dependencyRomSets(cfg.roms, cfg.game);
    const zone = ui.dropZone(cfg.game);
    const companionText = dependencies.length
      ? ` plus ${dependencies.map(set => `${set}.zip`).join(', ')}`
      : '';
    ui.status(`ROMs are not distributed with mamekit — drop your own ${cfg.game}.zip${companionText} (never stored).`);
    const files = await waitForZip(ui, zone, cfg.roms, critical, cfg.game, romCategory(cfg.dataPath), cfg.software?.dumpsKey);
    regions = assembleRegions(cfg.roms, files, ui.status, critical);
    // The cartridge the console room already resolved wins over anything of
    // the same name in the machine set.
    if (preloaded) Object.assign(regions, preloaded);
  }

  // driver-init ROM byte patches from the graph (rocnrope's one-instruction fix)
  for (const p of cfg.romPatches ?? []) {
    const region = regions[p.region];
    if (region && p.offset < region.length) region[p.offset] = p.value;
  }
  applyRomTransforms(regions, cfg.romTransforms ?? []);

  // --- machine ----------------------------------------------------------------
  const input = new KeyboardInput(cfg.bindings, cfg.dipDefaults, cfg.ports);
  input.debug = new URLSearchParams(location.search).has('debug');
  input.attach(window);
  if (input.debug) console.log('[input] debug on — bindings:', cfg.bindings, 'ports:', cfg.ports);
  // A pad drives the same generated fields, polled once per emulated frame
  // below. The Gamepad API reports nothing until the page has had a gesture,
  // and the click that chose this machine is one.
  const pads = new GamepadInput(input, cfg.bindings, () => navigator.getGamepads?.() ?? []);
  pads.debug = input.debug;
  pads.attach(window);
  // A spinner or trackball is a mouse to the browser: pointer travel over
  // the screen turns the machine's dials, scaled by MAME's own sensitivity.
  const pointer = new PointerInput(input, cfg.bindings);
  pointer.debug = input.debug;
  pointer.attach(ui.canvas);
  // The legend is first drawn before either source exists; redraw it now
  // that both do, and again whenever a pad or the pointer capture changes.
  ui.controls(controlsHelp(cfg, pads, pointer));
  pointer.onChange(() => ui.controls(controlsHelp(cfg, pads, pointer)));
  // A pad arriving or leaving is announced three ways: the badge beside the
  // title while it is here, a toast over the screen the moment it changes,
  // and the legend naming its buttons.
  let knownPads = new Map<number, string>();
  pads.onChange(connected => {
    ui.controls(controlsHelp(cfg, pads, pointer));
    const label = (pad: { id: string; player: number }): string =>
      `${padName(pad.id)}${connected.length > 1 || pad.player > 1 ? ` (player ${pad.player})` : ''}`;
    ui.pads(connected.map(pad => `${label(pad)} connected`));
    const now = new Map(connected.map(pad => [pad.index, label(pad)]));
    for (const [index, name] of now) if (!knownPads.has(index)) ui.toast(`🎮 ${name} connected as player ${connected.find(pad => pad.index === index)!.player}`);
    for (const [index, name] of knownPads) if (!now.has(index)) ui.toast(`🎮 ${name} disconnected`);
    knownPads = now;
  });

  const audio = new AudioOutput();
  // Counted, not just forwarded: browser QA compares these against the token's
  // accepted audio golden. Real-time playback cannot reproduce the offline PCM
  // hash, so without the stream counts a whole silent channel is invisible to
  // the browser gate — Gyruss shipped with its entire i8039 percussion channel
  // emitting nothing and every other check still passed.
  const soundWrites = { total: 0, nonzero: 0 };
  const board = createBoard({ ...cfg.board, game: cfg.game }, regions, input, {
    soundWrite: (offset, data, frac, method) => {
      soundWrites.total++;
      if (offset >= 0 && data !== 0) soundWrites.nonzero++;
      audio.write(offset, data, frac, method);
    },
    soundData: (id, bytes) => audio.data(id, bytes),
  });
  // Match MAME's soft-reset key. This is needed by boards such as Qix whose
  // first-boot operator flow stores a language in NVRAM and asks for a reset.
  addEventListener('keydown', event => {
    if (cfg.kind === 'computer' || event.code !== 'F3' || event.repeat) return;
    event.preventDefault();
    input.releaseAll();
    board.reset();
  });
  ui.setNative(board.fbWidth, board.fbHeight); // the board owns true geometry
  // The software room's chosen tape rides in on `mounted`; the first transport
  // that accepts its extension takes it, the rest start empty.
  let pending = mounted;
  for (const media of board.media?.() ?? []) {
    const mine = pending.filter(image => media.extensions.includes(image.name.split('.').pop()!.toLowerCase()));
    if (mine.length) pending = pending.filter(image => !mine.includes(image));
    ui.addControls(cassetteControls(media, () => input.releaseAll(), mine));
  }

  const fb = new Uint32Array(board.fbWidth * board.fbHeight);
  const image = new ImageData(
    new Uint8ClampedArray(fb.buffer), board.fbWidth, board.fbHeight);

  // One emulated frame, exactly as the run loop advances it. Browser QA drives
  // this directly so a test can run a precise frame count instead of racing the
  // wall clock; nothing about the machine lives here.
  // Declared before the frame helpers that read it: `step()` is exposed on
  // window.mamekit and can run a frame before the run loop is set up.
  let fastForward = false;

  // The board says how far through a frame it is, so a dial's frame of
  // travel is handed out gradually, as MAME does, instead of in one lump.
  input.frameFraction = () => board.frameFraction?.() ?? 1;

  /** One emulated frame, without presenting it. */
  const runFrame = (): void => {
    pads.poll();
    input.advance();
    pointer.advance();
    board.frame(fb);
    // Fast-forward outruns the worklet, and a queued frame is permanent
    // latency rather than a dropped one, so its audio is discarded instead.
    if (fastForward) audio.discard();
    else audio.flush(); // one batch message per emulated frame
    frames++;
  };

  const stepFrames = (count: number): void => {
    for (let index = 0; index < count; index++) runFrame();
    if (count > 0) ui.blit(image);
  };

  // ?qa=1 parks the wall-clock timestep and hands frame advancement to
  // window.mamekit.step(). The presentation path is unchanged — the same
  // input, board, audio and blit calls run — so the app's own canvas can be
  // compared against the deterministic goldens in src/games.
  const qaDrive = new URLSearchParams(location.search).has('qa');

  // debug/testing handle (also the hook for the future live KG-viewer overlay)
  (window as unknown as Record<string, unknown>).mamekit = {
    board, input, pads, pointer, config: cfg, audio, regions,
    framebuffer: fb,
    step: stepFrames,
    qaDrive,
    soundWrites,
  };

  // Start immediately — the menu click that navigated here counts as the
  // user gesture in same-origin sessions. Audio starts in parallel; if the
  // browser still holds the AudioContext suspended, the first real input
  // resumes it without ever blocking gameplay.
  if (cfg.sound.kind !== 'none') {
    const clock = cfg.sound.clock ?? 96000;
    void audio.start(
      {
        sampleRate: clock,
        deviceType: cfg.sound.deviceType,
        clock,
        waveRom: cfg.sound.waveRegion ? regions[cfg.sound.waveRegion] : undefined,
        sampleRom: cfg.sound.sampleRegion ? regions[cfg.sound.sampleRegion] : undefined,
        chips: cfg.sound.chips,
        deviceTags: cfg.sound.deviceTags,
        deviceTypes: cfg.sound.deviceTypes,
        clocks: cfg.sound.clocks,
        dacs: cfg.sound.dacs,
        routes: cfg.sound.routes,
        auxiliary: cfg.sound.auxiliary,
        auxiliaryDevices: cfg.sound.auxiliaryDevices?.map(device => ({
          ...device,
          ...(device.sampleRegion ? { sampleRom: regions[device.sampleRegion] } : {}),
        })),
        filterChain: cfg.sound.filterChain,
        discreteMixer: cfg.sound.discreteMixer,
        discreteDac: cfg.sound.discreteDac,
        discreteEffects: cfg.sound.discreteEffects,
        speakerFilter: cfg.sound.speakerFilter,
        refresh: cfg.board.screen.refresh,
        debug: input.debug,
      },
      `${cfg.runtimeUrl}${cfg.sound.worklet ?? cfg.sound.kind}-worklet.js`,
      cfg.sound.kind,
    ).then(() => {
      // The post-mix level belongs to the sound family, so it is generated
      // from its capability package rather than kept in a table here that
      // every new family would have to be added to.
      audio.setVolume(cfg.sound.masterGain ?? 1);
    }).catch(err => console.warn('audio unavailable:', err));
    const resumeAudio = () => audio.resume();
    addEventListener('pointerdown', resumeAudio, { once: true });
    addEventListener('keydown', resumeAudio, { once: true });
  }
  ui.overlayHide();
  // A dial machine takes the mouse from here on; say so, and how to keep the
  // cursor from wandering off while a spinner turns.
  if (pointer.active) ui.toast('🖱 Spinner or trackball ready — click the screen to capture it, Esc releases');

  // --- fast-forward -------------------------------------------------------------
  //
  // Every machine here makes you wait for something before you can play: a
  // ColecoVision spends twelve seconds on its BIOS screen before it hands over
  // to the cartridge, and an arcade board runs its own self-test and attract
  // loop. F runs the machine as fast as it will go until F is pressed again,
  // for whatever is running -- this is the shell every target boots through.
  //
  // The unthrottled path is the same frame step the timestep uses, given a
  // wall-clock budget instead of a frame count, so input, emulation and the
  // blit all still happen -- it is the pacing that changes, nothing else.
  // Sound is muted while it runs, because a machine at several times speed is
  // a screech rather than a fast tune.
  const masterVolume = cfg.sound.masterGain ?? 1;
  const setFastForward = (on: boolean): void => {
    fastForward = on;
    audio.setVolume(on ? 0 : masterVolume);
  };
  if (cfg.kind === 'computer') {
    const deck = deckPanel(cfg.preview ? 'COMPUTER · BETA' : 'COMPUTER');
    deck.setAttribute('data-computer-deck', '');
    const reset = deckButton('⏻ Reset', { solid: false });
    reset.title = 'Reset the computer (like the RESTORE/reset line)';
    reset.onclick = () => { input.releaseAll(); board.reset(); reset.blur(); };
    const fast = deckButton('▶▶ Fast-forward', { solid: false });
    fast.title = 'Run unthrottled, muted, until pressed again';
    fast.setAttribute('aria-pressed', 'false');
    const paintFast = () => {
      fast.setAttribute('aria-pressed', String(fastForward));
      setDeckButtonState(fast, fastForward);
      fast.textContent = fastForward ? '▶▶ Fast-forward · ON' : '▶▶ Fast-forward';
    };
    fast.onclick = () => { input.releaseAll(); setFastForward(!fastForward); paintFast(); fast.blur(); };
    deck.append(reset, fast);
    ui.addControls(deck);
  }
  // --- save states (issue #129) ---------------------------------------------
  // The whole machine, captured between frames and kept in the visitor's own
  // browser. Shift+F7 saves and F7 loads the latest, as in MAME; a computer
  // keeps its function keys, so it has the deck buttons only.
  const saves = saveStateDeck({
    cfg,
    identity: machineIdentity(cfg.game, cfg.board, regions),
    save: () => board.save(),
    load: state => { input.releaseAll(); board.load(state); audio.discard(); },
    screen: ui.canvas,
    toast: ui.toast,
  });
  ui.addControls(saves.deck);
  (window as unknown as { mamekit: Record<string, unknown> }).mamekit.saves = saves;
  addEventListener('keydown', event => {
    if (cfg.kind === 'computer' || event.code !== 'F7' || event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
    event.preventDefault();
    if (event.shiftKey) void saves.save();
    else void saves.loadLatest();
  });
  addEventListener('keydown', event => {
    if (cfg.kind === 'computer' || event.code !== 'KeyF' || event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
    event.preventDefault();
    setFastForward(!fastForward);
  });

  // --- run loop: fixed timestep at the board's refresh rate --------------------
  const refresh = cfg.board.screen.refresh;
  const frameMs = 1000 / refresh;
  let acc = 0;
  let last = performance.now();
  let frames = 0;
  let fpsWindowStart = last;
  const tick = (now: number) => {
    if (input.debug && now - last > 50) {
      console.log(`[stall] ${Math.round(now - last)}ms between frames at ${Math.round(now)}`);
    }
    acc += now - last;
    last = now;
    if (acc > 5 * frameMs) acc = 5 * frameMs; // don't spiral after a tab pause
    let due = 0;
    while (acc >= frameMs) {
      acc -= frameMs;
      due++;
    }
    if (fastForward && !qaDrive) {
      // As many frames as fit the budget, presented once. The budget is
      // shorter than a display frame so the page stays responsive enough to
      // press F again, and the cap stops a fast machine running away.
      const until = performance.now() + 10;
      let batch = 0;
      do { runFrame(); batch++; } while (performance.now() < until && batch < 60);
      ui.blit(image);
      acc = 0; // the timestep's backlog means nothing at this speed
    } else if (!qaDrive) stepFrames(due);
    if (now - fpsWindowStart >= 1000) {
      const snap = board.snapshot();
      const parts = [`${frames} fps`, `pc=${hex4(snap.cpus[0].pc)}`];
      if (fastForward) parts.unshift(cfg.kind === 'computer' ? '▶▶ FAST-FORWARD' : '▶▶ FAST-FORWARD (F)');
      if (snap.cpus.length > 1) parts.push(`sub=${snap.cpus[1].held ? 'held' : hex4(snap.cpus[1].pc)}`);
      if (snap.credits !== undefined) parts.push(`credits=${snap.credits}`);
      if (input.debug) parts.push(input.dump());
      ui.status(`${cfg.title} — ${parts.join(' · ')}`);
      frames = 0;
      fpsWindowStart = now;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  // NOTE: box-art snapshots are saved only on Esc — toDataURL+localStorage
  // are synchronous and a periodic save visibly hitches the run loop.
}

function hex4(v: number): string { return v.toString(16).padStart(4, '0'); }

// ---------------------------------------------------------------------------

function copyRomLoad(
  destination: Uint8Array,
  source: Uint8Array,
  sourceOffset: number,
  size: number,
  destinationOffset: number,
  load: RomLoad,
): void {
  const group = load.groupSize ?? 1;
  const skip = load.skip ?? 0;
  if (group === 1 && skip === 0 && !load.reverse && load.nibbleShift === undefined) {
    destination.set(source.subarray(sourceOffset, sourceOffset + size), destinationOffset);
    return;
  }
  let input = sourceOffset;
  let output = destinationOffset;
  const end = sourceOffset + size;
  while (input < end) {
    const count = Math.min(group, end - input);
    for (let index = 0; index < count; index++) {
      const sourceIndex = load.reverse ? input + count - 1 - index : input + index;
      if (output + index < destination.length) {
        const sourceByte = source[sourceIndex]!;
        if (load.nibbleShift === undefined) {
          destination[output + index] = sourceByte;
        } else {
          const mask = 0x0f << load.nibbleShift;
          destination[output + index] =
            (destination[output + index]! & ~mask) |
            ((sourceByte & 0x0f) << load.nibbleShift);
        }
      }
    }
    input += count;
    output += group + skip;
  }
}

export function assembleRegions(
  specs: RomRegionSpec[],
  files: Map<string, Uint8Array>,
  status: (s: string) => void,
  critical: Set<string> = new Set(),
): Regions {
  // index by CRC too: romset file names drift across MAME versions
  // (gg1-1b.3p vs gg1_1b.3p), but the bytes are the identity
  const byCrc = new Map<number, Uint8Array>();
  for (const bytes of files.values()) byCrc.set(crc32(bytes), bytes);

  const regions: Regions = {};
  const missingCritical: string[] = [];
  const missingOther: string[] = [];
  for (const spec of specs) {
    const bytes = new Uint8Array(spec.size);
    if (spec.fill) bytes.fill(spec.fill & 0xff);
    for (const load of spec.loads) {
      // MAME erases an undumped chip's bytes and runs; so do we, without
      // claiming the user's ROM set is short a file.
      if (!isDumpedRom(load)) continue;
      // primary chip by name/swapped-name/CRC, else a clone-revision
      // alternate from the same slot (see findRomBytes)
      const { bytes: f, exact } = findRomBytes(load, files, byCrc);
      if (!f) {
        (critical.has(spec.region) ? missingCritical : missingOther).push(load.file);
        continue;
      }
      if (!exact) {
        console.warn(`CRC mismatch for ${load.file} (got ${crc32(f).toString(16)}, want ${load.crc}) — continuing`);
      }
      copyRomLoad(bytes, f, 0, load.size, load.offset, load);
      for (const segment of load.continueSegments ?? []) {
        copyRomLoad(bytes, f, segment.fileOffset, segment.size, segment.offset, load);
      }
      for (const ro of load.reloadOffsets ?? []) copyRomLoad(bytes, f, 0, load.size, ro, load);
    }
    for (const fill of spec.fills ?? []) {
      const start = Math.max(0, fill.offset);
      const end = Math.min(bytes.length, fill.offset + fill.size);
      bytes.fill(fill.value & 0xff, start, end);
    }
    if (spec.invert) {
      for (let index = 0; index < bytes.length; index++) bytes[index] ^= 0xff;
    }
    regions[spec.region] = bytes;
  }
  if (missingOther.length) {
    console.warn(`missing non-critical ROM files (zero-filled): ${missingOther.join(', ')}`);
  }
  if (missingCritical.length) {
    status(`Missing ROM files: ${missingCritical.join(', ')}`);
    throw new Error(`missing rom files: ${missingCritical.join(', ')}`);
  }
  return regions;
}

// ---------------------------------------------------------------------------

/** Human-readable key label from a DOM KeyboardEvent.code. */
function keyLabel(code: string): string {
  const map: Record<string, string> = {
    ArrowLeft: '←', ArrowRight: '→', ArrowUp: '↑', ArrowDown: '↓',
    Space: 'Space', Enter: 'Enter', ShiftLeft: 'Shift', ShiftRight: 'Shift',
  };
  return map[code] ?? code.replace(/^Key|^Digit|^Numpad/, '');
}

/** Friendly function name from a binding's IPT type / graph label. */
function fnLabel(label: string): string {
  const map: Record<string, string> = {
    IPT_START: 'start', IPT_SELECT: 'select',
    IPT_START1: 'start 1P', IPT_START2: 'start 2P',
    IPT_COIN1: 'coin', IPT_COIN2: 'coin 2',
    IPT_BUTTON1: 'fire', IPT_BUTTON2: 'fire 2', IPT_BUTTON3: 'fire 3',
    IPT_DIAL_LEFT: 'steer left', IPT_DIAL_RIGHT: 'steer right',
    IPT_PEDAL: 'accelerate', IPT_PEDAL2: 'brake',
    IPT_SERVICE1: 'service', IPT_SERVICE: 'service',
  };
  if (map[label]) return map[label];
  if (/JOYSTICK|_LEFT|_RIGHT|_UP|_DOWN/.test(label)) return 'move';
  // console pads carry the real button name ("A", "B") in the label — keep
  // short names verbatim, lowercase longer IPT-derived words. A PORT_NAME may
  // also name the player it belongs to ("P1 Jab Punch"); only player one is
  // ever bound, so that prefix is noise repeated once per button.
  const name = label
    .replace(/^IPT_/, '')
    .replace(/^(?:P|Player )1 /, '')
    .replace(/_/g, ' ');
  return name.length <= 2 ? name : name.toLowerCase();
}

/**
 * Build the on-screen controls hint from the generated bindings. With a pad
 * connected, each control also names the pad button that drives it, and the
 * pad itself is announced first.
 */
function controlsHelp(cfg: ShellConfig, pads?: GamepadInput, pointer?: PointerInput): string {
  const parts: string[] = [];
  const dirKeys = new Set<string>();
  const dirPads = new Set<string>();
  const seen = new Set<string>();
  const padNames = (b: FieldBinding): string[] => (pads?.controlNames(b) ?? []).map(name => `🎮 ${name}`);
  for (const b of cfg.bindings) {
    // Player two's controls are the same panel again; the pad note says
    // which pad is player two, and the buttons read the same.
    if ((b.player ?? 1) !== 1) continue;
    const fn = fnLabel(b.label);
    if (fn === 'move') {
      for (const k of b.keys) dirKeys.add(k);
      for (const name of padNames(b)) dirPads.add(name);
      continue;
    }
    // One visible key per alias: a control bound to both the number row and the
    // keypad is one key to the player, and "2 or Numpad2" reads as two.
    const keys = [...new Set([...b.keys.map(keyLabel), ...padNames(b)])].join(' or ');
    if (!keys) continue;
    const line = `${keys}: ${fn}`;
    if (seen.has(line)) continue;
    seen.add(line);
    parts.push(line);
  }
  const connected = pads?.connected() ?? [];
  const head = connected.map(pad =>
    `🎮 ${padName(pad.id)}${connected.length > 1 ? ` (player ${pad.player})` : ''} connected`);
  // A dial or trackball also takes the mouse -- which is what a spinner is.
  if (pointer?.active) {
    const roles = [...new Set(pointer.bindings().map(b => fnLabel(b.label).replace(/ (left|right|up|down)$/i, '')))];
    parts.push(`Mouse or spinner: ${roles.join(', ')}${pointer.isCaptured ? ' (Esc releases)' : ' (click screen to capture)'}`);
  }
  if (cfg.kind === 'computer') {
    const specialKeys = parts.filter(part => /run stop|restore|cbm|ctrl|shift lock/i.test(part));
    return [...head, 'Keyboard: type directly', ...specialKeys, 'Esc: menu'].join(' · ');
  }
  if (dirKeys.size || dirPads.size) {
    const order = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    const arrows = !dirKeys.size ? []
      : [order.every(k => dirKeys.has(k)) ? 'Arrows' : order.filter(k => dirKeys.has(k)).map(keyLabel).join('')];
    head.push(`${[...arrows, ...dirPads].join(' or ')}: move`);
  }
  return [...head, ...parts, 'F: fast-forward', 'Esc: menu'].join(' · ');
}

function buildDom(cfg: ShellConfig) {
  document.title = cfg.title;
  const root = document.createElement('div');
  root.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:10px;padding:16px;min-height:100vh;box-sizing:border-box;background:#111;color:#ddd;font:13px ui-sans-serif,system-ui';
  document.body.style.margin = '0';
  document.body.appendChild(root);

  const h1 = document.createElement('h1');
  h1.textContent = cfg.title;
  h1.style.cssText = 'font-size:15px;font-weight:600;margin:0;display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center';
  if (cfg.preview) h1.appendChild(betaBadge());
  // Controller badge: a pad in hand should be unmistakable, not a word in
  // the legend. Filled by ui.pads() as pads come and go.
  const padBadge = document.createElement('span');
  padBadge.dataset.pads = '';
  padBadge.style.cssText = 'display:none;align-items:center;gap:6px;background:#1f6f3a;color:#dfffe6;border:1px solid #3ccf6a;border-radius:999px;padding:2px 10px;font-size:12px;font-weight:700;letter-spacing:.02em';
  h1.appendChild(padBadge);
  root.appendChild(h1);

  // cabinet column: screen inside cropped bezel art — no banner/marquee or
  // control panel, the screen is the star
  const cab = document.createElement('div');
  cab.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:0';
  root.appendChild(cab);

  // native frame is rendered landscape; the cabinet monitor is rotated (ROT90).
  // `let` because the BOARD owns the true native size (setNative below):
  // bitmap hardware like junofrst has no GFXDECODE, so the config's raw
  // screen params carry the ×3 pixel-clock width (768) — trusting them
  // squeezed the real 256-wide frame into a corner ("postage stamp").
  const rotated = cfg.board.screen.rotate === 90 || cfg.board.screen.rotate === 270;
  let w = cfg.board.screen.width, h = cfg.board.screen.height;
  let dispW = rotated ? h : w, dispH = rotated ? w : h;

  const holder = document.createElement('div');
  holder.style.cssText = 'position:relative';
  const canvas = document.createElement('canvas');
  canvas.width = dispW; canvas.height = dispH;
  // No cursor over the screen: a spinner's cursor is noise, and an arcade
  // monitor never had one.
  canvas.style.cssText = 'image-rendering:pixelated;background:#000;cursor:none';
  canvas.dataset.screen = '1'; // stable handle for browser QA screenshots

  // optional cabinet bezel: the game canvas sits inside its transparent
  // CRT window, the artwork drawn on top (pointer-events off)
  let bezel: { w: number; h: number; win: ArtWindow } | null = null;
  let artworkTints: ArtTint[] = [];
  const bezelCanvas = document.createElement('canvas');
  bezelCanvas.style.cssText = 'position:absolute;inset:0;pointer-events:none';

  const fit = () => {
    // The screen takes what the page leaves it: everything else in the column
    // -- title, status, key hint, and a computer's control decks -- is
    // measured, so adding a deck shrinks the screen instead of pushing the
    // deck off the bottom of the page.
    const gap = 10;
    const reserved = [...root.children]
      .filter(child => child !== cab)
      .reduce((sum, child) => sum + (child as HTMLElement).offsetHeight + gap, 0);
    const availH = Math.max(120, innerHeight - reserved - 32);
    if (bezel) {
      const { w, h, win } = bezel;
      const s = Math.min((innerWidth - 40) / w, availH / h);
      holder.style.width = bezelCanvas.style.width = `${w * s}px`;
      holder.style.height = bezelCanvas.style.height = `${h * s}px`;
      const winW = win.w * s, winH = win.h * s;
      canvas.style.position = 'absolute';
      canvas.style.left = `${win.x * s}px`;
      canvas.style.top = `${win.y * s}px`;
      // MAME layout screen bounds describe the physical CRT aspect, including
      // its non-square pixel correction. Fill those exact bounds instead of
      // preserving the raw raster aspect and letterboxing inside the artwork.
      canvas.style.width = `${winW}px`;
      canvas.style.height = `${winH}px`;
    } else {
      const displayScale = Math.max(1, Math.floor(availH / dispH));
      canvas.style.width = `${dispW * displayScale}px`;
      canvas.style.height = `${dispH * displayScale}px`;
    }
  };
  fit();
  addEventListener('resize', fit);
  holder.appendChild(canvas);
  cab.appendChild(holder);

  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;background:rgba(0,0,0,.75);color:#fff;cursor:pointer;padding:20px';
  overlay.dataset.overlay = '1'; // stable handle for browser QA
  overlay.textContent = 'Loading…';
  holder.appendChild(overlay);

  // Toast over the screen for a moment: "controller connected" and the like.
  const toast = document.createElement('div');
  toast.dataset.toast = '';
  toast.style.cssText = 'position:absolute;top:12px;left:50%;transform:translateX(-50%);background:#f2c200;color:#1b1b1b;font-weight:800;font-size:13px;padding:10px 16px;border-radius:999px;box-shadow:0 6px 24px rgba(0,0,0,.5);pointer-events:none;z-index:5;opacity:0;transition:opacity .25s;white-space:nowrap;max-width:90%;overflow:hidden;text-overflow:ellipsis';
  holder.appendChild(toast);
  let toastTimer = 0;

  const statusEl = document.createElement('div');
  statusEl.style.cssText = 'color:#999;min-height:1.4em;max-width:640px;text-align:center';
  statusEl.textContent = 'Loading…';
  root.appendChild(statusEl);

  const help = document.createElement('div');
  help.dataset.help = ''; // stable handle for browser QA
  help.style.cssText = 'color:#666';
  help.textContent = controlsHelp(cfg);
  root.appendChild(help);

  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  const off = document.createElement('canvas');
  off.width = w; off.height = h;
  const offCtx = off.getContext('2d')!;

  return {
    overlay,
    /** the machine's screen, for pointer capture */
    canvas,
    addControls: (controls: HTMLElement) => { root.appendChild(controls); fit(); },
    /** replace the controls hint, e.g. when a gamepad arrives or leaves */
    controls: (text: string) => { help.textContent = text; fit(); },
    /** show the connected pads beside the title; an empty list hides the badge */
    pads: (names: string[]) => {
      padBadge.style.display = names.length ? 'inline-flex' : 'none';
      padBadge.textContent = names.length ? `🎮 ${names.join(' · ')}` : '';
      fit();
    },
    /** flash a message over the screen for a few seconds */
    toast: (text: string) => {
      toast.textContent = text;
      toast.style.opacity = '1';
      clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => { toast.style.opacity = '0'; }, 4000);
    },
    status: (text: string) => { statusEl.textContent = text; if (overlay.style.display !== 'none' && !overlay.querySelector('[data-dropzone]')) overlay.textContent = text; },
    overlayHide: () => { overlay.style.display = 'none'; },
    /** adopt the board's real framebuffer size when it differs from config */
    setNative: (nw: number, nh: number) => {
      if (nw === w && nh === h) return;
      w = nw; h = nh;
      dispW = rotated ? h : w; dispH = rotated ? w : h;
      canvas.width = dispW; canvas.height = dispH;
      off.width = w; off.height = h;
      ctx.imageSmoothingEnabled = false;
      fit();
    },
    // ROM missing: turn the dark CRT into an inviting drop target
    dropZone: (game: string): DropZone => {
      overlay.textContent = '';
      const zone = document.createElement('div');
      zone.dataset.dropzone = '1';
      zone.style.cssText = `border:3px dashed rgba(242,194,0,.65);border-radius:16px;
        padding:34px 40px;max-width:min(440px,84%);background:rgba(8,10,26,.9);
        display:flex;flex-direction:column;align-items:center;gap:8px;
        box-shadow:0 0 0 rgba(242,194,0,0);
        transition:transform .15s ease,border-color .15s ease,box-shadow .15s ease,background .15s ease`;
      const icon = document.createElement('div');
      icon.style.cssText = 'font-size:46px;line-height:1;filter:drop-shadow(0 4px 12px rgba(242,194,0,.35));animation:m2j-bob 2.2s ease-in-out infinite';
      icon.textContent = '🕹️';
      const big = document.createElement('div');
      big.style.cssText = 'font-size:21px;font-weight:800;color:#f2c200';
      big.textContent = `Drop ${game}.zip here`;
      const small = document.createElement('div');
      small.style.cssText = 'color:#9fb0ff';
      small.textContent = 'or click anywhere on the screen to choose one or more zip files';
      const note = document.createElement('div');
      note.style.cssText = 'color:#667;font-size:12px;margin-top:6px;max-width:320px';
      note.textContent = 'ROMs are copyrighted and not distributed with mamekit — bring your own dump.';

      // opt-in web rescue: the button swaps for a progress bar while
      // waitForZip hunts the mirror bucket (fetch happens there, not here)
      const searchWrap = document.createElement('div');
      searchWrap.style.cssText = 'margin-top:8px;display:flex;flex-direction:column;align-items:center;gap:7px;min-height:36px';
      const searchBtn = document.createElement('button');
      searchBtn.type = 'button';
      searchBtn.textContent = '🔍 Try web search';
      searchBtn.style.cssText = `font:600 13px ui-sans-serif,system-ui;color:#9fb0ff;cursor:pointer;
        background:rgba(159,176,255,.08);border:1px solid rgba(159,176,255,.35);
        border-radius:999px;padding:7px 18px;transition:background .15s ease,border-color .15s ease`;
      searchBtn.addEventListener('mouseenter', () => { searchBtn.style.background = 'rgba(159,176,255,.18)'; searchBtn.style.borderColor = '#9fb0ff'; });
      searchBtn.addEventListener('mouseleave', () => { searchBtn.style.background = 'rgba(159,176,255,.08)'; searchBtn.style.borderColor = 'rgba(159,176,255,.35)'; });
      const searchTrack = document.createElement('div');
      searchTrack.style.cssText = 'display:none;width:min(260px,80%);height:8px;border-radius:999px;background:rgba(159,176,255,.15);overflow:hidden';
      const searchFill = document.createElement('div');
      searchFill.style.cssText = 'width:0%;height:100%;background:linear-gradient(90deg,#9fb0ff,#f2c200);transition:width .16s ease';
      searchTrack.appendChild(searchFill);
      const searchLabel = document.createElement('div');
      searchLabel.style.cssText = 'display:none;color:#9fb0ff;font-size:12px';
      searchWrap.append(searchBtn, searchTrack, searchLabel);
      searchWrap.addEventListener('click', ev => ev.stopPropagation()); // don't open the file picker
      const style = document.createElement('style');
      style.textContent = `@keyframes m2j-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes m2j-shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}`;

      // Exactly which chips the supplied zips must contain (straight from the
      // knowledge graph). Device firmware is required too: split MAME sets
      // keep it in a separate zip from the game.
      const critical = requiredRomRegions(cfg.roms, cfg.board.cpus.map(c => c.region));
      const manifest = document.createElement('details');
      manifest.style.cssText = 'align-self:stretch;margin-top:8px;text-align:left';
      const sum = document.createElement('summary');
      const nFiles = cfg.roms.reduce((n, r) => n + r.loads.length, 0);
      sum.textContent = `What's inside ${game}.zip? (${nFiles} files)`;
      sum.style.cssText = 'cursor:pointer;color:#9fb0ff;font-size:12px;text-align:center;user-select:none';
      const list = document.createElement('div');
      list.style.cssText = `font:11px/1.7 ui-monospace,monospace;color:#8b93c4;max-height:150px;
        overflow:auto;margin-top:6px;padding:8px 12px;background:rgba(0,0,0,.4);border-radius:8px`;
      const rows = new Map<string, { name: HTMLSpanElement; meta: HTMLSpanElement }>();
      for (const r of cfg.roms) {
        for (const l of r.loads) {
          const row = document.createElement('div');
          row.style.cssText = 'display:flex;justify-content:space-between;gap:12px';
          const name = document.createElement('span');
          name.textContent = `${critical.has(r.region) ? '★ ' : '  '}${l.file}`;
          if (critical.has(r.region)) name.style.color = '#f2c200';
          const meta = document.createElement('span');
          meta.textContent = `${(l.size / 1024).toFixed(l.size % 1024 ? 1 : 0)} KB · crc ${l.crc}`;
          row.append(name, meta);
          list.appendChild(row);
          rows.set(`${r.region}/${l.file}`, { name, meta });
        }
      }
      const legend = document.createElement('div');
      legend.style.cssText = 'color:#667;font-size:10px;margin-top:4px';
      legend.textContent = '★ required CPU/device firmware · others fall back to zero-fill with a warning';
      list.appendChild(legend);
      manifest.append(sum, list);
      manifest.addEventListener('click', ev => ev.stopPropagation()); // don't open the file picker

      zone.append(style, icon, big, small, note, searchWrap, manifest);
      overlay.appendChild(zone);
      const idle = () => {
        zone.style.transform = '';
        zone.style.borderColor = 'rgba(242,194,0,.65)';
        zone.style.boxShadow = '0 0 0 rgba(242,194,0,0)';
        zone.style.background = 'rgba(8,10,26,.9)';
      };
      return {
        el: zone,
        armed: () => { // file is hovering — light the cabinet up
          zone.style.transform = 'scale(1.045)';
          zone.style.borderColor = '#fff';
          zone.style.boxShadow = '0 0 44px rgba(242,194,0,.55)';
          zone.style.background = 'rgba(20,24,56,.95)';
          big.textContent = 'Release to insert the ROM!';
          icon.textContent = '⚡';
        },
        idle: () => { idle(); big.textContent = `Drop ${game}.zip here`; icon.textContent = '🕹️'; },
        busy: (name: string) => { idle(); icon.textContent = '⏳'; big.textContent = `Reading ${name}…`; small.textContent = ''; },
        error: (msg: string) => {
          idle();
          icon.textContent = '🚫';
          big.textContent = 'That zip didn’t work';
          small.textContent = msg;
          zone.style.borderColor = '#e0504d';
          zone.style.animation = 'm2j-shake .4s';
          setTimeout(() => { zone.style.animation = ''; }, 450);
        },
        verdict: (check: RomCheck) => {
          idle();
          // paint the manifest chip-by-chip: ✓ verified / ≈ crc differs / ✗ absent
          for (const p of check.perFile) {
            const r = rows.get(`${p.region}/${p.file}`);
            if (!r) continue;
            const mark = p.status === 'ok' ? '✓' : p.status === 'crc' ? '≈' : '✗';
            r.name.textContent = `${mark} ${p.file}`;
            r.name.style.color = p.status === 'ok' ? '#5ecf7a' : p.status === 'crc' ? '#e8b64c' : p.critical ? '#e0504d' : '#a06a68';
          }
          if (check.missingCritical.length) {
            manifest.open = true;
            icon.textContent = '🚫';
            big.textContent = 'More ROM files are required';
            const missingRegions = new Set(check.perFile
              .filter(part => part.critical && part.status === 'missing')
              .map(part => part.region));
            const missingSets = [...new Set(cfg.roms
              .filter(spec => missingRegions.has(spec.region) && spec.romSet)
              .map(spec => `${spec.romSet}.zip`))];
            small.textContent = missingSets.length
              ? `Also select or drop ${missingSets.join(', ')}. Files already supplied are kept for this page.`
              : `${check.missingCritical.length} required CPU chip${check.missingCritical.length > 1 ? 's are' : ' is'} missing — try the "${game}" set.`;
            zone.style.borderColor = '#e0504d';
            zone.style.animation = 'm2j-shake .4s';
            setTimeout(() => { zone.style.animation = ''; }, 450);
          } else if (check.missingOther.length || check.crcMismatch.length) {
            manifest.open = true;
            icon.textContent = '⚠️';
            big.textContent = 'ROMs accepted — starting…';
            small.textContent = check.missingOther.length
              ? `${check.missingOther.length} non-critical chip${check.missingOther.length > 1 ? 's' : ''} missing (zero-filled)`
              : `${check.crcMismatch.length} chip${check.crcMismatch.length > 1 ? 's' : ''} differ from the reference dump`;
            zone.style.borderColor = '#e8b64c';
            zone.style.boxShadow = '0 0 34px rgba(232,182,76,.4)';
          } else {
            icon.textContent = '✅';
            big.textContent = 'ROM set verified — starting!';
            small.textContent = `All ${check.perFile.length} chips match the reference dump.`;
            zone.style.borderColor = '#5ecf7a';
            zone.style.boxShadow = '0 0 34px rgba(94,207,122,.45)';
          }
        },
        search: {
          button: searchBtn,
          start: () => {
            searchBtn.style.display = 'none';
            searchTrack.style.display = 'block';
            searchLabel.style.display = 'block';
            searchFill.style.width = '0%';
            searchLabel.textContent = `Searching the web for ${game}.zip…`;
          },
          progress: (frac: number, label?: string) => {
            searchFill.style.width = `${Math.min(100, Math.round(frac * 100))}%`;
            if (label) searchLabel.textContent = label;
          },
          reset: () => {
            searchTrack.style.display = 'none';
            searchLabel.style.display = 'none';
            searchBtn.style.display = '';
          },
          hide: () => { searchWrap.style.display = 'none'; },
        },
      };
    },
    setBezel: (
      bmp: ImageBitmap | HTMLCanvasElement,
      win: ArtWindow,
      tints: ArtTint[],
    ) => {
      bezelCanvas.width = bmp.width; bezelCanvas.height = bmp.height;
      bezelCanvas.getContext('2d')!.drawImage(bmp, 0, 0);
      holder.insertBefore(bezelCanvas, overlay); // above the game, below the overlay
      bezel = { w: bmp.width, h: bmp.height, win };
      artworkTints = tints;
      fit();
    },
    blit: (image: ImageData) => {
      offCtx.putImageData(image, 0, 0);
      ctx.save();
      if (cfg.board.screen.rotate === 90) {
        // rotate the native landscape frame clockwise onto the portrait canvas
        ctx.translate(dispW, 0);
        ctx.rotate(Math.PI / 2);
      } else if (cfg.board.screen.rotate === 270) {
        // counter-clockwise (Space Invaders cabinets)
        ctx.translate(0, dispH);
        ctx.rotate(-Math.PI / 2);
      } else if (cfg.board.screen.rotate === 180) {
        ctx.translate(dispW, dispH);
        ctx.rotate(Math.PI);
      }
      ctx.drawImage(off, 0, 0);
      ctx.restore();
      if (artworkTints.length) {
        ctx.save();
        ctx.globalCompositeOperation = 'multiply';
        for (const tint of artworkTints) {
          ctx.fillStyle = `rgba(${tint.red * 255},${tint.green * 255},` +
            `${tint.blue * 255},${tint.alpha})`;
          ctx.fillRect(
            tint.x * dispW,
            tint.y * dispH,
            tint.w * dispW,
            tint.h * dispH,
          );
        }
        ctx.restore();
      }
    },
  };
}

function waitForZip(
  ui: ReturnType<typeof buildDom>,
  zone: DropZone,
  specs: RomRegionSpec[],
  critical: Set<string>,
  game: string,
  category: string,
  firmwareKey?: string,
): Promise<Map<string, Uint8Array>> {
  return new Promise(resolve => {
    const pick = document.createElement('input');
    pick.type = 'file';
    pick.accept = '.zip';
    pick.multiple = true;
    let accepted = false;
    const files = new Map<string, Uint8Array>();
    const mergeFiles = (incoming: Map<string, Uint8Array>) => {
      for (const [name, bytes] of incoming) {
        let key = name;
        // Keep same-named chips with different contents: findRomBytes can
        // still select the right one by CRC from this synthetic map key.
        if (files.has(key) && crc32(files.get(key)!) !== crc32(bytes)) {
          key = `${name}#${crc32(bytes).toString(16).padStart(8, '0')}`;
        }
        files.set(key, bytes);
      }
    };
    const ingest = async (name: string, raw: Uint8Array): Promise<boolean> => {
      if (accepted) return true;
      zone.busy(name);
      let incoming: Map<string, Uint8Array>;
      try { incoming = await readZip(raw); }
      catch { zone.error(`${name} isn’t a readable zip — try the original romset.`); return false; }
      mergeFiles(incoming);
      // grade the set against the manifest BEFORE booting: ticks in the
      // list. Previously supplied split-set zips remain accumulated.
      const check = checkRomSet(specs, files, critical);
      zone.verdict(check);
      if (check.missingCritical.length) return false; // stay in the loop for a retry
      accepted = true;
      setTimeout(() => resolve(files), 1100); // let the verdict land before the screen lights up
      return true;
    };
    const handle = async (file: File) => ingest(file.name, new Uint8Array(await file.arrayBuffer()));
    const handleMany = async (selected: Iterable<File>) => {
      for (const file of selected) {
        if (await handle(file)) break;
      }
    };
    pick.addEventListener('change', () => {
      if (pick.files?.length) void handleMany(Array.from(pick.files));
      pick.value = '';
    });

    // "Try web search": probe the mirror bucket while the bar plays out a
    // little theatre — it crawls toward 92% on its own and only lands at
    // 100% when the fetch really returned bytes.
    let searching = false;
    zone.search.button.addEventListener('click', () => {
      if (searching || accepted) return;
      searching = true;
      zone.search.start();
      const started = performance.now();
      let frac = 0;
      const ticker = setInterval(() => {
        frac = Math.min(0.92, frac + (0.92 - frac) * 0.045);
        zone.search.progress(frac,
          frac < 0.35 ? `Searching the web for ${game}.zip…`
          : frac < 0.65 ? 'Checking archive mirrors…'
          : 'Downloading a candidate set…');
      }, 100);
      // even an instant response gets the full ~2.4s story arc
      const finish = (fn: () => void) => setTimeout(() => {
        clearInterval(ticker);
        searching = false;
        fn();
      }, Math.max(0, 2400 - (performance.now() - started)));
      const sets = [game, ...dependencyRomSets(specs, game)];
      Promise.allSettled(sets.map(async set => ({ set, raw: await fetchRomSet(set, category, firmwareKey) }))).then(
        results => finish(() => {
          const found = results.flatMap(result => result.status === 'fulfilled' ? [result.value] : []);
          if (!found.length) {
            zone.search.reset();
            zone.error(`Couldn’t find ${game}.zip on the web — drop your own dump.`);
            return;
          }
          zone.search.progress(1, `Found ${found.length} of ${sets.length} required ROM set${sets.length > 1 ? 's' : ''}!`);
          setTimeout(() => {
            void (async () => {
              let ok = false;
              for (const item of found) ok = await ingest(`${item.set}.zip`, item.raw);
              if (ok) zone.search.hide();
              else zone.search.reset();
            })();
          }, 500);
        }),
        () => finish(() => {
          zone.search.reset();
          zone.error(`Couldn’t find ${game}.zip on the web — drop your own dump.`);
        }),
      );
    });
    ui.overlay.addEventListener('click', () => pick.click());
    // dragenter/leave fire on every child crossed — depth-count to know when
    // the file has truly left the window
    let depth = 0;
    addEventListener('dragover', ev => ev.preventDefault());
    addEventListener('dragenter', ev => { ev.preventDefault(); if (++depth === 1) zone.armed(); });
    addEventListener('dragleave', () => { if (--depth <= 0) { depth = 0; zone.idle(); } });
    addEventListener('drop', ev => {
      ev.preventDefault();
      depth = 0;
      const dropped = ev.dataTransfer?.files;
      if (dropped?.length) void handleMany(Array.from(dropped));
      else zone.idle();
    });
  });
}

// --- control decks -------------------------------------------------------------
// The shell's own controls share one look: a dark panel with the room's gold
// accent, buttons that read as pressed when the thing they control is on, and
// readouts taken from the device rather than from what was last clicked.

const DECK_GOLD = '#f2c200';

function deckPanel(title: string): HTMLElement {
  const panel = document.createElement('div');
  panel.style.cssText = `display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px 10px;
    padding:10px 14px;margin:6px 0;border-radius:10px;max-width:880px;
    background:linear-gradient(135deg,rgba(24,30,67,.96),rgba(9,12,29,.96));border:1px solid #252d62;
    box-shadow:inset 0 1px rgba(255,255,255,.05),0 10px 24px rgba(0,0,0,.3);font:13px ui-sans-serif,system-ui,sans-serif`;
  const label = document.createElement('span');
  label.textContent = title;
  label.style.cssText = 'color:#7f8ac9;font:700 10px ui-monospace,monospace;letter-spacing:2px;margin-right:4px';
  panel.appendChild(label);
  return panel;
}

/** The save-state deck: two buttons, a shelf of what this browser holds, and the store behind them. */
function saveStateDeck(options: {
  cfg: ShellConfig;
  identity: string;
  save: () => MachineState;
  load: (state: MachineState) => void;
  screen: HTMLCanvasElement;
  toast: (text: string) => void;
}): {
  deck: HTMLElement;
  save(): Promise<SaveRecord | undefined>;
  load(id: string): Promise<boolean>;
  loadLatest(): Promise<boolean>;
  list(): Promise<SaveRecord[]>;
  remove(id: string): Promise<void>;
} {
  const { cfg, identity, toast } = options;
  const deck = deckPanel('SAVE STATES');
  deck.setAttribute('data-saves-deck', '');
  deck.setAttribute('aria-label', 'Save states');
  for (const type of ['keydown', 'keyup']) deck.addEventListener(type, event => event.stopPropagation());
  const saveButton = deckButton('💾 Save state', { solid: true });
  saveButton.title = cfg.kind === 'computer' ? 'Capture the whole machine as it is now' : 'Capture the whole machine as it is now (Shift+F7)';
  const loadButton = deckButton('⟲ Load latest');
  loadButton.title = cfg.kind === 'computer' ? 'Put the machine back to the newest save' : 'Put the machine back to the newest save (F7)';
  const note = document.createElement('span');
  note.style.cssText = 'color:#7f8ac9;font-size:11px;flex-basis:100%;text-align:center';
  const shelf = document.createElement('div');
  shelf.dataset.savesShelf = '';
  shelf.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;justify-content:center;flex-basis:100%';
  deck.append(saveButton, loadButton, note, shelf);
  const store = openSaveStore();

  const when = (createdAt: number): string => {
    const date = new Date(createdAt);
    return `${date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} ${date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`;
  };
  const thumbnail = (): string | undefined => {
    try {
      const source = options.screen;
      if (!source.width || !source.height) return undefined;
      const scale = 120 / Math.max(source.width, source.height);
      const small = document.createElement('canvas');
      small.width = Math.max(1, Math.round(source.width * scale));
      small.height = Math.max(1, Math.round(source.height * scale));
      const context = small.getContext('2d');
      if (!context) return undefined;
      context.imageSmoothingEnabled = true;
      context.drawImage(source, 0, 0, small.width, small.height);
      return small.toDataURL('image/jpeg', 0.7);
    } catch {
      return undefined;
    }
  };

  let records: SaveRecord[] = [];
  const render = async (): Promise<void> => {
    const opened = await store;
    records = await opened.list(cfg.game);
    const foreign = records.filter(record => record.identity !== identity).length;
    note.textContent = !opened.persistent
      ? 'Saves last only this session: browser storage is unavailable.'
      : records.length === 0
        ? 'Saves stay in this browser and never leave it.'
        : `${records.length} save${records.length === 1 ? '' : 's'} in this browser` +
          (foreign ? ` · ${foreign} from another ROM set or build` : '');
    loadButton.disabled = !records.some(record => record.identity === identity);
    setDeckButtonState(loadButton, false);
    shelf.replaceChildren(...records.map(record => {
      const card = document.createElement('div');
      card.dataset.save = record.id;
      const usable = record.identity === identity;
      card.style.cssText = `display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px;border-radius:8px;
        background:#0c0f26;border:1px solid ${usable ? '#303a78' : '#4a2a2a'};font-size:11px;color:#cbd1ff;${usable ? '' : 'opacity:.6'}`;
      const picture = document.createElement(record.thumbnail ? 'img' : 'div');
      picture.style.cssText = 'width:96px;height:72px;object-fit:contain;background:#000;border-radius:4px';
      if (record.thumbnail) (picture as HTMLImageElement).src = record.thumbnail;
      const caption = document.createElement('span');
      caption.textContent = `frame ${record.frame} · ${when(record.createdAt)}`;
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;gap:6px';
      const load = deckButton('Load');
      load.title = usable ? 'Put the machine back to this save' : 'Made with a different ROM set or build';
      load.disabled = !usable;
      setDeckButtonState(load, false);
      load.onclick = () => { void loadRecord(record); load.blur(); };
      const remove = deckButton('✕');
      remove.title = 'Delete this save';
      remove.setAttribute('aria-label', 'Delete this save');
      remove.onclick = () => { void opened.remove(record.id).then(render); };
      row.append(load, remove);
      card.append(picture, caption, row);
      return card;
    }));
  };

  const saveNow = async (): Promise<SaveRecord | undefined> => {
    let state: MachineState;
    try {
      state = options.save();
    } catch (error) {
      toast(`Could not save: ${(error as Error).message.split('\n')[0]}`);
      return undefined;
    }
    const createdAt = Date.now();
    const record: SaveRecord = {
      id: saveId(cfg.game, createdAt),
      game: cfg.game,
      identity,
      title: cfg.title,
      frame: state.frame,
      createdAt,
      thumbnail: thumbnail(),
      state,
    };
    try {
      await (await store).put(record);
    } catch (error) {
      toast(`Could not store the save: ${(error as Error).message}`);
      return undefined;
    }
    toast(`Saved · frame ${state.frame}`);
    await render();
    return record;
  };
  const loadRecord = async (record: SaveRecord): Promise<boolean> => {
    if (record.identity !== identity) {
      toast('That save was made with a different ROM set or build');
      return false;
    }
    try {
      options.load(record.state);
    } catch (error) {
      toast(`Could not load: ${(error as Error).message.split('\n')[0]}`);
      return false;
    }
    toast(`Loaded · frame ${record.frame}`);
    return true;
  };
  saveButton.onclick = () => { void saveNow(); saveButton.blur(); };
  loadButton.onclick = () => { void loadLatest(); loadButton.blur(); };
  const loadLatest = async (): Promise<boolean> => {
    if (!records.length) await render();
    const latest = records.find(record => record.identity === identity);
    if (!latest) { toast('No save for this machine yet (Shift+F7 makes one)'); return false; }
    return loadRecord(latest);
  };
  void render();
  return {
    deck,
    save: saveNow,
    load: async id => {
      const record = await (await store).get(id);
      return record ? loadRecord(record) : false;
    },
    loadLatest,
    list: async () => (await store).list(cfg.game),
    remove: async id => { await (await store).remove(id); await render(); },
  };
}

function deckButton(text: string, options: { solid?: boolean } = {}): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = text;
  button.dataset.solid = options.solid ? '1' : '';
  setDeckButtonState(button, false);
  return button;
}

/** Paint a deck button as idle, active (the thing it controls is on) or disabled. */
function setDeckButtonState(button: HTMLButtonElement, active: boolean): void {
  const enabled = !button.disabled;
  button.style.cssText = `padding:6px 14px;border-radius:8px;font:700 12px ui-sans-serif,system-ui,sans-serif;
    letter-spacing:.3px;cursor:${enabled ? 'pointer' : 'default'};transition:background .12s ease,color .12s ease;
    ${active
      ? `background:${DECK_GOLD};color:#1b1b1b;border:2px solid ${DECK_GOLD};box-shadow:0 0 14px ${DECK_GOLD}55`
      : `background:${enabled ? '#111633' : '#0c0f26'};border:2px solid ${enabled ? '#303a78' : '#1e2450'};color:${enabled ? '#cbd1ff' : '#555c86'}`}
    ${enabled ? '' : ';opacity:.6'}`;
}

/** mm:ss for a tape counter */
function tapeClock(seconds: number): string {
  const whole = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(whole / 60)).padStart(2, '0')}:${String(whole % 60).padStart(2, '0')}`;
}

/** Local image selection and transport controls; the generated device owns playback. */
function cassetteControls(media: CassetteMedia, releaseKeys: () => void, initial: MountedImage[] = []): HTMLElement {
  const deck = deckPanel('DATASSETTE');
  deck.setAttribute('aria-label', `Cassette ${media.tag}`);
  for (const type of ['keydown', 'keyup']) deck.addEventListener(type, event => event.stopPropagation());
  deck.addEventListener('focusin', releaseKeys);

  // A hidden native input behind a deck button: the browser's own control
  // cannot be styled and its "No file chosen" says nothing about the deck.
  const picker = document.createElement('input');
  picker.type = 'file';
  picker.accept = ['.zip', ...media.extensions.map(extension => `.${extension}`)].join(',');
  picker.setAttribute('aria-label', 'Open tape image or ZIP');
  picker.tabIndex = -1;
  picker.style.cssText = 'position:fixed;left:-9999px;width:1px;height:1px;opacity:0';
  const open = deckButton('◍ Open tape…');
  open.title = `Open a ${media.extensions.map(extension => `.${extension}`).join(' / ')} image or a software-list ZIP`;
  open.onclick = () => picker.click();

  const mounted = document.createElement('span');
  mounted.setAttribute('data-tape-name', '');
  mounted.style.cssText = `padding:5px 10px;border-radius:6px;background:#080b1d;border:1px solid #303a78;
    color:#9fb0ff;font:600 12px ui-monospace,monospace;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap`;
  mounted.textContent = 'no tape';
  const side = document.createElement('select');
  side.setAttribute('aria-label', 'Tape image');
  side.style.cssText = 'padding:5px 8px;border-radius:6px;border:1px solid #303a78;background:#111633;color:#d8dcff;font:inherit;cursor:pointer';
  side.hidden = true;

  const play = deckButton('▶ Play');
  const stop = deckButton('■ Stop');
  const rewind = deckButton('⏮ Rewind');
  play.setAttribute('data-tape-play', '');
  stop.setAttribute('data-tape-stop', '');
  const buttons = [play, stop, rewind];
  for (const button of buttons) button.disabled = true;

  const status = document.createElement('span');
  status.setAttribute('role', 'status');
  status.style.cssText = 'flex-basis:100%;text-align:center;color:#8f99d2;font-size:12px;min-height:1.3em';
  status.textContent = 'Open a tape, enter the computer’s load command, then press Play.';

  // Readout: transport state and counter, read back from the device 4x a
  // second. "Playing" alone is not tape moving -- the computer's motor line
  // decides that -- so both are shown, and the bar is the position.
  const readout = document.createElement('span');
  readout.setAttribute('data-tape-readout', '');
  readout.style.cssText = 'display:inline-flex;align-items:center;gap:8px;color:#cbd1ff;font:600 12px ui-monospace,monospace';
  const lamp = document.createElement('span');
  lamp.style.cssText = 'width:9px;height:9px;border-radius:50%;background:#3a3f6a;box-shadow:none;transition:background .15s ease';
  const stateText = document.createElement('span');
  stateText.textContent = 'STOPPED';
  const counter = document.createElement('span');
  counter.style.color = '#8f99d2';
  counter.textContent = '00:00 / 00:00';
  const bar = document.createElement('span');
  bar.style.cssText = 'position:relative;width:120px;height:6px;border-radius:3px;background:#080b1d;border:1px solid #303a78;overflow:hidden';
  const fill = document.createElement('span');
  fill.style.cssText = `position:absolute;left:0;top:0;bottom:0;width:0;background:linear-gradient(90deg,#9fb0ff,${DECK_GOLD})`;
  bar.appendChild(fill);
  readout.append(lamp, stateText, counter, bar);

  let hasTape = false;
  const paint = (): void => {
    const playing = hasTape && media.playing();
    const motor = hasTape && media.motorOn();
    const position = hasTape ? media.position() : 0;
    const length = hasTape ? media.length() : 0;
    setDeckButtonState(play, playing);
    setDeckButtonState(stop, hasTape && !playing);
    setDeckButtonState(rewind, false);
    // The computer, not the deck, pulls the tape: with Play pressed and the
    // motor line off the tape sits still, before a LOAD has been typed and
    // again once the load has finished -- say which, or the deck looks stuck.
    stateText.textContent = !hasTape ? 'NO TAPE'
      : playing && motor ? 'PLAYING'
        : playing && position < 0.5 ? 'PLAY · WAITING FOR LOAD'
          : playing ? 'PLAY · PAUSED BY COMPUTER'
            : 'STOPPED';
    stateText.style.color = playing && motor ? DECK_GOLD : playing ? '#e8b64c' : '#cbd1ff';
    lamp.style.background = playing && motor ? DECK_GOLD : playing ? '#e8b64c' : '#3a3f6a';
    lamp.style.boxShadow = playing && motor ? `0 0 8px ${DECK_GOLD}` : 'none';
    counter.textContent = `${tapeClock(position)} / ${tapeClock(length)}`;
    fill.style.width = length > 0 ? `${Math.min(100, (position / length) * 100).toFixed(1)}%` : '0';
  };
  play.onclick = () => {
    try {
      media.play();
      status.textContent = media.motorOn()
        ? 'Play pressed — the computer is running the tape.'
        : 'Play pressed — the tape moves once the computer starts the motor: type LOAD and press Enter.';
    }
    catch (error) { status.textContent = String(error); }
    paint(); play.blur();
  };
  stop.onclick = () => {
    try { media.stop(); status.textContent = 'Tape stopped.'; }
    catch (error) { status.textContent = String(error); }
    paint(); stop.blur();
  };
  rewind.onclick = () => {
    try { media.rewind(); status.textContent = 'Tape rewound.'; }
    catch (error) { status.textContent = String(error); }
    paint(); rewind.blur();
  };

  let images = new Map<string, Uint8Array>();
  const mount = () => {
    const name = side.value;
    const bytes = images.get(name);
    if (!bytes) return;
    try {
      media.stop();
      media.mount(name.split('.').pop()!.toLowerCase(), bytes);
      hasTape = true;
      for (const button of buttons) button.disabled = false;
      mounted.textContent = name;
      mounted.title = name;
      mounted.style.color = '#f4f5ff';
      status.textContent = `${name} mounted. Enter the computer’s load command, then press Play.`;
    } catch (error) {
      hasTape = false;
      for (const button of buttons) button.disabled = true;
      mounted.textContent = 'no tape';
      status.textContent = String(error);
    }
    paint();
  };
  side.onchange = mount;
  picker.onchange = async () => {
    const file = picker.files?.[0];
    if (!file) return;
    picker.disabled = true;
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const files = /\.zip$/i.test(file.name) ? await readZip(bytes) : new Map([[file.name, bytes]]);
      images = new Map([...files].filter(([name]) => media.extensions.includes(name.split('.').pop()!.toLowerCase())));
      if (!images.size) throw new Error(`No supported tape image found (${media.extensions.join(', ')}).`);
      side.replaceChildren(...[...images.keys()].map(name => new Option(name, name)));
      side.hidden = images.size < 2;
      mount();
    } catch (error) { status.textContent = String(error); }
    finally { picker.disabled = false; picker.value = ''; picker.blur(); }
  };
  deck.append(picker, open, mounted, side, play, stop, rewind, readout, status);
  if (initial.length) {
    images = new Map(initial.map(image => [image.name, image.bytes]));
    side.replaceChildren(...[...images.keys()].map(name => new Option(name, name)));
    side.hidden = images.size < 2;
    mount();
  }
  paint();
  setInterval(paint, 250);
  return deck;
}
