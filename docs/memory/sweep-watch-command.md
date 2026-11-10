---
name: sweep-watch-command
description: "Whenever a sweep or long batch starts, give the user a ready-to-paste command to watch its progress"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 1b14ea03-9a4c-487e-a7aa-a32fb4d4b990
  modified: 2026-11-01T00:42:20.891Z
---

Every time I start a sweep or other long batch run (acceptance sweep, multi-target compare), give the user a copy-paste terminal command that shows live progress, with the full absolute path to its log, in the same message that says it started.

**Why:** on 2026-11-01 (#228) I started an acceptance sweep in the background and said only that it was running; the user asked "give me sweep watch command always".
**How to apply:** make the sweep write to a progress file, and hand over a `while`/`clear` loop rather than `watch`, which macOS doesn't ship. Show done/total and the failures so far. Related: [[ask-before-mame-sweeps]], [[dont-wipe-served-dist]].
