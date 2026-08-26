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
      60: { video: 'f7e6ac81', state: 'c3f329a5' },
      180: { video: '0d63df78', state: '0b406a9b' },
      300: { video: '7a944db9', state: '8e97cf61' },
      600: { video: 'e24cbb8e', state: '6d987951' },
      900: { video: '62c0a2d9', state: '140c6563' },
      1200: { video: '8d6d604e', state: '62abdc8b' },
    },
    audio: {
      writes: 17324,
      nonzeroWrites: 11317,
      writeHash: '52304ee9',
      pcmHash: 'a91b766d',
      rms: 0.009872,
    },
  },
};
