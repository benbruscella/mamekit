/**
 * The first bus access at which a generated machine leaves MAME, per
 * processor, found without being told where to look.
 *
 *   mamekit diverge <target> [<title>] [options]
 *
 *   --frames a-b         tap these frames instead of finding them from RAM
 *   --until N            how far the RAM search runs (default 1800 frames)
 *   --input none|start|contract, --scenario <id>
 *                        the run's input, as `mamekit against` takes them
 *   --io cpu:a-b[:rw]    tap these ranges instead of the board's own (repeatable, hex)
 *   --show               print the ranges it would tap, and stop
 *   --context N          agreed accesses printed before each difference (default 6)
 *   --list all|<cpu>     print every tapped access of the window, MAME's and ours
 *                        paired in order with both times and the cycles between
 *                        them, for every processor or the one named
 *   --around N           with --list, only the accesses within N of one that
 *                        differs, or that is more than two cycles apart in time
 *
 * Both sides' access logs are kept in .cache/compare/diverge/<target>/
 * (mame-io.txt, ours-io.txt: `frame kind tap address data seconds`).
 *
 * Which ranges: read from the generated board's address maps
 * (diverge-plan.ts). On a board of several processors, every device more than
 * one of them reaches (latches, sound chips, shared RAM devices), every share
 * more than one maps, and every control register (bank, latch, reset, IRQ,
 * NMI, acknowledge, sound command); on a board of one, every device handler
 * and control register. Mirrors are tapped too.
 *
 * Which frames: one `mamekit against --ram` run gives the first frame whose
 * RAM differs from MAME's (MAME's side from the cache when it has run
 * before). The frames up to it are tapped on both sides; when the first
 * differing access is in the window's first frame, the cause may be earlier,
 * so the window is widened back, doubling, up to three times.
 *
 * What it prints: per processor, the first access that differs in kind,
 * address or value, or in time by more than two of its cycles, with the
 * accesses before it that both sides agree on; then which processor left
 * MAME first.
 */

import { spawn } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { join, relative } from 'node:path';
import { gameOutputDir } from '../../src/gen/output-layout.ts';
import type { ShellConfig } from '../../src/runtime/shell.ts';
import { readAccesses, type IoAccess } from './compare.ts';
import { compareByCpu, divergeRanges, earliest, pairAccesses, TIME_TOLERANCE_CYCLES, type CpuDivergence, type DivergeTap } from './diverge-plan.ts';
import { projectRoot } from './mame-side.ts';
import { parseIoTap } from './plan.ts';
import { cliEntry, reportRoot } from './paths.ts';
import type { RunReport } from './report.ts';

const argv = process.argv.slice(2);
const valued = new Set(['--frames', '--until', '--input', '--scenario', '--io', '--context', '--list', '--around', '--dist']);
const positional: string[] = [];
const options = new Map<string, string[]>();
for (let index = 0; index < argv.length; index++) {
  const arg = argv[index]!;
  if (!arg.startsWith('--')) { positional.push(arg); continue; }
  options.set(arg, [...options.get(arg) ?? [], valued.has(arg) ? argv[++index]! : '']);
}
const option = (name: string) => options.get(name)?.at(-1);
const [target, title] = positional;
if (!target) {
  console.error('usage: mamekit diverge <target> [<title>] [--frames a-b] [--until N] [--input none|start|contract] [--show]');
  process.exit(2);
}

const dist = join(projectRoot, option('--dist') ?? 'dist');
function loadConfig(): ShellConfig {
  for (const category of ['arcade', 'consoles', 'computers']) {
    const path = join(gameOutputDir(dist, category as never, target!), 'config.json');
    if (existsSync(path)) return JSON.parse(readFileSync(path, 'utf8')) as ShellConfig;
  }
  throw new Error(`${target} is not generated in ${relative(projectRoot, dist) || '.'}`);
}
const config = loadConfig();

const taps: DivergeTap[] = options.has('--io')
  ? options.get('--io')!.map(spec => {
    const { tag, space, lo, hi } = parseIoTap(spec);
    return { tag, ...(space ? { space } : {}), lo, hi, why: ['named'] };
  })
  : divergeRanges(config);
const hex = (value: number) => value.toString(16);
console.log(`${target}: tapping ${taps.length} ranges on ${new Set(taps.map(tap => tap.tag)).size} processors`);
const where = (tap: DivergeTap) => `${tap.tag}${tap.space ? `:${tap.space}` : ''}`;
for (const tap of taps) console.log(`  ${where(tap).padEnd(12)} ${hex(tap.lo)}-${hex(tap.hi)}  ${tap.why.join(', ')}`);
if (options.has('--show')) process.exit(0);
if (!taps.length) {
  console.error(`${target}'s maps name no device or control register to tap; name ranges with --io <cpu>:<start>-<end>`);
  process.exit(2);
}

// --- running `mamekit against` --------------------------------------------

const scratch = join(reportRoot, 'diverge', target);
mkdirSync(scratch, { recursive: true });
const shared = [
  ...(title ? [title] : []),
  ...(option('--input') ? ['--input', option('--input')!] : []),
  ...(option('--scenario') ? ['--scenario', option('--scenario')!] : []),
  ...(option('--dist') ? ['--dist', option('--dist')!] : []),
];

function against(args: string[], name: string): Promise<RunReport> {
  const out = join(scratch, `${name}.json`);
  rmSync(out, { force: true });
  return new Promise((done, fail) => {
    const child = spawn(process.execPath, [cliEntry, 'against', target!, ...shared, ...args, '--out', out],
      { cwd: projectRoot, stdio: ['ignore', 'pipe', 'pipe'] });
    let output = '';
    child.stdout.on('data', chunk => { output += chunk; });
    child.stderr.on('data', chunk => { output += chunk; });
    child.on('close', status => {
      if (!existsSync(out)) {
        fail(new Error(`mamekit against exited ${status}: ${output.trim().split('\n').slice(-3).join(' | ')}`));
        return;
      }
      const runs = Object.values(JSON.parse(readFileSync(out, 'utf8')) as Record<string, RunReport>);
      done(runs[0]!);
    });
  });
}

function failure(run: RunReport): string | undefined {
  return run.ours?.error ? `ours: ${run.ours.error}` : run.mameError ? `MAME: ${run.mameError}` : undefined;
}

// --- which frames ------------------------------------------------------------

let window: { from: number; to: number; offset: number };
if (option('--frames')) {
  const [from, to] = option('--frames')!.split('-').map(Number);
  window = { from: from!, to: to ?? from!, offset: 0 };
} else {
  const until = Number(option('--until') ?? 1800);
  console.log(`\nfinding the first frame whose RAM differs (to frame ${until})...`);
  const ram = await against(['--ram', '--ram-frames', `1-${until}`, '--frames', String(until)], 'ram');
  if (failure(ram)) throw new Error(failure(ram));
  const first = ram.ram?.firstDivergence;
  if (!first) {
    console.log(`RAM is MAME's at every frame to ${until}${ram.mameCached ? " (MAME's side from the cache)" : ''}. ` +
      'Name a window to tap anyway: --frames a-b, or search further: --until N');
    process.exit(0);
  }
  console.log(`RAM first differs at our frame ${first.frame} (MAME ${first.mame}), ${first.bytes} bytes: ` +
    first.addresses.slice(0, 6).map(entry => `${entry.cpu}:${entry.address}`).join(' '));
  window = { from: Math.max(1, first.frame - 2), to: first.frame, offset: first.mame - first.frame };
}

// --- tapping -----------------------------------------------------------------

const clocks = Object.fromEntries(config.board.cpus.map(cpu => [cpu.tag, Number((cpu as { clock?: number }).clock ?? 0)]));
const ioArgs = taps.flatMap(tap => ['--io', `${where(tap)}:${hex(tap.lo)}-${hex(tap.hi)}:rw`]);

async function tapWindow(from: number, to: number, offset: number): Promise<{ result: CpuDivergence[]; mame: IoAccess[]; ours: IoAccess[] }> {
  const run = await against([...ioArgs, '--io-frames', `${from}-${to}`, ...(offset ? ['--io-offset', String(offset)] : []),
    '--frames', String(to), '--keep'], `io-${from}-${to}`);
  if (failure(run)) throw new Error(failure(run));
  if (!run.workDir) throw new Error('mamekit against kept no captures');
  const mame = readAccesses(join(run.workDir, 'mame-io.txt'));
  const ours = readAccesses(join(run.workDir, 'ours-io.txt'));
  for (const name of ['mame-io.txt', 'ours-io.txt']) {
    if (existsSync(join(run.workDir, name))) copyFileSync(join(run.workDir, name), join(scratch, name));
  }
  rmSync(run.workDir, { recursive: true, force: true });
  return { result: compareByCpu(mame, ours, taps, clocks, Number(option('--context') ?? 6)), mame, ours };
}

let tapped = await tapWindow(window.from, window.to, window.offset);
for (let widen = 0; widen < 3 && !option('--frames'); widen++) {
  const first = earliest(tapped.result)?.first;
  const frame = first?.ours?.frame ?? first?.mame?.frame;
  if (window.from <= 1 || frame === undefined || frame > window.from) break;
  const length = window.to - window.from + 1;
  window = { ...window, from: Math.max(1, window.from - length * 2) };
  console.log(`the first difference is in the window's first frame; widening back to frame ${window.from}...`);
  tapped = await tapWindow(window.from, window.to, window.offset);
}

// --- the result ---------------------------------------------------------------

const signedCycles = (cycles: number) => `${cycles > 0 ? '+' : ''}${cycles}`;

const access = (entry: IoAccess | undefined) => entry
  ? `${entry.kind} ${entry.address}=${entry.data} (frame ${entry.frame}${entry.time === undefined ? '' : `, ${(entry.time * 1e6).toFixed(3)} us`})`
  : 'nothing';
console.log(`\nframes ${window.from}-${window.to} (MAME's ${window.from + window.offset}-${window.to + window.offset}): ` +
  `${tapped.mame.length} MAME / ${tapped.ours.length} ours accesses`);
for (const cpu of tapped.result) {
  if (!cpu.first) {
    console.log(`  ${cpu.tag}: identical, ${cpu.mame} accesses`);
    continue;
  }
  const { first } = cpu;
  const why = first.reason === 'time' ? `${first.cycles} cycles late` : first.reason === 'missing' ? 'one side stops' : 'differs';
  console.log(`  ${cpu.tag}: access #${first.index} ${why}` + (first.cycles !== undefined && first.reason !== 'time' ? ` (${first.cycles} cycles apart)` : ''));
  console.log(`    MAME ${access(first.mame)}`);
  console.log(`    ours ${access(first.ours)}`);
  if (first.before.length) {
    console.log('    before, agreed:');
    for (const entry of first.before) console.log(`      ${access(entry)}`);
  }
}
const listing = option('--list');
if (listing) {
  const tags = listing === 'all' ? tapped.result.map(cpu => cpu.tag) : [listing];
  for (const tag of tags) {
    if (!taps.some(tap => tap.tag === tag)) throw new Error(`--list ${tag}: no range on ${tag} is tapped`);
    const rows = pairAccesses(tapped.mame, tapped.ours, taps, clocks, tag);
    console.log(`\n${tag}: every access, MAME | ours | cycles ours is later`);
    const side = (entry: IoAccess | undefined) => entry
      ? `${entry.kind} ${entry.address}=${entry.data} f${entry.frame}${entry.time === undefined ? '' : ` ${(entry.time * 1e6).toFixed(3)}`}`
      : '-';
    const around = option('--around') === undefined ? Infinity : Number(option('--around'));
    const marked = rows.flatMap(row => row.differs || Math.abs(row.cycles ?? 0) > TIME_TOLERANCE_CYCLES ? [row.index] : []);
    const near = (index: number) => around === Infinity || marked.some(at => Math.abs(at - index) <= around);
    let skipped = false;
    for (const row of rows) {
      if (!near(row.index)) { skipped = true; continue; }
      if (skipped) console.log('     ...');
      skipped = false;
      console.log(`  ${row.differs ? '*' : ' '}${String(row.index).padStart(5)}  ${side(row.mame).padEnd(36)} ${side(row.ours).padEnd(36)} ` +
        (row.cycles === undefined ? '' : signedCycles(row.cycles)));
    }
  }
}
console.log(`\naccess logs: ${relative(projectRoot, scratch)}/mame-io.txt, ours-io.txt`);
const lead = earliest(tapped.result);
console.log(lead
  ? `\n${lead.tag} leaves MAME first: ${access(lead.first!.mame ?? lead.first!.ours)}`
  : '\nno processor\'s tapped traffic differs from MAME\'s in this window');
