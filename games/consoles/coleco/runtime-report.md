# coleco source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **50/166 nodes (30.1%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 8 | Hardware lowered from MAME source to executable IR |
| Generated | 12 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 3 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **8/8**

Address-map handlers compiled: **6/6**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **0**

Screen update: **tms9928a_device.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `tms9928a.int_callback -> maincpu` - src/mame/coleco/coleco.cpp:575
- `sn76489a.ready_cb -> maincpu` - src/mame/coleco/coleco.cpp:582
- `exp.int_handler -> maincpu` - src/mame/coleco/coleco.cpp:596
- `exp.nmi_handler -> maincpu` - src/mame/coleco/coleco.cpp:597
- `screen.set_screen_update -> tms9928a_device.screen_update` - src/mame/coleco/coleco.cpp:572
