import type { MameHardwareDefinition } from '../../mame/hardware.ts';
import { compileMsm5205 } from '../../mame/audio-compiler.ts';
import { compileYm2151, generatedYm2151WorkletSource } from '../../mame/opm-compiler.ts';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { YM2151_IR_ARTIFACT, YM2151_WORKLET_ARTIFACT } from './definition.ts';

export function extractYm2151(input: CapabilityInput): CapabilityExtraction | undefined {
  const entry = input.entries.find(candidate => candidate.type === 'YM2151');
  if (!entry?.definition) return undefined;
  const plan = compileYm2151(
    input.mameSource,
    entry.definition as MameHardwareDefinition,
  );
  // An MSM5205 bank routed into the same speaker is hosted by the OPM worklet
  // (Double Dragon), so its plan is lowered here rather than as its own core.
  const msmEntry = input.entries.find(candidate =>
    candidate.type === 'MSM5205' && candidate.definition);
  const msm5205 = msmEntry?.definition
    ? compileMsm5205(input.mameSource, msmEntry.definition as MameHardwareDefinition)
    : undefined;
  return {
    executableTypes: ['YM2151'],
    executable: { YM2151: { kind: 'audio', artifact: YM2151_WORKLET_ARTIFACT } },
    artifacts: [
      { path: YM2151_IR_ARTIFACT, contents: JSON.stringify(plan, null, 2) },
      {
        path: YM2151_WORKLET_ARTIFACT,
        contents: generatedYm2151WorkletSource(plan, msm5205),
      },
    ],
    entrySourceFiles: { YM2151: plan.sourceFiles },
  };
}
