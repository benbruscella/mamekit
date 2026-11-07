import { sourceTarget } from './source-contract.ts';

export const friskyt = sourceTarget({
  game: 'friskyt',
  driver: 'src/mame/nichibutsu/seicross.cpp',
  machine: { className: 'seicross_state', name: 'nvram' },
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
      1: { video: '67857eb2', state: 'b66f2715' },
      60: { video: '8f9ced1b', state: 'd3734a81' },
      180: { video: '57e879a2', state: '4787a3bb' },
      300: { video: 'f2a6ed1d', state: 'a198929c' },
      600: { video: '53ce8f1b', state: 'e49d1c74' },
      900: { video: 'e9b25028', state: '8c41ff14' },
      1200: { video: '08f9eaf5', state: '22b5b875' },
      1500: { video: 'dfede3ba', state: 'ea7c84ce' },
      1800: { video: 'f1b83d61', state: 'b3bfb876' },
    },
    audio: {
      writes: 91109,
      nonzeroWrites: 90748,
      writeHash: '985e68ba',
      pcmHash: '736f8175',
      rms: 0.118129,
    },
  },
});
