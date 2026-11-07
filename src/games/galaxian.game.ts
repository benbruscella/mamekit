import { sourceTarget } from './source-contract.ts';

export const galaxian = sourceTarget({
  game: 'galaxian',
  driver: 'src/mame/galaxian/galaxian.cpp',
  machine: { className: 'galaxian_state', name: 'galaxian' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
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
      1: { video: '0d7b640f', state: '61b0ca1d' },
      60: { video: 'cd2b1b38', state: '5bddfb04' },
      180: { video: '91227fd8', state: '98c7ce9c' },
      300: { video: '72f041ba', state: '46999e36' },
      480: { video: 'e26f7289', state: '54a98c28' },
      500: { video: 'd9f0989f', state: 'd4664655' },
      900: { video: '062d5b2e', state: 'd9f25435' },
    },
    audio: {
      writes: 712799,
      nonzeroWrites: 712799,
      writeHash: 'e7e1b999',
      pcmHash: '60737b14',
      rms: 0.075846,
    },
  },
});
