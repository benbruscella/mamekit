# spec128 source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **153/259 nodes (59.1%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 16 | Hardware lowered from MAME source to executable IR |
| Generated | 27 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 4 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **78/80**

Address-map handlers compiled: **13/13**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **1**

Screen update: **spectrum_state.screen_update_spectrum** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `maincpu.set_vblank_int -> screen.spec_interrupt` - src/mame/sinclair/spec128.cpp:423
- `maincpu.refresh_cb -> spectrum_128_state.spectrum_refresh_w` - src/mame/sinclair/spec128.cpp:424
- `maincpu.nomreq_cb -> ula.nomem_rq` - src/mame/sinclair/spec128.cpp:425
- `maincpu.busack_cb -> dma.bai_w` - src/mame/sinclair/spec128.cpp:426
- `exp.irq_handler -> maincpu` - src/mame/sinclair/spec128.cpp:447
- `exp.nmi_handler -> maincpu` - src/mame/sinclair/spec128.cpp:448
- `exp.fb_r_handler -> spectrum_128_state.floating_bus_r` - src/mame/sinclair/spec128.cpp:449
- `dma.out_busreq_callback -> maincpu` - src/mame/sinclair/spec128.cpp:453
- `dma.out_int_callback -> maincpu` - src/mame/sinclair/spec128.cpp:454
- `screen.set_screen_update -> spectrum_state.screen_update_spectrum` - src/mame/sinclair/spectrum.cpp:755
- `snapshot.set_load_callback -> spectrum_state.snapshot_cb` - src/mame/sinclair/spectrum.cpp:786
- `quickload.set_load_callback -> spectrum_state.quickload_cb` - src/mame/sinclair/spectrum.cpp:788
- `palette.palette_init -> spectrum_state.spectrum_palette` - src/mame/sinclair/spectrum.cpp:758
