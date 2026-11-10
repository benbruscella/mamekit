---
name: device-clock-vs-beam
description: Generated device timers are armed against raster positions, so the device clock must settle against the beam at every line boundary — the NES PPU's failure mode
metadata:
  type: project
---

`generated-board.ts` runs two clocks: the frame runner's beam (one scanline per
`onLine`) and the device-timer clock (advanced by CPU instruction-time deltas
through the `timing()` hook). MAME arms device timers against **raster
positions** (`screen().time_until_pos`), so the two must agree at every line
boundary.

They did not, because `GeneratedCpu.run()` reported `target` rather than the
cycles it actually executed — every slice overrun was charged to the frame
runner's carry and lost to the device clock, leaving devices ~1% per line
behind the beam. `time_until_pos` then eventually asked for a line already
gone by, and its `lines <= 0 -> += vtotal` gave MAME's answer: a whole frame's
delay, permanently.

Fixed 2026-08-25 (issue #85) by:
- `timedHardwareDelivered`, settled SIGNED at each `before-processors` line
  boundary (subsumes the old held-CPU special case);
- `time_until_pos` answered from `beamPosition()` — the timer clock's own
  fractional line — not from the integer `currentLine`;
- `generatedTimerBacklog()` in generated-device.ts, so a callback firing
  partway through an instruction-sized lump reads the beam at its *expiry*.

**Blast radius when touching this:** boards with timer-bearing generated
devices — digdug, galaga (MB8843/44, NAMCO_06XX), qix (MC6845), rampage
(Z80CTC), venture (MOS6532/PIT8253), elevator (hosted M68705) — plus nes.
Their goldens shifted phase (video mostly identical) and were re-recorded.

See [[emitter-interpreter-parity]], [[frugal-blast-radius]].
