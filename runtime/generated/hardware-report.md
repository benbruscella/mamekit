# Generated MAME hardware closure

Targets: **76**

Hardware types: **164**

Source-resolved: **147**

Declarative browser-host concepts: **16**

Unresolved: **1**

Source methods lowered to IR: **2408/2465**

MAME opcode/operation DSL files: **9**

## Hardware

| Type | Status | MAME implementation | Games |
|---|---|---|---|
| AD7533 | source-resolved | ad7533_device (src/devices/sound/dac.h:203) | rampage |
| ADC0804 | source-resolved | adc0804_device (src/devices/machine/adc0804.cpp:47) | polepos |
| ARKANOID_68705P5 | source-resolved | arkanoid_68705p5_device (src/mame/shared/taito68705.cpp:51) | arkanoid |
| ATARI_MOTION_OBJECTS | source-resolved | atari_motion_objects_device (src/mame/atari/atarimo.cpp:121) | gauntlet |
| AY8910 | source-resolved | ay8910_device (src/devices/sound/ay8910.cpp:1551) | 1942, elevator, friskyt, frogger, gyruss, jumpbug, junglek, junofrst, kungfum, matmania, mpatrol, pooyan, popeye, rocnrope, scramble, timeplt, travrusa, tutankhm, zigzagb |
| AY8912 | source-resolved | ay8912_device (src/devices/sound/ay8910.cpp:1620) | carnival |
| BUFFERED_SPRITERAM16 | source-resolved | buffered_spriteram16_device (src/devices/video/bufsprite.cpp:21) | rtype |
| BUFFERED_SPRITERAM8 | source-resolved | buffered_spriteram8_device (src/devices/video/bufsprite.cpp:20) | commando, gng, gunsmoke |
| COLECO_EXPANSION | source-resolved | coleco_expansion_device (src/devices/bus/coleco/expansion/expansion.cpp:19) | coleco |
| COLECOVISION_CARTRIDGE_SLOT | source-resolved | colecovision_cartridge_slot_device (src/devices/bus/coleco/cartridge/exp.cpp:18) | coleco |
| DAC_1BIT | source-resolved | dac_1bit_device (src/devices/sound/dac.h:223) | panic |
| DAC_4BIT_R2R | source-resolved | dac_4bit_r2r_device (src/devices/sound/dac.h:230) | friskyt |
| DAC_8BIT_R2R | source-resolved | dac_8bit_r2r_device (src/devices/sound/dac.h:237) | elevator, junglek, junofrst, matmania, shinobi, trackfld |
| DISCRETE | declarative-host | discrete_sound_device (src/devices/sound/discrete.cpp:50) | asteroid, dkong, dkongjr, elevator, galaga, galaxian, gyruss, invaders, junglek, mpatrol, phoenix, polepos, qix, travrusa, xevious |
| DMG_APU | source-resolved | dmg_apu_device (src/devices/sound/gb.cpp:52) | gameboy |
| DMG_PPU | source-resolved | dmg_ppu_device (src/devices/video/gb_lcd.cpp:314) | gameboy |
| DVG | source-resolved | dvg_device (src/devices/video/avgdvg.cpp:1498) | asteroid |
| EEPROM_2804 | declarative-host | - | gauntlet |
| EEPROM_ER5911_8BIT | declarative-host | - | simpsons |
| ER2055 | source-resolved | er2055_device (src/devices/machine/er2055.cpp:25) | centiped, digdug |
| EXIDY | source-resolved | exidy_sound_device (src/mame/shared/exidysound.cpp:145) | berzerk |
| EXIDY_VENTURE | source-resolved | venture_sound_device (src/mame/shared/exidysound.cpp:513) | venture |
| FILTER_BIQUAD | declarative-host | filter_biquad_device (src/devices/sound/flt_biquad.cpp:38) | rampage |
| FILTER_RC | declarative-host | filter_rc_device (src/devices/sound/flt_rc.cpp:8) | junofrst |
| FILTER_VOLUME | source-resolved | filter_volume_device (src/devices/sound/flt_vol.cpp:8) | berzerk |
| GALAXIAN_SOUND | source-resolved | galaxian_sound_device (src/mame/galaxian/galaxian_a.cpp:613) | galaxian |
| GB_CART_SLOT | source-resolved | gb_cart_slot_device (src/devices/bus/gameboy/gbslot.cpp:1360) | gameboy |
| GENERIC_LATCH_8 | source-resolved | generic_latch_8_device (src/devices/machine/gen_latch.cpp:23) | 1942, bublbobl, commando, congo, ddragon, ffight, frogger, gauntlet, ghouls, gng, gunsmoke, gyruss, junofrst, mario, matmania, mslug, pooyan, rocnrope, rtype, rygar, scramble, sf2, sf2ce, shinobi, timeplt, tmnt, trackfld, tutankhm, upndown, wboy |
| GFXDECODE | declarative-host | - | 1942, arkanoid, bankp, bublbobl, cavenger, centiped, commando, congo, crush, ddragon, digdug, dkong, dkongjr, elevator, ffight, friskyt, frogger, galaga, galaxian, gameboy, gauntlet, gberet, ghouls, gng, gunsmoke, gyruss, jumpbug, junglek, kungfum, ladybug, mario, matmania, mpatrol, mrdo, mspacman, pacman, panic, pengo, phoenix, polepos, pooyan, popeye, qbert, rampage, rocnrope, rtype, rygar, scramble, sf2, sf2ce, shinobi, timeplt, trackfld, travrusa, upndown, venture, wboy, xevious, zaxxon, zigzagb |
| GOTTLIEB_SOUND_SPEECH_REV1A | source-resolved | gottlieb_sound_speech_r1a_device (src/mame/shared/gottlieb_a.cpp:40) | qbert |
| HC259 | source-resolved | hc259_device (src/devices/machine/74259.cpp:96) | mslug |
| HD6309E | source-resolved | hd6309e_device (src/devices/cpu/m6809/hd6309.cpp:130) | ddragon |
| HD63701Y0 | source-resolved | hd63701y0_cpu_device (src/devices/cpu/m6800/m6801.cpp:418) | ddragon |
| I8035 | source-resolved | i8035_device (src/devices/cpu/mcs48/mcs48.cpp:183) | carnival |
| I8039 | source-resolved | i8039_device (src/devices/cpu/mcs48/mcs48.cpp:187) | gyruss, junofrst |
| I8080 | source-resolved | i8080_cpu_device (src/devices/cpu/i8085/i8085.cpp:208) | invaders |
| I8085A | source-resolved | i8085a_cpu_device (src/devices/cpu/i8085/i8085.cpp:210) | phoenix |
| I8088 | source-resolved | i8088_cpu_device (src/devices/cpu/i86/i86.cpp:121) | qbert |
| I8243 | source-resolved | i8243_device (src/devices/machine/i8243.cpp:20) | shinobi |
| I8255 | source-resolved | i8255_device (src/devices/machine/i8255.cpp:66) | shinobi |
| I8255A | source-resolved | i8255_device (src/devices/machine/i8255.cpp:66) | congo, frogger, scramble, upndown, zaxxon |
| I8257 | source-resolved | i8257_device (src/devices/machine/i8257.cpp:33) | dkong, dkongjr |
| INPUT_MERGER_ALL_HIGH | source-resolved | input_merger_all_high_device (src/devices/machine/input_merger.cpp:44) | bublbobl, elevator, junglek, mslug |
| INPUT_MERGER_ANY_HIGH | source-resolved | input_merger_any_high_device (src/devices/machine/input_merger.cpp:43) | bublbobl, defender, elevator, gberet, joust, junglek, qbert, qix, robotron, venture |
| INPUT_MERGER_ANY_LOW | source-resolved | input_merger_any_low_device (src/devices/machine/input_merger.cpp:45) | upndown, wboy |
| INVADERS_AUDIO | source-resolved | invaders_audio_device (src/mame/midw8080/mw8080bw_a.cpp:574) | invaders |
| IREM_M52_SOUNDC_AUDIO | source-resolved | m52_soundc_audio_device (src/mame/irem/irem.cpp:18) | mpatrol, travrusa |
| IREM_M62_AUDIO | source-resolved | m62_audio_device (src/mame/irem/irem.cpp:17) | kungfum |
| K005849 | source-resolved | k005849_device (src/mame/konami/k005849.cpp:41) | gberet |
| K007232 | source-resolved | k007232_device (src/devices/sound/k007232.cpp:14) | tmnt |
| K051960 | source-resolved | k051960_device (src/mame/konami/k051960.cpp:77) | tmnt |
| K052109 | source-resolved | k052109_device (src/mame/konami/k052109.cpp:149) | simpsons, tmnt |
| K053246 | source-resolved | k053247_device (src/mame/konami/k053246_k053247_k055673.cpp:754) | simpsons |
| K053251 | source-resolved | k053251_device (src/mame/konami/k053251.cpp:128) | simpsons |
| K053260 | source-resolved | k053260_device (src/devices/sound/k053260.cpp:65) | simpsons |
| KONAMI | source-resolved | konami_cpu_device (src/devices/cpu/m6809/konami.cpp:86) | simpsons |
| KONAMI1 | source-resolved | konami1_device (src/mame/konami/konami1.cpp:12) | gyruss, junofrst, rocnrope, trackfld |
| LADYBUG_VIDEO | source-resolved | ladybug_video_device (src/mame/universal/ladybug_video.cpp:15) | cavenger, ladybug |
| LATCH8 | source-resolved | latch8_device (src/devices/machine/latch8.cpp:100) | dkong, dkongjr |
| LR35902 | source-resolved | lr35902_cpu_device (src/devices/cpu/lr35902/lr35902.cpp:63) | gameboy |
| LS157 | source-resolved | ls157_device (src/devices/machine/74157.cpp:31) | joust |
| LS259 | source-resolved | ls259_device (src/devices/machine/74259.cpp:95) | asteroid, cavenger, centiped, congo, crush, digdug, galaga, gauntlet, gng, gyruss, junofrst, ladybug, mario, mspacman, pacman, pengo, polepos, pooyan, rocnrope, timeplt, trackfld, tutankhm, xevious, zaxxon |
| M58715 | source-resolved | m58715_device (src/devices/cpu/mcs48/mcs48.cpp:204) | mario |
| M6502 | source-resolved | m6502_device (src/devices/cpu/m6502/m6502.cpp:15) | asteroid, centiped, gauntlet, matmania, qbert, venture |
| M6507 | source-resolved | m6507_device (src/devices/cpu/m6502/m6507.cpp:16) | a2600 |
| M68000 | source-resolved | m68000_device (src/devices/cpu/m68000/m68000.cpp:8) | ffight, ghouls, mslug, rampage, sf2, sf2ce, shinobi, tmnt |
| M68010 | source-resolved | m68010_device (src/devices/cpu/m68000/m68010.cpp:8) | gauntlet |
| M6801U4 | source-resolved | m6801u4_cpu_device (src/devices/cpu/m6800/m6801.cpp:407) | bublbobl |
| M6802 | source-resolved | m6802_cpu_device (src/devices/cpu/m6800/m6800.cpp:370) | qix |
| M6803 | source-resolved | m6803_cpu_device (src/devices/cpu/m6800/m6801.cpp:409) | kungfum, mpatrol, travrusa |
| M6808 | source-resolved | m6808_cpu_device (src/devices/cpu/m6800/m6800.cpp:371) | defender, joust, robotron |
| M68705P5 | source-resolved | m68705p5_device (src/devices/cpu/m6805/m68705.cpp:113) | arkanoid, elevator |
| MB14241 | source-resolved | mb14241_device (src/devices/machine/mb14241.cpp:18) | invaders |
| MB8842 | source-resolved | mb8842_cpu_device (src/devices/cpu/mb88xx/mb88xx.cpp:25) | xevious |
| MB8843 | source-resolved | mb8843_cpu_device (src/devices/cpu/mb88xx/mb88xx.cpp:26) | digdug, galaga, polepos, xevious |
| MB8844 | source-resolved | mb8844_cpu_device (src/devices/cpu/mb88xx/mb88xx.cpp:27) | galaga, polepos, xevious |
| MB8884 | source-resolved | mb8884_device (src/devices/cpu/mcs48/mcs48.cpp:202) | dkong, dkongjr |
| MC1408 | source-resolved | mc1408_device (src/devices/sound/dac.h:210) | defender, joust, qbert, robotron |
| MC6809 | source-resolved | mc6809_device (src/devices/cpu/m6809/m6809.cpp:136) | ddragon, gng |
| MC6809E | source-resolved | mc6809e_device (src/devices/cpu/m6809/m6809.cpp:137) | defender, joust, qix, robotron, tutankhm |
| MC6845 | source-resolved | mc6845_device (src/devices/video/mc6845.cpp:61) | qix |
| MIDWAY_SOUNDS_GOOD | source-resolved | midway_sounds_good_device (src/mame/bally/midway_sound.cpp:33) | rampage |
| MOS6532 | source-resolved | mos6532_device (src/devices/machine/mos6530.cpp:29) | a2600, qbert, venture |
| MSM5205 | source-resolved | msm5205_device (src/devices/sound/msm5205.cpp:53) | ddragon, kungfum, mpatrol, rygar, travrusa |
| NAMCO_06XX | source-resolved | namco_06xx_device (src/mame/namco/namco06.cpp:237) | digdug, galaga, polepos, xevious |
| NAMCO_50XX | source-resolved | namco_50xx_device (src/mame/namco/namco50.cpp:211) | xevious |
| NAMCO_51XX | source-resolved | namco_51xx_device (src/mame/namco/namco51.cpp:141) | digdug, galaga, polepos, xevious |
| NAMCO_52XX | source-resolved | namco_52xx_device (src/mame/namco/namco52.cpp:132) | polepos |
| NAMCO_53XX | source-resolved | namco_53xx_device (src/mame/namco/namco53.cpp:110) | digdug, polepos |
| NAMCO_54XX | source-resolved | namco_54xx_device (src/mame/namco/namco54.cpp:112) | galaga, polepos, xevious |
| NAMCO_WSG | source-resolved | namco_wsg_device (src/devices/sound/namco.cpp:58) | crush, digdug, galaga, mspacman, pacman, pengo, xevious |
| NEOGEO_CONTROL_PORT | source-resolved | neogeo_control_port_device (src/devices/bus/neogeo_ctrl/ctrl.cpp:34) | mslug |
| NEOGEO_CTRL_EDGE_CONNECTOR | source-resolved | neogeo_ctrl_edge_port_device (src/devices/bus/neogeo_ctrl/ctrl.cpp:35) | mslug |
| NEOGEO_SPRITE_OPTIMZIED | source-resolved | neosprite_optimized_device (src/mame/snk/neogeo_spr.cpp:654) | mslug |
| NES_CART_SLOT | source-resolved | nes_cart_slot_device (src/devices/bus/nes/nes_slot.cpp:98) | nes |
| NES_CONTROL_PORT | source-resolved | nes_control_port_device (src/devices/bus/nes_ctrl/ctrl.cpp:75) | nes |
| NETLIST_INT_INPUT | source-resolved | netlist_mame_int_input_device (src/devices/machine/netlist.cpp:53) | mario |
| NETLIST_LOGIC_INPUT | declarative-host | netlist_mame_logic_input_device (src/devices/machine/netlist.cpp:55) | frogger, kungfum, mario, scramble |
| NETLIST_SOUND | declarative-host | netlist_mame_sound_device (src/devices/machine/netlist.cpp:48) | 1942, frogger, kungfum, mario, popeye, scramble |
| NETLIST_STREAM_INPUT | declarative-host | netlist_mame_stream_input_device (src/devices/machine/netlist.cpp:56) | 1942, frogger, kungfum, popeye, scramble |
| NETLIST_STREAM_OUTPUT | declarative-host | netlist_mame_stream_output_device (src/devices/machine/netlist.cpp:60) | 1942, frogger, kungfum, mario, popeye, scramble |
| NG_MEMCARD | source-resolved | ng_memcard_device (src/mame/snk/ng_memcard.cpp:31) | mslug |
| NSC8105 | source-resolved | nsc8105_cpu_device (src/devices/cpu/m6800/m6800.cpp:372) | friskyt |
| NVRAM | declarative-host | nvram_device (src/devices/machine/nvram.cpp:19) | berzerk, defender, friskyt, joust, mario, mslug, polepos, qbert, qix, rampage, robotron, shinobi, trackfld |
| OKIM6295 | source-resolved | okim6295_device (src/devices/sound/okim6295.cpp:54) | ffight, ghouls, sf2, sf2ce |
| OUTPUT_LATCH | source-resolved | output_latch_device (src/devices/machine/output_latch.cpp:6) | asteroid |
| PALETTE | declarative-host | - | 1942, arkanoid, bankp, bublbobl, cavenger, centiped, commando, congo, crush, ddragon, defender, digdug, dkong, dkongjr, elevator, ffight, friskyt, frogger, galaga, galaxian, gameboy, gauntlet, gberet, ghouls, gng, gunsmoke, gyruss, joust, jumpbug, junglek, junofrst, kungfum, ladybug, mario, matmania, mpatrol, mrdo, mslug, mspacman, pacman, panic, pengo, phoenix, polepos, pooyan, popeye, qbert, qix, rampage, robotron, rocnrope, rtype, rygar, scramble, sf2, sf2ce, shinobi, simpsons, timeplt, tmnt, trackfld, travrusa, tutankhm, upndown, venture, wboy, xevious, zaxxon, zigzagb |
| PHOENIX_SOUND | source-resolved | phoenix_sound_device (src/mame/phoenix/phoenix_a.cpp:51) | phoenix |
| PIA6821 | source-resolved | pia6821_device (src/devices/machine/6821pia.cpp:41) | defender, joust, qix, rampage, robotron, venture |
| PIC8259 | source-resolved | pic8259_device (src/devices/machine/pic8259.cpp:458) | rtype |
| PIT8253 | source-resolved | pit8253_device (src/devices/machine/pit8253.cpp:45) | venture |
| POKEY | source-resolved | pokey_device (src/devices/sound/pokey.cpp:193) | centiped, gauntlet |
| POLEPOS_SOUND | source-resolved | polepos_sound_device (src/mame/namco/polepos_a.cpp:201) | polepos |
| POLEPOS_WSG | source-resolved | polepos_wsg_device (src/devices/sound/namco.cpp:59) | polepos |
| PPU_2C02 | source-resolved | ppu2c02_device (src/devices/video/ppu2c0x.cpp:40) | nes |
| RP2A03G | source-resolved | rp2a03g_device (src/devices/cpu/m6502/rp2a03.cpp:17) | nes |
| RST_NEG_BUFFER | source-resolved | rst_neg_buffer_device (src/devices/machine/rstbuf.cpp:63) | rtype |
| S14001A | source-resolved | s14001a_device (src/devices/sound/s14001a.cpp:204) | berzerk |
| SAMPLES | source-resolved | samples_device (src/devices/sound/samples.cpp:38) | carnival, congo, panic, qbert, tmnt, zaxxon |
| SCREEN | declarative-host | - | 1942, a2600, arkanoid, asteroid, bankp, berzerk, bublbobl, carnival, cavenger, centiped, coleco, commando, congo, crush, ddragon, defender, digdug, dkong, dkongjr, elevator, ffight, friskyt, frogger, galaga, galaxian, gameboy, gauntlet, gberet, ghouls, gng, gunsmoke, gyruss, invaders, joust, jumpbug, junglek, junofrst, kungfum, ladybug, mario, matmania, mpatrol, mrdo, mslug, mspacman, nes, pacman, panic, pengo, phoenix, polepos, pooyan, popeye, qbert, qix, rampage, robotron, rocnrope, rtype, rygar, scramble, sf2, sf2ce, shinobi, simpsons, timeplt, tmnt, trackfld, travrusa, tutankhm, upndown, venture, wboy, xevious, zaxxon, zigzagb |
| SEGA_315_5098 | source-resolved | sega_315_5098_device (src/devices/machine/segacrpt_device.cpp:279) | upndown |
| SEGA_315_5177 | source-resolved | sega_315_5177_device (src/devices/machine/segacrp2_device.cpp:86) | wboy |
| SEGA_SYS16A_SPRITES | source-resolved | sega_sys16a_sprite_device (src/mame/sega/sega16sp.cpp:23) | shinobi |
| SEGAIC16VID | source-resolved | segaic16_video_device (src/mame/sega/segaic16.cpp:528) | shinobi |
| SLAPSTIC | source-resolved | atari_slapstic_device (src/mame/atari/slapstic.cpp:204) | gauntlet |
| SN76477 | source-resolved | sn76477_device (src/devices/sound/sn76477.cpp:143) | invaders |
| SN76489 | source-resolved | sn76489_device (src/devices/sound/sn76496.cpp:473) | cavenger, ladybug, mrdo |
| SN76489A | source-resolved | sn76489a_device (src/devices/sound/sn76496.cpp:474) | bankp, coleco, congo, gberet, trackfld, upndown, wboy |
| SPEAKER | declarative-host | - | 1942, a2600, arkanoid, asteroid, bankp, berzerk, bublbobl, carnival, cavenger, centiped, coleco, commando, congo, crush, ddragon, defender, digdug, dkong, dkongjr, elevator, ffight, friskyt, frogger, galaga, galaxian, gameboy, gauntlet, gberet, ghouls, gng, gunsmoke, gyruss, invaders, joust, jumpbug, junglek, junofrst, kungfum, ladybug, mario, matmania, mpatrol, mrdo, mslug, mspacman, nes, pacman, panic, pengo, phoenix, polepos, pooyan, popeye, qbert, qix, rampage, robotron, rocnrope, rtype, rygar, scramble, sf2, sf2ce, shinobi, simpsons, timeplt, tmnt, trackfld, travrusa, tutankhm, upndown, venture, wboy, xevious, zaxxon, zigzagb |
| STARFIELD_05XX | source-resolved | starfield_05xx_device (src/mame/namco/starfield_05xx.cpp:486) | galaga |
| TAITO_SJ_SECURITY_MCU | source-resolved | taito_sj_security_mcu_device (src/mame/taito/taitosjsec.cpp:6) | elevator |
| TECMO_SPRITE | source-resolved | tecmo_spr_device (src/mame/shared/tecmo_spr.cpp:19) | rygar |
| TIA | source-resolved | tia_device (src/devices/sound/tiaintf.cpp:8) | a2600 |
| TIA_NTSC_VIDEO | source-resolved | tia_ntsc_video_device (src/mame/atari/tia.cpp:377) | a2600 |
| TILEMAP | unresolved | - | gauntlet |
| TIMEPLT_AUDIO | source-resolved | timeplt_audio_device (src/mame/shared/timeplt_a.cpp:22) | pooyan, rocnrope, timeplt, tutankhm |
| TIMER | declarative-host | timer_device (src/devices/machine/timer.cpp:30) | 1942, carnival, centiped, coleco, commando, ddragon, defender, gauntlet, joust, matmania, panic, polepos, rampage, robotron, scramble, tutankhm, upndown, wboy |
| TMS36XX | source-resolved | tms36xx_device (src/devices/sound/tms36xx.cpp:312) | phoenix |
| TMS5220C | source-resolved | tms5220c_device (src/devices/sound/tms5220.cpp:2173) | gauntlet |
| TMS9928A | source-resolved | tms9928a_device (src/devices/video/tms9928a.cpp:30) | coleco |
| TRACKFLD_AUDIO | source-resolved | trackfld_audio_device (src/mame/konami/trackfld_a.cpp:9) | trackfld |
| TTL153 | source-resolved | ttl153_device (src/devices/machine/74153.cpp:19) | asteroid |
| TTL74181 | source-resolved | ttl74181_device (src/devices/machine/74181.cpp:19) | berzerk |
| UPD4990A | source-resolved | upd4990a_device (src/devices/machine/upd1990a.cpp:31) | mslug |
| UPD7751 | source-resolved | upd7751_device (src/devices/cpu/mcs48/mcs48.cpp:203) | shinobi |
| UPD7759 | source-resolved | upd7759_device (src/devices/sound/upd7759.cpp:184) | tmnt |
| V30 | source-resolved | v30_device (src/devices/cpu/nec/nec.cpp:124) | rtype |
| VCS_CART_SLOT | source-resolved | vcs_cart_slot_device (src/devices/bus/vcs/vcs_slot.cpp:24) | a2600 |
| VCS_CONTROL_PORT | source-resolved | vcs_control_port_device (src/devices/bus/vcs_ctrl/ctrl.cpp:18) | a2600 |
| VECTOR | source-resolved | vector_device (src/devices/video/vector.cpp:53) | asteroid |
| VLM5030 | source-resolved | vlm5030_device (src/devices/sound/vlm5030.cpp:160) | trackfld |
| VOTRAX_SC01 | source-resolved | votrax_sc01_device (src/devices/sound/votrax.cpp:40) | qbert |
| WATCHDOG_TIMER | declarative-host | watchdog_timer_device (src/devices/machine/watchdog.cpp:20) | arkanoid, asteroid, bublbobl, centiped, crush, defender, digdug, dkong, dkongjr, elevator, friskyt, frogger, galaga, galaxian, gauntlet, gberet, invaders, joust, junglek, junofrst, mslug, mspacman, pacman, pengo, polepos, pooyan, qbert, rampage, robotron, rocnrope, rygar, scramble, shinobi, simpsons, timeplt, tmnt, trackfld, tutankhm, xevious, zigzagb |
| WILLIAMS_BLITTER_SC1 | source-resolved | williams_blitter_sc1_device (src/mame/williams/williamsblitter.cpp:27) | joust, robotron |
| YM2149 | source-resolved | ym2149_device (src/devices/sound/ay8910.cpp:1652) | arkanoid |
| YM2151 | source-resolved | ym2151_device (src/devices/sound/ymopm.cpp:12) | ddragon, ffight, gauntlet, ghouls, rtype, sf2, sf2ce, shinobi, simpsons, tmnt |
| YM2203 | source-resolved | ym2203_device (src/devices/sound/ymopn.cpp:12) | bublbobl, commando, gng, gunsmoke |
| YM2610 | source-resolved | ym2610_device (src/devices/sound/ymopn.cpp:224) | mslug |
| YM3526 | source-resolved | ym3526_device (src/devices/sound/ymopl.cpp:12) | bublbobl, rygar |
| Z80 | source-resolved | z80_device (src/devices/cpu/z80/z80.cpp:940) | 1942, arkanoid, bankp, berzerk, bublbobl, carnival, cavenger, coleco, commando, congo, crush, digdug, dkong, dkongjr, elevator, ffight, friskyt, frogger, galaga, galaxian, gberet, ghouls, gng, gunsmoke, gyruss, jumpbug, junglek, junofrst, kungfum, ladybug, mario, mpatrol, mrdo, mslug, mspacman, pacman, panic, pengo, polepos, pooyan, popeye, rampage, rocnrope, rtype, rygar, scramble, sf2, sf2ce, shinobi, simpsons, timeplt, tmnt, trackfld, travrusa, tutankhm, upndown, wboy, xevious, zaxxon, zigzagb |
| Z8002 | source-resolved | z8002_device (src/devices/cpu/z8000/z8000.cpp:23) | polepos |
| Z80CTC | source-resolved | z80ctc_device (src/devices/machine/z80ctc.cpp:72) | rampage |
| Z80DMA | source-resolved | z80dma_device (src/devices/machine/z80dma.cpp:120) | mario |
| Z80PIO | source-resolved | z80pio_device (src/devices/machine/z80pio.cpp:34) | wboy |

Generated device modules are currently structured IR. They become executable as
the device compiler gains the required MAME constructs; `executable: false` in the
hardware graph prevents source extraction alone from being reported as completion.
