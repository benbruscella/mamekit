import { sourceTarget } from './source-contract.ts';

export const ddragon = sourceTarget({
  game: 'ddragon',
  driver: 'src/mame/technos/ddragon.cpp',
  machine: { className: 'ddragon_state', name: 'ddragon' },
  screen: { width: 256, height: 240 },
  soundKind: 'stream',
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
      1: { video: '07673647', state: '1b39560b' },
      60: { video: 'a0de4703', state: '510570d9' },
      180: { video: '32a9fd8d', state: '2390e980' },
      300: { video: '0781227d', state: '94e22110' },
      600: { video: 'fb11624c', state: 'bd00e1bd' },
      900: { video: '92059745', state: '650c41b1' },
      1200: { video: 'ce337472', state: 'aa8d6462' },
    },
    audio: {
      writes: 1002700,
      nonzeroWrites: 712538,
      writeHash: 'f1227972',
      pcmHash: '12b35ac6',
      rms: 0.046039,
    },
  },
});
