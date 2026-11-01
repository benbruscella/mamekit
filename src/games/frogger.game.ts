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
      1: { video: 'e1e3eb19', state: '0002ddb2' },
      60: { video: '10075d9f', state: 'c51ecac1' },
      180: { video: '8f59fe5f', state: 'fe49c885' },
      300: { video: '44890969', state: 'a89ffe04' },
      480: { video: 'dde8c3ac', state: 'a50c3410' },
      600: { video: '5b60f00b', state: '183c69a6' },
      900: { video: '8e5b4b09', state: '263ca3e3' },
    },
    audio: {
      writes: 4905,
      nonzeroWrites: 1724,
      writeHash: 'a94e2906',
      pcmHash: '14f33cd9',
      rms: 0.065763,
    },
  },
});
