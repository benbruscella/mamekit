import { sourceTarget } from './source-contract.ts';

export const travrusa = sourceTarget({
  game: 'travrusa',
  driver: 'src/mame/irem/travrusa.cpp',
  machine: { className: 'travrusa_state', name: 'travrusa' },
  screen: { width: 240, height: 256 },
  soundKind: 'stream',
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
      1: { video: '07673647', state: '9fba75ad' },
      120: { video: '3758d352', state: '722cd2ac' },
      300: { video: '9657c3e0', state: '1b5206d0' },
      600: { video: '52108858', state: 'e8ab459e' },
      900: { video: '9dae3c3b', state: '9d497854' },
      1200: { video: '08a7c7f1', state: '8d286f77' },
      1500: { video: '3dfd17da', state: '2235df97' },
      1800: { video: '7097e9cb', state: '55c5712a' },
    },
    audio: {
      writes: 1522800,
      nonzeroWrites: 1522800,
      writeHash: 'd09bde3d',
      pcmHash: '5bbdbc42',
      rms: 0.082441,
    },
  },
});
