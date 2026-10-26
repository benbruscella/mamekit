import { sourceTarget } from './source-contract.ts';

export const ffight = sourceTarget({
  game: 'ffight',
  driver: 'src/mame/capcom/cps1.cpp',
  machine: { className: 'cps_state', name: 'cps1_10MHz' },
  screen: { width: 384, height: 224 },
  soundKind: 'ym2151',
  minimumFps: 50,
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
      1: { video: '47413468', state: '7860e450' },
      300: { video: 'd0f4807c', state: 'ab6f68d6' },
      1200: { video: '2ecb555a', state: '1ab24665' },
      1800: { video: '41b61dd8', state: '02b7789c' },
      2400: { video: 'b7a61fd6', state: '873bda14' },
      3000: { video: 'aa163dec', state: 'c65b1683' },
      3600: { video: '2cd292ec', state: 'e4274ace' },
    },
    audio: {
      writes: 127235,
      nonzeroWrites: 118806,
      writeHash: '6ffde644',
      pcmHash: '91972758',
      rms: 0.082494,
    },
  },
});
