# mpatrol source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **121/182 nodes (66.5%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 8 | Hardware lowered from MAME source to executable IR |
| Generated | 28 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 9 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **28/28**

Address-map handlers compiled: **12/12**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **1**

Screen update: **m52_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `maincpu.set_vblank_int -> screen.irq0_line_hold` - src/mame/irem/m52.cpp:951
- `screen.set_screen_update -> m52_state.screen_update` - src/mame/irem/m52.cpp:965
- `iremsound.in_p1_cb -> m52_soundc_audio_device.m6803_port1_r` - src/mame/irem/irem.cpp:471
- `iremsound.out_p1_cb -> m52_soundc_audio_device.m6803_port1_w` - src/mame/irem/irem.cpp:472
- `iremsound.in_p2_cb -> m52_soundc_audio_device.m6803_port2_r` - src/mame/irem/irem.cpp:473
- `iremsound.out_p2_cb -> m52_soundc_audio_device.m6803_port2_w` - src/mame/irem/irem.cpp:474
- `ay_45m.port_a_read_callback -> irem_audio_device.soundlatch_r` - src/mame/irem/irem.cpp:482
- `ay_45m.port_b_write_callback -> irem_audio_device.ay8910_45M_portb_w` - src/mame/irem/irem.cpp:483
- `ay_45l.port_a_write_callback -> irem_audio_device.ay8910_45L_porta_w` - src/mame/irem/irem.cpp:489
- `msm1.vck_callback -> iremsound` - src/mame/irem/irem.cpp:493
