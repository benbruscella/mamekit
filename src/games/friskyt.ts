import type { GameTestContract } from './types.ts';

export const friskyt: GameTestContract = {
  game: 'friskyt',
  category: 'arcade',
  driver: 'src/mame/nichibutsu/seicross.cpp',
  machine: { className: 'seicross_state', name: 'nvram' },
  romEnvironment: 'MAMEKIT_FRISKYT_ROM',
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  frames: 1800,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200, 1500, 1800],
  actions: [
    // The hardware performs its RAM test before accepting cabinet inputs.
    { atFrame: 1100, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1200, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1300, code: 'ArrowLeft', heldFrames: 60, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      gfx: '7ff2e92a',
      maincpu: '76dc9da4',
      proms: 'b238187d',
    },
    checkpoints: {
      1: { video: '67857eb2', state: 'f254ce5e' },
      60: { video: '8f9ced1b', state: '83bb33e1' },
      180: { video: '57e879a2', state: '503e1609' },
      300: { video: 'f2a6ed1d', state: '87a94f64' },
      600: { video: '53ce8f1b', state: 'd13fae94' },
      900: { video: 'e9b25028', state: '92786626' },
      1200: { video: '08f9eaf5', state: '8e5ec672' },
      1500: { video: 'ce805316', state: '28c919f7' },
      1800: { video: '828f8fb2', state: '27dd0fa2' },
    },
    audio: {
      writes: 144156,
      nonzeroWrites: 143815,
      writeHash: '3f3aa031',
      pcmHash: '7da5609a',
      rms: 0.076709,
    },
  },
};
