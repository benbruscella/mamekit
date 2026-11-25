import assert from 'node:assert/strict';
import { applySpeakerFilter } from '../../src/games/speaker-filter.ts';
import { foldForListener, wavChannelSides } from './mame-wav.ts';

const rate = 8000;
const tone = (amplitude: number) => Float32Array.from({ length: rate }, (_unused, index) =>
  amplitude * Math.sin(2 * Math.PI * 440 * index / rate));
const rms = (samples: Float32Array) => Math.sqrt(samples.reduce((sum, value) => sum + value * value, 0) / samples.length);

// A mono board with a silent second speaker (the C64's 1541 floppy sound): the
// listener hears the first whole, not their mean.
const c64 = foldForListener({ rate, channels: [tone(0.5), new Float32Array(rate)] }, { speakers: [{ tag: 'mono', sides: [0] }] });
assert.ok(Math.abs(rms(c64.mono) - rms(tone(0.5))) < 1e-6, 'an extra centred speaker adds, it does not halve');

// Two centred speakers (the NES's APU and a cartridge's addon) sum.
const nes = foldForListener({ rate, channels: [tone(0.25), tone(0.25)] }, { speakers: [{ tag: 'mono', sides: [0] }, { tag: 'addon', sides: [0] }] });
assert.ok(Math.abs(rms(nes.mono) - rms(tone(0.5))) < 1e-6, 'two centred speakers sum');

// A front pair is left and right; the mono is their mean.
const pair = foldForListener({ rate, channels: [tone(0.5), new Float32Array(rate)] }, { speakers: [{ tag: 'speaker', sides: [-1, 1] }] });
assert.ok(Math.abs(rms(pair.left) - rms(tone(0.5))) < 1e-6 && rms(pair.right) === 0, 'a left channel is on the left alone');
assert.ok(Math.abs(rms(pair.mono) - rms(tone(0.25))) < 1e-6, 'a side channel is half of the mono');

// Channels the layout cannot place, beside a side channel, are an error.
assert.throws(() => wavChannelSides(3, [{ tag: 'speaker', sides: [-1, 1] }]), /cannot be placed/);
assert.deepEqual(wavChannelSides(2, [{ tag: 'mono', sides: [0] }]), [0, 0]);

// The speaker effect is applied to MAME's side, which -wavwrite records
// before it: a DC step decays as it does through ours.
const filter = { type: 'highpass' as const, frequency: 20, q: 0.7071067, source: { file: 'filter.cpp', line: 1 } };
const step = new Float32Array(rate).fill(0.5);
const heard = foldForListener({ rate, channels: [step] }, { speakers: [{ tag: 'mono', sides: [0] }], speakerFilter: filter });
assert.deepEqual([...heard.mono], [...applySpeakerFilter(step, filter, rate)], 'the speaker highpass runs over MAME\'s channels');

console.log('mame-wav.spec: speaker fold and speaker effect passed');
