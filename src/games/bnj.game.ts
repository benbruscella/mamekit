// Issue #151. Bump 'n' Jump is BurgerTime's board with a DECO C10707 main CPU
// (every opcode fetch bit-swapped) and a 256-wide visible area its own config
// sets over the inherited raw screen. Verified against MAME 0.289 in attract
// with no input: frames 300 through 3000, the attract demo included, are 0
// differing pixels out of 61440. The coin is an active-low PORT_CHANGED NMI.

import { sourceTarget } from "./source-contract.ts";

export const bnj = sourceTarget({
  game: 'bnj',
  driver: 'src/mame/dataeast/btime.cpp',
  machine: { className: 'btime_state', name: 'bnj' },
  screen: { width: 256, height: 240 },
  soundKind: 'ay8910',
  frames: 1200,
  minimumFps: 30,
  checkpoints: [1, 300, 500, 800, 1000, 1200],
  actions: [
    { atFrame: 400, code: 'Digit5', heldFrames: 6, releasedFrames: 20 },
    { atFrame: 440, code: 'Digit1', heldFrames: 6, releasedFrames: 20 },
    { atFrame: 700, code: 'ArrowUp', heldFrames: 180, releasedFrames: 20 },
    { atFrame: 900, code: 'ArrowLeft', heldFrames: 40, releasedFrames: 20 },
    { atFrame: 960, code: 'Space', heldFrames: 10, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: 'd95c01cd',
      gfx1: 'cf5f1b4d',
      gfx2: 'dfeb26c8',
      maincpu: '1a469b24',
      plds: '290ad14e',
    },
    checkpoints: {
      1: { video: 'fce2db72', state: '3e2de660' },
      300: { video: '046f1eef', state: '3d24e5e7' },
      500: { video: 'f42566c5', state: 'f05cae37' },
      800: { video: 'b7decbd2', state: '24acb116' },
      1000: { video: 'f70378c4', state: '1e3f0a0d' },
      1200: { video: 'e7891abb', state: '21f1e6d0' },
    },
    audio: {
      writes: 31982,
      nonzeroWrites: 30205,
      writeHash: '34738e17',
      pcmHash: '94ef5407',
      rms: 0.08262,
    },
  },
});
