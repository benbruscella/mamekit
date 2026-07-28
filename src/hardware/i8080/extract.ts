import { compileMameI8080 } from '../../mame/cpu-compiler.ts';
import { generatedCpuExecutableSource } from '../../mame/cpu-codegen.ts';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import {
  I8080_IR_ARTIFACT,
  I8080_MAME_TYPES,
  I8080_MODULE_ARTIFACT,
} from './definition.ts';

export function extractI8080(
  input: CapabilityInput,
): CapabilityExtraction | undefined {
  if (!input.entries.some(entry => entry.type === 'I8080')) return undefined;

  const definition = compileMameI8080(input.mameSource);
  return {
    executableTypes: [...I8080_MAME_TYPES],
    executable: { I8080: { kind: 'cpu', artifact: I8080_IR_ARTIFACT } },
    artifacts: [
      { path: I8080_IR_ARTIFACT, contents: JSON.stringify(definition, null, 2) },
      { path: I8080_MODULE_ARTIFACT, contents: generatedCpuExecutableSource(definition) },
    ],
  };
}
