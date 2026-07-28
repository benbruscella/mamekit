import { compileMameM6803 } from '../../mame/cpu-compiler.ts';
import { generatedCpuExecutableSource } from '../../mame/cpu-codegen.ts';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import {
  M6803_IR_ARTIFACT,
  M6803_MAME_TYPES,
  M6803_MODULE_ARTIFACT,
} from './definition.ts';

export function extractM6803(
  input: CapabilityInput,
): CapabilityExtraction | undefined {
  if (!input.entries.some(entry => entry.type === 'M6803')) return undefined;

  const definition = compileMameM6803(input.mameSource);
  return {
    executableTypes: [...M6803_MAME_TYPES],
    executable: { M6803: { kind: 'cpu', artifact: M6803_IR_ARTIFACT } },
    artifacts: [
      { path: M6803_IR_ARTIFACT, contents: JSON.stringify(definition, null, 2) },
      { path: M6803_MODULE_ARTIFACT, contents: generatedCpuExecutableSource(definition) },
    ],
  };
}
