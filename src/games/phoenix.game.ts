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
      maincpu: 'bb53c793',
      proms: '3895ff77',
    },
    checkpoints: {
      1: { video: 'eda81a59', state: 'b17abff0' },
      60: { video: '62f7defc', state: 'e96e3adc' },
      180: { video: 'dfd9596d', state: '9fda95c1' },
      300: { video: '8dea2b6a', state: '956678c6' },
      600: { video: '89941e07', state: 'a3105edb' },
      900: { video: 'b3c84d37', state: '95466c61' },
      1200: { video: '7f60d66e', state: 'a8a23a32' },
    },
    audio: {
      writes: 2296,
      nonzeroWrites: 2294,
      writeHash: 'bdff5550',
      pcmHash: 'e5b52d2e',
      rms: 0.191005,
    },
  },
});
