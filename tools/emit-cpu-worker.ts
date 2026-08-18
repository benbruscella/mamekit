import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { generatedCpuExecutableSource } from '../src/mame/cpu-codegen.ts';
import { compileCpuType } from '../src/hardware/cpu/extract.ts';
import { cpuIrArtifact, cpuModuleArtifact } from '../src/hardware/cpu/definition.ts';
import {
  cacheIdentityFromEnv,
  cachingDisabled,
  entryTree,
  genCacheRoot,
  readEntry,
  writeEntry,
} from '../src/gen/gen-cache.ts';

const [type, mameSource, root] = process.argv.slice(2);
if (!type || !mameSource || !root) {
  throw new Error('usage: emit-cpu-worker <cpu-type> <mame-source> <generated-root>');
}

// A core's artifacts depend only on the MAME checkout and this repository's
// compiler — exactly what the cache identity pins. On a verified hit the
// worker restores instead of recompiling; on a miss it refreshes the entry.
const cacheId = cachingDisabled() ? undefined : cacheIdentityFromEnv();
const entryDir = join(genCacheRoot(), 'cpu', type.toLowerCase());
if (cacheId && readEntry(entryDir, cacheId)) {
  cpSync(entryTree(entryDir), root, { recursive: true });
  process.exit(0);
}

const definition = compileCpuType(type, mameSource);
const artifacts = [
  { path: cpuIrArtifact(type), contents: JSON.stringify(definition, null, 2) },
  {
    path: cpuModuleArtifact(type),
    contents: generatedCpuExecutableSource(
      definition as Parameters<typeof generatedCpuExecutableSource>[0],
    ),
  },
];
for (const artifact of artifacts) {
  const target = join(root, artifact.path);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, artifact.contents);
}
if (cacheId) {
  for (const artifact of artifacts) {
    const target = join(entryTree(entryDir), artifact.path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, artifact.contents);
  }
  writeEntry(entryDir, cacheId, { type });
}
