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
      60: { video: '99f41834', state: 'ef827cf9' },
      180: { video: '99f41834', state: '36e85d53' },
      300: { video: '1cbc58bf', state: '4076d637' },
      600: { video: 'eed4849a', state: '803ca26a' },
      900: { video: '7c7781f2', state: '0a743e8b' },
      1200: { video: '1abc9775', state: '826330e4' },
    },
    audio: {
      writes: 13742,
      nonzeroWrites: 12772,
      writeHash: '223b0b18',
      pcmHash: 'ee426e61',
      rms: 0.041098,
    },
  },
});
