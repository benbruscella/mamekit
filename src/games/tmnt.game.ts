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
      600: { video: '8ad8d6d7', state: '2e43982e' },
      900: { video: '0d93e9f0', state: '0f934d35' },
      1200: { video: '044407a6', state: 'f29b0610' },
    },
    audio: {
      // The generic device wiring path now installs each K007232 volume
      // callback once. The former duplicate listener contributed 72 extra
      // zero-valued set_volume trace entries; PCM and every nonzero hardware
      // write remain byte-for-byte unchanged.
      writes: 29340,
      nonzeroWrites: 29223,
      writeHash: '3a25afc9',
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
