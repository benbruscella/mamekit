import type { GameTestContract } from './types.ts';

export const dkong: GameTestContract = {
  game: 'dkong',
  category: 'arcade',
  driver: 'src/mame/nintendo/dkong.cpp',
  machine: { className: 'dkong_state', name: 'dkong2b' },
  romEnvironment: 'MAMEKIT_DKONG_ROM',
  screen: { width: 256, height: 224 },
  soundKind: 'discrete',
  frames: 900,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 480, 600, 900],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 390, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 480, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      gfx1: '4a641aaa',
      gfx2: 'fb7f3c49',
      maincpu: '777cf21b',
      proms: 'fe085bb3',
      soundcpu: 'c5c54e40',
    },
    checkpoints: {
      1: { video: '540dc572', state: '35295e2a' },
      60: { video: 'bec7bcbf', state: 'f4583530' },
      180: { video: 'bec7bcbf', state: '31653a21' },
      300: { video: 'bec7bcbf', state: '2d2a94af' },
      480: { video: 'e5b8e175', state: '83219c32' },
      600: { video: 'ca5e95cf', state: 'ba583b18' },
      900: { video: 'b0b06e58', state: '35077e42' },
    },
    audio: {
      writes: 157763,
      nonzeroWrites: 153510,
      writeHash: 'e6cb6e71',
      pcmHash: '2f9e7232',
      rms: 0.017465,
    },
  },
};
