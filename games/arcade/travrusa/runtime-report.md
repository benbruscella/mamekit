# travrusa source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **74/130 nodes (56.9%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 8 | Hardware lowered from MAME source to executable IR |
| Generated | 22 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 5 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **19/19**

Address-map handlers compiled: **6/6**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **1**

Screen update: **travrusa_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `screen.set_screen_update -> travrusa_state.screen_update` - src/mame/irem/travrusa.cpp:710
- `screen.screen_vblank -> maincpu` - src/mame/irem/travrusa.cpp:715
- `iremsound.in_p1_cb -> m52_soundc_audio_device.m6803_port1_r`
- `iremsound.out_p1_cb -> m52_soundc_audio_device.m6803_port1_w`
- `iremsound.in_p2_cb -> m52_soundc_audio_device.m6803_port2_r`
- `iremsound.out_p2_cb -> m52_soundc_audio_device.m6803_port2_w`
- `ay_45m.port_a_read_callback -> irem_audio_device.soundlatch_r` - src/mame/irem/irem.cpp:416
- `ay_45m.port_b_write_callback -> irem_audio_device.ay8910_45M_portb_w` - src/mame/irem/irem.cpp:417
- `ay_45l.port_a_write_callback -> irem_audio_device.ay8910_45L_porta_w` - src/mame/irem/irem.cpp:425
- `msm1.vck_callback -> iremsound` - src/mame/irem/irem.cpp:431
