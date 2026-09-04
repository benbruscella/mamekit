import assert from 'node:assert/strict';
import {
  auxiliarySoundConfigFailures,
  REQUIRED_TARGETS as AUDIT_TARGETS,
} from './audit-generated.ts';
import { REQUIRED_TARGETS } from './targets.ts';

// The audit re-exports the target set so callers have one import. It must be
// the same set — the shape of that set is asserted in targets.spec.ts, which
// also proves it matches the acceptance contracts and the generated catalog.
assert.deepEqual([...AUDIT_TARGETS], [...REQUIRED_TARGETS]);
assert.deepEqual(
  auxiliarySoundConfigFailures(
    'congo',
    { auxiliaryDevices: [{ type: 'SAMPLES', deviceTag: 'samples' }] },
    { auxiliaryDevices: [] },
  ),
  ['congo: board IR routes auxiliary sound samples:SAMPLES but the app config omits it'],
);
assert.deepEqual(
  auxiliarySoundConfigFailures(
    'congo',
    { auxiliaryDevices: [{ type: 'SAMPLES', deviceTag: 'samples' }] },
    { auxiliaryDevices: [{ type: 'SAMPLES', deviceTag: 'samples' }] },
  ),
  [],
);

console.log('audit-generated.spec: target identity and sound-surface parity passed');
