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
      1: { video: '21f25028', state: '08271395' },
      10: { video: '21f25028', state: '5a091218' },
      30: { video: '21f25028', state: '9d18aa99' },
      60: { video: '21f25028', state: '63753a0c' },
      180: { video: '261be9dd', state: '3b8de653' },
      300: { video: '7b0b7216', state: 'a1453315' },
      480: { video: '49a1916a', state: 'dd6679c6' },
      600: { video: 'cc7b802e', state: '0988ffd5' },
      900: { video: '75dee9dd', state: 'b3fcfa31' },
    },
    audio: {
      writes: 13531,
      nonzeroWrites: 13517,
      writeHash: '6c663146',
      pcmHash: 'fcab7504',
      rms: 0.158663,
    },
  },
};
