// Development runner: compile the browser app, serve it, and rebuild whenever
// repository sources change. Rebuilds happen in a child process so the HTTP
// server and filesystem watcher remain responsive while TypeScript compiles.
import { spawn, type ChildProcess } from 'node:child_process';
import { watch, type FSWatcher } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildApp } from './gen/generate.ts';
import { artworkDir } from './paths.ts';
import { serve } from './serve.ts';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, '..');
const outRoot = join(projectRoot, 'dist');
const buildOnceFlag = '--build-once';

function watchedSource(filename: string): boolean {
  return ['.css', '.html', '.js', '.json', '.svg', '.ts'].includes(extname(filename));
}

function compileApp(): Promise<boolean> {
  return new Promise(resolveBuild => {
    const child = spawn(process.execPath, [fileURLToPath(import.meta.url), buildOnceFlag], {
      cwd: projectRoot,
      stdio: 'inherit',
    });
    activeBuild = child;
    child.once('error', error => {
      activeBuild = undefined;
      console.error(`mamekit dev: could not start compiler: ${error.message}`);
      resolveBuild(false);
    });
    child.once('exit', (code, signal) => {
      activeBuild = undefined;
      if (code === 0) resolveBuild(true);
      else {
        console.error(`mamekit dev: compile failed (${code ?? signal ?? 'unknown'})`);
        resolveBuild(false);
      }
    });
  });
}

let activeBuild: ChildProcess | undefined;

async function runDev(): Promise<void> {
  console.log('mamekit dev: initial compile');
  if (!await compileApp()) process.exit(1);

  const portArg = process.argv.slice(2).find(arg => /^\d+$/.test(arg));
  const port = await serve(
    { '': outRoot }, // neither ROMs nor artwork are served from .data
    Number(portArg) || 8280,
  );
  console.log(`mamekit dev: serving http://localhost:${port}/app/`);
  console.log('mamekit dev: watching src/, bin/, package.json, and tsconfig.json');

  let debounce: NodeJS.Timeout | undefined;
  let building = false;
  let pending = false;

  const drainBuilds = async (): Promise<void> => {
    if (building) return;
    building = true;
    while (pending) {
      pending = false;
      console.log('\nmamekit dev: change detected; recompiling');
      const ok = await compileApp();
      console.log(ok
        ? 'mamekit dev: compile complete; reload the browser'
        : 'mamekit dev: compile failed; watching for the next change');
    }
    building = false;
  };

  const scheduleBuild = (): void => {
    if (debounce) clearTimeout(debounce);
    debounce = setTimeout(() => {
      pending = true;
      void drainBuilds();
    }, 100);
  };

  const watchers: FSWatcher[] = [];
  for (const directory of ['src', 'bin']) {
    watchers.push(watch(
      join(projectRoot, directory),
      { recursive: true },
      (_event, filename) => {
        if (!filename || watchedSource(String(filename))) scheduleBuild();
      },
    ));
  }
  for (const filename of ['package.json', 'tsconfig.json']) {
    watchers.push(watch(join(projectRoot, filename), scheduleBuild));
  }

  const shutdown = (signal: NodeJS.Signals): void => {
    for (const watcher of watchers) watcher.close();
    activeBuild?.kill(signal);
    process.exit(0);
  };
  process.once('SIGINT', () => shutdown('SIGINT'));
  process.once('SIGTERM', () => shutdown('SIGTERM'));
}

if (process.argv.includes(buildOnceFlag)) {
  try {
    if (!await buildApp(outRoot)) process.exitCode = 1;
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
} else {
  await runDev();
}
