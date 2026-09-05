# gauntlet source-generation report

Playability: **executable**

Basis: **runtime-certified**

MAME source coverage: **141/200 nodes (70.5%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 21 | Hardware lowered from MAME source to executable IR |
| Generated | 31 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 11 | Hardware-neutral browser service configured by generated data |
| Blocked | 1 | Source found; executable lowering is incomplete |
| Missing | 4 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **18/19**

Address-map handlers compiled: **7/7**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **2**

Screen update: **gauntlet_state.screen_update** (compiled)

## Executable generation gaps

- `alpha:TILEMAP`
- `mob:ATARI_MOTION_OBJECTS`
- `playfield:TILEMAP`

## Parser gaps

- None detected

## Generated callback wiring

- `outlatch.q_out_cb<7> -> gauntlet_state.sound_reset_w` - src/mame/atari/gauntlet.cpp:760
- `scantimer.configure_scanline -> screen.scanline_update` - src/mame/atari/gauntlet.cpp:762
- `playfield.set_info_callback -> gauntlet_state.get_playfield_tile_info` - src/mame/atari/gauntlet.cpp:771
- `alpha.set_info_callback -> gauntlet_state.get_alpha_tile_info` - src/mame/atari/gauntlet.cpp:772
- `screen.set_screen_update -> gauntlet_state.screen_update` - src/mame/atari/gauntlet.cpp:782
- `screen.screen_vblank -> maincpu` - src/mame/atari/gauntlet.cpp:784
- `soundlatch.data_pending_callback -> audiocpu` - src/mame/atari/gauntlet.cpp:790
- `soundlatch.data_pending_callback -> perfect_quantum` - src/mame/atari/gauntlet.cpp:791
- `mainlatch.data_pending_callback -> maincpu` - src/mame/atari/gauntlet.cpp:794
- `soundctl.q_out_cb<0> -> ymsnd.reset_w` - src/mame/atari/gauntlet.cpp:809
- `soundctl.q_out_cb<1> -> tms.wsq_w` - src/mame/atari/gauntlet.cpp:810
- `soundctl.q_out_cb<2> -> tms.rsq_w` - src/mame/atari/gauntlet.cpp:811
- `soundctl.q_out_cb<3> -> gauntlet_state.speech_squeak_w` - src/mame/atari/gauntlet.cpp:812
- `soundctl.q_out_cb<4> -> gauntlet_state.coin_counter_w_1` - src/mame/atari/gauntlet.cpp:813
- `soundctl.q_out_cb<5> -> gauntlet_state.coin_counter_w_0` - src/mame/atari/gauntlet.cpp:814
