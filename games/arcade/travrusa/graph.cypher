// mamekit knowledge graph — driver src/mame/irem/travrusa.cpp
// generated 2026-09-05T03:50:19.876Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/irem/travrusa.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/irem/travrusa.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:irem.h'}) SET n:SourceFile SET n += {path: 'irem.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:emupal.h'}) SET n:SourceFile SET n += {path: 'emupal.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:tilemap.h'}) SET n:SourceFile SET n += {path: 'tilemap.h', external: true};
MERGE (n:KG {id: 'file:src/mame/irem/irem.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/irem/irem.cpp'};
MERGE (n:KG {id: 'file:cpu/m6800/m6801.h'}) SET n:SourceFile SET n += {path: 'cpu/m6800/m6801.h', external: true};
MERGE (n:KG {id: 'file:sound/discrete.h'}) SET n:SourceFile SET n += {path: 'sound/discrete.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'game:travrusa'}) SET n:Game SET n += {name: 'travrusa', year: '1983', company: 'Irem', fullname: 'Traverse USA / Zippy Race', monitor: 'ROT270', cls: 'travrusa_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 1007, sourceColumn: 1, sourceEndLine: 1007};
MERGE (n:KG {id: 'romset:travrusa'}) SET n:RomSet SET n += {name: 'travrusa', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 755, sourceColumn: 1, sourceEndLine: 755};
MERGE (n:KG {id: 'region:travrusa/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 756, sourceColumn: 2, sourceEndLine: 756};
MERGE (n:KG {id: 'rom:travrusa/maincpu/zr1-0.m3'}) SET n:Rom SET n += {file: 'zr1-0.m3', offset: 0, size: 8192, crc: 'be066c0a', sha1: 'fed0ef114b08519b99d77485b73768a838d2f06e', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 757, sourceColumn: 2, sourceEndLine: 757};
MERGE (n:KG {id: 'rom:travrusa/maincpu/zr1-5.l3'}) SET n:Rom SET n += {file: 'zr1-5.l3', offset: 8192, size: 8192, crc: '145d6b34', sha1: 'c9e2bd1d3e62c496e4c5057c4012b069dfcf592d', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 758, sourceColumn: 2, sourceEndLine: 758};
MERGE (n:KG {id: 'rom:travrusa/maincpu/zr1-6a.k3'}) SET n:Rom SET n += {file: 'zr1-6a.k3', offset: 16384, size: 8192, crc: 'e1b51383', sha1: '34f4476c1bcc28c53c8ffa7b614f443a329aae13', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 759, sourceColumn: 2, sourceEndLine: 759};
MERGE (n:KG {id: 'rom:travrusa/maincpu/zr1-7.j3'}) SET n:Rom SET n += {file: 'zr1-7.j3', offset: 24576, size: 8192, crc: '85cd1a51', sha1: '7eb046514845cb9d2507ee24d1b2f7cc5402ac02', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 760, sourceColumn: 2, sourceEndLine: 760};
MERGE (n:KG {id: 'region:travrusa/irem_audio:iremsound'}) SET n:RomRegion SET n += {tag: 'irem_audio:iremsound', size: 32768, flags: '0', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 762, sourceColumn: 2, sourceEndLine: 762};
MERGE (n:KG {id: 'rom:travrusa/irem_audio:iremsound/mr10.1a'}) SET n:Rom SET n += {file: 'mr10.1a', offset: 28672, size: 4096, crc: 'a02ad8a0', sha1: 'aff80b506dbecabed2a36eb743693940f6a22d16', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 763, sourceColumn: 2, sourceEndLine: 763};
MERGE (n:KG {id: 'region:travrusa/tiles'}) SET n:RomRegion SET n += {tag: 'tiles', size: 24576, flags: '0', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 765, sourceColumn: 2, sourceEndLine: 765};
MERGE (n:KG {id: 'rom:travrusa/tiles/zippyrac.001'}) SET n:Rom SET n += {file: 'zippyrac.001', offset: 0, size: 8192, crc: 'aa8994dd', sha1: '9b326ce52a03d723e5c3c1b5fd4aa8fa7f70f904', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 766, sourceColumn: 2, sourceEndLine: 766};
MERGE (n:KG {id: 'rom:travrusa/tiles/mr8.3c'}) SET n:Rom SET n += {file: 'mr8.3c', offset: 8192, size: 8192, crc: '3a046dd1', sha1: '65c1dd1c0b5fb72ac5c04e11a577308245e4b312', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 767, sourceColumn: 2, sourceEndLine: 767};
MERGE (n:KG {id: 'rom:travrusa/tiles/mr9.3a'}) SET n:Rom SET n += {file: 'mr9.3a', offset: 16384, size: 8192, crc: '1cc3d3f4', sha1: 'e7ee365d43d783cb6b7df37c6edeadbed35318d9', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 768, sourceColumn: 2, sourceEndLine: 768};
MERGE (n:KG {id: 'region:travrusa/sprites'}) SET n:RomRegion SET n += {tag: 'sprites', size: 24576, flags: '0', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 770, sourceColumn: 2, sourceEndLine: 770};
MERGE (n:KG {id: 'rom:travrusa/sprites/zr1-8.n3'}) SET n:Rom SET n += {file: 'zr1-8.n3', offset: 0, size: 8192, crc: '3e2c7a6b', sha1: 'abc9eeb656ab6ed5f14e10fc988f75f21ccf037a', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 771, sourceColumn: 2, sourceEndLine: 771};
MERGE (n:KG {id: 'rom:travrusa/sprites/zr1-9.l3'}) SET n:Rom SET n += {file: 'zr1-9.l3', offset: 8192, size: 8192, crc: '13be6a14', sha1: '47861910fe4c46cd72634cf7d834be2da2a0a4f9', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 772, sourceColumn: 2, sourceEndLine: 772};
MERGE (n:KG {id: 'rom:travrusa/sprites/zr1-10.k3'}) SET n:Rom SET n += {file: 'zr1-10.k3', offset: 16384, size: 8192, crc: '6fcc9fdb', sha1: '88f878b9ebf07c5a16f8cb742016cac971ed3f10', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 773, sourceColumn: 2, sourceEndLine: 773};
MERGE (n:KG {id: 'region:travrusa/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 800, flags: '0', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 775, sourceColumn: 2, sourceEndLine: 775};
MERGE (n:KG {id: 'rom:travrusa/proms/mmi6349.ij'}) SET n:Rom SET n += {file: 'mmi6349.ij', offset: 0, size: 512, crc: 'c9724350', sha1: '1fac20cdc0a53d94e8f67b49d7dd71d1b9f1f7ef', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 780, sourceColumn: 2, sourceEndLine: 780};
MERGE (n:KG {id: 'rom:travrusa/proms/tbp18s.2'}) SET n:Rom SET n += {file: 'tbp18s.2', offset: 512, size: 32, crc: 'a1130007', sha1: '9deb0eed75dd06e86f83c819a3393158be7c9dce', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 781, sourceColumn: 2, sourceEndLine: 781};
MERGE (n:KG {id: 'rom:travrusa/proms/tbp24s10.3'}) SET n:Rom SET n += {file: 'tbp24s10.3', offset: 544, size: 256, crc: '76062638', sha1: '7378a26cf455d9d3df90929dc665870514c34b54', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 782, sourceColumn: 2, sourceEndLine: 782};
MERGE (n:KG {id: 'map:travrusa_state.program_map'}) SET n:AddressMap SET n += {cls: 'travrusa_state', name: 'program_map', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 445, sourceColumn: 1, sourceEndLine: 458};
MERGE (n:KG {id: 'map:travrusa_state.program_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom()', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 447, sourceColumn: 2, sourceEndLine: 447, rom: true};
MERGE (n:KG {id: 'map:travrusa_state.program_map/range1'}) SET n:AddressRange SET n += {start: 32768, end: 36863, raw: 'map(0x8000, 0x8fff).ram().w(FUNC(travrusa_state::videoram_w)).share(m_videoram)', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 448, sourceColumn: 2, sourceEndLine: 448, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'handler:travrusa_state.videoram_w'}) SET n:Handler SET n += {method: 'videoram_w', ownerClass: 'travrusa_state', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 389, sourceColumn: 1, sourceEndLine: 393, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset / 2);'};
MERGE (n:KG {id: 'map:travrusa_state.program_map/range2'}) SET n:AddressRange SET n += {start: 36864, end: 36864, raw: 'map(0x9000, 0x9000).w(FUNC(travrusa_state::scroll_x_low_w))', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 449, sourceColumn: 2, sourceEndLine: 449};
MERGE (n:KG {id: 'handler:travrusa_state.scroll_x_low_w'}) SET n:Handler SET n += {method: 'scroll_x_low_w', ownerClass: 'travrusa_state', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 404, sourceColumn: 1, sourceEndLine: 408, sourceParameters: 'uint8_t data', sourceBody: 'm_scrollx[0] = data;
	set_scroll();'};
MERGE (n:KG {id: 'handler:travrusa_state.set_scroll'}) SET n:Handler SET n += {method: 'set_scroll', ownerClass: 'travrusa_state', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 396, sourceColumn: 1, sourceEndLine: 402, sourceParameters: '', sourceBody: 'for (int i = 0; i <= 2; i++)
		m_bg_tilemap->set_scrollx(i, m_scrollx[0] + 256 * m_scrollx[1]);

	m_bg_tilemap->set_scrollx(3, 0);'};
MERGE (n:KG {id: 'map:travrusa_state.program_map/range3'}) SET n:AddressRange SET n += {start: 40960, end: 40960, raw: 'map(0xa000, 0xa000).w(FUNC(travrusa_state::scroll_x_high_w))', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 450, sourceColumn: 2, sourceEndLine: 450};
MERGE (n:KG {id: 'handler:travrusa_state.scroll_x_high_w'}) SET n:Handler SET n += {method: 'scroll_x_high_w', ownerClass: 'travrusa_state', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 410, sourceColumn: 1, sourceEndLine: 414, sourceParameters: 'uint8_t data', sourceBody: 'm_scrollx[1] = data;
	set_scroll();'};
MERGE (n:KG {id: 'map:travrusa_state.program_map/range4'}) SET n:AddressRange SET n += {start: 51200, end: 51711, raw: 'map(0xc800, 0xc9ff).writeonly().share(m_spriteram)', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 451, sourceColumn: 2, sourceEndLine: 451, writeonly: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:travrusa_state.program_map/range5'}) SET n:AddressRange SET n += {start: 53248, end: 53248, raw: 'map(0xd000, 0xd000).portr("SYSTEM").w("irem_audio", FUNC(irem_audio_device::cmd_w))', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 452, sourceColumn: 2, sourceEndLine: 452, portRead: 'SYSTEM'};
MERGE (n:KG {id: 'handler:irem_audio_device.cmd_w'}) SET n:Handler SET n += {method: 'cmd_w', ownerClass: 'irem_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 84, sourceColumn: 1, sourceEndLine: 89, sourceParameters: 'uint8_t data', sourceBody: 'm_soundlatch = data;
	if ((data & 0x80) == 0)
		m_cpu->set_input_line(0, ASSERT_LINE);'};
MERGE (n:KG {id: 'map:travrusa_state.program_map/range6'}) SET n:AddressRange SET n += {start: 53249, end: 53249, raw: 'map(0xd001, 0xd001).portr("P1").w(FUNC(travrusa_state::flipscreen_w))', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 453, sourceColumn: 2, sourceEndLine: 453, portRead: 'P1'};
MERGE (n:KG {id: 'handler:travrusa_state.flipscreen_w'}) SET n:Handler SET n += {method: 'flipscreen_w', ownerClass: 'travrusa_state', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 417, sourceColumn: 1, sourceEndLine: 427, sourceParameters: 'uint8_t data', sourceBody: '// screen flip is handled both by software and hardware
	flip_screen_set((data & 1) ^ (~m_dsw[1]->read() & 1));

	// and coincounters (not written by shtrider)
	machine().bookkeeping().coin_counter_w(0, data & 0x02);
	machine().bookkeeping().coin_counter_w(1, data & 0x20);

	m_flipscreen = data;', inputMembers: ['m_dsw=DSW1,DSW2']};
MERGE (n:KG {id: 'map:travrusa_state.program_map/range7'}) SET n:AddressRange SET n += {start: 53250, end: 53250, raw: 'map(0xd002, 0xd002).portr("P2")', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 454, sourceColumn: 2, sourceEndLine: 454, portRead: 'P2'};
MERGE (n:KG {id: 'map:travrusa_state.program_map/range8'}) SET n:AddressRange SET n += {start: 53251, end: 53251, raw: 'map(0xd003, 0xd003).portr("DSW1")', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 455, sourceColumn: 2, sourceEndLine: 455, portRead: 'DSW1'};
MERGE (n:KG {id: 'map:travrusa_state.program_map/range9'}) SET n:AddressRange SET n += {start: 53252, end: 53252, raw: 'map(0xd004, 0xd004).portr("DSW2")', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 456, sourceColumn: 2, sourceEndLine: 456, portRead: 'DSW2'};
MERGE (n:KG {id: 'map:travrusa_state.program_map/range10'}) SET n:AddressRange SET n += {start: 57344, end: 61439, raw: 'map(0xe000, 0xefff).ram()', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 457, sourceColumn: 2, sourceEndLine: 457, ram: true};
MERGE (n:KG {id: 'map:irem_audio_device.m52_small_sound_map'}) SET n:AddressMap SET n += {cls: 'irem_audio_device', name: 'm52_small_sound_map', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 360, sourceColumn: 1, sourceEndLine: 366, globalMask: 32767};
MERGE (n:KG {id: 'map:irem_audio_device.m52_small_sound_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 4095, raw: 'map(0x0000, 0x0fff).w(FUNC(irem_audio_device::m52_adpcm_w))', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 363, sourceColumn: 2, sourceEndLine: 363};
MERGE (n:KG {id: 'handler:irem_audio_device.m52_adpcm_w'}) SET n:Handler SET n += {method: 'm52_adpcm_w', ownerClass: 'irem_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 225, sourceColumn: 1, sourceEndLine: 236, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'if (offset & 1)
	{
		m_adpcm1->data_w(data);
	}
	if (offset & 2)
	{
		if (m_adpcm2 != nullptr)
			m_adpcm2->data_w(data);
	}'};
MERGE (n:KG {id: 'map:irem_audio_device.m52_small_sound_map/range1'}) SET n:AddressRange SET n += {start: 4096, end: 8191, raw: 'map(0x1000, 0x1fff).w(FUNC(irem_audio_device::sound_irq_ack_w))', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 364, sourceColumn: 2, sourceEndLine: 364};
MERGE (n:KG {id: 'handler:irem_audio_device.sound_irq_ack_w'}) SET n:Handler SET n += {method: 'sound_irq_ack_w', ownerClass: 'irem_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 218, sourceColumn: 1, sourceEndLine: 222, sourceParameters: 'uint8_t data', sourceBody: 'if ((m_soundlatch & 0x80) != 0)
		m_cpu->set_input_line(0, CLEAR_LINE);'};
MERGE (n:KG {id: 'map:irem_audio_device.m52_small_sound_map/range2'}) SET n:AddressRange SET n += {start: 8192, end: 32767, raw: 'map(0x2000, 0x7fff).rom()', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 365, sourceColumn: 2, sourceEndLine: 365, rom: true};
MERGE (n:KG {id: 'machine:travrusa_state.travrusa'}) SET n:MachineConfig SET n += {cls: 'travrusa_state', name: 'travrusa', calls: [], stateMembers: ['{"name":"m_scrollx","bits":8,"arrayLength":2}', '{"name":"m_flipscreen","bits":8}'], startHandlers: ['travrusa_state.video_start'], sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 701, sourceColumn: 1, sourceEndLine: 722};
MERGE (n:KG {id: 'handler:travrusa_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'travrusa_state', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 316, sourceColumn: 1, sourceEndLine: 327, sourceParameters: '', sourceBody: 'save_item(NAME(m_scrollx));
	save_item(NAME(m_flipscreen));

	m_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(travrusa_state::get_tile_info)), TILEMAP_SCAN_ROWS, 8, 8, 64, 32);

	m_bg_tilemap->set_transmask(0, 0xff, 0x00); // split type 0 is totally transparent in front half
	m_bg_tilemap->set_transmask(1, 0x3f, 0xc0); // split type 1 has pens 6 and 7 opaque - tunnels

	m_bg_tilemap->set_scroll_rows(4);'};
MERGE (n:KG {id: 'handler:travrusa_state.get_tile_info'}) SET n:Handler SET n += {method: 'get_tile_info', ownerClass: 'travrusa_state', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 295, sourceColumn: 1, sourceEndLine: 306, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'uint8_t const attr = m_videoram[2 * tile_index + 1];
	int const flags = TILE_FLIPXY((attr & 0x30) >> 4);

	tileinfo.group = ((attr & 0x0f) == 0x0f) ? 1 : 0; // tunnels

	tileinfo.set(0,
			m_videoram[2 * tile_index] + ((attr & 0xc0) << 2),
			attr & 0x0f,
			flags);'};
MERGE (n:KG {id: 'device:travrusa_state.travrusa/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 3072000, config: ['Z80(config, m_maincpu, 18.432_MHz_XTAL / 6)', 'm_maincpu->set_addrmap(AS_PROGRAM, &travrusa_state::program_map)'], sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 704, sourceColumn: 2, sourceEndLine: 704};
MERGE (n:KG {id: 'device:travrusa_state.travrusa/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['screen_device &screen(SCREEN(config, "screen", SCREEN_TYPE_RASTER))', 'screen.set_raw(18.432_MHz_XTAL / 3, 384, 8, 248, 282, 0, 256)', 'screen.set_screen_update(FUNC(travrusa_state::screen_update))', 'screen.set_palette(m_palette)', 'screen.screen_vblank().set_inputline(m_maincpu, INPUT_LINE_IRQ0)'], sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 708, sourceColumn: 2, sourceEndLine: 708, configCalls: ['set_raw(6144000,384,8,248,282,0,256)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6144000, 384, 8, 248, 282, 0, 256], screenRawExpr: ['18.432_MHz_XTAL / 3', '384', '8', '248', '282', '0', '256']};
MERGE (n:KG {id: 'device:travrusa_state.travrusa/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'screen.set_screen_update(FUNC(travrusa_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 710, sourceColumn: 2, sourceEndLine: 710, targetClass: 'travrusa_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:travrusa_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'travrusa_state', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 373, sourceColumn: 1, sourceEndLine: 379, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'm_bg_tilemap->draw(screen, bitmap, cliprect, TILEMAP_DRAW_LAYER1, 0);
	draw_sprites(bitmap, cliprect);
	m_bg_tilemap->draw(screen, bitmap, cliprect, TILEMAP_DRAW_LAYER0, 0);
	return 0;'};
MERGE (n:KG {id: 'handler:travrusa_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'travrusa_state', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 337, sourceColumn: 1, sourceEndLine: 370, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'const rectangle spritevisiblearea(1*8, 31*8-1, 0*8, 24*8-1);
	const rectangle spritevisibleareaflip(1*8, 31*8-1, 8*8, 32*8-1);
	rectangle clip = cliprect;
	if (flip_screen())
		clip &= spritevisibleareaflip;
	else
		clip &= spritevisiblearea;

	for (int offs = m_spriteram.bytes() - 4; offs >= 0; offs -= 4)
	{
		int sx = ((m_spriteram[offs + 3] + 8) & 0xff) - 8;
		int sy = 240 - m_spriteram[offs];
		int const code = m_spriteram[offs + 2];
		int const attr = m_spriteram[offs + 1];
		int flipx = attr & 0x40;
		int flipy = attr & 0x80;

		if (flip_screen())
		{
			sx = 240 - sx;
			sy = 240 - sy;
			flipx = !flipx;
			flipy = !flipy;
		}

		m_gfxdecode->gfx(1)->transpen(bitmap, clip,
				code,
				attr & 0x0f,
				flipx, flipy,
				sx, sy, 0);
	}'};
MERGE (n:KG {id: 'device:travrusa_state.travrusa/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set_inputline', raw: 'screen.screen_vblank().set_inputline(m_maincpu, INPUT_LINE_IRQ0)', ownerTag: 'screen', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 715, sourceColumn: 2, sourceEndLine: 715, inputLine: 'INPUT_LINE_IRQ0', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:travrusa_state.travrusa/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_travrusa)'], sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 717, sourceColumn: 2, sourceEndLine: 717, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:travrusa_state.travrusa/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(travrusa_state::travrusa_palette), 16*8+16*8, 128+16)'], sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 718, sourceColumn: 2, sourceEndLine: 718, clockExpr: 'FUNC(travrusa_state::travrusa_palette)'};
MERGE (n:KG {id: 'device:travrusa_state.travrusa/irem_audio'}) SET n:Device SET n += {type: 'IREM_M52_SOUNDC_AUDIO', tag: 'irem_audio', clock: 0, config: ['IREM_M52_SOUNDC_AUDIO(config, "irem_audio")'], cls: 'm52_soundc_audio_device', clsHierarchy: ['m52_soundc_audio_device', 'irem_audio_device'], sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 721, sourceColumn: 2, sourceEndLine: 721};
MERGE (n:KG {id: 'handler:irem_audio_device.soundlatch_r'}) SET n:Handler SET n += {method: 'soundlatch_r', ownerClass: 'irem_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 98, sourceColumn: 1, sourceEndLine: 101, sourceParameters: '', sourceBody: 'return m_soundlatch;'};
MERGE (n:KG {id: 'handler:irem_audio_device.ay8910_45M_portb_w'}) SET n:Handler SET n += {method: 'ay8910_45M_portb_w', ownerClass: 'irem_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 178, sourceColumn: 1, sourceEndLine: 189, sourceParameters: 'uint8_t data', sourceBody: '/* bits 2-4 select MSM5205 clock & 3b/4b playback mode */
	m_adpcm1->playmode_w((data >> 2) & 7);
	if (m_adpcm2 != nullptr)
		m_adpcm2->playmode_w(((data >> 2) & 4) | 3); /* always in slave mode */

	/* bits 0 and 1 reset the two chips */
	m_adpcm1->reset_w(data & 1);
	if (m_adpcm2 != nullptr)
		m_adpcm2->reset_w(data & 2);'};
MERGE (n:KG {id: 'handler:irem_audio_device.ay8910_45L_porta_w'}) SET n:Handler SET n += {method: 'ay8910_45L_porta_w', ownerClass: 'irem_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 192, sourceColumn: 1, sourceEndLine: 208, sourceParameters: 'uint8_t data', sourceBody: '/*
	 *  45L 21 IOA0  ==> BD
	 *  45L 20 IOA1  ==> SD
	 *  45L 19 IOA2  ==> OH
	 *  45L 18 IOA3  ==> CH
	 *
	 */
	if (m_audio_BD) m_audio_BD->write_line(data & 0x01 ? 1: 0);
	if (m_audio_SD) m_audio_SD->write_line(data & 0x02 ? 1: 0);
	if (m_audio_OH) m_audio_OH->write_line(data & 0x04 ? 1: 0);
	if (m_audio_CH) m_audio_CH->write_line(data & 0x08 ? 1: 0);
#ifdef MAME_DEBUG
	if (data & 0x0f) popmessage("analog sound %x",data&0x0f);
#endif'};
MERGE (n:KG {id: 'machine:m52_soundc_audio_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'm52_soundc_audio_device', name: 'device_add_mconfig', calls: [], stateMembers: ['{"name":"m_port1","bits":8}', '{"name":"m_port2","bits":8}', '{"name":"m_soundlatch","bits":8}'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 466, sourceColumn: 1, sourceEndLine: 498};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound'}) SET n:Device SET n += {type: 'M6803', tag: 'iremsound', clock: 3579545, config: ['m6803_cpu_device &cpu(M6803(config, m_cpu, XTAL(3\'579\'545)))', 'cpu.set_addrmap(AS_PROGRAM, &m52_soundc_audio_device::m52_small_sound_map)', 'cpu.in_p1_cb().set(FUNC(m52_soundc_audio_device::m6803_port1_r))', 'cpu.out_p1_cb().set(FUNC(m52_soundc_audio_device::m6803_port1_w))', 'cpu.in_p2_cb().set(FUNC(m52_soundc_audio_device::m6803_port2_r))', 'cpu.out_p2_cb().set(FUNC(m52_soundc_audio_device::m6803_port2_w))'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 469, sourceColumn: 2, sourceEndLine: 469};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound/callback:iremsound:0'}) SET n:Callback SET n += {signal: 'in_p1_cb', operation: 'set', raw: 'cpu.in_p1_cb().set(FUNC(m52_soundc_audio_device::m6803_port1_r))', ownerTag: 'iremsound', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 471, sourceColumn: 2, sourceEndLine: 471, targetClass: 'm52_soundc_audio_device', targetMethod: 'm6803_port1_r'};
MERGE (n:KG {id: 'handler:m52_soundc_audio_device.m6803_port1_r'}) SET n:Handler SET n += {method: 'm6803_port1_r', ownerClass: 'm52_soundc_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 149, sourceColumn: 1, sourceEndLine: 157, sourceParameters: '', sourceBody: '/* PSG 0 or 1? */
	if (m_port2 & 0x08)
		return m_ay_45M->data_r();
	if (m_port2 & 0x10)
		return m_ay_45L->data_r();
	return 0xff;'};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound/callback:iremsound:1'}) SET n:Callback SET n += {signal: 'out_p1_cb', operation: 'set', raw: 'cpu.out_p1_cb().set(FUNC(m52_soundc_audio_device::m6803_port1_w))', ownerTag: 'iremsound', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 472, sourceColumn: 2, sourceEndLine: 472, targetClass: 'm52_soundc_audio_device', targetMethod: 'm6803_port1_w'};
MERGE (n:KG {id: 'handler:m52_soundc_audio_device.m6803_port1_w'}) SET n:Handler SET n += {method: 'm6803_port1_w', ownerClass: 'm52_soundc_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 109, sourceColumn: 1, sourceEndLine: 112, sourceParameters: 'uint8_t data', sourceBody: 'm_port1 = data;'};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound/callback:iremsound:2'}) SET n:Callback SET n += {signal: 'in_p2_cb', operation: 'set', raw: 'cpu.in_p2_cb().set(FUNC(m52_soundc_audio_device::m6803_port2_r))', ownerTag: 'iremsound', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 473, sourceColumn: 2, sourceEndLine: 473, targetClass: 'm52_soundc_audio_device', targetMethod: 'm6803_port2_r'};
MERGE (n:KG {id: 'handler:m52_soundc_audio_device.m6803_port2_r'}) SET n:Handler SET n += {method: 'm6803_port2_r', ownerClass: 'm52_soundc_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 160, sourceColumn: 1, sourceEndLine: 168, sourceParameters: '', sourceBody: '/*
	 * Pin21, 6803 (Port 21) tied with 4.7k to +5V
	 *
	 */
	//printf("port2 read\\n"); // used by 10yard
	return 0x0;'};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound/callback:iremsound:3'}) SET n:Callback SET n += {signal: 'out_p2_cb', operation: 'set', raw: 'cpu.out_p2_cb().set(FUNC(m52_soundc_audio_device::m6803_port2_w))', ownerTag: 'iremsound', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 474, sourceColumn: 2, sourceEndLine: 474, targetClass: 'm52_soundc_audio_device', targetMethod: 'm6803_port2_w'};
MERGE (n:KG {id: 'handler:m52_soundc_audio_device.m6803_port2_w'}) SET n:Handler SET n += {method: 'm6803_port2_w', ownerClass: 'm52_soundc_audio_device', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 115, sourceColumn: 1, sourceEndLine: 139, sourceParameters: 'uint8_t data', sourceBody: '/* write latch */
	if ((m_port2 & 0x01) && !(data & 0x01))
	{
		/* control or data port? */
		if (m_port2 & 0x04)
		{
			/* PSG 0 or 1? */
			if (m_port2 & 0x08)
				m_ay_45M->address_w(m_port1);
			if (m_port2 & 0x10)
				m_ay_45L->address_w(m_port1);
		}
		else
		{
			/* PSG 0 or 1? */
			if (m_port2 & 0x08)
				m_ay_45M->data_w(m_port1);
			if (m_port2 & 0x10)
				m_ay_45L->data_w(m_port1);
		}
	}
	m_port2 = data;'};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 477, sourceColumn: 2, sourceEndLine: 477};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45m'}) SET n:Device SET n += {type: 'AY8910', tag: 'ay_45m', clock: 894886.25, config: ['AY8910(config, m_ay_45M, XTAL(3\'579\'545)/4)', 'm_ay_45M->set_flags(AY8910_SINGLE_OUTPUT | AY8910_DISCRETE_OUTPUT)', 'm_ay_45M->set_resistors_load(470, 0, 0)', 'm_ay_45M->port_a_read_callback().set(FUNC(irem_audio_device::soundlatch_r))', 'm_ay_45M->port_b_write_callback().set(FUNC(irem_audio_device::ay8910_45M_portb_w))', 'm_ay_45M->add_route(0, "filtermix", 1.0, 0)'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 479, sourceColumn: 2, sourceEndLine: 479, configCalls: ['set_flags(6)', 'set_resistors_load(470,0,0)']};
MERGE (n:KG {id: 'audioroute:device:m52_soundc_audio_device.device_add_mconfig/ay_45m/0'}) SET n:AudioRoute SET n += {output: '0', target: 'filtermix', gain: 1, input: 0, raw: 'm_ay_45M->add_route(0, "filtermix", 1.0, 0)', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 484, sourceColumn: 2, sourceEndLine: 484};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45m/callback:ay_45m:0'}) SET n:Callback SET n += {signal: 'port_a_read_callback', operation: 'set', raw: 'm_ay_45M->port_a_read_callback().set(FUNC(irem_audio_device::soundlatch_r))', ownerTag: 'ay_45m', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 482, sourceColumn: 2, sourceEndLine: 482, targetClass: 'irem_audio_device', targetMethod: 'soundlatch_r'};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45m/callback:ay_45m:1'}) SET n:Callback SET n += {signal: 'port_b_write_callback', operation: 'set', raw: 'm_ay_45M->port_b_write_callback().set(FUNC(irem_audio_device::ay8910_45M_portb_w))', ownerTag: 'ay_45m', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 483, sourceColumn: 2, sourceEndLine: 483, targetClass: 'irem_audio_device', targetMethod: 'ay8910_45M_portb_w'};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45l'}) SET n:Device SET n += {type: 'AY8910', tag: 'ay_45l', clock: 894886.25, config: ['AY8910(config, m_ay_45L, XTAL(3\'579\'545)/4)', 'm_ay_45L->set_flags(AY8910_SINGLE_OUTPUT | AY8910_DISCRETE_OUTPUT)', 'm_ay_45L->set_resistors_load(470, 0, 0)', 'm_ay_45L->port_a_write_callback().set(FUNC(irem_audio_device::ay8910_45L_porta_w))', 'm_ay_45L->add_route(0, "filtermix", 1.0, 1)'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 486, sourceColumn: 2, sourceEndLine: 486, configCalls: ['set_flags(6)', 'set_resistors_load(470,0,0)']};
MERGE (n:KG {id: 'audioroute:device:m52_soundc_audio_device.device_add_mconfig/ay_45l/0'}) SET n:AudioRoute SET n += {output: '0', target: 'filtermix', gain: 1, input: 1, raw: 'm_ay_45L->add_route(0, "filtermix", 1.0, 1)', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 490, sourceColumn: 2, sourceEndLine: 490};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45l/callback:ay_45l:0'}) SET n:Callback SET n += {signal: 'port_a_write_callback', operation: 'set', raw: 'm_ay_45L->port_a_write_callback().set(FUNC(irem_audio_device::ay8910_45L_porta_w))', ownerTag: 'ay_45l', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 489, sourceColumn: 2, sourceEndLine: 489, targetClass: 'irem_audio_device', targetMethod: 'ay8910_45L_porta_w'};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/msm1'}) SET n:Device SET n += {type: 'MSM5205', tag: 'msm1', clock: 384000, config: ['MSM5205(config, m_adpcm1, XTAL(384\'000))', 'm_adpcm1->vck_callback().set_inputline(m_cpu, INPUT_LINE_NMI)', 'm_adpcm1->set_prescaler_selector(msm5205_device::S96_4B)', 'm_adpcm1->add_route(0, "filtermix", 1.0, 2)'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 492, sourceColumn: 2, sourceEndLine: 492};
MERGE (n:KG {id: 'audioroute:device:m52_soundc_audio_device.device_add_mconfig/msm1/0'}) SET n:AudioRoute SET n += {output: '0', target: 'filtermix', gain: 1, input: 2, raw: 'm_adpcm1->add_route(0, "filtermix", 1.0, 2)', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 495, sourceColumn: 2, sourceEndLine: 495};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/msm1/callback:msm1:0'}) SET n:Callback SET n += {signal: 'vck_callback', operation: 'set_inputline', raw: 'm_adpcm1->vck_callback().set_inputline(m_cpu, INPUT_LINE_NMI)', ownerTag: 'msm1', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 493, sourceColumn: 2, sourceEndLine: 493, inputLine: 'INPUT_LINE_NMI', targetTag: 'iremsound'};
MERGE (n:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/filtermix'}) SET n:Device SET n += {type: 'DISCRETE', tag: 'filtermix', clock: null, config: ['DISCRETE(config, "filtermix", m52_sound_c_discrete).add_route(ALL_OUTPUTS, "mono", 1.0)'], sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 497, sourceColumn: 2, sourceEndLine: 497, clockExpr: 'm52_sound_c_discrete'};
MERGE (n:KG {id: 'audioroute:device:m52_soundc_audio_device.device_add_mconfig/filtermix/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 1, raw: 'DISCRETE(config, "filtermix", m52_sound_c_discrete).add_route(ALL_OUTPUTS, "mono", 1.0)', sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 497, sourceColumn: 2, sourceEndLine: 497};
MERGE (n:KG {id: 'inputs:travrusa'}) SET n:InputPorts SET n += {name: 'travrusa', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 473, sourceColumn: 8, sourceEndLine: 473};
MERGE (n:KG {id: 'inputs:travrusa/SYSTEM'}) SET n:Port SET n += {tag: 'SYSTEM', modify: false};
MERGE (n:KG {id: 'inputs:travrusa/SYSTEM/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_START1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:travrusa/SYSTEM/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_START2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:travrusa/SYSTEM/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_COIN3', modifiers: ['PORT_IMPULSE(19)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:travrusa/SYSTEM/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_COIN1', defaultValue: 8};
MERGE (n:KG {id: 'inputs:travrusa/SYSTEM/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 16};
MERGE (n:KG {id: 'inputs:travrusa/SYSTEM/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 32};
MERGE (n:KG {id: 'inputs:travrusa/SYSTEM/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 64};
MERGE (n:KG {id: 'inputs:travrusa/SYSTEM/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:travrusa/P1'}) SET n:Port SET n += {tag: 'P1', modify: false};
MERGE (n:KG {id: 'inputs:travrusa/P1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_2WAY'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:travrusa/P1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_2WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:travrusa/P1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 4};
MERGE (n:KG {id: 'inputs:travrusa/P1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 8};
MERGE (n:KG {id: 'inputs:travrusa/P1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 16};
MERGE (n:KG {id: 'inputs:travrusa/P1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 32};
MERGE (n:KG {id: 'inputs:travrusa/P1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 64};
MERGE (n:KG {id: 'inputs:travrusa/P1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_BUTTON2', defaultValue: 128};
MERGE (n:KG {id: 'inputs:travrusa/P2'}) SET n:Port SET n += {tag: 'P2', modify: false};
MERGE (n:KG {id: 'inputs:travrusa/P2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_2WAY', 'PORT_COCKTAIL'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:travrusa/P2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_2WAY', 'PORT_COCKTAIL'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:travrusa/P2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 4};
MERGE (n:KG {id: 'inputs:travrusa/P2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 8};
MERGE (n:KG {id: 'inputs:travrusa/P2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_COIN2', defaultValue: 16};
MERGE (n:KG {id: 'inputs:travrusa/P2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:travrusa/P2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 64};
MERGE (n:KG {id: 'inputs:travrusa/P2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_COCKTAIL'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:travrusa/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:travrusa/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("DSW1:1,2")'], name: 'Fuel Reduced on Collision', defaultValue: 3, location: 'DSW1:1,2', settings: ['3=8/120 Dots', '2=10/120 Dots', '1=12/120 Dots', '0=14/120 Dots']};
MERGE (n:KG {id: 'inputs:travrusa/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 4, modifiers: ['PORT_DIPLOCATION("DSW1:3")'], name: 'Fuel Consumption', defaultValue: 4, location: 'DSW1:3', settings: ['4=Low', '0=High']};
MERGE (n:KG {id: 'inputs:travrusa/DSW1/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 8, modifiers: ['PORT_DIPLOCATION("DSW1:4")'], name: 'Allow Continue', defaultValue: 0, location: 'DSW1:4', settings: ['8=No', '0=Yes']};
MERGE (n:KG {id: 'inputs:travrusa/DSW1/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 240, modifiers: ['PORT_DIPLOCATION("DSW1:5,6,7,8")'], name: 'Coinage', defaultValue: 240, location: 'DSW1:5,6,7,8', settings: ['128=Not Used [if "DSW2", 0x04, EQUALS, 0x04]', '144=Not Used [if "DSW2", 0x04, EQUALS, 0x04]', '160=6C 1C [if "DSW2", 0x04, EQUALS, 0x04]', '176=5C 1C [if "DSW2", 0x04, EQUALS, 0x04]', '192=4C 1C [if "DSW2", 0x04, EQUALS, 0x04]', '208=3C 1C [if "DSW2", 0x04, EQUALS, 0x04]', '224=2C 1C [if "DSW2", 0x04, EQUALS, 0x04]', '240=1C 1C [if "DSW2", 0x04, EQUALS, 0x04]', '112=1C 2C [if "DSW2", 0x04, EQUALS, 0x04]', '96=1C 3C [if "DSW2", 0x04, EQUALS, 0x04]', '80=1C 4C [if "DSW2", 0x04, EQUALS, 0x04]', '64=1C 5C [if "DSW2", 0x04, EQUALS, 0x04]', '48=1C 6C [if "DSW2", 0x04, EQUALS, 0x04]', '32=1C 7C [if "DSW2", 0x04, EQUALS, 0x04]', '16=Not Used [if "DSW2", 0x04, EQUALS, 0x04]', '0=Free Play [if "DSW2", 0x04, EQUALS, 0x04]', '128=Free Play [if "DSW2", 0x04, EQUALS, 0x00]', '144=A 3C_1C / B 1C_3C [if "DSW2", 0x04, EQUALS, 0x00]', '160=A 2C_1C / B 1C_3C [if "DSW2", 0x04, EQUALS, 0x00]', '176=A 1C_1C / B 1C_3C [if "DSW2", 0x04, EQUALS, 0x00]', '192=Free Play [if "DSW2", 0x04, EQUALS, 0x00]', '208=A 3C_1C / B 1C_2C [if "DSW2", 0x04, EQUALS, 0x00]', '224=A 2C_1C / B 1C_2C [if "DSW2", 0x04, EQUALS, 0x00]', '240=A 1C_1C / B 1C_2C [if "DSW2", 0x04, EQUALS, 0x00]', '112=A 1C_1C / B 1C_5C [if "DSW2", 0x04, EQUALS, 0x00]', '96=A 2C_1C / B 1C_5C [if "DSW2", 0x04, EQUALS, 0x00]', '80=A 3C_1C / B 1C_5C [if "DSW2", 0x04, EQUALS, 0x00]', '64=Free Play [if "DSW2", 0x04, EQUALS, 0x00]', '48=A 1C_1C / B 1C_6C [if "DSW2", 0x04, EQUALS, 0x00]', '32=A 2C_1C / B 1C_6C [if "DSW2", 0x04, EQUALS, 0x00]', '16=A 3C_1C / B 1C_6C [if "DSW2", 0x04, EQUALS, 0x00]', '0=Free Play [if "DSW2", 0x04, EQUALS, 0x00]']};
MERGE (n:KG {id: 'inputs:travrusa/DSW2'}) SET n:Port SET n += {tag: 'DSW2', modify: false};
MERGE (n:KG {id: 'inputs:travrusa/DSW2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, modifiers: ['PORT_DIPLOCATION("DSW2:1")', 'PORT_CHANGED_MEMBER(DEVICE_SELF, FUNC(travrusa_state::flipscreen_switch), 0)'], name: 'Flip Screen', defaultValue: 1, location: 'DSW2:1', settings: ['1=Off', '0=On']};
MERGE (n:KG {id: 'inputs:travrusa/DSW2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, modifiers: ['PORT_DIPLOCATION("DSW2:2")'], name: 'Cabinet', defaultValue: 0, location: 'DSW2:2', settings: ['0=Upright', '2=Cocktail']};
MERGE (n:KG {id: 'inputs:travrusa/DSW2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 4, modifiers: ['PORT_DIPLOCATION("DSW2:3")'], name: 'Coin Mode', defaultValue: 4, location: 'DSW2:3', settings: ['4=Mode 1', '0=Mode 2']};
MERGE (n:KG {id: 'inputs:travrusa/DSW2/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 8, modifiers: ['PORT_DIPLOCATION("DSW2:4")'], name: 'Speed Type', defaultValue: 8, location: 'DSW2:4', settings: ['8=mph', '0=km/h']};
MERGE (n:KG {id: 'inputs:travrusa/DSW2/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 16, modifiers: ['PORT_DIPLOCATION("DSW2:5")'], name: 'Stop Mode (Cheat)', defaultValue: 16, location: 'DSW2:5', settings: ['16=Off', '0=On']};
MERGE (n:KG {id: 'inputs:travrusa/DSW2/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 32, modifiers: ['PORT_DIPLOCATION("DSW2:6")'], name: 'Title', defaultValue: 32, location: 'DSW2:6', settings: ['32=Traverse USA', '0=Zippy Race']};
MERGE (n:KG {id: 'inputs:travrusa/DSW2/f6'}) SET n:PortField SET n += {kind: 'dip', mask: 64, modifiers: ['PORT_DIPLOCATION("DSW2:7")'], name: 'Invulnerability (Cheat)', defaultValue: 64, location: 'DSW2:7', settings: ['64=Off', '0=On']};
MERGE (n:KG {id: 'inputs:travrusa/DSW2/f7'}) SET n:PortField SET n += {kind: 'service', mask: 128, activeLow: true, defaultValue: 128};
MERGE (n:KG {id: 'gfxlayout:spritelayout'}) SET n:GfxLayout SET n += {name: 'spritelayout', width: 16, height: 16, total: 'RGN_FRAC(1,3)', planes: 3, planeOffsets: ['RGN_FRAC(2,3)', 'RGN_FRAC(1,3)', 'RGN_FRAC(0,3)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 128, 129, 130, 131, 132, 133, 134, 135], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120], charIncrement: 256};
MERGE (n:KG {id: 'gfxlayout:gfx_8x8x3_planar'}) SET n:GfxLayout SET n += {name: 'gfx_8x8x3_planar', width: 8, height: 8, total: 'RGN_FRAC(1,3)', planes: 3, planeOffsets: ['RGN_FRAC(2,3)', 'RGN_FRAC(1,3)', 'RGN_FRAC(0,3)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxdecode:gfx_travrusa'}) SET n:GfxDecode SET n += {name: 'gfx_travrusa', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 683, sourceColumn: 8, sourceEndLine: 683};
MERGE (n:KG {id: 'gfxdecode:gfx_travrusa/e0'}) SET n:GfxDecodeEntry SET n += {region: 'tiles', offset: 0, layout: 'gfx_8x8x3_planar', colorBase: 0, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_travrusa/e1'}) SET n:GfxDecodeEntry SET n += {region: 'sprites', offset: 0, layout: 'spritelayout', colorBase: 128, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'device:travrusa_state.travrusa/palette/callback:palette_init'}) SET n:Callback SET n += {signal: 'palette_init', operation: 'palette_init', raw: 'PALETTE(config, m_palette, FUNC(travrusa_state::travrusa_palette), 16*8+16*8, 128+16)', ownerTag: 'palette', targetClass: 'travrusa_state', targetMethod: 'travrusa_palette', entries: 144, sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 718};
MERGE (n:KG {id: 'handler:travrusa_state.travrusa_palette'}) SET n:Handler SET n += {method: 'travrusa_palette', ownerClass: 'travrusa_state', sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 149, sourceColumn: 1, sourceEndLine: 215, sourceParameters: 'palette_device &palette', sourceBody: 'const uint8_t *color_prom = memregion("proms")->base();

	// create a lookup table for the palette
	for (int i = 0; i < 0x80; i++)
	{
		int bit0, bit1, bit2;

		// red component
		bit0 = BIT(color_prom[i], 6);
		bit1 = BIT(color_prom[i], 7);
		int const r = 0x52 * bit0 + 0xad * bit1;

		// green component
		bit0 = BIT(color_prom[i], 3);
		bit1 = BIT(color_prom[i], 4);
		bit2 = BIT(color_prom[i], 5);
		int const g = 0x21 * bit0 + 0x47 * bit1 + 0x97 * bit2;

		// blue component
		bit0 = BIT(color_prom[i], 0);
		bit1 = BIT(color_prom[i], 1);
		bit2 = BIT(color_prom[i], 2);
		int const b = 0x21 * bit0 + 0x47 * bit1 + 0x97 * bit2;

		palette.set_indirect_color(i, rgb_t(r, g, b));
	}

	for (int i = 0x80; i < 0x90; i++)
	{
		int bit0, bit1, bit2;

		// red component
		bit0 = BIT(color_prom[(i - 0x80) + 0x200], 6);
		bit1 = BIT(color_prom[(i - 0x80) + 0x200], 7);
		int const r = 0x52 * bit0 + 0xad * bit1;

		// green component
		bit0 = BIT(color_prom[(i - 0x80) + 0x200], 3);
		bit1 = BIT(color_prom[(i - 0x80) + 0x200], 4);
		bit2 = BIT(color_prom[(i - 0x80) + 0x200], 5);
		int const g = 0x21 * bit0 + 0x47 * bit1 + 0x97 * bit2;

		// blue component
		bit0 = BIT(color_prom[(i - 0x80) + 0x200], 0);
		bit1 = BIT(color_prom[(i - 0x80) + 0x200], 1);
		bit2 = BIT(color_prom[(i - 0x80) + 0x200], 2);
		int const b = 0x21 * bit0 + 0x47 * bit1 + 0x97 * bit2;

		palette.set_indirect_color(i, rgb_t(r, g, b));
	}

	// color_prom now points to the beginning of the lookup table
	color_prom += 0x220;

	// characters
	for (int i = 0; i < 0x80; i++)
		palette.set_pen_indirect(i, i);

	// sprites
	for (int i = 0x80; i < 0x100; i++)
	{
		uint8_t const ctabentry = (color_prom[i - 0x80] & 0x0f) | 0x80;
		palette.set_pen_indirect(i, ctabentry);
	}'};
MATCH (a:KG {id: 'game:travrusa'}), (b:KG {id: 'file:src/mame/irem/travrusa.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 1007, sourceColumn: 1, sourceEndLine: 1007};
MATCH (a:KG {id: 'game:travrusa'}), (b:KG {id: 'machine:travrusa_state.travrusa'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:travrusa'}), (b:KG {id: 'inputs:travrusa'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:travrusa'}), (b:KG {id: 'romset:travrusa'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/travrusa.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/travrusa.cpp'}), (b:KG {id: 'file:irem.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/travrusa.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/travrusa.cpp'}), (b:KG {id: 'file:emupal.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/travrusa.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/travrusa.cpp'}), (b:KG {id: 'file:tilemap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:travrusa_state.travrusa'}), (b:KG {id: 'file:src/mame/irem/travrusa.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 701, sourceColumn: 1, sourceEndLine: 722};
MATCH (a:KG {id: 'machine:travrusa_state.travrusa'}), (b:KG {id: 'handler:travrusa_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:travrusa_state.travrusa'}), (b:KG {id: 'device:travrusa_state.travrusa/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:travrusa_state.travrusa'}), (b:KG {id: 'device:travrusa_state.travrusa/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:travrusa_state.travrusa'}), (b:KG {id: 'device:travrusa_state.travrusa/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:travrusa_state.travrusa'}), (b:KG {id: 'gfxdecode:gfx_travrusa'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:travrusa_state.travrusa'}), (b:KG {id: 'device:travrusa_state.travrusa/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:travrusa_state.travrusa'}), (b:KG {id: 'device:travrusa_state.travrusa/irem_audio'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:travrusa'}), (b:KG {id: 'file:src/mame/irem/travrusa.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 473, sourceColumn: 8, sourceEndLine: 473};
MATCH (a:KG {id: 'inputs:travrusa'}), (b:KG {id: 'inputs:travrusa/SYSTEM'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:travrusa'}), (b:KG {id: 'inputs:travrusa/P1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:travrusa'}), (b:KG {id: 'inputs:travrusa/P2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:travrusa'}), (b:KG {id: 'inputs:travrusa/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:travrusa'}), (b:KG {id: 'inputs:travrusa/DSW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:travrusa'}), (b:KG {id: 'file:src/mame/irem/travrusa.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 755, sourceColumn: 1, sourceEndLine: 755};
MATCH (a:KG {id: 'romset:travrusa'}), (b:KG {id: 'region:travrusa/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:travrusa'}), (b:KG {id: 'region:travrusa/irem_audio:iremsound'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:travrusa'}), (b:KG {id: 'region:travrusa/tiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:travrusa'}), (b:KG {id: 'region:travrusa/sprites'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:travrusa'}), (b:KG {id: 'region:travrusa/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:travrusa_state.video_start'}), (b:KG {id: 'handler:travrusa_state.get_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:travrusa_state.travrusa/maincpu'}), (b:KG {id: 'map:travrusa_state.program_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:travrusa_state.travrusa/screen'}), (b:KG {id: 'device:travrusa_state.travrusa/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:travrusa_state.travrusa/screen'}), (b:KG {id: 'device:travrusa_state.travrusa/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_travrusa'}), (b:KG {id: 'file:src/mame/irem/travrusa.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 683, sourceColumn: 8, sourceEndLine: 683};
MATCH (a:KG {id: 'gfxdecode:gfx_travrusa'}), (b:KG {id: 'gfxdecode:gfx_travrusa/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_travrusa'}), (b:KG {id: 'gfxdecode:gfx_travrusa/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:travrusa_state.travrusa/palette'}), (b:KG {id: 'device:travrusa_state.travrusa/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:travrusa_state.travrusa/irem_audio'}), (b:KG {id: 'machine:m52_soundc_audio_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'inputs:travrusa/SYSTEM'}), (b:KG {id: 'inputs:travrusa/SYSTEM/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/SYSTEM'}), (b:KG {id: 'inputs:travrusa/SYSTEM/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/SYSTEM'}), (b:KG {id: 'inputs:travrusa/SYSTEM/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/SYSTEM'}), (b:KG {id: 'inputs:travrusa/SYSTEM/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/SYSTEM'}), (b:KG {id: 'inputs:travrusa/SYSTEM/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/SYSTEM'}), (b:KG {id: 'inputs:travrusa/SYSTEM/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/SYSTEM'}), (b:KG {id: 'inputs:travrusa/SYSTEM/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/SYSTEM'}), (b:KG {id: 'inputs:travrusa/SYSTEM/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/P1'}), (b:KG {id: 'inputs:travrusa/P1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/P1'}), (b:KG {id: 'inputs:travrusa/P1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/P1'}), (b:KG {id: 'inputs:travrusa/P1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/P1'}), (b:KG {id: 'inputs:travrusa/P1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/P1'}), (b:KG {id: 'inputs:travrusa/P1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/P1'}), (b:KG {id: 'inputs:travrusa/P1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/P1'}), (b:KG {id: 'inputs:travrusa/P1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/P1'}), (b:KG {id: 'inputs:travrusa/P1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/P2'}), (b:KG {id: 'inputs:travrusa/P2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/P2'}), (b:KG {id: 'inputs:travrusa/P2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/P2'}), (b:KG {id: 'inputs:travrusa/P2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/P2'}), (b:KG {id: 'inputs:travrusa/P2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/P2'}), (b:KG {id: 'inputs:travrusa/P2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/P2'}), (b:KG {id: 'inputs:travrusa/P2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/P2'}), (b:KG {id: 'inputs:travrusa/P2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/P2'}), (b:KG {id: 'inputs:travrusa/P2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/DSW1'}), (b:KG {id: 'inputs:travrusa/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/DSW1'}), (b:KG {id: 'inputs:travrusa/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/DSW1'}), (b:KG {id: 'inputs:travrusa/DSW1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/DSW1'}), (b:KG {id: 'inputs:travrusa/DSW1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/DSW2'}), (b:KG {id: 'inputs:travrusa/DSW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/DSW2'}), (b:KG {id: 'inputs:travrusa/DSW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/DSW2'}), (b:KG {id: 'inputs:travrusa/DSW2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/DSW2'}), (b:KG {id: 'inputs:travrusa/DSW2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/DSW2'}), (b:KG {id: 'inputs:travrusa/DSW2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/DSW2'}), (b:KG {id: 'inputs:travrusa/DSW2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/DSW2'}), (b:KG {id: 'inputs:travrusa/DSW2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:travrusa/DSW2'}), (b:KG {id: 'inputs:travrusa/DSW2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:travrusa/maincpu'}), (b:KG {id: 'rom:travrusa/maincpu/zr1-0.m3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:travrusa/maincpu'}), (b:KG {id: 'rom:travrusa/maincpu/zr1-5.l3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:travrusa/maincpu'}), (b:KG {id: 'rom:travrusa/maincpu/zr1-6a.k3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:travrusa/maincpu'}), (b:KG {id: 'rom:travrusa/maincpu/zr1-7.j3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:travrusa/irem_audio:iremsound'}), (b:KG {id: 'rom:travrusa/irem_audio:iremsound/mr10.1a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:travrusa/tiles'}), (b:KG {id: 'rom:travrusa/tiles/zippyrac.001'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:travrusa/tiles'}), (b:KG {id: 'rom:travrusa/tiles/mr8.3c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:travrusa/tiles'}), (b:KG {id: 'rom:travrusa/tiles/mr9.3a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:travrusa/sprites'}), (b:KG {id: 'rom:travrusa/sprites/zr1-8.n3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:travrusa/sprites'}), (b:KG {id: 'rom:travrusa/sprites/zr1-9.l3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:travrusa/sprites'}), (b:KG {id: 'rom:travrusa/sprites/zr1-10.k3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:travrusa/proms'}), (b:KG {id: 'rom:travrusa/proms/mmi6349.ij'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:travrusa/proms'}), (b:KG {id: 'rom:travrusa/proms/tbp18s.2'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:travrusa/proms'}), (b:KG {id: 'rom:travrusa/proms/tbp24s10.3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'map:travrusa_state.program_map'}), (b:KG {id: 'file:src/mame/irem/travrusa.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/travrusa.cpp', sourceLine: 445, sourceColumn: 1, sourceEndLine: 458};
MATCH (a:KG {id: 'map:travrusa_state.program_map'}), (b:KG {id: 'map:travrusa_state.program_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:travrusa_state.program_map'}), (b:KG {id: 'map:travrusa_state.program_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:travrusa_state.program_map'}), (b:KG {id: 'map:travrusa_state.program_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:travrusa_state.program_map'}), (b:KG {id: 'map:travrusa_state.program_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:travrusa_state.program_map'}), (b:KG {id: 'map:travrusa_state.program_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:travrusa_state.program_map'}), (b:KG {id: 'map:travrusa_state.program_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:travrusa_state.program_map'}), (b:KG {id: 'map:travrusa_state.program_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:travrusa_state.program_map'}), (b:KG {id: 'map:travrusa_state.program_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:travrusa_state.program_map'}), (b:KG {id: 'map:travrusa_state.program_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:travrusa_state.program_map'}), (b:KG {id: 'map:travrusa_state.program_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:travrusa_state.program_map'}), (b:KG {id: 'map:travrusa_state.program_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:travrusa_state.travrusa/screen/callback:screen:0'}), (b:KG {id: 'handler:travrusa_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:travrusa_state.travrusa/screen/callback:screen:1'}), (b:KG {id: 'device:travrusa_state.travrusa/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_travrusa/e0'}), (b:KG {id: 'gfxlayout:gfx_8x8x3_planar'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_travrusa/e1'}), (b:KG {id: 'gfxlayout:spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:travrusa_state.travrusa/palette/callback:palette_init'}), (b:KG {id: 'handler:travrusa_state.travrusa_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:m52_soundc_audio_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/irem/irem.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 466, sourceColumn: 1, sourceEndLine: 498};
MATCH (a:KG {id: 'machine:m52_soundc_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m52_soundc_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m52_soundc_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45m'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m52_soundc_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45l'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m52_soundc_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/msm1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:m52_soundc_audio_device.device_add_mconfig'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/filtermix'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:travrusa_state.program_map/range1'}), (b:KG {id: 'handler:travrusa_state.videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:travrusa_state.program_map/range2'}), (b:KG {id: 'handler:travrusa_state.scroll_x_low_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:travrusa_state.program_map/range3'}), (b:KG {id: 'handler:travrusa_state.scroll_x_high_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:travrusa_state.program_map/range5'}), (b:KG {id: 'handler:irem_audio_device.cmd_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'irem_audio'};
MATCH (a:KG {id: 'map:travrusa_state.program_map/range6'}), (b:KG {id: 'handler:travrusa_state.flipscreen_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:travrusa_state.screen_update'}), (b:KG {id: 'handler:travrusa_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:gfx_8x8x3_planar'}), (b:KG {id: 'file:src/mame/irem/travrusa.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:spritelayout'}), (b:KG {id: 'file:src/mame/irem/travrusa.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/irem.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/irem.cpp'}), (b:KG {id: 'file:irem.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/irem.cpp'}), (b:KG {id: 'file:cpu/m6800/m6801.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/irem.cpp'}), (b:KG {id: 'file:sound/discrete.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/irem/irem.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound/callback:iremsound:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound/callback:iremsound:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound/callback:iremsound:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound/callback:iremsound:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound'}), (b:KG {id: 'map:irem_audio_device.m52_small_sound_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45m'}), (b:KG {id: 'audioroute:device:m52_soundc_audio_device.device_add_mconfig/ay_45m/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45m'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45m/callback:ay_45m:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45m'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45m/callback:ay_45m:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45l'}), (b:KG {id: 'audioroute:device:m52_soundc_audio_device.device_add_mconfig/ay_45l/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45l'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45l/callback:ay_45l:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/msm1'}), (b:KG {id: 'audioroute:device:m52_soundc_audio_device.device_add_mconfig/msm1/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/msm1'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/msm1/callback:msm1:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/filtermix'}), (b:KG {id: 'audioroute:device:m52_soundc_audio_device.device_add_mconfig/filtermix/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'handler:travrusa_state.scroll_x_low_w'}), (b:KG {id: 'handler:travrusa_state.set_scroll'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:travrusa_state.scroll_x_high_w'}), (b:KG {id: 'handler:travrusa_state.set_scroll'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound/callback:iremsound:0'}), (b:KG {id: 'handler:m52_soundc_audio_device.m6803_port1_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound/callback:iremsound:1'}), (b:KG {id: 'handler:m52_soundc_audio_device.m6803_port1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound/callback:iremsound:2'}), (b:KG {id: 'handler:m52_soundc_audio_device.m6803_port2_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound/callback:iremsound:3'}), (b:KG {id: 'handler:m52_soundc_audio_device.m6803_port2_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:irem_audio_device.m52_small_sound_map'}), (b:KG {id: 'file:src/mame/irem/irem.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/irem/irem.cpp', sourceLine: 360, sourceColumn: 1, sourceEndLine: 366};
MATCH (a:KG {id: 'map:irem_audio_device.m52_small_sound_map'}), (b:KG {id: 'map:irem_audio_device.m52_small_sound_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:irem_audio_device.m52_small_sound_map'}), (b:KG {id: 'map:irem_audio_device.m52_small_sound_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:irem_audio_device.m52_small_sound_map'}), (b:KG {id: 'map:irem_audio_device.m52_small_sound_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45m/callback:ay_45m:0'}), (b:KG {id: 'handler:irem_audio_device.soundlatch_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45m/callback:ay_45m:1'}), (b:KG {id: 'handler:irem_audio_device.ay8910_45M_portb_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/ay_45l/callback:ay_45l:0'}), (b:KG {id: 'handler:irem_audio_device.ay8910_45L_porta_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/msm1/callback:msm1:0'}), (b:KG {id: 'device:m52_soundc_audio_device.device_add_mconfig/iremsound'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'map:irem_audio_device.m52_small_sound_map/range0'}), (b:KG {id: 'handler:irem_audio_device.m52_adpcm_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:irem_audio_device.m52_small_sound_map/range1'}), (b:KG {id: 'handler:irem_audio_device.sound_irq_ack_w'}) MERGE (a)-[r:WRITES]->(b);
