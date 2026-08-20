// DISABLED: this target is not discovered, generated or shipped.
//
// Play-test finding, issue #53: Boots and looks OK, but the controls are
// janky.
//
// Move this module and its spec back up to src/games/ to re-enable the
// target once the fault is fixed.

import { sourceTarget } from '../source-contract.ts';

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
      600: { video: '5cb9143a', state: '0b77194f' },
      900: { video: '0a0e8dc4', state: '4cdb2c15' },
      1200: { video: '211e04ca', state: '975994ed' },
    },
    audio: {
      writes: 376752,
      nonzeroWrites: 147636,
      writeHash: '3e35df41',
      pcmHash: '3da27b3f',
      rms: 0.190258,
    },
  },
});
