import type { MameHardwareDefinition } from '../../mame/hardware.ts';
import {
  compileCounterLfsrDiscrete,
  generatedCounterLfsrDiscreteWorkletSource,
} from '../../mame/audio-compiler.ts';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { DISCRETE_COUNTER_LFSR_METHODS } from './definition.ts';

export function extractDiscreteCounterLfsr(
  input: CapabilityInput,
): CapabilityExtraction | undefined {
  const entry = input.entries.find(candidate =>
    candidate.type.endsWith('_SOUND') &&
    candidate.definition &&
    DISCRETE_COUNTER_LFSR_METHODS.every(name =>
      candidate.methods.some(method => method.name === name)));
  if (!entry?.definition) return undefined;

  const plan = compileCounterLfsrDiscrete(
    input.mameSource,
    entry.definition as MameHardwareDefinition,
  );
  const worklet = `audio/${plan.workletName}-worklet.ts`;
  return {
    executableTypes: [plan.deviceType],
    executable: { [plan.deviceType]: { kind: 'audio', artifact: worklet } },
    artifacts: [
      {
        path: `audio/${plan.workletName}.audio.ir.json`,
        contents: JSON.stringify(plan, null, 2),
      },
      { path: worklet, contents: generatedCounterLfsrDiscreteWorkletSource(plan) },
    ],
  };
}
