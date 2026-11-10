---
name: dist-rebuild-pitfalls
description: "Which mamekit gen commands rebuild what — single-target gen recompiles the app (stash cycles silently poison dist), closure artifacts need --build-app, --all is cache-incremental, the dev server breaks test:games"
metadata: 
  node_type: memory
  type: project
  originSessionId: 07afc189-1d46-4696-a6fb-e06868efcf42
  modified: 2026-08-23T00:00:00.000Z
---

`node bin/mamekit.js <game>` regenerates that game's target AND recompiles the
whole app with tsc from the *current working tree* — but does NOT re-emit the
shared runtime closure (worklet artifacts under dist/runtime/generated). Two
traps that each cost debugging time (2026-08-18):

- A `git stash && bin/mamekit.js <other-game> && git stash pop` clean-tree
  bisect leaves dist/runtime JS compiled from the CLEAN tree. Acceptance then
  runs current-tree TS specs against stale runtime JS → phantom
  "nondeterministic" golden failures. Always `--build-app` after a stash cycle.
- Compiler changes to worklet emitters (`src/mame/*-compiler.ts`,
  `src/hardware/*/extract.ts`) only reach dist via `--build-runtime` (emits
  artifacts, exits before compiling) or `--build-app` / `--all` (emits +
  compiles). Single-target gen leaves the old worklet js in place.

Two more, learned 2026-08-23:

- `bin/mamekit.js --all` is incremental: `.cache/targets` makes it skip targets
  whose inputs are unchanged, so a compiler change you want to observe across
  every game needs `rm -rf .cache/targets` first (or `npm run gen:all`, which
  cleans dist). Silent — the run still prints "generated" for all 47.
- The user's own dev server runs `--serve`, which recompiles the app from the
  current tree before it listens. That deletes and rewrites `dist/app` under a
  running `npm run test:games`, which then dies mid-suite with
  `Cannot find module dist/app/registry.js` at whatever game happened to be
  next. It is not a test failure; re-run it (or stop the dev server first).

**Why:** acceptance probes and the shell load compiled JS from dist, not src.
**How to apply:** after editing src, run `node bin/mamekit.js --build-app`
before trusting any acceptance/golden result; distrust "impossible"
nondeterminism until dist provenance is confirmed. See also
[[acceptance-harness-coverage-gap]].

**The dev server races golden re-records (2026-08-24).** `record-goldens.ts`
writes `src/games/<game>.ts`, which `node src/dev.ts` watches — so each
successful record triggers an app rebuild that deletes `dist/app` under the
*next* record, which then dies with `Cannot find module dist/app/registry.js`.
Batch recording needs a settle-wait between games: poll `stat -f '%m %z'` on
`dist/app/registry.js` until it stops changing. A record that runs while the
rebuild is mid-flight silently captures a golden against a half-old dist —
venture recorded 7627 sound writes that way where three settled runs all give
7599.

**Failed gen:all leaves orphans that poison .cache (2026-11-09, #240):** when one target's generator dies, the `--all` orchestrator exits but sibling child generators keep running and writing dist AND `.cache/targets/<t>`. Rerunning `gen:all` immediately collides with them (ENOENT on another target), and the cache keeps entries without graph.json (crush/dkong/dkongjr/ffight) -> "cannot build runtime hardware closure: missing .../graph.json" even on a quiet run.
**How to apply:** after a failed gen:all, `pgrep -fl bin/mamekit.js` until empty before rerunning; if a "missing graph.json" closure error follows, `rm -rf .cache/targets` (all entries from the collision window are suspect) and regenerate from source.
