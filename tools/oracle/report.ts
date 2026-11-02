/**
 * What one oracle run records, and how a survey grades and sorts its titles.
 * Pure: everything here works on reports already written, so it is tested
 * without MAME or ROMs (report.spec.ts).
 */

import type { FrameResult, InputsResult, IoResult, RamResult } from './compare.ts';
import type { InputMode } from './plan.ts';

/** tools/compare-audio.mjs's compare.json: ours against MAME's -wavwrite over the same run. */
export interface AudioComparison {
  seconds: number;
  rms: { ours: number; ref: number; ratioDb: number };
  bands: { hz: number; ours: number; ref: number; diffDb: number }[];
  onsets: { ours: number; ref: number };
  /** The largest sample, and the share of samples at full scale. */
  peak?: { ours: { peak: number; over: number }; ref: { peak: number; over: number } };
}

export interface RunReport {
  title?: string;
  scenario?: string;
  input: InputMode;
  checkedAt: string;
  mame: string;
  mamekit: { commit: string; dirty: boolean };
  /** What MAME was run with, for repeating it by hand. */
  mameCommand: string;
  pixels?: {
    offset: number;
    /**
     * How many times wider than the board's own pixels MAME draws the screen,
     * and so the scale ours was compared at (`scaledScreen`); absent at 1:1.
     */
    scale?: number;
    /** Every offset that fits as well (a still screen fits several). */
    tied: number[];
    frames: FrameResult[];
    /** Our frames that are pixel-for-pixel MAME's. */
    exact: number[];
    /** Our first compared frame that is not. */
    firstDivergence?: number;
    images: string[];
  };
  ram?: RamResult;
  io?: IoResult;
  /** Whether MAME read the driven inputs as ours did (`--input start|contract`). */
  inputs?: InputsResult;
  /** The two sides' sound over the run (`--audio`), or why there is none. */
  audio?: AudioComparison;
  audioError?: string;
  grade?: { samples: number; drawn: number; changes: number; colours: number };
  /** How far our side ran; `retried` is a first failure the second run did not repeat. */
  ours?: { frames: number; error?: string; retried?: string };
  mameError?: string;
}

export interface SurveyEntry {
  board: string;
  title: string;
  cause: string;
  detail?: string;
  pixels?: number;
  offset?: number;
  image?: string;
  mamekit: string;
}

/** Causes in the order a survey lists them: what works first, then why the rest do not. */
export const SURVEY_CAUSES = ['exact', 'diverges', 'size', 'static', 'blank', 'no-picture', 'error', 'timeout', 'mame-error'] as const;

/**
 * A survey title's verdict: its cause, so failures sort by what went wrong
 * rather than by board. Our side's failure comes first (nothing after it is
 * evidence), then a picture that never drew or never moved, then MAME's own
 * failure, then the comparison itself.
 */
export function gradeRun(report: RunReport): Pick<SurveyEntry, 'cause' | 'detail'> {
  if (report.ours?.error) {
    // Numbers and addresses differ from board to board; the message is the cause.
    return /^timed out or crashed/.test(report.ours.error) ? { cause: 'timeout' }
      : { cause: 'error', detail: report.ours.error.replace(/0x[0-9a-f]+|\b\d+\b/gi, 'N') };
  }
  if (report.grade && report.grade.drawn === 0) return { cause: 'blank' };
  if (report.grade && report.grade.changes <= 2) return { cause: 'static' };
  if (report.mameError) return { cause: 'mame-error', detail: report.mameError };
  const frame = report.pixels?.frames.at(-1);
  if (frame?.size) return { cause: 'size', detail: frame.size };
  if (frame?.pixels === undefined) return { cause: 'no-picture' };
  return frame.pixels === 0 ? { cause: 'exact' } : { cause: 'diverges' };
}

/**
 * Survey entries grouped for reading: by cause, an error by its message too,
 * in SURVEY_CAUSES order and the largest group first within a cause.
 */
export function surveyGroups(entries: readonly SurveyEntry[]): [string, SurveyEntry[]][] {
  const groups = new Map<string, SurveyEntry[]>();
  for (const entry of entries) {
    const key = entry.detail && (entry.cause === 'error' || entry.cause === 'mame-error')
      ? `${entry.cause}: ${entry.detail}` : entry.cause;
    groups.set(key, [...groups.get(key) ?? [], entry]);
  }
  const rank = (key: string) => SURVEY_CAUSES.indexOf(key.split(':')[0] as typeof SURVEY_CAUSES[number]);
  return [...groups].sort((a, b) => rank(a[0]) - rank(b[0]) || b[1].length - a[1].length);
}

/**
 * One title per cartridge board: the first in catalogue order that has a
 * local dump. Boards are sorted by name so a survey always runs in one order.
 */
export function pickSurveyTitles(
  entries: readonly { name: string; slot?: string }[],
  dumped: (name: string) => boolean,
): { board: string; title: string }[] {
  const byBoard = new Map<string, string>();
  for (const entry of entries) {
    const board = entry.slot ?? 'default';
    if (!byBoard.has(board) && dumped(entry.name)) byBoard.set(board, entry.name);
  }
  return [...byBoard].map(([board, title]) => ({ board, title })).sort((a, b) => a.board.localeCompare(b.board));
}
