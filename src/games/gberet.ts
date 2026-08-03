import type { GameTestContract } from './types.ts';

export const gberet: GameTestContract = {
  game: 'gberet',
  category: 'arcade',
  driver: 'src/mame/konami/gberet.cpp',
  machine: { className: 'gberet_state', name: 'gberet' },
  romEnvironment: 'MAMEKIT_GBERET_ROM',
  screen: { width: 240, height: 224 },
  soundKind: 'sn76489',
  frames: 1200,
  minimumFps: 30,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 180, releasedFrames: 20 },
    { atFrame: 820, code: 'Space', heldFrames: 20, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      maincpu: '2e6a0e9a',
      proms: '9e17432e',
      sprites: 'df6c4a50',
      tiles: '4da7bd1b',
    },
    checkpoints: {
      1: { video: '95e26824', state: '7e1a74a6' },
      60: { video: '8a1bdfa5', state: 'e1bb955a' },
      180: { video: 'e1aa1a2a', state: '8330a706' },
      300: { video: '7902484b', state: '0e64542a' },
      600: { video: 'e57374fe', state: '611bc8e8' },
      900: { video: 'cdb58405', state: '6f6b5045' },
      1200: { video: 'f56f7213', state: '9fbf97c8' },
    },
    audio: {
      writes: 1450,
      nonzeroWrites: 1322,
      writeHash: '24ff3d28',
      pcmHash: 'e2f795f3',
      rms: 0.02158,
    },
  },
};
