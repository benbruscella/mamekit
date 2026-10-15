// Shared runtime contracts. Everything in src/runtime is hardware-neutral;
// machine and hardware behavior is generated from MAME source.

/** Loaded ROM regions, keyed by MAME region tag ("maincpu", "gfx1", "proms", ...). */
export type Regions = Record<string, Uint8Array>;

/**
 * A board video renderer. Native (pre-rotation) resolution; the shell applies
 * screen rotation (ROT90 etc.) when blitting.
 */
export interface VideoRenderer {
  readonly width: number;    // native visible width  (galaga: 288)
  readonly height: number;   // native visible height (galaga: 224)
  /** Render one full frame as packed ABGR (canvas ImageData byte order). */
  render(frame: Uint32Array): void;
  /** Render one native raster line when MAME requests scanline updates. */
  renderLine?(frame: Uint32Array, line: number): void;
  /** Called once per vblank to latch per-frame state (starfield scroll, etc). */
  vblank(): void;
}

/** One mono audio DSP core, pulled by the audio glue at its native rate. */
export interface SoundCore {
  readonly sampleRate: number;
  /** Register write, already time-ordered. */
  write(offset: number, data: number): void;
  /** Fill `out` with the next out.length mono samples in [-1, 1]. */
  render(out: Float32Array): void;
}

/** Active-low raw input port state, updated by the shell from DOM events. */
export interface InputPorts {
  /** read the current byte for a port tag ("IN0", "IN1", "DSWA", "DSWB") */
  read(tag: string): number;
}

// ---------------------------------------------------------------------------
// board contracts shared by the shell and generated machine composition
// ---------------------------------------------------------------------------

import type { BoardConfig } from '../ir/host-config.ts';
export type { BoardConfig, CpuSpec } from '../ir/host-config.ts';


export interface BoardSinks {
  /**
   * Sound register write, forwarded to the audio worklet (offset space is
   * per SoundCore). `frac` is the write's position within the current video
   * frame (0..1, e.g. scanline/vtotal): boards emulate a whole frame in one
   * burst, so without it every write lands at the same instant and fast SFX
   * sweeps quantize into chirpy stair-steps. Pass it whenever known.
   */
  soundWrite: (offset: number, data: number, frac?: number, method?: string) => void;
  /**
   * Bulk sample-data push to the worklet (NES DMC: the APU DSP runs in the
   * worklet and cannot read CPU memory, so the board snapshots the sample
   * bytes at trigger time and ships them). `id` names the buffer slot the
   * core's register writes refer to.
   */
  soundData?: (id: number, bytes: Uint8Array) => void;
}

export interface BoardSnapshot {
  frame: number;
  cpus: {
    tag: string;
    pc: number;
    sp: number;
    halted: boolean;
    held?: boolean;
    cycles?: number;
  }[];
  /** current credit count when the board tracks one (shown in the status line) */
  credits?: number;
  [extra: string]: unknown;
}

/** A composed machine: CPUs + devices + video, stepped one frame at a time. */
export interface CassetteMedia {
  tag: string;
  extensions: string[];
  mount(extension: string, bytes: Uint8Array): void;
  play(): void;
  stop(): void;
  rewind(): void;
  /** tape position in seconds */
  position(): number;
  /** mounted image length in seconds, 0 with nothing mounted */
  length(): number;
  /** the transport is in PLAY; the computer's motor line decides whether tape moves */
  playing(): boolean;
  /** the computer is driving the motor */
  motorOn(): boolean;
}

export interface Board {
  media?(): CassetteMedia[];
  readonly fbWidth: number;
  readonly fbHeight: number;
  frame(fb: Uint32Array): void;
  reset(): void;
  snapshot(): BoardSnapshot;
  /** progress through the frame being emulated, 0..1; 1 between frames */
  frameFraction?(): number;
  /** The whole machine, restorable by `load()` into a board of the same game and ROM set. */
  save(): MachineState;
  /** Write a `save()` back in place; throws, changing nothing further, if any part cannot be matched. */
  load(state: MachineState): void;
  /**
   * The memory MAME would carry between sessions: every share or region an
   * `NVRAM` device declares, live (writes land in the machine). A board with
   * no such device answers an empty list.
   */
  persistentMemory(): PersistentMemory[];
  /**
   * Byte access to one CPU's address space or to a board share, the way the
   * hiscore plugin addresses memory (`cpu.spaces[space]:read_u8`). Reads
   * and writes go through the bus, so a mapped handler answers as it would
   * for the CPU. Undefined when the board has no such CPU, space or share.
   */
  memory(row: { cpu: string; space?: string; share?: string }): MemoryAccess | undefined;
}

/** One battery-backed memory the board composed, by the MAME tag that declared it. */
export interface PersistentMemory {
  kind: 'share' | 'region';
  tag: string;
  bytes: Uint8Array;
}

export interface MemoryAccess {
  read(address: number): number;
  write(address: number, value: number): void;
}

/** One run of bytes a game keeps its scores in; see mame/hiscore-dat.ts. */
export interface HiscoreRow {
  cpu: string;
  space?: string;
  share?: string;
  address: number;
  length: number;
  first: number;
  last: number;
  fill?: number;
}

/** The target's hiscore.dat entry, compiled into its config. */
export interface HiscoreTable {
  delaySeconds?: number;
  rows: HiscoreRow[];
}

/**
 * A captured machine (see machine-state.ts). Structured-clone friendly, so
 * IndexedDB stores it as it is; nothing in it is a ROM byte the visitor did
 * not already supply.
 */
export interface MachineState {
  format: 1;
  game: string;
  frame: number;
  /** Regions whose bytes moved since assembly: NVRAM, EEPROM data, decrypted-in-place code. */
  regions: Record<string, Uint8Array>;
  /** Every board share, whole. */
  shares: Record<string, Uint8Array>;
  /** The walked runtime containers. */
  roots: unknown;
}
