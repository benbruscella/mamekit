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
      1: { video: '322f58d5', state: '00f817c7' },
      60: { video: '99f41834', state: '64fa3e21' },
      180: { video: '99f41834', state: 'c6edd023' },
      300: { video: '1cbc58bf', state: '3688c74e' },
      600: { video: 'eed4849a', state: '4c0e3290' },
      900: { video: '7c7781f2', state: '43f7bff9' },
      1200: { video: '1abc9775', state: '1bd811ec' },
    },
    audio: {
      writes: 13773,
      nonzeroWrites: 12803,
      writeHash: 'f6500b3d',
      pcmHash: 'e12378f1',
      rms: 0.040903,
    },
  },
});
