// Re-enabled for issue #108, after issue #53 parked it as "controls are
// janky". The steering is MAME's own IPT_DIAL with its declared
// PORT_KEYDELTA(4), and the board now boots, drives and sounds.
//
// Verified against MAME 0.289 in attract mode with no input at all: our
// frame 600 differs from MAME's by 390 pixels out of 57344 (0.68%), all of
// them inside x 242..254, y 193..222. That box is one zoomed sprite drawn
// beside the CREDIT counter which we do not draw at all; the rest of the
// attract screen -- text layer, road, track map and palette -- is exact.
// Worth chasing in polepos_v.cpp zoom_sprite before calling this target
// finished.

import { sourceTarget } from './source-contract.ts';

export const polepos = sourceTarget({
  game: 'polepos',
  driver: 'src/mame/namco/polepos.cpp',
  machine: { className: 'polepos_state', name: 'polepos' },
  screen: { width: 256, height: 224 },
  soundKind: 'wsg',
  actions: [
    // Pole Position ignores an early coin while its board test is running.
    // Keep actions non-overlapping: the acceptance harness replays each pulse
    // to completion before advancing to the next scheduled action.
    { atFrame: 600, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 820, code: 'KeyC', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 850, code: 'ArrowRight', heldFrames: 30, releasedFrames: 20 },
    { atFrame: 900, code: 'ArrowUp', heldFrames: 270, releasedFrames: 20 },
  ],
  audioRequirements: [
    { method: 'discrete', fromFrame: 120, minimumNonzeroWrites: 100 },
    {
      method: 'discrete',
      offset: 3,
      fromFrame: 880,
      toFrame: 990,
      minimumNonzeroWrites: 100,
      minimumDistinctValues: 16,
    },
    { method: 'polepos_engine_sound_lsb_w', fromFrame: 900, minimumNonzeroWrites: 50 },
    { method: 'polepos_engine_sound_msb_w', fromFrame: 900, minimumNonzeroWrites: 50 },
  ],
  golden: {
    regions: {
      '51xx:mcu': 'c2f57ef8',
      '52xx': '77f83385',
      '52xx:mcu': '3257d11e',
      '53xx:mcu': 'b326fecb',
      '54xx:mcu': 'ee7357e0',
      bigsprites: 'deef9a37',
      chars: '2e77187e',
      engine: '8453714e',
      maincpu: '9f2aace1',
      namco: '8568decc',
      proms: '751f64f9',
      road: 'eb5866b8',
      scalelut: 'a61bff15',
      sprites: '6c79e3ab',
      sub1: 'd0283cc3',
      sub2: '769c065e',
      tiles: '706e888a',
      user1: '2401c817',
    },
    checkpoints: {
      1: { video: '89dde23a', state: '7e635302' },
      60: { video: '89dde23a', state: 'f0b035d3' },
      180: { video: '81ca9e9a', state: '74a3087d' },
      300: { video: '9bbefd2e', state: '5340b328' },
      600: { video: 'b8a3cea9', state: '11b7ec78' },
      900: { video: '5fb07a52', state: '4da5fa3e' },
      1200: { video: 'ba36bab2', state: '1e4d0cc6' },
    },
    audio: {
      writes: 387220,
      nonzeroWrites: 151194,
      writeHash: '129a395d',
      pcmHash: '4102b5b7',
      rms: 0.186474,
    },
  },
});
