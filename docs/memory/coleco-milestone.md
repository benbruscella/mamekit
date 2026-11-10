---
name: coleco-milestone
description: ColecoVision (issue #95) — what landed 2026-08-27, what is left, and the one external blocker
metadata:
  type: project
---

Branch `95-add-support-for-colecovision-console`, 2026-08-27. `coleco` is in
REQUIRED_TARGETS and reports **Playability: executable, Basis: source-complete,
zero gaps**; `audit:generated` passes with 58 targets.

**Landed, all source-derived, no handwritten hardware:**
TMS9928A (28/28 methods, renders — its own VRAM space, palette pens, scanline
timer); SN76489A; Z80; the cartridge slot with all nine MAME PCBs and megacart
banking; COLECO_EXPANSION; the 238-cart `coleco.xml` catalog.

**Not done:** ColecoVision keypad/joystick input model (coleco_m.cpp paddle
scanning compiles but is not wired) — Donkey Kong sits at its option screen
waiting for a keypad press. Per-cart art/history, and CART_GAME_SUPPORT.coleco
is still empty so every cart grades `experimental`.

**Console room is now console-neutral** (2026-08-27): reader chosen by the
catalog's `interface`, flat-cart resolution in `src/runtime/cart-identify.ts`,
`defaultSlot`/`romRegion` in the cart config, and `runShell` merges a
cartridge ON TOP of the machine romset when the machine needs ROM files.

**BIOS arrived 2026-08-27** at `.data/roms/consoles/coleco.zip` (crc 3aa93ef3,
inner file `coleco.rom` — matched by CRC, the name need not be MAME's). It
boots: the BIOS title screen renders pixel-correct and Donkey Kong reaches its
option screen. Two BIOS variants the user also supplied (`colecoa` 39bb16fc,
`svi603` 19e91b82) are NOT MAME romsets and live at `.data/roms/consoles/`.

The machine romset goes at `.data/roms/<category>/<game>.zip`, NOT inside the
cart set directory — the cart shelf is `.data/roms/consoles/coleco/`.

**Why:** the VDP work was deliberately built for reuse — TMS9929A derives its
PAL geometry from the constructor flag alone, so SG-1000/MSX need no new code.

**How to apply:** when the BIOS arrives, boot it, then add `src/games/coleco.ts`
+ spec and move coleco out of the hand-listed console block in targets.ts.
See [[silent-mislowering]] for the gauntlet bug this work exposed.
