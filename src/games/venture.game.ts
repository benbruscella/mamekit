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
      1: { video: '21f25028', state: 'a5057b66' },
      60: { video: '21f25028', state: '3f20872d' },
      180: { video: 'd2fa9021', state: '0a95484e' },
      300: { video: '65144fc9', state: 'de47a12b' },
      1200: { video: '81872b36', state: '7d9fdc2a' },
      2400: { video: '1c482054', state: 'ee98008b' },
      3000: { video: '5be91ecc', state: '386a6f16' },
      3600: { video: '0ee78c0e', state: 'a4504ad1' },
      4200: { video: '62a474db', state: 'cc34f10a' },
      4800: { video: 'e5148176', state: 'c713caf1' },
      5400: { video: '2b4077ca', state: '52e20aab' },
      6000: { video: '5be91ecc', state: '1cc75927' },
      6200: { video: '5be91ecc', state: '91ac0fe2' },
    },
    audio: {
      writes: 9920526,
      nonzeroWrites: 3456044,
      writeHash: '58e8e46e',
      pcmHash: '7b8a6cf4',
      rms: 0.114931,
    },
  },
});
