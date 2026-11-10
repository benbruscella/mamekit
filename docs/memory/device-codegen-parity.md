---
name: device-codegen-parity
description: Three device-codegen defects behind the ColecoVision's 17 fps — declined compile, switch scoping, and a pointer deref that silently read zero
metadata:
  type: feedback
---

Found 2026-08-28 profiling the ColecoVision at 17 fps. `--cpu-prof` showed 92%
in `executeMethod`, i.e. a hot device method was being INTERPRETED despite
being in `hotMethods`. Three separate defects, in the order they surfaced:

1. **Codegen declined the method.** `supportsMethod` rejects a member call
   chained on a call (`screen().vpos()`) unless it is a declared device link.
   The screen is a host service with no target device, so a video device's
   scanline renderer never compiled. Fixed with `HOST_SERVICE_CALLS` in
   `src/ir/board.ts`, read by BOTH the emitter and `generated-board.ts`, so a
   chain one side emits and the other never binds cannot exist. The same
   comment in that code records this once left the NES PPU interpreted and drew
   SMB at 5 fps — the trap is recurrent.

2. **C++ scopes each `switch` case; JavaScript does not.** MAME declares a
   working local per arm (`addr`, `fg`, `bg` in the TMS9928A's mode arms), so
   the emitted method redeclared `let` and would not parse at all. Each case
   body is now braced. Loud failure — tsc caught it.

3. **A member holding a C++ pointer is a generated pointer at run time.**
   `m_vram_space = &space(AS_DATA)`, so `m_vram_space->read_byte(x)` is a call
   on the WRAPPER. The interpreter dereferences first; emitted code did not,
   found no `read_byte`, and took its `?? 0` fallback — every VRAM read
   returned zero and the whole active display drew empty. `emitValueMemberCall`
   now emits `runtime.dereference(...)`.

**Why:** 3 is the dangerous one — it is silent and looks like a huge win. Fix 1
alone reported "376 fps" of a blank screen. Result: 17 -> 141 fps, framebuffers
byte-identical to the interpreter.

**How to apply:** after any codegen change, diff the COMPILED framebuffer
against the INTERPRETED one before believing a speedup — build the board twice,
`delete device.compiledMethods` on one. Same family as
[[emitter-interpreter-parity]] and [[codegen-interpreter-parity]].
