import {
  compileMameI8080,
  compileMameKonami1,
  compileMameM6803,
  compileMameMc6809,
  compileMameMcs48,
  compileMameZ80,
} from '../../mame/cpu-compiler.ts';
import { generatedCpuExecutableSource } from '../../mame/cpu-codegen.ts';
import type {
  CapabilityArtifact,
  CapabilityExtraction,
  CapabilityInput,
} from '../contract.ts';
import { CPU_MAME_TYPES, cpuIrArtifact, cpuModuleArtifact } from './definition.ts';

/** Which MAME compiler produces each core. */
const COMPILERS: Record<string, (mameSource: string) => unknown> = {
  Z80: compileMameZ80,
  I8080: compileMameI8080,
  I8039: compileMameMcs48,
  M6803: compileMameM6803,
  KONAMI1: compileMameKonami1,
  MC6809: compileMameMc6809,
};

export function extractCpus(input: CapabilityInput): CapabilityExtraction | undefined {
  const present = CPU_MAME_TYPES.filter(type =>
    input.entries.some(entry => entry.type === type));
  if (!present.length) return undefined;

  const artifacts: CapabilityArtifact[] = [];
  const executable: CapabilityExtraction['executable'] = {};
  for (const type of present) {
    const definition = COMPILERS[type]!(input.mameSource);
    artifacts.push(
      { path: cpuIrArtifact(type), contents: JSON.stringify(definition, null, 2) },
      {
        path: cpuModuleArtifact(type),
        contents: generatedCpuExecutableSource(
          definition as Parameters<typeof generatedCpuExecutableSource>[0],
        ),
      },
    );
    executable[type] = { kind: 'cpu', artifact: cpuIrArtifact(type) };
  }
  return { executableTypes: [...present], executable, artifacts };
}
