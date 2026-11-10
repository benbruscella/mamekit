---
name: ci-local-checks
description: Run `npm run test:current` (not just gen:all + audit:generated) before pushing — audit:semantics and audit:facts are CI gates I twice forgot
metadata:
  type: feedback
---

CI's "Clean generation and audit" job runs `npm run test:current`, which is
`gen:all && audit:generated && audit:facts && audit:semantics`. On 2026-09-19
I ran only the first two locally and pushed; CI failed on `audit:semantics`
(the recorded `src/games/semantic-baseline.json` hashes every board IR, so any
lowering change moves nearly every game, and new games are "missing from
baseline"). The "ROM-backed accepted contracts" job is only a gate: it fails
whenever the generation job did, so one failure looks like two.

**Why:** the user sees red CI, not my local greens.
**How to apply:** before pushing, run `npm run test:current`. For the facts
audit, point `MAME_BIN` at the 0.289 build
(`/Users/benbruscella/Google Drive/My Drive/Emulators/mame/mame0289-arm64/mame`)
or it skips with a version mismatch. Record the semantic baseline explicitly
(`npm run record:semantics`) only after reviewing the structural count changes
(devices/handlers per game) and passing the real-ROM sweep.
Related: [[tunit-board-lessons]], [[dist-rebuild-breaks-sweeps]].
