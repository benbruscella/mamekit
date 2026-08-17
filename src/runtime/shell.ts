// Browser shell: ROM loading, canvas presentation (with screen rotation),
// keyboard input, audio bring-up, and the fixed-timestep run loop.
// Pure DOM — no libraries.

import { createBoard } from './generated-board.ts';
import { loadArtwork, type ArtTint, type ArtWindow } from './artwork.ts';
import { KeyboardInput, type FieldBinding, type DipDefault, type PortSpec } from './input.ts';
import { AudioOutput } from './audio.ts';
import { readZip, crc32 } from './zip.ts';
import type { Regions, BoardConfig } from './types.ts';
import type { GeneratedAudioRoute } from '../ir/board.ts';
import type { GeneratedAuxiliaryAudioDevice, GeneratedDacFilterPlan, GeneratedDiscreteDacPlan, GeneratedDiscreteEffectsPlan, GeneratedDiscreteMixerPlan, GeneratedSpeakerFilterPlan } from '../ir/audio-protocol.ts';
import { fetchRomBytes } from './rom-source.ts';

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
  /** Per-output routes lowered from MAME add_route calls. */
  routes?: GeneratedAudioRoute[];
  /** MAME discrete DAC/filter network mixed with the primary core. */
  auxiliary?: GeneratedDacFilterPlan;
  /** Source-routed secondary stream devices mixed by the generated worklet. */
  auxiliaryDevices?: GeneratedAuxiliaryAudioDevice[];
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
async function fetchRomSet(game: string): Promise<Uint8Array> {
  const bytes = await fetchRomBytes(`arcade/${game}.zip`);
  if (!bytes) throw new Error(`no web source had ${game}.zip`);
  return bytes;
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
  kind?: 'arcade' | 'console';
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
    /** generated cartridge availability index, when a local dump audit existed */
    cartsUrl?: string;
    /**
     * Local cartridge photography under /artwork/carts/<list>, keyed by softlist
     * short name: `cart` is the whole shell, `sticker` is the label only.
     */
    cartArt?: Record<string, { cart?: string; sticker?: string }>;
  };
  /** base url of the compiled runtime dir (for worklet modules) */
  runtimeUrl: string;
  /** where Esc returns to (the boot menu) */
  menuUrl?: string;
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
      kind: 'byte-substitution';
      sourceRegion: string;
      targetRegion: string;
      start: number;
      end: number;
      table: number[];
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
export async function runShell(cfg: ShellConfig, preloaded?: Regions): Promise<void> {
  const ui = buildDom(cfg);

  // Cabinet bezels are arcade presentation. Console carts boot into the clean
  // television viewport from their room and must not probe for an arcade
  // artwork zip that cannot exist.
  if (cfg.kind !== 'console') {
    void loadArtwork(cfg.game, 'bezel').then(art => {
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
  if (preloaded) {
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
    const files = await waitForZip(ui, zone, cfg.roms, critical, cfg.game);
    regions = assembleRegions(cfg.roms, files, ui.status, critical);
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

  const audio = new AudioOutput();
  const board = createBoard({ ...cfg.board, game: cfg.game }, regions, input, {
    soundWrite: (offset, data, frac, method) => audio.write(offset, data, frac, method),
    soundData: (id, bytes) => audio.data(id, bytes),
  });
  // Match MAME's soft-reset key. This is needed by boards such as Qix whose
  // first-boot operator flow stores a language in NVRAM and asks for a reset.
  addEventListener('keydown', event => {
    if (event.code !== 'F3' || event.repeat) return;
    event.preventDefault();
    input.releaseAll();
    board.reset();
  });
  ui.setNative(board.fbWidth, board.fbHeight); // the board owns true geometry

  const fb = new Uint32Array(board.fbWidth * board.fbHeight);
  const image = new ImageData(
    new Uint8ClampedArray(fb.buffer), board.fbWidth, board.fbHeight);

  // debug/testing handle (also the hook for the future live KG-viewer overlay)
  (window as unknown as Record<string, unknown>).mamekit = { board, input, config: cfg, audio };

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
        routes: cfg.sound.routes,
        auxiliary: cfg.sound.auxiliary,
        auxiliaryDevices: cfg.sound.auxiliaryDevices,
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
    let ran = false;
    while (acc >= frameMs) {
      input.advance();
      board.frame(fb);
      audio.flush(); // one batch message per emulated frame
      acc -= frameMs;
      ran = true;
      frames++;
    }
    if (ran) ui.blit(image);
    if (now - fpsWindowStart >= 1000) {
      const snap = board.snapshot();
      const parts = [`${frames} fps`, `pc=${hex4(snap.cpus[0].pc)}`];
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
  return map[code] ?? code.replace(/^Key|^Digit/, '');
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
  // short names verbatim, lowercase longer IPT-derived words
  const name = label.replace(/^IPT_/, '').replace(/_/g, ' ');
  return name.length <= 2 ? name : name.toLowerCase();
}

/** Build the on-screen controls hint from the generated bindings. */
function controlsHelp(cfg: ShellConfig): string {
  const parts: string[] = [];
  const dirKeys = new Set<string>();
  const seen = new Set<string>();
  for (const b of cfg.bindings) {
    const fn = fnLabel(b.label);
    if (fn === 'move') { for (const k of b.keys) dirKeys.add(k); continue; }
    const keys = b.keys.map(keyLabel).join(' or ');
    const line = `${keys}: ${fn}`;
    if (seen.has(line)) continue;
    seen.add(line);
    parts.push(line);
  }
  const head: string[] = [];
  if (dirKeys.size) {
    const order = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    const arrows = order.every(k => dirKeys.has(k))
      ? 'Arrows' : order.filter(k => dirKeys.has(k)).map(keyLabel).join('');
    head.push(`${arrows}: move`);
  }
  return [...head, ...parts, 'Esc: menu'].join(' · ');
}

function buildDom(cfg: ShellConfig) {
  document.title = cfg.title;
  const root = document.createElement('div');
  root.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:10px;padding:16px;min-height:100vh;box-sizing:border-box;background:#111;color:#ddd;font:13px ui-sans-serif,system-ui';
  document.body.style.margin = '0';
  document.body.appendChild(root);

  const h1 = document.createElement('h1');
  h1.textContent = cfg.title;
  h1.style.cssText = 'font-size:15px;font-weight:600;margin:0';
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
  canvas.style.cssText = 'image-rendering:pixelated;background:#000';

  // optional cabinet bezel: the game canvas sits inside its transparent
  // CRT window, the artwork drawn on top (pointer-events off)
  let bezel: { w: number; h: number; win: ArtWindow } | null = null;
  let artworkTints: ArtTint[] = [];
  const bezelCanvas = document.createElement('canvas');
  bezelCanvas.style.cssText = 'position:absolute;inset:0;pointer-events:none';

  const fit = () => {
    const availH = innerHeight - 150;
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
  overlay.textContent = 'Loading…';
  holder.appendChild(overlay);

  const statusEl = document.createElement('div');
  statusEl.style.cssText = 'color:#999;min-height:1.4em;max-width:640px;text-align:center';
  statusEl.textContent = 'Loading…';
  root.appendChild(statusEl);

  const help = document.createElement('div');
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
      Promise.allSettled(sets.map(async set => ({ set, raw: await fetchRomSet(set) }))).then(
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
