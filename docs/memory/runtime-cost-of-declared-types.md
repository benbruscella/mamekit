---
name: runtime-cost-of-declared-types
description: "Game Boy 33.7 -> 68.9 fps with audio: a Proxy costs 26%, struct accessors cost 8%, and sound_stream_update was interpreted on every device"
metadata: 
  node_type: memory
  type: project
  originSessionId: 8b896811-b929-4032-8912-a008d3064819
  modified: 2026-09-02T06:24:59.120Z
---

2026-09-02, `102-add-support-for-gameboy-console`. Correct Game Boy emulation
with audio started at 33.7 fps in Node and finished at 68.9 (Tetris 76). Every
win was general; none was Game-Boy-specific. Measured with `--cpu-prof` on a
600-frame run after 546 warm-up frames.

**Biggest, in order:**

1. **`sound_stream_update` was interpreted on every sound device in the
   project** — 52 → 67 fps alone. The codegen root rules take a bus entry point
   (`offs_t offset` first) or loop depth ≥ 2, or depth 1 with a switch. A stream
   renderer is one loop and no switch, so it missed all of them — while running
   once per output sample, 48 kHz, four channels deep. It is a MAME framework
   entry point like a bus handler and is now recognised by name.
   **Look for other framework entry points hiding under the shape rules.**

2. **A `Proxy` on the board state object cost 26%** (47.4 vs 37.5 fps). A `set`
   trap deoptimises every *read* too, and member reads are the hot path of every
   handler on every board. Declared widths belong in the emitted store
   (`targetInfo` + `wrapTarget` already do it for devices) — zero runtime cost.
   **Never put a Proxy on anything a handler touches.**

3. **Struct fields narrower than 32 bits were accessor properties**, so every
   read of one was a call. The Game Boy's wave channel walks four of them in a
   loop that runs ~40k times a frame. Widths moved into codegen (a device
   definition now carries `structs`, its declared struct types, so a `SOUND &`
   parameter can be resolved); interpreted stores narrow through a widths map
   under `Symbol.for('mamekit.fieldWidths')`. 46.9 → 49.4 fps.

4. **A struct's array fields are always plain JS arrays** — nothing rebinds one
   — so index them directly instead of `runtime.readIndex`, and a struct
   scalar's declared width makes `+` plain rather than `runtime.add`.
   49.4 → 53 fps.

5. **`generatedAdd`/`wideBinary` fast paths**: two plain numbers first, and
   64-bit ops answered in doubles when the double answer is exact (non-negative
   safe integers only — the wide operators mask to unsigned 64). 42.3 → 46.9.
   Memoising the BigInt path instead was measured and is **not** a win.

6. **A per-signal handler re-resolved its dispatch on every delivery** — the
   compiled-function key by string concat, the prepared table through two
   WeakMaps, the parameter list, an args array and a result object. The LR35902
   delivers `gb_timer_callback` 17,552 times a frame (once per instruction).
   `prepareGeneratedMachineHandler` resolves it once.

**Method:** profile by module, then count calls per frame for the top functions
(patch the emitted `dist/.../devices/*.js` with a counter). A function with few
calls and high self time has a loop; one with many calls and high self time is
dispatch overhead. See [[interpreter-share-is-the-budget]].
