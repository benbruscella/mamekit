import { sourceTarget } from './source-contract.ts';

export const bublbobl = sourceTarget({
  game: 'bublbobl',
  driver: 'src/mame/taito/bublbobl.cpp',
  machine: { className: 'bublbobl_state', name: 'bublbobl' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
  frames: 1800,
  // CPUs compiled whole from MAME (#249) run heavier than the hand cores:
  // CI measured 23.5 fps against the floor of 25 (issue #247, 5.2).
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
      120: { video: '7fa0d66a', state: '14446204' },
      240: { video: '92a0e754', state: 'f3bad4de' },
      360: { video: 'b78f3578', state: '4df1c3c6' },
      600: { video: 'a3959c8a', state: 'b4b0de3e' },
      900: { video: 'd61320a7', state: 'e775ca59' },
      1200: { video: '188c0ae4', state: 'c9d3664c' },
      1800: { video: 'd473887c', state: '3cec002d' },
    },
    audio: {
      writes: 1459814,
      nonzeroWrites: 1436652,
      writeHash: 'fd3073eb',
      pcmHash: '4c0fd869',
      rms: 0.037101,
    },
  },
});
