// Issue #149. Bomb Jack's power-on check holds the "PUSH BUTTON FOR CHECK"
// screen for roughly 1100 frames before attract; real MAME 0.289 does the
// same. Verified against MAME in attract with no input: frames 1500, 1800 and
// 2400 are 0 differing pixels out of 57344.

import { sourceTarget } from "./source-contract.ts";

export const bombjack = sourceTarget({
  game: 'bombjack',
  driver: 'src/mame/tecmo/bombjack.cpp',
  machine: { className: 'bombjack_state', name: 'bombjack' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
  frames: 2400,
  minimumFps: 30,
  checkpoints: [1, 300, 1200, 1500, 1800, 2100, 2400],
  actions: [
    { atFrame: 1300, code: 'Digit5', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 1340, code: 'Digit1', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 1600, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 1700, code: 'Space', heldFrames: 20, releasedFrames: 20 },
    { atFrame: 1800, code: 'ArrowLeft', heldFrames: 90, releasedFrames: 20 },
    { atFrame: 1950, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: '39fa88ed',
      bgmaps: '16a04c50',
      bgtiles: 'ddfeb973',
      fgtiles: '3028cc2f',
      maincpu: 'e3355433',
      sprites: 'f4224108',
    },
    checkpoints: {
      1: { video: 'f7e6ac81', state: '5410da84' },
      300: { video: '92745ac8', state: 'e5de2eed' },
      1200: { video: 'f682cb36', state: '1ac4f51f' },
      1500: { video: 'c6971a4c', state: '467a0d63' },
      1800: { video: '1f978487', state: 'b2d1f41b' },
      2100: { video: 'e96d856d', state: 'f00fd11e' },
      2400: { video: 'c6995dd3', state: '2d496305' },
    },
    audio: {
      writes: 1946419,
      nonzeroWrites: 1946415,
      writeHash: '2c15c995',
      pcmHash: 'b781c4c0',
      rms: 0.115352,
    },
  },
});
