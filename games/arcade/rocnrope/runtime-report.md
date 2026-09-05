# rocnrope source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **111/155 nodes (71.6%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 16 | Hardware lowered from MAME source to executable IR |
| Generated | 23 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 5 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **18/18**

Address-map handlers compiled: **4/4**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **1**

Screen update: **rocnrope_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `mainlatch.q_out_cb<0> -> rocnrope_state.flip_screen_set` - src/mame/konami/rocnrope.cpp:396
- `mainlatch.q_out_cb<1> -> timeplt_audio.sh_irqtrigger_w` - src/mame/konami/rocnrope.cpp:397
- `mainlatch.q_out_cb<2> -> timeplt_audio.mute_w` - src/mame/konami/rocnrope.cpp:398
- `mainlatch.q_out_cb<3> -> rocnrope_state.coin_counter_w_0` - src/mame/konami/rocnrope.cpp:399
- `mainlatch.q_out_cb<4> -> rocnrope_state.coin_counter_w_1` - src/mame/konami/rocnrope.cpp:400
- `mainlatch.q_out_cb<7> -> rocnrope_state.irq_mask_w` - src/mame/konami/rocnrope.cpp:401
- `screen.set_screen_update -> rocnrope_state.screen_update` - src/mame/konami/rocnrope.cpp:411
- `screen.screen_vblank -> rocnrope_state.vblank_irq` - src/mame/konami/rocnrope.cpp:413
- `ay1.port_a_read_callback -> soundlatch.read` - src/mame/shared/timeplt_a.cpp:201
- `ay1.port_b_read_callback -> timeplt_audio_device.portB_r` - src/mame/shared/timeplt_a.cpp:202
- `palette.palette_init -> rocnrope_state.palette` - src/mame/konami/rocnrope.cpp:416
