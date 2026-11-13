import { sourceTarget } from './source-contract.ts';

export const xevious = sourceTarget({
  game: 'xevious',
  driver: 'src/mame/namco/galaga.cpp',
  machine: { className: 'xevious_state', name: 'xevious' },
  screen: { width: 288, height: 224 },
  soundKind: 'stream',
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
      1: { video: '736aaed2', state: '9e79a87e' },
      300: { video: 'd8784d83', state: '4d9af1b6' },
      600: { video: '00a6db5d', state: 'f5549e0c' },
      1200: { video: '06b5f450', state: '6b3bb112' },
      1800: { video: 'eecf489d', state: '978cdd99' },
      2100: { video: '988f0c7a', state: '30a758e8' },
      2400: { video: '2beb0e6c', state: '7ccbe872' },
      2700: { video: '251438ea', state: 'ea418931' },
      3000: { video: '6b69e101', state: '5663c0e4' },
    },
    audio: {
      writes: 2375999,
      nonzeroWrites: 2375999,
      writeHash: '5d3fd9fc',
      pcmHash: '8a76689a',
      rms: 0.06066,
    },
  },
});
