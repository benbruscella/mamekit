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
      '1': { video: '07673647', state: '99734a6e' },
      '60': { video: 'a0de4703', state: '67852465' },
      '180': { video: '32a9fd8d', state: 'a1b1c8d2' },
      '300': { video: '0781227d', state: '67c059cf' },
      '600': { video: 'a745f5a7', state: '177762c5' },
      '900': { video: 'a745f5a7', state: 'c72526f2' },
      '1200': { video: 'a745f5a7', state: 'fd535e2d' },
    },
    audio: {
      writes: 42342,
      nonzeroWrites: 42298,
      writeHash: '70d839eb',
      pcmHash: 'ee6e7505',
      rms: 0.009175,
    },
  },
});
