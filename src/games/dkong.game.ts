import { sourceTarget } from './source-contract.ts';

export const dkong = sourceTarget({
  game: 'dkong',
  driver: 'src/mame/nintendo/dkong.cpp',
  machine: { className: 'dkong_state', name: 'dkong2b' },
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
      // Kong lands repeatedly while bending the girders. One incidental
      // latch write is insufficient coverage for this distinctive effect.
      minimumNonzeroWrites: 5,
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
      60: { video: '41ae7995', state: '48e16c2b' },
      180: { video: '41ae7995', state: 'c36fabc5' },
      300: { video: '41ae7995', state: 'ff2bc081' },
      600: { video: 'abb3312f', state: '6660e3c8' },
      1200: { video: 'deb2719c', state: '07c59722' },
      1800: { video: 'd32b5043', state: '76ab211b' },
    },
    audio: {
      writes: 341878,
      nonzeroWrites: 283519,
      writeHash: 'fc4d9b59',
      pcmHash: '2715779a',
      rms: 0.200678,
    },
  },
});
