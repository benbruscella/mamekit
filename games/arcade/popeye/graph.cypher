// mamekit knowledge graph — driver src/mame/nintendo/popeye.cpp
// generated 2026-08-22T05:52:41.108Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/nintendo/popeye.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/nintendo/popeye.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:popeye.h'}) SET n:SourceFile SET n += {path: 'popeye.h', external: true};
MERGE (n:KG {id: 'file:machine/eepromser.h'}) SET n:SourceFile SET n += {path: 'machine/eepromser.h', external: true};
MERGE (n:KG {id: 'file:machine/netlist.h'}) SET n:SourceFile SET n += {path: 'machine/netlist.h', external: true};
MERGE (n:KG {id: 'file:netlist/devices/net_lib.h'}) SET n:SourceFile SET n += {path: 'netlist/devices/net_lib.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:nl_popeye.h'}) SET n:SourceFile SET n += {path: 'nl_popeye.h', external: true};
MERGE (n:KG {id: 'game:popeye'}) SET n:Game SET n += {name: 'popeye', year: '1982', company: 'Nintendo', fullname: 'Popeye (revision D)', monitor: 'ROT0', cls: 'tpp2_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 926, sourceColumn: 1, sourceEndLine: 926};
MERGE (n:KG {id: 'romset:popeye'}) SET n:RomSet SET n += {name: 'popeye', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 647, sourceColumn: 1, sourceEndLine: 647};
MERGE (n:KG {id: 'region:popeye/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 32768, flags: '0', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 609, sourceColumn: 2, sourceEndLine: 609};
MERGE (n:KG {id: 'rom:popeye/maincpu/tpp2-c.7a'}) SET n:Rom SET n += {file: 'tpp2-c.7a', offset: 0, size: 8192, crc: '9af7c821', sha1: '592acfe221b5c3bd9b920f639b141f37a56d6997', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 649, sourceColumn: 2, sourceEndLine: 649};
MERGE (n:KG {id: 'rom:popeye/maincpu/tpp2-c.7b'}) SET n:Rom SET n += {file: 'tpp2-c.7b', offset: 8192, size: 8192, crc: 'c3704958', sha1: 'af96d10fa9bdb86b00c89d10f67cb5ca5586f446', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 650, sourceColumn: 2, sourceEndLine: 650};
MERGE (n:KG {id: 'rom:popeye/maincpu/tpp2-c.7c'}) SET n:Rom SET n += {file: 'tpp2-c.7c', offset: 16384, size: 8192, crc: '5882ebf9', sha1: '5531229b37f9ba0ede7fdc24909e3c3efbc8ade4', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 651, sourceColumn: 2, sourceEndLine: 651};
MERGE (n:KG {id: 'rom:popeye/maincpu/tpp2-c.7e'}) SET n:Rom SET n += {file: 'tpp2-c.7e', offset: 24576, size: 8192, crc: 'ef8649ca', sha1: 'a0157f91600e56e2a953dadbd76da4330652e5c8', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 652, sourceColumn: 2, sourceEndLine: 652};
MERGE (n:KG {id: 'region:popeye/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 2048, flags: '0', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 619, sourceColumn: 2, sourceEndLine: 619};
MERGE (n:KG {id: 'rom:popeye/gfx1/tpp2-v.5n'}) SET n:Rom SET n += {file: 'tpp2-v.5n', offset: 0, size: 2048, crc: 'cca61ddd', sha1: '239f87947c3cc8c6693c295ebf5ea0b7638b781c', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 655, sourceColumn: 2, sourceEndLine: 655, continueSegments: [0, 2048, 2048]};
MERGE (n:KG {id: 'region:popeye/gfx2'}) SET n:RomRegion SET n += {tag: 'gfx2', size: 32768, flags: '0', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 622, sourceColumn: 2, sourceEndLine: 622};
MERGE (n:KG {id: 'rom:popeye/gfx2/tpp2-v.1e'}) SET n:Rom SET n += {file: 'tpp2-v.1e', offset: 0, size: 8192, crc: '0f2cd853', sha1: '426c9b4f6579bfcebe72b976bfe4f05147d53f96', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 659, sourceColumn: 2, sourceEndLine: 659};
MERGE (n:KG {id: 'rom:popeye/gfx2/tpp2-v.1f'}) SET n:Rom SET n += {file: 'tpp2-v.1f', offset: 8192, size: 8192, crc: '888f3474', sha1: 'ddee56b2b49bd50aaf9c98d8ef6e905e3f6ab859', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 660, sourceColumn: 2, sourceEndLine: 660};
MERGE (n:KG {id: 'rom:popeye/gfx2/tpp2-v.1j'}) SET n:Rom SET n += {file: 'tpp2-v.1j', offset: 16384, size: 8192, crc: '7e864668', sha1: '8e275dbb1c586f4ebca7548db05246ef0f56d7b1', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 661, sourceColumn: 2, sourceEndLine: 661};
MERGE (n:KG {id: 'rom:popeye/gfx2/tpp2-v.1k'}) SET n:Rom SET n += {file: 'tpp2-v.1k', offset: 24576, size: 8192, crc: '49e1d170', sha1: 'bd51a4e34ce8109f26954760156e3cf05fb9db57', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 662, sourceColumn: 2, sourceEndLine: 662};
MERGE (n:KG {id: 'region:popeye/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 64, flags: '0', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 628, sourceColumn: 2, sourceEndLine: 628};
MERGE (n:KG {id: 'rom:popeye/proms/tpp2-c.4a'}) SET n:Rom SET n += {file: 'tpp2-c.4a', offset: 0, size: 32, crc: '375e1602', sha1: 'd84159a0af5db577821c43712bc733329a43af80', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 665, sourceColumn: 2, sourceEndLine: 665};
MERGE (n:KG {id: 'rom:popeye/proms/tpp2-c.3a'}) SET n:Rom SET n += {file: 'tpp2-c.3a', offset: 32, size: 32, crc: 'e950bea1', sha1: '0b48082fe79d9fcdca7e80caff1725713d0c3163', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 666, sourceColumn: 2, sourceEndLine: 666};
MERGE (n:KG {id: 'region:popeye/sprpal'}) SET n:RomRegion SET n += {tag: 'sprpal', size: 256, flags: '0', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 632, sourceColumn: 2, sourceEndLine: 632};
MERGE (n:KG {id: 'rom:popeye/sprpal/tpp2-c.5b'}) SET n:Rom SET n += {file: 'tpp2-c.5b', offset: 0, size: 256, crc: 'c5826883', sha1: 'f2c4d3473b3bfa55bffad003dc1fd79540e7e0d1', nibbleShift: 0};
MERGE (n:KG {id: 'rom:popeye/sprpal/tpp2-c.5a'}) SET n:Rom SET n += {file: 'tpp2-c.5a', offset: 0, size: 256, crc: 'c576afba', sha1: '013c8e8db08a03c7ba156cfefa671d26155fe835', nibbleShift: 4};
MERGE (n:KG {id: 'region:popeye/timing'}) SET n:RomRegion SET n += {tag: 'timing', size: 256, flags: '0', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 636, sourceColumn: 2, sourceEndLine: 636};
MERGE (n:KG {id: 'rom:popeye/timing/tpp2-v.7j'}) SET n:Rom SET n += {file: 'tpp2-v.7j', offset: 0, size: 256, crc: 'a4655e2e', sha1: '2a620932fccb763c6c667278c0914f31b9f00ddf', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 673, sourceColumn: 2, sourceEndLine: 673};
MERGE (n:KG {id: 'map:tnx1_state.maincpu_common_map'}) SET n:AddressMap SET n += {cls: 'tnx1_state', name: 'maincpu_common_map', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 175, sourceColumn: 1, sourceEndLine: 184};
MERGE (n:KG {id: 'map:tnx1_state.maincpu_common_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom().region("maincpu",0)', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 177, sourceColumn: 2, sourceEndLine: 177, rom: true, region: 'maincpu', regionOffset: 0};
MERGE (n:KG {id: 'map:tnx1_state.maincpu_common_map/range1'}) SET n:AddressRange SET n += {start: 35840, end: 36479, raw: 'map(0x8c00, 0x8e7f).ram().share("dmasource")', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 178, sourceColumn: 2, sourceEndLine: 178, ram: true, share: 'dmasource'};
MERGE (n:KG {id: 'map:tnx1_state.maincpu_common_map/range2'}) SET n:AddressRange SET n += {start: 36480, end: 36863, raw: 'map(0x8e80, 0x8fff).ram().share("ramhigh")', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 179, sourceColumn: 2, sourceEndLine: 179, ram: true, share: 'ramhigh'};
MERGE (n:KG {id: 'map:tnx1_state.maincpu_common_map/range3'}) SET n:AddressRange SET n += {start: 40960, end: 41983, raw: 'map(0xa000, 0xa3ff).w(FUNC(tnx1_state::popeye_videoram_w)).share("videoram")', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 180, sourceColumn: 2, sourceEndLine: 180, share: 'videoram'};
MERGE (n:KG {id: 'handler:tnx1_state.popeye_videoram_w'}) SET n:Handler SET n += {method: 'popeye_videoram_w', ownerClass: 'tnx1_state', sourceFile: 'src/mame/nintendo/popeye_v.cpp', sourceLine: 206, sourceColumn: 1, sourceEndLine: 210, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[offset] = data;
	m_fg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:tnx1_state.maincpu_common_map/range4'}) SET n:AddressRange SET n += {start: 41984, end: 43007, raw: 'map(0xa400, 0xa7ff).w(FUNC(tnx1_state::popeye_colorram_w)).share("colorram")', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 181, sourceColumn: 2, sourceEndLine: 181, share: 'colorram'};
MERGE (n:KG {id: 'handler:tnx1_state.popeye_colorram_w'}) SET n:Handler SET n += {method: 'popeye_colorram_w', ownerClass: 'tnx1_state', sourceFile: 'src/mame/nintendo/popeye_v.cpp', sourceLine: 212, sourceColumn: 1, sourceEndLine: 216, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_colorram[offset] = data;
	m_fg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:tnx1_state.maincpu_common_map/range5'}) SET n:AddressRange SET n += {start: 49152, end: 53247, raw: 'map(0xc000, 0xcfff).w(FUNC(tnx1_state::background_w))', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 182, sourceColumn: 2, sourceEndLine: 182};
MERGE (n:KG {id: 'handler:tnx1_state.background_w'}) SET n:Handler SET n += {method: 'background_w', ownerClass: 'tnx1_state', sourceFile: 'src/mame/nintendo/popeye_v.cpp', sourceLine: 193, sourceColumn: 1, sourceEndLine: 197, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'int shift = BIT(data, 7) ? 4 : 0;
	m_background_ram[offset] = (m_background_ram[offset] & ~(0x0f << shift)) | ((data & 0xf) << shift);'};
MERGE (n:KG {id: 'map:tnx1_state.maincpu_common_map/range6'}) SET n:AddressRange SET n += {start: 57344, end: 57345, raw: 'map(0xe000, 0xe001).rw(FUNC(tnx1_state::protection_r), FUNC(tnx1_state::protection_w))', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 183, sourceColumn: 2, sourceEndLine: 183};
MERGE (n:KG {id: 'handler:tnx1_state.protection_r'}) SET n:Handler SET n += {method: 'protection_r', ownerClass: 'tnx1_state', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 147, sourceColumn: 1, sourceEndLine: 158, sourceParameters: 'offs_t offset', sourceBody: 'if (offset == 0)
	{
		return ((m_prot1 << m_prot_shift) | (m_prot0 >> (8-m_prot_shift))) & 0xff;
	}
	else    /* offset == 1 */
	{
		/* the game just checks if bit 2 is clear. Returning 0 seems to be enough. */
		return 0;
	}'};
MERGE (n:KG {id: 'handler:tnx1_state.protection_w'}) SET n:Handler SET n += {method: 'protection_w', ownerClass: 'tnx1_state', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 160, sourceColumn: 1, sourceEndLine: 172, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'if (offset == 0)
	{
		/* this is the same as the level number (1-3) */
		m_prot_shift = data & 0x07;
	}
	else    /* offset == 1 */
	{
		m_prot0 = m_prot1;
		m_prot1 = data;
	}'};
MERGE (n:KG {id: 'map:tnx1_state.maincpu_program_map'}) SET n:AddressMap SET n += {cls: 'tnx1_state', name: 'maincpu_program_map', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 186, sourceColumn: 1, sourceEndLine: 191, calls: ['maincpu_common_map']};
MERGE (n:KG {id: 'map:tnx1_state.maincpu_program_map/range0'}) SET n:AddressRange SET n += {start: 32768, end: 34815, raw: 'map(0x8000, 0x87ff).ram().share("ramlow")', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 189, sourceColumn: 2, sourceEndLine: 189, ram: true, share: 'ramlow'};
MERGE (n:KG {id: 'map:tnx1_state.maincpu_program_map/range1'}) SET n:AddressRange SET n += {start: 34816, end: 35839, raw: 'map(0x8800, 0x8bff).nopw()', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 190, sourceColumn: 2, sourceEndLine: 190, nopw: true};
MERGE (n:KG {id: 'map:tpp2_state.maincpu_program_map'}) SET n:AddressMap SET n += {cls: 'tpp2_state', name: 'maincpu_program_map', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 193, sourceColumn: 1, sourceEndLine: 199, calls: ['maincpu_common_map']};
MERGE (n:KG {id: 'map:tpp2_state.maincpu_program_map/range0'}) SET n:AddressRange SET n += {start: 34816, end: 35839, raw: 'map(0x8800, 0x8bff).ram().share("ramlow")', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 197, sourceColumn: 2, sourceEndLine: 197, ram: true, share: 'ramlow'};
MERGE (n:KG {id: 'map:tpp2_state.maincpu_program_map/range1'}) SET n:AddressRange SET n += {start: 49152, end: 57343, raw: 'map(0xc000, 0xdfff).w(FUNC(tpp2_state::background_w))', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 198, sourceColumn: 2, sourceEndLine: 198};
MERGE (n:KG {id: 'handler:tpp2_state.background_w'}) SET n:Handler SET n += {method: 'background_w', ownerClass: 'tpp2_state', sourceFile: 'src/mame/nintendo/popeye_v.cpp', sourceLine: 199, sourceColumn: 1, sourceEndLine: 204, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'int shift = BIT(offset, 12) ? 4 : 0;
	offset = BIT(offset, 0, 12);
	m_background_ram[offset] = (m_background_ram[offset] & ~(0x0f << shift)) | ((data & 0xf) << shift);'};
MERGE (n:KG {id: 'map:tnx1_state.maincpu_io_map'}) SET n:AddressMap SET n += {cls: 'tnx1_state', name: 'maincpu_io_map', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 219, sourceColumn: 1, sourceEndLine: 227, globalMask: 255};
MERGE (n:KG {id: 'map:tnx1_state.maincpu_io_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 1, raw: 'map(0x00, 0x01).w("aysnd", FUNC(ay8910_device::address_data_w))', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 222, sourceColumn: 2, sourceEndLine: 222};
MERGE (n:KG {id: 'handler:ay8910_device.address_data_w'}) SET n:Handler SET n += {method: 'address_data_w', ownerClass: 'ay8910_device', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 222, sourceColumn: 2, sourceEndLine: 222};
MERGE (n:KG {id: 'map:tnx1_state.maincpu_io_map/range1'}) SET n:AddressRange SET n += {start: 0, end: 0, raw: 'map(0x00, 0x00).portr("P1")', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 223, sourceColumn: 2, sourceEndLine: 223, portRead: 'P1'};
MERGE (n:KG {id: 'map:tnx1_state.maincpu_io_map/range2'}) SET n:AddressRange SET n += {start: 1, end: 1, raw: 'map(0x01, 0x01).portr("P2")', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 224, sourceColumn: 2, sourceEndLine: 224, portRead: 'P2'};
MERGE (n:KG {id: 'map:tnx1_state.maincpu_io_map/range3'}) SET n:AddressRange SET n += {start: 2, end: 2, raw: 'map(0x02, 0x02).portr("SYSTEM")', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 225, sourceColumn: 2, sourceEndLine: 225, portRead: 'SYSTEM'};
MERGE (n:KG {id: 'map:tnx1_state.maincpu_io_map/range4'}) SET n:AddressRange SET n += {start: 3, end: 3, raw: 'map(0x03, 0x03).r("aysnd", FUNC(ay8910_device::data_r))', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 226, sourceColumn: 2, sourceEndLine: 226};
MERGE (n:KG {id: 'handler:ay8910_device.data_r'}) SET n:Handler SET n += {method: 'data_r', ownerClass: 'ay8910_device', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 226, sourceColumn: 2, sourceEndLine: 226};
MERGE (n:KG {id: 'machine:tnx1_state.config'}) SET n:MachineConfig SET n += {cls: 'tnx1_state', name: 'config', calls: [], startHandlers: ['tnx1_state.video_start'], sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 538, sourceColumn: 1, sourceEndLine: 567};
MERGE (n:KG {id: 'handler:tnx1_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'tnx1_state', sourceFile: 'src/mame/nintendo/popeye_v.cpp', sourceLine: 226, sourceColumn: 1, sourceEndLine: 247, sourceParameters: '', sourceBody: 'm_background_ram.resize(0x1000);
	m_sprite_ram.resize(0x400);

	m_sprite_bitmap = std::make_unique<bitmap_ind16>(512, 512);

	m_fg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(tnx1_state::get_fg_tile_info)), TILEMAP_SCAN_ROWS, 16, 16, 32, 32);
	m_fg_tilemap->set_transparent_pen(0);

	m_bitmap[0].resize(512, 512);
	m_bitmap[1].resize(512, 512);

	m_field = 0;

	save_item(NAME(m_field));
	save_item(NAME(m_palette_bank));
	save_item(NAME(m_palette_bank_cache));
	save_item(NAME(m_background_ram));
	save_item(NAME(m_background_scroll));
	save_item(NAME(m_sprite_ram));'};
MERGE (n:KG {id: 'handler:tnx1_state.get_fg_tile_info'}) SET n:Handler SET n += {method: 'get_fg_tile_info', ownerClass: 'tnx1_state', sourceFile: 'src/mame/nintendo/popeye_v.cpp', sourceLine: 218, sourceColumn: 1, sourceEndLine: 224, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int code = m_videoram[tile_index];
	int color = m_colorram[tile_index] & 0x0f;

	tileinfo.set(0, code, color, 0);'};
MERGE (n:KG {id: 'device:tnx1_state.config/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 4000000, config: ['Z80(config, m_maincpu, XTAL(8\'000\'000)/2)', 'm_maincpu->set_addrmap(AS_PROGRAM, &tnx1_state::maincpu_program_map)', 'm_maincpu->set_addrmap(AS_IO, &tnx1_state::maincpu_io_map)', 'm_maincpu->refresh_cb().set(FUNC(tnx1_state::refresh_w))'], sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 541, sourceColumn: 2, sourceEndLine: 541};
MERGE (n:KG {id: 'device:tnx1_state.config/maincpu/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'refresh_cb', operation: 'set', raw: 'm_maincpu->refresh_cb().set(FUNC(tnx1_state::refresh_w))', ownerTag: 'maincpu', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 544, sourceColumn: 2, sourceEndLine: 544, targetClass: 'tnx1_state', targetMethod: 'refresh_w'};
MERGE (n:KG {id: 'handler:tnx1_state.refresh_w'}) SET n:Handler SET n += {method: 'refresh_w', ownerClass: 'tnx1_state', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 88, sourceColumn: 1, sourceEndLine: 98, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'const bool nmi_enabled = ((offset >> 8) & 1) != 0;
	if (m_nmi_enabled != nmi_enabled)
	{
		m_nmi_enabled = nmi_enabled;

		if (!m_nmi_enabled)
			m_maincpu->set_input_line(INPUT_LINE_NMI, CLEAR_LINE);
	}'};
MERGE (n:KG {id: 'device:tnx1_state.config/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_refresh_hz(59.94)', 'm_screen->set_vblank_time(ATTOSECONDS_IN_USEC(0))', 'm_screen->set_size(32*16, 32*16)', 'm_screen->set_visarea(0*16, 32*16-1, 2*16, 30*16-1)', 'm_screen->set_palette(m_palette)', 'm_screen->set_screen_update(FUNC(tnx1_state::screen_update))', 'm_screen->screen_vblank().set(FUNC(tnx1_state::screen_vblank))'], sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 548, sourceColumn: 2, sourceEndLine: 548, configCalls: ['set_refresh_hz(59.94)', 'set_size(512,512)', 'set_visarea(0,511,32,479)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRefreshHz: 59.94, screenSize: [512, 512], screenVisarea: [0, 511, 32, 479]};
MERGE (n:KG {id: 'device:tnx1_state.config/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(tnx1_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 554, sourceColumn: 2, sourceEndLine: 554, targetClass: 'tnx1_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:tnx1_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'tnx1_state', sourceFile: 'src/mame/nintendo/popeye_v.cpp', sourceLine: 399, sourceColumn: 1, sourceEndLine: 434, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'const auto ilmode(m_io_mconf->read());
	bitmap_ind16 &bm((ilmode == 0) ? bitmap : m_bitmap[m_field]);

	update_palette();
	draw_background(bm, cliprect);
	draw_sprites(bm, cliprect);
	m_fg_tilemap->draw(screen, bm, cliprect, 0, 0);
	if (ilmode == 1)
	{
		for (int y=(cliprect.min_y); y<=cliprect.max_y; y ++)
		{
			if ((y & 1) == m_field)
				for (int x=cliprect.min_x; x<=cliprect.max_x; x++)
					bitmap.pix(y, x) = 0;
			else
				for (int x=cliprect.min_x; x<=cliprect.max_x; x++)
					bitmap.pix(y, x) = bm.pix(y, x);
		}
	}
	else if (ilmode == 2)
	{
		for (int y=(cliprect.min_y); y<=cliprect.max_y; y ++)
		{
			auto &bm_last(m_bitmap[m_field ^ 1]);
			if ((y & 1) == m_field)
				for (int x=cliprect.min_x; x<=cliprect.max_x; x++)
					bitmap.pix(y, x) = bm_last.pix(y, x);
			else
				for (int x=cliprect.min_x; x<=cliprect.max_x; x++)
					bitmap.pix(y, x) = bm.pix(y, x);
		}
	}
	return 0;', inputMembers: ['m_io_mconf=MCONF']};
MERGE (n:KG {id: 'handler:tnx1_state.update_palette'}) SET n:Handler SET n += {method: 'update_palette', ownerClass: 'tnx1_state', sourceFile: 'src/mame/nintendo/popeye_v.cpp', sourceLine: 153, sourceColumn: 1, sourceEndLine: 191, sourceParameters: '', sourceBody: 'if ((m_palette_bank ^ m_palette_bank_cache) & 0x08)
	{
		uint8_t *color_prom = m_color_prom + 16 * ((m_palette_bank & 0x08) >> 3);

		std::vector<rgb_t> rgb;

		compute_res_net_all(rgb, color_prom, mb7051_decode_info, bak_mb7051_net_info());
		m_palette->set_pen_colors(0, rgb);
	}

	if ((m_palette_bank ^ m_palette_bank_cache) & 0x08)
	{
		uint8_t *color_prom = m_color_prom + 32 + 16 * ((m_palette_bank & 0x08) >> 3);

		/* characters */
		for (int i = 0; i < 16; i++)
		{
			int r = compute_res_net((color_prom[i] >> 0) & 0x07, 0, txt_mb7051_net_info);
			int g = compute_res_net((color_prom[i] >> 3) & 0x07, 1, txt_mb7051_net_info);
			int b = compute_res_net((color_prom[i] >> 6) & 0x03, 2, txt_mb7051_net_info);
			m_palette->set_pen_color(16 + (2 * i) + 0, rgb_t(0, 0, 0));
			m_palette->set_pen_color(16 + (2 * i) + 1, rgb_t(r, g, b));
		}
	}

	if ((m_palette_bank ^ m_palette_bank_cache) & 0x07)
	{
		uint8_t *color_prom = m_color_prom_spr + 32 * (m_palette_bank & 0x07);

		/* sprites */
		std::vector<rgb_t> rgb;
		compute_res_net_all(rgb, color_prom, mb7052_decode_info, obj_mb7052_net_info);
		m_palette->set_pen_colors(48, rgb);
	}

	m_palette_bank_cache = m_palette_bank;'};
MERGE (n:KG {id: 'handler:tnx1_state.bak_mb7051_net_info'}) SET n:Handler SET n += {method: 'bak_mb7051_net_info', ownerClass: 'tnx1_state', sourceFile: 'src/mame/nintendo/popeye.h', sourceLine: 71, sourceColumn: 47, sourceEndLine: 72, sourceParameters: '', sourceBody: 'return tnx1_bak_mb7051_net_info;'};
MERGE (n:KG {id: 'handler:tnx1_state.draw_background'}) SET n:Handler SET n += {method: 'draw_background', ownerClass: 'tnx1_state', sourceFile: 'src/mame/nintendo/popeye_v.cpp', sourceLine: 354, sourceColumn: 1, sourceEndLine: 367, sourceParameters: 'bitmap_ind16& bitmap, const rectangle& cliprect', sourceBody: 'for (int y = cliprect.min_y; y <= cliprect.max_y; y++)
	{
		uint16_t rovi = (flip_screen() ? (y / 2) ^ 0xff : (y / 2)) + m_background_scroll[1];

		for (int x = cliprect.min_x; x <= cliprect.max_x; x++)
		{
			uint16_t roh = 0x38 + (x / 2) + m_background_scroll[0] + (BIT(m_background_scroll[2], 0) << 8);
			int shift = BIT(roh, 8) ? 4 : 0;
			bitmap.pix(y, x) = (m_background_ram[BIT(rovi, 8) ? (BIT(rovi, 2, 6) << 6) | BIT(roh, 2, 6) : 0] >> shift) & 0xf;
		}
	}'};
MERGE (n:KG {id: 'handler:tnx1_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'tnx1_state', sourceFile: 'src/mame/nintendo/popeye_v.cpp', sourceLine: 249, sourceColumn: 1, sourceEndLine: 345, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'm_sprite_bitmap->fill(0, cliprect);

	for (int y = cliprect.min_y; y <= cliprect.max_y; y++)
	{
		struct attribute_memory
		{
			int row = 0;
			int sx = 0;
			uint8_t color = 0;
			uint16_t code = 0;
			int flipx = 0;
			int flipy = 0;
		} attributes[64];

		for (int offs = 4; offs < m_dmasource.bytes(); offs += 4)
		{
			int sy = 0x200 - (m_sprite_ram[offs + 1] * 2);
			int row = y - sy;
			if (flip_screen())
			{
				sy ^= 0x1ff;
				row = sy - y;
			}

			if (row >= 0 && row < 16)
			{
				/*
				* offs+3:
				* bit 7 ? TODO: figure out why olive oil and wimpy have some of these bits set
				* bit 6 ?
				* bit 5 ?
				* bit 4 MSB of sprite code
				* bit 3 vertical flip
				* bit 2 sprite bank
				* bit 1 \\ color (with bit 2 as well)
				* bit 0 /
				*/

				struct attribute_memory *a = &attributes[m_sprite_ram[offs] >> 2];
				a->sx = m_sprite_ram[offs] * 2;
				a->row = row;
				a->code = ((m_sprite_ram[offs + 2] & 0x7f)
					+ ((m_sprite_ram[offs + 3] & 0x10) << 3)
					+ ((m_sprite_ram[offs + 3] & 0x04) << 6)) ^ 0x1ff;
				a->color = (m_sprite_ram[offs + 3] & 0x07);
				a->flipx = (m_sprite_ram[offs + 2] & 0x80) ? 0xf : 0;
				a->flipy = (m_sprite_ram[offs + 3] & 0x08) ? 0xf : 0;
			}
		}

		int flipx = 0;
		for (int i = 0; i < 64; i++)
		{
			struct attribute_memory *a = &attributes[i];
			if (a->color != 0)
			{
				gfx_element *gfx = m_gfxdecode->gfx(1);
				const pen_t *pal = &m_palette->pen(gfx->colorbase() + gfx->granularity() * (a->color % gfx->colors()));
				const uint8_t *source_base = gfx->get_data(a->code % gfx->elements());
				const uint8_t *source = source_base + (a->row ^ a->flipy) * gfx->rowbytes();

				if (bootleg_sprites() && flipx != a->flipx)
				{
					int px = a->sx - 7;
					if (px >= 0 && px < 512)
					{
						if (flip_screen())
							px ^= 0x1ff;

						m_sprite_bitmap->pix(y, px) = 0;
					}

					flipx = a->flipx;
				}

				for (int x = 0; x < 16; x++)
				{
					int px = a->sx + x - 6;
					if (px >= 0 && px < 512)
					{
						if (flip_screen())
							px ^= 0x1ff;

						uint16_t p = source[x ^ a->flipx];
						if (p) p = pal[p];

						m_sprite_bitmap->pix(y, px) = p;
					}
				}
			}
		}
	}

	copybitmap_trans(bitmap, *m_sprite_bitmap, 0, 0, 0, 0, cliprect, 0);'};
MERGE (n:KG {id: 'handler:tnx1_state.bootleg_sprites'}) SET n:Handler SET n += {method: 'bootleg_sprites', ownerClass: 'tnx1_state', sourceFile: 'src/mame/nintendo/popeye.h', sourceLine: 110, sourceColumn: 49, sourceEndLine: 112, sourceParameters: '', sourceBody: 'return false;'};
MERGE (n:KG {id: 'device:tnx1_state.config/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set', raw: 'm_screen->screen_vblank().set(FUNC(tnx1_state::screen_vblank))', ownerTag: 'screen', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 555, sourceColumn: 2, sourceEndLine: 555, targetClass: 'tnx1_state', targetMethod: 'screen_vblank'};
MERGE (n:KG {id: 'handler:tnx1_state.screen_vblank'}) SET n:Handler SET n += {method: 'screen_vblank', ownerClass: 'tnx1_state', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 107, sourceColumn: 1, sourceEndLine: 119, sourceParameters: 'int state', sourceBody: 'if (state)
	{
		std::copy_n(m_dmasource.target(), m_dmasource.bytes(), m_sprite_ram.begin());
		std::copy_n(m_dmasource.target(), 3, m_background_scroll);
		m_palette_bank = m_dmasource[3];

		m_field ^= 1;
		if (m_nmi_enabled)
			m_maincpu->set_input_line(INPUT_LINE_NMI, ASSERT_LINE);
	}'};
MERGE (n:KG {id: 'device:tnx1_state.config/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_popeye)'], sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 557, sourceColumn: 2, sourceEndLine: 557, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:tnx1_state.config/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(tnx1_state::tnx1_palette), 16 + 16*2 + 8*4)'], sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 558, sourceColumn: 2, sourceEndLine: 558, clockExpr: 'FUNC(tnx1_state::tnx1_palette)'};
MERGE (n:KG {id: 'device:tnx1_state.config/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 561, sourceColumn: 2, sourceEndLine: 561};
MERGE (n:KG {id: 'device:tnx1_state.config/aysnd'}) SET n:Device SET n += {type: 'AY8910', tag: 'aysnd', clock: 2000000, config: ['AY8910(config, m_aysnd, XTAL(8\'000\'000)/4)', 'm_aysnd->port_a_read_callback().set_ioport("DSW0")', 'm_aysnd->port_b_write_callback().set(FUNC(tnx1_state::popeye_portB_w))', 'm_aysnd->add_route(ALL_OUTPUTS, "mono", 0.40)', 'm_aysnd->reset_routes()', 'm_aysnd->set_flags(AY8910_RESISTOR_OUTPUT)', 'm_aysnd->set_resistors_load(2000.0, 2000.0, 2000.0)', 'm_aysnd->add_route(0, "snd_nl", 1.0, 0)', 'm_aysnd->add_route(1, "snd_nl", 1.0, 1)', 'm_aysnd->add_route(2, "snd_nl", 1.0, 2)'], sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 563, sourceColumn: 2, sourceEndLine: 563};
MERGE (n:KG {id: 'audioroute:device:tnx1_state.config/aysnd/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.4, raw: 'm_aysnd->add_route(ALL_OUTPUTS, "mono", 0.40)', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 566, sourceColumn: 2, sourceEndLine: 566};
MERGE (n:KG {id: 'device:tnx1_state.config/aysnd/callback:aysnd:0'}) SET n:Callback SET n += {signal: 'port_a_read_callback', operation: 'set_ioport', raw: 'm_aysnd->port_a_read_callback().set_ioport("DSW0")', ownerTag: 'aysnd', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 564, sourceColumn: 2, sourceEndLine: 564, targetTag: 'DSW0', targetPort: 'DSW0'};
MERGE (n:KG {id: 'device:tnx1_state.config/aysnd/callback:aysnd:1'}) SET n:Callback SET n += {signal: 'port_b_write_callback', operation: 'set', raw: 'm_aysnd->port_b_write_callback().set(FUNC(tnx1_state::popeye_portB_w))', ownerTag: 'aysnd', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 565, sourceColumn: 2, sourceEndLine: 565, targetClass: 'tnx1_state', targetMethod: 'popeye_portB_w'};
MERGE (n:KG {id: 'handler:tnx1_state.popeye_portB_w'}) SET n:Handler SET n += {method: 'popeye_portB_w', ownerClass: 'tnx1_state', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 529, sourceColumn: 1, sourceEndLine: 536, sourceParameters: 'uint8_t data', sourceBody: '/* bit 0 flips screen */
	flip_screen_set(data & 1);

	/* bits 1-3 select DSW1 bit to read */
	m_dswbit = (data & 0x0e) >> 1;'};
MERGE (n:KG {id: 'machine:tpp2_state.config'}) SET n:MachineConfig SET n += {cls: 'tpp2_state', name: 'config', calls: ['tpp1_state::config'], startHandlers: ['tnx1_state.video_start'], devicePatches: ['{"tag":"aysnd","config":["m_aysnd->reset_routes()","m_aysnd->set_flags(AY8910_RESISTOR_OUTPUT)","m_aysnd->set_resistors_load(2000.0, 2000.0, 2000.0)","m_aysnd->add_route(0, \\"snd_nl\\", 1.0, 0)","m_aysnd->add_route(1, \\"snd_nl\\", 1.0, 1)","m_aysnd->add_route(2, \\"snd_nl\\", 1.0, 2)"]}'], sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 569, sourceColumn: 1, sourceEndLine: 591};
MERGE (n:KG {id: 'device:tpp2_state.config/snd_nl'}) SET n:Device SET n += {type: 'NETLIST_SOUND', tag: 'snd_nl', clock: 48000, config: ['NETLIST_SOUND(config, "snd_nl", 48000)
		.set_source(NETLIST_NAME(popeye))
		.add_route(ALL_OUTPUTS, "mono", 1.0)'], sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 582, sourceColumn: 2, sourceEndLine: 584};
MERGE (n:KG {id: 'audioroute:device:tpp2_state.config/snd_nl/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 1, raw: 'NETLIST_SOUND(config, "snd_nl", 48000)
		.set_source(NETLIST_NAME(popeye))
		.add_route(ALL_OUTPUTS, "mono", 1.0)', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 582, sourceColumn: 2, sourceEndLine: 584};
MERGE (n:KG {id: 'device:tpp2_state.config/snd_nl:cin0'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'snd_nl:cin0', clock: 0, config: ['NETLIST_STREAM_INPUT(config, "snd_nl:cin0", 0, "R_AY1_1.R")'], sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 586, sourceColumn: 2, sourceEndLine: 586};
MERGE (n:KG {id: 'device:tpp2_state.config/snd_nl:cin1'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'snd_nl:cin1', clock: 1, config: ['NETLIST_STREAM_INPUT(config, "snd_nl:cin1", 1, "R_AY1_2.R")'], sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 587, sourceColumn: 2, sourceEndLine: 587};
MERGE (n:KG {id: 'device:tpp2_state.config/snd_nl:cin2'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'snd_nl:cin2', clock: 2, config: ['NETLIST_STREAM_INPUT(config, "snd_nl:cin2", 2, "R_AY1_3.R")'], sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 588, sourceColumn: 2, sourceEndLine: 588};
MERGE (n:KG {id: 'device:tpp2_state.config/snd_nl:cout0'}) SET n:Device SET n += {type: 'NETLIST_STREAM_OUTPUT', tag: 'snd_nl:cout0', clock: 0, config: ['NETLIST_STREAM_OUTPUT(config, "snd_nl:cout0", 0, "ROUT.1").set_mult_offset(1.0, -2.0)'], sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 590, sourceColumn: 2, sourceEndLine: 590};
MERGE (n:KG {id: 'handler:tnx1_state.dsw1_read'}) SET n:Handler SET n += {method: 'dsw1_read', ownerClass: 'tnx1_state', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 290, sourceColumn: 1, sourceEndLine: 293, sourceParameters: '', sourceBody: 'return m_io_dsw1->read() >> m_dswbit;', inputMembers: ['m_io_dsw1=DSW1']};
MERGE (n:KG {id: 'inputs:popeye'}) SET n:InputPorts SET n += {name: 'popeye', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 384, sourceColumn: 8, sourceEndLine: 384};
MERGE (n:KG {id: 'inputs:popeye/P1'}) SET n:Port SET n += {tag: 'P1', modify: false};
MERGE (n:KG {id: 'inputs:popeye/P1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY']};
MERGE (n:KG {id: 'inputs:popeye/P1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY']};
MERGE (n:KG {id: 'inputs:popeye/P1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY']};
MERGE (n:KG {id: 'inputs:popeye/P1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY']};
MERGE (n:KG {id: 'inputs:popeye/P1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_BUTTON1'};
MERGE (n:KG {id: 'inputs:popeye/P1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:popeye/P1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:popeye/P1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:popeye/P2'}) SET n:Port SET n += {tag: 'P2', modify: false};
MERGE (n:KG {id: 'inputs:popeye/P2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:popeye/P2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:popeye/P2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:popeye/P2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:popeye/P2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:popeye/P2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:popeye/P2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:popeye/P2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:popeye/SYSTEM'}) SET n:Port SET n += {tag: 'SYSTEM', modify: false};
MERGE (n:KG {id: 'inputs:popeye/SYSTEM/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:popeye/SYSTEM/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:popeye/SYSTEM/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_START1'};
MERGE (n:KG {id: 'inputs:popeye/SYSTEM/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_START2'};
MERGE (n:KG {id: 'inputs:popeye/SYSTEM/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_MEMBER(FUNC(tpp1_state::pop_field_r))']};
MERGE (n:KG {id: 'handler:tpp1_state.pop_field_r'}) SET n:Handler SET n += {method: 'pop_field_r', ownerClass: 'tpp1_state', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 379, sourceColumn: 1, sourceEndLine: 382, sourceParameters: '', sourceBody: 'return m_field ^ 1;'};
MERGE (n:KG {id: 'inputs:popeye/SYSTEM/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_COIN2'};
MERGE (n:KG {id: 'inputs:popeye/SYSTEM/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_SERVICE1'};
MERGE (n:KG {id: 'inputs:popeye/SYSTEM/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_COIN1'};
MERGE (n:KG {id: 'inputs:popeye/DSW0'}) SET n:Port SET n += {tag: 'DSW0', modify: false};
MERGE (n:KG {id: 'inputs:popeye/DSW0/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 15, name: 'Coinage', defaultValue: 15, location: 'SW1:1,2,3,4', settings: ['8=6C 1C', '5=5C 1C', '9=4C 1C', '10=3C 1C', '13=2C 1C', '15=1C 1C', '14=1C 2C', '3=1C 3C', '0=Free Play']};
MERGE (n:KG {id: 'inputs:popeye/DSW0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:popeye/DSW0/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 96, name: 'Copyright', defaultValue: 64, settings: ['64=Nintendo', '32=Nintendo Co.,Ltd', '96=Nintendo of America']};
MERGE (n:KG {id: 'inputs:popeye/DSW0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_MEMBER(FUNC(tnx1_state::dsw1_read))']};
MERGE (n:KG {id: 'inputs:popeye/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:popeye/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, name: 'Lives', defaultValue: 1, location: 'SW2:1,2', settings: ['3=1', '2=2', '1=3', '0=4']};
MERGE (n:KG {id: 'inputs:popeye/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 12, name: 'Difficulty', defaultValue: 12, location: 'SW2:3,4', settings: ['12=Easy', '8=Medium', '4=Hard', '0=Hardest']};
MERGE (n:KG {id: 'inputs:popeye/DSW1/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 48, name: 'Bonus Life', defaultValue: 48, location: 'SW2:5,6', settings: ['48=40000', '32=60000', '16=80000', '0=None']};
MERGE (n:KG {id: 'inputs:popeye/DSW1/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 64, name: 'Demo Sounds', defaultValue: 0, location: 'SW2:7', settings: ['64=Off', '0=On']};
MERGE (n:KG {id: 'inputs:popeye/DSW1/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Cabinet', defaultValue: 0, location: 'SW2:8', settings: ['0=Upright', '128=Cocktail']};
MERGE (n:KG {id: 'inputs:popeye/MCONF'}) SET n:Port SET n += {tag: 'MCONF', modify: false};
MERGE (n:KG {id: 'inputs:popeye/MCONF/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, name: 'Interlace mode', defaultValue: 0, settings: ['0=False Progressive', '1=Interlaced (scanline skip)', '2=Interlaced (bitmap)']};
MERGE (n:KG {id: 'gfxlayout:charlayout'}) SET n:GfxLayout SET n += {name: 'charlayout', width: 8, height: 8, total: 'RGN_FRAC(1,1)', planes: 1, planeOffsets: [0], xOffsets: [7, 6, 5, 4, 3, 2, 1, 0], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxlayout:spritelayout'}) SET n:GfxLayout SET n += {name: 'spritelayout', width: 16, height: 16, total: 'RGN_FRAC(1,4)', planes: 2, planeOffsets: [0, 'RGN_FRAC(1,2)'], xOffsets: ['RGN_FRAC(1,4)+7', 'RGN_FRAC(1,4)+6', 'RGN_FRAC(1,4)+5', 'RGN_FRAC(1,4)+4', 'RGN_FRAC(1,4)+3', 'RGN_FRAC(1,4)+2', 'RGN_FRAC(1,4)+1', 'RGN_FRAC(1,4)+0', 7, 6, 5, 4, 3, 2, 1, 0], yOffsets: [120, 112, 104, 96, 88, 80, 72, 64, 56, 48, 40, 32, 24, 16, 8, 0], charIncrement: 128};
MERGE (n:KG {id: 'gfxdecode:gfx_popeye'}) SET n:GfxDecode SET n += {name: 'gfx_popeye', sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 521, sourceColumn: 8, sourceEndLine: 521};
MERGE (n:KG {id: 'gfxdecode:gfx_popeye/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'charlayout', colorBase: 16, colorCount: 16, xscale: 2, yscale: 2};
MERGE (n:KG {id: 'gfxdecode:gfx_popeye/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx2', offset: 0, layout: 'spritelayout', colorBase: 48, colorCount: 8, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:popeye'}), (b:KG {id: 'file:src/mame/nintendo/popeye.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 926, sourceColumn: 1, sourceEndLine: 926};
MATCH (a:KG {id: 'game:popeye'}), (b:KG {id: 'machine:tpp2_state.config'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:popeye'}), (b:KG {id: 'inputs:popeye'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:popeye'}), (b:KG {id: 'romset:popeye'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/popeye.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/popeye.cpp'}), (b:KG {id: 'file:popeye.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/popeye.cpp'}), (b:KG {id: 'file:machine/eepromser.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/popeye.cpp'}), (b:KG {id: 'file:machine/netlist.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/popeye.cpp'}), (b:KG {id: 'file:netlist/devices/net_lib.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/popeye.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/popeye.cpp'}), (b:KG {id: 'file:nl_popeye.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:tpp2_state.config'}), (b:KG {id: 'file:src/mame/nintendo/popeye.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 569, sourceColumn: 1, sourceEndLine: 591};
MATCH (a:KG {id: 'machine:tpp2_state.config'}), (b:KG {id: 'handler:tnx1_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:tpp2_state.config'}), (b:KG {id: 'machine:tnx1_state.config'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'machine:tpp2_state.config'}), (b:KG {id: 'map:tpp2_state.maincpu_program_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:tpp2_state.config'}), (b:KG {id: 'device:tpp2_state.config/snd_nl'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tpp2_state.config'}), (b:KG {id: 'device:tpp2_state.config/snd_nl:cin0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tpp2_state.config'}), (b:KG {id: 'device:tpp2_state.config/snd_nl:cin1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tpp2_state.config'}), (b:KG {id: 'device:tpp2_state.config/snd_nl:cin2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tpp2_state.config'}), (b:KG {id: 'device:tpp2_state.config/snd_nl:cout0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:popeye'}), (b:KG {id: 'file:src/mame/nintendo/popeye.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 384, sourceColumn: 8, sourceEndLine: 384};
MATCH (a:KG {id: 'inputs:popeye'}), (b:KG {id: 'inputs:popeye/P1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:popeye'}), (b:KG {id: 'inputs:popeye/P2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:popeye'}), (b:KG {id: 'inputs:popeye/SYSTEM'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:popeye'}), (b:KG {id: 'inputs:popeye/DSW0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:popeye'}), (b:KG {id: 'inputs:popeye/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:popeye'}), (b:KG {id: 'inputs:popeye/MCONF'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:popeye'}), (b:KG {id: 'file:src/mame/nintendo/popeye.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 647, sourceColumn: 1, sourceEndLine: 647};
MATCH (a:KG {id: 'romset:popeye'}), (b:KG {id: 'region:popeye/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:popeye'}), (b:KG {id: 'region:popeye/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:popeye'}), (b:KG {id: 'region:popeye/gfx2'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:popeye'}), (b:KG {id: 'region:popeye/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:popeye'}), (b:KG {id: 'region:popeye/sprpal'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:popeye'}), (b:KG {id: 'region:popeye/timing'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:tnx1_state.video_start'}), (b:KG {id: 'handler:tnx1_state.get_fg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:tnx1_state.config'}), (b:KG {id: 'file:src/mame/nintendo/popeye.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 538, sourceColumn: 1, sourceEndLine: 567};
MATCH (a:KG {id: 'machine:tnx1_state.config'}), (b:KG {id: 'handler:tnx1_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:tnx1_state.config'}), (b:KG {id: 'device:tnx1_state.config/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tnx1_state.config'}), (b:KG {id: 'device:tnx1_state.config/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tnx1_state.config'}), (b:KG {id: 'device:tnx1_state.config/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tnx1_state.config'}), (b:KG {id: 'gfxdecode:gfx_popeye'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:tnx1_state.config'}), (b:KG {id: 'device:tnx1_state.config/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tnx1_state.config'}), (b:KG {id: 'device:tnx1_state.config/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tnx1_state.config'}), (b:KG {id: 'device:tnx1_state.config/aysnd'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:tpp2_state.maincpu_program_map'}), (b:KG {id: 'file:src/mame/nintendo/popeye.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 193, sourceColumn: 1, sourceEndLine: 199};
MATCH (a:KG {id: 'map:tpp2_state.maincpu_program_map'}), (b:KG {id: 'map:tnx1_state.maincpu_common_map'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:tpp2_state.maincpu_program_map'}), (b:KG {id: 'map:tpp2_state.maincpu_program_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tpp2_state.maincpu_program_map'}), (b:KG {id: 'map:tpp2_state.maincpu_program_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:tpp2_state.config/snd_nl'}), (b:KG {id: 'audioroute:device:tpp2_state.config/snd_nl/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:popeye/P1'}), (b:KG {id: 'inputs:popeye/P1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/P1'}), (b:KG {id: 'inputs:popeye/P1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/P1'}), (b:KG {id: 'inputs:popeye/P1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/P1'}), (b:KG {id: 'inputs:popeye/P1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/P1'}), (b:KG {id: 'inputs:popeye/P1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/P1'}), (b:KG {id: 'inputs:popeye/P1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/P1'}), (b:KG {id: 'inputs:popeye/P1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/P1'}), (b:KG {id: 'inputs:popeye/P1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/P2'}), (b:KG {id: 'inputs:popeye/P2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/P2'}), (b:KG {id: 'inputs:popeye/P2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/P2'}), (b:KG {id: 'inputs:popeye/P2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/P2'}), (b:KG {id: 'inputs:popeye/P2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/P2'}), (b:KG {id: 'inputs:popeye/P2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/P2'}), (b:KG {id: 'inputs:popeye/P2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/P2'}), (b:KG {id: 'inputs:popeye/P2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/P2'}), (b:KG {id: 'inputs:popeye/P2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/SYSTEM'}), (b:KG {id: 'inputs:popeye/SYSTEM/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/SYSTEM'}), (b:KG {id: 'inputs:popeye/SYSTEM/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/SYSTEM'}), (b:KG {id: 'inputs:popeye/SYSTEM/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/SYSTEM'}), (b:KG {id: 'inputs:popeye/SYSTEM/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/SYSTEM'}), (b:KG {id: 'inputs:popeye/SYSTEM/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/SYSTEM'}), (b:KG {id: 'inputs:popeye/SYSTEM/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/SYSTEM'}), (b:KG {id: 'inputs:popeye/SYSTEM/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/SYSTEM'}), (b:KG {id: 'inputs:popeye/SYSTEM/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/DSW0'}), (b:KG {id: 'inputs:popeye/DSW0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/DSW0'}), (b:KG {id: 'inputs:popeye/DSW0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/DSW0'}), (b:KG {id: 'inputs:popeye/DSW0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/DSW0'}), (b:KG {id: 'inputs:popeye/DSW0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/DSW1'}), (b:KG {id: 'inputs:popeye/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/DSW1'}), (b:KG {id: 'inputs:popeye/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/DSW1'}), (b:KG {id: 'inputs:popeye/DSW1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/DSW1'}), (b:KG {id: 'inputs:popeye/DSW1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/DSW1'}), (b:KG {id: 'inputs:popeye/DSW1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:popeye/MCONF'}), (b:KG {id: 'inputs:popeye/MCONF/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:popeye/maincpu'}), (b:KG {id: 'rom:popeye/maincpu/tpp2-c.7a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:popeye/maincpu'}), (b:KG {id: 'rom:popeye/maincpu/tpp2-c.7b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:popeye/maincpu'}), (b:KG {id: 'rom:popeye/maincpu/tpp2-c.7c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:popeye/maincpu'}), (b:KG {id: 'rom:popeye/maincpu/tpp2-c.7e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:popeye/gfx1'}), (b:KG {id: 'rom:popeye/gfx1/tpp2-v.5n'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:popeye/gfx2'}), (b:KG {id: 'rom:popeye/gfx2/tpp2-v.1e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:popeye/gfx2'}), (b:KG {id: 'rom:popeye/gfx2/tpp2-v.1f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:popeye/gfx2'}), (b:KG {id: 'rom:popeye/gfx2/tpp2-v.1j'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:popeye/gfx2'}), (b:KG {id: 'rom:popeye/gfx2/tpp2-v.1k'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:popeye/proms'}), (b:KG {id: 'rom:popeye/proms/tpp2-c.4a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:popeye/proms'}), (b:KG {id: 'rom:popeye/proms/tpp2-c.3a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:popeye/sprpal'}), (b:KG {id: 'rom:popeye/sprpal/tpp2-c.5b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:popeye/sprpal'}), (b:KG {id: 'rom:popeye/sprpal/tpp2-c.5a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:popeye/timing'}), (b:KG {id: 'rom:popeye/timing/tpp2-v.7j'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'device:tnx1_state.config/maincpu'}), (b:KG {id: 'device:tnx1_state.config/maincpu/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:tnx1_state.config/maincpu'}), (b:KG {id: 'map:tnx1_state.maincpu_program_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:tnx1_state.config/maincpu'}), (b:KG {id: 'map:tnx1_state.maincpu_io_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:tnx1_state.config/screen'}), (b:KG {id: 'device:tnx1_state.config/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:tnx1_state.config/screen'}), (b:KG {id: 'device:tnx1_state.config/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_popeye'}), (b:KG {id: 'file:src/mame/nintendo/popeye.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 521, sourceColumn: 8, sourceEndLine: 521};
MATCH (a:KG {id: 'gfxdecode:gfx_popeye'}), (b:KG {id: 'gfxdecode:gfx_popeye/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_popeye'}), (b:KG {id: 'gfxdecode:gfx_popeye/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:tnx1_state.config/aysnd'}), (b:KG {id: 'audioroute:device:tnx1_state.config/aysnd/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:tnx1_state.config/aysnd'}), (b:KG {id: 'device:tnx1_state.config/aysnd/callback:aysnd:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:tnx1_state.config/aysnd'}), (b:KG {id: 'device:tnx1_state.config/aysnd/callback:aysnd:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'map:tnx1_state.maincpu_common_map'}), (b:KG {id: 'file:src/mame/nintendo/popeye.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 175, sourceColumn: 1, sourceEndLine: 184};
MATCH (a:KG {id: 'map:tnx1_state.maincpu_common_map'}), (b:KG {id: 'map:tnx1_state.maincpu_common_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tnx1_state.maincpu_common_map'}), (b:KG {id: 'map:tnx1_state.maincpu_common_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tnx1_state.maincpu_common_map'}), (b:KG {id: 'map:tnx1_state.maincpu_common_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tnx1_state.maincpu_common_map'}), (b:KG {id: 'map:tnx1_state.maincpu_common_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tnx1_state.maincpu_common_map'}), (b:KG {id: 'map:tnx1_state.maincpu_common_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tnx1_state.maincpu_common_map'}), (b:KG {id: 'map:tnx1_state.maincpu_common_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tnx1_state.maincpu_common_map'}), (b:KG {id: 'map:tnx1_state.maincpu_common_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tpp2_state.maincpu_program_map/range1'}), (b:KG {id: 'handler:tpp2_state.background_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'inputs:popeye/SYSTEM/f4'}), (b:KG {id: 'handler:tpp1_state.pop_field_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:popeye/DSW0/f3'}), (b:KG {id: 'handler:tnx1_state.dsw1_read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:tnx1_state.config/maincpu/callback:maincpu:0'}), (b:KG {id: 'handler:tnx1_state.refresh_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:tnx1_state.maincpu_program_map'}), (b:KG {id: 'file:src/mame/nintendo/popeye.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 186, sourceColumn: 1, sourceEndLine: 191};
MATCH (a:KG {id: 'map:tnx1_state.maincpu_program_map'}), (b:KG {id: 'map:tnx1_state.maincpu_common_map'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:tnx1_state.maincpu_program_map'}), (b:KG {id: 'map:tnx1_state.maincpu_program_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tnx1_state.maincpu_program_map'}), (b:KG {id: 'map:tnx1_state.maincpu_program_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tnx1_state.maincpu_io_map'}), (b:KG {id: 'file:src/mame/nintendo/popeye.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/popeye.cpp', sourceLine: 219, sourceColumn: 1, sourceEndLine: 227};
MATCH (a:KG {id: 'map:tnx1_state.maincpu_io_map'}), (b:KG {id: 'map:tnx1_state.maincpu_io_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tnx1_state.maincpu_io_map'}), (b:KG {id: 'map:tnx1_state.maincpu_io_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tnx1_state.maincpu_io_map'}), (b:KG {id: 'map:tnx1_state.maincpu_io_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tnx1_state.maincpu_io_map'}), (b:KG {id: 'map:tnx1_state.maincpu_io_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tnx1_state.maincpu_io_map'}), (b:KG {id: 'map:tnx1_state.maincpu_io_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:tnx1_state.config/screen/callback:screen:0'}), (b:KG {id: 'handler:tnx1_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:tnx1_state.config/screen/callback:screen:1'}), (b:KG {id: 'handler:tnx1_state.screen_vblank'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_popeye/e0'}), (b:KG {id: 'gfxlayout:charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_popeye/e1'}), (b:KG {id: 'gfxlayout:spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:tnx1_state.config/aysnd/callback:aysnd:1'}), (b:KG {id: 'handler:tnx1_state.popeye_portB_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:tnx1_state.maincpu_common_map/range3'}), (b:KG {id: 'handler:tnx1_state.popeye_videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:tnx1_state.maincpu_common_map/range4'}), (b:KG {id: 'handler:tnx1_state.popeye_colorram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:tnx1_state.maincpu_common_map/range5'}), (b:KG {id: 'handler:tnx1_state.background_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:tnx1_state.maincpu_common_map/range6'}), (b:KG {id: 'handler:tnx1_state.protection_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:tnx1_state.maincpu_common_map/range6'}), (b:KG {id: 'handler:tnx1_state.protection_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:tnx1_state.maincpu_io_map/range0'}), (b:KG {id: 'handler:ay8910_device.address_data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'aysnd'};
MATCH (a:KG {id: 'map:tnx1_state.maincpu_io_map/range4'}), (b:KG {id: 'handler:ay8910_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'aysnd'};
MATCH (a:KG {id: 'handler:tnx1_state.screen_update'}), (b:KG {id: 'handler:tnx1_state.update_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tnx1_state.screen_update'}), (b:KG {id: 'handler:tnx1_state.draw_background'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tnx1_state.screen_update'}), (b:KG {id: 'handler:tnx1_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:charlayout'}), (b:KG {id: 'file:src/mame/nintendo/popeye.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:spritelayout'}), (b:KG {id: 'file:src/mame/nintendo/popeye.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'handler:tnx1_state.update_palette'}), (b:KG {id: 'handler:tnx1_state.bak_mb7051_net_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tnx1_state.draw_sprites'}), (b:KG {id: 'handler:tnx1_state.bootleg_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
