---
name: device-clock-lead-254
description: "#254: mslug's device clock leads the main CPU by 0.2-0.7 line; precise driver timers re-arming with time_until_pos mis-measure under the present hold; three fixes failed"
metadata:
  type: project
---
#254 (2026-11-15), commit 6d6a3380 on `254-44-lower-neo-geo`. Lowering `updateMode` from device `update_partial` calls moved mslug from `scanline` to `partial`, so its frame is now presented at vbstart with device time held (`awaitingPresent`).

Finding: on mslug the device clock (`beamPosition()`, `timedHardwareDelivered`) stands 0.2-0.7 line ahead of the main CPU. `vblank_interrupt_callback` is a precise driver timer (fires on CPU time, `machineSeconds`) due 29 CPU cycles after vbstart, and re-arms with `m_screen.time_until_pos(240)`, which reads the device beam. Under the hold the IRQ wanders up to half a line and double-fires about every 80 frames. `oracle:baseline compare` shows it only as RAM worse (+1.2%); pixels improved.

Three fixes failed (all reverted): add `heldDeviceSeconds` to the beam; measure from the timer's expiry via the processor's frame position; skip `firePreciseTimers` while held. The last two sent the BIOS down another path (65 KB of save RAM differing).

**Why:** the lead is in the scheduler's line settle and delivery, not in the screen lowering.
**How to apply:** fix the lead itself before touching `time_until_pos`. Probe recipe: wrap `board.bindings.calls['m_screen.time_until_pos']` in `runGameAcceptance`'s `onBoard`, and compare `generatedTimerExpiry()`, `cpuSeconds(cpus[0])` and `beamPosition()` as `(240 + t / lineSeconds) mod 264`. The oracle's `--io maincpu:10fee4-10fee5:w --io-frames 195-200` shows the double fire. Only mslug combines the hold, a precise driver timer and a `time_until_pos` re-arm.

Also from #254: a baseline directory takes one dist build, so record every target you will compare in one `record` run. Related: [[mame-baseline-204]], [[device-clock-vs-beam]], [[frame-render-point]].
