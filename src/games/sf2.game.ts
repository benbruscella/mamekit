import { sourceTarget } from './source-contract.ts';

export const sf2 = sourceTarget({
  game: 'sf2',
  driver: 'src/mame/capcom/cps1.cpp',
  machine: { className: 'cps_state', name: 'cps1_10MHz' },
  screen: { width: 384, height: 224 },
  soundKind: 'stream',
  // Same CPS1 board as sf2ce (10 MHz 68000 instead of 12): ~103 fps in Node
  // with wired-hot handler codegen; hold it above real time.
  // Sound compiled from MAME (#242) runs on the main thread: CI measured
  // 32.9 fps against the old floor of 50 (issue #247, 4.5).
  minimumFps: 26,
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
      1: { video: 'ccf6015f', state: '820db954' },
      300: { video: 'f61d0b33', state: '05a62cd4' },
      1200: { video: 'c807646a', state: 'c363de5f' },
      1800: { video: 'c807646a', state: 'bb7d8f21' },
      2400: { video: '1ee990aa', state: '6a3094b8' },
      3000: { video: '80058112', state: 'ee0ddc7b' },
      3600: { video: 'e7f72fff', state: 'e8ec7af1' },
    },
    audio: {
      writes: 2897510,
      nonzeroWrites: 2026105,
      writeHash: '5eb300d2',
      pcmHash: '109b8258',
      rms: 0.104287,
    },
  },
});
