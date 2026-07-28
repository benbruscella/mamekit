import type { MameHardwareDefinition } from '../../mame/hardware.ts';
import {
  compileDiscreteSn76477,
  generatedDiscreteSn76477WorkletSource,
} from '../../mame/audio-compiler.ts';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';

export function extractDiscreteSn76477(
  input: CapabilityInput,
): CapabilityExtraction | undefined {
  // Shape, not name: the soundboard class is whichever *_AUDIO device a target
  // that also uses an SN76477 declares.
  const snGames = new Set(
    input.entries.find(entry => entry.type === 'SN76477')?.uses?.map(use => use.game) ?? [],
  );
  const entry = input.entries.find(candidate =>
    candidate.type.endsWith('_AUDIO') &&
    candidate.definition &&
    candidate.uses?.some(use => snGames.has(use.game)));
  if (!entry?.definition) return undefined;

  const plan = compileDiscreteSn76477(
    input.mameSource,
    entry.definition as MameHardwareDefinition,
  );
  const worklet = `audio/${plan.workletName}-worklet.ts`;
  return {
    // The SN76477 itself is satisfied by the board that contains it, so it is
    // a composition rather than a core of its own.
    executableTypes: [plan.deviceType, 'SN76477'],
    executable: {
      [plan.deviceType]: { kind: 'audio', artifact: worklet },
      SN76477: { kind: 'composition', artifact: worklet },
    },
    artifacts: [
      {
        path: `audio/${plan.workletName}.audio.ir.json`,
        contents: JSON.stringify(plan, null, 2),
      },
      { path: worklet, contents: generatedDiscreteSn76477WorkletSource(plan) },
    ],
  };
}
