import { sourceTarget } from './source-contract.ts';

export const scramble = sourceTarget({
  game: 'scramble',
  driver: 'src/mame/galaxian/galaxian.cpp',
  machine: { className: 'galaxian_state', name: 'scramble' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
  frames: 900,
  // CPUs compiled whole from MAME (#249) run heavier than the hand cores:
  // CI measured 42.1 fps against the floor of 45 (issue #247, 5.2).
  minimumFps: 37,
  checkpoints: [1, 60, 180, 300, 480, 600, 900],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    // Scramble is still on its PLAYER ONE transition at frame 510. Exercise
    // both live fire inputs once the ship is accepting controls.
    { atFrame: 570, code: 'Space', heldFrames: 20, releasedFrames: 10 },
    { atFrame: 610, code: 'KeyZ', heldFrames: 20, releasedFrames: 10 },
    { atFrame: 650, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: 'ab3f2efe',
      gfx1: '85211f51',
      maincpu: 'd404a433',
      proms: '4e3caeab',
    },
    checkpoints: {
      1: { video: 'f8cedb79', state: '09192497' },
      60: { video: '7b8e7e80', state: 'cdc13d36' },
      180: { video: '526252b3', state: 'b82fe87c' },
      300: { video: '363a4cad', state: '55acdfa7' },
      480: { video: '2ddf92a3', state: 'b1d97e28' },
      600: { video: '36593e3b', state: 'f97b0795' },
      900: { video: '9565486f', state: 'b1d85e79' },
    },
    audio: {
      writes: 712799,
      nonzeroWrites: 712799,
      writeHash: 'bbddb411',
      pcmHash: '427d7418',
      rms: 0.161309,
    },
  },
});
