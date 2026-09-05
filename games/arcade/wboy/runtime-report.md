# wboy source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **128/190 nodes (67.4%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 11 | Hardware lowered from MAME source to executable IR |
| Generated | 28 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 5 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **24/24**

Address-map handlers compiled: **10/10**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **2**

Screen update: **system1_state.screen_update_system1** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `soundirq.configure_scanline -> system1_state.soundirq_gen` - src/mame/sega/system1.cpp:2208
- `screen.set_screen_update -> system1_state.screen_update_system1` - src/mame/sega/system1.cpp:2224
- `screen.screen_vblank -> maincpu` - src/mame/sega/system1.cpp:2226
- `sn1.ready_cb -> sn_ready.in_w_0` - src/mame/sega/system1.cpp:2246
- `sn2.ready_cb -> sn_ready.in_w_1` - src/mame/sega/system1.cpp:2247
- `sn_ready.output_handler -> soundcpu` - src/mame/sega/system1.cpp:2244
- `pio.out_pa_callback -> system1_state.soundport_w` - src/mame/sega/system1.cpp:2267
- `pio.out_ardy_callback -> soundcpu` - src/mame/sega/system1.cpp:2268
- `pio.out_pb_callback -> system1_state.videomode_w` - src/mame/sega/system1.cpp:2269
- `maincpu.refresh_cb -> system1_state.adjust_cycles` - src/mame/sega/system1.cpp:2337
- `palette.palette_init -> system1_state.system1_palette` - src/mame/sega/system1.cpp:2229
