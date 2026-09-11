# mrdo source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **70/103 nodes (68%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 5 | Hardware lowered from MAME source to executable IR |
| Generated | 14 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 4 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **14/14**

Address-map handlers compiled: **6/6**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **1**

Screen update: **mrdo_state.screen_update_mrdo** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `maincpu.set_vblank_int -> screen.irq0_line_hold` - src/mame/universal/mrdo.cpp:226
- `screen.set_screen_update -> mrdo_state.screen_update_mrdo` - src/mame/universal/mrdo.cpp:231
- `palette.palette_init -> mrdo_state.palette_init` - src/mame/universal/mrdo.cpp:235
