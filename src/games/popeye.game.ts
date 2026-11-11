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
      1: { video: '93233f15', state: 'd8f7cc17' },
      60: { video: 'ca90bed2', state: '7fbf23db' },
      180: { video: 'dd9e3223', state: 'a6855246' },
      300: { video: 'dd9e3223', state: '99f878a1' },
      600: { video: '185c4ae3', state: 'a87aebd8' },
      900: { video: 'd9f32559', state: 'a557cc7a' },
      1200: { video: 'ff3f2fe7', state: 'c290f1bd' },
    },
    audio: {
      writes: 960960,
      nonzeroWrites: 960960,
      writeHash: 'e289193d',
      pcmHash: '2c6d3e2e',
      rms: 0.248827,
    },
  },
});
