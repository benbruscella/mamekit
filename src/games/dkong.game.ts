import { sourceTarget } from './source-contract.ts';

export const dkong = sourceTarget({
  game: 'dkong',
  driver: 'src/mame/nintendo/dkong.cpp',
  machine: { className: 'dkong_state', name: 'dkong2b' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
  frames: 1800,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 600, 1200, 1800],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1350, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 1520, code: 'Space', heldFrames: 10, releasedFrames: 20 },
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
      1: { video: '6c5e26cf', state: '542795f1' },
      60: { video: '41ae7995', state: '129da7cd' },
      180: { video: '41ae7995', state: '7a84b739' },
      300: { video: '41ae7995', state: 'ea8ec91c' },
      600: { video: '5c573a01', state: '2e9e2634' },
      1200: { video: 'deb2719c', state: '2141b2b0' },
      1800: { video: '8a54420d', state: 'af9196ad' },
    },
    audio: {
      writes: 1425600,
      nonzeroWrites: 1425600,
      writeHash: '1e8cb055',
      pcmHash: 'fc44eafa',
      rms: 0.181778,
    },
  },
});
