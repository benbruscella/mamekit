// mamekit knowledge graph — driver src/mame/phoenix/phoenix.cpp
// generated 2026-09-05T03:49:56.459Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/phoenix/phoenix.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/phoenix/phoenix.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:phoenix.h'}) SET n:SourceFile SET n += {path: 'phoenix.h', external: true};
MERGE (n:KG {id: 'file:phoenix_a.h'}) SET n:SourceFile SET n += {path: 'phoenix_a.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:cpu/i8085/i8085.h'}) SET n:SourceFile SET n += {path: 'cpu/i8085/i8085.h', external: true};
MERGE (n:KG {id: 'file:sound/ay8910.h'}) SET n:SourceFile SET n += {path: 'sound/ay8910.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:src/mame/phoenix/phoenix_v.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/phoenix/phoenix_v.cpp'};
MERGE (n:KG {id: 'file:video/resnet.h'}) SET n:SourceFile SET n += {path: 'video/resnet.h', external: true};
MERGE (n:KG {id: 'game:phoenix'}) SET n:Game SET n += {name: 'phoenix', year: '1980', company: 'Amstar', fullname: 'Phoenix (Amstar, set 1)', monitor: 'ROT90', cls: 'phoenix_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 1848, sourceColumn: 1, sourceEndLine: 1848};
MERGE (n:KG {id: 'romset:phoenix'}) SET n:RomSet SET n += {name: 'phoenix', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 562, sourceColumn: 1, sourceEndLine: 562};
MERGE (n:KG {id: 'region:phoenix/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 563, sourceColumn: 2, sourceEndLine: 563};
MERGE (n:KG {id: 'rom:phoenix/maincpu/ic45'}) SET n:Rom SET n += {file: 'ic45', offset: 0, size: 2048, crc: '9f68086b', sha1: 'fc3cef299bf03bf0586c4047c6b96ca666846220', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 564, sourceColumn: 2, sourceEndLine: 564};
MERGE (n:KG {id: 'rom:phoenix/maincpu/ic46'}) SET n:Rom SET n += {file: 'ic46', offset: 2048, size: 2048, crc: '273a4a82', sha1: '6f3019a074e73ff50ceb92f655fcf15659f34919', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 565, sourceColumn: 2, sourceEndLine: 565};
MERGE (n:KG {id: 'rom:phoenix/maincpu/ic47'}) SET n:Rom SET n += {file: 'ic47', offset: 4096, size: 2048, crc: '3d4284b9', sha1: '6e69f8f0d537fe89140cd95d2398531d7e93d102', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 566, sourceColumn: 2, sourceEndLine: 566};
MERGE (n:KG {id: 'rom:phoenix/maincpu/ic48'}) SET n:Rom SET n += {file: 'ic48', offset: 6144, size: 2048, crc: 'cb5d9915', sha1: '49bcf55a5721cfcc02c3b811a4b601e35ea576db', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 567, sourceColumn: 2, sourceEndLine: 567};
MERGE (n:KG {id: 'rom:phoenix/maincpu/h5-ic49.5a'}) SET n:Rom SET n += {file: 'h5-ic49.5a', offset: 8192, size: 2048, crc: 'a105e4e7', sha1: 'b35142a91b6b7fdf7535202671793393c9f4685f', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 568, sourceColumn: 2, sourceEndLine: 568};
MERGE (n:KG {id: 'rom:phoenix/maincpu/h6-ic50.6a'}) SET n:Rom SET n += {file: 'h6-ic50.6a', offset: 10240, size: 2048, crc: 'ac5e9ec1', sha1: '0402e5241d99759d804291998efd43f37ce99917', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 569, sourceColumn: 2, sourceEndLine: 569};
MERGE (n:KG {id: 'rom:phoenix/maincpu/h7-ic51.7a'}) SET n:Rom SET n += {file: 'h7-ic51.7a', offset: 12288, size: 2048, crc: '2eab35b4', sha1: '849bf8273317cc869bdd67e50c68399ee8ece81d', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 570, sourceColumn: 2, sourceEndLine: 570};
MERGE (n:KG {id: 'rom:phoenix/maincpu/h8-ic52.8a'}) SET n:Rom SET n += {file: 'h8-ic52.8a', offset: 14336, size: 2048, crc: 'aff8e9c5', sha1: 'e4164f85ec12d4d9bcbffba27ab1f51b3599f6d0', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 571, sourceColumn: 2, sourceEndLine: 571};
MERGE (n:KG {id: 'region:phoenix/bgtiles'}) SET n:RomRegion SET n += {tag: 'bgtiles', size: 4096, flags: '0', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 573, sourceColumn: 2, sourceEndLine: 573};
MERGE (n:KG {id: 'rom:phoenix/bgtiles/ic23.3d'}) SET n:Rom SET n += {file: 'ic23.3d', offset: 0, size: 2048, crc: '3c7e623f', sha1: 'e7ff5fc371664af44785c079e92eeb2d8530187b', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 574, sourceColumn: 2, sourceEndLine: 574};
MERGE (n:KG {id: 'rom:phoenix/bgtiles/ic24.4d'}) SET n:Rom SET n += {file: 'ic24.4d', offset: 2048, size: 2048, crc: '59916d3b', sha1: '71aec70a8e096ed1f0c2297b3ae7dca1b8ecc38d', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 575, sourceColumn: 2, sourceEndLine: 575};
MERGE (n:KG {id: 'region:phoenix/fgtiles'}) SET n:RomRegion SET n += {tag: 'fgtiles', size: 4096, flags: '0', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 577, sourceColumn: 2, sourceEndLine: 577};
MERGE (n:KG {id: 'rom:phoenix/fgtiles/b1-ic39.3b'}) SET n:Rom SET n += {file: 'b1-ic39.3b', offset: 0, size: 2048, crc: '53413e8f', sha1: 'd772358505b973b10da840d204afb210c0c746ec', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 578, sourceColumn: 2, sourceEndLine: 578};
MERGE (n:KG {id: 'rom:phoenix/fgtiles/b2-ic40.4b'}) SET n:Rom SET n += {file: 'b2-ic40.4b', offset: 2048, size: 2048, crc: '0be2ba91', sha1: 'af9243ee23377b632b9b7d0b84d341d06bf22480', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 579, sourceColumn: 2, sourceEndLine: 579};
MERGE (n:KG {id: 'region:phoenix/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 512, flags: '0', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 581, sourceColumn: 2, sourceEndLine: 581};
MERGE (n:KG {id: 'rom:phoenix/proms/mmi6301.ic40'}) SET n:Rom SET n += {file: 'mmi6301.ic40', offset: 0, size: 256, crc: '79350b25', sha1: '57411be4c1d89677f7919ae295446da90612c8a8', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 582, sourceColumn: 2, sourceEndLine: 582};
MERGE (n:KG {id: 'rom:phoenix/proms/mmi6301.ic41'}) SET n:Rom SET n += {file: 'mmi6301.ic41', offset: 256, size: 256, crc: 'e176b768', sha1: 'e2184dd495ed579f10b6da0b78379e02d7a6229f', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 583, sourceColumn: 2, sourceEndLine: 583};
MERGE (n:KG {id: 'map:phoenix_state.phoenix_memory_map'}) SET n:AddressMap SET n += {cls: 'phoenix_state', name: 'phoenix_memory_map', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 65, sourceColumn: 1, sourceEndLine: 75};
MERGE (n:KG {id: 'map:phoenix_state.phoenix_memory_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 16383, raw: 'map(0x0000, 0x3fff).rom()', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 67, sourceColumn: 2, sourceEndLine: 67, rom: true};
MERGE (n:KG {id: 'map:phoenix_state.phoenix_memory_map/range1'}) SET n:AddressRange SET n += {start: 16384, end: 20479, raw: 'map(0x4000, 0x4fff).bankr("bank1").w(FUNC(phoenix_state::phoenix_videoram_w))', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 68, sourceColumn: 2, sourceEndLine: 68, bankRead: 'bank1'};
MERGE (n:KG {id: 'handler:phoenix_state.phoenix_videoram_w'}) SET n:Handler SET n += {method: 'phoenix_videoram_w', ownerClass: 'phoenix_state', sourceFile: 'src/mame/phoenix/phoenix_v.cpp', sourceLine: 214, sourceColumn: 1, sourceEndLine: 230, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'uint8_t *rom = memregion("maincpu")->base();

	m_videoram_pg[m_videoram_pg_index][offset] = data;

	if ((offset & 0x7ff) < 0x340)
	{
		if (offset & 0x800)
			m_bg_tilemap->mark_tile_dirty(offset & 0x3ff);
		else
			m_fg_tilemap->mark_tile_dirty(offset & 0x3ff);
	}

	/* as part of the protection, Survival executes code from $43a4 */
	rom[offset + 0x4000] = data;'};
MERGE (n:KG {id: 'map:phoenix_state.phoenix_memory_map/range2'}) SET n:AddressRange SET n += {start: 20480, end: 21503, raw: 'map(0x5000, 0x53ff).w(FUNC(phoenix_state::phoenix_videoreg_w))', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 69, sourceColumn: 2, sourceEndLine: 69};
MERGE (n:KG {id: 'handler:phoenix_state.phoenix_videoreg_w'}) SET n:Handler SET n += {method: 'phoenix_videoreg_w', ownerClass: 'phoenix_state', sourceFile: 'src/mame/phoenix/phoenix_v.cpp', sourceLine: 233, sourceColumn: 1, sourceEndLine: 253, sourceParameters: 'uint8_t data', sourceBody: 'if (m_videoram_pg_index != (data & 1))
	{
		/* set memory bank */
		m_videoram_pg_index = data & 1;
		membank("bank1")->set_entry(m_videoram_pg_index);

		m_cocktail_mode = m_videoram_pg_index && (ioport("CAB")->read() & 0x01);

		machine().tilemap().set_flip_all(m_cocktail_mode ? (TILEMAP_FLIPX | TILEMAP_FLIPY) : 0);
		machine().tilemap().mark_all_dirty();
	}

	/* Phoenix has only one palette select effecting both layers */
	if (m_palette_bank != ((data >> 1) & 1))
	{
		m_palette_bank = (data >> 1) & 1;
		machine().tilemap().mark_all_dirty();
	}'};
MERGE (n:KG {id: 'map:phoenix_state.phoenix_memory_map/range3'}) SET n:AddressRange SET n += {start: 22528, end: 23551, raw: 'map(0x5800, 0x5bff).w(FUNC(phoenix_state::phoenix_scroll_w))', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 70, sourceColumn: 2, sourceEndLine: 70};
MERGE (n:KG {id: 'handler:phoenix_state.phoenix_scroll_w'}) SET n:Handler SET n += {method: 'phoenix_scroll_w', ownerClass: 'phoenix_state', sourceFile: 'src/mame/phoenix/phoenix_v.cpp', sourceLine: 286, sourceColumn: 1, sourceEndLine: 289, sourceParameters: 'uint8_t data', sourceBody: 'm_bg_tilemap->set_scrollx(0,data);'};
MERGE (n:KG {id: 'map:phoenix_state.phoenix_memory_map/range4'}) SET n:AddressRange SET n += {start: 24576, end: 25599, raw: 'map(0x6000, 0x63ff).w("cust", FUNC(phoenix_sound_device::control_a_w))', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 71, sourceColumn: 2, sourceEndLine: 71};
MERGE (n:KG {id: 'handler:phoenix_sound_device.control_a_w'}) SET n:Handler SET n += {method: 'control_a_w', ownerClass: 'phoenix_sound_device', sourceFile: 'src/mame/phoenix/phoenix_a.cpp', sourceLine: 497, sourceColumn: 1, sourceEndLine: 508, sourceParameters: 'uint8_t data', sourceBody: 'm_discrete->write(PHOENIX_EFFECT_2_DATA, data & 0x0f);
	m_discrete->write(PHOENIX_EFFECT_2_FREQ, (data & 0x30) >> 4);
#if 0
	/* future handling of noise sounds */
	m_discrete->write(PHOENIX_EFFECT_3_EN  , data & 0x40);
	m_discrete->write(PHOENIX_EFFECT_4_EN  , data & 0x80);
#endif
	m_channel->update();
	m_sound_latch_a = data;'};
MERGE (n:KG {id: 'map:phoenix_state.phoenix_memory_map/range5'}) SET n:AddressRange SET n += {start: 26624, end: 27647, raw: 'map(0x6800, 0x6bff).w("cust", FUNC(phoenix_sound_device::control_b_w))', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 72, sourceColumn: 2, sourceEndLine: 72};
MERGE (n:KG {id: 'handler:phoenix_sound_device.control_b_w'}) SET n:Handler SET n += {method: 'control_b_w', ownerClass: 'phoenix_sound_device', sourceFile: 'src/mame/phoenix/phoenix_a.cpp', sourceLine: 510, sourceColumn: 1, sourceEndLine: 518, sourceConstants: ['MM6221AA=21'], sourceParameters: 'uint8_t data', sourceBody: 'm_discrete->write(PHOENIX_EFFECT_1_DATA, data & 0x0f);
	m_discrete->write(PHOENIX_EFFECT_1_FILT, data & 0x20);
	m_discrete->write(PHOENIX_EFFECT_1_FREQ, data & 0x10);

	/* update the tune that the MM6221AA is playing */
	m_tms->mm6221aa_tune_w(data >> 6);'};
MERGE (n:KG {id: 'map:phoenix_state.phoenix_memory_map/range6'}) SET n:AddressRange SET n += {start: 28672, end: 29695, raw: 'map(0x7000, 0x73ff).portr("IN0")', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 73, sourceColumn: 2, sourceEndLine: 73, portRead: 'IN0'};
MERGE (n:KG {id: 'map:phoenix_state.phoenix_memory_map/range7'}) SET n:AddressRange SET n += {start: 30720, end: 31743, raw: 'map(0x7800, 0x7bff).portr("DSW0")', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 74, sourceColumn: 2, sourceEndLine: 74, portRead: 'DSW0'};
MERGE (n:KG {id: 'machine:phoenix_state.phoenix'}) SET n:MachineConfig SET n += {cls: 'phoenix_state', name: 'phoenix', calls: [], stateMembers: ['{"name":"m_videoram_pg_index","bits":8}', '{"name":"m_palette_bank","bits":8}', '{"name":"m_cocktail_mode","bits":8}', '{"name":"m_pleiads_protection_question","bits":8}', '{"name":"m_survival_protection_value","bits":8}', '{"name":"m_survival_sid_value","bits":32,"signed":true}', '{"name":"m_survival_input_latches","bits":8,"arrayLength":2}', '{"name":"m_survival_input_readc","bits":8}'], startHandlers: ['phoenix_state.video_start'], sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 455, sourceColumn: 1, sourceEndLine: 482};
MERGE (n:KG {id: 'handler:phoenix_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'phoenix_state', sourceFile: 'src/mame/phoenix/phoenix_v.cpp', sourceLine: 166, sourceColumn: 1, sourceEndLine: 206, sourceParameters: '', sourceBody: 'm_videoram_pg[0] = std::make_unique<uint8_t[]>(0x1000);
	memset(m_videoram_pg[0].get(), 0x00, 0x1000 * sizeof(uint8_t));
	m_videoram_pg[1] = std::make_unique<uint8_t[]>(0x1000);
	memset(m_videoram_pg[1].get(), 0x00, 0x1000 * sizeof(uint8_t));

	membank("bank1")->configure_entry(0, m_videoram_pg[0].get());
	membank("bank1")->configure_entry(1, m_videoram_pg[1].get());
	membank("bank1")->set_entry(0);

	m_videoram_pg_index = 0;
	m_palette_bank = 0;
	m_cocktail_mode = 0;

	m_fg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(phoenix_state::get_fg_tile_info)), TILEMAP_SCAN_ROWS, 8, 8, 32, 32);
	m_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(phoenix_state::get_bg_tile_info)), TILEMAP_SCAN_ROWS, 8, 8, 32, 32);

	m_fg_tilemap->set_transparent_pen(0);

	save_pointer(NAME(m_videoram_pg[0]), 0x1000);
	save_pointer(NAME(m_videoram_pg[1]), 0x1000);
	save_item(NAME(m_videoram_pg_index));
	save_item(NAME(m_palette_bank));
	save_item(NAME(m_cocktail_mode));

	/* some more candidates */
	m_pleiads_protection_question = 0;
	m_survival_protection_value = 0;
	m_survival_sid_value = 0;
	m_survival_input_readc = 0;
	m_survival_input_latches[0] = 0;
	m_survival_input_latches[1] = 0;

	save_item(NAME(m_pleiads_protection_question));
	save_item(NAME(m_survival_protection_value));
	save_item(NAME(m_survival_sid_value));
	save_item(NAME(m_survival_input_readc));
	save_item(NAME(m_survival_input_latches));'};
MERGE (n:KG {id: 'handler:phoenix_state.get_fg_tile_info'}) SET n:Handler SET n += {method: 'get_fg_tile_info', ownerClass: 'phoenix_state', sourceFile: 'src/mame/phoenix/phoenix_v.cpp', sourceLine: 134, sourceColumn: 1, sourceEndLine: 145, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int code, col;

	code = m_videoram_pg[m_videoram_pg_index][tile_index];
	col = (code >> 5);
	col = col | 0x08 | (m_palette_bank << 4);
	tileinfo.set(1,
			code,
			col,
			0);'};
MERGE (n:KG {id: 'handler:phoenix_state.get_bg_tile_info'}) SET n:Handler SET n += {method: 'get_bg_tile_info', ownerClass: 'phoenix_state', sourceFile: 'src/mame/phoenix/phoenix_v.cpp', sourceLine: 147, sourceColumn: 1, sourceEndLine: 158, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int code, col;

	code = m_videoram_pg[m_videoram_pg_index][tile_index + 0x800];
	col = (code >> 5);
	col = col | 0x00 | (m_palette_bank << 4);
	tileinfo.set(0,
			code,
			col,
			0);'};
MERGE (n:KG {id: 'bank:phoenix_state.phoenix/bank1/0'}) SET n:MemoryBank SET n += {tag: 'bank1', member: 'bank1', startEntry: 0, entries: 1, entryMember: 'm_videoram_pg[0]', offset: 0, stride: 0, initialEntry: 0, raw: 'membank("bank1")->configure_entry(0, m_videoram_pg[0].get())', sourceFile: 'src/mame/phoenix/phoenix_v.cpp', sourceLine: 166, sourceColumn: 1, sourceEndLine: 206};
MERGE (n:KG {id: 'bank:phoenix_state.phoenix/bank1/1'}) SET n:MemoryBank SET n += {tag: 'bank1', member: 'bank1', startEntry: 1, entries: 1, entryMember: 'm_videoram_pg[1]', offset: 1, stride: 0, initialEntry: 0, raw: 'membank("bank1")->configure_entry(1, m_videoram_pg[1].get())', sourceFile: 'src/mame/phoenix/phoenix_v.cpp', sourceLine: 166, sourceColumn: 1, sourceEndLine: 206};
MERGE (n:KG {id: 'device:phoenix_state.phoenix/maincpu'}) SET n:Device SET n += {type: 'I8085A', tag: 'maincpu', clock: 5500000, config: ['I8085A(config, m_maincpu, CPU_CLOCK)', 'm_maincpu->set_addrmap(AS_PROGRAM, &phoenix_state::phoenix_memory_map)'], sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 458, sourceColumn: 2, sourceEndLine: 458};
MERGE (n:KG {id: 'device:phoenix_state.phoenix/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['screen_device &screen(SCREEN(config, "screen", SCREEN_TYPE_RASTER))', 'screen.set_raw(PIXEL_CLOCK, HTOTAL, HBEND, HBSTART, VTOTAL, VBEND, VBSTART)', 'screen.set_screen_update(FUNC(phoenix_state::screen_update_phoenix))', 'screen.set_palette(m_palette)'], sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 462, sourceColumn: 2, sourceEndLine: 462, configCalls: ['set_raw(5500000,352,0,256,256,0,208)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [5500000, 352, 0, 256, 256, 0, 208], screenRawExpr: ['PIXEL_CLOCK', 'HTOTAL', 'HBEND', 'HBSTART', 'VTOTAL', 'VBEND', 'VBSTART']};
MERGE (n:KG {id: 'device:phoenix_state.phoenix/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'screen.set_screen_update(FUNC(phoenix_state::screen_update_phoenix))', ownerTag: 'screen', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 464, sourceColumn: 2, sourceEndLine: 464, targetClass: 'phoenix_state', targetMethod: 'screen_update_phoenix'};
MERGE (n:KG {id: 'handler:phoenix_state.screen_update_phoenix'}) SET n:Handler SET n += {method: 'screen_update_phoenix', ownerClass: 'phoenix_state', sourceFile: 'src/mame/phoenix/phoenix_v.cpp', sourceLine: 434, sourceColumn: 1, sourceEndLine: 439, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'm_bg_tilemap->draw(screen, bitmap, cliprect, 0,0);
	m_fg_tilemap->draw(screen, bitmap, cliprect, 0,0);
	return 0;'};
MERGE (n:KG {id: 'device:phoenix_state.phoenix/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_phoenix)'], sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 467, sourceColumn: 2, sourceEndLine: 467, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:phoenix_state.phoenix/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(phoenix_state::phoenix_palette), 256)'], sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 468, sourceColumn: 2, sourceEndLine: 468, clockExpr: 'FUNC(phoenix_state::phoenix_palette)'};
MERGE (n:KG {id: 'device:phoenix_state.phoenix/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 471, sourceColumn: 2, sourceEndLine: 471};
MERGE (n:KG {id: 'device:phoenix_state.phoenix/tms'}) SET n:Device SET n += {type: 'TMS36XX', tag: 'tms', clock: 372, config: ['tms36xx_device &tms(TMS36XX(config, "tms", 372))', 'tms.set_subtype(tms36xx_device::subtype::MM6221AA)', 'tms.set_decays(0.50, 0, 0, 1.05, 0, 0)', 'tms.set_tune_speed(0.21)', 'tms.add_route(ALL_OUTPUTS, "mono", 0.5)'], sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 473, sourceColumn: 2, sourceEndLine: 473, configCalls: ['set_decays(0.5,0,0,1.05,0,0)', 'set_tune_speed(0.21)']};
MERGE (n:KG {id: 'audioroute:device:phoenix_state.phoenix/tms/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.5, raw: 'tms.add_route(ALL_OUTPUTS, "mono", 0.5)', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 477, sourceColumn: 2, sourceEndLine: 477};
MERGE (n:KG {id: 'device:phoenix_state.phoenix/cust'}) SET n:Device SET n += {type: 'PHOENIX_SOUND', tag: 'cust', clock: 0, config: ['PHOENIX_SOUND(config, "cust").add_route(ALL_OUTPUTS, "mono", 0.4)'], cls: 'phoenix_sound_device', clsHierarchy: ['phoenix_sound_device'], sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 479, sourceColumn: 2, sourceEndLine: 479};
MERGE (n:KG {id: 'audioroute:device:phoenix_state.phoenix/cust/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.4, raw: 'PHOENIX_SOUND(config, "cust").add_route(ALL_OUTPUTS, "mono", 0.4)', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 479, sourceColumn: 2, sourceEndLine: 479};
MERGE (n:KG {id: 'device:phoenix_state.phoenix/discrete'}) SET n:Device SET n += {type: 'DISCRETE', tag: 'discrete', clock: 120000, config: ['DISCRETE(config, "discrete", 120000, phoenix_discrete).add_route(ALL_OUTPUTS, "mono", 0.6)'], sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 481, sourceColumn: 2, sourceEndLine: 481};
MERGE (n:KG {id: 'audioroute:device:phoenix_state.phoenix/discrete/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.6, raw: 'DISCRETE(config, "discrete", 120000, phoenix_discrete).add_route(ALL_OUTPUTS, "mono", 0.6)', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 481, sourceColumn: 2, sourceEndLine: 481};
MERGE (n:KG {id: 'inputs:phoenix'}) SET n:InputPorts SET n += {name: 'phoenix', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 103, sourceColumn: 8, sourceEndLine: 103};
MERGE (n:KG {id: 'inputs:phoenix/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:phoenix/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_COIN1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:phoenix/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_START1', defaultValue: 2};
MERGE (n:KG {id: 'inputs:phoenix/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_START2', defaultValue: 4};
MERGE (n:KG {id: 'inputs:phoenix/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNUSED', defaultValue: 8};
MERGE (n:KG {id: 'inputs:phoenix/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 240, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_CUSTOM_MEMBER(FUNC(phoenix_state::player_input_r))'], defaultValue: 0};
MERGE (n:KG {id: 'handler:phoenix_state.player_input_r'}) SET n:Handler SET n += {method: 'player_input_r', ownerClass: 'phoenix_state', sourceFile: 'src/mame/phoenix/phoenix_v.cpp', sourceLine: 292, sourceColumn: 1, sourceEndLine: 298, sourceParameters: '', sourceBody: 'if (m_cocktail_mode)
		return (ioport("CTRL")->read() & 0xf0) >> 4;
	else
		return (ioport("CTRL")->read() & 0x0f) >> 0;'};
MERGE (n:KG {id: 'inputs:phoenix/DSW0'}) SET n:Port SET n += {tag: 'DSW0', modify: false};
MERGE (n:KG {id: 'inputs:phoenix/DSW0/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION( "SW1:1,2" )'], name: 'Lives', defaultValue: 0, location: 'SW1:1,2', settings: ['0=3', '1=4', '2=5', '3=6']};
MERGE (n:KG {id: 'inputs:phoenix/DSW0/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 12, modifiers: ['PORT_DIPLOCATION( "SW1:3,4" )'], name: 'Bonus Life', defaultValue: 0, location: 'SW1:3,4', settings: ['0=3K 30K', '4=4K 40K', '8=5K 50K', '12=6K 60K']};
MERGE (n:KG {id: 'inputs:phoenix/DSW0/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 16, modifiers: ['PORT_DIPLOCATION( "SW1:5" )'], name: 'Coinage', defaultValue: 0, location: 'SW1:5', settings: ['16=2C 1C', '0=1C 1C']};
MERGE (n:KG {id: 'inputs:phoenix/DSW0/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 32, modifiers: ['PORT_DIPLOCATION( "SW1:6" )'], name: 'Unknown', defaultValue: 32, location: 'SW1:6', settings: ['32=Off', '0=On']};
MERGE (n:KG {id: 'inputs:phoenix/DSW0/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 64, modifiers: ['PORT_DIPLOCATION( "SW1:7" )'], name: 'Unknown', defaultValue: 64, location: 'SW1:7', settings: ['64=Off', '0=On']};
MERGE (n:KG {id: 'inputs:phoenix/DSW0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("screen", FUNC(screen_device::vblank))'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:phoenix/CAB'}) SET n:Port SET n += {tag: 'CAB', modify: false};
MERGE (n:KG {id: 'inputs:phoenix/CAB/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, modifiers: ['PORT_DIPLOCATION( "SW1:!8" )'], name: 'Cabinet', defaultValue: 0, location: 'SW1:!8', settings: ['0=Upright', '1=Cocktail']};
MERGE (n:KG {id: 'inputs:phoenix/CTRL'}) SET n:Port SET n += {tag: 'CTRL', modify: false};
MERGE (n:KG {id: 'inputs:phoenix/CTRL/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:phoenix/CTRL/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_2WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:phoenix/CTRL/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_2WAY'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:phoenix/CTRL/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_BUTTON2', defaultValue: 8};
MERGE (n:KG {id: 'inputs:phoenix/CTRL/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL', 'PORT_CONDITION("CAB",0x01,EQUALS,0x01)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:phoenix/CTRL/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_2WAY', 'PORT_COCKTAIL', 'PORT_CONDITION("CAB",0x01,EQUALS,0x01)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:phoenix/CTRL/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_2WAY', 'PORT_COCKTAIL', 'PORT_CONDITION("CAB",0x01,EQUALS,0x01)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:phoenix/CTRL/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_COCKTAIL', 'PORT_CONDITION("CAB",0x01,EQUALS,0x01)'], defaultValue: 128};
MERGE (n:KG {id: 'gfxlayout:charlayout'}) SET n:GfxLayout SET n += {name: 'charlayout', width: 8, height: 8, total: 256, planes: 2, planeOffsets: [16384, 0], xOffsets: [7, 6, 5, 4, 3, 2, 1, 0], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxdecode:gfx_phoenix'}) SET n:GfxDecode SET n += {name: 'gfx_phoenix', sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 444, sourceColumn: 8, sourceEndLine: 444};
MERGE (n:KG {id: 'gfxdecode:gfx_phoenix/e0'}) SET n:GfxDecodeEntry SET n += {region: 'bgtiles', offset: 0, layout: 'charlayout', colorBase: 0, colorCount: 32, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_phoenix/e1'}) SET n:GfxDecodeEntry SET n += {region: 'fgtiles', offset: 0, layout: 'charlayout', colorBase: 0, colorCount: 32, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'device:phoenix_state.phoenix/palette/callback:palette_init'}) SET n:Callback SET n += {signal: 'palette_init', operation: 'palette_init', raw: 'PALETTE(config, m_palette, FUNC(phoenix_state::phoenix_palette), 256)', ownerTag: 'palette', targetClass: 'phoenix_state', targetMethod: 'phoenix_palette', entries: 256, sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 468};
MERGE (n:KG {id: 'handler:phoenix_state.phoenix_palette'}) SET n:Handler SET n += {method: 'phoenix_palette', ownerClass: 'phoenix_state', sourceFile: 'src/mame/phoenix/phoenix_v.cpp', sourceLine: 80, sourceColumn: 1, sourceEndLine: 94, sourceParameters: 'palette_device &palette', sourceBody: 'uint8_t const *const color_prom = memregion("proms")->base();

	std::vector<rgb_t> rgb;
	compute_res_net_all(rgb, color_prom, phoenix_decode_info, phoenix_net_info);

	// native order
	for (int i = 0; i < 256; i++)
	{
		int const col = bitswap<7>(i, 6, 5, 1, 0, 4, 3, 2);
		palette.set_pen_color(i, rgb[col]);
	}
	palette.palette()->normalize_range(0, 255);'};
MATCH (a:KG {id: 'game:phoenix'}), (b:KG {id: 'file:src/mame/phoenix/phoenix.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 1848, sourceColumn: 1, sourceEndLine: 1848};
MATCH (a:KG {id: 'game:phoenix'}), (b:KG {id: 'machine:phoenix_state.phoenix'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:phoenix'}), (b:KG {id: 'inputs:phoenix'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:phoenix'}), (b:KG {id: 'romset:phoenix'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/phoenix/phoenix.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/phoenix/phoenix.cpp'}), (b:KG {id: 'file:phoenix.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/phoenix/phoenix.cpp'}), (b:KG {id: 'file:phoenix_a.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/phoenix/phoenix.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/phoenix/phoenix.cpp'}), (b:KG {id: 'file:cpu/i8085/i8085.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/phoenix/phoenix.cpp'}), (b:KG {id: 'file:sound/ay8910.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/phoenix/phoenix.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/phoenix/phoenix.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:phoenix_state.phoenix'}), (b:KG {id: 'file:src/mame/phoenix/phoenix.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 455, sourceColumn: 1, sourceEndLine: 482};
MATCH (a:KG {id: 'machine:phoenix_state.phoenix'}), (b:KG {id: 'handler:phoenix_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:phoenix_state.phoenix'}), (b:KG {id: 'bank:phoenix_state.phoenix/bank1/0'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:phoenix_state.phoenix'}), (b:KG {id: 'bank:phoenix_state.phoenix/bank1/1'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:phoenix_state.phoenix'}), (b:KG {id: 'device:phoenix_state.phoenix/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:phoenix_state.phoenix'}), (b:KG {id: 'device:phoenix_state.phoenix/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:phoenix_state.phoenix'}), (b:KG {id: 'device:phoenix_state.phoenix/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:phoenix_state.phoenix'}), (b:KG {id: 'gfxdecode:gfx_phoenix'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:phoenix_state.phoenix'}), (b:KG {id: 'device:phoenix_state.phoenix/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:phoenix_state.phoenix'}), (b:KG {id: 'device:phoenix_state.phoenix/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:phoenix_state.phoenix'}), (b:KG {id: 'device:phoenix_state.phoenix/tms'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:phoenix_state.phoenix'}), (b:KG {id: 'device:phoenix_state.phoenix/cust'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:phoenix_state.phoenix'}), (b:KG {id: 'device:phoenix_state.phoenix/discrete'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:phoenix'}), (b:KG {id: 'file:src/mame/phoenix/phoenix.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 103, sourceColumn: 8, sourceEndLine: 103};
MATCH (a:KG {id: 'inputs:phoenix'}), (b:KG {id: 'inputs:phoenix/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:phoenix'}), (b:KG {id: 'inputs:phoenix/DSW0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:phoenix'}), (b:KG {id: 'inputs:phoenix/CAB'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:phoenix'}), (b:KG {id: 'inputs:phoenix/CTRL'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:phoenix'}), (b:KG {id: 'file:src/mame/phoenix/phoenix.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 562, sourceColumn: 1, sourceEndLine: 562};
MATCH (a:KG {id: 'romset:phoenix'}), (b:KG {id: 'region:phoenix/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:phoenix'}), (b:KG {id: 'region:phoenix/bgtiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:phoenix'}), (b:KG {id: 'region:phoenix/fgtiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:phoenix'}), (b:KG {id: 'region:phoenix/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:phoenix_state.video_start'}), (b:KG {id: 'handler:phoenix_state.get_fg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:phoenix_state.video_start'}), (b:KG {id: 'handler:phoenix_state.get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'bank:phoenix_state.phoenix/bank1/0'}), (b:KG {id: 'file:src/mame/phoenix/phoenix_v.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/phoenix/phoenix_v.cpp', sourceLine: 166, sourceColumn: 1, sourceEndLine: 206};
MATCH (a:KG {id: 'bank:phoenix_state.phoenix/bank1/1'}), (b:KG {id: 'file:src/mame/phoenix/phoenix_v.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/phoenix/phoenix_v.cpp', sourceLine: 166, sourceColumn: 1, sourceEndLine: 206};
MATCH (a:KG {id: 'device:phoenix_state.phoenix/maincpu'}), (b:KG {id: 'map:phoenix_state.phoenix_memory_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:phoenix_state.phoenix/screen'}), (b:KG {id: 'device:phoenix_state.phoenix/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_phoenix'}), (b:KG {id: 'file:src/mame/phoenix/phoenix.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 444, sourceColumn: 8, sourceEndLine: 444};
MATCH (a:KG {id: 'gfxdecode:gfx_phoenix'}), (b:KG {id: 'gfxdecode:gfx_phoenix/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_phoenix'}), (b:KG {id: 'gfxdecode:gfx_phoenix/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:phoenix_state.phoenix/palette'}), (b:KG {id: 'device:phoenix_state.phoenix/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:phoenix_state.phoenix/tms'}), (b:KG {id: 'audioroute:device:phoenix_state.phoenix/tms/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:phoenix_state.phoenix/cust'}), (b:KG {id: 'audioroute:device:phoenix_state.phoenix/cust/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:phoenix_state.phoenix/discrete'}), (b:KG {id: 'audioroute:device:phoenix_state.phoenix/discrete/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:phoenix/IN0'}), (b:KG {id: 'inputs:phoenix/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:phoenix/IN0'}), (b:KG {id: 'inputs:phoenix/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:phoenix/IN0'}), (b:KG {id: 'inputs:phoenix/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:phoenix/IN0'}), (b:KG {id: 'inputs:phoenix/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:phoenix/IN0'}), (b:KG {id: 'inputs:phoenix/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:phoenix/DSW0'}), (b:KG {id: 'inputs:phoenix/DSW0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:phoenix/DSW0'}), (b:KG {id: 'inputs:phoenix/DSW0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:phoenix/DSW0'}), (b:KG {id: 'inputs:phoenix/DSW0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:phoenix/DSW0'}), (b:KG {id: 'inputs:phoenix/DSW0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:phoenix/DSW0'}), (b:KG {id: 'inputs:phoenix/DSW0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:phoenix/DSW0'}), (b:KG {id: 'inputs:phoenix/DSW0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:phoenix/CAB'}), (b:KG {id: 'inputs:phoenix/CAB/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:phoenix/CTRL'}), (b:KG {id: 'inputs:phoenix/CTRL/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:phoenix/CTRL'}), (b:KG {id: 'inputs:phoenix/CTRL/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:phoenix/CTRL'}), (b:KG {id: 'inputs:phoenix/CTRL/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:phoenix/CTRL'}), (b:KG {id: 'inputs:phoenix/CTRL/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:phoenix/CTRL'}), (b:KG {id: 'inputs:phoenix/CTRL/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:phoenix/CTRL'}), (b:KG {id: 'inputs:phoenix/CTRL/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:phoenix/CTRL'}), (b:KG {id: 'inputs:phoenix/CTRL/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:phoenix/CTRL'}), (b:KG {id: 'inputs:phoenix/CTRL/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:phoenix/maincpu'}), (b:KG {id: 'rom:phoenix/maincpu/ic45'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:phoenix/maincpu'}), (b:KG {id: 'rom:phoenix/maincpu/ic46'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:phoenix/maincpu'}), (b:KG {id: 'rom:phoenix/maincpu/ic47'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:phoenix/maincpu'}), (b:KG {id: 'rom:phoenix/maincpu/ic48'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:phoenix/maincpu'}), (b:KG {id: 'rom:phoenix/maincpu/h5-ic49.5a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:phoenix/maincpu'}), (b:KG {id: 'rom:phoenix/maincpu/h6-ic50.6a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:phoenix/maincpu'}), (b:KG {id: 'rom:phoenix/maincpu/h7-ic51.7a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:phoenix/maincpu'}), (b:KG {id: 'rom:phoenix/maincpu/h8-ic52.8a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:phoenix/bgtiles'}), (b:KG {id: 'rom:phoenix/bgtiles/ic23.3d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:phoenix/bgtiles'}), (b:KG {id: 'rom:phoenix/bgtiles/ic24.4d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:phoenix/fgtiles'}), (b:KG {id: 'rom:phoenix/fgtiles/b1-ic39.3b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:phoenix/fgtiles'}), (b:KG {id: 'rom:phoenix/fgtiles/b2-ic40.4b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:phoenix/proms'}), (b:KG {id: 'rom:phoenix/proms/mmi6301.ic40'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:phoenix/proms'}), (b:KG {id: 'rom:phoenix/proms/mmi6301.ic41'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'file:src/mame/phoenix/phoenix_v.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/phoenix/phoenix_v.cpp'}), (b:KG {id: 'file:phoenix.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/phoenix/phoenix_v.cpp'}), (b:KG {id: 'file:video/resnet.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'map:phoenix_state.phoenix_memory_map'}), (b:KG {id: 'file:src/mame/phoenix/phoenix.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/phoenix/phoenix.cpp', sourceLine: 65, sourceColumn: 1, sourceEndLine: 75};
MATCH (a:KG {id: 'map:phoenix_state.phoenix_memory_map'}), (b:KG {id: 'map:phoenix_state.phoenix_memory_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:phoenix_state.phoenix_memory_map'}), (b:KG {id: 'map:phoenix_state.phoenix_memory_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:phoenix_state.phoenix_memory_map'}), (b:KG {id: 'map:phoenix_state.phoenix_memory_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:phoenix_state.phoenix_memory_map'}), (b:KG {id: 'map:phoenix_state.phoenix_memory_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:phoenix_state.phoenix_memory_map'}), (b:KG {id: 'map:phoenix_state.phoenix_memory_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:phoenix_state.phoenix_memory_map'}), (b:KG {id: 'map:phoenix_state.phoenix_memory_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:phoenix_state.phoenix_memory_map'}), (b:KG {id: 'map:phoenix_state.phoenix_memory_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:phoenix_state.phoenix_memory_map'}), (b:KG {id: 'map:phoenix_state.phoenix_memory_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:phoenix_state.phoenix/screen/callback:screen:0'}), (b:KG {id: 'handler:phoenix_state.screen_update_phoenix'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_phoenix/e0'}), (b:KG {id: 'gfxlayout:charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_phoenix/e1'}), (b:KG {id: 'gfxlayout:charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:phoenix_state.phoenix/palette/callback:palette_init'}), (b:KG {id: 'handler:phoenix_state.phoenix_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:phoenix/IN0/f4'}), (b:KG {id: 'handler:phoenix_state.player_input_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:phoenix_state.phoenix_memory_map/range1'}), (b:KG {id: 'handler:phoenix_state.phoenix_videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:phoenix_state.phoenix_memory_map/range2'}), (b:KG {id: 'handler:phoenix_state.phoenix_videoreg_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:phoenix_state.phoenix_memory_map/range3'}), (b:KG {id: 'handler:phoenix_state.phoenix_scroll_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:phoenix_state.phoenix_memory_map/range4'}), (b:KG {id: 'handler:phoenix_sound_device.control_a_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'cust'};
MATCH (a:KG {id: 'map:phoenix_state.phoenix_memory_map/range5'}), (b:KG {id: 'handler:phoenix_sound_device.control_b_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'cust'};
MATCH (a:KG {id: 'gfxlayout:charlayout'}), (b:KG {id: 'file:src/mame/phoenix/phoenix.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
