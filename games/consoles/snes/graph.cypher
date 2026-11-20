// mamekit knowledge graph — driver src/mame/nintendo/snes.cpp
// generated 2026-11-20T01:56:22.957Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/nintendo/snes.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/nintendo/snes.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:snes.h'}) SET n:SourceFile SET n += {path: 'snes.h', external: true};
MERGE (n:KG {id: 'file:snescx4.h'}) SET n:SourceFile SET n += {path: 'snescx4.h', external: true};
MERGE (n:KG {id: 'file:bus/snes/snes_slot.h'}) SET n:SourceFile SET n += {path: 'bus/snes/snes_slot.h', external: true};
MERGE (n:KG {id: 'file:bus/snes/snes_carts.h'}) SET n:SourceFile SET n += {path: 'bus/snes/snes_carts.h', external: true};
MERGE (n:KG {id: 'file:bus/snes_ctrl/ctrl.h'}) SET n:SourceFile SET n += {path: 'bus/snes_ctrl/ctrl.h', external: true};
MERGE (n:KG {id: 'file:softlist_dev.h'}) SET n:SourceFile SET n += {path: 'softlist_dev.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'game:snes'}) SET n:Game SET n += {name: 'snes', year: '1989', company: 'Nintendo', fullname: 'Super Nintendo Entertainment System / Super Famicom (NTSC)', monitor: 'ROT0', cls: 'snes_console_state', init: 'empty_init', flags: 'MACHINE_IMPERFECT_GRAPHICS | MACHINE_IMPERFECT_SOUND | MACHINE_SUPPORTS_SAVE', kind: 'console', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1419, sourceColumn: 1, sourceEndLine: 1419};
MERGE (n:KG {id: 'romset:snes'}) SET n:RomSet SET n += {name: 'snes', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1406, sourceColumn: 1, sourceEndLine: 1406};
MERGE (n:KG {id: 'region:snes/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 16777216, flags: 'ROMREGION_ERASE00', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1407, sourceColumn: 2, sourceEndLine: 1407};
MERGE (n:KG {id: 'map:snes_console_state.snes_map'}) SET n:AddressMap SET n += {cls: 'snes_console_state', name: 'snes_map', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1001, sourceColumn: 1, sourceEndLine: 1006};
MERGE (n:KG {id: 'map:snes_console_state.snes_map/range0'}) SET n:AddressRange SET n += {start: 8257536, end: 8388607, raw: 'map(0x7e0000, 0x7fffff).ram().share("wram")', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1004, sourceColumn: 2, sourceEndLine: 1004, ram: true, share: 'wram'};
MERGE (n:KG {id: 'map:snes_console_state.spc_map'}) SET n:AddressMap SET n += {cls: 'snes_console_state', name: 'spc_map', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1008, sourceColumn: 1, sourceEndLine: 1011};
MERGE (n:KG {id: 'map:snes_console_state.spc_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 65535, raw: 'map(0x0000, 0xffff).ram().share("aram")', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1010, sourceColumn: 2, sourceEndLine: 1010, ram: true, share: 'aram'};
MERGE (n:KG {id: 'handler:snes_state.snes_scanline_tick'}) SET n:Handler SET n += {method: 'snes_scanline_tick', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 93, sourceColumn: 1, sourceEndLine: 179, sourceConstants: ['CLEAR_LINE=0', 'G65816_LINE_NMI=1', 'NMITIMEN=16896', 'RDNMI=16912', 'TIMEUP=16913', 'HVBJOY=16914'], sourceParameters: 'int param', sourceBody: '/* Increase current line - we want to latch on this line during it, not after it */
	m_ppu->set_current_vert(m_screen->vpos());

	// not in hblank
	m_cpu_regs[(HVBJOY) - 0x4200] &= ~0x40;

	/* Vertical IRQ timer - only if horizontal isn\'t also enabled! */
	if ((m_cpu_regs[(NMITIMEN) - 0x4200] & 0x20) && !(m_cpu_regs[(NMITIMEN) - 0x4200] & 0x10))
	{
		if (m_ppu->current_vert() == m_vtime)
		{
			m_cpu_regs[(TIMEUP) - 0x4200] = 0x80;    /* Indicate that irq occurred */
			// IRQ latches the counters, do it now
			m_ppu->set_latch_hv(m_ppu->current_x(), m_ppu->current_y());
			scpu_irq_refresh();
		}
	}
	/* Horizontal IRQ timer */
	if (m_cpu_regs[(NMITIMEN) - 0x4200] & 0x10)
	{
		int setirq = 1;
		int pixel = m_htime;

		// is the HIRQ on a specific scanline?
		if (m_cpu_regs[(NMITIMEN) - 0x4200] & 0x20)
		{
			if (m_ppu->current_vert() != m_vtime)
			{
				setirq = 0;
			}
		}

		if (setirq)
		{
//          printf("HIRQ @ %d, %d\\n", pixel * m_ppu->htmult(), m_ppu->current_vert());
			if (pixel == 0)
			{
				hirq_tick();
			}
			else
			{
				m_hirq_timer->adjust(m_screen->time_until_pos(m_ppu->current_vert(), pixel * m_ppu->htmult()));
			}
		}
	}

	/* Start of VBlank */
	if (m_ppu->current_vert() == m_ppu->last_visible_line())
	{
		m_oam_reset_addr_timer->adjust(m_screen->time_until_pos(m_ppu->current_vert(), 10));

		m_cpu_regs[(HVBJOY) - 0x4200] |= 0x81;       /* Set vblank bit to on & indicate controllers being read */
		m_cpu_regs[(RDNMI) - 0x4200] |= 0x80;        /* Set NMI occurred bit */

		if (m_cpu_regs[(NMITIMEN) - 0x4200] & 0x80)  /* NMI only signaled if this bit set */
		{
			// NMI goes off about 12 cycles after this (otherwise Chrono Trigger, NFL QB Club, etc. lock up)
			m_nmi_timer->adjust(m_maincpu->cycles_to_attotime(12));
		}

		/* three lines after start of vblank we update the controllers (value from snes9x) */
		m_io_timer->adjust(m_screen->time_until_pos(m_ppu->current_vert() + 2, m_hblank_offset * m_ppu->htmult()));
	}

	// hdma reset happens at scanline 0, H=~6
	if (m_ppu->current_vert() == 0)
	{
		address_space &cpu0space = m_maincpu->space(AS_PROGRAM);
		hdma_init(cpu0space);
	}

	if (m_ppu->current_vert() == 0)
	{   /* VBlank is over, time for a new frame */
		m_cpu_regs[(HVBJOY) - 0x4200] &= 0x7f;       /* Clear vblank bit */
		m_cpu_regs[(RDNMI) - 0x4200]  &= 0x7f;       /* Clear nmi occurred bit */
		m_ppu->toggle_field();
		m_ppu->clear_time_range_over();

		m_maincpu->set_input_line(G65816_LINE_NMI, CLEAR_LINE );
	}

	m_hblank_timer->adjust(m_screen->time_until_pos(m_ppu->current_vert(), m_hblank_offset * m_ppu->htmult()));

//  printf("%02x %d\\n",m_cpu_regs[(HVBJOY) - 0x4200],m_ppu->current_vert());'};
MERGE (n:KG {id: 'handler:snes_state.scpu_irq_refresh'}) SET n:Handler SET n += {method: 'scpu_irq_refresh', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 46, sourceColumn: 1, sourceEndLine: 52, sourceConstants: ['CLEAR_LINE=0', 'ASSERT_LINE=1', 'G65816_LINE_IRQ=0', 'TIMEUP=16913'], sourceParameters: '', sourceBody: 'if (m_scpu_irq != nullptr) // multiplexed interrupt?
		m_scpu_irq->in_w<0>(m_cpu_regs[(TIMEUP) - 0x4200] & 0x80);
	else
		m_maincpu->set_input_line(G65816_LINE_IRQ, (m_cpu_regs[(TIMEUP) - 0x4200] & 0x80) ? ASSERT_LINE : CLEAR_LINE);'};
MERGE (n:KG {id: 'handler:snes_state.hirq_tick'}) SET n:Handler SET n += {method: 'hirq_tick', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 61, sourceColumn: 1, sourceEndLine: 68, sourceConstants: ['TIMEUP=16913'], sourceParameters: '', sourceBody: '// latch the counters and pull IRQ
	// (don\'t need to switch to the 65816 context, we don\'t do anything dependant on it)
	m_ppu->set_latch_hv(m_ppu->current_x(), m_ppu->current_y());
	m_cpu_regs[(TIMEUP) - 0x4200] = 0x80;    /* Indicate that irq occurred */
	scpu_irq_refresh();'};
MERGE (n:KG {id: 'handler:snes_state.hdma_init'}) SET n:Handler SET n += {method: 'hdma_init', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 1285, sourceColumn: 1, sourceEndLine: 1296, sourceConstants: ['HDMAEN=16908'], sourceParameters: 'address_space &space', sourceBody: 'm_hdmaen = m_cpu_regs[(HDMAEN) - 0x4200];
	for (int i = 0; i < 8; i++)
	{
		if (BIT(m_hdmaen, i))
		{
			m_dma_channel[i].hdma_addr = m_dma_channel[i].src_addr;
			hdma_update(space, i);
		}
	}'};
MERGE (n:KG {id: 'handler:snes_state.hdma_update'}) SET n:Handler SET n += {method: 'hdma_update', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 1255, sourceColumn: 1, sourceEndLine: 1283, sourceParameters: 'address_space &space, int dma', sourceBody: 'uint32_t abus = get_hdma_addr(dma);

	m_dma_channel[dma].hdma_line_counter = abus_read(space, abus);

	if (m_dma_channel[dma].dmap & 0x40)
	{
		/* One oddity: if $43xA is 0 and this is the last active HDMA channel for this scanline, only load
		one byte for Address, and use the $00 for the low byte. So Address ends up incremented one less than
		otherwise expected */

		abus = get_hdma_addr(dma);
		m_dma_channel[dma].trans_size = abus_read(space, abus) << 8;

		if (m_dma_channel[dma].hdma_line_counter || !is_last_active_channel(dma))
		{
			// we enter here if we have more transfers to be done or if there are other active channels after this one
			abus = get_hdma_addr(dma);
			m_dma_channel[dma].trans_size >>= 8;
			m_dma_channel[dma].trans_size |= abus_read(space, abus) << 8;
		}
	}

	if (!m_dma_channel[dma].hdma_line_counter)
		m_hdmaen &= ~(1 << dma);

	m_dma_channel[dma].do_transfer = 1;'};
MERGE (n:KG {id: 'handler:snes_state.get_hdma_addr'}) SET n:Handler SET n += {method: 'get_hdma_addr', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 1233, sourceColumn: 1, sourceEndLine: 1236, sourceParameters: 'int dma', sourceBody: 'return (m_dma_channel[dma].bank << 16) | (m_dma_channel[dma].hdma_addr++);', sourceReturnType: 'uint32_t'};
MERGE (n:KG {id: 'handler:snes_state.abus_read'}) SET n:Handler SET n += {method: 'abus_read', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 1184, sourceColumn: 1, sourceEndLine: 1191, sourceParameters: 'address_space &space, uint32_t abus', sourceBody: '// m_maincpu->adjust_icount(-8); // 8 master cycle per memory access
	if (!dma_abus_valid(abus))
		return 0;

	return space.read_byte(abus);', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:snes_state.dma_abus_valid'}) SET n:Handler SET n += {method: 'dma_abus_valid', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 1174, sourceColumn: 1, sourceEndLine: 1182, sourceParameters: 'uint32_t address', sourceBody: 'if((address & 0x40ff00) == 0x2100) return 0;  //$[00-3f|80-bf]:[2100-21ff]
	if((address & 0x40fe00) == 0x4000) return 0;  //$[00-3f|80-bf]:[4000-41ff]
	if((address & 0x40ffe0) == 0x4200) return 0;  //$[00-3f|80-bf]:[4200-421f]
	if((address & 0x40ff80) == 0x4300) return 0;  //$[00-3f|80-bf]:[4300-437f]

	return 1;', sourceReturnType: 'int'};
MERGE (n:KG {id: 'handler:snes_state.is_last_active_channel'}) SET n:Handler SET n += {method: 'is_last_active_channel', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 1243, sourceColumn: 1, sourceEndLine: 1253, sourceParameters: 'int dma', sourceBody: 'for (int i = dma + 1; i < 8; i++)
	{
		if (BIT(m_hdmaen, i) && m_dma_channel[i].hdma_line_counter)
			return 0;   // there is still at least another channel with incomplete HDMA
	}

	// if we arrive here, all hdma transfers from (dma + 1) to 7 are completed or not active
	return 1;', sourceReturnType: 'int'};
MERGE (n:KG {id: 'handler:snes_state.snes_init_timers'}) SET n:Handler SET n += {method: 'snes_init_timers', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 975, sourceColumn: 1, sourceEndLine: 1001, sourceParameters: '', sourceBody: '/* init timers and stop them */
	m_scanline_timer = timer_alloc(FUNC(snes_state::snes_scanline_tick), this);
	m_scanline_timer->adjust(attotime::never);
	m_hblank_timer = timer_alloc(FUNC(snes_state::snes_hblank_tick), this);
	m_hblank_timer->adjust(attotime::never);
	m_nmi_timer = timer_alloc(FUNC(snes_state::snes_nmi_tick), this);
	m_nmi_timer->adjust(attotime::never);
	m_hirq_timer = timer_alloc(FUNC(snes_state::snes_hirq_tick_callback), this);
	m_hirq_timer->adjust(attotime::never);
	//m_div_timer = timer_alloc(TIMER_DIV);
	//m_div_timer->adjust(attotime::never);
	//m_mult_timer = timer_alloc(TIMER_MULT);
	//m_mult_timer->adjust(attotime::never);
	m_io_timer = timer_alloc(FUNC(snes_state::snes_update_io), this);
	m_io_timer->adjust(attotime::never);
	m_oam_reset_addr_timer = timer_alloc(FUNC(snes_state::snes_reset_oam_address), this);
	m_oam_reset_addr_timer->adjust(attotime::never);
	m_hdma_reset_timer = timer_alloc(FUNC(snes_state::snes_reset_hdma), this);
	m_hdma_reset_timer->adjust(attotime::never);

	// SNES hcounter has a 0-339 range.  hblank starts at counter 260.
	// clayfighter sets an HIRQ at 260, apparently it wants it to be before hdma kicks off, so we\'ll delay 2 pixels.
	m_hblank_offset = 274;
	m_hblank_timer->adjust(m_screen->time_until_pos(m_ppu->vtotal() - 1, m_hblank_offset));'};
MERGE (n:KG {id: 'handler:snes_state.snes_hblank_tick'}) SET n:Handler SET n += {method: 'snes_hblank_tick', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 182, sourceColumn: 1, sourceEndLine: 211, sourceConstants: ['HDMAEN=16908', 'HVBJOY=16914'], sourceParameters: 'int param', sourceBody: 'address_space &cpu0space = m_maincpu->space(AS_PROGRAM);
	int nextscan;

	m_ppu->set_current_vert(m_screen->vpos());

	/* draw a scanline */
	if (m_ppu->current_vert() <= m_ppu->last_visible_line())
	{
		/* Do HDMA */
		if (m_cpu_regs[(HDMAEN) - 0x4200])
			hdma(cpu0space);

		if (m_screen->vpos() > 0)
			m_screen->update_partial((m_ppu->interlace() == 2) ? (m_ppu->current_vert() * m_ppu->interlace()) : m_ppu->current_vert() - 1);
	}

	// signal hblank
	m_cpu_regs[(HVBJOY) - 0x4200] |= 0x40;

	/* kick off the start of scanline timer */
	nextscan = m_ppu->current_vert() + 1;
	if (nextscan >= m_ppu->vtotal())
	{
		nextscan = 0;
	}

	m_scanline_timer->adjust(m_screen->time_until_pos(nextscan));'};
MERGE (n:KG {id: 'handler:snes_state.hdma'}) SET n:Handler SET n += {method: 'hdma', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 1298, sourceColumn: 1, sourceEndLine: 1378, sourceParameters: 'address_space &space', sourceBody: 'uint16_t bbus;
	uint32_t abus;

	for (int i = 0; i < 8; i++)
	{
		if (BIT(m_hdmaen, i))
		{
			if (m_dma_channel[i].do_transfer)
			{
				/* Get transfer addresses */
				if (m_dma_channel[i].dmap & 0x40)    /* Indirect */
					abus = (m_dma_channel[i].ibank << 16) + m_dma_channel[i].trans_size;
				else                                    /* Absolute */
					abus = (m_dma_channel[i].bank << 16) + m_dma_channel[i].hdma_addr;

				bbus = m_dma_channel[i].dest_addr + 0x2100;



				switch (m_dma_channel[i].dmap & 0x07)
				{
				case 0:     /* 1 register write once             (1 byte:  p               ) */
					dma_transfer(space, i, abus++, bbus);
					break;
				case 5:     /* 2 registers write twice alternate (4 bytes: p, p+1, p,   p+1) */
					dma_transfer(space, i, abus++, bbus);
					dma_transfer(space, i, abus++, bbus + 1);
					dma_transfer(space, i, abus++, bbus);
					dma_transfer(space, i, abus++, bbus + 1);
					break;
				case 1:     /* 2 registers write once            (2 bytes: p, p+1          ) */
					dma_transfer(space, i, abus++, bbus);
					dma_transfer(space, i, abus++, bbus + 1);
					break;
				case 2:     /* 1 register write twice            (2 bytes: p, p            ) */
				case 6:
					dma_transfer(space, i, abus++, bbus);
					dma_transfer(space, i, abus++, bbus);
					break;
				case 3:     /* 2 registers write twice each      (4 bytes: p, p,   p+1, p+1) */
				case 7:
					dma_transfer(space, i, abus++, bbus);
					dma_transfer(space, i, abus++, bbus);
					dma_transfer(space, i, abus++, bbus + 1);
					dma_transfer(space, i, abus++, bbus + 1);
					break;
				case 4:     /* 4 registers write once            (4 bytes: p, p+1, p+2, p+3) */
					dma_transfer(space, i, abus++, bbus);
					dma_transfer(space, i, abus++, bbus + 1);
					dma_transfer(space, i, abus++, bbus + 2);
					dma_transfer(space, i, abus++, bbus + 3);
					break;
				default:
#ifdef MAME_DEBUG
					osd_printf_debug( "  HDMA of unsupported type: %d\\n", m_dma_channel[i].dmap & 0x07);
#endif
					break;
				}

				if (m_dma_channel[i].dmap & 0x40)    /* Indirect */
					m_dma_channel[i].trans_size = abus;
				else                                    /* Absolute */
					m_dma_channel[i].hdma_addr = abus;

			}
		}
	}

	for (int i = 0; i < 8; i++)
	{
		if (BIT(m_hdmaen, i))
		{
			m_dma_channel[i].do_transfer = (--m_dma_channel[i].hdma_line_counter) & 0x80;

			if (!(m_dma_channel[i].hdma_line_counter & 0x7f))
				hdma_update(space, i);
		}
	}'};
MERGE (n:KG {id: 'handler:snes_state.dma_transfer'}) SET n:Handler SET n += {method: 'dma_transfer', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 1193, sourceColumn: 1, sourceEndLine: 1229, sourceParameters: 'address_space &space, uint8_t dma, uint32_t abus, uint16_t bbus', sourceBody: 'if (m_dma_channel[dma].dmap & 0x80)  /* PPU->CPU */
	{
		// m_maincpu->adjust_icount(-8); // 8 master cycle per memory access
		if (bbus == 0x2180 && ((abus & 0xfe0000) == 0x7e0000 || (abus & 0x40e000) == 0x0000))
		{
			//illegal WRAM->WRAM transfer (bus conflict)
			//no read occurs; write does occur
			space.write_byte(abus, 0x00);
			return;
		}
		else
		{
			if (!dma_abus_valid(abus))
				return;

			space.write_byte(abus, space.read_byte(bbus));
			return;
		}
	}
	else                                    /* CPU->PPU */
	{
		if (bbus == 0x2180 && ((abus & 0xfe0000) == 0x7e0000 || (abus & 0x40e000) == 0x0000))
		{
			//illegal WRAM->WRAM transfer (bus conflict)
			//read most likely occurs; no write occurs
			//read is irrelevant, as it cannot be observed by software
			return;
		}
		else
		{
			space.write_byte(bbus, abus_read(space, abus));
			return;
		}
	}'};
MERGE (n:KG {id: 'handler:snes_state.snes_nmi_tick'}) SET n:Handler SET n += {method: 'snes_nmi_tick', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 55, sourceColumn: 1, sourceEndLine: 59, sourceConstants: ['ASSERT_LINE=1', 'G65816_LINE_NMI=1'], sourceParameters: 'int param', sourceBody: '// pull NMI
	m_maincpu->set_input_line(G65816_LINE_NMI, ASSERT_LINE);'};
MERGE (n:KG {id: 'handler:snes_state.snes_hirq_tick_callback'}) SET n:Handler SET n += {method: 'snes_hirq_tick_callback', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 70, sourceColumn: 1, sourceEndLine: 73, sourceParameters: 'int param', sourceBody: 'hirq_tick();'};
MERGE (n:KG {id: 'handler:snes_state.snes_update_io'}) SET n:Handler SET n += {method: 'snes_update_io', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 87, sourceColumn: 1, sourceEndLine: 91, sourceConstants: ['HVBJOY=16914'], sourceParameters: 'int param', sourceBody: 'io_read();
	m_cpu_regs[(HVBJOY) - 0x4200] &= 0xfe;       /* Clear busy bit */'};
MERGE (n:KG {id: 'handler:snes_state.io_read'}) SET n:Handler SET n += {method: 'io_read', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1085, sourceColumn: 1, sourceEndLine: 943, sourceConstants: ['NMITIMEN=16896', 'JOY1L=16920', 'JOY1H=16921', 'JOY2L=16922', 'JOY2H=16923', 'JOY3L=16924', 'JOY3H=16925', 'JOY4L=16926', 'JOY4H=16927'], sourceParameters: '', sourceBody: '// is automatic reading on? if so, read 16bits from oldjoy1/2
	if (m_cpu_regs[(NMITIMEN) - 0x4200] & 1)
	{
		uint16_t joy1 = 0, joy2 = 0, joy3 = 0, joy4 = 0;
		m_ctrl1->port_poll();
		m_ctrl2->port_poll();

		for (int i = 0; i < 16; i++)
		{
			joy1 |= ((m_ctrl1->read_pin4() & 1) << (15 - i));
			joy2 |= ((m_ctrl2->read_pin4() & 1) << (15 - i));
			joy3 |= ((m_ctrl1->read_pin5() & 1) << (15 - i));
			joy4 |= ((m_ctrl2->read_pin5() & 1) << (15 - i));
		}

		m_cpu_regs[(JOY1L) - 0x4200] = (joy1 & 0x00ff) >> 0;
		m_cpu_regs[(JOY1H) - 0x4200] = (joy1 & 0xff00) >> 8;
		m_cpu_regs[(JOY2L) - 0x4200] = (joy2 & 0x00ff) >> 0;
		m_cpu_regs[(JOY2H) - 0x4200] = (joy2 & 0xff00) >> 8;
		m_cpu_regs[(JOY3L) - 0x4200] = (joy3 & 0x00ff) >> 0;
		m_cpu_regs[(JOY3H) - 0x4200] = (joy3 & 0xff00) >> 8;
		m_cpu_regs[(JOY4L) - 0x4200] = (joy4 & 0x00ff) >> 0;
		m_cpu_regs[(JOY4H) - 0x4200] = (joy4 & 0xff00) >> 8;
	}', dispatchedFrom: 'snes_console_state'};
MERGE (n:KG {id: 'handler:snes_state.snes_reset_oam_address'}) SET n:Handler SET n += {method: 'snes_reset_oam_address', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 75, sourceColumn: 1, sourceEndLine: 79, sourceParameters: 'int param', sourceBody: 'if (!m_ppu->screen_disabled()) //Reset OAM address, byuu says it happens at H=10
		m_ppu->oam_address_reset();'};
MERGE (n:KG {id: 'handler:snes_state.snes_reset_hdma'}) SET n:Handler SET n += {method: 'snes_reset_hdma', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 81, sourceColumn: 1, sourceEndLine: 85, sourceParameters: 'int param', sourceBody: 'address_space &cpu0space = m_maincpu->space(AS_PROGRAM);
	hdma_init(cpu0space);'};
MERGE (n:KG {id: 'machine:snes_console_state.snes'}) SET n:MachineConfig SET n += {cls: 'snes_console_state', name: 'snes', calls: [], armedTimers: ['m_scanline_timer=snes_state.snes_scanline_tick@snes_state.snes_init_timers', 'm_hblank_timer=snes_state.snes_hblank_tick@snes_state.snes_init_timers', 'm_nmi_timer=snes_state.snes_nmi_tick@snes_state.snes_init_timers', 'm_hirq_timer=snes_state.snes_hirq_tick_callback@snes_state.snes_init_timers', 'm_io_timer=snes_state.snes_update_io@snes_state.snes_init_timers', 'm_oam_reset_addr_timer=snes_state.snes_reset_oam_address@snes_state.snes_init_timers', 'm_hdma_reset_timer=snes_state.snes_reset_hdma@snes_state.snes_init_timers'], preciseTimers: ['m_hblank_timer', 'm_nmi_timer', 'm_hirq_timer', 'm_io_timer', 'm_oam_reset_addr_timer'], stateMembers: ['{"name":"m_hblank_offset","bits":16}', '{"name":"m_wram_address","bits":32}', '{"name":"m_htime","bits":16}', '{"name":"m_vtime","bits":16}', '{"name":"m_is_pal","bits":1}', '{"name":"m_is_nss","bits":8}', '{"name":"m_input_disabled","bits":8}', '{"name":"m_game_over_flag","bits":8}', '{"name":"m_joy_flag","bits":8}', '{"name":"m_is_sfcbox","bits":8}', '{"name":"m_hdmaen","bits":8}', '{"name":"m_dma_regs","bits":8,"arrayLength":128}', '{"name":"m_cpu_regs","bits":8,"arrayLength":32}', '{"name":"m_oldjoy1_latch","bits":8}', '{"name":"m_data1","bits":16,"arrayLength":4}', '{"name":"m_data2","bits":16,"arrayLength":4}', '{"name":"m_read_idx","bits":8,"arrayLength":4}', '{"name":"m_dma_channel","fields":[{"name":"dmap","bits":8},{"name":"dest_addr","bits":8},{"name":"src_addr","bits":16},{"name":"trans_size","bits":16},{"name":"bank","bits":8},{"name":"ibank","bits":8},{"name":"hdma_addr","bits":16},{"name":"hdma_iaddr","bits":16},{"name":"hdma_line_counter","bits":8},{"name":"unk","bits":8},{"name":"do_transfer","bits":32,"signed":true},{"name":"dma_disabled","bits":32,"signed":true}],"arrayLength":8}', '{"name":"m_type","bits":32,"signed":true}'], perfectQuantum: true, perfectQuantumDevice: 'm_maincpu', driverTimers: ['m_scanline_timer=snes_state.snes_scanline_tick', 'm_hblank_timer=snes_state.snes_hblank_tick', 'm_nmi_timer=snes_state.snes_nmi_tick', 'm_hirq_timer=snes_state.snes_hirq_tick_callback', 'm_io_timer=snes_state.snes_update_io', 'm_oam_reset_addr_timer=snes_state.snes_reset_oam_address', 'm_hdma_reset_timer=snes_state.snes_reset_hdma'], resetHandlers: ['snes_console_state.machine_reset'], startHandlers: ['snes_console_state.machine_start'], sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1333, sourceColumn: 1, sourceEndLine: 1384};
MERGE (n:KG {id: 'handler:snes_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1327, sourceColumn: 1, sourceEndLine: 1102, sourceParameters: '', sourceBody: 'snes_state::machine_reset__base();', dispatchedFrom: 'snes_console_state'};
MERGE (n:KG {id: 'handler:snes_console_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1327, sourceColumn: 1, sourceEndLine: 1330, sourceParameters: '', sourceBody: 'snes_state::machine_reset();'};
MERGE (n:KG {id: 'handler:snes_state.snes_init_ram'}) SET n:Handler SET n += {method: 'snes_init_ram', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 1003, sourceColumn: 1, sourceEndLine: 1030, sourceConstants: ['SNES_VTOTAL_NTSC=262', 'SNES_VTOTAL_PAL=312', 'WRIO=16897', 'JOY1L=16920', 'JOY1H=16921', 'JOY2L=16922', 'JOY2H=16923', 'JOY3L=16924', 'JOY3H=16925', 'JOY4L=16926', 'JOY4H=16927'], sourceParameters: '', sourceBody: 'int i;

	/* Init work RAM - 0x55 isn\'t exactly right but it\'s close */
	/* make sure it happens to the 65816 (CPU 0) */
	const size_t size = m_wram.bytes();
	for (i = 0; i < size; i++)
	{
		m_wram[i] = 0x55;
	}

	/* Inititialize registers/variables */
	m_cpu_regs[(JOY1L) - 0x4200] = m_cpu_regs[(JOY1H) - 0x4200] = 0;
	m_cpu_regs[(JOY2L) - 0x4200] = m_cpu_regs[(JOY2H) - 0x4200] = 0;
	m_cpu_regs[(JOY3L) - 0x4200] = m_cpu_regs[(JOY3H) - 0x4200] = 0;
	m_cpu_regs[(JOY4L) - 0x4200] = m_cpu_regs[(JOY4H) - 0x4200] = 0;
	m_data1[0] = m_data2[0] = m_data1[1] = m_data2[1] = 0;

	// set up some known register power-up defaults
	m_cpu_regs[(WRIO) - 0x4200] = 0xff;

	// init frame counter so first line is 0
	if (m_screen->frame_period().as_hz() >= 59.0)
		m_ppu->set_current_vert(SNES_VTOTAL_NTSC);
	else
		m_ppu->set_current_vert(SNES_VTOTAL_PAL);'};
MERGE (n:KG {id: 'handler:snes_state.machine_start'}) SET n:Handler SET n += {method: 'machine_start', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1182, sourceColumn: 1, sourceEndLine: 1076, sourceConstants: ['SNES_MODE20=0', 'SNES_MODE21=1', 'SNES_CX4=4', 'SNES_DSP=5', 'SNES_DSP_2MB=6', 'SNES_DSP_MODE21=7', 'SNES_DSP4=8', 'SNES_OBC1=9', 'SNES_SA1=10', 'SNES_SDD1=11', 'SNES_GSU1=12', 'SNES_GSU2=13', 'SNES_SPC7110=14', 'SNES_SPC7110_RTC=15', 'SNES_SRTC=16', 'SNES_ST010=17', 'SNES_ST011=18', 'SNES_ST018=19', 'SNES_Z80GB=20', 'SNES_PFEST94=21', 'SNES_BSX=22', 'SNES_BSXLO=23', 'SNES_BSXHI=24', 'SNES_SUFAMITURBO=26', 'SNES_POKEMON=28', 'SNES_TEKKEN2=29', 'SNES_SOULBLAD=30', 'SNES_MCPIR1=31', 'SNES_MCPIR2=32', 'SNES_20COL=33', 'SNES_BANANA=34', 'SNES_BUGS=35'], sourceParameters: '', sourceBody: 'snes_state::machine_start__base();

	if (m_cartslot && m_cartslot->exists())
	{
		m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x000000, 0x7dffff, read8m_delegate(*this, FUNC(snes_console_state::snes20_lo_r)), write8m_delegate(*this, FUNC(snes_console_state::snes20_lo_w)));
		m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x800000, 0xffffff, read8m_delegate(*this, FUNC(snes_console_state::snes20_hi_r)), write8m_delegate(*this, FUNC(snes_console_state::snes20_hi_w)));
		m_maincpu->set_5a22_map();

		m_type = m_cartslot->get_type();

		switch (m_type)
		{
			// LoROM & LoROM + addons
			case SNES_MODE20:
			case SNES_BSXLO:
			case SNES_SUFAMITURBO:
			case SNES_CX4:      // this still uses the old simulation instead of emulating the CPU
			case SNES_ST010:    // this requires two diff kinds of chip access, so we handle it in snes20_lo/hi_r/w
			case SNES_ST011:    // this requires two diff kinds of chip access, so we handle it in snes20_lo/hi_r/w
				break;
			case SNES_ST018:
				m_maincpu->space(AS_PROGRAM).install_read_handler(0x003800, 0x0038ff, 0, 0xbf0000, 0, read8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_read)));
				m_maincpu->space(AS_PROGRAM).install_write_handler(0x003800, 0x0038ff, 0, 0xbf0000, 0, write8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_write)));
				break;
			case SNES_Z80GB:      // skeleton support
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x000000, 0x7dffff, read8m_delegate(*this, FUNC(snes_console_state::snessgb_lo_r)), write8m_delegate(*this, FUNC(snes_console_state::snessgb_lo_w)));
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x800000, 0xffffff, read8m_delegate(*this, FUNC(snes_console_state::snessgb_hi_r)), write8m_delegate(*this, FUNC(snes_console_state::snessgb_hi_w)));
				m_maincpu->set_5a22_map();
				break;
			case SNES_SA1:      // skeleton support
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x000000, 0x7dffff, read8m_delegate(*this, FUNC(snes_console_state::snessa1_lo_r)), write8m_delegate(*this, FUNC(snes_console_state::snessa1_lo_w)));
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x800000, 0xffffff, read8m_delegate(*this, FUNC(snes_console_state::snessa1_hi_r)), write8m_delegate(*this, FUNC(snes_console_state::snessa1_hi_w)));
				m_maincpu->set_5a22_map();
				break;
			case SNES_DSP:
				m_maincpu->space(AS_PROGRAM).install_read_handler(0x208000, 0x20ffff, 0, 0x9f0000, 0, read8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_read)));
				m_maincpu->space(AS_PROGRAM).install_write_handler(0x208000, 0x20ffff, 0, 0x9f0000, 0, write8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_write)));
				break;
			case SNES_DSP_2MB:
				m_maincpu->space(AS_PROGRAM).install_read_handler(0x600000, 0x607fff, 0, 0x8f0000, 0, read8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_read)));
				m_maincpu->space(AS_PROGRAM).install_write_handler(0x600000, 0x607fff, 0, 0x8f0000, 0, write8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_write)));
				break;
			case SNES_DSP4:
				m_maincpu->space(AS_PROGRAM).install_read_handler(0x308000, 0x30ffff, 0, 0x8f0000, 0, read8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_read)));
				m_maincpu->space(AS_PROGRAM).install_write_handler(0x308000, 0x30ffff, 0, 0x8f0000, 0, write8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_write)));
				break;
			case SNES_OBC1:
				m_maincpu->space(AS_PROGRAM).install_read_handler(0x006000, 0x007fff, 0, 0xbf0000, 0, read8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_read)));
				m_maincpu->space(AS_PROGRAM).install_write_handler(0x006000, 0x007fff, 0, 0xbf0000, 0, write8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_write)));
				break;
			case SNES_GSU1:
			case SNES_GSU2:
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x000000, 0x7dffff, read8m_delegate(*this, FUNC(snes_console_state::snessfx_lo_r)), write8m_delegate(*this, FUNC(snes_console_state::snessfx_lo_w)));
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x800000, 0xffffff, read8m_delegate(*this, FUNC(snes_console_state::snessfx_hi_r)), write8m_delegate(*this, FUNC(snes_console_state::snessfx_hi_w)));
				m_maincpu->set_5a22_map();
				break;
			case SNES_SDD1:
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x000000, 0x7dffff, read8m_delegate(*this, FUNC(snes_console_state::snessdd1_lo_r)), write8m_delegate(*this, FUNC(snes_console_state::snessdd1_lo_w)));
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x800000, 0xffffff, read8m_delegate(*this, FUNC(snes_console_state::snessdd1_hi_r)), write8m_delegate(*this, FUNC(snes_console_state::snessdd1_hi_w)));
				m_maincpu->set_5a22_map();
				break;
			case SNES_BSX:
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x000000, 0x7dffff, read8m_delegate(*this, FUNC(snes_console_state::snesbsx_lo_r)), write8m_delegate(*this, FUNC(snes_console_state::snesbsx_lo_w)));
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x800000, 0xffffff, read8m_delegate(*this, FUNC(snes_console_state::snesbsx_hi_r)), write8m_delegate(*this, FUNC(snes_console_state::snesbsx_hi_w)));
				m_maincpu->set_5a22_map();
				break;
			// HiROM & HiROM + addons
			case SNES_MODE21:
			case SNES_BSXHI:
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x000000, 0x7dffff, read8m_delegate(*this, FUNC(snes_console_state::snes21_lo_r)), write8m_delegate(*this, FUNC(snes_console_state::snes21_lo_w)));
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x800000, 0xffffff, read8m_delegate(*this, FUNC(snes_console_state::snes21_hi_r)), write8m_delegate(*this, FUNC(snes_console_state::snes21_hi_w)));
				m_maincpu->set_5a22_map();
				break;
			case SNES_DSP_MODE21:
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x000000, 0x7dffff, read8m_delegate(*this, FUNC(snes_console_state::snes21_lo_r)), write8m_delegate(*this, FUNC(snes_console_state::snes21_lo_w)));
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x800000, 0xffffff, read8m_delegate(*this, FUNC(snes_console_state::snes21_hi_r)), write8m_delegate(*this, FUNC(snes_console_state::snes21_hi_w)));
				m_maincpu->space(AS_PROGRAM).install_read_handler(0x006000, 0x007fff, 0, 0x9f0000, 0, read8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_read)));
				m_maincpu->space(AS_PROGRAM).install_write_handler(0x006000, 0x007fff, 0, 0x9f0000, 0, write8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_write)));
				m_maincpu->set_5a22_map();
				break;
			case SNES_SRTC:
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x000000, 0x7dffff, read8m_delegate(*this, FUNC(snes_console_state::snes21_lo_r)), write8m_delegate(*this, FUNC(snes_console_state::snes21_lo_w)));
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x800000, 0xffffff, read8m_delegate(*this, FUNC(snes_console_state::snes21_hi_r)), write8m_delegate(*this, FUNC(snes_console_state::snes21_hi_w)));
				m_maincpu->space(AS_PROGRAM).install_read_handler(0x002800, 0x002800, 0, 0xbf0000, 0, read8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_read)));
				m_maincpu->space(AS_PROGRAM).install_write_handler(0x002801, 0x002801, 0, 0xbf0000, 0, write8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_write)));
				m_maincpu->set_5a22_map();
				break;
			case SNES_SPC7110:
			case SNES_SPC7110_RTC:
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x000000, 0x7dffff, read8m_delegate(*this, FUNC(snes_console_state::snes7110_lo_r)), write8m_delegate(*this, FUNC(snes_console_state::snes7110_lo_w)));
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x800000, 0xffffff, read8m_delegate(*this, FUNC(snes_console_state::snes7110_hi_r)), write8m_delegate(*this, FUNC(snes_console_state::snes7110_hi_w)));
				m_maincpu->set_5a22_map();
				break;
			case SNES_PFEST94:
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x000000, 0x7dffff, read8m_delegate(*this, FUNC(snes_console_state::pfest94_lo_r)), write8m_delegate(*this, FUNC(snes_console_state::pfest94_lo_w)));
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x800000, 0xffffff, read8m_delegate(*this, FUNC(snes_console_state::pfest94_hi_r)), write8m_delegate(*this, FUNC(snes_console_state::pfest94_hi_w)));
				m_maincpu->set_5a22_map();
				break;
			// pirate \'mappers\'
			case SNES_POKEMON:
				m_maincpu->space(AS_PROGRAM).install_read_handler(0x800000, 0x80ffff, 0, 0x780000, 0, read8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_read)));
				m_maincpu->space(AS_PROGRAM).install_write_handler(0x800000, 0x80ffff, 0, 0x780000, 0, write8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_write)));
				break;
			case SNES_TEKKEN2:
				m_maincpu->space(AS_PROGRAM).install_read_handler(0x808000, 0x8087ff, 0, 0x3f0000, 0, read8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_read)));
				m_maincpu->space(AS_PROGRAM).install_write_handler(0x808000, 0x8087ff, 0, 0x3f0000, 0, write8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_write)));
				break;
			case SNES_MCPIR1:
			case SNES_MCPIR2:
				m_maincpu->space(AS_PROGRAM).install_write_handler(0xffff00, 0xffffff, write8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_write)));
				break;
			case SNES_20COL:
				m_maincpu->space(AS_PROGRAM).install_write_handler(0x008000, 0x008fff, write8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_write)));
				break;
			case SNES_SOULBLAD:
				// reads from xxx0-xxx3in range [80-bf] return a fixed sequence of 4bits; reads in range [c0-ff] return open bus
				m_maincpu->space(AS_PROGRAM).install_read_handler(0x808000, 0x808003, 0, 0x3f7ffc, 0, read8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_read)));
				m_maincpu->space(AS_PROGRAM).install_read_handler(0xc00000, 0xffffff, read8smo_delegate(*this, FUNC(snes_console_state::snes_open_bus_r)));
				break;
			case SNES_BUGS:
			case SNES_BANANA:
//              m_maincpu->space(AS_PROGRAM).install_read_handler(0x808000, 0x80ffff, 0, 0x780000, 0, read8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_read)));
//              m_maincpu->space(AS_PROGRAM).install_write_handler(0x808000, 0x80ffff, 0, 0x780000, 0, write8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_write)));
//              m_maincpu->set_5a22_map();
				break;
		}
		// install memory access taps (send address pin to cartridge slot)
		m_maincpu->space(AS_PROGRAM).install_readwrite_tap
		(
			0x000000, 0xffffff, "cartslot_tap",
			[this](offs_t offset, u8 &, u8)
			{
				m_cartslot->set_address(offset);
			},
			[this](offs_t offset, u8 &, u8)
			{
				m_cartslot->set_address(offset);
			}
		);
		m_cartslot->save_ram();
	}', dispatchedFrom: 'snes_console_state'};
MERGE (n:KG {id: 'handler:snes_console_state.machine_start'}) SET n:Handler SET n += {method: 'machine_start', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1182, sourceColumn: 1, sourceEndLine: 1325, sourceConstants: ['SNES_MODE20=0', 'SNES_MODE21=1', 'SNES_CX4=4', 'SNES_DSP=5', 'SNES_DSP_2MB=6', 'SNES_DSP_MODE21=7', 'SNES_DSP4=8', 'SNES_OBC1=9', 'SNES_SA1=10', 'SNES_SDD1=11', 'SNES_GSU1=12', 'SNES_GSU2=13', 'SNES_SPC7110=14', 'SNES_SPC7110_RTC=15', 'SNES_SRTC=16', 'SNES_ST010=17', 'SNES_ST011=18', 'SNES_ST018=19', 'SNES_Z80GB=20', 'SNES_PFEST94=21', 'SNES_BSX=22', 'SNES_BSXLO=23', 'SNES_BSXHI=24', 'SNES_SUFAMITURBO=26', 'SNES_POKEMON=28', 'SNES_TEKKEN2=29', 'SNES_SOULBLAD=30', 'SNES_MCPIR1=31', 'SNES_MCPIR2=32', 'SNES_20COL=33', 'SNES_BANANA=34', 'SNES_BUGS=35'], sourceParameters: '', sourceBody: 'snes_state::machine_start();

	if (m_cartslot && m_cartslot->exists())
	{
		m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x000000, 0x7dffff, read8m_delegate(*this, FUNC(snes_console_state::snes20_lo_r)), write8m_delegate(*this, FUNC(snes_console_state::snes20_lo_w)));
		m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x800000, 0xffffff, read8m_delegate(*this, FUNC(snes_console_state::snes20_hi_r)), write8m_delegate(*this, FUNC(snes_console_state::snes20_hi_w)));
		m_maincpu->set_5a22_map();

		m_type = m_cartslot->get_type();

		switch (m_type)
		{
			// LoROM & LoROM + addons
			case SNES_MODE20:
			case SNES_BSXLO:
			case SNES_SUFAMITURBO:
			case SNES_CX4:      // this still uses the old simulation instead of emulating the CPU
			case SNES_ST010:    // this requires two diff kinds of chip access, so we handle it in snes20_lo/hi_r/w
			case SNES_ST011:    // this requires two diff kinds of chip access, so we handle it in snes20_lo/hi_r/w
				break;
			case SNES_ST018:
				m_maincpu->space(AS_PROGRAM).install_read_handler(0x003800, 0x0038ff, 0, 0xbf0000, 0, read8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_read)));
				m_maincpu->space(AS_PROGRAM).install_write_handler(0x003800, 0x0038ff, 0, 0xbf0000, 0, write8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_write)));
				break;
			case SNES_Z80GB:      // skeleton support
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x000000, 0x7dffff, read8m_delegate(*this, FUNC(snes_console_state::snessgb_lo_r)), write8m_delegate(*this, FUNC(snes_console_state::snessgb_lo_w)));
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x800000, 0xffffff, read8m_delegate(*this, FUNC(snes_console_state::snessgb_hi_r)), write8m_delegate(*this, FUNC(snes_console_state::snessgb_hi_w)));
				m_maincpu->set_5a22_map();
				break;
			case SNES_SA1:      // skeleton support
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x000000, 0x7dffff, read8m_delegate(*this, FUNC(snes_console_state::snessa1_lo_r)), write8m_delegate(*this, FUNC(snes_console_state::snessa1_lo_w)));
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x800000, 0xffffff, read8m_delegate(*this, FUNC(snes_console_state::snessa1_hi_r)), write8m_delegate(*this, FUNC(snes_console_state::snessa1_hi_w)));
				m_maincpu->set_5a22_map();
				break;
			case SNES_DSP:
				m_maincpu->space(AS_PROGRAM).install_read_handler(0x208000, 0x20ffff, 0, 0x9f0000, 0, read8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_read)));
				m_maincpu->space(AS_PROGRAM).install_write_handler(0x208000, 0x20ffff, 0, 0x9f0000, 0, write8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_write)));
				break;
			case SNES_DSP_2MB:
				m_maincpu->space(AS_PROGRAM).install_read_handler(0x600000, 0x607fff, 0, 0x8f0000, 0, read8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_read)));
				m_maincpu->space(AS_PROGRAM).install_write_handler(0x600000, 0x607fff, 0, 0x8f0000, 0, write8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_write)));
				break;
			case SNES_DSP4:
				m_maincpu->space(AS_PROGRAM).install_read_handler(0x308000, 0x30ffff, 0, 0x8f0000, 0, read8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_read)));
				m_maincpu->space(AS_PROGRAM).install_write_handler(0x308000, 0x30ffff, 0, 0x8f0000, 0, write8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_write)));
				break;
			case SNES_OBC1:
				m_maincpu->space(AS_PROGRAM).install_read_handler(0x006000, 0x007fff, 0, 0xbf0000, 0, read8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_read)));
				m_maincpu->space(AS_PROGRAM).install_write_handler(0x006000, 0x007fff, 0, 0xbf0000, 0, write8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_write)));
				break;
			case SNES_GSU1:
			case SNES_GSU2:
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x000000, 0x7dffff, read8m_delegate(*this, FUNC(snes_console_state::snessfx_lo_r)), write8m_delegate(*this, FUNC(snes_console_state::snessfx_lo_w)));
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x800000, 0xffffff, read8m_delegate(*this, FUNC(snes_console_state::snessfx_hi_r)), write8m_delegate(*this, FUNC(snes_console_state::snessfx_hi_w)));
				m_maincpu->set_5a22_map();
				break;
			case SNES_SDD1:
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x000000, 0x7dffff, read8m_delegate(*this, FUNC(snes_console_state::snessdd1_lo_r)), write8m_delegate(*this, FUNC(snes_console_state::snessdd1_lo_w)));
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x800000, 0xffffff, read8m_delegate(*this, FUNC(snes_console_state::snessdd1_hi_r)), write8m_delegate(*this, FUNC(snes_console_state::snessdd1_hi_w)));
				m_maincpu->set_5a22_map();
				break;
			case SNES_BSX:
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x000000, 0x7dffff, read8m_delegate(*this, FUNC(snes_console_state::snesbsx_lo_r)), write8m_delegate(*this, FUNC(snes_console_state::snesbsx_lo_w)));
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x800000, 0xffffff, read8m_delegate(*this, FUNC(snes_console_state::snesbsx_hi_r)), write8m_delegate(*this, FUNC(snes_console_state::snesbsx_hi_w)));
				m_maincpu->set_5a22_map();
				break;
			// HiROM & HiROM + addons
			case SNES_MODE21:
			case SNES_BSXHI:
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x000000, 0x7dffff, read8m_delegate(*this, FUNC(snes_console_state::snes21_lo_r)), write8m_delegate(*this, FUNC(snes_console_state::snes21_lo_w)));
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x800000, 0xffffff, read8m_delegate(*this, FUNC(snes_console_state::snes21_hi_r)), write8m_delegate(*this, FUNC(snes_console_state::snes21_hi_w)));
				m_maincpu->set_5a22_map();
				break;
			case SNES_DSP_MODE21:
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x000000, 0x7dffff, read8m_delegate(*this, FUNC(snes_console_state::snes21_lo_r)), write8m_delegate(*this, FUNC(snes_console_state::snes21_lo_w)));
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x800000, 0xffffff, read8m_delegate(*this, FUNC(snes_console_state::snes21_hi_r)), write8m_delegate(*this, FUNC(snes_console_state::snes21_hi_w)));
				m_maincpu->space(AS_PROGRAM).install_read_handler(0x006000, 0x007fff, 0, 0x9f0000, 0, read8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_read)));
				m_maincpu->space(AS_PROGRAM).install_write_handler(0x006000, 0x007fff, 0, 0x9f0000, 0, write8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_write)));
				m_maincpu->set_5a22_map();
				break;
			case SNES_SRTC:
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x000000, 0x7dffff, read8m_delegate(*this, FUNC(snes_console_state::snes21_lo_r)), write8m_delegate(*this, FUNC(snes_console_state::snes21_lo_w)));
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x800000, 0xffffff, read8m_delegate(*this, FUNC(snes_console_state::snes21_hi_r)), write8m_delegate(*this, FUNC(snes_console_state::snes21_hi_w)));
				m_maincpu->space(AS_PROGRAM).install_read_handler(0x002800, 0x002800, 0, 0xbf0000, 0, read8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_read)));
				m_maincpu->space(AS_PROGRAM).install_write_handler(0x002801, 0x002801, 0, 0xbf0000, 0, write8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_write)));
				m_maincpu->set_5a22_map();
				break;
			case SNES_SPC7110:
			case SNES_SPC7110_RTC:
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x000000, 0x7dffff, read8m_delegate(*this, FUNC(snes_console_state::snes7110_lo_r)), write8m_delegate(*this, FUNC(snes_console_state::snes7110_lo_w)));
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x800000, 0xffffff, read8m_delegate(*this, FUNC(snes_console_state::snes7110_hi_r)), write8m_delegate(*this, FUNC(snes_console_state::snes7110_hi_w)));
				m_maincpu->set_5a22_map();
				break;
			case SNES_PFEST94:
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x000000, 0x7dffff, read8m_delegate(*this, FUNC(snes_console_state::pfest94_lo_r)), write8m_delegate(*this, FUNC(snes_console_state::pfest94_lo_w)));
				m_maincpu->space(AS_PROGRAM).install_readwrite_handler(0x800000, 0xffffff, read8m_delegate(*this, FUNC(snes_console_state::pfest94_hi_r)), write8m_delegate(*this, FUNC(snes_console_state::pfest94_hi_w)));
				m_maincpu->set_5a22_map();
				break;
			// pirate \'mappers\'
			case SNES_POKEMON:
				m_maincpu->space(AS_PROGRAM).install_read_handler(0x800000, 0x80ffff, 0, 0x780000, 0, read8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_read)));
				m_maincpu->space(AS_PROGRAM).install_write_handler(0x800000, 0x80ffff, 0, 0x780000, 0, write8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_write)));
				break;
			case SNES_TEKKEN2:
				m_maincpu->space(AS_PROGRAM).install_read_handler(0x808000, 0x8087ff, 0, 0x3f0000, 0, read8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_read)));
				m_maincpu->space(AS_PROGRAM).install_write_handler(0x808000, 0x8087ff, 0, 0x3f0000, 0, write8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_write)));
				break;
			case SNES_MCPIR1:
			case SNES_MCPIR2:
				m_maincpu->space(AS_PROGRAM).install_write_handler(0xffff00, 0xffffff, write8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_write)));
				break;
			case SNES_20COL:
				m_maincpu->space(AS_PROGRAM).install_write_handler(0x008000, 0x008fff, write8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_write)));
				break;
			case SNES_SOULBLAD:
				// reads from xxx0-xxx3in range [80-bf] return a fixed sequence of 4bits; reads in range [c0-ff] return open bus
				m_maincpu->space(AS_PROGRAM).install_read_handler(0x808000, 0x808003, 0, 0x3f7ffc, 0, read8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_read)));
				m_maincpu->space(AS_PROGRAM).install_read_handler(0xc00000, 0xffffff, read8smo_delegate(*this, FUNC(snes_console_state::snes_open_bus_r)));
				break;
			case SNES_BUGS:
			case SNES_BANANA:
//              m_maincpu->space(AS_PROGRAM).install_read_handler(0x808000, 0x80ffff, 0, 0x780000, 0, read8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_read)));
//              m_maincpu->space(AS_PROGRAM).install_write_handler(0x808000, 0x80ffff, 0, 0x780000, 0, write8sm_delegate(*m_cartslot, FUNC(base_sns_cart_slot_device::chip_write)));
//              m_maincpu->set_5a22_map();
				break;
		}
		// install memory access taps (send address pin to cartridge slot)
		m_maincpu->space(AS_PROGRAM).install_readwrite_tap
		(
			0x000000, 0xffffff, "cartslot_tap",
			[this](offs_t offset, u8 &, u8)
			{
				m_cartslot->set_address(offset);
			},
			[this](offs_t offset, u8 &, u8)
			{
				m_cartslot->set_address(offset);
			}
		);
		m_cartslot->save_ram();
	}'};
MERGE (n:KG {id: 'handler:snes_console_state.snes20_lo_r'}) SET n:Handler SET n += {method: 'snes20_lo_r', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 228, sourceColumn: 1, sourceEndLine: 283, sourceConstants: ['SNES_CX4=4', 'SNES_ST010=17', 'SNES_ST011=18', 'SNES_SUFAMITURBO=26'], sourceParameters: 'address_space &space, offs_t offset', sourceBody: 'uint16_t address = offset & 0xffff;

	// take care of add-on IO
	if ((m_cartslot->get_type() == SNES_ST010 /*|| m_cartslot->get_type() == SNES_ST011*/) // why does this break moritash?
		&& (offset >= 0x600000 && offset < 0x680000 && (offset & 0xffff) < 0x4000))
		return m_cartslot->chip_read(offset);
	else if ((m_cartslot->get_type() == SNES_ST010 || m_cartslot->get_type() == SNES_ST011)
				&& (offset >= 0x680000 && offset < 0x700000 && (offset & 0xffff) < 0x8000))
		return m_cartslot->chip_read(offset);
	else if (m_cartslot->get_type() == SNES_CX4
				&& (offset < 0x400000 && (offset & 0xffff) >= 0x6000 && (offset & 0xffff) < 0x8000))    // hack until we emulate the real CPU
		return CX4_read((offset & 0xffff) - 0x6000);

	if (offset < 0x400000)
	{
		if (address < 0x2000)
			return m_wram[address];
		else if (address < 0x6000)
			return snes_r_io(address);
		else if (address < 0x8000)
			return snes_open_bus_r();
		else
			return m_cartslot->read_l(offset);
	}
	else if (offset < 0x700000)
	{
		if (address < 0x8000)
			return snes_open_bus_r();
		else
			return m_cartslot->read_l(offset);
	}
	else
	{
		if (m_type == SNES_SUFAMITURBO && address >= 0x8000 && offset < 0x740000)
			return m_cartslot->read_l(offset);

		// here usually there is SRAM mirrored in the whole range, but if ROM is very large then arrives here too (see tokimeki and wizardg4)
		if (m_cartslot->m_cart->get_rom_size() > 0x200000 && address >= 0x8000)
			return m_cartslot->read_l(offset);
		else
		{
			if (m_cartslot->m_cart->get_nvram_size() > 0x8000)
			{
				// In this case, SRAM is mapped in 0x8000 chunks at diff offsets: 0x700000-0x707fff, 0x710000-0x717fff, etc.
				offset = ((offset - 0x700000) / 0x10000) * 0x8000 + (offset & 0x7fff);
				return m_cartslot->read_ram(offset);
			}
			else if (m_cartslot->m_cart->get_nvram_size() > 0)
				return m_cartslot->read_ram(offset);
			else
				return snes_open_bus_r();
		}
	}', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:.CX4_read'}) SET n:Handler SET n += {method: 'CX4_read', ownerClass: '', sourceFile: 'src/mame/nintendo/snescx4.cpp', sourceLine: 212, sourceColumn: 1, sourceEndLine: 227, sourceParameters: 'uint32_t addr', sourceBody: 'addr &= 0x1fff;

	if(addr < 0x0c00)
	{
		return cx4.ram[addr];
	}

	if(addr >= 0x1f00)
	{
		return cx4.reg[addr & 0xff];
	}

	return 0xff;'};
MERGE (n:KG {id: 'handler:snes_state.snes_r_io'}) SET n:Handler SET n += {method: 'snes_r_io', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 346, sourceColumn: 1, sourceEndLine: 433, sourceConstants: ['I=0', 'INIDISP=8448', 'APU00=8512', 'WMDATA=8576', 'OLDJOY1=16406', 'OLDJOY2=16407', 'WRIO=16897', 'RDNMI=16912', 'TIMEUP=16913', 'HVBJOY=16914', 'RDIO=16915', 'JOY1L=16920', 'JOY1H=16921', 'JOY2L=16922', 'JOY2H=16923', 'JOY3L=16924', 'JOY3H=16925', 'JOY4L=16926', 'JOY4H=16927', 'DMAP0=17152'], sourceParameters: 'offs_t offset', sourceBody: 'uint8_t value = 0;

	// PPU accesses are from 2100 to 213f
	if (offset >= INIDISP && offset < APU00)
	{
		return m_ppu->read(offset, m_cpu_regs[(WRIO) - 0x4200] & 0x80);
	}

	// APU is mirrored from 2140 to 217f
	if (offset >= APU00 && offset < WMDATA)
	{
		return m_soundcpu->spc_port_out_r(offset & 0x3);
	}

	// DMA accesses are from 4300 to 437f
	if (offset >= DMAP0 && offset < 0x4380)
	{
		return snes_io_dma_r(offset);
	}


	// other accesses (notice that WRMPYA, WRMPYB, WRDIVL, WRDIVH, WRDVDD, MEMSEL, RDDIVL, RDDIVH, RDMPYL, RDMPYH are handled by the CPU directly)
	switch (offset) // offset is from 0x000000
	{
		case WMDATA:    /* Data to read from WRAM */
			value = m_wram[m_wram_address];
			if (!machine().side_effects_disabled())
				m_wram_address = (m_wram_address + 1) & 0x1ffff;
			return value;

		case OLDJOY1:   /* Data for old NES controllers (JOYSER1) */
			return (oldjoy1_read(m_oldjoy1_latch & 0x1) & 0x03) | (snes_open_bus_r() & 0xfc);

		case OLDJOY2:   /* Data for old NES controllers (JOYSER2) */
			return (oldjoy2_read(m_oldjoy1_latch & 0x1) & 0x03) | 0x1c | (snes_open_bus_r() & 0xe0);

		case RDNMI:         /* NMI flag by v-blank and version number */
			value = (m_cpu_regs[(RDNMI) - 0x4200] & 0x80) | (snes_open_bus_r() & 0x70);
			if (!machine().side_effects_disabled())
				m_cpu_regs[(RDNMI) - 0x4200] &= 0x70;   /* NMI flag is reset on read */
			return value | 2; //CPU version number
		case TIMEUP:        /* IRQ flag by H/V count timer */
			value = (snes_open_bus_r() & 0x7f) | (m_cpu_regs[(TIMEUP) - 0x4200] & 0x80);
			if (!machine().side_effects_disabled())
			{
				m_cpu_regs[(TIMEUP) - 0x4200] = 0;   // flag is cleared on both read and write
				scpu_irq_refresh();
			}
			return value;
		case HVBJOY:        /* H/V blank and joypad controller enable */
			// electronics test says hcounter 272 is start of hblank, which is beampos 363
//          if (m_screen->hpos() >= 363) m_cpu_regs[(HVBJOY) - 0x4200] |= 0x40;
//              else m_cpu_regs[(HVBJOY) - 0x4200] &= ~0x40;
			return (m_cpu_regs[(HVBJOY) - 0x4200] & 0xc1) | (snes_open_bus_r() & 0x3e);
		case RDIO:          /* Programmable I/O port - echos back what\'s written to WRIO */
			return m_cpu_regs[(WRIO) - 0x4200];
		case JOY1L:         /* Joypad 1 status register (low) */
		case JOY1H:         /* Joypad 1 status register (high) */
		case JOY2L:         /* Joypad 2 status register (low) */
		case JOY2H:         /* Joypad 2 status register (high) */
		case JOY3L:         /* Joypad 3 status register (low) */
		case JOY3H:         /* Joypad 3 status register (high) */
		case JOY4L:         /* Joypad 4 status register (low) */
		case JOY4H:         /* Joypad 4 status register (high) */
			if (m_is_nss && m_input_disabled)
				return 0;
			return m_cpu_regs[(offset) - 0x4200];

		case 0x4100:        /* NSS Dip-Switches */
			if (m_is_nss)
				return ioport("DSW")->read();
			break;
//      case 0x4101: //PC: a104 - a10e - a12a   //only nss_actr (DSW actually reads in word units ...)

		default:
//          osd_printf_debug("snes_r: offset = %x pc = %x\\n",offset,m_maincpu->pc());
// Added break; after commenting above line.  If uncommenting, drop the break;
			break;
	}

//  printf("unsupported read: offset == %08x\\n", offset);

	/* Unsupported reads returns open bus */
//  printf("%02x %02x\\n",offset,snes_open_bus_r());
	return snes_open_bus_r();', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:snes_state.snes_io_dma_r'}) SET n:Handler SET n += {method: 'snes_io_dma_r', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 236, sourceColumn: 1, sourceEndLine: 280, sourceConstants: ['DMAP0=17152', 'BBAD0=17153', 'A1T0L=17154', 'A1T0H=17155', 'A1B0=17156', 'DAS0L=17157', 'DAS0H=17158', 'DSAB0=17159', 'A2A0L=17160', 'A2A0H=17161', 'NTRL0=17162', 'DMAP1=17168', 'BBAD1=17169', 'A1T1L=17170', 'A1T1H=17171', 'A1B1=17172', 'DAS1L=17173', 'DAS1H=17174', 'DSAB1=17175', 'A2A1L=17176', 'A2A1H=17177', 'NTRL1=17178', 'DMAP2=17184', 'BBAD2=17185', 'A1T2L=17186', 'A1T2H=17187', 'A1B2=17188', 'DAS2L=17189', 'DAS2H=17190', 'DSAB2=17191', 'A2A2L=17192', 'A2A2H=17193', 'NTRL2=17194', 'DMAP3=17200', 'BBAD3=17201', 'A1T3L=17202', 'A1T3H=17203', 'A1B3=17204', 'DAS3L=17205', 'DAS3H=17206', 'DSAB3=17207', 'A2A3L=17208', 'A2A3H=17209', 'NTRL3=17210', 'DMAP4=17216', 'BBAD4=17217', 'A1T4L=17218', 'A1T4H=17219', 'A1B4=17220', 'DAS4L=17221', 'DAS4H=17222', 'DSAB4=17223', 'A2A4L=17224', 'A2A4H=17225', 'NTRL4=17226', 'DMAP5=17232', 'BBAD5=17233', 'A1T5L=17234', 'A1T5H=17235', 'A1B5=17236', 'DAS5L=17237', 'DAS5H=17238', 'DSAB5=17239', 'A2A5L=17240', 'A2A5H=17241', 'NTRL5=17242', 'DMAP6=17248', 'BBAD6=17249', 'A1T6L=17250', 'A1T6H=17251', 'A1B6=17252', 'DAS6L=17253', 'DAS6H=17254', 'DSAB6=17255', 'A2A6L=17256', 'A2A6H=17257', 'NTRL6=17258', 'DMAP7=17264', 'BBAD7=17265', 'A1T7L=17266', 'A1T7H=17267', 'A1B7=17268', 'DAS7L=17269', 'DAS7H=17270', 'DSAB7=17271', 'A2A7L=17272', 'A2A7H=17273', 'NTRL7=17274'], sourceParameters: 'offs_t offset', sourceBody: 'switch (offset)
	{
		case DMAP0: case DMAP1: case DMAP2: case DMAP3: /*0x43n0*/
		case DMAP4: case DMAP5: case DMAP6: case DMAP7:
			return m_dma_channel[(offset >> 4) & 0x07].dmap;
		case BBAD0: case BBAD1: case BBAD2: case BBAD3: /*0x43n1*/
		case BBAD4: case BBAD5: case BBAD6: case BBAD7:
			return m_dma_channel[(offset >> 4) & 0x07].dest_addr;
		case A1T0L: case A1T1L: case A1T2L: case A1T3L: /*0x43n2*/
		case A1T4L: case A1T5L: case A1T6L: case A1T7L:
			return m_dma_channel[(offset >> 4) & 0x07].src_addr & 0xff;
		case A1T0H: case A1T1H: case A1T2H: case A1T3H: /*0x43n3*/
		case A1T4H: case A1T5H: case A1T6H: case A1T7H:
			return (m_dma_channel[(offset >> 4) & 0x07].src_addr >> 8) & 0xff;
		case A1B0: case A1B1: case A1B2: case A1B3:     /*0x43n4*/
		case A1B4: case A1B5: case A1B6: case A1B7:
			return m_dma_channel[(offset >> 4) & 0x07].bank;
		case DAS0L: case DAS1L: case DAS2L: case DAS3L: /*0x43n5*/
		case DAS4L: case DAS5L: case DAS6L: case DAS7L:
			return m_dma_channel[(offset >> 4) & 0x07].trans_size & 0xff;
		case DAS0H: case DAS1H: case DAS2H: case DAS3H: /*0x43n6*/
		case DAS4H: case DAS5H: case DAS6H: case DAS7H:
			return (m_dma_channel[(offset >> 4) & 0x07].trans_size >> 8) & 0xff;
		case DSAB0: case DSAB1: case DSAB2: case DSAB3: /*0x43n7*/
		case DSAB4: case DSAB5: case DSAB6: case DSAB7:
			return m_dma_channel[(offset >> 4) & 0x07].ibank;
		case A2A0L: case A2A1L: case A2A2L: case A2A3L: /*0x43n8*/
		case A2A4L: case A2A5L: case A2A6L: case A2A7L:
			return m_dma_channel[(offset >> 4) & 0x07].hdma_addr & 0xff;
		case A2A0H: case A2A1H: case A2A2H: case A2A3H: /*0x43n9*/
		case A2A4H: case A2A5H: case A2A6H: case A2A7H:
			return (m_dma_channel[(offset >> 4) & 0x07].hdma_addr >> 8) & 0xff;
		case NTRL0: case NTRL1: case NTRL2: case NTRL3: /*0x43na*/
		case NTRL4: case NTRL5: case NTRL6: case NTRL7:
			return m_dma_channel[(offset >> 4) & 0x07].hdma_line_counter;
		case 0x430b: case 0x431b: case 0x432b: case 0x433b: /* according to bsnes, this does not return open_bus (even if its precise effect is unknown) */
		case 0x434b: case 0x435b: case 0x436b: case 0x437b:
			return m_dma_channel[(offset >> 4) & 0x07].unk;
	}

	/* we should never arrive here */
	return snes_open_bus_r();', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:snes_state.snes_open_bus_r'}) SET n:Handler SET n += {method: 'snes_open_bus_r', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 220, sourceColumn: 1, sourceEndLine: 233, sourceParameters: '', sourceBody: 'static uint8_t recurse = 0;
	uint16_t result;

	/* prevent recursion */
	if (recurse)
		return 0xff;

	recurse = 1;
	result = m_maincpu->space(AS_PROGRAM).read_byte(m_maincpu->pc() - 1); //LAST opcode that\'s fetched on the bus
	recurse = 0;
	return result;', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:snes_state.oldjoy1_read'}) SET n:Handler SET n += {method: 'oldjoy1_read', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1113, sourceColumn: 1, sourceEndLine: 955, sourceParameters: 'int latched', sourceBody: 'uint8_t ret = 0;
	ret |= m_ctrl1->read_pin4();
	ret |= (m_ctrl1->read_pin5() << 1);
	return ret;', sourceReturnType: 'uint8_t', dispatchedFrom: 'snes_console_state'};
MERGE (n:KG {id: 'handler:snes_state.oldjoy2_read'}) SET n:Handler SET n += {method: 'oldjoy2_read', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1121, sourceColumn: 1, sourceEndLine: 966, sourceParameters: 'int latched', sourceBody: 'uint8_t ret = 0;
	ret |= m_ctrl2->read_pin4();
	ret |= (m_ctrl2->read_pin5() << 1);
	return ret;', sourceReturnType: 'uint8_t', dispatchedFrom: 'snes_console_state'};
MERGE (n:KG {id: 'handler:snes_console_state.snes20_lo_w'}) SET n:Handler SET n += {method: 'snes20_lo_w', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 285, sourceColumn: 1, sourceEndLine: 293, sourceConstants: ['SNES_SUFAMITURBO=26'], sourceParameters: 'address_space &space, offs_t offset, uint8_t data', sourceBody: 'if (m_type == SNES_SUFAMITURBO
		&& (offset & 0xffff) >= 0x8000 && ((offset >= 0x600000 && offset < 0x640000) || (offset >= 0x700000 && offset < 0x740000)))
	{ m_cartslot->write_l(offset, data); return; }

	// other add-on writes matches the hi handler
	snes20_hi_w(space, offset, data);'};
MERGE (n:KG {id: 'handler:snes_console_state.snes20_hi_w'}) SET n:Handler SET n += {method: 'snes20_hi_w', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 190, sourceColumn: 1, sourceEndLine: 226, sourceConstants: ['SNES_CX4=4', 'SNES_ST010=17', 'SNES_ST011=18', 'SNES_SUFAMITURBO=26'], sourceParameters: 'address_space &space, offs_t offset, uint8_t data', sourceBody: 'uint16_t address = offset & 0xffff;

	// take care of add-on IO
	if ((m_cartslot->get_type() == SNES_ST010 || m_cartslot->get_type() == SNES_ST011)
		&& (offset >= 0x600000 && offset < 0x680000 && (offset & 0xffff) < 0x4000))
	{ m_cartslot->chip_write(offset, data); return; }
	else if ((m_cartslot->get_type() == SNES_ST010 || m_cartslot->get_type() == SNES_ST011)
				&& (offset >= 0x680000 && offset < 0x700000 && (offset & 0xffff) < 0x8000))
	{ m_cartslot->chip_write(offset, data); return; }
	else if (m_cartslot->get_type() == SNES_CX4
				&& (offset < 0x400000 && (offset & 0xffff) >= 0x6000 && (offset & 0xffff) < 0x8000))    // hack until we emulate the real CPU
	{ CX4_write(space, (offset & 0xffff) - 0x6000, data); return; }
	else if (m_type == SNES_SUFAMITURBO
				&& address >= 0x8000 && ((offset >= 0x600000 && offset < 0x640000) || (offset >= 0x700000 && offset < 0x740000)))
	{ m_cartslot->write_h(offset, data); return; }

	if (offset < 0x400000)
	{
		if (address < 0x2000)
			m_wram[address] = data;
		else if (address < 0x6000)
			snes_w_io(space, address, data);
	}
	else if (offset >= 0x700000 && (m_cartslot->m_cart->get_rom_size() <= 0x200000 || address < 0x8000))    // NVRAM access
	{
		if (m_cartslot->m_cart->get_nvram_size() > 0x8000)
		{
			// In this case, SRAM is mapped in 0x8000 chunks at diff offsets: 0x700000-0x707fff, 0x710000-0x717fff, etc.
			offset = ((offset - 0x700000) / 0x10000) * 0x8000 + (offset & 0x7fff);
			m_cartslot->write_ram(offset, data);
		}
		else if (m_cartslot->m_cart->get_nvram_size() > 0)
			m_cartslot->write_ram(offset, data);
	}'};
MERGE (n:KG {id: 'handler:.CX4_write'}) SET n:Handler SET n += {method: 'CX4_write', ownerClass: '', sourceFile: 'src/mame/nintendo/snescx4.cpp', sourceLine: 120, sourceColumn: 1, sourceEndLine: 192, sourceParameters: 'address_space &space, uint32_t addr, uint8_t data', sourceBody: 'addr &= 0x1fff;

	if(addr < 0x0c00)
	{
		//ram
		cx4.ram[addr] = data;
		return;
	}

	if(addr < 0x1f00)
	{
		//unmapped
		return;
	}

	//command register
	cx4.reg[addr & 0xff] = data;

	if(addr == 0x1f47)
	{
		//memory transfer
		CX4_transfer_data(space);
		return;
	}

	if(addr == 0x1f4f)
	{
		//c4 command
		if(cx4.reg[0x4d] == 0x0e && !(data & 0xc3))
		{
			//c4 test command
			cx4.reg[0x80] = data >> 2;
			return;
		}

		switch(data)
		{
			case 0x00: CX4_op00(space); break;
			case 0x01: CX4_op01(space); break;
			case 0x05: CX4_op05(space); break;
			case 0x0d: CX4_op0d(space); break;
			case 0x10: CX4_op10(); break;
			case 0x13: CX4_op13(); break;
			case 0x15: CX4_op15(space); break;
			case 0x1f: CX4_op1f(space); break;
			case 0x22: CX4_op22(); break;
			case 0x25: CX4_op25(); break;
			case 0x2d: CX4_op2d(space); break;
			case 0x40: CX4_op40(); break;
			case 0x54: CX4_op54(); break;
			case 0x5c: CX4_op5c(); break;
			case 0x5e: CX4_op5e(); break;
			case 0x60: CX4_op60(); break;
			case 0x62: CX4_op62(); break;
			case 0x64: CX4_op64(); break;
			case 0x66: CX4_op66(); break;
			case 0x68: CX4_op68(); break;
			case 0x6a: CX4_op6a(); break;
			case 0x6c: CX4_op6c(); break;
			case 0x6e: CX4_op6e(); break;
			case 0x70: CX4_op70(); break;
			case 0x72: CX4_op72(); break;
			case 0x74: CX4_op74(); break;
			case 0x76: CX4_op76(); break;
			case 0x78: CX4_op78(); break;
			case 0x7a: CX4_op7a(); break;
			case 0x7c: CX4_op7c(); break;
			case 0x89: CX4_op89(); break;
		}
	}'};
MERGE (n:KG {id: 'handler:.CX4_transfer_data'}) SET n:Handler SET n += {method: 'CX4_transfer_data', ownerClass: '', sourceFile: 'src/mame/nintendo/snescx4.cpp', sourceLine: 101, sourceColumn: 1, sourceEndLine: 115, sourceParameters: 'address_space &space', sourceBody: 'uint32_t src;
	uint16_t dest, count;
	uint32_t i;

	src   = (cx4.reg[0x40]) | (cx4.reg[0x41] << 8) | (cx4.reg[0x42] << 16);
	count = (cx4.reg[0x43]) | (cx4.reg[0x44] << 8);
	dest  = (cx4.reg[0x45]) | (cx4.reg[0x46] << 8);

	for(i=0;i<count;i++)
	{
		CX4_write(space, dest++, space.read_byte(src++));
	}'};
MERGE (n:KG {id: 'handler:.CX4_op00'}) SET n:Handler SET n += {method: 'CX4_op00', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 16, sourceColumn: 1, sourceEndLine: 28, sourceParameters: 'address_space &space', sourceBody: 'switch(cx4.reg[0x4d])
	{
		case 0x00: CX4_op00_00(space); break;
		case 0x03: CX4_op00_03(); break;
		case 0x05: CX4_op00_05(space); break;
		case 0x07: CX4_op00_07(); break;
		case 0x08: CX4_op00_08(space); break;
		case 0x0b: CX4_op00_0b(space); break;
		case 0x0c: CX4_op00_0c(space); break;
	}'};
MERGE (n:KG {id: 'handler:.CX4_op00_00'}) SET n:Handler SET n += {method: 'CX4_op00_00', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4oam.ipp', sourceLine: 14, sourceColumn: 1, sourceEndLine: 128, sourceParameters: 'address_space &space', sourceBody: 'int32_t i;

	uint32_t oamptr = cx4.ram[0x626] << 2;
	uint16_t globalx, globaly;
	uint32_t oamptr2;
	int16_t sprx, spry;
	uint8_t sprname, sprattr;
	uint8_t sprcount;
	uint8_t offset;
	uint32_t srcptr;

	for(i = 0x1fd; i > oamptr && i >= 0; i -= 4)
	{
		//clear oam-to-be
		if(i >= 0)
		{
			cx4.ram[i] = 0xe0;
		}
	}

	globalx = CX4_readw(0x621);
	globaly = CX4_readw(0x623);
	oamptr2 = 0x200 + (cx4.ram[0x626] >> 2);

	if(!cx4.ram[0x620])
	{
		return;
	}

	sprcount = 128 - cx4.ram[0x626];
	offset = (cx4.ram[0x626] & 3) * 2;
	srcptr = 0x220;

	for(i = cx4.ram[0x620]; i > 0 && sprcount > 0; i--, srcptr += 16)
	{
		uint32_t spraddr = CX4_readl(srcptr + 7);

		sprx = CX4_readw(srcptr)     - globalx;
		spry = CX4_readw(srcptr + 2) - globaly;
		sprname = cx4.ram[srcptr + 5];
		sprattr = cx4.ram[srcptr + 4] | cx4.ram[srcptr + 6];

		if(space.read_byte(spraddr))
		{
			int16_t x, y;
			int32_t sprcnt;
			for(sprcnt = space.read_byte(spraddr++); sprcnt > 0 && sprcount > 0; sprcnt--, spraddr += 4)
			{
				x = (int8_t)space.read_byte(spraddr + 1);
				if(sprattr & 0x40)
				{
					x = -x - ((space.read_byte(spraddr) & 0x20) ? 16 : 8);
				}
				x += sprx;
				if(x >= -16 && x <= 272)
				{
					y = (int8_t)space.read_byte(spraddr + 2);
					if(sprattr & 0x80)
					{
						y = -y - ((space.read_byte(spraddr) & 0x20) ? 16 : 8);
					}
					y += spry;
					if(y >= -16 && y <= 224)
					{
						cx4.ram[oamptr    ] = (uint8_t)x;
						cx4.ram[oamptr + 1] = (uint8_t)y;
						cx4.ram[oamptr + 2] = sprname + space.read_byte(spraddr + 3);
						cx4.ram[oamptr + 3] = sprattr ^ (space.read_byte(spraddr) & 0xc0);
						cx4.ram[oamptr2] &= ~(3 << offset);
						if(x & 0x100)
						{
							cx4.ram[oamptr2] |= 1 << offset;
						}
						if(space.read_byte(spraddr) & 0x20)
						{
							cx4.ram[oamptr2] |= 2 << offset;
						}
						oamptr += 4;
						sprcount--;
						offset = (offset + 2) & 6;
						if(!offset)
						{
							oamptr2++;
						}
					}
				}
			}
		}
		else if(sprcount > 0)
		{
			cx4.ram[oamptr    ] = (uint8_t)sprx;
			cx4.ram[oamptr + 1] = (uint8_t)spry;
			cx4.ram[oamptr + 2] = sprname;
			cx4.ram[oamptr + 3] = sprattr;
			cx4.ram[oamptr2] &= ~(3 << offset);
			if(sprx & 0x100)
			{
				cx4.ram[oamptr2] |= 3 << offset;
			}
			else
			{
				cx4.ram[oamptr2] |= 2 << offset;
			}
			oamptr += 4;
			sprcount--;
			offset = (offset + 2) & 6;
			if(!offset)
			{
				oamptr2++;
			}
		}
	}'};
MERGE (n:KG {id: 'handler:.CX4_readw'}) SET n:Handler SET n += {method: 'CX4_readw', ownerClass: '', sourceFile: 'src/mame/nintendo/snescx4.cpp', sourceLine: 234, sourceColumn: 1, sourceEndLine: 237, sourceParameters: 'uint16_t addr', sourceBody: 'return CX4_read(addr) | (CX4_read(addr + 1) << 8);'};
MERGE (n:KG {id: 'handler:.CX4_readl'}) SET n:Handler SET n += {method: 'CX4_readl', ownerClass: '', sourceFile: 'src/mame/nintendo/snescx4.cpp', sourceLine: 239, sourceColumn: 1, sourceEndLine: 242, sourceParameters: 'uint16_t addr', sourceBody: 'return CX4_read(addr) | (CX4_read(addr + 1) << 8) | (CX4_read(addr + 2) << 16);'};
MERGE (n:KG {id: 'handler:.CX4_op00_03'}) SET n:Handler SET n += {method: 'CX4_op00_03', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4oam.ipp', sourceLine: 131, sourceColumn: 1, sourceEndLine: 134, sourceParameters: 'void', sourceBody: 'CX4_C4DoScaleRotate(0);'};
MERGE (n:KG {id: 'handler:.CX4_C4DoScaleRotate'}) SET n:Handler SET n += {method: 'CX4_C4DoScaleRotate', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4fn.ipp', sourceLine: 201, sourceColumn: 1, sourceEndLine: 327, sourceConstants: ['A=5', 'D=12', 'X=2'], sourceParameters: 'int row_padding', sourceBody: 'int16_t A, B, C, D;
	int32_t x, y;

	//Calculate Pixel Resolution
	uint8_t w = CX4_read(0x1f89) & ~7;
	uint8_t h = CX4_read(0x1f8c) & ~7;

	int32_t Cx = (int16_t)CX4_readw(0x1f83);
	int32_t Cy = (int16_t)CX4_readw(0x1f86);

	int32_t LineX, LineY;
	uint32_t X, Y;
	uint8_t byte;
	int32_t outidx = 0;
	uint8_t bit    = 0x80;

	//Calculate matrix
	int32_t XScale = CX4_readw(0x1f8f);
	int32_t YScale = CX4_readw(0x1f92);

	if(XScale & 0x8000)
	{
		XScale = 0x7fff;
	}
	if(YScale & 0x8000)
	{
		YScale = 0x7fff;
	}

	if(CX4_readw(0x1f80) == 0)
	{ //no rotation
		A = (int16_t)XScale;
		B = 0;
		C = 0;
		D = (int16_t)YScale;
	}
	else if(CX4_readw(0x1f80) == 128)
	{ //90 degree rotation
		A = 0;
		B = (int16_t)(-YScale);
		C = (int16_t)XScale;
		D = 0;
	}
	else if(CX4_readw(0x1f80) == 256)
	{ //180 degree rotation
		A = (int16_t)(-XScale);
		B = 0;
		C = 0;
		D = (int16_t)(-YScale);
	}
	else if(CX4_readw(0x1f80) == 384)
	{ //270 degree rotation
		A = 0;
		B = (int16_t)YScale;
		C = (int16_t)(-XScale);
		D = 0;
	}
	else
	{
		A = (int16_t)  CX4_sar(TABLE(CX4_readw(0x1f80) & 0x1ff, 32767, 32765, 32758, 32745, 32728, 32706, 32679, 32647, 32610, 32568, 32521, 32469, 32413, 32351, 32285, 32214, 32138, 32057, 31971, 31881, 31785, 31685, 31581, 31471, 31357, 31237, 31114, 30985, 30852, 30714, 30572, 30425, 30273, 30117, 29956, 29791, 29621, 29447, 29269, 29086, 28898, 28707, 28511, 28310, 28106, 27897, 27684, 27466, 27245, 27020, 26790, 26557, 26319, 26077, 25832, 25583, 25330, 25073, 24812, 24547, 24279, 24007, 23732, 23453, 23170, 22884, 22594, 22301, 22005, 21706, 21403, 21097, 20787, 20475, 20159, 19841, 19519, 19195, 18868, 18537, 18204, 17869, 17530, 17189, 16846, 16499, 16151, 15800, 15446, 15090, 14732, 14372, 14010, 13645, 13278, 12910, 12539, 12167, 11793, 11416, 11039, 10659, 10278, 9896, 9512, 9126, 8739, 8351, 7961, 7571, 7179, 6786, 6392, 5997, 5602, 5205, 4808, 4409, 4011, 3611, 3211, 2811, 2410, 2009, 1607, 1206, 804, 402, 0, -402, -804, -1206, -1607, -2009, -2410, -2811, -3211, -3611, -4011, -4409, -4808, -5205, -5602, -5997, -6392, -6786, -7179, -7571, -7961, -8351, -8739, -9126, -9512, -9896, -10278, -10659, -11039, -11416, -11793, -12167, -12539, -12910, -13278, -13645, -14010, -14372, -14732, -15090, -15446, -15800, -16151, -16499, -16846, -17189, -17530, -17869, -18204, -18537, -18868, -19195, -19519, -19841, -20159, -20475, -20787, -21097, -21403, -21706, -22005, -22301, -22594, -22884, -23170, -23453, -23732, -24007, -24279, -24547, -24812, -25073, -25330, -25583, -25832, -26077, -26319, -26557, -26790, -27020, -27245, -27466, -27684, -27897, -28106, -28310, -28511, -28707, -28898, -29086, -29269, -29447, -29621, -29791, -29956, -30117, -30273, -30425, -30572, -30714, -30852, -30985, -31114, -31237, -31357, -31471, -31581, -31685, -31785, -31881, -31971, -32057, -32138, -32214, -32285, -32351, -32413, -32469, -32521, -32568, -32610, -32647, -32679, -32706, -32728, -32745, -32758, -32765, -32767, -32765, -32758, -32745, -32728, -32706, -32679, -32647, -32610, -32568, -32521, -32469, -32413, -32351, -32285, -32214, -32138, -32057, -31971, -31881, -31785, -31685, -31581, -31471, -31357, -31237, -31114, -30985, -30852, -30714, -30572, -30425, -30273, -30117, -29956, -29791, -29621, -29447, -29269, -29086, -28898, -28707, -28511, -28310, -28106, -27897, -27684, -27466, -27245, -27020, -26790, -26557, -26319, -26077, -25832, -25583, -25330, -25073, -24812, -24547, -24279, -24007, -23732, -23453, -23170, -22884, -22594, -22301, -22005, -21706, -21403, -21097, -20787, -20475, -20159, -19841, -19519, -19195, -18868, -18537, -18204, -17869, -17530, -17189, -16846, -16499, -16151, -15800, -15446, -15090, -14732, -14372, -14010, -13645, -13278, -12910, -12539, -12167, -11793, -11416, -11039, -10659, -10278, -9896, -9512, -9126, -8739, -8351, -7961, -7571, -7179, -6786, -6392, -5997, -5602, -5205, -4808, -4409, -4011, -3611, -3211, -2811, -2410, -2009, -1607, -1206, -804, -402, 0, 402, 804, 1206, 1607, 2009, 2410, 2811, 3211, 3611, 4011, 4409, 4808, 5205, 5602, 5997, 6392, 6786, 7179, 7571, 7961, 8351, 8739, 9126, 9512, 9896, 10278, 10659, 11039, 11416, 11793, 12167, 12539, 12910, 13278, 13645, 14010, 14372, 14732, 15090, 15446, 15800, 16151, 16499, 16846, 17189, 17530, 17869, 18204, 18537, 18868, 19195, 19519, 19841, 20159, 20475, 20787, 21097, 21403, 21706, 22005, 22301, 22594, 22884, 23170, 23453, 23732, 24007, 24279, 24547, 24812, 25073, 25330, 25583, 25832, 26077, 26319, 26557, 26790, 27020, 27245, 27466, 27684, 27897, 28106, 28310, 28511, 28707, 28898, 29086, 29269, 29447, 29621, 29791, 29956, 30117, 30273, 30425, 30572, 30714, 30852, 30985, 31114, 31237, 31357, 31471, 31581, 31685, 31785, 31881, 31971, 32057, 32138, 32214, 32285, 32351, 32413, 32469, 32521, 32568, 32610, 32647, 32679, 32706, 32728, 32745, 32758, 32765) * XScale, 15);
		B = (int16_t)(-CX4_sar(TABLE(CX4_readw(0x1f80) & 0x1ff, 0, 402, 804, 1206, 1607, 2009, 2410, 2811, 3211, 3611, 4011, 4409, 4808, 5205, 5602, 5997, 6392, 6786, 7179, 7571, 7961, 8351, 8739, 9126, 9512, 9896, 10278, 10659, 11039, 11416, 11793, 12167, 12539, 12910, 13278, 13645, 14010, 14372, 14732, 15090, 15446, 15800, 16151, 16499, 16846, 17189, 17530, 17869, 18204, 18537, 18868, 19195, 19519, 19841, 20159, 20475, 20787, 21097, 21403, 21706, 22005, 22301, 22594, 22884, 23170, 23453, 23732, 24007, 24279, 24547, 24812, 25073, 25330, 25583, 25832, 26077, 26319, 26557, 26790, 27020, 27245, 27466, 27684, 27897, 28106, 28310, 28511, 28707, 28898, 29086, 29269, 29447, 29621, 29791, 29956, 30117, 30273, 30425, 30572, 30714, 30852, 30985, 31114, 31237, 31357, 31471, 31581, 31685, 31785, 31881, 31971, 32057, 32138, 32214, 32285, 32351, 32413, 32469, 32521, 32568, 32610, 32647, 32679, 32706, 32728, 32745, 32758, 32765, 32767, 32765, 32758, 32745, 32728, 32706, 32679, 32647, 32610, 32568, 32521, 32469, 32413, 32351, 32285, 32214, 32138, 32057, 31971, 31881, 31785, 31685, 31581, 31471, 31357, 31237, 31114, 30985, 30852, 30714, 30572, 30425, 30273, 30117, 29956, 29791, 29621, 29447, 29269, 29086, 28898, 28707, 28511, 28310, 28106, 27897, 27684, 27466, 27245, 27020, 26790, 26557, 26319, 26077, 25832, 25583, 25330, 25073, 24812, 24547, 24279, 24007, 23732, 23453, 23170, 22884, 22594, 22301, 22005, 21706, 21403, 21097, 20787, 20475, 20159, 19841, 19519, 19195, 18868, 18537, 18204, 17869, 17530, 17189, 16846, 16499, 16151, 15800, 15446, 15090, 14732, 14372, 14010, 13645, 13278, 12910, 12539, 12167, 11793, 11416, 11039, 10659, 10278, 9896, 9512, 9126, 8739, 8351, 7961, 7571, 7179, 6786, 6392, 5997, 5602, 5205, 4808, 4409, 4011, 3611, 3211, 2811, 2410, 2009, 1607, 1206, 804, 402, 0, -402, -804, -1206, -1607, -2009, -2410, -2811, -3211, -3611, -4011, -4409, -4808, -5205, -5602, -5997, -6392, -6786, -7179, -7571, -7961, -8351, -8739, -9126, -9512, -9896, -10278, -10659, -11039, -11416, -11793, -12167, -12539, -12910, -13278, -13645, -14010, -14372, -14732, -15090, -15446, -15800, -16151, -16499, -16846, -17189, -17530, -17869, -18204, -18537, -18868, -19195, -19519, -19841, -20159, -20475, -20787, -21097, -21403, -21706, -22005, -22301, -22594, -22884, -23170, -23453, -23732, -24007, -24279, -24547, -24812, -25073, -25330, -25583, -25832, -26077, -26319, -26557, -26790, -27020, -27245, -27466, -27684, -27897, -28106, -28310, -28511, -28707, -28898, -29086, -29269, -29447, -29621, -29791, -29956, -30117, -30273, -30425, -30572, -30714, -30852, -30985, -31114, -31237, -31357, -31471, -31581, -31685, -31785, -31881, -31971, -32057, -32138, -32214, -32285, -32351, -32413, -32469, -32521, -32568, -32610, -32647, -32679, -32706, -32728, -32745, -32758, -32765, -32767, -32765, -32758, -32745, -32728, -32706, -32679, -32647, -32610, -32568, -32521, -32469, -32413, -32351, -32285, -32214, -32138, -32057, -31971, -31881, -31785, -31685, -31581, -31471, -31357, -31237, -31114, -30985, -30852, -30714, -30572, -30425, -30273, -30117, -29956, -29791, -29621, -29447, -29269, -29086, -28898, -28707, -28511, -28310, -28106, -27897, -27684, -27466, -27245, -27020, -26790, -26557, -26319, -26077, -25832, -25583, -25330, -25073, -24812, -24547, -24279, -24007, -23732, -23453, -23170, -22884, -22594, -22301, -22005, -21706, -21403, -21097, -20787, -20475, -20159, -19841, -19519, -19195, -18868, -18537, -18204, -17869, -17530, -17189, -16846, -16499, -16151, -15800, -15446, -15090, -14732, -14372, -14010, -13645, -13278, -12910, -12539, -12167, -11793, -11416, -11039, -10659, -10278, -9896, -9512, -9126, -8739, -8351, -7961, -7571, -7179, -6786, -6392, -5997, -5602, -5205, -4808, -4409, -4011, -3611, -3211, -2811, -2410, -2009, -1607, -1206, -804, -402) * YScale, 15));
		C = (int16_t)  CX4_sar(TABLE(CX4_readw(0x1f80) & 0x1ff, 0, 402, 804, 1206, 1607, 2009, 2410, 2811, 3211, 3611, 4011, 4409, 4808, 5205, 5602, 5997, 6392, 6786, 7179, 7571, 7961, 8351, 8739, 9126, 9512, 9896, 10278, 10659, 11039, 11416, 11793, 12167, 12539, 12910, 13278, 13645, 14010, 14372, 14732, 15090, 15446, 15800, 16151, 16499, 16846, 17189, 17530, 17869, 18204, 18537, 18868, 19195, 19519, 19841, 20159, 20475, 20787, 21097, 21403, 21706, 22005, 22301, 22594, 22884, 23170, 23453, 23732, 24007, 24279, 24547, 24812, 25073, 25330, 25583, 25832, 26077, 26319, 26557, 26790, 27020, 27245, 27466, 27684, 27897, 28106, 28310, 28511, 28707, 28898, 29086, 29269, 29447, 29621, 29791, 29956, 30117, 30273, 30425, 30572, 30714, 30852, 30985, 31114, 31237, 31357, 31471, 31581, 31685, 31785, 31881, 31971, 32057, 32138, 32214, 32285, 32351, 32413, 32469, 32521, 32568, 32610, 32647, 32679, 32706, 32728, 32745, 32758, 32765, 32767, 32765, 32758, 32745, 32728, 32706, 32679, 32647, 32610, 32568, 32521, 32469, 32413, 32351, 32285, 32214, 32138, 32057, 31971, 31881, 31785, 31685, 31581, 31471, 31357, 31237, 31114, 30985, 30852, 30714, 30572, 30425, 30273, 30117, 29956, 29791, 29621, 29447, 29269, 29086, 28898, 28707, 28511, 28310, 28106, 27897, 27684, 27466, 27245, 27020, 26790, 26557, 26319, 26077, 25832, 25583, 25330, 25073, 24812, 24547, 24279, 24007, 23732, 23453, 23170, 22884, 22594, 22301, 22005, 21706, 21403, 21097, 20787, 20475, 20159, 19841, 19519, 19195, 18868, 18537, 18204, 17869, 17530, 17189, 16846, 16499, 16151, 15800, 15446, 15090, 14732, 14372, 14010, 13645, 13278, 12910, 12539, 12167, 11793, 11416, 11039, 10659, 10278, 9896, 9512, 9126, 8739, 8351, 7961, 7571, 7179, 6786, 6392, 5997, 5602, 5205, 4808, 4409, 4011, 3611, 3211, 2811, 2410, 2009, 1607, 1206, 804, 402, 0, -402, -804, -1206, -1607, -2009, -2410, -2811, -3211, -3611, -4011, -4409, -4808, -5205, -5602, -5997, -6392, -6786, -7179, -7571, -7961, -8351, -8739, -9126, -9512, -9896, -10278, -10659, -11039, -11416, -11793, -12167, -12539, -12910, -13278, -13645, -14010, -14372, -14732, -15090, -15446, -15800, -16151, -16499, -16846, -17189, -17530, -17869, -18204, -18537, -18868, -19195, -19519, -19841, -20159, -20475, -20787, -21097, -21403, -21706, -22005, -22301, -22594, -22884, -23170, -23453, -23732, -24007, -24279, -24547, -24812, -25073, -25330, -25583, -25832, -26077, -26319, -26557, -26790, -27020, -27245, -27466, -27684, -27897, -28106, -28310, -28511, -28707, -28898, -29086, -29269, -29447, -29621, -29791, -29956, -30117, -30273, -30425, -30572, -30714, -30852, -30985, -31114, -31237, -31357, -31471, -31581, -31685, -31785, -31881, -31971, -32057, -32138, -32214, -32285, -32351, -32413, -32469, -32521, -32568, -32610, -32647, -32679, -32706, -32728, -32745, -32758, -32765, -32767, -32765, -32758, -32745, -32728, -32706, -32679, -32647, -32610, -32568, -32521, -32469, -32413, -32351, -32285, -32214, -32138, -32057, -31971, -31881, -31785, -31685, -31581, -31471, -31357, -31237, -31114, -30985, -30852, -30714, -30572, -30425, -30273, -30117, -29956, -29791, -29621, -29447, -29269, -29086, -28898, -28707, -28511, -28310, -28106, -27897, -27684, -27466, -27245, -27020, -26790, -26557, -26319, -26077, -25832, -25583, -25330, -25073, -24812, -24547, -24279, -24007, -23732, -23453, -23170, -22884, -22594, -22301, -22005, -21706, -21403, -21097, -20787, -20475, -20159, -19841, -19519, -19195, -18868, -18537, -18204, -17869, -17530, -17189, -16846, -16499, -16151, -15800, -15446, -15090, -14732, -14372, -14010, -13645, -13278, -12910, -12539, -12167, -11793, -11416, -11039, -10659, -10278, -9896, -9512, -9126, -8739, -8351, -7961, -7571, -7179, -6786, -6392, -5997, -5602, -5205, -4808, -4409, -4011, -3611, -3211, -2811, -2410, -2009, -1607, -1206, -804, -402) * XScale, 15);
		D = (int16_t)  CX4_sar(TABLE(CX4_readw(0x1f80) & 0x1ff, 32767, 32765, 32758, 32745, 32728, 32706, 32679, 32647, 32610, 32568, 32521, 32469, 32413, 32351, 32285, 32214, 32138, 32057, 31971, 31881, 31785, 31685, 31581, 31471, 31357, 31237, 31114, 30985, 30852, 30714, 30572, 30425, 30273, 30117, 29956, 29791, 29621, 29447, 29269, 29086, 28898, 28707, 28511, 28310, 28106, 27897, 27684, 27466, 27245, 27020, 26790, 26557, 26319, 26077, 25832, 25583, 25330, 25073, 24812, 24547, 24279, 24007, 23732, 23453, 23170, 22884, 22594, 22301, 22005, 21706, 21403, 21097, 20787, 20475, 20159, 19841, 19519, 19195, 18868, 18537, 18204, 17869, 17530, 17189, 16846, 16499, 16151, 15800, 15446, 15090, 14732, 14372, 14010, 13645, 13278, 12910, 12539, 12167, 11793, 11416, 11039, 10659, 10278, 9896, 9512, 9126, 8739, 8351, 7961, 7571, 7179, 6786, 6392, 5997, 5602, 5205, 4808, 4409, 4011, 3611, 3211, 2811, 2410, 2009, 1607, 1206, 804, 402, 0, -402, -804, -1206, -1607, -2009, -2410, -2811, -3211, -3611, -4011, -4409, -4808, -5205, -5602, -5997, -6392, -6786, -7179, -7571, -7961, -8351, -8739, -9126, -9512, -9896, -10278, -10659, -11039, -11416, -11793, -12167, -12539, -12910, -13278, -13645, -14010, -14372, -14732, -15090, -15446, -15800, -16151, -16499, -16846, -17189, -17530, -17869, -18204, -18537, -18868, -19195, -19519, -19841, -20159, -20475, -20787, -21097, -21403, -21706, -22005, -22301, -22594, -22884, -23170, -23453, -23732, -24007, -24279, -24547, -24812, -25073, -25330, -25583, -25832, -26077, -26319, -26557, -26790, -27020, -27245, -27466, -27684, -27897, -28106, -28310, -28511, -28707, -28898, -29086, -29269, -29447, -29621, -29791, -29956, -30117, -30273, -30425, -30572, -30714, -30852, -30985, -31114, -31237, -31357, -31471, -31581, -31685, -31785, -31881, -31971, -32057, -32138, -32214, -32285, -32351, -32413, -32469, -32521, -32568, -32610, -32647, -32679, -32706, -32728, -32745, -32758, -32765, -32767, -32765, -32758, -32745, -32728, -32706, -32679, -32647, -32610, -32568, -32521, -32469, -32413, -32351, -32285, -32214, -32138, -32057, -31971, -31881, -31785, -31685, -31581, -31471, -31357, -31237, -31114, -30985, -30852, -30714, -30572, -30425, -30273, -30117, -29956, -29791, -29621, -29447, -29269, -29086, -28898, -28707, -28511, -28310, -28106, -27897, -27684, -27466, -27245, -27020, -26790, -26557, -26319, -26077, -25832, -25583, -25330, -25073, -24812, -24547, -24279, -24007, -23732, -23453, -23170, -22884, -22594, -22301, -22005, -21706, -21403, -21097, -20787, -20475, -20159, -19841, -19519, -19195, -18868, -18537, -18204, -17869, -17530, -17189, -16846, -16499, -16151, -15800, -15446, -15090, -14732, -14372, -14010, -13645, -13278, -12910, -12539, -12167, -11793, -11416, -11039, -10659, -10278, -9896, -9512, -9126, -8739, -8351, -7961, -7571, -7179, -6786, -6392, -5997, -5602, -5205, -4808, -4409, -4011, -3611, -3211, -2811, -2410, -2009, -1607, -1206, -804, -402, 0, 402, 804, 1206, 1607, 2009, 2410, 2811, 3211, 3611, 4011, 4409, 4808, 5205, 5602, 5997, 6392, 6786, 7179, 7571, 7961, 8351, 8739, 9126, 9512, 9896, 10278, 10659, 11039, 11416, 11793, 12167, 12539, 12910, 13278, 13645, 14010, 14372, 14732, 15090, 15446, 15800, 16151, 16499, 16846, 17189, 17530, 17869, 18204, 18537, 18868, 19195, 19519, 19841, 20159, 20475, 20787, 21097, 21403, 21706, 22005, 22301, 22594, 22884, 23170, 23453, 23732, 24007, 24279, 24547, 24812, 25073, 25330, 25583, 25832, 26077, 26319, 26557, 26790, 27020, 27245, 27466, 27684, 27897, 28106, 28310, 28511, 28707, 28898, 29086, 29269, 29447, 29621, 29791, 29956, 30117, 30273, 30425, 30572, 30714, 30852, 30985, 31114, 31237, 31357, 31471, 31581, 31685, 31785, 31881, 31971, 32057, 32138, 32214, 32285, 32351, 32413, 32469, 32521, 32568, 32610, 32647, 32679, 32706, 32728, 32745, 32758, 32765) * YScale, 15);
	}

	//Clear the output RAM
	memset(cx4.ram, 0, (w + row_padding / 4) * unsigned(h) / 2);

	//Calculate start position (i.e. (Ox, Oy) = (0, 0))
	//The low 12 bits are fractional, so (Cx<<12) gives us the Cx we want in
	//the function. We do Cx*A etc normally because the matrix parameters
	//already have the fractional parts.
	LineX = (Cx << 12) - Cx * A - Cx * B;
	LineY = (Cy << 12) - Cy * C - Cy * D;

	//Start loop
	for(y = 0; y < h; y++)
	{
		X = LineX;
		Y = LineY;
		for(x = 0; x < w; x++)
		{
			if((X >> 12) >= w || (Y >> 12) >= h)
			{
				byte = 0;
			}
			else
			{
				uint32_t addr = (Y >> 12) * w + (X >> 12);
				byte = CX4_read(0x600 + (addr >> 1));
				if(addr & 1)
				{
					byte >>= 4;
				}
			}

			//De-bitplanify
			if(byte & 1) { cx4.ram[outidx     ] |= bit; }
			if(byte & 2) { cx4.ram[outidx +  1] |= bit; }
			if(byte & 4) { cx4.ram[outidx + 16] |= bit; }
			if(byte & 8) { cx4.ram[outidx + 17] |= bit; }

			bit >>= 1;
			if(!bit)
			{
				bit     = 0x80;
				outidx += 32;
			}

			X += A; //Add 1 to output x => add an A and a C
			Y += C;
		}
		outidx += 2 + row_padding;
		if(outidx & 0x10)
		{
			outidx &= ~0x10;
		}
		else
		{
			outidx -= w * 4 + row_padding;
		}
		LineX += B; //Add 1 to output y => add a B and a D
		LineY += D;
	}'};
MERGE (n:KG {id: 'handler:.CX4_op00_05'}) SET n:Handler SET n += {method: 'CX4_op00_05', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4oam.ipp', sourceLine: 137, sourceColumn: 1, sourceEndLine: 180, sourceParameters: 'address_space &space', sourceBody: 'int32_t i;
	uint32_t ptr = 0, ptr2 = 0;

	cx4.C4WFX2Val = CX4_read(0x1f83);
	cx4.C4WFY2Val = CX4_read(0x1f86);
	cx4.C4WFDist  = CX4_read(0x1f89);
	cx4.C4WFScale = CX4_read(0x1f8c);

	//Transform Vertices
	for(i = CX4_readw(0x1f80); i > 0; i--, ptr += 0x10)
	{
		cx4.C4WFXVal = CX4_readw(ptr + 1);
		cx4.C4WFYVal = CX4_readw(ptr + 5);
		cx4.C4WFZVal = CX4_readw(ptr + 9);
		CX4_C4TransfWireFrame();

		//Displace
		CX4_writew(space, ptr + 1, cx4.C4WFXVal + 0x80);
		CX4_writew(space, ptr + 5, cx4.C4WFYVal + 0x50);
	}

	CX4_writew(space, 0x600,     23);
	CX4_writew(space, 0x602,     0x60);
	CX4_writew(space, 0x605,     0x40);
	CX4_writew(space, 0x600 + 8, 23);
	CX4_writew(space, 0x602 + 8, 0x60);
	CX4_writew(space, 0x605 + 8, 0x40);

	ptr = 0xb02;

	for(i = CX4_readw(0xb00); i > 0; i--, ptr += 2, ptr2 += 8)
	{
		cx4.C4WFXVal  = CX4_readw((CX4_read(ptr + 0) << 4) + 1);
		cx4.C4WFYVal  = CX4_readw((CX4_read(ptr + 0) << 4) + 5);
		cx4.C4WFX2Val = CX4_readw((CX4_read(ptr + 1) << 4) + 1);
		cx4.C4WFY2Val = CX4_readw((CX4_read(ptr + 1) << 4) + 5);
		CX4_C4CalcWireFrame();
		CX4_writew(space, ptr2 + 0x600, cx4.C4WFDist ? cx4.C4WFDist : 1);
		CX4_writew(space, ptr2 + 0x602, cx4.C4WFXVal);
		CX4_writew(space, ptr2 + 0x605, cx4.C4WFYVal);
	}'};
MERGE (n:KG {id: 'handler:.CX4_writew'}) SET n:Handler SET n += {method: 'CX4_writew', ownerClass: '', sourceFile: 'src/mame/nintendo/snescx4.cpp', sourceLine: 199, sourceColumn: 1, sourceEndLine: 203, sourceParameters: 'address_space &space, uint16_t addr, uint16_t data', sourceBody: 'CX4_write(space, addr + 0, data >> 0);
	CX4_write(space, addr + 1, data >> 8);'};
MERGE (n:KG {id: 'handler:.CX4_C4TransfWireFrame'}) SET n:Handler SET n += {method: 'CX4_C4TransfWireFrame', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4fn.ipp', sourceLine: 19, sourceColumn: 1, sourceEndLine: 43, sourceConstants: ['X=2'], sourceParameters: 'void', sourceBody: 'cx4.c4x = (double)cx4.C4WFXVal;
	cx4.c4y = (double)cx4.C4WFYVal;
	cx4.c4z = (double)cx4.C4WFZVal - 0x95;

	//Rotate X
	cx4.tanval = -(double)cx4.C4WFX2Val * std::numbers::pi * 2 / 128;
	cx4.c4y2   = cx4.c4y * cos(cx4.tanval) - cx4.c4z * sin(cx4.tanval);
	cx4.c4z2   = cx4.c4y * sin(cx4.tanval) + cx4.c4z * cos(cx4.tanval);

	//Rotate Y
	cx4.tanval = -(double)cx4.C4WFY2Val * std::numbers::pi * 2 / 128;
	cx4.c4x2   = cx4.c4x * cos(cx4.tanval)  + cx4.c4z2 * sin(cx4.tanval);
	cx4.c4z    = cx4.c4x * -sin(cx4.tanval) + cx4.c4z2 * cos(cx4.tanval);

	//Rotate Z
	cx4.tanval = -(double)cx4.C4WFDist * std::numbers::pi * 2 / 128;
	cx4.c4x    = cx4.c4x2 * cos(cx4.tanval) - cx4.c4y2 * sin(cx4.tanval);
	cx4.c4y    = cx4.c4x2 * sin(cx4.tanval) + cx4.c4y2 * cos(cx4.tanval);

	//Scale
	cx4.C4WFXVal = (int16_t)(cx4.c4x * cx4.C4WFScale / (0x90 * (cx4.c4z + 0x95)) * 0x95);
	cx4.C4WFYVal = (int16_t)(cx4.c4y * cx4.C4WFScale / (0x90 * (cx4.c4z + 0x95)) * 0x95);'};
MERGE (n:KG {id: 'handler:.CX4_C4CalcWireFrame'}) SET n:Handler SET n += {method: 'CX4_C4CalcWireFrame', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4fn.ipp', sourceLine: 45, sourceColumn: 1, sourceEndLine: 66, sourceParameters: 'void', sourceBody: 'cx4.C4WFXVal = cx4.C4WFX2Val - cx4.C4WFXVal;
	cx4.C4WFYVal = cx4.C4WFY2Val - cx4.C4WFYVal;

	if(abs(cx4.C4WFXVal) > abs(cx4.C4WFYVal))
	{
		cx4.C4WFDist = abs(cx4.C4WFXVal) + 1;
		cx4.C4WFYVal = (256 * (long)cx4.C4WFYVal) / abs(cx4.C4WFXVal);
		cx4.C4WFXVal = (cx4.C4WFXVal < 0) ? -256 : 256;
	}
	else if(cx4.C4WFYVal != 0)
	{
		cx4.C4WFDist = abs(cx4.C4WFYVal) + 1;
		cx4.C4WFXVal = (256 * (long)cx4.C4WFXVal) / abs(cx4.C4WFYVal);
		cx4.C4WFYVal = (cx4.C4WFYVal < 0) ? -256 : 256;
	}
	else
	{
		cx4.C4WFDist = 0;
	}'};
MERGE (n:KG {id: 'handler:.CX4_op00_07'}) SET n:Handler SET n += {method: 'CX4_op00_07', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4oam.ipp', sourceLine: 183, sourceColumn: 1, sourceEndLine: 186, sourceParameters: 'void', sourceBody: 'CX4_C4DoScaleRotate(64);'};
MERGE (n:KG {id: 'handler:.CX4_op00_08'}) SET n:Handler SET n += {method: 'CX4_op00_08', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4oam.ipp', sourceLine: 189, sourceColumn: 1, sourceEndLine: 192, sourceParameters: 'address_space &space', sourceBody: 'CX4_C4DrawWireFrame(space);'};
MERGE (n:KG {id: 'handler:.CX4_C4DrawWireFrame'}) SET n:Handler SET n += {method: 'CX4_C4DrawWireFrame', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4fn.ipp', sourceLine: 94, sourceColumn: 1, sourceEndLine: 144, sourceParameters: 'address_space &space', sourceBody: 'uint32_t line = CX4_readl(0x1f80);
	uint32_t point1, point2;
	int16_t X1, Y1, Z1;
	int16_t X2, Y2, Z2;
	uint8_t Color;
	int32_t i;

	for(i = cx4.ram[0x0295]; i > 0; i--, line += 5)
	{
		if(space.read_byte(line) == 0xff &&
			space.read_byte(line + 1) == 0xff)
		{
			int32_t tmp = line - 5;
			while(space.read_byte(tmp + 2) == 0xff &&
					space.read_byte(tmp + 3) == 0xff &&
					(tmp + 2) >= 0)
			{
				tmp -= 5;
			}
			point1 = (CX4_read(0x1f82) << 16) |
						(space.read_byte(tmp + 2) << 8) |
						space.read_byte(tmp + 3);
		}
		else
		{
			point1 = (CX4_read(0x1f82) << 16) |
						(space.read_byte(line) << 8) |
						space.read_byte(line + 1);
		}
		point2 = (CX4_read(0x1f82) << 16) |
					(space.read_byte(line + 2) << 8) |
					space.read_byte(line + 3);

		X1=(space.read_byte(point1 + 0) << 8) |
			space.read_byte(point1 + 1);
		Y1=(space.read_byte(point1 + 2) << 8) |
			space.read_byte(point1 + 3);
		Z1=(space.read_byte(point1 + 4) << 8) |
			space.read_byte(point1 + 5);
		X2=(space.read_byte(point2 + 0) << 8) |
			space.read_byte(point2 + 1);
		Y2=(space.read_byte(point2 + 2) << 8) |
			space.read_byte(point2 + 3);
		Z2=(space.read_byte(point2 + 4) << 8) |
			space.read_byte(point2 + 5);
		Color = space.read_byte(line + 4);
		CX4_C4DrawLine(X1, Y1, Z1, X2, Y2, Z2, Color);
	}'};
MERGE (n:KG {id: 'handler:.CX4_C4DrawLine'}) SET n:Handler SET n += {method: 'CX4_C4DrawLine', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4fn.ipp', sourceLine: 146, sourceColumn: 1, sourceEndLine: 199, sourceParameters: 'int32_t X1, int32_t Y1, int16_t Z1, int32_t X2, int32_t Y2, int16_t Z2, uint8_t Color', sourceBody: 'int32_t i;

	//Transform coordinates
	cx4.C4WFXVal  = (int16_t)X1;
	cx4.C4WFYVal  = (int16_t)Y1;
	cx4.C4WFZVal  = Z1;
	cx4.C4WFScale = CX4_read(0x1f90);
	cx4.C4WFX2Val = CX4_read(0x1f86);
	cx4.C4WFY2Val = CX4_read(0x1f87);
	cx4.C4WFDist  = CX4_read(0x1f88);
	CX4_C4TransfWireFrame2();
	X1 = (cx4.C4WFXVal + 48) << 8;
	Y1 = (cx4.C4WFYVal + 48) << 8;

	cx4.C4WFXVal = (int16_t)X2;
	cx4.C4WFYVal = (int16_t)Y2;
	cx4.C4WFZVal = Z2;
	CX4_C4TransfWireFrame2();
	X2 = (cx4.C4WFXVal + 48) << 8;
	Y2 = (cx4.C4WFYVal + 48) << 8;

	//Get line info
	cx4.C4WFXVal  = (int16_t)(X1 >> 8);
	cx4.C4WFYVal  = (int16_t)(Y1 >> 8);
	cx4.C4WFX2Val = (int16_t)(X2 >> 8);
	cx4.C4WFY2Val = (int16_t)(Y2 >> 8);
	CX4_C4CalcWireFrame();
	X2 = (int16_t)cx4.C4WFXVal;
	Y2 = (int16_t)cx4.C4WFYVal;

	//Render line
	for(i = cx4.C4WFDist ? cx4.C4WFDist : 1; i > 0; i--)
	{
		if(X1 > 0xff && Y1 > 0xff && X1 < 0x6000 && Y1 < 0x6000)
		{
			uint16_t addr = (((Y1 >> 8) >> 3) << 8) - (((Y1 >> 8) >> 3) << 6) + (((X1 >> 8) >> 3) << 4) + ((Y1 >> 8) & 7) * 2;
			uint8_t bit = 0x80 >> ((X1 >> 8) & 7);
			cx4.ram[addr + 0x300] &= ~bit;
			cx4.ram[addr + 0x301] &= ~bit;
			if(Color & 1)
			{
				cx4.ram[addr + 0x300] |= bit;
			}
			if(Color & 2)
			{
				cx4.ram[addr + 0x301] |= bit;
			}
		}
		X1 += X2;
		Y1 += Y2;
	}'};
MERGE (n:KG {id: 'handler:.CX4_C4TransfWireFrame2'}) SET n:Handler SET n += {method: 'CX4_C4TransfWireFrame2', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4fn.ipp', sourceLine: 68, sourceColumn: 1, sourceEndLine: 92, sourceConstants: ['X=2'], sourceParameters: 'void', sourceBody: 'cx4.c4x = (double)cx4.C4WFXVal;
	cx4.c4y = (double)cx4.C4WFYVal;
	cx4.c4z = (double)cx4.C4WFZVal;

	//Rotate X
	cx4.tanval = -(double)cx4.C4WFX2Val * std::numbers::pi * 2 / 128;
	cx4.c4y2   = cx4.c4y * cos(cx4.tanval) - cx4.c4z * sin(cx4.tanval);
	cx4.c4z2   = cx4.c4y * sin(cx4.tanval) + cx4.c4z * cos(cx4.tanval);

	//Rotate Y
	cx4.tanval = -(double)cx4.C4WFY2Val * std::numbers::pi * 2 / 128;
	cx4.c4x2   = cx4.c4x * cos(cx4.tanval)  + cx4.c4z2 * sin(cx4.tanval);
	cx4.c4z    = cx4.c4x * -sin(cx4.tanval) + cx4.c4z2 * cos(cx4.tanval);

	//Rotate Z
	cx4.tanval = -(double)cx4.C4WFDist * std::numbers::pi * 2 / 128;
	cx4.c4x    = cx4.c4x2 * cos(cx4.tanval) - cx4.c4y2 * sin(cx4.tanval);
	cx4.c4y    = cx4.c4x2 * sin(cx4.tanval) + cx4.c4y2 * cos(cx4.tanval);

	//Scale
	cx4.C4WFXVal = (int16_t)(cx4.c4x * cx4.C4WFScale / 0x100);
	cx4.C4WFYVal = (int16_t)(cx4.c4y * cx4.C4WFScale / 0x100);'};
MERGE (n:KG {id: 'handler:.CX4_op00_0b'}) SET n:Handler SET n += {method: 'CX4_op00_0b', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4oam.ipp', sourceLine: 195, sourceColumn: 1, sourceEndLine: 242, sourceParameters: 'address_space &space', sourceBody: 'uint8_t  width, height;
	uint32_t startx, starty;
	uint32_t srcptr;
	uint32_t x, y;
	int32_t  scalex, scaley;
	int32_t  cx, cy;
	int32_t  i, j;

	width  = CX4_read(0x1f89);
	height = CX4_read(0x1f8c);
	cx     = CX4_readw(0x1f80);
	cy     = CX4_readw(0x1f83);

	scalex = (int16_t)CX4_readw(0x1f86);
	scaley = (int16_t)CX4_readw(0x1f8f);
	startx = -cx * scalex + (cx << 8);
	starty = -cy * scaley + (cy << 8);
	srcptr = 0x600;

	for(i = 0; i < (width * height) >> 1; i++)
	{
		CX4_write(space, i, 0);
	}

	for(y = starty, i = 0;i < height; i++, y += scaley)
	{
		for(x = startx, j = 0;j < width; j++, x += scalex)
		{
			if((x >> 8) < width && (y >> 8) < height && (y >> 8) * width + (x >> 8) < 0x2000)
			{
				uint8_t pixel = (j & 1) ? (cx4.ram[srcptr] >> 4) : (cx4.ram[srcptr]);
				int32_t index = (y >> 11) * width * 4 + (x >> 11) * 32 + ((y >> 8) & 7) * 2;
				uint8_t mask = 0x80 >> ((x >> 8) & 7);

				if(pixel & 1) cx4.ram[index     ] |= mask;
				if(pixel & 2) cx4.ram[index +  1] |= mask;
				if(pixel & 4) cx4.ram[index + 16] |= mask;
				if(pixel & 8) cx4.ram[index + 17] |= mask;
			}
			if(j & 1)
			{
				srcptr++;
			}
		}
	}'};
MERGE (n:KG {id: 'handler:.CX4_op00_0c'}) SET n:Handler SET n += {method: 'CX4_op00_0c', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4oam.ipp', sourceLine: 245, sourceColumn: 1, sourceEndLine: 307, sourceParameters: 'address_space &space', sourceBody: 'int i, j;
	uint32_t destptr = 0;
	uint32_t waveptr = CX4_read(0x1f83);
	uint16_t mask1   = 0xc0c0;
	uint16_t mask2   = 0x3f3f;

	for(j = 0; j < 0x10; j++)
	{
		do
		{
			int16_t height = -((int8_t)CX4_read(waveptr + 0xb00)) - 16;
			for(i = 0; i < 40; i++)
			{
				uint16_t temp = CX4_readw(destptr + TABLE(i, 0x0000, 0x0002, 0x0004, 0x0006, 0x0008, 0x000a, 0x000c, 0x000e, 0x0200, 0x0202, 0x0204, 0x0206, 0x0208, 0x020a, 0x020c, 0x020e, 0x0400, 0x0402, 0x0404, 0x0406, 0x0408, 0x040a, 0x040c, 0x040e, 0x0600, 0x0602, 0x0604, 0x0606, 0x0608, 0x060a, 0x060c, 0x060e, 0x0800, 0x0802, 0x0804, 0x0806, 0x0808, 0x080a, 0x080c, 0x080e)) & mask2;
				if(height >= 0)
				{
					if(height < 8)
					{
						temp |= mask1 & CX4_readw(0xa00 + height * 2);
					}
					else
					{
						temp |= mask1 & 0xff00;
					}
				}
				CX4_writew(space, destptr + TABLE(i, 0x0000, 0x0002, 0x0004, 0x0006, 0x0008, 0x000a, 0x000c, 0x000e, 0x0200, 0x0202, 0x0204, 0x0206, 0x0208, 0x020a, 0x020c, 0x020e, 0x0400, 0x0402, 0x0404, 0x0406, 0x0408, 0x040a, 0x040c, 0x040e, 0x0600, 0x0602, 0x0604, 0x0606, 0x0608, 0x060a, 0x060c, 0x060e, 0x0800, 0x0802, 0x0804, 0x0806, 0x0808, 0x080a, 0x080c, 0x080e), temp);
				height++;
			}
			waveptr = (waveptr + 1) & 0x7f;
			mask1   = (mask1 >> 2) | (mask1 << 6);
			mask2   = (mask2 >> 2) | (mask2 << 6);
		} while(mask1 != 0xc0c0);
		destptr += 16;

		do
		{
			int16_t height = -((int8_t)CX4_read(waveptr + 0xb00)) - 16;
			for(i = 0; i < 40; i++)
			{
				uint16_t temp = CX4_readw(destptr + TABLE(i, 0x0000, 0x0002, 0x0004, 0x0006, 0x0008, 0x000a, 0x000c, 0x000e, 0x0200, 0x0202, 0x0204, 0x0206, 0x0208, 0x020a, 0x020c, 0x020e, 0x0400, 0x0402, 0x0404, 0x0406, 0x0408, 0x040a, 0x040c, 0x040e, 0x0600, 0x0602, 0x0604, 0x0606, 0x0608, 0x060a, 0x060c, 0x060e, 0x0800, 0x0802, 0x0804, 0x0806, 0x0808, 0x080a, 0x080c, 0x080e)) & mask2;
				if(height >= 0)
				{
					if(height < 8)
					{
						temp |= mask1 & CX4_readw(0xa10 + height * 2);
					}
					else
					{
						temp |= mask1 & 0xff00;
					}
				}
				CX4_writew(space, destptr + TABLE(i, 0x0000, 0x0002, 0x0004, 0x0006, 0x0008, 0x000a, 0x000c, 0x000e, 0x0200, 0x0202, 0x0204, 0x0206, 0x0208, 0x020a, 0x020c, 0x020e, 0x0400, 0x0402, 0x0404, 0x0406, 0x0408, 0x040a, 0x040c, 0x040e, 0x0600, 0x0602, 0x0604, 0x0606, 0x0608, 0x060a, 0x060c, 0x060e, 0x0800, 0x0802, 0x0804, 0x0806, 0x0808, 0x080a, 0x080c, 0x080e), temp);
				height++;
			}
			waveptr = (waveptr + 1) & 0x7f;
			mask1   = (mask1 >> 2) | (mask1 << 6);
			mask2   = (mask2 >> 2) | (mask2 << 6);
		} while(mask1 != 0xc0c0);
		destptr += 16;
	}'};
MERGE (n:KG {id: 'handler:.CX4_op01'}) SET n:Handler SET n += {method: 'CX4_op01', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 31, sourceColumn: 1, sourceEndLine: 35, sourceParameters: 'address_space &space', sourceBody: 'memset(cx4.ram + 0x300, 0, 2304);
	CX4_C4DrawWireFrame(space);'};
MERGE (n:KG {id: 'handler:.CX4_op05'}) SET n:Handler SET n += {method: 'CX4_op05', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 38, sourceColumn: 1, sourceEndLine: 46, sourceParameters: 'address_space &space', sourceBody: 'int32_t temp = 0x10000;
	if(CX4_readw(0x1f83))
	{
		temp = CX4_sar((temp / CX4_readw(0x1f83)) * CX4_readw(0x1f81), 8);
	}
	CX4_writew(space, 0x1f80, temp);'};
MERGE (n:KG {id: 'handler:.CX4_op0d'}) SET n:Handler SET n += {method: 'CX4_op0d', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 49, sourceColumn: 1, sourceEndLine: 60, sourceParameters: 'address_space &space', sourceBody: 'cx4.C41FXVal    = CX4_readw(0x1f80);
	cx4.C41FYVal    = CX4_readw(0x1f83);
	cx4.C41FDistVal = CX4_readw(0x1f86);
	cx4.tanval = sqrt(((double)cx4.C41FYVal) * ((double)cx4.C41FYVal) + ((double)cx4.C41FXVal) * ((double)cx4.C41FXVal));
	cx4.tanval = (double)cx4.C41FDistVal / cx4.tanval;
	cx4.C41FYVal = (int16_t)(((double)cx4.C41FYVal * cx4.tanval) * 0.99);
	cx4.C41FXVal = (int16_t)(((double)cx4.C41FXVal * cx4.tanval) * 0.98);
	CX4_writew(space, 0x1f89, cx4.C41FXVal);
	CX4_writew(space, 0x1f8c, cx4.C41FYVal);'};
MERGE (n:KG {id: 'handler:.CX4_op10'}) SET n:Handler SET n += {method: 'CX4_op10', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 63, sourceColumn: 1, sourceEndLine: 88, sourceParameters: 'void', sourceBody: 'cx4.r0 = CX4_ldr(0);
	cx4.r1 = CX4_ldr(1);

	cx4.r4 = cx4.r0 & 0x1ff;
	if(cx4.r1 & 0x8000)
	{
		cx4.r1 |= ~0x7fff;
	}

	CX4_mul(CX4_cos(cx4.r4), cx4.r1, &cx4.r5, &cx4.r2);
	cx4.r5 = (cx4.r5 >> 16) & 0xff;
	cx4.r2 = (cx4.r2 << 8) + cx4.r5;

	CX4_mul(CX4_sin(cx4.r4), cx4.r1, &cx4.r5, &cx4.r3);
	cx4.r5 = (cx4.r5 >> 16) & 0xff;
	cx4.r3 = (cx4.r3 << 8) + cx4.r5;

	CX4_str(0, cx4.r0);
	CX4_str(1, cx4.r1);
	CX4_str(2, cx4.r2);
	CX4_str(3, cx4.r3);
	CX4_str(4, cx4.r4);
	CX4_str(5, cx4.r5);'};
MERGE (n:KG {id: 'handler:.CX4_ldr'}) SET n:Handler SET n += {method: 'CX4_ldr', ownerClass: '', sourceFile: 'src/mame/nintendo/snescx4.cpp', sourceLine: 31, sourceColumn: 1, sourceEndLine: 37, sourceParameters: 'uint8_t r', sourceBody: 'uint16_t addr = 0x0080 + (r * 3);
	return (cx4.reg[addr + 0] <<  0)
			| (cx4.reg[addr + 1] <<  8)
			| (cx4.reg[addr + 2] << 16);'};
MERGE (n:KG {id: 'handler:.CX4_mul'}) SET n:Handler SET n += {method: 'CX4_mul', ownerClass: '', sourceFile: 'src/mame/nintendo/snescx4.cpp', sourceLine: 47, sourceColumn: 1, sourceEndLine: 58, sourceParameters: 'uint32_t x, uint32_t y, uint32_t *rl, uint32_t *rh', sourceBody: 'int64_t rx = x & 0xffffff;
	int64_t ry = y & 0xffffff;
	if(rx & 0x800000)rx |= ~0x7fffff;
	if(ry & 0x800000)ry |= ~0x7fffff;

	rx *= ry;

	*rl = (rx)       & 0xffffff;
	*rh = (rx >> 24) & 0xffffff;'};
MERGE (n:KG {id: 'handler:.CX4_str'}) SET n:Handler SET n += {method: 'CX4_str', ownerClass: '', sourceFile: 'src/mame/nintendo/snescx4.cpp', sourceLine: 39, sourceColumn: 1, sourceEndLine: 45, sourceParameters: 'uint8_t r, uint32_t data', sourceBody: 'uint16_t addr = 0x0080 + (r * 3);
	cx4.reg[addr + 0] = (data >>  0);
	cx4.reg[addr + 1] = (data >>  8);
	cx4.reg[addr + 2] = (data >> 16);'};
MERGE (n:KG {id: 'handler:.CX4_cos'}) SET n:Handler SET n += {method: 'CX4_cos', ownerClass: '', sourceFile: 'src/mame/nintendo/snescx4.cpp', sourceLine: 81, sourceColumn: 1, sourceEndLine: 84, sourceParameters: 'uint32_t rx', sourceBody: 'return CX4_sin(rx + 0x080);'};
MERGE (n:KG {id: 'handler:.CX4_sin'}) SET n:Handler SET n += {method: 'CX4_sin', ownerClass: '', sourceFile: 'src/mame/nintendo/snescx4.cpp', sourceLine: 60, sourceColumn: 1, sourceEndLine: 79, sourceParameters: 'uint32_t rx', sourceBody: 'cx4.r0 = rx & 0x1ff;
	if(cx4.r0 & 0x100)
	{
		cx4.r0 ^= 0x1ff;
	}
	if(cx4.r0 & 0x080)
	{
		cx4.r0 ^= 0x0ff;
	}
	if(rx & 0x100)
	{
		return CX4_sin_table[cx4.r0 + 0x80];
	}
	else
	{
		return CX4_sin_table[cx4.r0];
	}'};
MERGE (n:KG {id: 'handler:.CX4_op13'}) SET n:Handler SET n += {method: 'CX4_op13', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 91, sourceColumn: 1, sourceEndLine: 112, sourceParameters: 'void', sourceBody: 'cx4.r0 = CX4_ldr(0);
	cx4.r1 = CX4_ldr(1);

	cx4.r4 = cx4.r0 & 0x1ff;

	CX4_mul(CX4_cos(cx4.r4), cx4.r1, &cx4.r5, &cx4.r2);
	cx4.r5 = (cx4.r5 >> 8) & 0xffff;
	cx4.r2 = (cx4.r2 << 16) + cx4.r5;

	CX4_mul(CX4_sin(cx4.r4), cx4.r1, &cx4.r5, &cx4.r3);
	cx4.r5 = (cx4.r5 >> 8) & 0xffff;
	cx4.r3 = (cx4.r3 << 16) + cx4.r5;

	CX4_str(0, cx4.r0);
	CX4_str(1, cx4.r1);
	CX4_str(2, cx4.r2);
	CX4_str(3, cx4.r3);
	CX4_str(4, cx4.r4);
	CX4_str(5, cx4.r5);'};
MERGE (n:KG {id: 'handler:.CX4_op15'}) SET n:Handler SET n += {method: 'CX4_op15', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 115, sourceColumn: 1, sourceEndLine: 123, sourceParameters: 'address_space &space', sourceBody: 'double temp = 0.0;
	cx4.C41FXVal = CX4_readw(0x1f80);
	cx4.C41FYVal = CX4_readw(0x1f83);
	temp = sqrt((double)cx4.C41FXVal * (double)cx4.C41FXVal + (double)cx4.C41FYVal * (double)cx4.C41FYVal);
	cx4.C41FDist = (int16_t)temp;
	CX4_writew(space, 0x1f80, cx4.C41FDist);'};
MERGE (n:KG {id: 'handler:.CX4_op1f'}) SET n:Handler SET n += {method: 'CX4_op1f', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 126, sourceColumn: 1, sourceEndLine: 146, sourceParameters: 'address_space &space', sourceBody: 'cx4.C41FXVal = CX4_readw(0x1f80);
	cx4.C41FYVal = CX4_readw(0x1f83);
	if(!cx4.C41FXVal)
	{
		cx4.C41FAngleRes = (cx4.C41FYVal > 0) ? 0x080 : 0x180;
	}
	else
	{
		cx4.tanval = ((double)cx4.C41FYVal) / ((double)cx4.C41FXVal);
		cx4.C41FAngleRes = (int16_t)(atan(cx4.tanval) / (std::numbers::pi * 2) * 512);
		cx4.C41FAngleRes = cx4.C41FAngleRes;
		if(cx4.C41FXVal < 0)
		{
			cx4.C41FAngleRes += 0x100;
		}
		cx4.C41FAngleRes &= 0x1ff;
	}
	CX4_writew(space, 0x1f86, cx4.C41FAngleRes);'};
MERGE (n:KG {id: 'handler:.CX4_op22'}) SET n:Handler SET n += {method: 'CX4_op22', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 149, sourceColumn: 1, sourceEndLine: 202, sourceParameters: 'void', sourceBody: 'int16_t angle1 = CX4_readw(0x1f8c) & 0x1ff;
	int16_t angle2 = CX4_readw(0x1f8f) & 0x1ff;
	int32_t tan1 = CX4_Tan(angle1);
	int32_t tan2 = CX4_Tan(angle2);
	int16_t y = CX4_readw(0x1f83) - CX4_readw(0x1f89);
	int16_t left, right;
	int32_t j;

	for(j = 0; j < 225; j++, y++)
	{
		if(y >= 0)
		{
			left  = CX4_sar((int32_t)tan1 * y, 16) - CX4_readw(0x1f80) + CX4_readw(0x1f86);
			right = CX4_sar((int32_t)tan2 * y, 16) - CX4_readw(0x1f80) + CX4_readw(0x1f86) + CX4_readw(0x1f93);

			if(left < 0 && right < 0)
			{
				left  = 1;
				right = 0;
			}
			else if(left < 0)
			{
				left  = 0;
			}
			else if(right < 0)
			{
				right = 0;
			}

			if(left > 255 && right > 255)
			{
				left  = 255;
				right = 254;
			}
			else if(left > 255)
			{
				left  = 255;
			}
			else if(right > 255)
			{
				right = 255;
			}
		}
		else
		{
			left  = 1;
			right = 0;
		}
		cx4.ram[j + 0x800] = (uint8_t)left;
		cx4.ram[j + 0x900] = (uint8_t)right;
	}'};
MERGE (n:KG {id: 'handler:.CX4_op25'}) SET n:Handler SET n += {method: 'CX4_op25', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 205, sourceColumn: 1, sourceEndLine: 212, sourceParameters: 'void', sourceBody: 'cx4.r0 = CX4_ldr(0);
	cx4.r1 = CX4_ldr(1);
	CX4_mul(cx4.r0, cx4.r1, &cx4.r0, &cx4.r1);
	CX4_str(0, cx4.r0);
	CX4_str(1, cx4.r1);'};
MERGE (n:KG {id: 'handler:.CX4_op2d'}) SET n:Handler SET n += {method: 'CX4_op2d', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 215, sourceColumn: 1, sourceEndLine: 227, sourceParameters: 'address_space &space', sourceBody: 'cx4.C4WFXVal  = CX4_readw(0x1f81);
	cx4.C4WFYVal  = CX4_readw(0x1f84);
	cx4.C4WFZVal  = CX4_readw(0x1f87);
	cx4.C4WFX2Val = CX4_read (0x1f89);
	cx4.C4WFY2Val = CX4_read (0x1f8a);
	cx4.C4WFDist  = CX4_read (0x1f8b);
	cx4.C4WFScale = CX4_readw(0x1f90);
	CX4_C4TransfWireFrame2();
	CX4_writew(space, 0x1f80, cx4.C4WFXVal);
	CX4_writew(space, 0x1f83, cx4.C4WFYVal);'};
MERGE (n:KG {id: 'handler:.CX4_op40'}) SET n:Handler SET n += {method: 'CX4_op40', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 230, sourceColumn: 1, sourceEndLine: 239, sourceParameters: 'void', sourceBody: 'uint32_t i;
	cx4.r0 = 0;
	for(i=0;i<0x800;i++)
	{
		cx4.r0 += cx4.ram[i];
	}
	CX4_str(0, cx4.r0);'};
MERGE (n:KG {id: 'handler:.CX4_op54'}) SET n:Handler SET n += {method: 'CX4_op54', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 242, sourceColumn: 1, sourceEndLine: 248, sourceParameters: 'void', sourceBody: 'cx4.r0 = CX4_ldr(0);
	CX4_mul(cx4.r0, cx4.r0, &cx4.r1, &cx4.r2);
	CX4_str(1, cx4.r1);
	CX4_str(2, cx4.r2);'};
MERGE (n:KG {id: 'handler:.CX4_op5c'}) SET n:Handler SET n += {method: 'CX4_op5c', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 251, sourceColumn: 1, sourceEndLine: 255, sourceParameters: 'void', sourceBody: 'CX4_str(0, 0x000000);
	CX4_immediate_reg(0);'};
MERGE (n:KG {id: 'handler:.CX4_immediate_reg'}) SET n:Handler SET n += {method: 'CX4_immediate_reg', ownerClass: '', sourceFile: 'src/mame/nintendo/snescx4.cpp', sourceLine: 86, sourceColumn: 1, sourceEndLine: 99, sourceParameters: 'uint32_t start', sourceBody: 'uint32_t i = 0;
	cx4.r0 = CX4_ldr(0);
	for(i = start; i < 48; i++)
	{
		if((cx4.r0 & 0x0fff) < 0x0c00)
		{
			cx4.ram[cx4.r0 & 0x0fff] = TABLE(i, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0xff, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0xff, 0xff, 0x00, 0x00, 0x80, 0xff, 0xff, 0x7f, 0x00, 0x80, 0x00, 0xff, 0x7f, 0x00, 0xff, 0x7f, 0xff, 0x7f, 0xff, 0xff, 0x00, 0x00, 0x01, 0xff, 0xff, 0xfe, 0x00, 0x01, 0x00, 0xff, 0xfe, 0x00);
		}
		cx4.r0++;
	}
	CX4_str(0, cx4.r0);'};
MERGE (n:KG {id: 'handler:.CX4_op5e'}) SET n:Handler SET n += {method: 'CX4_op5e', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 258, sourceColumn: 1, sourceEndLine: 258, sourceParameters: 'void', sourceBody: 'CX4_immediate_reg( 0);'};
MERGE (n:KG {id: 'handler:.CX4_op60'}) SET n:Handler SET n += {method: 'CX4_op60', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 259, sourceColumn: 1, sourceEndLine: 259, sourceParameters: 'void', sourceBody: 'CX4_immediate_reg( 3);'};
MERGE (n:KG {id: 'handler:.CX4_op62'}) SET n:Handler SET n += {method: 'CX4_op62', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 260, sourceColumn: 1, sourceEndLine: 260, sourceParameters: 'void', sourceBody: 'CX4_immediate_reg( 6);'};
MERGE (n:KG {id: 'handler:.CX4_op64'}) SET n:Handler SET n += {method: 'CX4_op64', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 261, sourceColumn: 1, sourceEndLine: 261, sourceParameters: 'void', sourceBody: 'CX4_immediate_reg( 9);'};
MERGE (n:KG {id: 'handler:.CX4_op66'}) SET n:Handler SET n += {method: 'CX4_op66', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 262, sourceColumn: 1, sourceEndLine: 262, sourceParameters: 'void', sourceBody: 'CX4_immediate_reg(12);'};
MERGE (n:KG {id: 'handler:.CX4_op68'}) SET n:Handler SET n += {method: 'CX4_op68', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 263, sourceColumn: 1, sourceEndLine: 263, sourceParameters: 'void', sourceBody: 'CX4_immediate_reg(15);'};
MERGE (n:KG {id: 'handler:.CX4_op6a'}) SET n:Handler SET n += {method: 'CX4_op6a', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 264, sourceColumn: 1, sourceEndLine: 264, sourceParameters: 'void', sourceBody: 'CX4_immediate_reg(18);'};
MERGE (n:KG {id: 'handler:.CX4_op6c'}) SET n:Handler SET n += {method: 'CX4_op6c', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 265, sourceColumn: 1, sourceEndLine: 265, sourceParameters: 'void', sourceBody: 'CX4_immediate_reg(21);'};
MERGE (n:KG {id: 'handler:.CX4_op6e'}) SET n:Handler SET n += {method: 'CX4_op6e', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 266, sourceColumn: 1, sourceEndLine: 266, sourceParameters: 'void', sourceBody: 'CX4_immediate_reg(24);'};
MERGE (n:KG {id: 'handler:.CX4_op70'}) SET n:Handler SET n += {method: 'CX4_op70', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 267, sourceColumn: 1, sourceEndLine: 267, sourceParameters: 'void', sourceBody: 'CX4_immediate_reg(27);'};
MERGE (n:KG {id: 'handler:.CX4_op72'}) SET n:Handler SET n += {method: 'CX4_op72', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 268, sourceColumn: 1, sourceEndLine: 268, sourceParameters: 'void', sourceBody: 'CX4_immediate_reg(30);'};
MERGE (n:KG {id: 'handler:.CX4_op74'}) SET n:Handler SET n += {method: 'CX4_op74', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 269, sourceColumn: 1, sourceEndLine: 269, sourceParameters: 'void', sourceBody: 'CX4_immediate_reg(33);'};
MERGE (n:KG {id: 'handler:.CX4_op76'}) SET n:Handler SET n += {method: 'CX4_op76', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 270, sourceColumn: 1, sourceEndLine: 270, sourceParameters: 'void', sourceBody: 'CX4_immediate_reg(36);'};
MERGE (n:KG {id: 'handler:.CX4_op78'}) SET n:Handler SET n += {method: 'CX4_op78', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 271, sourceColumn: 1, sourceEndLine: 271, sourceParameters: 'void', sourceBody: 'CX4_immediate_reg(39);'};
MERGE (n:KG {id: 'handler:.CX4_op7a'}) SET n:Handler SET n += {method: 'CX4_op7a', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 272, sourceColumn: 1, sourceEndLine: 272, sourceParameters: 'void', sourceBody: 'CX4_immediate_reg(42);'};
MERGE (n:KG {id: 'handler:.CX4_op7c'}) SET n:Handler SET n += {method: 'CX4_op7c', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 273, sourceColumn: 1, sourceEndLine: 273, sourceParameters: 'void', sourceBody: 'CX4_immediate_reg(45);'};
MERGE (n:KG {id: 'handler:.CX4_op89'}) SET n:Handler SET n += {method: 'CX4_op89', ownerClass: '', sourceFile: 'src/mame/nintendo/cx4ops.ipp', sourceLine: 276, sourceColumn: 1, sourceEndLine: 280, sourceParameters: 'void', sourceBody: 'CX4_str(0, 0x054336);
	CX4_str(1, 0xffffff);'};
MERGE (n:KG {id: 'handler:snes_state.snes_w_io'}) SET n:Handler SET n += {method: 'snes_w_io', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 441, sourceColumn: 1, sourceEndLine: 548, sourceConstants: ['I=0', 'X=2', 'INIDISP=8448', 'MPYL=8500', 'MPYM=8501', 'MPYH=8502', 'APU00=8512', 'WMDATA=8576', 'WMADDL=8577', 'WMADDM=8578', 'WMADDH=8579', 'OLDJOY1=16406', 'OLDJOY2=16407', 'NMITIMEN=16896', 'WRIO=16897', 'HTIMEL=16903', 'HTIMEH=16904', 'VTIMEL=16905', 'VTIMEH=16906', 'MDMAEN=16907', 'HDMAEN=16908', 'TIMEUP=16913', 'HVBJOY=16914', 'RDIO=16915', 'JOY1L=16920', 'JOY1H=16921', 'JOY2L=16922', 'JOY2H=16923', 'JOY3L=16924', 'JOY3H=16925', 'JOY4L=16926', 'JOY4H=16927', 'DMAP0=17152'], sourceParameters: 'address_space &space, offs_t offset, uint8_t data', sourceBody: '// PPU accesses are from 2100 to 213f
	if (offset >= INIDISP && offset < APU00)
	{
		m_ppu->write(offset, data);
		return;
	}

	// APU is mirrored from 2140 to 217f
	if (offset >= APU00 && offset < WMDATA)
	{
//      printf("816: %02x to APU @ %d (PC=%06x)\\n", data, offset & 3,m_maincpu->pc());
		m_soundcpu->spc_port_in_w(offset & 0x3, data);
		machine().scheduler().perfect_quantum(attotime::from_usec(20));
		return;
	}

	// DMA accesses are from 4300 to 437f
	if (offset >= DMAP0 && offset < 0x4380)
	{
		snes_io_dma_w(offset, data);
		return;
	}

	/* offset is from 0x000000 */
	switch (offset)
	{
		case WMDATA:    /* Data to write to WRAM */
			m_wram[m_wram_address++] = data;
			m_wram_address &= 0x1ffff;
			return;
		case WMADDL:    /* Address to read/write to wram (low) */
			m_wram_address = (m_wram_address & 0x1ff00) | (data <<  0);
			return;
		case WMADDM:    /* Address to read/write to wram (mid) */
			m_wram_address = (m_wram_address & 0x100ff) | (data <<  8);
			return;
		case WMADDH:    /* Address to read/write to wram (high) */
			m_wram_address = (m_wram_address & 0x0ffff) | ((data & 1) << 16);
			return;
		case OLDJOY1:   /* Old NES joystick support */
			write_joy_latch(data);
			if (m_is_nss)
				m_game_over_flag = (data & 4) >> 2;
			return;
		case OLDJOY2:   /* Old NES joystick support */
			return;
		case NMITIMEN:  /* Flag for v-blank, timer int. and joy read */
			if ((data & 0x30) == 0x00)
			{
				m_cpu_regs[(TIMEUP) - 0x4200] = 0;   // clear pending IRQ if irq is disabled here, 3x3 Eyes - Seima Korin Den behaves on this
				scpu_irq_refresh();
			}
			m_cpu_regs[(NMITIMEN) - 0x4200] = data;
			return;
		case WRIO:      /* Programmable I/O port - latches H/V counters on a 0->1 transition */
			wrio_write(data);
			m_cpu_regs[(WRIO) - 0x4200] = data;
			return;
		case HTIMEL:    /* H-Count timer settings (low)  */
			m_htime = (m_htime & 0x100) | (data <<  0);
			return;
		case HTIMEH:    /* H-Count timer settings (high) */
			m_htime = (m_htime & 0x0ff) | ((data & 1) <<  8);
			return;
		case VTIMEL:    /* V-Count timer settings (low)  */
			m_vtime = (m_vtime & 0x100) | (data <<  0);
			return;
		case VTIMEH:    /* V-Count timer settings (high) */
			m_vtime = (m_vtime & 0x0ff) | ((data & 1) <<  8);
			return;
		case MDMAEN:    /* DMA channel designation and trigger */
			dma(space, data);
			m_cpu_regs[(MDMAEN) - 0x4200] = 0;   /* Once DMA is done we need to reset all bits to 0 */
			return;
		case HDMAEN:    /* HDMA channel designation */
			if (data != m_cpu_regs[(HDMAEN) - 0x4200]) //if a HDMA is enabled, data is inited at the next scanline
				m_hdma_reset_timer->adjust(m_screen->time_until_pos(m_ppu->current_vert() + 1));
			m_cpu_regs[(HDMAEN) - 0x4200] = data;
			return;
		case TIMEUP:    // IRQ Flag is cleared on both read and write
			m_cpu_regs[(TIMEUP) - 0x4200] = 0;
			scpu_irq_refresh();
			return;
		/* Following are read-only */
		case HVBJOY:    /* H/V blank and joypad enable */
		case MPYL:      /* Multiplication result (low) */
		case MPYM:      /* Multiplication result (mid) */
		case MPYH:      /* Multiplication result (high) */
		case RDIO:
//      case RDDIVL:
//      case RDDIVH:
//      case RDMPYL:
//      case RDMPYH:
		case JOY1L:
		case JOY1H:
		case JOY2L:
		case JOY2H:
		case JOY3L:
		case JOY3H:
		case JOY4L:
		case JOY4H:
			logerror( "Write to read-only register: %X value: %X\\n", offset, data );
			return;
	}'};
MERGE (n:KG {id: 'handler:snes_state.snes_io_dma_w'}) SET n:Handler SET n += {method: 'snes_io_dma_w', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 282, sourceColumn: 1, sourceEndLine: 338, sourceConstants: ['DMAP0=17152', 'BBAD0=17153', 'A1T0L=17154', 'A1T0H=17155', 'A1B0=17156', 'DAS0L=17157', 'DAS0H=17158', 'DSAB0=17159', 'A2A0L=17160', 'A2A0H=17161', 'NTRL0=17162', 'DMAP1=17168', 'BBAD1=17169', 'A1T1L=17170', 'A1T1H=17171', 'A1B1=17172', 'DAS1L=17173', 'DAS1H=17174', 'DSAB1=17175', 'A2A1L=17176', 'A2A1H=17177', 'NTRL1=17178', 'DMAP2=17184', 'BBAD2=17185', 'A1T2L=17186', 'A1T2H=17187', 'A1B2=17188', 'DAS2L=17189', 'DAS2H=17190', 'DSAB2=17191', 'A2A2L=17192', 'A2A2H=17193', 'NTRL2=17194', 'DMAP3=17200', 'BBAD3=17201', 'A1T3L=17202', 'A1T3H=17203', 'A1B3=17204', 'DAS3L=17205', 'DAS3H=17206', 'DSAB3=17207', 'A2A3L=17208', 'A2A3H=17209', 'NTRL3=17210', 'DMAP4=17216', 'BBAD4=17217', 'A1T4L=17218', 'A1T4H=17219', 'A1B4=17220', 'DAS4L=17221', 'DAS4H=17222', 'DSAB4=17223', 'A2A4L=17224', 'A2A4H=17225', 'NTRL4=17226', 'DMAP5=17232', 'BBAD5=17233', 'A1T5L=17234', 'A1T5H=17235', 'A1B5=17236', 'DAS5L=17237', 'DAS5H=17238', 'DSAB5=17239', 'A2A5L=17240', 'A2A5H=17241', 'NTRL5=17242', 'DMAP6=17248', 'BBAD6=17249', 'A1T6L=17250', 'A1T6H=17251', 'A1B6=17252', 'DAS6L=17253', 'DAS6H=17254', 'DSAB6=17255', 'A2A6L=17256', 'A2A6H=17257', 'NTRL6=17258', 'DMAP7=17264', 'BBAD7=17265', 'A1T7L=17266', 'A1T7H=17267', 'A1B7=17268', 'DAS7L=17269', 'DAS7H=17270', 'DSAB7=17271', 'A2A7L=17272', 'A2A7H=17273', 'NTRL7=17274'], sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'switch (offset)
	{
			/* Below is all DMA related */
		case DMAP0: case DMAP1: case DMAP2: case DMAP3: /*0x43n0*/
		case DMAP4: case DMAP5: case DMAP6: case DMAP7:
			m_dma_channel[(offset >> 4) & 0x07].dmap = data;
			break;
		case BBAD0: case BBAD1: case BBAD2: case BBAD3: /*0x43n1*/
		case BBAD4: case BBAD5: case BBAD6: case BBAD7:
			m_dma_channel[(offset >> 4) & 0x07].dest_addr = data;
			break;
		case A1T0L: case A1T1L: case A1T2L: case A1T3L: /*0x43n2*/
		case A1T4L: case A1T5L: case A1T6L: case A1T7L:
			m_dma_channel[(offset >> 4) & 0x07].src_addr = (m_dma_channel[(offset >> 4) & 0x07].src_addr & 0xff00) | (data << 0);
			break;
		case A1T0H: case A1T1H: case A1T2H: case A1T3H: /*0x43n3*/
		case A1T4H: case A1T5H: case A1T6H: case A1T7H:
			m_dma_channel[(offset >> 4) & 0x07].src_addr = (m_dma_channel[(offset >> 4) & 0x07].src_addr & 0x00ff) | (data << 8);
			break;
		case A1B0: case A1B1: case A1B2: case A1B3:     /*0x43n4*/
		case A1B4: case A1B5: case A1B6: case A1B7:
			m_dma_channel[(offset >> 4) & 0x07].bank = data;
			break;
		case DAS0L: case DAS1L: case DAS2L: case DAS3L: /*0x43n5*/
		case DAS4L: case DAS5L: case DAS6L: case DAS7L:
			m_dma_channel[(offset >> 4) & 0x07].trans_size = (m_dma_channel[(offset >> 4) & 0x07].trans_size & 0xff00) | (data << 0);
			break;
		case DAS0H: case DAS1H: case DAS2H: case DAS3H: /*0x43n6*/
		case DAS4H: case DAS5H: case DAS6H: case DAS7H:
			m_dma_channel[(offset >> 4) & 0x07].trans_size = (m_dma_channel[(offset >> 4) & 0x07].trans_size & 0x00ff) | (data << 8);
			break;
		case DSAB0: case DSAB1: case DSAB2: case DSAB3: /*0x43n7*/
		case DSAB4: case DSAB5: case DSAB6: case DSAB7:
			m_dma_channel[(offset >> 4) & 0x07].ibank = data;
			break;
		case A2A0L: case A2A1L: case A2A2L: case A2A3L: /*0x43n8*/
		case A2A4L: case A2A5L: case A2A6L: case A2A7L:
			m_dma_channel[(offset >> 4) & 0x07].hdma_addr = (m_dma_channel[(offset >> 4) & 0x07].hdma_addr & 0xff00) | (data << 0);
			break;
		case A2A0H: case A2A1H: case A2A2H: case A2A3H: /*0x43n9*/
		case A2A4H: case A2A5H: case A2A6H: case A2A7H:
			m_dma_channel[(offset >> 4) & 0x07].hdma_addr = (m_dma_channel[(offset >> 4) & 0x07].hdma_addr & 0x00ff) | (data << 8);
			break;
		case NTRL0: case NTRL1: case NTRL2: case NTRL3: /*0x43na*/
		case NTRL4: case NTRL5: case NTRL6: case NTRL7:
			m_dma_channel[(offset >> 4) & 0x07].hdma_line_counter = data;
			break;
		case 0x430b: case 0x431b: case 0x432b: case 0x433b:
		case 0x434b: case 0x435b: case 0x436b: case 0x437b:
			m_dma_channel[(offset >> 4) & 0x07].unk = data;
			break;
	}

	m_dma_regs[(offset) - 0x4300] = data;'};
MERGE (n:KG {id: 'handler:snes_state.write_joy_latch'}) SET n:Handler SET n += {method: 'write_joy_latch', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1129, sourceColumn: 1, sourceEndLine: 560, sourceParameters: 'uint8_t data', sourceBody: 'm_ctrl1->write_strobe(data);
	m_ctrl2->write_strobe(data);', dispatchedFrom: 'snes_console_state'};
MERGE (n:KG {id: 'handler:snes_state.wrio_write'}) SET n:Handler SET n += {method: 'wrio_write', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1135, sourceColumn: 1, sourceEndLine: 570, sourceConstants: ['WRIO=16897'], sourceParameters: 'uint8_t data', sourceBody: 'if (!(m_cpu_regs[(WRIO) - 0x4200] & 0x80) && (data & 0x80))
	{
		// external latch
		m_ppu->set_latch_hv(m_ppu->current_x(), m_ppu->current_y());
	}

	m_ctrl1->write_pin6(BIT(data, 6));
	m_ctrl2->write_pin6(BIT(data, 7));', dispatchedFrom: 'snes_console_state'};
MERGE (n:KG {id: 'handler:snes_state.dma'}) SET n:Handler SET n += {method: 'dma', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 1380, sourceColumn: 1, sourceEndLine: 1500, sourceConstants: ['X=2'], sourceParameters: 'address_space &space, uint8_t channels', sourceBody: 'int8_t increment;
	uint16_t bbus;
	uint32_t abus, abus_bank;
	uint16_t length;

	/* FIXME: we also need to round to the nearest 8 master cycles */

	/* Assume priority of the 8 DMA channels is 0-7 */
	for (int i = 0; i < 8; i++)
	{
		if (BIT(channels, i))
		{
			/* FIXME: the following should be used to stop DMA if the same channel is used by HDMA (being set to 1 in snes_hdma)
			 However, this cannot be implemented as is atm, because currently DMA transfers always happen as soon as they are enabled... */
			m_dma_channel[i].dma_disabled = 0;

			//printf( "Making a transfer on channel %d\\n", i );
			/* Find transfer addresses */
			abus = m_dma_channel[i].src_addr;
			abus_bank = m_dma_channel[i].bank << 16;
			bbus = m_dma_channel[i].dest_addr + 0x2100;

			//printf("Address: %06x\\n", abus | abus_bank);
			/* Auto increment */
			if (m_dma_channel[i].dmap & 0x8)
				increment = 0;
			else
			{
				if (m_dma_channel[i].dmap & 0x10)
					increment = -1;
				else
					increment = 1;
			}

			/* Number of bytes to transfer */
			length = m_dma_channel[i].trans_size;

//          printf( "DMA-Ch %d: len: %X, abus: %X, bbus: %X, incr: %d, dir: %s, type: %d\\n", i, length, abus | abus_bank, bbus, increment, m_dma_channel[i].dmap & 0x80 ? "PPU->CPU" : "CPU->PPU", m_dma_channel[i].dmap & 0x07);

#ifdef SNES_DBG_DMA
			osd_printf_debug( "DMA-Ch %d: len: %X, abus: %X, bbus: %X, incr: %d, dir: %s, type: %d\\n", i, length, abus | abus_bank, bbus, increment, m_dma_channel[i].dmap & 0x80 ? "PPU->CPU" : "CPU->PPU", m_dma_channel[i].dmap & 0x07);
#endif

			switch (m_dma_channel[i].dmap & 0x07)
			{
				case 0:     /* 1 register write once */
				case 2:     /* 1 register write twice */
				case 6:     /* 1 register write twice */
					do
					{
						dma_transfer(space, i, (abus & 0xffff) | abus_bank, bbus);
						abus += increment;
					} while (--length && !m_dma_channel[i].dma_disabled);
					break;
				case 1:     /* 2 registers write once */
				case 5:     /* 2 registers write twice alternate */
					do
					{
						dma_transfer(space, i, (abus & 0xffff) | abus_bank, bbus);
						abus += increment;
						if (!(--length) || m_dma_channel[i].dma_disabled)
							break;
						dma_transfer(space, i, (abus & 0xffff) | abus_bank, bbus + 1);
						abus += increment;
					} while (--length && !m_dma_channel[i].dma_disabled);
					break;
				case 3:     /* 2 registers write twice each */
				case 7:     /* 2 registers write twice each */
					do
					{
						dma_transfer(space, i, (abus & 0xffff) | abus_bank, bbus);
						abus += increment;
						if (!(--length) || m_dma_channel[i].dma_disabled)
							break;
						dma_transfer(space, i, (abus & 0xffff) | abus_bank, bbus);
						abus += increment;
						if (!(--length) || m_dma_channel[i].dma_disabled)
							break;
						dma_transfer(space, i, (abus & 0xffff) | abus_bank, bbus + 1);
						abus += increment;
						if (!(--length) || m_dma_channel[i].dma_disabled)
							break;
						dma_transfer(space, i, (abus & 0xffff) | abus_bank, bbus + 1);
						abus += increment;
					} while (--length && !m_dma_channel[i].dma_disabled);
					break;
				case 4:     /* 4 registers write once */
					do
					{
						dma_transfer(space, i, (abus & 0xffff) | abus_bank, bbus);
						abus += increment;
						if (!(--length) || m_dma_channel[i].dma_disabled)
							break;
						dma_transfer(space, i, (abus & 0xffff) | abus_bank, bbus + 1);
						abus += increment;
						if (!(--length) || m_dma_channel[i].dma_disabled)
							break;
						dma_transfer(space, i, (abus & 0xffff) | abus_bank, bbus + 2);
						abus += increment;
						if (!(--length) || m_dma_channel[i].dma_disabled)
							break;
						dma_transfer(space, i, (abus & 0xffff) | abus_bank, bbus + 3);
						abus += increment;
					} while (--length && !m_dma_channel[i].dma_disabled);
					break;
				default:
#ifdef MAME_DEBUG
					osd_printf_debug("  DMA of unsupported type: %d\\n", m_dma_channel[i].dmap & 0x07);
#endif
					break;
			}

			/* We\'re done, so write the new abus back to the registers */
			m_dma_channel[i].src_addr = abus;
			m_dma_channel[i].trans_size = 0;
		}
	}'};
MERGE (n:KG {id: 'handler:snes_console_state.snes20_hi_r'}) SET n:Handler SET n += {method: 'snes20_hi_r', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 133, sourceColumn: 1, sourceEndLine: 188, sourceConstants: ['SNES_CX4=4', 'SNES_ST010=17', 'SNES_ST011=18', 'SNES_SUFAMITURBO=26'], sourceParameters: 'address_space &space, offs_t offset', sourceBody: 'uint16_t address = offset & 0xffff;

	// take care of add-on IO
	if ((m_cartslot->get_type() == SNES_ST010 || m_cartslot->get_type() == SNES_ST011)
		&& (offset >= 0x600000 && offset < 0x680000 && (offset & 0xffff) < 0x4000))
		return m_cartslot->chip_read(offset);
	else if ((m_cartslot->get_type() == SNES_ST010 || m_cartslot->get_type() == SNES_ST011)
				&& (offset >= 0x680000 && offset < 0x700000 && (offset & 0xffff) < 0x8000))
		return m_cartslot->chip_read(offset);
	else if (m_cartslot->get_type() == SNES_CX4
				&& (offset < 0x400000 && (offset & 0xffff) >= 0x6000 && (offset & 0xffff) < 0x8000))    // hack until we emulate the real CPU
		return CX4_read((offset & 0xffff) - 0x6000);

	if (offset < 0x400000)
	{
		if (address < 0x2000)
			return m_wram[address];
		else if (address < 0x6000)
			return snes_r_io(address);
		else if (address < 0x8000)
			return snes_open_bus_r();
		else
			return m_cartslot->read_h(offset);
	}
	else if (offset < 0x700000)
	{
		if (address < 0x8000)
			return snes_open_bus_r();
		else
			return m_cartslot->read_h(offset);
	}
	else
	{
		if (m_type == SNES_SUFAMITURBO && address >= 0x8000 && offset < 0x740000)
			return m_cartslot->read_h(offset);

		// here usually there is SRAM mirrored in the whole range, but if ROM is very large then arrives here too (see tokimeki and wizardg4)
		if (m_cartslot->m_cart->get_rom_size() > 0x200000 && address >= 0x8000)
			return m_cartslot->read_h(offset);
		else
		{
			if (m_cartslot->m_cart->get_nvram_size() > 0x8000)
			{
				// In this case, SRAM is mapped in 0x8000 chunks at diff offsets: 0x700000-0x707fff, 0x710000-0x717fff, etc.
				offset = ((offset - 0x700000) / 0x10000) * 0x8000 + (offset & 0x7fff);
				return m_cartslot->read_ram(offset);
			}
			else if (m_cartslot->m_cart->get_nvram_size() > 0)
				return m_cartslot->read_ram(offset);
			else
				return snes_open_bus_r();
		}
	}', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:snes_console_state.snessgb_lo_r'}) SET n:Handler SET n += {method: 'snessgb_lo_r', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 886, sourceColumn: 1, sourceEndLine: 889, sourceParameters: 'address_space &space, offs_t offset', sourceBody: 'return snessgb_hi_r(space, offset);', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:snes_console_state.snessgb_hi_r'}) SET n:Handler SET n += {method: 'snessgb_hi_r', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 865, sourceColumn: 1, sourceEndLine: 884, sourceParameters: 'address_space &space, offs_t offset', sourceBody: 'uint16_t address = offset & 0xffff;

	if (offset < 0x400000)
	{
		if (address < 0x2000)
			return m_wram[address];
		else if (address < 0x6000)
			return snes_r_io(address);
		else if (address < 0x8000)
			return m_cartslot->chip_read(offset);
		else
			return m_cartslot->read_h(offset);
	}
	else if (address >= 0x8000)
		return m_cartslot->read_h(offset);

	return snes_open_bus_r();', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:snes_console_state.snessgb_lo_w'}) SET n:Handler SET n += {method: 'snessgb_lo_w', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 905, sourceColumn: 1, sourceEndLine: 908, sourceParameters: 'address_space &space, offs_t offset, uint8_t data', sourceBody: 'snessgb_hi_w(space, offset, data);'};
MERGE (n:KG {id: 'handler:snes_console_state.snessgb_hi_w'}) SET n:Handler SET n += {method: 'snessgb_hi_w', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 891, sourceColumn: 1, sourceEndLine: 903, sourceParameters: 'address_space &space, offs_t offset, uint8_t data', sourceBody: 'uint16_t address = offset & 0xffff;
	if (offset < 0x400000)
	{
		if (address < 0x2000)
			m_wram[address] = data;
		else if (address < 0x6000)
			snes_w_io(space, address, data);
		else if (address < 0x8000)
			m_cartslot->chip_write(offset, data);
	}'};
MERGE (n:KG {id: 'handler:snes_console_state.snessa1_lo_r'}) SET n:Handler SET n += {method: 'snessa1_lo_r', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 536, sourceColumn: 1, sourceEndLine: 562, sourceParameters: 'address_space &space, offs_t offset', sourceBody: 'uint16_t address = offset & 0xffff;

	if (offset < 0x400000)
	{
		if (address < 0x2000)
			return m_wram[address];
		else if (address < 0x6000)
		{
			if (address >= 0x2200 && address < 0x2400)
				return m_cartslot->chip_read(offset);    // SA-1 Regs
			else if (address >= 0x3000 && address < 0x3800)
				return m_cartslot->chip_read(offset);    // Internal SA-1 RAM (2K)
			else
				return snes_r_io(address);
		}
		else if (address < 0x8000)
			return m_cartslot->chip_read(offset);        // SA-1 BWRAM
		else
			return m_cartslot->read_l(offset);
	}
	else if (offset < 0x500000)
		return m_cartslot->chip_read(offset);        // SA-1 BWRAM (not mirrored above!)
	else
		return snes_r_io(address);                   // nothing mapped here!', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:snes_console_state.snessa1_lo_w'}) SET n:Handler SET n += {method: 'snessa1_lo_w', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 585, sourceColumn: 1, sourceEndLine: 591, sourceParameters: 'address_space &space, offs_t offset, uint8_t data', sourceBody: 'if (offset >= 0x400000 && offset < 0x500000)
		m_cartslot->chip_write(offset, data);        // SA-1 BWRAM (not mirrored above!)
	else
		snessa1_hi_w(space, offset, data);'};
MERGE (n:KG {id: 'handler:snes_console_state.snessa1_hi_w'}) SET n:Handler SET n += {method: 'snessa1_hi_w', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 564, sourceColumn: 1, sourceEndLine: 583, sourceParameters: 'address_space &space, offs_t offset, uint8_t data', sourceBody: 'uint16_t address = offset & 0xffff;
	if (offset < 0x400000)
	{
		if (address < 0x2000)
			m_wram[address] = data;
		else if (address < 0x6000)
		{
			if (address >= 0x2200 && address < 0x2400)
				m_cartslot->chip_write(offset, data);    // SA-1 Regs
			else if (address >= 0x3000 && address < 0x3800)
				m_cartslot->chip_write(offset, data);    // Internal SA-1 RAM (2K)
			else
				snes_w_io(space, address, data);
		}
		else if (address < 0x8000)
			m_cartslot->chip_write(offset, data);        // SA-1 BWRAM
	}'};
MERGE (n:KG {id: 'handler:snes_console_state.snessa1_hi_r'}) SET n:Handler SET n += {method: 'snessa1_hi_r', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 510, sourceColumn: 1, sourceEndLine: 534, sourceParameters: 'address_space &space, offs_t offset', sourceBody: 'uint16_t address = offset & 0xffff;

	if (offset < 0x400000)
	{
		if (address < 0x2000)
			return m_wram[address];
		else if (address < 0x6000)
		{
			if (address >= 0x2200 && address < 0x2400)
				return m_cartslot->chip_read(offset);    // SA-1 Regs
			else if (address >= 0x3000 && address < 0x3800)
				return m_cartslot->chip_read(offset);    // Internal SA-1 RAM (2K)
			else
				return snes_r_io(address);
		}
		else if (address < 0x8000)
			return m_cartslot->chip_read(offset);        // SA-1 BWRAM
		else
			return m_cartslot->read_h(offset);
	}
	else
		return m_cartslot->read_h(offset);', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:snes_console_state.snessfx_lo_r'}) SET n:Handler SET n += {method: 'snessfx_lo_r', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 454, sourceColumn: 1, sourceEndLine: 478, sourceParameters: 'address_space &space, offs_t offset', sourceBody: 'uint16_t address = offset & 0xffff;

	if (offset < 0x400000)
	{
		if (address < 0x2000)
			return m_wram[address];
		else if (address < 0x6000)
		{
			if (address >= 0x3000 && address < 0x3300)
				return m_cartslot->chip_read(offset);
			else
				return snes_r_io(address);
		}
		else if (address < 0x8000)
			return m_cartslot->read_ram(offset & 0x1fff);
		else
			return m_cartslot->read_l(offset);
	}
	else if (offset < 0x600000)
		return m_cartslot->read_l(offset);
	else
		return m_cartslot->read_ram(offset);', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:snes_console_state.snessfx_lo_w'}) SET n:Handler SET n += {method: 'snessfx_lo_w', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 501, sourceColumn: 1, sourceEndLine: 504, sourceParameters: 'address_space &space, offs_t offset, uint8_t data', sourceBody: 'snessfx_hi_w(space, offset, data);'};
MERGE (n:KG {id: 'handler:snes_console_state.snessfx_hi_w'}) SET n:Handler SET n += {method: 'snessfx_hi_w', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 480, sourceColumn: 1, sourceEndLine: 499, sourceParameters: 'address_space &space, offs_t offset, uint8_t data', sourceBody: 'uint16_t address = offset & 0xffff;
	if (offset < 0x400000)
	{
		if (address < 0x2000)
			m_wram[address] = data;
		else if (address < 0x6000)
		{
			if (address >= 0x3000 && address < 0x3300)
				m_cartslot->chip_write(offset, data);
			else
				snes_w_io(space, address, data);
		}
		else if (address < 0x8000)
			m_cartslot->write_ram(offset & 0x1fff, data);
	}
	else if (offset >= 0x600000)
		m_cartslot->write_ram(offset, data);'};
MERGE (n:KG {id: 'handler:snes_console_state.snessfx_hi_r'}) SET n:Handler SET n += {method: 'snessfx_hi_r', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 428, sourceColumn: 1, sourceEndLine: 452, sourceParameters: 'address_space &space, offs_t offset', sourceBody: 'uint16_t address = offset & 0xffff;

	if (offset < 0x400000)
	{
		if (address < 0x2000)
			return m_wram[address];
		else if (address < 0x6000)
		{
			if (address >= 0x3000 && address < 0x3300)
				return m_cartslot->chip_read(offset);
			else
				return snes_r_io(address);
		}
		else if (address < 0x8000)
			return m_cartslot->read_ram(offset & 0x1fff);
		else
			return m_cartslot->read_h(offset);
	}
	else if (offset < 0x600000)
		return m_cartslot->read_h(offset);
	else
		return m_cartslot->read_ram(offset);', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:snes_console_state.snessdd1_lo_r'}) SET n:Handler SET n += {method: 'snessdd1_lo_r', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 695, sourceColumn: 1, sourceEndLine: 719, sourceParameters: 'address_space &space, offs_t offset', sourceBody: 'uint16_t address = offset & 0xffff;

	if (offset < 0x400000)
	{
		if (address < 0x2000)
			return m_wram[address];
		else if (address < 0x6000)
		{
			if (address >= 0x4800 && address < 0x4808)
				return m_cartslot->chip_read(address);

			return snes_r_io(address);
		}
		else if (address < 0x8000)
			return snes_open_bus_r();
		else
			return m_cartslot->read_l(offset);
	}
	else if (offset >= 0x700000 && address < 0x8000 && m_cartslot->m_cart->get_nvram_size())    // NVRAM access
		return m_cartslot->read_ram(offset);
	else    // ROM access
		return m_cartslot->read_l(offset);', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:snes_console_state.snessdd1_lo_w'}) SET n:Handler SET n += {method: 'snessdd1_lo_w', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 729, sourceColumn: 1, sourceEndLine: 732, sourceParameters: 'address_space &space, offs_t offset, uint8_t data', sourceBody: 'snessdd1_hi_w(space, offset, data);'};
MERGE (n:KG {id: 'handler:snes_console_state.snessdd1_hi_w'}) SET n:Handler SET n += {method: 'snessdd1_hi_w', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 734, sourceColumn: 1, sourceEndLine: 758, sourceParameters: 'address_space &space, offs_t offset, uint8_t data', sourceBody: 'uint16_t address = offset & 0xffff;
	if (offset < 0x400000)
	{
		if (address < 0x2000)
			m_wram[address] = data;
		else if (address < 0x6000)
		{
			if (address >= 0x4300 && address < 0x4380)
			{
				m_cartslot->chip_write(address, data);
				// here we don\'t return, but we let the w_io happen...
			}
			if (address >= 0x4800 && address < 0x4808)
			{
				m_cartslot->chip_write(address, data);
				return;
			}
			snes_w_io(space, address, data);
		}
	}
	if (offset >= 0x700000 && address < 0x8000 && m_cartslot->m_cart->get_nvram_size())
		return m_cartslot->write_ram(offset, data);'};
MERGE (n:KG {id: 'handler:snes_console_state.snessdd1_hi_r'}) SET n:Handler SET n += {method: 'snessdd1_hi_r', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 721, sourceColumn: 1, sourceEndLine: 727, sourceParameters: 'address_space &space, offs_t offset', sourceBody: 'if (offset >= 0x400000)
		return m_cartslot->read_h(offset);
	else
		return snessdd1_lo_r(space, offset);', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:snes_console_state.snesbsx_lo_r'}) SET n:Handler SET n += {method: 'snesbsx_lo_r', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 826, sourceColumn: 1, sourceEndLine: 853, sourceParameters: 'address_space &space, offs_t offset', sourceBody: 'uint16_t address = offset & 0xffff;

	if (offset < 0x400000)
	{
		if (address < 0x2000)
			return m_wram[address];
		else if (address < 0x6000)
		{
			if (address >= 0x2188 && address < 0x21a0)
				return m_cartslot->chip_read(offset);
			if (address >= 0x5000)
				return m_cartslot->chip_read(offset);
			return snes_r_io(address);
		}
		else if (address < 0x8000)
		{
			if (offset >= 0x200000)
				return m_cartslot->read_l(offset);
			else
				return snes_open_bus_r();
		}
		else
			return m_cartslot->read_l(offset);
	}
	return m_cartslot->read_l(offset);', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:snes_console_state.snesbsx_lo_w'}) SET n:Handler SET n += {method: 'snesbsx_lo_w', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 855, sourceColumn: 1, sourceEndLine: 858, sourceParameters: 'address_space &space, offs_t offset, uint8_t data', sourceBody: 'snesbsx_hi_w(space, offset, data);'};
MERGE (n:KG {id: 'handler:snes_console_state.snesbsx_hi_w'}) SET n:Handler SET n += {method: 'snesbsx_hi_w', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 794, sourceColumn: 1, sourceEndLine: 824, sourceParameters: 'address_space &space, offs_t offset, uint8_t data', sourceBody: 'uint16_t address = offset & 0xffff;
	if (offset < 0x400000)
	{
		if (address < 0x2000)
			m_wram[address] = data;
		else if (address < 0x6000)
		{
			if (address >= 0x2188 && address < 0x21a0)
			{
				m_cartslot->chip_write(offset, data);
				return;
			}
			if (address >= 0x5000)
			{
				m_cartslot->chip_write(offset, data);
				return;
			}
			snes_w_io(space, address, data);
		}
		else if (address < 0x8000)
		{
			if (offset >= 0x200000)
				return m_cartslot->write_l(offset, data);
		}
		else
			return m_cartslot->write_l(offset, data);
	}
	return m_cartslot->write_l(offset, data);'};
MERGE (n:KG {id: 'handler:snes_console_state.snesbsx_hi_r'}) SET n:Handler SET n += {method: 'snesbsx_hi_r', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 765, sourceColumn: 1, sourceEndLine: 792, sourceParameters: 'address_space &space, offs_t offset', sourceBody: 'uint16_t address = offset & 0xffff;

	if (offset < 0x400000)
	{
		if (address < 0x2000)
			return m_wram[address];
		else if (address < 0x6000)
		{
			if (address >= 0x2188 && address < 0x21a0)
				return m_cartslot->chip_read(offset);
			if (address >= 0x5000)
				return m_cartslot->chip_read(offset);
			return snes_r_io(address);
		}
		else if (address < 0x8000)
		{
			if (offset >= 0x200000)
				return m_cartslot->read_h(offset);
			else
				return snes_open_bus_r();
		}
		else
			return m_cartslot->read_h(offset);
	}
	return m_cartslot->read_h(offset);', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:snes_console_state.snes21_lo_r'}) SET n:Handler SET n += {method: 'snes21_lo_r', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 300, sourceColumn: 1, sourceEndLine: 332, sourceConstants: ['SNES_BSXHI=24'], sourceParameters: 'address_space &space, offs_t offset', sourceBody: 'uint16_t address = offset & 0xffff;

	if (offset < 0x400000 && address < 0x8000)
	{
		if (address < 0x2000)
			return m_wram[address];
		else if (address < 0x6000)
			return snes_r_io(address);
		else
		{
			if (m_type == SNES_BSXHI && m_cartslot->m_cart->get_nvram_size() && offset >= 0x200000)
			{
				int mask = (m_cartslot->m_cart->get_nvram_size() - 1) & 0x7fff;
				return m_cartslot->read_ram((offset - 0x6000) & mask);
			}

			if (m_cartslot->m_cart->get_nvram_size() && offset >= 0x300000)
			{
				/* Donkey Kong Country checks this and detects a copier if 0x800 is not masked out due to sram size */
				/* OTOH Secret of Mana does not work properly if sram is not mirrored on later banks */
				int mask = (m_cartslot->m_cart->get_nvram_size() - 1) & 0x7fff; /* Limit SRAM size to what\'s actually present */
				return m_cartslot->read_ram((offset - 0x6000) & mask);
			}
			else
				return snes_open_bus_r();
		}
	}

	// ROM access
	return m_cartslot->read_l(offset);', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:snes_console_state.snes21_lo_w'}) SET n:Handler SET n += {method: 'snes21_lo_w', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 334, sourceColumn: 1, sourceEndLine: 360, sourceConstants: ['SNES_BSXHI=24'], sourceParameters: 'address_space &space, offs_t offset, uint8_t data', sourceBody: 'uint16_t address = offset & 0xffff;
	if (offset < 0x400000 && address < 0x8000)
	{
		if (address < 0x2000)
			m_wram[address] = data;
		else if (address < 0x6000)
			snes_w_io(space, address, data);
		else
		{
			if (m_type == SNES_BSXHI && m_cartslot->m_cart->get_nvram_size() && offset >= 0x200000)
			{
				int mask = (m_cartslot->m_cart->get_nvram_size() - 1) & 0x7fff;
				m_cartslot->write_ram((offset - 0x6000) & mask, data);
				return;
			}
			if (m_cartslot->m_cart->get_nvram_size() && offset >= 0x300000)
			{
				/* Donkey Kong Country checks this and detects a copier if 0x800 is not masked out due to sram size */
				/* OTOH Secret of Mana does not work properly if sram is not mirrored on later banks */
				int mask = (m_cartslot->m_cart->get_nvram_size() - 1) & 0x7fff; /* Limit SRAM size to what\'s actually present */
				m_cartslot->write_ram((offset - 0x6000) & mask, data);
			}
		}
	}'};
MERGE (n:KG {id: 'handler:snes_console_state.snes21_hi_r'}) SET n:Handler SET n += {method: 'snes21_hi_r', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 362, sourceColumn: 1, sourceEndLine: 394, sourceConstants: ['SNES_BSXHI=24'], sourceParameters: 'address_space &space, offs_t offset', sourceBody: 'uint16_t address = offset & 0xffff;

	if (offset < 0x400000 && address < 0x8000)
	{
		if (address < 0x2000)
			return m_wram[address];
		else if (address < 0x6000)
			return snes_r_io(address);
		else
		{
			if (m_type == SNES_BSXHI && m_cartslot->m_cart->get_nvram_size() && offset >= 0x200000)
			{
				int mask = (m_cartslot->m_cart->get_nvram_size() - 1) & 0x7fff;
				return m_cartslot->read_ram((offset - 0x6000) & mask);
			}

			if (m_cartslot->m_cart->get_nvram_size() && offset >= 0x300000)
			{
				/* Donkey Kong Country checks this and detects a copier if 0x800 is not masked out due to sram size */
				/* OTOH Secret of Mana does not work properly if sram is not mirrored on later banks */
				int mask = (m_cartslot->m_cart->get_nvram_size() - 1) & 0x7fff; /* Limit SRAM size to what\'s actually present */
				return m_cartslot->read_ram((offset - 0x6000) & mask);
			}
			else
				return snes_open_bus_r();
		}
	}

	// ROM access
	return m_cartslot->read_h(offset);', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:snes_console_state.snes21_hi_w'}) SET n:Handler SET n += {method: 'snes21_hi_w', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 396, sourceColumn: 1, sourceEndLine: 422, sourceConstants: ['SNES_BSXHI=24'], sourceParameters: 'address_space &space, offs_t offset, uint8_t data', sourceBody: 'uint16_t address = offset & 0xffff;
	if (offset < 0x400000 && address < 0x8000)
	{
		if (address < 0x2000)
			m_wram[address] = data;
		else if (address < 0x6000)
			snes_w_io(space, address, data);
		else
		{
			if (m_type == SNES_BSXHI && m_cartslot->m_cart->get_nvram_size() && offset >= 0x200000)
			{
				int mask = (m_cartslot->m_cart->get_nvram_size() - 1) & 0x7fff;
				m_cartslot->write_ram((offset - 0x6000) & mask, data);
				return;
			}
			if (m_cartslot->m_cart->get_nvram_size() && offset >= 0x300000)
			{
				/* Donkey Kong Country checks this and detects a copier if 0x800 is not masked out due to sram size */
				/* OTOH Secret of Mana does not work properly if sram is not mirrored on later banks */
				int mask = (m_cartslot->m_cart->get_nvram_size() - 1) & 0x7fff; /* Limit SRAM size to what\'s actually present */
				m_cartslot->write_ram((offset - 0x6000) & mask, data);
			}
		}
	}'};
MERGE (n:KG {id: 'handler:snes_console_state.snes7110_lo_r'}) SET n:Handler SET n += {method: 'snes7110_lo_r', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 626, sourceColumn: 1, sourceEndLine: 656, sourceConstants: ['SNES_SPC7110_RTC=15'], sourceParameters: 'address_space &space, offs_t offset', sourceBody: 'uint16_t address = offset & 0xffff;

	if (offset < 0x400000)
	{
		if (address < 0x2000)
			return m_wram[address];
		else if (address < 0x6000)
		{
			uint16_t limit = (m_cartslot->get_type() == SNES_SPC7110_RTC) ? 0x4843 : 0x4840;
			if (address >= 0x4800 && address < limit)
				return m_cartslot->chip_read(address);

			return snes_r_io(address);
		}
		else if (address < 0x8000)
		{
			if (offset < 0x10000)
				return m_cartslot->read_ram(offset);
			if (offset >= 0x300000 && offset < 0x310000)
				return m_cartslot->read_ram(offset);
		}
		else
			return m_cartslot->read_l(offset);
	}
	if (offset >= 0x500000 && offset < 0x510000)
		return m_cartslot->chip_read(0x4800);

	return snes_open_bus_r();', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:snes_console_state.snes7110_lo_w'}) SET n:Handler SET n += {method: 'snes7110_lo_w', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 663, sourceColumn: 1, sourceEndLine: 688, sourceConstants: ['SNES_SPC7110_RTC=15'], sourceParameters: 'address_space &space, offs_t offset, uint8_t data', sourceBody: 'uint16_t address = offset & 0xffff;
	if (offset < 0x400000)
	{
		if (address < 0x2000)
			m_wram[address] = data;
		else if (address < 0x6000)
		{
			uint16_t limit = (m_cartslot->get_type() == SNES_SPC7110_RTC) ? 0x4843 : 0x4840;
			if (address >= 0x4800 && address < limit)
			{
				m_cartslot->chip_write(address, data);
				return;
			}
			snes_w_io(space, address, data);
		}
		else if (address < 0x8000)
		{
			if (offset < 0x10000)
				m_cartslot->write_ram(offset, data);
			if (offset >= 0x300000 && offset < 0x310000)
				m_cartslot->write_ram(offset, data);
		}
	}'};
MERGE (n:KG {id: 'handler:snes_console_state.snes7110_hi_r'}) SET n:Handler SET n += {method: 'snes7110_hi_r', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 597, sourceColumn: 1, sourceEndLine: 624, sourceConstants: ['SNES_SPC7110_RTC=15'], sourceParameters: 'address_space &space, offs_t offset', sourceBody: 'uint16_t address = offset & 0xffff;

	if (offset < 0x400000)
	{
		if (address < 0x2000)
			return m_wram[address];
		else if (address < 0x6000)
		{
			uint16_t limit = (m_cartslot->get_type() == SNES_SPC7110_RTC) ? 0x4843 : 0x4840;
			if (address >= 0x4800 && address < limit)
				return m_cartslot->chip_read(address);

			return snes_r_io(address);
		}
		else if (address < 0x8000)
		{
			if (offset < 0x10000)
				return m_cartslot->read_ram(offset);
			if (offset >= 0x300000 && offset < 0x310000)
				return m_cartslot->read_ram(offset);
		}
		else
			return m_cartslot->read_h(offset);
	}
	return m_cartslot->read_h(offset);', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:snes_console_state.snes7110_hi_w'}) SET n:Handler SET n += {method: 'snes7110_hi_w', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 658, sourceColumn: 1, sourceEndLine: 661, sourceParameters: 'address_space &space, offs_t offset, uint8_t data', sourceBody: 'snes7110_lo_w(space, offset, data);'};
MERGE (n:KG {id: 'handler:snes_console_state.pfest94_lo_r'}) SET n:Handler SET n += {method: 'pfest94_lo_r', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 962, sourceColumn: 1, sourceEndLine: 987, sourceParameters: 'address_space &space, offs_t offset', sourceBody: 'uint16_t address = offset & 0xffff;

	if (offset < 0x400000)
	{
		if (address < 0x2000)
			return m_wram[address];
		else if (address < 0x6000)
			return snes_r_io(address);
		else if (address < 0x8000)
		{
			if (offset < 0x100000)    // DSP access
				return m_cartslot->chip_read(offset);
			else if (offset == 0x106000)    // menu access
				return m_cartslot->chip_read(offset + 0x8000);
			else if (offset >= 0x300000 && m_cartslot->m_cart->get_nvram_size())    // NVRAM access
				return m_cartslot->read_ram(offset);
			else
				return snes_open_bus_r();
		}
		else
			return m_cartslot->read_l(offset);
	}
	return 0xff;    // or open_bus?', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'handler:snes_console_state.pfest94_lo_w'}) SET n:Handler SET n += {method: 'pfest94_lo_w', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 989, sourceColumn: 1, sourceEndLine: 992, sourceParameters: 'address_space &space, offs_t offset, uint8_t data', sourceBody: 'pfest94_hi_w(space, offset, data);'};
MERGE (n:KG {id: 'handler:snes_console_state.pfest94_hi_w'}) SET n:Handler SET n += {method: 'pfest94_hi_w', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 941, sourceColumn: 1, sourceEndLine: 960, sourceParameters: 'address_space &space, offs_t offset, uint8_t data', sourceBody: 'uint16_t address = offset & 0xffff;
	if (offset < 0x400000)
	{
		if (address < 0x2000)
			m_wram[address] = data;
		else if (address < 0x6000)
			snes_w_io(space, address, data);
		else if (address < 0x8000)
		{
			if (offset < 0x100000)    // DSP access
				m_cartslot->chip_write(offset, data);
			else if (offset == 0x206000)    // menu access
				m_cartslot->chip_write(offset + 0x8000, data);
			else if (offset >= 0x300000 && m_cartslot->m_cart->get_nvram_size())    // NVRAM access
				m_cartslot->write_ram(offset, data);
		}
	}'};
MERGE (n:KG {id: 'handler:snes_console_state.pfest94_hi_r'}) SET n:Handler SET n += {method: 'pfest94_hi_r', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 914, sourceColumn: 1, sourceEndLine: 939, sourceParameters: 'address_space &space, offs_t offset', sourceBody: 'uint16_t address = offset & 0xffff;

	if (offset < 0x400000)
	{
		if (address < 0x2000)
			return m_wram[address];
		else if (address < 0x6000)
			return snes_r_io(address);
		else if (address < 0x8000)
		{
			if (offset < 0x100000)    // DSP access
				return m_cartslot->chip_read(offset);
			else if (offset == 0x106000)    // menu access
				return m_cartslot->chip_read(offset + 0x8000);
			else if (offset >= 0x300000 && m_cartslot->m_cart->get_nvram_size())    // NVRAM access
				return m_cartslot->read_ram(offset);
			else
				return snes_open_bus_r();
		}
		else
			return m_cartslot->read_h(offset);
	}
	return m_cartslot->read_h(offset);', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'softlist:snes_console_state.snes/snes'}) SET n:SoftwareList SET n += {name: 'snes', tag: 'cart_list', status: 'original'};
MERGE (n:KG {id: 'softlist:snes_console_state.snes/snes_bspack'}) SET n:SoftwareList SET n += {name: 'snes_bspack', tag: 'bsx_list', status: 'original'};
MERGE (n:KG {id: 'softlist:snes_console_state.snes/snes_strom'}) SET n:SoftwareList SET n += {name: 'snes_strom', tag: 'st_list', status: 'original'};
MERGE (n:KG {id: 'device:snes_console_state.snes/maincpu'}) SET n:Device SET n += {type: '_5A22', tag: 'maincpu', clock: 21477272, config: ['_5A22(config, m_maincpu, MCLK_NTSC)', 'm_maincpu->set_addrmap(AS_PROGRAM, &snes_console_state::snes_map)', 'config.set_perfect_quantum(m_maincpu)'], member: 'm_maincpu', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1336, sourceColumn: 2, sourceEndLine: 1336, configCalls: ['set_perfect_quantum("maincpu")']};
MERGE (n:KG {id: 'device:snes_console_state.snes/soundcpu'}) SET n:Device SET n += {type: 'S_SMP', tag: 'soundcpu', clock: 2048000, config: ['S_SMP(config, m_soundcpu, XTAL(24\'576\'000) / 12)', 'm_soundcpu->set_addrmap(AS_DATA, &snes_console_state::spc_map)', 'm_soundcpu->dsp_io_read_callback().set(m_s_dsp, FUNC(s_dsp_device::dsp_io_r))', 'm_soundcpu->dsp_io_write_callback().set(m_s_dsp, FUNC(s_dsp_device::dsp_io_w))'], member: 'm_soundcpu', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1340, sourceColumn: 2, sourceEndLine: 1340};
MERGE (n:KG {id: 'device:snes_console_state.snes/soundcpu/callback:soundcpu:0'}) SET n:Callback SET n += {signal: 'dsp_io_read_callback', operation: 'set', raw: 'm_soundcpu->dsp_io_read_callback().set(m_s_dsp, FUNC(s_dsp_device::dsp_io_r))', ownerTag: 'soundcpu', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1342, sourceColumn: 2, sourceEndLine: 1342, targetClass: 's_dsp_device', targetMethod: 'dsp_io_r', targetTag: 's_dsp'};
MERGE (n:KG {id: 'handler:s_dsp_device.dsp_io_r'}) SET n:Handler SET n += {method: 'dsp_io_r', ownerClass: 's_dsp_device', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1342, sourceColumn: 2, sourceEndLine: 1342};
MERGE (n:KG {id: 'device:snes_console_state.snes/soundcpu/callback:soundcpu:1'}) SET n:Callback SET n += {signal: 'dsp_io_write_callback', operation: 'set', raw: 'm_soundcpu->dsp_io_write_callback().set(m_s_dsp, FUNC(s_dsp_device::dsp_io_w))', ownerTag: 'soundcpu', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1343, sourceColumn: 2, sourceEndLine: 1343, targetClass: 's_dsp_device', targetMethod: 'dsp_io_w', targetTag: 's_dsp'};
MERGE (n:KG {id: 'handler:s_dsp_device.dsp_io_w'}) SET n:Handler SET n += {method: 'dsp_io_w', ownerClass: 's_dsp_device', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1343, sourceColumn: 2, sourceEndLine: 1343};
MERGE (n:KG {id: 'device:snes_console_state.snes/scpu_irq'}) SET n:Device SET n += {type: 'INPUT_MERGER_ANY_HIGH', tag: 'scpu_irq', clock: 0, config: ['INPUT_MERGER_ANY_HIGH(config, m_scpu_irq)', 'm_scpu_irq->output_handler().set_inputline(m_maincpu, G65816_LINE_IRQ)'], member: 'm_scpu_irq', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1348, sourceColumn: 2, sourceEndLine: 1348};
MERGE (n:KG {id: 'device:snes_console_state.snes/scpu_irq/callback:scpu_irq:0'}) SET n:Callback SET n += {signal: 'output_handler', operation: 'set_inputline', raw: 'm_scpu_irq->output_handler().set_inputline(m_maincpu, G65816_LINE_IRQ)', ownerTag: 'scpu_irq', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1349, sourceColumn: 2, sourceEndLine: 1349, inputLine: 'G65816_LINE_IRQ', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:snes_console_state.snes/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(DOTCLK_NTSC * 2, SNES_HTOTAL * 2, 0, SNES_SCR_WIDTH * 2, SNES_VTOTAL_NTSC, 0, SNES_SCR_HEIGHT_NTSC)', 'm_screen->set_video_attributes(VIDEO_VARIABLE_WIDTH)', 'm_screen->set_screen_update(FUNC(snes_state::screen_update))'], member: 'm_screen', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1352, sourceColumn: 2, sourceEndLine: 1352, configCalls: ['set_raw(10738636,682,0,512,262,0,225)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [10738636, 682, 0, 512, 262, 0, 225], screenRawExpr: ['DOTCLK_NTSC * 2', 'SNES_HTOTAL * 2', '0', 'SNES_SCR_WIDTH * 2', 'SNES_VTOTAL_NTSC', '0', 'SNES_SCR_HEIGHT_NTSC'], screenVideoAttributes: ['VIDEO_VARIABLE_WIDTH']};
MERGE (n:KG {id: 'device:snes_console_state.snes/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(snes_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1355, sourceColumn: 2, sourceEndLine: 1355, targetClass: 'snes_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:snes_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 31, sourceColumn: 1, sourceEndLine: 38, sourceParameters: 'screen_device &screen, bitmap_rgb32 &bitmap, const rectangle &cliprect', sourceBody: '/* NTSC SNES draw range is 1-225. */
	for (int y = cliprect.min_y; y <= cliprect.max_y; y++)
		m_ppu->refresh_scanline(bitmap, y + 1);

	return 0;', sourceReturnType: 'uint32_t'};
MERGE (n:KG {id: 'device:snes_console_state.snes/ppu'}) SET n:Device SET n += {type: 'SNES_PPU', tag: 'ppu', clock: 21477272, config: ['SNES_PPU(config, m_ppu, MCLK_NTSC)', 'm_ppu->open_bus_callback().set(FUNC(snes_console_state::snes_open_bus_r))', 'm_ppu->set_screen("screen")'], member: 'm_ppu', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1357, sourceColumn: 2, sourceEndLine: 1357, configCalls: ['set_screen("screen")']};
MERGE (n:KG {id: 'device:snes_console_state.snes/ppu/callback:ppu:0'}) SET n:Callback SET n += {signal: 'open_bus_callback', operation: 'set', raw: 'm_ppu->open_bus_callback().set(FUNC(snes_console_state::snes_open_bus_r))', ownerTag: 'ppu', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1358, sourceColumn: 2, sourceEndLine: 1358, targetClass: 'snes_console_state', targetMethod: 'snes_open_bus_r'};
MERGE (n:KG {id: 'handler:snes_console_state.snes_open_bus_r'}) SET n:Handler SET n += {method: 'snes_open_bus_r', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 220, sourceColumn: 1, sourceEndLine: 233, sourceParameters: '', sourceBody: 'static uint8_t recurse = 0;
	uint16_t result;

	/* prevent recursion */
	if (recurse)
		return 0xff;

	recurse = 1;
	result = m_maincpu->space(AS_PROGRAM).read_byte(m_maincpu->pc() - 1); //LAST opcode that\'s fetched on the bus
	recurse = 0;
	return result;', sourceReturnType: 'uint8_t'};
MERGE (n:KG {id: 'device:snes_console_state.snes/ctrl1'}) SET n:Device SET n += {type: 'SNES_CONTROL_PORT', tag: 'ctrl1', clock: 0, config: ['SNES_CONTROL_PORT(config, m_ctrl1, snes_control_port_devices, "joypad")', 'm_ctrl1->set_onscreen_callback(FUNC(snes_console_state::onscreen_cb))'], member: 'm_ctrl1', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1361, sourceColumn: 2, sourceEndLine: 1361, slotOptions: 'snes_control_port_devices', slotDefault: 'joypad'};
MERGE (n:KG {id: 'device:snes_console_state.snes/ctrl1/callback:ctrl1:0'}) SET n:Callback SET n += {signal: 'set_onscreen_callback', delegate: 1, operation: 'set_onscreen_callback', raw: 'm_ctrl1->set_onscreen_callback(FUNC(snes_console_state::onscreen_cb))', ownerTag: 'ctrl1', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1362, sourceColumn: 2, sourceEndLine: 1362, targetClass: 'snes_console_state', targetMethod: 'onscreen_cb'};
MERGE (n:KG {id: 'handler:snes_console_state.onscreen_cb'}) SET n:Handler SET n += {method: 'onscreen_cb', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1364, sourceColumn: 2, sourceEndLine: 1364};
MERGE (n:KG {id: 'device:snes_console_state.snes/ctrl2'}) SET n:Device SET n += {type: 'SNES_CONTROL_PORT', tag: 'ctrl2', clock: 0, config: ['SNES_CONTROL_PORT(config, m_ctrl2, snes_control_port_devices, "joypad")', 'm_ctrl2->set_onscreen_callback(FUNC(snes_console_state::onscreen_cb))', 'm_ctrl2->set_gunlatch_callback(FUNC(snes_console_state::gun_latch_cb))'], member: 'm_ctrl2', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1363, sourceColumn: 2, sourceEndLine: 1363, slotOptions: 'snes_control_port_devices', slotDefault: 'joypad'};
MERGE (n:KG {id: 'device:snes_console_state.snes/ctrl2/callback:ctrl2:0'}) SET n:Callback SET n += {signal: 'set_onscreen_callback', delegate: 1, operation: 'set_onscreen_callback', raw: 'm_ctrl2->set_onscreen_callback(FUNC(snes_console_state::onscreen_cb))', ownerTag: 'ctrl2', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1364, sourceColumn: 2, sourceEndLine: 1364, targetClass: 'snes_console_state', targetMethod: 'onscreen_cb'};
MERGE (n:KG {id: 'device:snes_console_state.snes/ctrl2/callback:ctrl2:1'}) SET n:Callback SET n += {signal: 'set_gunlatch_callback', delegate: 1, operation: 'set_gunlatch_callback', raw: 'm_ctrl2->set_gunlatch_callback(FUNC(snes_console_state::gun_latch_cb))', ownerTag: 'ctrl2', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1365, sourceColumn: 2, sourceEndLine: 1365, targetClass: 'snes_console_state', targetMethod: 'gun_latch_cb'};
MERGE (n:KG {id: 'handler:snes_console_state.gun_latch_cb'}) SET n:Handler SET n += {method: 'gun_latch_cb', ownerClass: 'snes_console_state', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1365, sourceColumn: 2, sourceEndLine: 1365};
MERGE (n:KG {id: 'device:snes_console_state.snes/speaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speaker', clock: 2, config: ['SPEAKER(config, "speaker", 2).front()'], sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1368, sourceColumn: 2, sourceEndLine: 1368};
MERGE (n:KG {id: 'device:snes_console_state.snes/s_dsp'}) SET n:Device SET n += {type: 'S_DSP', tag: 's_dsp', clock: 24576000, config: ['S_DSP(config, m_s_dsp, XTAL(24\'576\'000))', 'm_s_dsp->set_addrmap(0, &snes_console_state::spc_map)', 'm_s_dsp->add_route(0, "speaker", 1.00, 0)', 'm_s_dsp->add_route(1, "speaker", 1.00, 1)'], member: 'm_s_dsp', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1370, sourceColumn: 2, sourceEndLine: 1370, configCalls: ['add_route(0,"speaker",1,0)', 'add_route(1,"speaker",1,1)']};
MERGE (n:KG {id: 'audioroute:device:snes_console_state.snes/s_dsp/0'}) SET n:AudioRoute SET n += {output: '0', target: 'speaker', gain: 1, input: 0, raw: 'm_s_dsp->add_route(0, "speaker", 1.00, 0)', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1372, sourceColumn: 2, sourceEndLine: 1372};
MERGE (n:KG {id: 'audioroute:device:snes_console_state.snes/s_dsp/1'}) SET n:AudioRoute SET n += {output: '1', target: 'speaker', gain: 1, input: 1, raw: 'm_s_dsp->add_route(1, "speaker", 1.00, 1)', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1373, sourceColumn: 2, sourceEndLine: 1373};
MERGE (n:KG {id: 'device:snes_console_state.snes/snsslot'}) SET n:Device SET n += {type: 'SNS_CART_SLOT', tag: 'snsslot', clock: 21477272, config: ['SNS_CART_SLOT(config, m_cartslot, MCLK_NTSC, snes_cart, nullptr)', 'm_cartslot->set_must_be_loaded(true)', 'm_cartslot->irq_callback().set(m_scpu_irq, FUNC(input_merger_device::in_w<1>))', 'm_cartslot->open_bus_callback().set(FUNC(snes_console_state::snes_open_bus_r))', 'm_cartslot->set_scanlines(SNES_VTOTAL_NTSC)'], member: 'm_cartslot', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1375, sourceColumn: 2, sourceEndLine: 1375, configCalls: ['set_must_be_loaded(1)', 'set_scanlines(262)']};
MERGE (n:KG {id: 'device:snes_console_state.snes/snsslot/callback:snsslot:0'}) SET n:Callback SET n += {signal: 'irq_callback', operation: 'set', raw: 'm_cartslot->irq_callback().set(m_scpu_irq, FUNC(input_merger_device::in_w<1>))', ownerTag: 'snsslot', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1377, sourceColumn: 2, sourceEndLine: 1377, targetClass: 'input_merger_device', targetMethod: 'in_w_1', targetTag: 'scpu_irq'};
MERGE (n:KG {id: 'handler:input_merger_device.in_w_1'}) SET n:Handler SET n += {method: 'in_w_1', ownerClass: 'input_merger_device', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1377, sourceColumn: 2, sourceEndLine: 1377};
MERGE (n:KG {id: 'device:snes_console_state.snes/snsslot/callback:snsslot:1'}) SET n:Callback SET n += {signal: 'open_bus_callback', operation: 'set', raw: 'm_cartslot->open_bus_callback().set(FUNC(snes_console_state::snes_open_bus_r))', ownerTag: 'snsslot', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1378, sourceColumn: 2, sourceEndLine: 1378, targetClass: 'snes_console_state', targetMethod: 'snes_open_bus_r'};
MERGE (n:KG {id: 'inputs:snes'}) SET n:InputPorts SET n += {name: 'snes', sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1020, sourceColumn: 8, sourceEndLine: 1020};
MERGE (n:KG {id: 'inputs:snes/OPTIONS'}) SET n:Port SET n += {tag: 'OPTIONS', modify: false};
MERGE (n:KG {id: 'inputs:snes/OPTIONS/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, name: 'Hi-Res pixels blurring (TV effect)', defaultValue: 0, config: true, settings: ['0=Off', '1=On']};
MERGE (n:KG {id: 'inputs:snes/DEBUG1'}) SET n:Port SET n += {tag: 'DEBUG1', modify: false};
MERGE (n:KG {id: 'inputs:snes/DEBUG1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, name: 'Select BG1 priority', defaultValue: 0, config: true, settings: ['0=All', '1=BG1B (lower) only', '2=BG1A (higher) only']};
MERGE (n:KG {id: 'inputs:snes/DEBUG1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 12, name: 'Select BG2 priority', defaultValue: 0, config: true, settings: ['0=All', '4=BG2B (lower) only', '8=BG2A (higher) only']};
MERGE (n:KG {id: 'inputs:snes/DEBUG1/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 48, name: 'Select BG3 priority', defaultValue: 0, config: true, settings: ['0=All', '16=BG3B (lower) only', '32=BG3A (higher) only']};
MERGE (n:KG {id: 'inputs:snes/DEBUG1/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 192, name: 'Select BG4 priority', defaultValue: 0, config: true, settings: ['0=All', '64=BG4B (lower) only', '128=BG4A (higher) only']};
MERGE (n:KG {id: 'inputs:snes/DEBUG2'}) SET n:Port SET n += {tag: 'DEBUG2', modify: false};
MERGE (n:KG {id: 'inputs:snes/DEBUG2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_OTHER', modifiers: ['PORT_NAME("Toggle BG 1")', 'PORT_CODE(KEYCODE_1_PAD)', 'PORT_TOGGLE'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes/DEBUG2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_OTHER', modifiers: ['PORT_NAME("Toggle BG 2")', 'PORT_CODE(KEYCODE_2_PAD)', 'PORT_TOGGLE'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes/DEBUG2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_OTHER', modifiers: ['PORT_NAME("Toggle BG 3")', 'PORT_CODE(KEYCODE_3_PAD)', 'PORT_TOGGLE'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes/DEBUG2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_OTHER', modifiers: ['PORT_NAME("Toggle BG 4")', 'PORT_CODE(KEYCODE_4_PAD)', 'PORT_TOGGLE'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes/DEBUG2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_OTHER', modifiers: ['PORT_NAME("Toggle Objects")', 'PORT_CODE(KEYCODE_5_PAD)', 'PORT_TOGGLE'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes/DEBUG2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_OTHER', modifiers: ['PORT_NAME("Toggle Main/Sub")', 'PORT_CODE(KEYCODE_6_PAD)', 'PORT_TOGGLE'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes/DEBUG2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_OTHER', modifiers: ['PORT_NAME("Toggle Color Math")', 'PORT_CODE(KEYCODE_7_PAD)', 'PORT_TOGGLE'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes/DEBUG2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_OTHER', modifiers: ['PORT_NAME("Toggle Windows")', 'PORT_CODE(KEYCODE_8_PAD)', 'PORT_TOGGLE'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes/DEBUG3'}) SET n:Port SET n += {tag: 'DEBUG3', modify: false};
MERGE (n:KG {id: 'inputs:snes/DEBUG3/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_OTHER', modifiers: ['PORT_NAME("Toggle Mosaic")', 'PORT_CODE(KEYCODE_9_PAD)', 'PORT_TOGGLE'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes/DEBUG3/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 112, name: 'Select OAM priority', defaultValue: 0, config: true, settings: ['0=All', '16=OAM0 only', '32=OAM1 only', '48=OAM2 only', '64=OAM3 only']};
MERGE (n:KG {id: 'inputs:snes/DEBUG3/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_UNUSED', defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes/DEBUG4'}) SET n:Port SET n += {tag: 'DEBUG4', modify: false};
MERGE (n:KG {id: 'inputs:snes/DEBUG4/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_OTHER', modifiers: ['PORT_NAME("Toggle Mode 0 draw")', 'PORT_TOGGLE'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes/DEBUG4/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_OTHER', modifiers: ['PORT_NAME("Toggle Mode 1 draw")', 'PORT_TOGGLE'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes/DEBUG4/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_OTHER', modifiers: ['PORT_NAME("Toggle Mode 2 draw")', 'PORT_TOGGLE'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes/DEBUG4/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_OTHER', modifiers: ['PORT_NAME("Toggle Mode 3 draw")', 'PORT_TOGGLE'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes/DEBUG4/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_OTHER', modifiers: ['PORT_NAME("Toggle Mode 4 draw")', 'PORT_TOGGLE'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes/DEBUG4/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_OTHER', modifiers: ['PORT_NAME("Toggle Mode 5 draw")', 'PORT_TOGGLE'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes/DEBUG4/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_OTHER', modifiers: ['PORT_NAME("Toggle Mode 6 draw")', 'PORT_TOGGLE'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes/DEBUG4/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_OTHER', modifiers: ['PORT_NAME("Toggle Mode 7 draw")', 'PORT_TOGGLE'], defaultValue: 0};
MERGE (n:KG {id: 'file:src/devices/bus/snes_ctrl/joypad.cpp'}) SET n:SourceFile SET n += {path: 'src/devices/bus/snes_ctrl/joypad.cpp'};
MERGE (n:KG {id: 'inputs:snes_joypad'}) SET n:InputPorts SET n += {name: 'snes_joypad'};
MERGE (n:KG {id: 'inputs:snes_joypad/JOYPAD'}) SET n:Port SET n += {tag: 'JOYPAD', modify: false};
MERGE (n:KG {id: 'inputs:snes_joypad/JOYPAD/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_BUTTON2', modifiers: ['PORT_NAME("%p B")'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes_joypad/JOYPAD/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: false, type: 'IPT_BUTTON1', modifiers: ['PORT_NAME("%p Y")'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes_joypad/JOYPAD/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: false, type: 'IPT_SELECT', defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes_joypad/JOYPAD/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_START', defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes_joypad/JOYPAD/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_JOYSTICK_UP', defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes_joypad/JOYPAD/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_JOYSTICK_DOWN', defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes_joypad/JOYPAD/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: false, type: 'IPT_JOYSTICK_LEFT', defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes_joypad/JOYPAD/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_JOYSTICK_RIGHT', defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes_joypad/JOYPAD/f8'}) SET n:PortField SET n += {kind: 'bit', mask: 256, activeLow: false, type: 'IPT_BUTTON3', modifiers: ['PORT_NAME("%p A")'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes_joypad/JOYPAD/f9'}) SET n:PortField SET n += {kind: 'bit', mask: 512, activeLow: false, type: 'IPT_BUTTON4', modifiers: ['PORT_NAME("%p X")'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes_joypad/JOYPAD/f10'}) SET n:PortField SET n += {kind: 'bit', mask: 1024, activeLow: false, type: 'IPT_BUTTON5', modifiers: ['PORT_NAME("%p L")'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes_joypad/JOYPAD/f11'}) SET n:PortField SET n += {kind: 'bit', mask: 2048, activeLow: false, type: 'IPT_BUTTON6', modifiers: ['PORT_NAME("%p R")'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:snes_joypad/JOYPAD/f12'}) SET n:PortField SET n += {kind: 'bit', mask: 61440, activeLow: false, type: 'IPT_UNUSED', defaultValue: 0};
MERGE (n:KG {id: 'handler:snes_state.machine_reset__base'}) SET n:Handler SET n += {method: 'machine_reset__base', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 1078, sourceColumn: 1, sourceEndLine: 1102, sourceConstants: ['NMITIMEN=16896'], sourceParameters: '', sourceBody: 'snes_init_ram();

	/* init DMA regs to be 0xff */
	for (auto & elem : m_dma_channel)
	{
		elem.dmap = 0xff;
		elem.dest_addr = 0xff;
		elem.src_addr = 0xffff;
		elem.bank = 0xff;
		elem.trans_size = 0xffff;
		elem.ibank = 0xff;
		elem.hdma_addr = 0xffff;
		elem.hdma_line_counter = 0xff;
		elem.unk = 0xff;
	}

	// reset does this to these registers
	m_cpu_regs[(NMITIMEN) - 0x4200] = 0;
	m_htime = 0x1ff;
	m_vtime = 0x1ff;

	m_ppu->reset_interlace();'};
MERGE (n:KG {id: 'handler:snes_state.machine_start__base'}) SET n:Handler SET n += {method: 'machine_start__base', ownerClass: 'snes_state', sourceFile: 'src/mame/nintendo/snes_m.cpp', sourceLine: 1032, sourceColumn: 1, sourceEndLine: 1076, sourceConstants: ['WRIO=16897'], sourceParameters: '', sourceBody: '// power-on sets these registers like this
	m_cpu_regs[(WRIO) - 0x4200] = 0xff;
//  m_cpu_regs[(WRMPYA) - 0x4200] = 0xff;
//  m_cpu_regs[(WRDIVL) - 0x4200] = 0xff;
//  m_cpu_regs[(WRDIVH) - 0x4200] = 0xff;

	snes_init_timers();

	save_item(STRUCT_MEMBER(m_dma_channel, dmap));
	save_item(STRUCT_MEMBER(m_dma_channel, dest_addr));
	save_item(STRUCT_MEMBER(m_dma_channel, src_addr));
	save_item(STRUCT_MEMBER(m_dma_channel, bank));
	save_item(STRUCT_MEMBER(m_dma_channel, trans_size));
	save_item(STRUCT_MEMBER(m_dma_channel, ibank));
	save_item(STRUCT_MEMBER(m_dma_channel, hdma_addr));
	save_item(STRUCT_MEMBER(m_dma_channel, hdma_iaddr));
	save_item(STRUCT_MEMBER(m_dma_channel, hdma_line_counter));
	save_item(STRUCT_MEMBER(m_dma_channel, unk));
	save_item(STRUCT_MEMBER(m_dma_channel, do_transfer));
	save_item(STRUCT_MEMBER(m_dma_channel, dma_disabled));

	save_item(NAME(m_hblank_offset));
	save_item(NAME(m_wram_address));
	save_item(NAME(m_htime));
	save_item(NAME(m_vtime));
	save_item(NAME(m_hdmaen));
	save_item(NAME(m_data1));
	save_item(NAME(m_data2));
	save_item(NAME(m_read_idx));
	save_item(NAME(m_dma_regs));
	save_item(NAME(m_cpu_regs));
	save_item(NAME(m_oldjoy1_latch));
	save_item(NAME(m_input_disabled));
	save_item(NAME(m_game_over_flag));
	save_item(NAME(m_joy_flag));

	m_is_nss = 0;
	m_is_sfcbox = 0;
	m_input_disabled = 0;
	m_game_over_flag = 0;
	m_joy_flag = 1;
	m_wram_address = 0;'};
MATCH (a:KG {id: 'game:snes'}), (b:KG {id: 'file:src/mame/nintendo/snes.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1419, sourceColumn: 1, sourceEndLine: 1419};
MATCH (a:KG {id: 'game:snes'}), (b:KG {id: 'machine:snes_console_state.snes'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:snes'}), (b:KG {id: 'inputs:snes'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:snes'}), (b:KG {id: 'romset:snes'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/snes.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/snes.cpp'}), (b:KG {id: 'file:snes.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/snes.cpp'}), (b:KG {id: 'file:snescx4.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/snes.cpp'}), (b:KG {id: 'file:bus/snes/snes_slot.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/snes.cpp'}), (b:KG {id: 'file:bus/snes/snes_carts.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/snes.cpp'}), (b:KG {id: 'file:bus/snes_ctrl/ctrl.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/snes.cpp'}), (b:KG {id: 'file:softlist_dev.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/nintendo/snes.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'handler:snes_state.snes_scanline_tick'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'handler:snes_state.snes_init_timers'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'handler:snes_state.snes_hblank_tick'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'handler:snes_state.snes_nmi_tick'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'handler:snes_state.snes_hirq_tick_callback'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'handler:snes_state.snes_update_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'handler:snes_state.snes_reset_oam_address'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'handler:snes_state.snes_reset_hdma'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'file:src/mame/nintendo/snes.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1333, sourceColumn: 1, sourceEndLine: 1384};
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'handler:snes_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'handler:snes_console_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'handler:snes_state.machine_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'handler:snes_console_state.machine_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'softlist:snes_console_state.snes/snes'}) MERGE (a)-[r:HAS_SOFTLIST]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'softlist:snes_console_state.snes/snes_bspack'}) MERGE (a)-[r:HAS_SOFTLIST]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'softlist:snes_console_state.snes/snes_strom'}) MERGE (a)-[r:HAS_SOFTLIST]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'device:snes_console_state.snes/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'device:snes_console_state.snes/soundcpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'device:snes_console_state.snes/scpu_irq'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'device:snes_console_state.snes/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'device:snes_console_state.snes/ppu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'device:snes_console_state.snes/ctrl1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'device:snes_console_state.snes/ctrl2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'device:snes_console_state.snes/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'device:snes_console_state.snes/s_dsp'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:snes_console_state.snes'}), (b:KG {id: 'device:snes_console_state.snes/snsslot'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:snes'}), (b:KG {id: 'file:src/mame/nintendo/snes.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1020, sourceColumn: 8, sourceEndLine: 1020};
MATCH (a:KG {id: 'inputs:snes'}), (b:KG {id: 'inputs:snes/OPTIONS'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:snes'}), (b:KG {id: 'inputs:snes/DEBUG1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:snes'}), (b:KG {id: 'inputs:snes/DEBUG2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:snes'}), (b:KG {id: 'inputs:snes/DEBUG3'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:snes'}), (b:KG {id: 'inputs:snes/DEBUG4'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:snes'}), (b:KG {id: 'file:src/mame/nintendo/snes.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1406, sourceColumn: 1, sourceEndLine: 1406};
MATCH (a:KG {id: 'romset:snes'}), (b:KG {id: 'region:snes/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_scanline_tick'}), (b:KG {id: 'handler:snes_state.scpu_irq_refresh'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_scanline_tick'}), (b:KG {id: 'handler:snes_state.hirq_tick'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_scanline_tick'}), (b:KG {id: 'handler:snes_state.hdma_init'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_init_timers'}), (b:KG {id: 'handler:snes_state.snes_scanline_tick'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_init_timers'}), (b:KG {id: 'handler:snes_state.snes_hblank_tick'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_init_timers'}), (b:KG {id: 'handler:snes_state.snes_nmi_tick'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_init_timers'}), (b:KG {id: 'handler:snes_state.snes_hirq_tick_callback'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_init_timers'}), (b:KG {id: 'handler:snes_state.snes_update_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_init_timers'}), (b:KG {id: 'handler:snes_state.snes_reset_oam_address'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_init_timers'}), (b:KG {id: 'handler:snes_state.snes_reset_hdma'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_hblank_tick'}), (b:KG {id: 'handler:snes_state.hdma'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_hirq_tick_callback'}), (b:KG {id: 'handler:snes_state.hirq_tick'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_update_io'}), (b:KG {id: 'handler:snes_state.io_read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_reset_hdma'}), (b:KG {id: 'handler:snes_state.hdma_init'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_reset'}), (b:KG {id: 'handler:snes_state.snes_init_ram'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_reset'}), (b:KG {id: 'handler:snes_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_state.snes_init_timers'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_state.machine_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snes20_lo_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snes20_lo_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snes20_hi_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snes20_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessgb_lo_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessgb_lo_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessgb_hi_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessgb_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessa1_lo_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessa1_lo_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessa1_hi_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessa1_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessfx_lo_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessfx_lo_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessfx_hi_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessfx_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessdd1_lo_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessdd1_lo_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessdd1_hi_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessdd1_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snesbsx_lo_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snesbsx_lo_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snesbsx_hi_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snesbsx_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snes21_lo_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snes21_lo_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snes21_hi_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snes21_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snes7110_lo_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snes7110_lo_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snes7110_hi_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snes7110_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.pfest94_lo_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.pfest94_lo_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.pfest94_hi_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.pfest94_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.machine_start'}), (b:KG {id: 'handler:snes_state.snes_open_bus_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:snes_console_state.snes/maincpu'}), (b:KG {id: 'map:snes_console_state.snes_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:snes_console_state.snes/soundcpu'}), (b:KG {id: 'device:snes_console_state.snes/soundcpu/callback:soundcpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:snes_console_state.snes/soundcpu'}), (b:KG {id: 'device:snes_console_state.snes/soundcpu/callback:soundcpu:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:snes_console_state.snes/soundcpu'}), (b:KG {id: 'map:snes_console_state.spc_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_DATA'};
MATCH (a:KG {id: 'device:snes_console_state.snes/scpu_irq'}), (b:KG {id: 'device:snes_console_state.snes/scpu_irq/callback:scpu_irq:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:snes_console_state.snes/screen'}), (b:KG {id: 'device:snes_console_state.snes/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:snes_console_state.snes/ppu'}), (b:KG {id: 'device:snes_console_state.snes/ppu/callback:ppu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:snes_console_state.snes/ctrl1'}), (b:KG {id: 'device:snes_console_state.snes/ctrl1/callback:ctrl1:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:snes_console_state.snes/ctrl1'}), (b:KG {id: 'inputs:snes_joypad'}) MERGE (a)-[r:USES_INPUTS]->(b) SET r += {option: 'joypad'};
MATCH (a:KG {id: 'device:snes_console_state.snes/ctrl2'}), (b:KG {id: 'device:snes_console_state.snes/ctrl2/callback:ctrl2:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:snes_console_state.snes/ctrl2'}), (b:KG {id: 'device:snes_console_state.snes/ctrl2/callback:ctrl2:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:snes_console_state.snes/ctrl2'}), (b:KG {id: 'inputs:snes_joypad'}) MERGE (a)-[r:USES_INPUTS]->(b) SET r += {option: 'joypad'};
MATCH (a:KG {id: 'device:snes_console_state.snes/s_dsp'}), (b:KG {id: 'audioroute:device:snes_console_state.snes/s_dsp/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:snes_console_state.snes/s_dsp'}), (b:KG {id: 'audioroute:device:snes_console_state.snes/s_dsp/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:snes_console_state.snes/s_dsp'}), (b:KG {id: 'map:snes_console_state.spc_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: '0'};
MATCH (a:KG {id: 'device:snes_console_state.snes/snsslot'}), (b:KG {id: 'device:snes_console_state.snes/snsslot/callback:snsslot:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:snes_console_state.snes/snsslot'}), (b:KG {id: 'device:snes_console_state.snes/snsslot/callback:snsslot:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'inputs:snes/OPTIONS'}), (b:KG {id: 'inputs:snes/OPTIONS/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes/DEBUG1'}), (b:KG {id: 'inputs:snes/DEBUG1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes/DEBUG1'}), (b:KG {id: 'inputs:snes/DEBUG1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes/DEBUG1'}), (b:KG {id: 'inputs:snes/DEBUG1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes/DEBUG1'}), (b:KG {id: 'inputs:snes/DEBUG1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes/DEBUG2'}), (b:KG {id: 'inputs:snes/DEBUG2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes/DEBUG2'}), (b:KG {id: 'inputs:snes/DEBUG2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes/DEBUG2'}), (b:KG {id: 'inputs:snes/DEBUG2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes/DEBUG2'}), (b:KG {id: 'inputs:snes/DEBUG2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes/DEBUG2'}), (b:KG {id: 'inputs:snes/DEBUG2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes/DEBUG2'}), (b:KG {id: 'inputs:snes/DEBUG2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes/DEBUG2'}), (b:KG {id: 'inputs:snes/DEBUG2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes/DEBUG2'}), (b:KG {id: 'inputs:snes/DEBUG2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes/DEBUG3'}), (b:KG {id: 'inputs:snes/DEBUG3/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes/DEBUG3'}), (b:KG {id: 'inputs:snes/DEBUG3/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes/DEBUG3'}), (b:KG {id: 'inputs:snes/DEBUG3/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes/DEBUG4'}), (b:KG {id: 'inputs:snes/DEBUG4/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes/DEBUG4'}), (b:KG {id: 'inputs:snes/DEBUG4/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes/DEBUG4'}), (b:KG {id: 'inputs:snes/DEBUG4/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes/DEBUG4'}), (b:KG {id: 'inputs:snes/DEBUG4/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes/DEBUG4'}), (b:KG {id: 'inputs:snes/DEBUG4/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes/DEBUG4'}), (b:KG {id: 'inputs:snes/DEBUG4/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes/DEBUG4'}), (b:KG {id: 'inputs:snes/DEBUG4/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes/DEBUG4'}), (b:KG {id: 'inputs:snes/DEBUG4/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'handler:snes_state.hirq_tick'}), (b:KG {id: 'handler:snes_state.scpu_irq_refresh'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.hdma_init'}), (b:KG {id: 'handler:snes_state.hdma_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.hdma'}), (b:KG {id: 'handler:snes_state.dma_transfer'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.hdma'}), (b:KG {id: 'handler:snes_state.hdma_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snes20_lo_r'}), (b:KG {id: 'handler:.CX4_read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snes20_lo_r'}), (b:KG {id: 'handler:snes_state.snes_r_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snes20_lo_r'}), (b:KG {id: 'handler:snes_state.snes_open_bus_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snes20_lo_w'}), (b:KG {id: 'handler:snes_console_state.snes20_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snes20_hi_r'}), (b:KG {id: 'handler:.CX4_read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snes20_hi_r'}), (b:KG {id: 'handler:snes_state.snes_r_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snes20_hi_r'}), (b:KG {id: 'handler:snes_state.snes_open_bus_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snes20_hi_w'}), (b:KG {id: 'handler:.CX4_write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snes20_hi_w'}), (b:KG {id: 'handler:snes_state.snes_w_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snessgb_lo_r'}), (b:KG {id: 'handler:snes_console_state.snessgb_hi_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snessgb_lo_w'}), (b:KG {id: 'handler:snes_console_state.snessgb_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snessgb_hi_r'}), (b:KG {id: 'handler:snes_state.snes_open_bus_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snessgb_hi_r'}), (b:KG {id: 'handler:snes_state.snes_r_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snessgb_hi_w'}), (b:KG {id: 'handler:snes_state.snes_w_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snessa1_lo_r'}), (b:KG {id: 'handler:snes_state.snes_r_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snessa1_lo_w'}), (b:KG {id: 'handler:snes_console_state.snessa1_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snessa1_hi_r'}), (b:KG {id: 'handler:snes_state.snes_r_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snessa1_hi_w'}), (b:KG {id: 'handler:snes_state.snes_w_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snessfx_lo_r'}), (b:KG {id: 'handler:snes_state.snes_r_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snessfx_lo_w'}), (b:KG {id: 'handler:snes_console_state.snessfx_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snessfx_hi_r'}), (b:KG {id: 'handler:snes_state.snes_r_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snessfx_hi_w'}), (b:KG {id: 'handler:snes_state.snes_w_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snessdd1_lo_r'}), (b:KG {id: 'handler:snes_state.snes_r_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snessdd1_lo_r'}), (b:KG {id: 'handler:snes_state.snes_open_bus_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snessdd1_lo_w'}), (b:KG {id: 'handler:snes_console_state.snessdd1_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snessdd1_hi_r'}), (b:KG {id: 'handler:snes_console_state.snessdd1_lo_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snessdd1_hi_w'}), (b:KG {id: 'handler:snes_state.snes_w_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snesbsx_lo_r'}), (b:KG {id: 'handler:snes_state.snes_r_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snesbsx_lo_r'}), (b:KG {id: 'handler:snes_state.snes_open_bus_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snesbsx_lo_w'}), (b:KG {id: 'handler:snes_console_state.snesbsx_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snesbsx_hi_r'}), (b:KG {id: 'handler:snes_state.snes_r_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snesbsx_hi_r'}), (b:KG {id: 'handler:snes_state.snes_open_bus_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snesbsx_hi_w'}), (b:KG {id: 'handler:snes_state.snes_w_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snes21_lo_r'}), (b:KG {id: 'handler:snes_state.snes_r_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snes21_lo_r'}), (b:KG {id: 'handler:snes_state.snes_open_bus_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snes21_lo_w'}), (b:KG {id: 'handler:snes_state.snes_w_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snes21_hi_r'}), (b:KG {id: 'handler:snes_state.snes_r_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snes21_hi_r'}), (b:KG {id: 'handler:snes_state.snes_open_bus_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snes21_hi_w'}), (b:KG {id: 'handler:snes_state.snes_w_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snes7110_lo_r'}), (b:KG {id: 'handler:snes_state.snes_open_bus_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snes7110_lo_r'}), (b:KG {id: 'handler:snes_state.snes_r_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snes7110_lo_w'}), (b:KG {id: 'handler:snes_state.snes_w_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snes7110_hi_r'}), (b:KG {id: 'handler:snes_state.snes_r_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.snes7110_hi_w'}), (b:KG {id: 'handler:snes_console_state.snes7110_lo_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.pfest94_lo_r'}), (b:KG {id: 'handler:snes_state.snes_r_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.pfest94_lo_r'}), (b:KG {id: 'handler:snes_state.snes_open_bus_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.pfest94_lo_w'}), (b:KG {id: 'handler:snes_console_state.pfest94_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.pfest94_hi_r'}), (b:KG {id: 'handler:snes_state.snes_r_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.pfest94_hi_r'}), (b:KG {id: 'handler:snes_state.snes_open_bus_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_console_state.pfest94_hi_w'}), (b:KG {id: 'handler:snes_state.snes_w_io'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:snes_console_state.snes_map'}), (b:KG {id: 'file:src/mame/nintendo/snes.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1001, sourceColumn: 1, sourceEndLine: 1006};
MATCH (a:KG {id: 'map:snes_console_state.snes_map'}), (b:KG {id: 'map:snes_console_state.snes_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:snes_console_state.snes/soundcpu/callback:soundcpu:0'}), (b:KG {id: 'handler:s_dsp_device.dsp_io_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:snes_console_state.snes/soundcpu/callback:soundcpu:1'}), (b:KG {id: 'handler:s_dsp_device.dsp_io_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:snes_console_state.spc_map'}), (b:KG {id: 'file:src/mame/nintendo/snes.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/nintendo/snes.cpp', sourceLine: 1008, sourceColumn: 1, sourceEndLine: 1011};
MATCH (a:KG {id: 'map:snes_console_state.spc_map'}), (b:KG {id: 'map:snes_console_state.spc_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:snes_console_state.snes/scpu_irq/callback:scpu_irq:0'}), (b:KG {id: 'device:snes_console_state.snes/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:snes_console_state.snes/screen/callback:screen:0'}), (b:KG {id: 'handler:snes_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:snes_console_state.snes/ppu/callback:ppu:0'}), (b:KG {id: 'handler:snes_console_state.snes_open_bus_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:snes_console_state.snes/ctrl1/callback:ctrl1:0'}), (b:KG {id: 'handler:snes_console_state.onscreen_cb'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:snes_joypad'}), (b:KG {id: 'file:src/devices/bus/snes_ctrl/joypad.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'inputs:snes_joypad'}), (b:KG {id: 'inputs:snes_joypad/JOYPAD'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'device:snes_console_state.snes/ctrl2/callback:ctrl2:0'}), (b:KG {id: 'handler:snes_console_state.onscreen_cb'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:snes_console_state.snes/ctrl2/callback:ctrl2:1'}), (b:KG {id: 'handler:snes_console_state.gun_latch_cb'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:snes_console_state.snes/snsslot/callback:snsslot:0'}), (b:KG {id: 'handler:input_merger_device.in_w_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:snes_console_state.snes/snsslot/callback:snsslot:0'}), (b:KG {id: 'device:snes_console_state.snes/scpu_irq'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:snes_console_state.snes/snsslot/callback:snsslot:1'}), (b:KG {id: 'handler:snes_console_state.snes_open_bus_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.hdma_update'}), (b:KG {id: 'handler:snes_state.get_hdma_addr'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.hdma_update'}), (b:KG {id: 'handler:snes_state.abus_read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.hdma_update'}), (b:KG {id: 'handler:snes_state.is_last_active_channel'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.dma_transfer'}), (b:KG {id: 'handler:snes_state.dma_abus_valid'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.dma_transfer'}), (b:KG {id: 'handler:snes_state.abus_read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_r_io'}), (b:KG {id: 'handler:snes_state.snes_io_dma_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_r_io'}), (b:KG {id: 'handler:snes_state.oldjoy1_read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_r_io'}), (b:KG {id: 'handler:snes_state.snes_open_bus_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_r_io'}), (b:KG {id: 'handler:snes_state.oldjoy2_read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_r_io'}), (b:KG {id: 'handler:snes_state.scpu_irq_refresh'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_transfer_data'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op00'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op01'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op05'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op0d'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op10'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op13'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op15'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op1f'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op22'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op25'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op2d'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op40'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op54'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op5c'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op5e'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op60'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op62'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op64'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op66'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op68'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op6a'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op6c'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op6e'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op70'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op72'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op74'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op76'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op78'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op7a'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op7c'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_write'}), (b:KG {id: 'handler:.CX4_op89'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_w_io'}), (b:KG {id: 'handler:snes_state.snes_io_dma_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_w_io'}), (b:KG {id: 'handler:snes_state.write_joy_latch'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_w_io'}), (b:KG {id: 'handler:snes_state.scpu_irq_refresh'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_w_io'}), (b:KG {id: 'handler:snes_state.wrio_write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_w_io'}), (b:KG {id: 'handler:snes_state.dma'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:snes_joypad/JOYPAD'}), (b:KG {id: 'inputs:snes_joypad/JOYPAD/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes_joypad/JOYPAD'}), (b:KG {id: 'inputs:snes_joypad/JOYPAD/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes_joypad/JOYPAD'}), (b:KG {id: 'inputs:snes_joypad/JOYPAD/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes_joypad/JOYPAD'}), (b:KG {id: 'inputs:snes_joypad/JOYPAD/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes_joypad/JOYPAD'}), (b:KG {id: 'inputs:snes_joypad/JOYPAD/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes_joypad/JOYPAD'}), (b:KG {id: 'inputs:snes_joypad/JOYPAD/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes_joypad/JOYPAD'}), (b:KG {id: 'inputs:snes_joypad/JOYPAD/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes_joypad/JOYPAD'}), (b:KG {id: 'inputs:snes_joypad/JOYPAD/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes_joypad/JOYPAD'}), (b:KG {id: 'inputs:snes_joypad/JOYPAD/f8'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes_joypad/JOYPAD'}), (b:KG {id: 'inputs:snes_joypad/JOYPAD/f9'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes_joypad/JOYPAD'}), (b:KG {id: 'inputs:snes_joypad/JOYPAD/f10'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes_joypad/JOYPAD'}), (b:KG {id: 'inputs:snes_joypad/JOYPAD/f11'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:snes_joypad/JOYPAD'}), (b:KG {id: 'inputs:snes_joypad/JOYPAD/f12'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'handler:snes_state.abus_read'}), (b:KG {id: 'handler:snes_state.dma_abus_valid'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.snes_io_dma_r'}), (b:KG {id: 'handler:snes_state.snes_open_bus_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_transfer_data'}), (b:KG {id: 'handler:.CX4_write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op00'}), (b:KG {id: 'handler:.CX4_op00_00'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op00'}), (b:KG {id: 'handler:.CX4_op00_03'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op00'}), (b:KG {id: 'handler:.CX4_op00_05'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op00'}), (b:KG {id: 'handler:.CX4_op00_07'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op00'}), (b:KG {id: 'handler:.CX4_op00_08'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op00'}), (b:KG {id: 'handler:.CX4_op00_0b'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op00'}), (b:KG {id: 'handler:.CX4_op00_0c'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op01'}), (b:KG {id: 'handler:.CX4_C4DrawWireFrame'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op05'}), (b:KG {id: 'handler:.CX4_readw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op05'}), (b:KG {id: 'handler:.CX4_writew'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op0d'}), (b:KG {id: 'handler:.CX4_readw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op0d'}), (b:KG {id: 'handler:.CX4_writew'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op10'}), (b:KG {id: 'handler:.CX4_ldr'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op10'}), (b:KG {id: 'handler:.CX4_mul'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op10'}), (b:KG {id: 'handler:.CX4_str'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op10'}), (b:KG {id: 'handler:.CX4_cos'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op10'}), (b:KG {id: 'handler:.CX4_sin'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op13'}), (b:KG {id: 'handler:.CX4_ldr'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op13'}), (b:KG {id: 'handler:.CX4_mul'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op13'}), (b:KG {id: 'handler:.CX4_str'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op13'}), (b:KG {id: 'handler:.CX4_cos'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op13'}), (b:KG {id: 'handler:.CX4_sin'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op15'}), (b:KG {id: 'handler:.CX4_readw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op15'}), (b:KG {id: 'handler:.CX4_writew'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op1f'}), (b:KG {id: 'handler:.CX4_readw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op1f'}), (b:KG {id: 'handler:.CX4_writew'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op22'}), (b:KG {id: 'handler:.CX4_readw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op25'}), (b:KG {id: 'handler:.CX4_ldr'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op25'}), (b:KG {id: 'handler:.CX4_mul'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op25'}), (b:KG {id: 'handler:.CX4_str'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op2d'}), (b:KG {id: 'handler:.CX4_readw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op2d'}), (b:KG {id: 'handler:.CX4_read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op2d'}), (b:KG {id: 'handler:.CX4_C4TransfWireFrame2'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op2d'}), (b:KG {id: 'handler:.CX4_writew'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op40'}), (b:KG {id: 'handler:.CX4_str'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op54'}), (b:KG {id: 'handler:.CX4_ldr'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op54'}), (b:KG {id: 'handler:.CX4_mul'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op54'}), (b:KG {id: 'handler:.CX4_str'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op5c'}), (b:KG {id: 'handler:.CX4_str'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op5c'}), (b:KG {id: 'handler:.CX4_immediate_reg'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op5e'}), (b:KG {id: 'handler:.CX4_immediate_reg'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op60'}), (b:KG {id: 'handler:.CX4_immediate_reg'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op62'}), (b:KG {id: 'handler:.CX4_immediate_reg'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op64'}), (b:KG {id: 'handler:.CX4_immediate_reg'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op66'}), (b:KG {id: 'handler:.CX4_immediate_reg'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op68'}), (b:KG {id: 'handler:.CX4_immediate_reg'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op6a'}), (b:KG {id: 'handler:.CX4_immediate_reg'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op6c'}), (b:KG {id: 'handler:.CX4_immediate_reg'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op6e'}), (b:KG {id: 'handler:.CX4_immediate_reg'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op70'}), (b:KG {id: 'handler:.CX4_immediate_reg'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op72'}), (b:KG {id: 'handler:.CX4_immediate_reg'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op74'}), (b:KG {id: 'handler:.CX4_immediate_reg'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op76'}), (b:KG {id: 'handler:.CX4_immediate_reg'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op78'}), (b:KG {id: 'handler:.CX4_immediate_reg'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op7a'}), (b:KG {id: 'handler:.CX4_immediate_reg'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op7c'}), (b:KG {id: 'handler:.CX4_immediate_reg'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op89'}), (b:KG {id: 'handler:.CX4_str'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.dma'}), (b:KG {id: 'handler:snes_state.dma_transfer'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op00_00'}), (b:KG {id: 'handler:.CX4_readw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op00_00'}), (b:KG {id: 'handler:.CX4_readl'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op00_03'}), (b:KG {id: 'handler:.CX4_C4DoScaleRotate'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op00_05'}), (b:KG {id: 'handler:.CX4_read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op00_05'}), (b:KG {id: 'handler:.CX4_writew'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op00_05'}), (b:KG {id: 'handler:.CX4_readw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op00_05'}), (b:KG {id: 'handler:.CX4_C4TransfWireFrame'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op00_05'}), (b:KG {id: 'handler:.CX4_C4CalcWireFrame'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op00_07'}), (b:KG {id: 'handler:.CX4_C4DoScaleRotate'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op00_08'}), (b:KG {id: 'handler:.CX4_C4DrawWireFrame'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op00_0b'}), (b:KG {id: 'handler:.CX4_read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op00_0b'}), (b:KG {id: 'handler:.CX4_readw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op00_0b'}), (b:KG {id: 'handler:.CX4_write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op00_0c'}), (b:KG {id: 'handler:.CX4_read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op00_0c'}), (b:KG {id: 'handler:.CX4_readw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_op00_0c'}), (b:KG {id: 'handler:.CX4_writew'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_C4DrawWireFrame'}), (b:KG {id: 'handler:.CX4_readl'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_C4DrawWireFrame'}), (b:KG {id: 'handler:.CX4_read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_C4DrawWireFrame'}), (b:KG {id: 'handler:.CX4_C4DrawLine'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_readw'}), (b:KG {id: 'handler:.CX4_read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_writew'}), (b:KG {id: 'handler:.CX4_write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_cos'}), (b:KG {id: 'handler:.CX4_sin'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_immediate_reg'}), (b:KG {id: 'handler:.CX4_ldr'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_immediate_reg'}), (b:KG {id: 'handler:.CX4_str'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_readl'}), (b:KG {id: 'handler:.CX4_read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_C4DoScaleRotate'}), (b:KG {id: 'handler:.CX4_read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_C4DoScaleRotate'}), (b:KG {id: 'handler:.CX4_readw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_C4DrawLine'}), (b:KG {id: 'handler:.CX4_read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_C4DrawLine'}), (b:KG {id: 'handler:.CX4_C4TransfWireFrame2'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.CX4_C4DrawLine'}), (b:KG {id: 'handler:.CX4_C4CalcWireFrame'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_reset__base'}), (b:KG {id: 'handler:snes_state.snes_init_ram'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_reset'}), (b:KG {id: 'handler:snes_state.machine_reset__base'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_reset'}), (b:KG {id: 'handler:snes_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start__base'}), (b:KG {id: 'handler:snes_state.snes_init_timers'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_state.machine_start__base'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_state.machine_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snes20_lo_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snes20_lo_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snes20_hi_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snes20_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessgb_lo_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessgb_lo_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessgb_hi_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessgb_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessa1_lo_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessa1_lo_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessa1_hi_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessa1_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessfx_lo_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessfx_lo_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessfx_hi_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessfx_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessdd1_lo_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessdd1_lo_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessdd1_hi_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snessdd1_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snesbsx_lo_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snesbsx_lo_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snesbsx_hi_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snesbsx_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snes21_lo_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snes21_lo_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snes21_hi_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snes21_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snes7110_lo_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snes7110_lo_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snes7110_hi_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.snes7110_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.pfest94_lo_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.pfest94_lo_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.pfest94_hi_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_console_state.pfest94_hi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:snes_state.machine_start'}), (b:KG {id: 'handler:snes_state.snes_open_bus_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
