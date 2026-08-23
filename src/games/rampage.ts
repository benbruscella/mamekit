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
      1: { video: '8c5543ed', state: 'b078a9d7' },
      60: { video: '68ba2ad6', state: '1d9edc19' },
      180: { video: '68ba2ad6', state: '78e68949' },
      300: { video: '4ac434b4', state: '7c707c5d' },
      600: { video: 'a3bd7210', state: '0e8d414f' },
      900: { video: '4357166f', state: 'c117b1db' },
      1200: { video: 'f446f2a6', state: '8cd31eef' },
    },
    audio: {
      writes: 452958,
      nonzeroWrites: 452956,
      writeHash: '0e50df11',
      pcmHash: '5200a206',
      rms: 0.450493,
    },
  },
});
