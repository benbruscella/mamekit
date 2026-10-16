# hyperspt source-generation report

Playability: **executable**

Basis: **source-complete**

MAME source coverage: **117/157 nodes (74.5%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 15 | Hardware lowered from MAME source to executable IR |
| Generated | 21 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 6 | Hardware-neutral browser service configured by generated data |
| Blocked | 0 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **18/19**

Address-map handlers compiled: **4/4**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **1**

Screen update: **base_state.screen_update** (compiled)

## Executable generation gaps

- None

## Parser gaps

- None detected

## Generated callback wiring

- `mainlatch.q_out_cb<0> -> base_state.flip_screen_set` - src/mame/konami/hyperspt.cpp:618
- `mainlatch.q_out_cb<1> -> trackfld_audio.sh_irqtrigger_w` - src/mame/konami/hyperspt.cpp:619
- `mainlatch.q_out_cb<2> -> set_nop` - src/mame/konami/hyperspt.cpp:620
- `mainlatch.q_out_cb<3> -> base_state.coin_counter_w_0` - src/mame/konami/hyperspt.cpp:621
- `mainlatch.q_out_cb<4> -> base_state.coin_counter_w_1` - src/mame/konami/hyperspt.cpp:622
- `mainlatch.q_out_cb<5> -> set_nop` - src/mame/konami/hyperspt.cpp:623
- `mainlatch.q_out_cb<7> -> base_state.irq_mask_w` - src/mame/konami/hyperspt.cpp:624
- `screen.set_screen_update -> base_state.screen_update` - src/mame/konami/hyperspt.cpp:636
- `screen.screen_vblank -> base_state.vblank_irq` - src/mame/konami/hyperspt.cpp:638
- `palette.palette_init -> base_state.palette` - src/mame/konami/hyperspt.cpp:641
