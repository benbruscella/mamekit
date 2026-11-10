---
name: machine-start-lifecycle-237
description: "#237 items 4/5: running MAME's machine_start on every board exposed ~20 general gaps; MAME start/reset order and what each fix was"
metadata:
  node_type: memory
  type: project
  originSessionId: 6fdbae1c-bfbb-498a-95e4-3db5d8b44a3c
  modified: 2026-11-07T09:11:55.081Z
---

Before #237 no board ran `machine_start` (startHandlers = video_start only), so
Neo Geo's hand code (IRQs, RTC, input/vector/bank overrides, cart windows,
sprite fork) stood in for it. Turning it on (kg/build.ts startFunctions, root
only — MAME calls the most-derived override, which calls its bases) needed:

- **MAME order**: all device_start → driver_init (bindDelegateSlots) →
  machine_start → sound_start → video_start → set_rtc_datetime → all
  device_reset → machine_reset → sound_reset. IrDevice `holdReset` so devices
  don't self-reset at construction; synchronize() posted during construction
  waits for `schedulerRunning` (GENERIC_LATCH_8 init_callback vs merger start).
- Lifecycle lists hold the root only; MACHINE_*_CALL_MEMBER(x) lowers to a real
  call (ast.ts). driver_device lifecycle virtuals are DEVICE_T_DEFAULTS no-ops.
- Driver timers: armed anywhere, but only if a handler *this machine has* arms
  it (any driver timer forces the per-line schedule — bublbobl). timer_alloc
  returns undefined; the member name binds the timer.
- Run-time installs on `<cpu>.space()`: handlers (delegate tagged
  `delegateHandler` → installs by registry key), ROM, bank (read by bus OFFSET,
  not address — 16-bit word reads pass off/off+1), views (memoryViewEntries
  proxy), taps, unmap. Bus.install re-maps under views.
- Banks: configure_entry/entries place entries by region pointer
  (regionOffsetOf); DriverMemoryBank for memory_bank_creator.
- BE16 regions: `bigEndianWords` from ROM_REGION16_BE; mark via
  Symbol.for (harness and board load different copies of execute.js!).
- memory_region finders → region objects (driver: regionObjects; device:
  region-object resource, `^` via mameSubtag); `found()`/`isnull()` on null.
- Framework device default clocks from their own headers (uPD4990A 32768).
- device_rtc_interface compiled from src/emu/dirtc (FRAMEWORK_INTERFACES);
  BoardConfig.baseTime = MAME -rtc; contracts + oracle use CONTRACT_BASE_TIME.
- Empty owned std::vector → resizable ArrayBuffer so resize through `&` works.
- `#define X (attotime::...)` expanded in handler bodies; driver
  time_until_pos needs the device's half-pixel tolerance.

**Resolved (2026-11-07):** mslug's silence was emitted code calling `memberCall`
on `{reference}` bank objects, not YM timer timing: per-instruction YM2203 ticks
changed nothing for mslug and made bublbobl worse vs MAME, so they were reverted.

**Fallout of holding device reset until after start** (all general):
- The board's power-on "replay latch m_q onto callbacks" loop emitted 0xff
  (addressable_latch device_start's arbitrary value) as a pulse on every q_out
  line: +1 audio write on pacman and ~15 boards. Deleted; device resets now
  drive the lines themselves, as in MAME.
- Device resets now reach callbacks: MCS-48 reset writes P1/P2=0xff (shinobi
  DAC), PIA6821 reset drives port A 0xff (Williams/CSD DACs; AD7533 joined the
  auxiliary audio table), i8255 reset reaches driver handlers (needs `*_delegate`
  members as null state: stateMembers `delegate: true`).
- M58715 internal ROM as a real view needs MCS-48 `update_ea()` lowered
  (`rom_view_w` → CpuBus.selectView), or EA=1 code NOP-slides through erased
  internal ROM. MAME Lua tap on `:audiocpu` io: 375,844 DAC writes, all zero —
  the old 6,260 nonzero came from the hand overlay.
- Neo Geo edge connector: `required_ioport_array` finders + per-class
  constructor bindings (joystick.cpp holds two devices binding `m_ss`); with
  0x00 inputs the BIOS saw every button held and Metal Slug took a different
  path after start.
See [[board-devices-237]].
