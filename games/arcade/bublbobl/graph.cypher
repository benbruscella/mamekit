// mamekit knowledge graph — driver src/mame/taito/bublbobl.cpp
// generated 2026-09-05T03:49:18.091Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/taito/bublbobl.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/taito/bublbobl.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:bublbobl.h'}) SET n:SourceFile SET n += {path: 'bublbobl.h', external: true};
MERGE (n:KG {id: 'file:taito68705.h'}) SET n:SourceFile SET n += {path: 'taito68705.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:sound/ymopn.h'}) SET n:SourceFile SET n += {path: 'sound/ymopn.h', external: true};
MERGE (n:KG {id: 'file:sound/ymopl.h'}) SET n:SourceFile SET n += {path: 'sound/ymopl.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'game:bublbobl'}) SET n:Game SET n += {name: 'bublbobl', year: '1986', company: 'Taito', fullname: 'Bubble Bobble (Japan, Ver 0.1)', monitor: 'ROT0', cls: 'bublbobl_state', init: 'init_common', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 2141, sourceColumn: 1, sourceEndLine: 2141};
MERGE (n:KG {id: 'romset:bublbobl'}) SET n:RomSet SET n += {name: 'bublbobl', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1318, sourceColumn: 1, sourceEndLine: 1318};
MERGE (n:KG {id: 'region:bublbobl/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 196608, flags: '0', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1093, sourceColumn: 2, sourceEndLine: 1093};
MERGE (n:KG {id: 'rom:bublbobl/maincpu/a78-06-1.51'}) SET n:Rom SET n += {file: 'a78-06-1.51', offset: 0, size: 32768, crc: '567934b6', sha1: 'b0c4d49fd551f465d148c25c3e80b278835e2f0d', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1320, sourceColumn: 2, sourceEndLine: 1320};
MERGE (n:KG {id: 'rom:bublbobl/maincpu/a78-05-1.52'}) SET n:Rom SET n += {file: 'a78-05-1.52', offset: 65536, size: 65536, crc: '9f8ee242', sha1: '924150d4e7e087a9b2b0a294c2d0e9903a266c6c', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1322, sourceColumn: 2, sourceEndLine: 1322};
MERGE (n:KG {id: 'region:bublbobl/subcpu'}) SET n:RomRegion SET n += {tag: 'subcpu', size: 65536, flags: '0', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1101, sourceColumn: 2, sourceEndLine: 1101};
MERGE (n:KG {id: 'rom:bublbobl/subcpu/a78-08.37'}) SET n:Rom SET n += {file: 'a78-08.37', offset: 0, size: 32768, crc: 'ae11a07b', sha1: 'af7a335c8da637103103cc274e077f123908ebb7', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1326, sourceColumn: 2, sourceEndLine: 1326};
MERGE (n:KG {id: 'region:bublbobl/audiocpu'}) SET n:RomRegion SET n += {tag: 'audiocpu', size: 65536, flags: '0', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1104, sourceColumn: 2, sourceEndLine: 1104};
MERGE (n:KG {id: 'rom:bublbobl/audiocpu/a78-07.46'}) SET n:Rom SET n += {file: 'a78-07.46', offset: 0, size: 32768, crc: '4f9a26e8', sha1: '3105b34b88a7134493c2b3f584729f8b0407a011', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1329, sourceColumn: 2, sourceEndLine: 1329};
MERGE (n:KG {id: 'region:bublbobl/mcu'}) SET n:RomRegion SET n += {tag: 'mcu', size: 4096, flags: '0', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1331, sourceColumn: 2, sourceEndLine: 1331};
MERGE (n:KG {id: 'rom:bublbobl/mcu/a78-01.17'}) SET n:Rom SET n += {file: 'a78-01.17', offset: 0, size: 4096, crc: 'b1bfb53d', sha1: '31b8f31acd3aa394acd80db362774749842e1285', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1332, sourceColumn: 2, sourceEndLine: 1332};
MERGE (n:KG {id: 'region:bublbobl/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 524288, flags: 'ROMREGION_INVERT', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1110, sourceColumn: 2, sourceEndLine: 1110};
MERGE (n:KG {id: 'rom:bublbobl/gfx1/a78-09.12'}) SET n:Rom SET n += {file: 'a78-09.12', offset: 0, size: 32768, crc: '20358c22', sha1: '2297af6c53d5807bf90a8e081075b8c72a994fc5', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1335, sourceColumn: 2, sourceEndLine: 1335};
MERGE (n:KG {id: 'rom:bublbobl/gfx1/a78-10.13'}) SET n:Rom SET n += {file: 'a78-10.13', offset: 32768, size: 32768, crc: '930168a9', sha1: 'fd358c3c3b424bca285f67a1589eb98a345ff670', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1336, sourceColumn: 2, sourceEndLine: 1336};
MERGE (n:KG {id: 'rom:bublbobl/gfx1/a78-11.14'}) SET n:Rom SET n += {file: 'a78-11.14', offset: 65536, size: 32768, crc: '9773e512', sha1: '33c1687ee575d66bf0e98add45d06da827813765', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1337, sourceColumn: 2, sourceEndLine: 1337};
MERGE (n:KG {id: 'rom:bublbobl/gfx1/a78-12.15'}) SET n:Rom SET n += {file: 'a78-12.15', offset: 98304, size: 32768, crc: 'd045549b', sha1: '0c12077d3ddc2ce6aa45a0224ad5540f3f218446', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1338, sourceColumn: 2, sourceEndLine: 1338};
MERGE (n:KG {id: 'rom:bublbobl/gfx1/a78-13.16'}) SET n:Rom SET n += {file: 'a78-13.16', offset: 131072, size: 32768, crc: 'd0af35c5', sha1: 'c5a89f4d73acc0db86654540b3abfd77b3757db5', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1339, sourceColumn: 2, sourceEndLine: 1339};
MERGE (n:KG {id: 'rom:bublbobl/gfx1/a78-14.17'}) SET n:Rom SET n += {file: 'a78-14.17', offset: 163840, size: 32768, crc: '7b5369a8', sha1: '1307b26d80e6f36ebe6c442bebec41d20066eaf9', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1340, sourceColumn: 2, sourceEndLine: 1340};
MERGE (n:KG {id: 'rom:bublbobl/gfx1/a78-15.30'}) SET n:Rom SET n += {file: 'a78-15.30', offset: 262144, size: 32768, crc: '6b61a413', sha1: '44eddf12fb46fceca2addbe6da929aaea7636b13', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1342, sourceColumn: 2, sourceEndLine: 1342};
MERGE (n:KG {id: 'rom:bublbobl/gfx1/a78-16.31'}) SET n:Rom SET n += {file: 'a78-16.31', offset: 294912, size: 32768, crc: 'b5492d97', sha1: 'd5b045e3ebaa44809757a4220cefb3c6815470da', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1343, sourceColumn: 2, sourceEndLine: 1343};
MERGE (n:KG {id: 'rom:bublbobl/gfx1/a78-17.32'}) SET n:Rom SET n += {file: 'a78-17.32', offset: 327680, size: 32768, crc: 'd69762d5', sha1: '3326fef4e0bd86681a3047dc11886bb171ecb609', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1344, sourceColumn: 2, sourceEndLine: 1344};
MERGE (n:KG {id: 'rom:bublbobl/gfx1/a78-18.33'}) SET n:Rom SET n += {file: 'a78-18.33', offset: 360448, size: 32768, crc: '9f243b68', sha1: '32dce8d311a4be003693182a999e4053baa6bb0a', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1345, sourceColumn: 2, sourceEndLine: 1345};
MERGE (n:KG {id: 'rom:bublbobl/gfx1/a78-19.34'}) SET n:Rom SET n += {file: 'a78-19.34', offset: 393216, size: 32768, crc: '66e9438c', sha1: 'b94e62b6fbe7f4e08086d0365afc5cff6e0ccafd', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1346, sourceColumn: 2, sourceEndLine: 1346};
MERGE (n:KG {id: 'rom:bublbobl/gfx1/a78-20.35'}) SET n:Rom SET n += {file: 'a78-20.35', offset: 425984, size: 32768, crc: '9ef863ad', sha1: '29f91b5a3765e4d6e6c3382db1d8d8297b6e56c8', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1347, sourceColumn: 2, sourceEndLine: 1347};
MERGE (n:KG {id: 'region:bublbobl/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 256, flags: '0', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1128, sourceColumn: 2, sourceEndLine: 1128};
MERGE (n:KG {id: 'rom:bublbobl/proms/a71-25.41'}) SET n:Rom SET n += {file: 'a71-25.41', offset: 0, size: 256, crc: '2d0f8545', sha1: '089c31e2f614145ef2743164f7b52ae35bc06808', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1351, sourceColumn: 2, sourceEndLine: 1351};
MERGE (n:KG {id: 'region:bublbobl/plds'}) SET n:RomRegion SET n += {tag: 'plds', size: 3, flags: '0', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1131, sourceColumn: 2, sourceEndLine: 1131};
MERGE (n:KG {id: 'rom:bublbobl/plds/pal16l8.bin'}) SET n:Rom SET n += {file: 'pal16l8.bin', offset: 0, size: 1, crc: '', sha1: '', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1355, sourceColumn: 2, sourceEndLine: 1355, status: 'nodump'};
MERGE (n:KG {id: 'rom:bublbobl/plds/pal16r4.bin'}) SET n:Rom SET n += {file: 'pal16r4.bin', offset: 0, size: 1, crc: '', sha1: '', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1357, sourceColumn: 2, sourceEndLine: 1357, status: 'nodump'};
MERGE (n:KG {id: 'map:bublbobl_state.common_maincpu_map'}) SET n:AddressMap SET n += {cls: 'bublbobl_state', name: 'common_maincpu_map', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 292, sourceColumn: 1, sourceEndLine: 300};
MERGE (n:KG {id: 'map:bublbobl_state.common_maincpu_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom()', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 294, sourceColumn: 2, sourceEndLine: 294, rom: true};
MERGE (n:KG {id: 'map:bublbobl_state.common_maincpu_map/range1'}) SET n:AddressRange SET n += {start: 32768, end: 49151, raw: 'map(0x8000, 0xbfff).bankr("bank1")', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 295, sourceColumn: 2, sourceEndLine: 295, bankRead: 'bank1'};
MERGE (n:KG {id: 'map:bublbobl_state.common_maincpu_map/range2'}) SET n:AddressRange SET n += {start: 49152, end: 56575, raw: 'map(0xc000, 0xdcff).ram().share("videoram")', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 296, sourceColumn: 2, sourceEndLine: 296, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'map:bublbobl_state.common_maincpu_map/range3'}) SET n:AddressRange SET n += {start: 56576, end: 57343, raw: 'map(0xdd00, 0xdfff).ram().share("objectram")', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 297, sourceColumn: 2, sourceEndLine: 297, ram: true, share: 'objectram'};
MERGE (n:KG {id: 'map:bublbobl_state.common_maincpu_map/range4'}) SET n:AddressRange SET n += {start: 57344, end: 63487, raw: 'map(0xe000, 0xf7ff).ram().share("share1")', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 298, sourceColumn: 2, sourceEndLine: 298, ram: true, share: 'share1'};
MERGE (n:KG {id: 'map:bublbobl_state.common_maincpu_map/range5'}) SET n:AddressRange SET n += {start: 63488, end: 63999, raw: 'map(0xf800, 0xf9ff).ram().w(m_palette, FUNC(palette_device::write8)).share("palette")', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 299, sourceColumn: 2, sourceEndLine: 299, ram: true, share: 'palette'};
MERGE (n:KG {id: 'handler:palette_device.write8'}) SET n:Handler SET n += {method: 'write8', ownerClass: 'palette_device', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 299, sourceColumn: 2, sourceEndLine: 299};
MERGE (n:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map'}) SET n:AddressMap SET n += {cls: 'bublbobl_state', name: 'bublbobl_maincpu_map', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 302, sourceColumn: 1, sourceEndLine: 312, calls: ['common_maincpu_map']};
MERGE (n:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map/range0'}) SET n:AddressRange SET n += {start: 64000, end: 64000, raw: 'map(0xfa00, 0xfa00).mirror(0x007c).r(m_sound_to_main, FUNC(generic_latch_8_device::read)).w(m_main_to_sound, FUNC(generic_latch_8_device::write))', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 305, sourceColumn: 2, sourceEndLine: 305, mirror: 124};
MERGE (n:KG {id: 'handler:generic_latch_8_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 419, sourceColumn: 2, sourceEndLine: 419};
MERGE (n:KG {id: 'handler:generic_latch_8_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 419, sourceColumn: 2, sourceEndLine: 419};
MERGE (n:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map/range1'}) SET n:AddressRange SET n += {start: 64001, end: 64001, raw: 'map(0xfa01, 0xfa01).mirror(0x007c).r(FUNC(bublbobl_state::common_sound_semaphores_r))', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 306, sourceColumn: 2, sourceEndLine: 306, mirror: 124};
MERGE (n:KG {id: 'handler:bublbobl_state.common_sound_semaphores_r'}) SET n:Handler SET n += {method: 'common_sound_semaphores_r', ownerClass: 'bublbobl_state', sourceFile: 'src/mame/taito/bublbobl_m.cpp', sourceLine: 141, sourceColumn: 1, sourceEndLine: 147, sourceParameters: '', sourceBody: 'uint8_t ret = 0xfc;
	ret |= m_main_to_sound->pending_r() ? 0x2 : 0x0;
	ret |= m_sound_to_main->pending_r() ? 0x1 : 0x0;
	return ret;'};
MERGE (n:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map/range2'}) SET n:AddressRange SET n += {start: 64003, end: 64003, raw: 'map(0xfa03, 0xfa03).mirror(0x007c).w(FUNC(bublbobl_state::bublbobl_soundcpu_reset_w))', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 307, sourceColumn: 2, sourceEndLine: 307, mirror: 124};
MERGE (n:KG {id: 'handler:bublbobl_state.bublbobl_soundcpu_reset_w'}) SET n:Handler SET n += {method: 'bublbobl_soundcpu_reset_w', ownerClass: 'bublbobl_state', sourceFile: 'src/mame/taito/bublbobl_m.cpp', sourceLine: 135, sourceColumn: 1, sourceEndLine: 139, sourceParameters: 'uint8_t data', sourceBody: '//logerror("soundcpu_reset_w called with data of %d\\n", data);
	common_sreset(data ? ASSERT_LINE : CLEAR_LINE);'};
MERGE (n:KG {id: 'handler:bublbobl_state.common_sreset'}) SET n:Handler SET n += {method: 'common_sreset', ownerClass: 'bublbobl_state', sourceFile: 'src/mame/taito/bublbobl_m.cpp', sourceLine: 18, sourceColumn: 1, sourceEndLine: 30, sourceParameters: 'int state', sourceBody: 'if ((state != CLEAR_LINE) && !m_sreset_old)
	{
		if (m_ym2203 != nullptr) m_ym2203->reset(); // ym2203, if present, is reset
		if (m_ym3526 != nullptr) m_ym3526->reset(); // ym3526, if present, is reset
		m_audiocpu->set_input_line(INPUT_LINE_IRQ0, CLEAR_LINE); // if a sound irq is active, it is cleared. is this necessary? if the above two devices de-assert /IRQ on reset (as a device_line write) properly, it shouldn\'t be...
		m_sound_to_main->acknowledge_w(); // sound->main semaphore is cleared
		m_soundnmi->in_w<0>(0); // sound nmi enable is unset
	}
	m_audiocpu->set_input_line(INPUT_LINE_RESET, state); // soundcpu is reset
	m_sreset_old = (ASSERT_LINE == state);'};
MERGE (n:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map/range3'}) SET n:AddressRange SET n += {start: 64128, end: 64128, raw: 'map(0xfa80, 0xfa80).mirror(0x007f).w("watchdog", FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 308, sourceColumn: 2, sourceEndLine: 308, mirror: 127};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 384, sourceColumn: 2, sourceEndLine: 384};
MERGE (n:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map/range4'}) SET n:AddressRange SET n += {start: 64256, end: 64256, raw: 'map(0xfb00, 0xfb00).mirror(0x003f).w(FUNC(bublbobl_state::bublbobl_nmitrigger_w))', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 309, sourceColumn: 2, sourceEndLine: 309, mirror: 63};
MERGE (n:KG {id: 'handler:bublbobl_state.bublbobl_nmitrigger_w'}) SET n:Handler SET n += {method: 'bublbobl_nmitrigger_w', ownerClass: 'bublbobl_state', sourceFile: 'src/mame/taito/bublbobl_m.cpp', sourceLine: 116, sourceColumn: 1, sourceEndLine: 119, sourceParameters: 'uint8_t data', sourceBody: 'm_subcpu->pulse_input_line(INPUT_LINE_NMI, attotime::zero);'};
MERGE (n:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map/range5'}) SET n:AddressRange SET n += {start: 64320, end: 64320, raw: 'map(0xfb40, 0xfb40).mirror(0x003f).w(FUNC(bublbobl_state::bublbobl_bankswitch_w))', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 310, sourceColumn: 2, sourceEndLine: 310, mirror: 63};
MERGE (n:KG {id: 'handler:bublbobl_state.bublbobl_bankswitch_w'}) SET n:Handler SET n += {method: 'bublbobl_bankswitch_w', ownerClass: 'bublbobl_state', sourceFile: 'src/mame/taito/bublbobl_m.cpp', sourceLine: 43, sourceColumn: 1, sourceEndLine: 63, sourceParameters: 'uint8_t data', sourceBody: '//logerror("bankswitch_w:  write of %02X\\n", data);
	/* bits 0-2 select ROM bank */
	membank("bank1")->set_entry((data ^ 4) & 7);

	/* bit 3 n.c. */

	/* bit 4 resets subcpu Z80 */
	m_subcpu->set_input_line(INPUT_LINE_RESET, (data & 0x10) ? CLEAR_LINE : ASSERT_LINE);

	/* bit 5 resets mcu */
	if (m_mcu != nullptr) // only if we have a MCU
		m_mcu->set_input_line(INPUT_LINE_RESET, (data & 0x20) ? CLEAR_LINE : ASSERT_LINE);

	/* bit 6 enables display */
	m_video_enable = data & 0x40;

	/* bit 7 flips screen */
	flip_screen_set(data & 0x80);'};
MERGE (n:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map/range6'}) SET n:AddressRange SET n += {start: 64512, end: 65535, raw: 'map(0xfc00, 0xffff).ram().share("mcu_sharedram")', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 311, sourceColumn: 2, sourceEndLine: 311, ram: true, share: 'mcu_sharedram'};
MERGE (n:KG {id: 'map:bublbobl_state.subcpu_map'}) SET n:AddressMap SET n += {cls: 'bublbobl_state', name: 'subcpu_map', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 314, sourceColumn: 1, sourceEndLine: 318};
MERGE (n:KG {id: 'map:bublbobl_state.subcpu_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom()', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 316, sourceColumn: 2, sourceEndLine: 316, rom: true};
MERGE (n:KG {id: 'map:bublbobl_state.subcpu_map/range1'}) SET n:AddressRange SET n += {start: 57344, end: 63487, raw: 'map(0xe000, 0xf7ff).ram().share("share1")', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 317, sourceColumn: 2, sourceEndLine: 317, ram: true, share: 'share1'};
MERGE (n:KG {id: 'map:bublbobl_state.sound_map'}) SET n:AddressMap SET n += {cls: 'bublbobl_state', name: 'sound_map', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 346, sourceColumn: 1, sourceEndLine: 356};
MERGE (n:KG {id: 'map:bublbobl_state.sound_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom()', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 348, sourceColumn: 2, sourceEndLine: 348, rom: true};
MERGE (n:KG {id: 'map:bublbobl_state.sound_map/range1'}) SET n:AddressRange SET n += {start: 32768, end: 36863, raw: 'map(0x8000, 0x8fff).ram()', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 349, sourceColumn: 2, sourceEndLine: 349, ram: true};
MERGE (n:KG {id: 'map:bublbobl_state.sound_map/range2'}) SET n:AddressRange SET n += {start: 36864, end: 36865, raw: 'map(0x9000, 0x9001).mirror(0x0ffe).rw("ym2203", FUNC(ym2203_device::read), FUNC(ym2203_device::write))', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 350, sourceColumn: 2, sourceEndLine: 350, mirror: 4094};
MERGE (n:KG {id: 'handler:ym2203_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'ym2203_device', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 423, sourceColumn: 2, sourceEndLine: 423};
MERGE (n:KG {id: 'handler:ym2203_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'ym2203_device', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 423, sourceColumn: 2, sourceEndLine: 423};
MERGE (n:KG {id: 'map:bublbobl_state.sound_map/range3'}) SET n:AddressRange SET n += {start: 40960, end: 40961, raw: 'map(0xa000, 0xa001).mirror(0x0ffe).rw("ym3526", FUNC(ym3526_device::read), FUNC(ym3526_device::write))', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 351, sourceColumn: 2, sourceEndLine: 351, mirror: 4094};
MERGE (n:KG {id: 'handler:ym3526_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'ym3526_device', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 351, sourceColumn: 2, sourceEndLine: 351};
MERGE (n:KG {id: 'handler:ym3526_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'ym3526_device', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 351, sourceColumn: 2, sourceEndLine: 351};
MERGE (n:KG {id: 'map:bublbobl_state.sound_map/range4'}) SET n:AddressRange SET n += {start: 45056, end: 45056, raw: 'map(0xb000, 0xb000).mirror(0x0ffc).r(m_main_to_sound, FUNC(generic_latch_8_device::read)).w(m_sound_to_main, FUNC(generic_latch_8_device::write))', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 352, sourceColumn: 2, sourceEndLine: 352, mirror: 4092};
MERGE (n:KG {id: 'map:bublbobl_state.sound_map/range5'}) SET n:AddressRange SET n += {start: 45057, end: 45057, raw: 'map(0xb001, 0xb001).mirror(0x0ffc).r(FUNC(bublbobl_state::common_sound_semaphores_r)).w(m_soundnmi, FUNC(input_merger_device::in_set<0>))', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 353, sourceColumn: 2, sourceEndLine: 353, mirror: 4092};
MERGE (n:KG {id: 'handler:input_merger_device.in_set_0'}) SET n:Handler SET n += {method: 'in_set_0', ownerClass: 'input_merger_device', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 422, sourceColumn: 2, sourceEndLine: 422};
MERGE (n:KG {id: 'map:bublbobl_state.sound_map/range6'}) SET n:AddressRange SET n += {start: 45058, end: 45058, raw: 'map(0xb002, 0xb002).mirror(0x0ffc).w(m_soundnmi, FUNC(input_merger_device::in_clear<0>))', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 354, sourceColumn: 2, sourceEndLine: 354, mirror: 4092};
MERGE (n:KG {id: 'handler:input_merger_device.in_clear_0'}) SET n:Handler SET n += {method: 'in_clear_0', ownerClass: 'input_merger_device', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 421, sourceColumn: 2, sourceEndLine: 421};
MERGE (n:KG {id: 'map:bublbobl_state.sound_map/range7'}) SET n:AddressRange SET n += {start: 57344, end: 65535, raw: 'map(0xe000, 0xffff).rom()', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 355, sourceColumn: 2, sourceEndLine: 355, rom: true};
MERGE (n:KG {id: 'handler:bublbobl_state.machine_reset_common'}) SET n:Handler SET n += {method: 'machine_reset_common', ownerClass: 'bublbobl_state', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 820, sourceColumn: 1, sourceEndLine: 831, sourceParameters: '', sourceBody: 'm_soundnmi->in_w<0>(0); // clear sound NMI stuff
	m_soundnmi->in_w<1>(0);
	m_subcpu->set_input_line(INPUT_LINE_NMI, CLEAR_LINE); // if a subcpu nmi is active (extremely remote chance), it is cleared
	if (!m_sreset_old)
	{
		// /SRESET is pulsed
		common_sreset(ASSERT_LINE);
		common_sreset(CLEAR_LINE);
	}'};
MERGE (n:KG {id: 'handler:bublbobl_state.irq0_line_hold'}) SET n:Handler SET n += {method: 'irq0_line_hold', ownerClass: 'bublbobl_state', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1030, sourceColumn: 2, sourceEndLine: 1030};
MERGE (n:KG {id: 'handler:bublbobl_state.screen_update_bublbobl'}) SET n:Handler SET n += {method: 'screen_update_bublbobl', ownerClass: 'bublbobl_state', sourceFile: 'src/mame/taito/bublbobl_v.cpp', sourceLine: 15, sourceColumn: 1, sourceEndLine: 96, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'int offs;
	int sx, sy, xc, yc;
	int gfx_num, gfx_attr, gfx_offs;
	const uint8_t *prom;
	const uint8_t *prom_line;


	/* Bubble Bobble doesn\'t have a real video RAM. All graphics (characters */
	/* and sprites) are stored in the same memory region, and information on */
	/* the background character columns is stored in the area dd00-dd3f */

	/* This clears & redraws the entire screen each pass */
	bitmap.fill(255, cliprect);

	if (!m_video_enable)
		return 0;

	sx = 0;

	prom = memregion("proms")->base();
	for (offs = 0; offs < m_objectram.bytes(); offs += 4)
	{
		/* skip empty sprites */
		/* this is dword aligned so the uint32_t * cast shouldn\'t give problems */
		/* on any architecture */
		if (*(uint32_t *)(&m_objectram[offs]) == 0)
			continue;

		gfx_num = m_objectram[offs + 1];
		gfx_attr = m_objectram[offs + 3];
		prom_line = prom + 0x80 + ((gfx_num & 0xe0) >> 1);

		gfx_offs = ((gfx_num & 0x1f) * 0x80);
		if ((gfx_num & 0xa0) == 0xa0)
			gfx_offs |= 0x1000;

		sy = -m_objectram[offs + 0];

		for (yc = 0; yc < 32; yc++)
		{
			if (prom_line[yc / 2] & 0x08)   continue;   /* NEXT */

			if (!(prom_line[yc / 2] & 0x04))    /* next column */
			{
				sx = m_objectram[offs + 2];
				if (gfx_attr & 0x40) sx -= 256;
			}

			for (xc = 0; xc < 2; xc++)
			{
				int goffs, code, color, flipx, flipy, x, y;

				goffs = gfx_offs + xc * 0x40 + (yc & 7) * 0x02 + (prom_line[yc/2] & 0x03) * 0x10;
				code = m_videoram[goffs] + 256 * (m_videoram[goffs + 1] & 0x03) + 1024 * (gfx_attr & 0x0f);
				color = (m_videoram[goffs + 1] & 0x3c) >> 2;
				flipx = m_videoram[goffs + 1] & 0x40;
				flipy = m_videoram[goffs + 1] & 0x80;
				x = sx + xc * 8;
				y = (sy + yc * 8) & 0xff;

				if (flip_screen())
				{
					x = 248 - x;
					y = 248 - y;
					flipx = !flipx;
					flipy = !flipy;
				}

				m_gfxdecode->gfx(0)->transpen(bitmap,cliprect,
						code,
						color,
						flipx,flipy,
						x,y,15);
			}
		}

		sx += 16;
	}
	return 0;'};
MERGE (n:KG {id: 'handler:input_merger_device.in_w_1'}) SET n:Handler SET n += {method: 'in_w_1', ownerClass: 'input_merger_device', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 987, sourceColumn: 2, sourceEndLine: 987};
MERGE (n:KG {id: 'machine:bublbobl_state.bublbobl_nomcu'}) SET n:MachineConfig SET n += {cls: 'bublbobl_state', name: 'bublbobl_nomcu', calls: [], stateMembers: ['{"name":"m_video_enable","bits":1}', '{"name":"m_sreset_old","bits":32,"signed":true}', '{"name":"m_port3_in","bits":8}', '{"name":"m_port1_out","bits":8}', '{"name":"m_port2_out","bits":8}', '{"name":"m_port3_out","bits":8}', '{"name":"m_port4_out","bits":8}', '{"name":"m_ic43_a","bits":32,"signed":true}', '{"name":"m_ic43_b","bits":32,"signed":true}'], sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 944, sourceColumn: 1, sourceEndLine: 989};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl_nomcu/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 6000000, config: ['Z80(config, m_maincpu, MAIN_XTAL/4)', 'm_maincpu->set_addrmap(AS_PROGRAM, &bublbobl_state::bublbobl_maincpu_map)', 'm_maincpu->set_irq_acknowledge_callback(FUNC(bublbobl_state::mcram_vect_r))'], sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 947, sourceColumn: 2, sourceEndLine: 947};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl_nomcu/subcpu'}) SET n:Device SET n += {type: 'Z80', tag: 'subcpu', clock: 6000000, config: ['Z80(config, m_subcpu, MAIN_XTAL/4)', 'm_subcpu->set_addrmap(AS_PROGRAM, &bublbobl_state::subcpu_map)', 'm_subcpu->set_vblank_int("screen", FUNC(bublbobl_state::irq0_line_hold))'], sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 950, sourceColumn: 2, sourceEndLine: 950};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl_nomcu/subcpu/callback:subcpu:0'}) SET n:Callback SET n += {signal: 'set_vblank_int', operation: 'set_vblank_int', raw: 'm_subcpu->set_vblank_int("screen", FUNC(bublbobl_state::irq0_line_hold))', ownerTag: 'subcpu', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 952, sourceColumn: 2, sourceEndLine: 952, targetTag: 'screen', targetClass: 'bublbobl_state', targetMethod: 'irq0_line_hold'};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl_nomcu/audiocpu'}) SET n:Device SET n += {type: 'Z80', tag: 'audiocpu', clock: 3000000, config: ['Z80(config, m_audiocpu, MAIN_XTAL/8)', 'm_audiocpu->set_addrmap(AS_PROGRAM, &bublbobl_state::sound_map)'], sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 954, sourceColumn: 2, sourceEndLine: 954};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl_nomcu/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog").set_vblank_count("screen", 128)'], sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 959, sourceColumn: 2, sourceEndLine: 959};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl_nomcu/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(MAIN_XTAL/4, 384, 0, 256, 264, 16, 240)', 'm_screen->set_screen_update(FUNC(bublbobl_state::screen_update_bublbobl))', 'm_screen->set_palette(m_palette)', 'm_screen->screen_vblank().set_inputline(m_mcu, M6801_IRQ1_LINE)'], configCalls: ['set_raw(6000000,384,0,256,264,16,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6000000, 384, 0, 256, 264, 16, 240], screenRawExpr: ['MAIN_XTAL/4', '384', '0', '256', '264', '16', '240']};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl_nomcu/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(bublbobl_state::screen_update_bublbobl))', ownerTag: 'screen', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 967, sourceColumn: 2, sourceEndLine: 967, targetClass: 'bublbobl_state', targetMethod: 'screen_update_bublbobl'};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl_nomcu/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_bublbobl)'], sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 970, sourceColumn: 2, sourceEndLine: 970, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl_nomcu/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette).set_format(palette_device::RGBx_444, 256).set_endianness(ENDIANNESS_BIG)'], sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 971, sourceColumn: 2, sourceEndLine: 971};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl_nomcu/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 974, sourceColumn: 2, sourceEndLine: 974};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl_nomcu/soundirq'}) SET n:Device SET n += {type: 'INPUT_MERGER_ANY_HIGH', tag: 'soundirq', clock: null, config: ['INPUT_MERGER_ANY_HIGH(config, m_soundirq).output_handler().set_inputline(m_audiocpu, INPUT_LINE_IRQ0)'], sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 976, sourceColumn: 2, sourceEndLine: 976};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl_nomcu/soundirq/callback:soundirq:0'}) SET n:Callback SET n += {signal: 'output_handler', operation: 'set_inputline', raw: 'INPUT_MERGER_ANY_HIGH(config, m_soundirq).output_handler().set_inputline(m_audiocpu, INPUT_LINE_IRQ0)', ownerTag: 'soundirq', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 976, sourceColumn: 2, sourceEndLine: 976, inputLine: 'INPUT_LINE_IRQ0', targetTag: 'audiocpu'};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl_nomcu/soundnmi'}) SET n:Device SET n += {type: 'INPUT_MERGER_ALL_HIGH', tag: 'soundnmi', clock: null, config: ['INPUT_MERGER_ALL_HIGH(config, m_soundnmi).output_handler().set_inputline(m_audiocpu, INPUT_LINE_NMI)'], sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 977, sourceColumn: 2, sourceEndLine: 977};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl_nomcu/soundnmi/callback:soundnmi:0'}) SET n:Callback SET n += {signal: 'output_handler', operation: 'set_inputline', raw: 'INPUT_MERGER_ALL_HIGH(config, m_soundnmi).output_handler().set_inputline(m_audiocpu, INPUT_LINE_NMI)', ownerTag: 'soundnmi', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 977, sourceColumn: 2, sourceEndLine: 977, inputLine: 'INPUT_LINE_NMI', targetTag: 'audiocpu'};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl_nomcu/main_to_sound'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'main_to_sound', clock: null, config: ['GENERIC_LATCH_8(config, m_main_to_sound).data_pending_callback().set(m_soundnmi, FUNC(input_merger_device::in_w<1>))'], sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 979, sourceColumn: 2, sourceEndLine: 979};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl_nomcu/main_to_sound/callback:main_to_sound:0'}) SET n:Callback SET n += {signal: 'data_pending_callback', operation: 'set', raw: 'GENERIC_LATCH_8(config, m_main_to_sound).data_pending_callback().set(m_soundnmi, FUNC(input_merger_device::in_w<1>))', ownerTag: 'main_to_sound', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 979, sourceColumn: 2, sourceEndLine: 979, targetClass: 'input_merger_device', targetMethod: 'in_w_1', targetTag: 'soundnmi'};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl_nomcu/sound_to_main'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'sound_to_main', clock: null, config: ['GENERIC_LATCH_8(config, m_sound_to_main)'], sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 980, sourceColumn: 2, sourceEndLine: 980};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl_nomcu/ym2203'}) SET n:Device SET n += {type: 'YM2203', tag: 'ym2203', clock: 3000000, config: ['YM2203(config, m_ym2203, MAIN_XTAL/8)', 'm_ym2203->irq_handler().set("soundirq", FUNC(input_merger_device::in_w<0>))', 'm_ym2203->add_route(ALL_OUTPUTS, "mono", 0.25)'], sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 982, sourceColumn: 2, sourceEndLine: 982};
MERGE (n:KG {id: 'audioroute:device:bublbobl_state.bublbobl_nomcu/ym2203/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.25, raw: 'm_ym2203->add_route(ALL_OUTPUTS, "mono", 0.25)', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 984, sourceColumn: 2, sourceEndLine: 984};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl_nomcu/ym2203/callback:ym2203:0'}) SET n:Callback SET n += {signal: 'irq_handler', operation: 'set', raw: 'm_ym2203->irq_handler().set("soundirq", FUNC(input_merger_device::in_w<0>))', ownerTag: 'ym2203', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 983, sourceColumn: 2, sourceEndLine: 983, targetTag: 'soundirq', targetClass: 'input_merger_device', targetMethod: 'in_w_0'};
MERGE (n:KG {id: 'handler:input_merger_device.in_w_0'}) SET n:Handler SET n += {method: 'in_w_0', ownerClass: 'input_merger_device', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 983, sourceColumn: 2, sourceEndLine: 983};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl_nomcu/ym3526'}) SET n:Device SET n += {type: 'YM3526', tag: 'ym3526', clock: 3000000, config: ['YM3526(config, m_ym3526, MAIN_XTAL/8)', 'm_ym3526->irq_handler().set("soundirq", FUNC(input_merger_device::in_w<1>))', 'm_ym3526->add_route(ALL_OUTPUTS, "mono", 0.50)'], sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 986, sourceColumn: 2, sourceEndLine: 986};
MERGE (n:KG {id: 'audioroute:device:bublbobl_state.bublbobl_nomcu/ym3526/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.5, raw: 'm_ym3526->add_route(ALL_OUTPUTS, "mono", 0.50)', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 988, sourceColumn: 2, sourceEndLine: 988};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl_nomcu/ym3526/callback:ym3526:0'}) SET n:Callback SET n += {signal: 'irq_handler', operation: 'set', raw: 'm_ym3526->irq_handler().set("soundirq", FUNC(input_merger_device::in_w<1>))', ownerTag: 'ym3526', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 987, sourceColumn: 2, sourceEndLine: 987, targetTag: 'soundirq', targetClass: 'input_merger_device', targetMethod: 'in_w_1'};
MERGE (n:KG {id: 'machine:bublbobl_state.bublbobl'}) SET n:MachineConfig SET n += {cls: 'bublbobl_state', name: 'bublbobl', calls: ['bublbobl_nomcu'], stateMembers: ['{"name":"m_video_enable","bits":1}', '{"name":"m_sreset_old","bits":32,"signed":true}', '{"name":"m_port3_in","bits":8}', '{"name":"m_port1_out","bits":8}', '{"name":"m_port2_out","bits":8}', '{"name":"m_port3_out","bits":8}', '{"name":"m_port4_out","bits":8}', '{"name":"m_ic43_a","bits":32,"signed":true}', '{"name":"m_ic43_b","bits":32,"signed":true}'], resetHandlers: ['bublbobl_state.machine_reset_common', 'bublbobl_state.machine_reset_bublbobl'], devicePatches: ['{"tag":"maincpu","config":["m_maincpu->set_irq_acknowledge_callback(FUNC(bublbobl_state::mcram_vect_r))"]}', '{"tag":"screen","config":["m_screen->screen_vblank().set_inputline(m_mcu, M6801_IRQ1_LINE)"]}'], sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 991, sourceColumn: 1, sourceEndLine: 1005};
MERGE (n:KG {id: 'handler:bublbobl_state.machine_reset_bublbobl'}) SET n:Handler SET n += {method: 'machine_reset_bublbobl', ownerClass: 'bublbobl_state', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 932, sourceColumn: 1, sourceEndLine: 942, sourceParameters: '', sourceBody: 'bublbobl_bankswitch_w(0x00); // force a bankswitch write of all zeroes, as /RESET clears the latch

	m_port3_in = 0;
	m_port1_out = 0;
	m_port2_out = 0;
	m_port3_out = 0;
	m_port4_out = 0;'};
MERGE (n:KG {id: 'bank:bublbobl_state.bublbobl/bank1'}) SET n:MemoryBank SET n += {tag: 'bank1', member: 'bank1', startEntry: 0, entries: 8, region: 'maincpu', offset: 65536, stride: 16384, raw: 'membank("bank1")->configure_entries(0, 8, &ROM[0x10000], 0x4000)', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 2105, sourceColumn: 1, sourceEndLine: 2109};
MERGE (n:KG {id: 'machine:bublbobl_state.bublbobl/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'set_irq_acknowledge_callback', operation: 'set_irq_acknowledge_callback', raw: 'm_maincpu->set_irq_acknowledge_callback(FUNC(bublbobl_state::mcram_vect_r))', ownerTag: 'maincpu', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 994, sourceColumn: 2, sourceEndLine: 994, targetClass: 'bublbobl_state', targetMethod: 'mcram_vect_r'};
MERGE (n:KG {id: 'handler:bublbobl_state.mcram_vect_r'}) SET n:Handler SET n += {method: 'mcram_vect_r', ownerClass: 'bublbobl_state', sourceFile: 'src/mame/taito/bublbobl_m.cpp', sourceLine: 149, sourceColumn: 1, sourceEndLine: 153, sourceParameters: 'int irqline', sourceBody: 'm_maincpu->set_input_line(INPUT_LINE_IRQ0, CLEAR_LINE);
	return m_mcu_sharedram[0];'};
MERGE (n:KG {id: 'machine:bublbobl_state.bublbobl/callback:screen:0'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set_inputline', raw: 'm_screen->screen_vblank().set_inputline(m_mcu, M6801_IRQ1_LINE)', ownerTag: 'screen', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1004, sourceColumn: 2, sourceEndLine: 1004, inputLine: 'M6801_IRQ1_LINE', targetTag: 'mcu'};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl/mcu'}) SET n:Device SET n += {type: 'M6801U4', tag: 'mcu', clock: 4000000, config: ['auto &mcu(M6801U4(config, "mcu", XTAL(4\'000\'000)))', 'mcu.in_p1_cb().set_ioport("IN0")', 'mcu.out_p1_cb().set(FUNC(bublbobl_state::bublbobl_mcu_port1_w))', 'mcu.out_p2_cb().set(FUNC(bublbobl_state::bublbobl_mcu_port2_w))', 'mcu.out_p3_cb().set(FUNC(bublbobl_state::bublbobl_mcu_port3_w))', 'mcu.in_p3_cb().set(FUNC(bublbobl_state::bublbobl_mcu_port3_r))', 'mcu.out_p4_cb().set(FUNC(bublbobl_state::bublbobl_mcu_port4_w))'], sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 996, sourceColumn: 2, sourceEndLine: 996};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl/mcu/callback:mcu:0'}) SET n:Callback SET n += {signal: 'in_p1_cb', operation: 'set_ioport', raw: 'mcu.in_p1_cb().set_ioport("IN0")', ownerTag: 'mcu', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 997, sourceColumn: 2, sourceEndLine: 997, targetTag: 'IN0', targetPort: 'IN0'};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl/mcu/callback:mcu:1'}) SET n:Callback SET n += {signal: 'out_p1_cb', operation: 'set', raw: 'mcu.out_p1_cb().set(FUNC(bublbobl_state::bublbobl_mcu_port1_w))', ownerTag: 'mcu', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 998, sourceColumn: 2, sourceEndLine: 998, targetClass: 'bublbobl_state', targetMethod: 'bublbobl_mcu_port1_w'};
MERGE (n:KG {id: 'handler:bublbobl_state.bublbobl_mcu_port1_w'}) SET n:Handler SET n += {method: 'bublbobl_mcu_port1_w', ownerClass: 'bublbobl_state', sourceFile: 'src/mame/taito/bublbobl_m.cpp', sourceLine: 162, sourceColumn: 1, sourceEndLine: 181, sourceParameters: 'uint8_t data', sourceBody: '//logerror("%04x: 6801U4 port 1 write %02x\\n", m_mcu->pc(), data);

	// bit 4: coin lockout
	machine().bookkeeping().coin_lockout_global_w(~data & 0x10);

	// bit 5: select 1-way or 2-way coin counter

	// bit 6: trigger IRQ on main CPU (jumper switchable to vblank)
	// trigger on high->low transition
	if ((m_port1_out & 0x40) && (~data & 0x40))
	{
		// logerror("triggering IRQ on main CPU\\n");
		m_maincpu->set_input_line(0, ASSERT_LINE);
	}

	// bit 7: select read or write shared RAM
	m_port1_out = data;'};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl/mcu/callback:mcu:2'}) SET n:Callback SET n += {signal: 'out_p2_cb', operation: 'set', raw: 'mcu.out_p2_cb().set(FUNC(bublbobl_state::bublbobl_mcu_port2_w))', ownerTag: 'mcu', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 999, sourceColumn: 2, sourceEndLine: 999, targetClass: 'bublbobl_state', targetMethod: 'bublbobl_mcu_port2_w'};
MERGE (n:KG {id: 'handler:bublbobl_state.bublbobl_mcu_port2_w'}) SET n:Handler SET n += {method: 'bublbobl_mcu_port2_w', ownerClass: 'bublbobl_state', sourceFile: 'src/mame/taito/bublbobl_m.cpp', sourceLine: 183, sourceColumn: 1, sourceEndLine: 216, sourceConstants: ['M6801_IS3_LINE=2'], sourceParameters: 'uint8_t data', sourceBody: '//logerror("%04x: 6801U4 port 2 write %02x\\n", m_mcu->pc(), data);
	static const char *const portnames[] = { "DSW0", "DSW1", "IN1", "IN2" };

	// bits 0-3: bits 8-11 of shared RAM address

	// bit 4: clock (goes to PAL A78-04.12)
	// latch on low->high transition
	if ((~m_port2_out & 0x10) && (data & 0x10))
	{
		int address = m_port4_out | ((data & 0x0f) << 8);

		if (m_port1_out & 0x80)
		{
			// read
			if ((address & 0x0800) == 0x0000)
				m_port3_in = ioport(portnames[address & 3])->read();
			else if ((address & 0x0c00) == 0x0c00)
				m_port3_in = m_mcu_sharedram[address & 0x03ff];
			// logerror("reading %02x from shared RAM %04x\\n", m_port3_in, address);
			m_mcu->pulse_input_line(M6801_IS3_LINE, attotime::from_usec(1));
		}
		else
		{
			// write
			// logerror("writing %02x to shared RAM %04x\\n", m_port3_out, address);
			if ((address & 0x0c00) == 0x0c00)
				m_mcu_sharedram[address & 0x03ff] = m_port3_out;
		}
	}

	m_port2_out = data;'};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl/mcu/callback:mcu:3'}) SET n:Callback SET n += {signal: 'out_p3_cb', operation: 'set', raw: 'mcu.out_p3_cb().set(FUNC(bublbobl_state::bublbobl_mcu_port3_w))', ownerTag: 'mcu', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1000, sourceColumn: 2, sourceEndLine: 1000, targetClass: 'bublbobl_state', targetMethod: 'bublbobl_mcu_port3_w'};
MERGE (n:KG {id: 'handler:bublbobl_state.bublbobl_mcu_port3_w'}) SET n:Handler SET n += {method: 'bublbobl_mcu_port3_w', ownerClass: 'bublbobl_state', sourceFile: 'src/mame/taito/bublbobl_m.cpp', sourceLine: 224, sourceColumn: 1, sourceEndLine: 228, sourceParameters: 'uint8_t data', sourceBody: '//logerror("%04x: 6801U4 port 3 write %02x\\n", m_mcu->pc(), data);
	m_port3_out = data;'};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl/mcu/callback:mcu:4'}) SET n:Callback SET n += {signal: 'in_p3_cb', operation: 'set', raw: 'mcu.in_p3_cb().set(FUNC(bublbobl_state::bublbobl_mcu_port3_r))', ownerTag: 'mcu', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1001, sourceColumn: 2, sourceEndLine: 1001, targetClass: 'bublbobl_state', targetMethod: 'bublbobl_mcu_port3_r'};
MERGE (n:KG {id: 'handler:bublbobl_state.bublbobl_mcu_port3_r'}) SET n:Handler SET n += {method: 'bublbobl_mcu_port3_r', ownerClass: 'bublbobl_state', sourceFile: 'src/mame/taito/bublbobl_m.cpp', sourceLine: 218, sourceColumn: 1, sourceEndLine: 222, sourceParameters: '', sourceBody: '//logerror("%04x: 6801U4 port 3 read\\n", m_mcu->pc());
	return m_port3_in;'};
MERGE (n:KG {id: 'device:bublbobl_state.bublbobl/mcu/callback:mcu:5'}) SET n:Callback SET n += {signal: 'out_p4_cb', operation: 'set', raw: 'mcu.out_p4_cb().set(FUNC(bublbobl_state::bublbobl_mcu_port4_w))', ownerTag: 'mcu', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1002, sourceColumn: 2, sourceEndLine: 1002, targetClass: 'bublbobl_state', targetMethod: 'bublbobl_mcu_port4_w'};
MERGE (n:KG {id: 'handler:bublbobl_state.bublbobl_mcu_port4_w'}) SET n:Handler SET n += {method: 'bublbobl_mcu_port4_w', ownerClass: 'bublbobl_state', sourceFile: 'src/mame/taito/bublbobl_m.cpp', sourceLine: 230, sourceColumn: 1, sourceEndLine: 236, sourceParameters: 'uint8_t data', sourceBody: '//logerror("%04x: 6801U4 port 4 write %02x\\n", m_mcu->pc(), data);

	// bits 0-7 of shared RAM address
	m_port4_out = data;'};
MERGE (n:KG {id: 'inputs:bublbobl'}) SET n:InputPorts SET n += {name: 'bublbobl', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 434, sourceColumn: 8, sourceEndLine: 434};
MERGE (n:KG {id: 'inputs:bublbobl/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:bublbobl/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_TILT', defaultValue: 1};
MERGE (n:KG {id: 'inputs:bublbobl/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_SERVICE1', defaultValue: 2};
MERGE (n:KG {id: 'inputs:bublbobl/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_COIN1', defaultValue: 0};
MERGE (n:KG {id: 'inputs:bublbobl/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_COIN2', defaultValue: 0};
MERGE (n:KG {id: 'inputs:bublbobl/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_CUSTOM', defaultValue: 16};
MERGE (n:KG {id: 'inputs:bublbobl/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_CUSTOM', defaultValue: 32};
MERGE (n:KG {id: 'inputs:bublbobl/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_CUSTOM', defaultValue: 64};
MERGE (n:KG {id: 'inputs:bublbobl/IN0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_CUSTOM', defaultValue: 128};
MERGE (n:KG {id: 'inputs:bublbobl/DSW0'}) SET n:Port SET n += {tag: 'DSW0', modify: false};
MERGE (n:KG {id: 'inputs:bublbobl/DSW0/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 5, modifiers: ['PORT_DIPLOCATION("DSW-A:1,3")'], name: 'Mode', defaultValue: 4, location: 'DSW-A:1,3', settings: ['4=Game, English', '5=Game, Japanese', '1=Test (Grid and Inputs)', '0=Test (RAM and Sound)/Pause']};
MERGE (n:KG {id: 'inputs:bublbobl/DSW0/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, modifiers: ['PORT_DIPLOCATION("DSW-A:2")'], name: 'Flip Screen', defaultValue: 2, location: 'DSW-A:2', settings: ['2=Off', '0=On']};
MERGE (n:KG {id: 'inputs:bublbobl/DSW0/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 8, modifiers: ['PORT_DIPLOCATION("DSW-A:4")'], name: 'Demo Sounds', defaultValue: 8, location: 'DSW-A:4', settings: ['0=Off', '8=On']};
MERGE (n:KG {id: 'inputs:bublbobl/DSW0/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 48, modifiers: ['PORT_DIPLOCATION("DSW-A:5,6")'], name: 'Coin A', defaultValue: 48, location: 'DSW-A:5,6', settings: ['16=2C 1C', '48=1C 1C', '0=2C 3C', '32=1C 2C']};
MERGE (n:KG {id: 'inputs:bublbobl/DSW0/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 192, modifiers: ['PORT_DIPLOCATION("DSW-A:7,8")'], name: 'Coin B', defaultValue: 192, location: 'DSW-A:7,8', settings: ['64=2C 1C', '192=1C 1C', '0=2C 3C', '128=1C 2C']};
MERGE (n:KG {id: 'inputs:bublbobl/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:bublbobl/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("DSW-B:1,2")'], name: 'Difficulty', defaultValue: 3, location: 'DSW-B:1,2', settings: ['2=Easy', '3=Normal', '1=Hard', '0=Very Hard']};
MERGE (n:KG {id: 'inputs:bublbobl/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 12, modifiers: ['PORT_DIPLOCATION("DSW-B:3,4")'], name: 'Bonus Life', defaultValue: 12, location: 'DSW-B:3,4', settings: ['8=20K 80K 300K', '12=30K 100K 400K', '4=40K 200K 500K', '0=50K 250K 500K']};
MERGE (n:KG {id: 'inputs:bublbobl/DSW1/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 48, modifiers: ['PORT_DIPLOCATION("DSW-B:5,6")'], name: 'Lives', defaultValue: 48, location: 'DSW-B:5,6', settings: ['16=1', '0=2', '48=3', '32=5']};
MERGE (n:KG {id: 'inputs:bublbobl/DSW1/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 64, modifiers: ['PORT_DIPLOCATION("DSW-B:7")'], name: 'Unknown', defaultValue: 64, location: 'DSW-B:7', settings: ['64=Off', '0=On']};
MERGE (n:KG {id: 'inputs:bublbobl/DSW1/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("DSW-B:8")'], name: 'ROM Type', defaultValue: 128, location: 'DSW-B:8', settings: ['128=IC52=512kb, IC53=none', '0=IC52=256kb, IC53=256kb']};
MERGE (n:KG {id: 'inputs:bublbobl/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:bublbobl/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_2WAY'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:bublbobl/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_2WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:bublbobl/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 4};
MERGE (n:KG {id: 'inputs:bublbobl/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 8};
MERGE (n:KG {id: 'inputs:bublbobl/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON2', defaultValue: 16};
MERGE (n:KG {id: 'inputs:bublbobl/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 32};
MERGE (n:KG {id: 'inputs:bublbobl/IN1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_START1', defaultValue: 64};
MERGE (n:KG {id: 'inputs:bublbobl/IN1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:bublbobl/IN2'}) SET n:Port SET n += {tag: 'IN2', modify: false};
MERGE (n:KG {id: 'inputs:bublbobl/IN2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_2WAY', 'PORT_PLAYER(2)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:bublbobl/IN2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_2WAY', 'PORT_PLAYER(2)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:bublbobl/IN2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 4};
MERGE (n:KG {id: 'inputs:bublbobl/IN2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 8};
MERGE (n:KG {id: 'inputs:bublbobl/IN2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(2)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:bublbobl/IN2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(2)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:bublbobl/IN2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_START2', defaultValue: 64};
MERGE (n:KG {id: 'inputs:bublbobl/IN2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'gfxlayout:charlayout'}) SET n:GfxLayout SET n += {name: 'charlayout', width: 8, height: 8, total: 'RGN_FRAC(1,2)', planes: 4, planeOffsets: [0, 4, 'RGN_FRAC(1,2)', 'RGN_FRAC(1,2)+4'], xOffsets: [3, 2, 1, 0, 11, 10, 9, 8], yOffsets: [0, 16, 32, 48, 64, 80, 96, 112], charIncrement: 128};
MERGE (n:KG {id: 'gfxdecode:gfx_bublbobl'}) SET n:GfxDecode SET n += {name: 'gfx_bublbobl', sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 800, sourceColumn: 8, sourceEndLine: 800};
MERGE (n:KG {id: 'gfxdecode:gfx_bublbobl/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'charlayout', colorBase: 0, colorCount: 16, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:bublbobl'}), (b:KG {id: 'file:src/mame/taito/bublbobl.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 2141, sourceColumn: 1, sourceEndLine: 2141};
MATCH (a:KG {id: 'game:bublbobl'}), (b:KG {id: 'machine:bublbobl_state.bublbobl'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:bublbobl'}), (b:KG {id: 'inputs:bublbobl'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:bublbobl'}), (b:KG {id: 'romset:bublbobl'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/taito/bublbobl.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/taito/bublbobl.cpp'}), (b:KG {id: 'file:bublbobl.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/taito/bublbobl.cpp'}), (b:KG {id: 'file:taito68705.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/taito/bublbobl.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/taito/bublbobl.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/taito/bublbobl.cpp'}), (b:KG {id: 'file:sound/ymopn.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/taito/bublbobl.cpp'}), (b:KG {id: 'file:sound/ymopl.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/taito/bublbobl.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/taito/bublbobl.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl'}), (b:KG {id: 'file:src/mame/taito/bublbobl.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 991, sourceColumn: 1, sourceEndLine: 1005};
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl'}), (b:KG {id: 'handler:bublbobl_state.machine_reset_common'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl'}), (b:KG {id: 'handler:bublbobl_state.machine_reset_bublbobl'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl'}), (b:KG {id: 'machine:bublbobl_state.bublbobl_nomcu'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl'}), (b:KG {id: 'bank:bublbobl_state.bublbobl/bank1'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl'}), (b:KG {id: 'machine:bublbobl_state.bublbobl/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl'}), (b:KG {id: 'machine:bublbobl_state.bublbobl/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl'}), (b:KG {id: 'device:bublbobl_state.bublbobl/mcu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:bublbobl'}), (b:KG {id: 'file:src/mame/taito/bublbobl.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 434, sourceColumn: 8, sourceEndLine: 434};
MATCH (a:KG {id: 'inputs:bublbobl'}), (b:KG {id: 'inputs:bublbobl/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:bublbobl'}), (b:KG {id: 'inputs:bublbobl/DSW0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:bublbobl'}), (b:KG {id: 'inputs:bublbobl/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:bublbobl'}), (b:KG {id: 'inputs:bublbobl/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:bublbobl'}), (b:KG {id: 'inputs:bublbobl/IN2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:bublbobl'}), (b:KG {id: 'file:src/mame/taito/bublbobl.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 1318, sourceColumn: 1, sourceEndLine: 1318};
MATCH (a:KG {id: 'romset:bublbobl'}), (b:KG {id: 'region:bublbobl/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:bublbobl'}), (b:KG {id: 'region:bublbobl/subcpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:bublbobl'}), (b:KG {id: 'region:bublbobl/audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:bublbobl'}), (b:KG {id: 'region:bublbobl/mcu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:bublbobl'}), (b:KG {id: 'region:bublbobl/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:bublbobl'}), (b:KG {id: 'region:bublbobl/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:bublbobl'}), (b:KG {id: 'region:bublbobl/plds'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:bublbobl_state.machine_reset_common'}), (b:KG {id: 'handler:bublbobl_state.common_sreset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:bublbobl_state.machine_reset_bublbobl'}), (b:KG {id: 'handler:bublbobl_state.bublbobl_bankswitch_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl_nomcu'}), (b:KG {id: 'file:src/mame/taito/bublbobl.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 944, sourceColumn: 1, sourceEndLine: 989};
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl_nomcu'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl_nomcu'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/subcpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl_nomcu'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/audiocpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl_nomcu'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl_nomcu'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl_nomcu'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl_nomcu'}), (b:KG {id: 'gfxdecode:gfx_bublbobl'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl_nomcu'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl_nomcu'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl_nomcu'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/soundirq'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl_nomcu'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/soundnmi'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl_nomcu'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/main_to_sound'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl_nomcu'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/sound_to_main'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl_nomcu'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/ym2203'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl_nomcu'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/ym3526'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'bank:bublbobl_state.bublbobl/bank1'}), (b:KG {id: 'file:src/mame/taito/bublbobl.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 2105, sourceColumn: 1, sourceEndLine: 2109};
MATCH (a:KG {id: 'machine:bublbobl_state.bublbobl/callback:maincpu:0'}), (b:KG {id: 'handler:bublbobl_state.mcram_vect_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl/mcu'}), (b:KG {id: 'device:bublbobl_state.bublbobl/mcu/callback:mcu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl/mcu'}), (b:KG {id: 'device:bublbobl_state.bublbobl/mcu/callback:mcu:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl/mcu'}), (b:KG {id: 'device:bublbobl_state.bublbobl/mcu/callback:mcu:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl/mcu'}), (b:KG {id: 'device:bublbobl_state.bublbobl/mcu/callback:mcu:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl/mcu'}), (b:KG {id: 'device:bublbobl_state.bublbobl/mcu/callback:mcu:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl/mcu'}), (b:KG {id: 'device:bublbobl_state.bublbobl/mcu/callback:mcu:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/IN0'}), (b:KG {id: 'inputs:bublbobl/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/IN0'}), (b:KG {id: 'inputs:bublbobl/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/IN0'}), (b:KG {id: 'inputs:bublbobl/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/IN0'}), (b:KG {id: 'inputs:bublbobl/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/IN0'}), (b:KG {id: 'inputs:bublbobl/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/IN0'}), (b:KG {id: 'inputs:bublbobl/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/IN0'}), (b:KG {id: 'inputs:bublbobl/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/IN0'}), (b:KG {id: 'inputs:bublbobl/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/DSW0'}), (b:KG {id: 'inputs:bublbobl/DSW0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/DSW0'}), (b:KG {id: 'inputs:bublbobl/DSW0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/DSW0'}), (b:KG {id: 'inputs:bublbobl/DSW0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/DSW0'}), (b:KG {id: 'inputs:bublbobl/DSW0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/DSW0'}), (b:KG {id: 'inputs:bublbobl/DSW0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/DSW1'}), (b:KG {id: 'inputs:bublbobl/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/DSW1'}), (b:KG {id: 'inputs:bublbobl/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/DSW1'}), (b:KG {id: 'inputs:bublbobl/DSW1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/DSW1'}), (b:KG {id: 'inputs:bublbobl/DSW1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/DSW1'}), (b:KG {id: 'inputs:bublbobl/DSW1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/IN1'}), (b:KG {id: 'inputs:bublbobl/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/IN1'}), (b:KG {id: 'inputs:bublbobl/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/IN1'}), (b:KG {id: 'inputs:bublbobl/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/IN1'}), (b:KG {id: 'inputs:bublbobl/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/IN1'}), (b:KG {id: 'inputs:bublbobl/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/IN1'}), (b:KG {id: 'inputs:bublbobl/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/IN1'}), (b:KG {id: 'inputs:bublbobl/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/IN1'}), (b:KG {id: 'inputs:bublbobl/IN1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/IN2'}), (b:KG {id: 'inputs:bublbobl/IN2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/IN2'}), (b:KG {id: 'inputs:bublbobl/IN2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/IN2'}), (b:KG {id: 'inputs:bublbobl/IN2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/IN2'}), (b:KG {id: 'inputs:bublbobl/IN2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/IN2'}), (b:KG {id: 'inputs:bublbobl/IN2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/IN2'}), (b:KG {id: 'inputs:bublbobl/IN2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/IN2'}), (b:KG {id: 'inputs:bublbobl/IN2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bublbobl/IN2'}), (b:KG {id: 'inputs:bublbobl/IN2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:bublbobl/maincpu'}), (b:KG {id: 'rom:bublbobl/maincpu/a78-06-1.51'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bublbobl/maincpu'}), (b:KG {id: 'rom:bublbobl/maincpu/a78-05-1.52'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bublbobl/subcpu'}), (b:KG {id: 'rom:bublbobl/subcpu/a78-08.37'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bublbobl/audiocpu'}), (b:KG {id: 'rom:bublbobl/audiocpu/a78-07.46'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bublbobl/mcu'}), (b:KG {id: 'rom:bublbobl/mcu/a78-01.17'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bublbobl/gfx1'}), (b:KG {id: 'rom:bublbobl/gfx1/a78-09.12'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bublbobl/gfx1'}), (b:KG {id: 'rom:bublbobl/gfx1/a78-10.13'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bublbobl/gfx1'}), (b:KG {id: 'rom:bublbobl/gfx1/a78-11.14'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bublbobl/gfx1'}), (b:KG {id: 'rom:bublbobl/gfx1/a78-12.15'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bublbobl/gfx1'}), (b:KG {id: 'rom:bublbobl/gfx1/a78-13.16'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bublbobl/gfx1'}), (b:KG {id: 'rom:bublbobl/gfx1/a78-14.17'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bublbobl/gfx1'}), (b:KG {id: 'rom:bublbobl/gfx1/a78-15.30'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bublbobl/gfx1'}), (b:KG {id: 'rom:bublbobl/gfx1/a78-16.31'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bublbobl/gfx1'}), (b:KG {id: 'rom:bublbobl/gfx1/a78-17.32'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bublbobl/gfx1'}), (b:KG {id: 'rom:bublbobl/gfx1/a78-18.33'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bublbobl/gfx1'}), (b:KG {id: 'rom:bublbobl/gfx1/a78-19.34'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bublbobl/gfx1'}), (b:KG {id: 'rom:bublbobl/gfx1/a78-20.35'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bublbobl/proms'}), (b:KG {id: 'rom:bublbobl/proms/a71-25.41'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bublbobl/plds'}), (b:KG {id: 'rom:bublbobl/plds/pal16l8.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bublbobl/plds'}), (b:KG {id: 'rom:bublbobl/plds/pal16r4.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl_nomcu/maincpu'}), (b:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl_nomcu/subcpu'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/subcpu/callback:subcpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl_nomcu/subcpu'}), (b:KG {id: 'map:bublbobl_state.subcpu_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl_nomcu/audiocpu'}), (b:KG {id: 'map:bublbobl_state.sound_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl_nomcu/screen'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_bublbobl'}), (b:KG {id: 'file:src/mame/taito/bublbobl.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 800, sourceColumn: 8, sourceEndLine: 800};
MATCH (a:KG {id: 'gfxdecode:gfx_bublbobl'}), (b:KG {id: 'gfxdecode:gfx_bublbobl/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl_nomcu/soundirq'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/soundirq/callback:soundirq:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl_nomcu/soundnmi'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/soundnmi/callback:soundnmi:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl_nomcu/main_to_sound'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/main_to_sound/callback:main_to_sound:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl_nomcu/ym2203'}), (b:KG {id: 'audioroute:device:bublbobl_state.bublbobl_nomcu/ym2203/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl_nomcu/ym2203'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/ym2203/callback:ym2203:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl_nomcu/ym3526'}), (b:KG {id: 'audioroute:device:bublbobl_state.bublbobl_nomcu/ym3526/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl_nomcu/ym3526'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/ym3526/callback:ym3526:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl/mcu/callback:mcu:1'}), (b:KG {id: 'handler:bublbobl_state.bublbobl_mcu_port1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl/mcu/callback:mcu:2'}), (b:KG {id: 'handler:bublbobl_state.bublbobl_mcu_port2_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl/mcu/callback:mcu:3'}), (b:KG {id: 'handler:bublbobl_state.bublbobl_mcu_port3_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl/mcu/callback:mcu:4'}), (b:KG {id: 'handler:bublbobl_state.bublbobl_mcu_port3_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl/mcu/callback:mcu:5'}), (b:KG {id: 'handler:bublbobl_state.bublbobl_mcu_port4_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map'}), (b:KG {id: 'file:src/mame/taito/bublbobl.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 302, sourceColumn: 1, sourceEndLine: 312};
MATCH (a:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map'}), (b:KG {id: 'map:bublbobl_state.common_maincpu_map'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map'}), (b:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map'}), (b:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map'}), (b:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map'}), (b:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map'}), (b:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map'}), (b:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map'}), (b:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl_nomcu/subcpu/callback:subcpu:0'}), (b:KG {id: 'handler:bublbobl_state.irq0_line_hold'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.subcpu_map'}), (b:KG {id: 'file:src/mame/taito/bublbobl.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 314, sourceColumn: 1, sourceEndLine: 318};
MATCH (a:KG {id: 'map:bublbobl_state.subcpu_map'}), (b:KG {id: 'map:bublbobl_state.subcpu_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.subcpu_map'}), (b:KG {id: 'map:bublbobl_state.subcpu_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.sound_map'}), (b:KG {id: 'file:src/mame/taito/bublbobl.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 346, sourceColumn: 1, sourceEndLine: 356};
MATCH (a:KG {id: 'map:bublbobl_state.sound_map'}), (b:KG {id: 'map:bublbobl_state.sound_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.sound_map'}), (b:KG {id: 'map:bublbobl_state.sound_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.sound_map'}), (b:KG {id: 'map:bublbobl_state.sound_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.sound_map'}), (b:KG {id: 'map:bublbobl_state.sound_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.sound_map'}), (b:KG {id: 'map:bublbobl_state.sound_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.sound_map'}), (b:KG {id: 'map:bublbobl_state.sound_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.sound_map'}), (b:KG {id: 'map:bublbobl_state.sound_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.sound_map'}), (b:KG {id: 'map:bublbobl_state.sound_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl_nomcu/screen/callback:screen:0'}), (b:KG {id: 'handler:bublbobl_state.screen_update_bublbobl'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_bublbobl/e0'}), (b:KG {id: 'gfxlayout:charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl_nomcu/soundirq/callback:soundirq:0'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/audiocpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl_nomcu/soundnmi/callback:soundnmi:0'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/audiocpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl_nomcu/main_to_sound/callback:main_to_sound:0'}), (b:KG {id: 'handler:input_merger_device.in_w_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl_nomcu/main_to_sound/callback:main_to_sound:0'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/soundnmi'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl_nomcu/ym2203/callback:ym2203:0'}), (b:KG {id: 'handler:input_merger_device.in_w_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl_nomcu/ym2203/callback:ym2203:0'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/soundirq'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl_nomcu/ym3526/callback:ym3526:0'}), (b:KG {id: 'handler:input_merger_device.in_w_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:bublbobl_state.bublbobl_nomcu/ym3526/callback:ym3526:0'}), (b:KG {id: 'device:bublbobl_state.bublbobl_nomcu/soundirq'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.common_maincpu_map'}), (b:KG {id: 'file:src/mame/taito/bublbobl.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/bublbobl.cpp', sourceLine: 292, sourceColumn: 1, sourceEndLine: 300};
MATCH (a:KG {id: 'map:bublbobl_state.common_maincpu_map'}), (b:KG {id: 'map:bublbobl_state.common_maincpu_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.common_maincpu_map'}), (b:KG {id: 'map:bublbobl_state.common_maincpu_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.common_maincpu_map'}), (b:KG {id: 'map:bublbobl_state.common_maincpu_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.common_maincpu_map'}), (b:KG {id: 'map:bublbobl_state.common_maincpu_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.common_maincpu_map'}), (b:KG {id: 'map:bublbobl_state.common_maincpu_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.common_maincpu_map'}), (b:KG {id: 'map:bublbobl_state.common_maincpu_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map/range0'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'sound_to_main'};
MATCH (a:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map/range0'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'main_to_sound'};
MATCH (a:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map/range1'}), (b:KG {id: 'handler:bublbobl_state.common_sound_semaphores_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map/range2'}), (b:KG {id: 'handler:bublbobl_state.bublbobl_soundcpu_reset_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map/range3'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map/range4'}), (b:KG {id: 'handler:bublbobl_state.bublbobl_nmitrigger_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.bublbobl_maincpu_map/range5'}), (b:KG {id: 'handler:bublbobl_state.bublbobl_bankswitch_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.sound_map/range2'}), (b:KG {id: 'handler:ym2203_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ym2203'};
MATCH (a:KG {id: 'map:bublbobl_state.sound_map/range2'}), (b:KG {id: 'handler:ym2203_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ym2203'};
MATCH (a:KG {id: 'map:bublbobl_state.sound_map/range3'}), (b:KG {id: 'handler:ym3526_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ym3526'};
MATCH (a:KG {id: 'map:bublbobl_state.sound_map/range3'}), (b:KG {id: 'handler:ym3526_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ym3526'};
MATCH (a:KG {id: 'map:bublbobl_state.sound_map/range4'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'main_to_sound'};
MATCH (a:KG {id: 'map:bublbobl_state.sound_map/range4'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'sound_to_main'};
MATCH (a:KG {id: 'map:bublbobl_state.sound_map/range5'}), (b:KG {id: 'handler:bublbobl_state.common_sound_semaphores_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.sound_map/range5'}), (b:KG {id: 'handler:input_merger_device.in_set_0'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundnmi'};
MATCH (a:KG {id: 'map:bublbobl_state.sound_map/range6'}), (b:KG {id: 'handler:input_merger_device.in_clear_0'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundnmi'};
MATCH (a:KG {id: 'gfxlayout:charlayout'}), (b:KG {id: 'file:src/mame/taito/bublbobl.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'map:bublbobl_state.common_maincpu_map/range5'}), (b:KG {id: 'handler:palette_device.write8'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'palette'};
MATCH (a:KG {id: 'handler:bublbobl_state.bublbobl_soundcpu_reset_w'}), (b:KG {id: 'handler:bublbobl_state.common_sreset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
