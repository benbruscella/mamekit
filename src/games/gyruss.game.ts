import { sourceTarget } from './source-contract.ts';

export const gyruss = sourceTarget({
  game: 'gyruss',
  driver: 'src/mame/konami/gyruss.cpp',
  machine: { className: 'gyruss_state', name: 'gyruss' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
  frames: 1800,
  minimumFps: 45,
  checkpoints: [1, 60, 300, 480, 720, 1200, 1800],
  actions: [
    { atFrame: 480, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 510, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 720, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 840, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audio2: '3f9b5dea',
      audiocpu: 'a1cb4e34',
      maincpu: '487c787d',
      proms: '617d77e3',
      sprites: '21881251',
      sub: '8d48e501',
      tiles: '27d8329b',
    },
    checkpoints: {
      1: { video: 'f7e6ac81', state: '5bc90e31' },
      60: { video: '8f81534a', state: '92e3e976' },
      300: { video: 'dcb5f4e5', state: 'a8500829' },
      480: { video: '0a084be4', state: '8c92013f' },
      720: { video: '95737fab', state: '04229b08' },
      1200: { video: '9a4e450b', state: '47945c98' },
      1800: { video: 'd323c100', state: '5f9ccd9f' },
    },
    audio: {
      writes: 1425599,
      nonzeroWrites: 1425599,
      writeHash: '1e9c853a',
      pcmHash: '886513a1',
      rms: 0.06248,
    },
  },
});
