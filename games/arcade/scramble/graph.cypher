// mamekit knowledge graph — driver src/mame/galaxian/galaxian.cpp
// generated 2026-09-05T03:50:12.154Z
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
MERGE (n:KG {id: 'game:scramble'}) SET n:Game SET n += {name: 'scramble', year: '1981', company: 'Konami', fullname: 'Scramble', monitor: 'ROT90', cls: 'galaxian_state', init: 'init_scramble', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 17153, sourceColumn: 1, sourceEndLine: 17153};
MERGE (n:KG {id: 'romset:scramble'}) SET n:RomSet SET n += {name: 'scramble', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 15096, sourceColumn: 1, sourceEndLine: 15096};
MERGE (n:KG {id: 'region:scramble/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 9750, sourceColumn: 2, sourceEndLine: 9750};
MERGE (n:KG {id: 'rom:scramble/maincpu/s1.2d'}) SET n:Rom SET n += {file: 's1.2d', offset: 0, size: 2048, crc: 'ea35ccaa', sha1: '1dcb375987fe21e0483c27d485c405de53848d61', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 15098, sourceColumn: 2, sourceEndLine: 15098};
MERGE (n:KG {id: 'rom:scramble/maincpu/s2.2e'}) SET n:Rom SET n += {file: 's2.2e', offset: 2048, size: 2048, crc: 'e7bba1b3', sha1: '240877576045fddcc9ff01d97dc78139454ac4f1', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 15099, sourceColumn: 2, sourceEndLine: 15099};
MERGE (n:KG {id: 'rom:scramble/maincpu/s3.2f'}) SET n:Rom SET n += {file: 's3.2f', offset: 4096, size: 2048, crc: '12d7fc3e', sha1: 'a84d191c7be8700f630a83ddad798be9e83b5d55', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 15100, sourceColumn: 2, sourceEndLine: 15100};
MERGE (n:KG {id: 'rom:scramble/maincpu/s4.2h'}) SET n:Rom SET n += {file: 's4.2h', offset: 6144, size: 2048, crc: 'b59360eb', sha1: '5d155808c19dcf2e14aa8e29c0ee41a6d3d3c43a', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 15101, sourceColumn: 2, sourceEndLine: 15101};
MERGE (n:KG {id: 'rom:scramble/maincpu/s5.2j'}) SET n:Rom SET n += {file: 's5.2j', offset: 8192, size: 2048, crc: '4919a91c', sha1: '9cb5861c61e4783e5fbaa3869d51195f127b1129', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 15102, sourceColumn: 2, sourceEndLine: 15102};
MERGE (n:KG {id: 'rom:scramble/maincpu/s6.2l'}) SET n:Rom SET n += {file: 's6.2l', offset: 10240, size: 2048, crc: '26a4547b', sha1: '67c0fa81729370631647b5d78bb5a61433facd7f', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 15103, sourceColumn: 2, sourceEndLine: 15103};
MERGE (n:KG {id: 'rom:scramble/maincpu/s7.2m'}) SET n:Rom SET n += {file: 's7.2m', offset: 12288, size: 2048, crc: '0bb49470', sha1: '05a6fe3010c2136284ca76352dac147797c79778', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 15104, sourceColumn: 2, sourceEndLine: 15104};
MERGE (n:KG {id: 'rom:scramble/maincpu/s8.2p'}) SET n:Rom SET n += {file: 's8.2p', offset: 14336, size: 2048, crc: '6a5740e5', sha1: 'e3b09141cee26857d626412e9d1a0e759469b97a', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 15105, sourceColumn: 2, sourceEndLine: 15105};
MERGE (n:KG {id: 'region:scramble/audiocpu'}) SET n:RomRegion SET n += {tag: 'audiocpu', size: 65536, flags: '0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 13954, sourceColumn: 2, sourceEndLine: 13954};
MERGE (n:KG {id: 'rom:scramble/audiocpu/ot1.5c'}) SET n:Rom SET n += {file: 'ot1.5c', offset: 0, size: 2048, crc: 'bcd297f0', sha1: '8ed78487d76fd0a917ab7b258937a46e2cd9800c', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 15108, sourceColumn: 2, sourceEndLine: 15108};
MERGE (n:KG {id: 'rom:scramble/audiocpu/ot2.5d'}) SET n:Rom SET n += {file: 'ot2.5d', offset: 2048, size: 2048, crc: 'de7912da', sha1: '8558b4eff5d7e63029b325edef9914feda5834c3', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 15109, sourceColumn: 2, sourceEndLine: 15109};
MERGE (n:KG {id: 'rom:scramble/audiocpu/ot3.5e'}) SET n:Rom SET n += {file: 'ot3.5e', offset: 4096, size: 2048, crc: 'ba2fa933', sha1: '1f976d8595706730e29f93027e7ab4620075c078', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 15110, sourceColumn: 2, sourceEndLine: 15110};
MERGE (n:KG {id: 'region:scramble/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 4096, flags: '0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 9757, sourceColumn: 2, sourceEndLine: 9757};
MERGE (n:KG {id: 'rom:scramble/gfx1/c2.5f'}) SET n:Rom SET n += {file: 'c2.5f', offset: 0, size: 2048, crc: '4708845b', sha1: 'a8b1ad19a95a9d35050a2ab7194cc96fc5afcdc9', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 14612, sourceColumn: 2, sourceEndLine: 14612};
MERGE (n:KG {id: 'rom:scramble/gfx1/c1.5h'}) SET n:Rom SET n += {file: 'c1.5h', offset: 2048, size: 2048, crc: '11fd2887', sha1: '69844e48bb4d372cac7ae83c953df573c7ecbb7f', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 15114, sourceColumn: 2, sourceEndLine: 15114};
MERGE (n:KG {id: 'region:scramble/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 32, flags: '0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 9761, sourceColumn: 2, sourceEndLine: 9761};
MERGE (n:KG {id: 'rom:scramble/proms/c01s.6e'}) SET n:Rom SET n += {file: 'c01s.6e', offset: 0, size: 32, crc: '4e3caeab', sha1: 'a25083c3e36d28afdefe4af6e6d4f3155e303625', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 15117, sourceColumn: 2, sourceEndLine: 15117};
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
MERGE (n:KG {id: 'map:galaxian_state.theend_map'}) SET n:AddressMap SET n += {cls: 'galaxian_state', name: 'theend_map', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2100, sourceColumn: 1, sourceEndLine: 2116, unmapHigh: true};
MERGE (n:KG {id: 'map:galaxian_state.theend_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 16383, raw: 'map(0x0000, 0x3fff).rom()', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2103, sourceColumn: 2, sourceEndLine: 2103, rom: true};
MERGE (n:KG {id: 'map:galaxian_state.theend_map/range1'}) SET n:AddressRange SET n += {start: 16384, end: 18431, raw: 'map(0x4000, 0x47ff).ram()', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2104, sourceColumn: 2, sourceEndLine: 2104, ram: true};
MERGE (n:KG {id: 'map:galaxian_state.theend_map/range2'}) SET n:AddressRange SET n += {start: 18432, end: 19455, raw: 'map(0x4800, 0x4bff).mirror(0x0400).ram().w(FUNC(galaxian_state::galaxian_videoram_w)).share("videoram")', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2105, sourceColumn: 2, sourceEndLine: 2105, mirror: 1024, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'map:galaxian_state.theend_map/range3'}) SET n:AddressRange SET n += {start: 20480, end: 20735, raw: 'map(0x5000, 0x50ff).mirror(0x0700).ram().w(FUNC(galaxian_state::galaxian_objram_w)).share("spriteram")', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2106, sourceColumn: 2, sourceEndLine: 2106, mirror: 1792, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:galaxian_state.theend_map/range4'}) SET n:AddressRange SET n += {start: 26625, end: 26625, raw: 'map(0x6801, 0x6801).mirror(0x07f8).w(FUNC(galaxian_state::irq_enable_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2107, sourceColumn: 2, sourceEndLine: 2107, mirror: 2040};
MERGE (n:KG {id: 'map:galaxian_state.theend_map/range5'}) SET n:AddressRange SET n += {start: 26626, end: 26626, raw: 'map(0x6802, 0x6802).mirror(0x07f8).w(FUNC(galaxian_state::coin_count_0_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2108, sourceColumn: 2, sourceEndLine: 2108, mirror: 2040};
MERGE (n:KG {id: 'map:galaxian_state.theend_map/range6'}) SET n:AddressRange SET n += {start: 26627, end: 26627, raw: 'map(0x6803, 0x6803).mirror(0x07f8).w(FUNC(galaxian_state::scramble_background_enable_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2109, sourceColumn: 2, sourceEndLine: 2109, mirror: 2040};
MERGE (n:KG {id: 'handler:galaxian_state.scramble_background_enable_w'}) SET n:Handler SET n += {method: 'scramble_background_enable_w', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian_v.cpp', sourceLine: 728, sourceColumn: 1, sourceEndLine: 734, sourceParameters: 'uint8_t data', sourceBody: 'if ((m_background_enable ^ data) & 0x01)
		m_screen->update_partial(m_screen->vpos());

	m_background_enable = data & 0x01;'};
MERGE (n:KG {id: 'map:galaxian_state.theend_map/range7'}) SET n:AddressRange SET n += {start: 26628, end: 26628, raw: 'map(0x6804, 0x6804).mirror(0x07f8).w(FUNC(galaxian_state::galaxian_stars_enable_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2110, sourceColumn: 2, sourceEndLine: 2110, mirror: 2040};
MERGE (n:KG {id: 'map:galaxian_state.theend_map/range8'}) SET n:AddressRange SET n += {start: 26629, end: 26629, raw: 'map(0x6805, 0x6805).mirror(0x07f8)', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2111, sourceColumn: 2, sourceEndLine: 2111, mirror: 2040};
MERGE (n:KG {id: 'map:galaxian_state.theend_map/range9'}) SET n:AddressRange SET n += {start: 26630, end: 26630, raw: 'map(0x6806, 0x6806).mirror(0x07f8).w(FUNC(galaxian_state::galaxian_flip_screen_x_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2112, sourceColumn: 2, sourceEndLine: 2112, mirror: 2040};
MERGE (n:KG {id: 'map:galaxian_state.theend_map/range10'}) SET n:AddressRange SET n += {start: 26631, end: 26631, raw: 'map(0x6807, 0x6807).mirror(0x07f8).w(FUNC(galaxian_state::galaxian_flip_screen_y_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2113, sourceColumn: 2, sourceEndLine: 2113, mirror: 2040};
MERGE (n:KG {id: 'map:galaxian_state.theend_map/range11'}) SET n:AddressRange SET n += {start: 28672, end: 28672, raw: 'map(0x7000, 0x7000).mirror(0x07ff).r("watchdog", FUNC(watchdog_timer_device::reset_r))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2114, sourceColumn: 2, sourceEndLine: 2114, mirror: 2047};
MERGE (n:KG {id: 'map:galaxian_state.theend_map/range12'}) SET n:AddressRange SET n += {start: 32768, end: 65535, raw: 'map(0x8000, 0xffff).rw(FUNC(galaxian_state::theend_ppi8255_r), FUNC(galaxian_state::theend_ppi8255_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2115, sourceColumn: 2, sourceEndLine: 2115};
MERGE (n:KG {id: 'handler:galaxian_state.theend_ppi8255_r'}) SET n:Handler SET n += {method: 'theend_ppi8255_r', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 948, sourceColumn: 1, sourceEndLine: 955, sourceParameters: 'offs_t offset', sourceBody: '// the decoding here is very simplistic, and you can address both simultaneously
	uint8_t result = 0xff;
	if (offset & 0x0100) result &= m_ppi8255[0]->read(offset & 3);
	if (offset & 0x0200) result &= m_ppi8255[1]->read(offset & 3);
	return result;'};
MERGE (n:KG {id: 'handler:galaxian_state.theend_ppi8255_w'}) SET n:Handler SET n += {method: 'theend_ppi8255_w', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 958, sourceColumn: 1, sourceEndLine: 963, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '// the decoding here is very simplistic, and you can address both simultaneously
	if (offset & 0x0100) m_ppi8255[0]->write(offset & 3, data);
	if (offset & 0x0200) m_ppi8255[1]->write(offset & 3, data);'};
MERGE (n:KG {id: 'handler:galaxian_state.konami_sound_control_w'}) SET n:Handler SET n += {method: 'konami_sound_control_w', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 855, sourceColumn: 1, sourceEndLine: 867, sourceParameters: 'uint8_t data', sourceBody: 'uint8_t old = m_konami_sound_control;
	m_konami_sound_control = data;

	/* the inverse of bit 3 clocks the flip flop to signal an INT.
	   It is automatically cleared on the acknowledge */
	if ((old & 0x08) && !(data & 0x08))
		m_audiocpu->set_input_line(0, HOLD_LINE);

	// bit 4 is sound disable
	machine().sound().system_mute(data & 0x10);'};
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
MERGE (n:KG {id: 'map:galaxian_state.konami_sound_map'}) SET n:AddressMap SET n += {cls: 'galaxian_state', name: 'konami_sound_map', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2895, sourceColumn: 1, sourceEndLine: 2900};
MERGE (n:KG {id: 'map:galaxian_state.konami_sound_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 8191, raw: 'map(0x0000, 0x1fff).rom().region("audiocpu", 0)', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2897, sourceColumn: 2, sourceEndLine: 2897, rom: true, region: 'audiocpu', regionOffset: 0};
MERGE (n:KG {id: 'map:galaxian_state.konami_sound_map/range1'}) SET n:AddressRange SET n += {start: 32768, end: 33791, raw: 'map(0x8000, 0x83ff).mirror(0x6c00).ram()', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2898, sourceColumn: 2, sourceEndLine: 2898, mirror: 27648, ram: true};
MERGE (n:KG {id: 'map:galaxian_state.konami_sound_map/range2'}) SET n:AddressRange SET n += {start: 36864, end: 40959, raw: 'map(0x9000, 0x9fff).mirror(0x6000).w(FUNC(galaxian_state::konami_sound_filter_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2899, sourceColumn: 2, sourceEndLine: 2899, mirror: 24576};
MERGE (n:KG {id: 'map:galaxian_state.konami_sound_portmap'}) SET n:AddressMap SET n += {cls: 'galaxian_state', name: 'konami_sound_portmap', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2902, sourceColumn: 1, sourceEndLine: 2906, globalMask: 255};
MERGE (n:KG {id: 'map:galaxian_state.konami_sound_portmap/range0'}) SET n:AddressRange SET n += {start: 0, end: 255, raw: 'map(0x00, 0xff).rw(FUNC(galaxian_state::konami_ay8910_r), FUNC(galaxian_state::konami_ay8910_w))', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2905, sourceColumn: 2, sourceEndLine: 2905};
MERGE (n:KG {id: 'handler:galaxian_state.konami_ay8910_r'}) SET n:Handler SET n += {method: 'konami_ay8910_r', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 829, sourceColumn: 1, sourceEndLine: 836, sourceParameters: 'offs_t offset', sourceBody: '// the decoding here is very simplistic, and you can address both simultaneously
	uint8_t result = 0xff;
	if (offset & 0x20) result &= m_ay8910[1]->data_r();
	if (offset & 0x80) result &= m_ay8910[0]->data_r();
	return result;'};
MERGE (n:KG {id: 'handler:galaxian_state.konami_ay8910_w'}) SET n:Handler SET n += {method: 'konami_ay8910_w', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 839, sourceColumn: 1, sourceEndLine: 852, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '// AV 4,5 ==> AY8910 #2
	// the decoding here is very simplistic, and you can address two simultaneously
	if (offset & 0x10)
		m_ay8910[1]->address_w(data);
	else if (offset & 0x20)
		m_ay8910[1]->data_w(data);
	// AV6,7 ==> AY8910 #1
	if (offset & 0x40)
		m_ay8910[0]->address_w(data);
	else if (offset & 0x80)
		m_ay8910[0]->data_w(data);'};
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
MERGE (n:KG {id: 'machine:galaxian_state.konami_base'}) SET n:MachineConfig SET n += {cls: 'galaxian_state', name: 'konami_base', calls: ['galaxian_base'], stateMembers: ['{"name":"m_bullets_base","bits":32,"signed":true}', '{"name":"m_sprites_base","bits":32,"signed":true}', '{"name":"m_numspritegens","bits":32,"signed":true}', '{"name":"m_protection_state","bits":16}', '{"name":"m_protection_result","bits":8}', '{"name":"m_konami_sound_control","bits":8}', '{"name":"m_irq_enabled","bits":8}', '{"name":"m_frogger_adjust","bits":1}', '{"name":"m_x_scale","bits":8}', '{"name":"m_h0_start","bits":8}', '{"name":"m_sfx_adjust","bits":1}', '{"name":"m_flipscreen_x","bits":8}', '{"name":"m_flipscreen_y","bits":8}', '{"name":"m_background_enable","bits":8}', '{"name":"m_background_red","bits":8}', '{"name":"m_background_green","bits":8}', '{"name":"m_background_blue","bits":8}', '{"name":"m_star_rng_origin","bits":32}', '{"name":"m_star_rng_origin_frame","bits":32}', '{"name":"m_stars_enabled","bits":8}', '{"name":"m_stars_blink_state","bits":8}', '{"name":"m_gfxbank","bits":8,"arrayLength":5}'], startHandlers: ['galaxian_state.video_start'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7525, sourceColumn: 1, sourceEndLine: 7540};
MERGE (n:KG {id: 'device:galaxian_state.konami_base/ppi8255_0'}) SET n:Device SET n += {type: 'I8255A', tag: 'ppi8255_0', clock: null, config: ['I8255A(config, m_ppi8255[0])', 'm_ppi8255[0]->in_pa_callback().set_ioport("IN0")', 'm_ppi8255[0]->in_pb_callback().set_ioport("IN1")', 'm_ppi8255[0]->in_pc_callback().set_ioport("IN2")', 'm_ppi8255[0]->out_pc_callback().set(FUNC(galaxian_state::konami_portc_0_w))'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7529, sourceColumn: 2, sourceEndLine: 7529};
MERGE (n:KG {id: 'device:galaxian_state.konami_base/ppi8255_0/callback:ppi8255_0:0'}) SET n:Callback SET n += {signal: 'in_pa_callback', operation: 'set_ioport', raw: 'm_ppi8255[0]->in_pa_callback().set_ioport("IN0")', ownerTag: 'ppi8255_0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7530, sourceColumn: 2, sourceEndLine: 7530, targetTag: 'IN0', targetPort: 'IN0'};
MERGE (n:KG {id: 'device:galaxian_state.konami_base/ppi8255_0/callback:ppi8255_0:1'}) SET n:Callback SET n += {signal: 'in_pb_callback', operation: 'set_ioport', raw: 'm_ppi8255[0]->in_pb_callback().set_ioport("IN1")', ownerTag: 'ppi8255_0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7531, sourceColumn: 2, sourceEndLine: 7531, targetTag: 'IN1', targetPort: 'IN1'};
MERGE (n:KG {id: 'device:galaxian_state.konami_base/ppi8255_0/callback:ppi8255_0:2'}) SET n:Callback SET n += {signal: 'in_pc_callback', operation: 'set_ioport', raw: 'm_ppi8255[0]->in_pc_callback().set_ioport("IN2")', ownerTag: 'ppi8255_0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7532, sourceColumn: 2, sourceEndLine: 7532, targetTag: 'IN2', targetPort: 'IN2'};
MERGE (n:KG {id: 'device:galaxian_state.konami_base/ppi8255_0/callback:ppi8255_0:3'}) SET n:Callback SET n += {signal: 'out_pc_callback', operation: 'set', raw: 'm_ppi8255[0]->out_pc_callback().set(FUNC(galaxian_state::konami_portc_0_w))', ownerTag: 'ppi8255_0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7533, sourceColumn: 2, sourceEndLine: 7533, targetClass: 'galaxian_state', targetMethod: 'konami_portc_0_w'};
MERGE (n:KG {id: 'handler:galaxian_state.konami_portc_0_w'}) SET n:Handler SET n += {method: 'konami_portc_0_w', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 930, sourceColumn: 1, sourceEndLine: 933, sourceParameters: 'uint8_t data', sourceBody: 'logerror("%s:ppi0_portc_w = %02X\\n", machine().describe_context(), data);'};
MERGE (n:KG {id: 'device:galaxian_state.konami_base/ppi8255_1'}) SET n:Device SET n += {type: 'I8255A', tag: 'ppi8255_1', clock: null, config: ['I8255A(config, m_ppi8255[1])', 'm_ppi8255[1]->out_pa_callback().set(m_soundlatch, FUNC(generic_latch_8_device::write))', 'm_ppi8255[1]->out_pb_callback().set(FUNC(galaxian_state::konami_sound_control_w))', 'm_ppi8255[1]->in_pc_callback().set_ioport("IN3")', 'm_ppi8255[1]->out_pc_callback().set(FUNC(galaxian_state::konami_portc_1_w))', 'm_ppi8255[1]->in_pc_callback().set(FUNC(galaxian_state::theend_protection_r))', 'm_ppi8255[1]->out_pc_callback().set(FUNC(galaxian_state::theend_protection_w))'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7535, sourceColumn: 2, sourceEndLine: 7535};
MERGE (n:KG {id: 'device:galaxian_state.konami_base/ppi8255_1/callback:ppi8255_1:0'}) SET n:Callback SET n += {signal: 'out_pa_callback', operation: 'set', raw: 'm_ppi8255[1]->out_pa_callback().set(m_soundlatch, FUNC(generic_latch_8_device::write))', ownerTag: 'ppi8255_1', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7536, sourceColumn: 2, sourceEndLine: 7536, targetClass: 'generic_latch_8_device', targetMethod: 'write', targetTag: 'soundlatch'};
MERGE (n:KG {id: 'device:galaxian_state.konami_base/ppi8255_1/callback:ppi8255_1:1'}) SET n:Callback SET n += {signal: 'out_pb_callback', operation: 'set', raw: 'm_ppi8255[1]->out_pb_callback().set(FUNC(galaxian_state::konami_sound_control_w))', ownerTag: 'ppi8255_1', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7537, sourceColumn: 2, sourceEndLine: 7537, targetClass: 'galaxian_state', targetMethod: 'konami_sound_control_w'};
MERGE (n:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}) SET n:MachineConfig SET n += {cls: 'galaxian_state', name: 'konami_sound_2x_ay8910', calls: [], stateMembers: ['{"name":"m_bullets_base","bits":32,"signed":true}', '{"name":"m_sprites_base","bits":32,"signed":true}', '{"name":"m_numspritegens","bits":32,"signed":true}', '{"name":"m_protection_state","bits":16}', '{"name":"m_protection_result","bits":8}', '{"name":"m_konami_sound_control","bits":8}', '{"name":"m_irq_enabled","bits":8}', '{"name":"m_frogger_adjust","bits":1}', '{"name":"m_x_scale","bits":8}', '{"name":"m_h0_start","bits":8}', '{"name":"m_sfx_adjust","bits":1}', '{"name":"m_flipscreen_x","bits":8}', '{"name":"m_flipscreen_y","bits":8}', '{"name":"m_background_enable","bits":8}', '{"name":"m_background_red","bits":8}', '{"name":"m_background_green","bits":8}', '{"name":"m_background_blue","bits":8}', '{"name":"m_star_rng_origin","bits":32}', '{"name":"m_star_rng_origin_frame","bits":32}', '{"name":"m_stars_enabled","bits":8}', '{"name":"m_stars_blink_state","bits":8}', '{"name":"m_gfxbank","bits":8,"arrayLength":5}'], startHandlers: ['galaxian_state.video_start'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7583, sourceColumn: 1, sourceEndLine: 7637};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/audiocpu'}) SET n:Device SET n += {type: 'Z80', tag: 'audiocpu', clock: 1789772.625, config: ['Z80(config, m_audiocpu, KONAMI_SOUND_CLOCK/8)', 'm_audiocpu->set_addrmap(AS_PROGRAM, &galaxian_state::konami_sound_map)', 'm_audiocpu->set_addrmap(AS_IO, &galaxian_state::konami_sound_portmap)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7586, sourceColumn: 2, sourceEndLine: 7586};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/soundlatch'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch', clock: null, config: ['GENERIC_LATCH_8(config, m_soundlatch)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7590, sourceColumn: 2, sourceEndLine: 7590};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/8910.0'}) SET n:Device SET n += {type: 'AY8910', tag: '8910.0', clock: 1789772.625, config: ['AY8910(config, m_ay8910[0], KONAMI_SOUND_CLOCK/8)', 'm_ay8910[0]->set_flags(AY8910_RESISTOR_OUTPUT)', 'm_ay8910[0]->set_resistors_load(1000.0, 1000.0, 1000.0)', 'm_ay8910[0]->port_a_read_callback().set(m_soundlatch, FUNC(generic_latch_8_device::read))', 'm_ay8910[0]->port_b_read_callback().set(FUNC(galaxian_state::konami_sound_timer_r))', 'm_ay8910[0]->add_route(0, "konami", 1.0, 0)', 'm_ay8910[0]->add_route(1, "konami", 1.0, 1)', 'm_ay8910[0]->add_route(2, "konami", 1.0, 2)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7593, sourceColumn: 2, sourceEndLine: 7593, configCalls: ['set_flags(8)', 'set_resistors_load(1000,1000,1000)']};
MERGE (n:KG {id: 'audioroute:device:galaxian_state.konami_sound_2x_ay8910/8910.0/0'}) SET n:AudioRoute SET n += {output: '0', target: 'konami', gain: 1, input: 0, raw: 'm_ay8910[0]->add_route(0, "konami", 1.0, 0)', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7598, sourceColumn: 2, sourceEndLine: 7598};
MERGE (n:KG {id: 'audioroute:device:galaxian_state.konami_sound_2x_ay8910/8910.0/1'}) SET n:AudioRoute SET n += {output: '1', target: 'konami', gain: 1, input: 1, raw: 'm_ay8910[0]->add_route(1, "konami", 1.0, 1)', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7599, sourceColumn: 2, sourceEndLine: 7599};
MERGE (n:KG {id: 'audioroute:device:galaxian_state.konami_sound_2x_ay8910/8910.0/2'}) SET n:AudioRoute SET n += {output: '2', target: 'konami', gain: 1, input: 2, raw: 'm_ay8910[0]->add_route(2, "konami", 1.0, 2)', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7600, sourceColumn: 2, sourceEndLine: 7600};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/8910.0/callback:8910_0:0'}) SET n:Callback SET n += {signal: 'port_a_read_callback', operation: 'set', raw: 'm_ay8910[0]->port_a_read_callback().set(m_soundlatch, FUNC(generic_latch_8_device::read))', ownerTag: '8910.0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7596, sourceColumn: 2, sourceEndLine: 7596, targetClass: 'generic_latch_8_device', targetMethod: 'read', targetTag: 'soundlatch'};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/8910.0/callback:8910_0:1'}) SET n:Callback SET n += {signal: 'port_b_read_callback', operation: 'set', raw: 'm_ay8910[0]->port_b_read_callback().set(FUNC(galaxian_state::konami_sound_timer_r))', ownerTag: '8910.0', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7597, sourceColumn: 2, sourceEndLine: 7597, targetClass: 'galaxian_state', targetMethod: 'konami_sound_timer_r'};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/8910.1'}) SET n:Device SET n += {type: 'AY8910', tag: '8910.1', clock: 1789772.625, config: ['AY8910(config, m_ay8910[1], KONAMI_SOUND_CLOCK/8)', 'm_ay8910[1]->set_flags(AY8910_RESISTOR_OUTPUT)', 'm_ay8910[1]->set_resistors_load(1000.0, 1000.0, 1000.0)', 'm_ay8910[1]->add_route(0, "konami", 1.0, 3)', 'm_ay8910[1]->add_route(1, "konami", 1.0, 4)', 'm_ay8910[1]->add_route(2, "konami", 1.0, 5)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7602, sourceColumn: 2, sourceEndLine: 7602, configCalls: ['set_flags(8)', 'set_resistors_load(1000,1000,1000)']};
MERGE (n:KG {id: 'audioroute:device:galaxian_state.konami_sound_2x_ay8910/8910.1/0'}) SET n:AudioRoute SET n += {output: '0', target: 'konami', gain: 1, input: 3, raw: 'm_ay8910[1]->add_route(0, "konami", 1.0, 3)', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7605, sourceColumn: 2, sourceEndLine: 7605};
MERGE (n:KG {id: 'audioroute:device:galaxian_state.konami_sound_2x_ay8910/8910.1/1'}) SET n:AudioRoute SET n += {output: '1', target: 'konami', gain: 1, input: 4, raw: 'm_ay8910[1]->add_route(1, "konami", 1.0, 4)', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7606, sourceColumn: 2, sourceEndLine: 7606};
MERGE (n:KG {id: 'audioroute:device:galaxian_state.konami_sound_2x_ay8910/8910.1/2'}) SET n:AudioRoute SET n += {output: '2', target: 'konami', gain: 1, input: 5, raw: 'm_ay8910[1]->add_route(2, "konami", 1.0, 5)', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7607, sourceColumn: 2, sourceEndLine: 7607};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami'}) SET n:Device SET n += {type: 'NETLIST_SOUND', tag: 'konami', clock: 48000, config: ['NETLIST_SOUND(config, "konami", 48000)
		.set_source(netlist_konami2x)
		.add_route(ALL_OUTPUTS, "speaker", 1.0)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7609, sourceColumn: 2, sourceEndLine: 7611};
MERGE (n:KG {id: 'audioroute:device:galaxian_state.konami_sound_2x_ay8910/konami/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 1, raw: 'NETLIST_SOUND(config, "konami", 48000)
		.set_source(netlist_konami2x)
		.add_route(ALL_OUTPUTS, "speaker", 1.0)', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7609, sourceColumn: 2, sourceEndLine: 7611};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:ctl0'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'konami:ctl0', clock: null, config: ['NETLIST_LOGIC_INPUT(config, "konami:ctl0", "CTL0.IN", 0)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7614, sourceColumn: 2, sourceEndLine: 7614, clockExpr: '"CTL0.IN"'};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:ctl1'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'konami:ctl1', clock: null, config: ['NETLIST_LOGIC_INPUT(config, "konami:ctl1", "CTL1.IN", 0)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7615, sourceColumn: 2, sourceEndLine: 7615, clockExpr: '"CTL1.IN"'};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:ctl2'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'konami:ctl2', clock: null, config: ['NETLIST_LOGIC_INPUT(config, "konami:ctl2", "CTL2.IN", 0)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7616, sourceColumn: 2, sourceEndLine: 7616, clockExpr: '"CTL2.IN"'};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:ctl3'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'konami:ctl3', clock: null, config: ['NETLIST_LOGIC_INPUT(config, "konami:ctl3", "CTL3.IN", 0)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7617, sourceColumn: 2, sourceEndLine: 7617, clockExpr: '"CTL3.IN"'};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:ctl4'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'konami:ctl4', clock: null, config: ['NETLIST_LOGIC_INPUT(config, "konami:ctl4", "CTL4.IN", 0)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7618, sourceColumn: 2, sourceEndLine: 7618, clockExpr: '"CTL4.IN"'};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:ctl5'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'konami:ctl5', clock: null, config: ['NETLIST_LOGIC_INPUT(config, "konami:ctl5", "CTL5.IN", 0)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7619, sourceColumn: 2, sourceEndLine: 7619, clockExpr: '"CTL5.IN"'};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:ctl6'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'konami:ctl6', clock: null, config: ['NETLIST_LOGIC_INPUT(config, "konami:ctl6", "CTL6.IN", 0)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7620, sourceColumn: 2, sourceEndLine: 7620, clockExpr: '"CTL6.IN"'};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:ctl7'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'konami:ctl7', clock: null, config: ['NETLIST_LOGIC_INPUT(config, "konami:ctl7", "CTL7.IN", 0)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7621, sourceColumn: 2, sourceEndLine: 7621, clockExpr: '"CTL7.IN"'};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:ctl8'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'konami:ctl8', clock: null, config: ['NETLIST_LOGIC_INPUT(config, "konami:ctl8", "CTL8.IN", 0)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7622, sourceColumn: 2, sourceEndLine: 7622, clockExpr: '"CTL8.IN"'};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:ctl9'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'konami:ctl9', clock: null, config: ['NETLIST_LOGIC_INPUT(config, "konami:ctl9", "CTL9.IN", 0)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7623, sourceColumn: 2, sourceEndLine: 7623, clockExpr: '"CTL9.IN"'};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:ctl10'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'konami:ctl10', clock: null, config: ['NETLIST_LOGIC_INPUT(config, "konami:ctl10", "CTL10.IN", 0)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7624, sourceColumn: 2, sourceEndLine: 7624, clockExpr: '"CTL10.IN"'};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:ctl11'}) SET n:Device SET n += {type: 'NETLIST_LOGIC_INPUT', tag: 'konami:ctl11', clock: null, config: ['NETLIST_LOGIC_INPUT(config, "konami:ctl11", "CTL11.IN", 0)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7625, sourceColumn: 2, sourceEndLine: 7625, clockExpr: '"CTL11.IN"'};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:cin0'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'konami:cin0', clock: 0, config: ['NETLIST_STREAM_INPUT(config, "konami:cin0", 0, "R_AY3D_A.R")'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7628, sourceColumn: 2, sourceEndLine: 7628};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:cin1'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'konami:cin1', clock: 1, config: ['NETLIST_STREAM_INPUT(config, "konami:cin1", 1, "R_AY3D_B.R")'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7629, sourceColumn: 2, sourceEndLine: 7629};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:cin2'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'konami:cin2', clock: 2, config: ['NETLIST_STREAM_INPUT(config, "konami:cin2", 2, "R_AY3D_C.R")'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7630, sourceColumn: 2, sourceEndLine: 7630};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:cin3'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'konami:cin3', clock: 3, config: ['NETLIST_STREAM_INPUT(config, "konami:cin3", 3, "R_AY3C_A.R")'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7633, sourceColumn: 2, sourceEndLine: 7633};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:cin4'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'konami:cin4', clock: 4, config: ['NETLIST_STREAM_INPUT(config, "konami:cin4", 4, "R_AY3C_B.R")'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7634, sourceColumn: 2, sourceEndLine: 7634};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:cin5'}) SET n:Device SET n += {type: 'NETLIST_STREAM_INPUT', tag: 'konami:cin5', clock: 5, config: ['NETLIST_STREAM_INPUT(config, "konami:cin5", 5, "R_AY3C_C.R")'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7635, sourceColumn: 2, sourceEndLine: 7635};
MERGE (n:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:cout0'}) SET n:Device SET n += {type: 'NETLIST_STREAM_OUTPUT', tag: 'konami:cout0', clock: 0, config: ['NETLIST_STREAM_OUTPUT(config, "konami:cout0", 0, "OUT").set_mult_offset(1.0 / 0.05, 0.0)'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7636, sourceColumn: 2, sourceEndLine: 7636};
MERGE (n:KG {id: 'machine:galaxian_state.scramble_base'}) SET n:MachineConfig SET n += {cls: 'galaxian_state', name: 'scramble_base', calls: ['konami_base', 'konami_sound_2x_ay8910'], stateMembers: ['{"name":"m_bullets_base","bits":32,"signed":true}', '{"name":"m_sprites_base","bits":32,"signed":true}', '{"name":"m_numspritegens","bits":32,"signed":true}', '{"name":"m_protection_state","bits":16}', '{"name":"m_protection_result","bits":8}', '{"name":"m_konami_sound_control","bits":8}', '{"name":"m_irq_enabled","bits":8}', '{"name":"m_frogger_adjust","bits":1}', '{"name":"m_x_scale","bits":8}', '{"name":"m_h0_start","bits":8}', '{"name":"m_sfx_adjust","bits":1}', '{"name":"m_flipscreen_x","bits":8}', '{"name":"m_flipscreen_y","bits":8}', '{"name":"m_background_enable","bits":8}', '{"name":"m_background_red","bits":8}', '{"name":"m_background_green","bits":8}', '{"name":"m_background_blue","bits":8}', '{"name":"m_star_rng_origin","bits":32}', '{"name":"m_star_rng_origin_frame","bits":32}', '{"name":"m_stars_enabled","bits":8}', '{"name":"m_stars_blink_state","bits":8}', '{"name":"m_gfxbank","bits":8,"arrayLength":5}'], startHandlers: ['galaxian_state.video_start'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7640, sourceColumn: 1, sourceEndLine: 7647};
MERGE (n:KG {id: 'device:galaxian_state.scramble_base/stars'}) SET n:Device SET n += {type: 'TIMER', tag: 'stars', clock: null, config: ['TIMER(config, "stars").configure_periodic(FUNC(galaxian_state::scramble_stars_blink_timer), PERIOD_OF_555_ASTABLE(100000, 10000, 0.00001))'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7646, sourceColumn: 2, sourceEndLine: 7646};
MERGE (n:KG {id: 'handler:galaxian_state.theend_protection_r'}) SET n:Handler SET n += {method: 'theend_protection_r', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1011, sourceColumn: 1, sourceEndLine: 1014, sourceParameters: '', sourceBody: 'return m_protection_result;'};
MERGE (n:KG {id: 'handler:galaxian_state.theend_protection_w'}) SET n:Handler SET n += {method: 'theend_protection_w', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 972, sourceColumn: 1, sourceEndLine: 1008, sourceParameters: 'uint8_t data', sourceBody: '/*
	    Handled by a PAL16VR8(?) at 6J. Both inputs and outputs are a nibble.
	    Logic is not exactly known, but this implementation works well enough.
	*/
	m_protection_state = (m_protection_state << 4) | (data & 0x0f);

	const uint8_t num1 = (m_protection_state >> 8) & 0x0f;
	const uint8_t num2 = (m_protection_state >> 4) & 0x0f;
	const uint8_t op = m_protection_state & 0x0f;

	// TODO: theend writes several, other mystery sequences
	switch (op)
	{
	case 0x6:
		// scrambles
		m_protection_result ^= 0x80;
		break;
	case 0x9:
		// scramble
		m_protection_result = std::min(num1 + 1, 0xf) << 4; // does not want overflow
		break;
	case 0xb:
		// theend
		m_protection_result = std::max(num2 - num1, 0) << 4; // assume no underflow
		break;
	case 0xa:
		// theend
		m_protection_result = 0x00; // needs this to avoid glitches after first round
		break;
	case 0xf:
		// scrambles
		m_protection_result = std::max(num1 - num2, 0) << 4; // assume no underflow
		break;
	}'};
MERGE (n:KG {id: 'machine:galaxian_state.scramble'}) SET n:MachineConfig SET n += {cls: 'galaxian_state', name: 'scramble', calls: ['scramble_base'], stateMembers: ['{"name":"m_bullets_base","bits":32,"signed":true}', '{"name":"m_sprites_base","bits":32,"signed":true}', '{"name":"m_numspritegens","bits":32,"signed":true}', '{"name":"m_protection_state","bits":16}', '{"name":"m_protection_result","bits":8}', '{"name":"m_konami_sound_control","bits":8}', '{"name":"m_irq_enabled","bits":8}', '{"name":"m_frogger_adjust","bits":1}', '{"name":"m_x_scale","bits":8}', '{"name":"m_h0_start","bits":8}', '{"name":"m_sfx_adjust","bits":1}', '{"name":"m_flipscreen_x","bits":8}', '{"name":"m_flipscreen_y","bits":8}', '{"name":"m_background_enable","bits":8}', '{"name":"m_background_red","bits":8}', '{"name":"m_background_green","bits":8}', '{"name":"m_background_blue","bits":8}', '{"name":"m_star_rng_origin","bits":32}', '{"name":"m_star_rng_origin_frame","bits":32}', '{"name":"m_stars_enabled","bits":8}', '{"name":"m_stars_blink_state","bits":8}', '{"name":"m_gfxbank","bits":8,"arrayLength":5}'], startHandlers: ['galaxian_state.video_start'], devicePatches: ['{"tag":"ppi8255_1","config":["m_ppi8255[1]->in_pc_callback().set(FUNC(galaxian_state::theend_protection_r))","m_ppi8255[1]->out_pc_callback().set(FUNC(galaxian_state::theend_protection_w))"]}'], sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 8173, sourceColumn: 1, sourceEndLine: 8182};
MERGE (n:KG {id: 'machine:galaxian_state.scramble/callback:ppi8255_1:0'}) SET n:Callback SET n += {signal: 'in_pc_callback', operation: 'set', raw: 'm_ppi8255[1]->in_pc_callback().set(FUNC(galaxian_state::theend_protection_r))', ownerTag: 'ppi8255_1', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 8180, sourceColumn: 2, sourceEndLine: 8180, targetClass: 'galaxian_state', targetMethod: 'theend_protection_r'};
MERGE (n:KG {id: 'machine:galaxian_state.scramble/callback:ppi8255_1:1'}) SET n:Callback SET n += {signal: 'out_pc_callback', operation: 'set', raw: 'm_ppi8255[1]->out_pc_callback().set(FUNC(galaxian_state::theend_protection_w))', ownerTag: 'ppi8255_1', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 8181, sourceColumn: 2, sourceEndLine: 8181, targetClass: 'galaxian_state', targetMethod: 'theend_protection_w'};
MERGE (n:KG {id: 'handler:galaxian_state.theend_protection_alt_r_0'}) SET n:Handler SET n += {method: 'theend_protection_alt_r_0', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1017, sourceColumn: 1, sourceEndLine: 1025, sourceParameters: '', sourceBody: '/*
	    Handled by a custom IC. Holds two bits derived from the upper bit of
	    the nibble that the IC at 6J returns; scrambles reads this area and
	    expects said behavior, or else it will crash.
	*/
	return (m_protection_result >> 7) & 1;'};
MERGE (n:KG {id: 'handler:galaxian_state.theend_protection_alt_r_1'}) SET n:Handler SET n += {method: 'theend_protection_alt_r_1', ownerClass: 'galaxian_state', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1017, sourceColumn: 1, sourceEndLine: 1025, sourceParameters: '', sourceBody: '/*
	    Handled by a custom IC. Holds two bits derived from the upper bit of
	    the nibble that the IC at 6J returns; scrambles reads this area and
	    expects said behavior, or else it will crash.
	*/
	return (m_protection_result >> 7) & 1;'};
MERGE (n:KG {id: 'inputs:scramble'}) SET n:InputPorts SET n += {name: 'scramble', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 5784, sourceColumn: 8, sourceEndLine: 5784};
MERGE (n:KG {id: 'inputs:scramble/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:scramble/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:scramble/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:scramble/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_SERVICE1', defaultValue: 4};
MERGE (n:KG {id: 'inputs:scramble/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 8};
MERGE (n:KG {id: 'inputs:scramble/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:scramble/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:scramble/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_COIN2', defaultValue: 64};
MERGE (n:KG {id: 'inputs:scramble/IN0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_COIN1', defaultValue: 128};
MERGE (n:KG {id: 'inputs:scramble/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:scramble/IN1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, name: 'Lives', defaultValue: 0, settings: ['0=3', '1=4', '2=5', '3=255 (Cheat)']};
MERGE (n:KG {id: 'inputs:scramble/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_COCKTAIL'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:scramble/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:scramble/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:scramble/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:scramble/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_START2', defaultValue: 64};
MERGE (n:KG {id: 'inputs:scramble/IN1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_START1', defaultValue: 128};
MERGE (n:KG {id: 'inputs:scramble/IN2'}) SET n:Port SET n += {tag: 'IN2', modify: false};
MERGE (n:KG {id: 'inputs:scramble/IN2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:scramble/IN2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 6, name: 'Coinage', defaultValue: 0, settings: ['0=A 1/1  B 2/1  C 1/1', '2=A 1/2  B 1/1  C 1/2', '4=A 1/3  B 3/1  C 1/3', '6=A 1/4  B 4/1  C 1/4']};
MERGE (n:KG {id: 'inputs:scramble/IN2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 8, name: 'Cabinet', defaultValue: 0, settings: ['0=Upright', '8=Cocktail']};
MERGE (n:KG {id: 'inputs:scramble/IN2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:scramble/IN2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_MEMBER(FUNC(galaxian_state::theend_protection_alt_r<0>))'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:scramble/IN2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:scramble/IN2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_MEMBER(FUNC(galaxian_state::theend_protection_alt_r<1>))'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:scramble/IN3'}) SET n:Port SET n += {tag: 'IN3', modify: false};
MERGE (n:KG {id: 'inputs:scramble/IN3/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 255, activeLow: false, type: 'IPT_UNUSED', defaultValue: 0};
MERGE (n:KG {id: 'gfxlayout:galaxian_charlayout'}) SET n:GfxLayout SET n += {name: 'galaxian_charlayout', width: 8, height: 8, total: 'RGN_FRAC(1,2)', planes: 2, planeOffsets: ['RGN_FRAC(0,2)', 'RGN_FRAC(1,2)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxlayout:galaxian_spritelayout'}) SET n:GfxLayout SET n += {name: 'galaxian_spritelayout', width: 16, height: 16, total: 'RGN_FRAC(1,2)', planes: 2, planeOffsets: ['RGN_FRAC(0,2)', 'RGN_FRAC(1,2)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 64, 65, 66, 67, 68, 69, 70, 71], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 128, 136, 144, 152, 160, 168, 176, 184], charIncrement: 256};
MERGE (n:KG {id: 'gfxdecode:gfx_galaxian'}) SET n:GfxDecode SET n += {name: 'gfx_galaxian', sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7441, sourceColumn: 8, sourceEndLine: 7441};
MERGE (n:KG {id: 'gfxdecode:gfx_galaxian/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'galaxian_charlayout', colorBase: 0, colorCount: 8, xscale: 3, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_galaxian/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'galaxian_spritelayout', colorBase: 0, colorCount: 8, xscale: 3, yscale: 1};
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
MATCH (a:KG {id: 'game:scramble'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 17153, sourceColumn: 1, sourceEndLine: 17153};
MATCH (a:KG {id: 'game:scramble'}), (b:KG {id: 'machine:galaxian_state.scramble'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:scramble'}), (b:KG {id: 'inputs:scramble'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:scramble'}), (b:KG {id: 'romset:scramble'}) MERGE (a)-[r:USES_ROMSET]->(b);
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
MATCH (a:KG {id: 'machine:galaxian_state.scramble'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 8173, sourceColumn: 1, sourceEndLine: 8182};
MATCH (a:KG {id: 'machine:galaxian_state.scramble'}), (b:KG {id: 'handler:galaxian_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.scramble'}), (b:KG {id: 'machine:galaxian_state.scramble_base'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:galaxian_state.scramble'}), (b:KG {id: 'map:galaxian_state.theend_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:galaxian_state.scramble'}), (b:KG {id: 'machine:galaxian_state.scramble/callback:ppi8255_1:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.scramble'}), (b:KG {id: 'machine:galaxian_state.scramble/callback:ppi8255_1:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'inputs:scramble'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 5784, sourceColumn: 8, sourceEndLine: 5784};
MATCH (a:KG {id: 'inputs:scramble'}), (b:KG {id: 'inputs:scramble/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:scramble'}), (b:KG {id: 'inputs:scramble/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:scramble'}), (b:KG {id: 'inputs:scramble/IN2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:scramble'}), (b:KG {id: 'inputs:scramble/IN3'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:scramble'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 15096, sourceColumn: 1, sourceEndLine: 15096};
MATCH (a:KG {id: 'romset:scramble'}), (b:KG {id: 'region:scramble/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:scramble'}), (b:KG {id: 'region:scramble/audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:scramble'}), (b:KG {id: 'region:scramble/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:scramble'}), (b:KG {id: 'region:scramble/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:galaxian_state.video_start'}), (b:KG {id: 'handler:galaxian_state.stars_init'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:galaxian_state.video_start'}), (b:KG {id: 'handler:galaxian_state.state_save_register'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:galaxian_state.video_start'}), (b:KG {id: 'handler:galaxian_state.bg_get_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.scramble_base'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7640, sourceColumn: 1, sourceEndLine: 7647};
MATCH (a:KG {id: 'machine:galaxian_state.scramble_base'}), (b:KG {id: 'handler:galaxian_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.scramble_base'}), (b:KG {id: 'machine:galaxian_state.konami_base'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:galaxian_state.scramble_base'}), (b:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:galaxian_state.scramble_base'}), (b:KG {id: 'device:galaxian_state.scramble_base/stars'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.theend_map'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2100, sourceColumn: 1, sourceEndLine: 2116};
MATCH (a:KG {id: 'map:galaxian_state.theend_map'}), (b:KG {id: 'map:galaxian_state.theend_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.theend_map'}), (b:KG {id: 'map:galaxian_state.theend_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.theend_map'}), (b:KG {id: 'map:galaxian_state.theend_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.theend_map'}), (b:KG {id: 'map:galaxian_state.theend_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.theend_map'}), (b:KG {id: 'map:galaxian_state.theend_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.theend_map'}), (b:KG {id: 'map:galaxian_state.theend_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.theend_map'}), (b:KG {id: 'map:galaxian_state.theend_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.theend_map'}), (b:KG {id: 'map:galaxian_state.theend_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.theend_map'}), (b:KG {id: 'map:galaxian_state.theend_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.theend_map'}), (b:KG {id: 'map:galaxian_state.theend_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.theend_map'}), (b:KG {id: 'map:galaxian_state.theend_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.theend_map'}), (b:KG {id: 'map:galaxian_state.theend_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.theend_map'}), (b:KG {id: 'map:galaxian_state.theend_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.scramble/callback:ppi8255_1:0'}), (b:KG {id: 'handler:galaxian_state.theend_protection_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.scramble/callback:ppi8255_1:1'}), (b:KG {id: 'handler:galaxian_state.theend_protection_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN0'}), (b:KG {id: 'inputs:scramble/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN0'}), (b:KG {id: 'inputs:scramble/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN0'}), (b:KG {id: 'inputs:scramble/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN0'}), (b:KG {id: 'inputs:scramble/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN0'}), (b:KG {id: 'inputs:scramble/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN0'}), (b:KG {id: 'inputs:scramble/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN0'}), (b:KG {id: 'inputs:scramble/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN0'}), (b:KG {id: 'inputs:scramble/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN1'}), (b:KG {id: 'inputs:scramble/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN1'}), (b:KG {id: 'inputs:scramble/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN1'}), (b:KG {id: 'inputs:scramble/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN1'}), (b:KG {id: 'inputs:scramble/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN1'}), (b:KG {id: 'inputs:scramble/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN1'}), (b:KG {id: 'inputs:scramble/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN1'}), (b:KG {id: 'inputs:scramble/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN2'}), (b:KG {id: 'inputs:scramble/IN2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN2'}), (b:KG {id: 'inputs:scramble/IN2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN2'}), (b:KG {id: 'inputs:scramble/IN2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN2'}), (b:KG {id: 'inputs:scramble/IN2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN2'}), (b:KG {id: 'inputs:scramble/IN2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN2'}), (b:KG {id: 'inputs:scramble/IN2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN2'}), (b:KG {id: 'inputs:scramble/IN2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN3'}), (b:KG {id: 'inputs:scramble/IN3/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:scramble/maincpu'}), (b:KG {id: 'rom:scramble/maincpu/s1.2d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:scramble/maincpu'}), (b:KG {id: 'rom:scramble/maincpu/s2.2e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:scramble/maincpu'}), (b:KG {id: 'rom:scramble/maincpu/s3.2f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:scramble/maincpu'}), (b:KG {id: 'rom:scramble/maincpu/s4.2h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:scramble/maincpu'}), (b:KG {id: 'rom:scramble/maincpu/s5.2j'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:scramble/maincpu'}), (b:KG {id: 'rom:scramble/maincpu/s6.2l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:scramble/maincpu'}), (b:KG {id: 'rom:scramble/maincpu/s7.2m'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:scramble/maincpu'}), (b:KG {id: 'rom:scramble/maincpu/s8.2p'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:scramble/audiocpu'}), (b:KG {id: 'rom:scramble/audiocpu/ot1.5c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:scramble/audiocpu'}), (b:KG {id: 'rom:scramble/audiocpu/ot2.5d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:scramble/audiocpu'}), (b:KG {id: 'rom:scramble/audiocpu/ot3.5e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:scramble/gfx1'}), (b:KG {id: 'rom:scramble/gfx1/c2.5f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:scramble/gfx1'}), (b:KG {id: 'rom:scramble/gfx1/c1.5h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:scramble/proms'}), (b:KG {id: 'rom:scramble/proms/c01s.6e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_base'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7525, sourceColumn: 1, sourceEndLine: 7540};
MATCH (a:KG {id: 'machine:galaxian_state.konami_base'}), (b:KG {id: 'handler:galaxian_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_base'}), (b:KG {id: 'machine:galaxian_state.galaxian_base'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:galaxian_state.konami_base'}), (b:KG {id: 'device:galaxian_state.konami_base/ppi8255_0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_base'}), (b:KG {id: 'device:galaxian_state.konami_base/ppi8255_1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7583, sourceColumn: 1, sourceEndLine: 7637};
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'handler:galaxian_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/audiocpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/soundlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/8910.0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/8910.1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:ctl0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:ctl1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:ctl2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:ctl3'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:ctl4'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:ctl5'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:ctl6'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:ctl7'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:ctl8'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:ctl9'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:ctl10'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:ctl11'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:cin0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:cin1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:cin2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:cin3'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:cin4'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:cin5'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaxian_state.konami_sound_2x_ay8910'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami:cout0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.theend_map/range2'}), (b:KG {id: 'handler:galaxian_state.galaxian_videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.theend_map/range3'}), (b:KG {id: 'handler:galaxian_state.galaxian_objram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.theend_map/range4'}), (b:KG {id: 'handler:galaxian_state.irq_enable_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.theend_map/range5'}), (b:KG {id: 'handler:galaxian_state.coin_count_0_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.theend_map/range6'}), (b:KG {id: 'handler:galaxian_state.scramble_background_enable_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.theend_map/range7'}), (b:KG {id: 'handler:galaxian_state.galaxian_stars_enable_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.theend_map/range9'}), (b:KG {id: 'handler:galaxian_state.galaxian_flip_screen_x_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.theend_map/range10'}), (b:KG {id: 'handler:galaxian_state.galaxian_flip_screen_y_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.theend_map/range11'}), (b:KG {id: 'handler:watchdog_timer_device.reset_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:galaxian_state.theend_map/range12'}), (b:KG {id: 'handler:galaxian_state.theend_ppi8255_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:galaxian_state.theend_map/range12'}), (b:KG {id: 'handler:galaxian_state.theend_ppi8255_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN2/f4'}), (b:KG {id: 'handler:galaxian_state.theend_protection_alt_r_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:scramble/IN2/f6'}), (b:KG {id: 'handler:galaxian_state.theend_protection_alt_r_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
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
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/audiocpu'}), (b:KG {id: 'map:galaxian_state.konami_sound_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/audiocpu'}), (b:KG {id: 'map:galaxian_state.konami_sound_portmap'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/8910.0'}), (b:KG {id: 'audioroute:device:galaxian_state.konami_sound_2x_ay8910/8910.0/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/8910.0'}), (b:KG {id: 'audioroute:device:galaxian_state.konami_sound_2x_ay8910/8910.0/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/8910.0'}), (b:KG {id: 'audioroute:device:galaxian_state.konami_sound_2x_ay8910/8910.0/2'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/8910.0'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/8910.0/callback:8910_0:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/8910.0'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/8910.0/callback:8910_0:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/8910.1'}), (b:KG {id: 'audioroute:device:galaxian_state.konami_sound_2x_ay8910/8910.1/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/8910.1'}), (b:KG {id: 'audioroute:device:galaxian_state.konami_sound_2x_ay8910/8910.1/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/8910.1'}), (b:KG {id: 'audioroute:device:galaxian_state.konami_sound_2x_ay8910/8910.1/2'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/konami'}), (b:KG {id: 'audioroute:device:galaxian_state.konami_sound_2x_ay8910/konami/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'handler:galaxian_state.galaxian_flip_screen_x_w'}), (b:KG {id: 'handler:galaxian_state.stars_update_origin'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaxian_state.galaxian_base/maincpu'}), (b:KG {id: 'map:galaxian_state.galaxian_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'gfxdecode:gfx_galaxian'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 7441, sourceColumn: 8, sourceEndLine: 7441};
MATCH (a:KG {id: 'gfxdecode:gfx_galaxian'}), (b:KG {id: 'gfxdecode:gfx_galaxian/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_galaxian'}), (b:KG {id: 'gfxdecode:gfx_galaxian/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:galaxian_state.galaxian_base/palette'}), (b:KG {id: 'device:galaxian_state.galaxian_base/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaxian_state.galaxian_base/screen'}), (b:KG {id: 'device:galaxian_state.galaxian_base/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaxian_state.galaxian_base/screen'}), (b:KG {id: 'device:galaxian_state.galaxian_base/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_base/ppi8255_0/callback:ppi8255_0:3'}), (b:KG {id: 'handler:galaxian_state.konami_portc_0_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_base/ppi8255_1/callback:ppi8255_1:0'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_base/ppi8255_1/callback:ppi8255_1:1'}), (b:KG {id: 'handler:galaxian_state.konami_sound_control_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:galaxian_state.konami_sound_map'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2895, sourceColumn: 1, sourceEndLine: 2900};
MATCH (a:KG {id: 'map:galaxian_state.konami_sound_map'}), (b:KG {id: 'map:galaxian_state.konami_sound_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.konami_sound_map'}), (b:KG {id: 'map:galaxian_state.konami_sound_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.konami_sound_map'}), (b:KG {id: 'map:galaxian_state.konami_sound_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaxian_state.konami_sound_portmap'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 2902, sourceColumn: 1, sourceEndLine: 2906};
MATCH (a:KG {id: 'map:galaxian_state.konami_sound_portmap'}), (b:KG {id: 'map:galaxian_state.konami_sound_portmap/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/8910.0/callback:8910_0:0'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/8910.0/callback:8910_0:0'}), (b:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/soundlatch'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:galaxian_state.konami_sound_2x_ay8910/8910.0/callback:8910_0:1'}), (b:KG {id: 'handler:galaxian_state.konami_sound_timer_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map'}), (b:KG {id: 'file:src/mame/galaxian/galaxian.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/galaxian/galaxian.cpp', sourceLine: 1769, sourceColumn: 1, sourceEndLine: 1773};
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map'}), (b:KG {id: 'map:galaxian_state.galaxian_map_base'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:galaxian_state.galaxian_map'}), (b:KG {id: 'map:galaxian_state.galaxian_map_discrete'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_galaxian/e0'}), (b:KG {id: 'gfxlayout:galaxian_charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_galaxian/e1'}), (b:KG {id: 'gfxlayout:galaxian_spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:galaxian_state.galaxian_base/palette/callback:palette_init'}), (b:KG {id: 'handler:galaxian_state.galaxian_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaxian_state.galaxian_base/screen/callback:screen:0'}), (b:KG {id: 'handler:galaxian_state.screen_update_galaxian'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaxian_state.galaxian_base/screen/callback:screen:1'}), (b:KG {id: 'handler:galaxian_state.vblank_interrupt_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:galaxian_state.konami_sound_map/range2'}), (b:KG {id: 'handler:galaxian_state.konami_sound_filter_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaxian_state.konami_sound_portmap/range0'}), (b:KG {id: 'handler:galaxian_state.konami_ay8910_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:galaxian_state.konami_sound_portmap/range0'}), (b:KG {id: 'handler:galaxian_state.konami_ay8910_w'}) MERGE (a)-[r:WRITES]->(b);
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
