---
name: dont-wipe-served-dist
description: "Work in the user's own tree and dist; never wipe dist (gen:all) while they test, and never verify in side trees"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 26e89b02-db13-4833-a616-26447555a59f
  modified: 2026-10-20T23:45:44.581Z
---

Use the user's own tree, not scratchpad side trees, worktrees or `.cache/dev` copies. Rebuilding `dist` (even `npm run gen:all`, which deletes it first) is fine — but always tell the user, because they serve from `dist`.

**Why:** On 2026-10-21 (issue #165) my background gen:all runs repeatedly wiped `dist` under `npm run serve` ("no compiled app at dist/app"). When I then proposed isolated scratch builds instead, the user said "STOP DOING THAT, USE MY TREE".

Then clarified: "YOU CAN DO IT JUST LET ME KNOW" and "use my code, not a copy for yourself" (no git worktrees of main, no copied runtime modules, no scratch checkouts to test against).

**How to apply:** Make fixes in the user's tree. Before a gen:all or any rebuild of `dist`, say so ("dist is down for ~N minutes"), and say when it is back. Whenever anything runs in the background, say so up front in plain words (what it is, whether it touches dist, roughly how long), and say again when it finishes — the user said "if you do it in the background let me know FFS". See [[serve-from-dist]].
