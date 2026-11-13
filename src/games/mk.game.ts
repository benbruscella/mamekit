// Issue #149. Mortal Kombat (rev 5.0 T-Unit): TMS34010 main CPU, Midway
// T-Unit video (DMA blitter) and the Williams ADPCM sound board. A cold CMOS
// boots to "CMOS INVALID -- FACTORY SETTINGS RESTORED" and waits for a button,
// exactly as MAME 0.289 does. Verified against MAME with the button at frame
// 200: frames 120, 300, 600, 1200 and 1800 are 0 differing pixels; sound
// matches MAME's per-second envelope chip by chip. The attract demo's fighters
// diverge later because the game seeds its RNG from the frame the button is
// seen, which the two input paths deliver at different raster positions.

import { sourceTarget } from "./source-contract.ts";

export const mk = sourceTarget({
  game: 'mk',
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
  // 17.3 fps against the old floor of 30 (issue #247, 4.5).
  minimumFps: 13,
  checkpoints: [1, 120, 300, 600, 1200, 1800, 2100, 2400],
  actions: [
    { atFrame: 200, code: 'Space', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 1700, code: 'Digit5', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 1740, code: 'Digit5', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 1780, code: 'Digit1', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 1900, code: 'Space', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 2000, code: 'ArrowRight', heldFrames: 30, releasedFrames: 20 },
    { atFrame: 2060, code: 'Space', heldFrames: 5, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      'adpcm:cpu': 'aa475314',
      'adpcm:oki': '1d106add',
      maincpu: '036cabe1',
      video: '63c493ac',
    },
    checkpoints: {
      1: { video: '864f564c', state: 'a2c68bdb' },
      120: { video: '8f3c19f2', state: 'f6dffac0' },
      300: { video: '594b6c45', state: '712a272b' },
      600: { video: 'afd305d5', state: 'f4f98ede' },
      1200: { video: '64884dee', state: '9f06cf2c' },
      1800: { video: '056a6659', state: '93afc24c' },
      2100: { video: '2eda00da', state: '7d7ea9f6' },
      2400: { video: '864f564c', state: 'ec52a780' },
    },
    audio: {
      writes: 2105769,
      nonzeroWrites: 2104791,
      writeHash: '43ccfdb5',
      pcmHash: '6ac54ef0',
      rms: 0.089437,
    },
  },
});
