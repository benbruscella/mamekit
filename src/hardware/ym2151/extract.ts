import { readFileSync } from 'node:fs';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { YM2151_IR_ARTIFACT, YM2151_WORKLET_ARTIFACT } from './definition.ts';

export function extractYm2151(input: CapabilityInput): CapabilityExtraction | undefined {
  const entry = input.entries.find(candidate => candidate.type === 'YM2151');
  if (!entry?.definition) return undefined;
  const sourceFiles = [
    'src/devices/sound/ymopm.cpp',
    'src/devices/sound/ymopm.h',
    '3rdparty/ymfm/src/ymfm_opm.cpp',
    '3rdparty/ymfm/src/ymfm_opm.h',
  ];
  const plan = {
    schemaVersion: 1,
    type: 'YM2151',
    channels: 8,
    operators: 4,
    addressPort: 0,
    dataPort: 1,
    busyClocks: 32,
    sourceFiles,
  };
  return {
    executableTypes: ['YM2151'],
    executable: { YM2151: { kind: 'audio', artifact: YM2151_WORKLET_ARTIFACT } },
    artifacts: [
      { path: YM2151_IR_ARTIFACT, contents: JSON.stringify(plan, null, 2) },
      {
        path: YM2151_WORKLET_ARTIFACT,
        contents: readFileSync(new URL('./ym2151-worklet.ts', import.meta.url), 'utf8'),
      },
    ],
    entrySourceFiles: { YM2151: sourceFiles },
  };
}
