// mamekit knowledge graph — driver src/mame/atari/a2600.cpp
// generated 2026-09-05T03:50:50.407Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/atari/a2600.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/atari/a2600.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:bus/vcs/compumat.h'}) SET n:SourceFile SET n += {path: 'bus/vcs/compumat.h', external: true};
MERGE (n:KG {id: 'file:bus/vcs/dpc.h'}) SET n:SourceFile SET n += {path: 'bus/vcs/dpc.h', external: true};
MERGE (n:KG {id: 'file:bus/vcs/harmony_melody.h'}) SET n:SourceFile SET n += {path: 'bus/vcs/harmony_melody.h', external: true};
MERGE (n:KG {id: 'file:bus/vcs/rom.h'}) SET n:SourceFile SET n += {path: 'bus/vcs/rom.h', external: true};
MERGE (n:KG {id: 'file:bus/vcs/scharger.h'}) SET n:SourceFile SET n += {path: 'bus/vcs/scharger.h', external: true};
MERGE (n:KG {id: 'file:bus/vcs/vcs_slot.h'}) SET n:SourceFile SET n += {path: 'bus/vcs/vcs_slot.h', external: true};
MERGE (n:KG {id: 'file:bus/vcs_ctrl/ctrl.h'}) SET n:SourceFile SET n += {path: 'bus/vcs_ctrl/ctrl.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6502/m6507.h'}) SET n:SourceFile SET n += {path: 'cpu/m6502/m6507.h', external: true};
MERGE (n:KG {id: 'file:emupal.h'}) SET n:SourceFile SET n += {path: 'emupal.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:softlist_dev.h'}) SET n:SourceFile SET n += {path: 'softlist_dev.h', external: true};
MERGE (n:KG {id: 'file:sound/tiaintf.h'}) SET n:SourceFile SET n += {path: 'sound/tiaintf.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:tia.h'}) SET n:SourceFile SET n += {path: 'tia.h', external: true};
MERGE (n:KG {id: 'file:machine/mos6530.h'}) SET n:SourceFile SET n += {path: 'machine/mos6530.h', external: true};
MERGE (n:KG {id: 'file:logmacro.h'}) SET n:SourceFile SET n += {path: 'logmacro.h', external: true};
MERGE (n:KG {id: 'game:a2600'}) SET n:Game SET n += {name: 'a2600', year: '1977', company: 'Atari', fullname: 'Atari 2600 (NTSC)', monitor: 'ROT0', cls: 'a2600_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'console', sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 820, sourceColumn: 1, sourceEndLine: 820, classConstants: '{"m_xtal":3579575}'};
MERGE (n:KG {id: 'romset:a2600'}) SET n:RomSet SET n += {name: 'a2600', sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 704, sourceColumn: 1, sourceEndLine: 704};
MERGE (n:KG {id: 'region:a2600/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 8192, flags: 'ROMREGION_ERASEFF', sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 705, sourceColumn: 2, sourceEndLine: 705};
MERGE (n:KG {id: 'map:a2600_base_state.a2600_mem'}) SET n:AddressMap SET n += {cls: 'a2600_base_state', name: 'a2600_mem', sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 264, sourceColumn: 1, sourceEndLine: 269};
MERGE (n:KG {id: 'map:a2600_base_state.a2600_mem/range0'}) SET n:AddressRange SET n += {start: 0, end: 127, raw: 'map(0x0000, 0x007f).mirror(0x0f00).rw(m_tia, FUNC(tia_video_device::read), FUNC(tia_video_device::write))', sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 266, sourceColumn: 2, sourceEndLine: 266, mirror: 3840};
MERGE (n:KG {id: 'handler:tia_video_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1781, sourceColumn: 1, sourceEndLine: 1841, sourceParameters: 'offs_t offset', sourceBody: '/* lower bits 0 - 5 seem to depend on the last byte on the
		 data bus. If the driver supplied a routine to retrieve
		 that we will call that, otherwise we will use the lower
		 bit of the offset.
	*/
	uint8_t data = offset & 0x3f;

	if (!m_databus_contents_cb.isunset())
	{
		data = m_databus_contents_cb(offset) & 0x3f;
	}

	if (!(offset & 0x8))
	{
		update_bitmap(current_x(), current_y());
	}

	switch (offset & 0xF)
	{
	case 0x0:
		return data | CXM0P;
	case 0x1:
		return data | CXM1P;
	case 0x2:
		return data | CXP0FB;
	case 0x3:
		return data | CXP1FB;
	case 0x4:
		return data | CXM0FB;
	case 0x5:
		return data | CXM1FB;
	case 0x6:
		return data | CXBLPF;
	case 0x7:
		return data | CXPPMM;
	case 0x8:
		return data | INPT_r(0);
	case 0x9:
		return data | INPT_r(1);
	case 0xA:
		return data | INPT_r(2);
	case 0xB:
		return data | INPT_r(3);
	case 0xC:
		{
			int button = !m_read_input_port_cb.isunset() ? ( m_read_input_port_cb(4,0xFFFF) & 0x80 ) : 0x80;
			INPT4 = ( VBLANK & 0x40) ? ( INPT4 & button ) : button;
		}
		return data | INPT4;
	case 0xD:
		{
			int button = !m_read_input_port_cb.isunset() ? ( m_read_input_port_cb(5,0xFFFF) & 0x80 ) : 0x80;
			INPT5 = ( VBLANK & 0x40) ? ( INPT5 & button ) : button;
		}
		return data | INPT5;
	}

	return data;'};
MERGE (n:KG {id: 'handler:tia_video_device.update_bitmap'}) SET n:Handler SET n += {method: 'update_bitmap', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 697, sourceColumn: 1, sourceEndLine: 973, sourceConstants: ['HMOVE_INACTIVE=-200'], sourceParameters: 'int next_x, int next_y', sourceBody: 'uint8_t linePF[160];
	uint8_t lineP0[160];
	uint8_t lineP1[160];
	uint8_t lineM0[160];
	uint8_t lineM1[160];
	uint8_t lineBL[160];

	uint8_t temp[160];

	if (prev_y >= next_y && prev_x >= next_x)
	{
		return;
	}

	memset(linePF, 0xFF, sizeof linePF);
	memset(lineP0, 0xFF, sizeof lineP0);
	memset(lineP1, 0xFF, sizeof lineP1);
	memset(lineM0, 0xFF, sizeof lineM0);
	memset(lineM1, 0xFF, sizeof lineM1);
	memset(lineBL, 0xFF, sizeof lineBL);

	if (VBLANK & 2)
	{
		memset(temp, 0, 160);
	}
	else
	{
		memset(temp, COLUBK >> 1, 160);

		if (CTRLPF & 4)
		{
			drawS1(temp, lineP1);
			drawM1(temp, lineM1);
			drawS0(temp, lineP0);
			drawM0(temp, lineM0);
			drawPF(temp, linePF);
			drawBL(temp, lineBL);
		}
		else
		{
			drawPF(temp, linePF);
			drawBL(temp, lineBL);
			drawS1(temp, lineP1);
			drawM1(temp, lineM1);
			drawS0(temp, lineP0);
			drawM0(temp, lineM0);
		}
	}

	for (int y = prev_y; y <= next_y; y++)
	{
		int x1 = prev_x;
		int x2 = next_x;
		int colx1;

		/* Check if we have crossed a line boundary */
		if (y !=  prev_y ) {
			int redraw_line = 0;

			HMOVE_started_previous = HMOVE_INACTIVE;

			if ( HMOVE_started != HMOVE_INACTIVE ) {
				/* Apply pending motion clocks from a HMOVE initiated during the scanline */
				if ( HMOVE_started >= 97 && HMOVE_started < 157 ) {
					horzP0 -= motclkP0;
					horzP1 -= motclkP1;
					horzM0 -= motclkM0;
					horzM1 -= motclkM1;
					horzBL -= motclkBL;
					if (horzP0 < 0)
						horzP0 += 160;
					if (horzP1 < 0)
						horzP1 += 160;
					if (horzM0 < 0)
						horzM0 += 160;
					if (horzM1 < 0)
						horzM1 += 160;
					if (horzBL < 0)
						horzBL += 160;
					HMOVE_started_previous = HMOVE_started;
				}
				HMOVE_started = HMOVE_INACTIVE;
				redraw_line = 1;
			}

			/* Redraw line if the playfield reflect bit was changed after the center of the screen */
			if ( REFLECT != ( CTRLPF & 0x01 ) ) {
				REFLECT = CTRLPF & 0x01;
				redraw_line = 1;
			}

			/* Redraw line if a RESPx or NUSIZx occurred during the last line */
			if ( ! startP0 || ! startP1 || ! startM0 || ! startM1) {
				startP0 = 1;
				startP1 = 1;
				startM0 = 1;
				startM1 = 1;

				redraw_line = 1;
			}

			if ( skipclipP0 ) {
				skipclipP0--;
				redraw_line = 1;
			}

			if ( skipclipP1 ) {
				skipclipP1--;
				redraw_line = 1;
			}

			/* Redraw line if HMP0 latch is still set */
			if ( HMP0_latch ) {
				horzP0 -= 17;
				if ( horzP0 < 0 )
					horzP0 += 160;
				redraw_line = 1;
			}

			/* Redraw line if HMP1 latch is still set */
			if ( HMP1_latch ) {
				horzP1 -= 17;
				if ( horzP1 < 0 )
					horzP1 += 160;
				redraw_line = 1;
			}

			/* Redraw line if HMM0 latch is still set */
			if ( HMM0_latch ) {
				horzM0 -= 17;
				if ( horzM0 < 0 )
					horzM0 += 160;
				redraw_line = 1;
			}

			/* Redraw line if HMM1 latch is still set */
			if ( HMM1_latch ) {
				horzM1 -= 17;
				if ( horzM1 < 0 )
					horzM1 += 160;
				redraw_line = 1;
			}

			/* Redraw line if HMBL latch is still set */
			if ( HMBL_latch ) {
				horzBL -= 17;
				if ( horzBL < 0 )
					horzBL += 160;
				redraw_line = 1;
			}

			/* Redraw line if NUSIZx data was changed */
			if ( NUSIZx_changed ) {
				NUSIZx_changed = 0;
				redraw_line = 1;
			}

			if ( skipM0delay || skipM1delay ) {
				skipM0delay = 0;
				skipM1delay = 0;
				redraw_line = 1;
			}

			if ( redraw_line ) {
				if (VBLANK & 2)
				{
					setup_pXgfx();
					memset(temp, 0, 160);
				}
				else
				{
					memset(linePF, 0xFF, sizeof linePF);
					memset(lineP0, 0xFF, sizeof lineP0);
					memset(lineP1, 0xFF, sizeof lineP1);
					memset(lineM0, 0xFF, sizeof lineM0);
					memset(lineM1, 0xFF, sizeof lineM1);
					memset(lineBL, 0xFF, sizeof lineBL);

					memset(temp, COLUBK >> 1, 160);

					setup_pXgfx();

					if (CTRLPF & 4)
					{
						drawS1(temp, lineP1);
						drawM1(temp, lineM1);
						drawS0(temp, lineP0);
						drawM0(temp, lineM0);
						drawPF(temp, linePF);
						drawBL(temp, lineBL);
					}
					else
					{
						drawPF(temp, linePF);
						drawBL(temp, lineBL);
						drawS1(temp, lineP1);
						drawM1(temp, lineM1);
						drawS0(temp, lineP0);
						drawM0(temp, lineM0);
					}
				}
			}
		}
		if (y != prev_y || x1 < 0)
		{
			x1 = 0;
		}
		if (y != next_y || x2 > 160)
		{
			x2 = 160;
		}

		/* Collision detection also takes place under the extended hblank area */
		colx1 = ( x1 == 8 && HMOVE_started != HMOVE_INACTIVE ) ? 0 : x1;

		if (collision_check(lineM0, lineP1, colx1, x2))
			CXM0P |= 0x80;
		if (collision_check(lineM0, lineP0, colx1, x2))
			CXM0P |= 0x40;
		if (collision_check(lineM1, lineP0, colx1, x2))
			CXM1P |= 0x80;
		if (collision_check(lineM1, lineP1, colx1, x2))
			CXM1P |= 0x40;
		if (collision_check(lineP0, linePF, colx1, x2))
			CXP0FB |= 0x80;
		if (collision_check(lineP0, lineBL, colx1, x2))
			CXP0FB |= 0x40;
		if (collision_check(lineP1, linePF, colx1, x2))
			CXP1FB |= 0x80;
		if (collision_check(lineP1, lineBL, colx1, x2))
			CXP1FB |= 0x40;
		if (collision_check(lineM0, linePF, colx1, x2))
			CXM0FB |= 0x80;
		if (collision_check(lineM0, lineBL, colx1, x2))
			CXM0FB |= 0x40;
		if (collision_check(lineM1, linePF, colx1, x2))
			CXM1FB |= 0x80;
		if (collision_check(lineM1, lineBL, colx1, x2))
			CXM1FB |= 0x40;
		if (collision_check(lineBL, linePF, colx1, x2))
			CXBLPF |= 0x80;
		if (collision_check(lineP0, lineP1, colx1, x2))
			CXPPMM |= 0x80;
		if (collision_check(lineM0, lineM1, colx1, x2))
			CXPPMM |= 0x40;

		uint16_t *p = &helper[current_bitmap].pix(y % screen_height, 34);

		for (int x = x1; x < x2; x++)
		{
			p[x] = temp[x];
		}

		if ( x2 == 160 && y % screen_height == (screen_height - 1) ) {
			for ( int t_y = 0; t_y < buffer.height(); t_y++ ) {
				uint16_t* l0 = &helper[current_bitmap].pix(t_y);
				uint16_t* l1 = &helper[1 - current_bitmap].pix(t_y);
				uint32_t* l2 = &buffer.pix(t_y);
				int t_x;
				for( t_x = 0; t_x < buffer.width(); t_x++ ) {
					if ( l0[t_x] != l1[t_x] ) {
						/* Combine both entries */
						l2[t_x] = pen(( ( l0[t_x] + 1 ) << 7 ) | l1[t_x]);
					} else {
						l2[t_x] = pen(l0[t_x]);
					}
				}
			}
			current_bitmap ^= 1;
		}
	}

	prev_x = next_x;
	prev_y = next_y;'};
MERGE (n:KG {id: 'handler:tia_video_device.drawS1'}) SET n:Handler SET n += {method: 'drawS1', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 587, sourceColumn: 1, sourceEndLine: 590, sourceParameters: 'uint8_t* p, uint8_t* col', sourceBody: 'draw_sprite_helper(p, col, &p1gfx, (VDELP1 & 1) ? prevGRP1 : GRP1, COLUP1, REFP1);'};
MERGE (n:KG {id: 'handler:tia_video_device.draw_sprite_helper'}) SET n:Handler SET n += {method: 'draw_sprite_helper', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 419, sourceColumn: 1, sourceEndLine: 449, sourceConstants: ['PLAYER_GFX_SLOTS=4'], sourceParameters: 'uint8_t* p, uint8_t *col, struct player_gfx *gfx,
	uint8_t GRP, uint8_t COLUP, uint8_t REFP', sourceBody: 'int i;
	int j;
	int k;

	if (REFP & 8)
	{
		GRP = bitswap<8>(GRP, 0, 1, 2, 3, 4, 5, 6, 7);
	}

	for (i = 0; i < PLAYER_GFX_SLOTS; i++)
	{
		int start_pos = gfx->start_drawing[i];
		for (j = gfx->start_pixel[i]; j < 8; j++)
		{
			for (k = 0; k < gfx->size[i]; k++)
			{
				if (GRP & (0x80 >> j))
				{
					if ( start_pos < 160 || ! gfx->skipclip[i] ) {
						p[start_pos % 160] = COLUP >> 1;
						col[start_pos % 160] = COLUP >> 1;
					}
				}
				start_pos++;
			}
		}
	}'};
MERGE (n:KG {id: 'handler:tia_video_device.drawM1'}) SET n:Handler SET n += {method: 'drawM1', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 599, sourceColumn: 1, sourceEndLine: 602, sourceParameters: 'uint8_t* p, uint8_t* col', sourceBody: 'draw_missile_helper(p, col, horzM1, skipM1delay, HMM1_latch, startM1, RESMP1, ENAM1, NUSIZ1, COLUP1);'};
MERGE (n:KG {id: 'handler:tia_video_device.draw_missile_helper'}) SET n:Handler SET n += {method: 'draw_missile_helper', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 452, sourceColumn: 1, sourceEndLine: 513, sourceParameters: 'uint8_t* p, uint8_t* col, int horz, int skipdelay, int latch, int start,
	uint8_t RESMP, uint8_t ENAM, uint8_t NUSIZ, uint8_t COLUM', sourceBody: 'int num = nusiz[NUSIZ & 7][0];
	int skp = nusiz[NUSIZ & 7][2];

	int width = 1 << ((NUSIZ >> 4) & 3);

	int i;
	int j;

	for (i = 0; i < num; i++)
	{
		if ( i == 0 )
			horz -= skipdelay;
		if ( i == 1 )
			horz += skipdelay;
		if ( i > 0 || start ) {
			for (j = 0; j < width; j++)
			{
				if ((ENAM & 2) && !(RESMP & 2))
				{
					if ( latch ) {
						switch ( horz % 4 ) {
						case 1:
							if ( horz >= 0 )
							{
								if ( horz < 156 ) {
									p[(horz + 1) % 160] = COLUM >> 1;
									col[(horz + 1) % 160] = COLUM >> 1;
								}
								p[horz % 160] = COLUM >> 1;
								col[horz % 160] = COLUM >> 1;
							}
							break;
						case 2:
						case 3:
							if ( horz >= 0 )
							{
								p[horz % 160] = COLUM >> 1;
								col[horz % 160] = COLUM >> 1;
							}
							break;
						}
					} else {
						if ( horz >= 0 )
						{
							p[horz % 160] = COLUM >> 1;
							col[horz % 160] = COLUM >> 1;
						}
					}
				}

				horz++;
			}
		} else {
			horz+= width;
		}

		horz += 8 * (skp + 1) - width;
	}'};
MERGE (n:KG {id: 'handler:tia_video_device.drawS0'}) SET n:Handler SET n += {method: 'drawS0', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 581, sourceColumn: 1, sourceEndLine: 584, sourceParameters: 'uint8_t* p, uint8_t* col', sourceBody: 'draw_sprite_helper(p, col, &p0gfx, (VDELP0 & 1) ? prevGRP0 : GRP0, COLUP0, REFP0);'};
MERGE (n:KG {id: 'handler:tia_video_device.drawM0'}) SET n:Handler SET n += {method: 'drawM0', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 593, sourceColumn: 1, sourceEndLine: 596, sourceParameters: 'uint8_t* p, uint8_t* col', sourceBody: 'draw_missile_helper(p, col, horzM0, skipM0delay, HMM0_latch, startM0, RESMP0, ENAM0, NUSIZ0, COLUP0);'};
MERGE (n:KG {id: 'handler:tia_video_device.drawPF'}) SET n:Handler SET n += {method: 'drawPF', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 611, sourceColumn: 1, sourceEndLine: 618, sourceParameters: 'uint8_t* p, uint8_t *col', sourceBody: 'draw_playfield_helper(p, col, 0,
		((CTRLPF & 6) == 2) ? COLUP0 : COLUPF, 0);

	draw_playfield_helper(p, col, 80,
		((CTRLPF & 6) == 2) ? COLUP1 : COLUPF, REFLECT);'};
MERGE (n:KG {id: 'handler:tia_video_device.draw_playfield_helper'}) SET n:Handler SET n += {method: 'draw_playfield_helper', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 516, sourceColumn: 1, sourceEndLine: 559, sourceParameters: 'uint8_t* p, uint8_t* col, int horz,
	uint8_t COLU, uint8_t REFPF', sourceBody: 'uint32_t PF =
		(bitswap<8>(PF0, 0, 1, 2, 3, 4, 5, 6, 7) << 0x10) |
		(bitswap<8>(PF1, 7, 6, 5, 4, 3, 2, 1, 0) << 0x08) |
		(bitswap<8>(PF2, 0, 1, 2, 3, 4, 5, 6, 7) << 0x00);

	int i;
	int j;

	if (REFPF)
	{
		uint32_t swap = 0;

		for (i = 0; i < 20; i++)
		{
			swap <<= 1;

			if (PF & 1)
			{
				swap |= 1;
			}

			PF >>= 1;
		}

		PF = swap;
	}

	for (i = 0; i < 20; i++)
	{
		for (j = 0; j < 4; j++)
		{
			if (PF & (0x80000 >> i))
			{
				p[horz] = COLU >> 1;
				col[horz] = COLU >> 1;
			}

			horz++;
		}
	}'};
MERGE (n:KG {id: 'handler:tia_video_device.drawBL'}) SET n:Handler SET n += {method: 'drawBL', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 605, sourceColumn: 1, sourceEndLine: 608, sourceParameters: 'uint8_t* p, uint8_t* col', sourceBody: 'draw_ball_helper(p, col, horzBL, (VDELBL & 1) ? prevENABL : ENABL);'};
MERGE (n:KG {id: 'handler:tia_video_device.draw_ball_helper'}) SET n:Handler SET n += {method: 'draw_ball_helper', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 562, sourceColumn: 1, sourceEndLine: 578, sourceParameters: 'uint8_t* p, uint8_t* col, int horz, uint8_t ENAB', sourceBody: 'int width = 1 << ((CTRLPF >> 4) & 3);

	int i;

	for (i = 0; i < width; i++)
	{
		if (ENAB & 2)
		{
			p[horz % 160] = COLUPF >> 1;
			col[horz % 160] = COLUPF >> 1;
		}

		horz++;
	}'};
MERGE (n:KG {id: 'handler:tia_video_device.setup_pXgfx'}) SET n:Handler SET n += {method: 'setup_pXgfx', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 649, sourceColumn: 1, sourceEndLine: 695, sourceConstants: ['PLAYER_GFX_SLOTS=4'], sourceParameters: 'void', sourceBody: 'int i;
	for ( i = 0; i < PLAYER_GFX_SLOTS; i++ )
	{
		if ( i < nusiz[NUSIZ0 & 7][0] && i >= ( startP0 ? 0 : 1 ) )
		{
			p0gfx.size[i] = nusiz[NUSIZ0 & 7][1];
			if ( i )
			{
				p0gfx.start_drawing[i] = ( horzP0 + (p0gfx.size[i] > 1 ? 1 : 0)
											+ i * 8 * ( nusiz[NUSIZ0 & 7][2] + p0gfx.size[i] ) ) % 160;
				p0gfx.skipclip[i] = 0;
			}
			else
			{
				p0gfx.start_drawing[i] = horzP0 + (p0gfx.size[i] > 1 ? 1 : 0 );
				p0gfx.skipclip[i] = skipclipP0;
			}
			p0gfx.start_pixel[i] = 0;
		}
		else
		{
			p0gfx.start_pixel[i] = 8;
		}
		if ( i < nusiz[NUSIZ1 & 7][0] && i >= ( startP1 ? 0 : 1 ) )
		{
			p1gfx.size[i] = nusiz[NUSIZ1 & 7][1];
			if ( i )
			{
				p1gfx.start_drawing[i] = ( horzP1 + (p1gfx.size[i] > 1 ? 1 : 0)
											+ i * 8 * ( nusiz[NUSIZ1 & 7][2] + p1gfx.size[i] ) ) % 160;
				p1gfx.skipclip[i] = 0;
			}
			else
			{
				p1gfx.start_drawing[i] = horzP1 + (p1gfx.size[i] > 1 ? 1 : 0);
				p1gfx.skipclip[i] = skipclipP1;
			}
			p1gfx.start_pixel[i] = 0;
		}
		else
		{
			p1gfx.start_pixel[i] = 8;
		}
	}'};
MERGE (n:KG {id: 'handler:tia_video_device.collision_check'}) SET n:Handler SET n += {method: 'collision_check', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 621, sourceColumn: 1, sourceEndLine: 634, sourceParameters: 'uint8_t* p1, uint8_t* p2, int x1, int x2', sourceBody: 'int i;

	for (i = x1; i < x2; i++)
	{
		if (p1[i] != 0xFF && p2[i] != 0xFF)
		{
			return 1;
		}
	}

	return 0;'};
MERGE (n:KG {id: 'handler:tia_video_device.current_x'}) SET n:Handler SET n += {method: 'current_x', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 637, sourceColumn: 1, sourceEndLine: 640, sourceParameters: '', sourceBody: 'return 3 * ((m_maincpu->total_cycles() - frame_cycles) % 76) - 68;'};
MERGE (n:KG {id: 'handler:tia_video_device.current_y'}) SET n:Handler SET n += {method: 'current_y', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 643, sourceColumn: 1, sourceEndLine: 646, sourceParameters: '', sourceBody: 'return (m_maincpu->total_cycles() - frame_cycles) / 76;'};
MERGE (n:KG {id: 'handler:tia_video_device.INPT_r'}) SET n:Handler SET n += {method: 'INPT_r', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1766, sourceColumn: 1, sourceEndLine: 1778, sourceConstants: ['TIA_INPUT_PORT_ALWAYS_ON=0', 'TIA_INPUT_PORT_ALWAYS_OFF=255'], sourceParameters: 'offs_t offset', sourceBody: 'const uint64_t elapsed = m_maincpu->total_cycles() - paddle_start;
	const uint16_t input = m_read_input_port_cb(offset & 3, 0xffff);

	if (input == TIA_INPUT_PORT_ALWAYS_ON)
		return 0x80;
	if (input == TIA_INPUT_PORT_ALWAYS_OFF)
		return 0x00;

	const uint16_t paddle_cycles = input * 76;
	return elapsed > paddle_cycles ? 0x80 : 0x00;'};
MERGE (n:KG {id: 'handler:tia_video_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1844, sourceColumn: 1, sourceEndLine: 2039, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'int curr_x = current_x();
	int curr_y = current_y();

	offset &= 0x3F;

	if (offset >= 0x0D && offset <= 0x0F)
	{
		curr_x = ( curr_x + 1 ) & ~3;
	}

	if (TABLE(offset, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 4, 4, 4, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0) >= 0)
	{
		update_bitmap(curr_x + TABLE(offset, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 4, 4, 4, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0), curr_y);
	}

	switch (offset)
	{
	case 0x00:
		VSYNC_w(data);
		break;
	case 0x01:
		VBLANK_w(data);
		break;
	case 0x02:
		WSYNC_w();
		break;
	case 0x03:
		RSYNC_w();
		break;
	case 0x04:
		NUSIZ0_w(data);
		break;
	case 0x05:
		NUSIZ1_w(data);
		break;
	case 0x06:
		COLUP0 = data;
		break;
	case 0x07:
		COLUP1 = data;
		break;
	case 0x08:
		COLUPF = data;
		break;
	case 0x09:
		COLUBK = data;
		break;
	case 0x0A:
		CTRLPF_w(data);
		break;
	case 0x0B:
		REFP0 = data;
		break;
	case 0x0C:
		REFP1 = data;
		break;
	case 0x0D:
		PF0 = data;
		break;
	case 0x0E:
		PF1 = data;
		break;
	case 0x0F:
		PF2 = data;
		break;
	case 0x10:
		RESP0_w();
		break;
	case 0x11:
		RESP1_w();
		break;
	case 0x12:
		RESM0_w();
		break;
	case 0x13:
		RESM1_w();
		break;
	case 0x14:
		RESBL_w();
		break;

	case 0x15: /* AUDC0 */
	case 0x16: /* AUDC1 */
	case 0x17: /* AUDF0 */
	case 0x18: /* AUDF1 */
	case 0x19: /* AUDV0 */
	case 0x1A: /* AUDV1 */
		m_tia->tia_sound_w(offset, data);
		break;

	case 0x1B:
		GRP0_w(data);
		break;
	case 0x1C:
		GRP1_w(data);
		break;
	case 0x1D:
		ENAM0 = data;
		break;
	case 0x1E:
		ENAM1 = data;
		break;
	case 0x1F:
		ENABL = data;
		break;
	case 0x20:
		HMP0_w(data);
		break;
	case 0x21:
		HMP1_w(data);
		break;
	case 0x22:
		HMM0_w(data);
		break;
	case 0x23:
		HMM1_w(data);
		break;
	case 0x24:
		HMBL_w(data);
		break;
	case 0x25:
		VDELP0 = data;
		break;
	case 0x26:
		VDELP1 = data;
		break;
	case 0x27:
		VDELBL = data;
		break;
	case 0x28:
		RESMP0_w(data);
		break;
	case 0x29:
		RESMP1_w(data);
		break;
	case 0x2A:
		HMOVE_w(data);
		break;
	case 0x2B:
		HMCLR_w(data);
		break;
	case 0x2C:
		CXCLR_w();
		break;
	}'};
MERGE (n:KG {id: 'handler:tia_video_device.VSYNC_w'}) SET n:Handler SET n += {method: 'VSYNC_w', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 987, sourceColumn: 1, sourceEndLine: 1008, sourceParameters: 'uint8_t data', sourceBody: 'if (data & 2)
	{
		if (!(VSYNC & 2))
		{
			int curr_y = current_y();

			if ( curr_y > 5 )
				update_bitmap(screen().width(), screen().height());

			m_vsync_cb(0, curr_y, 0xFFFF);

			prev_y = 0;
			prev_x = 0;

			frame_cycles += 76 * current_y();
		}
	}

	VSYNC = data;'};
MERGE (n:KG {id: 'handler:tia_video_device.VBLANK_w'}) SET n:Handler SET n += {method: 'VBLANK_w', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1011, sourceColumn: 1, sourceEndLine: 1022, sourceParameters: 'uint8_t data', sourceBody: 'if (data & 0x80)
	{
		paddle_start = m_maincpu->total_cycles();
	}
	if ( ! ( VBLANK & 0x40 ) ) {
		INPT4 = 0x80;
		INPT5 = 0x80;
	}
	VBLANK = data;'};
MERGE (n:KG {id: 'handler:tia_video_device.WSYNC_w'}) SET n:Handler SET n += {method: 'WSYNC_w', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 976, sourceColumn: 1, sourceEndLine: 984, sourceParameters: '', sourceBody: 'int cycles = m_maincpu->total_cycles() - frame_cycles;

	if (cycles % 76)
	{
		m_maincpu->adjust_icount(cycles % 76 - 76);
	}'};
MERGE (n:KG {id: 'handler:tia_video_device.RSYNC_w'}) SET n:Handler SET n += {method: 'RSYNC_w', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1317, sourceColumn: 1, sourceEndLine: 1320, sourceParameters: '', sourceBody: '/* this address is used in chip testing */'};
MERGE (n:KG {id: 'handler:tia_video_device.NUSIZ0_w'}) SET n:Handler SET n += {method: 'NUSIZ0_w', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1323, sourceColumn: 1, sourceEndLine: 1398, sourceConstants: ['PLAYER_GFX_SLOTS=4'], sourceParameters: 'uint8_t data', sourceBody: 'int curr_x = current_x();

	/* Check if relevant bits have changed */
	if ( ( data & 7 ) != ( NUSIZ0 & 7 ) ) {
		int i;
		/* Check if we are (about to start) drawing a copy of the player 0 graphics */
		for ( i = 0; i < PLAYER_GFX_SLOTS; i++ ) {
			if ( p0gfx.start_pixel[i] < 8 ) {
				int min_x = p0gfx.start_drawing[i];
				int size = ( 8 - p0gfx.start_pixel[i] ) * p0gfx.size[i];
				if ( curr_x >= ( min_x - 5 ) % 160 && curr_x < ( min_x + size ) % 160 ) {
					if ( curr_x >= min_x % 160 || p0gfx.start_pixel[i] != 0 ) {
						/* This copy has started drawing */
						if ( p0gfx.size[i] == 1 && nusiz[data & 7][1] > 1 ) {
							int delay = 1 + ( ( p0gfx.start_pixel[i] + ( curr_x - p0gfx.start_drawing[i] ) ) & 1 );
							update_bitmap( curr_x + delay, current_y() );
							p0gfx.start_pixel[i] += ( curr_x + delay - p0gfx.start_drawing[i] );
							if ( p0gfx.start_pixel[i] > 8 )
								p0gfx.start_pixel[i] = 8;
							p0gfx.start_drawing[i] = curr_x + delay;
						} else if ( p0gfx.size[1] > 1 && nusiz[data & 7][1] == 1 ) {
							int delay = ( curr_x - p0gfx.start_drawing[i] ) & ( p0gfx.size[i] - 1 );
							if ( delay ) {
								delay = p0gfx.size[i] - delay;
							}
							update_bitmap( curr_x + delay, current_y() );
							p0gfx.start_pixel[i] += ( curr_x - p0gfx.start_drawing[i] ) / p0gfx.size[i];
							p0gfx.start_drawing[i] = curr_x + delay;
						} else {
							p0gfx.start_pixel[i] += ( curr_x - p0gfx.start_drawing[i] ) / p0gfx.size[i];
							p0gfx.start_drawing[i] = curr_x;
						}
						p0gfx.size[i] = nusiz[data & 7][1];
					} else {
						/* This copy was just about to start drawing (meltdown) */
						/* Adjust for 1 clock delay between zoomed and non-zoomed sprites */
						if ( p0gfx.size[i] == 1 && nusiz[data & 7][1] > 1 ) {
							/* Check for hardware oddity */
							if ( p0gfx.start_drawing[i] - curr_x == 2 ) {
								p0gfx.start_drawing[i]--;
							} else {
								p0gfx.start_drawing[i]++;
							}
						} else if ( p0gfx.size[i] > 1 && nusiz[data & 7][1] == 1 ) {
							p0gfx.start_drawing[i]--;
						}
						p0gfx.size[i] = nusiz[data & 7][1];
					}
				} else {
					/* We are passed the copy or the copy still needs to be done. Mark
					   it as done/invalid, the data will be reset in the next loop. */
					p0gfx.start_pixel[i] = 8;
				}
			}
		}
		/* Apply NUSIZ updates to not yet drawn copies */
		for ( i = ( startP0 ? 0 : 1 ); i < nusiz[data & 7][0]; i++ ) {
			int j;
			/* Find an unused p0gfx entry */
			for ( j = 0; j < PLAYER_GFX_SLOTS; j++ ) {
				if ( p0gfx.start_pixel[j] == 8 )
					break;
			}
			p0gfx.size[j] = nusiz[data & 7][1];
			p0gfx.start_drawing[j] = ( horzP0 + (p0gfx.size[j] > 1 ? 1 : 0)
									+ i * 8 * ( nusiz[data & 7][2] + p0gfx.size[j] ) ) % 160;
			if ( curr_x < p0gfx.start_drawing[j] % 160 ) {
				p0gfx.start_pixel[j] = 0;
			}
		}
		NUSIZx_changed = 1;
	}
	NUSIZ0 = data;'};
MERGE (n:KG {id: 'handler:tia_video_device.NUSIZ1_w'}) SET n:Handler SET n += {method: 'NUSIZ1_w', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1401, sourceColumn: 1, sourceEndLine: 1476, sourceConstants: ['PLAYER_GFX_SLOTS=4'], sourceParameters: 'uint8_t data', sourceBody: 'int curr_x = current_x();

	/* Check if relevant bits have changed */
	if ( ( data & 7 ) != ( NUSIZ1 & 7 ) ) {
		int i;
		/* Check if we are (about to start) drawing a copy of the player 1 graphics */
		for ( i = 0; i < PLAYER_GFX_SLOTS; i++ ) {
			if ( p1gfx.start_pixel[i] < 8 ) {
				int min_x = p1gfx.start_drawing[i];
				int size = ( 8 - p1gfx.start_pixel[i] ) * p1gfx.size[i];
				if ( curr_x >= ( min_x - 5 ) % 160 && curr_x < ( min_x + size ) % 160 ) {
					if ( curr_x >= min_x % 160 || p1gfx.start_pixel[i] != 0 ) {
						/* This copy has started drawing */
						if ( p1gfx.size[i] == 1 && nusiz[data & 7][1] > 1 ) {
							int delay = 1 + ( ( p0gfx.start_pixel[i] + ( curr_x - p0gfx.start_drawing[i] ) ) & 1 );
							update_bitmap( curr_x + delay, current_y() );
							p1gfx.start_pixel[i] += ( curr_x + delay - p1gfx.start_drawing[i] );
							if ( p1gfx.start_pixel[i] > 8 )
								p1gfx.start_pixel[i] = 8;
							p1gfx.start_drawing[i] = curr_x + delay;
						} else if ( p1gfx.size[1] > 1 && nusiz[data & 7][1] == 1 ) {
							int delay = ( curr_x - p1gfx.start_drawing[i] ) & ( p1gfx.size[i] - 1 );
							if ( delay ) {
								delay = p1gfx.size[i] - delay;
							}
							update_bitmap( curr_x + delay, current_y() );
							p1gfx.start_pixel[i] += ( curr_x - p1gfx.start_drawing[i] ) / p1gfx.size[i];
							p1gfx.start_drawing[i] = curr_x + delay;
						} else {
							p1gfx.start_pixel[i] += ( curr_x - p1gfx.start_drawing[i] ) / p1gfx.size[i];
							p1gfx.start_drawing[i] = curr_x;
						}
						p1gfx.size[i] = nusiz[data & 7][1];
					} else {
						/* This copy was just about to start drawing (meltdown) */
						/* Adjust for 1 clock delay between zoomed and non-zoomed sprites */
						if ( p1gfx.size[i] == 1 && nusiz[data & 7][1] > 1 ) {
							/* Check for hardware oddity */
							if ( p1gfx.start_drawing[i] - curr_x == 2 ) {
								p1gfx.start_drawing[i]--;
							} else {
								p1gfx.start_drawing[i]++;
							}
						} else if ( p1gfx.size[i] > 1 && nusiz[data & 7][1] == 1 ) {
							p1gfx.start_drawing[i]--;
						}
						p1gfx.size[i] = nusiz[data & 7][1];
					}
				} else {
					/* We are passed the copy or the copy still needs to be done. Mark
					   it as done/invalid, the data will be reset in the next loop. */
					p1gfx.start_pixel[i] = 8;
				}
			}
		}
		/* Apply NUSIZ updates to not yet drawn copies */
		for ( i = ( startP1 ? 0 : 1 ); i < nusiz[data & 7][0]; i++ ) {
			int j;
			/* Find an unused p1gfx entry */
			for ( j = 0; j < PLAYER_GFX_SLOTS; j++ ) {
				if ( p1gfx.start_pixel[j] == 8 )
					break;
			}
			p1gfx.size[j] = nusiz[data & 7][1];
			p1gfx.start_drawing[j] = ( horzP1 + (p1gfx.size[j] > 1 ? 1 : 0)
									+ i * 8 * ( nusiz[data & 7][2] + p1gfx.size[j] ) ) % 160;
			if ( curr_x < p1gfx.start_drawing[j] % 160 ) {
				p1gfx.start_pixel[j] = 0;
			}
		}
		NUSIZx_changed = 1;
	}
	NUSIZ1 = data;'};
MERGE (n:KG {id: 'handler:tia_video_device.CTRLPF_w'}) SET n:Handler SET n += {method: 'CTRLPF_w', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1025, sourceColumn: 1, sourceEndLine: 1033, sourceParameters: 'uint8_t data', sourceBody: 'int curr_x = current_x();

	CTRLPF = data;
	if ( curr_x < 80 ) {
		REFLECT = CTRLPF & 1;
	}'};
MERGE (n:KG {id: 'handler:tia_video_device.RESP0_w'}) SET n:Handler SET n += {method: 'RESP0_w', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1524, sourceColumn: 1, sourceEndLine: 1581, sourceConstants: ['HMOVE_INACTIVE=-200', 'PLAYER_GFX_SLOTS=4'], sourceParameters: '', sourceBody: 'int curr_x = current_x();
	int new_horzP0;

	/* Check if HMOVE is activated during this line */
	if ( HMOVE_started != HMOVE_INACTIVE ) {
		new_horzP0 = ( curr_x < 7 ) ? 3 : ( curr_x + 5 );
		/* If HMOVE is active, adjust for remaining horizontal move clocks if any */
		RESXX_APPLY_ACTIVE_HMOVE( new_horzP0, HMP0, motclkP0 );
	} else {
		new_horzP0 = ( curr_x < -2 ) ? 3 : ( curr_x + 5 );
		RESXX_APPLY_PREVIOUS_HMOVE( new_horzP0, HMP0 );
	}

	if ( new_horzP0 != horzP0 ) {
		int i;
		horzP0 = new_horzP0;
		startP0 = 0;
		skipclipP0 = 2;
		/* Check if we are (about to start) drawing a copy of the player 0 graphics */
		for ( i = 0; i < PLAYER_GFX_SLOTS; i++ ) {
			if ( p0gfx.start_pixel[i] < 8 ) {
				int min_x = p0gfx.start_drawing[i];
				int size = ( 8 - p0gfx.start_pixel[i] ) * p0gfx.size[i];
				if ( curr_x >= ( min_x - 5 ) % 160 && curr_x < ( min_x + size ) % 160 ) {
					if ( curr_x >= min_x ) {
						/* This copy has started drawing */
						p0gfx.start_pixel[i] += ( curr_x - p0gfx.start_drawing[i] ) / p0gfx.size[i];
						p0gfx.start_drawing[i] = curr_x;
					} else {
						/* This copy is waiting to start drawing */
						p0gfx.start_drawing[i] = horzP0;
					}
				} else {
					/* We are passed the copy or the copy still needs to be done. Mark
					   it as done/invalid, the data will be reset in the next loop. */
					p0gfx.start_pixel[i] = 8;
				}
			}
		}
		/* Apply NUSIZ and position updates to not yet drawn copies */
		for ( i = 1; i < nusiz[NUSIZ0 & 7][0]; i++ ) {
			int j;
			/* Find an unused p0gfx entry */
			for ( j = 0; j < PLAYER_GFX_SLOTS; j++ ) {
				if ( p0gfx.start_pixel[j] == 8 )
					break;
			}
			p0gfx.size[j] = nusiz[NUSIZ0 & 7][1];
			p0gfx.start_drawing[j] = ( horzP0 + (p0gfx.size[j] > 1 ? 1 : 0)
									+ i * 8 * ( nusiz[NUSIZ0 & 7][2] + p0gfx.size[j] ) ) % 160;
			if ( curr_x < p0gfx.start_drawing[j] % 160 ) {
				p0gfx.start_pixel[j] = 0;
			}
		}
	}'};
MERGE (n:KG {id: 'handler:tia_video_device.RESP1_w'}) SET n:Handler SET n += {method: 'RESP1_w', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1584, sourceColumn: 1, sourceEndLine: 1641, sourceConstants: ['HMOVE_INACTIVE=-200', 'PLAYER_GFX_SLOTS=4'], sourceParameters: '', sourceBody: 'int curr_x = current_x();
	int new_horzP1;

	/* Check if HMOVE is activated during this line */
	if ( HMOVE_started != HMOVE_INACTIVE ) {
		new_horzP1 = ( curr_x < 7 ) ? 3 : ( curr_x + 5 );
		/* If HMOVE is active, adjust for remaining horizontal move clocks if any */
		RESXX_APPLY_ACTIVE_HMOVE( new_horzP1, HMP1, motclkP1 );
	} else {
		new_horzP1 = ( curr_x < -2 ) ? 3 : ( curr_x + 5 );
		RESXX_APPLY_PREVIOUS_HMOVE( new_horzP1, HMP1 );
	}

	if ( new_horzP1 != horzP1 ) {
		int i;
		horzP1 = new_horzP1;
		startP1 = 0;
		skipclipP1 = 2;
		/* Check if we are (about to start) drawing a copy of the player 1 graphics */
		for ( i = 0; i < PLAYER_GFX_SLOTS; i++ ) {
			if ( p1gfx.start_pixel[i] < 8 ) {
				int min_x = p1gfx.start_drawing[i];
				int size = ( 8 - p1gfx.start_pixel[i] ) * p1gfx.size[i];
				if ( curr_x >= ( min_x - 5 ) % 160 && curr_x < ( min_x + size ) % 160 ) {
					if ( curr_x >= min_x ) {
						/* This copy has started drawing */
						p1gfx.start_pixel[i] += ( curr_x - p1gfx.start_drawing[i] ) / p1gfx.size[i];
						p1gfx.start_drawing[i] = curr_x;
					} else {
						/* This copy is waiting to start drawing */
						p1gfx.start_drawing[i] = horzP1;
					}
				} else {
					/* We are passed the copy or the copy still needs to be done. Mark
					   it as done/invalid, the data will be reset in the next loop. */
					p1gfx.start_pixel[i] = 8;
				}
			}
		}
		/* Apply NUSIZ and position updates to not yet drawn copies */
		for ( i = 1; i < nusiz[NUSIZ1 & 7][0]; i++ ) {
			int j;
			/* Find an unused p1gfx entry */
			for ( j = 0; j < PLAYER_GFX_SLOTS; j++ ) {
				if ( p1gfx.start_pixel[j] == 8 )
					break;
			}
			p1gfx.size[j] = nusiz[NUSIZ1 & 7][1];
			p1gfx.start_drawing[j] = ( horzP1 + (p1gfx.size[j] > 1 ? 1 : 0)
									+ i * 8 * ( nusiz[NUSIZ1 & 7][2] + p1gfx.size[j] ) ) % 160;
			if ( curr_x < p1gfx.start_drawing[j] % 160 ) {
				p1gfx.start_pixel[j] = 0;
			}
		}
	}'};
MERGE (n:KG {id: 'handler:tia_video_device.RESM0_w'}) SET n:Handler SET n += {method: 'RESM0_w', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1644, sourceColumn: 1, sourceEndLine: 1663, sourceConstants: ['HMOVE_INACTIVE=-200'], sourceParameters: '', sourceBody: 'int curr_x = current_x();
	int new_horzM0;

	/* Check if HMOVE is activated during this line */
	if ( HMOVE_started != HMOVE_INACTIVE ) {
		new_horzM0 = ( curr_x < 7 ) ? 2 : ( ( curr_x + 4 ) % 160 );
		/* If HMOVE is active, adjust for remaining horizontal move clocks if any */
		RESXX_APPLY_ACTIVE_HMOVE( new_horzM0, HMM0, motclkM0 );
	} else {
		new_horzM0 = ( curr_x < -1 ) ? 2 : ( ( curr_x + 4 ) % 160 );
		skipM0delay = ( curr_x < -1 && horzM0 % 160 >= 0 && horzM0 % 160 < 1 ) ? 4 : 0;
		RESXX_APPLY_PREVIOUS_HMOVE( new_horzM0, HMM0 );
	}
	if ( new_horzM0 != horzM0 ) {
		startM0 = skipM0delay ? 1 : 0;
		horzM0 = new_horzM0;
	}'};
MERGE (n:KG {id: 'handler:tia_video_device.RESM1_w'}) SET n:Handler SET n += {method: 'RESM1_w', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1666, sourceColumn: 1, sourceEndLine: 1685, sourceConstants: ['HMOVE_INACTIVE=-200'], sourceParameters: '', sourceBody: 'int curr_x = current_x();
	int new_horzM1;

	/* Check if HMOVE is activated during this line */
	if ( HMOVE_started != HMOVE_INACTIVE ) {
		new_horzM1 = ( curr_x < 7 ) ? 2 : ( ( curr_x + 4 ) % 160 );
		/* If HMOVE is active, adjust for remaining horizontal move clocks if any */
		RESXX_APPLY_ACTIVE_HMOVE( new_horzM1, HMM1, motclkM1 );
	} else {
		new_horzM1 = ( curr_x < -1 ) ? 2 : ( ( curr_x + 4 ) % 160 );
		skipM1delay = ( curr_x < -1 && horzM1 % 160 >= 0 && horzM1 % 160 < 1 ) ? 4 : 0;
		RESXX_APPLY_PREVIOUS_HMOVE( new_horzM1, HMM1 );
	}
	if ( new_horzM1 != horzM1 ){
		startM1 = skipM1delay ? 1 : 0;
		horzM1 = new_horzM1;
	}'};
MERGE (n:KG {id: 'handler:tia_video_device.RESBL_w'}) SET n:Handler SET n += {method: 'RESBL_w', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1688, sourceColumn: 1, sourceEndLine: 1701, sourceConstants: ['HMOVE_INACTIVE=-200'], sourceParameters: '', sourceBody: 'int curr_x = current_x();

	/* Check if HMOVE is activated during this line */
	if ( HMOVE_started != HMOVE_INACTIVE ) {
		horzBL = ( curr_x < 7 ) ? 2 : ( ( curr_x + 4 ) % 160 );
		/* If HMOVE is active, adjust for remaining horizontal move clocks if any */
		RESXX_APPLY_ACTIVE_HMOVE( horzBL, HMBL, motclkBL );
	} else {
		horzBL = ( curr_x < 0 ) ? 2 : ( ( curr_x + 4 ) % 160 );
		RESXX_APPLY_PREVIOUS_HMOVE( horzBL, HMBL );
	}'};
MERGE (n:KG {id: 'handler:tia_video_device.GRP0_w'}) SET n:Handler SET n += {method: 'GRP0_w', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1748, sourceColumn: 1, sourceEndLine: 1753, sourceParameters: 'uint8_t data', sourceBody: 'prevGRP1 = GRP1;

	GRP0 = data;'};
MERGE (n:KG {id: 'handler:tia_video_device.GRP1_w'}) SET n:Handler SET n += {method: 'GRP1_w', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1756, sourceColumn: 1, sourceEndLine: 1763, sourceParameters: 'uint8_t data', sourceBody: 'prevGRP0 = GRP0;

	GRP1 = data;

	prevENABL = ENABL;'};
MERGE (n:KG {id: 'handler:tia_video_device.HMP0_w'}) SET n:Handler SET n += {method: 'HMP0_w', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1035, sourceColumn: 1, sourceEndLine: 1065, sourceConstants: ['HMOVE_INACTIVE=-200'], sourceParameters: 'uint8_t data', sourceBody: 'int curr_x = current_x();

	data &= 0xF0;

	if ( data == HMP0 )
		return;

	/* Check if HMOVE cycles are still being applied */
	if ( HMOVE_started != HMOVE_INACTIVE && curr_x < std::min( HMOVE_started + 6 + motclkP0 * 4, 7 ) ) {
		int new_motclkP0 = ( data ^ 0x80 ) >> 4;

		/* Check if new horizontal move can still be applied normally */
		if ( new_motclkP0 > motclkP0 || curr_x <= std::min( HMOVE_started + 6 + new_motclkP0 * 4, 7 ) ) {
			horzP0 -= ( new_motclkP0 - motclkP0 );
			motclkP0 = new_motclkP0;
		} else {
			horzP0 -= ( 15 - motclkP0 );
			motclkP0 = 15;
			if ( data != 0x70 && data != 0x80 ) {
				HMP0_latch = 1;
			}
		}
		if ( horzP0 < 0 )
			horzP0 += 160;
		horzP0 %= 160;
		setup_pXgfx();
	}
	HMP0 = data;'};
MERGE (n:KG {id: 'handler:tia_video_device.HMP1_w'}) SET n:Handler SET n += {method: 'HMP1_w', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1067, sourceColumn: 1, sourceEndLine: 1097, sourceConstants: ['HMOVE_INACTIVE=-200'], sourceParameters: 'uint8_t data', sourceBody: 'int curr_x = current_x();

	data &= 0xF0;

	if ( data == HMP1 )
		return;

	/* Check if HMOVE cycles are still being applied */
	if ( HMOVE_started != HMOVE_INACTIVE && curr_x < std::min( HMOVE_started + 6 + motclkP1 * 4, 7 ) ) {
		int new_motclkP1 = ( data ^ 0x80 ) >> 4;

		/* Check if new horizontal move can still be applied normally */
		if ( new_motclkP1 > motclkP1 || curr_x <= std::min( HMOVE_started + 6 + new_motclkP1 * 4, 7 ) ) {
			horzP1 -= ( new_motclkP1 - motclkP1 );
			motclkP1 = new_motclkP1;
		} else {
			horzP1 -= ( 15 - motclkP1 );
			motclkP1 = 15;
			if ( data != 0x70 && data != 0x80 ) {
				HMP1_latch = 1;
			}
		}
		if ( horzP1 < 0 )
			horzP1 += 160;
		horzP1 %= 160;
		setup_pXgfx();
	}
	HMP1 = data;'};
MERGE (n:KG {id: 'handler:tia_video_device.HMM0_w'}) SET n:Handler SET n += {method: 'HMM0_w', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1099, sourceColumn: 1, sourceEndLine: 1128, sourceConstants: ['HMOVE_INACTIVE=-200'], sourceParameters: 'uint8_t data', sourceBody: 'int curr_x = current_x();

	data &= 0xF0;

	if ( data == HMM0 )
		return;

	/* Check if HMOVE cycles are still being applied */
	if ( HMOVE_started != HMOVE_INACTIVE && curr_x < std::min( HMOVE_started + 6 + motclkM0 * 4, 7 ) ) {
		int new_motclkM0 = ( data ^ 0x80 ) >> 4;

		/* Check if new horizontal move can still be applied normally */
		if ( new_motclkM0 > motclkM0 || curr_x <= std::min( HMOVE_started + 6 + new_motclkM0 * 4, 7 ) ) {
			horzM0 -= ( new_motclkM0 - motclkM0 );
			motclkM0 = new_motclkM0;
		} else {
			horzM0 -= ( 15 - motclkM0 );
			motclkM0 = 15;
			if ( data != 0x70 && data != 0x80 ) {
				HMM0_latch = 1;
			}
		}
		if ( horzM0 < 0 )
			horzM0 += 160;
		horzM0 %= 160;
	}
	HMM0 = data;'};
MERGE (n:KG {id: 'handler:tia_video_device.HMM1_w'}) SET n:Handler SET n += {method: 'HMM1_w', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1130, sourceColumn: 1, sourceEndLine: 1159, sourceConstants: ['HMOVE_INACTIVE=-200'], sourceParameters: 'uint8_t data', sourceBody: 'int curr_x = current_x();

	data &= 0xF0;

	if ( data == HMM1 )
		return;

	/* Check if HMOVE cycles are still being applied */
	if ( HMOVE_started != HMOVE_INACTIVE && curr_x < std::min( HMOVE_started + 6 + motclkM1 * 4, 7 ) ) {
		int new_motclkM1 = ( data ^ 0x80 ) >> 4;

		/* Check if new horizontal move can still be applied normally */
		if ( new_motclkM1 > motclkM1 || curr_x <= std::min( HMOVE_started + 6 + new_motclkM1 * 4, 7 ) ) {
			horzM1 -= ( new_motclkM1 - motclkM1 );
			motclkM1 = new_motclkM1;
		} else {
			horzM1 -= ( 15 - motclkM1 );
			motclkM1 = 15;
			if ( data != 0x70 && data != 0x80 ) {
				HMM1_latch = 1;
			}
		}
		if ( horzM1 < 0 )
			horzM1 += 160;
		horzM1 %= 160;
	}
	HMM1 = data;'};
MERGE (n:KG {id: 'handler:tia_video_device.HMBL_w'}) SET n:Handler SET n += {method: 'HMBL_w', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1161, sourceColumn: 1, sourceEndLine: 1190, sourceConstants: ['HMOVE_INACTIVE=-200'], sourceParameters: 'uint8_t data', sourceBody: 'int curr_x = current_x();

	data &= 0xF0;

	if ( data == HMBL )
		return;

	/* Check if HMOVE cycles are still being applied */
	if ( HMOVE_started != HMOVE_INACTIVE && curr_x < std::min( HMOVE_started + 6 + motclkBL * 4, 7 ) ) {
		int new_motclkBL = ( data ^ 0x80 ) >> 4;

		/* Check if new horizontal move can still be applied normally */
		if ( new_motclkBL > motclkBL || curr_x <= std::min( HMOVE_started + 6 + new_motclkBL * 4, 7 ) ) {
			horzBL -= ( new_motclkBL - motclkBL );
			motclkBL = new_motclkBL;
		} else {
			horzBL -= ( 15 - motclkBL );
			motclkBL = 15;
			if ( data != 0x70 && data != 0x80 ) {
				HMBL_latch = 1;
			}
		}
		if ( horzBL < 0 )
			horzBL += 160;
		horzBL %= 160;
	}
	HMBL = data;'};
MERGE (n:KG {id: 'handler:tia_video_device.RESMP0_w'}) SET n:Handler SET n += {method: 'RESMP0_w', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1704, sourceColumn: 1, sourceEndLine: 1723, sourceConstants: ['HMOVE_INACTIVE=-200'], sourceParameters: 'uint8_t data', sourceBody: 'if (RESMP0 & 2)
	{
		if ( nusiz[NUSIZ0 & 7][1] > 1 ) {
			horzM0 = horzP0 + 3 * nusiz[NUSIZ0 & 7][1] - 1;
		} else {
			horzM0 = horzP0 + 4 * nusiz[NUSIZ0 & 7][1];
		}
		if ( HMOVE_started != HMOVE_INACTIVE ) {
			horzM0 -= ( 8 - motclkP0 );
			horzM0 += 8 - motclkM0;
			if ( horzM0 < 0 )
				horzM0 += 160;
		}
		horzM0 %= 160;
	}

	RESMP0 = data;'};
MERGE (n:KG {id: 'handler:tia_video_device.RESMP1_w'}) SET n:Handler SET n += {method: 'RESMP1_w', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1726, sourceColumn: 1, sourceEndLine: 1745, sourceConstants: ['HMOVE_INACTIVE=-200'], sourceParameters: 'uint8_t data', sourceBody: 'if (RESMP1 & 2)
	{
		if ( nusiz[NUSIZ1 & 7][1] > 1 ) {
			horzM1 = horzP1 + 3 * nusiz[NUSIZ1 & 7][1] - 1;
		} else {
			horzM1 = horzP1 + 4 * nusiz[NUSIZ1 & 7][1];
		}
		if ( HMOVE_started != HMOVE_INACTIVE ) {
			horzM1 -= ( 8 - motclkP1 );
			horzM1 += 8 - motclkM1;
			if ( horzM1 < 0 )
				horzM1 += 160;
		}
		horzM1 %= 160;
	}

	RESMP1 = data;'};
MERGE (n:KG {id: 'handler:tia_video_device.HMOVE_w'}) SET n:Handler SET n += {method: 'HMOVE_w', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1192, sourceColumn: 1, sourceEndLine: 1314, sourceConstants: ['HMOVE_INACTIVE=-200'], sourceParameters: 'uint8_t data', sourceBody: 'int curr_x = current_x();
	int curr_y = current_y();

	HMOVE_started = curr_x;

	/* Check if we have to undo some of the already applied cycles from an active graphics latch */
	if ( curr_x + 68 < 17 * 4 ) {
		int cycle_fix = 17 - ( ( curr_x + 68 + 7 ) / 4 );
		if ( HMP0_latch )
			horzP0 = ( horzP0 + cycle_fix ) % 160;
		if ( HMP1_latch )
			horzP1 = ( horzP1 + cycle_fix ) % 160;
		if ( HMM0_latch )
			horzM0 = ( horzM0 + cycle_fix ) % 160;
		if ( HMM1_latch )
			horzM1 = ( horzM1 + cycle_fix ) % 160;
		if ( HMBL_latch )
			horzBL = ( horzBL + cycle_fix ) % 160;
	}

	HMP0_latch = 0;
	HMP1_latch = 0;
	HMM0_latch = 0;
	HMM1_latch = 0;
	HMBL_latch = 0;

	/* Check if HMOVE activities can be ignored */
	if ( curr_x >= -5 && curr_x < 97 ) {
		motclkP0 = 0;
		motclkP1 = 0;
		motclkM0 = 0;
		motclkM1 = 0;
		motclkBL = 0;
		HMOVE_started = HMOVE_INACTIVE;
		return;
	}

	motclkP0 = ( HMP0 ^ 0x80 ) >> 4;
	motclkP1 = ( HMP1 ^ 0x80 ) >> 4;
	motclkM0 = ( HMM0 ^ 0x80 ) >> 4;
	motclkM1 = ( HMM1 ^ 0x80 ) >> 4;
	motclkBL = ( HMBL ^ 0x80 ) >> 4;

	/* Adjust number of graphics motion clocks for active display */
	if ( curr_x >= 97 && curr_x < 151 ) {
		int skip_motclks = ( 160 - HMOVE_started - 6 ) / 4;
		motclkP0 -= skip_motclks;
		motclkP1 -= skip_motclks;
		motclkM0 -= skip_motclks;
		motclkM1 -= skip_motclks;
		motclkBL -= skip_motclks;
		if ( motclkP0 < 0 )
			motclkP0 = 0;
		if ( motclkP1 < 0 )
			motclkP1 = 0;
		if ( motclkM0 < 0 )
			motclkM0 = 0;
		if ( motclkM1 < 0 )
			motclkM1 = 0;
		if ( motclkBL < 0 )
			motclkBL = 0;
	}

	if ( curr_x >= -56 && curr_x < -5 ) {
		int max_motclks = ( 7 - ( HMOVE_started + 5 ) ) / 4;
		if ( motclkP0 > max_motclks )
			motclkP0 = max_motclks;
		if ( motclkP1 > max_motclks )
			motclkP1 = max_motclks;
		if ( motclkM0 > max_motclks )
			motclkM0 = max_motclks;
		if ( motclkM1 > max_motclks )
			motclkM1 = max_motclks;
		if ( motclkBL > max_motclks )
			motclkBL = max_motclks;
	}

	/* Apply horizontal motion */
	if ( curr_x < -5 || curr_x >= 157 ) {
		horzP0 += 8 - motclkP0;
		horzP1 += 8 - motclkP1;
		horzM0 += 8 - motclkM0;
		horzM1 += 8 - motclkM1;
		horzBL += 8 - motclkBL;

		if (horzP0 < 0)
			horzP0 += 160;
		if (horzP1 < 0)
			horzP1 += 160;
		if (horzM0 < 0)
			horzM0 += 160;
		if (horzM1 < 0)
			horzM1 += 160;
		if (horzBL < 0)
			horzBL += 160;

		horzP0 %= 160;
		horzP1 %= 160;
		horzM0 %= 160;
		horzM1 %= 160;
		horzBL %= 160;

		/* When HMOVE is triggered on CPU cycle 75, the HBlank period on the
		   next line is also extended. */
		if (curr_x >= 157)
		{
			curr_y += 1;
			update_bitmap( -8, curr_y );
		}
		else
		{
			setup_pXgfx();
		}
		if (curr_y < screen_height)
		{
			memset(&helper[current_bitmap].pix(curr_y, 34), 0, 16);
		}

		prev_x = 8;
	}'};
MERGE (n:KG {id: 'handler:tia_video_device.HMCLR_w'}) SET n:Handler SET n += {method: 'HMCLR_w', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1479, sourceColumn: 1, sourceEndLine: 1486, sourceParameters: 'uint8_t data', sourceBody: 'HMP0_w( 0 );
	HMP1_w( 0 );
	HMM0_w( 0 );
	HMM1_w( 0 );
	HMBL_w( 0 );'};
MERGE (n:KG {id: 'handler:tia_video_device.CXCLR_w'}) SET n:Handler SET n += {method: 'CXCLR_w', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 1489, sourceColumn: 1, sourceEndLine: 1499, sourceParameters: '', sourceBody: 'CXM0P = 0;
	CXM1P = 0;
	CXP0FB = 0;
	CXP1FB = 0;
	CXM0FB = 0;
	CXM1FB = 0;
	CXBLPF = 0;
	CXPPMM = 0;'};
MERGE (n:KG {id: 'map:a2600_base_state.a2600_mem/range1'}) SET n:AddressRange SET n += {start: 128, end: 255, raw: 'map(0x0080, 0x00ff).mirror(0x0d00).ram().share("riot_ram")', sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 267, sourceColumn: 2, sourceEndLine: 267, mirror: 3328, ram: true, share: 'riot_ram'};
MERGE (n:KG {id: 'map:a2600_base_state.a2600_mem/range2'}) SET n:AddressRange SET n += {start: 640, end: 640, raw: 'map(0x0280, 0x029f).mirror(0x0d00).m("riot", FUNC(mos6532_device::io_map)) -> map(0x00, 0x00).mirror(0x18).rw(FUNC(mos6532_device::pa_data_r), FUNC(mos6532_device::pa_data_w))', mirror: 3352};
MERGE (n:KG {id: 'handler:mos6532_device.pa_data_r'}) SET n:Handler SET n += {method: 'pa_data_r', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'handler:mos6532_device.pa_data_w'}) SET n:Handler SET n += {method: 'pa_data_w', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'map:a2600_base_state.a2600_mem/range3'}) SET n:AddressRange SET n += {start: 641, end: 641, raw: 'map(0x0280, 0x029f).mirror(0x0d00).m("riot", FUNC(mos6532_device::io_map)) -> map(0x01, 0x01).mirror(0x18).rw(FUNC(mos6532_device::pa_ddr_r), FUNC(mos6532_device::pa_ddr_w))', mirror: 3352};
MERGE (n:KG {id: 'handler:mos6532_device.pa_ddr_r'}) SET n:Handler SET n += {method: 'pa_ddr_r', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'handler:mos6532_device.pa_ddr_w'}) SET n:Handler SET n += {method: 'pa_ddr_w', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'map:a2600_base_state.a2600_mem/range4'}) SET n:AddressRange SET n += {start: 642, end: 642, raw: 'map(0x0280, 0x029f).mirror(0x0d00).m("riot", FUNC(mos6532_device::io_map)) -> map(0x02, 0x02).mirror(0x18).rw(FUNC(mos6532_device::pb_data_r), FUNC(mos6532_device::pb_data_w))', mirror: 3352};
MERGE (n:KG {id: 'handler:mos6532_device.pb_data_r'}) SET n:Handler SET n += {method: 'pb_data_r', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'handler:mos6532_device.pb_data_w'}) SET n:Handler SET n += {method: 'pb_data_w', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'map:a2600_base_state.a2600_mem/range5'}) SET n:AddressRange SET n += {start: 643, end: 643, raw: 'map(0x0280, 0x029f).mirror(0x0d00).m("riot", FUNC(mos6532_device::io_map)) -> map(0x03, 0x03).mirror(0x18).rw(FUNC(mos6532_device::pb_ddr_r), FUNC(mos6532_device::pb_ddr_w))', mirror: 3352};
MERGE (n:KG {id: 'handler:mos6532_device.pb_ddr_r'}) SET n:Handler SET n += {method: 'pb_ddr_r', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'handler:mos6532_device.pb_ddr_w'}) SET n:Handler SET n += {method: 'pb_ddr_w', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'map:a2600_base_state.a2600_mem/range6'}) SET n:AddressRange SET n += {start: 660, end: 663, raw: 'map(0x0280, 0x029f).mirror(0x0d00).m("riot", FUNC(mos6532_device::io_map)) -> map(0x14, 0x17).w(FUNC(mos6532_device::timer_off_w))', mirror: 3328};
MERGE (n:KG {id: 'handler:mos6532_device.timer_off_w'}) SET n:Handler SET n += {method: 'timer_off_w', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'map:a2600_base_state.a2600_mem/range7'}) SET n:AddressRange SET n += {start: 668, end: 671, raw: 'map(0x0280, 0x029f).mirror(0x0d00).m("riot", FUNC(mos6532_device::io_map)) -> map(0x1c, 0x1f).w(FUNC(mos6532_device::timer_on_w))', mirror: 3328};
MERGE (n:KG {id: 'handler:mos6532_device.timer_on_w'}) SET n:Handler SET n += {method: 'timer_on_w', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'map:a2600_base_state.a2600_mem/range8'}) SET n:AddressRange SET n += {start: 644, end: 644, raw: 'map(0x0280, 0x029f).mirror(0x0d00).m("riot", FUNC(mos6532_device::io_map)) -> map(0x04, 0x04).mirror(0x12).r(FUNC(mos6532_device::timer_off_r))', mirror: 3346};
MERGE (n:KG {id: 'handler:mos6532_device.timer_off_r'}) SET n:Handler SET n += {method: 'timer_off_r', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'map:a2600_base_state.a2600_mem/range9'}) SET n:AddressRange SET n += {start: 652, end: 652, raw: 'map(0x0280, 0x029f).mirror(0x0d00).m("riot", FUNC(mos6532_device::io_map)) -> map(0x0c, 0x0c).mirror(0x12).r(FUNC(mos6532_device::timer_on_r))', mirror: 3346};
MERGE (n:KG {id: 'handler:mos6532_device.timer_on_r'}) SET n:Handler SET n += {method: 'timer_on_r', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'map:a2600_base_state.a2600_mem/range10'}) SET n:AddressRange SET n += {start: 645, end: 645, raw: 'map(0x0280, 0x029f).mirror(0x0d00).m("riot", FUNC(mos6532_device::io_map)) -> map(0x05, 0x05).mirror(0x1a).r(FUNC(mos6532_device::irq_r))', mirror: 3354};
MERGE (n:KG {id: 'handler:mos6532_device.irq_r'}) SET n:Handler SET n += {method: 'irq_r', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'map:a2600_base_state.a2600_mem/range11'}) SET n:AddressRange SET n += {start: 644, end: 647, raw: 'map(0x0280, 0x029f).mirror(0x0d00).m("riot", FUNC(mos6532_device::io_map)) -> map(0x04, 0x07).mirror(0x8).w(FUNC(mos6532_device::edge_w))', mirror: 3336};
MERGE (n:KG {id: 'handler:mos6532_device.edge_w'}) SET n:Handler SET n += {method: 'edge_w', ownerClass: 'mos6532_device'};
MERGE (n:KG {id: 'machine:a2600_cons_state.a2600_cartslot'}) SET n:MachineConfig SET n += {cls: 'a2600_cons_state', name: 'a2600_cartslot', calls: [], stateMembers: ['{"name":"m_current_screen_height","bits":16}'], sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 593, sourceColumn: 1, sourceEndLine: 601};
MERGE (n:KG {id: 'softlist:a2600_cons_state.a2600_cartslot/a2600'}) SET n:SoftwareList SET n += {name: 'a2600', tag: 'cart_list', status: 'original'};
MERGE (n:KG {id: 'softlist:a2600_cons_state.a2600_cartslot/a2600_cass'}) SET n:SoftwareList SET n += {name: 'a2600_cass', tag: 'cass_list', status: 'original'};
MERGE (n:KG {id: 'device:a2600_cons_state.a2600_cartslot/cartslot'}) SET n:Device SET n += {type: 'VCS_CART_SLOT', tag: 'cartslot', clock: null, config: ['VCS_CART_SLOT(config, m_cartslot, a2600_cart, nullptr).set_must_be_loaded(true)', 'm_cartslot->set_address_space(m_maincpu, AS_PROGRAM)'], sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 595, sourceColumn: 2, sourceEndLine: 595, clockExpr: 'a2600_cart'};
MERGE (n:KG {id: 'machine:a2600_base_state.a2600_base_ntsc'}) SET n:MachineConfig SET n += {cls: 'a2600_base_state', name: 'a2600_base_ntsc', calls: [], stateMembers: ['{"name":"m_current_screen_height","bits":16}'], sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 603, sourceColumn: 1, sourceEndLine: 633};
MERGE (n:KG {id: 'device:a2600_base_state.a2600_base_ntsc/^maincpu'}) SET n:Device SET n += {type: 'M6507', tag: '^maincpu', clock: null, config: ['M6507(config, m_maincpu, m_xtal / 3)', 'm_maincpu->set_addrmap(AS_PROGRAM, &a2600_base_state::a2600_mem)'], sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 606, sourceColumn: 2, sourceEndLine: 606, clockExpr: 'm_xtal / 3'};
MERGE (n:KG {id: 'device:a2600_base_state.a2600_base_ntsc/tia_video'}) SET n:Device SET n += {type: 'TIA_NTSC_VIDEO', tag: 'tia_video', clock: null, config: ['TIA_NTSC_VIDEO(config, m_tia, "tia")', 'm_tia->read_input_port_callback().set(FUNC(a2600_state::a2600_read_input_port))', 'm_tia->databus_contents_callback().set(FUNC(a2600_state::a2600_get_databus_contents))', 'm_tia->vsync_callback().set(FUNC(a2600_state::a2600_tia_vsync_callback))'], cls: 'tia_ntsc_video_device', clsHierarchy: ['tia_ntsc_video_device', 'tia_video_device'], sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 610, sourceColumn: 2, sourceEndLine: 610, clockExpr: '"tia"'};
MERGE (n:KG {id: 'device:a2600_base_state.a2600_base_ntsc/tia_video/callback:tia_video:0'}) SET n:Callback SET n += {signal: 'read_input_port_callback', operation: 'set', raw: 'm_tia->read_input_port_callback().set(FUNC(a2600_state::a2600_read_input_port))', ownerTag: 'tia_video', sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 611, sourceColumn: 2, sourceEndLine: 611, targetClass: 'a2600_state', targetMethod: 'a2600_read_input_port'};
MERGE (n:KG {id: 'handler:a2600_state.a2600_read_input_port'}) SET n:Handler SET n += {method: 'a2600_read_input_port', ownerClass: 'a2600_state', sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 386, sourceColumn: 1, sourceEndLine: 409, sourceParameters: 'offs_t offset', sourceBody: 'switch (offset)
	{
	case 0: // Left controller port PIN 5
		return m_joy1->read_pot_x();

	case 1: // Left controller port PIN 9
		return m_joy1->read_pot_y();

	case 2: // Right controller port PIN 5
		return m_joy2->read_pot_x();

	case 3: // Right controller port PIN 9
		return m_joy2->read_pot_y();

	case 4: // Left controller port PIN 6
		return (m_joy1->read_joy() & 0x20) ? 0xff : 0x7f;

	case 5: // Right controller port PIN 6
		return (m_joy2->read_joy() & 0x20) ? 0xff : 0x7f;
	}
	return 0xff;'};
MERGE (n:KG {id: 'device:a2600_base_state.a2600_base_ntsc/tia_video/callback:tia_video:1'}) SET n:Callback SET n += {signal: 'databus_contents_callback', operation: 'set', raw: 'm_tia->databus_contents_callback().set(FUNC(a2600_state::a2600_get_databus_contents))', ownerTag: 'tia_video', sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 612, sourceColumn: 2, sourceEndLine: 612, targetClass: 'a2600_state', targetMethod: 'a2600_get_databus_contents'};
MERGE (n:KG {id: 'handler:a2600_state.a2600_get_databus_contents'}) SET n:Handler SET n += {method: 'a2600_get_databus_contents', ownerClass: 'a2600_state', sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 420, sourceColumn: 1, sourceEndLine: 447, sourceParameters: 'offs_t offset', sourceBody: 'uint16_t  last_address, prev_address;
	uint8_t   last_byte, prev_byte;
	address_space& prog_space = m_maincpu->space(AS_PROGRAM);

	last_address = m_maincpu->pc() + 1;
	if ( ! ( last_address & 0x1080 ) )
	{
		return offset;
	}
	last_byte = prog_space.read_byte(last_address );
	if ( last_byte < 0x80 || last_byte == 0xFF )
	{
		return last_byte;
	}
	prev_address = last_address - 1;
	if ( ! ( prev_address & 0x1080 ) )
	{
		return last_byte;
	}
	prev_byte = prog_space.read_byte(prev_address );
	if ( prev_byte == 0xB1 )
	{   /* LDA (XX),Y */
		return prog_space.read_byte(last_byte + 1 );
	}
	return last_byte;'};
MERGE (n:KG {id: 'device:a2600_base_state.a2600_base_ntsc/tia_video/callback:tia_video:2'}) SET n:Callback SET n += {signal: 'vsync_callback', operation: 'set', raw: 'm_tia->vsync_callback().set(FUNC(a2600_state::a2600_tia_vsync_callback))', ownerTag: 'tia_video', sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 613, sourceColumn: 2, sourceEndLine: 613, targetClass: 'a2600_state', targetMethod: 'a2600_tia_vsync_callback'};
MERGE (n:KG {id: 'handler:a2600_state.a2600_tia_vsync_callback'}) SET n:Handler SET n += {method: 'a2600_tia_vsync_callback', ownerClass: 'a2600_state', sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 458, sourceColumn: 1, sourceEndLine: 471, sourceParameters: 'uint16_t data', sourceBody: 'for (int i = 0; i < std::size(supported_screen_heights); i++)
	{
		if (data >= TABLE(i, 262, 312, 328, 342) - 3 && data <= TABLE(i, 262, 312, 328, 342) + 3)
		{
			if (TABLE(i, 262, 312, 328, 342) != m_current_screen_height)
			{
				m_current_screen_height = TABLE(i, 262, 312, 328, 342);
//              m_screen->configure(228, m_current_screen_height, TABLE(i, { 26, 26 + 160 + 16, 24, 24 + 192 + 31 }, { 26, 26 + 160 + 16, 32, 32 + 228 + 31 }, { 26, 26 + 160 + 16, 45, 45 + 240 + 31 }, { 26, 26 + 160 + 16, 48, 48 + 240 + 31 }), HZ_TO_ATTOSECONDS(m_xtal) * 228 * m_current_screen_height);
			}
		}
	}'};
MERGE (n:KG {id: 'device:a2600_base_state.a2600_base_ntsc/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(m_xtal, 228, 26, 26 + 160 + 16, 262, 24 , 24 + 192 + 31)', 'm_screen->set_screen_update("tia_video", FUNC(tia_video_device::screen_update))'], sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 615, sourceColumn: 2, sourceEndLine: 615, clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [0, 228, 26, 202, 262, 24, 247], screenRawExpr: ['m_xtal', '228', '26', '26 + 160 + 16', '262', '24', '24 + 192 + 31']};
MERGE (n:KG {id: 'device:a2600_base_state.a2600_base_ntsc/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update("tia_video", FUNC(tia_video_device::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 617, sourceColumn: 2, sourceEndLine: 617, targetTag: 'tia_video', targetClass: 'tia_video_device', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:tia_video_device.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'tia_video_device', sourceFile: 'src/mame/atari/tia.cpp', sourceLine: 411, sourceColumn: 1, sourceEndLine: 416, sourceParameters: 'screen_device &screen, bitmap_rgb32 &bitmap, const rectangle &cliprect', sourceBody: 'screen_height = screen.height();
	copybitmap(bitmap, buffer, 0, 0, 0, 0, cliprect);
	return 0;'};
MERGE (n:KG {id: 'device:a2600_base_state.a2600_base_ntsc/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 620, sourceColumn: 2, sourceEndLine: 620};
MERGE (n:KG {id: 'device:a2600_base_state.a2600_base_ntsc/tia'}) SET n:Device SET n += {type: 'TIA', tag: 'tia', clock: null, config: ['TIA(config, "tia", m_xtal/114).add_route(ALL_OUTPUTS, "mono", 0.90)'], sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 621, sourceColumn: 2, sourceEndLine: 621, clockExpr: 'm_xtal/114'};
MERGE (n:KG {id: 'audioroute:device:a2600_base_state.a2600_base_ntsc/tia/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.9, raw: 'TIA(config, "tia", m_xtal/114).add_route(ALL_OUTPUTS, "mono", 0.90)', sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 621, sourceColumn: 2, sourceEndLine: 621};
MERGE (n:KG {id: 'device:a2600_base_state.a2600_base_ntsc/riot'}) SET n:Device SET n += {type: 'MOS6532', tag: 'riot', clock: null, config: ['MOS6532(config, m_riot, m_xtal / 3)', 'm_riot->pa_rd_callback().set(FUNC(a2600_state::switch_A_r))', 'm_riot->pa_wr_callback().set(FUNC(a2600_state::switch_A_w))', 'm_riot->pb_rd_callback().set_ioport("SWB")', 'm_riot->pb_wr_callback().set(FUNC(a2600_state::switch_B_w))', 'm_riot->irq_wr_callback().set(FUNC(a2600_state::irq_callback))'], sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 624, sourceColumn: 2, sourceEndLine: 624, clockExpr: 'm_xtal / 3'};
MERGE (n:KG {id: 'device:a2600_base_state.a2600_base_ntsc/riot/callback:riot:0'}) SET n:Callback SET n += {signal: 'pa_rd_callback', operation: 'set', raw: 'm_riot->pa_rd_callback().set(FUNC(a2600_state::switch_A_r))', ownerTag: 'riot', sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 625, sourceColumn: 2, sourceEndLine: 625, targetClass: 'a2600_state', targetMethod: 'switch_A_r'};
MERGE (n:KG {id: 'handler:a2600_state.switch_A_r'}) SET n:Handler SET n += {method: 'switch_A_r', ownerClass: 'a2600_state', sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 365, sourceColumn: 1, sourceEndLine: 376, sourceParameters: '', sourceBody: 'uint8_t val = 0;

	// Left controller port PINs 1-4 ( 4321 )
	val |= (m_joy1->read_joy() & 0x0f) << 4;

	// Right controller port PINs 1-4 ( 4321 )
	val |= m_joy2->read_joy() & 0x0f;

	return val;'};
MERGE (n:KG {id: 'device:a2600_base_state.a2600_base_ntsc/riot/callback:riot:1'}) SET n:Callback SET n += {signal: 'pa_wr_callback', operation: 'set', raw: 'm_riot->pa_wr_callback().set(FUNC(a2600_state::switch_A_w))', ownerTag: 'riot', sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 626, sourceColumn: 2, sourceEndLine: 626, targetClass: 'a2600_state', targetMethod: 'switch_A_w'};
MERGE (n:KG {id: 'handler:a2600_state.switch_A_w'}) SET n:Handler SET n += {method: 'switch_A_w', ownerClass: 'a2600_state', sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 349, sourceColumn: 1, sourceEndLine: 363, sourceConstants: ['CASSETTE_PLAY=1', 'CASSETTE_MOTOR_ENABLED=0', 'CASSETTE_MOTOR_DISABLED=4'], sourceParameters: 'uint8_t data', sourceBody: '/* Left controller port */
	m_joy1->joy_w( data >> 4 );

	/* Right controller port */
	m_joy2->joy_w( data & 0x0f );

//  switch( ioport("CONTROLLERS")->read() % 16 )
//  {
//  case 0x0a:  /* KidVid voice module */
//      m_cassette->change_state(( data & 0x02 ) ? CASSETTE_MOTOR_DISABLED : (CASSETTE_MOTOR_ENABLED | CASSETTE_PLAY), CASSETTE_MOTOR_DISABLED );
//      break;
//  }'};
MERGE (n:KG {id: 'device:a2600_base_state.a2600_base_ntsc/riot/callback:riot:2'}) SET n:Callback SET n += {signal: 'pb_rd_callback', operation: 'set_ioport', raw: 'm_riot->pb_rd_callback().set_ioport("SWB")', ownerTag: 'riot', sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 627, sourceColumn: 2, sourceEndLine: 627, targetTag: 'SWB', targetPort: 'SWB'};
MERGE (n:KG {id: 'device:a2600_base_state.a2600_base_ntsc/riot/callback:riot:3'}) SET n:Callback SET n += {signal: 'pb_wr_callback', operation: 'set', raw: 'm_riot->pb_wr_callback().set(FUNC(a2600_state::switch_B_w))', ownerTag: 'riot', sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 628, sourceColumn: 2, sourceEndLine: 628, targetClass: 'a2600_state', targetMethod: 'switch_B_w'};
MERGE (n:KG {id: 'handler:a2600_state.switch_B_w'}) SET n:Handler SET n += {method: 'switch_B_w', ownerClass: 'a2600_state', sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 378, sourceColumn: 1, sourceEndLine: 380, sourceParameters: 'uint8_t data', sourceBody: ''};
MERGE (n:KG {id: 'device:a2600_base_state.a2600_base_ntsc/riot/callback:riot:4'}) SET n:Callback SET n += {signal: 'irq_wr_callback', operation: 'set', raw: 'm_riot->irq_wr_callback().set(FUNC(a2600_state::irq_callback))', ownerTag: 'riot', sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 629, sourceColumn: 2, sourceEndLine: 629, targetClass: 'a2600_state', targetMethod: 'irq_callback'};
MERGE (n:KG {id: 'handler:a2600_state.irq_callback'}) SET n:Handler SET n += {method: 'irq_callback', ownerClass: 'a2600_state', sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 382, sourceColumn: 1, sourceEndLine: 384, sourceParameters: 'int state', sourceBody: ''};
MERGE (n:KG {id: 'device:a2600_base_state.a2600_base_ntsc/joyport1'}) SET n:Device SET n += {type: 'VCS_CONTROL_PORT', tag: 'joyport1', clock: null, config: ['VCS_CONTROL_PORT(config, m_joy1, vcs_control_port_devices, "joy")'], sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 631, sourceColumn: 2, sourceEndLine: 631, slotOptions: 'vcs_control_port_devices', slotDefault: 'joy'};
MERGE (n:KG {id: 'device:a2600_base_state.a2600_base_ntsc/joyport2'}) SET n:Device SET n += {type: 'VCS_CONTROL_PORT', tag: 'joyport2', clock: null, config: ['VCS_CONTROL_PORT(config, m_joy2, vcs_control_port_devices, "joy")'], sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 632, sourceColumn: 2, sourceEndLine: 632, slotOptions: 'vcs_control_port_devices', slotDefault: 'joy'};
MERGE (n:KG {id: 'machine:a2600_state.a2600'}) SET n:MachineConfig SET n += {cls: 'a2600_state', name: 'a2600', calls: ['a2600_base_ntsc', 'a2600_cartslot'], stateMembers: ['{"name":"m_current_screen_height","bits":16}'], devicePatches: ['{"tag":"cart_list","config":["subdevice<software_list_device>(\\"cart_list\\")->set_filter(\\"NTSC\\")"]}'], sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 669, sourceColumn: 1, sourceEndLine: 674};
MERGE (n:KG {id: 'inputs:a2600'}) SET n:InputPorts SET n += {name: 'a2600', sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 513, sourceColumn: 8, sourceEndLine: 513};
MERGE (n:KG {id: 'inputs:a2600/SWB'}) SET n:Port SET n += {tag: 'SWB', modify: false};
MERGE (n:KG {id: 'inputs:a2600/SWB/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_OTHER', modifiers: ['PORT_NAME("Reset Game")', 'PORT_CODE(KEYCODE_2)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:a2600/SWB/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_OTHER', modifiers: ['PORT_NAME("Select Game")', 'PORT_CODE(KEYCODE_1)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:a2600/SWB/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_UNUSED', defaultValue: 4};
MERGE (n:KG {id: 'inputs:a2600/SWB/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 8, modifiers: ['PORT_CODE(KEYCODE_C)', 'PORT_TOGGLE'], name: 'TV Type', defaultValue: 8, settings: ['8=Color', '0=B&W']};
MERGE (n:KG {id: 'inputs:a2600/SWB/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_UNUSED', defaultValue: 16};
MERGE (n:KG {id: 'inputs:a2600/SWB/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNUSED', defaultValue: 32};
MERGE (n:KG {id: 'inputs:a2600/SWB/f6'}) SET n:PortField SET n += {kind: 'dip', mask: 64, modifiers: ['PORT_CODE(KEYCODE_3)', 'PORT_TOGGLE'], name: 'Left Diff. Switch', defaultValue: 0, settings: ['64=A', '0=B']};
MERGE (n:KG {id: 'inputs:a2600/SWB/f7'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_CODE(KEYCODE_4)', 'PORT_TOGGLE'], name: 'Right Diff. Switch', defaultValue: 0, settings: ['128=A', '0=B']};
MERGE (n:KG {id: 'file:src/devices/bus/vcs_ctrl/joystick.cpp'}) SET n:SourceFile SET n += {path: 'src/devices/bus/vcs_ctrl/joystick.cpp'};
MERGE (n:KG {id: 'inputs:vcs_joystick'}) SET n:InputPorts SET n += {name: 'vcs_joystick'};
MERGE (n:KG {id: 'inputs:vcs_joystick/JOY'}) SET n:Port SET n += {tag: 'JOY', modify: false};
MERGE (n:KG {id: 'inputs:vcs_joystick/JOY/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:vcs_joystick/JOY/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:vcs_joystick/JOY/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:vcs_joystick/JOY/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:vcs_joystick/JOY/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_WRITE_LINE_MEMBER(FUNC(vcs_joystick_device::trigger_w))'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:vcs_joystick/JOY/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 208, activeLow: true, type: 'IPT_UNUSED', defaultValue: 208};
MATCH (a:KG {id: 'game:a2600'}), (b:KG {id: 'file:src/mame/atari/a2600.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 820, sourceColumn: 1, sourceEndLine: 820};
MATCH (a:KG {id: 'game:a2600'}), (b:KG {id: 'machine:a2600_state.a2600'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:a2600'}), (b:KG {id: 'inputs:a2600'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:a2600'}), (b:KG {id: 'romset:a2600'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/a2600.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/a2600.cpp'}), (b:KG {id: 'file:bus/vcs/compumat.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/a2600.cpp'}), (b:KG {id: 'file:bus/vcs/dpc.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/a2600.cpp'}), (b:KG {id: 'file:bus/vcs/harmony_melody.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/a2600.cpp'}), (b:KG {id: 'file:bus/vcs/rom.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/a2600.cpp'}), (b:KG {id: 'file:bus/vcs/scharger.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/a2600.cpp'}), (b:KG {id: 'file:bus/vcs/vcs_slot.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/a2600.cpp'}), (b:KG {id: 'file:bus/vcs_ctrl/ctrl.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/a2600.cpp'}), (b:KG {id: 'file:cpu/m6502/m6507.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/a2600.cpp'}), (b:KG {id: 'file:emupal.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/a2600.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/a2600.cpp'}), (b:KG {id: 'file:softlist_dev.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/a2600.cpp'}), (b:KG {id: 'file:sound/tiaintf.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/a2600.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/a2600.cpp'}), (b:KG {id: 'file:tia.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/a2600.cpp'}), (b:KG {id: 'file:machine/mos6530.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/atari/a2600.cpp'}), (b:KG {id: 'file:logmacro.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:a2600_state.a2600'}), (b:KG {id: 'file:src/mame/atari/a2600.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 669, sourceColumn: 1, sourceEndLine: 674};
MATCH (a:KG {id: 'machine:a2600_state.a2600'}), (b:KG {id: 'machine:a2600_base_state.a2600_base_ntsc'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:a2600_state.a2600'}), (b:KG {id: 'machine:a2600_cons_state.a2600_cartslot'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'inputs:a2600'}), (b:KG {id: 'file:src/mame/atari/a2600.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 513, sourceColumn: 8, sourceEndLine: 513};
MATCH (a:KG {id: 'inputs:a2600'}), (b:KG {id: 'inputs:a2600/SWB'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:a2600'}), (b:KG {id: 'file:src/mame/atari/a2600.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 704, sourceColumn: 1, sourceEndLine: 704};
MATCH (a:KG {id: 'romset:a2600'}), (b:KG {id: 'region:a2600/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'machine:a2600_base_state.a2600_base_ntsc'}), (b:KG {id: 'file:src/mame/atari/a2600.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 603, sourceColumn: 1, sourceEndLine: 633};
MATCH (a:KG {id: 'machine:a2600_base_state.a2600_base_ntsc'}), (b:KG {id: 'device:a2600_base_state.a2600_base_ntsc/^maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:a2600_base_state.a2600_base_ntsc'}), (b:KG {id: 'device:a2600_base_state.a2600_base_ntsc/tia_video'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:a2600_base_state.a2600_base_ntsc'}), (b:KG {id: 'device:a2600_base_state.a2600_base_ntsc/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:a2600_base_state.a2600_base_ntsc'}), (b:KG {id: 'device:a2600_base_state.a2600_base_ntsc/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:a2600_base_state.a2600_base_ntsc'}), (b:KG {id: 'device:a2600_base_state.a2600_base_ntsc/tia'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:a2600_base_state.a2600_base_ntsc'}), (b:KG {id: 'device:a2600_base_state.a2600_base_ntsc/riot'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:a2600_base_state.a2600_base_ntsc'}), (b:KG {id: 'device:a2600_base_state.a2600_base_ntsc/joyport1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:a2600_base_state.a2600_base_ntsc'}), (b:KG {id: 'device:a2600_base_state.a2600_base_ntsc/joyport2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:a2600_cons_state.a2600_cartslot'}), (b:KG {id: 'file:src/mame/atari/a2600.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 593, sourceColumn: 1, sourceEndLine: 601};
MATCH (a:KG {id: 'machine:a2600_cons_state.a2600_cartslot'}), (b:KG {id: 'softlist:a2600_cons_state.a2600_cartslot/a2600'}) MERGE (a)-[r:HAS_SOFTLIST]->(b);
MATCH (a:KG {id: 'machine:a2600_cons_state.a2600_cartslot'}), (b:KG {id: 'softlist:a2600_cons_state.a2600_cartslot/a2600_cass'}) MERGE (a)-[r:HAS_SOFTLIST]->(b);
MATCH (a:KG {id: 'machine:a2600_cons_state.a2600_cartslot'}), (b:KG {id: 'device:a2600_cons_state.a2600_cartslot/cartslot'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:a2600/SWB'}), (b:KG {id: 'inputs:a2600/SWB/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:a2600/SWB'}), (b:KG {id: 'inputs:a2600/SWB/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:a2600/SWB'}), (b:KG {id: 'inputs:a2600/SWB/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:a2600/SWB'}), (b:KG {id: 'inputs:a2600/SWB/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:a2600/SWB'}), (b:KG {id: 'inputs:a2600/SWB/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:a2600/SWB'}), (b:KG {id: 'inputs:a2600/SWB/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:a2600/SWB'}), (b:KG {id: 'inputs:a2600/SWB/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:a2600/SWB'}), (b:KG {id: 'inputs:a2600/SWB/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'device:a2600_base_state.a2600_base_ntsc/^maincpu'}), (b:KG {id: 'map:a2600_base_state.a2600_mem'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:a2600_base_state.a2600_base_ntsc/tia_video'}), (b:KG {id: 'device:a2600_base_state.a2600_base_ntsc/tia_video/callback:tia_video:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:a2600_base_state.a2600_base_ntsc/tia_video'}), (b:KG {id: 'device:a2600_base_state.a2600_base_ntsc/tia_video/callback:tia_video:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:a2600_base_state.a2600_base_ntsc/tia_video'}), (b:KG {id: 'device:a2600_base_state.a2600_base_ntsc/tia_video/callback:tia_video:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:a2600_base_state.a2600_base_ntsc/screen'}), (b:KG {id: 'device:a2600_base_state.a2600_base_ntsc/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:a2600_base_state.a2600_base_ntsc/tia'}), (b:KG {id: 'audioroute:device:a2600_base_state.a2600_base_ntsc/tia/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:a2600_base_state.a2600_base_ntsc/riot'}), (b:KG {id: 'device:a2600_base_state.a2600_base_ntsc/riot/callback:riot:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:a2600_base_state.a2600_base_ntsc/riot'}), (b:KG {id: 'device:a2600_base_state.a2600_base_ntsc/riot/callback:riot:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:a2600_base_state.a2600_base_ntsc/riot'}), (b:KG {id: 'device:a2600_base_state.a2600_base_ntsc/riot/callback:riot:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:a2600_base_state.a2600_base_ntsc/riot'}), (b:KG {id: 'device:a2600_base_state.a2600_base_ntsc/riot/callback:riot:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:a2600_base_state.a2600_base_ntsc/riot'}), (b:KG {id: 'device:a2600_base_state.a2600_base_ntsc/riot/callback:riot:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:a2600_base_state.a2600_base_ntsc/joyport1'}), (b:KG {id: 'inputs:vcs_joystick'}) MERGE (a)-[r:USES_INPUTS]->(b) SET r += {option: 'joy'};
MATCH (a:KG {id: 'device:a2600_base_state.a2600_base_ntsc/joyport2'}), (b:KG {id: 'inputs:vcs_joystick'}) MERGE (a)-[r:USES_INPUTS]->(b) SET r += {option: 'joy'};
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem'}), (b:KG {id: 'file:src/mame/atari/a2600.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/atari/a2600.cpp', sourceLine: 264, sourceColumn: 1, sourceEndLine: 269};
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem'}), (b:KG {id: 'map:a2600_base_state.a2600_mem/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem'}), (b:KG {id: 'map:a2600_base_state.a2600_mem/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem'}), (b:KG {id: 'map:a2600_base_state.a2600_mem/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem'}), (b:KG {id: 'map:a2600_base_state.a2600_mem/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem'}), (b:KG {id: 'map:a2600_base_state.a2600_mem/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem'}), (b:KG {id: 'map:a2600_base_state.a2600_mem/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem'}), (b:KG {id: 'map:a2600_base_state.a2600_mem/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem'}), (b:KG {id: 'map:a2600_base_state.a2600_mem/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem'}), (b:KG {id: 'map:a2600_base_state.a2600_mem/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem'}), (b:KG {id: 'map:a2600_base_state.a2600_mem/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem'}), (b:KG {id: 'map:a2600_base_state.a2600_mem/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem'}), (b:KG {id: 'map:a2600_base_state.a2600_mem/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:a2600_base_state.a2600_base_ntsc/tia_video/callback:tia_video:0'}), (b:KG {id: 'handler:a2600_state.a2600_read_input_port'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:a2600_base_state.a2600_base_ntsc/tia_video/callback:tia_video:1'}), (b:KG {id: 'handler:a2600_state.a2600_get_databus_contents'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:a2600_base_state.a2600_base_ntsc/tia_video/callback:tia_video:2'}), (b:KG {id: 'handler:a2600_state.a2600_tia_vsync_callback'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:a2600_base_state.a2600_base_ntsc/screen/callback:screen:0'}), (b:KG {id: 'handler:tia_video_device.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:a2600_base_state.a2600_base_ntsc/screen/callback:screen:0'}), (b:KG {id: 'device:a2600_base_state.a2600_base_ntsc/tia_video'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:a2600_base_state.a2600_base_ntsc/riot/callback:riot:0'}), (b:KG {id: 'handler:a2600_state.switch_A_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:a2600_base_state.a2600_base_ntsc/riot/callback:riot:1'}), (b:KG {id: 'handler:a2600_state.switch_A_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:a2600_base_state.a2600_base_ntsc/riot/callback:riot:3'}), (b:KG {id: 'handler:a2600_state.switch_B_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:a2600_base_state.a2600_base_ntsc/riot/callback:riot:4'}), (b:KG {id: 'handler:a2600_state.irq_callback'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:vcs_joystick'}), (b:KG {id: 'file:src/devices/bus/vcs_ctrl/joystick.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'inputs:vcs_joystick'}), (b:KG {id: 'inputs:vcs_joystick/JOY'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem/range0'}), (b:KG {id: 'handler:tia_video_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'tia_video'};
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem/range0'}), (b:KG {id: 'handler:tia_video_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'tia_video'};
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem/range2'}), (b:KG {id: 'handler:mos6532_device.pa_data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem/range2'}), (b:KG {id: 'handler:mos6532_device.pa_data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem/range3'}), (b:KG {id: 'handler:mos6532_device.pa_ddr_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem/range3'}), (b:KG {id: 'handler:mos6532_device.pa_ddr_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem/range4'}), (b:KG {id: 'handler:mos6532_device.pb_data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem/range4'}), (b:KG {id: 'handler:mos6532_device.pb_data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem/range5'}), (b:KG {id: 'handler:mos6532_device.pb_ddr_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem/range5'}), (b:KG {id: 'handler:mos6532_device.pb_ddr_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem/range6'}), (b:KG {id: 'handler:mos6532_device.timer_off_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem/range7'}), (b:KG {id: 'handler:mos6532_device.timer_on_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem/range8'}), (b:KG {id: 'handler:mos6532_device.timer_off_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem/range9'}), (b:KG {id: 'handler:mos6532_device.timer_on_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem/range10'}), (b:KG {id: 'handler:mos6532_device.irq_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'map:a2600_base_state.a2600_mem/range11'}), (b:KG {id: 'handler:mos6532_device.edge_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'riot'};
MATCH (a:KG {id: 'inputs:vcs_joystick/JOY'}), (b:KG {id: 'inputs:vcs_joystick/JOY/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:vcs_joystick/JOY'}), (b:KG {id: 'inputs:vcs_joystick/JOY/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:vcs_joystick/JOY'}), (b:KG {id: 'inputs:vcs_joystick/JOY/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:vcs_joystick/JOY'}), (b:KG {id: 'inputs:vcs_joystick/JOY/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:vcs_joystick/JOY'}), (b:KG {id: 'inputs:vcs_joystick/JOY/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:vcs_joystick/JOY'}), (b:KG {id: 'inputs:vcs_joystick/JOY/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.read'}), (b:KG {id: 'handler:tia_video_device.update_bitmap'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.read'}), (b:KG {id: 'handler:tia_video_device.current_x'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.read'}), (b:KG {id: 'handler:tia_video_device.current_y'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.read'}), (b:KG {id: 'handler:tia_video_device.INPT_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.current_x'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.current_y'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.update_bitmap'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.VSYNC_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.VBLANK_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.WSYNC_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.RSYNC_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.NUSIZ0_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.NUSIZ1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.CTRLPF_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.RESP0_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.RESP1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.RESM0_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.RESM1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.RESBL_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.GRP0_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.GRP1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.HMP0_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.HMP1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.HMM0_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.HMM1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.HMBL_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.RESMP0_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.RESMP1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.HMOVE_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.HMCLR_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.write'}), (b:KG {id: 'handler:tia_video_device.CXCLR_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.update_bitmap'}), (b:KG {id: 'handler:tia_video_device.drawS1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.update_bitmap'}), (b:KG {id: 'handler:tia_video_device.drawM1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.update_bitmap'}), (b:KG {id: 'handler:tia_video_device.drawS0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.update_bitmap'}), (b:KG {id: 'handler:tia_video_device.drawM0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.update_bitmap'}), (b:KG {id: 'handler:tia_video_device.drawPF'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.update_bitmap'}), (b:KG {id: 'handler:tia_video_device.drawBL'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.update_bitmap'}), (b:KG {id: 'handler:tia_video_device.setup_pXgfx'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.update_bitmap'}), (b:KG {id: 'handler:tia_video_device.collision_check'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.VSYNC_w'}), (b:KG {id: 'handler:tia_video_device.current_y'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.VSYNC_w'}), (b:KG {id: 'handler:tia_video_device.update_bitmap'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.NUSIZ0_w'}), (b:KG {id: 'handler:tia_video_device.current_x'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.NUSIZ0_w'}), (b:KG {id: 'handler:tia_video_device.update_bitmap'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.NUSIZ0_w'}), (b:KG {id: 'handler:tia_video_device.current_y'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.NUSIZ1_w'}), (b:KG {id: 'handler:tia_video_device.current_x'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.NUSIZ1_w'}), (b:KG {id: 'handler:tia_video_device.update_bitmap'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.NUSIZ1_w'}), (b:KG {id: 'handler:tia_video_device.current_y'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.CTRLPF_w'}), (b:KG {id: 'handler:tia_video_device.current_x'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.RESP0_w'}), (b:KG {id: 'handler:tia_video_device.current_x'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.RESP1_w'}), (b:KG {id: 'handler:tia_video_device.current_x'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.RESM0_w'}), (b:KG {id: 'handler:tia_video_device.current_x'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.RESM1_w'}), (b:KG {id: 'handler:tia_video_device.current_x'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.RESBL_w'}), (b:KG {id: 'handler:tia_video_device.current_x'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.HMP0_w'}), (b:KG {id: 'handler:tia_video_device.current_x'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.HMP0_w'}), (b:KG {id: 'handler:tia_video_device.setup_pXgfx'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.HMP1_w'}), (b:KG {id: 'handler:tia_video_device.current_x'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.HMP1_w'}), (b:KG {id: 'handler:tia_video_device.setup_pXgfx'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.HMM0_w'}), (b:KG {id: 'handler:tia_video_device.current_x'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.HMM1_w'}), (b:KG {id: 'handler:tia_video_device.current_x'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.HMBL_w'}), (b:KG {id: 'handler:tia_video_device.current_x'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.HMOVE_w'}), (b:KG {id: 'handler:tia_video_device.current_x'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.HMOVE_w'}), (b:KG {id: 'handler:tia_video_device.current_y'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.HMOVE_w'}), (b:KG {id: 'handler:tia_video_device.update_bitmap'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.HMOVE_w'}), (b:KG {id: 'handler:tia_video_device.setup_pXgfx'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.HMCLR_w'}), (b:KG {id: 'handler:tia_video_device.HMP0_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.HMCLR_w'}), (b:KG {id: 'handler:tia_video_device.HMP1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.HMCLR_w'}), (b:KG {id: 'handler:tia_video_device.HMM0_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.HMCLR_w'}), (b:KG {id: 'handler:tia_video_device.HMM1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.HMCLR_w'}), (b:KG {id: 'handler:tia_video_device.HMBL_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.drawS1'}), (b:KG {id: 'handler:tia_video_device.draw_sprite_helper'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.drawM1'}), (b:KG {id: 'handler:tia_video_device.draw_missile_helper'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.drawS0'}), (b:KG {id: 'handler:tia_video_device.draw_sprite_helper'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.drawM0'}), (b:KG {id: 'handler:tia_video_device.draw_missile_helper'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.drawPF'}), (b:KG {id: 'handler:tia_video_device.draw_playfield_helper'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tia_video_device.drawBL'}), (b:KG {id: 'handler:tia_video_device.draw_ball_helper'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
