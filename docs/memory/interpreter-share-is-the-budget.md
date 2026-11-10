---
name: interpreter-share-is-the-budget
description: "A slow target is almost never 'expensive hardware' — profile by module, then count calls per frame; on the Game Boy every hot spot was a compiler gap, and several were silent correctness bugs too"
metadata:
  node_type: memory
  type: feedback
---

2026-09-01, Game Boy at 12.7 fps. The instinct "the DMG pixel FIFO is
modelled dot by dot, so it is just expensive" was **wrong**. Sanity-check
the budget first: a 4 MHz machine is 70,224 cycles and ~23,000 pixels a
frame. If that will not run at 60 fps in JS, the problem is the compiler,
not the hardware.

**The method that worked, in order:**
1. Self-time grouped by *module*, not by function. "62% in
   `runtime/ir/execute.js`" is the whole diagnosis; a flat per-function
   profile hides it.
2. Count what is actually invoked per frame. Patch
   `applyGeneratedMacro`, `IrDevice.executeMethod` and
   `executeGeneratedMachineProgram` to tally by name into a global, and
   run with `node --import`. Every hot spot named itself immediately.
3. For each, ask why codegen declined it (temporary `[decline]` trace in
   `supportsMethod`) rather than assuming it is inherent.

**What the counts found, all compiler gaps:**
- `std::size` dispatched 121,517x/frame through the macro table -- and
  it was **unanswered**, returning undefined, so `index % std::size(...)`
  was NaN. `cpu-codegen` folded it; `device-codegen` did not.
- `gb_timer_callback` + `gb_timer_check_irq`: 17,556 calls **each** per
  frame, interpreted. A handler wired to a board callback was never a
  codegen root (`wiredHotMethods` only claimed address-map ranges), and
  a handler writing an unbound driver array was tainted out -- a guard
  made obsolete by `runtime.writableMember`.
- The APU's `FRAME_CYCLES` (in-class `static const`, not `constexpr`)
  and `wave_duty_table` (defined out of line, qualified, no `static`)
  resolved nowhere, so its frame sequencer and duty waveform did
  nothing. Fixing them made it *slower* -- because it started working.
- `m_wave_ram[2][0x10]`: the member regex allowed one array bound, so a
  2-D member was not a member at all.

Result: 12.7 -> 20.8 fps, and four silent correctness bugs fixed on the
way. **A performance investigation on this codebase is a correctness
investigation** -- unresolved names are fast precisely because they do
nothing. See [[codegen-silent-zero]] and [[gameboy-blank-screen]].

**Reached 60.6 fps** the same day. The rest of the way: lower explicit
base calls (`base_state::machine_reset()` -- the `::` hit the
`before === ':'` guard in `kg/build.ts`, so the divider/serial power-on
init had never run); parse the DRIVER's own enums (`parseEnumConstants`
ran only on included headers); claim callback-wired handlers as codegen
roots; and hoist member reads nothing rebinds (105 lookups per call ->
14, which was the step over the line).

**Three emitted/interpreted parity gaps surfaced as soon as more methods
compiled**, each found by bisecting a failing target, never by reasoning:
`m_palette->pens()` carries no declared type so emitted `+` assumed a
number where the interpreter chose pointer arithmetic (mslug drew every
sprite from the wrong palette); the normalizer rewrote `const pen_t *p =`
to `auto p =`, discarding the star that decision needs; and emitted
`*ptr = v` assumed a pointer wrapper, which a `.share()`-bound member is
not (qix crashed). Widening codegen coverage will keep exposing these --
budget for it. See [[codegen-silent-zero]].

**One process lesson.** When mslug broke I started writing heuristics to
exclude those six handlers from codegen. That would have made mslug pass
and left the parity bug live for every other target. Bisect to the cause;
`grep -o 'function method_'` on the emitted board before/after tells you
what a coverage change actually added, and emptying `compiledHandlers` in
the built board.js tells you in one run whether the divergence is in
compiled code at all.
