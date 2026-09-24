# ghouls source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **102/192 nodes (53.1%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 12 | Hardware lowered from MAME source to executable IR |
| Generated | 18 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 4 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **32/33**

Address-map handlers compiled: **10/10**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **3**

Screen update: **cps_state.screen_update_cps1** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `maincpu.set_vblank_int -> screen.cps1_interrupt` - src/mame/capcom/cps1.cpp:3916
- `screen.set_screen_update -> cps_state.screen_update_cps1` - src/mame/capcom/cps1.cpp:3926
- `screen.screen_vblank -> cps_state.screen_vblank_cps1` - src/mame/capcom/cps1.cpp:3927
- `screen.screen_vblank -> cps_state.cps1_objram_latch` - src/mame/capcom/cps1.cpp:3928
- `2151.irq_handler -> audiocpu` - src/mame/capcom/cps1.cpp:3941
