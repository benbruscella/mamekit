import assert from 'node:assert/strict';
import { GeneratedBerzerkSoundCore } from './berzerk-sound-worklet.ts';

const core = new GeneratedBerzerkSoundCore(48_000, undefined, true);
for (const [offset, data] of [
  [3, 0x30], [3, 0x70], [3, 0xb0],
  [2, 0xb8], [2, 0x1a],
  [1, 0x35], [1, 0x15],
  [0, 0xd5], [0, 0x11],
] as const) {
  core.write(offset, data, 'sh8253_w');
}

let energy = 0;
for (let sample = 0; sample < 4_800; sample++) {
  const value = core.sample();
  assert.ok(value >= -1 && value <= 1);
  energy += value * value;
}
assert.ok(Math.sqrt(energy / 4_800) > 0.05, 'Venture 8253 music should be audible');

for (const [offset, data] of [[3, 0x30], [3, 0x70], [3, 0xb0]] as const) {
  core.write(offset, data, 'sh8253_w');
}
let stoppedEnergy = 0;
for (let sample = 0; sample < 4_800; sample++) {
  const value = core.sample();
  stoppedEnergy += value * value;
}
assert.equal(stoppedEnergy, 0, 'a new control word must stop the old divider');

console.log('berzerk-sound-worklet.spec: 3 passed, 0 failed');
