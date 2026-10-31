import { sourceTarget } from './source-contract.ts';

export const mspacman = sourceTarget({
  game: 'mspacman',
  driver: 'src/mame/pacman/pacman.cpp',
  machine: { className: 'pacman_state', name: 'mspacman' },
  screen: { width: 288, height: 224 },
  soundKind: 'wsg',
  // The cabinet is a four-way joystick and nothing else: no button to press.
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowLeft', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'ArrowUp', heldFrames: 120, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      gfx1: '6c26a65d',
      maincpu: '9f50b3d6',
      namco: '3f2ff826',
      proms: 'c1e7e6a7',
    },
    checkpoints: {
      1: { video: '1556d338', state: '0e2ea5f3' },
      60: { video: '1556d338', state: 'ee654d37' },
      180: { video: '7a28e33b', state: '2c4f2578' },
      300: { video: 'dee3b4f2', state: '4eb22818' },
      600: { video: '3a636d63', state: '40d296ec' },
      900: { video: '050c0b96', state: 'ff1963dd' },
      1200: { video: 'f69d041d', state: '3968bd79' },
    },
    audio: {
      writes: 17231,
      nonzeroWrites: 10162,
      writeHash: '749efd6c',
      pcmHash: 'a6eeab43',
      rms: 0.082727,
    },
  },
});
