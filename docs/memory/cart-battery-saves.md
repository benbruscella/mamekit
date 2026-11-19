---
name: cart-battery-saves
description: "#174 (2026-11-18): cartridge battery saves for every console via MAME's battery_load/battery_save; devcb reads dropped their offset (FF3 hang)"
metadata:
  node_type: memory
  type: project
  originSessionId: 9e9e69c6-e37f-4806-b877-66271b86f0e4
  modified: 2026-11-18T12:11:25.238Z
---

Cartridge battery RAM now persists for every console slot (SNES, NES, GB): commit af7b400f.
- Restore: shell awaits the stored MemoryRecord BEFORE createBoard and puts `battery` on the BoardImage (never into bootBoard: that is machineIdentity). The slot's own call_load reads it via battery_load (wrong size -> MAME's fill).
- Save: `board.batteries()` runs MAME's call_unload only on devices whose call_load called battery_load (floppy/tape never), capturing battery_save. machine-memory polls once an emulated second + pagehide; record key `<slot tag>:<image name>`; other carts' saves are merged, not dropped.
- Netplay: guests load no battery; `coldMachine` is built lazily battery-free when a board was built with one.
- Browser-verified: planted bytes in IndexedDB came back through call_load after reload.

devcb read offsets: `wireDeviceCallbacks` registered reads as `() => effect.run(0)` and the CPU-signal path ran `effect.run(0)` — the read's offset was dropped. Convention is `run(0, ...sourceArgs)` (composite path, cpuSpaceRead); deviceMethod gives a single-`offs_t` target sourceArgs[0]. Do NOT change generatedDeviceCallbackArguments' `[0]` (its spec: a signal value is never an offset). Symptom: S-SMP `$F3` read returned the DSP address register; FF3 (HiROM) hung, now RAM-exact vs MAME 3600 frames. HiROM itself was fine (DKC ran).

Related: [[browser-memory-rom-library]], [[snes-174-decisions]].
