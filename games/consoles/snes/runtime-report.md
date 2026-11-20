# snes source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **166/213 nodes (77.9%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 20 | Hardware lowered from MAME source to executable IR |
| Generated | 11 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 2 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **130/130**

Address-map handlers compiled: **0/0**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **0**

Screen update: **snes_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `soundcpu.dsp_io_read_callback -> s_dsp.dsp_io_r` - src/mame/nintendo/snes.cpp:1342
- `soundcpu.dsp_io_write_callback -> s_dsp.dsp_io_w` - src/mame/nintendo/snes.cpp:1343
- `scpu_irq.output_handler -> maincpu` - src/mame/nintendo/snes.cpp:1349
- `screen.set_screen_update -> snes_state.screen_update` - src/mame/nintendo/snes.cpp:1355
- `ppu.open_bus_callback -> snes_console_state.snes_open_bus_r` - src/mame/nintendo/snes.cpp:1358
- `ctrl1.set_onscreen_callback -> snes_console_state.onscreen_cb` - src/mame/nintendo/snes.cpp:1362
- `ctrl2.set_onscreen_callback -> snes_console_state.onscreen_cb` - src/mame/nintendo/snes.cpp:1364
- `ctrl2.set_gunlatch_callback -> snes_console_state.gun_latch_cb` - src/mame/nintendo/snes.cpp:1365
- `snsslot.irq_callback -> scpu_irq.in_w_1` - src/mame/nintendo/snes.cpp:1377
- `snsslot.open_bus_callback -> snes_console_state.snes_open_bus_r` - src/mame/nintendo/snes.cpp:1378
