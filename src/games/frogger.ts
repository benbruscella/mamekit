import type { GameTestContract } from './types.ts';

export const frogger: GameTestContract = {
  game: 'frogger',
  category: 'arcade',
  driver: 'src/mame/galaxian/galaxian.cpp',
  machine: { className: 'galaxian_state', name: 'frogger' },
  romEnvironment: 'MAMEKIT_FROGGER_ROM',
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  frames: 900,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 480, 600, 900],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 390, code: 'ArrowUp', heldFrames: 30, releasedFrames: 20 },
    { atFrame: 450, code: 'ArrowRight', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: '2d4299f9',
      gfx1: '29b93069',
      maincpu: '0bd0d96c',
      proms: '413703bf',
    },
    checkpoints: {
      1: { video: 'e1e3eb19', state: '0002ddb2' },
      60: { video: '0657403c', state: '2d82db26' },
      180: { video: '8f59fe5f', state: '0711b4a8' },
      300: { video: '44890969', state: 'e305f774' },
      480: { video: 'a68ee068', state: '67703369' },
      600: { video: '0fd1ce5c', state: '0713f1d5' },
      900: { video: 'f2a8b8a4', state: '355b7668' },
    },
    audio: {
      writes: 1808,
      nonzeroWrites: 1723,
      writeHash: '6e9b32f7',
      pcmHash: 'f2bf27e0',
      rms: 0.013756,
    },
  },
};
