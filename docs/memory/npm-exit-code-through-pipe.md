---
name: npm-exit-code-through-pipe
description: `npm run test:games | tail` reports tail's exit status — a crashed suite looks green
metadata:
  type: feedback
---

`npm run test:games` is a shell `for` loop with `|| exit 1`, so it stops at the
first failing game. Piping it (`| tail -60`) hands back **tail's** status, not
npm's: a run that died on game 21 of 56 printed `[exited with code 0]`.

**Why:** no `pipefail` in the default shell used for these commands, and the
per-game loop means a mid-suite crash leaves plenty of earlier "contract
passed" lines to look convincing.

**How to apply:** redirect to a file and echo `$?` instead of piping —
`npm run test:games > log 2>&1; echo "EXIT=$?"` — then count
`grep -c 'contract passed'` against the expected target count before calling it
green. Same trap applies to `gen:all` and `test:unit`.
