import { sourceTarget } from './source-contract.ts';

export const shinobi = sourceTarget({
  game: 'shinobi',
  // Bounded closure gaps covered by this target's real-ROM acceptance.
  runtimeCoverage: {
    generationGaps: [],
    handlerGaps: [],
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
      1: { video: '2aa9b3cc', state: '0a8d411c' },
      60: { video: 'b7f7a18a', state: '4d5d5e5b' },
      180: { video: 'e1c0b9d7', state: 'b2f0c293' },
      300: { video: 'b92420f3', state: '18fc1f91' },
      600: { video: '7bd0282c', state: 'c8ca395b' },
      900: { video: '0387a3e5', state: '867e58a6' },
      1200: { video: 'ff6c32af', state: '3c027e6c' },
    },
    audio: {
      writes: 959999,
      nonzeroWrites: 637914,
      writeHash: '5c4246eb',
      pcmHash: '1208dec0',
      rms: 0.320786,
    },
  },
});
