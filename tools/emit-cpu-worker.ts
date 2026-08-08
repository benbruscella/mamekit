import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { generatedCpuExecutableSource } from '../src/mame/cpu-codegen.ts';
import { compileCpuType } from '../src/hardware/cpu/extract.ts';
import { cpuIrArtifact, cpuModuleArtifact } from '../src/hardware/cpu/definition.ts';

const [type, mameSource, root] = process.argv.slice(2);
if (!type || !mameSource || !root) {
  throw new Error('usage: emit-cpu-worker <cpu-type> <mame-source> <generated-root>');
}

const definition = compileCpuType(type, mameSource);
for (const artifact of [
  { path: cpuIrArtifact(type), contents: JSON.stringify(definition, null, 2) },
  {
    path: cpuModuleArtifact(type),
    contents: generatedCpuExecutableSource(
      definition as Parameters<typeof generatedCpuExecutableSource>[0],
    ),
  },
]) {
  const target = join(root, artifact.path);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, artifact.contents);
}
