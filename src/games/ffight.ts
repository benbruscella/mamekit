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
      300: { video: 'd0f4807c', state: '09b4da43' },
      1200: { video: '6616166f', state: '29e117c3' },
      1800: { video: '1819b419', state: '1edd9f95' },
      2400: { video: 'fe3d133c', state: '4aaec5c4' },
      3000: { video: '26496ef4', state: '57f80f44' },
      3600: { video: 'a939c339', state: 'a29a8089' },
    },
    audio: {
      writes: 132489,
      nonzeroWrites: 122934,
      writeHash: '8fba2e26',
      pcmHash: 'c241e922',
      rms: 0.071919,
    },
  },
});
