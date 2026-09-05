import { sourceTarget } from './source-contract.ts';

export const sf2ce = sourceTarget({
  game: 'sf2ce',
  driver: 'src/mame/capcom/cps1.cpp',
  machine: { className: 'cps_state', name: 'cps1_12MHz' },
  screen: { width: 384, height: 224 },
  soundKind: 'ym2151',
  // Issue #77: wired-hot handler codegen (bus handlers, tile-info callbacks)
  // took this board from 48 to ~97 fps in Node; hold it above real time.
  minimumFps: 50,
  // The default schedule coins at 300 and presses start at 330, which CPS1 is
  // still in its power-on RAM test to notice: the golden then graded a title
  // screen holding one credit, and no sprite-bearing frame was ever reached.
  // One press after the test is still not enough — the title takes the second
  // one — so start twice, pick a fighter, and work the controls in the match.
  // Checkpoints straddle attract, player select and a live round.
  frames: 3600,
  checkpoints: [1, 300, 1200, 1800, 2400, 3000, 3600],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 900, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1100, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 2700, code: 'Space', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 3300, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 3400, code: 'Space', heldFrames: 10, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      aboardplds: 'ffcf27eb',
      audiocpu: 'aa925e71',
      bboardplds: '6a5ff316',
      cboardplds: '2da84956',
      gfx: '1616e9ad',
      maincpu: '06d02579',
      oki: '6cfffb11',
    },
    checkpoints: {
      1: { video: 'ccf6015f', state: '7d855a28' },
      300: { video: 'd3cbe1c7', state: 'c901bfb5' },
      1200: { video: '7897b1bf', state: '1209b738' },
      1800: { video: 'bdb7fc29', state: '7c53885b' },
      2400: { video: '1439b02c', state: 'd0479ea7' },
      3000: { video: '9d6f6306', state: 'b3d2567c' },
      3600: { video: '745b77f9', state: '98be8eae' },
    },
    audio: {
      writes: 127493,
      nonzeroWrites: 108471,
      writeHash: '1da7fc6c',
      pcmHash: '67ad023e',
      rms: 0.051834,
    },
  },
});
