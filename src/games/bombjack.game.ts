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
  soundKind: 'ay8910',
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
      1: { video: 'f7e6ac81', state: '42988804' },
      300: { video: '92745ac8', state: 'd6bb85ad' },
      1200: { video: 'f682cb36', state: 'ef602a56' },
      1500: { video: 'c6971a4c', state: 'c23d4001' },
      1800: { video: '1f978487', state: 'd6b43cd5' },
      2100: { video: 'e96d856d', state: 'bf2da974' },
      2400: { video: 'c6995dd3', state: 'd2c6d5f6' },
    },
    audio: {
      writes: 115200,
      nonzeroWrites: 31363,
      writeHash: '19dfa69f',
      pcmHash: '22e79596',
      rms: 0.06366,
    },
  },
});
