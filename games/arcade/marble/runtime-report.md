# marble source-generation report

Playability: **executable**

Basis: **runtime-certified**

MAME source coverage: **160/210 nodes (76.2%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 17 | Hardware lowered from MAME source to executable IR |
| Generated | 29 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 13 | Hardware-neutral browser service configured by generated data |
| Blocked | 1 | Source found; executable lowering is incomplete |
| Missing | 4 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **36/36**

Address-map handlers compiled: **11/11**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **1**

Screen update: **atarisy1_state.screen_update** (compiled)

## Executable generation gaps

- `alpha:TILEMAP`
- `mob:ATARI_MOTION_OBJECTS`
- `playfield:TILEMAP`

## Parser gaps

- None detected

## Generated callback wiring

- `outlatch.q_out_cb<0> -> ymsnd.reset_w` - src/mame/atari/atarisy1.cpp:781
- `outlatch.q_out_cb<6> -> atarisy1_state.coin_counter_right_w` - src/mame/atari/atarisy1.cpp:784
- `outlatch.q_out_cb<7> -> atarisy1_state.coin_counter_left_w` - src/mame/atari/atarisy1.cpp:785
- `scan_timer.configure_generic -> atarisy1_state.int3_callback` - src/mame/atari/atarisy1.cpp:789
- `int3off_timer.configure_generic -> atarisy1_state.int3off_callback` - src/mame/atari/atarisy1.cpp:790
- `yreset_timer.configure_generic -> atarisy1_state.reset_yscroll_callback` - src/mame/atari/atarisy1.cpp:791
- `playfield.set_info_callback -> atarisy1_state.get_playfield_tile_info` - src/mame/atari/atarisy1.cpp:798
- `alpha.set_info_callback -> atarisy1_state.get_alpha_tile_info` - src/mame/atari/atarisy1.cpp:799
- `screen.set_screen_update -> atarisy1_state.screen_update` - src/mame/atari/atarisy1.cpp:809
- `screen.screen_vblank -> maincpu` - src/mame/atari/atarisy1.cpp:811
- `soundlatch.data_pending_callback -> audiocpu` - src/mame/atari/atarisy1.cpp:817
- `soundlatch.data_pending_callback -> perfect_quantum` - src/mame/atari/atarisy1.cpp:818
- `mainlatch.data_pending_callback -> maincpu` - src/mame/atari/atarisy1.cpp:821
- `ymsnd.irq_handler -> audiocpu` - src/mame/atari/atarisy1.cpp:824
