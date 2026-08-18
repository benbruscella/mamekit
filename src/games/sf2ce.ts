import { sourceTarget } from './source-contract.ts';

export const sf2ce = sourceTarget({
  game: 'sf2ce',
  driver: 'src/mame/capcom/cps1.cpp',
  machine: { className: 'cps_state', name: 'cps1_12MHz' },
  screen: { width: 384, height: 224 },
  soundKind: 'ym2151',
  minimumFps: 9,
  golden: {
    regions: {
      aboardplds: 'ffcf27eb',
      audiocpu: 'aa925e71',
      bboardplds: '6a5ff316',
      cboardplds: '2da84956',
      gfx: '1616e9ad',
      maincpu: '06d02579',
      oki: '6cfffb11',
    },
    checkpoints: {
      1: { video: 'ccf6015f', state: '7d855a28' },
      60: { video: 'ed045a42', state: '3e2101c7' },
      180: { video: 'ca5b7e4e', state: '69e1553c' },
      300: { video: 'd3cbe1c7', state: 'a779bbbe' },
      600: { video: 'a8230f27', state: '0e4c7fb0' },
      900: { video: '2a0cd32d', state: '754c66ca' },
      1200: { video: '2a0cd32d', state: 'ce3087fe' },
    },
    audio: {
      writes: 33137,
      nonzeroWrites: 27428,
      writeHash: '7001c9f7',
      pcmHash: 'dbe1ae10',
      rms: 0.011588,
    },
  },
});
