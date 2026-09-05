# xevious source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **196/232 nodes (84.5%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 18 | Hardware lowered from MAME source to executable IR |
| Generated | 55 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 6 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **65/65**

Address-map handlers compiled: **8/8**

## Generated execution plan

CPU schedules: **3**

Frame callbacks: **2**

Screen update: **xevious_state.screen_update_xevious** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `cpu3_interrupt_timer.timer -> galaga_state.cpu3_interrupt_callback` - src/mame/namco/galaga.cpp:786
- `misclatch.q_out_cb<0> -> galaga_state.irq1_clear_w` - src/mame/namco/galaga.cpp:1779
- `misclatch.q_out_cb<1> -> galaga_state.irq2_clear_w` - src/mame/namco/galaga.cpp:1780
- `misclatch.q_out_cb<2> -> galaga_state.nmion_w` - src/mame/namco/galaga.cpp:1781
- `misclatch.q_out_cb<3> -> sub` - src/mame/namco/galaga.cpp:1782
- `misclatch.q_out_cb<3> -> sub2` - src/mame/namco/galaga.cpp:1783
- `misclatch.q_out_cb<3> -> 50xx.reset` - src/mame/namco/galaga.cpp:1784
- `misclatch.q_out_cb<3> -> 51xx.reset` - src/mame/namco/galaga.cpp:1785
- `misclatch.q_out_cb<3> -> 54xx.reset` - src/mame/namco/galaga.cpp:1786
- `51xx.input_callback<0> -> IN0` - src/mame/namco/galaga.cpp:1791
- `51xx.input_callback<1> -> IN0` - src/mame/namco/galaga.cpp:1792
- `51xx.input_callback<2> -> IN1` - src/mame/namco/galaga.cpp:1793
- `51xx.input_callback<3> -> IN1` - src/mame/namco/galaga.cpp:1794
- `51xx.output_callback -> galaga_state.out` - src/mame/namco/galaga.cpp:1795
- `51xx.lockout_callback -> galaga_state.lockout` - src/mame/namco/galaga.cpp:1796
- `06xx.nmi -> maincpu` - src/mame/namco/galaga.cpp:1803
- `06xx.chip_select_callback<0> -> 51xx.chip_select` - src/mame/namco/galaga.cpp:1804
- `06xx.rw_callback<0> -> 51xx.rw` - src/mame/namco/galaga.cpp:1805
- `06xx.read_callback<0> -> 51xx.read` - src/mame/namco/galaga.cpp:1806
- `06xx.write_callback<0> -> 51xx.write` - src/mame/namco/galaga.cpp:1807
- `06xx.chip_select_callback<2> -> 50xx.chip_select` - src/mame/namco/galaga.cpp:1808
- `06xx.rw_callback<2> -> 50xx.rw` - src/mame/namco/galaga.cpp:1809
- `06xx.read_callback<2> -> 50xx.read` - src/mame/namco/galaga.cpp:1810
- `06xx.write_callback<2> -> 50xx.write` - src/mame/namco/galaga.cpp:1811
- `06xx.write_callback<3> -> 54xx.write` - src/mame/namco/galaga.cpp:1812
- `06xx.chip_select_callback<3> -> 54xx.chip_select` - src/mame/namco/galaga.cpp:1813
- `screen.set_screen_update -> xevious_state.screen_update_xevious` - src/mame/namco/galaga.cpp:1822
- `screen.screen_vblank -> galaga_state.vblank_irq` - src/mame/namco/galaga.cpp:1824
- `screen.screen_vblank -> 51xx.vblank` - src/mame/namco/galaga.cpp:1825
- `mcu.read_k -> namco_54xx_device.K_r` - src/mame/namco/namco54.cpp:139
- `mcu.write_o -> namco_54xx_device.O_w` - src/mame/namco/namco54.cpp:140
- `mcu.read_r<0> -> namco_54xx_device.R0_r` - src/mame/namco/namco54.cpp:141
- `mcu.write_r<1> -> namco_54xx_device.R1_w` - src/mame/namco/namco54.cpp:142
- `mcu.read_k -> namco_50xx_device.K_r` - src/mame/namco/namco50.cpp:241
- `mcu.read_r<0> -> namco_50xx_device.R0_r` - src/mame/namco/namco50.cpp:242
- `mcu.read_r<2> -> namco_50xx_device.R2_r` - src/mame/namco/namco50.cpp:243
- `mcu.write_o -> namco_50xx_device.O_w` - src/mame/namco/namco50.cpp:244
- `mcu.read_k -> namco_51xx_device.K_r` - src/mame/namco/namco51.cpp:171
- `mcu.read_r<0> -> namco_51xx_device.R_r_0` - src/mame/namco/namco51.cpp:172
- `mcu.read_r<1> -> namco_51xx_device.R_r_1` - src/mame/namco/namco51.cpp:173
- `mcu.read_r<2> -> namco_51xx_device.R_r_2` - src/mame/namco/namco51.cpp:174
- `mcu.read_r<3> -> namco_51xx_device.R_r_3` - src/mame/namco/namco51.cpp:175
- `mcu.write_o -> namco_51xx_device.O_w` - src/mame/namco/namco51.cpp:176
- `mcu.write_p -> namco_51xx_device.P_w` - src/mame/namco/namco51.cpp:177
- `palette.palette_init -> xevious_state.xevious_palette` - src/mame/namco/galaga.cpp:1828
