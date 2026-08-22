# matmania source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **98/136 nodes (72.1%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 11 | Hardware lowered from MAME source to executable IR |
| Generated | 11 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 5 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **5/5**

Address-map handlers compiled: **2/2**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **2**

Screen update: **matmania_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `maincpu.set_vblank_int -> screen.irq0_line_hold` - src/mame/technos/matmania.cpp:640
- `scantimer.configure_scanline -> matmania_state.scanline` - src/mame/technos/matmania.cpp:645
- `screen.set_screen_update -> matmania_state.screen_update` - src/mame/technos/matmania.cpp:650
- `soundlatch.data_pending_callback -> audiocpu` - src/mame/technos/matmania.cpp:659
