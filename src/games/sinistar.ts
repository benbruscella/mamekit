import { sourceTarget } from './source-contract.ts';

export const sinistar = sourceTarget({
  game: 'sinistar',
  driver: 'src/mame/williams/williams.cpp',
  machine: { className: 'williams_state', name: 'sinistar_upright' },
  screen: { width: 292, height: 240 },
  soundKind: 'dac',
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'KeyZ', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      maincpu: 'c154cd24',
      proms: '7d9a7ed2',
      soundcpu: 'e5586ced',
    },
    checkpoints: {
      1: { video: '926ea52a', state: '752dd5af' },
      60: { video: 'b497b99e', state: '6bc34255' },
      180: { video: 'f0b8f876', state: '4a9f1723' },
      300: { video: 'f0b8f876', state: 'ce6c81d8' },
      600: { video: 'f0b8f876', state: '3b542816' },
      900: { video: 'f0b8f876', state: 'be5f13d5' },
      1200: { video: 'f0b8f876', state: 'b68068a5' },
    },
    audio: {
      writes: 4,
      nonzeroWrites: 2,
      writeHash: 'c6a67f6b',
      pcmHash: '677e3a55',
      rms: 0.234375,
    },
  },
});
