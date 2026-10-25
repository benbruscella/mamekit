import { sourceTarget } from './source-contract.ts';

export const popeye = sourceTarget({
  game: 'popeye',
  driver: 'src/mame/nintendo/popeye.cpp',
  machine: { className: 'tpp2_state', name: 'config' },
  screen: { width: 512, height: 448 },
  soundKind: 'ay8910',
  golden: {
    regions: {
      gfx1: 'fa52a752',
      gfx2: '38b5a50c',
      maincpu: 'ea72ef37',
      proms: '62ec4acb',
      sprpal: 'fd9bfe68',
      timing: 'a4655e2e',
    },
    checkpoints: {
      1: { video: '4b778151', state: 'a162995c' },
      60: { video: 'ca90bed2', state: '591da4c2' },
      180: { video: 'dd9e3223', state: '580e8341' },
      300: { video: 'dd9e3223', state: 'd937c82f' },
      600: { video: '185c4ae3', state: 'eacf5539' },
      900: { video: 'd9f32559', state: 'eaf5fdf7' },
      1200: { video: 'ff3f2fe7', state: '16d17125' },
    },
    audio: {
      writes: 2538,
      nonzeroWrites: 1855,
      writeHash: '7cdb34ef',
      pcmHash: 'dc5e8cbf',
      rms: 0.087489,
    },
  },
});
