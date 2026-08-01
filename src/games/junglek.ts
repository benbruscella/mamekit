import type { GameTestContract } from './types.ts';

export const junglek: GameTestContract = {
  game: 'junglek',
  category: 'arcade',
  driver: 'src/mame/taito/taitosj.cpp',
  machine: { className: 'taitosj_state', name: 'nomcu' },
  romEnvironment: 'MAMEKIT_JUNGLEK_ROM',
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  shareRequirements: [{ share: 'collision_reg', minimumNonzeroBytes: 1 }],
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
      1: { video: '03b62cc8', state: '7714187f' },
      60: { video: '11a48dbb', state: 'a100a3df' },
      180: { video: '69a99b25', state: '11fe75db' },
      300: { video: '47a22583', state: '8b35073d' },
      480: { video: 'f4ac2bee', state: '0417c3d4' },
      600: { video: '2ad21022', state: '41394fc9' },
      900: { video: 'c3180158', state: '0bfb1c9d' },
    },
    audio: {
      writes: 1188198,
      nonzeroWrites: 776362,
      writeHash: '906ecb50',
      pcmHash: '72a30677',
      rms: 0.036681,
    },
  },
};
