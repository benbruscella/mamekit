---
name: gauntlet-296
description: "#296: gauntlet + marble RAM-exact vs MAME. perfect_quantum window outlasts its expiry until a timer fires; timers due at base fire through the presentation hold; an armed timer aborts the slice only if it is the head (pending synchronize counts)"
metadata:
  type: project
---

#296 (2026-11-24, branch `296-gauntlets-ram`). Gauntlet's RAM is identical to MAME on 1,800 frames with contract input and 1,200 without; Marble Madness went identical too (2,400 frames, was 384). Three generic runtime fixes:

1. **A `perfect_quantum(duration)` window outlasts its expiry.** `timeslice()` pops an expired quantum only at entry, i.e. after a timer fired. `GeneratedFrameRunner` keeps `windowOpen` + absolute `windowExpire` (request `time()` + duration, passed by the board from `exactMachineTime()`) and `timerFired`; `closeExpiredWindow` runs at each round's head. `fineLines` is gone (save-state keys are now `windowOpen`, `windowExpire`).
2. **Timers due at the round's base fire through the presentation hold** (`firingTimersDueAtBase` in generated-board.ts). cpus[0] carries device time to the frame's end, where `advanceTimedHardware` holds it (`awaitingPresent`); a timer the sound CPU armed 25 µs ahead then fired 0.9 ms late (TMS5220 READY). This was the epic's old "TMS5220C busy where MAME's is ready".
3. **`armedTimer` aborts the slice only for a new head of the timer list.** Pending `scheduledWork` (a synchronize posted by an earlier processor in the round) at or before the new timer means no abort; the budget is still lowered.

**How it was found:** narrow `against --io` taps on both CPUs with `--keep`, then dist-only `console.error` in generated-frame.js / generated-board.js / the device's .js (back the files up; `mamekit build` restores core files, the device .js needs the backup), run with `node tools/compare/against.ts --child <work>/plan.json`. A `ROUND base -> target, locals` log per round in a time window showed each cause directly.

**Tooling gap (epic 8.4):** our side does not tap maincpu writes to `803170` or word reads of `80300e` (mirrored handlers); MAME's side does.

Related: [[gng-292]], [[mame-round-rules-275]], [[bublbobl-278]], [[mame-scheduler-synchronize]].
