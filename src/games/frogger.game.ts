import { sourceTarget } from './source-contract.ts';

export const frogger = sourceTarget({
  game: 'frogger',
  driver: 'src/mame/galaxian/galaxian.cpp',
  machine: { className: 'galaxian_state', name: 'frogger' },
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  frames: 900,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 480, 600, 900],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 390, code: 'ArrowUp', heldFrames: 30, releasedFrames: 20 },
    { atFrame: 450, code: 'ArrowRight', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: '2d4299f9',
      gfx1: '29b93069',
      maincpu: '0bd0d96c',
      proms: '413703bf',
    },
    checkpoints: {
      1: { video: 'e1e3eb19', state: '7b2e3722' },
      60: { video: '10075d9f', state: '3eeab0f2' },
      180: { video: '8f59fe5f', state: '6e736438' },
      300: { video: '44890969', state: 'bb7bdfb9' },
      480: { video: 'dde8c3ac', state: 'c05d3f61' },
      600: { video: '5b60f00b', state: '361d38f3' },
      900: { video: '8e5b4b09', state: '5a1698b1' },
    },
    audio: {
      writes: 4905,
      nonzeroWrites: 1724,
      writeHash: 'a94e2906',
      pcmHash: 'e45a3f70',
      rms: 0.067525,
    },
  },
});
