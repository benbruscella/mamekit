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
      1: { video: 'f7e6ac81', state: '21724e05' },
      60: { video: 'f7e6ac81', state: '6ea6d1f9' },
      180: { video: '0d63df78', state: '51036291' },
      300: { video: '356f8336', state: '180cf2cc' },
      600: { video: 'e24cbb8e', state: '62a883ab' },
      900: { video: '62c0a2d9', state: '233ddf72' },
      1200: { video: '8d6d604e', state: '566998dd' },
    },
    audio: {
      writes: 950400,
      nonzeroWrites: 950399,
      writeHash: 'd30e72b5',
      pcmHash: '67b2fbf1',
      rms: 0.426052,
    },
  },
});
