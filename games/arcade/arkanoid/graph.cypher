// mamekit knowledge graph — driver src/mame/taito/arkanoid.cpp
// generated 2026-09-05T03:49:18.133Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/taito/arkanoid.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/taito/arkanoid.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:arkanoid.h'}) SET n:SourceFile SET n += {path: 'arkanoid.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:sound/ay8910.h'}) SET n:SourceFile SET n += {path: 'sound/ay8910.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:taito68705.h'}) SET n:SourceFile SET n += {path: 'taito68705.h', external: true};
MERGE (n:KG {id: 'file:src/mame/shared/taito68705.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/shared/taito68705.cpp'};
MERGE (n:KG {id: 'game:arkanoid'}) SET n:Game SET n += {name: 'arkanoid', year: '1986', company: 'Taito', fullname: 'Arkanoid (World, older)', monitor: 'ROT90', cls: 'arkanoid_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 2329, sourceColumn: 1, sourceEndLine: 2329};
MERGE (n:KG {id: 'romset:arkanoid'}) SET n:RomSet SET n += {name: 'arkanoid', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1554, sourceColumn: 1, sourceEndLine: 1554};
MERGE (n:KG {id: 'region:arkanoid/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1555, sourceColumn: 2, sourceEndLine: 1555};
MERGE (n:KG {id: 'rom:arkanoid/maincpu/a75__01-1.ic17'}) SET n:Rom SET n += {file: 'a75__01-1.ic17', offset: 0, size: 32768, crc: '5bcda3b0', sha1: '52cadd38b5f8e8856f007a9c602d6b508f30be65', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1556, sourceColumn: 2, sourceEndLine: 1556};
MERGE (n:KG {id: 'rom:arkanoid/maincpu/a75__11.ic16'}) SET n:Rom SET n += {file: 'a75__11.ic16', offset: 32768, size: 32768, crc: 'eafd7191', sha1: 'd2f8843b716718b1de209e97a874e8ce600f3f87', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1557, sourceColumn: 2, sourceEndLine: 1557};
MERGE (n:KG {id: 'region:arkanoid/mcu:mcu'}) SET n:RomRegion SET n += {tag: 'mcu:mcu', size: 2048, flags: '0', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1559, sourceColumn: 2, sourceEndLine: 1559};
MERGE (n:KG {id: 'rom:arkanoid/mcu:mcu/a75__06.ic14'}) SET n:Rom SET n += {file: 'a75__06.ic14', offset: 0, size: 2048, crc: '0be83647', sha1: '625fd1e6061123df612f115ef14a06cd6009f5d1', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1560, sourceColumn: 2, sourceEndLine: 1560};
MERGE (n:KG {id: 'region:arkanoid/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 98304, flags: '0', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1562, sourceColumn: 2, sourceEndLine: 1562};
MERGE (n:KG {id: 'rom:arkanoid/gfx1/a75__03.ic64'}) SET n:Rom SET n += {file: 'a75__03.ic64', offset: 0, size: 32768, crc: '038b74ba', sha1: 'ac053cc4908b4075f918748b89570e07a0ba5116', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1563, sourceColumn: 2, sourceEndLine: 1563};
MERGE (n:KG {id: 'rom:arkanoid/gfx1/a75__04.ic63'}) SET n:Rom SET n += {file: 'a75__04.ic63', offset: 32768, size: 32768, crc: '71fae199', sha1: '5d253c46ccf4cd2976a5fb8b8713f0f345443d06', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1564, sourceColumn: 2, sourceEndLine: 1564};
MERGE (n:KG {id: 'rom:arkanoid/gfx1/a75__05.ic62'}) SET n:Rom SET n += {file: 'a75__05.ic62', offset: 65536, size: 32768, crc: 'c76374e2', sha1: '7520dd48de20db60a2038f134dcaa454988e7874', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1565, sourceColumn: 2, sourceEndLine: 1565};
MERGE (n:KG {id: 'region:arkanoid/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 1536, flags: '0', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1567, sourceColumn: 2, sourceEndLine: 1567};
MERGE (n:KG {id: 'rom:arkanoid/proms/a75-07.ic24'}) SET n:Rom SET n += {file: 'a75-07.ic24', offset: 0, size: 512, crc: '0af8b289', sha1: '6bc589e8a609b4cf450aebedc8ce02d5d45c970f', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1568, sourceColumn: 2, sourceEndLine: 1568};
MERGE (n:KG {id: 'rom:arkanoid/proms/a75-08.ic23'}) SET n:Rom SET n += {file: 'a75-08.ic23', offset: 512, size: 512, crc: 'abb002fb', sha1: 'c14f56b8ef103600862e7930709d293b0aa97a73', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1569, sourceColumn: 2, sourceEndLine: 1569};
MERGE (n:KG {id: 'rom:arkanoid/proms/a75-09.ic22'}) SET n:Rom SET n += {file: 'a75-09.ic22', offset: 1024, size: 512, crc: 'a7c6c277', sha1: 'adaa003dcd981576ea1cc5f697d709b2d6b2ea29', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1570, sourceColumn: 2, sourceEndLine: 1570};
MERGE (n:KG {id: 'region:arkanoid/alt_mcus'}) SET n:RomRegion SET n += {tag: 'alt_mcus', size: 6144, flags: '0', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1573, sourceColumn: 2, sourceEndLine: 1573};
MERGE (n:KG {id: 'rom:arkanoid/alt_mcus/arkanoid_mcu.ic14'}) SET n:Rom SET n += {file: 'arkanoid_mcu.ic14', offset: 0, size: 2048, crc: '4e44b50a', sha1: 'c61e7d158dc8e2b003c8158053ec139b904599af', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1574, sourceColumn: 2, sourceEndLine: 1574};
MERGE (n:KG {id: 'rom:arkanoid/alt_mcus/a75-06__bootleg_68705.ic14'}) SET n:Rom SET n += {file: 'a75-06__bootleg_68705.ic14', offset: 2048, size: 2048, crc: '515d77b6', sha1: 'a302937683d11f663abd56a2fd7c174374e4d7fb', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1581, sourceColumn: 2, sourceEndLine: 1581};
MERGE (n:KG {id: 'rom:arkanoid/alt_mcus/arkanoid1_68705p3.ic14'}) SET n:Rom SET n += {file: 'arkanoid1_68705p3.ic14', offset: 4096, size: 2048, crc: '1b68e2d8', sha1: 'f642a7cb624ee14fb0e410de5ae1fc799d2fa1c2', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1586, sourceColumn: 2, sourceEndLine: 1586};
MERGE (n:KG {id: 'map:arkanoid_state.arkanoid_map'}) SET n:AddressMap SET n += {cls: 'arkanoid_state', name: 'arkanoid_map', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 833, sourceColumn: 1, sourceEndLine: 848};
MERGE (n:KG {id: 'map:arkanoid_state.arkanoid_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 49151, raw: 'map(0x0000, 0xbfff).rom()', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 835, sourceColumn: 2, sourceEndLine: 835, rom: true};
MERGE (n:KG {id: 'map:arkanoid_state.arkanoid_map/range1'}) SET n:AddressRange SET n += {start: 49152, end: 51199, raw: 'map(0xc000, 0xc7ff).ram().mirror(0x0800)', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 836, sourceColumn: 2, sourceEndLine: 836, mirror: 2048, ram: true};
MERGE (n:KG {id: 'map:arkanoid_state.arkanoid_map/range2'}) SET n:AddressRange SET n += {start: 53248, end: 53249, raw: 'map(0xd000, 0xd001).w("aysnd", FUNC(ay8910_device::address_data_w)).mirror(0x0fe6)', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 837, sourceColumn: 2, sourceEndLine: 837, mirror: 4070};
MERGE (n:KG {id: 'handler:ay8910_device.address_data_w'}) SET n:Handler SET n += {method: 'address_data_w', ownerClass: 'ay8910_device', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 895, sourceColumn: 2, sourceEndLine: 895};
MERGE (n:KG {id: 'map:arkanoid_state.arkanoid_map/range3'}) SET n:AddressRange SET n += {start: 53249, end: 53249, raw: 'map(0xd001, 0xd001).r("aysnd", FUNC(ay8910_device::data_r)).mirror(0x0fe6)', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 838, sourceColumn: 2, sourceEndLine: 838, mirror: 4070};
MERGE (n:KG {id: 'handler:ay8910_device.data_r'}) SET n:Handler SET n += {method: 'data_r', ownerClass: 'ay8910_device', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 935, sourceColumn: 2, sourceEndLine: 935};
MERGE (n:KG {id: 'map:arkanoid_state.arkanoid_map/range4'}) SET n:AddressRange SET n += {start: 53256, end: 53256, raw: 'map(0xd008, 0xd008).w(FUNC(arkanoid_state::arkanoid_d008_w)).mirror(0x0fe7)', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 839, sourceColumn: 2, sourceEndLine: 839, mirror: 4071};
MERGE (n:KG {id: 'handler:arkanoid_state.arkanoid_d008_w'}) SET n:Handler SET n += {method: 'arkanoid_d008_w', ownerClass: 'arkanoid_state', sourceFile: 'src/mame/taito/arkanoid_v.cpp', sourceLine: 21, sourceColumn: 1, sourceEndLine: 60, sourceParameters: 'uint8_t data', sourceBody: 'int bank;

	/* bits 0 and 1 flip X and Y */
	flip_screen_x_set(data & 0x01);
	flip_screen_y_set(data & 0x02);

	/* bit 2 selects the input paddle */
	m_paddle_select = data & 0x04;

	/* bit 3 is coin lockout (but not the service coin) */
	machine().bookkeeping().coin_lockout_w(0, !(data & 0x08));
	machine().bookkeeping().coin_lockout_w(1, !(data & 0x08));

	/* bit 4 is unknown */

	/* bit 5 controls the graphics rom bank */
	bank = (data & 0x20) >> 5;

	if (m_gfxbank != bank)
	{
		m_gfxbank = bank;
		m_bg_tilemap->mark_all_dirty();
	}

	/* bit 6 controls the palette bank */
	bank = (data & 0x40) >> 6;

	if (m_palettebank != bank)
	{
		m_palettebank = bank;
		m_bg_tilemap->mark_all_dirty();
	}

	// bit 7 resets the MCU and semaphore flipflops
	// This bit is flipped early in bootup just prior to accessing the MCU for the first time.
	if (m_mcuintf.found()) // Bootlegs don\'t have the MCU but still set this bit
		m_mcuintf->reset_w(BIT(data, 7) ? CLEAR_LINE : ASSERT_LINE);'};
MERGE (n:KG {id: 'handler:taito68705_mcu_device_base.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'taito68705_mcu_device_base', sourceFile: 'src/mame/shared/taito68705.cpp', sourceLine: 77, sourceColumn: 1, sourceEndLine: 87, sourceParameters: 'int state', sourceBody: 'm_reset_input = ASSERT_LINE == state;
	if (CLEAR_LINE != state)
	{
		m_host_flag = false;
		m_mcu_flag = false;
		m_mcu->set_input_line(M68705_IRQ_LINE, CLEAR_LINE);
	}
	m_mcu->set_input_line(INPUT_LINE_RESET, state);'};
MERGE (n:KG {id: 'map:arkanoid_state.arkanoid_map/range5'}) SET n:AddressRange SET n += {start: 53256, end: 53256, raw: 'map(0xd008, 0xd008).portr("SYSTEM2").mirror(0x0fe3)', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 840, sourceColumn: 2, sourceEndLine: 840, mirror: 4067, portRead: 'SYSTEM2'};
MERGE (n:KG {id: 'map:arkanoid_state.arkanoid_map/range6'}) SET n:AddressRange SET n += {start: 53260, end: 53260, raw: 'map(0xd00c, 0xd00c).portr("SYSTEM").mirror(0x0fe3)', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 841, sourceColumn: 2, sourceEndLine: 841, mirror: 4067, portRead: 'SYSTEM'};
MERGE (n:KG {id: 'map:arkanoid_state.arkanoid_map/range7'}) SET n:AddressRange SET n += {start: 53264, end: 53264, raw: 'map(0xd010, 0xd010).portr("BUTTONS").w("watchdog", FUNC(watchdog_timer_device::reset_w)).mirror(0x0fe7)', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 842, sourceColumn: 2, sourceEndLine: 842, mirror: 4071, portRead: 'BUTTONS'};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 897, sourceColumn: 2, sourceEndLine: 897};
MERGE (n:KG {id: 'map:arkanoid_state.arkanoid_map/range8'}) SET n:AddressRange SET n += {start: 53272, end: 53272, raw: 'map(0xd018, 0xd018).rw(m_mcuintf, FUNC(arkanoid_mcu_device_base::data_r), FUNC(arkanoid_mcu_device_base::data_w)).mirror(0x0fe7)', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 843, sourceColumn: 2, sourceEndLine: 843, mirror: 4071};
MERGE (n:KG {id: 'handler:arkanoid_mcu_device_base.data_r'}) SET n:Handler SET n += {method: 'data_r', ownerClass: 'arkanoid_mcu_device_base', sourceFile: 'src/mame/shared/taito68705.cpp', sourceLine: 54, sourceColumn: 1, sourceEndLine: 64, sourceParameters: '', sourceBody: '// clear MCU semaphore flag and return data
	u8 const result(m_mcu_latch);
	if (!machine().side_effects_disabled())
	{
		m_mcu_flag = false;
		m_semaphore_cb(CLEAR_LINE);
	}
	return result;'};
MERGE (n:KG {id: 'handler:arkanoid_mcu_device_base.data_w'}) SET n:Handler SET n += {method: 'data_w', ownerClass: 'arkanoid_mcu_device_base', sourceFile: 'src/mame/shared/taito68705.cpp', sourceLine: 66, sourceColumn: 1, sourceEndLine: 75, sourceParameters: 'u8 data', sourceBody: '// set host semaphore flag and latch data
	if (!m_reset_input)
		m_host_flag = true;
	m_host_latch = data;
	if (m_latch_driven)
		m_mcu->pa_w(data);
	m_mcu->set_input_line(M68705_IRQ_LINE, m_host_flag ? ASSERT_LINE : CLEAR_LINE);'};
MERGE (n:KG {id: 'map:arkanoid_state.arkanoid_map/range9'}) SET n:AddressRange SET n += {start: 57344, end: 59391, raw: 'map(0xe000, 0xe7ff).ram().w(FUNC(arkanoid_state::arkanoid_videoram_w)).share("videoram")', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 844, sourceColumn: 2, sourceEndLine: 844, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'handler:arkanoid_state.arkanoid_videoram_w'}) SET n:Handler SET n += {method: 'arkanoid_videoram_w', ownerClass: 'arkanoid_state', sourceFile: 'src/mame/taito/arkanoid_v.cpp', sourceLine: 15, sourceColumn: 1, sourceEndLine: 19, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset / 2);'};
MERGE (n:KG {id: 'map:arkanoid_state.arkanoid_map/range10'}) SET n:AddressRange SET n += {start: 59392, end: 59455, raw: 'map(0xe800, 0xe83f).ram().share("spriteram")', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 845, sourceColumn: 2, sourceEndLine: 845, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:arkanoid_state.arkanoid_map/range11'}) SET n:AddressRange SET n += {start: 59456, end: 61439, raw: 'map(0xe840, 0xefff).ram()', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 846, sourceColumn: 2, sourceEndLine: 846, ram: true};
MERGE (n:KG {id: 'map:arkanoid_state.arkanoid_map/range12'}) SET n:AddressRange SET n += {start: 61440, end: 65535, raw: 'map(0xf000, 0xffff).nopr()', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 847, sourceColumn: 2, sourceEndLine: 847, nopr: true};
MERGE (n:KG {id: 'handler:arkanoid_state.input_mux_r'}) SET n:Handler SET n += {method: 'input_mux_r', ownerClass: 'arkanoid_state', sourceFile: 'src/mame/taito/arkanoid_m.cpp', sourceLine: 33, sourceColumn: 1, sourceEndLine: 36, sourceParameters: '', sourceBody: 'return m_muxports[(0 == m_paddle_select) ? 0 : 1].read_safe(0xff);', inputMembers: ['m_muxports=P1,P2']};
MERGE (n:KG {id: 'machine:arkanoid_state.arkanoid'}) SET n:MachineConfig SET n += {cls: 'arkanoid_state', name: 'arkanoid', calls: [], stateMembers: ['{"name":"m_gfxbank","bits":8}', '{"name":"m_palettebank","bits":8}', '{"name":"m_paddle_select","bits":8}', '{"name":"m_bootleg_id","bits":32,"signed":true}', '{"name":"m_bootleg_cmd","bits":8}', '{"name":"m_hexaa_from_main","bits":8}', '{"name":"m_hexaa_from_sub","bits":8}'], resetHandlers: ['arkanoid_state.machine_reset'], startHandlers: ['arkanoid_state.video_start'], sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1356, sourceColumn: 1, sourceEndLine: 1387};
MERGE (n:KG {id: 'handler:arkanoid_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'arkanoid_state', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1345, sourceColumn: 1, sourceEndLine: 1353, sourceParameters: '', sourceBody: 'm_gfxbank = 0;
	m_palettebank = 0;

	m_paddle_select = 0;

	m_bootleg_cmd = 0;'};
MERGE (n:KG {id: 'handler:arkanoid_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'arkanoid_state', sourceFile: 'src/mame/taito/arkanoid_v.cpp', sourceLine: 170, sourceColumn: 1, sourceEndLine: 173, sourceParameters: '', sourceBody: 'm_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(arkanoid_state::get_bg_tile_info)), TILEMAP_SCAN_ROWS, 8, 8, 32, 32);'};
MERGE (n:KG {id: 'handler:arkanoid_state.get_bg_tile_info'}) SET n:Handler SET n += {method: 'get_bg_tile_info', ownerClass: 'arkanoid_state', sourceFile: 'src/mame/taito/arkanoid_v.cpp', sourceLine: 161, sourceColumn: 1, sourceEndLine: 168, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int offs = tile_index * 2;
	int code = m_videoram[offs + 1] + ((m_videoram[offs] & 0x07) << 8) + 2048 * m_gfxbank;
	int color = ((m_videoram[offs] & 0xf8) >> 3) + 32 * m_palettebank;

	tileinfo.set(0, code, color, 0);'};
MERGE (n:KG {id: 'device:arkanoid_state.arkanoid/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 6000000, config: ['Z80(config, m_maincpu, 12_MHz_XTAL/2)', 'm_maincpu->set_addrmap(AS_PROGRAM, &arkanoid_state::arkanoid_map)'], sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1359, sourceColumn: 2, sourceEndLine: 1359};
MERGE (n:KG {id: 'device:arkanoid_state.arkanoid/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog").set_vblank_count("screen", 128)'], sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1362, sourceColumn: 2, sourceEndLine: 1362};
MERGE (n:KG {id: 'device:arkanoid_state.arkanoid/mcu'}) SET n:Device SET n += {type: 'ARKANOID_68705P5', tag: 'mcu', clock: 3000000, config: ['ARKANOID_68705P5(config, m_mcuintf, 12_MHz_XTAL / 4)', 'm_mcuintf->portb_r_cb().set(FUNC(arkanoid_state::input_mux_r))'], cls: 'arkanoid_68705p5_device', clsHierarchy: ['arkanoid_68705p5_device', 'arkanoid_mcu_device_base', 'taito68705_mcu_device_base'], sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1364, sourceColumn: 2, sourceEndLine: 1364};
MERGE (n:KG {id: 'device:arkanoid_state.arkanoid/mcu/callback:mcu:0'}) SET n:Callback SET n += {signal: 'portb_r_cb', operation: 'set', raw: 'm_mcuintf->portb_r_cb().set(FUNC(arkanoid_state::input_mux_r))', ownerTag: 'mcu', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1365, sourceColumn: 2, sourceEndLine: 1365, targetClass: 'arkanoid_state', targetMethod: 'input_mux_r'};
MERGE (n:KG {id: 'device:arkanoid_state.arkanoid/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(12_MHz_XTAL/2, 384, 0, 256, 264, 16, 240)', 'm_screen->set_screen_update(FUNC(arkanoid_state::screen_update_arkanoid))', 'm_screen->set_palette(m_palette)', 'm_screen->screen_vblank().set_inputline(m_maincpu, 0, HOLD_LINE)'], sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1370, sourceColumn: 2, sourceEndLine: 1370, configCalls: ['set_raw(6000000,384,0,256,264,16,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6000000, 384, 0, 256, 264, 16, 240], screenRawExpr: ['12_MHz_XTAL/2', '384', '0', '256', '264', '16', '240']};
MERGE (n:KG {id: 'device:arkanoid_state.arkanoid/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(arkanoid_state::screen_update_arkanoid))', ownerTag: 'screen', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1372, sourceColumn: 2, sourceEndLine: 1372, targetClass: 'arkanoid_state', targetMethod: 'screen_update_arkanoid'};
MERGE (n:KG {id: 'handler:arkanoid_state.screen_update_arkanoid'}) SET n:Handler SET n += {method: 'screen_update_arkanoid', ownerClass: 'arkanoid_state', sourceFile: 'src/mame/taito/arkanoid_v.cpp', sourceLine: 206, sourceColumn: 1, sourceEndLine: 211, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'm_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0);
	draw_sprites(bitmap, cliprect);
	return 0;'};
MERGE (n:KG {id: 'handler:arkanoid_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'arkanoid_state', sourceFile: 'src/mame/taito/arkanoid_v.cpp', sourceLine: 175, sourceColumn: 1, sourceEndLine: 203, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'int offs;

	for (offs = 0; offs < m_spriteram.bytes(); offs += 4)
	{
		int sx, sy, code;

		sx = m_spriteram[offs];
		sy = 248 - m_spriteram[offs + 1];
		if (flip_screen_x())
			sx = 248 - sx;
		if (flip_screen_y())
			sy = 248 - sy;

		code = m_spriteram[offs + 3] + ((m_spriteram[offs + 2] & 0x03) << 8) + 1024 * m_gfxbank;

		m_gfxdecode->gfx(0)->transpen(bitmap,cliprect,
				2 * code,
				((m_spriteram[offs + 2] & 0xf8) >> 3) + 32 * m_palettebank,
				flip_screen_x(),flip_screen_y(),
				sx,sy + (flip_screen_y() ? 8 : -8),0);
		m_gfxdecode->gfx(0)->transpen(bitmap,cliprect,
				2 * code + 1,
				((m_spriteram[offs + 2] & 0xf8) >> 3) + 32 * m_palettebank,
				flip_screen_x(),flip_screen_y(),
				sx,sy,0);
	}'};
MERGE (n:KG {id: 'device:arkanoid_state.arkanoid/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set_inputline', raw: 'm_screen->screen_vblank().set_inputline(m_maincpu, 0, HOLD_LINE)', ownerTag: 'screen', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1374, sourceColumn: 2, sourceEndLine: 1374, inputLine: '0', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:arkanoid_state.arkanoid/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_arkanoid)'], sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1376, sourceColumn: 2, sourceEndLine: 1376, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:arkanoid_state.arkanoid/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, palette_device::RGB_444_PROMS, "proms", 512)'], sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1377, sourceColumn: 2, sourceEndLine: 1377, clockExpr: 'palette_device::RGB_444_PROMS'};
MERGE (n:KG {id: 'device:arkanoid_state.arkanoid/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1380, sourceColumn: 2, sourceEndLine: 1380};
MERGE (n:KG {id: 'device:arkanoid_state.arkanoid/aysnd'}) SET n:Device SET n += {type: 'YM2149', tag: 'aysnd', clock: 3000000, config: ['ym2149_device &aysnd(YM2149(config, "aysnd", 12_MHz_XTAL/4))', 'aysnd.set_flags(AY8910_SINGLE_OUTPUT | YM2149_PIN26_LOW)', 'aysnd.port_a_read_callback().set_ioport("UNUSED")', 'aysnd.port_b_read_callback().set_ioport("DSW")', 'aysnd.add_route(ALL_OUTPUTS, "mono", 0.66)'], sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1382, sourceColumn: 2, sourceEndLine: 1382, configCalls: ['set_flags(18)']};
MERGE (n:KG {id: 'audioroute:device:arkanoid_state.arkanoid/aysnd/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.66, raw: 'aysnd.add_route(ALL_OUTPUTS, "mono", 0.66)', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1386, sourceColumn: 2, sourceEndLine: 1386};
MERGE (n:KG {id: 'device:arkanoid_state.arkanoid/aysnd/callback:aysnd:0'}) SET n:Callback SET n += {signal: 'port_a_read_callback', operation: 'set_ioport', raw: 'aysnd.port_a_read_callback().set_ioport("UNUSED")', ownerTag: 'aysnd', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1384, sourceColumn: 2, sourceEndLine: 1384, targetTag: 'UNUSED', targetPort: 'UNUSED'};
MERGE (n:KG {id: 'device:arkanoid_state.arkanoid/aysnd/callback:aysnd:1'}) SET n:Callback SET n += {signal: 'port_b_read_callback', operation: 'set_ioport', raw: 'aysnd.port_b_read_callback().set_ioport("DSW")', ownerTag: 'aysnd', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1385, sourceColumn: 2, sourceEndLine: 1385, targetTag: 'DSW', targetPort: 'DSW'};
MERGE (n:KG {id: 'handler:taito68705_mcu_device_base.latch_control'}) SET n:Handler SET n += {method: 'latch_control', ownerClass: 'taito68705_mcu_device_base', sourceFile: 'src/mame/shared/taito68705.cpp', sourceLine: 139, sourceColumn: 1, sourceEndLine: 175, sourceParameters: 'u8 data, u8 &value, unsigned host_bit, unsigned mcu_bit', sourceBody: '// save this here to simulate latch propagation delays
	u8 const old_pa_value(pa_value());

	// rising edge clears the host semaphore flag
	if (BIT(data, host_bit))
	{
		m_latch_driven = false;
		m_mcu->pa_w(0xff);
		if (!BIT(value, host_bit))
		{
			m_host_flag = false;
			m_mcu->set_input_line(M68705_IRQ_LINE, CLEAR_LINE);
		}
	}
	else
	{
		m_latch_driven = true;
		m_mcu->pa_w(m_host_latch);
	}

	// PB2 sets the MCU semaphore when low
	if (!BIT(data, mcu_bit))
	{
		if (!m_reset_input)
			m_mcu_flag = true;

		// data is latched on falling edge
		if (BIT(value, mcu_bit))
			m_mcu_latch = old_pa_value;
	}

	value = data;
	if (!BIT(data, mcu_bit) && !m_reset_input)
		m_semaphore_cb(ASSERT_LINE);'};
MERGE (n:KG {id: 'handler:taito68705_mcu_device_base.pa_value'}) SET n:Handler SET n += {method: 'pa_value', ownerClass: 'taito68705_mcu_device_base', sourceFile: 'src/mame/shared/taito68705.h', sourceLine: 45, sourceColumn: 1, sourceEndLine: 45, sourceParameters: '', sourceBody: 'return m_pa_output & (m_latch_driven ? m_host_latch : 0xff);'};
MERGE (n:KG {id: 'handler:taito68705_mcu_device_base.host_flag'}) SET n:Handler SET n += {method: 'host_flag', ownerClass: 'taito68705_mcu_device_base', sourceFile: 'src/mame/shared/taito68705.h', sourceLine: 41, sourceColumn: 48, sourceEndLine: 43, sourceParameters: '', sourceBody: 'return m_host_flag;'};
MERGE (n:KG {id: 'handler:taito68705_mcu_device_base.mcu_flag'}) SET n:Handler SET n += {method: 'mcu_flag', ownerClass: 'taito68705_mcu_device_base', sourceFile: 'src/mame/shared/taito68705.h', sourceLine: 44, sourceColumn: 1, sourceEndLine: 44, sourceParameters: '', sourceBody: 'return m_mcu_flag;'};
MERGE (n:KG {id: 'machine:arkanoid_68705p5_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'arkanoid_68705p5_device', name: 'device_add_mconfig', calls: [], stateMembers: ['{"name":"m_latch_driven","bits":1}', '{"name":"m_reset_input","bits":1}', '{"name":"m_host_flag","bits":1}', '{"name":"m_mcu_flag","bits":1}', '{"name":"m_host_latch","bits":8}', '{"name":"m_mcu_latch","bits":8}', '{"name":"m_pa_output","bits":8}', '{"name":"m_pc_output","bits":8}'], sourceFile: 'src/mame/shared/taito68705.cpp', sourceLine: 342, sourceColumn: 1, sourceEndLine: 349};
MERGE (n:KG {id: 'device:arkanoid_68705p5_device.device_add_mconfig/mcu'}) SET n:Device SET n += {type: 'M68705P5', tag: 'mcu', clock: 3000000, config: ['M68705P5(config, m_mcu, DERIVED_CLOCK(1, 1))', 'm_mcu->portb_r().set(FUNC(arkanoid_68705p5_device::mcu_pb_r))', 'm_mcu->portc_r().set(FUNC(arkanoid_68705p5_device::mcu_pc_r))', 'm_mcu->porta_w().set(FUNC(arkanoid_68705p5_device::mcu_pa_w))', 'm_mcu->portc_w().set(FUNC(arkanoid_68705p5_device::mcu_pc_w))'], sourceFile: 'src/mame/shared/taito68705.cpp', sourceLine: 344, sourceColumn: 2, sourceEndLine: 344};
MERGE (n:KG {id: 'device:arkanoid_68705p5_device.device_add_mconfig/mcu/callback:mcu:0'}) SET n:Callback SET n += {signal: 'portb_r', operation: 'set', raw: 'm_mcu->portb_r().set(FUNC(arkanoid_68705p5_device::mcu_pb_r))', ownerTag: 'mcu', sourceFile: 'src/mame/shared/taito68705.cpp', sourceLine: 345, sourceColumn: 2, sourceEndLine: 345, targetClass: 'arkanoid_68705p5_device', targetMethod: 'mcu_pb_r'};
MERGE (n:KG {id: 'handler:arkanoid_68705p5_device.mcu_pb_r'}) SET n:Handler SET n += {method: 'mcu_pb_r', ownerClass: 'arkanoid_68705p5_device', sourceFile: 'src/mame/shared/taito68705.cpp', sourceLine: 285, sourceColumn: 1, sourceEndLine: 288, sourceParameters: '', sourceBody: 'return m_portb_r_cb();'};
MERGE (n:KG {id: 'device:arkanoid_68705p5_device.device_add_mconfig/mcu/callback:mcu:1'}) SET n:Callback SET n += {signal: 'portc_r', operation: 'set', raw: 'm_mcu->portc_r().set(FUNC(arkanoid_68705p5_device::mcu_pc_r))', ownerTag: 'mcu', sourceFile: 'src/mame/shared/taito68705.cpp', sourceLine: 346, sourceColumn: 2, sourceEndLine: 346, targetClass: 'arkanoid_68705p5_device', targetMethod: 'mcu_pc_r'};
MERGE (n:KG {id: 'handler:arkanoid_68705p5_device.mcu_pc_r'}) SET n:Handler SET n += {method: 'mcu_pc_r', ownerClass: 'arkanoid_68705p5_device', sourceFile: 'src/mame/shared/taito68705.cpp', sourceLine: 290, sourceColumn: 1, sourceEndLine: 295, sourceParameters: '', sourceBody: '// PC0 is the host semaphore flag (active high)
	// PC1 is the MCU semaphore flag (active low)
	return (host_flag() ? 0x01 : 0x00) | (mcu_flag() ? 0x00 : 0x02) | 0xfc;'};
MERGE (n:KG {id: 'device:arkanoid_68705p5_device.device_add_mconfig/mcu/callback:mcu:2'}) SET n:Callback SET n += {signal: 'porta_w', operation: 'set', raw: 'm_mcu->porta_w().set(FUNC(arkanoid_68705p5_device::mcu_pa_w))', ownerTag: 'mcu', sourceFile: 'src/mame/shared/taito68705.cpp', sourceLine: 347, sourceColumn: 2, sourceEndLine: 347, targetClass: 'arkanoid_68705p5_device', targetMethod: 'mcu_pa_w'};
MERGE (n:KG {id: 'handler:arkanoid_68705p5_device.mcu_pa_w'}) SET n:Handler SET n += {method: 'mcu_pa_w', ownerClass: 'arkanoid_68705p5_device', sourceFile: 'src/mame/shared/taito68705.cpp', sourceLine: 108, sourceColumn: 1, sourceEndLine: 111, sourceParameters: 'u8 data', sourceBody: 'm_pa_output = data;'};
MERGE (n:KG {id: 'device:arkanoid_68705p5_device.device_add_mconfig/mcu/callback:mcu:3'}) SET n:Callback SET n += {signal: 'portc_w', operation: 'set', raw: 'm_mcu->portc_w().set(FUNC(arkanoid_68705p5_device::mcu_pc_w))', ownerTag: 'mcu', sourceFile: 'src/mame/shared/taito68705.cpp', sourceLine: 348, sourceColumn: 2, sourceEndLine: 348, targetClass: 'arkanoid_68705p5_device', targetMethod: 'mcu_pc_w'};
MERGE (n:KG {id: 'handler:arkanoid_68705p5_device.mcu_pc_w'}) SET n:Handler SET n += {method: 'mcu_pc_w', ownerClass: 'arkanoid_68705p5_device', sourceFile: 'src/mame/shared/taito68705.cpp', sourceLine: 297, sourceColumn: 1, sourceEndLine: 302, sourceParameters: 'u8 data', sourceBody: '// rising edge on PC2 clears the host semaphore flag
	// PC3 sets the MCU semaphore when low
	latch_control(data, m_pc_output, 2, 3);'};
MERGE (n:KG {id: 'inputs:arkanoid'}) SET n:InputPorts SET n += {name: 'arkanoid', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1007, sourceColumn: 8, sourceEndLine: 1007};
MERGE (n:KG {id: 'inputs:arkanoid/SYSTEM'}) SET n:Port SET n += {tag: 'SYSTEM', modify: false};
MERGE (n:KG {id: 'inputs:arkanoid/SYSTEM/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_START1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:arkanoid/SYSTEM/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_START2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:arkanoid/SYSTEM/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_SERVICE1', defaultValue: 4};
MERGE (n:KG {id: 'inputs:arkanoid/SYSTEM/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_TILT', defaultValue: 8};
MERGE (n:KG {id: 'inputs:arkanoid/SYSTEM/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_COIN1', defaultValue: 0};
MERGE (n:KG {id: 'inputs:arkanoid/SYSTEM/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_COIN2', defaultValue: 0};
MERGE (n:KG {id: 'inputs:arkanoid/SYSTEM/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 192, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_CUSTOM_MEMBER(FUNC(arkanoid_state::arkanoid_semaphore_input_r))'], defaultValue: 0};
MERGE (n:KG {id: 'handler:arkanoid_state.arkanoid_semaphore_input_r'}) SET n:Handler SET n += {method: 'arkanoid_semaphore_input_r', ownerClass: 'arkanoid_state', sourceFile: 'src/mame/taito/arkanoid_m.cpp', sourceLine: 25, sourceColumn: 1, sourceEndLine: 31, sourceParameters: '', sourceBody: '// bit 0 is host semaphore flag, bit 1 is MCU semaphore flag (both active low)
	return
			((CLEAR_LINE != m_mcuintf->host_semaphore_r()) ? 0x00 : 0x01) |
			((CLEAR_LINE != m_mcuintf->mcu_semaphore_r()) ? 0x00 : 0x02);'};
MERGE (n:KG {id: 'handler:taito68705_mcu_device_base.mcu_semaphore_r'}) SET n:Handler SET n += {method: 'mcu_semaphore_r', ownerClass: 'taito68705_mcu_device_base', sourceFile: 'src/mame/shared/taito68705.h', sourceLine: 25, sourceColumn: 1, sourceEndLine: 25, sourceParameters: '', sourceBody: 'return m_mcu_flag ? 1 : 0;'};
MERGE (n:KG {id: 'handler:taito68705_mcu_device_base.host_semaphore_r'}) SET n:Handler SET n += {method: 'host_semaphore_r', ownerClass: 'taito68705_mcu_device_base', sourceFile: 'src/mame/shared/taito68705.h', sourceLine: 23, sourceColumn: 25, sourceEndLine: 24, sourceParameters: '', sourceBody: 'return m_host_flag ? 1 : 0;'};
MERGE (n:KG {id: 'inputs:arkanoid/SYSTEM2'}) SET n:Port SET n += {tag: 'SYSTEM2', modify: false};
MERGE (n:KG {id: 'inputs:arkanoid/SYSTEM2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 255};
MERGE (n:KG {id: 'inputs:arkanoid/BUTTONS'}) SET n:Port SET n += {tag: 'BUTTONS', modify: false};
MERGE (n:KG {id: 'inputs:arkanoid/BUTTONS/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:arkanoid/BUTTONS/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 2};
MERGE (n:KG {id: 'inputs:arkanoid/BUTTONS/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:arkanoid/BUTTONS/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 8};
MERGE (n:KG {id: 'inputs:arkanoid/BUTTONS/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 240, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 240};
MERGE (n:KG {id: 'inputs:arkanoid/DSW'}) SET n:Port SET n += {tag: 'DSW', modify: false};
MERGE (n:KG {id: 'inputs:arkanoid/DSW/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, modifiers: ['PORT_DIPLOCATION("SW1:8")'], name: 'Allow Continue', defaultValue: 0, location: 'SW1:8', settings: ['1=No', '0=Yes']};
MERGE (n:KG {id: 'inputs:arkanoid/DSW/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, modifiers: ['PORT_DIPLOCATION("SW1:7")'], name: 'Flip Screen', defaultValue: 2, location: 'SW1:7', settings: ['2=Off', '0=On']};
MERGE (n:KG {id: 'inputs:arkanoid/DSW/f2'}) SET n:PortField SET n += {kind: 'service', mask: 4, activeLow: true, defaultValue: 4};
MERGE (n:KG {id: 'inputs:arkanoid/DSW/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 8, modifiers: ['PORT_DIPLOCATION("SW1:5")'], name: 'Difficulty', defaultValue: 8, location: 'SW1:5', settings: ['8=Easy', '0=Hard']};
MERGE (n:KG {id: 'inputs:arkanoid/DSW/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 16, modifiers: ['PORT_DIPLOCATION("SW1:4")'], name: 'Bonus Life', defaultValue: 16, location: 'SW1:4', settings: ['16=20K 60K 60K+', '0=20K']};
MERGE (n:KG {id: 'inputs:arkanoid/DSW/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 32, modifiers: ['PORT_DIPLOCATION("SW1:3")'], name: 'Lives', defaultValue: 32, location: 'SW1:3', settings: ['32=3', '0=5']};
MERGE (n:KG {id: 'inputs:arkanoid/DSW/f6'}) SET n:PortField SET n += {kind: 'dip', mask: 192, modifiers: ['PORT_DIPLOCATION("SW1:1,2")'], name: 'Coinage', defaultValue: 192, location: 'SW1:1,2', settings: ['64=2C 1C', '192=1C 1C', '128=1C 2C', '0=1C 6C']};
MERGE (n:KG {id: 'inputs:arkanoid/UNUSED'}) SET n:Port SET n += {tag: 'UNUSED', modify: false};
MERGE (n:KG {id: 'inputs:arkanoid/UNUSED/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: true, type: 'IPT_UNUSED', defaultValue: 255};
MERGE (n:KG {id: 'inputs:arkanoid/P1'}) SET n:Port SET n += {tag: 'P1', modify: false};
MERGE (n:KG {id: 'inputs:arkanoid/P1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: false, type: 'IPT_DIAL', modifiers: ['PORT_SENSITIVITY(30)', 'PORT_KEYDELTA(15)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:arkanoid/P2'}) SET n:Port SET n += {tag: 'P2', modify: false};
MERGE (n:KG {id: 'inputs:arkanoid/P2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: false, type: 'IPT_DIAL', modifiers: ['PORT_SENSITIVITY(30)', 'PORT_KEYDELTA(15)', 'PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'gfxlayout:charlayout'}) SET n:GfxLayout SET n += {name: 'charlayout', width: 8, height: 8, total: 4096, planes: 3, planeOffsets: [524288, 262144, 0], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxdecode:gfx_arkanoid'}) SET n:GfxDecode SET n += {name: 'gfx_arkanoid', sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1323, sourceColumn: 8, sourceEndLine: 1323};
MERGE (n:KG {id: 'gfxdecode:gfx_arkanoid/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'charlayout', colorBase: 0, colorCount: 64, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:arkanoid'}), (b:KG {id: 'file:src/mame/taito/arkanoid.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 2329, sourceColumn: 1, sourceEndLine: 2329};
MATCH (a:KG {id: 'game:arkanoid'}), (b:KG {id: 'machine:arkanoid_state.arkanoid'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:arkanoid'}), (b:KG {id: 'inputs:arkanoid'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:arkanoid'}), (b:KG {id: 'romset:arkanoid'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/taito/arkanoid.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/taito/arkanoid.cpp'}), (b:KG {id: 'file:arkanoid.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/taito/arkanoid.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/taito/arkanoid.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/taito/arkanoid.cpp'}), (b:KG {id: 'file:sound/ay8910.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/taito/arkanoid.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:arkanoid_state.arkanoid'}), (b:KG {id: 'file:src/mame/taito/arkanoid.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1356, sourceColumn: 1, sourceEndLine: 1387};
MATCH (a:KG {id: 'machine:arkanoid_state.arkanoid'}), (b:KG {id: 'handler:arkanoid_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:arkanoid_state.arkanoid'}), (b:KG {id: 'handler:arkanoid_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:arkanoid_state.arkanoid'}), (b:KG {id: 'device:arkanoid_state.arkanoid/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:arkanoid_state.arkanoid'}), (b:KG {id: 'device:arkanoid_state.arkanoid/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:arkanoid_state.arkanoid'}), (b:KG {id: 'device:arkanoid_state.arkanoid/mcu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:arkanoid_state.arkanoid'}), (b:KG {id: 'device:arkanoid_state.arkanoid/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:arkanoid_state.arkanoid'}), (b:KG {id: 'device:arkanoid_state.arkanoid/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:arkanoid_state.arkanoid'}), (b:KG {id: 'gfxdecode:gfx_arkanoid'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:arkanoid_state.arkanoid'}), (b:KG {id: 'device:arkanoid_state.arkanoid/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:arkanoid_state.arkanoid'}), (b:KG {id: 'device:arkanoid_state.arkanoid/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:arkanoid_state.arkanoid'}), (b:KG {id: 'device:arkanoid_state.arkanoid/aysnd'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:arkanoid'}), (b:KG {id: 'file:src/mame/taito/arkanoid.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1007, sourceColumn: 8, sourceEndLine: 1007};
MATCH (a:KG {id: 'inputs:arkanoid'}), (b:KG {id: 'inputs:arkanoid/SYSTEM'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:arkanoid'}), (b:KG {id: 'inputs:arkanoid/SYSTEM2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:arkanoid'}), (b:KG {id: 'inputs:arkanoid/BUTTONS'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:arkanoid'}), (b:KG {id: 'inputs:arkanoid/DSW'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:arkanoid'}), (b:KG {id: 'inputs:arkanoid/UNUSED'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:arkanoid'}), (b:KG {id: 'inputs:arkanoid/P1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:arkanoid'}), (b:KG {id: 'inputs:arkanoid/P2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:arkanoid'}), (b:KG {id: 'file:src/mame/taito/arkanoid.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1554, sourceColumn: 1, sourceEndLine: 1554};
MATCH (a:KG {id: 'romset:arkanoid'}), (b:KG {id: 'region:arkanoid/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:arkanoid'}), (b:KG {id: 'region:arkanoid/mcu:mcu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:arkanoid'}), (b:KG {id: 'region:arkanoid/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:arkanoid'}), (b:KG {id: 'region:arkanoid/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:arkanoid'}), (b:KG {id: 'region:arkanoid/alt_mcus'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:arkanoid_state.video_start'}), (b:KG {id: 'handler:arkanoid_state.get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:arkanoid_state.arkanoid/maincpu'}), (b:KG {id: 'map:arkanoid_state.arkanoid_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:arkanoid_state.arkanoid/mcu'}), (b:KG {id: 'device:arkanoid_state.arkanoid/mcu/callback:mcu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:arkanoid_state.arkanoid/mcu'}), (b:KG {id: 'machine:arkanoid_68705p5_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'device:arkanoid_state.arkanoid/screen'}), (b:KG {id: 'device:arkanoid_state.arkanoid/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:arkanoid_state.arkanoid/screen'}), (b:KG {id: 'device:arkanoid_state.arkanoid/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_arkanoid'}), (b:KG {id: 'file:src/mame/taito/arkanoid.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 1323, sourceColumn: 8, sourceEndLine: 1323};
MATCH (a:KG {id: 'gfxdecode:gfx_arkanoid'}), (b:KG {id: 'gfxdecode:gfx_arkanoid/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:arkanoid_state.arkanoid/aysnd'}), (b:KG {id: 'audioroute:device:arkanoid_state.arkanoid/aysnd/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:arkanoid_state.arkanoid/aysnd'}), (b:KG {id: 'device:arkanoid_state.arkanoid/aysnd/callback:aysnd:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:arkanoid_state.arkanoid/aysnd'}), (b:KG {id: 'device:arkanoid_state.arkanoid/aysnd/callback:aysnd:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'inputs:arkanoid/SYSTEM'}), (b:KG {id: 'inputs:arkanoid/SYSTEM/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:arkanoid/SYSTEM'}), (b:KG {id: 'inputs:arkanoid/SYSTEM/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:arkanoid/SYSTEM'}), (b:KG {id: 'inputs:arkanoid/SYSTEM/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:arkanoid/SYSTEM'}), (b:KG {id: 'inputs:arkanoid/SYSTEM/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:arkanoid/SYSTEM'}), (b:KG {id: 'inputs:arkanoid/SYSTEM/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:arkanoid/SYSTEM'}), (b:KG {id: 'inputs:arkanoid/SYSTEM/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:arkanoid/SYSTEM'}), (b:KG {id: 'inputs:arkanoid/SYSTEM/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:arkanoid/SYSTEM2'}), (b:KG {id: 'inputs:arkanoid/SYSTEM2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:arkanoid/BUTTONS'}), (b:KG {id: 'inputs:arkanoid/BUTTONS/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:arkanoid/BUTTONS'}), (b:KG {id: 'inputs:arkanoid/BUTTONS/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:arkanoid/BUTTONS'}), (b:KG {id: 'inputs:arkanoid/BUTTONS/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:arkanoid/BUTTONS'}), (b:KG {id: 'inputs:arkanoid/BUTTONS/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:arkanoid/BUTTONS'}), (b:KG {id: 'inputs:arkanoid/BUTTONS/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:arkanoid/DSW'}), (b:KG {id: 'inputs:arkanoid/DSW/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:arkanoid/DSW'}), (b:KG {id: 'inputs:arkanoid/DSW/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:arkanoid/DSW'}), (b:KG {id: 'inputs:arkanoid/DSW/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:arkanoid/DSW'}), (b:KG {id: 'inputs:arkanoid/DSW/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:arkanoid/DSW'}), (b:KG {id: 'inputs:arkanoid/DSW/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:arkanoid/DSW'}), (b:KG {id: 'inputs:arkanoid/DSW/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:arkanoid/DSW'}), (b:KG {id: 'inputs:arkanoid/DSW/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:arkanoid/UNUSED'}), (b:KG {id: 'inputs:arkanoid/UNUSED/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:arkanoid/P1'}), (b:KG {id: 'inputs:arkanoid/P1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:arkanoid/P2'}), (b:KG {id: 'inputs:arkanoid/P2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:arkanoid/maincpu'}), (b:KG {id: 'rom:arkanoid/maincpu/a75__01-1.ic17'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:arkanoid/maincpu'}), (b:KG {id: 'rom:arkanoid/maincpu/a75__11.ic16'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:arkanoid/mcu:mcu'}), (b:KG {id: 'rom:arkanoid/mcu:mcu/a75__06.ic14'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:arkanoid/gfx1'}), (b:KG {id: 'rom:arkanoid/gfx1/a75__03.ic64'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:arkanoid/gfx1'}), (b:KG {id: 'rom:arkanoid/gfx1/a75__04.ic63'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:arkanoid/gfx1'}), (b:KG {id: 'rom:arkanoid/gfx1/a75__05.ic62'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:arkanoid/proms'}), (b:KG {id: 'rom:arkanoid/proms/a75-07.ic24'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:arkanoid/proms'}), (b:KG {id: 'rom:arkanoid/proms/a75-08.ic23'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:arkanoid/proms'}), (b:KG {id: 'rom:arkanoid/proms/a75-09.ic22'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:arkanoid/alt_mcus'}), (b:KG {id: 'rom:arkanoid/alt_mcus/arkanoid_mcu.ic14'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:arkanoid/alt_mcus'}), (b:KG {id: 'rom:arkanoid/alt_mcus/a75-06__bootleg_68705.ic14'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:arkanoid/alt_mcus'}), (b:KG {id: 'rom:arkanoid/alt_mcus/arkanoid1_68705p3.ic14'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'map:arkanoid_state.arkanoid_map'}), (b:KG {id: 'file:src/mame/taito/arkanoid.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/taito/arkanoid.cpp', sourceLine: 833, sourceColumn: 1, sourceEndLine: 848};
MATCH (a:KG {id: 'map:arkanoid_state.arkanoid_map'}), (b:KG {id: 'map:arkanoid_state.arkanoid_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:arkanoid_state.arkanoid_map'}), (b:KG {id: 'map:arkanoid_state.arkanoid_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:arkanoid_state.arkanoid_map'}), (b:KG {id: 'map:arkanoid_state.arkanoid_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:arkanoid_state.arkanoid_map'}), (b:KG {id: 'map:arkanoid_state.arkanoid_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:arkanoid_state.arkanoid_map'}), (b:KG {id: 'map:arkanoid_state.arkanoid_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:arkanoid_state.arkanoid_map'}), (b:KG {id: 'map:arkanoid_state.arkanoid_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:arkanoid_state.arkanoid_map'}), (b:KG {id: 'map:arkanoid_state.arkanoid_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:arkanoid_state.arkanoid_map'}), (b:KG {id: 'map:arkanoid_state.arkanoid_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:arkanoid_state.arkanoid_map'}), (b:KG {id: 'map:arkanoid_state.arkanoid_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:arkanoid_state.arkanoid_map'}), (b:KG {id: 'map:arkanoid_state.arkanoid_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:arkanoid_state.arkanoid_map'}), (b:KG {id: 'map:arkanoid_state.arkanoid_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:arkanoid_state.arkanoid_map'}), (b:KG {id: 'map:arkanoid_state.arkanoid_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:arkanoid_state.arkanoid_map'}), (b:KG {id: 'map:arkanoid_state.arkanoid_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:arkanoid_state.arkanoid/mcu/callback:mcu:0'}), (b:KG {id: 'handler:arkanoid_state.input_mux_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:arkanoid_68705p5_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/shared/taito68705.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/taito68705.cpp', sourceLine: 342, sourceColumn: 1, sourceEndLine: 349};
MATCH (a:KG {id: 'machine:arkanoid_68705p5_device.device_add_mconfig'}), (b:KG {id: 'device:arkanoid_68705p5_device.device_add_mconfig/mcu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'device:arkanoid_state.arkanoid/screen/callback:screen:0'}), (b:KG {id: 'handler:arkanoid_state.screen_update_arkanoid'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:arkanoid_state.arkanoid/screen/callback:screen:1'}), (b:KG {id: 'device:arkanoid_state.arkanoid/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_arkanoid/e0'}), (b:KG {id: 'gfxlayout:charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'inputs:arkanoid/SYSTEM/f6'}), (b:KG {id: 'handler:arkanoid_state.arkanoid_semaphore_input_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:arkanoid_state.arkanoid_map/range2'}), (b:KG {id: 'handler:ay8910_device.address_data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'aysnd'};
MATCH (a:KG {id: 'map:arkanoid_state.arkanoid_map/range3'}), (b:KG {id: 'handler:ay8910_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'aysnd'};
MATCH (a:KG {id: 'map:arkanoid_state.arkanoid_map/range4'}), (b:KG {id: 'handler:arkanoid_state.arkanoid_d008_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:arkanoid_state.arkanoid_map/range7'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:arkanoid_state.arkanoid_map/range8'}), (b:KG {id: 'handler:arkanoid_mcu_device_base.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'mcu'};
MATCH (a:KG {id: 'map:arkanoid_state.arkanoid_map/range8'}), (b:KG {id: 'handler:arkanoid_mcu_device_base.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'mcu'};
MATCH (a:KG {id: 'map:arkanoid_state.arkanoid_map/range9'}), (b:KG {id: 'handler:arkanoid_state.arkanoid_videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/taito68705.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/taito68705.cpp'}), (b:KG {id: 'file:taito68705.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/taito68705.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'device:arkanoid_68705p5_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:arkanoid_68705p5_device.device_add_mconfig/mcu/callback:mcu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:arkanoid_68705p5_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:arkanoid_68705p5_device.device_add_mconfig/mcu/callback:mcu:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:arkanoid_68705p5_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:arkanoid_68705p5_device.device_add_mconfig/mcu/callback:mcu:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:arkanoid_68705p5_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:arkanoid_68705p5_device.device_add_mconfig/mcu/callback:mcu:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'handler:arkanoid_state.screen_update_arkanoid'}), (b:KG {id: 'handler:arkanoid_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:charlayout'}), (b:KG {id: 'file:src/mame/taito/arkanoid.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'handler:arkanoid_state.arkanoid_semaphore_input_r'}), (b:KG {id: 'handler:taito68705_mcu_device_base.mcu_semaphore_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:arkanoid_state.arkanoid_semaphore_input_r'}), (b:KG {id: 'handler:taito68705_mcu_device_base.host_semaphore_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:arkanoid_state.arkanoid_d008_w'}), (b:KG {id: 'handler:taito68705_mcu_device_base.reset_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:arkanoid_68705p5_device.device_add_mconfig/mcu/callback:mcu:0'}), (b:KG {id: 'handler:arkanoid_68705p5_device.mcu_pb_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:arkanoid_68705p5_device.device_add_mconfig/mcu/callback:mcu:1'}), (b:KG {id: 'handler:arkanoid_68705p5_device.mcu_pc_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:arkanoid_68705p5_device.device_add_mconfig/mcu/callback:mcu:2'}), (b:KG {id: 'handler:arkanoid_68705p5_device.mcu_pa_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:arkanoid_68705p5_device.device_add_mconfig/mcu/callback:mcu:3'}), (b:KG {id: 'handler:arkanoid_68705p5_device.mcu_pc_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:arkanoid_68705p5_device.mcu_pc_r'}), (b:KG {id: 'handler:taito68705_mcu_device_base.host_flag'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:arkanoid_68705p5_device.mcu_pc_r'}), (b:KG {id: 'handler:taito68705_mcu_device_base.mcu_flag'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:arkanoid_68705p5_device.mcu_pc_w'}), (b:KG {id: 'handler:taito68705_mcu_device_base.latch_control'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:taito68705_mcu_device_base.latch_control'}), (b:KG {id: 'handler:taito68705_mcu_device_base.pa_value'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
