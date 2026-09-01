import assert from 'node:assert/strict';
import {
  defaultGeneratorJobs,
  retryableGeneratorSignal,
  retryableRuntimeCrash,
} from './generator-workers.ts';

assert.equal(defaultGeneratorJobs(65, 12, 38 * 1024 ** 3), 8);
assert.equal(defaultGeneratorJobs(65, 12, 7 * 1024 ** 3), 1);
assert.equal(defaultGeneratorJobs(2, 12, 38 * 1024 ** 3), 2);
// No target count: the policy cap for independent isolated workers.
assert.equal(defaultGeneratorJobs(undefined, 12, 38 * 1024 ** 3), 8);
assert.equal(retryableGeneratorSignal('SIGBUS'), true);
assert.equal(retryableGeneratorSignal('SIGTERM'), false);

// Node's own type stripper can fault before any generated code runs. It exits
// 1 with a caught assertion rather than dying by signal, so the crash has to be
// recognised from what it printed or the whole run aborts on it.
assert.equal(retryableRuntimeCrash(
  'Error [ERR_INTERNAL_ASSERTION]: memory access out of bounds\n' +
  '    at parseTypeScript (node:internal/modules/typescript:79:16)',
), true);
assert.equal(retryableRuntimeCrash(
  'Error: rocnrope: driver source is missing a screen',
), false);
// A generation error that merely mentions memory is not a runtime crash.
assert.equal(retryableRuntimeCrash('Error: memory access out of bounds'), false);

console.log('generator-workers.spec: concurrency and crash retry policy passed');
