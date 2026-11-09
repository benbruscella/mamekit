import type { MameHardwareDefinition } from '../../mame/hardware.ts';
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
  return {
    executableTypes: ['YM2151'],
    executable: {
      YM2151: { kind: 'audio', artifact: YM2151_WORKLET_ARTIFACT },
    },
    artifacts: [
      { path: YM2151_IR_ARTIFACT, contents: JSON.stringify(plan, null, 2) },
      {
        path: YM2151_WORKLET_ARTIFACT,
        contents: generatedYm2151WorkletSource(plan),
      },
    ],
    entrySourceFiles: {
      YM2151: plan.sourceFiles,
    },
  };
}
