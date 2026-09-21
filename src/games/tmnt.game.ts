import { sourceTarget } from './source-contract.ts';

export const tmnt = sourceTarget({
  game: 'tmnt',
  driver: 'src/mame/konami/tmnt.cpp',
  machine: { className: 'tmnt_state', name: 'tmnt' },
  screen: { width: 320, height: 224 },
  soundKind: 'ym2151',
  golden: {
    regions: {
      audiocpu: '41ac7e19',
      k007232: 'e2ac3063',
      k051960: 'c0278137',
      k052109: '13473e67',
      maincpu: '3248c3da',
      proms: 'a79bf0ab',
      title: 'fca078c7',
      upd: '2dfd674b',
    },
    checkpoints: {
      1: { video: 'ccabac4d', state: 'c63adc38' },
      60: { video: 'c09f43f6', state: '475abe66' },
      180: { video: 'c09f43f6', state: '656e9722' },
      300: { video: '85873842', state: '330d53b7' },
      600: { video: '8ad8d6d7', state: 'a267d104' },
      900: { video: '0d93e9f0', state: '4c4de2d7' },
      1200: { video: '044407a6', state: 'a8786e43' },
    },
    audio: {
      writes: 28735,
      nonzeroWrites: 28615,
      writeHash: 'fccd63b3',
      pcmHash: '9b159183',
      rms: 0.044481,
    },
  },
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
});
