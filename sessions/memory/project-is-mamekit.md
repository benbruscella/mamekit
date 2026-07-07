---
name: project-is-mamekit
description: The project is named mamekit (renamed from mame2js 2026-07-07); local dir may still be ~/Projects/Github/mame2js
metadata: 
  node_type: memory
  type: project
  originSessionId: 7daada0d-2bc1-4df2-9a32-20e84fa4451c
---

On 2026-07-07 the project was renamed **mame2js → mamekit** (issue #11):
GitHub repo is `benbruscella/mamekit` (old URLs redirect), package/bin/CLI
are `mamekit`, debug handle is `window.mamekit`, storage prefix `mamekit:`.
Positioning (in README): "the source extraction, knowledge graph and browser
runtime toolkit behind MAME History (mamehistory.com)" — explicitly NOT a
MAME replacement / ROM site / universal C++ transpiler; curated "selected
arcade, console and computer systems". Ben removed the Provenance section
from the README — don't re-add personal-bio content there.

**Why:** naming/positioning is a deliberate product decision with specific
approved language; drifting back to "mame2js" or "transpiler-first" framing
undoes it.
**How to apply:** call it mamekit in code, docs, issues, commits. The LOCAL
checkout dir may still be `~/Projects/Github/mame2js` (renaming it is Ben's
call — it would also move this memory directory). Legacy browser keys
(`mame2js:*`, IndexedDB `mame2js-roms`) are purged by the menu — keep that.
Deferred from #11: hero machine page, status badges from structured data,
packages/ modularization, sponsor-a-machine. See [[no-server-roms-ever]].
