import type { GameTestContract } from './types.ts';

export const trackfld: GameTestContract = {
  game: 'trackfld',
  category: 'arcade',
  driver: 'src/mame/konami/trackfld.cpp',
  machine: { className: 'trackfld_state', name: 'trackfld' },
  romEnvironment: 'MAMEKIT_TRACKFLD_ROM',
  screen: { width: 256, height: 224 },
  soundKind: 'sn76489',
  frames: 1200,
  minimumFps: 20,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 600, code: 'Space', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 720, code: 'KeyZ', heldFrames: 60, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: '9c119722',
      gfx1: '6a1076ce',
      gfx2: 'de1ce800',
      maincpu: 'fd90c93c',
      proms: 'b5a21e37',
      vlm: 'f546a56b',
    },
    checkpoints: {
      1: { video: '7dfcdedc', state: 'c0a332f6' },
      60: { video: '1b2d0eec', state: '85c2e874' },
      180: { video: '6f6992d8', state: '0c0aff75' },
      300: { video: '0dc8abd3', state: 'fe05e068' },
      600: { video: '5fcbfaa8', state: '778adc62' },
      900: { video: '73a5cbb7', state: 'abfdaf5a' },
      1200: { video: '8faba9c2', state: '42e50f96' },
    },
    audio: {
      writes: 18309,
      nonzeroWrites: 14521,
      writeHash: 'f9c449c8',
      pcmHash: '994f84b5',
      rms: 0.057449,
    },
  },
};
