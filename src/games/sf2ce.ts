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
      300: { video: 'a8421153', state: 'a779bbbe' },
      1200: { video: '7897b1bf', state: 'a0e0c0f2' },
      1800: { video: '9da89037', state: 'a1f05685' },
      2400: { video: '720bb115', state: '87e14a8f' },
      3000: { video: '839a67e3', state: '25606a20' },
      3600: { video: 'f5bcc732', state: '7ab2c550' },
    },
    audio: {
      writes: 127493,
      nonzeroWrites: 108471,
      writeHash: '0ecc44ea',
      pcmHash: '4d51fdeb',
      rms: 0.051585,
    },
  },
});
