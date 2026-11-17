// Contract for a sound family's runtime wiring.
//
// The board used to switch on sound kind to install each family's register
// handlers — the fifth place a family had to be registered. A capability
// package now installs its own, through a context that exposes only the
// generic machinery: generated-call aliases, calls on composed devices, their
// streams, the scheduler's time and the audio sink.
//
// This ships to the browser, so it wires generated IR and nothing else. No DSP,
// no register models, no MAME source.

import type { BoardIr } from '../ir/board.ts';

/** The `sound_stream` a device allocated, which the mixer renders. */
export interface SoundStreamSurface {
  rate: number;
  /** The outputs the device's `stream_alloc` asked for. */
  outputs?: number;
  samples: () => number;
  put: (channel: number, index: number, value: number) => number;
  /** sound_stream::add, accumulating on the sample put has written. */
  add?: (channel: number, index: number, value: number) => number;
}

export interface SoundRuntimeContext {
  board: BoardIr;
  /** The board's generated sound binding; never undefined when this runs. */
  sound: NonNullable<BoardIr['sound']>;
  /** Generated-handler call aliases, keyed as "<tag>.<method>". */
  calls: Record<string, (...args: number[]) => unknown>;
  /** Driver state members. */
  state: Record<string, unknown>;
  /** Forward a register write to the generated worklet. */
  soundWrite(offset: number, data: number, frac?: number, method?: string): void;
  /** Stream devices whose own samples are reported as `<tag>.stream` (acceptance gates). */
  observeStreams?: readonly string[];
  /** Position within the current video frame, so writes keep their timing. */
  fraction(): number;
  /** Scheduler time, including the running instruction. */
  time?(): number;
  /** Bind a framework service on an already composed generated device. */
  bindDeviceCall?(tag: string, name: string, callback: (...args: any[]) => unknown): void;
  /** sound_manager::system_mute, as a device last set it. */
  systemMuted?(): boolean;
  /** Call a method on an instantiated generated device, if it has one. */
  // A stream-rendering chip is handed MAME's own `sound_stream` surface, so
  // the argument is not always a number.
  callDevice(tag: string, method: string, ...args: unknown[]): number | undefined;
  /** The native rate a main-thread device gave `stream_alloc`, once started. */
  deviceStreamRate?(tag: string): number | undefined;
  /** Every stream the device allocated, in `stream_alloc` order. */
  deviceStreams?(tag: string): readonly SoundStreamSurface[];
  /**
   * Where a device the scheduler runs in its round beside the CPUs (a POKEY)
   * stands, in seconds; undefined for any other. It is behind the CPUs until
   * the round reaches it, so its stream is rendered no further than this.
   */
  deviceTime?(tag: string): number | undefined;
  /**
   * The time every processor of the round has run to. MAME mixes from a timer
   * (`sound_manager::update`), which fires once all of them stand at it; a
   * mix reaching past this would render a stream before a processor later in
   * the round has made the writes that fall inside it.
   */
  settledTime?(): number;
  /**
   * The rate of a processor's cycles as it stands now: `set_unscaled_clock`
   * moves it, and a loaded state restores it.
   */
  cpuCycleClock?(cpuTag: string): number;
  /**
   * Sound devices a board device is built out of that render a routed stream,
   * by MAME tag, with their route gain: an NES cartridge's MMC5, VRC6 or Namco
   * 163, which exist only once a cartridge chose that board. callDevice and
   * bindDeviceCall reach them by these tags.
   */
  streamDescendants?(): readonly { tag: string; gain: number }[];
}

export interface SoundRuntimeHooks {
  /** Advance an integrated sound device by CPU cycles actually elapsed. */
  tickCpu?(cpuTag: string, cycles: number): void;
  /**
   * A processor's time moved without it running: cycles booked to it while
   * held in RESET, or its clock changed. A hook that counts tickCpu's cycles
   * toward a deadline starts its count again.
   */
  cpuTimeMoved?(cpuTag: string): void;
  /** The board finished a frame: anything still to render for it renders now. */
  endFrame?(): void;
  reset?(): void;
  /** What the hooks carry between calls, so a save state can take it (machine-state.ts). */
  state?: Record<string, unknown>;
}

export type SoundRuntimeInstaller =
  (context: SoundRuntimeContext) => SoundRuntimeHooks | void;

/** Every name a generated handler may use to reach one device. */
export function deviceAliases(board: BoardIr, tag: string): string[] {
  const member = board.devices?.find(device => device.tag === tag)?.member;
  return [tag, `m_${tag}`, ...(member ? [member] : [])];
}

/** The chips this sound binding covers, in board order. */
export function soundTags(sound: NonNullable<BoardIr['sound']>): string[] {
  return sound.deviceTags ?? [sound.deviceTag];
}
