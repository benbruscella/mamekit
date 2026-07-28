// The build manifest.
//
// A --targets build regenerates the hardware closure for a subset while
// leaving other targets' data in place, so dist could end up with a catalog
// that disagrees with the runtime closure it is served against. Nothing
// recorded what a given dist was actually built from, so nothing could tell.
//
// The manifest states it, and the audit refuses a dist whose catalog and
// closure do not match it.

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  BOARD_IR_SCHEMA_VERSION,
  COMPILER_VERSION,
  GRAPH_SCHEMA_VERSION,
} from '../ir/version.ts';

export const BUILD_MANIFEST_FILE = 'build-manifest.json';

export interface BuildManifest {
  /** Exact target set this dist was generated from. */
  targets: string[];
  /** Capability packages that lowered hardware for it. */
  capabilities: string[];
  boardIrSchemaVersion: number;
  graphSchemaVersion: number;
  compilerVersion: string;
  /** MAME checkout revision, when the source is a git working tree. */
  mameRevision?: string;
  /** Identifies one build; two dists are only comparable when these match. */
  buildId: string;
}

function mameRevision(mameSource: string): string | undefined {
  if (!mameSource || !existsSync(join(mameSource, '.git'))) return undefined;
  const result = spawnSync('git', ['-C', mameSource, 'rev-parse', 'HEAD'], {
    encoding: 'utf8',
  });
  return result.status === 0 ? result.stdout.trim() : undefined;
}

export function writeBuildManifest(
  outRoot: string,
  targets: readonly string[],
  mameSource: string,
  buildId: string,
): BuildManifest {
  const hardwarePath = join(outRoot, 'runtime/generated/hardware-manifest.json');
  const capabilities: string[] = existsSync(hardwarePath)
    ? JSON.parse(readFileSync(hardwarePath, 'utf8')).capabilities ?? []
    : [];
  const revision = mameRevision(mameSource);
  const manifest: BuildManifest = {
    targets: [...targets].sort(),
    capabilities,
    boardIrSchemaVersion: BOARD_IR_SCHEMA_VERSION,
    graphSchemaVersion: GRAPH_SCHEMA_VERSION,
    compilerVersion: COMPILER_VERSION,
    ...(revision ? { mameRevision: revision } : {}),
    buildId,
  };
  writeFileSync(join(outRoot, BUILD_MANIFEST_FILE), JSON.stringify(manifest, null, 2));
  return manifest;
}

/**
 * Replace `dist` with a freshly built tree in one step.
 *
 * Generation used to write straight into dist: it overwrote the hardware
 * closure, rebuilt the app, then wrote the manifest last. A failure anywhere in
 * that sequence left a partially replaced distribution that still looked
 * servable. Building into a staging directory and swapping means dist is
 * either the old build or the new one, never half of each.
 */
export function swapStagedBuild(stagingRoot: string, outRoot: string): void {
  if (!existsSync(stagingRoot)) {
    throw new Error(`staged build is missing: ${stagingRoot}`);
  }
  const previous = `${outRoot}.previous`;
  rmSync(previous, { recursive: true, force: true });
  if (existsSync(outRoot)) renameSync(outRoot, previous);
  try {
    renameSync(stagingRoot, outRoot);
  } catch (error) {
    // Put the old build back rather than leaving nothing in place.
    if (existsSync(previous) && !existsSync(outRoot)) renameSync(previous, outRoot);
    throw error;
  }
  rmSync(previous, { recursive: true, force: true });
}

export function readBuildManifest(outRoot: string): BuildManifest | undefined {
  const path = join(outRoot, BUILD_MANIFEST_FILE);
  if (!existsSync(path)) return undefined;
  return JSON.parse(readFileSync(path, 'utf8')) as BuildManifest;
}

/**
 * Reasons this dist is internally inconsistent — a mixed or stale build. Empty
 * means the catalog, the hardware closure and the manifest all agree.
 */
export function buildClosureFailures(
  outRoot: string,
  catalogTargets: readonly string[],
): string[] {
  const manifest = readBuildManifest(outRoot);
  if (!manifest) return ['build manifest is missing — regenerate the distribution'];

  const failures: string[] = [];
  const declared = [...manifest.targets].sort();
  const present = [...catalogTargets].sort();
  const missing = declared.filter(target => !present.includes(target));
  const extra = present.filter(target => !declared.includes(target));
  if (missing.length) {
    failures.push(
      `build manifest declares targets absent from the catalog: ${missing.join(', ')}`,
    );
  }
  if (extra.length) {
    // Left over from an earlier build: their boards are registered against a
    // hardware closure that was not built for them.
    failures.push(
      `catalog contains targets the build manifest does not: ${extra.join(', ')}`,
    );
  }

  if (manifest.boardIrSchemaVersion !== BOARD_IR_SCHEMA_VERSION) {
    failures.push(
      `build manifest board IR schema is ${manifest.boardIrSchemaVersion}, ` +
      `this compiler emits ${BOARD_IR_SCHEMA_VERSION}`,
    );
  }
  if (manifest.compilerVersion !== COMPILER_VERSION) {
    failures.push(
      `build manifest compiler version is ${manifest.compilerVersion}, ` +
      `this compiler is ${COMPILER_VERSION}`,
    );
  }

  const hardwarePath = join(outRoot, 'runtime/generated/hardware-manifest.json');
  if (!existsSync(hardwarePath)) {
    failures.push('hardware manifest is missing');
    return failures;
  }
  const closure = JSON.parse(readFileSync(hardwarePath, 'utf8')) as {
    targets?: string[];
    capabilities?: string[];
  };
  const closureTargets = [...(closure.targets ?? [])].sort();
  if (closureTargets.join(',') !== declared.join(',')) {
    failures.push(
      `hardware closure was built for ${closureTargets.join(', ') || '(none)'} ` +
      `but the build manifest declares ${declared.join(', ')}`,
    );
  }
  const closureCapabilities = [...(closure.capabilities ?? [])].sort();
  if (closureCapabilities.join(',') !== [...manifest.capabilities].sort().join(',')) {
    failures.push(
      `hardware closure capabilities ${closureCapabilities.join(', ') || '(none)'} ` +
      `do not match the build manifest`,
    );
  }
  return failures;
}
