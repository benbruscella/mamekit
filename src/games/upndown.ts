// Re-enabled for issue #108, after issue #53 parked it as "low frame rate,
// and a coin is never accepted". It now takes a coin, plays, and runs at
// ~85 fps in the Node harness against a 30 fps floor.
//
// Verified against MAME 0.289 in attract mode with no input at all: our
// frame 600 is 0 differing pixels out of 114688 against MAME's, once ours
// is rotated 270 degrees to match the presented ROT270 image.

import type { GameTestContract } from './types.ts';

export const upndown: GameTestContract = {
  game: 'upndown',
  category: 'arcade',
  driver: 'src/mame/sega/system1.cpp',
  machine: { className: 'system1_state', name: 'upndown' },
  romEnvironment: 'MAMEKIT_UPNDOWN_ROM',
  screen: { width: 512, height: 224 },
  soundKind: 'sn76489',
  frames: 1200,
  minimumFps: 30,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowUp', heldFrames: 180, releasedFrames: 20 },
    { atFrame: 820, code: 'Space', heldFrames: 20, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      decrypted_opcodes: '85b8cb0e',
      lookup_proms: '648350b8',
      maincpu: 'b58d499c',
      soundcpu: '43b2b9a5',
      sprites: '090c5e7e',
      tiles: 'd46776a7',
    },
    checkpoints: {
      1: { video: '82cad202', state: '37b7efec' },
      60: { video: '3b94439d', state: 'b7601363' },
      180: { video: '965d9f42', state: '1ce3b820' },
      300: { video: '3fde4a4d', state: '5ef2813e' },
      600: { video: 'eb4817b3', state: '9035b83f' },
      900: { video: '82cad202', state: '9ae0165a' },
      1200: { video: 'b394d50e', state: 'c45acb2f' },
    },
    audio: {
      writes: 29295,
      nonzeroWrites: 29295,
      writeHash: 'e65fda09',
      pcmHash: '2fb1a3d6',
      rms: 0.050361,
    },
  },
};
