# carnival source-generation report

Playability: **executable**

Basis: **runtime-certified**

MAME source coverage: **74/108 nodes (68.5%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 4 | Hardware lowered from MAME source to executable IR |
| Generated | 12 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 3 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **17/18**

Address-map handlers compiled: **3/3**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **0**

Screen update: **vicdual_state.screen_update_color** (blocked)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `audiocpu.p1_out_cb -> carnival_state.carnivala_music_port_1_w` - src/mame/sega/vicdual.cpp:287
- `audiocpu.p2_out_cb -> carnival_state.carnivala_music_port_2_w` - src/mame/sega/vicdual.cpp:288
- `audiocpu.t1_in_cb -> carnival_state.carnival_music_port_t1_r` - src/mame/sega/vicdual.cpp:289
- `screen.set_screen_update -> vicdual_state.screen_update_color` - src/mame/sega/vicdual.cpp:2979
