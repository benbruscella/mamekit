import { sourceTarget } from './source-contract.ts';

export const asteroid = sourceTarget({
  game: 'asteroid',
  driver: 'src/mame/atari/asteroid.cpp',
  machine: { className: 'asteroid_state', name: 'asteroid' },
  screen: { width: 1045, height: 789 },
  soundKind: 'stream',
  actions: [
    // The original coin circuit validates a pulse for about half a second;
    // do not press Start until the ROM has actually awarded the credit.
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 70 },
    { atFrame: 380, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'KeyX', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      'dvg:prom': '97953db8',
      maincpu: '37f7b0f7',
    },
    checkpoints: {
      1: { video: '436e59b7', state: 'f4729215' },
      60: { video: 'd6867274', state: '3b2a63af' },
      180: { video: 'ab279d96', state: 'a5817021' },
      300: { video: '7743676c', state: '91f1cde4' },
      600: { video: '393f3948', state: 'd913563a' },
      900: { video: 'e9141962', state: '533335b3' },
      1200: { video: 'dc526bb3', state: '7cb23cb4' },
    },
    audio: {
      writes: 936228,
      nonzeroWrites: 304913,
      writeHash: '96969c85',
      pcmHash: '2ea49f98',
      rms: 0.044815,
    },
  },
});
