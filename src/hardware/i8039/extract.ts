import { compileMameMcs48 } from '../../mame/cpu-compiler.ts';
import { generatedCpuExecutableSource } from '../../mame/cpu-codegen.ts';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import {
  I8039_IR_ARTIFACT,
  I8039_MAME_TYPES,
  I8039_MODULE_ARTIFACT,
} from './definition.ts';

export function extractI8039(
  input: CapabilityInput,
): CapabilityExtraction | undefined {
  if (!input.entries.some(entry => entry.type === 'I8039')) return undefined;

  const definition = compileMameMcs48(input.mameSource);
  return {
    executableTypes: [...I8039_MAME_TYPES],
    executable: { I8039: { kind: 'cpu', artifact: I8039_IR_ARTIFACT } },
    artifacts: [
      { path: I8039_IR_ARTIFACT, contents: JSON.stringify(definition, null, 2) },
      { path: I8039_MODULE_ARTIFACT, contents: generatedCpuExecutableSource(definition) },
    ],
  };
}
