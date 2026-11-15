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
      1: { video: '99857a71', state: 'a0e28a13' },
      60: { video: '99857a71', state: '95ec22ce' },
      180: { video: '99857a71', state: '34e422d2' },
      300: { video: '5a717186', state: '0009cb58' },
      600: { video: 'b4bd1623', state: '244c3bad' },
      900: { video: '6b2245da', state: '0e58308f' },
      1200: { video: '995d160e', state: '7b9909c5' },
    },
    audio: {
      writes: 958171,
      nonzeroWrites: 236179,
      writeHash: 'f35537b7',
      pcmHash: 'b0bd2e01',
      rms: 0.0711,
    },
  },
});
