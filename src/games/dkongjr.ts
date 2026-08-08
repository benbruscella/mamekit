import type { GameTestContract } from './types.ts';

export const dkongjr: GameTestContract = {
  game: 'dkongjr',
  category: 'arcade',
  driver: 'src/mame/nintendo/dkong.cpp',
  machine: { className: 'dkong_state', name: 'dkongjr' },
  romEnvironment: 'MAMEKIT_DKONGJR_ROM',
  screen: { width: 256, height: 224 },
  soundKind: 'discrete',
  frames: 1800,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 600, 1200, 1800],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1200, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 1380, code: 'Space', heldFrames: 20, releasedFrames: 20 },
    { atFrame: 1500, code: 'ArrowUp', heldFrames: 120, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      gfx1: 'c11b3325',
      gfx2: 'bd52a994',
      maincpu: '0c8e05ef',
      proms: '16fcc2e7',
      soundcpu: '715da5f8',
    },
    checkpoints: {
      1: { video: 'e12763c8', state: 'ba7c71dc' },
      60: { video: 'd22e74dd', state: 'd5c6a5a1' },
      180: { video: 'd22e74dd', state: '19c2469d' },
      300: { video: 'd22e74dd', state: 'f0ae1f5c' },
      600: { video: '9395ab8a', state: '1604d316' },
      1200: { video: 'f7286a9e', state: 'b71d97c2' },
      1800: { video: '08a90680', state: '3ed00d65' },
    },
    audio: {
      writes: 333008,
      nonzeroWrites: 274931,
      writeHash: '5ec07d82',
      pcmHash: '5a3dde77',
      rms: 0.096787,
    },
  },
};
