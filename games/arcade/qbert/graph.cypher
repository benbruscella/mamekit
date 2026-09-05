// mamekit knowledge graph — driver src/mame/gottlieb/gottlieb.cpp
// generated 2026-09-05T03:50:26.366Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/gottlieb/gottlieb.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:gottlieb_a.h'}) SET n:SourceFile SET n += {path: 'gottlieb_a.h', external: true};
MERGE (n:KG {id: 'file:cpu/i86/i86.h'}) SET n:SourceFile SET n += {path: 'cpu/i86/i86.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6502/m6502.h'}) SET n:SourceFile SET n += {path: 'cpu/m6502/m6502.h', external: true};
MERGE (n:KG {id: 'file:machine/ldpr8210.h'}) SET n:SourceFile SET n += {path: 'machine/ldpr8210.h', external: true};
MERGE (n:KG {id: 'file:machine/nvram.h'}) SET n:SourceFile SET n += {path: 'machine/nvram.h', external: true};
MERGE (n:KG {id: 'file:machine/rescap.h'}) SET n:SourceFile SET n += {path: 'machine/rescap.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:sound/dac.h'}) SET n:SourceFile SET n += {path: 'sound/dac.h', external: true};
MERGE (n:KG {id: 'file:sound/samples.h'}) SET n:SourceFile SET n += {path: 'sound/samples.h', external: true};
MERGE (n:KG {id: 'file:video/resnet.h'}) SET n:SourceFile SET n += {path: 'video/resnet.h', external: true};
MERGE (n:KG {id: 'file:emupal.h'}) SET n:SourceFile SET n += {path: 'emupal.h', external: true};
MERGE (n:KG {id: 'file:input.h'}) SET n:SourceFile SET n += {path: 'input.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:tilemap.h'}) SET n:SourceFile SET n += {path: 'tilemap.h', external: true};
MERGE (n:KG {id: 'file:src/mame/shared/gottlieb_a.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/shared/gottlieb_a.cpp'};
MERGE (n:KG {id: 'file:machine/input_merger.h'}) SET n:SourceFile SET n += {path: 'machine/input_merger.h', external: true};
MERGE (n:KG {id: 'game:qbert'}) SET n:Game SET n += {name: 'qbert', year: '1982', company: 'Gottlieb', fullname: 'Q*bert (US set 1)', monitor: 'ROT270', cls: 'gottlieb_state', init: 'init_qbert', flags: 'MACHINE_IMPERFECT_SOUND | MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 3063, sourceColumn: 1, sourceEndLine: 3063, installedHandlers: ['{"space":"AS_PROGRAM","kind":"write","start":22531,"end":22531,"mirror":2040,"className":"gottlieb_state","method":"qbert_output_w"}']};
MERGE (n:KG {id: 'handler:gottlieb_state.qbert_output_w'}) SET n:Handler SET n += {method: 'qbert_output_w', ownerClass: 'gottlieb_state', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 747, sourceColumn: 1, sourceEndLine: 753, sourceParameters: 'u8 data', sourceBody: 'general_output_w(data & ~0x20);

	// bit 5 controls the knocker
	qbert_knocker(BIT(data, 5));'};
MERGE (n:KG {id: 'handler:gottlieb_state.general_output_w'}) SET n:Handler SET n += {method: 'general_output_w', ownerClass: 'gottlieb_state', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 711, sourceColumn: 1, sourceEndLine: 722, sourceParameters: 'u8 data', sourceBody: '// bits 0-3 control video features, and are different for laserdisc games
	video_control_w(data);

	// bit 4 normally controls the coin meter
	machine().bookkeeping().coin_counter_w(0, BIT(data, 4));

	// bit 5 doesn\'t have a generic function
	// bit 6 controls "COIN1"; it appears that no games used this
	// bit 7 controls the optional coin lockout; it appears that no games used this'};
MERGE (n:KG {id: 'handler:gottlieb_state.video_control_w'}) SET n:Handler SET n += {method: 'video_control_w', ownerClass: 'gottlieb_state', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 538, sourceColumn: 1, sourceEndLine: 550, sourceParameters: 'u8 data', sourceBody: '// bit 0 controls foreground/background priority
	if (m_background_priority != (BIT(data, 0)))
		m_screen->update_partial(m_screen->vpos());
	m_background_priority = BIT(data, 0);

	// bit 1 controls horizontal flip screen
	flip_screen_x_set(BIT(data, 1));

	// bit 2 controls vertical flip screen
	flip_screen_y_set(BIT(data, 2));'};
MERGE (n:KG {id: 'handler:gottlieb_state.qbert_knocker'}) SET n:Handler SET n += {method: 'qbert_knocker', ownerClass: 'gottlieb_state', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1083, sourceColumn: 1, sourceEndLine: 1091, sourceParameters: 'u8 knock', sourceBody: 'm_knockers[0] = knock ? 1 : 0;

	// start sound on rising edge
	if (knock & ~m_knocker_prev)
		m_knocker_sample->start(0, 0);
	m_knocker_prev = knock;'};
MERGE (n:KG {id: 'romset:qbert'}) SET n:RomSet SET n += {name: 'qbert', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2333, sourceColumn: 1, sourceEndLine: 2333};
MERGE (n:KG {id: 'region:qbert/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2308, sourceColumn: 2, sourceEndLine: 2308};
MERGE (n:KG {id: 'rom:qbert/maincpu/qb-rom2.bin'}) SET n:Rom SET n += {file: 'qb-rom2.bin', offset: 40960, size: 8192, crc: 'fe434526', sha1: '4cfc5d52dd6c82163e035af82d6112c0c93a3797', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2335, sourceColumn: 2, sourceEndLine: 2335};
MERGE (n:KG {id: 'rom:qbert/maincpu/qb-rom1.bin'}) SET n:Rom SET n += {file: 'qb-rom1.bin', offset: 49152, size: 8192, crc: '55635447', sha1: 'ca6acdef1c9e06b33efe1f0a2df2dfb03723cfbe', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2336, sourceColumn: 2, sourceEndLine: 2336};
MERGE (n:KG {id: 'rom:qbert/maincpu/qb-rom0.bin'}) SET n:Rom SET n += {file: 'qb-rom0.bin', offset: 57344, size: 8192, crc: '8e318641', sha1: '7f8f66d1e6a7905e93cce07fc92e8801370b7194', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2337, sourceColumn: 2, sourceEndLine: 2337};
MERGE (n:KG {id: 'region:qbert/r1sound:audiocpu'}) SET n:RomRegion SET n += {tag: 'r1sound:audiocpu', size: 65536, flags: '0', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2318, sourceColumn: 2, sourceEndLine: 2318};
MERGE (n:KG {id: 'rom:qbert/r1sound:audiocpu/qb-snd1.bin'}) SET n:Rom SET n += {file: 'qb-snd1.bin', offset: 28672, size: 2048, crc: '15787c07', sha1: '8b7d03fbf2ebaa71b3a7e2f636a0d1bb9b796e43', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2340, sourceColumn: 2, sourceEndLine: 2340};
MERGE (n:KG {id: 'rom:qbert/r1sound:audiocpu/qb-snd2.bin'}) SET n:Rom SET n += {file: 'qb-snd2.bin', offset: 30720, size: 2048, crc: '58437508', sha1: '09d8053e7e99679b602dcda230d64db7fe6cb7f5', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2341, sourceColumn: 2, sourceEndLine: 2341};
MERGE (n:KG {id: 'region:qbert/bgtiles'}) SET n:RomRegion SET n += {tag: 'bgtiles', size: 8192, flags: '0', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2322, sourceColumn: 2, sourceEndLine: 2322};
MERGE (n:KG {id: 'rom:qbert/bgtiles/qb-bg0.bin'}) SET n:Rom SET n += {file: 'qb-bg0.bin', offset: 0, size: 4096, crc: '7a9ba824', sha1: '12aa6df499eb6996ee35f56acac403ff6290f844', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2345, sourceColumn: 2, sourceEndLine: 2345};
MERGE (n:KG {id: 'rom:qbert/bgtiles/qb-bg1.bin'}) SET n:Rom SET n += {file: 'qb-bg1.bin', offset: 4096, size: 4096, crc: '22e5b891', sha1: '5bb67e333255c0ea679ab4312256a8a71a950db8', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2346, sourceColumn: 2, sourceEndLine: 2346};
MERGE (n:KG {id: 'region:qbert/sprites'}) SET n:RomRegion SET n += {tag: 'sprites', size: 32768, flags: '0', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2325, sourceColumn: 2, sourceEndLine: 2325};
MERGE (n:KG {id: 'rom:qbert/sprites/qb-fg3.bin'}) SET n:Rom SET n += {file: 'qb-fg3.bin', offset: 0, size: 8192, crc: 'dd436d3a', sha1: 'ae16087a6ceec84551b5d7aae4036e0ed432cbb7', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2349, sourceColumn: 2, sourceEndLine: 2349};
MERGE (n:KG {id: 'rom:qbert/sprites/qb-fg2.bin'}) SET n:Rom SET n += {file: 'qb-fg2.bin', offset: 8192, size: 8192, crc: 'f69b9483', sha1: '06894a1474c79c1274efbd32d7371179e7e0a661', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2350, sourceColumn: 2, sourceEndLine: 2350};
MERGE (n:KG {id: 'rom:qbert/sprites/qb-fg1.bin'}) SET n:Rom SET n += {file: 'qb-fg1.bin', offset: 16384, size: 8192, crc: '224e8356', sha1: 'f7f26b879aa8b964ff6311136ed8157e44de736c', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2351, sourceColumn: 2, sourceEndLine: 2351};
MERGE (n:KG {id: 'rom:qbert/sprites/qb-fg0.bin'}) SET n:Rom SET n += {file: 'qb-fg0.bin', offset: 24576, size: 8192, crc: '2f695b85', sha1: '807d16459838f129e10b913890bbc95065d5dd40', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2352, sourceColumn: 2, sourceEndLine: 2352};
MERGE (n:KG {id: 'handler:gottlieb_state.videoram_w'}) SET n:Handler SET n += {method: 'videoram_w', ownerClass: 'gottlieb_state', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 579, sourceColumn: 1, sourceEndLine: 583, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'm_videoram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'handler:gottlieb_state.charram_w'}) SET n:Handler SET n += {method: 'charram_w', ownerClass: 'gottlieb_state', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 586, sourceColumn: 1, sourceEndLine: 593, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'if (m_charram[offset] != data)
	{
		m_charram[offset] = data;
		m_gfxdecode->gfx(0)->mark_dirty(offset / 32);
	}'};
MERGE (n:KG {id: 'handler:gottlieb_state.palette_w'}) SET n:Handler SET n += {method: 'palette_w', ownerClass: 'gottlieb_state', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 512, sourceColumn: 1, sourceEndLine: 528, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'm_paletteram[offset] = data;

	// blue & green are encoded in the even bytes
	int val = m_paletteram[offset & ~1];
	int const g = combine_weights(m_weights, BIT(val, 4), BIT(val, 5), BIT(val, 6), BIT(val, 7));
	int const b = combine_weights(m_weights, BIT(val, 0), BIT(val, 1), BIT(val, 2), BIT(val, 3));

	// red is encoded in the odd bytes
	val = m_paletteram[offset | 1];
	int const r = combine_weights(m_weights, BIT(val, 0), BIT(val, 1), BIT(val, 2), BIT(val, 3));

	// alpha is set to 0 if laserdisc video is enabled
	int const a = (m_transparent0 && offset / 2 == 0) ? 0 : 255;
	m_palette->set_pen_color(offset / 2, rgb_t(a, r, g, b));'};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1156, sourceColumn: 2, sourceEndLine: 1156};
MERGE (n:KG {id: 'handler:gottlieb_state.analog_reset_w'}) SET n:Handler SET n += {method: 'analog_reset_w', ownerClass: 'gottlieb_state', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 689, sourceColumn: 1, sourceEndLine: 694, sourceParameters: 'u8 data', sourceBody: '// reset the trackball counters
	m_track[0] = m_track_x.read_safe(0);
	m_track[1] = m_track_y.read_safe(0);', inputMembers: ['m_track_x=TRACKX', 'm_track_y=TRACKY']};
MERGE (n:KG {id: 'handler:gottlieb_state.sound_w'}) SET n:Handler SET n += {method: 'sound_w', ownerClass: 'gottlieb_state', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1118, sourceColumn: 1, sourceEndLine: 1124, sourceParameters: 'u8 data', sourceBody: 'if (m_r1_sound != nullptr)
		m_r1_sound->write(data);
	if (m_r2_sound != nullptr)
		m_r2_sound->write(data);'};
MERGE (n:KG {id: 'map:gottlieb_state.gottlieb_base_map'}) SET n:AddressMap SET n += {cls: 'gottlieb_state', name: 'gottlieb_base_map', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1148, sourceColumn: 1, sourceEndLine: 1167, globalMask: 65535};
MERGE (n:KG {id: 'map:gottlieb_state.gottlieb_base_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 4095, raw: 'map(0x0000, 0x0fff).ram().share("nvram")', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1151, sourceColumn: 2, sourceEndLine: 1151, ram: true, share: 'nvram'};
MERGE (n:KG {id: 'map:gottlieb_state.gottlieb_base_map/range1'}) SET n:AddressRange SET n += {start: 12288, end: 12543, raw: 'map(0x3000, 0x30ff).mirror(0x0700).writeonly().share(m_spriteram)', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1152, sourceColumn: 2, sourceEndLine: 1152, mirror: 1792, writeonly: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:gottlieb_state.gottlieb_base_map/range2'}) SET n:AddressRange SET n += {start: 14336, end: 15359, raw: 'map(0x3800, 0x3bff).mirror(0x0400).ram().w(FUNC(gottlieb_state::videoram_w)).share(m_videoram)', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1153, sourceColumn: 2, sourceEndLine: 1153, mirror: 1024, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'map:gottlieb_state.gottlieb_base_map/range3'}) SET n:AddressRange SET n += {start: 16384, end: 20479, raw: 'map(0x4000, 0x4fff).ram().w(FUNC(gottlieb_state::charram_w)).share(m_charram)', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1154, sourceColumn: 2, sourceEndLine: 1154, ram: true, share: 'charram'};
MERGE (n:KG {id: 'map:gottlieb_state.gottlieb_base_map/range4'}) SET n:AddressRange SET n += {start: 20480, end: 20511, raw: 'map(0x5000, 0x501f).mirror(0x07e0).w(FUNC(gottlieb_state::palette_w)).share(m_paletteram)', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1155, sourceColumn: 2, sourceEndLine: 1155, mirror: 2016, share: 'paletteram'};
MERGE (n:KG {id: 'map:gottlieb_state.gottlieb_base_map/range5'}) SET n:AddressRange SET n += {start: 22528, end: 22528, raw: 'map(0x5800, 0x5800).mirror(0x07f8).w("watchdog", FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1156, sourceColumn: 2, sourceEndLine: 1156, mirror: 2040};
MERGE (n:KG {id: 'map:gottlieb_state.gottlieb_base_map/range6'}) SET n:AddressRange SET n += {start: 22529, end: 22529, raw: 'map(0x5801, 0x5801).mirror(0x07f8).w(FUNC(gottlieb_state::analog_reset_w))', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1157, sourceColumn: 2, sourceEndLine: 1157, mirror: 2040};
MERGE (n:KG {id: 'map:gottlieb_state.gottlieb_base_map/range7'}) SET n:AddressRange SET n += {start: 22530, end: 22530, raw: 'map(0x5802, 0x5802).mirror(0x07f8).w(FUNC(gottlieb_state::sound_w))', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1158, sourceColumn: 2, sourceEndLine: 1158, mirror: 2040};
MERGE (n:KG {id: 'map:gottlieb_state.gottlieb_base_map/range8'}) SET n:AddressRange SET n += {start: 22531, end: 22531, raw: 'map(0x5803, 0x5803).mirror(0x07f8).w(FUNC(gottlieb_state::general_output_w))', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1159, sourceColumn: 2, sourceEndLine: 1159, mirror: 2040};
MERGE (n:KG {id: 'map:gottlieb_state.gottlieb_base_map/range9'}) SET n:AddressRange SET n += {start: 22528, end: 22528, raw: 'map(0x5800, 0x5800).mirror(0x07f8).portr("DSW")', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1161, sourceColumn: 2, sourceEndLine: 1161, mirror: 2040, portRead: 'DSW'};
MERGE (n:KG {id: 'map:gottlieb_state.gottlieb_base_map/range10'}) SET n:AddressRange SET n += {start: 22529, end: 22529, raw: 'map(0x5801, 0x5801).mirror(0x07f8).portr("IN1")', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1162, sourceColumn: 2, sourceEndLine: 1162, mirror: 2040, portRead: 'IN1'};
MERGE (n:KG {id: 'map:gottlieb_state.gottlieb_base_map/range11'}) SET n:AddressRange SET n += {start: 22530, end: 22530, raw: 'map(0x5802, 0x5802).mirror(0x07f8).portr("IN2")', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1163, sourceColumn: 2, sourceEndLine: 1163, mirror: 2040, portRead: 'IN2'};
MERGE (n:KG {id: 'map:gottlieb_state.gottlieb_base_map/range12'}) SET n:AddressRange SET n += {start: 22531, end: 22531, raw: 'map(0x5803, 0x5803).mirror(0x07f8).portr("IN3")', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1164, sourceColumn: 2, sourceEndLine: 1164, mirror: 2040, portRead: 'IN3'};
MERGE (n:KG {id: 'map:gottlieb_state.gottlieb_base_map/range13'}) SET n:AddressRange SET n += {start: 22532, end: 22532, raw: 'map(0x5804, 0x5804).mirror(0x07f8).portr("IN4")', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1165, sourceColumn: 2, sourceEndLine: 1165, mirror: 2040, portRead: 'IN4'};
MERGE (n:KG {id: 'map:gottlieb_state.gottlieb_base_map/range14'}) SET n:AddressRange SET n += {start: 24576, end: 65535, raw: 'map(0x6000, 0xffff).rom()', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1166, sourceColumn: 2, sourceEndLine: 1166, rom: true};
MERGE (n:KG {id: 'map:gottlieb_state.gottlieb_ram_map'}) SET n:AddressMap SET n += {cls: 'gottlieb_state', name: 'gottlieb_ram_map', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1170, sourceColumn: 1, sourceEndLine: 1175, calls: ['gottlieb_base_map']};
MERGE (n:KG {id: 'map:gottlieb_state.gottlieb_ram_map/range0'}) SET n:AddressRange SET n += {start: 4096, end: 12287, raw: 'map(0x1000, 0x2fff).ram()', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1174, sourceColumn: 2, sourceEndLine: 1174, ram: true};
MERGE (n:KG {id: 'map:gottlieb_sound_r1_device.r1_map'}) SET n:AddressMap SET n += {cls: 'gottlieb_sound_r1_device', name: 'r1_map', sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 305, sourceColumn: 1, sourceEndLine: 314, globalMask: 32767, unmapHigh: true};
MERGE (n:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 127, raw: 'map(0x0000, 0x007f).mirror(0x0d80).m(m_riot, FUNC(mos6532_device::ram_map)) -> map(0x00, 0x7f).rw(FUNC(mos6532_device::ram_r), FUNC(mos6532_device::ram_w))', mirror: 3456};
MERGE (n:KG {id: 'handler:mos6532_device.ram_r'}) SET n:Handler SET n += {method: 'ram_r', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'handler:mos6532_device.ram_w'}) SET n:Handler SET n += {method: 'ram_w', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range1'}) SET n:AddressRange SET n += {start: 512, end: 512, raw: 'map(0x0200, 0x021f).mirror(0x0de0).m(m_riot, FUNC(mos6532_device::io_map)) -> map(0x00, 0x00).mirror(0x18).rw(FUNC(mos6532_device::pa_data_r), FUNC(mos6532_device::pa_data_w))', mirror: 3576};
MERGE (n:KG {id: 'handler:mos6532_device.pa_data_r'}) SET n:Handler SET n += {method: 'pa_data_r', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'handler:mos6532_device.pa_data_w'}) SET n:Handler SET n += {method: 'pa_data_w', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range2'}) SET n:AddressRange SET n += {start: 513, end: 513, raw: 'map(0x0200, 0x021f).mirror(0x0de0).m(m_riot, FUNC(mos6532_device::io_map)) -> map(0x01, 0x01).mirror(0x18).rw(FUNC(mos6532_device::pa_ddr_r), FUNC(mos6532_device::pa_ddr_w))', mirror: 3576};
MERGE (n:KG {id: 'handler:mos6532_device.pa_ddr_r'}) SET n:Handler SET n += {method: 'pa_ddr_r', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'handler:mos6532_device.pa_ddr_w'}) SET n:Handler SET n += {method: 'pa_ddr_w', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range3'}) SET n:AddressRange SET n += {start: 514, end: 514, raw: 'map(0x0200, 0x021f).mirror(0x0de0).m(m_riot, FUNC(mos6532_device::io_map)) -> map(0x02, 0x02).mirror(0x18).rw(FUNC(mos6532_device::pb_data_r), FUNC(mos6532_device::pb_data_w))', mirror: 3576};
MERGE (n:KG {id: 'handler:mos6532_device.pb_data_r'}) SET n:Handler SET n += {method: 'pb_data_r', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'handler:mos6532_device.pb_data_w'}) SET n:Handler SET n += {method: 'pb_data_w', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range4'}) SET n:AddressRange SET n += {start: 515, end: 515, raw: 'map(0x0200, 0x021f).mirror(0x0de0).m(m_riot, FUNC(mos6532_device::io_map)) -> map(0x03, 0x03).mirror(0x18).rw(FUNC(mos6532_device::pb_ddr_r), FUNC(mos6532_device::pb_ddr_w))', mirror: 3576};
MERGE (n:KG {id: 'handler:mos6532_device.pb_ddr_r'}) SET n:Handler SET n += {method: 'pb_ddr_r', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'handler:mos6532_device.pb_ddr_w'}) SET n:Handler SET n += {method: 'pb_ddr_w', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range5'}) SET n:AddressRange SET n += {start: 532, end: 535, raw: 'map(0x0200, 0x021f).mirror(0x0de0).m(m_riot, FUNC(mos6532_device::io_map)) -> map(0x14, 0x17).w(FUNC(mos6532_device::timer_off_w))', mirror: 3552};
MERGE (n:KG {id: 'handler:mos6532_device.timer_off_w'}) SET n:Handler SET n += {method: 'timer_off_w', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range6'}) SET n:AddressRange SET n += {start: 540, end: 543, raw: 'map(0x0200, 0x021f).mirror(0x0de0).m(m_riot, FUNC(mos6532_device::io_map)) -> map(0x1c, 0x1f).w(FUNC(mos6532_device::timer_on_w))', mirror: 3552};
MERGE (n:KG {id: 'handler:mos6532_device.timer_on_w'}) SET n:Handler SET n += {method: 'timer_on_w', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range7'}) SET n:AddressRange SET n += {start: 516, end: 516, raw: 'map(0x0200, 0x021f).mirror(0x0de0).m(m_riot, FUNC(mos6532_device::io_map)) -> map(0x04, 0x04).mirror(0x12).r(FUNC(mos6532_device::timer_off_r))', mirror: 3570};
MERGE (n:KG {id: 'handler:mos6532_device.timer_off_r'}) SET n:Handler SET n += {method: 'timer_off_r', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range8'}) SET n:AddressRange SET n += {start: 524, end: 524, raw: 'map(0x0200, 0x021f).mirror(0x0de0).m(m_riot, FUNC(mos6532_device::io_map)) -> map(0x0c, 0x0c).mirror(0x12).r(FUNC(mos6532_device::timer_on_r))', mirror: 3570};
MERGE (n:KG {id: 'handler:mos6532_device.timer_on_r'}) SET n:Handler SET n += {method: 'timer_on_r', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range9'}) SET n:AddressRange SET n += {start: 517, end: 517, raw: 'map(0x0200, 0x021f).mirror(0x0de0).m(m_riot, FUNC(mos6532_device::io_map)) -> map(0x05, 0x05).mirror(0x1a).r(FUNC(mos6532_device::irq_r))', mirror: 3578};
MERGE (n:KG {id: 'handler:mos6532_device.irq_r'}) SET n:Handler SET n += {method: 'irq_r', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range10'}) SET n:AddressRange SET n += {start: 516, end: 519, raw: 'map(0x0200, 0x021f).mirror(0x0de0).m(m_riot, FUNC(mos6532_device::io_map)) -> map(0x04, 0x07).mirror(0x8).w(FUNC(mos6532_device::edge_w))', mirror: 3560};
MERGE (n:KG {id: 'handler:mos6532_device.edge_w'}) SET n:Handler SET n += {method: 'edge_w', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range11'}) SET n:AddressRange SET n += {start: 4096, end: 4096, raw: 'map(0x1000, 0x1000).mirror(0x0fff).w("dac", FUNC(dac_byte_interface::data_w))', sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 312, sourceColumn: 2, sourceEndLine: 312, mirror: 4095};
MERGE (n:KG {id: 'handler:dac_byte_interface.data_w'}) SET n:Handler SET n += {method: 'data_w', ownerClass: 'dac_byte_interface', sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 140, sourceColumn: 2, sourceEndLine: 140};
MERGE (n:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range12'}) SET n:AddressRange SET n += {start: 24576, end: 32767, raw: 'map(0x6000, 0x7fff).rom()', sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 313, sourceColumn: 2, sourceEndLine: 313, rom: true};
MERGE (n:KG {id: 'map:gottlieb_sound_speech_r1_device.r1_map'}) SET n:AddressMap SET n += {cls: 'gottlieb_sound_speech_r1_device', name: 'r1_map', sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 434, sourceColumn: 1, sourceEndLine: 439, calls: ['gottlieb_sound_r1_device::r1_map']};
MERGE (n:KG {id: 'map:gottlieb_sound_speech_r1_device.r1_map/range0'}) SET n:AddressRange SET n += {start: 8192, end: 8192, raw: 'map(0x2000, 0x2000).mirror(0x0fff).w(FUNC(gottlieb_sound_speech_r1_device::votrax_data_w))', sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 437, sourceColumn: 2, sourceEndLine: 437, mirror: 4095};
MERGE (n:KG {id: 'handler:gottlieb_sound_speech_r1_device.votrax_data_w'}) SET n:Handler SET n += {method: 'votrax_data_w', ownerClass: 'gottlieb_sound_speech_r1_device', sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 401, sourceColumn: 1, sourceEndLine: 405, sourceParameters: 'u8 data', sourceBody: 'm_votrax->inflection_w(data >> 6);
	m_votrax->write(~data & 0x3f);'};
MERGE (n:KG {id: 'handler:gottlieb_sound_r1_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'gottlieb_sound_r1_device', sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 295, sourceColumn: 1, sourceEndLine: 298, sourceParameters: 'u8 data', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(gottlieb_sound_r1_device::write_sync), this), data);'};
MERGE (n:KG {id: 'handler:gottlieb_sound_r1_device.write_sync'}) SET n:Handler SET n += {method: 'write_sync', ownerClass: 'gottlieb_sound_r1_device', sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 287, sourceColumn: 1, sourceEndLine: 293, sourceParameters: 's32 param', sourceBody: '// write the command data to the low 6 bits, the low 4 bits are also NANDed together and go to PA7
	u8 pa0_5 = ~param & 0x3f;
	u8 pa7 = (param & 0x0f) != 0xf;
	m_riot->pa_w(0, pa0_5 | (pa7 << 7), 0xbf);'};
MERGE (n:KG {id: 'map:gottlieb_sound_speech_r1_device.r1_map/range1'}) SET n:AddressRange SET n += {start: 12288, end: 12288, raw: 'map(0x3000, 0x3000).mirror(0x0fff).w(FUNC(gottlieb_sound_speech_r1_device::speech_clock_dac_w))', sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 438, sourceColumn: 2, sourceEndLine: 438, mirror: 4095};
MERGE (n:KG {id: 'handler:gottlieb_sound_speech_r1_device.speech_clock_dac_w'}) SET n:Handler SET n += {method: 'speech_clock_dac_w', ownerClass: 'gottlieb_sound_speech_r1_device', sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 423, sourceColumn: 1, sourceEndLine: 427, sourceParameters: 'u8 data', sourceBody: '//logerror("clock = %02X\\n", data);
	m_votrax->set_unscaled_clock(convert_speech_clock(data));'};
MERGE (n:KG {id: 'handler:gottlieb_sound_speech_r1_device.convert_speech_clock'}) SET n:Handler SET n += {method: 'convert_speech_clock', ownerClass: 'gottlieb_sound_speech_r1_device', sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 413, sourceColumn: 1, sourceEndLine: 421, sourceParameters: 'u8 data', sourceBody: '// prevent negative clock values (and possible crash)
	if (data < 0x40) data = 0x40;

	// totally random guesswork; would like to get real measurements on a board
	m_speech_clock = 950000 + (data - 0xa0) * 5500;
	return m_speech_clock;'};
MERGE (n:KG {id: 'machine:gottlieb_state.qbert_knocker'}) SET n:MachineConfig SET n += {cls: 'gottlieb_state', name: 'qbert_knocker', calls: [], stateMembers: ['{"name":"m_knocker_prev","bits":8}', '{"name":"m_joystick_select","bits":8}', '{"name":"m_track","bits":8,"arrayLength":2}', '{"name":"m_gfxcharlo","bits":8}', '{"name":"m_gfxcharhi","bits":8}', '{"name":"m_background_priority","bits":8}', '{"name":"m_spritebank","bits":8}', '{"name":"m_transparent0","bits":8}'], startHandlers: ['gottlieb_state.video_start'], sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1083, sourceColumn: 1, sourceEndLine: 1091};
MERGE (n:KG {id: 'handler:gottlieb_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'gottlieb_state', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 457, sourceColumn: 1, sourceEndLine: 478, sourceParameters: '', sourceBody: '/* compute palette information
	   note that there really are pullup/pulldown resistors, but this situation is complicated
	   by the use of transistors, so we ignore that and just use the relative resistor weights */
	compute_resistor_weights(0, 255, -1.0,
			4, resistances, m_weights, 180, 0,
			4, resistances, m_weights, 180, 0,
			4, resistances, m_weights, 180, 0);
	m_transparent0 = false;

	// configure the background tilemap
	m_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(gottlieb_state::get_bg_tile_info)), TILEMAP_SCAN_ROWS, 8, 8, 32, 32);
	m_bg_tilemap->set_transparent_pen(0);

	// save some state
	save_item(NAME(m_background_priority));
	save_item(NAME(m_spritebank));
	save_item(NAME(m_transparent0));'};
MERGE (n:KG {id: 'handler:gottlieb_state.get_bg_tile_info'}) SET n:Handler SET n += {method: 'get_bg_tile_info', ownerClass: 'gottlieb_state', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 596, sourceColumn: 1, sourceEndLine: 603, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int const code = m_videoram[tile_index];
	if ((code & 0x80) == 0)
		tileinfo.set(m_gfxcharlo, code, 0, 0);
	else
		tileinfo.set(m_gfxcharhi, code, 0, 0);'};
MERGE (n:KG {id: 'device:gottlieb_state.qbert_knocker/knocker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'knocker', clock: 0, config: ['SPEAKER(config, "knocker", 0.0, 0.0, 1.0)']};
MERGE (n:KG {id: 'device:gottlieb_state.qbert_knocker/knocker_sam'}) SET n:Device SET n += {type: 'SAMPLES', tag: 'knocker_sam', clock: null, config: ['SAMPLES(config, m_knocker_sample)', 'm_knocker_sample->set_channels(1)', 'm_knocker_sample->set_samples_names(qbert_knocker_names)', 'm_knocker_sample->add_route(ALL_OUTPUTS, "knocker", 1.0)'], configCalls: ['set_channels(1)']};
MERGE (n:KG {id: 'audioroute:device:gottlieb_state.qbert_knocker/knocker_sam/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'knocker', gain: 1, raw: 'm_knocker_sample->add_route(ALL_OUTPUTS, "knocker", 1.0)'};
MERGE (n:KG {id: 'machine:gottlieb_state.gottlieb_core'}) SET n:MachineConfig SET n += {cls: 'gottlieb_state', name: 'gottlieb_core', calls: [], stateMembers: ['{"name":"m_knocker_prev","bits":8}', '{"name":"m_joystick_select","bits":8}', '{"name":"m_track","bits":8,"arrayLength":2}', '{"name":"m_gfxcharlo","bits":8}', '{"name":"m_gfxcharhi","bits":8}', '{"name":"m_background_priority","bits":8}', '{"name":"m_spritebank","bits":8}', '{"name":"m_transparent0","bits":8}'], startHandlers: ['gottlieb_state.video_start'], sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2155, sourceColumn: 1, sourceEndLine: 2176};
MERGE (n:KG {id: 'device:gottlieb_state.gottlieb_core/maincpu'}) SET n:Device SET n += {type: 'I8088', tag: 'maincpu', clock: 5000000, config: ['I8088(config, m_maincpu, XTAL(15\'000\'000) / 3)', 'm_maincpu->set_addrmap(AS_PROGRAM, &gottlieb_state::gottlieb_ram_map)'], sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2158, sourceColumn: 2, sourceEndLine: 2158};
MERGE (n:KG {id: 'device:gottlieb_state.gottlieb_core/nvram'}) SET n:Device SET n += {type: 'NVRAM', tag: 'nvram', clock: null, config: ['NVRAM(config, "nvram", nvram_device::DEFAULT_ALL_1)'], sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2161, sourceColumn: 2, sourceEndLine: 2161, clockExpr: 'nvram_device::DEFAULT_ALL_1'};
MERGE (n:KG {id: 'device:gottlieb_state.gottlieb_core/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog").set_vblank_count(m_screen, 16)'], sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2163, sourceColumn: 2, sourceEndLine: 2163};
MERGE (n:KG {id: 'device:gottlieb_state.gottlieb_core/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(XTAL(20\'000\'000) / 4, GOTTLIEB_VIDEO_HCOUNT, 0, GOTTLIEB_VIDEO_HBLANK, GOTTLIEB_VIDEO_VCOUNT, 0, GOTTLIEB_VIDEO_VBLANK)', 'm_screen->set_screen_update(FUNC(gottlieb_state::screen_update))', 'm_screen->screen_vblank().set_inputline(m_maincpu, INPUT_LINE_NMI)'], sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2166, sourceColumn: 2, sourceEndLine: 2166, configCalls: ['set_raw(5000000,318,0,256,256,0,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [5000000, 318, 0, 256, 256, 0, 240], screenRawExpr: ['XTAL(20\'000\'000) / 4', 'GOTTLIEB_VIDEO_HCOUNT', '0', 'GOTTLIEB_VIDEO_HBLANK', 'GOTTLIEB_VIDEO_VCOUNT', '0', 'GOTTLIEB_VIDEO_VBLANK']};
MERGE (n:KG {id: 'device:gottlieb_state.gottlieb_core/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(gottlieb_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2168, sourceColumn: 2, sourceEndLine: 2168, targetClass: 'gottlieb_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:gottlieb_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'gottlieb_state', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 656, sourceColumn: 1, sourceEndLine: 672, sourceParameters: 'screen_device &screen, bitmap_rgb32 &bitmap, const rectangle &cliprect', sourceBody: '// if the background has lower priority, render it first, else clear the screen
	if (!m_background_priority)
		m_bg_tilemap->draw(screen, bitmap, cliprect, TILEMAP_DRAW_OPAQUE, 0);
	else
		bitmap.fill(m_palette->pen(0), cliprect);

	// draw the sprites
	draw_sprites(bitmap, cliprect);

	// if the background has higher priority, render it now
	if (m_background_priority)
		m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0);

	return 0;'};
MERGE (n:KG {id: 'handler:gottlieb_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'gottlieb_state', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 622, sourceColumn: 1, sourceEndLine: 646, sourceParameters: 'bitmap_rgb32 &bitmap, const rectangle &cliprect', sourceBody: 'rectangle clip = cliprect;

	/* this is a temporary guess until the sprite hardware is better understood
	   there is some additional clipping, but this may not be it */
	clip.min_x = 8;

	for (int offs = 0; offs < 256; offs += 4)
	{
		/* coordinates hand tuned to make the position correct in Q*Bert Qubes start
		   of level animation. */
		int sx = (m_spriteram[offs + 1]) - 4;
		int sy = (m_spriteram[offs]) - 13;
		int const code = (255 ^ m_spriteram[offs + 2]) + 256 * m_spritebank;

		if (flip_screen_x()) sx = 233 - sx;
		if (flip_screen_y()) sy = 228 - sy;

		m_gfxdecode->gfx(2)->transpen(bitmap,clip,
		code, 0,
		flip_screen_x(), flip_screen_y(),
		sx, sy, 0);
	}'};
MERGE (n:KG {id: 'device:gottlieb_state.gottlieb_core/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set_inputline', raw: 'm_screen->screen_vblank().set_inputline(m_maincpu, INPUT_LINE_NMI)', ownerTag: 'screen', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2169, sourceColumn: 2, sourceEndLine: 2169, inputLine: 'INPUT_LINE_NMI', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:gottlieb_state.gottlieb_core/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfxdecode)'], sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2171, sourceColumn: 2, sourceEndLine: 2171, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:gottlieb_state.gottlieb_core/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette).set_entries(16)'], sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2172, sourceColumn: 2, sourceEndLine: 2172};
MERGE (n:KG {id: 'device:gottlieb_state.gottlieb_core/speaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speaker', clock: null, config: ['SPEAKER(config, "speaker").front_center()'], sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2175, sourceColumn: 2, sourceEndLine: 2175};
MERGE (n:KG {id: 'machine:gottlieb_state.gottlieb1_votrax'}) SET n:MachineConfig SET n += {cls: 'gottlieb_state', name: 'gottlieb1_votrax', calls: ['gottlieb_core'], stateMembers: ['{"name":"m_knocker_prev","bits":8}', '{"name":"m_joystick_select","bits":8}', '{"name":"m_track","bits":8,"arrayLength":2}', '{"name":"m_gfxcharlo","bits":8}', '{"name":"m_gfxcharhi","bits":8}', '{"name":"m_background_priority","bits":8}', '{"name":"m_spritebank","bits":8}', '{"name":"m_transparent0","bits":8}'], startHandlers: ['gottlieb_state.video_start'], sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2190, sourceColumn: 1, sourceEndLine: 2194};
MERGE (n:KG {id: 'device:gottlieb_state.gottlieb1_votrax/r1sound'}) SET n:Device SET n += {type: 'GOTTLIEB_SOUND_SPEECH_REV1A', tag: 'r1sound', clock: null, config: ['GOTTLIEB_SOUND_SPEECH_REV1A(config, m_r1_sound).add_route(ALL_OUTPUTS, "speaker", 1.0)'], cls: 'gottlieb_sound_speech_r1a_device', clsHierarchy: ['gottlieb_sound_speech_r1a_device', 'gottlieb_sound_speech_r1_device', 'gottlieb_sound_r1_device'], sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2193, sourceColumn: 2, sourceEndLine: 2193};
MERGE (n:KG {id: 'audioroute:device:gottlieb_state.gottlieb1_votrax/r1sound/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 1, raw: 'GOTTLIEB_SOUND_SPEECH_REV1A(config, m_r1_sound).add_route(ALL_OUTPUTS, "speaker", 1.0)', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2193, sourceColumn: 2, sourceEndLine: 2193};
MERGE (n:KG {id: 'machine:gottlieb_state.qbert'}) SET n:MachineConfig SET n += {cls: 'gottlieb_state', name: 'qbert', calls: ['gottlieb1_votrax', 'qbert_knocker'], stateMembers: ['{"name":"m_knocker_prev","bits":8}', '{"name":"m_joystick_select","bits":8}', '{"name":"m_track","bits":8,"arrayLength":2}', '{"name":"m_gfxcharlo","bits":8}', '{"name":"m_gfxcharhi","bits":8}', '{"name":"m_background_priority","bits":8}', '{"name":"m_spritebank","bits":8}', '{"name":"m_transparent0","bits":8}'], startHandlers: ['gottlieb_state.video_start'], sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2263, sourceColumn: 1, sourceEndLine: 2269};
MERGE (n:KG {id: 'machine:gottlieb_sound_r1_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'gottlieb_sound_r1_device', name: 'device_add_mconfig', calls: [], sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 345, sourceColumn: 1, sourceEndLine: 361};
MERGE (n:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/audiocpu'}) SET n:Device SET n += {type: 'M6502', tag: 'audiocpu', clock: 894886.25, config: ['m6502_device &cpu(M6502(config, "audiocpu", SOUND1_CLOCK/4))', 'cpu.set_addrmap(AS_PROGRAM, &gottlieb_sound_r1_device::r1_map)'], sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 348, sourceColumn: 2, sourceEndLine: 348};
MERGE (n:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/nmi'}) SET n:Device SET n += {type: 'INPUT_MERGER_ANY_HIGH', tag: 'nmi', clock: null, config: ['INPUT_MERGER_ANY_HIGH(config, "nmi").output_handler().set_inputline("audiocpu", INPUT_LINE_NMI)'], sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 351, sourceColumn: 2, sourceEndLine: 351};
MERGE (n:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/nmi/callback:nmi:0'}) SET n:Callback SET n += {signal: 'output_handler', operation: 'set_inputline', raw: 'INPUT_MERGER_ANY_HIGH(config, "nmi").output_handler().set_inputline("audiocpu", INPUT_LINE_NMI)', ownerTag: 'nmi', sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 351, sourceColumn: 2, sourceEndLine: 351, targetTag: 'audiocpu', inputLine: 'INPUT_LINE_NMI'};
MERGE (n:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/riot'}) SET n:Device SET n += {type: 'MOS6532', tag: 'riot', clock: 894886.25, config: ['MOS6532(config, m_riot, SOUND1_CLOCK/4)', 'm_riot->pb_rd_callback().set_ioport("SB1")', 'm_riot->pb_wr_callback().set("nmi", FUNC(input_merger_device::in_w<0>)).bit(7).invert()', 'm_riot->irq_wr_callback().set_inputline("audiocpu", M6502_IRQ_LINE)'], sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 354, sourceColumn: 2, sourceEndLine: 354};
MERGE (n:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/riot/callback:riot:0'}) SET n:Callback SET n += {signal: 'pb_rd_callback', operation: 'set_ioport', raw: 'm_riot->pb_rd_callback().set_ioport("SB1")', ownerTag: 'riot', sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 355, sourceColumn: 2, sourceEndLine: 355, targetTag: 'SB1', targetPort: 'SB1'};
MERGE (n:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/riot/callback:riot:1'}) SET n:Callback SET n += {signal: 'pb_wr_callback', operation: 'set', raw: 'm_riot->pb_wr_callback().set("nmi", FUNC(input_merger_device::in_w<0>)).bit(7).invert()', ownerTag: 'riot', sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 356, sourceColumn: 2, sourceEndLine: 356, transforms: ['bit(7)', 'invert'], targetTag: 'nmi', targetClass: 'input_merger_device', targetMethod: 'in_w_0'};
MERGE (n:KG {id: 'handler:input_merger_device.in_w_0'}) SET n:Handler SET n += {method: 'in_w_0', ownerClass: 'input_merger_device', sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 356, sourceColumn: 2, sourceEndLine: 356};
MERGE (n:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/riot/callback:riot:2'}) SET n:Callback SET n += {signal: 'irq_wr_callback', operation: 'set_inputline', raw: 'm_riot->irq_wr_callback().set_inputline("audiocpu", M6502_IRQ_LINE)', ownerTag: 'riot', sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 357, sourceColumn: 2, sourceEndLine: 357, targetTag: 'audiocpu', inputLine: 'M6502_IRQ_LINE'};
MERGE (n:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/dac'}) SET n:Device SET n += {type: 'MC1408', tag: 'dac', clock: 0, config: ['MC1408(config, m_dac, 0).add_route(ALL_OUTPUTS, *this, 0.25)'], sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 360, sourceColumn: 2, sourceEndLine: 360};
MERGE (n:KG {id: 'machine:gottlieb_sound_speech_r1_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'gottlieb_sound_speech_r1_device', name: 'device_add_mconfig', calls: ['gottlieb_sound_r1_device::device_add_mconfig'], stateMembers: ['{"name":"m_speech_clock","bits":32}'], devicePatches: ['{"tag":"dac","config":["m_dac->reset_routes()","m_dac->add_route(ALL_OUTPUTS, *this, 0.20)"]}'], sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 463, sourceColumn: 1, sourceEndLine: 474};
MERGE (n:KG {id: 'device:gottlieb_sound_speech_r1_device.device_add_mconfig/votrax'}) SET n:Device SET n += {type: 'VOTRAX_SC01', tag: 'votrax', clock: null, config: ['VOTRAX_SC01(config, m_votrax, convert_speech_clock(0))', 'm_votrax->ar_callback().set("nmi", FUNC(input_merger_device::in_w<1>))', 'm_votrax->add_route(ALL_OUTPUTS, *this, 0.80)'], sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 471, sourceColumn: 2, sourceEndLine: 471, clockExpr: 'convert_speech_clock(0)'};
MERGE (n:KG {id: 'device:gottlieb_sound_speech_r1_device.device_add_mconfig/votrax/callback:votrax:0'}) SET n:Callback SET n += {signal: 'ar_callback', operation: 'set', raw: 'm_votrax->ar_callback().set("nmi", FUNC(input_merger_device::in_w<1>))', ownerTag: 'votrax', sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 472, sourceColumn: 2, sourceEndLine: 472, targetTag: 'nmi', targetClass: 'input_merger_device', targetMethod: 'in_w_1'};
MERGE (n:KG {id: 'handler:input_merger_device.in_w_1'}) SET n:Handler SET n += {method: 'in_w_1', ownerClass: 'input_merger_device', sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 516, sourceColumn: 2, sourceEndLine: 516};
MERGE (n:KG {id: 'machine:gottlieb_sound_speech_r1a_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'gottlieb_sound_speech_r1a_device', name: 'device_add_mconfig', calls: ['gottlieb_sound_speech_r1_device::device_add_mconfig'], stateMembers: ['{"name":"m_speech_clock","bits":32}'], devicePatches: ['{"tag":"votrax","config":["VOTRAX_SC01A(config.replace(), m_votrax, convert_speech_clock(0))","m_votrax->ar_callback().set(\\"nmi\\", FUNC(input_merger_device::in_w<1>))","m_votrax->add_route(ALL_OUTPUTS, *this, 0.80)"],"replacementType":"VOTRAX_SC01A"}'], sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 510, sourceColumn: 1, sourceEndLine: 518};
MERGE (n:KG {id: 'machine:gottlieb_sound_speech_r1a_device.device_add_mconfig/callback:votrax:0'}) SET n:Callback SET n += {signal: 'ar_callback', operation: 'set', raw: 'm_votrax->ar_callback().set("nmi", FUNC(input_merger_device::in_w<1>))', ownerTag: 'votrax', sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 516, sourceColumn: 2, sourceEndLine: 516, targetTag: 'nmi', targetClass: 'input_merger_device', targetMethod: 'in_w_1'};
MERGE (n:KG {id: 'inputs:qbert'}) SET n:InputPorts SET n += {name: 'qbert', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1266, sourceColumn: 8, sourceEndLine: 1266};
MERGE (n:KG {id: 'inputs:qbert/DSW'}) SET n:Port SET n += {tag: 'DSW', modify: false};
MERGE (n:KG {id: 'inputs:qbert/DSW/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, modifiers: ['PORT_DIPLOCATION("DSW:!2")'], name: 'Demo Sounds', defaultValue: 0, location: 'DSW:!2', settings: ['1=Off', '0=On']};
MERGE (n:KG {id: 'inputs:qbert/DSW/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, modifiers: ['PORT_DIPLOCATION("DSW:!6")'], name: 'Kicker', defaultValue: 2, location: 'DSW:!6', settings: ['0=Off', '2=On']};
MERGE (n:KG {id: 'inputs:qbert/DSW/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 4, modifiers: ['PORT_DIPLOCATION("DSW:!4")'], name: 'Cabinet', defaultValue: 0, location: 'DSW:!4', settings: ['0=Upright', '4=Cocktail']};
MERGE (n:KG {id: 'inputs:qbert/DSW/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 8, modifiers: ['PORT_DIPLOCATION("DSW:!1")'], name: 'Demo Mode (Unlim Lives, Start=Adv (Cheat)', defaultValue: 0, location: 'DSW:!1', settings: ['0=Off', '8=On']};
MERGE (n:KG {id: 'inputs:qbert/DSW/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 16, modifiers: ['PORT_DIPLOCATION("DSW:!3")'], name: 'Free Play', defaultValue: 0, location: 'DSW:!3', settings: ['0=Off', '16=On']};
MERGE (n:KG {id: 'inputs:qbert/DSW/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 32, name: 'Unused', defaultValue: 0};
MERGE (n:KG {id: 'inputs:qbert/DSW/f6'}) SET n:PortField SET n += {kind: 'dip', mask: 64, name: 'Unused', defaultValue: 0};
MERGE (n:KG {id: 'inputs:qbert/DSW/f7'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Unused', defaultValue: 0};
MERGE (n:KG {id: 'inputs:qbert/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:qbert/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_START1', defaultValue: 0};
MERGE (n:KG {id: 'inputs:qbert/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_START2', defaultValue: 0};
MERGE (n:KG {id: 'inputs:qbert/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_COIN1', defaultValue: 0};
MERGE (n:KG {id: 'inputs:qbert/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_COIN2', defaultValue: 0};
MERGE (n:KG {id: 'inputs:qbert/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_UNKNOWN', defaultValue: 0};
MERGE (n:KG {id: 'inputs:qbert/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_UNKNOWN', defaultValue: 0};
MERGE (n:KG {id: 'inputs:qbert/IN1/f6'}) SET n:PortField SET n += {kind: 'service', mask: 64, activeLow: true, defaultValue: 64};
MERGE (n:KG {id: 'inputs:qbert/IN1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_SERVICE1', modifiers: ['PORT_NAME("Select in Service Mode")', 'PORT_CODE(KEYCODE_F1)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:qbert/IN2'}) SET n:Port SET n += {tag: 'IN2', modify: false};
MERGE (n:KG {id: 'inputs:qbert/IN2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: true, type: 'IPT_UNUSED', defaultValue: 255};
MERGE (n:KG {id: 'inputs:qbert/IN3'}) SET n:Port SET n += {tag: 'IN3', modify: false};
MERGE (n:KG {id: 'inputs:qbert/IN3/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: true, type: 'IPT_UNUSED', defaultValue: 255};
MERGE (n:KG {id: 'inputs:qbert/IN4'}) SET n:Port SET n += {tag: 'IN4', modify: false};
MERGE (n:KG {id: 'inputs:qbert/IN4/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_NAME("P1 Right (Down-Right)")', 'PORT_4WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:qbert/IN4/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_NAME("P1 Left (Up-Left)")', 'PORT_4WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:qbert/IN4/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_NAME("P1 Up (Up-Right)")', 'PORT_4WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:qbert/IN4/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_NAME("P1 Down (Down-Left)")', 'PORT_4WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:qbert/IN4/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_NAME("P2 Right (Down-Right)")', 'PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:qbert/IN4/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_NAME("P2 Left (Up-Left)")', 'PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:qbert/IN4/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_NAME("P2 Up (Up-Right)")', 'PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:qbert/IN4/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_NAME("P2 Down (Down-Left)")', 'PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'gfxlayout:spr_layout'}) SET n:GfxLayout SET n += {name: 'spr_layout', width: 16, height: 16, total: 'RGN_FRAC(1,4)', planes: 4, planeOffsets: ['RGN_FRAC(0,4)', 'RGN_FRAC(1,4)', 'RGN_FRAC(2,4)', 'RGN_FRAC(3,4)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], yOffsets: [0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240], charIncrement: 256};
MERGE (n:KG {id: 'gfxlayout:gfx_8x8x4_packed_msb'}) SET n:GfxLayout SET n += {name: 'gfx_8x8x4_packed_msb', width: 8, height: 8, total: 'RGN_FRAC(1,1)', planes: 4, planeOffsets: [0, 1, 2, 3], xOffsets: [0, 4, 8, 12, 16, 20, 24, 28], yOffsets: [0, 32, 64, 96, 128, 160, 192, 224], charIncrement: 256};
MERGE (n:KG {id: 'gfxdecode:gfxdecode'}) SET n:GfxDecode SET n += {name: 'gfxdecode', sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2141, sourceColumn: 8, sourceEndLine: 2141};
MERGE (n:KG {id: 'gfxdecode:gfxdecode/e0'}) SET n:GfxDecodeEntry SET n += {region: 'charram', offset: 0, layout: 'gfx_8x8x4_packed_msb', colorBase: 0, colorCount: 1, ram: true, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfxdecode/e1'}) SET n:GfxDecodeEntry SET n += {region: 'bgtiles', offset: 0, layout: 'gfx_8x8x4_packed_msb', colorBase: 0, colorCount: 1, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfxdecode/e2'}) SET n:GfxDecodeEntry SET n += {region: 'sprites', offset: 0, layout: 'spr_layout', colorBase: 0, colorCount: 1, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:qbert'}), (b:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 3063, sourceColumn: 1, sourceEndLine: 3063};
MATCH (a:KG {id: 'game:qbert'}), (b:KG {id: 'machine:gottlieb_state.qbert'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:qbert'}), (b:KG {id: 'inputs:qbert'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:qbert'}), (b:KG {id: 'romset:qbert'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'game:qbert'}), (b:KG {id: 'handler:gottlieb_state.qbert_output_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}), (b:KG {id: 'file:gottlieb_a.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}), (b:KG {id: 'file:cpu/i86/i86.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}), (b:KG {id: 'file:cpu/m6502/m6502.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}), (b:KG {id: 'file:machine/ldpr8210.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}), (b:KG {id: 'file:machine/nvram.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}), (b:KG {id: 'file:machine/rescap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}), (b:KG {id: 'file:sound/dac.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}), (b:KG {id: 'file:sound/samples.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}), (b:KG {id: 'file:video/resnet.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}), (b:KG {id: 'file:emupal.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}), (b:KG {id: 'file:input.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}), (b:KG {id: 'file:tilemap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:gottlieb_state.qbert'}), (b:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2263, sourceColumn: 1, sourceEndLine: 2269};
MATCH (a:KG {id: 'machine:gottlieb_state.qbert'}), (b:KG {id: 'handler:gottlieb_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:gottlieb_state.qbert'}), (b:KG {id: 'machine:gottlieb_state.gottlieb1_votrax'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:gottlieb_state.qbert'}), (b:KG {id: 'machine:gottlieb_state.qbert_knocker'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'inputs:qbert'}), (b:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1266, sourceColumn: 8, sourceEndLine: 1266};
MATCH (a:KG {id: 'inputs:qbert'}), (b:KG {id: 'inputs:qbert/DSW'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:qbert'}), (b:KG {id: 'inputs:qbert/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:qbert'}), (b:KG {id: 'inputs:qbert/IN2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:qbert'}), (b:KG {id: 'inputs:qbert/IN3'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:qbert'}), (b:KG {id: 'inputs:qbert/IN4'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:qbert'}), (b:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2333, sourceColumn: 1, sourceEndLine: 2333};
MATCH (a:KG {id: 'romset:qbert'}), (b:KG {id: 'region:qbert/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:qbert'}), (b:KG {id: 'region:qbert/r1sound:audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:qbert'}), (b:KG {id: 'region:qbert/bgtiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:qbert'}), (b:KG {id: 'region:qbert/sprites'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:gottlieb_state.qbert_output_w'}), (b:KG {id: 'handler:gottlieb_state.general_output_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:gottlieb_state.qbert_output_w'}), (b:KG {id: 'handler:gottlieb_state.qbert_knocker'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:gottlieb_state.video_start'}), (b:KG {id: 'handler:gottlieb_state.get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:gottlieb_state.gottlieb1_votrax'}), (b:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2190, sourceColumn: 1, sourceEndLine: 2194};
MATCH (a:KG {id: 'machine:gottlieb_state.gottlieb1_votrax'}), (b:KG {id: 'handler:gottlieb_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:gottlieb_state.gottlieb1_votrax'}), (b:KG {id: 'machine:gottlieb_state.gottlieb_core'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:gottlieb_state.gottlieb1_votrax'}), (b:KG {id: 'device:gottlieb_state.gottlieb1_votrax/r1sound'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gottlieb_state.qbert_knocker'}), (b:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1083, sourceColumn: 1, sourceEndLine: 1091};
MATCH (a:KG {id: 'machine:gottlieb_state.qbert_knocker'}), (b:KG {id: 'handler:gottlieb_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:gottlieb_state.qbert_knocker'}), (b:KG {id: 'device:gottlieb_state.qbert_knocker/knocker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gottlieb_state.qbert_knocker'}), (b:KG {id: 'device:gottlieb_state.qbert_knocker/knocker_sam'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:qbert/DSW'}), (b:KG {id: 'inputs:qbert/DSW/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/DSW'}), (b:KG {id: 'inputs:qbert/DSW/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/DSW'}), (b:KG {id: 'inputs:qbert/DSW/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/DSW'}), (b:KG {id: 'inputs:qbert/DSW/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/DSW'}), (b:KG {id: 'inputs:qbert/DSW/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/DSW'}), (b:KG {id: 'inputs:qbert/DSW/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/DSW'}), (b:KG {id: 'inputs:qbert/DSW/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/DSW'}), (b:KG {id: 'inputs:qbert/DSW/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/IN1'}), (b:KG {id: 'inputs:qbert/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/IN1'}), (b:KG {id: 'inputs:qbert/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/IN1'}), (b:KG {id: 'inputs:qbert/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/IN1'}), (b:KG {id: 'inputs:qbert/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/IN1'}), (b:KG {id: 'inputs:qbert/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/IN1'}), (b:KG {id: 'inputs:qbert/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/IN1'}), (b:KG {id: 'inputs:qbert/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/IN1'}), (b:KG {id: 'inputs:qbert/IN1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/IN2'}), (b:KG {id: 'inputs:qbert/IN2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/IN3'}), (b:KG {id: 'inputs:qbert/IN3/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/IN4'}), (b:KG {id: 'inputs:qbert/IN4/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/IN4'}), (b:KG {id: 'inputs:qbert/IN4/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/IN4'}), (b:KG {id: 'inputs:qbert/IN4/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/IN4'}), (b:KG {id: 'inputs:qbert/IN4/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/IN4'}), (b:KG {id: 'inputs:qbert/IN4/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/IN4'}), (b:KG {id: 'inputs:qbert/IN4/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/IN4'}), (b:KG {id: 'inputs:qbert/IN4/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:qbert/IN4'}), (b:KG {id: 'inputs:qbert/IN4/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:qbert/maincpu'}), (b:KG {id: 'rom:qbert/maincpu/qb-rom2.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:qbert/maincpu'}), (b:KG {id: 'rom:qbert/maincpu/qb-rom1.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:qbert/maincpu'}), (b:KG {id: 'rom:qbert/maincpu/qb-rom0.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:qbert/r1sound:audiocpu'}), (b:KG {id: 'rom:qbert/r1sound:audiocpu/qb-snd1.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:qbert/r1sound:audiocpu'}), (b:KG {id: 'rom:qbert/r1sound:audiocpu/qb-snd2.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:qbert/bgtiles'}), (b:KG {id: 'rom:qbert/bgtiles/qb-bg0.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:qbert/bgtiles'}), (b:KG {id: 'rom:qbert/bgtiles/qb-bg1.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:qbert/sprites'}), (b:KG {id: 'rom:qbert/sprites/qb-fg3.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:qbert/sprites'}), (b:KG {id: 'rom:qbert/sprites/qb-fg2.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:qbert/sprites'}), (b:KG {id: 'rom:qbert/sprites/qb-fg1.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:qbert/sprites'}), (b:KG {id: 'rom:qbert/sprites/qb-fg0.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'handler:gottlieb_state.general_output_w'}), (b:KG {id: 'handler:gottlieb_state.video_control_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:gottlieb_state.gottlieb_core'}), (b:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2155, sourceColumn: 1, sourceEndLine: 2176};
MATCH (a:KG {id: 'machine:gottlieb_state.gottlieb_core'}), (b:KG {id: 'handler:gottlieb_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:gottlieb_state.gottlieb_core'}), (b:KG {id: 'device:gottlieb_state.gottlieb_core/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gottlieb_state.gottlieb_core'}), (b:KG {id: 'device:gottlieb_state.gottlieb_core/nvram'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gottlieb_state.gottlieb_core'}), (b:KG {id: 'device:gottlieb_state.gottlieb_core/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gottlieb_state.gottlieb_core'}), (b:KG {id: 'device:gottlieb_state.gottlieb_core/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gottlieb_state.gottlieb_core'}), (b:KG {id: 'device:gottlieb_state.gottlieb_core/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gottlieb_state.gottlieb_core'}), (b:KG {id: 'gfxdecode:gfxdecode'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:gottlieb_state.gottlieb_core'}), (b:KG {id: 'device:gottlieb_state.gottlieb_core/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gottlieb_state.gottlieb_core'}), (b:KG {id: 'device:gottlieb_state.gottlieb_core/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'device:gottlieb_state.gottlieb1_votrax/r1sound'}), (b:KG {id: 'audioroute:device:gottlieb_state.gottlieb1_votrax/r1sound/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:gottlieb_state.gottlieb1_votrax/r1sound'}), (b:KG {id: 'machine:gottlieb_sound_speech_r1a_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'device:gottlieb_state.qbert_knocker/knocker_sam'}), (b:KG {id: 'audioroute:device:gottlieb_state.qbert_knocker/knocker_sam/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:gottlieb_state.gottlieb_core/maincpu'}), (b:KG {id: 'map:gottlieb_state.gottlieb_ram_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:gottlieb_state.gottlieb_core/screen'}), (b:KG {id: 'device:gottlieb_state.gottlieb_core/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gottlieb_state.gottlieb_core/screen'}), (b:KG {id: 'device:gottlieb_state.gottlieb_core/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfxdecode'}), (b:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 2141, sourceColumn: 8, sourceEndLine: 2141};
MATCH (a:KG {id: 'gfxdecode:gfxdecode'}), (b:KG {id: 'gfxdecode:gfxdecode/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfxdecode'}), (b:KG {id: 'gfxdecode:gfxdecode/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfxdecode'}), (b:KG {id: 'gfxdecode:gfxdecode/e2'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'machine:gottlieb_sound_speech_r1a_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/shared/gottlieb_a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 510, sourceColumn: 1, sourceEndLine: 518};
MATCH (a:KG {id: 'machine:gottlieb_sound_speech_r1a_device.device_add_mconfig'}), (b:KG {id: 'machine:gottlieb_sound_speech_r1_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:gottlieb_sound_speech_r1a_device.device_add_mconfig'}), (b:KG {id: 'map:gottlieb_sound_speech_r1_device.r1_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'audiocpu'};
MATCH (a:KG {id: 'machine:gottlieb_sound_speech_r1a_device.device_add_mconfig'}), (b:KG {id: 'machine:gottlieb_sound_speech_r1a_device.device_add_mconfig/callback:votrax:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_ram_map'}), (b:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1170, sourceColumn: 1, sourceEndLine: 1175};
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_ram_map'}), (b:KG {id: 'map:gottlieb_state.gottlieb_base_map'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_ram_map'}), (b:KG {id: 'map:gottlieb_state.gottlieb_ram_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:gottlieb_state.gottlieb_core/screen/callback:screen:0'}), (b:KG {id: 'handler:gottlieb_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:gottlieb_state.gottlieb_core/screen/callback:screen:1'}), (b:KG {id: 'device:gottlieb_state.gottlieb_core/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'gfxdecode:gfxdecode/e0'}), (b:KG {id: 'gfxlayout:gfx_8x8x4_packed_msb'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfxdecode/e1'}), (b:KG {id: 'gfxlayout:gfx_8x8x4_packed_msb'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfxdecode/e2'}), (b:KG {id: 'gfxlayout:spr_layout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/gottlieb_a.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/gottlieb_a.cpp'}), (b:KG {id: 'file:gottlieb_a.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/gottlieb_a.cpp'}), (b:KG {id: 'file:machine/input_merger.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:gottlieb_sound_speech_r1_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/shared/gottlieb_a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 463, sourceColumn: 1, sourceEndLine: 474};
MATCH (a:KG {id: 'machine:gottlieb_sound_speech_r1_device.device_add_mconfig'}), (b:KG {id: 'machine:gottlieb_sound_r1_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:gottlieb_sound_speech_r1_device.device_add_mconfig'}), (b:KG {id: 'map:gottlieb_sound_speech_r1_device.r1_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'audiocpu'};
MATCH (a:KG {id: 'machine:gottlieb_sound_speech_r1_device.device_add_mconfig'}), (b:KG {id: 'device:gottlieb_sound_speech_r1_device.device_add_mconfig/votrax'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:gottlieb_sound_speech_r1_device.r1_map'}), (b:KG {id: 'file:src/mame/shared/gottlieb_a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 434, sourceColumn: 1, sourceEndLine: 439};
MATCH (a:KG {id: 'map:gottlieb_sound_speech_r1_device.r1_map'}), (b:KG {id: 'map:gottlieb_sound_r1_device.r1_map'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:gottlieb_sound_speech_r1_device.r1_map'}), (b:KG {id: 'map:gottlieb_sound_speech_r1_device.r1_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_sound_speech_r1_device.r1_map'}), (b:KG {id: 'map:gottlieb_sound_speech_r1_device.r1_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'machine:gottlieb_sound_speech_r1a_device.device_add_mconfig/callback:votrax:0'}), (b:KG {id: 'handler:input_merger_device.in_w_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:gottlieb_sound_speech_r1a_device.device_add_mconfig/callback:votrax:0'}), (b:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/nmi'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_base_map'}), (b:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/gottlieb/gottlieb.cpp', sourceLine: 1148, sourceColumn: 1, sourceEndLine: 1167};
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_base_map'}), (b:KG {id: 'map:gottlieb_state.gottlieb_base_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_base_map'}), (b:KG {id: 'map:gottlieb_state.gottlieb_base_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_base_map'}), (b:KG {id: 'map:gottlieb_state.gottlieb_base_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_base_map'}), (b:KG {id: 'map:gottlieb_state.gottlieb_base_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_base_map'}), (b:KG {id: 'map:gottlieb_state.gottlieb_base_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_base_map'}), (b:KG {id: 'map:gottlieb_state.gottlieb_base_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_base_map'}), (b:KG {id: 'map:gottlieb_state.gottlieb_base_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_base_map'}), (b:KG {id: 'map:gottlieb_state.gottlieb_base_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_base_map'}), (b:KG {id: 'map:gottlieb_state.gottlieb_base_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_base_map'}), (b:KG {id: 'map:gottlieb_state.gottlieb_base_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_base_map'}), (b:KG {id: 'map:gottlieb_state.gottlieb_base_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_base_map'}), (b:KG {id: 'map:gottlieb_state.gottlieb_base_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_base_map'}), (b:KG {id: 'map:gottlieb_state.gottlieb_base_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_base_map'}), (b:KG {id: 'map:gottlieb_state.gottlieb_base_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_base_map'}), (b:KG {id: 'map:gottlieb_state.gottlieb_base_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'handler:gottlieb_state.screen_update'}), (b:KG {id: 'handler:gottlieb_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:gfx_8x8x4_packed_msb'}), (b:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:spr_layout'}), (b:KG {id: 'file:src/mame/gottlieb/gottlieb.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'machine:gottlieb_sound_r1_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/shared/gottlieb_a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 345, sourceColumn: 1, sourceEndLine: 361};
MATCH (a:KG {id: 'machine:gottlieb_sound_r1_device.device_add_mconfig'}), (b:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/audiocpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gottlieb_sound_r1_device.device_add_mconfig'}), (b:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/nmi'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gottlieb_sound_r1_device.device_add_mconfig'}), (b:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/riot'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gottlieb_sound_r1_device.device_add_mconfig'}), (b:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/dac'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'device:gottlieb_sound_speech_r1_device.device_add_mconfig/votrax'}), (b:KG {id: 'device:gottlieb_sound_speech_r1_device.device_add_mconfig/votrax/callback:votrax:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map'}), (b:KG {id: 'file:src/mame/shared/gottlieb_a.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/gottlieb_a.cpp', sourceLine: 305, sourceColumn: 1, sourceEndLine: 314};
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map'}), (b:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map'}), (b:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map'}), (b:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map'}), (b:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map'}), (b:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map'}), (b:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map'}), (b:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map'}), (b:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map'}), (b:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map'}), (b:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map'}), (b:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map'}), (b:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map'}), (b:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gottlieb_sound_speech_r1_device.r1_map/range0'}), (b:KG {id: 'handler:gottlieb_sound_speech_r1_device.votrax_data_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:gottlieb_sound_speech_r1_device.r1_map/range1'}), (b:KG {id: 'handler:gottlieb_sound_speech_r1_device.speech_clock_dac_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/nmi'}), (b:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/nmi/callback:nmi:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_base_map/range2'}), (b:KG {id: 'handler:gottlieb_state.videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_base_map/range3'}), (b:KG {id: 'handler:gottlieb_state.charram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_base_map/range4'}), (b:KG {id: 'handler:gottlieb_state.palette_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_base_map/range5'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_base_map/range6'}), (b:KG {id: 'handler:gottlieb_state.analog_reset_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_base_map/range7'}), (b:KG {id: 'handler:gottlieb_state.sound_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:gottlieb_state.gottlieb_base_map/range8'}), (b:KG {id: 'handler:gottlieb_state.general_output_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/audiocpu'}), (b:KG {id: 'map:gottlieb_sound_r1_device.r1_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/riot'}), (b:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/riot/callback:riot:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/riot'}), (b:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/riot/callback:riot:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/riot'}), (b:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/riot/callback:riot:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gottlieb_sound_speech_r1_device.device_add_mconfig/votrax/callback:votrax:0'}), (b:KG {id: 'handler:input_merger_device.in_w_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range0'}), (b:KG {id: 'handler:mos6532_device.ram_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range0'}), (b:KG {id: 'handler:mos6532_device.ram_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range1'}), (b:KG {id: 'handler:mos6532_device.pa_data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range1'}), (b:KG {id: 'handler:mos6532_device.pa_data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range2'}), (b:KG {id: 'handler:mos6532_device.pa_ddr_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range2'}), (b:KG {id: 'handler:mos6532_device.pa_ddr_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range3'}), (b:KG {id: 'handler:mos6532_device.pb_data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range3'}), (b:KG {id: 'handler:mos6532_device.pb_data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range4'}), (b:KG {id: 'handler:mos6532_device.pb_ddr_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range4'}), (b:KG {id: 'handler:mos6532_device.pb_ddr_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range5'}), (b:KG {id: 'handler:mos6532_device.timer_off_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range6'}), (b:KG {id: 'handler:mos6532_device.timer_on_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range7'}), (b:KG {id: 'handler:mos6532_device.timer_off_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range8'}), (b:KG {id: 'handler:mos6532_device.timer_on_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range9'}), (b:KG {id: 'handler:mos6532_device.irq_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range10'}), (b:KG {id: 'handler:mos6532_device.edge_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:gottlieb_sound_r1_device.r1_map/range11'}), (b:KG {id: 'handler:dac_byte_interface.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'dac'};
MATCH (a:KG {id: 'handler:gottlieb_sound_speech_r1_device.votrax_data_w'}), (b:KG {id: 'handler:gottlieb_sound_r1_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:gottlieb_sound_speech_r1_device.speech_clock_dac_w'}), (b:KG {id: 'handler:gottlieb_sound_speech_r1_device.convert_speech_clock'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/nmi/callback:nmi:0'}), (b:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/audiocpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/riot/callback:riot:1'}), (b:KG {id: 'handler:input_merger_device.in_w_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/riot/callback:riot:1'}), (b:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/nmi'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/riot/callback:riot:2'}), (b:KG {id: 'device:gottlieb_sound_r1_device.device_add_mconfig/audiocpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'handler:gottlieb_sound_r1_device.write'}), (b:KG {id: 'handler:gottlieb_sound_r1_device.write_sync'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
