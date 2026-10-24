import { sourceTarget } from './source-contract.ts';

export const pacman = sourceTarget({
  game: 'pacman',
  driver: 'src/mame/pacman/pacman.cpp',
  machine: { className: 'pacman_state', name: 'pacman' },
  screen: { width: 288, height: 224 },
  soundKind: 'wsg',
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
      1: { video: '1556d338', state: '0e2ea5f3' },
      60: { video: '1556d338', state: '15fd058a' },
      180: { video: '7e928035', state: 'e6643b36' },
      300: { video: '189e0035', state: 'c1cac367' },
      420: { video: '06b7df05', state: 'f8edbade' },
      600: { video: 'edb2c3f1', state: '09e0bd2b' },
    },
    audio: {
      writes: 5831,
      nonzeroWrites: 2375,
      writeHash: 'd4947dcc',
      pcmHash: '56a7797b',
      rms: 0.170388,
    },
  },
});
