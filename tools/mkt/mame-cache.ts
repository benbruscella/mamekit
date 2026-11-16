/**
 * MAME's side of a run, recorded once and kept.
 *
 * MAME is deterministic for a given release, machine and input, so what one
 * run captured (pictures, RAM dumps, bus taps, input read-back, -wavwrite) is
 * the same every time it is given the same thing. The cache is keyed by
 * exactly that: MAME's command line and Lua plan (less this run's private
 * directories), oracle.lua, the MAME version, and the size and time of every
 * set file the run can read. Whatever our side changes that MAME is given
 * (an analog value recorded from our run, the frame a quickload typed on)
 * changes the key, and MAME runs again; nothing else does.
 *
 * Only a run MAME finished is kept: a timeout or crash is worth repeating.
 * A machine whose MAME run turns out not to be repeatable (`--verify-mame`
 * finds a second run that differs) is listed in `uncacheable.json` and always
 * runs. Entries are gzipped: RAM dumps shrink tenfold or more.
 *
 * Layout: .mkt/mame/<version>/<target>/<key>/{meta.json, <capture>.gz}.
 */

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { gunzipSync, gzipSync } from 'node:zlib';
import { mameCacheRoot } from './paths.ts';

/** What a MAME run leaves in the work directory that the comparison reads. */
export function mameCaptures(dir: string): string[] {
  return readdirSync(dir).filter(name =>
    (name.startsWith('mame-') || name === 'mame.wav') && name !== 'mame-plan.lua' && statSync(join(dir, name)).isFile());
}

export interface MameCacheInputs {
  version: string;
  target: string;
  /** MAME's arguments as run. */
  args: string[];
  /** The Lua plan as written. */
  plan: string;
  /** The run's work directory, which both of the above name and the key leaves out. */
  dir: string;
  /** oracle.lua's text. */
  script: string;
  /** The set files the run can read: from `setFiles`. */
  sets: string[];
}

/** The key: a hash of everything MAME is given, the work directory replaced by a placeholder. */
export function mameCacheKey(inputs: MameCacheInputs): string {
  const hash = createHash('sha256');
  const neutral = (text: string) => text.split(inputs.dir).join('$RUN');
  hash.update(`mame ${inputs.version}\n`);
  hash.update(`script ${createHash('sha256').update(inputs.script).digest('hex')}\n`);
  for (const arg of inputs.args) hash.update(`arg ${neutral(arg)}\n`);
  hash.update(`plan ${neutral(inputs.plan)}\n`);
  for (const file of inputs.sets) hash.update(`set ${file}\n`);
  return hash.digest('hex').slice(0, 24);
}

/**
 * The set files a run can read, each as `path size mtime`: for every set name
 * (the machine, its parents, its device sets, its sample set, a fitted card)
 * a `<name>.zip` or `<name>/` in any search path, every file of a `bios/`
 * search path, and the software title's `<list>/<name>.zip`. Adding a set for
 * another machine leaves the key alone; replacing one this run reads does not.
 */
export function setFiles(searchPaths: readonly string[], names: readonly string[], software?: string): string[] {
  const found: string[] = [];
  const stamp = (path: string) => {
    if (!existsSync(path)) return;
    const stat = statSync(path);
    if (stat.isDirectory()) {
      for (const entry of readdirSync(path).sort()) stamp(join(path, entry));
      return;
    }
    found.push(`${path} ${stat.size} ${Math.floor(stat.mtimeMs)}`);
  };
  const wanted = [...new Set(names.filter(Boolean))].sort();
  for (const dir of searchPaths) {
    if (dir.endsWith('/bios') || dir.endsWith('\\bios')) stamp(dir);
    for (const name of wanted) {
      stamp(join(dir, `${name}.zip`));
      stamp(join(dir, `${name}.7z`));
      stamp(join(dir, name));
    }
    if (software) {
      const [list, title] = software.split(':');
      if (list && title) stamp(join(dir, list, `${title}.zip`));
    }
  }
  return found;
}

export interface CachedRun {
  /** MAME's exit status and the tail of what it printed, as the run gave them. */
  status: number | null;
  output: string;
  recordedAt: string;
}

const entryDir = (version: string, target: string, key: string) => join(mameCacheRoot, version, target, key);
const uncacheablePath = (version: string) => join(mameCacheRoot, version, 'uncacheable.json');

/** Targets whose MAME run was seen to differ between two runs, and why. */
export function uncacheable(version: string): Record<string, string> {
  const path = uncacheablePath(version);
  return existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) as Record<string, string> : {};
}

export function markUncacheable(version: string, target: string, reason: string): void {
  const list = { ...uncacheable(version), [target]: reason };
  mkdirSync(join(mameCacheRoot, version), { recursive: true });
  writeFileSync(uncacheablePath(version), `${JSON.stringify(list, null, 2)}\n`);
}

/** Copies a recorded run's captures into `dir`; undefined when there is none. */
export function restoreMame(version: string, target: string, key: string, dir: string): CachedRun | undefined {
  const from = entryDir(version, target, key);
  const metaPath = join(from, 'meta.json');
  if (!existsSync(metaPath)) return undefined;
  const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as CachedRun & { files: string[] };
  for (const name of meta.files) {
    const packed = join(from, `${name}.gz`);
    if (!existsSync(packed)) return undefined;
  }
  for (const name of meta.files) writeFileSync(join(dir, name), gunzipSync(readFileSync(join(from, `${name}.gz`))));
  return { status: meta.status, output: meta.output, recordedAt: meta.recordedAt };
}

/** Keeps a finished run's captures; written whole through a rename, so a stopped run leaves no half entry. */
export function storeMame(version: string, target: string, key: string, dir: string, run: { status: number | null; output: string }): void {
  const to = entryDir(version, target, key);
  const staging = `${to}.tmp-${process.pid}`;
  rmSync(staging, { recursive: true, force: true });
  mkdirSync(staging, { recursive: true });
  const files = mameCaptures(dir);
  for (const name of files) writeFileSync(join(staging, `${name}.gz`), gzipSync(readFileSync(join(dir, name)), { level: 6 }));
  const meta = { ...run, recordedAt: new Date().toISOString(), files };
  writeFileSync(join(staging, 'meta.json'), `${JSON.stringify(meta, null, 2)}\n`);
  rmSync(to, { recursive: true, force: true });
  renameSync(staging, to);
}

/**
 * The captures of a fresh run against a recorded one: the first file that
 * differs, or undefined when every file is byte for byte the same.
 */
export function differingCapture(version: string, target: string, key: string, dir: string): string | undefined {
  const from = entryDir(version, target, key);
  const metaPath = join(from, 'meta.json');
  if (!existsSync(metaPath)) return undefined;
  const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as { files: string[] };
  const now = mameCaptures(dir);
  const all = [...new Set([...meta.files, ...now])].sort();
  for (const name of all) {
    if (!meta.files.includes(name)) return `${name} is new`;
    if (!now.includes(name)) return `${name} is missing`;
    const before = gunzipSync(readFileSync(join(from, `${name}.gz`)));
    if (!before.equals(readFileSync(join(dir, name)))) return `${name} differs`;
  }
  return undefined;
}
