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
  soundKind: 'ym2151',
  frames: 2400,
  minimumFps: 30,
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
      1: { video: '864f564c', state: 'f72e1382' },
      120: { video: 'b6fd6f3e', state: '7d61343d' },
      300: { video: 'ba34bb3b', state: 'af3d2a1d' },
      600: { video: '57f4ebaa', state: '9888f348' },
      900: { video: 'f0a4f09b', state: '058dd1d0' },
      1200: { video: '21d608bd', state: '85b9fcc8' },
      1800: { video: '7495a002', state: 'f4d2b39d' },
      2400: { video: '15b582f8', state: 'a5024b41' },
    },
    audio: {
      writes: 1963235,
      nonzeroWrites: 1958394,
      writeHash: 'fe9b120c',
      pcmHash: '217940af',
      rms: 0.095198,
    },
  },
});
