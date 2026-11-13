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
      1: { video: '9190e1eb', state: 'e3f86d40' },
      60: { video: '99f41834', state: '6967d7aa' },
      180: { video: '99f41834', state: '7e46f08b' },
      300: { video: '1cbc58bf', state: 'b8cdb89e' },
      600: { video: 'eed4849a', state: 'aeb96ea7' },
      900: { video: '7c7781f2', state: '0a848ed6' },
      1200: { video: '1abc9775', state: '09cf25bf' },
    },
    audio: {
      writes: 1002700,
      nonzeroWrites: 1002696,
      writeHash: '90fc3963',
      pcmHash: 'ce912746',
      rms: 0.194871,
    },
  },
});
