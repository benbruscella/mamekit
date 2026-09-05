# pooyan source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **101/133 nodes (75.9%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 16 | Hardware lowered from MAME source to executable IR |
| Generated | 22 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 5 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **17/17**

Address-map handlers compiled: **3/3**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **1**

Screen update: **pooyan_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `mainlatch.q_out_cb<0> -> pooyan_state.irq_enable_w` - src/mame/konami/pooyan.cpp:428
- `mainlatch.q_out_cb<1> -> timeplt_audio.sh_irqtrigger_w` - src/mame/konami/pooyan.cpp:429
- `mainlatch.q_out_cb<2> -> timeplt_audio.mute_w` - src/mame/konami/pooyan.cpp:430
- `mainlatch.q_out_cb<3> -> pooyan_state.coin_counter_w_0` - src/mame/konami/pooyan.cpp:431
- `mainlatch.q_out_cb<4> -> pooyan_state.coin_counter_w_1` - src/mame/konami/pooyan.cpp:432
- `mainlatch.q_out_cb<5> -> set_nop` - src/mame/konami/pooyan.cpp:433
- `mainlatch.q_out_cb<7> -> pooyan_state.flip_screen_set` - src/mame/konami/pooyan.cpp:434
- `screen.set_screen_update -> pooyan_state.screen_update` - src/mame/konami/pooyan.cpp:441
- `screen.screen_vblank -> pooyan_state.vblank_irq` - src/mame/konami/pooyan.cpp:443
- `ay1.port_a_read_callback -> soundlatch.read` - src/mame/shared/timeplt_a.cpp:201
- `ay1.port_b_read_callback -> timeplt_audio_device.portB_r` - src/mame/shared/timeplt_a.cpp:202
- `palette.palette_init -> pooyan_state.palette` - src/mame/konami/pooyan.cpp:446
