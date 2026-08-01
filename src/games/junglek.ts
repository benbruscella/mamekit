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
      60: { video: '11a48dbb', state: 'e3fa4b17' },
      180: { video: '69a99b25', state: '16604ead' },
      300: { video: '47a22583', state: '6a068426' },
      480: { video: 'e1f06ba6', state: '40b42cd2' },
      600: { video: 'd62000e2', state: '24447bb8' },
      900: { video: 'a7819287', state: 'd17cfa7c' },
    },
    audio: {
      writes: 1549634,
      nonzeroWrites: 1137845,
      writeHash: 'b1bb410f',
      pcmHash: '1c6830df',
      rms: 0.126158,
    },
  },
};
