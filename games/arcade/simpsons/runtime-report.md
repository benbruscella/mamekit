# simpsons source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **122/182 nodes (67%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 18 | Hardware lowered from MAME source to executable IR |
| Generated | 26 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 6 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **34/35**

Address-map handlers compiled: **9/9**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **1**

Screen update: **simpsons_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `maincpu.set_vblank_int -> screen.periodic_irq` - src/mame/konami/simpsons.cpp:643
- `maincpu.line -> simpsons_state.banking_callback` - src/mame/konami/simpsons.cpp:644
- `screen.set_screen_update -> simpsons_state.screen_update` - src/mame/konami/simpsons.cpp:659
- `k052109.set_tile_callback -> simpsons_state.tile_callback` - src/mame/konami/simpsons.cpp:667
- `k052109.irq_handler -> maincpu` - src/mame/konami/simpsons.cpp:668
- `k053246.set_sprite_callback -> simpsons_state.sprite_callback` - src/mame/konami/simpsons.cpp:671
- `k053260.sh1_cb -> simpsons_state.z80_nmi_w` - src/mame/konami/simpsons.cpp:689
