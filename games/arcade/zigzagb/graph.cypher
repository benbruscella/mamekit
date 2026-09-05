// mamekit knowledge graph — driver src/mame/galaxian/galaxian.cpp
// generated 2026-09-05T03:50:34.230Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/galaxian/galaxian.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:galaxian.h'}) SET n:SourceFile SET n += {path: 'galaxian.h', external: true};
MERGE (n:KG {id: 'file:galaxian_a.h'}) SET n:SourceFile SET n += {path: 'galaxian_a.h', external: true};
MERGE (n:KG {id: 'file:cclimber_a.h'}) SET n:SourceFile SET n += {path: 'cclimber_a.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6502/m6502.h'}) SET n:SourceFile SET n += {path: 'cpu/m6502/m6502.h', external: true};
MERGE (n:KG {id: 'file:cpu/s2650/s2650.h'}) SET n:SourceFile SET n += {path: 'cpu/s2650/s2650.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:machine/nvram.h'}) SET n:SourceFile SET n += {path: 'machine/nvram.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:nl_konami.h'}) SET n:SourceFile SET n += {path: 'nl_konami.h', external: true};
MERGE (n:KG {id: 'game:zigzagb'}) SET n:Game SET n += {name: 'zigzagb', year: '1982', company: 'bootleg (LAX)', fullname: 'Zig Zag (bootleg Dig Dug conversion on Galaxian hardware, set 1)', monitor: 'ROT90', cls: 'zigzagb_state', init: 'init_zigzag', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 16968, sourceColumn: 1, sourceEndLine: 16968};
MERGE (n:KG {id: 'romset:zigzagb'}) SET n:RomSet SET n += {name: 'zigzagb', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 11467, sourceColumn: 1, sourceEndLine: 11467};
MERGE (n:KG {id: 'region:zigzagb/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 9750, sourceColumn: 2, sourceEndLine: 9750};
MERGE (n:KG {id: 'rom:zigzagb/maincpu/zz_d1.7l'}) SET n:Rom SET n += {file: 'zz_d1.7l', offset: 0, size: 4096, crc: '8cc08d81', sha1: 'be671192ef06dc3ed6963dc39e6bdce3275300e9', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 11469, sourceColumn: 2, sourceEndLine: 11469};
MERGE (n:KG {id: 'rom:zigzagb/maincpu/zz_d2.7k'}) SET n:Rom SET n += {file: 'zz_d2.7k', offset: 4096, size: 4096, crc: '326d8d45', sha1: '563b9fc64c34e36cfadffb107ce30d3a04d62d9c', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 11470, sourceColumn: 2, sourceEndLine: 11470};
MERGE (n:KG {id: 'rom:zigzagb/maincpu/zz_d4.7f'}) SET n:Rom SET n += {file: 'zz_d4.7f', offset: 8192, size: 4096, crc: 'a94ed92a', sha1: 'd56f32fc2b3f0f7affe658b7726682c60d09bc16', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 11471, sourceColumn: 2, sourceEndLine: 11471};
MERGE (n:KG {id: 'rom:zigzagb/maincpu/zz_d3.7h'}) SET n:Rom SET n += {file: 'zz_d3.7h', offset: 12288, size: 4096, crc: 'ce5e7a00', sha1: '93c47d22698a016cb0f0b654ade9ccab0cd1c88b', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 11472, sourceColumn: 2, sourceEndLine: 11472};
MERGE (n:KG {id: 'region:zigzagb/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 4096, flags: '0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 9757, sourceColumn: 2, sourceEndLine: 9757};
MERGE (n:KG {id: 'rom:zigzagb/gfx1/zz_6.1h'}) SET n:Rom SET n += {file: 'zz_6.1h', offset: 0, size: 2048, crc: '780c162a', sha1: 'b0cac68258281917bcada52ce26e0ce38721d633', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 11475, sourceColumn: 2, sourceEndLine: 11475};
MERGE (n:KG {id: 'rom:zigzagb/gfx1/zz_5.1k'}) SET n:Rom SET n += {file: 'zz_5.1k', offset: 2048, size: 2048, crc: 'f3cdfec5', sha1: '798d631c72d8e6b2e372b4b3ab0c10d8365a1359', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 11477, sourceColumn: 2, sourceEndLine: 11477};
MERGE (n:KG {id: 'region:zigzagb/gfx2'}) SET n:RomRegion SET n += {tag: 'gfx2', size: 4096, flags: '0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 11431, sourceColumn: 2, sourceEndLine: 11431};
MERGE (n:KG {id: 'rom:zigzagb/gfx2/zz_6.1h'}) SET n:Rom SET n += {file: 'zz_6.1h', offset: 0, size: 2048, crc: '780c162a', sha1: 'b0cac68258281917bcada52ce26e0ce38721d633', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 11475, sourceColumn: 2, sourceEndLine: 11475, continueSegments: [0, 2048, 2048]};
MERGE (n:KG {id: 'rom:zigzagb/gfx2/zz_5.1k'}) SET n:Rom SET n += {file: 'zz_5.1k', offset: 2048, size: 2048, crc: 'f3cdfec5', sha1: '798d631c72d8e6b2e372b4b3ab0c10d8365a1359', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 11477, sourceColumn: 2, sourceEndLine: 11477, continueSegments: [2048, 2048, 2048]};
MERGE (n:KG {id: 'region:zigzagb/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 32, flags: '0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 9761, sourceColumn: 2, sourceEndLine: 9761};
MERGE (n:KG {id: 'rom:zigzagb/proms/zzbpr_e9.bin'}) SET n:Rom SET n += {file: 'zzbpr_e9.bin', offset: 0, size: 32, crc: 'aa486dd0', sha1: 'b845b52715bf6361ceee8c1ac541733963bd47af', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 11487, sourceColumn: 2, sourceEndLine: 11487};
MERGE (n:KG {id: 'map:galaxian_state.galaxian_map_discrete'}) SET n:AddressMap SET n += {cls: 'galaxian_state', name: 'galaxian_map_discrete', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1739, sourceColumn: 1, sourceEndLine: 1744};
MERGE (n:KG {id: 'map:galaxian_state.galaxian_map_discrete/range0'}) SET n:AddressRange SET n += {start: 24580, end: 24583, raw: 'map(0x6004, 0x6007).mirror(0x07f8).w("cust", FUNC(galaxian_sound_device::lfo_freq_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1741, sourceColumn: 2, sourceEndLine: 1741, mirror: 2040};
MERGE (n:KG {id: 'handler:galaxian_sound_device.lfo_freq_w'}) SET n:Handler SET n += {method: 'lfo_freq_w', ownerClass: 'galaxian_sound_device', sourceFile: 'src/mame/galaxian/galaxian_a.cpp', sourceLine: 702, sourceColumn: 1, sourceEndLine: 711, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'uint8_t lfo_val_new = (m_lfo_val & ~(1<<offset)) | ((data & 0x01) << offset);

	if (m_lfo_val != lfo_val_new)
	{
		m_lfo_val = lfo_val_new;
		m_discrete->write(GAL_INP_BG_DAC, m_lfo_val);
	}'};
MERGE (n:KG {id: 'map:galaxian_state.galaxian_map_discrete/range1'}) SET n:AddressRange SET n += {start: 26624, end: 26631, raw: 'map(0x6800, 0x6807).mirror(0x07f8).w("cust", FUNC(galaxian_sound_device::sound_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1742, sourceColumn: 2, sourceEndLine: 1742, mirror: 2040};
MERGE (n:KG {id: 'handler:galaxian_sound_device.sound_w'}) SET n:Handler SET n += {method: 'sound_w', ownerClass: 'galaxian_sound_device', sourceFile: 'src/mame/galaxian/galaxian_a.cpp', sourceLine: 734, sourceColumn: 1, sourceEndLine: 761, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'data &= 0x01;
	switch (offset & 7)
	{
		case 0:     /* FS1 (controls 555 timer at 8R) */
		case 1:     /* FS2 (controls 555 timer at 8S) */
		case 2:     /* FS3 (controls 555 timer at 8T) */
			background_enable_w(offset, data);
			break;

		case 3:     /* HIT */
			noise_enable_w(data);
			break;

		case 4:     /* n/c */
			break;

		case 5:     /* FIRE */
			fire_enable_w(data);
			break;

		case 6:     /* VOL1 */
		case 7:     /* VOL2 */
			vol_w(offset & 1, data);
			break;
	}'};
MERGE (n:KG {id: 'handler:galaxian_sound_device.background_enable_w'}) SET n:Handler SET n += {method: 'background_enable_w', ownerClass: 'galaxian_sound_device', sourceFile: 'src/mame/galaxian/galaxian_a.cpp', sourceLine: 713, sourceColumn: 1, sourceEndLine: 716, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_discrete->write(NODE_RELATIVE(GAL_INP_FS1, offset), data & 0x01);'};
MERGE (n:KG {id: 'handler:galaxian_sound_device.noise_enable_w'}) SET n:Handler SET n += {method: 'noise_enable_w', ownerClass: 'galaxian_sound_device', sourceFile: 'src/mame/galaxian/galaxian_a.cpp', sourceLine: 718, sourceColumn: 1, sourceEndLine: 721, sourceParameters: 'uint8_t data', sourceBody: 'm_discrete->write(GAL_INP_HIT, data & 0x01);'};
MERGE (n:KG {id: 'handler:galaxian_sound_device.fire_enable_w'}) SET n:Handler SET n += {method: 'fire_enable_w', ownerClass: 'galaxian_sound_device', sourceFile: 'src/mame/galaxian/galaxian_a.cpp', sourceLine: 728, sourceColumn: 1, sourceEndLine: 731, sourceParameters: 'uint8_t data', sourceBody: 'm_discrete->write(GAL_INP_FIRE, data & 0x01);'};
MERGE (n:KG {id: 'handler:galaxian_sound_device.vol_w'}) SET n:Handler SET n += {method: 'vol_w', ownerClass: 'galaxian_sound_device', sourceFile: 'src/mame/galaxian/galaxian_a.cpp', sourceLine: 723, sourceColumn: 1, sourceEndLine: 726, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_discrete->write(NODE_RELATIVE(GAL_INP_VOL1, offset), data & 0x01);'};
MERGE (n:KG {id: 'map:galaxian_state.galaxian_map_discrete/range2'}) SET n:AddressRange SET n += {start: 30720, end: 30720, raw: 'map(0x7800, 0x7800).mirror(0x07ff).w("cust", FUNC(galaxian_sound_device::pitch_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1743, sourceColumn: 2, sourceEndLine: 1743, mirror: 2047};
MERGE (n:KG {id: 'handler:galaxian_sound_device.pitch_w'}) SET n:Handler SET n += {method: 'pitch_w', ownerClass: 'galaxian_sound_device', sourceFile: 'src/mame/galaxian/galaxian_a.cpp', sourceLine: 697, sourceColumn: 1, sourceEndLine: 700, sourceParameters: 'uint8_t data', sourceBody: 'm_discrete->write(GAL_INP_PITCH, data);'};
MERGE (n:KG {id: 'map:galaxian_state.galaxian_map_base'}) SET n:AddressMap SET n += {cls: 'galaxian_state', name: 'galaxian_map_base', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1746, sourceColumn: 1, sourceEndLine: 1767, unmapHigh: true};
MERGE (n:KG {id: 'map:galaxian_state.galaxian_map_base/range0'}) SET n:AddressRange SET n += {start: 0, end: 16383, raw: 'map(0x0000, 0x3fff).rom()', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1749, sourceColumn: 2, sourceEndLine: 1749, rom: true};
MERGE (n:KG {id: 'map:galaxian_state.galaxian_map_base/range1'}) SET n:AddressRange SET n += {start: 16384, end: 17407, raw: 'map(0x4000, 0x43ff).mirror(0x0400).ram()', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1750, sourceColumn: 2, sourceEndLine: 1750, mirror: 1024, ram: true};
MERGE (n:KG {id: 'map:galaxian_state.galaxian_map_base/range2'}) SET n:AddressRange SET n += {start: 20480, end: 21503, raw: 'map(0x5000, 0x53ff).mirror(0x0400).ram().w(FUNC(galaxian_state::galaxian_videoram_w)).share("videoram")', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1751, sourceColumn: 2, sourceEndLine: 1751, mirror: 1024, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'handler:galaxian_state.galaxian_videoram_w'}) SET n:Handler SET n += {method: 'galaxian_videoram_w', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian_v.cpp', sourceLine: 503, sourceColumn: 1, sourceEndLine: 511, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '// update any video up to the current scanline
	m_screen->update_partial(m_screen->vpos());

	// store the data and mark the corresponding tile dirty
	m_videoram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:galaxian_state.galaxian_map_base/range3'}) SET n:AddressRange SET n += {start: 22528, end: 22783, raw: 'map(0x5800, 0x58ff).mirror(0x0700).ram().w(FUNC(galaxian_state::galaxian_objram_w)).share("spriteram")', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1752, sourceColumn: 2, sourceEndLine: 1752, mirror: 1792, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'handler:galaxian_state.galaxian_objram_w'}) SET n:Handler SET n += {method: 'galaxian_objram_w', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian_v.cpp', sourceLine: 514, sourceColumn: 1, sourceEndLine: 544, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '// update any video up to the current scanline
	m_screen->update_partial(m_screen->vpos());

	// store the data
	m_spriteram[offset] = data;

	// the first $40 bytes affect the tilemap
	if (offset < 0x40)
	{
		// even entries control the scroll position
		if ((offset & 0x01) == 0)
		{
			// Frogger: top and bottom 4 bits swapped entering the adder
			if (m_frogger_adjust)
				data = (data >> 4) | (data << 4);
			if (!m_sfx_adjust)
				m_bg_tilemap->set_scrolly(offset >> 1, data);
			else
				m_bg_tilemap->set_scrollx(offset >> 1, m_x_scale*data);
		}

		// odd entries control the color base for the row
		else
		{
			for (offset >>= 1; offset < 0x0400; offset += 32)
				m_bg_tilemap->mark_tile_dirty(offset);
		}
	}'};
MERGE (n:KG {id: 'map:galaxian_state.galaxian_map_base/range4'}) SET n:AddressRange SET n += {start: 24576, end: 24576, raw: 'map(0x6000, 0x6000).mirror(0x07ff).portr("IN0")', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1753, sourceColumn: 2, sourceEndLine: 1753, mirror: 2047, portRead: 'IN0'};
MERGE (n:KG {id: 'map:galaxian_state.galaxian_map_base/range5'}) SET n:AddressRange SET n += {start: 24576, end: 24577, raw: 'map(0x6000, 0x6001).mirror(0x07f8).w(FUNC(galaxian_state::start_lamp_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1754, sourceColumn: 2, sourceEndLine: 1754, mirror: 2040};
MERGE (n:KG {id: 'handler:galaxian_state.start_lamp_w'}) SET n:Handler SET n += {method: 'start_lamp_w', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 795, sourceColumn: 1, sourceEndLine: 800, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '// offset 0 = 1P START LAMP
	// offset 1 = 2P START LAMP
	m_lamps[offset] = BIT(data, 0);'};
MERGE (n:KG {id: 'map:galaxian_state.galaxian_map_base/range6'}) SET n:AddressRange SET n += {start: 24578, end: 24578, raw: 'map(0x6002, 0x6002).mirror(0x07f8).w(FUNC(galaxian_state::coin_lock_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1755, sourceColumn: 2, sourceEndLine: 1755, mirror: 2040};
MERGE (n:KG {id: 'handler:galaxian_state.coin_lock_w'}) SET n:Handler SET n += {method: 'coin_lock_w', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 803, sourceColumn: 1, sourceEndLine: 807, sourceParameters: 'uint8_t data', sourceBody: '// many variants and bootlegs don\'t have this
	machine().bookkeeping().coin_lockout_global_w(~data & 1);'};
MERGE (n:KG {id: 'map:galaxian_state.galaxian_map_base/range7'}) SET n:AddressRange SET n += {start: 24579, end: 24579, raw: 'map(0x6003, 0x6003).mirror(0x07f8).w(FUNC(galaxian_state::coin_count_0_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1756, sourceColumn: 2, sourceEndLine: 1756, mirror: 2040};
MERGE (n:KG {id: 'handler:galaxian_state.coin_count_0_w'}) SET n:Handler SET n += {method: 'coin_count_0_w', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 810, sourceColumn: 1, sourceEndLine: 813, sourceParameters: 'uint8_t data', sourceBody: 'machine().bookkeeping().coin_counter_w(0, data & 1);'};
MERGE (n:KG {id: 'map:galaxian_state.galaxian_map_base/range8'}) SET n:AddressRange SET n += {start: 26624, end: 26624, raw: 'map(0x6800, 0x6800).mirror(0x07ff).portr("IN1")', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1758, sourceColumn: 2, sourceEndLine: 1758, mirror: 2047, portRead: 'IN1'};
MERGE (n:KG {id: 'map:galaxian_state.galaxian_map_base/range9'}) SET n:AddressRange SET n += {start: 28672, end: 28672, raw: 'map(0x7000, 0x7000).mirror(0x07ff).portr("IN2")', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1760, sourceColumn: 2, sourceEndLine: 1760, mirror: 2047, portRead: 'IN2'};
MERGE (n:KG {id: 'map:galaxian_state.galaxian_map_base/range10'}) SET n:AddressRange SET n += {start: 28673, end: 28673, raw: 'map(0x7001, 0x7001).mirror(0x07f8).w(FUNC(galaxian_state::irq_enable_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1761, sourceColumn: 2, sourceEndLine: 1761, mirror: 2040};
MERGE (n:KG {id: 'handler:galaxian_state.irq_enable_w'}) SET n:Handler SET n += {method: 'irq_enable_w', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 779, sourceColumn: 1, sourceEndLine: 787, sourceParameters: 'uint8_t data', sourceBody: '// the latched D0 bit here goes to the CLEAR line on the interrupt flip-flop
	m_irq_enabled = data & 1;

	// if CLEAR is held low, we must make sure the interrupt signal is clear
	if (!m_irq_enabled)
		m_maincpu->set_input_line(m_irq_line, CLEAR_LINE);'};
MERGE (n:KG {id: 'map:galaxian_state.galaxian_map_base/range11'}) SET n:AddressRange SET n += {start: 28676, end: 28676, raw: 'map(0x7004, 0x7004).mirror(0x07f8).w(FUNC(galaxian_state::galaxian_stars_enable_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1762, sourceColumn: 2, sourceEndLine: 1762, mirror: 2040};
MERGE (n:KG {id: 'handler:galaxian_state.galaxian_stars_enable_w'}) SET n:Handler SET n += {method: 'galaxian_stars_enable_w', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian_v.cpp', sourceLine: 711, sourceColumn: 1, sourceEndLine: 725, sourceConstants: ['STAR_RNG_PERIOD=131071'], sourceParameters: 'uint8_t data', sourceBody: 'if ((m_stars_enabled ^ data) & 0x01)
		m_screen->update_partial(m_screen->vpos());

	if (!m_stars_enabled && (data & 0x01))
	{
		/* on the rising edge of this, the CLR on the shift registers is released */
		/* this resets the "origin" of this frame to 0 minus the number of clocks */
		/* we have counted so far */
		m_star_rng_origin = STAR_RNG_PERIOD - (m_screen->vpos() * 512 + m_screen->hpos());
		m_star_rng_origin_frame = m_screen->frame_number();
	}
	m_stars_enabled = data & 0x01;'};
MERGE (n:KG {id: 'map:galaxian_state.galaxian_map_base/range12'}) SET n:AddressRange SET n += {start: 28678, end: 28678, raw: 'map(0x7006, 0x7006).mirror(0x07f8).w(FUNC(galaxian_state::galaxian_flip_screen_x_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1763, sourceColumn: 2, sourceEndLine: 1763, mirror: 2040};
MERGE (n:KG {id: 'handler:galaxian_state.galaxian_flip_screen_x_w'}) SET n:Handler SET n += {method: 'galaxian_flip_screen_x_w', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian_v.cpp', sourceLine: 670, sourceColumn: 1, sourceEndLine: 684, sourceParameters: 'uint8_t data', sourceBody: 'if (m_flipscreen_x != (data & 0x01))
	{
		m_screen->update_partial(m_screen->vpos());

		/* when the direction changes, we count a different number of clocks */
		/* per frame, so we need to reset the origin of the stars to the current */
		/* frame before we flip */
		stars_update_origin();

		m_flipscreen_x = data & 0x01;
		m_bg_tilemap->set_flip((m_flipscreen_x ? TILEMAP_FLIPX : 0) | (m_flipscreen_y ? TILEMAP_FLIPY : 0));
	}'};
MERGE (n:KG {id: 'handler:galaxian_state.stars_update_origin'}) SET n:Handler SET n += {method: 'stars_update_origin', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian_v.cpp', sourceLine: 822, sourceColumn: 1, sourceEndLine: 846, sourceConstants: ['STAR_RNG_PERIOD=131071'], sourceParameters: '', sourceBody: 'int curframe = m_screen->frame_number();

	/* only update on a different frame */
	if (curframe != m_star_rng_origin_frame)
	{
		/* The RNG period is 2^17-1; each frame, the shift register is clocked */
		/* 512*256 = 2^17 times. This means that we clock one extra time each */
		/* frame. However, if we are NOT flipped, there is a pair of D flip-flops */
		/* at 6B which delay the count so that we count 512*256-2 = 2^17-2 times. */
		/* In this case, we only one time less than the period each frame. Both */
		/* of these off-by-one countings produce the horizontal star scrolling. */
		int per_frame_delta = m_flipscreen_x ? 1 : -1;
		int total_delta = per_frame_delta * (curframe - m_star_rng_origin_frame);

		/* we can\'t just use % here because mod of a negative number is undefined */
		while (total_delta < 0)
			total_delta += STAR_RNG_PERIOD;

		/* now that everything is positive, do the mod */
		m_star_rng_origin = (m_star_rng_origin + total_delta) % STAR_RNG_PERIOD;
		m_star_rng_origin_frame = curframe;
	}'};
MERGE (n:KG {id: 'map:galaxian_state.galaxian_map_base/range13'}) SET n:AddressRange SET n += {start: 28679, end: 28679, raw: 'map(0x7007, 0x7007).mirror(0x07f8).w(FUNC(galaxian_state::galaxian_flip_screen_y_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1764, sourceColumn: 2, sourceEndLine: 1764, mirror: 2040};
MERGE (n:KG {id: 'handler:galaxian_state.galaxian_flip_screen_y_w'}) SET n:Handler SET n += {method: 'galaxian_flip_screen_y_w', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian_v.cpp', sourceLine: 686, sourceColumn: 1, sourceEndLine: 695, sourceParameters: 'uint8_t data', sourceBody: 'if (m_flipscreen_y != (data & 0x01))
	{
		m_screen->update_partial(m_screen->vpos());

		m_flipscreen_y = data & 0x01;
		m_bg_tilemap->set_flip((m_flipscreen_x ? TILEMAP_FLIPX : 0) | (m_flipscreen_y ? TILEMAP_FLIPY : 0));
	}'};
MERGE (n:KG {id: 'map:galaxian_state.galaxian_map_base/range14'}) SET n:AddressRange SET n += {start: 30720, end: 30720, raw: 'map(0x7800, 0x7800).mirror(0x07ff).r("watchdog", FUNC(watchdog_timer_device::reset_r))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1766, sourceColumn: 2, sourceEndLine: 1766, mirror: 2047};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_r'}) SET n:Handler SET n += {method: 'reset_r', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2865, sourceColumn: 2, sourceEndLine: 2865};
MERGE (n:KG {id: 'map:galaxian_state.galaxian_map'}) SET n:AddressMap SET n += {cls: 'galaxian_state', name: 'galaxian_map', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1769, sourceColumn: 1, sourceEndLine: 1773, calls: ['galaxian_map_base', 'galaxian_map_discrete']};
MERGE (n:KG {id: 'map:zigzagb_state.zigzag_map'}) SET n:AddressMap SET n += {cls: 'zigzagb_state', name: 'zigzag_map', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2048, sourceColumn: 1, sourceEndLine: 2069, unmapHigh: true};
MERGE (n:KG {id: 'map:zigzagb_state.zigzag_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 8191, raw: 'map(0x0000, 0x1fff).rom()', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2051, sourceColumn: 2, sourceEndLine: 2051, rom: true};
MERGE (n:KG {id: 'map:zigzagb_state.zigzag_map/range1'}) SET n:AddressRange SET n += {start: 8192, end: 12287, raw: 'map(0x2000, 0x2fff).bankr(m_rombanks[0])', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2052, sourceColumn: 2, sourceEndLine: 2052, bankRead: 'bank1'};
MERGE (n:KG {id: 'map:zigzagb_state.zigzag_map/range2'}) SET n:AddressRange SET n += {start: 12288, end: 16383, raw: 'map(0x3000, 0x3fff).bankr(m_rombanks[1])', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2053, sourceColumn: 2, sourceEndLine: 2053, bankRead: 'bank2'};
MERGE (n:KG {id: 'map:zigzagb_state.zigzag_map/range3'}) SET n:AddressRange SET n += {start: 16384, end: 18431, raw: 'map(0x4000, 0x47ff).ram()', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2054, sourceColumn: 2, sourceEndLine: 2054, ram: true};
MERGE (n:KG {id: 'map:zigzagb_state.zigzag_map/range4'}) SET n:AddressRange SET n += {start: 18432, end: 20479, raw: 'map(0x4800, 0x4fff).w(FUNC(zigzagb_state::ay8910_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2055, sourceColumn: 2, sourceEndLine: 2055};
MERGE (n:KG {id: 'handler:zigzagb_state.ay8910_w'}) SET n:Handler SET n += {method: 'ay8910_w', ownerClass: 'zigzagb_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1385, sourceColumn: 1, sourceEndLine: 1406, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'switch (offset & 0x300)
	{
	case 0x000:
		// control lines
		// bit 0 = WRITE
		// bit 1 = C/D
		if (BIT(offset, 0))
			m_ay8910[0]->data_address_w(BIT(offset, 1), m_ay8910_latch);
		break;

	case 0x100:
		// data latch
		m_ay8910_latch = offset & 0xff;
		break;

	case 0x200:
		// unknown
		break;
	}'};
MERGE (n:KG {id: 'map:zigzagb_state.zigzag_map/range5'}) SET n:AddressRange SET n += {start: 20480, end: 21503, raw: 'map(0x5000, 0x53ff).mirror(0x0400).ram().w(FUNC(zigzagb_state::galaxian_videoram_w)).share("videoram")', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2056, sourceColumn: 2, sourceEndLine: 2056, mirror: 1024, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'handler:zigzagb_state.galaxian_videoram_w'}) SET n:Handler SET n += {method: 'galaxian_videoram_w', ownerClass: 'zigzagb_state', sourceFile: 'src/mame/galaxian/galaxian_v.cpp', sourceLine: 503, sourceColumn: 1, sourceEndLine: 511, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '// update any video up to the current scanline
	m_screen->update_partial(m_screen->vpos());

	// store the data and mark the corresponding tile dirty
	m_videoram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:zigzagb_state.zigzag_map/range6'}) SET n:AddressRange SET n += {start: 22528, end: 22783, raw: 'map(0x5800, 0x58ff).mirror(0x0700).ram().w(FUNC(zigzagb_state::galaxian_objram_w)).share("spriteram")', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2057, sourceColumn: 2, sourceEndLine: 2057, mirror: 1792, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'handler:zigzagb_state.galaxian_objram_w'}) SET n:Handler SET n += {method: 'galaxian_objram_w', ownerClass: 'zigzagb_state', sourceFile: 'src/mame/galaxian/galaxian_v.cpp', sourceLine: 514, sourceColumn: 1, sourceEndLine: 544, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '// update any video up to the current scanline
	m_screen->update_partial(m_screen->vpos());

	// store the data
	m_spriteram[offset] = data;

	// the first $40 bytes affect the tilemap
	if (offset < 0x40)
	{
		// even entries control the scroll position
		if ((offset & 0x01) == 0)
		{
			// Frogger: top and bottom 4 bits swapped entering the adder
			if (m_frogger_adjust)
				data = (data >> 4) | (data << 4);
			if (!m_sfx_adjust)
				m_bg_tilemap->set_scrolly(offset >> 1, data);
			else
				m_bg_tilemap->set_scrollx(offset >> 1, m_x_scale*data);
		}

		// odd entries control the color base for the row
		else
		{
			for (offset >>= 1; offset < 0x0400; offset += 32)
				m_bg_tilemap->mark_tile_dirty(offset);
		}
	}'};
MERGE (n:KG {id: 'map:zigzagb_state.zigzag_map/range7'}) SET n:AddressRange SET n += {start: 24576, end: 24576, raw: 'map(0x6000, 0x6000).mirror(0x07ff).portr("IN0")', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2058, sourceColumn: 2, sourceEndLine: 2058, mirror: 2047, portRead: 'IN0'};
MERGE (n:KG {id: 'map:zigzagb_state.zigzag_map/range8'}) SET n:AddressRange SET n += {start: 24576, end: 24577, raw: 'map(0x6000, 0x6001).mirror(0x07f8).w(FUNC(zigzagb_state::start_lamp_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2059, sourceColumn: 2, sourceEndLine: 2059, mirror: 2040};
MERGE (n:KG {id: 'handler:zigzagb_state.start_lamp_w'}) SET n:Handler SET n += {method: 'start_lamp_w', ownerClass: 'zigzagb_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 795, sourceColumn: 1, sourceEndLine: 800, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '// offset 0 = 1P START LAMP
	// offset 1 = 2P START LAMP
	m_lamps[offset] = BIT(data, 0);'};
MERGE (n:KG {id: 'map:zigzagb_state.zigzag_map/range9'}) SET n:AddressRange SET n += {start: 24579, end: 24579, raw: 'map(0x6003, 0x6003).mirror(0x07f8).w(FUNC(zigzagb_state::coin_count_0_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2060, sourceColumn: 2, sourceEndLine: 2060, mirror: 2040};
MERGE (n:KG {id: 'handler:zigzagb_state.coin_count_0_w'}) SET n:Handler SET n += {method: 'coin_count_0_w', ownerClass: 'zigzagb_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 810, sourceColumn: 1, sourceEndLine: 813, sourceParameters: 'uint8_t data', sourceBody: 'machine().bookkeeping().coin_counter_w(0, data & 1);'};
MERGE (n:KG {id: 'map:zigzagb_state.zigzag_map/range10'}) SET n:AddressRange SET n += {start: 26624, end: 26624, raw: 'map(0x6800, 0x6800).mirror(0x07ff).portr("IN1")', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2061, sourceColumn: 2, sourceEndLine: 2061, mirror: 2047, portRead: 'IN1'};
MERGE (n:KG {id: 'map:zigzagb_state.zigzag_map/range11'}) SET n:AddressRange SET n += {start: 28672, end: 28672, raw: 'map(0x7000, 0x7000).mirror(0x07ff).portr("IN2")', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2062, sourceColumn: 2, sourceEndLine: 2062, mirror: 2047, portRead: 'IN2'};
MERGE (n:KG {id: 'map:zigzagb_state.zigzag_map/range12'}) SET n:AddressRange SET n += {start: 28673, end: 28673, raw: 'map(0x7001, 0x7001).mirror(0x07f8).w(FUNC(zigzagb_state::irq_enable_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2063, sourceColumn: 2, sourceEndLine: 2063, mirror: 2040};
MERGE (n:KG {id: 'handler:zigzagb_state.irq_enable_w'}) SET n:Handler SET n += {method: 'irq_enable_w', ownerClass: 'zigzagb_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 779, sourceColumn: 1, sourceEndLine: 787, sourceParameters: 'uint8_t data', sourceBody: '// the latched D0 bit here goes to the CLEAR line on the interrupt flip-flop
	m_irq_enabled = data & 1;

	// if CLEAR is held low, we must make sure the interrupt signal is clear
	if (!m_irq_enabled)
		m_maincpu->set_input_line(m_irq_line, CLEAR_LINE);'};
MERGE (n:KG {id: 'map:zigzagb_state.zigzag_map/range13'}) SET n:AddressRange SET n += {start: 28674, end: 28674, raw: 'map(0x7002, 0x7002).mirror(0x07f8).w(FUNC(zigzagb_state::bankswap_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2064, sourceColumn: 2, sourceEndLine: 2064, mirror: 2040};
MERGE (n:KG {id: 'handler:zigzagb_state.bankswap_w'}) SET n:Handler SET n += {method: 'bankswap_w', ownerClass: 'zigzagb_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1377, sourceColumn: 1, sourceEndLine: 1382, sourceParameters: 'uint8_t data', sourceBody: '// Zig Zag can swap ROMs 2 and 3 as a form of copy protection
	m_rombanks[0]->set_entry(data & 1);
	m_rombanks[1]->set_entry(~data & 1);'};
MERGE (n:KG {id: 'map:zigzagb_state.zigzag_map/range14'}) SET n:AddressRange SET n += {start: 28676, end: 28676, raw: 'map(0x7004, 0x7004).mirror(0x07f8).w(FUNC(zigzagb_state::galaxian_stars_enable_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2065, sourceColumn: 2, sourceEndLine: 2065, mirror: 2040};
MERGE (n:KG {id: 'handler:zigzagb_state.galaxian_stars_enable_w'}) SET n:Handler SET n += {method: 'galaxian_stars_enable_w', ownerClass: 'zigzagb_state', sourceFile: 'src/mame/galaxian/galaxian_v.cpp', sourceLine: 711, sourceColumn: 1, sourceEndLine: 725, sourceConstants: ['STAR_RNG_PERIOD=131071'], sourceParameters: 'uint8_t data', sourceBody: 'if ((m_stars_enabled ^ data) & 0x01)
		m_screen->update_partial(m_screen->vpos());

	if (!m_stars_enabled && (data & 0x01))
	{
		/* on the rising edge of this, the CLR on the shift registers is released */
		/* this resets the "origin" of this frame to 0 minus the number of clocks */
		/* we have counted so far */
		m_star_rng_origin = STAR_RNG_PERIOD - (m_screen->vpos() * 512 + m_screen->hpos());
		m_star_rng_origin_frame = m_screen->frame_number();
	}
	m_stars_enabled = data & 0x01;'};
MERGE (n:KG {id: 'map:zigzagb_state.zigzag_map/range15'}) SET n:AddressRange SET n += {start: 28678, end: 28678, raw: 'map(0x7006, 0x7006).mirror(0x07f8).w(FUNC(zigzagb_state::galaxian_flip_screen_x_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2066, sourceColumn: 2, sourceEndLine: 2066, mirror: 2040};
MERGE (n:KG {id: 'handler:zigzagb_state.galaxian_flip_screen_x_w'}) SET n:Handler SET n += {method: 'galaxian_flip_screen_x_w', ownerClass: 'zigzagb_state', sourceFile: 'src/mame/galaxian/galaxian_v.cpp', sourceLine: 670, sourceColumn: 1, sourceEndLine: 684, sourceParameters: 'uint8_t data', sourceBody: 'if (m_flipscreen_x != (data & 0x01))
	{
		m_screen->update_partial(m_screen->vpos());

		/* when the direction changes, we count a different number of clocks */
		/* per frame, so we need to reset the origin of the stars to the current */
		/* frame before we flip */
		stars_update_origin();

		m_flipscreen_x = data & 0x01;
		m_bg_tilemap->set_flip((m_flipscreen_x ? TILEMAP_FLIPX : 0) | (m_flipscreen_y ? TILEMAP_FLIPY : 0));
	}'};
MERGE (n:KG {id: 'map:zigzagb_state.zigzag_map/range16'}) SET n:AddressRange SET n += {start: 28679, end: 28679, raw: 'map(0x7007, 0x7007).mirror(0x07f8).w(FUNC(zigzagb_state::galaxian_flip_screen_y_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2067, sourceColumn: 2, sourceEndLine: 2067, mirror: 2040};
MERGE (n:KG {id: 'handler:zigzagb_state.galaxian_flip_screen_y_w'}) SET n:Handler SET n += {method: 'galaxian_flip_screen_y_w', ownerClass: 'zigzagb_state', sourceFile: 'src/mame/galaxian/galaxian_v.cpp', sourceLine: 686, sourceColumn: 1, sourceEndLine: 695, sourceParameters: 'uint8_t data', sourceBody: 'if (m_flipscreen_y != (data & 0x01))
	{
		m_screen->update_partial(m_screen->vpos());

		m_flipscreen_y = data & 0x01;
		m_bg_tilemap->set_flip((m_flipscreen_x ? TILEMAP_FLIPX : 0) | (m_flipscreen_y ? TILEMAP_FLIPY : 0));
	}'};
MERGE (n:KG {id: 'map:zigzagb_state.zigzag_map/range17'}) SET n:AddressRange SET n += {start: 30720, end: 30720, raw: 'map(0x7800, 0x7800).mirror(0x07ff).r("watchdog", FUNC(watchdog_timer_device::reset_r))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2068, sourceColumn: 2, sourceEndLine: 2068, mirror: 2047};
MERGE (n:KG {id: 'machine:galaxian_state.galaxian_base'}) SET n:MachineConfig SET n += {cls: 'galaxian_state', name: 'galaxian_base', calls: [], stateMembers: ['{"name":"m_bullets_base","bits":32,"signed":true}', '{"name":"m_sprites_base","bits":32,"signed":true}', '{"name":"m_numspritegens","bits":32,"signed":true}', '{"name":"m_protection_state","bits":16}', '{"name":"m_protection_result","bits":8}', '{"name":"m_konami_sound_control","bits":8}', '{"name":"m_irq_enabled","bits":8}', '{"name":"m_frogger_adjust","bits":1}', '{"name":"m_x_scale","bits":8}', '{"name":"m_h0_start","bits":8}', '{"name":"m_sfx_adjust","bits":1}', '{"name":"m_flipscreen_x","bits":8}', '{"name":"m_flipscreen_y","bits":8}', '{"name":"m_background_enable","bits":8}', '{"name":"m_background_red","bits":8}', '{"name":"m_background_green","bits":8}', '{"name":"m_background_blue","bits":8}', '{"name":"m_star_rng_origin","bits":32}', '{"name":"m_star_rng_origin_frame","bits":32}', '{"name":"m_stars_enabled","bits":8}', '{"name":"m_stars_blink_state","bits":8}', '{"name":"m_gfxbank","bits":8,"arrayLength":5}'], startHandlers: ['galaxian_state.video_start'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7486, sourceColumn: 1, sourceEndLine: 7505};
MERGE (n:KG {id: 'handler:galaxian_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian_v.cpp', sourceLine: 399, sourceColumn: 1, sourceEndLine: 430, sourceParameters: '', sourceBody: '/* create a tilemap for the background */
	if (!m_sfx_adjust)
	{
		/* normal galaxian hardware is row-based and individually scrolling columns */
		m_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(galaxian_state::bg_get_tile_info)), TILEMAP_SCAN_ROWS, m_x_scale*8,8, 32,32);
		m_bg_tilemap->set_scroll_cols(32);
	}
	else
	{
		/* sfx hardware is column-based and individually scrolling rows */
		m_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(galaxian_state::bg_get_tile_info)), TILEMAP_SCAN_COLS, m_x_scale*8,8, 32,32);
		m_bg_tilemap->set_scroll_rows(32);
	}
	m_bg_tilemap->set_transparent_pen(0);

	/* initialize globals */
	m_flipscreen_x = 0;
	m_flipscreen_y = 0;
	m_background_enable = 0;
	m_background_blue = 0;
	m_background_red = 0;
	m_background_green = 0;
	std::fill(std::begin(m_gfxbank), std::end(m_gfxbank), 0);

	/* initialize stars */
	stars_init();

	/* register for save states */
	state_save_register();'};
MERGE (n:KG {id: 'handler:galaxian_state.stars_init'}) SET n:Handler SET n += {method: 'stars_init', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian_v.cpp', sourceLine: 789, sourceColumn: 1, sourceEndLine: 812, sourceConstants: ['STAR_RNG_PERIOD=131071'], sourceParameters: '', sourceBody: '/* reset the blink and enabled states */
	m_stars_enabled = false;
	m_stars_blink_state = 0;

	/* precalculate the RNG */
	m_stars = std::make_unique<uint8_t[]>(STAR_RNG_PERIOD);
	uint32_t shiftreg = 0;
	for (int i = 0; i < STAR_RNG_PERIOD; i++)
	{
		/* stars are enabled if the upper 8 bits are 1 and the low bit is 0 */
		int enabled = ((shiftreg & 0x1fe01) == 0x1fe00);

		/* color comes from the 6 bits below the top 8 bits */
		int color = (~shiftreg & 0x1f8) >> 3;

		/* store the color value in the low 6 bits and the enable in the upper bit */
		m_stars[i] = color | (enabled << 7);

		/* the LFSR is fed based on the XOR of bit 12 and the inverse of bit 0 */
		shiftreg = (shiftreg >> 1) | ((((shiftreg >> 12) ^ ~shiftreg) & 1) << 16);
	}'};
MERGE (n:KG {id: 'handler:galaxian_state.state_save_register'}) SET n:Handler SET n += {method: 'state_save_register', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian_v.cpp', sourceLine: 433, sourceColumn: 1, sourceEndLine: 450, sourceParameters: '', sourceBody: 'save_item(NAME(m_flipscreen_x));
	save_item(NAME(m_flipscreen_y));
	save_item(NAME(m_background_enable));
	save_item(NAME(m_background_red));
	save_item(NAME(m_background_green));
	save_item(NAME(m_background_blue));

	save_item(NAME(m_sprites_base));
	save_item(NAME(m_bullets_base));
	save_item(NAME(m_gfxbank));

	save_item(NAME(m_stars_enabled));
	save_item(NAME(m_star_rng_origin));
	save_item(NAME(m_star_rng_origin_frame));
	save_item(NAME(m_stars_blink_state));'};
MERGE (n:KG {id: 'handler:galaxian_state.bg_get_tile_info'}) SET n:Handler SET n += {method: 'bg_get_tile_info', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian_v.cpp', sourceLine: 487, sourceColumn: 1, sourceEndLine: 500, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'uint8_t *videoram = m_videoram;
	uint8_t x = tile_index & 0x1f;
	uint8_t y = tile_index >> 5;

	uint16_t code = videoram[tile_index];
	uint8_t attrib = m_spriteram[x*2+1];
	uint8_t color = attrib & 7;

	m_extend_tile_info_ptr(&code, &color, attrib, x, y);

	tileinfo.set(0, code, color, 0);'};
MERGE (n:KG {id: 'device:galaxian_state.galaxian_base/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 3072000, config: ['Z80(config, m_maincpu, GALAXIAN_PIXEL_CLOCK/3/2)', 'm_maincpu->set_addrmap(AS_PROGRAM, &galaxian_state::galaxian_map)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7489, sourceColumn: 2, sourceEndLine: 7489};
MERGE (n:KG {id: 'device:galaxian_state.galaxian_base/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog").set_vblank_count("screen", 8)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7492, sourceColumn: 2, sourceEndLine: 7492};
MERGE (n:KG {id: 'device:galaxian_state.galaxian_base/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_galaxian)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7495, sourceColumn: 2, sourceEndLine: 7495, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:galaxian_state.galaxian_base/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(galaxian_state::galaxian_palette), 32)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7496, sourceColumn: 2, sourceEndLine: 7496, clockExpr: 'FUNC(galaxian_state::galaxian_palette)'};
MERGE (n:KG {id: 'device:galaxian_state.galaxian_base/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(GALAXIAN_PIXEL_CLOCK, GALAXIAN_HTOTAL, GALAXIAN_HBEND, GALAXIAN_HBSTART, GALAXIAN_VTOTAL, GALAXIAN_VBEND, GALAXIAN_VBSTART)', 'm_screen->set_screen_update(FUNC(galaxian_state::screen_update_galaxian))', 'm_screen->screen_vblank().set(FUNC(galaxian_state::vblank_interrupt_w))'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7498, sourceColumn: 2, sourceEndLine: 7498, configCalls: ['set_raw(18432000,1152,0,768,264,16,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [18432000, 1152, 0, 768, 264, 16, 240], screenRawExpr: ['GALAXIAN_PIXEL_CLOCK', 'GALAXIAN_HTOTAL', 'GALAXIAN_HBEND', 'GALAXIAN_HBSTART', 'GALAXIAN_VTOTAL', 'GALAXIAN_VBEND', 'GALAXIAN_VBSTART']};
MERGE (n:KG {id: 'device:galaxian_state.galaxian_base/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(galaxian_state::screen_update_galaxian))', ownerTag: 'screen', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7500, sourceColumn: 2, sourceEndLine: 7500, targetClass: 'galaxian_state', targetMethod: 'screen_update_galaxian'};
MERGE (n:KG {id: 'handler:galaxian_state.screen_update_galaxian'}) SET n:Handler SET n += {method: 'screen_update_galaxian', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian_v.cpp', sourceLine: 460, sourceColumn: 1, sourceEndLine: 477, sourceParameters: 'screen_device &screen, bitmap_rgb32 &bitmap, const rectangle &cliprect', sourceBody: '/* draw the background layer (including stars) */
	m_draw_background_ptr(bitmap, cliprect);

	/* draw the tilemap characters over top */
	m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0);

	/* render the sprites next. Some custom pcbs (eg. zigzag, fantastc) have more than one sprite generator (ideally, this should be rendered in parallel) */
	for (int i = 0; i < m_numspritegens; i++)
		sprites_draw(screen, bitmap, cliprect, &m_spriteram[m_sprites_base + i * 0x20]);

	/* if we have bullets to draw, render them following */
	if (!m_draw_bullet_ptr.isnull())
		bullets_draw(screen, bitmap, cliprect, &m_spriteram[m_bullets_base]);

	return 0;'};
MERGE (n:KG {id: 'handler:galaxian_state.sprites_draw'}) SET n:Handler SET n += {method: 'sprites_draw', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian_v.cpp', sourceLine: 568, sourceColumn: 1, sourceEndLine: 619, sourceParameters: 'screen_device &screen, bitmap_rgb32 &bitmap, const rectangle &cliprect, const uint8_t *spritebase', sourceBody: 'rectangle clip = cliprect;
	sprites_clip(screen, clip);

	// The line buffer is only written if it contains a \'0\' currently;
	// it is cleared during the visible area, and populated during HBLANK
	// To simulate this, we render backwards so that lower numbered sprites
	// have priority over higher numbered sprites.
	for (int sprnum = 7; sprnum >= 0; sprnum--)
	{
		const uint8_t *base = &spritebase[sprnum * 4];

		// Frogger: top and bottom 4 bits swapped entering the adder
		uint8_t base0 = m_frogger_adjust ? ((base[0] >> 4) | (base[0] << 4)) : base[0];

		// the first three sprites match against y-1 (seems other way around for sfx/monsterz)
		uint8_t sy = 240 - (base0 - (m_sfx_adjust ? (sprnum >= 3) : (sprnum < 3)));

		uint16_t code = base[1] & 0x3f;
		uint8_t flipx = base[1] & 0x40;
		uint8_t flipy = base[1] & 0x80;
		uint8_t color = base[2] & 7;

		// the existence of +1 (sprite vs tile layer) is supported by a LOT of games
		const int hoffset = 1;
		uint8_t sx = base[3] + hoffset;

		// extend the sprite information
		m_extend_sprite_info_ptr(base, &sx, &sy, &flipx, &flipy, &code, &color);

		// apply flipscreen in X direction
		if (m_flipscreen_x)
		{
			sx = 240 - sx;
			flipx = !flipx;
		}

		// apply flipscreen in Y direction
		if (m_flipscreen_y)
		{
			sy = 240 - sy;
			flipy = !flipy;
		}

		// draw
		m_gfxdecode->gfx(1)->transpen(bitmap,clip,
				code, color,
				flipx, flipy,
				m_h0_start + m_x_scale * sx, sy, 0);
	}'};
MERGE (n:KG {id: 'handler:galaxian_state.sprites_clip'}) SET n:Handler SET n += {method: 'sprites_clip', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian_v.cpp', sourceLine: 554, sourceColumn: 1, sourceEndLine: 566, sourceParameters: 'screen_device &screen, rectangle &cliprect', sourceBody: '// 16 of the 256 pixels of the sprites are hard-clipped at the line buffer.
	// According to the schematics, it should be the first 16 pixels.
	// See sprites_draw for an explanation of the +1.
	rectangle clip = screen.visible_area();
	if (m_flipscreen_x)
		clip.max_x = (256 - (16 + 1)) * m_x_scale - 1;
	else
		clip.min_x = ((16 + 1) * m_x_scale);

	cliprect &= clip;'};
MERGE (n:KG {id: 'handler:galaxian_state.bullets_draw'}) SET n:Handler SET n += {method: 'bullets_draw', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian_v.cpp', sourceLine: 629, sourceColumn: 1, sourceEndLine: 660, sourceParameters: 'screen_device &screen, bitmap_rgb32 &bitmap, const rectangle &cliprect, const uint8_t *base', sourceBody: '// iterate over scanlines
	for (int y = cliprect.min_y; y <= cliprect.max_y; y++)
	{
		uint8_t shell = 0xff, missile = 0xff;
		uint8_t effy;

		// the first 3 entries match Y-1
		effy = m_flipscreen_y ? ((y - 1) ^ 255) : (y - 1);
		for (int which = 0; which < 3; which++)
			if (uint8_t(base[which*4+1] + effy) == 0xff)
				shell = which;

		// remaining entries match Y
		effy = m_flipscreen_y ? (y ^ 255) : y;
		for (int which = 3; which < 8; which++)
			if (uint8_t(base[which*4+1] + effy) == 0xff)
			{
				if (which != 7)
					shell = which;
				else
					missile = which;
			}

		// draw the shell
		if (shell != 0xff)
			m_draw_bullet_ptr(bitmap, cliprect, shell, 255 - base[shell*4+3], y);
		if (missile != 0xff)
			m_draw_bullet_ptr(bitmap, cliprect, missile, 255 - base[missile*4+3], y);
	}'};
MERGE (n:KG {id: 'device:galaxian_state.galaxian_base/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set', raw: 'm_screen->screen_vblank().set(FUNC(galaxian_state::vblank_interrupt_w))', ownerTag: 'screen', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7501, sourceColumn: 2, sourceEndLine: 7501, targetClass: 'galaxian_state', targetMethod: 'vblank_interrupt_w'};
MERGE (n:KG {id: 'handler:galaxian_state.vblank_interrupt_w'}) SET n:Handler SET n += {method: 'vblank_interrupt_w', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 761, sourceColumn: 1, sourceEndLine: 767, sourceParameters: 'int state', sourceBody: '// interrupt line is clocked at VBLANK
	// a flip-flop at 6F is held in the preset state based on the NMI ON signal
	if (state && m_irq_enabled)
		m_maincpu->set_input_line(m_irq_line, ASSERT_LINE);'};
MERGE (n:KG {id: 'device:galaxian_state.galaxian_base/speaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speaker', clock: null, config: ['SPEAKER(config, "speaker").front_center()'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7504, sourceColumn: 2, sourceEndLine: 7504};
MERGE (n:KG {id: 'machine:zigzagb_state.zigzag'}) SET n:MachineConfig SET n += {cls: 'zigzagb_state', name: 'zigzag', calls: ['galaxian_base'], stateMembers: ['{"name":"m_bullets_base","bits":32,"signed":true}', '{"name":"m_sprites_base","bits":32,"signed":true}', '{"name":"m_numspritegens","bits":32,"signed":true}', '{"name":"m_protection_state","bits":16}', '{"name":"m_protection_result","bits":8}', '{"name":"m_konami_sound_control","bits":8}', '{"name":"m_irq_enabled","bits":8}', '{"name":"m_frogger_adjust","bits":1}', '{"name":"m_x_scale","bits":8}', '{"name":"m_h0_start","bits":8}', '{"name":"m_sfx_adjust","bits":1}', '{"name":"m_flipscreen_x","bits":8}', '{"name":"m_flipscreen_y","bits":8}', '{"name":"m_background_enable","bits":8}', '{"name":"m_background_red","bits":8}', '{"name":"m_background_green","bits":8}', '{"name":"m_background_blue","bits":8}', '{"name":"m_star_rng_origin","bits":32}', '{"name":"m_star_rng_origin_frame","bits":32}', '{"name":"m_stars_enabled","bits":8}', '{"name":"m_stars_blink_state","bits":8}', '{"name":"m_gfxbank","bits":8,"arrayLength":5}', '{"name":"m_ay8910_latch","bits":8}'], startHandlers: ['galaxian_state.video_start'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7746, sourceColumn: 1, sourceEndLine: 7761};
MERGE (n:KG {id: 'bank:zigzagb_state.zigzag/bank1'}) SET n:MemoryBank SET n += {tag: 'bank1', member: 'm_rombanks[0]', startEntry: 0, entries: 2, region: 'maincpu', offset: 8192, stride: 4096, raw: 'm_rombanks[0]->configure_entries(0, 2, memregion("maincpu")->base() + 0x2000, 0x1000)', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1360, sourceColumn: 1, sourceEndLine: 1374};
MERGE (n:KG {id: 'bank:zigzagb_state.zigzag/bank2'}) SET n:MemoryBank SET n += {tag: 'bank2', member: 'm_rombanks[1]', startEntry: 0, entries: 2, region: 'maincpu', offset: 8192, stride: 4096, raw: 'm_rombanks[1]->configure_entries(0, 2, memregion("maincpu")->base() + 0x2000, 0x1000)', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1360, sourceColumn: 1, sourceEndLine: 1374};
MERGE (n:KG {id: 'device:zigzagb_state.zigzag/8910.0'}) SET n:Device SET n += {type: 'AY8910', tag: '8910.0', clock: 3072000, config: ['AY8910(config, m_ay8910[0], GALAXIAN_PIXEL_CLOCK/3/2).add_route(ALL_OUTPUTS, "speaker", 0.5)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7760, sourceColumn: 2, sourceEndLine: 7760};
MERGE (n:KG {id: 'audioroute:device:zigzagb_state.zigzag/8910.0/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.5, raw: 'AY8910(config, m_ay8910[0], GALAXIAN_PIXEL_CLOCK/3/2).add_route(ALL_OUTPUTS, "speaker", 0.5)', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7760, sourceColumn: 2, sourceEndLine: 7760};
MERGE (n:KG {id: 'inputs:zigzag'}) SET n:InputPorts SET n += {name: 'zigzag', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 4176, sourceColumn: 8, sourceEndLine: 4176};
MERGE (n:KG {id: 'inputs:zigzag/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:zigzag/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_COIN1', defaultValue: 0};
MERGE (n:KG {id: 'inputs:zigzag/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_UNKNOWN', defaultValue: 0};
MERGE (n:KG {id: 'inputs:zigzag/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:zigzag/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:zigzag/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_BUTTON1', defaultValue: 0};
MERGE (n:KG {id: 'inputs:zigzag/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:zigzag/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:zigzag/IN0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:zigzag/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:zigzag/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_START1', defaultValue: 0};
MERGE (n:KG {id: 'inputs:zigzag/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_START2', defaultValue: 0};
MERGE (n:KG {id: 'inputs:zigzag/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:zigzag/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:zigzag/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:zigzag/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:zigzag/IN1/f6'}) SET n:PortField SET n += {kind: 'dip', mask: 192, name: 'Coinage', defaultValue: 0, settings: ['64=2C 1C', '0=1C 1C', '128=1C 2C', '192=Free Play']};
MERGE (n:KG {id: 'inputs:zigzag/IN2'}) SET n:Port SET n += {tag: 'IN2', modify: false};
MERGE (n:KG {id: 'inputs:zigzag/IN2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, name: 'Lives', defaultValue: 0, settings: ['0=3', '1=4']};
MERGE (n:KG {id: 'inputs:zigzag/IN2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, name: 'Cabinet', defaultValue: 2, settings: ['2=Upright', '0=Cocktail']};
MERGE (n:KG {id: 'inputs:zigzag/IN2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 12, name: 'Bonus Life', defaultValue: 0, settings: ['0=10000 60000', '4=20000 60000', '8=30000 60000', '12=40000 60000']};
MERGE (n:KG {id: 'inputs:zigzag/IN2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 240, activeLow: false, type: 'IPT_UNUSED', defaultValue: 0};
MERGE (n:KG {id: 'gfxlayout:galaxian_charlayout'}) SET n:GfxLayout SET n += {name: 'galaxian_charlayout', width: 8, height: 8, total: 'RGN_FRAC(1,2)', planes: 2, planeOffsets: ['RGN_FRAC(0,2)', 'RGN_FRAC(1,2)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxlayout:galaxian_spritelayout'}) SET n:GfxLayout SET n += {name: 'galaxian_spritelayout', width: 16, height: 16, total: 'RGN_FRAC(1,2)', planes: 2, planeOffsets: ['RGN_FRAC(0,2)', 'RGN_FRAC(1,2)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 64, 65, 66, 67, 68, 69, 70, 71], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 128, 136, 144, 152, 160, 168, 176, 184], charIncrement: 256};
MERGE (n:KG {id: 'gfxdecode:gfx_galaxian'}) SET n:GfxDecode SET n += {name: 'gfx_galaxian', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7441, sourceColumn: 8, sourceEndLine: 7441};
MERGE (n:KG {id: 'gfxdecode:gfx_galaxian/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'galaxian_charlayout', colorBase: 0, colorCount: 8, xscale: 3, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_galaxian/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'galaxian_spritelayout', colorBase: 0, colorCount: 8, xscale: 3, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_pacmanbl'}) SET n:GfxDecode SET n += {name: 'gfx_pacmanbl', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7463, sourceColumn: 8, sourceEndLine: 7463};
MERGE (n:KG {id: 'gfxdecode:gfx_pacmanbl/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'galaxian_charlayout', colorBase: 0, colorCount: 8, xscale: 3, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_pacmanbl/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx2', offset: 0, layout: 'galaxian_spritelayout', colorBase: 0, colorCount: 8, xscale: 3, yscale: 1};
MERGE (n:KG {id: 'device:galaxian_state.galaxian_base/palette/callback:palette_init'}) SET n:Callback SET n += {signal: 'palette_init', operation: 'palette_init', raw: 'PALETTE(config, m_palette, FUNC(galaxian_state::galaxian_palette), 32)', ownerTag: 'palette', targetClass: 'galaxian_state', targetMethod: 'galaxian_palette', entries: 32, sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7496};
MERGE (n:KG {id: 'handler:galaxian_state.galaxian_palette'}) SET n:Handler SET n += {method: 'galaxian_palette', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian_v.cpp', sourceLine: 238, sourceColumn: 1, sourceEndLine: 359, sourceConstants: ['RGB_MAXIMUM=224'], sourceParameters: 'palette_device &palette', sourceBody: 'const uint8_t *color_prom = memregion("proms")->base();
	

	/*
	    Sprite/tilemap colors are mapped through a color PROM as follows:

	      bit 7 -- 220 ohm resistor  -- BLUE
	            -- 470 ohm resistor  -- BLUE
	            -- 220 ohm resistor  -- GREEN
	            -- 470 ohm resistor  -- GREEN
	            -- 1  kohm resistor  -- GREEN
	            -- 220 ohm resistor  -- RED
	            -- 470 ohm resistor  -- RED
	      bit 0 -- 1  kohm resistor  -- RED

	    Note that not all boards have this configuration. Namco PCBs may
	    have 330 ohm resistors instead of 220, but the default setup has
	    also been used by Namco.

	    In parallel with these resistors are a pair of 150 ohm and 100 ohm
	    resistors on each R,G,B component that are connected to the star
	    generator.

	    And in parallel with the whole mess are a set of 100 ohm resistors
	    on each R,G,B component that are enabled when a shell/missile is
	    enabled.

	    When computing weights, we use RGB_MAXIMUM as the maximum to give
	    headroom for stars and shells/missiles. This is not fully accurate,
	    but if we included all possible sources in parallel, the brightness
	    of the main game would be very low to allow for all the oversaturation
	    of the stars and shells/missiles.
	*/
	double rweights[3], gweights[3], bweights[2];
	compute_resistor_weights(0, RGB_MAXIMUM, -1.0,
			3, &TABLE(0, 1000, 470, 220), rweights, 470, 0,
			3, &TABLE(0, 1000, 470, 220), gweights, 470, 0,
			2, &TABLE(1, 1000, 470, 220), bweights, 470, 0);

	// decode the palette first
	int const len = memregion("proms")->bytes();
	for (int i = 0; i < len; i++)
	{
		uint8_t bit0, bit1, bit2;

		// red component
		bit0 = BIT(color_prom[i], 0);
		bit1 = BIT(color_prom[i], 1);
		bit2 = BIT(color_prom[i], 2);
		int const r = combine_weights(rweights, bit0, bit1, bit2);

		// green component
		bit0 = BIT(color_prom[i], 3);
		bit1 = BIT(color_prom[i], 4);
		bit2 = BIT(color_prom[i], 5);
		int const g = combine_weights(gweights, bit0, bit1, bit2);

		// blue component
		bit0 = BIT(color_prom[i], 6);
		bit1 = BIT(color_prom[i], 7);
		int const b = combine_weights(bweights, bit0, bit1);

		palette.set_pen_color(i, rgb_t(r, g, b));
	}

	/*
	    The maximum sprite/tilemap resistance is ~130 Ohms with all RGB
	    outputs enabled (1/(1/1000 + 1/470 + 1/220)). Since we normalized
	    to RGB_MAXIMUM, this maps RGB_MAXIMUM -> 130 Ohms.

	    The stars are at 150 Ohms for the LSB, and 100 Ohms for the MSB.
	    This means the 3 potential values are:

	        150 Ohms -> RGB_MAXIMUM * 130 / 150
	        100 Ohms -> RGB_MAXIMUM * 130 / 100
	         60 Ohms -> RGB_MAXIMUM * 130 / 60

	    Since we can\'t saturate that high, we instead approximate this
	    by compressing the values proportionally into the 194->255 range.
	*/
	int const minval = RGB_MAXIMUM * 130 / 150;
	int const midval = RGB_MAXIMUM * 130 / 100;
	int const maxval = RGB_MAXIMUM * 130 / 60;

	// compute the values for each of 4 possible star values
	uint8_t const starmap[4]{
			0,
			minval,
			minval + (255 - minval) * (midval - minval) / (maxval - minval),
			255 };

	// generate the colors for the stars
	for (int i = 0; i < 64; i++)
	{
		uint8_t bit0, bit1;

		// bit 5 = red @ 150 Ohm, bit 4 = red @ 100 Ohm
		bit0 = BIT(i, 5);
		bit1 = BIT(i, 4);
		int const r = starmap[(bit1 << 1) | bit0];

		// bit 3 = green @ 150 Ohm, bit 2 = green @ 100 Ohm
		bit0 = BIT(i, 3);
		bit1 = BIT(i, 2);
		int const g = starmap[(bit1 << 1) | bit0];

		// bit 1 = blue @ 150 Ohm, bit 0 = blue @ 100 Ohm
		bit0 = BIT(i, 1);
		bit1 = BIT(i, 0);
		int const b = starmap[(bit1 << 1) | bit0];

		// set the RGB color
		m_star_color[i] = rgb_t(r, g, b);
	}

	// default bullet colors are white for the first 7, and yellow for the last one
	for (int i = 0; i < 7; i++)
		m_bullet_color[i] = rgb_t(0xff, 0xff, 0xff);
	m_bullet_color[7] = rgb_t(0xff,0xff,0x00);'};
MATCH (a:KG {id: 'game:zigzagb'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 16968, sourceColumn: 1, sourceEndLine: 16968};
MATCH (a:KG {id: 'game:zigzagb'}), (b:KG {id: 'machine:zigzagb_state.zigzag'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:zigzagb'}), (b:KG {id: 'inputs:zigzag'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:zigzagb'}), (b:KG {id: 'romset:zigzagb'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}), (b:KG {id: 'file:galaxian.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}), (b:KG {id: 'file:galaxian_a.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}), (b:KG {id: 'file:cclimber_a.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}), (b:KG {id: 'file:cpu/m6502/m6502.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}), (b:KG {id: 'file:cpu/s2650/s2650.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}), (b:KG {id: 'file:machine/nvram.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}), (b:KG {id: 'file:nl_konami.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:zigzagb_state.zigzag'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7746, sourceColumn: 1, sourceEndLine: 7761};
MATCH (a:KG {id: 'machine:zigzagb_state.zigzag'}), (b:KG {id: 'handler:galaxian_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:zigzagb_state.zigzag'}), (b:KG {id: 'machine:galaxian_state.galaxian_base'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:zigzagb_state.zigzag'}), (b:KG {id: 'bank:zigzagb_state.zigzag/bank1'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:zigzagb_state.zigzag'}), (b:KG {id: 'bank:zigzagb_state.zigzag/bank2'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:zigzagb_state.zigzag'}), (b:KG {id: 'map:zigzagb_state.zigzag_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:zigzagb_state.zigzag'}), (b:KG {id: 'gfxdecode:gfx_pacmanbl'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode', override: true};
MATCH (a:KG {id: 'machine:zigzagb_state.zigzag'}), (b:KG {id: 'device:zigzagb_state.zigzag/8910.0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:zigzag'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 4176, sourceColumn: 8, sourceEndLine: 4176};
MATCH (a:KG {id: 'inputs:zigzag'}), (b:KG {id: 'inputs:zigzag/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:zigzag'}), (b:KG {id: 'inputs:zigzag/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:zigzag'}), (b:KG {id: 'inputs:zigzag/IN2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:zigzagb'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 11467, sourceColumn: 1, sourceEndLine: 11467};
MATCH (a:KG {id: 'romset:zigzagb'}), (b:KG {id: 'region:zigzagb/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:zigzagb'}), (b:KG {id: 'region:zigzagb/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:zigzagb'}), (b:KG {id: 'region:zigzagb/gfx2'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:zigzagb'}), (b:KG {id: 'region:zigzagb/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:galaxian_state.video_start'}), (b:KG {id: 'handler:galaxian_state.stars_init'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:galaxian_state.video_start'}), (b:KG {id: 'handler:galaxian_state.state_save_register'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:galaxian_state.video_start'}), (b:KG {id: 'handler:galaxian_state.bg_get_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7486, sourceColumn: 1, sourceEndLine: 7505};
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'handler:galaxian_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'device:galaxian_state.galaxian_base/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'device:galaxian_state.galaxian_base/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'device:galaxian_state.galaxian_base/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'gfxdecode:gfx_galaxian'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'device:galaxian_state.galaxian_base/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'device:galaxian_state.galaxian_base/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'device:galaxian_state.galaxian_base/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'bank:zigzagb_state.zigzag/bank1'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1360, sourceColumn: 1, sourceEndLine: 1374};
MATCH (a:KG {id: 'bank:zigzagb_state.zigzag/bank2'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1360, sourceColumn: 1, sourceEndLine: 1374};
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2048, sourceColumn: 1, sourceEndLine: 2069};
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map'}), (b:KG {id: 'map:zigzagb_state.zigzag_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map'}), (b:KG {id: 'map:zigzagb_state.zigzag_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map'}), (b:KG {id: 'map:zigzagb_state.zigzag_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map'}), (b:KG {id: 'map:zigzagb_state.zigzag_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map'}), (b:KG {id: 'map:zigzagb_state.zigzag_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map'}), (b:KG {id: 'map:zigzagb_state.zigzag_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map'}), (b:KG {id: 'map:zigzagb_state.zigzag_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map'}), (b:KG {id: 'map:zigzagb_state.zigzag_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map'}), (b:KG {id: 'map:zigzagb_state.zigzag_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map'}), (b:KG {id: 'map:zigzagb_state.zigzag_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map'}), (b:KG {id: 'map:zigzagb_state.zigzag_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map'}), (b:KG {id: 'map:zigzagb_state.zigzag_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map'}), (b:KG {id: 'map:zigzagb_state.zigzag_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map'}), (b:KG {id: 'map:zigzagb_state.zigzag_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map'}), (b:KG {id: 'map:zigzagb_state.zigzag_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map'}), (b:KG {id: 'map:zigzagb_state.zigzag_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map'}), (b:KG {id: 'map:zigzagb_state.zigzag_map/range16'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map'}), (b:KG {id: 'map:zigzagb_state.zigzag_map/range17'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_pacmanbl'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7463, sourceColumn: 8, sourceEndLine: 7463};
MATCH (a:KG {id: 'gfxdecode:gfx_pacmanbl'}), (b:KG {id: 'gfxdecode:gfx_pacmanbl/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_pacmanbl'}), (b:KG {id: 'gfxdecode:gfx_pacmanbl/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:zigzagb_state.zigzag/8910.0'}), (b:KG {id: 'audioroute:device:zigzagb_state.zigzag/8910.0/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:zigzag/IN0'}), (b:KG {id: 'inputs:zigzag/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zigzag/IN0'}), (b:KG {id: 'inputs:zigzag/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zigzag/IN0'}), (b:KG {id: 'inputs:zigzag/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zigzag/IN0'}), (b:KG {id: 'inputs:zigzag/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zigzag/IN0'}), (b:KG {id: 'inputs:zigzag/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zigzag/IN0'}), (b:KG {id: 'inputs:zigzag/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zigzag/IN0'}), (b:KG {id: 'inputs:zigzag/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zigzag/IN0'}), (b:KG {id: 'inputs:zigzag/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zigzag/IN1'}), (b:KG {id: 'inputs:zigzag/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zigzag/IN1'}), (b:KG {id: 'inputs:zigzag/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zigzag/IN1'}), (b:KG {id: 'inputs:zigzag/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zigzag/IN1'}), (b:KG {id: 'inputs:zigzag/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zigzag/IN1'}), (b:KG {id: 'inputs:zigzag/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zigzag/IN1'}), (b:KG {id: 'inputs:zigzag/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zigzag/IN1'}), (b:KG {id: 'inputs:zigzag/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zigzag/IN2'}), (b:KG {id: 'inputs:zigzag/IN2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zigzag/IN2'}), (b:KG {id: 'inputs:zigzag/IN2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zigzag/IN2'}), (b:KG {id: 'inputs:zigzag/IN2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:zigzag/IN2'}), (b:KG {id: 'inputs:zigzag/IN2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:zigzagb/maincpu'}), (b:KG {id: 'rom:zigzagb/maincpu/zz_d1.7l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:zigzagb/maincpu'}), (b:KG {id: 'rom:zigzagb/maincpu/zz_d2.7k'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:zigzagb/maincpu'}), (b:KG {id: 'rom:zigzagb/maincpu/zz_d4.7f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:zigzagb/maincpu'}), (b:KG {id: 'rom:zigzagb/maincpu/zz_d3.7h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:zigzagb/gfx1'}), (b:KG {id: 'rom:zigzagb/gfx1/zz_6.1h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:zigzagb/gfx1'}), (b:KG {id: 'rom:zigzagb/gfx1/zz_5.1k'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:zigzagb/gfx2'}), (b:KG {id: 'rom:zigzagb/gfx2/zz_6.1h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:zigzagb/gfx2'}), (b:KG {id: 'rom:zigzagb/gfx2/zz_5.1k'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:zigzagb/proms'}), (b:KG {id: 'rom:zigzagb/proms/zzbpr_e9.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'device:galaxian_state.galaxian_base/maincpu'}), (b:KG {id: 'map:galaxian_state.galaxian_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'gfxdecode:gfx_galaxian'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7441, sourceColumn: 8, sourceEndLine: 7441};
MATCH (a:KG {id: 'gfxdecode:gfx_galaxian'}), (b:KG {id: 'gfxdecode:gfx_galaxian/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_galaxian'}), (b:KG {id: 'gfxdecode:gfx_galaxian/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:galaxian_state.galaxian_base/palette'}), (b:KG {id: 'device:galaxian_state.galaxian_base/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaxian_state.galaxian_base/screen'}), (b:KG {id: 'device:galaxian_state.galaxian_base/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaxian_state.galaxian_base/screen'}), (b:KG {id: 'device:galaxian_state.galaxian_base/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map/range4'}), (b:KG {id: 'handler:zigzagb_state.ay8910_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map/range5'}), (b:KG {id: 'handler:zigzagb_state.galaxian_videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map/range6'}), (b:KG {id: 'handler:zigzagb_state.galaxian_objram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map/range8'}), (b:KG {id: 'handler:zigzagb_state.start_lamp_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map/range9'}), (b:KG {id: 'handler:zigzagb_state.coin_count_0_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map/range12'}), (b:KG {id: 'handler:zigzagb_state.irq_enable_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map/range13'}), (b:KG {id: 'handler:zigzagb_state.bankswap_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map/range14'}), (b:KG {id: 'handler:zigzagb_state.galaxian_stars_enable_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map/range15'}), (b:KG {id: 'handler:zigzagb_state.galaxian_flip_screen_x_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map/range16'}), (b:KG {id: 'handler:zigzagb_state.galaxian_flip_screen_y_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:zigzagb_state.zigzag_map/range17'}), (b:KG {id: 'handler:watchdog_timer_device.reset_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'gfxdecode:gfx_pacmanbl/e0'}), (b:KG {id: 'gfxlayout:galaxian_charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_pacmanbl/e1'}), (b:KG {id: 'gfxlayout:galaxian_spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1769, sourceColumn: 1, sourceEndLine: 1773};
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map'}), (b:KG {id: 'map:galaxian_state.galaxian_map_base'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map'}), (b:KG {id: 'map:galaxian_state.galaxian_map_discrete'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_galaxian/e0'}), (b:KG {id: 'gfxlayout:galaxian_charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_galaxian/e1'}), (b:KG {id: 'gfxlayout:galaxian_spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:galaxian_state.galaxian_base/palette/callback:palette_init'}), (b:KG {id: 'handler:galaxian_state.galaxian_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaxian_state.galaxian_base/screen/callback:screen:0'}), (b:KG {id: 'handler:galaxian_state.screen_update_galaxian'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaxian_state.galaxian_base/screen/callback:screen:1'}), (b:KG {id: 'handler:galaxian_state.vblank_interrupt_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:zigzagb_state.galaxian_flip_screen_x_w'}), (b:KG {id: 'handler:galaxian_state.stars_update_origin'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:galaxian_charlayout'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:galaxian_spritelayout'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1746, sourceColumn: 1, sourceEndLine: 1767};
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base'}), (b:KG {id: 'map:galaxian_state.galaxian_map_base/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base'}), (b:KG {id: 'map:galaxian_state.galaxian_map_base/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base'}), (b:KG {id: 'map:galaxian_state.galaxian_map_base/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base'}), (b:KG {id: 'map:galaxian_state.galaxian_map_base/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base'}), (b:KG {id: 'map:galaxian_state.galaxian_map_base/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base'}), (b:KG {id: 'map:galaxian_state.galaxian_map_base/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base'}), (b:KG {id: 'map:galaxian_state.galaxian_map_base/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base'}), (b:KG {id: 'map:galaxian_state.galaxian_map_base/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base'}), (b:KG {id: 'map:galaxian_state.galaxian_map_base/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base'}), (b:KG {id: 'map:galaxian_state.galaxian_map_base/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base'}), (b:KG {id: 'map:galaxian_state.galaxian_map_base/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base'}), (b:KG {id: 'map:galaxian_state.galaxian_map_base/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base'}), (b:KG {id: 'map:galaxian_state.galaxian_map_base/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base'}), (b:KG {id: 'map:galaxian_state.galaxian_map_base/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base'}), (b:KG {id: 'map:galaxian_state.galaxian_map_base/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_discrete'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1739, sourceColumn: 1, sourceEndLine: 1744};
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_discrete'}), (b:KG {id: 'map:galaxian_state.galaxian_map_discrete/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_discrete'}), (b:KG {id: 'map:galaxian_state.galaxian_map_discrete/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_discrete'}), (b:KG {id: 'map:galaxian_state.galaxian_map_discrete/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'handler:galaxian_state.screen_update_galaxian'}), (b:KG {id: 'handler:galaxian_state.sprites_draw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:galaxian_state.screen_update_galaxian'}), (b:KG {id: 'handler:galaxian_state.bullets_draw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base/range2'}), (b:KG {id: 'handler:galaxian_state.galaxian_videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base/range3'}), (b:KG {id: 'handler:galaxian_state.galaxian_objram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base/range5'}), (b:KG {id: 'handler:galaxian_state.start_lamp_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base/range6'}), (b:KG {id: 'handler:galaxian_state.coin_lock_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base/range7'}), (b:KG {id: 'handler:galaxian_state.coin_count_0_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base/range10'}), (b:KG {id: 'handler:galaxian_state.irq_enable_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base/range11'}), (b:KG {id: 'handler:galaxian_state.galaxian_stars_enable_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base/range12'}), (b:KG {id: 'handler:galaxian_state.galaxian_flip_screen_x_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base/range13'}), (b:KG {id: 'handler:galaxian_state.galaxian_flip_screen_y_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_base/range14'}), (b:KG {id: 'handler:watchdog_timer_device.reset_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_discrete/range0'}), (b:KG {id: 'handler:galaxian_sound_device.lfo_freq_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'cust'};
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_discrete/range1'}), (b:KG {id: 'handler:galaxian_sound_device.sound_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'cust'};
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map_discrete/range2'}), (b:KG {id: 'handler:galaxian_sound_device.pitch_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'cust'};
MATCH (a:KG {id: 'handler:galaxian_state.sprites_draw'}), (b:KG {id: 'handler:galaxian_state.sprites_clip'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:galaxian_state.galaxian_flip_screen_x_w'}), (b:KG {id: 'handler:galaxian_state.stars_update_origin'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:galaxian_sound_device.sound_w'}), (b:KG {id: 'handler:galaxian_sound_device.background_enable_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:galaxian_sound_device.sound_w'}), (b:KG {id: 'handler:galaxian_sound_device.noise_enable_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:galaxian_sound_device.sound_w'}), (b:KG {id: 'handler:galaxian_sound_device.fire_enable_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:galaxian_sound_device.sound_w'}), (b:KG {id: 'handler:galaxian_sound_device.vol_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
