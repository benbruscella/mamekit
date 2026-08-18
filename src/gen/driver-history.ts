// Driver contribution history, extracted from the MAME git checkout.
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

export interface DriverAuthorStats {
  name: string;
  commits: number;
  firstCommit: string;
  lastCommit: string;
}

export interface DriverGitHistory {
  firstCommit: string;
  lastCommit: string;
  commits: number;
  contributors: number;
  topAuthors: string[];
  authorStats: DriverAuthorStats[];
}

interface CachedHistory {
  /** MAME checkout revision the history was extracted at. */
  mameRevision: string;
  driverFile: string;
  history: DriverGitHistory | null;
}

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

export function defaultHistoryCacheRoot(): string {
  return join(projectRoot, '.cache/driver-history');
}

/** Digest of `git log --follow --format=%as|%an` output, newest first. */
export function historyFromLog(lines: readonly string[]): DriverGitHistory | undefined {
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
  const authorStats = [...authors.entries()]
    .map(([name, author]) => ({ name, ...author }))
    .sort((a, b) => b.commits - a.commits || a.name.localeCompare(b.name));
  return {
    firstCommit: lines[lines.length - 1].split('|')[0],
    lastCommit: lines[0].split('|')[0],
    commits: lines.length,
    contributors: authors.size,
    topAuthors: authorStats.slice(0, 5).map(author => author.name),
    authorStats,
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
    // The revision check is what keeps the cache honest across MAME updates;
    // the driverFile check guards slug collisions between distinct paths.
    if (entry.mameRevision === revision && entry.driverFile === driverFile) return entry;
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
 * Contribution history for one driver file (path relative to the MAME root),
 * cached against the checkout's HEAD revision. Without a resolvable revision
 * (not a git checkout) the history is computed uncached, preserving the
 * previous best-effort behaviour.
 */
export function cachedDriverGitHistory(
  mameSrc: string,
  driverFile: string,
  cacheRoot = defaultHistoryCacheRoot(),
): DriverGitHistory | undefined {
  const revision = mameRevision(mameSrc);
  if (!revision) return historyFromLog(followLog(mameSrc, driverFile));

  const file = cacheFile(cacheRoot, revision, driverFile);
  const cached = readEntry(file, revision, driverFile);
  if (cached) return cached.history ?? undefined;

  pruneOtherRevisions(cacheRoot, revision);
  const history = historyFromLog(followLog(mameSrc, driverFile));
  writeEntry(file, { mameRevision: revision, driverFile, history: history ?? null });
  return history;
}
