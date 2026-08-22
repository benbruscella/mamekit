# gunsmoke source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **107/152 nodes (70.4%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 11 | Hardware lowered from MAME source to executable IR |
| Generated | 15 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 4 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **11/11**

Address-map handlers compiled: **5/5**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **2**

Screen update: **gunsmoke_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `maincpu.set_vblank_int -> screen.irq0_line_hold` - src/mame/capcom/gunsmoke.cpp:565
- `audiocpu.set_periodic_int -> gunsmoke_state.irq0_line_hold` - src/mame/capcom/gunsmoke.cpp:571
- `screen.set_screen_update -> gunsmoke_state.screen_update` - src/mame/capcom/gunsmoke.cpp:578
