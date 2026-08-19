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
      1: { video: '7ec23ef6', state: '3a2718a7' },
      300: { video: 'caacaddb', state: 'fd652c7a' },
      600: { video: '21864713', state: 'dd4fbcf6' },
      1200: { video: '96caa8ca', state: '19ebfc06' },
      1800: { video: '482c61b3', state: '4f599594' },
      2000: { video: '63fef370', state: '9cde60ee' },
      2200: { video: '13d12be7', state: '5493200f' },
      2400: { video: '472c5c73', state: 'c821f120' },
    },
    audio: {
      writes: 78964,
      nonzeroWrites: 13356,
      writeHash: '82e06150',
      pcmHash: 'e33c75d9',
      rms: 0.085126,
    },
  },
};
