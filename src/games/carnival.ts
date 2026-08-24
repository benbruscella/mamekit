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
      1: { video: 'f7e6ac81', state: 'dede71ed' },
      60: { video: 'fa381142', state: 'a2eba3f9' },
      180: { video: '9e5f1048', state: 'f86b7c23' },
      300: { video: 'c7518618', state: '6011253e' },
      600: { video: '9de6e110', state: 'f0af23a0' },
      900: { video: '967c810a', state: '461ebc36' },
      1200: { video: 'dbb60f93', state: '0bc8178d' },
    },
    audio: {
      writes: 190,
      nonzeroWrites: 102,
      writeHash: 'de9ac4d2',
      pcmHash: 'dfe93e31',
      rms: 0.109844,
    },
  },
});
