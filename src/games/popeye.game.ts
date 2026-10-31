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
      60: { video: 'ca90bed2', state: '2fc3feae' },
      180: { video: 'dd9e3223', state: 'b16396e9' },
      300: { video: 'dd9e3223', state: '2b3b6a5f' },
      600: { video: '185c4ae3', state: '7ca71dc8' },
      900: { video: 'd9f32559', state: 'eaf5fdf7' },
      1200: { video: 'ff3f2fe7', state: '16d17125' },
    },
    audio: {
      writes: 2538,
      nonzeroWrites: 1855,
      writeHash: '86124e3b',
      pcmHash: '9463e1c2',
      rms: 0.088221,
    },
  },
});
