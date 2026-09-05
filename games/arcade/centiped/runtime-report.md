# centiped source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **77/150 nodes (51.3%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 7 | Hardware lowered from MAME source to executable IR |
| Generated | 20 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 6 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **20/20**

Address-map handlers compiled: **8/8**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **1**

Screen update: **centiped_state.screen_update_centiped** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `outlatch.q_out_cb<0> -> centiped_state.coin_counter_left_w` - src/mame/atari/centiped.cpp:1785
- `outlatch.q_out_cb<1> -> centiped_state.coin_counter_center_w` - src/mame/atari/centiped.cpp:1786
- `outlatch.q_out_cb<2> -> centiped_state.coin_counter_right_w` - src/mame/atari/centiped.cpp:1787
- `32v.configure_scanline -> centiped_state.generate_interrupt` - src/mame/atari/centiped.cpp:1794
- `screen.set_screen_update -> centiped_state.screen_update_centiped` - src/mame/atari/centiped.cpp:1801
- `outlatch.q_out_cb<7> -> centiped_state.flip_screen_w` - src/mame/atari/centiped.cpp:1816
