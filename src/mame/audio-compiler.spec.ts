import assert from 'node:assert/strict';
import { analogValue, compileMameSpeakerFilter } from './audio-compiler.ts';

const mameSrc = process.env.MAME_SRC ?? '../mame';
assert.deepEqual(compileMameSpeakerFilter(mameSrc), {
  type: 'highpass',
  frequency: 20,
  q: 0.7071067,
  source: {
    file: 'src/emu/audio_effects/filter.cpp',
    line: 67,
  },
});
assert.equal(analogValue('RES_K(150)'), 150_000);
assert.ok(Math.abs(analogValue('CAP_P(470)') - 470e-12) < 1e-18);

console.log('audio-compiler.spec: speaker filter and component values passed');
