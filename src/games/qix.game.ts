import { sourceTarget } from './source-contract.ts';

export const qix = sourceTarget({
  game: 'qix',
  driver: 'src/mame/taito/qix.cpp',
  machine: { className: 'qix_state', name: 'qix' },
  screen: { width: 256, height: 256 },
  soundKind: 'stream',
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
      1: { video: '21f25028', state: '4e5b0387' },
      10: { video: '21f25028', state: '5589452e' },
      30: { video: '21f25028', state: 'ddf05810' },
      60: { video: '52eb2598', state: 'f77c9d96' },
      180: { video: 'ce536518', state: 'a6abd489' },
      300: { video: '7b0b7216', state: '43b7beb1' },
      480: { video: '1ef40868', state: '3a9d9874' },
      600: { video: '100e1eff', state: '5a586865' },
      900: { video: 'd26d092e', state: '4527fb58' },
    },
    audio: {
      writes: 902603,
      nonzeroWrites: 902359,
      writeHash: 'ea0d40df',
      pcmHash: 'e4a8be5a',
      rms: 0.0918,
    },
  },
});
