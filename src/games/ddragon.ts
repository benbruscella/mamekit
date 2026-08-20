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
      1: { video: '07673647', state: '9f1f044d' },
      60: { video: 'a0de4703', state: '0887898d' },
      180: { video: '32a9fd8d', state: 'cf8b8255' },
      300: { video: '0781227d', state: 'b365b3a8' },
      600: { video: '40d865a6', state: 'ec58a649' },
      900: { video: '2c6e5bf2', state: '9a20e542' },
      1200: { video: 'ce337472', state: 'ed393b6a' },
    },
    audio: {
      writes: 697044,
      nonzeroWrites: 667478,
      writeHash: 'b9722207',
      pcmHash: '3152a110',
      rms: 0.047255,
    },
  },
});
