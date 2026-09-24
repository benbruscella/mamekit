# bnj source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **122/173 nodes (70.5%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 12 | Hardware lowered from MAME source to executable IR |
| Generated | 20 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 7 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **17/17**

Address-map handlers compiled: **8/8**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **1**

Screen update: **btime_state.screen_update_bnj** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `8vck.configure_scanline -> btime_state.audio_nmi_gen` - src/mame/dataeast/btime.cpp:2305
- `audionmi.output_handler -> audiocpu` - src/mame/dataeast/btime.cpp:2307
- `soundlatch.data_pending_callback -> audiocpu` - src/mame/dataeast/btime.cpp:2322
- `ay1.port_a_write_callback -> btime_state.ay_audio_nmi_enable_w` - src/mame/dataeast/btime.cpp:2327
- `screen.set_screen_update -> btime_state.screen_update_bnj`
- `palette.palette_init -> btime_state.btime_palette` - src/mame/dataeast/btime.cpp:2316
