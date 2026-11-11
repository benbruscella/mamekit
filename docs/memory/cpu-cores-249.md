---
name: cpu-cores-249
description: "#249 (items 38–41 of #178, CPU support layers): user decisions, baseline ff52ccd9, branch 249-3841-compile-the-cpu-cores"
metadata:
  node_type: memory
  type: project
  originSessionId: e2f1d4b1-4272-4ec9-b23a-625923bd3304
  modified: 2026-11-11T06:32:51.655Z
---

#249 started 2026-11-11 on branch `249-3841-compile-the-cpu-cores` (from main ff52ccd9).

**User decisions (2026-11-11):**
- ONE PR for all four items; commit core by core.
- EVERY hand CPU layer is in #249 (user: "update the issue with all scopes"): issue body rows 41a–41i = MCS-48, I8080/I8085A, Z80 refresh_en/nomreq_en, LR35902, TMS320C10, TMS34010 (tms34010-compiler.ts hand step, budget 256, empty shape check), shared execute_run/clock dividers/widths/CPU_INTERNAL_ROM, register-union classes (Pair*/WordByteRegisterFile/Z8000RegisterFile/Xy*), Namco 51xx/53xx HLE protocol compilers (spec-only, delete).
- 68000 core: user "not sure". Plan: compile Musashi's support layer from m68kcpu.h first (68010 needs it anyway), measure, then put the microcoded `m68000_device` choice back to the user. Don't start m68000_device unasked.
- Baseline: full `oracle:baseline record --jobs 4` from ff52ccd9 approved ("Record now"). dist was stale (built 15:10, before Sound 18 and the Node bump), so it ran a clean gen:all first (code-shaped .cache dirs cleared).

Guard draft: scratchpad cpu-guard.ts (TS-AST scan; 321 layer entries + 52 facts at ff52ccd9); extend to tms34010/namco5x compilers.

**Why:** the user owns scope and PR shape; see [[confirm-scope-on-open-questions]], [[sound-242]].
**How to apply:** no new branches; don't edit src or rebuild dist while the record runs ([[board-devices-237]] trap). Related: [[mame-baseline-204]], [[musashi-prefetch-slapstic]], [[m68k-icount-cycles]].
