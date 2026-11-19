---
name: gen-all-at-end
description: While iterating on one system use single-target gen; gen:all + full sweep only once the work is finished
metadata:
  node_type: memory
  type: feedback
  originSessionId: 9e9e69c6-e37f-4806-b877-66271b86f0e4
  modified: 2026-11-18T01:31:12.254Z
---

While working on one game/system, regenerate only that target (`node bin/mamekit.js <target>`, `npm run mamekit -- build` for runtime-only, `--build-runtime` when device codegen changed). Run `gen:all` + the full acceptance sweep once, at the end, to check nothing else broke.

**Why:** user (2026-11-18) objected to repeated gen:all runs during SNES work; each costs ~an hour with the sweep and blocks the dev server's dist.

**How to apply:** even for compiler changes that reach every machine, batch them and verify all targets once when the issue's work is done. See [[single-target-gen-scope]].
