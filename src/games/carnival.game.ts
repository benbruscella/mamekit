import { sourceTarget } from './source-contract.ts';

export const carnival = sourceTarget({
  game: 'carnival',
  driver: 'src/mame/sega/vicdual.cpp',
  machine: { className: 'carnival_state', name: 'carnival' },
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
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
      1: { video: 'f7e6ac81', state: '5e550f44' },
      60: { video: '04aa26ef', state: '2260dd50' },
      180: { video: '221c1b01', state: '039fc6b3' },
      300: { video: 'c50163a2', state: 'c22b59b5' },
      600: { video: '9de6e110', state: '70245d09' },
      900: { video: '0ef3c8ac', state: '6026eb44' },
      1200: { video: 'b2ee3af8', state: 'ff2266e8' },
    },
    audio: {
      writes: 190,
      nonzeroWrites: 102,
      writeHash: 'f8956ea0',
      pcmHash: 'ada59d33',
      rms: 0.108014,
    },
  },
});
