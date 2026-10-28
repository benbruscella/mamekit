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
      1: { video: 'a446b602', state: '6cca9d0c' },
      60: { video: 'a6df3bbf', state: '239ec4b5' },
      180: { video: 'a029b536', state: '57020a8a' },
      300: { video: '3ceb6c89', state: '953d457e' },
      600: { video: '0bb6604b', state: '051cf410' },
      900: { video: 'cde49bd4', state: '3791752d' },
      1200: { video: 'bcb404e8', state: 'ac6e30ba' },
    },
    audio: {
      writes: 5081,
      nonzeroWrites: 924,
      writeHash: '66e038e8',
      pcmHash: '279e202e',
      rms: 0.031541,
    },
  },
});
