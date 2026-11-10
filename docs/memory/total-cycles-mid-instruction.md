---
name: total-cycles-mid-instruction
description: "MAME's total_cycles() counts cycles inside the running instruction; ours froze at instruction boundaries and put every Atari 2600 sprite 3 pixels left — River Raid is now pixel-exact vs MAME"
metadata:
  node_type: memory
  type: project
---

Fixed 2026-08-30. The Atari 2600 has no sprite position register: software
positions an object by *when* it writes RESP0, and the TIA reads
`current_x() = 3 * ((m_maincpu->total_cycles() - frame_cycles) % 76) - 68`.
So one CPU cycle of error is exactly **three pixels** on screen.

**The bug.** The generated cores are already cycle-accurate -- they emit
`(++this.cycles, this.readMemory(...))`, charging the cycle before the access
it pays for, exactly as MAME does. But the board only learned the count from
`bus.timing(elapsed, target)`, which `run()` calls **between** instructions. So
`total_cycles()` was frozen at the start of whatever instruction was running,
and every sprite landed one cycle early. Fix: the emitted core exposes
`elapsedCycles()` (its in-instruction counter) and `totalCycles()` adds it.
`run()` now clears `this.cycles` *before* calling `timing()`, not after --
timing() is where device timers run and they read total_cycles, so a stale
count there would be double-counted with the already-advanced slice total.

Only a core with a per-access counter can answer: I8080/I8085A have no
`cycles` member and `M68000` is `fixedInstructionCycles`, so the codegen emits
`elapsedCycles()` only when `members` contains `cycles` and the core is not
fixed-cycle.

**Ground truth, and the method.** MAME `-video soft -nothrottle -snapview
native -snapshot_directory <dir>` with the SNAPFRAME lua from
[[mame-reference-capture]], no input at all, gives a deterministic reference.
For the 2600 the snapshot is **176x223 -- identical to our framebuffer**, so
the diff needs no rotation or scaling. River Raid went from **80 differing
pixels to 0** on every reference frame. (Arcade snapshots are NOT so kind:
frogger came out 224x768 with artwork applied even under `-snapview native`.)

**Two measurement traps this cost me first:**
- `horzP0` read at frame end looks like it "jumps" 56<->78 at random frames.
  It does not: MAME writes RESP0 **1.86 times per frame** (335 writes in 180
  frames, from a Lua write-tap histogram), so the frame-end value is just
  whichever write came last. Read the *rendered* pixels, never the register.
- A Lua write-tap must do **no I/O and no `screen:hpos()`** in its callback --
  file writes silently kill the tap, and `hpos()` hangs MAME outright. Count
  into a Lua table and dump it from `emu.add_machine_frame_notifier`.

**Blast radius:** board-level `total_cycles()` is read by 11 targets --
a2600, asteroid, frogger, gyruss, junofrst, pooyan, rocnrope, scramble,
timeplt, tutankhm, wboy. asteroid passes; the other nine were **already**
failing their goldens from the earlier total_cycles work in the same session
and still are ([[known-broken-targets]]). A 10-game sample outside that set is
unaffected. Inside a CPU core `total_cycles` lowers to the literal `1`, so
cores are not affected by their own use of it.
