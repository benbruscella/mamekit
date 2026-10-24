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
      1: { video: '736aaed2', state: '0b870596' },
      300: { video: 'd8784d83', state: '6cdd9783' },
      600: { video: '00a6db5d', state: 'c5bb0a54' },
      1200: { video: '1ec0a091', state: '6dd7267b' },
      1800: { video: '4c04253a', state: 'b2a02000' },
      2100: { video: 'ade11a75', state: '2eb0df04' },
      2400: { video: 'c2bb0eb6', state: '6f24e422' },
      2700: { video: '853ec195', state: '49d2d88c' },
      3000: { video: '21f5284d', state: '61fd1060' },
    },
    audio: {
      writes: 692710,
      nonzeroWrites: 20363,
      writeHash: '2a83f5ea',
      pcmHash: 'e3b9d3ca',
      rms: 0.10776,
    },
  },
});
