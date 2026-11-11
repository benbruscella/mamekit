import { sourceTarget } from './source-contract.ts';

export const ladybug = sourceTarget({
  game: 'ladybug',
  driver: 'src/mame/universal/ladybug.cpp',
  machine: { className: 'ladybug_state', name: 'ladybug' },
  screen: { width: 240, height: 192 },
  soundKind: 'stream',
  // Lady Bug's upright panel is joystick-only; its controls are read through
  // the CONTP1/CONTP2 PORT_CUSTOM delegates rather than direct IN0 bits.
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'ArrowUp', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      gfx1: '869135e7',
      gfx2: 'b7f9eadc',
      maincpu: '26ddc447',
      proms: '5a2e6c23',
    },
    checkpoints: {
      1: { video: '99857a71', state: '04175165' },
      60: { video: '99857a71', state: '80c6946d' },
      180: { video: '99857a71', state: 'cf9cac7b' },
      300: { video: '5a717186', state: 'ce68e9cc' },
      600: { video: '3fcdfa59', state: '9f014321' },
      900: { video: '07310a73', state: '4bc9b790' },
      1200: { video: '732c15e9', state: '52554773' },
    },
    audio: {
      writes: 958171,
      nonzeroWrites: 239512,
      writeHash: '3dba0ec9',
      pcmHash: '389c536b',
      rms: 0.072014,
    },
  },
});
