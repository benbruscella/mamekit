import { readFileSync } from 'node:fs';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import {
  SAMPLES_IR_ARTIFACT,
  SAMPLES_WORKLET_ARTIFACT,
} from './definition.ts';

export function extractSamples(input: CapabilityInput): CapabilityExtraction | undefined {
  const entry = input.entries.find(candidate => candidate.type === 'SAMPLES');
  if (!entry?.definition) return undefined;
  const sourceFile = 'src/devices/sound/samples.cpp';
  const worklet = readFileSync(new URL('./samples-worklet.ts', import.meta.url), 'utf8');
  const plan = {
    schemaVersion: 1,
    type: 'SAMPLES',
    methods: ['start', 'stop', 'set_volume', 'playing'],
    sourceFiles: [sourceFile, 'src/devices/sound/samples.h'],
  };
  return {
    executableTypes: ['SAMPLES'],
    executable: {
      SAMPLES: { kind: 'audio', artifact: SAMPLES_WORKLET_ARTIFACT },
    },
    artifacts: [
      { path: SAMPLES_IR_ARTIFACT, contents: JSON.stringify(plan, null, 2) },
      { path: SAMPLES_WORKLET_ARTIFACT, contents: worklet },
    ],
    entrySourceFiles: { SAMPLES: plan.sourceFiles },
  };
}
