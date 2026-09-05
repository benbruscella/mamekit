# rygar source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **117/186 nodes (62.9%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 10 | Hardware lowered from MAME source to executable IR |
| Generated | 30 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 6 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **24/24**

Address-map handlers compiled: **14/14**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **1**

Screen update: **tecmo_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `maincpu.set_vblank_int -> screen.irq0_line_hold` - src/mame/tecmo/tecmo.cpp:1147
- `screen.set_screen_update -> tecmo_state.screen_update` - src/mame/tecmo/tecmo.cpp:1159
- `spritegen.set_pri_callback -> tecmo_state.pri_cb` - src/mame/tecmo/tecmo.cpp:1166
- `soundlatch.data_pending_callback -> soundcpu` - src/mame/tecmo/tecmo.cpp:1172
- `ymsnd.irq_handler -> soundcpu` - src/mame/tecmo/tecmo.cpp:1176
- `msm.vck_callback -> tecmo_state.adpcm_int` - src/mame/tecmo/tecmo.cpp:1180
