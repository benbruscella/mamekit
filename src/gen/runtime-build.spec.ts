import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildRuntime, RUNTIME_TREES, stageRuntimeTrees } from './runtime-build.ts';

const scratch = mkdtempSync(join(tmpdir(), 'mamekit-runtime-build-spec-'));
try {
  // --- staging: what the browser runtime is, in both builds ------------------
  const staged = join(scratch, 'staged');
  stageRuntimeTrees(staged);
  assert.deepEqual(RUNTIME_TREES.map(tree => tree.output), ['runtime/core', 'runtime/ir', 'runtime/hardware']);
  const walk = (dir: string): string[] => readdirSync(dir, { withFileTypes: true })
    .flatMap(entry => entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]);
  const files = walk(staged);
  assert.ok(files.some(path => path.endsWith('runtime/core/generated-board.ts')));
  assert.ok(files.some(path => path.endsWith('runtime/ir/execute.ts')));
  assert.ok(!files.some(path => path.endsWith('.spec.ts')), 'no spec ships');
  assert.ok(!files.some(path => /runtime\/hardware\/.*\/(extract|acceptance|registry|acceptance-registry)\.ts$/.test(path)),
    'a hardware package ships its runtime-facing files only: extract.ts pulls in the compiler');

  // --- a build, then a check of it ---------------------------------------------
  const out = join(scratch, 'dist');
  const built = buildRuntime(out);
  assert.ok(built.ok, 'the runtime compiles on its own');
  assert.equal(built.changed.length, built.modules, 'into an empty dist every module is written');
  assert.deepEqual(buildRuntime(out, { check: true }).changed, [], 'a check right after a build finds nothing to change');

  // A module edited in dist, and one whose source is gone.
  writeFileSync(join(out, 'runtime/core/attotime.js'), '// stale\n');
  writeFileSync(join(out, 'runtime/core/deleted-module.js'), '// no source\n');
  const checked = buildRuntime(out, { check: true });
  assert.deepEqual(checked.changed, ['runtime/core/attotime.js']);
  assert.deepEqual(checked.removed, ['runtime/core/deleted-module.js']);
  assert.ok(existsSync(join(out, 'runtime/core/deleted-module.js')), 'a check writes nothing');
  const rebuilt = buildRuntime(out);
  assert.deepEqual([rebuilt.changed, rebuilt.removed], [['runtime/core/attotime.js'], ['runtime/core/deleted-module.js']],
    'a build rewrites only what changed and deletes what has no source');
  assert.ok(!existsSync(join(out, 'runtime/core/deleted-module.js')));
} finally {
  rmSync(scratch, { recursive: true, force: true });
}

console.log('runtime-build.spec: ok');
