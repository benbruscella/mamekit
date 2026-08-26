import type { GameTestContract } from './types.ts';

export const crush: GameTestContract = {
  game: 'crush',
  category: 'arcade',
  driver: 'src/mame/pacman/pacman.cpp',
  machine: { className: 'pacman_state', name: 'korosuke' },
  romEnvironment: 'MAMEKIT_CRUSH_ROM',
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
      600: { video: '6280ae73', state: '6fa7d80d' },
      900: { video: '12053d6c', state: '14de4062' },
      1200: { video: '84fe9bcd', state: '653d8004' },
      1800: { video: '431bf063', state: '8f08c5be' },
      2400: { video: 'cea2e811', state: '748f6ec4' },
    },
    audio: {
      writes: 23605,
      nonzeroWrites: 9110,
      writeHash: '62eac0f4',
      pcmHash: 'e72761ca',
      rms: 0.086185,
    },
  },
};
