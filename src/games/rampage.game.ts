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
      60: { video: '68ba2ad6', state: '3709500e' },
      180: { video: '68ba2ad6', state: '1e26f241' },
      300: { video: '4ac434b4', state: 'b29fcb77' },
      600: { video: 'ceea705b', state: 'e787752b' },
      900: { video: '17564c81', state: '4bdfd997' },
      1200: { video: '10343cfe', state: 'bec36cd4' },
    },
    audio: {
      writes: 639410,
      nonzeroWrites: 639408,
      writeHash: '96f8c0de',
      pcmHash: 'ea9432fe',
      rms: 0.581755,
    },
  },
});
