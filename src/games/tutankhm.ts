import type { GameTestContract } from './types.ts';

export const tutankhm: GameTestContract = {
  game: 'tutankhm',
  category: 'arcade',
  driver: 'src/mame/konami/tutankhm.cpp',
  machine: { className: 'tutankhm_state', name: 'tutankhm' },
  romEnvironment: 'MAMEKIT_TUTANKHM_ROM',
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  frames: 1200,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'KeyL', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      maincpu: '1aa48a17',
      'timeplt_audio:tpsound': 'c196904d',
    },
    checkpoints: {
      1: { video: 'f7e6ac81', state: 'c1ab7eea' },
      60: { video: 'f7e6ac81', state: '4d8cb559' },
      180: { video: '0d63df78', state: '68b39a1f' },
      300: { video: '7a944db9', state: '3b8cc450' },
      600: { video: 'e24cbb8e', state: '24068f63' },
      900: { video: '62c0a2d9', state: '96812add' },
      1200: { video: '8d6d604e', state: '81ec3b93' },
    },
    audio: {
      writes: 15692,
      nonzeroWrites: 10159,
      writeHash: '4b267cf4',
      pcmHash: '24783a92',
      rms: 0.011443,
    },
  },
};
