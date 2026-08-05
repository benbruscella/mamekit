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
      1: { video: 'c3c0ec9f', state: '63518711' },
      60: { video: '03223bbe', state: 'db9fb450' },
      180: { video: '8014e1b8', state: 'bcf79408' },
      300: { video: '6dd13920', state: '9d32a82d' },
      600: { video: '548e3159', state: '9db831fa' },
      900: { video: 'e28c056d', state: '15702911' },
      1200: { video: '088f6b95', state: '3280129d' },
    },
    audio: {
      writes: 1981,
      nonzeroWrites: 1042,
      writeHash: 'd725ac56',
      pcmHash: '50cb76b4',
      rms: 0.046664,
    },
  },
});
