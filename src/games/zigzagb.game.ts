import { sourceTarget } from './source-contract.ts';

export const zigzagb = sourceTarget({
  game: 'zigzagb',
  driver: 'src/mame/galaxian/galaxian.cpp',
  machine: { className: 'zigzagb_state', name: 'zigzag' },
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  frames: 900,
  minimumFps: 60,
  checkpoints: [1, 60, 180, 300, 480, 600, 900],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 390, code: 'ArrowLeft', heldFrames: 30, releasedFrames: 10 },
    { atFrame: 440, code: 'ArrowRight', heldFrames: 30, releasedFrames: 10 },
    { atFrame: 490, code: 'ArrowUp', heldFrames: 30, releasedFrames: 10 },
    { atFrame: 540, code: 'Space', heldFrames: 10, releasedFrames: 10 },
  ],
  golden: {
    regions: {
      gfx1: '31fa6061',
      gfx2: '43b64cd9',
      maincpu: 'ed94ef43',
      proms: 'aa486dd0',
    },
    checkpoints: {
      1: { video: '4ce372b8', state: 'fd9cb13c' },
      60: { video: '7b64b913', state: 'f261e858' },
      180: { video: '8609f0f0', state: 'be7a5d15' },
      300: { video: '305d32b3', state: '58343c4c' },
      480: { video: '3c2f9357', state: 'a72e1e2f' },
      600: { video: 'cda1c551', state: 'f257f7a8' },
      900: { video: 'c5f19a71', state: 'c31d4d75' },
    },
    audio: {
      writes: 6132,
      nonzeroWrites: 5361,
      writeHash: 'e3abf5d1',
      pcmHash: 'e04bc05a',
      rms: 0.167995,
    },
  },
});
