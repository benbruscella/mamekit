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
      60: { video: '8ea7af2c', state: 'f0b4e99e' },
      180: { video: '8ea7af2c', state: '4bb11296' },
      300: { video: '68ba2ad6', state: '31863225' },
      600: { video: '3ce984a6', state: '3508e8d2' },
      900: { video: '9d25b404', state: '4762b44f' },
      1200: { video: 'dc563673', state: '9611fa28' },
    },
    audio: {
      writes: 752468,
      nonzeroWrites: 752466,
      writeHash: '909d395b',
      pcmHash: 'ec31ceb9',
      rms: 0.596638,
    },
  },
});
