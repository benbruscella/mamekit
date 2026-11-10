---
name: kept-set-requirements-232
description: "#232: user chose clearing kept sets over a panel control; clear only when requirements changed since kept AND the set no longer meets them"
metadata:
  type: project
---

#232 (2026-11-01): `RomRecord.requires` (`romRequirements` in shell.ts) stamps dumped chip CRCs + sample sets; `clearOutdatedRomSet` clears only if the stamp moved and the set no longer meets it. Mismatch alone would loop: a set accepted short, or a machine played without optional samples, would be re-asked every boot. Media slot and card firmware are excluded, or C64 tape/disk titles read as a requirement change.

**Why:** user's framing was "if the ROM requirements have changed since save". I first built a panel control, additive zips and CRC prompts; the user stopped it and picked the issue's own clearing proposal, so that design was discarded.

**How to apply:** a set with no stamp (kept before this) is graded once, so it can be cleared once. Related: [[browser-memory-rom-library]], [[media-slots-on-demand]], [[samples-228]].
