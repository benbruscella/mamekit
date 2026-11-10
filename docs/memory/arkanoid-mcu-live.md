---
name: arkanoid-mcu-live
description: "Arkanoid's hardcoded 68705 boot shim is gone; the dumped MCU really runs. The 68705 core needed a port-input model and a held reset line"
metadata:
  type: project
---

Until 2026-08-27 `generated-board.ts` carried an Arkanoid-specific
`usesProtectionProtocolBridge` that skipped the dumped 68705 entirely and
answered `mcu.data_r` from a table keyed on Z80 PC values, plus a constant `1`
for the semaphore input. That is all deleted (issue #92); the MC68705P5 now
executes its own firmware and the 10-second HARDWARE CHECK — the Z80 streaming
all 0xc000 program bytes through the MCU — is **pixel-identical to real MAME**.

Two gaps in `src/runtime/generated-m68705.ts` had to close first:

- **Port inputs.** MAME keeps `m_port_input[N]`, written by `pa_w/pb_w/pc_w`
  and refreshed from a port read callback, then merges it with the output latch
  through the DDR. Our core only ever read the callback, so the host latch
  (`m_mcu->pa_w(m_host_latch)`) never reached the firmware.
- **Reset is held, not edged.** MAME holds the core in reset while the line is
  asserted and starts it from that state on release. Resetting on the edge and
  running through the assert window let the firmware finish its power-on
  handshake while the interface still had `m_reset_input` forcing both
  semaphores clear — the reply was discarded and never repeated, and the game
  printed BAD HARDWARE.

`M6805_IRQ_LINE`/`M68705_IRQ_LINE`/`M68705_INT_TIMER` were also missing from
`DEFAULT_CONSTANTS`, so `set_input_line(M68705_IRQ_LINE, ...)` resolved to NaN.

Contract note: nothing before frame ~600 is sampled, so the coin and start
press must come after the hardware check (900/960 in the recorded contract).

See [[device-handler-namespace]] for the watchdog/`reset_w` collision that was
the last thing holding the MCU down.
