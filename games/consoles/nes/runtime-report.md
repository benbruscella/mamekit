# nes source-generation report

Playability: **executable**

MAME source coverage: **31/47 nodes (66%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 9 | Hardware lowered from MAME source to executable IR |
| Generated | 7 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 2 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **5/5**

Address-map handlers compiled: **3/3**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **1**

Screen update: **nes_state.screen_update_nes** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `screen.set_screen_update -> nes_state.screen_update_nes` - src/mame/nintendo/nes.cpp:423
- `screen.screen_vblank -> nes_state.screen_vblank_nes` - src/mame/nintendo/nes.cpp:424
- `ppu.int_callback -> maincpu` - src/mame/nintendo/nes.cpp:428
