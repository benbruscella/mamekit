import { sourceTarget } from './source-contract.ts';

export const rampage = sourceTarget({
  game: 'rampage',
  driver: 'src/mame/bally/mcr3.cpp',
  machine: { className: 'mcr3_state', name: 'mono_sg' },
  screen: { width: 256, height: 480 },
  soundKind: 'dac',
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      gfx1: 'aa5d75be',
      gfx2: 'bb8245ec',
      maincpu: 'c682f3ce',
      'sg:cpu': '89e867b6',
      'sg:pal': 'd202ef8d',
    },
    checkpoints: {
      1: { video: '2168e31a', state: 'b078a9d7' },
      60: { video: '3fee37c8', state: '4d37c5ec' },
      180: { video: 'bfd71a23', state: 'd7fae09c' },
      300: { video: 'b9f13569', state: 'b5dfd03d' },
      600: { video: 'bfd71a23', state: '3f40197b' },
      900: { video: '3fee37c8', state: '8d68672e' },
      1200: { video: 'b9f13569', state: '4627c606' },
    },
    audio: {
      writes: 3,
      nonzeroWrites: 2,
      writeHash: '477698d5',
      pcmHash: '3938f0a1',
      rms: 0.9375,
    },
  },
});
