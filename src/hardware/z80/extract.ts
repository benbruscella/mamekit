import { compileMameZ80 } from '../../mame/cpu-compiler.ts';
import { generatedCpuExecutableSource } from '../../mame/cpu-codegen.ts';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import {
  Z80_IR_ARTIFACT,
  Z80_MAME_TYPES,
  Z80_MODULE_ARTIFACT,
} from './definition.ts';

export function extractZ80(
  input: CapabilityInput,
): CapabilityExtraction | undefined {
  if (!input.entries.some(entry => entry.type === 'Z80')) return undefined;

  const definition = compileMameZ80(input.mameSource);
  return {
    executableTypes: [...Z80_MAME_TYPES],
    executable: { Z80: { kind: 'cpu', artifact: Z80_IR_ARTIFACT } },
    artifacts: [
      { path: Z80_IR_ARTIFACT, contents: JSON.stringify(definition, null, 2) },
      { path: Z80_MODULE_ARTIFACT, contents: generatedCpuExecutableSource(definition) },
    ],
  };
}
