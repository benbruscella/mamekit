---
name: frugal-blast-radius
description: "After runtime-wide fixes: derive the impacted-game list from the change's mechanism and hand it to the user to test by ear/eye — don't burn tokens on full sweeps or clean-tree bisects per game"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 07afc189-1d46-4696-a6fb-e06868efcf42
  modified: 2026-08-20T06:51:12.535Z
---

After a runtime/compiler change, do NOT run the full 65-game acceptance sweep
or per-game clean-tree bisects to classify failures — the user stopped a sweep
for exactly this reason (2026-08-18), and stopped a SECOND one on 2026-08-20
with "stop! just focus on one game at a time".

**This applies to golden maintenance too, not just diagnosis.** Even when a
runtime-wide fix legitimately shifts many goldens, do not sweep to find them
and do not mass re-record on your own initiative. Fix and re-record ONLY the
game under investigation, then TELL the user which mechanism moved and let
them decide. On 2026-08-20 the user answered that report with a plain
"ok, re-record" — so a batch re-record is fine once ASKED for, just never
assumed. When batch-recording, always exclude [[known-broken-targets]];
re-recording those would enshrine broken behavior as the reference.

**Why:** sweeps and stash-cycle bisects cost enormous tokens/time, and the
user can verify a game by playing it in seconds. Acceptance failures also
conflate "broken before" with "golden shifted by an intended fix", so the
sweep result still needs human eyes/ears anyway.

**How to apply:** run `npm run blast-radius` (tools/blast-radius.ts, built
2026-08-20 for exactly this). It reads dist board.jsons and answers which
machines compose a given device/signal/handler/CPU/sound mechanism, printing the
`MAMEKIT_E2E_GAMES=...` command for exactly those. Query the MECHANISM changed,
not the file edited — a generic src/runtime module reaches every machine and the
tool says so. Then verify ONE representative deeply (against the real MAME
binary when possible — [[mame-reference-capture]]) and hand the user the rest as
a named test list. Record untriaged failures in [[known-broken-targets]].

On 2026-08-20 this turned a 47-game question into 7 candidates, of which only
one had actually moved.
