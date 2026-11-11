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
  minimumFps: 13,
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
      1: { video: '864f564c', state: 'a77550f0' },
      120: { video: 'b6fd6f3e', state: '053de495' },
      300: { video: 'ba34bb3b', state: 'ab2529ae' },
      600: { video: '11a72184', state: '26b7ea3c' },
      900: { video: 'f0a4f09b', state: 'efa342b4' },
      1200: { video: '21d608bd', state: '0686e18e' },
      1800: { video: '7495a002', state: 'ad912911' },
      2400: { video: '15b582f8', state: '92c9cbe8' },
    },
    audio: {
      writes: 2105769,
      nonzeroWrites: 2105767,
      writeHash: '626fec7b',
      pcmHash: '444fa889',
      rms: 0.094848,
    },
  },
});
