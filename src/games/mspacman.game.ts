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
      1: { video: '1556d338', state: '5fcfde18' },
      60: { video: '1556d338', state: 'd72c2a61' },
      180: { video: '7a28e33b', state: '54351ad0' },
      300: { video: 'dee3b4f2', state: '69aa43d9' },
      600: { video: '3a636d63', state: '2f71864d' },
      900: { video: '47c0a761', state: '900aa3d1' },
      1200: { video: '1dac40ae', state: '1d3a4d72' },
    },
    audio: {
      writes: 950399,
      nonzeroWrites: 693759,
      writeHash: '7af03f6e',
      pcmHash: '58f1e90e',
      rms: 0.082497,
    },
  },
});
