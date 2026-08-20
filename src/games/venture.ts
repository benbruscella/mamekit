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
      1: { video: '21f25028', state: 'f32b0312' },
      60: { video: '21f25028', state: '848e9345' },
      180: { video: 'd2fa9021', state: '323f68e4' },
      300: { video: '65144fc9', state: '23458ed2' },
      1200: { video: '81872b36', state: '9f833257' },
      2400: { video: '1c482054', state: 'b00012c0' },
      3000: { video: '5be91ecc', state: '8beab8bf' },
      3600: { video: 'a384367c', state: '3af0fd9d' },
      4200: { video: 'ccd0bc5a', state: '2a911cc8' },
      4800: { video: 'bdec40a2', state: 'dd3d5add' },
      5400: { video: '90662e6f', state: 'f4c3a0b7' },
      6000: { video: '5be91ecc', state: '9f2a3878' },
      6200: { video: '31544105', state: 'fd03b569' },
    },
    audio: {
      writes: 8113,
      nonzeroWrites: 5947,
      writeHash: '87eb517b',
      pcmHash: 'd191b332',
      rms: 0.070196,
    },
  },
});
