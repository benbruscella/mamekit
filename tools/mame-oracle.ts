#!/usr/bin/env node
/**
 * Compare a generated machine with MAME itself: the same machine, the same
 * title and the same input on both sides, its pictures, RAM and bus traffic
 * set side by side and the result reported as a number.
 *
 *   MAME_BIN=/path/to/mame node tools/mame-oracle.ts <target> [<title>] [options]
 *
 *   <title>              a console cartridge by software-list name (smb1), or
 *                        any list's title as <list>:<name> (c64_cart:pacman)
 *   --titles a,b,c       several titles of one machine, one run each
 *   --survey             one title per cartridge board (a console's slot types)
 *   --frames 600,1500    our frames whose pictures are compared (default 600)
 *   --search N           try MAME offsets -N..N and keep the best for the run (default 2)
 *   --offset K           compare against MAME frame + K only
 *   --input none|start|contract
 *                        no input (the default, bar a console title), Start held
 *                        6 frames every 300 from frame 300 (a console title's
 *                        default), or the contract scenario's own actions
 *   --scenario <id>      the contract scenario to boot and, with --input contract, replay
 *   --ram [cpu:a-b,...]  dump RAM every frame on both sides; with no ranges, every
 *                        RAM range the generated board maps (repeatable, hex)
 *   --ram-frames a-b[/n] which frames to dump (default 1 to the last compared frame)
 *   --io cpu:a-b[:r|w|rw]  tap bus accesses in a range on both sides (repeatable, hex)
 *   --io-frames a-b      the frames to tap (required with --io)
 *   --audio              record MAME's sound too (-wavwrite) and compare it with
 *                        ours over the run, as tools/compare-audio.mjs does
 *   --jobs N             titles at once in a survey (default 1)
 *   --limit N            survey at most N boards
 *   --fresh              re-run survey titles already graded on this commit
 *   --background         run on the efficiency cores (macOS): slower, never in the way
 *   --watch              give MAME a window to watch the run in
 *   --keep               keep the raw captures
 *   --out file           also write this invocation's runs, by title, to a file
 *                        of their own (the report's runs are keyed by title
 *                        alone, so a later run with other input replaces one)
 *   --dist dir, --mame bin, --mame-src dir, --timeout seconds
 *
 * MAME_BIN must be the same release as the MAME source checkout; anything else
 * is refused. Every process runs at low priority (nice 10), MAME windowed and
 * without video, and a survey runs one title at a time unless told otherwise.
 *
 * The report goes to .cache/oracle/<target>.json, with a side-by-side PNG per
 * compared frame (MAME | ours | differences in red) beside it. Frames are
 * counted as both sides run them: an input given at frame N is read during
 * frame N + 1, and our frame N is compared with MAME's N + offset, the offset
 * searched because a machine can present a frame earlier or later than MAME
 * from boot (the NES is one behind).
 */

import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gameOutputDir } from '../src/gen/output-layout.ts';
import { oracleReportPath, refreshOracleResult, type OracleReportFile } from '../src/gen/oracle-result.ts';
import { romsDir } from '../src/paths.ts';
import type { ShellConfig } from '../src/runtime/shell.ts';
import { compareInputs, compareIo, comparePictures, compareRam, sideBySide, writePng } from './oracle/compare.ts';
import { mameArguments, mameFrames, mamekitIdentity, politeCommand, projectRoot, resolveMame, runMame, writeLuaPlan, type Politeness } from './oracle/mame-side.ts';
import { boardRam, parseRanges, ramFrames, type InputMode, type OraclePlan, type OracleTitle, type OursBoot, type RamPlan } from './oracle/plan.ts';
import { gradeRun, pickSurveyTitles, surveyGroups, type AudioComparison, type RunReport, type SurveyEntry } from './oracle/report.ts';

const thisFile = fileURLToPath(import.meta.url);

// --- our side, in a child process ------------------------------------------
// A native crash in one board (see the acceptance-run-flake history) costs
// that title a retry, not the survey.
const childAt = process.argv.indexOf('--child');
if (childAt >= 0) {
  const plan = JSON.parse(readFileSync(process.argv[childAt + 1]!, 'utf8')) as OraclePlan;
  try {
    const { runOurs } = await import('./oracle/ours.ts');
    await runOurs(plan);
    process.exit(0);
  } catch (error) {
    writeFileSync(join(plan.dir, 'ours-error.txt'), `${String((error as Error)?.stack ?? error)}\n`);
    process.exit(1);
  }
}

// --- options ---------------------------------------------------------------
const argv = process.argv.slice(2);
const valued = new Set(['--titles', '--frames', '--search', '--offset', '--input', '--scenario', '--ram-frames',
  '--io', '--io-frames', '--jobs', '--limit', '--dist', '--mame', '--mame-src', '--timeout', '--out']);
const positional: string[] = [];
const options = new Map<string, string[]>();
for (let index = 0; index < argv.length; index++) {
  const arg = argv[index]!;
  if (!arg.startsWith('--')) { positional.push(arg); continue; }
  const next = argv[index + 1];
  // --ram takes ranges when the next word is one (cpu:a-b), and none otherwise.
  const takes = valued.has(arg) || (arg === '--ram' && next !== undefined && /^[\w:.-]+:[0-9a-f]/i.test(next));
  options.set(arg, [...options.get(arg) ?? [], takes ? argv[++index]! : '']);
}
const option = (name: string): string | undefined => options.get(name)?.at(-1);
const flag = (name: string): boolean => options.has(name);
const [target, titleArg] = positional;
if (!target) {
  console.error('usage: MAME_BIN=... node tools/mame-oracle.ts <target> [<title>] [--frames a,b] [--input none|start|contract] [--ram] [--io cpu:a-b] [--survey]');
  process.exit(2);
}

const dist = resolve(projectRoot, option('--dist') ?? 'dist');
const mameSrc = resolve(option('--mame-src') ?? process.env.MAME_SRC ?? join(projectRoot, '../mame'));
const politeness: Politeness = { background: flag('--background'), watch: flag('--watch') };
const timeoutMs = Number(option('--timeout') ?? 900) * 1000;
const search = Number(option('--search') ?? 2);
const offsets = option('--offset') !== undefined
  ? [Number(option('--offset'))]
  : Array.from({ length: search * 2 + 1 }, (_, index) => index - search);
const comparedFrames = (option('--frames') ?? '600').split(',').map(Number).filter(frame => frame > 0).sort((a, b) => a - b);
const reportRoot = join(projectRoot, '.cache/oracle');

const mame = resolveMame(mameSrc, option('--mame'));
const outputDir = locateTarget(target);
const config = JSON.parse(readFileSync(join(outputDir.dir, 'config.json'), 'utf8')) as ShellConfig;

function locateTarget(game: string): { dir: string; category: string } {
  for (const category of ['arcade', 'consoles', 'computers']) {
    const dir = gameOutputDir(dist, category as never, game);
    if (existsSync(join(dir, 'config.json'))) return { dir, category };
  }
  throw new Error(`${game} is not in ${relative(projectRoot, dist) || '.'}; generate it first (npm run gen -- ${game})`);
}

function parseTitle(text: string): OracleTitle {
  const at = text.indexOf(':');
  return at < 0 ? { cartridge: text } : { software: { list: text.slice(0, at), name: text.slice(at + 1) } };
}

function titleKey(title: OracleTitle | undefined): string {
  if (!title) return option('--scenario') ? `scenario:${option('--scenario')}` : 'machine';
  return 'cartridge' in title ? title.cartridge : `${title.software.list}:${title.software.name}`;
}

const identity = mamekitIdentity();

// --- one run ---------------------------------------------------------------

interface RunRequest {
  title?: OracleTitle;
  frames: number[];
  input: InputMode;
  scenario?: string;
  ram?: RamPlan;
  io?: OraclePlan['io'];
  grade?: boolean;
  audio?: boolean;
}

function readText(path: string): string | undefined {
  return existsSync(path) ? readFileSync(path, 'utf8').trim() : undefined;
}

/** The first line of an error worth reading: its message, not the stack under it. */
function headline(text: string | undefined): string | undefined {
  return text?.split('\n').find(line => line.trim())?.replace(/^(Assertion)?Error( \[[A-Z_]+\])?: /, '').slice(0, 300);
}

async function spawnOurs(planPath: string): Promise<{ status: number | null; output: string }> {
  const [command, args] = politeCommand(process.execPath, [thisFile, '--child', planPath], politeness);
  return new Promise(done => {
    const child = spawn(command, args, { cwd: projectRoot, stdio: ['ignore', 'pipe', 'pipe'] });
    let output = '';
    const keep = (chunk: Buffer) => { output = (output + chunk.toString()).slice(-4000); };
    child.stdout.on('data', keep);
    child.stderr.on('data', keep);
    const timer = setTimeout(() => child.kill('SIGKILL'), timeoutMs);
    child.on('close', (status, signal) => { clearTimeout(timer); done({ status: signal ? null : status, output }); });
  });
}

async function runOne(request: RunRequest, quiet = false): Promise<RunReport> {
  const key = titleKey(request.title);
  const safeKey = key.replace(/[^\w.-]+/g, '_');
  const dir = join(reportRoot, 'work', `${target}-${safeKey}-${process.pid}`);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const last = Math.max(...request.frames, request.ram?.to ?? 0, request.io?.to ?? 0);
  const plan: OraclePlan = {
    target: target!,
    ...(request.title ? { title: request.title } : {}),
    ...(request.scenario ? { scenario: request.scenario } : {}),
    frames: request.frames,
    offsets,
    input: request.input,
    ...(request.ram ? { ram: request.ram } : {}),
    ...(request.io ? { io: request.io } : {}),
    ...(request.grade ? { grade: true } : {}),
    last,
    dir,
    dist,
  };
  const planPath = join(dir, 'plan.json');
  writeFileSync(planPath, `${JSON.stringify(plan, null, 2)}\n`);
  const report: RunReport = {
    ...(request.title ? { title: key } : {}),
    ...(request.scenario ? { scenario: request.scenario } : {}),
    input: request.input,
    checkedAt: new Date().toISOString(),
    mame: mame.version,
    mamekit: identity,
    mameCommand: '',
  };

  // Ours first: it says which cards and empty slots MAME must be given. A
  // failure is run once more: one or two boards in a sweep fail on a given
  // run and pass the next (a stack overflow, a native crash), and a real
  // fault fails the same way twice.
  const attempt = async (): Promise<string | undefined> => {
    for (const name of ['ours-error.txt', 'ours-done.json', 'ours-boot.json']) rmSync(join(dir, name), { force: true });
    const ours = await spawnOurs(planPath);
    return readText(join(dir, 'ours-error.txt')) ?? (ours.status === 0 ? undefined
      : ours.status === null ? `timed out or crashed (limit ${timeoutMs / 1000} s)` : headline(ours.output) ?? `exited ${ours.status}`);
  };
  const firstError = await attempt();
  const oursError = firstError === undefined ? undefined : await attempt();
  const done = readText(join(dir, 'ours-done.json'));
  const bootText = readText(join(dir, 'ours-boot.json'));
  report.ours = {
    frames: done ? (JSON.parse(done) as { frames: number }).frames : 0,
    ...(oursError ? { error: headline(oursError)! } : {}),
    ...(firstError && !oursError ? { retried: headline(firstError)! } : {}),
  };
  if (done) {
    const grade = (JSON.parse(done) as { grade?: RunReport['grade'] }).grade;
    if (grade) report.grade = grade;
  }
  if (!bootText) {
    if (!flag('--keep')) rmSync(dir, { recursive: true, force: true });
    return report;
  }
  const boot = JSON.parse(bootText) as OursBoot;

  const ramOurs = request.ram ? ramFrames(request.ram) : [];
  const frames = mameFrames(plan, ramOurs);
  // A reset sets our board's frame counter back, and the harness then runs its
  // full length again: MAME runs as many frames as ours did.
  writeLuaPlan(join(dir, 'mame-plan.lua'), dir, boot.timeline, frames, { ...plan, last: Math.max(plan.last, report.ours.frames) });
  const args = mameArguments(config, outputDir.category, boot, boot.software, mameSrc, dir, politeness);
  if (request.audio) args.push('-wavwrite', join(dir, 'mame.wav'));
  // What to type to see the same run by hand, less this run's private directories.
  const shown: string[] = [];
  for (let index = 0; index < args.length; index++) {
    if (/^-(nvram|cfg|snapshot)_directory$|^-autoboot_script$|^-wavwrite$/.test(args[index]!)) { index++; continue; }
    shown.push(args[index] === '' ? '""' : /[\s;]/.test(args[index]!) ? `'${args[index]}'` : args[index]!);
  }
  report.mameCommand = `$MAME_BIN ${shown.join(' ')}`;
  const ran = await runMame(mame.binary, args, dir, politeness, timeoutMs);
  const mameError = readText(join(dir, 'mame-error.txt')) ??
    (existsSync(join(dir, 'mame-done.txt')) ? undefined : `MAME exited ${ran.status}: ${ran.output.trim().split('\n').slice(-2).join(' | ')}`);
  if (mameError) report.mameError = mameError.slice(0, 400);

  const imageDir = join(reportRoot, target!, safeKey);
  const pictures = comparePictures(dir, request.frames, offsets, boot);
  if (pictures.results.some(result => result.pixels !== undefined || result.size)) {
    mkdirSync(imageDir, { recursive: true });
    const images: string[] = [];
    for (const frame of request.frames) {
      const { mame: left, ours: right } = pictures.pictures.get(frame) ?? {};
      if (!left || !right) continue;
      const path = join(imageDir, `frame-${frame}.png`);
      writePng(path, sideBySide(left, right));
      images.push(relative(projectRoot, path));
    }
    const exact = pictures.results.filter(result => result.pixels === 0).map(result => result.frame);
    const diverged = pictures.results.find(result => result.pixels !== 0);
    report.pixels = {
      offset: pictures.offset,
      tied: pictures.tied,
      frames: pictures.results,
      exact,
      ...(diverged ? { firstDivergence: diverged.frame } : {}),
      images,
    };
  }
  if (request.ram) report.ram = compareRam(dir, request.ram, ramOurs, frames.ram, offsets, request.frames);
  if (request.io) report.io = compareIo(dir);
  const inputs = compareInputs(dir, boot.timeline.inputs, report.ours.frames);
  if (inputs) report.inputs = inputs;
  if (request.audio) {
    const audio = compareAudio(dir, imageDir);
    if ('error' in audio) report.audioError = audio.error;
    else report.audio = audio;
  }
  if (!quiet) printRun(key, report);
  if (flag('--keep')) {
    if (!quiet) console.log(`  captures kept in ${relative(projectRoot, dir)}`);
  } else {
    rmSync(dir, { recursive: true, force: true });
  }
  return report;
}

/**
 * Ours against MAME's -wavwrite with tools/compare-audio.mjs, the measure the
 * audio comparison prints; its spectrogram lands beside the frame PNGs. Ours
 * is the harness's capture of what reaches the browser's output.
 */
function compareAudio(dir: string, outDir: string): AudioComparison | { error: string } {
  const ours = join(dir, 'ours.pcm');
  const mameWav = join(dir, 'mame.wav');
  if (!existsSync(ours) || !existsSync(mameWav)) return { error: `no ${existsSync(ours) ? 'MAME' : 'our'} recording` };
  mkdirSync(outDir, { recursive: true });
  rmSync(join(outDir, 'compare.json'), { force: true });
  const compared = spawnSync(process.execPath, [join(projectRoot, 'tools/compare-audio.mjs'), ours, mameWav, outDir],
    { cwd: projectRoot, encoding: 'utf8' });
  const result = join(outDir, 'compare.json');
  if (compared.status !== 0 || !existsSync(result)) {
    return { error: `compare-audio failed: ${(compared.stderr || compared.stdout).trim().split('\n').at(-1) ?? compared.status}` };
  }
  return JSON.parse(readFileSync(result, 'utf8')) as AudioComparison;
}

function printRun(key: string, report: RunReport): void {
  console.log(`${target} ${key} (input ${report.input})`);
  if (report.ours?.error) console.log(`  ours: ${report.ours.error} (after ${report.ours.frames} frames)`);
  if (report.ours?.retried) console.log(`  ours failed once and passed on a retry: ${report.ours.retried}`);
  if (report.mameError) console.log(`  MAME: ${report.mameError}`);
  if (report.pixels) {
    const frames = report.pixels.frames.map(result =>
      `${result.frame}: ${result.size ? `size ${result.size}` : result.pixels === undefined ? '-' : result.pixels}`).join('  ');
    const tied = report.pixels.tied.length > 1 ? `, as good at ${report.pixels.tied.map(signed).join(' ')}` : '';
    console.log(`  pixels (MAME frame = ours ${signed(report.pixels.offset)}${tied}): ${frames}`);
    for (const image of report.pixels.images) console.log(`    ${image}`);
  }
  if (report.ram) {
    const first = report.ram.firstDivergence;
    console.log(`  RAM (${report.ram.bytesPerFrame} bytes, MAME frame = ours ${signed(report.ram.offset)}): ` +
      (first ? `first differs at frame ${first.frame} (MAME ${first.mame}), ${first.bytes} bytes: ` +
        first.addresses.slice(0, 12).map(entry => `${entry.cpu}:${entry.address} ${hex(entry.mame)}/${hex(entry.ours)}`).join(' ')
        : report.ram.compared === 0 ? 'nothing compared (a side wrote no RAM)'
        : `identical at all ${report.ram.compared} frames compared`));
    const late = comparedFrames.filter(frame => report.ram!.differing[frame] !== undefined)
      .map(frame => `@${frame}: ${report.ram!.differing[frame]}`).join('  ');
    if (late) console.log(`    differing bytes ${late}`);
    const nearest = comparedFrames.filter(frame => report.ram!.nearest[frame])
      .map(frame => `@${frame}: ${report.ram!.nearest[frame]!.bytes} (${signed(report.ram!.nearest[frame]!.offset)})`).join('  ');
    if (nearest) console.log(`    nearest per frame ${nearest}`);
  }
  if (report.inputs) {
    const first = report.inputs.firstDivergence;
    console.log(`  inputs (${report.inputs.inputs}, ${report.inputs.frames} frames): ` + (first
      ? `MAME read differently on ${report.inputs.differing} frames, first at ${first.frame}: ` +
        `${first.port} 0x${first.mask.toString(16)} MAME ${hex(first.mame)} / ours ${hex(first.ours)}`
      : 'MAME read what ours read on every frame'));
  }
  if (report.audio) {
    const { rms, bands, onsets } = report.audio;
    console.log(`  audio (${report.audio.seconds.toFixed(1)} s): ours/MAME ${rms.ratioDb.toFixed(1)} dB, ` +
      `bands ${bands.map(band => `${band.diffDb >= 0 ? '+' : ''}${band.diffDb.toFixed(1)}`).join(' ')} dB, ` +
      `onsets ${onsets.ours.toFixed(2)}/${onsets.ref.toFixed(2)} a second`);
  }
  if (report.audioError) console.log(`  audio: ${report.audioError}`);
  if (report.io) {
    const first = report.io.firstDivergence;
    console.log(`  I/O: ${report.io.mame} MAME / ${report.io.ours} ours accesses; ` + (first
      ? `first differs at #${first.index}: MAME ${access(first.mame)} vs ours ${access(first.ours)}`
      : 'identical'));
  }
}

const signed = (value: number) => `${value >= 0 ? '+' : ''}${value}`;
const hex = (value: number) => value.toString(16).padStart(2, '0');
const access = (entry: { frame: number; kind: string; address: string; data: string; time?: number } | undefined) =>
  entry ? `${entry.kind} ${entry.address}=${entry.data} (frame ${entry.frame}`
    + `${entry.time === undefined ? '' : `, ${(entry.time * 1e6).toFixed(3)} us`})` : 'nothing';

// --- the report file -------------------------------------------------------

interface OracleReport extends OracleReportFile {
  runs: Record<string, RunReport>;
  survey?: { frame: number; input: InputMode; checkedAt: string; mame: string; titles: Record<string, SurveyEntry> };
}

const reportPath = oracleReportPath(projectRoot, target);

function loadReport(): OracleReport {
  try {
    return JSON.parse(readFileSync(reportPath, 'utf8')) as OracleReport;
  } catch {
    return { target: target!, runs: {} };
  }
}

/** Written whole through a rename, so a stopped survey never leaves half a file. */
function saveReport(report: OracleReport): void {
  mkdirSync(reportRoot, { recursive: true });
  writeFileSync(`${reportPath}.tmp`, `${JSON.stringify(report, null, 2)}\n`);
  renameSync(`${reportPath}.tmp`, reportPath);
  // The exhibit's own copy, so the served page shows this run without a
  // regeneration (generation writes the same file: src/gen/oracle-result.ts).
  refreshOracleResult(outputDir.dir, reportPath, mame.version);
}

// --- requests from the options ---------------------------------------------

function ramRequest(): RamPlan | undefined {
  if (!flag('--ram')) return undefined;
  const given = (options.get('--ram') ?? []).filter(Boolean).map(parseRanges);
  const cpus = given.length ? given : boardRam(config);
  if (!cpus.length) throw new Error(`${target}'s generated board maps no RAM ranges; name them: --ram <cpu>:<start>-<end>`);
  const [range, every] = (option('--ram-frames') ?? `1-${comparedFrames.at(-1)}`).split('/');
  const [from, to] = range!.split('-').map(Number);
  return { cpus, from: from!, to: to ?? from!, every: Number(every ?? 1) };
}

function ioRequest(): OraclePlan['io'] {
  const specs = options.get('--io');
  if (!specs) return undefined;
  const window = option('--io-frames');
  if (!window) throw new Error('--io needs --io-frames <from>-<to>: a tap logs every access, so keep the window short');
  const [from, to] = window.split('-').map(Number);
  const taps = specs.map(spec => {
    const [tag, range, mode = 'rw'] = spec.split(/:(?=[0-9a-f]+-|[rw]+$)/i);
    const [lo, hi] = range!.split('-').map(value => parseInt(value, 16));
    return { tag: tag!, lo: lo!, hi: hi ?? lo!, read: mode.includes('r'), write: mode.includes('w') };
  });
  return { taps, from: from!, to: to ?? from! };
}

// --- survey ----------------------------------------------------------------

function surveyTitles(): { board: string; title: string }[] {
  const catalogUrl = config.cart?.catalogUrl ?? 'softlist.json';
  const catalogPath = join(outputDir.dir, catalogUrl);
  if (!existsSync(catalogPath)) throw new Error(`${target} has no cartridge catalogue to survey`);
  const catalog = JSON.parse(readFileSync(catalogPath, 'utf8')) as { entries: { name: string; slot?: string }[] };
  const dumps = join(romsDir(projectRoot), outputDir.category, target!);
  return pickSurveyTitles(catalog.entries, name => existsSync(join(dumps, `${name}.zip`)));
}

async function survey(): Promise<void> {
  const frame = comparedFrames.at(-1) === 600 && !option('--frames') ? 1500 : comparedFrames.at(-1)!;
  const input = (option('--input') ?? 'start') as InputMode;
  let titles = surveyTitles();
  if (option('--limit')) titles = titles.slice(0, Number(option('--limit')));
  const report = loadReport();
  const fresh = flag('--fresh') || report.survey?.frame !== frame || report.survey.input !== input;
  report.survey = {
    frame, input, checkedAt: new Date().toISOString(), mame: mame.version,
    titles: fresh ? {} : report.survey!.titles,
  };
  const pending = titles.filter(({ board }) => report.survey!.titles[board]?.mamekit !== identity.commit);
  console.log(`${target}: ${titles.length} boards with a local dump, ${pending.length} to run ` +
    `(frame ${frame}, input ${input}, ${Number(option('--jobs') ?? 1)} at a time)`);
  let next = 0;
  const worker = async () => {
    while (next < pending.length) {
      const { board, title } = pending[next++]!;
      const run = await runOne({ title: { cartridge: title }, frames: [frame], input, grade: true }, true);
      const verdict = gradeRun(run);
      const entry: SurveyEntry = {
        board, title, ...verdict, mamekit: identity.commit,
        ...(run.pixels?.frames[0]?.pixels !== undefined ? { pixels: run.pixels.frames[0].pixels, offset: run.pixels.offset } : {}),
        ...(run.pixels?.images[0] ? { image: run.pixels.images[0] } : {}),
      };
      report.survey!.titles[board] = entry;
      saveReport(report);
      console.log(`  ${board.padEnd(14)} ${title.padEnd(12)} ${verdict.cause}` +
        (entry.pixels !== undefined ? ` ${entry.pixels} px` : '') + (verdict.detail ? `  ${verdict.detail.slice(0, 120)}` : ''));
    }
  };
  await Promise.all(Array.from({ length: Math.max(1, Number(option('--jobs') ?? 1)) }, worker));
  printSurvey(report.survey);
}

function printSurvey(result: NonNullable<OracleReport['survey']>): void {
  const entries = Object.values(result.titles);
  console.log(`\n${target} survey at frame ${result.frame}, ${entries.length} boards:`);
  for (const [key, list] of surveyGroups(entries)) {
    console.log(`  ${String(list.length).padStart(4)}  ${key.slice(0, 160)}`);
    if (key !== 'exact') console.log(`        ${list.slice(0, 12).map(entry => `${entry.board}/${entry.title}`).join(' ')}${list.length > 12 ? ' …' : ''}`);
  }
  console.log(`report: ${relative(projectRoot, reportPath)}`);
}

// --- main ------------------------------------------------------------------

if (flag('--survey')) {
  await survey();
} else {
  const titles: (OracleTitle | undefined)[] = option('--titles')
    ? option('--titles')!.split(',').map(parseTitle)
    : [titleArg ? parseTitle(titleArg) : undefined];
  const report = loadReport();
  const runs: Record<string, RunReport> = {};
  for (const title of titles) {
    // A console title gets Start presses; a computer title starts the way
    // its shelf does (typed command, PLAY) and a machine runs untouched.
    const input = (option('--input') ?? (title && outputDir.category === 'consoles' ? 'start' : 'none')) as InputMode;
    const run = await runOne({
      ...(title ? { title } : {}),
      frames: comparedFrames,
      input,
      ...(option('--scenario') ? { scenario: option('--scenario')! } : {}),
      ...(flag('--ram') ? { ram: ramRequest()! } : {}),
      ...(options.has('--io') ? { io: ioRequest()! } : {}),
      ...(flag('--audio') ? { audio: true } : {}),
    });
    report.runs[titleKey(title)] = run;
    runs[titleKey(title)] = run;
    saveReport(report);
  }
  if (option('--out')) writeFileSync(resolve(option('--out')!), `${JSON.stringify(runs, null, 2)}\n`);
  console.log(`report: ${relative(projectRoot, reportPath)}`);
}
