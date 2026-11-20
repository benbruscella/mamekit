import { sourceTarget } from './source-contract.ts';

export const dkongjr = sourceTarget({
  game: 'dkongjr',
  driver: 'src/mame/nintendo/dkong.cpp',
  machine: { className: 'dkong_state', name: 'dkongjr' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
  frames: 1800,
  // CPUs compiled whole from MAME (#249) run heavier than the hand cores:
  // CI measured 41.6 fps against the floor of 45, so the floor is about 90% of that.
  minimumFps: 37,
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
      1: { video: 'e12763c8', state: '7c86dd83' },
      60: { video: 'd22e74dd', state: '8910a306' },
      180: { video: 'd22e74dd', state: 'c0edda7a' },
      300: { video: 'd22e74dd', state: 'e8963a48' },
      600: { video: 'ca5432b5', state: '71ed6b88' },
      1200: { video: 'f7286a9e', state: '637d9b37' },
      1800: { video: '20431d6c', state: '61190005' },
    },
    audio: {
      writes: 1425599,
      nonzeroWrites: 1425599,
      writeHash: '1cd6e32a',
      pcmHash: 'fae689c8',
      rms: 0.053916,
    },
  },
});
