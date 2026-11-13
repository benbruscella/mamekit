import { sourceTarget } from './source-contract.ts';

export const frogger = sourceTarget({
  game: 'frogger',
  driver: 'src/mame/galaxian/galaxian.cpp',
  machine: { className: 'galaxian_state', name: 'frogger' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
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
      1: { video: 'e1e3eb19', state: '1055b399' },
      60: { video: '10075d9f', state: '4e2e2274' },
      180: { video: '8f59fe5f', state: 'f813b01d' },
      300: { video: '44890969', state: '30c816d4' },
      480: { video: 'dde8c3ac', state: '0bfd2c80' },
      600: { video: '5b60f00b', state: '0d41e1a5' },
      900: { video: '8e5b4b09', state: '3c3944ed' },
    },
    audio: {
      writes: 712799,
      nonzeroWrites: 712799,
      writeHash: 'db2723f6',
      pcmHash: '78e74ecc',
      rms: 0.067505,
    },
  },
});
