# kungfum source-generation report

Playability: **executable**

MAME source coverage: **135/181 nodes (74.6%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 23 | Hardware lowered from MAME source to executable IR |
| Generated | 23 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 6 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **18/18**

Address-map handlers compiled: **6/6**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **1**

Screen update: **m62_state.screen_update_kungfum** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `maincpu.set_vblank_int -> screen.irq0_line_hold` - src/mame/irem/m62.cpp:937
- `screen.set_screen_update -> m62_state.screen_update_kungfum` - src/mame/irem/m62.cpp:966
- `iremsound.in_p1_cb -> m62_audio_device.m6803_port1_r` - src/mame/irem/irem.cpp:405
- `iremsound.out_p1_cb -> m62_audio_device.m6803_port1_w` - src/mame/irem/irem.cpp:406
- `iremsound.in_p2_cb -> m62_audio_device.m6803_port2_r` - src/mame/irem/irem.cpp:407
- `iremsound.out_p2_cb -> m62_audio_device.m6803_port2_w` - src/mame/irem/irem.cpp:408
- `ay_45m.port_a_read_callback -> irem_audio_device.soundlatch_r` - src/mame/irem/irem.cpp:416
- `ay_45m.port_b_write_callback -> irem_audio_device.ay8910_45M_portb_w` - src/mame/irem/irem.cpp:417
- `ay_45l.port_a_write_callback -> irem_audio_device.ay8910_45L_porta_w` - src/mame/irem/irem.cpp:425
- `msm1.vck_callback -> iremsound` - src/mame/irem/irem.cpp:431
- `msm1.vck_callback -> msm2.vclk_w` - src/mame/irem/irem.cpp:432
