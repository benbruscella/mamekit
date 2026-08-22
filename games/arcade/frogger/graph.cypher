// mamekit knowledge graph — driver src/mame/galaxian/galaxian.cpp
// generated 2026-08-22T05:52:28.349Z
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
MERGE (n:KG {id: 'game:frogger'}) SET n:Game SET n += {name: 'frogger', year: '1981', company: 'Konami', fullname: 'Frogger', monitor: 'ROT90', cls: 'galaxian_state', init: 'init_frogger', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 17102, sourceColumn: 1, sourceEndLine: 17102, romTransforms: ['{"kind":"byte-bitswap","region":"audiocpu","start":0,"end":2048,"bits":[7,6,5,4,3,2,0,1]}', '{"kind":"byte-bitswap","region":"gfx1","start":2048,"end":4096,"bits":[7,6,5,4,3,2,0,1]}']};
MERGE (n:KG {id: 'romset:frogger'}) SET n:RomSet SET n += {name: 'frogger', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 14187, sourceColumn: 1, sourceEndLine: 14187};
MERGE (n:KG {id: 'region:frogger/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 9750, sourceColumn: 2, sourceEndLine: 9750};
MERGE (n:KG {id: 'rom:frogger/maincpu/frogger.26'}) SET n:Rom SET n += {file: 'frogger.26', offset: 0, size: 4096, crc: '597696d6', sha1: 'e7e021776cad00f095a1ebbef407b7c0a8f5d835', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 14189, sourceColumn: 2, sourceEndLine: 14189};
MERGE (n:KG {id: 'rom:frogger/maincpu/frogger.27'}) SET n:Rom SET n += {file: 'frogger.27', offset: 4096, size: 4096, crc: 'b6e6fcc3', sha1: '5e8692f2b0c7f4b3642b3ee6670e1c3b20029cdc', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 14190, sourceColumn: 2, sourceEndLine: 14190};
MERGE (n:KG {id: 'rom:frogger/maincpu/frsm3.7'}) SET n:Rom SET n += {file: 'frsm3.7', offset: 8192, size: 4096, crc: 'aca22ae0', sha1: '5a99060ea2506a3ac7d61ca5876ce5cb3e493565', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 14191, sourceColumn: 2, sourceEndLine: 14191};
MERGE (n:KG {id: 'region:frogger/audiocpu'}) SET n:RomRegion SET n += {tag: 'audiocpu', size: 65536, flags: '0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 13954, sourceColumn: 2, sourceEndLine: 13954};
MERGE (n:KG {id: 'rom:frogger/audiocpu/frogger.608'}) SET n:Rom SET n += {file: 'frogger.608', offset: 0, size: 2048, crc: 'e8ab0256', sha1: 'f090afcfacf5f13cdfa0dfda8e3feb868c6ce8bc', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 14194, sourceColumn: 2, sourceEndLine: 14194};
MERGE (n:KG {id: 'rom:frogger/audiocpu/frogger.609'}) SET n:Rom SET n += {file: 'frogger.609', offset: 2048, size: 2048, crc: '7380a48f', sha1: '75582a94b696062cbdb66a4c5cf0bc0bb94f81ee', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 14195, sourceColumn: 2, sourceEndLine: 14195};
MERGE (n:KG {id: 'rom:frogger/audiocpu/frogger.610'}) SET n:Rom SET n += {file: 'frogger.610', offset: 4096, size: 2048, crc: '31d7eb27', sha1: '2e1d34ae4da385fd7cac94707d25eeddf4604e1a', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 14196, sourceColumn: 2, sourceEndLine: 14196};
MERGE (n:KG {id: 'region:frogger/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 4096, flags: '0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 9757, sourceColumn: 2, sourceEndLine: 9757};
MERGE (n:KG {id: 'rom:frogger/gfx1/frogger.607'}) SET n:Rom SET n += {file: 'frogger.607', offset: 0, size: 2048, crc: '05f7d883', sha1: '78831fd287da18928651a8adb7e578d291493eff', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 14199, sourceColumn: 2, sourceEndLine: 14199};
MERGE (n:KG {id: 'rom:frogger/gfx1/frogger.606'}) SET n:Rom SET n += {file: 'frogger.606', offset: 2048, size: 2048, crc: 'f524ee30', sha1: 'dd768967add61467baa08d5929001f157d6cd911', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 14200, sourceColumn: 2, sourceEndLine: 14200};
MERGE (n:KG {id: 'region:frogger/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 32, flags: '0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 9761, sourceColumn: 2, sourceEndLine: 9761};
MERGE (n:KG {id: 'rom:frogger/proms/pr-91.6l'}) SET n:Rom SET n += {file: 'pr-91.6l', offset: 0, size: 32, crc: '413703bf', sha1: '66648b2b28d3dcbda5bdb2605d1977428939dd3c', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 14203, sourceColumn: 2, sourceEndLine: 14203};
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
MERGE (n:KG {id: 'handler:generic_latch_8_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 8335, sourceColumn: 2, sourceEndLine: 8335};
MERGE (n:KG {id: 'handler:galaxian_state.coin_count_1_w'}) SET n:Handler SET n += {method: 'coin_count_1_w', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 816, sourceColumn: 1, sourceEndLine: 819, sourceParameters: 'uint8_t data', sourceBody: 'machine().bookkeeping().coin_counter_w(1, data & 1);'};
MERGE (n:KG {id: 'map:galaxian_state.frogger_map'}) SET n:AddressMap SET n += {cls: 'galaxian_state', name: 'frogger_map', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2416, sourceColumn: 1, sourceEndLine: 2430, unmapHigh: true};
MERGE (n:KG {id: 'map:galaxian_state.frogger_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 16383, raw: 'map(0x0000, 0x3fff).rom()', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2419, sourceColumn: 2, sourceEndLine: 2419, rom: true};
MERGE (n:KG {id: 'map:galaxian_state.frogger_map/range1'}) SET n:AddressRange SET n += {start: 32768, end: 34815, raw: 'map(0x8000, 0x87ff).ram()', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2420, sourceColumn: 2, sourceEndLine: 2420, ram: true};
MERGE (n:KG {id: 'map:galaxian_state.frogger_map/range2'}) SET n:AddressRange SET n += {start: 34816, end: 34816, raw: 'map(0x8800, 0x8800).mirror(0x07ff).r("watchdog", FUNC(watchdog_timer_device::reset_r))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2421, sourceColumn: 2, sourceEndLine: 2421, mirror: 2047};
MERGE (n:KG {id: 'map:galaxian_state.frogger_map/range3'}) SET n:AddressRange SET n += {start: 43008, end: 44031, raw: 'map(0xa800, 0xabff).mirror(0x0400).ram().w(FUNC(galaxian_state::galaxian_videoram_w)).share("videoram")', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2422, sourceColumn: 2, sourceEndLine: 2422, mirror: 1024, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'map:galaxian_state.frogger_map/range4'}) SET n:AddressRange SET n += {start: 45056, end: 45311, raw: 'map(0xb000, 0xb0ff).mirror(0x0700).ram().w(FUNC(galaxian_state::galaxian_objram_w)).share("spriteram")', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2423, sourceColumn: 2, sourceEndLine: 2423, mirror: 1792, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:galaxian_state.frogger_map/range5'}) SET n:AddressRange SET n += {start: 47112, end: 47112, raw: 'map(0xb808, 0xb808).mirror(0x07e3).w(FUNC(galaxian_state::irq_enable_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2424, sourceColumn: 2, sourceEndLine: 2424, mirror: 2019};
MERGE (n:KG {id: 'map:galaxian_state.frogger_map/range6'}) SET n:AddressRange SET n += {start: 47116, end: 47116, raw: 'map(0xb80c, 0xb80c).mirror(0x07e3).w(FUNC(galaxian_state::galaxian_flip_screen_y_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2425, sourceColumn: 2, sourceEndLine: 2425, mirror: 2019};
MERGE (n:KG {id: 'map:galaxian_state.frogger_map/range7'}) SET n:AddressRange SET n += {start: 47120, end: 47120, raw: 'map(0xb810, 0xb810).mirror(0x07e3).w(FUNC(galaxian_state::galaxian_flip_screen_x_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2426, sourceColumn: 2, sourceEndLine: 2426, mirror: 2019};
MERGE (n:KG {id: 'map:galaxian_state.frogger_map/range8'}) SET n:AddressRange SET n += {start: 47128, end: 47128, raw: 'map(0xb818, 0xb818).mirror(0x07e3).w(FUNC(galaxian_state::coin_count_0_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2427, sourceColumn: 2, sourceEndLine: 2427, mirror: 2019};
MERGE (n:KG {id: 'map:galaxian_state.frogger_map/range9'}) SET n:AddressRange SET n += {start: 47132, end: 47132, raw: 'map(0xb81c, 0xb81c).mirror(0x07e3).w(FUNC(galaxian_state::coin_count_1_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2428, sourceColumn: 2, sourceEndLine: 2428, mirror: 2019};
MERGE (n:KG {id: 'map:galaxian_state.frogger_map/range10'}) SET n:AddressRange SET n += {start: 49152, end: 65535, raw: 'map(0xc000, 0xffff).rw(FUNC(galaxian_state::frogger_ppi8255_r), FUNC(galaxian_state::frogger_ppi8255_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2429, sourceColumn: 2, sourceEndLine: 2429};
MERGE (n:KG {id: 'handler:galaxian_state.frogger_ppi8255_r'}) SET n:Handler SET n += {method: 'frogger_ppi8255_r', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1142, sourceColumn: 1, sourceEndLine: 1149, sourceParameters: 'offs_t offset', sourceBody: '// the decoding here is very simplistic, and you can address both simultaneously
	uint8_t result = 0xff;
	if (offset & 0x1000) result &= m_ppi8255[1]->read((offset >> 1) & 3);
	if (offset & 0x2000) result &= m_ppi8255[0]->read((offset >> 1) & 3);
	return result;'};
MERGE (n:KG {id: 'handler:galaxian_state.frogger_ppi8255_w'}) SET n:Handler SET n += {method: 'frogger_ppi8255_w', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1152, sourceColumn: 1, sourceEndLine: 1157, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '// the decoding here is very simplistic, and you can address both simultaneously
	if (offset & 0x1000) m_ppi8255[1]->write((offset >> 1) & 3, data);
	if (offset & 0x2000) m_ppi8255[0]->write((offset >> 1) & 3, data);'};
MERGE (n:KG {id: 'handler:galaxian_state.konami_sound_control_w'}) SET n:Handler SET n += {method: 'konami_sound_control_w', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 855, sourceColumn: 1, sourceEndLine: 867, sourceParameters: 'uint8_t data', sourceBody: 'uint8_t old = m_konami_sound_control;
	m_konami_sound_control = data;

	/* the inverse of bit 3 clocks the flip flop to signal an INT.
	   It is automatically cleared on the acknowledge */
	if ((old & 0x08) && !(data & 0x08))
		m_audiocpu->set_input_line(0, HOLD_LINE);

	// bit 4 is sound disable
	machine().sound().system_mute(data & 0x10);'};
MERGE (n:KG {id: 'map:galaxian_state.frogger_sound_map'}) SET n:AddressMap SET n += {cls: 'galaxian_state', name: 'frogger_sound_map', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2878, sourceColumn: 1, sourceEndLine: 2884, globalMask: 32767};
MERGE (n:KG {id: 'map:galaxian_state.frogger_sound_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 8191, raw: 'map(0x0000, 0x1fff).rom()', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2881, sourceColumn: 2, sourceEndLine: 2881, rom: true};
MERGE (n:KG {id: 'map:galaxian_state.frogger_sound_map/range1'}) SET n:AddressRange SET n += {start: 16384, end: 17407, raw: 'map(0x4000, 0x43ff).mirror(0x1c00).ram()', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2882, sourceColumn: 2, sourceEndLine: 2882, mirror: 7168, ram: true};
MERGE (n:KG {id: 'map:galaxian_state.frogger_sound_map/range2'}) SET n:AddressRange SET n += {start: 24576, end: 28671, raw: 'map(0x6000, 0x6fff).mirror(0x1000).w(FUNC(galaxian_state::konami_sound_filter_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2883, sourceColumn: 2, sourceEndLine: 2883, mirror: 4096};
MERGE (n:KG {id: 'handler:galaxian_state.konami_sound_filter_w'}) SET n:Handler SET n += {method: 'konami_sound_filter_w', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 904, sourceColumn: 1, sourceEndLine: 927, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'if (m_netlist != nullptr)
	{
		// the offset is used as data, 6 channels * 2 bits each
		// AV0 .. AV5  ==> AY8910 #2 - 3C
		// AV6 .. AV11 ==> AY8910 #1 - 3D
		for (int which = 0; which < 2; which++)
		{
			if (m_ay8910[which] != nullptr)
			{
				for (int flt = 0; flt < 6; flt++)
				{
					const int fltnum = (flt + 6 * which);
					const uint8_t bit = (offset >> (flt + 6 * (1 - which))) & 1;

					// low bit goes to 0.22uF capacitor = 220000pF
					// high bit goes to 0.047uF capacitor = 47000pF
					m_filter_ctl[fltnum]->write(bit);
				}
			}
		}
	}'};
MERGE (n:KG {id: 'map:galaxian_state.frogger_sound_portmap'}) SET n:AddressMap SET n += {cls: 'galaxian_state', name: 'frogger_sound_portmap', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2886, sourceColumn: 1, sourceEndLine: 2890, globalMask: 255};
MERGE (n:KG {id: 'map:galaxian_state.frogger_sound_portmap/range0'}) SET n:AddressRange SET n += {start: 0, end: 255, raw: 'map(0x00, 0xff).rw(FUNC(galaxian_state::frogger_ay8910_r), FUNC(galaxian_state::frogger_ay8910_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2889, sourceColumn: 2, sourceEndLine: 2889};
MERGE (n:KG {id: 'handler:galaxian_state.frogger_ay8910_r'}) SET n:Handler SET n += {method: 'frogger_ay8910_r', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1160, sourceColumn: 1, sourceEndLine: 1166, sourceParameters: 'offs_t offset', sourceBody: '// the decoding here is very simplistic
	uint8_t result = 0xff;
	if (offset & 0x40) result &= m_ay8910[0]->data_r();
	return result;'};
MERGE (n:KG {id: 'handler:galaxian_state.frogger_ay8910_w'}) SET n:Handler SET n += {method: 'frogger_ay8910_w', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1169, sourceColumn: 1, sourceEndLine: 1177, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '// the decoding here is very simplistic
	// AV6,7 ==> AY8910 #1
	if (offset & 0x40)
		m_ay8910[0]->data_w(data);
	else if (offset & 0x80)
		m_ay8910[0]->address_w(data);'};
MERGE (n:KG {id: 'handler:generic_latch_8_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 8330, sourceColumn: 2, sourceEndLine: 8330};
MERGE (n:KG {id: 'handler:galaxian_state.konami_sound_timer_r'}) SET n:Handler SET n += {method: 'konami_sound_timer_r', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 870, sourceColumn: 1, sourceEndLine: 902, sourceConstants: ['KONAMI_SOUND_CLOCK=14318181'], sourceParameters: '', sourceBody: '/*
	    The timer is clocked at KONAMI_SOUND_CLOCK and cascades through a
	    series of counters. It first encounters a chained pair of 4-bit
	    counters in an LS393, which produce an effective divide-by-256. Next
	    it enters the divide-by-2 counter in an LS93, followed by the
	    divide-by-8 counter. Finally, it clocks a divide-by-5 counter in an
	    LS90, followed by the divide-by-2 counter. This produces an effective
	    period of 16*16*2*8*5*2 = 40960 clocks.

	    The clock for the sound CPU comes from output C of the first
	    divide-by-16 counter, or KONAMI_SOUND_CLOCK/8. To recover the
	    current counter index, we use the sound cpu clock times 8 mod
	    16*16*2*8*5*2.
	*/
	uint32_t cycles = (m_audiocpu->total_cycles() * 8) % (uint64_t)(16*16*2*8*5*2);
	uint8_t hibit = 0;

	// separate the high bit from the others
	if (cycles >= 16*16*2*8*5)
	{
		hibit = 1;
		cycles -= 16*16*2*8*5;
	}

	// the top bits of the counter index map to various bits here
	return (hibit << 7) |               // B7 is the output of the final divide-by-2 counter
			(BIT(cycles,14) << 6) | // B6 is the high bit of the divide-by-5 counter
			(BIT(cycles,13) << 5) | // B5 is the 2nd highest bit of the divide-by-5 counter
			(BIT(cycles,11) << 4) | // B4 is the high bit of the divide-by-8 counter
			0x0e;                   // assume remaining bits are high, except B0 which is grounded'};
MERGE (n:KG {id: 'machine:galaxian_state.galaxian_base'}) SET n:MachineConfig SET n += {cls: 'galaxian_state', name: 'galaxian_base', calls: [], startHandlers: ['galaxian_state.video_start'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7486, sourceColumn: 1, sourceEndLine: 7505};
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
MERGE (n:KG {id: 'device:galaxian_state.galaxian_base/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(GALAXIAN_PIXEL_CLOCK, GALAXIAN_HTOTAL, GALAXIAN_HBEND, GALAXIAN_HBSTART, GALAXIAN_VTOTAL, GALAXIAN_VBEND, GALAXIAN_VBSTART)', 'm_screen->set_screen_update(FUNC(galaxian_state::screen_update_galaxian))', 'm_screen->screen_vblank().set(FUNC(galaxian_state::vblank_interrupt_w))'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7498, sourceColumn: 2, sourceEndLine: 7498, configCalls: ['set_raw(18432000,1152,0,768,264,16,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [18432000, 1152, 0, 768, 264, 16, 240]};
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
MERGE (n:KG {id: 'machine:galaxian_state.konami_base'}) SET n:MachineConfig SET n += {cls: 'galaxian_state', name: 'konami_base', calls: ['galaxian_base'], startHandlers: ['galaxian_state.video_start'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7525, sourceColumn: 1, sourceEndLine: 7540};
MERGE (n:KG {id: 'device:galaxian_state.konami_base/ppi8255_0'}) SET n:Device SET n += {type: 'I8255A', tag: 'ppi8255_0', clock: null, config: ['I8255A(config, m_ppi8255[0])', 'm_ppi8255[0]->in_pa_callback().set_ioport("IN0")', 'm_ppi8255[0]->in_pb_callback().set_ioport("IN1")', 'm_ppi8255[0]->in_pc_callback().set_ioport("IN2")', 'm_ppi8255[0]->out_pc_callback().set(FUNC(galaxian_state::konami_portc_0_w))'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7529, sourceColumn: 2, sourceEndLine: 7529};
MERGE (n:KG {id: 'device:galaxian_state.konami_base/ppi8255_0/callback:ppi8255_0:0'}) SET n:Callback SET n += {signal: 'in_pa_callback', operation: 'set_ioport', raw: 'm_ppi8255[0]->in_pa_callback().set_ioport("IN0")', ownerTag: 'ppi8255_0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7530, sourceColumn: 2, sourceEndLine: 7530, targetTag: 'IN0', targetPort: 'IN0'};
MERGE (n:KG {id: 'device:galaxian_state.konami_base/ppi8255_0/callback:ppi8255_0:1'}) SET n:Callback SET n += {signal: 'in_pb_callback', operation: 'set_ioport', raw: 'm_ppi8255[0]->in_pb_callback().set_ioport("IN1")', ownerTag: 'ppi8255_0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7531, sourceColumn: 2, sourceEndLine: 7531, targetTag: 'IN1', targetPort: 'IN1'};
MERGE (n:KG {id: 'device:galaxian_state.konami_base/ppi8255_0/callback:ppi8255_0:2'}) SET n:Callback SET n += {signal: 'in_pc_callback', operation: 'set_ioport', raw: 'm_ppi8255[0]->in_pc_callback().set_ioport("IN2")', ownerTag: 'ppi8255_0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7532, sourceColumn: 2, sourceEndLine: 7532, targetTag: 'IN2', targetPort: 'IN2'};
MERGE (n:KG {id: 'device:galaxian_state.konami_base/ppi8255_0/callback:ppi8255_0:3'}) SET n:Callback SET n += {signal: 'out_pc_callback', operation: 'set', raw: 'm_ppi8255[0]->out_pc_callback().set(FUNC(galaxian_state::konami_portc_0_w))', ownerTag: 'ppi8255_0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7533, sourceColumn: 2, sourceEndLine: 7533, targetClass: 'galaxian_state', targetMethod: 'konami_portc_0_w'};
MERGE (n:KG {id: 'handler:galaxian_state.konami_portc_0_w'}) SET n:Handler SET n += {method: 'konami_portc_0_w', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 930, sourceColumn: 1, sourceEndLine: 933, sourceParameters: 'uint8_t data', sourceBody: 'logerror("%s:ppi0_portc_w = %02X\\n", machine().describe_context(), data);'};
MERGE (n:KG {id: 'device:galaxian_state.konami_base/ppi8255_1'}) SET n:Device SET n += {type: 'I8255A', tag: 'ppi8255_1', clock: null, config: ['I8255A(config, m_ppi8255[1])', 'm_ppi8255[1]->out_pa_callback().set(m_soundlatch, FUNC(generic_latch_8_device::write))', 'm_ppi8255[1]->out_pb_callback().set(FUNC(galaxian_state::konami_sound_control_w))', 'm_ppi8255[1]->in_pc_callback().set_ioport("IN3")', 'm_ppi8255[1]->out_pc_callback().set(FUNC(galaxian_state::konami_portc_1_w))'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7535, sourceColumn: 2, sourceEndLine: 7535};
MERGE (n:KG {id: 'device:galaxian_state.konami_base/ppi8255_1/callback:ppi8255_1:0'}) SET n:Callback SET n += {signal: 'out_pa_callback', operation: 'set', raw: 'm_ppi8255[1]->out_pa_callback().set(m_soundlatch, FUNC(generic_latch_8_device::write))', ownerTag: 'ppi8255_1', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7536, sourceColumn: 2, sourceEndLine: 7536, targetClass: 'generic_latch_8_device', targetMethod: 'write', targetTag: 'soundlatch'};
MERGE (n:KG {id: 'device:galaxian_state.konami_base/ppi8255_1/callback:ppi8255_1:1'}) SET n:Callback SET n += {signal: 'out_pb_callback', operation: 'set', raw: 'm_ppi8255[1]->out_pb_callback().set(FUNC(galaxian_state::konami_sound_control_w))', ownerTag: 'ppi8255_1', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7537, sourceColumn: 2, sourceEndLine: 7537, targetClass: 'galaxian_state', targetMethod: 'konami_sound_control_w'};
MERGE (n:KG {id: 'device:galaxian_state.konami_base/ppi8255_1/callback:ppi8255_1:2'}) SET n:Callback SET n += {signal: 'in_pc_callback', operation: 'set_ioport', raw: 'm_ppi8255[1]->in_pc_callback().set_ioport("IN3")', ownerTag: 'ppi8255_1', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7538, sourceColumn: 2, sourceEndLine: 7538, targetTag: 'IN3', targetPort: 'IN3'};
MERGE (n:KG {id: 'device:galaxian_state.konami_base/ppi8255_1/callback:ppi8255_1:3'}) SET n:Callback SET n += {signal: 'out_pc_callback', operation: 'set', raw: 'm_ppi8255[1]->out_pc_callback().set(FUNC(galaxian_state::konami_portc_1_w))', ownerTag: 'ppi8255_1', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7539, sourceColumn: 2, sourceEndLine: 7539, targetClass: 'galaxian_state', targetMethod: 'konami_portc_1_w'};
MERGE (n:KG {id: 'handler:galaxian_state.konami_portc_1_w'}) SET n:Handler SET n += {method: 'konami_portc_1_w', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 936, sourceColumn: 1, sourceEndLine: 939, sourceParameters: 'uint8_t data', sourceBody: 'logerror("%s:ppi1_portc_w = %02X\\n", machine().describe_context(), data);'};
MERGE (n:KG {id: 'machine:galaxian_state.konami_sound_1x_ay8910'}) SET n:MachineConfig SET n += {cls: 'galaxian_state', name: 'konami_sound_1x_ay8910', calls: [], startHandlers: ['galaxian_state.video_start'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7543, sourceColumn: 1, sourceEndLine: 7580};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/audiocpu'}) SET n:Device SET n += {type: 'Z80', tag: 'audiocpu', clock: 1789772.625, config: ['Z80(config, m_audiocpu, KONAMI_SOUND_CLOCK/8)', 'm_audiocpu->set_addrmap(AS_PROGRAM, &galaxian_state::frogger_sound_map)', 'm_audiocpu->set_addrmap(AS_IO, &galaxian_state::frogger_sound_portmap)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7546, sourceColumn: 2, sourceEndLine: 7546};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/soundlatch'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch', clock: null, config: ['GENERIC_LATCH_8(config, m_soundlatch)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7550, sourceColumn: 2, sourceEndLine: 7550};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/8910.0'}) SET n:Device SET n += {type: 'AY8910', tag: '8910.0', clock: 1789772.625, config: ['AY8910(config, m_ay8910[0], KONAMI_SOUND_CLOCK/8)', 'm_ay8910[0]->set_flags(AY8910_RESISTOR_OUTPUT)', 'm_ay8910[0]->set_resistors_load(1000.0, 1000.0, 1000.0)', 'm_ay8910[0]->port_a_read_callback().set(m_soundlatch, FUNC(generic_latch_8_device::read))', 'm_ay8910[0]->port_b_read_callback().set(FUNC(galaxian_state::frogger_sound_timer_r))', 'm_ay8910[0]->add_route(0, "konami", 1.0, 0)', 'm_ay8910[0]->add_route(1, "konami", 1.0, 1)', 'm_ay8910[0]->add_route(2, "konami", 1.0, 2)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7553, sourceColumn: 2, sourceEndLine: 7553, configCalls: ['set_flags(8)', 'set_resistors_load(1000,1000,1000)']};
MERGE (n:KG {id: 'audioroute:device:galaxian_state.konami_sound_1x_ay8910/8910.0/0'}) SET n:AudioRoute SET n += {output: '0', target: 'konami', gain: 1, input: 0, raw: 'm_ay8910[0]->add_route(0, "konami", 1.0, 0)', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7558, sourceColumn: 2, sourceEndLine: 7558};
MERGE (n:KG {id: 'audioroute:device:galaxian_state.konami_sound_1x_ay8910/8910.0/1'}) SET n:AudioRoute SET n += {output: '1', target: 'konami', gain: 1, input: 1, raw: 'm_ay8910[0]->add_route(1, "konami", 1.0, 1)', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7559, sourceColumn: 2, sourceEndLine: 7559};
MERGE (n:KG {id: 'audioroute:device:galaxian_state.konami_sound_1x_ay8910/8910.0/2'}) SET n:AudioRoute SET n += {output: '2', target: 'konami', gain: 1, input: 2, raw: 'm_ay8910[0]->add_route(2, "konami", 1.0, 2)', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7560, sourceColumn: 2, sourceEndLine: 7560};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/8910.0/callback:8910_0:0'}) SET n:Callback SET n += {signal: 'port_a_read_callback', operation: 'set', raw: 'm_ay8910[0]->port_a_read_callback().set(m_soundlatch, FUNC(generic_latch_8_device::read))', ownerTag: '8910.0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7556, sourceColumn: 2, sourceEndLine: 7556, targetClass: 'generic_latch_8_device', targetMethod: 'read', targetTag: 'soundlatch'};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/8910.0/callback:8910_0:1'}) SET n:Callback SET n += {signal: 'port_b_read_callback', operation: 'set', raw: 'm_ay8910[0]->port_b_read_callback().set(FUNC(galaxian_state::frogger_sound_timer_r))', ownerTag: '8910.0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7557, sourceColumn: 2, sourceEndLine: 7557, targetClass: 'galaxian_state', targetMethod: 'frogger_sound_timer_r'};
MERGE (n:KG {id: 'handler:galaxian_state.frogger_sound_timer_r'}) SET n:Handler SET n += {method: 'frogger_sound_timer_r', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1180, sourceColumn: 1, sourceEndLine: 1185, sourceParameters: '', sourceBody: '// same as regular Konami sound but with bits 3,5 swapped
	uint8_t konami_value = konami_sound_timer_r();
	return bitswap<8>(konami_value, 7,6,3,4,5,2,1,0);'};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/konami'}) SET n:Device SET n += {type: 'NETLIST_SOUND', tag: 'konami', clock: 48000, config: ['NETLIST_SOUND(config, "konami", 48000)
		.set_source(netlist_konami1x)
		.add_route(ALL_OUTPUTS, "speaker", 1.0)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7562, sourceColumn: 2, sourceEndLine: 7564};
MERGE (n:KG {id: 'audioroute:device:galaxian_state.konami_sound_1x_ay8910/konami/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 1, raw: 'NETLIST_SOUND(config, "konami", 48000)
		.set_source(netlist_konami1x)
		.add_route(ALL_OUTPUTS, "speaker", 1.0)', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7562, sourceColumn: 2, sourceEndLine: 7564};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/konami:ctl0'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'konami:ctl0', clock: null, config: ['NETLIST_LOGIC_INPUT(config, "konami:ctl0", "CTL0.IN", 0)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7567, sourceColumn: 2, sourceEndLine: 7567, clockExpr: '"CTL0.IN"'};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/konami:ctl1'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'konami:ctl1', clock: null, config: ['NETLIST_LOGIC_INPUT(config, "konami:ctl1", "CTL1.IN", 0)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7568, sourceColumn: 2, sourceEndLine: 7568, clockExpr: '"CTL1.IN"'};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/konami:ctl2'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'konami:ctl2', clock: null, config: ['NETLIST_LOGIC_INPUT(config, "konami:ctl2", "CTL2.IN", 0)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7569, sourceColumn: 2, sourceEndLine: 7569, clockExpr: '"CTL2.IN"'};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/konami:ctl3'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'konami:ctl3', clock: null, config: ['NETLIST_LOGIC_INPUT(config, "konami:ctl3", "CTL3.IN", 0)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7570, sourceColumn: 2, sourceEndLine: 7570, clockExpr: '"CTL3.IN"'};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/konami:ctl4'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'konami:ctl4', clock: null, config: ['NETLIST_LOGIC_INPUT(config, "konami:ctl4", "CTL4.IN", 0)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7571, sourceColumn: 2, sourceEndLine: 7571, clockExpr: '"CTL4.IN"'};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/konami:ctl5'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'konami:ctl5', clock: null, config: ['NETLIST_LOGIC_INPUT(config, "konami:ctl5", "CTL5.IN", 0)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7572, sourceColumn: 2, sourceEndLine: 7572, clockExpr: '"CTL5.IN"'};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/konami:cin0'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'konami:cin0', clock: 0, config: ['NETLIST_STREAM_INPUT(config, "konami:cin0", 0, "R_AY3D_A.R")'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7575, sourceColumn: 2, sourceEndLine: 7575};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/konami:cin1'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'konami:cin1', clock: 1, config: ['NETLIST_STREAM_INPUT(config, "konami:cin1", 1, "R_AY3D_B.R")'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7576, sourceColumn: 2, sourceEndLine: 7576};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/konami:cin2'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'konami:cin2', clock: 2, config: ['NETLIST_STREAM_INPUT(config, "konami:cin2", 2, "R_AY3D_C.R")'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7577, sourceColumn: 2, sourceEndLine: 7577};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/konami:cout0'}) SET n:Device SET n += {type: 'NETLIST_STREAM_OUTPUT', tag: 'konami:cout0', clock: 0, config: ['NETLIST_STREAM_OUTPUT(config, "konami:cout0", 0, "OUT").set_mult_offset(1.0 / 0.05, 0.0)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7579, sourceColumn: 2, sourceEndLine: 7579};
MERGE (n:KG {id: 'machine:galaxian_state.frogger'}) SET n:MachineConfig SET n += {cls: 'galaxian_state', name: 'frogger', calls: ['konami_base', 'konami_sound_1x_ay8910'], startHandlers: ['galaxian_state.video_start'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 8054, sourceColumn: 1, sourceEndLine: 8061};
MERGE (n:KG {id: 'inputs:frogger'}) SET n:InputPorts SET n += {name: 'frogger', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 5228, sourceColumn: 8, sourceEndLine: 5228};
MERGE (n:KG {id: 'inputs:frogger/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:frogger/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:frogger/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:frogger/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_SERVICE1'};
MERGE (n:KG {id: 'inputs:frogger/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:frogger/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY']};
MERGE (n:KG {id: 'inputs:frogger/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY']};
MERGE (n:KG {id: 'inputs:frogger/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_COIN2'};
MERGE (n:KG {id: 'inputs:frogger/IN0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_COIN1'};
MERGE (n:KG {id: 'inputs:frogger/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:frogger/IN1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, name: 'Lives', defaultValue: 0, settings: ['0=3', '1=5', '2=7', '3=256 (Cheat)']};
MERGE (n:KG {id: 'inputs:frogger/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:frogger/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:frogger/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:frogger/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:frogger/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_START2'};
MERGE (n:KG {id: 'inputs:frogger/IN1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_START1'};
MERGE (n:KG {id: 'inputs:frogger/IN2'}) SET n:Port SET n += {tag: 'IN2', modify: false};
MERGE (n:KG {id: 'inputs:frogger/IN2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:frogger/IN2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 6, name: 'Coinage', defaultValue: 0, settings: ['2=A 2/1 B 2/1 C 2/1', '4=A 2/1 B 1/3 C 2/1', '0=A 1/1 B 1/1 C 1/1', '6=A 1/1 B 1/6 C 1/1']};
MERGE (n:KG {id: 'inputs:frogger/IN2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 8, name: 'Cabinet', defaultValue: 0, settings: ['0=Upright', '8=Cocktail']};
MERGE (n:KG {id: 'inputs:frogger/IN2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY']};
MERGE (n:KG {id: 'inputs:frogger/IN2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:frogger/IN2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY']};
MERGE (n:KG {id: 'inputs:frogger/IN2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'inputs:frogger/IN3'}) SET n:Port SET n += {tag: 'IN3', modify: false};
MERGE (n:KG {id: 'inputs:frogger/IN3/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: false, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'gfxlayout:galaxian_charlayout'}) SET n:GfxLayout SET n += {name: 'galaxian_charlayout', width: 8, height: 8, total: 'RGN_FRAC(1,2)', planes: 2, planeOffsets: ['RGN_FRAC(0,2)', 'RGN_FRAC(1,2)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxlayout:galaxian_spritelayout'}) SET n:GfxLayout SET n += {name: 'galaxian_spritelayout', width: 16, height: 16, total: 'RGN_FRAC(1,2)', planes: 2, planeOffsets: ['RGN_FRAC(0,2)', 'RGN_FRAC(1,2)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 64, 65, 66, 67, 68, 69, 70, 71], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 128, 136, 144, 152, 160, 168, 176, 184], charIncrement: 256};
MERGE (n:KG {id: 'gfxdecode:gfx_galaxian'}) SET n:GfxDecode SET n += {name: 'gfx_galaxian', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7441, sourceColumn: 8, sourceEndLine: 7441};
MERGE (n:KG {id: 'gfxdecode:gfx_galaxian/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'galaxian_charlayout', colorBase: 0, colorCount: 8, xscale: 3, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_galaxian/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'galaxian_spritelayout', colorBase: 0, colorCount: 8, xscale: 3, yscale: 1};
MATCH (a:KG {id: 'game:frogger'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 17102, sourceColumn: 1, sourceEndLine: 17102};
MATCH (a:KG {id: 'game:frogger'}), (b:KG {id: 'machine:galaxian_state.frogger'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:frogger'}), (b:KG {id: 'inputs:frogger'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:frogger'}), (b:KG {id: 'romset:frogger'}) MERGE (a)-[r:USES_ROMSET]->(b);
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
MATCH (a:KG {id: 'machine:galaxian_state.frogger'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 8054, sourceColumn: 1, sourceEndLine: 8061};
MATCH (a:KG {id: 'machine:galaxian_state.frogger'}), (b:KG {id: 'handler:galaxian_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.frogger'}), (b:KG {id: 'machine:galaxian_state.konami_base'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.frogger'}), (b:KG {id: 'machine:galaxian_state.konami_sound_1x_ay8910'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.frogger'}), (b:KG {id: 'map:galaxian_state.frogger_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'inputs:frogger'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 5228, sourceColumn: 8, sourceEndLine: 5228};
MATCH (a:KG {id: 'inputs:frogger'}), (b:KG {id: 'inputs:frogger/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:frogger'}), (b:KG {id: 'inputs:frogger/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:frogger'}), (b:KG {id: 'inputs:frogger/IN2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:frogger'}), (b:KG {id: 'inputs:frogger/IN3'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:frogger'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 14187, sourceColumn: 1, sourceEndLine: 14187};
MATCH (a:KG {id: 'romset:frogger'}), (b:KG {id: 'region:frogger/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:frogger'}), (b:KG {id: 'region:frogger/audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:frogger'}), (b:KG {id: 'region:frogger/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:frogger'}), (b:KG {id: 'region:frogger/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:galaxian_state.video_start'}), (b:KG {id: 'handler:galaxian_state.stars_init'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:galaxian_state.video_start'}), (b:KG {id: 'handler:galaxian_state.state_save_register'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:galaxian_state.video_start'}), (b:KG {id: 'handler:galaxian_state.bg_get_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_base'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7525, sourceColumn: 1, sourceEndLine: 7540};
MATCH (a:KG {id: 'machine:galaxian_state.konami_base'}), (b:KG {id: 'handler:galaxian_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_base'}), (b:KG {id: 'machine:galaxian_state.galaxian_base'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_base'}), (b:KG {id: 'device:galaxian_state.konami_base/ppi8255_0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_base'}), (b:KG {id: 'device:galaxian_state.konami_base/ppi8255_1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_1x_ay8910'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7543, sourceColumn: 1, sourceEndLine: 7580};
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_1x_ay8910'}), (b:KG {id: 'handler:galaxian_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_1x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/audiocpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_1x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/soundlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_1x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/8910.0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_1x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/konami'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_1x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/konami:ctl0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_1x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/konami:ctl1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_1x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/konami:ctl2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_1x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/konami:ctl3'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_1x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/konami:ctl4'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_1x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/konami:ctl5'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_1x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/konami:cin0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_1x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/konami:cin1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_1x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/konami:cin2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_1x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/konami:cout0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_map'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2416, sourceColumn: 1, sourceEndLine: 2430};
MATCH (a:KG {id: 'map:galaxian_state.frogger_map'}), (b:KG {id: 'map:galaxian_state.frogger_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_map'}), (b:KG {id: 'map:galaxian_state.frogger_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_map'}), (b:KG {id: 'map:galaxian_state.frogger_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_map'}), (b:KG {id: 'map:galaxian_state.frogger_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_map'}), (b:KG {id: 'map:galaxian_state.frogger_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_map'}), (b:KG {id: 'map:galaxian_state.frogger_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_map'}), (b:KG {id: 'map:galaxian_state.frogger_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_map'}), (b:KG {id: 'map:galaxian_state.frogger_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_map'}), (b:KG {id: 'map:galaxian_state.frogger_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_map'}), (b:KG {id: 'map:galaxian_state.frogger_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_map'}), (b:KG {id: 'map:galaxian_state.frogger_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'inputs:frogger/IN0'}), (b:KG {id: 'inputs:frogger/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:frogger/IN0'}), (b:KG {id: 'inputs:frogger/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:frogger/IN0'}), (b:KG {id: 'inputs:frogger/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:frogger/IN0'}), (b:KG {id: 'inputs:frogger/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:frogger/IN0'}), (b:KG {id: 'inputs:frogger/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:frogger/IN0'}), (b:KG {id: 'inputs:frogger/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:frogger/IN0'}), (b:KG {id: 'inputs:frogger/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:frogger/IN0'}), (b:KG {id: 'inputs:frogger/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:frogger/IN1'}), (b:KG {id: 'inputs:frogger/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:frogger/IN1'}), (b:KG {id: 'inputs:frogger/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:frogger/IN1'}), (b:KG {id: 'inputs:frogger/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:frogger/IN1'}), (b:KG {id: 'inputs:frogger/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:frogger/IN1'}), (b:KG {id: 'inputs:frogger/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:frogger/IN1'}), (b:KG {id: 'inputs:frogger/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:frogger/IN1'}), (b:KG {id: 'inputs:frogger/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:frogger/IN2'}), (b:KG {id: 'inputs:frogger/IN2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:frogger/IN2'}), (b:KG {id: 'inputs:frogger/IN2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:frogger/IN2'}), (b:KG {id: 'inputs:frogger/IN2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:frogger/IN2'}), (b:KG {id: 'inputs:frogger/IN2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:frogger/IN2'}), (b:KG {id: 'inputs:frogger/IN2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:frogger/IN2'}), (b:KG {id: 'inputs:frogger/IN2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:frogger/IN2'}), (b:KG {id: 'inputs:frogger/IN2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:frogger/IN3'}), (b:KG {id: 'inputs:frogger/IN3/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:frogger/maincpu'}), (b:KG {id: 'rom:frogger/maincpu/frogger.26'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:frogger/maincpu'}), (b:KG {id: 'rom:frogger/maincpu/frogger.27'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:frogger/maincpu'}), (b:KG {id: 'rom:frogger/maincpu/frsm3.7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:frogger/audiocpu'}), (b:KG {id: 'rom:frogger/audiocpu/frogger.608'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:frogger/audiocpu'}), (b:KG {id: 'rom:frogger/audiocpu/frogger.609'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:frogger/audiocpu'}), (b:KG {id: 'rom:frogger/audiocpu/frogger.610'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:frogger/gfx1'}), (b:KG {id: 'rom:frogger/gfx1/frogger.607'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:frogger/gfx1'}), (b:KG {id: 'rom:frogger/gfx1/frogger.606'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:frogger/proms'}), (b:KG {id: 'rom:frogger/proms/pr-91.6l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7486, sourceColumn: 1, sourceEndLine: 7505};
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'handler:galaxian_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'device:galaxian_state.galaxian_base/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'device:galaxian_state.galaxian_base/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'device:galaxian_state.galaxian_base/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'gfxdecode:gfx_galaxian'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'device:galaxian_state.galaxian_base/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'device:galaxian_state.galaxian_base/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'device:galaxian_state.galaxian_base/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_base/ppi8255_0'}), (b:KG {id: 'device:galaxian_state.konami_base/ppi8255_0/callback:ppi8255_0:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_base/ppi8255_0'}), (b:KG {id: 'device:galaxian_state.konami_base/ppi8255_0/callback:ppi8255_0:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_base/ppi8255_0'}), (b:KG {id: 'device:galaxian_state.konami_base/ppi8255_0/callback:ppi8255_0:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_base/ppi8255_0'}), (b:KG {id: 'device:galaxian_state.konami_base/ppi8255_0/callback:ppi8255_0:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_base/ppi8255_1'}), (b:KG {id: 'device:galaxian_state.konami_base/ppi8255_1/callback:ppi8255_1:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_base/ppi8255_1'}), (b:KG {id: 'device:galaxian_state.konami_base/ppi8255_1/callback:ppi8255_1:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_base/ppi8255_1'}), (b:KG {id: 'device:galaxian_state.konami_base/ppi8255_1/callback:ppi8255_1:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_base/ppi8255_1'}), (b:KG {id: 'device:galaxian_state.konami_base/ppi8255_1/callback:ppi8255_1:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/audiocpu'}), (b:KG {id: 'map:galaxian_state.frogger_sound_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/audiocpu'}), (b:KG {id: 'map:galaxian_state.frogger_sound_portmap'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/8910.0'}), (b:KG {id: 'audioroute:device:galaxian_state.konami_sound_1x_ay8910/8910.0/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/8910.0'}), (b:KG {id: 'audioroute:device:galaxian_state.konami_sound_1x_ay8910/8910.0/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/8910.0'}), (b:KG {id: 'audioroute:device:galaxian_state.konami_sound_1x_ay8910/8910.0/2'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/8910.0'}), (b:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/8910.0/callback:8910_0:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/8910.0'}), (b:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/8910.0/callback:8910_0:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/konami'}), (b:KG {id: 'audioroute:device:galaxian_state.konami_sound_1x_ay8910/konami/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_map/range2'}), (b:KG {id: 'handler:watchdog_timer_device.reset_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:galaxian_state.frogger_map/range3'}), (b:KG {id: 'handler:galaxian_state.galaxian_videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_map/range4'}), (b:KG {id: 'handler:galaxian_state.galaxian_objram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_map/range5'}), (b:KG {id: 'handler:galaxian_state.irq_enable_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_map/range6'}), (b:KG {id: 'handler:galaxian_state.galaxian_flip_screen_y_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_map/range7'}), (b:KG {id: 'handler:galaxian_state.galaxian_flip_screen_x_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_map/range8'}), (b:KG {id: 'handler:galaxian_state.coin_count_0_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_map/range9'}), (b:KG {id: 'handler:galaxian_state.coin_count_1_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_map/range10'}), (b:KG {id: 'handler:galaxian_state.frogger_ppi8255_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_map/range10'}), (b:KG {id: 'handler:galaxian_state.frogger_ppi8255_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'device:galaxian_state.galaxian_base/maincpu'}), (b:KG {id: 'map:galaxian_state.galaxian_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'gfxdecode:gfx_galaxian'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7441, sourceColumn: 8, sourceEndLine: 7441};
MATCH (a:KG {id: 'gfxdecode:gfx_galaxian'}), (b:KG {id: 'gfxdecode:gfx_galaxian/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_galaxian'}), (b:KG {id: 'gfxdecode:gfx_galaxian/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:galaxian_state.galaxian_base/screen'}), (b:KG {id: 'device:galaxian_state.galaxian_base/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaxian_state.galaxian_base/screen'}), (b:KG {id: 'device:galaxian_state.galaxian_base/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_base/ppi8255_0/callback:ppi8255_0:3'}), (b:KG {id: 'handler:galaxian_state.konami_portc_0_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_base/ppi8255_1/callback:ppi8255_1:0'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_base/ppi8255_1/callback:ppi8255_1:1'}), (b:KG {id: 'handler:galaxian_state.konami_sound_control_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_base/ppi8255_1/callback:ppi8255_1:3'}), (b:KG {id: 'handler:galaxian_state.konami_portc_1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_sound_map'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2878, sourceColumn: 1, sourceEndLine: 2884};
MATCH (a:KG {id: 'map:galaxian_state.frogger_sound_map'}), (b:KG {id: 'map:galaxian_state.frogger_sound_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_sound_map'}), (b:KG {id: 'map:galaxian_state.frogger_sound_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_sound_map'}), (b:KG {id: 'map:galaxian_state.frogger_sound_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_sound_portmap'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2886, sourceColumn: 1, sourceEndLine: 2890};
MATCH (a:KG {id: 'map:galaxian_state.frogger_sound_portmap'}), (b:KG {id: 'map:galaxian_state.frogger_sound_portmap/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/8910.0/callback:8910_0:0'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/8910.0/callback:8910_0:0'}), (b:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/soundlatch'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_1x_ay8910/8910.0/callback:8910_0:1'}), (b:KG {id: 'handler:galaxian_state.frogger_sound_timer_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:galaxian_state.galaxian_flip_screen_x_w'}), (b:KG {id: 'handler:galaxian_state.stars_update_origin'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1769, sourceColumn: 1, sourceEndLine: 1773};
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map'}), (b:KG {id: 'map:galaxian_state.galaxian_map_base'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map'}), (b:KG {id: 'map:galaxian_state.galaxian_map_discrete'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_galaxian/e0'}), (b:KG {id: 'gfxlayout:galaxian_charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_galaxian/e1'}), (b:KG {id: 'gfxlayout:galaxian_spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:galaxian_state.galaxian_base/screen/callback:screen:0'}), (b:KG {id: 'handler:galaxian_state.screen_update_galaxian'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaxian_state.galaxian_base/screen/callback:screen:1'}), (b:KG {id: 'handler:galaxian_state.vblank_interrupt_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_sound_map/range2'}), (b:KG {id: 'handler:galaxian_state.konami_sound_filter_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_sound_portmap/range0'}), (b:KG {id: 'handler:galaxian_state.frogger_ay8910_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:galaxian_state.frogger_sound_portmap/range0'}), (b:KG {id: 'handler:galaxian_state.frogger_ay8910_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:galaxian_state.frogger_sound_timer_r'}), (b:KG {id: 'handler:galaxian_state.konami_sound_timer_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
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
MATCH (a:KG {id: 'gfxlayout:galaxian_charlayout'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:galaxian_spritelayout'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
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
MATCH (a:KG {id: 'handler:galaxian_sound_device.sound_w'}), (b:KG {id: 'handler:galaxian_sound_device.background_enable_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:galaxian_sound_device.sound_w'}), (b:KG {id: 'handler:galaxian_sound_device.noise_enable_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:galaxian_sound_device.sound_w'}), (b:KG {id: 'handler:galaxian_sound_device.fire_enable_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:galaxian_sound_device.sound_w'}), (b:KG {id: 'handler:galaxian_sound_device.vol_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
