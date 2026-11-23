import { sourceTarget } from './source-contract.ts';

export const congo = sourceTarget({
  game: 'congo',
  driver: 'src/mame/sega/zaxxon.cpp',
  machine: { className: 'zaxxon_state', name: 'congo' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
  // PSG routing is corrected; the sample effects still use synthesized
  // approximations, not MAME's gorilla/drum recordings. PCM guards stability.
  golden: {
    regions: {
      audiocpu: '5024e673',
      gfx_bg: 'deabddc5',
      gfx_spr: '63bfa3ed',
      gfx_tx: '7bf6ba2b',
      maincpu: '8cd66a74',
      proms: '1f998135',
      tilemap_dat: 'c54ca74c',
    },
    checkpoints: {
      1: { video: '57a480b3', state: 'a9960f1d' },
      60: { video: 'd4df64f8', state: '45340f09' },
      180: { video: 'd4df64f8', state: 'bc900df1' },
      300: { video: '5109e673', state: '79409d85' },
      600: { video: 'bcf82611', state: 'dd1bee38' },
      900: { video: 'c705eff3', state: '94751369' },
      1200: { video: '285890b6', state: '11c5620a' },
    },
    audio: {
      writes: 960009,
      nonzeroWrites: 212759,
      writeHash: 'e96a999c',
      pcmHash: '4634ff13',
      rms: 0.071866,
    },
  },
});
