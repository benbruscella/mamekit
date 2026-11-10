---
name: issue-149-next-four
description: "#149 (bombjack, hyperspt, mk, nbajam): all four accepted; what bombjack+hyperspt needed, the VLM5030 recipe, sweep regressions, MK/NBA Jam status and residual"
metadata: 
  node_type: memory
  type: project
  originSessionId: 8f4a5324-b2d9-4697-abd8-9c13b93fa8a8
  modified: 2026-09-18T09:22:11.321Z
---

Branch `issue-149-next-four`, 2026-09-18. Issue list was changed by the user
from OutRun/Golden Axe to Mortal Kombat + NBA Jam (same `tunit_adpcm` board).

**Bomb Jack (0 px vs MAME at 1500/1800/2400)** needed four KG/video fixes:
unqualified templated config helper `bombjack_base(config, AY8910)` (driver
multi-arg config members are now helpers), owner-class submap
`.m(FUNC(cls::map))` with no device ref, east-const `gfx_layout const`, and
multi-declarator `static inline constexpr u16 A = 1, B = 2;` -- which has TWO
parsers (kg/parse.ts parseDefines AND video-compiler sourceNumericConstants).
Its ~1100-frame "PUSH BUTTON FOR CHECK" boot screen is authentic.

**Hyper Sports / VLM5030** is a generic DEVICE (not a bespoke compiler):
forward `goto` lowered in handler-ir (flag + one-pass while), `.hxx` followed
by the device closure, `static const struct` coeff sets lifted as members with
`initialValue`, multi-word `unsigned int` members/struct fields,
`romInterface` -> `read_byte`, `machine().rand()` with MAME's seed 0x9d14abd7,
`stream_alloc` rate recorded, `stream-device-pump.ts` + SN76489 worklet PCM
queue. The device-compiler `#define` regex stopped at the first `/`, so every
dividing macro was lost (frame size 0 -> speech 2x too long).
**Oracle for one chip:** mute the others via MAME 0.289 cfg
`<mixer><device_volume device=":dac" gain="0"/>` -- Lua can't reach per-device
gain. Speech then matched MAME per quarter second.

**Regressions the full sweep caught** (all fixed, see [[acceptance-run-flake]]):
mslug gained `cslot1:NEOGEO_CART_SLOT` (helper now expands `cartslot_fixed`;
execution byte-identical -> certified); the board's device-finder Proxy must
not forward `valueOf`/`stateKeys`/`stateRestored` as MAME calls; and gating the
Proxy fallback on `methodNames()` broke bublbobl's rewind -- `invoke` also
resolves host-bound calls. Bisect by editing dist/runtime/core JS.

**Trap:** `npm run serve:build -- --help` recompiles dist's app shell before
failing -- it silently changed what I was testing.

**MK and NBA Jam** (2026-09-19) both accepted and verified against MAME
0.289: 0 px at every checkpoint before the attract demo; see [[tunit-board-lessons]]
for the dozen general fixes they needed. Attract demos diverge only because
the game seeds its RNG from the frame the CMOS-screen button is seen (harness
and Lua deliver input at different raster points). Open residual: DAC-sampled
sounds lack 0-500 Hz energy (~0.45x MAME vs the 0.7x host gain).
