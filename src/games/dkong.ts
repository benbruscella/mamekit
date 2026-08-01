import type { GameTestContract } from './types.ts';

export const dkong: GameTestContract = {
  game: 'dkong',
  category: 'arcade',
  driver: 'src/mame/nintendo/dkong.cpp',
  machine: { className: 'dkong_state', name: 'dkong2b' },
  romEnvironment: 'MAMEKIT_DKONG_ROM',
  screen: { width: 256, height: 224 },
  soundKind: 'discrete',
  frames: 1800,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 600, 1200, 1800],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1350, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 1520, code: 'Space', heldFrames: 10, releasedFrames: 20 },
  ],
  audioRequirements: [
    {
      method: 'discrete.write_line_DS_DISCHARGE_INV',
      offset: 8,
      fromFrame: 0,
      minimumNonzeroWrites: 1,
    },
    { method: 'write', offset: 7, fromFrame: 330, minimumNonzeroWrites: 10_000 },
    {
      method: 'discrete.write_line_DS_SOUND2_INP',
      offset: 3,
      fromFrame: 330,
      minimumNonzeroWrites: 1,
    },
    {
      method: 'discrete.write_line_DS_SOUND0_INP',
      offset: 1,
      fromFrame: 1200,
      minimumNonzeroWrites: 1,
    },
    {
      method: 'discrete.write_line_DS_SOUND1_INP',
      offset: 2,
      fromFrame: 1200,
      minimumNonzeroWrites: 1,
    },
  ],
  minimumAudioRms: 0.02,
  shareRequirements: [{
    share: 'sprite_ram',
    minimumNonzeroBytes: 1,
    maximumNonzeroBytes: 128,
  }],
  golden: {
    regions: {
      gfx1: '4a641aaa',
      gfx2: 'fb7f3c49',
      maincpu: '777cf21b',
      proms: 'fe085bb3',
      soundcpu: 'c5c54e40',
    },
    checkpoints: {
      1: { video: '6c5e26cf', state: '7a04c9c5' },
      60: { video: '41ae7995', state: 'eb6113a2' },
      180: { video: '41ae7995', state: '13040f14' },
      300: { video: '41ae7995', state: '7eea4b3d' },
      600: { video: 'abb3312f', state: '753eaab7' },
      1200: { video: 'deb2719c', state: '89220096' },
      1800: { video: '20034a3e', state: '7e3c5818' },
    },
    audio: {
      writes: 341882,
      nonzeroWrites: 283415,
      writeHash: '604ad954',
      pcmHash: '0763dc4c',
      rms: 0.199089,
    },
  },
};
