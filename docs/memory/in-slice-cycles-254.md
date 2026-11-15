---
name: in-slice-cycles-254
description: "#254: cores compiled whole only report cycles when execute_run returns; anything placing the running CPU must add elapsedCycles() or it reads the round's first line"
metadata:
  type: project
---

Since #249 a compiled core calls `timing()` only when a piece of its slice
returns, so `runningSliceCycles` stands still inside the slice. The position
inside it is `cpu.elapsedCycles()`.

`frameLines()` and `totalCycles()` already added it; a driver's `vpos()` /
`hpos()` (`beamLine`, `beamHpos` in `src/runtime/generated-board.ts`) did not
until #254 (`runningCycles()`). Symptom: every beam read in a round of
several lines saw the round's first line. Zig Zag's tile write on line 239
split the picture at 237 (one board pixel off MAME).

**Why it matters:** fixing it made ladybug RAM-identical to MAME and moved
mk, nbajam, gyruss and the Galaxian boards, so a beam change has a wide
blast radius: sweep all contracts, not just the board being fixed.

**How to apply:**
- Bus writes matching MAME to the cycle (`--io` tap, timestamps equal) with a
  picture split on the wrong line means the beam read, not the CPU.
- MAME's time 0 is vbstart, so vpos = (vbstart + t / line) % vtotal.
- Still open: `beamHpos` in a one-line round uses `currentLineFraction`
  (#247 6.3).

Related: [[device-clock-lead-254]], [[cpu-cores-249]], [[total-cycles-mid-instruction]].
