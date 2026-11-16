/**
 * Each sound chip's level over time: our run, another commit's beside it, and
 * MAME's whole mix under both.
 *
 *   mamekit levels <target> [<title>] [options]
 *
 *   --window N           frames per window (default 300)
 *   --frames N           how long to run (default 1800)
 *   --input none|start|contract, --scenario <id>
 *                        the run's input, as `mamekit against` takes them
 *   --against <commit>   the run set beside ours (default: the newest baseline's commit)
 *   --alone              ours and MAME only
 *
 * Ours: every chip's stream as it reaches the speaker
 * (MAMEKIT_OBSERVE_STREAMS), its RMS per window, from `mamekit against
 * --levels`. The other commit's runtime runs from an overlay of dist
 * (tools/compare/overlay.ts), so the two differ only in the runtime. MAME
 * cannot say what each chip played, but its -wavwrite mix per window says
 * when ours departs from it; MAME's side comes from the cache after its first
 * run. A window more than 3 dB from ours is marked `*` on the other rows: TMNT's
 * title sample stopping early showed as one chip's windows going to -80.
 */

import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { join, relative } from 'node:path';
import { gameOutputDir } from '../../src/gen/output-layout.ts';
import type { ShellConfig } from '../../src/runtime/shell.ts';
import { levelsTable, readPcm16Wav, windowRms, type LevelSeries } from './levels-plan.ts';
import { projectRoot } from './mame-side.ts';
import { baselineRoot, cliEntry, reportRoot } from './paths.ts';
import type { RunReport } from './report.ts';

const argv = process.argv.slice(2);
const valued = new Set(['--window', '--frames', '--input', '--scenario', '--against']);
const positional: string[] = [];
const options = new Map<string, string>();
for (let index = 0; index < argv.length; index++) {
  const arg = argv[index]!;
  if (!arg.startsWith('--')) positional.push(arg);
  else options.set(arg, valued.has(arg) ? argv[++index]! : '');
}
const [target, title] = positional;
if (!target) {
  console.error('usage: mamekit levels <target> [<title>] [--window N] [--frames N] [--against <commit> | --alone]');
  process.exit(2);
}
const window = Number(options.get('--window') ?? 300);
const frames = Number(options.get('--frames') ?? 1800);

function loadConfig(): ShellConfig {
  for (const category of ['arcade', 'consoles', 'computers']) {
    const path = join(gameOutputDir(join(projectRoot, 'dist'), category as never, target!), 'config.json');
    if (existsSync(path)) return JSON.parse(readFileSync(path, 'utf8')) as ShellConfig;
  }
  throw new Error(`${target} is not generated in dist`);
}
const refresh = loadConfig().board.screen.refresh;

/** The newest recorded baseline's commit: what "the baseline's" run is. */
function newestBaseline(): string | undefined {
  if (!existsSync(baselineRoot)) return undefined;
  return readdirSync(baselineRoot)
    .filter(name => existsSync(join(baselineRoot, name, 'baseline.json')))
    .map(name => JSON.parse(readFileSync(join(baselineRoot, name, 'baseline.json'), 'utf8')) as { commit: string; startedAt: string })
    .sort((left, right) => right.startedAt.localeCompare(left.startedAt))[0]?.commit;
}
const other = options.has('--alone') ? undefined : options.get('--against') ?? newestBaseline();

const scratch = join(reportRoot, 'levels', target);
mkdirSync(scratch, { recursive: true });
const shared = [
  ...(title ? [title] : []),
  ...(options.get('--input') ? ['--input', options.get('--input')!] : []),
  ...(options.get('--scenario') ? ['--scenario', options.get('--scenario')!] : []),
  '--audio', '--levels', String(window), '--frames', String(frames), '--keep',
];

function against(extra: string[], name: string): Promise<RunReport> {
  const out = join(scratch, `${name}.json`);
  rmSync(out, { force: true });
  return new Promise((done, fail) => {
    const child = spawn(process.execPath, [cliEntry, 'against', target!, ...shared, ...extra, '--out', out],
      { cwd: projectRoot, stdio: ['ignore', 'pipe', 'pipe'] });
    let output = '';
    child.stdout.on('data', chunk => { output += chunk; });
    child.stderr.on('data', chunk => { output += chunk; });
    child.on('close', status => {
      const run = existsSync(out) ? Object.values(JSON.parse(readFileSync(out, 'utf8')) as Record<string, RunReport>)[0] : undefined;
      if (!run?.workDir) {
        fail(new Error(`mamekit against exited ${status}: ${output.trim().split('\n').slice(-3).join(' | ')}`));
        return;
      }
      if (run.ours?.error) { fail(new Error(`ours: ${run.ours.error}`)); return; }
      done(run);
    });
  });
}

interface Side {
  chips: Record<string, number[]>;
  mix?: number[];
  mame?: number[];
}

function readSide(run: RunReport): Side {
  const dir = run.workDir!;
  const levels = JSON.parse(readFileSync(join(dir, 'ours-levels.json'), 'utf8')) as { chips: Record<string, number[]> };
  const seconds = window / refresh;
  // The recordings run a little past the last frame; a sliver of a window
  // after it would read as a level change, so only the run's own windows count.
  const windows = Math.ceil(frames / window);
  const wav = (name: string) => {
    if (!existsSync(join(dir, name))) return undefined;
    const { rate, samples } = readPcm16Wav(join(dir, name));
    return windowRms(samples, rate, seconds).slice(0, windows);
  };
  const mix = wav('ours.pcm');
  const mame = wav('mame.wav');
  const side: Side = { chips: levels.chips, ...(mix ? { mix } : {}), ...(mame ? { mame } : {}) };
  rmSync(dir, { recursive: true, force: true });
  return side;
}

console.log(`${target}${title ? ` ${title}` : ''}: levels per ${window} frames over ${frames}` +
  (other ? `, beside ${other}'s runtime` : ''));
const ours = readSide(await against([], 'ours'));
const theirs = other ? readSide(await against(['--runtime', other], 'other')) : undefined;
const short = other?.slice(0, 8);

const series: LevelSeries[] = [];
const chips = [...new Set([...Object.keys(ours.chips), ...Object.keys(theirs?.chips ?? {})])].sort();
if (!chips.length) console.log('no chip streams were observed: the board has no stream devices');
for (const chip of chips) {
  const mine = ours.chips[chip] ?? [];
  series.push({ label: chip, rms: mine });
  if (theirs) series.push({ label: `  ${short}`, rms: theirs.chips[chip] ?? [], against: mine });
}
if (ours.mix) {
  series.push({ label: 'mix', rms: ours.mix });
  if (theirs?.mix) series.push({ label: `  ${short}`, rms: theirs.mix, against: ours.mix });
  if (ours.mame) series.push({ label: '  MAME', rms: ours.mame, against: ours.mix });
}
console.log(`\n${levelsTable(series, window, refresh)}`);
console.log(`\nruns in ${relative(projectRoot, scratch)}`);
