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
      1: { video: 'f7e6ac81', state: '84ac1f36' },
      60: { video: 'f7e6ac81', state: '23c365d6' },
      180: { video: '0d63df78', state: 'c0f8147a' },
      300: { video: '356f8336', state: '26f1f451' },
      600: { video: 'e24cbb8e', state: '4f664f03' },
      900: { video: '62c0a2d9', state: 'f07df715' },
      1200: { video: '8d6d604e', state: '12133c3c' },
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
