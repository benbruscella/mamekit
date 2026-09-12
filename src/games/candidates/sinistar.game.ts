// Sinistar (Williams, 1983). 6809 + Williams blitter, 49-way stick.
//
// Two things kept this looking broken, and neither was the blitter:
//
// 1. "FACTORY SETTINGS RESTORED" is **authentic on a cold CMOS**. Real MAME
//    0.289 run with an empty -nvram_directory sits on exactly the same screen
//    at frame 12000; the runs that appeared to boot were reading an nvram MAME
//    had written on a previous exit. The board is in its operator menu waiting
//    for the Advance button on the coin door (IN2 bit 1), so the contract
//    presses it.
// 2. The ship had no controls at all. Movement is IPT_AD_STICK_X/Y -- an
//    absolute 49-way stick that MAME converts through port_0_49way_r -- and
//    only the relative IPT_DIAL and IPT_TRACKBALL types were ever bound.
//
// Verified after both: attract runs, a coin starts a game, the ship flies and
// fires, and the sound board is live (four sound writes became ~41,000).

import { sourceTarget } from '../source-contract.ts';

export const sinistar = sourceTarget({
  game: 'sinistar',
  driver: 'src/mame/williams/williams.cpp',
  machine: { className: 'williams_state', name: 'sinistar_upright' },
  screen: { width: 292, height: 240 },
  soundKind: 'dac',
  // The cold-CMOS operator menu has to be cleared before a coin means
  // anything, so this machine needs a longer run than the 1200-frame default.
  frames: 2400,
  checkpoints: [1, 60, 300, 900, 1500, 1800, 2100, 2400],
  actions: [
    // Clear the cold-CMOS operator menu the way an operator would.
    { atFrame: 900, code: 'F2', heldFrames: 30, releasedFrames: 30 },
    { atFrame: 1400, code: 'Digit5', heldFrames: 30, releasedFrames: 20 },
    { atFrame: 1500, code: 'Digit1', heldFrames: 30, releasedFrames: 20 },
    // Fly, then thrust while firing. Actions may not overlap, so anything
    // held together is one chord.
    { atFrame: 1700, code: 'ArrowRight', heldFrames: 150, releasedFrames: 20 },
    { atFrame: 1900, codes: ['ArrowUp', 'Space'], heldFrames: 100, releasedFrames: 20 },
    { atFrame: 2100, code: 'ArrowLeft', heldFrames: 150, releasedFrames: 20 },
  ],
});
