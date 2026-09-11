# dkong source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **135/177 nodes (76.3%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 10 | Hardware lowered from MAME source to executable IR |
| Generated | 39 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 6 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **31/32**

Address-map handlers compiled: **12/12**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **1**

Screen update: **dkong_state.screen_update_dkong** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `maincpu.busack_cb -> dma8257.hlda_w` - src/mame/nintendo/dkong.cpp:1775
- `dma8257.out_hrq_cb -> maincpu` - src/mame/nintendo/dkong.cpp:1781
- `dma8257.in_memr_cb -> dkong_state.memory_read_byte` - src/mame/nintendo/dkong.cpp:1782
- `dma8257.out_memw_cb -> dkong_state.memory_write_byte` - src/mame/nintendo/dkong.cpp:1783
- `dma8257.in_ior_cb<1> -> dkong_state.p8257_ctl_r` - src/mame/nintendo/dkong.cpp:1784
- `dma8257.out_iow_cb<0> -> dkong_state.p8257_ctl_w` - src/mame/nintendo/dkong.cpp:1785
- `screen.set_screen_update -> dkong_state.screen_update_dkong` - src/mame/nintendo/dkong.cpp:1793
- `screen.screen_vblank -> dkong_state.vblank_irq` - src/mame/nintendo/dkong.cpp:1795
- `ls259.6h.write_cb<0> -> discrete.write_line_DS_SOUND0_INP` - src/mame/nintendo/dkong_a.cpp:1323
- `ls259.6h.write_cb<1> -> discrete.write_line_DS_SOUND1_INP` - src/mame/nintendo/dkong_a.cpp:1324
- `ls259.6h.write_cb<2> -> discrete.write_line_DS_SOUND2_INP` - src/mame/nintendo/dkong_a.cpp:1325
- `ls259.6h.write_cb<6> -> discrete.write_line_DS_SOUND6_INP` - src/mame/nintendo/dkong_a.cpp:1326
- `ls259.6h.write_cb<7> -> discrete.write_line_DS_SOUND7_INP` - src/mame/nintendo/dkong_a.cpp:1327
- `virtual_p2.read_cb<5> -> ls259.6h.bit3_r` - src/mame/nintendo/dkong_a.cpp:1338
- `virtual_p2.write_cb<7> -> discrete.write_line_DS_DISCHARGE_INV` - src/mame/nintendo/dkong_a.cpp:1339
- `soundcpu.bus_in_cb -> dkong_state.dkong_tune_r` - src/mame/nintendo/dkong_a.cpp:1344
- `soundcpu.bus_out_cb -> dkong_state.dkong_voice_w` - src/mame/nintendo/dkong_a.cpp:1345
- `soundcpu.p1_out_cb -> dkong_state.dkong_p1_w` - src/mame/nintendo/dkong_a.cpp:1346
- `soundcpu.p2_in_cb -> virtual_p2.read` - src/mame/nintendo/dkong_a.cpp:1347
- `soundcpu.p2_out_cb -> virtual_p2.write` - src/mame/nintendo/dkong_a.cpp:1348
- `soundcpu.t0_in_cb -> ls259.6h.bit5_q_r` - src/mame/nintendo/dkong_a.cpp:1349
- `soundcpu.t1_in_cb -> ls259.6h.bit4_q_r` - src/mame/nintendo/dkong_a.cpp:1350
- `palette.palette_init -> dkong_state.dkong2b_palette` - src/mame/nintendo/dkong.cpp:1798
