import { sourceTarget } from './source-contract.ts';

export const rocnrope = sourceTarget({
  game: 'rocnrope',
  driver: 'src/mame/konami/rocnrope.cpp',
  machine: { className: 'rocnrope_state', name: 'rocnrope' },
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
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
      1: { video: 'fe92a11c', state: 'ecfb0dd9' },
      60: { video: '133dcf53', state: 'a3ec27fc' },
      300: { video: '0ba4f893', state: 'ba045f35' },
      540: { video: '5512b739', state: '210b77b9' },
      720: { video: 'd00efec3', state: '992ddfcd' },
      1200: { video: '7c86ea84', state: 'f2b02bbc' },
    },
    audio: {
      writes: 1422,
      nonzeroWrites: 1291,
      writeHash: 'a32316d4',
      pcmHash: 'e1fefe7b',
      rms: 0.019606,
    },
  },
});
