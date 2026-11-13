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
  // Sound compiled from MAME (#242) runs on the main thread: CI measured
  // 17.0 fps against the old floor of 30 (issue #247, 4.5).
  minimumFps: 9,
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
      900: { video: 'f0a4f09b', state: '50712fc9' },
      1200: { video: '21d608bd', state: '3409c50b' },
      1800: { video: '7495a002', state: '033d9e47' },
      2400: { video: '15b582f8', state: '62a3ec14' },
    },
    audio: {
      writes: 2105769,
      nonzeroWrites: 2105767,
      writeHash: '00ebd6f0',
      pcmHash: 'faf52da1',
      rms: 0.095004,
    },
  },
});
