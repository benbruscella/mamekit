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
      1: { video: '2aa9b3cc', state: '9bf484da' },
      60: { video: 'a96527e4', state: 'def79f09' },
      180: { video: 'c3931b25', state: '4fa90879' },
      300: { video: 'c71533f7', state: '70fd5ef8' },
      600: { video: '7bd0282c', state: 'e5289013' },
      900: { video: 'c1ffb40f', state: '33a7878b' },
      1200: { video: '4eb45ba5', state: '6ebd6c05' },
    },
    audio: {
      writes: 50582,
      nonzeroWrites: 46393,
      writeHash: '6f5c6b63',
      pcmHash: 'd12ed86d',
      rms: 0.017942,
    },
  },
});
