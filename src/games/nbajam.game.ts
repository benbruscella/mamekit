// Issue #149. NBA Jam (rev 3.01): the same T-Unit board as Mortal Kombat with
// its own protection, installed by init_nbajam_common(0) -- a lookup table
// behind the main CPU and hidden RAM in the sound CPU's ROM window. A cold
// CMOS waits on "ERRORS DETECTED -- ANY BUTTON TO CONTINUE", as MAME 0.289
// does. Verified against MAME with the button at frame 200: frames 120, 300,
// 600, 900 and 1200 are 0 differing pixels, and the sound board's command,
// OKI and DAC traffic matches MAME's frame for frame.

import { sourceTarget } from "./source-contract.ts";

export const nbajam = sourceTarget({
  game: 'nbajam',
  // Bounded closure gaps covered by this target's real-ROM acceptance.
  runtimeCoverage: {
    generationGaps: [
      'adpcm:WILLIAMS_ADPCM_SOUND',
      'dac:AD7524',
    ],
    handlerGaps: [
      'adpcm:dac.data_w',
    ],
  },
  driver: 'src/mame/williams/midtunit.cpp',
  machine: { className: 'midtunit_adpcm_state', name: 'tunit_adpcm' },
  screen: { width: 400, height: 254 },
  soundKind: 'stream',
  frames: 2400,
  // CPUs compiled whole from MAME (#249) run heavier than the hand cores:
  // CI ran past the 300 s contract cap against the floor of 13, so it came
  // down to 9, mk's.
  // MAME's round bounds (#255) cost a further 2-4% with no single hot spot:
  // CI measured 8.8 fps against the floor of 9, so it came down to 8.
  minimumFps: 8,
  checkpoints: [1, 120, 300, 600, 900, 1200, 1800, 2400],
  actions: [
    { atFrame: 200, code: 'Space', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 1500, code: 'Digit5', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 1540, code: 'Digit5', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 1580, code: 'Digit1', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 1700, code: 'Space', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 1800, code: 'Space', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 1900, code: 'ArrowRight', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      'adpcm:cpu': '829c9e15',
      'adpcm:oki': '9be90cf1',
      maincpu: '13680337',
      video: '400dfced',
    },
    checkpoints: {
      1: { video: '864f564c', state: '028be1b8' },
      120: { video: 'b6fd6f3e', state: '9131e377' },
      300: { video: '83dcf92e', state: '734e87ff' },
      600: { video: '8739f90d', state: 'bca2dd97' },
      900: { video: 'f0a4f09b', state: 'b1aefcac' },
      1200: { video: '21d608bd', state: '1326cefd' },
      1800: { video: '7495a002', state: '438c982c' },
      2400: { video: '15b582f8', state: '57649202' },
    },
    audio: {
      writes: 2105769,
      nonzeroWrites: 2105767,
      writeHash: 'bf4063ab',
      pcmHash: '790b351c',
      rms: 0.094881,
    },
  },
});
