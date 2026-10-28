import { sourceTarget } from './source-contract.ts';

export const centiped = sourceTarget({
  game: 'centiped',
  driver: 'src/mame/atari/centiped.cpp',
  machine: { className: 'centiped_state', name: 'centiped' },
  screen: { width: 256, height: 240 },
  soundKind: 'stream',
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    // The coin routine validates the switch through a ~60-frame timer before
    // incrementing credit_count; Start before that point is intentionally ignored.
    { atFrame: 390, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    // Centipede starts attacking immediately; fire while the first life is
    // still active so the POKEY contract exercises real gameplay audio.
    { atFrame: 430, code: 'Space', heldFrames: 30, releasedFrames: 10 },
    { atFrame: 490, code: 'ArrowRight', heldFrames: 60, releasedFrames: 10 },
    { atFrame: 570, code: 'Space', heldFrames: 30, releasedFrames: 10 },
    { atFrame: 630, code: 'ArrowLeft', heldFrames: 60, releasedFrames: 10 },
    { atFrame: 710, code: 'Space', heldFrames: 30, releasedFrames: 10 },
  ],
  golden: {
    regions: {
      gfx1: 'a6c06509',
      maincpu: 'cbd7fd52',
      proms: '6fa3093a',
    },
    checkpoints: {
      1: { video: '0c038c61', state: '90ecac3e' },
      60: { video: '8ad84b2b', state: '2bd7f9d9' },
      180: { video: '685c23dd', state: 'f0efa37f' },
      300: { video: 'db15495f', state: 'bdc18276' },
      600: { video: '7898d66f', state: '3922776f' },
      900: { video: '9c3ee6bc', state: '9803b5fe' },
      1200: { video: 'bc89f902', state: '2a3345f6' },
    },
    audio: {
      writes: 959953,
      nonzeroWrites: 959953,
      writeHash: '31dc422a',
      pcmHash: 'b9d47de0',
      rms: 0.062776,
    },
  },
});
