# elevator source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **184/244 nodes (75.4%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 21 | Hardware lowered from MAME source to executable IR |
| Generated | 42 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 6 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **52/52**

Address-map handlers compiled: **13/13**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **2**

Screen update: **taitosj_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `audiocpu.set_periodic_int -> taitosj_state.irq0_line_hold` - src/mame/taito/taitosj.cpp:1674
- `screen.set_screen_update -> taitosj_state.screen_update` - src/mame/taito/taitosj.cpp:1679
- `screen.screen_vblank -> maincpu` - src/mame/taito/taitosj.cpp:1682
- `soundnmi1.output_handler -> soundnmi2.in_w_0` - src/mame/taito/taitosj.cpp:1690
- `soundnmi2.output_handler -> audiocpu` - src/mame/taito/taitosj.cpp:1692
- `ay1.port_a_read_callback -> DSW2` - src/mame/taito/taitosj.cpp:1695
- `ay1.port_b_read_callback -> DSW3` - src/mame/taito/taitosj.cpp:1696
- `ay2.port_a_write_callback -> dac.data_w` - src/mame/taito/taitosj.cpp:1701
- `ay2.port_b_write_callback -> taitosj_state.dacvol_w` - src/mame/taito/taitosj.cpp:1702
- `ay3.port_a_write_callback -> taitosj_state.input_port_4_f0_w` - src/mame/taito/taitosj.cpp:1707
- `ay4.port_b_write_callback -> taitosj_state.sndnmi_msk_w` - src/mame/taito/taitosj.cpp:1715
- `maincpu.busack_cb -> mcu.busak_w` - src/mame/taito/taitosj.cpp:1734
- `mcu.m68read_cb -> taitosj_state.mcu_mem_r` - src/mame/taito/taitosj.cpp:1739
- `mcu.m68write_cb -> taitosj_state.mcu_mem_w` - src/mame/taito/taitosj.cpp:1740
- `mcu.m68intrq_cb -> taitosj_state.mcu_intrq_w` - src/mame/taito/taitosj.cpp:1741
- `mcu.busrq_cb -> maincpu` - src/mame/taito/taitosj.cpp:1742
- `mcu.porta_r -> taito_sj_security_mcu_device.mcu_pa_r` - src/mame/taito/taitosjsec.cpp:124
- `mcu.portc_r -> taito_sj_security_mcu_device.mcu_pc_r` - src/mame/taito/taitosjsec.cpp:125
- `mcu.porta_w -> taito_sj_security_mcu_device.mcu_pa_w` - src/mame/taito/taitosjsec.cpp:126
- `mcu.portb_w -> taito_sj_security_mcu_device.mcu_pb_w` - src/mame/taito/taitosjsec.cpp:127
