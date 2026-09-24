// mamekit knowledge graph — driver src/mame/atari/atarisy1.cpp
// generated 2026-09-24T02:28:30.974Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/atari/atarisy1.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/atari/atarisy1.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:atarisy1.h'}) SET n:SourceFile SET n += {path: 'atarisy1.h', external: true};
MERGE (n:KG {id: 'file:cpu/m68000/m68010.h'}) SET n:SourceFile SET n += {path: 'cpu/m68000/m68010.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6502/m6502.h'}) SET n:SourceFile SET n += {path: 'cpu/m6502/m6502.h', external: true};
MERGE (n:KG {id: 'file:machine/eeprompar.h'}) SET n:SourceFile SET n += {path: 'machine/eeprompar.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:sound/pokey.h'}) SET n:SourceFile SET n += {path: 'sound/pokey.h', external: true};
MERGE (n:KG {id: 'file:sound/ymopm.h'}) SET n:SourceFile SET n += {path: 'sound/ymopm.h', external: true};
MERGE (n:KG {id: 'file:atarimo.h'}) SET n:SourceFile SET n += {path: 'atarimo.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'game:atarisy1'}) SET n:Game SET n += {name: 'atarisy1', year: '1984', company: 'Atari Games', fullname: 'Atari System 1 BIOS', monitor: 'ROT0', cls: 'atarisy1_state', init: 'init_peterpak', flags: 'MACHINE_IS_BIOS_ROOT', kind: 'arcade', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 2669, sourceColumn: 1, sourceEndLine: 2669};
MERGE (n:KG {id: 'game:marble'}) SET n:Game SET n += {name: 'marble', year: '1984', company: 'Atari Games', fullname: 'Marble Madness (set 1)', monitor: 'ROT0', cls: 'atarisy1_state', init: 'init_marble', flags: '0', kind: 'arcade', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 2671, sourceColumn: 1, sourceEndLine: 2671};
MERGE (n:KG {id: 'romset:atarisy1'}) SET n:RomSet SET n += {name: 'atarisy1', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 975, sourceColumn: 1, sourceEndLine: 975};
MERGE (n:KG {id: 'region:atarisy1/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 557056, flags: '0', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 976, sourceColumn: 2, sourceEndLine: 976};
MERGE (n:KG {id: 'rom:atarisy1/maincpu/136032.205.l13'}) SET n:Rom SET n += {file: '136032.205.l13', offset: 0, size: 16384, crc: '88d0be26', sha1: 'd124045eccc562ff0423b23a240e27ad740fa0c9', skip: 1};
MERGE (n:KG {id: 'rom:atarisy1/maincpu/136032.206.l12'}) SET n:Rom SET n += {file: '136032.206.l12', offset: 1, size: 16384, crc: '3c79ef05', sha1: '20fdca7131478e1ee12691bdafd2d5bb74cbd16f', skip: 1};
MERGE (n:KG {id: 'region:atarisy1/audiocpu'}) SET n:RomRegion SET n += {tag: 'audiocpu', size: 65536, flags: 'ROMREGION_ERASE00', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 979, sourceColumn: 2, sourceEndLine: 979};
MERGE (n:KG {id: 'region:atarisy1/alpha'}) SET n:RomRegion SET n += {tag: 'alpha', size: 8192, flags: '0', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 981, sourceColumn: 2, sourceEndLine: 981};
MERGE (n:KG {id: 'rom:atarisy1/alpha/136032.104.f5'}) SET n:Rom SET n += {file: '136032.104.f5', offset: 0, size: 8192, crc: '7a29dc07', sha1: '72ba464da01bd6d3a91b8d9997d5ac14b6f47aad'};
MERGE (n:KG {id: 'region:atarisy1/tiles'}) SET n:RomRegion SET n += {tag: 'tiles', size: 1048576, flags: 'ROMREGION_INVERT | ROMREGION_ERASEFF', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 984, sourceColumn: 2, sourceEndLine: 984};
MERGE (n:KG {id: 'region:atarisy1/motherbrd_proms'}) SET n:RomRegion SET n += {tag: 'motherbrd_proms', size: 513, flags: '0', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 986, sourceColumn: 2, sourceEndLine: 986};
MERGE (n:KG {id: 'rom:atarisy1/motherbrd_proms/136032.101.e3'}) SET n:Rom SET n += {file: '136032.101.e3', offset: 0, size: 256, crc: '7e84972a', sha1: '84d422b53547271e3a07342704a05ef481db3f99'};
MERGE (n:KG {id: 'rom:atarisy1/motherbrd_proms/136032.102.e5'}) SET n:Rom SET n += {file: '136032.102.e5', offset: 0, size: 256, crc: 'ebf1e0ae', sha1: '2d327e78832edd67ca3909c25b8c8c839637a1ed'};
MERGE (n:KG {id: 'rom:atarisy1/motherbrd_proms/136032.103.f7'}) SET n:Rom SET n += {file: '136032.103.f7', offset: 0, size: 235, crc: '92d6a0b4', sha1: '0a42a4816c89447b16e1f3245409591efea98a4a'};
MERGE (n:KG {id: 'region:atarisy1/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 1024, flags: 'ROMREGION_ERASE00', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 989, sourceColumn: 2, sourceEndLine: 989};
MERGE (n:KG {id: 'romset:marble'}) SET n:RomSet SET n += {name: 'marble', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 1003, sourceColumn: 1, sourceEndLine: 1003};
MERGE (n:KG {id: 'region:marble/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 557056, flags: '0', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 976, sourceColumn: 2, sourceEndLine: 976};
MERGE (n:KG {id: 'rom:marble/maincpu/136032.205.l13'}) SET n:Rom SET n += {file: '136032.205.l13', offset: 0, size: 16384, crc: '88d0be26', sha1: 'd124045eccc562ff0423b23a240e27ad740fa0c9', skip: 1};
MERGE (n:KG {id: 'rom:marble/maincpu/136032.206.l12'}) SET n:Rom SET n += {file: '136032.206.l12', offset: 1, size: 16384, crc: '3c79ef05', sha1: '20fdca7131478e1ee12691bdafd2d5bb74cbd16f', skip: 1};
MERGE (n:KG {id: 'rom:marble/maincpu/136033.623'}) SET n:Rom SET n += {file: '136033.623', offset: 65536, size: 16384, crc: '284ed2e9', sha1: 'a24d2fd587dffcc8536ef28fcbcf5c964a6b67a9', skip: 1};
MERGE (n:KG {id: 'rom:marble/maincpu/136033.624'}) SET n:Rom SET n += {file: '136033.624', offset: 65537, size: 16384, crc: 'd541b021', sha1: '978b1565da746f7389eaf7646604990fb28d47ed', skip: 1};
MERGE (n:KG {id: 'rom:marble/maincpu/136033.625'}) SET n:Rom SET n += {file: '136033.625', offset: 98304, size: 16384, crc: '563755c7', sha1: 'a444b72ff4cdecee3b9dd7e636d658c31ecc186c', skip: 1};
MERGE (n:KG {id: 'rom:marble/maincpu/136033.626'}) SET n:Rom SET n += {file: '136033.626', offset: 98305, size: 16384, crc: '860feeb3', sha1: 'd6059c1fe13f28ada27f6586215a16e2117e3ecd', skip: 1};
MERGE (n:KG {id: 'rom:marble/maincpu/136033.627'}) SET n:Rom SET n += {file: '136033.627', offset: 131072, size: 16384, crc: 'd1dbd439', sha1: 'cefc0fa9c71512c961272fcf0f9c069f1396468e', skip: 1};
MERGE (n:KG {id: 'rom:marble/maincpu/136033.628'}) SET n:Rom SET n += {file: '136033.628', offset: 131073, size: 16384, crc: '957d6801', sha1: 'b007d9e45a1442ab1c9ec1463f9f46ea85fb0659', skip: 1};
MERGE (n:KG {id: 'rom:marble/maincpu/136033.229'}) SET n:Rom SET n += {file: '136033.229', offset: 163840, size: 16384, crc: 'c81d5c14', sha1: '0464ea183685de83e797b9d946b4acc409f4c451', skip: 1};
MERGE (n:KG {id: 'rom:marble/maincpu/136033.630'}) SET n:Rom SET n += {file: '136033.630', offset: 163841, size: 16384, crc: '687a09f7', sha1: '95e31acf29cd8d51beefa9b0e4acd92b81980c2f', skip: 1};
MERGE (n:KG {id: 'rom:marble/maincpu/136033.107'}) SET n:Rom SET n += {file: '136033.107', offset: 524288, size: 16384, crc: 'f3b8745b', sha1: '4754eac5e6d8547b3ee00f3f48eaa560eb403862', skip: 1};
MERGE (n:KG {id: 'rom:marble/maincpu/136033.108'}) SET n:Rom SET n += {file: '136033.108', offset: 524289, size: 16384, crc: 'e51eecaa', sha1: '37d51a9e9cb33d1156d02a312ac8e202a18d7c20', skip: 1};
MERGE (n:KG {id: 'region:marble/audiocpu'}) SET n:RomRegion SET n += {tag: 'audiocpu', size: 65536, flags: '0', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 979, sourceColumn: 2, sourceEndLine: 979};
MERGE (n:KG {id: 'rom:marble/audiocpu/136033.421'}) SET n:Rom SET n += {file: '136033.421', offset: 32768, size: 16384, crc: '78153dc3', sha1: 'd4e68226b87df8834dc3d6daa9d683f17896c32e', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 1018, sourceColumn: 2, sourceEndLine: 1018};
MERGE (n:KG {id: 'rom:marble/audiocpu/136033.422'}) SET n:Rom SET n += {file: '136033.422', offset: 49152, size: 16384, crc: '2e66300e', sha1: '49acb9443c5d2c1016cde7f489deab2575dd82ca', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 1019, sourceColumn: 2, sourceEndLine: 1019};
MERGE (n:KG {id: 'region:marble/alpha'}) SET n:RomRegion SET n += {tag: 'alpha', size: 8192, flags: '0', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 981, sourceColumn: 2, sourceEndLine: 981};
MERGE (n:KG {id: 'rom:marble/alpha/136032.104.f5'}) SET n:Rom SET n += {file: '136032.104.f5', offset: 0, size: 8192, crc: '7a29dc07', sha1: '72ba464da01bd6d3a91b8d9997d5ac14b6f47aad'};
MERGE (n:KG {id: 'region:marble/tiles'}) SET n:RomRegion SET n += {tag: 'tiles', size: 1048576, flags: 'ROMREGION_INVERT | ROMREGION_ERASEFF', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 984, sourceColumn: 2, sourceEndLine: 984};
MERGE (n:KG {id: 'rom:marble/tiles/136033.137'}) SET n:Rom SET n += {file: '136033.137', offset: 0, size: 16384, crc: '7a45f5c1', sha1: 'b826a178660ff2e278558e4779586737751dca5e', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 1025, sourceColumn: 2, sourceEndLine: 1025};
MERGE (n:KG {id: 'rom:marble/tiles/136033.138'}) SET n:Rom SET n += {file: '136033.138', offset: 16384, size: 16384, crc: '7e954a88', sha1: '238a913529781f424a6f49c3fba1524684d0cbcf', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 1026, sourceColumn: 2, sourceEndLine: 1026};
MERGE (n:KG {id: 'rom:marble/tiles/136033.139'}) SET n:Rom SET n += {file: '136033.139', offset: 65536, size: 16384, crc: '1eb1bb5f', sha1: '987a8289fd4be06b6899bb8c620ddfa4c4b966b0', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 1027, sourceColumn: 2, sourceEndLine: 1027};
MERGE (n:KG {id: 'rom:marble/tiles/136033.140'}) SET n:Rom SET n += {file: '136033.140', offset: 81920, size: 16384, crc: '8a82467b', sha1: '25538e98e5fdadfa6de3bd57ee8658c7add0169d', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 1028, sourceColumn: 2, sourceEndLine: 1028};
MERGE (n:KG {id: 'rom:marble/tiles/136033.141'}) SET n:Rom SET n += {file: '136033.141', offset: 131072, size: 16384, crc: '52448965', sha1: 'e2ce22f89304b2d6858d0c61040d8ff2ee33347f', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 1029, sourceColumn: 2, sourceEndLine: 1029};
MERGE (n:KG {id: 'rom:marble/tiles/136033.142'}) SET n:Rom SET n += {file: '136033.142', offset: 147456, size: 16384, crc: 'b4a70e4f', sha1: 'd8e4d6dbbef3be86558ab23646c77400793a5eb1', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 1030, sourceColumn: 2, sourceEndLine: 1030};
MERGE (n:KG {id: 'rom:marble/tiles/136033.143'}) SET n:Rom SET n += {file: '136033.143', offset: 196608, size: 16384, crc: '7156e449', sha1: '361e024e1173299d0e6b776a7c1be10767cfab0d', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 1031, sourceColumn: 2, sourceEndLine: 1031};
MERGE (n:KG {id: 'rom:marble/tiles/136033.144'}) SET n:Rom SET n += {file: '136033.144', offset: 212992, size: 16384, crc: '4c3e4c79', sha1: '642e469ce10067502ce3a920066184a9c73a44c5', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 1032, sourceColumn: 2, sourceEndLine: 1032};
MERGE (n:KG {id: 'rom:marble/tiles/136033.145'}) SET n:Rom SET n += {file: '136033.145', offset: 262144, size: 16384, crc: '9062be7f', sha1: 'ae372433da441b69345d67f5e838b8479557517b', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 1033, sourceColumn: 2, sourceEndLine: 1033};
MERGE (n:KG {id: 'rom:marble/tiles/136033.146'}) SET n:Rom SET n += {file: '136033.146', offset: 278528, size: 16384, crc: '14566dca', sha1: '7134c233daba3b2510d1c08d9efde79c0eec6c20', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 1034, sourceColumn: 2, sourceEndLine: 1034};
MERGE (n:KG {id: 'rom:marble/tiles/136033.149'}) SET n:Rom SET n += {file: '136033.149', offset: 540672, size: 16384, crc: 'b6658f06', sha1: 'e719d956f4f9d703a12e2c5520cac0a2f47ea058', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 1036, sourceColumn: 2, sourceEndLine: 1036};
MERGE (n:KG {id: 'rom:marble/tiles/136033.151'}) SET n:Rom SET n += {file: '136033.151', offset: 606208, size: 16384, crc: '84ee1c80', sha1: '5192c0a2887f46b616d130bdbfffbbd5e394e9a3', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 1037, sourceColumn: 2, sourceEndLine: 1037};
MERGE (n:KG {id: 'rom:marble/tiles/136033.153'}) SET n:Rom SET n += {file: '136033.153', offset: 671744, size: 16384, crc: 'daa02926', sha1: '33c7a38c66fb4d67a6ee88ef2da2bba091439e0c', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 1038, sourceColumn: 2, sourceEndLine: 1038};
MERGE (n:KG {id: 'region:marble/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 1024, flags: '0', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 989, sourceColumn: 2, sourceEndLine: 989};
MERGE (n:KG {id: 'rom:marble/proms/136033.118'}) SET n:Rom SET n += {file: '136033.118', offset: 0, size: 512, crc: '2101b0ed', sha1: 'e4fb8dfa80ed78847c697f9de2bd8540b0c04889', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 1041, sourceColumn: 2, sourceEndLine: 1041};
MERGE (n:KG {id: 'rom:marble/proms/136033.119'}) SET n:Rom SET n += {file: '136033.119', offset: 512, size: 512, crc: '19f6e767', sha1: '041f24cc03c9043c31c3294c9565dfda9bdada74', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 1042, sourceColumn: 2, sourceEndLine: 1042};
MERGE (n:KG {id: 'region:marble/motherbrd_proms'}) SET n:RomRegion SET n += {tag: 'motherbrd_proms', size: 513, flags: '0', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 986, sourceColumn: 2, sourceEndLine: 986};
MERGE (n:KG {id: 'rom:marble/motherbrd_proms/136032.101.e3'}) SET n:Rom SET n += {file: '136032.101.e3', offset: 0, size: 256, crc: '7e84972a', sha1: '84d422b53547271e3a07342704a05ef481db3f99'};
MERGE (n:KG {id: 'rom:marble/motherbrd_proms/136032.102.e5'}) SET n:Rom SET n += {file: '136032.102.e5', offset: 0, size: 256, crc: 'ebf1e0ae', sha1: '2d327e78832edd67ca3909c25b8c8c839637a1ed'};
MERGE (n:KG {id: 'rom:marble/motherbrd_proms/136032.103.f7'}) SET n:Rom SET n += {file: '136032.103.f7', offset: 0, size: 235, crc: '92d6a0b4', sha1: '0a42a4816c89447b16e1f3245409591efea98a4a'};
MERGE (n:KG {id: 'map:atarisy1_state.main_map_noslapstic'}) SET n:AddressMap SET n += {cls: 'atarisy1_state', name: 'main_map_noslapstic', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 405, sourceColumn: 1, sourceEndLine: 429};
MERGE (n:KG {id: 'map:atarisy1_state.main_map_noslapstic/range0'}) SET n:AddressRange SET n += {start: 0, end: 524287, raw: 'map(0x000000, 0x07ffff).rom()', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 407, sourceColumn: 2, sourceEndLine: 407, rom: true};
MERGE (n:KG {id: 'map:atarisy1_state.main_map_noslapstic/range1'}) SET n:AddressRange SET n += {start: 3014656, end: 3014657, raw: 'map(0x2e0000, 0x2e0001).r(FUNC(atarisy1_state::int3state_r))', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 408, sourceColumn: 2, sourceEndLine: 408};
MERGE (n:KG {id: 'handler:atarisy1_state.int3state_r'}) SET n:Handler SET n += {method: 'int3state_r', ownerClass: 'atarisy1_state', sourceFile: 'src/mame/atari/atarisy1_v.cpp', sourceLine: 394, sourceColumn: 1, sourceEndLine: 397, sourceParameters: '', sourceBody: 'return m_scanline_int_state ? 0x0080 : 0x0000;'};
MERGE (n:KG {id: 'map:atarisy1_state.main_map_noslapstic/range2'}) SET n:AddressRange SET n += {start: 4194304, end: 4202495, raw: 'map(0x400000, 0x401fff).ram()', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 409, sourceColumn: 2, sourceEndLine: 409, ram: true};
MERGE (n:KG {id: 'map:atarisy1_state.main_map_noslapstic/range3'}) SET n:AddressRange SET n += {start: 8388608, end: 8388609, raw: 'map(0x800000, 0x800001).w(FUNC(atarisy1_state::xscroll_w)).share(m_xscroll)', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 410, sourceColumn: 2, sourceEndLine: 410, share: 'xscroll'};
MERGE (n:KG {id: 'handler:atarisy1_state.xscroll_w'}) SET n:Handler SET n += {method: 'xscroll_w', ownerClass: 'atarisy1_state', sourceFile: 'src/mame/atari/atarisy1_v.cpp', sourceLine: 258, sourceColumn: 1, sourceEndLine: 273, sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: 'uint16_t const oldscroll = *m_xscroll;
	uint16_t newscroll = oldscroll;

	/* force a partial update in case this changes mid-screen */
	COMBINE_DATA(&newscroll);
	if (oldscroll != newscroll)
		m_screen->update_partial(m_screen->vpos());

	/* set the new scroll value */
	m_playfield_tilemap->set_scrollx(0, newscroll);

	/* update the data */
	*m_xscroll = newscroll;'};
MERGE (n:KG {id: 'map:atarisy1_state.main_map_noslapstic/range4'}) SET n:AddressRange SET n += {start: 8519680, end: 8519681, raw: 'map(0x820000, 0x820001).w(FUNC(atarisy1_state::yscroll_w)).share(m_yscroll)', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 411, sourceColumn: 2, sourceEndLine: 411, share: 'yscroll'};
MERGE (n:KG {id: 'handler:atarisy1_state.yscroll_w'}) SET n:Handler SET n += {method: 'yscroll_w', ownerClass: 'atarisy1_state', sourceFile: 'src/mame/atari/atarisy1_v.cpp', sourceLine: 289, sourceColumn: 1, sourceEndLine: 312, sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: 'uint16_t const oldscroll = *m_yscroll;
	uint16_t newscroll = oldscroll;
	int const scanline = m_screen->vpos();

	/* force a partial update in case this changes mid-screen */
	COMBINE_DATA(&newscroll);
	m_screen->update_partial(scanline);

	/* because this latches a new value into the scroll base,
	   we need to adjust for the scanline */
	int adjusted_scroll = newscroll;
	if (scanline <= m_screen->visible_area().bottom())
		adjusted_scroll -= (scanline + 1);
	m_playfield_tilemap->set_scrolly(0, adjusted_scroll);

	/* but since we\'ve adjusted it, we must reset it to the normal value
	   once we hit scanline 0 again */
	m_yscroll_reset_timer->adjust(m_screen->time_until_pos(0), newscroll);

	/* update the data */
	*m_yscroll = newscroll;'};
MERGE (n:KG {id: 'map:atarisy1_state.main_map_noslapstic/range5'}) SET n:AddressRange SET n += {start: 8650752, end: 8650753, raw: 'map(0x840000, 0x840001).w(FUNC(atarisy1_state::priority_w))', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 412, sourceColumn: 2, sourceEndLine: 412};
MERGE (n:KG {id: 'handler:atarisy1_state.priority_w'}) SET n:Handler SET n += {method: 'priority_w', ownerClass: 'atarisy1_state', sourceFile: 'src/mame/atari/atarisy1_v.cpp', sourceLine: 238, sourceColumn: 1, sourceEndLine: 248, sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: 'uint16_t const oldpens = m_playfield_priority_pens;
	uint16_t newpens = oldpens;

	/* force a partial update in case this changes mid-screen */
	COMBINE_DATA(&newpens);
	if (oldpens != newpens)
		m_screen->update_partial(m_screen->vpos());
	m_playfield_priority_pens = newpens;'};
MERGE (n:KG {id: 'map:atarisy1_state.main_map_noslapstic/range6'}) SET n:AddressRange SET n += {start: 8781825, end: 8781825, raw: 'map(0x860001, 0x860001).w(FUNC(atarisy1_state::bankselect_w))', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 413, sourceColumn: 2, sourceEndLine: 413};
MERGE (n:KG {id: 'handler:atarisy1_state.bankselect_w'}) SET n:Handler SET n += {method: 'bankselect_w', ownerClass: 'atarisy1_state', sourceFile: 'src/mame/atari/atarisy1_v.cpp', sourceLine: 189, sourceColumn: 1, sourceEndLine: 228, sourceParameters: 'uint8_t data', sourceBody: 'uint8_t const oldselect = m_bankselect;
	uint8_t const newselect = data;
	int const scanline = m_screen->vpos();

	// update memory
	uint8_t const diff = oldselect ^ newselect;

	// sound CPU reset
	if (BIT(diff, 7))
	{
		m_outlatch->clear_w(BIT(newselect, 7));
		m_audiocpu->set_input_line(INPUT_LINE_RESET, BIT(newselect, 7) ? CLEAR_LINE : ASSERT_LINE);
		if (!BIT(newselect, 7))
		{
			m_mainlatch->acknowledge_w();
			if (m_via.found())
				m_via->reset();
		}
	}

	// if MO or playfield banks change, force a partial update
	if (diff & 0x3c)
		m_screen->update_partial(scanline);

	// motion object bank select
	m_mob->set_bank((newselect >> 3) & 7);
	update_timers(scanline);

	// playfield bank select
	if (BIT(diff, 2))
	{
		m_playfield_tile_bank = BIT(newselect, 2);
		m_playfield_tilemap->mark_all_dirty();
	}

	// stash the new value
	m_bankselect = newselect;'};
MERGE (n:KG {id: 'handler:atarisy1_state.update_timers'}) SET n:Handler SET n += {method: 'update_timers', ownerClass: 'atarisy1_state', sourceFile: 'src/mame/atari/atarisy1_v.cpp', sourceLine: 407, sourceColumn: 1, sourceEndLine: 409, sourceParameters: 'int scanline', sourceBody: ''};
MERGE (n:KG {id: 'handler:atari_motion_objects_device.bank'}) SET n:Handler SET n += {method: 'bank', ownerClass: 'atari_motion_objects_device', sourceFile: 'src/mame/atari/atarimo.h', sourceLine: 93, sourceColumn: 1, sourceEndLine: 95, sourceParameters: '', sourceBody: 'return m_bank;'};
MERGE (n:KG {id: 'map:atarisy1_state.main_map_noslapstic/range7'}) SET n:AddressRange SET n += {start: 8912897, end: 8912897, raw: 'map(0x880001, 0x880001).w("watchdog", FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 414, sourceColumn: 2, sourceEndLine: 414};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 414, sourceColumn: 2, sourceEndLine: 414};
MERGE (n:KG {id: 'map:atarisy1_state.main_map_noslapstic/range8'}) SET n:AddressRange SET n += {start: 9043969, end: 9043969, raw: 'map(0x8a0001, 0x8a0001).w(FUNC(atarisy1_state::video_int_ack_w))', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 415, sourceColumn: 2, sourceEndLine: 415};
MERGE (n:KG {id: 'handler:atarisy1_state.video_int_ack_w'}) SET n:Handler SET n += {method: 'video_int_ack_w', ownerClass: 'atarisy1_state', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 215, sourceColumn: 1, sourceEndLine: 218, sourceParameters: 'uint8_t data', sourceBody: 'm_maincpu->set_input_line(M68K_IRQ_4, CLEAR_LINE);'};
MERGE (n:KG {id: 'map:atarisy1_state.main_map_noslapstic/range9'}) SET n:AddressRange SET n += {start: 9175041, end: 9175041, raw: 'map(0x8c0001, 0x8c0001).w("eeprom", FUNC(eeprom_parallel_28xx_device::unlock_write8))', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 416, sourceColumn: 2, sourceEndLine: 416};
MERGE (n:KG {id: 'handler:eeprom_parallel_28xx_device.unlock_write8'}) SET n:Handler SET n += {method: 'unlock_write8', ownerClass: 'eeprom_parallel_28xx_device', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 416, sourceColumn: 2, sourceEndLine: 416};
MERGE (n:KG {id: 'map:atarisy1_state.main_map_noslapstic/range10'}) SET n:AddressRange SET n += {start: 9437184, end: 10485759, raw: 'map(0x900000, 0x9fffff).ram()', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 417, sourceColumn: 2, sourceEndLine: 417, ram: true};
MERGE (n:KG {id: 'map:atarisy1_state.main_map_noslapstic/range11'}) SET n:AddressRange SET n += {start: 10485760, end: 10493951, raw: 'map(0xa00000, 0xa01fff).ram().w(m_playfield_tilemap, FUNC(tilemap_device::write16)).share("playfield")', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 418, sourceColumn: 2, sourceEndLine: 418, ram: true, share: 'playfield'};
MERGE (n:KG {id: 'handler:tilemap_device.write16'}) SET n:Handler SET n += {method: 'write16', ownerClass: 'tilemap_device', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 420, sourceColumn: 2, sourceEndLine: 420};
MERGE (n:KG {id: 'map:atarisy1_state.main_map_noslapstic/range12'}) SET n:AddressRange SET n += {start: 10493952, end: 10498047, raw: 'map(0xa02000, 0xa02fff).ram().w(FUNC(atarisy1_state::spriteram_w)).share("mob")', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 419, sourceColumn: 2, sourceEndLine: 419, ram: true, share: 'mob'};
MERGE (n:KG {id: 'handler:atarisy1_state.spriteram_w'}) SET n:Handler SET n += {method: 'spriteram_w', ownerClass: 'atarisy1_state', sourceFile: 'src/mame/atari/atarisy1_v.cpp', sourceLine: 322, sourceColumn: 1, sourceEndLine: 352, sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: 'int const active_bank = m_mob->bank();
	uint16_t *spriteram = m_mob->spriteram();
	int const oldword = spriteram[offset];
	int newword = oldword;
	COMBINE_DATA(&newword);

	/* if the data changed, and it modified the live sprite bank, do some extra work */
	if (oldword != newword && (offset >> 8) == active_bank)
	{
		/* if modifying a timer, beware */
		if (((offset & 0xc0) == 0x00 && spriteram[offset | 0x40] == 0xffff) ||
			((offset & 0xc0) == 0x40 && (newword == 0xffff || oldword == 0xffff)))
		{
			/* if the timer is in the active bank, update the display list */
			spriteram[offset] = data;
			update_timers(m_screen->vpos());
		}

		/* if we\'re about to modify data in the active sprite bank, make sure the video is up-to-date */
		/* Road Runner needs this to work; note the +2 kludge -- +1 would be correct since the video */
		/* renders the next scanline\'s sprites to the line buffers, but Road Runner still glitches */
		/* without the extra +1 */
		else
			m_screen->update_partial(m_screen->vpos() + 2);
	}

	/* let the MO handler do the basic work */
	spriteram[offset] = data;'};
MERGE (n:KG {id: 'map:atarisy1_state.main_map_noslapstic/range13'}) SET n:AddressRange SET n += {start: 10498048, end: 10502143, raw: 'map(0xa03000, 0xa03fff).ram().w(m_alpha_tilemap, FUNC(tilemap_device::write16)).share("alpha")', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 420, sourceColumn: 2, sourceEndLine: 420, ram: true, share: 'alpha'};
MERGE (n:KG {id: 'map:atarisy1_state.main_map_noslapstic/range14'}) SET n:AddressRange SET n += {start: 11534336, end: 11536383, raw: 'map(0xb00000, 0xb007ff).ram().w(m_palette, FUNC(palette_device::write16)).share("palette")', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 421, sourceColumn: 2, sourceEndLine: 421, ram: true, share: 'palette'};
MERGE (n:KG {id: 'handler:palette_device.write16'}) SET n:Handler SET n += {method: 'write16', ownerClass: 'palette_device', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 421, sourceColumn: 2, sourceEndLine: 421};
MERGE (n:KG {id: 'map:atarisy1_state.main_map_noslapstic/range15'}) SET n:AddressRange SET n += {start: 15728640, end: 15729663, raw: 'map(0xf00000, 0xf003ff).rw("eeprom", FUNC(eeprom_parallel_28xx_device::read), FUNC(eeprom_parallel_28xx_device::write)).umask16(0x00ff)', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 422, sourceColumn: 2, sourceEndLine: 422, umask: 255};
MERGE (n:KG {id: 'handler:eeprom_parallel_28xx_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'eeprom_parallel_28xx_device', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 422, sourceColumn: 2, sourceEndLine: 422};
MERGE (n:KG {id: 'handler:eeprom_parallel_28xx_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'eeprom_parallel_28xx_device', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 422, sourceColumn: 2, sourceEndLine: 422};
MERGE (n:KG {id: 'map:atarisy1_state.main_map_noslapstic/range16'}) SET n:AddressRange SET n += {start: 15859712, end: 15859719, raw: 'map(0xf20000, 0xf20007).r(FUNC(atarisy1_state::trakball_r))', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 423, sourceColumn: 2, sourceEndLine: 423};
MERGE (n:KG {id: 'handler:atarisy1_state.trakball_r'}) SET n:Handler SET n += {method: 'trakball_r', ownerClass: 'atarisy1_state', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 281, sourceColumn: 1, sourceEndLine: 319, sourceParameters: 'offs_t offset', sourceBody: 'int result = 0xff;

	/* Marble Madness trackball type -- rotated 45 degrees! */
	if (m_trackball_type == 1)
	{
		int player = (offset >> 1) & 1;
		int which = offset & 1;

		/* when reading the even ports, do a real analog port update */
		if (which == 0)
		{
			uint8_t posx,posy;

			if (player == 0)
			{
				posx = (int8_t)ioport("IN0")->read();
				posy = (int8_t)ioport("IN1")->read();
			}
			else
			{
				posx = (int8_t)ioport("IN2")->read();
				posy = (int8_t)ioport("IN3")->read();
			}

			m_cur[player][0] = posx + posy;
			m_cur[player][1] = posx - posy;
		}

		result = m_cur[player][which];
	}

	/* Road Blasters steering wheel */
	else if (m_trackball_type == 2)
		result = ioport("IN0")->read();

	return result;'};
MERGE (n:KG {id: 'map:atarisy1_state.main_map_noslapstic/range17'}) SET n:AddressRange SET n += {start: 15990784, end: 15990815, raw: 'map(0xf40000, 0xf4001f).rw(FUNC(atarisy1_state::adc_r), FUNC(atarisy1_state::adc_w)).umask16(0x00ff)', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 424, sourceColumn: 2, sourceEndLine: 424, umask: 255};
MERGE (n:KG {id: 'handler:atarisy1_state.adc_r'}) SET n:Handler SET n += {method: 'adc_r', ownerClass: 'atarisy1_state', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 248, sourceColumn: 1, sourceEndLine: 259, sourceParameters: 'offs_t offset', sourceBody: 'if (!m_adc.found())
		return 0xff;

	const u8 value = m_adc->data_r();

	if (!machine().side_effects_disabled())
		adc_w(offset, 0);

	return value;'};
MERGE (n:KG {id: 'handler:atarisy1_state.adc_w'}) SET n:Handler SET n += {method: 'adc_w', ownerClass: 'atarisy1_state', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 262, sourceColumn: 1, sourceEndLine: 271, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'if (!m_adc.found())
		return;

	m_adc->address_offset_start_w(offset & 7, 0);

	// the A4 bit enables/disables joystick IRQs
	m_ajsint->in_w<0>(!BIT(offset, 3));'};
MERGE (n:KG {id: 'map:atarisy1_state.main_map_noslapstic/range18'}) SET n:AddressRange SET n += {start: 16121856, end: 16121859, raw: 'map(0xf60000, 0xf60003).portr("F60000")', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 425, sourceColumn: 2, sourceEndLine: 425, portRead: 'F60000'};
MERGE (n:KG {id: 'map:atarisy1_state.main_map_noslapstic/range19'}) SET n:AddressRange SET n += {start: 16252929, end: 16252929, raw: 'map(0xf80001, 0xf80001).w(m_soundlatch, FUNC(generic_latch_8_device::write))', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 426, sourceColumn: 2, sourceEndLine: 426};
MERGE (n:KG {id: 'handler:generic_latch_8_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 448, sourceColumn: 2, sourceEndLine: 448};
MERGE (n:KG {id: 'map:atarisy1_state.main_map_noslapstic/range20'}) SET n:AddressRange SET n += {start: 16515073, end: 16515073, raw: 'map(0xfc0001, 0xfc0001).r(m_mainlatch, FUNC(generic_latch_8_device::read))', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 427, sourceColumn: 2, sourceEndLine: 427};
MERGE (n:KG {id: 'handler:generic_latch_8_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 447, sourceColumn: 2, sourceEndLine: 447};
MERGE (n:KG {id: 'map:atarisy1_state.main_map_noslapstic/range21'}) SET n:AddressRange SET n += {start: 16646145, end: 16646145, raw: 'map(0xfe0001, 0xfe0001).w(m_soundlatch, FUNC(generic_latch_8_device::write))', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 428, sourceColumn: 2, sourceEndLine: 428};
MERGE (n:KG {id: 'map:atarisy1_state.main_map'}) SET n:AddressMap SET n += {cls: 'atarisy1_state', name: 'main_map', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 431, sourceColumn: 1, sourceEndLine: 435, calls: ['main_map_noslapstic']};
MERGE (n:KG {id: 'map:atarisy1_state.main_map/range0'}) SET n:AddressRange SET n += {start: 524288, end: 532479, raw: 'map(0x080000, 0x081fff).mirror(0x6000).bankr(m_slapstic_bank)', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 434, sourceColumn: 2, sourceEndLine: 434, mirror: 24576, bankRead: 'slapstic_bank'};
MERGE (n:KG {id: 'map:atarisy1_state.sound_map'}) SET n:AddressMap SET n += {cls: 'atarisy1_state', name: 'sound_map', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 443, sourceColumn: 1, sourceEndLine: 453};
MERGE (n:KG {id: 'map:atarisy1_state.sound_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 4095, raw: 'map(0x0000, 0x0fff).mirror(0x2000).ram()', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 445, sourceColumn: 2, sourceEndLine: 445, mirror: 8192, ram: true};
MERGE (n:KG {id: 'map:atarisy1_state.sound_map/range1'}) SET n:AddressRange SET n += {start: 6144, end: 6145, raw: 'map(0x1800, 0x1801).mirror(0x278e).rw("ymsnd", FUNC(ym2151_device::read), FUNC(ym2151_device::write))', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 446, sourceColumn: 2, sourceEndLine: 446, mirror: 10126};
MERGE (n:KG {id: 'handler:ym2151_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'ym2151_device', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 446, sourceColumn: 2, sourceEndLine: 446};
MERGE (n:KG {id: 'handler:ym2151_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'ym2151_device', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 446, sourceColumn: 2, sourceEndLine: 446};
MERGE (n:KG {id: 'map:atarisy1_state.sound_map/range2'}) SET n:AddressRange SET n += {start: 6160, end: 6160, raw: 'map(0x1810, 0x1810).mirror(0x278f).r(m_soundlatch, FUNC(generic_latch_8_device::read))', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 447, sourceColumn: 2, sourceEndLine: 447, mirror: 10127};
MERGE (n:KG {id: 'map:atarisy1_state.sound_map/range3'}) SET n:AddressRange SET n += {start: 6160, end: 6160, raw: 'map(0x1810, 0x1810).mirror(0x278f).w(m_mainlatch, FUNC(generic_latch_8_device::write))', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 448, sourceColumn: 2, sourceEndLine: 448, mirror: 10127};
MERGE (n:KG {id: 'map:atarisy1_state.sound_map/range4'}) SET n:AddressRange SET n += {start: 6176, end: 6176, raw: 'map(0x1820, 0x1820).mirror(0x278f).r(FUNC(atarisy1_state::switch_6502_r))', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 449, sourceColumn: 2, sourceEndLine: 449, mirror: 10127};
MERGE (n:KG {id: 'handler:atarisy1_state.switch_6502_r'}) SET n:Handler SET n += {method: 'switch_6502_r', ownerClass: 'atarisy1_state', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 329, sourceColumn: 1, sourceEndLine: 334, sourceParameters: '', sourceBody: 'int temp = ioport("1820")->read();
	if (!(ioport("F60000")->read() & 0x0040)) temp ^= 0x80;
	return temp;'};
MERGE (n:KG {id: 'map:atarisy1_state.sound_map/range5'}) SET n:AddressRange SET n += {start: 6176, end: 6183, raw: 'map(0x1820, 0x1827).mirror(0x2788).w(m_outlatch, FUNC(ls259_device::write_d0))', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 450, sourceColumn: 2, sourceEndLine: 450, mirror: 10120};
MERGE (n:KG {id: 'handler:ls259_device.write_d0'}) SET n:Handler SET n += {method: 'write_d0', ownerClass: 'ls259_device', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 450, sourceColumn: 2, sourceEndLine: 450};
MERGE (n:KG {id: 'map:atarisy1_state.sound_map/range6'}) SET n:AddressRange SET n += {start: 6256, end: 6271, raw: 'map(0x1870, 0x187f).mirror(0x2780).rw("pokey", FUNC(pokey_device::read), FUNC(pokey_device::write))', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 451, sourceColumn: 2, sourceEndLine: 451, mirror: 10112};
MERGE (n:KG {id: 'handler:pokey_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'pokey_device', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 451, sourceColumn: 2, sourceEndLine: 451};
MERGE (n:KG {id: 'handler:pokey_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'pokey_device', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 451, sourceColumn: 2, sourceEndLine: 451};
MERGE (n:KG {id: 'map:atarisy1_state.sound_map/range7'}) SET n:AddressRange SET n += {start: 16384, end: 65535, raw: 'map(0x4000, 0xffff).rom()', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 452, sourceColumn: 2, sourceEndLine: 452, rom: true};
MERGE (n:KG {id: 'handler:atarisy1_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'atarisy1_state', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 226, sourceColumn: 1, sourceEndLine: 232, sourceParameters: '', sourceBody: 'bankselect_w(0);

	if (m_adc.found())
		m_ajsint->in_w<0>(0);'};
MERGE (n:KG {id: 'handler:atarisy1_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'atarisy1_state', sourceFile: 'src/mame/atari/atarisy1_v.cpp', sourceLine: 146, sourceColumn: 1, sourceEndLine: 179, sourceParameters: '', sourceBody: '// first decode the graphics
	uint16_t motable[256];
	decode_gfx(m_playfield_lookup, motable);

	// modify the motion object code lookup
	std::vector<uint32_t> &codelookup = m_mob->code_lookup();
	for (unsigned int i = 0; i < codelookup.size(); i++)
		codelookup[i] = (i & 0xff) | ((motable[i >> 8] & 0xff) << 8);

	// modify the motion object color and gfx lookups
	std::vector<uint8_t> &colorlookup = m_mob->color_lookup();
	std::vector<uint8_t> &gfxlookup = m_mob->gfx_lookup();
	for (unsigned int i = 0; i < colorlookup.size(); i++)
	{
		colorlookup[i] = ((motable[i] >> 12) & 15) << 1;
		gfxlookup[i] = (motable[i] >> 8) & 15;
	}

	// reset the statics
	m_mob->set_yscroll(256);
	m_next_timer_scanline = -1;
	m_scanline_int_state = false;
	m_bankselect = 0xff;
	m_playfield_tile_bank = 0;

	// save state
	save_item(NAME(m_playfield_tile_bank));
	save_item(NAME(m_playfield_priority_pens));
	save_item(NAME(m_next_timer_scanline));
	save_item(NAME(m_scanline_int_state));
	save_item(NAME(m_bankselect));'};
MERGE (n:KG {id: 'handler:atarisy1_state.decode_gfx'}) SET n:Handler SET n += {method: 'decode_gfx', ownerClass: 'atarisy1_state', sourceFile: 'src/mame/atari/atarisy1_v.cpp', sourceLine: 528, sourceColumn: 1, sourceEndLine: 579, sourceConstants: ['PROM1_OFFSET_MASK=15', 'PROM2_PLANE_5_ENABLE=32', 'PROM2_PLANE_4_ENABLE=16', 'PROM2_PF_COLOR_MASK=15', 'PROM2_MO_COLOR_MASK=7'], sourceParameters: 'uint16_t *pflookup, uint16_t *molookup', sourceBody: 'uint8_t const *prom1 = &memregion("proms")->as_u8(0x000);
	uint8_t const *prom2 = &memregion("proms")->as_u8(0x200);

	/* reset the globals */
	memset(&m_bank_gfx[0][0], 0, sizeof(m_bank_gfx));

	/* loop for two sets of objects */
	for (int obj = 0; obj < 2; obj++)
	{
		/* loop for 256 objects in the set */
		for (int i = 0; i < 256; i++, prom1++, prom2++)
		{
			int bank, bpp, color, offset;

			/* determine the bpp */
			bpp = 4;
			if (*prom2 & PROM2_PLANE_4_ENABLE)
			{
				bpp = 5;
				if (*prom2 & PROM2_PLANE_5_ENABLE)
					bpp = 6;
			}

			/* determine the offset */
			offset = *prom1 & PROM1_OFFSET_MASK;

			/* determine the bank */
			bank = get_bank(*prom1, *prom2, bpp);

			/* set the value */
			if (obj == 0)
			{
				/* playfield case */
				color = (~*prom2 & PROM2_PF_COLOR_MASK) >> (bpp - 4);
				if (bank == 0)
				{
					bank = 1;
					offset = color = 0;
				}
				pflookup[i] = offset | (bank << 8) | (color << 12);
			}
			else
			{
				/* motion objects (high bit ignored) */
				color = (~*prom2 & PROM2_MO_COLOR_MASK) >> (bpp - 4);
				molookup[i] = offset | (bank << 8) | (color << 12);
			}
		}
	}'};
MERGE (n:KG {id: 'handler:atarisy1_state.get_bank'}) SET n:Handler SET n += {method: 'get_bank', ownerClass: 'atarisy1_state', sourceFile: 'src/mame/atari/atarisy1_v.cpp', sourceLine: 589, sourceColumn: 1, sourceEndLine: 655, sourceConstants: ['MAX_GFX_ELEMENTS=32', 'PROM1_BANK_4=128', 'PROM1_BANK_3=64', 'PROM1_BANK_2=32', 'PROM1_BANK_1=16', 'PROM2_BANK_6_OR_7=128', 'PROM2_BANK_5=64', 'PROM2_BANK_7=8'], sourceParameters: 'uint8_t prom1, uint8_t prom2, int bpp', sourceBody: 'int bank_index, gfx_index;

	/* determine the bank index */
	if ((prom1 & PROM1_BANK_1) == 0)
		bank_index = 1;
	else if ((prom1 & PROM1_BANK_2) == 0)
		bank_index = 2;
	else if ((prom1 & PROM1_BANK_3) == 0)
		bank_index = 3;
	else if ((prom1 & PROM1_BANK_4) == 0)
		bank_index = 4;
	else if ((prom2 & PROM2_BANK_5) == 0)
		bank_index = 5;
	else if ((prom2 & PROM2_BANK_6_OR_7) == 0)
	{
		if ((prom2 & PROM2_BANK_7) == 0)
			bank_index = 7;
		else
			bank_index = 6;
	}
	else
		return 0;

	/* find the bank */
	if (m_bank_gfx[bpp - 4][bank_index])
		return m_bank_gfx[bpp - 4][bank_index];

	/* if the bank is out of range, call it 0 */
	memory_region *tiles = memregion("tiles");
	if (0x80000 * (bank_index - 1) >= tiles->bytes())
		return 0;

	/* don\'t have one? let\'s make it ... first find any empty slot */
	for (gfx_index = 0; gfx_index < MAX_GFX_ELEMENTS; gfx_index++)
		if (m_gfxdecode->gfx(gfx_index) == nullptr)
			break;
	assert(gfx_index != MAX_GFX_ELEMENTS);

	/* decode the graphics */
	const uint8_t *srcdata = &tiles->as_u8(0x80000 * (bank_index - 1));
	switch (bpp)
	{
	case 4:
		m_gfxdecode->set_gfx(gfx_index,std::make_unique<gfx_element>(m_palette, objlayout_4bpp, srcdata, 0, 0x40, 256));
		break;

	case 5:
		m_gfxdecode->set_gfx(gfx_index,std::make_unique<gfx_element>(m_palette, objlayout_5bpp, srcdata, 0, 0x40, 256));
		break;

	case 6:
		m_gfxdecode->set_gfx(gfx_index,std::make_unique<gfx_element>(m_palette, objlayout_6bpp, srcdata, 0, 0x40, 256));
		break;

	default:
		fatalerror("Unsupported bpp\\n");
	}

	/* set the color information */
	m_gfxdecode->gfx(gfx_index)->set_granularity(8);
	m_bank_color_shift[gfx_index] = bpp - 3;

	/* set the entry and return it */
	return m_bank_gfx[bpp - 4][bank_index] = gfx_index;'};
MERGE (n:KG {id: 'handler:atari_motion_objects_device.code_lookup'}) SET n:Handler SET n += {method: 'code_lookup', ownerClass: 'atari_motion_objects_device', sourceFile: 'src/mame/atari/atarimo.h', sourceLine: 98, sourceColumn: 1, sourceEndLine: 98, sourceParameters: '', sourceBody: 'return m_codelookup;'};
MERGE (n:KG {id: 'handler:atari_motion_objects_device.color_lookup'}) SET n:Handler SET n += {method: 'color_lookup', ownerClass: 'atari_motion_objects_device', sourceFile: 'src/mame/atari/atarimo.h', sourceLine: 99, sourceColumn: 1, sourceEndLine: 99, sourceParameters: '', sourceBody: 'return m_colorlookup;'};
MERGE (n:KG {id: 'handler:atari_motion_objects_device.gfx_lookup'}) SET n:Handler SET n += {method: 'gfx_lookup', ownerClass: 'atari_motion_objects_device', sourceFile: 'src/mame/atari/atarimo.h', sourceLine: 100, sourceColumn: 1, sourceEndLine: 100, sourceParameters: '', sourceBody: 'return m_gfxlookup;'};
MERGE (n:KG {id: 'handler:atari_motion_objects_device.set_yscroll'}) SET n:Handler SET n += {method: 'set_yscroll', ownerClass: 'atari_motion_objects_device', sourceFile: 'src/mame/atari/atarimo.h', sourceLine: 105, sourceColumn: 1, sourceEndLine: 105, sourceParameters: 'int yscroll', sourceBody: 'm_yscroll = yscroll & m_bitmapymask;'};
MERGE (n:KG {id: 'machine:atarisy1_state.atarisy1'}) SET n:MachineConfig SET n += {cls: 'atarisy1_state', name: 'atarisy1', calls: [], stateMembers: ['{"name":"m_joystick_type","bits":8}', '{"name":"m_trackball_type","bits":8}', '{"name":"m_playfield_lookup","bits":16,"arrayLength":256}', '{"name":"m_playfield_tile_bank","bits":8}', '{"name":"m_playfield_priority_pens","bits":16}', '{"name":"m_next_timer_scanline","bits":32,"signed":true}', '{"name":"m_scanline_int_state","bits":1}', '{"name":"m_bank_color_shift","bits":8}', '{"name":"m_bankselect","bits":8}'], resetHandlers: ['atarisy1_state.machine_reset'], startHandlers: ['atarisy1_state.video_start'], sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 769, sourceColumn: 1, sourceEndLine: 831};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/maincpu'}) SET n:Device SET n += {type: 'M68010', tag: 'maincpu', clock: 7159090.5, config: ['M68010(config, m_maincpu, 14.318181_MHz_XTAL/2)', 'm_maincpu->set_addrmap(AS_PROGRAM, &atarisy1_state::main_map)'], member: 'm_maincpu', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 772, sourceColumn: 2, sourceEndLine: 772};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/audiocpu'}) SET n:Device SET n += {type: 'M6502', tag: 'audiocpu', clock: 1789772.625, config: ['M6502(config, m_audiocpu, 14.318181_MHz_XTAL/8)', 'm_audiocpu->set_addrmap(AS_PROGRAM, &atarisy1_state::sound_map)'], member: 'm_audiocpu', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 775, sourceColumn: 2, sourceEndLine: 775};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/eeprom'}) SET n:Device SET n += {type: 'EEPROM_2804', tag: 'eeprom', clock: null, config: ['EEPROM_2804(config, "eeprom").lock_after_write(true)'], sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 778, sourceColumn: 2, sourceEndLine: 778};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/outlatch'}) SET n:Device SET n += {type: 'LS259', tag: 'outlatch', clock: null, config: ['LS259(config, m_outlatch)', 'm_outlatch->q_out_cb<0>().set("ymsnd", FUNC(ym2151_device::reset_w))', 'm_outlatch->q_out_cb<4>().set_output("led0").invert()', 'm_outlatch->q_out_cb<5>().set_output("led1").invert()', 'm_outlatch->q_out_cb<6>().set(FUNC(atarisy1_state::coin_counter_right_w))', 'm_outlatch->q_out_cb<7>().set(FUNC(atarisy1_state::coin_counter_left_w))'], member: 'm_outlatch', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 780, sourceColumn: 2, sourceEndLine: 780};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/outlatch/callback:outlatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_outlatch->q_out_cb<0>().set("ymsnd", FUNC(ym2151_device::reset_w))', ownerTag: 'outlatch', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 781, sourceColumn: 2, sourceEndLine: 781, slot: '0', targetTag: 'ymsnd', targetClass: 'ym2151_device', targetMethod: 'reset_w'};
MERGE (n:KG {id: 'handler:ym2151_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'ym2151_device', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 781, sourceColumn: 2, sourceEndLine: 781};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/outlatch/callback:outlatch:1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_outlatch->q_out_cb<6>().set(FUNC(atarisy1_state::coin_counter_right_w))', ownerTag: 'outlatch', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 784, sourceColumn: 2, sourceEndLine: 784, slot: '6', targetClass: 'atarisy1_state', targetMethod: 'coin_counter_right_w'};
MERGE (n:KG {id: 'handler:atarisy1_state.coin_counter_right_w'}) SET n:Handler SET n += {method: 'coin_counter_right_w', ownerClass: 'atarisy1_state', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 386, sourceColumn: 1, sourceEndLine: 389, sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(0, state);'};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/outlatch/callback:outlatch:2'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_outlatch->q_out_cb<7>().set(FUNC(atarisy1_state::coin_counter_left_w))', ownerTag: 'outlatch', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 785, sourceColumn: 2, sourceEndLine: 785, slot: '7', targetClass: 'atarisy1_state', targetMethod: 'coin_counter_left_w'};
MERGE (n:KG {id: 'handler:atarisy1_state.coin_counter_left_w'}) SET n:Handler SET n += {method: 'coin_counter_left_w', ownerClass: 'atarisy1_state', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 392, sourceColumn: 1, sourceEndLine: 395, sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(1, state);'};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog").set_vblank_count(m_screen, 8)'], sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 787, sourceColumn: 2, sourceEndLine: 787};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/scan_timer'}) SET n:Device SET n += {type: 'TIMER', tag: 'scan_timer', clock: null, config: ['TIMER(config, m_scanline_timer).configure_generic(FUNC(atarisy1_state::int3_callback))'], member: 'm_scanline_timer', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 789, sourceColumn: 2, sourceEndLine: 789};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/scan_timer/callback:scan_timer:0'}) SET n:Callback SET n += {signal: 'configure_generic', operation: 'configure_generic', raw: 'TIMER(config, m_scanline_timer).configure_generic(FUNC(atarisy1_state::int3_callback))', ownerTag: 'scan_timer', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 789, sourceColumn: 2, sourceEndLine: 789, targetClass: 'atarisy1_state', targetMethod: 'int3_callback'};
MERGE (n:KG {id: 'handler:atarisy1_state.int3_callback'}) SET n:Handler SET n += {method: 'int3_callback', ownerClass: 'atarisy1_state', sourceFile: 'src/mame/atari/atarisy1_v.cpp', sourceLine: 370, sourceColumn: 1, sourceEndLine: 384, sourceParameters: 'int param', sourceBody: 'int const scanline = param;

	// update the state
	m_scanline_int_state = true;
	m_maincpu->set_input_line(M68K_IRQ_3, ASSERT_LINE);

	// set a timer to turn it off
	m_int3off_timer->adjust(m_screen->scan_period());

	// determine the time of the next one
	m_next_timer_scanline = -1;
	update_timers(scanline);'};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/int3off_timer'}) SET n:Device SET n += {type: 'TIMER', tag: 'int3off_timer', clock: null, config: ['TIMER(config, m_int3off_timer).configure_generic(FUNC(atarisy1_state::int3off_callback))'], member: 'm_int3off_timer', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 790, sourceColumn: 2, sourceEndLine: 790};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/int3off_timer/callback:int3off_timer:0'}) SET n:Callback SET n += {signal: 'configure_generic', operation: 'configure_generic', raw: 'TIMER(config, m_int3off_timer).configure_generic(FUNC(atarisy1_state::int3off_callback))', ownerTag: 'int3off_timer', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 790, sourceColumn: 2, sourceEndLine: 790, targetClass: 'atarisy1_state', targetMethod: 'int3off_callback'};
MERGE (n:KG {id: 'handler:atarisy1_state.int3off_callback'}) SET n:Handler SET n += {method: 'int3off_callback', ownerClass: 'atarisy1_state', sourceFile: 'src/mame/atari/atarisy1_v.cpp', sourceLine: 362, sourceColumn: 1, sourceEndLine: 367, sourceParameters: 'int param', sourceBody: '// clear the state
	m_scanline_int_state = false;
	m_maincpu->set_input_line(M68K_IRQ_3, CLEAR_LINE);'};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/yreset_timer'}) SET n:Device SET n += {type: 'TIMER', tag: 'yreset_timer', clock: null, config: ['TIMER(config, m_yscroll_reset_timer).configure_generic(FUNC(atarisy1_state::reset_yscroll_callback))'], member: 'm_yscroll_reset_timer', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 791, sourceColumn: 2, sourceEndLine: 791};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/yreset_timer/callback:yreset_timer:0'}) SET n:Callback SET n += {signal: 'configure_generic', operation: 'configure_generic', raw: 'TIMER(config, m_yscroll_reset_timer).configure_generic(FUNC(atarisy1_state::reset_yscroll_callback))', ownerTag: 'yreset_timer', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 791, sourceColumn: 2, sourceEndLine: 791, targetClass: 'atarisy1_state', targetMethod: 'reset_yscroll_callback'};
MERGE (n:KG {id: 'handler:atarisy1_state.reset_yscroll_callback'}) SET n:Handler SET n += {method: 'reset_yscroll_callback', ownerClass: 'atarisy1_state', sourceFile: 'src/mame/atari/atarisy1_v.cpp', sourceLine: 283, sourceColumn: 1, sourceEndLine: 286, sourceParameters: 'int param', sourceBody: 'm_playfield_tilemap->set_scrolly(0, param);'};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_atarisy1)'], member: 'm_gfxdecode', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 794, sourceColumn: 2, sourceEndLine: 794, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette).set_format(palette_device::IRGB_4444, 1024)'], member: 'm_palette', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 796, sourceColumn: 2, sourceEndLine: 796, paletteEntries: 1024};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/playfield'}) SET n:Device SET n += {type: 'TILEMAP', tag: 'playfield', clock: null, config: ['TILEMAP(config, m_playfield_tilemap, m_gfxdecode, 2, 8,8, TILEMAP_SCAN_ROWS, 64,64).set_info_callback(FUNC(atarisy1_state::get_playfield_tile_info))'], member: 'm_playfield_tilemap', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 798, sourceColumn: 2, sourceEndLine: 798, clockExpr: 'm_gfxdecode'};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/playfield/callback:playfield:0'}) SET n:Callback SET n += {signal: 'set_info_callback', delegate: 1, operation: 'set_info_callback', raw: 'TILEMAP(config, m_playfield_tilemap, m_gfxdecode, 2, 8,8, TILEMAP_SCAN_ROWS, 64,64).set_info_callback(FUNC(atarisy1_state::get_playfield_tile_info))', ownerTag: 'playfield', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 798, sourceColumn: 2, sourceEndLine: 798, targetClass: 'atarisy1_state', targetMethod: 'get_playfield_tile_info'};
MERGE (n:KG {id: 'handler:atarisy1_state.get_playfield_tile_info'}) SET n:Handler SET n += {method: 'get_playfield_tile_info', ownerClass: 'atarisy1_state', sourceFile: 'src/mame/atari/atarisy1_v.cpp', sourceLine: 95, sourceColumn: 1, sourceEndLine: 103, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'uint16_t const data = m_playfield_tilemap->basemem_read(tile_index);
	uint16_t const lookup = m_playfield_lookup[((data >> 8) & 0x7f) | (m_playfield_tile_bank << 7)];
	int const gfxindex = (lookup >> 8) & 15;
	int const code = ((lookup & 0xff) << 8) | (data & 0xff);
	int const color = 0x20 + (((lookup >> 12) & 15) << m_bank_color_shift[gfxindex]);
	tileinfo.set(gfxindex, code, color, (data >> 15) & 1);'};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/alpha'}) SET n:Device SET n += {type: 'TILEMAP', tag: 'alpha', clock: null, config: ['TILEMAP(config, m_alpha_tilemap, m_gfxdecode, 2, 8,8, TILEMAP_SCAN_ROWS, 64,32, 0).set_info_callback(FUNC(atarisy1_state::get_alpha_tile_info))'], member: 'm_alpha_tilemap', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 799, sourceColumn: 2, sourceEndLine: 799, clockExpr: 'm_gfxdecode'};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/alpha/callback:alpha:0'}) SET n:Callback SET n += {signal: 'set_info_callback', delegate: 1, operation: 'set_info_callback', raw: 'TILEMAP(config, m_alpha_tilemap, m_gfxdecode, 2, 8,8, TILEMAP_SCAN_ROWS, 64,32, 0).set_info_callback(FUNC(atarisy1_state::get_alpha_tile_info))', ownerTag: 'alpha', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 799, sourceColumn: 2, sourceEndLine: 799, targetClass: 'atarisy1_state', targetMethod: 'get_alpha_tile_info'};
MERGE (n:KG {id: 'handler:atarisy1_state.get_alpha_tile_info'}) SET n:Handler SET n += {method: 'get_alpha_tile_info', ownerClass: 'atarisy1_state', sourceFile: 'src/mame/atari/atarisy1_v.cpp', sourceLine: 85, sourceColumn: 1, sourceEndLine: 92, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'uint16_t const data = m_alpha_tilemap->basemem_read(tile_index);
	int const code = data & 0x3ff;
	int const color = (data >> 10) & 0x07;
	int const opaque = data & 0x2000;
	tileinfo.set(0, code, color, opaque ? TILE_FORCE_LAYER0 : 0);'};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/mob'}) SET n:Device SET n += {type: 'ATARI_MOTION_OBJECTS', tag: 'mob', clock: null, config: ['ATARI_MOTION_OBJECTS(config, m_mob, m_screen, atarisy1_state::s_mob_config)', 'm_mob->set_gfxdecode(m_gfxdecode)'], member: 'm_mob', cls: 'atari_motion_objects_device', clsHierarchy: ['atari_motion_objects_device', 'atari_motion_objects_config'], sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 801, sourceColumn: 2, sourceEndLine: 801, configCalls: ['set_gfxdecode("gfxdecode")'], clockExpr: 'm_screen', startHandler: 'atari_motion_objects_device.device_start', deviceTimers: ['m_force_update_timer=atari_motion_objects_device.force_update']};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_video_attributes(VIDEO_UPDATE_BEFORE_VBLANK)', 'm_screen->set_raw(14.318181_MHz_XTAL/2, 456, 0, 336, 262, 0, 240)', 'm_screen->set_screen_update(FUNC(atarisy1_state::screen_update))', 'm_screen->set_palette(m_palette)', 'm_screen->screen_vblank().set_inputline(m_maincpu, M68K_IRQ_4, ASSERT_LINE)'], member: 'm_screen', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 804, sourceColumn: 2, sourceEndLine: 804, configCalls: ['set_raw(7159090.5,456,0,336,262,0,240)', 'set_palette("palette")'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [7159090.5, 456, 0, 336, 262, 0, 240], screenRawExpr: ['14.318181_MHz_XTAL/2', '456', '0', '336', '262', '0', '240'], screenVideoAttributes: ['VIDEO_UPDATE_BEFORE_VBLANK']};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(atarisy1_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 809, sourceColumn: 2, sourceEndLine: 809, targetClass: 'atarisy1_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:atarisy1_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'atarisy1_state', sourceFile: 'src/mame/atari/atarisy1_v.cpp', sourceLine: 476, sourceColumn: 1, sourceEndLine: 518, sourceConstants: ['PRIORITY_MASK=61440', 'atari_motion_objects_device::PRIORITY_MASK=61440'], sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: '// start drawing
	m_mob->draw_async(cliprect);

	// draw the playfield
	m_playfield_tilemap->draw(screen, bitmap, cliprect, 0, 0);

	// draw and merge the MO
	bitmap_ind16 &mobitmap = m_mob->bitmap();
	m_mob->iterate_dirty_rects(
			cliprect,
			[this, &bitmap, &mobitmap] (rectangle const &rect)
			{
				for (int y = rect.top(); y <= rect.bottom(); y++)
				{
					uint16_t const *const mo = &mobitmap.pix(y);
					uint16_t *const pf = &bitmap.pix(y);
					for (int x = rect.left(); x <= rect.right(); x++)
					{
						if (mo[x] != 0xffff)
						{
							if (mo[x] & atari_motion_objects_device::PRIORITY_MASK)
							{
								// high priority MO - only gets priority if MO pen is not 1
								if ((mo[x] & 0x0f) != 1)
									pf[x] = 0x300 + ((pf[x] & 0x0f) << 4) + (mo[x] & 0x0f);
							}
							else
							{
								// low priority - priority pens for playfield color 0
								if ((pf[x] & 0xf8) != 0 || !(m_playfield_priority_pens & (1 << (pf[x] & 0x07))))
									pf[x] = mo[x];
							}
						}
					}
				}
			});

	// add the alpha on top
	m_alpha_tilemap->draw(screen, bitmap, cliprect, 0, 0);
	return 0;'};
MERGE (n:KG {id: 'handler:atari_motion_objects_device.draw'}) SET n:Handler SET n += {method: 'draw', ownerClass: 'atari_motion_objects_device', sourceFile: 'src/mame/atari/atarimo.cpp', sourceLine: 163, sourceColumn: 1, sourceEndLine: 230, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: '// compute start/stop bands
	int startband = ((cliprect.top() + m_yscroll - m_slipoffset) & m_bitmapymask) >> m_slipshift;
	int stopband = ((cliprect.bottom() + m_yscroll - m_slipoffset) & m_bitmapymask) >> m_slipshift;
	if (startband > stopband)
		startband -= m_bitmapheight >> m_slipshift;
	if (m_slipshift == 0)
		stopband = startband;

	// loop over SLIP bands
	for (int band = startband; band <= stopband; band++)
	{
		// compute the starting link and clip for the current band
		rectangle bandclip = cliprect;
		int link = 0;
		if (m_slipshift != 0)
		{
			// extract the link from the SLIP RAM
			link = (m_slipram[band & m_sliprammask] >> m_linkmask.shift()) & m_linkmask.mask();

			// compute minimum Y and wrap around if necessary
			bandclip.min_y = ((band << m_slipshift) - m_yscroll + m_slipoffset) & m_bitmapymask;
			if (bandclip.min_y >= bitmap.height())
				bandclip.min_y -= m_bitmapheight;

			// maximum Y is based on the minimum
			bandclip.set_height(1 << m_slipshift);

			// keep within the cliprect
			bandclip &= cliprect;
		}

		// if this matches the last link, we don\'t need to re-process the list
		build_active_list(link);

		// initialize the parameters
		m_next_xpos = 123456;

		// safety check
		if (m_activelist == m_activelast)
			continue;

		// set the start and end points
		uint16_t *first, *last;
		int step;
		if (m_reverse)
		{
			first = m_activelast - 4;
			last = m_activelist;
			step = -4;
		}
		else
		{
			first = m_activelist;
			last = m_activelast - 4;
			step = 4;
		}

		// render the mos
		for (uint16_t *current = first; ; current += step)
		{
			render_object(bitmap, bandclip, current);
			if (current == last)
				break;
		}
	}'};
MERGE (n:KG {id: 'handler:atari_motion_objects_device.build_active_list'}) SET n:Handler SET n += {method: 'build_active_list', ownerClass: 'atari_motion_objects_device', sourceFile: 'src/mame/atari/atarimo.cpp', sourceLine: 374, sourceColumn: 1, sourceEndLine: 412, sourceConstants: ['MAX_PER_BANK=1024'], sourceParameters: 'int link', sourceBody: 'uint16_t const *bankbase = &spriteram()[m_bank << (m_entrybits + 2)];
	uint16_t *current = &m_activelist[0];

	// visit all the motion objects and copy their data into the display list
	uint8_t visited[MAX_PER_BANK] = {0};
	for (int i = 0; i < m_maxperline && !visited[link]; i++)
	{
		// copy the current entry into the list
		uint16_t *modata = current;
		if (!m_split)
		{
			uint16_t const *srcdata = &bankbase[link * 4];
			*current++ = srcdata[0];
			*current++ = srcdata[1];
			*current++ = srcdata[2];
			*current++ = srcdata[3];
		}
		else
		{
			uint16_t const *srcdata = &bankbase[link];
			*current++ = srcdata[uint32_t(0 << m_entrybits)];
			*current++ = srcdata[uint32_t(1 << m_entrybits)];
			*current++ = srcdata[uint32_t(2 << m_entrybits)];
			*current++ = srcdata[uint32_t(3 << m_entrybits)];
		}

		// link to the next object
		visited[link] = 1;
		if (m_linked)
			link = m_linkmask.extract(modata);
		else
			link = (link + 1) & m_linkmask.mask();
	}

	// note the last entry
	m_activelast = current;'};
MERGE (n:KG {id: 'handler:atari_motion_objects_device.render_object'}) SET n:Handler SET n += {method: 'render_object', ownerClass: 'atari_motion_objects_device', sourceFile: 'src/mame/atari/atarimo.cpp', sourceLine: 421, sourceColumn: 1, sourceEndLine: 552, sourceConstants: ['PRIORITY_SHIFT=12'], sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect, const uint16_t *entry', sourceBody: '// select the gfx element and save off key information
	int const rawcode = m_codemask.extract(entry);
	gfx_element *gfx = m_gfxdecode->gfx(m_gfxlookup[rawcode >> 8]);

	// extract data from the various words
	int code = m_codelookup[rawcode];
	int color = m_colorlookup[m_colormask.extract(entry)];
	int xpos = m_xposmask.extract(entry) + m_xoffset;
	int ypos = -m_yposmask.extract(entry);
	int const hflip = m_hflipmask.extract(entry);
	int const vflip = m_vflipmask.extract(entry);
	int const width = m_widthmask.extract(entry) + 1;
	int const height = m_heightmask.extract(entry) + 1;
	int const priority = m_prioritymask.extract(entry);

	// compute the effective color, merging in priority
	color = (color * gfx->granularity()) | (priority << PRIORITY_SHIFT);
	color += m_palettebase;

	// add in the scroll positions if we\'re not in absolute coordinates
	if (!m_absolutemask.extract(entry))
	{
		xpos -= m_xscroll;
		ypos -= m_yscroll;
	}

	// adjust for height
	ypos -= height << m_tileyshift;

	// handle previous hold bits
	if (m_next_xpos != 123456)
		xpos = m_next_xpos;
	m_next_xpos = 123456;

	// check for the hold bit
	if (m_neighbormask.extract(entry) != 0)
	{
		if (!m_nextneighbor)
			xpos = m_last_xpos + m_tilewidth;
		else
			m_next_xpos = xpos + m_tilewidth;
	}
	m_last_xpos = xpos;

	// adjust the final coordinates
	xpos &= m_bitmapxmask;
	ypos &= m_bitmapymask;
	if (xpos >= bitmap.width())
		xpos -= m_bitmapwidth;
	if (ypos >= bitmap.height())
		ypos -= m_bitmapheight;

	// is this one special?
	if (m_specialmask.mask() == 0 || m_specialmask.extract(entry) != m_specialvalue)
	{
		// adjust for h flip
		int xadv = m_tilewidth;
		if (hflip)
		{
			xpos += (width - 1) << m_tilexshift;
			xadv = -xadv;
		}

		// adjust for v flip
		int yadv = m_tileheight;
		if (vflip)
		{
			ypos += (height - 1) << m_tileyshift;
			yadv = -yadv;
		}

		// standard order is: loop over Y first, then X
		if (!m_swapxy)
		{
			// loop over the height
			for (int y = 0, sy = ypos; y < height; y++, sy += yadv)
			{
				// clip the Y coordinate
				if (sy <= cliprect.top() - m_tileheight)
				{
					code += width;
					continue;
				}
				else if (sy > cliprect.bottom())
					break;

				// loop over the width
				for (int x = 0, sx = xpos; x < width; x++, sx += xadv, code++)
				{
					// clip the X coordinate
					if (sx <= -cliprect.left() - m_tilewidth || sx > cliprect.right())
						continue;

					// draw the sprite
					gfx->transpen_raw(bitmap, cliprect, code, color, hflip, vflip, sx, sy, m_transpen);
					mark_dirty(sx, sx + m_tilewidth - 1, sy, sy + m_tileheight - 1);
				}
			}
		}

		// alternative order is swapped
		else
		{
			// loop over the width
			for (int x = 0, sx = xpos; x < width; x++, sx += xadv)
			{
				// clip the X coordinate
				if (sx <= cliprect.left() - m_tilewidth)
				{
					code += height;
					continue;
				}
				else if (sx > cliprect.right())
					break;

				// loop over the height
				for (int y = 0, sy = ypos; y < height; y++, sy += yadv, code++)
				{
					// clip the X coordinate
					if (sy <= -cliprect.top() - m_tileheight || sy > cliprect.bottom())
						continue;

					// draw the sprite
					gfx->transpen_raw(bitmap, cliprect, code, color, hflip, vflip, sx, sy, m_transpen);
					mark_dirty(sx, sx + m_tilewidth - 1, sy, sy + m_tileheight - 1);
				}
			}
		}
	}'};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set_inputline', raw: 'm_screen->screen_vblank().set_inputline(m_maincpu, M68K_IRQ_4, ASSERT_LINE)', ownerTag: 'screen', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 811, sourceColumn: 2, sourceEndLine: 811, inputLine: 'M68K_IRQ_4', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/speaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speaker', clock: 2, config: ['SPEAKER(config, "speaker", 2).front()'], sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 814, sourceColumn: 2, sourceEndLine: 814};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/soundlatch'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch', clock: null, config: ['GENERIC_LATCH_8(config, m_soundlatch)', 'm_soundlatch->data_pending_callback().set_inputline(m_audiocpu, m6502_device::NMI_LINE)', 'm_soundlatch->data_pending_callback().append([this](int state) { if (state) machine().scheduler().perfect_quantum(attotime::from_usec(100)); })'], member: 'm_soundlatch', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 816, sourceColumn: 2, sourceEndLine: 816};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/soundlatch/callback:soundlatch:0'}) SET n:Callback SET n += {signal: 'data_pending_callback', operation: 'set_inputline', raw: 'm_soundlatch->data_pending_callback().set_inputline(m_audiocpu, m6502_device::NMI_LINE)', ownerTag: 'soundlatch', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 817, sourceColumn: 2, sourceEndLine: 817, inputLine: 'm6502_device::NMI_LINE', targetTag: 'audiocpu'};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/soundlatch/callback:soundlatch:1'}) SET n:Callback SET n += {signal: 'data_pending_callback', operation: 'perfect_quantum', raw: 'm_soundlatch->data_pending_callback().append([this](int state) { if (state) machine().scheduler().perfect_quantum(attotime::from_usec(100)); })', ownerTag: 'soundlatch', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 818, sourceColumn: 2, sourceEndLine: 818, quantumSeconds: 0.00009999999999999999};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/mainlatch'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'mainlatch', clock: null, config: ['GENERIC_LATCH_8(config, m_mainlatch)', 'm_mainlatch->data_pending_callback().set_inputline(m_maincpu, M68K_IRQ_6)'], member: 'm_mainlatch', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 820, sourceColumn: 2, sourceEndLine: 820};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/mainlatch/callback:mainlatch:0'}) SET n:Callback SET n += {signal: 'data_pending_callback', operation: 'set_inputline', raw: 'm_mainlatch->data_pending_callback().set_inputline(m_maincpu, M68K_IRQ_6)', ownerTag: 'mainlatch', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 821, sourceColumn: 2, sourceEndLine: 821, inputLine: 'M68K_IRQ_6', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/ymsnd'}) SET n:Device SET n += {type: 'YM2151', tag: 'ymsnd', clock: 3579545.25, config: ['ym2151_device &ymsnd(YM2151(config, "ymsnd", 14.318181_MHz_XTAL/4))', 'ymsnd.irq_handler().set_inputline(m_audiocpu, m6502_device::IRQ_LINE)', 'ymsnd.add_route(0, "speaker", 0.48, 0)', 'ymsnd.add_route(1, "speaker", 0.48, 1)'], sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 823, sourceColumn: 2, sourceEndLine: 823, configCalls: ['add_route(0,"speaker",0.48,0)', 'add_route(1,"speaker",0.48,1)']};
MERGE (n:KG {id: 'audioroute:device:atarisy1_state.atarisy1/ymsnd/0'}) SET n:AudioRoute SET n += {output: '0', target: 'speaker', gain: 0.48, input: 0, raw: 'ymsnd.add_route(0, "speaker", 0.48, 0)', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 825, sourceColumn: 2, sourceEndLine: 825};
MERGE (n:KG {id: 'audioroute:device:atarisy1_state.atarisy1/ymsnd/1'}) SET n:AudioRoute SET n += {output: '1', target: 'speaker', gain: 0.48, input: 1, raw: 'ymsnd.add_route(1, "speaker", 0.48, 1)', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 826, sourceColumn: 2, sourceEndLine: 826};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/ymsnd/callback:ymsnd:0'}) SET n:Callback SET n += {signal: 'irq_handler', operation: 'set_inputline', raw: 'ymsnd.irq_handler().set_inputline(m_audiocpu, m6502_device::IRQ_LINE)', ownerTag: 'ymsnd', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 824, sourceColumn: 2, sourceEndLine: 824, inputLine: 'm6502_device::IRQ_LINE', targetTag: 'audiocpu'};
MERGE (n:KG {id: 'device:atarisy1_state.atarisy1/pokey'}) SET n:Device SET n += {type: 'POKEY', tag: 'pokey', clock: 1789772.625, config: ['pokey_device &pokey(POKEY(config, "pokey", 14.318181_MHz_XTAL/8))', 'pokey.add_route(ALL_OUTPUTS, "speaker", 0.24, 0)', 'pokey.add_route(ALL_OUTPUTS, "speaker", 0.24, 1)'], sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 828, sourceColumn: 2, sourceEndLine: 828};
MERGE (n:KG {id: 'audioroute:device:atarisy1_state.atarisy1/pokey/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.24, input: 0, raw: 'pokey.add_route(ALL_OUTPUTS, "speaker", 0.24, 0)', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 829, sourceColumn: 2, sourceEndLine: 829};
MERGE (n:KG {id: 'audioroute:device:atarisy1_state.atarisy1/pokey/1'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.24, input: 1, raw: 'pokey.add_route(ALL_OUTPUTS, "speaker", 0.24, 1)', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 830, sourceColumn: 2, sourceEndLine: 830};
MERGE (n:KG {id: 'machine:atarisy1_state.marble'}) SET n:MachineConfig SET n += {cls: 'atarisy1_state', name: 'marble', calls: ['atarisy1'], stateMembers: ['{"name":"m_joystick_type","bits":8}', '{"name":"m_trackball_type","bits":8}', '{"name":"m_playfield_lookup","bits":16,"arrayLength":256}', '{"name":"m_playfield_tile_bank","bits":8}', '{"name":"m_playfield_priority_pens","bits":16}', '{"name":"m_next_timer_scanline","bits":32,"signed":true}', '{"name":"m_scanline_int_state","bits":1}', '{"name":"m_bank_color_shift","bits":8}', '{"name":"m_bankselect","bits":8}'], resetHandlers: ['atarisy1_state.machine_reset'], startHandlers: ['atarisy1_state.video_start'], sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 833, sourceColumn: 1, sourceEndLine: 839};
MERGE (n:KG {id: 'bank:atarisy1_state.marble/slapstic_bank'}) SET n:MemoryBank SET n += {tag: 'slapstic_bank', member: 'm_slapstic_bank', startEntry: 0, entries: 4, region: 'maincpu', offset: 524288, stride: 8192, raw: 'm_slapstic_bank->configure_entries(0, 4, memregion("maincpu")->base() + 0x80000, 0x2000)', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 2612, sourceColumn: 1, sourceEndLine: 2615};
MERGE (n:KG {id: 'device:atarisy1_state.marble/slapstic'}) SET n:Device SET n += {type: 'SLAPSTIC', tag: 'slapstic', clock: 103, config: ['SLAPSTIC(config, m_slapstic, 103)', 'm_slapstic->set_range(m_maincpu, AS_PROGRAM, 0x80000, 0x87fff, 0)', 'm_slapstic->set_bank(m_slapstic_bank)'], member: 'm_slapstic', cls: 'atari_slapstic_device', clsHierarchy: ['atari_slapstic_device'], sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 836, sourceColumn: 2, sourceEndLine: 836, configCalls: ['set_range("maincpu",0,524288,557055,0)', 'set_bank("slapstic_bank")']};
MERGE (n:KG {id: 'handler:atari_motion_objects_device.device_start'}) SET n:Handler SET n += {method: 'device_start', ownerClass: 'atari_motion_objects_device', sourceFile: 'src/mame/atari/atarimo.cpp', sourceLine: 259, sourceColumn: 1, sourceEndLine: 336, sourceConstants: ['MAX_PER_BANK=1024'], sourceParameters: '', sourceBody: '// call parent
	sprite16_device_ind16::device_start();

	// verify configuration
	gfx_element *gfx = m_gfxdecode->gfx(m_gfxindex);
	if (gfx == nullptr)
		throw emu_fatalerror("No gfxelement #%d!", m_gfxindex);

	// determine the masks
	m_linkmask.set(m_link_entry);
	m_codemask.set(m_code_entry);
	m_colormask.set(m_color_entry);
	m_xposmask.set(m_xpos_entry);
	m_yposmask.set(m_ypos_entry);
	m_widthmask.set(m_width_entry);
	m_heightmask.set(m_height_entry);
	m_hflipmask.set(m_hflip_entry);
	m_vflipmask.set(m_vflip_entry);
	m_prioritymask.set(m_priority_entry);
	m_neighbormask.set(m_neighbor_entry);
	m_absolutemask.set(m_absolute_entry);

	// derive tile information
	m_tilewidth = gfx->width();
	m_tileheight = gfx->height();
	m_tilexshift = compute_log(m_tilewidth);
	m_tileyshift = compute_log(m_tileheight);

	// derive bitmap information
	m_bitmapwidth = round_to_powerof2(m_xposmask.mask());
	m_bitmapheight = round_to_powerof2(m_yposmask.mask());
	m_bitmapxmask = m_bitmapwidth - 1;
	m_bitmapymask = m_bitmapheight - 1;

	// derive sprite information
	m_entrycount = round_to_powerof2(m_linkmask.mask());
	m_entrybits = compute_log(m_entrycount);
	m_spriteramsize = m_bankcount * m_entrycount;
	m_spriterammask = m_spriteramsize - 1;
	m_slipshift = (m_slipheight != 0) ? compute_log(m_slipheight) : 0;
	m_slipramsize = m_bitmapheight >> m_slipshift;
	m_sliprammask = m_slipramsize - 1;
	if (m_maxperline == 0)
		m_maxperline = MAX_PER_BANK;

	// Get the slipram from the share if not already explicitly set
	if (!m_slipram)
		m_slipram = m_slipramshare;

	// allocate and initialize the code lookup
	int const codesize = round_to_powerof2(m_codemask.mask());
	m_codelookup.resize(codesize);
	for (int i = 0; i < codesize; i++)
		m_codelookup[i] = i;

	// allocate and initialize the color lookup
	int const colorsize = round_to_powerof2(m_colormask.mask());
	m_colorlookup.resize(colorsize);
	for (int i = 0; i < colorsize; i++)
		m_colorlookup[i] = i;

	// allocate and the gfx lookup
	int const gfxsize = codesize / 256;
	m_gfxlookup.resize(gfxsize);
	for (int i = 0; i < gfxsize; i++)
		m_gfxlookup[i] = m_gfxindex;

	// allocate a timer to periodically force update
	m_force_update_timer = timer_alloc(FUNC(atari_motion_objects_device::force_update), this);
	m_force_update_timer->adjust(screen().time_until_pos(0));

	// register for save states
	save_item(NAME(m_bank));
	save_item(NAME(m_xscroll));
	save_item(NAME(m_yscroll));'};
MERGE (n:KG {id: 'handler:atari_motion_objects_device.compute_log'}) SET n:Handler SET n += {method: 'compute_log', ownerClass: 'atari_motion_objects_device', sourceFile: 'src/mame/atari/atarimo.cpp', sourceLine: 82, sourceColumn: 1, sourceEndLine: 93, sourceParameters: 'int value', sourceBody: 'int log = 0;

	if (value == 0)
		return -1;
	while (!(value & 1))
		log++, value >>= 1;
	if (value != 1)
		return -1;
	return log;'};
MERGE (n:KG {id: 'handler:atari_motion_objects_device.round_to_powerof2'}) SET n:Handler SET n += {method: 'round_to_powerof2', ownerClass: 'atari_motion_objects_device', sourceFile: 'src/mame/atari/atarimo.cpp', sourceLine: 103, sourceColumn: 1, sourceEndLine: 112, sourceParameters: 'int value', sourceBody: 'int log = 0;

	if (value == 0)
		return 1;
	while ((value >>= 1) != 0)
		log++;
	return 1 << (log + 1);'};
MERGE (n:KG {id: 'handler:atari_motion_objects_device.force_update'}) SET n:Handler SET n += {method: 'force_update', ownerClass: 'atari_motion_objects_device', sourceFile: 'src/mame/atari/atarimo.cpp', sourceLine: 358, sourceColumn: 1, sourceEndLine: 366, sourceParameters: 'int param', sourceBody: 'if (param > 0)
		screen().update_partial(param - 1);
	param += 64;
	if (param >= screen().visible_area().bottom())
		param = 0;
	m_force_update_timer->adjust(screen().time_until_pos(param), param);'};
MERGE (n:KG {id: 'inputs:marble'}) SET n:InputPorts SET n += {name: 'marble', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 468, sourceColumn: 8, sourceEndLine: 468};
MERGE (n:KG {id: 'inputs:marble/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:marble/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: false, type: 'IPT_TRACKBALL_X', modifiers: ['PORT_SENSITIVITY(30)', 'PORT_KEYDELTA(30)', 'PORT_REVERSE', 'PORT_PLAYER(1)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:marble/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:marble/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: false, type: 'IPT_TRACKBALL_Y', modifiers: ['PORT_SENSITIVITY(30)', 'PORT_KEYDELTA(30)', 'PORT_PLAYER(1)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:marble/IN2'}) SET n:Port SET n += {tag: 'IN2', modify: false};
MERGE (n:KG {id: 'inputs:marble/IN2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: false, type: 'IPT_TRACKBALL_X', modifiers: ['PORT_SENSITIVITY(30)', 'PORT_KEYDELTA(30)', 'PORT_REVERSE', 'PORT_PLAYER(2)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:marble/IN3'}) SET n:Port SET n += {tag: 'IN3', modify: false};
MERGE (n:KG {id: 'inputs:marble/IN3/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: false, type: 'IPT_TRACKBALL_Y', modifiers: ['PORT_SENSITIVITY(30)', 'PORT_KEYDELTA(30)', 'PORT_PLAYER(2)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:marble/F60000'}) SET n:Port SET n += {tag: 'F60000', modify: false};
MERGE (n:KG {id: 'inputs:marble/F60000/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_START1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:marble/F60000/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_START2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:marble/F60000/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_UNUSED', defaultValue: 4};
MERGE (n:KG {id: 'inputs:marble/F60000/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNUSED', defaultValue: 8};
MERGE (n:KG {id: 'inputs:marble/F60000/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("screen", FUNC(screen_device::vblank))'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:marble/F60000/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNUSED', defaultValue: 32};
MERGE (n:KG {id: 'inputs:marble/F60000/f6'}) SET n:PortField SET n += {kind: 'service', mask: 64, activeLow: true, defaultValue: 64};
MERGE (n:KG {id: 'inputs:marble/F60000/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("soundlatch", FUNC(generic_latch_8_device::pending_r))'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:marble/F60000/f8'}) SET n:PortField SET n += {kind: 'bit', mask: 65280, activeLow: true, type: 'IPT_UNUSED', defaultValue: 65280};
MERGE (n:KG {id: 'inputs:marble/1820'}) SET n:Port SET n += {tag: '1820', modify: false};
MERGE (n:KG {id: 'inputs:marble/1820/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_COIN1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:marble/1820/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_COIN2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:marble/1820/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_COIN3', defaultValue: 4};
MERGE (n:KG {id: 'inputs:marble/1820/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("soundlatch", FUNC(generic_latch_8_device::pending_r))'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:marble/1820/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("mainlatch", FUNC(generic_latch_8_device::pending_r))'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:marble/1820/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 96, activeLow: false, type: 'IPT_UNUSED', defaultValue: 0};
MERGE (n:KG {id: 'inputs:marble/1820/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_CUSTOM', defaultValue: 128};
MERGE (n:KG {id: 'gfxlayout:anlayout'}) SET n:GfxLayout SET n += {name: 'anlayout', width: 8, height: 8, total: 'RGN_FRAC(1,1)', planes: 2, planeOffsets: [0, 4], xOffsets: [0, 1, 2, 3, 8, 9, 10, 11], yOffsets: [0, 16, 32, 48, 64, 80, 96, 112], charIncrement: 128};
MERGE (n:KG {id: 'gfxdecode:gfx_atarisy1'}) SET n:GfxDecode SET n += {name: 'gfx_atarisy1', sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 725, sourceColumn: 8, sourceEndLine: 725};
MERGE (n:KG {id: 'gfxdecode:gfx_atarisy1/e0'}) SET n:GfxDecodeEntry SET n += {region: 'alpha', offset: 0, layout: 'anlayout', colorBase: 0, colorCount: 64, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:marble'}), (b:KG {id: 'file:src/mame/atari/atarisy1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 2671, sourceColumn: 1, sourceEndLine: 2671};
MATCH (a:KG {id: 'game:marble'}), (b:KG {id: 'game:atarisy1'}) MERGE (a)-[r:CLONE_OF]->(b);
MATCH (a:KG {id: 'game:marble'}), (b:KG {id: 'machine:atarisy1_state.marble'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:marble'}), (b:KG {id: 'inputs:marble'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:marble'}), (b:KG {id: 'romset:marble'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/atarisy1.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/atarisy1.cpp'}), (b:KG {id: 'file:atarisy1.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/atarisy1.cpp'}), (b:KG {id: 'file:cpu/m68000/m68010.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/atarisy1.cpp'}), (b:KG {id: 'file:cpu/m6502/m6502.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/atarisy1.cpp'}), (b:KG {id: 'file:machine/eeprompar.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/atarisy1.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/atarisy1.cpp'}), (b:KG {id: 'file:sound/pokey.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/atarisy1.cpp'}), (b:KG {id: 'file:sound/ymopm.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/atarisy1.cpp'}), (b:KG {id: 'file:atarimo.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/atarisy1.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'game:atarisy1'}), (b:KG {id: 'file:src/mame/atari/atarisy1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 2669, sourceColumn: 1, sourceEndLine: 2669};
MATCH (a:KG {id: 'game:atarisy1'}), (b:KG {id: 'romset:atarisy1'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.marble'}), (b:KG {id: 'file:src/mame/atari/atarisy1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 833, sourceColumn: 1, sourceEndLine: 839};
MATCH (a:KG {id: 'machine:atarisy1_state.marble'}), (b:KG {id: 'handler:atarisy1_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.marble'}), (b:KG {id: 'handler:atarisy1_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.marble'}), (b:KG {id: 'machine:atarisy1_state.atarisy1'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:atarisy1_state.marble'}), (b:KG {id: 'bank:atarisy1_state.marble/slapstic_bank'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.marble'}), (b:KG {id: 'device:atarisy1_state.marble/slapstic'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:marble'}), (b:KG {id: 'file:src/mame/atari/atarisy1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 468, sourceColumn: 8, sourceEndLine: 468};
MATCH (a:KG {id: 'inputs:marble'}), (b:KG {id: 'inputs:marble/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:marble'}), (b:KG {id: 'inputs:marble/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:marble'}), (b:KG {id: 'inputs:marble/IN2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:marble'}), (b:KG {id: 'inputs:marble/IN3'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:marble'}), (b:KG {id: 'inputs:marble/F60000'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:marble'}), (b:KG {id: 'inputs:marble/1820'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:marble'}), (b:KG {id: 'file:src/mame/atari/atarisy1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 1003, sourceColumn: 1, sourceEndLine: 1003};
MATCH (a:KG {id: 'romset:marble'}), (b:KG {id: 'region:marble/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:marble'}), (b:KG {id: 'region:marble/audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:marble'}), (b:KG {id: 'region:marble/alpha'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:marble'}), (b:KG {id: 'region:marble/tiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:marble'}), (b:KG {id: 'region:marble/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:marble'}), (b:KG {id: 'region:marble/motherbrd_proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:atarisy1'}), (b:KG {id: 'file:src/mame/atari/atarisy1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 975, sourceColumn: 1, sourceEndLine: 975};
MATCH (a:KG {id: 'romset:atarisy1'}), (b:KG {id: 'region:atarisy1/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:atarisy1'}), (b:KG {id: 'region:atarisy1/audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:atarisy1'}), (b:KG {id: 'region:atarisy1/alpha'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:atarisy1'}), (b:KG {id: 'region:atarisy1/tiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:atarisy1'}), (b:KG {id: 'region:atarisy1/motherbrd_proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:atarisy1'}), (b:KG {id: 'region:atarisy1/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:atarisy1_state.machine_reset'}), (b:KG {id: 'handler:atarisy1_state.bankselect_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:atarisy1_state.video_start'}), (b:KG {id: 'handler:atarisy1_state.decode_gfx'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:atarisy1_state.video_start'}), (b:KG {id: 'handler:atari_motion_objects_device.code_lookup'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:atarisy1_state.video_start'}), (b:KG {id: 'handler:atari_motion_objects_device.color_lookup'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:atarisy1_state.video_start'}), (b:KG {id: 'handler:atari_motion_objects_device.gfx_lookup'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:atarisy1_state.video_start'}), (b:KG {id: 'handler:atari_motion_objects_device.set_yscroll'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.atarisy1'}), (b:KG {id: 'file:src/mame/atari/atarisy1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 769, sourceColumn: 1, sourceEndLine: 831};
MATCH (a:KG {id: 'machine:atarisy1_state.atarisy1'}), (b:KG {id: 'handler:atarisy1_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.atarisy1'}), (b:KG {id: 'handler:atarisy1_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.atarisy1'}), (b:KG {id: 'device:atarisy1_state.atarisy1/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.atarisy1'}), (b:KG {id: 'device:atarisy1_state.atarisy1/audiocpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.atarisy1'}), (b:KG {id: 'device:atarisy1_state.atarisy1/eeprom'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.atarisy1'}), (b:KG {id: 'device:atarisy1_state.atarisy1/outlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.atarisy1'}), (b:KG {id: 'device:atarisy1_state.atarisy1/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.atarisy1'}), (b:KG {id: 'device:atarisy1_state.atarisy1/scan_timer'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.atarisy1'}), (b:KG {id: 'device:atarisy1_state.atarisy1/int3off_timer'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.atarisy1'}), (b:KG {id: 'device:atarisy1_state.atarisy1/yreset_timer'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.atarisy1'}), (b:KG {id: 'device:atarisy1_state.atarisy1/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.atarisy1'}), (b:KG {id: 'gfxdecode:gfx_atarisy1'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:atarisy1_state.atarisy1'}), (b:KG {id: 'device:atarisy1_state.atarisy1/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.atarisy1'}), (b:KG {id: 'device:atarisy1_state.atarisy1/playfield'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.atarisy1'}), (b:KG {id: 'device:atarisy1_state.atarisy1/alpha'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.atarisy1'}), (b:KG {id: 'device:atarisy1_state.atarisy1/mob'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.atarisy1'}), (b:KG {id: 'device:atarisy1_state.atarisy1/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.atarisy1'}), (b:KG {id: 'device:atarisy1_state.atarisy1/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.atarisy1'}), (b:KG {id: 'device:atarisy1_state.atarisy1/soundlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.atarisy1'}), (b:KG {id: 'device:atarisy1_state.atarisy1/mainlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.atarisy1'}), (b:KG {id: 'device:atarisy1_state.atarisy1/ymsnd'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:atarisy1_state.atarisy1'}), (b:KG {id: 'device:atarisy1_state.atarisy1/pokey'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'bank:atarisy1_state.marble/slapstic_bank'}), (b:KG {id: 'file:src/mame/atari/atarisy1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 2612, sourceColumn: 1, sourceEndLine: 2615};
MATCH (a:KG {id: 'inputs:marble/IN0'}), (b:KG {id: 'inputs:marble/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:marble/IN1'}), (b:KG {id: 'inputs:marble/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:marble/IN2'}), (b:KG {id: 'inputs:marble/IN2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:marble/IN3'}), (b:KG {id: 'inputs:marble/IN3/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:marble/F60000'}), (b:KG {id: 'inputs:marble/F60000/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:marble/F60000'}), (b:KG {id: 'inputs:marble/F60000/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:marble/F60000'}), (b:KG {id: 'inputs:marble/F60000/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:marble/F60000'}), (b:KG {id: 'inputs:marble/F60000/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:marble/F60000'}), (b:KG {id: 'inputs:marble/F60000/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:marble/F60000'}), (b:KG {id: 'inputs:marble/F60000/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:marble/F60000'}), (b:KG {id: 'inputs:marble/F60000/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:marble/F60000'}), (b:KG {id: 'inputs:marble/F60000/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:marble/F60000'}), (b:KG {id: 'inputs:marble/F60000/f8'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:marble/1820'}), (b:KG {id: 'inputs:marble/1820/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:marble/1820'}), (b:KG {id: 'inputs:marble/1820/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:marble/1820'}), (b:KG {id: 'inputs:marble/1820/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:marble/1820'}), (b:KG {id: 'inputs:marble/1820/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:marble/1820'}), (b:KG {id: 'inputs:marble/1820/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:marble/1820'}), (b:KG {id: 'inputs:marble/1820/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:marble/1820'}), (b:KG {id: 'inputs:marble/1820/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:marble/maincpu'}), (b:KG {id: 'rom:marble/maincpu/136032.205.l13'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/maincpu'}), (b:KG {id: 'rom:marble/maincpu/136032.206.l12'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/maincpu'}), (b:KG {id: 'rom:marble/maincpu/136033.623'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/maincpu'}), (b:KG {id: 'rom:marble/maincpu/136033.624'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/maincpu'}), (b:KG {id: 'rom:marble/maincpu/136033.625'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/maincpu'}), (b:KG {id: 'rom:marble/maincpu/136033.626'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/maincpu'}), (b:KG {id: 'rom:marble/maincpu/136033.627'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/maincpu'}), (b:KG {id: 'rom:marble/maincpu/136033.628'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/maincpu'}), (b:KG {id: 'rom:marble/maincpu/136033.229'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/maincpu'}), (b:KG {id: 'rom:marble/maincpu/136033.630'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/maincpu'}), (b:KG {id: 'rom:marble/maincpu/136033.107'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/maincpu'}), (b:KG {id: 'rom:marble/maincpu/136033.108'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/audiocpu'}), (b:KG {id: 'rom:marble/audiocpu/136033.421'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/audiocpu'}), (b:KG {id: 'rom:marble/audiocpu/136033.422'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/alpha'}), (b:KG {id: 'rom:marble/alpha/136032.104.f5'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/tiles'}), (b:KG {id: 'rom:marble/tiles/136033.137'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/tiles'}), (b:KG {id: 'rom:marble/tiles/136033.138'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/tiles'}), (b:KG {id: 'rom:marble/tiles/136033.139'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/tiles'}), (b:KG {id: 'rom:marble/tiles/136033.140'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/tiles'}), (b:KG {id: 'rom:marble/tiles/136033.141'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/tiles'}), (b:KG {id: 'rom:marble/tiles/136033.142'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/tiles'}), (b:KG {id: 'rom:marble/tiles/136033.143'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/tiles'}), (b:KG {id: 'rom:marble/tiles/136033.144'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/tiles'}), (b:KG {id: 'rom:marble/tiles/136033.145'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/tiles'}), (b:KG {id: 'rom:marble/tiles/136033.146'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/tiles'}), (b:KG {id: 'rom:marble/tiles/136033.149'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/tiles'}), (b:KG {id: 'rom:marble/tiles/136033.151'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/tiles'}), (b:KG {id: 'rom:marble/tiles/136033.153'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/proms'}), (b:KG {id: 'rom:marble/proms/136033.118'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/proms'}), (b:KG {id: 'rom:marble/proms/136033.119'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/motherbrd_proms'}), (b:KG {id: 'rom:marble/motherbrd_proms/136032.101.e3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/motherbrd_proms'}), (b:KG {id: 'rom:marble/motherbrd_proms/136032.102.e5'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:marble/motherbrd_proms'}), (b:KG {id: 'rom:marble/motherbrd_proms/136032.103.f7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:atarisy1/maincpu'}), (b:KG {id: 'rom:atarisy1/maincpu/136032.205.l13'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:atarisy1/maincpu'}), (b:KG {id: 'rom:atarisy1/maincpu/136032.206.l12'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:atarisy1/alpha'}), (b:KG {id: 'rom:atarisy1/alpha/136032.104.f5'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:atarisy1/motherbrd_proms'}), (b:KG {id: 'rom:atarisy1/motherbrd_proms/136032.101.e3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:atarisy1/motherbrd_proms'}), (b:KG {id: 'rom:atarisy1/motherbrd_proms/136032.102.e5'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:atarisy1/motherbrd_proms'}), (b:KG {id: 'rom:atarisy1/motherbrd_proms/136032.103.f7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'handler:atarisy1_state.bankselect_w'}), (b:KG {id: 'handler:atarisy1_state.update_timers'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:atarisy1_state.decode_gfx'}), (b:KG {id: 'handler:atarisy1_state.get_bank'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/maincpu'}), (b:KG {id: 'map:atarisy1_state.main_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/audiocpu'}), (b:KG {id: 'map:atarisy1_state.sound_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/outlatch'}), (b:KG {id: 'device:atarisy1_state.atarisy1/outlatch/callback:outlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/outlatch'}), (b:KG {id: 'device:atarisy1_state.atarisy1/outlatch/callback:outlatch:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/outlatch'}), (b:KG {id: 'device:atarisy1_state.atarisy1/outlatch/callback:outlatch:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/scan_timer'}), (b:KG {id: 'device:atarisy1_state.atarisy1/scan_timer/callback:scan_timer:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/int3off_timer'}), (b:KG {id: 'device:atarisy1_state.atarisy1/int3off_timer/callback:int3off_timer:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/yreset_timer'}), (b:KG {id: 'device:atarisy1_state.atarisy1/yreset_timer/callback:yreset_timer:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_atarisy1'}), (b:KG {id: 'file:src/mame/atari/atarisy1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 725, sourceColumn: 8, sourceEndLine: 725};
MATCH (a:KG {id: 'gfxdecode:gfx_atarisy1'}), (b:KG {id: 'gfxdecode:gfx_atarisy1/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/playfield'}), (b:KG {id: 'device:atarisy1_state.atarisy1/playfield/callback:playfield:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/alpha'}), (b:KG {id: 'device:atarisy1_state.atarisy1/alpha/callback:alpha:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/mob'}), (b:KG {id: 'handler:atari_motion_objects_device.device_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/screen'}), (b:KG {id: 'device:atarisy1_state.atarisy1/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/screen'}), (b:KG {id: 'device:atarisy1_state.atarisy1/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/soundlatch'}), (b:KG {id: 'device:atarisy1_state.atarisy1/soundlatch/callback:soundlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/soundlatch'}), (b:KG {id: 'device:atarisy1_state.atarisy1/soundlatch/callback:soundlatch:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/mainlatch'}), (b:KG {id: 'device:atarisy1_state.atarisy1/mainlatch/callback:mainlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/ymsnd'}), (b:KG {id: 'audioroute:device:atarisy1_state.atarisy1/ymsnd/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/ymsnd'}), (b:KG {id: 'audioroute:device:atarisy1_state.atarisy1/ymsnd/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/ymsnd'}), (b:KG {id: 'device:atarisy1_state.atarisy1/ymsnd/callback:ymsnd:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/pokey'}), (b:KG {id: 'audioroute:device:atarisy1_state.atarisy1/pokey/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/pokey'}), (b:KG {id: 'audioroute:device:atarisy1_state.atarisy1/pokey/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map'}), (b:KG {id: 'file:src/mame/atari/atarisy1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 431, sourceColumn: 1, sourceEndLine: 435};
MATCH (a:KG {id: 'map:atarisy1_state.main_map'}), (b:KG {id: 'map:atarisy1_state.main_map_noslapstic'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map'}), (b:KG {id: 'map:atarisy1_state.main_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.sound_map'}), (b:KG {id: 'file:src/mame/atari/atarisy1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 443, sourceColumn: 1, sourceEndLine: 453};
MATCH (a:KG {id: 'map:atarisy1_state.sound_map'}), (b:KG {id: 'map:atarisy1_state.sound_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.sound_map'}), (b:KG {id: 'map:atarisy1_state.sound_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.sound_map'}), (b:KG {id: 'map:atarisy1_state.sound_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.sound_map'}), (b:KG {id: 'map:atarisy1_state.sound_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.sound_map'}), (b:KG {id: 'map:atarisy1_state.sound_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.sound_map'}), (b:KG {id: 'map:atarisy1_state.sound_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.sound_map'}), (b:KG {id: 'map:atarisy1_state.sound_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.sound_map'}), (b:KG {id: 'map:atarisy1_state.sound_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/outlatch/callback:outlatch:0'}), (b:KG {id: 'handler:ym2151_device.reset_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/outlatch/callback:outlatch:1'}), (b:KG {id: 'handler:atarisy1_state.coin_counter_right_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/outlatch/callback:outlatch:2'}), (b:KG {id: 'handler:atarisy1_state.coin_counter_left_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/scan_timer/callback:scan_timer:0'}), (b:KG {id: 'handler:atarisy1_state.int3_callback'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/int3off_timer/callback:int3off_timer:0'}), (b:KG {id: 'handler:atarisy1_state.int3off_callback'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/yreset_timer/callback:yreset_timer:0'}), (b:KG {id: 'handler:atarisy1_state.reset_yscroll_callback'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_atarisy1/e0'}), (b:KG {id: 'gfxlayout:anlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/playfield/callback:playfield:0'}), (b:KG {id: 'handler:atarisy1_state.get_playfield_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/alpha/callback:alpha:0'}), (b:KG {id: 'handler:atarisy1_state.get_alpha_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:atari_motion_objects_device.device_start'}), (b:KG {id: 'handler:atari_motion_objects_device.compute_log'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:atari_motion_objects_device.device_start'}), (b:KG {id: 'handler:atari_motion_objects_device.round_to_powerof2'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:atari_motion_objects_device.device_start'}), (b:KG {id: 'handler:atari_motion_objects_device.force_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/screen/callback:screen:0'}), (b:KG {id: 'handler:atarisy1_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/screen/callback:screen:1'}), (b:KG {id: 'device:atarisy1_state.atarisy1/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/soundlatch/callback:soundlatch:0'}), (b:KG {id: 'device:atarisy1_state.atarisy1/audiocpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/mainlatch/callback:mainlatch:0'}), (b:KG {id: 'device:atarisy1_state.atarisy1/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:atarisy1_state.atarisy1/ymsnd/callback:ymsnd:0'}), (b:KG {id: 'device:atarisy1_state.atarisy1/audiocpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic'}), (b:KG {id: 'file:src/mame/atari/atarisy1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/atarisy1.cpp', sourceLine: 405, sourceColumn: 1, sourceEndLine: 429};
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic'}), (b:KG {id: 'map:atarisy1_state.main_map_noslapstic/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic'}), (b:KG {id: 'map:atarisy1_state.main_map_noslapstic/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic'}), (b:KG {id: 'map:atarisy1_state.main_map_noslapstic/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic'}), (b:KG {id: 'map:atarisy1_state.main_map_noslapstic/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic'}), (b:KG {id: 'map:atarisy1_state.main_map_noslapstic/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic'}), (b:KG {id: 'map:atarisy1_state.main_map_noslapstic/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic'}), (b:KG {id: 'map:atarisy1_state.main_map_noslapstic/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic'}), (b:KG {id: 'map:atarisy1_state.main_map_noslapstic/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic'}), (b:KG {id: 'map:atarisy1_state.main_map_noslapstic/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic'}), (b:KG {id: 'map:atarisy1_state.main_map_noslapstic/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic'}), (b:KG {id: 'map:atarisy1_state.main_map_noslapstic/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic'}), (b:KG {id: 'map:atarisy1_state.main_map_noslapstic/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic'}), (b:KG {id: 'map:atarisy1_state.main_map_noslapstic/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic'}), (b:KG {id: 'map:atarisy1_state.main_map_noslapstic/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic'}), (b:KG {id: 'map:atarisy1_state.main_map_noslapstic/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic'}), (b:KG {id: 'map:atarisy1_state.main_map_noslapstic/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic'}), (b:KG {id: 'map:atarisy1_state.main_map_noslapstic/range16'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic'}), (b:KG {id: 'map:atarisy1_state.main_map_noslapstic/range17'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic'}), (b:KG {id: 'map:atarisy1_state.main_map_noslapstic/range18'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic'}), (b:KG {id: 'map:atarisy1_state.main_map_noslapstic/range19'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic'}), (b:KG {id: 'map:atarisy1_state.main_map_noslapstic/range20'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic'}), (b:KG {id: 'map:atarisy1_state.main_map_noslapstic/range21'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.sound_map/range1'}), (b:KG {id: 'handler:ym2151_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ymsnd'};
MATCH (a:KG {id: 'map:atarisy1_state.sound_map/range1'}), (b:KG {id: 'handler:ym2151_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ymsnd'};
MATCH (a:KG {id: 'map:atarisy1_state.sound_map/range2'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:atarisy1_state.sound_map/range3'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'mainlatch'};
MATCH (a:KG {id: 'map:atarisy1_state.sound_map/range4'}), (b:KG {id: 'handler:atarisy1_state.switch_6502_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.sound_map/range5'}), (b:KG {id: 'handler:ls259_device.write_d0'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'outlatch'};
MATCH (a:KG {id: 'map:atarisy1_state.sound_map/range6'}), (b:KG {id: 'handler:pokey_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'pokey'};
MATCH (a:KG {id: 'map:atarisy1_state.sound_map/range6'}), (b:KG {id: 'handler:pokey_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'pokey'};
MATCH (a:KG {id: 'handler:atarisy1_state.int3_callback'}), (b:KG {id: 'handler:atarisy1_state.update_timers'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:anlayout'}), (b:KG {id: 'file:src/mame/atari/atarisy1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'handler:atarisy1_state.screen_update'}), (b:KG {id: 'handler:atari_motion_objects_device.draw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic/range1'}), (b:KG {id: 'handler:atarisy1_state.int3state_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic/range3'}), (b:KG {id: 'handler:atarisy1_state.xscroll_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic/range4'}), (b:KG {id: 'handler:atarisy1_state.yscroll_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic/range5'}), (b:KG {id: 'handler:atarisy1_state.priority_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic/range6'}), (b:KG {id: 'handler:atarisy1_state.bankselect_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic/range7'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic/range8'}), (b:KG {id: 'handler:atarisy1_state.video_int_ack_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic/range9'}), (b:KG {id: 'handler:eeprom_parallel_28xx_device.unlock_write8'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'eeprom'};
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic/range11'}), (b:KG {id: 'handler:tilemap_device.write16'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'playfield'};
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic/range12'}), (b:KG {id: 'handler:atarisy1_state.spriteram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic/range13'}), (b:KG {id: 'handler:tilemap_device.write16'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'alpha'};
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic/range14'}), (b:KG {id: 'handler:palette_device.write16'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'palette'};
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic/range15'}), (b:KG {id: 'handler:eeprom_parallel_28xx_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'eeprom'};
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic/range15'}), (b:KG {id: 'handler:eeprom_parallel_28xx_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'eeprom'};
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic/range16'}), (b:KG {id: 'handler:atarisy1_state.trakball_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic/range17'}), (b:KG {id: 'handler:atarisy1_state.adc_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic/range17'}), (b:KG {id: 'handler:atarisy1_state.adc_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic/range19'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic/range20'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'mainlatch'};
MATCH (a:KG {id: 'map:atarisy1_state.main_map_noslapstic/range21'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'handler:atari_motion_objects_device.draw'}), (b:KG {id: 'handler:atari_motion_objects_device.build_active_list'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:atari_motion_objects_device.draw'}), (b:KG {id: 'handler:atari_motion_objects_device.render_object'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:atarisy1_state.spriteram_w'}), (b:KG {id: 'handler:atari_motion_objects_device.bank'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:atarisy1_state.spriteram_w'}), (b:KG {id: 'handler:atarisy1_state.update_timers'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:atarisy1_state.adc_r'}), (b:KG {id: 'handler:atarisy1_state.adc_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
