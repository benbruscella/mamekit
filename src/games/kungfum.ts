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
      method: 'msm1.vck',
      fromFrame: 120,
      minimumNonzeroWrites: 100,
    },
    {
      method: 'msm2.vclk_w',
      fromFrame: 120,
      minimumNonzeroWrites: 100,
    },
    {
      method: 'msm1.data_w',
      fromFrame: 600,
      minimumNonzeroWrites: 1,
    },
    {
      method: 'msm2.data_w',
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
      1: { video: '66879f85', state: '17e3b077' },
      120: { video: 'ba4633db', state: '921dd954' },
      300: { video: '895f3363', state: 'bcadb00b' },
      600: { video: '1987b82a', state: '7f6c4a25' },
      900: { video: 'e89c3d42', state: '0f8d390c' },
      1200: { video: '03556401', state: 'bc1df091' },
      1500: { video: 'af179d9b', state: 'a7e454b8' },
      1800: { video: 'e7b72cef', state: '6f7a6b89' },
    },
    audio: {
      writes: 1_020_036,
      nonzeroWrites: 1_012_119,
      writeHash: '4cf37ba8',
      pcmHash: '8aabf3b3',
      rms: 0.064186,
    },
  },
};
