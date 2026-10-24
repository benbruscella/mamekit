import { sourceTarget } from './source-contract.ts';

export const robotron = sourceTarget({
  game: 'robotron',
  driver: 'src/mame/williams/williams.cpp',
  machine: { className: 'williams_state', name: 'williams_b1' },
  screen: { width: 292, height: 240 },
  soundKind: 'dac',
  minimumAudioRms: 0.05,
  audioRequirements: [{
    method: 'dac.data_w',
    fromFrame: 700,
    minimumNonzeroWrites: 100,
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
      1: { video: '926ea52a', state: '167eaf1e' },
      60: { video: 'd6865724', state: 'cae3dbb4' },
      180: { video: '47d4a6d8', state: '7560a999' },
      300: { video: 'f5b678f1', state: 'e7b5eecf' },
      600: { video: '7464828f', state: '4cadd8e4' },
      900: { video: '0b641505', state: 'e05f8d22' },
      1200: { video: 'f3a34fed', state: '88af1a4e' },
      1600: { video: '79611374', state: 'c2fab235' },
      1750: { video: '6de2e281', state: '4100b130' },
      1900: { video: '011f09cf', state: '70a73835' },
      2100: { video: '4fb523f8', state: '5ae97aee' },
    },
    audio: {
      writes: 270221,
      nonzeroWrites: 266506,
      writeHash: 'd5a8b2f1',
      pcmHash: 'bf25facf',
      rms: 0.854659,
    },
  },
});
