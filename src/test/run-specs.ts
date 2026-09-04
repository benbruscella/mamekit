import { spawn } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const srcRoot = join(projectRoot, 'src');

function specFiles(dir: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir).sort()) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) found.push(...specFiles(path));
    else if (entry.endsWith('.spec.ts')) found.push(path);
  }
  return found;
}

interface SpecResult {
  file: string;
  code: number | null;
  signal: NodeJS.Signals | null;
  stdout: string;
  stderr: string;
}

function runSpec(file: string): Promise<SpecResult> {
  return new Promise(resolveRun => {
    const child = spawn(process.execPath, [file], {
      cwd: projectRoot,
      env: process.env,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', chunk => { stdout += chunk; });
    child.stderr.on('data', chunk => { stderr += chunk; });
    child.once('error', error => {
      stderr += `${error.stack ?? error.message}\n`;
    });
    child.once('close', (code, signal) => {
      resolveRun({ file, code, signal, stdout, stderr });
    });
  });
}

const files = specFiles(srcRoot);
const requestedJobs = Number(process.env.SPEC_JOBS ?? 4);
const jobs = Number.isInteger(requestedJobs) && requestedJobs > 0
  ? Math.min(requestedJobs, Math.max(1, files.length))
  : 4;
const failures: SpecResult[] = [];
let next = 0;

async function worker(): Promise<void> {
  while (true) {
    const file = files[next++];
    if (!file) return;
    const result = await runSpec(file);
    if (result.code !== 0) failures.push(result);
  }
}

await Promise.all(Array.from({ length: jobs }, () => worker()));

if (failures.length) {
  failures.sort((left, right) => left.file.localeCompare(right.file));
  for (const failure of failures) {
    const name = relative(projectRoot, failure.file);
    console.error(`\nFAIL ${name}${failure.signal ? ` (${failure.signal})` : ''}`);
    if (failure.stdout.trim()) console.error(failure.stdout.trimEnd());
    if (failure.stderr.trim()) console.error(failure.stderr.trimEnd());
  }
  console.error(`\n${files.length - failures.length} passed, ${failures.length} failed`);
  process.exitCode = 1;
} else {
  console.log(`${files.length} colocated specs passed (${jobs} workers)`);
}
