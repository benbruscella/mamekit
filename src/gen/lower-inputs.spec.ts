import assert from 'node:assert/strict';
import { reversedRest } from './lower-inputs.ts';

// A PORT_REVERSE relative field reads ~x in MAME 0.289 (apply_settings
// reverses from one past the range), so it rests at its mask, not at zero.
assert.equal(reversedRest(0, 0xff), 0xff, 'Centipede and Marble Madness: 0xff');
assert.equal(reversedRest(0, 0x0f), 0x0f, "Missile Command's 4-bit trackball: 0x0f");
assert.equal(reversedRest(0, 0xf0), 0xf0, 'a field above bit 0 rests at its own mask');
assert.equal(reversedRest(0x10, 0xff), 0xef, 'a default other than zero reverses with it');

console.log('lower-inputs.spec: ok');
