// Issue #151. BurgerTime's main CPU is Data East's DECO CPU-7: a 6502 whose
// memory interface bit-swaps the opcode fetched after any write to an address
// with bits 2 and 8 set. Verified against MAME 0.289 in attract with no input:
// frames 60 through 3000 are 0 differing pixels out of 57600.

import { sourceTarget } from "./source-contract.ts";

export const btime = sourceTarget({
  game: 'btime',
  driver: 'src/mame/dataeast/btime.cpp',
  machine: { className: 'btime_state', name: 'btime' },
  screen: { width: 240, height: 240 },
  soundKind: 'stream',
  frames: 1200,
  minimumFps: 30,
  checkpoints: [1, 300, 450, 600, 900, 1200],
  actions: [
    { atFrame: 400, code: 'Digit5', heldFrames: 6, releasedFrames: 20 },
    { atFrame: 440, code: 'Digit1', heldFrames: 6, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowLeft', heldFrames: 80, releasedFrames: 20 },
    { atFrame: 720, code: 'ArrowUp', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 800, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 900, code: 'Space', heldFrames: 6, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: 'bb7a8e74',
      bg_map: 'd26bc1f3',
      gfx1: 'a1103e15',
      gfx2: 'eb438b8c',
      maincpu: 'f75d5a3b',
    },
    checkpoints: {
      1: { video: 'd59a8e09', state: 'be111151' },
      300: { video: '397799b7', state: '4d7572fa' },
      450: { video: '44cb84d3', state: '0ba97f72' },
      600: { video: '043f8e75', state: 'ed6ee8f9' },
      900: { video: '6cd1f1f2', state: '2c6190f7' },
      1200: { video: 'c8dba4d3', state: '8879cbcd' },
    },
    audio: {
      writes: 1002700,
      nonzeroWrites: 1002700,
      writeHash: '16d31ed8',
      pcmHash: '1e75dd2c',
      rms: 0.119995,
    },
  },
});
