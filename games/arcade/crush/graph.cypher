// mamekit knowledge graph — driver src/mame/pacman/pacman.cpp
// generated 2026-09-05T03:49:23.430Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/pacman/pacman.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/pacman/pacman.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:pacman.h'}) SET n:SourceFile SET n += {path: 'pacman.h', external: true};
MERGE (n:KG {id: 'file:jumpshot.h'}) SET n:SourceFile SET n += {path: 'jumpshot.h', external: true};
MERGE (n:KG {id: 'file:pacplus.h'}) SET n:SourceFile SET n += {path: 'pacplus.h', external: true};
MERGE (n:KG {id: 'file:cpu/s2650/s2650.h'}) SET n:SourceFile SET n += {path: 'cpu/s2650/s2650.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:machine/nvram.h'}) SET n:SourceFile SET n += {path: 'machine/nvram.h', external: true};
MERGE (n:KG {id: 'file:sound/ay8910.h'}) SET n:SourceFile SET n += {path: 'sound/ay8910.h', external: true};
MERGE (n:KG {id: 'file:sound/sn76496.h'}) SET n:SourceFile SET n += {path: 'sound/sn76496.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'game:crush'}) SET n:Game SET n += {name: 'crush', year: '1981', company: 'Alpha Denshi Co. / Kural Samno Electric, Ltd.', fullname: 'Crush Roller (set 1)', monitor: 'ROT90', cls: 'pacman_state', init: 'init_maketrax', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 9109, sourceColumn: 1, sourceEndLine: 9109, installedHandlers: ['{"space":"AS_PROGRAM","kind":"write","start":20484,"end":20484,"className":"pacman_state","method":"maketrax_protection_w"}', '{"space":"AS_PROGRAM","kind":"read","start":20608,"end":20671,"className":"pacman_state","method":"maketrax_special_port2_r"}', '{"space":"AS_PROGRAM","kind":"read","start":20672,"end":20735,"className":"pacman_state","method":"maketrax_special_port3_r"}']};
MERGE (n:KG {id: 'handler:pacman_state.maketrax_protection_w'}) SET n:Handler SET n += {method: 'maketrax_protection_w', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 580, sourceColumn: 1, sourceEndLine: 604, sourceParameters: 'uint8_t data', sourceBody: 'if (data == 0) // disable protection / reset?
	{
		m_maketrax_counter = 0;
		m_maketrax_offset = 0;
		m_maketrax_disable_protection = 1;
		return;
	}

	if (data == 1)
	{
		m_maketrax_disable_protection = 0;

		m_maketrax_counter++;
		if (m_maketrax_counter == 0x3c)
		{
			m_maketrax_counter = 0;
			m_maketrax_offset++;

			if (m_maketrax_offset == 0x1e)
				m_maketrax_offset = 0;
		}
	}'};
MERGE (n:KG {id: 'handler:pacman_state.maketrax_special_port2_r'}) SET n:Handler SET n += {method: 'maketrax_special_port2_r', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 606, sourceColumn: 1, sourceEndLine: 632, sourceParameters: 'offs_t offset', sourceBody: 'const uint8_t protdata[0x1e] = { // table at $ebd (odd entries)
		0x00, 0xc0, 0x00, 0x40, 0xc0, 0x40, 0x00, 0xc0, 0x00, 0x40, 0x00, 0xc0, 0x00, 0x40, 0xc0, 0x40,
		0x00, 0xc0, 0x00, 0x40, 0x00, 0xc0, 0x00, 0x40, 0xc0, 0x40, 0x00, 0xc0, 0x00, 0x40
	};

	uint8_t data = m_dsw[0]->read() & 0x3f;

	if (m_maketrax_disable_protection == 0)
		return protdata[m_maketrax_offset] | data;

	switch (offset)
	{
		case 0x01:
		case 0x04:
			data |= 0x40; break;
		case 0x05:
		case 0x0e: // korosuke
		case 0x10: // korosuke
			data |= 0xc0; break;
		default:
			data &= 0x3f; break;
	}

	return data;', inputMembers: ['m_dsw=DSW1,DSW2']};
MERGE (n:KG {id: 'handler:pacman_state.maketrax_special_port3_r'}) SET n:Handler SET n += {method: 'maketrax_special_port3_r', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 634, sourceColumn: 1, sourceEndLine: 655, sourceParameters: 'offs_t offset', sourceBody: 'const uint8_t protdata[0x1e] = { // table at $ebd (even entries)
		0x1f, 0x3f, 0x2f, 0x2f, 0x0f, 0x0f, 0x0f, 0x3f, 0x0f, 0x0f, 0x1c, 0x3c, 0x2c, 0x2c, 0x0c, 0x0c,
		0x0c, 0x3c, 0x0c, 0x0c, 0x11, 0x31, 0x21, 0x21, 0x01, 0x01, 0x01, 0x31, 0x01, 0x01
	};

	if (m_maketrax_disable_protection == 0)
		return protdata[m_maketrax_offset];

	switch (offset)
	{
		case 0x00:
			return 0x1f;
		case 0x09:
			return 0x30;
		case 0x0c:
			return 0x00;
		default:
			return 0x20;
	}'};
MERGE (n:KG {id: 'romset:crush'}) SET n:RomSet SET n += {name: 'crush', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 6873, sourceColumn: 1, sourceEndLine: 6873};
MERGE (n:KG {id: 'region:crush/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 4151, sourceColumn: 2, sourceEndLine: 4151};
MERGE (n:KG {id: 'rom:crush/maincpu/crushkrl.6e'}) SET n:Rom SET n += {file: 'crushkrl.6e', offset: 0, size: 4096, crc: 'a8dd8f54', sha1: '4e3a973ea74a9e145c6997513b98fc80aa478442', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 6875, sourceColumn: 2, sourceEndLine: 6875};
MERGE (n:KG {id: 'rom:crush/maincpu/crushkrl.6f'}) SET n:Rom SET n += {file: 'crushkrl.6f', offset: 4096, size: 4096, crc: '91387299', sha1: '3ad8c28e02c45667e32860953b157832445a82c8', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 6876, sourceColumn: 2, sourceEndLine: 6876};
MERGE (n:KG {id: 'rom:crush/maincpu/crushkrl.6h'}) SET n:Rom SET n += {file: 'crushkrl.6h', offset: 8192, size: 4096, crc: 'd4455f27', sha1: '53f8ffc28be664fa8a2d756b4c70045a3f041bea', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 6877, sourceColumn: 2, sourceEndLine: 6877};
MERGE (n:KG {id: 'rom:crush/maincpu/crushkrl.6j'}) SET n:Rom SET n += {file: 'crushkrl.6j', offset: 12288, size: 4096, crc: 'd59fc251', sha1: '024605e4485b0ac826217256e5356ed9a6c8ef34', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 6878, sourceColumn: 2, sourceEndLine: 6878};
MERGE (n:KG {id: 'region:crush/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 8192, flags: '0', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 4161, sourceColumn: 2, sourceEndLine: 4161};
MERGE (n:KG {id: 'rom:crush/gfx1/maketrax.5e'}) SET n:Rom SET n += {file: 'maketrax.5e', offset: 0, size: 4096, crc: '91bad2da', sha1: '096197d0cb6d55bf72b5be045224f4bd6a9cfa1b', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 6881, sourceColumn: 2, sourceEndLine: 6881};
MERGE (n:KG {id: 'rom:crush/gfx1/maketrax.5f'}) SET n:Rom SET n += {file: 'maketrax.5f', offset: 4096, size: 4096, crc: 'aea79f55', sha1: '279021e6771dfa5bd0b7c557aae44434286d91b7', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 6882, sourceColumn: 2, sourceEndLine: 6882};
MERGE (n:KG {id: 'region:crush/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 288, flags: '0', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 4167, sourceColumn: 2, sourceEndLine: 4167};
MERGE (n:KG {id: 'rom:crush/proms/82s123.7f'}) SET n:Rom SET n += {file: '82s123.7f', offset: 0, size: 32, crc: '2fc650bd', sha1: '8d0268dee78e47c712202b0ec4f1f51109b1f2a5', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 4269, sourceColumn: 2, sourceEndLine: 4269};
MERGE (n:KG {id: 'rom:crush/proms/2s140.4a'}) SET n:Rom SET n += {file: '2s140.4a', offset: 32, size: 256, crc: '63efb927', sha1: '5c144a613fc4960a1dfd7ead89e7fee258a63171', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 6886, sourceColumn: 2, sourceEndLine: 6886};
MERGE (n:KG {id: 'region:crush/namco'}) SET n:RomRegion SET n += {tag: 'namco', size: 512, flags: '0', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 4171, sourceColumn: 2, sourceEndLine: 4171};
MERGE (n:KG {id: 'rom:crush/namco/82s126.1m'}) SET n:Rom SET n += {file: '82s126.1m', offset: 0, size: 256, crc: 'a9cc86bf', sha1: 'bbcec0570aeceb582ff8238a4bc8546a23430081', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 4273, sourceColumn: 2, sourceEndLine: 4273};
MERGE (n:KG {id: 'rom:crush/namco/82s126.3m'}) SET n:Rom SET n += {file: '82s126.3m', offset: 256, size: 256, crc: '77245b66', sha1: '0c4d0bee858b97632411c440bea6948a74759746', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 4274, sourceColumn: 2, sourceEndLine: 4274};
MERGE (n:KG {id: 'map:pacman_state.pacman_map'}) SET n:AddressMap SET n += {cls: 'pacman_state', name: 'pacman_map', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1049, sourceColumn: 1, sourceEndLine: 1068};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 16383, raw: 'map(0x0000, 0x3fff).mirror(0x8000).rom()', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1052, sourceColumn: 2, sourceEndLine: 1052, mirror: 32768, rom: true};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range1'}) SET n:AddressRange SET n += {start: 16384, end: 17407, raw: 'map(0x4000, 0x43ff).mirror(0xa000).ram().w(FUNC(pacman_state::pacman_videoram_w)).share("videoram")', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1053, sourceColumn: 2, sourceEndLine: 1053, mirror: 40960, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'handler:pacman_state.pacman_videoram_w'}) SET n:Handler SET n += {method: 'pacman_videoram_w', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 235, sourceColumn: 1, sourceEndLine: 239, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range2'}) SET n:AddressRange SET n += {start: 17408, end: 18431, raw: 'map(0x4400, 0x47ff).mirror(0xa000).ram().w(FUNC(pacman_state::pacman_colorram_w)).share("colorram")', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1054, sourceColumn: 2, sourceEndLine: 1054, mirror: 40960, ram: true, share: 'colorram'};
MERGE (n:KG {id: 'handler:pacman_state.pacman_colorram_w'}) SET n:Handler SET n += {method: 'pacman_colorram_w', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 241, sourceColumn: 1, sourceEndLine: 245, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_colorram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range3'}) SET n:AddressRange SET n += {start: 18432, end: 19455, raw: 'map(0x4800, 0x4bff).mirror(0xa000).r(FUNC(pacman_state::pacman_read_nop)).nopw()', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1055, sourceColumn: 2, sourceEndLine: 1055, mirror: 40960, nopw: true};
MERGE (n:KG {id: 'handler:pacman_state.pacman_read_nop'}) SET n:Handler SET n += {method: 'pacman_read_nop', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1030, sourceColumn: 1, sourceEndLine: 1039, sourceParameters: '', sourceBody: '// Return value of reading the bus with no devices enabled.
	// This seems to be common but more tests are needed. Ms Pacman reads bytes in sequence
	// until it hits a 0 for a delimiter, including empty areas.  It writes to "random"
	// addresses each time. This causes the maze to invert sometimes.  See code at $95c3 where
	// level($4e13)=134. DW
	// tests on exactly what determines the value returned have thus far proved inconclusive
	return 0xbf;'};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range4'}) SET n:AddressRange SET n += {start: 19456, end: 20463, raw: 'map(0x4c00, 0x4fef).mirror(0xa000).ram()', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1056, sourceColumn: 2, sourceEndLine: 1056, mirror: 40960, ram: true};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range5'}) SET n:AddressRange SET n += {start: 20464, end: 20479, raw: 'map(0x4ff0, 0x4fff).mirror(0xa000).ram().share("spriteram")', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1057, sourceColumn: 2, sourceEndLine: 1057, mirror: 40960, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range6'}) SET n:AddressRange SET n += {start: 20480, end: 20487, raw: 'map(0x5000, 0x5007).mirror(0xaf38).w(m_mainlatch, FUNC(ls259_device::write_d0))', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1058, sourceColumn: 2, sourceEndLine: 1058, mirror: 44856};
MERGE (n:KG {id: 'handler:ls259_device.write_d0'}) SET n:Handler SET n += {method: 'write_d0', ownerClass: 'ls259_device', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1454, sourceColumn: 2, sourceEndLine: 1454};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range7'}) SET n:AddressRange SET n += {start: 20544, end: 20575, raw: 'map(0x5040, 0x505f).mirror(0xaf00).w(m_namco_sound, FUNC(namco_wsg_device::pacman_sound_w))', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1059, sourceColumn: 2, sourceEndLine: 1059, mirror: 44800};
MERGE (n:KG {id: 'handler:namco_wsg_device.pacman_sound_w'}) SET n:Handler SET n += {method: 'pacman_sound_w', ownerClass: 'namco_wsg_device', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1455, sourceColumn: 2, sourceEndLine: 1455};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range8'}) SET n:AddressRange SET n += {start: 20576, end: 20591, raw: 'map(0x5060, 0x506f).mirror(0xaf00).writeonly().share("spriteram2")', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1060, sourceColumn: 2, sourceEndLine: 1060, mirror: 44800, writeonly: true, share: 'spriteram2'};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range9'}) SET n:AddressRange SET n += {start: 20592, end: 20607, raw: 'map(0x5070, 0x507f).mirror(0xaf00).nopw()', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1061, sourceColumn: 2, sourceEndLine: 1061, mirror: 44800, nopw: true};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range10'}) SET n:AddressRange SET n += {start: 20608, end: 20608, raw: 'map(0x5080, 0x5080).mirror(0xaf3f).nopw()', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1062, sourceColumn: 2, sourceEndLine: 1062, mirror: 44863, nopw: true};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range11'}) SET n:AddressRange SET n += {start: 20672, end: 20672, raw: 'map(0x50c0, 0x50c0).mirror(0xaf3f).w(m_watchdog, FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1063, sourceColumn: 2, sourceEndLine: 1063, mirror: 44863};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1459, sourceColumn: 2, sourceEndLine: 1459};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range12'}) SET n:AddressRange SET n += {start: 20480, end: 20480, raw: 'map(0x5000, 0x5000).mirror(0xaf3f).portr("IN0")', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1064, sourceColumn: 2, sourceEndLine: 1064, mirror: 44863, portRead: 'IN0'};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range13'}) SET n:AddressRange SET n += {start: 20544, end: 20544, raw: 'map(0x5040, 0x5040).mirror(0xaf3f).portr("IN1")', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1065, sourceColumn: 2, sourceEndLine: 1065, mirror: 44863, portRead: 'IN1'};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range14'}) SET n:AddressRange SET n += {start: 20608, end: 20608, raw: 'map(0x5080, 0x5080).mirror(0xaf3f).portr("DSW1")', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1066, sourceColumn: 2, sourceEndLine: 1066, mirror: 44863, portRead: 'DSW1'};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range15'}) SET n:AddressRange SET n += {start: 20672, end: 20672, raw: 'map(0x50c0, 0x50c0).mirror(0xaf3f).portr("DSW2")', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1067, sourceColumn: 2, sourceEndLine: 1067, mirror: 44863, portRead: 'DSW2'};
MERGE (n:KG {id: 'map:pacman_state.writeport'}) SET n:AddressMap SET n += {cls: 'pacman_state', name: 'writeport', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1475, sourceColumn: 1, sourceEndLine: 1479, globalMask: 255};
MERGE (n:KG {id: 'map:pacman_state.writeport/range0'}) SET n:AddressRange SET n += {start: 0, end: 0, raw: 'map(0x00, 0x00).w(FUNC(pacman_state::pacman_interrupt_vector_w))', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1478, sourceColumn: 2, sourceEndLine: 1478};
MERGE (n:KG {id: 'handler:pacman_state.pacman_interrupt_vector_w'}) SET n:Handler SET n += {method: 'pacman_interrupt_vector_w', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 394, sourceColumn: 1, sourceEndLine: 397, sourceParameters: 'uint8_t data', sourceBody: 'm_interrupt_vector = data;'};
MERGE (n:KG {id: 'machine:pacman_state.pacman'}) SET n:MachineConfig SET n += {cls: 'pacman_state', name: 'pacman', calls: [], stateMembers: ['{"name":"m_cannonb_bit_to_read","bits":8}', '{"name":"m_counter","bits":8}', '{"name":"m_bigbucks_bank","bits":32,"signed":true}', '{"name":"m_rocktrv2_question_bank","bits":8}', '{"name":"m_charbank","bits":8}', '{"name":"m_spritebank","bits":8}', '{"name":"m_palettebank","bits":8}', '{"name":"m_colortablebank","bits":8}', '{"name":"m_flipscreen","bits":8}', '{"name":"m_bgpriority","bits":8}', '{"name":"m_xoffsethack","bits":32,"signed":true}', '{"name":"m_inv_spr","bits":8}', '{"name":"m_maketrax_counter","bits":8}', '{"name":"m_maketrax_offset","bits":8}', '{"name":"m_maketrax_disable_protection","bits":32,"signed":true}', '{"name":"m_irq_mask","bits":1}', '{"name":"m_interrupt_vector","bits":8}'], startHandlers: ['pacman_state.video_start_pacman'], sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3705, sourceColumn: 1, sourceEndLine: 3747};
MERGE (n:KG {id: 'handler:pacman_state.video_start_pacman'}) SET n:Handler SET n += {method: 'video_start_pacman', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 208, sourceColumn: 1, sourceEndLine: 226, sourceParameters: '', sourceBody: 'init_save_state();

	m_charbank = 0;
	m_spritebank = 0;
	m_palettebank = 0;
	m_colortablebank = 0;
	m_flipscreen = 0;
	m_bgpriority = 0;
	m_inv_spr = 0;
	m_interrupt_vector = 0;

	/* In the Pac Man based games (NOT Pengo) the first two sprites must be offset */
	/* one pixel to the left to get a more correct placement */
	m_xoffsethack = 1;

	m_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(pacman_state::pacman_get_tile_info)), tilemap_mapper_delegate(*this, FUNC(pacman_state::pacman_scan_rows)), 8, 8, 36, 28);'};
MERGE (n:KG {id: 'handler:pacman_state.init_save_state'}) SET n:Handler SET n += {method: 'init_save_state', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 195, sourceColumn: 1, sourceEndLine: 205, sourceParameters: '', sourceBody: 'save_item(NAME(m_charbank));
	save_item(NAME(m_spritebank));
	save_item(NAME(m_palettebank));
	save_item(NAME(m_colortablebank));
	save_item(NAME(m_flipscreen));
	save_item(NAME(m_bgpriority));
	save_item(NAME(m_irq_mask));
	save_item(NAME(m_interrupt_vector));'};
MERGE (n:KG {id: 'handler:pacman_state.pacman_get_tile_info'}) SET n:Handler SET n += {method: 'pacman_get_tile_info', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 180, sourceColumn: 1, sourceEndLine: 186, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int code = m_videoram[tile_index] | (m_charbank << 8);
	int attr = (m_colorram[tile_index] & 0x1f) | (m_colortablebank << 5) | (m_palettebank << 6);

	tileinfo.set(0, code, attr, 0);'};
MERGE (n:KG {id: 'handler:pacman_state.pacman_scan_rows'}) SET n:Handler SET n += {method: 'pacman_scan_rows', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 170, sourceColumn: 1, sourceEndLine: 178, sourceParameters: 'u32 col, u32 row, u32 num_cols, u32 num_rows', sourceBody: 'row += 2;
	col -= 2;
	if (col & 0x20)
		return row + ((col & 0x1f) << 5);
	else
		return col + (row << 5);'};
MERGE (n:KG {id: 'device:pacman_state.pacman/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 3072000, config: ['Z80(config, m_maincpu, 18.432_MHz_XTAL / 6)', 'm_maincpu->set_addrmap(AS_PROGRAM, &pacman_state::pacman_map)', 'm_maincpu->set_addrmap(AS_IO, &pacman_state::writeport)', 'm_maincpu->set_irq_acknowledge_callback(FUNC(pacman_state::interrupt_vector_r))'], sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3708, sourceColumn: 2, sourceEndLine: 3708};
MERGE (n:KG {id: 'device:pacman_state.pacman/maincpu/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'set_irq_acknowledge_callback', operation: 'set_irq_acknowledge_callback', raw: 'm_maincpu->set_irq_acknowledge_callback(FUNC(pacman_state::interrupt_vector_r))', ownerTag: 'maincpu', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3711, sourceColumn: 2, sourceEndLine: 3711, targetClass: 'pacman_state', targetMethod: 'interrupt_vector_r'};
MERGE (n:KG {id: 'handler:pacman_state.interrupt_vector_r'}) SET n:Handler SET n += {method: 'interrupt_vector_r', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 399, sourceColumn: 1, sourceEndLine: 402, sourceParameters: 'int irqline', sourceBody: 'return m_interrupt_vector;'};
MERGE (n:KG {id: 'device:pacman_state.pacman/mainlatch'}) SET n:Device SET n += {type: 'LS259', tag: 'mainlatch', clock: null, config: ['LS259(config, m_mainlatch)', 'm_mainlatch->q_out_cb<0>().set(FUNC(pacman_state::irq_mask_w))', 'm_mainlatch->q_out_cb<1>().set("namco", FUNC(namco_wsg_device::sound_enable_w))', 'm_mainlatch->q_out_cb<3>().set(FUNC(pacman_state::flipscreen_w))', 'm_mainlatch->q_out_cb<7>().set(FUNC(pacman_state::coin_counter_w))', 'm_mainlatch->q_out_cb<7>().set_nop()'], sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3713, sourceColumn: 2, sourceEndLine: 3713};
MERGE (n:KG {id: 'device:pacman_state.pacman/mainlatch/callback:mainlatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch->q_out_cb<0>().set(FUNC(pacman_state::irq_mask_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3714, sourceColumn: 2, sourceEndLine: 3714, slot: '0', targetClass: 'pacman_state', targetMethod: 'irq_mask_w'};
MERGE (n:KG {id: 'handler:pacman_state.irq_mask_w'}) SET n:Handler SET n += {method: 'irq_mask_w', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 380, sourceColumn: 1, sourceEndLine: 385, sourceParameters: 'int state', sourceBody: 'm_irq_mask = state;
	if (!state)
		m_maincpu->set_input_line(INPUT_LINE_IRQ0, CLEAR_LINE);'};
MERGE (n:KG {id: 'device:pacman_state.pacman/mainlatch/callback:mainlatch:1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch->q_out_cb<1>().set("namco", FUNC(namco_wsg_device::sound_enable_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3715, sourceColumn: 2, sourceEndLine: 3715, slot: '1', targetTag: 'namco', targetClass: 'namco_wsg_device', targetMethod: 'sound_enable_w'};
MERGE (n:KG {id: 'handler:namco_wsg_device.sound_enable_w'}) SET n:Handler SET n += {method: 'sound_enable_w', ownerClass: 'namco_wsg_device', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3892, sourceColumn: 2, sourceEndLine: 3892};
MERGE (n:KG {id: 'device:pacman_state.pacman/mainlatch/callback:mainlatch:2'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch->q_out_cb<3>().set(FUNC(pacman_state::flipscreen_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3716, sourceColumn: 2, sourceEndLine: 3716, slot: '3', targetClass: 'pacman_state', targetMethod: 'flipscreen_w'};
MERGE (n:KG {id: 'handler:pacman_state.flipscreen_w'}) SET n:Handler SET n += {method: 'flipscreen_w', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 247, sourceColumn: 1, sourceEndLine: 251, sourceParameters: 'int state', sourceBody: 'm_flipscreen = state;
	m_bg_tilemap->set_flip(m_flipscreen * (TILEMAP_FLIPX + TILEMAP_FLIPY));'};
MERGE (n:KG {id: 'device:pacman_state.pacman/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, m_watchdog)', 'm_watchdog->set_vblank_count("screen", 16)'], sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3725, sourceColumn: 2, sourceEndLine: 3725};
MERGE (n:KG {id: 'device:pacman_state.pacman/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_pacman)'], sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3729, sourceColumn: 2, sourceEndLine: 3729, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:pacman_state.pacman/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(pacman_state::pacman_palette), 128 * 4, 32)'], sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3731, sourceColumn: 2, sourceEndLine: 3731, clockExpr: 'FUNC(pacman_state::pacman_palette)'};
MERGE (n:KG {id: 'device:pacman_state.pacman/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(18.432_MHz_XTAL / 3, 384, 0, 288, 264, 0  , 224  )', 'm_screen->set_screen_update(FUNC(pacman_state::screen_update_pacman))', 'm_screen->set_palette(m_palette)', 'm_screen->screen_vblank().set(FUNC(pacman_state::vblank_irq))'], sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3733, sourceColumn: 2, sourceEndLine: 3733, configCalls: ['set_raw(6144000,384,0,288,264,0,224)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6144000, 384, 0, 288, 264, 0, 224], screenRawExpr: ['18.432_MHz_XTAL / 3', '384', '0', '288', '264', '0', '224']};
MERGE (n:KG {id: 'device:pacman_state.pacman/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(pacman_state::screen_update_pacman))', ownerTag: 'screen', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3736, sourceColumn: 2, sourceEndLine: 3736, targetClass: 'pacman_state', targetMethod: 'screen_update_pacman'};
MERGE (n:KG {id: 'handler:pacman_state.screen_update_pacman'}) SET n:Handler SET n += {method: 'screen_update_pacman', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 362, sourceColumn: 1, sourceEndLine: 376, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'if (m_bgpriority != 0)
		bitmap.fill(0, cliprect);
	else
		m_bg_tilemap->draw(screen, bitmap, cliprect, TILEMAP_DRAW_OPAQUE, 0);

	if (m_spriteram != nullptr)
		draw_sprites(screen, bitmap, cliprect);

	if (m_bgpriority != 0)
		m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0);

	return 0;'};
MERGE (n:KG {id: 'handler:pacman_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 274, sourceColumn: 1, sourceEndLine: 360, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'uint8_t *spriteram = m_spriteram;
	uint8_t *spriteram_2 = m_spriteram2;

	rectangle spriteclip(2*8, 34*8-1, 0*8, 28*8-1);
	spriteclip &= cliprect;

	/* Draw the sprites. Note that it is important to draw them exactly in this */
	/* order, to have the correct priorities. */
	for (int offs = m_spriteram.bytes() - 2; offs > 2*2; offs -= 2)
	{
		int color;
		int sx,sy;
		uint8_t fx,fy;

		if (m_inv_spr)
		{
			sx = spriteram_2[offs + 1];
			sy = 240 - (spriteram_2[offs]);
		}
		else
		{
			sx = 272 - spriteram_2[offs + 1];
			sy = spriteram_2[offs] - 31;
		}

		fx = (spriteram[offs] & 1) ^ m_inv_spr;
		fy = (spriteram[offs] & 2) ^ ((m_inv_spr) << 1);

		color = (spriteram[offs + 1] & 0x1f) | (m_colortablebank << 5) | (m_palettebank << 6);

		m_gfxdecode->gfx(1)->transmask(bitmap,spriteclip,
				(spriteram[offs] >> 2) | (m_spritebank << 6),
				color,
				fx,fy,
				sx,sy,
				m_palette->transpen_mask(*m_gfxdecode->gfx(1), color & 0x3f, 0));

		/* also plot the sprite with wraparound (tunnel in Crush Roller) */
		m_gfxdecode->gfx(1)->transmask(bitmap,spriteclip,
				(spriteram[offs] >> 2) | (m_spritebank << 6),
				color,
				fx,fy,
				sx - 256,sy,
				m_palette->transpen_mask(*m_gfxdecode->gfx(1), color & 0x3f, 0));
	}

	/* In the Pac Man based games (NOT Pengo) the first two sprites must be offset */
	/* one pixel to the left to get a more correct placement */
	for (int offs = 2*2; offs >= 0; offs -= 2)
	{
		int color;
		int sx,sy;
		uint8_t fx,fy;

		if (m_inv_spr)
		{
			sx = spriteram_2[offs + 1];
			sy = 240 - (spriteram_2[offs]);
		}
		else
		{
			sx = 272 - spriteram_2[offs + 1];
			sy = spriteram_2[offs] - 31;
		}
		color = (spriteram[offs + 1] & 0x1f) | (m_colortablebank << 5) | (m_palettebank << 6);

		fx = (spriteram[offs] & 1) ^ m_inv_spr;
		fy = (spriteram[offs] & 2) ^ ((m_inv_spr) << 1);

		m_gfxdecode->gfx(1)->transmask(bitmap,spriteclip,
				(spriteram[offs] >> 2) | (m_spritebank << 6),
				color,
				fx,fy,
				sx,sy + m_xoffsethack,
				m_palette->transpen_mask(*m_gfxdecode->gfx(1), color & 0x3f, 0));

		/* also plot the sprite with wraparound (tunnel in Crush Roller) */
		m_gfxdecode->gfx(1)->transmask(bitmap,spriteclip,
				(spriteram[offs] >> 2) | (m_spritebank << 6),
				color,
				fx,fy,
				sx - 256,sy + m_xoffsethack,
				m_palette->transpen_mask(*m_gfxdecode->gfx(1), color & 0x3f, 0));
	}'};
MERGE (n:KG {id: 'device:pacman_state.pacman/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set', raw: 'm_screen->screen_vblank().set(FUNC(pacman_state::vblank_irq))', ownerTag: 'screen', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3738, sourceColumn: 2, sourceEndLine: 3738, targetClass: 'pacman_state', targetMethod: 'vblank_irq'};
MERGE (n:KG {id: 'handler:pacman_state.vblank_irq'}) SET n:Handler SET n += {method: 'vblank_irq', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 362, sourceColumn: 1, sourceEndLine: 366, sourceParameters: 'int state', sourceBody: 'if (state && m_irq_mask)
		m_maincpu->set_input_line(INPUT_LINE_IRQ0, ASSERT_LINE);'};
MERGE (n:KG {id: 'device:pacman_state.pacman/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()']};
MERGE (n:KG {id: 'device:pacman_state.pacman/namco'}) SET n:Device SET n += {type: 'NAMCO_WSG', tag: 'namco', clock: 96000, config: ['NAMCO_WSG(config, m_namco_sound, 18.432_MHz_XTAL / 6 / 32)', 'm_namco_sound->add_route(ALL_OUTPUTS, "mono", 1.0)'], sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3745, sourceColumn: 2, sourceEndLine: 3745};
MERGE (n:KG {id: 'audioroute:device:pacman_state.pacman/namco/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 1, raw: 'm_namco_sound->add_route(ALL_OUTPUTS, "mono", 1.0)', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3746, sourceColumn: 2, sourceEndLine: 3746};
MERGE (n:KG {id: 'machine:pacman_state.korosuke'}) SET n:MachineConfig SET n += {cls: 'pacman_state', name: 'korosuke', calls: ['pacman'], stateMembers: ['{"name":"m_cannonb_bit_to_read","bits":8}', '{"name":"m_counter","bits":8}', '{"name":"m_bigbucks_bank","bits":32,"signed":true}', '{"name":"m_rocktrv2_question_bank","bits":8}', '{"name":"m_charbank","bits":8}', '{"name":"m_spritebank","bits":8}', '{"name":"m_palettebank","bits":8}', '{"name":"m_colortablebank","bits":8}', '{"name":"m_flipscreen","bits":8}', '{"name":"m_bgpriority","bits":8}', '{"name":"m_xoffsethack","bits":32,"signed":true}', '{"name":"m_inv_spr","bits":8}', '{"name":"m_maketrax_counter","bits":8}', '{"name":"m_maketrax_offset","bits":8}', '{"name":"m_maketrax_disable_protection","bits":32,"signed":true}', '{"name":"m_irq_mask","bits":1}', '{"name":"m_interrupt_vector","bits":8}'], devicePatches: ['{"tag":"mainlatch","config":["m_mainlatch->q_out_cb<7>().set_nop()"]}'], sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3756, sourceColumn: 1, sourceEndLine: 3764};
MERGE (n:KG {id: 'machine:pacman_state.korosuke/callback:mainlatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set_nop', raw: 'm_mainlatch->q_out_cb<7>().set_nop()', ownerTag: 'mainlatch', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3761, sourceColumn: 2, sourceEndLine: 3761, slot: '7'};
MERGE (n:KG {id: 'inputs:maketrax'}) SET n:InputPorts SET n += {name: 'maketrax', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1943, sourceColumn: 8, sourceEndLine: 1943};
MERGE (n:KG {id: 'inputs:maketrax/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:maketrax/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:maketrax/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:maketrax/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:maketrax/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:maketrax/IN0/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 16, name: 'Cabinet', defaultValue: 0, settings: ['0=Upright', '16=Cocktail']};
MERGE (n:KG {id: 'inputs:maketrax/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_COIN1', defaultValue: 32};
MERGE (n:KG {id: 'inputs:maketrax/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_COIN2', defaultValue: 64};
MERGE (n:KG {id: 'inputs:maketrax/IN0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_SERVICE1', defaultValue: 128};
MERGE (n:KG {id: 'inputs:maketrax/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:maketrax/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:maketrax/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:maketrax/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:maketrax/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:maketrax/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_UNUSED', defaultValue: 0};
MERGE (n:KG {id: 'inputs:maketrax/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_START1', defaultValue: 32};
MERGE (n:KG {id: 'inputs:maketrax/IN1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_START2', defaultValue: 64};
MERGE (n:KG {id: 'inputs:maketrax/IN1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_UNUSED', defaultValue: 0};
MERGE (n:KG {id: 'inputs:maketrax/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:maketrax/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, name: 'Coinage', defaultValue: 1, settings: ['3=2C 1C', '1=1C 1C', '2=1C 2C', '0=Free Play']};
MERGE (n:KG {id: 'inputs:maketrax/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 12, name: 'Lives', defaultValue: 0, settings: ['0=3', '4=4', '8=5', '12=6']};
MERGE (n:KG {id: 'inputs:maketrax/DSW1/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 16, name: 'First Pattern', defaultValue: 16, settings: ['16=Easy', '0=Hard']};
MERGE (n:KG {id: 'inputs:maketrax/DSW1/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 32, name: 'Teleport Holes', defaultValue: 32, settings: ['32=Off', '0=On']};
MERGE (n:KG {id: 'inputs:maketrax/DSW1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 192, activeLow: false, type: 'IPT_UNUSED', defaultValue: 0};
MERGE (n:KG {id: 'inputs:maketrax/DSW2'}) SET n:Port SET n += {tag: 'DSW2', modify: false};
MERGE (n:KG {id: 'inputs:maketrax/DSW2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: false, type: 'IPT_UNUSED', defaultValue: 0};
MERGE (n:KG {id: 'gfxlayout:tilelayout'}) SET n:GfxLayout SET n += {name: 'tilelayout', width: 8, height: 8, total: 'RGN_FRAC(1,2)', planes: 2, planeOffsets: [0, 4], xOffsets: [64, 65, 66, 67, 0, 1, 2, 3], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 128};
MERGE (n:KG {id: 'gfxlayout:spritelayout'}) SET n:GfxLayout SET n += {name: 'spritelayout', width: 16, height: 16, total: 'RGN_FRAC(1,2)', planes: 2, planeOffsets: [0, 4], xOffsets: [64, 65, 66, 67, 128, 129, 130, 131, 192, 193, 194, 195, 0, 1, 2, 3], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 256, 264, 272, 280, 288, 296, 304, 312], charIncrement: 512};
MERGE (n:KG {id: 'gfxdecode:gfx_pacman'}) SET n:GfxDecode SET n += {name: 'gfx_pacman', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3668, sourceColumn: 8, sourceEndLine: 3668};
MERGE (n:KG {id: 'gfxdecode:gfx_pacman/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'tilelayout', colorBase: 0, colorCount: 128, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_pacman/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 4096, layout: 'spritelayout', colorBase: 0, colorCount: 128, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'device:pacman_state.pacman/palette/callback:palette_init'}) SET n:Callback SET n += {signal: 'palette_init', operation: 'palette_init', raw: 'PALETTE(config, m_palette, FUNC(pacman_state::pacman_palette), 128 * 4, 32)', ownerTag: 'palette', targetClass: 'pacman_state', targetMethod: 'pacman_palette', entries: 32, sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3731};
MERGE (n:KG {id: 'handler:pacman_state.pacman_palette'}) SET n:Handler SET n += {method: 'pacman_palette', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 64, sourceColumn: 1, sourceEndLine: 115, sourceParameters: 'palette_device &palette', sourceBody: 'const uint8_t *color_prom = memregion("proms")->base();
	

	// compute the color output resistor weights
	double rweights[3], gweights[3], bweights[2];
	compute_resistor_weights(0, 255, -1.0,
			3, &TABLE(0, 1000, 470, 220), rweights, 0, 0,
			3, &TABLE(0, 1000, 470, 220), gweights, 0, 0,
			2, &TABLE(1, 1000, 470, 220), bweights, 0, 0);

	// create a lookup table for the palette
	for (int i = 0; i < 32; i++)
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

		palette.set_indirect_color(i, rgb_t(r, g, b));
	}

	// color_prom now points to the beginning of the lookup table
	color_prom += 32;

	// allocate the colortable
	for (int i = 0; i < 64*4; i++)
	{
		uint8_t const ctabentry = color_prom[i] & 0x0f;

		// first palette bank
		palette.set_pen_indirect(i, ctabentry);

		// second palette bank
		palette.set_pen_indirect(i + 64*4, 0x10 | ctabentry);
	}'};
MATCH (a:KG {id: 'game:crush'}), (b:KG {id: 'file:src/mame/pacman/pacman.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 9109, sourceColumn: 1, sourceEndLine: 9109};
MATCH (a:KG {id: 'game:crush'}), (b:KG {id: 'machine:pacman_state.korosuke'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:crush'}), (b:KG {id: 'inputs:maketrax'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:crush'}), (b:KG {id: 'romset:crush'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'game:crush'}), (b:KG {id: 'handler:pacman_state.maketrax_protection_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'game:crush'}), (b:KG {id: 'handler:pacman_state.maketrax_special_port2_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'game:crush'}), (b:KG {id: 'handler:pacman_state.maketrax_special_port3_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pacman.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pacman.cpp'}), (b:KG {id: 'file:pacman.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pacman.cpp'}), (b:KG {id: 'file:jumpshot.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pacman.cpp'}), (b:KG {id: 'file:pacplus.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pacman.cpp'}), (b:KG {id: 'file:cpu/s2650/s2650.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pacman.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pacman.cpp'}), (b:KG {id: 'file:machine/nvram.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pacman.cpp'}), (b:KG {id: 'file:sound/ay8910.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pacman.cpp'}), (b:KG {id: 'file:sound/sn76496.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pacman.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pacman.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:pacman_state.korosuke'}), (b:KG {id: 'file:src/mame/pacman/pacman.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3756, sourceColumn: 1, sourceEndLine: 3764};
MATCH (a:KG {id: 'machine:pacman_state.korosuke'}), (b:KG {id: 'machine:pacman_state.pacman'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:pacman_state.korosuke'}), (b:KG {id: 'machine:pacman_state.korosuke/callback:mainlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'inputs:maketrax'}), (b:KG {id: 'file:src/mame/pacman/pacman.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1943, sourceColumn: 8, sourceEndLine: 1943};
MATCH (a:KG {id: 'inputs:maketrax'}), (b:KG {id: 'inputs:maketrax/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:maketrax'}), (b:KG {id: 'inputs:maketrax/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:maketrax'}), (b:KG {id: 'inputs:maketrax/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:maketrax'}), (b:KG {id: 'inputs:maketrax/DSW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:crush'}), (b:KG {id: 'file:src/mame/pacman/pacman.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 6873, sourceColumn: 1, sourceEndLine: 6873};
MATCH (a:KG {id: 'romset:crush'}), (b:KG {id: 'region:crush/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:crush'}), (b:KG {id: 'region:crush/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:crush'}), (b:KG {id: 'region:crush/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:crush'}), (b:KG {id: 'region:crush/namco'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'machine:pacman_state.pacman'}), (b:KG {id: 'file:src/mame/pacman/pacman.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3705, sourceColumn: 1, sourceEndLine: 3747};
MATCH (a:KG {id: 'machine:pacman_state.pacman'}), (b:KG {id: 'handler:pacman_state.video_start_pacman'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:pacman_state.pacman'}), (b:KG {id: 'device:pacman_state.pacman/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:pacman_state.pacman'}), (b:KG {id: 'device:pacman_state.pacman/mainlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:pacman_state.pacman'}), (b:KG {id: 'device:pacman_state.pacman/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:pacman_state.pacman'}), (b:KG {id: 'device:pacman_state.pacman/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:pacman_state.pacman'}), (b:KG {id: 'gfxdecode:gfx_pacman'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:pacman_state.pacman'}), (b:KG {id: 'device:pacman_state.pacman/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:pacman_state.pacman'}), (b:KG {id: 'device:pacman_state.pacman/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:pacman_state.pacman'}), (b:KG {id: 'device:pacman_state.pacman/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:pacman_state.pacman'}), (b:KG {id: 'device:pacman_state.pacman/namco'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:maketrax/IN0'}), (b:KG {id: 'inputs:maketrax/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:maketrax/IN0'}), (b:KG {id: 'inputs:maketrax/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:maketrax/IN0'}), (b:KG {id: 'inputs:maketrax/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:maketrax/IN0'}), (b:KG {id: 'inputs:maketrax/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:maketrax/IN0'}), (b:KG {id: 'inputs:maketrax/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:maketrax/IN0'}), (b:KG {id: 'inputs:maketrax/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:maketrax/IN0'}), (b:KG {id: 'inputs:maketrax/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:maketrax/IN0'}), (b:KG {id: 'inputs:maketrax/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:maketrax/IN1'}), (b:KG {id: 'inputs:maketrax/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:maketrax/IN1'}), (b:KG {id: 'inputs:maketrax/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:maketrax/IN1'}), (b:KG {id: 'inputs:maketrax/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:maketrax/IN1'}), (b:KG {id: 'inputs:maketrax/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:maketrax/IN1'}), (b:KG {id: 'inputs:maketrax/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:maketrax/IN1'}), (b:KG {id: 'inputs:maketrax/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:maketrax/IN1'}), (b:KG {id: 'inputs:maketrax/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:maketrax/IN1'}), (b:KG {id: 'inputs:maketrax/IN1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:maketrax/DSW1'}), (b:KG {id: 'inputs:maketrax/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:maketrax/DSW1'}), (b:KG {id: 'inputs:maketrax/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:maketrax/DSW1'}), (b:KG {id: 'inputs:maketrax/DSW1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:maketrax/DSW1'}), (b:KG {id: 'inputs:maketrax/DSW1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:maketrax/DSW1'}), (b:KG {id: 'inputs:maketrax/DSW1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:maketrax/DSW2'}), (b:KG {id: 'inputs:maketrax/DSW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:crush/maincpu'}), (b:KG {id: 'rom:crush/maincpu/crushkrl.6e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:crush/maincpu'}), (b:KG {id: 'rom:crush/maincpu/crushkrl.6f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:crush/maincpu'}), (b:KG {id: 'rom:crush/maincpu/crushkrl.6h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:crush/maincpu'}), (b:KG {id: 'rom:crush/maincpu/crushkrl.6j'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:crush/gfx1'}), (b:KG {id: 'rom:crush/gfx1/maketrax.5e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:crush/gfx1'}), (b:KG {id: 'rom:crush/gfx1/maketrax.5f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:crush/proms'}), (b:KG {id: 'rom:crush/proms/82s123.7f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:crush/proms'}), (b:KG {id: 'rom:crush/proms/2s140.4a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:crush/namco'}), (b:KG {id: 'rom:crush/namco/82s126.1m'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:crush/namco'}), (b:KG {id: 'rom:crush/namco/82s126.3m'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'handler:pacman_state.video_start_pacman'}), (b:KG {id: 'handler:pacman_state.init_save_state'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:pacman_state.video_start_pacman'}), (b:KG {id: 'handler:pacman_state.pacman_get_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:pacman_state.video_start_pacman'}), (b:KG {id: 'handler:pacman_state.pacman_scan_rows'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/maincpu'}), (b:KG {id: 'device:pacman_state.pacman/maincpu/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/maincpu'}), (b:KG {id: 'map:pacman_state.pacman_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:pacman_state.pacman/maincpu'}), (b:KG {id: 'map:pacman_state.writeport'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:pacman_state.pacman/mainlatch'}), (b:KG {id: 'device:pacman_state.pacman/mainlatch/callback:mainlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/mainlatch'}), (b:KG {id: 'device:pacman_state.pacman/mainlatch/callback:mainlatch:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/mainlatch'}), (b:KG {id: 'device:pacman_state.pacman/mainlatch/callback:mainlatch:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_pacman'}), (b:KG {id: 'file:src/mame/pacman/pacman.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3668, sourceColumn: 8, sourceEndLine: 3668};
MATCH (a:KG {id: 'gfxdecode:gfx_pacman'}), (b:KG {id: 'gfxdecode:gfx_pacman/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_pacman'}), (b:KG {id: 'gfxdecode:gfx_pacman/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/palette'}), (b:KG {id: 'device:pacman_state.pacman/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/screen'}), (b:KG {id: 'device:pacman_state.pacman/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/screen'}), (b:KG {id: 'device:pacman_state.pacman/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/namco'}), (b:KG {id: 'audioroute:device:pacman_state.pacman/namco/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/maincpu/callback:maincpu:0'}), (b:KG {id: 'handler:pacman_state.interrupt_vector_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'file:src/mame/pacman/pacman.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1049, sourceColumn: 1, sourceEndLine: 1068};
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.writeport'}), (b:KG {id: 'file:src/mame/pacman/pacman.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1475, sourceColumn: 1, sourceEndLine: 1479};
MATCH (a:KG {id: 'map:pacman_state.writeport'}), (b:KG {id: 'map:pacman_state.writeport/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/mainlatch/callback:mainlatch:0'}), (b:KG {id: 'handler:pacman_state.irq_mask_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/mainlatch/callback:mainlatch:1'}), (b:KG {id: 'handler:namco_wsg_device.sound_enable_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/mainlatch/callback:mainlatch:2'}), (b:KG {id: 'handler:pacman_state.flipscreen_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_pacman/e0'}), (b:KG {id: 'gfxlayout:tilelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_pacman/e1'}), (b:KG {id: 'gfxlayout:spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/palette/callback:palette_init'}), (b:KG {id: 'handler:pacman_state.pacman_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/screen/callback:screen:0'}), (b:KG {id: 'handler:pacman_state.screen_update_pacman'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/screen/callback:screen:1'}), (b:KG {id: 'handler:pacman_state.vblank_irq'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map/range1'}), (b:KG {id: 'handler:pacman_state.pacman_videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map/range2'}), (b:KG {id: 'handler:pacman_state.pacman_colorram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map/range3'}), (b:KG {id: 'handler:pacman_state.pacman_read_nop'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map/range6'}), (b:KG {id: 'handler:ls259_device.write_d0'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'mainlatch'};
MATCH (a:KG {id: 'map:pacman_state.pacman_map/range7'}), (b:KG {id: 'handler:namco_wsg_device.pacman_sound_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'namco'};
MATCH (a:KG {id: 'map:pacman_state.pacman_map/range11'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:pacman_state.writeport/range0'}), (b:KG {id: 'handler:pacman_state.pacman_interrupt_vector_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'gfxlayout:tilelayout'}), (b:KG {id: 'file:src/mame/pacman/pacman.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:spritelayout'}), (b:KG {id: 'file:src/mame/pacman/pacman.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'handler:pacman_state.screen_update_pacman'}), (b:KG {id: 'handler:pacman_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
