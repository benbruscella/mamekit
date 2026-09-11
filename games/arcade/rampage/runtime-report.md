# rampage source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **90/138 nodes (65.2%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 14 | Hardware lowered from MAME source to executable IR |
| Generated | 20 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 7 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **17/17**

Address-map handlers compiled: **5/5**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **1**

Screen update: **mcr3_state.screen_update_mcr3** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `scantimer.configure_scanline -> mcr3_state.mcr_interrupt` - src/mame/bally/mcr3.cpp:1091
- `ctc.intr_callback -> maincpu` - src/mame/bally/mcr3.cpp:1094
- `ctc.zc_callback<0> -> ctc.trg1` - src/mame/bally/mcr3.cpp:1095
- `screen.set_screen_update -> mcr3_state.screen_update_mcr3` - src/mame/bally/mcr3.cpp:1111
- `pia.writepa_handler -> midway_sounds_good_device.porta_w` - src/mame/bally/midway_sound.cpp:611
- `pia.writepb_handler -> midway_sounds_good_device.portb_w` - src/mame/bally/midway_sound.cpp:612
- `pia.irqa_handler -> midway_sounds_good_device.irq_w` - src/mame/bally/midway_sound.cpp:613
- `pia.irqb_handler -> midway_sounds_good_device.irq_w` - src/mame/bally/midway_sound.cpp:614
