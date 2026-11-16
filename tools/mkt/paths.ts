/**
 * Where mkt keeps what it records. Two trees, by how long each must live:
 *
 *   .mkt/            evidence that takes MAME hours to record, kept out of
 *                    .cache so `npm run clean:all` leaves it (gitignored):
 *     baseline/<commit>/   one baseline per commit (`mkt record`)
 *     compare/             the latest comparison against one (`mkt compare`)
 *     mame/<version>/      MAME's side of every run, by what MAME was given
 *   .cache/mkt/      the latest `mkt run` report per target, and its pictures
 */

import { join } from 'node:path';
import { projectRoot } from './mame-side.ts';

export const mktRoot = join(projectRoot, '.mkt');
export const baselineRoot = join(mktRoot, 'baseline');
export const compareRoot = join(mktRoot, 'compare');
export const mameCacheRoot = join(mktRoot, 'mame');
export const reportRoot = join(projectRoot, '.cache/mkt');

/** The mkt entry point, which a command runs again as a child for one run. */
export const mktEntry = join(projectRoot, 'tools/mkt.ts');
