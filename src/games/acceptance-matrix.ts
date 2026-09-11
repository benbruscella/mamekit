/** Complete, non-fail-fast real-ROM acceptance runner. */

import { spawn } from 'node:child_process';
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGameContracts } from './contracts.ts';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

interface AcceptanceResult {
  target: string;
  status: 'passed' | 'failed';
  durationMs: number;
  attempts: number;
  signal?: string;
  /** The contract stopped answering and was killed; see TARGET_TIMEOUT_MS. */
  timedOut?: boolean;
  detail?: string;
}

/**
 * The longest any one contract may take before it is treated as stuck.
 *
 * The slowest accepted contract runs a couple of thousand frames and lands
 * well inside a minute and a half, hosted runner included. Without a cap a
 * child that never exits takes the whole run down with it: the job sits
 * silent for the rest of its hour, GitHub kills it for time, and nothing in
 * the log says which contract stopped. Five minutes is several times the
 * slowest and still leaves the run its budget.
 */
const TARGET_TIMEOUT_MS = 5 * 60_000;

/** Grace between asking a stuck child to stop and insisting. */
const KILL_GRACE_MS = 5_000;

interface AcceptanceReport {
  schemaVersion: 1;
  commit: string;
  generatedAt: string;
  passed: number;
  failed: number;
  results: AcceptanceResult[];
}

function contractKey(contract: { game: string; scenarioId?: string }): string {
  return contract.scenarioId ? `${contract.game}:${contract.scenarioId}` : contract.game;
}

function git(args: string[]): string {
  return execFileSync('git', args, { cwd: projectRoot, encoding: 'utf8' }).trim();
}

function runOne(target: string, attempt: number): Promise<AcceptanceResult> {
  const started = Date.now();
  return new Promise(resolveRun => {
    const child = spawn(process.execPath, ['src/games/acceptance.ts', target], {
      cwd: projectRoot,
      env: process.env,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let output = '';
    let timedOut = false;
    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', chunk => { output += chunk; });
    child.stderr.on('data', chunk => { output += chunk; });
    child.once('error', error => { output += `${error.stack ?? error.message}\n`; });
    // A contract that stops answering is killed and reported by name, rather
    // than left to run the whole job out of time in silence.
    const insist = setTimeout(() => { child.kill('SIGKILL'); }, TARGET_TIMEOUT_MS + KILL_GRACE_MS);
    const stop = setTimeout(() => {
      timedOut = true;
      output += `no result after ${TARGET_TIMEOUT_MS / 1000}s; stopping it\n`;
      child.kill('SIGTERM');
    }, TARGET_TIMEOUT_MS);
    child.once('close', (code, signal) => {
      clearTimeout(stop);
      clearTimeout(insist);
      const status = code === 0 && !timedOut ? 'passed' as const : 'failed' as const;
      resolveRun({
        target,
        status,
        durationMs: Date.now() - started,
        attempts: attempt,
        ...(signal && !timedOut ? { signal } : {}),
        ...(timedOut ? { timedOut: true } : {}),
        ...(status === 'failed'
          ? { detail: `${signal && !timedOut ? `signal ${signal}\n` : ''}${output.trimEnd()}` }
          : {}),
      });
    });
  });
}

/**
 * The fps floor is a measurement of a shared machine, not an assertion about
 * the emulation. The harness checks behaviour first and throughput second, so
 * reaching this failure means the goldens already matched and only the hosted
 * runner was slow: sf2ce clears its 50 fps floor at about 52, and a runner
 * having a bad ten percent puts it under. Retrying cannot hide a behavioural
 * regression, and a real throughput regression fails the retry too.
 */
function throughputFailure(result: AcceptanceResult): boolean {
  return /fps is below the .* acceptance floor/.test(result.detail ?? '');
}

async function runTarget(target: string): Promise<AcceptanceResult> {
  let result = await runOne(target, 1);
  // macOS can occasionally terminate a large generated Node module during
  // rapid process churn, and a machine that stops answering is the same kind
  // of accident. Retry those and a missed fps floor; deterministic assertion
  // failures about behaviour remain single-shot and visible.
  if (result.status === 'failed'
    && (result.signal || result.timedOut || throughputFailure(result))) {
    const reason = result.signal ?? (result.timedOut ? 'no result in time' : 'a missed fps floor');
    console.warn(`RETRY ${target} after ${reason}`);
    await new Promise(resolveWait => setTimeout(resolveWait, 10_000));
    result = await runOne(target, 2);
  }
  return result;
}

function option(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

/**
 * `--shard 2/4` runs one quarter of the contracts, so the gate can be split
 * across runners instead of one runner spending half an hour on it.
 *
 * Sharding is across machines, never within one: every contract asserts an
 * emulated-fps floor measured against wall clock, so two contracts sharing a
 * runner's cores would drag each other under their floors and fail for load
 * rather than for behaviour.
 *
 * Shards interleave the list rather than slicing it into blocks. The heavy
 * boards cluster by name (sf2, sf2ce) and a block split would land them on one
 * runner while another idles.
 */
function shardOf(targets: string[], spec: string | undefined): string[] {
  if (!spec) return targets;
  const [index, count] = spec.split('/').map(Number);
  if (!Number.isInteger(index) || !Number.isInteger(count)
    || count < 1 || index < 1 || index > count) {
    throw new Error(`--shard expects i/n with 1 <= i <= n, got "${spec}"`);
  }
  return targets.filter((_, position) => position % count === index - 1);
}

const allTargets = (await loadGameContracts()).map(contractKey);
const requested = (process.env.MAMEKIT_ACCEPTANCE_GAMES ?? '')
  .split(',').map(value => value.trim()).filter(Boolean);
const selected = requested.length ? requested : allTargets;
const unknown = selected.filter(target => !allTargets.includes(target));
if (unknown.length) throw new Error(`unknown accepted contract(s): ${unknown.join(', ')}`);
const shard = option('--shard');
const targets = shardOf(selected, shard);
if (shard) console.log(`shard ${shard}: ${targets.length} of ${selected.length} contracts`);

const commit = git(['rev-parse', 'HEAD']);

const results: AcceptanceResult[] = [];
for (const [index, target] of targets.entries()) {
  const result = await runTarget(target);
  results.push(result);
  const seconds = (result.durationMs / 1000).toFixed(1);
  console.log(`${result.status === 'passed' ? 'PASS' : 'FAIL'} ${target} (${seconds}s` +
    `${result.timedOut ? ', stopped for taking too long' : ''})`);
  if (result.detail) console.error(result.detail);
  if (index < targets.length - 1 && !process.argv.includes('--no-gap')) {
    await new Promise(resolveWait => setTimeout(resolveWait, 5_000));
  }
}

const report: AcceptanceReport = {
  schemaVersion: 1,
  commit,
  generatedAt: new Date().toISOString(),
  passed: results.filter(result => result.status === 'passed').length,
  failed: results.filter(result => result.status === 'failed').length,
  results,
};
const reportPath = resolve(option('--report') ?? '.cache/acceptance-report.json');
mkdirSync(dirname(reportPath), { recursive: true });
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(`\n${report.passed}/${results.length} accepted contracts passed`);
console.log(`report: ${reportPath}`);

if (report.failed) process.exitCode = 1;
