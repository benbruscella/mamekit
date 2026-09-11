# commando source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **94/134 nodes (70.1%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 11 | Hardware lowered from MAME source to executable IR |
| Generated | 15 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 5 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **14/14**

Address-map handlers compiled: **7/7**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **1**

Screen update: **commando_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `scantimer.configure_scanline -> commando_state.scanline` - src/mame/capcom/commando.cpp:568
- `screen.set_screen_update -> commando_state.screen_update` - src/mame/capcom/commando.cpp:573
