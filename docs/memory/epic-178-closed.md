---
name: epic-178-closed
description: "#178 closed 2026-11-17 via #262/PR #266; architecture.spec guards are now must-be-empty, no exception lists"
metadata:
  node_type: memory
  type: project
  originSessionId: e93bbe5b-b540-4d55-a59c-1da2ab8f3d2e
  modified: 2026-11-17T01:05:32.829Z
---

#178 (generate all hand-written hardware) closed 2026-11-17 with PR #266 (`d34778ef`). The shrink-only lists in `src/runtime/architecture.spec.ts` became guards that must find nothing. `RETIRED_MODULES` and `RETIRED_NAMES` record deleted hand-hardware paths and identifiers. Only `HOST_BOUNDARIES`, `HOST_MODELS` and `SAVED_BOARD_FIELDS` remain as lists.

**Why:** the user wanted 178's fixes to be impossible to reintroduce. Empty shrink-only lists had gone vacuous: the `REPLACED_METHODS` and `SPECIALIZED` scans read code that no longer existed. Chip-family regexes (`/^(?:YM|AY|...)/`, `/^m680.../i`) also got past `DEVICE_TYPE_BRANCHES`.

**How to apply:** when retiring something, add its path or identifier to `RETIRED_MODULES`/`RETIRED_NAMES`. Never answer a failing guard with an entry. Open non-hand-code gaps go to #247 ([[outstanding-issue]]). A palette's byte order now comes from the owning CPU's compiled space at board build time, not from the compiler.
