# tmnt source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **104/180 nodes (57.8%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 20 | Hardware lowered from MAME source to executable IR |
| Generated | 23 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 6 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **27/27**

Address-map handlers compiled: **8/8**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **1**

Screen update: **tmnt_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `screen.set_screen_update -> tmnt_state.screen_update` - src/mame/konami/tmnt.cpp:942
- `screen.screen_vblank -> tmnt_state.vblank_w` - src/mame/konami/tmnt.cpp:944
- `k052109.set_tile_callback -> tmnt_state.tmnt_tile_callback` - src/mame/konami/tmnt.cpp:956
- `k051960.set_sprite_callback -> tmnt_state.tmnt_sprite_callback` - src/mame/konami/tmnt.cpp:961
- `k007232.port_write -> tmnt_state.volume_callback` - src/mame/konami/tmnt.cpp:974
