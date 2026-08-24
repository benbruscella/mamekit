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
      30: { video: '21f25028', state: '7644b46e' },
      60: { video: '21f25028', state: 'fa4b9e53' },
      180: { video: '261be9dd', state: '5d9f3825' },
      300: { video: '7b0b7216', state: '35273fd3' },
      480: { video: '49a1916a', state: 'c4de14dc' },
      600: { video: 'cc7b802e', state: 'cf40c051' },
      900: { video: '75dee9dd', state: 'b0667758' },
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
