---
name: c64-cartridges-161
description: "#161 C64 cartridges + three C64-wide accuracy fixes: VIC sprite data aliasing (nested memcpy), u32 CPU clocks, present at the frame boundary; MAME -cart oracle; what is left (raster-IRQ phase)"
metadata:
  node_type: memory
  type: project
  originSessionId: 9100b616-ae4c-4f75-9420-253954e54149
  modified: 2026-10-19T15:06:12.706Z
---

2026-10-20, branch 161-fix-commodore-64-part-2 (on top of "wip 2").

- **Cartridges** are software parts, not files: the expansion port's own call_load (interpreted,
  not a codegen root: its `load_software_region("roml", m_card->m_roml)` out-param needs the
  interpreter's lvalue path) reads `roml`/`romh`/`lorom`/`uprom` by area into the card the title's
  `slot` feature names. `BoardConfig.images[tag] = {name, software|bytes}` is loaded between the
  device's device_start and first reset (MAME's image-manager order). The slot proxy now exposes the
  card's members (non-enumerable) and prepared calls. 54 cards compile, all list titles covered.
  Catalog: SoftRom.area, SoftEntry.areas (declared sizes; 21 areas are bigger than their chips),
  features. Shared builder: title-start.ts `softwarePart`.
- **Traps found**: `get_feature("exrom") != nullptr` -- comparableValue made "0" == nullptr (strings
  now compare as strings); device-compiler's `m_x = std::make_unique...` strip also ate
  `m_card->m_roml = ...`; `std::tie(...) = read(...)` lowered like a structured binding.
- **VIC-II sprites 0/1 drew a line early** (every C64 game): `memcpy(m_spr_draw_data, m_spr_data, 32)`
  on `uint8_t[8][4]` copied row *references* (outer array of plain arrays), so the cycle-57 snapshot
  aliased the fetch buffer. nested arrays now memcpy/memset cell by cell. Only mos6566/6569 used it.
- **u32 CPU clocks**: MAME's device_t::m_clock is u32 for CPUs too, and clocks_to_cycles rounds up
  ((clocks+n-1)/n). 19 fractional + every dividing core (6809/6800/MCS-48) moved: goldens re-recorded.
- **Present point**: MAME's screen starts at VBLANK (vpos counts from m_vblank_start_time), so for a
  device-drawn raster nothing reads (VIC-II, TIA, GB LCD: no beam reads, no frame events) the frame is
  copied at the frame boundary (`screen.present: 'frame-boundary'`). Cures the torn bottom row; MAME's
  C64 refresh is the *fractional* XTAL/312/63 while the VIC runs u32, so it drifts 0.0088 cyc/frame
  in MAME too.
- **MAME oracle**: `mame c64p -rompath "$R/bios;$R" -cart <set> -iec8 "" -tape ""` + frame-snapshot
  Lua. Pixel-exact: pacman, kungfum (menu and in-game at 1800 after {ENTER}x3), robocop2, narco, c64gs,
  avenger, jlander, bowling; NTSC pacman. batman's raster bars and anabalt were 2-6 cycles early:
  fixed by [[perfect-quantum-device-access]] (it was register-write timing, not the IRQ).
- MAME's natural keyboard registers a key ~20 frames later than ours: compare post-input frames at
  an offset, or the scene shifts (ghosts in Pac-Man, Broken Limits' demo).

See [[c64-quickload-161]], [[c64-acceptance-161]], [[frame-render-point]], [[device-clock-u32]].
