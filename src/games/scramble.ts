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
    // Scramble is still on its PLAYER ONE transition at frame 510. Exercise
    // both live fire inputs once the ship is accepting controls.
    { atFrame: 570, code: 'Space', heldFrames: 20, releasedFrames: 10 },
    { atFrame: 610, code: 'KeyZ', heldFrames: 20, releasedFrames: 10 },
    { atFrame: 650, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: 'ab3f2efe',
      gfx1: '85211f51',
      maincpu: 'd404a433',
      proms: '4e3caeab',
    },
    checkpoints: {
      1: { video: '0d7b640f', state: '0ba93c20' },
      60: { video: '7b8e7e80', state: '6ae422b7' },
      180: { video: '77eb032f', state: 'd0ba6d7c' },
      300: { video: '363a4cad', state: '31630d47' },
      480: { video: '2ddf92a3', state: 'd63d2e51' },
      600: { video: '36593e3b', state: 'f343621c' },
      900: { video: '9565486f', state: 'b152025c' },
    },
    audio: {
      writes: 6986,
      nonzeroWrites: 6103,
      writeHash: '8a9b052f',
      pcmHash: '6557abbf',
      rms: 0.034689,
    },
  },
};
