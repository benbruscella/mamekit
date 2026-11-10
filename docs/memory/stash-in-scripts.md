---
name: stash-in-scripts
description: Never stash the user's tree inside a long background script; it is unsafe against a second copy and silently mislabels what it measures
metadata:
  type: feedback
---

Don't run `git stash` / `git stash pop` from a long unattended script in the user's tree.

**Why:** on 2026-11-01 (#228) the user pasted my script from the tool display and ran a second copy. That copy popped the stash after about a minute, so my copy's "clean main" build and measurements ran on the branch without noticing. Its later pop targeted the user's unrelated old stash and failed only because their tree was dirty. It also overwrote the backup patch with 0 bytes.
**How to apply:** ask first. Name the stash by hash and pop only that hash, refuse to run if a lock exists, verify `git rev-parse HEAD` and a clean diff before measuring, and refuse to overwrite a backup with an empty one. Prefer CI for a clean-main answer. Related: [[dont-wipe-served-dist]], [[samples-228]].
