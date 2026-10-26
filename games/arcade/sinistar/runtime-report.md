# sinistar source-generation report

Playability: **executable**

Basis: **runtime-certified**

MAME source coverage: **109/129 nodes (84.5%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 16 | Hardware lowered from MAME source to executable IR |
| Generated | 23 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 7 | Hardware-neutral browser service configured by generated data |
| Blocked | 1 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **17/17**

Address-map handlers compiled: **5/5**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **2**

Screen update: **williams_state.screen_update** (compiled)

## Executable generation gaps

- `cvsd:HC55516`

## Parser gaps

- None detected

## Generated callback wiring

- `scan_timer.configure_scanline -> williams_state.va11_callback` - src/mame/williams/williams.cpp:1546
- `240_timer.configure_scanline -> williams_state.count240_callback` - src/mame/williams/williams.cpp:1549
- `screen.set_screen_update -> williams_state.screen_update` - src/mame/williams/williams.cpp:1557
- `mainirq.output_handler -> maincpu` - src/mame/williams/williams.cpp:1566
- `soundirq.output_handler -> soundcpu` - src/mame/williams/williams.cpp:1568
- `pia_0.readpb_handler -> IN1` - src/mame/williams/williams.cpp:1572
- `pia_1.readpa_handler -> IN2` - src/mame/williams/williams.cpp:1575
- `pia_1.writepb_handler -> williams_state.snd_cmd_w` - src/mame/williams/williams.cpp:1576
- `pia_1.irqa_handler -> mainirq.in_w_0` - src/mame/williams/williams.cpp:1577
- `pia_1.irqb_handler -> mainirq.in_w_1` - src/mame/williams/williams.cpp:1578
- `pia_2.writepa_handler -> dac.data_w` - src/mame/williams/williams.cpp:1581
- `pia_2.irqa_handler -> soundirq.in_w_0` - src/mame/williams/williams.cpp:1582
- `pia_2.irqb_handler -> soundirq.in_w_1` - src/mame/williams/williams.cpp:1583
- `pia_0.readpa_handler -> williams_state.port_0_49way_r` - src/mame/williams/williams.cpp:1696
- `pia_2.ca2_handler -> cvsd.digit_w` - src/mame/williams/williams.cpp:1698
- `pia_2.cb2_handler -> cvsd.clock_w` - src/mame/williams/williams.cpp:1699
- `palette.palette_init -> williams_state.palette_init` - src/mame/williams/williams.cpp:1559
