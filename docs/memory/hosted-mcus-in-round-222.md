---
name: hosted-mcus-in-round-222
description: "#222: hosted MCUs as round processors + MAME timer-ended rounds; six faults found by 06xx bus-tap diffs vs MAME; the recipe"
metadata:
  node_type: memory
  type: project
  originSessionId: ee8ee208-5177-4bb5-a771-109df2993232
  modified: 2026-10-30T19:06:15.894Z
---

#222 (branch 222-schedule-hosted-mcus-and-dsps-in-mames-round, 2026-10-30/31). The user chose "every board": MAME's round rules on all boards, not only the six hosted-MCU boards.

**What it took** (each was needed; galaga/digdug 06xx traffic is now byte-exact vs MAME for 1300/400 frames):
1. Hosted processors become round processors.
   - A reset-held MCU must **eat** its slice in the round runner. Its `suspended()` 'eating' only reorders the round; the board-modelled reset line is invisible to the IrDevice. Before the fix, Xevious's 51xx ran while held in reset.
2. Every device defers `synchronize()` (deferSynchronize). The work runs **at its posting time** (withGeneratedTimerExpiry). The 06xx re-arms its NMI timer from `machine().time()`.
3. Rounds end at the soonest device timer (`nextTimerLine`).
   - Device time is held short of the timer during the round.
   - The overrun is **dropped**, not released at the round's end, since a whole-cycle pull can end the round short of the timer.
   - At the round's end, devices are topped up to the round's end line. Mario's Z80 DMA starved without this.
4. `deviceClockFollowsProcessors` on timer-round boards. The multi-line span pre-pay put the device clock ahead.
5. A timer armed mid-round that becomes the soonest aborts the running slice (`setGeneratedTimerArmed`), as `emu_timer::adjust` does.
6. `cpuSeconds` uses MAME's truncated `HZ_TO_ATTOSECONDS` per cycle. Xevious's Z80 writes land exactly on 06xx clock edges, and exact time made the 50xx miss a command (reboot loop at frame 737). It changes every C64 golden: proven by an A/B build. It must cover **every** cycle<->time conversion (`secondsPerCycleOf`): device-clock deltas, `cycles_to_attotime`, and `attotime_to_cycles` = floor(s / spc + ε). Applied only to `cpuSeconds`, the GB PPU's attotime_to_cycles came a cycle short and Tetris left MAME at frame 341.
7. `time_until_pos` needs MAME's half-pixel "already past" rule. Without it, mslug's auto-animation timer re-armed for ~0 s 65536 times (intermittent on main too).

Older gaps exposed:
- NMI is a level line: ASSERT pulsed every time, and CLEAR was ignored.
- `cycles_to_attotime` was unbound and answered 0. The Simpsons' 4-cycle NMI block never blocked, and its sound Z80 HALTed forever.

**Recipe that found them:**
- **MAME side:** a Lua read/write tap on the main CPU's 0x7000-0x7100. Add `manager.machine.devices[":51xx:mcu"].state["PC"].value` at each access: the MCU's PC at host accesses is the decisive view.
- **Our side:** wrap `cpus.get('maincpu').bus.read/write`, then diff the sequences.
- **Bisect:** temporary EXP_* env switches, one per rule, in the same build.
- **Debugger:** the MAME `trace` action argument is 4th (`file,cpu,noloop,{action}`), and `totalcycles` is not usable for the MB88.
- **Pitfall:** log order is execution order, not emulated time. Round mode runs the MCU after the host, so don't read causality from log order.

**Rejected:**
- `armLead`: arming a timer against the arming processor's local time, minus the device clock. The device clock drops overruns, so the two drift apart. It cost smb3u 89->23 fps and mk 43->12, and overflowed sf2ce's stack.
- Budget 0 (device time moves only at round ends) broke galaga and xevious traffic.

Polepos 52xx was FIXED in #222 (PR #224) after all. The user wanted a green PR, so it stayed in. The fix:
- A round device arms its timers from the round's base (`timerArmBase` = device time delivered this round).
- An overdue timer (negative remaining) fires at the next round's start (`execute_timers`), and periodic ones catch up.
- The MB88's Lua `PC` state is the 6-bit m_PC only: MAME's '026' is 0x066.

Round overhead: walk only timer-owning devices in nextTimerLine (`timedDevices` + card devices). Lagrange went 36 -> 51 fps; it was under its CI floor.

The batch compare (`--jobs 4`) can produce bad MAME-side recordings (xevious/wardner 'MAME read different input'). Rerun them directly with mame-oracle before believing them.

Rampage stays worse on pixels at 600 with timer rounds (notimer = baseline). Its RAM first differs at frame 2 either way, so it was judged drift. Related: [[mame-scheduler-synchronize]], [[latch-burst-interleave]], [[scanline-interleave-limit]].
