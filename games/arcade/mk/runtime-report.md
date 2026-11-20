# mk source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **137/201 nodes (68.2%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 22 | Hardware lowered from MAME source to executable IR |
| Generated | 27 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 7 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **41/44**

Address-map handlers compiled: **12/12**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **0**

Screen update: **tms34010_device.tms340x0_ind16** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `video.dma_irq_cb -> maincpu` - src/mame/williams/midtunit.cpp:609
- `maincpu.set_scanline_ind16_callback -> video.scanline_update` - src/mame/williams/midtunit.cpp:616
- `maincpu.set_shiftreg_in_callback -> video.to_shiftreg` - src/mame/williams/midtunit.cpp:617
- `maincpu.set_shiftreg_out_callback -> video.from_shiftreg` - src/mame/williams/midtunit.cpp:618
- `screen.set_screen_update -> maincpu.tms340x0_ind16` - src/mame/williams/midtunit.cpp:631
- `ym2151.irq_handler -> cpu` - src/mame/shared/williamssound.cpp:772
- `debugscreen.set_screen_update -> midtunit_video_device.debug_screen_update` - src/mame/williams/midtview.ipp:46
