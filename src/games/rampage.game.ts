import { sourceTarget } from './source-contract.ts';

export const rampage = sourceTarget({
  game: 'rampage',
  driver: 'src/mame/bally/mcr3.cpp',
  machine: { className: 'mcr3_state', name: 'mono_sg' },
  screen: { width: 512, height: 480 },
  soundKind: 'dac',
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'KeyZ', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      gfx1: 'aa5d75be',
      gfx2: 'bb8245ec',
      maincpu: 'aa5f5e6f',
      'sg:cpu': '89e867b6',
      'sg:pal': 'd202ef8d',
    },
    checkpoints: {
      1: { video: '8c5543ed', state: 'fc448399' },
      60: { video: '68ba2ad6', state: 'e9b80a11' },
      180: { video: '68ba2ad6', state: 'bd556bea' },
      300: { video: '4ac434b4', state: 'b85b119a' },
      600: { video: 'a3bd7210', state: 'c69a9a36' },
      900: { video: '4357166f', state: '069b71aa' },
      1200: { video: 'f446f2a6', state: '5ac44a9d' },
    },
    audio: {
      writes: 639992,
      nonzeroWrites: 639990,
      writeHash: 'c8b3eafc',
      pcmHash: 'dfad8b6c',
      rms: 0.585149,
    },
  },
});
