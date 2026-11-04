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
      1: { video: '84953b31', state: '5a369561' },
      60: { video: 'aa79a33a', state: '7a0aed7a' },
      180: { video: '02b609f9', state: '3f1b6854' },
      300: { video: '8dd8f0ad', state: 'e3ede628' },
      600: { video: 'a5c4f35f', state: '5c724be5' },
      900: { video: '15bc4bf2', state: 'a0067f21' },
      1200: { video: 'c73a859f', state: '5d22b750' },
    },
    audio: {
      writes: 936228,
      nonzeroWrites: 304913,
      writeHash: 'e484adad',
      pcmHash: '2ea49f98',
      rms: 0.044815,
    },
  },
});
