// Re-enabled for issue #108, after issue #53 parked it as "doesn't boot".
//
// Verified against MAME 0.289 in attract mode with no input at all: our
// frame 600 is 0 differing pixels out of 57344 against MAME's.

import { sourceTarget } from './source-contract.ts';

export const trackfld = sourceTarget({
  game: 'trackfld',
  driver: 'src/mame/konami/trackfld.cpp',
  machine: { className: 'trackfld_state', name: 'trackfld' },
  screen: { width: 256, height: 224 },
  soundKind: 'sn76489',
  frames: 1200,
  minimumFps: 20,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 600, code: 'Space', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 720, code: 'KeyZ', heldFrames: 60, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: '9c119722',
      gfx1: '6a1076ce',
      gfx2: 'de1ce800',
      maincpu: 'fd90c93c',
      proms: 'b5a21e37',
      vlm: 'f546a56b',
    },
    checkpoints: {
      1: { video: '7dfcdedc', state: 'c8e0b79c' },
      60: { video: '1b2d0eec', state: 'd32342f3' },
      180: { video: '6f6992d8', state: '0ab3add5' },
      300: { video: '0dc8abd3', state: '6ead19d8' },
      600: { video: '5fcbfaa8', state: '687a750e' },
      900: { video: '73a5cbb7', state: '7082a766' },
      1200: { video: '8faba9c2', state: '793fd3b1' },
    },
    audio: {
      writes: 179383,
      nonzeroWrites: 14524,
      writeHash: '9122d24f',
      pcmHash: '962bcd43',
      rms: 0.372517,
    },
  },
});
