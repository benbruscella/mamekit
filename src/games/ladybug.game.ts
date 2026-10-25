import { sourceTarget } from './source-contract.ts';

export const ladybug = sourceTarget({
  game: 'ladybug',
  driver: 'src/mame/universal/ladybug.cpp',
  machine: { className: 'ladybug_state', name: 'ladybug' },
  screen: { width: 240, height: 192 },
  soundKind: 'sn76489',
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
      1: { video: '99857a71', state: 'f256b4b2' },
      60: { video: '99857a71', state: '24c9f3ee' },
      180: { video: '99857a71', state: 'a6cc347f' },
      300: { video: '5a717186', state: '31ef3bc1' },
      600: { video: '3fcdfa59', state: '9ca0a255' },
      900: { video: '07310a73', state: 'dff1b3c6' },
      1200: { video: '732c15e9', state: '43ae4e08' },
    },
    audio: {
      writes: 865,
      nonzeroWrites: 865,
      writeHash: 'f1353bb9',
      pcmHash: '54bd0fdc',
      rms: 0.036092,
    },
  },
});
