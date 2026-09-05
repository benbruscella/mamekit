import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  BUILD_MANIFEST_FILE,
  buildClosureFailures,
  readBuildManifest,
  writeBuildManifest,
} from './build-manifest.ts';
import {
  BOARD_IR_SCHEMA_VERSION,
  COMPILER_VERSION,
  GRAPH_SCHEMA_VERSION,
} from '../ir/version.ts';

let passed = 0;
const check = (name: string, run: () => void): void => { run(); passed++; void name; };

function dist(targets: string[], capabilities: string[]): string {
  const root = mkdtempSync(join(tmpdir(), 'mamekit-manifest-'));
  mkdirSync(join(root, 'runtime/generated'), { recursive: true });
  writeFileSync(
    join(root, 'runtime/generated/hardware-manifest.json'),
    JSON.stringify({ targets, capabilities }),
  );
  return root;
}

check('a coherent build reports no failures', () => {
  const root = dist(['pacman', 'galaga'], ['z80', 'namco-wsg']);
  writeBuildManifest(root, ['galaga', 'pacman'], '', 'test');
  assert.deepEqual(buildClosureFailures(root, ['pacman', 'galaga']), []);
  rmSync(root, { recursive: true, force: true });
});

check('the manifest records the schema and compiler versions', () => {
  const root = dist([], []);
  const manifest = writeBuildManifest(root, [], '', 'test');
  assert.equal(manifest.boardIrSchemaVersion, BOARD_IR_SCHEMA_VERSION);
  assert.equal(manifest.graphSchemaVersion, GRAPH_SCHEMA_VERSION);
  assert.equal(manifest.compilerVersion, COMPILER_VERSION);
  assert.deepEqual(manifest.publishedTargets, []);
  assert.deepEqual(readBuildManifest(root), manifest);
  rmSync(root, { recursive: true, force: true });
});

check('the manifest records a publication subset independently', () => {
  const root = dist(['candidate', 'pacman'], []);
  const manifest = writeBuildManifest(
    root,
    ['candidate', 'pacman'],
    '',
    'test',
    ['pacman'],
  );
  assert.deepEqual(manifest.targets, ['candidate', 'pacman']);
  assert.deepEqual(manifest.publishedTargets, ['pacman']);
  rmSync(root, { recursive: true, force: true });
});

// The failure this exists for: a --targets build regenerates the closure for a
// subset while another target's data survives from an earlier build.
check('a target left over from an earlier build is rejected', () => {
  const root = dist(['pacman'], ['z80']);
  writeBuildManifest(root, ['pacman'], '', 'test');
  const failures = buildClosureFailures(root, ['pacman', 'galaga']);
  assert.match(failures.join('\n'), /catalog contains targets the build manifest does not: galaga/);
  rmSync(root, { recursive: true, force: true });
});

check('a declared target missing from the catalog is rejected', () => {
  const root = dist(['pacman', 'galaga'], ['z80']);
  writeBuildManifest(root, ['pacman', 'galaga'], '', 'test');
  const failures = buildClosureFailures(root, ['pacman']);
  assert.match(failures.join('\n'), /declares targets absent from the catalog: galaga/);
  rmSync(root, { recursive: true, force: true });
});

check('a closure built for a different target set is rejected', () => {
  const root = dist(['pacman'], ['z80']);
  writeBuildManifest(root, ['pacman'], '', 'test');
  writeFileSync(
    join(root, 'runtime/generated/hardware-manifest.json'),
    JSON.stringify({ targets: ['galaga'], capabilities: ['z80'] }),
  );
  const failures = buildClosureFailures(root, ['pacman']);
  assert.match(failures.join('\n'), /hardware closure was built for galaga/);
  rmSync(root, { recursive: true, force: true });
});

check('a closure with different capabilities is rejected', () => {
  const root = dist(['pacman'], ['z80']);
  writeBuildManifest(root, ['pacman'], '', 'test');
  writeFileSync(
    join(root, 'runtime/generated/hardware-manifest.json'),
    JSON.stringify({ targets: ['pacman'], capabilities: ['z80', 'ym2203'] }),
  );
  assert.match(buildClosureFailures(root, ['pacman']).join('\n'), /capabilities .* do not match/);
  rmSync(root, { recursive: true, force: true });
});

check('a stale schema version is rejected', () => {
  const root = dist(['pacman'], ['z80']);
  writeBuildManifest(root, ['pacman'], '', 'test');
  const manifest = readBuildManifest(root)!;
  writeFileSync(
    join(root, BUILD_MANIFEST_FILE),
    JSON.stringify({ ...manifest, boardIrSchemaVersion: manifest.boardIrSchemaVersion - 1 }),
  );
  assert.match(buildClosureFailures(root, ['pacman']).join('\n'), /board IR schema is/);
  rmSync(root, { recursive: true, force: true });
});

check('a stale graph schema version is rejected', () => {
  const root = dist(['pacman'], ['z80']);
  writeBuildManifest(root, ['pacman'], '', 'test');
  const manifest = readBuildManifest(root)!;
  writeFileSync(
    join(root, BUILD_MANIFEST_FILE),
    JSON.stringify({ ...manifest, graphSchemaVersion: manifest.graphSchemaVersion - 1 }),
  );
  assert.match(buildClosureFailures(root, ['pacman']).join('\n'), /graph schema is/);
  rmSync(root, { recursive: true, force: true });
});

check('a distribution with no manifest is rejected', () => {
  const root = dist(['pacman'], ['z80']);
  assert.match(buildClosureFailures(root, ['pacman']).join('\n'), /build manifest is missing/);
  rmSync(root, { recursive: true, force: true });
});

console.log(`build-manifest.spec: ${passed} passed, 0 failed`);
