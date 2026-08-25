import type { GameTestContract } from './types.ts';

export const digdug: GameTestContract = {
  game: 'digdug',
  category: 'arcade',
  driver: 'src/mame/namco/galaga.cpp',
  machine: { className: 'digdug_state', name: 'digdug' },
  romEnvironment: 'MAMEKIT_DIGDUG_ROM',
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
      1: { video: 'fa37277c', state: '3a2718a7' },
      300: { video: 'caacaddb', state: 'fd652c7a' },
      600: { video: '21864713', state: '038b7cd4' },
      1200: { video: '9417a472', state: '43c95e11' },
      1800: { video: 'c96ac5af', state: '91f8e9a9' },
      2000: { video: '092c8b6e', state: '4c797e8e' },
      2200: { video: '9912afd4', state: '9c050cb1' },
      2400: { video: '72ec44c9', state: 'e7d461ea' },
    },
    audio: {
      writes: 78964,
      nonzeroWrites: 10891,
      writeHash: '6819742f',
      pcmHash: 'c3299727',
      rms: 0.078526,
    },
  },
};
