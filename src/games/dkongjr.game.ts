import { sourceTarget } from './source-contract.ts';

export const dkongjr = sourceTarget({
  game: 'dkongjr',
  driver: 'src/mame/nintendo/dkong.cpp',
  machine: { className: 'dkong_state', name: 'dkongjr' },
  screen: { width: 256, height: 224 },
  soundKind: 'discrete',
  frames: 1800,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 600, 1200, 1800],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1200, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 1380, code: 'Space', heldFrames: 20, releasedFrames: 20 },
    { atFrame: 1500, code: 'ArrowUp', heldFrames: 120, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      gfx1: 'c11b3325',
      gfx2: 'bd52a994',
      maincpu: '0c8e05ef',
      proms: '16fcc2e7',
      soundcpu: '715da5f8',
    },
    checkpoints: {
      1: { video: 'e12763c8', state: 'ba7c71dc' },
      60: { video: 'd22e74dd', state: 'a8ce0123' },
      180: { video: 'd22e74dd', state: '46dc3858' },
      300: { video: 'd22e74dd', state: 'a4c80792' },
      600: { video: 'ca5432b5', state: '94101d6b' },
      1200: { video: 'f7286a9e', state: '19a88ce0' },
      1800: { video: 'f5f56d9e', state: '6375f6ea' },
    },
    audio: {
      writes: 332990,
      nonzeroWrites: 275039,
      writeHash: '999a86cd',
      pcmHash: '9aac3f53',
      rms: 0.090985,
    },
  },
});
