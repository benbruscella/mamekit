# gng source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **106/148 nodes (71.6%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 13 | Hardware lowered from MAME source to executable IR |
| Generated | 18 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 6 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **12/12**

Address-map handlers compiled: **5/5**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **2**

Screen update: **gng_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `maincpu.set_vblank_int -> screen.irq0_line_hold` - src/mame/capcom/gng.cpp:577
- `audiocpu.set_periodic_int -> gng_state.irq0_line_hold` - src/mame/capcom/gng.cpp:581
- `mainlatch.q_out_cb<0> -> gng_state.flip_screen_set` - src/mame/capcom/gng.cpp:584
- `mainlatch.q_out_cb<1> -> audiocpu` - src/mame/capcom/gng.cpp:585
- `mainlatch.q_out_cb<1> -> gng_state.ym_reset_w` - src/mame/capcom/gng.cpp:586
- `screen.set_screen_update -> gng_state.screen_update` - src/mame/capcom/gng.cpp:595
