# panic source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **58/95 nodes (61.1%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 3 | Hardware lowered from MAME source to executable IR |
| Generated | 12 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 5 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **10/10**

Address-map handlers compiled: **4/4**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **1**

Screen update: **cosmic_state.screen_update_panic** (compiled)

## Executable generation gaps

- None

## Audio accuracy

Sample effects are synthesized approximations; original recorded samples are not played.

## Parser gaps

- None detected

## Generated callback wiring

- `screen.set_screen_update -> cosmic_state.screen_update_panic` - src/mame/universal/cosmic.cpp:843
- `scantimer.configure_scanline -> cosmic_state.panic_scanline` - src/mame/universal/cosmic.cpp:837
- `palette.palette_init -> cosmic_state.panic_palette` - src/mame/universal/cosmic.cpp:841
