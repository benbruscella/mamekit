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
      60: { video: 'dfb9ddb9', state: '3e2101c7' },
      180: { video: '5209e68a', state: '69e1553c' },
      300: { video: '9effc3c0', state: 'a779bbbe' },
      600: { video: '8dd7d88b', state: '0e4c7fb0' },
      900: { video: 'dfb9ddb9', state: '754c66ca' },
      1200: { video: 'dfb9ddb9', state: 'ce3087fe' },
    },
    audio: {
      writes: 33137,
      nonzeroWrites: 27428,
      writeHash: '7001c9f7',
      pcmHash: 'cdc6ea75',
      rms: 0.002938,
    },
  },
});
