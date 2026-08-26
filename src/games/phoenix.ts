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
      maincpu: '711d8644',
      proms: '3895ff77',
    },
    checkpoints: {
      1: { video: 'eda81a59', state: 'b17abff0' },
      60: { video: '96abaa99', state: '0c232354' },
      180: { video: '35c0727b', state: '3f3fca2b' },
      300: { video: '8dea2b6a', state: '7f8896c2' },
      600: { video: '8a08218e', state: '86454a3d' },
      900: { video: 'b3c84d37', state: '9e396ed0' },
      1200: { video: '7f60d66e', state: 'd8419576' },
    },
    audio: {
      writes: 2298,
      nonzeroWrites: 2296,
      writeHash: '40fee87f',
      pcmHash: 'f4fd2880',
      rms: 0.191004,
    },
  },
});
