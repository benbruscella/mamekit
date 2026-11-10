---
name: attotime-220
description: "#220/PR #225: frame runner on MAME's integer attotime; dkong trace exact for 60 frames; compare verdict traps; A/B with a scratch dist"
metadata:
  node_type: memory
  type: project
  originSessionId: ee8ee208-5177-4bb5-a771-109df2993232
  modified: 2026-10-31T11:37:43.612Z
---

#220, PR #225 (2026-10-31). Rounds, local times and line positions are whole attoseconds (`src/runtime/attotime.ts`: two doubles in place, not BigInt). `execution.screen.frameAttoseconds` is a decimal string in the IR. dkong's Z80 trace matches MAME for 60 frames.

**Reading `oracle:baseline compare`:**
- "first differs at N -> 1" with an offset change (friskyt, rampage, marble) is the tool picking a different frame offset after drift, not an earlier divergence. Rerun with `--offset 0`.
- Judge first divergence and totals together: pengo was "worse" (first 34 -> 8) with total 6,285 -> 31.

**A/B against the old runner without a rebuild:** `cp -R dist` to the scratchpad, transpile the old `generated-frame.ts` and `generated-board.ts` with `ts.transpileModule` into its `runtime/core/`, then `mame-oracle.ts ... --dist <copy>`. It reproduced the baseline's RAM total exactly. Per-frame `ram.differing` is in `.cache/oracle/<target>.json`.

**Empty rounds are real MAME behaviour:** whole cycles leave a processor attoseconds short, which pulls the target back, and the next round is under a cycle long.

**Outcome:** merged 2026-10-31 as `10aa1ef3`. The user rated Marble, Pengo and Gun.Smoke fine as played. Marble's frame-819 flip is not root-caused. Lagrange's floor stayed at 20, about 25 fps on CI, and moved to #226. Its timer firing dominates the profile, so merging empty rounds saves about 10% at most.

**Pitfalls:** `echo ==` kills a zsh script (`=` expansion). Scenarios of one game share a `.game.ts`, so record them in turn, never in parallel. Recording four at a time gave native Bus/SEGV crashes; solo retries passed.

Related: [[hosted-mcus-in-round-222]], [[mame-baseline-204]], [[host-machine-faults]], [[semantic-baseline-attribution]], [[mame-window-flag]].

**#226 (2026-10-31, in progress):** merging empty rounds (bounded by the next other timer) cut rounds 30k to 20k a frame and gained nothing, and it changed lagrange's writeHash, so it was removed. Don't retry it. Timer-path tightening gives about 5% on gradius2, 2% on lagrange. Measure by `process.cpuUsage().user`: wall-clock runs swing as far as 52 vs 75 fps on this Mac. A/B without touching the tree: copy dist, transpile main's runtime files into it, pass the copy as `outRoot`.
