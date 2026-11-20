import { sourceTarget } from './source-contract.ts';

export const gyruss = sourceTarget({
  game: 'gyruss',
  driver: 'src/mame/konami/gyruss.cpp',
  machine: { className: 'gyruss_state', name: 'gyruss' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
  frames: 1800,
  // CPUs compiled whole from MAME (#249) run heavier than the hand cores:
  // CI measured 27.7 fps against the floor of 34, so the floor is about 90% of that.
  minimumFps: 25,
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
      1: { video: 'f7e6ac81', state: 'cf09d415' },
      60: { video: '8f81534a', state: 'e453a2c2' },
      300: { video: '35fd8ef1', state: '1f8f9d23' },
      480: { video: '0cf148d4', state: '2c1f1195' },
      720: { video: 'bbe296d9', state: '99d211a3' },
      1200: { video: 'b12f288e', state: 'cc0f26f4' },
      1800: { video: '12baf728', state: 'a23ffa08' },
    },
    audio: {
      writes: 1425599,
      nonzeroWrites: 1425599,
      writeHash: '0126dba4',
      pcmHash: '24717ff0',
      rms: 0.064035,
    },
  },
});
