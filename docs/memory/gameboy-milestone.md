---
name: gameboy-milestone
description: "Game Boy (issue #102, PR #110) — plays with sound at 69 fps as of 2026-09-02; the gaps it exposed and what is still open"
metadata: 
  node_type: memory
  type: project
  originSessionId: 8b896811-b929-4032-8912-a008d3064819
  modified: 2026-08-31T06:47:06.588Z
---

Branch `102-add-support-for-gameboy-console`, PR #110, 2026-08-31, off main at
957f4ae (a2600 #100 merged). `gameboy` is in REQUIRED_TARGETS and reports
**Playability: executable, Basis: source-complete, zero gaps**;
`audit:generated` passes with 60 targets.

**Landed, all source-derived:** LR35902 (no opcode DSL — 256 `case` labels in
`opc_main.hxx`/`opc_cb.hxx` included into `execute_run`'s switch, written
against C preprocessor statement macros; resolved and expanded, then lowered);
DMG_PPU 31/31 methods; DMG_APU 26/26; the cartridge slot with 17 boards (the
ones `hash/gameboy.xml` names — MAME declares 35 for the slot but a third
belong to gbcolor/megaduck); 1,743-cart catalog; the DMG cartridge shell in the
console room, chosen from `gameboy_cart`.

**Verified:** the board boots, runs a synthetic cartridge at ~30 fps in Node,
and paints 160×144 in MAME's own `palette_gb[0]`. `cpu-compiler.spec.ts` runs
real LR35902 instructions incl. CB-prefixed; `gameboy.spec.ts` mounts a
cartridge and reads back MBC1/MBC5 bank windows.

**Boot ROMs arrived 2026-08-31**, all five machines, every one matching MAME's
CRC *and* SHA1: `.data/roms/consoles/gameboy.zip` (dmg_boot.bin 59c8598e +
dmg_v0.rom c2f5cc97), plus `supergb.zip`, `supergb2.zip`, `gbpocket.zip`,
`gamefgtr.zip`. These are machine romsets, not cartridges, so
`tools/import-new-roms.ts` does not apply -- it matches a software list. There
were no Game Boy cartridges anywhere in `_new/` (checked by scanning every file
for Nintendo's logo at 0x0104, not by name).

Artwork at `.data/artwork/gameboy.zip` (MAME bezel pack, DMG shell in seven
colours + default.lay) and `media/consoles/gameboy.png` + `.webp` via
`make images` in `.data/`.

**2026-09-02: it plays.** Super Mario Land runs World 1-1 with music and
sprites, Tetris takes input and plays; 68.9 and 76 fps in Node *with* audio.
The APU register writes match real MAME 0.289's own write tap byte for byte,
and the mix matches its recording (mean 0.2281 vs 0.2292, rms 0.0941 vs
0.0982). Four gaps did it, none of them Game-Boy-specific — see
[[declared-member-widths]], [[free-function-lowering]] — plus the sound plan
(DMG_APU matched no sound kind at all) and the `space()` binding that had every
OAM DMA writing zeroes. The frame rate came from
[[runtime-cost-of-declared-types]].

**Two open threads:**
1. The dump is on the shelf but the machine cannot reach it: the boot ROM is
   mapped through a `memory_view` (`install_view(0x0000, 0x08ff, m_boot_view)`
   in machine_start), which the compiler does not model, and
   `parseInstalledHandlers` cannot see `m_boot_view[0].install_read_handler(...)`.
   The generated CPU map has nothing at all below 0x8000 -- the cartridge
   installs there -- so the `maincpu` region is unreferenced and a cartridge
   starts at 0x0000 instead of being handed over to at 0x0100. Verified by
   booting with the real dmg_boot.bin: bus 0x0000 reads the cartridge, PC ends
   up at the cartridge's own entry.
2. The PPU draws nothing but a flat background — see [[device-machine-time]].

**Why it took twenty compiler fixes:** none were Game Boy quirks; all were
plain C++/MAME shapes the compiler had not met, and every one was silently
wrong rather than an error. The big ones: an inline method spelled
`override ATTR_COLD` was invisible to the AST; `.ipp` bases were never
followed; class-scoped constants were flattened per file (PAGE_ROM_SIZE is
declared five times in one header with three values); type template parameters
stayed bare identifiers so `T(mask)` answered a reference. See
[[handler-ir-cpp-gaps]] for the same lesson from the 2600.

**How to apply:** when picking up, start with the PPU time base — it is the
only thing between "runs" and "plays". The boot ROM is second and needs the
dump anyway.
