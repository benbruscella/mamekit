import { sourceTarget } from './source-contract.ts';

export const kungfum = sourceTarget({
  game: 'kungfum',
  driver: 'src/mame/irem/m62.cpp',
  machine: { className: 'm62_state', name: 'kungfum' },
  screen: { width: 256, height: 256 },
  soundKind: 'stream',
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
      1: { video: 'f38d2edd', state: '7b3c32ff' },
      120: { video: '81581ed2', state: 'bb024330' },
      300: { video: '8c3e4b9a', state: '37540bd0' },
      600: { video: '3b7a81f3', state: '732bfdc4' },
      900: { video: '0d9efd5e', state: '2b1a14b7' },
      1200: { video: '2db91268', state: '0f8da0cb' },
      1500: { video: 'd56baa2d', state: 'd7a920b9' },
      1800: { video: '527fff6d', state: 'c8557004' },
    },
    audio: {
      writes: 934626,
      nonzeroWrites: 926040,
      writeHash: '16861a5a',
      pcmHash: '2fce5582',
      rms: 0.060133,
    },
  },
});
