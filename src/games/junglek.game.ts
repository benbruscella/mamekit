import { sourceTarget } from './source-contract.ts';

export const junglek = sourceTarget({
  game: 'junglek',
  driver: 'src/mame/taito/taitosj.cpp',
  machine: { className: 'taitosj_state', name: 'nomcu' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
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
      1: { video: '03b62cc8', state: 'cfba3aee' },
      60: { video: '22579b8f', state: 'd30889b6' },
      180: { video: '23ac7540', state: '152bb957' },
      300: { video: '57a081c2', state: '3278608b' },
      480: { video: '6f017736', state: 'f5cc1d08' },
      600: { video: '48d767ed', state: '4dcfad98' },
      900: { video: '8b9afbb2', state: '6e746c1c' },
    },
    audio: {
      writes: 729907,
      nonzeroWrites: 720933,
      writeHash: '9229bcf5',
      pcmHash: '2cee3cc4',
      rms: 0.2943,
    },
  },
});
