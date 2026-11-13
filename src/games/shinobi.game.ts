import { sourceTarget } from './source-contract.ts';

export const shinobi = sourceTarget({
  game: 'shinobi',
  // Bounded closure gaps covered by this target's real-ROM acceptance.
  runtimeCoverage: {
    generationGaps: [],
    handlerGaps: [],
    allowDirectScreen: true,
  },
  driver: 'src/mame/sega/segas16a.cpp',
  machine: { className: 'segas16a_state', name: 'system16a' },
  screen: { width: 320, height: 224 },
  soundKind: 'stream',
  golden: {
    regions: {
      gfx1: '4c02aa74',
      maincpu: '7cb4de68',
      soundcpu: '0ca8555b',
      sprites: '2bf43cbb',
      upd7751: 'b15f2aa2',
      upd7751data: '6d7966da',
    },
    checkpoints: {
      1: { video: '2aa9b3cc', state: '18f75893' },
      60: { video: 'ef2d4e2d', state: 'f5a454e1' },
      180: { video: 'ef2d4e2d', state: '1873d1a6' },
      300: { video: 'ef2d4e2d', state: '0a86061e' },
      600: { video: '7bd0282c', state: 'c8ca395b' },
      900: { video: 'a1c97233', state: '867e58a6' },
      1200: { video: '5d22e379', state: '3c027e6c' },
    },
    audio: {
      writes: 959999,
      nonzeroWrites: 637925,
      writeHash: '40f85cee',
      pcmHash: 'e6235c96',
      rms: 0.320769,
    },
  },
});
