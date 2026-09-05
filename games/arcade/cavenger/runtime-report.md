# cavenger source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **59/99 nodes (59.6%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 11 | Hardware lowered from MAME source to executable IR |
| Generated | 9 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 4 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **7/7**

Address-map handlers compiled: **0/0**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **0**

Screen update: **ladybug_state.screen_update_ladybug** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `screen.set_screen_update -> ladybug_state.screen_update_ladybug` - src/mame/universal/ladybug.cpp:687
- `videolatch.q_out_cb<0> -> ladybug_state.flip_screen_set` - src/mame/universal/ladybug.cpp:696
- `palette.palette_init -> ladybug_state.ladybug_palette` - src/mame/universal/ladybug.cpp:691
