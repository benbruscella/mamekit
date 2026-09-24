# zaxxon source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **100/144 nodes (69.4%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 8 | Hardware lowered from MAME source to executable IR |
| Generated | 24 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 4 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **28/28**

Address-map handlers compiled: **2/2**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **1**

Screen update: **zaxxon_state.screen_update_zaxxon** (compiled)

## Executable generation gaps

- None

## Audio accuracy

Sample effects are synthesized approximations; original recorded samples are not played.

## Parser gaps

- None detected

## Generated callback wiring

- `ppi8255.out_pa_callback -> zaxxon_state.zaxxon_sound_a_w` - src/mame/sega/zaxxon.cpp:952
- `ppi8255.out_pb_callback -> zaxxon_state.zaxxon_sound_b_w` - src/mame/sega/zaxxon.cpp:953
- `ppi8255.out_pc_callback -> zaxxon_state.zaxxon_sound_c_w` - src/mame/sega/zaxxon.cpp:954
- `mainlatch1.q_out_cb<0> -> zaxxon_state.coin_enable_w` - src/mame/sega/zaxxon.cpp:960
- `mainlatch1.q_out_cb<1> -> zaxxon_state.coin_enable_w` - src/mame/sega/zaxxon.cpp:961
- `mainlatch1.q_out_cb<2> -> zaxxon_state.coin_enable_w` - src/mame/sega/zaxxon.cpp:962
- `mainlatch1.q_out_cb<3> -> zaxxon_state.coin_counter_a_w` - src/mame/sega/zaxxon.cpp:963
- `mainlatch1.q_out_cb<4> -> zaxxon_state.coin_counter_b_w` - src/mame/sega/zaxxon.cpp:964
- `mainlatch1.q_out_cb<6> -> zaxxon_state.flipscreen_w` - src/mame/sega/zaxxon.cpp:965
- `mainlatch2.q_out_cb<0> -> zaxxon_state.int_enable_w` - src/mame/sega/zaxxon.cpp:968
- `mainlatch2.q_out_cb<1> -> zaxxon_state.fg_color_w` - src/mame/sega/zaxxon.cpp:969
- `mainlatch2.q_out_cb<6> -> zaxxon_state.bg_color_w` - src/mame/sega/zaxxon.cpp:970
- `mainlatch2.q_out_cb<7> -> zaxxon_state.bg_enable_w` - src/mame/sega/zaxxon.cpp:971
- `screen.set_screen_update -> zaxxon_state.screen_update_zaxxon` - src/mame/sega/zaxxon.cpp:979
- `screen.screen_vblank -> zaxxon_state.vblank_int` - src/mame/sega/zaxxon.cpp:981
- `palette.palette_init -> zaxxon_state.zaxxon_palette` - src/mame/sega/zaxxon.cpp:975
