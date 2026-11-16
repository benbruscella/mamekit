/**
 * Another commit's runtime, run against this tree's dist: the A/B a runtime
 * change is judged by, with nothing in the working tree touched.
 *
 * `runtimeOverlay(commit)` takes that commit's `src` from git (`git archive`,
 * no checkout, no stash, no second worktree), clones dist into
 * .cache/compare/overlay/<commit>/ (an APFS clone: seconds, no space), and
 * builds the commit's runtime into the clone with `mamekit build`'s compiler
 * (src/gen/runtime-build.ts). The generated boards and hardware closure stay
 * this tree's, so the overlay measures the runtime alone: the right question
 * for a scheduler or runtime change, and the wrong one where the commits'
 * compilers differ, which is said when they do.
 *
 * Copies, not links: Node resolves a symlinked module to its real path, so a
 * board loaded through a link would import dist's runtime, not the overlay's.
 * An overlay is reused while dist's build id and the commit are the ones it
 * was made from.
 */

import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { copyTree } from '../../src/gen/gen-cache.ts';
import { buildRuntime } from '../../src/gen/runtime-build.ts';
import { projectRoot } from './mame-side.ts';
import { reportRoot } from './paths.ts';

const git = (...args: string[]) => spawnSync('git', args, { cwd: projectRoot, encoding: 'utf8' });

/** The trees whose difference between two commits changes generated output, not just the runtime. */
export const COMPILER_TREES = ['src/mame', 'src/gen', 'src/kg', 'src/games'];

function distBuildId(dist: string): string {
  const manifest = join(dist, 'build-manifest.json');
  return existsSync(manifest) ? String((JSON.parse(readFileSync(manifest, 'utf8')) as { buildId?: string }).buildId ?? '') : '';
}

export interface Overlay {
  /** The overlay's root, a dist to run. */
  dist: string;
  /** The commit, full. */
  commit: string;
  short: string;
  /** Runtime modules that differ from this tree's dist. */
  changed: number;
  /** Compiler trees that differ between the commit and HEAD: the overlay leaves their effect out. */
  compilerDiffers: string[];
}

export function runtimeOverlay(commitish: string, dist = join(projectRoot, 'dist')): Overlay {
  const resolved = git('rev-parse', '--verify', `${commitish}^{commit}`);
  if (resolved.status !== 0) throw new Error(`no commit ${commitish}`);
  const commit = resolved.stdout.trim();
  const short = commit.slice(0, 12);
  const dir = join(reportRoot, 'overlay', short);
  const marker = join(dir, '.overlay.json');
  const buildId = distBuildId(dist);
  const compilerDiffers = COMPILER_TREES.filter(tree => git('diff', '--quiet', commit, 'HEAD', '--', tree).status !== 0);
  if (existsSync(marker)) {
    const made = JSON.parse(readFileSync(marker, 'utf8')) as { commit: string; buildId: string; changed: number };
    if (made.commit === commit && made.buildId === buildId) return { dist: dir, commit, short, changed: made.changed, compilerDiffers };
  }
  console.log(`building ${short}'s runtime into ${relative(projectRoot, dir)} (a clone of ${relative(projectRoot, dist)})...`);
  const source = mkdtempSync(join(tmpdir(), 'mamekit-overlay-src-'));
  try {
    const archive = spawnSync('git', ['archive', '--format=tar', commit, 'src'], { cwd: projectRoot, maxBuffer: 1 << 30 });
    if (archive.status !== 0) throw new Error(`git archive ${short} failed: ${archive.stderr.toString().trim()}`);
    const unpack = spawnSync('tar', ['-x', '-C', source], { input: archive.stdout });
    if (unpack.status !== 0) throw new Error(`unpacking ${short}'s src failed: ${unpack.stderr.toString().trim()}`);
    copyTree(dist, dir);
    const built = buildRuntime(dir, { root: source });
    if (!built.ok) throw new Error(`${short}'s runtime does not compile`);
    mkdirSync(dir, { recursive: true });
    writeFileSync(marker, `${JSON.stringify({ commit, buildId, changed: built.changed.length + built.removed.length })}\n`);
    return { dist: dir, commit, short, changed: built.changed.length + built.removed.length, compilerDiffers };
  } catch (error) {
    rmSync(dir, { recursive: true, force: true });
    throw error;
  } finally {
    rmSync(source, { recursive: true, force: true });
  }
}

/** One line on what an overlay measures, for the top of a run. */
export function describeOverlay(overlay: Overlay): string {
  return `${overlay.short}'s runtime (${overlay.changed} modules differ from dist)` +
    (overlay.compilerDiffers.length
      ? `; note: ${overlay.compilerDiffers.join(', ')} differ too, and the overlay keeps this tree's generated boards, so only the runtime is compared`
      : '');
}
