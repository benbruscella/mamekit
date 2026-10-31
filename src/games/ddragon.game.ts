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
      1: { video: '07673647', state: 'c39db011' },
      60: { video: 'a0de4703', state: 'ccf168a8' },
      180: { video: '32a9fd8d', state: '4faaa954' },
      300: { video: '0781227d', state: '2f5cc914' },
      600: { video: 'fb11624c', state: 'b7b8acb8' },
      900: { video: '92059745', state: '27c1e60c' },
      1200: { video: 'ce337472', state: '397deec6' },
    },
    audio: {
      writes: 697046,
      nonzeroWrites: 667486,
      writeHash: 'b9d4351f',
      pcmHash: '1cd4fb8c',
      rms: 0.047194,
    },
  },
});
