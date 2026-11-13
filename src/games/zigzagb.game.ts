import { sourceTarget } from './source-contract.ts';

export const zigzagb = sourceTarget({
  game: 'zigzagb',
  driver: 'src/mame/galaxian/galaxian.cpp',
  machine: { className: 'zigzagb_state', name: 'zigzag' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
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
      1: { video: '4ce372b8', state: '73eaaa66' },
      60: { video: '7b64b913', state: '4f983f2f' },
      180: { video: '8609f0f0', state: '667e2a5a' },
      300: { video: '305d32b3', state: 'c90f4590' },
      480: { video: '3c2f9357', state: 'b453e76d' },
      600: { video: 'cda1c551', state: 'a8b39b02' },
      900: { video: 'c5f19a71', state: 'aef12b3b' },
    },
    audio: {
      writes: 712799,
      nonzeroWrites: 712797,
      writeHash: '45fd4180',
      pcmHash: '3aca7522',
      rms: 0.164021,
    },
  },
});
