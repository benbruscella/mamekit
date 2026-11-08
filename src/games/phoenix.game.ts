import { sourceTarget } from './source-contract.ts';

export const phoenix = sourceTarget({
  game: 'phoenix',
  driver: 'src/mame/phoenix/phoenix.cpp',
  machine: { className: 'phoenix_state', name: 'phoenix' },
  screen: { width: 256, height: 208 },
  soundKind: 'stream',
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
      1: { video: 'eda81a59', state: '14fabd2b' },
      60: { video: 'aa75f3a2', state: '11229c83' },
      180: { video: 'd2e02c87', state: 'de953278' },
      300: { video: 'ddd2a658', state: 'a14c9f75' },
      600: { video: '94c1f3f4', state: '8806148d' },
      900: { video: 'be2b9f58', state: '8da75768' },
      1200: { video: 'c331d61c', state: 'ef9a311f' },
    },
    audio: {
      writes: 943718,
      nonzeroWrites: 943718,
      writeHash: '248766a8',
      pcmHash: '545e4cca',
      rms: 0.083604,
    },
  },
});
