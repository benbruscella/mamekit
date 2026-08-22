# venture source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **125/147 nodes (85%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 17 | Hardware lowered from MAME source to executable IR |
| Generated | 30 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 4 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **29/29**

Address-map handlers compiled: **6/6**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **1**

Screen update: **exidy_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `maincpu.set_vblank_int -> screen.exidy_vblank_interrupt` - src/mame/exidy/exidy.cpp:1510
- `screen.set_screen_update -> exidy_state.screen_update` - src/mame/exidy/exidy.cpp:1519
- `pia.writepa_handler -> soundbd.pb_w` - src/mame/exidy/exidy.cpp:1612
- `pia.writepb_handler -> soundbd.pa_w` - src/mame/exidy/exidy.cpp:1613
- `pia.ca2_handler -> soundbd.cb_w` - src/mame/exidy/exidy.cpp:1614
- `pia.cb2_handler -> soundbd.ca_w` - src/mame/exidy/exidy.cpp:1615
- `soundbd.pa_callback -> pia.portb_w` - src/mame/exidy/exidy.cpp:1618
- `soundbd.pb_callback -> pia.porta_w` - src/mame/exidy/exidy.cpp:1619
- `soundbd.ca2_callback -> pia.cb1_w` - src/mame/exidy/exidy.cpp:1620
- `soundbd.cb2_callback -> pia.ca1_w` - src/mame/exidy/exidy.cpp:1621
- `riot.irq_wr_callback -> audioirq.in_w_0` - src/mame/shared/exidysound.cpp:187
- `pia.irqa_handler -> audioirq.in_w_1` - src/mame/shared/exidysound.cpp:190
- `pit.out_handler<0> -> exidy_sh8253_sound_device.pit_out_0` - src/mame/shared/exidysound.cpp:196
- `pit.out_handler<1> -> exidy_sh8253_sound_device.pit_out_1` - src/mame/shared/exidysound.cpp:197
- `pit.out_handler<2> -> exidy_sh8253_sound_device.pit_out_2` - src/mame/shared/exidysound.cpp:198
- `audioirq.output_handler -> audiocpu` - src/mame/shared/exidysound.cpp:200
- `pia.writepa_handler -> venture_sound_device.pia_pa_w` - src/mame/shared/exidysound.cpp:587
- `pia.writepb_handler -> venture_sound_device.pia_pb_w` - src/mame/shared/exidysound.cpp:588
- `pia.ca2_handler -> venture_sound_device.pia_ca2_w` - src/mame/shared/exidysound.cpp:589
- `pia.cb2_handler -> venture_sound_device.pia_cb2_w` - src/mame/shared/exidysound.cpp:590
