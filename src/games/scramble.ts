import type { GameTestContract } from './types.ts';

export const scramble: GameTestContract = {
  game: 'scramble',
  category: 'arcade',
  driver: 'src/mame/galaxian/galaxian.cpp',
  machine: { className: 'galaxian_state', name: 'scramble' },
  romEnvironment: 'MAMEKIT_SCRAMBLE_ROM',
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  frames: 900,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 480, 600, 900],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 390, code: 'ArrowRight', heldFrames: 90, releasedFrames: 20 },
    { atFrame: 510, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: 'ab3f2efe',
      gfx1: '85211f51',
      maincpu: 'd404a433',
      proms: '4e3caeab',
    },
    checkpoints: {
      '1': { video: '0d7b640f', state: '0ba93c20' },
      '60': { video: '7b8e7e80', state: '6ae422b7' },
      '180': { video: '77eb032f', state: 'd0ba6d7c' },
      '300': { video: '363a4cad', state: '31630d47' },
      '480': { video: '2ddf92a3', state: 'd63d2e51' },
      '600': { video: '1c02538a', state: 'ecb501a3' },
      '900': { video: 'ace7f40f', state: 'cf97383d' },
    },
    audio: {
      writes: 4364,
      nonzeroWrites: 4023,
      writeHash: '65c68114',
      pcmHash: 'b6837272',
      rms: 0.020319,
    },
  },
};
