import { sourceTarget } from './source-contract.ts';

export const arkanoid = sourceTarget({
  game: 'arkanoid',
  driver: 'src/mame/taito/arkanoid.cpp',
  machine: { className: 'arkanoid_state', name: 'arkanoid' },
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  // Arkanoid boots into its own HARDWARE CHECK: the Z80 streams all 0xc000
  // program bytes through the 68705 and waits for the MCU's reply, which takes
  // about ten seconds of emulated time. Nothing before frame ~600 is sampled,
  // so the credit and the start button come after it.
  frames: 2000,
  minimumFps: 30,
  checkpoints: [1, 60, 300, 600, 900, 1200, 1500, 1800, 2000],
  actions: [
    { atFrame: 900, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 960, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1500, code: 'ArrowRight', heldFrames: 40, releasedFrames: 20 },
    { atFrame: 1600, code: 'ArrowLeft', heldFrames: 40, releasedFrames: 20 },
    { atFrame: 1800, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
  ],
});
