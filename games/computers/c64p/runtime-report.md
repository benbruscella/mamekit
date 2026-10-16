# c64p source-generation report

Playability: **blocked**

Basis: **blocked**

MAME source coverage: **139/243 nodes (57.2%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 20 | Hardware lowered from MAME source to executable IR |
| Generated | 52 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 2 | Hardware-neutral browser service configured by generated data |
| Blocked | 1 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **33/33**

Address-map handlers compiled: **2/2**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **0**

Screen update: **mos6569_device.screen_update** (compiled)

## Executable generation gaps

- `quickload:QUICKLOAD`

## Parser gaps

- None detected

## Generated callback wiring

- `u7.read_callback -> c64_state.cpu_r` - src/mame/commodore/c64.cpp:1673
- `u7.write_callback -> c64_state.cpu_w` - src/mame/commodore/c64.cpp:1674
- `irq.output_handler -> u7` - src/mame/commodore/c64.cpp:1680
- `nmi.output_handler -> u7` - src/mame/commodore/c64.cpp:1683
- `u19.irq_callback -> irq.in_w_1` - src/mame/commodore/c64.cpp:1688
- `screen.set_screen_update -> u19.screen_update` - src/mame/commodore/c64.cpp:1697
- `u18.potx -> c64_state.sid_potx_r` - src/mame/commodore/c64.cpp:1702
- `u18.poty -> c64_state.sid_poty_r` - src/mame/commodore/c64.cpp:1703
- `u1.irq_wr_callback -> irq.in_w_0` - src/mame/commodore/c64.cpp:1711
- `u1.cnt_wr_callback -> user.write_4` - src/mame/commodore/c64.cpp:1712
- `u1.sp_wr_callback -> user.write_5` - src/mame/commodore/c64.cpp:1713
- `u1.pa_rd_callback -> c64_state.cia1_pa_r` - src/mame/commodore/c64.cpp:1714
- `u1.pb_rd_callback -> c64_state.cia1_pb_r` - src/mame/commodore/c64.cpp:1715
- `u1.pb_wr_callback -> c64_state.cia1_pb_w` - src/mame/commodore/c64.cpp:1716
- `u2.irq_wr_callback -> nmi.in_w_0` - src/mame/commodore/c64.cpp:1720
- `u2.cnt_wr_callback -> user.write_6` - src/mame/commodore/c64.cpp:1721
- `u2.sp_wr_callback -> user.write_7` - src/mame/commodore/c64.cpp:1722
- `u2.pa_rd_callback -> c64_state.cia2_pa_r` - src/mame/commodore/c64.cpp:1723
- `u2.pa_wr_callback -> c64_state.cia2_pa_w` - src/mame/commodore/c64.cpp:1724
- `u2.pb_rd_callback -> c64_state.cia2_pb_r` - src/mame/commodore/c64.cpp:1725
- `u2.pb_wr_callback -> c64_state.cia2_pb_w` - src/mame/commodore/c64.cpp:1726
- `u2.pc_wr_callback -> user.write_8` - src/mame/commodore/c64.cpp:1727
- `tape.read_handler -> c64_state.cass_rd_w` - src/mame/commodore/c64.cpp:1730
- `iec_bus.srq_callback -> c64_state.iec_srq_w` - src/mame/commodore/c64.cpp:1733
- `iec_bus.data_callback -> user.write_9` - src/mame/commodore/c64.cpp:1734
- `joy1.trigger_wr_callback -> u19.lp_w` - src/mame/commodore/c64.cpp:1737
- `exp.irq_callback -> irq.in_w_2` - src/mame/commodore/c64.cpp:1741
- `exp.nmi_callback -> nmi.in_w_2` - src/mame/commodore/c64.cpp:1742
- `exp.reset_callback -> c64_state.exp_reset_w` - src/mame/commodore/c64.cpp:1743
- `exp.cd_input_callback -> c64_state.read` - src/mame/commodore/c64.cpp:1744
- `exp.cd_output_callback -> c64_state.write` - src/mame/commodore/c64.cpp:1745
- `exp.dma_callback -> c64_state.exp_dma_w` - src/mame/commodore/c64.cpp:1746
- `user.p3_handler -> c64_state.exp_reset_w` - src/mame/commodore/c64.cpp:1749
- `user.p4_handler -> u1.cnt_w` - src/mame/commodore/c64.cpp:1750
- `user.p5_handler -> u1.sp_w` - src/mame/commodore/c64.cpp:1751
- `user.p6_handler -> u2.cnt_w` - src/mame/commodore/c64.cpp:1752
- `user.p7_handler -> u2.sp_w` - src/mame/commodore/c64.cpp:1753
- `user.p9_handler -> iec_bus.host_atn_w` - src/mame/commodore/c64.cpp:1754
- `user.pb_handler -> u2.flag_w` - src/mame/commodore/c64.cpp:1755
- `user.pc_handler -> c64_state.write_user_pb0` - src/mame/commodore/c64.cpp:1756
- `user.pd_handler -> c64_state.write_user_pb1` - src/mame/commodore/c64.cpp:1757
- `user.pe_handler -> c64_state.write_user_pb2` - src/mame/commodore/c64.cpp:1758
- `user.pf_handler -> c64_state.write_user_pb3` - src/mame/commodore/c64.cpp:1759
- `user.ph_handler -> c64_state.write_user_pb4` - src/mame/commodore/c64.cpp:1760
- `user.pj_handler -> c64_state.write_user_pb5` - src/mame/commodore/c64.cpp:1761
- `user.pk_handler -> c64_state.write_user_pb6` - src/mame/commodore/c64.cpp:1762
- `user.pl_handler -> c64_state.write_user_pb7` - src/mame/commodore/c64.cpp:1763
- `user.pm_handler -> c64_state.write_user_pa2` - src/mame/commodore/c64.cpp:1764
- `quickload.set_load_callback -> c64_state.quickload_c64` - src/mame/commodore/c64.cpp:1766
