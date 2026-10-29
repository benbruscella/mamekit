import { sourceTarget } from './source-contract.ts';

export const galaxian = sourceTarget({
  game: 'galaxian',
  driver: 'src/mame/galaxian/galaxian.cpp',
  machine: { className: 'galaxian_state', name: 'galaxian' },
  screen: { width: 256, height: 224 },
  soundKind: 'discrete',
  frames: 900,
  minimumFps: 60,
  checkpoints: [1, 60, 180, 300, 480, 500, 900],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 390, code: 'ArrowLeft', heldFrames: 20, releasedFrames: 10 },
    { atFrame: 440, code: 'ArrowRight', heldFrames: 20, releasedFrames: 10 },
    { atFrame: 490, code: 'Space', heldFrames: 10, releasedFrames: 10 },
  ],
  golden: {
    regions: {
      gfx1: 'b2b81d38',
      maincpu: 'f64af3ca',
      proms: 'c3ac9467',
    },
    checkpoints: {
      1: { video: '0d7b640f', state: 'be17ce9d' },
      60: { video: 'cd2b1b38', state: '1419bc9e' },
      180: { video: '91227fd8', state: 'cdaea2a7' },
      300: { video: '84219165', state: 'f400152f' },
      480: { video: 'f9d52100', state: '0fa97089' },
      500: { video: '192f6052', state: '0c61ded9' },
      900: { video: 'a8ee9ceb', state: '41b4c8ed' },
    },
    audio: {
      writes: 4001,
      nonzeroWrites: 2177,
      writeHash: '5d2d2153',
      pcmHash: '935cd659',
      rms: 0.100905,
    },
  },
});
