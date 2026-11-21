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
      60: { video: '68ba2ad6', state: '5392ceeb' },
      180: { video: '68ba2ad6', state: 'ab2e625c' },
      300: { video: '4ac434b4', state: '97c21bef' },
      600: { video: 'ceea705b', state: '282c94ce' },
      900: { video: '17564c81', state: 'd072d15f' },
      1200: { video: '10343cfe', state: 'cc95f6a4' },
    },
    audio: {
      writes: 1919999,
      nonzeroWrites: 1919999,
      writeHash: '809ca1e1',
      pcmHash: '54c8efb3',
      rms: 0.458594,
    },
  },
});
