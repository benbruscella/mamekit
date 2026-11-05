import { sourceTarget } from './source-contract.ts';

export const xevious = sourceTarget({
  game: 'xevious',
  driver: 'src/mame/namco/galaga.cpp',
  machine: { className: 'xevious_state', name: 'xevious' },
  screen: { width: 288, height: 224 },
  soundKind: 'wsg',
  minimumFps: 45,
  // The three-CPU Namco board keeps inputs and WSG data quiet through its
  // lengthy power-on test. Exercise the 51xx controls after that test and
  // retain checkpoints around the 50xx protection hand-off.
  frames: 3000,
  checkpoints: [1, 300, 600, 1200, 1800, 2100, 2400, 2700, 3000],
  actions: [
    { atFrame: 1800, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1830, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 2100, code: 'ArrowRight', heldFrames: 30, releasedFrames: 10 },
    { atFrame: 2250, code: 'ArrowUp', heldFrames: 30, releasedFrames: 10 },
    { atFrame: 2400, code: 'Space', heldFrames: 20, releasedFrames: 20 },
    { atFrame: 2600, code: 'ArrowLeft', heldFrames: 30, releasedFrames: 10 },
  ],
  golden: {
    regions: {
      '50xx:mcu': 'a0acbaf7',
      '51xx:mcu': 'c2f57ef8',
      '54xx:mcu': 'ee7357e0',
      gfx1: '088c8b26',
      gfx2: 'f764e69f',
      gfx3: 'c09416ab',
      gfx4: '6de872af',
      maincpu: '9b26b541',
      namco: 'a18e9304',
      pals_vidbd: 'df9b9396',
      proms: '268ac071',
      sub: '632b2dfa',
      sub2: 'caf1d42f',
    },
    checkpoints: {
      1: { video: '736aaed2', state: '1fafd27a' },
      300: { video: 'd8784d83', state: '3e3871f4' },
      600: { video: '00a6db5d', state: 'a73a6084' },
      1200: { video: '06b5f450', state: '38733b2c' },
      1800: { video: 'eecf489d', state: '727c0d7f' },
      2100: { video: '988f0c7a', state: '02c2a3c1' },
      2400: { video: '2beb0e6c', state: '14fe1699' },
      2700: { video: '251438ea', state: '0e1bc7f1' },
      3000: { video: '6b69e101', state: '976eb2c2' },
    },
    audio: {
      writes: 2465408,
      nonzeroWrites: 2397290,
      writeHash: 'ad70d996',
      pcmHash: '449340c3',
      rms: 0.11004,
    },
  },
});
