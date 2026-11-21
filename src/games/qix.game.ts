import { sourceTarget } from './source-contract.ts';

export const qix = sourceTarget({
  game: 'qix',
  driver: 'src/mame/taito/qix.cpp',
  machine: { className: 'qix_state', name: 'qix' },
  screen: { width: 256, height: 256 },
  soundKind: 'stream',
  frames: 900,
  // CPUs compiled whole from MAME (#249) run heavier than the hand cores:
  // CI measured 22.5 fps against the floor of 40, so the floor is about 90% of that.
  // #278's exact timers and stream updates through the current sample cost
  // it 10% on CI (18.0 and 18.2 fps); the floor is again about 90% (#247, 7.12).
  minimumFps: 16,
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
      30: { video: '21f25028', state: 'a739c7e7' },
      60: { video: '52eb2598', state: 'f68ea5c1' },
      180: { video: 'ce536518', state: '886ebc18' },
      300: { video: '7b0b7216', state: 'f82e911e' },
      480: { video: '8dbed344', state: '7556166d' },
      600: { video: '6c5538e9', state: 'c9236f92' },
      900: { video: 'bb94aeeb', state: 'fcc245ba' },
    },
    audio: {
      writes: 902603,
      nonzeroWrites: 902357,
      writeHash: '2364defe',
      pcmHash: '7053cc8a',
      rms: 0.091859,
    },
  },
});
