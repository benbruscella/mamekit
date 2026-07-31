// Lower the YM2203 from MAME's ymfm sources into an audio IR plus a worklet.
//
// Compile-time only: this may reach into src/mame, and never ships to the
// browser. The emitted worklet is the executable artifact.

import type { MameHardwareDefinition } from '../../mame/hardware.ts';
import { compileYm3526 } from '../../mame/opl-compiler.ts';
import { compileYm2203, generatedYm2203WorkletSource } from '../../mame/opn-compiler.ts';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import {
  YM2203_IR_ARTIFACT,
  YM2203_WORKLET_ARTIFACT,
  YM3526_IR_ARTIFACT,
} from './definition.ts';

export function extractYm2203(input: CapabilityInput): CapabilityExtraction | undefined {
  const entry = input.entries.find(candidate => candidate.type === 'YM2203');
  // No definition means the closure saw the type but could not parse its MAME
  // class. Returning undefined leaves it unresolved in the manifest rather
  // than marking it executable with nothing behind it.
  if (!entry?.definition) return undefined;

  const plan = compileYm2203(input.mameSource, entry.definition as MameHardwareDefinition);
  const ym3526Entry = input.entries.find(candidate => candidate.type === 'YM3526');
  const ym3526Plan = ym3526Entry?.definition
    ? compileYm3526(
        input.mameSource,
        ym3526Entry.definition as MameHardwareDefinition,
      )
    : undefined;
  return {
    executableTypes: [
      'YM2203',
      ...(ym3526Plan ? ['YM3526'] : []),
    ],
    executable: {
      YM2203: { kind: 'audio', artifact: YM2203_WORKLET_ARTIFACT },
      ...(ym3526Plan
        ? { YM3526: { kind: 'audio' as const, artifact: YM2203_WORKLET_ARTIFACT } }
        : {}),
    },
    artifacts: [
      { path: YM2203_IR_ARTIFACT, contents: JSON.stringify(plan, null, 2) },
      ...(ym3526Plan
        ? [{ path: YM3526_IR_ARTIFACT, contents: JSON.stringify(ym3526Plan, null, 2) }]
        : []),
      {
        path: YM2203_WORKLET_ARTIFACT,
        contents: generatedYm2203WorkletSource(plan, ym3526Plan),
      },
    ],
  };
}
