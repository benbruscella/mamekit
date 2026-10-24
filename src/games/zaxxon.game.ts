import { sourceTarget } from './source-contract.ts';

export const zaxxon = sourceTarget({
  game: 'zaxxon',
  driver: 'src/mame/sega/zaxxon.cpp',
  machine: { className: 'zaxxon_state', name: 'zaxxon' },
  screen: { width: 256, height: 224 },
  soundKind: 'samples',
  // Existing synthesized effects do not reproduce the original sample pack.
  acceptedAudioLimitations: ['synthesized-samples'],
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
      60: { video: '76424eb8', state: '01f78f1f' },
      180: { video: '76424eb8', state: '0d9367a4' },
      300: { video: '72d8ec6c', state: 'cadf3867' },
      600: { video: '27142560', state: '337becd1' },
      900: { video: '0b59bcd5', state: 'bc664e1c' },
      1200: { video: 'c69b3e1b', state: 'f522074a' },
    },
    audio: {
      writes: 2124,
      nonzeroWrites: 2114,
      writeHash: 'bb194214',
      pcmHash: '463855c4',
      rms: 0.064444,
    },
  },
});
