---
name: warm-cache-outlives-code
description: "A .cache entry keyed only by MAME revision silently serves the OLD shape after you change the code that writes it — bit twice in one session"
metadata:
  type: feedback
---

Every `.cache/` kind must key on **shape as well as MAME revision**. A revision
key answers "is this from the right MAME?" and says nothing about "was this
written by the current code?", so a warm cache keeps serving fields the code no
longer produces.

This bit twice on 2026-09-11 while doing #138:

- `src/gen/listxml.ts` gained a `bios` attribute; the already-cached parse had no
  such field, so 88 BIOS ROMs kept reporting as "MAME loads X, which the board
  never loads". Fixed with `PARSE_VERSION`.
- `src/gen/driver-history.ts` deliberately **stopped** emitting `topAuthors` and
  `authorStats` — and generated `meta.json` still contained both, straight out of
  `.cache/driver-history/<rev>/`. The whole point of the change failed silently.
  Fixed with `ACTIVITY_SHAPE_VERSION` on the cached entry.

The second is the dangerous direction: removing a field looks done everywhere in
`src`, `tsc` is clean, specs pass, and the old data reappears in `dist` anyway.
**After changing what a cached module emits, check the generated artifact, not
the source** — `node -e "require('./dist/games/arcade/<g>/meta.json')"` — or
delete the cache subtree. See [[gen-cache-policy]] and [[gen-cache-masks-breaks]].
