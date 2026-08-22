// mamekit knowledge graph — driver src/mame/sanritsu/bankp.cpp
// generated 2026-08-22T05:52:09.369Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/sanritsu/bankp.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/sanritsu/bankp.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:sound/sn76496.h'}) SET n:SourceFile SET n += {path: 'sound/sn76496.h', external: true};
MERGE (n:KG {id: 'file:emupal.h'}) SET n:SourceFile SET n += {path: 'emupal.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:tilemap.h'}) SET n:SourceFile SET n += {path: 'tilemap.h', external: true};
MERGE (n:KG {id: 'game:bankp'}) SET n:Game SET n += {name: 'bankp', year: '1984', company: 'Sanritsu / Sega', fullname: 'Bank Panic', monitor: 'ROT0', cls: 'bankp_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 673, sourceColumn: 1, sourceEndLine: 673};
MERGE (n:KG {id: 'romset:bankp'}) SET n:RomSet SET n += {name: 'bankp', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 577, sourceColumn: 1, sourceEndLine: 577};
MERGE (n:KG {id: 'region:bankp/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 578, sourceColumn: 2, sourceEndLine: 578};
MERGE (n:KG {id: 'rom:bankp/maincpu/epr-6175.7e'}) SET n:Rom SET n += {file: 'epr-6175.7e', offset: 0, size: 16384, crc: '044552b8', sha1: '8d50ba062483d4789cfd3ed86cea53dff0ff6968', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 579, sourceColumn: 2, sourceEndLine: 579};
MERGE (n:KG {id: 'rom:bankp/maincpu/epr-6174.7f'}) SET n:Rom SET n += {file: 'epr-6174.7f', offset: 16384, size: 16384, crc: 'd29b1598', sha1: '8c1ee4d23d8d6f93af3e22f2cba189b0055994fb', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 580, sourceColumn: 2, sourceEndLine: 580};
MERGE (n:KG {id: 'rom:bankp/maincpu/epr-6173.7h'}) SET n:Rom SET n += {file: 'epr-6173.7h', offset: 32768, size: 16384, crc: 'b8405d38', sha1: '0f62a972f38b4ddcea77eb0e1d76c70ddbcb7b11', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 581, sourceColumn: 2, sourceEndLine: 581};
MERGE (n:KG {id: 'rom:bankp/maincpu/epr-6176.7d'}) SET n:Rom SET n += {file: 'epr-6176.7d', offset: 49152, size: 8192, crc: 'c98ac200', sha1: '1bdb87868deebe03da18280e617530c24118da1c', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 582, sourceColumn: 2, sourceEndLine: 582};
MERGE (n:KG {id: 'region:bankp/fgtiles'}) SET n:RomRegion SET n += {tag: 'fgtiles', size: 16384, flags: '0', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 584, sourceColumn: 2, sourceEndLine: 584};
MERGE (n:KG {id: 'rom:bankp/fgtiles/epr-6165.5l'}) SET n:Rom SET n += {file: 'epr-6165.5l', offset: 0, size: 8192, crc: 'aef34a93', sha1: '513895cd3144977b3d9b5ac7f2bf40384d69e157', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 585, sourceColumn: 2, sourceEndLine: 585};
MERGE (n:KG {id: 'rom:bankp/fgtiles/epr-6166.5k'}) SET n:Rom SET n += {file: 'epr-6166.5k', offset: 8192, size: 8192, crc: 'ca13cb11', sha1: '3aca0b0d3f052a742e1cd0b96bfad834e78fcd7d', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 586, sourceColumn: 2, sourceEndLine: 586};
MERGE (n:KG {id: 'region:bankp/bgtiles'}) SET n:RomRegion SET n += {tag: 'bgtiles', size: 49152, flags: '0', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 588, sourceColumn: 2, sourceEndLine: 588};
MERGE (n:KG {id: 'rom:bankp/bgtiles/epr-6172.5b'}) SET n:Rom SET n += {file: 'epr-6172.5b', offset: 0, size: 8192, crc: 'c4c4878b', sha1: '423143d81408eda96f87bdc3a306517c473cbe00', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 589, sourceColumn: 2, sourceEndLine: 589};
MERGE (n:KG {id: 'rom:bankp/bgtiles/epr-6171.5d'}) SET n:Rom SET n += {file: 'epr-6171.5d', offset: 8192, size: 8192, crc: 'a18165a1', sha1: '9a7513ea84f9231edba4e637df28a1705c8cdeb0', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 590, sourceColumn: 2, sourceEndLine: 590};
MERGE (n:KG {id: 'rom:bankp/bgtiles/epr-6170.5e'}) SET n:Rom SET n += {file: 'epr-6170.5e', offset: 16384, size: 8192, crc: 'b58aa8fa', sha1: '432b43cd9af4e3dab579cfd191b731aa11ceb121', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 591, sourceColumn: 2, sourceEndLine: 591};
MERGE (n:KG {id: 'rom:bankp/bgtiles/epr-6169.5f'}) SET n:Rom SET n += {file: 'epr-6169.5f', offset: 24576, size: 8192, crc: '1aa37fce', sha1: '6e2402683145de8972a53c9ec01da9a422392bed', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 592, sourceColumn: 2, sourceEndLine: 592};
MERGE (n:KG {id: 'rom:bankp/bgtiles/epr-6168.5h'}) SET n:Rom SET n += {file: 'epr-6168.5h', offset: 32768, size: 8192, crc: '05f3a867', sha1: '9da11c3cea967c5f0d7397c0ff4f87b4b1446c4c', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 593, sourceColumn: 2, sourceEndLine: 593};
MERGE (n:KG {id: 'rom:bankp/bgtiles/epr-6167.5i'}) SET n:Rom SET n += {file: 'epr-6167.5i', offset: 40960, size: 8192, crc: '3fa337e1', sha1: '5fdc45436be27cceb5157bd6201c30e3de28fd7b', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 594, sourceColumn: 2, sourceEndLine: 594};
MERGE (n:KG {id: 'region:bankp/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 544, flags: '0', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 596, sourceColumn: 2, sourceEndLine: 596};
MERGE (n:KG {id: 'rom:bankp/proms/pr-6177.8a'}) SET n:Rom SET n += {file: 'pr-6177.8a', offset: 0, size: 32, crc: 'eb70c5ae', sha1: '13613dad6c14004278f777d6f3f62712a2a85773', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 597, sourceColumn: 2, sourceEndLine: 597};
MERGE (n:KG {id: 'rom:bankp/proms/pr-6178.6f'}) SET n:Rom SET n += {file: 'pr-6178.6f', offset: 32, size: 256, crc: '0acca001', sha1: '54c354d825a24a9085867b114a2cd6835baebe55', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 598, sourceColumn: 2, sourceEndLine: 598};
MERGE (n:KG {id: 'rom:bankp/proms/pr-6179.5a'}) SET n:Rom SET n += {file: 'pr-6179.5a', offset: 288, size: 256, crc: 'e53bafdb', sha1: '7a414f6db5476dd7d0217e5b846ed931381eda02', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 599, sourceColumn: 2, sourceEndLine: 599};
MERGE (n:KG {id: 'region:bankp/user1'}) SET n:RomRegion SET n += {tag: 'user1', size: 604, flags: '0', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 601, sourceColumn: 2, sourceEndLine: 601};
MERGE (n:KG {id: 'rom:bankp/user1/315-5074.2c.bin'}) SET n:Rom SET n += {file: '315-5074.2c.bin', offset: 0, size: 603, crc: '2e57bbba', sha1: 'c3e45e8a972342779442e50872a2f5f2d61e9c0a', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 602, sourceColumn: 2, sourceEndLine: 602};
MERGE (n:KG {id: 'rom:bankp/user1/315-5073.pal16l4'}) SET n:Rom SET n += {file: '315-5073.pal16l4', offset: 603, size: 1, crc: '', sha1: '', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 603, sourceColumn: 2, sourceEndLine: 603, status: 'nodump'};
MERGE (n:KG {id: 'map:bankp_state.prg_map'}) SET n:AddressMap SET n += {cls: 'bankp_state', name: 'prg_map', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 368, sourceColumn: 1, sourceEndLine: 376};
MERGE (n:KG {id: 'map:bankp_state.prg_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 57343, raw: 'map(0x0000, 0xdfff).rom()', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 370, sourceColumn: 2, sourceEndLine: 370, rom: true};
MERGE (n:KG {id: 'map:bankp_state.prg_map/range1'}) SET n:AddressRange SET n += {start: 57344, end: 61439, raw: 'map(0xe000, 0xefff).ram()', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 371, sourceColumn: 2, sourceEndLine: 371, ram: true};
MERGE (n:KG {id: 'map:bankp_state.prg_map/range2'}) SET n:AddressRange SET n += {start: 61440, end: 62463, raw: 'map(0xf000, 0xf3ff).ram().w(FUNC(bankp_state::videoram_w<0>)).share(m_videoram[0])', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 372, sourceColumn: 2, sourceEndLine: 372, ram: true, share: 'videoram[0]'};
MERGE (n:KG {id: 'handler:bankp_state.videoram_w_0'}) SET n:Handler SET n += {method: 'videoram_w_0', ownerClass: 'bankp_state', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 244, sourceColumn: 1, sourceEndLine: 248, sourceConstants: ['Which=0'], sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[Which][offset] = data;
	Which ? m_bg_tilemap->mark_tile_dirty(offset) : m_fg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:bankp_state.prg_map/range3'}) SET n:AddressRange SET n += {start: 62464, end: 63487, raw: 'map(0xf400, 0xf7ff).ram().w(FUNC(bankp_state::colorram_w<0>)).share(m_colorram[0])', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 373, sourceColumn: 2, sourceEndLine: 373, ram: true, share: 'colorram[0]'};
MERGE (n:KG {id: 'handler:bankp_state.colorram_w_0'}) SET n:Handler SET n += {method: 'colorram_w_0', ownerClass: 'bankp_state', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 251, sourceColumn: 1, sourceEndLine: 255, sourceConstants: ['Which=0'], sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_colorram[Which][offset] = data;
	Which ? m_bg_tilemap->mark_tile_dirty(offset) : m_fg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:bankp_state.prg_map/range4'}) SET n:AddressRange SET n += {start: 63488, end: 64511, raw: 'map(0xf800, 0xfbff).ram().w(FUNC(bankp_state::videoram_w<1>)).share(m_videoram[1])', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 374, sourceColumn: 2, sourceEndLine: 374, ram: true, share: 'videoram[1]'};
MERGE (n:KG {id: 'handler:bankp_state.videoram_w_1'}) SET n:Handler SET n += {method: 'videoram_w_1', ownerClass: 'bankp_state', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 244, sourceColumn: 1, sourceEndLine: 248, sourceConstants: ['Which=1'], sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[Which][offset] = data;
	Which ? m_bg_tilemap->mark_tile_dirty(offset) : m_fg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:bankp_state.prg_map/range5'}) SET n:AddressRange SET n += {start: 64512, end: 65535, raw: 'map(0xfc00, 0xffff).ram().w(FUNC(bankp_state::colorram_w<1>)).share(m_colorram[1])', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 375, sourceColumn: 2, sourceEndLine: 375, ram: true, share: 'colorram[1]'};
MERGE (n:KG {id: 'handler:bankp_state.colorram_w_1'}) SET n:Handler SET n += {method: 'colorram_w_1', ownerClass: 'bankp_state', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 251, sourceColumn: 1, sourceEndLine: 255, sourceConstants: ['Which=1'], sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_colorram[Which][offset] = data;
	Which ? m_bg_tilemap->mark_tile_dirty(offset) : m_fg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:bankp_state.io_map'}) SET n:AddressMap SET n += {cls: 'bankp_state', name: 'io_map', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 378, sourceColumn: 1, sourceEndLine: 387, globalMask: 255};
MERGE (n:KG {id: 'map:bankp_state.io_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 0, raw: 'map(0x00, 0x00).portr("IN0").w("sn1", FUNC(sn76489a_device::write))', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 381, sourceColumn: 2, sourceEndLine: 381, portRead: 'IN0'};
MERGE (n:KG {id: 'handler:sn76489a_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'sn76489a_device', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 383, sourceColumn: 2, sourceEndLine: 383};
MERGE (n:KG {id: 'map:bankp_state.io_map/range1'}) SET n:AddressRange SET n += {start: 1, end: 1, raw: 'map(0x01, 0x01).portr("IN1").w("sn2", FUNC(sn76489a_device::write))', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 382, sourceColumn: 2, sourceEndLine: 382, portRead: 'IN1'};
MERGE (n:KG {id: 'map:bankp_state.io_map/range2'}) SET n:AddressRange SET n += {start: 2, end: 2, raw: 'map(0x02, 0x02).portr("IN2").w("sn3", FUNC(sn76489a_device::write))', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 383, sourceColumn: 2, sourceEndLine: 383, portRead: 'IN2'};
MERGE (n:KG {id: 'map:bankp_state.io_map/range3'}) SET n:AddressRange SET n += {start: 4, end: 4, raw: 'map(0x04, 0x04).portr("DSW1")', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 384, sourceColumn: 2, sourceEndLine: 384, portRead: 'DSW1'};
MERGE (n:KG {id: 'map:bankp_state.io_map/range4'}) SET n:AddressRange SET n += {start: 5, end: 5, raw: 'map(0x05, 0x05).w(FUNC(bankp_state::scroll_w))', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 385, sourceColumn: 2, sourceEndLine: 385};
MERGE (n:KG {id: 'handler:bankp_state.scroll_w'}) SET n:Handler SET n += {method: 'scroll_w', ownerClass: 'bankp_state', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 238, sourceColumn: 1, sourceEndLine: 241, sourceParameters: 'uint8_t data', sourceBody: 'm_scroll_x = data;'};
MERGE (n:KG {id: 'map:bankp_state.io_map/range5'}) SET n:AddressRange SET n += {start: 7, end: 7, raw: 'map(0x07, 0x07).w(FUNC(bankp_state::video_control_w))', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 386, sourceColumn: 2, sourceEndLine: 386};
MERGE (n:KG {id: 'handler:bankp_state.video_control_w'}) SET n:Handler SET n += {method: 'video_control_w', ownerClass: 'bankp_state', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 257, sourceColumn: 1, sourceEndLine: 280, sourceParameters: 'uint8_t data', sourceBody: '// bits 0-1 are playfield priority
	// TODO: understand how this works
	m_priority = data & 0x03;

	// bit 2 turns on display
	m_display_on = BIT(data, 2);

	// bit 3 controls color prom d4
	if (m_color_hi != BIT(data, 3))
	{
		m_color_hi = BIT(data, 3);
		machine().tilemap().mark_all_dirty();
	}

	// bit 4 enables vblank NMI
	m_nmi_mask = BIT(data, 4);

	// bit 5 controls screen flip
	flip_screen_set(BIT(data, 5));

	// bits 6-7 N/C'};
MERGE (n:KG {id: 'machine:bankp_state.bankp'}) SET n:MachineConfig SET n += {cls: 'bankp_state', name: 'bankp', calls: [], resetHandlers: ['bankp_state.machine_reset'], startHandlers: ['bankp_state.video_start'], sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 531, sourceColumn: 1, sourceEndLine: 568};
MERGE (n:KG {id: 'handler:bankp_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'bankp_state', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 166, sourceColumn: 1, sourceEndLine: 169, sourceParameters: '', sourceBody: 'video_control_w(0);'};
MERGE (n:KG {id: 'handler:bankp_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'bankp_state', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 302, sourceColumn: 1, sourceEndLine: 309, sourceParameters: '', sourceBody: 'm_fg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(bankp_state::get_fg_tile_info)), TILEMAP_SCAN_ROWS, 8, 8, 32, 32);
	m_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(bankp_state::get_bg_tile_info)), TILEMAP_SCAN_ROWS, 8, 8, 32, 32);

	m_fg_tilemap->configure_groups(*m_gfxdecode->gfx(0), 0);
	m_bg_tilemap->configure_groups(*m_gfxdecode->gfx(1), 0);'};
MERGE (n:KG {id: 'handler:bankp_state.get_fg_tile_info'}) SET n:Handler SET n += {method: 'get_fg_tile_info', ownerClass: 'bankp_state', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 282, sourceColumn: 1, sourceEndLine: 290, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int const code = m_videoram[0][tile_index] + 256 * (m_colorram[0][tile_index] & 0x03);
	int const color = (m_colorram[0][tile_index] >> 3) | (m_color_hi << 5);
	int const flags = (m_colorram[0][tile_index] & 0x04) ? TILE_FLIPX : 0;

	tileinfo.set(0, code, color, flags);
	tileinfo.group = color & 0x1f;'};
MERGE (n:KG {id: 'handler:bankp_state.get_bg_tile_info'}) SET n:Handler SET n += {method: 'get_bg_tile_info', ownerClass: 'bankp_state', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 292, sourceColumn: 1, sourceEndLine: 300, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int const code = m_videoram[1][tile_index] + 256 * (m_colorram[1][tile_index] & 0x07);
	int const color = (m_colorram[1][tile_index] >> 4) | (m_color_hi << 4);
	int const flags = (m_colorram[1][tile_index] & 0x08) ? TILE_FLIPX : 0;

	tileinfo.set(1, code, color, flags);
	tileinfo.group = color & 0xf;'};
MERGE (n:KG {id: 'device:bankp_state.bankp/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 2578080, config: ['Z80(config, m_maincpu, 15.46848_MHz_XTAL / 6)', 'm_maincpu->set_addrmap(AS_PROGRAM, &bankp_state::prg_map)', 'm_maincpu->set_addrmap(AS_IO, &bankp_state::io_map)', 'm_maincpu->set_vblank_int("screen", FUNC(bankp_state::vblank_interrupt))'], sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 547, sourceColumn: 2, sourceEndLine: 547};
MERGE (n:KG {id: 'device:bankp_state.bankp/maincpu/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'set_vblank_int', operation: 'set_vblank_int', raw: 'm_maincpu->set_vblank_int("screen", FUNC(bankp_state::vblank_interrupt))', ownerTag: 'maincpu', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 550, sourceColumn: 2, sourceEndLine: 550, targetTag: 'screen', targetClass: 'bankp_state', targetMethod: 'vblank_interrupt'};
MERGE (n:KG {id: 'handler:bankp_state.vblank_interrupt'}) SET n:Handler SET n += {method: 'vblank_interrupt', ownerClass: 'bankp_state', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 525, sourceColumn: 1, sourceEndLine: 529, sourceParameters: 'device_t &device', sourceBody: 'if (m_nmi_mask)
		device.execute().pulse_input_line(INPUT_LINE_NMI, attotime::zero);'};
MERGE (n:KG {id: 'device:bankp_state.bankp/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['screen_device &screen(SCREEN(config, "screen", SCREEN_TYPE_RASTER))', 'screen.set_raw(PIXEL_CLOCK, HTOTAL, HBEND, HBSTART, VTOTAL, VBEND, VBSTART)', 'screen.set_screen_update(FUNC(bankp_state::screen_update))', 'screen.set_palette(m_palette)'], sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 553, sourceColumn: 2, sourceEndLine: 553, configCalls: ['set_raw(5156160,330,24,248,256,16,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [5156160, 330, 24, 248, 256, 16, 240]};
MERGE (n:KG {id: 'device:bankp_state.bankp/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'screen.set_screen_update(FUNC(bankp_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 555, sourceColumn: 2, sourceEndLine: 555, targetClass: 'bankp_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:bankp_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'bankp_state', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 318, sourceColumn: 1, sourceEndLine: 359, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'if (!m_display_on)
	{
		bitmap.fill(m_palette->black_pen(), cliprect);
		return 0;
	}

	if (flip_screen())
	{
		m_fg_tilemap->set_scrollx(0, 240 - m_scroll_x);
		m_bg_tilemap->set_scrollx(0, 240);
	}
	else
	{
		m_fg_tilemap->set_scrollx(0, m_scroll_x);
		m_bg_tilemap->set_scrollx(0, 0);
	}

	// only one bit matters?
	switch (m_priority)
	{
	case 0: // combat hawk uses this
		m_bg_tilemap->draw(screen, bitmap, cliprect, TILEMAP_DRAW_OPAQUE);
		m_fg_tilemap->draw(screen, bitmap, cliprect);
		break;
	case 1:
		m_bg_tilemap->draw(screen, bitmap, cliprect, TILEMAP_DRAW_OPAQUE);
		m_fg_tilemap->draw(screen, bitmap, cliprect);
		break;
	case 2:
		m_fg_tilemap->draw(screen, bitmap, cliprect, TILEMAP_DRAW_OPAQUE);
		m_bg_tilemap->draw(screen, bitmap, cliprect);
		break;
	case 3:
		m_fg_tilemap->draw(screen, bitmap, cliprect, TILEMAP_DRAW_OPAQUE); // just a guess
		m_bg_tilemap->draw(screen, bitmap, cliprect);
		break;
	}

	return 0;'};
MERGE (n:KG {id: 'device:bankp_state.bankp/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_bankp)'], sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 558, sourceColumn: 2, sourceEndLine: 558, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:bankp_state.bankp/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(bankp_state::palette), 512, 32)'], sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 559, sourceColumn: 2, sourceEndLine: 559, clockExpr: 'FUNC(bankp_state::palette)'};
MERGE (n:KG {id: 'device:bankp_state.bankp/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 562, sourceColumn: 2, sourceEndLine: 562};
MERGE (n:KG {id: 'device:bankp_state.bankp/sn1'}) SET n:Device SET n += {type: 'SN76489A', tag: 'sn1', clock: 2578080, config: ['SN76489A(config, "sn1", 15.46848_MHz_XTAL / 6).add_route(ALL_OUTPUTS, "mono", 1.0)'], sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 565, sourceColumn: 2, sourceEndLine: 565};
MERGE (n:KG {id: 'audioroute:device:bankp_state.bankp/sn1/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 1, raw: 'SN76489A(config, "sn1", 15.46848_MHz_XTAL / 6).add_route(ALL_OUTPUTS, "mono", 1.0)', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 565, sourceColumn: 2, sourceEndLine: 565};
MERGE (n:KG {id: 'device:bankp_state.bankp/sn2'}) SET n:Device SET n += {type: 'SN76489A', tag: 'sn2', clock: 2578080, config: ['SN76489A(config, "sn2", 15.46848_MHz_XTAL / 6).add_route(ALL_OUTPUTS, "mono", 1.0)'], sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 566, sourceColumn: 2, sourceEndLine: 566};
MERGE (n:KG {id: 'audioroute:device:bankp_state.bankp/sn2/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 1, raw: 'SN76489A(config, "sn2", 15.46848_MHz_XTAL / 6).add_route(ALL_OUTPUTS, "mono", 1.0)', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 566, sourceColumn: 2, sourceEndLine: 566};
MERGE (n:KG {id: 'device:bankp_state.bankp/sn3'}) SET n:Device SET n += {type: 'SN76489A', tag: 'sn3', clock: 2578080, config: ['SN76489A(config, "sn3", 15.46848_MHz_XTAL / 6).add_route(ALL_OUTPUTS, "mono", 1.0)'], sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 567, sourceColumn: 2, sourceEndLine: 567};
MERGE (n:KG {id: 'audioroute:device:bankp_state.bankp/sn3/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 1, raw: 'SN76489A(config, "sn3", 15.46848_MHz_XTAL / 6).add_route(ALL_OUTPUTS, "mono", 1.0)', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 567, sourceColumn: 2, sourceEndLine: 567};
MERGE (n:KG {id: 'inputs:bankp'}) SET n:InputPorts SET n += {name: 'bankp', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 396, sourceColumn: 8, sourceEndLine: 396};
MERGE (n:KG {id: 'inputs:bankp/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:bankp/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:bankp/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_2WAY']};
MERGE (n:KG {id: 'inputs:bankp/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:bankp/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_2WAY']};
MERGE (n:KG {id: 'inputs:bankp/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_BUTTON1'};
MERGE (n:KG {id: 'inputs:bankp/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_COIN1'};
MERGE (n:KG {id: 'inputs:bankp/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_SERVICE1'};
MERGE (n:KG {id: 'inputs:bankp/IN0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_BUTTON2'};
MERGE (n:KG {id: 'inputs:bankp/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:bankp/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:bankp/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_2WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:bankp/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:bankp/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_2WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:bankp/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:bankp/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_START1'};
MERGE (n:KG {id: 'inputs:bankp/IN1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_START2'};
MERGE (n:KG {id: 'inputs:bankp/IN1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_BUTTON2', modifiers: ['PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:bankp/IN2'}) SET n:Port SET n += {tag: 'IN2', modify: false};
MERGE (n:KG {id: 'inputs:bankp/IN2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_BUTTON3'};
MERGE (n:KG {id: 'inputs:bankp/IN2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_BUTTON3', modifiers: ['PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:bankp/IN2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_COIN2'};
MERGE (n:KG {id: 'inputs:bankp/IN2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 248, activeLow: false, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:bankp/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:bankp/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, name: 'Coin Switch 1', defaultValue: 0, location: 'SW1:1,2', settings: ['3=3C 1C', '2=2C 1C', '0=1C 1C', '1=1C 2C']};
MERGE (n:KG {id: 'inputs:bankp/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 4, name: 'Coin Switch 2', defaultValue: 0, location: 'SW1:3', settings: ['4=2C 1C', '0=1C 1C']};
MERGE (n:KG {id: 'inputs:bankp/DSW1/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 8, name: 'Lives', defaultValue: 0, location: 'SW1:4', settings: ['0=3', '8=4']};
MERGE (n:KG {id: 'inputs:bankp/DSW1/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 16, name: 'Bonus Life', defaultValue: 0, location: 'SW1:5', settings: ['0=70K 200K 500K', '16=100K 400K 800K']};
MERGE (n:KG {id: 'inputs:bankp/DSW1/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 32, name: 'Difficulty', defaultValue: 0, location: 'SW1:6', settings: ['0=Easy', '32=Hard']};
MERGE (n:KG {id: 'inputs:bankp/DSW1/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 64, name: 'Demo Sounds', defaultValue: 64, location: 'SW1:7', settings: ['0=Off', '64=On']};
MERGE (n:KG {id: 'inputs:bankp/DSW1/f6'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Cabinet', defaultValue: 128, location: 'SW1:8', settings: ['128=Upright', '0=Cocktail']};
MERGE (n:KG {id: 'gfxlayout:charlayout'}) SET n:GfxLayout SET n += {name: 'charlayout', width: 8, height: 8, total: 1024, planes: 2, planeOffsets: [0, 4], xOffsets: [67, 66, 65, 64, 3, 2, 1, 0], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 128};
MERGE (n:KG {id: 'gfxlayout:charlayout2'}) SET n:GfxLayout SET n += {name: 'charlayout2', width: 8, height: 8, total: 2048, planes: 3, planeOffsets: [0, 131072, 262144], xOffsets: [7, 6, 5, 4, 3, 2, 1, 0], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxdecode:gfx_bankp'}) SET n:GfxDecode SET n += {name: 'gfx_bankp', sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 513, sourceColumn: 8, sourceEndLine: 513};
MERGE (n:KG {id: 'gfxdecode:gfx_bankp/e0'}) SET n:GfxDecodeEntry SET n += {region: 'fgtiles', offset: 0, layout: 'charlayout', colorBase: 0, colorCount: 64, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_bankp/e1'}) SET n:GfxDecodeEntry SET n += {region: 'bgtiles', offset: 0, layout: 'charlayout2', colorBase: 256, colorCount: 32, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:bankp'}), (b:KG {id: 'file:src/mame/sanritsu/bankp.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 673, sourceColumn: 1, sourceEndLine: 673};
MATCH (a:KG {id: 'game:bankp'}), (b:KG {id: 'machine:bankp_state.bankp'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:bankp'}), (b:KG {id: 'inputs:bankp'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:bankp'}), (b:KG {id: 'romset:bankp'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/sanritsu/bankp.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sanritsu/bankp.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sanritsu/bankp.cpp'}), (b:KG {id: 'file:sound/sn76496.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sanritsu/bankp.cpp'}), (b:KG {id: 'file:emupal.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sanritsu/bankp.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sanritsu/bankp.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sanritsu/bankp.cpp'}), (b:KG {id: 'file:tilemap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:bankp_state.bankp'}), (b:KG {id: 'file:src/mame/sanritsu/bankp.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 531, sourceColumn: 1, sourceEndLine: 568};
MATCH (a:KG {id: 'machine:bankp_state.bankp'}), (b:KG {id: 'handler:bankp_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:bankp_state.bankp'}), (b:KG {id: 'handler:bankp_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:bankp_state.bankp'}), (b:KG {id: 'device:bankp_state.bankp/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bankp_state.bankp'}), (b:KG {id: 'device:bankp_state.bankp/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bankp_state.bankp'}), (b:KG {id: 'device:bankp_state.bankp/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bankp_state.bankp'}), (b:KG {id: 'gfxdecode:gfx_bankp'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:bankp_state.bankp'}), (b:KG {id: 'device:bankp_state.bankp/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bankp_state.bankp'}), (b:KG {id: 'device:bankp_state.bankp/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bankp_state.bankp'}), (b:KG {id: 'device:bankp_state.bankp/sn1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bankp_state.bankp'}), (b:KG {id: 'device:bankp_state.bankp/sn2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:bankp_state.bankp'}), (b:KG {id: 'device:bankp_state.bankp/sn3'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:bankp'}), (b:KG {id: 'file:src/mame/sanritsu/bankp.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 396, sourceColumn: 8, sourceEndLine: 396};
MATCH (a:KG {id: 'inputs:bankp'}), (b:KG {id: 'inputs:bankp/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:bankp'}), (b:KG {id: 'inputs:bankp/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:bankp'}), (b:KG {id: 'inputs:bankp/IN2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:bankp'}), (b:KG {id: 'inputs:bankp/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:bankp'}), (b:KG {id: 'file:src/mame/sanritsu/bankp.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 577, sourceColumn: 1, sourceEndLine: 577};
MATCH (a:KG {id: 'romset:bankp'}), (b:KG {id: 'region:bankp/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:bankp'}), (b:KG {id: 'region:bankp/fgtiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:bankp'}), (b:KG {id: 'region:bankp/bgtiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:bankp'}), (b:KG {id: 'region:bankp/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:bankp'}), (b:KG {id: 'region:bankp/user1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:bankp_state.machine_reset'}), (b:KG {id: 'handler:bankp_state.video_control_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:bankp_state.video_start'}), (b:KG {id: 'handler:bankp_state.get_fg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:bankp_state.video_start'}), (b:KG {id: 'handler:bankp_state.get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:bankp_state.bankp/maincpu'}), (b:KG {id: 'device:bankp_state.bankp/maincpu/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:bankp_state.bankp/maincpu'}), (b:KG {id: 'map:bankp_state.prg_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:bankp_state.bankp/maincpu'}), (b:KG {id: 'map:bankp_state.io_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:bankp_state.bankp/screen'}), (b:KG {id: 'device:bankp_state.bankp/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_bankp'}), (b:KG {id: 'file:src/mame/sanritsu/bankp.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 513, sourceColumn: 8, sourceEndLine: 513};
MATCH (a:KG {id: 'gfxdecode:gfx_bankp'}), (b:KG {id: 'gfxdecode:gfx_bankp/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_bankp'}), (b:KG {id: 'gfxdecode:gfx_bankp/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:bankp_state.bankp/sn1'}), (b:KG {id: 'audioroute:device:bankp_state.bankp/sn1/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:bankp_state.bankp/sn2'}), (b:KG {id: 'audioroute:device:bankp_state.bankp/sn2/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:bankp_state.bankp/sn3'}), (b:KG {id: 'audioroute:device:bankp_state.bankp/sn3/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:bankp/IN0'}), (b:KG {id: 'inputs:bankp/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/IN0'}), (b:KG {id: 'inputs:bankp/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/IN0'}), (b:KG {id: 'inputs:bankp/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/IN0'}), (b:KG {id: 'inputs:bankp/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/IN0'}), (b:KG {id: 'inputs:bankp/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/IN0'}), (b:KG {id: 'inputs:bankp/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/IN0'}), (b:KG {id: 'inputs:bankp/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/IN0'}), (b:KG {id: 'inputs:bankp/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/IN1'}), (b:KG {id: 'inputs:bankp/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/IN1'}), (b:KG {id: 'inputs:bankp/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/IN1'}), (b:KG {id: 'inputs:bankp/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/IN1'}), (b:KG {id: 'inputs:bankp/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/IN1'}), (b:KG {id: 'inputs:bankp/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/IN1'}), (b:KG {id: 'inputs:bankp/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/IN1'}), (b:KG {id: 'inputs:bankp/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/IN1'}), (b:KG {id: 'inputs:bankp/IN1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/IN2'}), (b:KG {id: 'inputs:bankp/IN2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/IN2'}), (b:KG {id: 'inputs:bankp/IN2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/IN2'}), (b:KG {id: 'inputs:bankp/IN2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/IN2'}), (b:KG {id: 'inputs:bankp/IN2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/DSW1'}), (b:KG {id: 'inputs:bankp/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/DSW1'}), (b:KG {id: 'inputs:bankp/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/DSW1'}), (b:KG {id: 'inputs:bankp/DSW1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/DSW1'}), (b:KG {id: 'inputs:bankp/DSW1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/DSW1'}), (b:KG {id: 'inputs:bankp/DSW1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/DSW1'}), (b:KG {id: 'inputs:bankp/DSW1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:bankp/DSW1'}), (b:KG {id: 'inputs:bankp/DSW1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:bankp/maincpu'}), (b:KG {id: 'rom:bankp/maincpu/epr-6175.7e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bankp/maincpu'}), (b:KG {id: 'rom:bankp/maincpu/epr-6174.7f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bankp/maincpu'}), (b:KG {id: 'rom:bankp/maincpu/epr-6173.7h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bankp/maincpu'}), (b:KG {id: 'rom:bankp/maincpu/epr-6176.7d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bankp/fgtiles'}), (b:KG {id: 'rom:bankp/fgtiles/epr-6165.5l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bankp/fgtiles'}), (b:KG {id: 'rom:bankp/fgtiles/epr-6166.5k'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bankp/bgtiles'}), (b:KG {id: 'rom:bankp/bgtiles/epr-6172.5b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bankp/bgtiles'}), (b:KG {id: 'rom:bankp/bgtiles/epr-6171.5d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bankp/bgtiles'}), (b:KG {id: 'rom:bankp/bgtiles/epr-6170.5e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bankp/bgtiles'}), (b:KG {id: 'rom:bankp/bgtiles/epr-6169.5f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bankp/bgtiles'}), (b:KG {id: 'rom:bankp/bgtiles/epr-6168.5h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bankp/bgtiles'}), (b:KG {id: 'rom:bankp/bgtiles/epr-6167.5i'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bankp/proms'}), (b:KG {id: 'rom:bankp/proms/pr-6177.8a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bankp/proms'}), (b:KG {id: 'rom:bankp/proms/pr-6178.6f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bankp/proms'}), (b:KG {id: 'rom:bankp/proms/pr-6179.5a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bankp/user1'}), (b:KG {id: 'rom:bankp/user1/315-5074.2c.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:bankp/user1'}), (b:KG {id: 'rom:bankp/user1/315-5073.pal16l4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'device:bankp_state.bankp/maincpu/callback:maincpu:0'}), (b:KG {id: 'handler:bankp_state.vblank_interrupt'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:bankp_state.prg_map'}), (b:KG {id: 'file:src/mame/sanritsu/bankp.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 368, sourceColumn: 1, sourceEndLine: 376};
MATCH (a:KG {id: 'map:bankp_state.prg_map'}), (b:KG {id: 'map:bankp_state.prg_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bankp_state.prg_map'}), (b:KG {id: 'map:bankp_state.prg_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bankp_state.prg_map'}), (b:KG {id: 'map:bankp_state.prg_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bankp_state.prg_map'}), (b:KG {id: 'map:bankp_state.prg_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bankp_state.prg_map'}), (b:KG {id: 'map:bankp_state.prg_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bankp_state.prg_map'}), (b:KG {id: 'map:bankp_state.prg_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bankp_state.io_map'}), (b:KG {id: 'file:src/mame/sanritsu/bankp.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sanritsu/bankp.cpp', sourceLine: 378, sourceColumn: 1, sourceEndLine: 387};
MATCH (a:KG {id: 'map:bankp_state.io_map'}), (b:KG {id: 'map:bankp_state.io_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bankp_state.io_map'}), (b:KG {id: 'map:bankp_state.io_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bankp_state.io_map'}), (b:KG {id: 'map:bankp_state.io_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bankp_state.io_map'}), (b:KG {id: 'map:bankp_state.io_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bankp_state.io_map'}), (b:KG {id: 'map:bankp_state.io_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:bankp_state.io_map'}), (b:KG {id: 'map:bankp_state.io_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:bankp_state.bankp/screen/callback:screen:0'}), (b:KG {id: 'handler:bankp_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_bankp/e0'}), (b:KG {id: 'gfxlayout:charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_bankp/e1'}), (b:KG {id: 'gfxlayout:charlayout2'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'map:bankp_state.prg_map/range2'}), (b:KG {id: 'handler:bankp_state.videoram_w_0'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:bankp_state.prg_map/range3'}), (b:KG {id: 'handler:bankp_state.colorram_w_0'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:bankp_state.prg_map/range4'}), (b:KG {id: 'handler:bankp_state.videoram_w_1'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:bankp_state.prg_map/range5'}), (b:KG {id: 'handler:bankp_state.colorram_w_1'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:bankp_state.io_map/range0'}), (b:KG {id: 'handler:sn76489a_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'sn1'};
MATCH (a:KG {id: 'map:bankp_state.io_map/range1'}), (b:KG {id: 'handler:sn76489a_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'sn2'};
MATCH (a:KG {id: 'map:bankp_state.io_map/range2'}), (b:KG {id: 'handler:sn76489a_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'sn3'};
MATCH (a:KG {id: 'map:bankp_state.io_map/range4'}), (b:KG {id: 'handler:bankp_state.scroll_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:bankp_state.io_map/range5'}), (b:KG {id: 'handler:bankp_state.video_control_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'gfxlayout:charlayout'}), (b:KG {id: 'file:src/mame/sanritsu/bankp.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:charlayout2'}), (b:KG {id: 'file:src/mame/sanritsu/bankp.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
