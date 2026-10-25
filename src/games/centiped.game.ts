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
      1: { video: 'a446b602', state: '6cca9d0c' },
      60: { video: '50bc4209', state: '5d99efdd' },
      180: { video: '1354f253', state: 'f666dcd3' },
      300: { video: '50ceeb42', state: 'eb3a6e16' },
      600: { video: 'c1615f58', state: '86e49f61' },
      900: { video: 'd3da946a', state: '4867488c' },
      1200: { video: '9b66ef49', state: 'd3980d1b' },
    },
    audio: {
      writes: 5081,
      nonzeroWrites: 924,
      writeHash: 'bfc09ff0',
      pcmHash: '7bd56d5f',
      rms: 0.031527,
    },
  },
});
