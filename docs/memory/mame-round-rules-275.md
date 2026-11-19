---
name: mame-round-rules-275
description: "#275: four scheduler gaps found with a VERBOSE schedule.cpp MAME build; the diagnostic-build recipe; Venture RAM-exact with input"
metadata:
  type: project
---

#275 (2026-11-19): Venture with contract input is RAM-exact vs MAME over 6,200 frames (only `maincpu:5101`, the IN0 port, differs). Four gaps, each confirmed in MAME's own round log:

1. **sound_manager's 50 Hz update timer** ends MAME rounds on every machine (`STREAMS_UPDATE_FREQUENCY`, read from sound.h into `execution.streamsUpdateFrequency`; registered as a round timer in generated-board.ts when `timerRounds`).
2. **Boundary lines end a round only at their start.** Screen timers fire at `time_until_pos(line)`, i.e. a line's start. The frame runner also ended one at the line's END (spurious); `vtotal - 1` in the set became `0`, and every frame flushes at its end.
3. **Every `set_input_line` synchronizes**, the processor's own line included (`set_state_synced`). Exidy's `exidy_interrupt_r` clears the main CPU's own IRQ on each read.
4. **A synchronized round ends where the processor stopped** (`target = max(m_localtime, m_basetime)`), not at the access. #213's `position`/`synchronizedAt` (6502 "stops at the access") was wrong vs MAME's log: base = access + 2 sound cycles = where our core stops. Removed.

**Diagnostic MAME recipe (user-approved for #275):** `cp -Rc` 3rdparty scripts src makefile dist.mak bgfx plugins language regtests tests benchmarks COPYING README.md from MAME_SRC into the scratchpad (never edit MAME_SRC); in src/emu/schedule.cpp set VERBOSE 1, PRECISION 12, and make LOG fprintf to a scratch file gated on a `m_basetime.seconds()` window (logerror needs -log, which `against` doesn't pass); `make SUBTARGET=venturediag SOURCES=src/mame/exidy/exidy.cpp NOWERROR=1 -j8` via a wrapper .sh (the worktree sandbox refuses commands whose paths contain "Github"/"hash"); run with `mamekit against <t> --mame <bin> --no-mame-cache`. Full build ~10 min, incremental ~1 min. The log names every timer callback and each CPU's ran/local time per round.

**Gotcha:** `npm run mamekit -- build` during a running `compare` rewrites dist and contaminates it ([[dist-rebuild-breaks-sweeps]]). See [[exact-attotime-272]], [[venture-scheduler-time-271]], [[mame-scheduler-synchronize]].
