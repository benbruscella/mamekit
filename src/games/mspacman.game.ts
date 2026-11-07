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
      1: { video: '1556d338', state: 'ab3ca5a5' },
      60: { video: '1556d338', state: 'fa709d43' },
      180: { video: '7a28e33b', state: '56aacae4' },
      300: { video: 'dee3b4f2', state: '51b3ef72' },
      600: { video: '3a636d63', state: '5856f006' },
      900: { video: '050c0b96', state: 'a3e22628' },
      1200: { video: 'f69d041d', state: '8fcf377b' },
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
