---
name: cart-shelf-naming
description: Console cart shelves are MAME short names; how to file a set someone else named, and the reader-selection trap
metadata:
  type: feedback
---

User asked 2026-08-27 for ColecoVision dumps to match the NES convention.

**The convention:** the file ON DISK is the MAME software-list short name
(`carnival.zip`), and `_manifest.json` records the name it arrived with in
`file` plus the filed name in `target`. The shelf reads `target ?? file`, so
long names DO work — but consistency is what the user wants.

Filing is now `make -C .data roms-import` ([[rom-library]], #162) for every
system at once, from `.data/roms/_new/`; originals park in `_new/_imported/`.
Unmatched dumps are no longer kept on the shelf: tidy quarantines them.

**Why the trap matters:** I first chose the cartridge reader by sniffing the
bytes ("does this parse as iNES?"). `parseINes` ACCEPTS some ColecoVision
`.bin`s, so the NES matcher graded one against the ColecoVision catalog and
produced a bogus `verified`. Pick the reader from `catalog.interface`
(`nes_cart` vs `coleco_cart`) — a list property, not a guess about bytes. The
same rule now selects the console room's reader.

**How to apply:** verified = every declared chip CRC matched, and only that may
claim the verified tier. A dump matching all but the last chip is a `variant` —
common between TOSEC sets and MAME for ColecoVision — file it under the short
name but store it whole, since its real chip boundaries are unknown.
See [[coleco-milestone]].

**Chip file names do not sort into load order.** MAME's ColecoVision set for
Motocross Racer is `mtcracera.1` and `mtcracer.2` -- the second chip sorts
FIRST. Reassembling a softlist set by file name there yields a cartridge that
boots into nothing. Match each chip by CRC and place it at the offset the
catalog entry declares (`cartImageFromSoftlistSet`, mirroring
`inesFromSoftlistSet`). Verified across the whole coleco shelf: all 134 filed
zips reassemble to their original image.

**Parked originals used to look like a rom set** to `make -C .data sets`; the
SETS rule now prunes every `_*` folder, so `_new/` and `_quarantine/` never sync.

**A console's BIOS now lives at `.data/roms/consoles/<system>/bios/<set>.zip`**
(#162, the user's call), mirroring `computers/c64/bios/`. `machineSetDir()` in
src/runtime/rom-source.ts is the rule the shell's web search, the harness and
the CI fetcher share; an arcade set stays at `arcade/<set>.zip`.
