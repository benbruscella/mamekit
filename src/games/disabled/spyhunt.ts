// DISABLED: this target is not discovered, generated or shipped.
//
// Parked by issue #53 on play-test evidence; re-examined for issue #108,
// which is where the measurements below come from.
//
// Renders its attract mode correctly at ~50 fps (the road, the scenery and
// the "THE ROAD LORD" / "BULLET PROOF BULLY" banners are all right), but a
// coin is never credited, so play cannot start.
//
// Measured 2026-08-31: the coin does reach the port. ssio:IP0 reads 0xff at
// rest and 0xfe while Digit5 is held, which is IPT_COIN1 active low, and
// the board IR binds m_ports to ssio:IP0..IP4 so midway_ssio_device
// ::ioport_read has the live value. The analog controls now also rest where
// MAME rests them (IP2 pedal 0x30, IP2.ALT wheel 0x74) rather than pinned
// at zero. What happens to the coin after the SSIO reads it is the open
// question.
//
// Move this module and its spec back up to src/games/ to re-enable the
// target once the fault is fixed.

import { sourceTarget } from '../source-contract.ts';

export const spyhunt = sourceTarget({
  game: 'spyhunt',
  driver: 'src/mame/bally/mcr3.cpp',
  machine: { className: 'mcrsc_csd_state', name: 'spyhunt' },
  screen: { width: 512, height: 480 },
  soundKind: 'ay8910',
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'KeyZ', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'KeyC', heldFrames: 30, releasedFrames: 20 },
  ],
});
