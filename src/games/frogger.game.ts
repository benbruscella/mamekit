import { sourceTarget } from './source-contract.ts';

export const frogger = sourceTarget({
  game: 'frogger',
  driver: 'src/mame/galaxian/galaxian.cpp',
  machine: { className: 'galaxian_state', name: 'frogger' },
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  frames: 900,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 480, 600, 900],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 390, code: 'ArrowUp', heldFrames: 30, releasedFrames: 20 },
    { atFrame: 450, code: 'ArrowRight', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: '2d4299f9',
      gfx1: '29b93069',
      maincpu: '0bd0d96c',
      proms: '413703bf',
    },
    checkpoints: {
      1: { video: 'e1e3eb19', state: '0002ddb2' },
      60: { video: '0657403c', state: '2d82db26' },
      180: { video: '8f59fe5f', state: '35d24ce4' },
      300: { video: '44890969', state: '49ec415a' },
      480: { video: 'a68ee068', state: 'd1bb5862' },
      600: { video: '0fd1ce5c', state: '13a4524c' },
      900: { video: 'f2a8b8a4', state: 'f587332b' },
    },
    audio: {
      writes: 1809,
      nonzeroWrites: 1724,
      writeHash: 'b5ce5a23',
      pcmHash: 'de668dee',
      rms: 0.013758,
    },
  },
});
