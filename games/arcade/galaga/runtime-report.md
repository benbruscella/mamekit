# galaga source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **153/187 nodes (81.8%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 19 | Hardware lowered from MAME source to executable IR |
| Generated | 42 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 6 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **50/50**

Address-map handlers compiled: **2/2**

## Generated execution plan

CPU schedules: **3**

Frame callbacks: **3**

Screen update: **galaga_state.screen_update_galaga** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `cpu3_interrupt_timer.timer -> galaga_state.cpu3_interrupt_callback` - src/mame/namco/galaga.cpp:786
- `misclatch.q_out_cb<0> -> galaga_state.irq1_clear_w` - src/mame/namco/galaga.cpp:1666
- `misclatch.q_out_cb<1> -> galaga_state.irq2_clear_w` - src/mame/namco/galaga.cpp:1667
- `misclatch.q_out_cb<2> -> galaga_state.nmion_w` - src/mame/namco/galaga.cpp:1668
- `misclatch.q_out_cb<3> -> sub` - src/mame/namco/galaga.cpp:1669
- `misclatch.q_out_cb<3> -> sub2` - src/mame/namco/galaga.cpp:1670
- `misclatch.q_out_cb<3> -> 51xx.reset` - src/mame/namco/galaga.cpp:1671
- `misclatch.q_out_cb<3> -> 54xx.reset` - src/mame/namco/galaga.cpp:1672
- `51xx.input_callback<0> -> IN0` - src/mame/namco/galaga.cpp:1675
- `51xx.input_callback<1> -> IN0` - src/mame/namco/galaga.cpp:1676
- `51xx.input_callback<2> -> IN1` - src/mame/namco/galaga.cpp:1677
- `51xx.input_callback<3> -> IN1` - src/mame/namco/galaga.cpp:1678
- `51xx.output_callback -> galaga_state.out` - src/mame/namco/galaga.cpp:1679
- `51xx.lockout_callback -> galaga_state.lockout` - src/mame/namco/galaga.cpp:1680
- `06xx.nmi -> maincpu` - src/mame/namco/galaga.cpp:1687
- `06xx.chip_select_callback<0> -> 51xx.chip_select` - src/mame/namco/galaga.cpp:1688
- `06xx.rw_callback<0> -> 51xx.rw` - src/mame/namco/galaga.cpp:1689
- `06xx.read_callback<0> -> 51xx.read` - src/mame/namco/galaga.cpp:1690
- `06xx.write_callback<0> -> 51xx.write` - src/mame/namco/galaga.cpp:1691
- `06xx.write_callback<3> -> 54xx.write` - src/mame/namco/galaga.cpp:1692
- `06xx.chip_select_callback<3> -> 54xx.chip_select` - src/mame/namco/galaga.cpp:1693
- `videolatch.q_out_cb<7> -> galaga_state.flip_screen_set` - src/mame/namco/galaga.cpp:1697
- `screen.set_screen_update -> galaga_state.screen_update_galaga` - src/mame/namco/galaga.cpp:1706
- `screen.screen_vblank -> galaga_state.screen_vblank_galaga` - src/mame/namco/galaga.cpp:1708
- `screen.screen_vblank -> galaga_state.vblank_irq` - src/mame/namco/galaga.cpp:1709
- `screen.screen_vblank -> 51xx.vblank` - src/mame/namco/galaga.cpp:1710
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
- `palette.palette_init -> galaga_state.galaga_palette` - src/mame/namco/galaga.cpp:1714
