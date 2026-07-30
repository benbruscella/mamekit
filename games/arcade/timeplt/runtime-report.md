# timeplt source-generation report

Playability: **executable**

MAME source coverage: **96/136 nodes (70.6%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 14 | Hardware lowered from MAME source to executable IR |
| Generated | 24 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 5 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **16/16**

Address-map handlers compiled: **5/5**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **1**

Screen update: **timeplt_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `mainlatch.q_out_cb<0> -> timeplt_state.nmi_enable_w` - src/mame/konami/timeplt.cpp:747
- `mainlatch.q_out_cb<1> -> timeplt_state.flip_screen_set` - src/mame/konami/timeplt.cpp:748
- `mainlatch.q_out_cb<2> -> timeplt_audio.sh_irqtrigger_w` - src/mame/konami/timeplt.cpp:749
- `mainlatch.q_out_cb<3> -> timeplt_audio.mute_w` - src/mame/konami/timeplt.cpp:750
- `mainlatch.q_out_cb<4> -> timeplt_state.video_enable_w` - src/mame/konami/timeplt.cpp:751
- `mainlatch.q_out_cb<5> -> timeplt_state.coin_counter_w_0` - src/mame/konami/timeplt.cpp:752
- `mainlatch.q_out_cb<6> -> timeplt_state.coin_counter_w_1` - src/mame/konami/timeplt.cpp:753
- `mainlatch.q_out_cb<7> -> set_nop` - src/mame/konami/timeplt.cpp:754
- `screen.set_screen_update -> timeplt_state.screen_update` - src/mame/konami/timeplt.cpp:764
- `screen.screen_vblank -> timeplt_state.vblank_irq` - src/mame/konami/timeplt.cpp:766
- `ay1.port_a_read_callback -> soundlatch.read` - src/mame/shared/timeplt_a.cpp:201
- `ay1.port_b_read_callback -> timeplt_audio_device.portB_r` - src/mame/shared/timeplt_a.cpp:202
