import { sourceTarget } from './source-contract.ts';

export const rampage = sourceTarget({
  game: 'rampage',
  driver: 'src/mame/bally/mcr3.cpp',
  machine: { className: 'mcr3_state', name: 'mono_sg' },
  screen: { width: 512, height: 480 },
  soundKind: 'stream',
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
      1: { video: '8c5543ed', state: '8d468580' },
      60: { video: '68ba2ad6', state: '8709594e' },
      180: { video: '68ba2ad6', state: 'd58ba071' },
      300: { video: '4ac434b4', state: '97c21bef' },
      600: { video: 'ec55110c', state: '98f0917d' },
      900: { video: 'e1050e5c', state: '3f6f8878' },
      1200: { video: 'ea262b08', state: '8bbfe7d6' },
    },
    audio: {
      writes: 1920000,
      nonzeroWrites: 1920000,
      writeHash: 'a1e1ee94',
      pcmHash: '4f34b3ef',
      rms: 0.455211,
    },
  },
});
