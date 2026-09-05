// Re-enabled for issue #108, after issue #53 parked it as "messed up".
//
// Verified against MAME 0.289 in attract mode with no input at all: our
// frame 200 and frame 600 are both 0 differing pixels out of 53760 against
// the same frames of MAME's own snapshot.

import { sourceTarget } from './source-contract.ts';

export const gberet = sourceTarget({
  game: 'gberet',
  driver: 'src/mame/konami/gberet.cpp',
  machine: { className: 'gberet_state', name: 'gberet' },
  screen: { width: 240, height: 224 },
  soundKind: 'sn76489',
  frames: 1200,
  minimumFps: 30,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 180, releasedFrames: 20 },
    { atFrame: 820, code: 'Space', heldFrames: 20, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      maincpu: '2e6a0e9a',
      proms: '9e17432e',
      sprites: 'df6c4a50',
      tiles: '4da7bd1b',
    },
    checkpoints: {
      1: { video: '95e26824', state: '7e1a74a6' },
      60: { video: '97f1d581', state: 'e1bb955a' },
      180: { video: 'e1aa1a2a', state: '8330a706' },
      300: { video: '7902484b', state: '0e64542a' },
      600: { video: 'e57374fe', state: 'a55aae12' },
      900: { video: '7b53ad1c', state: '0957d118' },
      1200: { video: '6cca50f6', state: 'e314bd85' },
    },
    audio: {
      writes: 1450,
      nonzeroWrites: 1322,
      writeHash: '794058db',
      pcmHash: '3ccdc6a5',
      rms: 0.021515,
    },
  },
});
