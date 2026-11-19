import { sourceTarget } from './source-contract.ts';

export const bublbobl = sourceTarget({
  game: 'bublbobl',
  driver: 'src/mame/taito/bublbobl.cpp',
  machine: { className: 'bublbobl_state', name: 'bublbobl' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
  frames: 1800,
  // CPUs compiled whole from MAME (#249) run heavier than the hand cores:
  // CI measured 23.5 fps against the floor of 25, so the floor is about 90% of that.
  minimumFps: 21,
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
      1: { video: 'f7e6ac81', state: 'f6df4ee0' },
      120: { video: 'a6b3fa6f', state: '609a8d21' },
      240: { video: 'e7f73aa2', state: 'f3bad4de' },
      360: { video: '9d72f94d', state: '4df1c3c6' },
      600: { video: 'a3959c8a', state: '6cf685ee' },
      900: { video: 'd61320a7', state: 'e775ca59' },
      1200: { video: '188c0ae4', state: 'c9d3664c' },
      1800: { video: 'd473887c', state: '3cec002d' },
    },
    audio: {
      writes: 1459814,
      nonzeroWrites: 1436652,
      writeHash: 'd9d04a9b',
      pcmHash: '25707322',
      rms: 0.037102,
    },
  },
});
