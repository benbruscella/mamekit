---
name: pinball-support
description: "MAME emulates almost no pinball (250 of 1973 sets); the whole DMD era is 0 working; PinMAME is licence-split and unusable as source; #148 pinsim's first table is High Speed with Classic Playfields art"
metadata:
  node_type: memory
  type: project
  originSessionId: 686d9a21-c14b-47df-87d4-6a324418539b
  modified: 2026-10-31T11:06:48.271Z
---

Pinball survey done 2026-09-17 against MAME checkout `f34f0250` (2026-07-30),
recorded in issue #147.

**Mainline MAME emulates almost no pinball.** Only 250 of 1973 sets in
`src/mame/pinball` are marked working. The entire dot-matrix era is 0 working:
WPC 0/268, Whitestar 0/353, Stern SAM 0/199, Data East DMD 0/116, Bally
MPU-35 0/77. So no Addams Family, Twilight Zone or Medieval Madness exists to
compile. Re-verified 2026-10-31 against the 0.289 binary's `-listxml`: the 250
sets are 138 parent titles across 26 of 100 driver files. Williams/Bally System
3-11C is 155 sets; the rest are wms_shuffle (12, bowlers rather than pinball),
Gottlieb System 1 and 80, Allied, Game Plan, Inder, Hankin, Stern MP-100,
Atari, Zaccaria prototypes and a few one-offs.

**In `-listxml`, read `emulation`, not `status`.** `infoxml.cpp` forces
`status="preliminary"` on anything `MACHINE_MECHANICAL`, so all 1973 are
preliminary. `emulation="good"` means `MACHINE_NOT_WORKING` is clear, which is
also what the UI's Working filter tests.

**"Working" for a pinball means displays + switch matrix operable from the
keyboard, not ball physics.** `MACHINE_MECHANICAL` stays set either way.
`s11.cpp` is marked working with only "Machanical sounds" outstanding.

**PinMAME is not a usable source.** It emulates ~770 machines but is a fork of
MAME 0.76 in C (`MACHINE_DRIVER_START`, `MDRV_*`, `MEMORY_READ_START`) with no
device model, so nothing transfers mechanically. Worse, its BSD-3-Clause
relicensing is unfinished: of 180 files in `src/wpc`, 79 are marked and 93 are
not, and the unmarked set includes `core.c`, `core.h`, `sndbrd.c` and
`wmssnd.c` -- the lamp/solenoid engine and all Williams sound. Those are old
MAME licence, no sale, restricted redistribution. Using PinMAME as a cited
*reference* is fine and routine: 34 files under `src/mame/pinball` already do it.

**Why: this collides with "MAMEKIT is a MAME-specific source compiler"**
([[compiler-not-porter]]). Compiling PinMAME would mean a second front end for
a different language generation, plus encumbered output.

**How to apply:** any pinball target must be segment-era from mainline MAME.
Before *any* pinball can compile, MAMEKIT needs an outputs/layout concept it
does not have: these boards declare no screen, write digits/lamps/solenoids
through MAME's output manager, and are drawn by a `.lay` file.
`src/runtime/generated-video.ts` throws with no screen-update callback. A
screenless board also needs a synthetic frame clock, goldens must hash the
outputs table instead of frames, and `-listxml` reports no display
([[listxml-fact-oracle]]). Layouts are small: `s6.lay` 91 lines, `s11.lay` 93.

**Decided 2026-10-31 (#148): pinsim's first table is High Speed (`hs_l4`,
`s11.cpp`), and its playfield art comes from Classic Playfields
(classicplayfields.com).** This replaced Centaur, whose `by35.cpp` is still 0/77
working in 0.289 even though #147 is closed. Open at that date: the `hs_l4` set
was not in the default rompath or `.data`; CPR's full-size High Speed board was
out of stock ($849, waitlist); the source image (scan of a bought board or
CPR-supplied art) and CPR's permission were undecided.
