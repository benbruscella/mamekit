import { compileMameKonami1 } from '../../mame/cpu-compiler.ts';
import { generatedCpuExecutableSource } from '../../mame/cpu-codegen.ts';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import {
  KONAMI1_IR_ARTIFACT,
  KONAMI1_MAME_TYPES,
  KONAMI1_MODULE_ARTIFACT,
} from './definition.ts';

export function extractKonami1(
  input: CapabilityInput,
): CapabilityExtraction | undefined {
  if (!input.entries.some(entry => entry.type === 'KONAMI1')) return undefined;

  const definition = compileMameKonami1(input.mameSource);
  return {
    executableTypes: [...KONAMI1_MAME_TYPES],
    executable: { KONAMI1: { kind: 'cpu', artifact: KONAMI1_IR_ARTIFACT } },
    artifacts: [
      { path: KONAMI1_IR_ARTIFACT, contents: JSON.stringify(definition, null, 2) },
      { path: KONAMI1_MODULE_ARTIFACT, contents: generatedCpuExecutableSource(definition) },
    ],
  };
}
