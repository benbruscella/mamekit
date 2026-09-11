# phoenix source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **58/85 nodes (68.2%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 5 | Hardware lowered from MAME source to executable IR |
| Generated | 9 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 5 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **11/11**

Address-map handlers compiled: **3/3**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **0**

Screen update: **phoenix_state.screen_update_phoenix** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `screen.set_screen_update -> phoenix_state.screen_update_phoenix` - src/mame/phoenix/phoenix.cpp:464
- `palette.palette_init -> phoenix_state.phoenix_palette` - src/mame/phoenix/phoenix.cpp:468
