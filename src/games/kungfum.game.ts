import type { GameTestContract } from './types.ts';

export const kungfum: GameTestContract = {
  game: 'kungfum',
  category: 'arcade',
  driver: 'src/mame/irem/m62.cpp',
  machine: { className: 'm62_state', name: 'kungfum' },
  romEnvironment: 'MAMEKIT_KUNGFUM_ROM',
  screen: { width: 256, height: 256 },
  soundKind: 'ay8910',
  frames: 1800,
  minimumFps: 45,
  checkpoints: [1, 120, 300, 600, 900, 1200, 1500, 1800],
  actions: [
    { atFrame: 600, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 630, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 780, code: 'ArrowRight', heldFrames: 180, releasedFrames: 20 },
    { atFrame: 1020, code: 'KeyZ', heldFrames: 20, releasedFrames: 20 },
    { atFrame: 1140, code: 'Space', heldFrames: 20, releasedFrames: 20 },
    { atFrame: 1260, code: 'ArrowLeft', heldFrames: 120, releasedFrames: 20 },
  ],
  audioRequirements: [
    {
      method: 'irem_audio:msm1.vck',
      fromFrame: 120,
      minimumNonzeroWrites: 100,
    },
    {
      method: 'irem_audio:msm2.vclk_w',
      fromFrame: 120,
      minimumNonzeroWrites: 100,
    },
    {
      method: 'irem_audio:msm1.data_w',
      fromFrame: 600,
      minimumNonzeroWrites: 1,
    },
    {
      method: 'irem_audio:msm2.data_w',
      fromFrame: 600,
      minimumNonzeroWrites: 1,
    },
  ],
  golden: {
    regions: {
      chr_color_proms: 'd9163223',
      gfx1: '593361dd',
      gfx2: '70b09893',
      'irem_audio:iremsound': '895b4ab0',
      maincpu: '4f3f7b7a',
      spr_color_proms: '63ba3b21',
      spr_height_prom: '7a601c3d',
      timing: '82c20d12',
    },
    checkpoints: {
      1: { video: '21f25028', state: '7b3c32ff' },
      120: { video: '3eb8e056', state: '1275111b' },
      300: { video: 'dd8ff1cb', state: '61b73d90' },
      600: { video: 'fea23bc6', state: '4fd8a865' },
      900: { video: 'e89c3d42', state: '46767e8e' },
      1200: { video: '546773e9', state: '23fe48e2' },
      1500: { video: 'af179d9b', state: '3a3056ed' },
      1800: { video: 'e7b72cef', state: '49d7bbc5' },
    },
    audio: {
      writes: 934624,
      nonzeroWrites: 926102,
      writeHash: '962d8a84',
      pcmHash: 'cd979cb0',
      rms: 0.035128,
    },
  },
};
