# 1942 source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **116/157 nodes (73.9%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 12 | Hardware lowered from MAME source to executable IR |
| Generated | 16 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 13 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **15/15**

Address-map handlers compiled: **6/6**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **1**

Screen update: **_1942_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `scantimer.configure_scanline -> _1942_state.scanline` - src/mame/capcom/1942.cpp:602
- `screen.set_screen_update -> _1942_state.screen_update` - src/mame/capcom/1942.cpp:611
- `palette.palette_init -> _1942_state._1942_palette` - src/mame/capcom/1942.cpp:607
