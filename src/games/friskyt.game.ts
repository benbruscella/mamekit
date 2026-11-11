import { sourceTarget } from './source-contract.ts';

export const friskyt = sourceTarget({
  game: 'friskyt',
  driver: 'src/mame/nichibutsu/seicross.cpp',
  machine: { className: 'seicross_state', name: 'nvram' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
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
      1: { video: '67857eb2', state: 'bf7a444f' },
      60: { video: '8f9ced1b', state: 'b4183af5' },
      180: { video: '57e879a2', state: 'd4e9f05c' },
      300: { video: 'f2a6ed1d', state: '2670615f' },
      600: { video: '53ce8f1b', state: 'b7c5dea3' },
      900: { video: 'e9b25028', state: '62bcddf6' },
      1200: { video: '08f9eaf5', state: '7be11e3b' },
      1500: { video: 'dfede3ba', state: '2eaeaaaf' },
      1800: { video: 'f1b83d61', state: '93634e3b' },
    },
    audio: {
      writes: 1425600,
      nonzeroWrites: 1425598,
      writeHash: 'aa511822',
      pcmHash: '9f1a11cc',
      rms: 0.147068,
    },
  },
});
