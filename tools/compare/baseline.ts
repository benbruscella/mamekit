/**
 * A baseline against MAME: what every contract scenario measured against MAME
 * on one commit, kept apart from the oracle's latest result, and the rules
 * that say whether a later run is better, the same or worse.
 *
 * Pure: the units, their plans and the verdicts are worked out from contracts
 * and reports already written, so they are tested without MAME or ROMs
 * (baseline.spec.ts). baseline-command.ts (mamekit record, compare, show) runs them.
 */

import type { FrameResult, RamResult } from './compare.ts';
import type { AudioComparison, RunReport } from './report.ts';

/** One contract scenario: the unit a baseline records and a comparison re-runs. */
export interface BaselineUnit {
  /** `<target>`, or `<target>/<scenario>` for a target with several. */
  key: string;
  target: string;
  category: string;
  scenario?: string;
  /** The contract's length in frames. */
  frames: number;
}

export function baselineUnits(contracts: readonly { game: string; category: string; scenarioId?: string; frames: number }[]): BaselineUnit[] {
  return contracts.map(contract => ({
    key: contract.scenarioId ? `${contract.game}/${contract.scenarioId}` : contract.game,
    target: contract.game,
    category: contract.category,
    ...(contract.scenarioId ? { scenario: contract.scenarioId } : {}),
    frames: contract.frames,
  }));
}

/** Units chosen by target (`nes`) or by scenario (`nes/smb1`); all of them when none are named. */
export function selectUnits(units: readonly BaselineUnit[], names: readonly string[]): BaselineUnit[] {
  if (!names.length) return [...units];
  const unknown = names.filter(name => !units.some(unit => unit.key === name || unit.target === name));
  if (unknown.length) throw new Error(`no contract scenario ${unknown.join(', ')}`);
  return units.filter(unit => names.includes(unit.key) || names.includes(unit.target));
}

/**
 * The frames whose pictures are compared: every 300 frames, a wider multiple
 * of 300 once a contract runs past 2400 so there are at most eight, and the
 * contract's last frame, where it is graded.
 */
export function comparedFrames(contractFrames: number): number[] {
  const step = 300 * Math.max(1, Math.ceil(contractFrames / 2400));
  const frames: number[] = [];
  for (let frame = step; frame < contractFrames; frame += step) frames.push(frame);
  frames.push(contractFrames);
  return frames;
}

/**
 * RAM is dumped every frame on both sides and read whole to compare, so a run
 * dumps at most this much a side: CPS1's 264 KB a frame stops near frame 1000,
 * and most boards dump their whole run.
 */
export const RAM_BUDGET_BYTES = 256 * 1024 * 1024;

export function ramWindow(bytesPerFrame: number, lastFrame: number): number {
  return Math.max(1, Math.min(lastFrame, Math.floor(RAM_BUDGET_BYTES / bytesPerFrame)));
}

/**
 * A run's `mamekit` arguments, less where it writes, which each run supplies.
 * Baselines recorded before the mamekit commands start with the old script's
 * path instead of `against`; `cliArguments` reads both.
 */
export interface StepPlan {
  args: string[];
}

export function cliArguments(plan: StepPlan): string[] {
  const [first, ...rest] = plan.args;
  return first === 'tools/mame-oracle.ts' ? ['against', ...rest] : plan.args;
}

export interface UnitPlan {
  frames: number[];
  /** `mamekit against`, no input, with RAM unless the board maps none. */
  none: StepPlan;
  ramSkipped?: string;
  /** `mamekit against`, the contract's own actions. */
  contract: StepPlan;
}

export function unitPlan(unit: BaselineUnit, ramBytesPerFrame: number): UnitPlan {
  const frames = comparedFrames(unit.frames);
  const oracle = (input: 'none' | 'contract') => [
    'against', unit.target, ...(unit.scenario ? ['--scenario', unit.scenario] : []),
    '--input', input, '--frames', frames.join(','), '--audio', '--timeout', '1800',
  ];
  const ram = ramBytesPerFrame > 0
    ? ['--ram', '--ram-frames', `1-${ramWindow(ramBytesPerFrame, frames.at(-1)!)}`]
    : [];
  return {
    frames,
    none: { args: [...oracle('none'), ...ram] },
    ...(ramBytesPerFrame > 0 ? {} : { ramSkipped: 'the generated board maps no RAM range' }),
    contract: { args: oracle('contract') },
  };
}

// --- what is kept of each measure ------------------------------------------

export interface PixelsResult {
  offset: number;
  /** The scale ours was compared at, MAME's screen over the board's; absent at 1:1. */
  scale?: number;
  frames: FrameResult[];
  exact: number[];
  firstDivergence?: number;
  /** Frames on which MAME read a driven input differently; the pictures mean nothing if any. */
  inputsDiffering?: number;
  /** Every offset tried and its frames: a later run is read at the baseline's offset first. */
  byOffset?: Record<number, { frame: number; pixels?: number; size?: string }[]>;
}

export interface RamSummary {
  /** Frames dumped by both sides and compared. */
  compared: number;
  bytesPerFrame: number;
  offset: number;
  /** Differing bytes summed over every compared frame. */
  total: number;
  firstDivergence?: { frame: number; bytes: number; addresses: string[] };
}

export interface AudioResult {
  seconds: number;
  rms: { ours: number; ref: number; ratioDb: number };
  bands: { hz: number; diffDb: number }[];
  onsets: { ours: number; ref: number };
}

export interface Measure<T> {
  status: 'ok' | 'failed' | 'skipped';
  reason?: string;
  /** A first failure the second run did not repeat. */
  retried?: string;
  /** The mamekit commit the measure was taken on. */
  measuredOn?: string;
  result?: T;
}

export const MEASURES = ['pixels:none', 'pixels:contract', 'ram', 'audio:none', 'audio:contract'] as const;
export type MeasureName = typeof MEASURES[number];

export interface UnitRecord {
  plan: UnitPlan;
  pixelsNone?: Measure<PixelsResult>;
  pixelsContract?: Measure<PixelsResult>;
  ram?: Measure<RamSummary>;
  audioNone?: Measure<AudioResult>;
  audioContract?: Measure<AudioResult>;
}

/** Why a run says nothing about the emulation: either side failed to run it. */
export function runFailure(run: RunReport): string | undefined {
  if (run.ours?.error) return `ours: ${run.ours.error} (after ${run.ours.frames} frames)`;
  if (run.mameError) return `MAME: ${run.mameError}`;
  if (!run.pixels) return 'no picture from either side';
  return undefined;
}

export function pixelsMeasure(run: RunReport): Measure<PixelsResult> {
  const failure = runFailure(run);
  const result: PixelsResult | undefined = run.pixels ? {
    offset: run.pixels.offset,
    ...(run.pixels.scale ? { scale: run.pixels.scale } : {}),
    frames: run.pixels.frames,
    exact: run.pixels.exact,
    ...(run.pixels.firstDivergence !== undefined ? { firstDivergence: run.pixels.firstDivergence } : {}),
    ...(run.inputs ? { inputsDiffering: run.inputs.differing } : {}),
    ...(run.pixels.byOffset ? {
      byOffset: Object.fromEntries(Object.entries(run.pixels.byOffset).map(([offset, frames]) => [offset,
        frames.map(frame => ({ frame: frame.frame, ...(frame.pixels !== undefined ? { pixels: frame.pixels } : {}), ...(frame.size ? { size: frame.size } : {}) }))])),
    } : {}),
  } : undefined;
  return {
    status: failure ? 'failed' : 'ok',
    ...(failure ? { reason: failure } : {}),
    ...(run.ours?.retried ? { retried: `ours: ${run.ours.retried}` } : {}),
    ...(result ? { result } : {}),
  };
}

export function ramMeasure(run: RunReport): Measure<RamSummary> {
  const failure = runFailure(run);
  const ram: RamResult | undefined = run.ram;
  if (!ram) return { status: 'failed', reason: failure ?? 'no RAM was compared' };
  // The board's ranges were all on processors this boot does not have (a C64 tape leaves the 1541 out).
  if (!failure && ram.bytesPerFrame === 0) return { status: 'skipped', reason: 'no RAM range the board maps is on a processor this boot has' };
  const first = ram.firstDivergence;
  const result: RamSummary = {
    compared: ram.compared,
    bytesPerFrame: ram.bytesPerFrame,
    offset: ram.offset,
    total: Object.values(ram.differing).reduce((sum, bytes) => sum + bytes, 0),
    ...(first ? {
      firstDivergence: {
        frame: first.frame,
        bytes: first.bytes,
        addresses: first.addresses.slice(0, 8).map(entry => `${entry.cpu}:${entry.address}`),
      },
    } : {}),
  };
  const empty = ram.compared === 0 ? 'nothing compared (a side wrote no RAM)' : undefined;
  return {
    status: failure || empty ? 'failed' : 'ok',
    ...(failure || empty ? { reason: failure ?? empty } : {}),
    result,
  };
}

export function audioMeasure(run: RunReport): Measure<AudioResult> {
  const failure = runFailure(run) ?? (run.audio ? undefined : run.audioError ?? 'no audio was compared');
  const audio: AudioComparison | undefined = run.audio;
  return {
    status: failure ? 'failed' : 'ok',
    ...(failure ? { reason: failure } : {}),
    ...(audio ? {
      result: {
        seconds: audio.seconds,
        rms: audio.rms,
        bands: audio.bands.map(band => ({ hz: band.hz, diffDb: band.diffDb })),
        onsets: audio.onsets,
      },
    } : {}),
  };
}

/**
 * Below this RMS (-80 dBFS) a side counts as silent. Ours over MAME is taken
 * between the two clamped there, so silence against silence is 0 dB, not the
 * -240 dB of 0/0, and a quiet side reads as how far above silence it is.
 */
export const SILENCE_RMS = 1e-4;

export function audioLevelDb(result: AudioResult): number {
  return 20 * Math.log10(Math.max(result.rms.ours, SILENCE_RMS) / Math.max(result.rms.ref, SILENCE_RMS));
}

export function audioSpectrumDb(result: AudioResult): number {
  return result.bands.reduce((sum, band) => sum + Math.abs(band.diffDb), 0);
}

// --- verdicts --------------------------------------------------------------

/**
 * `worse` and `better` are material: past the measure's tolerance. A change
 * within it is `moved`, printed but never failing a comparison, so an onset
 * rate shifting 0.03 a second does not read like a 20 dB band error.
 */
export type Verdict = 'better' | 'same' | 'moved' | 'worse' | 'n/a';

export interface MeasureVerdict {
  verdict: Verdict;
  detail?: string;
}

/** How far each measure may move before the move is material. */
export const TOLERANCE = {
  /** Frames the first RAM divergence may move earlier or later. */
  ramFrames: 2,
  /** dB the level may move away from MAME's (ours over MAME, above silence). */
  levelDb: 1,
  /** dB the octave bands' summed difference from MAME may grow. */
  bandsDb: 3,
  /** Onsets a second the tempo may move off MAME's: this, or a tenth of MAME's rate if more. */
  onsetsPerSecond: 0.25,
  onsetsShare: 0.1,
  /**
   * A count of differing pixels or bytes at an unchanged first divergence is
   * material only when it grows or shrinks this many times over, and by at
   * least the floor: Mortal Kombat's frame 2100 going from 4063 to 101171
   * pixels (#255) is a regression, a diverged demo's 133 -> 33 is not news.
   */
  countFactor: 4,
  pixelsFloor: 2000,
  bytesFloor: 16,
} as const;

/** Rounding: below these a measure has not moved at all. */
const NOISE = { levelDb: 0.05, bandsDb: 0.1, onsetsPerSecond: 0.02 } as const;

/**
 * Compares a measure whose runs may have failed: a measure that ran is better
 * than one that failed, and only two runs that both ran are compared further.
 */
function ranOrFailed<T>(
  before: Measure<T> | undefined,
  after: Measure<T> | undefined,
  compare: (before: T, after: T) => MeasureVerdict,
): MeasureVerdict {
  if (!before || before.status === 'skipped') return { verdict: 'n/a', detail: before?.reason ?? 'not in the baseline' };
  if (!after || after.status === 'skipped') return { verdict: 'n/a', detail: after?.reason ?? 'not run' };
  if (before.status === 'failed' && after.status === 'failed') {
    return { verdict: 'same', detail: `still fails: ${after.reason}` };
  }
  if (before.status === 'failed') return { verdict: 'better', detail: `runs now (baseline: ${before.reason})` };
  if (after.status === 'failed') return { verdict: 'worse', detail: `fails now: ${after.reason}` };
  return compare(before.result!, after.result!);
}

/**
 * Lower is better. Within `noise` it is the same; past `material` it is
 * better or worse; between the two it moved.
 */
function lower(before: number, after: number, noise: number, material: number, what: string): MeasureVerdict {
  // Two pictures of the wrong size are both Infinity, and Infinity - Infinity
  // is NaN, which compares as no tolerance: Battlezone's unchanged vector
  // screen read as worse on every run.
  if (after === before || Math.abs(after - before) <= noise) return { verdict: 'same' };
  const detail = `${what} ${round(before)} -> ${round(after)}`;
  // A picture of the wrong size becoming comparable, or the reverse, is always material.
  const finite = Number.isFinite(before) && Number.isFinite(after);
  if (finite && Math.abs(after - before) <= material) return { verdict: 'moved', detail };
  return { verdict: after < before ? 'better' : 'worse', detail };
}

const round = (value: number) => Number.isInteger(value) ? String(value) : value.toFixed(2);

/** A count (pixels, bytes) where lower is better: material past TOLERANCE.countFactor and the floor. */
function count(before: number, after: number, floor: number, what: string): MeasureVerdict {
  if (after === before) return { verdict: 'same' };
  const detail = `${what} ${round(before)} -> ${round(after)}`;
  if (!Number.isFinite(before) || !Number.isFinite(after)) return { verdict: after < before ? 'better' : 'worse', detail };
  const [low, high] = after < before ? [after, before] : [before, after];
  const material = high >= TOLERANCE.countFactor * low && high - low >= floor;
  return { verdict: material ? (after < before ? 'better' : 'worse') : 'moved', detail };
}

/** Differing pixels at a frame; a frame whose pictures differ in size counts as worse than any count. */
const framePixels = (result: PixelsResult, frame: number) => {
  const found = result.frames.find(entry => entry.frame === frame);
  return found?.pixels ?? Number.POSITIVE_INFINITY;
};

const pixelTotal = (result: PixelsResult) => result.frames.reduce((sum, entry) =>
  sum + (entry.pixels ?? Number.POSITIVE_INFINITY), 0);

/**
 * A later run as read at `offset`, when it was compared there: its exact
 * frames and first divergence worked out from that offset's frames alone.
 */
export function pixelsAtOffset(result: PixelsResult, offset: number): PixelsResult | undefined {
  const frames = result.byOffset?.[offset];
  if (!frames) return undefined;
  const exact = frames.filter(frame => frame.pixels === 0).map(frame => frame.frame);
  const first = frames.find(frame => frame.pixels !== 0)?.frame;
  return {
    ...result,
    offset,
    frames: frames.map(frame => ({ ...frame, mame: frame.frame + offset })),
    exact,
    ...(first !== undefined ? { firstDivergence: first } : { firstDivergence: undefined }),
  };
}

/**
 * Pictures. The run is read at the baseline's offset first: when every frame
 * the baseline had exact is still exact there, that reading stands, so a
 * still attract screen that also fits offset -1 cannot flip the run's offset
 * and read as "no longer exact" (gauntlet, #240). Then, in order: a frame
 * that was exact and is not is worse, whatever else changed; a frame that
 * becomes exact is better; the first frame that differs moving earlier is
 * worse, later better. Pixel counts at an unchanged first divergence are
 * material only past TOLERANCE.countFactor and pixelsFloor: past the first
 * divergence the demo has diverged, and small swings in its counts say little.
 */
export function pixelsVerdict(before: Measure<PixelsResult> | undefined, after: Measure<PixelsResult> | undefined): MeasureVerdict {
  return ranOrFailed(before, after, (was, searched) => {
    const atBaseline = pixelsAtOffset(searched, was.offset);
    const now = atBaseline && was.exact.every(frame => atBaseline.exact.includes(frame)) ? atBaseline : searched;
    const notes: string[] = [];
    if (was.offset !== now.offset) notes.push(`offset ${was.offset} -> ${now.offset}`);
    if ((was.scale ?? 1) !== (now.scale ?? 1)) notes.push(`compared at ${was.scale ?? 1}x -> ${now.scale ?? 1}x`);
    if ((now.inputsDiffering ?? 0) > (was.inputsDiffering ?? 0)) {
      return { verdict: 'worse', detail: `MAME read different input on ${now.inputsDiffering} frames (baseline ${was.inputsDiffering ?? 0})` };
    }
    const lost = was.exact.filter(frame => !now.exact.includes(frame));
    const gained = now.exact.filter(frame => !was.exact.includes(frame));
    const join = (verdict: MeasureVerdict): MeasureVerdict =>
      notes.length ? { verdict: verdict.verdict, detail: [verdict.detail, ...notes].filter(Boolean).join('; ') } : verdict;
    if (lost.length) {
      return join({ verdict: 'worse', detail: `no longer exact at ${lost.join(', ')}${gained.length ? `, exact at ${gained.join(', ')}` : ''}` });
    }
    if (gained.length) return join({ verdict: 'better', detail: `exact at ${gained.join(', ')}` });
    const wasFirst = was.firstDivergence;
    const first = now.firstDivergence;
    if (first === undefined) return join({ verdict: 'same' });
    if (wasFirst !== undefined && first !== wasFirst) {
      return join({ verdict: first < wasFirst ? 'worse' : 'better', detail: `first differs at ${wasFirst} -> ${first}` });
    }
    const atFirst = count(framePixels(was, first), framePixels(now, first), TOLERANCE.pixelsFloor, `pixels at ${first}`);
    if (atFirst.verdict !== 'same') return join(atFirst);
    return join(count(pixelTotal(was), pixelTotal(now), TOLERANCE.pixelsFloor, 'pixels over all frames'));
  });
}

/**
 * RAM: the first frame that differs from MAME's decides. Never differing and
 * starting to is worse, and the reverse better; moving earlier or later by
 * more than TOLERANCE.ramFrames is worse or better, and by less, moved. The
 * bytes that differ (on that frame, then over the run) are material only past
 * TOLERANCE.countFactor and bytesFloor.
 */
export function ramVerdict(before: Measure<RamSummary> | undefined, after: Measure<RamSummary> | undefined): MeasureVerdict {
  return ranOrFailed(before, after, (was, now) => {
    if (now.compared < was.compared) return { verdict: 'worse', detail: `compared ${now.compared} frames, baseline ${was.compared}` };
    const wasFirst = was.firstDivergence;
    const nowFirst = now.firstDivergence;
    if (!wasFirst && !nowFirst) return { verdict: 'same' };
    if (!nowFirst) return { verdict: 'better', detail: `identical at every frame (baseline differed from ${wasFirst!.frame})` };
    if (!wasFirst) return { verdict: 'worse', detail: `differs from frame ${nowFirst.frame} (baseline identical)` };
    if (nowFirst.frame !== wasFirst.frame) {
      const detail = `first differs at ${wasFirst.frame} -> ${nowFirst.frame}`;
      if (Math.abs(nowFirst.frame - wasFirst.frame) <= TOLERANCE.ramFrames) return { verdict: 'moved', detail };
      return { verdict: nowFirst.frame > wasFirst.frame ? 'better' : 'worse', detail };
    }
    const atFirst = count(wasFirst.bytes, nowFirst.bytes, TOLERANCE.bytesFloor, `bytes at ${nowFirst.frame}`);
    return atFirst.verdict !== 'same' ? atFirst : count(was.total, now.total, TOLERANCE.bytesFloor, 'bytes over all frames');
  });
}

/**
 * Audio, judged three ways: the level (ours over MAME above silence, nearer
 * 0 dB is better), the spectrum (the octave bands' differences from MAME,
 * summed in dB) and the tempo (onsets a second, nearer MAME's is better). Any
 * of the three getting materially worse is worse, so a louder mix cannot buy
 * back a wrong one; otherwise any getting materially better is better, and a
 * move within the tolerances (TOLERANCE) is moved.
 */
export function audioVerdict(before: Measure<AudioResult> | undefined, after: Measure<AudioResult> | undefined): MeasureVerdict {
  return ranOrFailed(before, after, (was, now) => {
    const onsetsMaterial = Math.max(TOLERANCE.onsetsPerSecond, TOLERANCE.onsetsShare * was.onsets.ref);
    const parts = [
      lower(Math.abs(audioLevelDb(was)), Math.abs(audioLevelDb(now)), NOISE.levelDb, TOLERANCE.levelDb, 'level |dB|'),
      lower(audioSpectrumDb(was), audioSpectrumDb(now), NOISE.bandsDb, TOLERANCE.bandsDb, 'bands |dB|'),
      lower(Math.abs(was.onsets.ours - was.onsets.ref), Math.abs(now.onsets.ours - now.onsets.ref), NOISE.onsetsPerSecond,
        onsetsMaterial, 'onsets/s off MAME'),
    ];
    const verdict: Verdict = parts.some(part => part.verdict === 'worse') ? 'worse'
      : parts.some(part => part.verdict === 'better') ? 'better'
      : parts.some(part => part.verdict === 'moved') ? 'moved' : 'same';
    const details = parts.flatMap(part => part.detail ? [`${part.detail} (${part.verdict})`] : []);
    // MAME's recording should not move between runs; if it did, so did MAME or the set.
    if (Math.abs(was.rms.ref - now.rms.ref) > 1e-6 * Math.max(1, was.rms.ref)) details.push("MAME's recording differs from the baseline's");
    return details.length ? { verdict, detail: details.join('; ') } : { verdict };
  });
}

/** Every measure of a unit against its baseline. */
export function compareUnit(before: UnitRecord, after: UnitRecord, measures: readonly MeasureName[] = MEASURES): Partial<Record<MeasureName, MeasureVerdict>> {
  const verdicts: Partial<Record<MeasureName, MeasureVerdict>> = {};
  for (const measure of measures) {
    verdicts[measure] = measure === 'pixels:none' ? pixelsVerdict(before.pixelsNone, after.pixelsNone)
      : measure === 'pixels:contract' ? pixelsVerdict(before.pixelsContract, after.pixelsContract)
      : measure === 'ram' ? ramVerdict(before.ram, after.ram)
      : measure === 'audio:none' ? audioVerdict(before.audioNone, after.audioNone)
      : audioVerdict(before.audioContract, after.audioContract);
  }
  return verdicts;
}
