import { sourceTarget } from './source-contract.ts';

export const wboy = sourceTarget({
  game: 'wboy',
  driver: 'src/mame/sega/system1.cpp',
  machine: { className: 'system1_state', name: 'wboy' },
  screen: { width: 512, height: 224 },
  soundKind: 'sn76489',
  // Sega System 1 renders a 512-wide screen: the mixer samples both tilemaps
  // at half rate, so 30 fps here is real work, not a widened framebuffer.
  minimumFps: 30,
  golden: {
    regions: {
      decrypted_opcodes: 'c4509bc9',
      lookup_proms: '648350b8',
      maincpu: 'b83d8d10',
      soundcpu: 'cb7f6cfe',
      sprites: '03c30d1c',
      tiles: '8f981a09',
    },
    checkpoints: {
      1: { video: '82cad202', state: 'bf8986f0' },
      60: { video: '42060c0b', state: '502e32a4' },
      180: { video: '0757abfa', state: 'f02f9ba7' },
      300: { video: '4bf39c3d', state: '9b3a1077' },
      600: { video: '69dcd846', state: 'd1bfaa63' },
      900: { video: '076c2eb1', state: '032e774d' },
      1200: { video: 'fa72a076', state: '43be714e' },
    },
    audio: {
      writes: 52786,
      nonzeroWrites: 48499,
      writeHash: '88661dcf',
      pcmHash: '848fe019',
      rms: 0.046409,
    },
  },
});
