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
      1: { video: '2aa9b3cc', state: '49782281' },
      60: { video: 'a96527e4', state: 'b1675195' },
      180: { video: 'c3931b25', state: 'e127b8ba' },
      300: { video: 'c71533f7', state: '5d18e5ae' },
      600: { video: '7bd0282c', state: 'a51f162f' },
      900: { video: 'c1ffb40f', state: '2303d5e5' },
      1200: { video: '4eb45ba5', state: '35cfff23' },
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
