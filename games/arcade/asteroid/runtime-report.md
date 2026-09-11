# asteroid source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **90/116 nodes (77.6%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 9 | Hardware lowered from MAME source to executable IR |
| Generated | 22 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 4 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **14/14**

Address-map handlers compiled: **6/6**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **1**

Screen update: **vector_device.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `maincpu.set_periodic_int -> asteroid_state.asteroid_interrupt` - src/mame/atari/asteroid.cpp:839
- `outlatch.bit_handler<2> -> asteroid_state.cocktail_inv_w` - src/mame/atari/asteroid.cpp:850
- `outlatch.bit_handler<3> -> asteroid_state.coin_counter_left_w` - src/mame/atari/asteroid.cpp:851
- `outlatch.bit_handler<4> -> asteroid_state.coin_counter_center_w` - src/mame/atari/asteroid.cpp:852
- `outlatch.bit_handler<5> -> asteroid_state.coin_counter_right_w` - src/mame/atari/asteroid.cpp:853
- `screen.set_screen_update -> vector.screen_update` - src/mame/atari/asteroid.cpp:861
- `audiolatch.q_out_cb<0> -> discrete.write_line_ASTEROID_SAUCER_SND_EN` - src/mame/atari/asteroid_a.cpp:325
- `audiolatch.q_out_cb<1> -> discrete.write_line_ASTEROID_SAUCER_FIRE_EN` - src/mame/atari/asteroid_a.cpp:326
- `audiolatch.q_out_cb<2> -> discrete.write_line_ASTEROID_SAUCER_SEL` - src/mame/atari/asteroid_a.cpp:327
- `audiolatch.q_out_cb<3> -> discrete.write_line_ASTEROID_THRUST_EN` - src/mame/atari/asteroid_a.cpp:328
- `audiolatch.q_out_cb<4> -> discrete.write_line_ASTEROID_SHIP_FIRE_EN` - src/mame/atari/asteroid_a.cpp:329
- `audiolatch.q_out_cb<5> -> discrete.write_line_ASTEROID_LIFE_EN` - src/mame/atari/asteroid_a.cpp:330
