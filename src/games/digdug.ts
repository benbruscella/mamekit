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
      '1': { video: '7ec23ef6', state: 'd6a35780' },
      '300': { video: 'caacaddb', state: '913475b9' },
      '600': { video: '21864713', state: '3449439c' },
      '1200': { video: '7b6daed2', state: '81d910e4' },
      '1800': { video: 'a8f7bc6b', state: 'db99850c' },
      '2000': { video: '4d111900', state: 'a0297917' },
      '2200': { video: 'f5c41445', state: '2df477f0' },
      '2400': { video: '8fa821dc', state: 'd34514c5' },
    },
    audio: {
      writes: 78964,
      nonzeroWrites: 10918,
      writeHash: 'c5059709',
      pcmHash: '8dea7b8e',
      rms: 0.075348,
    },
  },
};
