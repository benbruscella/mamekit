import { sourceTarget } from './source-contract.ts';

export const crush = sourceTarget({
  game: 'crush',
  driver: 'src/mame/pacman/pacman.cpp',
  machine: { className: 'pacman_state', name: 'korosuke' },
  screen: { width: 288, height: 224 },
  soundKind: 'wsg',
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
      1: { video: '1556d338', state: 'a50f0178' },
      60: { video: '1556d338', state: '04d9f0ab' },
      300: { video: '858502ae', state: 'b0f87c77' },
      600: { video: '6280ae73', state: '3d24fa1c' },
      900: { video: '12053d6c', state: 'eef194c1' },
      1200: { video: '84fe9bcd', state: 'ca4a174c' },
      1800: { video: '21ce9427', state: 'a35e1ff6' },
      2400: { video: 'c753cd9f', state: 'b4ea81dc' },
    },
    audio: {
      writes: 23621,
      nonzeroWrites: 9114,
      writeHash: 'e6a914b9',
      pcmHash: '2f340cd7',
      rms: 0.085937,
    },
  },
});
