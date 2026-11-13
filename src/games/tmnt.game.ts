import { sourceTarget } from './source-contract.ts';

export const tmnt = sourceTarget({
  game: 'tmnt',
  driver: 'src/mame/konami/tmnt.cpp',
  machine: { className: 'tmnt_state', name: 'tmnt' },
  screen: { width: 320, height: 224 },
  soundKind: 'stream',
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
      1: { video: 'ccabac4d', state: '338f32f7' },
      60: { video: 'c09f43f6', state: '22e83acc' },
      180: { video: 'c09f43f6', state: 'f7390705' },
      300: { video: '85873842', state: 'abfba936' },
      600: { video: 'b074f216', state: 'e0a659df' },
      900: { video: '0d93e9f0', state: '455dd44f' },
      1200: { video: '044407a6', state: 'b089496c' },
    },
    audio: {
      writes: 973209,
      nonzeroWrites: 375402,
      writeHash: '99b059fe',
      pcmHash: 'ca6aaade',
      rms: 0.043593,
    },
  },
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
});
