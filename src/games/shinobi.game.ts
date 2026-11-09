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
  soundKind: 'ym2151',
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
      1: { video: '2aa9b3cc', state: 'ea9ebb98' },
      60: { video: 'b7f7a18a', state: 'baf4bac9' },
      180: { video: 'e1c0b9d7', state: 'c90ef3dc' },
      300: { video: 'b92420f3', state: '5f43a9e2' },
      600: { video: '7bd0282c', state: 'dc073149' },
      900: { video: '77c61761', state: '581e2886' },
      1200: { video: 'f88df8cb', state: '7d93306d' },
    },
    audio: {
      writes: 50582,
      nonzeroWrites: 46393,
      writeHash: 'af61e333',
      pcmHash: 'e2411f46',
      rms: 0.017981,
    },
  },
});
