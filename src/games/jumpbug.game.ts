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
      1: { video: 'b2afb37a', state: '56803b9b' },
      60: { video: 'f7e6ac81', state: 'ac46d730' },
      180: { video: 'f5682a8b', state: 'c28a0e3d' },
      300: { video: 'e61e44d9', state: '6e9e5d50' },
      600: { video: 'ebbaf9fe', state: 'bbbc11cf' },
      900: { video: 'f6935313', state: '5b1159f5' },
      1200: { video: '76beb0bc', state: '8a6c4fda' },
    },
    audio: {
      writes: 950399,
      nonzeroWrites: 950397,
      writeHash: '2352a80f',
      pcmHash: 'a06ed765',
      rms: 0.183315,
    },
  },
});
