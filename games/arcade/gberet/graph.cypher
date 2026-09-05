// mamekit knowledge graph — driver src/mame/konami/gberet.cpp
// generated 2026-09-05T03:49:35.466Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/konami/gberet.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/konami/gberet.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:konamipt.h'}) SET n:SourceFile SET n += {path: 'konamipt.h', external: true};
MERGE (n:KG {id: 'file:k005849.h'}) SET n:SourceFile SET n += {path: 'k005849.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:machine/input_merger.h'}) SET n:SourceFile SET n += {path: 'machine/input_merger.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:sound/sn76496.h'}) SET n:SourceFile SET n += {path: 'sound/sn76496.h', external: true};
MERGE (n:KG {id: 'file:emupal.h'}) SET n:SourceFile SET n += {path: 'emupal.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:tilemap.h'}) SET n:SourceFile SET n += {path: 'tilemap.h', external: true};
MERGE (n:KG {id: 'game:gberet'}) SET n:Game SET n += {name: 'gberet', year: '1985', company: 'Konami', fullname: 'Green Beret', monitor: 'ROT0', cls: 'gberet_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 897, sourceColumn: 1, sourceEndLine: 897};
MERGE (n:KG {id: 'romset:gberet'}) SET n:RomSet SET n += {name: 'gberet', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 797, sourceColumn: 1, sourceEndLine: 797};
MERGE (n:KG {id: 'region:gberet/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 49152, flags: '0', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 798, sourceColumn: 2, sourceEndLine: 798};
MERGE (n:KG {id: 'rom:gberet/maincpu/577l03.10c'}) SET n:Rom SET n += {file: '577l03.10c', offset: 0, size: 16384, crc: 'ae29e4ff', sha1: '5c66de1403c5df5b6647bb37e26070ffd33590e8', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 799, sourceColumn: 2, sourceEndLine: 799};
MERGE (n:KG {id: 'rom:gberet/maincpu/577l02.8c'}) SET n:Rom SET n += {file: '577l02.8c', offset: 16384, size: 16384, crc: '240836a5', sha1: 'b76f3789f152198bf8a9a366378d664e683c6c9d', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 800, sourceColumn: 2, sourceEndLine: 800};
MERGE (n:KG {id: 'rom:gberet/maincpu/577l01.7c'}) SET n:Rom SET n += {file: '577l01.7c', offset: 32768, size: 16384, crc: '41fa3e1f', sha1: '90d1463e16b0f52c01078be044ce3672d4acebff', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 801, sourceColumn: 2, sourceEndLine: 801};
MERGE (n:KG {id: 'region:gberet/tiles'}) SET n:RomRegion SET n += {tag: 'tiles', size: 16384, flags: '0', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 803, sourceColumn: 2, sourceEndLine: 803};
MERGE (n:KG {id: 'rom:gberet/tiles/577l07.3f'}) SET n:Rom SET n += {file: '577l07.3f', offset: 0, size: 16384, crc: '4da7bd1b', sha1: '54adba9ae086852902d78ab36039498aae50d7a9', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 804, sourceColumn: 2, sourceEndLine: 804};
MERGE (n:KG {id: 'region:gberet/sprites'}) SET n:RomRegion SET n += {tag: 'sprites', size: 65536, flags: '0', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 806, sourceColumn: 2, sourceEndLine: 806};
MERGE (n:KG {id: 'rom:gberet/sprites/577l06.5e'}) SET n:Rom SET n += {file: '577l06.5e', offset: 0, size: 16384, crc: '0f1cb0ca', sha1: '094004e70c05df8cd486d0854c258fa766e2925d', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 807, sourceColumn: 2, sourceEndLine: 807};
MERGE (n:KG {id: 'rom:gberet/sprites/577l05.4e'}) SET n:Rom SET n += {file: '577l05.4e', offset: 16384, size: 16384, crc: '523a8b66', sha1: '5f2bcf2b702fe05f8a022b6284cb2d0a5b5f222f', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 808, sourceColumn: 2, sourceEndLine: 808};
MERGE (n:KG {id: 'rom:gberet/sprites/577l08.4f'}) SET n:Rom SET n += {file: '577l08.4f', offset: 32768, size: 16384, crc: '883933a4', sha1: 'b565842edf09feeb2c4ac44ad58331757586b6aa', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 809, sourceColumn: 2, sourceEndLine: 809};
MERGE (n:KG {id: 'rom:gberet/sprites/577l04.3e'}) SET n:Rom SET n += {file: '577l04.3e', offset: 49152, size: 16384, crc: 'ccecda4c', sha1: 'cac053cab68cb420edd408ce032143db7abc29f5', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 810, sourceColumn: 2, sourceEndLine: 810};
MERGE (n:KG {id: 'region:gberet/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 544, flags: '0', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 812, sourceColumn: 2, sourceEndLine: 812};
MERGE (n:KG {id: 'rom:gberet/proms/577h09.2f'}) SET n:Rom SET n += {file: '577h09.2f', offset: 0, size: 32, crc: 'c15e7c80', sha1: 'c0e8a01e63ed8cf20b33456b68890313b387ad23', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 813, sourceColumn: 2, sourceEndLine: 813};
MERGE (n:KG {id: 'rom:gberet/proms/577h11.6f'}) SET n:Rom SET n += {file: '577h11.6f', offset: 32, size: 256, crc: '2a1a992b', sha1: '77cff7c9c8433f999a87776021935864cf9dccb4', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 814, sourceColumn: 2, sourceEndLine: 814};
MERGE (n:KG {id: 'rom:gberet/proms/577h10.5f'}) SET n:Rom SET n += {file: '577h10.5f', offset: 288, size: 256, crc: 'e9de1e53', sha1: '406b8dfe54e6176082005cc5545e79c098672547', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 815, sourceColumn: 2, sourceEndLine: 815};
MERGE (n:KG {id: 'map:gberet_state.prg_map'}) SET n:AddressMap SET n += {cls: 'gberet_state', name: 'prg_map', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 534, sourceColumn: 1, sourceEndLine: 551};
MERGE (n:KG {id: 'map:gberet_state.prg_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 49151, raw: 'map(0x0000, 0xbfff).rom()', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 536, sourceColumn: 2, sourceEndLine: 536, rom: true};
MERGE (n:KG {id: 'map:gberet_state.prg_map/range1'}) SET n:AddressRange SET n += {start: 49152, end: 51199, raw: 'map(0xc000, 0xc7ff).ram().w(FUNC(gberet_state::colorram_w)).share(m_colorram)', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 537, sourceColumn: 2, sourceEndLine: 537, ram: true, share: 'colorram'};
MERGE (n:KG {id: 'handler:gberet_state.colorram_w'}) SET n:Handler SET n += {method: 'colorram_w', ownerClass: 'gberet_state', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 384, sourceColumn: 1, sourceEndLine: 388, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_colorram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:gberet_state.prg_map/range2'}) SET n:AddressRange SET n += {start: 51200, end: 53247, raw: 'map(0xc800, 0xcfff).ram().w(FUNC(gberet_state::videoram_w)).share(m_videoram)', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 538, sourceColumn: 2, sourceEndLine: 538, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'handler:gberet_state.videoram_w'}) SET n:Handler SET n += {method: 'videoram_w', ownerClass: 'gberet_state', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 378, sourceColumn: 1, sourceEndLine: 382, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:gberet_state.prg_map/range3'}) SET n:AddressRange SET n += {start: 53248, end: 53503, raw: 'map(0xd000, 0xd0ff).ram().share(m_spriteram2)', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 539, sourceColumn: 2, sourceEndLine: 539, ram: true, share: 'spriteram2'};
MERGE (n:KG {id: 'map:gberet_state.prg_map/range4'}) SET n:AddressRange SET n += {start: 53504, end: 53759, raw: 'map(0xd100, 0xd1ff).ram().share(m_spriteram)', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 540, sourceColumn: 2, sourceEndLine: 540, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:gberet_state.prg_map/range5'}) SET n:AddressRange SET n += {start: 53760, end: 57343, raw: 'map(0xd200, 0xdfff).ram()', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 541, sourceColumn: 2, sourceEndLine: 541, ram: true};
MERGE (n:KG {id: 'map:gberet_state.prg_map/range6'}) SET n:AddressRange SET n += {start: 57344, end: 57407, raw: 'map(0xe000, 0xe03f).rw(m_k005849, FUNC(k005849_device::scroll_r), FUNC(k005849_device::scroll_w))', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 542, sourceColumn: 2, sourceEndLine: 542};
MERGE (n:KG {id: 'handler:k005849_device.scroll_r'}) SET n:Handler SET n += {method: 'scroll_r', ownerClass: 'k005849_device', sourceFile: 'src/mame/konami/k005849.h', sourceLine: 21, sourceColumn: 42, sourceEndLine: 24, sourceParameters: 'offs_t offset', sourceBody: 'return m_scrollram[offset & 0x3f];'};
MERGE (n:KG {id: 'handler:k005849_device.scroll_w'}) SET n:Handler SET n += {method: 'scroll_w', ownerClass: 'k005849_device', sourceFile: 'src/mame/konami/k005849.h', sourceLine: 25, sourceColumn: 1, sourceEndLine: 25, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_scrollram[offset & 0x3f] = data;'};
MERGE (n:KG {id: 'map:gberet_state.prg_map/range7'}) SET n:AddressRange SET n += {start: 57408, end: 57415, raw: 'map(0xe040, 0xe047).w(m_k005849, FUNC(k005849_device::ctrl_w))', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 543, sourceColumn: 2, sourceEndLine: 543};
MERGE (n:KG {id: 'handler:k005849_device.ctrl_w'}) SET n:Handler SET n += {method: 'ctrl_w', ownerClass: 'k005849_device', sourceFile: 'src/mame/konami/k005849.cpp', sourceLine: 86, sourceColumn: 1, sourceEndLine: 111, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'offset &= 7;

	if (offset == 4)
	{
		// clear interrupts
		if (BIT(~data & m_ctrlram[4], 1))
			m_irq_cb(CLEAR_LINE);

		if (BIT(~data & m_ctrlram[4], 2))
			m_firq_cb(CLEAR_LINE);

		if (BIT(~data & m_ctrlram[4], 0))
			m_nmi_cb(CLEAR_LINE);

		// flipscreen
		if (BIT(data ^ m_ctrlram[4], 3))
		{
			m_flipscreen = BIT(data, 3);
			m_flipscreen_cb(BIT(data, 3));
		}
	}

	m_ctrlram[offset] = data;'};
MERGE (n:KG {id: 'map:gberet_state.prg_map/range8'}) SET n:AddressRange SET n += {start: 61440, end: 61440, raw: 'map(0xf000, 0xf000).w(FUNC(gberet_state::coin_counter_w))', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 544, sourceColumn: 2, sourceEndLine: 544};
MERGE (n:KG {id: 'handler:gberet_state.coin_counter_w'}) SET n:Handler SET n += {method: 'coin_counter_w', ownerClass: 'gberet_state', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 514, sourceColumn: 1, sourceEndLine: 519, sourceParameters: 'uint8_t data', sourceBody: '// bits 0/1 = coin counters
	machine().bookkeeping().coin_counter_w(0, data & 1);
	machine().bookkeeping().coin_counter_w(1, data & 2);'};
MERGE (n:KG {id: 'map:gberet_state.prg_map/range9'}) SET n:AddressRange SET n += {start: 61952, end: 61952, raw: 'map(0xf200, 0xf200).portr("DSW2").writeonly().share(m_soundlatch)', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 545, sourceColumn: 2, sourceEndLine: 545, writeonly: true, share: 'soundlatch', portRead: 'DSW2'};
MERGE (n:KG {id: 'map:gberet_state.prg_map/range10'}) SET n:AddressRange SET n += {start: 62464, end: 62464, raw: 'map(0xf400, 0xf400).portr("DSW3").w(FUNC(gberet_state::sound_w))', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 546, sourceColumn: 2, sourceEndLine: 546, portRead: 'DSW3'};
MERGE (n:KG {id: 'handler:gberet_state.sound_w'}) SET n:Handler SET n += {method: 'sound_w', ownerClass: 'gberet_state', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 529, sourceColumn: 1, sourceEndLine: 532, sourceParameters: 'uint8_t data', sourceBody: 'm_sn->write(*m_soundlatch);'};
MERGE (n:KG {id: 'map:gberet_state.prg_map/range11'}) SET n:AddressRange SET n += {start: 62976, end: 62976, raw: 'map(0xf600, 0xf600).portr("DSW1").w("watchdog", FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 547, sourceColumn: 2, sourceEndLine: 547, portRead: 'DSW1'};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 547, sourceColumn: 2, sourceEndLine: 547};
MERGE (n:KG {id: 'map:gberet_state.prg_map/range12'}) SET n:AddressRange SET n += {start: 62977, end: 62977, raw: 'map(0xf601, 0xf601).portr("P2")', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 548, sourceColumn: 2, sourceEndLine: 548, portRead: 'P2'};
MERGE (n:KG {id: 'map:gberet_state.prg_map/range13'}) SET n:AddressRange SET n += {start: 62978, end: 62978, raw: 'map(0xf602, 0xf602).portr("P1")', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 549, sourceColumn: 2, sourceEndLine: 549, portRead: 'P1'};
MERGE (n:KG {id: 'map:gberet_state.prg_map/range14'}) SET n:AddressRange SET n += {start: 62979, end: 62979, raw: 'map(0xf603, 0xf603).portr("SYSTEM")', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 550, sourceColumn: 2, sourceEndLine: 550, portRead: 'SYSTEM'};
MERGE (n:KG {id: 'machine:gberet_state.gberet'}) SET n:MachineConfig SET n += {cls: 'gberet_state', name: 'gberet', calls: [], startHandlers: ['gberet_base_state.video_start'], sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 732, sourceColumn: 1, sourceEndLine: 762};
MERGE (n:KG {id: 'handler:gberet_base_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'gberet_base_state', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 403, sourceColumn: 1, sourceEndLine: 408, sourceParameters: '', sourceBody: 'm_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(gberet_state::get_bg_tile_info)), TILEMAP_SCAN_ROWS, 8, 8, 64, 32);
	m_bg_tilemap->configure_groups(*m_gfxdecode->gfx(0), 0x10);
	m_bg_tilemap->set_scroll_rows(32);'};
MERGE (n:KG {id: 'handler:gberet_base_state.get_bg_tile_info'}) SET n:Handler SET n += {method: 'get_bg_tile_info', ownerClass: 'gberet_base_state', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 390, sourceColumn: 1, sourceEndLine: 401, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int const attr = m_colorram[tile_index];
	int const code = m_videoram[tile_index] + ((attr & 0x40) << 2);
	int const color = attr & 0x0f;
	int const flags = TILE_FLIPYX((attr & 0x30) >> 4);

	tileinfo.group = color;
	tileinfo.category = (attr & 0x80) >> 7;

	tileinfo.set(0, code, color, flags);'};
MERGE (n:KG {id: 'device:gberet_state.gberet/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 3072000, config: ['Z80(config, m_maincpu, 18.432_MHz_XTAL / 6)', 'm_maincpu->set_addrmap(AS_PROGRAM, &gberet_state::prg_map)'], sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 735, sourceColumn: 2, sourceEndLine: 735};
MERGE (n:KG {id: 'device:gberet_state.gberet/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog")'], sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 738, sourceColumn: 2, sourceEndLine: 738};
MERGE (n:KG {id: 'device:gberet_state.gberet/k005849'}) SET n:Device SET n += {type: 'K005849', tag: 'k005849', clock: 0, config: ['K005849(config, m_k005849)', 'm_k005849->set_irq_cb().set("mainirq", FUNC(input_merger_any_high_device::in_w<0>))', 'm_k005849->set_firq_cb().set("mainirq", FUNC(input_merger_any_high_device::in_w<1>))', 'm_k005849->set_nmi_cb().set_inputline(m_maincpu, INPUT_LINE_NMI)', 'm_k005849->set_flipscreen_cb().set(FUNC(gberet_state::flip_screen_set))'], cls: 'k005849_device', clsHierarchy: ['k005849_device'], sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 741, sourceColumn: 2, sourceEndLine: 741};
MERGE (n:KG {id: 'device:gberet_state.gberet/k005849/callback:k005849:0'}) SET n:Callback SET n += {signal: 'set_irq_cb', operation: 'set', raw: 'm_k005849->set_irq_cb().set("mainirq", FUNC(input_merger_any_high_device::in_w<0>))', ownerTag: 'k005849', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 742, sourceColumn: 2, sourceEndLine: 742, targetTag: 'mainirq', targetClass: 'input_merger_any_high_device', targetMethod: 'in_w_0'};
MERGE (n:KG {id: 'handler:input_merger_any_high_device.in_w_0'}) SET n:Handler SET n += {method: 'in_w_0', ownerClass: 'input_merger_any_high_device', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 742, sourceColumn: 2, sourceEndLine: 742};
MERGE (n:KG {id: 'device:gberet_state.gberet/k005849/callback:k005849:1'}) SET n:Callback SET n += {signal: 'set_firq_cb', operation: 'set', raw: 'm_k005849->set_firq_cb().set("mainirq", FUNC(input_merger_any_high_device::in_w<1>))', ownerTag: 'k005849', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 743, sourceColumn: 2, sourceEndLine: 743, targetTag: 'mainirq', targetClass: 'input_merger_any_high_device', targetMethod: 'in_w_1'};
MERGE (n:KG {id: 'handler:input_merger_any_high_device.in_w_1'}) SET n:Handler SET n += {method: 'in_w_1', ownerClass: 'input_merger_any_high_device', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 743, sourceColumn: 2, sourceEndLine: 743};
MERGE (n:KG {id: 'device:gberet_state.gberet/k005849/callback:k005849:2'}) SET n:Callback SET n += {signal: 'set_nmi_cb', operation: 'set_inputline', raw: 'm_k005849->set_nmi_cb().set_inputline(m_maincpu, INPUT_LINE_NMI)', ownerTag: 'k005849', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 744, sourceColumn: 2, sourceEndLine: 744, inputLine: 'INPUT_LINE_NMI', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:gberet_state.gberet/k005849/callback:k005849:3'}) SET n:Callback SET n += {signal: 'set_flipscreen_cb', operation: 'set', raw: 'm_k005849->set_flipscreen_cb().set(FUNC(gberet_state::flip_screen_set))', ownerTag: 'k005849', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 745, sourceColumn: 2, sourceEndLine: 745, targetClass: 'gberet_state', targetMethod: 'flip_screen_set'};
MERGE (n:KG {id: 'handler:gberet_state.flip_screen_set'}) SET n:Handler SET n += {method: 'flip_screen_set', ownerClass: 'gberet_state', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 745, sourceColumn: 2, sourceEndLine: 745};
MERGE (n:KG {id: 'device:gberet_state.gberet/mainirq'}) SET n:Device SET n += {type: 'INPUT_MERGER_ANY_HIGH', tag: 'mainirq', clock: null, config: ['input_merger_device &mainirq(INPUT_MERGER_ANY_HIGH(config, "mainirq"))', 'mainirq.output_handler().set_inputline(m_maincpu, INPUT_LINE_IRQ0)'], sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 747, sourceColumn: 2, sourceEndLine: 747};
MERGE (n:KG {id: 'device:gberet_state.gberet/mainirq/callback:mainirq:0'}) SET n:Callback SET n += {signal: 'output_handler', operation: 'set_inputline', raw: 'mainirq.output_handler().set_inputline(m_maincpu, INPUT_LINE_IRQ0)', ownerTag: 'mainirq', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 748, sourceColumn: 2, sourceEndLine: 748, inputLine: 'INPUT_LINE_IRQ0', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:gberet_state.gberet/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['screen_device &screen(SCREEN(config, "screen", SCREEN_TYPE_RASTER))', 'screen.set_raw(18.432_MHz_XTAL / 3, 384, 0+8, 256-8, 264, 16, 240)', 'screen.set_screen_update(FUNC(gberet_state::screen_update))', 'screen.set_palette(m_palette)'], sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 750, sourceColumn: 2, sourceEndLine: 750, configCalls: ['set_raw(6144000,384,8,248,264,16,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6144000, 384, 8, 248, 264, 16, 240], screenRawExpr: ['18.432_MHz_XTAL / 3', '384', '0+8', '256-8', '264', '16', '240']};
MERGE (n:KG {id: 'device:gberet_state.gberet/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'screen.set_screen_update(FUNC(gberet_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 752, sourceColumn: 2, sourceEndLine: 752, targetClass: 'gberet_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:gberet_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'gberet_state', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 445, sourceColumn: 1, sourceEndLine: 455, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'for (int i = 0; i < 32; i++)
		m_bg_tilemap->set_scrollx(i, m_k005849->scroll_r(i) | ((m_k005849->scroll_r(i | 0x20) & 1) << 8));

	m_bg_tilemap->draw(screen, bitmap, cliprect, TILEMAP_DRAW_OPAQUE | TILEMAP_DRAW_ALL_CATEGORIES, 0);
	draw_sprites(bitmap, cliprect);
	m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0);

	return 0;'};
MERGE (n:KG {id: 'handler:gberet_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'gberet_state', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 410, sourceColumn: 1, sourceEndLine: 443, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'uint8_t *sr;

	if (m_k005849->ctrl_r(3) & 0x08)
		sr = m_spriteram2;
	else
		sr = m_spriteram;

	for (int offs = 0; offs < 0xc0; offs += 4)
	{
		if (sr[offs + 3])
		{
			int const attr = sr[offs + 1];
			int const code = sr[offs + 0] + ((attr & 0x40) << 2);
			int const color = attr & 0x0f;
			int sx = sr[offs + 2] - 2 * (attr & 0x80);
			int sy = sr[offs + 3];
			int flipx = attr & 0x10;
			int flipy = attr & 0x20;

			if (flip_screen())
			{
				sx = 240 - sx;
				sy = 240 - sy;
				flipx = !flipx;
				flipy = !flipy;
			}

			m_gfxdecode->gfx(1)->transmask(bitmap, cliprect, code, color, flipx, flipy, sx, sy,
				m_palette->transpen_mask(*m_gfxdecode->gfx(1), color, 0));
		}
	}'};
MERGE (n:KG {id: 'handler:k005849_device.ctrl_r'}) SET n:Handler SET n += {method: 'ctrl_r', ownerClass: 'k005849_device', sourceFile: 'src/mame/konami/k005849.h', sourceLine: 20, sourceColumn: 1, sourceEndLine: 20, sourceParameters: 'offs_t offset', sourceBody: 'return m_ctrlram[offset & 7];'};
MERGE (n:KG {id: 'device:gberet_state.gberet/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_gberet)'], sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 755, sourceColumn: 2, sourceEndLine: 755, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:gberet_state.gberet/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(gberet_state::palette), 2*16*16, 32)'], sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 756, sourceColumn: 2, sourceEndLine: 756, clockExpr: 'FUNC(gberet_state::palette)'};
MERGE (n:KG {id: 'device:gberet_state.gberet/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 759, sourceColumn: 2, sourceEndLine: 759};
MERGE (n:KG {id: 'device:gberet_state.gberet/snsnd'}) SET n:Device SET n += {type: 'SN76489A', tag: 'snsnd', clock: 1536000, config: ['SN76489A(config, m_sn, 18.432_MHz_XTAL / 12).add_route(ALL_OUTPUTS, "mono", 1.0)'], sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 761, sourceColumn: 2, sourceEndLine: 761};
MERGE (n:KG {id: 'audioroute:device:gberet_state.gberet/snsnd/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 1, raw: 'SN76489A(config, m_sn, 18.432_MHz_XTAL / 12).add_route(ALL_OUTPUTS, "mono", 1.0)', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 761, sourceColumn: 2, sourceEndLine: 761};
MERGE (n:KG {id: 'inputs:gberet'}) SET n:InputPorts SET n += {name: 'gberet', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 605, sourceColumn: 8, sourceEndLine: 605};
MERGE (n:KG {id: 'inputs:gberet/P1'}) SET n:Port SET n += {tag: 'P1', modify: false};
MERGE (n:KG {id: 'inputs:gberet/P1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:gberet/P1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:gberet/P1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:gberet/P1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:gberet/P1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 16};
MERGE (n:KG {id: 'inputs:gberet/P1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', defaultValue: 32};
MERGE (n:KG {id: 'inputs:gberet/P1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 64};
MERGE (n:KG {id: 'inputs:gberet/P1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:gberet/P2'}) SET n:Port SET n += {tag: 'P2', modify: false};
MERGE (n:KG {id: 'inputs:gberet/P2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:gberet/P2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:gberet/P2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:gberet/P2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:gberet/P2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:gberet/P2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_COCKTAIL'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:gberet/P2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', modifiers: ['PORT_COCKTAIL'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:gberet/P2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:gberet/SYSTEM'}) SET n:Port SET n += {tag: 'SYSTEM', modify: false};
MERGE (n:KG {id: 'inputs:gberet/SYSTEM/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_COIN1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:gberet/SYSTEM/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_COIN2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:gberet/SYSTEM/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_SERVICE1', defaultValue: 4};
MERGE (n:KG {id: 'inputs:gberet/SYSTEM/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_START1', defaultValue: 8};
MERGE (n:KG {id: 'inputs:gberet/SYSTEM/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_START2', defaultValue: 16};
MERGE (n:KG {id: 'inputs:gberet/SYSTEM/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 32};
MERGE (n:KG {id: 'inputs:gberet/SYSTEM/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 64};
MERGE (n:KG {id: 'inputs:gberet/SYSTEM/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:gberet/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:gberet/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 15, modifiers: ['PORT_DIPLOCATION(#SW1":1,2,3,4")'], name: 'Coin A', defaultValue: 15, location: '#SW1":1,2,3,4"', settings: ['2=4C 1C', '5=3C 1C', '8=2C 1C', '4=3C 2C', '1=4C 3C', '15=1C 1C', '3=3C 4C', '7=2C 3C', '14=1C 2C', '6=2C 5C', '13=1C 3C', '12=1C 4C', '11=1C 5C', '10=1C 6C', '9=1C 7C', '0=Free Play']};
MERGE (n:KG {id: 'inputs:gberet/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 240, modifiers: ['PORT_DIPLOCATION(#SW1":5,6,7,8")'], name: 'Coin B', defaultValue: 240, location: '#SW1":5,6,7,8"', settings: ['32=4C 1C', '80=3C 1C', '128=2C 1C', '64=3C 2C', '16=4C 3C', '240=1C 1C', '48=3C 4C', '112=2C 3C', '224=1C 2C', '96=2C 5C', '208=1C 3C', '192=1C 4C', '176=1C 5C', '160=1C 6C', '144=1C 7C', '0=No Coin B']};
MERGE (n:KG {id: 'inputs:gberet/DSW2'}) SET n:Port SET n += {tag: 'DSW2', modify: false};
MERGE (n:KG {id: 'inputs:gberet/DSW2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SW2:1,2")'], name: 'Lives', defaultValue: 2, location: 'SW2:1,2', settings: ['3=2', '2=3', '1=5', '0=7']};
MERGE (n:KG {id: 'inputs:gberet/DSW2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 4, modifiers: ['PORT_DIPLOCATION("SW2:3")'], name: 'Cabinet', defaultValue: 0, location: 'SW2:3', settings: ['0=Upright', '4=Cocktail']};
MERGE (n:KG {id: 'inputs:gberet/DSW2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 24, modifiers: ['PORT_DIPLOCATION("SW2:4,5")'], name: 'Bonus Life', defaultValue: 8, location: 'SW2:4,5', settings: ['24=30K, 70K, Every 70K', '16=40K, 80K, Every 80K', '8=50K, 100K, Every 100K', '0=50K, 200K, Every 200K']};
MERGE (n:KG {id: 'inputs:gberet/DSW2/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 96, modifiers: ['PORT_DIPLOCATION("SW2:6,7")'], name: 'Difficulty', defaultValue: 64, location: 'SW2:6,7', settings: ['96=Easy', '64=Normal', '32=Difficult', '0=Very Difficult']};
MERGE (n:KG {id: 'inputs:gberet/DSW2/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("SW2:8")'], name: 'Demo Sounds', defaultValue: 0, location: 'SW2:8', settings: ['128=Off', '0=On']};
MERGE (n:KG {id: 'inputs:gberet/DSW3'}) SET n:Port SET n += {tag: 'DSW3', modify: false};
MERGE (n:KG {id: 'inputs:gberet/DSW3/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, modifiers: ['PORT_DIPLOCATION("SW3:1")'], name: 'Flip Screen', defaultValue: 1, location: 'SW3:1', settings: ['1=Off', '0=On']};
MERGE (n:KG {id: 'inputs:gberet/DSW3/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, modifiers: ['PORT_DIPLOCATION("SW3:2")'], name: 'Upright Controls', defaultValue: 2, location: 'SW3:2', settings: ['2=Single', '0=Dual']};
MERGE (n:KG {id: 'inputs:gberet/DSW3/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 4, name: 'Unused', defaultValue: 4};
MERGE (n:KG {id: 'inputs:gberet/DSW3/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 8, name: 'Unused', defaultValue: 8};
MERGE (n:KG {id: 'gfxlayout:gfx_8x8x4_packed_msb'}) SET n:GfxLayout SET n += {name: 'gfx_8x8x4_packed_msb', width: 8, height: 8, total: 'RGN_FRAC(1,1)', planes: 4, planeOffsets: [0, 1, 2, 3], xOffsets: [0, 4, 8, 12, 16, 20, 24, 28], yOffsets: [0, 32, 64, 96, 128, 160, 192, 224], charIncrement: 256};
MERGE (n:KG {id: 'gfxlayout:gfx_8x8x4_row_2x2_group_packed_msb'}) SET n:GfxLayout SET n += {name: 'gfx_8x8x4_row_2x2_group_packed_msb', width: 16, height: 16, total: 'RGN_FRAC(1,1)', planes: 4, planeOffsets: [0, 1, 2, 3], xOffsets: [0, 4, 8, 12, 16, 20, 24, 28, 256, 260, 264, 268, 272, 276, 280, 284], yOffsets: [0, 32, 64, 96, 128, 160, 192, 224, 512, 544, 576, 608, 640, 672, 704, 736], charIncrement: 1024};
MERGE (n:KG {id: 'gfxdecode:gfx_gberet'}) SET n:GfxDecode SET n += {name: 'gfx_gberet', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 715, sourceColumn: 8, sourceEndLine: 715};
MERGE (n:KG {id: 'gfxdecode:gfx_gberet/e0'}) SET n:GfxDecodeEntry SET n += {region: 'tiles', offset: 0, layout: 'gfx_8x8x4_packed_msb', colorBase: 0, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_gberet/e1'}) SET n:GfxDecodeEntry SET n += {region: 'sprites', offset: 0, layout: 'gfx_8x8x4_row_2x2_group_packed_msb', colorBase: 256, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'device:gberet_state.gberet/palette/callback:palette_init'}) SET n:Callback SET n += {signal: 'palette_init', operation: 'palette_init', raw: 'PALETTE(config, m_palette, FUNC(gberet_state::palette), 2*16*16, 32)', ownerTag: 'palette', targetClass: 'gberet_state', targetMethod: 'palette', entries: 32, sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 756};
MERGE (n:KG {id: 'handler:gberet_state.palette'}) SET n:Handler SET n += {method: 'palette', ownerClass: 'gberet_state', sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 335, sourceColumn: 1, sourceEndLine: 376, sourceParameters: 'palette_device &palette', sourceBody: 'uint8_t const *color_prom = memregion("proms")->base();

	// create a lookup table for the palette
	for (int i = 0; i < 0x20; i++)
	{
		// red component
		int bit0 = BIT(color_prom[i], 0);
		int bit1 = BIT(color_prom[i], 1);
		int bit2 = BIT(color_prom[i], 2);
		int const r = 0x21 * bit0 + 0x47 * bit1 + 0x97 * bit2;

		// green component
		bit0 = BIT(color_prom[i], 3);
		bit1 = BIT(color_prom[i], 4);
		bit2 = BIT(color_prom[i], 5);
		int const g = 0x21 * bit0 + 0x47 * bit1 + 0x97 * bit2;

		// blue component
		bit0 = BIT(color_prom[i], 6);
		bit1 = BIT(color_prom[i], 7);
		int const b = 0x52 * bit0 + 0xad * bit1;

		palette.set_indirect_color(i, rgb_t(r, g, b));
	}

	// color_prom now points to the beginning of the lookup table
	color_prom += 0x20;

	for (int i = 0; i < 0x100; i++)
	{
		uint8_t const ctabentry = (color_prom[i] & 0x0f) | 0x10;
		palette.set_pen_indirect(i, ctabentry);
	}

	for (int i = 0x100; i < 0x200; i++)
	{
		uint8_t const ctabentry = color_prom[i] & 0x0f;
		palette.set_pen_indirect(i, ctabentry);
	}'};
MATCH (a:KG {id: 'game:gberet'}), (b:KG {id: 'file:src/mame/konami/gberet.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 897, sourceColumn: 1, sourceEndLine: 897};
MATCH (a:KG {id: 'game:gberet'}), (b:KG {id: 'machine:gberet_state.gberet'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:gberet'}), (b:KG {id: 'inputs:gberet'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:gberet'}), (b:KG {id: 'romset:gberet'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/gberet.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/gberet.cpp'}), (b:KG {id: 'file:konamipt.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/gberet.cpp'}), (b:KG {id: 'file:k005849.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/gberet.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/gberet.cpp'}), (b:KG {id: 'file:machine/input_merger.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/gberet.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/gberet.cpp'}), (b:KG {id: 'file:sound/sn76496.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/gberet.cpp'}), (b:KG {id: 'file:emupal.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/gberet.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/gberet.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/gberet.cpp'}), (b:KG {id: 'file:tilemap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:gberet_state.gberet'}), (b:KG {id: 'file:src/mame/konami/gberet.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 732, sourceColumn: 1, sourceEndLine: 762};
MATCH (a:KG {id: 'machine:gberet_state.gberet'}), (b:KG {id: 'handler:gberet_base_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:gberet_state.gberet'}), (b:KG {id: 'device:gberet_state.gberet/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gberet_state.gberet'}), (b:KG {id: 'device:gberet_state.gberet/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gberet_state.gberet'}), (b:KG {id: 'device:gberet_state.gberet/k005849'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gberet_state.gberet'}), (b:KG {id: 'device:gberet_state.gberet/mainirq'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gberet_state.gberet'}), (b:KG {id: 'device:gberet_state.gberet/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gberet_state.gberet'}), (b:KG {id: 'device:gberet_state.gberet/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gberet_state.gberet'}), (b:KG {id: 'gfxdecode:gfx_gberet'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:gberet_state.gberet'}), (b:KG {id: 'device:gberet_state.gberet/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gberet_state.gberet'}), (b:KG {id: 'device:gberet_state.gberet/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:gberet_state.gberet'}), (b:KG {id: 'device:gberet_state.gberet/snsnd'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:gberet'}), (b:KG {id: 'file:src/mame/konami/gberet.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 605, sourceColumn: 8, sourceEndLine: 605};
MATCH (a:KG {id: 'inputs:gberet'}), (b:KG {id: 'inputs:gberet/P1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:gberet'}), (b:KG {id: 'inputs:gberet/P2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:gberet'}), (b:KG {id: 'inputs:gberet/SYSTEM'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:gberet'}), (b:KG {id: 'inputs:gberet/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:gberet'}), (b:KG {id: 'inputs:gberet/DSW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:gberet'}), (b:KG {id: 'inputs:gberet/DSW3'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:gberet'}), (b:KG {id: 'file:src/mame/konami/gberet.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 797, sourceColumn: 1, sourceEndLine: 797};
MATCH (a:KG {id: 'romset:gberet'}), (b:KG {id: 'region:gberet/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:gberet'}), (b:KG {id: 'region:gberet/tiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:gberet'}), (b:KG {id: 'region:gberet/sprites'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:gberet'}), (b:KG {id: 'region:gberet/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:gberet_base_state.video_start'}), (b:KG {id: 'handler:gberet_base_state.get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:gberet_state.gberet/maincpu'}), (b:KG {id: 'map:gberet_state.prg_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:gberet_state.gberet/k005849'}), (b:KG {id: 'device:gberet_state.gberet/k005849/callback:k005849:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gberet_state.gberet/k005849'}), (b:KG {id: 'device:gberet_state.gberet/k005849/callback:k005849:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gberet_state.gberet/k005849'}), (b:KG {id: 'device:gberet_state.gberet/k005849/callback:k005849:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gberet_state.gberet/k005849'}), (b:KG {id: 'device:gberet_state.gberet/k005849/callback:k005849:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gberet_state.gberet/mainirq'}), (b:KG {id: 'device:gberet_state.gberet/mainirq/callback:mainirq:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gberet_state.gberet/screen'}), (b:KG {id: 'device:gberet_state.gberet/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_gberet'}), (b:KG {id: 'file:src/mame/konami/gberet.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 715, sourceColumn: 8, sourceEndLine: 715};
MATCH (a:KG {id: 'gfxdecode:gfx_gberet'}), (b:KG {id: 'gfxdecode:gfx_gberet/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_gberet'}), (b:KG {id: 'gfxdecode:gfx_gberet/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:gberet_state.gberet/palette'}), (b:KG {id: 'device:gberet_state.gberet/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:gberet_state.gberet/snsnd'}), (b:KG {id: 'audioroute:device:gberet_state.gberet/snsnd/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:gberet/P1'}), (b:KG {id: 'inputs:gberet/P1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/P1'}), (b:KG {id: 'inputs:gberet/P1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/P1'}), (b:KG {id: 'inputs:gberet/P1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/P1'}), (b:KG {id: 'inputs:gberet/P1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/P1'}), (b:KG {id: 'inputs:gberet/P1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/P1'}), (b:KG {id: 'inputs:gberet/P1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/P1'}), (b:KG {id: 'inputs:gberet/P1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/P1'}), (b:KG {id: 'inputs:gberet/P1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/P2'}), (b:KG {id: 'inputs:gberet/P2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/P2'}), (b:KG {id: 'inputs:gberet/P2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/P2'}), (b:KG {id: 'inputs:gberet/P2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/P2'}), (b:KG {id: 'inputs:gberet/P2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/P2'}), (b:KG {id: 'inputs:gberet/P2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/P2'}), (b:KG {id: 'inputs:gberet/P2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/P2'}), (b:KG {id: 'inputs:gberet/P2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/P2'}), (b:KG {id: 'inputs:gberet/P2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/SYSTEM'}), (b:KG {id: 'inputs:gberet/SYSTEM/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/SYSTEM'}), (b:KG {id: 'inputs:gberet/SYSTEM/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/SYSTEM'}), (b:KG {id: 'inputs:gberet/SYSTEM/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/SYSTEM'}), (b:KG {id: 'inputs:gberet/SYSTEM/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/SYSTEM'}), (b:KG {id: 'inputs:gberet/SYSTEM/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/SYSTEM'}), (b:KG {id: 'inputs:gberet/SYSTEM/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/SYSTEM'}), (b:KG {id: 'inputs:gberet/SYSTEM/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/SYSTEM'}), (b:KG {id: 'inputs:gberet/SYSTEM/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/DSW1'}), (b:KG {id: 'inputs:gberet/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/DSW1'}), (b:KG {id: 'inputs:gberet/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/DSW2'}), (b:KG {id: 'inputs:gberet/DSW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/DSW2'}), (b:KG {id: 'inputs:gberet/DSW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/DSW2'}), (b:KG {id: 'inputs:gberet/DSW2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/DSW2'}), (b:KG {id: 'inputs:gberet/DSW2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/DSW2'}), (b:KG {id: 'inputs:gberet/DSW2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/DSW3'}), (b:KG {id: 'inputs:gberet/DSW3/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/DSW3'}), (b:KG {id: 'inputs:gberet/DSW3/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/DSW3'}), (b:KG {id: 'inputs:gberet/DSW3/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:gberet/DSW3'}), (b:KG {id: 'inputs:gberet/DSW3/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:gberet/maincpu'}), (b:KG {id: 'rom:gberet/maincpu/577l03.10c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gberet/maincpu'}), (b:KG {id: 'rom:gberet/maincpu/577l02.8c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gberet/maincpu'}), (b:KG {id: 'rom:gberet/maincpu/577l01.7c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gberet/tiles'}), (b:KG {id: 'rom:gberet/tiles/577l07.3f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gberet/sprites'}), (b:KG {id: 'rom:gberet/sprites/577l06.5e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gberet/sprites'}), (b:KG {id: 'rom:gberet/sprites/577l05.4e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gberet/sprites'}), (b:KG {id: 'rom:gberet/sprites/577l08.4f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gberet/sprites'}), (b:KG {id: 'rom:gberet/sprites/577l04.3e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gberet/proms'}), (b:KG {id: 'rom:gberet/proms/577h09.2f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gberet/proms'}), (b:KG {id: 'rom:gberet/proms/577h11.6f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:gberet/proms'}), (b:KG {id: 'rom:gberet/proms/577h10.5f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'map:gberet_state.prg_map'}), (b:KG {id: 'file:src/mame/konami/gberet.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/gberet.cpp', sourceLine: 534, sourceColumn: 1, sourceEndLine: 551};
MATCH (a:KG {id: 'map:gberet_state.prg_map'}), (b:KG {id: 'map:gberet_state.prg_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gberet_state.prg_map'}), (b:KG {id: 'map:gberet_state.prg_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gberet_state.prg_map'}), (b:KG {id: 'map:gberet_state.prg_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gberet_state.prg_map'}), (b:KG {id: 'map:gberet_state.prg_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gberet_state.prg_map'}), (b:KG {id: 'map:gberet_state.prg_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gberet_state.prg_map'}), (b:KG {id: 'map:gberet_state.prg_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gberet_state.prg_map'}), (b:KG {id: 'map:gberet_state.prg_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gberet_state.prg_map'}), (b:KG {id: 'map:gberet_state.prg_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gberet_state.prg_map'}), (b:KG {id: 'map:gberet_state.prg_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gberet_state.prg_map'}), (b:KG {id: 'map:gberet_state.prg_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gberet_state.prg_map'}), (b:KG {id: 'map:gberet_state.prg_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gberet_state.prg_map'}), (b:KG {id: 'map:gberet_state.prg_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gberet_state.prg_map'}), (b:KG {id: 'map:gberet_state.prg_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gberet_state.prg_map'}), (b:KG {id: 'map:gberet_state.prg_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:gberet_state.prg_map'}), (b:KG {id: 'map:gberet_state.prg_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:gberet_state.gberet/k005849/callback:k005849:0'}), (b:KG {id: 'handler:input_merger_any_high_device.in_w_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:gberet_state.gberet/k005849/callback:k005849:1'}), (b:KG {id: 'handler:input_merger_any_high_device.in_w_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:gberet_state.gberet/k005849/callback:k005849:2'}), (b:KG {id: 'device:gberet_state.gberet/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:gberet_state.gberet/k005849/callback:k005849:3'}), (b:KG {id: 'handler:gberet_state.flip_screen_set'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:gberet_state.gberet/mainirq/callback:mainirq:0'}), (b:KG {id: 'device:gberet_state.gberet/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:gberet_state.gberet/screen/callback:screen:0'}), (b:KG {id: 'handler:gberet_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_gberet/e0'}), (b:KG {id: 'gfxlayout:gfx_8x8x4_packed_msb'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_gberet/e1'}), (b:KG {id: 'gfxlayout:gfx_8x8x4_row_2x2_group_packed_msb'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:gberet_state.gberet/palette/callback:palette_init'}), (b:KG {id: 'handler:gberet_state.palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:gberet_state.prg_map/range1'}), (b:KG {id: 'handler:gberet_state.colorram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:gberet_state.prg_map/range2'}), (b:KG {id: 'handler:gberet_state.videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:gberet_state.prg_map/range6'}), (b:KG {id: 'handler:k005849_device.scroll_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'k005849'};
MATCH (a:KG {id: 'map:gberet_state.prg_map/range6'}), (b:KG {id: 'handler:k005849_device.scroll_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'k005849'};
MATCH (a:KG {id: 'map:gberet_state.prg_map/range7'}), (b:KG {id: 'handler:k005849_device.ctrl_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'k005849'};
MATCH (a:KG {id: 'map:gberet_state.prg_map/range8'}), (b:KG {id: 'handler:gberet_state.coin_counter_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:gberet_state.prg_map/range10'}), (b:KG {id: 'handler:gberet_state.sound_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:gberet_state.prg_map/range11'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'handler:gberet_state.screen_update'}), (b:KG {id: 'handler:gberet_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:gberet_state.screen_update'}), (b:KG {id: 'handler:k005849_device.scroll_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:gfx_8x8x4_packed_msb'}), (b:KG {id: 'file:src/mame/konami/gberet.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:gfx_8x8x4_row_2x2_group_packed_msb'}), (b:KG {id: 'file:src/mame/konami/gberet.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'handler:gberet_state.draw_sprites'}), (b:KG {id: 'handler:k005849_device.ctrl_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
