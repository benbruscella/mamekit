import { sourceTarget } from './source-contract.ts';

export const tutankhm = sourceTarget({
  game: 'tutankhm',
  driver: 'src/mame/konami/tutankhm.cpp',
  machine: { className: 'tutankhm_state', name: 'tutankhm' },
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
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
      1: { video: 'f7e6ac81', state: '1ddc60be' },
      60: { video: 'f7e6ac81', state: 'ec3404e5' },
      180: { video: '0d63df78', state: '60571a7a' },
      300: { video: '356f8336', state: '004ce73b' },
      600: { video: 'e24cbb8e', state: '06260afe' },
      900: { video: '62c0a2d9', state: '6690ca97' },
      1200: { video: '8d6d604e', state: 'd5912ab4' },
    },
    audio: {
      writes: 17323,
      nonzeroWrites: 11316,
      writeHash: '514f822a',
      pcmHash: 'b5c115eb',
      rms: 0.426765,
    },
  },
});
