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
      1: { video: '1556d338', state: '79f7d3c7' },
      60: { video: '1556d338', state: 'dd92893b' },
      300: { video: '858502ae', state: 'aece38ce' },
      600: { video: '6280ae73', state: '85bcc5c0' },
      900: { video: '12053d6c', state: '8996ee77' },
      1200: { video: '84fe9bcd', state: '8b63a2a9' },
      1800: { video: '21ce9427', state: '50362eb1' },
      2400: { video: 'c753cd9f', state: 'b9ba2d69' },
    },
    audio: {
      writes: 1900799,
      nonzeroWrites: 1162225,
      writeHash: '6603dd9f',
      pcmHash: '9b46f7e4',
      rms: 0.084881,
    },
  },
});
