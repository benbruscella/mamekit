import type { GameTestContract } from './types.ts';

export const junglek: GameTestContract = {
  game: 'junglek',
  category: 'arcade',
  driver: 'src/mame/taito/taitosj.cpp',
  machine: { className: 'taitosj_state', name: 'nomcu' },
  romEnvironment: 'MAMEKIT_JUNGLEK_ROM',
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  frames: 900,
  minimumFps: 40,
  checkpoints: [1, 60, 180, 300, 480, 600, 900],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 390, code: 'ArrowRight', heldFrames: 90, releasedFrames: 20 },
    { atFrame: 510, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: 'ee11cb55',
      gfx: '5ccbde7a',
      maincpu: '955580af',
      proms: 'b833b5ea',
    },
    checkpoints: {
      '1': { video: '03b62cc8', state: '7714187f' },
      '60': { video: '74a28fa4', state: '78132bf8' },
      '180': { video: 'ea0e624a', state: 'f6673572' },
      '300': { video: 'c9b5ba05', state: 'cd9ad2fb' },
      '480': { video: 'c6d21abf', state: 'ccae81f9' },
      '600': { video: '6046f689', state: '9f4f96ed' },
      '900': { video: '12723160', state: 'e4c5eaf1' },
    },
    audio: {
      writes: 1502613,
      nonzeroWrites: 1001681,
      writeHash: 'dc2d1a5c',
      pcmHash: '8dbb52ef',
      rms: 0.02061,
    },
  },
};
