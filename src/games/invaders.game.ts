import { sourceTarget } from './source-contract.ts';

export const invaders = sourceTarget({
  game: 'invaders',
  driver: 'src/mame/midw8080/mw8080bw.cpp',
  machine: { className: 'invaders_state', name: 'invaders' },
  screen: { width: 260, height: 224 },
  soundKind: 'stream',
  frames: 600,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 420, 600],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 390, code: 'ArrowLeft', heldFrames: 20, releasedFrames: 10 },
    { atFrame: 430, code: 'ArrowRight', heldFrames: 20, releasedFrames: 10 },
    { atFrame: 470, code: 'Space', heldFrames: 10, releasedFrames: 10 },
  ],
  golden: {
    regions: {
      maincpu: 'eaf1bbdb',
    },
    checkpoints: {
      1: { video: 'e8273a79', state: '4271c694' },
      60: { video: '7f097af0', state: 'eb87b1e2' },
      180: { video: '0f631559', state: 'a6210ae9' },
      300: { video: '64709a0d', state: '8d316c99' },
      420: { video: 'e2d8e7f5', state: '0b27b07f' },
      600: { video: 'a4acf059', state: '882c383c' },
    },
    audio: {
      writes: 483692,
      nonzeroWrites: 64230,
      writeHash: '46d86a71',
      pcmHash: '5d787b85',
      rms: 0.033734,
    },
  },
});
