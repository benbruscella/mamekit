/**
 * A baseline against MAME for every contract scenario, and the comparison a
 * change is judged by: better, the same or worse than before, measure by
 * measure.
 *
 *   mamekit record [<target>|<target>/<scenario> ...]
 *   mamekit compare [<target> ...] [--measures pixels,ram,audio]
 *   mamekit show [<target> ...] [--markdown]
 *
 *   --against <commit>   no baseline: run that commit's runtime (built into an overlay of dist,
 *                        tools/compare/overlay.ts) and this tree's, now, and compare the two
 *   --refresh-mame       run MAME for every step and replace what the cache kept
 *   --verify-mame        run MAME for every step and check it against the cache: a
 *                        machine whose two runs differ is listed as uncacheable
 *   --no-mame-cache      neither read nor write the MAME cache
 *   --jobs N             targets at once (default: 1 for record, half the cores for compare;
 *                        one target's scenarios always run in turn)
 *   --baseline <commit>  the baseline to compare with or show (default: the newest recorded);
 *                        with record, a baseline to finish from a later commit of the same src
 *   --measures list      compare only these: pixels, ram, audio, or any of
 *                        pixels:none pixels:contract ram audio:none audio:contract
 *   --allow-dirty        record from a tree with local changes (marked dirty; not a baseline to quote)
 *   --redo list          with record and named targets: take these measures again, replacing
 *                        what was recorded (MAME's reference changed: a sample set was added).
 *                        A redo needs the same src, MAME and Node, but not the same dist build:
 *                        each generation stamps a new build id, so a baseline whose dist was
 *                        regenerated could otherwise never take one. The file records the redo.
 *
 * The set is every acceptance contract scenario (src/games/contracts.ts),
 * accepted and candidate, so nothing is listed by hand. Each is run twice
 * through `mamekit against`, which gives both sides the same input:
 *
 *   * with no input (--input none --ram --audio): pixels, RAM and audio;
 *   * with the contract's own input (--input contract --audio): pixels and audio.
 *
 * Audio is measured as tools/compare-audio.mjs measures it (the level, the
 * octave bands and the onset rate), from our capture and MAME's -wavwrite of
 * the same run. Over the contract's input it is the game being played, which
 * a silent attract mode (Pac-Man's) never is.
 *
 * The compared frames, the RAM window and every step's arguments are worked
 * out once (tools/oracle/baseline.ts) and stored with the baseline, so a
 * comparison re-runs exactly what was recorded, whatever the rules become.
 *
 * `record` writes .mamekit/baseline/<commit>/<target>.json. It is kept out of
 * .cache, which `npm run clean:all` deletes: a baseline is evidence that takes
 * hours of MAME to record, not a cache. Nothing else writes there: an oracle
 * run rewrites .cache/oracle/<target>.json and its
 * exhibit's oracle.json, and generation rewrites oracle.json, but neither
 * touches a baseline. A measure once recorded is never run again; a failed
 * one is retried by the next `record`, so a stopped run resumes. Every step
 * that fails is run once more before the failure is believed (#190).
 *
 * `compare` re-runs the stored plans on the current tree, writes the runs to
 * .mamekit/compare/<target>.json and prints a verdict per measure: better,
 * same, moved (within the measure's tolerance, tools/compare/baseline.ts
 * TOLERANCE) or worse (past it). Material regressions are listed first. It
 * exits 1 when any measure is worse.
 */

import { spawn, spawnSync } from 'node:child_process';
import { createWriteStream, existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { availableParallelism } from 'node:os';
import { join, relative, resolve } from 'node:path';
import { loadGenerationGameContracts } from '../../src/games/contracts.ts';
import { gameOutputDir } from '../../src/gen/output-layout.ts';
import type { ShellConfig } from '../../src/runtime/shell.ts';
import {
  cliArguments, audioLevelDb, audioMeasure, audioSpectrumDb, baselineUnits, compareUnit, MEASURES, SILENCE_RMS, pixelsMeasure, ramMeasure, runFailure, selectUnits, unitPlan,
  type AudioResult, type BaselineUnit, type Measure, type MeasureName, type MeasureVerdict, type PixelsResult, type RamSummary,
  type StepPlan, type UnitPlan, type UnitRecord, type Verdict,
} from './baseline.ts';
import { mamekitIdentity, projectRoot, resolveMame } from './mame-side.ts';
import { baselineRoot, compareRoot, cliEntry } from './paths.ts';
import { describeOverlay, runtimeOverlay } from './overlay.ts';
import { mameSourceDir } from '../../src/paths.ts';
import { boardRam, ramBytesPerFrame } from './plan.ts';
import type { RunReport } from './report.ts';

const thisFile = 'mamekit';

// --- options ---------------------------------------------------------------
const argv = process.argv.slice(2);
const valued = new Set(['--jobs', '--baseline', '--measures', '--redo', '--mame', '--mame-src', '--against']);
const positional: string[] = [];
const options = new Map<string, string>();
for (let index = 0; index < argv.length; index++) {
  const arg = argv[index]!;
  if (!arg.startsWith('--')) positional.push(arg);
  else options.set(arg, valued.has(arg) ? argv[++index]! : '');
}
const [command, ...names] = positional;
if (command !== 'record' && command !== 'compare' && command !== 'show') {
  console.error(`usage: ${thisFile} record|compare|show [<target>|<target>/<scenario> ...] ` +
    '[--jobs N] [--baseline <commit>] [--measures pixels,ram,audio] [--markdown]');
  process.exit(2);
}
// Each oracle run is a child that resolves MAME for itself, through the environment.
if (options.get('--mame-src')) process.env.MAME_SRC = resolve(options.get('--mame-src')!);
if (options.get('--mame')) process.env.MAME_BIN = resolve(options.get('--mame')!);
// A comparison mostly runs our side alone (MAME's comes from the cache), so it
// takes half the cores unless told otherwise; recording runs MAME, one target at a time.
const jobs = Math.max(1, Number(options.get('--jobs') ?? (command === 'compare' ? Math.floor(availableParallelism() / 2) : 1)));
const dist = join(projectRoot, 'dist');

// --- identity --------------------------------------------------------------

interface BaselineIdentity {
  commit: string;
  dirty: boolean;
  /** The tree hash of src/: the emulation measured, whatever else the commit changed. */
  srcTree: string;
  /** main when recorded, and whether src/ was main's. */
  main: string;
  srcIsMain: boolean;
  mame: string;
  node: string;
  /** dist/build-manifest.json's buildId: which generation was measured. */
  distBuildId: string;
  startedAt: string;
}

interface TargetFile {
  target: string;
  identity: BaselineIdentity;
  units: Record<string, UnitRecord & { measuredAt?: string }>;
  /** Measures taken again with --redo, and the identity they were taken under. */
  redone?: { measures: string[]; identity: BaselineIdentity }[];
}

const git = (...args: string[]) => spawnSync('git', args, { cwd: projectRoot, encoding: 'utf8' }).stdout.trim();

function currentIdentity(mame: string): BaselineIdentity {
  const { commit, dirty } = mamekitIdentity();
  const srcTree = git('rev-parse', 'HEAD:src');
  const manifest = join(dist, 'build-manifest.json');
  return {
    commit,
    dirty,
    srcTree,
    main: git('rev-parse', '--short', 'main'),
    srcIsMain: srcTree === git('rev-parse', 'main:src'),
    mame,
    node: process.version,
    distBuildId: existsSync(manifest) ? String((JSON.parse(readFileSync(manifest, 'utf8')) as { buildId?: string }).buildId ?? '') : '',
    startedAt: new Date().toISOString(),
  };
}

/** The runs are only comparable on one Node: the one `.nvmrc` pins and CI runs. */
function requirePinnedNode(): void {
  const pinned = `v${readFileSync(join(projectRoot, '.nvmrc'), 'utf8').trim()}`;
  if (process.version !== pinned) {
    console.error(`${thisFile} runs on Node ${pinned} (.nvmrc), not ${process.version}: fnm exec --using=${pinned.slice(1)} npm run mamekit -- ...`);
    process.exit(2);
  }
}

function writeJson(path: string, value: unknown): void {
  mkdirSync(join(path, '..'), { recursive: true });
  writeFileSync(`${path}.tmp`, `${JSON.stringify(value, null, 2)}\n`);
  renameSync(`${path}.tmp`, path);
}

const readJson = <T>(path: string): T => JSON.parse(readFileSync(path, 'utf8')) as T;

// --- the units -------------------------------------------------------------

const units = selectUnits(baselineUnits(await loadGenerationGameContracts()), names);
const safe = (key: string) => key.replace(/[^\w.-]+/g, '-');

function ramBytes(unit: BaselineUnit): number {
  const path = join(gameOutputDir(dist, unit.category as never, unit.target), 'config.json');
  if (!existsSync(path)) throw new Error(`${unit.target} is not generated; run npm run gen:all first`);
  return ramBytesPerFrame(boardRam(readJson<ShellConfig>(path)));
}

/** Units grouped by target, in contract order: one target's runs share its oracle report, so they run in turn. */
function byTarget(list: readonly BaselineUnit[]): [string, BaselineUnit[]][] {
  const groups = new Map<string, BaselineUnit[]>();
  for (const unit of list) groups.set(unit.target, [...groups.get(unit.target) ?? [], unit]);
  return [...groups];
}

async function eachTarget(work: (target: string, list: BaselineUnit[]) => Promise<void>): Promise<void> {
  const groups = byTarget(units);
  let next = 0;
  const worker = async () => {
    while (next < groups.length) {
      const [target, list] = groups[next++]!;
      await work(target, list);
    }
  };
  await Promise.all(Array.from({ length: Math.min(jobs, groups.length) }, worker));
}

// --- one step --------------------------------------------------------------

/**
 * A tool run as a child on this Node, its output kept in a log beside the
 * results. The oracle runs its own two sides at low priority.
 */
function runTool(args: string[], log: string): Promise<{ status: number | null; tail: string }> {
  mkdirSync(join(log, '..'), { recursive: true });
  return new Promise(done => {
    const child = spawn(process.execPath, args, { cwd: projectRoot, stdio: ['ignore', 'pipe', 'pipe'] });
    const file = createWriteStream(log);
    let tail = '';
    const keep = (chunk: Buffer) => { file.write(chunk); tail = (tail + chunk.toString()).slice(-2000); };
    child.stdout.on('data', keep);
    child.stderr.on('data', keep);
    child.on('close', (status, signal) => {
      file.end();
      done({ status: signal ? null : status, tail });
    });
  });
}

/** How each run is to treat the MAME cache, handed on to `mamekit against`. */
const cacheFlags = ['--refresh-mame', '--verify-mame', '--no-mame-cache'].filter(name => options.has(name));
/** Runs whose MAME side came from the cache, and runs that started MAME. */
const mameTally = { cached: 0, ran: 0 };
const mameSummary = () => `MAME's side: ${mameTally.cached} from the cache, ${mameTally.ran} run`;

const lastLines = (text: string) => text.trim().split('\n').filter(Boolean).slice(-2).join(' | ').slice(0, 300);

/**
 * One oracle run, run once more if it fails: a native crash or a stray
 * divergence on this host is not believed until it happens twice (#190).
 */
async function oracleRun(plan: StepPlan, scratch: string, extra: readonly string[] = []): Promise<{ run?: RunReport; failure?: string; retried?: string }> {
  let first: string | undefined;
  let outcome: { run?: RunReport; failure?: string } = {};
  for (let attempt = 0; attempt < 2; attempt++) {
    const out = `${scratch}.json`;
    rmSync(out, { force: true });
    const ran = await runTool([cliEntry, ...cliArguments(plan), ...extra, ...cacheFlags, '--out', out], `${scratch}.log`);
    const runs = existsSync(out) ? Object.values(readJson<Record<string, RunReport>>(out)) : [];
    if (runs[0]) {
      if (runs[0].mameCached) mameTally.cached++;
      else mameTally.ran++;
    }
    outcome = runs[0]
      ? { run: runs[0], ...(runFailure(runs[0]) ? { failure: runFailure(runs[0]) } : {}) }
      : { failure: `the oracle exited ${ran.status ?? 'on a signal'}: ${lastLines(ran.tail)}` };
    if (!outcome.failure) return { ...outcome, ...(first ? { retried: first } : {}) };
    first ??= outcome.failure;
  }
  return outcome;
}

/** The commit each measure was taken on: a baseline can be finished from a later, tools-only commit. */
const toolsCommit = mamekitIdentity().commit;

const RECORD_FIELD: Record<MeasureName, Exclude<keyof UnitRecord, 'plan'>> = {
  'pixels:none': 'pixelsNone', 'pixels:contract': 'pixelsContract', ram: 'ram', 'audio:none': 'audioNone', 'audio:contract': 'audioContract',
};

const pending = (measure: Measure<unknown> | undefined) => !measure || measure.status === 'failed';

/**
 * Fills a unit's record: every measure not yet recorded, or recorded as
 * failed, and never one already recorded. `want` limits a comparison to the
 * measures asked for.
 */
async function measureUnit(unit: BaselineUnit, record: UnitRecord, scratch: string,
  want: (measure: MeasureName) => boolean, save: () => void, extra: readonly string[] = []): Promise<void> {
  const { plan } = record;
  const due = (measure: MeasureName, kept: Measure<unknown> | undefined) => want(measure) && pending(kept);
  if (due('pixels:none', record.pixelsNone) || due('ram', record.ram) || due('audio:none', record.audioNone)) {
    const { run, failure, retried } = await oracleRun(plan.none, `${scratch}-none`, extra);
    const from = <T>(measure: (run: RunReport) => Measure<T>): Measure<T> => {
      const kept = run ? measure(run) : { status: 'failed' as const, reason: failure! };
      return { ...kept, ...(retried ? { retried } : {}), measuredOn: toolsCommit };
    };
    if (due('pixels:none', record.pixelsNone)) record.pixelsNone = from(pixelsMeasure);
    if (due('ram', record.ram)) {
      record.ram = plan.ramSkipped ? { status: 'skipped', reason: plan.ramSkipped, measuredOn: toolsCommit } : from(ramMeasure);
    }
    if (due('audio:none', record.audioNone)) record.audioNone = from(audioMeasure);
    save();
    progress(unit, 'no input', record.pixelsNone, record.ram, record.audioNone);
  }
  if (due('pixels:contract', record.pixelsContract) || due('audio:contract', record.audioContract)) {
    const { run, failure, retried } = await oracleRun(plan.contract, `${scratch}-contract`, extra);
    const from = <T>(measure: (run: RunReport) => Measure<T>): Measure<T> => {
      const kept = run ? measure(run) : { status: 'failed' as const, reason: failure! };
      return { ...kept, ...(retried ? { retried } : {}), measuredOn: toolsCommit };
    };
    if (due('pixels:contract', record.pixelsContract)) record.pixelsContract = from(pixelsMeasure);
    if (due('audio:contract', record.audioContract)) record.audioContract = from(audioMeasure);
    save();
    progress(unit, 'contract', record.pixelsContract, record.audioContract);
  }
}

// --- describing a measure --------------------------------------------------

function describe(measure: Measure<unknown> | undefined): string {
  if (!measure) return '-';
  if (measure.status !== 'ok') return `${measure.status.toUpperCase()}: ${measure.reason}`;
  const result = measure.result as object;
  if ('exact' in result) {
    const pixels = result as PixelsResult;
    const first = pixels.firstDivergence;
    const at = first === undefined ? undefined : pixels.frames.find(frame => frame.frame === first);
    return `exact ${pixels.exact.length}/${pixels.frames.length}` +
      (at ? `, first differs at ${first} (${at.pixels === undefined ? `size ${at.size}` : `${at.pixels} px`})` : '') + ` @${pixels.offset >= 0 ? '+' : ''}${pixels.offset}` +
      (pixels.scale ? ` at ${pixels.scale}x` : '');
  }
  if ('compared' in result) {
    const ram = result as RamSummary;
    return ram.firstDivergence
      ? `first differs at ${ram.firstDivergence.frame} (${ram.firstDivergence.bytes} B), ${ram.total} B over ${ram.compared} frames`
      : `identical over ${ram.compared} frames`;
  }
  const audio = result as AudioResult;
  const silent = (rms: number) => rms < SILENCE_RMS;
  if (silent(audio.rms.ours) && silent(audio.rms.ref)) return 'both silent';
  return `level ${audioLevelDb(audio).toFixed(1)} dB${silent(audio.rms.ref) ? ' (MAME silent)' : silent(audio.rms.ours) ? ' (ours silent)' : ''}, ` +
    `bands ${audioSpectrumDb(audio).toFixed(1)} dB, onsets ${audio.onsets.ours.toFixed(2)}/${audio.onsets.ref.toFixed(2)}`;
}

let done = 0;
function progress(unit: BaselineUnit, step: string, ...measures: (Measure<unknown> | undefined)[]): void {
  done++;
  console.log(`[${done}] ${unit.key} ${step}: ${measures.map(describe).join('; ')}`);
}

// --- record ----------------------------------------------------------------

async function record(): Promise<void> {
  requirePinnedNode();
  const mame = resolveMame(mameSourceDir(projectRoot), options.get('--mame'));
  const identity = currentIdentity(mame.version);
  if (identity.dirty && !options.has('--allow-dirty')) {
    console.error('src, tools or bin have local changes: a baseline is recorded from a commit (--allow-dirty to try it anyway)');
    process.exit(2);
  }
  // A baseline measures src/: one begun on another commit is finished from
  // this one only if src, MAME, Node and the generation are all the same.
  const dir = join(baselineRoot, options.get('--baseline') ?? identity.commit);
  if (options.has('--baseline') && !existsSync(join(dir, 'baseline.json'))) {
    console.error(`no baseline ${options.get('--baseline')} to finish`);
    process.exit(2);
  }
  const redo = options.has('--redo') ? measuresWanted('--redo') : [];
  if (redo.length && !names.length) {
    console.error('--redo replaces recorded measures, so it takes the targets to redo by name');
    process.exit(2);
  }
  const manifestPath = join(dir, 'baseline.json');
  if (existsSync(manifestPath)) {
    const recorded = readJson<BaselineIdentity>(manifestPath);
    // A dist build id is a generation's timestamp, not its content: a redo
    // asks for named measures again against the same src, MAME and Node.
    const fields = redo.length ? ['mame', 'node', 'srcTree'] as const : ['mame', 'node', 'srcTree', 'distBuildId'] as const;
    const differs = fields.filter(field => recorded[field] !== identity[field]);
    if (differs.length) {
      console.error(`${relative(projectRoot, dir)} was recorded with another ${differs.join(', ')}; ` +
        `one baseline is one measurement (${differs.map(field => `${recorded[field]} vs ${identity[field]}`).join(', ')})`);
      process.exit(2);
    }
  } else {
    writeJson(manifestPath, identity);
  }
  if (!identity.srcIsMain) console.warn(`note: src/ is not main's (${identity.main}); this baseline is of ${identity.commit}`);
  console.log(`recording ${units.length} scenarios of ${byTarget(units).length} targets into ${relative(projectRoot, dir)} ` +
    `(MAME ${mame.version}, Node ${process.version}, ${jobs} at a time)`);
  await eachTarget(async (target, list) => {
    const path = join(dir, `${target}.json`);
    const file: TargetFile = existsSync(path) ? readJson<TargetFile>(path) : { target, identity, units: {} };
    if (redo.length) file.redone = [...(file.redone ?? []), { measures: redo, identity }];
    for (const unit of list) {
      if (!file.units[unit.key]) {
        try {
          file.units[unit.key] = { plan: unitPlan(unit, ramBytes(unit)) };
        } catch (error) {
          console.log(`[-] ${unit.key}: ${(error as Error).message}`);
          continue;
        }
      }
      const entry = file.units[unit.key]!;
      // Replacing a recorded measure is only ever asked for, by name.
      for (const measure of redo) delete entry[RECORD_FIELD[measure]];
      await measureUnit(unit, entry, join(dir, 'logs', safe(unit.key)), () => true,
        () => { entry.measuredAt = new Date().toISOString(); writeJson(path, file); });
    }
  });
  show(dir);
  console.log(mameSummary());
}

// --- compare ---------------------------------------------------------------

function baselineDir(): string {
  const named = options.get('--baseline');
  if (named) {
    const dir = join(baselineRoot, named);
    if (!existsSync(join(dir, 'baseline.json'))) throw new Error(`no baseline ${named} in ${relative(projectRoot, baselineRoot)}`);
    return dir;
  }
  const recorded = existsSync(baselineRoot) ? readdirSync(baselineRoot)
    .filter(name => existsSync(join(baselineRoot, name, 'baseline.json')))
    .map(name => ({ dir: join(baselineRoot, name), startedAt: readJson<BaselineIdentity>(join(baselineRoot, name, 'baseline.json')).startedAt }))
    .sort((left, right) => right.startedAt.localeCompare(left.startedAt)) : [];
  if (!recorded.length) throw new Error(`no baseline recorded yet in ${relative(projectRoot, baselineRoot)}: mamekit record`);
  return recorded[0]!.dir;
}

function measuresWanted(option = '--measures'): MeasureName[] {
  const asked = options.get(option);
  if (!asked) return [...MEASURES];
  const wanted = asked.split(',').flatMap(name => MEASURES.filter(measure => measure === name || measure.startsWith(`${name}:`)));
  if (!wanted.length) throw new Error(`${option} takes ${MEASURES.join(', ')}, or pixels, ram, audio`);
  return wanted;
}

const MARK: Record<string, string> = { better: 'better', same: 'same', moved: 'moved', worse: 'WORSE', 'n/a': 'n/a' };

async function compare(): Promise<void> {
  requirePinnedNode();
  const mame = resolveMame(mameSourceDir(projectRoot), options.get('--mame'));
  const dir = baselineDir();
  const baseline = readJson<BaselineIdentity>(join(dir, 'baseline.json'));
  const identity = currentIdentity(mame.version);
  if (baseline.mame !== identity.mame) throw new Error(`the baseline was taken with MAME ${baseline.mame}, this is ${identity.mame}`);
  const measures = measuresWanted();
  const want = (measure: MeasureName) => measures.includes(measure);
  console.log(`comparing ${units.length} scenarios with baseline ${baseline.commit} (${baseline.startedAt.slice(0, 10)}), ` +
    `on ${identity.commit}${identity.dirty ? ' (dirty)' : ''}: ${measures.join(', ')}`);
  const rows: { key: string; verdicts: Partial<Record<MeasureName, MeasureVerdict>> }[] = [];
  await eachTarget(async (target, list) => {
    const path = join(dir, `${target}.json`);
    if (!existsSync(path)) {
      for (const unit of list) console.log(`[-] ${unit.key}: not in baseline ${baseline.commit}`);
      return;
    }
    const before = readJson<TargetFile>(path);
    const out: { baseline: BaselineIdentity; identity: BaselineIdentity; units: Record<string, { after: UnitRecord; verdicts: object }> } =
      { baseline, identity, units: {} };
    for (const unit of list) {
      const was = before.units[unit.key];
      if (!was) {
        console.log(`[-] ${unit.key}: not in baseline ${baseline.commit}`);
        continue;
      }
      const after: UnitRecord = { plan: was.plan };
      await measureUnit(unit, after, join(compareRoot, 'logs', safe(unit.key)), want, () => {});
      const verdicts = compareUnit(was, after, measures);
      out.units[unit.key] = { after, verdicts };
      rows.push({ key: unit.key, verdicts });
      writeJson(join(compareRoot, `${target}.json`), out);
    }
  });
  printVerdicts(rows, measures, relative(projectRoot, compareRoot));
}

type VerdictRow = { key: string; verdicts: Partial<Record<MeasureName, MeasureVerdict>> };

/** The table, the notes (material regressions first) and the summary; exit 1 on any worse. */
function printVerdicts(rows: VerdictRow[], measures: readonly MeasureName[], where: string): void {
  rows.sort((left, right) => units.findIndex(unit => unit.key === left.key) - units.findIndex(unit => unit.key === right.key));
  const width = Math.max(10, ...rows.map(row => row.key.length));
  console.log(`\n${'scenario'.padEnd(width)}  ${measures.map(measure => measure.padEnd(15)).join(' ')}`);
  for (const row of rows) {
    console.log(`${row.key.padEnd(width)}  ${measures.map(measure => MARK[row.verdicts[measure]?.verdict ?? 'n/a']!.padEnd(15)).join(' ')}`);
  }
  // Material regressions first, then improvements, then moves within tolerance.
  const order: Verdict[] = ['worse', 'better', 'moved'];
  const heading: Record<string, string> = { worse: 'Worse (past tolerance):', better: 'Better:', moved: 'Moved, within tolerance:' };
  for (const kind of order) {
    const notes = rows.flatMap(row => measures.flatMap(measure => {
      const verdict = row.verdicts[measure];
      return verdict?.verdict === kind ? [`  ${row.key} ${measure}${verdict.detail ? `: ${verdict.detail}` : ''}`] : [];
    }));
    if (notes.length) console.log(`\n${heading[kind]}\n${notes.join('\n')}`);
  }
  const having = (kind: Verdict) => rows.filter(row => Object.values(row.verdicts).some(verdict => verdict?.verdict === kind));
  const worse = having('worse');
  console.log(`\n${rows.length} scenarios: ${worse.length ? `${worse.length} worse on some measure (${worse.map(row => row.key).join(', ')})` : 'none worse'}, ` +
    `${having('better').length} better, ${having('moved').length} moved within tolerance; ` +
    `runs in ${where}; ${mameSummary()}`);
  if (worse.length) process.exitCode = 1;
}

/**
 * `compare --against <commit>`: that commit's runtime and this tree's, both
 * run now, from one dist (that commit's runtime in an overlay of it,
 * tools/compare/overlay.ts), measure by measure. No baseline, no checkout:
 * "is it already broken on main?" is one command. Each scenario's plan is
 * worked out afresh, as `record` would; MAME's side is cached, so it serves
 * both runs.
 */
async function compareAgainst(commitish: string): Promise<void> {
  requirePinnedNode();
  resolveMame(mameSourceDir(projectRoot), options.get('--mame'));
  // Built once here, so the runs (several at a time) all find it made.
  const overlay = runtimeOverlay(commitish);
  const measures = measuresWanted();
  const want = (measure: MeasureName) => measures.includes(measure);
  const identity = mamekitIdentity();
  console.log(`comparing ${units.length} scenarios: ${describeOverlay(overlay)}, against this tree ` +
    `(${identity.commit}${identity.dirty ? ', dirty' : ''}): ${measures.join(', ')}`);
  const root = join(compareRoot, `against-${overlay.short}`);
  const rows: VerdictRow[] = [];
  await eachTarget(async (target, list) => {
    const out: { against: string; identity: object; units: Record<string, { before: UnitRecord; after: UnitRecord; verdicts: object }> } =
      { against: overlay.commit, identity, units: {} };
    for (const unit of list) {
      let plan: UnitPlan;
      try {
        plan = unitPlan(unit, ramBytes(unit));
      } catch (error) {
        console.log(`[-] ${unit.key}: ${(error as Error).message}`);
        continue;
      }
      const before: UnitRecord = { plan };
      const after: UnitRecord = { plan };
      await measureUnit(unit, before, join(root, 'logs', `${safe(unit.key)}-before`), want, () => {}, ['--runtime', overlay.commit]);
      await measureUnit(unit, after, join(root, 'logs', safe(unit.key)), want, () => {});
      const verdicts = compareUnit(before, after, measures);
      out.units[unit.key] = { before, after, verdicts };
      rows.push({ key: unit.key, verdicts });
      writeJson(join(root, `${target}.json`), out);
    }
  });
  printVerdicts(rows, measures, relative(projectRoot, root));
}

// --- show ------------------------------------------------------------------

function show(dir: string): void {
  const identity = readJson<BaselineIdentity>(join(dir, 'baseline.json'));
  const markdown = options.has('--markdown');
  const lines: string[] = [];
  const missing: string[] = [];
  const cell = (text: string) => markdown ? text.replace(/\|/g, '\\|') : text;
  if (markdown) {
    lines.push(`Baseline \`${identity.commit}\` (src ${identity.srcIsMain ? `= main ${identity.main}` : 'not main'}), MAME ${identity.mame}, ` +
      `Node ${identity.node}, recorded ${identity.startedAt.slice(0, 10)}.`, '',
      '| scenario | pixels, no input | pixels, contract input | RAM, no input | audio, no input | audio, contract input |',
      '|---|---|---|---|---|---|');
  } else {
    lines.push(`baseline ${identity.commit}${identity.dirty ? ' (dirty)' : ''}, src ${identity.srcIsMain ? `= main ${identity.main}` : 'not main'}, ` +
      `MAME ${identity.mame}, Node ${identity.node}, dist ${identity.distBuildId}, from ${identity.startedAt}`);
  }
  for (const unit of units) {
    const path = join(dir, `${unit.target}.json`);
    const entry = existsSync(path) ? readJson<TargetFile>(path).units[unit.key] : undefined;
    if (!entry) {
      missing.push(`${unit.key}: not recorded`);
      continue;
    }
    const measures: [string, Measure<unknown> | undefined][] = [
      ['pixels, no input', entry.pixelsNone], ['pixels, contract', entry.pixelsContract], ['RAM', entry.ram],
      ['audio, no input', entry.audioNone], ['audio, contract', entry.audioContract],
    ];
    for (const [name, measure] of measures) {
      if (!measure) missing.push(`${unit.key} ${name}: not recorded`);
      else if (measure.status !== 'ok') missing.push(`${unit.key} ${name}: ${measure.status}, ${measure.reason}`);
    }
    const text = measures.map(([, measure]) => measure?.status === 'ok' ? describe(measure) : measure ? measure.status : '-');
    lines.push(markdown ? `| ${unit.key} | ${text.map(cell).join(' | ')} |` : `  ${unit.key.padEnd(18)} ${text.join('  |  ')}`);
  }
  if (missing.length) {
    lines.push('', markdown ? '**Not measured, and why:**' : 'not measured, and why:', '');
    lines.push(...missing.map(line => markdown ? `- ${cell(line)}` : `  ${line}`));
  }
  console.log(lines.join('\n'));
}

if (command === 'record') await record();
else if (command === 'compare' && options.has('--against')) await compareAgainst(options.get('--against')!);
else if (command === 'compare') await compare();
else show(baselineDir());
