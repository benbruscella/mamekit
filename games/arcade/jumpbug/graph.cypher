// mamekit knowledge graph — driver src/mame/galaxian/galaxian.cpp
// generated 2026-08-22T05:52:35.064Z
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
MERGE (n:KG {id: 'game:jumpbug'}) SET n:Game SET n += {name: 'jumpbug', year: '1981', company: 'Hoei (Rock-Ola license)', fullname: 'Jump Bug', monitor: 'ROT90', cls: 'galaxian_state', init: 'init_jumpbug', flags: 'MACHINE_SUPPORTS_SAVE | MACHINE_IMPERFECT_SOUND', kind: 'arcade', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 17068, sourceColumn: 1, sourceEndLine: 17068};
MERGE (n:KG {id: 'romset:jumpbug'}) SET n:RomSet SET n += {name: 'jumpbug', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 13779, sourceColumn: 1, sourceEndLine: 13779};
MERGE (n:KG {id: 'region:jumpbug/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 9750, sourceColumn: 2, sourceEndLine: 9750};
MERGE (n:KG {id: 'rom:jumpbug/maincpu/jb1'}) SET n:Rom SET n += {file: 'jb1', offset: 0, size: 4096, crc: '415aa1b7', sha1: '4f9edd7e9720acf085dd8910849c2f2fac5cb547', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 13781, sourceColumn: 2, sourceEndLine: 13781};
MERGE (n:KG {id: 'rom:jumpbug/maincpu/jb2'}) SET n:Rom SET n += {file: 'jb2', offset: 4096, size: 4096, crc: 'b1c27510', sha1: '66fbe0b94b6c101cb50d7a3ff78160110415dff9', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 13782, sourceColumn: 2, sourceEndLine: 13782};
MERGE (n:KG {id: 'rom:jumpbug/maincpu/jb3'}) SET n:Rom SET n += {file: 'jb3', offset: 8192, size: 4096, crc: '97c24be2', sha1: '1beb9fbc3a52610b416af8b5fee156d8b6b3125a', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 13783, sourceColumn: 2, sourceEndLine: 13783};
MERGE (n:KG {id: 'rom:jumpbug/maincpu/jb4'}) SET n:Rom SET n += {file: 'jb4', offset: 12288, size: 4096, crc: '66751d12', sha1: '26c68cfb59596ae164ee9ae4a24ddf8dc7a923a7', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 13784, sourceColumn: 2, sourceEndLine: 13784};
MERGE (n:KG {id: 'rom:jumpbug/maincpu/jb5'}) SET n:Rom SET n += {file: 'jb5', offset: 32768, size: 4096, crc: 'e2d66faf', sha1: '3dec0796642856359de57afb896cc668c0245b40', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 13785, sourceColumn: 2, sourceEndLine: 13785};
MERGE (n:KG {id: 'rom:jumpbug/maincpu/jb6'}) SET n:Rom SET n += {file: 'jb6', offset: 36864, size: 4096, crc: '49e0bdfd', sha1: '8d89d9cd7134b153264fdc49d2c68e8c14004b0d', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 13786, sourceColumn: 2, sourceEndLine: 13786};
MERGE (n:KG {id: 'rom:jumpbug/maincpu/jb7'}) SET n:Rom SET n += {file: 'jb7', offset: 40960, size: 2048, crc: '83d71302', sha1: '9292088d26ba29fbf8817df03461b8bb6bf27639', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 13787, sourceColumn: 2, sourceEndLine: 13787};
MERGE (n:KG {id: 'region:jumpbug/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 12288, flags: '0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 9757, sourceColumn: 2, sourceEndLine: 9757};
MERGE (n:KG {id: 'rom:jumpbug/gfx1/jbl'}) SET n:Rom SET n += {file: 'jbl', offset: 0, size: 2048, crc: '9a091b0a', sha1: '19b88f802ee80ff8901ef99e3688f2869f1a69c5', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 13790, sourceColumn: 2, sourceEndLine: 13790};
MERGE (n:KG {id: 'rom:jumpbug/gfx1/jbm'}) SET n:Rom SET n += {file: 'jbm', offset: 2048, size: 2048, crc: '8a0fc082', sha1: '58b72a3161950a2fb71cdab3f30bb3abb19c7978', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 13791, sourceColumn: 2, sourceEndLine: 13791};
MERGE (n:KG {id: 'rom:jumpbug/gfx1/jbn'}) SET n:Rom SET n += {file: 'jbn', offset: 4096, size: 2048, crc: '155186e0', sha1: '717ddaecc52a4ef03a01fcddb520acdbfb0d722a', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 13792, sourceColumn: 2, sourceEndLine: 13792};
MERGE (n:KG {id: 'rom:jumpbug/gfx1/jbi'}) SET n:Rom SET n += {file: 'jbi', offset: 6144, size: 2048, crc: '7749b111', sha1: '55071ce04708bd52177644298f76ae79d23f6ac9', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 13793, sourceColumn: 2, sourceEndLine: 13793};
MERGE (n:KG {id: 'rom:jumpbug/gfx1/jbj'}) SET n:Rom SET n += {file: 'jbj', offset: 8192, size: 2048, crc: '06e8d7df', sha1: 'd04f1503d9fde5aae92652cb9d2eb16bd6a0fe9c', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 13794, sourceColumn: 2, sourceEndLine: 13794};
MERGE (n:KG {id: 'rom:jumpbug/gfx1/jbk'}) SET n:Rom SET n += {file: 'jbk', offset: 10240, size: 2048, crc: 'b8dbddf3', sha1: '043de444890a93459789dc99c43ef88ff66b79e4', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 13795, sourceColumn: 2, sourceEndLine: 13795};
MERGE (n:KG {id: 'region:jumpbug/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 32, flags: '0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 9761, sourceColumn: 2, sourceEndLine: 9761};
MERGE (n:KG {id: 'rom:jumpbug/proms/l06_prom.bin'}) SET n:Rom SET n += {file: 'l06_prom.bin', offset: 0, size: 32, crc: '6a0c7d87', sha1: '140335d85c67c75b65689d4e76d29863c209cf32', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 10658, sourceColumn: 2, sourceEndLine: 10658};
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
MERGE (n:KG {id: 'handler:galaxian_state.galaxian_gfxbank_w'}) SET n:Handler SET n += {method: 'galaxian_gfxbank_w', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian_v.cpp', sourceLine: 771, sourceColumn: 1, sourceEndLine: 779, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'if (m_gfxbank[offset] != data)
	{
		m_screen->update_partial(m_screen->vpos());
		m_gfxbank[offset] = data;
		m_bg_tilemap->mark_all_dirty();
	}'};
MERGE (n:KG {id: 'handler:ay8910_device.address_w'}) SET n:Handler SET n += {method: 'address_w', ownerClass: 'ay8910_device', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2596, sourceColumn: 2, sourceEndLine: 2596};
MERGE (n:KG {id: 'handler:ay8910_device.data_w'}) SET n:Handler SET n += {method: 'data_w', ownerClass: 'ay8910_device', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2595, sourceColumn: 2, sourceEndLine: 2595};
MERGE (n:KG {id: 'map:galaxian_state.jumpbugbrf_map'}) SET n:AddressMap SET n += {cls: 'galaxian_state', name: 'jumpbugbrf_map', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2569, sourceColumn: 1, sourceEndLine: 2587, unmapHigh: true};
MERGE (n:KG {id: 'map:galaxian_state.jumpbugbrf_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 16383, raw: 'map(0x0000, 0x3fff).rom()', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2572, sourceColumn: 2, sourceEndLine: 2572, rom: true};
MERGE (n:KG {id: 'map:galaxian_state.jumpbugbrf_map/range1'}) SET n:AddressRange SET n += {start: 16384, end: 18431, raw: 'map(0x4000, 0x47ff).ram()', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2573, sourceColumn: 2, sourceEndLine: 2573, ram: true};
MERGE (n:KG {id: 'map:galaxian_state.jumpbugbrf_map/range2'}) SET n:AddressRange SET n += {start: 18432, end: 19455, raw: 'map(0x4800, 0x4bff).mirror(0x0400).ram().w(FUNC(galaxian_state::galaxian_videoram_w)).share("videoram")', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2574, sourceColumn: 2, sourceEndLine: 2574, mirror: 1024, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'map:galaxian_state.jumpbugbrf_map/range3'}) SET n:AddressRange SET n += {start: 20480, end: 20735, raw: 'map(0x5000, 0x50ff).mirror(0x0700).ram().w(FUNC(galaxian_state::galaxian_objram_w)).share("spriteram")', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2575, sourceColumn: 2, sourceEndLine: 2575, mirror: 1792, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:galaxian_state.jumpbugbrf_map/range4'}) SET n:AddressRange SET n += {start: 24576, end: 24576, raw: 'map(0x6000, 0x6000).mirror(0x07ff).portr("IN0")', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2576, sourceColumn: 2, sourceEndLine: 2576, mirror: 2047, portRead: 'IN0'};
MERGE (n:KG {id: 'map:galaxian_state.jumpbugbrf_map/range5'}) SET n:AddressRange SET n += {start: 24578, end: 24582, raw: 'map(0x6002, 0x6006).mirror(0x07f8).w(FUNC(galaxian_state::galaxian_gfxbank_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2577, sourceColumn: 2, sourceEndLine: 2577, mirror: 2040};
MERGE (n:KG {id: 'map:galaxian_state.jumpbugbrf_map/range6'}) SET n:AddressRange SET n += {start: 26624, end: 26624, raw: 'map(0x6800, 0x6800).mirror(0x07ff).portr("IN1")', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2578, sourceColumn: 2, sourceEndLine: 2578, mirror: 2047, portRead: 'IN1'};
MERGE (n:KG {id: 'map:galaxian_state.jumpbugbrf_map/range7'}) SET n:AddressRange SET n += {start: 28672, end: 28672, raw: 'map(0x7000, 0x7000).mirror(0x07ff).portr("IN2")', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2579, sourceColumn: 2, sourceEndLine: 2579, mirror: 2047, portRead: 'IN2'};
MERGE (n:KG {id: 'map:galaxian_state.jumpbugbrf_map/range8'}) SET n:AddressRange SET n += {start: 28673, end: 28673, raw: 'map(0x7001, 0x7001).mirror(0x07f8).w(FUNC(galaxian_state::irq_enable_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2580, sourceColumn: 2, sourceEndLine: 2580, mirror: 2040};
MERGE (n:KG {id: 'map:galaxian_state.jumpbugbrf_map/range9'}) SET n:AddressRange SET n += {start: 28674, end: 28674, raw: 'map(0x7002, 0x7002).mirror(0x07f8).w(FUNC(galaxian_state::coin_count_0_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2581, sourceColumn: 2, sourceEndLine: 2581, mirror: 2040};
MERGE (n:KG {id: 'map:galaxian_state.jumpbugbrf_map/range10'}) SET n:AddressRange SET n += {start: 28676, end: 28676, raw: 'map(0x7004, 0x7004).mirror(0x07f8).w(FUNC(galaxian_state::galaxian_stars_enable_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2582, sourceColumn: 2, sourceEndLine: 2582, mirror: 2040};
MERGE (n:KG {id: 'map:galaxian_state.jumpbugbrf_map/range11'}) SET n:AddressRange SET n += {start: 28678, end: 28678, raw: 'map(0x7006, 0x7006).mirror(0x07f8).w(FUNC(galaxian_state::galaxian_flip_screen_x_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2583, sourceColumn: 2, sourceEndLine: 2583, mirror: 2040};
MERGE (n:KG {id: 'map:galaxian_state.jumpbugbrf_map/range12'}) SET n:AddressRange SET n += {start: 28679, end: 28679, raw: 'map(0x7007, 0x7007).mirror(0x07f8).w(FUNC(galaxian_state::galaxian_flip_screen_y_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2584, sourceColumn: 2, sourceEndLine: 2584, mirror: 2040};
MERGE (n:KG {id: 'map:galaxian_state.jumpbugbrf_map/range13'}) SET n:AddressRange SET n += {start: 32768, end: 45055, raw: 'map(0x8000, 0xafff).rom()', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2585, sourceColumn: 2, sourceEndLine: 2585, rom: true};
MERGE (n:KG {id: 'map:galaxian_state.jumpbugbrf_map/range14'}) SET n:AddressRange SET n += {start: 45056, end: 49151, raw: 'map(0xb000, 0xbfff).r(FUNC(galaxian_state::jumpbug_protection_r))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2586, sourceColumn: 2, sourceEndLine: 2586};
MERGE (n:KG {id: 'handler:galaxian_state.jumpbug_protection_r'}) SET n:Handler SET n += {method: 'jumpbug_protection_r', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1536, sourceColumn: 1, sourceEndLine: 1548, sourceParameters: 'offs_t offset', sourceBody: 'switch (offset)
	{
		case 0x0114:  return 0x4f;
		case 0x0118:  return 0xd3;
		case 0x0214:  return 0xcf;
		case 0x0235:  return 0x02;
		case 0x0311:  return 0xff;  // not checked
	}
	logerror("Unknown protection read. Offset: %04X  PC=%04X\\n",0xb000+offset,m_maincpu->pc());
	return 0xff;'};
MERGE (n:KG {id: 'map:galaxian_state.jumpbug_map'}) SET n:AddressMap SET n += {cls: 'galaxian_state', name: 'jumpbug_map', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2592, sourceColumn: 1, sourceEndLine: 2597, calls: ['jumpbugbrf_map']};
MERGE (n:KG {id: 'map:galaxian_state.jumpbug_map/range0'}) SET n:AddressRange SET n += {start: 22528, end: 22528, raw: 'map(0x5800, 0x5800).mirror(0x00ff).w("8910.0", FUNC(ay8910_device::data_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2595, sourceColumn: 2, sourceEndLine: 2595, mirror: 255};
MERGE (n:KG {id: 'map:galaxian_state.jumpbug_map/range1'}) SET n:AddressRange SET n += {start: 22784, end: 22784, raw: 'map(0x5900, 0x5900).mirror(0x00ff).w("8910.0", FUNC(ay8910_device::address_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2596, sourceColumn: 2, sourceEndLine: 2596, mirror: 255};
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
MERGE (n:KG {id: 'machine:galaxian_state.jumpbugbrf'}) SET n:MachineConfig SET n += {cls: 'galaxian_state', name: 'jumpbugbrf', calls: ['galaxian_base'], startHandlers: ['galaxian_state.video_start'], removedDevices: ['watchdog'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7959, sourceColumn: 1, sourceEndLine: 7967};
MERGE (n:KG {id: 'machine:galaxian_state.jumpbug'}) SET n:MachineConfig SET n += {cls: 'galaxian_state', name: 'jumpbug', calls: ['jumpbugbrf'], startHandlers: ['galaxian_state.video_start'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7969, sourceColumn: 1, sourceEndLine: 7978};
MERGE (n:KG {id: 'device:galaxian_state.jumpbug/8910.0'}) SET n:Device SET n += {type: 'AY8910', tag: '8910.0', clock: 1536000, config: ['AY8910(config, m_ay8910[0], GALAXIAN_PIXEL_CLOCK/3/2/2).add_route(ALL_OUTPUTS, "speaker", 0.5)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7977, sourceColumn: 2, sourceEndLine: 7977};
MERGE (n:KG {id: 'audioroute:device:galaxian_state.jumpbug/8910.0/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.5, raw: 'AY8910(config, m_ay8910[0], GALAXIAN_PIXEL_CLOCK/3/2/2).add_route(ALL_OUTPUTS, "speaker", 0.5)', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7977, sourceColumn: 2, sourceEndLine: 7977};
MERGE (n:KG {id: 'inputs:jumpbug'}) SET n:InputPorts SET n += {name: 'jumpbug', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 4913, sourceColumn: 8, sourceEndLine: 4913};
MERGE (n:KG {id: 'inputs:jumpbug/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:jumpbug/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_COIN1'};
MERGE (n:KG {id: 'inputs:jumpbug/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:jumpbug/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY']};
MERGE (n:KG {id: 'inputs:jumpbug/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY']};
MERGE (n:KG {id: 'inputs:jumpbug/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_BUTTON1'};
MERGE (n:KG {id: 'inputs:jumpbug/IN0/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 32, name: 'Cabinet', defaultValue: 0, settings: ['0=Upright', '32=Cocktail']};
MERGE (n:KG {id: 'inputs:jumpbug/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY']};
MERGE (n:KG {id: 'inputs:jumpbug/IN0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY']};
MERGE (n:KG {id: 'inputs:jumpbug/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:jumpbug/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_START1'};
MERGE (n:KG {id: 'inputs:jumpbug/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_START2'};
MERGE (n:KG {id: 'inputs:jumpbug/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:jumpbug/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:jumpbug/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:jumpbug/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_COIN2'};
MERGE (n:KG {id: 'inputs:jumpbug/IN1/f6'}) SET n:PortField SET n += {kind: 'dip', mask: 64, name: 'Difficulty', defaultValue: 0, settings: ['0=Easy', '64=Hard']};
MERGE (n:KG {id: 'inputs:jumpbug/IN1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:jumpbug/IN2'}) SET n:Port SET n += {tag: 'IN2', modify: false};
MERGE (n:KG {id: 'inputs:jumpbug/IN2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, name: 'Lives', defaultValue: 1, settings: ['1=3', '2=4', '3=5', '0=Infinite (Cheat)']};
MERGE (n:KG {id: 'inputs:jumpbug/IN2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 12, name: 'Coinage', defaultValue: 0, settings: ['4=A 2C/1C  B 2C/1C', '8=A 2C/1C  B 1C/3C', '0=A 1C/1C  B 1C/1C', '12=A 1C/1C  B 1C/6C']};
MERGE (n:KG {id: 'inputs:jumpbug/IN2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 240, activeLow: false, type: 'IPT_UNUSED'};
MERGE (n:KG {id: 'gfxlayout:galaxian_charlayout'}) SET n:GfxLayout SET n += {name: 'galaxian_charlayout', width: 8, height: 8, total: 'RGN_FRAC(1,2)', planes: 2, planeOffsets: ['RGN_FRAC(0,2)', 'RGN_FRAC(1,2)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxlayout:galaxian_spritelayout'}) SET n:GfxLayout SET n += {name: 'galaxian_spritelayout', width: 16, height: 16, total: 'RGN_FRAC(1,2)', planes: 2, planeOffsets: ['RGN_FRAC(0,2)', 'RGN_FRAC(1,2)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 64, 65, 66, 67, 68, 69, 70, 71], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 128, 136, 144, 152, 160, 168, 176, 184], charIncrement: 256};
MERGE (n:KG {id: 'gfxdecode:gfx_galaxian'}) SET n:GfxDecode SET n += {name: 'gfx_galaxian', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7441, sourceColumn: 8, sourceEndLine: 7441};
MERGE (n:KG {id: 'gfxdecode:gfx_galaxian/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'galaxian_charlayout', colorBase: 0, colorCount: 8, xscale: 3, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_galaxian/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'galaxian_spritelayout', colorBase: 0, colorCount: 8, xscale: 3, yscale: 1};
MATCH (a:KG {id: 'game:jumpbug'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 17068, sourceColumn: 1, sourceEndLine: 17068};
MATCH (a:KG {id: 'game:jumpbug'}), (b:KG {id: 'machine:galaxian_state.jumpbug'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:jumpbug'}), (b:KG {id: 'inputs:jumpbug'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:jumpbug'}), (b:KG {id: 'romset:jumpbug'}) MERGE (a)-[r:USES_ROMSET]->(b);
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
MATCH (a:KG {id: 'machine:galaxian_state.jumpbug'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7969, sourceColumn: 1, sourceEndLine: 7978};
MATCH (a:KG {id: 'machine:galaxian_state.jumpbug'}), (b:KG {id: 'handler:galaxian_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.jumpbug'}), (b:KG {id: 'machine:galaxian_state.jumpbugbrf'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.jumpbug'}), (b:KG {id: 'map:galaxian_state.jumpbug_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:galaxian_state.jumpbug'}), (b:KG {id: 'device:galaxian_state.jumpbug/8910.0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:jumpbug'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 4913, sourceColumn: 8, sourceEndLine: 4913};
MATCH (a:KG {id: 'inputs:jumpbug'}), (b:KG {id: 'inputs:jumpbug/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:jumpbug'}), (b:KG {id: 'inputs:jumpbug/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:jumpbug'}), (b:KG {id: 'inputs:jumpbug/IN2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:jumpbug'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 13779, sourceColumn: 1, sourceEndLine: 13779};
MATCH (a:KG {id: 'romset:jumpbug'}), (b:KG {id: 'region:jumpbug/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:jumpbug'}), (b:KG {id: 'region:jumpbug/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:jumpbug'}), (b:KG {id: 'region:jumpbug/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:galaxian_state.video_start'}), (b:KG {id: 'handler:galaxian_state.stars_init'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:galaxian_state.video_start'}), (b:KG {id: 'handler:galaxian_state.state_save_register'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:galaxian_state.video_start'}), (b:KG {id: 'handler:galaxian_state.bg_get_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.jumpbugbrf'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7959, sourceColumn: 1, sourceEndLine: 7967};
MATCH (a:KG {id: 'machine:galaxian_state.jumpbugbrf'}), (b:KG {id: 'handler:galaxian_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.jumpbugbrf'}), (b:KG {id: 'machine:galaxian_state.galaxian_base'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.jumpbugbrf'}), (b:KG {id: 'map:galaxian_state.jumpbugbrf_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'map:galaxian_state.jumpbug_map'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2592, sourceColumn: 1, sourceEndLine: 2597};
MATCH (a:KG {id: 'map:galaxian_state.jumpbug_map'}), (b:KG {id: 'map:galaxian_state.jumpbugbrf_map'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbug_map'}), (b:KG {id: 'map:galaxian_state.jumpbug_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbug_map'}), (b:KG {id: 'map:galaxian_state.jumpbug_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:galaxian_state.jumpbug/8910.0'}), (b:KG {id: 'audioroute:device:galaxian_state.jumpbug/8910.0/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:jumpbug/IN0'}), (b:KG {id: 'inputs:jumpbug/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:jumpbug/IN0'}), (b:KG {id: 'inputs:jumpbug/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:jumpbug/IN0'}), (b:KG {id: 'inputs:jumpbug/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:jumpbug/IN0'}), (b:KG {id: 'inputs:jumpbug/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:jumpbug/IN0'}), (b:KG {id: 'inputs:jumpbug/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:jumpbug/IN0'}), (b:KG {id: 'inputs:jumpbug/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:jumpbug/IN0'}), (b:KG {id: 'inputs:jumpbug/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:jumpbug/IN0'}), (b:KG {id: 'inputs:jumpbug/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:jumpbug/IN1'}), (b:KG {id: 'inputs:jumpbug/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:jumpbug/IN1'}), (b:KG {id: 'inputs:jumpbug/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:jumpbug/IN1'}), (b:KG {id: 'inputs:jumpbug/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:jumpbug/IN1'}), (b:KG {id: 'inputs:jumpbug/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:jumpbug/IN1'}), (b:KG {id: 'inputs:jumpbug/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:jumpbug/IN1'}), (b:KG {id: 'inputs:jumpbug/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:jumpbug/IN1'}), (b:KG {id: 'inputs:jumpbug/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:jumpbug/IN1'}), (b:KG {id: 'inputs:jumpbug/IN1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:jumpbug/IN2'}), (b:KG {id: 'inputs:jumpbug/IN2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:jumpbug/IN2'}), (b:KG {id: 'inputs:jumpbug/IN2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:jumpbug/IN2'}), (b:KG {id: 'inputs:jumpbug/IN2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:jumpbug/maincpu'}), (b:KG {id: 'rom:jumpbug/maincpu/jb1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:jumpbug/maincpu'}), (b:KG {id: 'rom:jumpbug/maincpu/jb2'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:jumpbug/maincpu'}), (b:KG {id: 'rom:jumpbug/maincpu/jb3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:jumpbug/maincpu'}), (b:KG {id: 'rom:jumpbug/maincpu/jb4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:jumpbug/maincpu'}), (b:KG {id: 'rom:jumpbug/maincpu/jb5'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:jumpbug/maincpu'}), (b:KG {id: 'rom:jumpbug/maincpu/jb6'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:jumpbug/maincpu'}), (b:KG {id: 'rom:jumpbug/maincpu/jb7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:jumpbug/gfx1'}), (b:KG {id: 'rom:jumpbug/gfx1/jbl'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:jumpbug/gfx1'}), (b:KG {id: 'rom:jumpbug/gfx1/jbm'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:jumpbug/gfx1'}), (b:KG {id: 'rom:jumpbug/gfx1/jbn'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:jumpbug/gfx1'}), (b:KG {id: 'rom:jumpbug/gfx1/jbi'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:jumpbug/gfx1'}), (b:KG {id: 'rom:jumpbug/gfx1/jbj'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:jumpbug/gfx1'}), (b:KG {id: 'rom:jumpbug/gfx1/jbk'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:jumpbug/proms'}), (b:KG {id: 'rom:jumpbug/proms/l06_prom.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7486, sourceColumn: 1, sourceEndLine: 7505};
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'handler:galaxian_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'device:galaxian_state.galaxian_base/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'device:galaxian_state.galaxian_base/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'gfxdecode:gfx_galaxian'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'device:galaxian_state.galaxian_base/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'device:galaxian_state.galaxian_base/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.galaxian_base'}), (b:KG {id: 'device:galaxian_state.galaxian_base/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2569, sourceColumn: 1, sourceEndLine: 2587};
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map'}), (b:KG {id: 'map:galaxian_state.jumpbugbrf_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map'}), (b:KG {id: 'map:galaxian_state.jumpbugbrf_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map'}), (b:KG {id: 'map:galaxian_state.jumpbugbrf_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map'}), (b:KG {id: 'map:galaxian_state.jumpbugbrf_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map'}), (b:KG {id: 'map:galaxian_state.jumpbugbrf_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map'}), (b:KG {id: 'map:galaxian_state.jumpbugbrf_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map'}), (b:KG {id: 'map:galaxian_state.jumpbugbrf_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map'}), (b:KG {id: 'map:galaxian_state.jumpbugbrf_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map'}), (b:KG {id: 'map:galaxian_state.jumpbugbrf_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map'}), (b:KG {id: 'map:galaxian_state.jumpbugbrf_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map'}), (b:KG {id: 'map:galaxian_state.jumpbugbrf_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map'}), (b:KG {id: 'map:galaxian_state.jumpbugbrf_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map'}), (b:KG {id: 'map:galaxian_state.jumpbugbrf_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map'}), (b:KG {id: 'map:galaxian_state.jumpbugbrf_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map'}), (b:KG {id: 'map:galaxian_state.jumpbugbrf_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbug_map/range0'}), (b:KG {id: 'handler:ay8910_device.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: '8910.0'};
MATCH (a:KG {id: 'map:galaxian_state.jumpbug_map/range1'}), (b:KG {id: 'handler:ay8910_device.address_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: '8910.0'};
MATCH (a:KG {id: 'device:galaxian_state.galaxian_base/maincpu'}), (b:KG {id: 'map:galaxian_state.galaxian_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'gfxdecode:gfx_galaxian'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7441, sourceColumn: 8, sourceEndLine: 7441};
MATCH (a:KG {id: 'gfxdecode:gfx_galaxian'}), (b:KG {id: 'gfxdecode:gfx_galaxian/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_galaxian'}), (b:KG {id: 'gfxdecode:gfx_galaxian/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:galaxian_state.galaxian_base/screen'}), (b:KG {id: 'device:galaxian_state.galaxian_base/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaxian_state.galaxian_base/screen'}), (b:KG {id: 'device:galaxian_state.galaxian_base/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map/range2'}), (b:KG {id: 'handler:galaxian_state.galaxian_videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map/range3'}), (b:KG {id: 'handler:galaxian_state.galaxian_objram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map/range5'}), (b:KG {id: 'handler:galaxian_state.galaxian_gfxbank_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map/range8'}), (b:KG {id: 'handler:galaxian_state.irq_enable_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map/range9'}), (b:KG {id: 'handler:galaxian_state.coin_count_0_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map/range10'}), (b:KG {id: 'handler:galaxian_state.galaxian_stars_enable_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map/range11'}), (b:KG {id: 'handler:galaxian_state.galaxian_flip_screen_x_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map/range12'}), (b:KG {id: 'handler:galaxian_state.galaxian_flip_screen_y_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.jumpbugbrf_map/range14'}), (b:KG {id: 'handler:galaxian_state.jumpbug_protection_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1769, sourceColumn: 1, sourceEndLine: 1773};
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map'}), (b:KG {id: 'map:galaxian_state.galaxian_map_base'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map'}), (b:KG {id: 'map:galaxian_state.galaxian_map_discrete'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_galaxian/e0'}), (b:KG {id: 'gfxlayout:galaxian_charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_galaxian/e1'}), (b:KG {id: 'gfxlayout:galaxian_spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:galaxian_state.galaxian_base/screen/callback:screen:0'}), (b:KG {id: 'handler:galaxian_state.screen_update_galaxian'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaxian_state.galaxian_base/screen/callback:screen:1'}), (b:KG {id: 'handler:galaxian_state.vblank_interrupt_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:galaxian_state.galaxian_flip_screen_x_w'}), (b:KG {id: 'handler:galaxian_state.stars_update_origin'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
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
