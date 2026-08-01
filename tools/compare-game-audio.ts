#!/usr/bin/env node
/**
 * Capture the same clean power-on run from MAMEKit and a real MAME binary,
 * then compare their audio.
 *
 *   node tools/compare-game-audio.ts commando \
 *     --mame "/path/to/mame" --seconds 30 --out .files/audio/commando
 */

import { spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runGameAcceptance } from '../src/games/acceptance-harness.ts';
import { loadGameContracts } from '../src/games/contracts.ts';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [game, ...args] = process.argv.slice(2);
if (!game) usage();

const option = (name: string): string | undefined => {
  const index = args.indexOf(name);
  return index < 0 ? undefined : args[index + 1];
};
const mame = option('--mame');
if (!mame) usage('missing --mame');
const seconds = Number(option('--seconds') ?? 30);
if (!Number.isFinite(seconds) || seconds <= 0) usage('--seconds must be positive');
const outDir = resolve(projectRoot, option('--out') ?? `.files/audio/${game}`);
mkdirSync(outDir, { recursive: true });

const contract = (await loadGameContracts())
  .find(candidate => candidate.game === game);
if (!contract) throw new Error(`unknown supported game: ${game}`);

const mamekitWav = join(outDir, `${game}-mamekit.wav`);
const mamekitWrites = join(outDir, `${game}-mamekit-writes.json`);
const mameWav = join(outDir, `${game}-mame.wav`);
const frames = Math.ceil(seconds * 60);

await runGameAcceptance(contract, projectRoot, {
  captureAudio: mamekitWav,
  captureAudioWrites: mamekitWrites,
  frames,
});

const mameResult = spawnSync(resolve(mame), [
  game,
  '-rompath', join(projectRoot, '.data/roms', contract.category),
  '-video', 'none',
  '-sound', 'none',
  '-wavwrite', mameWav,
  '-seconds_to_run', String(seconds),
  '-nothrottle',
  '-skip_gameinfo',
], {
  cwd: dirname(resolve(mame)),
  // Homebrew's SDL build still probes the window server with -video none.
  // The dummy backends make wavwrite usable from CI/headless agent sessions.
  env: {
    ...process.env,
    SDL_VIDEODRIVER: process.env.SDL_VIDEODRIVER ?? 'dummy',
    SDL_AUDIODRIVER: process.env.SDL_AUDIODRIVER ?? 'dummy',
  },
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'pipe'],
  maxBuffer: 16 * 1024 * 1024,
});
if (mameResult.status !== 0) {
  throw new Error(
    `MAME capture failed (status=${mameResult.status}, signal=${mameResult.signal}, ` +
    `error=${mameResult.error?.message ?? 'none'}):\n` +
    `${mameResult.stdout}${mameResult.stderr}`,
  );
}

const compare = spawnSync(process.execPath, [
  join(projectRoot, 'tools/compare-audio.mjs'),
  mamekitWav,
  mameWav,
  outDir,
], {
  cwd: projectRoot,
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'pipe'],
});
process.stdout.write(compare.stdout);
process.stderr.write(compare.stderr);
if (compare.status !== 0) process.exit(compare.status ?? 1);
console.log(`\nMAMEKit: ${mamekitWav}`);
console.log(`MAME:    ${mameWav}`);

function usage(error?: string): never {
  if (error) console.error(`error: ${error}`);
  console.error(
    'usage: node tools/compare-game-audio.ts <game> ' +
    '--mame <path/to/mame> [--seconds 30] [--out .files/audio/<game>]',
  );
  process.exit(1);
}
