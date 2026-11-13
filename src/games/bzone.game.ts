// Issue #151. Battlezone's AVG vector generator and mathbox are generated
// MAME devices; the AVG fills vector_device's display list, which the host
// draws. The mathbox was checked result for result against MAME 0.289 (3508
// reads over 70 frames, no mismatch), and attract frames 60 and 300 draw the
// same picture MAME does, less MAME's colour overlay artwork. Engine, shell and
// explosion sounds are its DISCRETE table compiled from bzone_a.cpp, with the
// POKEY routed into it through DISCRETE_INPUTX_STREAM; the attract mode is
// silent, as MAME's is (#236).

import { sourceTarget } from "./source-contract.ts";

export const bzone = sourceTarget({
  game: 'bzone',
  driver: 'src/mame/atari/bzone.cpp',
  machine: { className: 'bzone_state', name: 'bzone' },
  screen: { width: 581, height: 401 },
  soundKind: 'stream',
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
      1: { video: '71e4b2e8', state: '3047bebe' },
      60: { video: '199bab9a', state: 'd4bd0bf2' },
      300: { video: '513ca0eb', state: 'd15d1e64' },
      500: { video: 'e1cebcc7', state: 'a55cf425' },
      700: { video: '01d0229e', state: 'bb279013' },
      900: { video: '80e20410', state: 'ef5fa6c8' },
    },
    audio: {
      writes: 1053257,
      nonzeroWrites: 584930,
      writeHash: '677ed8d4',
      pcmHash: 'ba3e7512',
      rms: 0.102659,
    },
  },
});
