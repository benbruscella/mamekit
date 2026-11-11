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
      1: { video: '57a480b3', state: '2ab8a3c5' },
      60: { video: 'd4df64f8', state: '5b037f91' },
      180: { video: 'd4df64f8', state: 'bc4b54e7' },
      300: { video: '5109e673', state: '5b5db2eb' },
      600: { video: 'bcf82611', state: 'bc681ae7' },
      900: { video: 'c705eff3', state: 'd3c975e6' },
      1200: { video: '285890b6', state: 'b0173f99' },
    },
    audio: {
      writes: 960009,
      nonzeroWrites: 214115,
      writeHash: '28233c83',
      pcmHash: 'bdb26719',
      rms: 0.071706,
    },
  },
});
