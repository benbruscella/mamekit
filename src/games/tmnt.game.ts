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
      1: { video: 'ccabac4d', state: '052ac459' },
      60: { video: 'c09f43f6', state: '781172ce' },
      180: { video: 'c09f43f6', state: '7bbac774' },
      300: { video: '85873842', state: 'a52eea05' },
      600: { video: 'b074f216', state: 'd7fdac2a' },
      900: { video: '0d93e9f0', state: '54f496b0' },
      1200: { video: '044407a6', state: '94570e1b' },
    },
    audio: {
      writes: 1001934,
      nonzeroWrites: 403998,
      writeHash: '1b61c891',
      pcmHash: 'f31fdffd',
      rms: 0.062269,
    },
  },
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
});
