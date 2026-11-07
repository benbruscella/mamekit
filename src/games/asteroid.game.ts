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
      1: { video: '84953b31', state: '6feea69b' },
      60: { video: 'aa79a33a', state: '734b92e3' },
      180: { video: '02b609f9', state: 'd55c1ab9' },
      300: { video: '8dd8f0ad', state: '58bfa1d0' },
      600: { video: 'a5c4f35f', state: 'd13f15c2' },
      900: { video: '15bc4bf2', state: '5fc58bf5' },
      1200: { video: 'c73a859f', state: 'bdf87b66' },
    },
    audio: {
      writes: 936228,
      nonzeroWrites: 304913,
      writeHash: '167b08a4',
      pcmHash: '2ea49f98',
      rms: 0.044815,
    },
  },
});
