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
      60: { video: '68ba2ad6', state: 'e9b80a11' },
      180: { video: '68ba2ad6', state: 'bd556bea' },
      300: { video: '4ac434b4', state: 'b85b119a' },
      600: { video: '272a4eaf', state: 'c1b8ccf2' },
      // Current MAME's PIA read_alt/write_alt handlers now execute through the
      // generated device. Only the sound CPU's internal checkpoint moved;
      // every framebuffer and all 639,818 audio writes/PCM remain exact.
      900: { video: '229095b9', state: '1d55b028' },
      1200: { video: '95817170', state: '7c874976' },
    },
    audio: {
      writes: 639818,
      nonzeroWrites: 639816,
      writeHash: '9c5c9a3b',
      pcmHash: '29714fa7',
      rms: 0.600304,
    },
  },
});
