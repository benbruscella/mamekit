// mamekit knowledge graph — driver src/mame/nintendo/dkong.cpp
// generated 2026-08-22T05:52:15.526Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/nintendo/dkong.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/nintendo/dkong.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:dkong.h'}) SET n:SourceFile SET n += {path: 'dkong.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:cpu/s2650/s2650.h'}) SET n:SourceFile SET n += {path: 'cpu/s2650/s2650.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6502/m6502.h'}) SET n:SourceFile SET n += {path: 'cpu/m6502/m6502.h', external: true};
MERGE (n:KG {id: 'file:machine/eepromser.h'}) SET n:SourceFile SET n += {path: 'machine/eepromser.h', external: true};
MERGE (n:KG {id: 'file:sound/sn76496.h'}) SET n:SourceFile SET n += {path: 'sound/sn76496.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:sound/discrete.h'}) SET n:SourceFile SET n += {path: 'sound/discrete.h', external: true};
MERGE (n:KG {id: 'file:src/mame/nintendo/dkong_a.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/nintendo/dkong_a.cpp'};
MERGE (n:KG {id: 'game:dkongjr'}) SET n:Game SET n += {name: 'dkongjr', year: '1982', company: 'Nintendo of America', fullname: 'Donkey Kong Junior (US set F-2)', monitor: 'ROT270', cls: 'dkong_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 3925, sourceColumn: 1, sourceEndLine: 3925};
MERGE (n:KG {id: 'romset:dkongjr'}) SET n:RomSet SET n += {name: 'dkongjr', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 2539, sourceColumn: 1, sourceEndLine: 2539};
MERGE (n:KG {id: 'region:dkongjr/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 2045, sourceColumn: 2, sourceEndLine: 2045};
MERGE (n:KG {id: 'rom:dkongjr/maincpu/djr1-c_5b_f-2.5b'}) SET n:Rom SET n += {file: 'djr1-c_5b_f-2.5b', offset: 0, size: 4096, crc: 'dea28158', sha1: '08baf84ae6f9b40a2c743fe1d8c158c74a40e95a', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 2541, sourceColumn: 2, sourceEndLine: 2541, continueSegments: [12288, 4096, 4096]};
MERGE (n:KG {id: 'rom:dkongjr/maincpu/djr1-c_5c_f-2.5c'}) SET n:Rom SET n += {file: 'djr1-c_5c_f-2.5c', offset: 8192, size: 2048, crc: '6fb5faf6', sha1: 'ce1cfde71a9e2a8b5896a6301d386f72869a1d2e', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 2543, sourceColumn: 2, sourceEndLine: 2543, continueSegments: [18432, 2048, 2048, 4096, 2048, 4096, 22528, 2048, 6144]};
MERGE (n:KG {id: 'rom:dkongjr/maincpu/djr1-c_5e_f-2.5e'}) SET n:Rom SET n += {file: 'djr1-c_5e_f-2.5e', offset: 16384, size: 2048, crc: 'd042b6a8', sha1: '57ac237d273496b44220b4437118115ef11dbd9f', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 2547, sourceColumn: 2, sourceEndLine: 2547, continueSegments: [10240, 2048, 2048, 20480, 2048, 4096, 6144, 2048, 6144]};
MERGE (n:KG {id: 'region:dkongjr/soundcpu'}) SET n:RomRegion SET n += {tag: 'soundcpu', size: 4096, flags: '0', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 2052, sourceColumn: 2, sourceEndLine: 2052};
MERGE (n:KG {id: 'rom:dkongjr/soundcpu/djr1-c_3h.3h'}) SET n:Rom SET n += {file: 'djr1-c_3h.3h', offset: 0, size: 4096, crc: '715da5f8', sha1: 'f708c3fd374da65cbd9fe2e191152f5d865414a0', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 2554, sourceColumn: 2, sourceEndLine: 2554};
MERGE (n:KG {id: 'region:dkongjr/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 8192, flags: '0', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 2058, sourceColumn: 2, sourceEndLine: 2058};
MERGE (n:KG {id: 'rom:dkongjr/gfx1/djr1-v.3n'}) SET n:Rom SET n += {file: 'djr1-v.3n', offset: 0, size: 4096, crc: '8d51aca9', sha1: '64887564b079d98e98aafa53835e398f34fe4e3f', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 2557, sourceColumn: 2, sourceEndLine: 2557};
MERGE (n:KG {id: 'rom:dkongjr/gfx1/djr1-v.3p'}) SET n:Rom SET n += {file: 'djr1-v.3p', offset: 4096, size: 4096, crc: '4ef64ba5', sha1: '41a7a4005087951f57f62c9751d62a8c495e6bb3', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 2558, sourceColumn: 2, sourceEndLine: 2558};
MERGE (n:KG {id: 'region:dkongjr/gfx2'}) SET n:RomRegion SET n += {tag: 'gfx2', size: 8192, flags: '0', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 2062, sourceColumn: 2, sourceEndLine: 2062};
MERGE (n:KG {id: 'rom:dkongjr/gfx2/djr1-v_7c.7c'}) SET n:Rom SET n += {file: 'djr1-v_7c.7c', offset: 0, size: 2048, crc: 'dc7f4164', sha1: '07a6242e95b5c3b8dfdcd4b4950f463dba16dd77', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 2561, sourceColumn: 2, sourceEndLine: 2561};
MERGE (n:KG {id: 'rom:dkongjr/gfx2/djr1-v_7d.7d'}) SET n:Rom SET n += {file: 'djr1-v_7d.7d', offset: 2048, size: 2048, crc: '0ce7dcf6', sha1: '0654b77526c49f0dfa077ac4f1f69cf5cb2e2f64', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 2562, sourceColumn: 2, sourceEndLine: 2562};
MERGE (n:KG {id: 'rom:dkongjr/gfx2/djr1-v_7e.7e'}) SET n:Rom SET n += {file: 'djr1-v_7e.7e', offset: 4096, size: 2048, crc: '24d1ff17', sha1: '696854bf3dc5447d33b4815db357e6ce3834d867', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 2563, sourceColumn: 2, sourceEndLine: 2563};
MERGE (n:KG {id: 'rom:dkongjr/gfx2/djr1-v_7f.7f'}) SET n:Rom SET n += {file: 'djr1-v_7f.7f', offset: 6144, size: 2048, crc: '0f8c083f', sha1: '0b688ae9da296b2447fffa5e135fd6a56ec3e790', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 2564, sourceColumn: 2, sourceEndLine: 2564};
MERGE (n:KG {id: 'region:dkongjr/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 768, flags: '0', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 2071, sourceColumn: 2, sourceEndLine: 2071};
MERGE (n:KG {id: 'rom:dkongjr/proms/djr1-c-2e.2e'}) SET n:Rom SET n += {file: 'djr1-c-2e.2e', offset: 0, size: 256, crc: '463dc7ad', sha1: 'b2c9f22facc8885be2d953b056eb8dcddd4f34cb', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 2567, sourceColumn: 2, sourceEndLine: 2567};
MERGE (n:KG {id: 'rom:dkongjr/proms/djr1-c-2f.2f'}) SET n:Rom SET n += {file: 'djr1-c-2f.2f', offset: 256, size: 256, crc: '47ba0042', sha1: 'dbec3f4b8013628c5b8f83162e5f8b1f82f6ee5f', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 2568, sourceColumn: 2, sourceEndLine: 2568};
MERGE (n:KG {id: 'rom:dkongjr/proms/djr1-v-2n.2n'}) SET n:Rom SET n += {file: 'djr1-v-2n.2n', offset: 512, size: 256, crc: 'dbf185bf', sha1: '2697a991a4afdf079dd0b7e732f71c7618f43b70', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 2569, sourceColumn: 2, sourceEndLine: 2569};
MERGE (n:KG {id: 'map:dkong_state.dkong_map'}) SET n:AddressMap SET n += {cls: 'dkong_state', name: 'dkong_map', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 793, sourceColumn: 1, sourceEndLine: 813};
MERGE (n:KG {id: 'map:dkong_state.dkong_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 20479, raw: 'map(0x0000, 0x4fff).rom()', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 795, sourceColumn: 2, sourceEndLine: 795, rom: true};
MERGE (n:KG {id: 'map:dkong_state.dkong_map/range1'}) SET n:AddressRange SET n += {start: 24576, end: 27647, raw: 'map(0x6000, 0x6bff).ram()', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 796, sourceColumn: 2, sourceEndLine: 796, ram: true};
MERGE (n:KG {id: 'map:dkong_state.dkong_map/range2'}) SET n:AddressRange SET n += {start: 28672, end: 29695, raw: 'map(0x7000, 0x73ff).ram().share("sprite_ram")', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 797, sourceColumn: 2, sourceEndLine: 797, ram: true, share: 'sprite_ram'};
MERGE (n:KG {id: 'map:dkong_state.dkong_map/range3'}) SET n:AddressRange SET n += {start: 29696, end: 30719, raw: 'map(0x7400, 0x77ff).ram().w(FUNC(dkong_state::dkong_videoram_w)).share("video_ram")', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 798, sourceColumn: 2, sourceEndLine: 798, ram: true, share: 'video_ram'};
MERGE (n:KG {id: 'handler:dkong_state.dkong_videoram_w'}) SET n:Handler SET n += {method: 'dkong_videoram_w', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong_v.cpp', sourceLine: 454, sourceColumn: 1, sourceEndLine: 461, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'if (m_video_ram[offset] != data)
	{
		m_video_ram[offset] = data;
		m_bg_tilemap->mark_tile_dirty(offset);
	}'};
MERGE (n:KG {id: 'map:dkong_state.dkong_map/range4'}) SET n:AddressRange SET n += {start: 30720, end: 30735, raw: 'map(0x7800, 0x780f).rw(m_dma8257, FUNC(i8257_device::read), FUNC(i8257_device::write))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 799, sourceColumn: 2, sourceEndLine: 799};
MERGE (n:KG {id: 'handler:i8257_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'i8257_device', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 933, sourceColumn: 2, sourceEndLine: 933};
MERGE (n:KG {id: 'handler:i8257_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'i8257_device', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 933, sourceColumn: 2, sourceEndLine: 933};
MERGE (n:KG {id: 'map:dkong_state.dkong_map/range5'}) SET n:AddressRange SET n += {start: 31744, end: 31744, raw: 'map(0x7c00, 0x7c00).portr("IN0").w("ls175.3d", FUNC(latch8_device::write))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 800, sourceColumn: 2, sourceEndLine: 800, portRead: 'IN0'};
MERGE (n:KG {id: 'handler:latch8_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'latch8_device', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1419, sourceColumn: 2, sourceEndLine: 1419};
MERGE (n:KG {id: 'map:dkong_state.dkong_map/range6'}) SET n:AddressRange SET n += {start: 31872, end: 31872, raw: 'map(0x7c80, 0x7c80).portr("IN1").w(FUNC(dkong_state::radarscp_grid_color_w))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 801, sourceColumn: 2, sourceEndLine: 801, portRead: 'IN1'};
MERGE (n:KG {id: 'handler:dkong_state.radarscp_grid_color_w'}) SET n:Handler SET n += {method: 'radarscp_grid_color_w', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong_v.cpp', sourceLine: 504, sourceColumn: 1, sourceEndLine: 508, sourceParameters: 'uint8_t data', sourceBody: 'm_grid_col = (data & 0x07) ^ 0x07;
	/* popmessage("Gridcol: %d", m_grid_col); */'};
MERGE (n:KG {id: 'map:dkong_state.dkong_map/range7'}) SET n:AddressRange SET n += {start: 32000, end: 32000, raw: 'map(0x7d00, 0x7d00).r(FUNC(dkong_state::dkong_in2_r))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 803, sourceColumn: 2, sourceEndLine: 803};
MERGE (n:KG {id: 'handler:dkong_state.dkong_in2_r'}) SET n:Handler SET n += {method: 'dkong_in2_r', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 624, sourceColumn: 1, sourceEndLine: 635, sourceParameters: 'offs_t offset', sourceBody: '// 2 board DK and all DKjr has a watchdog
	if (m_watchdog)
		m_watchdog->watchdog_reset();

	uint8_t r = ioport("IN2")->read();
	machine().bookkeeping().coin_counter_w(offset, r >> 7);
	if (ioport("SERVICE1")->read() & 1)
		r |= 0x80; /* service ==> coin */
	return r;'};
MERGE (n:KG {id: 'map:dkong_state.dkong_map/range8'}) SET n:AddressRange SET n += {start: 32000, end: 32007, raw: 'map(0x7d00, 0x7d07).w(m_dev_6h, FUNC(latch8_device::bit0_w))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 804, sourceColumn: 2, sourceEndLine: 804};
MERGE (n:KG {id: 'handler:latch8_device.bit0_w'}) SET n:Handler SET n += {method: 'bit0_w', ownerClass: 'latch8_device', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 889, sourceColumn: 2, sourceEndLine: 889};
MERGE (n:KG {id: 'map:dkong_state.dkong_map/range9'}) SET n:AddressRange SET n += {start: 32128, end: 32128, raw: 'map(0x7d80, 0x7d80).portr("DSW0").w(FUNC(dkong_state::dkong_audio_irq_w))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 806, sourceColumn: 2, sourceEndLine: 806, portRead: 'DSW0'};
MERGE (n:KG {id: 'handler:dkong_state.dkong_audio_irq_w'}) SET n:Handler SET n += {method: 'dkong_audio_irq_w', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1257, sourceColumn: 1, sourceEndLine: 1263, sourceParameters: 'uint8_t data', sourceBody: 'if (data)
		m_soundcpu->set_input_line(0, ASSERT_LINE);
	else
		m_soundcpu->set_input_line(0, CLEAR_LINE);'};
MERGE (n:KG {id: 'map:dkong_state.dkong_map/range10'}) SET n:AddressRange SET n += {start: 32129, end: 32129, raw: 'map(0x7d81, 0x7d81).w(FUNC(dkong_state::radarscp_grid_enable_w))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 807, sourceColumn: 2, sourceEndLine: 807};
MERGE (n:KG {id: 'handler:dkong_state.radarscp_grid_enable_w'}) SET n:Handler SET n += {method: 'radarscp_grid_enable_w', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong_v.cpp', sourceLine: 499, sourceColumn: 1, sourceEndLine: 502, sourceParameters: 'uint8_t data', sourceBody: 'm_grid_on = data & 0x01;'};
MERGE (n:KG {id: 'map:dkong_state.dkong_map/range11'}) SET n:AddressRange SET n += {start: 32130, end: 32130, raw: 'map(0x7d82, 0x7d82).w(FUNC(dkong_state::dkong_flipscreen_w))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 808, sourceColumn: 2, sourceEndLine: 808};
MERGE (n:KG {id: 'handler:dkong_state.dkong_flipscreen_w'}) SET n:Handler SET n += {method: 'dkong_flipscreen_w', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong_v.cpp', sourceLine: 510, sourceColumn: 1, sourceEndLine: 513, sourceParameters: 'uint8_t data', sourceBody: 'm_flip = data & 0x01;'};
MERGE (n:KG {id: 'map:dkong_state.dkong_map/range12'}) SET n:AddressRange SET n += {start: 32131, end: 32131, raw: 'map(0x7d83, 0x7d83).w(FUNC(dkong_state::dkong_spritebank_w))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 809, sourceColumn: 2, sourceEndLine: 809};
MERGE (n:KG {id: 'handler:dkong_state.dkong_spritebank_w'}) SET n:Handler SET n += {method: 'dkong_spritebank_w', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong_v.cpp', sourceLine: 515, sourceColumn: 1, sourceEndLine: 518, sourceParameters: 'uint8_t data', sourceBody: 'm_sprite_bank = data & 0x01;'};
MERGE (n:KG {id: 'map:dkong_state.dkong_map/range13'}) SET n:AddressRange SET n += {start: 32132, end: 32132, raw: 'map(0x7d84, 0x7d84).w(FUNC(dkong_state::nmi_mask_w))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 810, sourceColumn: 2, sourceEndLine: 810};
MERGE (n:KG {id: 'handler:dkong_state.nmi_mask_w'}) SET n:Handler SET n += {method: 'nmi_mask_w', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 780, sourceColumn: 1, sourceEndLine: 785, sourceParameters: 'uint8_t data', sourceBody: 'm_nmi_mask = data & 1;
	if (!m_nmi_mask)
		m_maincpu->set_input_line(INPUT_LINE_NMI, CLEAR_LINE);'};
MERGE (n:KG {id: 'map:dkong_state.dkong_map/range14'}) SET n:AddressRange SET n += {start: 32133, end: 32133, raw: 'map(0x7d85, 0x7d85).w(FUNC(dkong_state::p8257_drq_w))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 811, sourceColumn: 2, sourceEndLine: 811};
MERGE (n:KG {id: 'handler:dkong_state.p8257_drq_w'}) SET n:Handler SET n += {method: 'p8257_drq_w', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 616, sourceColumn: 1, sourceEndLine: 622, sourceParameters: 'uint8_t data', sourceBody: 'm_dma8257->dreq0_w(data & 0x01);
	m_dma8257->dreq1_w(data & 0x01);
	machine().scheduler().abort_timeslice(); // transfer occurs immediately
	machine().scheduler().perfect_quantum(attotime::from_usec(100)); // smooth things out a bit'};
MERGE (n:KG {id: 'map:dkong_state.dkong_map/range15'}) SET n:AddressRange SET n += {start: 32134, end: 32135, raw: 'map(0x7d86, 0x7d87).w(FUNC(dkong_state::dkong_palettebank_w))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 812, sourceColumn: 2, sourceEndLine: 812};
MERGE (n:KG {id: 'handler:dkong_state.dkong_palettebank_w'}) SET n:Handler SET n += {method: 'dkong_palettebank_w', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong_v.cpp', sourceLine: 481, sourceColumn: 1, sourceEndLine: 497, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'int newbank;

	newbank = m_palette_bank;

	if (data & 1)
		newbank |= 1 << offset;
	else
		newbank &= ~(1 << offset);

	if (m_palette_bank != newbank)
	{
		m_palette_bank = newbank;
		m_bg_tilemap->mark_all_dirty();
	}'};
MERGE (n:KG {id: 'map:dkong_state.dkongjr_map'}) SET n:AddressMap SET n += {cls: 'dkong_state', name: 'dkongjr_map', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 815, sourceColumn: 1, sourceEndLine: 843};
MERGE (n:KG {id: 'map:dkong_state.dkongjr_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 24575, raw: 'map(0x0000, 0x5fff).rom()', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 817, sourceColumn: 2, sourceEndLine: 817, rom: true};
MERGE (n:KG {id: 'map:dkong_state.dkongjr_map/range1'}) SET n:AddressRange SET n += {start: 24576, end: 27647, raw: 'map(0x6000, 0x6bff).ram()', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 818, sourceColumn: 2, sourceEndLine: 818, ram: true};
MERGE (n:KG {id: 'map:dkong_state.dkongjr_map/range2'}) SET n:AddressRange SET n += {start: 27648, end: 28671, raw: 'map(0x6c00, 0x6fff).ram()', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 819, sourceColumn: 2, sourceEndLine: 819, ram: true};
MERGE (n:KG {id: 'map:dkong_state.dkongjr_map/range3'}) SET n:AddressRange SET n += {start: 28672, end: 29695, raw: 'map(0x7000, 0x73ff).ram().share("sprite_ram")', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 820, sourceColumn: 2, sourceEndLine: 820, ram: true, share: 'sprite_ram'};
MERGE (n:KG {id: 'map:dkong_state.dkongjr_map/range4'}) SET n:AddressRange SET n += {start: 29696, end: 30719, raw: 'map(0x7400, 0x77ff).ram().w(FUNC(dkong_state::dkong_videoram_w)).share("video_ram")', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 821, sourceColumn: 2, sourceEndLine: 821, ram: true, share: 'video_ram'};
MERGE (n:KG {id: 'map:dkong_state.dkongjr_map/range5'}) SET n:AddressRange SET n += {start: 30720, end: 30735, raw: 'map(0x7800, 0x780f).rw(m_dma8257, FUNC(i8257_device::read), FUNC(i8257_device::write))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 822, sourceColumn: 2, sourceEndLine: 822};
MERGE (n:KG {id: 'map:dkong_state.dkongjr_map/range6'}) SET n:AddressRange SET n += {start: 31744, end: 31744, raw: 'map(0x7c00, 0x7c00).portr("IN0").w("ls174.3d", FUNC(latch8_device::write))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 824, sourceColumn: 2, sourceEndLine: 824, portRead: 'IN0'};
MERGE (n:KG {id: 'map:dkong_state.dkongjr_map/range7'}) SET n:AddressRange SET n += {start: 31872, end: 31879, raw: 'map(0x7c80, 0x7c87).w("ls259.4h", FUNC(latch8_device::bit0_w))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 826, sourceColumn: 2, sourceEndLine: 826};
MERGE (n:KG {id: 'map:dkong_state.dkongjr_map/range8'}) SET n:AddressRange SET n += {start: 31872, end: 31872, raw: 'map(0x7c80, 0x7c80).portr("IN1").w(FUNC(dkong_state::dkongjr_gfxbank_w))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 827, sourceColumn: 2, sourceEndLine: 827, portRead: 'IN1'};
MERGE (n:KG {id: 'handler:dkong_state.dkongjr_gfxbank_w'}) SET n:Handler SET n += {method: 'dkongjr_gfxbank_w', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong_v.cpp', sourceLine: 463, sourceColumn: 1, sourceEndLine: 470, sourceParameters: 'uint8_t data', sourceBody: 'if (m_gfx_bank != (data & 0x01))
	{
		m_gfx_bank = data & 0x01;
		m_bg_tilemap->mark_all_dirty();
	}'};
MERGE (n:KG {id: 'map:dkong_state.dkongjr_map/range9'}) SET n:AddressRange SET n += {start: 32000, end: 32000, raw: 'map(0x7d00, 0x7d00).r(FUNC(dkong_state::dkong_in2_r))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 829, sourceColumn: 2, sourceEndLine: 829};
MERGE (n:KG {id: 'map:dkong_state.dkongjr_map/range10'}) SET n:AddressRange SET n += {start: 32000, end: 32007, raw: 'map(0x7d00, 0x7d07).w(m_dev_6h, FUNC(latch8_device::bit0_w))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 830, sourceColumn: 2, sourceEndLine: 830};
MERGE (n:KG {id: 'map:dkong_state.dkongjr_map/range11'}) SET n:AddressRange SET n += {start: 32128, end: 32135, raw: 'map(0x7d80, 0x7d87).w("ls259.5h", FUNC(latch8_device::bit0_w))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 832, sourceColumn: 2, sourceEndLine: 832};
MERGE (n:KG {id: 'map:dkong_state.dkongjr_map/range12'}) SET n:AddressRange SET n += {start: 32128, end: 32128, raw: 'map(0x7d80, 0x7d80).portr("DSW0").w(FUNC(dkong_state::dkong_audio_irq_w))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 833, sourceColumn: 2, sourceEndLine: 833, portRead: 'DSW0'};
MERGE (n:KG {id: 'map:dkong_state.dkongjr_map/range13'}) SET n:AddressRange SET n += {start: 32130, end: 32130, raw: 'map(0x7d82, 0x7d82).w(FUNC(dkong_state::dkong_flipscreen_w))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 834, sourceColumn: 2, sourceEndLine: 834};
MERGE (n:KG {id: 'map:dkong_state.dkongjr_map/range14'}) SET n:AddressRange SET n += {start: 32131, end: 32131, raw: 'map(0x7d83, 0x7d83).w(FUNC(dkong_state::dkong_spritebank_w))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 835, sourceColumn: 2, sourceEndLine: 835};
MERGE (n:KG {id: 'map:dkong_state.dkongjr_map/range15'}) SET n:AddressRange SET n += {start: 32132, end: 32132, raw: 'map(0x7d84, 0x7d84).w(FUNC(dkong_state::nmi_mask_w))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 836, sourceColumn: 2, sourceEndLine: 836};
MERGE (n:KG {id: 'map:dkong_state.dkongjr_map/range16'}) SET n:AddressRange SET n += {start: 32133, end: 32133, raw: 'map(0x7d85, 0x7d85).w(FUNC(dkong_state::p8257_drq_w))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 837, sourceColumn: 2, sourceEndLine: 837};
MERGE (n:KG {id: 'map:dkong_state.dkongjr_map/range17'}) SET n:AddressRange SET n += {start: 32134, end: 32135, raw: 'map(0x7d86, 0x7d87).w(FUNC(dkong_state::dkong_palettebank_w))', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 838, sourceColumn: 2, sourceEndLine: 838};
MERGE (n:KG {id: 'map:dkong_state.dkongjr_map/range18'}) SET n:AddressRange SET n += {start: 32768, end: 40959, raw: 'map(0x8000, 0x9fff).rom()', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 840, sourceColumn: 2, sourceEndLine: 840, rom: true};
MERGE (n:KG {id: 'map:dkong_state.dkongjr_map/range19'}) SET n:AddressRange SET n += {start: 45056, end: 49151, raw: 'map(0xb000, 0xbfff).rom()', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 841, sourceColumn: 2, sourceEndLine: 841, rom: true};
MERGE (n:KG {id: 'map:dkong_state.dkongjr_map/range20'}) SET n:AddressRange SET n += {start: 53248, end: 57343, raw: 'map(0xd000, 0xdfff).rom()', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 842, sourceColumn: 2, sourceEndLine: 842, rom: true};
MERGE (n:KG {id: 'map:dkong_state.dkong_sound_map'}) SET n:AddressMap SET n += {cls: 'dkong_state', name: 'dkong_sound_map', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1272, sourceColumn: 1, sourceEndLine: 1275};
MERGE (n:KG {id: 'map:dkong_state.dkong_sound_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 4095, raw: 'map(0x0000, 0x0fff).rom()', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1274, sourceColumn: 2, sourceEndLine: 1274, rom: true};
MERGE (n:KG {id: 'map:dkong_state.dkongjr_sound_io_map'}) SET n:AddressMap SET n += {cls: 'dkong_state', name: 'dkongjr_sound_io_map', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1282, sourceColumn: 1, sourceEndLine: 1285};
MERGE (n:KG {id: 'map:dkong_state.dkongjr_sound_io_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 0, raw: 'map(0x00, 0x00).mirror(0xff).r("ls174.3d", FUNC(latch8_device::read))', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1284, sourceColumn: 2, sourceEndLine: 1284, mirror: 255};
MERGE (n:KG {id: 'handler:latch8_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'latch8_device', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1347, sourceColumn: 2, sourceEndLine: 1347};
MERGE (n:KG {id: 'handler:dkong_state.dkong_p1_w'}) SET n:Handler SET n += {method: 'dkong_p1_w', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1245, sourceColumn: 1, sourceEndLine: 1248, sourceParameters: 'uint8_t data', sourceBody: 'm_discrete->write(DS_DAC,data);'};
MERGE (n:KG {id: 'machine:dkong_state.dkong_base'}) SET n:MachineConfig SET n += {cls: 'dkong_state', name: 'dkong_base', calls: [], startHandlers: ['dkong_state.video_start_dkong'], sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1770, sourceColumn: 1, sourceEndLine: 1801};
MERGE (n:KG {id: 'handler:dkong_state.video_start_dkong'}) SET n:Handler SET n += {method: 'video_start_dkong', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong_v.cpp', sourceLine: 933, sourceColumn: 1, sourceEndLine: 963, sourceParameters: '', sourceBody: 'VIDEO_START_CALL_MEMBER(dkong_base);

	m_scanline_timer = timer_alloc(FUNC(dkong_state::scanline_callback), this);
	m_scanline_timer->adjust(m_screen->time_until_pos(0));

	switch (m_hardware_type)
	{
		case HARDWARE_TRS02:
			m_screen->register_screen_bitmap(m_bg_bits);
			m_gfx3 = memregion("gfx3")->base();
			m_gfx3_len = memregion("gfx3")->bytes();
			[[fallthrough]];
		case HARDWARE_TKG04:
		case HARDWARE_TKG02:
			m_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(dkong_state::dkong_bg_tile_info)), TILEMAP_SCAN_ROWS,  8, 8, 32, 32);
			break;
		case HARDWARE_TRS01:
			m_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(dkong_state::radarscp1_bg_tile_info)), TILEMAP_SCAN_ROWS,  8, 8, 32, 32);

			m_screen->register_screen_bitmap(m_bg_bits);
			m_gfx4 = memregion("gfx4")->base();
			m_gfx3 = memregion("gfx3")->base();
			m_gfx3_len = memregion("gfx3")->bytes();

			break;
		default:
			fatalerror("Invalid hardware type in dkong_video_start\\n");
	}'};
MERGE (n:KG {id: 'handler:dkong_state.scanline_callback'}) SET n:Handler SET n += {method: 'scanline_callback', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong_v.cpp', sourceLine: 852, sourceColumn: 1, sourceEndLine: 866, sourceConstants: ['VTOTAL=264'], sourceParameters: 'int param', sourceBody: 'int scanline = param;

	if ((m_hardware_type == HARDWARE_TRS02) || (m_hardware_type == HARDWARE_TRS01))
		radarscp_scanline(scanline);

	/* update any video up to the current scanline */
//  m_screen->update_now();
	m_screen->update_partial(m_screen->vpos());

	scanline = (scanline+1) % VTOTAL;
	/* come back at the next appropriate scanline */
	m_scanline_timer->adjust(m_screen->time_until_pos(scanline), scanline);'};
MERGE (n:KG {id: 'handler:dkong_state.radarscp_scanline'}) SET n:Handler SET n += {method: 'radarscp_scanline', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong_v.cpp', sourceLine: 819, sourceColumn: 1, sourceEndLine: 850, sourceConstants: ['RADARSCP_BCK_COL_OFFSET=256', 'RADARSCP_GRID_COL_OFFSET=512', 'RADARSCP_STAR_COL=520'], sourceParameters: 'int scanline', sourceBody: 'uint8_t const *const table = m_gfx3;
	int         table_len = m_gfx3_len;
	const rectangle &visarea = m_screen->visible_area();

	int y = scanline;
	radarscp_step(y);
	if (y <= visarea.min_y || y > visarea.max_y)
		m_counter = 0;
	int offset = (m_flip ^ m_rflip_sig) ? 0x000 : 0x400;
	int x = 0;
	while (x < m_screen->width())
	{
		uint16_t *const pixel = &m_bg_bits.pix(y, x);
		if ((m_counter < table_len) && (x == 4 * (table[m_counter|offset] & 0x7f)))
		{
			if ( m_star_ff && (table[m_counter|offset] & 0x80) )    /* star */
				*pixel = RADARSCP_STAR_COL;
			else if (m_grid_sig && !(table[m_counter|offset] & 0x80))           /* radar */
				*pixel = RADARSCP_GRID_COL_OFFSET+m_grid_col;
			else
				*pixel = RADARSCP_BCK_COL_OFFSET + m_blue_level;
			m_counter++;
		}
		else
			*pixel = RADARSCP_BCK_COL_OFFSET + m_blue_level;
		x++;
	}
	while ((m_counter < table_len) && (x < 4 * (table[m_counter|offset] & 0x7f)))
		m_counter++;'};
MERGE (n:KG {id: 'handler:dkong_state.radarscp_step'}) SET n:Handler SET n += {method: 'radarscp_step', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong_v.cpp', sourceLine: 670, sourceColumn: 1, sourceEndLine: 792, sourceConstants: ['HTOTAL=384', 'VTOTAL=264'], sourceParameters: 'int line_cnt', sourceBody: '/* Condensator is illegible in schematics for TRS2 board.
	 * TRS1 board states 3.3u.
	 */

	double vg3i;
	double diff;
	int sig;

	/* vsync is divided by 2 by a LS161
	 * The resulting 30 Hz signal clocks a LFSR (LS164) operating as a
	 * random number generator.
	 */

	if ( line_cnt == 0)
	{
		m_sig30Hz = (1-m_sig30Hz);
		if (m_sig30Hz)
			m_lfsr_5I = (machine().rand() > RAND_MAX/2);
	}

	/* sound2 mixes in a 30Hz noise signal.
	 * With the current model this has no real effect
	 * Included for completeness
	 */

	/* Now mix with SND02 (sound 2) line - on 74ls259, bit2 */
	m_rflip_sig = m_dev_6h->bit2_r() & m_lfsr_5I;

	/* blue background generation */

	line_cnt += (256 - 8) + 1; // offset 8 needed to match monitor pictures
	if (line_cnt>511)
		line_cnt -= VTOTAL;

	sig = m_rflip_sig ^ ((line_cnt & 0x80)>>7);

	if (m_hardware_type == HARDWARE_TRS01)
		m_rflip_sig = !m_rflip_sig;

	if  (sig) /*  128VF */
		diff = (0.0 - m_cv1);
	else
		diff = (4.8 - m_cv1);
	diff = diff - diff*exp(0.0 - (1.0/RC1 * dt) );
	m_cv1 += diff;

	diff = (m_cv1 - m_cv2 - m_vg1);
	diff = diff - diff*exp(0.0 - (1.0/RC2 * dt) );
	m_cv2 += diff;

	// FIXME: use the inverse function
	// Solve the amplifier by iteration
	for (int j=1; j<=11; j++)// 11% = 1/75 / (1/75+1/10)
	{
		double f = (double) j / 100.0;
		m_vg1 = (m_cv1 - m_cv2)*(1-f) + f * m_vg2;
		m_vg2 = 5*CD4049(m_vg1/5);
	}
	// FIXME: use the inverse function
	// Solve the amplifier by iteration 50% = both resistors equal
	for (int j=10; j<=20; j++)
	{
		double f = (double) j / 40.0;
		vg3i = (1.0-f) * m_vg2 + f * m_vg3;
		m_vg3 = 5*CD4049(vg3i/5);
	}

#define RC17 (33e-6 * 1e3 * (0*4.7+1.0/(1.0/10.0+1.0/20.0+0.0/0.3)))
	diff = (m_vg3 - m_vc17);
	diff = diff - diff*exp(0.0 - (1.0/RC17 * dt) );
	m_vc17 += diff;

	double vo = (m_vg3 - m_vc17);
	vo = vo + 20.0 / (20.0+10.0) * 5;

	// Transistor is marked as OMIT in TRS-02 schems.
	//vo = vo - 0.7;


	//double vo = (vg3o - vg3)/4.7 + 5.0/16.0;
	//vo = vo / (1.0 / 4.7 + 1.0 / 16.0 + 1.0 / 30.0 );
	//printf("%f %f\\n", vg3, vc17);

	m_blue_level = (int)(vo/5.0*255);
	//printf("%d\\n", m_blue_level);

	/*
	 * Grid signal
	 *
	 * Mixed with ANS line (bit 5) from Port B of 8039
	 */
	if (m_grid_on && m_dev_vp2->bit5_r())
	{
		diff = (0.0 - m_cv3);
		diff = diff - diff*exp(0.0 - (1.0/RC32 * dt) );
	}
	else
	{
		diff = (5.0 - m_cv3);
		diff = diff - diff*exp(0.0 - (1.0/RC31 * dt) );
	}
	m_cv3 += diff;

	diff = (m_vg2 - 0.8 * m_cv3 - m_cv4);
	diff = diff - diff*exp(0.0 - (1.0/RC4 * dt) );
	m_cv4 += diff;

	if (CD4049(CD4049((m_vg2 - m_cv4)/5.0))>2.4/5.0) /* TTL - Level */
		m_grid_sig = 0;
	else
		m_grid_sig = 1;

	/* stars */
	m_pixelcnt += HTOTAL;
	if (m_pixelcnt > period2 )
	{
		m_star_ff = !m_star_ff;
		m_pixelcnt = m_pixelcnt - period2;
	}'};
MERGE (n:KG {id: 'handler:dkong_state.CD4049'}) SET n:Handler SET n += {method: 'CD4049', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong_v.cpp', sourceLine: 650, sourceColumn: 1, sourceEndLine: 656, sourceParameters: 'double x', sourceBody: 'if (x>0)
		return exp(-m_cd4049_a * pow(x,m_cd4049_b));
	else
		return 1.0;'};
MERGE (n:KG {id: 'handler:dkong_state.dkong_bg_tile_info'}) SET n:Handler SET n += {method: 'dkong_bg_tile_info', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong_v.cpp', sourceLine: 431, sourceColumn: 1, sourceEndLine: 437, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int code = m_video_ram[tile_index] + 256 * m_gfx_bank;
	int color = (m_color_codes[tile_index % 32 + 32 * (tile_index / 32 / 4)] & 0x0f) + 0x10 * m_palette_bank;

	tileinfo.set(0, code, color, 0);'};
MERGE (n:KG {id: 'handler:dkong_state.radarscp1_bg_tile_info'}) SET n:Handler SET n += {method: 'radarscp1_bg_tile_info', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong_v.cpp', sourceLine: 439, sourceColumn: 1, sourceEndLine: 446, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int code = m_video_ram[tile_index] + 256 * m_gfx_bank;
	int color = (m_color_codes[tile_index % 32] & 0x0f);
	color = color | (m_palette_bank<<4);

	tileinfo.set(0, code, color, 0);'};
MERGE (n:KG {id: 'device:dkong_state.dkong_base/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 3072000, config: ['Z80(config, m_maincpu, CLOCK_1H)', 'm_maincpu->set_addrmap(AS_PROGRAM, &dkong_state::dkong_map)', 'downcast<z80_device &>(*m_maincpu).busack_cb().set(m_dma8257, FUNC(i8257_device::hlda_w))'], sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1773, sourceColumn: 2, sourceEndLine: 1773};
MERGE (n:KG {id: 'device:dkong_state.dkong_base/maincpu/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'busack_cb', operation: 'set', raw: 'downcast<z80_device &>(*m_maincpu).busack_cb().set(m_dma8257, FUNC(i8257_device::hlda_w))', ownerTag: 'maincpu', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1775, sourceColumn: 2, sourceEndLine: 1775, targetClass: 'i8257_device', targetMethod: 'hlda_w', targetTag: 'dma8257'};
MERGE (n:KG {id: 'handler:i8257_device.hlda_w'}) SET n:Handler SET n += {method: 'hlda_w', ownerClass: 'i8257_device', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1973, sourceColumn: 2, sourceEndLine: 1973};
MERGE (n:KG {id: 'device:dkong_state.dkong_base/dma8257'}) SET n:Device SET n += {type: 'I8257', tag: 'dma8257', clock: 3072000, config: ['I8257(config, m_dma8257, CLOCK_1H)', 'm_dma8257->out_hrq_cb().set_inputline(m_maincpu, Z80_INPUT_LINE_BUSREQ)', 'm_dma8257->in_memr_cb().set(FUNC(dkong_state::memory_read_byte))', 'm_dma8257->out_memw_cb().set(FUNC(dkong_state::memory_write_byte))', 'm_dma8257->in_ior_cb<1>().set(FUNC(dkong_state::p8257_ctl_r))', 'm_dma8257->out_iow_cb<0>().set(FUNC(dkong_state::p8257_ctl_w))', 'm_dma8257->set_reverse_rw_mode(true)']};
MERGE (n:KG {id: 'device:dkong_state.dkong_base/dma8257/callback:dma8257:0'}) SET n:Callback SET n += {signal: 'out_hrq_cb', operation: 'set_inputline', raw: 'm_dma8257->out_hrq_cb().set_inputline(m_maincpu, Z80_INPUT_LINE_BUSREQ)', ownerTag: 'dma8257', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1781, sourceColumn: 2, sourceEndLine: 1781, inputLine: 'Z80_INPUT_LINE_BUSREQ', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:dkong_state.dkong_base/dma8257/callback:dma8257:1'}) SET n:Callback SET n += {signal: 'in_memr_cb', operation: 'set', raw: 'm_dma8257->in_memr_cb().set(FUNC(dkong_state::memory_read_byte))', ownerTag: 'dma8257', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1782, sourceColumn: 2, sourceEndLine: 1782, targetClass: 'dkong_state', targetMethod: 'memory_read_byte'};
MERGE (n:KG {id: 'handler:dkong_state.memory_read_byte'}) SET n:Handler SET n += {method: 'memory_read_byte', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 437, sourceColumn: 1, sourceEndLine: 441, sourceParameters: 'offs_t offset', sourceBody: 'address_space& prog_space = m_maincpu->space(AS_PROGRAM);
	return prog_space.read_byte(offset);'};
MERGE (n:KG {id: 'device:dkong_state.dkong_base/dma8257/callback:dma8257:2'}) SET n:Callback SET n += {signal: 'out_memw_cb', operation: 'set', raw: 'm_dma8257->out_memw_cb().set(FUNC(dkong_state::memory_write_byte))', ownerTag: 'dma8257', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1783, sourceColumn: 2, sourceEndLine: 1783, targetClass: 'dkong_state', targetMethod: 'memory_write_byte'};
MERGE (n:KG {id: 'handler:dkong_state.memory_write_byte'}) SET n:Handler SET n += {method: 'memory_write_byte', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 443, sourceColumn: 1, sourceEndLine: 447, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'address_space& prog_space = m_maincpu->space(AS_PROGRAM);
	prog_space.write_byte(offset, data);'};
MERGE (n:KG {id: 'device:dkong_state.dkong_base/dma8257/callback:dma8257:3'}) SET n:Callback SET n += {signal: 'in_ior_cb', operation: 'set', raw: 'm_dma8257->in_ior_cb<1>().set(FUNC(dkong_state::p8257_ctl_r))', ownerTag: 'dma8257', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1784, sourceColumn: 2, sourceEndLine: 1784, slot: '1', targetClass: 'dkong_state', targetMethod: 'p8257_ctl_r'};
MERGE (n:KG {id: 'handler:dkong_state.p8257_ctl_r'}) SET n:Handler SET n += {method: 'p8257_ctl_r', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 594, sourceColumn: 1, sourceEndLine: 597, sourceParameters: '', sourceBody: 'return m_dma_latch;'};
MERGE (n:KG {id: 'device:dkong_state.dkong_base/dma8257/callback:dma8257:4'}) SET n:Callback SET n += {signal: 'out_iow_cb', operation: 'set', raw: 'm_dma8257->out_iow_cb<0>().set(FUNC(dkong_state::p8257_ctl_w))', ownerTag: 'dma8257', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1785, sourceColumn: 2, sourceEndLine: 1785, slot: '0', targetClass: 'dkong_state', targetMethod: 'p8257_ctl_w'};
MERGE (n:KG {id: 'handler:dkong_state.p8257_ctl_w'}) SET n:Handler SET n += {method: 'p8257_ctl_w', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 599, sourceColumn: 1, sourceEndLine: 602, sourceParameters: 'uint8_t data', sourceBody: 'm_dma_latch = data;'};
MERGE (n:KG {id: 'device:dkong_state.dkong_base/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(PIXEL_CLOCK, HTOTAL, HBEND, HBSTART, VTOTAL, VBEND, VBSTART)', 'm_screen->set_screen_update(FUNC(dkong_state::screen_update_dkong))', 'm_screen->set_palette(m_palette)', 'm_screen->screen_vblank().set(FUNC(dkong_state::vblank_irq))'], sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1791, sourceColumn: 2, sourceEndLine: 1791, configCalls: ['set_raw(6144000,384,0,256,264,16,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6144000, 384, 0, 256, 264, 16, 240]};
MERGE (n:KG {id: 'device:dkong_state.dkong_base/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(dkong_state::screen_update_dkong))', ownerTag: 'screen', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1793, sourceColumn: 2, sourceEndLine: 1793, targetClass: 'dkong_state', targetMethod: 'screen_update_dkong'};
MERGE (n:KG {id: 'handler:dkong_state.screen_update_dkong'}) SET n:Handler SET n += {method: 'screen_update_dkong', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong_v.cpp', sourceLine: 965, sourceColumn: 1, sourceEndLine: 987, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'machine().tilemap().set_flip_all(m_flip ? TILEMAP_FLIPX | TILEMAP_FLIPY : 0);

	switch (m_hardware_type)
	{
		case HARDWARE_TKG02:
		case HARDWARE_TKG04:
			check_palette();
			m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0);
			draw_sprites(bitmap, cliprect, 0x40, 1);
			break;
		case HARDWARE_TRS01:
		case HARDWARE_TRS02:
			m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0);
			draw_sprites(bitmap, cliprect, 0x40, 1);
			radarscp_draw_background(bitmap, cliprect);
			break;
		default:
			fatalerror("Invalid hardware type in dkong_video_update\\n");
	}
	return 0;'};
MERGE (n:KG {id: 'handler:dkong_state.check_palette'}) SET n:Handler SET n += {method: 'check_palette', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong_v.cpp', sourceLine: 868, sourceColumn: 1, sourceEndLine: 891, sourceParameters: '', sourceBody: 'ioport_port *port;
	int newset;

	port = ioport("VIDHW");
	if (port != nullptr)
	{
		newset = port->read();
		if (newset != m_vidhw)
		{
			m_vidhw = newset;
			switch (newset)
			{
				case DKONG_RADARSCP_CONVERSION:
					radarscp_palette(*m_palette);
					break;
				case DKONG_BOARD:
					dkong2b_palette(*m_palette);
					break;
			}
		}
	}'};
MERGE (n:KG {id: 'handler:dkong_state.radarscp_palette'}) SET n:Handler SET n += {method: 'radarscp_palette', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong_v.cpp', sourceLine: 261, sourceColumn: 1, sourceEndLine: 319, sourceConstants: ['RADARSCP_BCK_COL_OFFSET=256', 'RADARSCP_GRID_COL_OFFSET=512', 'RADARSCP_STAR_COL=520'], sourceParameters: 'palette_device &palette', sourceBody: 'const uint8_t *color_prom = memregion("proms")->base();

	for (int i = 0; i < 256; i++)
	{
		// red component
		int const r = compute_res_net((color_prom[256] >> 1) & 0x07, 0, radarscp_net_info);
		// green component
		int const g = compute_res_net(((color_prom[256] << 2) & 0x04) | ((color_prom[0] >> 2) & 0x03), 1, radarscp_net_info);
		// blue component
		int const b = compute_res_net((color_prom[0] >> 0) & 0x03, 2, radarscp_net_info);

		palette.set_pen_color(i, r, g, b);
		color_prom++;
	}

	// Now treat tri-state black background generation
	for (int i = 0; i < 256; i++)
		if ((m_vidhw != DKONG_RADARSCP_CONVERSION) && ((i & 0x03) == 0x00)) // NOR => CS=1 => Tristate => real black
		{
			int const r = compute_res_net(1, 0, radarscp_net_bck_info);
			int const g = compute_res_net(1, 1, radarscp_net_bck_info);
			int const b = compute_res_net(1, 2, radarscp_net_bck_info);
			palette.set_pen_color(i,r,g,b);
		}

	// Star color
	palette.set_pen_color(RADARSCP_STAR_COL,
			compute_res_net(1, 0, radarscp_stars_net_info),
			compute_res_net(0, 1, radarscp_stars_net_info),
			compute_res_net(0, 2, radarscp_stars_net_info));

	// Oscillating background
	for (int i = 0; i < 256; i++)
	{
		int const r = compute_res_net(0, 0, radarscp_blue_net_info);
		int const g = compute_res_net(0, 1, radarscp_blue_net_info);
		int const b = compute_res_net(i, 2, radarscp_blue_net_info);

		palette.set_pen_color(RADARSCP_BCK_COL_OFFSET + i, r, g, b);
	}

	// Grid
	for (int i = 0; i < 8; i++)
	{
		int const r = compute_res_net(BIT(i, 0), 0, radarscp_grid_net_info);
		int const g = compute_res_net(BIT(i, 1), 1, radarscp_grid_net_info);
		int const b = compute_res_net(BIT(i, 2), 2, radarscp_grid_net_info);

		palette.set_pen_color(RADARSCP_GRID_COL_OFFSET + i, r, g, b);
	}

	palette.palette()->normalize_range(0, RADARSCP_GRID_COL_OFFSET + 7);

	color_prom += 256;
	// color_prom now points to the beginning of the character color codes
	m_color_codes = color_prom; // we\'ll need it later'};
MERGE (n:KG {id: 'handler:dkong_state.dkong2b_palette'}) SET n:Handler SET n += {method: 'dkong2b_palette', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong_v.cpp', sourceLine: 201, sourceColumn: 1, sourceEndLine: 224, sourceParameters: 'palette_device &palette', sourceBody: 'const uint8_t *color_prom = memregion("proms")->base();

	std::vector<rgb_t> rgb;
	compute_res_net_all(rgb, color_prom, dkong_decode_info, dkong_net_info);
	palette.set_pen_colors(0, rgb);

	// Now treat tri-state black background generation
	for (int i = 0; i < 256; i++)
		if ((i & 0x03) == 0x00)  // NOR => CS=1 => Tristate => real black
		{
			int const r = compute_res_net(1, 0, dkong_net_bck_info);
			int const g = compute_res_net(1, 1, dkong_net_bck_info);
			int const b = compute_res_net(1, 2, dkong_net_bck_info);
			palette.set_pen_color(i, r, g, b);
		}

	palette.palette()->normalize_range(0, 255);

	color_prom += 512;
	// color_prom now points to the beginning of the character color codes
	m_color_codes = color_prom; // we\'ll need it later'};
MERGE (n:KG {id: 'handler:dkong_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong_v.cpp', sourceLine: 526, sourceColumn: 1, sourceEndLine: 630, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect, uint32_t mask_bank, uint32_t shift_bits', sourceBody: 'int offs;
	int scanline_vf;    /* buffering scanline including flip */
	int scanline_vfc;   /* line buffering scanline including flip - this is the cached scanline_vf */
	int scanline;       /* current scanline */
	int add_y;
	int add_x;
	int num_sprt;

	/* Draw the sprites. There are two pecularities which have been mentioned by
	 * a Donkey Kong II author at CAX 2008:
	 * 1) On real hardware, sprites wrap around from the right to the left instead
	 *    of clipping.
	 * 2) On real hardware, there is a limit of 16 sprites per scanline.
	 *    Sprites after the 16th (starting from the left) simply don\'t show.
	 *
	 * 2) is in line with the real hardware which buffers the sprite data
	 * for one scanline. The ram is 64x9 and a sprite takes 4 bytes.
	 * ==> 16 sprites per scanline.
	 *
	 * TODO: 9th bit is not understood right now.
	 *
	 * 1) is due to limitation of signals to 8 bit.
	 *
	 * This is quite different from galaxian. The dkong hardware updates sprites
	 * only once every frame by dma. The number of sprites can not be processed
	 * directly, Thus the preselection. The buffering takes place during the
	 * active phase of the video signal. The scanline is than rendered into the linebuffer
	 * during HBLANK.
	 *
	 * A sprite will be drawn:
	 * a) FlipQ = 1 : (sprite_y + 0xF9 + scanline) & 0xF0 == 0xF0
	 * b) FlipQ = 0 : (sprite_y + 0xF7 + (scanline ^ 0xFF)) & 0xF0 == 0xF0
	 *
	 * FlipQ = 1 ("Normal Play"):
	 *
	 * sprite_y = 0x20
	 *
	 * scanline
	 * 0x10, 0xEF, 0x208, 0x00
	 * 0x18, 0xE7, 0x200, 0x00
	 * 0x19, 0xE6, 0x1FF, 0xF0
	 * 0x20, 0xDF, 0x1F8, 0xF0
	 *
	 */

	scanline_vf = (cliprect.max_y - 1) & 0xFF;
	scanline_vfc = (cliprect.max_y - 1) & 0xFF;
	scanline = cliprect.max_y & 0xFF;

	if (m_flip)
	{
		scanline_vf ^= 0xFF;
		scanline_vfc ^= 0xFF;
		add_y = 0xF7;
		add_x = 0xF7;
	}
	else
	{
		add_y = 0xF9;
		add_x = 0xF7;
	}

	for (offs = m_sprite_bank<<9, num_sprt=0; (num_sprt < 16) && (offs < (m_sprite_bank<<9) + 0x200) /* sprite_ram_size */; offs += 4)
	{
		int y = m_sprite_ram[offs];
		int do_draw = (((y + add_y + 1 + scanline_vf) & 0xF0) == 0xF0) ? 1 : 0;

		if (do_draw)
		{
			/* sprite_ram[offs + 2] & 0x40 is used by Donkey Kong 3 only */
			/* sprite_ram[offs + 2] & 0x30 don\'t seem to be used (they are */
			/* probably not part of the color code, since Mario Bros, which */
			/* has similar hardware, uses a memory mapped port to change */
			/* palette bank, so it\'s limited to 16 color codes) */

			int code = (m_sprite_ram[offs + 1] & 0x7f) + ((m_sprite_ram[offs + 2] & mask_bank) << shift_bits);
			int color = (m_sprite_ram[offs + 2] & 0x0f) + 16 * m_palette_bank;
			int flipx = m_sprite_ram[offs + 2] & 0x80;
			int flipy = m_sprite_ram[offs + 1] & 0x80;

			/* On the real board, the x and y are read inverted after the first
			 * buffer stage. This due to the fact that the 82S09 delivers complements
			 * of stored data on read!
			 */

			int x = (m_sprite_ram[offs + 3] + add_x + 1) & 0xFF;
			if (m_flip)
			{
				x = (x ^ 0xFF) - 15;
				flipx = !flipx;
			}
			y = scanline - ((y + add_y + 1 + scanline_vfc) & 0x0F);

			m_gfxdecode->gfx(1)->transpen(bitmap,cliprect, code, color, flipx, flipy, x, y, 0);

			// wraparound
			m_gfxdecode->gfx(1)->transpen(bitmap,cliprect, code, color, flipx, flipy, m_flip ? x + 256 : x - 256, y, 0);
			m_gfxdecode->gfx(1)->transpen(bitmap,cliprect, code, color, flipx, flipy, x, y - 256, 0);

			num_sprt++;
		}
	}'};
MERGE (n:KG {id: 'handler:dkong_state.radarscp_draw_background'}) SET n:Handler SET n += {method: 'radarscp_draw_background', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong_v.cpp', sourceLine: 794, sourceColumn: 1, sourceEndLine: 817, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'const uint8_t     *htable = nullptr;

	if (m_hardware_type == HARDWARE_TRS01)
		htable = m_gfx4;

	int y = cliprect.min_y;
	while (y <= cliprect.max_y)
	{
		int x = cliprect.min_x;
		while (x <= cliprect.max_x)
		{
			uint16_t *const pixel = &bitmap.pix(y, x);
			uint8_t draw_ok = !(*pixel & 0x01) && !(*pixel & 0x02);
			if (m_hardware_type == HARDWARE_TRS01) /*  Check again from schematics */
				draw_ok = draw_ok  && !((htable[ (!m_rflip_sig<<7) | (x>>2)] >>2) & 0x01);
			if (draw_ok)
				*pixel = m_bg_bits.pix(y, x);
			x++;
		}
		y++;
	}'};
MERGE (n:KG {id: 'device:dkong_state.dkong_base/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set', raw: 'm_screen->screen_vblank().set(FUNC(dkong_state::vblank_irq))', ownerTag: 'screen', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1795, sourceColumn: 2, sourceEndLine: 1795, targetClass: 'dkong_state', targetMethod: 'vblank_irq'};
MERGE (n:KG {id: 'handler:dkong_state.vblank_irq'}) SET n:Handler SET n += {method: 'vblank_irq', ownerClass: 'dkong_state', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1764, sourceColumn: 1, sourceEndLine: 1768, sourceParameters: 'int state', sourceBody: 'if (state && m_nmi_mask)
		m_maincpu->set_input_line(INPUT_LINE_NMI, ASSERT_LINE);'};
MERGE (n:KG {id: 'device:dkong_state.dkong_base/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_dkong)'], sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1797, sourceColumn: 2, sourceEndLine: 1797, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:dkong_state.dkong_base/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(dkong_state::dkong2b_palette), DK2B_PALETTE_LENGTH)'], sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1798, sourceColumn: 2, sourceEndLine: 1798, clockExpr: 'FUNC(dkong_state::dkong2b_palette)'};
MERGE (n:KG {id: 'machine:dkong_state.dkongjr'}) SET n:MachineConfig SET n += {cls: 'dkong_state', name: 'dkongjr', calls: ['dkong_base', 'dkongjr_audio'], sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1921, sourceColumn: 1, sourceEndLine: 1931};
MERGE (n:KG {id: 'device:dkong_state.dkongjr/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, m_watchdog)'], sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1930, sourceColumn: 2, sourceEndLine: 1930};
MERGE (n:KG {id: 'handler:discrete_device.write_line_DS_SOUND0_INP'}) SET n:Handler SET n += {method: 'write_line_DS_SOUND0_INP', ownerClass: 'discrete_device', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1397, sourceColumn: 2, sourceEndLine: 1397};
MERGE (n:KG {id: 'handler:discrete_device.write_line_DS_SOUND1_INP'}) SET n:Handler SET n += {method: 'write_line_DS_SOUND1_INP', ownerClass: 'discrete_device', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1398, sourceColumn: 2, sourceEndLine: 1398};
MERGE (n:KG {id: 'handler:discrete_device.write_line_DS_SOUND2_INP'}) SET n:Handler SET n += {method: 'write_line_DS_SOUND2_INP', ownerClass: 'discrete_device', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1399, sourceColumn: 2, sourceEndLine: 1399};
MERGE (n:KG {id: 'handler:discrete_device.write_line_DS_SOUND7_INP'}) SET n:Handler SET n += {method: 'write_line_DS_SOUND7_INP', ownerClass: 'discrete_device', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1400, sourceColumn: 2, sourceEndLine: 1400};
MERGE (n:KG {id: 'handler:latch8_device.bit3_r'}) SET n:Handler SET n += {method: 'bit3_r', ownerClass: 'latch8_device', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1410, sourceColumn: 2, sourceEndLine: 1410};
MERGE (n:KG {id: 'handler:discrete_device.write_line_DS_DISCHARGE_INV'}) SET n:Handler SET n += {method: 'write_line_DS_DISCHARGE_INV', ownerClass: 'discrete_device', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1412, sourceColumn: 2, sourceEndLine: 1412};
MERGE (n:KG {id: 'handler:latch8_device.bit5_q_r'}) SET n:Handler SET n += {method: 'bit5_q_r', ownerClass: 'latch8_device', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1420, sourceColumn: 2, sourceEndLine: 1420};
MERGE (n:KG {id: 'handler:latch8_device.bit4_q_r'}) SET n:Handler SET n += {method: 'bit4_q_r', ownerClass: 'latch8_device', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1421, sourceColumn: 2, sourceEndLine: 1421};
MERGE (n:KG {id: 'machine:dkong_state.dkongjr_audio'}) SET n:MachineConfig SET n += {cls: 'dkong_state', name: 'dkongjr_audio', calls: [], sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1391, sourceColumn: 1, sourceEndLine: 1426};
MERGE (n:KG {id: 'device:dkong_state.dkongjr_audio/ls174.3d'}) SET n:Device SET n += {type: 'LATCH8', tag: 'ls174.3d', clock: null, config: ['LATCH8(config, "ls174.3d").set_maskout(0xe0)']};
MERGE (n:KG {id: 'device:dkong_state.dkongjr_audio/ls259.6h'}) SET n:Device SET n += {type: 'LATCH8', tag: 'ls259.6h', clock: null, config: ['LATCH8(config, m_dev_6h)', 'm_dev_6h->write_cb<0>().set("discrete", FUNC(discrete_device::write_line<DS_SOUND0_INP>))', 'm_dev_6h->write_cb<1>().set("discrete", FUNC(discrete_device::write_line<DS_SOUND1_INP>))', 'm_dev_6h->write_cb<2>().set("discrete", FUNC(discrete_device::write_line<DS_SOUND2_INP>))', 'm_dev_6h->write_cb<7>().set("discrete", FUNC(discrete_device::write_line<DS_SOUND7_INP>))'], sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1396, sourceColumn: 2, sourceEndLine: 1396};
MERGE (n:KG {id: 'device:dkong_state.dkongjr_audio/ls259.6h/callback:ls259_6h:0'}) SET n:Callback SET n += {signal: 'write_cb', operation: 'set', raw: 'm_dev_6h->write_cb<0>().set("discrete", FUNC(discrete_device::write_line<DS_SOUND0_INP>))', ownerTag: 'ls259.6h', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1397, sourceColumn: 2, sourceEndLine: 1397, slot: '0', targetTag: 'discrete', targetClass: 'discrete_device', targetMethod: 'write_line_DS_SOUND0_INP'};
MERGE (n:KG {id: 'device:dkong_state.dkongjr_audio/ls259.6h/callback:ls259_6h:1'}) SET n:Callback SET n += {signal: 'write_cb', operation: 'set', raw: 'm_dev_6h->write_cb<1>().set("discrete", FUNC(discrete_device::write_line<DS_SOUND1_INP>))', ownerTag: 'ls259.6h', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1398, sourceColumn: 2, sourceEndLine: 1398, slot: '1', targetTag: 'discrete', targetClass: 'discrete_device', targetMethod: 'write_line_DS_SOUND1_INP'};
MERGE (n:KG {id: 'device:dkong_state.dkongjr_audio/ls259.6h/callback:ls259_6h:2'}) SET n:Callback SET n += {signal: 'write_cb', operation: 'set', raw: 'm_dev_6h->write_cb<2>().set("discrete", FUNC(discrete_device::write_line<DS_SOUND2_INP>))', ownerTag: 'ls259.6h', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1399, sourceColumn: 2, sourceEndLine: 1399, slot: '2', targetTag: 'discrete', targetClass: 'discrete_device', targetMethod: 'write_line_DS_SOUND2_INP'};
MERGE (n:KG {id: 'device:dkong_state.dkongjr_audio/ls259.6h/callback:ls259_6h:3'}) SET n:Callback SET n += {signal: 'write_cb', operation: 'set', raw: 'm_dev_6h->write_cb<7>().set("discrete", FUNC(discrete_device::write_line<DS_SOUND7_INP>))', ownerTag: 'ls259.6h', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1400, sourceColumn: 2, sourceEndLine: 1400, slot: '7', targetTag: 'discrete', targetClass: 'discrete_device', targetMethod: 'write_line_DS_SOUND7_INP'};
MERGE (n:KG {id: 'device:dkong_state.dkongjr_audio/ls259.5h'}) SET n:Device SET n += {type: 'LATCH8', tag: 'ls259.5h', clock: null, config: ['latch8_device &dev_5h(LATCH8(config, "ls259.5h"))', 'dev_5h.write_cb<1>().set("discrete", FUNC(discrete_device::write_line<DS_SOUND9_INP>))'], sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1402, sourceColumn: 2, sourceEndLine: 1402};
MERGE (n:KG {id: 'device:dkong_state.dkongjr_audio/ls259.5h/callback:ls259_5h:0'}) SET n:Callback SET n += {signal: 'write_cb', operation: 'set', raw: 'dev_5h.write_cb<1>().set("discrete", FUNC(discrete_device::write_line<DS_SOUND9_INP>))', ownerTag: 'ls259.5h', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1403, sourceColumn: 2, sourceEndLine: 1403, slot: '1', targetTag: 'discrete', targetClass: 'discrete_device', targetMethod: 'write_line_DS_SOUND9_INP'};
MERGE (n:KG {id: 'handler:discrete_device.write_line_DS_SOUND9_INP'}) SET n:Handler SET n += {method: 'write_line_DS_SOUND9_INP', ownerClass: 'discrete_device', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1403, sourceColumn: 2, sourceEndLine: 1403};
MERGE (n:KG {id: 'device:dkong_state.dkongjr_audio/ls259.4h'}) SET n:Device SET n += {type: 'LATCH8', tag: 'ls259.4h', clock: null, config: ['LATCH8(config, "ls259.4h")'], sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1405, sourceColumn: 2, sourceEndLine: 1405};
MERGE (n:KG {id: 'device:dkong_state.dkongjr_audio/virtual_p2'}) SET n:Device SET n += {type: 'LATCH8', tag: 'virtual_p2', clock: null, config: ['LATCH8(config, m_dev_vp2)', 'm_dev_vp2->set_xorvalue(0x70)', 'm_dev_vp2->read_cb<6>().set("ls259.4h", FUNC(latch8_device::bit1_r))', 'm_dev_vp2->read_cb<5>().set(m_dev_6h, FUNC(latch8_device::bit3_r))', 'm_dev_vp2->read_cb<4>().set(m_dev_6h, FUNC(latch8_device::bit6_r))', 'm_dev_vp2->write_cb<7>().set("discrete", FUNC(discrete_device::write_line<DS_DISCHARGE_INV>))'], sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1407, sourceColumn: 2, sourceEndLine: 1407, configCalls: ['set_xorvalue(112)']};
MERGE (n:KG {id: 'device:dkong_state.dkongjr_audio/virtual_p2/callback:virtual_p2:0'}) SET n:Callback SET n += {signal: 'read_cb', operation: 'set', raw: 'm_dev_vp2->read_cb<6>().set("ls259.4h", FUNC(latch8_device::bit1_r))', ownerTag: 'virtual_p2', slot: '6', targetTag: 'ls259.4h', targetClass: 'latch8_device', targetMethod: 'bit1_r'};
MERGE (n:KG {id: 'handler:latch8_device.bit1_r'}) SET n:Handler SET n += {method: 'bit1_r', ownerClass: 'latch8_device'};
MERGE (n:KG {id: 'device:dkong_state.dkongjr_audio/virtual_p2/callback:virtual_p2:1'}) SET n:Callback SET n += {signal: 'read_cb', operation: 'set', raw: 'm_dev_vp2->read_cb<5>().set(m_dev_6h, FUNC(latch8_device::bit3_r))', ownerTag: 'virtual_p2', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1410, sourceColumn: 2, sourceEndLine: 1410, slot: '5', targetClass: 'latch8_device', targetMethod: 'bit3_r', targetTag: 'ls259.6h'};
MERGE (n:KG {id: 'device:dkong_state.dkongjr_audio/virtual_p2/callback:virtual_p2:2'}) SET n:Callback SET n += {signal: 'read_cb', operation: 'set', raw: 'm_dev_vp2->read_cb<4>().set(m_dev_6h, FUNC(latch8_device::bit6_r))', ownerTag: 'virtual_p2', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1411, sourceColumn: 2, sourceEndLine: 1411, slot: '4', targetClass: 'latch8_device', targetMethod: 'bit6_r', targetTag: 'ls259.6h'};
MERGE (n:KG {id: 'handler:latch8_device.bit6_r'}) SET n:Handler SET n += {method: 'bit6_r', ownerClass: 'latch8_device', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1411, sourceColumn: 2, sourceEndLine: 1411};
MERGE (n:KG {id: 'device:dkong_state.dkongjr_audio/virtual_p2/callback:virtual_p2:3'}) SET n:Callback SET n += {signal: 'write_cb', operation: 'set', raw: 'm_dev_vp2->write_cb<7>().set("discrete", FUNC(discrete_device::write_line<DS_DISCHARGE_INV>))', ownerTag: 'virtual_p2', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1412, sourceColumn: 2, sourceEndLine: 1412, slot: '7', targetTag: 'discrete', targetClass: 'discrete_device', targetMethod: 'write_line_DS_DISCHARGE_INV'};
MERGE (n:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu'}) SET n:Device SET n += {type: 'MB8884', tag: 'soundcpu', clock: 6000000, config: ['MB8884(config, m_soundcpu, I8035_CLOCK)', 'm_soundcpu->set_addrmap(AS_PROGRAM, &dkong_state::dkong_sound_map)', 'm_soundcpu->set_addrmap(AS_IO, &dkong_state::dkongjr_sound_io_map)', 'm_soundcpu->p1_out_cb().set(FUNC(dkong_state::dkong_p1_w))', 'm_soundcpu->p2_in_cb().set(m_dev_vp2, FUNC(latch8_device::read))', 'm_soundcpu->p2_out_cb().set(m_dev_vp2, FUNC(latch8_device::write))', 'm_soundcpu->t0_in_cb().set(m_dev_6h, FUNC(latch8_device::bit5_q_r))', 'm_soundcpu->t1_in_cb().set(m_dev_6h, FUNC(latch8_device::bit4_q_r))'], sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1414, sourceColumn: 2, sourceEndLine: 1414};
MERGE (n:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu/callback:soundcpu:0'}) SET n:Callback SET n += {signal: 'p1_out_cb', operation: 'set', raw: 'm_soundcpu->p1_out_cb().set(FUNC(dkong_state::dkong_p1_w))', ownerTag: 'soundcpu', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1417, sourceColumn: 2, sourceEndLine: 1417, targetClass: 'dkong_state', targetMethod: 'dkong_p1_w'};
MERGE (n:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu/callback:soundcpu:1'}) SET n:Callback SET n += {signal: 'p2_in_cb', operation: 'set', raw: 'm_soundcpu->p2_in_cb().set(m_dev_vp2, FUNC(latch8_device::read))', ownerTag: 'soundcpu', targetClass: 'latch8_device', targetMethod: 'read', targetTag: 'virtual_p2'};
MERGE (n:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu/callback:soundcpu:2'}) SET n:Callback SET n += {signal: 'p2_out_cb', operation: 'set', raw: 'm_soundcpu->p2_out_cb().set(m_dev_vp2, FUNC(latch8_device::write))', ownerTag: 'soundcpu', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1419, sourceColumn: 2, sourceEndLine: 1419, targetClass: 'latch8_device', targetMethod: 'write', targetTag: 'virtual_p2'};
MERGE (n:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu/callback:soundcpu:3'}) SET n:Callback SET n += {signal: 't0_in_cb', operation: 'set', raw: 'm_soundcpu->t0_in_cb().set(m_dev_6h, FUNC(latch8_device::bit5_q_r))', ownerTag: 'soundcpu', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1420, sourceColumn: 2, sourceEndLine: 1420, targetClass: 'latch8_device', targetMethod: 'bit5_q_r', targetTag: 'ls259.6h'};
MERGE (n:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu/callback:soundcpu:4'}) SET n:Callback SET n += {signal: 't1_in_cb', operation: 'set', raw: 'm_soundcpu->t1_in_cb().set(m_dev_6h, FUNC(latch8_device::bit4_q_r))', ownerTag: 'soundcpu', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1421, sourceColumn: 2, sourceEndLine: 1421, targetClass: 'latch8_device', targetMethod: 'bit4_q_r', targetTag: 'ls259.6h'};
MERGE (n:KG {id: 'device:dkong_state.dkongjr_audio/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1423, sourceColumn: 2, sourceEndLine: 1423};
MERGE (n:KG {id: 'device:dkong_state.dkongjr_audio/discrete'}) SET n:Device SET n += {type: 'DISCRETE', tag: 'discrete', clock: null, config: ['DISCRETE(config, "discrete", dkongjr_discrete).add_route(ALL_OUTPUTS, "mono", 0.5)'], sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1425, sourceColumn: 2, sourceEndLine: 1425, clockExpr: 'dkongjr_discrete'};
MERGE (n:KG {id: 'audioroute:device:dkong_state.dkongjr_audio/discrete/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.5, raw: 'DISCRETE(config, "discrete", dkongjr_discrete).add_route(ALL_OUTPUTS, "mono", 0.5)', sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1425, sourceColumn: 2, sourceEndLine: 1425};
MERGE (n:KG {id: 'inputs:dkong_in0_4'}) SET n:InputPorts SET n += {name: 'dkong_in0_4', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 978, sourceColumn: 8, sourceEndLine: 978};
MERGE (n:KG {id: 'inputs:dkong_in0_4/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:dkong_in0_4/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY']};
MERGE (n:KG {id: 'inputs:dkong_in0_4/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY']};
MERGE (n:KG {id: 'inputs:dkong_in0_4/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY']};
MERGE (n:KG {id: 'inputs:dkong_in0_4/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY']};
MERGE (n:KG {id: 'inputs:dkong_in0_4/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_BUTTON1'};
MERGE (n:KG {id: 'inputs:dkong_in0_4/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:dkong_in0_4/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:dkong_in0_4/IN0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:dkong_in1_4'}) SET n:InputPorts SET n += {name: 'dkong_in1_4', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 990, sourceColumn: 8, sourceEndLine: 990};
MERGE (n:KG {id: 'inputs:dkong_in1_4/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:dkong_in1_4/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:dkong_in1_4/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:dkong_in1_4/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:dkong_in1_4/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:dkong_in1_4/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:dkong_in1_4/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:dkong_in1_4/IN1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:dkong_in1_4/IN1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:dkong_in2'}) SET n:InputPorts SET n += {name: 'dkong_in2', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1026, sourceColumn: 8, sourceEndLine: 1026};
MERGE (n:KG {id: 'inputs:dkong_in2/IN2'}) SET n:Port SET n += {tag: 'IN2', modify: false};
MERGE (n:KG {id: 'inputs:dkong_in2/IN2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_SERVICE'};
MERGE (n:KG {id: 'inputs:dkong_in2/IN2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:dkong_in2/IN2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_START1'};
MERGE (n:KG {id: 'inputs:dkong_in2/IN2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_START2'};
MERGE (n:KG {id: 'inputs:dkong_in2/IN2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:dkong_in2/IN2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:dkong_in2/IN2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("virtual_p2", FUNC(latch8_device::bit4_q_r))']};
MERGE (n:KG {id: 'inputs:dkong_in2/IN2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_COIN1'};
MERGE (n:KG {id: 'inputs:dkong_in2/SERVICE1'}) SET n:Port SET n += {tag: 'SERVICE1', modify: false};
MERGE (n:KG {id: 'inputs:dkong_in2/SERVICE1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_SERVICE1'};
MERGE (n:KG {id: 'inputs:dkong_dsw0'}) SET n:InputPorts SET n += {name: 'dkong_dsw0', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1045, sourceColumn: 8, sourceEndLine: 1045};
MERGE (n:KG {id: 'inputs:dkong_dsw0/DSW0'}) SET n:Port SET n += {tag: 'DSW0', modify: false};
MERGE (n:KG {id: 'inputs:dkong_dsw0/DSW0/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, name: 'Lives', defaultValue: 0, location: 'SW1:!1,!2', settings: ['0=3', '1=4', '2=5', '3=6']};
MERGE (n:KG {id: 'inputs:dkong_dsw0/DSW0/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 12, name: 'Bonus Life', defaultValue: 0, location: 'SW1:!3,!4', settings: ['0=7000', '4=10000', '8=15000', '12=20000']};
MERGE (n:KG {id: 'inputs:dkong_dsw0/DSW0/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 112, name: 'Coinage', defaultValue: 0, location: 'SW1:!5,!6,!7', settings: ['112=5C 1C', '80=4C 1C', '48=3C 1C', '16=2C 1C', '0=1C 1C', '32=1C 2C', '64=1C 3C', '96=1C 4C']};
MERGE (n:KG {id: 'inputs:dkong_dsw0/DSW0/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Cabinet', defaultValue: 128, location: 'SW1:!8', settings: ['128=Upright', '0=Cocktail']};
MERGE (n:KG {id: 'inputs:dkongjr'}) SET n:InputPorts SET n += {name: 'dkongjr', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1230, sourceColumn: 8, sourceEndLine: 1230};
MERGE (n:KG {id: 'inputs:dkongjr/IN2'}) SET n:Port SET n += {tag: 'IN2', modify: true};
MERGE (n:KG {id: 'inputs:dkongjr/IN2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_CUSTOM'};
MERGE (n:KG {id: 'inputs:dkongjr/DSW0'}) SET n:Port SET n += {tag: 'DSW0', modify: true};
MERGE (n:KG {id: 'inputs:dkongjr/DSW0/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 12, name: 'Bonus Life', defaultValue: 0, location: 'SW1:!3,!4', settings: ['0=10000', '4=15000', '8=20000', '12=25000']};
MERGE (n:KG {id: 'inputs:dkongjr/TST'}) SET n:Port SET n += {tag: 'TST', modify: false};
MERGE (n:KG {id: 'inputs:dkongjr/TST/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_OTHER', modifiers: ['PORT_CODE(KEYCODE_A)']};
MERGE (n:KG {id: 'inputs:dkongjr/TST/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_OTHER', modifiers: ['PORT_CODE(KEYCODE_B)']};
MERGE (n:KG {id: 'gfxlayout:spritelayout'}) SET n:GfxLayout SET n += {name: 'spritelayout', width: 16, height: 16, total: 'RGN_FRAC(1,4)', planes: 2, planeOffsets: ['RGN_FRAC(1,2)', 'RGN_FRAC(0,2)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 'RGN_FRAC(1,4)', 'RGN_FRAC(1,4)+1', 'RGN_FRAC(1,4)+2', 'RGN_FRAC(1,4)+3', 'RGN_FRAC(1,4)+4', 'RGN_FRAC(1,4)+5', 'RGN_FRAC(1,4)+6', 'RGN_FRAC(1,4)+7'], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120], charIncrement: 128};
MERGE (n:KG {id: 'gfxlayout:gfx_8x8x2_planar'}) SET n:GfxLayout SET n += {name: 'gfx_8x8x2_planar', width: 8, height: 8, total: 'RGN_FRAC(1,2)', planes: 2, planeOffsets: ['RGN_FRAC(1,2)', 'RGN_FRAC(0,2)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxdecode:gfx_dkong'}) SET n:GfxDecode SET n += {name: 'gfx_dkong', sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1686, sourceColumn: 8, sourceEndLine: 1686};
MERGE (n:KG {id: 'gfxdecode:gfx_dkong/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'gfx_8x8x2_planar', colorBase: 0, colorCount: 64, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_dkong/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx2', offset: 0, layout: 'spritelayout', colorBase: 0, colorCount: 64, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:dkongjr'}), (b:KG {id: 'file:src/mame/nintendo/dkong.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 3925, sourceColumn: 1, sourceEndLine: 3925};
MATCH (a:KG {id: 'game:dkongjr'}), (b:KG {id: 'machine:dkong_state.dkongjr'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:dkongjr'}), (b:KG {id: 'inputs:dkongjr'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:dkongjr'}), (b:KG {id: 'romset:dkongjr'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/dkong.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/dkong.cpp'}), (b:KG {id: 'file:dkong.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/dkong.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/dkong.cpp'}), (b:KG {id: 'file:cpu/s2650/s2650.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/dkong.cpp'}), (b:KG {id: 'file:cpu/m6502/m6502.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/dkong.cpp'}), (b:KG {id: 'file:machine/eepromser.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/dkong.cpp'}), (b:KG {id: 'file:sound/sn76496.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/dkong.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:dkong_state.dkongjr'}), (b:KG {id: 'file:src/mame/nintendo/dkong.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1921, sourceColumn: 1, sourceEndLine: 1931};
MATCH (a:KG {id: 'machine:dkong_state.dkongjr'}), (b:KG {id: 'machine:dkong_state.dkong_base'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'machine:dkong_state.dkongjr'}), (b:KG {id: 'machine:dkong_state.dkongjr_audio'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'machine:dkong_state.dkongjr'}), (b:KG {id: 'map:dkong_state.dkongjr_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:dkong_state.dkongjr'}), (b:KG {id: 'device:dkong_state.dkongjr/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:dkongjr'}), (b:KG {id: 'file:src/mame/nintendo/dkong.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1230, sourceColumn: 8, sourceEndLine: 1230};
MATCH (a:KG {id: 'inputs:dkongjr'}), (b:KG {id: 'inputs:dkong_in0_4'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:dkongjr'}), (b:KG {id: 'inputs:dkong_in1_4'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:dkongjr'}), (b:KG {id: 'inputs:dkong_in2'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:dkongjr'}), (b:KG {id: 'inputs:dkong_dsw0'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:dkongjr'}), (b:KG {id: 'inputs:dkongjr/IN2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:dkongjr'}), (b:KG {id: 'inputs:dkongjr/DSW0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:dkongjr'}), (b:KG {id: 'inputs:dkongjr/TST'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:dkongjr'}), (b:KG {id: 'file:src/mame/nintendo/dkong.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 2539, sourceColumn: 1, sourceEndLine: 2539};
MATCH (a:KG {id: 'romset:dkongjr'}), (b:KG {id: 'region:dkongjr/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:dkongjr'}), (b:KG {id: 'region:dkongjr/soundcpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:dkongjr'}), (b:KG {id: 'region:dkongjr/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:dkongjr'}), (b:KG {id: 'region:dkongjr/gfx2'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:dkongjr'}), (b:KG {id: 'region:dkongjr/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'machine:dkong_state.dkong_base'}), (b:KG {id: 'file:src/mame/nintendo/dkong.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1770, sourceColumn: 1, sourceEndLine: 1801};
MATCH (a:KG {id: 'machine:dkong_state.dkong_base'}), (b:KG {id: 'handler:dkong_state.video_start_dkong'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:dkong_state.dkong_base'}), (b:KG {id: 'device:dkong_state.dkong_base/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:dkong_state.dkong_base'}), (b:KG {id: 'device:dkong_state.dkong_base/dma8257'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:dkong_state.dkong_base'}), (b:KG {id: 'device:dkong_state.dkong_base/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:dkong_state.dkong_base'}), (b:KG {id: 'device:dkong_state.dkong_base/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:dkong_state.dkong_base'}), (b:KG {id: 'gfxdecode:gfx_dkong'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:dkong_state.dkong_base'}), (b:KG {id: 'device:dkong_state.dkong_base/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:dkong_state.dkongjr_audio'}), (b:KG {id: 'file:src/mame/nintendo/dkong_a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1391, sourceColumn: 1, sourceEndLine: 1426};
MATCH (a:KG {id: 'machine:dkong_state.dkongjr_audio'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/ls174.3d'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:dkong_state.dkongjr_audio'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/ls259.6h'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:dkong_state.dkongjr_audio'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/ls259.5h'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:dkong_state.dkongjr_audio'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/ls259.4h'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:dkong_state.dkongjr_audio'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/virtual_p2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:dkong_state.dkongjr_audio'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:dkong_state.dkongjr_audio'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:dkong_state.dkongjr_audio'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/discrete'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map'}), (b:KG {id: 'file:src/mame/nintendo/dkong.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 815, sourceColumn: 1, sourceEndLine: 843};
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map'}), (b:KG {id: 'map:dkong_state.dkongjr_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map'}), (b:KG {id: 'map:dkong_state.dkongjr_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map'}), (b:KG {id: 'map:dkong_state.dkongjr_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map'}), (b:KG {id: 'map:dkong_state.dkongjr_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map'}), (b:KG {id: 'map:dkong_state.dkongjr_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map'}), (b:KG {id: 'map:dkong_state.dkongjr_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map'}), (b:KG {id: 'map:dkong_state.dkongjr_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map'}), (b:KG {id: 'map:dkong_state.dkongjr_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map'}), (b:KG {id: 'map:dkong_state.dkongjr_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map'}), (b:KG {id: 'map:dkong_state.dkongjr_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map'}), (b:KG {id: 'map:dkong_state.dkongjr_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map'}), (b:KG {id: 'map:dkong_state.dkongjr_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map'}), (b:KG {id: 'map:dkong_state.dkongjr_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map'}), (b:KG {id: 'map:dkong_state.dkongjr_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map'}), (b:KG {id: 'map:dkong_state.dkongjr_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map'}), (b:KG {id: 'map:dkong_state.dkongjr_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map'}), (b:KG {id: 'map:dkong_state.dkongjr_map/range16'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map'}), (b:KG {id: 'map:dkong_state.dkongjr_map/range17'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map'}), (b:KG {id: 'map:dkong_state.dkongjr_map/range18'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map'}), (b:KG {id: 'map:dkong_state.dkongjr_map/range19'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map'}), (b:KG {id: 'map:dkong_state.dkongjr_map/range20'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'inputs:dkong_in0_4'}), (b:KG {id: 'file:src/mame/nintendo/dkong.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 978, sourceColumn: 8, sourceEndLine: 978};
MATCH (a:KG {id: 'inputs:dkong_in0_4'}), (b:KG {id: 'inputs:dkong_in0_4/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:dkong_in1_4'}), (b:KG {id: 'file:src/mame/nintendo/dkong.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 990, sourceColumn: 8, sourceEndLine: 990};
MATCH (a:KG {id: 'inputs:dkong_in1_4'}), (b:KG {id: 'inputs:dkong_in1_4/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:dkong_in2'}), (b:KG {id: 'file:src/mame/nintendo/dkong.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1026, sourceColumn: 8, sourceEndLine: 1026};
MATCH (a:KG {id: 'inputs:dkong_in2'}), (b:KG {id: 'inputs:dkong_in2/IN2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:dkong_in2'}), (b:KG {id: 'inputs:dkong_in2/SERVICE1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:dkong_dsw0'}), (b:KG {id: 'file:src/mame/nintendo/dkong.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1045, sourceColumn: 8, sourceEndLine: 1045};
MATCH (a:KG {id: 'inputs:dkong_dsw0'}), (b:KG {id: 'inputs:dkong_dsw0/DSW0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:dkongjr/IN2'}), (b:KG {id: 'inputs:dkongjr/IN2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkongjr/DSW0'}), (b:KG {id: 'inputs:dkongjr/DSW0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkongjr/TST'}), (b:KG {id: 'inputs:dkongjr/TST/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkongjr/TST'}), (b:KG {id: 'inputs:dkongjr/TST/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:dkongjr/maincpu'}), (b:KG {id: 'rom:dkongjr/maincpu/djr1-c_5b_f-2.5b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:dkongjr/maincpu'}), (b:KG {id: 'rom:dkongjr/maincpu/djr1-c_5c_f-2.5c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:dkongjr/maincpu'}), (b:KG {id: 'rom:dkongjr/maincpu/djr1-c_5e_f-2.5e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:dkongjr/soundcpu'}), (b:KG {id: 'rom:dkongjr/soundcpu/djr1-c_3h.3h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:dkongjr/gfx1'}), (b:KG {id: 'rom:dkongjr/gfx1/djr1-v.3n'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:dkongjr/gfx1'}), (b:KG {id: 'rom:dkongjr/gfx1/djr1-v.3p'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:dkongjr/gfx2'}), (b:KG {id: 'rom:dkongjr/gfx2/djr1-v_7c.7c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:dkongjr/gfx2'}), (b:KG {id: 'rom:dkongjr/gfx2/djr1-v_7d.7d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:dkongjr/gfx2'}), (b:KG {id: 'rom:dkongjr/gfx2/djr1-v_7e.7e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:dkongjr/gfx2'}), (b:KG {id: 'rom:dkongjr/gfx2/djr1-v_7f.7f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:dkongjr/proms'}), (b:KG {id: 'rom:dkongjr/proms/djr1-c-2e.2e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:dkongjr/proms'}), (b:KG {id: 'rom:dkongjr/proms/djr1-c-2f.2f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:dkongjr/proms'}), (b:KG {id: 'rom:dkongjr/proms/djr1-v-2n.2n'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'handler:dkong_state.video_start_dkong'}), (b:KG {id: 'handler:dkong_state.scanline_callback'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:dkong_state.video_start_dkong'}), (b:KG {id: 'handler:dkong_state.dkong_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:dkong_state.video_start_dkong'}), (b:KG {id: 'handler:dkong_state.radarscp1_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkong_base/maincpu'}), (b:KG {id: 'device:dkong_state.dkong_base/maincpu/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkong_base/maincpu'}), (b:KG {id: 'map:dkong_state.dkong_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:dkong_state.dkong_base/dma8257'}), (b:KG {id: 'device:dkong_state.dkong_base/dma8257/callback:dma8257:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkong_base/dma8257'}), (b:KG {id: 'device:dkong_state.dkong_base/dma8257/callback:dma8257:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkong_base/dma8257'}), (b:KG {id: 'device:dkong_state.dkong_base/dma8257/callback:dma8257:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkong_base/dma8257'}), (b:KG {id: 'device:dkong_state.dkong_base/dma8257/callback:dma8257:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkong_base/dma8257'}), (b:KG {id: 'device:dkong_state.dkong_base/dma8257/callback:dma8257:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkong_base/screen'}), (b:KG {id: 'device:dkong_state.dkong_base/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkong_base/screen'}), (b:KG {id: 'device:dkong_state.dkong_base/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_dkong'}), (b:KG {id: 'file:src/mame/nintendo/dkong.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 1686, sourceColumn: 8, sourceEndLine: 1686};
MATCH (a:KG {id: 'gfxdecode:gfx_dkong'}), (b:KG {id: 'gfxdecode:gfx_dkong/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_dkong'}), (b:KG {id: 'gfxdecode:gfx_dkong/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/dkong_a.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/dkong_a.cpp'}), (b:KG {id: 'file:dkong.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/dkong_a.cpp'}), (b:KG {id: 'file:sound/discrete.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/dkong_a.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/ls259.6h'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/ls259.6h/callback:ls259_6h:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/ls259.6h'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/ls259.6h/callback:ls259_6h:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/ls259.6h'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/ls259.6h/callback:ls259_6h:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/ls259.6h'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/ls259.6h/callback:ls259_6h:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/ls259.5h'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/ls259.5h/callback:ls259_5h:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/virtual_p2'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/virtual_p2/callback:virtual_p2:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/virtual_p2'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/virtual_p2/callback:virtual_p2:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/virtual_p2'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/virtual_p2/callback:virtual_p2:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/virtual_p2'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/virtual_p2/callback:virtual_p2:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu/callback:soundcpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu/callback:soundcpu:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu/callback:soundcpu:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu/callback:soundcpu:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu/callback:soundcpu:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu'}), (b:KG {id: 'map:dkong_state.dkong_sound_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu'}), (b:KG {id: 'map:dkong_state.dkongjr_sound_io_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/discrete'}), (b:KG {id: 'audioroute:device:dkong_state.dkongjr_audio/discrete/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map/range4'}), (b:KG {id: 'handler:dkong_state.dkong_videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map/range5'}), (b:KG {id: 'handler:i8257_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'dma8257'};
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map/range5'}), (b:KG {id: 'handler:i8257_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'dma8257'};
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map/range6'}), (b:KG {id: 'handler:latch8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ls174.3d'};
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map/range7'}), (b:KG {id: 'handler:latch8_device.bit0_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ls259.4h'};
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map/range8'}), (b:KG {id: 'handler:dkong_state.dkongjr_gfxbank_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map/range9'}), (b:KG {id: 'handler:dkong_state.dkong_in2_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map/range10'}), (b:KG {id: 'handler:latch8_device.bit0_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ls259.6h'};
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map/range11'}), (b:KG {id: 'handler:latch8_device.bit0_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ls259.5h'};
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map/range12'}), (b:KG {id: 'handler:dkong_state.dkong_audio_irq_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map/range13'}), (b:KG {id: 'handler:dkong_state.dkong_flipscreen_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map/range14'}), (b:KG {id: 'handler:dkong_state.dkong_spritebank_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map/range15'}), (b:KG {id: 'handler:dkong_state.nmi_mask_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map/range16'}), (b:KG {id: 'handler:dkong_state.p8257_drq_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_map/range17'}), (b:KG {id: 'handler:dkong_state.dkong_palettebank_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'inputs:dkong_in0_4/IN0'}), (b:KG {id: 'inputs:dkong_in0_4/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_in0_4/IN0'}), (b:KG {id: 'inputs:dkong_in0_4/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_in0_4/IN0'}), (b:KG {id: 'inputs:dkong_in0_4/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_in0_4/IN0'}), (b:KG {id: 'inputs:dkong_in0_4/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_in0_4/IN0'}), (b:KG {id: 'inputs:dkong_in0_4/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_in0_4/IN0'}), (b:KG {id: 'inputs:dkong_in0_4/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_in0_4/IN0'}), (b:KG {id: 'inputs:dkong_in0_4/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_in0_4/IN0'}), (b:KG {id: 'inputs:dkong_in0_4/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_in1_4/IN1'}), (b:KG {id: 'inputs:dkong_in1_4/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_in1_4/IN1'}), (b:KG {id: 'inputs:dkong_in1_4/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_in1_4/IN1'}), (b:KG {id: 'inputs:dkong_in1_4/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_in1_4/IN1'}), (b:KG {id: 'inputs:dkong_in1_4/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_in1_4/IN1'}), (b:KG {id: 'inputs:dkong_in1_4/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_in1_4/IN1'}), (b:KG {id: 'inputs:dkong_in1_4/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_in1_4/IN1'}), (b:KG {id: 'inputs:dkong_in1_4/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_in1_4/IN1'}), (b:KG {id: 'inputs:dkong_in1_4/IN1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_in2/IN2'}), (b:KG {id: 'inputs:dkong_in2/IN2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_in2/IN2'}), (b:KG {id: 'inputs:dkong_in2/IN2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_in2/IN2'}), (b:KG {id: 'inputs:dkong_in2/IN2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_in2/IN2'}), (b:KG {id: 'inputs:dkong_in2/IN2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_in2/IN2'}), (b:KG {id: 'inputs:dkong_in2/IN2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_in2/IN2'}), (b:KG {id: 'inputs:dkong_in2/IN2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_in2/IN2'}), (b:KG {id: 'inputs:dkong_in2/IN2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_in2/IN2'}), (b:KG {id: 'inputs:dkong_in2/IN2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_in2/SERVICE1'}), (b:KG {id: 'inputs:dkong_in2/SERVICE1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_dsw0/DSW0'}), (b:KG {id: 'inputs:dkong_dsw0/DSW0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_dsw0/DSW0'}), (b:KG {id: 'inputs:dkong_dsw0/DSW0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_dsw0/DSW0'}), (b:KG {id: 'inputs:dkong_dsw0/DSW0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:dkong_dsw0/DSW0'}), (b:KG {id: 'inputs:dkong_dsw0/DSW0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'handler:dkong_state.scanline_callback'}), (b:KG {id: 'handler:dkong_state.radarscp_scanline'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkong_base/maincpu/callback:maincpu:0'}), (b:KG {id: 'handler:i8257_device.hlda_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map'}), (b:KG {id: 'file:src/mame/nintendo/dkong.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/dkong.cpp', sourceLine: 793, sourceColumn: 1, sourceEndLine: 813};
MATCH (a:KG {id: 'map:dkong_state.dkong_map'}), (b:KG {id: 'map:dkong_state.dkong_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map'}), (b:KG {id: 'map:dkong_state.dkong_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map'}), (b:KG {id: 'map:dkong_state.dkong_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map'}), (b:KG {id: 'map:dkong_state.dkong_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map'}), (b:KG {id: 'map:dkong_state.dkong_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map'}), (b:KG {id: 'map:dkong_state.dkong_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map'}), (b:KG {id: 'map:dkong_state.dkong_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map'}), (b:KG {id: 'map:dkong_state.dkong_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map'}), (b:KG {id: 'map:dkong_state.dkong_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map'}), (b:KG {id: 'map:dkong_state.dkong_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map'}), (b:KG {id: 'map:dkong_state.dkong_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map'}), (b:KG {id: 'map:dkong_state.dkong_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map'}), (b:KG {id: 'map:dkong_state.dkong_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map'}), (b:KG {id: 'map:dkong_state.dkong_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map'}), (b:KG {id: 'map:dkong_state.dkong_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map'}), (b:KG {id: 'map:dkong_state.dkong_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkong_base/dma8257/callback:dma8257:0'}), (b:KG {id: 'device:dkong_state.dkong_base/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkong_base/dma8257/callback:dma8257:1'}), (b:KG {id: 'handler:dkong_state.memory_read_byte'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkong_base/dma8257/callback:dma8257:2'}), (b:KG {id: 'handler:dkong_state.memory_write_byte'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkong_base/dma8257/callback:dma8257:3'}), (b:KG {id: 'handler:dkong_state.p8257_ctl_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkong_base/dma8257/callback:dma8257:4'}), (b:KG {id: 'handler:dkong_state.p8257_ctl_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkong_base/screen/callback:screen:0'}), (b:KG {id: 'handler:dkong_state.screen_update_dkong'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkong_base/screen/callback:screen:1'}), (b:KG {id: 'handler:dkong_state.vblank_irq'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_dkong/e0'}), (b:KG {id: 'gfxlayout:gfx_8x8x2_planar'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_dkong/e1'}), (b:KG {id: 'gfxlayout:spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/ls259.6h/callback:ls259_6h:0'}), (b:KG {id: 'handler:discrete_device.write_line_DS_SOUND0_INP'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/ls259.6h/callback:ls259_6h:1'}), (b:KG {id: 'handler:discrete_device.write_line_DS_SOUND1_INP'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/ls259.6h/callback:ls259_6h:2'}), (b:KG {id: 'handler:discrete_device.write_line_DS_SOUND2_INP'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/ls259.6h/callback:ls259_6h:3'}), (b:KG {id: 'handler:discrete_device.write_line_DS_SOUND7_INP'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/ls259.5h/callback:ls259_5h:0'}), (b:KG {id: 'handler:discrete_device.write_line_DS_SOUND9_INP'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/virtual_p2/callback:virtual_p2:0'}), (b:KG {id: 'handler:latch8_device.bit1_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/virtual_p2/callback:virtual_p2:0'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/ls259.4h'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/virtual_p2/callback:virtual_p2:1'}), (b:KG {id: 'handler:latch8_device.bit3_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/virtual_p2/callback:virtual_p2:1'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/ls259.6h'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/virtual_p2/callback:virtual_p2:2'}), (b:KG {id: 'handler:latch8_device.bit6_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/virtual_p2/callback:virtual_p2:2'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/ls259.6h'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/virtual_p2/callback:virtual_p2:3'}), (b:KG {id: 'handler:discrete_device.write_line_DS_DISCHARGE_INV'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu/callback:soundcpu:0'}), (b:KG {id: 'handler:dkong_state.dkong_p1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu/callback:soundcpu:1'}), (b:KG {id: 'handler:latch8_device.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu/callback:soundcpu:1'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/virtual_p2'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu/callback:soundcpu:2'}), (b:KG {id: 'handler:latch8_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu/callback:soundcpu:2'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/virtual_p2'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu/callback:soundcpu:3'}), (b:KG {id: 'handler:latch8_device.bit5_q_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu/callback:soundcpu:3'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/ls259.6h'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu/callback:soundcpu:4'}), (b:KG {id: 'handler:latch8_device.bit4_q_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:dkong_state.dkongjr_audio/soundcpu/callback:soundcpu:4'}), (b:KG {id: 'device:dkong_state.dkongjr_audio/ls259.6h'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_sound_map'}), (b:KG {id: 'file:src/mame/nintendo/dkong_a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1272, sourceColumn: 1, sourceEndLine: 1275};
MATCH (a:KG {id: 'map:dkong_state.dkong_sound_map'}), (b:KG {id: 'map:dkong_state.dkong_sound_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_sound_io_map'}), (b:KG {id: 'file:src/mame/nintendo/dkong_a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/dkong_a.cpp', sourceLine: 1282, sourceColumn: 1, sourceEndLine: 1285};
MATCH (a:KG {id: 'map:dkong_state.dkongjr_sound_io_map'}), (b:KG {id: 'map:dkong_state.dkongjr_sound_io_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'handler:dkong_state.radarscp_scanline'}), (b:KG {id: 'handler:dkong_state.radarscp_step'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map/range3'}), (b:KG {id: 'handler:dkong_state.dkong_videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map/range4'}), (b:KG {id: 'handler:i8257_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'dma8257'};
MATCH (a:KG {id: 'map:dkong_state.dkong_map/range4'}), (b:KG {id: 'handler:i8257_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'dma8257'};
MATCH (a:KG {id: 'map:dkong_state.dkong_map/range5'}), (b:KG {id: 'handler:latch8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ls175.3d'};
MATCH (a:KG {id: 'map:dkong_state.dkong_map/range6'}), (b:KG {id: 'handler:dkong_state.radarscp_grid_color_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map/range7'}), (b:KG {id: 'handler:dkong_state.dkong_in2_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map/range8'}), (b:KG {id: 'handler:latch8_device.bit0_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ls259.6h'};
MATCH (a:KG {id: 'map:dkong_state.dkong_map/range9'}), (b:KG {id: 'handler:dkong_state.dkong_audio_irq_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map/range10'}), (b:KG {id: 'handler:dkong_state.radarscp_grid_enable_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map/range11'}), (b:KG {id: 'handler:dkong_state.dkong_flipscreen_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map/range12'}), (b:KG {id: 'handler:dkong_state.dkong_spritebank_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map/range13'}), (b:KG {id: 'handler:dkong_state.nmi_mask_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map/range14'}), (b:KG {id: 'handler:dkong_state.p8257_drq_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkong_map/range15'}), (b:KG {id: 'handler:dkong_state.dkong_palettebank_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:dkong_state.screen_update_dkong'}), (b:KG {id: 'handler:dkong_state.check_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:dkong_state.screen_update_dkong'}), (b:KG {id: 'handler:dkong_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:dkong_state.screen_update_dkong'}), (b:KG {id: 'handler:dkong_state.radarscp_draw_background'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:gfx_8x8x2_planar'}), (b:KG {id: 'file:src/mame/nintendo/dkong.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:spritelayout'}), (b:KG {id: 'file:src/mame/nintendo/dkong.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'map:dkong_state.dkongjr_sound_io_map/range0'}), (b:KG {id: 'handler:latch8_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ls174.3d'};
MATCH (a:KG {id: 'handler:dkong_state.radarscp_step'}), (b:KG {id: 'handler:dkong_state.CD4049'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:dkong_state.check_palette'}), (b:KG {id: 'handler:dkong_state.radarscp_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:dkong_state.check_palette'}), (b:KG {id: 'handler:dkong_state.dkong2b_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
