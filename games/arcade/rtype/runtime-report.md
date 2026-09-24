# rtype source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **130/181 nodes (71.8%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 14 | Hardware lowered from MAME source to executable IR |
| Generated | 27 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 4 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **28/28**

Address-map handlers compiled: **15/15**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **0**

Screen update: **m72_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `scanline_timer.timer -> m72_state.scanline_interrupt` - src/mame/irem/m72.cpp:256
- `soundcpu.set_irq_acknowledge_callback -> soundirq.inta_cb` - src/mame/irem/m72.cpp:1671
- `soundlatch.data_pending_callback -> soundirq.rst18_w` - src/mame/irem/m72.cpp:1666
- `soundirq.int_callback -> soundcpu` - src/mame/irem/m72.cpp:1669
- `ymsnd.irq_handler -> soundirq.rst28_w` - src/mame/irem/m72.cpp:1678
- `maincpu.set_irq_acknowledge_callback -> upd71059c.inta_cb` - src/mame/irem/m72.cpp:1690
- `upd71059c.out_int_callback -> maincpu` - src/mame/irem/m72.cpp:1697
- `screen.set_screen_update -> m72_state.screen_update` - src/mame/irem/m72.cpp:1707
