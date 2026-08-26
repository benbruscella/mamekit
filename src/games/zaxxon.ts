import { sourceTarget } from './source-contract.ts';

export const zaxxon = sourceTarget({
  game: 'zaxxon',
  driver: 'src/mame/sega/zaxxon.cpp',
  machine: { className: 'zaxxon_state', name: 'zaxxon' },
  screen: { width: 256, height: 224 },
  soundKind: 'samples',
  // Its renderer is emitted rather than interpreted; the interpreted form
  // managed 36 fps on the machine that recorded this.
  minimumFps: 45,
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
      1: { video: '6c77a4f3', state: 'c42c1576' },
      60: { video: '76424eb8', state: '6dabc971' },
      180: { video: '76424eb8', state: 'fc293c4c' },
      300: { video: '72d8ec6c', state: '34639980' },
      600: { video: 'b135396f', state: '7b139981' },
      900: { video: '0b59bcd5', state: '555b5890' },
      1200: { video: 'c69b3e1b', state: '104a3ff6' },
    },
    audio: {
      writes: 2126,
      nonzeroWrites: 2116,
      writeHash: '23f54169',
      pcmHash: '1c955a5e',
      rms: 0.064563,
    },
  },
});
