---
name: mid-instruction-timer-order
description: "#157 — C64 tape Play sometimes snapped back to STOPPED: late timers ran time backwards; catch-up on time query fixed it; per-slice overrun delivery silenced NES/missile sound"
metadata:
  node_type: memory
  type: project
  originSessionId: e6f3a7ee-598d-4a8d-8a44-383a3825536b
  modified: 2026-10-17T10:17:46.606Z
---

2026-10-17. The C64 datassette stopped itself on ~20% of Play presses at tape position 0: the c2n 44.1 kHz read timer, due 2-3 µs before the CPU's motor-on write *inside the same instruction*, fired after it and handed MAME's cassette `update()` a negative delta (it refuses negative positions -> STOPPED). MAME's 6502 suspends between cycles (`m_inst_substate`), so there the timer fires first.

Fix (generic, 6502 family only): CPU compiler derives `suspendsMidInstruction` from the core's MAME header (`m_inst_substate` declared); for that timer-clock CPU, `machineSeconds()` first catches the device clock up to `runningSliceCycles + elapsedCycles()` plus the previous slice's undelivered overrun (`timerCpuCarriedCycles`; the line settle's device-vs-beam balance then owes less). Guards that were each a real bug while building it: only while the core is inside `run()` (`coreExecuting` — the sound runtime's tickCpu asks the time after run() returns and it double-delivered the whole slice), never while device time is being delivered (`deliveringDeviceTime`), and past-target catch-up tracked (`deviceTimeAheadOfSlice`) so the closing timing() doesn't re-deliver.

**Rejected:** delivering every slice's overrun to devices (like lockstep does). A/B showed it alone silenced nes:smb1/smb3u and missile sound and changed venture; catch-up alone kept all 11 6502 contracts golden-identical.

Same session: MAME's C64 `machine_start` fills RAM with 64-byte $00/$FF runs; Cauldron copies its first SID frame from untouched RAM. Now interpreted at gen time (`ramPowerOn`) into `memoryAllocations.runs`; only root RAM devices (c64/c64p only).

Ground truth recipe (also in ENGINEERING.md): MAME 0.289 `-iec8 "" -cass x.tap -nothrottle -video none -wavwrite` + Lua `natkeyboard:post_coded("LOAD{ENTER}")` (`\n` does NOT press Return) + `cassettes[...]:play()` + write tap on `:u7` $D400-$D7FF; never pipe MAME into `head` (SIGPIPE kills it and truncates the WAV header). Ours: wrap `board.bindings.calls['m_sid.write']` then `noteCallLinksChanged()`. Cauldron I&II: 182,525 SID writes identical; octave bands within 0.1 dB.

**How to apply:** a timer-order fixture must use whole cycles per line and a per-line schedule — multi-line rounds put the device clock *ahead* of the CPU by design, and fractional lines leave sub-cycle reversals at each settle. See [[c64-1541-disk-bringup]], [[media-slots-on-demand]], [[device-clock-vs-beam]].
