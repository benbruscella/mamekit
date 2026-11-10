---
name: m68705-generated-176
description: "#176: the 68705 compiles from MAME (m6805-device.ts); five silent general gaps; MAME debugger instruction-trace recipe that works headless"
metadata:
  node_type: memory
  type: project
  originSessionId: bb6f9c22-a036-4bd8-a560-4dd6b323f5c7
  modified: 2026-10-22T18:04:13.868Z
---

2026-10-23, branch 176. `generated-m68705.ts` and `src/hardware/m68705/` are
deleted; the M68705P5 compiles from m6805.cpp + 6805ops.hxx + m68705.cpp via
`src/mame/m6805-device.ts` (preprocessed-device route). Arkanoid and Elevator
Action match the hand-written baseline on the oracle (pixels and RAM).

The general gaps, each silent:
- **`const noexcept` out-of-class methods were never parsed** (ast.ts
  functionRe). `execute_cycles_to_clocks` was lost, so the MCU ran 4x fast
  (3 MHz, not 750 kHz). Symptom: fps collapses (Arkanoid 19.9 -> 65) and the
  MCU answers the host "too quickly". Check `device.cycleClock()`.
- **`machine_config const &mconfig` constructors** weren't recognised by
  parseClassMemberTags, so a device's finders were credited to the previous
  class. Elevator's interface got tag `mcu` instead of MAME's `bmcu`, and its
  MCU ROM region (`bmcu:mcu`) was never found: the core executed zeros from 0.
- **`m_mcu->set_input_line` from a composite parent** was unbound (silent 0).
  RESET/HALT are execute-interface lines: assert suspends, clearing RESET
  resets + resumes (diexec.cpp device_input), never reset-on-assert.
- **The harness loads the runtime from dist**: a src/runtime edit needs
  `--build-app` before a probe sees it.
- **Two listeners on one devcb**: a hand-written `child.on(...)` plus the generic
  wiring both ran, so every port write happened twice. Look for a duplicate
  before suspecting the core.

**Instruction-trace recipe (MAME 0.289, headless).** `-debugscript` does
nothing under `-debugger none`, and a `tracelog` action stops the trace; use
Lua instead:
`dbg = manager.machine.debugger; dbg:command('trace /abs/out.tr,:mcu:mcu,noloop'); dbg:command('go')`
with `-debug -debugger none -autoboot_script x.lua` plus a frame notifier that
exits. On our side, bind the device's `debugger_instruction_hook` call to log
the PC. Diff the deduplicated PC streams. MAME tags differ from ours (`:bmcu:mcu`).
Device state names: `manager.machine.devices[tag].state` keys (PS, TDR, ...).

MAME's MCU lags the Z80 by up to a quantum (Arkanoid: 1/6000 s) and sees
interface flags "from the future"; ours interleaves per instruction. A
divergence of one instruction around a handshake is that, not a core bug.
Related: [[mame-oracle-tool]], [[arkanoid-mcu-live]], [[silent-mislowering]].
