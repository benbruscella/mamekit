import assert from 'node:assert/strict';
import { audioLimitations } from './audio-fidelity.ts';
import { congo } from '../games/congo.game.ts';
import { panic } from '../games/panic.game.ts';
import { zaxxon } from '../games/zaxxon.game.ts';

assert.deepEqual(audioLimitations({ kind: 'sn76489' }), []);
assert.deepEqual(audioLimitations({ kind: 'sn76489', auxiliaryDevices: [{ type: 'SAMPLES' }] }),
  congo.acceptedAudioLimitations);
assert.deepEqual(audioLimitations({ kind: 'samples' }), panic.acceptedAudioLimitations);
assert.deepEqual(audioLimitations({ kind: 'samples' }), zaxxon.acceptedAudioLimitations);
assert.deepEqual(audioLimitations({ kind: 'ym2151' }), []);
console.log('audio-fidelity.spec: sample approximations are explicit and acknowledged');
