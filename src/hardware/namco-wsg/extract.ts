import type { MameHardwareDefinition } from '../../mame/hardware.ts';
import { compileNamcoWsg, generatedNamcoWsgWorkletSource } from '../../mame/audio-compiler.ts';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import {
  NAMCO_WSG_IR_ARTIFACT,
  NAMCO_WSG_MAME_TYPES,
  NAMCO_WSG_WORKLET_ARTIFACT,
  POLEPOS_WSG_IR_ARTIFACT,
  POLEPOS_WSG_WORKLET_ARTIFACT,
} from './definition.ts';

export function extractNamcoWsg(input: CapabilityInput): CapabilityExtraction | undefined {
  const entries = input.entries.filter(candidate =>
    candidate.definition &&
    NAMCO_WSG_MAME_TYPES.includes(candidate.type as typeof NAMCO_WSG_MAME_TYPES[number]));
  if (!entries.length) return undefined;
  const compiled = entries.map(entry => ({
    entry,
    plan: compileNamcoWsg(input.mameSource, entry.definition as MameHardwareDefinition),
  }));
  return {
    executableTypes: entries.map(entry => entry.type),
    executable: Object.fromEntries(compiled.map(({ entry }) => [
      entry.type,
      {
        kind: 'audio' as const,
        artifact: entry.type === 'POLEPOS_WSG'
          ? POLEPOS_WSG_WORKLET_ARTIFACT
          : NAMCO_WSG_WORKLET_ARTIFACT,
      },
    ])),
    artifacts: compiled.flatMap(({ entry, plan }) => {
      const polepos = entry.type === 'POLEPOS_WSG';
      return [
        {
          path: polepos ? POLEPOS_WSG_IR_ARTIFACT : NAMCO_WSG_IR_ARTIFACT,
          contents: JSON.stringify(plan, null, 2),
        },
        {
          path: polepos ? POLEPOS_WSG_WORKLET_ARTIFACT : NAMCO_WSG_WORKLET_ARTIFACT,
          contents: generatedNamcoWsgWorkletSource(plan),
        },
      ];
    }),
  };
}
