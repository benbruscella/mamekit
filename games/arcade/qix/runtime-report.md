# qix source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **136/166 nodes (81.9%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 26 | Hardware lowered from MAME source to executable IR |
| Generated | 42 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 5 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **26/26**

Address-map handlers compiled: **15/15**

## Generated execution plan

CPU schedules: **3**

Frame callbacks: **0**

Screen update: **mc6845_device.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `pia0.readpa_handler -> P1` - src/mame/taito/qix.cpp:648
- `pia0.readpb_handler -> COIN` - src/mame/taito/qix.cpp:650
- `pia1.readpa_handler -> SPARE` - src/mame/taito/qix.cpp:653
- `pia1.readpb_handler -> IN0` - src/mame/taito/qix.cpp:655
- `pia2.readpa_handler -> P2` - src/mame/taito/qix.cpp:658
- `pia2.writepb_handler -> qix_state.coinctr_w` - src/mame/taito/qix.cpp:660
- `vid_u18.out_de_callback -> qix_state.display_enable_changed` - src/mame/taito/qix_v.cpp:380
- `vid_u18.out_vsync_callback -> qix_state.vsync_changed` - src/mame/taito/qix_v.cpp:381
- `screen.set_screen_update -> vid_u18.screen_update` - src/mame/taito/qix_v.cpp:385
- `dint.output_handler -> maincpu` - src/mame/taito/qix_a.cpp:151
- `sint.output_handler -> audiocpu` - src/mame/taito/qix_a.cpp:154
- `sndpia0.writepa_handler -> qix_state.sync_sndpia1_porta_w` - src/mame/taito/qix_a.cpp:157
- `sndpia0.writepb_handler -> qix_state.vol_w` - src/mame/taito/qix_a.cpp:158
- `sndpia0.ca2_handler -> sndpia1.ca1_w` - src/mame/taito/qix_a.cpp:160
- `sndpia0.cb2_handler -> qix_state.flip_screen_w` - src/mame/taito/qix_a.cpp:161
- `sndpia0.irqa_handler -> dint.in_w_0` - src/mame/taito/qix_a.cpp:162
- `sndpia0.irqb_handler -> dint.in_w_1` - src/mame/taito/qix_a.cpp:163
- `sndpia1.writepa_handler -> sndpia0.porta_w` - src/mame/taito/qix_a.cpp:166
- `sndpia1.writepb_handler -> qix_state.dac_w` - src/mame/taito/qix_a.cpp:167
- `sndpia1.ca2_handler -> sndpia0.ca1_w` - src/mame/taito/qix_a.cpp:169
- `sndpia1.irqa_handler -> sint.in_w_0` - src/mame/taito/qix_a.cpp:170
- `sndpia1.irqb_handler -> sint.in_w_1` - src/mame/taito/qix_a.cpp:171
- `sndpia2.writepa_handler -> qix_state.sndpia_2_warning_w` - src/mame/taito/qix_a.cpp:174
- `sndpia2.writepb_handler -> qix_state.sndpia_2_warning_w` - src/mame/taito/qix_a.cpp:175
- `sndpia2.ca2_handler -> qix_state.sndpia_2_warning_w` - src/mame/taito/qix_a.cpp:176
- `sndpia2.cb2_handler -> qix_state.sndpia_2_warning_w` - src/mame/taito/qix_a.cpp:177
