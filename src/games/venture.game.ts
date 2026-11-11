import { sourceTarget } from './source-contract.ts';

export const venture = sourceTarget({
  game: 'venture',
  driver: 'src/mame/exidy/exidy.cpp',
  machine: { className: 'exidy_state', name: 'venture' },
  screen: { width: 256, height: 256 },
  soundKind: 'stream',
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
  // The sound board's own stream: its 8253 music and 6840 effects are the
  // venture_sound_device compiled whole, driven by its 6502 through its own
  // map, so what proves them is the board's output reaching many levels.
  audioRequirements: [
    { method: 'soundbd.stream', fromFrame: 3100, minimumNonzeroWrites: 100, minimumDistinctValues: 16 },
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
      1: { video: '21f25028', state: '6b090b74' },
      60: { video: '21f25028', state: 'f08d7112' },
      180: { video: 'd2fa9021', state: 'f3583f59' },
      300: { video: '65144fc9', state: 'b24c168c' },
      1200: { video: '81872b36', state: '67d981c8' },
      2400: { video: '1c482054', state: '873ffca2' },
      3000: { video: '5be91ecc', state: '7b7f4c2b' },
      3600: { video: '0ee78c0e', state: '3993a233' },
      4200: { video: '5741148c', state: 'd3a8c676' },
      4800: { video: 'e5148176', state: '634a48a0' },
      5400: { video: 'f8fd6fb6', state: '708280b7' },
      6000: { video: '5be91ecc', state: '479989ac' },
      6200: { video: '5be91ecc', state: '90131b75' },
    },
    audio: {
      writes: 9920526,
      nonzeroWrites: 3523726,
      writeHash: '28e978cc',
      pcmHash: '7f652e76',
      rms: 0.115146,
    },
  },
});
