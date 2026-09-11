# joust source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **106/134 nodes (79.1%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 18 | Hardware lowered from MAME source to executable IR |
| Generated | 29 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 7 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **11/12**

Address-map handlers compiled: **4/4**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **2**

Screen update: **williams_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `scan_timer.configure_scanline -> williams_state.va11_callback` - src/mame/williams/williams.cpp:1546
- `240_timer.configure_scanline -> williams_state.count240_callback` - src/mame/williams/williams.cpp:1549
- `screen.set_screen_update -> williams_state.screen_update` - src/mame/williams/williams.cpp:1557
- `mainirq.output_handler -> maincpu` - src/mame/williams/williams.cpp:1566
- `soundirq.output_handler -> soundcpu` - src/mame/williams/williams.cpp:1568
- `pia_1.readpa_handler -> IN2` - src/mame/williams/williams.cpp:1575
- `pia_1.writepb_handler -> williams_state.snd_cmd_w` - src/mame/williams/williams.cpp:1576
- `pia_1.irqa_handler -> mainirq.in_w_0` - src/mame/williams/williams.cpp:1577
- `pia_1.irqb_handler -> mainirq.in_w_1` - src/mame/williams/williams.cpp:1578
- `pia_2.writepa_handler -> dac.data_w` - src/mame/williams/williams.cpp:1581
- `pia_2.irqa_handler -> soundirq.in_w_0` - src/mame/williams/williams.cpp:1582
- `pia_2.irqb_handler -> soundirq.in_w_1` - src/mame/williams/williams.cpp:1583
- `pia_0.readpa_handler -> IN0` - src/mame/williams/williams.cpp:1639
- `pia_0.readpa_handler -> mux_0.output_r` - src/mame/williams/williams.cpp:1640
- `pia_0.readpa_handler -> mux_1.output_r` - src/mame/williams/williams.cpp:1641
- `pia_0.readpb_handler -> IN1` - src/mame/williams/williams.cpp:1642
- `pia_0.readpb_handler -> mux_1.output_r` - src/mame/williams/williams.cpp:1643
- `pia_0.cb2_handler -> mux_0.select_w` - src/mame/williams/williams.cpp:1644
- `pia_0.cb2_handler -> mux_1.select_w` - src/mame/williams/williams.cpp:1645
- `mux_0.a_in_callback -> INP2` - src/mame/williams/williams.cpp:1648
- `mux_0.b_in_callback -> INP1` - src/mame/williams/williams.cpp:1649
- `mux_1.a_in_callback -> INP2A` - src/mame/williams/williams.cpp:1652
- `mux_1.b_in_callback -> INP1A` - src/mame/williams/williams.cpp:1653
- `palette.palette_init -> williams_state.palette_init` - src/mame/williams/williams.cpp:1559
