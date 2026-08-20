// DISABLED: this target is not discovered, generated or shipped.
//
// Play-test finding, issue #53: Rounds start and then move on to the next one
// without any user input.
//
// Move this module and its spec back up to src/games/ to re-enable the
// target once the fault is fixed.

import { sourceTarget } from '../source-contract.ts';

export const arkanoid = sourceTarget({
  game: 'arkanoid',
  driver: 'src/mame/taito/arkanoid.cpp',
  machine: { className: 'arkanoid_state', name: 'arkanoid' },
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 780, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      alt_mcus: '66e88525',
      gfx1: '10b018c2',
      maincpu: '97c6b2e3',
      'mcu:mcu': '0be83647',
      proms: 'a337c91d',
    },
    checkpoints: {
      1: { video: 'f3eb6659', state: '15a1108a' },
      60: { video: '0f0c7077', state: '62843acf' },
      180: { video: 'efa6107e', state: '74d35ba7' },
      300: { video: 'efa6107e', state: 'cc316846' },
      600: { video: '1f046a3b', state: '80351a6b' },
      900: { video: 'dff464d1', state: '52b66504' },
      1200: { video: '537213bc', state: '6cf02ebf' },
    },
    audio: {
      writes: 1617,
      nonzeroWrites: 1118,
      writeHash: '49e44bbb',
      pcmHash: 'ddaee97a',
      rms: 0.252242,
    },
  },
});
