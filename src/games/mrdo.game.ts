import { sourceTarget } from './source-contract.ts';

export const mrdo = sourceTarget({
  game: 'mrdo',
  driver: 'src/mame/universal/mrdo.cpp',
  machine: { className: 'mrdo_state', name: 'mrdo' },
  screen: { width: 240, height: 192 },
  soundKind: 'stream',
  golden: {
    regions: {
      gfx1: 'a066a445',
      gfx2: '90acd037',
      gfx3: '302a7bd6',
      maincpu: '269101c1',
      pal16r6: 'ca2dffbc',
      proms: '15083536',
    },
    checkpoints: {
      1: { video: '99857a71', state: '138a7328' },
      60: { video: '9e6aa1fb', state: '87c45b71' },
      180: { video: 'dcd153d4', state: '5fb5d145' },
      300: { video: '1069bf60', state: '8ba45b6c' },
      600: { video: '0d88e0b0', state: '45973be1' },
      900: { video: 'ef3642ff', state: '3a44414d' },
      1200: { video: 'c545f642', state: '96208515' },
    },
    audio: {
      writes: 960909,
      nonzeroWrites: 392244,
      writeHash: '20c3632d',
      pcmHash: 'e3563a3f',
      rms: 0.095064,
    },
  },
});
