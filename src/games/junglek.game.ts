import { sourceTarget } from './source-contract.ts';

export const junglek = sourceTarget({
  game: 'junglek',
  driver: 'src/mame/taito/taitosj.cpp',
  machine: { className: 'taitosj_state', name: 'nomcu' },
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
      60: { video: '2a3fbb82', state: 'ecfb82bf' },
      180: { video: '5232ad1c', state: '2cd4bb7c' },
      300: { video: '7c3913ba', state: 'db8e4d36' },
      480: { video: '44f0c76a', state: 'aa363ca6' },
      600: { video: '64dcc557', state: 'c8ab2bce' },
      900: { video: '4c431e70', state: '14958ce6' },
    },
    audio: {
      writes: 1580862,
      nonzeroWrites: 1168947,
      writeHash: 'a5bd19f6',
      pcmHash: '28f0017f',
      rms: 0.361686,
    },
  },
});
