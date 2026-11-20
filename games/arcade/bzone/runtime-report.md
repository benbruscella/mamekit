# bzone source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **66/102 nodes (64.7%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 15 | Hardware lowered from MAME source to executable IR |
| Generated | 10 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 2 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **10/10**

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
