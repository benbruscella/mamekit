import { sourceTarget } from './source-contract.ts';

export const zaxxon = sourceTarget({
  game: 'zaxxon',
  driver: 'src/mame/sega/zaxxon.cpp',
  machine: { className: 'zaxxon_state', name: 'zaxxon' },
  screen: { width: 256, height: 224 },
  soundKind: 'samples',
  golden: {
    regions: {
      gfx_bg: '2503b654',
      gfx_spr: '55ffb6d4',
      gfx_tx: '695c4fb0',
      maincpu: 'a959178d',
      proms: 'e425569f',
      tilemap_dat: 'd9964df2',
    },
    checkpoints: {
      1: { video: '111c0df1', state: 'c42c1576' },
      60: { video: '9a77055f', state: '6dabc971' },
      180: { video: '9a77055f', state: 'fc293c4c' },
      300: { video: 'fc347ba9', state: '34639980' },
      600: { video: '2fa0cc3c', state: '7b139981' },
      900: { video: '1f0174f3', state: '555b5890' },
      1200: { video: 'bc3b9432', state: '104a3ff6' },
    },
    audio: {
      writes: 2126,
      nonzeroWrites: 2116,
      writeHash: 'c8c77f45',
      pcmHash: '53053c89',
      rms: 0.064643,
    },
  },
});
