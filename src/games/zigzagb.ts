import type { GameTestContract } from './types.ts';

export const zigzagb: GameTestContract = {
  game: 'zigzagb',
  category: 'arcade',
  driver: 'src/mame/galaxian/galaxian.cpp',
  machine: { className: 'zigzagb_state', name: 'zigzag' },
  romEnvironment: 'MAMEKIT_ZIGZAGB_ROM',
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
      60: { video: '7b64b913', state: '50fa2292' },
      180: { video: '8609f0f0', state: '22333330' },
      300: { video: '305d32b3', state: '02a40739' },
      480: { video: 'b25ac089', state: '63753296' },
      600: { video: 'bbd7e192', state: 'bcb2f692' },
      900: { video: 'c5f19a71', state: '082133ef' },
    },
    audio: {
      writes: 6121,
      nonzeroWrites: 5416,
      writeHash: '2f07a9d4',
      pcmHash: '9016af95',
      rms: 0.100237,
    },
  },
};
