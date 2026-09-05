// mamekit knowledge graph — driver src/mame/konami/tmnt.cpp
// generated 2026-09-05T03:50:15.029Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/konami/tmnt.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/konami/tmnt.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:k052109.h'}) SET n:SourceFile SET n += {path: 'k052109.h', external: true};
MERGE (n:KG {id: 'file:k051960.h'}) SET n:SourceFile SET n += {path: 'k051960.h', external: true};
MERGE (n:KG {id: 'file:konamipt.h'}) SET n:SourceFile SET n += {path: 'konamipt.h', external: true};
MERGE (n:KG {id: 'file:cpu/m68000/m68000.h'}) SET n:SourceFile SET n += {path: 'cpu/m68000/m68000.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6805/m68705.h'}) SET n:SourceFile SET n += {path: 'cpu/m6805/m68705.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:machine/gen_latch.h'}) SET n:SourceFile SET n += {path: 'machine/gen_latch.h', external: true};
MERGE (n:KG {id: 'file:machine/nvram.h'}) SET n:SourceFile SET n += {path: 'machine/nvram.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:sound/k007232.h'}) SET n:SourceFile SET n += {path: 'sound/k007232.h', external: true};
MERGE (n:KG {id: 'file:sound/msm5205.h'}) SET n:SourceFile SET n += {path: 'sound/msm5205.h', external: true};
MERGE (n:KG {id: 'file:sound/samples.h'}) SET n:SourceFile SET n += {path: 'sound/samples.h', external: true};
MERGE (n:KG {id: 'file:sound/upd7759.h'}) SET n:SourceFile SET n += {path: 'sound/upd7759.h', external: true};
MERGE (n:KG {id: 'file:sound/ymopm.h'}) SET n:SourceFile SET n += {path: 'sound/ymopm.h', external: true};
MERGE (n:KG {id: 'file:emupal.h'}) SET n:SourceFile SET n += {path: 'emupal.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:tilemap.h'}) SET n:SourceFile SET n += {path: 'tilemap.h', external: true};
MERGE (n:KG {id: 'file:ymfm/src/ymfm.h'}) SET n:SourceFile SET n += {path: 'ymfm/src/ymfm.h', external: true};
MERGE (n:KG {id: 'game:tmnt'}) SET n:Game SET n += {name: 'tmnt', year: '1989', company: 'Konami', fullname: 'Teenage Mutant Ninja Turtles (World 4 Players, version X)', monitor: 'ROT0', cls: 'tmnt_state', init: 'init_tmnt', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 1723, sourceColumn: 1, sourceEndLine: 1723};
MERGE (n:KG {id: 'romset:tmnt'}) SET n:RomSet SET n += {name: 'tmnt', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 1075, sourceColumn: 1, sourceEndLine: 1075};
MERGE (n:KG {id: 'region:tmnt/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 393216, flags: '0', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 1008, sourceColumn: 2, sourceEndLine: 1008};
MERGE (n:KG {id: 'rom:tmnt/maincpu/963-x23.j17'}) SET n:Rom SET n += {file: '963-x23.j17', offset: 0, size: 131072, crc: 'a9549004', sha1: 'bf9be5983af2282f627fb8408c069415c9b90229', skip: 1};
MERGE (n:KG {id: 'rom:tmnt/maincpu/963-x24.k17'}) SET n:Rom SET n += {file: '963-x24.k17', offset: 1, size: 131072, crc: 'e5cc9067', sha1: '649db4a09864eb8aba44cb77b580f1f28cfd80ed', skip: 1};
MERGE (n:KG {id: 'rom:tmnt/maincpu/963-x21.j15'}) SET n:Rom SET n += {file: '963-x21.j15', offset: 262144, size: 65536, crc: '5789cf92', sha1: 'c1d1c958813062e5df5ac62e90ee4ce11f7e4a24', skip: 1};
MERGE (n:KG {id: 'rom:tmnt/maincpu/963-x22.k15'}) SET n:Rom SET n += {file: '963-x22.k15', offset: 262145, size: 65536, crc: '0a74e277', sha1: 'c349d3c25eb05cc30ec1fd823475d971f3649f8b', skip: 1};
MERGE (n:KG {id: 'region:tmnt/audiocpu'}) SET n:RomRegion SET n += {tag: 'audiocpu', size: 65536, flags: '0', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 1030, sourceColumn: 2, sourceEndLine: 1030};
MERGE (n:KG {id: 'rom:tmnt/audiocpu/963e20.g13'}) SET n:Rom SET n += {file: '963e20.g13', offset: 0, size: 32768, crc: '1692a6d6', sha1: '68c3419012b2863e91a7d7e479fce5ceabb10b88', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 1083, sourceColumn: 2, sourceEndLine: 1083};
MERGE (n:KG {id: 'region:tmnt/k052109'}) SET n:RomRegion SET n += {tag: 'k052109', size: 1048576, flags: '0', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 1012, sourceColumn: 2, sourceEndLine: 1012};
MERGE (n:KG {id: 'rom:tmnt/k052109/963a28.h27'}) SET n:Rom SET n += {file: '963a28.h27', offset: 0, size: 524288, crc: 'db4769a8', sha1: '810811914f9c1fbf2320d5a9030cbf124f6d78cf', groupSize: 2, skip: 2};
MERGE (n:KG {id: 'rom:tmnt/k052109/963a29.k27'}) SET n:Rom SET n += {file: '963a29.k27', offset: 2, size: 524288, crc: '8069cd2e', sha1: '54095d3546119ccd1e8814d692aceb1327c9369f', groupSize: 2, skip: 2};
MERGE (n:KG {id: 'region:tmnt/k051960'}) SET n:RomRegion SET n += {tag: 'k051960', size: 2097152, flags: '0', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 1018, sourceColumn: 2, sourceEndLine: 1018};
MERGE (n:KG {id: 'rom:tmnt/k051960/963a17.h4'}) SET n:Rom SET n += {file: '963a17.h4', offset: 0, size: 524288, crc: 'b5239a44', sha1: '84e94807e7c51aa652b4e4b827b36be59a53d0d6', groupSize: 2, skip: 2};
MERGE (n:KG {id: 'rom:tmnt/k051960/963a15.k4'}) SET n:Rom SET n += {file: '963a15.k4', offset: 2, size: 524288, crc: '1f324eed', sha1: '971a675578518fffa341a943d0cc4fdea005fde0', groupSize: 2, skip: 2};
MERGE (n:KG {id: 'rom:tmnt/k051960/963a18.h6'}) SET n:Rom SET n += {file: '963a18.h6', offset: 1048576, size: 524288, crc: 'dd51adef', sha1: '5010c0911b0b9e4f23a785e8a751a0bde5be5be0', groupSize: 2, skip: 2};
MERGE (n:KG {id: 'rom:tmnt/k051960/963a16.k6'}) SET n:Rom SET n += {file: '963a16.k6', offset: 1048578, size: 524288, crc: 'd4bd9984', sha1: 'd780ae7f72e16767c3a492544f02f0f1a332ab22', groupSize: 2, skip: 2};
MERGE (n:KG {id: 'region:tmnt/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 512, flags: '0', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 1043, sourceColumn: 2, sourceEndLine: 1043};
MERGE (n:KG {id: 'rom:tmnt/proms/963a30.g7'}) SET n:Rom SET n += {file: '963a30.g7', offset: 0, size: 256, crc: 'abd82680', sha1: '945a71e6ec65202f13209b45d45b616372d6c0f5', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 1096, sourceColumn: 2, sourceEndLine: 1096};
MERGE (n:KG {id: 'rom:tmnt/proms/963a31.g19'}) SET n:Rom SET n += {file: '963a31.g19', offset: 256, size: 256, crc: 'f8004a1c', sha1: 'ed6694b8eebfe0238b50ebd05007d519f6e57b1b', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 1097, sourceColumn: 2, sourceEndLine: 1097};
MERGE (n:KG {id: 'region:tmnt/k007232'}) SET n:RomRegion SET n += {tag: 'k007232', size: 131072, flags: '0', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 1046, sourceColumn: 2, sourceEndLine: 1046};
MERGE (n:KG {id: 'rom:tmnt/k007232/963a26.c13'}) SET n:Rom SET n += {file: '963a26.c13', offset: 0, size: 131072, crc: 'e2ac3063', sha1: '5bb294c46fb5eaba9935a18c0aa5d3931168f474', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 1100, sourceColumn: 2, sourceEndLine: 1100};
MERGE (n:KG {id: 'region:tmnt/upd'}) SET n:RomRegion SET n += {tag: 'upd', size: 131072, flags: '0', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 1102, sourceColumn: 2, sourceEndLine: 1102};
MERGE (n:KG {id: 'rom:tmnt/upd/963a27.d18'}) SET n:Rom SET n += {file: '963a27.d18', offset: 0, size: 131072, crc: '2dfd674b', sha1: 'bbec5896c70056964fbc972a84bd5b0dfc6af257', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 1103, sourceColumn: 2, sourceEndLine: 1103};
MERGE (n:KG {id: 'region:tmnt/title'}) SET n:RomRegion SET n += {tag: 'title', size: 524288, flags: '0', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 1105, sourceColumn: 2, sourceEndLine: 1105};
MERGE (n:KG {id: 'rom:tmnt/title/963a25.d5'}) SET n:Rom SET n += {file: '963a25.d5', offset: 0, size: 524288, crc: 'fca078c7', sha1: '3e1124d72c9db4cb11d8de6c44b7aeca967f44e1', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 1106, sourceColumn: 2, sourceEndLine: 1106};
MERGE (n:KG {id: 'handler:palette_device.read8'}) SET n:Handler SET n += {method: 'read8', ownerClass: 'palette_device', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 510, sourceColumn: 2, sourceEndLine: 510};
MERGE (n:KG {id: 'handler:palette_device.write8'}) SET n:Handler SET n += {method: 'write8', ownerClass: 'palette_device', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 510, sourceColumn: 2, sourceEndLine: 510};
MERGE (n:KG {id: 'handler:tmnt_state._0a0000_w'}) SET n:Handler SET n += {method: '_0a0000_w', ownerClass: 'tmnt_state', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 391, sourceColumn: 1, sourceEndLine: 412, sourceParameters: 'offs_t offset, uint16_t data', sourceBody: '/* bit 0/1 = coin counters */
	machine().bookkeeping().coin_counter_w(0, data & 0x01);
	machine().bookkeeping().coin_counter_w(1, data & 0x02);  /* 2 players version */

	/* bit 3 high then low triggers irq on sound CPU */
	if (m_last == 0x08 && (data & 0x08) == 0 && m_audiocpu.found())
		m_audiocpu->set_input_line(0, HOLD_LINE); // Z80 IM1

	m_last = data & 0x08;

	/* bit 5 = irq enable */
	m_irq5_mask = data & 0x20;
	if (!m_irq5_mask)
		m_maincpu->set_input_line(M68K_IRQ_5, CLEAR_LINE);

	/* bit 7 = enable char ROM reading through the video RAM */
	m_k052109->set_rmrd_line((data & 0x80) ? ASSERT_LINE : CLEAR_LINE);

	/* other bits unused */'};
MERGE (n:KG {id: 'handler:k052109_device.set_rmrd_line'}) SET n:Handler SET n += {method: 'set_rmrd_line', ownerClass: 'k052109_device', sourceFile: 'src/mame/konami/k052109.h', sourceLine: 51, sourceColumn: 36, sourceEndLine: 53, sourceParameters: 'int state', sourceBody: 'm_rmrd_line = state;'};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset16_w'}) SET n:Handler SET n += {method: 'reset16_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 516, sourceColumn: 2, sourceEndLine: 516};
MERGE (n:KG {id: 'handler:ym2151_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'ym2151_device', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 559, sourceColumn: 2, sourceEndLine: 559};
MERGE (n:KG {id: 'handler:ym2151_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'ym2151_device', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 559, sourceColumn: 2, sourceEndLine: 559};
MERGE (n:KG {id: 'handler:tmnt_state.k052109_word_noA12_r'}) SET n:Handler SET n += {method: 'k052109_word_noA12_r', ownerClass: 'tmnt_state', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 207, sourceColumn: 1, sourceEndLine: 216, sourceParameters: 'offs_t offset, uint16_t mem_mask', sourceBody: '/* some games have the A12 line not connected, so the chip spans */
	/* twice the memory range, with mirroring */
	offset = ((offset & 0x3000) >> 1) | (offset & 0x07ff);
	if (ACCESSING_BITS_8_15)
		return m_k052109->read(offset) << 8;
	else
		return m_k052109->read(offset + 0x2000);'};
MERGE (n:KG {id: 'handler:k052109_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'k052109_device', sourceFile: 'src/mame/konami/k052109.cpp', sourceLine: 341, sourceColumn: 1, sourceEndLine: 400, sourceParameters: 'offs_t offset', sourceBody: 'if (m_rmrd_line == CLEAR_LINE)
	{
		if ((offset & 0x1fff) >= 0x1800)
		{
			if (offset >= 0x180c && offset < 0x1834)
			{
				// A y scroll
			}
			else if (offset >= 0x1a00 && offset < 0x1c00)
			{
				// A x scroll
			}
			else if (offset == 0x1d00)
			{
				// read for bitwise operations before writing
			}
			else if (offset >= 0x380c && offset < 0x3834)
			{
				// B y scroll
			}
			else if (offset >= 0x3a00 && offset < 0x3c00)
			{
				// B x scroll
			}
			else
			{
				//logerror("%s: read from unknown 052109 address %04x\\n",machine().describe_context(),offset);
			}
		}

		return m_ram[offset];
	}
	else // Punk Shot and TMNT read from 0000-1fff, Aliens from 2000-3fff
	{
		assert(m_char_rom.found());

		int code = (offset & 0x1fff) >> 5;
		int color = m_romsubbank;
		int flags = 0;
		int priority = 0;
		int bank = m_charrombank[(color & 0x0c) >> 2] >> 2; // discard low bits (TMNT)
		int addr;

		bank |= (m_charrombank_2[(color & 0x0c) >> 2] >> 2); // Surprise Attack uses this 2nd bank in the rom test

		if (m_has_extra_video_ram)
			code |= color << 8; /* kludge for X-Men */
		else
			m_k052109_cb(0, bank, code, color, flags, priority);

		addr = (code << 5) + (offset & 0x1f);
		addr &= m_char_rom.length() - 1;

		//logerror("%s: off = %04x sub = %02x (bnk = %x) adr = %06x\\n", machine().describe_context(), offset, m_romsubbank, bank, addr);

		return m_char_rom[addr];
	}'};
MERGE (n:KG {id: 'handler:tmnt_state.k052109_word_noA12_w'}) SET n:Handler SET n += {method: 'k052109_word_noA12_w', ownerClass: 'tmnt_state', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 218, sourceColumn: 1, sourceEndLine: 227, sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: '/* some games have the A12 line not connected, so the chip spans */
	/* twice the memory range, with mirroring */
	offset = ((offset & 0x3000) >> 1) | (offset & 0x07ff);
	if (ACCESSING_BITS_8_15)
		m_k052109->write(offset, (data >> 8) & 0xff);
	else
		m_k052109->write(offset + 0x2000, data & 0xff);'};
MERGE (n:KG {id: 'handler:k052109_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'k052109_device', sourceFile: 'src/mame/konami/k052109.cpp', sourceLine: 402, sourceColumn: 1, sourceEndLine: 540, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'if ((offset & 0x1fff) < 0x1800) // tilemap RAM
	{
		if (offset >= 0x4000)
			m_has_extra_video_ram = 1; // kludge for X-Men

		m_ram[offset] = data;
		m_tilemap[(offset & 0x1800) >> 11]->mark_tile_dirty(offset & 0x7ff);
	}
	else // control registers
	{
		m_ram[offset] = data;

		if (offset >= 0x180c && offset < 0x1834)
		{
			// A y scroll
		}
		else if (offset >= 0x1a00 && offset < 0x1c00)
		{
			// A x scroll
		}
		else if (offset == 0x1c00)
		{
			m_addrmap = data;
		}
		else if (offset == 0x1c80)
		{
			if (m_scrollctrl != data)
			{
				//popmessage("scrollcontrol = %02x", data);
				//logerror("%s: rowscrollcontrol = %02x\\n", machine().describe_context(), data);
				m_scrollctrl = data;
			}
		}
		else if (offset == 0x1d00)
		{
			//logerror("%s: 052109 register 1d00 = %02x\\n", machine().describe_context(), data);
			// clear interrupts
			if (BIT(~data & m_irq_control, 0))
				m_nmi_handler(CLEAR_LINE);

			if (BIT(~data & m_irq_control, 1))
				m_firq_handler(CLEAR_LINE);

			if (BIT(~data & m_irq_control, 2))
				m_irq_handler(CLEAR_LINE);

			m_irq_control = data;
		}
		else if (offset == 0x1d80)
		{
			int dirty = 0;

			if (m_charrombank[0] != (data & 0x0f))
				dirty |= 1;
			if (m_charrombank[1] != ((data >> 4) & 0x0f))
				dirty |= 2;

			if (dirty)
			{
				m_charrombank[0] = data & 0x0f;
				m_charrombank[1] = (data >> 4) & 0x0f;

				for (int i = 0; i < 0x1800; i++)
				{
					int bank = (m_ram[i] & 0x0c) >> 2;
					if ((bank == 0 && (dirty & 1)) || (bank == 1 && (dirty & 2)))
					{
						m_tilemap[(i & 0x1800) >> 11]->mark_tile_dirty(i & 0x7ff);
					}
				}
			}
		}
		else if (offset == 0x1e00 || offset == 0x3e00) // Surprise Attack uses offset 0x3e00
		{
			//logerror("%s: 052109 register 1e00 = %02x\\n",machine().describe_context(),data);
			m_romsubbank = data;
		}
		else if (offset == 0x1e80)
		{
			//if ((data & 0xfe)) logerror("%s: 052109 register 1e80 = %02x\\n",machine().describe_context(),data);
			if ((m_tileflip_enable & 0x06) != (data & 0x06))
			{
				for (int i = 0; i < 3; i++)
					m_tilemap[i]->mark_all_dirty();
			}
			m_tileflip_enable = data & 0x07;
			tileflip_reset();
		}
		else if (offset == 0x1f00)
		{
			int dirty = 0;

			if (m_charrombank[2] != (data & 0x0f))
				dirty |= 1;

			if (m_charrombank[3] != ((data >> 4) & 0x0f))
				dirty |= 2;

			if (dirty)
			{
				m_charrombank[2] = data & 0x0f;
				m_charrombank[3] = (data >> 4) & 0x0f;

				for (int i = 0; i < 0x1800; i++)
				{
					int bank = (m_ram[i] & 0x0c) >> 2;
					if ((bank == 2 && (dirty & 1)) || (bank == 3 && (dirty & 2)))
						m_tilemap[(i & 0x1800) >> 11]->mark_tile_dirty(i & 0x7ff);
				}
			}
		}
		else if (offset >= 0x380c && offset < 0x3834)
		{
			// B y scroll
		}
		else if (offset >= 0x3a00 && offset < 0x3c00)
		{
			// B x scroll
		}
		else if (offset == 0x3d80) // Surprise Attack uses offset 0x3d80 in rom test
		{
			// mirroring this write, breaks Surprise Attack in game tilemaps
			m_charrombank_2[0] = data & 0x0f;
			m_charrombank_2[1] = (data >> 4) & 0x0f;
		}
		else if (offset == 0x3f00) // Surprise Attack uses offset 0x3f00 in rom test
		{
			// mirroring this write, breaks Surprise Attack in game tilemaps
			m_charrombank_2[2] = data & 0x0f;
			m_charrombank_2[3] = (data >> 4) & 0x0f;
		}
		else
		{
			//logerror("%s: write %02x to unknown 052109 address %04x\\n",machine().describe_context(),data,offset);
		}
	}'};
MERGE (n:KG {id: 'handler:k052109_device.tileflip_reset'}) SET n:Handler SET n += {method: 'tileflip_reset', ownerClass: 'k052109_device', sourceFile: 'src/mame/konami/k052109.cpp', sourceLine: 659, sourceColumn: 1, sourceEndLine: 664, sourceParameters: '', sourceBody: 'u32 flip = BIT(m_tileflip_enable, 0) ? (TILEMAP_FLIPY | TILEMAP_FLIPX) : 0;
	for (int i = 0; i < 3; i++)
		m_tilemap[i]->set_flip(flip);'};
MERGE (n:KG {id: 'handler:k051960_device.k051937_r'}) SET n:Handler SET n += {method: 'k051937_r', ownerClass: 'k051960_device', sourceFile: 'src/mame/konami/k051960.cpp', sourceLine: 332, sourceColumn: 1, sourceEndLine: 343, sourceParameters: 'offs_t offset', sourceBody: 'offset &= 7;

	if (BIT(m_control, 5) && offset & 4)
		return k051960_fetchromdata(offset & 3);
	else if (offset == 0)
		return m_sprites_busy->enabled() ? 1 : 0;

	//logerror("%s: read unknown 051937 address %x\\n", m_maincpu->pc(), offset);
	return 0;'};
MERGE (n:KG {id: 'handler:k051960_device.k051960_fetchromdata'}) SET n:Handler SET n += {method: 'k051960_fetchromdata', ownerClass: 'k051960_device', sourceFile: 'src/mame/konami/k051960.cpp', sourceLine: 293, sourceColumn: 1, sourceEndLine: 309, sourceParameters: 'offs_t offset', sourceBody: 'int addr = m_romoffset + (m_spriterombank[0] << 8) + ((m_spriterombank[1] & 0x03) << 16);
	int code = (addr & 0x3ffe0) >> 5;
	int off1 = addr & 0x1f;
	int color = ((m_spriterombank[1] & 0xfc) >> 2) + ((m_spriterombank[2] & 0x03) << 6);
	int pri = 0;
	bool shadow = false;

	m_k051960_cb(code, color, pri, shadow);

	addr = (code << 7) | (off1 << 2) | offset;
	addr &= m_sprite_rom.length() - 1;

	//popmessage("%s: addr %06x", machine().describe_context(), addr);
	return m_sprite_rom[addr];'};
MERGE (n:KG {id: 'handler:k051960_device.k051937_w'}) SET n:Handler SET n += {method: 'k051937_w', ownerClass: 'k051960_device', sourceFile: 'src/mame/konami/k051960.cpp', sourceLine: 345, sourceColumn: 1, sourceEndLine: 383, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'offset &= 7;

	if (offset == 0)
	{
		// clear interrupts
		if (BIT(~data & m_control, 0))
			m_irq_handler(CLEAR_LINE);

		if (BIT(~data & m_control, 1))
			m_firq_handler(CLEAR_LINE);

		if (BIT(~data & m_control, 2))
			m_nmi_handler(CLEAR_LINE);

		//if (data & 0xc2) popmessage("051937 reg 00 = %02x",data);
		m_control = data;
	}
	else if (offset == 1)
	{
		if (0)
			logerror("%s: %02x to 051937 address %x\\n", machine().describe_context(), data, offset);

		// callback for setting palette shadow mode
		if (BIT(data ^ m_shadow_config, 0))
			m_shadow_config_cb(data & 1);

		m_shadow_config = data & 0x07;
	}
	else if (offset >= 2 && offset < 5)
	{
		m_spriterombank[offset - 2] = data;
	}
	else
	{
		//logerror("%s: write %02x to unknown 051937 address %x\\n", m_maincpu->pc(), data, offset);
	}'};
MERGE (n:KG {id: 'handler:k051960_device.k051960_r'}) SET n:Handler SET n += {method: 'k051960_r', ownerClass: 'k051960_device', sourceFile: 'src/mame/konami/k051960.cpp', sourceLine: 311, sourceColumn: 1, sourceEndLine: 323, sourceParameters: 'offs_t offset', sourceBody: 'if (BIT(m_control, 5))
	{
		// the 051960 remembers the last address read and uses it when reading the sprite ROMs
		if (!machine().side_effects_disabled())
			m_romoffset = (offset & 0x3fc) >> 2;

		return k051960_fetchromdata(offset & 3); // only 88 Games reads the ROMs from here
	}
	else
		return m_ram[offset];'};
MERGE (n:KG {id: 'handler:k051960_device.k051960_w'}) SET n:Handler SET n += {method: 'k051960_w', ownerClass: 'k051960_device', sourceFile: 'src/mame/konami/k051960.cpp', sourceLine: 325, sourceColumn: 1, sourceEndLine: 328, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'm_ram[offset] = data;'};
MERGE (n:KG {id: 'handler:generic_latch_8_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 515, sourceColumn: 2, sourceEndLine: 515};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_main_map'}) SET n:AddressMap SET n += {cls: 'tmnt_state', name: 'tmnt_main_map', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 506, sourceColumn: 1, sourceEndLine: 525};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_main_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 393215, raw: 'map(0x000000, 0x05ffff).rom()', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 508, sourceColumn: 2, sourceEndLine: 508, rom: true};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_main_map/range1'}) SET n:AddressRange SET n += {start: 393216, end: 409599, raw: 'map(0x060000, 0x063fff).ram()', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 509, sourceColumn: 2, sourceEndLine: 509, ram: true};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_main_map/range2'}) SET n:AddressRange SET n += {start: 524288, end: 528383, raw: 'map(0x080000, 0x080fff).rw(m_palette, FUNC(palette_device::read8), FUNC(palette_device::write8)).umask16(0x00ff).share("palette")', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 510, sourceColumn: 2, sourceEndLine: 510, share: 'palette', umask: 255};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_main_map/range3'}) SET n:AddressRange SET n += {start: 655360, end: 655361, raw: 'map(0x0a0000, 0x0a0001).portr("COINS").w(FUNC(tmnt_state::_0a0000_w))', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 511, sourceColumn: 2, sourceEndLine: 511, portRead: 'COINS'};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_main_map/range4'}) SET n:AddressRange SET n += {start: 655362, end: 655363, raw: 'map(0x0a0002, 0x0a0003).portr("P1")', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 512, sourceColumn: 2, sourceEndLine: 512, portRead: 'P1'};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_main_map/range5'}) SET n:AddressRange SET n += {start: 655364, end: 655365, raw: 'map(0x0a0004, 0x0a0005).portr("P2")', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 513, sourceColumn: 2, sourceEndLine: 513, portRead: 'P2'};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_main_map/range6'}) SET n:AddressRange SET n += {start: 655366, end: 655367, raw: 'map(0x0a0006, 0x0a0007).portr("P3")', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 514, sourceColumn: 2, sourceEndLine: 514, portRead: 'P3'};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_main_map/range7'}) SET n:AddressRange SET n += {start: 655369, end: 655369, raw: 'map(0x0a0009, 0x0a0009).w("soundlatch", FUNC(generic_latch_8_device::write))', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 515, sourceColumn: 2, sourceEndLine: 515};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_main_map/range8'}) SET n:AddressRange SET n += {start: 655376, end: 655377, raw: 'map(0x0a0010, 0x0a0011).portr("DSW1").w("watchdog", FUNC(watchdog_timer_device::reset16_w))', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 516, sourceColumn: 2, sourceEndLine: 516, portRead: 'DSW1'};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_main_map/range9'}) SET n:AddressRange SET n += {start: 655378, end: 655379, raw: 'map(0x0a0012, 0x0a0013).portr("DSW2")', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 517, sourceColumn: 2, sourceEndLine: 517, portRead: 'DSW2'};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_main_map/range10'}) SET n:AddressRange SET n += {start: 655380, end: 655381, raw: 'map(0x0a0014, 0x0a0015).portr("P4")', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 518, sourceColumn: 2, sourceEndLine: 518, portRead: 'P4'};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_main_map/range11'}) SET n:AddressRange SET n += {start: 655384, end: 655385, raw: 'map(0x0a0018, 0x0a0019).portr("DSW3")', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 519, sourceColumn: 2, sourceEndLine: 519, portRead: 'DSW3'};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_main_map/range12'}) SET n:AddressRange SET n += {start: 786432, end: 786433, raw: 'map(0x0c0000, 0x0c0001).w(FUNC(tmnt_state::priority_w))', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 520, sourceColumn: 2, sourceEndLine: 520};
MERGE (n:KG {id: 'handler:tmnt_state.priority_w'}) SET n:Handler SET n += {method: 'priority_w', ownerClass: 'tmnt_state', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 414, sourceColumn: 1, sourceEndLine: 435, sourceParameters: 'offs_t offset, uint16_t data', sourceBody: '/* bit 2/3 = priority; other bits unused */
	/* bit2 = PRI bit3 = PRI2
	      sprite/playfield priority is controlled by these two bits, by bit 3
	      of the background tile color code, and by the SHADOW sprite
	      attribute bit.
	      Priorities are encoded in a PROM (G19 for TMNT). However, in TMNT,
	      the PROM only takes into account the PRI and SHADOW bits.
	      PRI  Priority
	       0   bg fg spr text
	       1   bg spr fg text
	      The SHADOW bit, when set, torns a sprite into a shadow which makes
	      color below it darker (this is done by turning off three resistors
	      in parallel with the RGB output).

	      Note: the background color (color used when all of the four layers
	      are 0) is taken from the *foreground* palette, not the background
	      one as would be more intuitive.
	*/
	m_priority = (data & 0x0c) >> 2;'};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_main_map/range13'}) SET n:AddressRange SET n += {start: 1048576, end: 1081343, raw: 'map(0x100000, 0x107fff).rw(FUNC(tmnt_state::k052109_word_noA12_r), FUNC(tmnt_state::k052109_word_noA12_w))', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 521, sourceColumn: 2, sourceEndLine: 521};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_main_map/range14'}) SET n:AddressRange SET n += {start: 1310720, end: 1310727, raw: 'map(0x140000, 0x140007).rw(m_k051960, FUNC(k051960_device::k051937_r), FUNC(k051960_device::k051937_w))', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 523, sourceColumn: 2, sourceEndLine: 523};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_main_map/range15'}) SET n:AddressRange SET n += {start: 1311744, end: 1312767, raw: 'map(0x140400, 0x1407ff).rw(m_k051960, FUNC(k051960_device::k051960_r), FUNC(k051960_device::k051960_w))', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 524, sourceColumn: 2, sourceEndLine: 524};
MERGE (n:KG {id: 'handler:generic_latch_8_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 557, sourceColumn: 2, sourceEndLine: 557};
MERGE (n:KG {id: 'handler:k007232_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'k007232_device', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 544, sourceColumn: 2, sourceEndLine: 544};
MERGE (n:KG {id: 'handler:k007232_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'k007232_device', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 544, sourceColumn: 2, sourceEndLine: 544};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_audio_map'}) SET n:AddressMap SET n += {cls: 'tmnt_state', name: 'tmnt_audio_map', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 538, sourceColumn: 1, sourceEndLine: 549};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_audio_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom()', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 540, sourceColumn: 2, sourceEndLine: 540, rom: true};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_audio_map/range1'}) SET n:AddressRange SET n += {start: 32768, end: 34815, raw: 'map(0x8000, 0x87ff).ram()', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 541, sourceColumn: 2, sourceEndLine: 541, ram: true};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_audio_map/range2'}) SET n:AddressRange SET n += {start: 36864, end: 36864, raw: 'map(0x9000, 0x9000).rw(FUNC(tmnt_state::sres_r), FUNC(tmnt_state::sres_w))', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 542, sourceColumn: 2, sourceEndLine: 542};
MERGE (n:KG {id: 'handler:tmnt_state.sres_r'}) SET n:Handler SET n += {method: 'sres_r', ownerClass: 'tmnt_state', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 237, sourceColumn: 1, sourceEndLine: 240, sourceParameters: '', sourceBody: 'return m_tmnt_soundlatch;'};
MERGE (n:KG {id: 'handler:tmnt_state.sres_w'}) SET n:Handler SET n += {method: 'sres_w', ownerClass: 'tmnt_state', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 242, sourceColumn: 1, sourceEndLine: 256, sourceParameters: 'uint8_t data', sourceBody: '/* bit 1 resets the UPD7795C sound chip */
	m_upd7759->reset_w(BIT(data, 1));

	/* bit 2 plays the title music */
	if (BIT(data, 2))
	{
		if (!m_samples->playing(0))
			m_samples->start_raw(0, m_sampledata, 0x40000, 640000 / 32);
	}
	else
		m_samples->stop(0);
	m_tmnt_soundlatch = data;'};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_audio_map/range3'}) SET n:AddressRange SET n += {start: 40960, end: 40960, raw: 'map(0xa000, 0xa000).r("soundlatch", FUNC(generic_latch_8_device::read))', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 543, sourceColumn: 2, sourceEndLine: 543};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_audio_map/range4'}) SET n:AddressRange SET n += {start: 45056, end: 45069, raw: 'map(0xb000, 0xb00d).rw(m_k007232, FUNC(k007232_device::read), FUNC(k007232_device::write))', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 544, sourceColumn: 2, sourceEndLine: 544};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_audio_map/range5'}) SET n:AddressRange SET n += {start: 49152, end: 49153, raw: 'map(0xc000, 0xc001).rw("ymsnd", FUNC(ym2151_device::read), FUNC(ym2151_device::write))', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 545, sourceColumn: 2, sourceEndLine: 545};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_audio_map/range6'}) SET n:AddressRange SET n += {start: 53248, end: 53248, raw: 'map(0xd000, 0xd000).w(m_upd7759, FUNC(upd7759_device::port_w))', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 546, sourceColumn: 2, sourceEndLine: 546};
MERGE (n:KG {id: 'handler:upd7759_device.port_w'}) SET n:Handler SET n += {method: 'port_w', ownerClass: 'upd7759_device', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 560, sourceColumn: 2, sourceEndLine: 560};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_audio_map/range7'}) SET n:AddressRange SET n += {start: 57344, end: 57344, raw: 'map(0xe000, 0xe000).w(FUNC(tmnt_state::tmnt_upd_start_w))', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 547, sourceColumn: 2, sourceEndLine: 547};
MERGE (n:KG {id: 'handler:tmnt_state.tmnt_upd_start_w'}) SET n:Handler SET n += {method: 'tmnt_upd_start_w', ownerClass: 'tmnt_state', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 258, sourceColumn: 1, sourceEndLine: 261, sourceParameters: 'uint8_t data', sourceBody: 'm_upd7759->start_w(!BIT(data, 0));'};
MERGE (n:KG {id: 'map:tmnt_state.tmnt_audio_map/range8'}) SET n:AddressRange SET n += {start: 61440, end: 61440, raw: 'map(0xf000, 0xf000).r(FUNC(tmnt_state::tmnt_upd_busy_r))', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 548, sourceColumn: 2, sourceEndLine: 548};
MERGE (n:KG {id: 'handler:tmnt_state.tmnt_upd_busy_r'}) SET n:Handler SET n += {method: 'tmnt_upd_busy_r', ownerClass: 'tmnt_state', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 263, sourceColumn: 1, sourceEndLine: 266, sourceParameters: '', sourceBody: 'return m_upd7759->busy_r() ? 1 : 0;'};
MERGE (n:KG {id: 'handler:tmnt_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'tmnt_state', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 814, sourceColumn: 1, sourceEndLine: 820, sourceParameters: '', sourceBody: 'm_last = 0;
	m_tmnt_soundlatch = 0;
	m_irq5_mask = 0;
	m_maincpu->set_input_line(M68K_IRQ_5, CLEAR_LINE);'};
MERGE (n:KG {id: 'handler:tmnt_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'tmnt_state', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 445, sourceColumn: 1, sourceEndLine: 454, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'm_k052109->tilemap_draw(screen, bitmap, cliprect, 2, TILEMAP_DRAW_OPAQUE,0);
	if ((m_priority & 1) == 1) m_k051960->k051960_sprites_draw(bitmap, cliprect, screen.priority(), 0, 0);
	m_k052109->tilemap_draw(screen, bitmap, cliprect, 1, 0, 0);
	if ((m_priority & 1) == 0) m_k051960->k051960_sprites_draw(bitmap, cliprect, screen.priority(), 0, 0);
	m_k052109->tilemap_draw(screen, bitmap, cliprect, 0, 0, 0);

	return 0;'};
MERGE (n:KG {id: 'handler:k052109_device.tilemap_draw'}) SET n:Handler SET n += {method: 'tilemap_draw', ownerClass: 'k052109_device', sourceFile: 'src/mame/konami/k052109.cpp', sourceLine: 648, sourceColumn: 1, sourceEndLine: 651, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect, int tmap_num, u32 flags, u8 priority, u8 priority_mask', sourceBody: 'm_tilemap[tmap_num]->draw(screen, bitmap, cliprect, flags, priority, priority_mask);'};
MERGE (n:KG {id: 'handler:k051960_device.k051960_sprites_draw'}) SET n:Handler SET n += {method: 'k051960_sprites_draw', ownerClass: 'k051960_device', sourceFile: 'src/mame/konami/k051960.cpp', sourceLine: 418, sourceColumn: 1, sourceEndLine: 618, sourceConstants: ['NUM_SPRITES=128'], sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect, bitmap_ind8 &priority_bitmap, int min_priority, int max_priority', sourceBody: 'static constexpr int NUM_SPRITES = 128;

	int offs, pri_code;
	int sortedlist[NUM_SPRITES];
	u8 drawmode_table[256];

	memset(drawmode_table, DRAWMODE_SOURCE, sizeof(drawmode_table));
	drawmode_table[0] = DRAWMODE_NONE;

	const u32 shadow_mode = (m_priority_shadows || palette().shadow_mode()) ? DRAWMODE_SHADOW_PRI : DRAWMODE_SHADOW;

	for (offs = 0; offs < NUM_SPRITES; offs++)
		sortedlist[offs] = -1;

	/* prebuild a sorted table */
	for (offs = 0; offs < 0x400; offs += 8)
	{
		if (m_buffer[offs] & 0x80)
		{
			pri_code = m_buffer[offs] & 0x7f;
			if (max_priority == -1) /* draw front to back when using priority buffer */
				pri_code ^= 0x7f;

			sortedlist[pri_code] = offs;
		}
	}

	for (pri_code = 0; pri_code < NUM_SPRITES; pri_code++)
	{
		int ox, oy, size, w, h, x, y, flipx, flipy, zoomx, zoomy;
		/* sprites can be grouped up to 8x8. The draw order is
		     0  1  4  5 16 17 20 21
		     2  3  6  7 18 19 22 23
		     8  9 12 13 24 25 28 29
		    10 11 14 15 26 27 30 31
		    32 33 36 37 48 49 52 53
		    34 35 38 39 50 51 54 55
		    40 41 44 45 56 57 60 61
		    42 43 46 47 58 59 62 63
		*/
		
		
		
		

		offs = sortedlist[pri_code];
		if (offs == -1)
			continue;

		int code = m_buffer[offs + 2] + ((m_buffer[offs + 1] & 0x1f) << 8);
		int color = m_buffer[offs + 3] & 0xff;
		int pri = 0;
		bool shadow = !BIT(m_shadow_config, 2) && (BIT(m_shadow_config, 1) || BIT(color, 7));

		m_k051960_cb(code, color, pri, shadow);

		if (max_priority != -1)
			if (pri < min_priority || pri > max_priority)
				continue;

		size = (m_buffer[offs + 1] & 0xe0) >> 5;
		w = TABLE(size, 1, 2, 1, 2, 4, 2, 4, 8);
		h = TABLE(size, 1, 1, 2, 2, 2, 4, 4, 8);

		if (w >= 2) code &= ~0x01;
		if (h >= 2) code &= ~0x02;
		if (w >= 4) code &= ~0x04;
		if (h >= 4) code &= ~0x08;
		if (w >= 8) code &= ~0x10;
		if (h >= 8) code &= ~0x20;

		ox = (256 * m_buffer[offs + 6] + m_buffer[offs + 7]) & 0x01ff;
		oy = 256 - ((256 * m_buffer[offs + 4] + m_buffer[offs + 5]) & 0x01ff);
		flipx = m_buffer[offs + 6] & 0x02;
		flipy = m_buffer[offs + 4] & 0x02;

		// X zoom is linear, 128x128 factors are accurate compared to PCB, but
		// off-by-1 at several places for smaller sprite sizes.
		zoomx = (m_buffer[offs + 6] & 0xfc) >> 2;
		zoomx = 0x10000 / 128 * (128 - zoomx);

		// Y zoom is not linear, it can\'t be expressed as an exponential function.
		// These values were visually obtained from Devastators.
		

		zoomy = (m_buffer[offs + 4] & 0xfc) >> 2;
		zoomy = 128 - TABLE(zoomy, 0x00, 0x01, 0x03, 0x05, 0x07, 0x09, 0x0a, 0x0c, 0x0e, 0x0f, 0x11, 0x12, 0x14, 0x15, 0x16, 0x18, 0x19, 0x1a, 0x1c, 0x1d, 0x1e, 0x1f, 0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2a, 0x2b, 0x2c, 0x2d, 0x2e, 0x2e, 0x2f, 0x30, 0x31, 0x31, 0x32, 0x33, 0x34, 0x34, 0x35, 0x36, 0x36, 0x37, 0x38, 0x38, 0x39, 0x39, 0x3a, 0x3b, 0x3b, 0x3c, 0x3c, 0x3d, 0x3d, 0x3e, 0x3e, 0x3f);

		// accumulated rounding up for each sprite height
		for (int i = 0; i < 3; i++)
			if (h <= (1 << i)) zoomy = (zoomy + 1) / 2;

		zoomy *= 8 / h;
		zoomy = 0x10000 / 128 * zoomy;

		if (BIT(m_control, 3))
		{
			ox = 512 - (zoomx * w >> 12) - ox;
			oy = 256 - (zoomy * h >> 12) - oy;
			flipx = !flipx;
			flipy = !flipy;
		}

		drawmode_table[gfx(0)->granularity() - 1] = shadow ? shadow_mode : DRAWMODE_SOURCE;

		if (zoomx == 0x10000 && zoomy == 0x10000)
		{
			int sx, sy;

			for (y = 0; y < h; y++)
			{
				sy = oy + 16 * y;

				for (x = 0; x < w; x++)
				{
					int c = code;

					sx = ox + 16 * x;
					if (flipx)
						c += TABLE((w - 1 - x), 0, 1, 4, 5, 16, 17, 20, 21);
					else
						c += TABLE(x, 0, 1, 4, 5, 16, 17, 20, 21);

					if (flipy)
						c += TABLE((h - 1 - y), 0, 2, 8, 10, 32, 34, 40, 42);
					else
						c += TABLE(y, 0, 2, 8, 10, 32, 34, 40, 42);

					if (max_priority == -1)
						gfx(0)->prio_transtable(bitmap,cliprect,
								c,color,
								flipx,flipy,
								(sx & 0x1ff) - 96, sy,
								priority_bitmap,pri,
								drawmode_table);
					else
						gfx(0)->transtable(bitmap,cliprect,
								c,color,
								flipx,flipy,
								(sx & 0x1ff) - 96, sy,
								drawmode_table);
				}
			}
		}
		else
		{
			int sx, sy, zw, zh;

			for (y = 0; y < h; y++)
			{
				sy = oy + ((zoomy * y + (1 << 11)) >> 12);
				zh = (oy + ((zoomy * (y + 1) + (1 << 11)) >> 12)) - sy;

				for (x = 0; x < w; x++)
				{
					int c = code;

					sx = ox + ((zoomx * x + (1 << 11)) >> 12);
					zw = (ox + ((zoomx * (x + 1) + (1 << 11)) >> 12)) - sx;
					if (flipx)
						c += TABLE((w - 1 - x), 0, 1, 4, 5, 16, 17, 20, 21);
					else
						c += TABLE(x, 0, 1, 4, 5, 16, 17, 20, 21);

					if (flipy)
						c += TABLE((h - 1 - y), 0, 2, 8, 10, 32, 34, 40, 42);
					else
						c += TABLE(y, 0, 2, 8, 10, 32, 34, 40, 42);

					if (max_priority == -1)
						gfx(0)->prio_zoom_transtable(bitmap,cliprect,
								c,color,
								flipx,flipy,
								(sx & 0x1ff) - 96, sy,
								(zw << 16) / 16,(zh << 16) / 16,
								priority_bitmap,pri,
								drawmode_table);
					else
						gfx(0)->zoom_transtable(bitmap,cliprect,
								c,color,
								flipx,flipy,
								(sx & 0x1ff) - 96, sy,
								(zw << 16) / 16,(zh << 16) / 16,
								drawmode_table);
				}
			}
		}
	}'};
MERGE (n:KG {id: 'handler:tmnt_state.vblank_w'}) SET n:Handler SET n += {method: 'vblank_w', ownerClass: 'tmnt_state', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 230, sourceColumn: 1, sourceEndLine: 234, sourceParameters: 'int state', sourceBody: 'if (state && m_irq5_mask)
		m_maincpu->set_input_line(M68K_IRQ_5, ASSERT_LINE);'};
MERGE (n:KG {id: 'handler:tmnt_state.volume_callback'}) SET n:Handler SET n += {method: 'volume_callback', ownerClass: 'tmnt_state', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 801, sourceColumn: 1, sourceEndLine: 805, sourceParameters: 'uint8_t data', sourceBody: 'm_k007232->set_volume(0, (data >> 4) * 0x11, 0);
	m_k007232->set_volume(1, 0, (data & 0x0f) * 0x11);'};
MERGE (n:KG {id: 'machine:tmnt_state.tmnt'}) SET n:MachineConfig SET n += {cls: 'tmnt_state', name: 'tmnt', calls: [], stateMembers: ['{"name":"m_layer_colorbase","bits":16,"arrayLength":3}', '{"name":"m_sprite_colorbase","bits":16}', '{"name":"m_priority","bits":16}', '{"name":"m_tmnt_soundlatch","bits":8}', '{"name":"m_last","bits":32,"signed":true}', '{"name":"m_irq5_mask","bits":8}', '{"name":"m_cuebrick_nvram","bits":16}', '{"name":"m_sampledata","bits":16,"signed":true,"arrayLength":262144}'], resetHandlers: ['tmnt_state.machine_reset_tmnt'], startHandlers: ['tmnt_state.video_start_tmnt'], sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 926, sourceColumn: 1, sourceEndLine: 983};
MERGE (n:KG {id: 'handler:tmnt_state.machine_reset_tmnt'}) SET n:Handler SET n += {method: 'machine_reset_tmnt', ownerClass: 'tmnt_state', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 917, sourceColumn: 1, sourceEndLine: 924, sourceParameters: '', sourceBody: 'machine_reset();

	/* the UPD7759 control flip-flops are cleared: /ST is 1, /RESET is 0 */
	m_upd7759->start_w(1);
	m_upd7759->reset_w(0);'};
MERGE (n:KG {id: 'handler:tmnt_state.video_start_tmnt'}) SET n:Handler SET n += {method: 'video_start_tmnt', ownerClass: 'tmnt_state', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 371, sourceColumn: 1, sourceEndLine: 382, sourceParameters: '', sourceBody: 'm_layer_colorbase[0] = 0;
	m_layer_colorbase[1] = 32;
	m_layer_colorbase[2] = 40;
	m_sprite_colorbase = 16;

	m_priority = 0;
	save_item(NAME(m_priority));

	m_palette->set_shadow_factor(0.75);'};
MERGE (n:KG {id: 'device:tmnt_state.tmnt/maincpu'}) SET n:Device SET n += {type: 'M68000', tag: 'maincpu', clock: 8000000, config: ['M68000(config, m_maincpu, 24_MHz_XTAL / 3)', 'm_maincpu->set_addrmap(AS_PROGRAM, &tmnt_state::tmnt_main_map)'], sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 929, sourceColumn: 2, sourceEndLine: 929};
MERGE (n:KG {id: 'device:tmnt_state.tmnt/audiocpu'}) SET n:Device SET n += {type: 'Z80', tag: 'audiocpu', clock: 3579545, config: ['Z80(config, m_audiocpu, 3.579545_MHz_XTAL)', 'm_audiocpu->set_addrmap(AS_PROGRAM, &tmnt_state::tmnt_audio_map)'], sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 932, sourceColumn: 2, sourceEndLine: 932};
MERGE (n:KG {id: 'device:tmnt_state.tmnt/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog")']};
MERGE (n:KG {id: 'device:tmnt_state.tmnt/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['screen_device &screen(SCREEN(config, "screen", SCREEN_TYPE_RASTER))', 'screen.set_raw(24_MHz_XTAL / 4, 384, 0, 320, 264, 16, 240)', 'screen.set_screen_update(FUNC(tmnt_state::screen_update))', 'screen.set_palette(m_palette)', 'screen.screen_vblank().set(FUNC(tmnt_state::vblank_w))'], sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 940, sourceColumn: 2, sourceEndLine: 940, configCalls: ['set_raw(6000000,384,0,320,264,16,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6000000, 384, 0, 320, 264, 16, 240], screenRawExpr: ['24_MHz_XTAL / 4', '384', '0', '320', '264', '16', '240']};
MERGE (n:KG {id: 'device:tmnt_state.tmnt/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'screen.set_screen_update(FUNC(tmnt_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 942, sourceColumn: 2, sourceEndLine: 942, targetClass: 'tmnt_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'device:tmnt_state.tmnt/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set', raw: 'screen.screen_vblank().set(FUNC(tmnt_state::vblank_w))', ownerTag: 'screen', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 944, sourceColumn: 2, sourceEndLine: 944, targetClass: 'tmnt_state', targetMethod: 'vblank_w'};
MERGE (n:KG {id: 'device:tmnt_state.tmnt/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette).set_format(palette_device::xBGR_555, 1024)', 'm_palette->set_membits(8)', 'm_palette->enable_shadows()', 'm_palette->enable_highlights()'], sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 946, sourceColumn: 2, sourceEndLine: 946, configCalls: ['set_membits(8)', 'enable_shadows()', 'enable_highlights()']};
MERGE (n:KG {id: 'device:tmnt_state.tmnt/k052109'}) SET n:Device SET n += {type: 'K052109', tag: 'k052109', clock: 24000000, config: ['K052109(config, m_k052109, 24_MHz_XTAL)', 'm_k052109->set_palette(m_palette)', 'm_k052109->set_screen("screen")', 'm_k052109->set_tile_callback(FUNC(tmnt_state::tmnt_tile_callback))'], cls: 'k052109_device', clsHierarchy: ['k052109_device']};
MERGE (n:KG {id: 'device:tmnt_state.tmnt/k052109/callback:k052109:0'}) SET n:Callback SET n += {signal: 'set_tile_callback', delegate: 1, operation: 'set_tile_callback', raw: 'm_k052109->set_tile_callback(FUNC(tmnt_state::tmnt_tile_callback))', ownerTag: 'k052109', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 956, sourceColumn: 2, sourceEndLine: 956, targetClass: 'tmnt_state', targetMethod: 'tmnt_tile_callback'};
MERGE (n:KG {id: 'handler:tmnt_state.tmnt_tile_callback'}) SET n:Handler SET n += {method: 'tmnt_tile_callback', ownerClass: 'tmnt_state', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 320, sourceColumn: 1, sourceEndLine: 324, sourceParameters: 'int layer, int bank, int &code, int &color, int &flags, int &priority', sourceBody: 'code |= ((color & 0x03) << 8) | ((color & 0x10) << 6) | ((color & 0x0c) << 9) | (bank << 13);
	color = m_layer_colorbase[layer] + ((color & 0xe0) >> 5);'};
MERGE (n:KG {id: 'device:tmnt_state.tmnt/k051960'}) SET n:Device SET n += {type: 'K051960', tag: 'k051960', clock: 24000000, config: ['K051960(config, m_k051960, 24_MHz_XTAL)', 'm_k051960->set_palette(m_palette)', 'm_k051960->set_screen("screen")', 'm_k051960->set_sprite_callback(FUNC(tmnt_state::tmnt_sprite_callback))', 'm_k051960->set_plane_order(K051960_PLANEORDER_MIA)'], cls: 'k051960_device', clsHierarchy: ['k051960_device'], sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 958, sourceColumn: 2, sourceEndLine: 958, configCalls: ['set_plane_order(1)']};
MERGE (n:KG {id: 'device:tmnt_state.tmnt/k051960/callback:k051960:0'}) SET n:Callback SET n += {signal: 'set_sprite_callback', delegate: 1, operation: 'set_sprite_callback', raw: 'm_k051960->set_sprite_callback(FUNC(tmnt_state::tmnt_sprite_callback))', ownerTag: 'k051960', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 961, sourceColumn: 2, sourceEndLine: 961, targetClass: 'tmnt_state', targetMethod: 'tmnt_sprite_callback'};
MERGE (n:KG {id: 'handler:tmnt_state.tmnt_sprite_callback'}) SET n:Handler SET n += {method: 'tmnt_sprite_callback', ownerClass: 'tmnt_state', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 339, sourceColumn: 1, sourceEndLine: 343, sourceParameters: 'int &code, int &color, int &priority, bool &shadow', sourceBody: 'code |= (color & 0x10) << 9;
	color = m_sprite_colorbase + (color & 0x0f);'};
MERGE (n:KG {id: 'device:tmnt_state.tmnt/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 965, sourceColumn: 2, sourceEndLine: 965};
MERGE (n:KG {id: 'device:tmnt_state.tmnt/soundlatch'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch', clock: null, config: ['GENERIC_LATCH_8(config, "soundlatch")'], sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 967, sourceColumn: 2, sourceEndLine: 967};
MERGE (n:KG {id: 'device:tmnt_state.tmnt/ymsnd'}) SET n:Device SET n += {type: 'YM2151', tag: 'ymsnd', clock: 3579545, config: ['ym2151_device &ymsnd(YM2151(config, "ymsnd", 3.579545_MHz_XTAL))', 'ymsnd.add_route(0, "mono", 0.40)', 'ymsnd.add_route(1, "mono", 0.40)'], sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 969, sourceColumn: 2, sourceEndLine: 969};
MERGE (n:KG {id: 'audioroute:device:tmnt_state.tmnt/ymsnd/0'}) SET n:AudioRoute SET n += {output: '0', target: 'mono', gain: 0.4, raw: 'ymsnd.add_route(0, "mono", 0.40)', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 970, sourceColumn: 2, sourceEndLine: 970};
MERGE (n:KG {id: 'audioroute:device:tmnt_state.tmnt/ymsnd/1'}) SET n:AudioRoute SET n += {output: '1', target: 'mono', gain: 0.4, raw: 'ymsnd.add_route(1, "mono", 0.40)', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 971, sourceColumn: 2, sourceEndLine: 971};
MERGE (n:KG {id: 'device:tmnt_state.tmnt/k007232'}) SET n:Device SET n += {type: 'K007232', tag: 'k007232', clock: 3579545, config: ['K007232(config, m_k007232, 3.579545_MHz_XTAL)', 'm_k007232->port_write().set(FUNC(tmnt_state::volume_callback))', 'm_k007232->add_route(0, "mono", 0.15)', 'm_k007232->add_route(1, "mono", 0.15)'], sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 973, sourceColumn: 2, sourceEndLine: 973};
MERGE (n:KG {id: 'audioroute:device:tmnt_state.tmnt/k007232/0'}) SET n:AudioRoute SET n += {output: '0', target: 'mono', gain: 0.15, raw: 'm_k007232->add_route(0, "mono", 0.15)', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 975, sourceColumn: 2, sourceEndLine: 975};
MERGE (n:KG {id: 'audioroute:device:tmnt_state.tmnt/k007232/1'}) SET n:AudioRoute SET n += {output: '1', target: 'mono', gain: 0.15, raw: 'm_k007232->add_route(1, "mono", 0.15)', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 976, sourceColumn: 2, sourceEndLine: 976};
MERGE (n:KG {id: 'device:tmnt_state.tmnt/k007232/callback:k007232:0'}) SET n:Callback SET n += {signal: 'port_write', operation: 'set', raw: 'm_k007232->port_write().set(FUNC(tmnt_state::volume_callback))', ownerTag: 'k007232', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 974, sourceColumn: 2, sourceEndLine: 974, targetClass: 'tmnt_state', targetMethod: 'volume_callback'};
MERGE (n:KG {id: 'device:tmnt_state.tmnt/upd'}) SET n:Device SET n += {type: 'UPD7759', tag: 'upd', clock: 640000, config: ['UPD7759(config, "upd", 640_kHz_XTAL).add_route(ALL_OUTPUTS, "mono", 0.30)'], sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 978, sourceColumn: 2, sourceEndLine: 978};
MERGE (n:KG {id: 'audioroute:device:tmnt_state.tmnt/upd/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.3, raw: 'UPD7759(config, "upd", 640_kHz_XTAL).add_route(ALL_OUTPUTS, "mono", 0.30)', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 978, sourceColumn: 2, sourceEndLine: 978};
MERGE (n:KG {id: 'device:tmnt_state.tmnt/samples'}) SET n:Device SET n += {type: 'SAMPLES', tag: 'samples', clock: null, config: ['SAMPLES(config, m_samples)', 'm_samples->set_channels(1)', 'm_samples->add_route(ALL_OUTPUTS, "mono", 0.25)'], sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 980, sourceColumn: 2, sourceEndLine: 980, configCalls: ['set_channels(1)']};
MERGE (n:KG {id: 'audioroute:device:tmnt_state.tmnt/samples/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.25, raw: 'm_samples->add_route(ALL_OUTPUTS, "mono", 0.25)', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 982, sourceColumn: 2, sourceEndLine: 982};
MERGE (n:KG {id: 'inputs:tmnt'}) SET n:InputPorts SET n += {name: 'tmnt', sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 671, sourceColumn: 8, sourceEndLine: 671};
MERGE (n:KG {id: 'inputs:tmnt/COINS'}) SET n:Port SET n += {tag: 'COINS', modify: false};
MERGE (n:KG {id: 'inputs:tmnt/COINS/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_COIN1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:tmnt/COINS/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_COIN2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:tmnt/COINS/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_COIN3', defaultValue: 4};
MERGE (n:KG {id: 'inputs:tmnt/COINS/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_COIN4', defaultValue: 8};
MERGE (n:KG {id: 'inputs:tmnt/COINS/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_SERVICE1', defaultValue: 16};
MERGE (n:KG {id: 'inputs:tmnt/COINS/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_SERVICE2', defaultValue: 32};
MERGE (n:KG {id: 'inputs:tmnt/COINS/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_SERVICE3', defaultValue: 64};
MERGE (n:KG {id: 'inputs:tmnt/COINS/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_SERVICE4', defaultValue: 128};
MERGE (n:KG {id: 'inputs:tmnt/P1'}) SET n:Port SET n += {tag: 'P1', modify: false};
MERGE (n:KG {id: 'inputs:tmnt/P1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_PLAYER(1)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:tmnt/P1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_PLAYER(1)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:tmnt/P1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_PLAYER(1)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:tmnt/P1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_PLAYER(1)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:tmnt/P1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(1)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:tmnt/P1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(1)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:tmnt/P1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', modifiers: ['PORT_PLAYER(1)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:tmnt/P1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:tmnt/P2'}) SET n:Port SET n += {tag: 'P2', modify: false};
MERGE (n:KG {id: 'inputs:tmnt/P2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_PLAYER(2)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:tmnt/P2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_PLAYER(2)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:tmnt/P2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_PLAYER(2)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:tmnt/P2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_PLAYER(2)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:tmnt/P2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(2)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:tmnt/P2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(2)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:tmnt/P2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', modifiers: ['PORT_PLAYER(2)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:tmnt/P2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:tmnt/P3'}) SET n:Port SET n += {tag: 'P3', modify: false};
MERGE (n:KG {id: 'inputs:tmnt/P3/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_PLAYER(3)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:tmnt/P3/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_PLAYER(3)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:tmnt/P3/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_PLAYER(3)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:tmnt/P3/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_PLAYER(3)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:tmnt/P3/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(3)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:tmnt/P3/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(3)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:tmnt/P3/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', modifiers: ['PORT_PLAYER(3)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:tmnt/P3/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:tmnt/P4'}) SET n:Port SET n += {tag: 'P4', modify: false};
MERGE (n:KG {id: 'inputs:tmnt/P4/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_PLAYER(4)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:tmnt/P4/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_PLAYER(4)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:tmnt/P4/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_PLAYER(4)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:tmnt/P4/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_PLAYER(4)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:tmnt/P4/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(4)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:tmnt/P4/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(4)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:tmnt/P4/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', modifiers: ['PORT_PLAYER(4)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:tmnt/P4/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:tmnt/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:tmnt/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 15, modifiers: ['PORT_DIPLOCATION("SW1:1,2,3,4")'], name: 'Coinage', defaultValue: 15, location: 'SW1:1,2,3,4', settings: ['0=5C 1C', '2=4C 1C', '5=3C 1C', '8=2C 1C', '4=3C 2C', '1=4C 3C', '15=1C 1C', '3=3C 4C', '7=2C 3C', '14=1C 2C', '6=2C 5C', '13=1C 3C', '12=1C 4C', '11=1C 5C', '10=1C 6C', '9=1C 7C']};
MERGE (n:KG {id: 'inputs:tmnt/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 16, name: 'Unused', defaultValue: 16};
MERGE (n:KG {id: 'inputs:tmnt/DSW1/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 32, name: 'Unused', defaultValue: 32};
MERGE (n:KG {id: 'inputs:tmnt/DSW1/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 64, name: 'Unused', defaultValue: 64};
MERGE (n:KG {id: 'inputs:tmnt/DSW1/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Unused', defaultValue: 128};
MERGE (n:KG {id: 'inputs:tmnt/DSW2'}) SET n:Port SET n += {tag: 'DSW2', modify: false};
MERGE (n:KG {id: 'inputs:tmnt/DSW2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SW2:1,2")'], name: 'Lives', defaultValue: 2, location: 'SW2:1,2', settings: ['3=1', '2=2', '1=3', '0=5']};
MERGE (n:KG {id: 'inputs:tmnt/DSW2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 4, name: 'Unused', defaultValue: 4};
MERGE (n:KG {id: 'inputs:tmnt/DSW2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 8, name: 'Unused', defaultValue: 8};
MERGE (n:KG {id: 'inputs:tmnt/DSW2/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 16, name: 'Unused', defaultValue: 16};
MERGE (n:KG {id: 'inputs:tmnt/DSW2/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 96, modifiers: ['PORT_DIPLOCATION("SW2:6,7")'], name: 'Difficulty', defaultValue: 64, location: 'SW2:6,7', settings: ['96=Easy', '64=Normal', '32=Difficult', '0=Very Difficult']};
MERGE (n:KG {id: 'inputs:tmnt/DSW2/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("SW2:8")'], name: 'Demo Sounds', defaultValue: 0, location: 'SW2:8', settings: ['128=Off', '0=On']};
MERGE (n:KG {id: 'inputs:tmnt/DSW3'}) SET n:Port SET n += {tag: 'DSW3', modify: false};
MERGE (n:KG {id: 'inputs:tmnt/DSW3/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, modifiers: ['PORT_DIPLOCATION("SW3:1")'], name: 'Flip Screen', defaultValue: 1, location: 'SW3:1', settings: ['1=Off', '0=On']};
MERGE (n:KG {id: 'inputs:tmnt/DSW3/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, name: 'Unused', defaultValue: 2};
MERGE (n:KG {id: 'inputs:tmnt/DSW3/f2'}) SET n:PortField SET n += {kind: 'service', mask: 4, activeLow: true, defaultValue: 4};
MERGE (n:KG {id: 'inputs:tmnt/DSW3/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 8, name: 'Unused', defaultValue: 8};
MERGE (n:KG {id: 'inputs:tmnt/DSW3/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 240, activeLow: true, type: 'IPT_UNUSED', defaultValue: 240};
MATCH (a:KG {id: 'game:tmnt'}), (b:KG {id: 'file:src/mame/konami/tmnt.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 1723, sourceColumn: 1, sourceEndLine: 1723};
MATCH (a:KG {id: 'game:tmnt'}), (b:KG {id: 'machine:tmnt_state.tmnt'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:tmnt'}), (b:KG {id: 'inputs:tmnt'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:tmnt'}), (b:KG {id: 'romset:tmnt'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tmnt.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tmnt.cpp'}), (b:KG {id: 'file:k052109.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tmnt.cpp'}), (b:KG {id: 'file:k051960.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tmnt.cpp'}), (b:KG {id: 'file:konamipt.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tmnt.cpp'}), (b:KG {id: 'file:cpu/m68000/m68000.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tmnt.cpp'}), (b:KG {id: 'file:cpu/m6805/m68705.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tmnt.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tmnt.cpp'}), (b:KG {id: 'file:machine/gen_latch.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tmnt.cpp'}), (b:KG {id: 'file:machine/nvram.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tmnt.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tmnt.cpp'}), (b:KG {id: 'file:sound/k007232.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tmnt.cpp'}), (b:KG {id: 'file:sound/msm5205.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tmnt.cpp'}), (b:KG {id: 'file:sound/samples.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tmnt.cpp'}), (b:KG {id: 'file:sound/upd7759.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tmnt.cpp'}), (b:KG {id: 'file:sound/ymopm.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tmnt.cpp'}), (b:KG {id: 'file:emupal.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tmnt.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tmnt.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tmnt.cpp'}), (b:KG {id: 'file:tilemap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/tmnt.cpp'}), (b:KG {id: 'file:ymfm/src/ymfm.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:tmnt_state.tmnt'}), (b:KG {id: 'file:src/mame/konami/tmnt.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 926, sourceColumn: 1, sourceEndLine: 983};
MATCH (a:KG {id: 'machine:tmnt_state.tmnt'}), (b:KG {id: 'handler:tmnt_state.machine_reset_tmnt'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:tmnt_state.tmnt'}), (b:KG {id: 'handler:tmnt_state.video_start_tmnt'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:tmnt_state.tmnt'}), (b:KG {id: 'device:tmnt_state.tmnt/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tmnt_state.tmnt'}), (b:KG {id: 'device:tmnt_state.tmnt/audiocpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tmnt_state.tmnt'}), (b:KG {id: 'device:tmnt_state.tmnt/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tmnt_state.tmnt'}), (b:KG {id: 'device:tmnt_state.tmnt/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tmnt_state.tmnt'}), (b:KG {id: 'device:tmnt_state.tmnt/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tmnt_state.tmnt'}), (b:KG {id: 'device:tmnt_state.tmnt/k052109'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tmnt_state.tmnt'}), (b:KG {id: 'device:tmnt_state.tmnt/k051960'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tmnt_state.tmnt'}), (b:KG {id: 'device:tmnt_state.tmnt/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tmnt_state.tmnt'}), (b:KG {id: 'device:tmnt_state.tmnt/soundlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tmnt_state.tmnt'}), (b:KG {id: 'device:tmnt_state.tmnt/ymsnd'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tmnt_state.tmnt'}), (b:KG {id: 'device:tmnt_state.tmnt/k007232'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tmnt_state.tmnt'}), (b:KG {id: 'device:tmnt_state.tmnt/upd'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:tmnt_state.tmnt'}), (b:KG {id: 'device:tmnt_state.tmnt/samples'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:tmnt'}), (b:KG {id: 'file:src/mame/konami/tmnt.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 671, sourceColumn: 8, sourceEndLine: 671};
MATCH (a:KG {id: 'inputs:tmnt'}), (b:KG {id: 'inputs:tmnt/COINS'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:tmnt'}), (b:KG {id: 'inputs:tmnt/P1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:tmnt'}), (b:KG {id: 'inputs:tmnt/P2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:tmnt'}), (b:KG {id: 'inputs:tmnt/P3'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:tmnt'}), (b:KG {id: 'inputs:tmnt/P4'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:tmnt'}), (b:KG {id: 'inputs:tmnt/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:tmnt'}), (b:KG {id: 'inputs:tmnt/DSW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:tmnt'}), (b:KG {id: 'inputs:tmnt/DSW3'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:tmnt'}), (b:KG {id: 'file:src/mame/konami/tmnt.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 1075, sourceColumn: 1, sourceEndLine: 1075};
MATCH (a:KG {id: 'romset:tmnt'}), (b:KG {id: 'region:tmnt/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:tmnt'}), (b:KG {id: 'region:tmnt/audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:tmnt'}), (b:KG {id: 'region:tmnt/k052109'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:tmnt'}), (b:KG {id: 'region:tmnt/k051960'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:tmnt'}), (b:KG {id: 'region:tmnt/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:tmnt'}), (b:KG {id: 'region:tmnt/k007232'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:tmnt'}), (b:KG {id: 'region:tmnt/upd'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:tmnt'}), (b:KG {id: 'region:tmnt/title'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:tmnt_state.machine_reset_tmnt'}), (b:KG {id: 'handler:tmnt_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:tmnt_state.tmnt/maincpu'}), (b:KG {id: 'map:tmnt_state.tmnt_main_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:tmnt_state.tmnt/audiocpu'}), (b:KG {id: 'map:tmnt_state.tmnt_audio_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:tmnt_state.tmnt/screen'}), (b:KG {id: 'device:tmnt_state.tmnt/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:tmnt_state.tmnt/screen'}), (b:KG {id: 'device:tmnt_state.tmnt/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:tmnt_state.tmnt/k052109'}), (b:KG {id: 'device:tmnt_state.tmnt/k052109/callback:k052109:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:tmnt_state.tmnt/k051960'}), (b:KG {id: 'device:tmnt_state.tmnt/k051960/callback:k051960:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:tmnt_state.tmnt/ymsnd'}), (b:KG {id: 'audioroute:device:tmnt_state.tmnt/ymsnd/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:tmnt_state.tmnt/ymsnd'}), (b:KG {id: 'audioroute:device:tmnt_state.tmnt/ymsnd/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:tmnt_state.tmnt/k007232'}), (b:KG {id: 'audioroute:device:tmnt_state.tmnt/k007232/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:tmnt_state.tmnt/k007232'}), (b:KG {id: 'audioroute:device:tmnt_state.tmnt/k007232/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:tmnt_state.tmnt/k007232'}), (b:KG {id: 'device:tmnt_state.tmnt/k007232/callback:k007232:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:tmnt_state.tmnt/upd'}), (b:KG {id: 'audioroute:device:tmnt_state.tmnt/upd/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:tmnt_state.tmnt/samples'}), (b:KG {id: 'audioroute:device:tmnt_state.tmnt/samples/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:tmnt/COINS'}), (b:KG {id: 'inputs:tmnt/COINS/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/COINS'}), (b:KG {id: 'inputs:tmnt/COINS/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/COINS'}), (b:KG {id: 'inputs:tmnt/COINS/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/COINS'}), (b:KG {id: 'inputs:tmnt/COINS/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/COINS'}), (b:KG {id: 'inputs:tmnt/COINS/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/COINS'}), (b:KG {id: 'inputs:tmnt/COINS/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/COINS'}), (b:KG {id: 'inputs:tmnt/COINS/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/COINS'}), (b:KG {id: 'inputs:tmnt/COINS/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P1'}), (b:KG {id: 'inputs:tmnt/P1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P1'}), (b:KG {id: 'inputs:tmnt/P1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P1'}), (b:KG {id: 'inputs:tmnt/P1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P1'}), (b:KG {id: 'inputs:tmnt/P1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P1'}), (b:KG {id: 'inputs:tmnt/P1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P1'}), (b:KG {id: 'inputs:tmnt/P1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P1'}), (b:KG {id: 'inputs:tmnt/P1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P1'}), (b:KG {id: 'inputs:tmnt/P1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P2'}), (b:KG {id: 'inputs:tmnt/P2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P2'}), (b:KG {id: 'inputs:tmnt/P2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P2'}), (b:KG {id: 'inputs:tmnt/P2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P2'}), (b:KG {id: 'inputs:tmnt/P2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P2'}), (b:KG {id: 'inputs:tmnt/P2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P2'}), (b:KG {id: 'inputs:tmnt/P2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P2'}), (b:KG {id: 'inputs:tmnt/P2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P2'}), (b:KG {id: 'inputs:tmnt/P2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P3'}), (b:KG {id: 'inputs:tmnt/P3/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P3'}), (b:KG {id: 'inputs:tmnt/P3/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P3'}), (b:KG {id: 'inputs:tmnt/P3/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P3'}), (b:KG {id: 'inputs:tmnt/P3/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P3'}), (b:KG {id: 'inputs:tmnt/P3/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P3'}), (b:KG {id: 'inputs:tmnt/P3/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P3'}), (b:KG {id: 'inputs:tmnt/P3/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P3'}), (b:KG {id: 'inputs:tmnt/P3/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P4'}), (b:KG {id: 'inputs:tmnt/P4/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P4'}), (b:KG {id: 'inputs:tmnt/P4/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P4'}), (b:KG {id: 'inputs:tmnt/P4/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P4'}), (b:KG {id: 'inputs:tmnt/P4/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P4'}), (b:KG {id: 'inputs:tmnt/P4/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P4'}), (b:KG {id: 'inputs:tmnt/P4/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P4'}), (b:KG {id: 'inputs:tmnt/P4/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/P4'}), (b:KG {id: 'inputs:tmnt/P4/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/DSW1'}), (b:KG {id: 'inputs:tmnt/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/DSW1'}), (b:KG {id: 'inputs:tmnt/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/DSW1'}), (b:KG {id: 'inputs:tmnt/DSW1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/DSW1'}), (b:KG {id: 'inputs:tmnt/DSW1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/DSW1'}), (b:KG {id: 'inputs:tmnt/DSW1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/DSW2'}), (b:KG {id: 'inputs:tmnt/DSW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/DSW2'}), (b:KG {id: 'inputs:tmnt/DSW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/DSW2'}), (b:KG {id: 'inputs:tmnt/DSW2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/DSW2'}), (b:KG {id: 'inputs:tmnt/DSW2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/DSW2'}), (b:KG {id: 'inputs:tmnt/DSW2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/DSW2'}), (b:KG {id: 'inputs:tmnt/DSW2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/DSW3'}), (b:KG {id: 'inputs:tmnt/DSW3/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/DSW3'}), (b:KG {id: 'inputs:tmnt/DSW3/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/DSW3'}), (b:KG {id: 'inputs:tmnt/DSW3/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/DSW3'}), (b:KG {id: 'inputs:tmnt/DSW3/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:tmnt/DSW3'}), (b:KG {id: 'inputs:tmnt/DSW3/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:tmnt/maincpu'}), (b:KG {id: 'rom:tmnt/maincpu/963-x23.j17'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tmnt/maincpu'}), (b:KG {id: 'rom:tmnt/maincpu/963-x24.k17'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tmnt/maincpu'}), (b:KG {id: 'rom:tmnt/maincpu/963-x21.j15'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tmnt/maincpu'}), (b:KG {id: 'rom:tmnt/maincpu/963-x22.k15'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tmnt/audiocpu'}), (b:KG {id: 'rom:tmnt/audiocpu/963e20.g13'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tmnt/k052109'}), (b:KG {id: 'rom:tmnt/k052109/963a28.h27'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tmnt/k052109'}), (b:KG {id: 'rom:tmnt/k052109/963a29.k27'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tmnt/k051960'}), (b:KG {id: 'rom:tmnt/k051960/963a17.h4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tmnt/k051960'}), (b:KG {id: 'rom:tmnt/k051960/963a15.k4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tmnt/k051960'}), (b:KG {id: 'rom:tmnt/k051960/963a18.h6'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tmnt/k051960'}), (b:KG {id: 'rom:tmnt/k051960/963a16.k6'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tmnt/proms'}), (b:KG {id: 'rom:tmnt/proms/963a30.g7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tmnt/proms'}), (b:KG {id: 'rom:tmnt/proms/963a31.g19'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tmnt/k007232'}), (b:KG {id: 'rom:tmnt/k007232/963a26.c13'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tmnt/upd'}), (b:KG {id: 'rom:tmnt/upd/963a27.d18'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:tmnt/title'}), (b:KG {id: 'rom:tmnt/title/963a25.d5'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map'}), (b:KG {id: 'file:src/mame/konami/tmnt.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 506, sourceColumn: 1, sourceEndLine: 525};
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map'}), (b:KG {id: 'map:tmnt_state.tmnt_main_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map'}), (b:KG {id: 'map:tmnt_state.tmnt_main_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map'}), (b:KG {id: 'map:tmnt_state.tmnt_main_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map'}), (b:KG {id: 'map:tmnt_state.tmnt_main_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map'}), (b:KG {id: 'map:tmnt_state.tmnt_main_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map'}), (b:KG {id: 'map:tmnt_state.tmnt_main_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map'}), (b:KG {id: 'map:tmnt_state.tmnt_main_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map'}), (b:KG {id: 'map:tmnt_state.tmnt_main_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map'}), (b:KG {id: 'map:tmnt_state.tmnt_main_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map'}), (b:KG {id: 'map:tmnt_state.tmnt_main_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map'}), (b:KG {id: 'map:tmnt_state.tmnt_main_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map'}), (b:KG {id: 'map:tmnt_state.tmnt_main_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map'}), (b:KG {id: 'map:tmnt_state.tmnt_main_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map'}), (b:KG {id: 'map:tmnt_state.tmnt_main_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map'}), (b:KG {id: 'map:tmnt_state.tmnt_main_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map'}), (b:KG {id: 'map:tmnt_state.tmnt_main_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_audio_map'}), (b:KG {id: 'file:src/mame/konami/tmnt.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/tmnt.cpp', sourceLine: 538, sourceColumn: 1, sourceEndLine: 549};
MATCH (a:KG {id: 'map:tmnt_state.tmnt_audio_map'}), (b:KG {id: 'map:tmnt_state.tmnt_audio_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_audio_map'}), (b:KG {id: 'map:tmnt_state.tmnt_audio_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_audio_map'}), (b:KG {id: 'map:tmnt_state.tmnt_audio_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_audio_map'}), (b:KG {id: 'map:tmnt_state.tmnt_audio_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_audio_map'}), (b:KG {id: 'map:tmnt_state.tmnt_audio_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_audio_map'}), (b:KG {id: 'map:tmnt_state.tmnt_audio_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_audio_map'}), (b:KG {id: 'map:tmnt_state.tmnt_audio_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_audio_map'}), (b:KG {id: 'map:tmnt_state.tmnt_audio_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_audio_map'}), (b:KG {id: 'map:tmnt_state.tmnt_audio_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:tmnt_state.tmnt/screen/callback:screen:0'}), (b:KG {id: 'handler:tmnt_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:tmnt_state.tmnt/screen/callback:screen:1'}), (b:KG {id: 'handler:tmnt_state.vblank_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:tmnt_state.tmnt/k052109/callback:k052109:0'}), (b:KG {id: 'handler:tmnt_state.tmnt_tile_callback'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:tmnt_state.tmnt/k051960/callback:k051960:0'}), (b:KG {id: 'handler:tmnt_state.tmnt_sprite_callback'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:tmnt_state.tmnt/k007232/callback:k007232:0'}), (b:KG {id: 'handler:tmnt_state.volume_callback'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map/range2'}), (b:KG {id: 'handler:palette_device.read8'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'palette'};
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map/range2'}), (b:KG {id: 'handler:palette_device.write8'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'palette'};
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map/range3'}), (b:KG {id: 'handler:tmnt_state._0a0000_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map/range7'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map/range8'}), (b:KG {id: 'handler:watchdog_timer_device.reset16_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map/range12'}), (b:KG {id: 'handler:tmnt_state.priority_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map/range13'}), (b:KG {id: 'handler:tmnt_state.k052109_word_noA12_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map/range13'}), (b:KG {id: 'handler:tmnt_state.k052109_word_noA12_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map/range14'}), (b:KG {id: 'handler:k051960_device.k051937_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'k051960'};
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map/range14'}), (b:KG {id: 'handler:k051960_device.k051937_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'k051960'};
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map/range15'}), (b:KG {id: 'handler:k051960_device.k051960_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'k051960'};
MATCH (a:KG {id: 'map:tmnt_state.tmnt_main_map/range15'}), (b:KG {id: 'handler:k051960_device.k051960_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'k051960'};
MATCH (a:KG {id: 'map:tmnt_state.tmnt_audio_map/range2'}), (b:KG {id: 'handler:tmnt_state.sres_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_audio_map/range2'}), (b:KG {id: 'handler:tmnt_state.sres_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_audio_map/range3'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:tmnt_state.tmnt_audio_map/range4'}), (b:KG {id: 'handler:k007232_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'k007232'};
MATCH (a:KG {id: 'map:tmnt_state.tmnt_audio_map/range4'}), (b:KG {id: 'handler:k007232_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'k007232'};
MATCH (a:KG {id: 'map:tmnt_state.tmnt_audio_map/range5'}), (b:KG {id: 'handler:ym2151_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ymsnd'};
MATCH (a:KG {id: 'map:tmnt_state.tmnt_audio_map/range5'}), (b:KG {id: 'handler:ym2151_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ymsnd'};
MATCH (a:KG {id: 'map:tmnt_state.tmnt_audio_map/range6'}), (b:KG {id: 'handler:upd7759_device.port_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'upd'};
MATCH (a:KG {id: 'map:tmnt_state.tmnt_audio_map/range7'}), (b:KG {id: 'handler:tmnt_state.tmnt_upd_start_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:tmnt_state.tmnt_audio_map/range8'}), (b:KG {id: 'handler:tmnt_state.tmnt_upd_busy_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'handler:tmnt_state.screen_update'}), (b:KG {id: 'handler:k052109_device.tilemap_draw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tmnt_state.screen_update'}), (b:KG {id: 'handler:k051960_device.k051960_sprites_draw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tmnt_state._0a0000_w'}), (b:KG {id: 'handler:k052109_device.set_rmrd_line'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tmnt_state.k052109_word_noA12_r'}), (b:KG {id: 'handler:k052109_device.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tmnt_state.k052109_word_noA12_w'}), (b:KG {id: 'handler:k052109_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:k051960_device.k051937_r'}), (b:KG {id: 'handler:k051960_device.k051960_fetchromdata'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:k051960_device.k051960_r'}), (b:KG {id: 'handler:k051960_device.k051960_fetchromdata'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:k052109_device.write'}), (b:KG {id: 'handler:k052109_device.tileflip_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
