---
name: a2600-milestone
description: "Atari 2600 (issue #94) — carts boot and play at 54-86 fps as of 2026-08-28; what is left, and the venture regression the cart-bus work exposed"
metadata: 
  node_type: memory
  type: project
  originSessionId: fb7744c5-8dc2-43e6-b818-44fc02029876
  modified: 2026-08-28T08:35:15.513Z
---

Branch `94-add-support-for-atari-2600-console`. Commit `1de252d` ("Atari 2600
WIP 1") holds the compile-side work; the playable-cart work after it was still
uncommitted at the end of 2026-08-28.

**Cartridges boot and play.** Adventure 76fps, Combat 86, Space Invaders 83,
Defender 74, Pac-Man 72, Pitfall! 73, Breakout 60, Asteroids (F8 bank-switched)
57, Frogger 54 — against the machine's own 59.92 Hz. Verified by reading the
framebuffer back and rendering PNGs, not by fps alone: Pitfall's vine ladder and
Pac-Man's maze are recognisable. These nine are `CART_GAME_SUPPORT.a2600`.

**Executable:** M6507, MOS6532 RIOT, TIA_NTSC_VIDEO, VCS_CART_SLOT with all 25
PCBs, VCS_CONTROL_PORT with 9 cards. `CART_SLOT_SUPPORT.a2600` lists the six the
runtime installer answers (2k_4k, f8, f8sw, f6, f4, fa) -- 2K/4K alone is 1067 of
the 1591 softlist entries. The shelf carries 1459 imported carts.

**Sound now works** (2026-08-30) and matches real MAME to 0.1-4% -- see
[[tia-audio]]. The audit is clean, `playable` is true and the room's silent
banner is gone.

**Known fidelity gap:** the TIA composes ~126 of the ~192 expected scanlines
(beam stops near y=182, content y 39..182 of the 342-row helper), so the picture
fills the upper ~60% of the frame. NOT a screen-height problem -- MAME's own
`m_screen->configure(...)` in `a2600_tia_vsync_callback` is commented out, so the
fixed 262 matches. Suspect WSYNC/cycle accounting: `adjust_icount` charges the
stall to the NEXT scheduler slice rather than stopping the CPU where MAME does.

**The venture regression this caused, unresolved.** Venture's *sound* board maps
its RIOT through the same `.m(tag, FUNC(device::map))` submap the 2600 uses, and
that lowered to `nop` -- no RAM, no registers. Expanding it (needed, or the
2600's RIOT, Defender's blitter and Double Dragon's bank device all stay dead)
moved venture's audio RMS to 0.0122, under its 0.02 floor. Ground truth: real
MAME's venture attract measures **RMS 0.0173** over a comparable window
(`mame venture -seconds_to_run 12 -video none -wavwrite out.wav`), also under the
floor, and far from the 0.071 in venture's recorded golden. So the fix moved
venture toward MAME and the floor looks miscalibrated -- but the contract was
deliberately left untouched, because lowering a gate is the user's call and the
other reading is that this exposed [[venture-silent-riot-irq]] (#63).

**Why:** everything here was a general MAME-framework gap, not 2600 hardware
work. See [[handler-ir-cpp-gaps]] and [[mame-framework-runtime-gaps]].

**How to apply:** 53/56 games pass the real-ROM sweep (commando and gyruss fail
only under sweep parallelism and pass alone). Next: TIA audio, then the scanline
shortfall, then console/cart artwork -- `media/consoles/a2600.png` and
`artwork/carts/a2600` do not exist, and without the hero image the room draws the
NES-shaped deck.
