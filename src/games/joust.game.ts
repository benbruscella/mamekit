import { sourceTarget } from './source-contract.ts';

export const joust = sourceTarget({
  game: 'joust',
  driver: 'src/mame/williams/williams.cpp',
  machine: { className: 'williams_state', name: 'joust' },
  screen: { width: 292, height: 240 },
  soundKind: 'stream',
  minimumAudioRms: 0.05,
  audioRequirements: [{
    // The DAC's own stream, before the mix: the sound CPU's writes are what
    // move it, so the gate is how many different levels it reached, not
    // whether it is non-zero (an idle DAC holds one constant level).
    method: 'dac.stream',
    fromFrame: 700,
    minimumNonzeroWrites: 100,
    minimumDistinctValues: 16,
  }],
  actions: [
    // A blank CMOS image enters the Williams operator flow before attract.
    { atFrame: 280, code: 'Digit9', heldFrames: 4, releasedFrames: 20 },
    { atFrame: 320, code: 'F2', heldFrames: 4, releasedFrames: 20 },
    { atFrame: 380, code: 'F2', heldFrames: 4, releasedFrames: 20 },
    { atFrame: 440, code: 'F2', heldFrames: 4, releasedFrames: 20 },
    { atFrame: 500, code: 'F2', heldFrames: 4, releasedFrames: 20 },
    // The board asks for a power cycle once it has committed factory CMOS.
    { atFrame: 620, reset: true },
    { atFrame: 700, code: 'F2', heldFrames: 4, releasedFrames: 20 },
    { atFrame: 760, code: 'Digit5', heldFrames: 8, releasedFrames: 20 },
    // The preceding coin pulse ends at 788; record the effective start rather
    // than asking the sequential harness to travel backwards to frame 780.
    { atFrame: 788, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 900, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1020, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1140, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1260, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1380, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1620, code: 'ArrowRight', heldFrames: 90, releasedFrames: 30 },
    { atFrame: 1740, code: 'Space', heldFrames: 45, releasedFrames: 30 },
    { atFrame: 1860, code: 'ArrowLeft', heldFrames: 90, releasedFrames: 30 },
  ],
  frames: 2100,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200, 1600, 1750, 1900, 2100],
  golden: {
    regions: {
      maincpu: 'f53c8633',
      proms: '7d9a7ed2',
      soundcpu: 'e108d527',
    },
    checkpoints: {
      1: { video: '926ea52a', state: '18fcc6a0' },
      60: { video: 'ddfaab36', state: '09ea3f2c' },
      180: { video: '606a42d8', state: '5b52d4c5' },
      300: { video: '2c03d088', state: '585909b1' },
      600: { video: '0afa2da4', state: '2197a297' },
      900: { video: '9f3f7c67', state: 'c4b476f7' },
      1200: { video: '3390cc7e', state: '0480cc39' },
      1600: { video: 'e1207f78', state: 'c198cec5' },
      1750: { video: '793d44fd', state: 'dbbf19ee' },
      1900: { video: '6da17e08', state: 'e831b6b9' },
      2100: { video: '5aa31b15', state: '430fadf8' },
    },
    audio: {
      writes: 4345036,
      nonzeroWrites: 4340280,
      writeHash: '3c992b02',
      pcmHash: '6cd9f61a',
      rms: 0.215263,
    },
  },
});
