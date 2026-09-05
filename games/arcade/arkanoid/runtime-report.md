# arkanoid source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **81/113 nodes (71.7%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 8 | Hardware lowered from MAME source to executable IR |
| Generated | 16 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 5 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **22/22**

Address-map handlers compiled: **2/2**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **1**

Screen update: **arkanoid_state.screen_update_arkanoid** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `mcu.portb_r_cb -> arkanoid_state.input_mux_r` - src/mame/taito/arkanoid.cpp:1365
- `screen.set_screen_update -> arkanoid_state.screen_update_arkanoid` - src/mame/taito/arkanoid.cpp:1372
- `screen.screen_vblank -> maincpu` - src/mame/taito/arkanoid.cpp:1374
- `aysnd.port_a_read_callback -> UNUSED` - src/mame/taito/arkanoid.cpp:1384
- `aysnd.port_b_read_callback -> DSW` - src/mame/taito/arkanoid.cpp:1385
- `mcu.portb_r -> arkanoid_68705p5_device.mcu_pb_r` - src/mame/shared/taito68705.cpp:345
- `mcu.portc_r -> arkanoid_68705p5_device.mcu_pc_r` - src/mame/shared/taito68705.cpp:346
- `mcu.porta_w -> arkanoid_68705p5_device.mcu_pa_w` - src/mame/shared/taito68705.cpp:347
- `mcu.portc_w -> arkanoid_68705p5_device.mcu_pc_w` - src/mame/shared/taito68705.cpp:348
