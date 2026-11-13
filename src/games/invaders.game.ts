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
      1: { video: 'e8273a79', state: 'ce75c747' },
      60: { video: '7f097af0', state: '6ca5ee95' },
      180: { video: '0f631559', state: '7b4a4e8d' },
      300: { video: '64709a0d', state: '04e055ee' },
      420: { video: 'e2d8e7f5', state: 'bd2c6a5a' },
      600: { video: 'a4acf059', state: '11c10fec' },
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
