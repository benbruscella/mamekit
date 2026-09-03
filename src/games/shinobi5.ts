import { sourceTarget } from './source-contract.ts';

export const shinobi5 = sourceTarget({
  game: 'shinobi5',
  driver: 'src/mame/sega/segas16b.cpp',
  machine: { className: 'segas16b_state', name: 'system16b' },
  screen: { width: 320, height: 224 },
  soundKind: 'ym2151',
  golden: {
    regions: {
      maincpu: '14c35487',
      soundcpu: '95af04c2',
      sprites: 'be942a1a',
      tiles: 'a1f0acec',
    },
    checkpoints: {
      1: { video: '2aa9b3cc', state: '620fd55a' },
      60: { video: '4f5251a8', state: '3b7a6e1a' },
      180: { video: '4f5251a8', state: 'af08ed70' },
      300: { video: '4f5251a8', state: 'ce876790' },
      600: { video: '094cff78', state: 'a9cf9373' },
      900: { video: '539ab5df', state: 'e34307bb' },
      1200: { video: '0ef12320', state: '1e9cac59' },
    },
    audio: {
      writes: 53906,
      nonzeroWrites: 49258,
      writeHash: 'adbad38c',
      pcmHash: '1e89427b',
      rms: 0.019685,
    },
  },
});
