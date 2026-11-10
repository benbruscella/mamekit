---
name: spectrum-165
description: "#165 ZX Spectrum: the silent general gaps behind 48K/128K/cart/snapshot, MAME frame-alignment recipe, and what is still open"
metadata:
  node_type: memory
  type: project
  originSessionId: 26e89b02-db13-4833-a616-26447555a59f
  modified: 2026-10-21T01:04:53.722Z
---

Issue #165 (branch 165-add-the-zx-spectrum, 2026-10-21). 48K boot, BASIC+BEEP, 128K menu, Jet Pac title/menu/start and a homemade .sna are pixel-exact vs MAME 0.289; Manic Miner and Elite (128K Tape Loader) load to their titles headless.

General gaps each machine exposed (all silent — no diagnostics):
- 128K black/white screen: derived-config `m_ram->set_default_size("128K")` ignored (first match won); `memory_bank_array` configured in a `for` loop over `m_ram->pointer()` never lowered (bank device storage, numeric locals, loop unroll, `?:` in evalExpr); `template <u8 Bank> u8 cls::fn` on ONE line hid `Bank` from the specialiser; `space(AS_PROGRAM).specific(m_program)` unbound → every opcode fetch read 0.
- Cartridge: card-declared SOFTWARE_LIST (intf2) → shelf `card` + BoardConfig.slotCards; child delegate `set_device_load` must be bound before the child starts (deferStart); GENERIC_CARTSLOT needs its own card table (generic_plain_slot), `m_default_card("rom")` string initializer, `user_loadable()`=1, `region_alloc`, `isnull()` from binding.
- FLASH never flashed: frame_number missing on the screen_update `screen` object AND vblank() never fired when vbstart == vtotal; MAME counts frames at vblank_END.
- Snapshot: SNAPSHOT(config,tag,"exts") wrapped `type &var(...)` lost its extensions; VECTOR_OF unbound for driver handlers; Z80 needed `set_state_int` via state_add table + compiled `state_import`; `Z80_PC = STATE_GENPC` needs emu/distate.h.
- Save-state rewind: address_map_bank_device Bus RAM was a constructor local (bankDeviceBuses now walked).
- Merged softlist zips (user's collection): identify by root members, mount only the entry's own images.
- Audio writeHash: JSON.stringify of 11M stream writes exceeds V8 string max → incremental crc.

MAME oracle: binary is `/Users/benbruscella/Google Drive/My Drive/Emulators/mame/mame0289-arm64/mame` (Homebrew mame is 0.288). Software lists need `-rompath "<bios>;<Downloads/MAME 0.289 Software List ROMs (merged)>" -hashpath ../mame/hash`. Frame notifier fires at END of frame N: post input at MAME N-1 to match our hook at N; MAME snapshot N == our PNG after frame N. See [[mame-reference-capture]].

Blast-radius lessons (full sweep, attributed with a main worktree gen:all + compiled-module swaps in dist; the harness loads dist/app/registry.js, so a whole-runtime swap must swap it too):
- Counting adjust_icount stalls in CPU elapsedCycles pushed Up'n Down's SN76489 writes 12% past MAME (29,068 in 1,200 frames; main was within 1%) — reverted; Spectrum stayed pixel-exact without it.
- Firing every driver timer between instructions froze Missile Command; only timers armed inside a line (`time_until_pos(v, h≠0)`, `clocks_to_attotime`) are `precise` now.
- "Armed anywhere" timers and sibling-include card units doubled Neo Geo/Simpsons timers and pulled the IEC bus into the C64 — both narrowed; duplicate config helpers expand to nothing.
- Moved goldens recorded as MAME-faithful: missile, galaxian, jumpbug, coleco:dkong, c64/c64p tape.

Gyruss (intf2 cart) ignores P1 fire in real MAME too: it polls only rows F7FE/DFFE/FDFE = Interface 2 PLAYER 2 (keys 1-5). Fix was a generic host "joystick seat" (KeyboardInput.setSeat/seats, `[data-joystick-seat]` toolbar toggle on computers, kept per title) — P1 stick/button → same-type P2 field on the same device prefix. MAME port tags for the card are `:exp:intf2:LINE3/4` (ours flatten to `exp:LINE3`). Lua I/O read tap on `spaces["io"]` is the way to see which rows a title polls. Never run bare `tsc -p .` — root tsconfig emits src/ into dist (611 stray files, 2026-10-21).

Open: Jet Pac play diverges ~10 frames after start (R-register RNG / instruction count); Contention switch needs device-targeted PORT_CHANGED_MEMBER on a config field; Manic Miner ~3 frames behind MAME after the tape; artwork is CC BY-SA 2.5 (Bill Bertram) — needs public credit if deployed.
