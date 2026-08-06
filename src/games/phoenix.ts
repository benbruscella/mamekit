import { sourceTarget } from './source-contract.ts';

export const phoenix = sourceTarget({
  game: 'phoenix',
  driver: 'src/mame/phoenix/phoenix.cpp',
  machine: { className: 'phoenix_state', name: 'phoenix' },
  screen: { width: 256, height: 208 },
  soundKind: 'discrete',
  golden: {
    regions: {
      bgtiles: 'efb4ace4',
      fgtiles: 'bda75c7d',
      maincpu: 'fbdeb026',
      proms: '3895ff77',
    },
    checkpoints: {
      1: { video: 'eda81a59', state: 'f335b687' },
      60: { video: '7791f30d', state: '719e9323' },
      180: { video: '7791f30d', state: '2efefeed' },
      300: { video: '0685344e', state: '3919c16a' },
      600: { video: 'e1a1e1d0', state: 'e2601b7f' },
      900: { video: '77710f6d', state: '0a0cd414' },
      1200: { video: '2f360e9f', state: 'cc89b4cc' },
    },
    audio: {
      writes: 2342,
      nonzeroWrites: 2340,
      writeHash: 'a7e6ca10',
      pcmHash: 'db02c4bf',
      rms: 0.348657,
    },
  },
});
