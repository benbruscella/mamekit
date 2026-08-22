// mamekit knowledge graph — driver src/mame/capcom/1942.cpp
// generated 2026-08-22T05:52:09.509Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/capcom/1942.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/capcom/1942.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:1942.h'}) SET n:SourceFile SET n += {path: '1942.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:sound/ay8910.h'}) SET n:SourceFile SET n += {path: 'sound/ay8910.h', external: true};
MERGE (n:KG {id: 'file:machine/netlist.h'}) SET n:SourceFile SET n += {path: 'machine/netlist.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:nl_1942.h'}) SET n:SourceFile SET n += {path: 'nl_1942.h', external: true};
MERGE (n:KG {id: 'game:1942'}) SET n:Game SET n += {name: '1942', year: '1984', company: 'Capcom', fullname: '1942 (Revision B)', monitor: 'ROT270', cls: '_1942_state', init: 'driver_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 1033, sourceColumn: 1, sourceEndLine: 1033};
MERGE (n:KG {id: 'romset:1942'}) SET n:RomSet SET n += {name: '1942', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 691, sourceColumn: 1, sourceEndLine: 691};
MERGE (n:KG {id: 'region:1942/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 131072, flags: 'ROMREGION_ERASEFF', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 692, sourceColumn: 2, sourceEndLine: 692};
MERGE (n:KG {id: 'rom:1942/maincpu/srb-03.m3'}) SET n:Rom SET n += {file: 'srb-03.m3', offset: 0, size: 16384, crc: 'd9dafcc3', sha1: 'a089a9bc55fb7d6d0ac53f91b258396d5d62677a', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 693, sourceColumn: 2, sourceEndLine: 693};
MERGE (n:KG {id: 'rom:1942/maincpu/srb-04.m4'}) SET n:Rom SET n += {file: 'srb-04.m4', offset: 16384, size: 16384, crc: 'da0cf924', sha1: '856fbb302c9a4ec7850a26ab23dab8467f79bba4', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 694, sourceColumn: 2, sourceEndLine: 694};
MERGE (n:KG {id: 'rom:1942/maincpu/srb-05.m5'}) SET n:Rom SET n += {file: 'srb-05.m5', offset: 65536, size: 16384, crc: 'd102911c', sha1: '35ba1d82bd901940f61d8619273463d02fc0a952', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 695, sourceColumn: 2, sourceEndLine: 695};
MERGE (n:KG {id: 'rom:1942/maincpu/srb-06.m6'}) SET n:Rom SET n += {file: 'srb-06.m6', offset: 81920, size: 8192, crc: '466f8248', sha1: '2ccc8fc59962d3001fbc10e8d2f20a254a74f251', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 696, sourceColumn: 2, sourceEndLine: 696};
MERGE (n:KG {id: 'rom:1942/maincpu/srb-07.m7'}) SET n:Rom SET n += {file: 'srb-07.m7', offset: 98304, size: 16384, crc: '0d31038c', sha1: 'b588eaf6fddd66ecb2d9832dc197f286f1ccd846', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 697, sourceColumn: 2, sourceEndLine: 697};
MERGE (n:KG {id: 'region:1942/audiocpu'}) SET n:RomRegion SET n += {tag: 'audiocpu', size: 65536, flags: '0', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 699, sourceColumn: 2, sourceEndLine: 699};
MERGE (n:KG {id: 'rom:1942/audiocpu/sr-01.c11'}) SET n:Rom SET n += {file: 'sr-01.c11', offset: 0, size: 16384, crc: 'bd87f06b', sha1: '821f85cf157f81117eeaba0c3cf0337eac357e58', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 700, sourceColumn: 2, sourceEndLine: 700};
MERGE (n:KG {id: 'region:1942/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 8192, flags: '0', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 702, sourceColumn: 2, sourceEndLine: 702};
MERGE (n:KG {id: 'rom:1942/gfx1/sr-02.f2'}) SET n:Rom SET n += {file: 'sr-02.f2', offset: 0, size: 8192, crc: '6ebca191', sha1: '0dbddadde54a0ab66994c4a8726be05c6ca88a0e', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 703, sourceColumn: 2, sourceEndLine: 703};
MERGE (n:KG {id: 'region:1942/gfx2'}) SET n:RomRegion SET n += {tag: 'gfx2', size: 49152, flags: '0', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 705, sourceColumn: 2, sourceEndLine: 705};
MERGE (n:KG {id: 'rom:1942/gfx2/sr-08.a1'}) SET n:Rom SET n += {file: 'sr-08.a1', offset: 0, size: 8192, crc: '3884d9eb', sha1: '5cbd9215fa5ba5a61208b383700adc4428521aed', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 706, sourceColumn: 2, sourceEndLine: 706};
MERGE (n:KG {id: 'rom:1942/gfx2/sr-09.a2'}) SET n:Rom SET n += {file: 'sr-09.a2', offset: 8192, size: 8192, crc: '999cf6e0', sha1: '5b8b685038ec98b781908b92eb7fb9506db68544', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 707, sourceColumn: 2, sourceEndLine: 707};
MERGE (n:KG {id: 'rom:1942/gfx2/sr-10.a3'}) SET n:Rom SET n += {file: 'sr-10.a3', offset: 16384, size: 8192, crc: '8edb273a', sha1: '85fdd4c690ed31e6396e3c16aa02140ee7ea2d61', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 708, sourceColumn: 2, sourceEndLine: 708};
MERGE (n:KG {id: 'rom:1942/gfx2/sr-11.a4'}) SET n:Rom SET n += {file: 'sr-11.a4', offset: 24576, size: 8192, crc: '3a2726c3', sha1: '187c92ef591febdcbd1d42ab850e0cbb62c00873', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 709, sourceColumn: 2, sourceEndLine: 709};
MERGE (n:KG {id: 'rom:1942/gfx2/sr-12.a5'}) SET n:Rom SET n += {file: 'sr-12.a5', offset: 32768, size: 8192, crc: '1bd3d8bb', sha1: 'ef4dce605eb4dc8035985a415315ec61c21419c6', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 710, sourceColumn: 2, sourceEndLine: 710};
MERGE (n:KG {id: 'rom:1942/gfx2/sr-13.a6'}) SET n:Rom SET n += {file: 'sr-13.a6', offset: 40960, size: 8192, crc: '658f02c4', sha1: 'f087d69e49e38cf3107350cde18fcf85a8fa04f0', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 711, sourceColumn: 2, sourceEndLine: 711};
MERGE (n:KG {id: 'region:1942/gfx3'}) SET n:RomRegion SET n += {tag: 'gfx3', size: 65536, flags: '0', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 713, sourceColumn: 2, sourceEndLine: 713};
MERGE (n:KG {id: 'rom:1942/gfx3/sr-14.l1'}) SET n:Rom SET n += {file: 'sr-14.l1', offset: 0, size: 16384, crc: '2528bec6', sha1: '29f7719f18faad6bd1ec6735cc24e69168361470', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 714, sourceColumn: 2, sourceEndLine: 714};
MERGE (n:KG {id: 'rom:1942/gfx3/sr-15.l2'}) SET n:Rom SET n += {file: 'sr-15.l2', offset: 16384, size: 16384, crc: 'f89287aa', sha1: '136fff6d2a4f48a488fc7c620213761459c3ada0', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 715, sourceColumn: 2, sourceEndLine: 715};
MERGE (n:KG {id: 'rom:1942/gfx3/sr-16.n1'}) SET n:Rom SET n += {file: 'sr-16.n1', offset: 32768, size: 16384, crc: '024418f8', sha1: '145b8d5d6c8654cd090955a98f6dd8c8dbafe7c1', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 716, sourceColumn: 2, sourceEndLine: 716};
MERGE (n:KG {id: 'rom:1942/gfx3/sr-17.n2'}) SET n:Rom SET n += {file: 'sr-17.n2', offset: 49152, size: 16384, crc: 'e2c7e489', sha1: 'd4b5d575c021f58f6966df189df94e08c5b3621c', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 717, sourceColumn: 2, sourceEndLine: 717};
MERGE (n:KG {id: 'region:1942/palproms'}) SET n:RomRegion SET n += {tag: 'palproms', size: 768, flags: '0', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 719, sourceColumn: 2, sourceEndLine: 719};
MERGE (n:KG {id: 'rom:1942/palproms/sb-5.e8'}) SET n:Rom SET n += {file: 'sb-5.e8', offset: 0, size: 256, crc: '93ab8153', sha1: 'a792f24e5c0c3c4a6b436102e7a98199f878ece1', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 720, sourceColumn: 2, sourceEndLine: 720};
MERGE (n:KG {id: 'rom:1942/palproms/sb-6.e9'}) SET n:Rom SET n += {file: 'sb-6.e9', offset: 256, size: 256, crc: '8ab44f7d', sha1: 'f74680a6a987d74b3acb32e6396f20e127874149', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 721, sourceColumn: 2, sourceEndLine: 721};
MERGE (n:KG {id: 'rom:1942/palproms/sb-7.e10'}) SET n:Rom SET n += {file: 'sb-7.e10', offset: 512, size: 256, crc: 'f4ade9a4', sha1: '62ad31d31d183cce213b03168daa035083b2f28e', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 722, sourceColumn: 2, sourceEndLine: 722};
MERGE (n:KG {id: 'region:1942/charprom'}) SET n:RomRegion SET n += {tag: 'charprom', size: 256, flags: '0', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 724, sourceColumn: 2, sourceEndLine: 724};
MERGE (n:KG {id: 'rom:1942/charprom/sb-0.f1'}) SET n:Rom SET n += {file: 'sb-0.f1', offset: 0, size: 256, crc: '6047d91b', sha1: '1ce025f9524c1033e48c5294ee7d360f8bfebe8d', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 725, sourceColumn: 2, sourceEndLine: 725};
MERGE (n:KG {id: 'region:1942/tileprom'}) SET n:RomRegion SET n += {tag: 'tileprom', size: 256, flags: '0', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 727, sourceColumn: 2, sourceEndLine: 727};
MERGE (n:KG {id: 'rom:1942/tileprom/sb-4.d6'}) SET n:Rom SET n += {file: 'sb-4.d6', offset: 0, size: 256, crc: '4858968d', sha1: '20b5dbcaa1a4081b3139e7e2332d8fe3c9e55ed6', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 728, sourceColumn: 2, sourceEndLine: 728};
MERGE (n:KG {id: 'region:1942/sprprom'}) SET n:RomRegion SET n += {tag: 'sprprom', size: 256, flags: '0', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 730, sourceColumn: 2, sourceEndLine: 730};
MERGE (n:KG {id: 'rom:1942/sprprom/sb-8.k3'}) SET n:Rom SET n += {file: 'sb-8.k3', offset: 0, size: 256, crc: 'f6fad943', sha1: 'b0a24ea7805272e8ebf72a99b08907bc00d5f82f', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 731, sourceColumn: 2, sourceEndLine: 731};
MERGE (n:KG {id: 'region:1942/irqprom'}) SET n:RomRegion SET n += {tag: 'irqprom', size: 256, flags: '0', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 733, sourceColumn: 2, sourceEndLine: 733};
MERGE (n:KG {id: 'rom:1942/irqprom/sb-1.k6'}) SET n:Rom SET n += {file: 'sb-1.k6', offset: 0, size: 256, crc: '712ac508', sha1: '5349d722ab6733afdda65f6e0a98322f0d515e86', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 734, sourceColumn: 2, sourceEndLine: 734};
MERGE (n:KG {id: 'region:1942/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 768, flags: '0', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 736, sourceColumn: 2, sourceEndLine: 736};
MERGE (n:KG {id: 'rom:1942/proms/sb-2.d1'}) SET n:Rom SET n += {file: 'sb-2.d1', offset: 0, size: 256, crc: '8bb8b3df', sha1: '49de2819c4c92057fedcb20425282515d85829aa', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 737, sourceColumn: 2, sourceEndLine: 737};
MERGE (n:KG {id: 'rom:1942/proms/sb-3.d2'}) SET n:Rom SET n += {file: 'sb-3.d2', offset: 256, size: 256, crc: '3b0c99af', sha1: '38f30ac1e48632634e409f328ee3051b987de7ad', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 738, sourceColumn: 2, sourceEndLine: 738};
MERGE (n:KG {id: 'rom:1942/proms/sb-9.m11'}) SET n:Rom SET n += {file: 'sb-9.m11', offset: 512, size: 256, crc: '4921635c', sha1: 'aee37d6cdc36acf0f11ff5f93e7b16e4b12f6c39', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 739, sourceColumn: 2, sourceEndLine: 739};
MERGE (n:KG {id: 'map:_1942_state._1942_map'}) SET n:AddressMap SET n += {cls: '_1942_state', name: '_1942_map', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 217, sourceColumn: 1, sourceEndLine: 237, unmapHigh: true};
MERGE (n:KG {id: 'map:_1942_state._1942_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom()', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 220, sourceColumn: 2, sourceEndLine: 220, rom: true};
MERGE (n:KG {id: 'map:_1942_state._1942_map/range1'}) SET n:AddressRange SET n += {start: 32768, end: 49151, raw: 'map(0x8000, 0xbfff).bankr("bank1")', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 221, sourceColumn: 2, sourceEndLine: 221, bankRead: 'bank1'};
MERGE (n:KG {id: 'map:_1942_state._1942_map/range2'}) SET n:AddressRange SET n += {start: 49152, end: 49152, raw: 'map(0xc000, 0xc000).portr("SYSTEM")', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 222, sourceColumn: 2, sourceEndLine: 222, portRead: 'SYSTEM'};
MERGE (n:KG {id: 'map:_1942_state._1942_map/range3'}) SET n:AddressRange SET n += {start: 49153, end: 49153, raw: 'map(0xc001, 0xc001).portr("P1")', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 223, sourceColumn: 2, sourceEndLine: 223, portRead: 'P1'};
MERGE (n:KG {id: 'map:_1942_state._1942_map/range4'}) SET n:AddressRange SET n += {start: 49154, end: 49154, raw: 'map(0xc002, 0xc002).portr("P2")', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 224, sourceColumn: 2, sourceEndLine: 224, portRead: 'P2'};
MERGE (n:KG {id: 'map:_1942_state._1942_map/range5'}) SET n:AddressRange SET n += {start: 49155, end: 49155, raw: 'map(0xc003, 0xc003).portr("DSWA")', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 225, sourceColumn: 2, sourceEndLine: 225, portRead: 'DSWA'};
MERGE (n:KG {id: 'map:_1942_state._1942_map/range6'}) SET n:AddressRange SET n += {start: 49156, end: 49156, raw: 'map(0xc004, 0xc004).portr("DSWB")', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 226, sourceColumn: 2, sourceEndLine: 226, portRead: 'DSWB'};
MERGE (n:KG {id: 'map:_1942_state._1942_map/range7'}) SET n:AddressRange SET n += {start: 51200, end: 51200, raw: 'map(0xc800, 0xc800).w(m_soundlatch[0], FUNC(generic_latch_8_device::write))', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 227, sourceColumn: 2, sourceEndLine: 227};
MERGE (n:KG {id: 'handler:generic_latch_8_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 269, sourceColumn: 2, sourceEndLine: 269};
MERGE (n:KG {id: 'map:_1942_state._1942_map/range8'}) SET n:AddressRange SET n += {start: 51201, end: 51201, raw: 'map(0xc801, 0xc801).w(m_soundlatch[1], FUNC(generic_latch_8_device::write))', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 228, sourceColumn: 2, sourceEndLine: 228};
MERGE (n:KG {id: 'map:_1942_state._1942_map/range9'}) SET n:AddressRange SET n += {start: 51202, end: 51203, raw: 'map(0xc802, 0xc803).w(FUNC(_1942_state::scroll_w))', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 229, sourceColumn: 2, sourceEndLine: 229};
MERGE (n:KG {id: 'handler:_1942_state.scroll_w'}) SET n:Handler SET n += {method: 'scroll_w', ownerClass: '_1942_state', sourceFile: 'src/mame/capcom/1942_v.cpp', sourceLine: 177, sourceColumn: 1, sourceEndLine: 181, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_scroll[offset] = data;
	m_bg_tilemap->set_scrollx(0, m_scroll[0] | (m_scroll[1] << 8));'};
MERGE (n:KG {id: 'map:_1942_state._1942_map/range10'}) SET n:AddressRange SET n += {start: 51204, end: 51204, raw: 'map(0xc804, 0xc804).w(FUNC(_1942_state::control_w))', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 230, sourceColumn: 2, sourceEndLine: 230};
MERGE (n:KG {id: 'handler:_1942_state.control_w'}) SET n:Handler SET n += {method: 'control_w', ownerClass: '_1942_state', sourceFile: 'src/mame/capcom/1942_v.cpp', sourceLine: 184, sourceColumn: 1, sourceEndLine: 195, sourceParameters: 'uint8_t data', sourceBody: '/* bit 7: flip screen
	   bit 4: cpu B reset
	   bit 0: coin counter */

	machine().bookkeeping().coin_counter_w(0,data & 0x01);

	m_audiocpu->set_input_line(INPUT_LINE_RESET, (data & 0x10) ? ASSERT_LINE : CLEAR_LINE);

	flip_screen_set(data & 0x80);'};
MERGE (n:KG {id: 'map:_1942_state._1942_map/range11'}) SET n:AddressRange SET n += {start: 51205, end: 51205, raw: 'map(0xc805, 0xc805).w(FUNC(_1942_state::palette_bank_w))', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 231, sourceColumn: 2, sourceEndLine: 231};
MERGE (n:KG {id: 'handler:_1942_state.palette_bank_w'}) SET n:Handler SET n += {method: 'palette_bank_w', ownerClass: '_1942_state', sourceFile: 'src/mame/capcom/1942_v.cpp', sourceLine: 168, sourceColumn: 1, sourceEndLine: 175, sourceParameters: 'uint8_t data', sourceBody: 'if (m_palette_bank != data)
	{
		m_palette_bank = data & 3;
		m_bg_tilemap->mark_all_dirty();
	}'};
MERGE (n:KG {id: 'map:_1942_state._1942_map/range12'}) SET n:AddressRange SET n += {start: 51206, end: 51206, raw: 'map(0xc806, 0xc806).w(FUNC(_1942_state::bankswitch_w))', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 232, sourceColumn: 2, sourceEndLine: 232};
MERGE (n:KG {id: 'handler:_1942_state.bankswitch_w'}) SET n:Handler SET n += {method: 'bankswitch_w', ownerClass: '_1942_state', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 195, sourceColumn: 1, sourceEndLine: 198, sourceParameters: 'uint8_t data', sourceBody: 'membank("bank1")->set_entry(data & 0x03);'};
MERGE (n:KG {id: 'map:_1942_state._1942_map/range13'}) SET n:AddressRange SET n += {start: 52224, end: 52351, raw: 'map(0xcc00, 0xcc7f).writeonly().share("spriteram")', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 233, sourceColumn: 2, sourceEndLine: 233, writeonly: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:_1942_state._1942_map/range14'}) SET n:AddressRange SET n += {start: 53248, end: 55295, raw: 'map(0xd000, 0xd7ff).ram().w(FUNC(_1942_state::fgvideoram_w)).share("fg_videoram")', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 234, sourceColumn: 2, sourceEndLine: 234, ram: true, share: 'fg_videoram'};
MERGE (n:KG {id: 'handler:_1942_state.fgvideoram_w'}) SET n:Handler SET n += {method: 'fgvideoram_w', ownerClass: '_1942_state', sourceFile: 'src/mame/capcom/1942_v.cpp', sourceLine: 155, sourceColumn: 1, sourceEndLine: 159, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_fg_videoram[offset] = data;
	m_fg_tilemap->mark_tile_dirty(offset & 0x3ff);'};
MERGE (n:KG {id: 'map:_1942_state._1942_map/range15'}) SET n:AddressRange SET n += {start: 55296, end: 56319, raw: 'map(0xd800, 0xdbff).ram().w(FUNC(_1942_state::bgvideoram_w)).share("bg_videoram")', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 235, sourceColumn: 2, sourceEndLine: 235, ram: true, share: 'bg_videoram'};
MERGE (n:KG {id: 'handler:_1942_state.bgvideoram_w'}) SET n:Handler SET n += {method: 'bgvideoram_w', ownerClass: '_1942_state', sourceFile: 'src/mame/capcom/1942_v.cpp', sourceLine: 161, sourceColumn: 1, sourceEndLine: 165, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_bg_videoram[offset] = data;
	m_bg_tilemap->mark_tile_dirty((offset & 0x0f) | ((offset >> 1) & 0x01f0));'};
MERGE (n:KG {id: 'map:_1942_state._1942_map/range16'}) SET n:AddressRange SET n += {start: 57344, end: 61439, raw: 'map(0xe000, 0xefff).ram()', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 236, sourceColumn: 2, sourceEndLine: 236, ram: true};
MERGE (n:KG {id: 'handler:generic_latch_8_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 302, sourceColumn: 2, sourceEndLine: 302};
MERGE (n:KG {id: 'handler:ay8910_device.address_data_w'}) SET n:Handler SET n += {method: 'address_data_w', ownerClass: 'ay8910_device', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 304, sourceColumn: 2, sourceEndLine: 304};
MERGE (n:KG {id: 'map:_1942_state.sound_map'}) SET n:AddressMap SET n += {cls: '_1942_state', name: 'sound_map', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 297, sourceColumn: 1, sourceEndLine: 305};
MERGE (n:KG {id: 'map:_1942_state.sound_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 16383, raw: 'map(0x0000, 0x3fff).rom()', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 299, sourceColumn: 2, sourceEndLine: 299, rom: true};
MERGE (n:KG {id: 'map:_1942_state.sound_map/range1'}) SET n:AddressRange SET n += {start: 16384, end: 18431, raw: 'map(0x4000, 0x47ff).ram()', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 300, sourceColumn: 2, sourceEndLine: 300, ram: true};
MERGE (n:KG {id: 'map:_1942_state.sound_map/range2'}) SET n:AddressRange SET n += {start: 24576, end: 24576, raw: 'map(0x6000, 0x6000).r(m_soundlatch[0], FUNC(generic_latch_8_device::read))', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 301, sourceColumn: 2, sourceEndLine: 301};
MERGE (n:KG {id: 'map:_1942_state.sound_map/range3'}) SET n:AddressRange SET n += {start: 24577, end: 24577, raw: 'map(0x6001, 0x6001).r(m_soundlatch[1], FUNC(generic_latch_8_device::read))', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 302, sourceColumn: 2, sourceEndLine: 302};
MERGE (n:KG {id: 'map:_1942_state.sound_map/range4'}) SET n:AddressRange SET n += {start: 32768, end: 32769, raw: 'map(0x8000, 0x8001).w("ay1", FUNC(ay8910_device::address_data_w))', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 303, sourceColumn: 2, sourceEndLine: 303};
MERGE (n:KG {id: 'map:_1942_state.sound_map/range5'}) SET n:AddressRange SET n += {start: 49152, end: 49153, raw: 'map(0xc000, 0xc001).w("ay2", FUNC(ay8910_device::address_data_w))', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 304, sourceColumn: 2, sourceEndLine: 304};
MERGE (n:KG {id: 'machine:_1942_state._1942'}) SET n:MachineConfig SET n += {cls: '_1942_state', name: '_1942', calls: [], resetHandlers: ['_1942_state.machine_reset'], startHandlers: ['_1942_state.video_start'], sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 593, sourceColumn: 1, sourceEndLine: 649};
MERGE (n:KG {id: 'handler:_1942_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: '_1942_state', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 586, sourceColumn: 1, sourceEndLine: 591, sourceParameters: '', sourceBody: 'm_palette_bank = 0;
	m_scroll[0] = 0;
	m_scroll[1] = 0;'};
MERGE (n:KG {id: 'handler:_1942_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: '_1942_state', sourceFile: 'src/mame/capcom/1942_v.cpp', sourceLine: 132, sourceColumn: 1, sourceEndLine: 138, sourceParameters: '', sourceBody: 'm_fg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(_1942_state::get_fg_tile_info)), TILEMAP_SCAN_ROWS, 8, 8, 32, 32);
	m_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(_1942_state::get_bg_tile_info)), TILEMAP_SCAN_COLS, 16, 16, 32, 16);

	m_fg_tilemap->set_transparent_pen(0);'};
MERGE (n:KG {id: 'handler:_1942_state.get_fg_tile_info'}) SET n:Handler SET n += {method: 'get_fg_tile_info', ownerClass: '_1942_state', sourceFile: 'src/mame/capcom/1942_v.cpp', sourceLine: 104, sourceColumn: 1, sourceEndLine: 112, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int code = m_fg_videoram[tile_index];
	int color = m_fg_videoram[tile_index + 0x400];
	tileinfo.set(0,
			code + ((color & 0x80) << 1),
			color & 0x3f,
			0);'};
MERGE (n:KG {id: 'handler:_1942_state.get_bg_tile_info'}) SET n:Handler SET n += {method: 'get_bg_tile_info', ownerClass: '_1942_state', sourceFile: 'src/mame/capcom/1942_v.cpp', sourceLine: 114, sourceColumn: 1, sourceEndLine: 124, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'tile_index = (tile_index & 0x0f) | ((tile_index & 0x01f0) << 1);

	int code = m_bg_videoram[tile_index];
	int color = m_bg_videoram[tile_index + 0x10];
	tileinfo.set(1,
			code + ((color & 0x80) << 1),
			(color & 0x1f) + (0x20 * m_palette_bank),
			TILE_FLIPYX((color & 0x60) >> 5));'};
MERGE (n:KG {id: 'bank:_1942_state._1942/bank1'}) SET n:MemoryBank SET n += {tag: 'bank1', member: 'bank1', startEntry: 0, entries: 4, region: 'maincpu', offset: 65536, stride: 16384, raw: 'membank("bank1")->configure_entries(0, 4, &ROM[0x10000], 0x4000)', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 1025, sourceColumn: 1, sourceEndLine: 1029};
MERGE (n:KG {id: 'device:_1942_state._1942/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 3000000, config: ['Z80(config, m_maincpu, MAIN_CPU_CLOCK)', 'm_maincpu->set_addrmap(AS_PROGRAM, &_1942_state::_1942_map)'], sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 596, sourceColumn: 2, sourceEndLine: 596};
MERGE (n:KG {id: 'device:_1942_state._1942/audiocpu'}) SET n:Device SET n += {type: 'Z80', tag: 'audiocpu', clock: 3000000, config: ['Z80(config, m_audiocpu, SOUND_CPU_CLOCK)', 'm_audiocpu->set_addrmap(AS_PROGRAM, &_1942_state::sound_map)'], sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 599, sourceColumn: 2, sourceEndLine: 599};
MERGE (n:KG {id: 'device:_1942_state._1942/scantimer'}) SET n:Device SET n += {type: 'TIMER', tag: 'scantimer', clock: null, config: ['TIMER(config, "scantimer").configure_scanline(FUNC(_1942_state::scanline), "screen", 0, 1)'], sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 602, sourceColumn: 2, sourceEndLine: 602};
MERGE (n:KG {id: 'device:_1942_state._1942/scantimer/callback:scantimer:0'}) SET n:Callback SET n += {signal: 'configure_scanline', operation: 'configure_scanline', raw: 'TIMER(config, "scantimer").configure_scanline(FUNC(_1942_state::scanline), "screen", 0, 1)', ownerTag: 'scantimer', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 602, sourceColumn: 2, sourceEndLine: 602, scanlineStart: 0, scanlineIncrement: 1, targetClass: '_1942_state', targetMethod: 'scanline'};
MERGE (n:KG {id: 'handler:_1942_state.scanline'}) SET n:Handler SET n += {method: 'scanline', ownerClass: '_1942_state', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 200, sourceColumn: 1, sourceEndLine: 214, sourceParameters: 'int param', sourceBody: '// interrupts at scanline specified in PROM
	const int scanline = param;
	const uint8_t irq = m_irqprom[scanline & 0xff];

	// RST 08h at scanline 109 (writes to the soundlatch and drives freeze dip-switch)
	// RST 10h at scanline 240 (vblank)
	if (irq & 8)
		m_maincpu->set_input_line_and_vector(0, HOLD_LINE, 0xc7 | (irq << 3 & 0x18));

	// 4 audio interrupts per frame
	if (irq & 4)
		m_audiocpu->set_input_line(0, HOLD_LINE);'};
MERGE (n:KG {id: 'device:_1942_state._1942/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_1942)'], sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 605, sourceColumn: 2, sourceEndLine: 605, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:_1942_state._1942/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(_1942_state::_1942_palette), 64*4+4*32*8+16*16, 256)'], sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 607, sourceColumn: 2, sourceEndLine: 607, clockExpr: 'FUNC(_1942_state::_1942_palette)'};
MERGE (n:KG {id: 'device:_1942_state._1942/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(MASTER_CLOCK/2, 384, 0, 256, 262, 16, 240)', 'm_screen->set_screen_update(FUNC(_1942_state::screen_update))', 'm_screen->set_palette(m_palette)'], sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 609, sourceColumn: 2, sourceEndLine: 609, configCalls: ['set_raw(6000000,384,0,256,262,16,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6000000, 384, 0, 256, 262, 16, 240]};
MERGE (n:KG {id: 'device:_1942_state._1942/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(_1942_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 611, sourceColumn: 2, sourceEndLine: 611, targetClass: '_1942_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:_1942_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: '_1942_state', sourceFile: 'src/mame/capcom/1942_v.cpp', sourceLine: 290, sourceColumn: 1, sourceEndLine: 296, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'm_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0);
	draw_sprites(bitmap, cliprect);
	m_fg_tilemap->draw(screen, bitmap, cliprect, 0, 0);
	return 0;'};
MERGE (n:KG {id: 'handler:_1942_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: '_1942_state', sourceFile: 'src/mame/capcom/1942_v.cpp', sourceLine: 204, sourceColumn: 1, sourceEndLine: 288, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: '// Sprites 0 to 15 are drawn on all scanlines.
	// Sprites 16 to 23 are drawn on scanlines 16 to 127.
	// Sprites 24 to 31 are drawn on scanlines 128 to 239.
	//
	// The reason for this is ostensibly so that the back half of the sprite list can
	// be used to selectively mask sprites along the midpoint of the screen.
	//
	// Moreover, the H counter runs from 128 to 511 for a total of 384 horizontal
	// clocks per scanline. With an effective 6MHz pixel clock, this produces a
	// horizontal scan rate of exactly 15.625kHz, a standard scan rate for games
	// of this era.
	//
	// Sprites are drawn by MAME in reverse order, as the actual hardware only
	// permits a transparent pixel to be overwritten by an opaque pixel, and does
	// not support opaque-opaque overwriting - i.e., the first sprite to draw wins
	// control over its horizontal range. If MAME drew in forward order, it would
	// instead produce a last-sprite-wins behavior.

	for (int y = cliprect.min_y; y <= cliprect.max_y; y++)
	{
		const rectangle cliprecty(cliprect.min_x, cliprect.max_x, y, y);
		uint8_t objdata[4];
		uint8_t v = flip_screen() ? ~(y - 1) : y - 1;
		for (int h = 496; h >= 128; h -= 16)
		{
			const bool objcnt4 = BIT(h, 8) != BIT(~h, 7);
			const bool objcnt3 = (BIT(v, 7) && objcnt4) != BIT(~h, 7);
			uint8_t obj_idx = (h >> 4) & 7;
			obj_idx |= objcnt3 ? 0x08 : 0x00;
			obj_idx |= objcnt4 ? 0x10 : 0x00;
			obj_idx <<= 2;
			for (int i = 0; i < 4; i++)
				objdata[i] = m_spriteram[obj_idx | i];

			int code = (objdata[0] & 0x7f) | (BIT(objdata[1], 5) << 7) | (BIT(objdata[0], 7) << 8);
			int col = objdata[1] & 0x0f;
			int sx = objdata[3] - (BIT(objdata[1], 4) << 8);
			int sy = objdata[2];
			int dir = 1;

			uint8_t valpha = (uint8_t)sy;
			uint8_t v2c = (uint8_t)(~v) + (flip_screen() ? 0x01 : 0xff);
			uint8_t lvbeta = v2c + valpha;
			uint8_t vbeta = ~lvbeta;
			bool vleq = vbeta <= (~valpha & 0xff);
			bool vinlen = true;
			uint8_t vlen = objdata[1] >> 6;
			switch (vlen & 3)
			{
			case 0:
				vinlen = BIT(lvbeta, 7) && BIT(lvbeta, 6) && BIT(lvbeta, 5) && BIT(lvbeta, 4);
				break;
			case 1:
				vinlen = BIT(lvbeta, 7) && BIT(lvbeta, 6) && BIT(lvbeta, 5);
				break;
			case 2:
				vinlen = BIT(lvbeta, 7) && BIT(lvbeta, 6);
				break;
			case 3:
				vinlen = true;
				break;
			}
			bool vinzone = !(vleq && vinlen);

			if (flip_screen())
			{
				sx = 240 - sx;
				sy = 240 - sy;
				dir = -1;
			}

			// draw sprite rows (16*16, 16*32, 16*64, or 16*256)
			const int row = (vlen == 3) ? 16 : (1 << vlen);
			code &= ~(row - 1);

			if (!vinzone)
			{
				for (int i = 0; i < row; i++)
					m_gfxdecode->gfx(2)->transpen(bitmap, cliprecty, code + i, col, flip_screen(), flip_screen(), sx, sy + 16 * i * dir, 15);
			}
		}
	}'};
MERGE (n:KG {id: 'device:_1942_state._1942/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 615, sourceColumn: 2, sourceEndLine: 615};
MERGE (n:KG {id: 'device:_1942_state._1942/soundlatch0'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch0', clock: null, config: ['GENERIC_LATCH_8(config, m_soundlatch[0])'], sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 617, sourceColumn: 2, sourceEndLine: 617};
MERGE (n:KG {id: 'device:_1942_state._1942/soundlatch1'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch1', clock: null, config: ['GENERIC_LATCH_8(config, m_soundlatch[1])'], sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 618, sourceColumn: 2, sourceEndLine: 618};
MERGE (n:KG {id: 'device:_1942_state._1942/ay1'}) SET n:Device SET n += {type: 'AY8910', tag: 'ay1', clock: 1500000, config: ['ay8910_device &ay1(AY8910(config, "ay1", AUDIO_CLOCK))', 'ay1.set_flags(AY8910_RESISTOR_OUTPUT)', 'ay1.set_resistors_load(10000.0, 10000.0, 10000.0)', 'ay1.add_route(0, "snd_nl", 1.0, 0)', 'ay1.add_route(1, "snd_nl", 1.0, 1)', 'ay1.add_route(2, "snd_nl", 1.0, 2)'], sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 620, sourceColumn: 2, sourceEndLine: 620, configCalls: ['set_flags(8)', 'set_resistors_load(10000,10000,10000)']};
MERGE (n:KG {id: 'audioroute:device:_1942_state._1942/ay1/0'}) SET n:AudioRoute SET n += {output: '0', target: 'snd_nl', gain: 1, input: 0, raw: 'ay1.add_route(0, "snd_nl", 1.0, 0)', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 623, sourceColumn: 2, sourceEndLine: 623};
MERGE (n:KG {id: 'audioroute:device:_1942_state._1942/ay1/1'}) SET n:AudioRoute SET n += {output: '1', target: 'snd_nl', gain: 1, input: 1, raw: 'ay1.add_route(1, "snd_nl", 1.0, 1)', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 624, sourceColumn: 2, sourceEndLine: 624};
MERGE (n:KG {id: 'audioroute:device:_1942_state._1942/ay1/2'}) SET n:AudioRoute SET n += {output: '2', target: 'snd_nl', gain: 1, input: 2, raw: 'ay1.add_route(2, "snd_nl", 1.0, 2)', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 625, sourceColumn: 2, sourceEndLine: 625};
MERGE (n:KG {id: 'device:_1942_state._1942/ay2'}) SET n:Device SET n += {type: 'AY8910', tag: 'ay2', clock: 1500000, config: ['ay8910_device &ay2(AY8910(config, "ay2", AUDIO_CLOCK))', 'ay2.set_flags(AY8910_RESISTOR_OUTPUT)', 'ay2.set_resistors_load(10000.0, 10000.0, 10000.0)', 'ay2.add_route(0, "snd_nl", 1.0, 3)', 'ay2.add_route(1, "snd_nl", 1.0, 4)', 'ay2.add_route(2, "snd_nl", 1.0, 5)'], sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 627, sourceColumn: 2, sourceEndLine: 627, configCalls: ['set_flags(8)', 'set_resistors_load(10000,10000,10000)']};
MERGE (n:KG {id: 'audioroute:device:_1942_state._1942/ay2/0'}) SET n:AudioRoute SET n += {output: '0', target: 'snd_nl', gain: 1, input: 3, raw: 'ay2.add_route(0, "snd_nl", 1.0, 3)', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 630, sourceColumn: 2, sourceEndLine: 630};
MERGE (n:KG {id: 'audioroute:device:_1942_state._1942/ay2/1'}) SET n:AudioRoute SET n += {output: '1', target: 'snd_nl', gain: 1, input: 4, raw: 'ay2.add_route(1, "snd_nl", 1.0, 4)', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 631, sourceColumn: 2, sourceEndLine: 631};
MERGE (n:KG {id: 'audioroute:device:_1942_state._1942/ay2/2'}) SET n:AudioRoute SET n += {output: '2', target: 'snd_nl', gain: 1, input: 5, raw: 'ay2.add_route(2, "snd_nl", 1.0, 5)', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 632, sourceColumn: 2, sourceEndLine: 632};
MERGE (n:KG {id: 'device:_1942_state._1942/snd_nl'}) SET n:Device SET n += {type: 'NETLIST_SOUND', tag: 'snd_nl', clock: 93750, config: ['NETLIST_SOUND(config, "snd_nl", AUDIO_CLOCK / 8 / 2)
		.set_source(NETLIST_NAME(1942))
		.add_route(ALL_OUTPUTS, "mono", 5.0)'], sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 637, sourceColumn: 2, sourceEndLine: 639};
MERGE (n:KG {id: 'audioroute:device:_1942_state._1942/snd_nl/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 5, raw: 'NETLIST_SOUND(config, "snd_nl", AUDIO_CLOCK / 8 / 2)
		.set_source(NETLIST_NAME(1942))
		.add_route(ALL_OUTPUTS, "mono", 5.0)', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 637, sourceColumn: 2, sourceEndLine: 639};
MERGE (n:KG {id: 'device:_1942_state._1942/snd_nl:cin0'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'snd_nl:cin0', clock: 0, config: ['NETLIST_STREAM_INPUT(config, "snd_nl:cin0", 0, "R_AY1_1.R")'], sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 640, sourceColumn: 2, sourceEndLine: 640};
MERGE (n:KG {id: 'device:_1942_state._1942/snd_nl:cin1'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'snd_nl:cin1', clock: 1, config: ['NETLIST_STREAM_INPUT(config, "snd_nl:cin1", 1, "R_AY1_2.R")'], sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 641, sourceColumn: 2, sourceEndLine: 641};
MERGE (n:KG {id: 'device:_1942_state._1942/snd_nl:cin2'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'snd_nl:cin2', clock: 2, config: ['NETLIST_STREAM_INPUT(config, "snd_nl:cin2", 2, "R_AY1_3.R")'], sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 642, sourceColumn: 2, sourceEndLine: 642};
MERGE (n:KG {id: 'device:_1942_state._1942/snd_nl:cin3'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'snd_nl:cin3', clock: 3, config: ['NETLIST_STREAM_INPUT(config, "snd_nl:cin3", 3, "R_AY2_1.R")'], sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 643, sourceColumn: 2, sourceEndLine: 643};
MERGE (n:KG {id: 'device:_1942_state._1942/snd_nl:cin4'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'snd_nl:cin4', clock: 4, config: ['NETLIST_STREAM_INPUT(config, "snd_nl:cin4", 4, "R_AY2_2.R")'], sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 644, sourceColumn: 2, sourceEndLine: 644};
MERGE (n:KG {id: 'device:_1942_state._1942/snd_nl:cin5'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'snd_nl:cin5', clock: 5, config: ['NETLIST_STREAM_INPUT(config, "snd_nl:cin5", 5, "R_AY2_3.R")'], sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 645, sourceColumn: 2, sourceEndLine: 645};
MERGE (n:KG {id: 'device:_1942_state._1942/snd_nl:cout0'}) SET n:Device SET n += {type: 'NETLIST_STREAM_OUTPUT', tag: 'snd_nl:cout0', clock: 0, config: ['NETLIST_STREAM_OUTPUT(config, "snd_nl:cout0", 0, "R1.1").set_mult_offset(70000.0 / 32768.0, 0.0)'], sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 647, sourceColumn: 2, sourceEndLine: 647};
MERGE (n:KG {id: 'inputs:1942'}) SET n:InputPorts SET n += {name: '1942', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 308, sourceColumn: 8, sourceEndLine: 308};
MERGE (n:KG {id: 'inputs:1942/SYSTEM'}) SET n:Port SET n += {tag: 'SYSTEM', modify: false};
MERGE (n:KG {id: 'inputs:1942/SYSTEM/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_START1'};
MERGE (n:KG {id: 'inputs:1942/SYSTEM/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_START2'};
MERGE (n:KG {id: 'inputs:1942/SYSTEM/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 12, activeLow: true, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:1942/SYSTEM/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_SERVICE1'};
MERGE (n:KG {id: 'inputs:1942/SYSTEM/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:1942/SYSTEM/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_COIN2'};
MERGE (n:KG {id: 'inputs:1942/SYSTEM/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_COIN1'};
MERGE (n:KG {id: 'inputs:1942/P1'}) SET n:Port SET n += {tag: 'P1', modify: false};
MERGE (n:KG {id: 'inputs:1942/P1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY']};
MERGE (n:KG {id: 'inputs:1942/P1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY']};
MERGE (n:KG {id: 'inputs:1942/P1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY']};
MERGE (n:KG {id: 'inputs:1942/P1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY']};
MERGE (n:KG {id: 'inputs:1942/P1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1'};
MERGE (n:KG {id: 'inputs:1942/P1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2'};
MERGE (n:KG {id: 'inputs:1942/P1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 192, activeLow: true, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:1942/P2'}) SET n:Port SET n += {tag: 'P2', modify: false};
MERGE (n:KG {id: 'inputs:1942/P2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:1942/P2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:1942/P2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:1942/P2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:1942/P2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:1942/P2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:1942/P2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 192, activeLow: true, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:1942/DSWA'}) SET n:Port SET n += {tag: 'DSWA', modify: false};
MERGE (n:KG {id: 'inputs:1942/DSWA/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 7, name: 'Coin A', defaultValue: 7, location: 'SWA:8,7,6', settings: ['1=4C 1C', '2=3C 1C', '4=2C 1C', '7=1C 1C', '3=2C 3C', '6=1C 2C', '5=1C 4C', '0=Free Play']};
MERGE (n:KG {id: 'inputs:1942/DSWA/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 8, name: 'Cabinet', defaultValue: 0, location: 'SWA:5', settings: ['0=Upright', '8=Cocktail']};
MERGE (n:KG {id: 'inputs:1942/DSWA/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 48, name: 'Bonus Life', defaultValue: 48, location: 'SWA:4,3', settings: ['48=20K 80K 80K+', '32=20K 100K 100K+', '16=30K 80K 80K+', '0=30K 100K 100K+']};
MERGE (n:KG {id: 'inputs:1942/DSWA/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 192, name: 'Lives', defaultValue: 192, location: 'SWA:2,1', settings: ['128=1', '64=2', '192=3', '0=5']};
MERGE (n:KG {id: 'inputs:1942/DSWB'}) SET n:Port SET n += {tag: 'DSWB', modify: false};
MERGE (n:KG {id: 'inputs:1942/DSWB/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 7, name: 'Coin B', defaultValue: 7, location: 'SWB:8,7,6', settings: ['1=4C 1C', '2=3C 1C', '4=2C 1C', '7=1C 1C', '3=2C 3C', '6=1C 2C', '5=1C 4C', '0=Free Play']};
MERGE (n:KG {id: 'inputs:1942/DSWB/f1'}) SET n:PortField SET n += {kind: 'service', mask: 8, activeLow: true, defaultValue: 8};
MERGE (n:KG {id: 'inputs:1942/DSWB/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 16, name: 'Flip Screen', defaultValue: 16, location: 'SWB:4', settings: ['16=Off', '0=On']};
MERGE (n:KG {id: 'inputs:1942/DSWB/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 96, name: 'Difficulty', defaultValue: 96, location: 'SWB:3,2', settings: ['64=Easy', '96=Normal', '32=Difficult', '0=Very Difficult']};
MERGE (n:KG {id: 'inputs:1942/DSWB/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Screen Stop', defaultValue: 128, location: 'SWB:1', settings: ['128=Off', '0=On']};
MERGE (n:KG {id: 'gfxlayout:charlayout'}) SET n:GfxLayout SET n += {name: 'charlayout', width: 8, height: 8, total: 'RGN_FRAC(1,1)', planes: 2, planeOffsets: [4, 0], xOffsets: [0, 1, 2, 3, 8, 9, 10, 11], yOffsets: [0, 16, 32, 48, 64, 80, 96, 112], charIncrement: 128};
MERGE (n:KG {id: 'gfxlayout:tilelayout'}) SET n:GfxLayout SET n += {name: 'tilelayout', width: 16, height: 16, total: 'RGN_FRAC(1,3)', planes: 3, planeOffsets: ['RGN_FRAC(0,3)', 'RGN_FRAC(1,3)', 'RGN_FRAC(2,3)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 128, 129, 130, 131, 132, 133, 134, 135], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120], charIncrement: 256};
MERGE (n:KG {id: 'gfxlayout:spritelayout'}) SET n:GfxLayout SET n += {name: 'spritelayout', width: 16, height: 16, total: 'RGN_FRAC(1,2)', planes: 4, planeOffsets: ['RGN_FRAC(1,2)+4', 'RGN_FRAC(1,2)+0', 4, 0], xOffsets: [0, 1, 2, 3, 8, 9, 10, 11, 256, 257, 258, 259, 264, 265, 266, 267], yOffsets: [0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240], charIncrement: 512};
MERGE (n:KG {id: 'gfxdecode:gfx_1942'}) SET n:GfxDecode SET n += {name: 'gfx_1942', sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 529, sourceColumn: 8, sourceEndLine: 529};
MERGE (n:KG {id: 'gfxdecode:gfx_1942/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'charlayout', colorBase: 0, colorCount: 64, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_1942/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx2', offset: 0, layout: 'tilelayout', colorBase: 256, colorCount: 128, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_1942/e2'}) SET n:GfxDecodeEntry SET n += {region: 'gfx3', offset: 0, layout: 'spritelayout', colorBase: 1280, colorCount: 16, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:1942'}), (b:KG {id: 'file:src/mame/capcom/1942.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 1033, sourceColumn: 1, sourceEndLine: 1033};
MATCH (a:KG {id: 'game:1942'}), (b:KG {id: 'machine:_1942_state._1942'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:1942'}), (b:KG {id: 'inputs:1942'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:1942'}), (b:KG {id: 'romset:1942'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/capcom/1942.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/capcom/1942.cpp'}), (b:KG {id: 'file:1942.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/capcom/1942.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/capcom/1942.cpp'}), (b:KG {id: 'file:sound/ay8910.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/capcom/1942.cpp'}), (b:KG {id: 'file:machine/netlist.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/capcom/1942.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/capcom/1942.cpp'}), (b:KG {id: 'file:nl_1942.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:_1942_state._1942'}), (b:KG {id: 'file:src/mame/capcom/1942.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 593, sourceColumn: 1, sourceEndLine: 649};
MATCH (a:KG {id: 'machine:_1942_state._1942'}), (b:KG {id: 'handler:_1942_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:_1942_state._1942'}), (b:KG {id: 'handler:_1942_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:_1942_state._1942'}), (b:KG {id: 'bank:_1942_state._1942/bank1'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:_1942_state._1942'}), (b:KG {id: 'device:_1942_state._1942/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:_1942_state._1942'}), (b:KG {id: 'device:_1942_state._1942/audiocpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:_1942_state._1942'}), (b:KG {id: 'device:_1942_state._1942/scantimer'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:_1942_state._1942'}), (b:KG {id: 'device:_1942_state._1942/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:_1942_state._1942'}), (b:KG {id: 'gfxdecode:gfx_1942'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:_1942_state._1942'}), (b:KG {id: 'device:_1942_state._1942/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:_1942_state._1942'}), (b:KG {id: 'device:_1942_state._1942/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:_1942_state._1942'}), (b:KG {id: 'device:_1942_state._1942/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:_1942_state._1942'}), (b:KG {id: 'device:_1942_state._1942/soundlatch0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:_1942_state._1942'}), (b:KG {id: 'device:_1942_state._1942/soundlatch1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:_1942_state._1942'}), (b:KG {id: 'device:_1942_state._1942/ay1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:_1942_state._1942'}), (b:KG {id: 'device:_1942_state._1942/ay2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:_1942_state._1942'}), (b:KG {id: 'device:_1942_state._1942/snd_nl'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:_1942_state._1942'}), (b:KG {id: 'device:_1942_state._1942/snd_nl:cin0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:_1942_state._1942'}), (b:KG {id: 'device:_1942_state._1942/snd_nl:cin1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:_1942_state._1942'}), (b:KG {id: 'device:_1942_state._1942/snd_nl:cin2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:_1942_state._1942'}), (b:KG {id: 'device:_1942_state._1942/snd_nl:cin3'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:_1942_state._1942'}), (b:KG {id: 'device:_1942_state._1942/snd_nl:cin4'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:_1942_state._1942'}), (b:KG {id: 'device:_1942_state._1942/snd_nl:cin5'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:_1942_state._1942'}), (b:KG {id: 'device:_1942_state._1942/snd_nl:cout0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:1942'}), (b:KG {id: 'file:src/mame/capcom/1942.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 308, sourceColumn: 8, sourceEndLine: 308};
MATCH (a:KG {id: 'inputs:1942'}), (b:KG {id: 'inputs:1942/SYSTEM'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:1942'}), (b:KG {id: 'inputs:1942/P1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:1942'}), (b:KG {id: 'inputs:1942/P2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:1942'}), (b:KG {id: 'inputs:1942/DSWA'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:1942'}), (b:KG {id: 'inputs:1942/DSWB'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:1942'}), (b:KG {id: 'file:src/mame/capcom/1942.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 691, sourceColumn: 1, sourceEndLine: 691};
MATCH (a:KG {id: 'romset:1942'}), (b:KG {id: 'region:1942/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:1942'}), (b:KG {id: 'region:1942/audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:1942'}), (b:KG {id: 'region:1942/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:1942'}), (b:KG {id: 'region:1942/gfx2'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:1942'}), (b:KG {id: 'region:1942/gfx3'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:1942'}), (b:KG {id: 'region:1942/palproms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:1942'}), (b:KG {id: 'region:1942/charprom'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:1942'}), (b:KG {id: 'region:1942/tileprom'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:1942'}), (b:KG {id: 'region:1942/sprprom'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:1942'}), (b:KG {id: 'region:1942/irqprom'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:1942'}), (b:KG {id: 'region:1942/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:_1942_state.video_start'}), (b:KG {id: 'handler:_1942_state.get_fg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:_1942_state.video_start'}), (b:KG {id: 'handler:_1942_state.get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'bank:_1942_state._1942/bank1'}), (b:KG {id: 'file:src/mame/capcom/1942.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 1025, sourceColumn: 1, sourceEndLine: 1029};
MATCH (a:KG {id: 'device:_1942_state._1942/maincpu'}), (b:KG {id: 'map:_1942_state._1942_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:_1942_state._1942/audiocpu'}), (b:KG {id: 'map:_1942_state.sound_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:_1942_state._1942/scantimer'}), (b:KG {id: 'device:_1942_state._1942/scantimer/callback:scantimer:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_1942'}), (b:KG {id: 'file:src/mame/capcom/1942.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 529, sourceColumn: 8, sourceEndLine: 529};
MATCH (a:KG {id: 'gfxdecode:gfx_1942'}), (b:KG {id: 'gfxdecode:gfx_1942/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_1942'}), (b:KG {id: 'gfxdecode:gfx_1942/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_1942'}), (b:KG {id: 'gfxdecode:gfx_1942/e2'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:_1942_state._1942/screen'}), (b:KG {id: 'device:_1942_state._1942/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:_1942_state._1942/ay1'}), (b:KG {id: 'audioroute:device:_1942_state._1942/ay1/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:_1942_state._1942/ay1'}), (b:KG {id: 'audioroute:device:_1942_state._1942/ay1/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:_1942_state._1942/ay1'}), (b:KG {id: 'audioroute:device:_1942_state._1942/ay1/2'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:_1942_state._1942/ay2'}), (b:KG {id: 'audioroute:device:_1942_state._1942/ay2/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:_1942_state._1942/ay2'}), (b:KG {id: 'audioroute:device:_1942_state._1942/ay2/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:_1942_state._1942/ay2'}), (b:KG {id: 'audioroute:device:_1942_state._1942/ay2/2'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:_1942_state._1942/snd_nl'}), (b:KG {id: 'audioroute:device:_1942_state._1942/snd_nl/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:1942/SYSTEM'}), (b:KG {id: 'inputs:1942/SYSTEM/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/SYSTEM'}), (b:KG {id: 'inputs:1942/SYSTEM/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/SYSTEM'}), (b:KG {id: 'inputs:1942/SYSTEM/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/SYSTEM'}), (b:KG {id: 'inputs:1942/SYSTEM/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/SYSTEM'}), (b:KG {id: 'inputs:1942/SYSTEM/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/SYSTEM'}), (b:KG {id: 'inputs:1942/SYSTEM/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/SYSTEM'}), (b:KG {id: 'inputs:1942/SYSTEM/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/P1'}), (b:KG {id: 'inputs:1942/P1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/P1'}), (b:KG {id: 'inputs:1942/P1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/P1'}), (b:KG {id: 'inputs:1942/P1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/P1'}), (b:KG {id: 'inputs:1942/P1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/P1'}), (b:KG {id: 'inputs:1942/P1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/P1'}), (b:KG {id: 'inputs:1942/P1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/P1'}), (b:KG {id: 'inputs:1942/P1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/P2'}), (b:KG {id: 'inputs:1942/P2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/P2'}), (b:KG {id: 'inputs:1942/P2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/P2'}), (b:KG {id: 'inputs:1942/P2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/P2'}), (b:KG {id: 'inputs:1942/P2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/P2'}), (b:KG {id: 'inputs:1942/P2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/P2'}), (b:KG {id: 'inputs:1942/P2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/P2'}), (b:KG {id: 'inputs:1942/P2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/DSWA'}), (b:KG {id: 'inputs:1942/DSWA/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/DSWA'}), (b:KG {id: 'inputs:1942/DSWA/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/DSWA'}), (b:KG {id: 'inputs:1942/DSWA/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/DSWA'}), (b:KG {id: 'inputs:1942/DSWA/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/DSWB'}), (b:KG {id: 'inputs:1942/DSWB/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/DSWB'}), (b:KG {id: 'inputs:1942/DSWB/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/DSWB'}), (b:KG {id: 'inputs:1942/DSWB/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/DSWB'}), (b:KG {id: 'inputs:1942/DSWB/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:1942/DSWB'}), (b:KG {id: 'inputs:1942/DSWB/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:1942/maincpu'}), (b:KG {id: 'rom:1942/maincpu/srb-03.m3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/maincpu'}), (b:KG {id: 'rom:1942/maincpu/srb-04.m4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/maincpu'}), (b:KG {id: 'rom:1942/maincpu/srb-05.m5'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/maincpu'}), (b:KG {id: 'rom:1942/maincpu/srb-06.m6'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/maincpu'}), (b:KG {id: 'rom:1942/maincpu/srb-07.m7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/audiocpu'}), (b:KG {id: 'rom:1942/audiocpu/sr-01.c11'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/gfx1'}), (b:KG {id: 'rom:1942/gfx1/sr-02.f2'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/gfx2'}), (b:KG {id: 'rom:1942/gfx2/sr-08.a1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/gfx2'}), (b:KG {id: 'rom:1942/gfx2/sr-09.a2'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/gfx2'}), (b:KG {id: 'rom:1942/gfx2/sr-10.a3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/gfx2'}), (b:KG {id: 'rom:1942/gfx2/sr-11.a4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/gfx2'}), (b:KG {id: 'rom:1942/gfx2/sr-12.a5'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/gfx2'}), (b:KG {id: 'rom:1942/gfx2/sr-13.a6'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/gfx3'}), (b:KG {id: 'rom:1942/gfx3/sr-14.l1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/gfx3'}), (b:KG {id: 'rom:1942/gfx3/sr-15.l2'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/gfx3'}), (b:KG {id: 'rom:1942/gfx3/sr-16.n1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/gfx3'}), (b:KG {id: 'rom:1942/gfx3/sr-17.n2'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/palproms'}), (b:KG {id: 'rom:1942/palproms/sb-5.e8'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/palproms'}), (b:KG {id: 'rom:1942/palproms/sb-6.e9'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/palproms'}), (b:KG {id: 'rom:1942/palproms/sb-7.e10'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/charprom'}), (b:KG {id: 'rom:1942/charprom/sb-0.f1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/tileprom'}), (b:KG {id: 'rom:1942/tileprom/sb-4.d6'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/sprprom'}), (b:KG {id: 'rom:1942/sprprom/sb-8.k3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/irqprom'}), (b:KG {id: 'rom:1942/irqprom/sb-1.k6'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/proms'}), (b:KG {id: 'rom:1942/proms/sb-2.d1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/proms'}), (b:KG {id: 'rom:1942/proms/sb-3.d2'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:1942/proms'}), (b:KG {id: 'rom:1942/proms/sb-9.m11'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'map:_1942_state._1942_map'}), (b:KG {id: 'file:src/mame/capcom/1942.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 217, sourceColumn: 1, sourceEndLine: 237};
MATCH (a:KG {id: 'map:_1942_state._1942_map'}), (b:KG {id: 'map:_1942_state._1942_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:_1942_state._1942_map'}), (b:KG {id: 'map:_1942_state._1942_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:_1942_state._1942_map'}), (b:KG {id: 'map:_1942_state._1942_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:_1942_state._1942_map'}), (b:KG {id: 'map:_1942_state._1942_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:_1942_state._1942_map'}), (b:KG {id: 'map:_1942_state._1942_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:_1942_state._1942_map'}), (b:KG {id: 'map:_1942_state._1942_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:_1942_state._1942_map'}), (b:KG {id: 'map:_1942_state._1942_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:_1942_state._1942_map'}), (b:KG {id: 'map:_1942_state._1942_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:_1942_state._1942_map'}), (b:KG {id: 'map:_1942_state._1942_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:_1942_state._1942_map'}), (b:KG {id: 'map:_1942_state._1942_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:_1942_state._1942_map'}), (b:KG {id: 'map:_1942_state._1942_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:_1942_state._1942_map'}), (b:KG {id: 'map:_1942_state._1942_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:_1942_state._1942_map'}), (b:KG {id: 'map:_1942_state._1942_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:_1942_state._1942_map'}), (b:KG {id: 'map:_1942_state._1942_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:_1942_state._1942_map'}), (b:KG {id: 'map:_1942_state._1942_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:_1942_state._1942_map'}), (b:KG {id: 'map:_1942_state._1942_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:_1942_state._1942_map'}), (b:KG {id: 'map:_1942_state._1942_map/range16'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:_1942_state.sound_map'}), (b:KG {id: 'file:src/mame/capcom/1942.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/1942.cpp', sourceLine: 297, sourceColumn: 1, sourceEndLine: 305};
MATCH (a:KG {id: 'map:_1942_state.sound_map'}), (b:KG {id: 'map:_1942_state.sound_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:_1942_state.sound_map'}), (b:KG {id: 'map:_1942_state.sound_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:_1942_state.sound_map'}), (b:KG {id: 'map:_1942_state.sound_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:_1942_state.sound_map'}), (b:KG {id: 'map:_1942_state.sound_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:_1942_state.sound_map'}), (b:KG {id: 'map:_1942_state.sound_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:_1942_state.sound_map'}), (b:KG {id: 'map:_1942_state.sound_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:_1942_state._1942/scantimer/callback:scantimer:0'}), (b:KG {id: 'handler:_1942_state.scanline'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_1942/e0'}), (b:KG {id: 'gfxlayout:charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_1942/e1'}), (b:KG {id: 'gfxlayout:tilelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_1942/e2'}), (b:KG {id: 'gfxlayout:spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:_1942_state._1942/screen/callback:screen:0'}), (b:KG {id: 'handler:_1942_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:_1942_state._1942_map/range7'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundlatch0'};
MATCH (a:KG {id: 'map:_1942_state._1942_map/range8'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundlatch1'};
MATCH (a:KG {id: 'map:_1942_state._1942_map/range9'}), (b:KG {id: 'handler:_1942_state.scroll_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:_1942_state._1942_map/range10'}), (b:KG {id: 'handler:_1942_state.control_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:_1942_state._1942_map/range11'}), (b:KG {id: 'handler:_1942_state.palette_bank_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:_1942_state._1942_map/range12'}), (b:KG {id: 'handler:_1942_state.bankswitch_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:_1942_state._1942_map/range14'}), (b:KG {id: 'handler:_1942_state.fgvideoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:_1942_state._1942_map/range15'}), (b:KG {id: 'handler:_1942_state.bgvideoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:_1942_state.sound_map/range2'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'soundlatch0'};
MATCH (a:KG {id: 'map:_1942_state.sound_map/range3'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'soundlatch1'};
MATCH (a:KG {id: 'map:_1942_state.sound_map/range4'}), (b:KG {id: 'handler:ay8910_device.address_data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay1'};
MATCH (a:KG {id: 'map:_1942_state.sound_map/range5'}), (b:KG {id: 'handler:ay8910_device.address_data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay2'};
MATCH (a:KG {id: 'gfxlayout:charlayout'}), (b:KG {id: 'file:src/mame/capcom/1942.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:tilelayout'}), (b:KG {id: 'file:src/mame/capcom/1942.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:spritelayout'}), (b:KG {id: 'file:src/mame/capcom/1942.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'handler:_1942_state.screen_update'}), (b:KG {id: 'handler:_1942_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
