# bombjack source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **74/143 nodes (51.7%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 14 | Hardware lowered from MAME source to executable IR |
| Generated | 24 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 5 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **19/19**

Address-map handlers compiled: **8/8**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **2**

Screen update: **bombjack_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `screen.set_screen_update -> bombjack_state.screen_update`
- `screen.screen_vblank -> bombjack_state.vblank_nmi`
- `screen.screen_vblank -> audiocpu`
- `psg1.port_a_write_callback -> set_nop` - src/mame/tecmo/bombjack.cpp:765
- `psg1.port_b_write_callback -> set_nop` - src/mame/tecmo/bombjack.cpp:766
- `psg2.port_a_write_callback -> set_nop` - src/mame/tecmo/bombjack.cpp:767
- `psg2.port_b_write_callback -> set_nop` - src/mame/tecmo/bombjack.cpp:768
- `psg3.port_a_write_callback -> set_nop` - src/mame/tecmo/bombjack.cpp:769
- `psg3.port_b_write_callback -> set_nop` - src/mame/tecmo/bombjack.cpp:770
