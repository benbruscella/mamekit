/**
 * What one oracle run does on both sides, and the input timeline they share.
 *
 * Both sides count frames the same way: frame N is the Nth frame the machine
 * has run, an input given "at N" is set once frame N has finished and is read
 * during frame N + 1 (the harness's `atFrame`, MAME's frame notifier). The
 * pictures are then compared at our frame N against MAME's N + offset, the
 * offset searched because a machine can boot a frame or two out of step (the
 * NES presents its first picture a frame after MAME's, #155).
 */

import type { FieldBinding } from '../../src/runtime/input.ts';
import type { ShellConfig } from '../../src/runtime/shell.ts';
import type { GameInputAction } from '../../src/games/types.ts';

export type InputMode = 'none' | 'start' | 'contract';

/** A software title on a console or computer, as MAME names it. */
export type OracleTitle =
  | { cartridge: string }
  | { software: { list: string; name: string } };

export interface RamPlan {
  /** Each processor and its RAM ranges, inclusive, in the order dumped. */
  cpus: { tag: string; ranges: [number, number][] }[];
  from: number;
  to: number;
  every: number;
}

export interface IoPlan {
  taps: { tag: string; lo: number; hi: number; read: boolean; write: boolean }[];
  from: number;
  to: number;
}

/** Everything our side needs; the MAME side is derived from it plus what our boot reports. */
/** MAME's media switch for each kind of software shelf. */
export const MEDIA_SWITCH: Record<string, string> = {
  cartridge: 'cart',
  cassette: 'cass',
  floppy: 'flop',
  quickload: 'quik',
};

export interface OraclePlan {
  target: string;
  title?: OracleTitle;
  /** Our frames at which the pictures are compared. */
  frames: number[];
  /** MAME frame = ours + offset, for each offset tried. */
  offsets: number[];
  /** The input both sides get: none, a Start schedule, or a contract's own actions. */
  input: InputMode;
  /** The machine's contract scenario to borrow (and, for `contract` input, replay). */
  scenario?: string;
  ram?: RamPlan;
  io?: IoPlan;
  /** Grade the run for a survey: drawing and animating, every 30 frames. */
  grade?: boolean;
  /** Frames our side runs. */
  last: number;
  /** Work directory both sides write into. */
  dir: string;
  /** Generated distribution to run. */
  dist: string;
}

/** One input both sides drive, by port and bits. */
export interface TimelineInput {
  port: string;
  mask: number;
}

export type TimelineEvent =
  | { kind: 'press' | 'release'; input: number }
  | { kind: 'set'; input: number; value: number }
  | { kind: 'text'; text: string }
  | { kind: 'reset' }
  /** A software title's start command, then PLAY once typing ends. */
  | { kind: 'boot'; text: string; play: boolean };

export interface Timeline {
  inputs: TimelineInput[];
  /** Events by the frame after which they happen. */
  events: Record<number, TimelineEvent[]>;
}

/** Written by our side once the board has booted; the MAME run is built from it. */
export interface OursBoot {
  width: number;
  height: number;
  rotate: number;
  slotCards: Record<string, string>;
  emptySlots: string[];
  /** The title as MAME's `<list>:<name>`, when the machine runs one. */
  software?: string;
  /**
   * MAME's switch for the medium (`cart`, `cass`, `flop`, `quik`). A bare
   * `<list>:<name>` mounts a cartridge or a tape but leaves a quickload
   * unloaded, so the medium is always named when it is known.
   */
  media?: string;
  timeline: Timeline;
}

/**
 * Start held for six frames every five seconds from frame 300, the schedule
 * the #167 board survey used: enough to get a title past its title screen
 * into play or a demo, the same on both sides.
 */
export function startSchedule(bindings: readonly FieldBinding[], last: number): GameInputAction[] {
  const start = bindings.find(binding => /^IPT_START1?$/.test(binding.type ?? '') && binding.keys.length);
  if (!start) throw new Error('the machine has no Start key to press');
  const actions: GameInputAction[] = [];
  for (let atFrame = 299; atFrame < last; atFrame += 300) {
    actions.push({ atFrame, code: start.keys[0]!, heldFrames: 6, releasedFrames: 0 });
  }
  return actions;
}

/** A binding MAME can be given by set_value/clear_value: an on/off bit. */
function digital(binding: FieldBinding): boolean {
  return binding.activeValue === undefined && binding.relativeDelta === undefined &&
    binding.keyDelta === undefined && !binding.toggle && !binding.lightgun;
}

/**
 * The frame every action lands on, worked out the way runGameAcceptance runs
 * them: each waits for its frame, a key is held for `heldFrames` and released
 * for `releasedFrames` before the next action is looked at, and a later
 * action whose frame has already passed goes at once.
 */
export function inputTimeline(
  actions: readonly GameInputAction[],
  bindings: readonly FieldBinding[],
  boot?: { frame: number; text: string; play: boolean },
): Timeline {
  const inputs: TimelineInput[] = [];
  const events: Record<number, TimelineEvent[]> = {};
  const at = (frame: number, event: TimelineEvent) => { (events[frame] ??= []).push(event); };
  const inputIndex = (binding: FieldBinding): number => {
    const found = inputs.findIndex(input => input.port === binding.port && input.mask === binding.mask);
    if (found >= 0) return found;
    inputs.push({ port: binding.port, mask: binding.mask });
    return inputs.length - 1;
  };
  const keyed = (code: string): number[] => {
    const matched = bindings.filter(binding => binding.keys.includes(code));
    if (!matched.length) throw new Error(`no control is bound to ${code}`);
    const unsupported = matched.filter(binding => !digital(binding));
    if (unsupported.length) {
      throw new Error(`${code} drives ${unsupported.map(binding => binding.label).join(', ')}, which MAME is not given yet`);
    }
    return matched.map(inputIndex);
  };
  let cursor = 0;
  for (const action of actions) {
    cursor = Math.max(cursor, action.atFrame);
    if ('reset' in action) { at(cursor, { kind: 'reset' }); continue; }
    if ('text' in action) { at(cursor, { kind: 'text', text: action.text }); continue; }
    if ('aim' in action) {
      for (const binding of bindings.filter(candidate => candidate.lightgun)) {
        at(cursor, { kind: 'set', input: inputIndex(binding), value: action.aim[binding.lightgun!.axis === 'x' ? 0 : 1] });
      }
      continue;
    }
    if ('analog' in action || 'signal' in action) throw new Error('analog and signal actions are not mirrored in MAME yet');
    const pressed = 'codes' in action ? action.codes.flatMap(keyed) : keyed(action.code);
    for (const input of pressed) at(cursor, { kind: 'press', input });
    cursor += action.heldFrames;
    for (const input of pressed) at(cursor, { kind: 'release', input });
    cursor += action.releasedFrames;
  }
  if (boot) at(boot.frame, { kind: 'boot', text: boot.text, play: boot.play });
  return { inputs, events };
}

/**
 * The frame title-start.ts types a shelf's command after: it waits `delay`
 * seconds of frames, then posts on the next.
 */
export function bootFrame(boot: NonNullable<ShellConfig['software']>['shelves'][number]['boot'], refresh: number): number {
  return Math.round(boot!.delay * refresh) + 1;
}

/** Each processor's RAM as the generated board maps it, mirrors once. */
export function boardRam(config: ShellConfig): RamPlan['cpus'] {
  return config.board.cpus.map(cpu => {
    const seen = new Set<string>();
    const ranges = ((cpu as { ranges?: { kind: string; start: number; end: number }[] }).ranges ?? [])
      .filter(range => range.kind === 'ram' && range.end - range.start < 0x40000)
      .filter(range => {
        const key = `${range.start}-${range.end}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map(range => [range.start, range.end] as [number, number])
      .sort((left, right) => left[0] - right[0]);
    return { tag: cpu.tag, ranges };
  }).filter(cpu => cpu.ranges.length);
}

/** `maincpu:0-7ff,6000-7fff` -> one processor's ranges. */
export function parseRanges(spec: string): { tag: string; ranges: [number, number][] } {
  const at = spec.lastIndexOf(':');
  if (at < 0) throw new Error(`expected <cpu>:<start>-<end>[,...], got ${spec}`);
  const ranges = spec.slice(at + 1).split(',').map(part => {
    const [start, end] = part.split('-').map(value => parseInt(value, 16));
    if (!Number.isFinite(start) || !Number.isFinite(end ?? start)) throw new Error(`bad range ${part} in ${spec}`);
    return [start!, end ?? start!] as [number, number];
  });
  return { tag: spec.slice(0, at), ranges };
}

export function ramBytesPerFrame(cpus: RamPlan['cpus']): number {
  return cpus.reduce((sum, cpu) => sum + cpu.ranges.reduce((total, [start, end]) => total + end - start + 1, 0), 0);
}

/** The frames a RAM plan dumps, in order. */
export function ramFrames(ram: RamPlan): number[] {
  const frames: number[] = [];
  for (let frame = ram.from; frame <= ram.to; frame += ram.every) frames.push(frame);
  return frames;
}
