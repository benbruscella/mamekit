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
  detail?: string;
}

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
    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', chunk => { output += chunk; });
    child.stderr.on('data', chunk => { output += chunk; });
    child.once('error', error => { output += `${error.stack ?? error.message}\n`; });
    child.once('close', (code, signal) => {
      const status = code === 0 ? 'passed' as const : 'failed' as const;
      resolveRun({
        target,
        status,
        durationMs: Date.now() - started,
        attempts: attempt,
        ...(signal ? { signal } : {}),
        ...(status === 'failed'
          ? { detail: `${signal ? `signal ${signal}\n` : ''}${output.trimEnd()}` }
          : {}),
      });
    });
  });
}

async function runTarget(target: string): Promise<AcceptanceResult> {
  let result = await runOne(target, 1);
  // macOS can occasionally terminate a large generated Node module during
  // rapid process churn. Retry only native signals; deterministic assertion
  // failures remain single-shot and visible.
  if (result.status === 'failed' && result.signal) {
    console.warn(`RETRY ${target} after ${result.signal}`);
    await new Promise(resolveWait => setTimeout(resolveWait, 10_000));
    result = await runOne(target, 2);
  }
  return result;
}

function option(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const allTargets = (await loadGameContracts()).map(contractKey);
const requested = (process.env.MAMEKIT_ACCEPTANCE_GAMES ?? '')
  .split(',').map(value => value.trim()).filter(Boolean);
const targets = requested.length ? requested : allTargets;
const unknown = targets.filter(target => !allTargets.includes(target));
if (unknown.length) throw new Error(`unknown accepted contract(s): ${unknown.join(', ')}`);

const commit = git(['rev-parse', 'HEAD']);

const results: AcceptanceResult[] = [];
for (const [index, target] of targets.entries()) {
  const result = await runTarget(target);
  results.push(result);
  const seconds = (result.durationMs / 1000).toFixed(1);
  console.log(`${result.status === 'passed' ? 'PASS' : 'FAIL'} ${target} (${seconds}s)`);
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
