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
  // Each MSM5205's own stream into the netlist: its ADPCM decoding the
  // sound CPU's nibbles is what makes it reach more than its reset level.
  audioRequirements: [
    {
      method: 'irem_audio:msm1.stream',
      fromFrame: 600,
      minimumNonzeroWrites: 100,
      minimumDistinctValues: 8,
    },
    {
      method: 'irem_audio:msm2.stream',
      fromFrame: 600,
      minimumNonzeroWrites: 100,
      minimumDistinctValues: 8,
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
      1: { video: 'f38d2edd', state: 'fc1bda53' },
      120: { video: '81581ed2', state: 'f3cc4fcf' },
      300: { video: '8c3e4b9a', state: '1b4d4604' },
      600: { video: '3b7a81f3', state: 'b4b7d25a' },
      900: { video: '0d9efd5e', state: '61d7cb69' },
      1200: { video: '2db91268', state: '8e33cf75' },
      1500: { video: 'd56baa2d', state: 'fff9304a' },
      1800: { video: '527fff6d', state: '44688667' },
    },
    audio: {
      writes: 4600797,
      nonzeroWrites: 1608548,
      writeHash: 'bee91a99',
      pcmHash: '530e1dd6',
      rms: 0.040354,
    },
  },
});
