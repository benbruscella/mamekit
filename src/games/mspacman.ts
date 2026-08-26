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
      60: { video: '1556d338', state: '3665b638' },
      180: { video: '7a28e33b', state: '1e93e277' },
      300: { video: '7f4823fb', state: 'c4670247' },
      600: { video: '1c002b8f', state: 'f868e1d4' },
      900: { video: 'c104ec3d', state: '40410db8' },
      1200: { video: '8ed9aba3', state: 'a74dfaa3' },
    },
    audio: {
      writes: 17231,
      nonzeroWrites: 10163,
      writeHash: 'bb3717b7',
      pcmHash: '38b57128',
      rms: 0.082964,
    },
  },
});
