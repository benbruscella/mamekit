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
      1: { video: '7fef94f4', state: '029eead8' },
      60: { video: 'b65d9af6', state: '9c1c25bf' },
      180: { video: '097e90e6', state: '78c7970a' },
      300: { video: '41f6b893', state: 'f45437d0' },
      600: { video: 'e4eddc25', state: '2991cc72' },
      900: { video: 'e552eca1', state: '82b5d8f1' },
      1200: { video: '40a4350d', state: 'c5125684' },
    },
    audio: {
      writes: 959999,
      nonzeroWrites: 959997,
      writeHash: '2abb0ee4',
      pcmHash: 'e238030a',
      rms: 0.061578,
    },
  },
});
