import assert from 'node:assert/strict';
import { StreamingFrameResampler } from './audio-probe.ts';

const source = {
  render: () => Float32Array.of(1, 2, 3, 4, 5, 6, 7, 8),
};
const resampler = new StreamingFrameResampler(source, 8, 4, 1);
assert.deepEqual(
  [...resampler.render([])],
  [1, 3, 5, 7],
  'device-native samples must be decimated onto the probe output timeline',
);

// Fractional samples-per-frame carry must preserve the exact long-run output
// duration rather than rounding independently at every video frame.
const fractional = new StreamingFrameResampler({
  render: () => Float32Array.of(1, 1),
}, 5, 5, 4);
assert.equal(fractional.render([]).length, 1);
assert.equal(fractional.render([]).length, 1);
assert.equal(fractional.render([]).length, 1);
assert.equal(fractional.render([]).length, 2);

console.log('audio-probe.spec: streaming resample timeline passed');
