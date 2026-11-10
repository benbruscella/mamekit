---
name: sixteen-bit-bank-window
description: A .bankr() window read through the native-16-bit handler adapter returns every other byte; also the cold-MAME nvram rule for reference captures
metadata: 
  node_type: memory
  type: reference
  originSessionId: 65975871-f4bc-4587-8e45-46ca4ebadb94
  modified: 2026-08-26T02:25:53.627Z
---

`src/runtime/bus.ts` adapts a handler on a 16-bit bus by *word*: MAME's
`read16` handlers are indexed by word offset, so the adapter passes
`offset >>> 1`. A memory bank is not a handler — it is byte-addressed storage,
like the rom and ram ranges beside it. Reading one through the word adapter
returns every other byte, which looks like plausible-but-wrong data, not like
a crash.

Fixed 2026-08-26 (issue #88) by carrying `bank` on the range spec
(`kg` `bankRead`/`bankWrite` → `RangeSpec.bank`) and skipping the word
adapters for it. Gauntlet's slapstic window was the first 16-bit `bankr` in
the tree, so nothing had exercised it.

Two more from the same session, both general:

- **`COMBINE_DATA(m_share)` wrote nothing.** `applyCombineData` required a
  `GeneratedPointer` and a memory share is bound as the array itself. It only
  ever looked correct because most such ranges are `ram` and the Bus stored
  the byte anyway; a *write-only* range with a share (`.w(FUNC(xscroll_w))
  .share(m_xscroll)`) has nothing else to store it, so the register stayed at
  power-on forever.
- **A 16-bit CPU binds its shares as `Uint16Array`.** `bindGeneratedShareState`
  picks the view from the bus width, so a direct screen shape that reads
  `bytes[i * 2] | bytes[i * 2 + 1] << 8` reads two *words* on such a board.

**MAME reference captures must clear nvram.** The user's MAME keeps
`nvram/gauntlet`, and a warm EEPROM skips ~330 frames of cold boot, so a warm
capture diverges from ours for reasons that have nothing to do with emulation.
Always run reference captures with `-nvram_directory <empty dir>` and delete
it between runs — MAME writes the file back on exit.
