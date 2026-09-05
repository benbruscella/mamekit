import { sourceTarget } from './source-contract.ts';

export const shinobi = sourceTarget({
  game: 'shinobi',
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
      60: { video: 'a96527e4', state: '9759698e' },
      180: { video: 'c3931b25', state: 'a5dc8874' },
      300: { video: 'c71533f7', state: '9c05dc78' },
      600: { video: '7bd0282c', state: '4ba3ae18' },
      900: { video: 'c1ffb40f', state: '1d5b70dd' },
      1200: { video: '4eb45ba5', state: '3a5c17c2' },
    },
    audio: {
      writes: 50374,
      nonzeroWrites: 46209,
      writeHash: '845383a7',
      pcmHash: 'e3b84784',
      rms: 0.017528,
    },
  },
});
