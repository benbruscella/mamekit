import { sourceTarget } from './source-contract.ts';

export const asteroid = sourceTarget({
  game: 'asteroid',
  driver: 'src/mame/atari/asteroid.cpp',
  machine: { className: 'asteroid_state', name: 'asteroid' },
  screen: { width: 1045, height: 789 },
  soundKind: 'discrete',
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
      1: { video: '84953b31', state: 'afad8598' },
      60: { video: 'aa79a33a', state: '1aad108a' },
      180: { video: '02b609f9', state: 'b6b5e3b3' },
      300: { video: '8dd8f0ad', state: '938b3852' },
      600: { video: 'a5c4f35f', state: '6152172e' },
      900: { video: '15bc4bf2', state: '41684ea8' },
      1200: { video: 'c73a859f', state: 'c0d3a436' },
    },
    audio: {
      writes: 1981,
      nonzeroWrites: 1042,
      writeHash: '7c938506',
      pcmHash: '58f60da2',
      rms: 0.048293,
    },
  },
});
