// mamekit knowledge graph — driver src/mame/sega/system1.cpp
// generated 2026-09-05T03:50:23.586Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/sega/system1.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/sega/system1.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:system1.h'}) SET n:SourceFile SET n += {path: 'system1.h', external: true};
MERGE (n:KG {id: 'file:machine/input_merger.h'}) SET n:SourceFile SET n += {path: 'machine/input_merger.h', external: true};
MERGE (n:KG {id: 'file:machine/segacrpt_device.h'}) SET n:SourceFile SET n += {path: 'machine/segacrpt_device.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/mc8123.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/mc8123.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'game:wboy'}) SET n:Game SET n += {name: 'wboy', year: '1986', company: 'Escape (Sega license)', fullname: 'Wonder Boy (set 1, 315-5177)', monitor: 'ROT0', cls: 'system1_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 5806, sourceColumn: 1, sourceEndLine: 5806};
MERGE (n:KG {id: 'romset:wboy'}) SET n:RomSet SET n += {name: 'wboy', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 4297, sourceColumn: 1, sourceEndLine: 4297};
MERGE (n:KG {id: 'region:wboy/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2689, sourceColumn: 2, sourceEndLine: 2689};
MERGE (n:KG {id: 'rom:wboy/maincpu/epr-7489.116'}) SET n:Rom SET n += {file: 'epr-7489.116', offset: 0, size: 16384, crc: '130f4b70', sha1: '4a2ea5bc06f3a240c68813be3a9f9bef2bcf4e9c', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 4299, sourceColumn: 2, sourceEndLine: 4299};
MERGE (n:KG {id: 'rom:wboy/maincpu/epr-7490.109'}) SET n:Rom SET n += {file: 'epr-7490.109', offset: 16384, size: 16384, crc: '9e656733', sha1: '2233beb874b7cb48899afe603fef567932951a88', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 4300, sourceColumn: 2, sourceEndLine: 4300};
MERGE (n:KG {id: 'rom:wboy/maincpu/epr-7491.96'}) SET n:Rom SET n += {file: 'epr-7491.96', offset: 32768, size: 16384, crc: '1f7d0efe', sha1: 'a1b4f8faf1614f4808df1292209c340f1490adbd', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 4301, sourceColumn: 2, sourceEndLine: 4301};
MERGE (n:KG {id: 'region:wboy/soundcpu'}) SET n:RomRegion SET n += {tag: 'soundcpu', size: 65536, flags: '0', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2697, sourceColumn: 2, sourceEndLine: 2697};
MERGE (n:KG {id: 'rom:wboy/soundcpu/epr-7498.120'}) SET n:Rom SET n += {file: 'epr-7498.120', offset: 0, size: 8192, crc: '78ae1e7b', sha1: '86032f443359b0bb2766e33024ed2e320aa9bc84', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 4304, sourceColumn: 2, sourceEndLine: 4304};
MERGE (n:KG {id: 'region:wboy/tiles'}) SET n:RomRegion SET n += {tag: 'tiles', size: 49152, flags: '0', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2700, sourceColumn: 2, sourceEndLine: 2700};
MERGE (n:KG {id: 'rom:wboy/tiles/epr-7497.62'}) SET n:Rom SET n += {file: 'epr-7497.62', offset: 0, size: 8192, crc: '08d609ca', sha1: '11799e9ef7e6942b304f132b404bff3ed44d524b', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 4307, sourceColumn: 2, sourceEndLine: 4307};
MERGE (n:KG {id: 'rom:wboy/tiles/epr-7496.61'}) SET n:Rom SET n += {file: 'epr-7496.61', offset: 8192, size: 8192, crc: '6f61fdf1', sha1: '21826aebf5835b9f3d9c467c8647809c1bc0d01f', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 4308, sourceColumn: 2, sourceEndLine: 4308};
MERGE (n:KG {id: 'rom:wboy/tiles/epr-7495.64'}) SET n:Rom SET n += {file: 'epr-7495.64', offset: 16384, size: 8192, crc: '6a0d2c2d', sha1: '8c21d7f0768e8dda2b7185f3c510cae4229a4a2e', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 4309, sourceColumn: 2, sourceEndLine: 4309};
MERGE (n:KG {id: 'rom:wboy/tiles/epr-7494.63'}) SET n:Rom SET n += {file: 'epr-7494.63', offset: 24576, size: 8192, crc: 'a8e281c7', sha1: 'a88b80a7b94ab1401bbf28d7707fdf28a5505127', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 4310, sourceColumn: 2, sourceEndLine: 4310};
MERGE (n:KG {id: 'rom:wboy/tiles/epr-7493.66'}) SET n:Rom SET n += {file: 'epr-7493.66', offset: 32768, size: 8192, crc: '89305df4', sha1: '7a5098624769a31e7512f56831e818bce6a18871', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 4311, sourceColumn: 2, sourceEndLine: 4311};
MERGE (n:KG {id: 'rom:wboy/tiles/epr-7492.65'}) SET n:Rom SET n += {file: 'epr-7492.65', offset: 40960, size: 8192, crc: '60f806b1', sha1: 'f91e5868a455dff2bce3c2891a7cfd648957cd73', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 4312, sourceColumn: 2, sourceEndLine: 4312};
MERGE (n:KG {id: 'region:wboy/sprites'}) SET n:RomRegion SET n += {tag: 'sprites', size: 65536, flags: '0', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2708, sourceColumn: 2, sourceEndLine: 2708};
MERGE (n:KG {id: 'rom:wboy/sprites/epr-7485.117'}) SET n:Rom SET n += {file: 'epr-7485.117', offset: 0, size: 16384, crc: 'c2891722', sha1: 'e4e11c0e9bd0dc121c25349493f2b13d2ff8c807', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 4315, sourceColumn: 2, sourceEndLine: 4315};
MERGE (n:KG {id: 'rom:wboy/sprites/epr-7487.04'}) SET n:Rom SET n += {file: 'epr-7487.04', offset: 16384, size: 16384, crc: '2d3a421b', sha1: 'd70440a8703ccface3212cd9544c950b36263e8c', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 4316, sourceColumn: 2, sourceEndLine: 4316};
MERGE (n:KG {id: 'rom:wboy/sprites/epr-7486.110'}) SET n:Rom SET n += {file: 'epr-7486.110', offset: 32768, size: 16384, crc: '8d622c50', sha1: '9a76a50204c618347d3e8eee6cda841becd906eb', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 4317, sourceColumn: 2, sourceEndLine: 4317};
MERGE (n:KG {id: 'rom:wboy/sprites/epr-7488.05'}) SET n:Rom SET n += {file: 'epr-7488.05', offset: 49152, size: 16384, crc: '007c2f1b', sha1: 'c2f1376144a49d20cb35384648e06d06978474c1', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 4318, sourceColumn: 2, sourceEndLine: 4318};
MERGE (n:KG {id: 'region:wboy/lookup_proms'}) SET n:RomRegion SET n += {tag: 'lookup_proms', size: 256, flags: '0', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2712, sourceColumn: 2, sourceEndLine: 2712};
MERGE (n:KG {id: 'rom:wboy/lookup_proms/pr-5317.76'}) SET n:Rom SET n += {file: 'pr-5317.76', offset: 0, size: 256, crc: '648350b8', sha1: 'c7986aa9127ef5b50b845434cb4e81dff9861cd2', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2994, sourceColumn: 2, sourceEndLine: 2994};
MERGE (n:KG {id: 'map:system1_state.system1_map'}) SET n:AddressMap SET n += {cls: 'system1_state', name: 'system1_map', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 746, sourceColumn: 1, sourceEndLine: 758};
MERGE (n:KG {id: 'map:system1_state.system1_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom()', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 748, sourceColumn: 2, sourceEndLine: 748, rom: true};
MERGE (n:KG {id: 'map:system1_state.system1_map/range1'}) SET n:AddressRange SET n += {start: 32768, end: 49151, raw: 'map(0x8000, 0xbfff).bankr("bank1")', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 749, sourceColumn: 2, sourceEndLine: 749, bankRead: 'bank1'};
MERGE (n:KG {id: 'map:system1_state.system1_map/range2'}) SET n:AddressRange SET n += {start: 49152, end: 53247, raw: 'map(0xc000, 0xcfff).ram().share("ram")', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 750, sourceColumn: 2, sourceEndLine: 750, ram: true, share: 'ram'};
MERGE (n:KG {id: 'map:system1_state.system1_map/range3'}) SET n:AddressRange SET n += {start: 53248, end: 55295, raw: 'map(0xd000, 0xd7ff).ram().share("spriteram")', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 751, sourceColumn: 2, sourceEndLine: 751, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:system1_state.system1_map/range4'}) SET n:AddressRange SET n += {start: 55296, end: 57343, raw: 'map(0xd800, 0xdfff).ram().w(FUNC(system1_state::paletteram_w)).share("paletteram")', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 752, sourceColumn: 2, sourceEndLine: 752, ram: true, share: 'paletteram'};
MERGE (n:KG {id: 'handler:system1_state.paletteram_w'}) SET n:Handler SET n += {method: 'paletteram_w', ownerClass: 'system1_state', sourceFile: 'src/mame/sega/system1_v.cpp', sourceLine: 371, sourceColumn: 1, sourceEndLine: 375, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'm_paletteram[offset] = data;
	m_palette->set_pen_indirect(offset, m_paletteram[offset]);'};
MERGE (n:KG {id: 'map:system1_state.system1_map/range5'}) SET n:AddressRange SET n += {start: 57344, end: 61439, raw: 'map(0xe000, 0xefff).rw(FUNC(system1_state::videoram_r), FUNC(system1_state::videoram_w))', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 753, sourceColumn: 2, sourceEndLine: 753};
MERGE (n:KG {id: 'handler:system1_state.videoram_r'}) SET n:Handler SET n += {method: 'videoram_r', ownerClass: 'system1_state', sourceFile: 'src/mame/sega/system1_v.cpp', sourceLine: 335, sourceColumn: 1, sourceEndLine: 341, sourceParameters: 'offs_t offset', sourceBody: 'if (!machine().side_effects_disabled())
		videoram_wait_states(m_maincpu);
	offset |= 0x1000 * ((m_videoram_bank >> 1) % (m_tilemap_pages / 2));
	return m_videoram[offset];'};
MERGE (n:KG {id: 'handler:system1_state.videoram_wait_states'}) SET n:Handler SET n += {method: 'videoram_wait_states', ownerClass: 'system1_state', sourceFile: 'src/mame/sega/system1_v.cpp', sourceLine: 319, sourceColumn: 1, sourceEndLine: 333, sourceParameters: 'cpu_device *cpu', sourceBody: '/* The main Z80\'s CPU clock is halted whenever an access to VRAM happens,
	   and is only restarted by the FIXST signal, which occurs once every
	   \'n\' pixel clocks. \'n\' is determined by the horizontal control PAL. */

	/* this assumes 4 5MHz pixel clocks per FIXST, or 3.2 4MHz CPU clocks,
	   and is based on a dump of 315-5137 */
	const u32 cpu_cycles_per_fixst = 32; // 3.2 * 10
	const u32 fixst_offset = cpu_cycles_per_fixst / 2;
	const u64 total_cycles = cpu->total_cycles() * 10ULL;
	u32 cycles_until_next_fixst = cpu_cycles_per_fixst - ((total_cycles - fixst_offset) % cpu_cycles_per_fixst);

	cpu->adjust_icount(-((cycles_until_next_fixst + 5) / 10));'};
MERGE (n:KG {id: 'handler:system1_state.videoram_w'}) SET n:Handler SET n += {method: 'videoram_w', ownerClass: 'system1_state', sourceFile: 'src/mame/sega/system1_v.cpp', sourceLine: 343, sourceColumn: 1, sourceEndLine: 357, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'videoram_wait_states(m_maincpu);
	offset |= 0x1000 * ((m_videoram_bank >> 1) % (m_tilemap_pages / 2));

	// force a partial update if the page is changing
	if (m_tilemap_pages > 2 && offset >= 0x740 && offset < 0x748 && offset % 2 == 0)
	{
		//m_screen->update_now();
		m_screen->update_partial(m_screen->vpos());
	}

	m_videoram[offset] = data;
	m_tilemap_page[offset / 0x800]->mark_tile_dirty((offset % 0x800) / 2);'};
MERGE (n:KG {id: 'map:system1_state.system1_map/range6'}) SET n:AddressRange SET n += {start: 61440, end: 62463, raw: 'map(0xf000, 0xf3ff).rw(FUNC(system1_state::mixer_collision_r), FUNC(system1_state::mixer_collision_w))', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 754, sourceColumn: 2, sourceEndLine: 754};
MERGE (n:KG {id: 'handler:system1_state.mixer_collision_r'}) SET n:Handler SET n += {method: 'mixer_collision_r', ownerClass: 'system1_state', sourceFile: 'src/mame/sega/system1_v.cpp', sourceLine: 263, sourceColumn: 1, sourceEndLine: 268, sourceParameters: 'offs_t offset', sourceBody: '//  m_screen->update_now();
	m_screen->update_partial(m_screen->vpos());
	return m_mix_collide[offset & 0x3f] | 0x7e | (m_mix_collide_summary << 7);'};
MERGE (n:KG {id: 'handler:system1_state.mixer_collision_w'}) SET n:Handler SET n += {method: 'mixer_collision_w', ownerClass: 'system1_state', sourceFile: 'src/mame/sega/system1_v.cpp', sourceLine: 270, sourceColumn: 1, sourceEndLine: 275, sourceParameters: 'offs_t offset, u8 data', sourceBody: '//  m_screen->update_now();
	m_screen->update_partial(m_screen->vpos());
	m_mix_collide[offset & 0x3f] = 0;'};
MERGE (n:KG {id: 'map:system1_state.system1_map/range7'}) SET n:AddressRange SET n += {start: 62464, end: 63487, raw: 'map(0xf400, 0xf7ff).w(FUNC(system1_state::mixer_collision_reset_w))', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 755, sourceColumn: 2, sourceEndLine: 755};
MERGE (n:KG {id: 'handler:system1_state.mixer_collision_reset_w'}) SET n:Handler SET n += {method: 'mixer_collision_reset_w', ownerClass: 'system1_state', sourceFile: 'src/mame/sega/system1_v.cpp', sourceLine: 277, sourceColumn: 1, sourceEndLine: 282, sourceParameters: 'u8 data', sourceBody: '//  m_screen->update_now();
	m_screen->update_partial(m_screen->vpos());
	m_mix_collide_summary = 0;'};
MERGE (n:KG {id: 'map:system1_state.system1_map/range8'}) SET n:AddressRange SET n += {start: 63488, end: 64511, raw: 'map(0xf800, 0xfbff).rw(FUNC(system1_state::sprite_collision_r), FUNC(system1_state::sprite_collision_w))', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 756, sourceColumn: 2, sourceEndLine: 756};
MERGE (n:KG {id: 'handler:system1_state.sprite_collision_r'}) SET n:Handler SET n += {method: 'sprite_collision_r', ownerClass: 'system1_state', sourceFile: 'src/mame/sega/system1_v.cpp', sourceLine: 291, sourceColumn: 1, sourceEndLine: 296, sourceParameters: 'offs_t offset', sourceBody: '//  m_screen->update_now();
	m_screen->update_partial(m_screen->vpos());
	return m_sprite_collide[offset & 0x3ff] | 0x7e | (m_sprite_collide_summary << 7);'};
MERGE (n:KG {id: 'handler:system1_state.sprite_collision_w'}) SET n:Handler SET n += {method: 'sprite_collision_w', ownerClass: 'system1_state', sourceFile: 'src/mame/sega/system1_v.cpp', sourceLine: 298, sourceColumn: 1, sourceEndLine: 303, sourceParameters: 'offs_t offset, u8 data', sourceBody: '//  m_screen->update_now();
	m_screen->update_partial(m_screen->vpos());
	m_sprite_collide[offset & 0x3ff] = 0;'};
MERGE (n:KG {id: 'map:system1_state.system1_map/range9'}) SET n:AddressRange SET n += {start: 64512, end: 65535, raw: 'map(0xfc00, 0xffff).w(FUNC(system1_state::sprite_collision_reset_w))', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 757, sourceColumn: 2, sourceEndLine: 757};
MERGE (n:KG {id: 'handler:system1_state.sprite_collision_reset_w'}) SET n:Handler SET n += {method: 'sprite_collision_reset_w', ownerClass: 'system1_state', sourceFile: 'src/mame/sega/system1_v.cpp', sourceLine: 305, sourceColumn: 1, sourceEndLine: 310, sourceParameters: 'u8 data', sourceBody: '//  m_screen->update_now();
	m_screen->update_partial(m_screen->vpos());
	m_sprite_collide_summary = 0;'};
MERGE (n:KG {id: 'map:system1_state.decrypted_opcodes_map'}) SET n:AddressMap SET n += {cls: 'system1_state', name: 'decrypted_opcodes_map', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 760, sourceColumn: 1, sourceEndLine: 767};
MERGE (n:KG {id: 'map:system1_state.decrypted_opcodes_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom().share("decrypted_opcodes")', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 762, sourceColumn: 2, sourceEndLine: 762, rom: true, share: 'decrypted_opcodes'};
MERGE (n:KG {id: 'map:system1_state.decrypted_opcodes_map/range1'}) SET n:AddressRange SET n += {start: 32768, end: 49151, raw: 'map(0x8000, 0xbfff).bankr("bank1")', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 763, sourceColumn: 2, sourceEndLine: 763, bankRead: 'bank1'};
MERGE (n:KG {id: 'map:system1_state.decrypted_opcodes_map/range2'}) SET n:AddressRange SET n += {start: 49152, end: 53247, raw: 'map(0xc000, 0xcfff).ram().share("ram")', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 764, sourceColumn: 2, sourceEndLine: 764, ram: true, share: 'ram'};
MERGE (n:KG {id: 'map:system1_state.decrypted_opcodes_map/range3'}) SET n:AddressRange SET n += {start: 53248, end: 55295, raw: 'map(0xd000, 0xd7ff).ram().share("spriteram")', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 765, sourceColumn: 2, sourceEndLine: 765, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:system1_state.decrypted_opcodes_map/range4'}) SET n:AddressRange SET n += {start: 55296, end: 57343, raw: 'map(0xd800, 0xdfff).ram().w(FUNC(system1_state::paletteram_w)).share("paletteram")', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 766, sourceColumn: 2, sourceEndLine: 766, ram: true, share: 'paletteram'};
MERGE (n:KG {id: 'map:system1_state.system1_ppi_io_map'}) SET n:AddressMap SET n += {cls: 'system1_state', name: 'system1_ppi_io_map', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 794, sourceColumn: 1, sourceEndLine: 804, globalMask: 31};
MERGE (n:KG {id: 'map:system1_state.system1_ppi_io_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 0, raw: 'map(0x00, 0x00).mirror(0x03).portr("P1")', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 797, sourceColumn: 2, sourceEndLine: 797, mirror: 3, portRead: 'P1'};
MERGE (n:KG {id: 'map:system1_state.system1_ppi_io_map/range1'}) SET n:AddressRange SET n += {start: 4, end: 4, raw: 'map(0x04, 0x04).mirror(0x03).portr("P2")', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 798, sourceColumn: 2, sourceEndLine: 798, mirror: 3, portRead: 'P2'};
MERGE (n:KG {id: 'map:system1_state.system1_ppi_io_map/range2'}) SET n:AddressRange SET n += {start: 8, end: 8, raw: 'map(0x08, 0x08).mirror(0x03).portr("SYSTEM")', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 799, sourceColumn: 2, sourceEndLine: 799, mirror: 3, portRead: 'SYSTEM'};
MERGE (n:KG {id: 'map:system1_state.system1_ppi_io_map/range3'}) SET n:AddressRange SET n += {start: 12, end: 12, raw: 'map(0x0c, 0x0c).mirror(0x02).portr("SWA")', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 800, sourceColumn: 2, sourceEndLine: 800, mirror: 2, portRead: 'SWA'};
MERGE (n:KG {id: 'map:system1_state.system1_ppi_io_map/range4'}) SET n:AddressRange SET n += {start: 13, end: 13, raw: 'map(0x0d, 0x0d).mirror(0x02).portr("SWB")', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 801, sourceColumn: 2, sourceEndLine: 801, mirror: 2, portRead: 'SWB'};
MERGE (n:KG {id: 'map:system1_state.system1_ppi_io_map/range5'}) SET n:AddressRange SET n += {start: 16, end: 16, raw: 'map(0x10, 0x10).mirror(0x03).portr("SWB")', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 802, sourceColumn: 2, sourceEndLine: 802, mirror: 3, portRead: 'SWB'};
MERGE (n:KG {id: 'map:system1_state.system1_ppi_io_map/range6'}) SET n:AddressRange SET n += {start: 20, end: 23, raw: 'map(0x14, 0x17).rw(m_ppi8255, FUNC(i8255_device::read), FUNC(i8255_device::write))', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 803, sourceColumn: 2, sourceEndLine: 803};
MERGE (n:KG {id: 'handler:i8255_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'i8255_device', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 803, sourceColumn: 2, sourceEndLine: 803};
MERGE (n:KG {id: 'handler:i8255_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'i8255_device', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 803, sourceColumn: 2, sourceEndLine: 803};
MERGE (n:KG {id: 'map:system1_state.system1_pio_io_map'}) SET n:AddressMap SET n += {cls: 'system1_state', name: 'system1_pio_io_map', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 817, sourceColumn: 1, sourceEndLine: 827, globalMask: 31};
MERGE (n:KG {id: 'map:system1_state.system1_pio_io_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 0, raw: 'map(0x00, 0x00).mirror(0x03).portr("P1")', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 820, sourceColumn: 2, sourceEndLine: 820, mirror: 3, portRead: 'P1'};
MERGE (n:KG {id: 'map:system1_state.system1_pio_io_map/range1'}) SET n:AddressRange SET n += {start: 4, end: 4, raw: 'map(0x04, 0x04).mirror(0x03).portr("P2")', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 821, sourceColumn: 2, sourceEndLine: 821, mirror: 3, portRead: 'P2'};
MERGE (n:KG {id: 'map:system1_state.system1_pio_io_map/range2'}) SET n:AddressRange SET n += {start: 8, end: 8, raw: 'map(0x08, 0x08).mirror(0x03).portr("SYSTEM")', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 822, sourceColumn: 2, sourceEndLine: 822, mirror: 3, portRead: 'SYSTEM'};
MERGE (n:KG {id: 'map:system1_state.system1_pio_io_map/range3'}) SET n:AddressRange SET n += {start: 12, end: 12, raw: 'map(0x0c, 0x0c).mirror(0x02).portr("SWA")', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 823, sourceColumn: 2, sourceEndLine: 823, mirror: 2, portRead: 'SWA'};
MERGE (n:KG {id: 'map:system1_state.system1_pio_io_map/range4'}) SET n:AddressRange SET n += {start: 13, end: 13, raw: 'map(0x0d, 0x0d).mirror(0x02).portr("SWB")', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 824, sourceColumn: 2, sourceEndLine: 824, mirror: 2, portRead: 'SWB'};
MERGE (n:KG {id: 'map:system1_state.system1_pio_io_map/range5'}) SET n:AddressRange SET n += {start: 16, end: 16, raw: 'map(0x10, 0x10).mirror(0x03).portr("SWB")', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 825, sourceColumn: 2, sourceEndLine: 825, mirror: 3, portRead: 'SWB'};
MERGE (n:KG {id: 'map:system1_state.system1_pio_io_map/range6'}) SET n:AddressRange SET n += {start: 24, end: 27, raw: 'map(0x18, 0x1b).rw("pio", FUNC(z80pio_device::read), FUNC(z80pio_device::write))', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 826, sourceColumn: 2, sourceEndLine: 826};
MERGE (n:KG {id: 'handler:z80pio_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'z80pio_device', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 826, sourceColumn: 2, sourceEndLine: 826};
MERGE (n:KG {id: 'handler:z80pio_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'z80pio_device', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 826, sourceColumn: 2, sourceEndLine: 826};
MERGE (n:KG {id: 'map:system1_state.sound_map'}) SET n:AddressMap SET n += {cls: 'system1_state', name: 'sound_map', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 843, sourceColumn: 1, sourceEndLine: 850};
MERGE (n:KG {id: 'map:system1_state.sound_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom()', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 845, sourceColumn: 2, sourceEndLine: 845, rom: true};
MERGE (n:KG {id: 'map:system1_state.sound_map/range1'}) SET n:AddressRange SET n += {start: 32768, end: 34815, raw: 'map(0x8000, 0x87ff).mirror(0x1800).ram()', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 846, sourceColumn: 2, sourceEndLine: 846, mirror: 6144, ram: true};
MERGE (n:KG {id: 'map:system1_state.sound_map/range2'}) SET n:AddressRange SET n += {start: 40960, end: 40960, raw: 'map(0xa000, 0xa000).mirror(0x1fff).w("sn1", FUNC(sn76489a_device::write))', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 847, sourceColumn: 2, sourceEndLine: 847, mirror: 8191};
MERGE (n:KG {id: 'handler:sn76489a_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'sn76489a_device', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 848, sourceColumn: 2, sourceEndLine: 848};
MERGE (n:KG {id: 'map:system1_state.sound_map/range3'}) SET n:AddressRange SET n += {start: 49152, end: 49152, raw: 'map(0xc000, 0xc000).mirror(0x1fff).w("sn2", FUNC(sn76489a_device::write))', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 848, sourceColumn: 2, sourceEndLine: 848, mirror: 8191};
MERGE (n:KG {id: 'map:system1_state.sound_map/range4'}) SET n:AddressRange SET n += {start: 57344, end: 57344, raw: 'map(0xe000, 0xe000).mirror(0x1fff).r(FUNC(system1_state::sound_data_r))', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 849, sourceColumn: 2, sourceEndLine: 849, mirror: 8191};
MERGE (n:KG {id: 'handler:system1_state.sound_data_r'}) SET n:Handler SET n += {method: 'sound_data_r', ownerClass: 'system1_state', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 523, sourceColumn: 1, sourceEndLine: 543, sourceConstants: ['PORT_A=0'], sourceParameters: '', sourceBody: '// if we have an 8255 PPI, get the data from the port and toggle the ack
	if (m_ppi8255 != nullptr)
	{
		m_ppi8255->pc6_w(0);
		m_ppi8255->pc6_w(1);
		return m_soundlatch->read();
	}

	// if we have a Z80 PIO, get the data from the port and toggle the strobe
	else if (m_pio != nullptr)
	{
		u8 data = m_pio->port_read(z80pio_device::PORT_A);
		m_pio->strobe(z80pio_device::PORT_A, false);
		m_pio->strobe(z80pio_device::PORT_A, true);
		return data;
	}

	return 0xff;'};
MERGE (n:KG {id: 'machine:system1_state.sys1ppi'}) SET n:MachineConfig SET n += {cls: 'system1_state', name: 'sys1ppi', calls: [], stateMembers: ['{"name":"m_mix_collide_summary","bits":8}', '{"name":"m_sprite_collide_summary","bits":8}', '{"name":"m_video_mode","bits":8}', '{"name":"m_videoram_bank","bits":8}', '{"name":"m_tilemap_pages","bits":8}', '{"name":"m_adjust_cycles","bits":8}', '{"name":"m_mcu_control","bits":8}', '{"name":"m_nob_maincpu_latch","bits":8}', '{"name":"m_nob_mcu_latch","bits":8}', '{"name":"m_nob_mcu_status","bits":8}', '{"name":"m_nobb_inport23_step","bits":8}'], resetHandlers: ['system1_state.machine_reset'], startHandlers: ['system1_state.video_start'], sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2197, sourceColumn: 1, sourceEndLine: 2248};
MERGE (n:KG {id: 'handler:system1_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'system1_state', sourceFile: 'src/mame/sega/system1.h', sourceLine: 117, sourceColumn: 49, sourceEndLine: 118, sourceParameters: '', sourceBody: ''};
MERGE (n:KG {id: 'handler:system1_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'system1_state', sourceFile: 'src/mame/sega/system1_v.cpp', sourceLine: 229, sourceColumn: 1, sourceEndLine: 232, sourceParameters: '', sourceBody: 'video_start_common(2);'};
MERGE (n:KG {id: 'handler:system1_state.video_start_common'}) SET n:Handler SET n += {method: 'video_start_common', ownerClass: 'system1_state', sourceFile: 'src/mame/sega/system1_v.cpp', sourceLine: 195, sourceColumn: 1, sourceEndLine: 226, sourceParameters: 'int pagecount', sourceBody: 'int pagenum;

	// allocate memory for the collision arrays
	m_mix_collide = make_unique_clear<u8[]>(64);
	m_sprite_collide = make_unique_clear<u8[]>(1024);

	// allocate memory for videoram
	m_tilemap_pages = pagecount;
	m_videoram = make_unique_clear<u8[]>(0x800 * pagecount);

	// create the tilemap pages
	for (pagenum = 0; pagenum < pagecount; pagenum++)
	{
		m_tilemap_page[pagenum] = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(system1_state::tile_get_info)), TILEMAP_SCAN_ROWS, 8,8, 32,32);
		m_tilemap_page[pagenum]->set_transparent_pen(0);
		m_tilemap_page[pagenum]->set_user_data(m_videoram.get() + 0x800 * pagenum);
	}

	// allocate a temporary bitmap for sprite rendering
	m_screen->register_screen_bitmap(m_sprite_bitmap);

	// register for save states
	save_item(NAME(m_video_mode));
	save_item(NAME(m_mix_collide_summary));
	save_item(NAME(m_sprite_collide_summary));
	save_item(NAME(m_videoram_bank));
	save_pointer(NAME(m_videoram), 0x800 * pagecount);
	save_pointer(NAME(m_mix_collide), 64);
	save_pointer(NAME(m_sprite_collide), 1024);'};
MERGE (n:KG {id: 'handler:system1_state.tile_get_info'}) SET n:Handler SET n += {method: 'tile_get_info', ownerClass: 'system1_state', sourceFile: 'src/mame/sega/system1_v.cpp', sourceLine: 178, sourceColumn: 1, sourceEndLine: 186, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'const u8 *rambase = (const u8 *)tilemap.user_data();
	u32 tiledata = rambase[tile_index*2+0] | (rambase[tile_index*2+1] << 8);
	u32 code = ((tiledata >> 4) & 0x800) | (tiledata & 0x7ff);
	u32 color = (tiledata >> 5) & 0xff;

	tileinfo.set(0, code, color, 0);'};
MERGE (n:KG {id: 'bank:system1_state.sys1ppi/bank1'}) SET n:MemoryBank SET n += {tag: 'bank1', member: 'm_bank1', startEntry: 0, entries: 1, region: 'maincpu', offset: 32768, stride: 0, initialEntry: 0, raw: 'm_bank1->configure_entry(0, m_maincpu_region->base() + 0x8000)', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 320, sourceColumn: 1, sourceEndLine: 343};
MERGE (n:KG {id: 'device:system1_state.sys1ppi/maincpu'}) SET n:Device SET n += {type: 'SEGA_315_5177', tag: 'maincpu', clock: 4000000, config: ['Z80(config, m_maincpu, MASTER_CLOCK/5)', 'm_maincpu->set_addrmap(AS_PROGRAM, &system1_state::system1_map)', 'm_maincpu->set_addrmap(AS_IO, &system1_state::system1_ppi_io_map)', 'm_maincpu->refresh_cb().set(FUNC(system1_state::adjust_cycles))', 'segacrp2_z80_device &z80(SEGA_315_5177(config.replace(), m_maincpu, MASTER_CLOCK/5))', 'z80.set_decrypted_tag(m_decrypted_opcodes)', 'm_maincpu->refresh_cb().set(FUNC(system1_state::adjust_cycles))'], sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2200, sourceColumn: 2, sourceEndLine: 2200};
MERGE (n:KG {id: 'handler:system1_state.adjust_cycles'}) SET n:Handler SET n += {method: 'adjust_cycles', ownerClass: 'system1_state', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 363, sourceColumn: 1, sourceEndLine: 368, sourceParameters: 'u8 data', sourceBody: 'm_adjust_cycles = (m_adjust_cycles + 2) % 5;
	if (m_adjust_cycles <= 1)
		m_maincpu->adjust_icount(-1);'};
MERGE (n:KG {id: 'device:system1_state.sys1ppi/soundcpu'}) SET n:Device SET n += {type: 'Z80', tag: 'soundcpu', clock: 4000000, config: ['Z80(config, m_soundcpu, SOUND_CLOCK/2)', 'm_soundcpu->set_addrmap(AS_PROGRAM, &system1_state::sound_map)'], sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2205, sourceColumn: 2, sourceEndLine: 2205};
MERGE (n:KG {id: 'device:system1_state.sys1ppi/soundirq'}) SET n:Device SET n += {type: 'TIMER', tag: 'soundirq', clock: null, config: ['TIMER(config, "soundirq").configure_scanline(FUNC(system1_state::soundirq_gen), "screen", 32, 64)'], sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2208, sourceColumn: 2, sourceEndLine: 2208};
MERGE (n:KG {id: 'device:system1_state.sys1ppi/soundirq/callback:soundirq:0'}) SET n:Callback SET n += {signal: 'configure_scanline', operation: 'configure_scanline', raw: 'TIMER(config, "soundirq").configure_scanline(FUNC(system1_state::soundirq_gen), "screen", 32, 64)', ownerTag: 'soundirq', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2208, sourceColumn: 2, sourceEndLine: 2208, scanlineStart: 32, scanlineIncrement: 64, targetClass: 'system1_state', targetMethod: 'soundirq_gen'};
MERGE (n:KG {id: 'handler:system1_state.soundirq_gen'}) SET n:Handler SET n += {method: 'soundirq_gen', ownerClass: 'system1_state', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 554, sourceColumn: 1, sourceEndLine: 558, sourceParameters: 'int param', sourceBody: '// sound IRQ is generated on 32V, 96V, ... and auto-acknowledged
	m_soundcpu->set_input_line(0, HOLD_LINE);'};
MERGE (n:KG {id: 'handler:system1_state.soundport_w'}) SET n:Handler SET n += {method: 'soundport_w', ownerClass: 'system1_state', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 546, sourceColumn: 1, sourceEndLine: 551, sourceParameters: 'u8 data', sourceBody: '// boost interleave when communicating with the sound CPU
	m_soundlatch->write(data);
	machine().scheduler().perfect_quantum(attotime::from_usec(100));'};
MERGE (n:KG {id: 'handler:system1_state.videomode_w'}) SET n:Handler SET n += {method: 'videomode_w', ownerClass: 'system1_state', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 393, sourceColumn: 1, sourceEndLine: 409, sourceConstants: ['MCS51_INT1_LINE=1'], sourceParameters: 'u8 data', sourceBody: '// bits 0/1 are for the coin counters
	machine().bookkeeping().coin_counter_w(0, BIT(data, 0));
	machine().bookkeeping().coin_counter_w(1, BIT(data, 1));

	// bit 6 is connected to the 8751 IRQ
	if (m_mcu != nullptr)
		m_mcu->set_input_line(MCS51_INT1_LINE, BIT(data, 6) ? CLEAR_LINE : ASSERT_LINE);

	// handle any custom banking or other stuff
	if (m_videomode_custom != nullptr)
		(this->*m_videomode_custom)(data);

	// remaining signals are video-related
	common_videomode_w(data);'};
MERGE (n:KG {id: 'handler:system1_state.common_videomode_w'}) SET n:Handler SET n += {method: 'common_videomode_w', ownerClass: 'system1_state', sourceFile: 'src/mame/sega/system1_v.cpp', sourceLine: 247, sourceColumn: 1, sourceEndLine: 254, sourceParameters: 'u8 data', sourceBody: '// bit 4 is screen blank
	m_video_mode = data;

	// bit 7 is flip screen
	flip_screen_set(data & 0x80);'};
MERGE (n:KG {id: 'device:system1_state.sys1ppi/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_video_attributes(VIDEO_ALWAYS_UPDATE)', 'm_screen->set_raw(MASTER_CLOCK/2, 640, 0, 512, 260, 0, 224)', 'm_screen->set_screen_update(FUNC(system1_state::screen_update_system1))', 'm_screen->set_palette(m_palette)', 'm_screen->screen_vblank().set_inputline(m_maincpu, 0, HOLD_LINE)'], sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2221, sourceColumn: 2, sourceEndLine: 2221, configCalls: ['set_raw(10000000,640,0,512,260,0,224)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [10000000, 640, 0, 512, 260, 0, 224], screenRawExpr: ['MASTER_CLOCK/2', '640', '0', '512', '260', '0', '224'], screenVideoAttributes: ['VIDEO_ALWAYS_UPDATE']};
MERGE (n:KG {id: 'device:system1_state.sys1ppi/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(system1_state::screen_update_system1))', ownerTag: 'screen', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2224, sourceColumn: 2, sourceEndLine: 2224, targetClass: 'system1_state', targetMethod: 'screen_update_system1'};
MERGE (n:KG {id: 'handler:system1_state.screen_update_system1'}) SET n:Handler SET n += {method: 'screen_update_system1', ownerClass: 'system1_state', sourceFile: 'src/mame/sega/system1_v.cpp', sourceLine: 566, sourceColumn: 1, sourceEndLine: 595, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'bitmap_ind16 *bgpixmaps[4];
	int bgrowscroll[32];

	// all 4 background pages are the same, fixed to page 0
	bgpixmaps[0] = bgpixmaps[1] = bgpixmaps[2] = bgpixmaps[3] = &m_tilemap_page[0]->pixmap();

	// foreground is fixed to page 1
	bitmap_ind16 &fgpixmap = m_tilemap_page[1]->pixmap();

	// get fixed scroll offsets
	int xscroll = (s16)((m_videoram[0xffc] | (m_videoram[0xffd] << 8)) + 28);
	int yscroll = m_videoram[0xfbd];

	// adjust for flipping
	if (flip_screen())
	{
		xscroll = 640 - (xscroll & 0x1ff);
		yscroll = 764 - (yscroll & 0x1ff);
	}

	// fill in the row scroll table
	for (int y = 0; y < 32; y++)
		bgrowscroll[y] = xscroll;

	// common update
	video_update_common(screen, bitmap, cliprect, fgpixmap, bgpixmaps, bgrowscroll, yscroll, 0);
	return 0;'};
MERGE (n:KG {id: 'handler:system1_state.video_update_common'}) SET n:Handler SET n += {method: 'video_update_common', ownerClass: 'system1_state', sourceFile: 'src/mame/sega/system1_v.cpp', sourceLine: 504, sourceColumn: 1, sourceEndLine: 557, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect, bitmap_ind16 &fgpixmap, bitmap_ind16 **bgpixmaps, const int *bgrowscroll, int bgyscroll, int spritexoffs', sourceBody: 'if (m_video_mode & 0x10)
	{
		bitmap.fill(0, cliprect);
		return;
	}
	// first clear the sprite bitmap and draw sprites within this area
	m_sprite_bitmap.fill(0, cliprect);
	draw_sprites(m_sprite_bitmap, cliprect, spritexoffs);

	// iterate over rows
	for (int y = cliprect.min_y; y <= cliprect.max_y; y++)
	{
		const u16 *const fgbase = &fgpixmap.pix(y & 0xff);
		const u16 *const sprbase = &m_sprite_bitmap.pix(y & 0xff);
		u16 *const dstbase = &bitmap.pix(y);
		const int bgy = (y + bgyscroll) & 0x1ff;
		const int bgxscroll = bgrowscroll[y >> 3 & 0x1f];

		// get the base of the left and right pixmaps for the effective background Y
		const u16 *const bgbase[2] = { &bgpixmaps[(bgy >> 8) * 2 + 0]->pix(bgy & 0xff), &bgpixmaps[(bgy >> 8) * 2 + 1]->pix(bgy & 0xff) };

		// iterate over pixels
		for (int x = cliprect.min_x; x <= cliprect.max_x; x++)
		{
			const int bgx = ((x - bgxscroll) / 2) & 0x1ff;
			const u16 fgpix = fgbase[(x / 2) & 0xff];
			const u16 bgpix = bgbase[bgx >> 8][bgx & 0xff];
			const u16 sprpix = sprbase[x];

			// using the sprite, background, and foreground pixels, look up the color behavior
			const u8 lookup_index = (((sprpix & 0xf) == 0) << 0) |
					(((fgpix & 7) == 0) << 1) |
					(((fgpix >> 9) & 3) << 2) |
					(((bgpix & 7) == 0) << 4) |
					(((bgpix >> 9) & 3) << 5);
			u8 lookup_value = m_lookup_prom[lookup_index];

			// compute collisions based on two of the PROM bits
			if (!(lookup_value & 4))
				m_mix_collide[((lookup_value & 8) << 2) | ((sprpix >> 4) & 0x1f)] = m_mix_collide_summary = 1;

			// the lower 2 PROM bits select the palette and which pixels
			lookup_value &= 3;
			if (lookup_value == 0)
				dstbase[x] = 0x000 | (sprpix & 0x1ff);
			else if (lookup_value == 1)
				dstbase[x] = 0x200 | (fgpix & 0x1ff);
			else
				dstbase[x] = 0x400 | (bgpix & 0x1ff);
		}
	}'};
MERGE (n:KG {id: 'handler:system1_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'system1_state', sourceFile: 'src/mame/sega/system1_v.cpp', sourceLine: 384, sourceColumn: 1, sourceEndLine: 495, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect, int xoffset', sourceBody: 'const u32 gfxbanks = m_spriterom.bytes() / 0x8000;
	const int flipscreen = flip_screen();

	// up to 32 sprites total
	for (int spritenum = 0; spritenum < 32; spritenum++)
	{
		const u8 *spritedata = &m_spriteram[spritenum * 0x10];
		u16 srcaddr = spritedata[6] + (spritedata[7] << 8);
		const u16 stride = spritedata[4] + (spritedata[5] << 8);
		u8 bank = ((spritedata[3] & 0x80) >> 7) | ((spritedata[3] & 0x40) >> 5) | ((spritedata[3] & 0x20) >> 3);
		const int xstart = ((spritedata[2] | (spritedata[3] << 8)) & 0x1ff) + xoffset;
		int bottom = spritedata[1] + 1;
		int top = spritedata[0] + 1;
		const u16 palettebase = spritenum * 0x10;

		/* writing an 0xff into the first byte of sprite RAM seems to disable all sprites;
		   not sure if this applies to each sprite or only to the first one; see pitfall2
		   and wmatch for examples where this is done */
		if (spritedata[0] == 0xff)
			return;

		// clamp the bank to the size of the sprite ROMs
		bank %= gfxbanks;
		const u8 *gfxbankbase = &m_spriterom[bank * 0x8000];

		// flip sprites vertically
		if (flipscreen)
		{
			int temp = top;
			top = 256 - bottom;
			bottom = 256 - temp;
		}

		// iterate over all rows of the sprite
		for (int y = top; y < bottom; y++)
		{
			u16 *const destbase = &bitmap.pix(y);

			// advance by the row counter
			srcaddr += stride;

			// skip if outside of our clipping area
			if (y < cliprect.min_y || y > cliprect.max_y)
				continue;

			// iterate over X
			int addrdelta = (srcaddr & 0x8000) ? -1 : 1;
			for (int x = xstart, curaddr = srcaddr; ; x += 4, curaddr += addrdelta)
			{
				u8 color1, color2;

				const u8 data = gfxbankbase[curaddr & 0x7fff];

				// non-flipped case
				if (!(curaddr & 0x8000))
				{
					color1 = data >> 4;
					color2 = data & 0x0f;
				}
				else
				{
					color1 = data & 0x0f;
					color2 = data >> 4;
				}

				// stop when we see color 0x0f
				if (color1 == 0x0f)
					break;

				// draw if non-transparent
				if (color1 != 0)
				{
					for (int i = 0; i < 2; i++)
					{
						const int effx = flipscreen ? 0x1fe - (x + i) : (x + i);
						if (effx >= cliprect.min_x && effx <= cliprect.max_x)
						{
							const int prevpix = destbase[effx];

							if ((prevpix & 0x0f) != 0)
								m_sprite_collide[((prevpix >> 4) & 0x1f) + 32 * spritenum] = m_sprite_collide_summary = 1;
							destbase[effx] = color1 | palettebase;
						}
					}
				}

				// stop when we see color 0x0f
				if (color2 == 0x0f)
					break;

				// draw if non-transparent
				if (color2 != 0)
				{
					for (int i = 0; i < 2; i++)
					{
						const int effx = flipscreen ? 0x1fe - (x + 2 + i) : (x + 2 + i);
						if (effx >= cliprect.min_x && effx <= cliprect.max_x)
						{
							const int prevpix = destbase[effx];

							if ((prevpix & 0x0f) != 0)
								m_sprite_collide[((prevpix >> 4) & 0x1f) + 32 * spritenum] = m_sprite_collide_summary = 1;
							destbase[effx] = color2 | palettebase;
						}
					}
				}
			}
		}
	}'};
MERGE (n:KG {id: 'device:system1_state.sys1ppi/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set_inputline', raw: 'm_screen->screen_vblank().set_inputline(m_maincpu, 0, HOLD_LINE)', ownerTag: 'screen', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2226, sourceColumn: 2, sourceEndLine: 2226, inputLine: '0', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:system1_state.sys1ppi/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_system1)'], sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2228, sourceColumn: 2, sourceEndLine: 2228, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:system1_state.sys1ppi/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(system1_state::system1_palette)).set_entries(2048, 256)'], sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2229, sourceColumn: 2, sourceEndLine: 2229, clockExpr: 'FUNC(system1_state::system1_palette)'};
MERGE (n:KG {id: 'device:system1_state.sys1ppi/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2232, sourceColumn: 2, sourceEndLine: 2232};
MERGE (n:KG {id: 'device:system1_state.sys1ppi/soundlatch'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch', clock: null, config: ['GENERIC_LATCH_8(config, m_soundlatch)'], sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2234, sourceColumn: 2, sourceEndLine: 2234};
MERGE (n:KG {id: 'device:system1_state.sys1ppi/sn1'}) SET n:Device SET n += {type: 'SN76489A', tag: 'sn1', clock: 2000000, config: ['SN76489A(config, m_sn[0], SOUND_CLOCK/4).add_route(ALL_OUTPUTS, "mono", 0.40)', 'm_sn[0]->ready_cb().set("sn_ready", FUNC(input_merger_device::in_w<0>))'], sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2238, sourceColumn: 2, sourceEndLine: 2238};
MERGE (n:KG {id: 'audioroute:device:system1_state.sys1ppi/sn1/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.4, raw: 'SN76489A(config, m_sn[0], SOUND_CLOCK/4).add_route(ALL_OUTPUTS, "mono", 0.40)', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2238, sourceColumn: 2, sourceEndLine: 2238};
MERGE (n:KG {id: 'device:system1_state.sys1ppi/sn1/callback:sn1:0'}) SET n:Callback SET n += {signal: 'ready_cb', operation: 'set', raw: 'm_sn[0]->ready_cb().set("sn_ready", FUNC(input_merger_device::in_w<0>))', ownerTag: 'sn1', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2246, sourceColumn: 2, sourceEndLine: 2246, targetTag: 'sn_ready', targetClass: 'input_merger_device', targetMethod: 'in_w_0'};
MERGE (n:KG {id: 'handler:input_merger_device.in_w_0'}) SET n:Handler SET n += {method: 'in_w_0', ownerClass: 'input_merger_device', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2246, sourceColumn: 2, sourceEndLine: 2246};
MERGE (n:KG {id: 'device:system1_state.sys1ppi/sn2'}) SET n:Device SET n += {type: 'SN76489A', tag: 'sn2', clock: 4000000, config: ['SN76489A(config, m_sn[1], SOUND_CLOCK/2).add_route(ALL_OUTPUTS, "mono", 0.60)', 'm_sn[1]->ready_cb().set("sn_ready", FUNC(input_merger_device::in_w<1>))'], sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2241, sourceColumn: 2, sourceEndLine: 2241};
MERGE (n:KG {id: 'audioroute:device:system1_state.sys1ppi/sn2/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.6, raw: 'SN76489A(config, m_sn[1], SOUND_CLOCK/2).add_route(ALL_OUTPUTS, "mono", 0.60)', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2241, sourceColumn: 2, sourceEndLine: 2241};
MERGE (n:KG {id: 'device:system1_state.sys1ppi/sn2/callback:sn2:0'}) SET n:Callback SET n += {signal: 'ready_cb', operation: 'set', raw: 'm_sn[1]->ready_cb().set("sn_ready", FUNC(input_merger_device::in_w<1>))', ownerTag: 'sn2', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2247, sourceColumn: 2, sourceEndLine: 2247, targetTag: 'sn_ready', targetClass: 'input_merger_device', targetMethod: 'in_w_1'};
MERGE (n:KG {id: 'handler:input_merger_device.in_w_1'}) SET n:Handler SET n += {method: 'in_w_1', ownerClass: 'input_merger_device', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2247, sourceColumn: 2, sourceEndLine: 2247};
MERGE (n:KG {id: 'device:system1_state.sys1ppi/sn_ready'}) SET n:Device SET n += {type: 'INPUT_MERGER_ANY_LOW', tag: 'sn_ready', clock: null, config: ['input_merger_device &sn_ready(INPUT_MERGER_ANY_LOW(config, "sn_ready"))', 'sn_ready.output_handler().set_inputline(m_soundcpu, Z80_INPUT_LINE_WAIT)'], sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2243, sourceColumn: 2, sourceEndLine: 2243};
MERGE (n:KG {id: 'device:system1_state.sys1ppi/sn_ready/callback:sn_ready:0'}) SET n:Callback SET n += {signal: 'output_handler', operation: 'set_inputline', raw: 'sn_ready.output_handler().set_inputline(m_soundcpu, Z80_INPUT_LINE_WAIT)', ownerTag: 'sn_ready', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2244, sourceColumn: 2, sourceEndLine: 2244, inputLine: 'Z80_INPUT_LINE_WAIT', targetTag: 'soundcpu'};
MERGE (n:KG {id: 'machine:system1_state.sys1pio'}) SET n:MachineConfig SET n += {cls: 'system1_state', name: 'sys1pio', calls: ['sys1ppi'], stateMembers: ['{"name":"m_mix_collide_summary","bits":8}', '{"name":"m_sprite_collide_summary","bits":8}', '{"name":"m_video_mode","bits":8}', '{"name":"m_videoram_bank","bits":8}', '{"name":"m_tilemap_pages","bits":8}', '{"name":"m_adjust_cycles","bits":8}', '{"name":"m_mcu_control","bits":8}', '{"name":"m_nob_maincpu_latch","bits":8}', '{"name":"m_nob_mcu_latch","bits":8}', '{"name":"m_nob_mcu_status","bits":8}', '{"name":"m_nobb_inport23_step","bits":8}'], resetHandlers: ['system1_state.machine_reset'], startHandlers: ['system1_state.video_start'], removedDevices: ['ppi8255'], sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2258, sourceColumn: 1, sourceEndLine: 2270};
MERGE (n:KG {id: 'bank:system1_state.sys1pio/bank1'}) SET n:MemoryBank SET n += {tag: 'bank1', member: 'm_bank1', startEntry: 0, entries: 1, region: 'maincpu', offset: 32768, stride: 0, initialEntry: 0, raw: 'm_bank1->configure_entry(0, m_maincpu_region->base() + 0x8000)', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 320, sourceColumn: 1, sourceEndLine: 343};
MERGE (n:KG {id: 'device:system1_state.sys1pio/pio'}) SET n:Device SET n += {type: 'Z80PIO', tag: 'pio', clock: 20000000, config: ['Z80PIO(config, m_pio, MASTER_CLOCK)', 'm_pio->out_pa_callback().set(FUNC(system1_state::soundport_w))', 'm_pio->out_ardy_callback().set_inputline(m_soundcpu, INPUT_LINE_NMI)', 'm_pio->out_pb_callback().set(FUNC(system1_state::videomode_w))'], sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2266, sourceColumn: 2, sourceEndLine: 2266};
MERGE (n:KG {id: 'device:system1_state.sys1pio/pio/callback:pio:0'}) SET n:Callback SET n += {signal: 'out_pa_callback', operation: 'set', raw: 'm_pio->out_pa_callback().set(FUNC(system1_state::soundport_w))', ownerTag: 'pio', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2267, sourceColumn: 2, sourceEndLine: 2267, targetClass: 'system1_state', targetMethod: 'soundport_w'};
MERGE (n:KG {id: 'device:system1_state.sys1pio/pio/callback:pio:1'}) SET n:Callback SET n += {signal: 'out_ardy_callback', operation: 'set_inputline', raw: 'm_pio->out_ardy_callback().set_inputline(m_soundcpu, INPUT_LINE_NMI)', ownerTag: 'pio', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2268, sourceColumn: 2, sourceEndLine: 2268, inputLine: 'INPUT_LINE_NMI', targetTag: 'soundcpu'};
MERGE (n:KG {id: 'device:system1_state.sys1pio/pio/callback:pio:2'}) SET n:Callback SET n += {signal: 'out_pb_callback', operation: 'set', raw: 'm_pio->out_pb_callback().set(FUNC(system1_state::videomode_w))', ownerTag: 'pio', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2269, sourceColumn: 2, sourceEndLine: 2269, targetClass: 'system1_state', targetMethod: 'videomode_w'};
MERGE (n:KG {id: 'machine:system1_state.encrypted_sys1pio_maps'}) SET n:MachineConfig SET n += {cls: 'system1_state', name: 'encrypted_sys1pio_maps', calls: [], stateMembers: ['{"name":"m_mix_collide_summary","bits":8}', '{"name":"m_sprite_collide_summary","bits":8}', '{"name":"m_video_mode","bits":8}', '{"name":"m_videoram_bank","bits":8}', '{"name":"m_tilemap_pages","bits":8}', '{"name":"m_adjust_cycles","bits":8}', '{"name":"m_mcu_control","bits":8}', '{"name":"m_nob_maincpu_latch","bits":8}', '{"name":"m_nob_mcu_latch","bits":8}', '{"name":"m_nob_mcu_status","bits":8}', '{"name":"m_nobb_inport23_step","bits":8}'], resetHandlers: ['system1_state.machine_reset'], startHandlers: ['system1_state.video_start'], devicePatches: ['{"tag":"maincpu","config":["m_maincpu->refresh_cb().set(FUNC(system1_state::adjust_cycles))"]}'], sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2332, sourceColumn: 1, sourceEndLine: 2338};
MERGE (n:KG {id: 'bank:system1_state.encrypted_sys1pio_maps/bank1'}) SET n:MemoryBank SET n += {tag: 'bank1', member: 'm_bank1', startEntry: 0, entries: 1, region: 'maincpu', offset: 32768, stride: 0, initialEntry: 0, raw: 'm_bank1->configure_entry(0, m_maincpu_region->base() + 0x8000)', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 320, sourceColumn: 1, sourceEndLine: 343};
MERGE (n:KG {id: 'machine:system1_state.encrypted_sys1pio_maps/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'refresh_cb', operation: 'set', raw: 'm_maincpu->refresh_cb().set(FUNC(system1_state::adjust_cycles))', ownerTag: 'maincpu', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2337, sourceColumn: 2, sourceEndLine: 2337, targetClass: 'system1_state', targetMethod: 'adjust_cycles'};
MERGE (n:KG {id: 'machine:system1_state.wboy'}) SET n:MachineConfig SET n += {cls: 'system1_state', name: 'wboy', calls: ['sys1pio', 'encrypted_sys1pio_maps'], stateMembers: ['{"name":"m_mix_collide_summary","bits":8}', '{"name":"m_sprite_collide_summary","bits":8}', '{"name":"m_video_mode","bits":8}', '{"name":"m_videoram_bank","bits":8}', '{"name":"m_tilemap_pages","bits":8}', '{"name":"m_adjust_cycles","bits":8}', '{"name":"m_mcu_control","bits":8}', '{"name":"m_nob_maincpu_latch","bits":8}', '{"name":"m_nob_mcu_latch","bits":8}', '{"name":"m_nob_mcu_status","bits":8}', '{"name":"m_nobb_inport23_step","bits":8}'], resetHandlers: ['system1_state.machine_reset'], startHandlers: ['system1_state.video_start'], devicePatches: ['{"tag":"maincpu","config":["segacrp2_z80_device &z80(SEGA_315_5177(config.replace(), m_maincpu, MASTER_CLOCK/5))","z80.set_decrypted_tag(m_decrypted_opcodes)"],"replacementType":"SEGA_315_5177","clock":4000000}'], sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2567, sourceColumn: 1, sourceEndLine: 2573};
MERGE (n:KG {id: 'bank:system1_state.wboy/bank1'}) SET n:MemoryBank SET n += {tag: 'bank1', member: 'm_bank1', startEntry: 0, entries: 1, region: 'maincpu', offset: 32768, stride: 0, initialEntry: 0, raw: 'm_bank1->configure_entry(0, m_maincpu_region->base() + 0x8000)', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 320, sourceColumn: 1, sourceEndLine: 343};
MERGE (n:KG {id: 'inputs:system1_generic'}) SET n:InputPorts SET n += {name: 'system1_generic', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 871, sourceColumn: 8, sourceEndLine: 871};
MERGE (n:KG {id: 'inputs:system1_generic/P1'}) SET n:Port SET n += {tag: 'P1', modify: false};
MERGE (n:KG {id: 'inputs:system1_generic/P1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 1};
MERGE (n:KG {id: 'inputs:system1_generic/P1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:system1_generic/P1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 4};
MERGE (n:KG {id: 'inputs:system1_generic/P1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 8};
MERGE (n:KG {id: 'inputs:system1_generic/P1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:system1_generic/P1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:system1_generic/P1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:system1_generic/P1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:system1_generic/P2'}) SET n:Port SET n += {tag: 'P2', modify: false};
MERGE (n:KG {id: 'inputs:system1_generic/P2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 1};
MERGE (n:KG {id: 'inputs:system1_generic/P2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_COCKTAIL'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:system1_generic/P2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:system1_generic/P2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 8};
MERGE (n:KG {id: 'inputs:system1_generic/P2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:system1_generic/P2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:system1_generic/P2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:system1_generic/P2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:system1_generic/SYSTEM'}) SET n:Port SET n += {tag: 'SYSTEM', modify: false};
MERGE (n:KG {id: 'inputs:system1_generic/SYSTEM/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_COIN1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:system1_generic/SYSTEM/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_COIN2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:system1_generic/SYSTEM/f2'}) SET n:PortField SET n += {kind: 'service', mask: 4, activeLow: true, defaultValue: 4};
MERGE (n:KG {id: 'inputs:system1_generic/SYSTEM/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_SERVICE1', defaultValue: 8};
MERGE (n:KG {id: 'inputs:system1_generic/SYSTEM/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_START1', defaultValue: 16};
MERGE (n:KG {id: 'inputs:system1_generic/SYSTEM/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_START2', defaultValue: 32};
MERGE (n:KG {id: 'inputs:system1_generic/SYSTEM/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 64};
MERGE (n:KG {id: 'inputs:system1_generic/SYSTEM/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:system1_generic/SWA'}) SET n:Port SET n += {tag: 'SWA', modify: false};
MERGE (n:KG {id: 'inputs:system1_generic/SWA/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 15, modifiers: ['PORT_DIPLOCATION("SWA:1,2,3,4")'], name: 'Coin A', defaultValue: 15, location: 'SWA:1,2,3,4', settings: ['7=4C 1C', '8=3C 1C', '9=2C 1C', '5=2 Coins/1 Credit 5/3 6/4', '4=2 Coins/1 Credit 4/3', '15=1C 1C', '1=1 Coin/1 Credit 2/3', '2=1 Coin/1 Credit 4/5', '3=1 Coin/1 Credit 5/6', '6=2C 3C', '14=1C 2C', '13=1C 3C', '12=1C 4C', '11=1C 5C', '10=1C 6C']};
MERGE (n:KG {id: 'inputs:system1_generic/SWA/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 240, modifiers: ['PORT_DIPLOCATION("SWA:5,6,7,8")'], name: 'Coin B', defaultValue: 240, location: 'SWA:5,6,7,8', settings: ['112=4C 1C', '128=3C 1C', '144=2C 1C', '80=2 Coins/1 Credit 5/3 6/4', '64=2 Coins/1 Credit 4/3', '240=1C 1C', '16=1 Coin/1 Credit 2/3', '32=1 Coin/1 Credit 4/5', '48=1 Coin/1 Credit 5/6', '96=2C 3C', '224=1C 2C', '208=1C 3C', '192=1C 4C', '176=1C 5C', '160=1C 6C']};
MERGE (n:KG {id: 'inputs:system1_generic/SWB'}) SET n:Port SET n += {tag: 'SWB', modify: false};
MERGE (n:KG {id: 'inputs:system1_generic/SWB/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, modifiers: ['PORT_DIPLOCATION("SWB:1")'], name: 'Cabinet', defaultValue: 0, location: 'SWB:1', settings: ['0=Upright', '1=Cocktail']};
MERGE (n:KG {id: 'inputs:system1_generic/SWB/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, name: 'Unused', defaultValue: 2};
MERGE (n:KG {id: 'inputs:system1_generic/SWB/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 4, name: 'Unused', defaultValue: 4};
MERGE (n:KG {id: 'inputs:system1_generic/SWB/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 8, name: 'Unused', defaultValue: 8};
MERGE (n:KG {id: 'inputs:system1_generic/SWB/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 16, name: 'Unused', defaultValue: 16};
MERGE (n:KG {id: 'inputs:system1_generic/SWB/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 32, name: 'Unused', defaultValue: 32};
MERGE (n:KG {id: 'inputs:system1_generic/SWB/f6'}) SET n:PortField SET n += {kind: 'dip', mask: 64, name: 'Unused', defaultValue: 64};
MERGE (n:KG {id: 'inputs:system1_generic/SWB/f7'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("SWB:8")'], name: 'SW 0 Read From', defaultValue: 128, location: 'SWB:8', settings: ['128=Port $0D', '0=Port $10']};
MERGE (n:KG {id: 'inputs:wboy'}) SET n:InputPorts SET n += {name: 'wboy', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 1552, sourceColumn: 8, sourceEndLine: 1552};
MERGE (n:KG {id: 'inputs:wboy/P1'}) SET n:Port SET n += {tag: 'P1', modify: true};
MERGE (n:KG {id: 'inputs:wboy/P1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 2};
MERGE (n:KG {id: 'inputs:wboy/P1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_BUTTON2', defaultValue: 4};
MERGE (n:KG {id: 'inputs:wboy/P1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 16};
MERGE (n:KG {id: 'inputs:wboy/P1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 32};
MERGE (n:KG {id: 'inputs:wboy/P1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_2WAY'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:wboy/P1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_2WAY'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:wboy/P2'}) SET n:Port SET n += {tag: 'P2', modify: true};
MERGE (n:KG {id: 'inputs:wboy/P2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:wboy/P2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_COCKTAIL'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:wboy/P2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 16};
MERGE (n:KG {id: 'inputs:wboy/P2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 32};
MERGE (n:KG {id: 'inputs:wboy/P2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_2WAY', 'PORT_COCKTAIL'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:wboy/P2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_2WAY', 'PORT_COCKTAIL'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:wboy/SWB'}) SET n:Port SET n += {tag: 'SWB', modify: true};
MERGE (n:KG {id: 'inputs:wboy/SWB/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 2, modifiers: ['PORT_DIPLOCATION("SWB:2")'], name: 'Demo Sounds', defaultValue: 0, location: 'SWB:2', settings: ['2=Off', '0=On']};
MERGE (n:KG {id: 'inputs:wboy/SWB/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 12, modifiers: ['PORT_DIPLOCATION("SWB:3,4")'], name: 'Lives', defaultValue: 12, location: 'SWB:3,4', settings: ['12=3', '8=4', '4=5', '0=Free Play']};
MERGE (n:KG {id: 'inputs:wboy/SWB/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 16, modifiers: ['PORT_DIPLOCATION("SWB:5")'], name: 'Bonus Life', defaultValue: 0, location: 'SWB:5', settings: ['16=30k 100k 170k 240k', '0=30k 120k 210k 300k']};
MERGE (n:KG {id: 'inputs:wboy/SWB/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 32, modifiers: ['PORT_DIPLOCATION("SWB:6")'], name: 'Allow Continue', defaultValue: 32, location: 'SWB:6', settings: ['0=No', '32=Yes']};
MERGE (n:KG {id: 'inputs:wboy/SWB/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 64, modifiers: ['PORT_DIPLOCATION("SWB:7")'], name: 'Difficulty', defaultValue: 64, location: 'SWB:7', settings: ['64=Easy', '0=Hard']};
MERGE (n:KG {id: 'inputs:wboy/SWB/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Unused', defaultValue: 128};
MERGE (n:KG {id: 'gfxlayout:charlayout'}) SET n:GfxLayout SET n += {name: 'charlayout', width: 8, height: 8, total: 'RGN_FRAC(1,3)', planes: 3, planeOffsets: ['RGN_FRAC(0,3)', 'RGN_FRAC(1,3)', 'RGN_FRAC(2,3)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxdecode:gfx_system1'}) SET n:GfxDecode SET n += {name: 'gfx_system1', sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2185, sourceColumn: 8, sourceEndLine: 2185};
MERGE (n:KG {id: 'gfxdecode:gfx_system1/e0'}) SET n:GfxDecodeEntry SET n += {region: 'tiles', offset: 0, layout: 'charlayout', colorBase: 0, colorCount: 256, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'device:system1_state.sys1ppi/palette/callback:palette_init'}) SET n:Callback SET n += {signal: 'palette_init', operation: 'palette_init', raw: 'PALETTE(config, m_palette, FUNC(system1_state::system1_palette)).set_entries(2048, 256)', ownerTag: 'palette', targetClass: 'system1_state', targetMethod: 'system1_palette', entries: 256, sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2229};
MERGE (n:KG {id: 'handler:system1_state.system1_palette'}) SET n:Handler SET n += {method: 'system1_palette', ownerClass: 'system1_state', sourceFile: 'src/mame/sega/system1_v.cpp', sourceLine: 95, sourceColumn: 1, sourceEndLine: 170, sourceParameters: 'palette_device &palette', sourceBody: '/*
	  There are two kind of color handling: in the System 1 games, values in the
	  palette RAM are directly mapped to colors with the usual BBGGGRRR format;
	  in the System 2 ones (Choplifter, WBML, etc.), the value in the palette RAM
	  is a lookup offset for three palette PROMs in RRRRGGGGBBBB format.

	  It\'s hard to tell for sure because they use resistor packs, but here\'s
	  what I think the values are from measurment with a volt meter:

	  Blue: .250K ohms
	  Blue: .495K ohms
	  Green:.250K ohms
	  Green:.495K ohms
	  Green:.995K ohms
	  Red:  .495K ohms
	  Red:  .250K ohms
	  Red:  .995K ohms

	  accurate to +/- .003K ohms.
	*/

	if (m_color_prom != nullptr)
	{
		for (int pal = 0; pal < 256; pal++)
		{
			u8 val;
			val = m_color_prom[pal + 0 * 256];
			u8 r = 0x0e * BIT(val, 0) + 0x1f * BIT(val, 1) + 0x43 * BIT(val, 2) + 0x8f * BIT(val, 3);

			val = m_color_prom[pal + 1 * 256];
			u8 g = 0x0e * BIT(val, 0) + 0x1f * BIT(val, 1) + 0x43 * BIT(val, 2) + 0x8f * BIT(val, 3);

			val = m_color_prom[pal + 2 * 256];
			u8 b = 0x0e * BIT(val, 0) + 0x1f * BIT(val, 1) + 0x43 * BIT(val, 2) + 0x8f * BIT(val, 3);

			palette.set_indirect_color(pal, rgb_t(r, g, b));
		}
	}
	else
	{
		
		

		double weights_r[3], weights_g[3], weights_b[2];
		compute_resistor_weights(0, 255,    -1.0,
				3,  resistances_rg, weights_r,  0,    0,
				3,  resistances_rg, weights_g,  0,    0,
				2,  resistances_b,  weights_b,  0,    0);

		for (int i = 0; i < 256; i++)
		{
			int bit0, bit1, bit2;

			// red component
			bit0 = BIT(i, 0);
			bit1 = BIT(i, 1);
			bit2 = BIT(i, 2);
			int const r = combine_weights(weights_r, bit0, bit1, bit2);

			// green component
			bit0 = BIT(i, 3);
			bit1 = BIT(i, 4);
			bit2 = BIT(i, 5);
			int const g = combine_weights(weights_g, bit0, bit1, bit2);

			// blue component
			bit0 = BIT(i, 6);
			bit1 = BIT(i, 7);
			int const b = combine_weights(weights_b, bit0, bit1);

			palette.set_indirect_color(i, rgb_t(r, g, b));
		}
	}'};
MATCH (a:KG {id: 'game:wboy'}), (b:KG {id: 'file:src/mame/sega/system1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 5806, sourceColumn: 1, sourceEndLine: 5806};
MATCH (a:KG {id: 'game:wboy'}), (b:KG {id: 'machine:system1_state.wboy'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:wboy'}), (b:KG {id: 'inputs:wboy'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:wboy'}), (b:KG {id: 'romset:wboy'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/system1.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/system1.cpp'}), (b:KG {id: 'file:system1.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/system1.cpp'}), (b:KG {id: 'file:machine/input_merger.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/system1.cpp'}), (b:KG {id: 'file:machine/segacrpt_device.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/system1.cpp'}), (b:KG {id: 'file:cpu/z80/mc8123.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/system1.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:system1_state.wboy'}), (b:KG {id: 'file:src/mame/sega/system1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2567, sourceColumn: 1, sourceEndLine: 2573};
MATCH (a:KG {id: 'machine:system1_state.wboy'}), (b:KG {id: 'handler:system1_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:system1_state.wboy'}), (b:KG {id: 'handler:system1_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:system1_state.wboy'}), (b:KG {id: 'machine:system1_state.sys1pio'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:system1_state.wboy'}), (b:KG {id: 'machine:system1_state.encrypted_sys1pio_maps'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:system1_state.wboy'}), (b:KG {id: 'bank:system1_state.wboy/bank1'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'inputs:wboy'}), (b:KG {id: 'file:src/mame/sega/system1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 1552, sourceColumn: 8, sourceEndLine: 1552};
MATCH (a:KG {id: 'inputs:wboy'}), (b:KG {id: 'inputs:system1_generic'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:wboy'}), (b:KG {id: 'inputs:wboy/P1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:wboy'}), (b:KG {id: 'inputs:wboy/P2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:wboy'}), (b:KG {id: 'inputs:wboy/SWB'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:wboy'}), (b:KG {id: 'file:src/mame/sega/system1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 4297, sourceColumn: 1, sourceEndLine: 4297};
MATCH (a:KG {id: 'romset:wboy'}), (b:KG {id: 'region:wboy/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:wboy'}), (b:KG {id: 'region:wboy/soundcpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:wboy'}), (b:KG {id: 'region:wboy/tiles'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:wboy'}), (b:KG {id: 'region:wboy/sprites'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:wboy'}), (b:KG {id: 'region:wboy/lookup_proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:system1_state.video_start'}), (b:KG {id: 'handler:system1_state.video_start_common'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:system1_state.sys1pio'}), (b:KG {id: 'file:src/mame/sega/system1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2258, sourceColumn: 1, sourceEndLine: 2270};
MATCH (a:KG {id: 'machine:system1_state.sys1pio'}), (b:KG {id: 'handler:system1_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:system1_state.sys1pio'}), (b:KG {id: 'handler:system1_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:system1_state.sys1pio'}), (b:KG {id: 'machine:system1_state.sys1ppi'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:system1_state.sys1pio'}), (b:KG {id: 'bank:system1_state.sys1pio/bank1'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:system1_state.sys1pio'}), (b:KG {id: 'map:system1_state.system1_pio_io_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_IO', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:system1_state.sys1pio'}), (b:KG {id: 'device:system1_state.sys1pio/pio'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:system1_state.encrypted_sys1pio_maps'}), (b:KG {id: 'file:src/mame/sega/system1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2332, sourceColumn: 1, sourceEndLine: 2338};
MATCH (a:KG {id: 'machine:system1_state.encrypted_sys1pio_maps'}), (b:KG {id: 'handler:system1_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:system1_state.encrypted_sys1pio_maps'}), (b:KG {id: 'handler:system1_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:system1_state.encrypted_sys1pio_maps'}), (b:KG {id: 'bank:system1_state.encrypted_sys1pio_maps/bank1'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:system1_state.encrypted_sys1pio_maps'}), (b:KG {id: 'map:system1_state.system1_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:system1_state.encrypted_sys1pio_maps'}), (b:KG {id: 'map:system1_state.decrypted_opcodes_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_OPCODES', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:system1_state.encrypted_sys1pio_maps'}), (b:KG {id: 'map:system1_state.system1_pio_io_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_IO', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:system1_state.encrypted_sys1pio_maps'}), (b:KG {id: 'machine:system1_state.encrypted_sys1pio_maps/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'bank:system1_state.wboy/bank1'}), (b:KG {id: 'file:src/mame/sega/system1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 320, sourceColumn: 1, sourceEndLine: 343};
MATCH (a:KG {id: 'inputs:system1_generic'}), (b:KG {id: 'file:src/mame/sega/system1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 871, sourceColumn: 8, sourceEndLine: 871};
MATCH (a:KG {id: 'inputs:system1_generic'}), (b:KG {id: 'inputs:system1_generic/P1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:system1_generic'}), (b:KG {id: 'inputs:system1_generic/P2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:system1_generic'}), (b:KG {id: 'inputs:system1_generic/SYSTEM'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:system1_generic'}), (b:KG {id: 'inputs:system1_generic/SWA'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:system1_generic'}), (b:KG {id: 'inputs:system1_generic/SWB'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:wboy/P1'}), (b:KG {id: 'inputs:wboy/P1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wboy/P1'}), (b:KG {id: 'inputs:wboy/P1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wboy/P1'}), (b:KG {id: 'inputs:wboy/P1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wboy/P1'}), (b:KG {id: 'inputs:wboy/P1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wboy/P1'}), (b:KG {id: 'inputs:wboy/P1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wboy/P1'}), (b:KG {id: 'inputs:wboy/P1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wboy/P2'}), (b:KG {id: 'inputs:wboy/P2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wboy/P2'}), (b:KG {id: 'inputs:wboy/P2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wboy/P2'}), (b:KG {id: 'inputs:wboy/P2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wboy/P2'}), (b:KG {id: 'inputs:wboy/P2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wboy/P2'}), (b:KG {id: 'inputs:wboy/P2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wboy/P2'}), (b:KG {id: 'inputs:wboy/P2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wboy/SWB'}), (b:KG {id: 'inputs:wboy/SWB/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wboy/SWB'}), (b:KG {id: 'inputs:wboy/SWB/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wboy/SWB'}), (b:KG {id: 'inputs:wboy/SWB/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wboy/SWB'}), (b:KG {id: 'inputs:wboy/SWB/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wboy/SWB'}), (b:KG {id: 'inputs:wboy/SWB/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:wboy/SWB'}), (b:KG {id: 'inputs:wboy/SWB/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:wboy/maincpu'}), (b:KG {id: 'rom:wboy/maincpu/epr-7489.116'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wboy/maincpu'}), (b:KG {id: 'rom:wboy/maincpu/epr-7490.109'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wboy/maincpu'}), (b:KG {id: 'rom:wboy/maincpu/epr-7491.96'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wboy/soundcpu'}), (b:KG {id: 'rom:wboy/soundcpu/epr-7498.120'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wboy/tiles'}), (b:KG {id: 'rom:wboy/tiles/epr-7497.62'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wboy/tiles'}), (b:KG {id: 'rom:wboy/tiles/epr-7496.61'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wboy/tiles'}), (b:KG {id: 'rom:wboy/tiles/epr-7495.64'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wboy/tiles'}), (b:KG {id: 'rom:wboy/tiles/epr-7494.63'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wboy/tiles'}), (b:KG {id: 'rom:wboy/tiles/epr-7493.66'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wboy/tiles'}), (b:KG {id: 'rom:wboy/tiles/epr-7492.65'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wboy/sprites'}), (b:KG {id: 'rom:wboy/sprites/epr-7485.117'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wboy/sprites'}), (b:KG {id: 'rom:wboy/sprites/epr-7487.04'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wboy/sprites'}), (b:KG {id: 'rom:wboy/sprites/epr-7486.110'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wboy/sprites'}), (b:KG {id: 'rom:wboy/sprites/epr-7488.05'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:wboy/lookup_proms'}), (b:KG {id: 'rom:wboy/lookup_proms/pr-5317.76'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'handler:system1_state.video_start_common'}), (b:KG {id: 'handler:system1_state.tile_get_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:system1_state.sys1ppi'}), (b:KG {id: 'file:src/mame/sega/system1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2197, sourceColumn: 1, sourceEndLine: 2248};
MATCH (a:KG {id: 'machine:system1_state.sys1ppi'}), (b:KG {id: 'handler:system1_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:system1_state.sys1ppi'}), (b:KG {id: 'handler:system1_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:system1_state.sys1ppi'}), (b:KG {id: 'bank:system1_state.sys1ppi/bank1'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:system1_state.sys1ppi'}), (b:KG {id: 'device:system1_state.sys1ppi/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:system1_state.sys1ppi'}), (b:KG {id: 'device:system1_state.sys1ppi/soundcpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:system1_state.sys1ppi'}), (b:KG {id: 'device:system1_state.sys1ppi/soundirq'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:system1_state.sys1ppi'}), (b:KG {id: 'device:system1_state.sys1ppi/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:system1_state.sys1ppi'}), (b:KG {id: 'device:system1_state.sys1ppi/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:system1_state.sys1ppi'}), (b:KG {id: 'gfxdecode:gfx_system1'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:system1_state.sys1ppi'}), (b:KG {id: 'device:system1_state.sys1ppi/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:system1_state.sys1ppi'}), (b:KG {id: 'device:system1_state.sys1ppi/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:system1_state.sys1ppi'}), (b:KG {id: 'device:system1_state.sys1ppi/soundlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:system1_state.sys1ppi'}), (b:KG {id: 'device:system1_state.sys1ppi/sn1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:system1_state.sys1ppi'}), (b:KG {id: 'device:system1_state.sys1ppi/sn2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:system1_state.sys1ppi'}), (b:KG {id: 'device:system1_state.sys1ppi/sn_ready'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'bank:system1_state.sys1pio/bank1'}), (b:KG {id: 'file:src/mame/sega/system1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 320, sourceColumn: 1, sourceEndLine: 343};
MATCH (a:KG {id: 'map:system1_state.system1_pio_io_map'}), (b:KG {id: 'file:src/mame/sega/system1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 817, sourceColumn: 1, sourceEndLine: 827};
MATCH (a:KG {id: 'map:system1_state.system1_pio_io_map'}), (b:KG {id: 'map:system1_state.system1_pio_io_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_pio_io_map'}), (b:KG {id: 'map:system1_state.system1_pio_io_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_pio_io_map'}), (b:KG {id: 'map:system1_state.system1_pio_io_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_pio_io_map'}), (b:KG {id: 'map:system1_state.system1_pio_io_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_pio_io_map'}), (b:KG {id: 'map:system1_state.system1_pio_io_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_pio_io_map'}), (b:KG {id: 'map:system1_state.system1_pio_io_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_pio_io_map'}), (b:KG {id: 'map:system1_state.system1_pio_io_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:system1_state.sys1pio/pio'}), (b:KG {id: 'device:system1_state.sys1pio/pio/callback:pio:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:system1_state.sys1pio/pio'}), (b:KG {id: 'device:system1_state.sys1pio/pio/callback:pio:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:system1_state.sys1pio/pio'}), (b:KG {id: 'device:system1_state.sys1pio/pio/callback:pio:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'bank:system1_state.encrypted_sys1pio_maps/bank1'}), (b:KG {id: 'file:src/mame/sega/system1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 320, sourceColumn: 1, sourceEndLine: 343};
MATCH (a:KG {id: 'map:system1_state.system1_map'}), (b:KG {id: 'file:src/mame/sega/system1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 746, sourceColumn: 1, sourceEndLine: 758};
MATCH (a:KG {id: 'map:system1_state.system1_map'}), (b:KG {id: 'map:system1_state.system1_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_map'}), (b:KG {id: 'map:system1_state.system1_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_map'}), (b:KG {id: 'map:system1_state.system1_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_map'}), (b:KG {id: 'map:system1_state.system1_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_map'}), (b:KG {id: 'map:system1_state.system1_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_map'}), (b:KG {id: 'map:system1_state.system1_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_map'}), (b:KG {id: 'map:system1_state.system1_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_map'}), (b:KG {id: 'map:system1_state.system1_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_map'}), (b:KG {id: 'map:system1_state.system1_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_map'}), (b:KG {id: 'map:system1_state.system1_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.decrypted_opcodes_map'}), (b:KG {id: 'file:src/mame/sega/system1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 760, sourceColumn: 1, sourceEndLine: 767};
MATCH (a:KG {id: 'map:system1_state.decrypted_opcodes_map'}), (b:KG {id: 'map:system1_state.decrypted_opcodes_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.decrypted_opcodes_map'}), (b:KG {id: 'map:system1_state.decrypted_opcodes_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.decrypted_opcodes_map'}), (b:KG {id: 'map:system1_state.decrypted_opcodes_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.decrypted_opcodes_map'}), (b:KG {id: 'map:system1_state.decrypted_opcodes_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.decrypted_opcodes_map'}), (b:KG {id: 'map:system1_state.decrypted_opcodes_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'machine:system1_state.encrypted_sys1pio_maps/callback:maincpu:0'}), (b:KG {id: 'handler:system1_state.adjust_cycles'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/P1'}), (b:KG {id: 'inputs:system1_generic/P1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/P1'}), (b:KG {id: 'inputs:system1_generic/P1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/P1'}), (b:KG {id: 'inputs:system1_generic/P1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/P1'}), (b:KG {id: 'inputs:system1_generic/P1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/P1'}), (b:KG {id: 'inputs:system1_generic/P1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/P1'}), (b:KG {id: 'inputs:system1_generic/P1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/P1'}), (b:KG {id: 'inputs:system1_generic/P1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/P1'}), (b:KG {id: 'inputs:system1_generic/P1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/P2'}), (b:KG {id: 'inputs:system1_generic/P2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/P2'}), (b:KG {id: 'inputs:system1_generic/P2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/P2'}), (b:KG {id: 'inputs:system1_generic/P2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/P2'}), (b:KG {id: 'inputs:system1_generic/P2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/P2'}), (b:KG {id: 'inputs:system1_generic/P2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/P2'}), (b:KG {id: 'inputs:system1_generic/P2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/P2'}), (b:KG {id: 'inputs:system1_generic/P2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/P2'}), (b:KG {id: 'inputs:system1_generic/P2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/SYSTEM'}), (b:KG {id: 'inputs:system1_generic/SYSTEM/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/SYSTEM'}), (b:KG {id: 'inputs:system1_generic/SYSTEM/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/SYSTEM'}), (b:KG {id: 'inputs:system1_generic/SYSTEM/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/SYSTEM'}), (b:KG {id: 'inputs:system1_generic/SYSTEM/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/SYSTEM'}), (b:KG {id: 'inputs:system1_generic/SYSTEM/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/SYSTEM'}), (b:KG {id: 'inputs:system1_generic/SYSTEM/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/SYSTEM'}), (b:KG {id: 'inputs:system1_generic/SYSTEM/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/SYSTEM'}), (b:KG {id: 'inputs:system1_generic/SYSTEM/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/SWA'}), (b:KG {id: 'inputs:system1_generic/SWA/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/SWA'}), (b:KG {id: 'inputs:system1_generic/SWA/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/SWB'}), (b:KG {id: 'inputs:system1_generic/SWB/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/SWB'}), (b:KG {id: 'inputs:system1_generic/SWB/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/SWB'}), (b:KG {id: 'inputs:system1_generic/SWB/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/SWB'}), (b:KG {id: 'inputs:system1_generic/SWB/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/SWB'}), (b:KG {id: 'inputs:system1_generic/SWB/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/SWB'}), (b:KG {id: 'inputs:system1_generic/SWB/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/SWB'}), (b:KG {id: 'inputs:system1_generic/SWB/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:system1_generic/SWB'}), (b:KG {id: 'inputs:system1_generic/SWB/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'bank:system1_state.sys1ppi/bank1'}), (b:KG {id: 'file:src/mame/sega/system1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 320, sourceColumn: 1, sourceEndLine: 343};
MATCH (a:KG {id: 'device:system1_state.sys1ppi/maincpu'}), (b:KG {id: 'map:system1_state.system1_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:system1_state.sys1ppi/maincpu'}), (b:KG {id: 'map:system1_state.system1_ppi_io_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:system1_state.sys1ppi/soundcpu'}), (b:KG {id: 'map:system1_state.sound_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:system1_state.sys1ppi/soundirq'}), (b:KG {id: 'device:system1_state.sys1ppi/soundirq/callback:soundirq:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:system1_state.sys1ppi/screen'}), (b:KG {id: 'device:system1_state.sys1ppi/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:system1_state.sys1ppi/screen'}), (b:KG {id: 'device:system1_state.sys1ppi/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_system1'}), (b:KG {id: 'file:src/mame/sega/system1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 2185, sourceColumn: 8, sourceEndLine: 2185};
MATCH (a:KG {id: 'gfxdecode:gfx_system1'}), (b:KG {id: 'gfxdecode:gfx_system1/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:system1_state.sys1ppi/palette'}), (b:KG {id: 'device:system1_state.sys1ppi/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:system1_state.sys1ppi/sn1'}), (b:KG {id: 'audioroute:device:system1_state.sys1ppi/sn1/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:system1_state.sys1ppi/sn1'}), (b:KG {id: 'device:system1_state.sys1ppi/sn1/callback:sn1:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:system1_state.sys1ppi/sn2'}), (b:KG {id: 'audioroute:device:system1_state.sys1ppi/sn2/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:system1_state.sys1ppi/sn2'}), (b:KG {id: 'device:system1_state.sys1ppi/sn2/callback:sn2:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:system1_state.sys1ppi/sn_ready'}), (b:KG {id: 'device:system1_state.sys1ppi/sn_ready/callback:sn_ready:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_pio_io_map/range6'}), (b:KG {id: 'handler:z80pio_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'pio'};
MATCH (a:KG {id: 'map:system1_state.system1_pio_io_map/range6'}), (b:KG {id: 'handler:z80pio_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'pio'};
MATCH (a:KG {id: 'device:system1_state.sys1pio/pio/callback:pio:0'}), (b:KG {id: 'handler:system1_state.soundport_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:system1_state.sys1pio/pio/callback:pio:2'}), (b:KG {id: 'handler:system1_state.videomode_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_map/range4'}), (b:KG {id: 'handler:system1_state.paletteram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_map/range5'}), (b:KG {id: 'handler:system1_state.videoram_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_map/range5'}), (b:KG {id: 'handler:system1_state.videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_map/range6'}), (b:KG {id: 'handler:system1_state.mixer_collision_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_map/range6'}), (b:KG {id: 'handler:system1_state.mixer_collision_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_map/range7'}), (b:KG {id: 'handler:system1_state.mixer_collision_reset_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_map/range8'}), (b:KG {id: 'handler:system1_state.sprite_collision_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_map/range8'}), (b:KG {id: 'handler:system1_state.sprite_collision_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_map/range9'}), (b:KG {id: 'handler:system1_state.sprite_collision_reset_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:system1_state.decrypted_opcodes_map/range4'}), (b:KG {id: 'handler:system1_state.paletteram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_ppi_io_map'}), (b:KG {id: 'file:src/mame/sega/system1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 794, sourceColumn: 1, sourceEndLine: 804};
MATCH (a:KG {id: 'map:system1_state.system1_ppi_io_map'}), (b:KG {id: 'map:system1_state.system1_ppi_io_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_ppi_io_map'}), (b:KG {id: 'map:system1_state.system1_ppi_io_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_ppi_io_map'}), (b:KG {id: 'map:system1_state.system1_ppi_io_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_ppi_io_map'}), (b:KG {id: 'map:system1_state.system1_ppi_io_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_ppi_io_map'}), (b:KG {id: 'map:system1_state.system1_ppi_io_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_ppi_io_map'}), (b:KG {id: 'map:system1_state.system1_ppi_io_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_ppi_io_map'}), (b:KG {id: 'map:system1_state.system1_ppi_io_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.sound_map'}), (b:KG {id: 'file:src/mame/sega/system1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/system1.cpp', sourceLine: 843, sourceColumn: 1, sourceEndLine: 850};
MATCH (a:KG {id: 'map:system1_state.sound_map'}), (b:KG {id: 'map:system1_state.sound_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.sound_map'}), (b:KG {id: 'map:system1_state.sound_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.sound_map'}), (b:KG {id: 'map:system1_state.sound_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.sound_map'}), (b:KG {id: 'map:system1_state.sound_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:system1_state.sound_map'}), (b:KG {id: 'map:system1_state.sound_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:system1_state.sys1ppi/soundirq/callback:soundirq:0'}), (b:KG {id: 'handler:system1_state.soundirq_gen'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:system1_state.sys1ppi/screen/callback:screen:0'}), (b:KG {id: 'handler:system1_state.screen_update_system1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:system1_state.sys1ppi/screen/callback:screen:1'}), (b:KG {id: 'device:system1_state.sys1ppi/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_system1/e0'}), (b:KG {id: 'gfxlayout:charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:system1_state.sys1ppi/palette/callback:palette_init'}), (b:KG {id: 'handler:system1_state.system1_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:system1_state.sys1ppi/sn1/callback:sn1:0'}), (b:KG {id: 'handler:input_merger_device.in_w_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:system1_state.sys1ppi/sn2/callback:sn2:0'}), (b:KG {id: 'handler:input_merger_device.in_w_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:system1_state.sys1ppi/sn_ready/callback:sn_ready:0'}), (b:KG {id: 'device:system1_state.sys1ppi/soundcpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'handler:system1_state.videomode_w'}), (b:KG {id: 'handler:system1_state.common_videomode_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:system1_state.videoram_r'}), (b:KG {id: 'handler:system1_state.videoram_wait_states'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:system1_state.videoram_w'}), (b:KG {id: 'handler:system1_state.videoram_wait_states'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:system1_state.system1_ppi_io_map/range6'}), (b:KG {id: 'handler:i8255_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ppi8255'};
MATCH (a:KG {id: 'map:system1_state.system1_ppi_io_map/range6'}), (b:KG {id: 'handler:i8255_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ppi8255'};
MATCH (a:KG {id: 'map:system1_state.sound_map/range2'}), (b:KG {id: 'handler:sn76489a_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'sn1'};
MATCH (a:KG {id: 'map:system1_state.sound_map/range3'}), (b:KG {id: 'handler:sn76489a_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'sn2'};
MATCH (a:KG {id: 'map:system1_state.sound_map/range4'}), (b:KG {id: 'handler:system1_state.sound_data_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'handler:system1_state.screen_update_system1'}), (b:KG {id: 'handler:system1_state.video_update_common'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:charlayout'}), (b:KG {id: 'file:src/mame/sega/system1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'handler:system1_state.video_update_common'}), (b:KG {id: 'handler:system1_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
