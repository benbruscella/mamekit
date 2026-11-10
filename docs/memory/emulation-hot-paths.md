---
name: emulation-hot-paths
description: Three host-side costs found profiling NBA Jam (#149) — name-switch dispatch, per-access bus allocation, per-instruction board hook; 49 -> 65 fps
metadata:
  type: project
---

Profiling (`node --cpu-prof` on `src/games/acceptance.ts <game>`, sum
`timeDeltas` by node, group by callFrame url) found three host costs, none of
them emulation:

- **`callMethod` name dispatch, 16% of a frame.** The strict-call CPU emitter
  wrote a `switch` over ~1,250 method names, run per opcode *and* per pixel
  raster op. Now a `Map` of name -> bound method built once (cpu-codegen).
- **Bus word access, ~19%.** `wordMapping` allocated `{id, base}` twice per
  16-bit access, and a TMS34010's whole space is above 0xffff, so every access
  took the page path with two `Map.get`s. Now scratch fields, a cached
  last-page array per direction (invalidated in rebuildViews/stateRestored),
  word handlers in an array not a Map, and no try/finally when no taps exist.
- **`timing` board hook, 6%.** Runs between instructions: it looked up the
  sound runtime and wrote a `Map` entry every time. Now the hook resolution is
  cached per CPU and the slice counter is a field (`runningSliceCycles`),
  read from the map only for a processor that is not the running one.

NBA Jam 49 -> 65 fps, Mortal Kombat 58 -> 70, goldens unchanged.
**Trap:** an acceptance fps number taken during a sweep is worthless — under
load NBA Jam measured 2.5-12 fps and failed the 30 fps floor; alone, 65.6.
Related: [[interpreter-share-is-the-budget]], [[dictionary-mode-call-tables]].
