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
      1: { video: 'f7e6ac81', state: 'fe8167b4' },
      120: { video: 'fa49732f', state: '7c5ddf55' },
      240: { video: '9a1a17ee', state: 'b8f21db2' },
      360: { video: 'cf51720d', state: '2ffbde2e' },
      600: { video: 'a3959c8a', state: 'f28386e5' },
      900: { video: 'd61320a7', state: 'bc0d28de' },
      1200: { video: 'a514377c', state: '02123291' },
      1800: { video: 'd473887c', state: '3f17ea61' },
    },
    audio: {
      writes: 52230,
      nonzeroWrites: 50507,
      writeHash: 'b661f2fb',
      pcmHash: '080b52ff',
      rms: 0.037806,
    },
  },
});
