---
name: ram-and-pictures-303
description: "#303 (branch 303-ram-and-pictures-still-off-mame): diverge --list/--around, hosted-processor taps, and the scheduler rules that closed wboy, matmania, elevator to 892"
metadata:
  node_type: memory
  type: project
  originSessionId: a2db6e3d-fa2b-4b33-a9d7-486bb53745c7
  modified: 2026-11-28T03:09:27.222Z
---

#303 continues [[ram-and-pictures-300]]. Commits "303 1".."303 4" are the user's; work after 303 4 (2026-11-27) is soft reset as synchronize, periodic re-arm on soft reset, and hosted taps.

**Tooling (use these first):**
- `mamekit diverge <t> --frames a-b --io cpu:lo-hi:rw --list all|<cpu> --around N` pairs every access with both times.
- The access logs stay in `.cache/compare/diverge/<t>/`.
- A processor a device hosts is tapped by its device path (`bmcu:mcu`, not the finder's `mcu:mcu`).
- Device-space taps mask addresses to the space's width; the 68705 reads its vector at 0xfffa, which decodes as 0x7fa.
- The `cycles` column is blank for hosted processors, because diverge's clocks come from the board's CPUs only.

**Rules learned, each MAME's:**
- `synchronize()` outside a slice drains only the work due by now (wboy).
- Posted work bounds a round on its exact attotime (wboy).
- NMI edges are dropped only in RESET, not HALT/WAIT (wboy contract; ours lowers Z80 WAIT as `halt`).
- `vblank()` = time < end set when the begin fired (matmania).
- `schedule_soft_reset` is a zero-delay timer, plus a periodic re-arm from the reset (elevator's watchdog at frame 131).
- Offset trap: `against` chose `-1` for elevator from a still picture. Pin `--offset 0` when RAM and pictures disagree.

**Pictures (2026-11-27, later):**
- qix and wardner were already RAM- and pixel-exact after the scheduler fixes.
- simpsons: RAM matched, pictures did not. Two causes:
  - `konami_sortlayers<3>` (konami_helper.h, `if constexpr` recursion with default template arguments `A = N - 2`) never compiled, so layers drew in tilemap order and the fixed text layer vanished.
  - Our zoom drawing used exact division; MAME's drawgfxzoom_core steps a truncated 16.16 `dx` and mirrors the steps under flip.
- Still open on simpsons: during the cloud intro (frames 621-949), MAME's sprites are one frame newer than ours. MAME's frame N shows zoom written in computed frame N at lines 23-47 (computed line 0 = vblank start). Ours shows frame N-1's: we DMA at line 0, then draw at line 40.
  - Verified equal on both sides: CPU writes, DMA enable, view selects, IRQ/FIRQ vector fetch times (so MAME's DMA timer also fires at line 0), and the notifier time (frame N at N*F + 40 lines).
  - MAME's Lua has no `screen:vpos()`; the first probe errored inside the notifier and hung MAME. Wrap probes in pcall.
  - `device.items` came back empty for :k053246, so MAME's sprite RAM wasn't readable from Lua.

**Pac-Man / Ms. Pac-Man (F3) closed:** `installInterruptVectorWriters` (from the first compiler commit) cleared the Z80's IRQ line on every `OUT (0)` vector write. MAME's pacman_interrupt_vector_w only stores the vector. Pac-Man's self-test at 0x3193 does EI with IRQ0 held since frame 1, and MAME takes it there. Removed (emit-machine inference, BoardIr field, runtime installer); both RAM-exact to 1800 with no input.
- With contract input, pacman/mspacman (frame 330) and crush (930) differ only at 0x5060-506f: a `writeonly()` share, whose bus traffic is identical. It's a RAM-dump artifact of reading a write-only range through MAME's space; fix the dump, not the board.
- Method that found it: `diverge --io maincpu:3190-31ff:r` taps opcode fetches, so the instruction after EI is visible. A dist-only stack trace at `execute_set_input(0, 0)` then named the runtime writer.
- `ast.ts` doesn't set templateParameters for `template <..., typename U>` on its own line above `inline void`; kg/build's isSourceTemplate reads the header itself.

**R-Type (F4):** `machine().scheduler().add_quantum` was unresolved.
- m72_state::synch_callback asks for 1.5 us rounds (MASTER_CLOCK/4/12, 12 V30 cycles) for 25 s from machine_reset.
- MAME's REP loop stops at each round end and restarts through cont_rep, paying CLK(2) each time. That is why MAME's `REP STOSB` alternates 6 and 4 cycles a byte.
- Now modelled as `GeneratedFrameRunner.addQuantum`: a list keyed by requested quantum, `actual = max(requested, interleave)`, closed like the perfect window. A zero quantum is perfect_quantum.
- Result: the boot offset of 2 frames is gone; RAM went from 14,479 bytes at frame 90 to 14 at 92; 31/0/38/7 bytes at 300/600/900/1200.
- Still open: one extra REP restart per scanline in MAME, about 2 cycles after each line start, at the per-line scanline_interrupt timer. Ours ends rounds at line boundaries too, so suspect the short round right after the timer.

**Q*bert lead (frame 369, 1 byte at 1fe4):**
- From frame 357 our 8088 runs 2 cycles behind MAME.
- First seen inside a `REP MOVSW` (0xaf91, copying 0x0ed0 to sprite RAM at 0x3000) 3 us after the VBLANK NMI. Both sides break the REP at a round end and refetch `F3 A5`, but ours breaks one word earlier, so a round boundary differs.
- By frame 368 the lag decides whether MAME's `JZ` at 0xb371 runs before the NMI (VBLANK at 368*F = 5991628.8 us).
- Analysis tip: both sides stamp several accesses with one time in different orders; sort by (time, kind, address) before pairing.

**Final gen:all + matrix (2026-11-28, uncommitted work on top of "303 5"):**
- audit:generated and audit:facts pass. audit:semantics moved only crush, elevator (+1 handler), junglek (+1 handler), mspacman, pacman and simpsons (+3 handlers); not re-recorded.
- Matrix 89/110. c64p:tape (stack overflow) and friskyt (rewind) were flakes: each passed twice on retry. The other 19 are golden moves only; no golden was re-recorded on the branch since main.
- wboy: the rewind check fails about 4 runs in 7. Traced 2026-11-28 to the host fault ([[host-machine-faults]]): a pure SN76489A update gives one-sample blips from identical state; not a branch regression.
  - The *original* run's PCM after `board.save()` varies across processes: expected hash 415478e4, 997336a4, 92c2d1f9; the first differing write was 8343 one time and 45917 another. The replay is always 7007523e.
  - Video and state hashes stay equal; only stream.pcm sample values differ.

**Jungle King closed (2026-11-28, uncommitted on top of "303 9"):**
- `d403` is taitosj's `m_collision_reg[3]` (sprite/layer), set inside screen_update, so no CPU write is tapped for it.
- Cause: an *indexed* `&=` (`sprite_areas[which] &= cliprect`, a `rectangle *` parameter) took device-codegen's pointerSafeIndex path, which wrote a bare `&` and skipped `pointerAssignment`'s rectangle rule. Every sprite area became 0, so no collision was ever seen.
- Fix: `elementAndType` in device-codegen.ts (element type if known, else `int` when the right side is an integer, else `runtime.andAssign`). SNES `m_cpu_regs[18] &= ~0x40` stays a plain AND; no device file changed.
- junglek RAM and pictures identical to MAME over 600 frames (was frame 364). elevator unchanged (893). Both contracts pass with goldens unchanged.

**Watch capture + arkanoid, carnival closed (2026-11-28, uncommitted):**
- `mamekit diverge --watch cpu[,cpu]` (against `--io-watch`) logs each named processor's STATE_GENPC with every tapped access, both sides (`tag=pc` after the time). MAME side is tools/compare/oracle-watch.lua, a wrapper that hooks io.open before dofile(oracle.lua), so oracle.lua's text (which keys EVERY cached MAME run) is untouched; watched runs get their own key. Watch the *other* processor: the executing one's PC is mid-instruction and the sides stamp it differently. Grouping MCU accesses by the main CPU's watched PC shows each MCU slice exactly (opcode fetches are tapped).
- arkanoid: MAME's 68705 slice ends at its own `set_input_line` (tcr_w's `m_parent.set_input_line(M6805_INT_TIMER)`, latch_control's IRQ clear). Ours never synchronized a hosted processor's own lines: (1) `synchronizesLineFrom` counted only `runningCpu`, not `runningRoundDevice`; (2) a hosted processor's own `set_input_line` binding was never rebound to `deviceInputLine` (bound now in the hostedProcessors enumeration, both branches); (3) `self.set_input_line` (m_parent's) now goes through that binding. RAM identical 1800 frames (was 61), pixels 0. bublbobl/xevious stay exact.
- carnival: `m_screen->hblank()` was unbound (fell to memberCall → never blank), and `beamHpos` returned pixel 0 in one-line rounds (runningBeam declines them; generated cores call timing() only at slice ends). Now `beamHblank` is bound for drivers and devices, and hpos asks `runningBeam(cycles, true)`. vpos left alone. RAM identical 1800 (was 159), pixels 0. Only carnival reads hblank; hpos readers galaxian/scramble/jumpbug/frogger unchanged (compare --against HEAD: same).
- elevator 893 under the watch: perfect-window steps put our MCU one instruction ahead at a poll (MAME db, ours dd). All three processors' local times sit exactly on MAME's truncated cycle grids (mod 0), and the window quantum is MAME's (Z80 min_cycles 1 → 333333333333). Remaining suspect: where the main Z80's partial-instruction slices end (our targets get pulled to its local after 1-2 cycle runs); needs MAME's per-slice cycles, which Lua can't read.

**Open:**
- ddragon frame 1058: the main IRQ lands one 6309 instruction early.
- elevator frame 893: the MCU sits out by 1.7 fs inside the perfect-quantum window.
- elevator frame 892 cause, seen from the main side: it polls the security MCU's status `8801` (taitosjsec ZLSTATUS, under perfect_quantum(10us)) and ours reports ready one poll (6 us) before MAME's.
- arkanoid frame 10 (RAM c7fb at 61): `d00c` bit 6 (the inverted host flag) clears 22 us (4 polls) early in ours, every command. The MCU's accesses are identical in time on both sides (PC2 rising at 166758.67 us), so only the round boundary differs: ours 166814.67 = main CPU's d018 write (set_input_line synchronize cut at 166648) + 1/6000 s; MAME's fits 160000 (sound_manager 50 Hz) + 41 quanta = 166833.33, i.e. MAME behaves as if that write did not cut the round. Skipping our cross-processor line synchronize (temporary dist switch) made it worse (frame 13), so the cut matters somewhere. Unresolved; reading diexec/schedule.cpp gives MAME the cut too.
- These need MAME's scheduler state, which the oracle doesn't record. [[mame-scheduler-synchronize]]
