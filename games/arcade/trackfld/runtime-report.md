# trackfld source-generation report

Playability: **executable**

Basis: **runtime-certified**

MAME source coverage: **116/158 nodes (73.4%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 14 | Hardware lowered from MAME source to executable IR |
| Generated | 23 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 6 | Hardware-neutral browser service configured by generated data |
| Blocked | 2 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **20/20**

Address-map handlers compiled: **5/5**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **1**

Screen update: **trackfld_state.screen_update_trackfld** (compiled)

## Executable generation gaps

- `vlm:VLM5030`

## Parser gaps

- None detected

## Generated callback wiring

- `mainlatch.q_out_cb<0> -> trackfld_state.flip_screen_set` - src/mame/konami/trackfld.cpp:1239
- `mainlatch.q_out_cb<1> -> trackfld_audio.sh_irqtrigger_w` - src/mame/konami/trackfld.cpp:1240
- `mainlatch.q_out_cb<2> -> set_nop` - src/mame/konami/trackfld.cpp:1241
- `mainlatch.q_out_cb<3> -> trackfld_state.coin_counter_1_w` - src/mame/konami/trackfld.cpp:1242
- `mainlatch.q_out_cb<4> -> trackfld_state.coin_counter_2_w` - src/mame/konami/trackfld.cpp:1243
- `mainlatch.q_out_cb<5> -> set_nop` - src/mame/konami/trackfld.cpp:1244
- `mainlatch.q_out_cb<6> -> set_nop` - src/mame/konami/trackfld.cpp:1245
- `mainlatch.q_out_cb<7> -> trackfld_state.irq_mask_w` - src/mame/konami/trackfld.cpp:1246
- `screen.set_screen_update -> trackfld_state.screen_update_trackfld` - src/mame/konami/trackfld.cpp:1255
- `screen.screen_vblank -> trackfld_state.vblank_irq` - src/mame/konami/trackfld.cpp:1257
- `palette.palette_init -> trackfld_state.trackfld_palette` - src/mame/konami/trackfld.cpp:1260
