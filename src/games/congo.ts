import { sourceTarget } from './source-contract.ts';

export const congo = sourceTarget({
  game: 'congo',
  driver: 'src/mame/sega/zaxxon.cpp',
  machine: { className: 'zaxxon_state', name: 'congo' },
  screen: { width: 256, height: 224 },
  soundKind: 'sn76489',
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
      60: { video: 'd4df64f8', state: '459697bc' },
      180: { video: 'd4df64f8', state: 'ebd68ba7' },
      300: { video: '24ca9544', state: '7d682d9c' },
      600: { video: 'bcf82611', state: 'e57f97c9' },
      900: { video: '301c5bee', state: '0af0092d' },
      1200: { video: '184cbdf3', state: 'e24714f4' },
    },
    audio: {
      writes: 2080,
      nonzeroWrites: 2080,
      writeHash: '7bb78283',
      pcmHash: '15114d55',
      rms: 0.028069,
    },
  },
});
