import type { GameTestContract } from './types.ts';

export const jumpbug: GameTestContract = {
  game: 'jumpbug',
  category: 'arcade',
  driver: 'src/mame/galaxian/galaxian.cpp',
  machine: { className: 'galaxian_state', name: 'jumpbug' },
  romEnvironment: 'MAMEKIT_JUMPBUG_ROM',
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  frames: 1200,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      gfx1: '44240cbe',
      maincpu: '78ffa1b8',
      proms: '6a0c7d87',
    },
    checkpoints: {
      1: { video: 'b2afb37a', state: '1103d631' },
      60: { video: 'f7e6ac81', state: 'e297193f' },
      180: { video: '60a080bc', state: 'e57ed450' },
      300: { video: '5aab2410', state: 'b9edfbfa' },
      600: { video: 'd59b9110', state: 'c7341c19' },
      900: { video: 'b85ea2a1', state: '500b6be2' },
      1200: { video: 'd5f80efc', state: '259e2dc1' },
    },
    audio: {
      writes: 2944,
      nonzeroWrites: 1379,
      writeHash: '354f8746',
      pcmHash: '4041b1ef',
      rms: 0.114613,
    },
  },
};
