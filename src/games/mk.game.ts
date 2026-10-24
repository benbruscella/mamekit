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
  soundKind: 'ym2151',
  frames: 2400,
  minimumFps: 30,
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
      1: { video: '864f564c', state: 'b3a25e9b' },
      120: { video: '8f3c19f2', state: '77cf1e81' },
      300: { video: '594b6c45', state: 'ffaf034b' },
      600: { video: 'afd305d5', state: 'e168b641' },
      1200: { video: '64884dee', state: '64874cb8' },
      1800: { video: '056a6659', state: '3a9d3611' },
      2100: { video: 'fa453c83', state: 'd4b2bd9f' },
      2400: { video: '4902e428', state: 'fa8f016d' },
    },
    audio: {
      writes: 1635065,
      nonzeroWrites: 1609336,
      writeHash: 'ac58bf1e',
      pcmHash: '5cd1f62f',
      rms: 0.089217,
    },
  },
});
