// mamekit knowledge graph — driver src/mame/konami/simpsons.cpp
// generated 2026-09-05T03:50:11.883Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/konami/simpsons.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/konami/simpsons.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:k052109.h'}) SET n:SourceFile SET n += {path: 'k052109.h', external: true};
MERGE (n:KG {id: 'file:k053251.h'}) SET n:SourceFile SET n += {path: 'k053251.h', external: true};
MERGE (n:KG {id: 'file:k053246_k053247_k055673.h'}) SET n:SourceFile SET n += {path: 'k053246_k053247_k055673.h', external: true};
MERGE (n:KG {id: 'file:konamipt.h'}) SET n:SourceFile SET n += {path: 'konamipt.h', external: true};
MERGE (n:KG {id: 'file:konami_helper.h'}) SET n:SourceFile SET n += {path: 'konami_helper.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6809/konami.h'}) SET n:SourceFile SET n += {path: 'cpu/m6809/konami.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:machine/eepromser.h'}) SET n:SourceFile SET n += {path: 'machine/eepromser.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:sound/k053260.h'}) SET n:SourceFile SET n += {path: 'sound/k053260.h', external: true};
MERGE (n:KG {id: 'file:sound/ymopm.h'}) SET n:SourceFile SET n += {path: 'sound/ymopm.h', external: true};
MERGE (n:KG {id: 'file:emupal.h'}) SET n:SourceFile SET n += {path: 'emupal.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'game:simpsons'}) SET n:Game SET n += {name: 'simpsons', year: '1991', company: 'Konami', fullname: 'The Simpsons (4 Players World, set 1)', monitor: 'ROT0', cls: 'simpsons_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 972, sourceColumn: 1, sourceEndLine: 972};
MERGE (n:KG {id: 'romset:simpsons'}) SET n:RomSet SET n += {name: 'simpsons', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 699, sourceColumn: 1, sourceEndLine: 699};
MERGE (n:KG {id: 'region:simpsons/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 524288, flags: '0', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 700, sourceColumn: 2, sourceEndLine: 700};
MERGE (n:KG {id: 'rom:simpsons/maincpu/072-g02.16c'}) SET n:Rom SET n += {file: '072-g02.16c', offset: 0, size: 131072, crc: '580ce1d6', sha1: '5b07fb8e8041e1663980aa35d853fdc13b22dac5', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 701, sourceColumn: 2, sourceEndLine: 701};
MERGE (n:KG {id: 'rom:simpsons/maincpu/072-g01.17c'}) SET n:Rom SET n += {file: '072-g01.17c', offset: 131072, size: 131072, crc: '9f843def', sha1: '858432b59101b0577c5cec6ac0c7c20ab0780c9a', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 702, sourceColumn: 2, sourceEndLine: 702};
MERGE (n:KG {id: 'rom:simpsons/maincpu/072-j13.13c'}) SET n:Rom SET n += {file: '072-j13.13c', offset: 262144, size: 131072, crc: 'aade2abd', sha1: '10f178d5ed399b4866266e075d91ca3db26798f8', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 703, sourceColumn: 2, sourceEndLine: 703};
MERGE (n:KG {id: 'rom:simpsons/maincpu/072-j12.15c'}) SET n:Rom SET n += {file: '072-j12.15c', offset: 393216, size: 131072, crc: '479e12f2', sha1: '15a6cb12e68b4773a29ab463640a43f8e814de59', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 704, sourceColumn: 2, sourceEndLine: 704};
MERGE (n:KG {id: 'region:simpsons/audiocpu'}) SET n:RomRegion SET n += {tag: 'audiocpu', size: 163840, flags: '0', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 706, sourceColumn: 2, sourceEndLine: 706};
MERGE (n:KG {id: 'rom:simpsons/audiocpu/072-e03.6g'}) SET n:Rom SET n += {file: '072-e03.6g', offset: 0, size: 32768, crc: '866b7a35', sha1: '98905764eb4c7d968ccc17618a1f24ee12e33c0e', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 707, sourceColumn: 2, sourceEndLine: 707, continueSegments: [65536, 98304, 32768]};
MERGE (n:KG {id: 'region:simpsons/k052109'}) SET n:RomRegion SET n += {tag: 'k052109', size: 1048576, flags: '0', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 710, sourceColumn: 2, sourceEndLine: 710};
MERGE (n:KG {id: 'rom:simpsons/k052109/072-b07.18h'}) SET n:Rom SET n += {file: '072-b07.18h', offset: 0, size: 524288, crc: 'ba1ec910', sha1: '0805ccb641271dea43185dc0365732260db1763d', groupSize: 2, skip: 2};
MERGE (n:KG {id: 'rom:simpsons/k052109/072-b06.16h'}) SET n:Rom SET n += {file: '072-b06.16h', offset: 2, size: 524288, crc: 'cf2bbcab', sha1: '47afea47f9bc8cb5eb1c7b7fbafe954b3e749aeb', groupSize: 2, skip: 2};
MERGE (n:KG {id: 'region:simpsons/k053246'}) SET n:RomRegion SET n += {tag: 'k053246', size: 4194304, flags: '0', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 714, sourceColumn: 2, sourceEndLine: 714};
MERGE (n:KG {id: 'rom:simpsons/k053246/072-b08.3n'}) SET n:Rom SET n += {file: '072-b08.3n', offset: 0, size: 1048576, crc: '7de500ad', sha1: '61b76b8f402e3bde1509679aaaa28ef08cafb0ab', groupSize: 2, skip: 6};
MERGE (n:KG {id: 'rom:simpsons/k053246/072-b09.8n'}) SET n:Rom SET n += {file: '072-b09.8n', offset: 2, size: 1048576, crc: 'aa085093', sha1: '925239d79bf607021d371263352618876f59c1f8', groupSize: 2, skip: 6};
MERGE (n:KG {id: 'rom:simpsons/k053246/072-b10.12n'}) SET n:Rom SET n += {file: '072-b10.12n', offset: 4, size: 1048576, crc: '577dbd53', sha1: 'e603e03e3dcba766074561faa92afafa5761953d', groupSize: 2, skip: 6};
MERGE (n:KG {id: 'rom:simpsons/k053246/072-b11.16l'}) SET n:Rom SET n += {file: '072-b11.16l', offset: 6, size: 1048576, crc: '55fab05d', sha1: '54db8559d71ed257de9a29c8808654eaea0df9e2', groupSize: 2, skip: 6};
MERGE (n:KG {id: 'region:simpsons/k053260'}) SET n:RomRegion SET n += {tag: 'k053260', size: 1310720, flags: '0', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 720, sourceColumn: 2, sourceEndLine: 720};
MERGE (n:KG {id: 'rom:simpsons/k053260/072-d05.1f'}) SET n:Rom SET n += {file: '072-d05.1f', offset: 0, size: 1048576, crc: '1397a73b', sha1: '369422c84cca5472967af54b8351e29fcd69f621', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 721, sourceColumn: 2, sourceEndLine: 721};
MERGE (n:KG {id: 'rom:simpsons/k053260/072-d04.1d'}) SET n:Rom SET n += {file: '072-d04.1d', offset: 1048576, size: 262144, crc: '78778013', sha1: 'edbd6d83b0d1a20df39bb160b92395586fa3c32d', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 722, sourceColumn: 2, sourceEndLine: 722};
MERGE (n:KG {id: 'region:simpsons/eeprom'}) SET n:RomRegion SET n += {tag: 'eeprom', size: 128, flags: '0', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 724, sourceColumn: 2, sourceEndLine: 724};
MERGE (n:KG {id: 'rom:simpsons/eeprom/simpsons.12c.nv'}) SET n:Rom SET n += {file: 'simpsons.12c.nv', offset: 0, size: 128, crc: 'ec3f0449', sha1: 'da35b98cd10bfabe9df3ede05462fabeb0e01ca9', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 725, sourceColumn: 2, sourceEndLine: 725};
MERGE (n:KG {id: 'map:simpsons_state.main_map'}) SET n:AddressMap SET n += {cls: 'simpsons_state', name: 'main_map', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 441, sourceColumn: 1, sourceEndLine: 467};
MERGE (n:KG {id: 'map:simpsons_state.main_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 8191, raw: 'map(0x0000, 0x1fff).rw(m_k052109, FUNC(k052109_device::read), FUNC(k052109_device::write))', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 443, sourceColumn: 2, sourceEndLine: 443};
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
MERGE (n:KG {id: 'map:simpsons_state.main_map/range1'}) SET n:AddressRange SET n += {start: 0, end: 4095, raw: 'map(0x0000, 0x0fff).view(m_palette_view)', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 444, sourceColumn: 2, sourceEndLine: 444};
MERGE (n:KG {id: 'map:simpsons_state.main_map/range2'}) SET n:AddressRange SET n += {start: 0, end: 4095, raw: 'm_palette_view[0](0x0000, 0x0fff).ram().w("palette", FUNC(palette_device::write8)).share("palette")', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 445, sourceColumn: 2, sourceEndLine: 445, ram: true, share: 'palette', viewTag: 'm_palette_view', viewEntry: 0};
MERGE (n:KG {id: 'handler:palette_device.write8'}) SET n:Handler SET n += {method: 'write8', ownerClass: 'palette_device', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 445, sourceColumn: 2, sourceEndLine: 445};
MERGE (n:KG {id: 'map:simpsons_state.main_map/range3'}) SET n:AddressRange SET n += {start: 8064, end: 8064, raw: 'map(0x1f80, 0x1f80).portr("COIN")', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 446, sourceColumn: 2, sourceEndLine: 446, portRead: 'COIN'};
MERGE (n:KG {id: 'map:simpsons_state.main_map/range4'}) SET n:AddressRange SET n += {start: 8065, end: 8065, raw: 'map(0x1f81, 0x1f81).portr("TEST")', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 447, sourceColumn: 2, sourceEndLine: 447, portRead: 'TEST'};
MERGE (n:KG {id: 'map:simpsons_state.main_map/range5'}) SET n:AddressRange SET n += {start: 8080, end: 8080, raw: 'map(0x1f90, 0x1f90).portr("P1")', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 448, sourceColumn: 2, sourceEndLine: 448, portRead: 'P1'};
MERGE (n:KG {id: 'map:simpsons_state.main_map/range6'}) SET n:AddressRange SET n += {start: 8081, end: 8081, raw: 'map(0x1f91, 0x1f91).portr("P2")', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 449, sourceColumn: 2, sourceEndLine: 449, portRead: 'P2'};
MERGE (n:KG {id: 'map:simpsons_state.main_map/range7'}) SET n:AddressRange SET n += {start: 8082, end: 8082, raw: 'map(0x1f92, 0x1f92).portr("P3")', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 450, sourceColumn: 2, sourceEndLine: 450, portRead: 'P3'};
MERGE (n:KG {id: 'map:simpsons_state.main_map/range8'}) SET n:AddressRange SET n += {start: 8083, end: 8083, raw: 'map(0x1f93, 0x1f93).portr("P4")', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 451, sourceColumn: 2, sourceEndLine: 451, portRead: 'P4'};
MERGE (n:KG {id: 'map:simpsons_state.main_map/range9'}) SET n:AddressRange SET n += {start: 8096, end: 8103, raw: 'map(0x1fa0, 0x1fa7).w(m_k053246, FUNC(k053247_device::k053246_w))', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 452, sourceColumn: 2, sourceEndLine: 452};
MERGE (n:KG {id: 'handler:k053247_device.k053246_w'}) SET n:Handler SET n += {method: 'k053246_w', ownerClass: 'k053247_device', sourceFile: 'src/mame/konami/k053246_k053247_k055673.cpp', sourceLine: 216, sourceColumn: 1, sourceEndLine: 219, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'm_kx46_regs[offset] = data;'};
MERGE (n:KG {id: 'map:simpsons_state.main_map/range10'}) SET n:AddressRange SET n += {start: 8112, end: 8127, raw: 'map(0x1fb0, 0x1fbf).w(m_k053251, FUNC(k053251_device::write))', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 453, sourceColumn: 2, sourceEndLine: 453};
MERGE (n:KG {id: 'handler:k053251_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'k053251_device', sourceFile: 'src/mame/konami/k053251.cpp', sourceLine: 167, sourceColumn: 1, sourceEndLine: 174, sourceParameters: 'offs_t offset, u8 data', sourceBody: 'offset &= 0xf;
	m_ram[offset] = data & 0x3f;

	if (offset == 9 || offset == 10)
		reset_indexes();'};
MERGE (n:KG {id: 'handler:k053251_device.reset_indexes'}) SET n:Handler SET n += {method: 'reset_indexes', ownerClass: 'k053251_device', sourceFile: 'src/mame/konami/k053251.cpp', sourceLine: 187, sourceColumn: 1, sourceEndLine: 194, sourceParameters: '', sourceBody: 'm_palette_index[0] = 32 * ((m_ram[9] >> 0) & 0x03);
	m_palette_index[1] = 32 * ((m_ram[9] >> 2) & 0x03);
	m_palette_index[2] = 32 * ((m_ram[9] >> 4) & 0x03);
	m_palette_index[3] = 16 * ((m_ram[10] >> 0) & 0x07);
	m_palette_index[4] = 16 * ((m_ram[10] >> 3) & 0x07);'};
MERGE (n:KG {id: 'map:simpsons_state.main_map/range11'}) SET n:AddressRange SET n += {start: 8128, end: 8128, raw: 'map(0x1fc0, 0x1fc0).w(FUNC(simpsons_state::coin_counter_w))', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 454, sourceColumn: 2, sourceEndLine: 454};
MERGE (n:KG {id: 'handler:simpsons_state.coin_counter_w'}) SET n:Handler SET n += {method: 'coin_counter_w', ownerClass: 'simpsons_state', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 357, sourceColumn: 1, sourceEndLine: 368, sourceParameters: 'uint8_t data', sourceBody: '/* bit 0,1 coin counters */
	machine().bookkeeping().coin_counter_w(0, BIT(data, 0));
	machine().bookkeeping().coin_counter_w(1, BIT(data, 1));
	/* bit 2 selects mono or stereo sound */
	/* bit 3 = enable char ROM reading through the video RAM */
	m_k052109->set_rmrd_line(BIT(data, 3));
	/* bit 4 = INIT (unknown) */
	/* bit 5 = enable sprite ROM reading */
	m_k053246->k053246_set_objcha_line(BIT(~data, 5));'};
MERGE (n:KG {id: 'handler:k052109_device.set_rmrd_line'}) SET n:Handler SET n += {method: 'set_rmrd_line', ownerClass: 'k052109_device', sourceFile: 'src/mame/konami/k052109.h', sourceLine: 51, sourceColumn: 36, sourceEndLine: 53, sourceParameters: 'int state', sourceBody: 'm_rmrd_line = state;'};
MERGE (n:KG {id: 'handler:k053247_device.k053246_set_objcha_line'}) SET n:Handler SET n += {method: 'k053246_set_objcha_line', ownerClass: 'k053247_device', sourceFile: 'src/mame/konami/k053246_k053247_k055673.cpp', sourceLine: 221, sourceColumn: 1, sourceEndLine: 224, sourceParameters: 'int state', sourceBody: 'm_objcha_line = state;'};
MERGE (n:KG {id: 'map:simpsons_state.main_map/range12'}) SET n:AddressRange SET n += {start: 8130, end: 8130, raw: 'map(0x1fc2, 0x1fc2).w(FUNC(simpsons_state::eeprom_w))', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 455, sourceColumn: 2, sourceEndLine: 455};
MERGE (n:KG {id: 'handler:simpsons_state.eeprom_w'}) SET n:Handler SET n += {method: 'eeprom_w', ownerClass: 'simpsons_state', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 337, sourceColumn: 1, sourceEndLine: 349, sourceParameters: 'uint8_t data', sourceBody: 'if (data == 0xff)
		return;

	m_io_eepromout->write(data, 0xff);

	video_bank_select(data & 0x03);

	m_firq_enabled = BIT(data, 2);
	if (!m_firq_enabled)
		m_maincpu->set_input_line(KONAMI_FIRQ_LINE, CLEAR_LINE);', inputMembers: ['m_io_eepromout=EEPROMOUT']};
MERGE (n:KG {id: 'handler:simpsons_state.video_bank_select'}) SET n:Handler SET n += {method: 'video_bank_select', ownerClass: 'simpsons_state', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 276, sourceColumn: 1, sourceEndLine: 283, sourceParameters: 'int bank', sourceBody: 'if (BIT(bank, 0))
		m_palette_view.select(0);
	else
		m_palette_view.disable();
	m_video_view.select(BIT(bank, 1));'};
MERGE (n:KG {id: 'map:simpsons_state.main_map/range13'}) SET n:AddressRange SET n += {start: 8132, end: 8132, raw: 'map(0x1fc4, 0x1fc4).r(FUNC(simpsons_state::sound_interrupt_r))', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 456, sourceColumn: 2, sourceEndLine: 456};
MERGE (n:KG {id: 'handler:simpsons_state.sound_interrupt_r'}) SET n:Handler SET n += {method: 'sound_interrupt_r', ownerClass: 'simpsons_state', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 370, sourceColumn: 1, sourceEndLine: 376, sourceParameters: '', sourceBody: 'if (!machine().side_effects_disabled())
		m_audiocpu->set_input_line(0, HOLD_LINE); // Z80 IM1

	return 0x00;'};
MERGE (n:KG {id: 'map:simpsons_state.main_map/range14'}) SET n:AddressRange SET n += {start: 8134, end: 8135, raw: 'map(0x1fc6, 0x1fc7).rw("k053260", FUNC(k053260_device::main_read), FUNC(k053260_device::main_write))', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 457, sourceColumn: 2, sourceEndLine: 457};
MERGE (n:KG {id: 'handler:k053260_device.main_read'}) SET n:Handler SET n += {method: 'main_read', ownerClass: 'k053260_device', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 457, sourceColumn: 2, sourceEndLine: 457};
MERGE (n:KG {id: 'handler:k053260_device.main_write'}) SET n:Handler SET n += {method: 'main_write', ownerClass: 'k053260_device', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 457, sourceColumn: 2, sourceEndLine: 457};
MERGE (n:KG {id: 'map:simpsons_state.main_map/range15'}) SET n:AddressRange SET n += {start: 8136, end: 8137, raw: 'map(0x1fc8, 0x1fc9).r(m_k053246, FUNC(k053247_device::k053246_r))', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 458, sourceColumn: 2, sourceEndLine: 458};
MERGE (n:KG {id: 'handler:k053247_device.k053246_r'}) SET n:Handler SET n += {method: 'k053246_r', ownerClass: 'k053247_device', sourceFile: 'src/mame/konami/k053246_k053247_k055673.cpp', sourceLine: 198, sourceColumn: 1, sourceEndLine: 214, sourceParameters: 'offs_t offset', sourceBody: 'if (m_objcha_line == ASSERT_LINE)
	{
		int addr = (m_kx46_regs[6] << 17) | (m_kx46_regs[7] << 9) | (m_kx46_regs[4] << 1) | ((offset & 1) ^ 1);

		// assumes it can make an address mask with m_gfxrom.length() - 1
		assert(!(m_gfxrom.length() & (m_gfxrom.length() - 1)));
		addr &= m_gfxrom.length() - 1;

		return m_gfxrom[addr];
	}
	else
	{
		return 0;
	}'};
MERGE (n:KG {id: 'map:simpsons_state.main_map/range16'}) SET n:AddressRange SET n += {start: 8138, end: 8138, raw: 'map(0x1fca, 0x1fca).r("watchdog", FUNC(watchdog_timer_device::reset_r))', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 459, sourceColumn: 2, sourceEndLine: 459};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_r'}) SET n:Handler SET n += {method: 'reset_r', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 459, sourceColumn: 2, sourceEndLine: 459};
MERGE (n:KG {id: 'map:simpsons_state.main_map/range17'}) SET n:AddressRange SET n += {start: 8192, end: 16383, raw: 'map(0x2000, 0x3fff).view(m_video_view)', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 460, sourceColumn: 2, sourceEndLine: 460};
MERGE (n:KG {id: 'map:simpsons_state.main_map/range18'}) SET n:AddressRange SET n += {start: 8192, end: 16383, raw: 'm_video_view[0](0x2000, 0x3fff).rw(FUNC(simpsons_state::k052109_r), FUNC(simpsons_state::k052109_w))', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 461, sourceColumn: 2, sourceEndLine: 461, viewTag: 'm_video_view', viewEntry: 0};
MERGE (n:KG {id: 'handler:simpsons_state.k052109_r'}) SET n:Handler SET n += {method: 'k052109_r', ownerClass: 'simpsons_state', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 246, sourceColumn: 1, sourceEndLine: 249, sourceParameters: 'offs_t offset', sourceBody: 'return m_k052109->read(offset + 0x2000);'};
MERGE (n:KG {id: 'handler:simpsons_state.k052109_w'}) SET n:Handler SET n += {method: 'k052109_w', ownerClass: 'simpsons_state', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 251, sourceColumn: 1, sourceEndLine: 254, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_k052109->write(offset + 0x2000, data);'};
MERGE (n:KG {id: 'map:simpsons_state.main_map/range19'}) SET n:AddressRange SET n += {start: 8192, end: 12287, raw: 'm_video_view[1](0x2000, 0x2fff).rw(FUNC(simpsons_state::k053247_r), FUNC(simpsons_state::k053247_w))', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 462, sourceColumn: 2, sourceEndLine: 462, viewTag: 'm_video_view', viewEntry: 1};
MERGE (n:KG {id: 'handler:simpsons_state.k053247_r'}) SET n:Handler SET n += {method: 'k053247_r', ownerClass: 'simpsons_state', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 256, sourceColumn: 1, sourceEndLine: 264, sourceParameters: 'offs_t offset', sourceBody: 'int const offs = offset >> 1;

	if (BIT(offset, 0))
		return(m_spriteram[offs] & 0xff);
	else
		return(m_spriteram[offs] >> 8);'};
MERGE (n:KG {id: 'handler:simpsons_state.k053247_w'}) SET n:Handler SET n += {method: 'k053247_w', ownerClass: 'simpsons_state', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 266, sourceColumn: 1, sourceEndLine: 274, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'int const offs = offset >> 1;

	if (BIT(offset, 0))
		m_spriteram[offs] = (m_spriteram[offs] & 0xff00) | data;
	else
		m_spriteram[offs] = (m_spriteram[offs] & 0x00ff) | (data << 8);'};
MERGE (n:KG {id: 'map:simpsons_state.main_map/range20'}) SET n:AddressRange SET n += {start: 12288, end: 16383, raw: 'm_video_view[1](0x3000, 0x3fff).ram()', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 463, sourceColumn: 2, sourceEndLine: 463, ram: true, viewTag: 'm_video_view', viewEntry: 1};
MERGE (n:KG {id: 'map:simpsons_state.main_map/range21'}) SET n:AddressRange SET n += {start: 16384, end: 24575, raw: 'map(0x4000, 0x5fff).ram()', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 464, sourceColumn: 2, sourceEndLine: 464, ram: true};
MERGE (n:KG {id: 'map:simpsons_state.main_map/range22'}) SET n:AddressRange SET n += {start: 24576, end: 32767, raw: 'map(0x6000, 0x7fff).bankr(m_mainbank)', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 465, sourceColumn: 2, sourceEndLine: 465, bankRead: 'mainbank'};
MERGE (n:KG {id: 'map:simpsons_state.main_map/range23'}) SET n:AddressRange SET n += {start: 32768, end: 65535, raw: 'map(0x8000, 0xffff).rom().region("maincpu", 0x78000)', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 466, sourceColumn: 2, sourceEndLine: 466, rom: true, region: 'maincpu', regionOffset: 491520};
MERGE (n:KG {id: 'map:simpsons_state.z80_map'}) SET n:AddressMap SET n += {cls: 'simpsons_state', name: 'z80_map', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 507, sourceColumn: 1, sourceEndLine: 516};
MERGE (n:KG {id: 'map:simpsons_state.z80_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom()', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 509, sourceColumn: 2, sourceEndLine: 509, rom: true};
MERGE (n:KG {id: 'map:simpsons_state.z80_map/range1'}) SET n:AddressRange SET n += {start: 32768, end: 49151, raw: 'map(0x8000, 0xbfff).bankr(m_audiobank)', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 510, sourceColumn: 2, sourceEndLine: 510, bankRead: 'audiobank'};
MERGE (n:KG {id: 'map:simpsons_state.z80_map/range2'}) SET n:AddressRange SET n += {start: 61440, end: 63487, raw: 'map(0xf000, 0xf7ff).ram()', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 511, sourceColumn: 2, sourceEndLine: 511, ram: true};
MERGE (n:KG {id: 'map:simpsons_state.z80_map/range3'}) SET n:AddressRange SET n += {start: 63488, end: 63489, raw: 'map(0xf800, 0xf801).rw("ymsnd", FUNC(ym2151_device::read), FUNC(ym2151_device::write))', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 512, sourceColumn: 2, sourceEndLine: 512};
MERGE (n:KG {id: 'handler:ym2151_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'ym2151_device', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 512, sourceColumn: 2, sourceEndLine: 512};
MERGE (n:KG {id: 'handler:ym2151_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'ym2151_device', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 512, sourceColumn: 2, sourceEndLine: 512};
MERGE (n:KG {id: 'map:simpsons_state.z80_map/range4'}) SET n:AddressRange SET n += {start: 64000, end: 64000, raw: 'map(0xfa00, 0xfa00).w(FUNC(simpsons_state::z80_arm_nmi_w))', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 513, sourceColumn: 2, sourceEndLine: 513};
MERGE (n:KG {id: 'handler:simpsons_state.z80_arm_nmi_w'}) SET n:Handler SET n += {method: 'z80_arm_nmi_w', ownerClass: 'simpsons_state', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 487, sourceColumn: 1, sourceEndLine: 499, sourceParameters: 'uint8_t data', sourceBody: '// LD $(FA00), A takes 13 cycles. 4*M1 + 3*read + 3*read + 3*write.
	//
	// The Z80 checks if NMI has gone from high to low during the instruction, on the rising edge of CLK, at the start of the last cycle (in this case cycle 3 of the write).
	// The circuit raises NMI when MREQ/WR goes high, on the falling edge of CLK, half way through cycle 3 of the write.
	// NMI is then lowered when the sound chips timer output subsequently goes from low to high.
	//
	// MAME instead does not emulate memory cycle timing and checks the NMI before executing an instruction,
	// so we have to manually delay the NMI until the following HALT instruction has started.
	m_audiocpu->set_input_line(INPUT_LINE_NMI, CLEAR_LINE);
	m_nmi_blocked->adjust(m_audiocpu->cycles_to_attotime(4));'};
MERGE (n:KG {id: 'map:simpsons_state.z80_map/range5'}) SET n:AddressRange SET n += {start: 64512, end: 64559, raw: 'map(0xfc00, 0xfc2f).rw("k053260", FUNC(k053260_device::read), FUNC(k053260_device::write))', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 514, sourceColumn: 2, sourceEndLine: 514};
MERGE (n:KG {id: 'handler:k053260_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'k053260_device', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 514, sourceColumn: 2, sourceEndLine: 514};
MERGE (n:KG {id: 'handler:k053260_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'k053260_device', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 514, sourceColumn: 2, sourceEndLine: 514};
MERGE (n:KG {id: 'map:simpsons_state.z80_map/range6'}) SET n:AddressRange SET n += {start: 65024, end: 65024, raw: 'map(0xfe00, 0xfe00).w(FUNC(simpsons_state::z80_bankswitch_w))', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 515, sourceColumn: 2, sourceEndLine: 515};
MERGE (n:KG {id: 'handler:simpsons_state.z80_bankswitch_w'}) SET n:Handler SET n += {method: 'z80_bankswitch_w', ownerClass: 'simpsons_state', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 469, sourceColumn: 1, sourceEndLine: 472, sourceParameters: 'uint8_t data', sourceBody: 'm_audiobank->set_entry(data & 7);'};
MERGE (n:KG {id: 'machine:simpsons_state.simpsons'}) SET n:MachineConfig SET n += {cls: 'simpsons_state', name: 'simpsons', calls: [], stateMembers: ['{"name":"m_sprite_colorbase","bits":32,"signed":true}', '{"name":"m_layer_colorbase","bits":32,"signed":true,"arrayLength":3}', '{"name":"m_layerpri","bits":32,"signed":true,"arrayLength":3}', '{"name":"m_firq_enabled","bits":1}'], resetHandlers: ['simpsons_state.machine_reset'], sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 638, sourceColumn: 1, sourceEndLine: 690};
MERGE (n:KG {id: 'handler:simpsons_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'simpsons_state', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 410, sourceColumn: 1, sourceEndLine: 431, sourceParameters: '', sourceBody: 'for (int i = 0; i < 3; i++)
	{
		m_layerpri[i] = 0;
		m_layer_colorbase[i] = 0;
	}

	m_sprite_colorbase = 0;
	m_firq_enabled = false;

	/* init the default banks */
	m_mainbank->set_entry(0);
	m_audiobank->set_entry(0);
	video_bank_select(0);

	m_dma_start_timer->adjust(attotime::never);
	m_dma_end_timer->adjust(attotime::never);

	// Z80 _NMI goes low at same time as reset
	m_audiocpu->set_input_line(INPUT_LINE_NMI, ASSERT_LINE);'};
MERGE (n:KG {id: 'bank:simpsons_state.simpsons/mainbank'}) SET n:MemoryBank SET n += {tag: 'mainbank', member: 'm_mainbank', startEntry: 0, entries: 64, region: 'maincpu', offset: 0, stride: 8192, raw: 'm_mainbank->configure_entries(0, 64, memregion("maincpu")->base(), 0x2000)', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 390, sourceColumn: 1, sourceEndLine: 408};
MERGE (n:KG {id: 'bank:simpsons_state.simpsons/audiobank/1'}) SET n:MemoryBank SET n += {tag: 'audiobank', member: 'm_audiobank', startEntry: 0, entries: 2, region: 'audiocpu', offset: 65536, stride: 0, raw: 'm_audiobank->configure_entries(0, 2, memregion("audiocpu")->base() + 0x10000, 0)', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 390, sourceColumn: 1, sourceEndLine: 408};
MERGE (n:KG {id: 'bank:simpsons_state.simpsons/audiobank/2'}) SET n:MemoryBank SET n += {tag: 'audiobank', member: 'm_audiobank', startEntry: 2, entries: 6, region: 'audiocpu', offset: 65536, stride: 16384, raw: 'm_audiobank->configure_entries(2, 6, memregion("audiocpu")->base() + 0x10000, 0x4000)', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 390, sourceColumn: 1, sourceEndLine: 408};
MERGE (n:KG {id: 'device:simpsons_state.simpsons/maincpu'}) SET n:Device SET n += {type: 'KONAMI', tag: 'maincpu', clock: 12000000, config: ['KONAMI(config, m_maincpu, 24_MHz_XTAL / 2)', 'm_maincpu->set_addrmap(AS_PROGRAM, &simpsons_state::main_map)', 'm_maincpu->set_vblank_int("screen", FUNC(simpsons_state::periodic_irq))', 'm_maincpu->line().set(FUNC(simpsons_state::banking_callback))'], sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 641, sourceColumn: 2, sourceEndLine: 641};
MERGE (n:KG {id: 'device:simpsons_state.simpsons/maincpu/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'set_vblank_int', operation: 'set_vblank_int', raw: 'm_maincpu->set_vblank_int("screen", FUNC(simpsons_state::periodic_irq))', ownerTag: 'maincpu', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 643, sourceColumn: 2, sourceEndLine: 643, targetTag: 'screen', targetClass: 'simpsons_state', targetMethod: 'periodic_irq'};
MERGE (n:KG {id: 'handler:simpsons_state.periodic_irq'}) SET n:Handler SET n += {method: 'periodic_irq', ownerClass: 'simpsons_state', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 628, sourceColumn: 1, sourceEndLine: 636, sourceParameters: 'device_t &device', sourceBody: 'if (m_k053246->k053246_is_irq_enabled())
	{
		object_dma();
		m_dma_start_timer->adjust(attotime::from_ticks(256, 24_MHz_XTAL / 4));
		m_dma_end_timer->adjust(attotime::from_ticks(256 + 2048, 24_MHz_XTAL / 4));
	}'};
MERGE (n:KG {id: 'handler:simpsons_state.object_dma'}) SET n:Handler SET n += {method: 'object_dma', ownerClass: 'simpsons_state', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 602, sourceColumn: 1, sourceEndLine: 626, sourceParameters: '', sourceBody: '// TODO: implement sprite dma in k053246_k053247_k055673.cpp
	uint16_t *dst;
	m_k053246->k053247_get_ram(&dst);

	uint16_t const *src = m_spriteram.get();
	int num_inactive = 256;

	for (int counter = 256; counter; --counter)
	{
		if (BIT(*src, 15) && (*src & 0xff))
		{
			dst = std::copy_n(src, 8, dst);
			num_inactive--;
		}
		src += 8;
	}

	while (num_inactive--)
	{
		*dst = 0;
		dst += 8;
	}'};
MERGE (n:KG {id: 'handler:k053247_device.k053247_get_ram'}) SET n:Handler SET n += {method: 'k053247_get_ram', ownerClass: 'k053247_device', sourceFile: 'src/mame/konami/k053246_k053247_k055673.cpp', sourceLine: 50, sourceColumn: 1, sourceEndLine: 53, sourceParameters: 'u16 **ram', sourceBody: '*ram = m_ram.get();'};
MERGE (n:KG {id: 'handler:k053247_device.k053246_is_irq_enabled'}) SET n:Handler SET n += {method: 'k053246_is_irq_enabled', ownerClass: 'k053247_device', sourceFile: 'src/mame/konami/k053246_k053247_k055673.cpp', sourceLine: 226, sourceColumn: 1, sourceEndLine: 230, sourceParameters: 'void', sourceBody: '// This bit enables obj DMA rather than obj IRQ even though the two functions usually coincide.
	return m_kx46_regs[5] & 0x10;'};
MERGE (n:KG {id: 'device:simpsons_state.simpsons/maincpu/callback:maincpu:1'}) SET n:Callback SET n += {signal: 'line', operation: 'set', raw: 'm_maincpu->line().set(FUNC(simpsons_state::banking_callback))', ownerTag: 'maincpu', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 644, sourceColumn: 2, sourceEndLine: 644, targetClass: 'simpsons_state', targetMethod: 'banking_callback'};
MERGE (n:KG {id: 'handler:simpsons_state.banking_callback'}) SET n:Handler SET n += {method: 'banking_callback', ownerClass: 'simpsons_state', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 385, sourceColumn: 1, sourceEndLine: 388, sourceParameters: 'u8 data', sourceBody: 'm_mainbank->set_entry(data & 0x3f);'};
MERGE (n:KG {id: 'device:simpsons_state.simpsons/audiocpu'}) SET n:Device SET n += {type: 'Z80', tag: 'audiocpu', clock: 3579545, config: ['Z80(config, m_audiocpu, 3.579545_MHz_XTAL)', 'm_audiocpu->set_addrmap(AS_PROGRAM, &simpsons_state::z80_map)'], sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 646, sourceColumn: 2, sourceEndLine: 646};
MERGE (n:KG {id: 'device:simpsons_state.simpsons/eeprom'}) SET n:Device SET n += {type: 'EEPROM_ER5911_8BIT', tag: 'eeprom', clock: null, config: ['EEPROM_ER5911_8BIT(config, "eeprom")'], sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 649, sourceColumn: 2, sourceEndLine: 649};
MERGE (n:KG {id: 'device:simpsons_state.simpsons/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog")'], sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 651, sourceColumn: 2, sourceEndLine: 651};
MERGE (n:KG {id: 'device:simpsons_state.simpsons/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['screen_device &screen(SCREEN(config, "screen", SCREEN_TYPE_RASTER))', 'screen.set_raw(24_MHz_XTAL / 4, 384, 0, 320, 264, 16, 240)', 'screen.set_video_attributes(VIDEO_UPDATE_AFTER_VBLANK)', 'screen.set_screen_update(FUNC(simpsons_state::screen_update))', 'screen.set_palette("palette")'], sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 654, sourceColumn: 2, sourceEndLine: 654, configCalls: ['set_raw(6000000,384,0,320,264,16,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6000000, 384, 0, 320, 264, 16, 240], screenRawExpr: ['24_MHz_XTAL / 4', '384', '0', '320', '264', '16', '240'], screenVideoAttributes: ['VIDEO_UPDATE_AFTER_VBLANK']};
MERGE (n:KG {id: 'device:simpsons_state.simpsons/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'screen.set_screen_update(FUNC(simpsons_state::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 659, sourceColumn: 2, sourceEndLine: 659, targetClass: 'simpsons_state', targetMethod: 'screen_update'};
MERGE (n:KG {id: 'handler:simpsons_state.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'simpsons_state', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 293, sourceColumn: 1, sourceEndLine: 327, sourceConstants: ['CI0=0', 'CI1=1', 'CI2=2', 'CI3=3', 'CI4=4'], sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: '// update color info and refresh tilemaps
	
	int const bg_colorbase = m_k053251->get_palette_index(k053251_device::CI0);
	m_sprite_colorbase = m_k053251->get_palette_index(k053251_device::CI1);

	for (int i = 0; i < 3; i++)
	{
		int const prev_colorbase = m_layer_colorbase[i];
		m_layer_colorbase[i] = m_k053251->get_palette_index(TABLE(i, k053251_device::CI2, k053251_device::CI3, k053251_device::CI4));

		if (m_layer_colorbase[i] != prev_colorbase)
			m_k052109->mark_tilemap_dirty(i);
	}

	// sort layers and draw
	int layer[3]{};
	for (int i = 0; i < 3; i++)
	{
		layer[i] = i;
		m_layerpri[i] = m_k053251->get_priority(TABLE(i, k053251_device::CI2, k053251_device::CI3, k053251_device::CI4));
	}

	konami_sortlayers3(layer, m_layerpri);

	screen.priority().fill(0, cliprect);
	bitmap.fill(16 * bg_colorbase, cliprect);
	m_k052109->tilemap_draw(screen, bitmap, cliprect, layer[0], 0, 1);
	m_k052109->tilemap_draw(screen, bitmap, cliprect, layer[1], 0, 2);
	m_k052109->tilemap_draw(screen, bitmap, cliprect, layer[2], 0, 4);

	m_k053246->k053247_sprites_draw(bitmap, cliprect);
	return 0;'};
MERGE (n:KG {id: 'handler:k053251_device.get_palette_index'}) SET n:Handler SET n += {method: 'get_palette_index', ownerClass: 'k053251_device', sourceFile: 'src/mame/konami/k053251.cpp', sourceLine: 181, sourceColumn: 1, sourceEndLine: 185, sourceParameters: 'u8 ci', sourceBody: 'assert(ci < 5);
	return m_palette_index[ci];'};
MERGE (n:KG {id: 'handler:k052109_device.mark_tilemap_dirty'}) SET n:Handler SET n += {method: 'mark_tilemap_dirty', ownerClass: 'k052109_device', sourceFile: 'src/mame/konami/k052109.cpp', sourceLine: 653, sourceColumn: 1, sourceEndLine: 657, sourceParameters: 'u8 tmap_num', sourceBody: 'assert(tmap_num <= 2);
	m_tilemap[tmap_num]->mark_all_dirty();'};
MERGE (n:KG {id: 'handler:k053251_device.get_priority'}) SET n:Handler SET n += {method: 'get_priority', ownerClass: 'k053251_device', sourceFile: 'src/mame/konami/k053251.cpp', sourceLine: 176, sourceColumn: 1, sourceEndLine: 179, sourceParameters: 'u8 ci', sourceBody: 'return m_ram[ci & 0xf];'};
MERGE (n:KG {id: 'handler:k052109_device.tilemap_draw'}) SET n:Handler SET n += {method: 'tilemap_draw', ownerClass: 'k052109_device', sourceFile: 'src/mame/konami/k052109.cpp', sourceLine: 648, sourceColumn: 1, sourceEndLine: 651, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect, int tmap_num, u32 flags, u8 priority, u8 priority_mask', sourceBody: 'm_tilemap[tmap_num]->draw(screen, bitmap, cliprect, flags, priority, priority_mask);'};
MERGE (n:KG {id: 'handler:.konami_sortlayers3'}) SET n:Handler SET n += {method: 'konami_sortlayers3', ownerClass: '', sourceFile: 'src/mame/konami/konami_helper.h', sourceLine: 34, sourceColumn: 1, sourceEndLine: 37, sourceParameters: 'T *layer, U *pri', sourceBody: 'konami_sortlayers<3>(std::less<U>(), layer, pri);'};
MERGE (n:KG {id: 'handler:.konami_sortlayers'}) SET n:Handler SET n += {method: 'konami_sortlayers', ownerClass: '', sourceFile: 'src/mame/konami/konami_helper.h', sourceLine: 18, sourceColumn: 1, sourceEndLine: 30, sourceParameters: 'C cmp, T *layer, U *pri', sourceBody: 'if constexpr (B > (A + 1))
		konami_sortlayers<N, A, B - 1>(cmp, layer, pri);
	else if constexpr (A > 0)
		konami_sortlayers<N, A - 1, N - 1>(cmp, layer, pri);
	if (cmp(pri[A], pri[B]))
	{
		using std::swap;
		swap(pri[A], pri[B]);
		swap(layer[A], layer[B]);
	}'};
MERGE (n:KG {id: 'device:simpsons_state.simpsons/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, "palette").set_format(palette_device::xBGR_555, 2048).enable_shadows().enable_highlights()'], sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 662, sourceColumn: 2, sourceEndLine: 662};
MERGE (n:KG {id: 'device:simpsons_state.simpsons/k052109'}) SET n:Device SET n += {type: 'K052109', tag: 'k052109', clock: 24000000, config: ['K052109(config, m_k052109, 24_MHz_XTAL)', 'm_k052109->set_palette("palette")', 'm_k052109->set_screen("screen")', 'm_k052109->set_tile_callback(FUNC(simpsons_state::tile_callback))', 'm_k052109->irq_handler().set_inputline(m_maincpu, KONAMI_IRQ_LINE)'], cls: 'k052109_device', clsHierarchy: ['k052109_device'], sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 664, sourceColumn: 2, sourceEndLine: 664};
MERGE (n:KG {id: 'device:simpsons_state.simpsons/k052109/callback:k052109:0'}) SET n:Callback SET n += {signal: 'set_tile_callback', delegate: 1, operation: 'set_tile_callback', raw: 'm_k052109->set_tile_callback(FUNC(simpsons_state::tile_callback))', ownerTag: 'k052109', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 667, sourceColumn: 2, sourceEndLine: 667, targetClass: 'simpsons_state', targetMethod: 'tile_callback'};
MERGE (n:KG {id: 'handler:simpsons_state.tile_callback'}) SET n:Handler SET n += {method: 'tile_callback', ownerClass: 'simpsons_state', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 210, sourceColumn: 1, sourceEndLine: 214, sourceParameters: 'int layer, int bank, int &code, int &color, int &flags, int &priority', sourceBody: 'code |= ((color & 0x3f) << 8) | (bank << 14);
	color = m_layer_colorbase[layer] + ((color & 0xc0) >> 6);'};
MERGE (n:KG {id: 'device:simpsons_state.simpsons/k052109/callback:k052109:1'}) SET n:Callback SET n += {signal: 'irq_handler', operation: 'set_inputline', raw: 'm_k052109->irq_handler().set_inputline(m_maincpu, KONAMI_IRQ_LINE)', ownerTag: 'k052109', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 668, sourceColumn: 2, sourceEndLine: 668, inputLine: 'KONAMI_IRQ_LINE', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:simpsons_state.simpsons/k053246'}) SET n:Device SET n += {type: 'K053246', tag: 'k053246', clock: 24000000, config: ['K053246(config, m_k053246, 24_MHz_XTAL)', 'm_k053246->set_sprite_callback(FUNC(simpsons_state::sprite_callback))', 'm_k053246->set_config(NORMAL_PLANE_ORDER, -43, 23)', 'm_k053246->set_palette("palette")'], sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 670, sourceColumn: 2, sourceEndLine: 670, configCalls: ['set_config(4,-43,23)']};
MERGE (n:KG {id: 'device:simpsons_state.simpsons/k053246/callback:k053246:0'}) SET n:Callback SET n += {signal: 'set_sprite_callback', delegate: 1, operation: 'set_sprite_callback', raw: 'm_k053246->set_sprite_callback(FUNC(simpsons_state::sprite_callback))', ownerTag: 'k053246', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 671, sourceColumn: 2, sourceEndLine: 671, targetClass: 'simpsons_state', targetMethod: 'sprite_callback'};
MERGE (n:KG {id: 'handler:simpsons_state.sprite_callback'}) SET n:Handler SET n += {method: 'sprite_callback', ownerClass: 'simpsons_state', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 223, sourceColumn: 1, sourceEndLine: 237, sourceParameters: 'int &code, int &color, int &priority_mask', sourceBody: 'int const pri = (color & 0x0f80) >> 6;   /* ??????? */

	if (pri <= m_layerpri[2])
		priority_mask = 0;
	else if (pri > m_layerpri[2] && pri <= m_layerpri[1])
		priority_mask = 0xf0;
	else if (pri > m_layerpri[1] && pri <= m_layerpri[0])
		priority_mask = 0xf0 | 0xcc;
	else
		priority_mask = 0xf0 | 0xcc | 0xaa;

	color = m_sprite_colorbase + (color & 0x001f);'};
MERGE (n:KG {id: 'device:simpsons_state.simpsons/k053251'}) SET n:Device SET n += {type: 'K053251', tag: 'k053251', clock: 0, config: ['K053251(config, m_k053251)'], cls: 'k053251_device', clsHierarchy: ['k053251_device'], sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 675, sourceColumn: 2, sourceEndLine: 675};
MERGE (n:KG {id: 'device:simpsons_state.simpsons/speaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speaker', clock: 2, config: ['SPEAKER(config, "speaker", 2).front()'], sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 678, sourceColumn: 2, sourceEndLine: 678};
MERGE (n:KG {id: 'device:simpsons_state.simpsons/ymsnd'}) SET n:Device SET n += {type: 'YM2151', tag: 'ymsnd', clock: 3579545, config: ['ym2151_device &ymsnd(YM2151(config, "ymsnd", 3.579545_MHz_XTAL))', 'ymsnd.add_route(0, "speaker", 0.5, 0)', 'ymsnd.add_route(0, "speaker", 0.5, 1)', 'ymsnd.add_route(1, "speaker", 0.0, 0)', 'ymsnd.add_route(1, "speaker", 0.0, 1)'], sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 680, sourceColumn: 2, sourceEndLine: 680};
MERGE (n:KG {id: 'audioroute:device:simpsons_state.simpsons/ymsnd/0'}) SET n:AudioRoute SET n += {output: '0', target: 'speaker', gain: 0.5, input: 0, raw: 'ymsnd.add_route(0, "speaker", 0.5, 0)', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 681, sourceColumn: 2, sourceEndLine: 681};
MERGE (n:KG {id: 'audioroute:device:simpsons_state.simpsons/ymsnd/1'}) SET n:AudioRoute SET n += {output: '0', target: 'speaker', gain: 0.5, input: 1, raw: 'ymsnd.add_route(0, "speaker", 0.5, 1)', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 682, sourceColumn: 2, sourceEndLine: 682};
MERGE (n:KG {id: 'audioroute:device:simpsons_state.simpsons/ymsnd/2'}) SET n:AudioRoute SET n += {output: '1', target: 'speaker', gain: 0, input: 0, raw: 'ymsnd.add_route(1, "speaker", 0.0, 0)', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 683, sourceColumn: 2, sourceEndLine: 683};
MERGE (n:KG {id: 'audioroute:device:simpsons_state.simpsons/ymsnd/3'}) SET n:AudioRoute SET n += {output: '1', target: 'speaker', gain: 0, input: 1, raw: 'ymsnd.add_route(1, "speaker", 0.0, 1)', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 684, sourceColumn: 2, sourceEndLine: 684};
MERGE (n:KG {id: 'device:simpsons_state.simpsons/k053260'}) SET n:Device SET n += {type: 'K053260', tag: 'k053260', clock: 3579545, config: ['k053260_device &k053260(K053260(config, "k053260", 3.579545_MHz_XTAL))', 'k053260.add_route(0, "speaker", 0.5, 0)', 'k053260.add_route(1, "speaker", 0.5, 1)', 'k053260.sh1_cb().set(FUNC(simpsons_state::z80_nmi_w))'], sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 686, sourceColumn: 2, sourceEndLine: 686};
MERGE (n:KG {id: 'audioroute:device:simpsons_state.simpsons/k053260/0'}) SET n:AudioRoute SET n += {output: '0', target: 'speaker', gain: 0.5, input: 0, raw: 'k053260.add_route(0, "speaker", 0.5, 0)', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 687, sourceColumn: 2, sourceEndLine: 687};
MERGE (n:KG {id: 'audioroute:device:simpsons_state.simpsons/k053260/1'}) SET n:AudioRoute SET n += {output: '1', target: 'speaker', gain: 0.5, input: 1, raw: 'k053260.add_route(1, "speaker", 0.5, 1)', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 688, sourceColumn: 2, sourceEndLine: 688};
MERGE (n:KG {id: 'device:simpsons_state.simpsons/k053260/callback:k053260:0'}) SET n:Callback SET n += {signal: 'sh1_cb', operation: 'set', raw: 'k053260.sh1_cb().set(FUNC(simpsons_state::z80_nmi_w))', ownerTag: 'k053260', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 689, sourceColumn: 2, sourceEndLine: 689, targetClass: 'simpsons_state', targetMethod: 'z80_nmi_w'};
MERGE (n:KG {id: 'handler:simpsons_state.z80_nmi_w'}) SET n:Handler SET n += {method: 'z80_nmi_w', ownerClass: 'simpsons_state', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 501, sourceColumn: 1, sourceEndLine: 505, sourceParameters: 'int state', sourceBody: 'if (state && !m_nmi_blocked->enabled())
		m_audiocpu->set_input_line(INPUT_LINE_NMI, ASSERT_LINE);'};
MERGE (n:KG {id: 'inputs:simpsons'}) SET n:InputPorts SET n += {name: 'simpsons', sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 524, sourceColumn: 8, sourceEndLine: 524};
MERGE (n:KG {id: 'inputs:simpsons/P1'}) SET n:Port SET n += {tag: 'P1', modify: false};
MERGE (n:KG {id: 'inputs:simpsons/P1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:simpsons/P1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:simpsons/P1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:simpsons/P1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:simpsons/P1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(1)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:simpsons/P1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(1)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:simpsons/P1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', modifiers: ['PORT_PLAYER(1)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:simpsons/P1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_START1', defaultValue: 128};
MERGE (n:KG {id: 'inputs:simpsons/P2'}) SET n:Port SET n += {tag: 'P2', modify: false};
MERGE (n:KG {id: 'inputs:simpsons/P2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:simpsons/P2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:simpsons/P2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:simpsons/P2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:simpsons/P2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(2)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:simpsons/P2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(2)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:simpsons/P2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', modifiers: ['PORT_PLAYER(2)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:simpsons/P2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_START2', defaultValue: 128};
MERGE (n:KG {id: 'inputs:simpsons/P3'}) SET n:Port SET n += {tag: 'P3', modify: false};
MERGE (n:KG {id: 'inputs:simpsons/P3/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(3)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:simpsons/P3/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(3)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:simpsons/P3/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_PLAYER(3)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:simpsons/P3/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_PLAYER(3)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:simpsons/P3/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(3)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:simpsons/P3/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(3)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:simpsons/P3/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', modifiers: ['PORT_PLAYER(3)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:simpsons/P3/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_START3', defaultValue: 128};
MERGE (n:KG {id: 'inputs:simpsons/P4'}) SET n:Port SET n += {tag: 'P4', modify: false};
MERGE (n:KG {id: 'inputs:simpsons/P4/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(4)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:simpsons/P4/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(4)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:simpsons/P4/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_PLAYER(4)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:simpsons/P4/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_PLAYER(4)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:simpsons/P4/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(4)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:simpsons/P4/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(4)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:simpsons/P4/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', modifiers: ['PORT_PLAYER(4)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:simpsons/P4/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_START4', defaultValue: 128};
MERGE (n:KG {id: 'inputs:simpsons/COIN'}) SET n:Port SET n += {tag: 'COIN', modify: false};
MERGE (n:KG {id: 'inputs:simpsons/COIN/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_COIN1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:simpsons/COIN/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_COIN2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:simpsons/COIN/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_COIN3', defaultValue: 4};
MERGE (n:KG {id: 'inputs:simpsons/COIN/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_COIN4', defaultValue: 8};
MERGE (n:KG {id: 'inputs:simpsons/COIN/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 16};
MERGE (n:KG {id: 'inputs:simpsons/COIN/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 32};
MERGE (n:KG {id: 'inputs:simpsons/COIN/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 64};
MERGE (n:KG {id: 'inputs:simpsons/COIN/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:simpsons/TEST'}) SET n:Port SET n += {tag: 'TEST', modify: false};
MERGE (n:KG {id: 'inputs:simpsons/TEST/f0'}) SET n:PortField SET n += {kind: 'service', mask: 1, activeLow: true, defaultValue: 1};
MERGE (n:KG {id: 'inputs:simpsons/TEST/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("eeprom", FUNC(eeprom_serial_er5911_device::do_read))'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:simpsons/TEST/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_DEVICE_MEMBER("eeprom", FUNC(eeprom_serial_er5911_device::ready_read))'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:simpsons/TEST/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 206, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 206};
MERGE (n:KG {id: 'inputs:simpsons/EEPROMOUT'}) SET n:Port SET n += {tag: 'EEPROMOUT', modify: false};
MERGE (n:KG {id: 'inputs:simpsons/EEPROMOUT/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_OUTPUT', modifiers: ['PORT_WRITE_LINE_DEVICE_MEMBER("eeprom", FUNC(eeprom_serial_er5911_device::cs_write))'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:simpsons/EEPROMOUT/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: false, type: 'IPT_OUTPUT', modifiers: ['PORT_WRITE_LINE_DEVICE_MEMBER("eeprom", FUNC(eeprom_serial_er5911_device::clk_write))'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:simpsons/EEPROMOUT/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: false, type: 'IPT_OUTPUT', modifiers: ['PORT_WRITE_LINE_DEVICE_MEMBER("eeprom", FUNC(eeprom_serial_er5911_device::di_write))'], defaultValue: 0};
MATCH (a:KG {id: 'game:simpsons'}), (b:KG {id: 'file:src/mame/konami/simpsons.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 972, sourceColumn: 1, sourceEndLine: 972};
MATCH (a:KG {id: 'game:simpsons'}), (b:KG {id: 'machine:simpsons_state.simpsons'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:simpsons'}), (b:KG {id: 'inputs:simpsons'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:simpsons'}), (b:KG {id: 'romset:simpsons'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/simpsons.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/simpsons.cpp'}), (b:KG {id: 'file:k052109.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/simpsons.cpp'}), (b:KG {id: 'file:k053251.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/simpsons.cpp'}), (b:KG {id: 'file:k053246_k053247_k055673.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/simpsons.cpp'}), (b:KG {id: 'file:konamipt.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/simpsons.cpp'}), (b:KG {id: 'file:konami_helper.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/simpsons.cpp'}), (b:KG {id: 'file:cpu/m6809/konami.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/simpsons.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/simpsons.cpp'}), (b:KG {id: 'file:machine/eepromser.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/simpsons.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/simpsons.cpp'}), (b:KG {id: 'file:sound/k053260.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/simpsons.cpp'}), (b:KG {id: 'file:sound/ymopm.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/simpsons.cpp'}), (b:KG {id: 'file:emupal.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/simpsons.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:simpsons_state.simpsons'}), (b:KG {id: 'file:src/mame/konami/simpsons.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 638, sourceColumn: 1, sourceEndLine: 690};
MATCH (a:KG {id: 'machine:simpsons_state.simpsons'}), (b:KG {id: 'handler:simpsons_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:simpsons_state.simpsons'}), (b:KG {id: 'bank:simpsons_state.simpsons/mainbank'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:simpsons_state.simpsons'}), (b:KG {id: 'bank:simpsons_state.simpsons/audiobank/1'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:simpsons_state.simpsons'}), (b:KG {id: 'bank:simpsons_state.simpsons/audiobank/2'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:simpsons_state.simpsons'}), (b:KG {id: 'device:simpsons_state.simpsons/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:simpsons_state.simpsons'}), (b:KG {id: 'device:simpsons_state.simpsons/audiocpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:simpsons_state.simpsons'}), (b:KG {id: 'device:simpsons_state.simpsons/eeprom'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:simpsons_state.simpsons'}), (b:KG {id: 'device:simpsons_state.simpsons/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:simpsons_state.simpsons'}), (b:KG {id: 'device:simpsons_state.simpsons/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:simpsons_state.simpsons'}), (b:KG {id: 'device:simpsons_state.simpsons/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:simpsons_state.simpsons'}), (b:KG {id: 'device:simpsons_state.simpsons/k052109'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:simpsons_state.simpsons'}), (b:KG {id: 'device:simpsons_state.simpsons/k053246'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:simpsons_state.simpsons'}), (b:KG {id: 'device:simpsons_state.simpsons/k053251'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:simpsons_state.simpsons'}), (b:KG {id: 'device:simpsons_state.simpsons/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:simpsons_state.simpsons'}), (b:KG {id: 'device:simpsons_state.simpsons/ymsnd'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:simpsons_state.simpsons'}), (b:KG {id: 'device:simpsons_state.simpsons/k053260'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:simpsons'}), (b:KG {id: 'file:src/mame/konami/simpsons.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 524, sourceColumn: 8, sourceEndLine: 524};
MATCH (a:KG {id: 'inputs:simpsons'}), (b:KG {id: 'inputs:simpsons/P1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:simpsons'}), (b:KG {id: 'inputs:simpsons/P2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:simpsons'}), (b:KG {id: 'inputs:simpsons/P3'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:simpsons'}), (b:KG {id: 'inputs:simpsons/P4'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:simpsons'}), (b:KG {id: 'inputs:simpsons/COIN'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:simpsons'}), (b:KG {id: 'inputs:simpsons/TEST'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:simpsons'}), (b:KG {id: 'inputs:simpsons/EEPROMOUT'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:simpsons'}), (b:KG {id: 'file:src/mame/konami/simpsons.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 699, sourceColumn: 1, sourceEndLine: 699};
MATCH (a:KG {id: 'romset:simpsons'}), (b:KG {id: 'region:simpsons/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:simpsons'}), (b:KG {id: 'region:simpsons/audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:simpsons'}), (b:KG {id: 'region:simpsons/k052109'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:simpsons'}), (b:KG {id: 'region:simpsons/k053246'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:simpsons'}), (b:KG {id: 'region:simpsons/k053260'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:simpsons'}), (b:KG {id: 'region:simpsons/eeprom'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:simpsons_state.machine_reset'}), (b:KG {id: 'handler:simpsons_state.video_bank_select'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'bank:simpsons_state.simpsons/mainbank'}), (b:KG {id: 'file:src/mame/konami/simpsons.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 390, sourceColumn: 1, sourceEndLine: 408};
MATCH (a:KG {id: 'bank:simpsons_state.simpsons/audiobank/1'}), (b:KG {id: 'file:src/mame/konami/simpsons.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 390, sourceColumn: 1, sourceEndLine: 408};
MATCH (a:KG {id: 'bank:simpsons_state.simpsons/audiobank/2'}), (b:KG {id: 'file:src/mame/konami/simpsons.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 390, sourceColumn: 1, sourceEndLine: 408};
MATCH (a:KG {id: 'device:simpsons_state.simpsons/maincpu'}), (b:KG {id: 'device:simpsons_state.simpsons/maincpu/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:simpsons_state.simpsons/maincpu'}), (b:KG {id: 'device:simpsons_state.simpsons/maincpu/callback:maincpu:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:simpsons_state.simpsons/maincpu'}), (b:KG {id: 'map:simpsons_state.main_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:simpsons_state.simpsons/audiocpu'}), (b:KG {id: 'map:simpsons_state.z80_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:simpsons_state.simpsons/screen'}), (b:KG {id: 'device:simpsons_state.simpsons/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:simpsons_state.simpsons/k052109'}), (b:KG {id: 'device:simpsons_state.simpsons/k052109/callback:k052109:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:simpsons_state.simpsons/k052109'}), (b:KG {id: 'device:simpsons_state.simpsons/k052109/callback:k052109:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:simpsons_state.simpsons/k053246'}), (b:KG {id: 'device:simpsons_state.simpsons/k053246/callback:k053246:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:simpsons_state.simpsons/ymsnd'}), (b:KG {id: 'audioroute:device:simpsons_state.simpsons/ymsnd/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:simpsons_state.simpsons/ymsnd'}), (b:KG {id: 'audioroute:device:simpsons_state.simpsons/ymsnd/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:simpsons_state.simpsons/ymsnd'}), (b:KG {id: 'audioroute:device:simpsons_state.simpsons/ymsnd/2'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:simpsons_state.simpsons/ymsnd'}), (b:KG {id: 'audioroute:device:simpsons_state.simpsons/ymsnd/3'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:simpsons_state.simpsons/k053260'}), (b:KG {id: 'audioroute:device:simpsons_state.simpsons/k053260/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:simpsons_state.simpsons/k053260'}), (b:KG {id: 'audioroute:device:simpsons_state.simpsons/k053260/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:simpsons_state.simpsons/k053260'}), (b:KG {id: 'device:simpsons_state.simpsons/k053260/callback:k053260:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P1'}), (b:KG {id: 'inputs:simpsons/P1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P1'}), (b:KG {id: 'inputs:simpsons/P1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P1'}), (b:KG {id: 'inputs:simpsons/P1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P1'}), (b:KG {id: 'inputs:simpsons/P1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P1'}), (b:KG {id: 'inputs:simpsons/P1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P1'}), (b:KG {id: 'inputs:simpsons/P1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P1'}), (b:KG {id: 'inputs:simpsons/P1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P1'}), (b:KG {id: 'inputs:simpsons/P1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P2'}), (b:KG {id: 'inputs:simpsons/P2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P2'}), (b:KG {id: 'inputs:simpsons/P2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P2'}), (b:KG {id: 'inputs:simpsons/P2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P2'}), (b:KG {id: 'inputs:simpsons/P2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P2'}), (b:KG {id: 'inputs:simpsons/P2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P2'}), (b:KG {id: 'inputs:simpsons/P2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P2'}), (b:KG {id: 'inputs:simpsons/P2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P2'}), (b:KG {id: 'inputs:simpsons/P2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P3'}), (b:KG {id: 'inputs:simpsons/P3/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P3'}), (b:KG {id: 'inputs:simpsons/P3/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P3'}), (b:KG {id: 'inputs:simpsons/P3/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P3'}), (b:KG {id: 'inputs:simpsons/P3/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P3'}), (b:KG {id: 'inputs:simpsons/P3/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P3'}), (b:KG {id: 'inputs:simpsons/P3/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P3'}), (b:KG {id: 'inputs:simpsons/P3/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P3'}), (b:KG {id: 'inputs:simpsons/P3/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P4'}), (b:KG {id: 'inputs:simpsons/P4/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P4'}), (b:KG {id: 'inputs:simpsons/P4/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P4'}), (b:KG {id: 'inputs:simpsons/P4/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P4'}), (b:KG {id: 'inputs:simpsons/P4/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P4'}), (b:KG {id: 'inputs:simpsons/P4/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P4'}), (b:KG {id: 'inputs:simpsons/P4/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P4'}), (b:KG {id: 'inputs:simpsons/P4/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/P4'}), (b:KG {id: 'inputs:simpsons/P4/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/COIN'}), (b:KG {id: 'inputs:simpsons/COIN/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/COIN'}), (b:KG {id: 'inputs:simpsons/COIN/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/COIN'}), (b:KG {id: 'inputs:simpsons/COIN/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/COIN'}), (b:KG {id: 'inputs:simpsons/COIN/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/COIN'}), (b:KG {id: 'inputs:simpsons/COIN/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/COIN'}), (b:KG {id: 'inputs:simpsons/COIN/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/COIN'}), (b:KG {id: 'inputs:simpsons/COIN/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/COIN'}), (b:KG {id: 'inputs:simpsons/COIN/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/TEST'}), (b:KG {id: 'inputs:simpsons/TEST/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/TEST'}), (b:KG {id: 'inputs:simpsons/TEST/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/TEST'}), (b:KG {id: 'inputs:simpsons/TEST/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/TEST'}), (b:KG {id: 'inputs:simpsons/TEST/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/EEPROMOUT'}), (b:KG {id: 'inputs:simpsons/EEPROMOUT/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/EEPROMOUT'}), (b:KG {id: 'inputs:simpsons/EEPROMOUT/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:simpsons/EEPROMOUT'}), (b:KG {id: 'inputs:simpsons/EEPROMOUT/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:simpsons/maincpu'}), (b:KG {id: 'rom:simpsons/maincpu/072-g02.16c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:simpsons/maincpu'}), (b:KG {id: 'rom:simpsons/maincpu/072-g01.17c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:simpsons/maincpu'}), (b:KG {id: 'rom:simpsons/maincpu/072-j13.13c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:simpsons/maincpu'}), (b:KG {id: 'rom:simpsons/maincpu/072-j12.15c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:simpsons/audiocpu'}), (b:KG {id: 'rom:simpsons/audiocpu/072-e03.6g'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:simpsons/k052109'}), (b:KG {id: 'rom:simpsons/k052109/072-b07.18h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:simpsons/k052109'}), (b:KG {id: 'rom:simpsons/k052109/072-b06.16h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:simpsons/k053246'}), (b:KG {id: 'rom:simpsons/k053246/072-b08.3n'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:simpsons/k053246'}), (b:KG {id: 'rom:simpsons/k053246/072-b09.8n'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:simpsons/k053246'}), (b:KG {id: 'rom:simpsons/k053246/072-b10.12n'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:simpsons/k053246'}), (b:KG {id: 'rom:simpsons/k053246/072-b11.16l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:simpsons/k053260'}), (b:KG {id: 'rom:simpsons/k053260/072-d05.1f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:simpsons/k053260'}), (b:KG {id: 'rom:simpsons/k053260/072-d04.1d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:simpsons/eeprom'}), (b:KG {id: 'rom:simpsons/eeprom/simpsons.12c.nv'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'device:simpsons_state.simpsons/maincpu/callback:maincpu:0'}), (b:KG {id: 'handler:simpsons_state.periodic_irq'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:simpsons_state.simpsons/maincpu/callback:maincpu:1'}), (b:KG {id: 'handler:simpsons_state.banking_callback'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'file:src/mame/konami/simpsons.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 441, sourceColumn: 1, sourceEndLine: 467};
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'map:simpsons_state.main_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'map:simpsons_state.main_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'map:simpsons_state.main_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'map:simpsons_state.main_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'map:simpsons_state.main_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'map:simpsons_state.main_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'map:simpsons_state.main_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'map:simpsons_state.main_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'map:simpsons_state.main_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'map:simpsons_state.main_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'map:simpsons_state.main_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'map:simpsons_state.main_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'map:simpsons_state.main_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'map:simpsons_state.main_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'map:simpsons_state.main_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'map:simpsons_state.main_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'map:simpsons_state.main_map/range16'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'map:simpsons_state.main_map/range17'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'map:simpsons_state.main_map/range18'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'map:simpsons_state.main_map/range19'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'map:simpsons_state.main_map/range20'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'map:simpsons_state.main_map/range21'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'map:simpsons_state.main_map/range22'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map'}), (b:KG {id: 'map:simpsons_state.main_map/range23'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.z80_map'}), (b:KG {id: 'file:src/mame/konami/simpsons.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/simpsons.cpp', sourceLine: 507, sourceColumn: 1, sourceEndLine: 516};
MATCH (a:KG {id: 'map:simpsons_state.z80_map'}), (b:KG {id: 'map:simpsons_state.z80_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.z80_map'}), (b:KG {id: 'map:simpsons_state.z80_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.z80_map'}), (b:KG {id: 'map:simpsons_state.z80_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.z80_map'}), (b:KG {id: 'map:simpsons_state.z80_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.z80_map'}), (b:KG {id: 'map:simpsons_state.z80_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.z80_map'}), (b:KG {id: 'map:simpsons_state.z80_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:simpsons_state.z80_map'}), (b:KG {id: 'map:simpsons_state.z80_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:simpsons_state.simpsons/screen/callback:screen:0'}), (b:KG {id: 'handler:simpsons_state.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:simpsons_state.simpsons/k052109/callback:k052109:0'}), (b:KG {id: 'handler:simpsons_state.tile_callback'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:simpsons_state.simpsons/k052109/callback:k052109:1'}), (b:KG {id: 'device:simpsons_state.simpsons/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:simpsons_state.simpsons/k053246/callback:k053246:0'}), (b:KG {id: 'handler:simpsons_state.sprite_callback'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:simpsons_state.simpsons/k053260/callback:k053260:0'}), (b:KG {id: 'handler:simpsons_state.z80_nmi_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:simpsons_state.periodic_irq'}), (b:KG {id: 'handler:simpsons_state.object_dma'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:simpsons_state.periodic_irq'}), (b:KG {id: 'handler:k053247_device.k053246_is_irq_enabled'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map/range0'}), (b:KG {id: 'handler:k052109_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'k052109'};
MATCH (a:KG {id: 'map:simpsons_state.main_map/range0'}), (b:KG {id: 'handler:k052109_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'k052109'};
MATCH (a:KG {id: 'map:simpsons_state.main_map/range2'}), (b:KG {id: 'handler:palette_device.write8'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'palette'};
MATCH (a:KG {id: 'map:simpsons_state.main_map/range9'}), (b:KG {id: 'handler:k053247_device.k053246_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'k053246'};
MATCH (a:KG {id: 'map:simpsons_state.main_map/range10'}), (b:KG {id: 'handler:k053251_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'k053251'};
MATCH (a:KG {id: 'map:simpsons_state.main_map/range11'}), (b:KG {id: 'handler:simpsons_state.coin_counter_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map/range12'}), (b:KG {id: 'handler:simpsons_state.eeprom_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map/range13'}), (b:KG {id: 'handler:simpsons_state.sound_interrupt_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map/range14'}), (b:KG {id: 'handler:k053260_device.main_read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'k053260'};
MATCH (a:KG {id: 'map:simpsons_state.main_map/range14'}), (b:KG {id: 'handler:k053260_device.main_write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'k053260'};
MATCH (a:KG {id: 'map:simpsons_state.main_map/range15'}), (b:KG {id: 'handler:k053247_device.k053246_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'k053246'};
MATCH (a:KG {id: 'map:simpsons_state.main_map/range16'}), (b:KG {id: 'handler:watchdog_timer_device.reset_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:simpsons_state.main_map/range18'}), (b:KG {id: 'handler:simpsons_state.k052109_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map/range18'}), (b:KG {id: 'handler:simpsons_state.k052109_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map/range19'}), (b:KG {id: 'handler:simpsons_state.k053247_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:simpsons_state.main_map/range19'}), (b:KG {id: 'handler:simpsons_state.k053247_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:simpsons_state.z80_map/range3'}), (b:KG {id: 'handler:ym2151_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ymsnd'};
MATCH (a:KG {id: 'map:simpsons_state.z80_map/range3'}), (b:KG {id: 'handler:ym2151_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ymsnd'};
MATCH (a:KG {id: 'map:simpsons_state.z80_map/range4'}), (b:KG {id: 'handler:simpsons_state.z80_arm_nmi_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:simpsons_state.z80_map/range5'}), (b:KG {id: 'handler:k053260_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'k053260'};
MATCH (a:KG {id: 'map:simpsons_state.z80_map/range5'}), (b:KG {id: 'handler:k053260_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'k053260'};
MATCH (a:KG {id: 'map:simpsons_state.z80_map/range6'}), (b:KG {id: 'handler:simpsons_state.z80_bankswitch_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:simpsons_state.screen_update'}), (b:KG {id: 'handler:k053251_device.get_palette_index'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:simpsons_state.screen_update'}), (b:KG {id: 'handler:k052109_device.mark_tilemap_dirty'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:simpsons_state.screen_update'}), (b:KG {id: 'handler:k053251_device.get_priority'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:simpsons_state.screen_update'}), (b:KG {id: 'handler:k052109_device.tilemap_draw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:simpsons_state.screen_update'}), (b:KG {id: 'handler:.konami_sortlayers3'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:simpsons_state.object_dma'}), (b:KG {id: 'handler:k053247_device.k053247_get_ram'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:k052109_device.write'}), (b:KG {id: 'handler:k052109_device.tileflip_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:k053251_device.write'}), (b:KG {id: 'handler:k053251_device.reset_indexes'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:simpsons_state.coin_counter_w'}), (b:KG {id: 'handler:k052109_device.set_rmrd_line'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:simpsons_state.coin_counter_w'}), (b:KG {id: 'handler:k053247_device.k053246_set_objcha_line'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:simpsons_state.eeprom_w'}), (b:KG {id: 'handler:simpsons_state.video_bank_select'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:simpsons_state.k052109_r'}), (b:KG {id: 'handler:k052109_device.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:.konami_sortlayers3'}), (b:KG {id: 'handler:.konami_sortlayers'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
