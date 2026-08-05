// Contract for a sound family's runtime wiring.
//
// The board used to switch on sound kind to install each family's register
// handlers — the fifth place a family had to be registered. A capability
// package now installs its own, through a context that exposes only the
// generic machinery: bus handler slots, generated-call aliases, the audio sink
// and callback dispatch.
//
// This ships to the browser, so it wires generated IR and nothing else. No DSP,
// no register models, no MAME source.

import type { BoardIr } from '../ir/board.ts';

export interface SoundRuntimeContext {
  board: BoardIr;
  /** Loaded ROMs for sound devices with a device-local sample region. */
  regions?: Record<string, Uint8Array>;
  /** The board's generated sound binding; never undefined when this runs. */
  sound: NonNullable<BoardIr['sound']>;
  /** Bus handler slots, keyed as MAME's "<tag>.<method>". */
  registry: {
    read: Record<string, (address: number, offset: number) => number>;
    write: Record<string, (address: number, offset: number, data: number) => void>;
  };
  /** Generated-handler call aliases, keyed as "<tag>.<method>". */
  calls: Record<string, (...args: number[]) => unknown>;
  /** Driver state members, for families that bind a member (AY filters). */
  state: Record<string, unknown>;
  /** Forward a register write to the generated worklet. */
  soundWrite(offset: number, data: number, frac?: number, method?: string): void;
  /** Push bulk sample bytes to a worklet (the NES DMC cannot read the CPU bus there). */
  soundData(id: number, bytes: Uint8Array): void;
  /** Position within the current video frame, so writes keep their timing. */
  fraction(): number;
  /** Call a method on an instantiated generated device, if it has one. */
  callDevice(tag: string, method: string): number | undefined;
  /** Run a callback's generated handler, for device ports read back. */
  runCallbackHandler(callbackId: string): number | undefined;
  /** Deliver a device signal through the board's typed effects. */
  dispatch(ownerTag: string, signal: string, value: number): void;
  /** Pull a value from a read callback through the same typed connection. */
  readSignal(ownerTag: string, signal: string): number | undefined;
  /** Read the live generated program bus, used by integrated DMA sound units. */
  readProgram(cpuTag: string, address: number): number;
  /** Charge cycles stolen by an integrated peripheral to its owning CPU. */
  stallCpu(cpuTag: string, cycles: number): void;
  /** Drive a CPU input line without collapsing distinct IRQ sources. */
  setCpuInputLine(cpuTag: string, line: number, state: number): void;
}

export interface SoundRuntimeHooks {
  /** Advance an integrated sound device by CPU cycles actually elapsed. */
  tickCpu?(cpuTag: string, cycles: number): void;
  reset?(): void;
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
