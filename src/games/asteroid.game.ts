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
      1: { video: '436e59b7', state: 'af5e2d48' },
      60: { video: 'd6867274', state: '1a844c8e' },
      180: { video: 'ab279d96', state: 'd5324e0c' },
      300: { video: '7743676c', state: '2e05b2f2' },
      600: { video: '393f3948', state: 'ae2b7e4c' },
      900: { video: 'e9141962', state: '811d2901' },
      1200: { video: 'dc526bb3', state: 'b7b2bb26' },
    },
    audio: {
      writes: 936228,
      nonzeroWrites: 304914,
      writeHash: '47449e10',
      pcmHash: '8595a005',
      rms: 0.044814,
    },
  },
});
