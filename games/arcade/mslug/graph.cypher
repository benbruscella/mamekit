// mamekit knowledge graph — driver src/mame/snk/neogeo.cpp
// generated 2026-09-05T03:49:56.558Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/snk/neogeo.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/snk/neogeo.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:neogeo.h'}) SET n:SourceFile SET n += {path: 'neogeo.h', external: true};
MERGE (n:KG {id: 'file:machine/nvram.h'}) SET n:SourceFile SET n += {path: 'machine/nvram.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:softlist_dev.h'}) SET n:SourceFile SET n += {path: 'softlist_dev.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:irrmaze.lh'}) SET n:SourceFile SET n += {path: 'irrmaze.lh', external: true};
MERGE (n:KG {id: 'file:neogeo.lh'}) SET n:SourceFile SET n += {path: 'neogeo.lh', external: true};
MERGE (n:KG {id: 'file:logmacro.h'}) SET n:SourceFile SET n += {path: 'logmacro.h', external: true};
MERGE (n:KG {id: 'game:neogeo'}) SET n:Game SET n += {name: 'neogeo', year: '1990', company: 'SNK', fullname: 'Neo-Geo MV-6F', monitor: 'ROT0', cls: 'mvs_led_el_state', init: 'empty_init', flags: 'MACHINE_IS_BIOS_ROOT | MACHINE_SUPPORTS_SAVE', kind: 'console', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2428, sourceColumn: 1, sourceEndLine: 2428};
MERGE (n:KG {id: 'game:mslug'}) SET n:Game SET n += {name: 'mslug', year: '1996', company: 'Nazca', fullname: 'Metal Slug - Super Vehicle-001', monitor: 'ROT0', cls: 'mvs_led_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 12139, sourceColumn: 1, sourceEndLine: 12139};
MERGE (n:KG {id: 'romset:neogeo'}) SET n:RomSet SET n += {name: 'neogeo', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2375, sourceColumn: 1, sourceEndLine: 2375};
MERGE (n:KG {id: 'region:neogeo/mainbios'}) SET n:RomRegion SET n += {tag: 'mainbios', size: 524288, flags: '0'};
MERGE (n:KG {id: 'rom:neogeo/mainbios/sp-s2.sp1'}) SET n:Rom SET n += {file: 'sp-s2.sp1', offset: 0, size: 131072, crc: '9036d879', sha1: '4f5ed7105b7128794654ce82b51723e16e389543', groupSize: 2, reverse: true};
MERGE (n:KG {id: 'region:neogeo/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 1048576, flags: 'ROMREGION_ERASEFF', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2378, sourceColumn: 2, sourceEndLine: 2378};
MERGE (n:KG {id: 'region:neogeo/audiobios'}) SET n:RomRegion SET n += {tag: 'audiobios', size: 131072, flags: '0', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2298, sourceColumn: 2, sourceEndLine: 2298};
MERGE (n:KG {id: 'rom:neogeo/audiobios/sm1.sm1'}) SET n:Rom SET n += {file: 'sm1.sm1', offset: 0, size: 131072, crc: '94416d67', sha1: '42f9d7ddd6c0931fd64226a60dc73602b2819dcf', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2299, sourceColumn: 2, sourceEndLine: 2299};
MERGE (n:KG {id: 'region:neogeo/audiocpu'}) SET n:RomRegion SET n += {tag: 'audiocpu', size: 327680, flags: '0', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2383, sourceColumn: 2, sourceEndLine: 2383};
MERGE (n:KG {id: 'rom:neogeo/audiocpu/sm1.sm1'}) SET n:Rom SET n += {file: 'sm1.sm1', offset: 0, size: 131072, crc: '94416d67', sha1: '42f9d7ddd6c0931fd64226a60dc73602b2819dcf', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2299, sourceColumn: 2, sourceEndLine: 2299};
MERGE (n:KG {id: 'region:neogeo/spritegen:zoomy'}) SET n:RomRegion SET n += {tag: 'spritegen:zoomy', size: 131072, flags: '0', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2369, sourceColumn: 2, sourceEndLine: 2369};
MERGE (n:KG {id: 'rom:neogeo/spritegen:zoomy/000-lo.lo'}) SET n:Rom SET n += {file: '000-lo.lo', offset: 0, size: 131072, crc: '5a86cff2', sha1: '5992277debadeb64d1c1c64b0a92d9293eaf7e4a', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2370, sourceColumn: 2, sourceEndLine: 2370};
MERGE (n:KG {id: 'region:neogeo/fixed'}) SET n:RomRegion SET n += {tag: 'fixed', size: 131072, flags: 'ROMREGION_ERASEFF', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2388, sourceColumn: 2, sourceEndLine: 2388};
MERGE (n:KG {id: 'region:neogeo/fixedbios'}) SET n:RomRegion SET n += {tag: 'fixedbios', size: 131072, flags: '0', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2357, sourceColumn: 2, sourceEndLine: 2357};
MERGE (n:KG {id: 'rom:neogeo/fixedbios/sfix.sfix'}) SET n:Rom SET n += {file: 'sfix.sfix', offset: 0, size: 131072, crc: 'c2ea0cfd', sha1: 'fd4a618cdcdbf849374f0a50dd8efe9dbab706c3', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2358, sourceColumn: 2, sourceEndLine: 2358};
MERGE (n:KG {id: 'region:neogeo/sprites'}) SET n:RomRegion SET n += {tag: 'sprites', size: 1048576, flags: 'ROMREGION_ERASEFF', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2393, sourceColumn: 2, sourceEndLine: 2393};
MERGE (n:KG {id: 'romset:mslug'}) SET n:RomSet SET n += {name: 'mslug', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 6886, sourceColumn: 1, sourceEndLine: 6886};
MERGE (n:KG {id: 'region:mslug/cslot1:maincpu'}) SET n:RomRegion SET n += {tag: 'cslot1:maincpu', size: 2097152, flags: 'ROMREGION_BE|ROMREGION_16BIT', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 3066, sourceColumn: 2, sourceEndLine: 3066};
MERGE (n:KG {id: 'rom:mslug/cslot1:maincpu/201-p1.p1'}) SET n:Rom SET n += {file: '201-p1.p1', offset: 1048576, size: 1048576, crc: '08d8daa5', sha1: 'b888993dbb7e9f0a28a01d7d2e1da00ef9cf6f38', groupSize: 2, reverse: true, continueSegments: [0, 1048576, 1048576]};
MERGE (n:KG {id: 'region:mslug/cslot1:fixed'}) SET n:RomRegion SET n += {tag: 'cslot1:fixed', size: 131072, flags: '0', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2355, sourceColumn: 2, sourceEndLine: 2355};
MERGE (n:KG {id: 'rom:mslug/cslot1:fixed/201-s1.s1'}) SET n:Rom SET n += {file: '201-s1.s1', offset: 0, size: 131072, crc: '2f55958d', sha1: '550b53628daec9f1e1e11a398854092d90f9505a'};
MERGE (n:KG {id: 'region:mslug/fixedbios'}) SET n:RomRegion SET n += {tag: 'fixedbios', size: 131072, flags: '0', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2357, sourceColumn: 2, sourceEndLine: 2357};
MERGE (n:KG {id: 'rom:mslug/fixedbios/sfix.sfix'}) SET n:Rom SET n += {file: 'sfix.sfix', offset: 0, size: 131072, crc: 'c2ea0cfd', sha1: 'fd4a618cdcdbf849374f0a50dd8efe9dbab706c3', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2358, sourceColumn: 2, sourceEndLine: 2358};
MERGE (n:KG {id: 'region:mslug/spritegen:zoomy'}) SET n:RomRegion SET n += {tag: 'spritegen:zoomy', size: 131072, flags: '0', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2369, sourceColumn: 2, sourceEndLine: 2369};
MERGE (n:KG {id: 'rom:mslug/spritegen:zoomy/000-lo.lo'}) SET n:Rom SET n += {file: '000-lo.lo', offset: 0, size: 131072, crc: '5a86cff2', sha1: '5992277debadeb64d1c1c64b0a92d9293eaf7e4a', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2370, sourceColumn: 2, sourceEndLine: 2370};
MERGE (n:KG {id: 'region:mslug/mainbios'}) SET n:RomRegion SET n += {tag: 'mainbios', size: 524288, flags: '0'};
MERGE (n:KG {id: 'rom:mslug/mainbios/sp-s2.sp1'}) SET n:Rom SET n += {file: 'sp-s2.sp1', offset: 0, size: 131072, crc: '9036d879', sha1: '4f5ed7105b7128794654ce82b51723e16e389543', groupSize: 2, reverse: true};
MERGE (n:KG {id: 'region:mslug/audiobios'}) SET n:RomRegion SET n += {tag: 'audiobios', size: 131072, flags: '0', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2298, sourceColumn: 2, sourceEndLine: 2298};
MERGE (n:KG {id: 'rom:mslug/audiobios/sm1.sm1'}) SET n:Rom SET n += {file: 'sm1.sm1', offset: 0, size: 131072, crc: '94416d67', sha1: '42f9d7ddd6c0931fd64226a60dc73602b2819dcf', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2299, sourceColumn: 2, sourceEndLine: 2299};
MERGE (n:KG {id: 'region:mslug/cslot1:audiocpu'}) SET n:RomRegion SET n += {tag: 'cslot1:audiocpu', size: 196608, flags: '0', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2300, sourceColumn: 2, sourceEndLine: 2300};
MERGE (n:KG {id: 'rom:mslug/cslot1:audiocpu/201-m1.m1'}) SET n:Rom SET n += {file: '201-m1.m1', offset: 0, size: 131072, crc: 'c28b3253', sha1: 'fd75bd15aed30266a8b3775f276f997af57d1c06', reloadOffsets: [65536]};
MERGE (n:KG {id: 'region:mslug/cslot1:ymsnd:adpcma'}) SET n:RomRegion SET n += {tag: 'cslot1:ymsnd:adpcma', size: 8388608, flags: '0', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 3073, sourceColumn: 2, sourceEndLine: 3073};
MERGE (n:KG {id: 'rom:mslug/cslot1:ymsnd:adpcma/201-v1.v1'}) SET n:Rom SET n += {file: '201-v1.v1', offset: 0, size: 4194304, crc: '23d22ed1', sha1: 'cd076928468ad6bcc5f19f88cb843ecb5e660681', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 6896, sourceColumn: 2, sourceEndLine: 6896};
MERGE (n:KG {id: 'rom:mslug/cslot1:ymsnd:adpcma/201-v2.v2'}) SET n:Rom SET n += {file: '201-v2.v2', offset: 4194304, size: 4194304, crc: '472cf9db', sha1: '5f79ea9286d22ed208128f9c31ca75552ce08b57', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 6897, sourceColumn: 2, sourceEndLine: 6897};
MERGE (n:KG {id: 'region:mslug/cslot1:sprites'}) SET n:RomRegion SET n += {tag: 'cslot1:sprites', size: 16777216, flags: '0', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 3082, sourceColumn: 2, sourceEndLine: 3082};
MERGE (n:KG {id: 'rom:mslug/cslot1:sprites/201-c1.c1'}) SET n:Rom SET n += {file: '201-c1.c1', offset: 0, size: 4194304, crc: '72813676', sha1: '7b045d1a48980cb1a140699011cb1a3d4acdc4d1', skip: 1};
MERGE (n:KG {id: 'rom:mslug/cslot1:sprites/201-c2.c2'}) SET n:Rom SET n += {file: '201-c2.c2', offset: 1, size: 4194304, crc: '96f62574', sha1: 'cb7254b885989223bba597b8ff0972dfa5957816', skip: 1};
MERGE (n:KG {id: 'rom:mslug/cslot1:sprites/201-c3.c3'}) SET n:Rom SET n += {file: '201-c3.c3', offset: 8388608, size: 4194304, crc: '5121456a', sha1: '0a7a27d603d1bb2520b5570ebf5b34a106e255a6', skip: 1};
MERGE (n:KG {id: 'rom:mslug/cslot1:sprites/201-c4.c4'}) SET n:Rom SET n += {file: '201-c4.c4', offset: 8388609, size: 4194304, crc: 'f4ad59a3', sha1: '4e94fda8ee63abf0f92afe08060a488546e5c280', skip: 1};
MERGE (n:KG {id: 'map:neogeo_base_state.base_main_map'}) SET n:AddressMap SET n += {cls: 'neogeo_base_state', name: 'base_main_map', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1709, sourceColumn: 1, sourceEndLine: 1720};
MERGE (n:KG {id: 'map:neogeo_base_state.base_main_map/range0'}) SET n:AddressRange SET n += {start: 3276800, end: 3276800, raw: 'map(0x320000, 0x320000).mirror(0x01fffe).w(FUNC(neogeo_base_state::audio_command_w))', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1711, sourceColumn: 2, sourceEndLine: 1711, mirror: 131070};
MERGE (n:KG {id: 'handler:neogeo_base_state.audio_command_w'}) SET n:Handler SET n += {method: 'audio_command_w', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1002, sourceColumn: 1, sourceEndLine: 1007, sourceParameters: 'uint8_t data', sourceBody: '// glitches in s1945p without the perfect_quantum here
	m_soundlatch->write(data);
	machine().scheduler().perfect_quantum(attotime::from_usec(50));'};
MERGE (n:KG {id: 'handler:ng_memcard_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'ng_memcard_device', sourceFile: 'src/mame/snk/ng_memcard.cpp', sourceLine: 103, sourceColumn: 1, sourceEndLine: 107, sourceParameters: 'offs_t offset, uint16_t data', sourceBody: 'if (!m_lock1 && m_unlock2)
		m_memcard_data[offset & 0x07ff] = uint8_t(data & 0x00ff);'};
MERGE (n:KG {id: 'map:neogeo_base_state.base_main_map/range1'}) SET n:AddressRange SET n += {start: 3538944, end: 3670015, raw: 'map(0x360000, 0x37ffff).r(FUNC(neogeo_base_state::unmapped_r))', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1712, sourceColumn: 2, sourceEndLine: 1712};
MERGE (n:KG {id: 'handler:neogeo_base_state.unmapped_r'}) SET n:Handler SET n += {method: 'unmapped_r', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1016, sourceColumn: 1, sourceEndLine: 1033, sourceParameters: 'address_space &space', sourceBody: 'uint16_t ret;

	/* unmapped memory returns the last word on the data bus, which is almost always the opcode
	   of the next instruction due to prefetch */

	/* prevent recursion */
	if (m_recurse)
		ret = 0xffff;
	else
	{
		m_recurse = true;
		ret = space.read_word(m_maincpu->pc());
		m_recurse = false;
	}
	return ret;'};
MERGE (n:KG {id: 'map:neogeo_base_state.base_main_map/range2'}) SET n:AddressRange SET n += {start: 3670016, end: 3670271, raw: 'map(0x380000, 0x3800ff).mirror(0x01ff00).w(FUNC(neogeo_base_state::io_control_w)).umask16(0x00ff)', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1713, sourceColumn: 2, sourceEndLine: 1713, mirror: 130816, umask: 255};
MERGE (n:KG {id: 'handler:neogeo_base_state.io_control_w'}) SET n:Handler SET n += {method: 'io_control_w', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 929, sourceColumn: 1, sourceEndLine: 946, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'switch (offset & 0x38) // TODO: the mask is supposedly less restrictive on AES?
	{
	case 0x00:
		if (m_ctrl1) m_ctrl1->write_ctrlsel(data & 0x07);
		if (m_ctrl2) m_ctrl2->write_ctrlsel((data >> 3) & 0x07);
		if (m_edge) m_edge->write_ctrlsel(data & 0x3f); // FIXME: only MV-1B and MV-1C have this output
		break;

	case 0x08:
		m_card_bank = data & 0x07;
		break;

	default:
		logerror("%s: Unmapped I/O control write.  Offset: %02x  Data: %02x\\n", machine().describe_context(), offset, data);
	}'};
MERGE (n:KG {id: 'map:neogeo_base_state.base_main_map/range3'}) SET n:AddressRange SET n += {start: 3801088, end: 3801119, raw: 'map(0x3a0000, 0x3a001f).mirror(0x01ffe0).r(FUNC(neogeo_base_state::unmapped_r))', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1714, sourceColumn: 2, sourceEndLine: 1714, mirror: 131040};
MERGE (n:KG {id: 'map:neogeo_base_state.base_main_map/range4'}) SET n:AddressRange SET n += {start: 3801088, end: 3801119, raw: 'map(0x3a0000, 0x3a001f).mirror(0x01ffe0).w(m_systemlatch, FUNC(hc259_device::write_a3)).umask16(0x00ff)', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1715, sourceColumn: 2, sourceEndLine: 1715, mirror: 131040, umask: 255};
MERGE (n:KG {id: 'handler:hc259_device.write_a3'}) SET n:Handler SET n += {method: 'write_a3', ownerClass: 'hc259_device', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1715, sourceColumn: 2, sourceEndLine: 1715};
MERGE (n:KG {id: 'map:neogeo_base_state.base_main_map/range5'}) SET n:AddressRange SET n += {start: 3932160, end: 3932167, raw: 'map(0x3c0000, 0x3c0007).mirror(0x01fff8).r(FUNC(neogeo_base_state::video_register_r))', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1716, sourceColumn: 2, sourceEndLine: 1716, mirror: 131064};
MERGE (n:KG {id: 'handler:neogeo_base_state.video_register_r'}) SET n:Handler SET n += {method: 'video_register_r', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo_v.cpp', sourceLine: 228, sourceColumn: 1, sourceEndLine: 248, sourceParameters: 'address_space &space, offs_t offset, uint16_t mem_mask', sourceBody: 'uint16_t ret;

	// accessing the LSB only is not mapped
	if (mem_mask == 0x00ff)
		ret = unmapped_r(space) & 0x00ff;
	else
	{
		switch (offset)
		{
		default:
		case 0x00:
		case 0x01: ret = m_sprgen->get_videoram_data(); break;
		case 0x02: ret = m_sprgen->get_videoram_modulo(); break;
		case 0x03: ret = get_video_control(); break;
		}
	}

	return ret;'};
MERGE (n:KG {id: 'handler:neosprite_base_device.get_videoram_data'}) SET n:Handler SET n += {method: 'get_videoram_data', ownerClass: 'neosprite_base_device', sourceFile: 'src/mame/snk/neogeo_spr.cpp', sourceLine: 85, sourceColumn: 1, sourceEndLine: 88, sourceParameters: '', sourceBody: 'return m_vram_read_buffer;'};
MERGE (n:KG {id: 'handler:neosprite_base_device.get_videoram_modulo'}) SET n:Handler SET n += {method: 'get_videoram_modulo', ownerClass: 'neosprite_base_device', sourceFile: 'src/mame/snk/neogeo_spr.cpp', sourceLine: 106, sourceColumn: 1, sourceEndLine: 109, sourceParameters: '', sourceBody: 'return m_vram_modulo;'};
MERGE (n:KG {id: 'handler:neogeo_base_state.get_video_control'}) SET n:Handler SET n += {method: 'get_video_control', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo_v.cpp', sourceLine: 176, sourceColumn: 1, sourceEndLine: 214, sourceConstants: ['VERBOSE=0', 'NEOGEO_VTOTAL=264'], sourceParameters: '', sourceBody: '/*
	    The format of this very important location is:  AAAA AAAA A??? BCCC

	    A is the raster line counter. mosyougi relies solely on this to do the
	      raster effects on the title screen; sdodgeb loops waiting for the top
	      bit to be 1; zedblade heavily depends on it to work correctly (it
	      checks the top bit in the IRQ2 handler).
	    B is definitely a PAL/NTSC flag. (LSPC2 only) Evidence:
	      1) trally changes the position of the speed indicator depending on
	         it (0 = lower 1 = higher).
	      2) samsho3 sets a variable to 60 when the bit is 0 and 50 when it\'s 1.
	         This is obviously the video refresh rate in Hz.
	      3) samsho3 sets another variable to 256 or 307. This could be the total
	         screen height (including vblank), or close to that.
	      Some games (e.g. lstbld2, samsho3) do this (or similar):
	      bclr    #$0, $3c000e.l
	      when the bit is set, so 3c000e (whose function is unknown) has to be
	      related
	    C animation counter lower 3 bits
	*/

	// the vertical counter chain goes from 0xf8 - 0x1ff
	uint16_t v_counter = m_screen->vpos() + 0x100;

	if (v_counter >= 0x200)
		v_counter = v_counter - NEOGEO_VTOTAL;

	uint16_t const ret = (v_counter << 7) | (m_sprgen->get_auto_animation_counter() & 0x0007);

	if (!machine().side_effects_disabled())
	{
		if (VERBOSE)
			logerror("%s: video_control read (%04x)\\n", machine().describe_context(), ret);
	}

	return ret;'};
MERGE (n:KG {id: 'handler:neosprite_base_device.get_auto_animation_counter'}) SET n:Handler SET n += {method: 'get_auto_animation_counter', ownerClass: 'neosprite_base_device', sourceFile: 'src/mame/snk/neogeo_spr.cpp', sourceLine: 130, sourceColumn: 1, sourceEndLine: 133, sourceParameters: '', sourceBody: 'return m_auto_animation_counter;'};
MERGE (n:KG {id: 'handler:ng_memcard_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'ng_memcard_device', sourceFile: 'src/mame/snk/ng_memcard.cpp', sourceLine: 95, sourceColumn: 1, sourceEndLine: 101, sourceParameters: 'offs_t offset', sourceBody: 'if (m_regsel)
		return 0xff00 | m_memcard_data[offset & 0x07ff];
	else
		return 0xffff;'};
MERGE (n:KG {id: 'map:neogeo_base_state.base_main_map/range6'}) SET n:AddressRange SET n += {start: 3932160, end: 3932175, raw: 'map(0x3c0000, 0x3c000f).mirror(0x01fff0).w(FUNC(neogeo_base_state::video_register_w))', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1717, sourceColumn: 2, sourceEndLine: 1717, mirror: 131056};
MERGE (n:KG {id: 'handler:neogeo_base_state.video_register_w'}) SET n:Handler SET n += {method: 'video_register_w', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo_v.cpp', sourceLine: 251, sourceColumn: 1, sourceEndLine: 272, sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: '// accessing the LSB only is not mapped
	if (mem_mask != 0x00ff)
	{
		// accessing the MSB only stores same data in MSB and LSB
		if (mem_mask == 0xff00)
			data = (data & 0xff00) | (data >> 8);

		switch (offset)
		{
		case 0x00: m_sprgen->set_videoram_offset(data); break;
		case 0x01: m_sprgen->set_videoram_data(data); break;
		case 0x02: m_sprgen->set_videoram_modulo(data); break;
		case 0x03: set_video_control(data); break;
		case 0x04: set_display_counter_msb(data); break;
		case 0x05: set_display_counter_lsb(data); break;
		case 0x06: acknowledge_interrupt(data); break;
		case 0x07: break; // d0: pause timer for 32 lines when in PAL mode (LSPC2 only)
		}
	}'};
MERGE (n:KG {id: 'handler:neogeo_base_state.set_video_control'}) SET n:Handler SET n += {method: 'set_video_control', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo_v.cpp', sourceLine: 217, sourceColumn: 1, sourceEndLine: 225, sourceConstants: ['VERBOSE=0'], sourceParameters: 'uint16_t data', sourceBody: 'if (VERBOSE) logerror("%s: video control write %04x\\n", machine().describe_context(), data);

	m_sprgen->set_auto_animation_speed(data >> 8);
	m_sprgen->set_auto_animation_disabled(BIT(data, 3));

	set_display_position_interrupt_control(data & 0x00f0);'};
MERGE (n:KG {id: 'handler:neosprite_base_device.set_auto_animation_speed'}) SET n:Handler SET n += {method: 'set_auto_animation_speed', ownerClass: 'neosprite_base_device', sourceFile: 'src/mame/snk/neogeo_spr.cpp', sourceLine: 118, sourceColumn: 1, sourceEndLine: 121, sourceParameters: 'u8 data', sourceBody: 'm_auto_animation_speed = data;'};
MERGE (n:KG {id: 'handler:neosprite_base_device.set_auto_animation_disabled'}) SET n:Handler SET n += {method: 'set_auto_animation_disabled', ownerClass: 'neosprite_base_device', sourceFile: 'src/mame/snk/neogeo_spr.cpp', sourceLine: 124, sourceColumn: 1, sourceEndLine: 127, sourceParameters: 'u8 data', sourceBody: 'm_auto_animation_disabled = data;'};
MERGE (n:KG {id: 'handler:neogeo_base_state.set_display_position_interrupt_control'}) SET n:Handler SET n += {method: 'set_display_position_interrupt_control', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 769, sourceColumn: 1, sourceEndLine: 772, sourceParameters: 'uint16_t data', sourceBody: 'm_display_position_interrupt_control = data;'};
MERGE (n:KG {id: 'handler:neogeo_base_state.set_display_counter_msb'}) SET n:Handler SET n += {method: 'set_display_counter_msb', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 775, sourceColumn: 1, sourceEndLine: 780, sourceParameters: 'uint16_t data', sourceBody: 'm_display_counter = (m_display_counter & 0x0000ffff) | ((uint32_t)data << 16);

	LOGMASKED(LOG_VIDEO_SYSTEM, "PC %06x: set_display_counter %08x\\n", m_maincpu->pc(), m_display_counter);'};
MERGE (n:KG {id: 'handler:neogeo_base_state.set_display_counter_lsb'}) SET n:Handler SET n += {method: 'set_display_counter_lsb', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 783, sourceColumn: 1, sourceEndLine: 794, sourceConstants: ['IRQ2CTRL_LOAD_RELATIVE=5'], sourceParameters: 'uint16_t data', sourceBody: 'm_display_counter = (m_display_counter & 0xffff0000) | data;

	LOGMASKED(LOG_VIDEO_SYSTEM, "PC %06x: set_display_counter %08x\\n", m_maincpu->pc(), m_display_counter);

	if (BIT(m_display_position_interrupt_control, IRQ2CTRL_LOAD_RELATIVE))
	{
		LOGMASKED(LOG_VIDEO_SYSTEM, "AUTOLOAD_RELATIVE ");
		adjust_display_position_interrupt_timer();
	}'};
MERGE (n:KG {id: 'handler:neogeo_base_state.adjust_display_position_interrupt_timer'}) SET n:Handler SET n += {method: 'adjust_display_position_interrupt_timer', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 760, sourceColumn: 1, sourceEndLine: 766, sourceConstants: ['NEOGEO_PIXEL_CLOCK=6000000', 'NEOGEO_HTOTAL=384'], sourceParameters: '', sourceBody: 'attotime period = attotime::from_ticks((uint64_t)m_display_counter + 1, NEOGEO_PIXEL_CLOCK);
	LOGMASKED(LOG_VIDEO_SYSTEM, "adjust_display_position_interrupt_timer  current y: %02x  current x: %02x   target y: %x  target x: %x\\n", m_screen->vpos(), m_screen->hpos(), (m_display_counter + 1) / NEOGEO_HTOTAL, (m_display_counter + 1) % NEOGEO_HTOTAL);

	m_display_position_interrupt_timer->adjust(period);'};
MERGE (n:KG {id: 'handler:neogeo_base_state.acknowledge_interrupt'}) SET n:Handler SET n += {method: 'acknowledge_interrupt', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 805, sourceColumn: 1, sourceEndLine: 815, sourceParameters: 'uint16_t data', sourceBody: 'if (BIT(data, 0))
		m_irq3_pending = 0;
	if (BIT(data, 1))
		m_display_position_interrupt_pending = 0;
	if (BIT(data, 2))
		m_vblank_interrupt_pending = 0;

	update_interrupts();'};
MERGE (n:KG {id: 'handler:neogeo_base_state.update_interrupts'}) SET n:Handler SET n += {method: 'update_interrupts', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 797, sourceColumn: 1, sourceEndLine: 802, sourceParameters: '', sourceBody: 'm_maincpu->set_input_line(3, m_irq3_pending ? ASSERT_LINE : CLEAR_LINE);
	m_maincpu->set_input_line(m_raster_level, m_display_position_interrupt_pending ? ASSERT_LINE : CLEAR_LINE);
	m_maincpu->set_input_line(m_vblank_level, m_vblank_interrupt_pending ? ASSERT_LINE : CLEAR_LINE);'};
MERGE (n:KG {id: 'map:neogeo_base_state.base_main_map/range7'}) SET n:AddressRange SET n += {start: 4063232, end: 4194303, raw: 'map(0x3e0000, 0x3fffff).r(FUNC(neogeo_base_state::unmapped_r))', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1718, sourceColumn: 2, sourceEndLine: 1718};
MERGE (n:KG {id: 'map:neogeo_base_state.base_main_map/range8'}) SET n:AddressRange SET n += {start: 4194304, end: 4202495, raw: 'map(0x400000, 0x401fff).mirror(0x3fe000).rw(FUNC(neogeo_base_state::paletteram_r), FUNC(neogeo_base_state::paletteram_w))', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1719, sourceColumn: 2, sourceEndLine: 1719, mirror: 4186112};
MERGE (n:KG {id: 'handler:neogeo_base_state.paletteram_r'}) SET n:Handler SET n += {method: 'paletteram_r', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo_v.cpp', sourceLine: 89, sourceColumn: 1, sourceEndLine: 92, sourceParameters: 'offs_t offset', sourceBody: 'return m_paletteram[m_palette_bank + offset];'};
MERGE (n:KG {id: 'handler:neogeo_base_state.paletteram_w'}) SET n:Handler SET n += {method: 'paletteram_w', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo_v.cpp', sourceLine: 95, sourceColumn: 1, sourceEndLine: 114, sourceParameters: 'offs_t offset, uint16_t data', sourceBody: 'offset += m_palette_bank;
	m_paletteram[offset] = data;

	uint8_t const dark = data >> 15;
	uint8_t const r = ((data >> 14) & 0x1) | ((data >> 7) & 0x1e);
	uint8_t const g = ((data >> 13) & 0x1) | ((data >> 3) & 0x1e);
	uint8_t const b = ((data >> 12) & 0x1) | ((data << 1) & 0x1e);

	m_palette->set_pen_color(offset,
								m_palette_lookup[r][dark],
								m_palette_lookup[g][dark],
								m_palette_lookup[b][dark]); // normal

	m_palette->set_pen_color(offset + 0x2000,
								m_palette_lookup[r][dark+2],
								m_palette_lookup[g][dark+2],
								m_palette_lookup[b][dark+2]); // shadow'};
MERGE (n:KG {id: 'map:ngarcade_base_state.neogeo_main_map'}) SET n:AddressMap SET n += {cls: 'ngarcade_base_state', name: 'neogeo_main_map', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1722, sourceColumn: 1, sourceEndLine: 1737, calls: ['base_main_map']};
MERGE (n:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 127, raw: 'map(0x000000, 0x00007f).r(FUNC(ngarcade_base_state::banked_vectors_r))', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1726, sourceColumn: 2, sourceEndLine: 1726};
MERGE (n:KG {id: 'handler:ngarcade_base_state.banked_vectors_r'}) SET n:Handler SET n += {method: 'banked_vectors_r', ownerClass: 'ngarcade_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1689, sourceColumn: 1, sourceEndLine: 1701, sourceParameters: 'offs_t offset', sourceBody: 'if (!m_use_cart_vectors)
	{
		uint16_t* bios = (uint16_t*)m_region_mainbios->base();
		return bios[offset];
	}
	else
	{
		uint16_t* rom = (m_slots[m_curr_slot] && m_slots[m_curr_slot]->get_rom_size() > 0) ? m_slots[m_curr_slot]->get_rom_base() : m_region_maincpu ? (uint16_t*)m_region_maincpu->base() : m_share_maincpu;
		return rom[offset];
	}'};
MERGE (n:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range1'}) SET n:AddressRange SET n += {start: 1048576, end: 1114111, raw: 'map(0x100000, 0x10ffff).mirror(0x0f0000).ram()', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1727, sourceColumn: 2, sourceEndLine: 1727, mirror: 983040, ram: true};
MERGE (n:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range2'}) SET n:AddressRange SET n += {start: 3145729, end: 3145729, raw: 'map(0x300001, 0x300001).mirror(0x01fffe).w("watchdog", FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1729, sourceColumn: 2, sourceEndLine: 1729, mirror: 131070};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1729, sourceColumn: 2, sourceEndLine: 1729};
MERGE (n:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range3'}) SET n:AddressRange SET n += {start: 3145856, end: 3145857, raw: 'map(0x300080, 0x300081).mirror(0x01ff7e).portr("TEST")', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1730, sourceColumn: 2, sourceEndLine: 1730, mirror: 130942, portRead: 'TEST'};
MERGE (n:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range4'}) SET n:AddressRange SET n += {start: 3276800, end: 3276801, raw: 'map(0x320000, 0x320001).mirror(0x01fffe).portr("AUDIO_COIN")', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1731, sourceColumn: 2, sourceEndLine: 1731, mirror: 131070, portRead: 'AUDIO_COIN'};
MERGE (n:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range5'}) SET n:AddressRange SET n += {start: 3670016, end: 3670017, raw: 'map(0x380000, 0x380001).mirror(0x01fffe).portr("SYSTEM")', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1732, sourceColumn: 2, sourceEndLine: 1732, mirror: 131070, portRead: 'SYSTEM'};
MERGE (n:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range6'}) SET n:AddressRange SET n += {start: 8388608, end: 8392703, raw: 'map(0x800000, 0x800fff).r(FUNC(ngarcade_base_state::unmapped_r))', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1733, sourceColumn: 2, sourceEndLine: 1733};
MERGE (n:KG {id: 'handler:ngarcade_base_state.unmapped_r'}) SET n:Handler SET n += {method: 'unmapped_r', ownerClass: 'ngarcade_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1016, sourceColumn: 1, sourceEndLine: 1033, sourceParameters: 'address_space &space', sourceBody: 'uint16_t ret;

	/* unmapped memory returns the last word on the data bus, which is almost always the opcode
	   of the next instruction due to prefetch */

	/* prevent recursion */
	if (m_recurse)
		ret = 0xffff;
	else
	{
		m_recurse = true;
		ret = space.read_word(m_maincpu->pc());
		m_recurse = false;
	}
	return ret;'};
MERGE (n:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range7'}) SET n:AddressRange SET n += {start: 12582912, end: 12713983, raw: 'map(0xc00000, 0xc1ffff).mirror(0x0e0000).rom().region("mainbios", 0)', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1734, sourceColumn: 2, sourceEndLine: 1734, mirror: 917504, rom: true, region: 'mainbios', regionOffset: 0};
MERGE (n:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range8'}) SET n:AddressRange SET n += {start: 13631488, end: 13697023, raw: 'map(0xd00000, 0xd0ffff).mirror(0x0f0000).ram().w(FUNC(ngarcade_base_state::save_ram_w)).share("saveram")', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1735, sourceColumn: 2, sourceEndLine: 1735, mirror: 983040, ram: true, share: 'saveram'};
MERGE (n:KG {id: 'handler:ngarcade_base_state.save_ram_w'}) SET n:Handler SET n += {method: 'save_ram_w', ownerClass: 'ngarcade_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1049, sourceColumn: 1, sourceEndLine: 1053, sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: 'if (m_save_ram_unlocked)
		COMBINE_DATA(&m_save_ram[offset]);'};
MERGE (n:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range9'}) SET n:AddressRange SET n += {start: 14680064, end: 16777215, raw: 'map(0xe00000, 0xffffff).r(FUNC(ngarcade_base_state::unmapped_r))', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1736, sourceColumn: 2, sourceEndLine: 1736};
MERGE (n:KG {id: 'handler:ng_memcard_device.present'}) SET n:Handler SET n += {method: 'present', ownerClass: 'ng_memcard_device', sourceFile: 'src/mame/snk/ng_memcard.h', sourceLine: 37, sourceColumn: 26, sourceEndLine: 39, sourceParameters: '', sourceBody: 'return is_loaded();'};
MERGE (n:KG {id: 'map:neogeo_base_state.audio_map'}) SET n:AddressMap SET n += {cls: 'neogeo_base_state', name: 'audio_map', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1777, sourceColumn: 1, sourceEndLine: 1785};
MERGE (n:KG {id: 'map:neogeo_base_state.audio_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).bankr(m_bank_audio_main)', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1779, sourceColumn: 2, sourceEndLine: 1779, bankRead: 'audio_main'};
MERGE (n:KG {id: 'map:neogeo_base_state.audio_map/range1'}) SET n:AddressRange SET n += {start: 32768, end: 49151, raw: 'map(0x8000, 0xbfff).bankr("audio_8000")', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1780, sourceColumn: 2, sourceEndLine: 1780, bankRead: 'audio_8000'};
MERGE (n:KG {id: 'map:neogeo_base_state.audio_map/range2'}) SET n:AddressRange SET n += {start: 49152, end: 57343, raw: 'map(0xc000, 0xdfff).bankr("audio_c000")', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1781, sourceColumn: 2, sourceEndLine: 1781, bankRead: 'audio_c000'};
MERGE (n:KG {id: 'map:neogeo_base_state.audio_map/range3'}) SET n:AddressRange SET n += {start: 57344, end: 61439, raw: 'map(0xe000, 0xefff).bankr("audio_e000")', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1782, sourceColumn: 2, sourceEndLine: 1782, bankRead: 'audio_e000'};
MERGE (n:KG {id: 'map:neogeo_base_state.audio_map/range4'}) SET n:AddressRange SET n += {start: 61440, end: 63487, raw: 'map(0xf000, 0xf7ff).bankr("audio_f000")', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1783, sourceColumn: 2, sourceEndLine: 1783, bankRead: 'audio_f000'};
MERGE (n:KG {id: 'map:neogeo_base_state.audio_map/range5'}) SET n:AddressRange SET n += {start: 63488, end: 65535, raw: 'map(0xf800, 0xffff).ram()', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1784, sourceColumn: 2, sourceEndLine: 1784, ram: true};
MERGE (n:KG {id: 'map:neogeo_base_state.audio_io_map'}) SET n:AddressMap SET n += {cls: 'neogeo_base_state', name: 'audio_io_map', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1795, sourceColumn: 1, sourceEndLine: 1802};
MERGE (n:KG {id: 'map:neogeo_base_state.audio_io_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 0, raw: 'map(0x00, 0x00).mirror(0xff00).rw(m_soundlatch, FUNC(generic_latch_8_device::read), FUNC(generic_latch_8_device::clear_w))', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1797, sourceColumn: 2, sourceEndLine: 1797, mirror: 65280};
MERGE (n:KG {id: 'handler:generic_latch_8_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1797, sourceColumn: 2, sourceEndLine: 1797};
MERGE (n:KG {id: 'handler:generic_latch_8_device.clear_w'}) SET n:Handler SET n += {method: 'clear_w', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1797, sourceColumn: 2, sourceEndLine: 1797};
MERGE (n:KG {id: 'map:neogeo_base_state.audio_io_map/range1'}) SET n:AddressRange SET n += {start: 4, end: 7, raw: 'map(0x04, 0x07).mirror(0xff00).rw(m_ym, FUNC(ym2610_device::read), FUNC(ym2610_device::write))', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1798, sourceColumn: 2, sourceEndLine: 1798, mirror: 65280};
MERGE (n:KG {id: 'handler:ym2610_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'ym2610_device', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1798, sourceColumn: 2, sourceEndLine: 1798};
MERGE (n:KG {id: 'handler:ym2610_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'ym2610_device', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1798, sourceColumn: 2, sourceEndLine: 1798};
MERGE (n:KG {id: 'map:neogeo_base_state.audio_io_map/range2'}) SET n:AddressRange SET n += {start: 8, end: 8, raw: 'map(0x08, 0x08).mirror(0xff00).select(0x0010).w(FUNC(neogeo_base_state::audio_cpu_enable_nmi_w))', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1799, sourceColumn: 2, sourceEndLine: 1799, mirror: 65280};
MERGE (n:KG {id: 'handler:neogeo_base_state.audio_cpu_enable_nmi_w'}) SET n:Handler SET n += {method: 'audio_cpu_enable_nmi_w', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 885, sourceColumn: 1, sourceEndLine: 889, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '// out ($08) enables the nmi, out ($18) disables it
	m_audionmi->in_w<1>(BIT(~offset, 4));'};
MERGE (n:KG {id: 'map:neogeo_base_state.audio_io_map/range3'}) SET n:AddressRange SET n += {start: 8, end: 11, raw: 'map(0x08, 0x0b).mirror(0x00f0).select(0xff00).r(FUNC(neogeo_base_state::audio_cpu_bank_select_r))', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1800, sourceColumn: 2, sourceEndLine: 1800, mirror: 240};
MERGE (n:KG {id: 'handler:neogeo_base_state.audio_cpu_bank_select_r'}) SET n:Handler SET n += {method: 'audio_cpu_bank_select_r', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1112, sourceColumn: 1, sourceEndLine: 1118, sourceParameters: 'offs_t offset', sourceBody: 'if (!machine().side_effects_disabled())
		m_bank_audio_cart[offset & 3]->set_entry(offset >> 8);

	return 0;'};
MERGE (n:KG {id: 'map:neogeo_base_state.audio_io_map/range4'}) SET n:AddressRange SET n += {start: 12, end: 12, raw: 'map(0x0c, 0x0c).mirror(0xff00).w(m_soundlatch2, FUNC(generic_latch_8_device::write))', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1801, sourceColumn: 2, sourceEndLine: 1801, mirror: 65280};
MERGE (n:KG {id: 'handler:generic_latch_8_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1801, sourceColumn: 2, sourceEndLine: 1801};
MERGE (n:KG {id: 'machine:neogeo_base_state.neogeo_base'}) SET n:MachineConfig SET n += {cls: 'neogeo_base_state', name: 'neogeo_base', calls: [], stateMembers: ['{"name":"m_vblank_level","bits":8}', '{"name":"m_raster_level","bits":8}', '{"name":"m_use_cart_vectors","bits":8}', '{"name":"m_use_cart_audio","bits":8}', '{"name":"m_card_bank","bits":8}', '{"name":"m_bank_base","bits":32}', '{"name":"m_curr_slot","bits":32,"signed":true}', '{"name":"m_recurse","bits":1}', '{"name":"m_display_counter","bits":32}', '{"name":"m_vblank_interrupt_pending","bits":8}', '{"name":"m_display_position_interrupt_pending","bits":8}', '{"name":"m_irq3_pending","bits":8}', '{"name":"m_display_position_interrupt_control","bits":8}', '{"name":"m_screen_shadow","bits":1}', '{"name":"m_palette_bank","bits":32}'], resetHandlers: ['neogeo_base_state.machine_reset'], startHandlers: ['neogeo_base_state.video_start'], sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1921, sourceColumn: 1, sourceEndLine: 1962};
MERGE (n:KG {id: 'handler:neogeo_base_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1659, sourceColumn: 1, sourceEndLine: 1671, sourceParameters: '', sourceBody: '// disable audiocpu NMI
	m_audionmi->in_w<1>(0);
	m_soundlatch->acknowledge_w();

	start_interrupt_timers();

	// trigger the IRQ3 that was set by MACHINE_START
	update_interrupts();

	m_recurse = false;'};
MERGE (n:KG {id: 'handler:ngarcade_base_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'ngarcade_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1673, sourceColumn: 1, sourceEndLine: 1679, sourceParameters: '', sourceBody: 'neogeo_base_state::machine_reset();

	machine().bookkeeping().coin_lockout_w(0, 1);
	machine().bookkeeping().coin_lockout_w(1, 1);'};
MERGE (n:KG {id: 'handler:neogeo_base_state.start_interrupt_timers'}) SET n:Handler SET n += {method: 'start_interrupt_timers', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 871, sourceColumn: 1, sourceEndLine: 875, sourceConstants: ['NEOGEO_VBSTART=240'], sourceParameters: '', sourceBody: 'm_vblank_interrupt_timer->adjust(m_screen->time_until_pos(NEOGEO_VBSTART) + NEOGEO_VBLANK_IRQ_HTIM);
	m_display_position_vblank_timer->adjust(m_screen->time_until_pos(NEOGEO_VBSTART) + NEOGEO_VBLANK_RELOAD_HTIM);'};
MERGE (n:KG {id: 'handler:neogeo_base_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo_v.cpp', sourceLine: 123, sourceColumn: 1, sourceEndLine: 137, sourceParameters: '', sourceBody: 'create_rgb_lookups();

	m_paletteram.resize(0x1000 * 2, 0);

	m_screen_shadow = false;
	m_palette_bank = 0;

	save_item(NAME(m_paletteram));
	save_item(NAME(m_screen_shadow));
	save_item(NAME(m_palette_bank));

	set_pens();'};
MERGE (n:KG {id: 'handler:neogeo_base_state.create_rgb_lookups'}) SET n:Handler SET n += {method: 'create_rgb_lookups', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo_v.cpp', sourceLine: 23, sourceColumn: 1, sourceEndLine: 65, sourceParameters: '', sourceBody: '/* compute four sets of weights - with or without the pulldowns -
	   ensuring that we use the same scaler for all */
	double weights_normal[5];
	double scaler = compute_resistor_weights(0, 255, -1,
											5, resistances, weights_normal, 0, 0,
											0, nullptr, nullptr, 0, 0,
											0, nullptr, nullptr, 0, 0);

	double weights_dark[5];
	compute_resistor_weights(0, 255, scaler,
							5, resistances, weights_dark, 8200, 0,
							0, nullptr, nullptr, 0, 0,
							0, nullptr, nullptr, 0, 0);

	double weights_shadow[5];
	compute_resistor_weights(0, 255, scaler,
							5, resistances, weights_shadow, 150, 0,
							0, nullptr, nullptr, 0, 0,
							0, nullptr, nullptr, 0, 0);

	double weights_dark_shadow[5];
	compute_resistor_weights(0, 255, scaler,
							5, resistances, weights_dark_shadow, 1.0 / ((1.0 / 8200) + (1.0 / 150)), 0,
							0, nullptr, nullptr, 0, 0,
							0, nullptr, nullptr, 0, 0);

	for (int i = 0; i < 32; i++)
	{
		int const i4 = BIT(i, 4);
		int const i3 = BIT(i, 3);
		int const i2 = BIT(i, 2);
		int const i1 = BIT(i, 1);
		int const i0 = BIT(i, 0);
		m_palette_lookup[i][0] = combine_weights(weights_normal, i0, i1, i2, i3, i4);
		m_palette_lookup[i][1] = combine_weights(weights_dark, i0, i1, i2, i3, i4);
		m_palette_lookup[i][2] = combine_weights(weights_shadow, i0, i1, i2, i3, i4);
		m_palette_lookup[i][3] = combine_weights(weights_dark_shadow, i0, i1, i2, i3, i4);
	}'};
MERGE (n:KG {id: 'handler:neogeo_base_state.set_pens'}) SET n:Handler SET n += {method: 'set_pens', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo_v.cpp', sourceLine: 67, sourceColumn: 1, sourceEndLine: 72, sourceParameters: '', sourceBody: 'const pen_t *pen_base = m_palette->pens() + m_palette_bank + (m_screen_shadow ? 0x2000 : 0);
	m_sprgen->set_pens(pen_base);
	m_bg_pen = pen_base + 0xfff;'};
MERGE (n:KG {id: 'device:neogeo_base_state.neogeo_base/maincpu'}) SET n:Device SET n += {type: 'M68000', tag: 'maincpu', clock: 12000000, config: ['M68000(config, m_maincpu, NEOGEO_MAIN_CPU_CLOCK)'], sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1924, sourceColumn: 2, sourceEndLine: 1924};
MERGE (n:KG {id: 'device:neogeo_base_state.neogeo_base/audiocpu'}) SET n:Device SET n += {type: 'Z80', tag: 'audiocpu', clock: 4000000, config: ['Z80(config, m_audiocpu, NEOGEO_AUDIO_CPU_CLOCK)', 'm_audiocpu->set_addrmap(AS_PROGRAM, &neogeo_base_state::audio_map)', 'm_audiocpu->set_addrmap(AS_IO, &neogeo_base_state::audio_io_map)'], sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1926, sourceColumn: 2, sourceEndLine: 1926};
MERGE (n:KG {id: 'device:neogeo_base_state.neogeo_base/systemlatch'}) SET n:Device SET n += {type: 'HC259', tag: 'systemlatch', clock: null, config: ['HC259(config, m_systemlatch)', 'm_systemlatch->q_out_cb<0>().set(FUNC(neogeo_base_state::set_screen_shadow))', 'm_systemlatch->q_out_cb<1>().set(FUNC(neogeo_base_state::set_use_cart_vectors))', 'm_systemlatch->q_out_cb<2>().set_nop()', 'm_systemlatch->q_out_cb<3>().set_nop()', 'm_systemlatch->q_out_cb<4>().set_nop()', 'm_systemlatch->q_out_cb<7>().set(FUNC(neogeo_base_state::set_palette_bank))', 'm_systemlatch->q_out_cb<5>().set(FUNC(ngarcade_base_state::set_use_cart_audio))', 'm_systemlatch->q_out_cb<6>().set(FUNC(ngarcade_base_state::set_save_ram_unlock))', 'm_systemlatch->q_out_cb<2>().set(m_memcard, FUNC(ng_memcard_device::lock1_w))', 'm_systemlatch->q_out_cb<3>().set(m_memcard, FUNC(ng_memcard_device::unlock2_w))', 'm_systemlatch->q_out_cb<4>().set(m_memcard, FUNC(ng_memcard_device::regsel_w))'], sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1930, sourceColumn: 2, sourceEndLine: 1930};
MERGE (n:KG {id: 'device:neogeo_base_state.neogeo_base/systemlatch/callback:systemlatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_systemlatch->q_out_cb<0>().set(FUNC(neogeo_base_state::set_screen_shadow))', ownerTag: 'systemlatch', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1931, sourceColumn: 2, sourceEndLine: 1931, slot: '0', targetClass: 'neogeo_base_state', targetMethod: 'set_screen_shadow'};
MERGE (n:KG {id: 'handler:neogeo_base_state.set_screen_shadow'}) SET n:Handler SET n += {method: 'set_screen_shadow', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo_v.cpp', sourceLine: 75, sourceColumn: 1, sourceEndLine: 79, sourceParameters: 'int state', sourceBody: 'm_screen_shadow = state;
	set_pens();'};
MERGE (n:KG {id: 'device:neogeo_base_state.neogeo_base/systemlatch/callback:systemlatch:1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_systemlatch->q_out_cb<1>().set(FUNC(neogeo_base_state::set_use_cart_vectors))', ownerTag: 'systemlatch', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1932, sourceColumn: 2, sourceEndLine: 1932, slot: '1', targetClass: 'neogeo_base_state', targetMethod: 'set_use_cart_vectors'};
MERGE (n:KG {id: 'handler:neogeo_base_state.set_use_cart_vectors'}) SET n:Handler SET n += {method: 'set_use_cart_vectors', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1127, sourceColumn: 1, sourceEndLine: 1130, sourceParameters: 'int state', sourceBody: 'm_use_cart_vectors = state;'};
MERGE (n:KG {id: 'device:neogeo_base_state.neogeo_base/systemlatch/callback:systemlatch:5'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_systemlatch->q_out_cb<7>().set(FUNC(neogeo_base_state::set_palette_bank))', ownerTag: 'systemlatch', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1936, sourceColumn: 2, sourceEndLine: 1936, slot: '7', targetClass: 'neogeo_base_state', targetMethod: 'set_palette_bank'};
MERGE (n:KG {id: 'handler:neogeo_base_state.set_palette_bank'}) SET n:Handler SET n += {method: 'set_palette_bank', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo_v.cpp', sourceLine: 82, sourceColumn: 1, sourceEndLine: 86, sourceParameters: 'int state', sourceBody: 'm_palette_bank = state ? 0x1000 : 0;
	set_pens();'};
MERGE (n:KG {id: 'device:neogeo_base_state.neogeo_base/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(NEOGEO_PIXEL_CLOCK, NEOGEO_HTOTAL, NEOGEO_HBEND, NEOGEO_HBSTART, NEOGEO_VTOTAL, NEOGEO_VBEND, NEOGEO_VBSTART)', 'm_screen->set_screen_update(FUNC(neogeo_base_state::screen_update))'], sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1941, sourceColumn: 2, sourceEndLine: 1941, configCalls: ['set_raw(6000000,384,28,348,264,16,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6000000, 384, 28, 348, 264, 16, 240], screenRawExpr: ['NEOGEO_PIXEL_CLOCK', 'NEOGEO_HTOTAL', 'NEOGEO_HBEND', 'NEOGEO_HBSTART', 'NEOGEO_VTOTAL', 'NEOGEO_VBEND', 'NEOGEO_VBSTART']};
MERGE (n:KG {id: 'device:neogeo_base_state.neogeo_base/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(neogeo_base_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1943, sourceColumn: 2, sourceEndLine: 1943, targetClass: 'neogeo_base_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:neogeo_base_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo_v.cpp', sourceLine: 157, sourceColumn: 1, sourceEndLine: 167, sourceParameters: 'screen_device &screen, bitmap_rgb32 &bitmap, const rectangle &cliprect', sourceBody: '// fill with background color first
	bitmap.fill(*m_bg_pen, cliprect);

	m_sprgen->draw_sprites(bitmap, cliprect.min_y);

	m_sprgen->draw_fixed_layer(bitmap, cliprect.min_y);

	return 0;'};
MERGE (n:KG {id: 'handler:neosprite_base_device.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'neosprite_base_device', sourceFile: 'src/mame/snk/neogeo_spr.cpp', sourceLine: 283, sourceColumn: 1, sourceEndLine: 459, sourceConstants: ['NEOGEO_HBEND=28'], sourceParameters: 'bitmap_rgb32 &bitmap, int scanline', sourceBody: 'int max_sprite_index;
	int y = 0;
	int x = 0;
	int rows = 0;
	int zoom_y = 0;
	int zoom_x = 0;
	u16 *sprite_list;

	/* select the active list */
	if (BIT(scanline, 0))
		sprite_list = &m_videoram_drawsource[0x8680];
	else
		sprite_list = &m_videoram_drawsource[0x8600];

	/* optimization -- find last non-zero entry and only draw that many +1
	   sprite.  This is not 100% correct as the hardware will keep drawing
	   the #0 sprite over and over, but we need the speed */
	for (max_sprite_index = (MAX_SPRITES_PER_LINE - 1); max_sprite_index >= 0; max_sprite_index--)
	{
		if (sprite_list[max_sprite_index] != 0)
			break;
	}

	/* add the +1 now, just in case the 0 at the end is real sprite */
	if (max_sprite_index != (MAX_SPRITES_PER_LINE - 1))
		max_sprite_index = max_sprite_index + 1;

	for (int sprite_index = 0; sprite_index <= max_sprite_index; sprite_index++)
	{
		const u16 sprite_number = sprite_list[sprite_index] & 0x01ff;
		const u16 y_control = m_videoram_drawsource[0x8200 | sprite_number];
		const u16 zoom_control = m_videoram_drawsource[0x8000 | sprite_number];

		/* if chained, go to next X coordinate and get new X zoom */
		if (BIT(y_control, 6))
		{
			x = (x + zoom_x + 1) & 0x01ff;
			zoom_x = (zoom_control >> 8) & 0x0f;
		}
		/* new block */
		else
		{
			y = 0x200 - (y_control >> 7);
			x = m_videoram_drawsource[0x8400 | sprite_number] >> 7;

			zoom_y = (zoom_control & 0xff);

			zoom_x = (zoom_control >> 8) & 0x0f;
			rows = y_control & 0x3f;
		}

		/* skip if falls completely outside the screen */
		if ((x >= 0x140) && (x <= 0x1f0))
			continue;

		/* double check the Y coordinate, in case somebody modified the sprite coordinate
		   since we buffered it */
		if (sprite_on_scanline(scanline, y, rows))
		{
			const int sprite_line = (scanline - y) & 0x1ff;
			int zoom_line = sprite_line & 0xff;
			bool invert = BIT(sprite_line, 8);

			if (invert)
				zoom_line ^= 0xff;

			if (rows > 0x20)
			{
				zoom_line = zoom_line % ((zoom_y + 1) << 1);

				if (zoom_line > zoom_y)
				{
					zoom_line = ((zoom_y + 1) << 1) - 1 - zoom_line;
					invert = !invert;
				}
			}

			const u8 sprite_y_and_tile = m_region_zoomy[(zoom_y << 8) | zoom_line];

			int sprite_y = sprite_y_and_tile & 0x0f;
			int tile = sprite_y_and_tile >> 4;

			if (invert)
			{
				sprite_y ^= 0x0f;
				tile ^= 0x1f;
			}

			const offs_t attr_and_code_offs = (sprite_number << 6) | (tile << 1);
			const u16 attr = m_videoram_drawsource[attr_and_code_offs + 1];
			u32 code = ((attr << 12) & 0xf0000) | m_videoram_drawsource[attr_and_code_offs];

			/* substitute auto animation bits */
			if (!m_auto_animation_disabled)
			{
				if (BIT(attr, 3))
					code = (code & ~0x07) | (m_auto_animation_counter & 0x07);
				else if (BIT(attr, 2))
					code = (code & ~0x03) | (m_auto_animation_counter & 0x03);
			}

			/* vertical flip? */
			if (BIT(attr, 1))
				sprite_y ^= 0x0f;

			u16 zoom_x_table = TABLE(zoom_x, 0x0080, 0x0880, 0x0888, 0x2888, 0x288a, 0x2a8a, 0x2aaa, 0xaaaa, 0xaaea, 0xbaea, 0xbaeb, 0xbbeb, 0xbbef, 0xfbef, 0xfbff, 0xffff);

			/* compute offset in gfx ROM and mask it to the number of bits available */
			int gfx_base = ((code << 8) | (sprite_y << 4)) & m_sprite_gfx_address_mask;

			const pen_t *line_pens = &m_pens[attr >> 8 << m_bppshift];

			int x_inc;

			/* horizontal flip? */
			if (BIT(attr, 0))
			{
				gfx_base = gfx_base + 0x0f;
				x_inc = -1;
			}
			else
				x_inc = 1;

			/* draw the line - no wrap-around */
			if (x <= 0x01f0)
			{
				u32 *pixel_addr = &bitmap.pix(scanline, x + NEOGEO_HBEND);

				for (int i = 0; i < 0x10; i++)
				{
					if (BIT(zoom_x_table, 15))
					{
						draw_pixel(gfx_base, pixel_addr, line_pens);

						pixel_addr++;
					}

					zoom_x_table <<= 1;
					if (zoom_x_table == 0)
						break;

					gfx_base += x_inc;
				}
			}
			/* wrap-around */
			else
			{
				const int x_save = x;
				u32 *pixel_addr = &bitmap.pix(scanline, NEOGEO_HBEND);

				for (int i = 0; i < 0x10; i++)
				{
					if (BIT(zoom_x_table, 15))
					{
						if (x >= 0x200)
						{
							draw_pixel(gfx_base, pixel_addr, line_pens);

							pixel_addr++;
						}

						x++;
					}

					zoom_x_table <<= 1;
					if (zoom_x_table == 0)
						break;

					gfx_base += x_inc;
				}
				x = x_save;
			}
		}
	}'};
MERGE (n:KG {id: 'handler:neosprite_base_device.sprite_on_scanline'}) SET n:Handler SET n += {method: 'sprite_on_scanline', ownerClass: 'neosprite_base_device', sourceFile: 'src/mame/snk/neogeo_spr.cpp', sourceLine: 277, sourceColumn: 1, sourceEndLine: 280, sourceParameters: 'int scanline, int y, int rows', sourceBody: 'return (rows == 0) || (rows >= 0x20) || ((scanline - y) & 0x1ff) < (rows * 0x10);'};
MERGE (n:KG {id: 'handler:neosprite_base_device.draw_fixed_layer'}) SET n:Handler SET n += {method: 'draw_fixed_layer', ownerClass: 'neosprite_base_device', sourceFile: 'src/mame/snk/neogeo_spr.cpp', sourceLine: 180, sourceColumn: 1, sourceEndLine: 245, sourceConstants: ['NEOGEO_HBEND=28', 'FIX_BANKTYPE_GAROU=1', 'FIX_BANKTYPE_KOF2000=2'], sourceParameters: 'bitmap_rgb32 &bitmap, int scanline', sourceBody: 'assert((m_fixed_layer_source && m_region_fixed != nullptr) || (m_region_fixedbios != nullptr));

	u8* gfx_base = m_fixed_layer_source ? m_region_fixed : m_region_fixedbios->base();
	const u32 addr_mask = ( m_fixed_layer_source ? m_region_fixed_size : m_region_fixedbios->bytes() ) - 1;
	const u16 *video_data = &m_videoram_drawsource[0x7000 | (scanline >> 3)];
	u32 *pixel_addr = &bitmap.pix(scanline, NEOGEO_HBEND);

	int garouoffsets[34]{};
	const bool banked = m_fixed_layer_source && (addr_mask > 0x1ffff);

	/* thanks to Mr K for the garou & kof2000 banking info */
	/* Build line banking table for Garou & MS3 before starting render */
	if (banked && m_fixed_layer_bank_type == FIX_BANKTYPE_GAROU)
	{
		int garoubank = 0;
		int k = 0;
		int y = 0;
		while (y < 32)
		{
			if (m_videoram_drawsource[0x7500 + k] == 0x0200 && (m_videoram_drawsource[0x7580 + k] & 0xff00) == 0xff00)
			{
				garoubank = m_videoram_drawsource[0x7580 + k] & 3;
				garouoffsets[y++] = garoubank;
			}
			garouoffsets[y++] = garoubank;
			k += 2;
		}
	}

	for (int x = 0; x < 40; x++)
	{
		const u16 code_and_palette = *video_data;
		u16 code = code_and_palette & 0x0fff;

		if (banked)
		{
			int y = scanline >> 3;
			switch (m_fixed_layer_bank_type)
			{
			case FIX_BANKTYPE_GAROU:
				/* Garou, MSlug 3 */
				code += 0x1000 * (garouoffsets[(y - 2) & 31] ^ 3);
				break;
			case FIX_BANKTYPE_KOF2000:
				code += 0x1000 * (((m_videoram_drawsource[0x7500 + ((y - 1) & 31) + 32 * (x / 6)] >> (5 - (x % 6)) * 2) & 3) ^ 3);
				break;
			}
		}

		{
			const int gfx_offset = ((code << 5) | (scanline & 0x07)) & addr_mask;

			const pen_t *char_pens = &m_pens[code_and_palette >> 12 << m_bppshift];

			

			for (int i = 0; i < 4; i++)
			{
				draw_fixed_layer_2pixels(pixel_addr, gfx_offset + TABLE(i, 0x10, 0x18, 0x00, 0x08), gfx_base, char_pens);
			}
		}
		video_data = video_data + 0x20;
	}'};
MERGE (n:KG {id: 'handler:neosprite_base_device.draw_fixed_layer_2pixels'}) SET n:Handler SET n += {method: 'draw_fixed_layer_2pixels', ownerClass: 'neosprite_base_device', sourceFile: 'src/mame/snk/neogeo_spr.cpp', sourceLine: 248, sourceColumn: 1, sourceEndLine: 260, sourceParameters: 'u32*&pixel_addr, int offset, u8* gfx_base, const pen_t* char_pens', sourceBody: 'const u8 data = gfx_base[offset];

	if (data & 0x0f)
		*pixel_addr = char_pens[data & 0x0f];
	pixel_addr++;

	if (data & 0xf0)
		*pixel_addr = char_pens[(data & 0xf0) >> 4];
	pixel_addr++;'};
MERGE (n:KG {id: 'device:neogeo_base_state.neogeo_base/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, palette_device::BLACK, 4096*2*2)'], sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1946, sourceColumn: 2, sourceEndLine: 1946, clockExpr: 'palette_device::BLACK'};
MERGE (n:KG {id: 'device:neogeo_base_state.neogeo_base/spritegen'}) SET n:Device SET n += {type: 'NEOGEO_SPRITE_OPTIMZIED', tag: 'spritegen', clock: null, config: ['NEOGEO_SPRITE_OPTIMZIED(config, m_sprgen).set_screen(m_screen)'], cls: 'neosprite_optimized_device', clsHierarchy: ['neosprite_optimized_device', 'neosprite_base_device'], sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1948, sourceColumn: 2, sourceEndLine: 1948};
MERGE (n:KG {id: 'device:neogeo_base_state.neogeo_base/audionmi'}) SET n:Device SET n += {type: 'INPUT_MERGER_ALL_HIGH', tag: 'audionmi', clock: null, config: ['INPUT_MERGER_ALL_HIGH(config, m_audionmi)', 'm_audionmi->output_handler().set_inputline(m_audiocpu, INPUT_LINE_NMI)'], sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1951, sourceColumn: 2, sourceEndLine: 1951};
MERGE (n:KG {id: 'device:neogeo_base_state.neogeo_base/audionmi/callback:audionmi:0'}) SET n:Callback SET n += {signal: 'output_handler', operation: 'set_inputline', raw: 'm_audionmi->output_handler().set_inputline(m_audiocpu, INPUT_LINE_NMI)', ownerTag: 'audionmi', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1952, sourceColumn: 2, sourceEndLine: 1952, inputLine: 'INPUT_LINE_NMI', targetTag: 'audiocpu'};
MERGE (n:KG {id: 'device:neogeo_base_state.neogeo_base/soundlatch'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch', clock: null, config: ['GENERIC_LATCH_8(config, m_soundlatch)', 'm_soundlatch->set_separate_acknowledge(false)', 'm_soundlatch->data_pending_callback().set(m_audionmi, FUNC(input_merger_device::in_w<0>))'], sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1954, sourceColumn: 2, sourceEndLine: 1954};
MERGE (n:KG {id: 'device:neogeo_base_state.neogeo_base/soundlatch/callback:soundlatch:0'}) SET n:Callback SET n += {signal: 'data_pending_callback', operation: 'set', raw: 'm_soundlatch->data_pending_callback().set(m_audionmi, FUNC(input_merger_device::in_w<0>))', ownerTag: 'soundlatch', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1956, sourceColumn: 2, sourceEndLine: 1956, targetClass: 'input_merger_device', targetMethod: 'in_w_0', targetTag: 'audionmi'};
MERGE (n:KG {id: 'handler:input_merger_device.in_w_0'}) SET n:Handler SET n += {method: 'in_w_0', ownerClass: 'input_merger_device', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1956, sourceColumn: 2, sourceEndLine: 1956};
MERGE (n:KG {id: 'device:neogeo_base_state.neogeo_base/soundlatch2'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch2', clock: null, config: ['GENERIC_LATCH_8(config, m_soundlatch2)'], sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1958, sourceColumn: 2, sourceEndLine: 1958};
MERGE (n:KG {id: 'device:neogeo_base_state.neogeo_base/ymsnd'}) SET n:Device SET n += {type: 'YM2610', tag: 'ymsnd', clock: 8000000, config: ['YM2610(config, m_ym, NEOGEO_YM2610_CLOCK)', 'm_ym->irq_handler().set_inputline(m_audiocpu, 0)', 'm_ym->add_route(0, "speaker", 0.84, 0)', 'm_ym->add_route(0, "speaker", 0.84, 1)', 'm_ym->add_route(1, "speaker", 0.98, 0)', 'm_ym->add_route(2, "speaker", 0.98, 1)'], sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1960, sourceColumn: 2, sourceEndLine: 1960};
MERGE (n:KG {id: 'device:neogeo_base_state.neogeo_base/ymsnd/callback:ymsnd:0'}) SET n:Callback SET n += {signal: 'irq_handler', operation: 'set_inputline', raw: 'm_ym->irq_handler().set_inputline(m_audiocpu, 0)', ownerTag: 'ymsnd', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1961, sourceColumn: 2, sourceEndLine: 1961, inputLine: '0', targetTag: 'audiocpu'};
MERGE (n:KG {id: 'machine:neogeo_base_state.neogeo_stereo'}) SET n:MachineConfig SET n += {cls: 'neogeo_base_state', name: 'neogeo_stereo', calls: [], stateMembers: ['{"name":"m_vblank_level","bits":8}', '{"name":"m_raster_level","bits":8}', '{"name":"m_use_cart_vectors","bits":8}', '{"name":"m_use_cart_audio","bits":8}', '{"name":"m_card_bank","bits":8}', '{"name":"m_bank_base","bits":32}', '{"name":"m_curr_slot","bits":32,"signed":true}', '{"name":"m_recurse","bits":1}', '{"name":"m_display_counter","bits":32}', '{"name":"m_vblank_interrupt_pending","bits":8}', '{"name":"m_display_position_interrupt_pending","bits":8}', '{"name":"m_irq3_pending","bits":8}', '{"name":"m_display_position_interrupt_control","bits":8}', '{"name":"m_screen_shadow","bits":1}', '{"name":"m_palette_bank","bits":32}'], resetHandlers: ['neogeo_base_state.machine_reset'], startHandlers: ['neogeo_base_state.video_start'], devicePatches: ['{"tag":"ymsnd","config":["m_ym->add_route(0, \\"speaker\\", 0.84, 0)","m_ym->add_route(0, \\"speaker\\", 0.84, 1)","m_ym->add_route(1, \\"speaker\\", 0.98, 0)","m_ym->add_route(2, \\"speaker\\", 0.98, 1)"]}'], sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1965, sourceColumn: 1, sourceEndLine: 1973};
MERGE (n:KG {id: 'device:neogeo_base_state.neogeo_stereo/speaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speaker', clock: 2, config: ['SPEAKER(config, "speaker", 2).front()'], sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1967, sourceColumn: 2, sourceEndLine: 1967};
MERGE (n:KG {id: 'machine:neogeo_base_state.neogeo_memcard'}) SET n:MachineConfig SET n += {cls: 'neogeo_base_state', name: 'neogeo_memcard', calls: [], stateMembers: ['{"name":"m_vblank_level","bits":8}', '{"name":"m_raster_level","bits":8}', '{"name":"m_use_cart_vectors","bits":8}', '{"name":"m_use_cart_audio","bits":8}', '{"name":"m_card_bank","bits":8}', '{"name":"m_bank_base","bits":32}', '{"name":"m_curr_slot","bits":32,"signed":true}', '{"name":"m_recurse","bits":1}', '{"name":"m_display_counter","bits":32}', '{"name":"m_vblank_interrupt_pending","bits":8}', '{"name":"m_display_position_interrupt_pending","bits":8}', '{"name":"m_irq3_pending","bits":8}', '{"name":"m_display_position_interrupt_control","bits":8}', '{"name":"m_screen_shadow","bits":1}', '{"name":"m_palette_bank","bits":32}'], resetHandlers: ['neogeo_base_state.machine_reset'], startHandlers: ['neogeo_base_state.video_start'], devicePatches: ['{"tag":"systemlatch","config":["m_systemlatch->q_out_cb<2>().set(m_memcard, FUNC(ng_memcard_device::lock1_w))","m_systemlatch->q_out_cb<3>().set(m_memcard, FUNC(ng_memcard_device::unlock2_w))","m_systemlatch->q_out_cb<4>().set(m_memcard, FUNC(ng_memcard_device::regsel_w))"]}'], sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1976, sourceColumn: 1, sourceEndLine: 1983};
MERGE (n:KG {id: 'machine:neogeo_base_state.neogeo_memcard/callback:systemlatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_systemlatch->q_out_cb<2>().set(m_memcard, FUNC(ng_memcard_device::lock1_w))', ownerTag: 'systemlatch', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1980, sourceColumn: 2, sourceEndLine: 1980, slot: '2', targetClass: 'ng_memcard_device', targetMethod: 'lock1_w', targetTag: 'memcard'};
MERGE (n:KG {id: 'handler:ng_memcard_device.lock1_w'}) SET n:Handler SET n += {method: 'lock1_w', ownerClass: 'ng_memcard_device', sourceFile: 'src/mame/snk/ng_memcard.cpp', sourceLine: 110, sourceColumn: 1, sourceEndLine: 113, sourceParameters: 'int state', sourceBody: 'm_lock1 = state;'};
MERGE (n:KG {id: 'machine:neogeo_base_state.neogeo_memcard/callback:systemlatch:1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_systemlatch->q_out_cb<3>().set(m_memcard, FUNC(ng_memcard_device::unlock2_w))', ownerTag: 'systemlatch', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1981, sourceColumn: 2, sourceEndLine: 1981, slot: '3', targetClass: 'ng_memcard_device', targetMethod: 'unlock2_w', targetTag: 'memcard'};
MERGE (n:KG {id: 'handler:ng_memcard_device.unlock2_w'}) SET n:Handler SET n += {method: 'unlock2_w', ownerClass: 'ng_memcard_device', sourceFile: 'src/mame/snk/ng_memcard.cpp', sourceLine: 115, sourceColumn: 1, sourceEndLine: 118, sourceParameters: 'int state', sourceBody: 'm_unlock2 = state;'};
MERGE (n:KG {id: 'machine:neogeo_base_state.neogeo_memcard/callback:systemlatch:2'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_systemlatch->q_out_cb<4>().set(m_memcard, FUNC(ng_memcard_device::regsel_w))', ownerTag: 'systemlatch', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1982, sourceColumn: 2, sourceEndLine: 1982, slot: '4', targetClass: 'ng_memcard_device', targetMethod: 'regsel_w', targetTag: 'memcard'};
MERGE (n:KG {id: 'handler:ng_memcard_device.regsel_w'}) SET n:Handler SET n += {method: 'regsel_w', ownerClass: 'ng_memcard_device', sourceFile: 'src/mame/snk/ng_memcard.cpp', sourceLine: 120, sourceColumn: 1, sourceEndLine: 123, sourceParameters: 'int state', sourceBody: 'm_regsel = state;'};
MERGE (n:KG {id: 'device:neogeo_base_state.neogeo_memcard/memcard'}) SET n:Device SET n += {type: 'NG_MEMCARD', tag: 'memcard', clock: 0, config: ['NG_MEMCARD(config, m_memcard)'], cls: 'ng_memcard_device', clsHierarchy: ['ng_memcard_device'], sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1978, sourceColumn: 2, sourceEndLine: 1978};
MERGE (n:KG {id: 'machine:ngarcade_base_state.neogeo_arcade'}) SET n:MachineConfig SET n += {cls: 'ngarcade_base_state', name: 'neogeo_arcade', calls: ['neogeo_base'], stateMembers: ['{"name":"m_vblank_level","bits":8}', '{"name":"m_raster_level","bits":8}', '{"name":"m_use_cart_vectors","bits":8}', '{"name":"m_use_cart_audio","bits":8}', '{"name":"m_card_bank","bits":8}', '{"name":"m_bank_base","bits":32}', '{"name":"m_curr_slot","bits":32,"signed":true}', '{"name":"m_recurse","bits":1}', '{"name":"m_display_counter","bits":32}', '{"name":"m_vblank_interrupt_pending","bits":8}', '{"name":"m_display_position_interrupt_pending","bits":8}', '{"name":"m_irq3_pending","bits":8}', '{"name":"m_display_position_interrupt_control","bits":8}', '{"name":"m_screen_shadow","bits":1}', '{"name":"m_palette_bank","bits":32}', '{"name":"m_save_ram_unlocked","bits":8}'], resetHandlers: ['neogeo_base_state.machine_reset', 'ngarcade_base_state.machine_reset'], startHandlers: ['neogeo_base_state.video_start'], installedHandlers: ['{"space":"AS_PROGRAM","kind":"read","start":3145728,"end":3145729,"mirror":130942,"className":"ngarcade_base_state","method":"in0_edge_joy_r"}', '{"space":"AS_PROGRAM","kind":"read","start":3145728,"end":3145729,"mirror":130942,"className":"ngarcade_base_state","method":"in0_edge_r"}', '{"space":"AS_PROGRAM","kind":"read","start":3407872,"end":3407873,"mirror":131070,"className":"ngarcade_base_state","method":"in1_edge_joy_r"}', '{"space":"AS_PROGRAM","kind":"read","start":3407872,"end":3407873,"mirror":131070,"className":"ngarcade_base_state","method":"in1_edge_r"}', '{"space":"AS_PROGRAM","kind":"read","start":8388608,"end":12582911,"className":"ngarcade_base_state","method":"memcard_r"}', '{"space":"AS_PROGRAM","kind":"write","start":8388608,"end":12582911,"className":"ngarcade_base_state","method":"memcard_w"}'], devicePatches: ['{"tag":"systemlatch","config":["m_systemlatch->q_out_cb<5>().set(FUNC(ngarcade_base_state::set_use_cart_audio))","m_systemlatch->q_out_cb<6>().set(FUNC(ngarcade_base_state::set_save_ram_unlock))"]}'], sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1986, sourceColumn: 1, sourceEndLine: 2000};
MERGE (n:KG {id: 'handler:ngarcade_base_state.in0_edge_joy_r'}) SET n:Handler SET n += {method: 'in0_edge_joy_r', ownerClass: 'ngarcade_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 904, sourceColumn: 1, sourceEndLine: 907, sourceParameters: '', sourceBody: 'return ((m_edge->in0_r() & m_ctrl1->read_ctrl()) << 8) | m_dsw->read();', inputMembers: ['m_dsw=DSW']};
MERGE (n:KG {id: 'handler:ngarcade_base_state.in0_edge_r'}) SET n:Handler SET n += {method: 'in0_edge_r', ownerClass: 'ngarcade_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 899, sourceColumn: 1, sourceEndLine: 902, sourceParameters: '', sourceBody: 'return (m_edge->in0_r() << 8) | m_dsw->read();', inputMembers: ['m_dsw=DSW']};
MERGE (n:KG {id: 'handler:ngarcade_base_state.in1_edge_joy_r'}) SET n:Handler SET n += {method: 'in1_edge_joy_r', ownerClass: 'ngarcade_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 914, sourceColumn: 1, sourceEndLine: 917, sourceParameters: '', sourceBody: 'return ((m_edge->in1_r() & m_ctrl2->read_ctrl()) << 8) | 0xff;'};
MERGE (n:KG {id: 'handler:ngarcade_base_state.in1_edge_r'}) SET n:Handler SET n += {method: 'in1_edge_r', ownerClass: 'ngarcade_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 909, sourceColumn: 1, sourceEndLine: 912, sourceParameters: '', sourceBody: 'return (m_edge->in1_r() << 8) | 0xff;'};
MERGE (n:KG {id: 'handler:ngarcade_base_state.memcard_r'}) SET n:Handler SET n += {method: 'memcard_r', ownerClass: 'ngarcade_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1071, sourceColumn: 1, sourceEndLine: 1081, sourceParameters: 'offs_t offset, uint16_t mem_mask', sourceBody: 'if (!machine().side_effects_disabled())
		m_maincpu->eat_cycles(2); // insert waitstate

	// memory card enabled by /UDS
	if (ACCESSING_BITS_8_15 && m_memcard->present())
		return m_memcard->read((offs_t(m_card_bank) << 21) | offset);
	else
		return 0xffff;'};
MERGE (n:KG {id: 'handler:ngarcade_base_state.memcard_w'}) SET n:Handler SET n += {method: 'memcard_w', ownerClass: 'ngarcade_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1084, sourceColumn: 1, sourceEndLine: 1091, sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: 'm_maincpu->eat_cycles(2); // insert waitstate

	// memory card enabled by /UDS
	if (ACCESSING_BITS_8_15 && m_memcard->present())
		m_memcard->write((offs_t(m_card_bank) << 21) | offset, data);'};
MERGE (n:KG {id: 'machine:ngarcade_base_state.neogeo_arcade/callback:systemlatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_systemlatch->q_out_cb<5>().set(FUNC(ngarcade_base_state::set_use_cart_audio))', ownerTag: 'systemlatch', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1992, sourceColumn: 2, sourceEndLine: 1992, slot: '5', targetClass: 'ngarcade_base_state', targetMethod: 'set_use_cart_audio'};
MERGE (n:KG {id: 'handler:ngarcade_base_state.set_use_cart_audio'}) SET n:Handler SET n += {method: 'set_use_cart_audio', ownerClass: 'ngarcade_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1133, sourceColumn: 1, sourceEndLine: 1138, sourceParameters: 'int state', sourceBody: 'm_use_cart_audio = state;
	m_sprgen->set_fixed_layer_source(state);
	m_bank_audio_main->set_entry(m_use_cart_audio);'};
MERGE (n:KG {id: 'handler:neosprite_base_device.set_fixed_layer_source'}) SET n:Handler SET n += {method: 'set_fixed_layer_source', ownerClass: 'neosprite_base_device', sourceFile: 'src/mame/snk/neogeo_spr.cpp', sourceLine: 168, sourceColumn: 1, sourceEndLine: 171, sourceParameters: 'u8 data', sourceBody: 'm_fixed_layer_source = data;'};
MERGE (n:KG {id: 'machine:ngarcade_base_state.neogeo_arcade/callback:systemlatch:1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_systemlatch->q_out_cb<6>().set(FUNC(ngarcade_base_state::set_save_ram_unlock))', ownerTag: 'systemlatch', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1993, sourceColumn: 2, sourceEndLine: 1993, slot: '6', targetClass: 'ngarcade_base_state', targetMethod: 'set_save_ram_unlock'};
MERGE (n:KG {id: 'handler:ngarcade_base_state.set_save_ram_unlock'}) SET n:Handler SET n += {method: 'set_save_ram_unlock', ownerClass: 'ngarcade_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1043, sourceColumn: 1, sourceEndLine: 1046, sourceParameters: 'int state', sourceBody: 'm_save_ram_unlocked = state;'};
MERGE (n:KG {id: 'device:ngarcade_base_state.neogeo_arcade/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog").set_time(attotime::from_ticks(3244030, NEOGEO_MASTER_CLOCK))'], sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1995, sourceColumn: 2, sourceEndLine: 1995};
MERGE (n:KG {id: 'device:ngarcade_base_state.neogeo_arcade/upd4990a'}) SET n:Device SET n += {type: 'UPD4990A', tag: 'upd4990a', clock: null, config: ['UPD4990A(config, m_upd4990a)'], sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1997, sourceColumn: 2, sourceEndLine: 1997};
MERGE (n:KG {id: 'device:ngarcade_base_state.neogeo_arcade/saveram'}) SET n:Device SET n += {type: 'NVRAM', tag: 'saveram', clock: null, config: ['NVRAM(config, "saveram", nvram_device::DEFAULT_ALL_0)'], sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1999, sourceColumn: 2, sourceEndLine: 1999, clockExpr: 'nvram_device::DEFAULT_ALL_0'};
MERGE (n:KG {id: 'machine:mvs_led_state.mv1_fixed'}) SET n:MachineConfig SET n += {cls: 'mvs_led_state', name: 'mv1_fixed', calls: ['neogeo_arcade', 'neogeo_stereo', 'neogeo_memcard'], stateMembers: ['{"name":"m_vblank_level","bits":8}', '{"name":"m_raster_level","bits":8}', '{"name":"m_use_cart_vectors","bits":8}', '{"name":"m_use_cart_audio","bits":8}', '{"name":"m_card_bank","bits":8}', '{"name":"m_bank_base","bits":32}', '{"name":"m_curr_slot","bits":32,"signed":true}', '{"name":"m_recurse","bits":1}', '{"name":"m_display_counter","bits":32}', '{"name":"m_vblank_interrupt_pending","bits":8}', '{"name":"m_display_position_interrupt_pending","bits":8}', '{"name":"m_irq3_pending","bits":8}', '{"name":"m_display_position_interrupt_control","bits":8}', '{"name":"m_screen_shadow","bits":1}', '{"name":"m_palette_bank","bits":32}', '{"name":"m_save_ram_unlocked","bits":8}', '{"name":"m_output_data","bits":8}', '{"name":"m_output_latch","bits":8}', '{"name":"m_led1_value","bits":8}', '{"name":"m_led2_value","bits":8}'], resetHandlers: ['neogeo_base_state.machine_reset', 'ngarcade_base_state.machine_reset'], startHandlers: ['neogeo_base_state.video_start'], sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2110, sourceColumn: 1, sourceEndLine: 2120};
MERGE (n:KG {id: 'bank:mvs_led_state.mv1_fixed/audio_main/0'}) SET n:MemoryBank SET n += {tag: 'audio_main', member: 'm_bank_audio_main', startEntry: 0, entries: 1, region: 'audiobios', offset: 0, stride: 0, initialEntry: 1, raw: 'm_bank_audio_main->configure_entry(0, (m_region_audiobios != nullptr) ? m_region_audiobios->base() : ROM)', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1313, sourceColumn: 1, sourceEndLine: 1350};
MERGE (n:KG {id: 'bank:mvs_led_state.mv1_fixed/audio_main/1'}) SET n:MemoryBank SET n += {tag: 'audio_main', member: 'm_bank_audio_main', startEntry: 1, entries: 1, region: 'cslot1:audiocpu', offset: 0, stride: 0, initialEntry: 1, raw: 'm_bank_audio_main->configure_entry(1, ROM)', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1313, sourceColumn: 1, sourceEndLine: 1350};
MERGE (n:KG {id: 'bank:mvs_led_state.mv1_fixed/audio_f000'}) SET n:MemoryBank SET n += {tag: 'audio_f000', member: 'audio_f000', startEntry: 0, entries: 256, region: 'cslot1:audiocpu', offset: 65536, stride: 0, dynamicShift: 11, raw: 'm_bank_audio_cart[region]->configure_entry(bank, &ROM[bank_address])', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1313, sourceColumn: 1, sourceEndLine: 1350};
MERGE (n:KG {id: 'bank:mvs_led_state.mv1_fixed/audio_e000'}) SET n:MemoryBank SET n += {tag: 'audio_e000', member: 'audio_e000', startEntry: 0, entries: 256, region: 'cslot1:audiocpu', offset: 65536, stride: 0, dynamicShift: 12, raw: 'm_bank_audio_cart[region]->configure_entry(bank, &ROM[bank_address])', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1313, sourceColumn: 1, sourceEndLine: 1350};
MERGE (n:KG {id: 'bank:mvs_led_state.mv1_fixed/audio_c000'}) SET n:MemoryBank SET n += {tag: 'audio_c000', member: 'audio_c000', startEntry: 0, entries: 256, region: 'cslot1:audiocpu', offset: 65536, stride: 0, dynamicShift: 13, raw: 'm_bank_audio_cart[region]->configure_entry(bank, &ROM[bank_address])', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1313, sourceColumn: 1, sourceEndLine: 1350};
MERGE (n:KG {id: 'bank:mvs_led_state.mv1_fixed/audio_8000'}) SET n:MemoryBank SET n += {tag: 'audio_8000', member: 'audio_8000', startEntry: 0, entries: 256, region: 'cslot1:audiocpu', offset: 65536, stride: 0, dynamicShift: 14, raw: 'm_bank_audio_cart[region]->configure_entry(bank, &ROM[bank_address])', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1313, sourceColumn: 1, sourceEndLine: 1350};
MERGE (n:KG {id: 'device:mvs_led_state.mv1_fixed/edge'}) SET n:Device SET n += {type: 'NEOGEO_CTRL_EDGE_CONNECTOR', tag: 'edge', clock: null, config: ['NEOGEO_CTRL_EDGE_CONNECTOR(config, m_edge, neogeo_arc_edge, "joy", true)'], sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2116, sourceColumn: 2, sourceEndLine: 2116, slotOptions: 'neogeo_arc_edge', slotDefault: 'joy'};
MERGE (n:KG {id: 'device:mvs_led_state.mv1_fixed/ctrl1'}) SET n:Device SET n += {type: 'NEOGEO_CONTROL_PORT', tag: 'ctrl1', clock: null, config: ['NEOGEO_CONTROL_PORT(config, m_ctrl1, neogeo_arc_pin15, nullptr, true)'], sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2118, sourceColumn: 2, sourceEndLine: 2118, clockExpr: 'neogeo_arc_pin15'};
MERGE (n:KG {id: 'device:mvs_led_state.mv1_fixed/ctrl2'}) SET n:Device SET n += {type: 'NEOGEO_CONTROL_PORT', tag: 'ctrl2', clock: null, config: ['NEOGEO_CONTROL_PORT(config, m_ctrl2, neogeo_arc_pin15, nullptr, true)'], sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2119, sourceColumn: 2, sourceEndLine: 2119, clockExpr: 'neogeo_arc_pin15'};
MERGE (n:KG {id: 'machine:mvs_led_state.neobase'}) SET n:MachineConfig SET n += {cls: 'mvs_led_state', name: 'neobase', calls: ['mv1_fixed'], stateMembers: ['{"name":"m_vblank_level","bits":8}', '{"name":"m_raster_level","bits":8}', '{"name":"m_use_cart_vectors","bits":8}', '{"name":"m_use_cart_audio","bits":8}', '{"name":"m_card_bank","bits":8}', '{"name":"m_bank_base","bits":32}', '{"name":"m_curr_slot","bits":32,"signed":true}', '{"name":"m_recurse","bits":1}', '{"name":"m_display_counter","bits":32}', '{"name":"m_vblank_interrupt_pending","bits":8}', '{"name":"m_display_position_interrupt_pending","bits":8}', '{"name":"m_irq3_pending","bits":8}', '{"name":"m_display_position_interrupt_control","bits":8}', '{"name":"m_screen_shadow","bits":1}', '{"name":"m_palette_bank","bits":32}', '{"name":"m_save_ram_unlocked","bits":8}', '{"name":"m_output_data","bits":8}', '{"name":"m_output_latch","bits":8}', '{"name":"m_led1_value","bits":8}', '{"name":"m_led2_value","bits":8}'], resetHandlers: ['neogeo_base_state.machine_reset', 'ngarcade_base_state.machine_reset'], startHandlers: ['neogeo_base_state.video_start'], sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2448, sourceColumn: 1, sourceEndLine: 2452};
MERGE (n:KG {id: 'bank:mvs_led_state.neobase/audio_main/0'}) SET n:MemoryBank SET n += {tag: 'audio_main', member: 'm_bank_audio_main', startEntry: 0, entries: 1, region: 'audiobios', offset: 0, stride: 0, initialEntry: 1, raw: 'm_bank_audio_main->configure_entry(0, (m_region_audiobios != nullptr) ? m_region_audiobios->base() : ROM)', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1313, sourceColumn: 1, sourceEndLine: 1350};
MERGE (n:KG {id: 'bank:mvs_led_state.neobase/audio_main/1'}) SET n:MemoryBank SET n += {tag: 'audio_main', member: 'm_bank_audio_main', startEntry: 1, entries: 1, region: 'cslot1:audiocpu', offset: 0, stride: 0, initialEntry: 1, raw: 'm_bank_audio_main->configure_entry(1, ROM)', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1313, sourceColumn: 1, sourceEndLine: 1350};
MERGE (n:KG {id: 'bank:mvs_led_state.neobase/audio_f000'}) SET n:MemoryBank SET n += {tag: 'audio_f000', member: 'audio_f000', startEntry: 0, entries: 256, region: 'cslot1:audiocpu', offset: 65536, stride: 0, dynamicShift: 11, raw: 'm_bank_audio_cart[region]->configure_entry(bank, &ROM[bank_address])', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1313, sourceColumn: 1, sourceEndLine: 1350};
MERGE (n:KG {id: 'bank:mvs_led_state.neobase/audio_e000'}) SET n:MemoryBank SET n += {tag: 'audio_e000', member: 'audio_e000', startEntry: 0, entries: 256, region: 'cslot1:audiocpu', offset: 65536, stride: 0, dynamicShift: 12, raw: 'm_bank_audio_cart[region]->configure_entry(bank, &ROM[bank_address])', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1313, sourceColumn: 1, sourceEndLine: 1350};
MERGE (n:KG {id: 'bank:mvs_led_state.neobase/audio_c000'}) SET n:MemoryBank SET n += {tag: 'audio_c000', member: 'audio_c000', startEntry: 0, entries: 256, region: 'cslot1:audiocpu', offset: 65536, stride: 0, dynamicShift: 13, raw: 'm_bank_audio_cart[region]->configure_entry(bank, &ROM[bank_address])', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1313, sourceColumn: 1, sourceEndLine: 1350};
MERGE (n:KG {id: 'bank:mvs_led_state.neobase/audio_8000'}) SET n:MemoryBank SET n += {tag: 'audio_8000', member: 'audio_8000', startEntry: 0, entries: 256, region: 'cslot1:audiocpu', offset: 65536, stride: 0, dynamicShift: 14, raw: 'm_bank_audio_cart[region]->configure_entry(bank, &ROM[bank_address])', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1313, sourceColumn: 1, sourceEndLine: 1350};
MERGE (n:KG {id: 'inputs:neogeo'}) SET n:InputPorts SET n += {name: 'neogeo', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1813, sourceColumn: 1, sourceEndLine: 1813};
MERGE (n:KG {id: 'inputs:neogeo/DSW'}) SET n:Port SET n += {tag: 'DSW', modify: false};
MERGE (n:KG {id: 'inputs:neogeo/DSW/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, modifiers: ['PORT_DIPLOCATION("SW:1")'], name: 'Setting Mode', defaultValue: 1, location: 'SW:1', settings: ['1=Off', '0=On']};
MERGE (n:KG {id: 'inputs:neogeo/DSW/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, modifiers: ['PORT_DIPLOCATION("SW:2")'], name: 'Cabinet', defaultValue: 2, location: 'SW:2', settings: ['2=Normal', '0=VS Mode']};
MERGE (n:KG {id: 'inputs:neogeo/DSW/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 4, modifiers: ['PORT_DIPLOCATION("SW:3")'], name: 'Controller', defaultValue: 4, location: 'SW:3', settings: ['4=Joystick', '0=Mahjong Panel']};
MERGE (n:KG {id: 'inputs:neogeo/DSW/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 24, modifiers: ['PORT_DIPLOCATION("SW:4,5")'], name: 'COMM Setting (Cabinet No.)', defaultValue: 24, location: 'SW:4,5', settings: ['24=1', '16=2', '8=3', '0=4']};
MERGE (n:KG {id: 'inputs:neogeo/DSW/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 32, modifiers: ['PORT_DIPLOCATION("SW:6")'], name: 'COMM Setting (Link Enable)', defaultValue: 32, location: 'SW:6', settings: ['32=Off', '0=On']};
MERGE (n:KG {id: 'inputs:neogeo/DSW/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 64, modifiers: ['PORT_DIPLOCATION("SW:7")'], name: 'Free Play', defaultValue: 64, location: 'SW:7', settings: ['64=Off', '0=On']};
MERGE (n:KG {id: 'inputs:neogeo/DSW/f6'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("SW:8")'], name: 'Freeze', defaultValue: 128, location: 'SW:8', settings: ['128=Off', '0=On']};
MERGE (n:KG {id: 'inputs:neogeo/SYSTEM'}) SET n:Port SET n += {tag: 'SYSTEM', modify: false};
MERGE (n:KG {id: 'inputs:neogeo/SYSTEM/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: true, type: 'IPT_UNUSED', defaultValue: 255};
MERGE (n:KG {id: 'inputs:neogeo/SYSTEM/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 3840, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_CUSTOM_MEMBER(FUNC(ngarcade_base_state::startsel_edge_joy_r))'], defaultValue: 0};
MERGE (n:KG {id: 'handler:ngarcade_base_state.startsel_edge_joy_r'}) SET n:Handler SET n += {method: 'startsel_edge_joy_r', ownerClass: 'ngarcade_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 919, sourceColumn: 1, sourceEndLine: 927, sourceParameters: '', sourceBody: 'uint32_t ret = m_edge->read_start_sel() | ~0x05;
	if (m_ctrl1)
		ret &= (m_ctrl1->read_start_sel() << 0) | ~0x03;
	if (m_ctrl2)
		ret &= (m_ctrl2->read_start_sel() << 2) | ~0x0c;
	return ret;'};
MERGE (n:KG {id: 'inputs:neogeo/SYSTEM/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 28672, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_CUSTOM_MEMBER(FUNC(neogeo_base_state::get_memcard_status))'], defaultValue: 0};
MERGE (n:KG {id: 'handler:neogeo_base_state.get_memcard_status'}) SET n:Handler SET n += {method: 'get_memcard_status', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1063, sourceColumn: 1, sourceEndLine: 1068, sourceParameters: '', sourceBody: '// D0 and D1 are memcard 1 and 2 presence indicators, D2 indicates memcard
	// write protect status (we are always write enabled)
	return (!m_memcard || !m_memcard->present()) ? 0x07 : 0x00;'};
MERGE (n:KG {id: 'inputs:neogeo/SYSTEM/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 32768, activeLow: true, type: 'IPT_CUSTOM', defaultValue: 32768};
MERGE (n:KG {id: 'inputs:neogeo/AUDIO_COIN'}) SET n:Port SET n += {tag: 'AUDIO_COIN', modify: false};
MERGE (n:KG {id: 'inputs:neogeo/AUDIO_COIN/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_COIN1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:neogeo/AUDIO_COIN/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_COIN2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:neogeo/AUDIO_COIN/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_SERVICE1', defaultValue: 4};
MERGE (n:KG {id: 'inputs:neogeo/AUDIO_COIN/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 24, activeLow: true, type: 'IPT_UNUSED', defaultValue: 24};
MERGE (n:KG {id: 'inputs:neogeo/AUDIO_COIN/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_CUSTOM', defaultValue: 0};
MERGE (n:KG {id: 'inputs:neogeo/AUDIO_COIN/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("upd4990a", FUNC(upd1990a_device::tp_r))'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:neogeo/AUDIO_COIN/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("upd4990a", FUNC(upd1990a_device::data_out_r))'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:neogeo/AUDIO_COIN/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 65280, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_CUSTOM_MEMBER(FUNC(neogeo_base_state::get_audio_result))'], defaultValue: 0};
MERGE (n:KG {id: 'handler:neogeo_base_state.get_audio_result'}) SET n:Handler SET n += {method: 'get_audio_result', ownerClass: 'neogeo_base_state', sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1100, sourceColumn: 1, sourceEndLine: 1103, sourceParameters: '', sourceBody: 'return m_soundlatch2->read();'};
MERGE (n:KG {id: 'inputs:neogeo/TEST'}) SET n:Port SET n += {tag: 'TEST', modify: false};
MERGE (n:KG {id: 'inputs:neogeo/TEST/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 63, activeLow: false, type: 'IPT_UNUSED', defaultValue: 0};
MERGE (n:KG {id: 'inputs:neogeo/TEST/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_CUSTOM', defaultValue: 0};
MERGE (n:KG {id: 'inputs:neogeo/TEST/f2'}) SET n:PortField SET n += {kind: 'service', mask: 128, activeLow: true, defaultValue: 128};
MERGE (n:KG {id: 'inputs:neogeo/TEST/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 65280, activeLow: true, type: 'IPT_UNUSED', defaultValue: 65280};
MERGE (n:KG {id: 'file:src/devices/bus/neogeo_ctrl/joystick.cpp'}) SET n:SourceFile SET n += {path: 'src/devices/bus/neogeo_ctrl/joystick.cpp'};
MERGE (n:KG {id: 'inputs:neogeo_joy_ac'}) SET n:InputPorts SET n += {name: 'neogeo_joy_ac'};
MERGE (n:KG {id: 'inputs:neogeo_joy_ac/JOY1'}) SET n:Port SET n += {tag: 'JOY1', modify: false};
MERGE (n:KG {id: 'inputs:neogeo_joy_ac/JOY1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_PLAYER(1)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:neogeo_joy_ac/JOY1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_PLAYER(1)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:neogeo_joy_ac/JOY1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_PLAYER(1)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:neogeo_joy_ac/JOY1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_PLAYER(1)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:neogeo_joy_ac/JOY1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(1)', 'PORT_NAME("%p A")'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:neogeo_joy_ac/JOY1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(1)', 'PORT_NAME("%p B")'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:neogeo_joy_ac/JOY1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_PLAYER(1)', 'PORT_NAME("%p C")'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:neogeo_joy_ac/JOY1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_BUTTON4', modifiers: ['PORT_PLAYER(1)', 'PORT_NAME("%p D")'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:neogeo_joy_ac/JOY2'}) SET n:Port SET n += {tag: 'JOY2', modify: false};
MERGE (n:KG {id: 'inputs:neogeo_joy_ac/JOY2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_PLAYER(2)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:neogeo_joy_ac/JOY2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_PLAYER(2)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:neogeo_joy_ac/JOY2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_PLAYER(2)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:neogeo_joy_ac/JOY2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_PLAYER(2)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:neogeo_joy_ac/JOY2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(2)', 'PORT_NAME("%p A")'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:neogeo_joy_ac/JOY2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(2)', 'PORT_NAME("%p B")'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:neogeo_joy_ac/JOY2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_PLAYER(2)', 'PORT_NAME("%p C")'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:neogeo_joy_ac/JOY2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_BUTTON4', modifiers: ['PORT_PLAYER(2)', 'PORT_NAME("%p D")'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:neogeo_joy_ac/START'}) SET n:Port SET n += {tag: 'START', modify: false};
MERGE (n:KG {id: 'inputs:neogeo_joy_ac/START/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 250, activeLow: true, type: 'IPT_UNUSED', defaultValue: 250};
MERGE (n:KG {id: 'inputs:neogeo_joy_ac/START/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_START1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:neogeo_joy_ac/START/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_START2', defaultValue: 4};
MATCH (a:KG {id: 'game:mslug'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 12139, sourceColumn: 1, sourceEndLine: 12139};
MATCH (a:KG {id: 'game:mslug'}), (b:KG {id: 'game:neogeo'}) MERGE (a)-[r:CLONE_OF]->(b);
MATCH (a:KG {id: 'game:mslug'}), (b:KG {id: 'machine:mvs_led_state.neobase'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:mslug'}), (b:KG {id: 'inputs:neogeo'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:mslug'}), (b:KG {id: 'romset:mslug'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/snk/neogeo.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/snk/neogeo.cpp'}), (b:KG {id: 'file:neogeo.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/snk/neogeo.cpp'}), (b:KG {id: 'file:machine/nvram.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/snk/neogeo.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/snk/neogeo.cpp'}), (b:KG {id: 'file:softlist_dev.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/snk/neogeo.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/snk/neogeo.cpp'}), (b:KG {id: 'file:irrmaze.lh'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/snk/neogeo.cpp'}), (b:KG {id: 'file:neogeo.lh'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/snk/neogeo.cpp'}), (b:KG {id: 'file:logmacro.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'game:neogeo'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2428, sourceColumn: 1, sourceEndLine: 2428};
MATCH (a:KG {id: 'game:neogeo'}), (b:KG {id: 'romset:neogeo'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'machine:mvs_led_state.neobase'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2448, sourceColumn: 1, sourceEndLine: 2452};
MATCH (a:KG {id: 'machine:mvs_led_state.neobase'}), (b:KG {id: 'handler:neogeo_base_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mvs_led_state.neobase'}), (b:KG {id: 'handler:ngarcade_base_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mvs_led_state.neobase'}), (b:KG {id: 'handler:neogeo_base_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mvs_led_state.neobase'}), (b:KG {id: 'machine:mvs_led_state.mv1_fixed'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:mvs_led_state.neobase'}), (b:KG {id: 'bank:mvs_led_state.neobase/audio_main/0'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:mvs_led_state.neobase'}), (b:KG {id: 'bank:mvs_led_state.neobase/audio_main/1'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:mvs_led_state.neobase'}), (b:KG {id: 'bank:mvs_led_state.neobase/audio_f000'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:mvs_led_state.neobase'}), (b:KG {id: 'bank:mvs_led_state.neobase/audio_e000'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:mvs_led_state.neobase'}), (b:KG {id: 'bank:mvs_led_state.neobase/audio_c000'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:mvs_led_state.neobase'}), (b:KG {id: 'bank:mvs_led_state.neobase/audio_8000'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'inputs:neogeo'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1813, sourceColumn: 1, sourceEndLine: 1813};
MATCH (a:KG {id: 'inputs:neogeo'}), (b:KG {id: 'inputs:neogeo/DSW'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:neogeo'}), (b:KG {id: 'inputs:neogeo/SYSTEM'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:neogeo'}), (b:KG {id: 'inputs:neogeo/AUDIO_COIN'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:neogeo'}), (b:KG {id: 'inputs:neogeo/TEST'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:mslug'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 6886, sourceColumn: 1, sourceEndLine: 6886};
MATCH (a:KG {id: 'romset:mslug'}), (b:KG {id: 'region:mslug/cslot1:maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mslug'}), (b:KG {id: 'region:mslug/cslot1:fixed'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mslug'}), (b:KG {id: 'region:mslug/fixedbios'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mslug'}), (b:KG {id: 'region:mslug/spritegen:zoomy'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mslug'}), (b:KG {id: 'region:mslug/mainbios'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mslug'}), (b:KG {id: 'region:mslug/audiobios'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mslug'}), (b:KG {id: 'region:mslug/cslot1:audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mslug'}), (b:KG {id: 'region:mslug/cslot1:ymsnd:adpcma'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mslug'}), (b:KG {id: 'region:mslug/cslot1:sprites'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:neogeo'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2375, sourceColumn: 1, sourceEndLine: 2375};
MATCH (a:KG {id: 'romset:neogeo'}), (b:KG {id: 'region:neogeo/mainbios'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:neogeo'}), (b:KG {id: 'region:neogeo/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:neogeo'}), (b:KG {id: 'region:neogeo/audiobios'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:neogeo'}), (b:KG {id: 'region:neogeo/audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:neogeo'}), (b:KG {id: 'region:neogeo/spritegen:zoomy'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:neogeo'}), (b:KG {id: 'region:neogeo/fixed'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:neogeo'}), (b:KG {id: 'region:neogeo/fixedbios'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:neogeo'}), (b:KG {id: 'region:neogeo/sprites'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.machine_reset'}), (b:KG {id: 'handler:neogeo_base_state.start_interrupt_timers'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.machine_reset'}), (b:KG {id: 'handler:neogeo_base_state.update_interrupts'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:ngarcade_base_state.machine_reset'}), (b:KG {id: 'handler:neogeo_base_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.video_start'}), (b:KG {id: 'handler:neogeo_base_state.create_rgb_lookups'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.video_start'}), (b:KG {id: 'handler:neogeo_base_state.set_pens'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mvs_led_state.mv1_fixed'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 2110, sourceColumn: 1, sourceEndLine: 2120};
MATCH (a:KG {id: 'machine:mvs_led_state.mv1_fixed'}), (b:KG {id: 'handler:neogeo_base_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mvs_led_state.mv1_fixed'}), (b:KG {id: 'handler:ngarcade_base_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mvs_led_state.mv1_fixed'}), (b:KG {id: 'handler:neogeo_base_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mvs_led_state.mv1_fixed'}), (b:KG {id: 'machine:ngarcade_base_state.neogeo_arcade'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:mvs_led_state.mv1_fixed'}), (b:KG {id: 'machine:neogeo_base_state.neogeo_stereo'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:mvs_led_state.mv1_fixed'}), (b:KG {id: 'machine:neogeo_base_state.neogeo_memcard'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:mvs_led_state.mv1_fixed'}), (b:KG {id: 'bank:mvs_led_state.mv1_fixed/audio_main/0'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:mvs_led_state.mv1_fixed'}), (b:KG {id: 'bank:mvs_led_state.mv1_fixed/audio_main/1'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:mvs_led_state.mv1_fixed'}), (b:KG {id: 'bank:mvs_led_state.mv1_fixed/audio_f000'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:mvs_led_state.mv1_fixed'}), (b:KG {id: 'bank:mvs_led_state.mv1_fixed/audio_e000'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:mvs_led_state.mv1_fixed'}), (b:KG {id: 'bank:mvs_led_state.mv1_fixed/audio_c000'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:mvs_led_state.mv1_fixed'}), (b:KG {id: 'bank:mvs_led_state.mv1_fixed/audio_8000'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:mvs_led_state.mv1_fixed'}), (b:KG {id: 'device:mvs_led_state.mv1_fixed/edge'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mvs_led_state.mv1_fixed'}), (b:KG {id: 'device:mvs_led_state.mv1_fixed/ctrl1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mvs_led_state.mv1_fixed'}), (b:KG {id: 'device:mvs_led_state.mv1_fixed/ctrl2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'bank:mvs_led_state.neobase/audio_main/0'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1313, sourceColumn: 1, sourceEndLine: 1350};
MATCH (a:KG {id: 'bank:mvs_led_state.neobase/audio_main/1'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1313, sourceColumn: 1, sourceEndLine: 1350};
MATCH (a:KG {id: 'bank:mvs_led_state.neobase/audio_f000'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1313, sourceColumn: 1, sourceEndLine: 1350};
MATCH (a:KG {id: 'bank:mvs_led_state.neobase/audio_e000'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1313, sourceColumn: 1, sourceEndLine: 1350};
MATCH (a:KG {id: 'bank:mvs_led_state.neobase/audio_c000'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1313, sourceColumn: 1, sourceEndLine: 1350};
MATCH (a:KG {id: 'bank:mvs_led_state.neobase/audio_8000'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1313, sourceColumn: 1, sourceEndLine: 1350};
MATCH (a:KG {id: 'inputs:neogeo/DSW'}), (b:KG {id: 'inputs:neogeo/DSW/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo/DSW'}), (b:KG {id: 'inputs:neogeo/DSW/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo/DSW'}), (b:KG {id: 'inputs:neogeo/DSW/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo/DSW'}), (b:KG {id: 'inputs:neogeo/DSW/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo/DSW'}), (b:KG {id: 'inputs:neogeo/DSW/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo/DSW'}), (b:KG {id: 'inputs:neogeo/DSW/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo/DSW'}), (b:KG {id: 'inputs:neogeo/DSW/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo/SYSTEM'}), (b:KG {id: 'inputs:neogeo/SYSTEM/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo/SYSTEM'}), (b:KG {id: 'inputs:neogeo/SYSTEM/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo/SYSTEM'}), (b:KG {id: 'inputs:neogeo/SYSTEM/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo/SYSTEM'}), (b:KG {id: 'inputs:neogeo/SYSTEM/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo/AUDIO_COIN'}), (b:KG {id: 'inputs:neogeo/AUDIO_COIN/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo/AUDIO_COIN'}), (b:KG {id: 'inputs:neogeo/AUDIO_COIN/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo/AUDIO_COIN'}), (b:KG {id: 'inputs:neogeo/AUDIO_COIN/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo/AUDIO_COIN'}), (b:KG {id: 'inputs:neogeo/AUDIO_COIN/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo/AUDIO_COIN'}), (b:KG {id: 'inputs:neogeo/AUDIO_COIN/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo/AUDIO_COIN'}), (b:KG {id: 'inputs:neogeo/AUDIO_COIN/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo/AUDIO_COIN'}), (b:KG {id: 'inputs:neogeo/AUDIO_COIN/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo/AUDIO_COIN'}), (b:KG {id: 'inputs:neogeo/AUDIO_COIN/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo/TEST'}), (b:KG {id: 'inputs:neogeo/TEST/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo/TEST'}), (b:KG {id: 'inputs:neogeo/TEST/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo/TEST'}), (b:KG {id: 'inputs:neogeo/TEST/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo/TEST'}), (b:KG {id: 'inputs:neogeo/TEST/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:mslug/cslot1:maincpu'}), (b:KG {id: 'rom:mslug/cslot1:maincpu/201-p1.p1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mslug/cslot1:fixed'}), (b:KG {id: 'rom:mslug/cslot1:fixed/201-s1.s1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mslug/fixedbios'}), (b:KG {id: 'rom:mslug/fixedbios/sfix.sfix'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mslug/spritegen:zoomy'}), (b:KG {id: 'rom:mslug/spritegen:zoomy/000-lo.lo'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mslug/mainbios'}), (b:KG {id: 'rom:mslug/mainbios/sp-s2.sp1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mslug/audiobios'}), (b:KG {id: 'rom:mslug/audiobios/sm1.sm1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mslug/cslot1:audiocpu'}), (b:KG {id: 'rom:mslug/cslot1:audiocpu/201-m1.m1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mslug/cslot1:ymsnd:adpcma'}), (b:KG {id: 'rom:mslug/cslot1:ymsnd:adpcma/201-v1.v1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mslug/cslot1:ymsnd:adpcma'}), (b:KG {id: 'rom:mslug/cslot1:ymsnd:adpcma/201-v2.v2'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mslug/cslot1:sprites'}), (b:KG {id: 'rom:mslug/cslot1:sprites/201-c1.c1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mslug/cslot1:sprites'}), (b:KG {id: 'rom:mslug/cslot1:sprites/201-c2.c2'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mslug/cslot1:sprites'}), (b:KG {id: 'rom:mslug/cslot1:sprites/201-c3.c3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mslug/cslot1:sprites'}), (b:KG {id: 'rom:mslug/cslot1:sprites/201-c4.c4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:neogeo/mainbios'}), (b:KG {id: 'rom:neogeo/mainbios/sp-s2.sp1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:neogeo/audiobios'}), (b:KG {id: 'rom:neogeo/audiobios/sm1.sm1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:neogeo/audiocpu'}), (b:KG {id: 'rom:neogeo/audiocpu/sm1.sm1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:neogeo/spritegen:zoomy'}), (b:KG {id: 'rom:neogeo/spritegen:zoomy/000-lo.lo'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:neogeo/fixedbios'}), (b:KG {id: 'rom:neogeo/fixedbios/sfix.sfix'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'machine:ngarcade_base_state.neogeo_arcade'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1986, sourceColumn: 1, sourceEndLine: 2000};
MATCH (a:KG {id: 'machine:ngarcade_base_state.neogeo_arcade'}), (b:KG {id: 'handler:neogeo_base_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:ngarcade_base_state.neogeo_arcade'}), (b:KG {id: 'handler:ngarcade_base_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:ngarcade_base_state.neogeo_arcade'}), (b:KG {id: 'handler:neogeo_base_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:ngarcade_base_state.neogeo_arcade'}), (b:KG {id: 'handler:ngarcade_base_state.in0_edge_joy_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:ngarcade_base_state.neogeo_arcade'}), (b:KG {id: 'handler:ngarcade_base_state.in0_edge_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:ngarcade_base_state.neogeo_arcade'}), (b:KG {id: 'handler:ngarcade_base_state.in1_edge_joy_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:ngarcade_base_state.neogeo_arcade'}), (b:KG {id: 'handler:ngarcade_base_state.in1_edge_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:ngarcade_base_state.neogeo_arcade'}), (b:KG {id: 'handler:ngarcade_base_state.memcard_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:ngarcade_base_state.neogeo_arcade'}), (b:KG {id: 'handler:ngarcade_base_state.memcard_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:ngarcade_base_state.neogeo_arcade'}), (b:KG {id: 'machine:neogeo_base_state.neogeo_base'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:ngarcade_base_state.neogeo_arcade'}), (b:KG {id: 'map:ngarcade_base_state.neogeo_main_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:ngarcade_base_state.neogeo_arcade'}), (b:KG {id: 'machine:ngarcade_base_state.neogeo_arcade/callback:systemlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:ngarcade_base_state.neogeo_arcade'}), (b:KG {id: 'machine:ngarcade_base_state.neogeo_arcade/callback:systemlatch:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:ngarcade_base_state.neogeo_arcade'}), (b:KG {id: 'device:ngarcade_base_state.neogeo_arcade/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:ngarcade_base_state.neogeo_arcade'}), (b:KG {id: 'device:ngarcade_base_state.neogeo_arcade/upd4990a'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:ngarcade_base_state.neogeo_arcade'}), (b:KG {id: 'device:ngarcade_base_state.neogeo_arcade/saveram'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_stereo'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1965, sourceColumn: 1, sourceEndLine: 1973};
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_stereo'}), (b:KG {id: 'handler:neogeo_base_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_stereo'}), (b:KG {id: 'handler:neogeo_base_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_stereo'}), (b:KG {id: 'device:neogeo_base_state.neogeo_stereo/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_memcard'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1976, sourceColumn: 1, sourceEndLine: 1983};
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_memcard'}), (b:KG {id: 'handler:neogeo_base_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_memcard'}), (b:KG {id: 'handler:neogeo_base_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_memcard'}), (b:KG {id: 'machine:neogeo_base_state.neogeo_memcard/callback:systemlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_memcard'}), (b:KG {id: 'machine:neogeo_base_state.neogeo_memcard/callback:systemlatch:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_memcard'}), (b:KG {id: 'machine:neogeo_base_state.neogeo_memcard/callback:systemlatch:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_memcard'}), (b:KG {id: 'device:neogeo_base_state.neogeo_memcard/memcard'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'bank:mvs_led_state.mv1_fixed/audio_main/0'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1313, sourceColumn: 1, sourceEndLine: 1350};
MATCH (a:KG {id: 'bank:mvs_led_state.mv1_fixed/audio_main/1'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1313, sourceColumn: 1, sourceEndLine: 1350};
MATCH (a:KG {id: 'bank:mvs_led_state.mv1_fixed/audio_f000'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1313, sourceColumn: 1, sourceEndLine: 1350};
MATCH (a:KG {id: 'bank:mvs_led_state.mv1_fixed/audio_e000'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1313, sourceColumn: 1, sourceEndLine: 1350};
MATCH (a:KG {id: 'bank:mvs_led_state.mv1_fixed/audio_c000'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1313, sourceColumn: 1, sourceEndLine: 1350};
MATCH (a:KG {id: 'bank:mvs_led_state.mv1_fixed/audio_8000'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1313, sourceColumn: 1, sourceEndLine: 1350};
MATCH (a:KG {id: 'device:mvs_led_state.mv1_fixed/edge'}), (b:KG {id: 'inputs:neogeo_joy_ac'}) MERGE (a)-[r:USES_INPUTS]->(b) SET r += {option: 'joy'};
MATCH (a:KG {id: 'inputs:neogeo/SYSTEM/f1'}), (b:KG {id: 'handler:ngarcade_base_state.startsel_edge_joy_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:neogeo/SYSTEM/f2'}), (b:KG {id: 'handler:neogeo_base_state.get_memcard_status'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:neogeo/AUDIO_COIN/f7'}), (b:KG {id: 'handler:neogeo_base_state.get_audio_result'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:ngarcade_base_state.in0_edge_joy_r'}), (b:KG {id: 'handler:ng_memcard_device.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:ngarcade_base_state.in0_edge_r'}), (b:KG {id: 'handler:ng_memcard_device.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:ngarcade_base_state.memcard_r'}), (b:KG {id: 'handler:ng_memcard_device.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:ngarcade_base_state.memcard_r'}), (b:KG {id: 'handler:ng_memcard_device.present'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:ngarcade_base_state.memcard_w'}), (b:KG {id: 'handler:ng_memcard_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:ngarcade_base_state.memcard_w'}), (b:KG {id: 'handler:ng_memcard_device.present'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_base'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1921, sourceColumn: 1, sourceEndLine: 1962};
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_base'}), (b:KG {id: 'handler:neogeo_base_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_base'}), (b:KG {id: 'handler:neogeo_base_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_base'}), (b:KG {id: 'device:neogeo_base_state.neogeo_base/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_base'}), (b:KG {id: 'device:neogeo_base_state.neogeo_base/audiocpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_base'}), (b:KG {id: 'device:neogeo_base_state.neogeo_base/systemlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_base'}), (b:KG {id: 'device:neogeo_base_state.neogeo_base/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_base'}), (b:KG {id: 'device:neogeo_base_state.neogeo_base/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_base'}), (b:KG {id: 'device:neogeo_base_state.neogeo_base/spritegen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_base'}), (b:KG {id: 'device:neogeo_base_state.neogeo_base/audionmi'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_base'}), (b:KG {id: 'device:neogeo_base_state.neogeo_base/soundlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_base'}), (b:KG {id: 'device:neogeo_base_state.neogeo_base/soundlatch2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_base'}), (b:KG {id: 'device:neogeo_base_state.neogeo_base/ymsnd'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:ngarcade_base_state.neogeo_main_map'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1722, sourceColumn: 1, sourceEndLine: 1737};
MATCH (a:KG {id: 'map:ngarcade_base_state.neogeo_main_map'}), (b:KG {id: 'map:neogeo_base_state.base_main_map'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:ngarcade_base_state.neogeo_main_map'}), (b:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ngarcade_base_state.neogeo_main_map'}), (b:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ngarcade_base_state.neogeo_main_map'}), (b:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ngarcade_base_state.neogeo_main_map'}), (b:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ngarcade_base_state.neogeo_main_map'}), (b:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ngarcade_base_state.neogeo_main_map'}), (b:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ngarcade_base_state.neogeo_main_map'}), (b:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ngarcade_base_state.neogeo_main_map'}), (b:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ngarcade_base_state.neogeo_main_map'}), (b:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ngarcade_base_state.neogeo_main_map'}), (b:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'machine:ngarcade_base_state.neogeo_arcade/callback:systemlatch:0'}), (b:KG {id: 'handler:ngarcade_base_state.set_use_cart_audio'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:ngarcade_base_state.neogeo_arcade/callback:systemlatch:1'}), (b:KG {id: 'handler:ngarcade_base_state.set_save_ram_unlock'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_memcard/callback:systemlatch:0'}), (b:KG {id: 'handler:ng_memcard_device.lock1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_memcard/callback:systemlatch:1'}), (b:KG {id: 'handler:ng_memcard_device.unlock2_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:neogeo_base_state.neogeo_memcard/callback:systemlatch:2'}), (b:KG {id: 'handler:ng_memcard_device.regsel_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:neogeo_joy_ac'}), (b:KG {id: 'file:src/devices/bus/neogeo_ctrl/joystick.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'inputs:neogeo_joy_ac'}), (b:KG {id: 'inputs:neogeo_joy_ac/JOY1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:neogeo_joy_ac'}), (b:KG {id: 'inputs:neogeo_joy_ac/JOY2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:neogeo_joy_ac'}), (b:KG {id: 'inputs:neogeo_joy_ac/START'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.get_memcard_status'}), (b:KG {id: 'handler:ng_memcard_device.present'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.get_audio_result'}), (b:KG {id: 'handler:ng_memcard_device.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:neogeo_base_state.neogeo_base/audiocpu'}), (b:KG {id: 'map:neogeo_base_state.audio_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:neogeo_base_state.neogeo_base/audiocpu'}), (b:KG {id: 'map:neogeo_base_state.audio_io_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:neogeo_base_state.neogeo_base/systemlatch'}), (b:KG {id: 'device:neogeo_base_state.neogeo_base/systemlatch/callback:systemlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:neogeo_base_state.neogeo_base/systemlatch'}), (b:KG {id: 'device:neogeo_base_state.neogeo_base/systemlatch/callback:systemlatch:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:neogeo_base_state.neogeo_base/systemlatch'}), (b:KG {id: 'device:neogeo_base_state.neogeo_base/systemlatch/callback:systemlatch:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:neogeo_base_state.neogeo_base/screen'}), (b:KG {id: 'device:neogeo_base_state.neogeo_base/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:neogeo_base_state.neogeo_base/audionmi'}), (b:KG {id: 'device:neogeo_base_state.neogeo_base/audionmi/callback:audionmi:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:neogeo_base_state.neogeo_base/soundlatch'}), (b:KG {id: 'device:neogeo_base_state.neogeo_base/soundlatch/callback:soundlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:neogeo_base_state.neogeo_base/ymsnd'}), (b:KG {id: 'device:neogeo_base_state.neogeo_base/ymsnd/callback:ymsnd:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.base_main_map'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1709, sourceColumn: 1, sourceEndLine: 1720};
MATCH (a:KG {id: 'map:neogeo_base_state.base_main_map'}), (b:KG {id: 'map:neogeo_base_state.base_main_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.base_main_map'}), (b:KG {id: 'map:neogeo_base_state.base_main_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.base_main_map'}), (b:KG {id: 'map:neogeo_base_state.base_main_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.base_main_map'}), (b:KG {id: 'map:neogeo_base_state.base_main_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.base_main_map'}), (b:KG {id: 'map:neogeo_base_state.base_main_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.base_main_map'}), (b:KG {id: 'map:neogeo_base_state.base_main_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.base_main_map'}), (b:KG {id: 'map:neogeo_base_state.base_main_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.base_main_map'}), (b:KG {id: 'map:neogeo_base_state.base_main_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.base_main_map'}), (b:KG {id: 'map:neogeo_base_state.base_main_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range0'}), (b:KG {id: 'handler:ngarcade_base_state.banked_vectors_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range2'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range6'}), (b:KG {id: 'handler:ngarcade_base_state.unmapped_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range8'}), (b:KG {id: 'handler:ngarcade_base_state.save_ram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:ngarcade_base_state.neogeo_main_map/range9'}), (b:KG {id: 'handler:ngarcade_base_state.unmapped_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'handler:ngarcade_base_state.set_use_cart_audio'}), (b:KG {id: 'handler:neosprite_base_device.set_fixed_layer_source'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:neogeo_joy_ac/JOY1'}), (b:KG {id: 'inputs:neogeo_joy_ac/JOY1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo_joy_ac/JOY1'}), (b:KG {id: 'inputs:neogeo_joy_ac/JOY1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo_joy_ac/JOY1'}), (b:KG {id: 'inputs:neogeo_joy_ac/JOY1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo_joy_ac/JOY1'}), (b:KG {id: 'inputs:neogeo_joy_ac/JOY1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo_joy_ac/JOY1'}), (b:KG {id: 'inputs:neogeo_joy_ac/JOY1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo_joy_ac/JOY1'}), (b:KG {id: 'inputs:neogeo_joy_ac/JOY1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo_joy_ac/JOY1'}), (b:KG {id: 'inputs:neogeo_joy_ac/JOY1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo_joy_ac/JOY1'}), (b:KG {id: 'inputs:neogeo_joy_ac/JOY1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo_joy_ac/JOY2'}), (b:KG {id: 'inputs:neogeo_joy_ac/JOY2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo_joy_ac/JOY2'}), (b:KG {id: 'inputs:neogeo_joy_ac/JOY2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo_joy_ac/JOY2'}), (b:KG {id: 'inputs:neogeo_joy_ac/JOY2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo_joy_ac/JOY2'}), (b:KG {id: 'inputs:neogeo_joy_ac/JOY2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo_joy_ac/JOY2'}), (b:KG {id: 'inputs:neogeo_joy_ac/JOY2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo_joy_ac/JOY2'}), (b:KG {id: 'inputs:neogeo_joy_ac/JOY2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo_joy_ac/JOY2'}), (b:KG {id: 'inputs:neogeo_joy_ac/JOY2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo_joy_ac/JOY2'}), (b:KG {id: 'inputs:neogeo_joy_ac/JOY2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo_joy_ac/START'}), (b:KG {id: 'inputs:neogeo_joy_ac/START/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo_joy_ac/START'}), (b:KG {id: 'inputs:neogeo_joy_ac/START/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:neogeo_joy_ac/START'}), (b:KG {id: 'inputs:neogeo_joy_ac/START/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.audio_map'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1777, sourceColumn: 1, sourceEndLine: 1785};
MATCH (a:KG {id: 'map:neogeo_base_state.audio_map'}), (b:KG {id: 'map:neogeo_base_state.audio_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.audio_map'}), (b:KG {id: 'map:neogeo_base_state.audio_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.audio_map'}), (b:KG {id: 'map:neogeo_base_state.audio_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.audio_map'}), (b:KG {id: 'map:neogeo_base_state.audio_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.audio_map'}), (b:KG {id: 'map:neogeo_base_state.audio_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.audio_map'}), (b:KG {id: 'map:neogeo_base_state.audio_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.audio_io_map'}), (b:KG {id: 'file:src/mame/snk/neogeo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/snk/neogeo.cpp', sourceLine: 1795, sourceColumn: 1, sourceEndLine: 1802};
MATCH (a:KG {id: 'map:neogeo_base_state.audio_io_map'}), (b:KG {id: 'map:neogeo_base_state.audio_io_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.audio_io_map'}), (b:KG {id: 'map:neogeo_base_state.audio_io_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.audio_io_map'}), (b:KG {id: 'map:neogeo_base_state.audio_io_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.audio_io_map'}), (b:KG {id: 'map:neogeo_base_state.audio_io_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.audio_io_map'}), (b:KG {id: 'map:neogeo_base_state.audio_io_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:neogeo_base_state.neogeo_base/systemlatch/callback:systemlatch:0'}), (b:KG {id: 'handler:neogeo_base_state.set_screen_shadow'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:neogeo_base_state.neogeo_base/systemlatch/callback:systemlatch:1'}), (b:KG {id: 'handler:neogeo_base_state.set_use_cart_vectors'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:neogeo_base_state.neogeo_base/systemlatch/callback:systemlatch:5'}), (b:KG {id: 'handler:neogeo_base_state.set_palette_bank'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:neogeo_base_state.neogeo_base/screen/callback:screen:0'}), (b:KG {id: 'handler:neogeo_base_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:neogeo_base_state.neogeo_base/audionmi/callback:audionmi:0'}), (b:KG {id: 'device:neogeo_base_state.neogeo_base/audiocpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:neogeo_base_state.neogeo_base/soundlatch/callback:soundlatch:0'}), (b:KG {id: 'handler:input_merger_device.in_w_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:neogeo_base_state.neogeo_base/soundlatch/callback:soundlatch:0'}), (b:KG {id: 'device:neogeo_base_state.neogeo_base/audionmi'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:neogeo_base_state.neogeo_base/ymsnd/callback:ymsnd:0'}), (b:KG {id: 'device:neogeo_base_state.neogeo_base/audiocpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.base_main_map/range0'}), (b:KG {id: 'handler:neogeo_base_state.audio_command_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.base_main_map/range1'}), (b:KG {id: 'handler:neogeo_base_state.unmapped_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.base_main_map/range2'}), (b:KG {id: 'handler:neogeo_base_state.io_control_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.base_main_map/range3'}), (b:KG {id: 'handler:neogeo_base_state.unmapped_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.base_main_map/range4'}), (b:KG {id: 'handler:hc259_device.write_a3'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'systemlatch'};
MATCH (a:KG {id: 'map:neogeo_base_state.base_main_map/range5'}), (b:KG {id: 'handler:neogeo_base_state.video_register_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.base_main_map/range6'}), (b:KG {id: 'handler:neogeo_base_state.video_register_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.base_main_map/range7'}), (b:KG {id: 'handler:neogeo_base_state.unmapped_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.base_main_map/range8'}), (b:KG {id: 'handler:neogeo_base_state.paletteram_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.base_main_map/range8'}), (b:KG {id: 'handler:neogeo_base_state.paletteram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.audio_io_map/range0'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:neogeo_base_state.audio_io_map/range0'}), (b:KG {id: 'handler:generic_latch_8_device.clear_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:neogeo_base_state.audio_io_map/range1'}), (b:KG {id: 'handler:ym2610_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ymsnd'};
MATCH (a:KG {id: 'map:neogeo_base_state.audio_io_map/range1'}), (b:KG {id: 'handler:ym2610_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ymsnd'};
MATCH (a:KG {id: 'map:neogeo_base_state.audio_io_map/range2'}), (b:KG {id: 'handler:neogeo_base_state.audio_cpu_enable_nmi_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.audio_io_map/range3'}), (b:KG {id: 'handler:neogeo_base_state.audio_cpu_bank_select_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:neogeo_base_state.audio_io_map/range4'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundlatch2'};
MATCH (a:KG {id: 'handler:neogeo_base_state.set_screen_shadow'}), (b:KG {id: 'handler:neogeo_base_state.set_pens'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.set_palette_bank'}), (b:KG {id: 'handler:neogeo_base_state.set_pens'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.screen_update'}), (b:KG {id: 'handler:neosprite_base_device.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.screen_update'}), (b:KG {id: 'handler:neosprite_base_device.draw_fixed_layer'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.audio_command_w'}), (b:KG {id: 'handler:ng_memcard_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.video_register_r'}), (b:KG {id: 'handler:neosprite_base_device.get_videoram_data'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.video_register_r'}), (b:KG {id: 'handler:neosprite_base_device.get_videoram_modulo'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.video_register_r'}), (b:KG {id: 'handler:neogeo_base_state.unmapped_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.video_register_r'}), (b:KG {id: 'handler:neogeo_base_state.get_video_control'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.video_register_w'}), (b:KG {id: 'handler:neogeo_base_state.set_video_control'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.video_register_w'}), (b:KG {id: 'handler:neogeo_base_state.set_display_counter_msb'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.video_register_w'}), (b:KG {id: 'handler:neogeo_base_state.set_display_counter_lsb'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.video_register_w'}), (b:KG {id: 'handler:neogeo_base_state.acknowledge_interrupt'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neosprite_base_device.draw_sprites'}), (b:KG {id: 'handler:neosprite_base_device.sprite_on_scanline'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neosprite_base_device.draw_fixed_layer'}), (b:KG {id: 'handler:neosprite_base_device.draw_fixed_layer_2pixels'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.get_video_control'}), (b:KG {id: 'handler:neosprite_base_device.get_auto_animation_counter'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.get_video_control'}), (b:KG {id: 'handler:ng_memcard_device.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.set_video_control'}), (b:KG {id: 'handler:neosprite_base_device.set_auto_animation_speed'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.set_video_control'}), (b:KG {id: 'handler:neosprite_base_device.set_auto_animation_disabled'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.set_video_control'}), (b:KG {id: 'handler:neogeo_base_state.set_display_position_interrupt_control'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.set_display_counter_lsb'}), (b:KG {id: 'handler:neogeo_base_state.adjust_display_position_interrupt_timer'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:neogeo_base_state.acknowledge_interrupt'}), (b:KG {id: 'handler:neogeo_base_state.update_interrupts'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
