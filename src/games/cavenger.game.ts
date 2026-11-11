import { sourceTarget } from './source-contract.ts';

export const cavenger = sourceTarget({
  game: 'cavenger',
  driver: 'src/mame/universal/ladybug.cpp',
  machine: { className: 'ladybug_state', name: 'ladybug' },
  screen: { width: 240, height: 192 },
  soundKind: 'stream',
  golden: {
    regions: {
      gfx1: '6126a698',
      gfx2: '5f302046',
      maincpu: 'c697a39b',
      proms: '91a8ae0c',
    },
    checkpoints: {
      1: { video: '4d5cf6af', state: '684363ac' },
      60: { video: 'f3b56a02', state: '4e1d02d8' },
      180: { video: 'f3b56a02', state: '358cc6a7' },
      300: { video: 'f3b56a02', state: 'e8e7acfb' },
      600: { video: '7ce7b68e', state: 'dfda0b22' },
      900: { video: 'fcb76ebf', state: 'f91a419d' },
      1200: { video: '79f2af5c', state: '5445157a' },
    },
    audio: {
      writes: 958171,
      nonzeroWrites: 523593,
      writeHash: '04f2cd49',
      pcmHash: '3ffb006c',
      rms: 0.110766,
    },
  },
});
