# mario source-generation report

Playability: **executable**

Basis: **runtime-certified**

MAME source coverage: **116/149 nodes (77.9%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 9 | Hardware lowered from MAME source to executable IR |
| Generated | 31 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 10 | Hardware-neutral browser service configured by generated data |
| Blocked | 4 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **20/20**

Address-map handlers compiled: **7/7**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **1**

Screen update: **mario_state.screen_update** (compiled)

## Executable generation gaps

- `snd_nl:dac:NETLIST_INT_INPUT`
- `z80dma:Z80DMA`

## Parser gaps

- None detected

## Generated callback wiring

- `maincpu.busack_cb -> z80dma.bai_w` - src/mame/nintendo/mario.cpp:837
- `z80dma.out_busreq_callback -> maincpu` - src/mame/nintendo/mario.cpp:841
- `z80dma.in_mreq_callback -> mario_state.memory_read_byte` - src/mame/nintendo/mario.cpp:842
- `z80dma.out_mreq_callback -> mario_state.memory_write_byte` - src/mame/nintendo/mario.cpp:843
- `mainlatch.q_out_cb<0> -> mario_state.gfx_bank_w` - src/mame/nintendo/mario.cpp:846
- `mainlatch.q_out_cb<1> -> set_nop` - src/mame/nintendo/mario.cpp:847
- `mainlatch.q_out_cb<2> -> mario_state.flip_screen_set` - src/mame/nintendo/mario.cpp:848
- `mainlatch.q_out_cb<3> -> mario_state.palette_bank_w` - src/mame/nintendo/mario.cpp:849
- `mainlatch.q_out_cb<4> -> mario_state.nmi_mask_w` - src/mame/nintendo/mario.cpp:850
- `mainlatch.q_out_cb<5> -> z80dma.rdy_w` - src/mame/nintendo/mario.cpp:851
- `mainlatch.q_out_cb<6> -> mario_state.coin_counter_2_w` - src/mame/nintendo/mario.cpp:852
- `mainlatch.q_out_cb<7> -> mario_state.coin_counter_1_w` - src/mame/nintendo/mario.cpp:853
- `screen.set_screen_update -> mario_state.screen_update` - src/mame/nintendo/mario.cpp:860
- `screen.screen_vblank -> mario_state.vblank_irq` - src/mame/nintendo/mario.cpp:862
- `audiocpu.p1_in_cb -> soundlatch1.read` - src/mame/nintendo/mario.cpp:876
- `audiocpu.p2_in_cb -> soundlatch2.read` - src/mame/nintendo/mario.cpp:877
- `audiocpu.p2_out_cb -> soundlatch2.write` - src/mame/nintendo/mario.cpp:878
- `audiocpu.p2_out_cb -> audiocpu` - src/mame/nintendo/mario.cpp:879
- `audiocpu.t0_in_cb -> soundlatch3.read` - src/mame/nintendo/mario.cpp:880
- `audiocpu.t1_in_cb -> soundlatch3.read` - src/mame/nintendo/mario.cpp:881
