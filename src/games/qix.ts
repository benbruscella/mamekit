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
  golden: {
    regions: {
      audiocpu: 'd5071fa5',
      maincpu: 'e80d2bb9',
      videocpu: '081eb1c6',
    },
    checkpoints: {
      1: { video: 'c62f3bc3', state: '72a614c8' },
      10: { video: '5e4f89a5', state: '97437cef' },
      30: { video: '21f25028', state: 'cba4f4a5' },
      60: { video: '21f25028', state: '6067e7e9' },
      180: { video: 'f009f75f', state: '7543c3d7' },
      300: { video: '7897a528', state: '380f6958' },
      480: { video: '33e7bcfd', state: '9ea879ba' },
      600: { video: '52400c01', state: '57430d2f' },
      900: { video: 'c1621dd9', state: '4763c4dd' },
    },
    audio: {
      writes: 217,
      nonzeroWrites: 177,
      writeHash: '067f1fc1',
      pcmHash: '4a2fa237',
      rms: 0.015363,
    },
  },
};
