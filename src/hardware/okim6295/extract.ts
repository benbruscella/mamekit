import { readFileSync } from 'node:fs';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { OKIM6295_IR_ARTIFACT, OKIM6295_WORKLET_ARTIFACT } from './definition.ts';

export function extractOkim6295(input: CapabilityInput): CapabilityExtraction | undefined {
  const entry = input.entries.find(candidate => candidate.type === 'OKIM6295');
  if (!entry?.definition) return undefined;
  const sourceFiles = [
    'src/devices/sound/okim6295.cpp',
    'src/devices/sound/okim6295.h',
    'src/devices/sound/okiadpcm.cpp',
    'src/devices/sound/okiadpcm.h',
  ];
  const plan = {
    schemaVersion: 1,
    type: 'OKIM6295',
    voices: 4,
    addressMask: 0x3ffff,
    divisors: { pin7Low: 165, pin7High: 132 },
    command: { sampleMask: 0x7f, startMask: 0x80, voiceShift: 4, stopShift: 3 },
    sourceFiles,
  };
  return {
    executableTypes: ['OKIM6295'],
    executable: { OKIM6295: { kind: 'audio', artifact: OKIM6295_WORKLET_ARTIFACT } },
    artifacts: [
      { path: OKIM6295_IR_ARTIFACT, contents: JSON.stringify(plan, null, 2) },
      {
        path: OKIM6295_WORKLET_ARTIFACT,
        contents: readFileSync(new URL('./okim6295-worklet.ts', import.meta.url), 'utf8'),
      },
    ],
    entrySourceFiles: { OKIM6295: sourceFiles },
  };
}
