import assert from 'node:assert/strict';
import {
  requiresPlayableGeneration,
  REQUIRED_TARGETS as AUDIT_TARGETS,
} from './audit-generated.ts';
import { REQUIRED_TARGETS, CANDIDATE_TARGETS } from './targets.ts';

// The audit re-exports the target set so callers have one import. It must be
// the same set — the shape of that set is asserted in targets.spec.ts, which
// also proves it matches the acceptance contracts and the generated catalog.
assert.deepEqual([...AUDIT_TARGETS], [...REQUIRED_TARGETS]);
assert.equal(requiresPlayableGeneration('pacman', true), true,
  'catalogue visibility must retain the playability gate for accepted games');
for (const candidate of CANDIDATE_TARGETS) {
  assert.equal(requiresPlayableGeneration(candidate, true), false,
    'visible candidates remain experimental rather than accepted');
  assert.equal(requiresPlayableGeneration(candidate, false), false);
}
console.log('audit-generated.spec: target identity passed');
