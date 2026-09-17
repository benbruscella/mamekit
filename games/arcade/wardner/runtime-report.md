# wardner source-generation report

Playability: **executable**

Basis: **runtime-certified**

MAME source coverage: **179/225 nodes (79.6%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 14 | Hardware lowered from MAME source to executable IR |
| Generated | 43 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 5 | Hardware-neutral browser service configured by generated data |
| Blocked | 3 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **53/53**

Address-map handlers compiled: **16/16**

## Generated execution plan

CPU schedules: **3**

Frame callbacks: **2**

Screen update: **wardner_state.screen_update** (compiled)

## Executable generation gaps

- `ymsnd:YM3812`

## Parser gaps

- None detected

## Generated callback wiring

- `dsp.set_host_addr_callback -> wardner_state.dsp_host_addr_cb` - src/mame/toaplan/wardner.cpp:452
- `dsp.set_host_read_callback -> wardner_state.dsp_host_read_cb` - src/mame/toaplan/wardner.cpp:453
- `dsp.set_host_write_callback -> wardner_state.dsp_host_write_cb` - src/mame/toaplan/wardner.cpp:454
- `dsp.halt_callback -> maincpu` - src/mame/toaplan/wardner.cpp:455
- `mainlatch.q_out_cb<2> -> wardner_state.int_enable_w` - src/mame/toaplan/wardner.cpp:460
- `mainlatch.q_out_cb<3> -> wardner_state.flipscreen_w` - src/mame/toaplan/wardner.cpp:461
- `mainlatch.q_out_cb<4> -> wardner_state.bg_ram_bank_w` - src/mame/toaplan/wardner.cpp:462
- `mainlatch.q_out_cb<5> -> wardner_state.fg_rom_bank_w` - src/mame/toaplan/wardner.cpp:463
- `mainlatch.q_out_cb<6> -> wardner_state.display_on_w` - src/mame/toaplan/wardner.cpp:464
- `coinlatch.q_out_cb<0> -> dsp.dsp_int_w` - src/mame/toaplan/wardner.cpp:467
- `coinlatch.q_out_cb<4> -> wardner_state.coin_counter_1_w` - src/mame/toaplan/wardner.cpp:468
- `coinlatch.q_out_cb<5> -> wardner_state.coin_counter_2_w` - src/mame/toaplan/wardner.cpp:469
- `coinlatch.q_out_cb<6> -> wardner_state.coin_lockout_1_w` - src/mame/toaplan/wardner.cpp:470
- `coinlatch.q_out_cb<7> -> wardner_state.coin_lockout_2_w` - src/mame/toaplan/wardner.cpp:471
- `scu.set_pri_callback -> wardner_state.pri_cb` - src/mame/toaplan/wardner.cpp:483
- `screen.set_screen_update -> wardner_state.screen_update` - src/mame/toaplan/wardner.cpp:490
- `screen.screen_vblank -> spriteram8.vblank_copy_rising` - src/mame/toaplan/wardner.cpp:491
- `screen.screen_vblank -> wardner_state.wardner_vblank_irq` - src/mame/toaplan/wardner.cpp:492
- `ymsnd.irq_handler -> audiocpu` - src/mame/toaplan/wardner.cpp:501
- `dsp.bio -> toaplan_dsp_device.bio_r` - src/mame/toaplan/toaplan_dsp.cpp:54
