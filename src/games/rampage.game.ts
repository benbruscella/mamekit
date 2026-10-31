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
      60: { video: '68ba2ad6', state: 'f411709d' },
      180: { video: '68ba2ad6', state: '766d842f' },
      300: { video: '4ac434b4', state: 'a5f26b16' },
      600: { video: '60bcebaa', state: '2aa35ff3' },
      900: { video: '4748dff8', state: 'b8e5f78c' },
      1200: { video: 'ffa13195', state: '99caca14' },
    },
    audio: {
      writes: 639488,
      nonzeroWrites: 639486,
      writeHash: 'e0119b43',
      pcmHash: '0a86685f',
      rms: 0.583238,
    },
  },
});
