# spyhunt source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **178/222 nodes (80.2%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 28 | Hardware lowered from MAME source to executable IR |
| Generated | 24 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 7 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **39/39**

Address-map handlers compiled: **7/7**

## Generated execution plan

CPU schedules: **3**

Frame callbacks: **2**

Screen update: **mcr3_state.screen_update_spyhunt** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `scantimer.configure_scanline -> mcr3_state.mcr_interrupt` - src/mame/bally/mcr3.cpp:1091
- `ctc.intr_callback -> maincpu` - src/mame/bally/mcr3.cpp:1094
- `ctc.zc_callback<0> -> ctc.trg1` - src/mame/bally/mcr3.cpp:1095
- `screen.set_screen_update -> mcr3_state.screen_update_spyhunt` - src/mame/bally/mcr3.cpp:1176
- `adc.vin_callback -> mcrsc_csd_state.spyhunt_ip2_r` - src/mame/bally/mcr3.cpp:1211
- `pia.writepa_handler -> midway_cheap_squeak_deluxe_device.porta_w` - src/mame/bally/csd.cpp:44
- `pia.writepb_handler -> midway_cheap_squeak_deluxe_device.portb_w` - src/mame/bally/csd.cpp:45
- `pia.irqa_handler -> midway_cheap_squeak_deluxe_device.irq_w` - src/mame/bally/csd.cpp:46
- `pia.irqb_handler -> midway_cheap_squeak_deluxe_device.irq_w` - src/mame/bally/csd.cpp:47
- `cpu.set_periodic_int -> midway_ssio_device.clock_14024` - src/mame/bally/midway_sound.cpp:406
- `ay0.port_a_write_callback -> midway_ssio_device.porta0_w` - src/mame/bally/midway_sound.cpp:410
- `ay0.port_b_write_callback -> midway_ssio_device.portb0_w` - src/mame/bally/midway_sound.cpp:411
- `ay1.port_a_write_callback -> midway_ssio_device.porta1_w` - src/mame/bally/midway_sound.cpp:415
- `ay1.port_b_write_callback -> midway_ssio_device.portb1_w` - src/mame/bally/midway_sound.cpp:416
