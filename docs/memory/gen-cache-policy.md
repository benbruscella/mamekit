---
name: gen-cache-policy
description: "caching rules for gen:all — local .cache/ tagged with MAME rev is OK, committing MAME-derived artifacts is not"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 858e9d66-004f-453b-afcb-7a9076334a23
  modified: 2026-08-18T03:53:43.960Z
---

The user rejected committing any MAME-derived data (credits, CPU IR, device extractions) into the mamekit repo — that reads as "porting MAME into mamekit" and violates [[compiler-not-porter]]. A local, gitignored `.cache/` is acceptable **only if** every entry is identifiable against the exact MAME source it came from (tagged with the MAME checkout's HEAD revision) and `gen:all` quickly verifies tags before reuse, pruning stale entries.

**Why:** mamekit's identity is a compiler that derives everything from MAME source; committed derived artifacts blur that. But provenance still matters — an unidentifiable cache means "we don't know what went with the build."

**How to apply:** memoization lives in `.cache/` (`src/gen/gen-cache.ts` is the shared module; `driver-history.ts` the first user). Identity = (MAME HEAD rev, sha256 of src/bin/tools + curated-data signature); coarse keys on purpose — over-invalidation is the safe direction. `gen:all` runs a fast pre-step that verifies and prunes, then auto-heals stale pieces in the same run (user explicitly REJECTED fail-on-drift + a separate cache:update command — one command, no failure mode). `test:generation` must always run uncached (MAMEKIT_NO_CACHE=1) — it is the proof generation still works from scratch. As of 2026-08-18 the full tier is implemented and approved: warm gen:all ≈ 3s, uncached ≈ 2:45; warm output proven byte-identical to uncached modulo generatedAt/buildId/`?v=` stamps.
