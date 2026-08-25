import type { GameTestContract } from './types.ts';

export const qix: GameTestContract = {
  game: 'qix',
  category: 'arcade',
  driver: 'src/mame/taito/qix.cpp',
  machine: { className: 'qix_state', name: 'qix' },
  romEnvironment: 'MAMEKIT_QIX_ROM',
  screen: { width: 256, height: 256 },
  soundKind: 'discrete',
  frames: 900,
  minimumFps: 40,
  checkpoints: [1, 10, 30, 60, 180, 300, 480, 600, 900],
  actions: [
    // Blank NVRAM asks for a language. Accept the highlighted default, then
    // reset as the original operator flow specifies; the NVRAM survives.
    { atFrame: 100, code: 'Digit9', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 150, reset: true },
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 390, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 480, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  audioRequirements: [{
    method: 'write',
    offset: 1,
    fromFrame: 180,
    minimumNonzeroWrites: 1_000,
  }],
  golden: {
    regions: {
      audiocpu: 'd5071fa5',
      maincpu: 'e80d2bb9',
      videocpu: '081eb1c6',
    },
    checkpoints: {
      1: { video: '21f25028', state: 'cd482843' },
      10: { video: '21f25028', state: '783ffcfa' },
      30: { video: '21f25028', state: 'e86448e9' },
      60: { video: '52eb2598', state: '1c14e19a' },
      180: { video: 'ce536518', state: '0e03e4d5' },
      300: { video: '7b0b7216', state: '2ff620a7' },
      480: { video: '91a53667', state: '9695fa25' },
      600: { video: '7b2cf295', state: '290e3989' },
      900: { video: '6583476f', state: '2dd3390d' },
    },
    audio: {
      writes: 13582,
      nonzeroWrites: 13549,
      writeHash: '2e994d36',
      pcmHash: '123067ee',
      rms: 0.176022,
    },
  },
};
