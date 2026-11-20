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
      600: { video: '40d865a6', state: '91047605' },
      900: { video: '2c6e5bf2', state: '650c41b1' },
      1200: { video: 'ce337472', state: 'aa8d6462' },
    },
    audio: {
      writes: 1002700,
      nonzeroWrites: 711852,
      writeHash: 'b997b85e',
      pcmHash: '526aa1a6',
      rms: 0.045881,
    },
  },
});
