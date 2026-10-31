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
      1: { video: '6c5e26cf', state: '29379eb7' },
      60: { video: '41ae7995', state: 'd783bb3e' },
      180: { video: '41ae7995', state: 'f133c001' },
      300: { video: '41ae7995', state: '08e8cda0' },
      600: { video: '5c573a01', state: 'c90f8e50' },
      1200: { video: 'deb2719c', state: 'f3404c7a' },
      1800: { video: '8a54420d', state: '433db7fc' },
    },
    audio: {
      writes: 341882,
      nonzeroWrites: 283521,
      writeHash: '5b32829c',
      pcmHash: '8b3101ca',
      rms: 0.201015,
    },
  },
});
