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
      180: { video: '32a9fd8d', state: '1f39e2d7' },
      300: { video: '0781227d', state: '7fcf8297' },
      600: { video: 'fb11624c', state: 'b5de6666' },
      900: { video: '92059745', state: '8a38ec2a' },
      1200: { video: 'ce337472', state: 'd8e64e9d' },
    },
    audio: {
      writes: 697046,
      nonzeroWrites: 667483,
      writeHash: '82d993fd',
      pcmHash: 'dd491e0b',
      rms: 0.047269,
    },
  },
});
