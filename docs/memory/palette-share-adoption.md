---
name: palette-share-adoption
description: "Whether palette_device's RAM *is* the board's share is a fact of the address map: adopt only a share the bus never writes (wardner yes, gauntlet no)"
metadata:
  type: project
---

2026-09-13. MAME spells both arrangements, and guessing by device tag gets one
of them wrong:

- **Wardner**: `0xa000-0xafff` is mapped **write-only through the device**
  (`.w(palette, write8)`) and readable through `m_rom_ram_view[0]` as a
  **read-only** share. Nothing on the bus ever stores into that share, so
  `palette_device::write8` is its only writer — they must be one buffer, or the
  power-on RAM test walks a bit through 0xa000, reads back zero, and the board
  hangs on **"LRAM ERROR"**.
- **Gauntlet**: `map(0x910000, 0x9107ff).ram().w("palette", write16)
  .share("palette")`. The bus stores the word *itself* and the device keeps its
  own copy. Adopting the share there took the palette from **1020 of 1024
  entries matching real MAME to 891**, and moved 0.26% of pixels.

So `GeneratedRamPalette` adopts `shares[plan.tag]` only when no address-map
range declares that share as writable `kind: "ram"`
(`generatedBusWrittenShares`). Note `adopt` returns `share.subarray(0, bytes)`,
so `ram === share` is false even when adopted — compare contents, not identity.

**The oracle that settled it** (and the only one that would have): dump the
palette window from real MAME with a Lua frame notifier + `sp:read_u16`, dump
ours the same way, and count differing entries. Immune to attract-animation
frame phase in a way screenshots are not.

**Two traps I hit getting there:**
- A scratch PNG writer that assumes RRGGBB **swaps red and blue** — our
  framebuffer is canvas order `0xAABBGGRR`. It made gauntlet's correct orange
  dungeon look blue and sent me hunting a palette byte-order bug that did not
  exist. Already warned in [[mame-reference-capture]]; I tripped on it anyway.
- Reading board RAM back through `bus.read(addr)` disagreed with MAME for the
  palette window while agreeing for every other share. Read the share array
  directly (`board.shares[tag]`) before believing a byte-order difference.
