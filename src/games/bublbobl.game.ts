import { sourceTarget } from './source-contract.ts';

export const bublbobl = sourceTarget({
  game: 'bublbobl',
  driver: 'src/mame/taito/bublbobl.cpp',
  machine: { className: 'bublbobl_state', name: 'bublbobl' },
  screen: { width: 256, height: 224 },
  soundKind: 'ym2203',
  frames: 1800,
  minimumFps: 25,
  checkpoints: [1, 120, 240, 360, 600, 900, 1200, 1800],
  actions: [
    { atFrame: 100, code: 'Digit5', heldFrames: 5, releasedFrames: 5 },
    { atFrame: 112, code: 'Digit1', heldFrames: 5, releasedFrames: 5 },
    { atFrame: 900, code: 'ArrowRight', heldFrames: 180, releasedFrames: 20 },
    { atFrame: 1120, code: 'Space', heldFrames: 20, releasedFrames: 20 },
    { atFrame: 1250, code: 'ArrowLeft', heldFrames: 180, releasedFrames: 20 },
    { atFrame: 1500, code: 'KeyZ', heldFrames: 20, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: 'b7d41320',
      gfx1: 'ee8e34eb',
      maincpu: '5db9ecc7',
      mcu: 'b1bfb53d',
      plds: 'ff41d912',
      proms: '2d0f8545',
      subcpu: '9214c9d7',
    },
    checkpoints: {
      1: { video: 'f7e6ac81', state: 'f28cc4d2' },
      120: { video: '48769713', state: '368db247' },
      240: { video: '3bc5e4ba', state: 'ed6c99ea' },
      360: { video: '66bd9956', state: '5e6cd603' },
      600: { video: 'a3959c8a', state: '02abf230' },
      900: { video: 'd61320a7', state: '77f8bc32' },
      1200: { video: '1cb87fac', state: '72393de3' },
      1800: { video: 'd473887c', state: '7e258701' },
    },
    audio: {
      writes: 52224,
      nonzeroWrites: 50501,
      writeHash: 'eb360cf6',
      pcmHash: 'bce1cbf5',
      rms: 0.037738,
    },
  },
});
