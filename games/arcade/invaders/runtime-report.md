# invaders source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **59/96 nodes (61.5%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 9 | Hardware lowered from MAME source to executable IR |
| Generated | 9 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 4 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **15/15**

Address-map handlers compiled: **0/0**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **0**

Screen update: **invaders_state.screen_update_invaders** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `interrupt_timer.timer -> mw8080bw_state.interrupt_trigger` - src/mame/midw8080/mw8080bw.cpp:217
- `maincpu.set_irq_acknowledge_callback -> mw8080bw_state.interrupt_vector` - src/mame/midw8080/mw8080bw.cpp:334
- `maincpu.out_inte_func -> mw8080bw_state.int_enable_w` - src/mame/midw8080/mw8080bw.cpp:335
- `screen.set_screen_update -> invaders_state.screen_update_invaders` - src/mame/midw8080/mw8080bw.cpp:2693
