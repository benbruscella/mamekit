# Generated MAME hardware closure

Targets: **47**

Hardware types: **92**

Source-resolved: **78**

Declarative browser-host concepts: **14**

Unresolved: **0**

Source methods lowered to IR: **1135/1193**

MAME opcode/operation DSL files: **6**

## Hardware

| Type | Status | MAME implementation | Games |
|---|---|---|---|
| AD7533 | source-resolved | ad7533_device (src/devices/sound/dac.h:203) | rampage |
| AY8910 | source-resolved | ay8910_device (src/devices/sound/ay8910.cpp:1551) | 1942, elevator, friskyt, frogger, gyruss, jumpbug, junglek, junofrst, kungfum, matmania, mpatrol, pooyan, popeye, rocnrope, scramble, timeplt, travrusa, tutankhm, zigzagb |
| AY8912 | source-resolved | ay8912_device (src/devices/sound/ay8910.cpp:1620) | carnival |
| BUFFERED_SPRITERAM8 | source-resolved | buffered_spriteram8_device (src/devices/video/bufsprite.cpp:20) | commando, gng, gunsmoke |
| DAC_1BIT | source-resolved | dac_1bit_device (src/devices/sound/dac.h:223) | panic |
| DAC_4BIT_R2R | source-resolved | dac_4bit_r2r_device (src/devices/sound/dac.h:230) | friskyt |
| DAC_8BIT_R2R | source-resolved | dac_8bit_r2r_device (src/devices/sound/dac.h:237) | elevator, junglek, junofrst, matmania |
| DISCRETE | declarative-host | discrete_sound_device (src/devices/sound/discrete.cpp:50) | asteroid, dkong, dkongjr, elevator, galaga, galaxian, gyruss, invaders, junglek, mpatrol, phoenix, qix, travrusa |
| DVG | source-resolved | dvg_device (src/devices/video/avgdvg.cpp:1498) | asteroid |
| ER2055 | source-resolved | er2055_device (src/devices/machine/er2055.cpp:25) | digdug |
| EXIDY | source-resolved | exidy_sound_device (src/mame/shared/exidysound.cpp:145) | berzerk |
| EXIDY_VENTURE | source-resolved | venture_sound_device (src/mame/shared/exidysound.cpp:513) | venture |
| FILTER_BIQUAD | declarative-host | filter_biquad_device (src/devices/sound/flt_biquad.cpp:38) | rampage |
| FILTER_RC | declarative-host | filter_rc_device (src/devices/sound/flt_rc.cpp:8) | junofrst |
| FILTER_VOLUME | source-resolved | filter_volume_device (src/devices/sound/flt_vol.cpp:8) | berzerk |
| GALAXIAN_SOUND | source-resolved | galaxian_sound_device (src/mame/galaxian/galaxian_a.cpp:613) | galaxian |
| GENERIC_LATCH_8 | source-resolved | generic_latch_8_device (src/devices/machine/gen_latch.cpp:23) | 1942, bublbobl, commando, ddragon, frogger, ghouls, gng, gunsmoke, gyruss, junofrst, mario, matmania, pooyan, rocnrope, scramble, sf2ce, timeplt, tutankhm |
| GFXDECODE | declarative-host | - | 1942, bankp, bublbobl, commando, crush, ddragon, digdug, dkong, dkongjr, elevator, friskyt, frogger, galaga, galaxian, ghouls, gng, gunsmoke, gyruss, jumpbug, junglek, kungfum, mario, matmania, mpatrol, pacman, panic, pengo, phoenix, pooyan, popeye, rampage, rocnrope, scramble, sf2ce, timeplt, travrusa, venture, zaxxon, zigzagb |
| HD6309E | source-resolved | hd6309e_device (src/devices/cpu/m6809/hd6309.cpp:130) | ddragon |
| HD63701Y0 | source-resolved | hd63701y0_cpu_device (src/devices/cpu/m6800/m6801.cpp:418) | ddragon |
| I8035 | source-resolved | i8035_device (src/devices/cpu/mcs48/mcs48.cpp:183) | carnival |
| I8039 | source-resolved | i8039_device (src/devices/cpu/mcs48/mcs48.cpp:187) | gyruss, junofrst |
| I8080 | source-resolved | i8080_cpu_device (src/devices/cpu/i8085/i8085.cpp:208) | invaders |
| I8085A | source-resolved | i8085a_cpu_device (src/devices/cpu/i8085/i8085.cpp:210) | phoenix |
| I8255A | source-resolved | i8255_device (src/devices/machine/i8255.cpp:66) | frogger, scramble, zaxxon |
| I8257 | source-resolved | i8257_device (src/devices/machine/i8257.cpp:33) | dkong, dkongjr |
| INPUT_MERGER_ALL_HIGH | source-resolved | input_merger_all_high_device (src/devices/machine/input_merger.cpp:44) | bublbobl, elevator, junglek |
| INPUT_MERGER_ANY_HIGH | source-resolved | input_merger_any_high_device (src/devices/machine/input_merger.cpp:43) | bublbobl, defender, elevator, junglek, qix, venture |
| INVADERS_AUDIO | source-resolved | invaders_audio_device (src/mame/midw8080/mw8080bw_a.cpp:574) | invaders |
| IREM_M52_SOUNDC_AUDIO | source-resolved | m52_soundc_audio_device (src/mame/irem/irem.cpp:18) | mpatrol, travrusa |
| IREM_M62_AUDIO | source-resolved | m62_audio_device (src/mame/irem/irem.cpp:17) | kungfum |
| KONAMI1 | source-resolved | konami1_device (src/mame/konami/konami1.cpp:12) | gyruss, junofrst, rocnrope |
| LATCH8 | source-resolved | latch8_device (src/devices/machine/latch8.cpp:100) | dkong, dkongjr |
| LS259 | source-resolved | ls259_device (src/devices/machine/74259.cpp:95) | asteroid, crush, digdug, galaga, gng, gyruss, junofrst, mario, pacman, pengo, pooyan, rocnrope, timeplt, tutankhm, zaxxon |
| M58715 | source-resolved | m58715_device (src/devices/cpu/mcs48/mcs48.cpp:204) | mario |
| M6502 | source-resolved | m6502_device (src/devices/cpu/m6502/m6502.cpp:15) | asteroid, matmania, venture |
| M68000 | source-resolved | m68000_device (src/devices/cpu/m68000/m68000.cpp:8) | ghouls, rampage, sf2ce |
| M6801U4 | source-resolved | m6801u4_cpu_device (src/devices/cpu/m6800/m6801.cpp:407) | bublbobl |
| M6802 | source-resolved | m6802_cpu_device (src/devices/cpu/m6800/m6800.cpp:370) | qix |
| M6803 | source-resolved | m6803_cpu_device (src/devices/cpu/m6800/m6801.cpp:409) | kungfum, mpatrol, travrusa |
| M6808 | source-resolved | m6808_cpu_device (src/devices/cpu/m6800/m6800.cpp:371) | defender |
| M68705P5 | source-resolved | m68705p5_device (src/devices/cpu/m6805/m68705.cpp:113) | elevator |
| MB14241 | source-resolved | mb14241_device (src/devices/machine/mb14241.cpp:18) | invaders |
| MB8843 | source-resolved | mb8843_cpu_device (src/devices/cpu/mb88xx/mb88xx.cpp:26) | digdug, galaga |
| MB8844 | source-resolved | mb8844_cpu_device (src/devices/cpu/mb88xx/mb88xx.cpp:27) | galaga |
| MB8884 | source-resolved | mb8884_device (src/devices/cpu/mcs48/mcs48.cpp:202) | dkong, dkongjr |
| MC1408 | source-resolved | mc1408_device (src/devices/sound/dac.h:210) | defender |
| MC6809 | source-resolved | mc6809_device (src/devices/cpu/m6809/m6809.cpp:136) | ddragon, gng |
| MC6809E | source-resolved | mc6809e_device (src/devices/cpu/m6809/m6809.cpp:137) | defender, qix, tutankhm |
| MC6845 | source-resolved | mc6845_device (src/devices/video/mc6845.cpp:61) | qix |
| MIDWAY_SOUNDS_GOOD | source-resolved | midway_sounds_good_device (src/mame/bally/midway_sound.cpp:33) | rampage |
| MOS6532 | source-resolved | mos6532_device (src/devices/machine/mos6530.cpp:29) | venture |
| MSM5205 | source-resolved | msm5205_device (src/devices/sound/msm5205.cpp:53) | ddragon, kungfum, mpatrol, travrusa |
| NAMCO_06XX | source-resolved | namco_06xx_device (src/mame/namco/namco06.cpp:237) | digdug, galaga |
| NAMCO_51XX | source-resolved | namco_51xx_device (src/mame/namco/namco51.cpp:141) | digdug, galaga |
| NAMCO_53XX | source-resolved | namco_53xx_device (src/mame/namco/namco53.cpp:110) | digdug |
| NAMCO_54XX | source-resolved | namco_54xx_device (src/mame/namco/namco54.cpp:112) | galaga |
| NAMCO_WSG | source-resolved | namco_wsg_device (src/devices/sound/namco.cpp:58) | crush, digdug, galaga, pacman, pengo |
| NETLIST_INT_INPUT | source-resolved | netlist_mame_int_input_device (src/devices/machine/netlist.cpp:53) | mario |
| NETLIST_LOGIC_INPUT | declarative-host | netlist_mame_logic_input_device (src/devices/machine/netlist.cpp:55) | frogger, kungfum, mario, scramble |
| NETLIST_SOUND | declarative-host | netlist_mame_sound_device (src/devices/machine/netlist.cpp:48) | 1942, frogger, kungfum, mario, popeye, scramble |
| NETLIST_STREAM_INPUT | declarative-host | netlist_mame_stream_input_device (src/devices/machine/netlist.cpp:56) | 1942, frogger, kungfum, popeye, scramble |
| NETLIST_STREAM_OUTPUT | declarative-host | netlist_mame_stream_output_device (src/devices/machine/netlist.cpp:60) | 1942, frogger, kungfum, mario, popeye, scramble |
| NSC8105 | source-resolved | nsc8105_cpu_device (src/devices/cpu/m6800/m6800.cpp:372) | friskyt |
| NVRAM | declarative-host | nvram_device (src/devices/machine/nvram.cpp:19) | berzerk, defender, friskyt, mario, qix, rampage |
| OKIM6295 | source-resolved | okim6295_device (src/devices/sound/okim6295.cpp:54) | ghouls, sf2ce |
| OUTPUT_LATCH | source-resolved | output_latch_device (src/devices/machine/output_latch.cpp:6) | asteroid |
| PALETTE | declarative-host | - | 1942, bankp, bublbobl, commando, crush, ddragon, defender, digdug, dkong, dkongjr, elevator, friskyt, frogger, galaga, galaxian, ghouls, gng, gunsmoke, gyruss, jumpbug, junglek, junofrst, kungfum, mario, matmania, mpatrol, pacman, panic, pengo, phoenix, pooyan, popeye, qix, rampage, rocnrope, scramble, sf2ce, timeplt, travrusa, tutankhm, venture, zaxxon, zigzagb |
| PHOENIX_SOUND | source-resolved | phoenix_sound_device (src/mame/phoenix/phoenix_a.cpp:51) | phoenix |
| PIA6821 | source-resolved | pia6821_device (src/devices/machine/6821pia.cpp:41) | defender, qix, rampage, venture |
| PIT8253 | source-resolved | pit8253_device (src/devices/machine/pit8253.cpp:45) | venture |
| S14001A | source-resolved | s14001a_device (src/devices/sound/s14001a.cpp:204) | berzerk |
| SAMPLES | source-resolved | samples_device (src/devices/sound/samples.cpp:38) | carnival, panic, zaxxon |
| SCREEN | declarative-host | - | 1942, asteroid, bankp, berzerk, bublbobl, carnival, commando, crush, ddragon, defender, digdug, dkong, dkongjr, elevator, friskyt, frogger, galaga, galaxian, ghouls, gng, gunsmoke, gyruss, invaders, jumpbug, junglek, junofrst, kungfum, mario, matmania, mpatrol, pacman, panic, pengo, phoenix, pooyan, popeye, qix, rampage, rocnrope, scramble, sf2ce, timeplt, travrusa, tutankhm, venture, zaxxon, zigzagb |
| SN76477 | source-resolved | sn76477_device (src/devices/sound/sn76477.cpp:143) | invaders |
| SN76489A | source-resolved | sn76489a_device (src/devices/sound/sn76496.cpp:474) | bankp |
| SPEAKER | declarative-host | - | 1942, asteroid, bankp, berzerk, bublbobl, carnival, commando, crush, ddragon, defender, digdug, dkong, dkongjr, elevator, friskyt, frogger, galaga, galaxian, ghouls, gng, gunsmoke, gyruss, invaders, jumpbug, junglek, junofrst, kungfum, mario, matmania, mpatrol, pacman, panic, pengo, phoenix, pooyan, popeye, qix, rampage, rocnrope, scramble, sf2ce, timeplt, travrusa, tutankhm, venture, zaxxon, zigzagb |
| STARFIELD_05XX | source-resolved | starfield_05xx_device (src/mame/namco/starfield_05xx.cpp:486) | galaga |
| TAITO_SJ_SECURITY_MCU | source-resolved | taito_sj_security_mcu_device (src/mame/taito/taitosjsec.cpp:6) | elevator |
| TIMEPLT_AUDIO | source-resolved | timeplt_audio_device (src/mame/shared/timeplt_a.cpp:22) | pooyan, rocnrope, timeplt, tutankhm |
| TIMER | declarative-host | timer_device (src/devices/machine/timer.cpp:30) | 1942, carnival, commando, ddragon, defender, matmania, panic, rampage, scramble, tutankhm |
| TMS36XX | source-resolved | tms36xx_device (src/devices/sound/tms36xx.cpp:312) | phoenix |
| TTL153 | source-resolved | ttl153_device (src/devices/machine/74153.cpp:19) | asteroid |
| TTL74181 | source-resolved | ttl74181_device (src/devices/machine/74181.cpp:19) | berzerk |
| VECTOR | source-resolved | vector_device (src/devices/video/vector.cpp:53) | asteroid |
| WATCHDOG_TIMER | declarative-host | watchdog_timer_device (src/devices/machine/watchdog.cpp:20) | asteroid, bublbobl, crush, defender, digdug, dkong, dkongjr, elevator, friskyt, frogger, galaga, galaxian, invaders, junglek, junofrst, pacman, pengo, pooyan, rampage, rocnrope, scramble, timeplt, tutankhm, zigzagb |
| YM2151 | source-resolved | ym2151_device (src/devices/sound/ymopm.cpp:12) | ddragon, ghouls, sf2ce |
| YM2203 | source-resolved | ym2203_device (src/devices/sound/ymopn.cpp:12) | bublbobl, commando, gng, gunsmoke |
| YM3526 | source-resolved | ym3526_device (src/devices/sound/ymopl.cpp:12) | bublbobl |
| Z80 | source-resolved | z80_device (src/devices/cpu/z80/z80.cpp:940) | 1942, bankp, berzerk, bublbobl, carnival, commando, crush, digdug, dkong, dkongjr, elevator, friskyt, frogger, galaga, galaxian, ghouls, gng, gunsmoke, gyruss, jumpbug, junglek, junofrst, kungfum, mario, mpatrol, pacman, panic, pengo, pooyan, popeye, rampage, rocnrope, scramble, sf2ce, timeplt, travrusa, tutankhm, zaxxon, zigzagb |
| Z80CTC | source-resolved | z80ctc_device (src/devices/machine/z80ctc.cpp:72) | rampage |
| Z80DMA | source-resolved | z80dma_device (src/devices/machine/z80dma.cpp:120) | mario |

Generated device modules are currently structured IR. They become executable as
the device compiler gains the required MAME constructs; `executable: false` in the
hardware graph prevents source extraction alone from being reported as completion.
