---
name: browser-node-contract-divergence
description: "When browser e2e and Node contracts disagree, compare raw per-frame snapshots before assuming an emulation divergence — the checkpoint number itself can be lying"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9033290e-63bc-4953-8887-ba316df77cf2
  modified: 2026-08-25T00:16:37.020Z
---

A browser-vs-Node checkpoint mismatch is not evidence of an execution
divergence. Qix (#79, fixed 2026-08-25) looked like a boot interrupt-timing
bug for months and was actually a recording artifact: `board.reset()` rewinds
the board's frame counter to 0, so a contract with a mid-replay
`{ reset: true }` action passes every checkpoint below the reset frame
**twice**. `acceptance-harness.ts` recorded unconditionally and overwrote the
boot values with post-reset ones; `e2e/support/game.ts` walks its sorted
checkpoint list monotonically and records each frame once. Same machine, same
code, two different frames both called "30".

**Why:** the state hash names a frame *number*, not a point in the run. Once a
reset makes frame numbers ambiguous, two correct drivers legitimately disagree
and the diff reads exactly like an emulation bug — right down to plausible
symptoms ("X/Y/U and the CC E-flag differ at frame 22", which was just the
post-reset boot branching on NVRAM written at frame 100).

**How to apply:** before bisecting emulation, dump *raw* per-frame snapshots
(`board.snapshot()` → `{cpus, credits, generatedDevices}`) from both sides and
diff the objects, not the hashes. Browser side: boot with `?qa=1`, feed the ROM
through the picker's filechooser, then `window.mamekit.step(1)` in a loop
inside one `page.evaluate`. Node side: replicate the harness's board setup
(config.json + `assembleRegions` + `dist/app/registry.js` +
`dist/runtime/core/generated-board.js`). If the raw states match, the bug is in
the recording/comparison layer. Note a plain Node board is the honest
reference — `runGameAcceptance` itself can be the thing that is wrong.

Related: [[codegen-interpreter-parity]], [[emitter-interpreter-parity]],
[[known-broken-targets]], [[node-rom-inflate-segfault]].
