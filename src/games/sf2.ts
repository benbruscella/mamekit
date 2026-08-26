import { sourceTarget } from './source-contract.ts';

export const sf2 = sourceTarget({
  game: 'sf2',
  driver: 'src/mame/capcom/cps1.cpp',
  machine: { className: 'cps_state', name: 'cps1_10MHz' },
  screen: { width: 384, height: 224 },
  soundKind: 'ym2151',
  // Same CPS1 board as sf2ce (10 MHz 68000 instead of 12): ~103 fps in Node
  // with wired-hot handler codegen; hold it above real time.
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
      audiocpu: 'cb027a88',
      bboardplds: '8e74b895',
      cboardplds: '2da84956',
      gfx: 'b758db52',
      maincpu: '490a0cca',
      oki: '6cfffb11',
    },
    checkpoints: {
      1: { video: 'ccf6015f', state: '36628212' },
      300: { video: 'f61d0b33', state: '10feba8a' },
      1200: { video: '42d4cf93', state: '0838f4ce' },
      1800: { video: '42d4cf93', state: '51fdc97d' },
      2400: { video: '943a3b53', state: 'd7fa2e88' },
      3000: { video: '4fe3acf5', state: '2dc65ebe' },
      3600: { video: '5648d627', state: 'a200058f' },
    },
    audio: {
      writes: 122153,
      nonzeroWrites: 103898,
      writeHash: '409ffccf',
      pcmHash: '253aa3e5',
      rms: 0.065201,
    },
  },
});
