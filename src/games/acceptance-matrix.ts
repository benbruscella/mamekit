/** Complete, non-fail-fast real-ROM acceptance runner and commit-status publisher. */

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

function runOne(target: string): Promise<AcceptanceResult> {
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
        ...(status === 'failed'
          ? { detail: `${signal ? `signal ${signal}\n` : ''}${output.trimEnd()}` }
          : {}),
      });
    });
  });
}

function publishStatus(
  commit: string,
  state: 'pending' | 'success' | 'failure',
  description: string,
): void {
  const repository = process.env.GITHUB_REPOSITORY ??
    git(['remote', 'get-url', 'origin'])
      .replace(/^git@github\.com:/, '')
      .replace(/^https:\/\/github\.com\//, '')
      .replace(/\.git$/, '');
  execFileSync('gh', [
    'api', `repos/${repository}/statuses/${commit}`, '--method', 'POST',
    '--raw-field', `state=${state}`,
    '--raw-field', 'context=ROM-backed accepted contracts',
    '--raw-field', `description=${description.slice(0, 140)}`,
  ], { cwd: projectRoot, stdio: 'inherit' });
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
const shouldPublish = process.argv.includes('--publish-status');
if (shouldPublish && requested.length) {
  throw new Error(
    'refusing to publish a partial acceptance status; unset MAMEKIT_ACCEPTANCE_GAMES',
  );
}
if (shouldPublish && git(['status', '--porcelain', '--untracked-files=no'])) {
  throw new Error(
    'refusing to publish results from a dirty source tree; commit the tested code first',
  );
}
if (shouldPublish) publishStatus(commit, 'pending', `running ${targets.length} accepted contracts`);

const results: AcceptanceResult[] = [];
for (const [index, target] of targets.entries()) {
  const result = await runOne(target);
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

if (shouldPublish) {
  publishStatus(
    commit,
    report.failed ? 'failure' : 'success',
    report.failed
      ? `${report.failed}/${results.length} accepted contracts failed`
      : `${results.length}/${results.length} accepted contracts passed`,
  );
}
if (report.failed) process.exitCode = 1;
