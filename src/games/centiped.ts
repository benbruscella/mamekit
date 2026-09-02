import { sourceTarget } from './source-contract.ts';

export const centiped = sourceTarget({
  game: 'centiped',
  driver: 'src/mame/atari/centiped.cpp',
  machine: { className: 'centiped_state', name: 'centiped' },
  screen: { width: 256, height: 240 },
  soundKind: 'pokey',
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
      1: { video: 'cc61985c', state: 'afff7d40' },
      60: { video: '50bc4209', state: '346c9686' },
      180: { video: '1354f253', state: '3f1196f4' },
      300: { video: '50ceeb42', state: '763b29ad' },
      600: { video: 'df0b58ec', state: 'd3aebada' },
      900: { video: '7880c0be', state: '36344b9a' },
      1200: { video: 'af03f8f4', state: '55845beb' },
    },
    audio: {
      writes: 5095,
      nonzeroWrites: 952,
      writeHash: 'acdcd0f5',
      pcmHash: 'efe0e5eb',
      rms: 0.03231,
    },
  },
});
