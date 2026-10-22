# missile source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **63/100 nodes (63%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 3 | Hardware lowered from MAME source to executable IR |
| Generated | 6 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 4 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **23/23**

Address-map handlers compiled: **2/2**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **0**

Screen update: **missile_state.screen_update_missile** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `maincpu.sync_cb -> missile_state.sync_w` - src/mame/atari/missile.cpp:968
- `screen.set_screen_update -> missile_state.screen_update_missile` - src/mame/atari/missile.cpp:981
- `pokey.allpot_r -> R8` - src/mame/atari/missile.cpp:988
