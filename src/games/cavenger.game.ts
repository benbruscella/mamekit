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
      1: { video: '4d5cf6af', state: '37cb3d83' },
      60: { video: 'f3b56a02', state: '95ec22ce' },
      180: { video: 'f3b56a02', state: 'd4812415' },
      300: { video: 'f3b56a02', state: 'e06ccd9f' },
      600: { video: '7ce7b68e', state: '244c3bad' },
      900: { video: 'fcb76ebf', state: 'ee3d3648' },
      1200: { video: '79f2af5c', state: 'fb307601' },
    },
    audio: {
      writes: 958171,
      nonzeroWrites: 523568,
      writeHash: '695843bc',
      pcmHash: '3e01560e',
      rms: 0.11077,
    },
  },
});
