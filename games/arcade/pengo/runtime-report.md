# pengo source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **109/144 nodes (75.7%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 5 | Hardware lowered from MAME source to executable IR |
| Generated | 19 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 5 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **23/23**

Address-map handlers compiled: **2/2**

## Generated execution plan

CPU schedules: **1**

Frame callbacks: **1**

Screen update: **pacman_state.screen_update_pacman** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `mainlatch.q_out_cb<2> -> pengo_state.pengo_palettebank_w` - src/mame/pacman/pengo.cpp:360
- `mainlatch.q_out_cb<4> -> pengo_state.coin_counter_w_0` - src/mame/pacman/pengo.cpp:361
- `mainlatch.q_out_cb<5> -> pengo_state.coin_counter_w_1` - src/mame/pacman/pengo.cpp:362
- `mainlatch.q_out_cb<6> -> pengo_state.pengo_colortablebank_w` - src/mame/pacman/pengo.cpp:363
- `mainlatch.q_out_cb<7> -> pengo_state.pengo_gfxbank_w` - src/mame/pacman/pengo.cpp:364
- `maincpu.set_irq_acknowledge_callback -> pacman_state.interrupt_vector_r` - src/mame/pacman/pacman.cpp:3711
- `mainlatch.q_out_cb<0> -> pacman_state.irq_mask_w` - src/mame/pacman/pacman.cpp:3714
- `mainlatch.q_out_cb<1> -> namco.sound_enable_w` - src/mame/pacman/pacman.cpp:3715
- `mainlatch.q_out_cb<3> -> pacman_state.flipscreen_w` - src/mame/pacman/pacman.cpp:3716
- `screen.set_screen_update -> pacman_state.screen_update_pacman` - src/mame/pacman/pacman.cpp:3736
- `screen.screen_vblank -> pacman_state.vblank_irq` - src/mame/pacman/pacman.cpp:3738
