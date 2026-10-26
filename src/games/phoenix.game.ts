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
      maincpu: 'e644eefc',
      proms: '3895ff77',
    },
    checkpoints: {
      1: { video: 'eda81a59', state: 'b17abff0' },
      60: { video: '62f7defc', state: '494cfdb3' },
      180: { video: 'dfd9596d', state: '85ef965b' },
      300: { video: '8dea2b6a', state: 'fa74c04f' },
      600: { video: '8a08218e', state: '53cbb345' },
      900: { video: 'b3c84d37', state: '348ae99b' },
      1200: { video: '7f60d66e', state: '328fb083' },
    },
    audio: {
      writes: 2296,
      nonzeroWrites: 2294,
      writeHash: 'e3f1067d',
      pcmHash: '1c5851cc',
      rms: 0.191096,
    },
  },
});
