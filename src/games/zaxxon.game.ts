import { sourceTarget } from './source-contract.ts';

export const zaxxon = sourceTarget({
  game: 'zaxxon',
  driver: 'src/mame/sega/zaxxon.cpp',
  machine: { className: 'zaxxon_state', name: 'zaxxon' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
  // Existing synthesized effects do not reproduce the original sample pack.
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
      1: { video: '15841117', state: 'b909bea9' },
      60: { video: '76424eb8', state: '14b0ff72' },
      180: { video: '76424eb8', state: '312d526f' },
      300: { video: '72d8ec6c', state: '44129c5b' },
      600: { video: 'b135396f', state: 'd5017c4c' },
      900: { video: '0b59bcd5', state: '07d46483' },
      1200: { video: 'c69b3e1b', state: '4ba8a530' },
    },
    audio: {
      writes: 960009,
      nonzeroWrites: 715954,
      writeHash: '0f86ef13',
      pcmHash: '541d97ab',
      rms: 0.126653,
    },
  },
});
