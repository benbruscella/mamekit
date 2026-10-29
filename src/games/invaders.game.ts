import { sourceTarget } from './source-contract.ts';

export const invaders = sourceTarget({
  game: 'invaders',
  driver: 'src/mame/midw8080/mw8080bw.cpp',
  machine: { className: 'invaders_state', name: 'invaders' },
  screen: { width: 260, height: 224 },
  soundKind: 'discrete',
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
      1: { video: 'e8273a79', state: '3f2718bf' },
      60: { video: '7f097af0', state: '1d5dbc95' },
      180: { video: '0f631559', state: '584fbb07' },
      300: { video: '64709a0d', state: 'f13a3f7c' },
      420: { video: 'e2d8e7f5', state: '915ec793' },
      600: { video: 'a4acf059', state: 'c7547d9d' },
    },
    audio: {
      writes: 721,
      nonzeroWrites: 717,
      writeHash: 'b3c5819b',
      pcmHash: '922e118d',
      rms: 0.035166,
    },
  },
});
