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
      1: { video: '67857eb2', state: '97bf9cc8' },
      60: { video: '8f9ced1b', state: 'abc73343' },
      180: { video: '57e879a2', state: 'e44a789a' },
      300: { video: 'f2a6ed1d', state: '7fb6018e' },
      600: { video: '53ce8f1b', state: '67e54077' },
      900: { video: 'e9b25028', state: 'ed1875fd' },
      1200: { video: '08f9eaf5', state: 'd3f6d080' },
      1500: { video: 'dfede3ba', state: 'cb2e9c3e' },
      1800: { video: 'f1b83d61', state: '95b70afc' },
    },
    audio: {
      writes: 1425599,
      nonzeroWrites: 1425597,
      writeHash: '7a6478d6',
      pcmHash: '60773903',
      rms: 0.147068,
    },
  },
});
