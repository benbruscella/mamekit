---
name: ram-and-pictures-300
description: "#300 (branch 300-ram-and-pictures): oracle address shift, MC6845 reset_origin re-base, soft reset keeps time, held CPUs run last; what each fixed"
metadata:
  node_type: memory
  type: project
  originSessionId: 0bf6619a-ff43-4160-8467-7062c36df23e
  modified: 2026-11-26T01:01:00.220Z
---

#300 (started 2026-11-26) works the 27 scenarios still off MAME, family by family. Re-measured on main `c65e14e9` with fresh gen:all: identical to the issue's tables (`.mamekit/compare/against-c65e14e90746/`).

Findings, each generic:

1. **Oracle address shift.** MAME's Lua accessors and taps take the space's own units: TMS34010 is bit-addressed (`space.shift` 3), TMS32010 word-addressed (-1). `oracle.lua` now converts (`to_address`/`to_byte`, RAM via `read_range(first<<s, ((last+1)<<s)-1, 8, 1<<s)`, since read_range sizes its buffer `(last-first+1)/step`). `ours.ts` converts a core space's addresses back to bytes. mk/nbajam's "frame-1 RAM difference" was the tool: both are RAM-identical over 2,400 frames. Changing oracle.lua code invalidates the whole MAME cache.
2. **MC6845 `reset_origin`.** `has_screen` resolves to 1 (unconfigured video interface = first screen). `GeneratedFrameRunner.resetOrigin` moves `frameBase` to the CRTC's grid; line labels keep their numbers, only times move. The loop jumps only when the beam's new line is past the line it is on (rounds spanning lines leave the loop ahead of machine time). Compute on the frame `now` falls in: the device clock leads the loop by up to a round, so a wrap lands in the next frame. The board shifts `timedHardwareDelivered` by how far its current line's start moved. Qix none: RAM-identical; wardner first diff 1 → 114.
3. **Soft reset keeps time.** `board.reset()` = MAME soft_reset: devices/CPUs reset, runner `softReset()` keeps clock and beam, re-arms periodic events a period from now, frame count restarts (the harness counts frames from it). Restarting the clock had the CRTC's self-re-arming timer on the old epoch. Qix contract: RAM-identical on 900 frames (reset at 150).
4. **Held CPUs run last.** CPU processors report `suspended: 'eating'` when held (RESET/HALT); `roundOrder` puts them after active ones, as `rebuild_execute_list`. Wardner's halted Z80 had eaten to the round's end before its DSP's synchronized release; first diff 114 → 410.

Tooling notes: `against --runtime <commit>` overlays use the current tree's `unresolved-calls.ts`, so removing an entry breaks main's runtime there (temporarily restore it). `diverge` can't time-compare across a reset when our clock restarted (fixed by 3).

Related: [[mame-scheduler-synchronize]], [[held-cpu-eats-cycles]], [[gauntlet-296]], [[mamekit-compare-commands]].
