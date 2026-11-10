---
name: disabled-four-status
description: "#142: Spy Hunter and Sinistar now play, Wardner is blocked only on YM3812, and Out Run was dropped (#111 closed, target deleted)"
metadata: 
  node_type: memory
  type: project
  originSessionId: 6fa837a6-9fd8-4ec3-8d39-cfe84cf648ec
  modified: 2026-09-12T06:57:42.449Z
---

Branch goal is all four of #142 enabled. State on 2026-09-12, all four staged
as candidates in `src/games/candidates/`:

**spyhunt (#114) — WORKING.** Not an emulation bug at all. Spy Hunter's CMOS
initializes to **two coins per credit** and its coin routine at 0x412 only
turns 0xf430 into a credit at 0xf40a once it reaches the 0xf42b setting. One
coin leaves CREDITS 0, which is what the issue recorded. Two coins credit and
it plays (verified: score, timer, enemy cars). Its contract is rewritten for
two 20-frame coins. **Its own note ("the coin reaches ssio:IP0") was measured
with `input.latch()`; a probe must call `input.advance()` each frame like
acceptance-harness does, or no press ever reaches the CPU.** No generation
gaps.

**wardner (#143) — boots, every RAM test passes, blocked on YM3812.** After
the TMS320C10 work ([[tms320c10-core]]) it hung on its own power-on test.
Three *general* bugs, each found by walking a failed compare back:
1. **The palette device had its own private RAM.** `GeneratedRamPalette`
   allocated a buffer while the driver mapped the same window as a readable
   share, so `palette.write8` and the share were different memory. Only a
   board that *reads its palette back* notices. Now adopts `shares[plan.tag]`.
   ("LRAM ERROR", IY=0xa000.)
2. **`make_unique_clear<u16[]>` allocated bytes.** The element type was
   discarded, so every COMBINE_DATA half-word store into wardner's three tile
   layers lost its high byte. `ALLOC` now carries the width (`ALLOC16`/
   `ALLOC32`). ("FRAM ERROR".)
3. **`reinterpret_cast<u16 *>` over byte memory was identity in emitted
   code.** The interpreter built the packed view; the AOT emitter did not, so
   byte-backed sprite RAM stored each half-word at the word index. Both paths
   now honour the cast (`runtime.packedView`). (IY=0x8001.)
Now reaches **"SOUND ERROR"**: `ymsnd:YM3812` is the one remaining capability
gap, and the sound Z80 parks waiting on it. `compileYm3526` already lowers
OPL1; YM3812 is `opl_registers_base<2>`, but today YM3526 is only lowered as
an *auxiliary* riding the YM2203 worklet (`src/hardware/ym2203/extract.ts`) --
wardner has an OPL2 as its only sound chip, so it needs its own package.

**sinistar (#113) — boots, blitter works, diverges after the CMOS screen.**
Update: three more general bugs found and fixed on the way in (all shipped):
a templated `TIMER_CALLBACK_MEMBER` had its `template <...>` line ignored by
the AST, so `deferred_snd_cmd_w<2>` kept `m_pia[A]` unresolved; the KG's
specialization regex only matched a single-parameter template, so `A=2` never
became a constant; and `machine().scheduler().synchronize()` ran its callback
**inline** instead of deferring it past the running CPU's slice. The remaining
divergence is narrower than the sound board: at frame ~694 both we and MAME
run the blitter setup at 0x8ee0-0x8f0f, and the very next instruction boundary
differs (MAME 0x8f07, ours 0x8f09) -- the *bytes at 0x8f06 differ*, which on
this board means the 0x0000-0x8fff ROM/RAM bank state differs. Look at
`vram_select_w` vs `sinistar_vram_select_w`: both are mapped over
0xC900-0xC9FF and only the later one may win. Ours then falls into the
operator "Advance" wait at 0x4a24 (IN2 bit 1, IPT_SERVICE), which MAME never
enters.
`WILLIAMS_BLITTER_SC1` is no longer a gap; only `cvsd:HC55516` is. It renders
text correctly and shows "FACTORY SETTINGS RESTORED" -- **which is authentic:
real MAME 0.289 shows the same screen at frame 3000** and only reaches attract
around frame 12000. Ours never does. Per-frame PC pages match MAME exactly on
the interrupt pages (f0/f1/f2 within a few counts) and diverge from ~frame 410:
MAME spreads into pages 34/79/46, we fall into a wait loop at 0x49dc-0x49e7 and
then page 0x4a. That loop is the next thing to read.

**outrun (#111) — still will not construct.** Down to four gaps (`i8255:I8255`,
`pcm:SEGA_315_5218`, `segaic16road:SEGAIC16_ROAD`, `sprites:SEGA_OUTRUN_SPRITES`
-- the mapper and segaic16vid now resolve), and composition throws on the 14
unresolved `pcm.voice_*` handlers.

**Why:** three of the four issues understated how far the targets already got;
the real blockers are narrower and mostly about *sound* hardware now.
**How to apply:** build all four into one tree with
`node bin/mamekit.js <g> --skip-app --out $OUT` per target then
`--build-runtime --build-app --targets a,b,c,d --out $OUT`. **A compiler change
needs the per-target regeneration too -- `--build-runtime` alone reuses the
cached IR and your fix silently does not appear** ([[warm-cache-outlives-code]],
[[gen-cache-masks-breaks]]). Diagnose by trapping the failing compare and
walking the PC ring back; see [[disabled-target-diagnosis]].


**UPDATE 2026-09-12: Out Run was removed, #111 closed as won't do.** Measured
reach of its remaining gaps: `SEGA_OUTRUN_SPRITES` serves **1** MAME driver,
`SEGAIC16_ROAD` 3, `SEGA_315_5218` 4 — and each of those Sega super-scaler
families still needs its own sprite chip. It does **not** unlock Golden Axe
(#107), which is System 16B and shares only the mapper and SEGAIC16VID, both
of which already resolve. Deleted: the contract, its runtime-certification
entry, the `SEGAIC16_ROAD`-gated 315-5195 mapper model and scanline IRQ block
in generated-board.ts (~230 lines of game-specific runtime the architecture
rules forbid anyway), and the `outrun-sega16-layers` shape plus its road fill.
**Kept and renamed** `drawOutrunLayers` -> `drawSystem16BLayers`: it is shared
with `system16b-layers` and is the path a future Golden Axe uses. Local ROMs
were left alone.

Higher-leverage targets measured at the same time: **Marble Madness (#93)** is
nearly free (Gauntlet's stack: M68010, M6502, EEPROM_2804, LS259, TILEMAP,
ATARI_MOTION_OBJECTS, YM2151 all generated), and **NBA Jam (#106) + Mortal
Kombat (#104) are the same board** — one build (TMS34010 + MIDTUNIT_VIDEO +
WILLIAMS_ADPCM_SOUND + AD7524) gives both.

One reusable finding survives Out Run's removal: the device compiler does not
monomorphize **class-template** methods. `segapcm_device<MaxVoices>` lowered
to one method (`map`) where it should have had fifteen, which is why the 14
`pcm.voice_*` handlers never resolved. `monomorphizeClassTemplate` already
exists ([[tms320c10-core]]); the device path just does not use it.

**Trap:** `bin/mamekit.js graph <game>` is **not** read-only -- it writes
graph.json/graph.full.json/graph.cypher into the output root, so exploratory
graphing without `--out` pollutes `dist` and trips the mixed-distribution
guard in serve.ts.
