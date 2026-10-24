// Re-enabled for issue #108, after issue #53 parked it as "low frame rate,
// and a coin is never accepted". It now takes a coin, plays, and runs at
// ~85 fps in the Node harness against a 30 fps floor.
//
// Verified against MAME 0.289 in attract mode with no input at all: our
// frame 600 is 0 differing pixels out of 114688 against MAME's, once ours
// is rotated 270 degrees to match the presented ROT270 image.

import { sourceTarget } from './source-contract.ts';

export const upndown = sourceTarget({
  game: 'upndown',
  driver: 'src/mame/sega/system1.cpp',
  machine: { className: 'system1_state', name: 'upndown' },
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
      60: { video: '3b94439d', state: '809ea7ba' },
      180: { video: '6e934d37', state: 'bd39dffb' },
      300: { video: '68b8a049', state: '718eb13c' },
      600: { video: '6a2f7c6c', state: '27d6b528' },
      900: { video: '82cad202', state: 'e1a059fd' },
      1200: { video: '06cb154e', state: '30417f7d' },
    },
    audio: {
      writes: 29016,
      nonzeroWrites: 29016,
      writeHash: '71f5dbcd',
      pcmHash: 'e98c741b',
      rms: 0.031737,
    },
  },
});
