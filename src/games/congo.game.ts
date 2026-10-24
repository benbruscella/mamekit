import { sourceTarget } from './source-contract.ts';

export const congo = sourceTarget({
  game: 'congo',
  driver: 'src/mame/sega/zaxxon.cpp',
  machine: { className: 'zaxxon_state', name: 'congo' },
  screen: { width: 256, height: 224 },
  soundKind: 'sn76489',
  // PSG routing is corrected; the sample effects still use synthesized
  // approximations, not MAME's gorilla/drum recordings. PCM guards stability.
  acceptedAudioLimitations: ['synthesized-samples'],
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
      1: { video: '111c0df1', state: '1d0baaed' },
      60: { video: 'd4df64f8', state: '4e2c02f1' },
      180: { video: 'd4df64f8', state: 'ae77cc6d' },
      300: { video: '24ca9544', state: '6d286b93' },
      600: { video: 'bcf82611', state: 'e47fc0e5' },
      900: { video: '593777be', state: 'ebeb0825' },
      1200: { video: 'bad680e3', state: '6f69e530' },
    },
    audio: {
      writes: 2253,
      nonzeroWrites: 2163,
      writeHash: '7ab01341',
      pcmHash: '7a98e994',
      rms: 0.032103,
    },
  },
});
