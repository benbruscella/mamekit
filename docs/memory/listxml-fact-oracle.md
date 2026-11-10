---
name: listxml-fact-oracle
description: "npm run audit:facts diffs generated machine facts against MAME's own -listxml; the five shape mismatches that make a naive comparison useless"
metadata:
  type: project
---

`npm run audit:facts` (`src/gen/audit-facts.ts`, added 2026-09-11 for #138) asks
a real MAME binary for `-listxml` and diffs it against every generated machine's
names, year, manufacturer, driver file, screen timing, CPU clocks and ROM loads.
Nothing else checks these: **no acceptance golden looks at metadata**, so a
misparse ships silently. Needs `MAME_BIN` matching the checkout's release, and
refuses outright on a version mismatch (see [[mame-reference-capture]]).

First run: 175 "disagreements" across 78 machines, **173 of them shape mismatches,
not bugs**. Comparing like with like is the whole job:

1. **ROM size** — MAME states one `size` per chip covering `ROM_LOAD` +
   every `ROM_CONTINUE` + every `ROM_IGNORE`. Ours splits: `size` is the first
   slice, `continueSegments` the rest. ROM_IGNORE was not recorded at all until
   this work added `ignoredBytes` through parse -> graph -> config.
2. **Device clocks are u32** — MAME prints 1789772 where ours is 1789772.625;
   compare truncated ([[device-clock-u32]]).
3. **`chip type="cpu"` is not the board's CPU list** — it is every device with an
   execute interface: VIC-II, CIA, POKEY, 8257 DMA, Namco MCUs. Comparing set
   membership produced 27 false "the board does not model" failures; only compare
   clocks of tags both sides name.
4. **BIOS alternatives** — `<rom bios="euro-s1">` entries are selectable; a board
   loads one, never all 30 (c64 kernals, Neo Geo mainbios).
5. **Alternate sets** — our `alt[]` carries sibling-set chip names for the same
   slot; match any of them, not just `file`.

Genuine modelling differences print as divergences (`~`) and do not fail: MAME
renders the Galaxian family 3x wide (`GALAXIAN_XSCALE = 3` in galaxian.h) for
sub-character stars, we render the board's own 256 px. Detected structurally (the
whole horizontal axis scaling by one integer), not by a game list. Tutankham is
the odd one: our config already carries MAME's scaled htotal with a 1x width.
