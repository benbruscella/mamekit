// mamekit knowledge graph — driver src/mame/irem/m52.cpp
// generated 2026-09-05T03:49:50.481Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/irem/m52.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/irem/m52.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:irem.h'}) SET n:SourceFile SET n += {path: 'irem.h', external: true};
MERGE (n:KG {id: 'file:iremipt.h'}) SET n:SourceFile SET n += {path: 'iremipt.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:video/resnet.h'}) SET n:SourceFile SET n += {path: 'video/resnet.h', external: true};
MERGE (n:KG {id: 'file:emupal.h'}) SET n:SourceFile SET n += {path: 'emupal.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:tilemap.h'}) SET n:SourceFile SET n += {path: 'tilemap.h', external: true};
MERGE (n:KG {id: 'file:src/mame/irem/irem.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/irem/irem.cpp'};
MERGE (n:KG {id: 'file:cpu/m6800/m6801.h'}) SET n:SourceFile SET n += {path: 'cpu/m6800/m6801.h', external: true};
MERGE (n:KG {id: 'file:sound/discrete.h'}) SET n:SourceFile SET n += {path: 'sound/discrete.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'game:mpatrol'}) SET n:Game SET n += {name: 'mpatrol', year: '1982', company: 'Irem', fullname: 'Moon Patrol', monitor: 'ROT0', cls: 'm52_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 1178, sourceColumn: 1, sourceEndLine: 1178};
MERGE (n:KG {id: 'romset:mpatrol'}) SET n:RomSet SET n += {name: 'mpatrol', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 989, sourceColumn: 1, sourceEndLine: 989};
MERGE (n:KG {id: 'region:mpatrol/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 990, sourceColumn: 2, sourceEndLine: 990};
MERGE (n:KG {id: 'rom:mpatrol/maincpu/mpa-1.3m'}) SET n:Rom SET n += {file: 'mpa-1.3m', offset: 0, size: 4096, crc: '5873a860', sha1: '8c03726d6e049c3edbc277440184e31679f78258', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 991, sourceColumn: 2, sourceEndLine: 991};
MERGE (n:KG {id: 'rom:mpatrol/maincpu/mpa-2.3l'}) SET n:Rom SET n += {file: 'mpa-2.3l', offset: 4096, size: 4096, crc: 'f4b85974', sha1: 'dfb2efb57378a20af6f20569f4360cde95596f93', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 992, sourceColumn: 2, sourceEndLine: 992};
MERGE (n:KG {id: 'rom:mpatrol/maincpu/mpa-3.3k'}) SET n:Rom SET n += {file: 'mpa-3.3k', offset: 8192, size: 4096, crc: '2e1a598c', sha1: '112c3c9678db8a8540a8df3708020c87fd10c91b', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 993, sourceColumn: 2, sourceEndLine: 993};
MERGE (n:KG {id: 'rom:mpatrol/maincpu/mpa-4.3j'}) SET n:Rom SET n += {file: 'mpa-4.3j', offset: 12288, size: 4096, crc: 'dd05b587', sha1: '727961b0dafa4a96b580d51013336db2a18aff1e', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 994, sourceColumn: 2, sourceEndLine: 994};
MERGE (n:KG {id: 'region:mpatrol/irem_audio:iremsound'}) SET n:RomRegion SET n += {tag: 'irem_audio:iremsound', size: 32768, flags: '0', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 996, sourceColumn: 2, sourceEndLine: 996};
MERGE (n:KG {id: 'rom:mpatrol/irem_audio:iremsound/mp-s1.1a'}) SET n:Rom SET n += {file: 'mp-s1.1a', offset: 28672, size: 4096, crc: '561d3108', sha1: '4998c68a9e9a8002251fa8f07aa1082444a9dc80', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 997, sourceColumn: 2, sourceEndLine: 997};
MERGE (n:KG {id: 'region:mpatrol/tx'}) SET n:RomRegion SET n += {tag: 'tx', size: 8192, flags: '0', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 999, sourceColumn: 2, sourceEndLine: 999};
MERGE (n:KG {id: 'rom:mpatrol/tx/mpe-4.3f'}) SET n:Rom SET n += {file: 'mpe-4.3f', offset: 0, size: 4096, crc: 'cca6d023', sha1: 'fecb3059fb09897a096add9452b50aec55c07545', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 1000, sourceColumn: 2, sourceEndLine: 1000};
MERGE (n:KG {id: 'rom:mpatrol/tx/mpe-5.3e'}) SET n:Rom SET n += {file: 'mpe-5.3e', offset: 4096, size: 4096, crc: 'e3ee7f75', sha1: 'b03d0d56150d3e9da4a4c871338097b4f450b649', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 1001, sourceColumn: 2, sourceEndLine: 1001};
MERGE (n:KG {id: 'region:mpatrol/sp'}) SET n:RomRegion SET n += {tag: 'sp', size: 12288, flags: 'ROMREGION_ERASE00', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 1004, sourceColumn: 2, sourceEndLine: 1004};
MERGE (n:KG {id: 'rom:mpatrol/sp/mpb-2.3m'}) SET n:Rom SET n += {file: 'mpb-2.3m', offset: 0, size: 4096, crc: '707ace5e', sha1: '93c682e13e74bce29ced3a87bffb29569c114c3b', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 1005, sourceColumn: 2, sourceEndLine: 1005};
MERGE (n:KG {id: 'rom:mpatrol/sp/mpb-1.3n'}) SET n:Rom SET n += {file: 'mpb-1.3n', offset: 4096, size: 4096, crc: '9b72133a', sha1: '1393ef92ae1ad58a4b62ca1660c0793d30a8b5e2', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 1006, sourceColumn: 2, sourceEndLine: 1006};
MERGE (n:KG {id: 'region:mpatrol/bg0'}) SET n:RomRegion SET n += {tag: 'bg0', size: 8192, flags: 'ROMREGION_ERASEFF', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 1009, sourceColumn: 2, sourceEndLine: 1009};
MERGE (n:KG {id: 'rom:mpatrol/bg0/mpe-1.3l'}) SET n:Rom SET n += {file: 'mpe-1.3l', offset: 0, size: 4096, crc: 'c46a7f72', sha1: '8bb7c9acaf6833fb6c0575b015991b873a305a84', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 1010, sourceColumn: 2, sourceEndLine: 1010};
MERGE (n:KG {id: 'region:mpatrol/bg1'}) SET n:RomRegion SET n += {tag: 'bg1', size: 8192, flags: 'ROMREGION_ERASEFF', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 1012, sourceColumn: 2, sourceEndLine: 1012};
MERGE (n:KG {id: 'rom:mpatrol/bg1/mpe-2.3k'}) SET n:Rom SET n += {file: 'mpe-2.3k', offset: 0, size: 4096, crc: 'c7aa1fb0', sha1: '14c6c76e1d0db2c0745e5d6d33ea6945fac8e9ee', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 1013, sourceColumn: 2, sourceEndLine: 1013};
MERGE (n:KG {id: 'region:mpatrol/bg2'}) SET n:RomRegion SET n += {tag: 'bg2', size: 8192, flags: 'ROMREGION_ERASEFF', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 1015, sourceColumn: 2, sourceEndLine: 1015};
MERGE (n:KG {id: 'rom:mpatrol/bg2/mpe-3.3h'}) SET n:Rom SET n += {file: 'mpe-3.3h', offset: 0, size: 4096, crc: 'a0919392', sha1: '8a090cb8d483a3d67c7360058e3fdd70e151cd62', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 1016, sourceColumn: 2, sourceEndLine: 1016};
MERGE (n:KG {id: 'region:mpatrol/tx_pal'}) SET n:RomRegion SET n += {tag: 'tx_pal', size: 512, flags: '0', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 1018, sourceColumn: 2, sourceEndLine: 1018};
MERGE (n:KG {id: 'rom:mpatrol/tx_pal/mpc-4.2a'}) SET n:Rom SET n += {file: 'mpc-4.2a', offset: 0, size: 512, crc: '07f99284', sha1: 'dfc52958f2520e1ce4446dd4c84c91413bbacf76', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 1019, sourceColumn: 2, sourceEndLine: 1019};
MERGE (n:KG {id: 'region:mpatrol/bg_pal'}) SET n:RomRegion SET n += {tag: 'bg_pal', size: 32, flags: '0', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 1021, sourceColumn: 2, sourceEndLine: 1021};
MERGE (n:KG {id: 'rom:mpatrol/bg_pal/mpc-3.1m'}) SET n:Rom SET n += {file: 'mpc-3.1m', offset: 0, size: 32, crc: '6a57eff2', sha1: '2d1c12dab5915da2ccd466e39436c88be434d634', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 1022, sourceColumn: 2, sourceEndLine: 1022};
MERGE (n:KG {id: 'region:mpatrol/spr_pal'}) SET n:RomRegion SET n += {tag: 'spr_pal', size: 32, flags: '0', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 1024, sourceColumn: 2, sourceEndLine: 1024};
MERGE (n:KG {id: 'rom:mpatrol/spr_pal/mpc-1.1f'}) SET n:Rom SET n += {file: 'mpc-1.1f', offset: 0, size: 32, crc: '26979b13', sha1: '8c41a8cce4f3384c392a9f7a223a50d7be0e14a5', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 1025, sourceColumn: 2, sourceEndLine: 1025};
MERGE (n:KG {id: 'region:mpatrol/spr_clut'}) SET n:RomRegion SET n += {tag: 'spr_clut', size: 256, flags: '0', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 1027, sourceColumn: 2, sourceEndLine: 1027};
MERGE (n:KG {id: 'rom:mpatrol/spr_clut/mpc-2.2h'}) SET n:Rom SET n += {file: 'mpc-2.2h', offset: 0, size: 256, crc: '7ae4cd97', sha1: 'bc0662fac82ffe65f02092d912b2c2b0c7a8ac2b', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 1028, sourceColumn: 2, sourceEndLine: 1028};
MERGE (n:KG {id: 'region:mpatrol/unkprom'}) SET n:RomRegion SET n += {tag: 'unkprom', size: 512, flags: '0', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 1030, sourceColumn: 2, sourceEndLine: 1030};
MERGE (n:KG {id: 'rom:mpatrol/unkprom/mp_7621-5.7h'}) SET n:Rom SET n += {file: 'mp_7621-5.7h', offset: 0, size: 512, crc: 'cf1fd9d0', sha1: 'f9575bc59bf21dfecd10133264835e02890562f8', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 1031, sourceColumn: 2, sourceEndLine: 1031};
MERGE (n:KG {id: 'map:m52_state.main_map'}) SET n:AddressMap SET n += {cls: 'm52_state', name: 'main_map', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 616, sourceColumn: 1, sourceEndLine: 631};
MERGE (n:KG {id: 'map:m52_state.main_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 16383, raw: 'map(0x0000, 0x3fff).rom()', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 618, sourceColumn: 2, sourceEndLine: 618, rom: true};
MERGE (n:KG {id: 'map:m52_state.main_map/range1'}) SET n:AddressRange SET n += {start: 32768, end: 33791, raw: 'map(0x8000, 0x83ff).ram().w(FUNC(m52_state::videoram_w)).share(m_videoram)', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 619, sourceColumn: 2, sourceEndLine: 619, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'handler:m52_state.videoram_w'}) SET n:Handler SET n += {method: 'videoram_w', ownerClass: 'm52_state', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 372, sourceColumn: 1, sourceEndLine: 376, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[offset] = data;
	m_tx_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:m52_state.main_map/range2'}) SET n:AddressRange SET n += {start: 33792, end: 34815, raw: 'map(0x8400, 0x87ff).ram().w(FUNC(m52_state::colorram_w)).share(m_colorram)', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 620, sourceColumn: 2, sourceEndLine: 620, ram: true, share: 'colorram'};
MERGE (n:KG {id: 'handler:m52_state.colorram_w'}) SET n:Handler SET n += {method: 'colorram_w', ownerClass: 'm52_state', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 379, sourceColumn: 1, sourceEndLine: 383, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_colorram[offset] = data;
	m_tx_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:m52_state.main_map/range3'}) SET n:AddressRange SET n += {start: 34816, end: 34816, raw: 'map(0x8800, 0x8800).mirror(0x07ff).r(FUNC(m52_state::protection_r))', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 621, sourceColumn: 2, sourceEndLine: 621, mirror: 2047};
MERGE (n:KG {id: 'handler:m52_state.protection_r'}) SET n:Handler SET n += {method: 'protection_r', ownerClass: 'm52_state', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 396, sourceColumn: 1, sourceEndLine: 403, sourceParameters: '', sourceBody: 'int popcount = 0;

	for (int temp = m_bgxpos[0] & 0x7f; temp != 0; temp >>= 1)
		popcount += temp & 1;
	return popcount ^ (m_bgxpos[0] >> 7);'};
MERGE (n:KG {id: 'map:m52_state.main_map/range4'}) SET n:AddressRange SET n += {start: 51200, end: 52223, raw: 'map(0xc800, 0xcbff).mirror(0x0400).writeonly().share(m_spriteram)', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 622, sourceColumn: 2, sourceEndLine: 622, mirror: 1024, writeonly: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:m52_state.main_map/range5'}) SET n:AddressRange SET n += {start: 53248, end: 53248, raw: 'map(0xd000, 0xd000).mirror(0x07fc).w("irem_audio", FUNC(irem_audio_device::cmd_w))', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 623, sourceColumn: 2, sourceEndLine: 623, mirror: 2044};
MERGE (n:KG {id: 'handler:irem_audio_device.cmd_w'}) SET n:Handler SET n += {method: 'cmd_w', ownerClass: 'irem_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 84, sourceColumn: 1, sourceEndLine: 89, sourceParameters: 'uint8_t data', sourceBody: 'm_soundlatch = data;
	if ((data & 0x80) == 0)
		m_cpu->set_input_line(0, ASSERT_LINE);'};
MERGE (n:KG {id: 'map:m52_state.main_map/range6'}) SET n:AddressRange SET n += {start: 53249, end: 53249, raw: 'map(0xd001, 0xd001).mirror(0x07fc).w(FUNC(m52_state::flipscreen_w))', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 624, sourceColumn: 2, sourceEndLine: 624, mirror: 2044};
MERGE (n:KG {id: 'handler:m52_state.flipscreen_w'}) SET n:Handler SET n += {method: 'flipscreen_w', ownerClass: 'm52_state', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 438, sourceColumn: 1, sourceEndLine: 445, sourceParameters: 'uint8_t data', sourceBody: '// screen flip is handled both by software and hardware
	flip_screen_set((data & 0x01) ^ (~m_dsw2->read() & 0x01));

	machine().bookkeeping().coin_counter_w(0, data & 0x02);
	machine().bookkeeping().coin_counter_w(1, data & 0x20);', inputMembers: ['m_dsw2=DSW2']};
MERGE (n:KG {id: 'map:m52_state.main_map/range7'}) SET n:AddressRange SET n += {start: 53248, end: 53248, raw: 'map(0xd000, 0xd000).mirror(0x07f8).portr("IN0")', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 625, sourceColumn: 2, sourceEndLine: 625, mirror: 2040, portRead: 'IN0'};
MERGE (n:KG {id: 'map:m52_state.main_map/range8'}) SET n:AddressRange SET n += {start: 53249, end: 53249, raw: 'map(0xd001, 0xd001).mirror(0x07f8).portr("IN1")', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 626, sourceColumn: 2, sourceEndLine: 626, mirror: 2040, portRead: 'IN1'};
MERGE (n:KG {id: 'map:m52_state.main_map/range9'}) SET n:AddressRange SET n += {start: 53250, end: 53250, raw: 'map(0xd002, 0xd002).mirror(0x07f8).portr("IN2")', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 627, sourceColumn: 2, sourceEndLine: 627, mirror: 2040, portRead: 'IN2'};
MERGE (n:KG {id: 'map:m52_state.main_map/range10'}) SET n:AddressRange SET n += {start: 53251, end: 53251, raw: 'map(0xd003, 0xd003).mirror(0x07f8).portr("DSW1")', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 628, sourceColumn: 2, sourceEndLine: 628, mirror: 2040, portRead: 'DSW1'};
MERGE (n:KG {id: 'map:m52_state.main_map/range11'}) SET n:AddressRange SET n += {start: 53252, end: 53252, raw: 'map(0xd004, 0xd004).mirror(0x07f8).portr("DSW2")', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 629, sourceColumn: 2, sourceEndLine: 629, mirror: 2040, portRead: 'DSW2'};
MERGE (n:KG {id: 'map:m52_state.main_map/range12'}) SET n:AddressRange SET n += {start: 57344, end: 59391, raw: 'map(0xe000, 0xe7ff).ram()', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 630, sourceColumn: 2, sourceEndLine: 630, ram: true};
MERGE (n:KG {id: 'map:m52_state.main_portmap'}) SET n:AddressMap SET n += {cls: 'm52_state', name: 'main_portmap', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 650, sourceColumn: 1, sourceEndLine: 659, globalMask: 255};
MERGE (n:KG {id: 'map:m52_state.main_portmap/range0'}) SET n:AddressRange SET n += {start: 0, end: 0, raw: 'map(0x00, 0x00).mirror(0x1f).w(FUNC(m52_state::scroll_w))', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 653, sourceColumn: 2, sourceEndLine: 653, mirror: 31};
MERGE (n:KG {id: 'handler:m52_state.scroll_w'}) SET n:Handler SET n += {method: 'scroll_w', ownerClass: 'm52_state', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 336, sourceColumn: 1, sourceEndLine: 349, sourceParameters: 'uint8_t data', sourceBody: '/*
    According to the schematics there is only one video register that holds the X scroll value
    with a NAND gate on the V64 and V128 lines to control when it\'s read, and when
    255 (via 8 pull up resistors) is used.

    So we set the first 3 quarters to 255 and the last to the scroll value
*/
	m_tx_tilemap->set_scrollx(0, 255);
	m_tx_tilemap->set_scrollx(1, 255);
	m_tx_tilemap->set_scrollx(2, 255);
	m_tx_tilemap->set_scrollx(3, -(data + 1));'};
MERGE (n:KG {id: 'map:m52_state.main_portmap/range1'}) SET n:AddressRange SET n += {start: 64, end: 64, raw: 'map(0x40, 0x40).mirror(0x1f).w(FUNC(m52_state::bgxpos_w<0>))', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 654, sourceColumn: 2, sourceEndLine: 654, mirror: 31};
MERGE (n:KG {id: 'handler:m52_state.bgxpos_w_0'}) SET n:Handler SET n += {method: 'bgxpos_w_0', ownerClass: 'm52_state', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 420, sourceColumn: 1, sourceEndLine: 423, sourceConstants: ['Which=0'], sourceParameters: 'uint8_t data', sourceBody: 'm_bgxpos[Which] = data;'};
MERGE (n:KG {id: 'map:m52_state.main_portmap/range2'}) SET n:AddressRange SET n += {start: 96, end: 96, raw: 'map(0x60, 0x60).mirror(0x1f).w(FUNC(m52_state::bgypos_w<0>))', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 655, sourceColumn: 2, sourceEndLine: 655, mirror: 31};
MERGE (n:KG {id: 'handler:m52_state.bgypos_w_0'}) SET n:Handler SET n += {method: 'bgypos_w_0', ownerClass: 'm52_state', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 414, sourceColumn: 1, sourceEndLine: 417, sourceConstants: ['Which=0'], sourceParameters: 'uint8_t data', sourceBody: 'm_bgypos[Which] = data;'};
MERGE (n:KG {id: 'map:m52_state.main_portmap/range3'}) SET n:AddressRange SET n += {start: 128, end: 128, raw: 'map(0x80, 0x80).mirror(0x1f).w(FUNC(m52_state::bgxpos_w<1>))', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 656, sourceColumn: 2, sourceEndLine: 656, mirror: 31};
MERGE (n:KG {id: 'handler:m52_state.bgxpos_w_1'}) SET n:Handler SET n += {method: 'bgxpos_w_1', ownerClass: 'm52_state', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 420, sourceColumn: 1, sourceEndLine: 423, sourceConstants: ['Which=1'], sourceParameters: 'uint8_t data', sourceBody: 'm_bgxpos[Which] = data;'};
MERGE (n:KG {id: 'map:m52_state.main_portmap/range4'}) SET n:AddressRange SET n += {start: 160, end: 160, raw: 'map(0xa0, 0xa0).mirror(0x1f).w(FUNC(m52_state::bgypos_w<1>))', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 657, sourceColumn: 2, sourceEndLine: 657, mirror: 31};
MERGE (n:KG {id: 'handler:m52_state.bgypos_w_1'}) SET n:Handler SET n += {method: 'bgypos_w_1', ownerClass: 'm52_state', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 414, sourceColumn: 1, sourceEndLine: 417, sourceConstants: ['Which=1'], sourceParameters: 'uint8_t data', sourceBody: 'm_bgypos[Which] = data;'};
MERGE (n:KG {id: 'map:m52_state.main_portmap/range5'}) SET n:AddressRange SET n += {start: 192, end: 192, raw: 'map(0xc0, 0xc0).mirror(0x1f).w(FUNC(m52_state::bgcontrol_w))', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 658, sourceColumn: 2, sourceEndLine: 658, mirror: 31};
MERGE (n:KG {id: 'handler:m52_state.bgcontrol_w'}) SET n:Handler SET n += {method: 'bgcontrol_w', ownerClass: 'm52_state', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 425, sourceColumn: 1, sourceEndLine: 428, sourceParameters: 'uint8_t data', sourceBody: 'm_bgcontrol = data;'};
MERGE (n:KG {id: 'map:irem_audio_device.m52_small_sound_map'}) SET n:AddressMap SET n += {cls: 'irem_audio_device', name: 'm52_small_sound_map', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 360, sourceColumn: 1, sourceEndLine: 366, globalMask: 32767};
MERGE (n:KG {id: 'map:irem_audio_device.m52_small_sound_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 4095, raw: 'map(0x0000, 0x0fff).w(FUNC(irem_audio_device::m52_adpcm_w))', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 363, sourceColumn: 2, sourceEndLine: 363};
MERGE (n:KG {id: 'handler:irem_audio_device.m52_adpcm_w'}) SET n:Handler SET n += {method: 'm52_adpcm_w', ownerClass: 'irem_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 225, sourceColumn: 1, sourceEndLine: 236, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'if (offset & 1)
	{
		m_adpcm1->data_w(data);
	}
	if (offset & 2)
	{
		if (m_adpcm2 != nullptr)
			m_adpcm2->data_w(data);
	}'};
MERGE (n:KG {id: 'map:irem_audio_device.m52_small_sound_map/range1'}) SET n:AddressRange SET n += {start: 4096, end: 8191, raw: 'map(0x1000, 0x1fff).w(FUNC(irem_audio_device::sound_irq_ack_w))', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 364, sourceColumn: 2, sourceEndLine: 364};
MERGE (n:KG {id: 'handler:irem_audio_device.sound_irq_ack_w'}) SET n:Handler SET n += {method: 'sound_irq_ack_w', ownerClass: 'irem_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 218, sourceColumn: 1, sourceEndLine: 222, sourceParameters: 'uint8_t data', sourceBody: 'if ((m_soundlatch & 0x80) != 0)
		m_cpu->set_input_line(0, CLEAR_LINE);'};
MERGE (n:KG {id: 'map:irem_audio_device.m52_small_sound_map/range2'}) SET n:AddressRange SET n += {start: 8192, end: 32767, raw: 'map(0x2000, 0x7fff).rom()', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 365, sourceColumn: 2, sourceEndLine: 365, rom: true};
MERGE (n:KG {id: 'machine:m52_state.m52'}) SET n:MachineConfig SET n += {cls: 'm52_state', name: 'm52', calls: [], stateMembers: ['{"name":"m_spritelimit","bits":32,"signed":true}', '{"name":"m_do_bg_fills","bits":1}', '{"name":"m_bgxpos","bits":8,"arrayLength":2}', '{"name":"m_bgypos","bits":8,"arrayLength":2}', '{"name":"m_bgcontrol","bits":8}'], resetHandlers: ['m52_state.machine_reset'], startHandlers: ['m52_state.video_start'], sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 945, sourceColumn: 1, sourceEndLine: 969};
MERGE (n:KG {id: 'handler:m52_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'm52_state', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 936, sourceColumn: 1, sourceEndLine: 943, sourceParameters: '', sourceBody: 'm_bgxpos[0] = 0;
	m_bgypos[0] = 0;
	m_bgxpos[1] = 0;
	m_bgypos[1] = 0;
	m_bgcontrol = 0;'};
MERGE (n:KG {id: 'handler:m52_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'm52_state', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 295, sourceColumn: 1, sourceEndLine: 312, sourceParameters: '', sourceBody: 'm_tx_tilemap = &machine().tilemap().create(*m_tx_gfxdecode, tilemap_get_info_delegate(*this, FUNC(m52_state::get_tile_info)), TILEMAP_SCAN_ROWS, 8, 8, 32, 32);

	m_tx_tilemap->set_transparent_pen(0);
	m_tx_tilemap->set_scrolldx(127, 127);
	m_tx_tilemap->set_scrolldy(16, 16);
	m_tx_tilemap->set_scroll_rows(4); // only lines 192-256 scroll

	init_palette();

	save_item(NAME(m_bgxpos));
	save_item(NAME(m_bgypos));
	save_item(NAME(m_bgcontrol));

	m_spritelimit = 0x100 - 4;
	m_do_bg_fills = true;'};
MERGE (n:KG {id: 'handler:m52_state.init_palette'}) SET n:Handler SET n += {method: 'init_palette', ownerClass: 'm52_state', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 164, sourceColumn: 1, sourceEndLine: 224, sourceParameters: '', sourceBody: 'constexpr int resistances_3[3] = { 1000, 470, 220 };
	constexpr int resistances_2[2] = { 470, 220 };
	double weights_r[3], weights_g[3], weights_b[3], scale;

	// compute palette information for characters/backgrounds
	scale = compute_resistor_weights(0, 255, -1.0,
			3, resistances_3, weights_r, 0, 0,
			3, resistances_3, weights_g, 0, 0,
			2, resistances_2, weights_b, 0, 0);

	// character palette
	const uint8_t *char_pal = memregion("tx_pal")->base();
	for (int i = 0; i < 512; i++)
	{
		uint8_t const promval = char_pal[i];
		int const r = combine_weights(weights_r, BIT(promval, 0), BIT(promval, 1), BIT(promval, 2));
		int const g = combine_weights(weights_g, BIT(promval, 3), BIT(promval, 4), BIT(promval, 5));
		int const b = combine_weights(weights_b, BIT(promval, 6), BIT(promval, 7));

		m_tx_palette->set_pen_color(i, rgb_t(r, g, b));
	}

	// background palette
	const uint8_t *back_pal = memregion("bg_pal")->base();
	for (int i = 0; i < 32; i++)
	{
		uint8_t promval = back_pal[i];
		int r = combine_weights(weights_r, BIT(promval, 0), BIT(promval, 1), BIT(promval, 2));
		int g = combine_weights(weights_g, BIT(promval, 3), BIT(promval, 4), BIT(promval, 5));
		int b = combine_weights(weights_b, BIT(promval, 6), BIT(promval, 7));

		m_bg_palette->set_indirect_color(i, rgb_t(r, g, b));
	}

	/* background
	 the palette is a 32x8 PROM with many colors repeated. The address of
	 the colors to pick is as follows:
	 xbb00: mountains
	 0xxbb: hills
	 1xxbb: city

	 this seems hacky, surely all bytes in the PROM should be used, not just picking the ones that give the colours we want?

	 */
	m_bg_palette->set_pen_indirect(0 * 4 + 0, 0);
	m_bg_palette->set_pen_indirect(0 * 4 + 1, 4);
	m_bg_palette->set_pen_indirect(0 * 4 + 2, 8);
	m_bg_palette->set_pen_indirect(0 * 4 + 3, 12);
	m_bg_palette->set_pen_indirect(1 * 4 + 0, 0);
	m_bg_palette->set_pen_indirect(1 * 4 + 1, 1);
	m_bg_palette->set_pen_indirect(1 * 4 + 2, 2);
	m_bg_palette->set_pen_indirect(1 * 4 + 3, 3);
	m_bg_palette->set_pen_indirect(2 * 4 + 0, 0);
	m_bg_palette->set_pen_indirect(2 * 4 + 1, 16 + 1);
	m_bg_palette->set_pen_indirect(2 * 4 + 2, 16 + 2);
	m_bg_palette->set_pen_indirect(2 * 4 + 3, 16 + 3);

	init_sprite_palette(resistances_3, resistances_2, weights_r, weights_g, weights_b, scale);'};
MERGE (n:KG {id: 'handler:m52_state.init_sprite_palette'}) SET n:Handler SET n += {method: 'init_sprite_palette', ownerClass: 'm52_state', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 227, sourceColumn: 1, sourceEndLine: 255, sourceParameters: 'const int *resistances_3, const int *resistances_2, double (&weights_r)[N], double (&weights_g)[O], double (&weights_b)[P], double scale', sourceBody: 'const uint8_t *sprite_pal = memregion("spr_pal")->base();
	const uint8_t *sprite_table = memregion("spr_clut")->base();

	// compute palette information for sprites
	compute_resistor_weights(0, 255, scale,
			2, resistances_2, weights_r, 470, 0,
			3, resistances_3, weights_g, 470, 0,
			3, resistances_3, weights_b, 470, 0);

	// sprite palette
	for (int i = 0; i < 32; i++)
	{
		uint8_t const promval = sprite_pal[i];
		int const r = combine_weights(weights_r, BIT(promval, 6), BIT(promval, 7));
		int const g = combine_weights(weights_g, BIT(promval, 3), BIT(promval, 4), BIT(promval, 5));
		int const b = combine_weights(weights_b, BIT(promval, 0), BIT(promval, 1), BIT(promval, 2));

		m_sp_palette->set_indirect_color(i, rgb_t(r, g, b));
	}

	// sprite lookup table
	for (int i = 0; i < 256; i++)
	{
		uint8_t promval = sprite_table[i];
		m_sp_palette->set_pen_indirect(i, promval);
	}'};
MERGE (n:KG {id: 'handler:m52_state.get_tile_info'}) SET n:Handler SET n += {method: 'get_tile_info', ownerClass: 'm52_state', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 264, sourceColumn: 1, sourceEndLine: 285, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'uint8_t video = m_videoram[tile_index];
	uint8_t const color = m_colorram[tile_index];

	int flag = 0;
	int code = 0;

	code = video;

	if (color & 0x80)
	{
		code |= 0x100;
	}

	if (tile_index / 32 <= 6)
	{
		flag |= TILE_FORCE_LAYER0; // lines 0 to 6 are opaqe?
	}

	tileinfo.set(0, code, color & 0x7f, flag);'};
MERGE (n:KG {id: 'device:m52_state.m52/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 3072000, config: ['Z80(config, m_maincpu, 18.432_MHz_XTAL / 6)', 'm_maincpu->set_addrmap(AS_PROGRAM, &m52_state::main_map)', 'm_maincpu->set_addrmap(AS_IO, &m52_state::main_portmap)', 'm_maincpu->set_vblank_int("screen", FUNC(m52_state::irq0_line_hold))'], sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 948, sourceColumn: 2, sourceEndLine: 948};
MERGE (n:KG {id: 'device:m52_state.m52/maincpu/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'set_vblank_int', operation: 'set_vblank_int', raw: 'm_maincpu->set_vblank_int("screen", FUNC(m52_state::irq0_line_hold))', ownerTag: 'maincpu', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 951, sourceColumn: 2, sourceEndLine: 951, targetTag: 'screen', targetClass: 'm52_state', targetMethod: 'irq0_line_hold'};
MERGE (n:KG {id: 'handler:m52_state.irq0_line_hold'}) SET n:Handler SET n += {method: 'irq0_line_hold', ownerClass: 'm52_state', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 951, sourceColumn: 2, sourceEndLine: 951};
MERGE (n:KG {id: 'device:m52_state.m52/sp_palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'sp_palette', clock: null, config: ['PALETTE(config, m_sp_palette).set_entries(256, 32)'], sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 954, sourceColumn: 2, sourceEndLine: 954};
MERGE (n:KG {id: 'device:m52_state.m52/sp_gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'sp_gfxdecode', clock: null, config: ['GFXDECODE(config, m_sp_gfxdecode, m_sp_palette, gfx_m52_sp)'], sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 955, sourceColumn: 2, sourceEndLine: 955, clockExpr: 'm_sp_palette'};
MERGE (n:KG {id: 'device:m52_state.m52/tx_palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'tx_palette', clock: null, config: ['PALETTE(config, m_tx_palette).set_entries(512)'], sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 957, sourceColumn: 2, sourceEndLine: 957};
MERGE (n:KG {id: 'device:m52_state.m52/tx_gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'tx_gfxdecode', clock: null, config: ['GFXDECODE(config, m_tx_gfxdecode, m_tx_palette, gfx_m52_tx)'], sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 958, sourceColumn: 2, sourceEndLine: 958, clockExpr: 'm_tx_palette'};
MERGE (n:KG {id: 'device:m52_state.m52/bg_palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'bg_palette', clock: null, config: ['PALETTE(config, m_bg_palette).set_entries(3 * 4, 32)'], sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 960, sourceColumn: 2, sourceEndLine: 960};
MERGE (n:KG {id: 'device:m52_state.m52/bg_gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'bg_gfxdecode', clock: null, config: ['GFXDECODE(config, m_bg_gfxdecode, m_bg_palette, gfx_m52_bg)'], sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 961, sourceColumn: 2, sourceEndLine: 961, clockExpr: 'm_bg_palette'};
MERGE (n:KG {id: 'device:m52_state.m52/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(18.432_MHz_XTAL / 3, 384, 136, 376, 282, 22, 274)', 'm_screen->set_screen_update(FUNC(m52_state::screen_update))'], sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 963, sourceColumn: 2, sourceEndLine: 963, configCalls: ['set_raw(6144000,384,136,376,282,22,274)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6144000, 384, 136, 376, 282, 22, 274], screenRawExpr: ['18.432_MHz_XTAL / 3', '384', '136', '376', '282', '22', '274']};
MERGE (n:KG {id: 'device:m52_state.m52/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(m52_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 965, sourceColumn: 2, sourceEndLine: 965, targetClass: 'm52_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:m52_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'm52_state', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 579, sourceColumn: 1, sourceEndLine: 606, sourceParameters: 'screen_device &screen, bitmap_rgb32 &bitmap, const rectangle &cliprect', sourceBody: 'const pen_t *paldata = m_sp_palette->pens();

	bitmap.fill(paldata[0], cliprect);

	if (!(m_bgcontrol & 0x20))
	{
		if (!(m_bgcontrol & 0x10))
			draw_background(bitmap, cliprect, m_bgxpos[1], m_bgypos[1], 0); // distant mountains

		// only one of these be drawn at once (they share the same scroll register) (alpha1v leaves everything enabled)
		if (!(m_bgcontrol & 0x02))
			draw_background(bitmap, cliprect, m_bgxpos[0], m_bgypos[0], 1); // hills
		else if (!(m_bgcontrol & 0x04))
			draw_background(bitmap, cliprect, m_bgxpos[0], m_bgypos[0], 2); // cityscape
	}

	m_tx_tilemap->set_flip(flip_screen() ? TILEMAP_FLIPX | TILEMAP_FLIPY : 0);

	m_tx_tilemap->draw(screen, bitmap, cliprect, 0, 0);

	// draw the sprites
	for (int offs = 0x3c; offs <= m_spritelimit; offs += 0x40)
		draw_sprites(bitmap, cliprect, offs);

	return 0;'};
MERGE (n:KG {id: 'handler:m52_state.draw_background'}) SET n:Handler SET n += {method: 'draw_background', ownerClass: 'm52_state', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 460, sourceColumn: 1, sourceEndLine: 514, sourceConstants: ['BGHEIGHT=128'], sourceParameters: 'bitmap_rgb32 &bitmap, const rectangle &cliprect, int xpos, int ypos, int image', sourceBody: 'rectangle rect;
	const rectangle &visarea = m_screen->visible_area();
	const pen_t *paldata = m_bg_palette->pens();
	constexpr uint8_t BGHEIGHT = 128;


	if (flip_screen())
	{
		xpos = 264 - xpos;
		ypos = 264 - ypos - BGHEIGHT;
	}

	xpos += 124;

	// this may not be correct
	ypos += 16;


	m_bg_gfxdecode->gfx(image)->transpen(bitmap, cliprect,
		0, 0,
		flip_screen(),
		flip_screen(),
		xpos,
		ypos, 0);


	m_bg_gfxdecode->gfx(image)->transpen(bitmap, cliprect,
		0, 0,
		flip_screen(),
		flip_screen(),
		xpos - 256,
		ypos, 0);

	// create a solid fill below the 64 pixel high bg images
	if (m_do_bg_fills)
	{
		rect.min_x = visarea.min_x;
		rect.max_x = visarea.max_x;

		if (flip_screen())
		{
			rect.min_y = ypos - BGHEIGHT;
			rect.max_y = ypos - 1;
		}
		else
		{
			rect.min_y = ypos + BGHEIGHT;
			rect.max_y = ypos + 2 * BGHEIGHT - 1;
		}

		bitmap.fill(paldata[m_bg_gfxdecode->gfx(image)->colorbase() + 3], rect);
	}'};
MERGE (n:KG {id: 'handler:m52_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'm52_state', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 524, sourceColumn: 1, sourceEndLine: 569, sourceParameters: 'bitmap_rgb32 &bitmap, const rectangle &cliprect, int initoffs', sourceBody: '// draw the sprites
	for (int offs = initoffs; offs >= (initoffs & 0xc0); offs -= 4)
	{
		int sy = 257 - m_spriteram[offs];
		int const color = m_spriteram[offs + 1] & 0x3f;
		int flipx = m_spriteram[offs + 1] & 0x40;
		int flipy = m_spriteram[offs + 1] & 0x80;
		int const code = m_spriteram[offs + 2];
		int sx = m_spriteram[offs + 3];

		// sprites from offsets $00-$7F are processed in the upper half of the frame
		// sprites from offsets $80-$FF are processed in the lower half of the frame
		rectangle clip = cliprect;
		if (!(offs & 0x80))
			clip.min_y = 0, clip.max_y = 127;
		else
			clip.min_y = 128, clip.max_y = 255;

		// adjust for flipping
		if (flip_screen())
		{
			int temp = clip.min_y;
			clip.min_y = 255 - clip.max_y;
			clip.max_y = 255 - temp;
			flipx = !flipx;
			flipy = !flipy;
			sx = 238 - sx;
			sy = 282 - sy;
		}

		sx += 129;

		// in theory anyways; in practice, some of the molecule-looking guys get clipped
#ifdef SPLIT_SPRITES
		sect_rect(&clip, cliprect);
#else
		clip = cliprect;
#endif

		m_sp_gfxdecode->gfx(0)->transmask(bitmap, clip,
			code, color, flipx, flipy, sx, sy,
			m_sp_palette->transpen_mask(*m_sp_gfxdecode->gfx(0), color,  0));
	}'};
MERGE (n:KG {id: 'device:m52_state.m52/irem_audio'}) SET n:Device SET n += {type: 'IREM_M52_SOUNDC_AUDIO', tag: 'irem_audio', clock: 0, config: ['IREM_M52_SOUNDC_AUDIO(config, "irem_audio")'], cls: 'm52_soundc_audio_device', clsHierarchy: ['m52_soundc_audio_device', 'irem_audio_device'], sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 968, sourceColumn: 2, sourceEndLine: 968};
MERGE (n:KG {id: 'handler:irem_audio_device.soundlatch_r'}) SET n:Handler SET n += {method: 'soundlatch_r', ownerClass: 'irem_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 98, sourceColumn: 1, sourceEndLine: 101, sourceParameters: '', sourceBody: 'return m_soundlatch;'};
MERGE (n:KG {id: 'handler:irem_audio_device.ay8910_45M_portb_w'}) SET n:Handler SET n += {method: 'ay8910_45M_portb_w', ownerClass: 'irem_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 178, sourceColumn: 1, sourceEndLine: 189, sourceParameters: 'uint8_t data', sourceBody: '/* bits 2-4 select MSM5205 clock & 3b/4b playback mode */
	m_adpcm1->playmode_w((data >> 2) & 7);
	if (m_adpcm2 != nullptr)
		m_adpcm2->playmode_w(((data >> 2) & 4) | 3); /* always in slave mode */

	/* bits 0 and 1 reset the two chips */
	m_adpcm1->reset_w(data & 1);
	if (m_adpcm2 != nullptr)
		m_adpcm2->reset_w(data & 2);'};
MERGE (n:KG {id: 'handler:irem_audio_device.ay8910_45L_porta_w'}) SET n:Handler SET n += {method: 'ay8910_45L_porta_w', ownerClass: 'irem_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 192, sourceColumn: 1, sourceEndLine: 208, sourceParameters: 'uint8_t data', sourceBody: '/*
	 *  45L 21 IOA0  ==> BD
	 *  45L 20 IOA1  ==> SD
	 *  45L 19 IOA2  ==> OH
	 *  45L 18 IOA3  ==> CH
	 *
	 */
	if (m_audio_BD) m_audio_BD->write_line(data & 0x01 ? 1: 0);
	if (m_audio_SD) m_audio_SD->write_line(data & 0x02 ? 1: 0);
	if (m_audio_OH) m_audio_OH->write_line(data & 0x04 ? 1: 0);
	if (m_audio_CH) m_audio_CH->write_line(data & 0x08 ? 1: 0);
#ifdef MAME_DEBUG
	if (data & 0x0f) popmessage("analog sound %x",data&0x0f);
#endif'};
MERGE (n:KG {id: 'machine:m52_soundc_audio_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'm52_soundc_audio_device', name: 'device_add_mconfig', calls: [], stateMembers: ['{"name":"m_port1","bits":8}', '{"name":"m_port2","bits":8}', '{"name":"m_soundlatch","bits":8}'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 466, sourceColumn: 1, sourceEndLine: 498};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound'}) SET n:Device SET n += {type: 'M6803', tag: 'iremsound', clock: 3579545, config: ['m6803_cpu_device &cpu(M6803(config, m_cpu, XTAL(3\'579\'545)))', 'cpu.set_addrmap(AS_PROGRAM, &m52_soundc_audio_device::m52_small_sound_map)', 'cpu.in_p1_cb().set(FUNC(m52_soundc_audio_device::m6803_port1_r))', 'cpu.out_p1_cb().set(FUNC(m52_soundc_audio_device::m6803_port1_w))', 'cpu.in_p2_cb().set(FUNC(m52_soundc_audio_device::m6803_port2_r))', 'cpu.out_p2_cb().set(FUNC(m52_soundc_audio_device::m6803_port2_w))'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 469, sourceColumn: 2, sourceEndLine: 469};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound/callback:iremsound:0'}) SET n:Callback SET n += {signal: 'in_p1_cb', operation: 'set', raw: 'cpu.in_p1_cb().set(FUNC(m52_soundc_audio_device::m6803_port1_r))', ownerTag: 'iremsound', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 471, sourceColumn: 2, sourceEndLine: 471, targetClass: 'm52_soundc_audio_device', targetMethod: 'm6803_port1_r'};
MERGE (n:KG {id: 'handler:m52_soundc_audio_device.m6803_port1_r'}) SET n:Handler SET n += {method: 'm6803_port1_r', ownerClass: 'm52_soundc_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 149, sourceColumn: 1, sourceEndLine: 157, sourceParameters: '', sourceBody: '/* PSG 0 or 1? */
	if (m_port2 & 0x08)
		return m_ay_45M->data_r();
	if (m_port2 & 0x10)
		return m_ay_45L->data_r();
	return 0xff;'};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound/callback:iremsound:1'}) SET n:Callback SET n += {signal: 'out_p1_cb', operation: 'set', raw: 'cpu.out_p1_cb().set(FUNC(m52_soundc_audio_device::m6803_port1_w))', ownerTag: 'iremsound', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 472, sourceColumn: 2, sourceEndLine: 472, targetClass: 'm52_soundc_audio_device', targetMethod: 'm6803_port1_w'};
MERGE (n:KG {id: 'handler:m52_soundc_audio_device.m6803_port1_w'}) SET n:Handler SET n += {method: 'm6803_port1_w', ownerClass: 'm52_soundc_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 109, sourceColumn: 1, sourceEndLine: 112, sourceParameters: 'uint8_t data', sourceBody: 'm_port1 = data;'};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound/callback:iremsound:2'}) SET n:Callback SET n += {signal: 'in_p2_cb', operation: 'set', raw: 'cpu.in_p2_cb().set(FUNC(m52_soundc_audio_device::m6803_port2_r))', ownerTag: 'iremsound', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 473, sourceColumn: 2, sourceEndLine: 473, targetClass: 'm52_soundc_audio_device', targetMethod: 'm6803_port2_r'};
MERGE (n:KG {id: 'handler:m52_soundc_audio_device.m6803_port2_r'}) SET n:Handler SET n += {method: 'm6803_port2_r', ownerClass: 'm52_soundc_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 160, sourceColumn: 1, sourceEndLine: 168, sourceParameters: '', sourceBody: '/*
	 * Pin21, 6803 (Port 21) tied with 4.7k to +5V
	 *
	 */
	//printf("port2 read\\n"); // used by 10yard
	return 0x0;'};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound/callback:iremsound:3'}) SET n:Callback SET n += {signal: 'out_p2_cb', operation: 'set', raw: 'cpu.out_p2_cb().set(FUNC(m52_soundc_audio_device::m6803_port2_w))', ownerTag: 'iremsound', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 474, sourceColumn: 2, sourceEndLine: 474, targetClass: 'm52_soundc_audio_device', targetMethod: 'm6803_port2_w'};
MERGE (n:KG {id: 'handler:m52_soundc_audio_device.m6803_port2_w'}) SET n:Handler SET n += {method: 'm6803_port2_w', ownerClass: 'm52_soundc_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 115, sourceColumn: 1, sourceEndLine: 139, sourceParameters: 'uint8_t data', sourceBody: '/* write latch */
	if ((m_port2 & 0x01) && !(data & 0x01))
	{
		/* control or data port? */
		if (m_port2 & 0x04)
		{
			/* PSG 0 or 1? */
			if (m_port2 & 0x08)
				m_ay_45M->address_w(m_port1);
			if (m_port2 & 0x10)
				m_ay_45L->address_w(m_port1);
		}
		else
		{
			/* PSG 0 or 1? */
			if (m_port2 & 0x08)
				m_ay_45M->data_w(m_port1);
			if (m_port2 & 0x10)
				m_ay_45L->data_w(m_port1);
		}
	}
	m_port2 = data;'};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 477, sourceColumn: 2, sourceEndLine: 477};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45m'}) SET n:Device SET n += {type: 'AY8910', tag: 'ay_45m', clock: 894886.25, config: ['AY8910(config, m_ay_45M, XTAL(3\'579\'545)/4)', 'm_ay_45M->set_flags(AY8910_SINGLE_OUTPUT | AY8910_DISCRETE_OUTPUT)', 'm_ay_45M->set_resistors_load(470, 0, 0)', 'm_ay_45M->port_a_read_callback().set(FUNC(irem_audio_device::soundlatch_r))', 'm_ay_45M->port_b_write_callback().set(FUNC(irem_audio_device::ay8910_45M_portb_w))', 'm_ay_45M->add_route(0, "filtermix", 1.0, 0)'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 479, sourceColumn: 2, sourceEndLine: 479, configCalls: ['set_flags(6)', 'set_resistors_load(470,0,0)']};
MERGE (n:KG {id: 'audioroute:device:m52_soundc_audio_device.device_add_mconfig/ay_45m/0'}) SET n:AudioRoute SET n += {output: '0', target: 'filtermix', gain: 1, input: 0, raw: 'm_ay_45M->add_route(0, "filtermix", 1.0, 0)', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 484, sourceColumn: 2, sourceEndLine: 484};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45m/callback:ay_45m:0'}) SET n:Callback SET n += {signal: 'port_a_read_callback', operation: 'set', raw: 'm_ay_45M->port_a_read_callback().set(FUNC(irem_audio_device::soundlatch_r))', ownerTag: 'ay_45m', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 482, sourceColumn: 2, sourceEndLine: 482, targetClass: 'irem_audio_device', targetMethod: 'soundlatch_r'};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45m/callback:ay_45m:1'}) SET n:Callback SET n += {signal: 'port_b_write_callback', operation: 'set', raw: 'm_ay_45M->port_b_write_callback().set(FUNC(irem_audio_device::ay8910_45M_portb_w))', ownerTag: 'ay_45m', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 483, sourceColumn: 2, sourceEndLine: 483, targetClass: 'irem_audio_device', targetMethod: 'ay8910_45M_portb_w'};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45l'}) SET n:Device SET n += {type: 'AY8910', tag: 'ay_45l', clock: 894886.25, config: ['AY8910(config, m_ay_45L, XTAL(3\'579\'545)/4)', 'm_ay_45L->set_flags(AY8910_SINGLE_OUTPUT | AY8910_DISCRETE_OUTPUT)', 'm_ay_45L->set_resistors_load(470, 0, 0)', 'm_ay_45L->port_a_write_callback().set(FUNC(irem_audio_device::ay8910_45L_porta_w))', 'm_ay_45L->add_route(0, "filtermix", 1.0, 1)'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 486, sourceColumn: 2, sourceEndLine: 486, configCalls: ['set_flags(6)', 'set_resistors_load(470,0,0)']};
MERGE (n:KG {id: 'audioroute:device:m52_soundc_audio_device.device_add_mconfig/ay_45l/0'}) SET n:AudioRoute SET n += {output: '0', target: 'filtermix', gain: 1, input: 1, raw: 'm_ay_45L->add_route(0, "filtermix", 1.0, 1)', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 490, sourceColumn: 2, sourceEndLine: 490};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45l/callback:ay_45l:0'}) SET n:Callback SET n += {signal: 'port_a_write_callback', operation: 'set', raw: 'm_ay_45L->port_a_write_callback().set(FUNC(irem_audio_device::ay8910_45L_porta_w))', ownerTag: 'ay_45l', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 489, sourceColumn: 2, sourceEndLine: 489, targetClass: 'irem_audio_device', targetMethod: 'ay8910_45L_porta_w'};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/msm1'}) SET n:Device SET n += {type: 'MSM5205', tag: 'msm1', clock: 384000, config: ['MSM5205(config, m_adpcm1, XTAL(384\'000))', 'm_adpcm1->vck_callback().set_inputline(m_cpu, INPUT_LINE_NMI)', 'm_adpcm1->set_prescaler_selector(msm5205_device::S96_4B)', 'm_adpcm1->add_route(0, "filtermix", 1.0, 2)'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 492, sourceColumn: 2, sourceEndLine: 492};
MERGE (n:KG {id: 'audioroute:device:m52_soundc_audio_device.device_add_mconfig/msm1/0'}) SET n:AudioRoute SET n += {output: '0', target: 'filtermix', gain: 1, input: 2, raw: 'm_adpcm1->add_route(0, "filtermix", 1.0, 2)', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 495, sourceColumn: 2, sourceEndLine: 495};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/msm1/callback:msm1:0'}) SET n:Callback SET n += {signal: 'vck_callback', operation: 'set_inputline', raw: 'm_adpcm1->vck_callback().set_inputline(m_cpu, INPUT_LINE_NMI)', ownerTag: 'msm1', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 493, sourceColumn: 2, sourceEndLine: 493, inputLine: 'INPUT_LINE_NMI', targetTag: 'iremsound'};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/filtermix'}) SET n:Device SET n += {type: 'DISCRETE', tag: 'filtermix', clock: null, config: ['DISCRETE(config, "filtermix", m52_sound_c_discrete).add_route(ALL_OUTPUTS, "mono", 1.0)'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 497, sourceColumn: 2, sourceEndLine: 497, clockExpr: 'm52_sound_c_discrete'};
MERGE (n:KG {id: 'audioroute:device:m52_soundc_audio_device.device_add_mconfig/filtermix/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 1, raw: 'DISCRETE(config, "filtermix", m52_sound_c_discrete).add_route(ALL_OUTPUTS, "mono", 1.0)', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 497, sourceColumn: 2, sourceEndLine: 497};
MERGE (n:KG {id: 'inputs:m52'}) SET n:InputPorts SET n += {name: 'm52', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 669, sourceColumn: 8, sourceEndLine: 669};
MERGE (n:KG {id: 'inputs:m52/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:m52/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_START1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:m52/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_START2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:m52/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_SERVICE1', modifiers: ['PORT_IMPULSE(19)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:m52/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_COIN1', defaultValue: 8};
MERGE (n:KG {id: 'inputs:m52/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 240, activeLow: true, type: 'IPT_UNUSED', defaultValue: 240};
MERGE (n:KG {id: 'inputs:m52/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:m52/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:m52/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:m52/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:m52/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:m52/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_UNUSED', defaultValue: 16};
MERGE (n:KG {id: 'inputs:m52/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', defaultValue: 32};
MERGE (n:KG {id: 'inputs:m52/IN1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNUSED', defaultValue: 64};
MERGE (n:KG {id: 'inputs:m52/IN1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 128};
MERGE (n:KG {id: 'inputs:m52/IN2'}) SET n:Port SET n += {tag: 'IN2', modify: false};
MERGE (n:KG {id: 'inputs:m52/IN2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:m52/IN2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:m52/IN2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:m52/IN2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:m52/IN2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_COIN2', defaultValue: 16};
MERGE (n:KG {id: 'inputs:m52/IN2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_COCKTAIL'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:m52/IN2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNUSED', defaultValue: 64};
MERGE (n:KG {id: 'inputs:m52/IN2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:m52/DSW2'}) SET n:Port SET n += {tag: 'DSW2', modify: false};
MERGE (n:KG {id: 'inputs:m52/DSW2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, modifiers: ['PORT_DIPLOCATION("SW2:1")'], name: 'Flip Screen', defaultValue: 1, location: 'SW2:1', settings: ['1=Off', '0=On']};
MERGE (n:KG {id: 'inputs:m52/DSW2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, modifiers: ['PORT_DIPLOCATION("SW2:2")'], name: 'Cabinet', defaultValue: 0, location: 'SW2:2', settings: ['0=Upright', '2=Cocktail']};
MERGE (n:KG {id: 'inputs:m52/DSW2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 4, modifiers: ['PORT_DIPLOCATION("SW2:3")'], name: 'Coin Mode', defaultValue: 4, location: 'SW2:3', settings: ['4=Mode 1', '0=Mode 2']};
MERGE (n:KG {id: 'inputs:m52/DSW2/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 8, name: 'Unknown', defaultValue: 8};
MERGE (n:KG {id: 'inputs:m52/DSW2/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 16, name: 'Unknown', defaultValue: 16};
MERGE (n:KG {id: 'inputs:m52/DSW2/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 32, name: 'Unknown', defaultValue: 32};
MERGE (n:KG {id: 'inputs:m52/DSW2/f6'}) SET n:PortField SET n += {kind: 'dip', mask: 64, modifiers: ['PORT_DIPLOCATION("SW2:7")'], name: 'Invulnerability (Cheat)', defaultValue: 64, location: 'SW2:7', settings: ['64=Off', '0=On']};
MERGE (n:KG {id: 'inputs:m52/DSW2/f7'}) SET n:PortField SET n += {kind: 'service', mask: 128, activeLow: true, defaultValue: 128};
MERGE (n:KG {id: 'inputs:mpatrol'}) SET n:InputPorts SET n += {name: 'mpatrol', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 722, sourceColumn: 8, sourceEndLine: 722};
MERGE (n:KG {id: 'inputs:mpatrol/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: true};
MERGE (n:KG {id: 'inputs:mpatrol/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_2WAY'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:mpatrol/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_2WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:mpatrol/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_UNUSED', defaultValue: 4};
MERGE (n:KG {id: 'inputs:mpatrol/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNUSED', defaultValue: 8};
MERGE (n:KG {id: 'inputs:mpatrol/IN2'}) SET n:Port SET n += {tag: 'IN2', modify: true};
MERGE (n:KG {id: 'inputs:mpatrol/IN2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_2WAY', 'PORT_COCKTAIL'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:mpatrol/IN2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_2WAY', 'PORT_COCKTAIL'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:mpatrol/IN2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_UNUSED', defaultValue: 4};
MERGE (n:KG {id: 'inputs:mpatrol/IN2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNUSED', defaultValue: 8};
MERGE (n:KG {id: 'inputs:mpatrol/DSW2'}) SET n:Port SET n += {tag: 'DSW2', modify: true};
MERGE (n:KG {id: 'inputs:mpatrol/DSW2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 8, name: 'Unused', defaultValue: 8};
MERGE (n:KG {id: 'inputs:mpatrol/DSW2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 16, modifiers: ['PORT_DIPLOCATION("SW2:5")'], name: 'Stop Mode (Cheat)', defaultValue: 16, location: 'SW2:5', settings: ['16=Off', '0=On']};
MERGE (n:KG {id: 'inputs:mpatrol/DSW2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 32, modifiers: ['PORT_DIPLOCATION("SW2:6")'], name: 'Sector Selection (Cheat)', defaultValue: 32, location: 'SW2:6', settings: ['32=Off', '0=On']};
MERGE (n:KG {id: 'inputs:mpatrol/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:mpatrol/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SW1:1,2")'], name: 'Lives', defaultValue: 2, location: 'SW1:1,2', settings: ['0=1', '1=2', '2=3', '3=5']};
MERGE (n:KG {id: 'inputs:mpatrol/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 12, modifiers: ['PORT_DIPLOCATION("SW1:3,4")'], name: 'Bonus Life', defaultValue: 12, location: 'SW1:3,4', settings: ['12=10000 30000 50000', '8=20000 40000 60000', '4=10000', '0=None']};
MERGE (n:KG {id: 'inputs:mpatrol/DSW1/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 240, modifiers: ['PORT_CONDITION("DSW2", 0x04, NOTEQUALS, 0x00)', 'PORT_DIPLOCATION(#SW1":5,6,7,8")'], name: 'Coinage', defaultValue: 240, location: '#SW1":5,6,7,8"', settings: ['144=7C 1C', '160=6C 1C', '176=5C 1C', '192=4C 1C', '208=3C 1C', '224=2C 1C', '240=1C 1C', '112=1C 2C', '96=1C 3C', '80=1C 4C', '64=1C 5C', '48=1C 6C', '32=1C 7C', '16=1C 8C', '0=Free Play']};
MERGE (n:KG {id: 'inputs:mpatrol/DSW1/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 48, modifiers: ['PORT_CONDITION("DSW2", 0x04, EQUALS, 0x00)', 'PORT_DIPLOCATION(#SW1":5,6")'], name: 'Coin A', defaultValue: 48, location: '#SW1":5,6"', settings: ['16=3C 1C', '32=2C 1C', '48=1C 1C', '0=Free Play']};
MERGE (n:KG {id: 'inputs:mpatrol/DSW1/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 192, modifiers: ['PORT_CONDITION("DSW2", 0x04, EQUALS, 0x00)', 'PORT_DIPLOCATION(#SW1":7,8")'], name: 'Coin B', defaultValue: 192, location: '#SW1":7,8"', settings: ['192=1C 2C', '128=1C 3C', '64=1C 5C', '0=1C 6C']};
MERGE (n:KG {id: 'gfxlayout:spritelayout'}) SET n:GfxLayout SET n += {name: 'spritelayout', width: 16, height: 16, total: 'RGN_FRAC(1,3)', planes: 3, planeOffsets: ['RGN_FRAC(2,3)', 'RGN_FRAC(0,3)', 'RGN_FRAC(1,3)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 128, 129, 130, 131, 132, 133, 134, 135], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120], charIncrement: 256};
MERGE (n:KG {id: 'gfxlayout:bgcharlayout'}) SET n:GfxLayout SET n += {name: 'bgcharlayout', width: 256, height: 128, total: 1, planes: 2, planeOffsets: [4, 0], xOffsets: [0, 1, 2, 3, 8, 9, 10, 11, 16, 17, 18, 19, 24, 25, 26, 27, 32, 33, 34, 35, 40, 41, 42, 43, 48, 49, 50, 51, 56, 57, 58, 59, 64, 65, 66, 67, 72, 73, 74, 75, 80, 81, 82, 83, 88, 89, 90, 91, 96, 97, 98, 99, 104, 105, 106, 107, 112, 113, 114, 115, 120, 121, 122, 123, 128, 129, 130, 131, 136, 137, 138, 139, 144, 145, 146, 147, 152, 153, 154, 155, 160, 161, 162, 163, 168, 169, 170, 171, 176, 177, 178, 179, 184, 185, 186, 187, 192, 193, 194, 195, 200, 201, 202, 203, 208, 209, 210, 211, 216, 217, 218, 219, 224, 225, 226, 227, 232, 233, 234, 235, 240, 241, 242, 243, 248, 249, 250, 251, 256, 257, 258, 259, 264, 265, 266, 267, 272, 273, 274, 275, 280, 281, 282, 283, 288, 289, 290, 291, 296, 297, 298, 299, 304, 305, 306, 307, 312, 313, 314, 315, 320, 321, 322, 323, 328, 329, 330, 331, 336, 337, 338, 339, 344, 345, 346, 347, 352, 353, 354, 355, 360, 361, 362, 363, 368, 369, 370, 371, 376, 377, 378, 379, 384, 385, 386, 387, 392, 393, 394, 395, 400, 401, 402, 403, 408, 409, 410, 411, 416, 417, 418, 419, 424, 425, 426, 427, 432, 433, 434, 435, 440, 441, 442, 443, 448, 449, 450, 451, 456, 457, 458, 459, 464, 465, 466, 467, 472, 473, 474, 475, 480, 481, 482, 483, 488, 489, 490, 491, 496, 497, 498, 499, 504, 505, 506, 507], yOffsets: [0, 512, 1024, 1536, 2048, 2560, 3072, 3584, 4096, 4608, 5120, 5632, 6144, 6656, 7168, 7680, 8192, 8704, 9216, 9728, 10240, 10752, 11264, 11776, 12288, 12800, 13312, 13824, 14336, 14848, 15360, 15872, 16384, 16896, 17408, 17920, 18432, 18944, 19456, 19968, 20480, 20992, 21504, 22016, 22528, 23040, 23552, 24064, 24576, 25088, 25600, 26112, 26624, 27136, 27648, 28160, 28672, 29184, 29696, 30208, 30720, 31232, 31744, 32256, 32768, 33280, 33792, 34304, 34816, 35328, 35840, 36352, 36864, 37376, 37888, 38400, 38912, 39424, 39936, 40448, 40960, 41472, 41984, 42496, 43008, 43520, 44032, 44544, 45056, 45568, 46080, 46592, 47104, 47616, 48128, 48640, 49152, 49664, 50176, 50688, 51200, 51712, 52224, 52736, 53248, 53760, 54272, 54784, 55296, 55808, 56320, 56832, 57344, 57856, 58368, 58880, 59392, 59904, 60416, 60928, 61440, 61952, 62464, 62976, 63488, 64000, 64512, 65024], charIncrement: 32768};
MERGE (n:KG {id: 'gfxlayout:gfx_8x8x2_planar'}) SET n:GfxLayout SET n += {name: 'gfx_8x8x2_planar', width: 8, height: 8, total: 'RGN_FRAC(1,2)', planes: 2, planeOffsets: ['RGN_FRAC(1,2)', 'RGN_FRAC(0,2)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxdecode:gfx_m52_sp'}) SET n:GfxDecode SET n += {name: 'gfx_m52_sp', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 913, sourceColumn: 8, sourceEndLine: 913};
MERGE (n:KG {id: 'gfxdecode:gfx_m52_sp/e0'}) SET n:GfxDecodeEntry SET n += {region: 'sp', offset: 0, layout: 'spritelayout', colorBase: 0, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_m52_tx'}) SET n:GfxDecode SET n += {name: 'gfx_m52_tx', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 917, sourceColumn: 8, sourceEndLine: 917};
MERGE (n:KG {id: 'gfxdecode:gfx_m52_tx/e0'}) SET n:GfxDecodeEntry SET n += {region: 'tx', offset: 0, layout: 'gfx_8x8x2_planar', colorBase: 0, colorCount: 128, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_m52_bg'}) SET n:GfxDecode SET n += {name: 'gfx_m52_bg', sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 921, sourceColumn: 8, sourceEndLine: 921};
MERGE (n:KG {id: 'gfxdecode:gfx_m52_bg/e0'}) SET n:GfxDecodeEntry SET n += {region: 'bg0', offset: 0, layout: 'bgcharlayout', colorBase: 0, colorCount: 1, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_m52_bg/e1'}) SET n:GfxDecodeEntry SET n += {region: 'bg1', offset: 0, layout: 'bgcharlayout', colorBase: 4, colorCount: 1, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_m52_bg/e2'}) SET n:GfxDecodeEntry SET n += {region: 'bg2', offset: 0, layout: 'bgcharlayout', colorBase: 8, colorCount: 1, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:mpatrol'}), (b:KG {id: 'file:src/mame/irem/m52.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 1178, sourceColumn: 1, sourceEndLine: 1178};
MATCH (a:KG {id: 'game:mpatrol'}), (b:KG {id: 'machine:m52_state.m52'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:mpatrol'}), (b:KG {id: 'inputs:mpatrol'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:mpatrol'}), (b:KG {id: 'romset:mpatrol'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/m52.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/m52.cpp'}), (b:KG {id: 'file:irem.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/m52.cpp'}), (b:KG {id: 'file:iremipt.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/m52.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/m52.cpp'}), (b:KG {id: 'file:video/resnet.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/m52.cpp'}), (b:KG {id: 'file:emupal.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/m52.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/m52.cpp'}), (b:KG {id: 'file:tilemap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:m52_state.m52'}), (b:KG {id: 'file:src/mame/irem/m52.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 945, sourceColumn: 1, sourceEndLine: 969};
MATCH (a:KG {id: 'machine:m52_state.m52'}), (b:KG {id: 'handler:m52_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:m52_state.m52'}), (b:KG {id: 'handler:m52_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:m52_state.m52'}), (b:KG {id: 'device:m52_state.m52/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m52_state.m52'}), (b:KG {id: 'device:m52_state.m52/sp_palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m52_state.m52'}), (b:KG {id: 'device:m52_state.m52/sp_gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m52_state.m52'}), (b:KG {id: 'gfxdecode:gfx_m52_sp'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'sp_gfxdecode'};
MATCH (a:KG {id: 'machine:m52_state.m52'}), (b:KG {id: 'device:m52_state.m52/tx_palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m52_state.m52'}), (b:KG {id: 'device:m52_state.m52/tx_gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m52_state.m52'}), (b:KG {id: 'gfxdecode:gfx_m52_tx'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'tx_gfxdecode'};
MATCH (a:KG {id: 'machine:m52_state.m52'}), (b:KG {id: 'device:m52_state.m52/bg_palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m52_state.m52'}), (b:KG {id: 'device:m52_state.m52/bg_gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m52_state.m52'}), (b:KG {id: 'gfxdecode:gfx_m52_bg'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'bg_gfxdecode'};
MATCH (a:KG {id: 'machine:m52_state.m52'}), (b:KG {id: 'device:m52_state.m52/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m52_state.m52'}), (b:KG {id: 'device:m52_state.m52/irem_audio'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:mpatrol'}), (b:KG {id: 'file:src/mame/irem/m52.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 722, sourceColumn: 8, sourceEndLine: 722};
MATCH (a:KG {id: 'inputs:mpatrol'}), (b:KG {id: 'inputs:m52'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:mpatrol'}), (b:KG {id: 'inputs:mpatrol/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:mpatrol'}), (b:KG {id: 'inputs:mpatrol/IN2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:mpatrol'}), (b:KG {id: 'inputs:mpatrol/DSW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:mpatrol'}), (b:KG {id: 'inputs:mpatrol/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:mpatrol'}), (b:KG {id: 'file:src/mame/irem/m52.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 989, sourceColumn: 1, sourceEndLine: 989};
MATCH (a:KG {id: 'romset:mpatrol'}), (b:KG {id: 'region:mpatrol/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mpatrol'}), (b:KG {id: 'region:mpatrol/irem_audio:iremsound'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mpatrol'}), (b:KG {id: 'region:mpatrol/tx'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mpatrol'}), (b:KG {id: 'region:mpatrol/sp'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mpatrol'}), (b:KG {id: 'region:mpatrol/bg0'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mpatrol'}), (b:KG {id: 'region:mpatrol/bg1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mpatrol'}), (b:KG {id: 'region:mpatrol/bg2'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mpatrol'}), (b:KG {id: 'region:mpatrol/tx_pal'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mpatrol'}), (b:KG {id: 'region:mpatrol/bg_pal'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mpatrol'}), (b:KG {id: 'region:mpatrol/spr_pal'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mpatrol'}), (b:KG {id: 'region:mpatrol/spr_clut'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mpatrol'}), (b:KG {id: 'region:mpatrol/unkprom'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:m52_state.video_start'}), (b:KG {id: 'handler:m52_state.init_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:m52_state.video_start'}), (b:KG {id: 'handler:m52_state.get_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m52_state.m52/maincpu'}), (b:KG {id: 'device:m52_state.m52/maincpu/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m52_state.m52/maincpu'}), (b:KG {id: 'map:m52_state.main_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:m52_state.m52/maincpu'}), (b:KG {id: 'map:m52_state.main_portmap'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'gfxdecode:gfx_m52_sp'}), (b:KG {id: 'file:src/mame/irem/m52.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 913, sourceColumn: 8, sourceEndLine: 913};
MATCH (a:KG {id: 'gfxdecode:gfx_m52_sp'}), (b:KG {id: 'gfxdecode:gfx_m52_sp/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_m52_tx'}), (b:KG {id: 'file:src/mame/irem/m52.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 917, sourceColumn: 8, sourceEndLine: 917};
MATCH (a:KG {id: 'gfxdecode:gfx_m52_tx'}), (b:KG {id: 'gfxdecode:gfx_m52_tx/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_m52_bg'}), (b:KG {id: 'file:src/mame/irem/m52.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 921, sourceColumn: 8, sourceEndLine: 921};
MATCH (a:KG {id: 'gfxdecode:gfx_m52_bg'}), (b:KG {id: 'gfxdecode:gfx_m52_bg/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_m52_bg'}), (b:KG {id: 'gfxdecode:gfx_m52_bg/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_m52_bg'}), (b:KG {id: 'gfxdecode:gfx_m52_bg/e2'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:m52_state.m52/screen'}), (b:KG {id: 'device:m52_state.m52/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m52_state.m52/irem_audio'}), (b:KG {id: 'machine:m52_soundc_audio_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'inputs:m52'}), (b:KG {id: 'file:src/mame/irem/m52.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 669, sourceColumn: 8, sourceEndLine: 669};
MATCH (a:KG {id: 'inputs:m52'}), (b:KG {id: 'inputs:m52/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:m52'}), (b:KG {id: 'inputs:m52/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:m52'}), (b:KG {id: 'inputs:m52/IN2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:m52'}), (b:KG {id: 'inputs:m52/DSW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:mpatrol/IN1'}), (b:KG {id: 'inputs:mpatrol/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mpatrol/IN1'}), (b:KG {id: 'inputs:mpatrol/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mpatrol/IN1'}), (b:KG {id: 'inputs:mpatrol/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mpatrol/IN1'}), (b:KG {id: 'inputs:mpatrol/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mpatrol/IN2'}), (b:KG {id: 'inputs:mpatrol/IN2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mpatrol/IN2'}), (b:KG {id: 'inputs:mpatrol/IN2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mpatrol/IN2'}), (b:KG {id: 'inputs:mpatrol/IN2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mpatrol/IN2'}), (b:KG {id: 'inputs:mpatrol/IN2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mpatrol/DSW2'}), (b:KG {id: 'inputs:mpatrol/DSW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mpatrol/DSW2'}), (b:KG {id: 'inputs:mpatrol/DSW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mpatrol/DSW2'}), (b:KG {id: 'inputs:mpatrol/DSW2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mpatrol/DSW1'}), (b:KG {id: 'inputs:mpatrol/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mpatrol/DSW1'}), (b:KG {id: 'inputs:mpatrol/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mpatrol/DSW1'}), (b:KG {id: 'inputs:mpatrol/DSW1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mpatrol/DSW1'}), (b:KG {id: 'inputs:mpatrol/DSW1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mpatrol/DSW1'}), (b:KG {id: 'inputs:mpatrol/DSW1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:mpatrol/maincpu'}), (b:KG {id: 'rom:mpatrol/maincpu/mpa-1.3m'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mpatrol/maincpu'}), (b:KG {id: 'rom:mpatrol/maincpu/mpa-2.3l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mpatrol/maincpu'}), (b:KG {id: 'rom:mpatrol/maincpu/mpa-3.3k'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mpatrol/maincpu'}), (b:KG {id: 'rom:mpatrol/maincpu/mpa-4.3j'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mpatrol/irem_audio:iremsound'}), (b:KG {id: 'rom:mpatrol/irem_audio:iremsound/mp-s1.1a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mpatrol/tx'}), (b:KG {id: 'rom:mpatrol/tx/mpe-4.3f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mpatrol/tx'}), (b:KG {id: 'rom:mpatrol/tx/mpe-5.3e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mpatrol/sp'}), (b:KG {id: 'rom:mpatrol/sp/mpb-2.3m'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mpatrol/sp'}), (b:KG {id: 'rom:mpatrol/sp/mpb-1.3n'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mpatrol/bg0'}), (b:KG {id: 'rom:mpatrol/bg0/mpe-1.3l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mpatrol/bg1'}), (b:KG {id: 'rom:mpatrol/bg1/mpe-2.3k'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mpatrol/bg2'}), (b:KG {id: 'rom:mpatrol/bg2/mpe-3.3h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mpatrol/tx_pal'}), (b:KG {id: 'rom:mpatrol/tx_pal/mpc-4.2a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mpatrol/bg_pal'}), (b:KG {id: 'rom:mpatrol/bg_pal/mpc-3.1m'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mpatrol/spr_pal'}), (b:KG {id: 'rom:mpatrol/spr_pal/mpc-1.1f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mpatrol/spr_clut'}), (b:KG {id: 'rom:mpatrol/spr_clut/mpc-2.2h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mpatrol/unkprom'}), (b:KG {id: 'rom:mpatrol/unkprom/mp_7621-5.7h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'handler:m52_state.init_palette'}), (b:KG {id: 'handler:m52_state.init_sprite_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m52_state.m52/maincpu/callback:maincpu:0'}), (b:KG {id: 'handler:m52_state.irq0_line_hold'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:m52_state.main_map'}), (b:KG {id: 'file:src/mame/irem/m52.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 616, sourceColumn: 1, sourceEndLine: 631};
MATCH (a:KG {id: 'map:m52_state.main_map'}), (b:KG {id: 'map:m52_state.main_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m52_state.main_map'}), (b:KG {id: 'map:m52_state.main_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m52_state.main_map'}), (b:KG {id: 'map:m52_state.main_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m52_state.main_map'}), (b:KG {id: 'map:m52_state.main_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m52_state.main_map'}), (b:KG {id: 'map:m52_state.main_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m52_state.main_map'}), (b:KG {id: 'map:m52_state.main_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m52_state.main_map'}), (b:KG {id: 'map:m52_state.main_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m52_state.main_map'}), (b:KG {id: 'map:m52_state.main_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m52_state.main_map'}), (b:KG {id: 'map:m52_state.main_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m52_state.main_map'}), (b:KG {id: 'map:m52_state.main_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m52_state.main_map'}), (b:KG {id: 'map:m52_state.main_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m52_state.main_map'}), (b:KG {id: 'map:m52_state.main_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m52_state.main_map'}), (b:KG {id: 'map:m52_state.main_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m52_state.main_portmap'}), (b:KG {id: 'file:src/mame/irem/m52.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m52.cpp', sourceLine: 650, sourceColumn: 1, sourceEndLine: 659};
MATCH (a:KG {id: 'map:m52_state.main_portmap'}), (b:KG {id: 'map:m52_state.main_portmap/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m52_state.main_portmap'}), (b:KG {id: 'map:m52_state.main_portmap/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m52_state.main_portmap'}), (b:KG {id: 'map:m52_state.main_portmap/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m52_state.main_portmap'}), (b:KG {id: 'map:m52_state.main_portmap/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m52_state.main_portmap'}), (b:KG {id: 'map:m52_state.main_portmap/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m52_state.main_portmap'}), (b:KG {id: 'map:m52_state.main_portmap/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_m52_sp/e0'}), (b:KG {id: 'gfxlayout:spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_m52_tx/e0'}), (b:KG {id: 'gfxlayout:gfx_8x8x2_planar'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_m52_bg/e0'}), (b:KG {id: 'gfxlayout:bgcharlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_m52_bg/e1'}), (b:KG {id: 'gfxlayout:bgcharlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_m52_bg/e2'}), (b:KG {id: 'gfxlayout:bgcharlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:m52_state.m52/screen/callback:screen:0'}), (b:KG {id: 'handler:m52_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:m52_soundc_audio_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/irem/irem.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 466, sourceColumn: 1, sourceEndLine: 498};
MATCH (a:KG {id: 'machine:m52_soundc_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m52_soundc_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m52_soundc_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45m'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m52_soundc_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45l'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m52_soundc_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/msm1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m52_soundc_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/filtermix'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:m52/IN0'}), (b:KG {id: 'inputs:m52/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/IN0'}), (b:KG {id: 'inputs:m52/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/IN0'}), (b:KG {id: 'inputs:m52/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/IN0'}), (b:KG {id: 'inputs:m52/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/IN0'}), (b:KG {id: 'inputs:m52/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/IN1'}), (b:KG {id: 'inputs:m52/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/IN1'}), (b:KG {id: 'inputs:m52/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/IN1'}), (b:KG {id: 'inputs:m52/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/IN1'}), (b:KG {id: 'inputs:m52/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/IN1'}), (b:KG {id: 'inputs:m52/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/IN1'}), (b:KG {id: 'inputs:m52/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/IN1'}), (b:KG {id: 'inputs:m52/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/IN1'}), (b:KG {id: 'inputs:m52/IN1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/IN2'}), (b:KG {id: 'inputs:m52/IN2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/IN2'}), (b:KG {id: 'inputs:m52/IN2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/IN2'}), (b:KG {id: 'inputs:m52/IN2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/IN2'}), (b:KG {id: 'inputs:m52/IN2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/IN2'}), (b:KG {id: 'inputs:m52/IN2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/IN2'}), (b:KG {id: 'inputs:m52/IN2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/IN2'}), (b:KG {id: 'inputs:m52/IN2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/IN2'}), (b:KG {id: 'inputs:m52/IN2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/DSW2'}), (b:KG {id: 'inputs:m52/DSW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/DSW2'}), (b:KG {id: 'inputs:m52/DSW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/DSW2'}), (b:KG {id: 'inputs:m52/DSW2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/DSW2'}), (b:KG {id: 'inputs:m52/DSW2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/DSW2'}), (b:KG {id: 'inputs:m52/DSW2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/DSW2'}), (b:KG {id: 'inputs:m52/DSW2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/DSW2'}), (b:KG {id: 'inputs:m52/DSW2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m52/DSW2'}), (b:KG {id: 'inputs:m52/DSW2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'map:m52_state.main_map/range1'}), (b:KG {id: 'handler:m52_state.videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:m52_state.main_map/range2'}), (b:KG {id: 'handler:m52_state.colorram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:m52_state.main_map/range3'}), (b:KG {id: 'handler:m52_state.protection_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:m52_state.main_map/range5'}), (b:KG {id: 'handler:irem_audio_device.cmd_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'irem_audio'};
MATCH (a:KG {id: 'map:m52_state.main_map/range6'}), (b:KG {id: 'handler:m52_state.flipscreen_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:m52_state.main_portmap/range0'}), (b:KG {id: 'handler:m52_state.scroll_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:m52_state.main_portmap/range1'}), (b:KG {id: 'handler:m52_state.bgxpos_w_0'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:m52_state.main_portmap/range2'}), (b:KG {id: 'handler:m52_state.bgypos_w_0'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:m52_state.main_portmap/range3'}), (b:KG {id: 'handler:m52_state.bgxpos_w_1'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:m52_state.main_portmap/range4'}), (b:KG {id: 'handler:m52_state.bgypos_w_1'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:m52_state.main_portmap/range5'}), (b:KG {id: 'handler:m52_state.bgcontrol_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'gfxlayout:spritelayout'}), (b:KG {id: 'file:src/mame/irem/m52.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:gfx_8x8x2_planar'}), (b:KG {id: 'file:src/mame/irem/m52.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:bgcharlayout'}), (b:KG {id: 'file:src/mame/irem/m52.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'handler:m52_state.screen_update'}), (b:KG {id: 'handler:m52_state.draw_background'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:m52_state.screen_update'}), (b:KG {id: 'handler:m52_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/irem.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/irem.cpp'}), (b:KG {id: 'file:irem.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/irem.cpp'}), (b:KG {id: 'file:cpu/m6800/m6801.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/irem.cpp'}), (b:KG {id: 'file:sound/discrete.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/irem.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound/callback:iremsound:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound/callback:iremsound:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound/callback:iremsound:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound/callback:iremsound:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound'}), (b:KG {id: 'map:irem_audio_device.m52_small_sound_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45m'}), (b:KG {id: 'audioroute:device:m52_soundc_audio_device.device_add_mconfig/ay_45m/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45m'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45m/callback:ay_45m:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45m'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45m/callback:ay_45m:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45l'}), (b:KG {id: 'audioroute:device:m52_soundc_audio_device.device_add_mconfig/ay_45l/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45l'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45l/callback:ay_45l:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/msm1'}), (b:KG {id: 'audioroute:device:m52_soundc_audio_device.device_add_mconfig/msm1/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/msm1'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/msm1/callback:msm1:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/filtermix'}), (b:KG {id: 'audioroute:device:m52_soundc_audio_device.device_add_mconfig/filtermix/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound/callback:iremsound:0'}), (b:KG {id: 'handler:m52_soundc_audio_device.m6803_port1_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound/callback:iremsound:1'}), (b:KG {id: 'handler:m52_soundc_audio_device.m6803_port1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound/callback:iremsound:2'}), (b:KG {id: 'handler:m52_soundc_audio_device.m6803_port2_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound/callback:iremsound:3'}), (b:KG {id: 'handler:m52_soundc_audio_device.m6803_port2_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:irem_audio_device.m52_small_sound_map'}), (b:KG {id: 'file:src/mame/irem/irem.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 360, sourceColumn: 1, sourceEndLine: 366};
MATCH (a:KG {id: 'map:irem_audio_device.m52_small_sound_map'}), (b:KG {id: 'map:irem_audio_device.m52_small_sound_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:irem_audio_device.m52_small_sound_map'}), (b:KG {id: 'map:irem_audio_device.m52_small_sound_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:irem_audio_device.m52_small_sound_map'}), (b:KG {id: 'map:irem_audio_device.m52_small_sound_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45m/callback:ay_45m:0'}), (b:KG {id: 'handler:irem_audio_device.soundlatch_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45m/callback:ay_45m:1'}), (b:KG {id: 'handler:irem_audio_device.ay8910_45M_portb_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45l/callback:ay_45l:0'}), (b:KG {id: 'handler:irem_audio_device.ay8910_45L_porta_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/msm1/callback:msm1:0'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'map:irem_audio_device.m52_small_sound_map/range0'}), (b:KG {id: 'handler:irem_audio_device.m52_adpcm_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:irem_audio_device.m52_small_sound_map/range1'}), (b:KG {id: 'handler:irem_audio_device.sound_irq_ack_w'}) MERGE (a)-[r:WRITES]->(b);
