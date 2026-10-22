# bzone source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **65/100 nodes (65%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 13 | Hardware lowered from MAME source to executable IR |
| Generated | 10 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 4 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **9/9**

Address-map handlers compiled: **2/2**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **1**

Screen update: **vector_device.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `maincpu.set_periodic_int -> bzone_state.bzone_interrupt` - src/mame/atari/bzone.cpp:613
- `screen.set_screen_update -> vector.screen_update` - src/mame/atari/bzone.cpp:623
- `pokey.allpot_r -> IN3` - src/mame/atari/bzone_a.cpp:404
