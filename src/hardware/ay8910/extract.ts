import type { MameHardwareDefinition } from '../../mame/hardware.ts';
import {
  compileAy8910,
  compileMsm5205,
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
  MSM5205_IR_ARTIFACT,
} from './definition.ts';

export function extractAy8910(input: CapabilityInput): CapabilityExtraction | undefined {
  const ayEntry = input.entries.find(candidate => candidate.type === 'AY8910');
  if (!ayEntry?.definition) return undefined;
  const plan = compileAy8910(input.mameSource, ayEntry.definition as MameHardwareDefinition);

  // The MSM5205 plan is embedded in the AY worklet, so it is lowered here
  // rather than as its own core.
  const msmEntry = input.entries.find(candidate => candidate.type === 'MSM5205');
  const msm5205 = msmEntry?.definition
    ? compileMsm5205(input.mameSource, msmEntry.definition as MameHardwareDefinition)
    : undefined;

  // MAME routes the R2R ladder into the same speaker; the worklet mixes it.
  const routedDacs = input.entries
    .map(candidate => candidate.type)
    .filter(type => type === 'DAC_4BIT_R2R' || type === 'DAC_8BIT_R2R');

  const artifacts: CapabilityArtifact[] = [
    { path: AY8910_IR_ARTIFACT, contents: JSON.stringify(plan, null, 2) },
    {
      path: AY8910_WORKLET_ARTIFACT,
      contents: generatedAy8910WorkletSource(plan, msm5205),
    },
  ];
  if (msm5205) {
    artifacts.push({ path: MSM5205_IR_ARTIFACT, contents: JSON.stringify(msm5205, null, 2) });
  }

  return {
    executableTypes: [
      'AY8910',
      ...(msm5205 ? ['MSM5205'] : []),
      ...routedDacs,
    ],
    executable: {
      AY8910: { kind: 'audio', artifact: AY8910_WORKLET_ARTIFACT },
      ...(msm5205 ? { MSM5205: { kind: 'audio' as const, artifact: MSM5205_IR_ARTIFACT } } : {}),
      ...Object.fromEntries(routedDacs.map(type => [
        type,
        { kind: 'audio' as const, artifact: AY8910_WORKLET_ARTIFACT },
      ])),
    },
    artifacts,
  };
}
