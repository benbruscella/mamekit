// mamekit knowledge graph — driver src/mame/sinclair/spec128.cpp
// generated 2026-10-22T07:56:31.770Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/sinclair/spec128.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/sinclair/spec128.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:spec128.h'}) SET n:SourceFile SET n += {path: 'spec128.h', external: true};
MERGE (n:KG {id: 'file:bus/spectrum/ay/slot.h'}) SET n:SourceFile SET n += {path: 'bus/spectrum/ay/slot.h', external: true};
MERGE (n:KG {id: 'file:bus/spectrum/dma/slot.h'}) SET n:SourceFile SET n += {path: 'bus/spectrum/dma/slot.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:formats/tzx_cas.h'}) SET n:SourceFile SET n += {path: 'formats/tzx_cas.h', external: true};
MERGE (n:KG {id: 'file:spectrum.h'}) SET n:SourceFile SET n += {path: 'spectrum.h', external: true};
MERGE (n:KG {id: 'file:spec_snqk.h'}) SET n:SourceFile SET n += {path: 'spec_snqk.h', external: true};
MERGE (n:KG {id: 'file:src/mame/sinclair/spectrum.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/sinclair/spectrum.cpp'};
MERGE (n:KG {id: 'file:softlist_dev.h'}) SET n:SourceFile SET n += {path: 'softlist_dev.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:src/devices/bus/spectrum/ay/cards.cpp'}) SET n:SourceFile SET n += {path: 'src/devices/bus/spectrum/ay/cards.cpp'};
MERGE (n:KG {id: 'file:cards.h'}) SET n:SourceFile SET n += {path: 'cards.h', external: true};
MERGE (n:KG {id: 'game:spec128'}) SET n:Game SET n += {name: 'spec128', year: '1986', company: 'Sinclair Research Ltd', fullname: 'ZX Spectrum 128', monitor: 'ROT0', cls: 'spectrum_128_state', init: 'empty_init', flags: '0', kind: 'computer', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 507, sourceColumn: 1, sourceEndLine: 507};
MERGE (n:KG {id: 'romset:spec128'}) SET n:RomSet SET n += {name: 'spec128', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 471, sourceColumn: 1, sourceEndLine: 471};
MERGE (n:KG {id: 'region:spec128/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 98304, flags: '0', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 472, sourceColumn: 2, sourceEndLine: 472};
MERGE (n:KG {id: 'rom:spec128/maincpu/zx128_0.rom'}) SET n:Rom SET n += {file: 'zx128_0.rom', offset: 65536, size: 16384, crc: 'e76799d2', sha1: '4f4b11ec22326280bdb96e3baf9db4b4cb1d02c5', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 501, sourceColumn: 2, sourceEndLine: 501};
MERGE (n:KG {id: 'rom:spec128/maincpu/zx128_1.rom'}) SET n:Rom SET n += {file: 'zx128_1.rom', offset: 81920, size: 16384, crc: 'b96a36be', sha1: '80080644289ed93d71a1103992a154cc9802b2fa'};
MERGE (n:KG {id: 'map:spectrum_128_state.spectrum_128_io'}) SET n:AddressMap SET n += {cls: 'spectrum_128_state', name: 'spectrum_128_io', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 272, sourceColumn: 1, sourceEndLine: 279};
MERGE (n:KG {id: 'map:spectrum_128_state.spectrum_128_io/range0'}) SET n:AddressRange SET n += {start: 0, end: 0, raw: 'map(0x0000, 0x0000).select(0xfffe).rw(FUNC(spectrum_128_state::spectrum_ula_r), FUNC(spectrum_128_state::spectrum_ula_w))', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 274, sourceColumn: 2, sourceEndLine: 274};
MERGE (n:KG {id: 'handler:spectrum_128_state.spectrum_ula_r'}) SET n:Handler SET n += {method: 'spectrum_ula_r', ownerClass: 'spectrum_128_state', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 372, sourceColumn: 1, sourceEndLine: 446, sourceParameters: 'offs_t offset', sourceBody: 'm_ula->ula_r(offset);

	int lines = offset >> 8;
	int data = 0xff;

	int cs_extra1 = m_io_plus0.read_safe(0x1f) & 0x1f;
	int cs_extra2 = m_io_plus1.read_safe(0x1f) & 0x1f;
	int cs_extra3 = m_io_plus2.read_safe(0x1f) & 0x1f;
	int ss_extra1 = m_io_plus3.read_safe(0x1f) & 0x1f;
	int ss_extra2 = m_io_plus4.read_safe(0x1f) & 0x1f;
	int joy1 = m_io_joy1.read_safe(0x1f) & 0x1f;
	int joy2 = m_io_joy2.read_safe(0x1f) & 0x1f;

	/* expansion port */
	if (m_exp) data = m_exp->iorq_r(offset);

	/* Caps - V */
	if ((lines & 1) == 0)
	{
		data &= m_io_line0->read();
		/* CAPS for extra keys */
		if (cs_extra1 != 0x1f || cs_extra2 != 0x1f || cs_extra3 != 0x1f)
			data &= ~0x01;
	}

	/* A - G */
	if ((lines & 2) == 0)
		data &= m_io_line1->read();

	/* Q - T */
	if ((lines & 4) == 0)
		data &= m_io_line2->read();

	/* 1 - 5 */
	if ((lines & 8) == 0)
		data &= m_io_line3->read() & cs_extra1 & joy2;

	/* 6 - 0 */
	if ((lines & 16) == 0)
		data &= m_io_line4->read() & cs_extra2 & joy1;

	/* Y - P */
	if ((lines & 32) == 0)
		data &= m_io_line5->read() & ss_extra1;

	/* H - Enter */
	if ((lines & 64) == 0)
		data &= m_io_line6->read();

	/* B - Space */
	if ((lines & 128) == 0)
	{
		data &= m_io_line7->read() & cs_extra3 & ss_extra2;
		/* SYMBOL SHIFT for extra keys */
		if (ss_extra1 != 0x1f || ss_extra2 != 0x1f)
			data &= ~0x02;
	}

	data |= (0xe0); /* Set bits 5-7 - as reset above */

	/* cassette input from wav */
	if (m_cassette->input() > 0.0038 )
	{
		data &= ~0x40;
	}

	/* Issue 2 Spectrums default to having bits 5, 6 & 7 set.
	Issue 3 Spectrums default to having bits 5 & 7 set and bit 6 reset. */
	if ((m_io_config->read() & 0x80) == 0)
		data ^= (0x40);

	return data;', sourceReturnType: 'uint8_t', inputMembers: ['m_io_line0=LINE0', 'm_io_line1=LINE1', 'm_io_line2=LINE2', 'm_io_line3=LINE3', 'm_io_line4=LINE4', 'm_io_line5=LINE5', 'm_io_line6=LINE6', 'm_io_line7=LINE7', 'm_io_config=CONFIG', 'm_io_plus0=PLUS0', 'm_io_plus1=PLUS1', 'm_io_plus2=PLUS2', 'm_io_plus3=PLUS3', 'm_io_plus4=PLUS4', 'm_io_joy1=JOY1', 'm_io_joy2=JOY2']};
MERGE (n:KG {id: 'handler:spectrum_128_state.spectrum_ula_w'}) SET n:Handler SET n += {method: 'spectrum_ula_w', ownerClass: 'spectrum_128_state', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 345, sourceColumn: 1, sourceEndLine: 368, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_ula->ula_w(offset);

	u8 changed = m_port_fe_data ^ data;

	/* D0-D2: border colour changed? */
	if (changed & 0x07) m_screen->update_now();

	/* D3-D4: MIC+DAC output state */
	if (changed & 0x18)
	{
		/* D3: write cassette data */
		if (BIT(changed, 3)) m_cassette->output(BIT(data, 3) ? -1.0 : +1.0);

		m_speaker->level_w(BIT(data, 3, 2));
	}

	// Some exp devices use ula port unused bits 5-7:
	// Beta v2/3/plus use bit 7, Beta clones use bits 6 and 7
	if (m_exp) m_exp->iorq_w(offset, data);

	m_port_fe_data = data;'};
MERGE (n:KG {id: 'map:spectrum_128_state.spectrum_128_io/range1'}) SET n:AddressRange SET n += {start: 1, end: 1, raw: 'map(0x0001, 0x0001).select(0xfffe).rw(FUNC(spectrum_128_state::spectrum_port_r), FUNC(spectrum_128_state::spectrum_port_w))', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 275, sourceColumn: 2, sourceEndLine: 275};
MERGE (n:KG {id: 'handler:spectrum_128_state.spectrum_port_r'}) SET n:Handler SET n += {method: 'spectrum_port_r', ownerClass: 'spectrum_128_state', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 261, sourceColumn: 1, sourceEndLine: 270, sourceParameters: 'offs_t offset', sourceBody: 'm_ula->io_r(offset);

	// Pass through to expansion device if present
	if (m_exp->get_card_device())
		return m_exp->iorq_r(offset | 1);

	return floating_bus_r();', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:spectrum_state.floating_bus_r'}) SET n:Handler SET n += {method: 'floating_bus_r', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 478, sourceColumn: 1, sourceEndLine: 528, sourceParameters: '', sourceBody: '/*
	*  "floating bus"
	*  (cpu can peek at the video bus via odd i/o read, some games use it for timing instead of vblank)
	*
	*  It seems this trick was found quite late in the life of the original Sinclair models,
	*  then found not to work properly on the later Amstrad models, so was mostly abandoned by devs.
	*  This means most games that use it were released in a relatively small window of mid-late 1986.
	*
	*  known games:
	*    Arkanoid
	*    Cobra
	*    Sidewize
	*    Short Circuit
	*    Renegade
	*    Terra Cresta
	*
	*    ...others?
	*
	*  (Sidewize uses port 0x40ff, others use 0x28ff)
	*
	*  Note, some were later re-released as "fixed" +2A compatible versions with the floating bus code removed (Arkanoid, Cobra, others?).
	*/

	u8 data = 0xff;

	// peek into attribute ram when beam is in display area
	// ula always returns ff when in border area (or h/vblank)
	if (m_ula->is_in_contended_area())
	{
		const u64 vpos = m_screen->vpos();
		const u64 now = m_maincpu->total_cycles() - m_ula->get_irq_at();
		const u64 cf = vpos * m_ula->get_video_line_clocks() + m_ula->get_raster_contention_offset();
		const u64 ct = cf + m_ula->get_raster_line_clocks();
		if (cf <= now && now < ct)
		{
			u64 clocks = now - cf;
			if (!BIT(clocks, 2))
			{
				u16 y = vpos - get_screen_area().top();
				u16 x = (clocks >> 2) + BIT(clocks, 1);
				data = clocks & 1
					? m_screen_location[0x1800 + (((y & 0xf8) << 2) | x)]
					: m_screen_location[((y & 7) << 8) | ((y & 0x38) << 2) | ((y & 0xc0) << 5) | x];
			}
		}
	}

	return data;', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:spectrum_state.get_screen_area'}) SET n:Handler SET n += {method: 'get_screen_area', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 409, sourceColumn: 1, sourceEndLine: 105, sourceConstants: ['SPEC128_UNSEEN_LINES=15', 'SPEC_TOP_BORDER=48', 'SPEC_DISPLAY_YSIZE=192', 'SPEC_LEFT_BORDER=48', 'SPEC_DISPLAY_XSIZE=256'], sourceParameters: '', sourceBody: 'return { SPEC_LEFT_BORDER, SPEC_LEFT_BORDER + SPEC_DISPLAY_XSIZE - 1,
			SPEC128_UNSEEN_LINES + SPEC_TOP_BORDER, SPEC128_UNSEEN_LINES + SPEC_TOP_BORDER + SPEC_DISPLAY_YSIZE - 1 };', sourceReturnType: 'rectangle', dispatchedFrom: 'spectrum_128_state'};
MERGE (n:KG {id: 'handler:spectrum_128_state.spectrum_port_w'}) SET n:Handler SET n += {method: 'spectrum_port_w', ownerClass: 'spectrum_128_state', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 448, sourceColumn: 1, sourceEndLine: 455, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_ula->io_w(offset);

	// Pass through to expansion device if present
	if (m_exp->get_card_device())
		m_exp->iorq_w(offset | 1, data);'};
MERGE (n:KG {id: 'map:spectrum_128_state.spectrum_128_io/range2'}) SET n:AddressRange SET n += {start: 1, end: 1, raw: 'map(0x0001, 0x0001).select(0x7ffc).w(FUNC(spectrum_128_state::spectrum_128_port_7ffd_w))', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 276, sourceColumn: 2, sourceEndLine: 276};
MERGE (n:KG {id: 'handler:spectrum_128_state.spectrum_128_port_7ffd_w'}) SET n:Handler SET n += {method: 'spectrum_128_port_7ffd_w', ownerClass: 'spectrum_128_state', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 224, sourceColumn: 1, sourceEndLine: 238, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_ula->ula_w(offset);

	// disable paging?
	if (m_port_7ffd_data & 0x20) return;

	// store new state
	m_port_7ffd_data = data;

	// update memory
	spectrum_128_update_memory();

	m_exp->iorq_w(offset | 1, data);'};
MERGE (n:KG {id: 'handler:spectrum_128_state.spectrum_128_update_memory'}) SET n:Handler SET n += {method: 'spectrum_128_update_memory', ownerClass: 'spectrum_128_state', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 247, sourceColumn: 1, sourceEndLine: 259, sourceParameters: '', sourceBody: 'm_bank_rom[0]->set_entry(BIT(m_port_7ffd_data, 4));
	// select ram at 0x0c000-0x0ffff
	m_bank_ram[3]->set_entry(m_port_7ffd_data & 0x07);
	m_ula->bank3_pg_w(m_port_7ffd_data & 0x07);

	m_screen->update_now();
	if (BIT(m_port_7ffd_data, 3))
		m_screen_location = m_ram->pointer() + (7 << 14);
	else
		m_screen_location = m_ram->pointer() + (5 << 14);'};
MERGE (n:KG {id: 'handler:spectrum_ula_device.bank3_pg_w'}) SET n:Handler SET n += {method: 'bank3_pg_w', ownerClass: 'spectrum_ula_device', sourceFile: 'src/mame/sinclair/spectrum_ula.h', sourceLine: 30, sourceColumn: 1, sourceEndLine: 30, sourceParameters: 'u8 bank3_page', sourceBody: 'm_bank3_page = bank3_page;'};
MERGE (n:KG {id: 'map:spectrum_128_state.spectrum_128_io/range3'}) SET n:AddressRange SET n += {start: 32768, end: 32768, raw: 'map(0x8000, 0x8000).mirror(0x3ffd).w("ay_slot", FUNC(ay_slot_device::data_w))', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 277, sourceColumn: 2, sourceEndLine: 277, mirror: 16381};
MERGE (n:KG {id: 'handler:ay_slot_device.data_w'}) SET n:Handler SET n += {method: 'data_w', ownerClass: 'ay_slot_device', sourceFile: 'src/mame/sinclair/timex.cpp', sourceLine: 530, sourceColumn: 2, sourceEndLine: 530};
MERGE (n:KG {id: 'map:spectrum_128_state.spectrum_128_io/range4'}) SET n:AddressRange SET n += {start: 49152, end: 49152, raw: 'map(0xc000, 0xc000).mirror(0x3ffd).rw("ay_slot", FUNC(ay_slot_device::data_r), FUNC(ay_slot_device::address_w))', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 278, sourceColumn: 2, sourceEndLine: 278, mirror: 16381};
MERGE (n:KG {id: 'handler:ay_slot_device.data_r'}) SET n:Handler SET n += {method: 'data_r', ownerClass: 'ay_slot_device', sourceFile: 'src/mame/sinclair/timex.cpp', sourceLine: 530, sourceColumn: 2, sourceEndLine: 530};
MERGE (n:KG {id: 'handler:ay_slot_device.address_w'}) SET n:Handler SET n += {method: 'address_w', ownerClass: 'ay_slot_device', sourceFile: 'src/mame/sinclair/timex.cpp', sourceLine: 529, sourceColumn: 2, sourceEndLine: 529};
MERGE (n:KG {id: 'map:spectrum_128_state.spectrum_128_mem'}) SET n:AddressMap SET n += {cls: 'spectrum_128_state', name: 'spectrum_128_mem', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 281, sourceColumn: 1, sourceEndLine: 287};
MERGE (n:KG {id: 'map:spectrum_128_state.spectrum_128_mem/range0'}) SET n:AddressRange SET n += {start: 0, end: 16383, raw: 'map(0x0000, 0x3fff).rw(FUNC(spectrum_128_state::spectrum_128_rom_r), FUNC(spectrum_128_state::spectrum_128_rom_w))', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 283, sourceColumn: 2, sourceEndLine: 283};
MERGE (n:KG {id: 'handler:spectrum_128_state.spectrum_128_rom_r'}) SET n:Handler SET n += {method: 'spectrum_128_rom_r', ownerClass: 'spectrum_128_state', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 193, sourceColumn: 1, sourceEndLine: 198, sourceParameters: 'offs_t offset', sourceBody: 'return m_exp->romcs()
		? m_exp->mreq_r(offset)
		: ((u8*)m_bank_rom[0]->base())[offset];', sourceReturnType: 'u8'};
MERGE (n:KG {id: 'handler:spectrum_128_state.spectrum_128_rom_w'}) SET n:Handler SET n += {method: 'spectrum_128_rom_w', ownerClass: 'spectrum_128_state', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 188, sourceColumn: 1, sourceEndLine: 191, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_exp->mreq_w(offset, data);'};
MERGE (n:KG {id: 'map:spectrum_128_state.spectrum_128_mem/range1'}) SET n:AddressRange SET n += {start: 16384, end: 32767, raw: 'map(0x4000, 0x7fff).rw(FUNC(spectrum_128_state::spectrum_128_ram_r<1>), FUNC(spectrum_128_state::spectrum_128_ram_w<1>))', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 284, sourceColumn: 2, sourceEndLine: 284};
MERGE (n:KG {id: 'handler:spectrum_128_state.spectrum_128_ram_r_1'}) SET n:Handler SET n += {method: 'spectrum_128_ram_r_1', ownerClass: 'spectrum_128_state', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 212, sourceColumn: 1, sourceEndLine: 218, sourceConstants: ['Bank=1'], sourceParameters: 'offs_t offset', sourceBody: 'u16 addr = 0x4000 * Bank + offset;
	m_ula->data_r(addr);

	return ((u8*)m_bank_ram[Bank]->base())[offset];', sourceReturnType: 'u8'};
MERGE (n:KG {id: 'handler:spectrum_128_state.spectrum_128_ram_w_1'}) SET n:Handler SET n += {method: 'spectrum_128_ram_w_1', ownerClass: 'spectrum_128_state', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 200, sourceColumn: 1, sourceEndLine: 207, sourceConstants: ['Bank=1'], sourceParameters: 'offs_t offset, u8 data', sourceBody: 'u16 addr = 0x4000 * Bank + offset;
	m_ula->data_w(addr);
	if (is_vram_write(addr)) m_screen->update_now();

	((u8*)m_bank_ram[Bank]->base())[offset] = data;'};
MERGE (n:KG {id: 'handler:spectrum_128_state.is_vram_write'}) SET n:Handler SET n += {method: 'is_vram_write', ownerClass: 'spectrum_128_state', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 379, sourceColumn: 1, sourceEndLine: 383, sourceParameters: 'offs_t offset', sourceBody: 'return (BIT(m_port_7ffd_data, 3) && m_bank_ram[3]->entry() == 7)
		? offset >= 0xc000 && offset < 0xdb00
		: spectrum_state::is_vram_write(offset);', sourceReturnType: 'bool'};
MERGE (n:KG {id: 'handler:spectrum_state.is_vram_write'}) SET n:Handler SET n += {method: 'is_vram_write', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spectrum_v.cpp', sourceLine: 216, sourceColumn: 1, sourceEndLine: 218, sourceParameters: 'offs_t offset', sourceBody: 'return offset >= 0x4000 && offset < 0x5b00;', sourceReturnType: 'bool'};
MERGE (n:KG {id: 'map:spectrum_128_state.spectrum_128_mem/range2'}) SET n:AddressRange SET n += {start: 32768, end: 49151, raw: 'map(0x8000, 0xbfff).rw(FUNC(spectrum_128_state::spectrum_128_ram_r<2>), FUNC(spectrum_128_state::spectrum_128_ram_w<2>))', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 285, sourceColumn: 2, sourceEndLine: 285};
MERGE (n:KG {id: 'handler:spectrum_128_state.spectrum_128_ram_r_2'}) SET n:Handler SET n += {method: 'spectrum_128_ram_r_2', ownerClass: 'spectrum_128_state', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 212, sourceColumn: 1, sourceEndLine: 218, sourceConstants: ['Bank=2'], sourceParameters: 'offs_t offset', sourceBody: 'u16 addr = 0x4000 * Bank + offset;
	m_ula->data_r(addr);

	return ((u8*)m_bank_ram[Bank]->base())[offset];', sourceReturnType: 'u8'};
MERGE (n:KG {id: 'handler:spectrum_128_state.spectrum_128_ram_w_2'}) SET n:Handler SET n += {method: 'spectrum_128_ram_w_2', ownerClass: 'spectrum_128_state', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 200, sourceColumn: 1, sourceEndLine: 207, sourceConstants: ['Bank=2'], sourceParameters: 'offs_t offset, u8 data', sourceBody: 'u16 addr = 0x4000 * Bank + offset;
	m_ula->data_w(addr);
	if (is_vram_write(addr)) m_screen->update_now();

	((u8*)m_bank_ram[Bank]->base())[offset] = data;'};
MERGE (n:KG {id: 'map:spectrum_128_state.spectrum_128_mem/range3'}) SET n:AddressRange SET n += {start: 49152, end: 65535, raw: 'map(0xc000, 0xffff).rw(FUNC(spectrum_128_state::spectrum_128_ram_r<3>), FUNC(spectrum_128_state::spectrum_128_ram_w<3>))', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 286, sourceColumn: 2, sourceEndLine: 286};
MERGE (n:KG {id: 'handler:spectrum_128_state.spectrum_128_ram_r_3'}) SET n:Handler SET n += {method: 'spectrum_128_ram_r_3', ownerClass: 'spectrum_128_state', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 212, sourceColumn: 1, sourceEndLine: 218, sourceConstants: ['Bank=3'], sourceParameters: 'offs_t offset', sourceBody: 'u16 addr = 0x4000 * Bank + offset;
	m_ula->data_r(addr);

	return ((u8*)m_bank_ram[Bank]->base())[offset];', sourceReturnType: 'u8'};
MERGE (n:KG {id: 'handler:spectrum_128_state.spectrum_128_ram_w_3'}) SET n:Handler SET n += {method: 'spectrum_128_ram_w_3', ownerClass: 'spectrum_128_state', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 200, sourceColumn: 1, sourceEndLine: 207, sourceConstants: ['Bank=3'], sourceParameters: 'offs_t offset, u8 data', sourceBody: 'u16 addr = 0x4000 * Bank + offset;
	m_ula->data_w(addr);
	if (is_vram_write(addr)) m_screen->update_now();

	((u8*)m_bank_ram[Bank]->base())[offset] = data;'};
MERGE (n:KG {id: 'map:spectrum_128_state.spectrum_128_fetch'}) SET n:AddressMap SET n += {cls: 'spectrum_128_state', name: 'spectrum_128_fetch', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 289, sourceColumn: 1, sourceEndLine: 292};
MERGE (n:KG {id: 'map:spectrum_128_state.spectrum_128_fetch/range0'}) SET n:AddressRange SET n += {start: 0, end: 65535, raw: 'map(0x0000, 0xffff).r(FUNC(spectrum_128_state::spectrum_128_pre_opcode_fetch_r))', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 291, sourceColumn: 2, sourceEndLine: 291};
MERGE (n:KG {id: 'handler:spectrum_128_state.spectrum_128_pre_opcode_fetch_r'}) SET n:Handler SET n += {method: 'spectrum_128_pre_opcode_fetch_r', ownerClass: 'spectrum_128_state', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 174, sourceColumn: 1, sourceEndLine: 186, sourceParameters: 'offs_t offset', sourceBody: 'm_ula->m1(offset);

	/* this allows expansion devices to act upon opcode fetches from MEM addresses
	   for example, interface1 detection fetches requires fetches at 0008 / 0708 to
	   enable paged ROM and then fetches at 0700 to disable it
	*/
	m_exp->pre_opcode_fetch(offset);
	uint8_t retval = m_program.read_byte(offset);
	m_exp->post_opcode_fetch(offset);
	return retval;', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'map:spectrum_state.spectrum_map'}) SET n:AddressMap SET n += {cls: 'spectrum_state', name: 'spectrum_map', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 533, sourceColumn: 1, sourceEndLine: 540};
MERGE (n:KG {id: 'map:spectrum_state.spectrum_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 16383, raw: 'map(0x0000, 0x3fff).rw(FUNC(spectrum_state::spectrum_rom_r), FUNC(spectrum_state::spectrum_rom_w))', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 535, sourceColumn: 2, sourceEndLine: 535};
MERGE (n:KG {id: 'handler:spectrum_state.spectrum_rom_r'}) SET n:Handler SET n += {method: 'spectrum_rom_r', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 332, sourceColumn: 1, sourceEndLine: 337, sourceParameters: 'offs_t offset', sourceBody: 'return (m_exp && m_exp->romcs())
		? m_exp->mreq_r(offset)
		: m_rom[offset];', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:spectrum_state.spectrum_rom_w'}) SET n:Handler SET n += {method: 'spectrum_rom_w', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 327, sourceColumn: 1, sourceEndLine: 330, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_exp->mreq_w(offset, data);'};
MERGE (n:KG {id: 'map:spectrum_state.spectrum_map/range1'}) SET n:AddressRange SET n += {start: 16384, end: 23295, raw: 'map(0x4000, 0x5aff).ram().share("video_ram")', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 536, sourceColumn: 2, sourceEndLine: 536, ram: true, share: 'video_ram'};
MERGE (n:KG {id: 'map:spectrum_state.spectrum_opcodes'}) SET n:AddressMap SET n += {cls: 'spectrum_state', name: 'spectrum_opcodes', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 542, sourceColumn: 1, sourceEndLine: 545};
MERGE (n:KG {id: 'map:spectrum_state.spectrum_opcodes/range0'}) SET n:AddressRange SET n += {start: 0, end: 65535, raw: 'map(0x0000, 0xffff).r(FUNC(spectrum_state::pre_opcode_fetch_r))', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 544, sourceColumn: 2, sourceEndLine: 544};
MERGE (n:KG {id: 'handler:spectrum_state.pre_opcode_fetch_r'}) SET n:Handler SET n += {method: 'pre_opcode_fetch_r', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 295, sourceColumn: 1, sourceEndLine: 307, sourceParameters: 'offs_t offset', sourceBody: 'm_ula->m1(offset);

	/* this allows expansion devices to act upon opcode fetches from MEM addresses
	   for example, interface1 detection fetches requires fetches at 0008 / 0708 to
	   enable paged ROM and then fetches at 0700 to disable it
	*/
	m_exp->pre_opcode_fetch(offset);
	uint8_t retval = m_specmem->read8(offset);
	m_exp->post_opcode_fetch(offset);
	return retval;', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'map:spectrum_state.spectrum_data'}) SET n:AddressMap SET n += {cls: 'spectrum_state', name: 'spectrum_data', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 547, sourceColumn: 1, sourceEndLine: 550};
MERGE (n:KG {id: 'map:spectrum_state.spectrum_data/range0'}) SET n:AddressRange SET n += {start: 0, end: 65535, raw: 'map(0x0000, 0xffff).rw(FUNC(spectrum_state::spectrum_data_r), FUNC(spectrum_state::spectrum_data_w))', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 549, sourceColumn: 2, sourceEndLine: 549};
MERGE (n:KG {id: 'handler:spectrum_state.spectrum_data_r'}) SET n:Handler SET n += {method: 'spectrum_data_r', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 309, sourceColumn: 1, sourceEndLine: 317, sourceParameters: 'offs_t offset', sourceBody: 'm_ula->data_r(offset);

	m_exp->pre_data_fetch(offset);
	uint8_t retval = m_specmem->read8(offset);
	m_exp->post_data_fetch(offset);
	return retval;', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:spectrum_state.spectrum_data_w'}) SET n:Handler SET n += {method: 'spectrum_data_w', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 319, sourceColumn: 1, sourceEndLine: 325, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_ula->data_w(offset);
	if (is_vram_write(offset)) m_screen->update_now();

	m_specmem->write8(offset,data);'};
MERGE (n:KG {id: 'map:spectrum_state.spectrum_io'}) SET n:AddressMap SET n += {cls: 'spectrum_state', name: 'spectrum_io', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 558, sourceColumn: 1, sourceEndLine: 562};
MERGE (n:KG {id: 'map:spectrum_state.spectrum_io/range0'}) SET n:AddressRange SET n += {start: 0, end: 0, raw: 'map(0x00, 0x00).rw(FUNC(spectrum_state::spectrum_ula_r), FUNC(spectrum_state::spectrum_ula_w)).select(0xfffe)', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 560, sourceColumn: 2, sourceEndLine: 560};
MERGE (n:KG {id: 'handler:spectrum_state.spectrum_ula_r'}) SET n:Handler SET n += {method: 'spectrum_ula_r', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 372, sourceColumn: 1, sourceEndLine: 446, sourceParameters: 'offs_t offset', sourceBody: 'm_ula->ula_r(offset);

	int lines = offset >> 8;
	int data = 0xff;

	int cs_extra1 = m_io_plus0.read_safe(0x1f) & 0x1f;
	int cs_extra2 = m_io_plus1.read_safe(0x1f) & 0x1f;
	int cs_extra3 = m_io_plus2.read_safe(0x1f) & 0x1f;
	int ss_extra1 = m_io_plus3.read_safe(0x1f) & 0x1f;
	int ss_extra2 = m_io_plus4.read_safe(0x1f) & 0x1f;
	int joy1 = m_io_joy1.read_safe(0x1f) & 0x1f;
	int joy2 = m_io_joy2.read_safe(0x1f) & 0x1f;

	/* expansion port */
	if (m_exp) data = m_exp->iorq_r(offset);

	/* Caps - V */
	if ((lines & 1) == 0)
	{
		data &= m_io_line0->read();
		/* CAPS for extra keys */
		if (cs_extra1 != 0x1f || cs_extra2 != 0x1f || cs_extra3 != 0x1f)
			data &= ~0x01;
	}

	/* A - G */
	if ((lines & 2) == 0)
		data &= m_io_line1->read();

	/* Q - T */
	if ((lines & 4) == 0)
		data &= m_io_line2->read();

	/* 1 - 5 */
	if ((lines & 8) == 0)
		data &= m_io_line3->read() & cs_extra1 & joy2;

	/* 6 - 0 */
	if ((lines & 16) == 0)
		data &= m_io_line4->read() & cs_extra2 & joy1;

	/* Y - P */
	if ((lines & 32) == 0)
		data &= m_io_line5->read() & ss_extra1;

	/* H - Enter */
	if ((lines & 64) == 0)
		data &= m_io_line6->read();

	/* B - Space */
	if ((lines & 128) == 0)
	{
		data &= m_io_line7->read() & cs_extra3 & ss_extra2;
		/* SYMBOL SHIFT for extra keys */
		if (ss_extra1 != 0x1f || ss_extra2 != 0x1f)
			data &= ~0x02;
	}

	data |= (0xe0); /* Set bits 5-7 - as reset above */

	/* cassette input from wav */
	if (m_cassette->input() > 0.0038 )
	{
		data &= ~0x40;
	}

	/* Issue 2 Spectrums default to having bits 5, 6 & 7 set.
	Issue 3 Spectrums default to having bits 5 & 7 set and bit 6 reset. */
	if ((m_io_config->read() & 0x80) == 0)
		data ^= (0x40);

	return data;', sourceReturnType: 'uint8_t', inputMembers: ['m_io_line0=LINE0', 'm_io_line1=LINE1', 'm_io_line2=LINE2', 'm_io_line3=LINE3', 'm_io_line4=LINE4', 'm_io_line5=LINE5', 'm_io_line6=LINE6', 'm_io_line7=LINE7', 'm_io_config=CONFIG', 'm_io_plus0=PLUS0', 'm_io_plus1=PLUS1', 'm_io_plus2=PLUS2', 'm_io_plus3=PLUS3', 'm_io_plus4=PLUS4', 'm_io_joy1=JOY1', 'm_io_joy2=JOY2']};
MERGE (n:KG {id: 'handler:spectrum_state.spectrum_ula_w'}) SET n:Handler SET n += {method: 'spectrum_ula_w', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 345, sourceColumn: 1, sourceEndLine: 368, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_ula->ula_w(offset);

	u8 changed = m_port_fe_data ^ data;

	/* D0-D2: border colour changed? */
	if (changed & 0x07) m_screen->update_now();

	/* D3-D4: MIC+DAC output state */
	if (changed & 0x18)
	{
		/* D3: write cassette data */
		if (BIT(changed, 3)) m_cassette->output(BIT(data, 3) ? -1.0 : +1.0);

		m_speaker->level_w(BIT(data, 3, 2));
	}

	// Some exp devices use ula port unused bits 5-7:
	// Beta v2/3/plus use bit 7, Beta clones use bits 6 and 7
	if (m_exp) m_exp->iorq_w(offset, data);

	m_port_fe_data = data;'};
MERGE (n:KG {id: 'map:spectrum_state.spectrum_io/range1'}) SET n:AddressRange SET n += {start: 1, end: 1, raw: 'map(0x01, 0x01).rw(FUNC(spectrum_state::spectrum_port_r), FUNC(spectrum_state::spectrum_port_w)).select(0xfffe)', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 561, sourceColumn: 2, sourceEndLine: 561};
MERGE (n:KG {id: 'handler:spectrum_state.spectrum_port_r'}) SET n:Handler SET n += {method: 'spectrum_port_r', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 261, sourceColumn: 1, sourceEndLine: 466, sourceParameters: 'offs_t offset', sourceBody: 'm_ula->io_r(offset);

	// Pass through to expansion device if present
	if (m_exp->get_card_device())
		return m_exp->iorq_r(offset | 1);

	return floating_bus_r();', sourceReturnType: 'uint8_t', dispatchedFrom: 'spectrum_128_state'};
MERGE (n:KG {id: 'handler:spectrum_state.spectrum_port_w'}) SET n:Handler SET n += {method: 'spectrum_port_w', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 448, sourceColumn: 1, sourceEndLine: 455, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_ula->io_w(offset);

	// Pass through to expansion device if present
	if (m_exp->get_card_device())
		m_exp->iorq_w(offset | 1, data);'};
MERGE (n:KG {id: 'handler:spectrum_state.irq_on'}) SET n:Handler SET n += {method: 'irq_on', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 712, sourceColumn: 1, sourceEndLine: 717, sourceParameters: 'int param', sourceBody: 'm_ula->on_irq();
	m_maincpu->set_input_line(INPUT_LINE_IRQ0, ASSERT_LINE);
	m_irq_off_timer->adjust(m_maincpu->clocks_to_attotime(32 + m_ula->get_irq_ext_length()));'};
MERGE (n:KG {id: 'handler:spectrum_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spectrum_v.cpp', sourceLine: 41, sourceColumn: 1, sourceEndLine: 50, sourceParameters: '', sourceBody: 'm_irq_on_timer = timer_alloc(FUNC(spectrum_state::irq_on), this);
	m_irq_off_timer = timer_alloc(FUNC(spectrum_state::irq_off), this);
	m_finish_screen_update_timer = timer_alloc(FUNC(spectrum_state::finish_screen_update), this);
	finish_screen_update(0);

	m_frame_invert_count = 16;
	m_screen_location = m_video_ram;'};
MERGE (n:KG {id: 'handler:spectrum_128_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'spectrum_128_state', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 168, sourceColumn: 1, sourceEndLine: 172, sourceParameters: '', sourceBody: 'spectrum_state::video_start();
	m_screen_location = m_ram->pointer() + (5 << 14);'};
MERGE (n:KG {id: 'handler:spectrum_state.irq_off'}) SET n:Handler SET n += {method: 'irq_off', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 719, sourceColumn: 1, sourceEndLine: 722, sourceParameters: 'int param', sourceBody: 'm_maincpu->set_input_line(INPUT_LINE_IRQ0, CLEAR_LINE);'};
MERGE (n:KG {id: 'handler:spectrum_state.finish_screen_update'}) SET n:Handler SET n += {method: 'finish_screen_update', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spectrum_v.cpp', sourceLine: 22, sourceColumn: 1, sourceEndLine: 36, sourceParameters: 'int param', sourceBody: '/* TMP screen.cpp at the current state behaves incorrectly if layout is configured as: visarea.bottom() == m_screen.bottom()
	This leads video_manager::finish_screen_updates() to ignore final update_now(). As a result partially rendered scanline of
	the screen is redrawn entirely.
	Consider this timer a tmp solution till screen.cpp provides better support for such case.
	Validation:
	    https://mametesters.org/view.php?id=8264
	    https://mametesters.org/view.php?id=8265
	    https://github.com/mamedev/mame/pull/9670#issuecomment-1118576555
	    https://github.com/mamedev/mame/pull/9750
	*/
	if (started()) m_screen->update_now();
	m_finish_screen_update_timer->adjust(m_screen->time_until_pos(m_screen->visible_area().bottom(), m_screen->visible_area().right() + 1));'};
MERGE (n:KG {id: 'machine:spectrum_128_state.spectrum_128'}) SET n:MachineConfig SET n += {cls: 'spectrum_128_state', name: 'spectrum_128', calls: ['spectrum'], armedTimers: ['m_irq_on_timer=spectrum_state.irq_on@spectrum_state.video_start', 'm_irq_off_timer=spectrum_state.irq_off@spectrum_state.video_start', 'm_finish_screen_update_timer=spectrum_state.finish_screen_update@spectrum_state.video_start'], preciseTimers: ['m_irq_on_timer', 'm_irq_off_timer', 'm_finish_screen_update_timer'], stateMembers: ['{"name":"m_port_fe_data","bits":32,"signed":true}', '{"name":"m_port_7ffd_data","bits":32,"signed":true}', '{"name":"m_port_1ffd_data","bits":32,"signed":true}', '{"name":"m_port_ff_data","bits":32,"signed":true}', '{"name":"m_port_f4_data","bits":32,"signed":true}', '{"name":"m_frame_invert_count","bits":32,"signed":true}'], driverTimers: ['m_irq_on_timer=spectrum_state.irq_on', 'm_irq_off_timer=spectrum_state.irq_off', 'm_finish_screen_update_timer=spectrum_state.finish_screen_update'], resetHandlers: ['spectrum_state.machine_reset', 'spectrum_128_state.machine_reset'], startHandlers: ['spectrum_128_state.video_start'], devicePatches: ['{"tag":"maincpu","config":["Z80(config.replace(), m_maincpu, X1_128_SINCLAIR / 10)","m_maincpu->set_vblank_int(\\"screen\\", FUNC(spectrum_128_state::spec_interrupt))","m_maincpu->refresh_cb().set(FUNC(spectrum_128_state::spectrum_refresh_w))","m_maincpu->nomreq_cb().set(\\"ula\\", FUNC(spectrum_ula_device::nomem_rq))","m_maincpu->busack_cb().set(\\"dma\\", FUNC(dma_slot_device::bai_w))"],"replacementType":"Z80","clock":3546900}', '{"tag":"screen","config":["m_screen->set_raw(X1_128_SINCLAIR / 5, SPEC128_CYCLES_PER_LINE * 2, SPEC128_UNSEEN_LINES + SPEC_SCREEN_HEIGHT, visarea)"],"screenRaw":{"pixclock":7093800,"htotal":456,"hbend":0,"hbstart":352,"vtotal":311,"vbend":15,"vbstart":311}}', '{"tag":"gfxdecode","config":["subdevice<gfxdecode_device>(\\"gfxdecode\\")->set_info(spec128)"]}', '{"tag":"ula","config":["SPECTRUM_ULA_128K(config.replace(), m_ula)","m_ula->set_z80(m_maincpu)","m_ula->set_screen(m_screen, get_screen_area())"],"replacementType":"SPECTRUM_ULA_128K"}', '{"tag":"exp","config":["SPECTRUM_EXPANSION_SLOT(config.replace(), m_exp, spec128_expansion_devices, nullptr)","m_exp->irq_handler().set_inputline(m_maincpu, INPUT_LINE_IRQ0)","m_exp->nmi_handler().set_inputline(m_maincpu, INPUT_LINE_NMI)","m_exp->fb_r_handler().set(FUNC(spectrum_128_state::floating_bus_r))"],"replacementType":"SPECTRUM_EXPANSION_SLOT","slotOptions":"spec128_expansion_devices","slotDefault":""}', '{"tag":"dma","config":["dma_slot_device &dma(DMA_SLOT(config.replace(), \\"dma\\", X1_128_SINCLAIR / 10, default_dma_slot_devices, nullptr))","dma.set_io_space(m_maincpu, AS_IO)","dma.out_busreq_callback().set_inputline(m_maincpu, Z80_INPUT_LINE_BUSREQ)","dma.out_int_callback().set_inputline(m_maincpu, INPUT_LINE_IRQ0)","dma.in_mreq_callback().set([this](offs_t offset) { return m_program.read_byte(offset); })","dma.out_mreq_callback().set([this](offs_t offset, u8 data) { m_program.write_byte(offset, data); })","dma.in_iorq_callback().set([this](offs_t offset) { return m_io.read_byte(offset); })","dma.out_iorq_callback().set([this](offs_t offset, u8 data) { m_io.write_byte(offset, data); })"],"replacementType":"DMA_SLOT","clock":3546900,"slotOptions":"default_dma_slot_devices","slotDefault":""}', '{"tag":"ram","config":["m_ram->set_default_size(\\"128K\\")"]}'], sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 415, sourceColumn: 1, sourceEndLine: 462, spaceAccessors: ['m_program=maincpu:program', 'm_io=maincpu:io']};
MERGE (n:KG {id: 'handler:spectrum_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 685, sourceColumn: 1, sourceEndLine: 694, sourceParameters: '', sourceBody: '/* Initial value/behaviour of FE port is not confirmed. Startup of real devices produce \'random\' border
	color which need to be investigated. */
	m_port_fe_data = -1;
	m_port_7ffd_data = -1;
	m_port_1ffd_data = -1;
	m_irq_on_timer->adjust(attotime::never);
	m_irq_off_timer->adjust(attotime::never);'};
MERGE (n:KG {id: 'handler:spectrum_128_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'spectrum_128_state', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 370, sourceColumn: 1, sourceEndLine: 377, sourceParameters: '', sourceBody: 'spectrum_state::machine_reset();

	// set initial ram config
	m_port_7ffd_data = 0;
	spectrum_128_update_memory();'};
MERGE (n:KG {id: 'bank:spectrum_128_state.spectrum_128/bank_rom[0]'}) SET n:MemoryBank SET n += {tag: 'bank_rom[0]', member: 'm_bank_rom[0]', startEntry: 0, entries: 2, region: 'maincpu', offset: 65536, stride: 16384, raw: 'm_bank_rom[0]->configure_entries(0, 2, rom->base() + 0x10000, 0x4000)', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 352, sourceColumn: 1, sourceEndLine: 368};
MERGE (n:KG {id: 'bank:spectrum_128_state.spectrum_128/bank_ram[1]'}) SET n:MemoryBank SET n += {tag: 'bank_ram[1]', member: 'm_bank_ram[1]', startEntry: 0, entries: 8, device: 'ram', offset: 0, stride: 16384, initialEntry: 5, raw: 'm_bank_ram[1]->configure_entries(0, ram_entries, m_ram->pointer(), 0x4000)', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 352, sourceColumn: 1, sourceEndLine: 368};
MERGE (n:KG {id: 'bank:spectrum_128_state.spectrum_128/bank_ram[2]'}) SET n:MemoryBank SET n += {tag: 'bank_ram[2]', member: 'm_bank_ram[2]', startEntry: 0, entries: 8, device: 'ram', offset: 0, stride: 16384, initialEntry: 2, raw: 'm_bank_ram[2]->configure_entries(0, ram_entries, m_ram->pointer(), 0x4000)', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 352, sourceColumn: 1, sourceEndLine: 368};
MERGE (n:KG {id: 'bank:spectrum_128_state.spectrum_128/bank_ram[3]'}) SET n:MemoryBank SET n += {tag: 'bank_ram[3]', member: 'm_bank_ram[3]', startEntry: 0, entries: 8, device: 'ram', offset: 0, stride: 16384, raw: 'm_bank_ram[3]->configure_entries(0, ram_entries, m_ram->pointer(), 0x4000)', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 352, sourceColumn: 1, sourceEndLine: 368};
MERGE (n:KG {id: 'machine:spectrum_128_state.spectrum_128/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'set_vblank_int', operation: 'set_vblank_int', raw: 'm_maincpu->set_vblank_int("screen", FUNC(spectrum_128_state::spec_interrupt))', ownerTag: 'maincpu', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 423, sourceColumn: 2, sourceEndLine: 423, targetTag: 'screen', targetClass: 'spectrum_128_state', targetMethod: 'spec_interrupt'};
MERGE (n:KG {id: 'handler:spectrum_128_state.spec_interrupt'}) SET n:Handler SET n += {method: 'spec_interrupt', ownerClass: 'spectrum_128_state', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 724, sourceColumn: 1, sourceEndLine: 727, sourceParameters: 'device_t &device', sourceBody: 'm_irq_on_timer->adjust(m_screen->time_until_pos(0, get_screen_area().left()));'};
MERGE (n:KG {id: 'machine:spectrum_128_state.spectrum_128/callback:maincpu:1'}) SET n:Callback SET n += {signal: 'refresh_cb', operation: 'set', raw: 'm_maincpu->refresh_cb().set(FUNC(spectrum_128_state::spectrum_refresh_w))', ownerTag: 'maincpu', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 424, sourceColumn: 2, sourceEndLine: 424, targetClass: 'spectrum_128_state', targetMethod: 'spectrum_refresh_w'};
MERGE (n:KG {id: 'handler:spectrum_128_state.spectrum_refresh_w'}) SET n:Handler SET n += {method: 'spectrum_refresh_w', ownerClass: 'spectrum_128_state', sourceFile: 'src/mame/sinclair/spectrum_v.cpp', sourceLine: 221, sourceColumn: 1, sourceEndLine: 276, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'if (!m_ula->is_snow_possible(offset))
		return;

	const rectangle screen = get_screen_area();
	u8 x = m_screen->hpos() - screen.left();
	const u16 y = m_screen->vpos() - screen.top();

	// icount is not adjusted yet, everything below is happening during
	// the last REFRESH cycle: +2px(1t of 3.5MHz)
	u8 snow_pattern = 0;
	u8 t_to_chunk_end = 0;
	if (x % 16 == 0x00)
	{
		snow_pattern = 1;
		t_to_chunk_end = 4;
	}
	else if (x % 16 == 0x04)
	{
		snow_pattern = 2;
		x += 8;
		t_to_chunk_end = 6;
	}
	else
	{
		return;
	}

	const u16 px_addr_hi = ((y & 0xc0) << 5) | ((y & 7) << 8) | ((y & 0x20) << 2);
	const u16 attr_addr_hi = 0x1800 | ((y & 0xe0) << 2);
	const u8 addr_lo = ((y & 0x18) << 2) | (x >> 3);

	const u8 px_tmp = m_screen_location[px_addr_hi | addr_lo];
	const u8 attr_tmp = m_screen_location[attr_addr_hi | addr_lo];

	if (snow_pattern == 1)
	{
		const u8 i = offset >> 8;
		const u8 r = (offset + 1) & 0x7f; // R must be already incremented during refresh. Consider z80 update.
		const u8 *const base = snow_pattern1_base(i);
		m_screen_location[px_addr_hi | addr_lo] = base[px_addr_hi | r];
		m_screen_location[attr_addr_hi | addr_lo] = base[attr_addr_hi | r];
	}
	else if (snow_pattern == 2)
	{
		m_screen_location[px_addr_hi | addr_lo] = m_screen_location[(px_addr_hi | addr_lo) - 1];
		m_screen_location[attr_addr_hi | addr_lo] = m_screen_location[(attr_addr_hi | addr_lo) - 1];
	}

	m_maincpu->adjust_icount(-t_to_chunk_end);
	m_screen->update_now();
	m_maincpu->adjust_icount(t_to_chunk_end);
	m_screen_location[px_addr_hi | addr_lo] = px_tmp;
	m_screen_location[attr_addr_hi | addr_lo] = attr_tmp;'};
MERGE (n:KG {id: 'handler:spectrum_state.snow_pattern1_base'}) SET n:Handler SET n += {method: 'snow_pattern1_base', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 385, sourceColumn: 1, sourceEndLine: 281, sourceParameters: 'u8 i_reg', sourceBody: 'const bool is_alt_scr_selected = BIT(m_port_7ffd_data, 3);
	const bool is_alt_scr = i_reg & 0x80;
	const u8 i_pg = is_alt_scr ? (m_bank_ram[3]->entry() & 0b101) : 5;

	return m_ram->pointer() + ((i_pg | (is_alt_scr_selected << 1)) << 14);', sourceReturnType: 'u8 *', dispatchedFrom: 'spectrum_128_state'};
MERGE (n:KG {id: 'machine:spectrum_128_state.spectrum_128/callback:maincpu:2'}) SET n:Callback SET n += {signal: 'nomreq_cb', operation: 'set', raw: 'm_maincpu->nomreq_cb().set("ula", FUNC(spectrum_ula_device::nomem_rq))', ownerTag: 'maincpu', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 425, sourceColumn: 2, sourceEndLine: 425, targetTag: 'ula', targetClass: 'spectrum_ula_device', targetMethod: 'nomem_rq'};
MERGE (n:KG {id: 'handler:spectrum_ula_device.nomem_rq'}) SET n:Handler SET n += {method: 'nomem_rq', ownerClass: 'spectrum_ula_device', sourceFile: 'src/mame/sinclair/spectrum_ula.h', sourceLine: 18, sourceColumn: 56, sourceEndLine: 20, sourceParameters: 'offs_t offset, u8 data', sourceBody: ''};
MERGE (n:KG {id: 'machine:spectrum_128_state.spectrum_128/callback:maincpu:3'}) SET n:Callback SET n += {signal: 'busack_cb', operation: 'set', raw: 'm_maincpu->busack_cb().set("dma", FUNC(dma_slot_device::bai_w))', ownerTag: 'maincpu', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 426, sourceColumn: 2, sourceEndLine: 426, targetTag: 'dma', targetClass: 'dma_slot_device', targetMethod: 'bai_w'};
MERGE (n:KG {id: 'handler:dma_slot_device.bai_w'}) SET n:Handler SET n += {method: 'bai_w', ownerClass: 'dma_slot_device', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 739, sourceColumn: 2, sourceEndLine: 739};
MERGE (n:KG {id: 'machine:spectrum_128_state.spectrum_128/callback:exp:0'}) SET n:Callback SET n += {signal: 'irq_handler', operation: 'set_inputline', raw: 'm_exp->irq_handler().set_inputline(m_maincpu, INPUT_LINE_IRQ0)', ownerTag: 'exp', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 447, sourceColumn: 2, sourceEndLine: 447, inputLine: 'INPUT_LINE_IRQ0', targetTag: 'maincpu'};
MERGE (n:KG {id: 'machine:spectrum_128_state.spectrum_128/callback:exp:1'}) SET n:Callback SET n += {signal: 'nmi_handler', operation: 'set_inputline', raw: 'm_exp->nmi_handler().set_inputline(m_maincpu, INPUT_LINE_NMI)', ownerTag: 'exp', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 448, sourceColumn: 2, sourceEndLine: 448, inputLine: 'INPUT_LINE_NMI', targetTag: 'maincpu'};
MERGE (n:KG {id: 'machine:spectrum_128_state.spectrum_128/callback:exp:2'}) SET n:Callback SET n += {signal: 'fb_r_handler', operation: 'set', raw: 'm_exp->fb_r_handler().set(FUNC(spectrum_128_state::floating_bus_r))', ownerTag: 'exp', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 449, sourceColumn: 2, sourceEndLine: 449, targetClass: 'spectrum_128_state', targetMethod: 'floating_bus_r'};
MERGE (n:KG {id: 'handler:spectrum_128_state.floating_bus_r'}) SET n:Handler SET n += {method: 'floating_bus_r', ownerClass: 'spectrum_128_state', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 478, sourceColumn: 1, sourceEndLine: 528, sourceParameters: '', sourceBody: '/*
	*  "floating bus"
	*  (cpu can peek at the video bus via odd i/o read, some games use it for timing instead of vblank)
	*
	*  It seems this trick was found quite late in the life of the original Sinclair models,
	*  then found not to work properly on the later Amstrad models, so was mostly abandoned by devs.
	*  This means most games that use it were released in a relatively small window of mid-late 1986.
	*
	*  known games:
	*    Arkanoid
	*    Cobra
	*    Sidewize
	*    Short Circuit
	*    Renegade
	*    Terra Cresta
	*
	*    ...others?
	*
	*  (Sidewize uses port 0x40ff, others use 0x28ff)
	*
	*  Note, some were later re-released as "fixed" +2A compatible versions with the floating bus code removed (Arkanoid, Cobra, others?).
	*/

	u8 data = 0xff;

	// peek into attribute ram when beam is in display area
	// ula always returns ff when in border area (or h/vblank)
	if (m_ula->is_in_contended_area())
	{
		const u64 vpos = m_screen->vpos();
		const u64 now = m_maincpu->total_cycles() - m_ula->get_irq_at();
		const u64 cf = vpos * m_ula->get_video_line_clocks() + m_ula->get_raster_contention_offset();
		const u64 ct = cf + m_ula->get_raster_line_clocks();
		if (cf <= now && now < ct)
		{
			u64 clocks = now - cf;
			if (!BIT(clocks, 2))
			{
				u16 y = vpos - get_screen_area().top();
				u16 x = (clocks >> 2) + BIT(clocks, 1);
				data = clocks & 1
					? m_screen_location[0x1800 + (((y & 0xf8) << 2) | x)]
					: m_screen_location[((y & 7) << 8) | ((y & 0x38) << 2) | ((y & 0xc0) << 5) | x];
			}
		}
	}

	return data;', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'machine:spectrum_128_state.spectrum_128/callback:dma:0'}) SET n:Callback SET n += {signal: 'out_busreq_callback', operation: 'set_inputline', raw: 'dma.out_busreq_callback().set_inputline(m_maincpu, Z80_INPUT_LINE_BUSREQ)', ownerTag: 'dma', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 453, sourceColumn: 2, sourceEndLine: 453, inputLine: 'Z80_INPUT_LINE_BUSREQ', targetTag: 'maincpu'};
MERGE (n:KG {id: 'machine:spectrum_128_state.spectrum_128/callback:dma:1'}) SET n:Callback SET n += {signal: 'out_int_callback', operation: 'set_inputline', raw: 'dma.out_int_callback().set_inputline(m_maincpu, INPUT_LINE_IRQ0)', ownerTag: 'dma', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 454, sourceColumn: 2, sourceEndLine: 454, inputLine: 'INPUT_LINE_IRQ0', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:spectrum_128_state.spectrum_128/ay_slot'}) SET n:Device SET n += {type: 'AY_SLOT', tag: 'ay_slot', clock: 1773450, config: ['AY_SLOT(config, "ay_slot", X1_128_SINCLAIR / 20, default_ay_slot_devices, "ay_ay8912")
		.add_route(ALL_OUTPUTS, "speakers", 0.25)'], sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 442, sourceColumn: 2, sourceEndLine: 443, slotOptions: 'default_ay_slot_devices', slotDefault: 'ay_ay8912'};
MERGE (n:KG {id: 'audioroute:device:spectrum_128_state.spectrum_128/ay_slot/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speakers', gain: 0.25, raw: 'AY_SLOT(config, "ay_slot", X1_128_SINCLAIR / 20, default_ay_slot_devices, "ay_ay8912")
		.add_route(ALL_OUTPUTS, "speakers", 0.25)', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 442, sourceColumn: 2, sourceEndLine: 443};
MERGE (n:KG {id: 'device:spectrum_128_state.spectrum_128/ay_slot:ay_ay8912'}) SET n:Device SET n += {type: 'AY_SLOT_AY8912', tag: 'ay_slot:ay_ay8912', clock: 1773450, config: [], cls: 'ay8912_device', clsHierarchy: ['ay8912_device'], cardMembers: ['m_ay0', 'm_ay1', 'm_ay_selected']};
MERGE (n:KG {id: 'machine:spectrum_state.spectrum_common'}) SET n:MachineConfig SET n += {cls: 'spectrum_state', name: 'spectrum_common', calls: [], armedTimers: ['m_irq_on_timer=spectrum_state.irq_on@spectrum_state.video_start', 'm_irq_off_timer=spectrum_state.irq_off@spectrum_state.video_start', 'm_finish_screen_update_timer=spectrum_state.finish_screen_update@spectrum_state.video_start'], preciseTimers: ['m_irq_on_timer', 'm_irq_off_timer', 'm_finish_screen_update_timer'], stateMembers: ['{"name":"m_port_fe_data","bits":32,"signed":true}', '{"name":"m_port_7ffd_data","bits":32,"signed":true}', '{"name":"m_port_1ffd_data","bits":32,"signed":true}', '{"name":"m_port_ff_data","bits":32,"signed":true}', '{"name":"m_port_f4_data","bits":32,"signed":true}', '{"name":"m_frame_invert_count","bits":32,"signed":true}'], driverTimers: ['m_irq_on_timer=spectrum_state.irq_on', 'm_irq_off_timer=spectrum_state.irq_off', 'm_finish_screen_update_timer=spectrum_state.finish_screen_update'], resetHandlers: ['spectrum_state.machine_reset'], startHandlers: ['spectrum_state.video_start'], sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 729, sourceColumn: 1, sourceEndLine: 797, spaceAccessors: ['m_program=maincpu:program', 'm_io=maincpu:io']};
MERGE (n:KG {id: 'softlist:spectrum_state.spectrum_common/spectrum_cass'}) SET n:SoftwareList SET n += {name: 'spectrum_cass', tag: 'cass_list', status: 'original'};
MERGE (n:KG {id: 'device:spectrum_state.spectrum_common/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 3546900, config: ['Z80(config, m_maincpu, X1 / 4)', 'm_maincpu->set_addrmap(AS_OPCODES, &spectrum_state::spectrum_opcodes)', 'm_maincpu->set_addrmap(AS_PROGRAM, &spectrum_state::spectrum_data)', 'm_maincpu->set_addrmap(AS_IO, &spectrum_state::spectrum_io)', 'm_maincpu->set_vblank_int("screen", FUNC(spectrum_state::spec_interrupt))', 'm_maincpu->refresh_cb().set(FUNC(spectrum_state::spectrum_refresh_w))', 'm_maincpu->nomreq_cb().set("ula", FUNC(spectrum_ula_device::nomem_rq))', 'm_maincpu->busack_cb().set("dma", FUNC(dma_slot_device::bai_w))', 'Z80(config.replace(), m_maincpu, X1_128_SINCLAIR / 10)', 'm_maincpu->set_vblank_int("screen", FUNC(spectrum_128_state::spec_interrupt))', 'm_maincpu->refresh_cb().set(FUNC(spectrum_128_state::spectrum_refresh_w))', 'm_maincpu->nomreq_cb().set("ula", FUNC(spectrum_ula_device::nomem_rq))', 'm_maincpu->busack_cb().set("dma", FUNC(dma_slot_device::bai_w))'], member: 'm_maincpu', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 732, sourceColumn: 2, sourceEndLine: 732};
MERGE (n:KG {id: 'device:spectrum_state.spectrum_common/specmem'}) SET n:Device SET n += {type: 'ADDRESS_MAP_BANK', tag: 'specmem', clock: null, config: ['ADDRESS_MAP_BANK(config, m_specmem).set_map(&spectrum_state::spectrum_map).set_options(ENDIANNESS_LITTLE, 8, 16, 0x10000)'], member: 'm_specmem', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 741, sourceColumn: 2, sourceEndLine: 741};
MERGE (n:KG {id: 'device:spectrum_state.spectrum_common/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'rectangle visarea = { get_screen_area().left() - SPEC_LEFT_BORDER, get_screen_area().right() + SPEC_RIGHT_BORDER,
		get_screen_area().top() - SPEC_TOP_BORDER, get_screen_area().bottom() + SPEC_BOTTOM_BORDER }', 'm_screen->set_raw(X1 / 2, SPEC_CYCLES_PER_LINE * 2, SPEC_UNSEEN_LINES + SPEC_SCREEN_HEIGHT, visarea)', 'm_screen->set_screen_update(FUNC(spectrum_state::screen_update_spectrum))', 'm_screen->set_palette("palette")', 'm_screen->set_raw(X1_128_SINCLAIR / 5, SPEC128_CYCLES_PER_LINE * 2, SPEC128_UNSEEN_LINES + SPEC_SCREEN_HEIGHT, visarea)'], member: 'm_screen', configCalls: ['set_raw(7000000,448,312,{"rectangle":[0,351,16,311]})', 'set_palette("palette")'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [7093800, 456, 0, 352, 311, 15, 311], screenRawExpr: ['X1 / 2', 'SPEC_CYCLES_PER_LINE * 2', '(SPEC_LEFT_BORDER) - SPEC_LEFT_BORDER', '((SPEC_LEFT_BORDER + SPEC_DISPLAY_XSIZE - 1) + SPEC_RIGHT_BORDER) + 1', 'SPEC_UNSEEN_LINES + SPEC_SCREEN_HEIGHT', '(SPEC_UNSEEN_LINES + SPEC_TOP_BORDER) - SPEC_TOP_BORDER', '((SPEC_UNSEEN_LINES + SPEC_TOP_BORDER + SPEC_DISPLAY_YSIZE - 1) + SPEC_BOTTOM_BORDER) + 1']};
MERGE (n:KG {id: 'device:spectrum_state.spectrum_common/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(spectrum_state::screen_update_spectrum))', ownerTag: 'screen', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 755, sourceColumn: 2, sourceEndLine: 755, targetClass: 'spectrum_state', targetMethod: 'screen_update_spectrum'};
MERGE (n:KG {id: 'handler:spectrum_state.screen_update_spectrum'}) SET n:Handler SET n += {method: 'screen_update_spectrum', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spectrum_v.cpp', sourceLine: 112, sourceColumn: 1, sourceEndLine: 137, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'rectangle scr = get_screen_area();
	const rectangle vis = screen.visible_area();
	if (vis != scr)
	{
		rectangle bsides[4] = {
			rectangle(vis.left(),      vis.right(),    vis.top(),        scr.top() - 1),
			rectangle(vis.left(),      scr.left() - 1, scr.top(),        scr.bottom()),
			rectangle(scr.right() + 1, vis.right(),    scr.top(),        scr.bottom()),
			rectangle(vis.left(),      vis.right(),    scr.bottom() + 1, vis.bottom())
		};
		for (auto i = 0; i < 4; i++)
		{
			rectangle border = bsides[i] & cliprect;
			if (!border.empty())
				spectrum_update_border(screen, bitmap, border);
		}
	}

	scr &= cliprect;
	if (!scr.empty())
		spectrum_update_screen(screen, bitmap, scr);

	return 0;', sourceReturnType: 'u32'};
MERGE (n:KG {id: 'handler:spectrum_state.spectrum_update_border'}) SET n:Handler SET n += {method: 'spectrum_update_border', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spectrum_v.cpp', sourceLine: 139, sourceColumn: 1, sourceEndLine: 162, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &border', sourceBody: 'const u8 mod = m_ula->get_border_chunk_size();
	const u8 btime = m_ula->get_btime();
	for (auto y = border.top(); y <= border.bottom(); y++)
	{
		u16 *pix = &(bitmap.pix(y, border.left()));
		for (auto x = border.left(); x <= border.right(); )
		{
			if (x % mod == btime)
			{
				pix -= btime;
				x -= btime;
				for (auto m = 0; m < mod; m++, x++)
					*pix++ = get_border_color(y, x);
			}
			else
			{
				pix++;
				x++;
			}
		}
	}'};
MERGE (n:KG {id: 'handler:spectrum_state.get_border_color'}) SET n:Handler SET n += {method: 'get_border_color', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spectrum_v.cpp', sourceLine: 107, sourceColumn: 1, sourceEndLine: 110, sourceParameters: 'u16 hpos, u16 vpos', sourceBody: 'return m_port_fe_data & 0x07;', sourceReturnType: 'u8'};
MERGE (n:KG {id: 'handler:spectrum_state.spectrum_update_screen'}) SET n:Handler SET n += {method: 'spectrum_update_screen', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spectrum_v.cpp', sourceLine: 175, sourceColumn: 1, sourceEndLine: 214, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'const bool invert_attrs = u64(screen.frame_number() / m_frame_invert_count) & 1;
	for (u16 vpos = cliprect.top(); vpos <= cliprect.bottom(); vpos++)
	{
		u16 hpos = cliprect.left();
		u16 x = hpos - get_screen_area().left();
		bool chunk_right = x & 8;
		if (x % 8 <= (chunk_right ? m_ula->get_atime_right() : m_ula->get_atime_left()))
		{
			u8 shift = x % 8;
			x -= shift;
			hpos -= shift;
		}
		else
		{
			u8 shift = 8 - (x % 8);
			x += shift;
			hpos += shift;
			chunk_right = !chunk_right;
		}
		u16 y = vpos - get_screen_area().top();
		u8 *scr = &m_screen_location[((y & 0xc0) << 5) | ((y & 7) << 8) | ((y & 0x38) << 2) | (x >> 3)];
		u8 *attr = &m_screen_location[0x1800 | (((y & 0xf8) << 2) | (x >> 3))];
		u16 *pix = &(bitmap.pix(vpos, hpos));

		while ((hpos + (chunk_right ? m_ula->get_atime_right() : m_ula->get_atime_left())) <= cliprect.right())
		{
			u16 ink = ((*attr >> 3) & 0x08) | (*attr & 0x07);
			u16 pap = (*attr >> 3) & 0x0f;
			u8 pix8 = (invert_attrs && (*attr & 0x80)) ? ~*scr : *scr;

			for (u8 b = 0x80; b; b >>= 1, x++, hpos++)
				*pix++ = (pix8 & b) ? ink : pap;
			scr++;
			attr++;
			chunk_right = !chunk_right;
		}
	}'};
MERGE (n:KG {id: 'device:spectrum_state.spectrum_common/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, "palette", FUNC(spectrum_state::spectrum_palette), 16)'], sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 758, sourceColumn: 2, sourceEndLine: 758, clockExpr: 'FUNC(spectrum_state::spectrum_palette)', paletteEntries: 16};
MERGE (n:KG {id: 'device:spectrum_state.spectrum_common/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, "gfxdecode", "palette", gfx_spectrum)', 'subdevice<gfxdecode_device>("gfxdecode")->set_info(spec128)'], sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 759, sourceColumn: 2, sourceEndLine: 759, clockExpr: '"palette"'};
MERGE (n:KG {id: 'device:spectrum_state.spectrum_common/ula'}) SET n:Device SET n += {type: 'SPECTRUM_ULA_128K', tag: 'ula', clock: null, config: ['SPECTRUM_ULA_48K(config, m_ula)', 'm_ula->set_screen(m_screen, get_screen_area())', 'm_ula->set_z80(m_maincpu)', 'SPECTRUM_ULA_128K(config.replace(), m_ula)', 'm_ula->set_z80(m_maincpu)', 'm_ula->set_screen(m_screen, get_screen_area())'], member: 'm_ula', cls: 'spectrum_ula_48k_device', clsHierarchy: ['spectrum_ula_48k_device', 'spectrum_ula_contended_device', 'spectrum_ula_device'], sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 760, sourceColumn: 2, sourceEndLine: 760, configCalls: ['set_screen("screen",{"rectangle":[48,303,64,255]})', 'set_z80("maincpu")'], startHandler: 'spectrum_ula_contended_device.device_start'};
MERGE (n:KG {id: 'device:spectrum_state.spectrum_common/speakers'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speakers', clock: null, config: ['SPEAKER(config, "speakers").front_center()'], sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 765, sourceColumn: 2, sourceEndLine: 765};
MERGE (n:KG {id: 'device:spectrum_state.spectrum_common/speaker'}) SET n:Device SET n += {type: 'SPEAKER_SOUND', tag: 'speaker', clock: null, config: ['SPEAKER_SOUND(config, m_speaker).add_route(ALL_OUTPUTS, "speakers", 0.50)', 'static const double speaker_levels[4] = { 0.0, 0.33, 0.66, 1.0 }', 'm_speaker->set_levels(4, speaker_levels)'], member: 'm_speaker', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 766, sourceColumn: 2, sourceEndLine: 766, configCalls: ['set_levels(4,[0,0.33,0.66,1])']};
MERGE (n:KG {id: 'audioroute:device:spectrum_state.spectrum_common/speaker/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speakers', gain: 0.5, raw: 'SPEAKER_SOUND(config, m_speaker).add_route(ALL_OUTPUTS, "speakers", 0.50)', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 766, sourceColumn: 2, sourceEndLine: 766};
MERGE (n:KG {id: 'device:spectrum_state.spectrum_common/exp'}) SET n:Device SET n += {type: 'SPECTRUM_EXPANSION_SLOT', tag: 'exp', clock: null, config: ['SPECTRUM_EXPANSION_SLOT(config, m_exp, spectrum_expansion_devices, "kempjoy")', 'm_exp->irq_handler().set_inputline(m_maincpu, INPUT_LINE_IRQ0)', 'm_exp->nmi_handler().set_inputline(m_maincpu, INPUT_LINE_NMI)', 'm_exp->fb_r_handler().set(FUNC(spectrum_state::floating_bus_r))', 'SPECTRUM_EXPANSION_SLOT(config.replace(), m_exp, spec128_expansion_devices, nullptr)', 'm_exp->irq_handler().set_inputline(m_maincpu, INPUT_LINE_IRQ0)', 'm_exp->nmi_handler().set_inputline(m_maincpu, INPUT_LINE_NMI)', 'm_exp->fb_r_handler().set(FUNC(spectrum_128_state::floating_bus_r))'], member: 'm_exp', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 771, sourceColumn: 2, sourceEndLine: 771, slotOptions: 'spec128_expansion_devices', slotDefault: ''};
MERGE (n:KG {id: 'device:spectrum_state.spectrum_common/dma'}) SET n:Device SET n += {type: 'DMA_SLOT', tag: 'dma', clock: 3546900, config: ['dma_slot_device &dma(DMA_SLOT(config, "dma", X1 / 4, default_dma_slot_devices, nullptr))', 'dma.set_io_space(m_maincpu, AS_IO)', 'dma.out_busreq_callback().set_inputline(m_maincpu, Z80_INPUT_LINE_BUSREQ)', 'dma.out_int_callback().set_inputline(m_maincpu, INPUT_LINE_IRQ0)', 'dma.in_mreq_callback().set([this](offs_t offset) { return m_program.read_byte(offset); })', 'dma.out_mreq_callback().set([this](offs_t offset, u8 data) { m_program.write_byte(offset, data); })', 'dma.in_iorq_callback().set([this](offs_t offset) { return m_io.read_byte(offset); })', 'dma.out_iorq_callback().set([this](offs_t offset, u8 data) { m_io.write_byte(offset, data); })', 'dma_slot_device &dma(DMA_SLOT(config.replace(), "dma", X1_128_SINCLAIR / 10, default_dma_slot_devices, nullptr))', 'dma.set_io_space(m_maincpu, AS_IO)', 'dma.out_busreq_callback().set_inputline(m_maincpu, Z80_INPUT_LINE_BUSREQ)', 'dma.out_int_callback().set_inputline(m_maincpu, INPUT_LINE_IRQ0)', 'dma.in_mreq_callback().set([this](offs_t offset) { return m_program.read_byte(offset); })', 'dma.out_mreq_callback().set([this](offs_t offset, u8 data) { m_program.write_byte(offset, data); })', 'dma.in_iorq_callback().set([this](offs_t offset) { return m_io.read_byte(offset); })', 'dma.out_iorq_callback().set([this](offs_t offset, u8 data) { m_io.write_byte(offset, data); })'], sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 776, sourceColumn: 2, sourceEndLine: 776, configCalls: ['set_io_space("maincpu",2)'], slotOptions: 'default_dma_slot_devices', slotDefault: ''};
MERGE (n:KG {id: 'device:spectrum_state.spectrum_common/snapshot'}) SET n:Device SET n += {type: 'SNAPSHOT', tag: 'snapshot', clock: null, config: ['snapshot_image_device &snapshot(SNAPSHOT(config, "snapshot", "ach,frz,plusd,prg,sem,sit,sna,snp,snx,sp,spg,z80,zx"))', 'snapshot.set_load_callback(FUNC(spectrum_state::snapshot_cb))', 'snapshot.set_interface("spectrum_snapshot")'], sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 785, sourceColumn: 2, sourceEndLine: 785, configCalls: ['set_interface("spectrum_snapshot")', 'set_extensions("ach,frz,plusd,prg,sem,sit,sna,snp,snx,sp,spg,z80,zx")']};
MERGE (n:KG {id: 'device:spectrum_state.spectrum_common/snapshot/callback:snapshot:0'}) SET n:Callback SET n += {signal: 'set_load_callback', delegate: 1, operation: 'set_load_callback', raw: 'snapshot.set_load_callback(FUNC(spectrum_state::snapshot_cb))', ownerTag: 'snapshot', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 786, sourceColumn: 2, sourceEndLine: 786, targetClass: 'spectrum_state', targetMethod: 'snapshot_cb'};
MERGE (n:KG {id: 'handler:spectrum_state.snapshot_cb'}) SET n:Handler SET n += {method: 'snapshot_cb', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec_snqk.cpp', sourceLine: 116, sourceColumn: 1, sourceEndLine: 225, sourceConstants: ['SNA48_SIZE=49179', 'SNA128_SIZE_1=131103', 'SNA128_SIZE_2=147487', 'SP_OLD_SIZE=49184', 'SP_NEW_SIZE_16K=16422', 'SP_NEW_SIZE_48K=49190', 'ACH_SIZE=65792', 'PRG_SIZE=49408', 'PLUSD48_SIZE=49174', 'PLUSD128_SIZE=131095', 'SEM_SIZE=49192', 'SIT_SIZE=65564', 'ZX_SIZE=49486', 'SNP_SIZE=49183', 'FRZ_SIZE=131114', 'image_error::INVALIDIMAGE=3', 'image_error::INVALIDLENGTH=4', 'image_error::INVALIDLENGTH=4', 'image_error::INVALIDLENGTH=4', 'image_error::INVALIDLENGTH=4', 'image_error::INVALIDLENGTH=4', 'image_error::INVALIDLENGTH=4', 'image_error::INVALIDLENGTH=4', 'image_error::INVALIDLENGTH=4', 'image_error::INVALIDLENGTH=4', 'image_error::INVALIDLENGTH=4', 'image_error::INVALIDIMAGE=3'], sourceParameters: 'snapshot_image_device &image', sourceBody: 'size_t snapshot_size = image.length();
	std::vector<uint8_t> snapshot_data(snapshot_size);

	image.fread(&snapshot_data[0], snapshot_size);

	if (image.is_filetype("snx"))
	{
		if (snapshot_data[0] == \'X\' && snapshot_data[1] == \'S\' && snapshot_data[2] == \'N\' && snapshot_data[3] == \'A\')
			setup_snx(&snapshot_data[0], snapshot_size);
		// snx as alias for sna
		else if ((snapshot_size == SNA48_SIZE) || (snapshot_size == SNA128_SIZE_1) || (snapshot_size == SNA128_SIZE_2))
			setup_sna(&snapshot_data[0], snapshot_size);
		else
			return std::make_pair(image_error::INVALIDIMAGE, "Invalid .SNX file header");
	}
	else if (image.is_filetype("sna"))
	{
		if ((snapshot_size != SNA48_SIZE) && (snapshot_size != SNA128_SIZE_1) && (snapshot_size != SNA128_SIZE_2))
			return std::make_pair(image_error::INVALIDLENGTH, "Invalid .SNA file size");

		setup_sna(&snapshot_data[0], snapshot_size);
	}
	else if (image.is_filetype("sp"))
	{
		if ((snapshot_data[0] != \'S\' || snapshot_data[1] != \'P\')
			|| (snapshot_size != SP_NEW_SIZE_16K && snapshot_size != SP_NEW_SIZE_48K))
		{
			if (snapshot_size != SP_OLD_SIZE)
				return std::make_pair(image_error::INVALIDLENGTH, "Invalid .SP file size");
		}
		setup_sp(&snapshot_data[0], snapshot_size);
	}
	else if (image.is_filetype("ach"))
	{
		if (snapshot_size != ACH_SIZE)
			return std::make_pair(image_error::INVALIDLENGTH, "Invalid .ACH file size");

		setup_ach(&snapshot_data[0], snapshot_size);
	}
	else if (image.is_filetype("prg"))
	{
		if (snapshot_size != PRG_SIZE)
			return std::make_pair(image_error::INVALIDLENGTH, "Invalid .PRG file size");

		setup_prg(&snapshot_data[0], snapshot_size);
	}
	else if (image.is_filetype("plusd"))
	{
		if ((snapshot_size != PLUSD48_SIZE) && (snapshot_size != PLUSD128_SIZE))
			return std::make_pair(image_error::INVALIDLENGTH, "Invalid .PLUSD file size");

		setup_plusd(&snapshot_data[0], snapshot_size);
	}
	else if (image.is_filetype("sem"))
	{
		if (snapshot_data[0] != 0x05 || snapshot_data[1] != \'S\'
			|| snapshot_data[2] != \'P\' || snapshot_data[3] != \'E\'
			|| snapshot_data[4] != \'C\' || snapshot_data[5] != \'1\')
		{
			if (snapshot_size != SEM_SIZE)
				return std::make_pair(image_error::INVALIDLENGTH, "Invalid .SEM file size");
		}
		setup_sem(&snapshot_data[0], snapshot_size);
	}
	else if (image.is_filetype("sit"))
	{
		if (snapshot_size != SIT_SIZE)
			return std::make_pair(image_error::INVALIDLENGTH, "Invalid .SIT file size");

		setup_sit(&snapshot_data[0], snapshot_size);
	}
	else if (image.is_filetype("zx"))
	{
		if (snapshot_size != ZX_SIZE)
			return std::make_pair(image_error::INVALIDLENGTH, "Invalid .ZX file size");

		setup_zx(&snapshot_data[0], snapshot_size);
	}
	else if (image.is_filetype("snp"))
	{
		if (snapshot_size != SNP_SIZE)
			return std::make_pair(image_error::INVALIDLENGTH, "Invalid .SNP file size");

		setup_snp(&snapshot_data[0], snapshot_size);
	}
	else if (image.is_filetype("frz"))
	{
		if (snapshot_size != FRZ_SIZE)
			return std::make_pair(image_error::INVALIDLENGTH, "Invalid .FRZ file size");

		setup_frz(&snapshot_data[0], snapshot_size);
	}
	else if (image.is_filetype("spg"))
	{
		if (snapshot_data[32] != \'S\' || snapshot_data[33] != \'p\' || snapshot_data[34] != \'e\' || snapshot_data[35] != \'c\'
			|| snapshot_data[36] != \'t\' || snapshot_data[37] != \'r\' || snapshot_data[38] != \'u\' || snapshot_data[39] != \'m\'
			|| snapshot_data[40] != \'P\' || snapshot_data[41] != \'r\' ||snapshot_data[42] != \'o\' || snapshot_data[43] != \'g\')
			return std::make_pair(image_error::INVALIDIMAGE, "Invalid .SPG file header.");

		setup_spg(&snapshot_data[0], snapshot_size);
	}
	else
	{
		setup_z80(&snapshot_data[0], snapshot_size);
	}

	return std::make_pair(std::error_condition(), std::string());'};
MERGE (n:KG {id: 'handler:spectrum_state.setup_snx'}) SET n:Handler SET n += {method: 'setup_snx', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec_snqk.cpp', sourceLine: 1780, sourceColumn: 1, sourceEndLine: 1885, sourceConstants: ['Z80_PC=-1', 'Z80_SP=1', 'Z80_AF=10', 'Z80_BC=11', 'Z80_DE=12', 'Z80_HL=13', 'Z80_IX=14', 'Z80_IY=15', 'Z80_AF2=16', 'Z80_BC2=17', 'Z80_DE2=18', 'Z80_HL2=19', 'Z80_R=20', 'Z80_I=21', 'Z80_IM=22', 'Z80_IFF1=23', 'Z80_IFF2=24', 'BASE_RAM=16384', 'SPECTRUM_BANK=16384', 'SNX_OFFSET=0'], sourceParameters: 'const uint8_t *snapdata, uint32_t snapsize', sourceBody: 'uint8_t intr;
	uint16_t data, addr;
	address_space &space = m_maincpu->space(AS_PROGRAM);

	data = (snapdata[SNX_OFFSET +  4] << 8) | snapdata[SNX_OFFSET +  5];
	if (data != 0x25)
		logerror("Corrupted header length: %02X instead of 0x25\\n", data);

	data = (snapdata[SNX_OFFSET + 28] << 8) | snapdata[SNX_OFFSET + 27];
	m_maincpu->set_state_int(Z80_AF, data);

	data = (snapdata[SNX_OFFSET + 20] << 8) | snapdata[SNX_OFFSET + 19];
	m_maincpu->set_state_int(Z80_BC, data);

	data = (snapdata[SNX_OFFSET + 18] << 8) | snapdata[SNX_OFFSET + 17];
	m_maincpu->set_state_int(Z80_DE, data);

	data = (snapdata[SNX_OFFSET + 16] << 8) | snapdata[SNX_OFFSET + 15];
	m_maincpu->set_state_int(Z80_HL, data);


	data = (snapdata[SNX_OFFSET + 14] << 8) | snapdata[SNX_OFFSET + 13];
	m_maincpu->set_state_int(Z80_AF2, data);

	data = (snapdata[SNX_OFFSET + 12] << 8) | snapdata[SNX_OFFSET + 11];
	m_maincpu->set_state_int(Z80_BC2, data);

	data = (snapdata[SNX_OFFSET + 10] << 8) | snapdata[SNX_OFFSET +  9];
	m_maincpu->set_state_int(Z80_DE2, data);

	data = (snapdata[SNX_OFFSET +  8] << 8) | snapdata[SNX_OFFSET +  7];
	m_maincpu->set_state_int(Z80_HL2, data);


	data = (snapdata[SNX_OFFSET + 24] << 8) | snapdata[SNX_OFFSET + 23];
	m_maincpu->set_state_int(Z80_IX, data);

	data = (snapdata[SNX_OFFSET + 22] << 8) | snapdata[SNX_OFFSET + 21];
	m_maincpu->set_state_int(Z80_IY, data);


	data = snapdata[SNX_OFFSET + 26];
	m_maincpu->set_state_int(Z80_R, data);

	data = snapdata[SNX_OFFSET +  6];
	m_maincpu->set_state_int(Z80_I, data);


	data = (snapdata[SNX_OFFSET + 30] << 8) | snapdata[SNX_OFFSET + 29];
	m_maincpu->set_state_int(Z80_SP, data);


	data = snapdata[SNX_OFFSET + 31] & 0x03;
	if (data == 3)
		data = 2;
	m_maincpu->set_state_int(Z80_IM, data);

	data = snapdata[SNX_OFFSET + 25];
	m_maincpu->set_state_int(Z80_IFF1, BIT(data, 0));
	m_maincpu->set_state_int(Z80_IFF2, BIT(data, 2));

	intr = BIT(data, 0) ? CLEAR_LINE : ASSERT_LINE;
	m_maincpu->set_input_line(INPUT_LINE_IRQ0, intr);
	m_maincpu->set_input_line(INPUT_LINE_HALT, CLEAR_LINE);

	// Memory dump
	logerror("Uncompressing %04X bytes of RAM at %04X\\n", 3*SPECTRUM_BANK, BASE_RAM);
	snx_decompress_block(space, snapdata, BASE_RAM, 3*SPECTRUM_BANK);

	// get pc from stack
	addr = m_maincpu->state_int(Z80_SP);

	if (addr < BASE_RAM || addr > 4*SPECTRUM_BANK - 2)
		logerror("Corrupted SP out of range:%04X", addr);
	else
		logerror("Fetching PC from the stack at SP:%04X\\n", addr);

	m_maincpu->set_state_int(Z80_PC, (space.read_byte(addr + 1) << 8) | space.read_byte(addr + 0));

#if 0
	space.write_byte(addr + 0, 0); // It\'s been reported that zeroing these locations fixes the loading
	space.write_byte(addr + 1, 0); // of a few images that were snapshot at a "wrong" instant
#endif

	addr += 2;
	logerror("Fixed the stack at SP:%04X\\n", addr);
	m_maincpu->set_state_int(Z80_SP, addr);

	// Set border color
	data = snapdata[SNX_OFFSET + 32] & 0x07;
	m_port_fe_data = (m_port_fe_data & 0xf8) | data;
	border_update(data);
	logerror("Border color:%02X\\n", data);

	page_basicrom();

/* TODO: Enable/disable IF1 as per snapdata[SNX_OFFSET + 33] */

/* TODO: Enable/disable joysticks as per snapdata[SNX_OFFSET + 36] */

/* TODO: Enable selection of Issue 2/3 config switch as per snapdata[SNX_OFFSET + 37] */

	//logerror("Snapshot loaded.\\nExecution resuming at %s\\n", m_maincpu->state_string(Z80_PC).c_str());'};
MERGE (n:KG {id: 'handler:spectrum_state.snx_decompress_block'}) SET n:Handler SET n += {method: 'snx_decompress_block', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec_snqk.cpp', sourceLine: 1734, sourceColumn: 1, sourceEndLine: 1778, sourceConstants: ['BASE_RAM=16384', 'SNX_HDR=43', 'SNX_COMPRESSED=255', 'SNX_UNCOMPRESSED=0'], sourceParameters: 'address_space &space, const uint8_t *source, uint16_t dest, uint16_t size', sourceBody: 'uint8_t counthi, countlo, compress, fill;
	uint16_t block = 0, count, i, j, numbytes;
	i = SNX_HDR - 1;
	numbytes = 0;

	while (numbytes < size)
	{
		counthi = source[++i];
		if (counthi >= 0xe0)
		{
			count = (counthi & 0x0f) + 1;     // Short block
			if ((counthi & 0xf0) == 0xf0)
				compress = SNX_COMPRESSED;
			else
				compress = SNX_UNCOMPRESSED;
			logerror("Block:%05d  Type:Short  Compr:%s  Offset:%04X  Len:%04X  ", block++, compress == SNX_COMPRESSED ? "Y" : "N", i-1, count);
		}
		else
		{
			countlo = source[++i];
			count = (counthi << 8) | countlo; // Long block
			compress = source[++i];
			logerror("Block:%05d  Type:Long   Compr:%s  Offset:%04X  Len:%04X  ", block++, compress == SNX_COMPRESSED ? "Y" : "N", i-3, count);
		}

		if (compress == SNX_COMPRESSED)
		{
			fill = source[++i];
			logerror("Dest:%04X  Filler:%02X\\n", BASE_RAM + numbytes, fill);
			for(j = 0; j < count; j++)
				space.write_byte(BASE_RAM + numbytes + j, fill);
			numbytes += count;
		}
		else
		{
			logerror("Dest:%04X\\n", BASE_RAM + numbytes);
			j = 0;
			while (j < count)
				space.write_byte(BASE_RAM + numbytes + j++, source[++i]);
			numbytes += count;
		}
	}'};
MERGE (n:KG {id: 'handler:spectrum_state.border_update'}) SET n:Handler SET n += {method: 'border_update', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec_snqk.cpp', sourceLine: 290, sourceColumn: 1, sourceEndLine: 297, sourceParameters: 'int data', sourceBody: '#if 0
	spectrum_EventList_Reset(machine());
	spectrum_border_set_last_color(machine(), data);
	spectrum_border_force_redraw(machine());
#endif'};
MERGE (n:KG {id: 'handler:spectrum_state.page_basicrom'}) SET n:Handler SET n += {method: 'page_basicrom', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec_snqk.cpp', sourceLine: 107, sourceColumn: 1, sourceEndLine: 113, sourceParameters: '', sourceBody: 'if (m_port_7ffd_data == -1)
		return;
	m_port_7ffd_data |= 0x10;
	update_paging();'};
MERGE (n:KG {id: 'handler:spectrum_state.update_paging'}) SET n:Handler SET n += {method: 'update_paging', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec_snqk.cpp', sourceLine: 88, sourceColumn: 1, sourceEndLine: 104, sourceParameters: '', sourceBody: 'if (m_port_7ffd_data == -1)
		return;
	if (m_port_1ffd_data == -1)
		spectrum_128_update_memory();

	else
	{
		if (BIT(m_port_7ffd_data, 4))
			// Page in Spec 48K basic ROM
			m_port_1ffd_data = 0x04;
		else
			m_port_1ffd_data = 0x00;
		plus3_update_memory();
	}'};
MERGE (n:KG {id: 'handler:spectrum_state.spectrum_128_update_memory'}) SET n:Handler SET n += {method: 'spectrum_128_update_memory', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 247, sourceColumn: 1, sourceEndLine: 100, sourceParameters: '', sourceBody: 'm_bank_rom[0]->set_entry(BIT(m_port_7ffd_data, 4));
	// select ram at 0x0c000-0x0ffff
	m_bank_ram[3]->set_entry(m_port_7ffd_data & 0x07);
	m_ula->bank3_pg_w(m_port_7ffd_data & 0x07);

	m_screen->update_now();
	if (BIT(m_port_7ffd_data, 3))
		m_screen_location = m_ram->pointer() + (7 << 14);
	else
		m_screen_location = m_ram->pointer() + (5 << 14);', dispatchedFrom: 'spectrum_128_state'};
MERGE (n:KG {id: 'handler:spectrum_state.plus3_update_memory'}) SET n:Handler SET n += {method: 'plus3_update_memory', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spectrum.h', sourceLine: 99, sourceColumn: 1, sourceEndLine: 99, sourceParameters: '', sourceBody: ''};
MERGE (n:KG {id: 'handler:spectrum_state.setup_sna'}) SET n:Handler SET n += {method: 'setup_sna', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec_snqk.cpp', sourceLine: 498, sourceColumn: 1, sourceEndLine: 669, sourceConstants: ['Z80_PC=-1', 'Z80_SP=1', 'Z80_AF=10', 'Z80_BC=11', 'Z80_DE=12', 'Z80_HL=13', 'Z80_IX=14', 'Z80_IY=15', 'Z80_AF2=16', 'Z80_BC2=17', 'Z80_DE2=18', 'Z80_HL2=19', 'Z80_R=20', 'Z80_I=21', 'Z80_IM=22', 'Z80_IFF1=23', 'Z80_IFF2=24', 'BASE_RAM=16384', 'SPECTRUM_BANK=16384', 'SNA48_OFFSET=0', 'SNA48_HDR=27', 'SNA48_SIZE=49179', 'SNA128_OFFSET=49179', 'SNA128_HDR=4'], sourceParameters: 'const uint8_t *snapdata, uint32_t snapsize', sourceBody: 'int i, j, usedbanks[8];
	long bank_offset;
	uint8_t intr;
	uint16_t data, addr;
	address_space &space = m_maincpu->space(AS_PROGRAM);

	if ((snapsize != SNA48_SIZE) && (m_port_7ffd_data == -1))
	{
		logerror("Can\'t load 128K .SNA file into 48K machine\\n");
		return;
	}


	data = (snapdata[SNA48_OFFSET + 22] << 8) | snapdata[SNA48_OFFSET + 21];
	m_maincpu->set_state_int(Z80_AF, data);

	data = (snapdata[SNA48_OFFSET + 14] << 8) | snapdata[SNA48_OFFSET + 13];
	m_maincpu->set_state_int(Z80_BC, data);

	data = (snapdata[SNA48_OFFSET + 12] << 8) | snapdata[SNA48_OFFSET + 11];
	m_maincpu->set_state_int(Z80_DE, data);

	data = (snapdata[SNA48_OFFSET + 10] << 8) | snapdata[SNA48_OFFSET +  9];
	m_maincpu->set_state_int(Z80_HL, data);


	data = (snapdata[SNA48_OFFSET +  8] << 8) | snapdata[SNA48_OFFSET +  7];
	m_maincpu->set_state_int(Z80_AF2, data);

	data = (snapdata[SNA48_OFFSET +  6] << 8) | snapdata[SNA48_OFFSET +  5];
	m_maincpu->set_state_int(Z80_BC2, data);

	data = (snapdata[SNA48_OFFSET +  4] << 8) | snapdata[SNA48_OFFSET +  3];
	m_maincpu->set_state_int(Z80_DE2, data);

	data = (snapdata[SNA48_OFFSET +  2] << 8) | snapdata[SNA48_OFFSET +  1];
	m_maincpu->set_state_int(Z80_HL2, data);


	data = (snapdata[SNA48_OFFSET + 18] << 8) | snapdata[SNA48_OFFSET + 17];
	m_maincpu->set_state_int(Z80_IX, data);

	data = (snapdata[SNA48_OFFSET + 16] << 8) | snapdata[SNA48_OFFSET + 15];
	m_maincpu->set_state_int(Z80_IY, data);


	data = snapdata[SNA48_OFFSET + 20];
	m_maincpu->set_state_int(Z80_R, data);

	data = snapdata[SNA48_OFFSET +  0];
	m_maincpu->set_state_int(Z80_I, data);


	data = (snapdata[SNA48_OFFSET + 24] << 8) | snapdata[SNA48_OFFSET + 23];
	m_maincpu->set_state_int(Z80_SP, data);


	data = snapdata[SNA48_OFFSET + 25] & 0x03;
	if (data == 3)
		data = 2;
	m_maincpu->set_state_int(Z80_IM, data);

	data = snapdata[SNA48_OFFSET + 19];
	m_maincpu->set_state_int(Z80_IFF1, BIT(data, 0));
	m_maincpu->set_state_int(Z80_IFF2, BIT(data, 2));

	intr = BIT(data, 0) ? CLEAR_LINE : ASSERT_LINE;
	m_maincpu->set_input_line(INPUT_LINE_IRQ0, intr);
	m_maincpu->set_input_line(INPUT_LINE_HALT, CLEAR_LINE);

	if (snapsize == SNA48_SIZE)
		// 48K Snapshot
		page_basicrom();
	else
	{
		// 128K Snapshot
		m_port_7ffd_data = snapdata[SNA128_OFFSET + 2];
		logerror ("Port 7FFD:%02X\\n", m_port_7ffd_data);
		if (snapdata[SNA128_OFFSET + 3])
		{
			/* TODO: page TR-DOS ROM when supported */
		}
		update_paging();
	}

	if (snapsize == SNA48_SIZE)
	{
		// Memory dump
		logerror("Loading %04X bytes of RAM at %04X\\n", 3*SPECTRUM_BANK, BASE_RAM);
		for (i = 0; i < 3*SPECTRUM_BANK; i++)
			space.write_byte(BASE_RAM + i, snapdata[SNA48_HDR + i]);

		// Get PC from stack
		addr = m_maincpu->state_int(Z80_SP);

		if (addr < BASE_RAM || addr > 4*SPECTRUM_BANK - 2)
			logerror("Corrupted SP out of range:%04X", addr);
		else
			logerror("Fetching PC from the stack at SP:%04X\\n", addr);

		data = (space.read_byte(addr + 1) << 8) | space.read_byte(addr + 0);
		m_maincpu->set_state_int(Z80_PC, data);

#if 0
		space.write_byte(addr + 0, 0); // It\'s been reported that zeroing these locations fixes the loading
		space.write_byte(addr + 1, 0); // of a few images that were snapshot at a "wrong" instant
#endif

		addr += 2;
		logerror("Fixing SP:%04X\\n", addr);
		m_maincpu->set_state_int(Z80_SP, addr);

		// Set border color
		data = snapdata[SNA48_OFFSET + 26] & 0x07;
		m_port_fe_data = (m_port_fe_data & 0xf8) | data;
		border_update(data);
		logerror("Border color:%02X\\n", data);

		//logerror("Snapshot loaded.\\nExecution resuming at %s\\n", m_maincpu->state_string(Z80_PC).c_str());
	}
	else
	{
		// Set up other RAM banks
		for (i = 0; i < 8; i++)
			usedbanks[i] = 0;

		usedbanks[5] = 1;                               // 0x4000-0x7fff
		usedbanks[2] = 1;                               // 0x8000-0xbfff
		usedbanks[m_port_7ffd_data & 0x07] = 1;    // Banked memory

		logerror("Loading %05X bytes of RAM at %04X\\n", 8*SPECTRUM_BANK, BASE_RAM);
		logerror("Loading bank 5 from offset:0001B\\n");
		logerror("Loading bank 2 from offset:0401B\\n");
		logerror("Loading bank %d from offset:0801B\\n", snapdata[SNA128_OFFSET + 2] & 0x07);
		for (i = 0; i < 3*SPECTRUM_BANK; i++)
			space.write_byte(BASE_RAM + i, snapdata[SNA48_HDR + i]);

		bank_offset = SNA48_SIZE + SNA128_HDR;
		for (i = 0; i < 8; i++)
		{
			if (!usedbanks[i])
			{
				logerror("Loading bank %d from offset:%05lX\\n", i, bank_offset);
				m_port_7ffd_data &= 0xf8;
				m_port_7ffd_data += i;
				update_paging();
				for (j = 0; j < SPECTRUM_BANK; j++)
					space.write_byte(j + 3*SPECTRUM_BANK, snapdata[bank_offset + j]);
				bank_offset += SPECTRUM_BANK;
			}
		}

		// program counter
		data = (snapdata[SNA128_OFFSET + 1] << 8) | snapdata[SNA128_OFFSET + 0];
		m_maincpu->set_state_int(Z80_PC, data);

		// Set border color
		data = snapdata[SNA48_OFFSET + 26] & 0x07;
		m_port_fe_data = (m_port_fe_data & 0xf8) | data;
		border_update(data);
		logerror("Border color:%02X\\n", data);
		data = m_port_7ffd_data & 0x07;

		// Reset paging
		m_port_7ffd_data = snapdata[SNA128_OFFSET + 2];
		update_paging();

		//logerror("Snapshot loaded.\\nExecution resuming at bank:%d %s\\n", data, m_maincpu->state_string(Z80_PC).c_str());
	}'};
MERGE (n:KG {id: 'handler:spectrum_state.setup_sp'}) SET n:Handler SET n += {method: 'setup_sp', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec_snqk.cpp', sourceLine: 299, sourceColumn: 1, sourceEndLine: 412, sourceConstants: ['Z80_PC=-1', 'Z80_SP=1', 'Z80_AF=10', 'Z80_BC=11', 'Z80_DE=12', 'Z80_HL=13', 'Z80_IX=14', 'Z80_IY=15', 'Z80_AF2=16', 'Z80_BC2=17', 'Z80_DE2=18', 'Z80_HL2=19', 'Z80_R=20', 'Z80_I=21', 'Z80_IM=22', 'Z80_IFF1=23', 'Z80_IFF2=24', 'BASE_RAM=16384', 'SPECTRUM_BANK=16384', 'SP_OLD_HDR=32', 'SP_NEW_HDR=38', 'SP_NEW_SIZE_16K=16422', 'SP_NEW_SIZE_48K=49190'], sourceParameters: 'const uint8_t *snapdata, uint32_t snapsize', sourceBody: 'int i, SP_OFFSET;
	uint8_t intr;
	uint16_t start, size, data, status;
	address_space &space = m_maincpu->space(AS_PROGRAM);

	if (snapsize == SP_NEW_SIZE_16K || snapsize == SP_NEW_SIZE_48K)
	{
		SP_OFFSET = 0;
		start = (snapdata[SP_OFFSET +  5] << 8) | snapdata[SP_OFFSET +  4];
		size = (snapdata[SP_OFFSET +  3] << 8) | snapdata[SP_OFFSET +  2];
	}
	else
	{
		SP_OFFSET = SP_OLD_HDR - SP_NEW_HDR;
		start = BASE_RAM;
		size = 3*SPECTRUM_BANK;
	}

	data = (snapdata[SP_OFFSET + 13] << 8) | snapdata[SP_OFFSET + 12];
	m_maincpu->set_state_int(Z80_AF, data);

	data = (snapdata[SP_OFFSET +  7] << 8) | snapdata[SP_OFFSET +  6];
	m_maincpu->set_state_int(Z80_BC, data);

	data = (snapdata[SP_OFFSET +  9] << 8) | snapdata[SP_OFFSET +  8];
	m_maincpu->set_state_int(Z80_DE, data);

	data = (snapdata[SP_OFFSET + 11] << 8) | snapdata[SP_OFFSET + 10];
	m_maincpu->set_state_int(Z80_HL, data);


	data = (snapdata[SP_OFFSET + 25] << 8) | snapdata[SP_OFFSET + 24];
	m_maincpu->set_state_int(Z80_AF2, data);

	data = (snapdata[SP_OFFSET + 19] << 8) | snapdata[SP_OFFSET + 18];
	m_maincpu->set_state_int(Z80_BC2, data);

	data = (snapdata[SP_OFFSET + 21] << 8) | snapdata[SP_OFFSET + 20];
	m_maincpu->set_state_int(Z80_DE2, data);

	data = (snapdata[SP_OFFSET + 23] << 8) | snapdata[SP_OFFSET + 22];
	m_maincpu->set_state_int(Z80_HL2, data);


	data = (snapdata[SP_OFFSET + 15] << 8) | snapdata[SP_OFFSET + 14];
	m_maincpu->set_state_int(Z80_IX, data);

	data = (snapdata[SP_OFFSET + 17] << 8) | snapdata[SP_OFFSET + 16];
	m_maincpu->set_state_int(Z80_IY, data);


	data = snapdata[SP_OFFSET + 26];
	m_maincpu->set_state_int(Z80_R, data);

	data = snapdata[SP_OFFSET + 27];
	m_maincpu->set_state_int(Z80_I, data);


	data = (snapdata[SP_OFFSET + 29] << 8) | snapdata[SP_OFFSET + 28];
	m_maincpu->set_state_int(Z80_SP, data);

	data = (snapdata[SP_OFFSET + 31] << 8) | snapdata[SP_OFFSET + 30];
	m_maincpu->set_state_int(Z80_PC, data);


	status = (snapdata[SP_OFFSET + 37] << 8) | snapdata[SP_OFFSET + 36];

	data = (BIT(status, 3) << 1) | BIT(status, 1);
	switch(data)
	{
		case 0: // case 2: in version 0.99e of the emulator
		m_maincpu->set_state_int(Z80_IM, 1);
		break;
		case 1: // case 3: in version 0.99e of the emulator
		m_maincpu->set_state_int(Z80_IM, 2);
		break;
		case 2: // case 0: in version 0.99e of the emulator
		case 3: // case 1: in version 0.99e of the emulator
		m_maincpu->set_state_int(Z80_IM, (uint64_t)0);
	}

	data = BIT(status, 0);
	m_maincpu->set_state_int(Z80_IFF1, data);

	data = BIT(status, 2);
	m_maincpu->set_state_int(Z80_IFF2, data);

	intr = BIT(status, 4) ? ASSERT_LINE : CLEAR_LINE;
	m_maincpu->set_input_line(INPUT_LINE_IRQ0, intr);
	m_maincpu->set_input_line(INPUT_LINE_HALT, CLEAR_LINE);

	/* Not supported as it\'s wrong anyway: even if we define current invert it can change to opposite either on next frame or N frames later depending on current state.
	data = BIT(status, 5);
	m_flash_invert = data;
	logerror("FLASH state: %s\\n", data ? "PAPER on INK" : "INK on PAPER");
	*/

	// Memory dump
	logerror("Loading %04X bytes of RAM at %04X\\n", size, start);
	for (i = 0; i < size; i++)
		space.write_byte(start + i, snapdata[SP_OFFSET + SP_NEW_HDR + i]);

	// Set border color
	data = snapdata[SP_OFFSET + 34] & 0x07;
	m_port_fe_data = (m_port_fe_data & 0xf8) | data;
	border_update(data);
	logerror("Border color:%02X\\n", data);

	page_basicrom();

	//logerror("Snapshot loaded.\\nExecution resuming at %s\\n", m_maincpu->state_string(Z80_PC).c_str());'};
MERGE (n:KG {id: 'handler:spectrum_state.setup_ach'}) SET n:Handler SET n += {method: 'setup_ach', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec_snqk.cpp', sourceLine: 716, sourceColumn: 1, sourceEndLine: 797, sourceConstants: ['Z80_PC=-1', 'Z80_SP=1', 'Z80_AF=10', 'Z80_BC=11', 'Z80_DE=12', 'Z80_HL=13', 'Z80_IX=14', 'Z80_IY=15', 'Z80_AF2=16', 'Z80_BC2=17', 'Z80_DE2=18', 'Z80_HL2=19', 'Z80_R=20', 'Z80_I=21', 'Z80_IM=22', 'Z80_IFF1=23', 'Z80_IFF2=24', 'BASE_RAM=16384', 'SPECTRUM_BANK=16384', 'ACH_OFFSET=0', 'ACH_HDR=256'], sourceParameters: 'const uint8_t *snapdata, uint32_t snapsize', sourceBody: 'int i;
	uint8_t intr;
	uint16_t data;
	address_space &space = m_maincpu->space(AS_PROGRAM);

	data = (snapdata[ACH_OFFSET +   0] << 8) | snapdata[ACH_OFFSET +   4];
	m_maincpu->set_state_int(Z80_AF, data);

	data = (snapdata[ACH_OFFSET +   8] << 8) | snapdata[ACH_OFFSET +  12];
	m_maincpu->set_state_int(Z80_BC, data);

	data = (snapdata[ACH_OFFSET +  16] << 8) | snapdata[ACH_OFFSET +  20];
	m_maincpu->set_state_int(Z80_DE, data);

	data = (snapdata[ACH_OFFSET +  24] << 8) | snapdata[ACH_OFFSET +  28];
	m_maincpu->set_state_int(Z80_HL, data);


	data = (snapdata[ACH_OFFSET + 236] << 8) | snapdata[ACH_OFFSET + 237];
	m_maincpu->set_state_int(Z80_AF2, data);

	data = (snapdata[ACH_OFFSET + 240] << 8) | snapdata[ACH_OFFSET + 241];
	m_maincpu->set_state_int(Z80_BC2, data);

	data = (snapdata[ACH_OFFSET + 244] << 8) | snapdata[ACH_OFFSET + 245];
	m_maincpu->set_state_int(Z80_DE2, data);

	data = (snapdata[ACH_OFFSET + 246] << 8) | snapdata[ACH_OFFSET + 247];
	m_maincpu->set_state_int(Z80_HL2, data);


	data = (snapdata[ACH_OFFSET + 249] << 8) | snapdata[ACH_OFFSET + 248];
	m_maincpu->set_state_int(Z80_IX, data);

	data = (snapdata[ACH_OFFSET + 253] << 8) | snapdata[ACH_OFFSET + 252];
	m_maincpu->set_state_int(Z80_IY, data);

	data = snapdata[ACH_OFFSET + 148];
	m_maincpu->set_state_int(Z80_R, data);

	data = snapdata[ACH_OFFSET + 190];
	m_maincpu->set_state_int(Z80_I, data);


	data = (snapdata[ACH_OFFSET +  41] << 8) | snapdata[ACH_OFFSET +  40];
	m_maincpu->set_state_int(Z80_SP, data);

	data = (snapdata[ACH_OFFSET +  33] << 8) | snapdata[ACH_OFFSET +  32];
	m_maincpu->set_state_int(Z80_PC, data);

	data = snapdata[ACH_OFFSET + 164] & 0x03;
	if (data == 3)
		data = 0;
	m_maincpu->set_state_int(Z80_IM, data);

	data = snapdata[ACH_OFFSET + 191] ? 1 : 0;
	m_maincpu->set_state_int(Z80_IFF1, data);
	m_maincpu->set_state_int(Z80_IFF2, data);

	intr = snapdata[ACH_OFFSET + 191] ? CLEAR_LINE : ASSERT_LINE;
	m_maincpu->set_input_line(INPUT_LINE_IRQ0, intr);
	m_maincpu->set_input_line(INPUT_LINE_HALT, CLEAR_LINE);

	logerror("Skipping the 16K ROM dump at offset:%04X\\n", ACH_OFFSET + 256);

	// Memory dump
	logerror("Loading %04X bytes of RAM at %04X\\n", 3*SPECTRUM_BANK, BASE_RAM);
	for (i = 0; i < 3*SPECTRUM_BANK; i++)
		space.write_byte(BASE_RAM + i, snapdata[ACH_HDR + SPECTRUM_BANK + i]);

	// Set border color
	data = snapdata[ACH_OFFSET + 156] & 0x07;
	m_port_fe_data = (m_port_fe_data & 0xf8) | data;
	border_update(data);
	logerror("Border color:%02X\\n", data);

	page_basicrom();

	//logerror("Snapshot loaded.\\nExecution resuming at %s\\n", m_maincpu->state_string(Z80_PC).c_str());'};
MERGE (n:KG {id: 'handler:spectrum_state.setup_prg'}) SET n:Handler SET n += {method: 'setup_prg', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec_snqk.cpp', sourceLine: 847, sourceColumn: 1, sourceEndLine: 942, sourceConstants: ['Z80_PC=-1', 'Z80_SP=1', 'Z80_AF=10', 'Z80_BC=11', 'Z80_DE=12', 'Z80_HL=13', 'Z80_IX=14', 'Z80_IY=15', 'Z80_AF2=16', 'Z80_BC2=17', 'Z80_DE2=18', 'Z80_HL2=19', 'Z80_R=20', 'Z80_I=21', 'Z80_IM=22', 'Z80_IFF1=23', 'Z80_IFF2=24', 'BASE_RAM=16384', 'SPECTRUM_BANK=16384', 'PRG_OFFSET=0', 'PRG_HDR=256'], sourceParameters: 'const uint8_t *snapdata, uint32_t snapsize', sourceBody: 'int i;
	uint8_t intr;
	uint16_t addr, data;
	address_space &space = m_maincpu->space(AS_PROGRAM);

	data = snapdata[PRG_OFFSET +   0];
	if (data != 0x05)
		logerror("Wrong DISCiPLE/+D file type: %02X instead of 05\\n", data);

	data = (snapdata[PRG_OFFSET + 235] << 8) | snapdata[PRG_OFFSET + 234];
	m_maincpu->set_state_int(Z80_BC, data);

	data = (snapdata[PRG_OFFSET + 233] << 8) | snapdata[PRG_OFFSET + 232];
	m_maincpu->set_state_int(Z80_DE, data);

	data = (snapdata[PRG_OFFSET + 237] << 8) | snapdata[PRG_OFFSET + 236];
	m_maincpu->set_state_int(Z80_HL, data);


	data = (snapdata[PRG_OFFSET + 231] << 8) | snapdata[PRG_OFFSET + 230];
	m_maincpu->set_state_int(Z80_AF2, data);

	data = (snapdata[PRG_OFFSET + 227] << 8) | snapdata[PRG_OFFSET + 226];
	m_maincpu->set_state_int(Z80_BC2, data);

	data = (snapdata[PRG_OFFSET + 225] << 8) | snapdata[PRG_OFFSET + 224];
	m_maincpu->set_state_int(Z80_DE2, data);

	data = (snapdata[PRG_OFFSET + 229] << 8) | snapdata[PRG_OFFSET + 228];
	m_maincpu->set_state_int(Z80_HL2, data);


	data = (snapdata[PRG_OFFSET + 223] << 8) | snapdata[PRG_OFFSET + 222];
	m_maincpu->set_state_int(Z80_IX, data);

	data = (snapdata[PRG_OFFSET + 221] << 8) | snapdata[PRG_OFFSET + 220];
	m_maincpu->set_state_int(Z80_IY, data);

	data = snapdata[PRG_OFFSET + 239];
	m_maincpu->set_state_int(Z80_I, data);

	m_maincpu->set_state_int(Z80_IM, (data == 0x00 || data == 0x3f) ? 1 : 2);

	// Memory dump
	logerror("Loading %04X bytes of RAM at %04X\\n", 3*SPECTRUM_BANK, BASE_RAM);
	for (i = 0; i < 3*SPECTRUM_BANK; i++)
		space.write_byte(BASE_RAM + i, snapdata[PRG_HDR + i]);

	addr = (snapdata[PRG_OFFSET + 241] << 8) | snapdata[PRG_OFFSET + 240];
	if (addr < BASE_RAM || addr > 4*SPECTRUM_BANK - 6)
		logerror("Corrupted SP out of range:%04X", addr);
	else
		logerror("Fetching registers IFF1/2, R, AF and PC from the stack at SP:%04X\\n", addr);

	data = space.read_byte(addr + 0); // IFF1/2: (bit 2, 0=DI/1=EI)
	m_maincpu->set_state_int(Z80_IFF1, BIT(data, 2));
	m_maincpu->set_state_int(Z80_IFF2, BIT(data, 2));

	intr = BIT(data, 2) ? CLEAR_LINE : ASSERT_LINE;
	m_maincpu->set_input_line(INPUT_LINE_IRQ0, intr);
	m_maincpu->set_input_line(INPUT_LINE_HALT, CLEAR_LINE);

	data = space.read_byte(addr + 1);
	m_maincpu->set_state_int(Z80_R, data);

	data = (space.read_byte(addr + 3) << 8) | space.read_byte(addr + 2);
	m_maincpu->set_state_int(Z80_AF, data);

	data = (space.read_byte(addr + 5) << 8) | space.read_byte(addr + 4);
	m_maincpu->set_state_int(Z80_PC, data);

#if 0
	space.write_byte(addr + 0, 0); // It\'s been reported that zeroing these locations fixes the loading
	space.write_byte(addr + 1, 0); // of a few images that were snapshot at a "wrong" instant
	space.write_byte(addr + 2, 0);
	space.write_byte(addr + 3, 0);
	space.write_byte(addr + 4, 0);
	space.write_byte(addr + 5, 0);
#endif

	addr += 6;
	logerror("Fixing SP:%04X\\n", addr);
	m_maincpu->set_state_int(Z80_SP, addr);

	// Set border color
	data = (space.read_byte(0x5c48) >> 3) & 0x07; // Get the current border color from BORDCR system variable.
	m_port_fe_data = (m_port_fe_data & 0xf8) | data;
	border_update(data);
	logerror("Border color:%02X\\n", data);

	page_basicrom();

	//logerror("Snapshot loaded.\\nExecution resuming at %s\\n", m_maincpu->state_string(Z80_PC).c_str());'};
MERGE (n:KG {id: 'handler:spectrum_state.setup_plusd'}) SET n:Handler SET n += {method: 'setup_plusd', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec_snqk.cpp', sourceLine: 1015, sourceColumn: 1, sourceEndLine: 1143, sourceConstants: ['Z80_PC=-1', 'Z80_SP=1', 'Z80_AF=10', 'Z80_BC=11', 'Z80_DE=12', 'Z80_HL=13', 'Z80_IX=14', 'Z80_IY=15', 'Z80_AF2=16', 'Z80_BC2=17', 'Z80_DE2=18', 'Z80_HL2=19', 'Z80_R=20', 'Z80_I=21', 'Z80_IM=22', 'Z80_IFF1=23', 'Z80_IFF2=24', 'BASE_RAM=16384', 'SPECTRUM_BANK=16384', 'PLUSD_OFFSET=0', 'PLUSD48_HDR=22', 'PLUSD48_SIZE=49174', 'PLUSD128_HDR=23'], sourceParameters: 'const uint8_t *snapdata, uint32_t snapsize', sourceBody: 'int i, j;
	uint8_t intr;
	uint16_t addr = 0, data;
	address_space &space = m_maincpu->space(AS_PROGRAM);

	data = (snapdata[PLUSD_OFFSET + 15] << 8) | snapdata[PLUSD_OFFSET + 14];
	m_maincpu->set_state_int(Z80_BC, data);

	data = (snapdata[PLUSD_OFFSET + 13] << 8) | snapdata[PLUSD_OFFSET + 12];
	m_maincpu->set_state_int(Z80_DE, data);

	data = (snapdata[PLUSD_OFFSET + 17] << 8) | snapdata[PLUSD_OFFSET + 16];
	m_maincpu->set_state_int(Z80_HL, data);


	data = (snapdata[PLUSD_OFFSET + 11] << 8) | snapdata[PLUSD_OFFSET + 10];
	m_maincpu->set_state_int(Z80_AF2, data);

	data = (snapdata[PLUSD_OFFSET +  7] << 8) | snapdata[PLUSD_OFFSET +  6];
	m_maincpu->set_state_int(Z80_BC2, data);

	data = (snapdata[PLUSD_OFFSET +  5] << 8) | snapdata[PLUSD_OFFSET +  4];
	m_maincpu->set_state_int(Z80_DE2, data);

	data = (snapdata[PLUSD_OFFSET +  9] << 8) | snapdata[PLUSD_OFFSET +  8];
	m_maincpu->set_state_int(Z80_HL2, data);


	data = (snapdata[PLUSD_OFFSET +  3] << 8) | snapdata[PLUSD_OFFSET +  2];
	m_maincpu->set_state_int(Z80_IX, data);

	data = (snapdata[PLUSD_OFFSET +  1] << 8) | snapdata[PLUSD_OFFSET +  0];
	m_maincpu->set_state_int(Z80_IY, data);

	data = snapdata[PLUSD_OFFSET + 19];
	m_maincpu->set_state_int(Z80_I, data);

	m_maincpu->set_state_int(Z80_IM, (data == 0x00 || data == 0x3f) ? 1 : 2);

	if (snapsize == PLUSD48_SIZE)
	{
		page_basicrom();

		// Memory dump
		logerror("Loading %04X bytes of RAM at %04X\\n", 3*SPECTRUM_BANK, BASE_RAM);
		for (i = 0; i < 3*SPECTRUM_BANK; i++)
			space.write_byte(BASE_RAM + i, snapdata[PLUSD48_HDR + i]);
	}
	else
	{
		logerror("Loading %05X bytes of RAM at %04X\\n", 8*SPECTRUM_BANK, BASE_RAM);
		for (i = 0; i < 8; i++)
		{
			switch (i)
			{
				case 5: addr = SPECTRUM_BANK;
						break;
				case 2: addr = 2*SPECTRUM_BANK;
						break;
				case 0:
				case 1:
				case 3:
				case 4:
				case 6:
				case 7: addr = 3*SPECTRUM_BANK;
						m_port_7ffd_data &= 0xf8;
						m_port_7ffd_data += i;
						update_paging();
						break;
			}
			logerror("Loading bank %d from offset:%05X\\n", i, PLUSD128_HDR + i*SPECTRUM_BANK);
			for (j = 0; j < SPECTRUM_BANK; j++)
				space.write_byte(j + addr, snapdata[j + PLUSD128_HDR + i*SPECTRUM_BANK]);
		}
		m_port_7ffd_data = snapdata[PLUSD_OFFSET + 22];
		logerror("Port 7FFD:%02X\\n", m_port_7ffd_data);
		logerror("Paging bank:%d\\n", m_port_7ffd_data & 0x07);
		update_paging();
	}

	addr = (snapdata[PLUSD_OFFSET + 21] << 8) | snapdata[PLUSD_OFFSET + 20];
	if (addr < BASE_RAM || addr > 4*SPECTRUM_BANK - 6)
		logerror("Corrupted SP out of range:%04X", addr);
	else
		logerror("Fetching registers IFF1/2, R, AF and PC from the stack at SP:%04X\\n", addr);

	data = space.read_byte(addr + 0); // IFF1/2: (bit 2, 0=DI/1=EI)
	m_maincpu->set_state_int(Z80_IFF1, BIT(data, 2));
	m_maincpu->set_state_int(Z80_IFF2, BIT(data, 2));

	intr = BIT(data, 2) ? CLEAR_LINE : ASSERT_LINE;
	m_maincpu->set_input_line(INPUT_LINE_IRQ0, intr);
	m_maincpu->set_input_line(INPUT_LINE_HALT, CLEAR_LINE);

	data = space.read_byte(addr + 1);
	m_maincpu->set_state_int(Z80_R, data);

	data = (space.read_byte(addr + 3) << 8) | space.read_byte(addr + 2);
	m_maincpu->set_state_int(Z80_AF, data);

	data = (space.read_byte(addr + 5) << 8) | space.read_byte(addr + 4);
	m_maincpu->set_state_int(Z80_PC, data);

#if 0
	space.write_byte(addr + 0, 0); // It\'s been reported that zeroing these locations fixes the loading
	space.write_byte(addr + 1, 0); // of a few images that were snapshot at a "wrong" instant
	space.write_byte(addr + 2, 0);
	space.write_byte(addr + 3, 0);
	space.write_byte(addr + 4, 0);
	space.write_byte(addr + 5, 0);
#endif

	addr += 6;
	logerror("Fixing SP:%04X\\n", addr);
	m_maincpu->set_state_int(Z80_SP, addr);

	// Set border color
	data = (space.read_byte(0x5c48) >> 3) & 0x07; // Get the current border color from BORDCR system variable.
	m_port_fe_data = (m_port_fe_data & 0xf8) | data;
	border_update(data);
	logerror("Border color:%02X\\n", data);

	//if (snapsize == PLUSD48_SIZE)
		//logerror("Snapshot loaded.\\nExecution resuming at %s\\n", m_maincpu->state_string(Z80_PC).c_str());
	//else
		//logerror("Snapshot loaded.\\nExecution resuming at bank:%d %s\\n", m_port_7ffd_data & 0x07, m_maincpu->state_string(Z80_PC).c_str());'};
MERGE (n:KG {id: 'handler:spectrum_state.setup_sem'}) SET n:Handler SET n += {method: 'setup_sem', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec_snqk.cpp', sourceLine: 1181, sourceColumn: 1, sourceEndLine: 1263, sourceConstants: ['Z80_PC=-1', 'Z80_SP=1', 'Z80_AF=10', 'Z80_BC=11', 'Z80_DE=12', 'Z80_HL=13', 'Z80_IX=14', 'Z80_IY=15', 'Z80_AF2=16', 'Z80_BC2=17', 'Z80_DE2=18', 'Z80_HL2=19', 'Z80_R=20', 'Z80_I=21', 'Z80_IM=22', 'Z80_IFF1=23', 'Z80_IFF2=24', 'BASE_RAM=16384', 'SPECTRUM_BANK=16384', 'SEM_SIGNATURE=6', 'SEM_OFFSET=49158'], sourceParameters: 'const uint8_t *snapdata, uint32_t snapsize', sourceBody: 'int i;
	uint8_t intr;
	uint16_t data;
	address_space &space = m_maincpu->space(AS_PROGRAM);

	data = (snapdata[SEM_OFFSET +  1] << 8) | snapdata[SEM_OFFSET +  0];
	m_maincpu->set_state_int(Z80_AF, data);

	data = (snapdata[SEM_OFFSET +  3] << 8) | snapdata[SEM_OFFSET +  2];
	m_maincpu->set_state_int(Z80_BC, data);

	data = (snapdata[SEM_OFFSET +  5] << 8) | snapdata[SEM_OFFSET +  4];
	m_maincpu->set_state_int(Z80_DE, data);

	data = (snapdata[SEM_OFFSET +  7] << 8) | snapdata[SEM_OFFSET +  6];
	m_maincpu->set_state_int(Z80_HL, data);


	data = (snapdata[SEM_OFFSET +  9] << 8) | snapdata[SEM_OFFSET +  8];
	m_maincpu->set_state_int(Z80_AF2, data);

	data = (snapdata[SEM_OFFSET + 11] << 8) | snapdata[SEM_OFFSET + 10];
	m_maincpu->set_state_int(Z80_BC2, data);

	data = (snapdata[SEM_OFFSET + 13] << 8) | snapdata[SEM_OFFSET + 12];
	m_maincpu->set_state_int(Z80_DE2, data);

	data = (snapdata[SEM_OFFSET + 15] << 8) | snapdata[SEM_OFFSET + 14];
	m_maincpu->set_state_int(Z80_HL2, data);


	data = (snapdata[SEM_OFFSET + 21] << 8) | snapdata[SEM_OFFSET + 20];
	m_maincpu->set_state_int(Z80_IX, data);

	data = (snapdata[SEM_OFFSET + 23] << 8) | snapdata[SEM_OFFSET + 22];
	m_maincpu->set_state_int(Z80_IY, data);


	data = snapdata[SEM_OFFSET + 26];
	m_maincpu->set_state_int(Z80_R, data);

	data = snapdata[SEM_OFFSET + 24];
	m_maincpu->set_state_int(Z80_I, data);


	data = (snapdata[SEM_OFFSET + 19] << 8) | snapdata[SEM_OFFSET + 18];
	m_maincpu->set_state_int(Z80_SP, data);

	data = (snapdata[SEM_OFFSET + 17] << 8) | snapdata[SEM_OFFSET + 16];
	m_maincpu->set_state_int(Z80_PC, data);

	data = snapdata[SEM_OFFSET + 32];
	m_maincpu->set_state_int(Z80_IM, data);

	data = snapdata[SEM_OFFSET + 28];
	m_maincpu->set_state_int(Z80_IFF1, BIT(data, 0));
	data = snapdata[SEM_OFFSET + 30];
	m_maincpu->set_state_int(Z80_IFF2, BIT(data, 0));

	intr = BIT(snapdata[SEM_OFFSET + 30], 0) ? CLEAR_LINE : ASSERT_LINE;
	m_maincpu->set_input_line(INPUT_LINE_IRQ0, intr);
	m_maincpu->set_input_line(INPUT_LINE_HALT, CLEAR_LINE);

	// Memory dump
	logerror("Loading %04X bytes of RAM at %04X\\n", 3*SPECTRUM_BANK, BASE_RAM);
	for (i = 0; i < 3*SPECTRUM_BANK; i++)
		space.write_byte(BASE_RAM + i, snapdata[SEM_SIGNATURE + i]);

	// Set border color
	data = (space.read_byte(0x5c48) >> 3) & 0x07; // Get the current border color from BORDCR system variable.
	m_port_fe_data = (m_port_fe_data & 0xf8) | data;
	border_update(data);
	logerror("Border color:%02X\\n", data);

	page_basicrom();

	//logerror("Snapshot loaded.\\nExecution resuming at %s\\n", m_maincpu->state_string(Z80_PC).c_str());

/* TODO: Decode the optional POKE bank at the end of the image */'};
MERGE (n:KG {id: 'handler:spectrum_state.setup_sit'}) SET n:Handler SET n += {method: 'setup_sit', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec_snqk.cpp', sourceLine: 1298, sourceColumn: 1, sourceEndLine: 1377, sourceConstants: ['Z80_PC=-1', 'Z80_SP=1', 'Z80_AF=10', 'Z80_BC=11', 'Z80_DE=12', 'Z80_HL=13', 'Z80_IX=14', 'Z80_IY=15', 'Z80_AF2=16', 'Z80_BC2=17', 'Z80_DE2=18', 'Z80_HL2=19', 'Z80_R=20', 'Z80_I=21', 'Z80_IM=22', 'Z80_IFF1=23', 'Z80_IFF2=24', 'BASE_RAM=16384', 'SPECTRUM_BANK=16384', 'SIT_OFFSET=0', 'SIT_HDR=28'], sourceParameters: 'const uint8_t *snapdata, uint32_t snapsize', sourceBody: 'int i;
	uint8_t intr;
	uint16_t data;
	address_space &space = m_maincpu->space(AS_PROGRAM);

	data = (snapdata[SIT_OFFSET +  7] << 8) | snapdata[SIT_OFFSET +  6];
	m_maincpu->set_state_int(Z80_AF, data);

	data = (snapdata[SIT_OFFSET +  1] << 8) | snapdata[SIT_OFFSET +  0];
	m_maincpu->set_state_int(Z80_BC, data);

	data = (snapdata[SIT_OFFSET +  3] << 8) | snapdata[SIT_OFFSET +  2];
	m_maincpu->set_state_int(Z80_DE, data);

	data = (snapdata[SIT_OFFSET +  5] << 8) | snapdata[SIT_OFFSET +  4];
	m_maincpu->set_state_int(Z80_HL, data);


	data = (snapdata[SIT_OFFSET + 25] << 8) | snapdata[SIT_OFFSET + 24];
	m_maincpu->set_state_int(Z80_AF2, data);

	data = (snapdata[SIT_OFFSET + 19] << 8) | snapdata[SIT_OFFSET + 18];
	m_maincpu->set_state_int(Z80_BC2, data);

	data = (snapdata[SIT_OFFSET + 21] << 8) | snapdata[SIT_OFFSET + 20];
	m_maincpu->set_state_int(Z80_DE2, data);

	data = (snapdata[SIT_OFFSET + 23] << 8) | snapdata[SIT_OFFSET + 22];
	m_maincpu->set_state_int(Z80_HL2, data);


	data = (snapdata[SIT_OFFSET +  9] << 8) | snapdata[SIT_OFFSET +  8];
	m_maincpu->set_state_int(Z80_IX, data);

	data = (snapdata[SIT_OFFSET + 11] << 8) | snapdata[SIT_OFFSET + 10];
	m_maincpu->set_state_int(Z80_IY, data);


	data = snapdata[SIT_OFFSET + 16];
	m_maincpu->set_state_int(Z80_R, data);

	data = snapdata[SIT_OFFSET + 17];
	m_maincpu->set_state_int(Z80_I, data);


	data = (snapdata[SIT_OFFSET + 13] << 8) | snapdata[SIT_OFFSET + 12];
	m_maincpu->set_state_int(Z80_SP, data);

	data = (snapdata[SIT_OFFSET + 15] << 8) | snapdata[SIT_OFFSET + 14];
	m_maincpu->set_state_int(Z80_PC, data);

	data = snapdata[SIT_OFFSET + 26];
	m_maincpu->set_state_int(Z80_IM, data);

	data = 0x01; // .SIT snapshots don\'t specify whether interrupts are enabled or not, so I assume they are.
	m_maincpu->set_state_int(Z80_IFF1, data);
	m_maincpu->set_state_int(Z80_IFF2, data);

	intr = data ? CLEAR_LINE : ASSERT_LINE;
	m_maincpu->set_input_line(INPUT_LINE_IRQ0, intr);
	m_maincpu->set_input_line(INPUT_LINE_HALT, CLEAR_LINE);

	// Memory dump
	logerror("Skipping the 16K ROM dump at offset:%04X\\n", SIT_OFFSET + 28);
	logerror("Loading %04X bytes of RAM at %04X\\n", 3*SPECTRUM_BANK, BASE_RAM);
	for (i = 0; i < 3*SPECTRUM_BANK; i++)
		space.write_byte(BASE_RAM + i, snapdata[SIT_HDR + SPECTRUM_BANK + i]);

	// Set border color
	data = snapdata[SIT_OFFSET + 27] & 0x07;
	m_port_fe_data = (m_port_fe_data & 0xf8) | data;
	border_update(data);
	logerror("Border color:%02X\\n", data);

	page_basicrom();

	//logerror("Snapshot loaded.\\nExecution resuming at %s\\n", m_maincpu->state_string(Z80_PC).c_str());'};
MERGE (n:KG {id: 'handler:spectrum_state.setup_zx'}) SET n:Handler SET n += {method: 'setup_zx', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec_snqk.cpp', sourceLine: 1426, sourceColumn: 1, sourceEndLine: 1519, sourceConstants: ['Z80_PC=-1', 'Z80_SP=1', 'Z80_AF=10', 'Z80_BC=11', 'Z80_DE=12', 'Z80_HL=13', 'Z80_IX=14', 'Z80_IY=15', 'Z80_AF2=16', 'Z80_BC2=17', 'Z80_DE2=18', 'Z80_HL2=19', 'Z80_R=20', 'Z80_I=21', 'Z80_IM=22', 'Z80_IFF1=23', 'Z80_IFF2=24', 'BASE_RAM=16384', 'SPECTRUM_BANK=16384', 'ZX_OFFSET=49284'], sourceParameters: 'const uint8_t *snapdata, uint32_t snapsize', sourceBody: 'int i;
	uint8_t intr;
	uint16_t data, mode;
	address_space &space = m_maincpu->space(AS_PROGRAM);

	logerror("Skipping last 132 bytes of the 16K ROM dump at offset:0000\\n");

	data = (snapdata[ZX_OFFSET + 173] << 8) | snapdata[ZX_OFFSET + 177];
	m_maincpu->set_state_int(Z80_AF, data);

	data = (snapdata[ZX_OFFSET + 150] << 8) | snapdata[ZX_OFFSET + 151];
	m_maincpu->set_state_int(Z80_BC, data);

	data = (snapdata[ZX_OFFSET + 154] << 8) | snapdata[ZX_OFFSET + 155];
	m_maincpu->set_state_int(Z80_DE, data);

	data = (snapdata[ZX_OFFSET + 158] << 8) | snapdata[ZX_OFFSET + 159];
	m_maincpu->set_state_int(Z80_HL, data);


	data = (snapdata[ZX_OFFSET + 171] << 8) | snapdata[ZX_OFFSET + 175];
	m_maincpu->set_state_int(Z80_AF2, data);

	data = (snapdata[ZX_OFFSET + 152] << 8) | snapdata[ZX_OFFSET + 153];
	m_maincpu->set_state_int(Z80_BC2, data);

	data = (snapdata[ZX_OFFSET + 156] << 8) | snapdata[ZX_OFFSET + 157];
	m_maincpu->set_state_int(Z80_DE2, data);

	data = (snapdata[ZX_OFFSET + 160] << 8) | snapdata[ZX_OFFSET + 161];
	m_maincpu->set_state_int(Z80_HL2, data);


	data = (snapdata[ZX_OFFSET + 162] << 8) | snapdata[ZX_OFFSET + 163];
	m_maincpu->set_state_int(Z80_IX, data);

	data = (snapdata[ZX_OFFSET + 164] << 8) | snapdata[ZX_OFFSET + 165];
	m_maincpu->set_state_int(Z80_IY, data);


	data = snapdata[ZX_OFFSET + 167];
	m_maincpu->set_state_int(Z80_R, data);

	data = snapdata[ZX_OFFSET + 166];
	m_maincpu->set_state_int(Z80_I, data);


	data = (snapdata[ZX_OFFSET + 184] << 8) | snapdata[ZX_OFFSET + 185];
	m_maincpu->set_state_int(Z80_SP, data);

	data = (snapdata[ZX_OFFSET + 180] << 8) | snapdata[ZX_OFFSET + 181];
	m_maincpu->set_state_int(Z80_PC, data);

	mode = (snapdata[ZX_OFFSET + 190] << 8) | snapdata[ZX_OFFSET + 191];
	switch (mode)
	{
		case 0xffff:
		m_maincpu->set_state_int(Z80_IM, (uint64_t)0);
		break;
		case 0x00:
		m_maincpu->set_state_int(Z80_IM, 1);
		break;
		case 0x01:
		m_maincpu->set_state_int(Z80_IM, 2);
		break;
		default:
		logerror("Invalid IM:%04X\\n", mode);
	}

	data = BIT(snapdata[ZX_OFFSET + 142], 0);
	m_maincpu->set_state_int(Z80_IFF1, data);
	m_maincpu->set_state_int(Z80_IFF2, data);

	intr = BIT(snapdata[ZX_OFFSET + 142], 0) ? CLEAR_LINE : ASSERT_LINE;
	m_maincpu->set_input_line(INPUT_LINE_IRQ0, intr);
	m_maincpu->set_input_line(INPUT_LINE_HALT, CLEAR_LINE);

	// Memory dump
	logerror("Loading %04X bytes of RAM at %04X\\n", 3*SPECTRUM_BANK, BASE_RAM);
	for (i = 0; i < 3*SPECTRUM_BANK; i++)
		space.write_byte(BASE_RAM + i, snapdata[132 + i]);

	// Set border color
	data = (space.read_byte(0x5c48) >> 3) & 0x07; // Get the current border color from BORDCR system variable.
	m_port_fe_data = (m_port_fe_data & 0xf8) | data;
	border_update(data);
	logerror("Border color:%02X\\n", data);

	page_basicrom();

	//logerror("Snapshot loaded.\\nExecution resuming at %s\\n", m_maincpu->state_string(Z80_PC).c_str());'};
MERGE (n:KG {id: 'handler:spectrum_state.setup_snp'}) SET n:Handler SET n += {method: 'setup_snp', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec_snqk.cpp', sourceLine: 1556, sourceColumn: 1, sourceEndLine: 1635, sourceConstants: ['Z80_PC=-1', 'Z80_SP=1', 'Z80_AF=10', 'Z80_BC=11', 'Z80_DE=12', 'Z80_HL=13', 'Z80_IX=14', 'Z80_IY=15', 'Z80_AF2=16', 'Z80_BC2=17', 'Z80_DE2=18', 'Z80_HL2=19', 'Z80_R=20', 'Z80_I=21', 'Z80_IM=22', 'Z80_IFF1=23', 'Z80_IFF2=24', 'BASE_RAM=16384', 'SPECTRUM_BANK=16384', 'SNP_OFFSET=49152'], sourceParameters: 'const uint8_t *snapdata, uint32_t snapsize', sourceBody: 'int i;
	uint8_t intr;
	uint16_t data;
	address_space &space = m_maincpu->space(AS_PROGRAM);

	data = (snapdata[SNP_OFFSET +  1] << 8) | snapdata[SNP_OFFSET +  0];
	m_maincpu->set_state_int(Z80_AF, data);

	data = (snapdata[SNP_OFFSET +  5] << 8) | snapdata[SNP_OFFSET +  4];
	m_maincpu->set_state_int(Z80_BC, data);

	data = (snapdata[SNP_OFFSET +  7] << 8) | snapdata[SNP_OFFSET +  6];
	m_maincpu->set_state_int(Z80_DE, data);

	data = (snapdata[SNP_OFFSET +  9] << 8) | snapdata[SNP_OFFSET +  8];
	m_maincpu->set_state_int(Z80_HL, data);


	data = (snapdata[SNP_OFFSET + 24] << 8) | snapdata[SNP_OFFSET + 23];
	m_maincpu->set_state_int(Z80_AF2, data);

	data = (snapdata[SNP_OFFSET + 26] << 8) | snapdata[SNP_OFFSET + 25];
	m_maincpu->set_state_int(Z80_BC2, data);

	data = (snapdata[SNP_OFFSET + 28] << 8) | snapdata[SNP_OFFSET + 27];
	m_maincpu->set_state_int(Z80_DE2, data);

	data = (snapdata[SNP_OFFSET + 30] << 8) | snapdata[SNP_OFFSET + 29];
	m_maincpu->set_state_int(Z80_HL2, data);


	data = (snapdata[SNP_OFFSET + 15] << 8) | snapdata[SNP_OFFSET + 14];
	m_maincpu->set_state_int(Z80_IX, data);

	data = (snapdata[SNP_OFFSET + 17] << 8) | snapdata[SNP_OFFSET + 16];
	m_maincpu->set_state_int(Z80_IY, data);


	data = snapdata[SNP_OFFSET + 21];
	m_maincpu->set_state_int(Z80_R, data);

	data = snapdata[SNP_OFFSET + 22];
	m_maincpu->set_state_int(Z80_I, data);


	data = (snapdata[SNP_OFFSET + 13] << 8) | snapdata[SNP_OFFSET + 12];
	m_maincpu->set_state_int(Z80_SP, data);

	data = (snapdata[SNP_OFFSET + 11] << 8) | snapdata[SNP_OFFSET + 10];
	m_maincpu->set_state_int(Z80_PC, data);


	data = snapdata[SNP_OFFSET + 20] & 0x03;
	m_maincpu->set_state_int(Z80_IM, data);

	data = BIT(snapdata[SNP_OFFSET + 19], 0);
	m_maincpu->set_state_int(Z80_IFF1, data);
	m_maincpu->set_state_int(Z80_IFF2, data);

	intr = BIT(snapdata[SNP_OFFSET + 19], 0) ? CLEAR_LINE : ASSERT_LINE;
	m_maincpu->set_input_line(INPUT_LINE_IRQ0, intr);
	m_maincpu->set_input_line(INPUT_LINE_HALT, CLEAR_LINE);

	// Memory dump
	logerror("Loading %04X bytes of RAM at %04X\\n", 3*SPECTRUM_BANK, BASE_RAM);
	for (i = 0; i < 3*SPECTRUM_BANK; i++)
		space.write_byte(BASE_RAM + i, snapdata[i]);

	// Set border color
	data = snapdata[SNP_OFFSET +  2] & 0x07;
	m_port_fe_data = (m_port_fe_data & 0xf8) | data;
	border_update(data);
	logerror("Border color:%02X\\n", data);

	page_basicrom();

	//logerror("Snapshot loaded.\\nExecution resuming at %s\\n", m_maincpu->state_string(Z80_PC).c_str());'};
MERGE (n:KG {id: 'handler:spectrum_state.setup_frz'}) SET n:Handler SET n += {method: 'setup_frz', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec_snqk.cpp', sourceLine: 1931, sourceColumn: 1, sourceEndLine: 2041, sourceConstants: ['Z80_PC=-1', 'Z80_SP=1', 'Z80_AF=10', 'Z80_BC=11', 'Z80_DE=12', 'Z80_HL=13', 'Z80_IX=14', 'Z80_IY=15', 'Z80_AF2=16', 'Z80_BC2=17', 'Z80_DE2=18', 'Z80_HL2=19', 'Z80_R=20', 'Z80_I=21', 'Z80_IM=22', 'Z80_IFF1=23', 'Z80_IFF2=24', 'BASE_RAM=16384', 'SPECTRUM_BANK=16384', 'FRZ_OFFSET=0', 'FRZ_HDR=42'], sourceParameters: 'const uint8_t *snapdata, uint32_t snapsize', sourceBody: 'int i, j;
	uint8_t intr;
	uint16_t addr, data;
	address_space &space = m_maincpu->space(AS_PROGRAM);

	if (m_port_7ffd_data == -1)
	{
		logerror("Can\'t load 128K .FRZ file into 48K machine\\n");
		return;
	}

	data = (snapdata[FRZ_OFFSET + 16] << 8) | snapdata[FRZ_OFFSET + 17];
	m_maincpu->set_state_int(Z80_AF, data);

	data = (snapdata[FRZ_OFFSET + 12] << 8) | snapdata[FRZ_OFFSET + 13];
	m_maincpu->set_state_int(Z80_BC, data);

	data = (snapdata[FRZ_OFFSET +  8] << 8) | snapdata[FRZ_OFFSET +  9];
	m_maincpu->set_state_int(Z80_DE, data);

	data = (snapdata[FRZ_OFFSET +  4] << 8) | snapdata[FRZ_OFFSET +  5];
	m_maincpu->set_state_int(Z80_HL, data);


	data = (snapdata[FRZ_OFFSET + 14] << 8) | snapdata[FRZ_OFFSET + 15];
	m_maincpu->set_state_int(Z80_AF2, data);

	data = (snapdata[FRZ_OFFSET + 10] << 8) | snapdata[FRZ_OFFSET + 11];
	m_maincpu->set_state_int(Z80_BC2, data);

	data = (snapdata[FRZ_OFFSET +  6] << 8) | snapdata[FRZ_OFFSET +  7];
	m_maincpu->set_state_int(Z80_DE2, data);

	data = (snapdata[FRZ_OFFSET +  2] << 8) | snapdata[FRZ_OFFSET +  3];
	m_maincpu->set_state_int(Z80_HL2, data);


	data = (snapdata[FRZ_OFFSET + 40] << 8) | snapdata[FRZ_OFFSET + 41];
	m_maincpu->set_state_int(Z80_IX, data);

	data = (snapdata[FRZ_OFFSET + 38] << 8) | snapdata[FRZ_OFFSET + 39];
	m_maincpu->set_state_int(Z80_IY, data);


	data = snapdata[FRZ_OFFSET + 25];
	m_maincpu->set_state_int(Z80_R, data);

	data = snapdata[FRZ_OFFSET + 30];
	m_maincpu->set_state_int(Z80_I, data);


	data = (snapdata[FRZ_OFFSET + 28] << 8) | snapdata[FRZ_OFFSET + 29];
	m_maincpu->set_state_int(Z80_SP, data);

	data = (snapdata[FRZ_OFFSET + 26] << 8) | snapdata[FRZ_OFFSET + 27];
	m_maincpu->set_state_int(Z80_PC, data);


	data = snapdata[FRZ_OFFSET + 33];
	m_maincpu->set_state_int(Z80_IM, data);

	data = snapdata[FRZ_OFFSET + 37];
	m_maincpu->set_state_int(Z80_IFF1, BIT(data, 2));
	m_maincpu->set_state_int(Z80_IFF2, BIT(data, 2));

	intr = BIT(data, 2) ? CLEAR_LINE : ASSERT_LINE;
	m_maincpu->set_input_line(INPUT_LINE_IRQ0, intr);
	m_maincpu->set_input_line(INPUT_LINE_HALT, CLEAR_LINE);

	// Memory dump
	addr = 0;
	
	logerror("Loading %05X bytes of RAM at %04X\\n", 8*SPECTRUM_BANK, BASE_RAM);
	for (i = 0; i < 8; i++)
	{
		switch (TABLE(i, 5, 2, 0, 1, 3, 4, 6, 7))
		{
			case 5: addr = SPECTRUM_BANK;
					break;
			case 2: addr = 2*SPECTRUM_BANK;
					break;
			case 0:
			case 1:
			case 3:
			case 4:
			case 6:
			case 7: addr = 3*SPECTRUM_BANK;
					m_port_7ffd_data &= 0xf8;
					m_port_7ffd_data += TABLE(i, 5, 2, 0, 1, 3, 4, 6, 7);
					update_paging();
					break;
		}
		logerror("Loading bank %d from offset:%05X\\n", TABLE(i, 5, 2, 0, 1, 3, 4, 6, 7), FRZ_HDR + i*SPECTRUM_BANK);
		for (j = 0; j < SPECTRUM_BANK; j++)
			space.write_byte(j + addr, snapdata[j + FRZ_HDR + i*SPECTRUM_BANK]);
	}
	m_port_7ffd_data = snapdata[FRZ_OFFSET +  1];
	logerror("Port 7FFD:%02X\\n", m_port_7ffd_data);
	logerror("Paging bank:%d\\n", m_port_7ffd_data & 0x07);
	update_paging();

	// Set border color
	data = (space.read_byte(0x5c48) >> 3) & 0x07; // Get the current border color from BORDCR system variable.
	m_port_fe_data = (m_port_fe_data & 0xf8) | data;
	border_update(data);
	logerror("Border color:%02X\\n", data);

	//logerror("Snapshot loaded.\\nExecution resuming at bank:%d %s\\n", m_port_7ffd_data & 0x07, m_maincpu->state_string(Z80_PC).c_str());'};
MERGE (n:KG {id: 'handler:spectrum_state.setup_spg'}) SET n:Handler SET n += {method: 'setup_spg', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec_snqk.cpp', sourceLine: 2416, sourceColumn: 1, sourceEndLine: 2491, sourceConstants: ['Z80_PC=-1', 'Z80_SP=1', 'Z80_IY=15', 'Z80_HL2=19', 'Z80_I=21', 'Z80_IM=22', 'Z80_IFF1=23', 'SPG_OFFSET=0'], sourceParameters: 'const u8 *snapdata, u32 snapsize', sourceBody: 'u16 data;
	address_space &space = m_maincpu->space(AS_PROGRAM);
	hrust_decoder hrust;

	data = snapdata[SPG_OFFSET + 0x2c];
	if (BIT(data, 4, 4) != 1 || BIT(data, 0, 4) != 0) // just v1.0 for now
	{
		logerror("Can\'t load .SPG file v%d.%d\\n", BIT(data, 4, 4), BIT(data, 0, 4));
		return;
	}

	m_maincpu->set_state_int(Z80_IY, 0x5c3a);
	m_maincpu->set_state_int(Z80_HL2, 0x2758);
	m_maincpu->set_state_int(Z80_I, 0x3f);
	m_maincpu->set_state_int(Z80_IM, 1);
	m_port_7ffd_data = 16;

	data = (snapdata[SPG_OFFSET + 0x31] << 8) | snapdata[SPG_OFFSET + 0x30];
	if (data < 0x4000)
	{
		logerror("PC(%04x) < 0x4000 is not allowed\\n", data);
	}
	m_maincpu->set_state_int(Z80_PC, data);

	data = (snapdata[SPG_OFFSET + 0x33] << 8) | snapdata[SPG_OFFSET + 0x32];
	m_maincpu->set_state_int(Z80_SP, data);

	const u8 page3 = snapdata[SPG_OFFSET + 0x34];

	data = snapdata[SPG_OFFSET + 0x35];
	m_maincpu->set_state_int(Z80_IFF1, BIT(data, 2));

	offs_t data_offset = SPG_DATA;
	for (auto b = 0; b < 0x100; b++)
	{
		data = snapdata[SPG_BLOCK_INFO(b) + 0];
		const u16 offs = BIT(data, 0, 5) * 512;
		const bool is_last = BIT(data, 7);

		data = snapdata[SPG_BLOCK_INFO(b) + 1];
		const u16 size = (BIT(data, 0, 5) + 1) * 512;
		const u8 compression = BIT(data, 6, 2);

		data = snapdata[SPG_BLOCK_INFO(b) + 2];
		bank3_set_page(data);

		switch (compression)
		{
			case 0x00:
				for (auto i = 0; i < size; i++)
					space.write_byte(0xc000 + offs + i, snapdata[data_offset + i]);
				break;

			case 0x01:
				logerror("Unsupported MegaLZ compressed");
				return;
				break;

			case 0x02:
				hrust.decode(space, &snapdata[data_offset], 0xc000 + offs, size);
				break;

			default:
				logerror("Unsupported compression: %d\\n", compression);
				return;
		}

		data_offset += size;
		if (is_last)
			break;
	}

	bank3_set_page(page3);'};
MERGE (n:KG {id: 'handler:hrust_decoder.decode'}) SET n:Handler SET n += {method: 'decode', ownerClass: 'hrust_decoder', sourceFile: 'src/mame/sinclair/hrust.cpp', sourceLine: 59, sourceColumn: 1, sourceEndLine: 222, sourceParameters: 'address_space &space, const u8 *source, u16 dest, u16 size', sourceBody: 'constexpr u8 mask[] = { 0, 0, 0xfc, 0xf8, 0xf0, 0xe0, 0xc0, 0x80, 0 };
	u8 no_bits = 2;
	bb_stream bitbuf(source, size);

	space.write_byte(dest++, bitbuf.get_byte());

	while (!bitbuf.overflow())
	{
		while (bitbuf.get_bit())
		{
			space.write_byte(dest++, bitbuf.get_byte());
		}

		u16 len = 0;
		u8 bb;
		do
		{
			bb = bitbuf.get_bits(2);
			len += bb;

		} while (bb == 0x03 && len != 0x0f);

		s16 offset = 0;
		if (len == 0)
		{
			offset = 0xfff8 + bitbuf.get_bits(3);
			space.write_byte(dest, space.read_byte(dest + offset));
			++dest;
			continue;
		}
		else if (len == 1)
		{
			const u8 code = bitbuf.get_bits(2);
			if (code == 0 || code == 1)
			{
				offset = bitbuf.get_byte();
				offset += (code ? 0xfe : 0xfd) << 8;
			}
			else if (code == 2)
			{
				u8 b = bitbuf.get_byte();
				if (b >= 0xe0)
				{
					b <<= 1;
					++b;    // rlca
					b ^= 2; // xor c

					if (b == 0xff)
					{
						++no_bits;
						continue;
					}

					offset = 0xff00 + b - 0x0f;
					space.write_byte(dest, space.read_byte(dest + offset));
					++dest;
					space.write_byte(dest++, bitbuf.get_byte());
					space.write_byte(dest, space.read_byte(dest + offset));
					++dest;
					continue;
				}
				offset = 0xff00 + b;
			}
			else if (code == 3)
			{
				offset = 0xffe0 + bitbuf.get_bits(5);
			}

			for (auto i = 0; i < 2; ++i)
			{
				space.write_byte(dest, space.read_byte(dest + offset));
				++dest;
			}
			continue;
		}
		else if (len == 3)
		{
			if (bitbuf.get_bit())
			{
				offset = 0xfff0 + bitbuf.get_bits(4);
				space.write_byte(dest, space.read_byte(dest + offset));
				++dest;
				space.write_byte(dest++, bitbuf.get_byte());
				space.write_byte(dest, space.read_byte(dest + offset));
				++dest;
				continue;
			}

			if (bitbuf.get_bit())
			{
				u8 bytes_no = 6 + bitbuf.get_bits(4);
				for (u8 i = 0; i < (bytes_no << 1); ++i)
					space.write_byte(dest++, bitbuf.get_byte());
				continue;
			}

			len = bitbuf.get_bits(7);
			if (len == 0x0f)
			{
				break; // EOF
			}
			if (len < 0x0f)
			{
				len = (len << 8) + bitbuf.get_byte();
			}
		}

		if (len == 2)
		{
			++len;
		}


		const u8 code = bitbuf.get_bits(2);
		if (code == 0)
		{
			offset = 0xfe00 + bitbuf.get_byte();
		}
		else if (code == 1)
		{
			u8 b = bitbuf.get_byte();

			if (b >= 0xe0)
			{
				if (len > 3)
				{
					// logerror
					break;
				}

				b <<= 1;
				++b;    // rlca
				b ^= 3; // xor c

				offset = 0xff00 + b - 0x0f;

				space.write_byte(dest, space.read_byte(dest + offset));
				++dest;
				space.write_byte(dest++, bitbuf.get_byte());
				space.write_byte(dest, space.read_byte(dest + offset));
				++dest;
				continue;
			}
			offset = 0xff00 + b;
		}
		else if (code == 2)
		{
			offset = 0xffe0 + bitbuf.get_bits(5);
		}
		else if (code == 3)
		{
			offset = (mask[no_bits] + bitbuf.get_bits(no_bits)) << 8;
			offset += bitbuf.get_byte();
		}

		for (u16 i = 0; i < len; ++i)
		{
			space.write_byte(dest, space.read_byte(dest + offset));
			++dest;
		}
	}'};
MERGE (n:KG {id: 'handler:spectrum_state.bank3_set_page'}) SET n:Handler SET n += {method: 'bank3_set_page', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 240, sourceColumn: 1, sourceEndLine: 98, sourceParameters: 'u8 page', sourceBody: 'm_port_7ffd_data &= 0xf8;
	m_port_7ffd_data |= page & 0x07;
	spectrum_128_update_memory();', dispatchedFrom: 'spectrum_128_state'};
MERGE (n:KG {id: 'handler:spectrum_state.setup_z80'}) SET n:Handler SET n += {method: 'setup_z80', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec_snqk.cpp', sourceLine: 2151, sourceColumn: 1, sourceEndLine: 2407, sourceConstants: ['Z80_PC=-1', 'Z80_SP=1', 'Z80_AF=10', 'Z80_BC=11', 'Z80_DE=12', 'Z80_HL=13', 'Z80_IX=14', 'Z80_IY=15', 'Z80_AF2=16', 'Z80_BC2=17', 'Z80_DE2=18', 'Z80_HL2=19', 'Z80_R=20', 'Z80_I=21', 'Z80_IM=22', 'Z80_IFF1=23', 'Z80_IFF2=24', 'SPECTRUM_Z80_SNAPSHOT_INVALID=0', 'SPECTRUM_Z80_SNAPSHOT_48K_OLD=1', 'SPECTRUM_Z80_SNAPSHOT_48K=2', 'SPECTRUM_Z80_SNAPSHOT_SAMRAM=3', 'SPECTRUM_Z80_SNAPSHOT_128K=4', 'SPECTRUM_Z80_SNAPSHOT_TS2068=5'], sourceParameters: 'const uint8_t *snapdata, uint32_t snapsize', sourceBody: 'int i;
	uint8_t lo, hi, data;
	SPECTRUM_Z80_SNAPSHOT_TYPE z80_type;
	address_space &space = m_maincpu->space(AS_PROGRAM);

	z80_type = spectrum_identify_z80(snapdata, snapsize);

	switch (z80_type)
	{
		case SPECTRUM_Z80_SNAPSHOT_INVALID:
				logerror("Invalid .Z80 file\\n");
				return;
		case SPECTRUM_Z80_SNAPSHOT_48K_OLD:
		case SPECTRUM_Z80_SNAPSHOT_48K:
				logerror("48K .Z80 file\\n");
				if (!strcmp(machine().system().name,"ts2068"))
					logerror("48K .Z80 file in TS2068\\n");
				break;
		case SPECTRUM_Z80_SNAPSHOT_128K:
				logerror("128K .Z80 file\\n");
				if (m_port_7ffd_data == -1)
				{
					logerror("Not a 48K .Z80 file\\n");
					return;
				}
				if (!strcmp(machine().system().name,"ts2068"))
				{
					logerror("Not a TS2068 .Z80 file\\n");
					return;
				}
				break;
		case SPECTRUM_Z80_SNAPSHOT_TS2068:
				logerror("TS2068 .Z80 file\\n");
				if (strcmp(machine().system().name,"ts2068"))
					logerror("Not a TS2068 machine\\n");
				break;
		case SPECTRUM_Z80_SNAPSHOT_SAMRAM:
				logerror("Hardware not supported - .Z80 file\\n");
				return;
	}

	// AF
	hi = snapdata[0] & 0x0ff;
	lo = snapdata[1] & 0x0ff;
	m_maincpu->set_state_int(Z80_AF, (hi << 8) | lo);
	// BC
	lo = snapdata[2] & 0x0ff;
	hi = snapdata[3] & 0x0ff;
	m_maincpu->set_state_int(Z80_BC, (hi << 8) | lo);
	// HL
	lo = snapdata[4] & 0x0ff;
	hi = snapdata[5] & 0x0ff;
	m_maincpu->set_state_int(Z80_HL, (hi << 8) | lo);

	// SP
	lo = snapdata[8] & 0x0ff;
	hi = snapdata[9] & 0x0ff;
	m_maincpu->set_state_int(Z80_SP, (hi << 8) | lo);

	// I
	m_maincpu->set_state_int(Z80_I, (snapdata[10] & 0x0ff));

	// R
	data = (snapdata[11] & 0x07f) | ((snapdata[12] & 0x01) << 7);
	m_maincpu->set_state_int(Z80_R, data);

	// Set border color
	m_port_fe_data = (m_port_fe_data & 0xf8) | ((snapdata[12] & 0x0e) >> 1);
	border_update((snapdata[12] & 0x0e) >> 1);

	lo = snapdata[13] & 0x0ff;
	hi = snapdata[14] & 0x0ff;
	m_maincpu->set_state_int(Z80_DE, (hi << 8) | lo);

	lo = snapdata[15] & 0x0ff;
	hi = snapdata[16] & 0x0ff;
	m_maincpu->set_state_int(Z80_BC2, (hi << 8) | lo);

	lo = snapdata[17] & 0x0ff;
	hi = snapdata[18] & 0x0ff;
	m_maincpu->set_state_int(Z80_DE2, (hi << 8) | lo);

	lo = snapdata[19] & 0x0ff;
	hi = snapdata[20] & 0x0ff;
	m_maincpu->set_state_int(Z80_HL2, (hi << 8) | lo);

	hi = snapdata[21] & 0x0ff;
	lo = snapdata[22] & 0x0ff;
	m_maincpu->set_state_int(Z80_AF2, (hi << 8) | lo);

	lo = snapdata[23] & 0x0ff;
	hi = snapdata[24] & 0x0ff;
	m_maincpu->set_state_int(Z80_IY, (hi << 8) | lo);

	lo = snapdata[25] & 0x0ff;
	hi = snapdata[26] & 0x0ff;
	m_maincpu->set_state_int(Z80_IX, (hi << 8) | lo);

	// Interrupt Flip/Flop
	if (snapdata[27] == 0)
	{
		m_maincpu->set_state_int(Z80_IFF1, (uint64_t)0);
		// m_maincpu->set_state_int(Z80_IRQ_STATE, 0);
	}
	else
	{
		m_maincpu->set_state_int(Z80_IFF1, 1);
		// m_maincpu->set_state_int(Z80_IRQ_STATE, 1);
	}

	m_maincpu->set_input_line(INPUT_LINE_IRQ0, CLEAR_LINE);
//  m_maincpu->set_input_line(INPUT_LINE_NMI, data);
	m_maincpu->set_input_line(INPUT_LINE_HALT, CLEAR_LINE);

	// IFF2
	if (snapdata[28] != 0)
	{
		data = 1;
	}
	else
	{
		data = 0;
	}
	m_maincpu->set_state_int(Z80_IFF2, data);

	// Interrupt Mode
	m_maincpu->set_state_int(Z80_IM, (snapdata[29] & 0x03));

	if (z80_type == SPECTRUM_Z80_SNAPSHOT_48K_OLD)
	{
		lo = snapdata[6] & 0x0ff;
		hi = snapdata[7] & 0x0ff;
		m_maincpu->set_state_int(Z80_PC, (hi << 8) | lo);

		page_basicrom();

		if ((snapdata[12] & 0x020) == 0)
		{
			logerror("Not compressed\\n");   // not compressed
			for (i = 0; i < 49152; i++)
				space.write_byte(i + 16384, snapdata[30 + i]);
		}
		else
		{
			logerror("Compressed\\n");   // compressed
			z80_decompress_block(space, snapdata + 30, 16384, 49152);
		}
	}
	else
	{
		int header_size;

		header_size = 30 + 2 + ((snapdata[30] & 0x0ff) | ((snapdata[31] & 0x0ff) << 8));

		lo = snapdata[32] & 0x0ff;
		hi = snapdata[33] & 0x0ff;
		m_maincpu->set_state_int(Z80_PC, (hi << 8) | lo);

		if ((z80_type == SPECTRUM_Z80_SNAPSHOT_128K) || ((z80_type == SPECTRUM_Z80_SNAPSHOT_TS2068) && !strcmp(machine().system().name,"ts2068")))
		{
			ay_slot_device *ay = subdevice<ay_slot_device>("ay_slot");

			// Only set up sound registers for 128K machine or TS2068!
			for (i = 0; i < 16; i++)
			{
				ay->address_w(i);
				ay->data_w(snapdata[39 + i]);
			}
			ay->address_w(snapdata[38]);
		}

		if (z80_type == SPECTRUM_Z80_SNAPSHOT_48K)
			// Ensure 48K Basic ROM is used
			page_basicrom();

		const uint8_t *p_source = snapdata + header_size;
		do
		{
			unsigned short length;
			uint8_t page;
			int dest = 0;

			length = (p_source[0] & 0x0ff) | ((p_source[1] & 0x0ff) << 8);
			page = p_source[2];

			if (z80_type == SPECTRUM_Z80_SNAPSHOT_48K || z80_type == SPECTRUM_Z80_SNAPSHOT_TS2068)
			{
				switch (page)
				{
					case 4: dest = 0x08000; break;
					case 5: dest = 0x0c000; break;
					case 8: dest = 0x04000; break;
					default: dest = 0; break;
				}
			}
			else
			{
				// 3 = bank 0, 4 = bank 1 ... 10 = bank 7
				if ((page >= 3) && (page <= 10))
				{
					// Page the appropriate bank into 0xc000 - 0xfff
					m_port_7ffd_data = page - 3;
					update_paging();
					dest = 0x0c000;
				}
				else
					// Other values correspond to ROM pages
					dest = 0x0;
			}

			if (dest != 0)
			{
				if (length == 0x0ffff)
				{
					// block is uncompressed
					logerror("Not compressed\\n");

					// not compressed
					for (i = 0; i < 16384; i++)
						space.write_byte(i + dest, p_source[i]);
				}
				else
				{
					logerror("Compressed\\n");

					// block is compressed
					z80_decompress_block(space, &p_source[3], dest, 16384);
				}
			}

			// go to next block
			p_source += (3 + length);
		}
		while ((p_source - snapdata) < snapsize);

		if ((m_port_7ffd_data != -1) && (z80_type != SPECTRUM_Z80_SNAPSHOT_48K))
		{
			// Set up paging
			m_port_7ffd_data = (snapdata[35] & 0x0ff);
			update_paging();
		}
		if ((z80_type == SPECTRUM_Z80_SNAPSHOT_48K) && !strcmp(machine().system().name,"ts2068"))
		{
			m_port_f4_data = 0x03;
			m_port_ff_data = 0x00;
			ts2068_update_memory();
		}
		if (z80_type == SPECTRUM_Z80_SNAPSHOT_TS2068 && !strcmp(machine().system().name,"ts2068"))
		{
			m_port_f4_data = snapdata[35];
			m_port_ff_data = snapdata[36];
			ts2068_update_memory();
		}
	}'};
MERGE (n:KG {id: 'handler:.spectrum_identify_z80'}) SET n:Handler SET n += {method: 'spectrum_identify_z80', ownerClass: '', sourceFile: 'src/mame/sinclair/spec_snqk.cpp', sourceLine: 2103, sourceColumn: 1, sourceEndLine: 2148, sourceConstants: ['SPECTRUM_Z80_SNAPSHOT_INVALID=0', 'SPECTRUM_Z80_SNAPSHOT_48K_OLD=1', 'SPECTRUM_Z80_SNAPSHOT_48K=2', 'SPECTRUM_Z80_SNAPSHOT_SAMRAM=3', 'SPECTRUM_Z80_SNAPSHOT_128K=4', 'SPECTRUM_Z80_SNAPSHOT_TS2068=5'], sourceParameters: 'const uint8_t *snapdata, uint32_t snapsize', sourceBody: 'uint8_t lo, hi, data;

	if (snapsize < 30)
		return SPECTRUM_Z80_SNAPSHOT_INVALID;   /* Invalid file */

	lo = snapdata[6] & 0x0ff;
	hi = snapdata[7] & 0x0ff;
	if (hi || lo)
		return SPECTRUM_Z80_SNAPSHOT_48K_OLD;   /* V1.45 - 48K only */

	lo = snapdata[30] & 0x0ff;
	hi = snapdata[31] & 0x0ff;
	data = snapdata[34] & 0x0ff;            /* Hardware mode */

	if ((hi == 0) && (lo == 23))
	{                       /* V2.01 */                         /* V2.01 format */
		switch (data)
		{
			case 0:
			case 1: return SPECTRUM_Z80_SNAPSHOT_48K;
			case 2: return SPECTRUM_Z80_SNAPSHOT_SAMRAM;
			case 3:
			case 4: return SPECTRUM_Z80_SNAPSHOT_128K;
			case 128: return SPECTRUM_Z80_SNAPSHOT_TS2068;
		}
	}

	if ((hi == 0) && (lo == 54))
	{                       /* V3.0x */                         /* V2.01 format */
		switch (data)
		{
			case 0:
			case 1:
			case 3: return SPECTRUM_Z80_SNAPSHOT_48K;
			case 2: return SPECTRUM_Z80_SNAPSHOT_SAMRAM;
			case 4:
			case 5:
			case 6: return SPECTRUM_Z80_SNAPSHOT_128K;
			case 128: return SPECTRUM_Z80_SNAPSHOT_TS2068;
		}
	}

	return SPECTRUM_Z80_SNAPSHOT_INVALID;'};
MERGE (n:KG {id: 'handler:spectrum_state.z80_decompress_block'}) SET n:Handler SET n += {method: 'z80_decompress_block', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec_snqk.cpp', sourceLine: 2043, sourceColumn: 1, sourceEndLine: 2101, sourceParameters: 'address_space &space, const uint8_t *source, uint16_t dest, uint16_t size', sourceBody: 'uint8_t ch;
	int i;

	do
	{
		/* get byte */
		ch = source[0];

		/* either start 0f 0x0ed, 0x0ed, xx yy or single 0x0ed */
		if (ch == 0x0ed)
		{
			if (source[1] == 0x0ed)
			{
				/* 0x0ed, 0x0ed, xx yy - repetition */
				uint8_t count;
				uint8_t data;

				count = source[2];

				if (count == 0)
					return;

				data = source[3];

				source += 4;

				if (count > size)
					count = size;

				size -= count;

				for (i = 0; i < count; i++)
				{
					space.write_byte(dest, data);
					dest++;
				}
			}
			else
			{
				/* single 0x0ed */
				space.write_byte(dest, ch);
				dest++;
				source++;
				size--;
			}
		}
		else
		{
			/* not 0x0ed */
			space.write_byte(dest, ch);
			dest++;
			source++;
			size--;
		}
	}
	while (size > 0);'};
MERGE (n:KG {id: 'handler:spectrum_state.ts2068_update_memory'}) SET n:Handler SET n += {method: 'ts2068_update_memory', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spectrum.h', sourceLine: 101, sourceColumn: 1, sourceEndLine: 101, sourceParameters: '', sourceBody: ''};
MERGE (n:KG {id: 'device:spectrum_state.spectrum_common/quickload'}) SET n:Device SET n += {type: 'QUICKLOAD', tag: 'quickload', clock: null, config: ['QUICKLOAD(config, "quickload", "raw,scr", attotime::from_seconds(2)).set_load_callback(FUNC(spectrum_state::quickload_cb))'], sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 788, sourceColumn: 2, sourceEndLine: 788, configCalls: ['set_extensions("raw,scr")', 'set_delay(2)']};
MERGE (n:KG {id: 'device:spectrum_state.spectrum_common/quickload/callback:quickload:0'}) SET n:Callback SET n += {signal: 'set_load_callback', delegate: 1, operation: 'set_load_callback', raw: 'QUICKLOAD(config, "quickload", "raw,scr", attotime::from_seconds(2)).set_load_callback(FUNC(spectrum_state::quickload_cb))', ownerTag: 'quickload', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 788, sourceColumn: 2, sourceEndLine: 788, targetClass: 'spectrum_state', targetMethod: 'quickload_cb'};
MERGE (n:KG {id: 'handler:spectrum_state.quickload_cb'}) SET n:Handler SET n += {method: 'quickload_cb', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec_snqk.cpp', sourceLine: 2493, sourceColumn: 1, sourceEndLine: 2516, sourceConstants: ['SCR_BITMAP=6144', 'SCR_SIZE=6912', 'RAW_SIZE=49161', 'image_error::INVALIDLENGTH=4', 'image_error::INVALIDLENGTH=4'], sourceParameters: 'snapshot_image_device &image', sourceBody: 'size_t quickload_size = image.length();
	std::vector<uint8_t> quickload_data(quickload_size);

	image.fread(&quickload_data[0], quickload_size);

	if (image.is_filetype("scr"))
	{
		if ((quickload_size != SCR_SIZE) && (quickload_size != SCR_BITMAP))
			return std::make_pair(image_error::INVALIDLENGTH, "Invalid .SCR file size.");

		setup_scr(&quickload_data[0], quickload_size);
	}
	else if (image.is_filetype("raw"))
	{
		if (quickload_size != RAW_SIZE)
			return std::make_pair(image_error::INVALIDLENGTH, "Invalid .RAW file size.");

		setup_raw(&quickload_data[0], quickload_size);
	}

	return std::make_pair(std::error_condition(), std::string());'};
MERGE (n:KG {id: 'handler:spectrum_state.setup_scr'}) SET n:Handler SET n += {method: 'setup_scr', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec_snqk.cpp', sourceLine: 2547, sourceColumn: 1, sourceEndLine: 2555, sourceConstants: ['BASE_RAM=16384', 'SCR_SIZE=6912'], sourceParameters: 'const uint8_t *quickdata, uint32_t quicksize', sourceBody: 'address_space &space = m_maincpu->space(AS_PROGRAM);

	for (int i = 0; i < quicksize; i++)
		space.write_byte(i + BASE_RAM, quickdata[i]);

	log_quickload(quicksize == SCR_SIZE ? "SCREEN$" : "SCREEN$ (Mono)", BASE_RAM, quicksize, 0, "N/A");'};
MERGE (n:KG {id: 'handler:spectrum_state.log_quickload'}) SET n:Handler SET n += {method: 'log_quickload', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec_snqk.cpp', sourceLine: 52, sourceColumn: 1, sourceEndLine: 73, sourceParameters: 'const char *type, uint32_t start, uint32_t length, uint32_t exec, const char *exec_format', sourceBody: 'std::ostringstream tempstring;

	logerror("Loading %04X bytes of RAM at %04X\\n", length, start);

	util::stream_format(tempstring, "Quickload type: %s   Length: %d bytes\\n", type, length);
	util::stream_format(tempstring, "Start: 0x%04X   End: 0x%04X   Exec: ", start, start + length - 1);

	logerror("Quickload loaded.\\n");
	if (!core_stricmp(exec_format, "N/A"))
		tempstring << "N/A";
	else
	{
		logerror("Execution can resume with ");
		logerror(exec_format, exec);
		logerror("\\n");
		util::stream_format(tempstring, exec_format, exec);
	}

	machine().ui().popup_time(10, "%s", tempstring.str());'};
MERGE (n:KG {id: 'handler:spectrum_state.setup_raw'}) SET n:Handler SET n += {method: 'setup_raw', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spec_snqk.cpp', sourceLine: 2583, sourceColumn: 1, sourceEndLine: 2600, sourceConstants: ['RAW_OFFSET=0', 'RAW_HDR=9'], sourceParameters: 'const uint8_t *quickdata, uint32_t quicksize', sourceBody: 'address_space &space = m_maincpu->space(AS_PROGRAM);

	uint16_t const start = (quickdata[RAW_OFFSET + 4] << 8) | quickdata[RAW_OFFSET + 3];
	uint16_t const len   = (quickdata[RAW_OFFSET + 2] << 8) | quickdata[RAW_OFFSET + 1];

	for (int i = 0; i < len; i++)
		space.write_byte(i + start, quickdata[i + RAW_HDR]);

	// Set border color
	uint8_t const data = (space.read_byte(0x5c48) >> 3) & 0x07; // Get the current border color from BORDCR system variable.
	m_port_fe_data = (m_port_fe_data & 0xf8) | data;
	border_update(data);
	logerror("Border color:%02X\\n", data);

	log_quickload("BYTES", start, len, 0, "N/A");'};
MERGE (n:KG {id: 'device:spectrum_state.spectrum_common/cassette'}) SET n:Device SET n += {type: 'CASSETTE', tag: 'cassette', clock: null, config: ['CASSETTE(config, m_cassette)', 'm_cassette->set_formats(tzx_cassette_formats)', 'm_cassette->set_default_state(CASSETTE_STOPPED | CASSETTE_SPEAKER_ENABLED | CASSETTE_MOTOR_ENABLED)', 'm_cassette->add_route(ALL_OUTPUTS, "speakers", 0.05)', 'm_cassette->set_interface("spectrum_cass")'], member: 'm_cassette', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 790, sourceColumn: 2, sourceEndLine: 790, configCalls: ['set_formats("tzx_cassette_formats")', 'set_default_state(0)', 'set_interface("spectrum_cass")']};
MERGE (n:KG {id: 'audioroute:device:spectrum_state.spectrum_common/cassette/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speakers', gain: 0.05, raw: 'm_cassette->add_route(ALL_OUTPUTS, "speakers", 0.05)', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 793, sourceColumn: 2, sourceEndLine: 793};
MERGE (n:KG {id: 'machine:spectrum_state.spectrum'}) SET n:MachineConfig SET n += {cls: 'spectrum_state', name: 'spectrum', calls: ['spectrum_common'], armedTimers: ['m_irq_on_timer=spectrum_state.irq_on@spectrum_state.video_start', 'm_irq_off_timer=spectrum_state.irq_off@spectrum_state.video_start', 'm_finish_screen_update_timer=spectrum_state.finish_screen_update@spectrum_state.video_start'], preciseTimers: ['m_irq_on_timer', 'm_irq_off_timer', 'm_finish_screen_update_timer'], stateMembers: ['{"name":"m_port_fe_data","bits":32,"signed":true}', '{"name":"m_port_7ffd_data","bits":32,"signed":true}', '{"name":"m_port_1ffd_data","bits":32,"signed":true}', '{"name":"m_port_ff_data","bits":32,"signed":true}', '{"name":"m_port_f4_data","bits":32,"signed":true}', '{"name":"m_frame_invert_count","bits":32,"signed":true}'], driverTimers: ['m_irq_on_timer=spectrum_state.irq_on', 'm_irq_off_timer=spectrum_state.irq_off', 'm_finish_screen_update_timer=spectrum_state.finish_screen_update'], resetHandlers: ['spectrum_state.machine_reset'], startHandlers: ['spectrum_state.video_start'], sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 799, sourceColumn: 1, sourceEndLine: 809, spaceAccessors: ['m_program=maincpu:program', 'm_io=maincpu:io']};
MERGE (n:KG {id: 'device:spectrum_state.spectrum/ram'}) SET n:Device SET n += {type: 'RAM', tag: 'ram', clock: null, config: ['RAM(config, m_ram).set_default_size("48K").set_extra_options("16K").set_default_value(0xff)', 'm_ram->set_default_size("128K")'], member: 'm_ram', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 804, sourceColumn: 2, sourceEndLine: 804};
MERGE (n:KG {id: 'machine:ay8912_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'ay8912_device', name: 'device_add_mconfig', calls: ['spectrum_ay_device::device_add_mconfig'], sourceFile: 'src/devices/bus/spectrum/ay/cards.cpp', sourceLine: 22, sourceColumn: 1, sourceEndLine: 26};
MERGE (n:KG {id: 'device:ay8912_device.device_add_mconfig/ay0'}) SET n:Device SET n += {type: 'AY8912', tag: 'ay0', clock: 1773450, config: ['AY8912(config, m_ay0, clock())'], sourceFile: 'src/devices/bus/spectrum/ay/cards.cpp', sourceLine: 24, sourceColumn: 2, sourceEndLine: 24};
MERGE (n:KG {id: 'handler:spectrum_ula_contended_device.device_start'}) SET n:Handler SET n += {method: 'device_start', ownerClass: 'spectrum_ula_contended_device', sourceFile: 'src/mame/sinclair/spectrum_ula.cpp', sourceLine: 159, sourceColumn: 1, sourceEndLine: 169, sourceParameters: '', sourceBody: 'spectrum_ula_device::device_start();

	save_item(NAME(m_is_timings_late));
	save_item(NAME(m_int_at));
	save_item(NAME(m_is_m1_rd_contended));

	m_video_line_clocks = m_screen->width() * m_maincpu->clock() / m_screen->clock();
	m_raster_line_clocks = m_screen_area.width() * m_maincpu->clock() / m_screen->clock();'};
MERGE (n:KG {id: 'handler:spectrum_ula_device.device_start'}) SET n:Handler SET n += {method: 'device_start', ownerClass: 'spectrum_ula_device', sourceFile: 'src/mame/sinclair/spectrum_ula.cpp', sourceLine: 25, sourceColumn: 1, sourceEndLine: 28, sourceParameters: '', sourceBody: 'save_item(NAME(m_bank3_page));'};
MERGE (n:KG {id: 'inputs:spec128'}) SET n:InputPorts SET n += {name: 'spec128', sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 312, sourceColumn: 1, sourceEndLine: 312};
MERGE (n:KG {id: 'inputs:spec128/PLUS0'}) SET n:Port SET n += {tag: 'PLUS0', modify: false};
MERGE (n:KG {id: 'inputs:spec128/PLUS0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("EDIT")', 'PORT_CODE(KEYCODE_INSERT)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:spec128/PLUS0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("CAPS LOCK")', 'PORT_CODE(KEYCODE_CAPSLOCK)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:spec128/PLUS0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("TRUE VID")', 'PORT_CODE(KEYCODE_HOME)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:spec128/PLUS0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("INV VID")', 'PORT_CODE(KEYCODE_END)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:spec128/PLUS0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("Cursor Left")', 'PORT_CODE(KEYCODE_LEFT)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:spec128/PLUS0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 224, activeLow: true, type: 'IPT_UNUSED', defaultValue: 224};
MERGE (n:KG {id: 'inputs:spec128/PLUS1'}) SET n:Port SET n += {tag: 'PLUS1', modify: false};
MERGE (n:KG {id: 'inputs:spec128/PLUS1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("DEL")', 'PORT_CODE(KEYCODE_BACKSPACE)', 'PORT_CHAR(8)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:spec128/PLUS1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("GRAPH")', 'PORT_CODE(KEYCODE_LALT)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:spec128/PLUS1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("Cursor Right")', 'PORT_CODE(KEYCODE_RIGHT)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:spec128/PLUS1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("Cursor Up")', 'PORT_CODE(KEYCODE_UP)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:spec128/PLUS1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("Cursor Down")', 'PORT_CODE(KEYCODE_DOWN)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:spec128/PLUS1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 224, activeLow: true, type: 'IPT_UNUSED', defaultValue: 224};
MERGE (n:KG {id: 'inputs:spec128/PLUS2'}) SET n:Port SET n += {tag: 'PLUS2', modify: false};
MERGE (n:KG {id: 'inputs:spec128/PLUS2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("BREAK")', 'PORT_CODE(KEYCODE_PAUSE)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:spec128/PLUS2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("EXT MODE")', 'PORT_CODE(KEYCODE_LCONTROL)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:spec128/PLUS2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 252, activeLow: true, type: 'IPT_UNUSED', defaultValue: 252};
MERGE (n:KG {id: 'inputs:spec128/PLUS3'}) SET n:Port SET n += {tag: 'PLUS3', modify: false};
MERGE (n:KG {id: 'inputs:spec128/PLUS3/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("\\"")', 'PORT_CODE(KEYCODE_QUOTE)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:spec128/PLUS3/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME(";")', 'PORT_CODE(KEYCODE_COLON)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:spec128/PLUS3/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 252, activeLow: true, type: 'IPT_UNUSED', defaultValue: 252};
MERGE (n:KG {id: 'inputs:spec128/PLUS4'}) SET n:Port SET n += {tag: 'PLUS4', modify: false};
MERGE (n:KG {id: 'inputs:spec128/PLUS4/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME(".")', 'PORT_CODE(KEYCODE_STOP)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:spec128/PLUS4/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME(",")', 'PORT_CODE(KEYCODE_COMMA)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:spec128/PLUS4/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 243, activeLow: true, type: 'IPT_UNUSED', defaultValue: 243};
MERGE (n:KG {id: 'inputs:spectrum'}) SET n:InputPorts SET n += {name: 'spectrum', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 598, sourceColumn: 1, sourceEndLine: 598};
MERGE (n:KG {id: 'inputs:spectrum/LINE0'}) SET n:Port SET n += {tag: 'LINE0', modify: false};
MERGE (n:KG {id: 'inputs:spectrum/LINE0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("CAPS SHIFT")', 'PORT_CODE(KEYCODE_LSHIFT)', 'PORT_CHAR(UCHAR_SHIFT_1)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:spectrum/LINE0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("z    Z    :      LN       BEEP   COPY")', 'PORT_CODE(KEYCODE_Z)', 'PORT_CHAR(\'z\')', 'PORT_CHAR(\'Z\')', 'PORT_CHAR(\':\')'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:spectrum/LINE0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME(u8"x    X    £      EXP      INK    CLEAR")', 'PORT_CODE(KEYCODE_X)', 'PORT_CHAR(\'x\')', 'PORT_CHAR(\'X\')', 'PORT_CHAR(U\'£\')'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:spectrum/LINE0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("c    C    ?      LPRINT   PAPER  CONT")', 'PORT_CODE(KEYCODE_C)', 'PORT_CHAR(\'c\')', 'PORT_CHAR(\'C\')', 'PORT_CHAR(\'?\')'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:spectrum/LINE0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("v    V    /      LLIST    FLASH  CLS")', 'PORT_CODE(KEYCODE_V)', 'PORT_CHAR(\'v\')', 'PORT_CHAR(\'V\')', 'PORT_CHAR(\'/\')'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:spectrum/LINE1'}) SET n:Port SET n += {tag: 'LINE1', modify: false};
MERGE (n:KG {id: 'inputs:spectrum/LINE1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("a    A    STOP   READ      ~     NEW")', 'PORT_CODE(KEYCODE_A)', 'PORT_CHAR(\'a\')', 'PORT_CHAR(\'A\')', 'PORT_CHAR(\'~\')'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:spectrum/LINE1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("s    S    NOT    RESTORE   |     SAVE")', 'PORT_CODE(KEYCODE_S)', 'PORT_CHAR(\'s\')', 'PORT_CHAR(\'S\')', 'PORT_CHAR(\'|\')'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:spectrum/LINE1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("d    D    STEP   DATA      \\\\     DIM")', 'PORT_CODE(KEYCODE_D)', 'PORT_CHAR(\'d\')', 'PORT_CHAR(\'D\')', 'PORT_CHAR(\'\\\\\')'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:spectrum/LINE1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("f    F    TO     SGN       {     FOR")', 'PORT_CODE(KEYCODE_F)', 'PORT_CHAR(\'f\')', 'PORT_CHAR(\'F\')', 'PORT_CHAR(\'{\')'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:spectrum/LINE1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("g    G    THEN   ABS       }     GOTO")', 'PORT_CODE(KEYCODE_G)', 'PORT_CHAR(\'g\')', 'PORT_CHAR(\'G\')', 'PORT_CHAR(\'}\')'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:spectrum/LINE2'}) SET n:Port SET n += {tag: 'LINE2', modify: false};
MERGE (n:KG {id: 'inputs:spectrum/LINE2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("q    Q    <=     SIN      ASN      PLOT")', 'PORT_CODE(KEYCODE_Q)', 'PORT_CHAR(\'q\')', 'PORT_CHAR(\'Q\')'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:spectrum/LINE2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("w    W    <>     COS      ACS      DRAW")', 'PORT_CODE(KEYCODE_W)', 'PORT_CHAR(\'w\')', 'PORT_CHAR(\'W\')'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:spectrum/LINE2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("e    E    >=     TAN      ATN      REM")', 'PORT_CODE(KEYCODE_E)', 'PORT_CHAR(\'e\')', 'PORT_CHAR(\'E\')'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:spectrum/LINE2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("r    R    <      INT      VERIFY   RUN")', 'PORT_CODE(KEYCODE_R)', 'PORT_CHAR(\'r\')', 'PORT_CHAR(\'R\')', 'PORT_CHAR(\'<\')'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:spectrum/LINE2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("t    T    >      RND      MERGE    RAND")', 'PORT_CODE(KEYCODE_T)', 'PORT_CHAR(\'t\')', 'PORT_CHAR(\'T\')', 'PORT_CHAR(\'>\')'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:spectrum/LINE3'}) SET n:Port SET n += {tag: 'LINE3', modify: false};
MERGE (n:KG {id: 'inputs:spectrum/LINE3/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("1   EDIT       !    BLUE     DEF FN")', 'PORT_CODE(KEYCODE_1)', 'PORT_CHAR(\'1\')', 'PORT_CHAR(\'!\')'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:spectrum/LINE3/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("2   CAPS LOCK  @    RED      FN")', 'PORT_CODE(KEYCODE_2)', 'PORT_CHAR(\'2\')', 'PORT_CHAR(\'@\')'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:spectrum/LINE3/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("3   TRUE VID   #    MAGENTA  LINE")', 'PORT_CODE(KEYCODE_3)', 'PORT_CHAR(\'3\')', 'PORT_CHAR(\'#\')'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:spectrum/LINE3/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("4   INV VID    $    GREEN    OPEN#")', 'PORT_CODE(KEYCODE_4)', 'PORT_CHAR(\'4\')', 'PORT_CHAR(\'$\')'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:spectrum/LINE3/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("5   Left       %    CYAN     CLOSE#")', 'PORT_CODE(KEYCODE_5)', 'PORT_CHAR(\'5\')', 'PORT_CHAR(UCHAR_MAMEKEY(LEFT))', 'PORT_CHAR(\'%\')'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:spectrum/LINE4'}) SET n:Port SET n += {tag: 'LINE4', modify: false};
MERGE (n:KG {id: 'inputs:spectrum/LINE4/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("0   DEL        _    BLACK    FORMAT")', 'PORT_CODE(KEYCODE_0)', 'PORT_CHAR(\'0\')', 'PORT_CHAR(8)', 'PORT_CHAR(\'_\')'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:spectrum/LINE4/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("9   GRAPH      )             POINT")', 'PORT_CODE(KEYCODE_9)', 'PORT_CHAR(\'9\')', 'PORT_CHAR(\')\')'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:spectrum/LINE4/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("8   Right      (             CAT")', 'PORT_CODE(KEYCODE_8)', 'PORT_CHAR(\'8\')', 'PORT_CHAR(UCHAR_MAMEKEY(RIGHT))', 'PORT_CHAR(\'(\')'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:spectrum/LINE4/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("7   Up         \'    WHITE    ERASE")', 'PORT_CODE(KEYCODE_7)', 'PORT_CHAR(\'7\')', 'PORT_CHAR(UCHAR_MAMEKEY(UP))', 'PORT_CHAR(\'\\\'\')'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:spectrum/LINE4/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("6   Down       &    YELLOW   MOVE")', 'PORT_CODE(KEYCODE_6)', 'PORT_CHAR(\'6\')', 'PORT_CHAR(UCHAR_MAMEKEY(DOWN))', 'PORT_CHAR(\'&\')'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:spectrum/LINE5'}) SET n:Port SET n += {tag: 'LINE5', modify: false};
MERGE (n:KG {id: 'inputs:spectrum/LINE5/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("p    P    \\"      TAB      (c)    PRINT")', 'PORT_CODE(KEYCODE_P)', 'PORT_CHAR(\'p\')', 'PORT_CHAR(\'P\')', 'PORT_CHAR(\'"\')'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:spectrum/LINE5/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("o    O    ;      PEEK     OUT    POKE")', 'PORT_CODE(KEYCODE_O)', 'PORT_CHAR(\'o\')', 'PORT_CHAR(\'O\')', 'PORT_CHAR(\';\')'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:spectrum/LINE5/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("i    I    AT     CODE     IN     INPUT")', 'PORT_CODE(KEYCODE_I)', 'PORT_CHAR(\'i\')', 'PORT_CHAR(\'I\')'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:spectrum/LINE5/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("u    U    OR     CHR$     ]      IF")', 'PORT_CODE(KEYCODE_U)', 'PORT_CHAR(\'u\')', 'PORT_CHAR(\'U\')', 'PORT_CHAR(\']\')'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:spectrum/LINE5/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("y    Y    AND    STR$     [      RETURN")', 'PORT_CODE(KEYCODE_Y)', 'PORT_CHAR(\'y\')', 'PORT_CHAR(\'Y\')', 'PORT_CHAR(\'[\')'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:spectrum/LINE6'}) SET n:Port SET n += {tag: 'LINE6', modify: false};
MERGE (n:KG {id: 'inputs:spectrum/LINE6/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("ENTER")', 'PORT_CODE(KEYCODE_ENTER)', 'PORT_CHAR(13)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:spectrum/LINE6/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("l    L    =      USR      ATTR     LET")', 'PORT_CODE(KEYCODE_L)', 'PORT_CHAR(\'l\')', 'PORT_CHAR(\'L\')', 'PORT_CHAR(\'=\')'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:spectrum/LINE6/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("k    K    +      LEN      SCREEN$  LIST")', 'PORT_CODE(KEYCODE_K)', 'PORT_CHAR(\'k\')', 'PORT_CHAR(\'K\')', 'PORT_CHAR(\'+\')'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:spectrum/LINE6/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("j    J    -      VAL      VAL$     LOAD")', 'PORT_CODE(KEYCODE_J)', 'PORT_CHAR(\'j\')', 'PORT_CHAR(\'J\')', 'PORT_CHAR(\'-\')'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:spectrum/LINE6/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("h    H    ^      SQR      CIRCLE   GOSUB")', 'PORT_CODE(KEYCODE_H)', 'PORT_CHAR(\'h\')', 'PORT_CHAR(\'H\')', 'PORT_CHAR(\'^\')'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:spectrum/LINE7'}) SET n:Port SET n += {tag: 'LINE7', modify: false};
MERGE (n:KG {id: 'inputs:spectrum/LINE7/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("SPACE")', 'PORT_CODE(KEYCODE_SPACE)', 'PORT_CHAR(\' \')'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:spectrum/LINE7/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("SYMBOL SHIFT")', 'PORT_CODE(KEYCODE_RSHIFT)', 'PORT_CHAR(UCHAR_SHIFT_2)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:spectrum/LINE7/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("m    M    .      PI       INVERSE  PAUSE")', 'PORT_CODE(KEYCODE_M)', 'PORT_CHAR(\'m\')', 'PORT_CHAR(\'M\')', 'PORT_CHAR(\'.\')'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:spectrum/LINE7/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("n    N    ,      INKEY$   OVER     NEXT")', 'PORT_CODE(KEYCODE_N)', 'PORT_CHAR(\'n\')', 'PORT_CHAR(\'N\')', 'PORT_CHAR(\',\')'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:spectrum/LINE7/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("b    B    *      BIN      BRIGHT   BORDER")', 'PORT_CODE(KEYCODE_B)', 'PORT_CHAR(\'b\')', 'PORT_CHAR(\'B\')', 'PORT_CHAR(\'*\')'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:spectrum/NMI'}) SET n:Port SET n += {tag: 'NMI', modify: false};
MERGE (n:KG {id: 'inputs:spectrum/NMI/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("NMI")', 'PORT_CODE(KEYCODE_F12)'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:spectrum/CONFIG'}) SET n:Port SET n += {tag: 'CONFIG', modify: false};
MERGE (n:KG {id: 'inputs:spectrum/CONFIG/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Hardware Version', defaultValue: 0, config: true, settings: ['0=Issue 2', '128=Issue 3']};
MERGE (n:KG {id: 'inputs:spectrum/CONFIG/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 1, modifiers: ['PORT_CHANGED_MEMBER("ula", FUNC(spectrum_ula_device::on_contention_changed), 0)'], name: 'Contention', defaultValue: 0, config: true, settings: ['0=Early', '1=Late']};
MERGE (n:KG {id: 'inputs:spectrum/CONFIG/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 126, activeLow: true, type: 'IPT_UNUSED', defaultValue: 126};
MERGE (n:KG {id: 'file:src/devices/bus/spectrum/kempjoy.cpp'}) SET n:SourceFile SET n += {path: 'src/devices/bus/spectrum/kempjoy.cpp'};
MERGE (n:KG {id: 'inputs:kempjoy'}) SET n:InputPorts SET n += {name: 'kempjoy'};
MERGE (n:KG {id: 'inputs:kempjoy/JOY'}) SET n:Port SET n += {tag: 'JOY', modify: false};
MERGE (n:KG {id: 'inputs:kempjoy/JOY/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:kempjoy/JOY/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:kempjoy/JOY/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:kempjoy/JOY/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:kempjoy/JOY/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_BUTTON1', defaultValue: 0};
MERGE (n:KG {id: 'file:src/devices/bus/spectrum/intf2.cpp'}) SET n:SourceFile SET n += {path: 'src/devices/bus/spectrum/intf2.cpp'};
MERGE (n:KG {id: 'inputs:intf2'}) SET n:InputPorts SET n += {name: 'intf2'};
MERGE (n:KG {id: 'inputs:intf2/LINE3'}) SET n:Port SET n += {tag: 'LINE3', modify: false};
MERGE (n:KG {id: 'inputs:intf2/LINE3/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)', 'PORT_CODE(JOYCODE_X_LEFT_SWITCH)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:intf2/LINE3/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)', 'PORT_CODE(JOYCODE_X_RIGHT_SWITCH)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:intf2/LINE3/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)', 'PORT_CODE(JOYCODE_Y_DOWN_SWITCH)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:intf2/LINE3/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)', 'PORT_CODE(JOYCODE_Y_UP_SWITCH)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:intf2/LINE3/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(2)', 'PORT_CODE(JOYCODE_BUTTON1)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:intf2/LINE4'}) SET n:Port SET n += {tag: 'LINE4', modify: false};
MERGE (n:KG {id: 'inputs:intf2/LINE4/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(1)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:intf2/LINE4/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:intf2/LINE4/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:intf2/LINE4/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:intf2/LINE4/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)'], defaultValue: 16};
MERGE (n:KG {id: 'gfxlayout:spectrum_charlayout'}) SET n:GfxLayout SET n += {name: 'spectrum_charlayout', width: 8, height: 8, total: 96, planes: 1, planeOffsets: [0], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxdecode:gfx_spectrum'}) SET n:GfxDecode SET n += {name: 'gfx_spectrum', sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 708, sourceColumn: 8, sourceEndLine: 708};
MERGE (n:KG {id: 'gfxdecode:gfx_spectrum/e0'}) SET n:GfxDecodeEntry SET n += {region: 'maincpu', offset: 15616, layout: 'spectrum_charlayout', colorBase: 7, colorCount: 8, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'device:spectrum_state.spectrum_common/palette/callback:palette_init'}) SET n:Callback SET n += {signal: 'palette_init', operation: 'palette_init', raw: 'PALETTE(config, "palette", FUNC(spectrum_state::spectrum_palette), 16)', ownerTag: 'palette', targetClass: 'spectrum_state', targetMethod: 'spectrum_palette', entries: 16, sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 758};
MERGE (n:KG {id: 'handler:spectrum_state.spectrum_palette'}) SET n:Handler SET n += {method: 'spectrum_palette', ownerClass: 'spectrum_state', sourceFile: 'src/mame/sinclair/spectrum_v.cpp', sourceLine: 95, sourceColumn: 1, sourceEndLine: 98, sourceParameters: 'palette_device &palette', sourceBody: 'palette.set_pen_colors(0, spectrum_pens);'};
MATCH (a:KG {id: 'game:spec128'}), (b:KG {id: 'file:src/mame/sinclair/spec128.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 507, sourceColumn: 1, sourceEndLine: 507};
MATCH (a:KG {id: 'game:spec128'}), (b:KG {id: 'machine:spectrum_128_state.spectrum_128'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:spec128'}), (b:KG {id: 'inputs:spec128'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:spec128'}), (b:KG {id: 'romset:spec128'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/sinclair/spec128.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sinclair/spec128.cpp'}), (b:KG {id: 'file:spec128.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sinclair/spec128.cpp'}), (b:KG {id: 'file:bus/spectrum/ay/slot.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sinclair/spec128.cpp'}), (b:KG {id: 'file:bus/spectrum/dma/slot.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sinclair/spec128.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sinclair/spec128.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sinclair/spec128.cpp'}), (b:KG {id: 'file:formats/tzx_cas.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'handler:spectrum_state.irq_on'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'handler:spectrum_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'handler:spectrum_state.irq_off'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'handler:spectrum_state.finish_screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'file:src/mame/sinclair/spec128.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 415, sourceColumn: 1, sourceEndLine: 462};
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'handler:spectrum_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'handler:spectrum_128_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'handler:spectrum_128_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'machine:spectrum_state.spectrum'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'bank:spectrum_128_state.spectrum_128/bank_rom[0]'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'bank:spectrum_128_state.spectrum_128/bank_ram[1]'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'bank:spectrum_128_state.spectrum_128/bank_ram[2]'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'bank:spectrum_128_state.spectrum_128/bank_ram[3]'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'map:spectrum_128_state.spectrum_128_mem'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'map:spectrum_128_state.spectrum_128_io'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_IO', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'map:spectrum_128_state.spectrum_128_fetch'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_OPCODES', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'machine:spectrum_128_state.spectrum_128/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'machine:spectrum_128_state.spectrum_128/callback:maincpu:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'machine:spectrum_128_state.spectrum_128/callback:maincpu:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'machine:spectrum_128_state.spectrum_128/callback:maincpu:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'machine:spectrum_128_state.spectrum_128/callback:exp:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'machine:spectrum_128_state.spectrum_128/callback:exp:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'machine:spectrum_128_state.spectrum_128/callback:exp:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'machine:spectrum_128_state.spectrum_128/callback:dma:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'machine:spectrum_128_state.spectrum_128/callback:dma:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'device:spectrum_128_state.spectrum_128/ay_slot'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128'}), (b:KG {id: 'device:spectrum_128_state.spectrum_128/ay_slot:ay_ay8912'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:spec128'}), (b:KG {id: 'file:src/mame/sinclair/spec128.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 312, sourceColumn: 1, sourceEndLine: 312};
MATCH (a:KG {id: 'inputs:spec128'}), (b:KG {id: 'inputs:spectrum'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:spec128'}), (b:KG {id: 'inputs:spec128/PLUS0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:spec128'}), (b:KG {id: 'inputs:spec128/PLUS1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:spec128'}), (b:KG {id: 'inputs:spec128/PLUS2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:spec128'}), (b:KG {id: 'inputs:spec128/PLUS3'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:spec128'}), (b:KG {id: 'inputs:spec128/PLUS4'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:spec128'}), (b:KG {id: 'file:src/mame/sinclair/spec128.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 471, sourceColumn: 1, sourceEndLine: 471};
MATCH (a:KG {id: 'romset:spec128'}), (b:KG {id: 'region:spec128/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.video_start'}), (b:KG {id: 'handler:spectrum_state.finish_screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.video_start'}), (b:KG {id: 'handler:spectrum_state.irq_on'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.video_start'}), (b:KG {id: 'handler:spectrum_state.irq_off'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_128_state.machine_reset'}), (b:KG {id: 'handler:spectrum_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_128_state.machine_reset'}), (b:KG {id: 'handler:spectrum_128_state.spectrum_128_update_memory'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_128_state.video_start'}), (b:KG {id: 'handler:spectrum_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum'}), (b:KG {id: 'handler:spectrum_state.irq_on'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum'}), (b:KG {id: 'handler:spectrum_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum'}), (b:KG {id: 'handler:spectrum_state.irq_off'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum'}), (b:KG {id: 'handler:spectrum_state.finish_screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum'}), (b:KG {id: 'file:src/mame/sinclair/spectrum.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 799, sourceColumn: 1, sourceEndLine: 809};
MATCH (a:KG {id: 'machine:spectrum_state.spectrum'}), (b:KG {id: 'handler:spectrum_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum'}), (b:KG {id: 'machine:spectrum_state.spectrum_common'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:spectrum_state.spectrum'}), (b:KG {id: 'device:spectrum_state.spectrum/ram'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'bank:spectrum_128_state.spectrum_128/bank_rom[0]'}), (b:KG {id: 'file:src/mame/sinclair/spec128.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 352, sourceColumn: 1, sourceEndLine: 368};
MATCH (a:KG {id: 'bank:spectrum_128_state.spectrum_128/bank_ram[1]'}), (b:KG {id: 'file:src/mame/sinclair/spec128.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 352, sourceColumn: 1, sourceEndLine: 368};
MATCH (a:KG {id: 'bank:spectrum_128_state.spectrum_128/bank_ram[2]'}), (b:KG {id: 'file:src/mame/sinclair/spec128.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 352, sourceColumn: 1, sourceEndLine: 368};
MATCH (a:KG {id: 'bank:spectrum_128_state.spectrum_128/bank_ram[3]'}), (b:KG {id: 'file:src/mame/sinclair/spec128.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 352, sourceColumn: 1, sourceEndLine: 368};
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_mem'}), (b:KG {id: 'file:src/mame/sinclair/spec128.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 281, sourceColumn: 1, sourceEndLine: 287};
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_mem'}), (b:KG {id: 'map:spectrum_128_state.spectrum_128_mem/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_mem'}), (b:KG {id: 'map:spectrum_128_state.spectrum_128_mem/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_mem'}), (b:KG {id: 'map:spectrum_128_state.spectrum_128_mem/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_mem'}), (b:KG {id: 'map:spectrum_128_state.spectrum_128_mem/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_io'}), (b:KG {id: 'file:src/mame/sinclair/spec128.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 272, sourceColumn: 1, sourceEndLine: 279};
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_io'}), (b:KG {id: 'map:spectrum_128_state.spectrum_128_io/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_io'}), (b:KG {id: 'map:spectrum_128_state.spectrum_128_io/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_io'}), (b:KG {id: 'map:spectrum_128_state.spectrum_128_io/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_io'}), (b:KG {id: 'map:spectrum_128_state.spectrum_128_io/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_io'}), (b:KG {id: 'map:spectrum_128_state.spectrum_128_io/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_fetch'}), (b:KG {id: 'file:src/mame/sinclair/spec128.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sinclair/spec128.cpp', sourceLine: 289, sourceColumn: 1, sourceEndLine: 292};
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_fetch'}), (b:KG {id: 'map:spectrum_128_state.spectrum_128_fetch/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128/callback:maincpu:0'}), (b:KG {id: 'handler:spectrum_128_state.spec_interrupt'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128/callback:maincpu:1'}), (b:KG {id: 'handler:spectrum_128_state.spectrum_refresh_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128/callback:maincpu:2'}), (b:KG {id: 'handler:spectrum_ula_device.nomem_rq'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128/callback:maincpu:3'}), (b:KG {id: 'handler:dma_slot_device.bai_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:spectrum_128_state.spectrum_128/callback:exp:2'}), (b:KG {id: 'handler:spectrum_128_state.floating_bus_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:spectrum_128_state.spectrum_128/ay_slot'}), (b:KG {id: 'audioroute:device:spectrum_128_state.spectrum_128/ay_slot/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:spectrum_128_state.spectrum_128/ay_slot:ay_ay8912'}), (b:KG {id: 'machine:ay8912_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'inputs:spectrum'}), (b:KG {id: 'file:src/mame/sinclair/spectrum.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 598, sourceColumn: 1, sourceEndLine: 598};
MATCH (a:KG {id: 'inputs:spectrum'}), (b:KG {id: 'inputs:spectrum/LINE0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:spectrum'}), (b:KG {id: 'inputs:spectrum/LINE1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:spectrum'}), (b:KG {id: 'inputs:spectrum/LINE2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:spectrum'}), (b:KG {id: 'inputs:spectrum/LINE3'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:spectrum'}), (b:KG {id: 'inputs:spectrum/LINE4'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:spectrum'}), (b:KG {id: 'inputs:spectrum/LINE5'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:spectrum'}), (b:KG {id: 'inputs:spectrum/LINE6'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:spectrum'}), (b:KG {id: 'inputs:spectrum/LINE7'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:spectrum'}), (b:KG {id: 'inputs:spectrum/NMI'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:spectrum'}), (b:KG {id: 'inputs:spectrum/CONFIG'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:spec128/PLUS0'}), (b:KG {id: 'inputs:spec128/PLUS0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spec128/PLUS0'}), (b:KG {id: 'inputs:spec128/PLUS0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spec128/PLUS0'}), (b:KG {id: 'inputs:spec128/PLUS0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spec128/PLUS0'}), (b:KG {id: 'inputs:spec128/PLUS0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spec128/PLUS0'}), (b:KG {id: 'inputs:spec128/PLUS0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spec128/PLUS0'}), (b:KG {id: 'inputs:spec128/PLUS0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spec128/PLUS1'}), (b:KG {id: 'inputs:spec128/PLUS1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spec128/PLUS1'}), (b:KG {id: 'inputs:spec128/PLUS1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spec128/PLUS1'}), (b:KG {id: 'inputs:spec128/PLUS1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spec128/PLUS1'}), (b:KG {id: 'inputs:spec128/PLUS1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spec128/PLUS1'}), (b:KG {id: 'inputs:spec128/PLUS1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spec128/PLUS1'}), (b:KG {id: 'inputs:spec128/PLUS1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spec128/PLUS2'}), (b:KG {id: 'inputs:spec128/PLUS2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spec128/PLUS2'}), (b:KG {id: 'inputs:spec128/PLUS2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spec128/PLUS2'}), (b:KG {id: 'inputs:spec128/PLUS2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spec128/PLUS3'}), (b:KG {id: 'inputs:spec128/PLUS3/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spec128/PLUS3'}), (b:KG {id: 'inputs:spec128/PLUS3/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spec128/PLUS3'}), (b:KG {id: 'inputs:spec128/PLUS3/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spec128/PLUS4'}), (b:KG {id: 'inputs:spec128/PLUS4/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spec128/PLUS4'}), (b:KG {id: 'inputs:spec128/PLUS4/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spec128/PLUS4'}), (b:KG {id: 'inputs:spec128/PLUS4/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:spec128/maincpu'}), (b:KG {id: 'rom:spec128/maincpu/zx128_0.rom'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:spec128/maincpu'}), (b:KG {id: 'rom:spec128/maincpu/zx128_1.rom'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'handler:spectrum_128_state.spectrum_128_update_memory'}), (b:KG {id: 'handler:spectrum_ula_device.bank3_pg_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'file:src/mame/sinclair/spectrum.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sinclair/spectrum.cpp'}), (b:KG {id: 'file:spectrum.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sinclair/spectrum.cpp'}), (b:KG {id: 'file:bus/spectrum/dma/slot.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sinclair/spectrum.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sinclair/spectrum.cpp'}), (b:KG {id: 'file:spec_snqk.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sinclair/spectrum.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sinclair/spectrum.cpp'}), (b:KG {id: 'file:softlist_dev.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sinclair/spectrum.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sinclair/spectrum.cpp'}), (b:KG {id: 'file:formats/tzx_cas.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum_common'}), (b:KG {id: 'handler:spectrum_state.irq_on'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum_common'}), (b:KG {id: 'handler:spectrum_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum_common'}), (b:KG {id: 'handler:spectrum_state.irq_off'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum_common'}), (b:KG {id: 'handler:spectrum_state.finish_screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum_common'}), (b:KG {id: 'file:src/mame/sinclair/spectrum.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 729, sourceColumn: 1, sourceEndLine: 797};
MATCH (a:KG {id: 'machine:spectrum_state.spectrum_common'}), (b:KG {id: 'handler:spectrum_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum_common'}), (b:KG {id: 'softlist:spectrum_state.spectrum_common/spectrum_cass'}) MERGE (a)-[r:HAS_SOFTLIST]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum_common'}), (b:KG {id: 'device:spectrum_state.spectrum_common/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum_common'}), (b:KG {id: 'device:spectrum_state.spectrum_common/specmem'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum_common'}), (b:KG {id: 'device:spectrum_state.spectrum_common/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum_common'}), (b:KG {id: 'device:spectrum_state.spectrum_common/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum_common'}), (b:KG {id: 'device:spectrum_state.spectrum_common/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum_common'}), (b:KG {id: 'gfxdecode:gfx_spectrum'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:spectrum_state.spectrum_common'}), (b:KG {id: 'device:spectrum_state.spectrum_common/ula'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum_common'}), (b:KG {id: 'device:spectrum_state.spectrum_common/speakers'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum_common'}), (b:KG {id: 'device:spectrum_state.spectrum_common/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum_common'}), (b:KG {id: 'device:spectrum_state.spectrum_common/exp'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum_common'}), (b:KG {id: 'device:spectrum_state.spectrum_common/dma'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum_common'}), (b:KG {id: 'device:spectrum_state.spectrum_common/snapshot'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum_common'}), (b:KG {id: 'device:spectrum_state.spectrum_common/quickload'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:spectrum_state.spectrum_common'}), (b:KG {id: 'device:spectrum_state.spectrum_common/cassette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_mem/range0'}), (b:KG {id: 'handler:spectrum_128_state.spectrum_128_rom_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_mem/range0'}), (b:KG {id: 'handler:spectrum_128_state.spectrum_128_rom_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_mem/range1'}), (b:KG {id: 'handler:spectrum_128_state.spectrum_128_ram_r_1'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_mem/range1'}), (b:KG {id: 'handler:spectrum_128_state.spectrum_128_ram_w_1'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_mem/range2'}), (b:KG {id: 'handler:spectrum_128_state.spectrum_128_ram_r_2'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_mem/range2'}), (b:KG {id: 'handler:spectrum_128_state.spectrum_128_ram_w_2'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_mem/range3'}), (b:KG {id: 'handler:spectrum_128_state.spectrum_128_ram_r_3'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_mem/range3'}), (b:KG {id: 'handler:spectrum_128_state.spectrum_128_ram_w_3'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_io/range0'}), (b:KG {id: 'handler:spectrum_128_state.spectrum_ula_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_io/range0'}), (b:KG {id: 'handler:spectrum_128_state.spectrum_ula_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_io/range1'}), (b:KG {id: 'handler:spectrum_128_state.spectrum_port_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_io/range1'}), (b:KG {id: 'handler:spectrum_128_state.spectrum_port_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_io/range2'}), (b:KG {id: 'handler:spectrum_128_state.spectrum_128_port_7ffd_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_io/range3'}), (b:KG {id: 'handler:ay_slot_device.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay_slot'};
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_io/range4'}), (b:KG {id: 'handler:ay_slot_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ay_slot'};
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_io/range4'}), (b:KG {id: 'handler:ay_slot_device.address_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ay_slot'};
MATCH (a:KG {id: 'map:spectrum_128_state.spectrum_128_fetch/range0'}), (b:KG {id: 'handler:spectrum_128_state.spectrum_128_pre_opcode_fetch_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'handler:spectrum_128_state.spec_interrupt'}), (b:KG {id: 'handler:spectrum_state.get_screen_area'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_128_state.spectrum_refresh_w'}), (b:KG {id: 'handler:spectrum_state.get_screen_area'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_128_state.spectrum_refresh_w'}), (b:KG {id: 'handler:spectrum_state.snow_pattern1_base'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_128_state.floating_bus_r'}), (b:KG {id: 'handler:spectrum_state.get_screen_area'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:ay8912_device.device_add_mconfig'}), (b:KG {id: 'file:src/devices/bus/spectrum/ay/cards.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/devices/bus/spectrum/ay/cards.cpp', sourceLine: 22, sourceColumn: 1, sourceEndLine: 26};
MATCH (a:KG {id: 'machine:ay8912_device.device_add_mconfig'}), (b:KG {id: 'device:ay8912_device.device_add_mconfig/ay0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE0'}), (b:KG {id: 'inputs:spectrum/LINE0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE0'}), (b:KG {id: 'inputs:spectrum/LINE0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE0'}), (b:KG {id: 'inputs:spectrum/LINE0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE0'}), (b:KG {id: 'inputs:spectrum/LINE0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE0'}), (b:KG {id: 'inputs:spectrum/LINE0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE1'}), (b:KG {id: 'inputs:spectrum/LINE1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE1'}), (b:KG {id: 'inputs:spectrum/LINE1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE1'}), (b:KG {id: 'inputs:spectrum/LINE1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE1'}), (b:KG {id: 'inputs:spectrum/LINE1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE1'}), (b:KG {id: 'inputs:spectrum/LINE1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE2'}), (b:KG {id: 'inputs:spectrum/LINE2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE2'}), (b:KG {id: 'inputs:spectrum/LINE2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE2'}), (b:KG {id: 'inputs:spectrum/LINE2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE2'}), (b:KG {id: 'inputs:spectrum/LINE2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE2'}), (b:KG {id: 'inputs:spectrum/LINE2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE3'}), (b:KG {id: 'inputs:spectrum/LINE3/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE3'}), (b:KG {id: 'inputs:spectrum/LINE3/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE3'}), (b:KG {id: 'inputs:spectrum/LINE3/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE3'}), (b:KG {id: 'inputs:spectrum/LINE3/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE3'}), (b:KG {id: 'inputs:spectrum/LINE3/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE4'}), (b:KG {id: 'inputs:spectrum/LINE4/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE4'}), (b:KG {id: 'inputs:spectrum/LINE4/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE4'}), (b:KG {id: 'inputs:spectrum/LINE4/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE4'}), (b:KG {id: 'inputs:spectrum/LINE4/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE4'}), (b:KG {id: 'inputs:spectrum/LINE4/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE5'}), (b:KG {id: 'inputs:spectrum/LINE5/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE5'}), (b:KG {id: 'inputs:spectrum/LINE5/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE5'}), (b:KG {id: 'inputs:spectrum/LINE5/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE5'}), (b:KG {id: 'inputs:spectrum/LINE5/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE5'}), (b:KG {id: 'inputs:spectrum/LINE5/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE6'}), (b:KG {id: 'inputs:spectrum/LINE6/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE6'}), (b:KG {id: 'inputs:spectrum/LINE6/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE6'}), (b:KG {id: 'inputs:spectrum/LINE6/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE6'}), (b:KG {id: 'inputs:spectrum/LINE6/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE6'}), (b:KG {id: 'inputs:spectrum/LINE6/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE7'}), (b:KG {id: 'inputs:spectrum/LINE7/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE7'}), (b:KG {id: 'inputs:spectrum/LINE7/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE7'}), (b:KG {id: 'inputs:spectrum/LINE7/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE7'}), (b:KG {id: 'inputs:spectrum/LINE7/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/LINE7'}), (b:KG {id: 'inputs:spectrum/LINE7/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/NMI'}), (b:KG {id: 'inputs:spectrum/NMI/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/CONFIG'}), (b:KG {id: 'inputs:spectrum/CONFIG/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/CONFIG'}), (b:KG {id: 'inputs:spectrum/CONFIG/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:spectrum/CONFIG'}), (b:KG {id: 'inputs:spectrum/CONFIG/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'device:spectrum_state.spectrum_common/maincpu'}), (b:KG {id: 'map:spectrum_state.spectrum_opcodes'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_OPCODES'};
MATCH (a:KG {id: 'device:spectrum_state.spectrum_common/maincpu'}), (b:KG {id: 'map:spectrum_state.spectrum_data'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:spectrum_state.spectrum_common/maincpu'}), (b:KG {id: 'map:spectrum_state.spectrum_io'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:spectrum_state.spectrum_common/specmem'}), (b:KG {id: 'map:spectrum_state.spectrum_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:spectrum_state.spectrum_common/screen'}), (b:KG {id: 'device:spectrum_state.spectrum_common/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:spectrum_state.spectrum_common/palette'}), (b:KG {id: 'device:spectrum_state.spectrum_common/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_spectrum'}), (b:KG {id: 'file:src/mame/sinclair/spectrum.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 708, sourceColumn: 8, sourceEndLine: 708};
MATCH (a:KG {id: 'gfxdecode:gfx_spectrum'}), (b:KG {id: 'gfxdecode:gfx_spectrum/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:spectrum_state.spectrum_common/ula'}), (b:KG {id: 'handler:spectrum_ula_contended_device.device_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:spectrum_state.spectrum_common/speaker'}), (b:KG {id: 'audioroute:device:spectrum_state.spectrum_common/speaker/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:spectrum_state.spectrum_common/exp'}), (b:KG {id: 'inputs:kempjoy'}) MERGE (a)-[r:USES_INPUTS]->(b) SET r += {option: 'kempjoy'};
MATCH (a:KG {id: 'device:spectrum_state.spectrum_common/exp'}), (b:KG {id: 'inputs:intf2'}) MERGE (a)-[r:USES_INPUTS]->(b) SET r += {option: 'intf2'};
MATCH (a:KG {id: 'device:spectrum_state.spectrum_common/snapshot'}), (b:KG {id: 'device:spectrum_state.spectrum_common/snapshot/callback:snapshot:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:spectrum_state.spectrum_common/quickload'}), (b:KG {id: 'device:spectrum_state.spectrum_common/quickload/callback:quickload:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:spectrum_state.spectrum_common/cassette'}), (b:KG {id: 'audioroute:device:spectrum_state.spectrum_common/cassette/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'handler:spectrum_128_state.spectrum_128_ram_w_1'}), (b:KG {id: 'handler:spectrum_128_state.is_vram_write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_128_state.spectrum_128_ram_w_2'}), (b:KG {id: 'handler:spectrum_128_state.is_vram_write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_128_state.spectrum_128_ram_w_3'}), (b:KG {id: 'handler:spectrum_128_state.is_vram_write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_128_state.spectrum_port_r'}), (b:KG {id: 'handler:spectrum_state.floating_bus_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_128_state.spectrum_128_port_7ffd_w'}), (b:KG {id: 'handler:spectrum_128_state.spectrum_128_update_memory'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'file:src/devices/bus/spectrum/ay/cards.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/devices/bus/spectrum/ay/cards.cpp'}), (b:KG {id: 'file:cards.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'map:spectrum_state.spectrum_opcodes'}), (b:KG {id: 'file:src/mame/sinclair/spectrum.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 542, sourceColumn: 1, sourceEndLine: 545};
MATCH (a:KG {id: 'map:spectrum_state.spectrum_opcodes'}), (b:KG {id: 'map:spectrum_state.spectrum_opcodes/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:spectrum_state.spectrum_data'}), (b:KG {id: 'file:src/mame/sinclair/spectrum.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 547, sourceColumn: 1, sourceEndLine: 550};
MATCH (a:KG {id: 'map:spectrum_state.spectrum_data'}), (b:KG {id: 'map:spectrum_state.spectrum_data/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:spectrum_state.spectrum_io'}), (b:KG {id: 'file:src/mame/sinclair/spectrum.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 558, sourceColumn: 1, sourceEndLine: 562};
MATCH (a:KG {id: 'map:spectrum_state.spectrum_io'}), (b:KG {id: 'map:spectrum_state.spectrum_io/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:spectrum_state.spectrum_io'}), (b:KG {id: 'map:spectrum_state.spectrum_io/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:spectrum_state.spectrum_map'}), (b:KG {id: 'file:src/mame/sinclair/spectrum.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sinclair/spectrum.cpp', sourceLine: 533, sourceColumn: 1, sourceEndLine: 540};
MATCH (a:KG {id: 'map:spectrum_state.spectrum_map'}), (b:KG {id: 'map:spectrum_state.spectrum_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:spectrum_state.spectrum_map'}), (b:KG {id: 'map:spectrum_state.spectrum_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:spectrum_state.spectrum_common/screen/callback:screen:0'}), (b:KG {id: 'handler:spectrum_state.screen_update_spectrum'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:spectrum_state.spectrum_common/palette/callback:palette_init'}), (b:KG {id: 'handler:spectrum_state.spectrum_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_spectrum/e0'}), (b:KG {id: 'gfxlayout:spectrum_charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'handler:spectrum_ula_contended_device.device_start'}), (b:KG {id: 'handler:spectrum_ula_device.device_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:kempjoy'}), (b:KG {id: 'file:src/devices/bus/spectrum/kempjoy.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'inputs:kempjoy'}), (b:KG {id: 'inputs:kempjoy/JOY'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:intf2'}), (b:KG {id: 'file:src/devices/bus/spectrum/intf2.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'inputs:intf2'}), (b:KG {id: 'inputs:intf2/LINE3'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:intf2'}), (b:KG {id: 'inputs:intf2/LINE4'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'device:spectrum_state.spectrum_common/snapshot/callback:snapshot:0'}), (b:KG {id: 'handler:spectrum_state.snapshot_cb'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:spectrum_state.spectrum_common/quickload/callback:quickload:0'}), (b:KG {id: 'handler:spectrum_state.quickload_cb'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_128_state.is_vram_write'}), (b:KG {id: 'handler:spectrum_state.is_vram_write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.floating_bus_r'}), (b:KG {id: 'handler:spectrum_state.get_screen_area'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:spectrum_state.spectrum_opcodes/range0'}), (b:KG {id: 'handler:spectrum_state.pre_opcode_fetch_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:spectrum_state.spectrum_data/range0'}), (b:KG {id: 'handler:spectrum_state.spectrum_data_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:spectrum_state.spectrum_data/range0'}), (b:KG {id: 'handler:spectrum_state.spectrum_data_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:spectrum_state.spectrum_io/range0'}), (b:KG {id: 'handler:spectrum_state.spectrum_ula_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:spectrum_state.spectrum_io/range0'}), (b:KG {id: 'handler:spectrum_state.spectrum_ula_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:spectrum_state.spectrum_io/range1'}), (b:KG {id: 'handler:spectrum_state.spectrum_port_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:spectrum_state.spectrum_io/range1'}), (b:KG {id: 'handler:spectrum_state.spectrum_port_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:spectrum_state.spectrum_map/range0'}), (b:KG {id: 'handler:spectrum_state.spectrum_rom_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:spectrum_state.spectrum_map/range0'}), (b:KG {id: 'handler:spectrum_state.spectrum_rom_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.screen_update_spectrum'}), (b:KG {id: 'handler:spectrum_state.get_screen_area'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.screen_update_spectrum'}), (b:KG {id: 'handler:spectrum_state.spectrum_update_border'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.screen_update_spectrum'}), (b:KG {id: 'handler:spectrum_state.spectrum_update_screen'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:spectrum_charlayout'}), (b:KG {id: 'file:src/mame/sinclair/spec128.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'inputs:kempjoy/JOY'}), (b:KG {id: 'inputs:kempjoy/JOY/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:kempjoy/JOY'}), (b:KG {id: 'inputs:kempjoy/JOY/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:kempjoy/JOY'}), (b:KG {id: 'inputs:kempjoy/JOY/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:kempjoy/JOY'}), (b:KG {id: 'inputs:kempjoy/JOY/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:kempjoy/JOY'}), (b:KG {id: 'inputs:kempjoy/JOY/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:intf2/LINE3'}), (b:KG {id: 'inputs:intf2/LINE3/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:intf2/LINE3'}), (b:KG {id: 'inputs:intf2/LINE3/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:intf2/LINE3'}), (b:KG {id: 'inputs:intf2/LINE3/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:intf2/LINE3'}), (b:KG {id: 'inputs:intf2/LINE3/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:intf2/LINE3'}), (b:KG {id: 'inputs:intf2/LINE3/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:intf2/LINE4'}), (b:KG {id: 'inputs:intf2/LINE4/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:intf2/LINE4'}), (b:KG {id: 'inputs:intf2/LINE4/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:intf2/LINE4'}), (b:KG {id: 'inputs:intf2/LINE4/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:intf2/LINE4'}), (b:KG {id: 'inputs:intf2/LINE4/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:intf2/LINE4'}), (b:KG {id: 'inputs:intf2/LINE4/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.snapshot_cb'}), (b:KG {id: 'handler:spectrum_state.setup_snx'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.snapshot_cb'}), (b:KG {id: 'handler:spectrum_state.setup_sna'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.snapshot_cb'}), (b:KG {id: 'handler:spectrum_state.setup_sp'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.snapshot_cb'}), (b:KG {id: 'handler:spectrum_state.setup_ach'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.snapshot_cb'}), (b:KG {id: 'handler:spectrum_state.setup_prg'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.snapshot_cb'}), (b:KG {id: 'handler:spectrum_state.setup_plusd'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.snapshot_cb'}), (b:KG {id: 'handler:spectrum_state.setup_sem'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.snapshot_cb'}), (b:KG {id: 'handler:spectrum_state.setup_sit'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.snapshot_cb'}), (b:KG {id: 'handler:spectrum_state.setup_zx'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.snapshot_cb'}), (b:KG {id: 'handler:spectrum_state.setup_snp'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.snapshot_cb'}), (b:KG {id: 'handler:spectrum_state.setup_frz'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.snapshot_cb'}), (b:KG {id: 'handler:spectrum_state.setup_spg'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.snapshot_cb'}), (b:KG {id: 'handler:spectrum_state.setup_z80'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.quickload_cb'}), (b:KG {id: 'handler:spectrum_state.setup_scr'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.quickload_cb'}), (b:KG {id: 'handler:spectrum_state.setup_raw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.spectrum_data_w'}), (b:KG {id: 'handler:spectrum_state.is_vram_write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.spectrum_port_r'}), (b:KG {id: 'handler:spectrum_state.floating_bus_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.spectrum_update_border'}), (b:KG {id: 'handler:spectrum_state.get_border_color'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.spectrum_update_screen'}), (b:KG {id: 'handler:spectrum_state.get_screen_area'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_snx'}), (b:KG {id: 'handler:spectrum_state.snx_decompress_block'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_snx'}), (b:KG {id: 'handler:spectrum_state.border_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_snx'}), (b:KG {id: 'handler:spectrum_state.page_basicrom'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_sna'}), (b:KG {id: 'handler:spectrum_state.page_basicrom'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_sna'}), (b:KG {id: 'handler:spectrum_state.update_paging'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_sna'}), (b:KG {id: 'handler:spectrum_state.border_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_sp'}), (b:KG {id: 'handler:spectrum_state.border_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_sp'}), (b:KG {id: 'handler:spectrum_state.page_basicrom'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_ach'}), (b:KG {id: 'handler:spectrum_state.border_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_ach'}), (b:KG {id: 'handler:spectrum_state.page_basicrom'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_prg'}), (b:KG {id: 'handler:spectrum_state.border_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_prg'}), (b:KG {id: 'handler:spectrum_state.page_basicrom'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_plusd'}), (b:KG {id: 'handler:spectrum_state.border_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_plusd'}), (b:KG {id: 'handler:spectrum_state.page_basicrom'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_plusd'}), (b:KG {id: 'handler:spectrum_state.update_paging'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_sem'}), (b:KG {id: 'handler:spectrum_state.border_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_sem'}), (b:KG {id: 'handler:spectrum_state.page_basicrom'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_sit'}), (b:KG {id: 'handler:spectrum_state.border_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_sit'}), (b:KG {id: 'handler:spectrum_state.page_basicrom'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_zx'}), (b:KG {id: 'handler:spectrum_state.border_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_zx'}), (b:KG {id: 'handler:spectrum_state.page_basicrom'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_snp'}), (b:KG {id: 'handler:spectrum_state.border_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_snp'}), (b:KG {id: 'handler:spectrum_state.page_basicrom'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_frz'}), (b:KG {id: 'handler:spectrum_state.update_paging'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_frz'}), (b:KG {id: 'handler:spectrum_state.border_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_spg'}), (b:KG {id: 'handler:hrust_decoder.decode'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_spg'}), (b:KG {id: 'handler:spectrum_state.bank3_set_page'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_z80'}), (b:KG {id: 'handler:.spectrum_identify_z80'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_z80'}), (b:KG {id: 'handler:spectrum_state.border_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_z80'}), (b:KG {id: 'handler:spectrum_state.page_basicrom'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_z80'}), (b:KG {id: 'handler:spectrum_state.z80_decompress_block'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_z80'}), (b:KG {id: 'handler:spectrum_state.update_paging'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_z80'}), (b:KG {id: 'handler:spectrum_state.ts2068_update_memory'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_scr'}), (b:KG {id: 'handler:spectrum_state.log_quickload'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_raw'}), (b:KG {id: 'handler:spectrum_state.border_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.setup_raw'}), (b:KG {id: 'handler:spectrum_state.log_quickload'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.page_basicrom'}), (b:KG {id: 'handler:spectrum_state.update_paging'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.update_paging'}), (b:KG {id: 'handler:spectrum_state.spectrum_128_update_memory'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.update_paging'}), (b:KG {id: 'handler:spectrum_state.plus3_update_memory'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.spectrum_port_r'}), (b:KG {id: 'handler:spectrum_state.floating_bus_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.spectrum_128_update_memory'}), (b:KG {id: 'handler:spectrum_ula_device.bank3_pg_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:spectrum_state.bank3_set_page'}), (b:KG {id: 'handler:spectrum_128_state.spectrum_128_update_memory'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
