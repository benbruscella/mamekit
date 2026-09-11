# gberet source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **70/115 nodes (60.9%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 7 | Hardware lowered from MAME source to executable IR |
| Generated | 19 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 5 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **13/13**

Address-map handlers compiled: **4/4**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **0**

Screen update: **gberet_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `k005849.set_irq_cb -> mainirq.in_w_0` - src/mame/konami/gberet.cpp:742
- `k005849.set_firq_cb -> mainirq.in_w_1` - src/mame/konami/gberet.cpp:743
- `k005849.set_nmi_cb -> maincpu` - src/mame/konami/gberet.cpp:744
- `k005849.set_flipscreen_cb -> gberet_state.flip_screen_set` - src/mame/konami/gberet.cpp:745
- `mainirq.output_handler -> maincpu` - src/mame/konami/gberet.cpp:748
- `screen.set_screen_update -> gberet_state.screen_update` - src/mame/konami/gberet.cpp:752
- `palette.palette_init -> gberet_state.palette` - src/mame/konami/gberet.cpp:756
