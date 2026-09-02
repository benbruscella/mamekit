import type { MameHardwareDefinition } from '../../mame/hardware.ts';
import { compilePokey, generatedPokeyWorkletSource } from '../../mame/pokey-compiler.ts';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { POKEY_IR_ARTIFACT, POKEY_WORKLET_ARTIFACT } from './definition.ts';

export function extractPokey(input: CapabilityInput): CapabilityExtraction | undefined {
  const entry = input.entries.find(candidate => candidate.type === 'POKEY');
  if (!entry?.definition) return undefined;
  const plan = compilePokey(
    input.mameSource,
    entry.definition as MameHardwareDefinition,
  );
  return {
    executableTypes: ['POKEY'],
    executable: {
      POKEY: { kind: 'audio', artifact: POKEY_WORKLET_ARTIFACT },
    },
    artifacts: [
      { path: POKEY_IR_ARTIFACT, contents: JSON.stringify(plan, null, 2) },
      { path: POKEY_WORKLET_ARTIFACT, contents: generatedPokeyWorkletSource(plan) },
    ],
    entrySourceFiles: { POKEY: plan.sourceFiles },
  };
}
