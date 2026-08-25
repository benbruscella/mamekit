import { sourceTarget } from './source-contract.ts';

export const venture = sourceTarget({
  game: 'venture',
  driver: 'src/mame/exidy/exidy.cpp',
  machine: { className: 'exidy_state', name: 'venture' },
  screen: { width: 256, height: 256 },
  soundKind: 'exidy',
  frames: 6200,
  checkpoints: [1, 60, 180, 300, 1200, 2400, 3000, 3600, 4200, 4800, 5400, 6000, 6200],
  actions: [
    // Venture ignores cabinet inputs while its unusually long board self-test
    // is running. Exercise coin/start only after the attract maze is live.
    { atFrame: 3100, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 3150, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    // Route Winky through the lower-left room entrance. This transition is
    // driven by the same sprite/background collision IRQ used for treasure
    // pickup, so the acceptance run now guards real gameplay collision timing
    // instead of merely moving around the overworld after the game is over.
    { atFrame: 3450, code: 'ArrowRight', heldFrames: 10, releasedFrames: 1 },
    { atFrame: 3461, code: 'ArrowUp', heldFrames: 39, releasedFrames: 1 },
    { atFrame: 3501, code: 'ArrowLeft', heldFrames: 30, releasedFrames: 20 },
  ],
  audioRequirements: [
    { method: 'sh8253_w', fromFrame: 3100, minimumNonzeroWrites: 100 },
    { method: 'sh6840_w', fromFrame: 3100, minimumNonzeroWrites: 100 },
    { method: 'sfxctrl_w', fromFrame: 3100, minimumNonzeroWrites: 100 },
  ],
  minimumFps: 45,
  minimumAudioRms: 0.02,
  golden: {
    regions: {
      gfx1: 'ea6fd981',
      maincpu: '0b646ce6',
      proms: '599fa32d',
      'soundbd:audiocpu': '48a9057b',
    },
    checkpoints: {
      1: { video: '21f25028', state: '63603ec8' },
      60: { video: '21f25028', state: 'd7daf7a0' },
      180: { video: 'd2fa9021', state: '90f5e961' },
      300: { video: '65144fc9', state: 'c4924c42' },
      1200: { video: '81872b36', state: '41a3d02d' },
      2400: { video: '1c482054', state: '3156f14f' },
      3000: { video: '5be91ecc', state: 'a4d1c8c5' },
      3600: { video: '78606640', state: '47e0b8b5' },
      4200: { video: '378e13eb', state: '176aa9e0' },
      4800: { video: 'bdec40a2', state: '0e4c9bcf' },
      5400: { video: '723f4da0', state: '139a3bd2' },
      6000: { video: '5be91ecc', state: '0eeea15b' },
      6200: { video: '31544105', state: '404263ba' },
    },
    audio: {
      writes: 8163,
      nonzeroWrites: 5978,
      writeHash: '2a9b80d0',
      pcmHash: 'bdb3c7e3',
      rms: 0.070257,
    },
  },
});
