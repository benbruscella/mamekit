// Commit activity on one driver file, extracted from the MAME git checkout.
//
// This is NOT attribution, and nothing generated from it may present it as
// such. `git log --follow` does not reliably track code moved between files or
// split out of a driver; it counts a typo fix and a rewrite alike; work landed
// on behalf of someone without repository access is recorded against the
// committer; and author names are spelled inconsistently across MAME's history.
// Any one of those is enough to make a commit tally the wrong answer to "who
// wrote this?" — Pac-Man's top committers are the people who refactored the
// whole tree, while its driver header credits Nicola Salmoria.
//
// So this module now reports activity only: how many commits touched the file,
// over what period, at which revision. Credit comes from MAMEDEV's published
// release notes and the driver header instead — see src/gen/release-notes.ts.
//
// `git log --follow` over MAME's history costs ~6 seconds per driver file,
// which dominated every target generation. History only changes when the
// checkout's HEAD moves, so each result is cached in the gitignored
// `.cache/driver-history/<revision>/` tree, self-describing about exactly
// which MAME revision it was extracted from. A cached entry is reused only
// when its recorded revision matches the checkout's current HEAD; entries for
// other revisions are pruned. A dirty working tree cannot go stale here:
// `git log` reads committed history only.

import { spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cachingDisabled } from './gen-cache.ts';

export interface DriverCommitActivity {
  firstCommit: string;
  lastCommit: string;
  commits: number;
  /** Distinct names appearing as commit authors — not a count of contributors. */
  authors: number;
  /** MAME revision the count was taken at, so the figure can be reproduced. */
  mameRevision?: string;
  /** How it was counted, carried with the numbers wherever they are shown. */
  method: string;
}

export const COMMIT_ACTIVITY_METHOD = 'git log --follow over the driver file';

/**
 * Shape version of a cached entry. Bump it whenever `DriverCommitActivity`
 * changes: the MAME revision alone cannot tell an entry written by an older
 * version of this module from a current one, and a warm cache would otherwise
 * keep serving the old shape long after the code stopped producing it. That is
 * not hypothetical — entries written when this module still emitted `topAuthors`
 * and `authorStats` came straight back out of the cache and into generated
 * metadata after those fields were deliberately removed.
 */
const ACTIVITY_SHAPE_VERSION = 2;

interface CachedHistory {
  /** MAME checkout revision the activity was counted at. */
  mameRevision: string;
  /** Shape of `history`, so a stale-shaped entry is recomputed, not reused. */
  shapeVersion?: number;
  driverFile: string;
  history: DriverCommitActivity | null;
}

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

export function defaultHistoryCacheRoot(): string {
  return join(projectRoot, '.cache/driver-history');
}

/** Digest of `git log --follow --format=%as|%an` output, newest first. */
export function commitActivityFromLog(
  lines: readonly string[],
  mameRevision?: string,
): DriverCommitActivity | undefined {
  if (!lines.length) return undefined;
  const authors = new Map<string, {
    commits: number;
    firstCommit: string;
    lastCommit: string;
  }>();
  for (const l of lines) {
    const [date, name] = l.split('|');
    if (!name || !date) continue;
    const author = authors.get(name);
    if (author) {
      author.commits++;
      author.firstCommit = date;
    } else {
      authors.set(name, {
        commits: 1,
        firstCommit: date,
        lastCommit: date,
      });
    }
  }
  return {
    firstCommit: lines[lines.length - 1].split('|')[0],
    lastCommit: lines[0].split('|')[0],
    commits: lines.length,
    authors: authors.size,
    ...(mameRevision ? { mameRevision } : {}),
    method: COMMIT_ACTIVITY_METHOD,
  };
}

function mameRevision(mameSrc: string): string | undefined {
  const result = spawnSync('git', ['-C', mameSrc, 'rev-parse', 'HEAD'], {
    encoding: 'utf8',
  });
  return result.status === 0 ? result.stdout.trim() : undefined;
}

function followLog(mameSrc: string, driverFile: string): string[] {
  const log = spawnSync(
    'git',
    ['-C', mameSrc, 'log', '--follow', '--format=%as|%an', '--', driverFile],
    { encoding: 'utf8', timeout: 30000 },
  );
  return (log.stdout ?? '').trim().split('\n').filter(Boolean);
}

function cacheFile(cacheRoot: string, revision: string, driverFile: string): string {
  return join(cacheRoot, revision, `${driverFile.replace(/[^\w.-]/g, '_')}.json`);
}

function readEntry(
  file: string,
  revision: string,
  driverFile: string,
): CachedHistory | undefined {
  if (!existsSync(file)) return undefined;
  try {
    const entry = JSON.parse(readFileSync(file, 'utf8')) as CachedHistory;
    // The revision check keeps the cache honest across MAME updates, the
    // driverFile check guards slug collisions between distinct paths, and the
    // shape check keeps a cache written by older code from outliving it.
    if (entry.mameRevision === revision
      && entry.driverFile === driverFile
      && entry.shapeVersion === ACTIVITY_SHAPE_VERSION) return entry;
  } catch { /* torn concurrent write or corrupt file — recompute below */ }
  return undefined;
}

function writeEntry(file: string, entry: CachedHistory): void {
  mkdirSync(dirname(file), { recursive: true });
  // Parallel target generators may extract the same driver concurrently;
  // write-then-rename keeps readers from ever seeing a torn file.
  const tmp = `${file}.${process.pid}.tmp`;
  writeFileSync(tmp, JSON.stringify(entry, null, 2));
  renameSync(tmp, file);
}

/** Drop cache trees recorded against any MAME revision other than `revision`. */
function pruneOtherRevisions(cacheRoot: string, revision: string): void {
  if (!existsSync(cacheRoot)) return;
  for (const entry of readdirSync(cacheRoot)) {
    if (entry !== revision) rmSync(join(cacheRoot, entry), { recursive: true, force: true });
  }
}

/**
 * Commit activity for one driver file (path relative to the MAME root), cached
 * against the checkout's HEAD revision. Without a resolvable revision (not a
 * git checkout) it is computed uncached, preserving the previous best-effort
 * behaviour.
 */
export function cachedDriverCommitActivity(
  mameSrc: string,
  driverFile: string,
  cacheRoot = defaultHistoryCacheRoot(),
): DriverCommitActivity | undefined {
  const revision = mameRevision(mameSrc);
  if (cachingDisabled() || !revision) {
    return commitActivityFromLog(followLog(mameSrc, driverFile), revision);
  }

  const file = cacheFile(cacheRoot, revision, driverFile);
  const cached = readEntry(file, revision, driverFile);
  if (cached) return cached.history ?? undefined;

  pruneOtherRevisions(cacheRoot, revision);
  const history = commitActivityFromLog(followLog(mameSrc, driverFile), revision);
  writeEntry(file, {
    mameRevision: revision,
    shapeVersion: ACTIVITY_SHAPE_VERSION,
    driverFile,
    history: history ?? null,
  });
  return history;
}
