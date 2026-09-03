import type { MameHardwareDefinition } from '../../mame/hardware.ts';
import { compileMsm5205, compileUpd7759 } from '../../mame/audio-compiler.ts';
import { compileYm2151, generatedYm2151WorkletSource } from '../../mame/opm-compiler.ts';
import { compilePokey } from '../../mame/pokey-compiler.ts';
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
  // Gauntlet's sound board answers the same speaker with a POKEY, so its
  // engine is hosted by the OPM worklet exactly as the MSM5205 bank is.
  const pokeyEntry = input.entries.find(candidate =>
    candidate.type === 'POKEY' && candidate.definition);
  const pokey = pokeyEntry?.definition
    ? compilePokey(input.mameSource, pokeyEntry.definition as MameHardwareDefinition)
    : undefined;
  const updEntry = input.entries.find(candidate =>
    candidate.type === 'UPD7759' && candidate.definition);
  const upd7759 = updEntry?.definition
    ? compileUpd7759(input.mameSource, updEntry.definition as MameHardwareDefinition)
    : undefined;
  return {
    // POKEY owns its executable claim and standalone worklet. The OPM worklet
    // still embeds the same lowered plan when a board routes both chips to one
    // speaker (Gauntlet), but must not claim or emit the family twice.
    executableTypes: ['YM2151'],
    executable: {
      YM2151: { kind: 'audio', artifact: YM2151_WORKLET_ARTIFACT },
    },
    artifacts: [
      { path: YM2151_IR_ARTIFACT, contents: JSON.stringify(plan, null, 2) },
      {
        path: YM2151_WORKLET_ARTIFACT,
        contents: generatedYm2151WorkletSource(plan, msm5205, pokey, upd7759),
      },
    ],
    entrySourceFiles: {
      YM2151: plan.sourceFiles,
    },
  };
}
