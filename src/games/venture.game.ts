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
      1: { video: '21f25028', state: '7827802f' },
      60: { video: '21f25028', state: '0532bbef' },
      180: { video: 'd2fa9021', state: 'fb3860d0' },
      300: { video: '65144fc9', state: '40b0a096' },
      1200: { video: '81872b36', state: 'a9ddcead' },
      2400: { video: '1c482054', state: 'b9793ff8' },
      3000: { video: '5be91ecc', state: '91fa1bc2' },
      3600: { video: '0ee78c0e', state: '8c006bd8' },
      4200: { video: '5741148c', state: 'bbd9bfad' },
      4800: { video: 'e5148176', state: 'b81e843a' },
      5400: { video: 'f8fd6fb6', state: '2bf4fb73' },
      6000: { video: '5be91ecc', state: '7c484fab' },
      6200: { video: '5be91ecc', state: 'fb0ed1d5' },
    },
    audio: {
      writes: 7785,
      nonzeroWrites: 5746,
      writeHash: '12343770',
      pcmHash: '3c66fe0c',
      rms: 0.071232,
    },
  },
});
