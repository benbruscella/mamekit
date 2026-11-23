/**
 * `mamekit diverge`: where a machine first leaves MAME, as one bus access.
 *
 * Pure: which ranges to tap, read from the generated board's own address
 * maps, and the two traces set against each other processor by processor.
 * diverge.ts runs both sides; diverge-plan.spec.ts tests this without MAME.
 */

import type { ShellConfig } from '../../src/runtime/shell.ts';
import type { IoAccess } from './compare.ts';

/** One range of a processor's map, as the generated board carries it. */
interface MapRange {
  start: number;
  end: number;
  kind: string;
  mirror?: number;
  read?: string;
  write?: string;
  share?: string;
  bank?: string;
}

export interface DivergeTap {
  tag: string;
  /** The processor's I/O space; its program space when absent. */
  space?: 'io';
  lo: number;
  hi: number;
  /** Why the range is tapped: the device, share or register that put it there. */
  why: string[];
}

/** The device a handler belongs to: `soundlatch.write` -> soundlatch; a driver's own method has none. */
function handlerOwner(name: string | undefined): string | undefined {
  if (!name) return undefined;
  const at = name.indexOf('.');
  if (at < 0) return undefined;
  const owner = name.slice(0, at);
  return /_state$|^port$|^bank$/.test(owner) ? undefined : owner;
}

/**
 * Registers whose writes steer the other processors or the memory map,
 * however the driver names its own method: banks, latches, resets, interrupt
 * lines and their acknowledges, and the sound command.
 */
const CONTROL = /bank|latch|reset|halt|irq|nmi|firq|_ack|int_|interrupt|sound|snd|cmd|command|watchdog|semaphore|mcu/i;

/**
 * The ranges a first divergence is looked for in, per processor. On a board
 * of several processors: every device more than one of them reaches (a
 * latch, a sound chip shared by a bus, a shared RAM device), every share more
 * than one maps, and every control register. On a board of one processor,
 * where nothing is shared: every device handler and control register. RAM and
 * ROM are never tapped (RAM is compared whole, every frame, and a ROM read is
 * an instruction fetch). A mirrored range is tapped across its mirrors, since
 * code often reaches a register through one. Overlapping ranges of a
 * processor are merged. A processor's I/O space is tapped whole, every
 * handler but a plain input port: it is all registers.
 */
export function divergeRanges(config: ShellConfig): DivergeTap[] {
  const cpus = config.board.cpus.map(cpu => ({
    tag: cpu.tag,
    ranges: ((cpu as { ranges?: MapRange[] }).ranges ?? []).filter(range => range.kind !== 'rom'),
    io: ((cpu as { io?: { ranges?: MapRange[] } }).io?.ranges ?? []).filter(range => range.kind !== 'rom'),
  }));
  const devicesOn = new Map<string, Set<string>>();
  const sharesOn = new Map<string, Set<string>>();
  for (const cpu of cpus) {
    for (const range of [...cpu.ranges, ...cpu.io]) {
      for (const owner of [handlerOwner(range.read), handlerOwner(range.write)]) {
        if (owner) (devicesOn.get(owner) ?? devicesOn.set(owner, new Set()).get(owner)!).add(cpu.tag);
      }
      if (range.share) (sharesOn.get(range.share) ?? sharesOn.set(range.share, new Set()).get(range.share)!).add(cpu.tag);
    }
  }
  const several = cpus.length > 1;
  const taps: DivergeTap[] = [];
  for (const cpu of cpus) {
    const picked: DivergeTap[] = [];
    for (const range of cpu.ranges) {
      if (range.bank) continue;
      const why: string[] = [];
      for (const name of [range.read, range.write]) {
        const owner = handlerOwner(name);
        if (owner && (!several || (devicesOn.get(owner)?.size ?? 0) > 1)) why.push(`${owner} (${several ? 'shared' : 'device'})`);
        // The method, not its owner: `watchdog.reset_w` is a reset, `ymsnd.read` is not a sound command.
        else if (name && CONTROL.test(name.slice(name.indexOf('.') + 1))) why.push(name);
      }
      if (range.share && (sharesOn.get(range.share)?.size ?? 0) > 1) why.push(`share ${range.share}`);
      if (!why.length) continue;
      picked.push({ tag: cpu.tag, lo: range.start, hi: range.end | (range.mirror ?? 0), why: [...new Set(why)] });
    }
    // An I/O space is all registers: every handler but a plain input port is
    // a device's or the driver's (an interrupt controller, a DMA trigger, a
    // scroll register), and the space is small enough to tap whole.
    const ports: DivergeTap[] = [];
    for (const range of cpu.io) {
      const why = [range.read, range.write].filter((name): name is string => !!name && !/^port\./.test(name));
      // A handler's `select` bits reach it like a mirror's, as its offset:
      // the Spectrum's ULA is `map(0x00, 0x00).select(0xfffe)`, read at
      // $FEFE, and tapped as 0-1 it showed no access on either side.
      const select = (range as { select?: number }).select ?? 0;
      if (why.length) ports.push({ tag: cpu.tag, space: 'io', lo: range.start, hi: range.end | (range.mirror ?? 0) | select, why: [...new Set(why)] });
    }
    picked.sort((left, right) => left.lo - right.lo);
    ports.sort((left, right) => left.lo - right.lo);
    for (const tap of [...picked, ...ports]) {
      const last = taps.at(-1);
      if (last && last.tag === tap.tag && last.space === tap.space && tap.lo <= last.hi + 1) {
        last.hi = Math.max(last.hi, tap.hi);
        last.why = [...new Set([...last.why, ...tap.why])];
      } else {
        taps.push({ ...tap, why: [...tap.why] });
      }
    }
  }
  return taps;
}

export interface CpuDivergence {
  tag: string;
  /** Accesses each side logged on this processor. */
  mame: number;
  ours: number;
  /** The first access that differs in kind, address or value, or in time past the tolerance. */
  first?: {
    index: number;
    reason: 'value' | 'time' | 'missing';
    mame?: IoAccess;
    ours?: IoAccess;
    /** Ours minus MAME, in the processor's cycles, where both have a time. */
    cycles?: number;
    /** The accesses before it, which both sides agree on (ours). */
    before: IoAccess[];
  };
}

/**
 * Two cycles: MAME stamps an access with the cycles before it and ours with
 * the access itself, a constant one apart (ENGINEERING section 7), and a
 * second absorbs rounding of seconds back to cycles.
 */
export const TIME_TOLERANCE_CYCLES = 2;

/**
 * The traces processor by processor: each one's accesses in order, and the
 * first that differs. Time is compared only once the values agree, and only
 * against the tolerance, so a run that is a cycle out of phase from boot
 * reads as identical, and one whose write lands a scanline late does not.
 */
export function compareByCpu(
  mame: readonly IoAccess[],
  ours: readonly IoAccess[],
  taps: readonly { tag: string }[],
  clocks: Readonly<Record<string, number>>,
  context = 6,
): CpuDivergence[] {
  const tags = [...new Set(taps.map(tap => tap.tag))];
  return tags.map(tag => {
    const on = (list: readonly IoAccess[]) => list.filter(access => taps[access.tap]?.tag === tag);
    const left = on(mame);
    const right = on(ours);
    const result: CpuDivergence = { tag, mame: left.length, ours: right.length };
    const clock = clocks[tag];
    for (let index = 0; index < Math.max(left.length, right.length); index++) {
      const a = left[index];
      const b = right[index];
      const before = right.slice(Math.max(0, index - context), index);
      if (!a || !b) {
        result.first = { index, reason: 'missing', ...(a ? { mame: a } : {}), ...(b ? { ours: b } : {}), before };
        break;
      }
      if (a.kind !== b.kind || a.address !== b.address || a.data !== b.data) {
        result.first = { index, reason: 'value', mame: a, ours: b, ...cyclesApart(a, b, clock), before };
        break;
      }
      const apart = cyclesApart(a, b, clock);
      if (apart.cycles !== undefined && Math.abs(apart.cycles) > TIME_TOLERANCE_CYCLES) {
        result.first = { index, reason: 'time', mame: a, ours: b, ...apart, before };
        break;
      }
    }
    return result;
  });
}

function cyclesApart(a: IoAccess, b: IoAccess, clock: number | undefined): { cycles?: number } {
  if (a.time === undefined || b.time === undefined || !clock) return {};
  return { cycles: Math.round((b.time - a.time) * clock * 10) / 10 };
}

/** The divergence that happened first in emulated time, of those found. */
export function earliest(divergences: readonly CpuDivergence[]): CpuDivergence | undefined {
  const timed = divergences.filter(entry => entry.first);
  const at = (entry: CpuDivergence) => entry.first!.mame?.time ?? entry.first!.ours?.time ?? Infinity;
  return [...timed].sort((left, right) => at(left) - at(right))[0];
}
