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
      180: { video: '68ba2ad6', state: '423380ac' },
      300: { video: '4ac434b4', state: '9b68b578' },
      600: { video: '8c65d337', state: '0ca59d06' },
      900: { video: '1c3d1667', state: 'bdf72ae2' },
      1200: { video: 'ee1a9088', state: '8ed82b01' },
    },
    audio: {
      writes: 639464,
      nonzeroWrites: 639462,
      writeHash: 'e28ec2a4',
      pcmHash: 'a5e29f59',
      rms: 0.583171,
    },
  },
});
