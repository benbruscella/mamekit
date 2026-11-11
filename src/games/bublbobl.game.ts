import { sourceTarget } from './source-contract.ts';

export const bublbobl = sourceTarget({
  game: 'bublbobl',
  driver: 'src/mame/taito/bublbobl.cpp',
  machine: { className: 'bublbobl_state', name: 'bublbobl' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
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
      1: { video: 'f7e6ac81', state: 'd9c6cbe5' },
      120: { video: '48769713', state: 'd74c34e5' },
      240: { video: '3bc5e4ba', state: '5a9be67b' },
      360: { video: '66bd9956', state: 'b32ddd66' },
      600: { video: 'a3959c8a', state: 'a7d92f12' },
      900: { video: 'd61320a7', state: '00bb5a77' },
      1200: { video: '1cb87fac', state: '1a037e15' },
      1800: { video: 'd473887c', state: 'fb878be6' },
    },
    audio: {
      writes: 1459814,
      nonzeroWrites: 1436647,
      writeHash: '98e0cd62',
      pcmHash: '382122e3',
      rms: 0.03708,
    },
  },
});
