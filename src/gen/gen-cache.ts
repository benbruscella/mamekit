// The local generation cache: memoized derived artifacts under .cache/.
//
// gen:all re-derives everything from the MAME checkout and this repository's
// compiler source. Both are the ONLY inputs, so an artifact may be reused
// exactly when both are unchanged. Every cache entry records the identity it
// was derived from — the MAME checkout's HEAD revision and a content hash of
// mamekit's own source tree — and is reused only while both still match; a
// mismatched entry is pruned. A dirty MAME working tree has no revision that
// describes it, so it disables caching entirely.
//
// Nothing under .cache/ is committed, and nothing here changes WHAT is
// generated — a warm build is byte-identical to a cold one. The honest
// from-scratch path stays first-class: --no-cache (test:generation uses it)
// bypasses every lookup and store.

import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

export interface CacheIdentity {
  /** MAME checkout HEAD — the exact source every cached artifact came from. */
  mameRevision: string;
  /** Content hash of mamekit's own src/bin/tools (+ curated data signature). */
  srcHash: string;
}

export function genCacheRoot(): string {
  return join(projectRoot, '.cache');
}

/** Set by the CLI so worker processes share one identity and one decision. */
const IDENTITY_ENV = 'MAMEKIT_CACHE_IDENTITY';
const DISABLED_ENV = 'MAMEKIT_NO_CACHE';

export function cachingDisabled(): boolean {
  return process.env[DISABLED_ENV] === '1';
}

export function disableCaching(): void {
  process.env[DISABLED_ENV] = '1';
}

function hashFiles(hash: ReturnType<typeof createHash>, root: string): void {
  if (!existsSync(root)) return;
  const stack = [root];
  const files: string[] = [];
  while (stack.length) {
    const dir = stack.pop()!;
    for (const entry of readdirSync(dir).sort()) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) stack.push(full);
      else files.push(full);
    }
  }
  for (const file of files.sort()) {
    hash.update(relative(projectRoot, file));
    hash.update('\0');
    hash.update(readFileSync(file));
    hash.update('\0');
  }
}

/**
 * Curated presentation data (.data/artwork/data) feeds per-game history and
 * the catalog. Its contents can be large, so its signature is names + sizes +
 * mtimes: touching a file over-invalidates, which is the safe direction.
 */
function hashDataSignature(hash: ReturnType<typeof createHash>, root: string): void {
  if (!existsSync(root)) return;
  const stack = [root];
  const lines: string[] = [];
  while (stack.length) {
    const dir = stack.pop()!;
    for (const entry of readdirSync(dir).sort()) {
      const full = join(dir, entry);
      const stat = statSync(full);
      if (stat.isDirectory()) stack.push(full);
      else lines.push(`${relative(projectRoot, full)}\0${stat.size}\0${stat.mtimeMs}`);
    }
  }
  for (const line of lines.sort()) hash.update(line + '\n');
}

/**
 * Identity as decided by the parent CLI process, for workers that never see
 * the MAME path themselves (tsc app build, CPU artifact workers).
 */
export function cacheIdentityFromEnv(): CacheIdentity | undefined {
  const fromEnv = process.env[IDENTITY_ENV];
  if (!fromEnv) return undefined;
  try { return JSON.parse(fromEnv) as CacheIdentity; } catch { return undefined; }
}

/**
 * The identity every cache entry is verified against. Undefined when there is
 * nothing sound to tag entries with: no MAME git revision, or a dirty MAME
 * working tree (HEAD does not describe what would actually be parsed).
 */
export function cacheIdentity(mameSrc: string): CacheIdentity | undefined {
  const fromEnv = process.env[IDENTITY_ENV];
  if (fromEnv) {
    try { return JSON.parse(fromEnv) as CacheIdentity; } catch { /* recompute */ }
  }
  const rev = spawnSync('git', ['-C', mameSrc, 'rev-parse', 'HEAD'], { encoding: 'utf8' });
  if (rev.status !== 0) return undefined;
  const dirty = spawnSync('git', ['-C', mameSrc, 'status', '--porcelain'], {
    encoding: 'utf8',
  });
  if (dirty.status !== 0 || dirty.stdout.trim() !== '') return undefined;

  const hash = createHash('sha256');
  for (const dir of ['src', 'bin', 'tools']) hashFiles(hash, join(projectRoot, dir));
  for (const file of ['package.json', 'tsconfig.json']) {
    const full = join(projectRoot, file);
    if (existsSync(full)) {
      hash.update(file + '\0');
      hash.update(readFileSync(full));
    }
  }
  hashDataSignature(hash, join(projectRoot, '.data/artwork/data'));
  const identity = {
    mameRevision: rev.stdout.trim(),
    srcHash: hash.digest('hex'),
  };
  process.env[IDENTITY_ENV] = JSON.stringify(identity);
  return identity;
}

interface CacheEntry extends CacheIdentity {
  [key: string]: unknown;
}

/** Payload tree of an entry lives beside its identity tag. */
export function entryTree(entryDir: string): string {
  return join(entryDir, 'tree');
}

export function readEntry(entryDir: string, identity: CacheIdentity): CacheEntry | undefined {
  const file = join(entryDir, 'entry.json');
  if (!existsSync(file)) return undefined;
  try {
    const entry = JSON.parse(readFileSync(file, 'utf8')) as CacheEntry;
    if (entry.mameRevision === identity.mameRevision && entry.srcHash === identity.srcHash) {
      return entry;
    }
  } catch { /* corrupt — treat as miss */ }
  return undefined;
}

export function writeEntry(
  entryDir: string,
  identity: CacheIdentity,
  extra: Record<string, unknown> = {},
): void {
  mkdirSync(entryDir, { recursive: true });
  writeFileSync(
    join(entryDir, 'entry.json'),
    JSON.stringify({ ...identity, ...extra }, null, 2),
  );
}

/**
 * Replace `to` with a copy of `from`. On APFS `cp -c` clones instead of
 * copying, which keeps multi-hundred-MB restores near-instant.
 */
export function copyTree(from: string, to: string): void {
  rmSync(to, { recursive: true, force: true });
  mkdirSync(dirname(to), { recursive: true });
  if (process.platform === 'darwin') {
    const clone = spawnSync('cp', ['-Rc', from, to]);
    if (clone.status === 0) return;
    rmSync(to, { recursive: true, force: true });
  }
  cpSync(from, to, { recursive: true });
}

/** Content hash of a tree, for keys derived from staged inputs. */
export function hashTree(root: string): string {
  const hash = createHash('sha256');
  hashFiles(hash, root);
  return hash.digest('hex');
}

export function hashBytes(...parts: (string | Buffer)[]): string {
  const hash = createHash('sha256');
  for (const part of parts) {
    hash.update(part);
    hash.update('\0');
  }
  return hash.digest('hex');
}

/**
 * The quick pre-run check: every entry under .cache/ is verified against the
 * current identity and pruned on mismatch, so nothing stale can ever be
 * reused. driver-history keys by revision directory; other kinds carry
 * entry.json tags.
 */
export function verifyGenCache(
  identity: CacheIdentity,
  root = genCacheRoot(),
): { valid: number; pruned: number } {
  let valid = 0;
  let pruned = 0;
  const history = join(root, 'driver-history');
  if (existsSync(history)) {
    for (const rev of readdirSync(history)) {
      if (rev === identity.mameRevision) valid += readdirSync(join(history, rev)).length;
      else {
        rmSync(join(history, rev), { recursive: true, force: true });
        pruned++;
      }
    }
  }
  for (const kind of ['targets', 'cpu', 'closure', 'app-tsc']) {
    const kindDir = join(root, kind);
    if (!existsSync(kindDir)) continue;
    for (const name of readdirSync(kindDir)) {
      const entryDir = join(kindDir, name);
      if (!statSync(entryDir).isDirectory()) continue;
      if (readEntry(entryDir, identity)) valid++;
      else {
        rmSync(entryDir, { recursive: true, force: true });
        pruned++;
      }
    }
  }
  return { valid, pruned };
}
