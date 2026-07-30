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

import { join } from 'node:path';

/** Hidden directory holding every local, gitignored asset tree. */
export const DATA_DIR = '.data';

/** `<projectRoot>/.data` — the sync root. */
export function dataDir(projectRoot: string): string {
  return join(projectRoot, DATA_DIR);
}

/** Cart and board dumps, one subdirectory per category: arcade, consoles/nes. */
export function romsDir(projectRoot: string): string {
  return join(projectRoot, DATA_DIR, 'roms');
}

/** Bezels, flyers, cabinet scans and the Gaming History dataset. */
export function artworkDir(projectRoot: string): string {
  return join(projectRoot, DATA_DIR, 'artwork');
}
