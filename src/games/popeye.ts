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
      60: { video: 'ca90bed2', state: 'e6a73a05' },
      180: { video: 'dd9e3223', state: 'bfd8b506' },
      300: { video: 'dd9e3223', state: 'a9d0c43a' },
      600: { video: '185c4ae3', state: 'f72c4d19' },
      900: { video: 'd9f32559', state: 'f1de02c8' },
      1200: { video: 'ff3f2fe7', state: '0e809470' },
    },
    audio: {
      writes: 2539,
      nonzeroWrites: 1856,
      writeHash: '6aa63e43',
      pcmHash: '40a92f49',
      rms: 0.087813,
    },
  },
});
