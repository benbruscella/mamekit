import { sourceTarget } from './source-contract.ts';

export const crush = sourceTarget({
  game: 'crush',
  driver: 'src/mame/pacman/pacman.cpp',
  machine: { className: 'pacman_state', name: 'korosuke' },
  screen: { width: 288, height: 224 },
  soundKind: 'stream',
  frames: 2400,
  minimumFps: 45,
  checkpoints: [1, 60, 300, 600, 900, 1200, 1800, 2400],
  actions: [
    // Crush Roller ignores coins during its long power-on/title sequence.
    { atFrame: 900, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 930, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1200, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 1500, code: 'ArrowDown', heldFrames: 120, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      gfx1: '32e09792',
      maincpu: '4e781e43',
      namco: '3f2ff826',
      proms: '9cbbf764',
    },
    checkpoints: {
      1: { video: '1556d338', state: '36c20b0f' },
      60: { video: '1556d338', state: 'e787d80d' },
      300: { video: '858502ae', state: 'ef936cb1' },
      600: { video: '6280ae73', state: 'c0eb6ec4' },
      900: { video: '12053d6c', state: '39edca8e' },
      1200: { video: '84fe9bcd', state: '9f3b5cb1' },
      1800: { video: '21ce9427', state: 'f42a1079' },
      2400: { video: 'c753cd9f', state: '0d986ec9' },
    },
    audio: {
      writes: 1900799,
      nonzeroWrites: 1162231,
      writeHash: '460a58e9',
      pcmHash: 'e15c878d',
      rms: 0.084881,
    },
  },
});
