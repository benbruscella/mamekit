// mamekit knowledge graph — driver src/mame/williams/williams.cpp
// generated 2026-09-05T03:50:05.676Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/williams/williams.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/williams/williams.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:williams.h'}) SET n:SourceFile SET n += {path: 'williams.h', external: true};
MERGE (n:KG {id: 'file:machine/input_merger.h'}) SET n:SourceFile SET n += {path: 'machine/input_merger.h', external: true};
MERGE (n:KG {id: 'file:machine/nvram.h'}) SET n:SourceFile SET n += {path: 'machine/nvram.h', external: true};
MERGE (n:KG {id: 'file:sound/dac.h'}) SET n:SourceFile SET n += {path: 'sound/dac.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'game:robotron'}) SET n:Game SET n += {name: 'robotron', year: '1982', company: 'Williams / Vid Kidz', fullname: 'Robotron: 2084 (Release 5, solid blue label)', monitor: 'ROT0', cls: 'williams_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 4003, sourceColumn: 1, sourceEndLine: 4003};
MERGE (n:KG {id: 'romset:robotron'}) SET n:RomSet SET n += {name: 'robotron', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 2729, sourceColumn: 1, sourceEndLine: 2729};
MERGE (n:KG {id: 'region:robotron/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1986, sourceColumn: 2, sourceEndLine: 1986};
MERGE (n:KG {id: 'rom:robotron/maincpu/2084_rom_1b_3005-13.e4'}) SET n:Rom SET n += {file: '2084_rom_1b_3005-13.e4', offset: 0, size: 4096, crc: '66c7d3ef', sha1: 'f6d60e26c209c1df2cc01ac07ad5559daa1b7118', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 2731, sourceColumn: 2, sourceEndLine: 2731};
MERGE (n:KG {id: 'rom:robotron/maincpu/2084_rom_2b_3005-14.c4'}) SET n:Rom SET n += {file: '2084_rom_2b_3005-14.c4', offset: 4096, size: 4096, crc: '5bc6c614', sha1: '4d6e82bc29f49100f7751ccfc6a9ff35695b84b3', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 2732, sourceColumn: 2, sourceEndLine: 2732};
MERGE (n:KG {id: 'rom:robotron/maincpu/2084_rom_3b_3005-15.a4'}) SET n:Rom SET n += {file: '2084_rom_3b_3005-15.a4', offset: 8192, size: 4096, crc: 'e99a82be', sha1: '06a8c8dd0b4726eb7f0bb0e89c8533931d75fc1c', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 2733, sourceColumn: 2, sourceEndLine: 2733};
MERGE (n:KG {id: 'rom:robotron/maincpu/2084_rom_4b_3005-16.e5'}) SET n:Rom SET n += {file: '2084_rom_4b_3005-16.e5', offset: 12288, size: 4096, crc: 'afb1c561', sha1: 'aaf89c19fd8f4e8750717169eb1af476aef38a5e', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 2734, sourceColumn: 2, sourceEndLine: 2734};
MERGE (n:KG {id: 'rom:robotron/maincpu/2084_rom_5b_3005-17.c5'}) SET n:Rom SET n += {file: '2084_rom_5b_3005-17.c5', offset: 16384, size: 4096, crc: '62691e77', sha1: '79b4680ce19bd28882ae823f0e7b293af17cbb91', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 2735, sourceColumn: 2, sourceEndLine: 2735};
MERGE (n:KG {id: 'rom:robotron/maincpu/2084_rom_6b_3005-18.a5'}) SET n:Rom SET n += {file: '2084_rom_6b_3005-18.a5', offset: 20480, size: 4096, crc: 'bd2c853d', sha1: 'f76ec5432a7939b33a27be1c6855e2dbe6d9fdc8', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 2736, sourceColumn: 2, sourceEndLine: 2736};
MERGE (n:KG {id: 'rom:robotron/maincpu/2084_rom_7b_3005-19.e6'}) SET n:Rom SET n += {file: '2084_rom_7b_3005-19.e6', offset: 24576, size: 4096, crc: '49ac400c', sha1: '06eae5138254723819a5e93cfd9e9f3285fcddf5', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 2737, sourceColumn: 2, sourceEndLine: 2737};
MERGE (n:KG {id: 'rom:robotron/maincpu/2084_rom_8b_3005-20.c6'}) SET n:Rom SET n += {file: '2084_rom_8b_3005-20.c6', offset: 28672, size: 4096, crc: '3a96e88c', sha1: '7ae38a609ed9a6f62ca003cab719740ed7651b7c', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 2738, sourceColumn: 2, sourceEndLine: 2738};
MERGE (n:KG {id: 'rom:robotron/maincpu/2084_rom_9b_3005-21.a6'}) SET n:Rom SET n += {file: '2084_rom_9b_3005-21.a6', offset: 32768, size: 4096, crc: 'b124367b', sha1: 'fd9d75b866f0ebbb723f84889337e6814496a103', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 2739, sourceColumn: 2, sourceEndLine: 2739};
MERGE (n:KG {id: 'rom:robotron/maincpu/2084_rom_10b_3005-22.a7'}) SET n:Rom SET n += {file: '2084_rom_10b_3005-22.a7', offset: 53248, size: 4096, crc: '13797024', sha1: 'd426a50e75dabe936de643c83a548da5e399331c', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 2740, sourceColumn: 2, sourceEndLine: 2740};
MERGE (n:KG {id: 'rom:robotron/maincpu/2084_rom_11b_3005-23.c7'}) SET n:Rom SET n += {file: '2084_rom_11b_3005-23.c7', offset: 57344, size: 4096, crc: '7e3c1b87', sha1: 'f8c6cbe3688f256f41a121255fc08f575f6a4b4f', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 2741, sourceColumn: 2, sourceEndLine: 2741};
MERGE (n:KG {id: 'rom:robotron/maincpu/2084_rom_12b_3005-24.e7'}) SET n:Rom SET n += {file: '2084_rom_12b_3005-24.e7', offset: 61440, size: 4096, crc: '645d543e', sha1: 'fad7cea868ebf17347c4bc5193d647bbd8f9517b', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 2742, sourceColumn: 2, sourceEndLine: 2742};
MERGE (n:KG {id: 'region:robotron/soundcpu'}) SET n:RomRegion SET n += {tag: 'soundcpu', size: 65536, flags: '0', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 2001, sourceColumn: 2, sourceEndLine: 2001};
MERGE (n:KG {id: 'rom:robotron/soundcpu/video_sound_rom_3_std_767.ic12'}) SET n:Rom SET n += {file: 'video_sound_rom_3_std_767.ic12', offset: 61440, size: 4096, crc: 'c56c1d28', sha1: '15afefef11bfc3ab78f61ab046701db78d160ec3', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 2745, sourceColumn: 2, sourceEndLine: 2745};
MERGE (n:KG {id: 'region:robotron/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 1024, flags: '0', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 2004, sourceColumn: 2, sourceEndLine: 2004};
MERGE (n:KG {id: 'rom:robotron/proms/decoder_rom_4.3g'}) SET n:Rom SET n += {file: 'decoder_rom_4.3g', offset: 0, size: 512, crc: 'e6631c23', sha1: '9988723269367fb44ef83f627186a1c88cf7877e', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 2605, sourceColumn: 2, sourceEndLine: 2605};
MERGE (n:KG {id: 'rom:robotron/proms/decoder_rom_6.3c'}) SET n:Rom SET n += {file: 'decoder_rom_6.3c', offset: 512, size: 512, crc: '83faf25e', sha1: '30002643d08ed983a6701a7c4b5ee74a2f4a1adb', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 2749, sourceColumn: 2, sourceEndLine: 2749};
MERGE (n:KG {id: 'handler:pia6821_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'pia6821_device', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 1223, sourceColumn: 2, sourceEndLine: 1223};
MERGE (n:KG {id: 'handler:pia6821_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'pia6821_device', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 1223, sourceColumn: 2, sourceEndLine: 1223};
MERGE (n:KG {id: 'map:williams_state.main_map'}) SET n:AddressMap SET n += {cls: 'williams_state', name: 'main_map', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 530, sourceColumn: 1, sourceEndLine: 543};
MERGE (n:KG {id: 'map:williams_state.main_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 49151, raw: 'map(0x0000, 0xbfff).ram().share(m_videoram)', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 532, sourceColumn: 2, sourceEndLine: 532, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'map:williams_state.main_map/range1'}) SET n:AddressRange SET n += {start: 0, end: 36863, raw: 'map(0x0000, 0x8fff).view(m_rom_view)', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 533, sourceColumn: 2, sourceEndLine: 533};
MERGE (n:KG {id: 'map:williams_state.main_map/range2'}) SET n:AddressRange SET n += {start: 0, end: 36863, raw: 'm_rom_view[0](0x0000, 0x8fff).rom().region("maincpu", 0x00000)', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 534, sourceColumn: 2, sourceEndLine: 534, rom: true, viewTag: 'm_rom_view', viewEntry: 0, region: 'maincpu', regionOffset: 0};
MERGE (n:KG {id: 'map:williams_state.main_map/range3'}) SET n:AddressRange SET n += {start: 49152, end: 49167, raw: 'map(0xc000, 0xc00f).mirror(0x03f0).writeonly().share(m_paletteram)', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 535, sourceColumn: 2, sourceEndLine: 535, mirror: 1008, writeonly: true, share: 'paletteram'};
MERGE (n:KG {id: 'map:williams_state.main_map/range4'}) SET n:AddressRange SET n += {start: 51204, end: 51207, raw: 'map(0xc804, 0xc807).mirror(0x00f0).rw(m_pia[0], FUNC(pia6821_device::read), FUNC(pia6821_device::write))', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 536, sourceColumn: 2, sourceEndLine: 536, mirror: 240};
MERGE (n:KG {id: 'map:williams_state.main_map/range5'}) SET n:AddressRange SET n += {start: 51212, end: 51215, raw: 'map(0xc80c, 0xc80f).mirror(0x00f0).rw(m_pia[1], FUNC(pia6821_device::read), FUNC(pia6821_device::write))', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 537, sourceColumn: 2, sourceEndLine: 537, mirror: 240};
MERGE (n:KG {id: 'map:williams_state.main_map/range6'}) SET n:AddressRange SET n += {start: 51456, end: 51711, raw: 'map(0xc900, 0xc9ff).w(FUNC(williams_state::vram_select_w))', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 538, sourceColumn: 2, sourceEndLine: 538};
MERGE (n:KG {id: 'handler:williams_state.vram_select_w'}) SET n:Handler SET n += {method: 'vram_select_w', ownerClass: 'williams_state', sourceFile: 'src/mame/williams/williams_m.cpp', sourceLine: 112, sourceColumn: 1, sourceEndLine: 122, sourceParameters: 'u8 data', sourceBody: '// VRAM/ROM banking from bit 0
	if (BIT(data, 0))
		m_rom_view.select(0);
	else
		m_rom_view.disable();

	// cocktail flip from bit 1
	m_cocktail = BIT(data, 1);'};
MERGE (n:KG {id: 'map:williams_state.main_map/range7'}) SET n:AddressRange SET n += {start: 51968, end: 52223, raw: 'map(0xcb00, 0xcbff).r(FUNC(williams_state::video_counter_r))', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 539, sourceColumn: 2, sourceEndLine: 539};
MERGE (n:KG {id: 'handler:williams_state.video_counter_r'}) SET n:Handler SET n += {method: 'video_counter_r', ownerClass: 'williams_state', sourceFile: 'src/mame/williams/williams_v.cpp', sourceLine: 485, sourceColumn: 1, sourceEndLine: 491, sourceParameters: '', sourceBody: 'if (m_screen->vpos() < 0x100)
		return m_screen->vpos() & 0xfc;
	else
		return 0xfc;'};
MERGE (n:KG {id: 'map:williams_state.main_map/range8'}) SET n:AddressRange SET n += {start: 52223, end: 52223, raw: 'map(0xcbff, 0xcbff).w(FUNC(williams_state::watchdog_reset_w))', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 540, sourceColumn: 2, sourceEndLine: 540};
MERGE (n:KG {id: 'handler:williams_state.watchdog_reset_w'}) SET n:Handler SET n += {method: 'watchdog_reset_w', ownerClass: 'williams_state', sourceFile: 'src/mame/williams/williams_m.cpp', sourceLine: 247, sourceColumn: 1, sourceEndLine: 252, sourceParameters: 'u8 data', sourceBody: '// yes, the data bits are checked for this specific value
	if (data == 0x39)
		m_watchdog->watchdog_reset();'};
MERGE (n:KG {id: 'map:williams_state.main_map/range9'}) SET n:AddressRange SET n += {start: 52224, end: 53247, raw: 'map(0xcc00, 0xcfff).ram().w(FUNC(williams_state::cmos_4bit_w)).share("nvram")', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 541, sourceColumn: 2, sourceEndLine: 541, ram: true, share: 'nvram'};
MERGE (n:KG {id: 'handler:williams_state.cmos_4bit_w'}) SET n:Handler SET n += {method: 'cmos_4bit_w', ownerClass: 'williams_state', sourceFile: 'src/mame/williams/williams_m.cpp', sourceLine: 233, sourceColumn: 1, sourceEndLine: 237, sourceParameters: 'offs_t offset, u8 data', sourceBody: '// only 4 bits are valid
	m_nvram[offset] = data | 0xf0;'};
MERGE (n:KG {id: 'map:williams_state.main_map/range10'}) SET n:AddressRange SET n += {start: 53248, end: 65535, raw: 'map(0xd000, 0xffff).rom()', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 542, sourceColumn: 2, sourceEndLine: 542, rom: true};
MERGE (n:KG {id: 'map:williams_state.main_map_blitter'}) SET n:AddressMap SET n += {cls: 'williams_state', name: 'main_map_blitter', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 545, sourceColumn: 1, sourceEndLine: 549, calls: ['main_map']};
MERGE (n:KG {id: 'map:williams_state.main_map_blitter/range0'}) SET n:AddressRange SET n += {start: 51712, end: 51719, raw: 'map(0xca00, 0xca07).mirror(0x00f8).m(m_blitter, FUNC(williams_blitter_device::map))', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 548, sourceColumn: 2, sourceEndLine: 548, mirror: 248};
MERGE (n:KG {id: 'map:williams_state.sound_map'}) SET n:AddressMap SET n += {cls: 'williams_state', name: 'sound_map', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 691, sourceColumn: 1, sourceEndLine: 697};
MERGE (n:KG {id: 'map:williams_state.sound_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 127, raw: 'map(0x0000, 0x007f).ram()', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 693, sourceColumn: 2, sourceEndLine: 693, ram: true};
MERGE (n:KG {id: 'map:williams_state.sound_map/range1'}) SET n:AddressRange SET n += {start: 128, end: 255, raw: 'map(0x0080, 0x00ff).ram()', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 694, sourceColumn: 2, sourceEndLine: 694, ram: true};
MERGE (n:KG {id: 'map:williams_state.sound_map/range2'}) SET n:AddressRange SET n += {start: 1024, end: 1027, raw: 'map(0x0400, 0x0403).mirror(0x8000).rw(m_pia[2], FUNC(pia6821_device::read), FUNC(pia6821_device::write))', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 695, sourceColumn: 2, sourceEndLine: 695, mirror: 32768};
MERGE (n:KG {id: 'map:williams_state.sound_map/range3'}) SET n:AddressRange SET n += {start: 45056, end: 65535, raw: 'map(0xb000, 0xffff).rom()', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 696, sourceColumn: 2, sourceEndLine: 696, rom: true};
MERGE (n:KG {id: 'handler:dac_byte_interface.data_w'}) SET n:Handler SET n += {method: 'data_w', ownerClass: 'dac_byte_interface', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 1242, sourceColumn: 2, sourceEndLine: 1242};
MERGE (n:KG {id: 'machine:williams_state.williams_base'}) SET n:MachineConfig SET n += {cls: 'williams_state', name: 'williams_base', calls: [], stateMembers: ['{"name":"m_cocktail","bits":8}'], resetHandlers: ['williams_state.machine_reset'], startHandlers: ['williams_state.video_start'], sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1534, sourceColumn: 1, sourceEndLine: 1584};
MERGE (n:KG {id: 'handler:williams_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'williams_state', sourceFile: 'src/mame/williams/williams_m.cpp', sourceLine: 47, sourceColumn: 1, sourceEndLine: 50, sourceParameters: '', sourceBody: 'm_rom_view.disable();'};
MERGE (n:KG {id: 'handler:williams_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'williams_state', sourceFile: 'src/mame/williams/williams_v.cpp', sourceLine: 163, sourceColumn: 1, sourceEndLine: 166, sourceParameters: '', sourceBody: 'save_item(NAME(m_cocktail));'};
MERGE (n:KG {id: 'device:williams_state.williams_base/maincpu'}) SET n:Device SET n += {type: 'MC6809E', tag: 'maincpu', clock: 1000000, config: ['MC6809E(config, m_maincpu, MASTER_CLOCK/3/4)', 'm_maincpu->set_addrmap(AS_PROGRAM, &williams_state::main_map)'], sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1537, sourceColumn: 2, sourceEndLine: 1537};
MERGE (n:KG {id: 'device:williams_state.williams_base/soundcpu'}) SET n:Device SET n += {type: 'M6808', tag: 'soundcpu', clock: 3579545, config: ['M6808(config, m_soundcpu, SOUND_CLOCK)', 'm_soundcpu->set_addrmap(AS_PROGRAM, &williams_state::sound_map)'], sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1540, sourceColumn: 2, sourceEndLine: 1540};
MERGE (n:KG {id: 'device:williams_state.williams_base/nvram'}) SET n:Device SET n += {type: 'NVRAM', tag: 'nvram', clock: null, config: ['NVRAM(config, "nvram", nvram_device::DEFAULT_ALL_0)'], sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1543, sourceColumn: 2, sourceEndLine: 1543, clockExpr: 'nvram_device::DEFAULT_ALL_0'};
MERGE (n:KG {id: 'device:williams_state.williams_base/scan_timer'}) SET n:Device SET n += {type: 'TIMER', tag: 'scan_timer', clock: null, config: ['TIMER(config, "scan_timer").configure_scanline(FUNC(williams_state::va11_callback), "screen", 0, 32)'], sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1546, sourceColumn: 2, sourceEndLine: 1546};
MERGE (n:KG {id: 'device:williams_state.williams_base/scan_timer/callback:scan_timer:0'}) SET n:Callback SET n += {signal: 'configure_scanline', operation: 'configure_scanline', raw: 'TIMER(config, "scan_timer").configure_scanline(FUNC(williams_state::va11_callback), "screen", 0, 32)', ownerTag: 'scan_timer', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1546, sourceColumn: 2, sourceEndLine: 1546, scanlineStart: 0, scanlineIncrement: 32, targetClass: 'williams_state', targetMethod: 'va11_callback'};
MERGE (n:KG {id: 'handler:williams_state.va11_callback'}) SET n:Handler SET n += {method: 'va11_callback', ownerClass: 'williams_state', sourceFile: 'src/mame/williams/williams_m.cpp', sourceLine: 19, sourceColumn: 1, sourceEndLine: 29, sourceParameters: 'int param', sourceBody: 'int const scanline = param;

	// must not fire at line 256
	if (scanline == 256)
		return;

	// the IRQ signal comes into CB1, and is set to VA11
	m_pia[1]->cb1_w(BIT(scanline, 5));'};
MERGE (n:KG {id: 'device:williams_state.williams_base/240_timer'}) SET n:Device SET n += {type: 'TIMER', tag: '240_timer', clock: null, config: ['TIMER(config, "240_timer").configure_scanline(FUNC(williams_state::count240_callback), "screen", 0, 240)'], sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1549, sourceColumn: 2, sourceEndLine: 1549};
MERGE (n:KG {id: 'device:williams_state.williams_base/240_timer/callback:240_timer:0'}) SET n:Callback SET n += {signal: 'configure_scanline', operation: 'configure_scanline', raw: 'TIMER(config, "240_timer").configure_scanline(FUNC(williams_state::count240_callback), "screen", 0, 240)', ownerTag: '240_timer', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1549, sourceColumn: 2, sourceEndLine: 1549, scanlineStart: 0, scanlineIncrement: 240, targetClass: 'williams_state', targetMethod: 'count240_callback'};
MERGE (n:KG {id: 'handler:williams_state.count240_callback'}) SET n:Handler SET n += {method: 'count240_callback', ownerClass: 'williams_state', sourceFile: 'src/mame/williams/williams_m.cpp', sourceLine: 32, sourceColumn: 1, sourceEndLine: 38, sourceParameters: 'int param', sourceBody: 'int const scanline = param;

	// the COUNT240 signal comes into CA1, and is set to the logical AND of VA10-VA13
	m_pia[1]->ca1_w(scanline >= 240 ? 1 : 0);'};
MERGE (n:KG {id: 'device:williams_state.williams_base/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, m_watchdog)'], sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1551, sourceColumn: 2, sourceEndLine: 1551};
MERGE (n:KG {id: 'device:williams_state.williams_base/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_video_attributes(VIDEO_UPDATE_SCANLINE | VIDEO_ALWAYS_UPDATE)', 'm_screen->set_raw(MASTER_CLOCK*2/3, 512, 6, 298, 260, 7, 247)', 'm_screen->set_screen_update(FUNC(williams_state::screen_update))'], sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1554, sourceColumn: 2, sourceEndLine: 1554, configCalls: ['set_raw(8000000,512,6,298,260,7,247)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [8000000, 512, 6, 298, 260, 7, 247], screenRawExpr: ['MASTER_CLOCK*2/3', '512', '6', '298', '260', '7', '247'], screenVideoAttributes: ['VIDEO_UPDATE_SCANLINE', 'VIDEO_ALWAYS_UPDATE']};
MERGE (n:KG {id: 'device:williams_state.williams_base/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(williams_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1557, sourceColumn: 2, sourceEndLine: 1557, targetClass: 'williams_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:williams_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'williams_state', sourceFile: 'src/mame/williams/williams_v.cpp', sourceLine: 200, sourceColumn: 1, sourceEndLine: 222, sourceParameters: 'screen_device &screen, bitmap_rgb32 &bitmap, const rectangle &cliprect', sourceBody: '// precompute the palette
	rgb_t pens[16];
	for (int x = 0; x < 16; x++)
		pens[x] = m_palette->pen_color(m_paletteram[x]);

	// loop over rows
	for (int y = cliprect.min_y; y <= cliprect.max_y; y++)
	{
		uint8_t const *const source = &m_videoram[y];
		uint32_t *const dest = &bitmap.pix(y);

		// loop over columns
		for (int x = cliprect.min_x & ~1; x <= cliprect.max_x; x += 2)
		{
			uint8_t const pix = source[(x / 2) * 256];
			dest[x + 0] = pens[pix >> 4];
			dest[x + 1] = pens[pix & 0x0f];
		}
	}
	return 0;'};
MERGE (n:KG {id: 'device:williams_state.williams_base/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(williams_state::palette_init), 256)'], sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1559, sourceColumn: 2, sourceEndLine: 1559, clockExpr: 'FUNC(williams_state::palette_init)'};
MERGE (n:KG {id: 'device:williams_state.williams_base/speaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speaker', clock: null, config: ['SPEAKER(config, "speaker").front_center()'], sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1562, sourceColumn: 2, sourceEndLine: 1562};
MERGE (n:KG {id: 'device:williams_state.williams_base/dac'}) SET n:Device SET n += {type: 'MC1408', tag: 'dac', clock: 0, config: ['MC1408(config, "dac", 0).add_route(ALL_OUTPUTS, "speaker", 0.25)'], sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1563, sourceColumn: 2, sourceEndLine: 1563};
MERGE (n:KG {id: 'audioroute:device:williams_state.williams_base/dac/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.25, raw: 'MC1408(config, "dac", 0).add_route(ALL_OUTPUTS, "speaker", 0.25)', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1563, sourceColumn: 2, sourceEndLine: 1563};
MERGE (n:KG {id: 'device:williams_state.williams_base/mainirq'}) SET n:Device SET n += {type: 'INPUT_MERGER_ANY_HIGH', tag: 'mainirq', clock: null, config: ['INPUT_MERGER_ANY_HIGH(config, "mainirq").output_handler().set_inputline(m_maincpu, M6809_IRQ_LINE)'], sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1566, sourceColumn: 2, sourceEndLine: 1566};
MERGE (n:KG {id: 'device:williams_state.williams_base/mainirq/callback:mainirq:0'}) SET n:Callback SET n += {signal: 'output_handler', operation: 'set_inputline', raw: 'INPUT_MERGER_ANY_HIGH(config, "mainirq").output_handler().set_inputline(m_maincpu, M6809_IRQ_LINE)', ownerTag: 'mainirq', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1566, sourceColumn: 2, sourceEndLine: 1566, inputLine: 'M6809_IRQ_LINE', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:williams_state.williams_base/soundirq'}) SET n:Device SET n += {type: 'INPUT_MERGER_ANY_HIGH', tag: 'soundirq', clock: null, config: ['INPUT_MERGER_ANY_HIGH(config, "soundirq").output_handler().set_inputline(m_soundcpu, M6808_IRQ_LINE)'], sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1568, sourceColumn: 2, sourceEndLine: 1568};
MERGE (n:KG {id: 'device:williams_state.williams_base/soundirq/callback:soundirq:0'}) SET n:Callback SET n += {signal: 'output_handler', operation: 'set_inputline', raw: 'INPUT_MERGER_ANY_HIGH(config, "soundirq").output_handler().set_inputline(m_soundcpu, M6808_IRQ_LINE)', ownerTag: 'soundirq', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1568, sourceColumn: 2, sourceEndLine: 1568, inputLine: 'M6808_IRQ_LINE', targetTag: 'soundcpu'};
MERGE (n:KG {id: 'device:williams_state.williams_base/pia_0'}) SET n:Device SET n += {type: 'PIA6821', tag: 'pia_0', clock: null, config: ['PIA6821(config, m_pia[0])', 'm_pia[0]->readpa_handler().set_ioport("IN0")', 'm_pia[0]->readpb_handler().set_ioport("IN1")'], sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1570, sourceColumn: 2, sourceEndLine: 1570};
MERGE (n:KG {id: 'device:williams_state.williams_base/pia_0/callback:pia_0:0'}) SET n:Callback SET n += {signal: 'readpa_handler', operation: 'set_ioport', raw: 'm_pia[0]->readpa_handler().set_ioport("IN0")', ownerTag: 'pia_0', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1571, sourceColumn: 2, sourceEndLine: 1571, targetTag: 'IN0', targetPort: 'IN0'};
MERGE (n:KG {id: 'device:williams_state.williams_base/pia_0/callback:pia_0:1'}) SET n:Callback SET n += {signal: 'readpb_handler', operation: 'set_ioport', raw: 'm_pia[0]->readpb_handler().set_ioport("IN1")', ownerTag: 'pia_0', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1572, sourceColumn: 2, sourceEndLine: 1572, targetTag: 'IN1', targetPort: 'IN1'};
MERGE (n:KG {id: 'device:williams_state.williams_base/pia_1'}) SET n:Device SET n += {type: 'PIA6821', tag: 'pia_1', clock: null, config: ['PIA6821(config, m_pia[1])', 'm_pia[1]->readpa_handler().set_ioport("IN2")', 'm_pia[1]->writepb_handler().set(FUNC(williams_state::snd_cmd_w))', 'm_pia[1]->irqa_handler().set("mainirq", FUNC(input_merger_any_high_device::in_w<0>))', 'm_pia[1]->irqb_handler().set("mainirq", FUNC(input_merger_any_high_device::in_w<1>))'], sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1574, sourceColumn: 2, sourceEndLine: 1574};
MERGE (n:KG {id: 'device:williams_state.williams_base/pia_1/callback:pia_1:0'}) SET n:Callback SET n += {signal: 'readpa_handler', operation: 'set_ioport', raw: 'm_pia[1]->readpa_handler().set_ioport("IN2")', ownerTag: 'pia_1', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1575, sourceColumn: 2, sourceEndLine: 1575, targetTag: 'IN2', targetPort: 'IN2'};
MERGE (n:KG {id: 'device:williams_state.williams_base/pia_1/callback:pia_1:1'}) SET n:Callback SET n += {signal: 'writepb_handler', operation: 'set', raw: 'm_pia[1]->writepb_handler().set(FUNC(williams_state::snd_cmd_w))', ownerTag: 'pia_1', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1576, sourceColumn: 2, sourceEndLine: 1576, targetClass: 'williams_state', targetMethod: 'snd_cmd_w'};
MERGE (n:KG {id: 'handler:williams_state.snd_cmd_w'}) SET n:Handler SET n += {method: 'snd_cmd_w', ownerClass: 'williams_state', sourceFile: 'src/mame/williams/williams_m.cpp', sourceLine: 171, sourceColumn: 1, sourceEndLine: 175, sourceParameters: 'u8 data', sourceBody: '// the high two bits are set externally, and should be 1
	machine().scheduler().synchronize(timer_expired_delegate(FUNC(williams_state::deferred_snd_cmd_w<2>), this), data | 0xc0);'};
MERGE (n:KG {id: 'handler:williams_state.deferred_snd_cmd_w_2'}) SET n:Handler SET n += {method: 'deferred_snd_cmd_w_2', ownerClass: 'williams_state', sourceFile: 'src/mame/williams/williams_m.cpp', sourceLine: 162, sourceColumn: 1, sourceEndLine: 169, sourceParameters: 'int param', sourceBody: 'm_pia[A]->portb_w(param);
	m_pia[A]->cb1_w((param == 0xff) ? 0 : 1);

	if constexpr (sizeof...(B) > 0)
		deferred_snd_cmd_w<B...>(param);'};
MERGE (n:KG {id: 'device:williams_state.williams_base/pia_1/callback:pia_1:2'}) SET n:Callback SET n += {signal: 'irqa_handler', operation: 'set', raw: 'm_pia[1]->irqa_handler().set("mainirq", FUNC(input_merger_any_high_device::in_w<0>))', ownerTag: 'pia_1', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1577, sourceColumn: 2, sourceEndLine: 1577, targetTag: 'mainirq', targetClass: 'input_merger_any_high_device', targetMethod: 'in_w_0'};
MERGE (n:KG {id: 'handler:input_merger_any_high_device.in_w_0'}) SET n:Handler SET n += {method: 'in_w_0', ownerClass: 'input_merger_any_high_device', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1964, sourceColumn: 2, sourceEndLine: 1964};
MERGE (n:KG {id: 'device:williams_state.williams_base/pia_1/callback:pia_1:3'}) SET n:Callback SET n += {signal: 'irqb_handler', operation: 'set', raw: 'm_pia[1]->irqb_handler().set("mainirq", FUNC(input_merger_any_high_device::in_w<1>))', ownerTag: 'pia_1', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1578, sourceColumn: 2, sourceEndLine: 1578, targetTag: 'mainirq', targetClass: 'input_merger_any_high_device', targetMethod: 'in_w_1'};
MERGE (n:KG {id: 'handler:input_merger_any_high_device.in_w_1'}) SET n:Handler SET n += {method: 'in_w_1', ownerClass: 'input_merger_any_high_device', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1965, sourceColumn: 2, sourceEndLine: 1965};
MERGE (n:KG {id: 'device:williams_state.williams_base/pia_2'}) SET n:Device SET n += {type: 'PIA6821', tag: 'pia_2', clock: null, config: ['PIA6821(config, m_pia[2])', 'm_pia[2]->writepa_handler().set("dac", FUNC(dac_byte_interface::data_w))', 'm_pia[2]->irqa_handler().set("soundirq", FUNC(input_merger_any_high_device::in_w<0>))', 'm_pia[2]->irqb_handler().set("soundirq", FUNC(input_merger_any_high_device::in_w<1>))'], sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1580, sourceColumn: 2, sourceEndLine: 1580};
MERGE (n:KG {id: 'device:williams_state.williams_base/pia_2/callback:pia_2:0'}) SET n:Callback SET n += {signal: 'writepa_handler', operation: 'set', raw: 'm_pia[2]->writepa_handler().set("dac", FUNC(dac_byte_interface::data_w))', ownerTag: 'pia_2', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1581, sourceColumn: 2, sourceEndLine: 1581, targetTag: 'dac', targetClass: 'dac_byte_interface', targetMethod: 'data_w'};
MERGE (n:KG {id: 'device:williams_state.williams_base/pia_2/callback:pia_2:1'}) SET n:Callback SET n += {signal: 'irqa_handler', operation: 'set', raw: 'm_pia[2]->irqa_handler().set("soundirq", FUNC(input_merger_any_high_device::in_w<0>))', ownerTag: 'pia_2', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1582, sourceColumn: 2, sourceEndLine: 1582, targetTag: 'soundirq', targetClass: 'input_merger_any_high_device', targetMethod: 'in_w_0'};
MERGE (n:KG {id: 'device:williams_state.williams_base/pia_2/callback:pia_2:2'}) SET n:Callback SET n += {signal: 'irqb_handler', operation: 'set', raw: 'm_pia[2]->irqb_handler().set("soundirq", FUNC(input_merger_any_high_device::in_w<1>))', ownerTag: 'pia_2', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1583, sourceColumn: 2, sourceEndLine: 1583, targetTag: 'soundirq', targetClass: 'input_merger_any_high_device', targetMethod: 'in_w_1'};
MERGE (n:KG {id: 'machine:williams_state.williams_b1'}) SET n:MachineConfig SET n += {cls: 'williams_state', name: 'williams_b1', calls: ['williams_base'], stateMembers: ['{"name":"m_cocktail","bits":8}'], resetHandlers: ['williams_state.machine_reset'], startHandlers: ['williams_state.video_start'], sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1586, sourceColumn: 1, sourceEndLine: 1591};
MERGE (n:KG {id: 'device:williams_state.williams_b1/blitter'}) SET n:Device SET n += {type: 'WILLIAMS_BLITTER_SC1', tag: 'blitter', clock: 49152, config: ['WILLIAMS_BLITTER_SC1(config, m_blitter, 0xc000, m_maincpu, m_videoram)'], cls: 'williams_blitter_sc1_device', clsHierarchy: ['williams_blitter_sc1_device', 'williams_blitter_device'], sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1589, sourceColumn: 2, sourceEndLine: 1589};
MERGE (n:KG {id: 'inputs:robotron'}) SET n:InputPorts SET n += {name: 'robotron', sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 941, sourceColumn: 8, sourceEndLine: 941};
MERGE (n:KG {id: 'inputs:robotron/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:robotron/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_JOYSTICKLEFT_UP', modifiers: ['PORT_NAME("Move Up")'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:robotron/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICKLEFT_DOWN', modifiers: ['PORT_NAME("Move Down")'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:robotron/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_JOYSTICKLEFT_LEFT', modifiers: ['PORT_NAME("Move Left")'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:robotron/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_JOYSTICKLEFT_RIGHT', modifiers: ['PORT_NAME("Move Right")'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:robotron/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_START1', defaultValue: 0};
MERGE (n:KG {id: 'inputs:robotron/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_START2', defaultValue: 0};
MERGE (n:KG {id: 'inputs:robotron/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_JOYSTICKRIGHT_UP', modifiers: ['PORT_NAME("Fire Up")'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:robotron/IN0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_JOYSTICKRIGHT_DOWN', modifiers: ['PORT_NAME("Fire Down")'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:robotron/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:robotron/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_JOYSTICKRIGHT_LEFT', modifiers: ['PORT_NAME("Fire Left")'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:robotron/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICKRIGHT_RIGHT', modifiers: ['PORT_NAME("Fire Right")'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:robotron/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 252, activeLow: false, type: 'IPT_UNKNOWN', defaultValue: 0};
MERGE (n:KG {id: 'inputs:robotron/IN2'}) SET n:Port SET n += {tag: 'IN2', modify: false};
MERGE (n:KG {id: 'inputs:robotron/IN2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_SERVICE1', modifiers: ['PORT_NAME("Auto Up / Manual Down")', 'PORT_TOGGLE'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:robotron/IN2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_SERVICE', modifiers: ['PORT_NAME("Advance")'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:robotron/IN2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_COIN3', defaultValue: 0};
MERGE (n:KG {id: 'inputs:robotron/IN2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_MEMORY_RESET', modifiers: ['PORT_NAME("High Score Reset")'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:robotron/IN2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_COIN1', defaultValue: 0};
MERGE (n:KG {id: 'inputs:robotron/IN2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_COIN2', defaultValue: 0};
MERGE (n:KG {id: 'inputs:robotron/IN2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_TILT', defaultValue: 0};
MERGE (n:KG {id: 'inputs:robotron/IN2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_UNKNOWN', defaultValue: 0};
MERGE (n:KG {id: 'device:williams_state.williams_base/palette/callback:palette_init'}) SET n:Callback SET n += {signal: 'palette_init', operation: 'palette_init', raw: 'PALETTE(config, m_palette, FUNC(williams_state::palette_init), 256)', ownerTag: 'palette', targetClass: 'williams_state', targetMethod: 'palette_init', entries: 256, sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1559};
MERGE (n:KG {id: 'handler:williams_state.palette_init'}) SET n:Handler SET n += {method: 'palette_init', ownerClass: 'williams_state', sourceFile: 'src/mame/williams/williams_v.cpp', sourceLine: 340, sourceColumn: 1, sourceEndLine: 363, sourceParameters: 'palette_device &palette', sourceBody: '// compute palette information
	// note that there really are pullup/pulldown resistors, but this situation is complicated
	// by the use of transistors, so we ignore that and just use the relative resistor weights
	double weights_r[3], weights_g[3], weights_b[2];
	compute_resistor_weights(0, 255, -1.0,
			3, resistances_rg, weights_r, 0, 0,
			3, resistances_rg, weights_g, 0, 0,
			2, resistances_b,  weights_b, 0, 0);

	// build a palette lookup
	for (int i = 0; i < 256; i++)
	{
		int const r = combine_weights(weights_r, BIT(i, 0), BIT(i, 1), BIT(i, 2));
		int const g = combine_weights(weights_g, BIT(i, 3), BIT(i, 4), BIT(i, 5));
		int const b = combine_weights(weights_b, BIT(i, 6), BIT(i, 7));

		palette.set_pen_color(i, rgb_t(r, g, b));
	}'};
MATCH (a:KG {id: 'game:robotron'}), (b:KG {id: 'file:src/mame/williams/williams.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 4003, sourceColumn: 1, sourceEndLine: 4003};
MATCH (a:KG {id: 'game:robotron'}), (b:KG {id: 'machine:williams_state.williams_b1'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:robotron'}), (b:KG {id: 'inputs:robotron'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:robotron'}), (b:KG {id: 'romset:robotron'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/williams/williams.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/williams/williams.cpp'}), (b:KG {id: 'file:williams.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/williams/williams.cpp'}), (b:KG {id: 'file:machine/input_merger.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/williams/williams.cpp'}), (b:KG {id: 'file:machine/nvram.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/williams/williams.cpp'}), (b:KG {id: 'file:sound/dac.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/williams/williams.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:williams_state.williams_b1'}), (b:KG {id: 'file:src/mame/williams/williams.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1586, sourceColumn: 1, sourceEndLine: 1591};
MATCH (a:KG {id: 'machine:williams_state.williams_b1'}), (b:KG {id: 'handler:williams_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:williams_state.williams_b1'}), (b:KG {id: 'handler:williams_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:williams_state.williams_b1'}), (b:KG {id: 'machine:williams_state.williams_base'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:williams_state.williams_b1'}), (b:KG {id: 'map:williams_state.main_map_blitter'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:williams_state.williams_b1'}), (b:KG {id: 'device:williams_state.williams_b1/blitter'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:robotron'}), (b:KG {id: 'file:src/mame/williams/williams.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 941, sourceColumn: 8, sourceEndLine: 941};
MATCH (a:KG {id: 'inputs:robotron'}), (b:KG {id: 'inputs:robotron/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:robotron'}), (b:KG {id: 'inputs:robotron/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:robotron'}), (b:KG {id: 'inputs:robotron/IN2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:robotron'}), (b:KG {id: 'file:src/mame/williams/williams.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 2729, sourceColumn: 1, sourceEndLine: 2729};
MATCH (a:KG {id: 'romset:robotron'}), (b:KG {id: 'region:robotron/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:robotron'}), (b:KG {id: 'region:robotron/soundcpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:robotron'}), (b:KG {id: 'region:robotron/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'machine:williams_state.williams_base'}), (b:KG {id: 'file:src/mame/williams/williams.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 1534, sourceColumn: 1, sourceEndLine: 1584};
MATCH (a:KG {id: 'machine:williams_state.williams_base'}), (b:KG {id: 'handler:williams_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:williams_state.williams_base'}), (b:KG {id: 'handler:williams_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:williams_state.williams_base'}), (b:KG {id: 'device:williams_state.williams_base/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:williams_state.williams_base'}), (b:KG {id: 'device:williams_state.williams_base/soundcpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:williams_state.williams_base'}), (b:KG {id: 'device:williams_state.williams_base/nvram'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:williams_state.williams_base'}), (b:KG {id: 'device:williams_state.williams_base/scan_timer'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:williams_state.williams_base'}), (b:KG {id: 'device:williams_state.williams_base/240_timer'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:williams_state.williams_base'}), (b:KG {id: 'device:williams_state.williams_base/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:williams_state.williams_base'}), (b:KG {id: 'device:williams_state.williams_base/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:williams_state.williams_base'}), (b:KG {id: 'device:williams_state.williams_base/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:williams_state.williams_base'}), (b:KG {id: 'device:williams_state.williams_base/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:williams_state.williams_base'}), (b:KG {id: 'device:williams_state.williams_base/dac'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:williams_state.williams_base'}), (b:KG {id: 'device:williams_state.williams_base/mainirq'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:williams_state.williams_base'}), (b:KG {id: 'device:williams_state.williams_base/soundirq'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:williams_state.williams_base'}), (b:KG {id: 'device:williams_state.williams_base/pia_0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:williams_state.williams_base'}), (b:KG {id: 'device:williams_state.williams_base/pia_1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:williams_state.williams_base'}), (b:KG {id: 'device:williams_state.williams_base/pia_2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:williams_state.main_map_blitter'}), (b:KG {id: 'file:src/mame/williams/williams.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 545, sourceColumn: 1, sourceEndLine: 549};
MATCH (a:KG {id: 'map:williams_state.main_map_blitter'}), (b:KG {id: 'map:williams_state.main_map'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:williams_state.main_map_blitter'}), (b:KG {id: 'map:williams_state.main_map_blitter/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'inputs:robotron/IN0'}), (b:KG {id: 'inputs:robotron/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:robotron/IN0'}), (b:KG {id: 'inputs:robotron/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:robotron/IN0'}), (b:KG {id: 'inputs:robotron/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:robotron/IN0'}), (b:KG {id: 'inputs:robotron/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:robotron/IN0'}), (b:KG {id: 'inputs:robotron/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:robotron/IN0'}), (b:KG {id: 'inputs:robotron/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:robotron/IN0'}), (b:KG {id: 'inputs:robotron/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:robotron/IN0'}), (b:KG {id: 'inputs:robotron/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:robotron/IN1'}), (b:KG {id: 'inputs:robotron/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:robotron/IN1'}), (b:KG {id: 'inputs:robotron/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:robotron/IN1'}), (b:KG {id: 'inputs:robotron/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:robotron/IN2'}), (b:KG {id: 'inputs:robotron/IN2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:robotron/IN2'}), (b:KG {id: 'inputs:robotron/IN2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:robotron/IN2'}), (b:KG {id: 'inputs:robotron/IN2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:robotron/IN2'}), (b:KG {id: 'inputs:robotron/IN2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:robotron/IN2'}), (b:KG {id: 'inputs:robotron/IN2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:robotron/IN2'}), (b:KG {id: 'inputs:robotron/IN2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:robotron/IN2'}), (b:KG {id: 'inputs:robotron/IN2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:robotron/IN2'}), (b:KG {id: 'inputs:robotron/IN2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:robotron/maincpu'}), (b:KG {id: 'rom:robotron/maincpu/2084_rom_1b_3005-13.e4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:robotron/maincpu'}), (b:KG {id: 'rom:robotron/maincpu/2084_rom_2b_3005-14.c4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:robotron/maincpu'}), (b:KG {id: 'rom:robotron/maincpu/2084_rom_3b_3005-15.a4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:robotron/maincpu'}), (b:KG {id: 'rom:robotron/maincpu/2084_rom_4b_3005-16.e5'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:robotron/maincpu'}), (b:KG {id: 'rom:robotron/maincpu/2084_rom_5b_3005-17.c5'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:robotron/maincpu'}), (b:KG {id: 'rom:robotron/maincpu/2084_rom_6b_3005-18.a5'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:robotron/maincpu'}), (b:KG {id: 'rom:robotron/maincpu/2084_rom_7b_3005-19.e6'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:robotron/maincpu'}), (b:KG {id: 'rom:robotron/maincpu/2084_rom_8b_3005-20.c6'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:robotron/maincpu'}), (b:KG {id: 'rom:robotron/maincpu/2084_rom_9b_3005-21.a6'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:robotron/maincpu'}), (b:KG {id: 'rom:robotron/maincpu/2084_rom_10b_3005-22.a7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:robotron/maincpu'}), (b:KG {id: 'rom:robotron/maincpu/2084_rom_11b_3005-23.c7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:robotron/maincpu'}), (b:KG {id: 'rom:robotron/maincpu/2084_rom_12b_3005-24.e7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:robotron/soundcpu'}), (b:KG {id: 'rom:robotron/soundcpu/video_sound_rom_3_std_767.ic12'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:robotron/proms'}), (b:KG {id: 'rom:robotron/proms/decoder_rom_4.3g'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:robotron/proms'}), (b:KG {id: 'rom:robotron/proms/decoder_rom_6.3c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/maincpu'}), (b:KG {id: 'map:williams_state.main_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:williams_state.williams_base/soundcpu'}), (b:KG {id: 'map:williams_state.sound_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:williams_state.williams_base/scan_timer'}), (b:KG {id: 'device:williams_state.williams_base/scan_timer/callback:scan_timer:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/240_timer'}), (b:KG {id: 'device:williams_state.williams_base/240_timer/callback:240_timer:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/screen'}), (b:KG {id: 'device:williams_state.williams_base/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/palette'}), (b:KG {id: 'device:williams_state.williams_base/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/dac'}), (b:KG {id: 'audioroute:device:williams_state.williams_base/dac/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/mainirq'}), (b:KG {id: 'device:williams_state.williams_base/mainirq/callback:mainirq:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/soundirq'}), (b:KG {id: 'device:williams_state.williams_base/soundirq/callback:soundirq:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/pia_0'}), (b:KG {id: 'device:williams_state.williams_base/pia_0/callback:pia_0:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/pia_0'}), (b:KG {id: 'device:williams_state.williams_base/pia_0/callback:pia_0:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/pia_1'}), (b:KG {id: 'device:williams_state.williams_base/pia_1/callback:pia_1:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/pia_1'}), (b:KG {id: 'device:williams_state.williams_base/pia_1/callback:pia_1:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/pia_1'}), (b:KG {id: 'device:williams_state.williams_base/pia_1/callback:pia_1:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/pia_1'}), (b:KG {id: 'device:williams_state.williams_base/pia_1/callback:pia_1:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/pia_2'}), (b:KG {id: 'device:williams_state.williams_base/pia_2/callback:pia_2:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/pia_2'}), (b:KG {id: 'device:williams_state.williams_base/pia_2/callback:pia_2:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/pia_2'}), (b:KG {id: 'device:williams_state.williams_base/pia_2/callback:pia_2:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'map:williams_state.main_map'}), (b:KG {id: 'file:src/mame/williams/williams.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 530, sourceColumn: 1, sourceEndLine: 543};
MATCH (a:KG {id: 'map:williams_state.main_map'}), (b:KG {id: 'map:williams_state.main_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:williams_state.main_map'}), (b:KG {id: 'map:williams_state.main_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:williams_state.main_map'}), (b:KG {id: 'map:williams_state.main_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:williams_state.main_map'}), (b:KG {id: 'map:williams_state.main_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:williams_state.main_map'}), (b:KG {id: 'map:williams_state.main_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:williams_state.main_map'}), (b:KG {id: 'map:williams_state.main_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:williams_state.main_map'}), (b:KG {id: 'map:williams_state.main_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:williams_state.main_map'}), (b:KG {id: 'map:williams_state.main_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:williams_state.main_map'}), (b:KG {id: 'map:williams_state.main_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:williams_state.main_map'}), (b:KG {id: 'map:williams_state.main_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:williams_state.main_map'}), (b:KG {id: 'map:williams_state.main_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:williams_state.sound_map'}), (b:KG {id: 'file:src/mame/williams/williams.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/williams/williams.cpp', sourceLine: 691, sourceColumn: 1, sourceEndLine: 697};
MATCH (a:KG {id: 'map:williams_state.sound_map'}), (b:KG {id: 'map:williams_state.sound_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:williams_state.sound_map'}), (b:KG {id: 'map:williams_state.sound_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:williams_state.sound_map'}), (b:KG {id: 'map:williams_state.sound_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:williams_state.sound_map'}), (b:KG {id: 'map:williams_state.sound_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/scan_timer/callback:scan_timer:0'}), (b:KG {id: 'handler:williams_state.va11_callback'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/240_timer/callback:240_timer:0'}), (b:KG {id: 'handler:williams_state.count240_callback'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/screen/callback:screen:0'}), (b:KG {id: 'handler:williams_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/palette/callback:palette_init'}), (b:KG {id: 'handler:williams_state.palette_init'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/mainirq/callback:mainirq:0'}), (b:KG {id: 'device:williams_state.williams_base/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/soundirq/callback:soundirq:0'}), (b:KG {id: 'device:williams_state.williams_base/soundcpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/pia_1/callback:pia_1:1'}), (b:KG {id: 'handler:williams_state.snd_cmd_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/pia_1/callback:pia_1:2'}), (b:KG {id: 'handler:input_merger_any_high_device.in_w_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/pia_1/callback:pia_1:2'}), (b:KG {id: 'device:williams_state.williams_base/mainirq'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/pia_1/callback:pia_1:3'}), (b:KG {id: 'handler:input_merger_any_high_device.in_w_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/pia_1/callback:pia_1:3'}), (b:KG {id: 'device:williams_state.williams_base/mainirq'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/pia_2/callback:pia_2:0'}), (b:KG {id: 'handler:dac_byte_interface.data_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/pia_2/callback:pia_2:0'}), (b:KG {id: 'device:williams_state.williams_base/dac'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/pia_2/callback:pia_2:1'}), (b:KG {id: 'handler:input_merger_any_high_device.in_w_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/pia_2/callback:pia_2:1'}), (b:KG {id: 'device:williams_state.williams_base/soundirq'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/pia_2/callback:pia_2:2'}), (b:KG {id: 'handler:input_merger_any_high_device.in_w_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:williams_state.williams_base/pia_2/callback:pia_2:2'}), (b:KG {id: 'device:williams_state.williams_base/soundirq'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'map:williams_state.main_map/range4'}), (b:KG {id: 'handler:pia6821_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'pia_0'};
MATCH (a:KG {id: 'map:williams_state.main_map/range4'}), (b:KG {id: 'handler:pia6821_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'pia_0'};
MATCH (a:KG {id: 'map:williams_state.main_map/range5'}), (b:KG {id: 'handler:pia6821_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'pia_1'};
MATCH (a:KG {id: 'map:williams_state.main_map/range5'}), (b:KG {id: 'handler:pia6821_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'pia_1'};
MATCH (a:KG {id: 'map:williams_state.main_map/range6'}), (b:KG {id: 'handler:williams_state.vram_select_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:williams_state.main_map/range7'}), (b:KG {id: 'handler:williams_state.video_counter_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:williams_state.main_map/range8'}), (b:KG {id: 'handler:williams_state.watchdog_reset_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:williams_state.main_map/range9'}), (b:KG {id: 'handler:williams_state.cmos_4bit_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:williams_state.sound_map/range2'}), (b:KG {id: 'handler:pia6821_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'pia_2'};
MATCH (a:KG {id: 'map:williams_state.sound_map/range2'}), (b:KG {id: 'handler:pia6821_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'pia_2'};
MATCH (a:KG {id: 'handler:williams_state.snd_cmd_w'}), (b:KG {id: 'handler:williams_state.deferred_snd_cmd_w_2'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
