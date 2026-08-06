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
      60: { video: '2a3fbb82', state: 'd9171ca1' },
      180: { video: '5232ad1c', state: '570f6002' },
      300: { video: '7c3913ba', state: '2c2e5571' },
      480: { video: '4d05e92d', state: 'cd28c587' },
      600: { video: '03c776f7', state: 'c1866f0e' },
      900: { video: 'f6c43d73', state: '1db8c826' },
    },
    audio: {
      writes: 1580862,
      nonzeroWrites: 1168947,
      writeHash: 'a1dc657c',
      pcmHash: '539f1604',
      rms: 0.126143,
    },
  },
};
