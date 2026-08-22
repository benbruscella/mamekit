// mamekit knowledge graph — driver src/mame/irem/m62.cpp
// generated 2026-08-22T05:52:30.380Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/irem/m62.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/irem/m62.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:m62.h'}) SET n:SourceFile SET n += {path: 'm62.h', external: true};
MERGE (n:KG {id: 'file:iremipt.h'}) SET n:SourceFile SET n += {path: 'iremipt.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:irem.h'}) SET n:SourceFile SET n += {path: 'irem.h', external: true};
MERGE (n:KG {id: 'file:src/mame/irem/irem.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/irem/irem.cpp'};
MERGE (n:KG {id: 'file:cpu/m6800/m6801.h'}) SET n:SourceFile SET n += {path: 'cpu/m6800/m6801.h', external: true};
MERGE (n:KG {id: 'file:sound/discrete.h'}) SET n:SourceFile SET n += {path: 'sound/discrete.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'game:kungfum'}) SET n:Game SET n += {name: 'kungfum', year: '1984', company: 'Irem', fullname: 'Kung-Fu Master (World)', monitor: 'ROT0', cls: 'm62_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE | MACHINE_IMPERFECT_SOUND', kind: 'arcade', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 2541, sourceColumn: 1, sourceEndLine: 2541};
MERGE (n:KG {id: 'romset:kungfum'}) SET n:RomSet SET n += {name: 'kungfum', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1145, sourceColumn: 1, sourceEndLine: 1145};
MERGE (n:KG {id: 'region:kungfum/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1146, sourceColumn: 2, sourceEndLine: 1146};
MERGE (n:KG {id: 'rom:kungfum/maincpu/a-4e-c.bin'}) SET n:Rom SET n += {file: 'a-4e-c.bin', offset: 0, size: 16384, crc: 'b6e2d083', sha1: '17e2cfe2b9d6121239803aba7132918e54ae02bf', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1147, sourceColumn: 2, sourceEndLine: 1147};
MERGE (n:KG {id: 'rom:kungfum/maincpu/a-4d-c.bin'}) SET n:Rom SET n += {file: 'a-4d-c.bin', offset: 16384, size: 16384, crc: '7532918e', sha1: '9d513d5a3b99cc54c4491371cd44af048ef0fb33', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1148, sourceColumn: 2, sourceEndLine: 1148};
MERGE (n:KG {id: 'region:kungfum/irem_audio:iremsound'}) SET n:RomRegion SET n += {tag: 'irem_audio:iremsound', size: 65536, flags: '0', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1150, sourceColumn: 2, sourceEndLine: 1150};
MERGE (n:KG {id: 'rom:kungfum/irem_audio:iremsound/a-3e-.bin'}) SET n:Rom SET n += {file: 'a-3e-.bin', offset: 40960, size: 8192, crc: '58e87ab0', sha1: '3b03c101fec58eac13fc309a78df9a2cd44f7604', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1151, sourceColumn: 2, sourceEndLine: 1151};
MERGE (n:KG {id: 'rom:kungfum/irem_audio:iremsound/a-3f-.bin'}) SET n:Rom SET n += {file: 'a-3f-.bin', offset: 49152, size: 8192, crc: 'c81e31ea', sha1: 'f0fc58b929188c8802cd85549bdf9f4566e6a677', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1152, sourceColumn: 2, sourceEndLine: 1152};
MERGE (n:KG {id: 'rom:kungfum/irem_audio:iremsound/a-3h-.bin'}) SET n:Rom SET n += {file: 'a-3h-.bin', offset: 57344, size: 8192, crc: 'd99fb995', sha1: 'caa6acdbc3b02d248fd123be95ea6fdcb4f35b59', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1153, sourceColumn: 2, sourceEndLine: 1153};
MERGE (n:KG {id: 'region:kungfum/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 24576, flags: '0', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1155, sourceColumn: 2, sourceEndLine: 1155};
MERGE (n:KG {id: 'rom:kungfum/gfx1/g-4c-a.bin'}) SET n:Rom SET n += {file: 'g-4c-a.bin', offset: 0, size: 8192, crc: '6b2cc9c8', sha1: 'ba7c902d08c21a1e33f450406bfbfa35abde3b3f', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1156, sourceColumn: 2, sourceEndLine: 1156};
MERGE (n:KG {id: 'rom:kungfum/gfx1/g-4d-a.bin'}) SET n:Rom SET n += {file: 'g-4d-a.bin', offset: 8192, size: 8192, crc: 'c648f558', sha1: '7cc085d8dc4a770d2828e39859b7b18e80148a00', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1157, sourceColumn: 2, sourceEndLine: 1157};
MERGE (n:KG {id: 'rom:kungfum/gfx1/g-4e-a.bin'}) SET n:Rom SET n += {file: 'g-4e-a.bin', offset: 16384, size: 8192, crc: 'fbe9276e', sha1: '84181c8da79e2c92af04aef3ab5d23f70969dad8', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1158, sourceColumn: 2, sourceEndLine: 1158};
MERGE (n:KG {id: 'region:kungfum/gfx2'}) SET n:RomRegion SET n += {tag: 'gfx2', size: 98304, flags: '0', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1160, sourceColumn: 2, sourceEndLine: 1160};
MERGE (n:KG {id: 'rom:kungfum/gfx2/b-4k-.bin'}) SET n:Rom SET n += {file: 'b-4k-.bin', offset: 0, size: 8192, crc: '16fb5150', sha1: 'a49faf617f948d3ccec2bc6ef97bd399f0958f65', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1161, sourceColumn: 2, sourceEndLine: 1161};
MERGE (n:KG {id: 'rom:kungfum/gfx2/b-4f-.bin'}) SET n:Rom SET n += {file: 'b-4f-.bin', offset: 8192, size: 8192, crc: '67745a33', sha1: 'fcc642fb1b932676c84c1a0901b989673c57c0e5', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1162, sourceColumn: 2, sourceEndLine: 1162};
MERGE (n:KG {id: 'rom:kungfum/gfx2/b-4l-.bin'}) SET n:Rom SET n += {file: 'b-4l-.bin', offset: 16384, size: 8192, crc: 'bd1c2261', sha1: '7155789a01801a9e1a55d4e68c94a3a3ee7d1b2e', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1163, sourceColumn: 2, sourceEndLine: 1163};
MERGE (n:KG {id: 'rom:kungfum/gfx2/b-4h-.bin'}) SET n:Rom SET n += {file: 'b-4h-.bin', offset: 24576, size: 8192, crc: '8ac5ed3a', sha1: '9c88e8c82420428b43923cdee7eb4504882bec69', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1164, sourceColumn: 2, sourceEndLine: 1164};
MERGE (n:KG {id: 'rom:kungfum/gfx2/b-3n-.bin'}) SET n:Rom SET n += {file: 'b-3n-.bin', offset: 32768, size: 8192, crc: '28a213aa', sha1: '0d6d668490bdf4394bc9fed2f3cdc72f2fea46f9', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1165, sourceColumn: 2, sourceEndLine: 1165};
MERGE (n:KG {id: 'rom:kungfum/gfx2/b-4n-.bin'}) SET n:Rom SET n += {file: 'b-4n-.bin', offset: 40960, size: 8192, crc: 'd5228df3', sha1: '836c4f95f873fbf07f9bec63a72c20a14651117c', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1166, sourceColumn: 2, sourceEndLine: 1166};
MERGE (n:KG {id: 'rom:kungfum/gfx2/b-4m-.bin'}) SET n:Rom SET n += {file: 'b-4m-.bin', offset: 49152, size: 8192, crc: 'b16de4f2', sha1: '512260e76c9cd21b8add771de53fbd27c2719213', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1167, sourceColumn: 2, sourceEndLine: 1167};
MERGE (n:KG {id: 'rom:kungfum/gfx2/b-3m-.bin'}) SET n:Rom SET n += {file: 'b-3m-.bin', offset: 57344, size: 8192, crc: 'eba0d66b', sha1: '028f82fc1853b86a3201b24871f41091c3e0b542', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1168, sourceColumn: 2, sourceEndLine: 1168};
MERGE (n:KG {id: 'rom:kungfum/gfx2/b-4c-.bin'}) SET n:Rom SET n += {file: 'b-4c-.bin', offset: 65536, size: 8192, crc: '01298885', sha1: 'd4edf5fe707c5b7231ba72b731b96120064a7ecd', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1169, sourceColumn: 2, sourceEndLine: 1169};
MERGE (n:KG {id: 'rom:kungfum/gfx2/b-4e-.bin'}) SET n:Rom SET n += {file: 'b-4e-.bin', offset: 73728, size: 8192, crc: 'c77b87d4', sha1: 'c0f66f0130f6a290a58a3d77bba1d06f16016901', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1170, sourceColumn: 2, sourceEndLine: 1170};
MERGE (n:KG {id: 'rom:kungfum/gfx2/b-4d-.bin'}) SET n:Rom SET n += {file: 'b-4d-.bin', offset: 81920, size: 8192, crc: '6a70615f', sha1: 'f4683dc0a566567e95e85268612bcf0e6297d955', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1171, sourceColumn: 2, sourceEndLine: 1171};
MERGE (n:KG {id: 'rom:kungfum/gfx2/b-4a-.bin'}) SET n:Rom SET n += {file: 'b-4a-.bin', offset: 90112, size: 8192, crc: '6189d626', sha1: 'ce8e5e95c2684c685481e9c8d921380b20ac0460', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1172, sourceColumn: 2, sourceEndLine: 1172};
MERGE (n:KG {id: 'region:kungfum/spr_height_prom'}) SET n:RomRegion SET n += {tag: 'spr_height_prom', size: 32, flags: '0', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1174, sourceColumn: 2, sourceEndLine: 1174};
MERGE (n:KG {id: 'rom:kungfum/spr_height_prom/b-5f-.bin'}) SET n:Rom SET n += {file: 'b-5f-.bin', offset: 0, size: 32, crc: '7a601c3d', sha1: '5c5cdf51b2c9fdb2b05402d9c260208ae73fe245', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1175, sourceColumn: 2, sourceEndLine: 1175};
MERGE (n:KG {id: 'region:kungfum/spr_color_proms'}) SET n:RomRegion SET n += {tag: 'spr_color_proms', size: 768, flags: '0', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1177, sourceColumn: 2, sourceEndLine: 1177};
MERGE (n:KG {id: 'rom:kungfum/spr_color_proms/b-1m-.bin'}) SET n:Rom SET n += {file: 'b-1m-.bin', offset: 0, size: 256, crc: '76c05a9c', sha1: '1f46f436a17f8c883bdd6d9804b828a81a76f880', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1178, sourceColumn: 2, sourceEndLine: 1178};
MERGE (n:KG {id: 'rom:kungfum/spr_color_proms/b-1n-.bin'}) SET n:Rom SET n += {file: 'b-1n-.bin', offset: 256, size: 256, crc: '23f06b99', sha1: '6b3d6349f019aeab33838ae392bc3f3f89906326', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1179, sourceColumn: 2, sourceEndLine: 1179};
MERGE (n:KG {id: 'rom:kungfum/spr_color_proms/b-1l-.bin'}) SET n:Rom SET n += {file: 'b-1l-.bin', offset: 512, size: 256, crc: '35e45021', sha1: '511b94507f41b377f38184ed9a85f34949b28d26', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1180, sourceColumn: 2, sourceEndLine: 1180};
MERGE (n:KG {id: 'region:kungfum/chr_color_proms'}) SET n:RomRegion SET n += {tag: 'chr_color_proms', size: 768, flags: '0', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1182, sourceColumn: 2, sourceEndLine: 1182};
MERGE (n:KG {id: 'rom:kungfum/chr_color_proms/g-1j-.bin'}) SET n:Rom SET n += {file: 'g-1j-.bin', offset: 0, size: 256, crc: '668e6bca', sha1: 'cd5262b1310821ba7b12873e4db35f081d6b9df4', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1183, sourceColumn: 2, sourceEndLine: 1183};
MERGE (n:KG {id: 'rom:kungfum/chr_color_proms/g-1f-.bin'}) SET n:Rom SET n += {file: 'g-1f-.bin', offset: 256, size: 256, crc: '964b6495', sha1: '76f30a65a0ded14babad2006221aa40621fb7ea1', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1184, sourceColumn: 2, sourceEndLine: 1184};
MERGE (n:KG {id: 'rom:kungfum/chr_color_proms/g-1h-.bin'}) SET n:Rom SET n += {file: 'g-1h-.bin', offset: 512, size: 256, crc: '550563e1', sha1: '11edb45acba8b28a462c49956ebb1ba0a8b2ff26', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1185, sourceColumn: 2, sourceEndLine: 1185};
MERGE (n:KG {id: 'region:kungfum/timing'}) SET n:RomRegion SET n += {tag: 'timing', size: 256, flags: '0', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1187, sourceColumn: 2, sourceEndLine: 1187};
MERGE (n:KG {id: 'rom:kungfum/timing/b-6f-.bin'}) SET n:Rom SET n += {file: 'b-6f-.bin', offset: 0, size: 256, crc: '82c20d12', sha1: '268903f7d9be58a70d030b02bf31a2d6b5b6e249', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1188, sourceColumn: 2, sourceEndLine: 1188};
MERGE (n:KG {id: 'map:m62_state.kungfum_map'}) SET n:AddressMap SET n += {cls: 'm62_state', name: 'kungfum_map', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 182, sourceColumn: 1, sourceEndLine: 192};
MERGE (n:KG {id: 'map:m62_state.kungfum_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom()', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 184, sourceColumn: 2, sourceEndLine: 184, rom: true};
MERGE (n:KG {id: 'map:m62_state.kungfum_map/range1'}) SET n:AddressRange SET n += {start: 40960, end: 40960, raw: 'map(0xa000, 0xa000).w(FUNC(m62_state::m62_hscroll_low_w))', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 185, sourceColumn: 2, sourceEndLine: 185};
MERGE (n:KG {id: 'handler:m62_state.m62_hscroll_low_w'}) SET n:Handler SET n += {method: 'm62_hscroll_low_w', ownerClass: 'm62_state', sourceFile: 'src/mame/irem/m62_v.cpp', sourceLine: 246, sourceColumn: 1, sourceEndLine: 249, sourceParameters: 'uint8_t data', sourceBody: 'm_m62_background_hscroll = (m_m62_background_hscroll & 0xff00) | data;'};
MERGE (n:KG {id: 'map:m62_state.kungfum_map/range2'}) SET n:AddressRange SET n += {start: 45056, end: 45056, raw: 'map(0xb000, 0xb000).w(FUNC(m62_state::m62_hscroll_high_w))', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 186, sourceColumn: 2, sourceEndLine: 186};
MERGE (n:KG {id: 'handler:m62_state.m62_hscroll_high_w'}) SET n:Handler SET n += {method: 'm62_hscroll_high_w', ownerClass: 'm62_state', sourceFile: 'src/mame/irem/m62_v.cpp', sourceLine: 251, sourceColumn: 1, sourceEndLine: 254, sourceParameters: 'uint8_t data', sourceBody: 'm_m62_background_hscroll = (m_m62_background_hscroll & 0xff) | (data << 8);'};
MERGE (n:KG {id: 'map:m62_state.kungfum_map/range3'}) SET n:AddressRange SET n += {start: 49152, end: 49407, raw: 'map(0xc000, 0xc0ff).writeonly().share("spriteram")', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 187, sourceColumn: 2, sourceEndLine: 187, writeonly: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:m62_state.kungfum_map/range4'}) SET n:AddressRange SET n += {start: 53248, end: 57343, raw: 'map(0xd000, 0xdfff).ram().w(FUNC(m62_state::kungfum_tileram_w)).share("m62_tileram")', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 190, sourceColumn: 2, sourceEndLine: 190, ram: true, share: 'm62_tileram'};
MERGE (n:KG {id: 'handler:m62_state.kungfum_tileram_w'}) SET n:Handler SET n += {method: 'kungfum_tileram_w', ownerClass: 'm62_state', sourceFile: 'src/mame/irem/m62_v.cpp', sourceLine: 361, sourceColumn: 1, sourceEndLine: 365, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_m62_tileram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset & 0x7ff);'};
MERGE (n:KG {id: 'map:m62_state.kungfum_map/range5'}) SET n:AddressRange SET n += {start: 57344, end: 61439, raw: 'map(0xe000, 0xefff).ram()', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 191, sourceColumn: 2, sourceEndLine: 191, ram: true};
MERGE (n:KG {id: 'map:m62_state.kungfum_io_map'}) SET n:AddressMap SET n += {cls: 'm62_state', name: 'kungfum_io_map', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 194, sourceColumn: 1, sourceEndLine: 202, globalMask: 255};
MERGE (n:KG {id: 'map:m62_state.kungfum_io_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 0, raw: 'map(0x00, 0x00).portr("SYSTEM").w(m_audio, FUNC(irem_audio_device::cmd_w))', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 197, sourceColumn: 2, sourceEndLine: 197, portRead: 'SYSTEM'};
MERGE (n:KG {id: 'handler:irem_audio_device.cmd_w'}) SET n:Handler SET n += {method: 'cmd_w', ownerClass: 'irem_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 84, sourceColumn: 1, sourceEndLine: 89, sourceParameters: 'uint8_t data', sourceBody: 'm_soundlatch = data;
	if ((data & 0x80) == 0)
		m_cpu->set_input_line(0, ASSERT_LINE);'};
MERGE (n:KG {id: 'map:m62_state.kungfum_io_map/range1'}) SET n:AddressRange SET n += {start: 1, end: 1, raw: 'map(0x01, 0x01).portr("P1").w(FUNC(m62_state::m62_flipscreen_w))', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 198, sourceColumn: 2, sourceEndLine: 198, portRead: 'P1'};
MERGE (n:KG {id: 'handler:m62_state.m62_flipscreen_w'}) SET n:Handler SET n += {method: 'm62_flipscreen_w', ownerClass: 'm62_state', sourceFile: 'src/mame/irem/m62_v.cpp', sourceLine: 227, sourceColumn: 1, sourceEndLine: 244, sourceParameters: 'uint8_t data', sourceBody: '/* screen flip is handled both by software and hardware */
	data ^= ((~ioport("DSW2")->read()) & 1);

	m_flipscreen = data & 0x01;
	if (m_flipscreen)
		machine().tilemap().set_flip_all(TILEMAP_FLIPX | TILEMAP_FLIPY);
	else
		machine().tilemap().set_flip_all(0);

	machine().bookkeeping().coin_counter_w(0, data & 2);
	machine().bookkeeping().coin_counter_w(1, data & 4);

	/* Sound inhibit ... connected to D6 which is not present on any board */
	if (m_audio->m_audio_SINH != nullptr)
		m_audio->m_audio_SINH->write((data >> 3) & 1);'};
MERGE (n:KG {id: 'map:m62_state.kungfum_io_map/range2'}) SET n:AddressRange SET n += {start: 2, end: 2, raw: 'map(0x02, 0x02).portr("P2")', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 199, sourceColumn: 2, sourceEndLine: 199, portRead: 'P2'};
MERGE (n:KG {id: 'map:m62_state.kungfum_io_map/range3'}) SET n:AddressRange SET n += {start: 3, end: 3, raw: 'map(0x03, 0x03).portr("DSW1")', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 200, sourceColumn: 2, sourceEndLine: 200, portRead: 'DSW1'};
MERGE (n:KG {id: 'map:m62_state.kungfum_io_map/range4'}) SET n:AddressRange SET n += {start: 4, end: 4, raw: 'map(0x04, 0x04).portr("DSW2")', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 201, sourceColumn: 2, sourceEndLine: 201, portRead: 'DSW2'};
MERGE (n:KG {id: 'handler:m62_state.m62_tileram_w'}) SET n:Handler SET n += {method: 'm62_tileram_w', ownerClass: 'm62_state', sourceFile: 'src/mame/irem/m62_v.cpp', sourceLine: 266, sourceColumn: 1, sourceEndLine: 270, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_m62_tileram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset >> 1);'};
MERGE (n:KG {id: 'map:m62_state.ldrun_map'}) SET n:AddressMap SET n += {cls: 'm62_state', name: 'ldrun_map', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 223, sourceColumn: 1, sourceEndLine: 229};
MERGE (n:KG {id: 'map:m62_state.ldrun_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom()', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 225, sourceColumn: 2, sourceEndLine: 225, rom: true};
MERGE (n:KG {id: 'map:m62_state.ldrun_map/range1'}) SET n:AddressRange SET n += {start: 49152, end: 49407, raw: 'map(0xc000, 0xc0ff).writeonly().share("spriteram")', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 226, sourceColumn: 2, sourceEndLine: 226, writeonly: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:m62_state.ldrun_map/range2'}) SET n:AddressRange SET n += {start: 53248, end: 57343, raw: 'map(0xd000, 0xdfff).ram().w(FUNC(m62_state::m62_tileram_w)).share("m62_tileram")', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 227, sourceColumn: 2, sourceEndLine: 227, ram: true, share: 'm62_tileram'};
MERGE (n:KG {id: 'map:m62_state.ldrun_map/range3'}) SET n:AddressRange SET n += {start: 57344, end: 61439, raw: 'map(0xe000, 0xefff).ram()', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 228, sourceColumn: 2, sourceEndLine: 228, ram: true};
MERGE (n:KG {id: 'handler:irem_audio_device.sound_irq_ack_w'}) SET n:Handler SET n += {method: 'sound_irq_ack_w', ownerClass: 'irem_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 218, sourceColumn: 1, sourceEndLine: 222, sourceParameters: 'uint8_t data', sourceBody: 'if ((m_soundlatch & 0x80) != 0)
		m_cpu->set_input_line(0, CLEAR_LINE);'};
MERGE (n:KG {id: 'map:irem_audio_device.m62_sound_map'}) SET n:AddressMap SET n += {cls: 'irem_audio_device', name: 'm62_sound_map', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 377, sourceColumn: 1, sourceEndLine: 382};
MERGE (n:KG {id: 'map:irem_audio_device.m62_sound_map/range0'}) SET n:AddressRange SET n += {start: 2048, end: 2048, raw: 'map(0x0800, 0x0800).mirror(0xf7fc).w(FUNC(irem_audio_device::sound_irq_ack_w))', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 379, sourceColumn: 2, sourceEndLine: 379, mirror: 63484};
MERGE (n:KG {id: 'map:irem_audio_device.m62_sound_map/range1'}) SET n:AddressRange SET n += {start: 2049, end: 2050, raw: 'map(0x0801, 0x0802).mirror(0xf7fc).w(FUNC(irem_audio_device::m62_adpcm_w))', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 380, sourceColumn: 2, sourceEndLine: 380, mirror: 63484};
MERGE (n:KG {id: 'handler:irem_audio_device.m62_adpcm_w'}) SET n:Handler SET n += {method: 'm62_adpcm_w', ownerClass: 'irem_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 239, sourceColumn: 1, sourceEndLine: 244, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'msm5205_device *adpcm = (offset & 1) ? m_adpcm2.target() : m_adpcm1.target();
	if (adpcm != nullptr)
		adpcm->data_w(data);'};
MERGE (n:KG {id: 'map:irem_audio_device.m62_sound_map/range2'}) SET n:AddressRange SET n += {start: 16384, end: 65535, raw: 'map(0x4000, 0xffff).rom()', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 381, sourceColumn: 2, sourceEndLine: 381, rom: true};
MERGE (n:KG {id: 'machine:m62_state.ldrun'}) SET n:MachineConfig SET n += {cls: 'm62_state', name: 'ldrun', calls: [], resetHandlers: ['m62_state.machine_reset'], startHandlers: ['m62_state.video_start'], sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 931, sourceColumn: 1, sourceEndLine: 952};
MERGE (n:KG {id: 'handler:m62_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'm62_state', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 916, sourceColumn: 1, sourceEndLine: 929, sourceParameters: '', sourceBody: 'm_flipscreen = 0;
	m_m62_background_hscroll = 0;
	m_m62_background_vscroll = 0;
	m_kidniki_background_bank = 0;
	m_kidniki_text_vscroll = 0;
	m_ldrun3_topbottom_mask = 0;
	m_spelunkr_palbank = 0;

	m_ldrun2_bankswap = 0;
	m_bankcontrol[0] = 0;
	m_bankcontrol[1] = 0;'};
MERGE (n:KG {id: 'handler:m62_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'm62_state', sourceFile: 'src/mame/irem/m62_v.cpp', sourceLine: 430, sourceColumn: 1, sourceEndLine: 435, sourceParameters: '', sourceBody: 'm62_start(tilemap_get_info_delegate(*this, FUNC(m62_state::get_ldrun_bg_tile_info)), 1, 1, 8, 8, 64, 32);
	m_bg_tilemap->set_transmask(0, 0xffff, 0x0000); // split type 0 is totally transparent in front half
	m_bg_tilemap->set_transmask(1, 0x0001, 0xfffe); // split type 1 has pen 0 transparent in front half'};
MERGE (n:KG {id: 'handler:m62_state.m62_start'}) SET n:Handler SET n += {method: 'm62_start', ownerClass: 'm62_state', sourceFile: 'src/mame/irem/m62_v.cpp', sourceLine: 337, sourceColumn: 1, sourceEndLine: 348, sourceParameters: 'tilemap_get_info_delegate tile_get_info, int rows, int cols, int x1, int y1, int x2, int y2', sourceBody: 'm_bg_tilemap = &machine().tilemap().create(*m_chr_decode, tile_get_info, TILEMAP_SCAN_ROWS,  x1, y1, x2, y2);

	register_savestate();

	if (rows != 0)
		m_bg_tilemap->set_scroll_rows(rows);

	if (cols != 0)
		m_bg_tilemap->set_scroll_cols(cols);'};
MERGE (n:KG {id: 'handler:m62_state.register_savestate'}) SET n:Handler SET n += {method: 'register_savestate', ownerClass: 'm62_state', sourceFile: 'src/mame/irem/m62_v.cpp', sourceLine: 214, sourceColumn: 1, sourceEndLine: 224, sourceParameters: '', sourceBody: 'save_item(NAME(m_flipscreen));
	save_item(NAME(m_m62_background_hscroll));
	save_item(NAME(m_m62_background_vscroll));

	save_item(NAME(m_kidniki_background_bank));
	save_item(NAME(m_kidniki_text_vscroll));
	save_item(NAME(m_ldrun3_topbottom_mask));
	save_item(NAME(m_spelunkr_palbank));'};
MERGE (n:KG {id: 'handler:m62_state.get_ldrun_bg_tile_info'}) SET n:Handler SET n += {method: 'get_ldrun_bg_tile_info', ownerClass: 'm62_state', sourceFile: 'src/mame/irem/m62_v.cpp', sourceLine: 411, sourceColumn: 1, sourceEndLine: 428, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int code;
	int color;
	int flags;
	code = m_m62_tileram[tile_index << 1];
	color = m_m62_tileram[(tile_index << 1) | 1];
	flags = 0;
	if ((color & 0x20))
	{
		flags |= TILE_FLIPX;
	}
	tileinfo.set(0, code | ((color & 0xc0) << 2), color & 0x1f, flags);
	if (((color & 0x1f) >> 1) >= 0x0c)
		tileinfo.group = 1;
	else
		tileinfo.group = 0;'};
MERGE (n:KG {id: 'device:m62_state.ldrun/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 3072000, config: ['Z80(config, m_maincpu, 24_MHz_XTAL / 6)', 'm_maincpu->set_addrmap(AS_PROGRAM, &m62_state::ldrun_map)', 'm_maincpu->set_addrmap(AS_IO, &m62_state::kungfum_io_map)', 'm_maincpu->set_vblank_int("screen", FUNC(m62_state::irq0_line_hold))', 'm_maincpu->set_clock(18.432_MHz_XTAL / 6)'], sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 934, sourceColumn: 2, sourceEndLine: 934};
MERGE (n:KG {id: 'device:m62_state.ldrun/maincpu/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'set_vblank_int', operation: 'set_vblank_int', raw: 'm_maincpu->set_vblank_int("screen", FUNC(m62_state::irq0_line_hold))', ownerTag: 'maincpu', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 937, sourceColumn: 2, sourceEndLine: 937, targetTag: 'screen', targetClass: 'm62_state', targetMethod: 'irq0_line_hold'};
MERGE (n:KG {id: 'handler:m62_state.irq0_line_hold'}) SET n:Handler SET n += {method: 'irq0_line_hold', ownerClass: 'm62_state', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 937, sourceColumn: 2, sourceEndLine: 937};
MERGE (n:KG {id: 'device:m62_state.ldrun/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['screen_device &screen(SCREEN(config, "screen", SCREEN_TYPE_RASTER))', 'screen.set_raw(24_MHz_XTAL / 3, 512, 64, 448, 284, 0, 256)', 'screen.set_screen_update(FUNC(m62_state::screen_update_ldrun))', 'subdevice<screen_device>("screen")->set_raw(18.432_MHz_XTAL / 3, 384, 128, 384, 284, 0, 256)', 'subdevice<screen_device>("screen")->set_screen_update(FUNC(m62_state::screen_update_kungfum))'], sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 940, sourceColumn: 2, sourceEndLine: 940, configCalls: ['set_raw(8000000,512,64,448,284,0,256)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6144000, 384, 128, 384, 284, 0, 256]};
MERGE (n:KG {id: 'handler:m62_state.screen_update_ldrun'}) SET n:Handler SET n += {method: 'screen_update_ldrun', ownerClass: 'm62_state', sourceFile: 'src/mame/irem/m62_v.cpp', sourceLine: 437, sourceColumn: 1, sourceEndLine: 447, sourceParameters: 'screen_device &screen, bitmap_rgb32 &bitmap, const rectangle &cliprect', sourceBody: 'm_bg_tilemap->set_scrollx(0, m_m62_background_hscroll);
	m_bg_tilemap->set_scrolly(0, m_m62_background_vscroll);

	m_bg_tilemap->draw(screen, bitmap, cliprect, TILEMAP_DRAW_LAYER1, 0);
	draw_sprites(bitmap, cliprect, 0x0f, 0x10, 0x00);
	m_bg_tilemap->draw(screen, bitmap, cliprect, TILEMAP_DRAW_LAYER0, 0);
	draw_sprites(bitmap, cliprect, 0x0f, 0x10, 0x10);
	return 0;'};
MERGE (n:KG {id: 'handler:m62_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'm62_state', sourceFile: 'src/mame/irem/m62_v.cpp', sourceLine: 279, sourceColumn: 1, sourceEndLine: 335, sourceParameters: 'bitmap_rgb32 &bitmap, const rectangle &cliprect, int colormask, int prioritymask, int priority', sourceBody: 'int offs;

	for (offs = 0; offs < m_spriteram.bytes(); offs += 8)
	{
		int i, incr, code, col, flipx, flipy, sx, sy;

		if ((m_spriteram[offs] & prioritymask) == priority)
		{
			code = m_spriteram[offs + 4] + ((m_spriteram[offs + 5] & 0x07) << 8);
			col = m_spriteram[offs + 0] & colormask;
			sx = 256 * (m_spriteram[offs + 7] & 1) + m_spriteram[offs + 6],
			sy = 256 + 128 - 15 - (256 * (m_spriteram[offs + 3] & 1) + m_spriteram[offs + 2]),
			flipx = m_spriteram[offs + 5] & 0x40;
			flipy = m_spriteram[offs + 5] & 0x80;

			i = m_sprite_height_prom[(code >> 5) & 0x1f];
			if (i == 1) /* double height */
			{
				code &= ~1;
				sy -= 16;
			}
			else if (i == 2)    /* quadruple height */
			{
				i = 3;
				code &= ~3;
				sy -= 3*16;
			}

			if (m_flipscreen)
			{
				sx = 496 - sx;
				sy = 242 - i*16 - sy;   /* sprites are slightly misplaced by the hardware */
				flipx = !flipx;
				flipy = !flipy;
			}

			if (flipy)
			{
				incr = -1;
				code += i;
			}
			else incr = 1;

			do
			{
				m_spr_decode->gfx(0)->transpen(bitmap,cliprect,
						code + i * incr,col,
						flipx,flipy,
						sx,sy + 16 * i,0);

				i--;
			} while (i >= 0);
		}
	}'};
MERGE (n:KG {id: 'device:m62_state.ldrun/spr_decode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'spr_decode', clock: null, config: ['GFXDECODE(config, m_spr_decode, m_spr_palette, gfx_m62_sprites)'], sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 944, sourceColumn: 2, sourceEndLine: 944, clockExpr: 'm_spr_palette'};
MERGE (n:KG {id: 'device:m62_state.ldrun/chr_decode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'chr_decode', clock: null, config: ['GFXDECODE(config, m_chr_decode, m_chr_palette, gfx_m62_tiles)'], sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 945, sourceColumn: 2, sourceEndLine: 945, clockExpr: 'm_chr_palette'};
MERGE (n:KG {id: 'device:m62_state.ldrun/chr_palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'chr_palette', clock: null, config: ['PALETTE(config, m_chr_palette, FUNC(m62_state::m62_chr), 256)'], sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 947, sourceColumn: 2, sourceEndLine: 947, clockExpr: 'FUNC(m62_state::m62_chr)'};
MERGE (n:KG {id: 'device:m62_state.ldrun/spr_palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'spr_palette', clock: null, config: ['PALETTE(config, m_spr_palette, FUNC(m62_state::m62_spr), 256)'], sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 948, sourceColumn: 2, sourceEndLine: 948, clockExpr: 'FUNC(m62_state::m62_spr)'};
MERGE (n:KG {id: 'device:m62_state.ldrun/irem_audio'}) SET n:Device SET n += {type: 'IREM_M62_AUDIO', tag: 'irem_audio', clock: 0, config: ['IREM_M62_AUDIO(config, m_audio)'], sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 951, sourceColumn: 2, sourceEndLine: 951};
MERGE (n:KG {id: 'machine:m62_state.kungfum'}) SET n:MachineConfig SET n += {cls: 'm62_state', name: 'kungfum', calls: ['ldrun'], resetHandlers: ['m62_state.machine_reset'], startHandlers: ['m62_state.video_start_kungfum'], devicePatches: ['{"tag":"maincpu","config":["m_maincpu->set_clock(18.432_MHz_XTAL / 6)"],"clock":3072000}', '{"tag":"screen","config":["subdevice<screen_device>(\\"screen\\")->set_raw(18.432_MHz_XTAL / 3, 384, 128, 384, 284, 0, 256)","subdevice<screen_device>(\\"screen\\")->set_screen_update(FUNC(m62_state::screen_update_kungfum))"],"screenRaw":{"pixclock":6144000,"htotal":384,"hbend":128,"hbstart":384,"vtotal":284,"vbend":0,"vbstart":256}}'], sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 955, sourceColumn: 1, sourceEndLine: 969};
MERGE (n:KG {id: 'handler:m62_state.video_start_kungfum'}) SET n:Handler SET n += {method: 'video_start_kungfum', ownerClass: 'm62_state', sourceFile: 'src/mame/irem/m62_v.cpp', sourceLine: 388, sourceColumn: 1, sourceEndLine: 391, sourceParameters: '', sourceBody: 'm62_start(tilemap_get_info_delegate(*this, FUNC(m62_state::get_kungfum_bg_tile_info)), 32, 0, 8, 8, 64, 32);'};
MERGE (n:KG {id: 'handler:m62_state.get_kungfum_bg_tile_info'}) SET n:Handler SET n += {method: 'get_kungfum_bg_tile_info', ownerClass: 'm62_state', sourceFile: 'src/mame/irem/m62_v.cpp', sourceLine: 367, sourceColumn: 1, sourceEndLine: 386, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int code;
	int color;
	int flags;
	code = m_m62_tileram[tile_index];
	color = m_m62_tileram[tile_index + 0x800];
	flags = 0;
	if ((color & 0x20))
	{
		flags |= TILE_FLIPX;
	}
	tileinfo.set(0, code | ((color & 0xc0)<< 2), color & 0x1f, flags);

	/* is the following right? */
	if ((tile_index / 64) < 6 || ((color & 0x1f) >> 1) > 0x0c)
		tileinfo.category = 1;
	else
		tileinfo.category = 0;'};
MERGE (n:KG {id: 'machine:m62_state.kungfum/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'subdevice<screen_device>("screen")->set_screen_update(FUNC(m62_state::screen_update_kungfum))', ownerTag: 'screen', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 966, sourceColumn: 2, sourceEndLine: 966, targetClass: 'm62_state', targetMethod: 'screen_update_kungfum'};
MERGE (n:KG {id: 'handler:m62_state.screen_update_kungfum'}) SET n:Handler SET n += {method: 'screen_update_kungfum', ownerClass: 'm62_state', sourceFile: 'src/mame/irem/m62_v.cpp', sourceLine: 393, sourceColumn: 1, sourceEndLine: 408, sourceParameters: 'screen_device &screen, bitmap_rgb32 &bitmap, const rectangle &cliprect', sourceBody: 'int i;
	for (i = 0; i < 6; i++)
	{
		m_bg_tilemap->set_scrollx(i, 0);
	}
	for (i = 6; i < 32; i++)
	{
		m_bg_tilemap->set_scrollx(i, m_m62_background_hscroll);
	}
	m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0);
	draw_sprites(bitmap, cliprect, 0x1f, 0x00, 0x00);
	m_bg_tilemap->draw(screen, bitmap, cliprect, 1, 0);
	return 0;'};
MERGE (n:KG {id: 'machine:m62_audio_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'm62_audio_device', name: 'device_add_mconfig', calls: [], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 400, sourceColumn: 1, sourceEndLine: 464};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/iremsound'}) SET n:Device SET n += {type: 'M6803', tag: 'iremsound', clock: 3579545, config: ['m6803_cpu_device &cpu(M6803(config, m_cpu, XTAL(3\'579\'545)))', 'cpu.set_addrmap(AS_PROGRAM, &m62_audio_device::m62_sound_map)', 'cpu.in_p1_cb().set(FUNC(m62_audio_device::m6803_port1_r))', 'cpu.out_p1_cb().set(FUNC(m62_audio_device::m6803_port1_w))', 'cpu.in_p2_cb().set(FUNC(m62_audio_device::m6803_port2_r))', 'cpu.out_p2_cb().set(FUNC(m62_audio_device::m6803_port2_w))'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 403, sourceColumn: 2, sourceEndLine: 403};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/iremsound/callback:iremsound:0'}) SET n:Callback SET n += {signal: 'in_p1_cb', operation: 'set', raw: 'cpu.in_p1_cb().set(FUNC(m62_audio_device::m6803_port1_r))', ownerTag: 'iremsound', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 405, sourceColumn: 2, sourceEndLine: 405, targetClass: 'm62_audio_device', targetMethod: 'm6803_port1_r'};
MERGE (n:KG {id: 'handler:m62_audio_device.m6803_port1_r'}) SET n:Handler SET n += {method: 'm6803_port1_r', ownerClass: 'm62_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 149, sourceColumn: 1, sourceEndLine: 157, sourceParameters: '', sourceBody: '/* PSG 0 or 1? */
	if (m_port2 & 0x08)
		return m_ay_45M->data_r();
	if (m_port2 & 0x10)
		return m_ay_45L->data_r();
	return 0xff;'};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/iremsound/callback:iremsound:1'}) SET n:Callback SET n += {signal: 'out_p1_cb', operation: 'set', raw: 'cpu.out_p1_cb().set(FUNC(m62_audio_device::m6803_port1_w))', ownerTag: 'iremsound', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 406, sourceColumn: 2, sourceEndLine: 406, targetClass: 'm62_audio_device', targetMethod: 'm6803_port1_w'};
MERGE (n:KG {id: 'handler:m62_audio_device.m6803_port1_w'}) SET n:Handler SET n += {method: 'm6803_port1_w', ownerClass: 'm62_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 109, sourceColumn: 1, sourceEndLine: 112, sourceParameters: 'uint8_t data', sourceBody: 'm_port1 = data;'};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/iremsound/callback:iremsound:2'}) SET n:Callback SET n += {signal: 'in_p2_cb', operation: 'set', raw: 'cpu.in_p2_cb().set(FUNC(m62_audio_device::m6803_port2_r))', ownerTag: 'iremsound', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 407, sourceColumn: 2, sourceEndLine: 407, targetClass: 'm62_audio_device', targetMethod: 'm6803_port2_r'};
MERGE (n:KG {id: 'handler:m62_audio_device.m6803_port2_r'}) SET n:Handler SET n += {method: 'm6803_port2_r', ownerClass: 'm62_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 160, sourceColumn: 1, sourceEndLine: 168, sourceParameters: '', sourceBody: '/*
	 * Pin21, 6803 (Port 21) tied with 4.7k to +5V
	 *
	 */
	//printf("port2 read\\n"); // used by 10yard
	return 0x0;'};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/iremsound/callback:iremsound:3'}) SET n:Callback SET n += {signal: 'out_p2_cb', operation: 'set', raw: 'cpu.out_p2_cb().set(FUNC(m62_audio_device::m6803_port2_w))', ownerTag: 'iremsound', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 408, sourceColumn: 2, sourceEndLine: 408, targetClass: 'm62_audio_device', targetMethod: 'm6803_port2_w'};
MERGE (n:KG {id: 'handler:m62_audio_device.m6803_port2_w'}) SET n:Handler SET n += {method: 'm6803_port2_w', ownerClass: 'm62_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 115, sourceColumn: 1, sourceEndLine: 139, sourceParameters: 'uint8_t data', sourceBody: '/* write latch */
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
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 411, sourceColumn: 2, sourceEndLine: 411};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/ay_45m'}) SET n:Device SET n += {type: 'AY8910', tag: 'ay_45m', clock: 894886.25, config: ['AY8910(config, m_ay_45M, XTAL(3\'579\'545)/4)', 'm_ay_45M->set_flags(AY8910_RESISTOR_OUTPUT)', 'm_ay_45M->set_resistors_load(2000.0, 2000.0, 2000.0)', 'm_ay_45M->port_a_read_callback().set(FUNC(irem_audio_device::soundlatch_r))', 'm_ay_45M->port_b_write_callback().set(FUNC(irem_audio_device::ay8910_45M_portb_w))', 'm_ay_45M->add_route(0, "snd_nl", 1.0, 0)', 'm_ay_45M->add_route(1, "snd_nl", 1.0, 1)', 'm_ay_45M->add_route(2, "snd_nl", 1.0, 2)'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 413, sourceColumn: 2, sourceEndLine: 413, configCalls: ['set_flags(8)', 'set_resistors_load(2000,2000,2000)']};
MERGE (n:KG {id: 'audioroute:device:m62_audio_device.device_add_mconfig/ay_45m/0'}) SET n:AudioRoute SET n += {output: '0', target: 'snd_nl', gain: 1, input: 0, raw: 'm_ay_45M->add_route(0, "snd_nl", 1.0, 0)', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 418, sourceColumn: 2, sourceEndLine: 418};
MERGE (n:KG {id: 'audioroute:device:m62_audio_device.device_add_mconfig/ay_45m/1'}) SET n:AudioRoute SET n += {output: '1', target: 'snd_nl', gain: 1, input: 1, raw: 'm_ay_45M->add_route(1, "snd_nl", 1.0, 1)', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 419, sourceColumn: 2, sourceEndLine: 419};
MERGE (n:KG {id: 'audioroute:device:m62_audio_device.device_add_mconfig/ay_45m/2'}) SET n:AudioRoute SET n += {output: '2', target: 'snd_nl', gain: 1, input: 2, raw: 'm_ay_45M->add_route(2, "snd_nl", 1.0, 2)', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 420, sourceColumn: 2, sourceEndLine: 420};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/ay_45m/callback:ay_45m:0'}) SET n:Callback SET n += {signal: 'port_a_read_callback', operation: 'set', raw: 'm_ay_45M->port_a_read_callback().set(FUNC(irem_audio_device::soundlatch_r))', ownerTag: 'ay_45m', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 416, sourceColumn: 2, sourceEndLine: 416, targetClass: 'irem_audio_device', targetMethod: 'soundlatch_r'};
MERGE (n:KG {id: 'handler:irem_audio_device.soundlatch_r'}) SET n:Handler SET n += {method: 'soundlatch_r', ownerClass: 'irem_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 98, sourceColumn: 1, sourceEndLine: 101, sourceParameters: '', sourceBody: 'return m_soundlatch;'};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/ay_45m/callback:ay_45m:1'}) SET n:Callback SET n += {signal: 'port_b_write_callback', operation: 'set', raw: 'm_ay_45M->port_b_write_callback().set(FUNC(irem_audio_device::ay8910_45M_portb_w))', ownerTag: 'ay_45m', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 417, sourceColumn: 2, sourceEndLine: 417, targetClass: 'irem_audio_device', targetMethod: 'ay8910_45M_portb_w'};
MERGE (n:KG {id: 'handler:irem_audio_device.ay8910_45M_portb_w'}) SET n:Handler SET n += {method: 'ay8910_45M_portb_w', ownerClass: 'irem_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 178, sourceColumn: 1, sourceEndLine: 189, sourceParameters: 'uint8_t data', sourceBody: '/* bits 2-4 select MSM5205 clock & 3b/4b playback mode */
	m_adpcm1->playmode_w((data >> 2) & 7);
	if (m_adpcm2 != nullptr)
		m_adpcm2->playmode_w(((data >> 2) & 4) | 3); /* always in slave mode */

	/* bits 0 and 1 reset the two chips */
	m_adpcm1->reset_w(data & 1);
	if (m_adpcm2 != nullptr)
		m_adpcm2->reset_w(data & 2);'};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/ay_45l'}) SET n:Device SET n += {type: 'AY8910', tag: 'ay_45l', clock: 894886.25, config: ['AY8910(config, m_ay_45L, XTAL(3\'579\'545)/4)', 'm_ay_45L->set_flags(AY8910_RESISTOR_OUTPUT)', 'm_ay_45L->set_resistors_load(2000.0, 2000.0, 2000.0)', 'm_ay_45L->port_a_write_callback().set(FUNC(irem_audio_device::ay8910_45L_porta_w))', 'm_ay_45L->add_route(0, "snd_nl", 1.0, 3)', 'm_ay_45L->add_route(1, "snd_nl", 1.0, 4)', 'm_ay_45L->add_route(2, "snd_nl", 1.0, 5)'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 422, sourceColumn: 2, sourceEndLine: 422, configCalls: ['set_flags(8)', 'set_resistors_load(2000,2000,2000)']};
MERGE (n:KG {id: 'audioroute:device:m62_audio_device.device_add_mconfig/ay_45l/0'}) SET n:AudioRoute SET n += {output: '0', target: 'snd_nl', gain: 1, input: 3, raw: 'm_ay_45L->add_route(0, "snd_nl", 1.0, 3)', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 426, sourceColumn: 2, sourceEndLine: 426};
MERGE (n:KG {id: 'audioroute:device:m62_audio_device.device_add_mconfig/ay_45l/1'}) SET n:AudioRoute SET n += {output: '1', target: 'snd_nl', gain: 1, input: 4, raw: 'm_ay_45L->add_route(1, "snd_nl", 1.0, 4)', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 427, sourceColumn: 2, sourceEndLine: 427};
MERGE (n:KG {id: 'audioroute:device:m62_audio_device.device_add_mconfig/ay_45l/2'}) SET n:AudioRoute SET n += {output: '2', target: 'snd_nl', gain: 1, input: 5, raw: 'm_ay_45L->add_route(2, "snd_nl", 1.0, 5)', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 428, sourceColumn: 2, sourceEndLine: 428};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/ay_45l/callback:ay_45l:0'}) SET n:Callback SET n += {signal: 'port_a_write_callback', operation: 'set', raw: 'm_ay_45L->port_a_write_callback().set(FUNC(irem_audio_device::ay8910_45L_porta_w))', ownerTag: 'ay_45l', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 425, sourceColumn: 2, sourceEndLine: 425, targetClass: 'irem_audio_device', targetMethod: 'ay8910_45L_porta_w'};
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
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/msm1'}) SET n:Device SET n += {type: 'MSM5205', tag: 'msm1', clock: 384000, config: ['MSM5205(config, m_adpcm1, 384_kHz_XTAL)', 'm_adpcm1->vck_callback().set_inputline(m_cpu, INPUT_LINE_NMI)', 'm_adpcm1->vck_callback().append(m_adpcm2, FUNC(msm5205_device::vclk_w))', 'm_adpcm1->set_prescaler_selector(msm5205_device::S96_4B)', 'm_adpcm1->add_route(0, "snd_nl", 1.0, 6)'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 430, sourceColumn: 2, sourceEndLine: 430};
MERGE (n:KG {id: 'audioroute:device:m62_audio_device.device_add_mconfig/msm1/0'}) SET n:AudioRoute SET n += {output: '0', target: 'snd_nl', gain: 1, input: 6, raw: 'm_adpcm1->add_route(0, "snd_nl", 1.0, 6)', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 434, sourceColumn: 2, sourceEndLine: 434};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/msm1/callback:msm1:0'}) SET n:Callback SET n += {signal: 'vck_callback', operation: 'set_inputline', raw: 'm_adpcm1->vck_callback().set_inputline(m_cpu, INPUT_LINE_NMI)', ownerTag: 'msm1', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 431, sourceColumn: 2, sourceEndLine: 431, inputLine: 'INPUT_LINE_NMI', targetTag: 'iremsound'};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/msm1/callback:msm1:1'}) SET n:Callback SET n += {signal: 'vck_callback', operation: 'append', raw: 'm_adpcm1->vck_callback().append(m_adpcm2, FUNC(msm5205_device::vclk_w))', ownerTag: 'msm1', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 432, sourceColumn: 2, sourceEndLine: 432, targetClass: 'msm5205_device', targetMethod: 'vclk_w', targetTag: 'msm2'};
MERGE (n:KG {id: 'handler:msm5205_device.vclk_w'}) SET n:Handler SET n += {method: 'vclk_w', ownerClass: 'msm5205_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 432, sourceColumn: 2, sourceEndLine: 432};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/msm2'}) SET n:Device SET n += {type: 'MSM5205', tag: 'msm2', clock: 384000, config: ['MSM5205(config, m_adpcm2, 384_kHz_XTAL)', 'm_adpcm2->set_prescaler_selector(msm5205_device::SEX_4B)', 'm_adpcm2->add_route(0, "snd_nl", 1.0, 7)'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 436, sourceColumn: 2, sourceEndLine: 436};
MERGE (n:KG {id: 'audioroute:device:m62_audio_device.device_add_mconfig/msm2/0'}) SET n:AudioRoute SET n += {output: '0', target: 'snd_nl', gain: 1, input: 7, raw: 'm_adpcm2->add_route(0, "snd_nl", 1.0, 7)', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 438, sourceColumn: 2, sourceEndLine: 438};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl'}) SET n:Device SET n += {type: 'NETLIST_SOUND', tag: 'snd_nl', clock: 48000, config: ['NETLIST_SOUND(config, "snd_nl", 48000)
		.set_source(netlist_kidniki)
		.add_route(ALL_OUTPUTS, "mono", 1.0)'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 442, sourceColumn: 2, sourceEndLine: 444};
MERGE (n:KG {id: 'audioroute:device:m62_audio_device.device_add_mconfig/snd_nl/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 1, raw: 'NETLIST_SOUND(config, "snd_nl", 48000)
		.set_source(netlist_kidniki)
		.add_route(ALL_OUTPUTS, "mono", 1.0)', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 442, sourceColumn: 2, sourceEndLine: 444};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:ibd'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'snd_nl:ibd', clock: null, config: ['NETLIST_LOGIC_INPUT(config, "snd_nl:ibd", "I_BD0.IN", 0)'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 446, sourceColumn: 2, sourceEndLine: 446, clockExpr: '"I_BD0.IN"'};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:isd'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'snd_nl:isd', clock: null, config: ['NETLIST_LOGIC_INPUT(config, "snd_nl:isd", "I_SD0.IN", 0)'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 447, sourceColumn: 2, sourceEndLine: 447, clockExpr: '"I_SD0.IN"'};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:ich'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'snd_nl:ich', clock: null, config: ['NETLIST_LOGIC_INPUT(config, "snd_nl:ich", "I_CH0.IN", 0)'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 448, sourceColumn: 2, sourceEndLine: 448, clockExpr: '"I_CH0.IN"'};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:ioh'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'snd_nl:ioh', clock: null, config: ['NETLIST_LOGIC_INPUT(config, "snd_nl:ioh", "I_OH0.IN", 0)'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 449, sourceColumn: 2, sourceEndLine: 449, clockExpr: '"I_OH0.IN"'};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:sinh'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'snd_nl:sinh', clock: null, config: ['NETLIST_LOGIC_INPUT(config, "snd_nl:sinh", "SINH.IN", 0)'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 450, sourceColumn: 2, sourceEndLine: 450, clockExpr: '"SINH.IN"'};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:cin0'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'snd_nl:cin0', clock: 0, config: ['NETLIST_STREAM_INPUT(config, "snd_nl:cin0", 0, "R_AY45M_A.R")'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 452, sourceColumn: 2, sourceEndLine: 452};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:cin1'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'snd_nl:cin1', clock: 1, config: ['NETLIST_STREAM_INPUT(config, "snd_nl:cin1", 1, "R_AY45M_B.R")'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 453, sourceColumn: 2, sourceEndLine: 453};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:cin2'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'snd_nl:cin2', clock: 2, config: ['NETLIST_STREAM_INPUT(config, "snd_nl:cin2", 2, "R_AY45M_C.R")'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 454, sourceColumn: 2, sourceEndLine: 454};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:cin3'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'snd_nl:cin3', clock: 3, config: ['NETLIST_STREAM_INPUT(config, "snd_nl:cin3", 3, "R_AY45L_A.R")'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 456, sourceColumn: 2, sourceEndLine: 456};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:cin4'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'snd_nl:cin4', clock: 4, config: ['NETLIST_STREAM_INPUT(config, "snd_nl:cin4", 4, "R_AY45L_B.R")'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 457, sourceColumn: 2, sourceEndLine: 457};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:cin5'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'snd_nl:cin5', clock: 5, config: ['NETLIST_STREAM_INPUT(config, "snd_nl:cin5", 5, "R_AY45L_C.R")'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 458, sourceColumn: 2, sourceEndLine: 458};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:cin6'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'snd_nl:cin6', clock: 6, config: ['NETLIST_STREAM_INPUT(config, "snd_nl:cin6", 6, "I_MSM2K0.IN").set_mult_offset(10.0, 2.5)'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 460, sourceColumn: 2, sourceEndLine: 460};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:cin7'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'snd_nl:cin7', clock: 7, config: ['NETLIST_STREAM_INPUT(config, "snd_nl:cin7", 7, "I_MSM3K0.IN").set_mult_offset(10.0, 2.5)'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 461, sourceColumn: 2, sourceEndLine: 461};
MERGE (n:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:cout0'}) SET n:Device SET n += {type: 'NETLIST_STREAM_OUTPUT', tag: 'snd_nl:cout0', clock: 0, config: ['NETLIST_STREAM_OUTPUT(config, "snd_nl:cout0", 0, "R26.1").set_mult_offset(30000.0 * 10.0 / 32768.0, 0.0)'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 463, sourceColumn: 2, sourceEndLine: 463};
MERGE (n:KG {id: 'inputs:m62_common'}) SET n:InputPorts SET n += {name: 'm62_common', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 371, sourceColumn: 1, sourceEndLine: 371};
MERGE (n:KG {id: 'inputs:m62_common/SYSTEM'}) SET n:Port SET n += {tag: 'SYSTEM', modify: false};
MERGE (n:KG {id: 'inputs:m62_common/SYSTEM/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_START1'};
MERGE (n:KG {id: 'inputs:m62_common/SYSTEM/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_START2'};
MERGE (n:KG {id: 'inputs:m62_common/SYSTEM/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_SERVICE1', modifiers: ['PORT_IMPULSE(19)']};
MERGE (n:KG {id: 'inputs:m62_common/SYSTEM/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_COIN1'};
MERGE (n:KG {id: 'inputs:m62_common/SYSTEM/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 240, activeLow: true, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:m62_common/P1'}) SET n:Port SET n += {tag: 'P1', modify: false};
MERGE (n:KG {id: 'inputs:m62_common/P1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY']};
MERGE (n:KG {id: 'inputs:m62_common/P1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY']};
MERGE (n:KG {id: 'inputs:m62_common/P1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY']};
MERGE (n:KG {id: 'inputs:m62_common/P1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY']};
MERGE (n:KG {id: 'inputs:m62_common/P1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:m62_common/P1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2'};
MERGE (n:KG {id: 'inputs:m62_common/P1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:m62_common/P1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_BUTTON1'};
MERGE (n:KG {id: 'inputs:m62_common/P2'}) SET n:Port SET n += {tag: 'P2', modify: false};
MERGE (n:KG {id: 'inputs:m62_common/P2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:m62_common/P2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:m62_common/P2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:m62_common/P2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:m62_common/P2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_COIN2'};
MERGE (n:KG {id: 'inputs:m62_common/P2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:m62_common/P2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:m62_common/P2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:m62_common/DSW2'}) SET n:Port SET n += {tag: 'DSW2', modify: false};
MERGE (n:KG {id: 'inputs:m62_common/DSW2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, name: 'Flip Screen', defaultValue: 1, location: 'SW2:1', settings: ['1=Off', '0=On']};
MERGE (n:KG {id: 'inputs:m62_common/DSW2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, name: 'Cabinet', defaultValue: 0, location: 'SW2:2', settings: ['0=Upright', '2=Cocktail']};
MERGE (n:KG {id: 'inputs:m62_common/DSW2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 4, name: 'Coin Mode', defaultValue: 4, location: 'SW2:3', settings: ['4=Mode 1', '0=Mode 2']};
MERGE (n:KG {id: 'inputs:m62_common/DSW2/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 56, name: 'Unused'};
MERGE (n:KG {id: 'inputs:m62_common/DSW2/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 64, name: 'Invulnerability (Cheat)', defaultValue: 64, location: 'SW2:7', settings: ['64=Off', '0=On']};
MERGE (n:KG {id: 'inputs:m62_common/DSW2/f5'}) SET n:PortField SET n += {kind: 'service', mask: 128, activeLow: true, defaultValue: 128};
MERGE (n:KG {id: 'inputs:kungfum'}) SET n:InputPorts SET n += {name: 'kungfum', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 421, sourceColumn: 1, sourceEndLine: 421};
MERGE (n:KG {id: 'inputs:kungfum/DSW2'}) SET n:Port SET n += {tag: 'DSW2', modify: true};
MERGE (n:KG {id: 'inputs:kungfum/DSW2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 8, name: 'Slow Motion Mode (Cheat)', defaultValue: 8, location: 'SW2:4', settings: ['8=Off', '0=On']};
MERGE (n:KG {id: 'inputs:kungfum/DSW2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 16, name: 'Freeze (Cheat)', defaultValue: 16, location: 'SW2:5', settings: ['16=Off', '0=On']};
MERGE (n:KG {id: 'inputs:kungfum/DSW2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 32, name: 'Level Selection Mode (Cheat)', defaultValue: 32, location: 'SW2:6', settings: ['32=Off', '0=On']};
MERGE (n:KG {id: 'inputs:kungfum/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:kungfum/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, name: 'Difficulty', defaultValue: 1, location: 'SW1:1', settings: ['1=Easy', '0=Hard']};
MERGE (n:KG {id: 'inputs:kungfum/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, name: 'Energy Loss', defaultValue: 2, location: 'SW1:2', settings: ['2=Slow', '0=Fast']};
MERGE (n:KG {id: 'inputs:kungfum/DSW1/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 12, name: 'Lives', defaultValue: 12, location: 'SW1:3,4', settings: ['8=2', '12=3', '4=4', '0=5']};
MERGE (n:KG {id: 'inputs:kungfum/DSW1/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 240, name: 'Coinage', defaultValue: 240, location: '#SW1":5,6,7,8"', settings: ['144=7C 1C', '160=6C 1C', '176=5C 1C', '192=4C 1C', '208=3C 1C', '224=2C 1C', '240=1C 1C', '112=1C 2C', '96=1C 3C', '80=1C 4C', '64=1C 5C', '48=1C 6C', '32=1C 7C', '16=1C 8C', '0=Free Play']};
MERGE (n:KG {id: 'inputs:kungfum/DSW1/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 48, name: 'Coin A', defaultValue: 48, location: '#SW1":5,6"', settings: ['16=3C 1C', '32=2C 1C', '48=1C 1C', '0=Free Play']};
MERGE (n:KG {id: 'inputs:kungfum/DSW1/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 192, name: 'Coin B', defaultValue: 192, location: '#SW1":7,8"', settings: ['192=1C 2C', '128=1C 3C', '64=1C 5C', '0=1C 6C']};
MERGE (n:KG {id: 'gfxlayout:spritelayout'}) SET n:GfxLayout SET n += {name: 'spritelayout', width: 16, height: 16, total: 'RGN_FRAC(1,3)', planes: 3, planeOffsets: ['RGN_FRAC(2,3)', 'RGN_FRAC(1,3)', 'RGN_FRAC(0,3)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 128, 129, 130, 131, 132, 133, 134, 135], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120], charIncrement: 256};
MERGE (n:KG {id: 'gfxlayout:gfx_8x8x3_planar'}) SET n:GfxLayout SET n += {name: 'gfx_8x8x3_planar', width: 8, height: 8, total: 'RGN_FRAC(1,3)', planes: 3, planeOffsets: ['RGN_FRAC(2,3)', 'RGN_FRAC(1,3)', 'RGN_FRAC(0,3)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxdecode:gfx_m62_sprites'}) SET n:GfxDecode SET n += {name: 'gfx_m62_sprites', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 849, sourceColumn: 8, sourceEndLine: 849};
MERGE (n:KG {id: 'gfxdecode:gfx_m62_sprites/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx2', offset: 0, layout: 'spritelayout', colorBase: 0, colorCount: 32, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_m62_tiles'}) SET n:GfxDecode SET n += {name: 'gfx_m62_tiles', sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 853, sourceColumn: 8, sourceEndLine: 853};
MERGE (n:KG {id: 'gfxdecode:gfx_m62_tiles/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'gfx_8x8x3_planar', colorBase: 0, colorCount: 32, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:kungfum'}), (b:KG {id: 'file:src/mame/irem/m62.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 2541, sourceColumn: 1, sourceEndLine: 2541};
MATCH (a:KG {id: 'game:kungfum'}), (b:KG {id: 'machine:m62_state.kungfum'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:kungfum'}), (b:KG {id: 'inputs:kungfum'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:kungfum'}), (b:KG {id: 'romset:kungfum'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/m62.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/m62.cpp'}), (b:KG {id: 'file:m62.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/m62.cpp'}), (b:KG {id: 'file:iremipt.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/m62.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/m62.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:m62_state.kungfum'}), (b:KG {id: 'file:src/mame/irem/m62.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 955, sourceColumn: 1, sourceEndLine: 969};
MATCH (a:KG {id: 'machine:m62_state.kungfum'}), (b:KG {id: 'handler:m62_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:m62_state.kungfum'}), (b:KG {id: 'handler:m62_state.video_start_kungfum'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:m62_state.kungfum'}), (b:KG {id: 'machine:m62_state.ldrun'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'machine:m62_state.kungfum'}), (b:KG {id: 'map:m62_state.kungfum_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:m62_state.kungfum'}), (b:KG {id: 'map:m62_state.kungfum_io_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_IO', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:m62_state.kungfum'}), (b:KG {id: 'machine:m62_state.kungfum/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'inputs:kungfum'}), (b:KG {id: 'file:src/mame/irem/m62.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 421, sourceColumn: 1, sourceEndLine: 421};
MATCH (a:KG {id: 'inputs:kungfum'}), (b:KG {id: 'inputs:m62_common'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:kungfum'}), (b:KG {id: 'inputs:kungfum/DSW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:kungfum'}), (b:KG {id: 'inputs:kungfum/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:kungfum'}), (b:KG {id: 'file:src/mame/irem/m62.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 1145, sourceColumn: 1, sourceEndLine: 1145};
MATCH (a:KG {id: 'romset:kungfum'}), (b:KG {id: 'region:kungfum/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:kungfum'}), (b:KG {id: 'region:kungfum/irem_audio:iremsound'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:kungfum'}), (b:KG {id: 'region:kungfum/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:kungfum'}), (b:KG {id: 'region:kungfum/gfx2'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:kungfum'}), (b:KG {id: 'region:kungfum/spr_height_prom'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:kungfum'}), (b:KG {id: 'region:kungfum/spr_color_proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:kungfum'}), (b:KG {id: 'region:kungfum/chr_color_proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:kungfum'}), (b:KG {id: 'region:kungfum/timing'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:m62_state.video_start_kungfum'}), (b:KG {id: 'handler:m62_state.m62_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:m62_state.video_start_kungfum'}), (b:KG {id: 'handler:m62_state.get_kungfum_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:m62_state.ldrun'}), (b:KG {id: 'file:src/mame/irem/m62.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 931, sourceColumn: 1, sourceEndLine: 952};
MATCH (a:KG {id: 'machine:m62_state.ldrun'}), (b:KG {id: 'handler:m62_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:m62_state.ldrun'}), (b:KG {id: 'handler:m62_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:m62_state.ldrun'}), (b:KG {id: 'device:m62_state.ldrun/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_state.ldrun'}), (b:KG {id: 'device:m62_state.ldrun/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_state.ldrun'}), (b:KG {id: 'device:m62_state.ldrun/spr_decode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_state.ldrun'}), (b:KG {id: 'gfxdecode:gfx_m62_sprites'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'spr_decode'};
MATCH (a:KG {id: 'machine:m62_state.ldrun'}), (b:KG {id: 'device:m62_state.ldrun/chr_decode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_state.ldrun'}), (b:KG {id: 'gfxdecode:gfx_m62_tiles'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'chr_decode'};
MATCH (a:KG {id: 'machine:m62_state.ldrun'}), (b:KG {id: 'device:m62_state.ldrun/chr_palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_state.ldrun'}), (b:KG {id: 'device:m62_state.ldrun/spr_palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_state.ldrun'}), (b:KG {id: 'device:m62_state.ldrun/irem_audio'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:m62_state.kungfum_map'}), (b:KG {id: 'file:src/mame/irem/m62.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 182, sourceColumn: 1, sourceEndLine: 192};
MATCH (a:KG {id: 'map:m62_state.kungfum_map'}), (b:KG {id: 'map:m62_state.kungfum_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m62_state.kungfum_map'}), (b:KG {id: 'map:m62_state.kungfum_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m62_state.kungfum_map'}), (b:KG {id: 'map:m62_state.kungfum_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m62_state.kungfum_map'}), (b:KG {id: 'map:m62_state.kungfum_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m62_state.kungfum_map'}), (b:KG {id: 'map:m62_state.kungfum_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m62_state.kungfum_map'}), (b:KG {id: 'map:m62_state.kungfum_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m62_state.kungfum_io_map'}), (b:KG {id: 'file:src/mame/irem/m62.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 194, sourceColumn: 1, sourceEndLine: 202};
MATCH (a:KG {id: 'map:m62_state.kungfum_io_map'}), (b:KG {id: 'map:m62_state.kungfum_io_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m62_state.kungfum_io_map'}), (b:KG {id: 'map:m62_state.kungfum_io_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m62_state.kungfum_io_map'}), (b:KG {id: 'map:m62_state.kungfum_io_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m62_state.kungfum_io_map'}), (b:KG {id: 'map:m62_state.kungfum_io_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m62_state.kungfum_io_map'}), (b:KG {id: 'map:m62_state.kungfum_io_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'machine:m62_state.kungfum/callback:screen:0'}), (b:KG {id: 'handler:m62_state.screen_update_kungfum'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:m62_common'}), (b:KG {id: 'file:src/mame/irem/m62.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 371, sourceColumn: 1, sourceEndLine: 371};
MATCH (a:KG {id: 'inputs:m62_common'}), (b:KG {id: 'inputs:m62_common/SYSTEM'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:m62_common'}), (b:KG {id: 'inputs:m62_common/P1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:m62_common'}), (b:KG {id: 'inputs:m62_common/P2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:m62_common'}), (b:KG {id: 'inputs:m62_common/DSW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:kungfum/DSW2'}), (b:KG {id: 'inputs:kungfum/DSW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:kungfum/DSW2'}), (b:KG {id: 'inputs:kungfum/DSW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:kungfum/DSW2'}), (b:KG {id: 'inputs:kungfum/DSW2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:kungfum/DSW1'}), (b:KG {id: 'inputs:kungfum/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:kungfum/DSW1'}), (b:KG {id: 'inputs:kungfum/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:kungfum/DSW1'}), (b:KG {id: 'inputs:kungfum/DSW1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:kungfum/DSW1'}), (b:KG {id: 'inputs:kungfum/DSW1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:kungfum/DSW1'}), (b:KG {id: 'inputs:kungfum/DSW1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:kungfum/DSW1'}), (b:KG {id: 'inputs:kungfum/DSW1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:kungfum/maincpu'}), (b:KG {id: 'rom:kungfum/maincpu/a-4e-c.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/maincpu'}), (b:KG {id: 'rom:kungfum/maincpu/a-4d-c.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/irem_audio:iremsound'}), (b:KG {id: 'rom:kungfum/irem_audio:iremsound/a-3e-.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/irem_audio:iremsound'}), (b:KG {id: 'rom:kungfum/irem_audio:iremsound/a-3f-.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/irem_audio:iremsound'}), (b:KG {id: 'rom:kungfum/irem_audio:iremsound/a-3h-.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/gfx1'}), (b:KG {id: 'rom:kungfum/gfx1/g-4c-a.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/gfx1'}), (b:KG {id: 'rom:kungfum/gfx1/g-4d-a.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/gfx1'}), (b:KG {id: 'rom:kungfum/gfx1/g-4e-a.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/gfx2'}), (b:KG {id: 'rom:kungfum/gfx2/b-4k-.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/gfx2'}), (b:KG {id: 'rom:kungfum/gfx2/b-4f-.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/gfx2'}), (b:KG {id: 'rom:kungfum/gfx2/b-4l-.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/gfx2'}), (b:KG {id: 'rom:kungfum/gfx2/b-4h-.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/gfx2'}), (b:KG {id: 'rom:kungfum/gfx2/b-3n-.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/gfx2'}), (b:KG {id: 'rom:kungfum/gfx2/b-4n-.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/gfx2'}), (b:KG {id: 'rom:kungfum/gfx2/b-4m-.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/gfx2'}), (b:KG {id: 'rom:kungfum/gfx2/b-3m-.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/gfx2'}), (b:KG {id: 'rom:kungfum/gfx2/b-4c-.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/gfx2'}), (b:KG {id: 'rom:kungfum/gfx2/b-4e-.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/gfx2'}), (b:KG {id: 'rom:kungfum/gfx2/b-4d-.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/gfx2'}), (b:KG {id: 'rom:kungfum/gfx2/b-4a-.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/spr_height_prom'}), (b:KG {id: 'rom:kungfum/spr_height_prom/b-5f-.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/spr_color_proms'}), (b:KG {id: 'rom:kungfum/spr_color_proms/b-1m-.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/spr_color_proms'}), (b:KG {id: 'rom:kungfum/spr_color_proms/b-1n-.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/spr_color_proms'}), (b:KG {id: 'rom:kungfum/spr_color_proms/b-1l-.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/chr_color_proms'}), (b:KG {id: 'rom:kungfum/chr_color_proms/g-1j-.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/chr_color_proms'}), (b:KG {id: 'rom:kungfum/chr_color_proms/g-1f-.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/chr_color_proms'}), (b:KG {id: 'rom:kungfum/chr_color_proms/g-1h-.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:kungfum/timing'}), (b:KG {id: 'rom:kungfum/timing/b-6f-.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'handler:m62_state.m62_start'}), (b:KG {id: 'handler:m62_state.register_savestate'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:m62_state.video_start'}), (b:KG {id: 'handler:m62_state.m62_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:m62_state.video_start'}), (b:KG {id: 'handler:m62_state.get_ldrun_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m62_state.ldrun/maincpu'}), (b:KG {id: 'device:m62_state.ldrun/maincpu/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m62_state.ldrun/maincpu'}), (b:KG {id: 'map:m62_state.ldrun_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:m62_state.ldrun/maincpu'}), (b:KG {id: 'map:m62_state.kungfum_io_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'gfxdecode:gfx_m62_sprites'}), (b:KG {id: 'file:src/mame/irem/m62.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 849, sourceColumn: 8, sourceEndLine: 849};
MATCH (a:KG {id: 'gfxdecode:gfx_m62_sprites'}), (b:KG {id: 'gfxdecode:gfx_m62_sprites/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_m62_tiles'}), (b:KG {id: 'file:src/mame/irem/m62.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 853, sourceColumn: 8, sourceEndLine: 853};
MATCH (a:KG {id: 'gfxdecode:gfx_m62_tiles'}), (b:KG {id: 'gfxdecode:gfx_m62_tiles/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:m62_state.ldrun/irem_audio'}), (b:KG {id: 'machine:m62_audio_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'map:m62_state.kungfum_map/range1'}), (b:KG {id: 'handler:m62_state.m62_hscroll_low_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:m62_state.kungfum_map/range2'}), (b:KG {id: 'handler:m62_state.m62_hscroll_high_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:m62_state.kungfum_map/range4'}), (b:KG {id: 'handler:m62_state.kungfum_tileram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:m62_state.kungfum_io_map/range0'}), (b:KG {id: 'handler:irem_audio_device.cmd_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'irem_audio'};
MATCH (a:KG {id: 'map:m62_state.kungfum_io_map/range1'}), (b:KG {id: 'handler:m62_state.m62_flipscreen_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:m62_state.screen_update_kungfum'}), (b:KG {id: 'handler:m62_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:m62_common/SYSTEM'}), (b:KG {id: 'inputs:m62_common/SYSTEM/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/SYSTEM'}), (b:KG {id: 'inputs:m62_common/SYSTEM/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/SYSTEM'}), (b:KG {id: 'inputs:m62_common/SYSTEM/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/SYSTEM'}), (b:KG {id: 'inputs:m62_common/SYSTEM/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/SYSTEM'}), (b:KG {id: 'inputs:m62_common/SYSTEM/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/P1'}), (b:KG {id: 'inputs:m62_common/P1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/P1'}), (b:KG {id: 'inputs:m62_common/P1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/P1'}), (b:KG {id: 'inputs:m62_common/P1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/P1'}), (b:KG {id: 'inputs:m62_common/P1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/P1'}), (b:KG {id: 'inputs:m62_common/P1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/P1'}), (b:KG {id: 'inputs:m62_common/P1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/P1'}), (b:KG {id: 'inputs:m62_common/P1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/P1'}), (b:KG {id: 'inputs:m62_common/P1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/P2'}), (b:KG {id: 'inputs:m62_common/P2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/P2'}), (b:KG {id: 'inputs:m62_common/P2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/P2'}), (b:KG {id: 'inputs:m62_common/P2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/P2'}), (b:KG {id: 'inputs:m62_common/P2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/P2'}), (b:KG {id: 'inputs:m62_common/P2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/P2'}), (b:KG {id: 'inputs:m62_common/P2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/P2'}), (b:KG {id: 'inputs:m62_common/P2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/P2'}), (b:KG {id: 'inputs:m62_common/P2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/DSW2'}), (b:KG {id: 'inputs:m62_common/DSW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/DSW2'}), (b:KG {id: 'inputs:m62_common/DSW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/DSW2'}), (b:KG {id: 'inputs:m62_common/DSW2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/DSW2'}), (b:KG {id: 'inputs:m62_common/DSW2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/DSW2'}), (b:KG {id: 'inputs:m62_common/DSW2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:m62_common/DSW2'}), (b:KG {id: 'inputs:m62_common/DSW2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'device:m62_state.ldrun/maincpu/callback:maincpu:0'}), (b:KG {id: 'handler:m62_state.irq0_line_hold'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:m62_state.ldrun_map'}), (b:KG {id: 'file:src/mame/irem/m62.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/m62.cpp', sourceLine: 223, sourceColumn: 1, sourceEndLine: 229};
MATCH (a:KG {id: 'map:m62_state.ldrun_map'}), (b:KG {id: 'map:m62_state.ldrun_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m62_state.ldrun_map'}), (b:KG {id: 'map:m62_state.ldrun_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m62_state.ldrun_map'}), (b:KG {id: 'map:m62_state.ldrun_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:m62_state.ldrun_map'}), (b:KG {id: 'map:m62_state.ldrun_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_m62_sprites/e0'}), (b:KG {id: 'gfxlayout:spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_m62_tiles/e0'}), (b:KG {id: 'gfxlayout:gfx_8x8x3_planar'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'machine:m62_audio_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/irem/irem.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 400, sourceColumn: 1, sourceEndLine: 464};
MATCH (a:KG {id: 'machine:m62_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/iremsound'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/ay_45m'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/ay_45l'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/msm1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/msm2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:ibd'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:isd'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:ich'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:ioh'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:sinh'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:cin0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:cin1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:cin2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:cin3'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:cin4'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:cin5'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:cin6'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:cin7'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m62_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl:cout0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:m62_state.ldrun_map/range2'}), (b:KG {id: 'handler:m62_state.m62_tileram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:m62_state.screen_update_ldrun'}), (b:KG {id: 'handler:m62_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:spritelayout'}), (b:KG {id: 'file:src/mame/irem/m62.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:gfx_8x8x3_planar'}), (b:KG {id: 'file:src/mame/irem/m62.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/irem.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/irem.cpp'}), (b:KG {id: 'file:irem.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/irem.cpp'}), (b:KG {id: 'file:cpu/m6800/m6801.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/irem.cpp'}), (b:KG {id: 'file:sound/discrete.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/irem.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/iremsound'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/iremsound/callback:iremsound:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/iremsound'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/iremsound/callback:iremsound:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/iremsound'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/iremsound/callback:iremsound:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/iremsound'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/iremsound/callback:iremsound:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/iremsound'}), (b:KG {id: 'map:irem_audio_device.m62_sound_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/ay_45m'}), (b:KG {id: 'audioroute:device:m62_audio_device.device_add_mconfig/ay_45m/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/ay_45m'}), (b:KG {id: 'audioroute:device:m62_audio_device.device_add_mconfig/ay_45m/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/ay_45m'}), (b:KG {id: 'audioroute:device:m62_audio_device.device_add_mconfig/ay_45m/2'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/ay_45m'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/ay_45m/callback:ay_45m:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/ay_45m'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/ay_45m/callback:ay_45m:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/ay_45l'}), (b:KG {id: 'audioroute:device:m62_audio_device.device_add_mconfig/ay_45l/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/ay_45l'}), (b:KG {id: 'audioroute:device:m62_audio_device.device_add_mconfig/ay_45l/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/ay_45l'}), (b:KG {id: 'audioroute:device:m62_audio_device.device_add_mconfig/ay_45l/2'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/ay_45l'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/ay_45l/callback:ay_45l:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/msm1'}), (b:KG {id: 'audioroute:device:m62_audio_device.device_add_mconfig/msm1/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/msm1'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/msm1/callback:msm1:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/msm1'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/msm1/callback:msm1:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/msm2'}), (b:KG {id: 'audioroute:device:m62_audio_device.device_add_mconfig/msm2/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/snd_nl'}), (b:KG {id: 'audioroute:device:m62_audio_device.device_add_mconfig/snd_nl/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/iremsound/callback:iremsound:0'}), (b:KG {id: 'handler:m62_audio_device.m6803_port1_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/iremsound/callback:iremsound:1'}), (b:KG {id: 'handler:m62_audio_device.m6803_port1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/iremsound/callback:iremsound:2'}), (b:KG {id: 'handler:m62_audio_device.m6803_port2_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/iremsound/callback:iremsound:3'}), (b:KG {id: 'handler:m62_audio_device.m6803_port2_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:irem_audio_device.m62_sound_map'}), (b:KG {id: 'file:src/mame/irem/irem.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 377, sourceColumn: 1, sourceEndLine: 382};
MATCH (a:KG {id: 'map:irem_audio_device.m62_sound_map'}), (b:KG {id: 'map:irem_audio_device.m62_sound_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:irem_audio_device.m62_sound_map'}), (b:KG {id: 'map:irem_audio_device.m62_sound_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:irem_audio_device.m62_sound_map'}), (b:KG {id: 'map:irem_audio_device.m62_sound_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/ay_45m/callback:ay_45m:0'}), (b:KG {id: 'handler:irem_audio_device.soundlatch_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/ay_45m/callback:ay_45m:1'}), (b:KG {id: 'handler:irem_audio_device.ay8910_45M_portb_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/ay_45l/callback:ay_45l:0'}), (b:KG {id: 'handler:irem_audio_device.ay8910_45L_porta_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/msm1/callback:msm1:0'}), (b:KG {id: 'device:m62_audio_device.device_add_mconfig/iremsound'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:m62_audio_device.device_add_mconfig/msm1/callback:msm1:1'}), (b:KG {id: 'handler:msm5205_device.vclk_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:irem_audio_device.m62_sound_map/range0'}), (b:KG {id: 'handler:irem_audio_device.sound_irq_ack_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:irem_audio_device.m62_sound_map/range1'}), (b:KG {id: 'handler:irem_audio_device.m62_adpcm_w'}) MERGE (a)-[r:WRITES]->(b);
