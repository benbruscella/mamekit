// mamekit knowledge graph — driver src/mame/sega/zaxxon.cpp
// generated 2026-09-05T03:50:27.331Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/sega/zaxxon.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/sega/zaxxon.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:zaxxon.h'}) SET n:SourceFile SET n += {path: 'zaxxon.h', external: true};
MERGE (n:KG {id: 'file:segausb.h'}) SET n:SourceFile SET n += {path: 'segausb.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:machine/segacrpt_device.h'}) SET n:SourceFile SET n += {path: 'machine/segacrpt_device.h', external: true};
MERGE (n:KG {id: 'file:machine/gen_latch.h'}) SET n:SourceFile SET n += {path: 'machine/gen_latch.h', external: true};
MERGE (n:KG {id: 'file:machine/i8255.h'}) SET n:SourceFile SET n += {path: 'machine/i8255.h', external: true};
MERGE (n:KG {id: 'file:sound/samples.h'}) SET n:SourceFile SET n += {path: 'sound/samples.h', external: true};
MERGE (n:KG {id: 'file:sound/sn76496.h'}) SET n:SourceFile SET n += {path: 'sound/sn76496.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:src/mame/sega/zaxxon_a.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/sega/zaxxon_a.cpp'};
MERGE (n:KG {id: 'game:zaxxon'}) SET n:Game SET n += {name: 'zaxxon', year: '1982', company: 'Sega', fullname: 'Zaxxon (set 1, rev D)', monitor: 'ROT90', cls: 'zaxxon_state', init: 'empty_init', flags: 'MACHINE_IMPERFECT_SOUND | MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1625, sourceColumn: 1, sourceEndLine: 1625};
MERGE (n:KG {id: 'romset:zaxxon'}) SET n:RomSet SET n += {name: 'zaxxon', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1126, sourceColumn: 1, sourceEndLine: 1126};
MERGE (n:KG {id: 'region:zaxxon/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 24576, flags: '0', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1127, sourceColumn: 2, sourceEndLine: 1127};
MERGE (n:KG {id: 'rom:zaxxon/maincpu/zaxxon_rom3d.u27'}) SET n:Rom SET n += {file: 'zaxxon_rom3d.u27', offset: 0, size: 8192, crc: '6e2b4a30', sha1: '80ac53c554c84226b119cbe3cf3470bcdbcd5762', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1128, sourceColumn: 2, sourceEndLine: 1128};
MERGE (n:KG {id: 'rom:zaxxon/maincpu/zaxxon_rom2d.u28'}) SET n:Rom SET n += {file: 'zaxxon_rom2d.u28', offset: 8192, size: 8192, crc: '1c9ea398', sha1: '0cd259be3fa80f3d53dfa76d5ca06773cdfe5945', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1129, sourceColumn: 2, sourceEndLine: 1129};
MERGE (n:KG {id: 'rom:zaxxon/maincpu/zaxxon_rom1d.u29'}) SET n:Rom SET n += {file: 'zaxxon_rom1d.u29', offset: 16384, size: 4096, crc: '1c123ef9', sha1: '2588be06ea7baca6112d58c78a1eeb98aad8a02e', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1130, sourceColumn: 2, sourceEndLine: 1130};
MERGE (n:KG {id: 'region:zaxxon/gfx_tx'}) SET n:RomRegion SET n += {tag: 'gfx_tx', size: 4096, flags: '0', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1132, sourceColumn: 2, sourceEndLine: 1132};
MERGE (n:KG {id: 'rom:zaxxon/gfx_tx/zaxxon_rom14.u68'}) SET n:Rom SET n += {file: 'zaxxon_rom14.u68', offset: 0, size: 2048, crc: '07bf8c52', sha1: '425157a1625b1bd5169c3218b958010bf6af12bb', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1133, sourceColumn: 2, sourceEndLine: 1133};
MERGE (n:KG {id: 'rom:zaxxon/gfx_tx/zaxxon_rom15.u69'}) SET n:Rom SET n += {file: 'zaxxon_rom15.u69', offset: 2048, size: 2048, crc: 'c215edcb', sha1: 'f1ded2173eb139f48d2ca86c5ef00acbe6c11cd3', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1134, sourceColumn: 2, sourceEndLine: 1134};
MERGE (n:KG {id: 'region:zaxxon/gfx_bg'}) SET n:RomRegion SET n += {tag: 'gfx_bg', size: 24576, flags: '0', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1136, sourceColumn: 2, sourceEndLine: 1136};
MERGE (n:KG {id: 'rom:zaxxon/gfx_bg/zaxxon_rom6.u113'}) SET n:Rom SET n += {file: 'zaxxon_rom6.u113', offset: 0, size: 8192, crc: '6e07bb68', sha1: 'a002f3441b0f0044615ce71ecbd14edadba16270', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1137, sourceColumn: 2, sourceEndLine: 1137};
MERGE (n:KG {id: 'rom:zaxxon/gfx_bg/zaxxon_rom5.u112'}) SET n:Rom SET n += {file: 'zaxxon_rom5.u112', offset: 8192, size: 8192, crc: '0a5bce6a', sha1: 'a86543727389931244ba8a576b543d7ac05a2585', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1138, sourceColumn: 2, sourceEndLine: 1138};
MERGE (n:KG {id: 'rom:zaxxon/gfx_bg/zaxxon_rom4.u111'}) SET n:Rom SET n += {file: 'zaxxon_rom4.u111', offset: 16384, size: 8192, crc: 'a5bf1465', sha1: 'a8cd27dfb4a606bae8bfddcf936e69e980fb1977', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1139, sourceColumn: 2, sourceEndLine: 1139};
MERGE (n:KG {id: 'region:zaxxon/gfx_spr'}) SET n:RomRegion SET n += {tag: 'gfx_spr', size: 24576, flags: '0', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1141, sourceColumn: 2, sourceEndLine: 1141};
MERGE (n:KG {id: 'rom:zaxxon/gfx_spr/zaxxon_rom11.u77'}) SET n:Rom SET n += {file: 'zaxxon_rom11.u77', offset: 0, size: 8192, crc: 'eaf0dd4b', sha1: '194e2ca0a806e0cb6bb7cc8341d1fc6f2ea911f6', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1142, sourceColumn: 2, sourceEndLine: 1142};
MERGE (n:KG {id: 'rom:zaxxon/gfx_spr/zaxxon_rom12.u78'}) SET n:Rom SET n += {file: 'zaxxon_rom12.u78', offset: 8192, size: 8192, crc: '1c5369c7', sha1: 'af6a5984c3cedfa8c9efcd669f4f205b51a433b2', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1143, sourceColumn: 2, sourceEndLine: 1143};
MERGE (n:KG {id: 'rom:zaxxon/gfx_spr/zaxxon_rom13.u79'}) SET n:Rom SET n += {file: 'zaxxon_rom13.u79', offset: 16384, size: 8192, crc: 'ab4e8a9a', sha1: '4ac79cccc30e4adfa878b36101e97e20ac010438', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1144, sourceColumn: 2, sourceEndLine: 1144};
MERGE (n:KG {id: 'region:zaxxon/tilemap_dat'}) SET n:RomRegion SET n += {tag: 'tilemap_dat', size: 32768, flags: '0', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1146, sourceColumn: 2, sourceEndLine: 1146};
MERGE (n:KG {id: 'rom:zaxxon/tilemap_dat/zaxxon_rom8.u91'}) SET n:Rom SET n += {file: 'zaxxon_rom8.u91', offset: 0, size: 8192, crc: '28d65063', sha1: 'e1f90716236c61df61bdc6915a8e390cb4dcbf15', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1147, sourceColumn: 2, sourceEndLine: 1147};
MERGE (n:KG {id: 'rom:zaxxon/tilemap_dat/zaxxon_rom7.u90'}) SET n:Rom SET n += {file: 'zaxxon_rom7.u90', offset: 8192, size: 8192, crc: '6284c200', sha1: 'd26a9049541479b8b19f5aa0690cf4aaa787c9b5', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1148, sourceColumn: 2, sourceEndLine: 1148};
MERGE (n:KG {id: 'rom:zaxxon/tilemap_dat/zaxxon_rom10.u93'}) SET n:Rom SET n += {file: 'zaxxon_rom10.u93', offset: 16384, size: 8192, crc: 'a95e61fd', sha1: 'a0f8c15ff75affa3532abf8f340811cf415421fd', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1149, sourceColumn: 2, sourceEndLine: 1149};
MERGE (n:KG {id: 'rom:zaxxon/tilemap_dat/zaxxon_rom9.u92'}) SET n:Rom SET n += {file: 'zaxxon_rom9.u92', offset: 24576, size: 8192, crc: '7e42691f', sha1: '2124363be8f590b74e2b15dd3f90d77dd9ca9528', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1150, sourceColumn: 2, sourceEndLine: 1150};
MERGE (n:KG {id: 'region:zaxxon/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 512, flags: '0', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1152, sourceColumn: 2, sourceEndLine: 1152};
MERGE (n:KG {id: 'rom:zaxxon/proms/mro16.u76'}) SET n:Rom SET n += {file: 'mro16.u76', offset: 0, size: 256, crc: '6cc6695b', sha1: '01ae8450ccc302e1a5ae74230d44f6f531a962e2', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1153, sourceColumn: 2, sourceEndLine: 1153};
MERGE (n:KG {id: 'rom:zaxxon/proms/zaxxon.u72'}) SET n:Rom SET n += {file: 'zaxxon.u72', offset: 256, size: 256, crc: 'deaa21f7', sha1: '0cf08fb62f77d93ff7cb883c633e0db35906e11d', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1154, sourceColumn: 2, sourceEndLine: 1154};
MERGE (n:KG {id: 'map:zaxxon_state.zaxxon_map'}) SET n:AddressMap SET n += {cls: 'zaxxon_state', name: 'zaxxon_map', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 453, sourceColumn: 1, sourceEndLine: 467};
MERGE (n:KG {id: 'map:zaxxon_state.zaxxon_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 24575, raw: 'map(0x0000, 0x5fff).rom()', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 455, sourceColumn: 2, sourceEndLine: 455, rom: true};
MERGE (n:KG {id: 'map:zaxxon_state.zaxxon_map/range1'}) SET n:AddressRange SET n += {start: 24576, end: 28671, raw: 'map(0x6000, 0x6fff).ram()', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 456, sourceColumn: 2, sourceEndLine: 456, ram: true};
MERGE (n:KG {id: 'map:zaxxon_state.zaxxon_map/range2'}) SET n:AddressRange SET n += {start: 32768, end: 33791, raw: 'map(0x8000, 0x83ff).mirror(0x1c00).ram().w(FUNC(zaxxon_state::zaxxon_videoram_w)).share("videoram")', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 457, sourceColumn: 2, sourceEndLine: 457, mirror: 7168, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'handler:zaxxon_state.zaxxon_videoram_w'}) SET n:Handler SET n += {method: 'zaxxon_videoram_w', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon_v.cpp', sourceLine: 238, sourceColumn: 1, sourceEndLine: 242, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[offset] = data;
	m_fg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:zaxxon_state.zaxxon_map/range3'}) SET n:AddressRange SET n += {start: 40960, end: 41215, raw: 'map(0xa000, 0xa0ff).mirror(0x1f00).ram().share("spriteram")', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 458, sourceColumn: 2, sourceEndLine: 458, mirror: 7936, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:zaxxon_state.zaxxon_map/range4'}) SET n:AddressRange SET n += {start: 49152, end: 49152, raw: 'map(0xc000, 0xc000).mirror(0x18fc).portr("SW00")', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 459, sourceColumn: 2, sourceEndLine: 459, mirror: 6396, portRead: 'SW00'};
MERGE (n:KG {id: 'map:zaxxon_state.zaxxon_map/range5'}) SET n:AddressRange SET n += {start: 49153, end: 49153, raw: 'map(0xc001, 0xc001).mirror(0x18fc).portr("SW01")', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 460, sourceColumn: 2, sourceEndLine: 460, mirror: 6396, portRead: 'SW01'};
MERGE (n:KG {id: 'map:zaxxon_state.zaxxon_map/range6'}) SET n:AddressRange SET n += {start: 49154, end: 49154, raw: 'map(0xc002, 0xc002).mirror(0x18fc).portr("DSW02")', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 461, sourceColumn: 2, sourceEndLine: 461, mirror: 6396, portRead: 'DSW02'};
MERGE (n:KG {id: 'map:zaxxon_state.zaxxon_map/range7'}) SET n:AddressRange SET n += {start: 49155, end: 49155, raw: 'map(0xc003, 0xc003).mirror(0x18fc).portr("DSW03")', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 462, sourceColumn: 2, sourceEndLine: 462, mirror: 6396, portRead: 'DSW03'};
MERGE (n:KG {id: 'map:zaxxon_state.zaxxon_map/range8'}) SET n:AddressRange SET n += {start: 49408, end: 49408, raw: 'map(0xc100, 0xc100).mirror(0x18ff).portr("SW100")', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 463, sourceColumn: 2, sourceEndLine: 463, mirror: 6399, portRead: 'SW100'};
MERGE (n:KG {id: 'map:zaxxon_state.zaxxon_map/range9'}) SET n:AddressRange SET n += {start: 49152, end: 49159, raw: 'map(0xc000, 0xc007).mirror(0x18f8).w("mainlatch1", FUNC(ls259_device::write_d0))', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 464, sourceColumn: 2, sourceEndLine: 464, mirror: 6392};
MERGE (n:KG {id: 'handler:ls259_device.write_d0'}) SET n:Handler SET n += {method: 'write_d0', ownerClass: 'ls259_device', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 518, sourceColumn: 2, sourceEndLine: 518};
MERGE (n:KG {id: 'map:zaxxon_state.zaxxon_map/range10'}) SET n:AddressRange SET n += {start: 57404, end: 57407, raw: 'map(0xe03c, 0xe03f).mirror(0x1f00).rw("ppi8255", FUNC(i8255_device::read), FUNC(i8255_device::write))', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 465, sourceColumn: 2, sourceEndLine: 465, mirror: 7936};
MERGE (n:KG {id: 'handler:i8255_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'i8255_device', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 531, sourceColumn: 2, sourceEndLine: 531};
MERGE (n:KG {id: 'handler:i8255_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'i8255_device', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 531, sourceColumn: 2, sourceEndLine: 531};
MERGE (n:KG {id: 'map:zaxxon_state.zaxxon_map/range11'}) SET n:AddressRange SET n += {start: 57584, end: 57587, raw: 'map(0xe0f0, 0xe0f3).mirror(0x1f00).select(0x0008).w(FUNC(zaxxon_state::zaxxon_control_w))', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 466, sourceColumn: 2, sourceEndLine: 466, mirror: 7936};
MERGE (n:KG {id: 'handler:zaxxon_state.zaxxon_control_w'}) SET n:Handler SET n += {method: 'zaxxon_control_w', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 397, sourceColumn: 1, sourceEndLine: 404, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '// address decode for E0F8/E0F9 (74LS138 @ U57) has its G2B enable input in common with this latch
	bool a3 = BIT(offset, 3);
	m_mainlatch[1]->write_bit((a3 ? 4 : 0) | (offset & 3), BIT(data, 0));
	if (a3 && !BIT(offset, 1))
		bg_position_w(offset & 1, data);'};
MERGE (n:KG {id: 'handler:zaxxon_state.bg_position_w'}) SET n:Handler SET n += {method: 'bg_position_w', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon_v.cpp', sourceLine: 191, sourceColumn: 1, sourceEndLine: 198, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '/* 11 bits of scroll position are stored */
	if (offset == 0)
		m_bg_position = (m_bg_position & 0x700) | ((data << 0) & 0x0ff);
	else
		m_bg_position = (m_bg_position & 0x0ff) | ((data << 8) & 0x700);'};
MERGE (n:KG {id: 'machine:zaxxon_state.root'}) SET n:MachineConfig SET n += {cls: 'zaxxon_state', name: 'root', calls: [], stateMembers: ['{"name":"m_int_enabled","bits":8}', '{"name":"m_coin_status","bits":8,"arrayLength":3}', '{"name":"m_sound_state","bits":8,"arrayLength":3}', '{"name":"m_bg_enable","bits":8}', '{"name":"m_bg_color","bits":8}', '{"name":"m_bg_position","bits":16}', '{"name":"m_fg_color","bits":8}', '{"name":"m_flip_screen","bits":1}', '{"name":"m_congo_fg_bank","bits":8}', '{"name":"m_congo_color_bank","bits":8}', '{"name":"m_congo_custom","bits":8,"arrayLength":4}'], startHandlers: ['zaxxon_state.video_start'], sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 945, sourceColumn: 1, sourceEndLine: 982};
MERGE (n:KG {id: 'handler:zaxxon_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon_v.cpp', sourceLine: 145, sourceColumn: 1, sourceEndLine: 148, sourceParameters: '', sourceBody: 'video_start_common(tilemap_get_info_delegate(*this, FUNC(zaxxon_state::zaxxon_get_fg_tile_info)));'};
MERGE (n:KG {id: 'handler:zaxxon_state.video_start_common'}) SET n:Handler SET n += {method: 'video_start_common', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon_v.cpp', sourceLine: 117, sourceColumn: 1, sourceEndLine: 142, sourceParameters: 'tilemap_get_info_delegate &&fg_tile_info', sourceBody: '/* reset globals */
	m_bg_enable = 0;
	m_bg_color = 0;
	m_bg_position = 0;
	m_fg_color = 0;
	m_flip_screen = false;
	m_congo_fg_bank = 0;
	m_congo_color_bank = 0;
	memset(m_congo_custom, 0, sizeof(m_congo_custom));

	// create a background and foreground tilemap
	m_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(zaxxon_state::get_bg_tile_info)), TILEMAP_SCAN_ROWS, 8,8, 32,512);
	m_fg_tilemap = &machine().tilemap().create(*m_gfxdecode, std::move(fg_tile_info), TILEMAP_SCAN_ROWS, 8,8, 32,32);

	// configure the foreground tilemap
	m_fg_tilemap->set_transparent_pen(0);

	// register for save states
	save_item(NAME(m_bg_enable));
	save_item(NAME(m_bg_color));
	save_item(NAME(m_bg_position));
	save_item(NAME(m_fg_color));
	save_item(NAME(m_flip_screen));'};
MERGE (n:KG {id: 'handler:zaxxon_state.get_bg_tile_info'}) SET n:Handler SET n += {method: 'get_bg_tile_info', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon_v.cpp', sourceLine: 69, sourceColumn: 1, sourceEndLine: 78, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'const uint8_t *source = memregion("tilemap_dat")->base();
	int size = memregion("tilemap_dat")->bytes() / 2;
	int eff_index = tile_index & (size - 1);
	int code = source[eff_index] + 256 * (source[eff_index + size] & 3);
	int color = source[eff_index + size] >> 4;

	tileinfo.set(1, code, color, 0);'};
MERGE (n:KG {id: 'handler:zaxxon_state.zaxxon_get_fg_tile_info'}) SET n:Handler SET n += {method: 'zaxxon_get_fg_tile_info', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon_v.cpp', sourceLine: 81, sourceColumn: 1, sourceEndLine: 89, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int sx = tile_index % 32;
	int sy = tile_index / 32;
	int code = m_videoram[tile_index];
	int color = m_color_codes[sx + 32 * (sy / 4)] & 0x0f;

	tileinfo.set(0, code, color * 2, 0);'};
MERGE (n:KG {id: 'device:zaxxon_state.root/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 3041250, config: ['Z80(config, m_maincpu, MASTER_CLOCK/16)', 'm_maincpu->set_addrmap(AS_PROGRAM, &zaxxon_state::zaxxon_map)'], sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 948, sourceColumn: 2, sourceEndLine: 948};
MERGE (n:KG {id: 'device:zaxxon_state.root/ppi8255'}) SET n:Device SET n += {type: 'I8255A', tag: 'ppi8255', clock: null, config: ['I8255A(config, m_ppi)', 'm_ppi->out_pa_callback().set(FUNC(zaxxon_state::zaxxon_sound_a_w))', 'm_ppi->out_pb_callback().set(FUNC(zaxxon_state::zaxxon_sound_b_w))', 'm_ppi->out_pc_callback().set(FUNC(zaxxon_state::zaxxon_sound_c_w))', 'm_ppi->tri_pa_callback().set_constant(0)', 'm_ppi->tri_pb_callback().set_constant(0)', 'm_ppi->tri_pc_callback().set_constant(0)'], sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 951, sourceColumn: 2, sourceEndLine: 951};
MERGE (n:KG {id: 'device:zaxxon_state.root/ppi8255/callback:ppi8255:0'}) SET n:Callback SET n += {signal: 'out_pa_callback', operation: 'set', raw: 'm_ppi->out_pa_callback().set(FUNC(zaxxon_state::zaxxon_sound_a_w))', ownerTag: 'ppi8255', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 952, sourceColumn: 2, sourceEndLine: 952, targetClass: 'zaxxon_state', targetMethod: 'zaxxon_sound_a_w'};
MERGE (n:KG {id: 'handler:zaxxon_state.zaxxon_sound_a_w'}) SET n:Handler SET n += {method: 'zaxxon_sound_a_w', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon_a.cpp', sourceLine: 111, sourceColumn: 1, sourceEndLine: 142, sourceParameters: 'uint8_t data', sourceBody: 'uint8_t diff = data ^ m_sound_state[0];
	m_sound_state[0] = data;

	/* PLAYER SHIP A/B: volume */
	m_samples->set_volume(10, 0.5 + 0.157 * (data & 0x03));
	m_samples->set_volume(11, 0.5 + 0.157 * (data & 0x03));

	/* PLAYER SHIP C: channel 10 */
	if ((diff & 0x04) && !(data & 0x04)) m_samples->start(10, 10, true);
	if ((diff & 0x04) &&  (data & 0x04)) m_samples->stop(10);

	/* PLAYER SHIP D: channel 11 */
	if ((diff & 0x08) && !(data & 0x08)) m_samples->start(11, 11, true);
	if ((diff & 0x08) &&  (data & 0x08)) m_samples->stop(11);

	/* HOMING MISSILE: channel 0 */
	if ((diff & 0x10) && !(data & 0x10)) m_samples->start(0, 0, true);
	if ((diff & 0x10) &&  (data & 0x10)) m_samples->stop(0);

	/* BASE MISSILE: channel 1 */
	if ((diff & 0x20) && !(data & 0x20)) m_samples->start(1, 1);

	/* LASER: channel 2 */
	if ((diff & 0x40) && !(data & 0x40)) m_samples->start(2, 2, true);
	if ((diff & 0x40) &&  (data & 0x40)) m_samples->stop(2);

	/* BATTLESHIP: channel 3 */
	if ((diff & 0x80) && !(data & 0x80)) m_samples->start(3, 3, true);
	if ((diff & 0x80) &&  (data & 0x80)) m_samples->stop(3);'};
MERGE (n:KG {id: 'device:zaxxon_state.root/ppi8255/callback:ppi8255:1'}) SET n:Callback SET n += {signal: 'out_pb_callback', operation: 'set', raw: 'm_ppi->out_pb_callback().set(FUNC(zaxxon_state::zaxxon_sound_b_w))', ownerTag: 'ppi8255', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 953, sourceColumn: 2, sourceEndLine: 953, targetClass: 'zaxxon_state', targetMethod: 'zaxxon_sound_b_w'};
MERGE (n:KG {id: 'handler:zaxxon_state.zaxxon_sound_b_w'}) SET n:Handler SET n += {method: 'zaxxon_sound_b_w', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon_a.cpp', sourceLine: 145, sourceColumn: 1, sourceEndLine: 158, sourceParameters: 'uint8_t data', sourceBody: 'uint8_t diff = data ^ m_sound_state[1];
	m_sound_state[1] = data;

	/* S-EXP: channel 4 */
	if ((diff & 0x10) && !(data & 0x10)) m_samples->start(4, 4);

	/* M-EXP: channel 5 */
	if ((diff & 0x20) && !(data & 0x20) && !m_samples->playing(5)) m_samples->start(5, 5);

	/* CANNON: channel 6 */
	if ((diff & 0x80) && !(data & 0x80)) m_samples->start(6, 6);'};
MERGE (n:KG {id: 'device:zaxxon_state.root/ppi8255/callback:ppi8255:2'}) SET n:Callback SET n += {signal: 'out_pc_callback', operation: 'set', raw: 'm_ppi->out_pc_callback().set(FUNC(zaxxon_state::zaxxon_sound_c_w))', ownerTag: 'ppi8255', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 954, sourceColumn: 2, sourceEndLine: 954, targetClass: 'zaxxon_state', targetMethod: 'zaxxon_sound_c_w'};
MERGE (n:KG {id: 'handler:zaxxon_state.zaxxon_sound_c_w'}) SET n:Handler SET n += {method: 'zaxxon_sound_c_w', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon_a.cpp', sourceLine: 161, sourceColumn: 1, sourceEndLine: 174, sourceParameters: 'uint8_t data', sourceBody: 'uint8_t diff = data ^ m_sound_state[2];
	m_sound_state[2] = data;

	/* SHOT: channel 7 */
	if ((diff & 0x01) && !(data & 0x01)) m_samples->start(7, 7);

	/* ALARM2: channel 8 */
	if ((diff & 0x04) && !(data & 0x04)) m_samples->start(8, 8);

	/* ALARM3: channel 9 */
	if ((diff & 0x08) && !(data & 0x08) && !m_samples->playing(9)) m_samples->start(9, 9);'};
MERGE (n:KG {id: 'device:zaxxon_state.root/mainlatch1'}) SET n:Device SET n += {type: 'LS259', tag: 'mainlatch1', clock: null, config: ['LS259(config, m_mainlatch[0])', 'm_mainlatch[0]->q_out_cb<0>().set(FUNC(zaxxon_state::coin_enable_w))', 'm_mainlatch[0]->q_out_cb<1>().set(FUNC(zaxxon_state::coin_enable_w))', 'm_mainlatch[0]->q_out_cb<2>().set(FUNC(zaxxon_state::coin_enable_w))', 'm_mainlatch[0]->q_out_cb<3>().set(FUNC(zaxxon_state::coin_counter_a_w))', 'm_mainlatch[0]->q_out_cb<4>().set(FUNC(zaxxon_state::coin_counter_b_w))', 'm_mainlatch[0]->q_out_cb<6>().set(FUNC(zaxxon_state::flipscreen_w))'], sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 959, sourceColumn: 2, sourceEndLine: 959};
MERGE (n:KG {id: 'device:zaxxon_state.root/mainlatch1/callback:mainlatch1:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch[0]->q_out_cb<0>().set(FUNC(zaxxon_state::coin_enable_w))', ownerTag: 'mainlatch1', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 960, sourceColumn: 2, sourceEndLine: 960, slot: '0', targetClass: 'zaxxon_state', targetMethod: 'coin_enable_w'};
MERGE (n:KG {id: 'handler:zaxxon_state.coin_enable_w'}) SET n:Handler SET n += {method: 'coin_enable_w', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 423, sourceColumn: 1, sourceEndLine: 428, sourceParameters: 'int state', sourceBody: 'for (int n = 0; n < 3; n++)
		if (!BIT(m_mainlatch[0]->output_state(), n))
			m_coin_status[n] = 0;'};
MERGE (n:KG {id: 'device:zaxxon_state.root/mainlatch1/callback:mainlatch1:1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch[0]->q_out_cb<1>().set(FUNC(zaxxon_state::coin_enable_w))', ownerTag: 'mainlatch1', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 961, sourceColumn: 2, sourceEndLine: 961, slot: '1', targetClass: 'zaxxon_state', targetMethod: 'coin_enable_w'};
MERGE (n:KG {id: 'device:zaxxon_state.root/mainlatch1/callback:mainlatch1:2'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch[0]->q_out_cb<2>().set(FUNC(zaxxon_state::coin_enable_w))', ownerTag: 'mainlatch1', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 962, sourceColumn: 2, sourceEndLine: 962, slot: '2', targetClass: 'zaxxon_state', targetMethod: 'coin_enable_w'};
MERGE (n:KG {id: 'device:zaxxon_state.root/mainlatch1/callback:mainlatch1:3'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch[0]->q_out_cb<3>().set(FUNC(zaxxon_state::coin_counter_a_w))', ownerTag: 'mainlatch1', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 963, sourceColumn: 2, sourceEndLine: 963, slot: '3', targetClass: 'zaxxon_state', targetMethod: 'coin_counter_a_w'};
MERGE (n:KG {id: 'handler:zaxxon_state.coin_counter_a_w'}) SET n:Handler SET n += {method: 'coin_counter_a_w', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 407, sourceColumn: 1, sourceEndLine: 410, sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(0, state);'};
MERGE (n:KG {id: 'device:zaxxon_state.root/mainlatch1/callback:mainlatch1:4'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch[0]->q_out_cb<4>().set(FUNC(zaxxon_state::coin_counter_b_w))', ownerTag: 'mainlatch1', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 964, sourceColumn: 2, sourceEndLine: 964, slot: '4', targetClass: 'zaxxon_state', targetMethod: 'coin_counter_b_w'};
MERGE (n:KG {id: 'handler:zaxxon_state.coin_counter_b_w'}) SET n:Handler SET n += {method: 'coin_counter_b_w', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 413, sourceColumn: 1, sourceEndLine: 416, sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(1, state);'};
MERGE (n:KG {id: 'device:zaxxon_state.root/mainlatch1/callback:mainlatch1:5'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch[0]->q_out_cb<6>().set(FUNC(zaxxon_state::flipscreen_w))', ownerTag: 'mainlatch1', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 965, sourceColumn: 2, sourceEndLine: 965, slot: '6', targetClass: 'zaxxon_state', targetMethod: 'flipscreen_w'};
MERGE (n:KG {id: 'handler:zaxxon_state.flipscreen_w'}) SET n:Handler SET n += {method: 'flipscreen_w', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon_v.cpp', sourceLine: 175, sourceColumn: 1, sourceEndLine: 180, sourceParameters: 'int state', sourceBody: '/* low bit controls flip; background and sprite flip are handled at render time */
	m_flip_screen = !state;
	m_fg_tilemap->set_flip(m_flip_screen ? (TILEMAP_FLIPX | TILEMAP_FLIPY) : 0);'};
MERGE (n:KG {id: 'device:zaxxon_state.root/mainlatch2'}) SET n:Device SET n += {type: 'LS259', tag: 'mainlatch2', clock: null, config: ['LS259(config, m_mainlatch[1])', 'm_mainlatch[1]->q_out_cb<0>().set(FUNC(zaxxon_state::int_enable_w))', 'm_mainlatch[1]->q_out_cb<1>().set(FUNC(zaxxon_state::fg_color_w))', 'm_mainlatch[1]->q_out_cb<6>().set(FUNC(zaxxon_state::bg_color_w))', 'm_mainlatch[1]->q_out_cb<7>().set(FUNC(zaxxon_state::bg_enable_w))'], sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 967, sourceColumn: 2, sourceEndLine: 967};
MERGE (n:KG {id: 'device:zaxxon_state.root/mainlatch2/callback:mainlatch2:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch[1]->q_out_cb<0>().set(FUNC(zaxxon_state::int_enable_w))', ownerTag: 'mainlatch2', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 968, sourceColumn: 2, sourceEndLine: 968, slot: '0', targetClass: 'zaxxon_state', targetMethod: 'int_enable_w'};
MERGE (n:KG {id: 'handler:zaxxon_state.int_enable_w'}) SET n:Handler SET n += {method: 'int_enable_w', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 313, sourceColumn: 1, sourceEndLine: 318, sourceParameters: 'int state', sourceBody: 'm_int_enabled = state;
	if (!m_int_enabled)
		m_maincpu->set_input_line(0, CLEAR_LINE);'};
MERGE (n:KG {id: 'device:zaxxon_state.root/mainlatch2/callback:mainlatch2:1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch[1]->q_out_cb<1>().set(FUNC(zaxxon_state::fg_color_w))', ownerTag: 'mainlatch2', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 969, sourceColumn: 2, sourceEndLine: 969, slot: '1', targetClass: 'zaxxon_state', targetMethod: 'fg_color_w'};
MERGE (n:KG {id: 'handler:zaxxon_state.fg_color_w'}) SET n:Handler SET n += {method: 'fg_color_w', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon_v.cpp', sourceLine: 183, sourceColumn: 1, sourceEndLine: 188, sourceParameters: 'int state', sourceBody: '/* low bit selects high color palette index */
	m_fg_color = state * 0x80;
	m_fg_tilemap->set_palette_offset(m_fg_color + (m_congo_color_bank << 8));'};
MERGE (n:KG {id: 'device:zaxxon_state.root/mainlatch2/callback:mainlatch2:2'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch[1]->q_out_cb<6>().set(FUNC(zaxxon_state::bg_color_w))', ownerTag: 'mainlatch2', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 970, sourceColumn: 2, sourceEndLine: 970, slot: '6', targetClass: 'zaxxon_state', targetMethod: 'bg_color_w'};
MERGE (n:KG {id: 'handler:zaxxon_state.bg_color_w'}) SET n:Handler SET n += {method: 'bg_color_w', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon_v.cpp', sourceLine: 201, sourceColumn: 1, sourceEndLine: 205, sourceParameters: 'int state', sourceBody: '/* low bit selects high color palette index */
	m_bg_color = state * 0x80;'};
MERGE (n:KG {id: 'device:zaxxon_state.root/mainlatch2/callback:mainlatch2:3'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch[1]->q_out_cb<7>().set(FUNC(zaxxon_state::bg_enable_w))', ownerTag: 'mainlatch2', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 971, sourceColumn: 2, sourceEndLine: 971, slot: '7', targetClass: 'zaxxon_state', targetMethod: 'bg_enable_w'};
MERGE (n:KG {id: 'handler:zaxxon_state.bg_enable_w'}) SET n:Handler SET n += {method: 'bg_enable_w', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon_v.cpp', sourceLine: 208, sourceColumn: 1, sourceEndLine: 212, sourceParameters: 'int state', sourceBody: '/* low bit enables/disables the background layer */
	m_bg_enable = state;'};
MERGE (n:KG {id: 'device:zaxxon_state.root/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_zaxxon)'], sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 974, sourceColumn: 2, sourceEndLine: 974, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:zaxxon_state.root/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(zaxxon_state::zaxxon_palette), 256)'], sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 975, sourceColumn: 2, sourceEndLine: 975, clockExpr: 'FUNC(zaxxon_state::zaxxon_palette)'};
MERGE (n:KG {id: 'device:zaxxon_state.root/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['screen_device &screen(SCREEN(config, "screen", SCREEN_TYPE_RASTER))', 'screen.set_raw(PIXEL_CLOCK, HTOTAL, HBEND, HBSTART, VTOTAL, VBEND, VBSTART)', 'screen.set_screen_update(FUNC(zaxxon_state::screen_update_zaxxon))', 'screen.set_palette(m_palette)', 'screen.screen_vblank().set(FUNC(zaxxon_state::vblank_int))'], sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 977, sourceColumn: 2, sourceEndLine: 977, configCalls: ['set_raw(6082500,384,0,256,264,16,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6082500, 384, 0, 256, 264, 16, 240], screenRawExpr: ['PIXEL_CLOCK', 'HTOTAL', 'HBEND', 'HBSTART', 'VTOTAL', 'VBEND', 'VBSTART']};
MERGE (n:KG {id: 'device:zaxxon_state.root/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'screen.set_screen_update(FUNC(zaxxon_state::screen_update_zaxxon))', ownerTag: 'screen', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 979, sourceColumn: 2, sourceEndLine: 979, targetClass: 'zaxxon_state', targetMethod: 'screen_update_zaxxon'};
MERGE (n:KG {id: 'handler:zaxxon_state.screen_update_zaxxon'}) SET n:Handler SET n += {method: 'screen_update_zaxxon', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon_v.cpp', sourceLine: 440, sourceColumn: 1, sourceEndLine: 446, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'draw_background(bitmap, cliprect, true);
	draw_sprites(bitmap, cliprect, 0x140, 0x180);
	m_fg_tilemap->draw(screen, bitmap, cliprect, 0, 0);
	return 0;'};
MERGE (n:KG {id: 'handler:zaxxon_state.draw_background'}) SET n:Handler SET n += {method: 'draw_background', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon_v.cpp', sourceLine: 293, sourceColumn: 1, sourceEndLine: 351, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect, int skew', sourceBody: '/* only draw if enabled */
	if (m_bg_enable)
	{
		bitmap_ind16 &pixmap = m_bg_tilemap->pixmap();
		int colorbase = m_bg_color + (m_congo_color_bank << 8);
		int xmask = pixmap.width() - 1;
		int ymask = pixmap.height() - 1;
		int flipmask = m_flip_screen ? 0xff : 0x00;
		int flipoffs = m_flip_screen ? 0x38 : 0x40;

		/* the starting X value is offset by 1 pixel (normal) or 7 pixels */
		/* (flipped) due to a delay in the loading */
		if (!m_flip_screen)
			flipoffs -= 1;
		else
			flipoffs += 7;

		/* loop over visible rows */
		for (int y = cliprect.min_y; y <= cliprect.max_y; y++)
		{
			uint16_t *const dst = &bitmap.pix(y);

			/* VF = flipped V signals */
			int vf = y ^ flipmask;

			/* base of the source row comes from VF plus the scroll value */
			/* this is done by the 3 4-bit adders at U56, U74, U75 */
			int srcy = vf + ((m_bg_position << 1) ^ 0xfff) + 1;
			uint16_t const *src = &pixmap.pix(srcy & ymask);

			/* loop over visible columns */
			for (int x = cliprect.min_x; x <= cliprect.max_x; x++)
			{
				/* start with HF = flipped H signals */
				int srcx = x ^ flipmask;
				if (skew)
				{
					/* position within source row is a two-stage addition */
					/* first stage is HF plus half the VF, done by the 2 4-bit */
					/* adders at U53, U54 */
					srcx += ((vf >> 1) ^ 0xff) + 1;

					/* second stage is first stage plus a constant based on the flip */
					/* value is 0x40 for non-flipped, or 0x38 for flipped */
					srcx += flipoffs;
				}

				/* store the pixel, offset by the color offset */
				dst[x] = src[srcx & xmask] + colorbase;
			}
		}
	}

	/* if not enabled, fill the background with black */
	else
		bitmap.fill(m_palette->black_pen(), cliprect);'};
MERGE (n:KG {id: 'handler:zaxxon_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon_v.cpp', sourceLine: 406, sourceColumn: 1, sourceEndLine: 430, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect, uint16_t flipxmask, uint16_t flipymask', sourceBody: 'uint8_t *spriteram = m_spriteram;
	gfx_element *gfx = m_gfxdecode->gfx(2);
	int flip = m_flip_screen;
	int flipmask = flip ? 0xff : 0x00;
	int offs;

	/* only the lower half of sprite RAM is read during rendering */
	for (offs = 0x7c; offs >= 0; offs -= 4)
	{
		int sy = find_minimum_y(spriteram[offs], flip);
		int flipy = (spriteram[offs + (flipymask >> 8)] ^ flipmask) & flipymask;
		int flipx = (spriteram[offs + (flipxmask >> 8)] ^ flipmask) & flipxmask;
		int code = spriteram[offs + 1];
		int color = (spriteram[offs + 2] & 0x1f) + (m_congo_color_bank << 5);
		int sx = find_minimum_x(spriteram[offs + 3], flip);

		/* draw with 256 pixel offsets to ensure we wrap properly */
			gfx->transpen(bitmap,cliprect, code, color, flipx, flipy, sx, sy, 0);
			gfx->transpen(bitmap,cliprect, code, color, flipx, flipy, sx, sy - 0x100, 0);
			gfx->transpen(bitmap,cliprect, code, color, flipx, flipy, sx - 0x100, sy, 0);
			gfx->transpen(bitmap,cliprect, code, color, flipx, flipy, sx - 0x100, sy - 0x100, 0);
	}'};
MERGE (n:KG {id: 'handler:zaxxon_state.find_minimum_y'}) SET n:Handler SET n += {method: 'find_minimum_y', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon_v.cpp', sourceLine: 361, sourceColumn: 1, sourceEndLine: 389, sourceParameters: 'uint8_t value, int flip', sourceBody: 'int flipmask = flip ? 0xff : 0x00;
	int flipconst = flip ? 0xef : 0xf1;
	int y;

	/* the sum of the Y position plus a constant based on the flip state */
	/* is added to the current flipped VF; if the top 3 bits are 1, we hit */

	/* first find a 16-pixel bucket where we hit */
	for (y = 0; y < 256; y += 16)
	{
		int sum = (value + flipconst + 1) + (y ^ flipmask);
		if ((sum & 0xe0) == 0xe0)
			break;
	}

	/* then scan backwards until we no longer match */
	while (1)
	{
		int sum = (value + flipconst + 1) + ((y - 1) ^ flipmask);
		if ((sum & 0xe0) != 0xe0)
			break;
		y--;
	}

	/* add one line since we draw sprites on the previous line */
	return (y + 1) & 0xff;'};
MERGE (n:KG {id: 'handler:zaxxon_state.find_minimum_x'}) SET n:Handler SET n += {method: 'find_minimum_x', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon_v.cpp', sourceLine: 392, sourceColumn: 1, sourceEndLine: 403, sourceParameters: 'uint8_t value, int flip', sourceBody: 'int flipmask = flip ? 0xff : 0x00;
	int x;

	/* the sum of the X position plus a constant specifies the address within */
	/* the line bufer; if we\'re flipped, we will write backwards */
	x = (value + 0xef + 1) ^ flipmask;
	if (flipmask)
		x -= 31;
	return x & 0xff;'};
MERGE (n:KG {id: 'device:zaxxon_state.root/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set', raw: 'screen.screen_vblank().set(FUNC(zaxxon_state::vblank_int))', ownerTag: 'screen', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 981, sourceColumn: 2, sourceEndLine: 981, targetClass: 'zaxxon_state', targetMethod: 'vblank_int'};
MERGE (n:KG {id: 'handler:zaxxon_state.vblank_int'}) SET n:Handler SET n += {method: 'vblank_int', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 306, sourceColumn: 1, sourceEndLine: 310, sourceParameters: 'int state', sourceBody: 'if (state && m_int_enabled)
		m_maincpu->set_input_line(0, ASSERT_LINE);'};
MERGE (n:KG {id: 'machine:zaxxon_state.zaxxon'}) SET n:MachineConfig SET n += {cls: 'zaxxon_state', name: 'zaxxon', calls: ['root', 'zaxxon_samples'], stateMembers: ['{"name":"m_int_enabled","bits":8}', '{"name":"m_coin_status","bits":8,"arrayLength":3}', '{"name":"m_sound_state","bits":8,"arrayLength":3}', '{"name":"m_bg_enable","bits":8}', '{"name":"m_bg_color","bits":8}', '{"name":"m_bg_position","bits":16}', '{"name":"m_fg_color","bits":8}', '{"name":"m_flip_screen","bits":1}', '{"name":"m_congo_fg_bank","bits":8}', '{"name":"m_congo_color_bank","bits":8}', '{"name":"m_congo_custom","bits":8,"arrayLength":4}'], startHandlers: ['zaxxon_state.video_start'], sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 985, sourceColumn: 1, sourceEndLine: 992};
MERGE (n:KG {id: 'device:zaxxon_state.zaxxon/speaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speaker', clock: null, config: ['SPEAKER(config, "speaker").front_center()'], sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 990, sourceColumn: 2, sourceEndLine: 990};
MERGE (n:KG {id: 'machine:zaxxon_state.zaxxon_samples'}) SET n:MachineConfig SET n += {cls: 'zaxxon_state', name: 'zaxxon_samples', calls: [], stateMembers: ['{"name":"m_int_enabled","bits":8}', '{"name":"m_coin_status","bits":8,"arrayLength":3}', '{"name":"m_sound_state","bits":8,"arrayLength":3}', '{"name":"m_bg_enable","bits":8}', '{"name":"m_bg_color","bits":8}', '{"name":"m_bg_position","bits":16}', '{"name":"m_fg_color","bits":8}', '{"name":"m_flip_screen","bits":1}', '{"name":"m_congo_fg_bank","bits":8}', '{"name":"m_congo_color_bank","bits":8}', '{"name":"m_congo_custom","bits":8,"arrayLength":4}'], startHandlers: ['zaxxon_state.video_start'], sourceFile: 'src/mame/sega/zaxxon_a.cpp', sourceLine: 95, sourceColumn: 1, sourceEndLine: 101};
MERGE (n:KG {id: 'device:zaxxon_state.zaxxon_samples/samples'}) SET n:Device SET n += {type: 'SAMPLES', tag: 'samples', clock: null, config: ['SAMPLES(config, m_samples)', 'm_samples->set_channels(12)', 'm_samples->set_samples_names(zaxxon_sample_names)', 'm_samples->add_route(ALL_OUTPUTS, "speaker", 0.25)'], sourceFile: 'src/mame/sega/zaxxon_a.cpp', sourceLine: 97, sourceColumn: 2, sourceEndLine: 97, configCalls: ['set_channels(12)']};
MERGE (n:KG {id: 'audioroute:device:zaxxon_state.zaxxon_samples/samples/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.25, raw: 'm_samples->add_route(ALL_OUTPUTS, "speaker", 0.25)', sourceFile: 'src/mame/sega/zaxxon_a.cpp', sourceLine: 100, sourceColumn: 2, sourceEndLine: 100};
MERGE (n:KG {id: 'inputs:zaxxon'}) SET n:InputPorts SET n += {name: 'zaxxon', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 543, sourceColumn: 8, sourceEndLine: 543};
MERGE (n:KG {id: 'inputs:zaxxon/SW00'}) SET n:Port SET n += {tag: 'SW00', modify: false};
MERGE (n:KG {id: 'inputs:zaxxon/SW00/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:zaxxon/SW00/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:zaxxon/SW00/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:zaxxon/SW00/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:zaxxon/SW00/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_BUTTON1', defaultValue: 0};
MERGE (n:KG {id: 'inputs:zaxxon/SW00/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 224, activeLow: false, type: 'IPT_UNUSED', defaultValue: 0};
MERGE (n:KG {id: 'inputs:zaxxon/SW01'}) SET n:Port SET n += {tag: 'SW01', modify: false};
MERGE (n:KG {id: 'inputs:zaxxon/SW01/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:zaxxon/SW01/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:zaxxon/SW01/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:zaxxon/SW01/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:zaxxon/SW01/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:zaxxon/SW01/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 224, activeLow: false, type: 'IPT_UNUSED', defaultValue: 0};
MERGE (n:KG {id: 'inputs:zaxxon/SW100'}) SET n:Port SET n += {tag: 'SW100', modify: false};
MERGE (n:KG {id: 'inputs:zaxxon/SW100/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 3, activeLow: false, type: 'IPT_UNUSED', defaultValue: 0};
MERGE (n:KG {id: 'inputs:zaxxon/SW100/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_START1', defaultValue: 0};
MERGE (n:KG {id: 'inputs:zaxxon/SW100/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_START2', defaultValue: 0};
MERGE (n:KG {id: 'inputs:zaxxon/SW100/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_UNUSED', defaultValue: 0};
MERGE (n:KG {id: 'inputs:zaxxon/SW100/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_MEMBER(FUNC(zaxxon_state::zaxxon_coin_r<0>))'], defaultValue: 0};
MERGE (n:KG {id: 'handler:zaxxon_state.zaxxon_coin_r_0'}) SET n:Handler SET n += {method: 'zaxxon_coin_r_0', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 439, sourceColumn: 1, sourceEndLine: 442, sourceConstants: ['Num=0'], sourceParameters: '', sourceBody: 'return m_coin_status[Num];'};
MERGE (n:KG {id: 'inputs:zaxxon/SW100/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_MEMBER(FUNC(zaxxon_state::zaxxon_coin_r<1>))'], defaultValue: 0};
MERGE (n:KG {id: 'handler:zaxxon_state.zaxxon_coin_r_1'}) SET n:Handler SET n += {method: 'zaxxon_coin_r_1', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 439, sourceColumn: 1, sourceEndLine: 442, sourceConstants: ['Num=1'], sourceParameters: '', sourceBody: 'return m_coin_status[Num];'};
MERGE (n:KG {id: 'inputs:zaxxon/SW100/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_MEMBER(FUNC(zaxxon_state::zaxxon_coin_r<2>))'], defaultValue: 0};
MERGE (n:KG {id: 'handler:zaxxon_state.zaxxon_coin_r_2'}) SET n:Handler SET n += {method: 'zaxxon_coin_r_2', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 439, sourceColumn: 1, sourceEndLine: 442, sourceConstants: ['Num=2'], sourceParameters: '', sourceBody: 'return m_coin_status[Num];'};
MERGE (n:KG {id: 'inputs:zaxxon/COIN'}) SET n:Port SET n += {tag: 'COIN', modify: false};
MERGE (n:KG {id: 'inputs:zaxxon/COIN/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_COIN1', modifiers: ['PORT_CHANGED_MEMBER(DEVICE_SELF, FUNC(zaxxon_state::zaxxon_coin_inserted), 0)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:zaxxon/COIN/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_COIN2', modifiers: ['PORT_CHANGED_MEMBER(DEVICE_SELF, FUNC(zaxxon_state::zaxxon_coin_inserted), 1)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:zaxxon/COIN/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_SERVICE1', modifiers: ['PORT_CHANGED_MEMBER(DEVICE_SELF, FUNC(zaxxon_state::zaxxon_coin_inserted), 2)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:zaxxon/SERVICESW'}) SET n:Port SET n += {tag: 'SERVICESW', modify: false};
MERGE (n:KG {id: 'inputs:zaxxon/SERVICESW/f0'}) SET n:PortField SET n += {kind: 'service', mask: 1, activeLow: false, defaultValue: 0};
MERGE (n:KG {id: 'inputs:zaxxon/DSW02'}) SET n:Port SET n += {tag: 'DSW02', modify: false};
MERGE (n:KG {id: 'inputs:zaxxon/DSW02/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SW1:!1,!2")'], name: 'Bonus Life', defaultValue: 3, location: 'SW1:!1,!2', settings: ['3=10000', '1=20000', '2=30000', '0=40000']};
MERGE (n:KG {id: 'inputs:zaxxon/DSW02/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 4, modifiers: ['PORT_DIPLOCATION("SW1:!3")'], name: 'Unused', defaultValue: 4, location: 'SW1:!3', settings: ['0=Off', '4=On']};
MERGE (n:KG {id: 'inputs:zaxxon/DSW02/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 8, modifiers: ['PORT_DIPLOCATION("SW1:!4")'], name: 'Unused', defaultValue: 8, location: 'SW1:!4', settings: ['0=Off', '8=On']};
MERGE (n:KG {id: 'inputs:zaxxon/DSW02/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 48, modifiers: ['PORT_DIPLOCATION("SW1:!5,!6")'], name: 'Lives', defaultValue: 48, location: 'SW1:!5,!6', settings: ['48=3', '16=4', '32=5', '0=Free Play']};
MERGE (n:KG {id: 'inputs:zaxxon/DSW02/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 64, modifiers: ['PORT_DIPLOCATION("SW1:!7")'], name: 'Sound', defaultValue: 64, location: 'SW1:!7', settings: ['0=Off', '64=On']};
MERGE (n:KG {id: 'inputs:zaxxon/DSW02/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("SW1:!8")'], name: 'Cabinet', defaultValue: 0, location: 'SW1:!8', settings: ['0=Upright', '128=Cocktail']};
MERGE (n:KG {id: 'inputs:zaxxon/DSW03'}) SET n:Port SET n += {tag: 'DSW03', modify: false};
MERGE (n:KG {id: 'inputs:zaxxon/DSW03/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 15, modifiers: ['PORT_DIPLOCATION("SW2:!1,!2,!3,!4")'], name: 'DEF_STR ( Coin_B )', defaultValue: 3, location: 'SW2:!1,!2,!3,!4', settings: ['15=DEF_STR ( 4C_1C )', '7=DEF_STR ( 3C_1C )', '11=DEF_STR ( 2C_1C )', '6=2C/1C 5C/3C 6C/4C', '10=2C/1C 3C/2C 4C/3C', '3=DEF_STR ( 1C_1C )', '2=1C/1C 5C/6C', '12=1C/1C 4C/5C', '4=1C/1C 2C/3C', '13=DEF_STR ( 1C_2C )', '8=1C/2C 5C/11C', '0=1C/2C 4C/9C', '5=DEF_STR ( 1C_3C )', '9=DEF_STR ( 1C_4C )', '1=DEF_STR ( 1C_5C )', '14=DEF_STR ( 1C_6C )']};
MERGE (n:KG {id: 'inputs:zaxxon/DSW03/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 240, modifiers: ['PORT_DIPLOCATION("SW2:!5,!6,!7,!8")'], name: 'DEF_STR ( Coin_A )', defaultValue: 48, location: 'SW2:!5,!6,!7,!8', settings: ['240=DEF_STR ( 4C_1C )', '112=DEF_STR ( 3C_1C )', '176=DEF_STR ( 2C_1C )', '96=2C/1C 5C/3C 6C/4C', '160=2C/1C 3C/2C 4C/3C', '48=DEF_STR ( 1C_1C )', '32=1C/1C 5C/6C', '192=1C/1C 4C/5C', '64=1C/1C 2C/3C', '208=DEF_STR ( 1C_2C )', '128=1C/2C 5C/11C', '0=1C/2C 4C/9C', '80=DEF_STR ( 1C_3C )', '144=DEF_STR ( 1C_4C )', '16=DEF_STR ( 1C_5C )', '224=DEF_STR ( 1C_6C )']};
MERGE (n:KG {id: 'gfxlayout:zaxxon_spritelayout'}) SET n:GfxLayout SET n += {name: 'zaxxon_spritelayout', width: 32, height: 32, total: 'RGN_FRAC(1,3)', planes: 3, planeOffsets: ['RGN_FRAC(2,3)', 'RGN_FRAC(1,3)', 'RGN_FRAC(0,3)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 64, 65, 66, 67, 68, 69, 70, 71, 128, 129, 130, 131, 132, 133, 134, 135, 192, 193, 194, 195, 196, 197, 198, 199], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 256, 264, 272, 280, 288, 296, 304, 312, 512, 520, 528, 536, 544, 552, 560, 568, 768, 776, 784, 792, 800, 808, 816, 824], charIncrement: 1024};
MERGE (n:KG {id: 'gfxlayout:gfx_8x8x2_planar'}) SET n:GfxLayout SET n += {name: 'gfx_8x8x2_planar', width: 8, height: 8, total: 'RGN_FRAC(1,2)', planes: 2, planeOffsets: ['RGN_FRAC(1,2)', 'RGN_FRAC(0,2)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxlayout:gfx_8x8x3_planar'}) SET n:GfxLayout SET n += {name: 'gfx_8x8x3_planar', width: 8, height: 8, total: 'RGN_FRAC(1,3)', planes: 3, planeOffsets: ['RGN_FRAC(2,3)', 'RGN_FRAC(1,3)', 'RGN_FRAC(0,3)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxdecode:gfx_zaxxon'}) SET n:GfxDecode SET n += {name: 'gfx_zaxxon', sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 932, sourceColumn: 8, sourceEndLine: 932};
MERGE (n:KG {id: 'gfxdecode:gfx_zaxxon/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx_tx', offset: 0, layout: 'gfx_8x8x2_planar', colorBase: 0, colorCount: 128, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_zaxxon/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx_bg', offset: 0, layout: 'gfx_8x8x3_planar', colorBase: 0, colorCount: 64, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_zaxxon/e2'}) SET n:GfxDecodeEntry SET n += {region: 'gfx_spr', offset: 0, layout: 'zaxxon_spritelayout', colorBase: 0, colorCount: 64, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'device:zaxxon_state.root/palette/callback:palette_init'}) SET n:Callback SET n += {signal: 'palette_init', operation: 'palette_init', raw: 'PALETTE(config, m_palette, FUNC(zaxxon_state::zaxxon_palette), 256)', ownerTag: 'palette', targetClass: 'zaxxon_state', targetMethod: 'zaxxon_palette', entries: 256, sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 975};
MERGE (n:KG {id: 'handler:zaxxon_state.zaxxon_palette'}) SET n:Handler SET n += {method: 'zaxxon_palette', ownerClass: 'zaxxon_state', sourceFile: 'src/mame/sega/zaxxon_v.cpp', sourceLine: 20, sourceColumn: 1, sourceEndLine: 59, sourceParameters: 'palette_device &palette', sourceBody: 'uint8_t const *const color_prom = memregion("proms")->base();
	

	// compute the color output resistor weights
	double rweights[3], gweights[3], bweights[2];
	compute_resistor_weights(0, 255, -1.0,
			3,  &TABLE(0, 1000, 470, 220), rweights, 470, 0,
			3,  &TABLE(0, 1000, 470, 220), gweights, 470, 0,
			2,  &TABLE(1, 1000, 470, 220), bweights, 470, 0);

	// initialize the palette with these colors
	for (int i = 0; i < palette.entries(); i++)
	{
		int bit0, bit1, bit2;

		// red component
		bit0 = BIT(color_prom[i], 0);
		bit1 = BIT(color_prom[i], 1);
		bit2 = BIT(color_prom[i], 2);
		int const r = combine_weights(rweights, bit0, bit1, bit2);

		// green component
		bit0 = BIT(color_prom[i], 3);
		bit1 = BIT(color_prom[i], 4);
		bit2 = BIT(color_prom[i], 5);
		int const g = combine_weights(gweights, bit0, bit1, bit2);

		// blue component
		bit0 = BIT(color_prom[i], 6);
		bit1 = BIT(color_prom[i], 7);
		int const b = combine_weights(bweights, bit0, bit1);

		palette.set_pen_color(i, rgb_t(r, g, b));
	}

	// color_prom now points to the beginning of the character color codes
	m_color_codes = &color_prom[256];'};
MATCH (a:KG {id: 'game:zaxxon'}), (b:KG {id: 'file:src/mame/sega/zaxxon.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1625, sourceColumn: 1, sourceEndLine: 1625};
MATCH (a:KG {id: 'game:zaxxon'}), (b:KG {id: 'machine:zaxxon_state.zaxxon'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:zaxxon'}), (b:KG {id: 'inputs:zaxxon'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:zaxxon'}), (b:KG {id: 'romset:zaxxon'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/zaxxon.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/zaxxon.cpp'}), (b:KG {id: 'file:zaxxon.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/zaxxon.cpp'}), (b:KG {id: 'file:segausb.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/zaxxon.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/zaxxon.cpp'}), (b:KG {id: 'file:machine/segacrpt_device.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/zaxxon.cpp'}), (b:KG {id: 'file:machine/gen_latch.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/zaxxon.cpp'}), (b:KG {id: 'file:machine/i8255.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/zaxxon.cpp'}), (b:KG {id: 'file:sound/samples.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/zaxxon.cpp'}), (b:KG {id: 'file:sound/sn76496.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/zaxxon.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/zaxxon.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:zaxxon_state.zaxxon'}), (b:KG {id: 'file:src/mame/sega/zaxxon.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 985, sourceColumn: 1, sourceEndLine: 992};
MATCH (a:KG {id: 'machine:zaxxon_state.zaxxon'}), (b:KG {id: 'handler:zaxxon_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:zaxxon_state.zaxxon'}), (b:KG {id: 'machine:zaxxon_state.root'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:zaxxon_state.zaxxon'}), (b:KG {id: 'machine:zaxxon_state.zaxxon_samples'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 1};
MATCH (a:KG {id: 'machine:zaxxon_state.zaxxon'}), (b:KG {id: 'device:zaxxon_state.zaxxon/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:zaxxon'}), (b:KG {id: 'file:src/mame/sega/zaxxon.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 543, sourceColumn: 8, sourceEndLine: 543};
MATCH (a:KG {id: 'inputs:zaxxon'}), (b:KG {id: 'inputs:zaxxon/SW00'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:zaxxon'}), (b:KG {id: 'inputs:zaxxon/SW01'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:zaxxon'}), (b:KG {id: 'inputs:zaxxon/SW100'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:zaxxon'}), (b:KG {id: 'inputs:zaxxon/COIN'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:zaxxon'}), (b:KG {id: 'inputs:zaxxon/SERVICESW'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:zaxxon'}), (b:KG {id: 'inputs:zaxxon/DSW02'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:zaxxon'}), (b:KG {id: 'inputs:zaxxon/DSW03'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:zaxxon'}), (b:KG {id: 'file:src/mame/sega/zaxxon.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 1126, sourceColumn: 1, sourceEndLine: 1126};
MATCH (a:KG {id: 'romset:zaxxon'}), (b:KG {id: 'region:zaxxon/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:zaxxon'}), (b:KG {id: 'region:zaxxon/gfx_tx'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:zaxxon'}), (b:KG {id: 'region:zaxxon/gfx_bg'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:zaxxon'}), (b:KG {id: 'region:zaxxon/gfx_spr'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:zaxxon'}), (b:KG {id: 'region:zaxxon/tilemap_dat'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:zaxxon'}), (b:KG {id: 'region:zaxxon/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:zaxxon_state.video_start'}), (b:KG {id: 'handler:zaxxon_state.video_start_common'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:zaxxon_state.video_start'}), (b:KG {id: 'handler:zaxxon_state.zaxxon_get_fg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:zaxxon_state.root'}), (b:KG {id: 'file:src/mame/sega/zaxxon.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 945, sourceColumn: 1, sourceEndLine: 982};
MATCH (a:KG {id: 'machine:zaxxon_state.root'}), (b:KG {id: 'handler:zaxxon_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:zaxxon_state.root'}), (b:KG {id: 'device:zaxxon_state.root/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:zaxxon_state.root'}), (b:KG {id: 'device:zaxxon_state.root/ppi8255'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:zaxxon_state.root'}), (b:KG {id: 'device:zaxxon_state.root/mainlatch1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:zaxxon_state.root'}), (b:KG {id: 'device:zaxxon_state.root/mainlatch2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:zaxxon_state.root'}), (b:KG {id: 'device:zaxxon_state.root/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:zaxxon_state.root'}), (b:KG {id: 'gfxdecode:gfx_zaxxon'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:zaxxon_state.root'}), (b:KG {id: 'device:zaxxon_state.root/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:zaxxon_state.root'}), (b:KG {id: 'device:zaxxon_state.root/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:zaxxon_state.zaxxon_samples'}), (b:KG {id: 'file:src/mame/sega/zaxxon_a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/zaxxon_a.cpp', sourceLine: 95, sourceColumn: 1, sourceEndLine: 101};
MATCH (a:KG {id: 'machine:zaxxon_state.zaxxon_samples'}), (b:KG {id: 'handler:zaxxon_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:zaxxon_state.zaxxon_samples'}), (b:KG {id: 'device:zaxxon_state.zaxxon_samples/samples'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/SW00'}), (b:KG {id: 'inputs:zaxxon/SW00/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/SW00'}), (b:KG {id: 'inputs:zaxxon/SW00/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/SW00'}), (b:KG {id: 'inputs:zaxxon/SW00/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/SW00'}), (b:KG {id: 'inputs:zaxxon/SW00/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/SW00'}), (b:KG {id: 'inputs:zaxxon/SW00/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/SW00'}), (b:KG {id: 'inputs:zaxxon/SW00/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/SW01'}), (b:KG {id: 'inputs:zaxxon/SW01/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/SW01'}), (b:KG {id: 'inputs:zaxxon/SW01/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/SW01'}), (b:KG {id: 'inputs:zaxxon/SW01/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/SW01'}), (b:KG {id: 'inputs:zaxxon/SW01/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/SW01'}), (b:KG {id: 'inputs:zaxxon/SW01/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/SW01'}), (b:KG {id: 'inputs:zaxxon/SW01/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/SW100'}), (b:KG {id: 'inputs:zaxxon/SW100/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/SW100'}), (b:KG {id: 'inputs:zaxxon/SW100/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/SW100'}), (b:KG {id: 'inputs:zaxxon/SW100/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/SW100'}), (b:KG {id: 'inputs:zaxxon/SW100/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/SW100'}), (b:KG {id: 'inputs:zaxxon/SW100/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/SW100'}), (b:KG {id: 'inputs:zaxxon/SW100/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/SW100'}), (b:KG {id: 'inputs:zaxxon/SW100/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/COIN'}), (b:KG {id: 'inputs:zaxxon/COIN/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/COIN'}), (b:KG {id: 'inputs:zaxxon/COIN/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/COIN'}), (b:KG {id: 'inputs:zaxxon/COIN/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/SERVICESW'}), (b:KG {id: 'inputs:zaxxon/SERVICESW/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/DSW02'}), (b:KG {id: 'inputs:zaxxon/DSW02/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/DSW02'}), (b:KG {id: 'inputs:zaxxon/DSW02/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/DSW02'}), (b:KG {id: 'inputs:zaxxon/DSW02/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/DSW02'}), (b:KG {id: 'inputs:zaxxon/DSW02/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/DSW02'}), (b:KG {id: 'inputs:zaxxon/DSW02/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/DSW02'}), (b:KG {id: 'inputs:zaxxon/DSW02/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/DSW03'}), (b:KG {id: 'inputs:zaxxon/DSW03/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/DSW03'}), (b:KG {id: 'inputs:zaxxon/DSW03/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:zaxxon/maincpu'}), (b:KG {id: 'rom:zaxxon/maincpu/zaxxon_rom3d.u27'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:zaxxon/maincpu'}), (b:KG {id: 'rom:zaxxon/maincpu/zaxxon_rom2d.u28'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:zaxxon/maincpu'}), (b:KG {id: 'rom:zaxxon/maincpu/zaxxon_rom1d.u29'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:zaxxon/gfx_tx'}), (b:KG {id: 'rom:zaxxon/gfx_tx/zaxxon_rom14.u68'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:zaxxon/gfx_tx'}), (b:KG {id: 'rom:zaxxon/gfx_tx/zaxxon_rom15.u69'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:zaxxon/gfx_bg'}), (b:KG {id: 'rom:zaxxon/gfx_bg/zaxxon_rom6.u113'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:zaxxon/gfx_bg'}), (b:KG {id: 'rom:zaxxon/gfx_bg/zaxxon_rom5.u112'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:zaxxon/gfx_bg'}), (b:KG {id: 'rom:zaxxon/gfx_bg/zaxxon_rom4.u111'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:zaxxon/gfx_spr'}), (b:KG {id: 'rom:zaxxon/gfx_spr/zaxxon_rom11.u77'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:zaxxon/gfx_spr'}), (b:KG {id: 'rom:zaxxon/gfx_spr/zaxxon_rom12.u78'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:zaxxon/gfx_spr'}), (b:KG {id: 'rom:zaxxon/gfx_spr/zaxxon_rom13.u79'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:zaxxon/tilemap_dat'}), (b:KG {id: 'rom:zaxxon/tilemap_dat/zaxxon_rom8.u91'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:zaxxon/tilemap_dat'}), (b:KG {id: 'rom:zaxxon/tilemap_dat/zaxxon_rom7.u90'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:zaxxon/tilemap_dat'}), (b:KG {id: 'rom:zaxxon/tilemap_dat/zaxxon_rom10.u93'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:zaxxon/tilemap_dat'}), (b:KG {id: 'rom:zaxxon/tilemap_dat/zaxxon_rom9.u92'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:zaxxon/proms'}), (b:KG {id: 'rom:zaxxon/proms/mro16.u76'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:zaxxon/proms'}), (b:KG {id: 'rom:zaxxon/proms/zaxxon.u72'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'handler:zaxxon_state.video_start_common'}), (b:KG {id: 'handler:zaxxon_state.get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/maincpu'}), (b:KG {id: 'map:zaxxon_state.zaxxon_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:zaxxon_state.root/ppi8255'}), (b:KG {id: 'device:zaxxon_state.root/ppi8255/callback:ppi8255:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/ppi8255'}), (b:KG {id: 'device:zaxxon_state.root/ppi8255/callback:ppi8255:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/ppi8255'}), (b:KG {id: 'device:zaxxon_state.root/ppi8255/callback:ppi8255:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/mainlatch1'}), (b:KG {id: 'device:zaxxon_state.root/mainlatch1/callback:mainlatch1:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/mainlatch1'}), (b:KG {id: 'device:zaxxon_state.root/mainlatch1/callback:mainlatch1:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/mainlatch1'}), (b:KG {id: 'device:zaxxon_state.root/mainlatch1/callback:mainlatch1:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/mainlatch1'}), (b:KG {id: 'device:zaxxon_state.root/mainlatch1/callback:mainlatch1:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/mainlatch1'}), (b:KG {id: 'device:zaxxon_state.root/mainlatch1/callback:mainlatch1:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/mainlatch1'}), (b:KG {id: 'device:zaxxon_state.root/mainlatch1/callback:mainlatch1:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/mainlatch2'}), (b:KG {id: 'device:zaxxon_state.root/mainlatch2/callback:mainlatch2:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/mainlatch2'}), (b:KG {id: 'device:zaxxon_state.root/mainlatch2/callback:mainlatch2:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/mainlatch2'}), (b:KG {id: 'device:zaxxon_state.root/mainlatch2/callback:mainlatch2:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/mainlatch2'}), (b:KG {id: 'device:zaxxon_state.root/mainlatch2/callback:mainlatch2:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_zaxxon'}), (b:KG {id: 'file:src/mame/sega/zaxxon.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 932, sourceColumn: 8, sourceEndLine: 932};
MATCH (a:KG {id: 'gfxdecode:gfx_zaxxon'}), (b:KG {id: 'gfxdecode:gfx_zaxxon/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_zaxxon'}), (b:KG {id: 'gfxdecode:gfx_zaxxon/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_zaxxon'}), (b:KG {id: 'gfxdecode:gfx_zaxxon/e2'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/palette'}), (b:KG {id: 'device:zaxxon_state.root/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/screen'}), (b:KG {id: 'device:zaxxon_state.root/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/screen'}), (b:KG {id: 'device:zaxxon_state.root/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/zaxxon_a.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/zaxxon_a.cpp'}), (b:KG {id: 'file:sound/samples.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/zaxxon_a.cpp'}), (b:KG {id: 'file:zaxxon.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.zaxxon_samples/samples'}), (b:KG {id: 'audioroute:device:zaxxon_state.zaxxon_samples/samples/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/SW100/f4'}), (b:KG {id: 'handler:zaxxon_state.zaxxon_coin_r_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/SW100/f5'}), (b:KG {id: 'handler:zaxxon_state.zaxxon_coin_r_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:zaxxon/SW100/f6'}), (b:KG {id: 'handler:zaxxon_state.zaxxon_coin_r_2'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:zaxxon_state.zaxxon_map'}), (b:KG {id: 'file:src/mame/sega/zaxxon.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/zaxxon.cpp', sourceLine: 453, sourceColumn: 1, sourceEndLine: 467};
MATCH (a:KG {id: 'map:zaxxon_state.zaxxon_map'}), (b:KG {id: 'map:zaxxon_state.zaxxon_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zaxxon_state.zaxxon_map'}), (b:KG {id: 'map:zaxxon_state.zaxxon_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zaxxon_state.zaxxon_map'}), (b:KG {id: 'map:zaxxon_state.zaxxon_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zaxxon_state.zaxxon_map'}), (b:KG {id: 'map:zaxxon_state.zaxxon_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zaxxon_state.zaxxon_map'}), (b:KG {id: 'map:zaxxon_state.zaxxon_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zaxxon_state.zaxxon_map'}), (b:KG {id: 'map:zaxxon_state.zaxxon_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zaxxon_state.zaxxon_map'}), (b:KG {id: 'map:zaxxon_state.zaxxon_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zaxxon_state.zaxxon_map'}), (b:KG {id: 'map:zaxxon_state.zaxxon_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zaxxon_state.zaxxon_map'}), (b:KG {id: 'map:zaxxon_state.zaxxon_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zaxxon_state.zaxxon_map'}), (b:KG {id: 'map:zaxxon_state.zaxxon_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zaxxon_state.zaxxon_map'}), (b:KG {id: 'map:zaxxon_state.zaxxon_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zaxxon_state.zaxxon_map'}), (b:KG {id: 'map:zaxxon_state.zaxxon_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/ppi8255/callback:ppi8255:0'}), (b:KG {id: 'handler:zaxxon_state.zaxxon_sound_a_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/ppi8255/callback:ppi8255:1'}), (b:KG {id: 'handler:zaxxon_state.zaxxon_sound_b_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/ppi8255/callback:ppi8255:2'}), (b:KG {id: 'handler:zaxxon_state.zaxxon_sound_c_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/mainlatch1/callback:mainlatch1:0'}), (b:KG {id: 'handler:zaxxon_state.coin_enable_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/mainlatch1/callback:mainlatch1:1'}), (b:KG {id: 'handler:zaxxon_state.coin_enable_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/mainlatch1/callback:mainlatch1:2'}), (b:KG {id: 'handler:zaxxon_state.coin_enable_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/mainlatch1/callback:mainlatch1:3'}), (b:KG {id: 'handler:zaxxon_state.coin_counter_a_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/mainlatch1/callback:mainlatch1:4'}), (b:KG {id: 'handler:zaxxon_state.coin_counter_b_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/mainlatch1/callback:mainlatch1:5'}), (b:KG {id: 'handler:zaxxon_state.flipscreen_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/mainlatch2/callback:mainlatch2:0'}), (b:KG {id: 'handler:zaxxon_state.int_enable_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/mainlatch2/callback:mainlatch2:1'}), (b:KG {id: 'handler:zaxxon_state.fg_color_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/mainlatch2/callback:mainlatch2:2'}), (b:KG {id: 'handler:zaxxon_state.bg_color_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/mainlatch2/callback:mainlatch2:3'}), (b:KG {id: 'handler:zaxxon_state.bg_enable_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_zaxxon/e0'}), (b:KG {id: 'gfxlayout:gfx_8x8x2_planar'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_zaxxon/e1'}), (b:KG {id: 'gfxlayout:gfx_8x8x3_planar'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_zaxxon/e2'}), (b:KG {id: 'gfxlayout:zaxxon_spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/palette/callback:palette_init'}), (b:KG {id: 'handler:zaxxon_state.zaxxon_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/screen/callback:screen:0'}), (b:KG {id: 'handler:zaxxon_state.screen_update_zaxxon'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:zaxxon_state.root/screen/callback:screen:1'}), (b:KG {id: 'handler:zaxxon_state.vblank_int'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:zaxxon_state.zaxxon_map/range2'}), (b:KG {id: 'handler:zaxxon_state.zaxxon_videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:zaxxon_state.zaxxon_map/range9'}), (b:KG {id: 'handler:ls259_device.write_d0'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'mainlatch1'};
MATCH (a:KG {id: 'map:zaxxon_state.zaxxon_map/range10'}), (b:KG {id: 'handler:i8255_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ppi8255'};
MATCH (a:KG {id: 'map:zaxxon_state.zaxxon_map/range10'}), (b:KG {id: 'handler:i8255_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ppi8255'};
MATCH (a:KG {id: 'map:zaxxon_state.zaxxon_map/range11'}), (b:KG {id: 'handler:zaxxon_state.zaxxon_control_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'gfxlayout:gfx_8x8x2_planar'}), (b:KG {id: 'file:src/mame/sega/zaxxon.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:gfx_8x8x3_planar'}), (b:KG {id: 'file:src/mame/sega/zaxxon.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:zaxxon_spritelayout'}), (b:KG {id: 'file:src/mame/sega/zaxxon.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'handler:zaxxon_state.screen_update_zaxxon'}), (b:KG {id: 'handler:zaxxon_state.draw_background'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:zaxxon_state.screen_update_zaxxon'}), (b:KG {id: 'handler:zaxxon_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:zaxxon_state.zaxxon_control_w'}), (b:KG {id: 'handler:zaxxon_state.bg_position_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:zaxxon_state.draw_sprites'}), (b:KG {id: 'handler:zaxxon_state.find_minimum_y'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:zaxxon_state.draw_sprites'}), (b:KG {id: 'handler:zaxxon_state.find_minimum_x'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
