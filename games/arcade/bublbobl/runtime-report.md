# bublbobl source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **119/161 nodes (73.9%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 20 | Hardware lowered from MAME source to executable IR |
| Generated | 22 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 6 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **14/14**

Address-map handlers compiled: **4/4**

## Generated execution plan

CPU schedules: **4**

Frame callbacks: **2**

Screen update: **bublbobl_state.screen_update_bublbobl** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `subcpu.set_vblank_int -> screen.irq0_line_hold` - src/mame/taito/bublbobl.cpp:952
- `screen.set_screen_update -> bublbobl_state.screen_update_bublbobl` - src/mame/taito/bublbobl.cpp:967
- `soundirq.output_handler -> audiocpu` - src/mame/taito/bublbobl.cpp:976
- `soundnmi.output_handler -> audiocpu` - src/mame/taito/bublbobl.cpp:977
- `main_to_sound.data_pending_callback -> soundnmi.in_w_1` - src/mame/taito/bublbobl.cpp:979
- `ym2203.irq_handler -> soundirq.in_w_0` - src/mame/taito/bublbobl.cpp:983
- `ym3526.irq_handler -> soundirq.in_w_1` - src/mame/taito/bublbobl.cpp:987
- `maincpu.set_irq_acknowledge_callback -> bublbobl_state.mcram_vect_r` - src/mame/taito/bublbobl.cpp:994
- `screen.screen_vblank -> mcu` - src/mame/taito/bublbobl.cpp:1004
- `mcu.in_p1_cb -> IN0` - src/mame/taito/bublbobl.cpp:997
- `mcu.out_p1_cb -> bublbobl_state.bublbobl_mcu_port1_w` - src/mame/taito/bublbobl.cpp:998
- `mcu.out_p2_cb -> bublbobl_state.bublbobl_mcu_port2_w` - src/mame/taito/bublbobl.cpp:999
- `mcu.out_p3_cb -> bublbobl_state.bublbobl_mcu_port3_w` - src/mame/taito/bublbobl.cpp:1000
- `mcu.in_p3_cb -> bublbobl_state.bublbobl_mcu_port3_r` - src/mame/taito/bublbobl.cpp:1001
- `mcu.out_p4_cb -> bublbobl_state.bublbobl_mcu_port4_w` - src/mame/taito/bublbobl.cpp:1002
