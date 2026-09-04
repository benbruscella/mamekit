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
      1: { video: '322f58d5', state: '9be98c6c' },
      60: { video: '99f41834', state: '758a0232' },
      180: { video: '99f41834', state: '6fe62b32' },
      300: { video: '1cbc58bf', state: '9f833c5f' },
      600: { video: 'eed4849a', state: '63fffa16' },
      900: { video: '7c7781f2', state: '6bdaa643' },
      1200: { video: '1abc9775', state: '17e0b3d6' },
    },
    audio: {
      writes: 13795,
      nonzeroWrites: 12825,
      writeHash: '47b69cf0',
      pcmHash: 'afa9eae6',
      rms: 0.040973,
    },
  },
});
