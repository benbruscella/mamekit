# scramble source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **163/194 nodes (84%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 7 | Hardware lowered from MAME source to executable IR |
| Generated | 27 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 26 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **40/40**

Address-map handlers compiled: **13/13**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **1**

Screen update: **galaxian_state.screen_update_galaxian** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `screen.set_screen_update -> galaxian_state.screen_update_galaxian` - src/mame/galaxian/galaxian.cpp:7500
- `screen.screen_vblank -> galaxian_state.vblank_interrupt_w` - src/mame/galaxian/galaxian.cpp:7501
- `ppi8255_0.in_pa_callback -> IN0` - src/mame/galaxian/galaxian.cpp:7530
- `ppi8255_0.in_pb_callback -> IN1` - src/mame/galaxian/galaxian.cpp:7531
- `ppi8255_0.in_pc_callback -> IN2` - src/mame/galaxian/galaxian.cpp:7532
- `ppi8255_0.out_pc_callback -> galaxian_state.konami_portc_0_w` - src/mame/galaxian/galaxian.cpp:7533
- `ppi8255_1.out_pa_callback -> soundlatch.write` - src/mame/galaxian/galaxian.cpp:7536
- `ppi8255_1.out_pb_callback -> galaxian_state.konami_sound_control_w` - src/mame/galaxian/galaxian.cpp:7537
- `8910.0.port_a_read_callback -> soundlatch.read` - src/mame/galaxian/galaxian.cpp:7596
- `8910.0.port_b_read_callback -> galaxian_state.konami_sound_timer_r` - src/mame/galaxian/galaxian.cpp:7597
- `ppi8255_1.in_pc_callback -> galaxian_state.theend_protection_r` - src/mame/galaxian/galaxian.cpp:8180
- `ppi8255_1.out_pc_callback -> galaxian_state.theend_protection_w` - src/mame/galaxian/galaxian.cpp:8181
