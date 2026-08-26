import type { GameTestContract } from './types.ts';

export const gyruss: GameTestContract = {
  game: 'gyruss',
  category: 'arcade',
  driver: 'src/mame/konami/gyruss.cpp',
  machine: { className: 'gyruss_state', name: 'gyruss' },
  romEnvironment: 'MAMEKIT_GYRUSS_ROM',
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
      1: { video: 'f7e6ac81', state: 'a108ba3d' },
      60: { video: '8f81534a', state: '0f182676' },
      300: { video: '35fd8ef1', state: '55e6125c' },
      480: { video: '0cf148d4', state: 'b98399a4' },
      720: { video: 'bbe296d9', state: '345aa9a8' },
      1200: { video: 'b12f288e', state: '93804ecf' },
      1800: { video: '4867b3ce', state: 'be3a20ae' },
    },
    audio: {
      writes: 94209,
      nonzeroWrites: 65393,
      writeHash: '3fe0832e',
      pcmHash: '65d5df73',
      rms: 0.100275,
    },
  },
};
