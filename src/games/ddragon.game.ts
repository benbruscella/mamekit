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
      1: { video: '07673647', state: '6ac0b424' },
      60: { video: 'a0de4703', state: '602d6119' },
      180: { video: '32a9fd8d', state: '4bac25ec' },
      300: { video: '0781227d', state: 'ba0ed55b' },
      600: { video: 'fb11624c', state: 'd5771d69' },
      900: { video: '92059745', state: 'a37ac85b' },
      1200: { video: 'ce337472', state: '0c7f3831' },
    },
    audio: {
      writes: 1002700,
      nonzeroWrites: 712520,
      writeHash: '500aa993',
      pcmHash: '24999ac8',
      rms: 0.045876,
    },
  },
});
