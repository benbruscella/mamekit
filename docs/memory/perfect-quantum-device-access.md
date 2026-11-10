---
name: perfect-quantum-device-access
description: Under set_perfect_quantum an executing device is one cycle behind the CPU; catching it up to cycle k-1 before a register read/write made C64 raster bars pixel-exact vs MAME (batman 222 px -> 0)
metadata:
  node_type: memory
  type: project
  originSessionId: 9100b616-ae4c-4f75-9420-253954e54149
  modified: 2026-10-19T15:06:03.752Z
---

2026-10-20 (#161). MAME's 6502 decrements icount *after* each access (m6502make.py: `ins; icount--`),
and with perfect quantum each slice is one CPU cycle, CPU first. So on an access in cycle k an
executing device (VIC-II, CIA: device_execute_interface) has run cycles < k and runs k afterwards.
Our hosted processors got their time after the instruction, so the VIC saw a $D020 write up to an
instruction early.

- Fix (generated-board.ts device-call binding): for `read`/`write` of a non-CPU device with
  execute_run on a perfectQuantum board, `catchUpDeviceTime(1)` first. lag 0 (through the current
  cycle) left batman 40 px off; lag 1 is exact. Wrap connectCall's rebinding too -- it replaced the
  first wrapper with a native bound call, and the experiment silently did nothing.
- Only c64/c64p have executing devices among perfect-quantum boards (carnival, qix have none).
- Pixel-exact after: batman, anabalt, pacman (PAL+NTSC), c64gs, narco, robocop2, kungfum, gorf,
  avenger/bowling/jlander (vic10). Tape/disk speed unchanged; C64 RAM hashes move (CIA reads).
- IRQ needed nothing: our core fetches (and samples IRQ) at the start of step(), when devices are
  through the previous instruction -- the same point MAME's prefetch sees.
- MAME's VIC never stalls the CPU either: `cpu_cycles == vic_cycles` is never true with the CPU first
  in the execute list, m_rdy_cycles grows forever (ours 106425). A BASIC FOR loop takes 181/179
  jiffies screen on/off on both.

See [[c64-cartridges-161]], [[mame-scheduler-synchronize]], [[total-cycles-mid-instruction]].
