import { sourceTarget } from './source-contract.ts';

export const travrusa = sourceTarget({
  game: 'travrusa',
  driver: 'src/mame/irem/travrusa.cpp',
  machine: { className: 'travrusa_state', name: 'travrusa' },
  screen: { width: 240, height: 256 },
  soundKind: 'ay8910',
  frames: 1800,
  minimumFps: 40,
  checkpoints: [1, 120, 300, 600, 900, 1200, 1500, 1800],
  actions: [
    { atFrame: 600, code: 'Digit5', heldFrames: 20, releasedFrames: 20 },
    { atFrame: 640, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 780, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 900, code: 'KeyZ', heldFrames: 20, releasedFrames: 20 },
    { atFrame: 1020, code: 'Space', heldFrames: 20, releasedFrames: 20 },
    { atFrame: 1140, code: 'ArrowLeft', heldFrames: 40, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      'irem_audio:iremsound': '66292417',
      maincpu: 'e744a481',
      proms: '027edbe8',
      sprites: '4b5d9c81',
      tiles: 'd5ba7b9c',
    },
    checkpoints: {
      1: { video: '07673647', state: '8ea55b10' },
      120: { video: '3758d352', state: '20de28d5' },
      300: { video: '9657c3e0', state: '6f84d669' },
      600: { video: '52108858', state: 'f9b6e51c' },
      900: { video: '9dae3c3b', state: '60a2ea51' },
      1200: { video: '08a7c7f1', state: '976e9bb9' },
      1500: { video: '83f69431', state: 'eeacfa61' },
      1800: { video: '71a44082', state: '03e02215' },
    },
    audio: {
      writes: 421949,
      nonzeroWrites: 416943,
      writeHash: 'c2cad442',
      pcmHash: '76a3f87a',
      rms: 0.170367,
    },
  },
});
