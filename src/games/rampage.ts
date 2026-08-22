import { sourceTarget } from './source-contract.ts';

export const rampage = sourceTarget({
  game: 'rampage',
  driver: 'src/mame/bally/mcr3.cpp',
  machine: { className: 'mcr3_state', name: 'mono_sg' },
  screen: { width: 256, height: 480 },
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
      1: { video: '2168e31a', state: 'b078a9d7' },
      60: { video: 'a7f4620c', state: '1ed93acb' },
      180: { video: 'a7f4620c', state: '62237f37' },
      300: { video: '19ba7c50', state: '3d09be78' },
      600: { video: 'c4ab3bdb', state: '9423d55e' },
      900: { video: '1548a86b', state: '34cc2d1d' },
      1200: { video: '800eaa36', state: '2c345126' },
    },
    audio: {
      writes: 3,
      nonzeroWrites: 3,
      writeHash: 'ea0819e5',
      pcmHash: 'd2718abf',
      rms: 0.96875,
    },
  },
});
