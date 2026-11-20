---
name: bublbobl-278
description: "#278: bublbobl RAM-exact vs MAME (1500 frames). Stream update through the write's sample + device timers on exact attotime (truncated from_ticks, callback credit, exact expiry/anchor, tight tolerance)"
metadata:
  node_type: memory
  type: project
  originSessionId: 285a297e-afef-4a25-884b-145975fed96e
  modified: 2026-11-20T07:51:38.643Z
---

#278 (2026-11-20, branch `278-247-bubble-bobbles-ram`). User approved fixing the device-timer drift in this issue.

**1. stream.update (src/hardware/speaker/runtime.ts `renderAhead`):** renders through `floor(now*rate)` inclusive, like MAME's `sound_stream::update()`. ymfm timer B reads `m_total_clocks & 15`. A native-rate chip renders ahead into `stream.lead` (plain arrays, saved); nothing renders at time zero (rendering then hung Asteroids' DISCRETE).

**2. Device timers vs MAME's attotime grid.** The symptom was a CPU left one cycle short of a timer: the round target 1-20 ps below the cycle boundary, growing ~4e6 as/s. Four fixes:
- `from_ticks`/`from_hz`/`clocks_to_attotime` truncate per tick (`attotimeSecondsFromTicks`/`FromHz` in src/ir/exact-attotime.ts), with an `EXACT_DURATIONS` side channel (seconds → exact attos).
- A callback re-arm is credited the backlog of either sign (`timerCallbackDepth`); before, it fell into the arming-CPU lead branch.
- `IrTimer.exactExpiry` for every timer: from `timerArmExact` (board `exactMachineTime()`: running CPU's `runningLocalExact`, base between slices, synchronize work's posting time via `withGeneratedTimerExpiry(at, run, exact)`) or the firing timer's exact expiry. Periodic re-arms add `exactPeriod`. The board's `nextTimerSeconds` bounds the round by the soonest timer's exact expiry and calls `anchorTo` on it, **only when |device offset| ≤ 1e-12 s**.
- `EXACT_TIMER_TOLERANCE_SECONDS` (1e-16 s) for exact timers, in tick and the round-start loop.

**Pitfalls hit:**
- `setGeneratedTimerArmExact` is module state. It must be installed at the start of the board constructor, or a `device_start` reads the previous board's runner.
- The presentation hold puts the device clock 1e-9 s (PRESENT_MARGIN) short of the base. Gating at 1e-9 let that through and froze the device clock (beam-timer overrun spec).
- No exact time before `schedulerRunning`.
- Running two `against` jobs at once gave native-crash retries ([[host-machine-faults]]); alone they're clean.

Results: bublbobl RAM identical 1500/1500 (none + contract), onsets 1.15/1.14 and 4.90/4.70. With the stream fix alone, 83 contracts moved audio only and ffight/ghouls/simpsons/tmnt/c64:tape moved state (ymfm-polling sound CPUs). Debugging used dist-only logging (back up dist files first, then `mamekit build`). Related: [[mame-round-rules-275]], [[exact-attotime-272]], [[attotime-220]], [[scheduler-bound-255]].
