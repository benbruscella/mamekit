import { sourceTarget } from './source-contract.ts';

export const jumpbug = sourceTarget({
  game: 'jumpbug',
  driver: 'src/mame/galaxian/galaxian.cpp',
  machine: { className: 'galaxian_state', name: 'jumpbug' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
  frames: 1200,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      gfx1: '44240cbe',
      maincpu: '78ffa1b8',
      proms: '6a0c7d87',
    },
    checkpoints: {
      1: { video: 'b2afb37a', state: 'ec0468f5' },
      60: { video: 'f7e6ac81', state: 'ac46d730' },
      180: { video: '027e01a0', state: 'c28a0e3d' },
      300: { video: '69c4ea9c', state: '6e9e5d50' },
      600: { video: 'c29258cd', state: 'bbbc11cf' },
      900: { video: '7c3cdf85', state: '5b1159f5' },
      1200: { video: '9ae29426', state: '8a6c4fda' },
    },
    audio: {
      writes: 950399,
      nonzeroWrites: 950397,
      writeHash: 'c1ce3714',
      pcmHash: '8b2b67dd',
      rms: 0.183315,
    },
  },
});
