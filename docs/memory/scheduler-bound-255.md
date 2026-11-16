---
name: scheduler-bound-255
description: "#255: 250 us fallback deleted; the seven gaps it hid (cross-CPU timers, synchronize order, mixer, abort clock); how each was found; open leftovers"
metadata:
  type: project
---

#255 (2026-11-15/16, branch `255-48-bound-scheduler`, user commit a6176a05 "Scheduler 1" plus later work). `MAX_QUANTUM_SECONDS` is gone: lines are handed over up to the next timer line (frame events, scanline TIMER cadence, vbstart, vbend, last line), and a round ends at the soonest timer, capped by `set_maximum_quantum` or 1/60 s.

**What the bound hid** (all fixed generally; with 250 us rounds each error was under 250 us, with 15 ms rounds it broke boards):
1. A device timer due at the presentation instant gave a zero-attosecond bound: the round never ended (gberet).
2. Driver-armed `TIMER` devices (`configure_generic`) fired at the next line boundary. Now they end the round and fire at round end (`roundTimerMembers`).
3. `DeviceCpu.abortTimeslice` zeroed `m_icount` but left `target`, so `elapsedCycles()` read the slice's end for the rest of the instruction.
4. A device timer armed by a CPU other than `cpus[0]` counts from the device clock, which follows `cpus[0]`. Fix: `timerArmLead`, taken inside the round (base + offset + delivered - arming CPU's time). The absolute-clock `armLead` rejected in #222 drifted; this one cannot.
5. A cross-CPU timer shorter than the lead goes negative. It must fire when the round base reaches it, not at once: `timerHeadroomSeconds` gates the round-start firing loop. Clamping to zero or replaying the backlog both broke TMNT (title sample cut off, -3 dB).
6. `synchronize()` work ran when any processor ended its slice. Now each item has its posting time, drains only once the round reaches it, and bounds the round. Leftovers drain at the end of each span, or save states diverge (bankp, wardner).
7. The stream mixer rendered up to `cpus[0]`'s time after its slice. Now bounded by `settledTime` (min over CPUs) and triggered after the last CPU too (junofrst DAC was 20 dB off).

**Marble Madness** was broken on main by a CPU codegen bug, not scheduling: a `u32 &` accessor's setter (`DX() |= x`) stored JS's signed `|`; SWAP then shifted it arithmetically. Fixed in `device-compiler.ts` (setter casts to the reference's type). Related: [[unsigned-shift-lowering]], [[marble-software-watchdog]].

**How to apply:**
- Find these with `mame-oracle.ts --io <cpu>:<range>:rw --io-frames a-b --keep`, then diff `mame-io.txt` against `ours-io.txt` per CPU. The first mismatch names the bug. Our side does not log ROM-region reads or 16-bit word writes; wrap `board.cpus.get(tag).bus` in `runGameAcceptance`'s `onBoard` instead.
- Per-chip level: `MAMEKIT_OBSERVE_STREAMS=1` gives `<tag>.stream` writes; RMS per 300 frames showed which TMNT chip went quiet.
- Fast loop: `ts.transpileModule` one runtime file into `dist/runtime/core` (matches tsc output); a full `--build-app` is 12 minutes. Dist-only `process.env` switches bisect several fixes without touching src.
- `pgrep -f "x"` inside a wait loop matches the loop's own shell. Use `ps -eo args | grep "^node ..."`.
- Compare "WORSE" is mostly noise (onsets moving 0.03). Read the numbers; #260 (`mkt` CLI) is the tooling follow-up.

**Open after #255:** mk contract picture at frame 2100; friskyt contract picture after 1200 (shared RAM, rounds now 833 us as MAME's); gng RAM first differs 89 (was 329); galaxian 1 byte at frame 16; bublbobl 22 bytes at frame 4. MAME's 50 Hz `sound_manager` timer and stream sync timers still do not cut rounds.

Related: [[hosted-mcus-in-round-222]], [[attotime-220]], [[mame-scheduler-synchronize]], [[latch-burst-interleave]].
