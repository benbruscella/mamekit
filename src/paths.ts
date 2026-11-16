// Local, gitignored asset roots.
//
// ROMs and artwork are copyrighted, so they live outside version control and
// outside anything deployable. Keeping both under one hidden .data/ tree makes
// the whole set a single sync unit for the DreamObjects bucket (.data/Makefile)
// instead of two directories that have to be remembered separately.
//
// Tooling-layer only: nothing under src/runtime or src/ir may import this, and
// nothing here is ever served (see src/cli.ts, which mounts artwork explicitly
// and never mounts roms).

import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { localVariableProblem } from './local-env.ts';

/** Hidden directory holding every local, gitignored asset tree. */
export const DATA_DIR = '.data';

/** `<projectRoot>/.data` — the sync root. */
export function dataDir(projectRoot: string): string {
  return join(projectRoot, DATA_DIR);
}

/**
 * Cart and board dumps, one subdirectory per category: arcade, consoles/nes.
 * `MAMEKIT_ROMS` (from `.env`, src/local-env.ts) moves the whole tree.
 */
export function romsDir(projectRoot: string): string {
  return process.env.MAMEKIT_ROMS ? resolve(process.env.MAMEKIT_ROMS) : join(projectRoot, DATA_DIR, 'roms');
}

/**
 * MAME's sample sets, one `<set>.zip` of .wav files each: what MAME plays
 * where a board's sound is recordings (Zaxxon's, Space Panic's). The MAME
 * oracle passes it as -samplepath, and the acceptance harness mounts the same
 * sets, so a contract measures what MAME's run plays.
 */
export function samplesDir(projectRoot: string): string {
  return process.env.MAMEKIT_SAMPLES ? resolve(process.env.MAMEKIT_SAMPLES) : join(projectRoot, DATA_DIR, 'samples');
}

/**
 * The MAME source checkout: `MAME_SRC` (from `.env`, src/local-env.ts), else
 * the sibling `../mame` the project has always looked for.
 */
export function mameSourceDir(projectRoot: string): string {
  return resolve(process.env.MAME_SRC ?? join(projectRoot, '../mame'));
}

/** As mameSourceDir, refused with a message that names the variable when it holds no MAME source. */
export function requireMameSourceDir(projectRoot: string): string {
  const dir = mameSourceDir(projectRoot);
  if (!existsSync(join(dir, 'src/mame'))) {
    throw new Error(localVariableProblem('MAME_SRC', process.env.MAME_SRC
      ? `MAME_SRC is ${dir}, which holds no MAME source (no src/mame)`
      : `MAME_SRC is not set and ${dir} holds no MAME source`));
  }
  return dir;
}

/** Bezels, flyers, cabinet scans and the Gaming History dataset. */
export function artworkDir(projectRoot: string): string {
  return join(projectRoot, DATA_DIR, 'artwork');
}

/**
 * MAMEDEV's published release notes, which are where driver credits come from
 * (src/gen/release-notes.ts). Upstream prose rather than our own material, so
 * it is fetched into the asset tree and never committed — refresh it with
 * `node tools/fetch-release-notes.ts` whenever the MAME checkout moves to a new
 * release, or the newest release's credits are simply missing.
 */
export function releaseNotesDir(projectRoot: string): string {
  return join(projectRoot, DATA_DIR, 'release-notes');
}
