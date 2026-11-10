---
name: tunit-board-lessons
description: MK/NBA Jam (#149) general fixes -- silent TMS34010/T-Unit/Williams ADPCM gaps, each with the MAME oracle that found it
metadata:
  type: project
---

What made Mortal Kombat and NBA Jam work (2026-09-19), each a general
compiler/runtime gap, found by diffing against MAME 0.289:

- **Palette write16 byte order**: palette_device RAM writes followed a fixed
  big-endian layout; memory_array stores in the share's order (TMS34010 = LE).
- **screen().configure**: the TMS34010 moves the visible area from
  HEBLNK/HSBLNK (MK: 10 px); lowered to `bus.screen.configure`.
- **Strings through calls**: execute.ts `callArgument` turns strings into 0,
  so CALL_METHOD (member-function-pointer tables) called method "0".
- **attotime::from_nsec/usec/msec/seconds** were unbound; a timer armed with
  one never fired (T-Unit DMA busy bit stuck). Blast radius: ~11 boards.
- **Typed finder calls**: `m_adpcm_sound->write()` into a driver-tree device
  class was never lowered (mutating finder calls are skipped); now followed via
  `required_device<T>` and keyed by `finderAliases`.
- **Composed-device timers**: device_start `timer_alloc(FUNC())` of a
  non-generated device become genericTimers (driver timers still excluded).
- **Zero-delay adjust = synchronize()**: firing at the next line let the
  restarted sound CPU clear its latch first and take a second command.
- **YM2151 timers per instruction** (`tickInstruction`): a 14 kHz FIRQ
  advanced per slice lost ~half its interrupts -> music at half tempo.
- **OKI voices sum** (MAME add_int), not /4 -- also changes ffight/ghouls/sf2/sf2ce.
- **OKI address map**: `sampleMap` + `bank.<tag>` writes for banked sample ROM.
- **Init helpers**: `init_nbajam_common(0)` inlined with constant branches;
  `install_ram` on another CPU via `->get_cpu()`; installs scaled for
  bit-addressed CPUs; `m_x = static_table;` seeds state (`initialValues`).
- **Device codegen hoisting**: a member taken by address (`COMBINE_DATA(&m)`)
  was hoisted and read stale -> NBA Jam's VRAM bank select never took effect.

Oracle recipes: MAME Lua `install_write_tap`/`install_read_tap` on
`:adpcm:cpu` (vector fetch at 0xFFF6 counts FIRQs), `debugger:command('trace
...')` with `-debug -debugger none`, per-chip mute via cfg device_volume.
Related: [[issue-149-next-four]], [[codegen-silent-zero]], [[mame-scheduler-synchronize]].
