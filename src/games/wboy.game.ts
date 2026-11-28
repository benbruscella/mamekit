import { sourceTarget } from './source-contract.ts';

export const wboy = sourceTarget({
  game: 'wboy',
  driver: 'src/mame/sega/system1.cpp',
  machine: { className: 'system1_state', name: 'wboy' },
  screen: { width: 512, height: 224 },
  soundKind: 'stream',
  // Sega System 1 renders a 512-wide screen: the mixer samples both tilemaps
  // at half rate, so 30 fps here is real work, not a widened framebuffer.
  minimumFps: 30,
  golden: {
    regions: {
      lookup_proms: '648350b8',
      maincpu: 'b83d8d10',
      soundcpu: 'cb7f6cfe',
      sprites: '03c30d1c',
      tiles: '8f981a09',
    },
    checkpoints: {
      1: { video: '82cad202', state: 'cbfe423d' },
      60: { video: '42060c0b', state: 'e67ee8dd' },
      180: { video: '0757abfa', state: '4cf39a2f' },
      300: { video: '4bf39c3d', state: '50d477fd' },
      600: { video: '69dcd846', state: 'afb74c44' },
      900: { video: '076c2eb1', state: '6ebb44a6' },
      1200: { video: 'fa72a076', state: '4b0e6202' },
    },
    audio: {
      writes: 958464,
      nonzeroWrites: 644139,
      writeHash: '0f4e1cd5',
      pcmHash: '516043ac',
      rms: 0.092636,
    },
  },
});
