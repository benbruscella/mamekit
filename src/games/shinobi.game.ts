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
      1: { video: '2aa9b3cc', state: '407f808c' },
      60: { video: 'b7f7a18a', state: '600201a3' },
      180: { video: 'e1c0b9d7', state: 'f0aaff4e' },
      300: { video: 'b92420f3', state: '061c67bf' },
      600: { video: '7bd0282c', state: '0460f7fa' },
      900: { video: '77c61761', state: '38adac68' },
      1200: { video: 'f88df8cb', state: 'e422895a' },
    },
    audio: {
      writes: 960000,
      nonzeroWrites: 640312,
      writeHash: '9a0fe7ee',
      pcmHash: '68fa5c90',
      rms: 0.32138,
    },
  },
});
