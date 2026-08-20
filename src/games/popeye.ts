import { sourceTarget } from './source-contract.ts';

export const popeye = sourceTarget({
  game: 'popeye',
  driver: 'src/mame/nintendo/popeye.cpp',
  machine: { className: 'tpp2_state', name: 'config' },
  screen: { width: 256, height: 448 },
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
      1: { video: '5e8c1790', state: 'a162995c' },
      60: { video: '92c8098c', state: 'e6a73a05' },
      180: { video: '2039de27', state: 'bfd8b506' },
      300: { video: '2039de27', state: 'a9d0c43a' },
      600: { video: 'caaef48b', state: 'f72c4d19' },
      900: { video: 'e90c674e', state: 'f1de02c8' },
      1200: { video: '23877693', state: '0e809470' },
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
