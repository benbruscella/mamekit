import type { MameHardwareDefinition } from '../../mame/hardware.ts';
import { compileNamcoWsg, generatedNamcoWsgWorkletSource } from '../../mame/audio-compiler.ts';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import {
  NAMCO_WSG_IR_ARTIFACT,
  NAMCO_WSG_MAME_TYPES,
  NAMCO_WSG_WORKLET_ARTIFACT,
} from './definition.ts';

export function extractNamcoWsg(input: CapabilityInput): CapabilityExtraction | undefined {
  const entry = input.entries.find(candidate => candidate.type === 'NAMCO_WSG');
  if (!entry?.definition) return undefined;

  const plan = compileNamcoWsg(input.mameSource, entry.definition as MameHardwareDefinition);
  return {
    executableTypes: [...NAMCO_WSG_MAME_TYPES],
    executable: { NAMCO_WSG: { kind: 'audio', artifact: NAMCO_WSG_WORKLET_ARTIFACT } },
    artifacts: [
      { path: NAMCO_WSG_IR_ARTIFACT, contents: JSON.stringify(plan, null, 2) },
      { path: NAMCO_WSG_WORKLET_ARTIFACT, contents: generatedNamcoWsgWorkletSource(plan) },
    ],
  };
}
