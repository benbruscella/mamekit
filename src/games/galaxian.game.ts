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
      1: { video: '0d7b640f', state: '7ffbb98a' },
      60: { video: 'd3a0a375', state: 'b6dc84da' },
      180: { video: '91227fd8', state: 'c96d8e4d' },
      300: { video: '6a784218', state: '416eedf3' },
      480: { video: 'b46cce44', state: 'f5b27db4' },
      500: { video: '11c5cbc8', state: '13400e0f' },
      900: { video: '27221b07', state: '39bd1024' },
    },
    audio: {
      writes: 712799,
      nonzeroWrites: 712799,
      writeHash: 'e25a3cf9',
      pcmHash: '60737b14',
      rms: 0.075846,
    },
  },
});
