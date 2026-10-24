import { sourceTarget } from './source-contract.ts';

export const digdug = sourceTarget({
  game: 'digdug',
  driver: 'src/mame/namco/galaga.cpp',
  machine: { className: 'digdug_state', name: 'digdug' },
  screen: { width: 288, height: 224 },
  soundKind: 'wsg',
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
      1: { video: '7ec23ef6', state: '3a2718a7' },
      300: { video: 'caacaddb', state: 'fd652c7a' },
      600: { video: '21864713', state: '16c16447' },
      1200: { video: '9417a472', state: '3ee71707' },
      1800: { video: 'c96ac5af', state: 'bcde2c0b' },
      2000: { video: '4d111900', state: 'd7a33ea2' },
      2200: { video: 'f5c41445', state: 'f475f8b3' },
      2400: { video: 'ad812572', state: '5ad520bd' },
    },
    audio: {
      writes: 78964,
      nonzeroWrites: 10904,
      writeHash: '5d2441e0',
      pcmHash: '6ba0371d',
      rms: 0.079463,
    },
  },
});
