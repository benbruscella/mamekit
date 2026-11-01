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
      1: { video: '6c77a4f3', state: '3a26877c' },
      60: { video: '76424eb8', state: 'a5332576' },
      180: { video: '76424eb8', state: '4776a29a' },
      300: { video: '72d8ec6c', state: '0dad916d' },
      600: { video: 'b135396f', state: '1cf96eee' },
      900: { video: '0b59bcd5', state: 'bcb8f5fd' },
      1200: { video: 'c69b3e1b', state: 'b2925834' },
    },
    audio: {
      writes: 960009,
      nonzeroWrites: 715954,
      writeHash: '993f85a5',
      pcmHash: '69152972',
      rms: 0.126653,
    },
  },
});
