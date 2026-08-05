import type { MameHardwareDefinition } from '../../mame/hardware.ts';
import {
  compilePhoenixSound,
  generatedPhoenixSoundWorkletSource,
} from '../../mame/phoenix-audio-compiler.ts';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import {
  PHOENIX_SOUND_IR_ARTIFACT,
  PHOENIX_SOUND_WORKLET_ARTIFACT,
} from './definition.ts';

export function extractPhoenixSound(
  input: CapabilityInput,
): CapabilityExtraction | undefined {
  const entry = input.entries.find(candidate => candidate.type === 'PHOENIX_SOUND');
  const tms = input.entries.find(candidate => candidate.type === 'TMS36XX');
  if (!entry?.definition || !tms) return undefined;

  const plan = compilePhoenixSound(
    input.mameSource,
    entry.definition as MameHardwareDefinition,
  );
  return {
    executableTypes: ['PHOENIX_SOUND', 'TMS36XX'],
    executable: {
      PHOENIX_SOUND: { kind: 'audio', artifact: PHOENIX_SOUND_WORKLET_ARTIFACT },
      TMS36XX: { kind: 'composition', artifact: PHOENIX_SOUND_WORKLET_ARTIFACT },
    },
    artifacts: [
      { path: PHOENIX_SOUND_IR_ARTIFACT, contents: JSON.stringify(plan, null, 2) },
      { path: PHOENIX_SOUND_WORKLET_ARTIFACT, contents: generatedPhoenixSoundWorkletSource(plan) },
    ],
  };
}
