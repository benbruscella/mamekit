import { sourceTarget } from './source-contract.ts';

export const ddragon = sourceTarget({
  game: 'ddragon',
  driver: 'src/mame/technos/ddragon.cpp',
  machine: { className: 'ddragon_state', name: 'ddragon' },
  screen: { width: 256, height: 240 },
  soundKind: 'ym2151',
  golden: {
    regions: {
      adpcm1: '34755de3',
      adpcm2: '904de6f8',
      chars: '7a8b8db4',
      maincpu: '2d20dc14',
      proms: '35c1db1c',
      soundcpu: '4872e7f6',
      sprites: '786ce8da',
      sub: 'f5232d03',
      tiles: 'ce033abe',
    },
    checkpoints: {
      1: { video: '07673647', state: '8c2e69c1' },
      60: { video: 'a0de4703', state: 'ccf168a8' },
      180: { video: '32a9fd8d', state: '46b637c9' },
      300: { video: '0781227d', state: 'd327a2d6' },
      600: { video: 'fb11624c', state: '40eb1774' },
      900: { video: '92059745', state: 'c8bed1e4' },
      1200: { video: 'ce337472', state: 'bd7eb429' },
    },
    audio: {
      writes: 697046,
      nonzeroWrites: 667486,
      writeHash: 'eb5196e8',
      pcmHash: 'f377c12d',
      rms: 0.047194,
    },
  },
});
