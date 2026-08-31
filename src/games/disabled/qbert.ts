// DISABLED: this target is not discovered, generated or shipped.
//
// Parked by issue #53 on play-test evidence; re-examined for issue #108,
// which is where the measurements below come from.
//
// Boots and draws its attract mode correctly at ~430 fps -- the title,
// the "1 COIN 1 PLAY" panel and the bouncing Q*bert all render -- but a
// coin is never credited.
//
// Measured 2026-08-31, so the next investigation can start past this:
// - The coin reaches the bus. IN1 at 0x5801 reads 0x40 at rest and 0x44
//   while Digit5 is held, which is IPT_COIN1 (0x04, active high) exactly
//   as gottlieb.cpp declares it.
// - The vblank NMI fires every frame (screen_vblank asserts at line 240
//   and clears at line 0), so the polling handler is running.
// - The DSW power-on value is now 0x02, matching MAME's own -listxml.
// - The main CPU takes a one-frame excursion to 0xC8F8 on the coin and to
//   0xB370 on the start button, then returns to its 0xC457 idle loop with
//   the credit count still zero.
// The remaining suspect is I8088 execution inside that coin routine, which
// wants an instruction-level diff against MAME rather than more black-box
// probing.
//
// Move this module and its spec back up to src/games/ to re-enable the
// target once the fault is fixed.

import { sourceTarget } from '../source-contract.ts';

export const qbert = sourceTarget({
  game: 'qbert',
  driver: 'src/mame/gottlieb/gottlieb.cpp',
  machine: { className: 'gottlieb_state', name: 'qbert' },
  screen: { width: 256, height: 240 },
  soundKind: 'dac',
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      bgtiles: '365a875e',
      maincpu: 'be0a0530',
      'r1sound:audiocpu': 'a20d1420',
      sprites: 'd8a2b040',
    },
    checkpoints: {
      1: { video: '07673647', state: 'b9dcb33a' },
      60: { video: '0a71ec05', state: 'e3a6a9b3' },
      180: { video: '9e26a63e', state: '89dd7372' },
      300: { video: '517aeb0c', state: 'd8185c96' },
      600: { video: '7028b3bf', state: 'e9c85c59' },
      900: { video: '23bb479e', state: 'fb3eaa0d' },
      1200: { video: '23bb479e', state: 'a5621254' },
    },
    audio: {
      writes: 6,
      nonzeroWrites: 3,
      writeHash: 'adf9e363',
      pcmHash: '6ae1ca16',
      rms: 0.865539,
    },
  },
});
