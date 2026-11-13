import { sourceTarget } from './source-contract.ts';

export const pacman = sourceTarget({
  game: 'pacman',
  driver: 'src/mame/pacman/pacman.cpp',
  machine: { className: 'pacman_state', name: 'pacman' },
  screen: { width: 288, height: 224 },
  soundKind: 'stream',
  frames: 600,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 420, 600],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      gfx1: '0be015aa',
      maincpu: '332838db',
      namco: '3f2ff826',
      proms: 'c1e7e6a7',
    },
    checkpoints: {
      1: { video: '1556d338', state: '5fcfde18' },
      60: { video: '1556d338', state: 'd72c2a61' },
      180: { video: '7e928035', state: '54351ad0' },
      300: { video: '189e0035', state: '9d84e47f' },
      420: { video: '06b7df05', state: '5918673b' },
      600: { video: 'edb2c3f1', state: 'debd17b1' },
    },
    audio: {
      writes: 475200,
      nonzeroWrites: 219781,
      writeHash: 'c0f2e67d',
      pcmHash: 'ed068f97',
      rms: 0.169598,
    },
  },
});
