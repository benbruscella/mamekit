/**
 * Where the comparison commands keep what they record. Two trees, by how long
 * each must live:
 *
 *   .mamekit/        evidence that takes MAME hours to record, kept out of
 *                    .cache so `npm run clean:all` leaves it (gitignored):
 *     baseline/<commit>/   one baseline per commit (`mamekit record`)
 *     compare/             the latest comparison against one (`mamekit compare`)
 *     mame/<version>/      MAME's side of every run, by what MAME was given
 *   .cache/compare/  the latest `mamekit against` report per target, and its pictures
 */

import { join } from 'node:path';
import { projectRoot } from './mame-side.ts';

export const localRoot = join(projectRoot, '.mamekit');
export const baselineRoot = join(localRoot, 'baseline');
export const compareRoot = join(localRoot, 'compare');
export const mameCacheRoot = join(localRoot, 'mame');
export const reportRoot = join(projectRoot, '.cache/compare');

/** The CLI entry point, which a command runs again as a child for one run. */
export const cliEntry = join(projectRoot, 'bin/mamekit.js');
