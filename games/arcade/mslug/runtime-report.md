# mslug source-generation report

Playability: **executable**

Basis: **runtime-certified**

MAME source coverage: **176/237 nodes (74.3%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 14 | Hardware lowered from MAME source to executable IR |
| Generated | 40 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 5 | Hardware-neutral browser service configured by generated data |
| Blocked | 5 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **57/57**

Address-map handlers compiled: **18/18**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **0**

Screen update: **neogeo_base_state.screen_update** (compiled)

## Executable generation gaps

- `ctrl1:NEOGEO_CONTROL_PORT`
- `ctrl2:NEOGEO_CONTROL_PORT`
- `edge:NEOGEO_CTRL_EDGE_CONNECTOR`
- `memcard:NG_MEMCARD`
- `upd4990a:UPD4990A`

## Parser gaps

- None detected

## Generated callback wiring

- `systemlatch.q_out_cb<0> -> neogeo_base_state.set_screen_shadow` - src/mame/snk/neogeo.cpp:1931
- `systemlatch.q_out_cb<1> -> neogeo_base_state.set_use_cart_vectors` - src/mame/snk/neogeo.cpp:1932
- `systemlatch.q_out_cb<7> -> neogeo_base_state.set_palette_bank` - src/mame/snk/neogeo.cpp:1936
- `screen.set_screen_update -> neogeo_base_state.screen_update` - src/mame/snk/neogeo.cpp:1943
- `audionmi.output_handler -> audiocpu` - src/mame/snk/neogeo.cpp:1952
- `soundlatch.data_pending_callback -> audionmi.in_w_0` - src/mame/snk/neogeo.cpp:1956
- `ymsnd.irq_handler -> audiocpu` - src/mame/snk/neogeo.cpp:1961
- `systemlatch.q_out_cb<2> -> memcard.lock1_w` - src/mame/snk/neogeo.cpp:1980
- `systemlatch.q_out_cb<3> -> memcard.unlock2_w` - src/mame/snk/neogeo.cpp:1981
- `systemlatch.q_out_cb<4> -> memcard.regsel_w` - src/mame/snk/neogeo.cpp:1982
- `systemlatch.q_out_cb<5> -> ngarcade_base_state.set_use_cart_audio` - src/mame/snk/neogeo.cpp:1992
- `systemlatch.q_out_cb<6> -> ngarcade_base_state.set_save_ram_unlock` - src/mame/snk/neogeo.cpp:1993
