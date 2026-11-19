---
name: data-inbox-159
description: "#159: user drops everything new in .data/_input/; make import routes it; make bucket-tidy quarantines bucket strays; cover crop lessons"
metadata:
  type: project
---

2026-11-20, issue #159: the user said "from now on I will shove all new things into .data/_input" and wants us to maintain roms/, samples/ and artwork/ from it. The user runs `make sync` themselves when we're done.

- `make import` (tools/rom-library.ts) routes by content: .wav zip → samples, .lay zip → artwork/<game>.zip, image zip under `_input/<system>/` → covers, else ROM identification.
- `make bucket-tidy DRY=1` lists bucket objects with no local file. A real run moves them to `_quarantine/<key>` in the bucket. The user asked for this because `make sync` never deletes. The first dry run found 788 strays (old artwork/bezels/, renamed rom folders).
- .data/Makefile is gitignored, so a PR can't carry it; it reaches the bucket only through `sync-makefile`.

Cover lessons: a third of Cover.zip is unfolded scans, and a fixed J-card crop (0.625×H) cut disk sleeves, whose fronts are about 0.95×H. Fold detection (the column with an edge on the most rows, left-most near the max) is right on most scans. Mastertronic's full-height label band still fools it (Rogue, Continental Circus). The tile shows a cover whole at its own aspect, never object-fit:cover.

**Why:** the user owns .data; one inbox keeps it tidy.
**How to apply:** new data → `_input/`, dry-run `make import DRY=1` first. Related: [[rom-library]], [[run-data-commands-yourself]].
