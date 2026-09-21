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
      1: { video: '864f564c', state: '386fed30' },
      120: { video: '8f3c19f2', state: '3ac17270' },
      300: { video: '594b6c45', state: 'f9bb8eb9' },
      600: { video: 'afd305d5', state: 'db72709a' },
      1200: { video: '64884dee', state: 'eafe52c1' },
      1800: { video: '056a6659', state: '19177624' },
      2100: { video: 'bc688fcd', state: '8dd009bc' },
      2400: { video: '94977bed', state: '5cee7c4a' },
    },
    audio: {
      writes: 1635074,
      nonzeroWrites: 1609260,
      writeHash: '4799c814',
      pcmHash: 'bc39fbf0',
      rms: 0.088131,
    },
  },
});
