import { sourceTarget } from './source-contract.ts';

export const matmania = sourceTarget({
  game: 'matmania',
  driver: 'src/mame/technos/matmania.cpp',
  machine: { className: 'matmania_state', name: 'matmania' },
  screen: { width: 256, height: 240 },
  soundKind: 'ay8910',
  golden: {
    regions: {
      audiocpu: '8192d9e2',
      chars: 'a7d49c63',
      maincpu: 'f7ecd59d',
      proms: 'edfc7e15',
      sprites: '348c7774',
      tiles: '0bc21206',
    },
    checkpoints: {
      1: { video: '9190e1eb', state: '4e63a5d8' },
      60: { video: '99f41834', state: '59c0396c' },
      180: { video: '99f41834', state: 'eb3a5487' },
      300: { video: '1cbc58bf', state: 'f63493a2' },
      600: { video: 'eed4849a', state: '52a7fee7' },
      900: { video: '7c7781f2', state: '81732a66' },
      1200: { video: '1abc9775', state: '0e512490' },
    },
    audio: {
      writes: 13742,
      nonzeroWrites: 12772,
      writeHash: '7911172c',
      pcmHash: 'd99cb6e2',
      rms: 0.19498,
    },
  },
});
