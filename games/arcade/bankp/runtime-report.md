# bankp source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **67/102 nodes (65.7%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 7 | Hardware lowered from MAME source to executable IR |
| Generated | 13 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 4 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **12/12**

Address-map handlers compiled: **6/6**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **1**

Screen update: **bankp_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `maincpu.set_vblank_int -> screen.vblank_interrupt` - src/mame/sanritsu/bankp.cpp:550
- `screen.set_screen_update -> bankp_state.screen_update` - src/mame/sanritsu/bankp.cpp:555
