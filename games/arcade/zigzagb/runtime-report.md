# zigzagb source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **109/137 nodes (79.6%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 2 | Hardware lowered from MAME source to executable IR |
| Generated | 19 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 5 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **36/36**

Address-map handlers compiled: **10/10**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **1**

Screen update: **galaxian_state.screen_update_galaxian** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `screen.set_screen_update -> galaxian_state.screen_update_galaxian` - src/mame/galaxian/galaxian.cpp:7500
- `screen.screen_vblank -> galaxian_state.vblank_interrupt_w` - src/mame/galaxian/galaxian.cpp:7501
