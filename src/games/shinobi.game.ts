import { sourceTarget } from './source-contract.ts';

export const shinobi = sourceTarget({
  game: 'shinobi',
  // Bounded closure gaps covered by this target's real-ROM acceptance.
  runtimeCoverage: {
    generationGaps: [
      'i8255:I8255',
      'sprites:SEGA_SYS16A_SPRITES',
      'upd7751:UPD7751',
      'upd7751_8243:I8243',
    ],
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
      1: { video: '2aa9b3cc', state: '89a6e1bb' },
      60: { video: 'a96527e4', state: '90598293' },
      180: { video: 'c3931b25', state: 'be37ba8d' },
      300: { video: 'c71533f7', state: '4705f94e' },
      600: { video: '7bd0282c', state: '234ae0d6' },
      900: { video: 'c1ffb40f', state: '6c3f17e6' },
      1200: { video: '4eb45ba5', state: 'a2380006' },
    },
    audio: {
      writes: 50580,
      nonzeroWrites: 46391,
      writeHash: '919d037b',
      pcmHash: '72fcc556',
      rms: 0.400946,
    },
  },
});
