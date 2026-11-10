---
name: dist-rebuild-breaks-sweeps
description: "Any dist rebuild mid-sweep silently invalidates every acceptance result after it — sequence code changes, then gen:all, then the sweep, untouched"
metadata:
  node_type: memory
  type: feedback
---

`node bin/mamekit.js <target>` and `--build-runtime`/`--build-app` all
rewrite `dist/runtime` and `dist/app` from the current tree. An acceptance
sweep reads those, so a rebuild started while the sweep is running turns
every remaining game into a contiguous block of bogus FAILs.

**Why:** it looks exactly like a real regression — a long run of failures
starting at whatever game was next — and it cost two full 40-minute sweeps
on 2026-09-01 before the pattern was recognised.

**How to apply:** finish every code change first, then `npm run gen:all`,
then `npm run audit:generated`, then start the sweep and do not touch
`dist` until it prints its last line. If a result must be re-checked
mid-flight, re-run that one game after the sweep instead. A contiguous run
of failures beginning mid-alphabet is the signature of contamination, not
of a regression. See [[dist-rebuild-pitfalls]].

**The e2e suite is a rebuild too** (2026-10-19): Playwright's webServer is
`bin/mamekit.js --serve`, which recompiles the app from the current tree
before it listens. Started beside an acceptance run it deleted
`dist/app/registry.js` mid-flight and six C64 scenarios died with
ERR_MODULE_NOT_FOUND. Run e2e and acceptance one after the other, never together.
