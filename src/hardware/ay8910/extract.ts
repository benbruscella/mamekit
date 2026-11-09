import type { MameHardwareDefinition } from '../../mame/hardware.ts';
import {
  compileAy8910,
  generatedAy8910WorkletSource,
} from '../../mame/audio-compiler.ts';
import type {
  CapabilityArtifact,
  CapabilityExtraction,
  CapabilityInput,
} from '../contract.ts';
import {
  AY8910_IR_ARTIFACT,
  AY8910_WORKLET_ARTIFACT,
} from './definition.ts';

export function extractAy8910(input: CapabilityInput): CapabilityExtraction | undefined {
  const ayEntries = input.entries.filter(candidate =>
    ['AY8910', 'AY8912', 'YM2149'].includes(candidate.type) && candidate.definition);
  if (!ayEntries.length) return undefined;
  const plan = compileAy8910(
    input.mameSource,
    ayEntries[0]!.definition as MameHardwareDefinition,
  );


  // MAME routes the R2R ladder into the same speaker; the worklet mixes it.
  const routedDacs = input.entries
    .map(candidate => candidate.type)
    .filter(type => type === 'DAC_4BIT_R2R' || type === 'DAC_8BIT_R2R');

  const artifacts: CapabilityArtifact[] = [
    { path: AY8910_IR_ARTIFACT, contents: JSON.stringify(plan, null, 2) },
    {
      path: AY8910_WORKLET_ARTIFACT,
      contents: generatedAy8910WorkletSource(plan),
    },
  ];

  return {
    executableTypes: [
      ...ayEntries.map(entry => entry.type),
    ],
    executable: {
      ...Object.fromEntries(ayEntries.map(entry => [
        entry.type,
        { kind: 'audio' as const, artifact: AY8910_WORKLET_ARTIFACT },
      ])),
    },
    artifacts,
  };
}
