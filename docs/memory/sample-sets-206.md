---
name: sample-sets-206
description: "#206: config.json `samples` lowered from set_samples_names; samples-import/status; tidy keeps MAME-run device sets via listxml deviceSets; congo.zip is a stale set (congaa/congab vs congal/congah)"
metadata:
  node_type: memory
  type: project
  originSessionId: e3b67b4a-434a-49e2-a5ae-44cc18576a32
  modified: 2026-10-27T07:54:50.422Z
---

#206 (2026-10-27, branch `206-sample-sets`, PR #209).

- Sample names are generated: `config.json` `samples: [{tag,set,names}]` from `set_samples_names`. `audit:facts` checks them against listxml.
- `make -C .data samples-status`, `samples-import [DRY=1]` and `sync-samples` (private). `roms-status` has a samples row.
- tidy keeps arcade zips that MAME's own run needs (listxml `deviceSets`, e.g. votrsc01a for qbert). It reads `MAME_BIN` or the warm `.cache/listxml/0.289` (PARSE_VERSION 3). With neither, it leaves such zips in place rather than quarantining them.
- I deliberately did NOT fix our graph missing `VOTRAX_SC01A(config.replace(), ...)`. The shell treats every device-set region as required, so lowering it would make the browser demand votrsc01a.zip and would change qbert's speech.
- **congo.zip was stale:** it held congaa/congab, but MAME 0.289 wants congal/congah. The user replaced it, and I re-took congo's audio into baseline 090275cf on 2026-10-27.
- **Baseline redo trap:** a dist `buildId` is a gen timestamp (hrtime), so any gen:all made a baseline un-redoable. PR #209 (d1282e6d) drops buildId from the `--redo` identity check. A redo still has to run from a commit whose src tree equals the baseline's: detach to main, commit the tool change there temporarily, gen:all, redo, switch back, gen:all.

Related: [[mame-baseline-204]], [[rom-library]], [[run-data-commands-yourself]].
