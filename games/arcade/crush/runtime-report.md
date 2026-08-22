# crush source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **76/107 nodes (71%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 5 | Hardware lowered from MAME source to executable IR |
| Generated | 20 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 5 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **18/18**

Address-map handlers compiled: **7/7**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **1**

Screen update: **pacman_state.screen_update_pacman** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `maincpu.set_irq_acknowledge_callback -> pacman_state.interrupt_vector_r` - src/mame/pacman/pacman.cpp:3711
- `mainlatch.q_out_cb<0> -> pacman_state.irq_mask_w` - src/mame/pacman/pacman.cpp:3714
- `mainlatch.q_out_cb<1> -> namco.sound_enable_w` - src/mame/pacman/pacman.cpp:3715
- `mainlatch.q_out_cb<3> -> pacman_state.flipscreen_w` - src/mame/pacman/pacman.cpp:3716
- `screen.set_screen_update -> pacman_state.screen_update_pacman` - src/mame/pacman/pacman.cpp:3736
- `screen.screen_vblank -> pacman_state.vblank_irq` - src/mame/pacman/pacman.cpp:3738
- `mainlatch.q_out_cb<7> -> set_nop` - src/mame/pacman/pacman.cpp:3761
