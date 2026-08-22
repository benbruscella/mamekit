// mamekit knowledge graph — driver src/mame/bally/mcr3.cpp
// generated 2026-08-22T05:52:44.136Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/bally/mcr3.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/bally/mcr3.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:mcr3.h'}) SET n:SourceFile SET n += {path: 'mcr3.h', external: true};
MERGE (n:KG {id: 'file:machine/nvram.h'}) SET n:SourceFile SET n += {path: 'machine/nvram.h', external: true};
MERGE (n:KG {id: 'file:machine/rescap.h'}) SET n:SourceFile SET n += {path: 'machine/rescap.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:spyhunt.lh'}) SET n:SourceFile SET n += {path: 'spyhunt.lh', external: true};
MERGE (n:KG {id: 'file:turbotag.lh'}) SET n:SourceFile SET n += {path: 'turbotag.lh', external: true};
MERGE (n:KG {id: 'file:midway_sound.h'}) SET n:SourceFile SET n += {path: 'midway_sound.h', external: true};
MERGE (n:KG {id: 'file:src/mame/bally/midway_sound.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/bally/midway_sound.cpp'};
MERGE (n:KG {id: 'handler:mcr3_state.mcrmono_control_port_w'}) SET n:Handler SET n += {method: 'mcrmono_control_port_w', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 122, sourceColumn: 1, sourceEndLine: 138, sourceParameters: 'uint8_t data', sourceBody: '/*
	    Bit layout is as follows:
	        D7 = n/c
	        D6 = cocktail flip
	        D5 = n/c
	        D4 = n/c
	        D3 = n/c
	        D2 = n/c
	        D1 = n/c
	        D0 = coin meter 1
	*/

	machine().bookkeeping().coin_counter_w(0, (data >> 0) & 1);
	m_mcr_cocktail_flip = (data >> 6) & 1;'};
MERGE (n:KG {id: 'game:rampage'}) SET n:Game SET n += {name: 'rampage', year: '1986', company: 'Bally Midway', fullname: 'Rampage (Rev 3, 8/27/86)', monitor: 'ROT0', cls: 'mcr3_state', init: 'init_rampage', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1694, sourceColumn: 1, sourceEndLine: 1694, installedHandlers: ['{"space":"AS_IO","kind":"read","start":4,"end":4,"className":"mcr3_state","method":"rampage_ip4_r"}', '{"space":"AS_IO","kind":"write","start":6,"end":6,"className":"mcr3_state","method":"rampage_op6_w"}']};
MERGE (n:KG {id: 'handler:mcr3_state.rampage_ip4_r'}) SET n:Handler SET n += {method: 'rampage_ip4_r', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 281, sourceColumn: 1, sourceEndLine: 284, sourceParameters: '', sourceBody: 'return ioport("MONO.IP4")->read() | (m_sounds_good->read() << 7);'};
MERGE (n:KG {id: 'handler:mcr3_state.rampage_op6_w'}) SET n:Handler SET n += {method: 'rampage_op6_w', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 287, sourceColumn: 1, sourceEndLine: 294, sourceParameters: 'uint8_t data', sourceBody: '/* bit 5 controls reset of the Sounds Good board */
	m_sounds_good->reset_write((~data >> 5) & 1);

	/* low 5 bits go directly to the Sounds Good board */
	m_sounds_good->write(data);'};
MERGE (n:KG {id: 'romset:rampage'}) SET n:RomSet SET n += {name: 'rampage', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1306, sourceColumn: 1, sourceEndLine: 1306};
MERGE (n:KG {id: 'region:rampage/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', fills: [57344, 8192, 255], sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1228, sourceColumn: 2, sourceEndLine: 1228};
MERGE (n:KG {id: 'rom:rampage/maincpu/pro-0_3b_rev_3_8-27-86.3b'}) SET n:Rom SET n += {file: 'pro-0_3b_rev_3_8-27-86.3b', offset: 0, size: 32768, crc: '2f7ca03c', sha1: '1e3a1f213fd67938adf14ea0d04dab687ea8f4ef', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1308, sourceColumn: 2, sourceEndLine: 1308};
MERGE (n:KG {id: 'rom:rampage/maincpu/pro-1_5b_rev_3_8-27-86.5b'}) SET n:Rom SET n += {file: 'pro-1_5b_rev_3_8-27-86.5b', offset: 32768, size: 32768, crc: 'd89bd9a4', sha1: '3531464ffe49dfaf2755d9e2dc1aea23819b3a5d', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1309, sourceColumn: 2, sourceEndLine: 1309};
MERGE (n:KG {id: 'region:rampage/sg:cpu'}) SET n:RomRegion SET n += {tag: 'sg:cpu', size: 262144, flags: '0', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1312, sourceColumn: 2, sourceEndLine: 1312};
MERGE (n:KG {id: 'rom:rampage/sg:cpu/u-7_rev.2_8-14-86.u7'}) SET n:Rom SET n += {file: 'u-7_rev.2_8-14-86.u7', offset: 0, size: 32768, crc: 'cffd7fa5', sha1: '7c5cecce1d428f847fea37d53eb09c6f62055c6f', skip: 1};
MERGE (n:KG {id: 'rom:rampage/sg:cpu/u-17_rev.2_8-14-86.u17'}) SET n:Rom SET n += {file: 'u-17_rev.2_8-14-86.u17', offset: 1, size: 32768, crc: 'e92c596b', sha1: '4e2d87398f2e7b637cbad6cb16d832dfa8f8288c', skip: 1};
MERGE (n:KG {id: 'rom:rampage/sg:cpu/u-8_rev.2_8-14-86.u8'}) SET n:Rom SET n += {file: 'u-8_rev.2_8-14-86.u8', offset: 65536, size: 32768, crc: '11f787e4', sha1: '1fa195bf9169608099d17be5801738a4e17bec3d', skip: 1};
MERGE (n:KG {id: 'rom:rampage/sg:cpu/u-18_rev.2_8-14-86.u18'}) SET n:Rom SET n += {file: 'u-18_rev.2_8-14-86.u18', offset: 65537, size: 32768, crc: '6b8bf5e1', sha1: 'aa8c0260dcd19a795bfc23197cd87348a685d20b', skip: 1};
MERGE (n:KG {id: 'region:rampage/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 32768, flags: 'ROMREGION_INVERT', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1237, sourceColumn: 2, sourceEndLine: 1237};
MERGE (n:KG {id: 'rom:rampage/gfx1/bg-0_u15_7-23-86.15a'}) SET n:Rom SET n += {file: 'bg-0_u15_7-23-86.15a', offset: 0, size: 16384, crc: 'c0d8b7a5', sha1: '692219388a3124fb48db7e35c4127b0fe066a289', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1319, sourceColumn: 2, sourceEndLine: 1319};
MERGE (n:KG {id: 'rom:rampage/gfx1/bg-1_u14_7-23-86.14b'}) SET n:Rom SET n += {file: 'bg-1_u14_7-23-86.14b', offset: 16384, size: 16384, crc: '2f6e3aa1', sha1: 'ae86ce90bb6bf660e38c0f91e7ce90d44be82d60', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1320, sourceColumn: 2, sourceEndLine: 1320};
MERGE (n:KG {id: 'region:rampage/gfx2'}) SET n:RomRegion SET n += {tag: 'gfx2', size: 262144, flags: '0', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1241, sourceColumn: 2, sourceEndLine: 1241};
MERGE (n:KG {id: 'rom:rampage/gfx2/fg-0_8e_6-30-86.8e'}) SET n:Rom SET n += {file: 'fg-0_8e_6-30-86.8e', offset: 0, size: 65536, crc: '0974be5d', sha1: 'be347faaa345383dc6e5c2b3789c372d6bd25905', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1323, sourceColumn: 2, sourceEndLine: 1323};
MERGE (n:KG {id: 'rom:rampage/gfx2/fg-1_6e_6-30-86.6e'}) SET n:Rom SET n += {file: 'fg-1_6e_6-30-86.6e', offset: 65536, size: 65536, crc: '8728532b', sha1: '327df92db7e3506b827d497859980cd2de51f45d', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1324, sourceColumn: 2, sourceEndLine: 1324};
MERGE (n:KG {id: 'rom:rampage/gfx2/fg-2_5e_6-30-86.5e'}) SET n:Rom SET n += {file: 'fg-2_5e_6-30-86.5e', offset: 131072, size: 65536, crc: '9489f714', sha1: 'df17a45cdc6a9310856d64f89954be79bbeac12e', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1325, sourceColumn: 2, sourceEndLine: 1325};
MERGE (n:KG {id: 'rom:rampage/gfx2/fg-3_4e_6-30-86.4e'}) SET n:Rom SET n += {file: 'fg-3_4e_6-30-86.4e', offset: 196608, size: 65536, crc: '81e1de40', sha1: '7e7818792845ec3687b3202eeade60a298ef513e', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1326, sourceColumn: 2, sourceEndLine: 1326};
MERGE (n:KG {id: 'region:rampage/sg:pal'}) SET n:RomRegion SET n += {tag: 'sg:pal', size: 1, flags: '0', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1328, sourceColumn: 2, sourceEndLine: 1328};
MERGE (n:KG {id: 'rom:rampage/sg:pal/e36a31axnaxqd.u15.bin'}) SET n:Rom SET n += {file: 'e36a31axnaxqd.u15.bin', offset: 0, size: 1, crc: '', sha1: '', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1329, sourceColumn: 2, sourceEndLine: 1329, status: 'nodump'};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_map'}) SET n:AddressMap SET n += {cls: 'mcr3_state', name: 'mcrmono_map', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 479, sourceColumn: 1, sourceEndLine: 489, unmapHigh: true};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 57343, raw: 'map(0x0000, 0xdfff).rom()', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 482, sourceColumn: 2, sourceEndLine: 482, rom: true};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_map/range1'}) SET n:AddressRange SET n += {start: 57344, end: 59391, raw: 'map(0xe000, 0xe7ff).ram().share("nvram")', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 483, sourceColumn: 2, sourceEndLine: 483, ram: true, share: 'nvram'};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_map/range2'}) SET n:AddressRange SET n += {start: 59392, end: 59903, raw: 'map(0xe800, 0xe9ff).ram().share("spriteram")', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 484, sourceColumn: 2, sourceEndLine: 484, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_map/range3'}) SET n:AddressRange SET n += {start: 59904, end: 60415, raw: 'map(0xea00, 0xebff).ram()', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 485, sourceColumn: 2, sourceEndLine: 485, ram: true};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_map/range4'}) SET n:AddressRange SET n += {start: 60416, end: 60543, raw: 'map(0xec00, 0xec7f).mirror(0x0380).w(FUNC(mcr3_state::mcr_paletteram9_w)).share("paletteram")', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 486, sourceColumn: 2, sourceEndLine: 486, mirror: 896, share: 'paletteram'};
MERGE (n:KG {id: 'handler:mcr3_state.mcr_paletteram9_w'}) SET n:Handler SET n += {method: 'mcr_paletteram9_w', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr_v.cpp', sourceLine: 162, sourceColumn: 1, sourceEndLine: 170, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '// palette RAM is actually 9 bit (a 93419 SRAM)
	// however, there is no way for the CPU to read back
	// the high bit, because D8 of the SRAM is connected
	// to A0 of the bus rather than to a data line
	m_paletteram[offset] = data;
	mcr_set_color(offset / 2, data | ((offset & 1) << 8));'};
MERGE (n:KG {id: 'handler:mcr_state.mcr_set_color'}) SET n:Handler SET n += {method: 'mcr_set_color', ownerClass: 'mcr_state', sourceFile: 'src/mame/bally/mcr_v.cpp', sourceLine: 127, sourceColumn: 1, sourceEndLine: 130, sourceParameters: 'int index, int data', sourceBody: 'm_palette->set_pen_color(index, pal3bit(data >> 6), pal3bit(data >> 0), pal3bit(data >> 3));'};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_map/range5'}) SET n:AddressRange SET n += {start: 61440, end: 63487, raw: 'map(0xf000, 0xf7ff).ram().w(FUNC(mcr3_state::mcr3_videoram_w)).share("videoram")', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 487, sourceColumn: 2, sourceEndLine: 487, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'handler:mcr3_state.mcr3_videoram_w'}) SET n:Handler SET n += {method: 'mcr3_videoram_w', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr3_v.cpp', sourceLine: 119, sourceColumn: 1, sourceEndLine: 123, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset / 2);'};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_map/range6'}) SET n:AddressRange SET n += {start: 63488, end: 65535, raw: 'map(0xf800, 0xffff).rom()', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 488, sourceColumn: 2, sourceEndLine: 488, rom: true};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_portmap'}) SET n:AddressMap SET n += {cls: 'mcr3_state', name: 'mcrmono_portmap', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 492, sourceColumn: 1, sourceEndLine: 504, globalMask: 255, unmapHigh: true};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_portmap/range0'}) SET n:AddressRange SET n += {start: 0, end: 0, raw: 'map(0x00, 0x00).mirror(0x78).portr("MONO.IP0")', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 496, sourceColumn: 2, sourceEndLine: 496, mirror: 120, portRead: 'MONO.IP0'};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_portmap/range1'}) SET n:AddressRange SET n += {start: 1, end: 1, raw: 'map(0x01, 0x01).mirror(0x78).portr("MONO.IP1")', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 497, sourceColumn: 2, sourceEndLine: 497, mirror: 120, portRead: 'MONO.IP1'};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_portmap/range2'}) SET n:AddressRange SET n += {start: 2, end: 2, raw: 'map(0x02, 0x02).mirror(0x78).portr("MONO.IP2")', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 498, sourceColumn: 2, sourceEndLine: 498, mirror: 120, portRead: 'MONO.IP2'};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_portmap/range3'}) SET n:AddressRange SET n += {start: 3, end: 3, raw: 'map(0x03, 0x03).mirror(0x78).portr("MONO.IP3")', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 499, sourceColumn: 2, sourceEndLine: 499, mirror: 120, portRead: 'MONO.IP3'};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_portmap/range4'}) SET n:AddressRange SET n += {start: 4, end: 4, raw: 'map(0x04, 0x04).mirror(0x78).portr("MONO.IP4")', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 500, sourceColumn: 2, sourceEndLine: 500, mirror: 120, portRead: 'MONO.IP4'};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_portmap/range5'}) SET n:AddressRange SET n += {start: 5, end: 5, raw: 'map(0x05, 0x05).mirror(0x78).w(FUNC(mcr3_state::mcrmono_control_port_w))', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 501, sourceColumn: 2, sourceEndLine: 501, mirror: 120};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_portmap/range6'}) SET n:AddressRange SET n += {start: 7, end: 7, raw: 'map(0x07, 0x07).mirror(0x78).w("watchdog", FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 502, sourceColumn: 2, sourceEndLine: 502, mirror: 120};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/bally/mcr.cpp', sourceLine: 790, sourceColumn: 2, sourceEndLine: 790};
MERGE (n:KG {id: 'map:mcr3_state.mcrmono_portmap/range7'}) SET n:AddressRange SET n += {start: 240, end: 243, raw: 'map(0xf0, 0xf3).mirror(0x0c).rw(m_ctc, FUNC(z80ctc_device::read), FUNC(z80ctc_device::write))', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 503, sourceColumn: 2, sourceEndLine: 503, mirror: 12};
MERGE (n:KG {id: 'handler:z80ctc_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'z80ctc_device', sourceFile: 'src/mame/bally/mcr.cpp', sourceLine: 818, sourceColumn: 2, sourceEndLine: 818};
MERGE (n:KG {id: 'handler:z80ctc_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'z80ctc_device', sourceFile: 'src/mame/bally/mcr.cpp', sourceLine: 818, sourceColumn: 2, sourceEndLine: 818};
MERGE (n:KG {id: 'handler:pia6821_device.read_alt'}) SET n:Handler SET n += {method: 'read_alt', ownerClass: 'pia6821_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 763, sourceColumn: 2, sourceEndLine: 763};
MERGE (n:KG {id: 'handler:pia6821_device.write_alt'}) SET n:Handler SET n += {method: 'write_alt', ownerClass: 'pia6821_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 763, sourceColumn: 2, sourceEndLine: 763};
MERGE (n:KG {id: 'map:midway_sounds_good_device.soundsgood_map'}) SET n:AddressMap SET n += {cls: 'midway_sounds_good_device', name: 'soundsgood_map', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 591, sourceColumn: 1, sourceEndLine: 598, globalMask: 524287, unmapHigh: true};
MERGE (n:KG {id: 'map:midway_sounds_good_device.soundsgood_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 262143, raw: 'map(0x000000, 0x03ffff).rom()', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 595, sourceColumn: 2, sourceEndLine: 595, rom: true};
MERGE (n:KG {id: 'map:midway_sounds_good_device.soundsgood_map/range1'}) SET n:AddressRange SET n += {start: 393216, end: 393223, raw: 'map(0x060000, 0x060007).mirror(0x00fff0).rw(m_pia, FUNC(pia6821_device::read_alt), FUNC(pia6821_device::write_alt)).umask16(0xff00)', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 596, sourceColumn: 2, sourceEndLine: 596, mirror: 65520};
MERGE (n:KG {id: 'map:midway_sounds_good_device.soundsgood_map/range2'}) SET n:AddressRange SET n += {start: 458752, end: 462847, raw: 'map(0x070000, 0x070fff).mirror(0x00f000).ram()', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 597, sourceColumn: 2, sourceEndLine: 597, mirror: 61440, ram: true};
MERGE (n:KG {id: 'machine:mcr3_state.mcrmono'}) SET n:MachineConfig SET n += {cls: 'mcr3_state', name: 'mcrmono', calls: [], resetHandlers: ['mcr_state.machine_reset'], startHandlers: ['mcr3_state.video_start'], sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1083, sourceColumn: 1, sourceEndLine: 1116};
MERGE (n:KG {id: 'handler:mcr_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'mcr_state', sourceFile: 'src/mame/bally/mcr_m.cpp', sourceLine: 93, sourceColumn: 1, sourceEndLine: 97, sourceParameters: '', sourceBody: '/* reset cocktail flip */
	m_mcr_cocktail_flip = 0;'};
MERGE (n:KG {id: 'handler:mcr3_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr3_v.cpp', sourceLine: 86, sourceColumn: 1, sourceEndLine: 90, sourceParameters: '', sourceBody: '// initialize the background tilemap
	m_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(mcr3_state::mcrmono_get_bg_tile_info)), TILEMAP_SCAN_ROWS, 16,16, 32,30);'};
MERGE (n:KG {id: 'handler:mcr3_state.mcrmono_get_bg_tile_info'}) SET n:Handler SET n += {method: 'mcrmono_get_bg_tile_info', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr3_v.cpp', sourceLine: 29, sourceColumn: 1, sourceEndLine: 35, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int data = m_videoram[tile_index * 2] | (m_videoram[tile_index * 2 + 1] << 8);
	int code = (data & 0x3ff) | ((data >> 4) & 0x400);
	int color = ((data >> 12) & 3) ^ 3;
	tileinfo.set(0, code, color, TILE_FLIPYX(data >> 10));'};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 5000000, config: ['Z80(config, m_maincpu, MASTER_CLOCK/4)', 'm_maincpu->set_addrmap(AS_PROGRAM, &mcr3_state::mcrmono_map)', 'm_maincpu->set_addrmap(AS_IO, &mcr3_state::mcrmono_portmap)', 'm_maincpu->set_daisy_config(mcr_daisy_chain)'], sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1086, sourceColumn: 2, sourceEndLine: 1086};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/scantimer'}) SET n:Device SET n += {type: 'TIMER', tag: 'scantimer', clock: null, config: ['TIMER(config, "scantimer").configure_scanline(FUNC(mcr3_state::mcr_interrupt), "screen", 0, 1)'], sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1091, sourceColumn: 2, sourceEndLine: 1091};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/scantimer/callback:scantimer:0'}) SET n:Callback SET n += {signal: 'configure_scanline', operation: 'configure_scanline', raw: 'TIMER(config, "scantimer").configure_scanline(FUNC(mcr3_state::mcr_interrupt), "screen", 0, 1)', ownerTag: 'scantimer', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1091, sourceColumn: 2, sourceEndLine: 1091, scanlineStart: 0, scanlineIncrement: 1, targetClass: 'mcr3_state', targetMethod: 'mcr_interrupt'};
MERGE (n:KG {id: 'handler:mcr3_state.mcr_interrupt'}) SET n:Handler SET n += {method: 'mcr_interrupt', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr_m.cpp', sourceLine: 107, sourceColumn: 1, sourceEndLine: 126, sourceParameters: 'int param', sourceBody: 'int scanline = param;

	/* CTC line 2 is connected to VBLANK, which is once every 1/2 frame */
	/* for the 30Hz interlaced display */
	if(scanline == 0 || scanline == 240)
	{
		m_ctc->trg2(1);
		m_ctc->trg2(0);
	}

	/* CTC line 3 is connected to 493, which is signalled once every */
	/* frame at 30Hz */
	if (scanline == 0)
	{
		m_ctc->trg3(1);
		m_ctc->trg3(0);
	}'};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/ctc'}) SET n:Device SET n += {type: 'Z80CTC', tag: 'ctc', clock: 5000000, config: ['Z80CTC(config, m_ctc, MASTER_CLOCK/4  )', 'm_ctc->intr_callback().set_inputline(m_maincpu, INPUT_LINE_IRQ0)', 'm_ctc->zc_callback<0>().set(m_ctc, FUNC(z80ctc_device::trg1))']};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/ctc/callback:ctc:0'}) SET n:Callback SET n += {signal: 'intr_callback', operation: 'set_inputline', raw: 'm_ctc->intr_callback().set_inputline(m_maincpu, INPUT_LINE_IRQ0)', ownerTag: 'ctc', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1094, sourceColumn: 2, sourceEndLine: 1094, inputLine: 'INPUT_LINE_IRQ0', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/ctc/callback:ctc:1'}) SET n:Callback SET n += {signal: 'zc_callback', operation: 'set', raw: 'm_ctc->zc_callback<0>().set(m_ctc, FUNC(z80ctc_device::trg1))', ownerTag: 'ctc', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1095, sourceColumn: 2, sourceEndLine: 1095, slot: '0', targetClass: 'z80ctc_device', targetMethod: 'trg1', targetTag: 'ctc'};
MERGE (n:KG {id: 'handler:z80ctc_device.trg1'}) SET n:Handler SET n += {method: 'trg1', ownerClass: 'z80ctc_device', sourceFile: 'src/mame/bally/mcr.cpp', sourceLine: 1784, sourceColumn: 2, sourceEndLine: 1784};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog").set_vblank_count(m_screen, 16)'], sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1097, sourceColumn: 2, sourceEndLine: 1097};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/nvram'}) SET n:Device SET n += {type: 'NVRAM', tag: 'nvram', clock: null, config: ['NVRAM(config, "nvram", nvram_device::DEFAULT_ALL_0)'], sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1099, sourceColumn: 2, sourceEndLine: 1099, clockExpr: 'nvram_device::DEFAULT_ALL_0'};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/speaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speaker', clock: 2, config: ['SPEAKER(config, "speaker", 2).front()'], sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1102, sourceColumn: 2, sourceEndLine: 1102};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_video_attributes(VIDEO_UPDATE_BEFORE_VBLANK)', 'm_screen->set_refresh_hz(30)', 'm_screen->set_vblank_time(ATTOSECONDS_IN_USEC(2500)  )', 'm_screen->set_size(32*16, 30*16)', 'm_screen->set_visarea(0*16, 32*16-1, 0*16, 30*16-1)', 'm_screen->set_screen_update(FUNC(mcr3_state::screen_update_mcr3))', 'm_screen->set_palette(m_palette)'], sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1105, sourceColumn: 2, sourceEndLine: 1105, configCalls: ['set_refresh_hz(30)', 'set_size(512,480)', 'set_visarea(0,511,0,479)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRefreshHz: 30, screenSize: [512, 480], screenVisarea: [0, 511, 0, 479], screenVideoAttributes: ['VIDEO_UPDATE_BEFORE_VBLANK']};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(mcr3_state::screen_update_mcr3))', ownerTag: 'screen', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1111, sourceColumn: 2, sourceEndLine: 1111, targetClass: 'mcr3_state', targetMethod: 'screen_update_mcr3'};
MERGE (n:KG {id: 'handler:mcr3_state.screen_update_mcr3'}) SET n:Handler SET n += {method: 'screen_update_mcr3', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr3_v.cpp', sourceLine: 241, sourceColumn: 1, sourceEndLine: 252, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: '/* update the flip state */
	m_bg_tilemap->set_flip(m_mcr_cocktail_flip ? (TILEMAP_FLIPX | TILEMAP_FLIPY) : 0);

	/* draw the background */
	m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0);

	/* draw the sprites */
	mcr3_update_sprites(screen, bitmap, cliprect, 0x03, 0, 0, 0, 1);
	return 0;'};
MERGE (n:KG {id: 'handler:mcr3_state.mcr3_update_sprites'}) SET n:Handler SET n += {method: 'mcr3_update_sprites', ownerClass: 'mcr3_state', sourceFile: 'src/mame/bally/mcr3_v.cpp', sourceLine: 170, sourceColumn: 1, sourceEndLine: 231, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect, int color_mask, int code_xor, int dx, int dy, int interlaced', sourceBody: 'm_screen->priority().fill(1, cliprect);

	/* loop over sprite RAM */
	for (int offs = m_spriteram.bytes() - 4; offs >= 0; offs -= 4)
	{
		/* skip if zero */
		if (m_spriteram[offs] == 0)
			continue;

/*
    monoboard:
        flags.d0 -> ICG0~ -> PCG0~/PCG2~/PCG4~/PCG6~ -> bit 4 of linebuffer
        flags.d1 -> ICG1~ -> PCG1~/PCG3~/PCG5~/PCG7~ -> bit 5 of linebuffer
        flags.d2 -> IPPR  -> PPR0 /PPR1 /PPR2 /PPR3  -> bit 6 of linebuffer
        flags.d3 -> IRA15 ----------------------------> address line 15 of FG ROMs
        flags.d4 -> HFLIP
        flags.d5 -> VFLIP

*/

		/* extract the bits of information */
		int flags = m_spriteram[offs + 1];
		int code = m_spriteram[offs + 2] + 256 * ((flags >> 3) & 0x01);
		int color = ~flags & color_mask;
		int flipx = flags & 0x10;
		int flipy = flags & 0x20;
		int sx = (m_spriteram[offs + 3] - 3) * 2;
		int sy = (241 - m_spriteram[offs]);

		if (interlaced == 1) sy *= 2;

		code ^= code_xor;

		sx += dx;
		sy += dy;

		/* sprites use color 0 for background pen and 8 for the \'under tile\' pen.
		    The color 8 is used to cover over other sprites. */
		if (!m_mcr_cocktail_flip)
		{
			/* first draw the sprite, visible */
			m_gfxdecode->gfx(1)->prio_transmask(bitmap,cliprect, code, color, flipx, flipy, sx, sy,
					screen.priority(), 0x00, 0x0101);

			/* then draw the mask, behind the background but obscuring following sprites */
			m_gfxdecode->gfx(1)->prio_transmask(bitmap,cliprect, code, color, flipx, flipy, sx, sy,
					screen.priority(), 0x02, 0xfeff);
		}
		else
		{
			/* first draw the sprite, visible */
			m_gfxdecode->gfx(1)->prio_transmask(bitmap,cliprect, code, color, !flipx, !flipy, 480 - sx, 452 - sy,
					screen.priority(), 0x00, 0x0101);

			/* then draw the mask, behind the background but obscuring following sprites */
			m_gfxdecode->gfx(1)->prio_transmask(bitmap,cliprect, code, color, !flipx, !flipy, 480 - sx, 452 - sy,
					screen.priority(), 0x02, 0xfeff);
		}
	}'};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_mcr3)'], sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1114, sourceColumn: 2, sourceEndLine: 1114, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:mcr3_state.mcrmono/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette).set_entries(64)'], sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1115, sourceColumn: 2, sourceEndLine: 1115};
MERGE (n:KG {id: 'machine:mcr3_state.mono_sg'}) SET n:MachineConfig SET n += {cls: 'mcr3_state', name: 'mono_sg', calls: ['mcrmono'], resetHandlers: ['mcr_state.machine_reset'], startHandlers: ['mcr3_state.video_start'], sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1146, sourceColumn: 1, sourceEndLine: 1154};
MERGE (n:KG {id: 'device:mcr3_state.mono_sg/sg'}) SET n:Device SET n += {type: 'MIDWAY_SOUNDS_GOOD', tag: 'sg', clock: 16000000, config: ['MIDWAY_SOUNDS_GOOD(config, m_sounds_good)', 'm_sounds_good->add_route(ALL_OUTPUTS, "speaker", 0.75, 0)', 'm_sounds_good->add_route(ALL_OUTPUTS, "speaker", 0.75, 1)'], sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1151, sourceColumn: 2, sourceEndLine: 1151};
MERGE (n:KG {id: 'audioroute:device:mcr3_state.mono_sg/sg/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.75, input: 0, raw: 'm_sounds_good->add_route(ALL_OUTPUTS, "speaker", 0.75, 0)', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1152, sourceColumn: 2, sourceEndLine: 1152};
MERGE (n:KG {id: 'audioroute:device:mcr3_state.mono_sg/sg/1'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.75, input: 1, raw: 'm_sounds_good->add_route(ALL_OUTPUTS, "speaker", 0.75, 1)', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1153, sourceColumn: 2, sourceEndLine: 1153};
MERGE (n:KG {id: 'machine:midway_sounds_good_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'midway_sounds_good_device', name: 'device_add_mconfig', calls: [], sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 605, sourceColumn: 1, sourceEndLine: 629};
MERGE (n:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/cpu'}) SET n:Device SET n += {type: 'M68000', tag: 'cpu', clock: 8000000, config: ['M68000(config, m_cpu, DERIVED_CLOCK(1, 2))', 'm_cpu->set_addrmap(AS_PROGRAM, &midway_sounds_good_device::soundsgood_map)'], sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 607, sourceColumn: 2, sourceEndLine: 607};
MERGE (n:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/pia'}) SET n:Device SET n += {type: 'PIA6821', tag: 'pia', clock: null, config: ['PIA6821(config, m_pia)', 'm_pia->writepa_handler().set(FUNC(midway_sounds_good_device::porta_w))', 'm_pia->writepb_handler().set(FUNC(midway_sounds_good_device::portb_w))', 'm_pia->irqa_handler().set(FUNC(midway_sounds_good_device::irq_w))', 'm_pia->irqb_handler().set(FUNC(midway_sounds_good_device::irq_w))'], sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 610, sourceColumn: 2, sourceEndLine: 610};
MERGE (n:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/pia/callback:pia:0'}) SET n:Callback SET n += {signal: 'writepa_handler', operation: 'set', raw: 'm_pia->writepa_handler().set(FUNC(midway_sounds_good_device::porta_w))', ownerTag: 'pia', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 611, sourceColumn: 2, sourceEndLine: 611, targetClass: 'midway_sounds_good_device', targetMethod: 'porta_w'};
MERGE (n:KG {id: 'handler:midway_sounds_good_device.porta_w'}) SET n:Handler SET n += {method: 'porta_w', ownerClass: 'midway_sounds_good_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 530, sourceColumn: 1, sourceEndLine: 534, sourceParameters: 'uint8_t data', sourceBody: 'm_dacval = (data << 2) | (m_dacval & 3);
	m_dac->write(m_dacval);'};
MERGE (n:KG {id: 'handler:midway_sounds_good_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'midway_sounds_good_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 509, sourceColumn: 1, sourceEndLine: 512, sourceParameters: 'uint8_t data', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(midway_sounds_good_device::synced_write), this), data);'};
MERGE (n:KG {id: 'handler:midway_sounds_good_device.synced_write'}) SET n:Handler SET n += {method: 'synced_write', ownerClass: 'midway_sounds_good_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 656, sourceColumn: 1, sourceEndLine: 664, sourceParameters: 'int param', sourceBody: 'm_pia->portb_w((param >> 1) & 0x0f);
	m_pia->ca1_w(~param & 0x01);

	// oftentimes games will write one nibble at a time; the sync on this is very
	// important, so we boost the interleave briefly while this happens
	machine().scheduler().perfect_quantum(attotime::from_usec(250));'};
MERGE (n:KG {id: 'handler:midway_sounds_good_device.portb_w'}) SET n:Handler SET n += {method: 'portb_w', ownerClass: 'midway_sounds_good_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 541, sourceColumn: 1, sourceEndLine: 550, sourceParameters: 'uint8_t data', sourceBody: 'uint8_t z_mask = m_pia->port_b_z_mask();

	m_dacval = (m_dacval & ~3) | (data >> 6);
	m_dac->write(m_dacval);

	if (~z_mask & 0x10)  m_status = (m_status & ~1) | ((data >> 4) & 1);
	if (~z_mask & 0x20)  m_status = (m_status & ~2) | ((data >> 4) & 2);'};
MERGE (n:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/pia/callback:pia:1'}) SET n:Callback SET n += {signal: 'writepb_handler', operation: 'set', raw: 'm_pia->writepb_handler().set(FUNC(midway_sounds_good_device::portb_w))', ownerTag: 'pia', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 612, sourceColumn: 2, sourceEndLine: 612, targetClass: 'midway_sounds_good_device', targetMethod: 'portb_w'};
MERGE (n:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/pia/callback:pia:2'}) SET n:Callback SET n += {signal: 'irqa_handler', operation: 'set', raw: 'm_pia->irqa_handler().set(FUNC(midway_sounds_good_device::irq_w))', ownerTag: 'pia', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 613, sourceColumn: 2, sourceEndLine: 613, targetClass: 'midway_sounds_good_device', targetMethod: 'irq_w'};
MERGE (n:KG {id: 'handler:midway_sounds_good_device.irq_w'}) SET n:Handler SET n += {method: 'irq_w', ownerClass: 'midway_sounds_good_device', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 557, sourceColumn: 1, sourceEndLine: 561, sourceParameters: 'int state', sourceBody: 'int combined_state = m_pia->irq_a_state() | m_pia->irq_b_state();
	m_cpu->set_input_line(4, combined_state ? ASSERT_LINE : CLEAR_LINE);'};
MERGE (n:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/pia/callback:pia:3'}) SET n:Callback SET n += {signal: 'irqb_handler', operation: 'set', raw: 'm_pia->irqb_handler().set(FUNC(midway_sounds_good_device::irq_w))', ownerTag: 'pia', sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 614, sourceColumn: 2, sourceEndLine: 614, targetClass: 'midway_sounds_good_device', targetMethod: 'irq_w'};
MERGE (n:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/dac'}) SET n:Device SET n += {type: 'AD7533', tag: 'dac', clock: null, config: ['AD7533(config, m_dac)', 'm_dac->add_route(ALL_OUTPUTS, m_dac_filter[0], 1.0)'], sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 616, sourceColumn: 2, sourceEndLine: 616};
MERGE (n:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/dac_filter2'}) SET n:Device SET n += {type: 'FILTER_BIQUAD', tag: 'dac_filter2', clock: null, config: ['FILTER_BIQUAD(config, m_dac_filter[2]).opamp_mfb_lowpass_setup(RES_K(150), RES_K(82), RES_K(150), CAP_P(470), CAP_P(150))', 'm_dac_filter[2]->add_route(ALL_OUTPUTS, *this, 1.0)'], sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 620, sourceColumn: 2, sourceEndLine: 620};
MERGE (n:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/dac_filter1'}) SET n:Device SET n += {type: 'FILTER_BIQUAD', tag: 'dac_filter1', clock: null, config: ['FILTER_BIQUAD(config, m_dac_filter[1]).opamp_mfb_lowpass_setup(RES_K(33), RES_K(18), RES_K(33), CAP_P(5600), CAP_P(270))', 'm_dac_filter[1]->add_route(ALL_OUTPUTS, m_dac_filter[2], 1.0)'], sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 623, sourceColumn: 2, sourceEndLine: 623};
MERGE (n:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/dac_filter0'}) SET n:Device SET n += {type: 'FILTER_BIQUAD', tag: 'dac_filter0', clock: null, config: ['FILTER_BIQUAD(config, m_dac_filter[0]).opamp_mfb_lowpass_setup(RES_K(120), RES_K(0), RES_K(120), CAP_P(0), CAP_P(270))', 'm_dac_filter[0]->add_route(ALL_OUTPUTS, m_dac_filter[1], 1.0)'], sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 626, sourceColumn: 2, sourceEndLine: 626};
MERGE (n:KG {id: 'inputs:rampage'}) SET n:InputPorts SET n += {name: 'rampage', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 707, sourceColumn: 8, sourceEndLine: 707};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP0'}) SET n:Port SET n += {tag: 'MONO.IP0', modify: false};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_COIN1'};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_COIN2'};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 12, activeLow: true, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_TILT'};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP0/f4'}) SET n:PortField SET n += {kind: 'service', mask: 32, activeLow: true, defaultValue: 32};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_SERVICE1'};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP1'}) SET n:Port SET n += {tag: 'MONO.IP1', modify: false};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 192, activeLow: true, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP2'}) SET n:Port SET n += {tag: 'MONO.IP2', modify: false};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)']};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)']};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)']};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)']};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(2)']};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(2)']};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 192, activeLow: true, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP3'}) SET n:Port SET n += {tag: 'MONO.IP3', modify: false};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP3/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, name: 'Difficulty', defaultValue: 3, settings: ['2=Easy', '3=Normal', '1=Hard', '0=Free Play']};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP3/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 4, name: 'Score Option', defaultValue: 4, settings: ['4=Keep score when continuing', '0=Lose score when continuing']};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP3/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 8, name: 'Coin A', defaultValue: 8, settings: ['0=2C 1C', '8=1C 1C']};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP3/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 112, name: 'Coin B', defaultValue: 112, settings: ['0=3C 1C', '16=2C 1C', '112=1C 1C', '96=1C 2C', '80=1C 3C', '64=1C 4C', '48=1C 5C', '32=1C 6C']};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP3/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Rack Advance (Cheat)', defaultValue: 128, settings: ['128=Off', '0=On']};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP4'}) SET n:Port SET n += {tag: 'MONO.IP4', modify: false};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP4/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_PLAYER(3)']};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP4/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(3)']};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP4/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_PLAYER(3)']};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP4/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(3)']};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP4/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(3)']};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP4/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(3)']};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP4/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:rampage/MONO.IP4/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_CUSTOM'};
MERGE (n:KG {id: 'gfxlayout:mcr_bg_layout'}) SET n:GfxLayout SET n += {name: 'mcr_bg_layout', width: 8, height: 8, total: 'RGN_FRAC(1,2)', planes: 4, planeOffsets: ['RGN_FRAC(1,2)', 'RGN_FRAC(1,2)+1', 'RGN_FRAC(0,2)', 'RGN_FRAC(0,2)+1'], xOffsets: [0, 2, 4, 6, 8, 10, 12, 14], yOffsets: [0, 16, 32, 48, 64, 80, 96, 112], charIncrement: 128};
MERGE (n:KG {id: 'gfxlayout:mcr_sprite_layout'}) SET n:GfxLayout SET n += {name: 'mcr_sprite_layout', width: 32, height: 32, total: 'RGN_FRAC(1,4)', planes: 4, planeOffsets: [0, 1, 2, 3], xOffsets: ['RGN_FRAC(0,4)+0', 'RGN_FRAC(0,4)+0+4', 'RGN_FRAC(1,4)+0', 'RGN_FRAC(1,4)+0+4', 'RGN_FRAC(2,4)+0', 'RGN_FRAC(2,4)+0+4', 'RGN_FRAC(3,4)+0', 'RGN_FRAC(3,4)+0+4', 'RGN_FRAC(0,4)+8', 'RGN_FRAC(0,4)+8+4', 'RGN_FRAC(1,4)+8', 'RGN_FRAC(1,4)+8+4', 'RGN_FRAC(2,4)+8', 'RGN_FRAC(2,4)+8+4', 'RGN_FRAC(3,4)+8', 'RGN_FRAC(3,4)+8+4', 'RGN_FRAC(0,4)+16', 'RGN_FRAC(0,4)+16+4', 'RGN_FRAC(1,4)+16', 'RGN_FRAC(1,4)+16+4', 'RGN_FRAC(2,4)+16', 'RGN_FRAC(2,4)+16+4', 'RGN_FRAC(3,4)+16', 'RGN_FRAC(3,4)+16+4', 'RGN_FRAC(0,4)+24', 'RGN_FRAC(0,4)+24+4', 'RGN_FRAC(1,4)+24', 'RGN_FRAC(1,4)+24+4', 'RGN_FRAC(2,4)+24', 'RGN_FRAC(2,4)+24+4', 'RGN_FRAC(3,4)+24', 'RGN_FRAC(3,4)+24+4'], yOffsets: [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 480, 512, 544, 576, 608, 640, 672, 704, 736, 768, 800, 832, 864, 896, 928, 960, 992], charIncrement: 1024};
MERGE (n:KG {id: 'gfxdecode:gfx_mcr3'}) SET n:GfxDecode SET n += {name: 'gfx_mcr3', sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1063, sourceColumn: 8, sourceEndLine: 1063};
MERGE (n:KG {id: 'gfxdecode:gfx_mcr3/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'mcr_bg_layout', colorBase: 0, colorCount: 4, xscale: 2, yscale: 2};
MERGE (n:KG {id: 'gfxdecode:gfx_mcr3/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx2', offset: 0, layout: 'mcr_sprite_layout', colorBase: 0, colorCount: 4, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:rampage'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1694, sourceColumn: 1, sourceEndLine: 1694};
MATCH (a:KG {id: 'game:rampage'}), (b:KG {id: 'machine:mcr3_state.mono_sg'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:rampage'}), (b:KG {id: 'inputs:rampage'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:rampage'}), (b:KG {id: 'romset:rampage'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'game:rampage'}), (b:KG {id: 'handler:mcr3_state.rampage_ip4_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'game:rampage'}), (b:KG {id: 'handler:mcr3_state.rampage_op6_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'file:src/mame/bally/mcr3.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/bally/mcr3.cpp'}), (b:KG {id: 'file:mcr3.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/bally/mcr3.cpp'}), (b:KG {id: 'file:machine/nvram.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/bally/mcr3.cpp'}), (b:KG {id: 'file:machine/rescap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/bally/mcr3.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/bally/mcr3.cpp'}), (b:KG {id: 'file:spyhunt.lh'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/bally/mcr3.cpp'}), (b:KG {id: 'file:turbotag.lh'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mono_sg'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1146, sourceColumn: 1, sourceEndLine: 1154};
MATCH (a:KG {id: 'machine:mcr3_state.mono_sg'}), (b:KG {id: 'handler:mcr_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mono_sg'}), (b:KG {id: 'handler:mcr3_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mono_sg'}), (b:KG {id: 'machine:mcr3_state.mcrmono'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mono_sg'}), (b:KG {id: 'device:mcr3_state.mono_sg/sg'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:rampage'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 707, sourceColumn: 8, sourceEndLine: 707};
MATCH (a:KG {id: 'inputs:rampage'}), (b:KG {id: 'inputs:rampage/MONO.IP0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:rampage'}), (b:KG {id: 'inputs:rampage/MONO.IP1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:rampage'}), (b:KG {id: 'inputs:rampage/MONO.IP2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:rampage'}), (b:KG {id: 'inputs:rampage/MONO.IP3'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:rampage'}), (b:KG {id: 'inputs:rampage/MONO.IP4'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:rampage'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1306, sourceColumn: 1, sourceEndLine: 1306};
MATCH (a:KG {id: 'romset:rampage'}), (b:KG {id: 'region:rampage/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:rampage'}), (b:KG {id: 'region:rampage/sg:cpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:rampage'}), (b:KG {id: 'region:rampage/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:rampage'}), (b:KG {id: 'region:rampage/gfx2'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:rampage'}), (b:KG {id: 'region:rampage/sg:pal'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:mcr3_state.video_start'}), (b:KG {id: 'handler:mcr3_state.mcrmono_get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1083, sourceColumn: 1, sourceEndLine: 1116};
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'handler:mcr_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'handler:mcr3_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'device:mcr3_state.mcrmono/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'device:mcr3_state.mcrmono/scantimer'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'device:mcr3_state.mcrmono/ctc'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'device:mcr3_state.mcrmono/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'device:mcr3_state.mcrmono/nvram'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'device:mcr3_state.mcrmono/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'device:mcr3_state.mcrmono/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'device:mcr3_state.mcrmono/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'gfxdecode:gfx_mcr3'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:mcr3_state.mcrmono'}), (b:KG {id: 'device:mcr3_state.mcrmono/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'device:mcr3_state.mono_sg/sg'}), (b:KG {id: 'audioroute:device:mcr3_state.mono_sg/sg/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:mcr3_state.mono_sg/sg'}), (b:KG {id: 'audioroute:device:mcr3_state.mono_sg/sg/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:mcr3_state.mono_sg/sg'}), (b:KG {id: 'machine:midway_sounds_good_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP0'}), (b:KG {id: 'inputs:rampage/MONO.IP0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP0'}), (b:KG {id: 'inputs:rampage/MONO.IP0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP0'}), (b:KG {id: 'inputs:rampage/MONO.IP0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP0'}), (b:KG {id: 'inputs:rampage/MONO.IP0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP0'}), (b:KG {id: 'inputs:rampage/MONO.IP0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP0'}), (b:KG {id: 'inputs:rampage/MONO.IP0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP0'}), (b:KG {id: 'inputs:rampage/MONO.IP0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP1'}), (b:KG {id: 'inputs:rampage/MONO.IP1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP1'}), (b:KG {id: 'inputs:rampage/MONO.IP1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP1'}), (b:KG {id: 'inputs:rampage/MONO.IP1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP1'}), (b:KG {id: 'inputs:rampage/MONO.IP1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP1'}), (b:KG {id: 'inputs:rampage/MONO.IP1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP1'}), (b:KG {id: 'inputs:rampage/MONO.IP1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP1'}), (b:KG {id: 'inputs:rampage/MONO.IP1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP2'}), (b:KG {id: 'inputs:rampage/MONO.IP2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP2'}), (b:KG {id: 'inputs:rampage/MONO.IP2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP2'}), (b:KG {id: 'inputs:rampage/MONO.IP2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP2'}), (b:KG {id: 'inputs:rampage/MONO.IP2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP2'}), (b:KG {id: 'inputs:rampage/MONO.IP2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP2'}), (b:KG {id: 'inputs:rampage/MONO.IP2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP2'}), (b:KG {id: 'inputs:rampage/MONO.IP2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP3'}), (b:KG {id: 'inputs:rampage/MONO.IP3/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP3'}), (b:KG {id: 'inputs:rampage/MONO.IP3/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP3'}), (b:KG {id: 'inputs:rampage/MONO.IP3/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP3'}), (b:KG {id: 'inputs:rampage/MONO.IP3/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP3'}), (b:KG {id: 'inputs:rampage/MONO.IP3/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP4'}), (b:KG {id: 'inputs:rampage/MONO.IP4/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP4'}), (b:KG {id: 'inputs:rampage/MONO.IP4/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP4'}), (b:KG {id: 'inputs:rampage/MONO.IP4/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP4'}), (b:KG {id: 'inputs:rampage/MONO.IP4/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP4'}), (b:KG {id: 'inputs:rampage/MONO.IP4/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP4'}), (b:KG {id: 'inputs:rampage/MONO.IP4/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP4'}), (b:KG {id: 'inputs:rampage/MONO.IP4/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:rampage/MONO.IP4'}), (b:KG {id: 'inputs:rampage/MONO.IP4/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:rampage/maincpu'}), (b:KG {id: 'rom:rampage/maincpu/pro-0_3b_rev_3_8-27-86.3b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rampage/maincpu'}), (b:KG {id: 'rom:rampage/maincpu/pro-1_5b_rev_3_8-27-86.5b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rampage/sg:cpu'}), (b:KG {id: 'rom:rampage/sg:cpu/u-7_rev.2_8-14-86.u7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rampage/sg:cpu'}), (b:KG {id: 'rom:rampage/sg:cpu/u-17_rev.2_8-14-86.u17'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rampage/sg:cpu'}), (b:KG {id: 'rom:rampage/sg:cpu/u-8_rev.2_8-14-86.u8'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rampage/sg:cpu'}), (b:KG {id: 'rom:rampage/sg:cpu/u-18_rev.2_8-14-86.u18'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rampage/gfx1'}), (b:KG {id: 'rom:rampage/gfx1/bg-0_u15_7-23-86.15a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rampage/gfx1'}), (b:KG {id: 'rom:rampage/gfx1/bg-1_u14_7-23-86.14b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rampage/gfx2'}), (b:KG {id: 'rom:rampage/gfx2/fg-0_8e_6-30-86.8e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rampage/gfx2'}), (b:KG {id: 'rom:rampage/gfx2/fg-1_6e_6-30-86.6e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rampage/gfx2'}), (b:KG {id: 'rom:rampage/gfx2/fg-2_5e_6-30-86.5e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rampage/gfx2'}), (b:KG {id: 'rom:rampage/gfx2/fg-3_4e_6-30-86.4e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:rampage/sg:pal'}), (b:KG {id: 'rom:rampage/sg:pal/e36a31axnaxqd.u15.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'device:mcr3_state.mcrmono/maincpu'}), (b:KG {id: 'map:mcr3_state.mcrmono_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:mcr3_state.mcrmono/maincpu'}), (b:KG {id: 'map:mcr3_state.mcrmono_portmap'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:mcr3_state.mcrmono/scantimer'}), (b:KG {id: 'device:mcr3_state.mcrmono/scantimer/callback:scantimer:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mcr3_state.mcrmono/ctc'}), (b:KG {id: 'device:mcr3_state.mcrmono/ctc/callback:ctc:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mcr3_state.mcrmono/ctc'}), (b:KG {id: 'device:mcr3_state.mcrmono/ctc/callback:ctc:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mcr3_state.mcrmono/screen'}), (b:KG {id: 'device:mcr3_state.mcrmono/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_mcr3'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 1063, sourceColumn: 8, sourceEndLine: 1063};
MATCH (a:KG {id: 'gfxdecode:gfx_mcr3'}), (b:KG {id: 'gfxdecode:gfx_mcr3/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_mcr3'}), (b:KG {id: 'gfxdecode:gfx_mcr3/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'machine:midway_sounds_good_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/bally/midway_sound.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 605, sourceColumn: 1, sourceEndLine: 629};
MATCH (a:KG {id: 'machine:midway_sounds_good_device.device_add_mconfig'}), (b:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/cpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:midway_sounds_good_device.device_add_mconfig'}), (b:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/pia'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:midway_sounds_good_device.device_add_mconfig'}), (b:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/dac'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:midway_sounds_good_device.device_add_mconfig'}), (b:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/dac_filter2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:midway_sounds_good_device.device_add_mconfig'}), (b:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/dac_filter1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:midway_sounds_good_device.device_add_mconfig'}), (b:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/dac_filter0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_map'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 479, sourceColumn: 1, sourceEndLine: 489};
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_map'}), (b:KG {id: 'map:mcr3_state.mcrmono_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_map'}), (b:KG {id: 'map:mcr3_state.mcrmono_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_map'}), (b:KG {id: 'map:mcr3_state.mcrmono_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_map'}), (b:KG {id: 'map:mcr3_state.mcrmono_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_map'}), (b:KG {id: 'map:mcr3_state.mcrmono_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_map'}), (b:KG {id: 'map:mcr3_state.mcrmono_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_map'}), (b:KG {id: 'map:mcr3_state.mcrmono_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/mcr3.cpp', sourceLine: 492, sourceColumn: 1, sourceEndLine: 504};
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap'}), (b:KG {id: 'map:mcr3_state.mcrmono_portmap/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap'}), (b:KG {id: 'map:mcr3_state.mcrmono_portmap/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap'}), (b:KG {id: 'map:mcr3_state.mcrmono_portmap/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap'}), (b:KG {id: 'map:mcr3_state.mcrmono_portmap/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap'}), (b:KG {id: 'map:mcr3_state.mcrmono_portmap/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap'}), (b:KG {id: 'map:mcr3_state.mcrmono_portmap/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap'}), (b:KG {id: 'map:mcr3_state.mcrmono_portmap/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap'}), (b:KG {id: 'map:mcr3_state.mcrmono_portmap/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:mcr3_state.mcrmono/scantimer/callback:scantimer:0'}), (b:KG {id: 'handler:mcr3_state.mcr_interrupt'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:mcr3_state.mcrmono/ctc/callback:ctc:0'}), (b:KG {id: 'device:mcr3_state.mcrmono/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:mcr3_state.mcrmono/ctc/callback:ctc:1'}), (b:KG {id: 'handler:z80ctc_device.trg1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:mcr3_state.mcrmono/ctc/callback:ctc:1'}), (b:KG {id: 'device:mcr3_state.mcrmono/ctc'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:mcr3_state.mcrmono/screen/callback:screen:0'}), (b:KG {id: 'handler:mcr3_state.screen_update_mcr3'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_mcr3/e0'}), (b:KG {id: 'gfxlayout:mcr_bg_layout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_mcr3/e1'}), (b:KG {id: 'gfxlayout:mcr_sprite_layout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'file:src/mame/bally/midway_sound.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/bally/midway_sound.cpp'}), (b:KG {id: 'file:midway_sound.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/bally/midway_sound.cpp'}), (b:KG {id: 'file:machine/rescap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/cpu'}), (b:KG {id: 'map:midway_sounds_good_device.soundsgood_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/pia'}), (b:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/pia/callback:pia:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/pia'}), (b:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/pia/callback:pia:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/pia'}), (b:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/pia/callback:pia:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/pia'}), (b:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/pia/callback:pia:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_map/range4'}), (b:KG {id: 'handler:mcr3_state.mcr_paletteram9_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_map/range5'}), (b:KG {id: 'handler:mcr3_state.mcr3_videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap/range5'}), (b:KG {id: 'handler:mcr3_state.mcrmono_control_port_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap/range6'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap/range7'}), (b:KG {id: 'handler:z80ctc_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ctc'};
MATCH (a:KG {id: 'map:mcr3_state.mcrmono_portmap/range7'}), (b:KG {id: 'handler:z80ctc_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ctc'};
MATCH (a:KG {id: 'handler:mcr3_state.screen_update_mcr3'}), (b:KG {id: 'handler:mcr3_state.mcr3_update_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:mcr_bg_layout'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:mcr_sprite_layout'}), (b:KG {id: 'file:src/mame/bally/mcr3.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'map:midway_sounds_good_device.soundsgood_map'}), (b:KG {id: 'file:src/mame/bally/midway_sound.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/bally/midway_sound.cpp', sourceLine: 591, sourceColumn: 1, sourceEndLine: 598};
MATCH (a:KG {id: 'map:midway_sounds_good_device.soundsgood_map'}), (b:KG {id: 'map:midway_sounds_good_device.soundsgood_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midway_sounds_good_device.soundsgood_map'}), (b:KG {id: 'map:midway_sounds_good_device.soundsgood_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midway_sounds_good_device.soundsgood_map'}), (b:KG {id: 'map:midway_sounds_good_device.soundsgood_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/pia/callback:pia:0'}), (b:KG {id: 'handler:midway_sounds_good_device.porta_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/pia/callback:pia:1'}), (b:KG {id: 'handler:midway_sounds_good_device.portb_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/pia/callback:pia:2'}), (b:KG {id: 'handler:midway_sounds_good_device.irq_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:midway_sounds_good_device.device_add_mconfig/pia/callback:pia:3'}), (b:KG {id: 'handler:midway_sounds_good_device.irq_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:mcr3_state.mcr_paletteram9_w'}), (b:KG {id: 'handler:mcr_state.mcr_set_color'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:midway_sounds_good_device.soundsgood_map/range1'}), (b:KG {id: 'handler:pia6821_device.read_alt'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'pia'};
MATCH (a:KG {id: 'map:midway_sounds_good_device.soundsgood_map/range1'}), (b:KG {id: 'handler:pia6821_device.write_alt'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'pia'};
MATCH (a:KG {id: 'handler:midway_sounds_good_device.porta_w'}), (b:KG {id: 'handler:midway_sounds_good_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:midway_sounds_good_device.portb_w'}), (b:KG {id: 'handler:midway_sounds_good_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:midway_sounds_good_device.write'}), (b:KG {id: 'handler:midway_sounds_good_device.synced_write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:midway_sounds_good_device.synced_write'}), (b:KG {id: 'handler:midway_sounds_good_device.portb_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
