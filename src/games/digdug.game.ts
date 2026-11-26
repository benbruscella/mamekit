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
      1200: { video: '9417a472', state: '62fea651' },
      1800: { video: 'c96ac5af', state: 'b3632cba' },
      2000: { video: '4d111900', state: '3f00c94b' },
      2200: { video: 'f5c41445', state: '1f1a84b9' },
      2400: { video: 'ad812572', state: '83e2b19f' },
    },
    audio: {
      writes: 1900799,
      nonzeroWrites: 342633,
      writeHash: '71862b70',
      pcmHash: '540da42a',
      rms: 0.043742,
    },
  },
});
