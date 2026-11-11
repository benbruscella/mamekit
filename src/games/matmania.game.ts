import { sourceTarget } from './source-contract.ts';

export const matmania = sourceTarget({
  game: 'matmania',
  driver: 'src/mame/technos/matmania.cpp',
  machine: { className: 'matmania_state', name: 'matmania' },
  screen: { width: 256, height: 240 },
  soundKind: 'stream',
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
      1: { video: '9190e1eb', state: '0ff3800c' },
      60: { video: '99f41834', state: '7cfbd61f' },
      180: { video: '99f41834', state: 'c6615105' },
      300: { video: '1cbc58bf', state: '80f407c6' },
      600: { video: 'eed4849a', state: 'ba5201cc' },
      900: { video: '7c7781f2', state: 'ffe3661a' },
      1200: { video: '1abc9775', state: '901cc240' },
    },
    audio: {
      writes: 1002700,
      nonzeroWrites: 1002697,
      writeHash: 'cb46f983',
      pcmHash: '3f513838',
      rms: 0.194519,
    },
  },
});
