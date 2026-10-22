# berzerk source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **87/134 nodes (64.9%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 6 | Hardware lowered from MAME source to executable IR |
| Generated | 28 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 3 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **25/25**

Address-map handlers compiled: **14/14**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **0**

Screen update: **berzerk_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `irq_timer.timer -> berzerk_state.irq_callback` - src/mame/stern/berzerk.cpp:284
- `nmi_timer.timer -> berzerk_state.nmi_callback` - src/mame/stern/berzerk.cpp:361
- `maincpu.set_irq_acknowledge_callback -> berzerk_state.vector_r` - src/mame/stern/berzerk.cpp:1180
- `screen.set_screen_update -> berzerk_state.screen_update` - src/mame/stern/berzerk.cpp:1190
