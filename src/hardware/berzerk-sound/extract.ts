import { readFileSync } from 'node:fs';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { BERZERK_SOUND_IR_ARTIFACT, BERZERK_SOUND_WORKLET_ARTIFACT } from './definition.ts';

export function extractBerzerkSound(input: CapabilityInput): CapabilityExtraction | undefined {
  if (!['EXIDY', 'S14001A', 'FILTER_VOLUME'].every(type =>
    input.entries.some(entry => entry.type === type && entry.definition))) return undefined;
  const sourceFiles = [
    'src/mame/shared/exidysound.cpp', 'src/devices/sound/s14001a.cpp',
    'src/devices/sound/flt_vol.cpp', 'src/mame/stern/berzerk.cpp',
  ];
  const plan = {
    schemaVersion: 1, type: 'BERZERK_SOUND', sh6840Channels: 3,
    speechClock: 2_500_000, speechDataBits: 6, sourceFiles,
  };
  return {
    executableTypes: ['EXIDY', 'S14001A', 'FILTER_VOLUME'],
    executable: {
      EXIDY: { kind: 'audio', artifact: BERZERK_SOUND_WORKLET_ARTIFACT },
      S14001A: { kind: 'composition', artifact: BERZERK_SOUND_WORKLET_ARTIFACT },
      FILTER_VOLUME: { kind: 'composition', artifact: BERZERK_SOUND_WORKLET_ARTIFACT },
    },
    artifacts: [
      { path: BERZERK_SOUND_IR_ARTIFACT, contents: JSON.stringify(plan, null, 2) },
      { path: BERZERK_SOUND_WORKLET_ARTIFACT,
        contents: readFileSync(new URL('./berzerk-sound-worklet.ts', import.meta.url), 'utf8') },
    ],
    entrySourceFiles: Object.fromEntries(
      ['EXIDY', 'S14001A', 'FILTER_VOLUME'].map(type => [type, sourceFiles]),
    ),
  };
}
