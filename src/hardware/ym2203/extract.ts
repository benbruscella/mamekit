// Lower the YM2203 from MAME's ymfm sources into an audio IR plus a worklet.
//
// Compile-time only: this may reach into src/mame, and never ships to the
// browser. The emitted worklet is the executable artifact.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { MameHardwareDefinition } from '../../mame/hardware.ts';
import { deviceDefinitionsFromSource } from '../../mame/hardware.ts';
import { compileMsm5205 } from '../../mame/audio-compiler.ts';
import { compileYm3526 } from '../../mame/opl-compiler.ts';
import { compileYm2203, generatedYm2203WorkletSource } from '../../mame/opn-compiler.ts';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import {
  YM2203_IR_ARTIFACT,
  YM2203_WORKLET_ARTIFACT,
  YM3526_IR_ARTIFACT,
} from './definition.ts';

export function extractYm2203(input: CapabilityInput): CapabilityExtraction | undefined {
  const opnEntries = input.entries.filter(candidate =>
    candidate.type === 'YM2203' || candidate.type === 'YM2610');
  const entry = opnEntries.find(candidate => candidate.type === 'YM2203') ?? opnEntries[0];
  // Either OPL part rides the same worklet. YM3812 is a YM3526 plus OPL2's
  // waveform select, so it lowers from the same ymfm geometry; a board whose
  // only sound chip is an OPL2 (Wardner) reaches this package through it.
  const oplEntry = input.entries.find(candidate =>
    candidate.type === 'YM3526' || candidate.type === 'YM3812');
  if (!entry?.definition && !oplEntry?.definition) return undefined;
  // No definition means the closure saw the type but could not parse its MAME
  // class. Returning undefined leaves it unresolved in the manifest rather
  // than marking it executable with nothing behind it.
  const definition = entry?.definition ?? deviceDefinitionsFromSource(
    'src/devices/sound/ymopn.cpp',
    readFileSync(join(input.mameSource, 'src/devices/sound/ymopn.cpp'), 'utf8'),
  ).find(candidate => candidate.type === 'YM2203');
  if (!definition) return undefined;

  const plan = compileYm2203(input.mameSource, definition as MameHardwareDefinition);
  const oplPlan = oplEntry?.definition
    ? compileYm3526(
        input.mameSource,
        oplEntry.definition as MameHardwareDefinition,
      )
    : undefined;
  const msmEntry = input.entries.find(candidate => candidate.type === 'MSM5205');
  const msm5205Plan = msmEntry?.definition
    ? compileMsm5205(input.mameSource, msmEntry.definition as MameHardwareDefinition)
    : undefined;
  return {
    executableTypes: [
      ...opnEntries.filter(candidate => candidate.definition).map(candidate => candidate.type),
      ...(oplPlan && oplEntry ? [oplEntry.type] : []),
    ],
    executable: {
      ...Object.fromEntries(opnEntries.filter(candidate => candidate.definition).map(candidate => [
        candidate.type,
        { kind: 'audio' as const, artifact: YM2203_WORKLET_ARTIFACT },
      ])),
      ...(oplPlan && oplEntry
        ? { [oplEntry.type]: { kind: 'audio' as const, artifact: YM2203_WORKLET_ARTIFACT } }
        : {}),
    },
    artifacts: [
      { path: YM2203_IR_ARTIFACT, contents: JSON.stringify(plan, null, 2) },
      ...(oplPlan
        ? [{ path: YM3526_IR_ARTIFACT, contents: JSON.stringify(oplPlan, null, 2) }]
        : []),
      {
        path: YM2203_WORKLET_ARTIFACT,
        contents: generatedYm2203WorkletSource(plan, oplPlan, msm5205Plan),
      },
    ],
  };
}
