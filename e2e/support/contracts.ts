// The supported-game inventory, as plain data for the browser suite.
//
// src/games is the single source of truth for which machines are accepted and
// how each one is driven (frames, input schedule, checkpoints, goldens). The
// browser tests reuse it rather than keeping a second list that could drift:
// a game disabled in src/games/disabled/ disappears from browser QA too.
//
// It is read through a short Node run instead of an import because the tokens
// are TypeScript modules that import each other with .ts specifiers; Node runs
// them natively, so no transpiler configuration is involved.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

export interface GameAction {
  atFrame: number;
  code?: string;
  heldFrames?: number;
  releasedFrames?: number;
  reset?: boolean;
}

export interface GameCheckpoint {
  video: string;
  state: string;
}

export interface GameContract {
  game: string;
  category: string;
  screen: { width: number; height: number };
  soundKind: string;
  frames: number;
  minimumFps: number;
  checkpoints: number[];
  actions: GameAction[];
  romEnvironment: string;
  golden: {
    regions: Record<string, string>;
    checkpoints: Record<string, GameCheckpoint>;
    audio?: { rms?: number; writes?: number; nonzeroWrites?: number };
  };
}

let cached: GameContract[] | undefined;

/** Every discovered game contract, in discovery order. */
export function loadContracts(): GameContract[] {
  if (cached) return cached;
  const entry = pathToFileURL(join(repoRoot, 'src/games/contracts.ts')).href;
  const json = execFileSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `import { loadGameContracts } from ${JSON.stringify(entry)};` +
      'process.stdout.write(JSON.stringify(await loadGameContracts()));',
    ],
    { cwd: repoRoot, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
  );
  cached = JSON.parse(json) as GameContract[];
  return cached;
}

/**
 * The arcade contracts this run covers. Narrow a run with
 * MAMEKIT_E2E_GAMES=pacman,galaga while bringing a machine up; the default is
 * every accepted machine, because that is the point of the suite.
 */
export function selectedContracts(): GameContract[] {
  const selected = process.env.MAMEKIT_E2E_GAMES
    ?.split(',').map(name => name.trim()).filter(Boolean);
  const contracts = loadContracts()
    .filter(contract => contract.category === 'arcade')
    .filter(contract => !selected || selected.includes(contract.game));
  if (!contracts.length) {
    throw new Error(`no arcade contract matched MAMEKIT_E2E_GAMES=${selected?.join(',')}`);
  }
  return contracts;
}

/**
 * The frame this machine is first driven at, which its token owns because
 * machines reach their input-ready attract state at wildly different times —
 * Pac-Man takes a coin at frame 300, Ghouls'n Ghosts not until 2,050. Wall
 * clock QA has to wait exactly as long, or it coins into a self-test and then
 * reports a machine that never started as a machine that makes no sound.
 */
export function readyFrame(contract: GameContract): number {
  return contract.actions[0]?.atFrame ?? 0;
}

/** One contract by MAME short name. */
export function contractFor(game: string): GameContract {
  const contract = loadContracts().find(candidate => candidate.game === game);
  if (!contract) throw new Error(`no game contract for "${game}"`);
  return contract;
}

/** The generated config the app itself loads for this machine. */
export function generatedConfig(contract: GameContract): {
  sound: { kind: string };
  roms: { region: string; romSet?: string }[];
} {
  const file = join(repoRoot, 'dist/games', contract.category, contract.game, 'config.json');
  if (!existsSync(file)) {
    throw new Error(`no generated config for "${contract.game}" — run: npm run gen:all`);
  }
  return JSON.parse(readFileSync(file, 'utf8')) as ReturnType<typeof generatedConfig>;
}

/**
 * Local zips to hand the app's own ROM picker: the game set plus every MAME
 * device set its regions come from (namco51.zip and friends live beside the
 * game, exactly as a real MAME collection splits them).
 *
 * Paths follow TESTING.md: .data/roms/<category>/<game>.zip, overridable per
 * game through the token's ROM environment variable.
 */
export function romFiles(contract: GameContract): string[] {
  const romsDir = join(repoRoot, '.data/roms', contract.category);
  const game = process.env[contract.romEnvironment] ?? join(romsDir, `${contract.game}.zip`);
  if (!existsSync(game)) {
    throw new Error(`${contract.game}: acceptance ROM is missing: ${game}`);
  }
  const dependencies = [...new Set(
    generatedConfig(contract).roms.flatMap(spec => spec.romSet ? [spec.romSet] : []),
  )].filter(set => set !== contract.game);
  const missing = dependencies.filter(set => !existsSync(join(romsDir, `${set}.zip`)));
  if (missing.length) {
    throw new Error(`${contract.game}: missing device ROM sets: ${missing.join(', ')}`);
  }
  return [game, ...dependencies.map(set => join(romsDir, `${set}.zip`))];
}
