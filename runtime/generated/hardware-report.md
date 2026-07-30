# Generated MAME hardware closure

Targets: **16**

Hardware types: **45**

Source-resolved: **33**

Declarative browser-host concepts: **12**

Unresolved: **0**

Source methods lowered to IR: **363/418**

MAME opcode/operation DSL files: **6**

## Hardware

| Type | Status | MAME implementation | Games |
|---|---|---|---|
| AY8910 | source-resolved | ay8910_device (src/devices/sound/ay8910.cpp:1551) | gyruss, junofrst, kungfum, mpatrol, pooyan, rocnrope, timeplt, zigzagb |
| BUFFERED_SPRITERAM8 | source-resolved | buffered_spriteram8_device (src/devices/video/bufsprite.cpp:20) | commando, gng |
| DAC_8BIT_R2R | source-resolved | dac_8bit_r2r_device (src/devices/sound/dac.h:237) | junofrst |
| DISCRETE | declarative-host | discrete_sound_device (src/devices/sound/discrete.cpp:50) | galaga, galaxian, gyruss, invaders, mpatrol |
| ER2055 | source-resolved | er2055_device (src/devices/machine/er2055.cpp:25) | digdug |
| FILTER_RC | declarative-host | filter_rc_device (src/devices/sound/flt_rc.cpp:8) | junofrst |
| GALAXIAN_SOUND | source-resolved | galaxian_sound_device (src/mame/galaxian/galaxian_a.cpp:613) | galaxian |
| GENERIC_LATCH_8 | source-resolved | generic_latch_8_device (src/devices/machine/gen_latch.cpp:23) | commando, gng, gyruss, junofrst, pooyan, rocnrope, timeplt |
| GFXDECODE | declarative-host | - | commando, digdug, galaga, galaxian, gng, gyruss, kungfum, mpatrol, pacman, pooyan, rocnrope, timeplt, zigzagb |
| I8039 | source-resolved | i8039_device (src/devices/cpu/mcs48/mcs48.cpp:187) | gyruss, junofrst |
| I8080 | source-resolved | i8080_cpu_device (src/devices/cpu/i8085/i8085.cpp:208) | invaders |
| INVADERS_AUDIO | source-resolved | invaders_audio_device (src/mame/midw8080/mw8080bw_a.cpp:574) | invaders |
| IREM_M52_SOUNDC_AUDIO | source-resolved | m52_soundc_audio_device (src/mame/irem/irem.cpp:18) | mpatrol |
| IREM_M62_AUDIO | source-resolved | m62_audio_device (src/mame/irem/irem.cpp:17) | kungfum |
| KONAMI1 | source-resolved | konami1_device (src/mame/konami/konami1.cpp:12) | gyruss, junofrst, rocnrope |
| LS259 | source-resolved | ls259_device (src/devices/machine/74259.cpp:95) | digdug, galaga, gng, gyruss, junofrst, pacman, pooyan, rocnrope, timeplt |
| M6803 | source-resolved | m6803_cpu_device (src/devices/cpu/m6800/m6801.cpp:409) | kungfum, mpatrol |
| MB14241 | source-resolved | mb14241_device (src/devices/machine/mb14241.cpp:18) | invaders |
| MB8843 | source-resolved | mb8843_cpu_device (src/devices/cpu/mb88xx/mb88xx.cpp:26) | digdug, galaga |
| MB8844 | source-resolved | mb8844_cpu_device (src/devices/cpu/mb88xx/mb88xx.cpp:27) | galaga |
| MC6809 | source-resolved | mc6809_device (src/devices/cpu/m6809/m6809.cpp:136) | gng |
| MSM5205 | source-resolved | msm5205_device (src/devices/sound/msm5205.cpp:53) | kungfum, mpatrol |
| NAMCO_06XX | source-resolved | namco_06xx_device (src/mame/namco/namco06.cpp:237) | digdug, galaga |
| NAMCO_51XX | source-resolved | namco_51xx_device (src/mame/namco/namco51.cpp:141) | digdug, galaga |
| NAMCO_53XX | source-resolved | namco_53xx_device (src/mame/namco/namco53.cpp:110) | digdug |
| NAMCO_54XX | source-resolved | namco_54xx_device (src/mame/namco/namco54.cpp:112) | galaga |
| NAMCO_WSG | source-resolved | namco_wsg_device (src/devices/sound/namco.cpp:58) | digdug, galaga, pacman |
| NES_CART_SLOT | source-resolved | nes_cart_slot_device (src/devices/bus/nes/nes_slot.cpp:98) | nes |
| NES_CONTROL_PORT | source-resolved | nes_control_port_device (src/devices/bus/nes_ctrl/ctrl.cpp:75) | nes |
| NETLIST_LOGIC_INPUT | declarative-host | netlist_mame_logic_input_device (src/devices/machine/netlist.cpp:55) | kungfum |
| NETLIST_SOUND | declarative-host | netlist_mame_sound_device (src/devices/machine/netlist.cpp:48) | kungfum |
| NETLIST_STREAM_INPUT | declarative-host | netlist_mame_stream_input_device (src/devices/machine/netlist.cpp:56) | kungfum |
| NETLIST_STREAM_OUTPUT | declarative-host | netlist_mame_stream_output_device (src/devices/machine/netlist.cpp:60) | kungfum |
| PALETTE | declarative-host | - | commando, digdug, galaga, galaxian, gng, gyruss, junofrst, kungfum, mpatrol, pacman, pooyan, rocnrope, timeplt, zigzagb |
| PPU_2C02 | source-resolved | ppu2c02_device (src/devices/video/ppu2c0x.cpp:40) | nes |
| RP2A03G | source-resolved | rp2a03g_device (src/devices/cpu/m6502/rp2a03.cpp:17) | nes |
| SCREEN | declarative-host | - | commando, digdug, galaga, galaxian, gng, gyruss, invaders, junofrst, kungfum, mpatrol, nes, pacman, pooyan, rocnrope, timeplt, zigzagb |
| SN76477 | source-resolved | sn76477_device (src/devices/sound/sn76477.cpp:143) | invaders |
| SPEAKER | declarative-host | - | commando, digdug, galaga, galaxian, gng, gyruss, invaders, junofrst, kungfum, mpatrol, nes, pooyan, rocnrope, timeplt, zigzagb |
| STARFIELD_05XX | source-resolved | starfield_05xx_device (src/mame/namco/starfield_05xx.cpp:486) | galaga |
| TIMEPLT_AUDIO | source-resolved | timeplt_audio_device (src/mame/shared/timeplt_a.cpp:22) | pooyan, rocnrope, timeplt |
| TIMER | declarative-host | timer_device (src/devices/machine/timer.cpp:30) | commando |
| WATCHDOG_TIMER | declarative-host | watchdog_timer_device (src/devices/machine/watchdog.cpp:20) | digdug, galaga, galaxian, invaders, junofrst, pacman, pooyan, rocnrope, timeplt, zigzagb |
| YM2203 | source-resolved | ym2203_device (src/devices/sound/ymopn.cpp:12) | commando, gng |
| Z80 | source-resolved | z80_device (src/devices/cpu/z80/z80.cpp:940) | commando, digdug, galaga, galaxian, gng, gyruss, junofrst, kungfum, mpatrol, pacman, pooyan, rocnrope, timeplt, zigzagb |

Generated device modules are currently structured IR. They become executable as
the device compiler gains the required MAME constructs; `executable: false` in the
hardware graph prevents source extraction alone from being reported as completion.
