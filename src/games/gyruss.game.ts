import { sourceTarget } from './source-contract.ts';

export const gyruss = sourceTarget({
  game: 'gyruss',
  driver: 'src/mame/konami/gyruss.cpp',
  machine: { className: 'gyruss_state', name: 'gyruss' },
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
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
      1: { video: 'f7e6ac81', state: 'ee93fd47' },
      60: { video: '8f81534a', state: '7297c40c' },
      300: { video: '35fd8ef1', state: 'adc4cfa7' },
      480: { video: '0cf148d4', state: '43870db2' },
      720: { video: 'bbe296d9', state: '2b528a81' },
      1200: { video: 'b12f288e', state: 'd7c77620' },
      1800: { video: '2e0de478', state: '44b121e7' },
    },
    audio: {
      writes: 193971,
      nonzeroWrites: 151075,
      writeHash: '7019205d',
      pcmHash: '383cf230',
      rms: 0.097712,
    },
  },
});
