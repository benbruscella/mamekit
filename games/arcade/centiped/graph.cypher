// mamekit knowledge graph — driver src/mame/atari/centiped.cpp
// generated 2026-09-05T03:49:22.270Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/atari/centiped.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/atari/centiped.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:centiped.h'}) SET n:SourceFile SET n += {path: 'centiped.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6502/m6502.h'}) SET n:SourceFile SET n += {path: 'cpu/m6502/m6502.h', external: true};
MERGE (n:KG {id: 'file:cpu/s2650/s2650.h'}) SET n:SourceFile SET n += {path: 'cpu/s2650/s2650.h', external: true};
MERGE (n:KG {id: 'file:machine/rescap.h'}) SET n:SourceFile SET n += {path: 'machine/rescap.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:sound/sn76496.h'}) SET n:SourceFile SET n += {path: 'sound/sn76496.h', external: true};
MERGE (n:KG {id: 'file:sound/pokey.h'}) SET n:SourceFile SET n += {path: 'sound/pokey.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'game:centiped'}) SET n:Game SET n += {name: 'centiped', year: '1980', company: 'Atari', fullname: 'Centipede (revision 4)', monitor: 'ROT270', cls: 'centiped_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 2377, sourceColumn: 1, sourceEndLine: 2377};
MERGE (n:KG {id: 'romset:centiped'}) SET n:RomSet SET n += {name: 'centiped', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 2029, sourceColumn: 1, sourceEndLine: 2029};
MERGE (n:KG {id: 'region:centiped/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 2030, sourceColumn: 2, sourceEndLine: 2030};
MERGE (n:KG {id: 'rom:centiped/maincpu/136001-407.d1'}) SET n:Rom SET n += {file: '136001-407.d1', offset: 8192, size: 2048, crc: 'c4d995eb', sha1: 'd0b2f0461cfa35842045d40ffb65e777703b773e', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 2031, sourceColumn: 2, sourceEndLine: 2031};
MERGE (n:KG {id: 'rom:centiped/maincpu/136001-408.e1'}) SET n:Rom SET n += {file: '136001-408.e1', offset: 10240, size: 2048, crc: 'bcdebe1b', sha1: '53f3bf88a79ce40661c0a9381928e55d8c61777a', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 2032, sourceColumn: 2, sourceEndLine: 2032};
MERGE (n:KG {id: 'rom:centiped/maincpu/136001-409.fh1'}) SET n:Rom SET n += {file: '136001-409.fh1', offset: 12288, size: 2048, crc: '66d7b04a', sha1: '8fa758095b618085090491dfb5ea114cdc87f9df', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 2033, sourceColumn: 2, sourceEndLine: 2033};
MERGE (n:KG {id: 'rom:centiped/maincpu/136001-410.j1'}) SET n:Rom SET n += {file: '136001-410.j1', offset: 14336, size: 2048, crc: '33ce4640', sha1: '780c2eb320f64fad6b265c0dada961646ed30174', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 2034, sourceColumn: 2, sourceEndLine: 2034};
MERGE (n:KG {id: 'region:centiped/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 4096, flags: '0', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 2036, sourceColumn: 2, sourceEndLine: 2036};
MERGE (n:KG {id: 'rom:centiped/gfx1/136001-211.f7'}) SET n:Rom SET n += {file: '136001-211.f7', offset: 0, size: 2048, crc: '880acfb9', sha1: '6c862352c329776f2f9974a0df9dbe41f9dbc361', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 2037, sourceColumn: 2, sourceEndLine: 2037};
MERGE (n:KG {id: 'rom:centiped/gfx1/136001-212.hj7'}) SET n:Rom SET n += {file: '136001-212.hj7', offset: 2048, size: 2048, crc: 'b1397029', sha1: '974c03d29aeca672fffa4dfc00a06be6a851aacb', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 2038, sourceColumn: 2, sourceEndLine: 2038};
MERGE (n:KG {id: 'region:centiped/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 256, flags: '0', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 2040, sourceColumn: 2, sourceEndLine: 2040};
MERGE (n:KG {id: 'rom:centiped/proms/136001-213.p4'}) SET n:Rom SET n += {file: '136001-213.p4', offset: 0, size: 256, crc: '6fa3093a', sha1: '2b7aeca74c1ae4156bf1878453a047330f96f0a8', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 2041, sourceColumn: 2, sourceEndLine: 2041};
MERGE (n:KG {id: 'map:centiped_state.centiped_base_map'}) SET n:AddressMap SET n += {cls: 'centiped_state', name: 'centiped_base_map', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 695, sourceColumn: 1, sourceEndLine: 715, globalMask: 16383};
MERGE (n:KG {id: 'map:centiped_state.centiped_base_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 1023, raw: 'map(0x0000, 0x03ff).ram().share("rambase")', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 698, sourceColumn: 2, sourceEndLine: 698, ram: true, share: 'rambase'};
MERGE (n:KG {id: 'map:centiped_state.centiped_base_map/range1'}) SET n:AddressRange SET n += {start: 1024, end: 1983, raw: 'map(0x0400, 0x07bf).ram().w(FUNC(centiped_state::centiped_videoram_w)).share("videoram")', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 699, sourceColumn: 2, sourceEndLine: 699, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'handler:centiped_state.centiped_videoram_w'}) SET n:Handler SET n += {method: 'centiped_videoram_w', ownerClass: 'centiped_state', sourceFile: 'src/mame/atari/centiped_v.cpp', sourceLine: 130, sourceColumn: 1, sourceEndLine: 134, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:centiped_state.centiped_base_map/range2'}) SET n:AddressRange SET n += {start: 1984, end: 2047, raw: 'map(0x07c0, 0x07ff).ram().share("spriteram")', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 700, sourceColumn: 2, sourceEndLine: 700, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:centiped_state.centiped_base_map/range3'}) SET n:AddressRange SET n += {start: 2048, end: 2048, raw: 'map(0x0800, 0x0800).portr("DSW1")', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 701, sourceColumn: 2, sourceEndLine: 701, portRead: 'DSW1'};
MERGE (n:KG {id: 'map:centiped_state.centiped_base_map/range4'}) SET n:AddressRange SET n += {start: 2049, end: 2049, raw: 'map(0x0801, 0x0801).portr("DSW2")', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 702, sourceColumn: 2, sourceEndLine: 702, portRead: 'DSW2'};
MERGE (n:KG {id: 'map:centiped_state.centiped_base_map/range5'}) SET n:AddressRange SET n += {start: 3072, end: 3072, raw: 'map(0x0c00, 0x0c00).r(FUNC(centiped_state::centiped_IN0_r))', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 703, sourceColumn: 2, sourceEndLine: 703};
MERGE (n:KG {id: 'handler:centiped_state.centiped_IN0_r'}) SET n:Handler SET n += {method: 'centiped_IN0_r', ownerClass: 'centiped_state', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 545, sourceColumn: 1, sourceEndLine: 548, sourceParameters: '', sourceBody: 'return read_trackball(0, 0);'};
MERGE (n:KG {id: 'handler:centiped_state.read_trackball'}) SET n:Handler SET n += {method: 'read_trackball', ownerClass: 'centiped_state', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 518, sourceColumn: 1, sourceEndLine: 542, sourceParameters: 'int idx, int switch_port', sourceBody: 'uint8_t newpos;
	static const char *const portnames[] = { "IN0", "IN1", "IN2" };
	static const char *const tracknames[] = { "TRACK0_X", "TRACK0_Y", "TRACK1_X", "TRACK1_Y" };

	/* adjust idx if we\'re cocktail flipped */
	if (m_flipscreen)
		idx += 2;

	/* if we\'re to read the dipswitches behind the trackball data, do it now */
	if (m_dsw_select)
		return (ioport(portnames[switch_port])->read() & 0x7f) | m_sign[idx];

	/* get the new position and adjust the result */
	newpos = ioport(tracknames[idx])->read();
	if (newpos != m_oldpos[idx])
	{
		m_sign[idx] = (newpos - m_oldpos[idx]) & 0x80;
		m_oldpos[idx] = newpos;
	}

	/* blend with the bits from the switch port */
	return (ioport(portnames[switch_port])->read() & 0x70) | (m_oldpos[idx] & 0x0f) | m_sign[idx];'};
MERGE (n:KG {id: 'map:centiped_state.centiped_base_map/range6'}) SET n:AddressRange SET n += {start: 3073, end: 3073, raw: 'map(0x0c01, 0x0c01).portr("IN1")', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 704, sourceColumn: 2, sourceEndLine: 704, portRead: 'IN1'};
MERGE (n:KG {id: 'map:centiped_state.centiped_base_map/range7'}) SET n:AddressRange SET n += {start: 3074, end: 3074, raw: 'map(0x0c02, 0x0c02).r(FUNC(centiped_state::centiped_IN2_r))', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 705, sourceColumn: 2, sourceEndLine: 705};
MERGE (n:KG {id: 'handler:centiped_state.centiped_IN2_r'}) SET n:Handler SET n += {method: 'centiped_IN2_r', ownerClass: 'centiped_state', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 551, sourceColumn: 1, sourceEndLine: 554, sourceParameters: '', sourceBody: 'return read_trackball(1, 2);'};
MERGE (n:KG {id: 'map:centiped_state.centiped_base_map/range8'}) SET n:AddressRange SET n += {start: 3075, end: 3075, raw: 'map(0x0c03, 0x0c03).portr("IN3")', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 706, sourceColumn: 2, sourceEndLine: 706, portRead: 'IN3'};
MERGE (n:KG {id: 'map:centiped_state.centiped_base_map/range9'}) SET n:AddressRange SET n += {start: 5120, end: 5135, raw: 'map(0x1400, 0x140f).w(FUNC(centiped_state::centiped_paletteram_w)).share("paletteram")', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 707, sourceColumn: 2, sourceEndLine: 707, share: 'paletteram'};
MERGE (n:KG {id: 'handler:centiped_state.centiped_paletteram_w'}) SET n:Handler SET n += {method: 'centiped_paletteram_w', ownerClass: 'centiped_state', sourceFile: 'src/mame/atari/centiped_v.cpp', sourceLine: 211, sourceColumn: 1, sourceEndLine: 260, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_paletteram[offset] = data;

	/* bit 2 of the output palette RAM is always pulled high, so we ignore */
	/* any palette changes unless the write is to a palette RAM address */
	/* that is actually used */
	if (offset & 4)
	{
		rgb_t color;

		int r = 0xff * ((~data >> 0) & 1);
		int g = 0xff * ((~data >> 1) & 1);
		int b = 0xff * ((~data >> 2) & 1);

		if (~data & 0x08) /* alternate = 1 */
		{
			/* when blue component is not 0, decrease it. When blue component is 0, */
			/* decrease green component. */
			if (b) b = 0xc0;
			else if (g) g = 0xc0;
		}

		color = rgb_t(r, g, b);

		/* character colors, set directly */
		if ((offset & 0x08) == 0)
			m_palette->set_pen_color(offset & 0x03, color);

		/* sprite colors - set all the applicable ones */
		else
		{
			int i;

			offset = offset & 0x03;

			for (i = 0; i < 0x100; i += 4)
			{
				if (offset == ((i >> 2) & 0x03))
					m_palette->set_pen_color(i + 4 + 1, color);

				if (offset == ((i >> 4) & 0x03))
					m_palette->set_pen_color(i + 4 + 2, color);

				if (offset == ((i >> 6) & 0x03))
					m_palette->set_pen_color(i + 4 + 3, color);
			}
		}
	}'};
MERGE (n:KG {id: 'map:centiped_state.centiped_base_map/range10'}) SET n:AddressRange SET n += {start: 5632, end: 5695, raw: 'map(0x1600, 0x163f).nopr().w(FUNC(centiped_state::earom_write))', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 708, sourceColumn: 2, sourceEndLine: 708, nopr: true};
MERGE (n:KG {id: 'handler:centiped_state.earom_write'}) SET n:Handler SET n += {method: 'earom_write', ownerClass: 'centiped_state', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 674, sourceColumn: 1, sourceEndLine: 678, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_earom->set_address(offset & 0x3f);
	m_earom->set_data(data);'};
MERGE (n:KG {id: 'map:centiped_state.centiped_base_map/range11'}) SET n:AddressRange SET n += {start: 5760, end: 5760, raw: 'map(0x1680, 0x1680).w(FUNC(centiped_state::earom_control_w))', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 709, sourceColumn: 2, sourceEndLine: 709};
MERGE (n:KG {id: 'handler:centiped_state.earom_control_w'}) SET n:Handler SET n += {method: 'earom_control_w', ownerClass: 'centiped_state', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 680, sourceColumn: 1, sourceEndLine: 685, sourceConstants: ['CK=1', 'C1=2', 'C2=4', 'CS1=8', 'CS2=16'], sourceParameters: 'uint8_t data', sourceBody: '// CK = DB0, C1 = /DB1, C2 = DB2, CS1 = DB3, /CS2 = GND
	m_earom->set_control(BIT(data, 3), 1, !BIT(data, 1), BIT(data, 2));
	m_earom->set_clk(BIT(data, 0));'};
MERGE (n:KG {id: 'map:centiped_state.centiped_base_map/range12'}) SET n:AddressRange SET n += {start: 5888, end: 5951, raw: 'map(0x1700, 0x173f).r(FUNC(centiped_state::earom_read))', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 710, sourceColumn: 2, sourceEndLine: 710};
MERGE (n:KG {id: 'handler:centiped_state.earom_read'}) SET n:Handler SET n += {method: 'earom_read', ownerClass: 'centiped_state', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 669, sourceColumn: 1, sourceEndLine: 672, sourceParameters: '', sourceBody: 'return m_earom->data();'};
MERGE (n:KG {id: 'map:centiped_state.centiped_base_map/range13'}) SET n:AddressRange SET n += {start: 6144, end: 6144, raw: 'map(0x1800, 0x1800).w(FUNC(centiped_state::irq_ack_w))', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 711, sourceColumn: 2, sourceEndLine: 711};
MERGE (n:KG {id: 'handler:centiped_state.irq_ack_w'}) SET n:Handler SET n += {method: 'irq_ack_w', ownerClass: 'centiped_state', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 487, sourceColumn: 1, sourceEndLine: 490, sourceParameters: 'uint8_t data', sourceBody: 'm_maincpu->set_input_line(0, CLEAR_LINE);'};
MERGE (n:KG {id: 'map:centiped_state.centiped_base_map/range14'}) SET n:AddressRange SET n += {start: 7168, end: 7175, raw: 'map(0x1c00, 0x1c07).nopr().w("outlatch", FUNC(ls259_device::write_d7))', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 712, sourceColumn: 2, sourceEndLine: 712, nopr: true};
MERGE (n:KG {id: 'handler:ls259_device.write_d7'}) SET n:Handler SET n += {method: 'write_d7', ownerClass: 'ls259_device', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1014, sourceColumn: 2, sourceEndLine: 1014};
MERGE (n:KG {id: 'map:centiped_state.centiped_base_map/range15'}) SET n:AddressRange SET n += {start: 8192, end: 8192, raw: 'map(0x2000, 0x2000).w("watchdog", FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 713, sourceColumn: 2, sourceEndLine: 713};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1015, sourceColumn: 2, sourceEndLine: 1015};
MERGE (n:KG {id: 'map:centiped_state.centiped_base_map/range16'}) SET n:AddressRange SET n += {start: 8192, end: 16383, raw: 'map(0x2000, 0x3fff).rom()', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 714, sourceColumn: 2, sourceEndLine: 714, rom: true};
MERGE (n:KG {id: 'map:centiped_state.centiped_map'}) SET n:AddressMap SET n += {cls: 'centiped_state', name: 'centiped_map', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 718, sourceColumn: 1, sourceEndLine: 722, calls: ['centiped_base_map']};
MERGE (n:KG {id: 'map:centiped_state.centiped_map/range0'}) SET n:AddressRange SET n += {start: 4096, end: 4111, raw: 'map(0x1000, 0x100f).rw("pokey", FUNC(pokey_device::read), FUNC(pokey_device::write))', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 721, sourceColumn: 2, sourceEndLine: 721};
MERGE (n:KG {id: 'handler:pokey_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'pokey_device', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 976, sourceColumn: 2, sourceEndLine: 976};
MERGE (n:KG {id: 'handler:pokey_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'pokey_device', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 976, sourceColumn: 2, sourceEndLine: 976};
MERGE (n:KG {id: 'machine:centiped_state.centiped_base'}) SET n:MachineConfig SET n += {cls: 'centiped_state', name: 'centiped_base', calls: [], stateMembers: ['{"name":"m_gfx_bank","bits":8}', '{"name":"m_oldpos","bits":8,"arrayLength":4}', '{"name":"m_sign","bits":8,"arrayLength":4}', '{"name":"m_dsw_select","bits":8}', '{"name":"m_control_select","bits":8}', '{"name":"m_flipscreen","bits":8}', '{"name":"m_bullsdrt_sprites_bank","bits":8}', '{"name":"m_penmask","bits":8,"arrayLength":64}'], startHandlers: ['centiped_state.video_start_centiped'], sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1775, sourceColumn: 1, sourceEndLine: 1808};
MERGE (n:KG {id: 'handler:centiped_state.video_start_centiped'}) SET n:Handler SET n += {method: 'video_start_centiped', ownerClass: 'centiped_state', sourceFile: 'src/mame/atari/centiped_v.cpp', sourceLine: 88, sourceColumn: 1, sourceEndLine: 94, sourceParameters: '', sourceBody: 'init_common();
	init_penmask();

	m_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(centiped_state::centiped_get_tile_info)), TILEMAP_SCAN_ROWS, 8, 8, 32, 32);'};
MERGE (n:KG {id: 'handler:centiped_state.init_common'}) SET n:Handler SET n += {method: 'init_common', ownerClass: 'centiped_state', sourceFile: 'src/mame/atari/centiped_v.cpp', sourceLine: 76, sourceColumn: 1, sourceEndLine: 85, sourceParameters: '', sourceBody: 'save_item(NAME(m_flipscreen));
	save_item(NAME(m_gfx_bank));
	save_item(NAME(m_bullsdrt_sprites_bank));

	m_flipscreen = 0;
	m_gfx_bank = 0;
	m_bullsdrt_sprites_bank = 0;'};
MERGE (n:KG {id: 'handler:centiped_state.init_penmask'}) SET n:Handler SET n += {method: 'init_penmask', ownerClass: 'centiped_state', sourceFile: 'src/mame/atari/centiped_v.cpp', sourceLine: 63, sourceColumn: 1, sourceEndLine: 73, sourceParameters: '', sourceBody: 'for (int i = 0; i < 64; i++)
	{
		uint8_t mask = 1;
		if (((i >> 0) & 3) == 0) mask |= 2;
		if (((i >> 2) & 3) == 0) mask |= 4;
		if (((i >> 4) & 3) == 0) mask |= 8;
		m_penmask[i] = mask;
	}'};
MERGE (n:KG {id: 'handler:centiped_state.centiped_get_tile_info'}) SET n:Handler SET n += {method: 'centiped_get_tile_info', ownerClass: 'centiped_state', sourceFile: 'src/mame/atari/centiped_v.cpp', sourceLine: 19, sourceColumn: 1, sourceEndLine: 23, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int data = m_videoram[tile_index];
	tileinfo.set(0, (data & 0x3f) + 0x40, 0, TILE_FLIPYX(data >> 6));'};
MERGE (n:KG {id: 'device:centiped_state.centiped_base/maincpu'}) SET n:Device SET n += {type: 'M6502', tag: 'maincpu', clock: 1512000, config: ['M6502(config, m_maincpu, 12096000/8)'], sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1778, sourceColumn: 2, sourceEndLine: 1778};
MERGE (n:KG {id: 'device:centiped_state.centiped_base/earom'}) SET n:Device SET n += {type: 'ER2055', tag: 'earom', clock: null, config: ['ER2055(config, m_earom)']};
MERGE (n:KG {id: 'device:centiped_state.centiped_base/outlatch'}) SET n:Device SET n += {type: 'LS259', tag: 'outlatch', clock: null, config: ['LS259(config, m_outlatch)', 'm_outlatch->q_out_cb<0>().set(FUNC(centiped_state::coin_counter_left_w))', 'm_outlatch->q_out_cb<1>().set(FUNC(centiped_state::coin_counter_center_w))', 'm_outlatch->q_out_cb<2>().set(FUNC(centiped_state::coin_counter_right_w))', 'm_outlatch->q_out_cb<3>().set_output("led0").invert()', 'm_outlatch->q_out_cb<4>().set_output("led1").invert()', 'm_outlatch->q_out_cb<7>().set(FUNC(centiped_state::flip_screen_w))'], sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1784, sourceColumn: 2, sourceEndLine: 1784};
MERGE (n:KG {id: 'device:centiped_state.centiped_base/outlatch/callback:outlatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_outlatch->q_out_cb<0>().set(FUNC(centiped_state::coin_counter_left_w))', ownerTag: 'outlatch', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1785, sourceColumn: 2, sourceEndLine: 1785, slot: '0', targetClass: 'centiped_state', targetMethod: 'coin_counter_left_w'};
MERGE (n:KG {id: 'handler:centiped_state.coin_counter_left_w'}) SET n:Handler SET n += {method: 'coin_counter_left_w', ownerClass: 'centiped_state', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 638, sourceColumn: 1, sourceEndLine: 641, sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(0, state);'};
MERGE (n:KG {id: 'device:centiped_state.centiped_base/outlatch/callback:outlatch:1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_outlatch->q_out_cb<1>().set(FUNC(centiped_state::coin_counter_center_w))', ownerTag: 'outlatch', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1786, sourceColumn: 2, sourceEndLine: 1786, slot: '1', targetClass: 'centiped_state', targetMethod: 'coin_counter_center_w'};
MERGE (n:KG {id: 'handler:centiped_state.coin_counter_center_w'}) SET n:Handler SET n += {method: 'coin_counter_center_w', ownerClass: 'centiped_state', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 644, sourceColumn: 1, sourceEndLine: 647, sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(1, state);'};
MERGE (n:KG {id: 'device:centiped_state.centiped_base/outlatch/callback:outlatch:2'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_outlatch->q_out_cb<2>().set(FUNC(centiped_state::coin_counter_right_w))', ownerTag: 'outlatch', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1787, sourceColumn: 2, sourceEndLine: 1787, slot: '2', targetClass: 'centiped_state', targetMethod: 'coin_counter_right_w'};
MERGE (n:KG {id: 'handler:centiped_state.coin_counter_right_w'}) SET n:Handler SET n += {method: 'coin_counter_right_w', ownerClass: 'centiped_state', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 650, sourceColumn: 1, sourceEndLine: 653, sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(2, state);'};
MERGE (n:KG {id: 'device:centiped_state.centiped_base/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog").set_vblank_count("screen", 8)'], sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1791, sourceColumn: 2, sourceEndLine: 1791};
MERGE (n:KG {id: 'device:centiped_state.centiped_base/32v'}) SET n:Device SET n += {type: 'TIMER', tag: '32v', clock: null, config: ['TIMER(config, "32v").configure_scanline(FUNC(centiped_state::generate_interrupt), "screen", 0, 16)'], sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1794, sourceColumn: 2, sourceEndLine: 1794};
MERGE (n:KG {id: 'device:centiped_state.centiped_base/32v/callback:32v:0'}) SET n:Callback SET n += {signal: 'configure_scanline', operation: 'configure_scanline', raw: 'TIMER(config, "32v").configure_scanline(FUNC(centiped_state::generate_interrupt), "screen", 0, 16)', ownerTag: '32v', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1794, sourceColumn: 2, sourceEndLine: 1794, scanlineStart: 0, scanlineIncrement: 16, targetClass: 'centiped_state', targetMethod: 'generate_interrupt'};
MERGE (n:KG {id: 'handler:centiped_state.generate_interrupt'}) SET n:Handler SET n += {method: 'generate_interrupt', ownerClass: 'centiped_state', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 434, sourceColumn: 1, sourceEndLine: 444, sourceParameters: 'int param', sourceBody: 'int scanline = param;

	/* IRQ is clocked on the rising edge of 16V, equal to the previous 32V */
	if (scanline & 16)
		m_maincpu->set_input_line(0, ((scanline - 1) & 32) ? ASSERT_LINE : CLEAR_LINE);

	/* do a partial update now to handle sprite multiplexing (Maze Invaders) */
	m_screen->update_partial(scanline);'};
MERGE (n:KG {id: 'device:centiped_state.centiped_base/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_refresh_hz(60)', 'm_screen->set_size(32*8, 32*8)', 'm_screen->set_visarea(0*8, 32*8-1, 0*8, 30*8-1)', 'm_screen->set_screen_update(FUNC(centiped_state::screen_update_centiped))', 'm_screen->set_palette(m_palette)'], sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1797, sourceColumn: 2, sourceEndLine: 1797, configCalls: ['set_refresh_hz(60)', 'set_size(256,256)', 'set_visarea(0,255,0,239)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRefreshHz: 60, screenSize: [256, 256], screenVisarea: [0, 255, 0, 239]};
MERGE (n:KG {id: 'device:centiped_state.centiped_base/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(centiped_state::screen_update_centiped))', ownerTag: 'screen', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1801, sourceColumn: 2, sourceEndLine: 1801, targetClass: 'centiped_state', targetMethod: 'screen_update_centiped'};
MERGE (n:KG {id: 'handler:centiped_state.screen_update_centiped'}) SET n:Handler SET n += {method: 'screen_update_centiped', ownerClass: 'centiped_state', sourceFile: 'src/mame/atari/centiped_v.cpp', sourceLine: 414, sourceColumn: 1, sourceEndLine: 440, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'rectangle spriteclip = cliprect;

	/* draw the background */
	m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0);

	/* apply the sprite clip */
	if (m_flipscreen)
		spriteclip.min_x += 8;
	else
		spriteclip.max_x -= 8;

	/* draw the sprites */
	for (int offs = 0; offs < 0x10; offs++)
	{
		int code = ((m_spriteram[offs] & 0x3e) >> 1) | ((m_spriteram[offs] & 0x01) << 6);
		int color = m_spriteram[offs + 0x30];
		int flipx = (m_spriteram[offs] >> 6) & 1;
		int flipy = (m_spriteram[offs] >> 7) & 1;
		int x = m_spriteram[offs + 0x20];
		int y = 240 - m_spriteram[offs + 0x10];

		m_gfxdecode->gfx(1)->transmask(bitmap, spriteclip, code, color, flipx, flipy, x, y, m_penmask[color & 0x3f]);
	}
	return 0;'};
MERGE (n:KG {id: 'device:centiped_state.centiped_base/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_centiped)'], sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1804, sourceColumn: 2, sourceEndLine: 1804, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:centiped_state.centiped_base/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette).set_entries(4+4*4*4*4)'], sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1805, sourceColumn: 2, sourceEndLine: 1805};
MERGE (n:KG {id: 'machine:centiped_state.centiped'}) SET n:MachineConfig SET n += {cls: 'centiped_state', name: 'centiped', calls: ['centiped_base'], stateMembers: ['{"name":"m_gfx_bank","bits":8}', '{"name":"m_oldpos","bits":8,"arrayLength":4}', '{"name":"m_sign","bits":8,"arrayLength":4}', '{"name":"m_dsw_select","bits":8}', '{"name":"m_control_select","bits":8}', '{"name":"m_flipscreen","bits":8}', '{"name":"m_bullsdrt_sprites_bank","bits":8}', '{"name":"m_penmask","bits":8,"arrayLength":64}'], resetHandlers: ['centiped_state.machine_reset_centiped'], devicePatches: ['{"tag":"outlatch","config":["m_outlatch->q_out_cb<7>().set(FUNC(centiped_state::flip_screen_w))"]}'], sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1810, sourceColumn: 1, sourceEndLine: 1824};
MERGE (n:KG {id: 'handler:centiped_state.machine_reset_centiped'}) SET n:Handler SET n += {method: 'machine_reset_centiped', ownerClass: 'centiped_state', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 469, sourceColumn: 1, sourceEndLine: 475, sourceParameters: '', sourceBody: 'm_maincpu->set_input_line(0, CLEAR_LINE);

	if (m_earom.found())
		earom_control_w(0);'};
MERGE (n:KG {id: 'machine:centiped_state.centiped/callback:outlatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_outlatch->q_out_cb<7>().set(FUNC(centiped_state::flip_screen_w))', ownerTag: 'outlatch', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1816, sourceColumn: 2, sourceEndLine: 1816, slot: '7', targetClass: 'centiped_state', targetMethod: 'flip_screen_w'};
MERGE (n:KG {id: 'handler:centiped_state.flip_screen_w'}) SET n:Handler SET n += {method: 'flip_screen_w', ownerClass: 'centiped_state', sourceFile: 'src/mame/atari/centiped_v.cpp', sourceLine: 144, sourceColumn: 1, sourceEndLine: 147, sourceParameters: 'int state', sourceBody: 'm_flipscreen = state;'};
MERGE (n:KG {id: 'device:centiped_state.centiped/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1819, sourceColumn: 2, sourceEndLine: 1819};
MERGE (n:KG {id: 'device:centiped_state.centiped/pokey'}) SET n:Device SET n += {type: 'POKEY', tag: 'pokey', clock: 1512000, config: ['pokey_device &pokey(POKEY(config, "pokey", 12096000/8))', 'pokey.set_output_opamp_low_pass(RES_K(3.3), CAP_U(0.01), 5.0)', 'pokey.add_route(ALL_OUTPUTS, "mono", 0.5)'], sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1821, sourceColumn: 2, sourceEndLine: 1821};
MERGE (n:KG {id: 'audioroute:device:centiped_state.centiped/pokey/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.5, raw: 'pokey.add_route(ALL_OUTPUTS, "mono", 0.5)', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1823, sourceColumn: 2, sourceEndLine: 1823};
MERGE (n:KG {id: 'inputs:centiped'}) SET n:InputPorts SET n += {name: 'centiped', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1047, sourceColumn: 8, sourceEndLine: 1047};
MERGE (n:KG {id: 'inputs:centiped/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:centiped/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 15, activeLow: false, type: 'IPT_CUSTOM', defaultValue: 0};
MERGE (n:KG {id: 'inputs:centiped/IN0/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 16, name: 'Cabinet', defaultValue: 0, settings: ['0=Upright', '16=Cocktail']};
MERGE (n:KG {id: 'inputs:centiped/IN0/f2'}) SET n:PortField SET n += {kind: 'service', mask: 32, activeLow: true, defaultValue: 32};
MERGE (n:KG {id: 'inputs:centiped/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("screen", FUNC(screen_device::vblank))'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:centiped/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_CUSTOM', defaultValue: 0};
MERGE (n:KG {id: 'inputs:centiped/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:centiped/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_START1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:centiped/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_START2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:centiped/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 4};
MERGE (n:KG {id: 'inputs:centiped/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:centiped/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_TILT', defaultValue: 16};
MERGE (n:KG {id: 'inputs:centiped/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_COIN1', defaultValue: 32};
MERGE (n:KG {id: 'inputs:centiped/IN1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_COIN2', defaultValue: 64};
MERGE (n:KG {id: 'inputs:centiped/IN1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_SERVICE1', defaultValue: 128};
MERGE (n:KG {id: 'inputs:centiped/IN2'}) SET n:Port SET n += {tag: 'IN2', modify: false};
MERGE (n:KG {id: 'inputs:centiped/IN2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 15, activeLow: false, type: 'IPT_CUSTOM', defaultValue: 0};
MERGE (n:KG {id: 'inputs:centiped/IN2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 112, activeLow: false, type: 'IPT_UNKNOWN', defaultValue: 0};
MERGE (n:KG {id: 'inputs:centiped/IN2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_CUSTOM', defaultValue: 0};
MERGE (n:KG {id: 'inputs:centiped/IN3'}) SET n:Port SET n += {tag: 'IN3', modify: false};
MERGE (n:KG {id: 'inputs:centiped/IN3/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:centiped/IN3/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:centiped/IN3/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:centiped/IN3/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:centiped/IN3/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:centiped/IN3/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:centiped/IN3/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:centiped/IN3/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:centiped/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:centiped/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("N9:!1,!2")'], name: 'Language', defaultValue: 0, location: 'N9:!1,!2', settings: ['0=English', '1=German', '2=French', '3=Spanish']};
MERGE (n:KG {id: 'inputs:centiped/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 12, modifiers: ['PORT_DIPLOCATION("N9:!3,!4")'], name: 'Lives', defaultValue: 4, location: 'N9:!3,!4', settings: ['0=2', '4=3', '8=4', '12=5']};
MERGE (n:KG {id: 'inputs:centiped/DSW1/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 48, modifiers: ['PORT_DIPLOCATION("N9:!5,!6")'], name: 'Bonus Life', defaultValue: 16, location: 'N9:!5,!6', settings: ['0=10000', '16=12000', '32=15000', '48=20000']};
MERGE (n:KG {id: 'inputs:centiped/DSW1/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 64, modifiers: ['PORT_DIPLOCATION("N9:!7")'], name: 'Difficulty', defaultValue: 64, location: 'N9:!7', settings: ['64=Easy', '0=Hard']};
MERGE (n:KG {id: 'inputs:centiped/DSW1/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("N9:!8")'], name: 'Credit Minimum', defaultValue: 0, location: 'N9:!8', settings: ['0=1', '128=2']};
MERGE (n:KG {id: 'inputs:centiped/DSW2'}) SET n:Port SET n += {tag: 'DSW2', modify: false};
MERGE (n:KG {id: 'inputs:centiped/DSW2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("N8:!1,!2")'], name: 'Coinage', defaultValue: 2, location: 'N8:!1,!2', settings: ['3=2C 1C', '2=1C 1C', '1=1C 2C', '0=Free Play']};
MERGE (n:KG {id: 'inputs:centiped/DSW2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 12, modifiers: ['PORT_DIPLOCATION("N8:!3,!4")'], name: 'Right Coin', defaultValue: 0, location: 'N8:!3,!4', settings: ['0=*1', '4=*4', '8=*5', '12=*6']};
MERGE (n:KG {id: 'inputs:centiped/DSW2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 16, modifiers: ['PORT_DIPLOCATION("N8:!5")'], name: 'Left Coin', defaultValue: 0, location: 'N8:!5', settings: ['0=*1', '16=*2']};
MERGE (n:KG {id: 'inputs:centiped/DSW2/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 224, modifiers: ['PORT_DIPLOCATION("N8:!6,!7,!8")'], name: 'Bonus Coins', defaultValue: 0, location: 'N8:!6,!7,!8', settings: ['0=None', '32=3 credits/2 coins', '64=5 credits/4 coins', '96=6 credits/4 coins', '128=6 credits/5 coins', '160=4 credits/3 coins']};
MERGE (n:KG {id: 'inputs:centiped/TRACK0_X'}) SET n:Port SET n += {tag: 'TRACK0_X', modify: false};
MERGE (n:KG {id: 'inputs:centiped/TRACK0_X/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: false, type: 'IPT_TRACKBALL_X', modifiers: ['PORT_SENSITIVITY(50)', 'PORT_KEYDELTA(10)', 'PORT_REVERSE'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:centiped/TRACK0_Y'}) SET n:Port SET n += {tag: 'TRACK0_Y', modify: false};
MERGE (n:KG {id: 'inputs:centiped/TRACK0_Y/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: false, type: 'IPT_TRACKBALL_Y', modifiers: ['PORT_SENSITIVITY(50)', 'PORT_KEYDELTA(10)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:centiped/TRACK1_X'}) SET n:Port SET n += {tag: 'TRACK1_X', modify: false};
MERGE (n:KG {id: 'inputs:centiped/TRACK1_X/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: false, type: 'IPT_TRACKBALL_X', modifiers: ['PORT_SENSITIVITY(50)', 'PORT_KEYDELTA(10)', 'PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:centiped/TRACK1_Y'}) SET n:Port SET n += {tag: 'TRACK1_Y', modify: false};
MERGE (n:KG {id: 'inputs:centiped/TRACK1_Y/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: false, type: 'IPT_TRACKBALL_Y', modifiers: ['PORT_SENSITIVITY(50)', 'PORT_KEYDELTA(10)', 'PORT_REVERSE', 'PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:centiped4'}) SET n:InputPorts SET n += {name: 'centiped4', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1175, sourceColumn: 8, sourceEndLine: 1175};
MERGE (n:KG {id: 'inputs:centiped4/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: true};
MERGE (n:KG {id: 'inputs:centiped4/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_UNUSED', defaultValue: 16};
MERGE (n:KG {id: 'inputs:centiped4/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: true};
MERGE (n:KG {id: 'inputs:centiped4/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_UNUSED', defaultValue: 2};
MERGE (n:KG {id: 'inputs:centiped4/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNUSED', defaultValue: 8};
MERGE (n:KG {id: 'inputs:centiped4/IN3'}) SET n:Port SET n += {tag: 'IN3', modify: true};
MERGE (n:KG {id: 'inputs:centiped4/IN3/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 15, activeLow: true, type: 'IPT_UNUSED', defaultValue: 15};
MERGE (n:KG {id: 'inputs:centiped4/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: true};
MERGE (n:KG {id: 'inputs:centiped4/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SW1:!1,!2")'], name: 'Language', defaultValue: 0, location: 'SW1:!1,!2', settings: ['0=English', '1=German', '2=French', '3=Spanish']};
MERGE (n:KG {id: 'inputs:centiped4/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 12, modifiers: ['PORT_DIPLOCATION("SW1:!3,!4")'], name: 'Lives', defaultValue: 4, location: 'SW1:!3,!4', settings: ['0=2', '4=3', '8=4', '12=5']};
MERGE (n:KG {id: 'inputs:centiped4/DSW1/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 48, modifiers: ['PORT_DIPLOCATION("SW1:!5,!6")'], name: 'Bonus Life', defaultValue: 16, location: 'SW1:!5,!6', settings: ['0=10000', '16=12000', '32=15000', '48=20000']};
MERGE (n:KG {id: 'inputs:centiped4/DSW1/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 64, modifiers: ['PORT_DIPLOCATION("SW1:!7")'], name: 'Difficulty', defaultValue: 64, location: 'SW1:!7', settings: ['64=Easy', '0=Hard']};
MERGE (n:KG {id: 'inputs:centiped4/DSW1/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("SW1:!8")'], name: 'Credit Minimum', defaultValue: 0, location: 'SW1:!8', settings: ['0=1', '128=2']};
MERGE (n:KG {id: 'inputs:centiped4/DSW2'}) SET n:Port SET n += {tag: 'DSW2', modify: true};
MERGE (n:KG {id: 'inputs:centiped4/DSW2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SW2:!1,!2")'], name: 'Coinage', defaultValue: 2, location: 'SW2:!1,!2', settings: ['3=2C 1C', '2=1C 1C', '1=1C 2C', '0=Free Play']};
MERGE (n:KG {id: 'inputs:centiped4/DSW2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 28, modifiers: ['PORT_DIPLOCATION("SW2:!3,!4,!5")'], name: 'Game Time', defaultValue: 0, location: 'SW2:!3,!4,!5', settings: ['0=Untimed', '4=1 Minute', '8=2 Minutes', '12=3 Minutes', '16=4 Minutes', '20=5 Minutes', '24=6 Minutes', '28=7 Minutes']};
MERGE (n:KG {id: 'inputs:centiped4/DSW2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 224, modifiers: ['PORT_DIPLOCATION("SW2:!6,!7,!8")'], name: 'Bonus Coins', defaultValue: 0, location: 'SW2:!6,!7,!8', settings: ['0=None', '32=3 credits/2 coins', '64=5 credits/4 coins', '96=6 credits/4 coins', '128=6 credits/5 coins', '160=4 credits/3 coins']};
MERGE (n:KG {id: 'inputs:centiped4/TRACK1_X'}) SET n:Port SET n += {tag: 'TRACK1_X', modify: true};
MERGE (n:KG {id: 'inputs:centiped4/TRACK1_X/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: true, type: 'IPT_UNUSED', defaultValue: 255};
MERGE (n:KG {id: 'inputs:centiped4/TRACK1_Y'}) SET n:Port SET n += {tag: 'TRACK1_Y', modify: true};
MERGE (n:KG {id: 'inputs:centiped4/TRACK1_Y/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: true, type: 'IPT_UNUSED', defaultValue: 255};
MERGE (n:KG {id: 'gfxlayout:spritelayout'}) SET n:GfxLayout SET n += {name: 'spritelayout', width: 8, height: 16, total: 'RGN_FRAC(1,2)', planes: 2, planeOffsets: ['RGN_FRAC(1,2)', 0], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120], charIncrement: 128};
MERGE (n:KG {id: 'gfxlayout:gfx_8x8x2_planar'}) SET n:GfxLayout SET n += {name: 'gfx_8x8x2_planar', width: 8, height: 8, total: 'RGN_FRAC(1,2)', planes: 2, planeOffsets: ['RGN_FRAC(1,2)', 'RGN_FRAC(0,2)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxdecode:gfx_centiped'}) SET n:GfxDecode SET n += {name: 'gfx_centiped', sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1734, sourceColumn: 8, sourceEndLine: 1734};
MERGE (n:KG {id: 'gfxdecode:gfx_centiped/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'gfx_8x8x2_planar', colorBase: 0, colorCount: 1, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_centiped/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'spritelayout', colorBase: 4, colorCount: 64, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:centiped'}), (b:KG {id: 'file:src/mame/atari/centiped.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 2377, sourceColumn: 1, sourceEndLine: 2377};
MATCH (a:KG {id: 'game:centiped'}), (b:KG {id: 'machine:centiped_state.centiped'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:centiped'}), (b:KG {id: 'inputs:centiped4'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:centiped'}), (b:KG {id: 'romset:centiped'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/centiped.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/centiped.cpp'}), (b:KG {id: 'file:centiped.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/centiped.cpp'}), (b:KG {id: 'file:cpu/m6502/m6502.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/centiped.cpp'}), (b:KG {id: 'file:cpu/s2650/s2650.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/centiped.cpp'}), (b:KG {id: 'file:machine/rescap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/centiped.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/centiped.cpp'}), (b:KG {id: 'file:sound/sn76496.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/centiped.cpp'}), (b:KG {id: 'file:sound/pokey.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/centiped.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:centiped_state.centiped'}), (b:KG {id: 'file:src/mame/atari/centiped.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1810, sourceColumn: 1, sourceEndLine: 1824};
MATCH (a:KG {id: 'machine:centiped_state.centiped'}), (b:KG {id: 'handler:centiped_state.machine_reset_centiped'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:centiped_state.centiped'}), (b:KG {id: 'machine:centiped_state.centiped_base'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:centiped_state.centiped'}), (b:KG {id: 'map:centiped_state.centiped_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:centiped_state.centiped'}), (b:KG {id: 'machine:centiped_state.centiped/callback:outlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:centiped_state.centiped'}), (b:KG {id: 'device:centiped_state.centiped/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:centiped_state.centiped'}), (b:KG {id: 'device:centiped_state.centiped/pokey'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:centiped4'}), (b:KG {id: 'file:src/mame/atari/centiped.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1175, sourceColumn: 8, sourceEndLine: 1175};
MATCH (a:KG {id: 'inputs:centiped4'}), (b:KG {id: 'inputs:centiped'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:centiped4'}), (b:KG {id: 'inputs:centiped4/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:centiped4'}), (b:KG {id: 'inputs:centiped4/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:centiped4'}), (b:KG {id: 'inputs:centiped4/IN3'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:centiped4'}), (b:KG {id: 'inputs:centiped4/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:centiped4'}), (b:KG {id: 'inputs:centiped4/DSW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:centiped4'}), (b:KG {id: 'inputs:centiped4/TRACK1_X'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:centiped4'}), (b:KG {id: 'inputs:centiped4/TRACK1_Y'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:centiped'}), (b:KG {id: 'file:src/mame/atari/centiped.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 2029, sourceColumn: 1, sourceEndLine: 2029};
MATCH (a:KG {id: 'romset:centiped'}), (b:KG {id: 'region:centiped/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:centiped'}), (b:KG {id: 'region:centiped/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:centiped'}), (b:KG {id: 'region:centiped/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:centiped_state.machine_reset_centiped'}), (b:KG {id: 'handler:centiped_state.earom_control_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:centiped_state.centiped_base'}), (b:KG {id: 'file:src/mame/atari/centiped.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1775, sourceColumn: 1, sourceEndLine: 1808};
MATCH (a:KG {id: 'machine:centiped_state.centiped_base'}), (b:KG {id: 'handler:centiped_state.video_start_centiped'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:centiped_state.centiped_base'}), (b:KG {id: 'device:centiped_state.centiped_base/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:centiped_state.centiped_base'}), (b:KG {id: 'device:centiped_state.centiped_base/earom'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:centiped_state.centiped_base'}), (b:KG {id: 'device:centiped_state.centiped_base/outlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:centiped_state.centiped_base'}), (b:KG {id: 'device:centiped_state.centiped_base/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:centiped_state.centiped_base'}), (b:KG {id: 'device:centiped_state.centiped_base/32v'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:centiped_state.centiped_base'}), (b:KG {id: 'device:centiped_state.centiped_base/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:centiped_state.centiped_base'}), (b:KG {id: 'device:centiped_state.centiped_base/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:centiped_state.centiped_base'}), (b:KG {id: 'gfxdecode:gfx_centiped'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:centiped_state.centiped_base'}), (b:KG {id: 'device:centiped_state.centiped_base/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_map'}), (b:KG {id: 'file:src/mame/atari/centiped.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 718, sourceColumn: 1, sourceEndLine: 722};
MATCH (a:KG {id: 'map:centiped_state.centiped_map'}), (b:KG {id: 'map:centiped_state.centiped_base_map'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_map'}), (b:KG {id: 'map:centiped_state.centiped_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'machine:centiped_state.centiped/callback:outlatch:0'}), (b:KG {id: 'handler:centiped_state.flip_screen_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:centiped_state.centiped/pokey'}), (b:KG {id: 'audioroute:device:centiped_state.centiped/pokey/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:centiped'}), (b:KG {id: 'file:src/mame/atari/centiped.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1047, sourceColumn: 8, sourceEndLine: 1047};
MATCH (a:KG {id: 'inputs:centiped'}), (b:KG {id: 'inputs:centiped/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:centiped'}), (b:KG {id: 'inputs:centiped/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:centiped'}), (b:KG {id: 'inputs:centiped/IN2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:centiped'}), (b:KG {id: 'inputs:centiped/IN3'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:centiped'}), (b:KG {id: 'inputs:centiped/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:centiped'}), (b:KG {id: 'inputs:centiped/DSW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:centiped'}), (b:KG {id: 'inputs:centiped/TRACK0_X'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:centiped'}), (b:KG {id: 'inputs:centiped/TRACK0_Y'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:centiped'}), (b:KG {id: 'inputs:centiped/TRACK1_X'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:centiped'}), (b:KG {id: 'inputs:centiped/TRACK1_Y'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:centiped4/IN0'}), (b:KG {id: 'inputs:centiped4/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped4/IN1'}), (b:KG {id: 'inputs:centiped4/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped4/IN1'}), (b:KG {id: 'inputs:centiped4/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped4/IN3'}), (b:KG {id: 'inputs:centiped4/IN3/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped4/DSW1'}), (b:KG {id: 'inputs:centiped4/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped4/DSW1'}), (b:KG {id: 'inputs:centiped4/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped4/DSW1'}), (b:KG {id: 'inputs:centiped4/DSW1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped4/DSW1'}), (b:KG {id: 'inputs:centiped4/DSW1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped4/DSW1'}), (b:KG {id: 'inputs:centiped4/DSW1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped4/DSW2'}), (b:KG {id: 'inputs:centiped4/DSW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped4/DSW2'}), (b:KG {id: 'inputs:centiped4/DSW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped4/DSW2'}), (b:KG {id: 'inputs:centiped4/DSW2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped4/TRACK1_X'}), (b:KG {id: 'inputs:centiped4/TRACK1_X/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped4/TRACK1_Y'}), (b:KG {id: 'inputs:centiped4/TRACK1_Y/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:centiped/maincpu'}), (b:KG {id: 'rom:centiped/maincpu/136001-407.d1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:centiped/maincpu'}), (b:KG {id: 'rom:centiped/maincpu/136001-408.e1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:centiped/maincpu'}), (b:KG {id: 'rom:centiped/maincpu/136001-409.fh1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:centiped/maincpu'}), (b:KG {id: 'rom:centiped/maincpu/136001-410.j1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:centiped/gfx1'}), (b:KG {id: 'rom:centiped/gfx1/136001-211.f7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:centiped/gfx1'}), (b:KG {id: 'rom:centiped/gfx1/136001-212.hj7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:centiped/proms'}), (b:KG {id: 'rom:centiped/proms/136001-213.p4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'handler:centiped_state.video_start_centiped'}), (b:KG {id: 'handler:centiped_state.init_common'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:centiped_state.video_start_centiped'}), (b:KG {id: 'handler:centiped_state.init_penmask'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:centiped_state.video_start_centiped'}), (b:KG {id: 'handler:centiped_state.centiped_get_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:centiped_state.centiped_base/outlatch'}), (b:KG {id: 'device:centiped_state.centiped_base/outlatch/callback:outlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:centiped_state.centiped_base/outlatch'}), (b:KG {id: 'device:centiped_state.centiped_base/outlatch/callback:outlatch:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:centiped_state.centiped_base/outlatch'}), (b:KG {id: 'device:centiped_state.centiped_base/outlatch/callback:outlatch:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:centiped_state.centiped_base/32v'}), (b:KG {id: 'device:centiped_state.centiped_base/32v/callback:32v:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:centiped_state.centiped_base/screen'}), (b:KG {id: 'device:centiped_state.centiped_base/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_centiped'}), (b:KG {id: 'file:src/mame/atari/centiped.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 1734, sourceColumn: 8, sourceEndLine: 1734};
MATCH (a:KG {id: 'gfxdecode:gfx_centiped'}), (b:KG {id: 'gfxdecode:gfx_centiped/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_centiped'}), (b:KG {id: 'gfxdecode:gfx_centiped/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map'}), (b:KG {id: 'file:src/mame/atari/centiped.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/centiped.cpp', sourceLine: 695, sourceColumn: 1, sourceEndLine: 715};
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map'}), (b:KG {id: 'map:centiped_state.centiped_base_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map'}), (b:KG {id: 'map:centiped_state.centiped_base_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map'}), (b:KG {id: 'map:centiped_state.centiped_base_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map'}), (b:KG {id: 'map:centiped_state.centiped_base_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map'}), (b:KG {id: 'map:centiped_state.centiped_base_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map'}), (b:KG {id: 'map:centiped_state.centiped_base_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map'}), (b:KG {id: 'map:centiped_state.centiped_base_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map'}), (b:KG {id: 'map:centiped_state.centiped_base_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map'}), (b:KG {id: 'map:centiped_state.centiped_base_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map'}), (b:KG {id: 'map:centiped_state.centiped_base_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map'}), (b:KG {id: 'map:centiped_state.centiped_base_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map'}), (b:KG {id: 'map:centiped_state.centiped_base_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map'}), (b:KG {id: 'map:centiped_state.centiped_base_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map'}), (b:KG {id: 'map:centiped_state.centiped_base_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map'}), (b:KG {id: 'map:centiped_state.centiped_base_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map'}), (b:KG {id: 'map:centiped_state.centiped_base_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map'}), (b:KG {id: 'map:centiped_state.centiped_base_map/range16'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_map/range0'}), (b:KG {id: 'handler:pokey_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'pokey'};
MATCH (a:KG {id: 'map:centiped_state.centiped_map/range0'}), (b:KG {id: 'handler:pokey_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'pokey'};
MATCH (a:KG {id: 'inputs:centiped/IN0'}), (b:KG {id: 'inputs:centiped/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/IN0'}), (b:KG {id: 'inputs:centiped/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/IN0'}), (b:KG {id: 'inputs:centiped/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/IN0'}), (b:KG {id: 'inputs:centiped/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/IN0'}), (b:KG {id: 'inputs:centiped/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/IN1'}), (b:KG {id: 'inputs:centiped/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/IN1'}), (b:KG {id: 'inputs:centiped/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/IN1'}), (b:KG {id: 'inputs:centiped/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/IN1'}), (b:KG {id: 'inputs:centiped/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/IN1'}), (b:KG {id: 'inputs:centiped/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/IN1'}), (b:KG {id: 'inputs:centiped/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/IN1'}), (b:KG {id: 'inputs:centiped/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/IN1'}), (b:KG {id: 'inputs:centiped/IN1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/IN2'}), (b:KG {id: 'inputs:centiped/IN2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/IN2'}), (b:KG {id: 'inputs:centiped/IN2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/IN2'}), (b:KG {id: 'inputs:centiped/IN2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/IN3'}), (b:KG {id: 'inputs:centiped/IN3/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/IN3'}), (b:KG {id: 'inputs:centiped/IN3/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/IN3'}), (b:KG {id: 'inputs:centiped/IN3/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/IN3'}), (b:KG {id: 'inputs:centiped/IN3/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/IN3'}), (b:KG {id: 'inputs:centiped/IN3/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/IN3'}), (b:KG {id: 'inputs:centiped/IN3/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/IN3'}), (b:KG {id: 'inputs:centiped/IN3/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/IN3'}), (b:KG {id: 'inputs:centiped/IN3/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/DSW1'}), (b:KG {id: 'inputs:centiped/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/DSW1'}), (b:KG {id: 'inputs:centiped/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/DSW1'}), (b:KG {id: 'inputs:centiped/DSW1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/DSW1'}), (b:KG {id: 'inputs:centiped/DSW1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/DSW1'}), (b:KG {id: 'inputs:centiped/DSW1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/DSW2'}), (b:KG {id: 'inputs:centiped/DSW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/DSW2'}), (b:KG {id: 'inputs:centiped/DSW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/DSW2'}), (b:KG {id: 'inputs:centiped/DSW2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/DSW2'}), (b:KG {id: 'inputs:centiped/DSW2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/TRACK0_X'}), (b:KG {id: 'inputs:centiped/TRACK0_X/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/TRACK0_Y'}), (b:KG {id: 'inputs:centiped/TRACK0_Y/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/TRACK1_X'}), (b:KG {id: 'inputs:centiped/TRACK1_X/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:centiped/TRACK1_Y'}), (b:KG {id: 'inputs:centiped/TRACK1_Y/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'device:centiped_state.centiped_base/outlatch/callback:outlatch:0'}), (b:KG {id: 'handler:centiped_state.coin_counter_left_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:centiped_state.centiped_base/outlatch/callback:outlatch:1'}), (b:KG {id: 'handler:centiped_state.coin_counter_center_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:centiped_state.centiped_base/outlatch/callback:outlatch:2'}), (b:KG {id: 'handler:centiped_state.coin_counter_right_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:centiped_state.centiped_base/32v/callback:32v:0'}), (b:KG {id: 'handler:centiped_state.generate_interrupt'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:centiped_state.centiped_base/screen/callback:screen:0'}), (b:KG {id: 'handler:centiped_state.screen_update_centiped'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_centiped/e0'}), (b:KG {id: 'gfxlayout:gfx_8x8x2_planar'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_centiped/e1'}), (b:KG {id: 'gfxlayout:spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map/range1'}), (b:KG {id: 'handler:centiped_state.centiped_videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map/range5'}), (b:KG {id: 'handler:centiped_state.centiped_IN0_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map/range7'}), (b:KG {id: 'handler:centiped_state.centiped_IN2_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map/range9'}), (b:KG {id: 'handler:centiped_state.centiped_paletteram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map/range10'}), (b:KG {id: 'handler:centiped_state.earom_write'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map/range11'}), (b:KG {id: 'handler:centiped_state.earom_control_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map/range12'}), (b:KG {id: 'handler:centiped_state.earom_read'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map/range13'}), (b:KG {id: 'handler:centiped_state.irq_ack_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map/range14'}), (b:KG {id: 'handler:ls259_device.write_d7'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'outlatch'};
MATCH (a:KG {id: 'map:centiped_state.centiped_base_map/range15'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'gfxlayout:gfx_8x8x2_planar'}), (b:KG {id: 'file:src/mame/atari/centiped.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:spritelayout'}), (b:KG {id: 'file:src/mame/atari/centiped.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'handler:centiped_state.centiped_IN0_r'}), (b:KG {id: 'handler:centiped_state.read_trackball'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:centiped_state.centiped_IN2_r'}), (b:KG {id: 'handler:centiped_state.read_trackball'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
