---
name: rom-library
description: "#162 ROM library (tools/rom-library.ts, make roms-*): blank-bank false matches, console BIOS now in <system>/bios/, the c64_flop 404, the _new sync leak, and which arcade device sets nothing loads"
metadata:
  node_type: memory
  type: project
  originSessionId: 48ce1a71-88b7-4918-b37e-fb90be27a184
  modified: 2026-10-18T03:07:06.454Z
---

Built 2026-10-18 for issue #162: `tools/rom-library.ts` (+ `tools/rom-library/`) replaced `import-new-roms.ts` and `softlist-coverage.ts`. `.data/Makefile` wraps it as `roms-status`, `roms-missing`, `roms-import`, `roms-tidy` (DRY=1). Inbox is `.data/roms/_new/` (not consoles/_new); quarantine is `.data/roms/_quarantine/` with `quarantine.jsonl`.

Non-obvious findings:
- **Blank banks fake cross-system matches.** C64 CRT chips "matched" coleco:linklogc/skiing because both lists catalogue an all-$00/all-$FF 8K chip. Uniform-byte chips are never evidence; listed blanks are synthesised once real chips name the set (this also turns coleco 8K "variants" into verified sets).
- **Console BIOS moved** to `consoles/<system>/bios/` (user's call). `machineSetDir()` in src/runtime/rom-source.ts is the one rule; shell, harness and fetch-acceptance-roms use it, with the old `consoles/<set>.zip` key as a fallback until the bucket is synced.
- **c64_flop shelf 404'd**: the manifest said `c64_flop_misc/fcc.zip`, the folder was `c64_flop/`. Tidy renames list folders to their list name (`c64_carts`→`c64_cart` too) and rewrites archive keys.
- **`make sync-roms` would have uploaded `_new/`**: SETS now prunes `_*` folders.
- The old importer wrote chip names with literal `&amp;` (no unescape); re-importing adds the correct name.
- No generated board loads `m68705p5.zip` or `votrsc01a.zip` (arkanoid/qbert device ROMs), so tidy quarantines them; colecoa/colecob BIOS chips aren't in coleco's alt list either. gbpocket/supergb/gamefgtr ARE accepted alternates.
- Console room quirk, unfixed: `identifyCartImage` ignores image size, so a2600 `homerun4k` (4K mirror of 2K) reads as `homerun`.
- TAP files are analog captures, so other collections rarely match MAME's c64_cass CRCs (Tapes.zip: 55 of 7,259).

**How to apply:** "supported" = contracts + each target's config.json; never add a system list. The user wants to run the moving commands themselves — see [[run-data-commands-yourself]]. Related: [[cart-shelf-naming]], [[computer-software-room]].
