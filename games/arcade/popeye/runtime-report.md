# popeye source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **83/129 nodes (64.3%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 4 | Hardware lowered from MAME source to executable IR |
| Generated | 15 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 9 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **17/19**

Address-map handlers compiled: **6/6**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **1**

Screen update: **tnx1_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `maincpu.refresh_cb -> tnx1_state.refresh_w` - src/mame/nintendo/popeye.cpp:544
- `screen.set_screen_update -> tnx1_state.screen_update` - src/mame/nintendo/popeye.cpp:554
- `screen.screen_vblank -> tnx1_state.screen_vblank` - src/mame/nintendo/popeye.cpp:555
- `aysnd.port_a_read_callback -> DSW0` - src/mame/nintendo/popeye.cpp:564
- `aysnd.port_b_write_callback -> tnx1_state.popeye_portB_w` - src/mame/nintendo/popeye.cpp:565
