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
      60: { video: 'd22e74dd', state: 'da570944' },
      180: { video: 'd22e74dd', state: 'ec241fdf' },
      300: { video: 'd22e74dd', state: 'b247cdd6' },
      600: { video: 'ca5432b5', state: '9057333c' },
      1200: { video: 'f7286a9e', state: '749683b3' },
      1800: { video: '772d76fc', state: 'fc4753b5' },
    },
    audio: {
      writes: 332990,
      nonzeroWrites: 275039,
      writeHash: '7191f7cf',
      pcmHash: '9b282f80',
      rms: 0.090994,
    },
  },
});
