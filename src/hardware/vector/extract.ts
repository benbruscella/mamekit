import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { VECTOR_MAME_TYPES } from './definition.ts';

export function extractVector(
  input: CapabilityInput,
): CapabilityExtraction | undefined {
  const present = VECTOR_MAME_TYPES.filter(type =>
    input.entries.some(entry => entry.type === type));
  if (!present.length) return undefined;
  return {
    executableTypes: [...present],
    executable: Object.fromEntries(present.map(type => [
      type,
      { kind: 'composition' as const, artifact: 'generated machine handlers' },
    ])),
    artifacts: [],
  };
}
