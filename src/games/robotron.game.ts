import { sourceTarget } from './source-contract.ts';

export const robotron = sourceTarget({
  game: 'robotron',
  driver: 'src/mame/williams/williams.cpp',
  machine: { className: 'williams_state', name: 'williams_b1' },
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
    // Robotron shares Williams' blank-CMOS operator initialization flow.
    { atFrame: 280, code: 'Digit9', heldFrames: 4, releasedFrames: 20 },
    { atFrame: 320, code: 'F2', heldFrames: 4, releasedFrames: 20 },
    { atFrame: 380, code: 'F2', heldFrames: 4, releasedFrames: 20 },
    { atFrame: 440, code: 'F2', heldFrames: 4, releasedFrames: 20 },
    { atFrame: 500, code: 'F2', heldFrames: 4, releasedFrames: 20 },
    // The board asks for a power cycle once it has committed factory CMOS.
    { atFrame: 620, reset: true },
    { atFrame: 700, code: 'F2', heldFrames: 4, releasedFrames: 20 },
    { atFrame: 760, code: 'Digit5', heldFrames: 8, releasedFrames: 20 },
    // The preceding coin pulse ends at 788; this is the schedule the harness
    // has always executed even though the old declaration said frame 780.
    { atFrame: 788, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 900, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1020, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1140, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1260, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1380, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1620, code: 'KeyD', heldFrames: 90, releasedFrames: 30 },
    { atFrame: 1740, code: 'KeyI', heldFrames: 45, releasedFrames: 30 },
    { atFrame: 1860, code: 'KeyA', heldFrames: 90, releasedFrames: 30 },
    { atFrame: 1980, code: 'KeyL', heldFrames: 45, releasedFrames: 30 },
  ],
  frames: 2100,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200, 1600, 1750, 1900, 2100],
  golden: {
    regions: {
      maincpu: '406dd981',
      proms: '7d9a7ed2',
      soundcpu: 'd5e793d2',
    },
    checkpoints: {
      1: { video: '926ea52a', state: '29a52572' },
      60: { video: 'd6865724', state: '9c7cece2' },
      180: { video: '47d4a6d8', state: '55116c42' },
      300: { video: 'f5b678f1', state: 'b75863ce' },
      600: { video: '7464828f', state: '147ca028' },
      900: { video: '0b641505', state: 'd2c8c6d9' },
      1200: { video: 'f3a34fed', state: 'ba9a2ab6' },
      1600: { video: '79611374', state: '532546c9' },
      1750: { video: '6de2e281', state: 'ad388db6' },
      1900: { video: '011f09cf', state: 'a189bed8' },
      2100: { video: '4fb523f8', state: '73873c26' },
    },
    audio: {
      writes: 4345036,
      nonzeroWrites: 4344026,
      writeHash: '71cf3af2',
      pcmHash: '68a2757d',
      rms: 0.211927,
    },
  },
});
