---
name: line-event-phase
description: "#214 follow-up: frame events fired after their line ran (every VBLANK a line late); fixed dab01f13. Held back: MAME round rules + 8257 suspend_until_trigger"
metadata:
  node_type: memory
  type: project
  originSessionId: 1f617197-fae9-4f33-8801-f89e0f5dd4d8
  modified: 2026-10-29T10:09:01.085Z
---

On 2026-10-29 (PR #215, dab01f13), `GeneratedFrameRunner`'s `eventPhase` default went from 'after-processors' to 'before-processors'. A line's events now fire at the line's start, where MAME's timer expires. The old default dated from #30, and #189's vbstart origin made it a full line into every frame. dkong's NMI was 192 cycles late (MAME 202760, ours 202944). The fix had a big effect against a full 92-target MAME baseline: mrdo and popeye RAM-identical, congo exact everywhere, xevious 32611→596 px. 68 goldens were re-recorded.

**Evidence rule that worked:** for a board-wide timing change, judge each "worse" by its first divergence (frame and addresses, in `.oracle/compare/<t>.json` (was .cache/oracle/compare before #216)). If that is unchanged, the "worse" is drift. qbert's "regression" was a lost coincidence (65 µs late → 1.8 µs).

**Held back, documented in the issue #214 body:**
- MAME round rules: rounds bounded by `set_maximum_quantum`; the whole-cycle target rule `target = max(localtime, basetime)`; config-order rounds; bus masters (8257) in the round. The prototype put dkong's post-DMA Z80 resume on MAME's cycle but cost the dkong and defender contracts. The patch is in the scratchpad only.
- The 8257 fork (`compileI8257`, src/hardware/device/extract.ts) drops `suspend_until_trigger`, and `trigger`/`abort_timeslice` are unbound (silent 0). MAME resumes a triggered device at the next round start. That is #178 item 3.

Trace recipe: MAME `dbg:command('trace f,:maincpu,noloop,{tracelog "%d ",totalcycles}')`. Ours: wrap `cpu.step` and `bus.timing` from `onBoard`, and log `grand + inRun`. Collapse park rechecks (repeated PCs) before diffing.
Related: [[mame-baseline-204]], [[mame-scheduler-synchronize]], [[ask-before-mame-sweeps]], [[device-forks-203]].
