---
name: single-target-gen-scope
description: `mamekit <game>` does NOT re-emit generated device modules; `--build-runtime` is the iteration loop for device codegen
metadata:
  type: feedback
---

`node bin/mamekit.js <game>` regenerates the game and recompiles the app, but
the hardware closure — `dist/runtime/generated/devices/*.ts`, where device
codegen output lives — is only rebuilt by `--all` or `--build-runtime`.
`--no-cache` does not change this.

**Why:** editing `src/mame/device-codegen.ts` and re-running a single target
looks like the change had no effect, which costs a long detour.

**How to apply:** iterate with `node bin/mamekit.js --build-runtime --build-app`
(~75s for 49 targets), then re-run the target's probe. Confirmed 2026-08-25.

**Gotchas (2026-11-18, #271):** `--build-runtime` is silently ignored when a
game is named (`mamekit venture --build-runtime` rebuilds nothing). To rebuild
one target's closure use `node bin/mamekit.js --build-runtime --targets <game>`;
its app step then refuses a "mixed distribution", but the closure is rebuilt and
acceptance and `mamekit against` run. Delete `.cache/closure` after a compiler
change, because its key does not change with the compiler. A fresh worktree has
no dist, so one bootstrap `gen:all` there is unavoidable.

See [[dist-rebuild-pitfalls]], [[venture-scheduler-time-271]].
