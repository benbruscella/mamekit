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
      1: { video: '8c5543ed', state: 'ee38e257' },
      60: { video: '68ba2ad6', state: '658a1e65' },
      180: { video: '68ba2ad6', state: '4391ddc0' },
      300: { video: '4ac434b4', state: '18714c2a' },
      600: { video: 'a3bd7210', state: 'c4a5e6c7' },
      900: { video: '4357166f', state: '2a1dce5d' },
      1200: { video: 'f446f2a6', state: 'f84f4dc2' },
    },
    audio: {
      writes: 752370,
      nonzeroWrites: 752368,
      writeHash: 'f525c3e4',
      pcmHash: 'cb6d9ba1',
      rms: 0.586716,
    },
  },
});
