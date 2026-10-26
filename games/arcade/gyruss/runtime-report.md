# gyruss source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **146/188 nodes (77.7%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 32 | Hardware lowered from MAME source to executable IR |
| Generated | 24 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 5 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **20/20**

Address-map handlers compiled: **5/5**

## Generated execution plan

CPU schedules: **4**

Frame callbacks: **1**

Screen update: **gyruss_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `audio2.p1_out_cb -> gyruss_state.dac_w` - src/mame/konami/gyruss.cpp:723
- `audio2.p2_out_cb -> gyruss_state.irq_clear_w` - src/mame/konami/gyruss.cpp:724
- `mainlatch.q_out_cb<0> -> gyruss_state.master_nmi_mask_w` - src/mame/konami/gyruss.cpp:729
- `mainlatch.q_out_cb<2> -> gyruss_state.coin_counter_w_0` - src/mame/konami/gyruss.cpp:730
- `mainlatch.q_out_cb<3> -> gyruss_state.coin_counter_w_1` - src/mame/konami/gyruss.cpp:731
- `mainlatch.q_out_cb<5> -> gyruss_state.flipscreen_w` - src/mame/konami/gyruss.cpp:732
- `screen.set_screen_update -> gyruss_state.screen_update` - src/mame/konami/gyruss.cpp:737
- `screen.screen_vblank -> gyruss_state.vblank_irq` - src/mame/konami/gyruss.cpp:739
- `ay1.port_b_write_callback -> gyruss_state.filter_w_0` - src/mame/konami/gyruss.cpp:753
- `ay2.port_b_write_callback -> gyruss_state.filter_w_1` - src/mame/konami/gyruss.cpp:761
- `ay3.port_a_read_callback -> gyruss_state.porta_r` - src/mame/konami/gyruss.cpp:769
- `palette.palette_init -> gyruss_state.palette` - src/mame/konami/gyruss.cpp:742
