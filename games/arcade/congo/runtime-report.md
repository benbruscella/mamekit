# congo source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **143/198 nodes (72.2%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 16 | Hardware lowered from MAME source to executable IR |
| Generated | 31 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 4 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **33/33**

Address-map handlers compiled: **4/4**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **2**

Screen update: **zaxxon_state.screen_update_congo** (compiled)

## Executable generation gaps

- None

## Audio accuracy

Sample effects are synthesized approximations; original recorded samples are not played.

## Parser gaps

- None detected

## Generated callback wiring

- `mainlatch1.q_out_cb<0> -> zaxxon_state.coin_enable_w` - src/mame/sega/zaxxon.cpp:960
- `mainlatch1.q_out_cb<1> -> zaxxon_state.coin_enable_w` - src/mame/sega/zaxxon.cpp:961
- `mainlatch1.q_out_cb<2> -> zaxxon_state.coin_enable_w` - src/mame/sega/zaxxon.cpp:962
- `mainlatch1.q_out_cb<3> -> zaxxon_state.coin_counter_a_w` - src/mame/sega/zaxxon.cpp:963
- `mainlatch1.q_out_cb<4> -> zaxxon_state.coin_counter_b_w` - src/mame/sega/zaxxon.cpp:964
- `mainlatch1.q_out_cb<6> -> zaxxon_state.flipscreen_w` - src/mame/sega/zaxxon.cpp:965
- `mainlatch2.q_out_cb<1> -> zaxxon_state.fg_color_w` - src/mame/sega/zaxxon.cpp:969
- `screen.screen_vblank -> zaxxon_state.vblank_int` - src/mame/sega/zaxxon.cpp:981
- `ppi8255.in_pa_callback -> soundlatch.read` - src/mame/sega/zaxxon.cpp:1082
- `ppi8255.out_pa_callback -> set_nop` - src/mame/sega/zaxxon.cpp:1083
- `ppi8255.out_pb_callback -> zaxxon_state.congo_sound_b_w` - src/mame/sega/zaxxon.cpp:1084
- `ppi8255.out_pc_callback -> zaxxon_state.congo_sound_c_w` - src/mame/sega/zaxxon.cpp:1085
- `mainlatch1.q_out_cb<5> -> zaxxon_state.bg_enable_w` - src/mame/sega/zaxxon.cpp:1088
- `mainlatch1.q_out_cb<7> -> zaxxon_state.int_enable_w` - src/mame/sega/zaxxon.cpp:1089
- `mainlatch2.q_out_cb<0> -> set_nop` - src/mame/sega/zaxxon.cpp:1092
- `mainlatch2.q_out_cb<3> -> zaxxon_state.bg_color_w` - src/mame/sega/zaxxon.cpp:1093
- `mainlatch2.q_out_cb<6> -> zaxxon_state.congo_fg_bank_w` - src/mame/sega/zaxxon.cpp:1094
- `mainlatch2.q_out_cb<7> -> zaxxon_state.congo_color_bank_w` - src/mame/sega/zaxxon.cpp:1095
- `screen.set_screen_update -> zaxxon_state.screen_update_congo`
- `audiocpu.set_periodic_int -> zaxxon_state.irq0_line_hold` - src/mame/sega/zaxxon.cpp:1099
- `palette.palette_init -> zaxxon_state.zaxxon_palette` - src/mame/sega/zaxxon.cpp:975
