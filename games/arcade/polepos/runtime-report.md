# polepos source-generation report

Playability: **executable**

Basis: **runtime-certified**

MAME source coverage: **294/340 nodes (86.5%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 24 | Hardware lowered from MAME source to executable IR |
| Generated | 84 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 9 | Hardware-neutral browser service configured by generated data |
| Blocked | 3 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **93/93**

Address-map handlers compiled: **15/15**

## Generated execution plan

CPU schedules: **3**

Frame callbacks: **2**

Screen update: **polepos_state.screen_update** (compiled)

## Executable generation gaps

- `engine:POLEPOS_SOUND`

## Parser gaps

- None detected

## Generated callback wiring

- `51xx.input_callback<0> -> DSWB` - src/mame/namco/polepos.cpp:888
- `51xx.input_callback<1> -> DSWB` - src/mame/namco/polepos.cpp:889
- `51xx.input_callback<2> -> IN0` - src/mame/namco/polepos.cpp:890
- `51xx.input_callback<3> -> IN0` - src/mame/namco/polepos.cpp:891
- `51xx.output_callback -> polepos_state.out` - src/mame/namco/polepos.cpp:892
- `51xx.lockout_callback -> polepos_state.lockout` - src/mame/namco/polepos.cpp:893
- `52xx.romread_callback -> polepos_state.namco_52xx_rom_r` - src/mame/namco/polepos.cpp:898
- `52xx.si_callback -> polepos_state.namco_52xx_si_r` - src/mame/namco/polepos.cpp:899
- `53xx.k_port_callback -> polepos_state.namco_53xx_k_r` - src/mame/namco/polepos.cpp:902
- `53xx.input_callback<0> -> polepos_state.steering_changed_r` - src/mame/namco/polepos.cpp:903
- `53xx.input_callback<1> -> polepos_state.steering_delta_r` - src/mame/namco/polepos.cpp:904
- `53xx.input_callback<2> -> DSWA` - src/mame/namco/polepos.cpp:905
- `53xx.input_callback<3> -> DSWA` - src/mame/namco/polepos.cpp:906
- `06xx.nmi -> maincpu` - src/mame/namco/polepos.cpp:913
- `06xx.chip_select_callback<0> -> 51xx.chip_select` - src/mame/namco/polepos.cpp:914
- `06xx.rw_callback<0> -> 51xx.rw` - src/mame/namco/polepos.cpp:915
- `06xx.read_callback<0> -> 51xx.read` - src/mame/namco/polepos.cpp:916
- `06xx.write_callback<0> -> 51xx.write` - src/mame/namco/polepos.cpp:917
- `06xx.read_callback<1> -> 53xx.read` - src/mame/namco/polepos.cpp:918
- `06xx.chip_select_callback<1> -> 53xx.chip_select` - src/mame/namco/polepos.cpp:919
- `06xx.write_callback<2> -> 52xx.write` - src/mame/namco/polepos.cpp:920
- `06xx.chip_select_callback<2> -> 52xx.chip_select` - src/mame/namco/polepos.cpp:921
- `06xx.write_callback<3> -> 54xx.write` - src/mame/namco/polepos.cpp:922
- `06xx.chip_select_callback<3> -> 54xx.chip_select` - src/mame/namco/polepos.cpp:923
- `scantimer.configure_scanline -> polepos_state.scanline` - src/mame/namco/polepos.cpp:929
- `latch.q_out_cb<0> -> maincpu` - src/mame/namco/polepos.cpp:932
- `latch.q_out_cb<1> -> 51xx.reset` - src/mame/namco/polepos.cpp:933
- `latch.q_out_cb<1> -> 52xx.reset` - src/mame/namco/polepos.cpp:934
- `latch.q_out_cb<1> -> 53xx.reset` - src/mame/namco/polepos.cpp:935
- `latch.q_out_cb<1> -> 54xx.reset` - src/mame/namco/polepos.cpp:936
- `latch.q_out_cb<2> -> namco.sound_enable_w` - src/mame/namco/polepos.cpp:937
- `latch.q_out_cb<2> -> engine.clson_w` - src/mame/namco/polepos.cpp:938
- `latch.q_out_cb<3> -> polepos_state.gasel_w` - src/mame/namco/polepos.cpp:939
- `latch.q_out_cb<4> -> sub1` - src/mame/namco/polepos.cpp:940
- `latch.q_out_cb<5> -> sub2` - src/mame/namco/polepos.cpp:941
- `latch.q_out_cb<6> -> polepos_state.sb0_w` - src/mame/namco/polepos.cpp:942
- `latch.q_out_cb<7> -> polepos_state.chacl_w` - src/mame/namco/polepos.cpp:943
- `adc.vin_callback -> polepos_state.analog_r` - src/mame/namco/polepos.cpp:946
- `screen.set_screen_update -> polepos_state.screen_update` - src/mame/namco/polepos.cpp:951
- `screen.screen_vblank -> 51xx.vblank` - src/mame/namco/polepos.cpp:953
- `mcu.read_k -> namco_52xx_device.K_r` - src/mame/namco/namco52.cpp:171
- `mcu.write_o -> namco_52xx_device.O_w` - src/mame/namco/namco52.cpp:172
- `mcu.write_p -> namco_52xx_device.P_w` - src/mame/namco/namco52.cpp:173
- `mcu.read_si -> namco_52xx_device.SI_r` - src/mame/namco/namco52.cpp:174
- `mcu.read_r<0> -> namco_52xx_device.R0_r` - src/mame/namco/namco52.cpp:175
- `mcu.read_r<1> -> namco_52xx_device.R1_r` - src/mame/namco/namco52.cpp:176
- `mcu.write_r<2> -> namco_52xx_device.R2_w` - src/mame/namco/namco52.cpp:177
- `mcu.write_r<3> -> namco_52xx_device.R3_w` - src/mame/namco/namco52.cpp:178
- `mcu.read_k -> namco_54xx_device.K_r` - src/mame/namco/namco54.cpp:139
- `mcu.write_o -> namco_54xx_device.O_w` - src/mame/namco/namco54.cpp:140
- `mcu.read_r<0> -> namco_54xx_device.R0_r` - src/mame/namco/namco54.cpp:141
- `mcu.write_r<1> -> namco_54xx_device.R1_w` - src/mame/namco/namco54.cpp:142
- `mcu.read_k -> namco_51xx_device.K_r` - src/mame/namco/namco51.cpp:171
- `mcu.read_r<0> -> namco_51xx_device.R_r_0` - src/mame/namco/namco51.cpp:172
- `mcu.read_r<1> -> namco_51xx_device.R_r_1` - src/mame/namco/namco51.cpp:173
- `mcu.read_r<2> -> namco_51xx_device.R_r_2` - src/mame/namco/namco51.cpp:174
- `mcu.read_r<3> -> namco_51xx_device.R_r_3` - src/mame/namco/namco51.cpp:175
- `mcu.write_o -> namco_51xx_device.O_w` - src/mame/namco/namco51.cpp:176
- `mcu.write_p -> namco_51xx_device.P_w` - src/mame/namco/namco51.cpp:177
- `mcu.read_k -> namco_53xx_device.K_r` - src/mame/namco/namco53.cpp:137
- `mcu.write_o -> namco_53xx_device.O_w` - src/mame/namco/namco53.cpp:138
- `mcu.write_p -> namco_53xx_device.P_w` - src/mame/namco/namco53.cpp:139
- `mcu.read_r<0> -> namco_53xx_device.R_r_0` - src/mame/namco/namco53.cpp:140
- `mcu.read_r<1> -> namco_53xx_device.R_r_1` - src/mame/namco/namco53.cpp:141
- `mcu.read_r<2> -> namco_53xx_device.R_r_2` - src/mame/namco/namco53.cpp:142
- `mcu.read_r<3> -> namco_53xx_device.R_r_3` - src/mame/namco/namco53.cpp:143
- `palette.palette_init -> polepos_state.polepos_palette` - src/mame/namco/polepos.cpp:956
