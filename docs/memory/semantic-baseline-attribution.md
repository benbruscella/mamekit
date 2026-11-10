---
name: semantic-baseline-attribution
description: "When audit:semantics says all 90 games changed, a new IR field or schema bump is usually why; build main in a worktree and path-diff board.json to find the few real changes"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 67117b21-ba25-42d2-a3ec-e8ce0cf3579f
  modified: 2026-10-15T02:45:38.813Z
---

`semanticFingerprint` hashes the whole board.json (minus `source` keys), so a new
top-level IR field or a `BOARD_IR_SCHEMA_VERSION` bump changes every target's
hash. On 2026-10-14 (sol-spike, `videoExecution` + schema 4→5) all 90 failed and
only 4 were real (Williams palette moved from `execution.paletteInit` to
`video.palette`).

**Why:** "90 changed" reads as a regression sweep; it was 86 cosmetic + 4 real,
and the 4 were found in minutes once compared against a real main build.
**How to apply:**
- `git worktree add --detach <scratch>/main-tree HEAD` (before the change is
  committed), symlink node_modules, `MAME_SRC=../mame npm run gen:all` there
  (~7 min). Main passing its own baseline proves the baseline was current.
- Path-level diff each target's `generated/board.json`, ignoring the new
  fields; tally paths → games. Only those games need real-ROM acceptance.
- If recomputing fingerprints, set `schemaVersion` back to the old value —
  deleting it still mismatches the recorded hash.
- When behaviour moves from runtime matching to compile time, re-run the old
  runtime matchers (from git) against the new boards and compare selections.
- Remove the worktree afterwards (`git worktree remove --force`).
- An identical board + identical selection is NOT proof the game boots: on
  2026-10-15 every CPS1 game threw at boot because the new lookup
  (`requiredHandler`) demanded an executable program the old body-match never
  needed (cps1_render_sprites never lowers; a stand-in replaces it). When the
  runtime *code path* changes, run that game's acceptance, whatever the IR diff says.
Related: [[ci-local-checks]], [[stale-main-dist-baseline]], [[frugal-blast-radius]].
