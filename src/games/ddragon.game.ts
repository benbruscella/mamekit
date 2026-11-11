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
      1: { video: '07673647', state: 'c75233eb' },
      60: { video: 'a0de4703', state: '79bebb6e' },
      180: { video: '32a9fd8d', state: '92b83f65' },
      300: { video: '0781227d', state: '655cbe39' },
      600: { video: 'fb11624c', state: 'e24dac58' },
      900: { video: '92059745', state: 'cc3af536' },
      1200: { video: 'ce337472', state: 'ddc38c39' },
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
