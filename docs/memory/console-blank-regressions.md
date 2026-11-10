---
name: console-blank-regressions
description: "#155 FIXED 2026-10-15: NES (device clock ran a round ahead of processors) and Game Boy (palette_gb never lowered); consoles now have real-cart acceptance contracts; option 3 (power-on beam) rejected for blast radius"
metadata:
  node_type: memory
  type: project
  originSessionId: 7648c5d6-b440-4f12-9e31-8597bed50b9e
  modified: 2026-10-15T08:49:35.675Z
---

Both consoles booted but drew one flat colour on main (issue #155). Fixed on
the issue branch 2026-10-15.

- **NES — #145.** A batched round runs on its last line, but the per-line
  `before-processors` settle paid device time for lines no processor had run,
  so the device clock ran `roundLines-1` lines ahead. A beam timer firing inside
  a slice read the CPU's `runningBeam`; one firing at a settle read the device
  clock's beam; the 2C02's "next line" re-arm from a settle was already behind
  and deferred a frame each round. **Fix:** on a board where a generated device
  calls the device-facing `screen().time_until_pos` (flag
  `deviceClockFollowsProcessors`), the settle leaves `frameRunner.unrunLines`
  owed. Scoped, not global: global moved Galaga's 54xx boom before.
  Option 1 (rounds end at beam timers) was dropped: it can't remove the lead
  (gberet kept ±3-line NMI jitter under it).
- Probe-measured blast radius (device-facing `time_until_pos` at runtime):
  nes, coleco (TMS9928A; old runtime never drew row 215), gberet (k005849,
  re-recorded; MAME RAM oracle diff 23/37/54 -> 16/28/22 bytes @600/900/1200),
  mslug (per-line, no-op), tmnt (only via a bug below).
- **k051960 timer_alloc aliasing:** runtime handed timers out positionally;
  TMNT's FIRQ/NMI allocs are guarded off, so `m_sprites_busy` got the FIRQ
  timer and ran a 2-line chain forever. Compiler now records every
  `m_x = timer_alloc(...)` (callback optional) and strips the statement. tmnt
  golden did not move.
- **Option 3 (power-on beam at 0, not 1.0) rejected:** 9 arcade boards read the
  beam during construction (berzerk digdug galaga gberet invaders missile mslug
  rtype xevious) — each first timer would shift a line. NES still starts its
  PPU one frame late vs MAME.
- **Game Boy — #150.** `gb_palette` read file-scope `palette_gb[]`, never
  lowered -> four black pens, `diagnostics: []`. Fix: `foldFileScopeTables`
  (TABLE(...), aggregate -> `rgb_t(...)`) + fail closed via shared
  `unboundIdentifiers` (src/ir/walk.ts).

**Follow-up the same day (user: "NES seems slow"):**
- First cut settled device time only to `unrunLines`; a slice OVERRUN (OAM DMA
  steals 513 cycles; timing hook clamps at target) left the CPU ~4 lines ahead
  of the device clock -> 2C02 lost a frame every few -> SMB1 at 75%, 1942 ~50%.
  Fix: `frameRunner.linesBehind(tag)` = unrun lines + carry/cyclesPerLine.
  Measured by per-frame NES RAM dumps from MAME 0.289 (`mame nes smb1 -rompath
  .data/roms/consoles -hashpath ../mame/hash -autoboot_script`) aligned to ours:
  offset now a constant -1 frame. "60 fps" in the shell hid it (lag frames).
- **MMC3 IRQ never fired** (all mapper-4 games: SMB3 status bar garbage): TxROM
  `hblank_irq` compares `scanline < ppu2c0x_device::BOTTOM_VISIBLE_SCANLINE`, a
  foreign class's enum never in the cart's constants -> unresolved reference ->
  always false. Fix: `foreignClassConstants` in device-compiler (qualified
  ALL-CAPS names from headers the source includes, never overriding
  DEFAULT_CONSTANTS, whose CPU line numbering differs from MAME's: NMI -1 vs 64).
  Added exactly one constant tree-wide. Status bar now pixel-exact vs MAME.
- The issue's console-boot script mounts NES softlist sets WITHOUT the mapper
  table -> every MMC3 cart boots as NROM (blank). Use src/runtime/cart-mount.ts.

**Guards added:** `src/games/{nes,gameboy,coleco,a2600}.game.ts` contracts with
`cartridge:` scenarios (smb1, tetris, dkong, combat) mounted through
`src/runtime/cart-mount.ts`; audio probes `nes`/`gameboy`/`tia`; ROM-free
`generated-board.spec` beam-timer fixture and `gameboy.game.spec` DMG pens.
Scratch recipe: probe a copy of dist runtime with `globalThis.__probe` hooks to
list which boards call a binding, before choosing a fix.
Related: [[device-clock-vs-beam]], [[mame-scheduler-synchronize]], [[codegen-silent-zero]].
