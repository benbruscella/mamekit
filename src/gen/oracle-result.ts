// A machine's latest comparison with MAME itself, shipped with its exhibit.
//
// `tools/mame-oracle.ts` runs a generated machine and a MAME binary of the
// same release side by side and writes what it found to the gitignored
// `.cache/oracle/<target>.json`. That report is local evidence; what ships is
// the summary below, written as `games/<category>/<target>/oracle.json` after
// generation and again whenever the tool runs. It is refreshed outside the
// per-target cache on purpose: a cached meta.json would keep an old result.
//
// Nothing here is written by hand. A machine nobody has run the tool on has
// no oracle.json, and says nothing; a result from another MAME release than
// the source checkout is dropped rather than shown.

import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { GAME_CATEGORIES, gameOutputDir } from './output-layout.ts';

/** One run as the tool records it (the fields this summary reads). */
export interface OracleRunRecord {
  title?: string;
  scenario?: string;
  input: 'none' | 'start' | 'contract';
  checkedAt: string;
  mame: string;
  mamekit: { commit: string; dirty: boolean };
  pixels?: {
    offset: number;
    frames: { frame: number; mame: number; pixels?: number; size?: string }[];
    exact: number[];
    firstDivergence?: number;
  };
  ram?: { firstDivergence?: { frame: number } };
  ours?: { frames: number; error?: string };
  mameError?: string;
}

export interface OracleSurveyRecord {
  frame: number;
  input: 'none' | 'start' | 'contract';
  checkedAt: string;
  mame: string;
  titles: Record<string, { board: string; title: string; cause: string }>;
}

/** `.cache/oracle/<target>.json` */
export interface OracleReportFile {
  target: string;
  runs: Record<string, OracleRunRecord>;
  survey?: OracleSurveyRecord;
}

export interface OracleRunSummary {
  /** The title run, for a console or computer; absent for the machine itself. */
  title?: string;
  input: OracleRunRecord['input'];
  /** Our frames compared. */
  frames: number[];
  /** Those that are pixel-for-pixel MAME's. */
  exact: number[];
  /** The first compared frame that is not. */
  divergesAt?: number;
  /** MAME frame = ours + offset. */
  offset?: number;
  /** A side failed to run the title. */
  failed?: 'ours' | 'mame';
  checkedAt: string;
}

/** What ships: oracle.json. */
export interface OracleSummary {
  mame: string;
  /** `exact` when every run is pixel-exact at every compared frame. */
  verdict: 'exact' | 'diverges';
  /** The mamekit commit checked; `dirty` when the tree had local changes. */
  mamekit: { commit: string; dirty: boolean };
  checkedAt: string;
  runs: OracleRunSummary[];
  survey?: { frame: number; input: OracleSurveyRecord['input']; boards: number; exact: number; causes: Record<string, number> };
}

export function oracleReportPath(projectRoot: string, target: string): string {
  return join(projectRoot, '.cache/oracle', `${target}.json`);
}

function summarizeRun(run: OracleRunRecord): OracleRunSummary {
  const frames = run.pixels?.frames.map(frame => frame.frame) ?? [];
  const failed = run.ours?.error ? 'ours' : run.mameError ? 'mame' : undefined;
  return {
    ...(run.title ? { title: run.title } : {}),
    input: run.input,
    frames,
    exact: run.pixels?.exact ?? [],
    ...(run.pixels?.firstDivergence !== undefined ? { divergesAt: run.pixels.firstDivergence } : {}),
    ...(run.pixels ? { offset: run.pixels.offset } : {}),
    ...(failed ? { failed } : {}),
    checkedAt: run.checkedAt,
  };
}

/**
 * The shipped summary of a report, or undefined when it holds nothing from
 * `mameVersion` (the source checkout's release) to show.
 */
export function summarizeOracleReport(report: OracleReportFile, mameVersion: string): OracleSummary | undefined {
  const runs = Object.values(report.runs)
    .filter(run => run.mame === mameVersion)
    .sort((left, right) => (left.title ?? '').localeCompare(right.title ?? ''));
  const survey = report.survey?.mame === mameVersion ? report.survey : undefined;
  if (!runs.length && !survey) return undefined;
  const summaries = runs.map(summarizeRun);
  const latest = [...runs].sort((left, right) => right.checkedAt.localeCompare(left.checkedAt))[0];
  const causes: Record<string, number> = {};
  for (const entry of Object.values(survey?.titles ?? {})) causes[entry.cause] = (causes[entry.cause] ?? 0) + 1;
  const exact = summaries.length > 0 && summaries.every(run =>
    !run.failed && run.frames.length > 0 && run.exact.length === run.frames.length);
  return {
    mame: mameVersion,
    verdict: exact ? 'exact' : 'diverges',
    mamekit: latest?.mamekit ?? { commit: '', dirty: false },
    checkedAt: latest?.checkedAt ?? survey!.checkedAt,
    runs: summaries,
    ...(survey ? {
      survey: {
        frame: survey.frame,
        input: survey.input,
        boards: Object.keys(survey.titles).length,
        exact: causes.exact ?? 0,
        causes,
      },
    } : {}),
  };
}

/** Write (or remove) one target's oracle.json from its local report. */
export function refreshOracleResult(outDir: string, reportPath: string, mameVersion: string | undefined): boolean {
  const target = join(outDir, 'oracle.json');
  let summary: OracleSummary | undefined;
  if (mameVersion && existsSync(reportPath)) {
    try {
      summary = summarizeOracleReport(JSON.parse(readFileSync(reportPath, 'utf8')) as OracleReportFile, mameVersion);
    } catch {
      summary = undefined;
    }
  }
  if (!summary) {
    rmSync(target, { force: true });
    return false;
  }
  writeFileSync(target, `${JSON.stringify(summary, null, 2)}\n`);
  return true;
}

/** Every generated target's oracle.json, from `.cache/oracle`; returns how many carry one. */
export function refreshOracleResults(outRoot: string, projectRoot: string, mameVersion: string | undefined): number {
  let written = 0;
  for (const category of GAME_CATEGORIES) {
    const categoryDir = join(outRoot, 'games', category);
    if (!existsSync(categoryDir)) continue;
    for (const entry of readdirSync(categoryDir)) {
      const dir = gameOutputDir(outRoot, category, entry);
      if (!existsSync(join(dir, 'config.json'))) continue;
      if (refreshOracleResult(dir, oracleReportPath(projectRoot, entry), mameVersion)) written++;
    }
  }
  return written;
}
