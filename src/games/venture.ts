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
      1200: { video: '81872b36', state: '20779edc' },
      2400: { video: '1c482054', state: 'b2bcd767' },
      3000: { video: '5be91ecc', state: 'fb8b6d6d' },
      3600: { video: '0ee78c0e', state: 'cf2a38d2' },
      4200: { video: '5741148c', state: '722b83fe' },
      4800: { video: 'e5148176', state: '51c4303d' },
      5400: { video: 'f8fd6fb6', state: 'a76889a6' },
      6000: { video: '5be91ecc', state: '21ea1bd1' },
      6200: { video: '5be91ecc', state: '6c5c1e3d' },
    },
    audio: {
      writes: 7782,
      nonzeroWrites: 5744,
      writeHash: '76bc8a4e',
      pcmHash: 'bd498ce9',
      rms: 0.071225,
    },
  },
});
