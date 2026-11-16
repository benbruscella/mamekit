/**
 * Every acceptance contract run, and each one's result classified by what
 * moved: a golden mismatch and a silent board no longer both read as FAIL.
 *
 *   mamekit sweep [<target>|<target>:<scenario> ...] [options]
 *
 *   --jobs N        contracts at once (default 4)
 *   --candidates    the candidate contracts too
 *   --timeout M     minutes before a contract is stopped (default 8)
 *
 * Each contract runs in its own process through the acceptance harness in
 * recording mode, and its fingerprints are set against its golden
 * (sweep-plan.ts): failed, video changed, state changed, audio changed (write
 * count or level), stamps only (the same writes and level landing at other
 * times), ROM regions, or unchanged, with the write-count and level swing.
 * The fps floors are reported, never failed on: several contracts share the
 * machine. A contract that dies on a signal or a timeout runs once more.
 *
 * It writes .mamekit/sweep/<started>/progress.txt as it goes (one line per
 * contract) and results.json at the end, prints a command that watches the
 * progress file, and exits 1 when any contract is not unchanged.
 */

import { spawn } from 'node:child_process';
import { appendFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadCandidateGameContracts, loadGameContracts } from '../../src/games/contracts.ts';
import { projectRoot } from './mame-side.ts';
import { localRoot } from './paths.ts';
import { classify, describe, SWEEP_CLASSES, type SweepRun, type SweepVerdict } from './sweep-plan.ts';

const argv = process.argv.slice(2);
const valued = new Set(['--jobs', '--timeout']);
const names: string[] = [];
const options = new Map<string, string>();
for (let index = 0; index < argv.length; index++) {
  const arg = argv[index]!;
  if (!arg.startsWith('--')) names.push(arg);
  else options.set(arg, valued.has(arg) ? argv[++index]! : '');
}
const jobs = Math.max(1, Number(options.get('--jobs') ?? 4));
const timeoutMs = Number(options.get('--timeout') ?? 8) * 60_000;

const keyOf = (contract: { game: string; scenarioId?: string }) => contract.scenarioId ? `${contract.game}:${contract.scenarioId}` : contract.game;
const contracts = [...await loadGameContracts(), ...(options.has('--candidates') ? await loadCandidateGameContracts() : [])];
const all = contracts.map(keyOf);
const unknown = names.filter(name => !all.includes(name) && !contracts.some(contract => contract.game === name));
if (unknown.length) throw new Error(`no contract ${unknown.join(', ')}`);
const keys = names.length ? contracts.filter(contract => names.includes(keyOf(contract)) || names.includes(contract.game)).map(keyOf) : all;

const started = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const dir = join(localRoot, 'sweep', started);
mkdirSync(join(dir, 'runs'), { recursive: true });
const progress = join(dir, 'progress.txt');
writeFileSync(progress, '');
writeFileSync(join(dir, 'total.txt'), `${keys.length}\n`);

console.log(`sweeping ${keys.length} contracts, ${jobs} at a time; progress in ${progress}`);
console.log('watch it with:\n');
console.log(`  while true; do clear; f='${progress}'; echo "$(grep -c . "$f")/${keys.length} done"; ` +
  `grep -v '^UNCHANGED' "$f"; sleep 5; done\n`);

function runChild(key: string): Promise<SweepRun> {
  const out = join(dir, 'runs', `${key.replace(/[^\w.-]+/g, '_')}.json`);
  rmSync(out, { force: true });
  return new Promise(done => {
    const child = spawn(process.execPath, [join(projectRoot, 'tools/compare/sweep-child.ts'), key, out],
      { cwd: projectRoot, stdio: ['ignore', 'pipe', 'pipe'] });
    let tail = '';
    const keep = (chunk: Buffer) => { tail = (tail + chunk.toString()).slice(-2000); };
    child.stdout.on('data', keep);
    child.stderr.on('data', keep);
    let timedOut = false;
    const timer = setTimeout(() => { timedOut = true; child.kill('SIGKILL'); }, timeoutMs);
    const began = Date.now();
    child.on('close', (status, signal) => {
      clearTimeout(timer);
      if (existsSync(out)) { done(JSON.parse(readFileSync(out, 'utf8')) as SweepRun); return; }
      const why = timedOut ? `no result after ${timeoutMs / 60_000} minutes`
        : signal ? `killed by ${signal}` : `exited ${status}: ${tail.trim().split('\n').slice(-2).join(' | ')}`;
      done({ key, error: why, durationMs: Date.now() - began, ...(signal || timedOut ? { crashed: true } : {}) });
    });
  });
}

const verdicts: SweepVerdict[] = [];
let next = 0;
const worker = async () => {
  while (next < keys.length) {
    const key = keys[next++]!;
    let run = await runChild(key);
    // A native crash or a stuck child is run once more; a deterministic
    // failure fails the same way twice and is not worth the time.
    if (run.crashed) run = await runChild(key);
    const verdict = classify(run);
    verdicts.push(verdict);
    appendFileSync(progress, `${describe(verdict)}  (${(run.durationMs / 1000).toFixed(0)} s` +
      `${run.emulatedFps !== undefined ? `, ${run.emulatedFps.toFixed(0)} fps` : ''})\n`);
  }
};
await Promise.all(Array.from({ length: Math.min(jobs, keys.length) }, worker));

const ordered = [...verdicts].sort((left, right) =>
  SWEEP_CLASSES.indexOf(left.class) - SWEEP_CLASSES.indexOf(right.class) || keys.indexOf(left.key) - keys.indexOf(right.key));
writeFileSync(join(dir, 'results.json'), `${JSON.stringify({ started, keys, verdicts: ordered }, null, 2)}\n`);
console.log('');
for (const verdict of ordered.filter(entry => entry.class !== 'unchanged')) console.log(describe(verdict));
const counts = SWEEP_CLASSES.map(name => [name, ordered.filter(entry => entry.class === name).length] as const).filter(([, count]) => count);
console.log(`\n${keys.length} contracts: ${counts.map(([name, count]) => `${count} ${name}`).join(', ')}`);
console.log(`results: ${join(dir, 'results.json')}`);
if (ordered.some(entry => entry.class !== 'unchanged')) process.exitCode = 1;
