import { sourceTarget } from './source-contract.ts';

export const joust = sourceTarget({
  game: 'joust',
  driver: 'src/mame/williams/williams.cpp',
  machine: { className: 'williams_state', name: 'joust' },
  screen: { width: 292, height: 240 },
  soundKind: 'dac',
  minimumAudioRms: 0.05,
  audioRequirements: [{
    method: 'dac.data_w',
    fromFrame: 700,
    minimumNonzeroWrites: 100,
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
      1: { video: '926ea52a', state: '7a98d148' },
      60: { video: 'e724541a', state: 'caa91b7d' },
      180: { video: 'f68c92d4', state: '160e0172' },
      300: { video: '2c03d088', state: '8f2ca316' },
      600: { video: '0afa2da4', state: '846fdb70' },
      900: { video: '9f3f7c67', state: '17ecb3e7' },
      1200: { video: '3390cc7e', state: '78b166e3' },
      1600: { video: 'e1207f78', state: '8e0fd519' },
      1750: { video: '793d44fd', state: 'ec71e0f2' },
      1900: { video: '6da17e08', state: 'bdd5490f' },
      2100: { video: '5aa31b15', state: '32fedab6' },
    },
    audio: {
      writes: 24426,
      nonzeroWrites: 20005,
      writeHash: '88f4ebab',
      pcmHash: '77df9d47',
      rms: 0.861976,
    },
  },
});
