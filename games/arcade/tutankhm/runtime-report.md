# tutankhm source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **114/161 nodes (70.8%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 16 | Hardware lowered from MAME source to executable IR |
| Generated | 23 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 6 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **27/27**

Address-map handlers compiled: **3/3**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **1**

Screen update: **tutankhm_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `mainlatch.q_out_cb<0> -> tutankhm_state.irq_enable_w` - src/mame/konami/tutankhm.cpp:290
- `mainlatch.q_out_cb<1> -> set_nop` - src/mame/konami/tutankhm.cpp:291
- `mainlatch.q_out_cb<2> -> tutankhm_state.coin_counter_2_w` - src/mame/konami/tutankhm.cpp:292
- `mainlatch.q_out_cb<3> -> tutankhm_state.coin_counter_1_w` - src/mame/konami/tutankhm.cpp:293
- `mainlatch.q_out_cb<4> -> tutankhm_state.stars_enable_w` - src/mame/konami/tutankhm.cpp:294
- `mainlatch.q_out_cb<5> -> timeplt_audio.mute_w` - src/mame/konami/tutankhm.cpp:295
- `mainlatch.q_out_cb<6> -> tutankhm_state.flip_screen_x_w` - src/mame/konami/tutankhm.cpp:296
- `mainlatch.q_out_cb<7> -> tutankhm_state.flip_screen_y_w` - src/mame/konami/tutankhm.cpp:297
- `screen.set_screen_update -> tutankhm_state.screen_update` - src/mame/konami/tutankhm.cpp:306
- `screen.screen_vblank -> tutankhm_state.vblank_irq` - src/mame/konami/tutankhm.cpp:307
- `ay1.port_a_read_callback -> soundlatch.read` - src/mame/shared/timeplt_a.cpp:201
- `ay1.port_b_read_callback -> timeplt_audio_device.portB_r` - src/mame/shared/timeplt_a.cpp:202
