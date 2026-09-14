import { sourceTarget } from './source-contract.ts';

export const sf2ce = sourceTarget({
  game: 'sf2ce',
  driver: 'src/mame/capcom/cps1.cpp',
  machine: { className: 'cps_state', name: 'cps1_12MHz' },
  screen: { width: 384, height: 224 },
  soundKind: 'ym2151',
  // Issue #77: wired-hot handler codegen (bus handlers, tile-info callbacks)
  // took this board from 48 to ~97 fps in Node, and this floor holds that
  // gain. It is deliberately well under real time rather than at it: this is
  // the slowest CPS1 contract, and a hosted runner's throughput varies far
  // more than the margin a 50 fps floor leaves. Measured on main across four
  // CI runs of identical code, sf2ce took 67.1s, 67.4s, 85.7s and 86.9s -- a
  // 30% spread, or roughly 49 to 64 fps, so a 50 fps floor sits *inside* the
  // observed range and fails on runner luck alone. It did: the same commit
  // both failed at 49.8 fps and passed on re-run. 40 clears the whole
  // observed range and still catches the regression the floor is for.
  // sf2 is the next closest (61.4s to 79.7s on the same runs).
  minimumFps: 40,
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
