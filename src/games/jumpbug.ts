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
      180: { video: 'dd3bde1f', state: 'e57ed450' },
      300: { video: '60abdc29', state: 'b9edfbfa' },
      600: { video: 'b7b129e1', state: 'c7341c19' },
      900: { video: 'd9be84d6', state: '500b6be2' },
      1200: { video: 'da53e24d', state: '259e2dc1' },
    },
    audio: {
      writes: 2944,
      nonzeroWrites: 1379,
      writeHash: '8f87ca4a',
      pcmHash: 'f2591d7f',
      rms: 0.114905,
    },
  },
};
