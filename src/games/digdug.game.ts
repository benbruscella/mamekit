import { sourceTarget } from './source-contract.ts';

export const digdug = sourceTarget({
  game: 'digdug',
  driver: 'src/mame/namco/galaga.cpp',
  machine: { className: 'digdug_state', name: 'digdug' },
  screen: { width: 288, height: 224 },
  soundKind: 'stream',
  // Dig Dug does not accept input or produce nonzero WSG data until its
  // three-CPU self-test has completed, so exercise controls after frame 1800.
  frames: 2400,
  minimumFps: 45,
  checkpoints: [1, 300, 600, 1200, 1800, 2000, 2200, 2400],
  actions: [
    { atFrame: 1800, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1830, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1950, code: 'ArrowRight', heldFrames: 30, releasedFrames: 10 },
    { atFrame: 2050, code: 'ArrowDown', heldFrames: 30, releasedFrames: 10 },
    { atFrame: 2150, code: 'Space', heldFrames: 20, releasedFrames: 20 },
    { atFrame: 2250, code: 'ArrowLeft', heldFrames: 30, releasedFrames: 10 },
  ],
  golden: {
    regions: {
      '51xx:mcu': 'c2f57ef8',
      '53xx:mcu': 'b326fecb',
      gfx1: '5c5bff92',
      gfx2: '62585e59',
      gfx3: '7b383983',
      gfx4: '2cf399c2',
      maincpu: 'ae00cf22',
      namco: '55c1401a',
      proms: 'a6e6847a',
      sub: '80c1e992',
      sub2: '160b5db3',
    },
    checkpoints: {
      1: { video: '937cde41', state: '5ed7caf7' },
      300: { video: 'caacaddb', state: '200992a4' },
      600: { video: '21864713', state: 'e2c61bd8' },
      1200: { video: '9417a472', state: 'f6da37e1' },
      1800: { video: 'c96ac5af', state: '4ef45b5a' },
      2000: { video: '4d111900', state: '9977b824' },
      2200: { video: 'f5c41445', state: 'bdbe8125' },
      2400: { video: 'ad812572', state: '239caa4e' },
    },
    audio: {
      writes: 1900799,
      nonzeroWrites: 342705,
      writeHash: 'a75766d6',
      pcmHash: '650bfa6e',
      rms: 0.043749,
    },
  },
});
