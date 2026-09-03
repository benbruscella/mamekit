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
      60: { video: 'c09f43f6', state: '6e3d1f1e' },
      180: { video: 'c09f43f6', state: '7f1e34fb' },
      300: { video: '85873842', state: '9ec399a9' },
      600: { video: 'd2673caf', state: '2e43982e' },
      900: { video: '0d93e9f0', state: '59fd6d06' },
      1200: { video: '2aa9b3cc', state: 'c2cf3717' },
    },
    audio: {
      writes: 29412,
      nonzeroWrites: 29223,
      writeHash: 'd26d1bc0',
      pcmHash: '45e81499',
      rms: 0.04449,
    },
  },
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
});
