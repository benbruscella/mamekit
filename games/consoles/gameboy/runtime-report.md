# gameboy source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **54/68 nodes (79.4%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 13 | Hardware lowered from MAME source to executable IR |
| Generated | 10 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 4 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **14/14**

Address-map handlers compiled: **6/6**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **0**

Screen update: **dmg_ppu_device.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `maincpu.timer_cb -> gb_state.gb_timer_callback` - src/mame/nintendo/gb.cpp:1047
- `screen.set_screen_update -> ppu.screen_update` - src/mame/nintendo/gb.cpp:1053
- `palette.palette_init -> gb_state.gb_palette` - src/mame/nintendo/gb.cpp:1057
