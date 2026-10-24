import { sourceTarget } from './source-contract.ts';

export const mrdo = sourceTarget({
  game: 'mrdo',
  driver: 'src/mame/universal/mrdo.cpp',
  machine: { className: 'mrdo_state', name: 'mrdo' },
  screen: { width: 240, height: 192 },
  soundKind: 'sn76489',
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
      1: { video: '99857a71', state: '3292bf61' },
      60: { video: '9e6aa1fb', state: '6e1848d0' },
      180: { video: 'dcd153d4', state: 'fbe21be7' },
      300: { video: '1069bf60', state: 'ddb44f1a' },
      600: { video: '0d88e0b0', state: '1d78e803' },
      900: { video: 'ef3642ff', state: 'da116844' },
      1200: { video: 'c545f642', state: '0a9cefb5' },
    },
    audio: {
      writes: 13836,
      nonzeroWrites: 13836,
      writeHash: '4d093dfc',
      pcmHash: '752c6f62',
      rms: 0.047899,
    },
  },
});
