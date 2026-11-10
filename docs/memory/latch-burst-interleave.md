---
name: latch-burst-interleave
description: "The frame quantum now runs to the next scheduled event, bounded by 1 ms, with set_perfect_quantum lowered from source; plus the two other faults behind gauntlet's sound handshake (#88)"
metadata: 
  node_type: memory
  type: project
  originSessionId: 65975871-f4bc-4587-8e45-46ca4ebadb94
  modified: 2026-08-26T07:41:39.580Z
---

Companion to [[scanline-interleave-limit]], which is about the quantum being
too *coarse*. It was also too *fine*, and that is worse in a different way.

MAME runs every processor to `min(basetime + quantum, next timer expiry)` and
only then calls `execute_timers()`, so whatever a processor does between two
scheduled events is atomic as far as the others are concerned.
`GeneratedFrameRunner` used to hand over once per scanline regardless, which
splits work MAME keeps whole.

**The rule now (all three parts matter):**

1. The quantum runs to the next frame-event line (`boundaryLines`) — those
   events are the board's timers.
2. It is bounded by `MAX_QUANTUM_SECONDS`, **250 us** (was 1 ms — see below).
   MAME's real quantum is also bounded by every device timer, and the timers
   this runtime models tick per scanline, so claiming a whole frame of
   atomicity is claiming more than the model supports. Uncapped, **phoenix and
   rampage stop drawing**.

   The bound is squeezed from BOTH sides and the window is narrow:
   - **Too coarse** starves a fast processor's handshake. At 1 ms **gyruss
     lost 51% of its sound writes and junofrst 29%** (also tutankhm -10%,
     frogger -10%): both are boards where an 8 MHz i8039 feeds a DAC under a
     slower CPU. 250 us restores every one to within 0.4%.
   - **Too fine** makes a driver's own `perfect_quantum` request a no-op.
     Gauntlet asks for 100 us, so at a 100 us bound the boost can no longer
     shorten anything and gauntlet's sound handshake breaks again (its POKEY
     collapsed to 3 distinct values). That is the real reason the bound cannot
     just be per-line.

   The derived fix, still not done, is to lower the device timers MAME clamps
   its own timeslice against; 250 us is empirical.
3. `machine_config::set_perfect_quantum` is lowered from source
   (`kg/build.ts` -> `execution.perfectQuantum`) and forces the per-line
   cadence for the whole run. **qix** needs this — its three processors share
   RAM through a handshake nothing coarser survives — and so does carnival
   (vicdual). Both then pass with their goldens untouched.

Everything else drifts its goldens (36 re-recorded 2026-08-26) without
changing behaviour: mrdo and mspacman are still **0 differing pixels** against
real MAME afterwards, and no hard assertion moved.

**Gauntlet (#88) needed three separate fixes and none alone was enough.**

1. **The quantum**, above. Its sound board answers the power-on handshake with
   six writes to one latch inside ~37 us. A 68010 let in among them takes a
   second data-pending interrupt and banks a response the main board never
   asked for; the sound watchdog at maincpu `0x40e84` reads any unsolicited
   response as a dead sound board and resets it every other frame from then
   on. Gauntlet reads coins on the sound board, so this ate every coin.
2. **`PORT_READ_LINE_DEVICE_MEMBER` was only lowered for `screen_device::vblank`
   and the uPD1990A.** Every other device output line read into a port bit fell
   through to nothing — silently. Gauntlet publishes both latch-pending flags
   that way on port `803008` (bit 4 SNDBUF, bit 5 68KBUF), and the main board
   refuses to send a command while its own is still full. Now a generic
   `device-line` custom; a line belonging to hardware the board does not
   instantiate (Asteroids' DVG done flag) leaves the bit alone.
3. **`perfect_quantum` must shorten the quantum, not run the other processor
   now.** `boost()` runs it immediately, which is a fair approximation from a
   handler but wrong from a devcb: gauntlet appends the request to its sound
   latch, and the two instructions *after* the command write are the ones that
   arm the buffer the answer belongs in. The devcb effect calls
   `GeneratedFrameRunner.quantumWindow`; `boost()` is unchanged for the handler
   path dkong/dkongjr/elevator/rampage rely on.

Deferring the latch store itself (MAME's literal `synchronize`) does **not**
help and actively hurts once the quantum is right — tried both ways.

**A re-record can bless a regression.** All four boards above passed
acceptance after the 1 ms change because I re-recorded their goldens: the
video hashes were byte-identical and no hard assertion moved, so I declared
"drifted without changing behaviour" — and the audio write counts, sitting in
the same diff, were shouting. The user found gyruss by ear. `record-goldens`
now warns on a >5% sound-write swing. **Check the write counts in the golden
diff before committing a mass re-record.**

**How to apply:** when a two-CPU handshake goes wrong and the *values* are
right, count the interrupts, not the bytes, and dump the far side's own
bookkeeping in both emulators at the same frame — gauntlet's response ring at
`0x904f8e` (+3 read index, +4 write index, +6 capture pointer) showed two
entries against MAME's one, which was the whole bug. MAME Lua
`install_read_tap` with `mcpu.state["PC"].value` tells you whether a read came
from the interrupt handler or from a poll. Before blaming the scheduler, check
that every `IPT_CUSTOM` bit on the ports involved actually lowered. And after
touching the quantum, the full real-ROM sweep is the only gate that covers it.
