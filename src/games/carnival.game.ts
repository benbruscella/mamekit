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
      1: { video: 'f7e6ac81', state: '563bf540' },
      60: { video: '04aa26ef', state: 'bec24d0d' },
      180: { video: '221c1b01', state: 'a91220a8' },
      300: { video: 'c50163a2', state: '255b3e2d' },
      600: { video: '9de6e110', state: 'f3f6364d' },
      900: { video: '0ef3c8ac', state: '14c0783a' },
      1200: { video: '5e15f895', state: '4d0db7f0' },
    },
    audio: {
      writes: 960000,
      nonzeroWrites: 959998,
      writeHash: '11d796be',
      pcmHash: '57df3d0e',
      rms: 0.099403,
    },
  },
});
