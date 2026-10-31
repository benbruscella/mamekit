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
      60: { video: '1b54daad', state: 'b7dcf666' },
      180: { video: 'd1a374f9', state: '4145b40f' },
      300: { video: 'f28c7911', state: '21ca8dc9' },
      600: { video: 'a3d59878', state: 'a52978d0' },
      900: { video: 'dd70937c', state: 'ec054f6b' },
      1200: { video: '047eaa0d', state: '78fe4bb9' },
    },
    audio: {
      writes: 959953,
      nonzeroWrites: 959953,
      writeHash: '5b789d17',
      pcmHash: 'db49c11b',
      rms: 0.068571,
    },
  },
});
