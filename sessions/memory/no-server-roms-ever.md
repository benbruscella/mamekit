---
name: no-server-roms-ever
description: "Hard directive: the app must NEVER read ROMs from the server/filesystem — drop-zone + browser IndexedDB only"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7daada0d-2bc1-4df2-9a32-20e84fa4451c
---

On 2026-07-06 Ben ordered: "stop reading roms from local anything!!!!!" — the
product must never auto-load ROMs from any server path or URL. Implemented on
branch 10-juno-first: no `/roms` server mount, no `romUrl` in configs, no
fetch in the shell; the ONLY ROM sources are the user's drag-drop (verified
against the graph manifest) and the browser's IndexedDB copy of a previous
drop (`src/runtime/romstore.ts`). Menu covers/tile art read from the same
store; `hasRom` is computed client-side.

**Why:** legal posture for mamehistory.com and a single code path everywhere —
dev must behave exactly like production (an earlier `roms→_roms` symlink I
made to ease testing violated this and annoyed him).
**How to apply:** never reintroduce a ROM fetch/mount/symlink in app code or
serve.ts. Dev-time HEADLESS test harnesses reading `_roms/` in scratchpad
scripts are still fine (verification needs bytes) — just never in the product.
See also [[local-roms-and-artwork]].
