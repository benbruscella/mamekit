import { sourceTarget } from './source-contract.ts';

export const mrdo = sourceTarget({
  game: 'mrdo',
  driver: 'src/mame/universal/mrdo.cpp',
  machine: { className: 'mrdo_state', name: 'mrdo' },
  screen: { width: 240, height: 192 },
  soundKind: 'stream',
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
      1: { video: '99857a71', state: '20556be4' },
      60: { video: '9e6aa1fb', state: '649e073a' },
      180: { video: 'dcd153d4', state: '2e3d62ab' },
      300: { video: '1069bf60', state: 'eb7193e2' },
      600: { video: '0d88e0b0', state: 'b89dfa9b' },
      900: { video: 'ef3642ff', state: '66d0bb10' },
      1200: { video: 'c545f642', state: 'e804c1c3' },
    },
    audio: {
      writes: 960909,
      nonzeroWrites: 392244,
      writeHash: 'f3b403f9',
      pcmHash: '4d8986e0',
      rms: 0.095064,
    },
  },
});
