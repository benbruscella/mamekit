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
      1: { video: '9190e1eb', state: '9be98c6c' },
      60: { video: '72ec056c', state: '758a0232' },
      180: { video: '72ec056c', state: '6fe62b32' },
      300: { video: '1cbc58bf', state: '9f833c5f' },
      600: { video: '18c34a75', state: 'bb89ac03' },
      900: { video: '8a604f1d', state: 'b3acf056' },
      1200: { video: '34a4bdad', state: 'dfacdb62' },
    },
    audio: {
      writes: 13773,
      nonzeroWrites: 12803,
      writeHash: '096c35c4',
      pcmHash: 'b7f3d067',
      rms: 0.041193,
    },
  },
});
