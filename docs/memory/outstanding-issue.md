---
name: outstanding-issue
description: Known-but-unfixed gaps live in GitHub issue #247, not a docs file (docs/OUTSTANDING.md deleted 2026-11-11)
metadata:
  type: feedback
---

Follow-ups found during development (measured, explained, not fixed) go into GitHub issue #247 "Outstanding: known gaps found during development". The user asked on 2026-11-11 to move every docs/OUTSTANDING.md entry there and delete the file: "I will track stuff there".

**Why:** the user tracks follow-ups in GitHub, not in a committed doc.
**How to apply:** add new entries to #247's body, editing the body itself rather than adding comments. Since 2026-11-19 (user's choice) the body is grouped PER GAME (one `###` per machine), then CROSS-CUTTING (speed and CI floors, scheduler and runtime, sound measurement, compares, tooling), then DONE (struck one-liners with the fixing PR). Each entry keeps its old number in brackets as a stable ID, and a new entry takes the next free number. The user questioned why the repo cites #247 at all (about 20 `minimumFps` comments in src/games/*.game.ts say `(issue #247, 5.2)`); don't add new code references to it, and prefer self-contained comments. Never recreate docs/OUTSTANDING.md, and never duplicate follow-ups into the feature issue. Related: [[sound-242]], [[issue-progress-comments]].
