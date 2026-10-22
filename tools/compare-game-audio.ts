#!/usr/bin/env node
/**
 * Capture the same clean power-on run from MAMEKit and a real MAME binary,
 * then compare their audio.
 *
 *   MAME_BIN=/path/to/mame node tools/compare-game-audio.ts commando \
 *     [--mame /path/to/mame] [--seconds 30] [--out .files/audio/commando]
 *
 * MAME runs the way tools/mame-oracle.ts runs it: refused unless it is the
 * source checkout's release, booted cold from fresh nvram and cfg
 * directories (MAME writes NVRAM back on exit, so a reused one boots warm),
 * windowed so it cannot take over the screen, and at low priority.
 */

import { spawnSync } from 'node:child_process';
import { mkdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runGameAcceptance } from '../src/games/acceptance-harness.ts';
import { loadGameContracts } from '../src/games/contracts.ts';
import { politeCommand, resolveMame } from './oracle/mame-side.ts';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [game, ...args] = process.argv.slice(2);
if (!game) usage();

const option = (name: string): string | undefined => {
  const index = args.indexOf(name);
  return index < 0 ? undefined : args[index + 1];
};
const mame = resolveMame(resolve(process.env.MAME_SRC ?? join(projectRoot, '../mame')), option('--mame')).binary;
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

const mameState = join(outDir, 'mame-state');
rmSync(mameState, { recursive: true, force: true });
const [command, commandArgs] = politeCommand(resolve(mame), [
  game,
  '-rompath', join(projectRoot, '.data/roms', contract.category),
  '-window', '-nomaximize',
  '-video', 'none',
  '-sound', 'none',
  '-wavwrite', mameWav,
  '-seconds_to_run', String(seconds),
  '-nothrottle',
  '-skip_gameinfo',
  '-nvram_directory', join(mameState, 'nvram'),
  '-cfg_directory', join(mameState, 'cfg'),
], { background: false, watch: false });
const mameResult = spawnSync(command, commandArgs, {
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
    '[--mame <path/to/mame>, else MAME_BIN] [--seconds 30] [--out .files/audio/<game>]',
  );
  process.exit(1);
}
