// Issue #151. Battlezone's AVG vector generator and mathbox are generated
// MAME devices; the AVG fills vector_device's display list, which the host
// draws. The mathbox was checked result for result against MAME 0.289 (3508
// reads over 70 frames, no mismatch), and attract frames 60 and 300 draw the
// same picture MAME does, less MAME's colour overlay artwork. Engine, shell and
// explosion sounds come from a DISCRETE network this build does not lower, so
// only the POKEY is heard.

import { sourceTarget } from "./source-contract.ts";

export const bzone = sourceTarget({
  game: 'bzone',
  driver: 'src/mame/atari/bzone.cpp',
  machine: { className: 'bzone_state', name: 'bzone' },
  screen: { width: 581, height: 401 },
  soundKind: 'pokey',
  frames: 900,
  minimumFps: 30,
  checkpoints: [1, 60, 300, 500, 700, 900],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 6, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit5', heldFrames: 6, releasedFrames: 20 },
    { atFrame: 400, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 550, code: 'KeyW', heldFrames: 80, releasedFrames: 20 },
    { atFrame: 650, code: 'KeyI', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 730, code: 'Space', heldFrames: 6, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      'avg:prom': '5903af03',
      maincpu: '7eccb792',
      user2: '8b04f921',
      user3: '092af601',
    },
    checkpoints: {
      1: { video: '71e4b2e8', state: '17c44bd0' },
      60: { video: '5552575c', state: 'ff234260' },
      300: { video: '2923b40e', state: '821cd8a6' },
      500: { video: '7ba4768f', state: '04bb5ae4' },
      700: { video: '1dea03af', state: 'd236fc7e' },
      900: { video: '1f42f73f', state: '470bea4f' },
    },
    audio: {
      writes: 28889,
      nonzeroWrites: 932,
      writeHash: '1a72a848',
      pcmHash: '33334c64',
      rms: 0.011231,
    },
  },
});
