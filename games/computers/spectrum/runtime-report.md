# spectrum source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **103/182 nodes (56.6%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 10 | Hardware lowered from MAME source to executable IR |
| Generated | 20 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 4 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **55/57**

Address-map handlers compiled: **6/6**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **1**

Screen update: **spectrum_state.screen_update_spectrum** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `maincpu.set_vblank_int -> screen.spec_interrupt` - src/mame/sinclair/spectrum.cpp:736
- `maincpu.refresh_cb -> spectrum_state.spectrum_refresh_w` - src/mame/sinclair/spectrum.cpp:737
- `maincpu.nomreq_cb -> ula.nomem_rq` - src/mame/sinclair/spectrum.cpp:738
- `maincpu.busack_cb -> dma.bai_w` - src/mame/sinclair/spectrum.cpp:739
- `screen.set_screen_update -> spectrum_state.screen_update_spectrum` - src/mame/sinclair/spectrum.cpp:755
- `exp.irq_handler -> maincpu` - src/mame/sinclair/spectrum.cpp:772
- `exp.nmi_handler -> maincpu` - src/mame/sinclair/spectrum.cpp:773
- `exp.fb_r_handler -> spectrum_state.floating_bus_r` - src/mame/sinclair/spectrum.cpp:774
- `dma.out_busreq_callback -> maincpu` - src/mame/sinclair/spectrum.cpp:778
- `dma.out_int_callback -> maincpu` - src/mame/sinclair/spectrum.cpp:779
- `snapshot.set_load_callback -> spectrum_state.snapshot_cb` - src/mame/sinclair/spectrum.cpp:786
- `quickload.set_load_callback -> spectrum_state.quickload_cb` - src/mame/sinclair/spectrum.cpp:788
- `palette.palette_init -> spectrum_state.spectrum_palette` - src/mame/sinclair/spectrum.cpp:758
