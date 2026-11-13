import { sourceTarget } from './source-contract.ts';

export const popeye = sourceTarget({
  game: 'popeye',
  driver: 'src/mame/nintendo/popeye.cpp',
  machine: { className: 'tpp2_state', name: 'config' },
  screen: { width: 512, height: 448 },
  soundKind: 'stream',
  golden: {
    regions: {
      gfx1: 'fa52a752',
      gfx2: '38b5a50c',
      maincpu: 'ea72ef37',
      proms: '62ec4acb',
      sprpal: 'bd21f577',
      timing: 'a4655e2e',
    },
    checkpoints: {
      1: { video: '93233f15', state: '9c478dbd' },
      60: { video: 'ca90bed2', state: 'f6b2e325' },
      180: { video: 'dd9e3223', state: '738d315f' },
      300: { video: 'dd9e3223', state: 'c8ec881d' },
      600: { video: '185c4ae3', state: '2ec61319' },
      900: { video: 'd9f32559', state: '732065e5' },
      1200: { video: 'ff3f2fe7', state: '39e22350' },
    },
    audio: {
      writes: 960960,
      nonzeroWrites: 960960,
      writeHash: '08b5ecff',
      pcmHash: '2221a1e9',
      rms: 0.248828,
    },
  },
});
