---
name: device-clock-u32
description: "MAME's device_t::clock() returns u32, so a generated device must never be handed a fractional clock — the TIA took a code path MAME never takes"
metadata:
  node_type: memory
  type: reference
---

`device_t::m_clock` is a `u32`. A machine config that writes `m_xtal/114` gets
**31399**, never 31399.78 — the truncation happens at assignment, before any
device ever sees it. Our BoardIR carries the exact quotient, and
`generated-device.ts` was handing that float straight back from `clock()`.

**What it cost:** the TIA sizes its sample counter as
`Samp_n_max = ((uint16_t)(uint32_t)clock << 8) / sample_rate`, with the same
value passed twice. Cast on one side only, a float gives 255 rather than 256,
which is `< 256`, which takes the **oversampling** branch MAME does not take.
Fixed by `clock = Math.trunc(clock)` in the `IrDevice` constructor (2026-08-30).

**Blast radius, measured:** 48 of 282 devices across all boards have a
fractional clock, but only six of those execute generated IR — venture's
MOS6532 and PIT8253, gauntlet's TMS5220C, the NES cart slot, and the 2600's
TIA and MOS6532. Everything else fractional is a CPU (scheduled from BoardIR,
not this binding) or a worklet chip (clocked from config.json). gauntlet
passes; venture's failure is the unrelated pre-existing RMS floor
([[a2600-milestone]]). Both 2600 measurements moved *closer* to real MAME.

**How to apply:** the query that scopes this kind of runtime-wide change is
"join board.json device clocks against hardware-manifest.json executableKind" —
it turned an alarming 48 into an actionable 6.
