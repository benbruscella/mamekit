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
      1: { video: '03b62cc8', state: '6c17b347' },
      60: { video: '22579b8f', state: '8a4a2b43' },
      180: { video: '23ac7540', state: '8136730d' },
      300: { video: '57a081c2', state: '8453439f' },
      480: { video: '6f017736', state: '257f8024' },
      600: { video: '48d767ed', state: '61b6ae3b' },
      900: { video: '8b9afbb2', state: 'e62fb968' },
    },
    audio: {
      writes: 729907,
      nonzeroWrites: 720933,
      writeHash: '25a64696',
      pcmHash: 'ed8f63c8',
      rms: 0.294307,
    },
  },
});
