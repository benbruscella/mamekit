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
      1: { video: '67857eb2', state: 'a97668c3' },
      60: { video: '8f9ced1b', state: '97c9331c' },
      180: { video: '57e879a2', state: '4d111e3b' },
      300: { video: 'f2a6ed1d', state: '26c009ae' },
      600: { video: '53ce8f1b', state: '6a8001a7' },
      900: { video: 'e9b25028', state: 'c0fafe4b' },
      1200: { video: '08f9eaf5', state: '219460a2' },
      1500: { video: 'dfede3ba', state: '85f92796' },
      1800: { video: 'f1b83d61', state: 'dbd0181e' },
    },
    audio: {
      writes: 1425600,
      nonzeroWrites: 1425598,
      writeHash: 'ea2063b6',
      pcmHash: 'c322a29f',
      rms: 0.147067,
    },
  },
});
