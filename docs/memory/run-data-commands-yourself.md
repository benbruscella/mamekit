---
name: run-data-commands-yourself
description: "For .data/ ROM library work, build and dry-run the commands but leave the real moves (import, tidy) for the user to run; never delete, only quarantine"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 48ce1a71-88b7-4918-b37e-fb90be27a184
  modified: 2026-10-18T03:07:10.646Z
---

During #162 the user said "I want to run the commands" and "quarantine files ... don't delete anything though".

**Why:** `.data/roms` is the user's irreplaceable local library and the source of the public bucket; a moved or lost dump changes what the site serves.

**How to apply:** verify with DRY=1 runs and with real runs against scratch copies (hardlinks into the scratchpad avoid copying multi-GB inputs), then hand the user the exact `make -C .data ...` commands. Anything a tool takes out of a shelf goes to `.data/roms/_quarantine/` with a logged reason, never `rm`. See [[rom-library]].
