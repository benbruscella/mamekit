# qbert source-generation report

Playability: **executable**

Basis: **runtime-certified**

MAME source coverage: **94/160 nodes (58.8%)**

| Stage | Count | Meaning |
|---|---:|---|
| Executable | 24 | Hardware lowered from MAME source to executable IR |
| Generated | 22 | Wiring, handlers, schedules and composition emitted from source/KG |
| Declarative host | 7 | Hardware-neutral browser service configured by generated data |
| Blocked | 2 | Source found; executable lowering is incomplete |
| Missing | 0 | Required source or generated artifact is absent |

## MAME handler compiler

Source methods compiled: **18/18**

Address-map handlers compiled: **7/7**

## Generated execution plan

CPU schedules: **2**

Frame callbacks: **1**

Screen update: **gottlieb_state.screen_update** (compiled)

## Executable generation gaps

- `r1sound:GOTTLIEB_SOUND_SPEECH_REV1A`
- `votrax:VOTRAX_SC01`

## Parser gaps

- None detected

## Generated callback wiring

- `screen.set_screen_update -> gottlieb_state.screen_update` - src/mame/gottlieb/gottlieb.cpp:2168
- `screen.screen_vblank -> maincpu` - src/mame/gottlieb/gottlieb.cpp:2169
- `nmi.output_handler -> audiocpu` - src/mame/shared/gottlieb_a.cpp:351
- `riot.pb_rd_callback -> SB1` - src/mame/shared/gottlieb_a.cpp:355
- `riot.pb_wr_callback -> nmi.in_w_0` - src/mame/shared/gottlieb_a.cpp:356
- `riot.irq_wr_callback -> audiocpu` - src/mame/shared/gottlieb_a.cpp:357
- `votrax.ar_callback -> nmi.in_w_1` - src/mame/shared/gottlieb_a.cpp:472
- `votrax.ar_callback -> nmi.in_w_1` - src/mame/shared/gottlieb_a.cpp:516
