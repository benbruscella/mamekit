---
name: scanline-interleave-limit
description: "The frame scheduler interleaves CPUs once per scanline; any MAME handshake finer than that needs perfect_quantum, which used to be a no-op"
metadata:
  node_type: memory
  type: project
---

`GeneratedFrameRunner.frame` runs each processor for one whole scanline's
cycles per line, in `machine.execution.cpus` order. On a 30 Hz / 480-line
board that is a **69 us** quantum — coarse enough to swallow an entire
inter-CPU handshake.

Rampage (issue #74, 2026-08-24) was the first casualty: MCR's Sounds Good
command latch presents two 4-bit nibbles ~45 us apart, each strobed by CA1, so
the 68000 only ever saw the second nibble of every command and most sounds
never played. MAME guards exactly this with
`machine().scheduler().perfect_quantum(attotime::from_usec(250))` in
`midway_sounds_good_device::synced_write` — and
`calls['machine().scheduler().perfect_quantum']` was bound to `() => 0`.

Now implemented as `GeneratedFrameRunner.boost(activeTag, seconds)`: run every
other processor immediately and charge the cycles against its carry, so a boost
changes *when* a processor runs, never how much. Capped at 1 ms. Reached from
`IrBoard.perfectQuantum` and from `SoundRuntimeContext.perfectQuantum`.

**Why:** the symptom is "some sounds play, some don't", which reads like a
missing chip or a bad decode, not like a scheduler quantum.
**How to apply:** when a two-CPU handshake half-works, measure the gap between
the writes involved against 1/(refresh*vtotal) before suspecting the device.
The decisive probe is a MAME Lua `install_read_tap` on the *listening* CPU's
side of the latch, diffed against the same accesses in our runtime — that is
what showed the sound board receiving one nibble per command instead of two
([[mame-reference-capture]]). Boards whose lowered source calls perfect_quantum:
dkong, dkongjr, elevator, rampage (all re-verified).

Rampage runs at **30 fps by design** (`m_screen->set_refresh_hz(30)` in
mcrmono); the browser reporting "30 fps of 30.0 Hz" is 100% speed, not a
performance problem.

**Composition order (2026-08-24, same session).** Devices and CPUs were
collected by visiting the *derived* machine config before the base it calls, so
`execution.cpus[0]` — the processor the frame schedule runs first each
scanline, and the one the shell's status line labels `pc=` — was a sound board
on 8 targets (bublbobl, carnival, frogger, mario, qix, rampage, scramble,
venture). Fixed by recording each CALLS edge's position among its config's own
device declarations (`callOrders` in kg/parse.ts) and replaying statements in
that order in BOTH device walks — `src/gen/generate.ts` and
`lowerGeneratedMachine` in `src/gen/emit-machine.ts` each have their own.
"Calls first" is NOT a valid shortcut: Qix's qix_base creates maincpu first and
calls qix_video last.

**The quantum can also be too fine** — see [[latch-burst-interleave]] for the
opposite failure, where MAME's coarse timeslice is what makes a latch burst
one interrupt and ours splits it into two.
