---
name: closure-pool-265
description: "#265 hardware closure was serial main-thread lowering (564 s); worker pool + 2 hot spots → 103 s, byte-identical"
metadata:
  node_type: memory
  type: project
  originSessionId: d90de6b9-5bfb-4c9d-ae0d-61711dd53945
  modified: 2026-11-17T01:58:11.330Z
---

#265 (2026-11-17): the 17-min CI assemble step was the hardware closure, and it was
NOT parsing (10 s) — every capability's `extract()` ran synchronously on the main
thread, one after another. Fixed with `src/mame/closure-pool.ts` (fork pool, one
job per capability, per-type for `extractsPerType` families) plus two compiler hot
spots: `outOfLineStructMethods` regex prefilter and a source-keyed `parseMameSource`
cache (callers mutate units → structuredClone). Local 564 → 103 s.

**Why:** DISCRETE is one 87 s compile and bounds the pool; next speedups must come
from DISCRETE itself (numericConstants/evalExpr ~20 s, stripCppComments ~7 s).

**How to apply:** verify closure changes by diffing a cold `--build-runtime --no-cache
--out <scratch>` tree against a saved baseline (only `generatedAt` may differ); copy
`dist/games/**/graph.json` into the scratch out first. Profile one capability with a
scratch script calling `buildHardwareClosure` + its extract under `node --cpu-prof`.
Related: [[gen-cache-masks-breaks]], [[warm-cache-outlives-code]].
