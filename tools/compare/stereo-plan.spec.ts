import assert from 'node:assert/strict';
import { compareStereo } from './stereo-plan.ts';

// Two tones whose loudness moves apart over time: the left swells while the
// right fades. Played the same way they match; swapped, `crossed` wins.
const rate = 8000;
const tone = (envelope: (t: number) => number, frequency: number) => Float32Array.from({ length: rate * 2 }, (_unused, index) =>
  envelope(index / rate) * Math.sin(2 * Math.PI * frequency * index / rate));
const left = tone(t => t / 2, 440);
const right = tone(t => 1 - t / 2, 660);
const mame = { rate, channels: [left, right] };

const same = compareStereo({ rate, channels: [left, right] }, mame);
assert.ok(Math.abs(same.leftDb) < 0.01 && Math.abs(same.rightDb) < 0.01, 'identical sides are 0 dB apart');
assert.ok(same.envelope.same > 0.99 && same.envelope.crossed < 0, 'identical sides follow each other, not the other side');
assert.ok(Math.abs(same.width.ours - same.width.mame) < 0.01);

const swapped = compareStereo({ rate, channels: [right, left] }, mame);
assert.ok(swapped.envelope.crossed > swapped.envelope.same, 'a swapped pair follows the other side');

const mono = compareStereo({ rate, channels: [left, left] }, mame);
assert.ok(mono.width.ours < -60 && mono.width.mame > -20, 'a mono pair has no width');

console.log('compare/stereo-plan.spec: sides, width and swaps measured');
