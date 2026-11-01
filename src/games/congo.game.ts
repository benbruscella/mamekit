import { sourceTarget } from './source-contract.ts';

export const congo = sourceTarget({
  game: 'congo',
  driver: 'src/mame/sega/zaxxon.cpp',
  machine: { className: 'zaxxon_state', name: 'congo' },
  screen: { width: 256, height: 224 },
  soundKind: 'sn76489',
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
      1: { video: '111c0df1', state: 'faa5e61d' },
      60: { video: 'd4df64f8', state: '5e577877' },
      180: { video: 'd4df64f8', state: 'bf9f4cc8' },
      300: { video: '5109e673', state: 'ea304434' },
      600: { video: 'bcf82611', state: '4b29680d' },
      900: { video: 'c705eff3', state: '17636bfa' },
      1200: { video: '285890b6', state: 'e525966b' },
    },
    audio: {
      writes: 962004,
      nonzeroWrites: 92278,
      writeHash: '7f3e9652',
      pcmHash: '68b79c05',
      rms: 0.072049,
    },
  },
});
