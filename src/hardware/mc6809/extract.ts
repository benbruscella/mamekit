import { compileMameMc6809 } from '../../mame/cpu-compiler.ts';
import { generatedCpuExecutableSource } from '../../mame/cpu-codegen.ts';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import {
  MC6809_IR_ARTIFACT,
  MC6809_MAME_TYPES,
  MC6809_MODULE_ARTIFACT,
} from './definition.ts';

export function extractMc6809(
  input: CapabilityInput,
): CapabilityExtraction | undefined {
  if (!input.entries.some(entry => entry.type === 'MC6809')) return undefined;

  const definition = compileMameMc6809(input.mameSource);
  return {
    executableTypes: [...MC6809_MAME_TYPES],
    executable: { MC6809: { kind: 'cpu', artifact: MC6809_IR_ARTIFACT } },
    artifacts: [
      { path: MC6809_IR_ARTIFACT, contents: JSON.stringify(definition, null, 2) },
      { path: MC6809_MODULE_ARTIFACT, contents: generatedCpuExecutableSource(definition) },
    ],
  };
}
