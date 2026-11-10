---
name: device-machine-time
description: "machine().time is frame-granular and attotime_to_cycles is unbound, so a device that clocks itself off elapsed time never advances mid-frame"
metadata: 
  node_type: memory
  type: project
  originSessionId: 8b896811-b929-4032-8912-a008d3064819
  modified: 2026-08-31T06:47:19.332Z
---

`generated-board.ts` binds `machine().time` for every device as
`frameCount / screen.refresh` — one tick per frame. `attotime_to_cycles` is
bound nowhere at all.

A device that runs on a *timer the board fires* is fine. A device that asks
"how much time has passed since I last looked" and converts that to cycles
itself is not: it reads zero for every intra-frame call.

MAME's `dmg_ppu_device` is the second kind. Its whole scanline state machine is

    cycles = m_lr35902->attotime_to_cycles(machine().time() - m_last_updated)

so it advances only at frame boundaries, never reaches `GB_LCD_STATE_LYXX_M3`,
and `m_start_x`/`m_end_x` stay 0 — which is the `if (m_start_x < 0)` guard that
gates `update_scanline`. Result: the PPU runs, accepts register writes, cycles
`m_current_line` 0..153, and draws a flat background. Nothing errors.

**How to spot it:** the device's state members move but its *drawing* members
never leave their reset values, and `grep attotime_to_cycles <device>.device.ir.json`
finds calls with no binding behind them.

**How to apply:** making a device's clock sub-frame changes shared timing that
every existing game feels, so it needs its own change and its own
`npm run test:games` pass — do not fold it into a console PR. Related but
distinct: [[device-clock-vs-beam]] is about arming timers against raster
positions; this is about the clock a device reads for itself.
