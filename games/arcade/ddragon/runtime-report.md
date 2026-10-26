# ddragon source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **118/159 nodes (74.2%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 10 | Hardware lowered from MAME source to executable IR |
| Generated | 23 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 7 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **23/23**

Address-map handlers compiled: **9/9**

## Generated execution plan

CPU schedules: **3**

Frame callbacks: **1**

Screen update: **ddragon_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `scantimer.configure_scanline -> ddragon_state.scanline` - src/mame/technos/ddragon.cpp:946
- `sub.out_p6_cb -> ddragon_state.sub_port6_w` - src/mame/technos/ddragon.cpp:950
- `screen.set_screen_update -> ddragon_state.screen_update` - src/mame/technos/ddragon.cpp:963
- `soundlatch.data_pending_callback -> soundcpu` - src/mame/technos/ddragon.cpp:970
- `fmsnd.irq_handler -> soundcpu` - src/mame/technos/ddragon.cpp:973
- `adpcm1.vck_legacy_callback -> ddragon_state.ddragon_adpcm_int_0` - src/mame/technos/ddragon.cpp:978
- `adpcm2.vck_legacy_callback -> ddragon_state.ddragon_adpcm_int_1` - src/mame/technos/ddragon.cpp:983
