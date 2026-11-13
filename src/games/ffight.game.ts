import { sourceTarget } from './source-contract.ts';

export const ffight = sourceTarget({
  game: 'ffight',
  driver: 'src/mame/capcom/cps1.cpp',
  machine: { className: 'cps_state', name: 'cps1_10MHz' },
  screen: { width: 384, height: 224 },
  soundKind: 'stream',
  // Sound compiled from MAME (#242) runs on the main thread: CI measured
  // 36.2 fps against the old floor of 50 (issue #247, 4.5).
  minimumFps: 28,
  // CPS1 is still in its power-on RAM test when the standard schedule tries
  // to start. Exercise Final Fight after the test and keep the run long enough
  // to cover character select and live gameplay.
  frames: 3600,
  checkpoints: [1, 300, 1200, 1800, 2400, 3000, 3600],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 900, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1100, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 2700, code: 'Space', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 3300, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 3400, code: 'Space', heldFrames: 10, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      aboardplds: 'ffcf27eb',
      audiocpu: '9c545e40',
      bboardplds: '8e74b895',
      gfx: 'e669210c',
      maincpu: '7831e4ba',
      oki: 'cd24355f',
    },
    checkpoints: {
      1: { video: '47413468', state: '72607103' },
      300: { video: 'd0f4807c', state: '69a3aa0a' },
      1200: { video: '2ecb555a', state: '43a1b9f1' },
      1800: { video: '41b61dd8', state: 'e82eb83c' },
      2400: { video: 'b7a61fd6', state: '0ec99607' },
      3000: { video: 'aa163dec', state: '497d11ee' },
      3600: { video: '2cd292ec', state: '3a0883d1' },
    },
    audio: {
      writes: 2897510,
      nonzeroWrites: 1607168,
      writeHash: '0acd4b7f',
      pcmHash: 'f2d597f9',
      rms: 0.079562,
    },
  },
});
