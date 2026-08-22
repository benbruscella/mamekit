# digdug source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **178/213 nodes (83.6%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 19 | Hardware lowered from MAME source to executable IR |
| Generated | 55 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 5 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **54/54**

Address-map handlers compiled: **4/4**

## Generated execution plan

CPU schedules: **3**

Frame callbacks: **2**

Screen update: **digdug_state.screen_update_digdug** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `cpu3_interrupt_timer.timer -> galaga_state.cpu3_interrupt_callback` - src/mame/namco/galaga.cpp:786
- `misclatch.q_out_cb<0> -> galaga_state.irq1_clear_w` - src/mame/namco/galaga.cpp:1888
- `misclatch.q_out_cb<1> -> galaga_state.irq2_clear_w` - src/mame/namco/galaga.cpp:1889
- `misclatch.q_out_cb<2> -> galaga_state.nmion_w` - src/mame/namco/galaga.cpp:1890
- `misclatch.q_out_cb<3> -> sub` - src/mame/namco/galaga.cpp:1891
- `misclatch.q_out_cb<3> -> sub2` - src/mame/namco/galaga.cpp:1892
- `misclatch.q_out_cb<3> -> 51xx.reset` - src/mame/namco/galaga.cpp:1893
- `misclatch.q_out_cb<3> -> 53xx.reset` - src/mame/namco/galaga.cpp:1894
- `51xx.input_callback<0> -> IN0` - src/mame/namco/galaga.cpp:1898
- `51xx.input_callback<1> -> IN0` - src/mame/namco/galaga.cpp:1899
- `51xx.input_callback<2> -> IN1` - src/mame/namco/galaga.cpp:1900
- `51xx.input_callback<3> -> IN1` - src/mame/namco/galaga.cpp:1901
- `51xx.output_callback -> galaga_state.out` - src/mame/namco/galaga.cpp:1902
- `51xx.lockout_callback -> galaga_state.lockout` - src/mame/namco/galaga.cpp:1903
- `53xx.k_port_callback -> misclatch.q7_r` - src/mame/namco/galaga.cpp:1906
- `53xx.k_port_callback -> misclatch.q6_r` - src/mame/namco/galaga.cpp:1907
- `53xx.k_port_callback -> misclatch.q5_r` - src/mame/namco/galaga.cpp:1908
- `53xx.input_callback<0> -> DSWA` - src/mame/namco/galaga.cpp:1910
- `53xx.input_callback<1> -> DSWA` - src/mame/namco/galaga.cpp:1911
- `53xx.input_callback<2> -> DSWB` - src/mame/namco/galaga.cpp:1912
- `53xx.input_callback<3> -> DSWB` - src/mame/namco/galaga.cpp:1913
- `06xx.nmi -> maincpu` - src/mame/namco/galaga.cpp:1916
- `06xx.chip_select_callback<0> -> 51xx.chip_select` - src/mame/namco/galaga.cpp:1917
- `06xx.rw_callback<0> -> 51xx.rw` - src/mame/namco/galaga.cpp:1918
- `06xx.read_callback<0> -> 51xx.read` - src/mame/namco/galaga.cpp:1919
- `06xx.write_callback<0> -> 51xx.write` - src/mame/namco/galaga.cpp:1920
- `06xx.chip_select_callback<1> -> 53xx.chip_select` - src/mame/namco/galaga.cpp:1921
- `06xx.read_callback<1> -> 53xx.read` - src/mame/namco/galaga.cpp:1922
- `videolatch.parallel_out_cb -> digdug_state.bg_select_w` - src/mame/namco/galaga.cpp:1925
- `videolatch.q_out_cb<2> -> digdug_state.tx_color_mode_w` - src/mame/namco/galaga.cpp:1926
- `videolatch.q_out_cb<3> -> digdug_state.bg_disable_w` - src/mame/namco/galaga.cpp:1927
- `videolatch.q_out_cb<7> -> digdug_state.flip_screen_set` - src/mame/namco/galaga.cpp:1928
- `screen.set_screen_update -> digdug_state.screen_update_digdug` - src/mame/namco/galaga.cpp:1939
- `screen.screen_vblank -> galaga_state.vblank_irq` - src/mame/namco/galaga.cpp:1941
- `screen.screen_vblank -> 51xx.vblank` - src/mame/namco/galaga.cpp:1942
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
