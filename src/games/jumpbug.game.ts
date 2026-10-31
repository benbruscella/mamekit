import { sourceTarget } from './source-contract.ts';

export const jumpbug = sourceTarget({
  game: 'jumpbug',
  driver: 'src/mame/galaxian/galaxian.cpp',
  machine: { className: 'galaxian_state', name: 'jumpbug' },
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  frames: 1200,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      gfx1: '44240cbe',
      maincpu: '78ffa1b8',
      proms: '6a0c7d87',
    },
    checkpoints: {
      1: { video: 'b2afb37a', state: '1103d631' },
      60: { video: 'f7e6ac81', state: 'e297193f' },
      180: { video: '15d34f44', state: 'daab8e47' },
      300: { video: '50cc86e4', state: '8638a1ed' },
      600: { video: 'bf9bfef9', state: 'cc12c435' },
      900: { video: '7a6c0e9c', state: '50919752' },
      1200: { video: '0243826f', state: 'f08a2809' },
    },
    audio: {
      writes: 2928,
      nonzeroWrites: 1366,
      writeHash: 'a5d974af',
      pcmHash: '191b91c7',
      rms: 0.111433,
    },
  },
});
