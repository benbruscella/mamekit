import { sourceTarget } from './source-contract.ts';

export const tutankhm = sourceTarget({
  game: 'tutankhm',
  driver: 'src/mame/konami/tutankhm.cpp',
  machine: { className: 'tutankhm_state', name: 'tutankhm' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
  frames: 1200,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'KeyL', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      maincpu: '1aa48a17',
      'timeplt_audio:tpsound': 'c196904d',
    },
    checkpoints: {
      1: { video: 'f7e6ac81', state: '92017f12' },
      60: { video: 'f7e6ac81', state: 'cebee884' },
      180: { video: '0d63df78', state: '5f9f3bd4' },
      300: { video: '356f8336', state: '7780f357' },
      600: { video: 'e24cbb8e', state: 'd5e75b66' },
      900: { video: '62c0a2d9', state: 'd77779ee' },
      1200: { video: '8d6d604e', state: '421b6118' },
    },
    audio: {
      writes: 950400,
      nonzeroWrites: 950399,
      writeHash: '123bc3b9',
      pcmHash: '32bfdc2b',
      rms: 0.426051,
    },
  },
});
