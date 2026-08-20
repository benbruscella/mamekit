import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { DAC_MAME_TYPES, DAC_WORKLET_ARTIFACT } from './definition.ts';
import { generatedDacWorkletSource } from './worklet-source.ts';

export function extractDac(input: CapabilityInput): CapabilityExtraction | undefined {
  const types = [...new Set(input.entries
    .map(entry => entry.type)
    .filter(type => DAC_MAME_TYPES.includes(type as typeof DAC_MAME_TYPES[number])))];
  if (!types.length) return undefined;
  return {
    executableTypes: types,
    executable: Object.fromEntries(types.map(type => [
      type,
      { kind: 'audio' as const, artifact: DAC_WORKLET_ARTIFACT },
    ])),
    artifacts: [{ path: DAC_WORKLET_ARTIFACT, contents: generatedDacWorkletSource() }],
  };
}
