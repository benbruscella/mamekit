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
      decrypted_opcodes: 'ec31d42e',
      lookup_proms: '648350b8',
      maincpu: 'b83d8d10',
      soundcpu: 'cb7f6cfe',
      sprites: '03c30d1c',
      tiles: '8f981a09',
    },
    checkpoints: {
      1: { video: '82cad202', state: 'cf79e7db' },
      60: { video: '42060c0b', state: '999da0a7' },
      180: { video: '0757abfa', state: 'a3375603' },
      300: { video: '4bf39c3d', state: 'dcedc667' },
      600: { video: '69dcd846', state: '281e1d11' },
      900: { video: '076c2eb1', state: '0cc0d9b9' },
      1200: { video: 'fa72a076', state: '258a5393' },
    },
    audio: {
      writes: 958464,
      nonzeroWrites: 641831,
      writeHash: '971c599d',
      pcmHash: 'ceb04b35',
      rms: 0.092735,
    },
  },
});
