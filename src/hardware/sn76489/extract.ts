import type { MameHardwareDefinition } from '../../mame/hardware.ts';
import {
  compileSn76489,
  generatedSn76489WorkletSource,
} from '../../mame/sn76489-compiler.ts';
import type {
  CapabilityExtraction,
  CapabilityInput,
} from '../contract.ts';
import {
  SN76489_IR_ARTIFACT,
  SN76489_MAME_TYPES,
  SN76489_WORKLET_ARTIFACT,
} from './definition.ts';

export function extractSn76489(input: CapabilityInput): CapabilityExtraction | undefined {
  const entry = input.entries.find(candidate =>
    SN76489_MAME_TYPES.includes(candidate.type as typeof SN76489_MAME_TYPES[number]));
  if (!entry?.definition) return undefined;
  const plan = compileSn76489(
    input.mameSource,
    entry.definition as MameHardwareDefinition,
  );
  return {
    executableTypes: [entry.type],
    executable: {
      [entry.type]: { kind: 'audio', artifact: SN76489_WORKLET_ARTIFACT },
    },
    artifacts: [
      { path: SN76489_IR_ARTIFACT, contents: JSON.stringify(plan, null, 2) },
      {
        path: SN76489_WORKLET_ARTIFACT,
        contents: generatedSn76489WorkletSource(plan),
      },
    ],
    entrySourceFiles: { [entry.type]: plan.sourceFiles },
  };
}
