---
name: codegen-interpreter-parity
description: Widening handler codegen exposes emitter/interpreter semantic gaps — integer division was the big one; bisect by editing dist board.js directly
metadata: 
  node_type: memory
  type: project
  originSessionId: 5f2a666c-972a-480b-9aa8-4e5979e672eb
  modified: 2026-08-24T09:49:16.144Z
---

Issue #77 (2026-08-24, PR #80, unfinished): widening `emit-handler-codegen`
selection to handlers that are hot by *wiring* (CPU-range dispatch, tilemap
tile-info/scan callbacks, screen update) took sf2ce from 48 to ~97 emulated
fps — CPS1's fps problem was throughput, never the refresh rate, which
derives correctly as 59.637405 Hz from `set_raw`.

Compiling more handlers surfaced real gaps where emitted JS disagreed with
`src/ir/execute.ts`, the semantic reference:

- **C++ `/` truncates between integers.** The emitter emitted plain JS `/`,
  so `mark_tile_dirty(offset / 2)` passed 1.5. Fixing it (shared
  `applyGeneratedDivision`) repaired berzerk, mpatrol and rampage at once.
  This also changes emitted **device** code, so goldens recorded against the
  old non-truncating behaviour will shift — decide those against real MAME
  ([[mame-reference-capture]]), don't re-record on faith.
- `ACCESSING_BITS_*`, `COMBINE_DATA`, and the `rgb_t`/`TILE_FLIPYX`/`assert`
  macro table were interpreter-only.
- A video package's shape-recognised override (CPS1 `gfxrom_bank_mapper`)
  outranks the source method; emitted direct calls must yield to it.
- `videoram_w<Which>` expansions each need their own constants; merging them
  into one scope hands every expansion the last one's value (broke bankp).

**How to apply:** to find which compiled handler broke a game, edit
`dist/games/arcade/<game>/generated/board.js` directly — delete
`"Class.method": methods["method"],` lines and re-run acceptance. `dist` is
disposable, so this bisects in seconds instead of minutes per regeneration.
If the game still fails with *every* board entry removed, the culprit is in
generated device code, not the board.
