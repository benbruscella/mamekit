import { sourceTarget } from './source-contract.ts';

export const qix = sourceTarget({
  game: 'qix',
  driver: 'src/mame/taito/qix.cpp',
  machine: { className: 'qix_state', name: 'qix' },
  screen: { width: 256, height: 256 },
  soundKind: 'stream',
  frames: 900,
  minimumFps: 20,
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
      1: { video: '21f25028', state: '7c1f5e0e' },
      10: { video: '21f25028', state: '44c24136' },
      30: { video: '21f25028', state: 'de29fc47' },
      60: { video: '52eb2598', state: '8f9e9e61' },
      180: { video: 'ce536518', state: '7a4ecb58' },
      300: { video: '7b0b7216', state: '324ce4bd' },
      480: { video: 'f39b292d', state: '3377c50c' },
      600: { video: 'fabd3c10', state: 'b0335432' },
      900: { video: '88486e1d', state: '0ee232fa' },
    },
    audio: {
      writes: 902603,
      nonzeroWrites: 902359,
      writeHash: 'c2b4cbf6',
      pcmHash: '36a6711c',
      rms: 0.097377,
    },
  },
});
