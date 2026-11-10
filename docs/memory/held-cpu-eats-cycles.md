---
name: held-cpu-eats-cycles
description: A CPU held in RESET/HALT must still book its slices (MAME eatcycles) or every stream write it makes later is stamped behind the mixer
metadata:
  node_type: memory
  type: project
  originSessionId: d893caa6-f058-4f34-8de4-3331b7d7f4bf
  modified: 2026-11-10T21:11:53.526Z
---

#242 (2026-11-11): rampage "buzzy, missing stuff" was not a sound chip. The
Sounds Good 68000 is held in RESET for 0.9 s at boot; our frame runner skipped
a disabled processor without adding the slice to `cpuCycles`, so its
`cpuSeconds` (= machineSeconds while it runs) stayed 0.9 s behind the mixer
forever. Every DAC write's `stream.update` → `render(now())` was a no-op and
the DAC only landed when the mixer rendered at machine time: writes collapsed,
2–12 kHz +10–18 dB, contract bands 30 dB off. Fix: `eat` hook on
GeneratedFrameProcessor, board books the cycles (MAME
`suspend(SUSPEND_REASON_RESET, true)` → timeslice still adds to
`m_totalcycles`/`m_localtime`). Bands → ±1 dB.

Also: RESET/HALT driven by another CPU go through `synchronize()` (MAME
`device_input::set_state_synced`), so the target catches up first (rampage's
68000 makes 4 PIA writes in the 12 us before the Z80 holds it).

**How to apply:** when a board's stream sound is wrong only after a CPU was held
or reset, log `time()` vs `stream.rendered/48000` in the speaker's
`stream.update` binding — a constant offset equal to the hold time is this.
Diagnosis tricks: MAME `-wavwrite` is pre-effects (no 20 Hz speaker high-pass,
ours.pcm has it) — apply it to the reference before blaming levels
(scratchpad persec.py). Related: [[sound-242]], [[mame-scheduler-synchronize]].
