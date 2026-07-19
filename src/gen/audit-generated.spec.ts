import assert from 'node:assert/strict';
import { REQUIRED_TARGETS } from './audit-generated.ts';
import { PLAYABLE_TARGETS } from './targets.ts';

assert.equal(REQUIRED_TARGETS.length, 13);
assert.deepEqual(REQUIRED_TARGETS.slice(-2), ['timeplt', 'nes']);
assert.equal(new Set(REQUIRED_TARGETS).size, REQUIRED_TARGETS.length);
assert.deepEqual(PLAYABLE_TARGETS, ['pacman']);
assert.ok(PLAYABLE_TARGETS.every(target => REQUIRED_TARGETS.includes(target)));

console.log('audit-generated.spec: 5 passed');
