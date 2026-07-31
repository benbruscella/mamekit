import type { GameTestContract } from './types.ts';

export const friskyt: GameTestContract = {
  game: 'friskyt',
  category: 'arcade',
  driver: 'src/mame/nichibutsu/seicross.cpp',
  machine: { className: 'seicross_state', name: 'nvram' },
  romEnvironment: 'MAMEKIT_FRISKYT_ROM',
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  frames: 900,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 480, 600, 900],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 390, code: 'ArrowLeft', heldFrames: 60, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      gfx: '7ff2e92a',
      maincpu: '76dc9da4',
      proms: 'b238187d',
    },
    checkpoints: {
      '1': { video: '67857eb2', state: 'f254ce5e' },
      '60': { video: '8f9ced1b', state: '83bb33e1' },
      '180': { video: '57e879a2', state: '503e1609' },
      '300': { video: 'f2a6ed1d', state: '87a94f64' },
      '480': { video: 'f7e6ac81', state: 'b76927e2' },
      '600': { video: '53ce8f1b', state: 'd66024cc' },
      '900': { video: 'e9b25028', state: 'ad5e3704' },
    },
    audio: {
      writes: 182078,
      nonzeroWrites: 181694,
      writeHash: 'e3a7e0d0',
      pcmHash: '03b62dff',
      rms: 0.038463,
    },
  },
};
