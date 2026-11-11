import { sourceTarget } from './source-contract.ts';

export const mspacman = sourceTarget({
  game: 'mspacman',
  driver: 'src/mame/pacman/pacman.cpp',
  machine: { className: 'pacman_state', name: 'mspacman' },
  screen: { width: 288, height: 224 },
  soundKind: 'stream',
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
      1: { video: '1556d338', state: 'd481f6a9' },
      60: { video: '1556d338', state: '8004dcf4' },
      180: { video: '7a28e33b', state: 'ca65322d' },
      300: { video: 'dee3b4f2', state: '68e519e1' },
      600: { video: '3a636d63', state: 'ba96df75' },
      900: { video: '050c0b96', state: 'b8da62db' },
      1200: { video: 'f69d041d', state: '3b2c2dcd' },
    },
    audio: {
      writes: 950400,
      nonzeroWrites: 693772,
      writeHash: '490458a7',
      pcmHash: '891d09a2',
      rms: 0.082267,
    },
  },
});
