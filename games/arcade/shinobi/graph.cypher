// mamekit knowledge graph — driver src/mame/sega/segas16a.cpp
// generated 2026-09-05T03:50:12.375Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/sega/segas16a.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/sega/segas16a.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:fd1089.h'}) SET n:SourceFile SET n += {path: 'fd1089.h', external: true};
MERGE (n:KG {id: 'file:fd1094.h'}) SET n:SourceFile SET n += {path: 'fd1094.h', external: true};
MERGE (n:KG {id: 'file:sega16sp.h'}) SET n:SourceFile SET n += {path: 'sega16sp.h', external: true};
MERGE (n:KG {id: 'file:segaic16.h'}) SET n:SourceFile SET n += {path: 'segaic16.h', external: true};
MERGE (n:KG {id: 'file:segaipt.h'}) SET n:SourceFile SET n += {path: 'segaipt.h', external: true};
MERGE (n:KG {id: 'file:cpu/m68000/m68000.h'}) SET n:SourceFile SET n += {path: 'cpu/m68000/m68000.h', external: true};
MERGE (n:KG {id: 'file:cpu/mcs48/mcs48.h'}) SET n:SourceFile SET n += {path: 'cpu/mcs48/mcs48.h', external: true};
MERGE (n:KG {id: 'file:cpu/mcs51/i8051.h'}) SET n:SourceFile SET n += {path: 'cpu/mcs51/i8051.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:machine/cxd1095.h'}) SET n:SourceFile SET n += {path: 'machine/cxd1095.h', external: true};
MERGE (n:KG {id: 'file:machine/gen_latch.h'}) SET n:SourceFile SET n += {path: 'machine/gen_latch.h', external: true};
MERGE (n:KG {id: 'file:machine/i8255.h'}) SET n:SourceFile SET n += {path: 'machine/i8255.h', external: true};
MERGE (n:KG {id: 'file:machine/i8243.h'}) SET n:SourceFile SET n += {path: 'machine/i8243.h', external: true};
MERGE (n:KG {id: 'file:machine/nvram.h'}) SET n:SourceFile SET n += {path: 'machine/nvram.h', external: true};
MERGE (n:KG {id: 'file:machine/segacrp2_device.h'}) SET n:SourceFile SET n += {path: 'machine/segacrp2_device.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:sound/dac.h'}) SET n:SourceFile SET n += {path: 'sound/dac.h', external: true};
MERGE (n:KG {id: 'file:sound/ymopm.h'}) SET n:SourceFile SET n += {path: 'sound/ymopm.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'game:shinobi'}) SET n:Game SET n += {name: 'shinobi', year: '1987', company: 'Sega', fullname: 'Shinobi (set 6, System 16A) (unprotected)', monitor: 'ROT0', cls: 'segas16a_state', init: 'init_generic', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 4300, sourceColumn: 1, sourceEndLine: 4300, classConstants: '{"m_video_control":0,"m_mcu_control":0,"m_upd7751_command":0,"m_upd7751_rom_address":0,"m_last_buttons1":0,"m_last_buttons2":0,"m_read_port":0,"m_mj_input_num":0}'};
MERGE (n:KG {id: 'romset:shinobi'}) SET n:RomSet SET n += {name: 'shinobi', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 3529, sourceColumn: 1, sourceEndLine: 3529};
MERGE (n:KG {id: 'region:shinobi/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 262144, flags: '0', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2449, sourceColumn: 2, sourceEndLine: 2449};
MERGE (n:KG {id: 'rom:shinobi/maincpu/epr-12010.43'}) SET n:Rom SET n += {file: 'epr-12010.43', offset: 0, size: 65536, crc: '7df7f4a2', sha1: '86ac00a3a8ecc1a7fcb00533ea12a6cb6d59089b', skip: 1};
MERGE (n:KG {id: 'rom:shinobi/maincpu/epr-12008.26'}) SET n:Rom SET n += {file: 'epr-12008.26', offset: 1, size: 65536, crc: 'f5ae64cd', sha1: '33c9f25fcaff80b03d074d9d44d94976162411bf', skip: 1};
MERGE (n:KG {id: 'rom:shinobi/maincpu/epr-12011.42'}) SET n:Rom SET n += {file: 'epr-12011.42', offset: 131072, size: 65536, crc: '9d46e707', sha1: '37ab25b3b37365c9f45837bfb6ec80652691dd4c', skip: 1};
MERGE (n:KG {id: 'rom:shinobi/maincpu/epr-12009.25'}) SET n:Rom SET n += {file: 'epr-12009.25', offset: 131073, size: 65536, crc: '7961d07e', sha1: '38cbdab35f901532c0ad99ad0083513abd2ff182', skip: 1};
MERGE (n:KG {id: 'region:shinobi/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 196608, flags: '0', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2458, sourceColumn: 2, sourceEndLine: 2458};
MERGE (n:KG {id: 'rom:shinobi/gfx1/epr-11264.95'}) SET n:Rom SET n += {file: 'epr-11264.95', offset: 0, size: 65536, crc: '46627e7d', sha1: '66bb5b22a2100e7b9df303007a837bc2d52cf7ba', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 3537, sourceColumn: 2, sourceEndLine: 3537};
MERGE (n:KG {id: 'rom:shinobi/gfx1/epr-11265.94'}) SET n:Rom SET n += {file: 'epr-11265.94', offset: 65536, size: 65536, crc: '87d0f321', sha1: '885b38eaff2dcaeab4eeaa20cc8a2885d520abd6', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 3538, sourceColumn: 2, sourceEndLine: 3538};
MERGE (n:KG {id: 'rom:shinobi/gfx1/epr-11266.93'}) SET n:Rom SET n += {file: 'epr-11266.93', offset: 131072, size: 65536, crc: 'efb4af87', sha1: '0b8a905023e1bc808fd2b1c3cfa3778cde79e659', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 3539, sourceColumn: 2, sourceEndLine: 3539};
MERGE (n:KG {id: 'region:shinobi/sprites'}) SET n:RomRegion SET n += {tag: 'sprites', size: 524288, flags: '0'};
MERGE (n:KG {id: 'rom:shinobi/sprites/epr-11290.10'}) SET n:Rom SET n += {file: 'epr-11290.10', offset: 1, size: 32768, crc: '611f413a', sha1: '180f83216e2dfbfd77b0fb3be83c3042954d12df', skip: 1, continueSegments: [262145, 32768, 32768]};
MERGE (n:KG {id: 'rom:shinobi/sprites/epr-11294.11'}) SET n:Rom SET n += {file: 'epr-11294.11', offset: 0, size: 32768, crc: '5eb00fc1', sha1: '97e02eee74f61fabcad2a9e24f1868cafaac1d51', skip: 1, continueSegments: [262144, 32768, 32768]};
MERGE (n:KG {id: 'rom:shinobi/sprites/epr-11291.17'}) SET n:Rom SET n += {file: 'epr-11291.17', offset: 65537, size: 32768, crc: '3c0797c0', sha1: 'df18c7987281bd9379026c6cf7f96f6ae49fd7f9', skip: 1, continueSegments: [327681, 32768, 32768]};
MERGE (n:KG {id: 'rom:shinobi/sprites/epr-11295.18'}) SET n:Rom SET n += {file: 'epr-11295.18', offset: 65536, size: 32768, crc: '25307ef8', sha1: '91ffbe436f80d583524ee113a8b7c0cf5d8ab286', skip: 1, continueSegments: [327680, 32768, 32768]};
MERGE (n:KG {id: 'rom:shinobi/sprites/epr-11292.23'}) SET n:Rom SET n += {file: 'epr-11292.23', offset: 131073, size: 32768, crc: 'c29ac34e', sha1: 'b5e9b8c3233a7d6797f91531a0d9123febcf1660', skip: 1, continueSegments: [393217, 32768, 32768]};
MERGE (n:KG {id: 'rom:shinobi/sprites/epr-11296.24'}) SET n:Rom SET n += {file: 'epr-11296.24', offset: 131072, size: 32768, crc: '04a437f8', sha1: 'ea5fed64443236e3404fab243761e60e2e48c84c', skip: 1, continueSegments: [393216, 32768, 32768]};
MERGE (n:KG {id: 'rom:shinobi/sprites/epr-11293.29'}) SET n:Rom SET n += {file: 'epr-11293.29', offset: 196609, size: 32768, crc: '41f41063', sha1: '5cc461e9738dddf9eea06831fce3702d94674163', skip: 1, continueSegments: [458753, 32768, 32768]};
MERGE (n:KG {id: 'rom:shinobi/sprites/epr-11297.30'}) SET n:Rom SET n += {file: 'epr-11297.30', offset: 196608, size: 32768, crc: 'b6e1fd72', sha1: 'eb86e4bf880bd1a1d9bcab3f2f2e917bcaa06172', skip: 1, continueSegments: [458752, 32768, 32768]};
MERGE (n:KG {id: 'region:shinobi/soundcpu'}) SET n:RomRegion SET n += {tag: 'soundcpu', size: 131072, flags: '0', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2481, sourceColumn: 2, sourceEndLine: 2481};
MERGE (n:KG {id: 'rom:shinobi/soundcpu/epr-11267.12'}) SET n:Rom SET n += {file: 'epr-11267.12', offset: 0, size: 32768, crc: 'dd50b745', sha1: '52e1977569d3713ad864d607170c9a61cd059a65', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 3560, sourceColumn: 2, sourceEndLine: 3560};
MERGE (n:KG {id: 'region:shinobi/upd7751'}) SET n:RomRegion SET n += {tag: 'upd7751', size: 4096, flags: '0', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2484, sourceColumn: 2, sourceEndLine: 2484};
MERGE (n:KG {id: 'rom:shinobi/upd7751/7751.bin'}) SET n:Rom SET n += {file: '7751.bin', offset: 0, size: 1024, crc: '6a9534fc', sha1: '67ad94674db5c2aab75785668f610f6f4eccd158', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2485, sourceColumn: 2, sourceEndLine: 2485};
MERGE (n:KG {id: 'region:shinobi/upd7751data'}) SET n:RomRegion SET n += {tag: 'upd7751data', size: 32768, flags: '0', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2487, sourceColumn: 2, sourceEndLine: 2487};
MERGE (n:KG {id: 'rom:shinobi/upd7751data/epr-11268.1'}) SET n:Rom SET n += {file: 'epr-11268.1', offset: 0, size: 32768, crc: '6d7966da', sha1: '90f55a99f784c21d7c135e630f4e8b1d4d043d66', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 3566, sourceColumn: 2, sourceEndLine: 3566};
MERGE (n:KG {id: 'map:segas16a_state.system16a_map'}) SET n:AddressMap SET n += {cls: 'segas16a_state', name: 'system16a_map', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1245, sourceColumn: 1, sourceEndLine: 1256, unmapHigh: true};
MERGE (n:KG {id: 'map:segas16a_state.system16a_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 262143, raw: 'map(0x000000, 0x03ffff).mirror(0x380000).rom()', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1248, sourceColumn: 2, sourceEndLine: 1248, mirror: 3670016, rom: true};
MERGE (n:KG {id: 'map:segas16a_state.system16a_map/range1'}) SET n:AddressRange SET n += {start: 4194304, end: 4227071, raw: 'map(0x400000, 0x407fff).mirror(0xb88000).rw(m_segaic16vid, FUNC(segaic16_video_device::tileram_r), FUNC(segaic16_video_device::tileram_w)).share("tileram")', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1249, sourceColumn: 2, sourceEndLine: 1249, mirror: 12091392, share: 'tileram'};
MERGE (n:KG {id: 'handler:segaic16_video_device.tileram_r'}) SET n:Handler SET n += {method: 'tileram_r', ownerClass: 'segaic16_video_device', sourceFile: 'src/mame/sega/segaic16.cpp', sourceLine: 1436, sourceColumn: 1, sourceEndLine: 1439, sourceParameters: 'offs_t offset', sourceBody: 'return m_tileram[offset];'};
MERGE (n:KG {id: 'handler:segaic16_video_device.tileram_w'}) SET n:Handler SET n += {method: 'tileram_w', ownerClass: 'segaic16_video_device', sourceFile: 'src/mame/sega/segaic16.cpp', sourceLine: 1442, sourceColumn: 1, sourceEndLine: 1446, sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: 'COMBINE_DATA(&m_tileram[offset]);
	m_bg_tilemap[0].tilemaps[offset / (64*32)]->mark_tile_dirty(offset % (64*32));'};
MERGE (n:KG {id: 'map:segas16a_state.system16a_map/range2'}) SET n:AddressRange SET n += {start: 4259840, end: 4263935, raw: 'map(0x410000, 0x410fff).mirror(0xb8f000).rw(m_segaic16vid, FUNC(segaic16_video_device::textram_r), FUNC(segaic16_video_device::textram_w)).share("textram")', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1250, sourceColumn: 2, sourceEndLine: 1250, mirror: 12120064, share: 'textram'};
MERGE (n:KG {id: 'handler:segaic16_video_device.textram_r'}) SET n:Handler SET n += {method: 'textram_r', ownerClass: 'segaic16_video_device', sourceFile: 'src/mame/sega/segaic16.cpp', sourceLine: 1449, sourceColumn: 1, sourceEndLine: 1452, sourceParameters: 'offs_t offset', sourceBody: 'return m_textram[offset];'};
MERGE (n:KG {id: 'handler:segaic16_video_device.textram_w'}) SET n:Handler SET n += {method: 'textram_w', ownerClass: 'segaic16_video_device', sourceFile: 'src/mame/sega/segaic16.cpp', sourceLine: 1455, sourceColumn: 1, sourceEndLine: 1463, sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: '/* certain ranges need immediate updates */
	if (offset >= 0xe80/2)
		screen().update_partial(screen().vpos());

	COMBINE_DATA(&m_textram[offset]);
	m_bg_tilemap[0].textmap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:segas16a_state.system16a_map/range3'}) SET n:AddressRange SET n += {start: 4456448, end: 4458495, raw: 'map(0x440000, 0x4407ff).mirror(0x3bf800).ram().share("sprites")', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1251, sourceColumn: 2, sourceEndLine: 1251, mirror: 3930112, ram: true, share: 'sprites'};
MERGE (n:KG {id: 'map:segas16a_state.system16a_map/range4'}) SET n:AddressRange SET n += {start: 8650752, end: 8654847, raw: 'map(0x840000, 0x840fff).mirror(0x3bf000).ram().w(FUNC(segas16a_state::paletteram_w)).share("paletteram")', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1252, sourceColumn: 2, sourceEndLine: 1252, mirror: 3928064, ram: true, share: 'paletteram'};
MERGE (n:KG {id: 'handler:segas16a_state.paletteram_w'}) SET n:Handler SET n += {method: 'paletteram_w', ownerClass: 'segas16a_state', sourceFile: 'src/mame/sega/segaic16.cpp', sourceLine: 450, sourceColumn: 1, sourceEndLine: 474, sourceParameters: 'address_space &space, offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: '// compute the number of entries
	if (m_palette_entries == 0)
		m_palette_entries = memshare("paletteram")->bytes() / 2;

	// get the new value
	u16 newval = m_paletteram[offset];
	COMBINE_DATA(&newval);
	m_paletteram[offset] = newval;

	//     byte 0    byte 1
	//  sBGR BBBB GGGG RRRR
	//  x000 4321 4321 4321
	const u8 r = ((newval >> 12) & 0x01) | ((newval << 1) & 0x1e);
	const u8 g = ((newval >> 13) & 0x01) | ((newval >> 3) & 0x1e);
	const u8 b = ((newval >> 14) & 0x01) | ((newval >> 7) & 0x1e);

	// shadow / hilight toggle bit in palette RAM
	rgb_t effects = (newval & 0x8000) ?
				rgb_t(m_palette_hilight[r], m_palette_hilight[g], m_palette_hilight[b]) :
				rgb_t(m_palette_shadow[r],  m_palette_shadow[g],  m_palette_shadow[b]);
	m_palette->set_pen_color(offset + 0 * m_palette_entries, m_palette_normal[r],  m_palette_normal[g],  m_palette_normal[b]);
	m_palette->set_pen_color(offset + 1 * m_palette_entries, effects);'};
MERGE (n:KG {id: 'map:segas16a_state.system16a_map/range5'}) SET n:AddressRange SET n += {start: 12845056, end: 12861439, raw: 'map(0xc40000, 0xc43fff).mirror(0x39c000).rw(FUNC(segas16a_state::misc_io_r), FUNC(segas16a_state::misc_io_w))', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1253, sourceColumn: 2, sourceEndLine: 1253, mirror: 3784704};
MERGE (n:KG {id: 'handler:segas16a_state.misc_io_r'}) SET n:Handler SET n += {method: 'misc_io_r', ownerClass: 'segas16a_state', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 579, sourceColumn: 1, sourceEndLine: 583, sourceParameters: 'offs_t offset', sourceBody: '// just call custom handler
	return m_custom_io_r(offset);'};
MERGE (n:KG {id: 'handler:segas16a_state.misc_io_w'}) SET n:Handler SET n += {method: 'misc_io_w', ownerClass: 'segas16a_state', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 590, sourceColumn: 1, sourceEndLine: 594, sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: '// just call custom handler
	m_custom_io_w(offset, data, mem_mask);'};
MERGE (n:KG {id: 'map:segas16a_state.system16a_map/range6'}) SET n:AddressRange SET n += {start: 12976128, end: 13041663, raw: 'map(0xc60000, 0xc6ffff).r(m_watchdog, FUNC(watchdog_timer_device::reset16_r))', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1254, sourceColumn: 2, sourceEndLine: 1254};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset16_r'}) SET n:Handler SET n += {method: 'reset16_r', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1254, sourceColumn: 2, sourceEndLine: 1254};
MERGE (n:KG {id: 'map:segas16a_state.system16a_map/range7'}) SET n:AddressRange SET n += {start: 13041664, end: 13058047, raw: 'map(0xc70000, 0xc73fff).mirror(0x38c000).ram().share("nvram")', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1255, sourceColumn: 2, sourceEndLine: 1255, mirror: 3719168, ram: true, share: 'nvram'};
MERGE (n:KG {id: 'map:segas16a_state.sound_map'}) SET n:AddressMap SET n += {cls: 'segas16a_state', name: 'sound_map', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1269, sourceColumn: 1, sourceEndLine: 1275, unmapHigh: true};
MERGE (n:KG {id: 'map:segas16a_state.sound_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom()', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1272, sourceColumn: 2, sourceEndLine: 1272, rom: true};
MERGE (n:KG {id: 'map:segas16a_state.sound_map/range1'}) SET n:AddressRange SET n += {start: 59392, end: 59392, raw: 'map(0xe800, 0xe800).r(FUNC(segas16a_state::sound_data_r))', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1273, sourceColumn: 2, sourceEndLine: 1273};
MERGE (n:KG {id: 'handler:segas16a_state.sound_data_r'}) SET n:Handler SET n += {method: 'sound_data_r', ownerClass: 'segas16a_state', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 606, sourceColumn: 1, sourceEndLine: 611, sourceParameters: '', sourceBody: '// assert ACK
	m_i8255->pc6_w(CLEAR_LINE);
	return m_soundlatch->read();'};
MERGE (n:KG {id: 'map:segas16a_state.sound_map/range2'}) SET n:AddressRange SET n += {start: 63488, end: 65535, raw: 'map(0xf800, 0xffff).ram()', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1274, sourceColumn: 2, sourceEndLine: 1274, ram: true};
MERGE (n:KG {id: 'map:segas16a_state.sound_portmap'}) SET n:AddressMap SET n += {cls: 'segas16a_state', name: 'sound_portmap', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1282, sourceColumn: 1, sourceEndLine: 1289, globalMask: 255, unmapHigh: true};
MERGE (n:KG {id: 'map:segas16a_state.sound_portmap/range0'}) SET n:AddressRange SET n += {start: 0, end: 1, raw: 'map(0x00, 0x01).mirror(0x3e).rw(m_ymsnd, FUNC(ym2151_device::read), FUNC(ym2151_device::write))', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1286, sourceColumn: 2, sourceEndLine: 1286, mirror: 62};
MERGE (n:KG {id: 'handler:ym2151_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'ym2151_device', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1295, sourceColumn: 2, sourceEndLine: 1295};
MERGE (n:KG {id: 'handler:ym2151_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'ym2151_device', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1295, sourceColumn: 2, sourceEndLine: 1295};
MERGE (n:KG {id: 'map:segas16a_state.sound_portmap/range1'}) SET n:AddressRange SET n += {start: 128, end: 128, raw: 'map(0x80, 0x80).mirror(0x3f).w(FUNC(segas16a_state::upd7751_command_w))', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1287, sourceColumn: 2, sourceEndLine: 1287, mirror: 63};
MERGE (n:KG {id: 'handler:segas16a_state.upd7751_command_w'}) SET n:Handler SET n += {method: 'upd7751_command_w', ownerClass: 'segas16a_state', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 618, sourceColumn: 1, sourceEndLine: 638, sourceParameters: 'uint8_t data', sourceBody: '//
	//  Z80 7751 control port
	//
	//  D7-D5 = connected to 7751 port C
	//  D4    = /CS for ROM 3
	//  D3    = /CS for ROM 2
	//  D2    = /CS for ROM 1
	//  D1    = /CS for ROM 0
	//  D0    = A14 line to ROMs
	//
	int numroms = memregion("upd7751data")->bytes() / 0x8000;
	m_upd7751_rom_address &= 0x3fff;
	m_upd7751_rom_address |= (data & 0x01) << 14;
	if (!(data & 0x02) && numroms >= 1) m_upd7751_rom_address |= 0x00000;
	if (!(data & 0x04) && numroms >= 2) m_upd7751_rom_address |= 0x08000;
	if (!(data & 0x08) && numroms >= 3) m_upd7751_rom_address |= 0x10000;
	if (!(data & 0x10) && numroms >= 4) m_upd7751_rom_address |= 0x18000;
	m_upd7751_command = data >> 5;'};
MERGE (n:KG {id: 'map:segas16a_state.sound_portmap/range2'}) SET n:AddressRange SET n += {start: 192, end: 192, raw: 'map(0xc0, 0xc0).mirror(0x3f).r(FUNC(segas16a_state::sound_data_r))', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1288, sourceColumn: 2, sourceEndLine: 1288, mirror: 63};
MERGE (n:KG {id: 'machine:segas16a_state.system16a'}) SET n:MachineConfig SET n += {cls: 'segas16a_state', name: 'system16a', calls: [], stateMembers: ['{"name":"m_palette_entries","bits":32}', '{"name":"m_palette_normal","bits":8,"arrayLength":32}', '{"name":"m_palette_shadow","bits":8,"arrayLength":32}', '{"name":"m_palette_hilight","bits":8,"arrayLength":32}', '{"name":"m_video_control","bits":8}', '{"name":"m_mcu_control","bits":8}', '{"name":"m_upd7751_command","bits":8}', '{"name":"m_upd7751_rom_address","bits":32}', '{"name":"m_last_buttons1","bits":8}', '{"name":"m_last_buttons2","bits":8}', '{"name":"m_read_port","bits":8}', '{"name":"m_mj_input_num","bits":8}'], resetHandlers: ['segas16a_state.machine_reset'], startHandlers: ['segas16a_state.video_start'], sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2256, sourceColumn: 1, sourceEndLine: 2317};
MERGE (n:KG {id: 'handler:segas16a_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'segas16a_state', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 911, sourceColumn: 1, sourceEndLine: 923, sourceParameters: '', sourceBody: '// queue up a timer to either boost interleave or disable the MCU
	m_i8751_sync_timer->adjust(attotime::zero);
	m_video_control = 0;
	m_mcu_control = 0x00;
	m_upd7751_command = 0;
	m_upd7751_rom_address = 0;
	m_last_buttons1 = 0;
	m_last_buttons2 = 0;
	m_read_port = 0;
	m_mj_input_num = 0;'};
MERGE (n:KG {id: 'handler:segas16a_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'segas16a_state', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 370, sourceColumn: 1, sourceEndLine: 374, sourceConstants: ['TILEMAP_16A=1'], sourceParameters: '', sourceBody: '// initialize the tile/text layers
	m_segaic16vid->tilemap_init( 0, segaic16_video_device::TILEMAP_16A, 0x000, 0, 1);'};
MERGE (n:KG {id: 'handler:segaic16_video_device.tilemap_init'}) SET n:Handler SET n += {method: 'tilemap_init', ownerClass: 'segaic16_video_device', sourceFile: 'src/mame/sega/segaic16.cpp', sourceLine: 1199, sourceColumn: 1, sourceEndLine: 1306, sourceConstants: ['TILEMAP_HANGON=0', 'TILEMAP_16A=1', 'TILEMAP_16B=2', 'TILEMAP_16B_ALT=3'], sourceParameters: 'int which, int type, int colorbase, int xoffs, int numbanks', sourceBody: 'struct tilemap_info *info = &m_bg_tilemap[which];
	tilemap_get_info_delegate get_text_info(*this);
	tilemap_get_info_delegate get_tile_info(*this);

	/* reset the tilemap info */
	*info = tilemap_info();
	info->index = which;
	info->type = type;
	for (int i = 0; i < numbanks; i++)
		info->bank[i] = i;
	info->banksize = 0x2000 / numbanks;
	info->xoffs = xoffs;

	/* set up based on which tilemap */
	switch (which)
	{
		case 0:
			info->textram = m_textram;
			info->tileram = m_tileram;
			break;

		default:
			fatalerror("Invalid tilemap index specified in tilemap_init\\n");
	}

	/* determine the parameters of the tilemaps */
	switch (type)
	{
		case TILEMAP_HANGON:
			get_text_info = tilemap_get_info_delegate(*this, FUNC(segaic16_video_device::tilemap_16a_text_info));
			get_tile_info = tilemap_get_info_delegate(*this, FUNC(segaic16_video_device::tilemap_16a_tile_info));
			info->numpages = 4;
			info->draw_layer = tilemap_16a_draw_layer;
			info->reset = nullptr;
			info->latch_timer = nullptr;
			break;

		case TILEMAP_16A:
			get_text_info = tilemap_get_info_delegate(*this, FUNC(segaic16_video_device::tilemap_16a_text_info));
			get_tile_info = tilemap_get_info_delegate(*this, FUNC(segaic16_video_device::tilemap_16a_tile_info));
			info->numpages = 8;
			info->draw_layer = tilemap_16a_draw_layer;
			info->reset = nullptr;
			info->latch_timer = nullptr;
			break;

		case TILEMAP_16B:
			get_text_info = tilemap_get_info_delegate(*this, FUNC(segaic16_video_device::tilemap_16b_text_info));
			get_tile_info = tilemap_get_info_delegate(*this, FUNC(segaic16_video_device::tilemap_16b_tile_info));
			info->numpages = 16;
			info->draw_layer = tilemap_16b_draw_layer;
			info->reset = tilemap_16b_reset;
			info->latch_timer = timer_alloc(FUNC(segaic16_video_device::tilemap_16b_latch_values), this);
			break;

		case TILEMAP_16B_ALT:
			get_text_info = tilemap_get_info_delegate(*this, FUNC(segaic16_video_device::tilemap_16b_alt_text_info));
			get_tile_info = tilemap_get_info_delegate(*this, FUNC(segaic16_video_device::tilemap_16b_alt_tile_info));
			info->numpages = 16;
			info->draw_layer = tilemap_16b_draw_layer;
			info->reset = tilemap_16b_reset;
			info->latch_timer = timer_alloc(FUNC(segaic16_video_device::tilemap_16b_latch_values), this);
			break;

		default:
			fatalerror("Invalid tilemap type specified in tilemap_init\\n");
	}

	/* create the tilemap for the text layer */
	info->textmap = &machine().tilemap().create(*m_gfxdecode, get_text_info, TILEMAP_SCAN_ROWS, 8,8, 64,28);

	/* configure it */
	info->textmap_info.rambase = info->textram;
	info->textmap_info.bank = info->bank;
	info->textmap_info.banksize = info->banksize;
	info->textmap->set_user_data(&info->textmap_info);
	info->textmap->set_palette_offset(colorbase);
	info->textmap->set_transparent_pen(0);
	info->textmap->set_scrolldx(-192 + xoffs, -192 + xoffs);
	info->textmap->set_scrolldy(0, 0);

	/* create the tilemaps for the tile pages */
	for (int pagenum = 0; pagenum < info->numpages; pagenum++)
	{
		/* each page is 64x32 */
		info->tilemaps[pagenum] = &machine().tilemap().create(*m_gfxdecode, get_tile_info, TILEMAP_SCAN_ROWS, 8,8, 64,32);

		/* configure the tilemap */
		info->tmap_info[pagenum].rambase = info->tileram + pagenum * 64*32;
		info->tmap_info[pagenum].bank = info->bank;
		info->tmap_info[pagenum].banksize = info->banksize;
		info->tilemaps[pagenum]->set_user_data(&info->tmap_info[pagenum]);
		info->tilemaps[pagenum]->set_palette_offset(colorbase);
		info->tilemaps[pagenum]->set_transparent_pen(0);
		info->tilemaps[pagenum]->set_scrolldx(0, 0);
		info->tilemaps[pagenum]->set_scrolldy(0, 0);
	}

	save_item(NAME(info->flip), which);
	save_item(NAME(info->rowscroll), which);
	save_item(NAME(info->colscroll), which);
	save_item(NAME(info->bank), which);
	save_item(NAME(info->latched_xscroll), which);
	save_item(NAME(info->latched_yscroll), which);
	save_item(NAME(info->latched_pageselect), which);'};
MERGE (n:KG {id: 'handler:segaic16_video_device.tilemap_16a_text_info'}) SET n:Handler SET n += {method: 'tilemap_16a_text_info', ownerClass: 'segaic16_video_device', sourceFile: 'src/mame/sega/segaic16.cpp', sourceLine: 810, sourceColumn: 1, sourceEndLine: 819, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'const struct tilemap_callback_info *info = (const struct tilemap_callback_info *)tilemap.user_data();
	uint16_t data = info->rambase[tile_index];
	int color = (data >> 8) & 0x07;
	int code = data & 0xff;

	tileinfo.set(0, code, color, 0);
	tileinfo.category = (data >> 11) & 1;'};
MERGE (n:KG {id: 'handler:segaic16_video_device.tilemap_16a_tile_info'}) SET n:Handler SET n += {method: 'tilemap_16a_tile_info', ownerClass: 'segaic16_video_device', sourceFile: 'src/mame/sega/segaic16.cpp', sourceLine: 798, sourceColumn: 1, sourceEndLine: 807, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'const struct tilemap_callback_info *info = (const struct tilemap_callback_info *)tilemap.user_data();
	uint16_t data = info->rambase[tile_index];
	int code = ((data >> 1) & 0x1000) | (data & 0xfff);
	int color = (data >> 5) & 0x7f;

	tileinfo.set(0, code, color, 0);
	tileinfo.category = (data >> 12) & 1;'};
MERGE (n:KG {id: 'handler:segaic16_video_device.tilemap_16b_text_info'}) SET n:Handler SET n += {method: 'tilemap_16b_text_info', ownerClass: 'segaic16_video_device', sourceFile: 'src/mame/sega/segaic16.cpp', sourceLine: 1024, sourceColumn: 1, sourceEndLine: 1034, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'const struct tilemap_callback_info *info = (const struct tilemap_callback_info *)tilemap.user_data();
	uint16_t data = info->rambase[tile_index];
	int bank = info->bank[0];
	int color = (data >> 9) & 0x07;
	int code = data & 0x1ff;

	tileinfo.set(0, bank * info->banksize + code, color, 0);
	tileinfo.category = (data >> 15) & 1;'};
MERGE (n:KG {id: 'handler:segaic16_video_device.tilemap_16b_tile_info'}) SET n:Handler SET n += {method: 'tilemap_16b_tile_info', ownerClass: 'segaic16_video_device', sourceFile: 'src/mame/sega/segaic16.cpp', sourceLine: 1010, sourceColumn: 1, sourceEndLine: 1021, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'const struct tilemap_callback_info *info = (const struct tilemap_callback_info *)tilemap.user_data();
	uint16_t data = info->rambase[tile_index];
	int color = (data >> 6) & 0x7f;
	int code = data & 0x1fff;

	code = info->bank[code / info->banksize] * info->banksize + code % info->banksize;

	tileinfo.set(0, code, color, 0);
	tileinfo.category = (data >> 15) & 1;'};
MERGE (n:KG {id: 'handler:segaic16_video_device.tilemap_16b_latch_values'}) SET n:Handler SET n += {method: 'tilemap_16b_latch_values', ownerClass: 'segaic16_video_device', sourceFile: 'src/mame/sega/segaic16.cpp', sourceLine: 1168, sourceColumn: 1, sourceEndLine: 1182, sourceParameters: 'int param', sourceBody: 'struct tilemap_info *info = &m_bg_tilemap[param];
	uint16_t *textram = info->textram;
	int i;

	/* latch the scroll and page select values */
	for (i = 0; i < 4; i++)
	{
		m_pagelatch_cb(i, info->latched_pageselect, info->latched_yscroll, info->latched_xscroll, textram);
	}

	/* set a timer to do this again next frame */
	info->latch_timer->adjust(screen().time_until_pos(261), param);'};
MERGE (n:KG {id: 'handler:segaic16_video_device.tilemap_16b_alt_text_info'}) SET n:Handler SET n += {method: 'tilemap_16b_alt_text_info', ownerClass: 'segaic16_video_device', sourceFile: 'src/mame/sega/segaic16.cpp', sourceLine: 1051, sourceColumn: 1, sourceEndLine: 1061, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'const struct tilemap_callback_info *info = (const struct tilemap_callback_info *)tilemap.user_data();
	uint16_t data = info->rambase[tile_index];
	int bank = info->bank[0];
	int color = (data >> 8) & 0x07;
	int code = data & 0xff;

	tileinfo.set(0, bank * info->banksize + code, color, 0);
	tileinfo.category = (data >> 15) & 1;'};
MERGE (n:KG {id: 'handler:segaic16_video_device.tilemap_16b_alt_tile_info'}) SET n:Handler SET n += {method: 'tilemap_16b_alt_tile_info', ownerClass: 'segaic16_video_device', sourceFile: 'src/mame/sega/segaic16.cpp', sourceLine: 1037, sourceColumn: 1, sourceEndLine: 1048, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'const struct tilemap_callback_info *info = (const struct tilemap_callback_info *)tilemap.user_data();
	uint16_t data = info->rambase[tile_index];
	int color = (data >> 5) & 0x7f;
	int code = data & 0x1fff;

	code = info->bank[code / info->banksize] * info->banksize + code % info->banksize;

	tileinfo.set(0, code, color, 0);
	tileinfo.category = (data >> 15) & 1;'};
MERGE (n:KG {id: 'device:segas16a_state.system16a/maincpu'}) SET n:Device SET n += {type: 'M68000', tag: 'maincpu', clock: 10000000, config: ['M68000(config, m_maincpu, 10000000)', 'm_maincpu->set_addrmap(AS_PROGRAM, &segas16a_state::system16a_map)', 'm_maincpu->set_vblank_int("screen", FUNC(segas16a_state::irq4_line_hold))'], sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2259, sourceColumn: 2, sourceEndLine: 2259};
MERGE (n:KG {id: 'device:segas16a_state.system16a/maincpu/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'set_vblank_int', operation: 'set_vblank_int', raw: 'm_maincpu->set_vblank_int("screen", FUNC(segas16a_state::irq4_line_hold))', ownerTag: 'maincpu', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2261, sourceColumn: 2, sourceEndLine: 2261, targetTag: 'screen', targetClass: 'segas16a_state', targetMethod: 'irq4_line_hold'};
MERGE (n:KG {id: 'handler:segas16a_state.irq4_line_hold'}) SET n:Handler SET n += {method: 'irq4_line_hold', ownerClass: 'segas16a_state', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2342, sourceColumn: 2, sourceEndLine: 2342};
MERGE (n:KG {id: 'device:segas16a_state.system16a/soundcpu'}) SET n:Device SET n += {type: 'Z80', tag: 'soundcpu', clock: 4000000, config: ['Z80(config, m_soundcpu, 4000000)', 'm_soundcpu->set_addrmap(AS_PROGRAM, &segas16a_state::sound_map)', 'm_soundcpu->set_addrmap(AS_IO, &segas16a_state::sound_portmap)'], sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2263, sourceColumn: 2, sourceEndLine: 2263};
MERGE (n:KG {id: 'device:segas16a_state.system16a/upd7751'}) SET n:Device SET n += {type: 'UPD7751', tag: 'upd7751', clock: 6000000, config: ['UPD7751(config, m_upd7751, 6000000)', 'm_upd7751->bus_in_cb().set(FUNC(segas16a_state::upd7751_rom_r))', 'm_upd7751->t1_in_cb().set_constant(0)', 'm_upd7751->p1_out_cb().set("dac", FUNC(dac_byte_interface::data_w))', 'm_upd7751->p2_in_cb().set(FUNC(segas16a_state::upd7751_p2_r))', 'm_upd7751->p2_out_cb().set(FUNC(segas16a_state::upd7751_p2_w))', 'm_upd7751->prog_out_cb().set("upd7751_8243", FUNC(i8243_device::prog_w))'], sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2267, sourceColumn: 2, sourceEndLine: 2267};
MERGE (n:KG {id: 'device:segas16a_state.system16a/upd7751/callback:upd7751:0'}) SET n:Callback SET n += {signal: 'bus_in_cb', operation: 'set', raw: 'm_upd7751->bus_in_cb().set(FUNC(segas16a_state::upd7751_rom_r))', ownerTag: 'upd7751', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2268, sourceColumn: 2, sourceEndLine: 2268, targetClass: 'segas16a_state', targetMethod: 'upd7751_rom_r'};
MERGE (n:KG {id: 'handler:segas16a_state.upd7751_rom_r'}) SET n:Handler SET n += {method: 'upd7751_rom_r', ownerClass: 'segas16a_state', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 685, sourceColumn: 1, sourceEndLine: 689, sourceParameters: '', sourceBody: '// read from BUS
	return memregion("upd7751data")->base()[m_upd7751_rom_address];'};
MERGE (n:KG {id: 'device:segas16a_state.system16a/upd7751/callback:upd7751:1'}) SET n:Callback SET n += {signal: 'p1_out_cb', operation: 'set', raw: 'm_upd7751->p1_out_cb().set("dac", FUNC(dac_byte_interface::data_w))', ownerTag: 'upd7751', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2270, sourceColumn: 2, sourceEndLine: 2270, targetTag: 'dac', targetClass: 'dac_byte_interface', targetMethod: 'data_w'};
MERGE (n:KG {id: 'handler:dac_byte_interface.data_w'}) SET n:Handler SET n += {method: 'data_w', ownerClass: 'dac_byte_interface', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2270, sourceColumn: 2, sourceEndLine: 2270};
MERGE (n:KG {id: 'device:segas16a_state.system16a/upd7751/callback:upd7751:2'}) SET n:Callback SET n += {signal: 'p2_in_cb', operation: 'set', raw: 'm_upd7751->p2_in_cb().set(FUNC(segas16a_state::upd7751_p2_r))', ownerTag: 'upd7751', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2271, sourceColumn: 2, sourceEndLine: 2271, targetClass: 'segas16a_state', targetMethod: 'upd7751_p2_r'};
MERGE (n:KG {id: 'handler:segas16a_state.upd7751_p2_r'}) SET n:Handler SET n += {method: 'upd7751_p2_r', ownerClass: 'segas16a_state', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 696, sourceColumn: 1, sourceEndLine: 701, sourceParameters: '', sourceBody: '// read from P2 - 8255\'s PC0-2 connects to 7751\'s S0-2 (P24-P26 on an 8048)
	// bit 0x80 is an alternate way to control the sample on/off; doesn\'t appear to be used
	return 0x80 | ((m_upd7751_command & 0x07) << 4) | (m_upd7751_i8243->p2_r() & 0x0f);'};
MERGE (n:KG {id: 'device:segas16a_state.system16a/upd7751/callback:upd7751:3'}) SET n:Callback SET n += {signal: 'p2_out_cb', operation: 'set', raw: 'm_upd7751->p2_out_cb().set(FUNC(segas16a_state::upd7751_p2_w))', ownerTag: 'upd7751', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2272, sourceColumn: 2, sourceEndLine: 2272, targetClass: 'segas16a_state', targetMethod: 'upd7751_p2_w'};
MERGE (n:KG {id: 'handler:segas16a_state.upd7751_p2_w'}) SET n:Handler SET n += {method: 'upd7751_p2_w', ownerClass: 'segas16a_state', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 708, sourceColumn: 1, sourceEndLine: 715, sourceParameters: 'uint8_t data', sourceBody: '// write to P2; low 4 bits go to 8243
	m_upd7751_i8243->p2_w(data & 0x0f);

	// output of bit $80 indicates we are ready (1) or busy (0)
	// no other outputs are used'};
MERGE (n:KG {id: 'device:segas16a_state.system16a/upd7751/callback:upd7751:4'}) SET n:Callback SET n += {signal: 'prog_out_cb', operation: 'set', raw: 'm_upd7751->prog_out_cb().set("upd7751_8243", FUNC(i8243_device::prog_w))', ownerTag: 'upd7751', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2273, sourceColumn: 2, sourceEndLine: 2273, targetTag: 'upd7751_8243', targetClass: 'i8243_device', targetMethod: 'prog_w'};
MERGE (n:KG {id: 'handler:i8243_device.prog_w'}) SET n:Handler SET n += {method: 'prog_w', ownerClass: 'i8243_device', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2273, sourceColumn: 2, sourceEndLine: 2273};
MERGE (n:KG {id: 'device:segas16a_state.system16a/upd7751_8243'}) SET n:Device SET n += {type: 'I8243', tag: 'upd7751_8243', clock: null, config: ['I8243(config, m_upd7751_i8243)', 'm_upd7751_i8243->p4_out_cb().set(FUNC(segas16a_state::upd7751_rom_offset_w<0>))', 'm_upd7751_i8243->p5_out_cb().set(FUNC(segas16a_state::upd7751_rom_offset_w<4>))', 'm_upd7751_i8243->p6_out_cb().set(FUNC(segas16a_state::upd7751_rom_offset_w<8>))', 'm_upd7751_i8243->p7_out_cb().set(FUNC(segas16a_state::upd7751_rom_offset_w<12>))'], sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2275, sourceColumn: 2, sourceEndLine: 2275};
MERGE (n:KG {id: 'device:segas16a_state.system16a/upd7751_8243/callback:upd7751_8243:0'}) SET n:Callback SET n += {signal: 'p4_out_cb', operation: 'set', raw: 'm_upd7751_i8243->p4_out_cb().set(FUNC(segas16a_state::upd7751_rom_offset_w<0>))', ownerTag: 'upd7751_8243', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2276, sourceColumn: 2, sourceEndLine: 2276, targetClass: 'segas16a_state', targetMethod: 'upd7751_rom_offset_w_0'};
MERGE (n:KG {id: 'handler:segas16a_state.upd7751_rom_offset_w_0'}) SET n:Handler SET n += {method: 'upd7751_rom_offset_w_0', ownerClass: 'segas16a_state', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 664, sourceColumn: 1, sourceEndLine: 673, sourceConstants: ['Shift=0'], sourceParameters: 'uint8_t data', sourceBody: '// P4 - address lines 0-3
	// P5 - address lines 4-7
	// P6 - address lines 8-11
	// P7 - address lines 12-13
	int mask = (0xf << Shift) & 0x3fff;
	int newdata = (data << Shift) & mask;
	m_upd7751_rom_address = (m_upd7751_rom_address & ~mask) | newdata;'};
MERGE (n:KG {id: 'device:segas16a_state.system16a/upd7751_8243/callback:upd7751_8243:1'}) SET n:Callback SET n += {signal: 'p5_out_cb', operation: 'set', raw: 'm_upd7751_i8243->p5_out_cb().set(FUNC(segas16a_state::upd7751_rom_offset_w<4>))', ownerTag: 'upd7751_8243', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2277, sourceColumn: 2, sourceEndLine: 2277, targetClass: 'segas16a_state', targetMethod: 'upd7751_rom_offset_w_4'};
MERGE (n:KG {id: 'handler:segas16a_state.upd7751_rom_offset_w_4'}) SET n:Handler SET n += {method: 'upd7751_rom_offset_w_4', ownerClass: 'segas16a_state', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 664, sourceColumn: 1, sourceEndLine: 673, sourceConstants: ['Shift=4'], sourceParameters: 'uint8_t data', sourceBody: '// P4 - address lines 0-3
	// P5 - address lines 4-7
	// P6 - address lines 8-11
	// P7 - address lines 12-13
	int mask = (0xf << Shift) & 0x3fff;
	int newdata = (data << Shift) & mask;
	m_upd7751_rom_address = (m_upd7751_rom_address & ~mask) | newdata;'};
MERGE (n:KG {id: 'device:segas16a_state.system16a/upd7751_8243/callback:upd7751_8243:2'}) SET n:Callback SET n += {signal: 'p6_out_cb', operation: 'set', raw: 'm_upd7751_i8243->p6_out_cb().set(FUNC(segas16a_state::upd7751_rom_offset_w<8>))', ownerTag: 'upd7751_8243', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2278, sourceColumn: 2, sourceEndLine: 2278, targetClass: 'segas16a_state', targetMethod: 'upd7751_rom_offset_w_8'};
MERGE (n:KG {id: 'handler:segas16a_state.upd7751_rom_offset_w_8'}) SET n:Handler SET n += {method: 'upd7751_rom_offset_w_8', ownerClass: 'segas16a_state', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 664, sourceColumn: 1, sourceEndLine: 673, sourceConstants: ['Shift=8'], sourceParameters: 'uint8_t data', sourceBody: '// P4 - address lines 0-3
	// P5 - address lines 4-7
	// P6 - address lines 8-11
	// P7 - address lines 12-13
	int mask = (0xf << Shift) & 0x3fff;
	int newdata = (data << Shift) & mask;
	m_upd7751_rom_address = (m_upd7751_rom_address & ~mask) | newdata;'};
MERGE (n:KG {id: 'device:segas16a_state.system16a/upd7751_8243/callback:upd7751_8243:3'}) SET n:Callback SET n += {signal: 'p7_out_cb', operation: 'set', raw: 'm_upd7751_i8243->p7_out_cb().set(FUNC(segas16a_state::upd7751_rom_offset_w<12>))', ownerTag: 'upd7751_8243', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2279, sourceColumn: 2, sourceEndLine: 2279, targetClass: 'segas16a_state', targetMethod: 'upd7751_rom_offset_w_12'};
MERGE (n:KG {id: 'handler:segas16a_state.upd7751_rom_offset_w_12'}) SET n:Handler SET n += {method: 'upd7751_rom_offset_w_12', ownerClass: 'segas16a_state', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 664, sourceColumn: 1, sourceEndLine: 673, sourceConstants: ['Shift=12'], sourceParameters: 'uint8_t data', sourceBody: '// P4 - address lines 0-3
	// P5 - address lines 4-7
	// P6 - address lines 8-11
	// P7 - address lines 12-13
	int mask = (0xf << Shift) & 0x3fff;
	int newdata = (data << Shift) & mask;
	m_upd7751_rom_address = (m_upd7751_rom_address & ~mask) | newdata;'};
MERGE (n:KG {id: 'device:segas16a_state.system16a/nvram'}) SET n:Device SET n += {type: 'NVRAM', tag: 'nvram', clock: null, config: ['NVRAM(config, "nvram", nvram_device::DEFAULT_ALL_0)'], sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2281, sourceColumn: 2, sourceEndLine: 2281, clockExpr: 'nvram_device::DEFAULT_ALL_0'};
MERGE (n:KG {id: 'device:segas16a_state.system16a/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, m_watchdog)'], sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2283, sourceColumn: 2, sourceEndLine: 2283};
MERGE (n:KG {id: 'device:segas16a_state.system16a/i8255'}) SET n:Device SET n += {type: 'I8255', tag: 'i8255', clock: null, config: ['I8255(config, m_i8255)', 'm_i8255->out_pa_callback().set("soundlatch", FUNC(generic_latch_8_device::write))', 'm_i8255->out_pb_callback().set(FUNC(segas16a_state::misc_control_w))', 'm_i8255->out_pc_callback().set(FUNC(segas16a_state::tilemap_sound_w))', 'm_i8255->tri_pa_callback().set_constant(0)', 'm_i8255->tri_pb_callback().set_constant(0)', 'm_i8255->tri_pc_callback().set_constant(0)'], sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2285, sourceColumn: 2, sourceEndLine: 2285};
MERGE (n:KG {id: 'device:segas16a_state.system16a/i8255/callback:i8255:0'}) SET n:Callback SET n += {signal: 'out_pa_callback', operation: 'set', raw: 'm_i8255->out_pa_callback().set("soundlatch", FUNC(generic_latch_8_device::write))', ownerTag: 'i8255', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2286, sourceColumn: 2, sourceEndLine: 2286, targetTag: 'soundlatch', targetClass: 'generic_latch_8_device', targetMethod: 'write'};
MERGE (n:KG {id: 'handler:generic_latch_8_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2286, sourceColumn: 2, sourceEndLine: 2286};
MERGE (n:KG {id: 'device:segas16a_state.system16a/i8255/callback:i8255:1'}) SET n:Callback SET n += {signal: 'out_pb_callback', operation: 'set', raw: 'm_i8255->out_pb_callback().set(FUNC(segas16a_state::misc_control_w))', ownerTag: 'i8255', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2287, sourceColumn: 2, sourceEndLine: 2287, targetClass: 'segas16a_state', targetMethod: 'misc_control_w'};
MERGE (n:KG {id: 'handler:segas16a_state.misc_control_w'}) SET n:Handler SET n += {method: 'misc_control_w', ownerClass: 'segas16a_state', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 458, sourceColumn: 1, sourceEndLine: 495, sourceConstants: ['MCS51_INT1_LINE=1'], sourceParameters: 'uint8_t data', sourceBody: '//
	//  PPI port B
	//
	//  D7 : Screen flip (1= flip, 0= normal orientation)
	//  D6 : To 8751 pin 13 (/INT1)
	//  D5 : To 315-5149 pin 17.
	//  D4 : Screen enable (1= display, 0= blank)
	//  D3 : Lamp #2 (1= on, 0= off)
	//  D2 : Lamp #1 (1= on, 0= off)
	//  D1 : Coin meter #2
	//  D0 : Coin meter #1
	//

	// bits 2 & 3: control the lamps, allowing for overrides
	if (((m_video_control ^ data) & 0x0c) && !m_lamp_changed_w.isnull())
		m_lamp_changed_w(m_video_control ^ data, data);
	m_lamps[1] = BIT(data, 3);
	m_lamps[0] = BIT(data, 2);

	m_video_control = data;

	// bit 7: screen flip
	m_segaic16vid->tilemap_set_flip(0, data & 0x80);
	m_sprites->set_flip(data & 0x80);

	// bit 6: set 8751 interrupt line
	if (m_mcu != nullptr)
		m_mcu->set_input_line(MCS51_INT1_LINE, (data & 0x40) ? CLEAR_LINE : ASSERT_LINE);

	// bit 4: enable display
	m_segaic16vid->set_display_enable(data & 0x10);

	// bits 0 & 1: update coin counters
	machine().bookkeeping().coin_counter_w(1, data & 0x02);
	machine().bookkeeping().coin_counter_w(0, data & 0x01);'};
MERGE (n:KG {id: 'handler:segaic16_video_device.tilemap_set_flip'}) SET n:Handler SET n += {method: 'tilemap_set_flip', ownerClass: 'segaic16_video_device', sourceFile: 'src/mame/sega/segaic16.cpp', sourceLine: 1373, sourceColumn: 1, sourceEndLine: 1386, sourceParameters: 'int which, int flip', sourceBody: 'struct tilemap_info *info = &m_bg_tilemap[which];

	flip = (flip != 0);
	if (info->flip != flip)
	{
		screen().update_partial(screen().vpos());
		info->flip = flip;
		info->textmap->set_flip(flip ? (TILEMAP_FLIPX | TILEMAP_FLIPY) : 0);
		for (int pagenum = 0; pagenum < info->numpages; pagenum++)
			info->tilemaps[pagenum]->set_flip(flip ? (TILEMAP_FLIPX | TILEMAP_FLIPY) : 0);
	}'};
MERGE (n:KG {id: 'handler:sega_16bit_sprite_device.set_flip'}) SET n:Handler SET n += {method: 'set_flip', ownerClass: 'sega_16bit_sprite_device', sourceFile: 'src/mame/sega/sega16sp.h', sourceLine: 33, sourceColumn: 1, sourceEndLine: 33, sourceParameters: 'bool flip', sourceBody: 'm_flip = flip;'};
MERGE (n:KG {id: 'handler:segaic16_video_device.set_display_enable'}) SET n:Handler SET n += {method: 'set_display_enable', ownerClass: 'segaic16_video_device', sourceFile: 'src/mame/sega/segaic16.cpp', sourceLine: 563, sourceColumn: 1, sourceEndLine: 571, sourceParameters: 'int enable', sourceBody: 'enable = (enable != 0);
	if (m_display_enable != enable)
	{
		screen().update_partial(screen().vpos());
		m_display_enable = enable;
	}'};
MERGE (n:KG {id: 'device:segas16a_state.system16a/i8255/callback:i8255:2'}) SET n:Callback SET n += {signal: 'out_pc_callback', operation: 'set', raw: 'm_i8255->out_pc_callback().set(FUNC(segas16a_state::tilemap_sound_w))', ownerTag: 'i8255', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2288, sourceColumn: 2, sourceEndLine: 2288, targetClass: 'segas16a_state', targetMethod: 'tilemap_sound_w'};
MERGE (n:KG {id: 'handler:segas16a_state.tilemap_sound_w'}) SET n:Handler SET n += {method: 'tilemap_sound_w', ownerClass: 'segas16a_state', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 502, sourceColumn: 1, sourceEndLine: 521, sourceParameters: 'uint8_t data', sourceBody: '//
	//  PPI port C
	//
	//  D7 : Port A handshaking signal /OBF
	//  D6 : Port A handshaking signal ACK
	//  D5 : Port A handshaking signal IBF
	//  D4 : Port A handshaking signal /STB
	//  D3 : Port A handshaking signal INTR
	//  D2 : To PAL 315-5107 pin 9 (SCONT1)
	//  D1 : To PAL 315-5108 pin 19 (SCONT0)
	//  D0 : To MUTE input on MB3733 amplifier.
	//       0= Sound is disabled
	//       1= sound is enabled
	//
	m_soundcpu->set_input_line(INPUT_LINE_NMI, (data & 0x80) ? CLEAR_LINE : ASSERT_LINE);
	m_segaic16vid->tilemap_set_colscroll(0, ~data & 0x04);
	m_segaic16vid->tilemap_set_rowscroll(0, ~data & 0x02);'};
MERGE (n:KG {id: 'handler:segaic16_video_device.tilemap_set_colscroll'}) SET n:Handler SET n += {method: 'tilemap_set_colscroll', ownerClass: 'segaic16_video_device', sourceFile: 'src/mame/sega/segaic16.cpp', sourceLine: 1416, sourceColumn: 1, sourceEndLine: 1426, sourceParameters: 'int which, int enable', sourceBody: 'struct tilemap_info *info = &m_bg_tilemap[which];

	enable = (enable != 0);
	if (info->colscroll != enable)
	{
		screen().update_partial(screen().vpos());
		info->colscroll = enable;
	}'};
MERGE (n:KG {id: 'handler:segaic16_video_device.tilemap_set_rowscroll'}) SET n:Handler SET n += {method: 'tilemap_set_rowscroll', ownerClass: 'segaic16_video_device', sourceFile: 'src/mame/sega/segaic16.cpp', sourceLine: 1396, sourceColumn: 1, sourceEndLine: 1406, sourceParameters: 'int which, int enable', sourceBody: 'struct tilemap_info *info = &m_bg_tilemap[which];

	enable = (enable != 0);
	if (info->rowscroll != enable)
	{
		screen().update_partial(screen().vpos());
		info->rowscroll = enable;
	}'};
MERGE (n:KG {id: 'device:segas16a_state.system16a/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_refresh_hz(60)', 'm_screen->set_size(342, 262)', 'm_screen->set_visarea(0*8, 40*8-1, 0*8, 28*8-1)', 'm_screen->set_screen_update(FUNC(segas16a_state::screen_update))', 'm_screen->set_palette(m_palette)'], sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2294, sourceColumn: 2, sourceEndLine: 2294, configCalls: ['set_refresh_hz(60)', 'set_size(342,262)', 'set_visarea(0,319,0,223)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRefreshHz: 60, screenSize: [342, 262], screenVisarea: [0, 319, 0, 223]};
MERGE (n:KG {id: 'device:segas16a_state.system16a/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(segas16a_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2298, sourceColumn: 2, sourceEndLine: 2298, targetClass: 'segas16a_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:segas16a_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'segas16a_state', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 380, sourceColumn: 1, sourceEndLine: 446, sourceConstants: ['TILEMAP_FOREGROUND=0', 'TILEMAP_BACKGROUND=1', 'TILEMAP_TEXT=2'], sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: '// if no drawing is happening, fill with black and get out
	if (!m_segaic16vid->m_display_enable)
	{
		bitmap.fill(m_palette->black_pen(), cliprect);
		return 0;
	}

	// start the sprites drawing
	m_sprites->draw_async(cliprect);

	// reset priorities
	screen.priority().fill(0, cliprect);

	// draw background opaquely first, not setting any priorities
	m_segaic16vid->tilemap_draw( screen, bitmap, cliprect, 0, segaic16_video_device::TILEMAP_BACKGROUND, 0 | TILEMAP_DRAW_OPAQUE, 0x00);
	m_segaic16vid->tilemap_draw( screen, bitmap, cliprect, 0, segaic16_video_device::TILEMAP_BACKGROUND, 1 | TILEMAP_DRAW_OPAQUE, 0x00);

	// draw background again, just to set the priorities on non-transparent pixels
	m_segaic16vid->tilemap_draw( screen, bitmap, cliprect, 0, segaic16_video_device::TILEMAP_BACKGROUND, 0, 0x01);
	m_segaic16vid->tilemap_draw( screen, bitmap, cliprect, 0, segaic16_video_device::TILEMAP_BACKGROUND, 1, 0x02);

	// draw foreground
	m_segaic16vid->tilemap_draw( screen, bitmap, cliprect, 0, segaic16_video_device::TILEMAP_FOREGROUND, 0, 0x02);
	m_segaic16vid->tilemap_draw( screen, bitmap, cliprect, 0, segaic16_video_device::TILEMAP_FOREGROUND, 1, 0x04);

	// text layer
	m_segaic16vid->tilemap_draw( screen, bitmap, cliprect, 0, segaic16_video_device::TILEMAP_TEXT, 0, 0x04);
	m_segaic16vid->tilemap_draw( screen, bitmap, cliprect, 0, segaic16_video_device::TILEMAP_TEXT, 1, 0x08);

	// mix in sprites
	bitmap_ind16 &sprites = m_sprites->bitmap();
	m_sprites->iterate_dirty_rects(
			cliprect,
			[this, &screen, &bitmap, &sprites] (rectangle const &rect)
			{
				for (int y = rect.min_y; y <= rect.max_y; y++)
				{
					uint16_t *const dest = &bitmap.pix(y);
					uint16_t const *const src = &sprites.pix(y);
					uint8_t const *const pri = &screen.priority().pix(y);
					for (int x = rect.min_x; x <= rect.max_x; x++)
					{
						// only process written pixels
						uint16_t const pix = src[x];
						if (pix != 0xffff)
						{
							// compare sprite priority against tilemap priority
							int priority = pix >> 10;
							if ((1 << priority) > pri[x])
							{
								// if color bits are all 1, this triggers shadow/hilight
								if ((pix & 0x3f0) == 0x3f0)
									dest[x] += m_palette_entries;

								// otherwise, just add in sprite palette base
								else
									dest[x] = 0x400 | (pix & 0x3ff);
							}
						}
					}
				}
			});

	return 0;'};
MERGE (n:KG {id: 'handler:segaic16_video_device.tilemap_draw'}) SET n:Handler SET n += {method: 'tilemap_draw', ownerClass: 'segaic16_video_device', sourceFile: 'src/mame/sega/segaic16.cpp', sourceLine: 1316, sourceColumn: 1, sourceEndLine: 1327, sourceConstants: ['TILEMAP_TEXT=2'], sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect, int which, int map, int priority, int priority_mark', sourceBody: 'struct tilemap_info *info = &m_bg_tilemap[which];

	/* text layer is a special common case */
	if (map == TILEMAP_TEXT)
		info->textmap->draw(screen, bitmap, cliprect, priority, priority_mark);

	/* other layers are handled differently per-system */
	else
		(*info->draw_layer)(screen, info, bitmap, cliprect, map, priority, priority_mark);'};
MERGE (n:KG {id: 'device:segas16a_state.system16a/sprites'}) SET n:Device SET n += {type: 'SEGA_SYS16A_SPRITES', tag: 'sprites', clock: 0, config: ['SEGA_SYS16A_SPRITES(config, m_sprites)'], cls: 'sega_sys16a_sprite_device', clsHierarchy: ['sega_sys16a_sprite_device', 'sega_16bit_sprite_device'], sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2301, sourceColumn: 2, sourceEndLine: 2301};
MERGE (n:KG {id: 'device:segas16a_state.system16a/segaic16vid'}) SET n:Device SET n += {type: 'SEGAIC16VID', tag: 'segaic16vid', clock: null, config: ['SEGAIC16VID(config, m_segaic16vid, "gfxdecode")'], cls: 'segaic16_video_device', clsHierarchy: ['segaic16_video_device'], sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2302, sourceColumn: 2, sourceEndLine: 2302, clockExpr: '"gfxdecode"'};
MERGE (n:KG {id: 'device:segas16a_state.system16a/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, "gfxdecode", m_palette, gfx_segas16a)'], sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2304, sourceColumn: 2, sourceEndLine: 2304, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:segas16a_state.system16a/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette).set_entries(2048*2)'], sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2305, sourceColumn: 2, sourceEndLine: 2305};
MERGE (n:KG {id: 'device:segas16a_state.system16a/speaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speaker', clock: null, config: ['SPEAKER(config, "speaker").front_center()'], sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2308, sourceColumn: 2, sourceEndLine: 2308};
MERGE (n:KG {id: 'device:segas16a_state.system16a/soundlatch'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch', clock: null, config: ['GENERIC_LATCH_8(config, m_soundlatch)'], sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2310, sourceColumn: 2, sourceEndLine: 2310};
MERGE (n:KG {id: 'device:segas16a_state.system16a/ymsnd'}) SET n:Device SET n += {type: 'YM2151', tag: 'ymsnd', clock: 4000000, config: ['YM2151(config, m_ymsnd, 4000000)', 'm_ymsnd->port_write_handler().set(FUNC(segas16a_state::upd7751_control_w))', 'm_ymsnd->add_route(ALL_OUTPUTS, "speaker", 0.43)'], sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2312, sourceColumn: 2, sourceEndLine: 2312};
MERGE (n:KG {id: 'audioroute:device:segas16a_state.system16a/ymsnd/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.43, raw: 'm_ymsnd->add_route(ALL_OUTPUTS, "speaker", 0.43)', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2314, sourceColumn: 2, sourceEndLine: 2314};
MERGE (n:KG {id: 'device:segas16a_state.system16a/ymsnd/callback:ymsnd:0'}) SET n:Callback SET n += {signal: 'port_write_handler', operation: 'set', raw: 'm_ymsnd->port_write_handler().set(FUNC(segas16a_state::upd7751_control_w))', ownerTag: 'ymsnd', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2313, sourceColumn: 2, sourceEndLine: 2313, targetClass: 'segas16a_state', targetMethod: 'upd7751_control_w'};
MERGE (n:KG {id: 'handler:segas16a_state.upd7751_control_w'}) SET n:Handler SET n += {method: 'upd7751_control_w', ownerClass: 'segas16a_state', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 645, sourceColumn: 1, sourceEndLine: 656, sourceParameters: 'uint8_t data', sourceBody: '//
	//  YM2151 output port
	//
	//  D1 = /RESET line on 7751
	//  D0 = /IRQ line on 7751
	//
	m_upd7751->set_input_line(INPUT_LINE_RESET, (data & 0x01) ? CLEAR_LINE : ASSERT_LINE);
	m_upd7751->set_input_line(0, (data & 0x02) ? CLEAR_LINE : ASSERT_LINE);
	machine().scheduler().perfect_quantum(attotime::from_usec(100));'};
MERGE (n:KG {id: 'device:segas16a_state.system16a/dac'}) SET n:Device SET n += {type: 'DAC_8BIT_R2R', tag: 'dac', clock: 0, config: ['DAC_8BIT_R2R(config, "dac", 0).add_route(ALL_OUTPUTS, "speaker", 0.4)'], sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2316, sourceColumn: 2, sourceEndLine: 2316};
MERGE (n:KG {id: 'audioroute:device:segas16a_state.system16a/dac/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.4, raw: 'DAC_8BIT_R2R(config, "dac", 0).add_route(ALL_OUTPUTS, "speaker", 0.4)', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2316, sourceColumn: 2, sourceEndLine: 2316};
MERGE (n:KG {id: 'inputs:system16a_generic'}) SET n:InputPorts SET n += {name: 'system16a_generic', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1317, sourceColumn: 8, sourceEndLine: 1317};
MERGE (n:KG {id: 'inputs:system16a_generic/SERVICE'}) SET n:Port SET n += {tag: 'SERVICE', modify: false};
MERGE (n:KG {id: 'inputs:system16a_generic/SERVICE/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_COIN1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:system16a_generic/SERVICE/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_COIN2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:system16a_generic/SERVICE/f2'}) SET n:PortField SET n += {kind: 'service', mask: 4, activeLow: true, defaultValue: 4};
MERGE (n:KG {id: 'inputs:system16a_generic/SERVICE/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_SERVICE1', defaultValue: 8};
MERGE (n:KG {id: 'inputs:system16a_generic/SERVICE/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_START1', defaultValue: 16};
MERGE (n:KG {id: 'inputs:system16a_generic/SERVICE/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_START2', defaultValue: 32};
MERGE (n:KG {id: 'inputs:system16a_generic/SERVICE/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 64};
MERGE (n:KG {id: 'inputs:system16a_generic/SERVICE/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:system16a_generic/P1'}) SET n:Port SET n += {tag: 'P1', modify: false};
MERGE (n:KG {id: 'inputs:system16a_generic/P1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_BUTTON3', defaultValue: 1};
MERGE (n:KG {id: 'inputs:system16a_generic/P1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 2};
MERGE (n:KG {id: 'inputs:system16a_generic/P1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_BUTTON2', defaultValue: 4};
MERGE (n:KG {id: 'inputs:system16a_generic/P1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 8};
MERGE (n:KG {id: 'inputs:system16a_generic/P1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:system16a_generic/P1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:system16a_generic/P1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:system16a_generic/P1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:system16a_generic/UNUSED'}) SET n:Port SET n += {tag: 'UNUSED', modify: false};
MERGE (n:KG {id: 'inputs:system16a_generic/UNUSED/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: true, type: 'IPT_UNUSED', defaultValue: 255};
MERGE (n:KG {id: 'inputs:system16a_generic/P2'}) SET n:Port SET n += {tag: 'P2', modify: false};
MERGE (n:KG {id: 'inputs:system16a_generic/P2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_COCKTAIL'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:system16a_generic/P2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:system16a_generic/P2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_COCKTAIL'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:system16a_generic/P2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 8};
MERGE (n:KG {id: 'inputs:system16a_generic/P2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:system16a_generic/P2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:system16a_generic/P2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:system16a_generic/P2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:system16a_generic/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:system16a_generic/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 15, modifiers: ['PORT_DIPLOCATION(#SW1":1,2,3,4")'], name: 'Coin A', defaultValue: 15, location: '#SW1":1,2,3,4"', settings: ['7=4C 1C', '8=3C 1C', '9=2C 1C', '5=2 Coins/1 Credit, 5/3, 6/4', '4=2 Coins/1 Credit, 4/3', '15=1C 1C', '3=1 Coin/1 Credit, 5/6', '2=1 Coin/1 Credit, 4/5', '1=1 Coin/1 Credit, 2/3', '6=2C 3C', '14=1C 2C', '13=1C 3C', '12=1C 4C', '11=1C 5C', '10=1C 6C', '0=Free Play (if Coin B too) or 1/1']};
MERGE (n:KG {id: 'inputs:system16a_generic/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 240, modifiers: ['PORT_DIPLOCATION(#SW1":5,6,7,8")'], name: 'Coin B', defaultValue: 240, location: '#SW1":5,6,7,8"', settings: ['112=4C 1C', '128=3C 1C', '144=2C 1C', '80=2 Coins/1 Credit, 5/3, 6/4', '64=2 Coins/1 Credit, 4/3', '240=1C 1C', '48=1 Coin/1 Credit, 5/6', '32=1 Coin/1 Credit, 4/5', '16=1 Coin/1 Credit, 2/3', '96=2C 3C', '224=1C 2C', '208=1C 3C', '192=1C 4C', '176=1C 5C', '160=1C 6C', '0=Free Play (if Coin A too) or 1/1']};
MERGE (n:KG {id: 'inputs:system16a_generic/DSW2'}) SET n:Port SET n += {tag: 'DSW2', modify: false};
MERGE (n:KG {id: 'inputs:system16a_generic/DSW2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, name: 'Unused', defaultValue: 1};
MERGE (n:KG {id: 'inputs:system16a_generic/DSW2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, name: 'Unused', defaultValue: 2};
MERGE (n:KG {id: 'inputs:system16a_generic/DSW2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 4, name: 'Unused', defaultValue: 4};
MERGE (n:KG {id: 'inputs:system16a_generic/DSW2/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 8, name: 'Unused', defaultValue: 8};
MERGE (n:KG {id: 'inputs:system16a_generic/DSW2/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 16, name: 'Unused', defaultValue: 16};
MERGE (n:KG {id: 'inputs:system16a_generic/DSW2/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 32, name: 'Unused', defaultValue: 32};
MERGE (n:KG {id: 'inputs:system16a_generic/DSW2/f6'}) SET n:PortField SET n += {kind: 'dip', mask: 64, name: 'Unused', defaultValue: 64};
MERGE (n:KG {id: 'inputs:system16a_generic/DSW2/f7'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Unused', defaultValue: 128};
MERGE (n:KG {id: 'inputs:shinobi'}) SET n:InputPorts SET n += {name: 'shinobi', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1976, sourceColumn: 8, sourceEndLine: 1976};
MERGE (n:KG {id: 'inputs:shinobi/DSW2'}) SET n:Port SET n += {tag: 'DSW2', modify: true};
MERGE (n:KG {id: 'inputs:shinobi/DSW2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, modifiers: ['PORT_DIPLOCATION("SW2:1")'], name: 'Cabinet', defaultValue: 0, location: 'SW2:1', settings: ['0=Upright', '1=Cocktail']};
MERGE (n:KG {id: 'inputs:shinobi/DSW2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, modifiers: ['PORT_DIPLOCATION("SW2:2")'], name: 'Demo Sounds', defaultValue: 0, location: 'SW2:2', settings: ['2=Off', '0=On']};
MERGE (n:KG {id: 'inputs:shinobi/DSW2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 12, modifiers: ['PORT_DIPLOCATION("SW2:3,4")'], name: 'Lives', defaultValue: 12, location: 'SW2:3,4', settings: ['8=2', '12=3', '4=5', '0=Free Play']};
MERGE (n:KG {id: 'inputs:shinobi/DSW2/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 48, modifiers: ['PORT_DIPLOCATION("SW2:5,6")'], name: 'Difficulty', defaultValue: 48, location: 'SW2:5,6', settings: ['32=Easy', '48=Normal', '16=Hard', '0=Hardest']};
MERGE (n:KG {id: 'inputs:shinobi/DSW2/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 64, modifiers: ['PORT_DIPLOCATION("SW2:7")'], name: 'Enemy\'s Bullet Speed', defaultValue: 64, location: 'SW2:7', settings: ['64=Slow', '0=Fast']};
MERGE (n:KG {id: 'inputs:shinobi/DSW2/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("SW2:8")'], name: 'Language', defaultValue: 128, location: 'SW2:8', settings: ['128=Japanese', '0=English']};
MERGE (n:KG {id: 'gfxlayout:gfx_8x8x3_planar'}) SET n:GfxLayout SET n += {name: 'gfx_8x8x3_planar', width: 8, height: 8, total: 'RGN_FRAC(1,3)', planes: 3, planeOffsets: ['RGN_FRAC(2,3)', 'RGN_FRAC(1,3)', 'RGN_FRAC(0,3)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxdecode:gfx_segas16a'}) SET n:GfxDecode SET n += {name: 'gfx_segas16a', sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2246, sourceColumn: 8, sourceEndLine: 2246};
MERGE (n:KG {id: 'gfxdecode:gfx_segas16a/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'gfx_8x8x3_planar', colorBase: 0, colorCount: 1024, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:shinobi'}), (b:KG {id: 'file:src/mame/sega/segas16a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 4300, sourceColumn: 1, sourceEndLine: 4300};
MATCH (a:KG {id: 'game:shinobi'}), (b:KG {id: 'machine:segas16a_state.system16a'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:shinobi'}), (b:KG {id: 'inputs:shinobi'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:shinobi'}), (b:KG {id: 'romset:shinobi'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/segas16a.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/segas16a.cpp'}), (b:KG {id: 'file:fd1089.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/segas16a.cpp'}), (b:KG {id: 'file:fd1094.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/segas16a.cpp'}), (b:KG {id: 'file:sega16sp.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/segas16a.cpp'}), (b:KG {id: 'file:segaic16.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/segas16a.cpp'}), (b:KG {id: 'file:segaipt.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/segas16a.cpp'}), (b:KG {id: 'file:cpu/m68000/m68000.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/segas16a.cpp'}), (b:KG {id: 'file:cpu/mcs48/mcs48.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/segas16a.cpp'}), (b:KG {id: 'file:cpu/mcs51/i8051.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/segas16a.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/segas16a.cpp'}), (b:KG {id: 'file:machine/cxd1095.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/segas16a.cpp'}), (b:KG {id: 'file:machine/gen_latch.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/segas16a.cpp'}), (b:KG {id: 'file:machine/i8255.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/segas16a.cpp'}), (b:KG {id: 'file:machine/i8243.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/segas16a.cpp'}), (b:KG {id: 'file:machine/nvram.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/segas16a.cpp'}), (b:KG {id: 'file:machine/segacrp2_device.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/segas16a.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/segas16a.cpp'}), (b:KG {id: 'file:sound/dac.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/segas16a.cpp'}), (b:KG {id: 'file:sound/ymopm.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/segas16a.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/segas16a.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:segas16a_state.system16a'}), (b:KG {id: 'file:src/mame/sega/segas16a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2256, sourceColumn: 1, sourceEndLine: 2317};
MATCH (a:KG {id: 'machine:segas16a_state.system16a'}), (b:KG {id: 'handler:segas16a_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:segas16a_state.system16a'}), (b:KG {id: 'handler:segas16a_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:segas16a_state.system16a'}), (b:KG {id: 'device:segas16a_state.system16a/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:segas16a_state.system16a'}), (b:KG {id: 'device:segas16a_state.system16a/soundcpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:segas16a_state.system16a'}), (b:KG {id: 'device:segas16a_state.system16a/upd7751'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:segas16a_state.system16a'}), (b:KG {id: 'device:segas16a_state.system16a/upd7751_8243'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:segas16a_state.system16a'}), (b:KG {id: 'device:segas16a_state.system16a/nvram'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:segas16a_state.system16a'}), (b:KG {id: 'device:segas16a_state.system16a/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:segas16a_state.system16a'}), (b:KG {id: 'device:segas16a_state.system16a/i8255'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:segas16a_state.system16a'}), (b:KG {id: 'device:segas16a_state.system16a/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:segas16a_state.system16a'}), (b:KG {id: 'device:segas16a_state.system16a/sprites'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:segas16a_state.system16a'}), (b:KG {id: 'device:segas16a_state.system16a/segaic16vid'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:segas16a_state.system16a'}), (b:KG {id: 'device:segas16a_state.system16a/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:segas16a_state.system16a'}), (b:KG {id: 'gfxdecode:gfx_segas16a'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:segas16a_state.system16a'}), (b:KG {id: 'device:segas16a_state.system16a/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:segas16a_state.system16a'}), (b:KG {id: 'device:segas16a_state.system16a/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:segas16a_state.system16a'}), (b:KG {id: 'device:segas16a_state.system16a/soundlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:segas16a_state.system16a'}), (b:KG {id: 'device:segas16a_state.system16a/ymsnd'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:segas16a_state.system16a'}), (b:KG {id: 'device:segas16a_state.system16a/dac'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:shinobi'}), (b:KG {id: 'file:src/mame/sega/segas16a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1976, sourceColumn: 8, sourceEndLine: 1976};
MATCH (a:KG {id: 'inputs:shinobi'}), (b:KG {id: 'inputs:system16a_generic'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:shinobi'}), (b:KG {id: 'inputs:shinobi/DSW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:shinobi'}), (b:KG {id: 'file:src/mame/sega/segas16a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 3529, sourceColumn: 1, sourceEndLine: 3529};
MATCH (a:KG {id: 'romset:shinobi'}), (b:KG {id: 'region:shinobi/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:shinobi'}), (b:KG {id: 'region:shinobi/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:shinobi'}), (b:KG {id: 'region:shinobi/sprites'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:shinobi'}), (b:KG {id: 'region:shinobi/soundcpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:shinobi'}), (b:KG {id: 'region:shinobi/upd7751'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:shinobi'}), (b:KG {id: 'region:shinobi/upd7751data'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:segas16a_state.video_start'}), (b:KG {id: 'handler:segaic16_video_device.tilemap_init'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/maincpu'}), (b:KG {id: 'device:segas16a_state.system16a/maincpu/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/maincpu'}), (b:KG {id: 'map:segas16a_state.system16a_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:segas16a_state.system16a/soundcpu'}), (b:KG {id: 'map:segas16a_state.sound_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:segas16a_state.system16a/soundcpu'}), (b:KG {id: 'map:segas16a_state.sound_portmap'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:segas16a_state.system16a/upd7751'}), (b:KG {id: 'device:segas16a_state.system16a/upd7751/callback:upd7751:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/upd7751'}), (b:KG {id: 'device:segas16a_state.system16a/upd7751/callback:upd7751:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/upd7751'}), (b:KG {id: 'device:segas16a_state.system16a/upd7751/callback:upd7751:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/upd7751'}), (b:KG {id: 'device:segas16a_state.system16a/upd7751/callback:upd7751:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/upd7751'}), (b:KG {id: 'device:segas16a_state.system16a/upd7751/callback:upd7751:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/upd7751_8243'}), (b:KG {id: 'device:segas16a_state.system16a/upd7751_8243/callback:upd7751_8243:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/upd7751_8243'}), (b:KG {id: 'device:segas16a_state.system16a/upd7751_8243/callback:upd7751_8243:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/upd7751_8243'}), (b:KG {id: 'device:segas16a_state.system16a/upd7751_8243/callback:upd7751_8243:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/upd7751_8243'}), (b:KG {id: 'device:segas16a_state.system16a/upd7751_8243/callback:upd7751_8243:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/i8255'}), (b:KG {id: 'device:segas16a_state.system16a/i8255/callback:i8255:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/i8255'}), (b:KG {id: 'device:segas16a_state.system16a/i8255/callback:i8255:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/i8255'}), (b:KG {id: 'device:segas16a_state.system16a/i8255/callback:i8255:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/screen'}), (b:KG {id: 'device:segas16a_state.system16a/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_segas16a'}), (b:KG {id: 'file:src/mame/sega/segas16a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 2246, sourceColumn: 8, sourceEndLine: 2246};
MATCH (a:KG {id: 'gfxdecode:gfx_segas16a'}), (b:KG {id: 'gfxdecode:gfx_segas16a/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/ymsnd'}), (b:KG {id: 'audioroute:device:segas16a_state.system16a/ymsnd/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/ymsnd'}), (b:KG {id: 'device:segas16a_state.system16a/ymsnd/callback:ymsnd:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/dac'}), (b:KG {id: 'audioroute:device:segas16a_state.system16a/dac/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic'}), (b:KG {id: 'file:src/mame/sega/segas16a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1317, sourceColumn: 8, sourceEndLine: 1317};
MATCH (a:KG {id: 'inputs:system16a_generic'}), (b:KG {id: 'inputs:system16a_generic/SERVICE'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic'}), (b:KG {id: 'inputs:system16a_generic/P1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic'}), (b:KG {id: 'inputs:system16a_generic/UNUSED'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic'}), (b:KG {id: 'inputs:system16a_generic/P2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic'}), (b:KG {id: 'inputs:system16a_generic/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic'}), (b:KG {id: 'inputs:system16a_generic/DSW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:shinobi/DSW2'}), (b:KG {id: 'inputs:shinobi/DSW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:shinobi/DSW2'}), (b:KG {id: 'inputs:shinobi/DSW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:shinobi/DSW2'}), (b:KG {id: 'inputs:shinobi/DSW2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:shinobi/DSW2'}), (b:KG {id: 'inputs:shinobi/DSW2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:shinobi/DSW2'}), (b:KG {id: 'inputs:shinobi/DSW2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:shinobi/DSW2'}), (b:KG {id: 'inputs:shinobi/DSW2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:shinobi/maincpu'}), (b:KG {id: 'rom:shinobi/maincpu/epr-12010.43'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:shinobi/maincpu'}), (b:KG {id: 'rom:shinobi/maincpu/epr-12008.26'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:shinobi/maincpu'}), (b:KG {id: 'rom:shinobi/maincpu/epr-12011.42'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:shinobi/maincpu'}), (b:KG {id: 'rom:shinobi/maincpu/epr-12009.25'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:shinobi/gfx1'}), (b:KG {id: 'rom:shinobi/gfx1/epr-11264.95'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:shinobi/gfx1'}), (b:KG {id: 'rom:shinobi/gfx1/epr-11265.94'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:shinobi/gfx1'}), (b:KG {id: 'rom:shinobi/gfx1/epr-11266.93'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:shinobi/sprites'}), (b:KG {id: 'rom:shinobi/sprites/epr-11290.10'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:shinobi/sprites'}), (b:KG {id: 'rom:shinobi/sprites/epr-11294.11'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:shinobi/sprites'}), (b:KG {id: 'rom:shinobi/sprites/epr-11291.17'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:shinobi/sprites'}), (b:KG {id: 'rom:shinobi/sprites/epr-11295.18'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:shinobi/sprites'}), (b:KG {id: 'rom:shinobi/sprites/epr-11292.23'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:shinobi/sprites'}), (b:KG {id: 'rom:shinobi/sprites/epr-11296.24'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:shinobi/sprites'}), (b:KG {id: 'rom:shinobi/sprites/epr-11293.29'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:shinobi/sprites'}), (b:KG {id: 'rom:shinobi/sprites/epr-11297.30'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:shinobi/soundcpu'}), (b:KG {id: 'rom:shinobi/soundcpu/epr-11267.12'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:shinobi/upd7751'}), (b:KG {id: 'rom:shinobi/upd7751/7751.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:shinobi/upd7751data'}), (b:KG {id: 'rom:shinobi/upd7751data/epr-11268.1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'handler:segaic16_video_device.tilemap_init'}), (b:KG {id: 'handler:segaic16_video_device.tilemap_16a_text_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:segaic16_video_device.tilemap_init'}), (b:KG {id: 'handler:segaic16_video_device.tilemap_16a_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:segaic16_video_device.tilemap_init'}), (b:KG {id: 'handler:segaic16_video_device.tilemap_16b_text_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:segaic16_video_device.tilemap_init'}), (b:KG {id: 'handler:segaic16_video_device.tilemap_16b_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:segaic16_video_device.tilemap_init'}), (b:KG {id: 'handler:segaic16_video_device.tilemap_16b_latch_values'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:segaic16_video_device.tilemap_init'}), (b:KG {id: 'handler:segaic16_video_device.tilemap_16b_alt_text_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:segaic16_video_device.tilemap_init'}), (b:KG {id: 'handler:segaic16_video_device.tilemap_16b_alt_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/maincpu/callback:maincpu:0'}), (b:KG {id: 'handler:segas16a_state.irq4_line_hold'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:segas16a_state.system16a_map'}), (b:KG {id: 'file:src/mame/sega/segas16a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1245, sourceColumn: 1, sourceEndLine: 1256};
MATCH (a:KG {id: 'map:segas16a_state.system16a_map'}), (b:KG {id: 'map:segas16a_state.system16a_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:segas16a_state.system16a_map'}), (b:KG {id: 'map:segas16a_state.system16a_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:segas16a_state.system16a_map'}), (b:KG {id: 'map:segas16a_state.system16a_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:segas16a_state.system16a_map'}), (b:KG {id: 'map:segas16a_state.system16a_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:segas16a_state.system16a_map'}), (b:KG {id: 'map:segas16a_state.system16a_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:segas16a_state.system16a_map'}), (b:KG {id: 'map:segas16a_state.system16a_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:segas16a_state.system16a_map'}), (b:KG {id: 'map:segas16a_state.system16a_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:segas16a_state.system16a_map'}), (b:KG {id: 'map:segas16a_state.system16a_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:segas16a_state.sound_map'}), (b:KG {id: 'file:src/mame/sega/segas16a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1269, sourceColumn: 1, sourceEndLine: 1275};
MATCH (a:KG {id: 'map:segas16a_state.sound_map'}), (b:KG {id: 'map:segas16a_state.sound_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:segas16a_state.sound_map'}), (b:KG {id: 'map:segas16a_state.sound_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:segas16a_state.sound_map'}), (b:KG {id: 'map:segas16a_state.sound_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:segas16a_state.sound_portmap'}), (b:KG {id: 'file:src/mame/sega/segas16a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/segas16a.cpp', sourceLine: 1282, sourceColumn: 1, sourceEndLine: 1289};
MATCH (a:KG {id: 'map:segas16a_state.sound_portmap'}), (b:KG {id: 'map:segas16a_state.sound_portmap/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:segas16a_state.sound_portmap'}), (b:KG {id: 'map:segas16a_state.sound_portmap/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:segas16a_state.sound_portmap'}), (b:KG {id: 'map:segas16a_state.sound_portmap/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/upd7751/callback:upd7751:0'}), (b:KG {id: 'handler:segas16a_state.upd7751_rom_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/upd7751/callback:upd7751:1'}), (b:KG {id: 'handler:dac_byte_interface.data_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/upd7751/callback:upd7751:2'}), (b:KG {id: 'handler:segas16a_state.upd7751_p2_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/upd7751/callback:upd7751:3'}), (b:KG {id: 'handler:segas16a_state.upd7751_p2_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/upd7751/callback:upd7751:4'}), (b:KG {id: 'handler:i8243_device.prog_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/upd7751_8243/callback:upd7751_8243:0'}), (b:KG {id: 'handler:segas16a_state.upd7751_rom_offset_w_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/upd7751_8243/callback:upd7751_8243:1'}), (b:KG {id: 'handler:segas16a_state.upd7751_rom_offset_w_4'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/upd7751_8243/callback:upd7751_8243:2'}), (b:KG {id: 'handler:segas16a_state.upd7751_rom_offset_w_8'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/upd7751_8243/callback:upd7751_8243:3'}), (b:KG {id: 'handler:segas16a_state.upd7751_rom_offset_w_12'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/i8255/callback:i8255:0'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/i8255/callback:i8255:1'}), (b:KG {id: 'handler:segas16a_state.misc_control_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/i8255/callback:i8255:2'}), (b:KG {id: 'handler:segas16a_state.tilemap_sound_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/screen/callback:screen:0'}), (b:KG {id: 'handler:segas16a_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_segas16a/e0'}), (b:KG {id: 'gfxlayout:gfx_8x8x3_planar'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:segas16a_state.system16a/ymsnd/callback:ymsnd:0'}), (b:KG {id: 'handler:segas16a_state.upd7751_control_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/SERVICE'}), (b:KG {id: 'inputs:system16a_generic/SERVICE/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/SERVICE'}), (b:KG {id: 'inputs:system16a_generic/SERVICE/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/SERVICE'}), (b:KG {id: 'inputs:system16a_generic/SERVICE/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/SERVICE'}), (b:KG {id: 'inputs:system16a_generic/SERVICE/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/SERVICE'}), (b:KG {id: 'inputs:system16a_generic/SERVICE/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/SERVICE'}), (b:KG {id: 'inputs:system16a_generic/SERVICE/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/SERVICE'}), (b:KG {id: 'inputs:system16a_generic/SERVICE/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/SERVICE'}), (b:KG {id: 'inputs:system16a_generic/SERVICE/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/P1'}), (b:KG {id: 'inputs:system16a_generic/P1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/P1'}), (b:KG {id: 'inputs:system16a_generic/P1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/P1'}), (b:KG {id: 'inputs:system16a_generic/P1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/P1'}), (b:KG {id: 'inputs:system16a_generic/P1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/P1'}), (b:KG {id: 'inputs:system16a_generic/P1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/P1'}), (b:KG {id: 'inputs:system16a_generic/P1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/P1'}), (b:KG {id: 'inputs:system16a_generic/P1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/P1'}), (b:KG {id: 'inputs:system16a_generic/P1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/UNUSED'}), (b:KG {id: 'inputs:system16a_generic/UNUSED/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/P2'}), (b:KG {id: 'inputs:system16a_generic/P2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/P2'}), (b:KG {id: 'inputs:system16a_generic/P2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/P2'}), (b:KG {id: 'inputs:system16a_generic/P2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/P2'}), (b:KG {id: 'inputs:system16a_generic/P2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/P2'}), (b:KG {id: 'inputs:system16a_generic/P2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/P2'}), (b:KG {id: 'inputs:system16a_generic/P2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/P2'}), (b:KG {id: 'inputs:system16a_generic/P2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/P2'}), (b:KG {id: 'inputs:system16a_generic/P2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/DSW1'}), (b:KG {id: 'inputs:system16a_generic/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/DSW1'}), (b:KG {id: 'inputs:system16a_generic/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/DSW2'}), (b:KG {id: 'inputs:system16a_generic/DSW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/DSW2'}), (b:KG {id: 'inputs:system16a_generic/DSW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/DSW2'}), (b:KG {id: 'inputs:system16a_generic/DSW2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/DSW2'}), (b:KG {id: 'inputs:system16a_generic/DSW2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/DSW2'}), (b:KG {id: 'inputs:system16a_generic/DSW2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/DSW2'}), (b:KG {id: 'inputs:system16a_generic/DSW2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/DSW2'}), (b:KG {id: 'inputs:system16a_generic/DSW2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system16a_generic/DSW2'}), (b:KG {id: 'inputs:system16a_generic/DSW2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'map:segas16a_state.system16a_map/range1'}), (b:KG {id: 'handler:segaic16_video_device.tileram_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'segaic16vid'};
MATCH (a:KG {id: 'map:segas16a_state.system16a_map/range1'}), (b:KG {id: 'handler:segaic16_video_device.tileram_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'segaic16vid'};
MATCH (a:KG {id: 'map:segas16a_state.system16a_map/range2'}), (b:KG {id: 'handler:segaic16_video_device.textram_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'segaic16vid'};
MATCH (a:KG {id: 'map:segas16a_state.system16a_map/range2'}), (b:KG {id: 'handler:segaic16_video_device.textram_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'segaic16vid'};
MATCH (a:KG {id: 'map:segas16a_state.system16a_map/range4'}), (b:KG {id: 'handler:segas16a_state.paletteram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:segas16a_state.system16a_map/range5'}), (b:KG {id: 'handler:segas16a_state.misc_io_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:segas16a_state.system16a_map/range5'}), (b:KG {id: 'handler:segas16a_state.misc_io_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:segas16a_state.system16a_map/range6'}), (b:KG {id: 'handler:watchdog_timer_device.reset16_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:segas16a_state.sound_map/range1'}), (b:KG {id: 'handler:segas16a_state.sound_data_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:segas16a_state.sound_portmap/range0'}), (b:KG {id: 'handler:ym2151_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ymsnd'};
MATCH (a:KG {id: 'map:segas16a_state.sound_portmap/range0'}), (b:KG {id: 'handler:ym2151_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ymsnd'};
MATCH (a:KG {id: 'map:segas16a_state.sound_portmap/range1'}), (b:KG {id: 'handler:segas16a_state.upd7751_command_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:segas16a_state.sound_portmap/range2'}), (b:KG {id: 'handler:segas16a_state.sound_data_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'handler:segas16a_state.misc_control_w'}), (b:KG {id: 'handler:segaic16_video_device.tilemap_set_flip'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:segas16a_state.misc_control_w'}), (b:KG {id: 'handler:sega_16bit_sprite_device.set_flip'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:segas16a_state.misc_control_w'}), (b:KG {id: 'handler:segaic16_video_device.set_display_enable'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:segas16a_state.tilemap_sound_w'}), (b:KG {id: 'handler:segaic16_video_device.tilemap_set_colscroll'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:segas16a_state.tilemap_sound_w'}), (b:KG {id: 'handler:segaic16_video_device.tilemap_set_rowscroll'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:segas16a_state.screen_update'}), (b:KG {id: 'handler:segaic16_video_device.tilemap_draw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:gfx_8x8x3_planar'}), (b:KG {id: 'file:src/mame/sega/segas16a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
