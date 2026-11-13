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
      1: { video: 'eda81a59', state: '27924cc1' },
      60: { video: 'aa75f3a2', state: '97afb4a7' },
      180: { video: 'd2e02c87', state: '49bd8936' },
      300: { video: 'ddd2a658', state: '71becd7a' },
      600: { video: '94c1f3f4', state: '8d7c12bb' },
      900: { video: 'be2b9f58', state: '5b6781b1' },
      1200: { video: 'c331d61c', state: '662653f5' },
    },
    audio: {
      writes: 943718,
      nonzeroWrites: 943718,
      writeHash: '5eb6fdd1',
      pcmHash: 'f48a1e52',
      rms: 0.094137,
    },
  },
});
