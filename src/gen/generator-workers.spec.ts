import assert from 'node:assert/strict';
import {
  defaultGeneratorJobs,
  retryableGeneratorSignal,
} from './generator-workers.ts';

assert.equal(defaultGeneratorJobs(65, 12, 38 * 1024 ** 3), 8);
assert.equal(defaultGeneratorJobs(65, 12, 7 * 1024 ** 3), 1);
assert.equal(defaultGeneratorJobs(2, 12, 38 * 1024 ** 3), 2);
// No target count: the policy cap for independent isolated workers.
assert.equal(defaultGeneratorJobs(undefined, 12, 38 * 1024 ** 3), 8);
assert.equal(retryableGeneratorSignal('SIGBUS'), true);
assert.equal(retryableGeneratorSignal('SIGTERM'), false);

console.log('generator-workers.spec: concurrency and crash retry policy passed');
