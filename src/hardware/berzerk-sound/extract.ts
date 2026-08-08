import { readFileSync } from 'node:fs';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { BERZERK_SOUND_IR_ARTIFACT, BERZERK_SOUND_WORKLET_ARTIFACT } from './definition.ts';

export function extractBerzerkSound(input: CapabilityInput): CapabilityExtraction | undefined {
  const audioTypes = ['EXIDY', 'EXIDY_VENTURE'].filter(type =>
    input.entries.some(entry => entry.type === type && entry.definition));
  if (!audioTypes.length) return undefined;
  const compositionTypes = ['S14001A', 'FILTER_VOLUME'].filter(type =>
    input.entries.some(entry => entry.type === type && entry.definition));
  const executableTypes = [...audioTypes, ...compositionTypes];
  const sourceFiles = [
    'src/mame/shared/exidysound.cpp', 'src/devices/sound/s14001a.cpp',
    'src/devices/sound/flt_vol.cpp', 'src/mame/stern/berzerk.cpp',
  ];
  const plan = {
    schemaVersion: 1, type: 'BERZERK_SOUND', sh6840Channels: 3,
    speechClock: 2_500_000, speechDataBits: 6, sourceFiles,
  };
  return {
    executableTypes,
    executable: Object.fromEntries(executableTypes.map(type => [type, {
      kind: audioTypes.includes(type) ? 'audio' : 'composition',
      artifact: BERZERK_SOUND_WORKLET_ARTIFACT,
    }])),
    artifacts: [
      { path: BERZERK_SOUND_IR_ARTIFACT, contents: JSON.stringify(plan, null, 2) },
      { path: BERZERK_SOUND_WORKLET_ARTIFACT,
        contents: readFileSync(new URL('./berzerk-sound-worklet.ts', import.meta.url), 'utf8') },
    ],
    entrySourceFiles: Object.fromEntries(
      executableTypes.map(type => [type, sourceFiles]),
    ),
  };
}
