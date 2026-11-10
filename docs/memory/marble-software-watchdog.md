---
name: marble-software-watchdog
description: "#93: SOLVED as emulation (2026-09-15): watchdog hang came from the slapstic missing Musashi prefetch reads, after scheduler synchronize fixed the handshake; picture still grey (m_mob finder)"
metadata:
  type: project
---

2026-09-15. Marble Madness (atarisy1) diagnosis, past the black screen.

**0x2822e is a deliberate hang, not the idle loop.** It is
`addq.b #1,D0; bra $2822e`. MAME idles at `0x28df0`/`0x28df6` (SR 0x2004); ours
starts in that same loop at frame 300 and falls into `0x2822e` at frame 350.

**It is a software watchdog** in the vblank-driven main loop at `0x28800`:
`clr.w $880000` (hardware watchdog kick), then compare RAM `$4003f0` against a
saved copy at `$4003f2`; if unchanged for more than 20 passes (`cmpi.b #$14`),
`jsr $2822e`. `$4003f0` is bumped by foreground work (MAME write tap: 0x1a4fe
x462, 0x1a5c4 x160, 0x28dfe x91 in 400 frames). So the check means "the
foreground stopped getting CPU time between interrupts".

**Why it starves:** in ours, IRQ4 (vblank, `screen_vblank().set_inputline(..,
M68K_IRQ_4, ASSERT_LINE)`) is asserted 340 times by frame 340 but cleared only
94 times. The ack itself works -- `video_int_ack_w` at 0x8a0001 is reached by a
word write to 0x8a0000 and every one clears the line -- so the IRQ4 handler is
failing to finish a frame's work inside a frame. Separately, `m_scanline_timer`
and `m_int3off_timer` are **never armed** (only `m_yscroll_reset_timer` is), so
the int3 chain the handler depends on never runs. That is the lead to chase.

**Prerequisite:** the current dist build crashes earlier, on
`*m_yscroll received number 0` -- the device/driver member-namespace collision
([[device-handler-namespace]]). The results above were obtained by simulating
that fix in a scratch runtime copy (binding `state.m_mob` and the
`m_mob.set_*scroll/set_bank/bank` calls), which breaks Gauntlet if shipped.

**Tools that worked:** MAME `-debug -debugger none` + Lua
`manager.machine.debugger:command("dasm file,addr,len")` disassembles headlessly
(no unidasm in the binary distribution); `install_write_tap` on a RAM byte finds
who feeds a watchdog; a PC ring buffer wrapped around `cpu.step` finds the path
into a trap. Our m68000 `m_pc` at step start matches MAME's PC values.


## 2026-09-15 update — the real first divergence

**Two earlier leads were wrong, and are recorded so nobody chases them again:**
- "IRQ4 starves the foreground" — MAME also acks vblank once per frame from
  ~frame 244; our 94-by-340 is the same rate. Authentic.
- "The scanline timers are never armed" — Marble is `atarisy1_state`, whose
  `update_timers()` is **empty**; only Road Runner's `atarisy1r_state` arms
  them. Authentic.

**A real compiler bug found on the way: the M68010 was a relabelled 68000**
(`M68010: source => ({ ...compileMameM68000(source), type: 'M68010' })`).
Fixed by compiling the Musashi variant properly: decode column 2 (MAME's
`m68ki_instruction_state_table[2]`, selecting the `_71` handlers such as the
RTE that pops the format word), `init_cpu_m68010` cycle constants, a
format/vector word in the exception frame and `m_vbr` vector base, and
`m68ki_exception_cycle_table` column 2 (interrupt 46 cycles, not 44). The
68000 core stays byte-identical (verify by diffing against
dist/runtime/generated/devices/m68000.cpu.ir.json). **Gauntlet on the real
core: work RAM 0x800000-0x801fff and sprite RAM 0x902000-0x903fff are
byte-identical to MAME at frames 300, 600, 900.** Its golden moves because it
was recorded on the impostor core.

Build traps hit: `.cache/cpu` is not bypassed by a single-target `--no-cache`;
CPU cores only rebuild under a target-less `--build-runtime`, which emits .ts
only — dist has **no compiled cores at all** until `--build-app` runs. The
emitter refuses any diagnostic: BKPT's `(void)m_cpu_space->read_word(...)`
blocked the whole 68010 (fixed by stripping `(void)` in normalizeM68000Source).

**The first divergent instruction.** Aligned on the frame counter at
`0x400014`, Marble RAM is identical to MAME through frame 310. Instruction
traces (MAME: `debugger:command("trace f,:maincpu,noloop")`; ours: PC ring on
`cpu.step`) aligned on the IRQ4 entry `0x34a` agree for 207 instructions; then
MAME takes **IRQ6** (`0x36c`, the sound CPU's main latch reply) at `0x28b62`
and ours does not. The vblank handler writes the sound latch at instruction
161; MAME's reply lands at 207.
- Per-line interleave (shipped): ours lands at 220 — 13 late.
- Lockstep interleave (64 slices/line): 215; (256 or 1024): **196 — 11 early**.
So scheduling granularity is part of it but not all; there is an unmodelled
latency. The 6502's own work matches MAME exactly (NMI at `0x9566`, latch read
21 instructions later, 25.7 µs to the reply). Per-CPU timestamps from
`machineSeconds()` are NOT reliable for cross-CPU latency (the slice fraction
is per-processor); trust instruction ordering, not those stamps.

What MAME does that we don't: `generic_latch_8::write` -> `synchronize()`
aborts the writer's timeslice so the other CPU catches up to the write time
before the latch changes; `perfect_quantum(100us)` then interleaves at
instruction granularity. Ours drains synchronize work after the writer's whole
slice, and perfect_quantum only shrinks interleave to one scanline (~50 68010
instructions -- longer than the whole 46-instruction handshake).


## 2026-09-15 resolution

Both halves fixed; main RAM is 1 byte from MAME at frame 900.
1. Scheduler: synchronize abort + catch-up + perfect_quantum lockstep
   ([[mame-scheduler-synchronize]]). IRQ4->IRQ6 latency went 220 -> 205-208
   (MAME 205-208); latch events within 20 us of MAME through frame 345. The
   watchdog still tripped, so the handshake was not the cause of the hang.
2. The hang: slapstic bank state drifted because our 68010 skipped Musashi's
   prefetch reads ([[musashi-prefetch-slapstic]]). The "0x1abd4 binary search
   never terminates" loop was the visible symptom.

The `*m_yscroll received number 0` crash is gone too: the board now binds the
motion-object device's `set_xscroll/set_yscroll/set_bank/bank` calls through the
device's finder member (generic, from `machine.devices[].member`), which does
not disturb Gauntlet. The `state.m_mob` finder itself is still unbound, so the
screen is flat grey -- that is the remaining (video) work.

## 2026-09-16: picture, controls, promotion

Frame 899 pixel-identical to MAME's cold frame 900. Video gaps fixed: runtime `make_unique<gfx_element>`/`set_gfx`; include-guard `#define\s+` swallowing the next line (lost `MAX_GFX_ELEMENTS`); `tilemap_device::write16` never marked tiles dirty; 16-bit shares are native-order words (`basemem_read` byte-swapped); the `gauntlet-tilemaps` direct shape claimed this board; `rectangle::top/bottom/left/right`; motion-object lookups + `bitmap()`; sprite share `mob` vs finder `m_mob` name clash. Double-applied Gauntlet code XOR (init fold + executing video_start) broke Gauntlet sprites — MAME's lookup starts identity. Trackball dead because video-compiler took the file's first GAME (`init_peterpak`). Promoted with a runtime certification bounded to the TILEMAP/ATARI_MOTION_OBJECTS bridges.
