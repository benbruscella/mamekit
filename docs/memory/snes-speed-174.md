---
name: snes-speed-174
description: "#174 speed push 18->~48 fps Node / ~58 browser, all general codegen/runtime fixes, exact vs MAME; V8 traps found (proto literals, accessor closures)"
metadata:
  node_type: memory
  type: project
  originSessionId: 9e9e69c6-e37f-4806-b877-66271b86f0e4
  modified: 2026-11-18T02:42:46.609Z
---

Speed work on branch 174 (2026-11-18, uncommitted), SMW stays byte-identical to MAME (1800 frames RAM+pixels) after each step. Bench: scratchpad bench.ts reports steady fps for frames 100-600 plus CPU-time fps (machine load swings wall-clock a lot).

Fixes (all general):
- `AS_PROGRAM/AS_DATA/AS_IO/AS_OPCODES` in DEFAULT_CONSTANTS: board codegen declined every handler naming one (SNES scanline/hblank/hdma timers).
- `machine().scheduler().perfect_quantum` added to the board chain list (VIDEO_FRAMEWORK_CHAIN_CALLS) -> snes_w_io emitted.
- 64-bit locals used only bitwise + narrowed reads are emitted as `v$lo/v$hi` u32 halves (splitWideLocals in device-codegen; cppShl64/cppShr64 helpers). Rejected-candidate values must still be checked (CX4 `rx *= ry` bug).
- Device lambdas compiled as `<method>__lambda<i>` (deviceLambdaMethods) and returned by the interpreter via bindings.compiledLambdas (S-SMP RAM window).
- Handler fast paths for `(address_space &space, offs_t offset[, data])`.
- Sparse device spaces: per-4KB page candidate lists (5A22 internal map).
- `cppMemset`/`cppClearStruct` inline; memset answered first in applyGeneratedMacro.
- `auto *p = &m_arr[i]` typed as struct pointer; struct-array element type inferred -> dereferencedLocals.
- Struct/fixed-array members hoist even when their address is taken.
- parked() uses a cached timed-device list.

Profile at ~30 fps: PPU ~32% (update_objects ~3 ms/frame), scheduler rounds ~28% (~8300 rounds/frame under perfect quantum, ~1.1 us each), 65C816 ~20%, S-SMP ~4%. machine_start's install_readwrite_handler mapRange costs ~1.5 s of startup (load time only).

Stopped-CPU round extension DONE: board `cpuActivity` counts host reads + IrDevice.spaceReads; a slice with no read, exactly its cycles, and (read lazily) an unchanged STATE_GENPC twice in a row = stopped. Frame runner `stoppedLead()` extends a perfect round to the timer/lines' end when leading processors (configured order) are stopped, runs them last, and on a cut (synchronize) runs them to the end of the MAME quantum the cut falls in (`stoppedTarget`). Line changes already synchronize. A/B on/off identical (fb + 128KB WRAM + ARAM + audio, 1200 frames DKC); DKC 35% faster. SMW never WAIs (polls RAM), so no SMW gain. DKC vs MAME: pixel-exact @600, 1 RAM byte 7e0000 differs from frame 20 (separate gap). A/B harness: scratchpad ab.ts (needs a temporary off switch). See [[snes-nmi-scheduler]], [[gen-all-at-end]].

2026-11-18 later (commits c66ae2dd, a8e6165c): browser 45 -> 54-55 fps, Node ~48.
- `{ __proto__: X, ... }` literals take V8's slow path: struct literals now emit one constructor per field shape (update_objects was 90% that line).
- `Object.defineProperty(obj, 'palette', { get: () => [] })` with a FRESH closure per object drops every object after the first to dictionary mode: 2 of 3 board handler runtimes were hash-probe objects. Use one shared getter. Probe with `node --allow-natives-syntax` + `%HasFastProperties` patched temporarily into dist.
- std::unique_ptr<T[]> members index in place (ArrayBuffer.isView check); constant 64-bit shifts fold inline.
- Shell backlog cap 5 -> 2 frames: a machine slower than real time ran 5 frames per rAF and drew 8.5x/s; a flat fps across scenes was this, not a cap.
Left: memory path ~45% of CPU time (8 layers per ROM read), round bookkeeping ~1/3 of the frame in many 1% pieces; skipping start-of-slice timing(0) changes audio - don't.

2026-11-18 evening: **SMW 57-61 fps in the browser (60 Hz target reached)**, Node ~52. Last steps: CALL_METHOD dispatch tables resolved per entry (cppMethodAt; a >~1000-key method table is dictionary mode), dead cpuSliceCycles removed, cpuStalls written only when owed, firePreciseTimers earliest cached by pendingTimers.version. Browser ≈ Node × 1.15-1.2. gen:all + full sweep still owed before the PR.
