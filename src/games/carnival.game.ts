import { sourceTarget } from './source-contract.ts';

export const carnival = sourceTarget({
  game: 'carnival',
  driver: 'src/mame/sega/vicdual.cpp',
  machine: { className: 'carnival_state', name: 'carnival' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
  minimumAudioRms: 0.05,
  actions: [
    // Vic Dual resets the main CPU on a coin edge. Let that real reset and
    // 70 ms coin-status window finish before asking the restarted game to run.
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 300 },
    { atFrame: 700, code: 'Digit1', heldFrames: 10, releasedFrames: 100 },
    { atFrame: 900, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 1100, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: '0dbaa2b0',
      maincpu: 'ad236ab1',
      proms: 'f0084d80',
      user1: '9617d796',
    },
    checkpoints: {
      1: { video: 'f7e6ac81', state: 'c9715aee' },
      60: { video: '04aa26ef', state: 'c8958b3e' },
      180: { video: '221c1b01', state: 'c36308c5' },
      300: { video: 'c50163a2', state: '083a9801' },
      600: { video: '9de6e110', state: 'e3cc86ef' },
      900: { video: '0ef3c8ac', state: 'd9b40f02' },
      1200: { video: '5e15f895', state: 'd86fc409' },
    },
    audio: {
      writes: 959999,
      nonzeroWrites: 959997,
      writeHash: 'e19fc6d2',
      pcmHash: '49f6d85e',
      rms: 0.099403,
    },
  },
});
