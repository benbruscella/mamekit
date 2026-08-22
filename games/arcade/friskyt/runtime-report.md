# friskyt source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **80/106 nodes (75.5%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 6 | Hardware lowered from MAME source to executable IR |
| Generated | 12 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 6 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **11/11**

Address-map handlers compiled: **3/3**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **1**

Screen update: **seicross_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `maincpu.set_vblank_int -> screen.vblank_irq` - src/mame/nichibutsu/seicross.cpp:627
- `screen.set_screen_update -> seicross_state.screen_update` - src/mame/nichibutsu/seicross.cpp:639
- `aysnd.port_b_read_callback -> seicross_state.portb_r` - src/mame/nichibutsu/seicross.cpp:649
- `aysnd.port_b_write_callback -> seicross_state.portb_w` - src/mame/nichibutsu/seicross.cpp:650
