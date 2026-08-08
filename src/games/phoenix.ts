import { sourceTarget } from './source-contract.ts';

export const phoenix = sourceTarget({
  game: 'phoenix',
  driver: 'src/mame/phoenix/phoenix.cpp',
  machine: { className: 'phoenix_state', name: 'phoenix' },
  screen: { width: 256, height: 208 },
  soundKind: 'discrete',
  minimumAudioRms: 0.05,
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 360, code: 'Digit1', heldFrames: 10, releasedFrames: 60 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 90, releasedFrames: 20 },
    { atFrame: 750, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      bgtiles: 'efb4ace4',
      fgtiles: 'bda75c7d',
      maincpu: '908a3f5d',
      proms: '3895ff77',
    },
    checkpoints: {
      1: { video: 'eda81a59', state: 'b17abff0' },
      60: { video: '96abaa99', state: '7c65cac3' },
      180: { video: '35c0727b', state: '6f4d65de' },
      300: { video: '8dea2b6a', state: '3fe01a06' },
      600: { video: '8a08218e', state: 'fc609e80' },
      900: { video: 'b3c84d37', state: '6037dde4' },
      1200: { video: '7f60d66e', state: '5dd38bb7' },
    },
    audio: {
      writes: 2296,
      nonzeroWrites: 2294,
      writeHash: '0353cf65',
      pcmHash: '211e54de',
      rms: 0.190996,
    },
  },
});
