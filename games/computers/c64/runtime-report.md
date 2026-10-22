# c64 source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **180/287 nodes (62.7%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 33 | Hardware lowered from MAME source to executable IR |
| Generated | 67 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 2 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **54/54**

Address-map handlers compiled: **2/2**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **0**

Screen update: **mos6567_device.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `u7.read_callback -> c64_state.cpu_r` - src/mame/commodore/c64.cpp:1499
- `u7.write_callback -> c64_state.cpu_w` - src/mame/commodore/c64.cpp:1500
- `irq.output_handler -> u7` - src/mame/commodore/c64.cpp:1506
- `nmi.output_handler -> u7` - src/mame/commodore/c64.cpp:1509
- `u19.irq_callback -> irq.in_w_1` - src/mame/commodore/c64.cpp:1514
- `screen.set_screen_update -> u19.screen_update` - src/mame/commodore/c64.cpp:1523
- `u18.potx -> c64_state.sid_potx_r` - src/mame/commodore/c64.cpp:1528
- `u18.poty -> c64_state.sid_poty_r` - src/mame/commodore/c64.cpp:1529
- `u1.irq_wr_callback -> irq.in_w_0` - src/mame/commodore/c64.cpp:1537
- `u1.cnt_wr_callback -> user.write_4` - src/mame/commodore/c64.cpp:1538
- `u1.sp_wr_callback -> user.write_5` - src/mame/commodore/c64.cpp:1539
- `u1.pa_rd_callback -> c64_state.cia1_pa_r` - src/mame/commodore/c64.cpp:1540
- `u1.pb_rd_callback -> c64_state.cia1_pb_r` - src/mame/commodore/c64.cpp:1541
- `u1.pb_wr_callback -> c64_state.cia1_pb_w` - src/mame/commodore/c64.cpp:1542
- `u2.irq_wr_callback -> nmi.in_w_0` - src/mame/commodore/c64.cpp:1546
- `u2.cnt_wr_callback -> user.write_6` - src/mame/commodore/c64.cpp:1547
- `u2.sp_wr_callback -> user.write_7` - src/mame/commodore/c64.cpp:1548
- `u2.pa_rd_callback -> c64_state.cia2_pa_r` - src/mame/commodore/c64.cpp:1549
- `u2.pa_wr_callback -> c64_state.cia2_pa_w` - src/mame/commodore/c64.cpp:1550
- `u2.pb_rd_callback -> c64_state.cia2_pb_r` - src/mame/commodore/c64.cpp:1551
- `u2.pb_wr_callback -> c64_state.cia2_pb_w` - src/mame/commodore/c64.cpp:1552
- `u2.pc_wr_callback -> user.write_8` - src/mame/commodore/c64.cpp:1553
- `tape.read_handler -> c64_state.cass_rd_w` - src/mame/commodore/c64.cpp:1556
- `iec_bus.srq_callback -> c64_state.iec_srq_w` - src/mame/commodore/c64.cpp:1559
- `iec_bus.data_callback -> user.write_9` - src/mame/commodore/c64.cpp:1560
- `joy1.trigger_wr_callback -> u19.lp_w` - src/mame/commodore/c64.cpp:1563
- `exp.irq_callback -> irq.in_w_2` - src/mame/commodore/c64.cpp:1567
- `exp.nmi_callback -> nmi.in_w_2` - src/mame/commodore/c64.cpp:1568
- `exp.reset_callback -> c64_state.exp_reset_w` - src/mame/commodore/c64.cpp:1569
- `exp.cd_input_callback -> c64_state.read` - src/mame/commodore/c64.cpp:1570
- `exp.cd_output_callback -> c64_state.write` - src/mame/commodore/c64.cpp:1571
- `exp.dma_callback -> c64_state.exp_dma_w` - src/mame/commodore/c64.cpp:1572
- `user.p3_handler -> c64_state.exp_reset_w` - src/mame/commodore/c64.cpp:1575
- `user.p4_handler -> u1.cnt_w` - src/mame/commodore/c64.cpp:1576
- `user.p5_handler -> u1.sp_w` - src/mame/commodore/c64.cpp:1577
- `user.p6_handler -> u2.cnt_w` - src/mame/commodore/c64.cpp:1578
- `user.p7_handler -> u2.sp_w` - src/mame/commodore/c64.cpp:1579
- `user.p9_handler -> iec_bus.host_atn_w` - src/mame/commodore/c64.cpp:1580
- `user.pb_handler -> u2.flag_w` - src/mame/commodore/c64.cpp:1581
- `user.pc_handler -> c64_state.write_user_pb0` - src/mame/commodore/c64.cpp:1582
- `user.pd_handler -> c64_state.write_user_pb1` - src/mame/commodore/c64.cpp:1583
- `user.pe_handler -> c64_state.write_user_pb2` - src/mame/commodore/c64.cpp:1584
- `user.pf_handler -> c64_state.write_user_pb3` - src/mame/commodore/c64.cpp:1585
- `user.ph_handler -> c64_state.write_user_pb4` - src/mame/commodore/c64.cpp:1586
- `user.pj_handler -> c64_state.write_user_pb5` - src/mame/commodore/c64.cpp:1587
- `user.pk_handler -> c64_state.write_user_pb6` - src/mame/commodore/c64.cpp:1588
- `user.pl_handler -> c64_state.write_user_pb7` - src/mame/commodore/c64.cpp:1589
- `user.pm_handler -> c64_state.write_user_pa2` - src/mame/commodore/c64.cpp:1590
- `quickload.set_load_callback -> c64_state.quickload_c64` - src/mame/commodore/c64.cpp:1592
- `uab1.readpa_handler -> c1541_device_base.via0_pa_r` - src/devices/bus/cbmiec/c1541.cpp:975
- `uab1.readpb_handler -> c1541_device_base.via0_pb_r` - src/devices/bus/cbmiec/c1541.cpp:976
- `uab1.writepa_handler -> c1541_device_base.via0_pa_w` - src/devices/bus/cbmiec/c1541.cpp:977
- `uab1.writepb_handler -> c1541_device_base.via0_pb_w` - src/devices/bus/cbmiec/c1541.cpp:978
- `uab1.cb2_handler -> c1541_device_base.via0_ca2_w` - src/devices/bus/cbmiec/c1541.cpp:979
- `uab1.irq_handler -> c1541_device_base.via0_irq_w` - src/devices/bus/cbmiec/c1541.cpp:980
- `ucd4.readpa_handler -> uc4.yb_r` - src/devices/bus/cbmiec/c1541.cpp:983
- `ucd4.readpb_handler -> c1541_device_base.via1_pb_r` - src/devices/bus/cbmiec/c1541.cpp:984
- `ucd4.writepa_handler -> uc4.yb_w` - src/devices/bus/cbmiec/c1541.cpp:985
- `ucd4.writepb_handler -> c1541_device_base.via1_pb_w` - src/devices/bus/cbmiec/c1541.cpp:986
- `ucd4.ca2_handler -> uc4.soe_w` - src/devices/bus/cbmiec/c1541.cpp:987
- `ucd4.cb2_handler -> uc4.oe_w` - src/devices/bus/cbmiec/c1541.cpp:988
- `ucd4.irq_handler -> c1541_device_base.via1_irq_w` - src/devices/bus/cbmiec/c1541.cpp:989
- `uc4.atn_callback -> c1541_device_base.atn_w` - src/devices/bus/cbmiec/c1541.cpp:992
- `uc4.byte_callback -> c1541_device_base.byte_w` - src/devices/bus/cbmiec/c1541.cpp:993
