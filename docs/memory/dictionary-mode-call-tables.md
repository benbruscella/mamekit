---
name: dictionary-mode-call-tables
description: "C64 2026-09-06: the board's 1,821-key calls table is V8 dictionary-mode, so every emitted runtime.calls[\"x\"] was a hash probe (a dozen per bus access); resolved link tables took c64p 45→66 fps boot, 32→57 tape load. Traps: Object.fromEntries vs loop-built tables, WeakMap per call, scalar &member declines"
metadata: 
  node_type: memory
  type: project
  originSessionId: 7e6433c7-8feb-4b6e-860f-56eb6ad88897
  modified: 2026-09-06T06:19:15.714Z
---

Emitted code now reads host calls through `runtime.links` (a per-module fast-mode table of resolved targets; `__l = runtime.links ?? runtime.calls` preamble), declared as `compiledHandlerLinks` on the board and `compiledMethodLinks` on each device. Rebuilt on `bindCall`/connectCall refresh via `noteCallLinksChanged()` (src/ir/execute.ts).

**Why:** `%HasFastProperties(board.bindings.calls)` was false at 1,821 keys. `method_read_memory` self time was 15% of a C64 frame doing nothing but probes. `--allow-natives-syntax` + `%HasFastProperties` is the one-line check; do it before theorising about "expensive hardware".

**How to apply:**
- Build any such table with `Object.fromEntries`, never a keyed-store loop: 81 keys added one at a time trips V8's fast-properties soft limit and the "fast table" is a dictionary again (that alone was 57 vs 66 fps).
- Never resolve links with a WeakMap.get per call: it costs about a probe; keep the table a plain data property on the runtime object.
- Bisect by editing dist board.js/device .js directly (regex-hoist `runtime.calls[...]`) before touching the emitter; the fps delta is the design signal.
- Codegen declines are the other half: `&m_value` (scalar member address-of) kept the cassette's `update` interpreted at 2,000 calls/frame; C64 slot cards/children needed `hotMethods` too (src/hardware/c64/extract.ts markHotMethods). See [[interpreter-share-is-the-budget]].
- Literal-only IR trees (variant macros like `(4==4||4==5)?48:48`) are now folded by `literalValue` in device-codegen; devcb member calls (`m_write_ba(1)`) link directly instead of `runtime.invoke`.
- Remaining C64 budget after this: VIC `execute_run` per-cycle switch, then the memory path; fast-forward in the browser is bounded by this headroom.
