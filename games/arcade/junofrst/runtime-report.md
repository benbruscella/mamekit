# junofrst source-generation report

Playability: **executable**

MAME source coverage: **112/148 nodes (75.7%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 16 | Hardware lowered from MAME source to executable IR |
| Generated | 24 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 8 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **16/16**

Address-map handlers compiled: **4/4**

## Generated execution plan

CPU schedules: **3**

Frame callbacks: **1**

Screen update: **junofrst_state.screen_update_scramble** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `mcu.p1_out_cb -> dac.data_w` - src/mame/konami/junofrst.cpp:399
- `mcu.p2_out_cb -> junofrst_state.i8039_irqen_and_status_w` - src/mame/konami/junofrst.cpp:400
- `mainlatch.q_out_cb<0> -> junofrst_state.irq_enable_w` - src/mame/konami/junofrst.cpp:403
- `mainlatch.q_out_cb<1> -> junofrst_state.coin_counter_2_w` - src/mame/konami/junofrst.cpp:404
- `mainlatch.q_out_cb<2> -> junofrst_state.coin_counter_1_w` - src/mame/konami/junofrst.cpp:405
- `mainlatch.q_out_cb<3> -> set_nop` - src/mame/konami/junofrst.cpp:406
- `mainlatch.q_out_cb<4> -> junofrst_state.flip_screen_x_w` - src/mame/konami/junofrst.cpp:407
- `mainlatch.q_out_cb<5> -> junofrst_state.flip_screen_y_w` - src/mame/konami/junofrst.cpp:408
- `screen.set_screen_update -> junofrst_state.screen_update_scramble` - src/mame/konami/junofrst.cpp:417
- `screen.screen_vblank -> junofrst_state._30hz_irq` - src/mame/konami/junofrst.cpp:418
- `aysnd.port_a_read_callback -> junofrst_state.portA_r` - src/mame/konami/junofrst.cpp:427
- `aysnd.port_b_write_callback -> junofrst_state.portB_w` - src/mame/konami/junofrst.cpp:428
