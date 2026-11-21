---
name: friskyt-284
description: "#284/PR #285: friskyt RAM+pixel exact vs MAME. pulse_input_line synchronized; adjust_icount on an idle CPU is lost; space.unmap() is 0 unless unmap_value_high"
metadata:
  node_type: memory
  type: project
  originSessionId: 85418218-e0e5-4c3a-948d-6239d20a0069
  modified: 2026-11-21T06:53:38.491Z
---

2026-11-21, PR #285 (branch `284-247-frisky-toms-shared-ram`), merged as `7367066f`; CI green first time. Frisky Tom's RAM is identical to MAME on all 1800 frames with and without input, and its pixels are exact at 300–1800.

- **pulse_input_line(line, zero)** is ASSERT+CLEAR through set_state_synced, so it lands at round end. Applied in place, the MCU (run after the Z80 in the round) restarted from its own round start, 609 µs early.
- **adjust_icount on a non-executing CPU is lost in MAME** (the scheduler overwrites *m_icountptr). Ours deferred it via `cpuStalls`; seicross's wait-state taps on the reset-vector read made the MCU 4 cycles late. Now dropped unless it's spin_until_time.
- **space.unmap()** returns 0 unless the program map has unmap_value_high (watchdog reset_r).
- The `diverge` I/O tap on `address_data_w` (0x00-0x01) logs only port 1, giving a false maincpu divergence. Tap the MCU's data accesses (`--io mcu:0-ffff:rw`) and diff times instead.
- Debugging trick: run our side alone with `node tools/compare/against.ts --child <work>/plan.json` so dist-side `console.error` logging is visible (`against` swallows the child's stderr).
- NSC8105/6802 cycles are clock/4: 4 cycles = 16 clocks in tap times.
- coleco:dkong and kungfum failed "sound writes diverged after a save-state rewind load" only under the parallel matrix; both passed alone ([[acceptance-run-flake]]). CI was green.

Related: [[mame-round-rules-275]], [[bublbobl-278]].
