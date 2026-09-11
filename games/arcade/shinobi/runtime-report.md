# shinobi source-generation report

Playability: **executable**

Basis: **runtime-certified**

MAME source coverage: **110/173 nodes (63.6%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 12 | Hardware lowered from MAME source to executable IR |
| Generated | 22 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 6 | Hardware-neutral browser service configured by generated data |
| Blocked | 4 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **29/36**

Address-map handlers compiled: **5/5**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **1**

Screen update: **segas16a_state.screen_update** (compiled)

## Executable generation gaps

- `i8255:I8255`
- `sprites:SEGA_SYS16A_SPRITES`
- `upd7751:UPD7751`
- `upd7751_8243:I8243`

## Parser gaps

- None detected

## Generated callback wiring

- `maincpu.set_vblank_int -> screen.irq4_line_hold` - src/mame/sega/segas16a.cpp:2261
- `upd7751.bus_in_cb -> segas16a_state.upd7751_rom_r` - src/mame/sega/segas16a.cpp:2268
- `upd7751.p1_out_cb -> dac.data_w` - src/mame/sega/segas16a.cpp:2270
- `upd7751.p2_in_cb -> segas16a_state.upd7751_p2_r` - src/mame/sega/segas16a.cpp:2271
- `upd7751.p2_out_cb -> segas16a_state.upd7751_p2_w` - src/mame/sega/segas16a.cpp:2272
- `upd7751.prog_out_cb -> upd7751_8243.prog_w` - src/mame/sega/segas16a.cpp:2273
- `upd7751_8243.p4_out_cb -> segas16a_state.upd7751_rom_offset_w_0` - src/mame/sega/segas16a.cpp:2276
- `upd7751_8243.p5_out_cb -> segas16a_state.upd7751_rom_offset_w_4` - src/mame/sega/segas16a.cpp:2277
- `upd7751_8243.p6_out_cb -> segas16a_state.upd7751_rom_offset_w_8` - src/mame/sega/segas16a.cpp:2278
- `upd7751_8243.p7_out_cb -> segas16a_state.upd7751_rom_offset_w_12` - src/mame/sega/segas16a.cpp:2279
- `i8255.out_pa_callback -> soundlatch.write` - src/mame/sega/segas16a.cpp:2286
- `i8255.out_pb_callback -> segas16a_state.misc_control_w` - src/mame/sega/segas16a.cpp:2287
- `i8255.out_pc_callback -> segas16a_state.tilemap_sound_w` - src/mame/sega/segas16a.cpp:2288
- `screen.set_screen_update -> segas16a_state.screen_update` - src/mame/sega/segas16a.cpp:2298
- `ymsnd.port_write_handler -> segas16a_state.upd7751_control_w` - src/mame/sega/segas16a.cpp:2313
