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
      60: { video: '68ba2ad6', state: 'eb5c1faa' },
      180: { video: '68ba2ad6', state: '353599f5' },
      300: { video: '4ac434b4', state: 'e4b91c1f' },
      600: { video: '829b7099', state: '76960de9' },
      900: { video: 'af735323', state: '25ca40fa' },
      1200: { video: '9543db89', state: 'f5b4dc2d' },
    },
    audio: {
      writes: 639500,
      nonzeroWrites: 639498,
      writeHash: 'ec8349e8',
      pcmHash: '95d8172c',
      rms: 0.577029,
    },
  },
});
