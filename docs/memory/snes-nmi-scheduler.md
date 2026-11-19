---
name: snes-nmi-scheduler
description: "#174 scheduler item - SMW frame-85 NMI divergence was five general gaps (configure relabel, timer-expiry beam, boundary firing, cycles_to_attotime precise, pc()/chained state_add)"
metadata:
  node_type: memory
  type: project
  originSessionId: 9e9e69c6-e37f-4806-b877-66271b86f0e4
  modified: 2026-11-18T01:07:01.703Z
---

SMW turns overscan on (SETINI=4, frame 67) and enables NMI first at frame 85, so frame 85 was the first frame that tested VBLANK placement. Fixes (2026-11-18, uncommitted on branch 174):

1. `screen_device::configure` keeps m_vblank_start_time: vpos/hpos RELABEL at once (new visarea bottom+1 = VBLANK line, new width = hpos unit). Board `configureRaster`/`rasterLabel`/`rasterPosition`; raster saved as `GeneratedFrameRunner.screenRaster` (height 0 = set_raw's).
2. Inside a driver timer callback the beam stands at the expiry (`atTimerExpiry` -> `expiryBeam`, computed on the FRAME clock: originLine + (at - frameStartSeconds)/line). machineSeconds() can be a round ahead of the beam; a lag computed from it broke everything.
3. Line-boundary driver timers are due by `lineBoundarySeconds()` (frame clock), not machineSeconds - the CPU can stand an instruction short, and an exactly-on-boundary timer waited a whole line.
4. kg/build.ts preciseTimers: `cycles_to_attotime` counts like clocks_to_attotime (SNES NMI = vblank + 12 cycles).
5. `m_cpu.pc()/pcbase()` bound to state_int(STATE_GENPC/-2); attachStateEntries walks call chains (walkExpressions skips a call's callee, so every `state_add(...).noshow()` was missed in EVERY core). SNES open bus = read_byte(pc()-1).

6. Precise driver timers end rounds (`timerEndsRound`: round timers + precise driver timers; plain driver timers keep line boundaries). A WAI burned its whole perfect round past the NMI expiry (up to 22 cycles late). Making ALL driver timers end rounds was worse (frame 86) - don't.
7. kg/build.ts gameSubgraph virtual dispatch: a base class with no machine config (snes_state) got no classRank and its handlers were never replaced by the selected class's override -> snes_console_state::io_read (controller polling) never ran; NO SNES button worked. Base rank is now Infinity.

Result: SMW work RAM identical to MAME at all 1800 frames, pixels exact, inputs mirrored. Diverge's "8 cycles late" on the NMI vector is a stamp artifact: MAME stamps machine.time (= expiry) inside a timer callback, ours the CPU's local time.

Tried and reverted: letting ALL driver timers (not only precise ones) end perfect rounds (RAM first diff moved back to frame 86, stack bytes).

Was open before 6/7: frame 146 +24 cycle drift (fixed by 6), frame 300 Start not seen (fixed by 7). See [[snes-174-decisions]], [[sdsp-silence-gaps]].
