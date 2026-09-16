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
      180: { video: '99857a71', state: '6a18d5b7' },
      300: { video: '5a717186', state: '797cea5e' },
      600: { video: '57e1450f', state: 'e26e6297' },
      900: { video: 'adfaaca6', state: '467d61c8' },
      1200: { video: '1b4de988', state: 'cbfb0a2d' },
    },
    audio: {
      writes: 801,
      nonzeroWrites: 801,
      writeHash: '39727913',
      pcmHash: '59fa1a9f',
      rms: 0.035684,
    },
  },
});
