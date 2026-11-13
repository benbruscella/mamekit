import { sourceTarget } from './source-contract.ts';

export const rocnrope = sourceTarget({
  game: 'rocnrope',
  driver: 'src/mame/konami/rocnrope.cpp',
  machine: { className: 'rocnrope_state', name: 'rocnrope' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
  frames: 1200,
  minimumFps: 45,
  checkpoints: [1, 60, 300, 540, 720, 1200],
  actions: [
    { atFrame: 540, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 570, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 720, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 840, code: 'Space', heldFrames: 20, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      maincpu: '40717b8a',
      pal_cpuvidbd: 'd202ef8d',
      proms: '5484cc33',
      sprites: '8ce87af8',
      tiles: 'd3b1b72f',
      'timeplt_audio:tpsound': 'f47e6800',
    },
    checkpoints: {
      1: { video: 'fa7a7abe', state: '15f3f155' },
      60: { video: '133dcf53', state: 'e9f61566' },
      300: { video: '0ba4f893', state: 'd0d8fb18' },
      540: { video: '5512b739', state: '239933dc' },
      720: { video: '4205a71e', state: '3b8c1e55' },
      1200: { video: '775eb52d', state: 'b0b9591f' },
    },
    audio: {
      writes: 960000,
      nonzeroWrites: 959999,
      writeHash: '685a23b8',
      pcmHash: '4bb3d9d9',
      rms: 0.404708,
    },
  },
});
