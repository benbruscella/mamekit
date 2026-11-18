---
name: venture-scheduler-time-271
description: "#271/PR #273: frame events must run at the scheduler's base time; device timer reads need the reader's lead; PIT8253 silent → #272"
metadata:
  node_type: memory
  type: project
  originSessionId: f68c6c34-fc24-4e14-a5fe-bc99237dbfa7
  modified: 2026-11-18T03:00:21.276Z
---

2026-11-18, PR #273 (branch 271-venture-ram-drift, worktree ../mamekit-271). Venture no-input RAM exact over 6,200 frames.

- **Frame events / presentation run at scheduler time** (`atSchedulerTime`, `GeneratedFrameRunner.baseBeam()`). The first CPU stops on whole cycles up to one short of VBLANK. A driver timer armed in `screen_update` from `machine().time()` + `time_until_pos` was 1.37 µs early, so Exidy's collision IRQ came an instruction early. Symptom: a rare one-instruction IRQ difference when every other read matches to 1e-10 s.
- **`IrTimer.remaining()/elapsed()` add `timerArmLead`**, as `adjust()` does. A timer read by a non-clock CPU (venture's sound 6502 → 6532) was up to a quantum short and lumpy.
- **PIT8253 never toggles** (#272): attotime `m_seconds`/`m_attoseconds` read as 0. Lowering them is not enough, because float seconds at ~51 s can't do the counter's integer-attosecond division (the timer runs away at 65536 firings). The user chose exact device attotime as a follow-up, not a tolerance.
- The RAM dump's `maincpu:5101` (IN0) differs at input edges: a sampling artifact, not RAM.
- congo/c64p:ultimax/mpatrol/mario/ddragon failures in the sweep were all flakes ([[acceptance-run-flake]]). An A/B "pass" is not attribution, so rerun the baseline more than once.

Related: [[device-clock-lead-254]], [[mame-scheduler-synchronize]], [[venture-silent-riot-irq]], [[single-target-gen-scope]].
