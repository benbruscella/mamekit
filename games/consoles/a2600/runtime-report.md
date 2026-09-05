# a2600 source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **79/122 nodes (64.8%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 23 | Hardware lowered from MAME source to executable IR |
| Generated | 10 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 2 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **50/50**

Address-map handlers compiled: **0/0**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **0**

Screen update: **tia_video_device.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `tia_video.read_input_port_callback -> a2600_state.a2600_read_input_port` - src/mame/atari/a2600.cpp:611
- `tia_video.databus_contents_callback -> a2600_state.a2600_get_databus_contents` - src/mame/atari/a2600.cpp:612
- `tia_video.vsync_callback -> a2600_state.a2600_tia_vsync_callback` - src/mame/atari/a2600.cpp:613
- `screen.set_screen_update -> tia_video.screen_update` - src/mame/atari/a2600.cpp:617
- `riot.pa_rd_callback -> a2600_state.switch_A_r` - src/mame/atari/a2600.cpp:625
- `riot.pa_wr_callback -> a2600_state.switch_A_w` - src/mame/atari/a2600.cpp:626
- `riot.pb_rd_callback -> SWB` - src/mame/atari/a2600.cpp:627
- `riot.pb_wr_callback -> a2600_state.switch_B_w` - src/mame/atari/a2600.cpp:628
- `riot.irq_wr_callback -> a2600_state.irq_callback` - src/mame/atari/a2600.cpp:629
