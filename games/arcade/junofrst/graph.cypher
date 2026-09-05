// mamekit knowledge graph — driver src/mame/konami/junofrst.cpp
// generated 2026-09-05T03:49:46.532Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/konami/junofrst.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/konami/junofrst.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:tutankhm.h'}) SET n:SourceFile SET n += {path: 'tutankhm.h', external: true};
MERGE (n:KG {id: 'file:konamipt.h'}) SET n:SourceFile SET n += {path: 'konamipt.h', external: true};
MERGE (n:KG {id: 'file:konami1.h'}) SET n:SourceFile SET n += {path: 'konami1.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6809/m6809.h'}) SET n:SourceFile SET n += {path: 'cpu/m6809/m6809.h', external: true};
MERGE (n:KG {id: 'file:cpu/mcs48/mcs48.h'}) SET n:SourceFile SET n += {path: 'cpu/mcs48/mcs48.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:machine/74259.h'}) SET n:SourceFile SET n += {path: 'machine/74259.h', external: true};
MERGE (n:KG {id: 'file:machine/gen_latch.h'}) SET n:SourceFile SET n += {path: 'machine/gen_latch.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:sound/ay8910.h'}) SET n:SourceFile SET n += {path: 'sound/ay8910.h', external: true};
MERGE (n:KG {id: 'file:sound/dac.h'}) SET n:SourceFile SET n += {path: 'sound/dac.h', external: true};
MERGE (n:KG {id: 'file:sound/flt_rc.h'}) SET n:SourceFile SET n += {path: 'sound/flt_rc.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'game:junofrst'}) SET n:Game SET n += {name: 'junofrst', year: '1983', company: 'Konami', fullname: 'Juno First', monitor: 'ROT90', cls: 'junofrst_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 494, sourceColumn: 1, sourceEndLine: 494};
MERGE (n:KG {id: 'romset:junofrst'}) SET n:RomSet SET n += {name: 'junofrst', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 441, sourceColumn: 1, sourceEndLine: 441};
MERGE (n:KG {id: 'region:junofrst/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 131072, flags: 'ROMREGION_ERASE00', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 442, sourceColumn: 2, sourceEndLine: 442};
MERGE (n:KG {id: 'rom:junofrst/maincpu/jfa_b9.bin'}) SET n:Rom SET n += {file: 'jfa_b9.bin', offset: 40960, size: 8192, crc: 'f5a7ab9d', sha1: '9603e797839290f8e1f93ccff9cc820604cc49ab', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 443, sourceColumn: 2, sourceEndLine: 443};
MERGE (n:KG {id: 'rom:junofrst/maincpu/jfb_b10.bin'}) SET n:Rom SET n += {file: 'jfb_b10.bin', offset: 49152, size: 8192, crc: 'f20626e0', sha1: '46f58bdc1a613124e2c148b61f774fcc6c232868', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 444, sourceColumn: 2, sourceEndLine: 444};
MERGE (n:KG {id: 'rom:junofrst/maincpu/jfc_a10.bin'}) SET n:Rom SET n += {file: 'jfc_a10.bin', offset: 57344, size: 8192, crc: '1e7744a7', sha1: 'bee69833af886436016560295cddf0c8b4c5e771', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 445, sourceColumn: 2, sourceEndLine: 445};
MERGE (n:KG {id: 'rom:junofrst/maincpu/jfc1_a4.bin'}) SET n:Rom SET n += {file: 'jfc1_a4.bin', offset: 65536, size: 8192, crc: '03ccbf1d', sha1: '02b45fe3c51bdc940919aac68136a121ed9bee18', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 447, sourceColumn: 2, sourceEndLine: 447};
MERGE (n:KG {id: 'rom:junofrst/maincpu/jfc2_a5.bin'}) SET n:Rom SET n += {file: 'jfc2_a5.bin', offset: 73728, size: 8192, crc: 'cb372372', sha1: 'a48e7de08647cbece7787c287217eac7e7a7510b', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 448, sourceColumn: 2, sourceEndLine: 448};
MERGE (n:KG {id: 'rom:junofrst/maincpu/jfc3_a6.bin'}) SET n:Rom SET n += {file: 'jfc3_a6.bin', offset: 81920, size: 8192, crc: '879d194b', sha1: '3c7af8767c9ce908fa1761180c6e585823216d8a', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 449, sourceColumn: 2, sourceEndLine: 449};
MERGE (n:KG {id: 'rom:junofrst/maincpu/jfc4_a7.bin'}) SET n:Rom SET n += {file: 'jfc4_a7.bin', offset: 90112, size: 8192, crc: 'f28af80b', sha1: '4d0e247e729365476dd3996c7d1f2a19fc83d773', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 450, sourceColumn: 2, sourceEndLine: 450};
MERGE (n:KG {id: 'rom:junofrst/maincpu/jfc5_a8.bin'}) SET n:Rom SET n += {file: 'jfc5_a8.bin', offset: 98304, size: 8192, crc: '0539f328', sha1: 'c532aaed7f9e6f564e3df0dc6d8fdbee6ed721a2', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 451, sourceColumn: 2, sourceEndLine: 451};
MERGE (n:KG {id: 'rom:junofrst/maincpu/jfc6_a9.bin'}) SET n:Rom SET n += {file: 'jfc6_a9.bin', offset: 106496, size: 8192, crc: '1da2ad6e', sha1: 'de997d1b2ff6671088b57192bc9f1279359fad5d', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 452, sourceColumn: 2, sourceEndLine: 452};
MERGE (n:KG {id: 'region:junofrst/audiocpu'}) SET n:RomRegion SET n += {tag: 'audiocpu', size: 4096, flags: '0', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 454, sourceColumn: 2, sourceEndLine: 454};
MERGE (n:KG {id: 'rom:junofrst/audiocpu/jfs1_j3.bin'}) SET n:Rom SET n += {file: 'jfs1_j3.bin', offset: 0, size: 4096, crc: '235a2893', sha1: 'b90251c4971f7ba12e407f86c32723d513d6b4a0', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 455, sourceColumn: 2, sourceEndLine: 455};
MERGE (n:KG {id: 'region:junofrst/mcu'}) SET n:RomRegion SET n += {tag: 'mcu', size: 4096, flags: '0', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 457, sourceColumn: 2, sourceEndLine: 457};
MERGE (n:KG {id: 'rom:junofrst/mcu/jfs2_p4.bin'}) SET n:Rom SET n += {file: 'jfs2_p4.bin', offset: 0, size: 4096, crc: 'd0fa5d5f', sha1: '9d0730d1d037bf96b0c933a32355602bf2d735dd', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 458, sourceColumn: 2, sourceEndLine: 458};
MERGE (n:KG {id: 'region:junofrst/blitrom'}) SET n:RomRegion SET n += {tag: 'blitrom', size: 24576, flags: '0', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 460, sourceColumn: 2, sourceEndLine: 460};
MERGE (n:KG {id: 'rom:junofrst/blitrom/jfs3_c7.bin'}) SET n:Rom SET n += {file: 'jfs3_c7.bin', offset: 0, size: 8192, crc: 'aeacf6db', sha1: 'f99ef9f9153d7a83e1881d9181faac99cb8c8a57', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 461, sourceColumn: 2, sourceEndLine: 461};
MERGE (n:KG {id: 'rom:junofrst/blitrom/jfs4_d7.bin'}) SET n:Rom SET n += {file: 'jfs4_d7.bin', offset: 8192, size: 8192, crc: '206d954c', sha1: '65494766676f18d8b5ae9a54cee00790e7b1e67e', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 462, sourceColumn: 2, sourceEndLine: 462};
MERGE (n:KG {id: 'rom:junofrst/blitrom/jfs5_e7.bin'}) SET n:Rom SET n += {file: 'jfs5_e7.bin', offset: 16384, size: 8192, crc: '1eb87a6e', sha1: 'f5471b9f6f1fa6d6e5d76300d89f71da3129516a', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 463, sourceColumn: 2, sourceEndLine: 463};
MERGE (n:KG {id: 'map:junofrst_state.main_map'}) SET n:AddressMap SET n += {cls: 'junofrst_state', name: 'main_map', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 264, sourceColumn: 1, sourceEndLine: 282};
MERGE (n:KG {id: 'map:junofrst_state.main_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).ram().share(m_videoram)', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 266, sourceColumn: 2, sourceEndLine: 266, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'map:junofrst_state.main_map/range1'}) SET n:AddressRange SET n += {start: 32768, end: 32783, raw: 'map(0x8000, 0x800f).ram().w(m_palette, FUNC(palette_device::write8)).share("palette")', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 267, sourceColumn: 2, sourceEndLine: 267, ram: true, share: 'palette'};
MERGE (n:KG {id: 'handler:palette_device.write8'}) SET n:Handler SET n += {method: 'write8', ownerClass: 'palette_device', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 169, sourceColumn: 2, sourceEndLine: 169};
MERGE (n:KG {id: 'map:junofrst_state.main_map/range2'}) SET n:AddressRange SET n += {start: 32784, end: 32784, raw: 'map(0x8010, 0x8010).portr("DSW2")', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 268, sourceColumn: 2, sourceEndLine: 268, portRead: 'DSW2'};
MERGE (n:KG {id: 'map:junofrst_state.main_map/range3'}) SET n:AddressRange SET n += {start: 32796, end: 32796, raw: 'map(0x801c, 0x801c).r("watchdog", FUNC(watchdog_timer_device::reset_r))', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 269, sourceColumn: 2, sourceEndLine: 269};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_r'}) SET n:Handler SET n += {method: 'reset_r', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 178, sourceColumn: 2, sourceEndLine: 178};
MERGE (n:KG {id: 'map:junofrst_state.main_map/range4'}) SET n:AddressRange SET n += {start: 32800, end: 32800, raw: 'map(0x8020, 0x8020).portr("SYSTEM")', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 270, sourceColumn: 2, sourceEndLine: 270, portRead: 'SYSTEM'};
MERGE (n:KG {id: 'map:junofrst_state.main_map/range5'}) SET n:AddressRange SET n += {start: 32804, end: 32804, raw: 'map(0x8024, 0x8024).portr("P1")', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 271, sourceColumn: 2, sourceEndLine: 271, portRead: 'P1'};
MERGE (n:KG {id: 'map:junofrst_state.main_map/range6'}) SET n:AddressRange SET n += {start: 32808, end: 32808, raw: 'map(0x8028, 0x8028).portr("P2")', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 272, sourceColumn: 2, sourceEndLine: 272, portRead: 'P2'};
MERGE (n:KG {id: 'map:junofrst_state.main_map/range7'}) SET n:AddressRange SET n += {start: 32812, end: 32812, raw: 'map(0x802c, 0x802c).portr("DSW1")', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 273, sourceColumn: 2, sourceEndLine: 273, portRead: 'DSW1'};
MERGE (n:KG {id: 'map:junofrst_state.main_map/range8'}) SET n:AddressRange SET n += {start: 32816, end: 32823, raw: 'map(0x8030, 0x8037).w("mainlatch", FUNC(ls259_device::write_d0))', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 274, sourceColumn: 2, sourceEndLine: 274};
MERGE (n:KG {id: 'handler:ls259_device.write_d0'}) SET n:Handler SET n += {method: 'write_d0', ownerClass: 'ls259_device', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 185, sourceColumn: 2, sourceEndLine: 185};
MERGE (n:KG {id: 'map:junofrst_state.main_map/range9'}) SET n:AddressRange SET n += {start: 32832, end: 32832, raw: 'map(0x8040, 0x8040).w(FUNC(junofrst_state::sh_irqtrigger_w))', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 275, sourceColumn: 2, sourceEndLine: 275};
MERGE (n:KG {id: 'handler:junofrst_state.sh_irqtrigger_w'}) SET n:Handler SET n += {method: 'sh_irqtrigger_w', ownerClass: 'junofrst_state', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 239, sourceColumn: 1, sourceEndLine: 247, sourceParameters: 'uint8_t data', sourceBody: 'if (m_last_irq == 0 && data == 1)
	{
		/* setting bit 0 low then high triggers IRQ on the sound CPU */
		m_audiocpu->set_input_line(0, HOLD_LINE); // Z80 IM1
	}
	m_last_irq = data;'};
MERGE (n:KG {id: 'map:junofrst_state.main_map/range10'}) SET n:AddressRange SET n += {start: 32848, end: 32848, raw: 'map(0x8050, 0x8050).w("soundlatch", FUNC(generic_latch_8_device::write))', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 276, sourceColumn: 2, sourceEndLine: 276};
MERGE (n:KG {id: 'handler:generic_latch_8_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 293, sourceColumn: 2, sourceEndLine: 293};
MERGE (n:KG {id: 'map:junofrst_state.main_map/range11'}) SET n:AddressRange SET n += {start: 32864, end: 32864, raw: 'map(0x8060, 0x8060).w(FUNC(junofrst_state::bankselect_w))', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 277, sourceColumn: 2, sourceEndLine: 277};
MERGE (n:KG {id: 'handler:junofrst_state.bankselect_w'}) SET n:Handler SET n += {method: 'bankselect_w', ownerClass: 'junofrst_state', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 129, sourceColumn: 1, sourceEndLine: 132, sourceParameters: 'uint8_t data', sourceBody: 'm_mainbank->set_entry(data & 0x0f);'};
MERGE (n:KG {id: 'map:junofrst_state.main_map/range12'}) SET n:AddressRange SET n += {start: 32880, end: 32883, raw: 'map(0x8070, 0x8073).w(FUNC(junofrst_state::blitter_w))', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 278, sourceColumn: 2, sourceEndLine: 278};
MERGE (n:KG {id: 'handler:junofrst_state.blitter_w'}) SET n:Handler SET n += {method: 'blitter_w', ownerClass: 'junofrst_state', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 164, sourceColumn: 1, sourceEndLine: 206, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_blitterdata[offset] = data;

	/* blitter is triggered by $8073 */
	if (offset == 3)
	{
		offs_t src = ((m_blitterdata[2] << 8) | m_blitterdata[3]) & 0xfffc;
		offs_t dest = (m_blitterdata[0] << 8) | m_blitterdata[1];

		bool const copy = BIT(m_blitterdata[3], 0);

		/* 16x16 graphics */
		for (int i = 0; i < 16; i++)
		{
			for (int j = 0; j < 16; j++)
			{
				uint8_t data;

				if (BIT(src, 0))
					data = m_blitrom[src >> 1] & 0x0f;
				else
					data = m_blitrom[src >> 1] >> 4;

				src++;

				/* if there is a source pixel either copy the pixel or clear the pixel depending on the copy flag */
				if (data)
				{
					if (!copy)
						data = 0;

					if (BIT(dest, 0))
						m_videoram[dest >> 1] = (m_videoram[dest >> 1] & 0x0f) | (data << 4);
					else
						m_videoram[dest >> 1] = (m_videoram[dest >> 1] & 0xf0) | data;
				}
				dest++;
			}
			dest += 240;
		}
	}'};
MERGE (n:KG {id: 'map:junofrst_state.main_map/range13'}) SET n:AddressRange SET n += {start: 33024, end: 36863, raw: 'map(0x8100, 0x8fff).ram()', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 279, sourceColumn: 2, sourceEndLine: 279, ram: true};
MERGE (n:KG {id: 'map:junofrst_state.main_map/range14'}) SET n:AddressRange SET n += {start: 36864, end: 40959, raw: 'map(0x9000, 0x9fff).bankr(m_mainbank)', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 280, sourceColumn: 2, sourceEndLine: 280, bankRead: 'mainbank'};
MERGE (n:KG {id: 'map:junofrst_state.main_map/range15'}) SET n:AddressRange SET n += {start: 40960, end: 65535, raw: 'map(0xa000, 0xffff).rom()', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 281, sourceColumn: 2, sourceEndLine: 281, rom: true};
MERGE (n:KG {id: 'map:junofrst_state.audio_map'}) SET n:AddressMap SET n += {cls: 'junofrst_state', name: 'audio_map', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 285, sourceColumn: 1, sourceEndLine: 295};
MERGE (n:KG {id: 'map:junofrst_state.audio_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 4095, raw: 'map(0x0000, 0x0fff).rom()', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 287, sourceColumn: 2, sourceEndLine: 287, rom: true};
MERGE (n:KG {id: 'map:junofrst_state.audio_map/range1'}) SET n:AddressRange SET n += {start: 8192, end: 9215, raw: 'map(0x2000, 0x23ff).ram()', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 288, sourceColumn: 2, sourceEndLine: 288, ram: true};
MERGE (n:KG {id: 'map:junofrst_state.audio_map/range2'}) SET n:AddressRange SET n += {start: 12288, end: 12288, raw: 'map(0x3000, 0x3000).r("soundlatch", FUNC(generic_latch_8_device::read))', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 289, sourceColumn: 2, sourceEndLine: 289};
MERGE (n:KG {id: 'handler:generic_latch_8_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 201, sourceColumn: 2, sourceEndLine: 201};
MERGE (n:KG {id: 'map:junofrst_state.audio_map/range3'}) SET n:AddressRange SET n += {start: 16384, end: 16384, raw: 'map(0x4000, 0x4000).w("aysnd", FUNC(ay8910_device::address_w))', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 290, sourceColumn: 2, sourceEndLine: 290};
MERGE (n:KG {id: 'handler:ay8910_device.address_w'}) SET n:Handler SET n += {method: 'address_w', ownerClass: 'ay8910_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 179, sourceColumn: 2, sourceEndLine: 179};
MERGE (n:KG {id: 'map:junofrst_state.audio_map/range4'}) SET n:AddressRange SET n += {start: 16385, end: 16385, raw: 'map(0x4001, 0x4001).r("aysnd", FUNC(ay8910_device::data_r))', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 291, sourceColumn: 2, sourceEndLine: 291};
MERGE (n:KG {id: 'handler:ay8910_device.data_r'}) SET n:Handler SET n += {method: 'data_r', ownerClass: 'ay8910_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 178, sourceColumn: 2, sourceEndLine: 178};
MERGE (n:KG {id: 'map:junofrst_state.audio_map/range5'}) SET n:AddressRange SET n += {start: 16386, end: 16386, raw: 'map(0x4002, 0x4002).w("aysnd", FUNC(ay8910_device::data_w))', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 292, sourceColumn: 2, sourceEndLine: 292};
MERGE (n:KG {id: 'handler:ay8910_device.data_w'}) SET n:Handler SET n += {method: 'data_w', ownerClass: 'ay8910_device', sourceFile: 'src/mame/shared/timeplt_a.cpp', sourceLine: 178, sourceColumn: 2, sourceEndLine: 178};
MERGE (n:KG {id: 'map:junofrst_state.audio_map/range6'}) SET n:AddressRange SET n += {start: 20480, end: 20480, raw: 'map(0x5000, 0x5000).w("soundlatch2", FUNC(generic_latch_8_device::write))', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 293, sourceColumn: 2, sourceEndLine: 293};
MERGE (n:KG {id: 'map:junofrst_state.audio_map/range7'}) SET n:AddressRange SET n += {start: 24576, end: 24576, raw: 'map(0x6000, 0x6000).w(FUNC(junofrst_state::i8039_irq_w))', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 294, sourceColumn: 2, sourceEndLine: 294};
MERGE (n:KG {id: 'handler:junofrst_state.i8039_irq_w'}) SET n:Handler SET n += {method: 'i8039_irq_w', ownerClass: 'junofrst_state', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 250, sourceColumn: 1, sourceEndLine: 253, sourceParameters: 'uint8_t data', sourceBody: 'm_i8039->set_input_line(0, ASSERT_LINE);'};
MERGE (n:KG {id: 'map:junofrst_state.mcu_map'}) SET n:AddressMap SET n += {cls: 'junofrst_state', name: 'mcu_map', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 298, sourceColumn: 1, sourceEndLine: 301};
MERGE (n:KG {id: 'map:junofrst_state.mcu_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 4095, raw: 'map(0x0000, 0x0fff).rom()', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 300, sourceColumn: 2, sourceEndLine: 300, rom: true};
MERGE (n:KG {id: 'map:junofrst_state.mcu_io_map'}) SET n:AddressMap SET n += {cls: 'junofrst_state', name: 'mcu_io_map', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 304, sourceColumn: 1, sourceEndLine: 307};
MERGE (n:KG {id: 'map:junofrst_state.mcu_io_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 255, raw: 'map(0x00, 0xff).r("soundlatch2", FUNC(generic_latch_8_device::read))', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 306, sourceColumn: 2, sourceEndLine: 306};
MERGE (n:KG {id: 'machine:junofrst_state.junofrst'}) SET n:MachineConfig SET n += {cls: 'junofrst_state', name: 'junofrst', calls: [], stateMembers: ['{"name":"m_flipscreen_x","bits":8}', '{"name":"m_flipscreen_y","bits":8}', '{"name":"m_irq_toggle","bits":8}', '{"name":"m_irq_enable","bits":8}', '{"name":"m_star_mode","bits":8}', '{"name":"m_stars_enabled","bits":8}', '{"name":"m_stars_blink_state","bits":8}', '{"name":"m_blitterdata","bits":8,"arrayLength":4}', '{"name":"m_i8039_status","bits":8}', '{"name":"m_last_irq","bits":8}'], resetHandlers: ['junofrst_state.machine_reset'], startHandlers: ['tutankhm_state.video_start'], sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 387, sourceColumn: 1, sourceEndLine: 438};
MERGE (n:KG {id: 'handler:junofrst_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'junofrst_state', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 364, sourceColumn: 1, sourceEndLine: 374, sourceParameters: '', sourceBody: '// note that base class version is not called
	m_i8039_status = 0;
	m_last_irq = 0;
	m_blitterdata[0] = 0;
	m_blitterdata[1] = 0;
	m_blitterdata[2] = 0;
	m_blitterdata[3] = 0;
	m_irq_toggle = 0;'};
MERGE (n:KG {id: 'handler:tutankhm_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 264, sourceColumn: 1, sourceEndLine: 276, sourceParameters: '', sourceBody: '/* initialize globals */
	m_flipscreen_x = 0;
	m_flipscreen_y = 0;

	/* initialize stars */
	m_stars_enabled = 0;
	m_stars_blink_state = 0;
	stars_init();

	galaxian_palette(*m_palette);'};
MERGE (n:KG {id: 'handler:tutankhm_state.stars_init'}) SET n:Handler SET n += {method: 'stars_init', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 278, sourceColumn: 1, sourceEndLine: 281, sourceParameters: '', sourceBody: '(m_star_mode) ? stars_init_scramble() : stars_init_bootleg();'};
MERGE (n:KG {id: 'handler:tutankhm_state.stars_init_scramble'}) SET n:Handler SET n += {method: 'stars_init_scramble', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 311, sourceColumn: 1, sourceEndLine: 332, sourceConstants: ['STAR_RNG_PERIOD=131071'], sourceParameters: '', sourceBody: '/* precalculate the RNG */
	m_stars = std::make_unique<uint8_t[]>(STAR_RNG_PERIOD);
	uint32_t shiftreg = 0;
	for (int i = 0; i < STAR_RNG_PERIOD; i++)
	{
		uint8_t const shift = 12;
		/* stars are enabled if the upper 8 bits are 1 and the low bit is 0 */
		int const enabled = ((shiftreg & 0x1fe01) == 0x1fe00);

		/* color comes from the 6 bits below the top 8 bits */
		int const color = (~shiftreg & 0x1f8) >> 3;

		/* store the color value in the low 6 bits and the enable in the upper bit */
		m_stars[i] = color | (enabled << 7);

		/* the LFSR is fed based on the XOR of bit 12 and the inverse of bit 0 */
		//shiftreg = (shiftreg >> 1) | ((((shiftreg >> 12) ^ ~shiftreg) & 1) << 16);
		shiftreg = (shiftreg >> 1) | ((((shiftreg >> shift) ^ ~shiftreg) & 1) << 16);
	}'};
MERGE (n:KG {id: 'handler:tutankhm_state.stars_init_bootleg'}) SET n:Handler SET n += {method: 'stars_init_bootleg', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 283, sourceColumn: 1, sourceEndLine: 309, sourceConstants: ['STAR_RNG_PERIOD=131071'], sourceParameters: '', sourceBody: '/* reset the blink and enabled states */
	m_stars_enabled = false;
	m_stars_blink_state = 0;

	/* precalculate the RNG */
	m_stars = std::make_unique<uint8_t[]>(STAR_RNG_PERIOD);
	uint32_t shiftreg = 0;
	for (int i = 0; i < STAR_RNG_PERIOD; i++)
	{
		int const newbit = ((shiftreg >> 12) ^ ~shiftreg) & 1;

		/* stars are enabled if the upper 8 bits are 1 and the new bit is 0 */
		int const enabled = ((shiftreg & 0x1fe00) == 0x1fe00) && (newbit == 0);
		//int enabled = ((shiftreg & 0x1fe01) == 0x1fe00); // <- scramble

		/* color comes from the 6 bits below the top 8 bits */
		int const color = (~shiftreg & 0x1f8) >> 3;

		/* store the color value in the low 6 bits and the enable in the upper bit */
		m_stars[i] = color | (enabled << 7);

		/* the LFSR is fed based on the XOR of bit 12 and the inverse of bit 0 */
		shiftreg = (shiftreg >> 1) | (newbit << 16);
	}'};
MERGE (n:KG {id: 'handler:tutankhm_state.galaxian_palette'}) SET n:Handler SET n += {method: 'galaxian_palette', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 210, sourceColumn: 1, sourceEndLine: 261, sourceConstants: ['RGB_MAXIMUM=224'], sourceParameters: 'palette_device &palette', sourceBody: '/*
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
	}'};
MERGE (n:KG {id: 'bank:junofrst_state.junofrst/mainbank'}) SET n:MemoryBank SET n += {tag: 'mainbank', member: 'm_mainbank', startEntry: 0, entries: 16, region: 'maincpu', offset: 65536, stride: 4096, raw: 'm_mainbank->configure_entries(0, 16, memregion("maincpu")->base() + 0x10000, 0x1000)', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 349, sourceColumn: 1, sourceEndLine: 362};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/maincpu'}) SET n:Device SET n += {type: 'KONAMI1', tag: 'maincpu', clock: 1536000, config: ['KONAMI1(config, m_maincpu, 18.432_MHz_XTAL / 12)', 'm_maincpu->set_addrmap(AS_PROGRAM, &junofrst_state::main_map)'], cls: 'konami1_device', clsHierarchy: ['konami1_device'], sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 390, sourceColumn: 2, sourceEndLine: 390};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/audiocpu'}) SET n:Device SET n += {type: 'Z80', tag: 'audiocpu', clock: 1789772.625, config: ['Z80(config, m_audiocpu, 14.318181_MHz_XTAL / 8)', 'm_audiocpu->set_addrmap(AS_PROGRAM, &junofrst_state::audio_map)'], sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 393, sourceColumn: 2, sourceEndLine: 393};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/mcu'}) SET n:Device SET n += {type: 'I8039', tag: 'mcu', clock: 8000000, config: ['I8039(config, m_i8039, 8_MHz_XTAL)', 'm_i8039->set_addrmap(AS_PROGRAM, &junofrst_state::mcu_map)', 'm_i8039->set_addrmap(AS_IO, &junofrst_state::mcu_io_map)', 'm_i8039->p1_out_cb().set("dac", FUNC(dac_byte_interface::data_w))', 'm_i8039->p2_out_cb().set(FUNC(junofrst_state::i8039_irqen_and_status_w))'], sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 396, sourceColumn: 2, sourceEndLine: 396};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/mcu/callback:mcu:0'}) SET n:Callback SET n += {signal: 'p1_out_cb', operation: 'set', raw: 'm_i8039->p1_out_cb().set("dac", FUNC(dac_byte_interface::data_w))', ownerTag: 'mcu', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 399, sourceColumn: 2, sourceEndLine: 399, targetTag: 'dac', targetClass: 'dac_byte_interface', targetMethod: 'data_w'};
MERGE (n:KG {id: 'handler:dac_byte_interface.data_w'}) SET n:Handler SET n += {method: 'data_w', ownerClass: 'dac_byte_interface', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 399, sourceColumn: 2, sourceEndLine: 399};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/mcu/callback:mcu:1'}) SET n:Callback SET n += {signal: 'p2_out_cb', operation: 'set', raw: 'm_i8039->p2_out_cb().set(FUNC(junofrst_state::i8039_irqen_and_status_w))', ownerTag: 'mcu', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 400, sourceColumn: 2, sourceEndLine: 400, targetClass: 'junofrst_state', targetMethod: 'i8039_irqen_and_status_w'};
MERGE (n:KG {id: 'handler:junofrst_state.i8039_irqen_and_status_w'}) SET n:Handler SET n += {method: 'i8039_irqen_and_status_w', ownerClass: 'junofrst_state', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 256, sourceColumn: 1, sourceEndLine: 261, sourceParameters: 'uint8_t data', sourceBody: 'if (BIT(~data, 7))
		m_i8039->set_input_line(0, CLEAR_LINE);
	m_i8039_status = (data & 0x70) >> 4;'};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/mainlatch'}) SET n:Device SET n += {type: 'LS259', tag: 'mainlatch', clock: null, config: ['ls259_device &mainlatch(LS259(config, "mainlatch"))', 'mainlatch.q_out_cb<0>().set(FUNC(junofrst_state::irq_enable_w))', 'mainlatch.q_out_cb<1>().set(FUNC(junofrst_state::coin_counter_2_w))', 'mainlatch.q_out_cb<2>().set(FUNC(junofrst_state::coin_counter_1_w))', 'mainlatch.q_out_cb<3>().set_nop()', 'mainlatch.q_out_cb<4>().set(FUNC(junofrst_state::flip_screen_x_w))', 'mainlatch.q_out_cb<5>().set(FUNC(junofrst_state::flip_screen_y_w))'], sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 402, sourceColumn: 2, sourceEndLine: 402};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/mainlatch/callback:mainlatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<0>().set(FUNC(junofrst_state::irq_enable_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 403, sourceColumn: 2, sourceEndLine: 403, slot: '0', targetClass: 'junofrst_state', targetMethod: 'irq_enable_w'};
MERGE (n:KG {id: 'handler:junofrst_state.irq_enable_w'}) SET n:Handler SET n += {method: 'irq_enable_w', ownerClass: 'junofrst_state', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 115, sourceColumn: 1, sourceEndLine: 120, sourceParameters: 'int state', sourceBody: 'm_irq_enable = state;
	if (!m_irq_enable)
		m_maincpu->set_input_line(0, CLEAR_LINE);'};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/mainlatch/callback:mainlatch:1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<1>().set(FUNC(junofrst_state::coin_counter_2_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 404, sourceColumn: 2, sourceEndLine: 404, slot: '1', targetClass: 'junofrst_state', targetMethod: 'coin_counter_2_w'};
MERGE (n:KG {id: 'handler:junofrst_state.coin_counter_2_w'}) SET n:Handler SET n += {method: 'coin_counter_2_w', ownerClass: 'junofrst_state', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 147, sourceColumn: 1, sourceEndLine: 150, sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(1, state);'};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/mainlatch/callback:mainlatch:2'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<2>().set(FUNC(junofrst_state::coin_counter_1_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 405, sourceColumn: 2, sourceEndLine: 405, slot: '2', targetClass: 'junofrst_state', targetMethod: 'coin_counter_1_w'};
MERGE (n:KG {id: 'handler:junofrst_state.coin_counter_1_w'}) SET n:Handler SET n += {method: 'coin_counter_1_w', ownerClass: 'junofrst_state', sourceFile: 'src/mame/konami/tutankhm.cpp', sourceLine: 141, sourceColumn: 1, sourceEndLine: 144, sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(0, state);'};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/mainlatch/callback:mainlatch:3'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set_nop', raw: 'mainlatch.q_out_cb<3>().set_nop()', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 406, sourceColumn: 2, sourceEndLine: 406, slot: '3'};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/mainlatch/callback:mainlatch:4'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<4>().set(FUNC(junofrst_state::flip_screen_x_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 407, sourceColumn: 2, sourceEndLine: 407, slot: '4', targetClass: 'junofrst_state', targetMethod: 'flip_screen_x_w'};
MERGE (n:KG {id: 'handler:junofrst_state.flip_screen_x_w'}) SET n:Handler SET n += {method: 'flip_screen_x_w', ownerClass: 'junofrst_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 24, sourceColumn: 1, sourceEndLine: 27, sourceParameters: 'int state', sourceBody: 'm_flipscreen_x = state;'};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/mainlatch/callback:mainlatch:5'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'mainlatch.q_out_cb<5>().set(FUNC(junofrst_state::flip_screen_y_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 408, sourceColumn: 2, sourceEndLine: 408, slot: '5', targetClass: 'junofrst_state', targetMethod: 'flip_screen_y_w'};
MERGE (n:KG {id: 'handler:junofrst_state.flip_screen_y_w'}) SET n:Handler SET n += {method: 'flip_screen_y_w', ownerClass: 'junofrst_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 30, sourceColumn: 1, sourceEndLine: 33, sourceParameters: 'int state', sourceBody: 'm_flipscreen_y = state;'};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog")'], sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 410, sourceColumn: 2, sourceEndLine: 410};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(GALAXIAN_PIXEL_CLOCK, GALAXIAN_HTOTAL, GALAXIAN_HBEND, GALAXIAN_HBSTART, GALAXIAN_VTOTAL, GALAXIAN_VBEND, GALAXIAN_VBSTART)', 'm_screen->set_screen_update(FUNC(junofrst_state::screen_update_scramble))', 'm_screen->screen_vblank().set(FUNC(junofrst_state::_30hz_irq))'], sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 413, sourceColumn: 2, sourceEndLine: 413, configCalls: ['set_raw(18432000,1152,0,768,264,16,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [18432000, 1152, 0, 768, 264, 16, 240], screenRawExpr: ['GALAXIAN_PIXEL_CLOCK', 'GALAXIAN_HTOTAL', 'GALAXIAN_HBEND', 'GALAXIAN_HBSTART', 'GALAXIAN_VTOTAL', 'GALAXIAN_VBEND', 'GALAXIAN_VBSTART']};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(junofrst_state::screen_update_scramble))', ownerTag: 'screen', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 417, sourceColumn: 2, sourceEndLine: 417, targetClass: 'junofrst_state', targetMethod: 'screen_update_scramble'};
MERGE (n:KG {id: 'handler:junofrst_state.screen_update_scramble'}) SET n:Handler SET n += {method: 'screen_update_scramble', ownerClass: 'junofrst_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 97, sourceColumn: 1, sourceEndLine: 124, sourceConstants: ['GALAXIAN_XSCALE=3'], sourceParameters: 'screen_device &screen, bitmap_rgb32 &bitmap, const rectangle &cliprect', sourceBody: 'scramble_draw_background(bitmap, cliprect);

	int const xorx = m_flipscreen_x ? 255 : 0;
	int const xory = m_flipscreen_y ? 255 : 0;

	for (int y = cliprect.min_y; y <= cliprect.max_y; y++)
	{
		uint32_t *const dst = &bitmap.pix(y);

		for (int x = cliprect.min_x / GALAXIAN_XSCALE; x <= cliprect.max_x / GALAXIAN_XSCALE; x++)
		{
			uint8_t const effx = x ^ xorx;
			uint8_t const yscroll = (effx < 192 && m_scroll.found()) ? *m_scroll : 0;
			uint8_t const effy = (y ^ xory) + yscroll;
			uint8_t const vrambyte = m_videoram[effy * 128 + effx / 2];
			uint8_t const shifted = vrambyte >> (4 * (effx & 1));
			auto color = m_palette->pen_color(shifted & 0x0f);
			u32 *const dbase = dst + x * GALAXIAN_XSCALE;
			if(shifted || dbase[0] == 0xff000000) dbase[0] = color;
			if(shifted || dbase[1] == 0xff000000) dbase[1] = color;
			if(shifted || dbase[2] == 0xff000000) dbase[2] = color;
		}
	}

	return 0;'};
MERGE (n:KG {id: 'handler:tutankhm_state.scramble_draw_background'}) SET n:Handler SET n += {method: 'scramble_draw_background', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 427, sourceColumn: 1, sourceEndLine: 433, sourceParameters: 'bitmap_rgb32 &bitmap, const rectangle &cliprect', sourceBody: '/* blue background - 390 ohm resistor */
	bitmap.fill(rgb_t::black(), cliprect);

	scramble_draw_stars(bitmap, cliprect, 256);'};
MERGE (n:KG {id: 'handler:tutankhm_state.scramble_draw_stars'}) SET n:Handler SET n += {method: 'scramble_draw_stars', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 410, sourceColumn: 1, sourceEndLine: 424, sourceParameters: 'bitmap_rgb32 &bitmap, const rectangle &cliprect, int maxx', sourceBody: '/* update the star origin to the current frame */
	//stars_update_origin();

	/* render stars if enabled */
	if (m_stars_enabled)
	{
		/* iterate over scanlines */
		for (int y = cliprect.min_y; y <= cliprect.max_y; y++)
		{
			stars_draw_row(bitmap, maxx, y, y * 512);
		}
	}'};
MERGE (n:KG {id: 'handler:tutankhm_state.stars_draw_row'}) SET n:Handler SET n += {method: 'stars_draw_row', ownerClass: 'tutankhm_state', sourceFile: 'src/mame/konami/tutankhm_v.cpp', sourceLine: 347, sourceColumn: 1, sourceEndLine: 408, sourceConstants: ['GALAXIAN_XSCALE=3', 'STAR_RNG_PERIOD=131071'], sourceParameters: 'bitmap_rgb32 &bitmap, int maxx, int y, uint32_t star_offs', sourceBody: 'uint8_t const flipxor = (m_flipscreen_x ? 0xc0 : 0x00);

	/* ensure our star offset is valid */
	star_offs %= STAR_RNG_PERIOD;

	/* iterate over the specified number of 6MHz pixels */
	for (int x = 0; x < maxx; x++)
	{
		uint8_t const h8q = BIT(~x, 3); // H8 signal is inverted.
		/* stars are suppressed unless V1 ^ H8 == 1 */
		bool enable_star = BIT(y ^ h8q, 0);

		uint8_t const blink_state = m_stars_blink_state & 3;
		bool enab = false;
		switch (blink_state)
		{
			case 0: enab = true;      break;
			case 1: enab = BIT(y, 0); break;
			case 2: enab = BIT(y, 1); break;
			case 3: enab = h8q;       break; // H8 signal is inverted.
		}

		enable_star &= (enab && ((x & 0xc0) ^ flipxor) != 0xc0);

		/*
		    The RNG clock is the master clock (18MHz) ANDed with the pixel clock (6MHz).
		    The divide-by-3 circuit that produces the pixel clock generates a square wave
		    with a 2/3 duty cycle, so the result of the AND generates a clock like this:
		                _   _   _   _   _   _   _   _
		      MASTER: _| |_| |_| |_| |_| |_| |_| |_| |
		                _______     _______     ______
		      PIXEL:  _|       |___|       |___|
		                _   _       _   _       _   _
		      RNG:    _| |_| |_____| |_| |_____| |_| |

		    Thus for each pixel, there are 3 master clocks and 2 RNG clocks, and the RNG
		    is clocked asymmetrically. To simulate this, we expand the horizontal screen
		    size by 3 and handle the first RNG clock with one pixel and the second RNG
		    clock with two pixels.
		*/

		uint8_t star;
		/* first RNG clock: one pixel */
		star = m_stars[star_offs++];
		if (star_offs >= STAR_RNG_PERIOD)
			star_offs = 0;
		if (enable_star && BIT(star, 7))
			bitmap.pix(y, GALAXIAN_XSCALE*x + 0) = m_star_color[star & 0x3f];

		/* second RNG clock: two pixels */
		star = m_stars[star_offs++];
		if (star_offs >= STAR_RNG_PERIOD)
			star_offs = 0;
		if (enable_star && BIT(star, 7))
		{
			bitmap.pix(y, GALAXIAN_XSCALE*x + 1) = m_star_color[star & 0x3f];
			bitmap.pix(y, GALAXIAN_XSCALE*x + 2) = m_star_color[star & 0x3f];
		}
	}'};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set', raw: 'm_screen->screen_vblank().set(FUNC(junofrst_state::_30hz_irq))', ownerTag: 'screen', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 418, sourceColumn: 2, sourceEndLine: 418, targetClass: 'junofrst_state', targetMethod: '_30hz_irq'};
MERGE (n:KG {id: 'handler:junofrst_state._30hz_irq'}) SET n:Handler SET n += {method: '_30hz_irq', ownerClass: 'junofrst_state', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 376, sourceColumn: 1, sourceEndLine: 385, sourceParameters: 'int state', sourceBody: '/* flip flops cause the interrupt to be signalled every other frame */
	if (state)
	{
		m_irq_toggle ^= 1;
		if (m_irq_toggle && m_irq_enable)
			m_maincpu->set_input_line(0, ASSERT_LINE);
	}'};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette).set_format(1, tutankhm_state::raw_to_rgb_func, 16)'], sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 415, sourceColumn: 2, sourceEndLine: 415};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/speaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speaker', clock: null, config: ['SPEAKER(config, "speaker").front_center()'], sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 421, sourceColumn: 2, sourceEndLine: 421};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/soundlatch'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch', clock: null, config: ['GENERIC_LATCH_8(config, "soundlatch")'], sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 423, sourceColumn: 2, sourceEndLine: 423};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/soundlatch2'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch2', clock: null, config: ['GENERIC_LATCH_8(config, "soundlatch2")'], sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 424, sourceColumn: 2, sourceEndLine: 424};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/aysnd'}) SET n:Device SET n += {type: 'AY8910', tag: 'aysnd', clock: 1789772.625, config: ['ay8910_device &aysnd(AY8910(config, "aysnd", 14.318181_MHz_XTAL / 8))', 'aysnd.port_a_read_callback().set(FUNC(junofrst_state::portA_r))', 'aysnd.port_b_write_callback().set(FUNC(junofrst_state::portB_w))', 'aysnd.add_route(0, "filter.0.0", 0.30)', 'aysnd.add_route(1, "filter.0.1", 0.30)', 'aysnd.add_route(2, "filter.0.2", 0.30)'], sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 426, sourceColumn: 2, sourceEndLine: 426};
MERGE (n:KG {id: 'audioroute:device:junofrst_state.junofrst/aysnd/0'}) SET n:AudioRoute SET n += {output: '0', target: 'filter.0.0', gain: 0.3, raw: 'aysnd.add_route(0, "filter.0.0", 0.30)', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 429, sourceColumn: 2, sourceEndLine: 429};
MERGE (n:KG {id: 'audioroute:device:junofrst_state.junofrst/aysnd/1'}) SET n:AudioRoute SET n += {output: '1', target: 'filter.0.1', gain: 0.3, raw: 'aysnd.add_route(1, "filter.0.1", 0.30)', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 430, sourceColumn: 2, sourceEndLine: 430};
MERGE (n:KG {id: 'audioroute:device:junofrst_state.junofrst/aysnd/2'}) SET n:AudioRoute SET n += {output: '2', target: 'filter.0.2', gain: 0.3, raw: 'aysnd.add_route(2, "filter.0.2", 0.30)', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 431, sourceColumn: 2, sourceEndLine: 431};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/aysnd/callback:aysnd:0'}) SET n:Callback SET n += {signal: 'port_a_read_callback', operation: 'set', raw: 'aysnd.port_a_read_callback().set(FUNC(junofrst_state::portA_r))', ownerTag: 'aysnd', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 427, sourceColumn: 2, sourceEndLine: 427, targetClass: 'junofrst_state', targetMethod: 'portA_r'};
MERGE (n:KG {id: 'handler:junofrst_state.portA_r'}) SET n:Handler SET n += {method: 'portA_r', ownerClass: 'junofrst_state', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 209, sourceColumn: 1, sourceEndLine: 219, sourceParameters: '', sourceBody: '/* main xtal 14.318MHz, divided by 8 to get the CPU clock, further */
	/* divided by 1024 to get this timer */
	/* (divide by (1024/2), and not 1024, because the CPU cycle counter is */
	/* incremented every other state change of the clock) */
	int const timer = (m_audiocpu->total_cycles() / (1024 / 2)) & 0x0f;

	/* low three bits come from the 8039 */
	return (timer << 4) | m_i8039_status;'};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/aysnd/callback:aysnd:1'}) SET n:Callback SET n += {signal: 'port_b_write_callback', operation: 'set', raw: 'aysnd.port_b_write_callback().set(FUNC(junofrst_state::portB_w))', ownerTag: 'aysnd', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 428, sourceColumn: 2, sourceEndLine: 428, targetClass: 'junofrst_state', targetMethod: 'portB_w'};
MERGE (n:KG {id: 'handler:junofrst_state.portB_w'}) SET n:Handler SET n += {method: 'portB_w', ownerClass: 'junofrst_state', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 222, sourceColumn: 1, sourceEndLine: 236, sourceConstants: ['LOWPASS_3R=0'], sourceParameters: 'uint8_t data', sourceBody: 'for (int i = 0; i < 3; i++)
	{
		int C = 0;

		if (BIT(data, 0))
			C += 47000; /* 47000pF = 0.047uF */
		if (BIT(data, 1))
			C += 220000;    /* 220000pF = 0.22uF */

		data >>= 2;
		m_filter[i]->filter_rc_set_RC(filter_rc_device::LOWPASS_3R, 1000, 2200, 200, CAP_P(C));
	}'};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/dac'}) SET n:Device SET n += {type: 'DAC_8BIT_R2R', tag: 'dac', clock: 0, config: ['DAC_8BIT_R2R(config, "dac", 0).add_route(ALL_OUTPUTS, "speaker", 0.25)'], sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 433, sourceColumn: 2, sourceEndLine: 433};
MERGE (n:KG {id: 'audioroute:device:junofrst_state.junofrst/dac/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.25, raw: 'DAC_8BIT_R2R(config, "dac", 0).add_route(ALL_OUTPUTS, "speaker", 0.25)', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 433, sourceColumn: 2, sourceEndLine: 433};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/filter.0.0'}) SET n:Device SET n += {type: 'FILTER_RC', tag: 'filter.0.0', clock: null, config: ['FILTER_RC(config, m_filter[0]).add_route(ALL_OUTPUTS, "speaker", 1.0)'], sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 435, sourceColumn: 2, sourceEndLine: 435};
MERGE (n:KG {id: 'audioroute:device:junofrst_state.junofrst/filter.0.0/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 1, raw: 'FILTER_RC(config, m_filter[0]).add_route(ALL_OUTPUTS, "speaker", 1.0)', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 435, sourceColumn: 2, sourceEndLine: 435};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/filter.0.1'}) SET n:Device SET n += {type: 'FILTER_RC', tag: 'filter.0.1', clock: null, config: ['FILTER_RC(config, m_filter[1]).add_route(ALL_OUTPUTS, "speaker", 1.0)'], sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 436, sourceColumn: 2, sourceEndLine: 436};
MERGE (n:KG {id: 'audioroute:device:junofrst_state.junofrst/filter.0.1/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 1, raw: 'FILTER_RC(config, m_filter[1]).add_route(ALL_OUTPUTS, "speaker", 1.0)', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 436, sourceColumn: 2, sourceEndLine: 436};
MERGE (n:KG {id: 'device:junofrst_state.junofrst/filter.0.2'}) SET n:Device SET n += {type: 'FILTER_RC', tag: 'filter.0.2', clock: null, config: ['FILTER_RC(config, m_filter[2]).add_route(ALL_OUTPUTS, "speaker", 1.0)'], sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 437, sourceColumn: 2, sourceEndLine: 437};
MERGE (n:KG {id: 'audioroute:device:junofrst_state.junofrst/filter.0.2/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 1, raw: 'FILTER_RC(config, m_filter[2]).add_route(ALL_OUTPUTS, "speaker", 1.0)', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 437, sourceColumn: 2, sourceEndLine: 437};
MERGE (n:KG {id: 'inputs:junofrst'}) SET n:InputPorts SET n += {name: 'junofrst', sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 310, sourceColumn: 8, sourceEndLine: 310};
MERGE (n:KG {id: 'inputs:junofrst/SYSTEM'}) SET n:Port SET n += {tag: 'SYSTEM', modify: false};
MERGE (n:KG {id: 'inputs:junofrst/SYSTEM/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_COIN1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:junofrst/SYSTEM/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_COIN2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:junofrst/SYSTEM/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_SERVICE1', defaultValue: 4};
MERGE (n:KG {id: 'inputs:junofrst/SYSTEM/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_START1', defaultValue: 8};
MERGE (n:KG {id: 'inputs:junofrst/SYSTEM/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_START2', defaultValue: 16};
MERGE (n:KG {id: 'inputs:junofrst/SYSTEM/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 32};
MERGE (n:KG {id: 'inputs:junofrst/SYSTEM/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 64};
MERGE (n:KG {id: 'inputs:junofrst/SYSTEM/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:junofrst/P1'}) SET n:Port SET n += {tag: 'P1', modify: false};
MERGE (n:KG {id: 'inputs:junofrst/P1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:junofrst/P1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:junofrst/P1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:junofrst/P1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:junofrst/P1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON2', defaultValue: 16};
MERGE (n:KG {id: 'inputs:junofrst/P1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 32};
MERGE (n:KG {id: 'inputs:junofrst/P1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON3', defaultValue: 64};
MERGE (n:KG {id: 'inputs:junofrst/P1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:junofrst/P2'}) SET n:Port SET n += {tag: 'P2', modify: false};
MERGE (n:KG {id: 'inputs:junofrst/P2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:junofrst/P2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:junofrst/P2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:junofrst/P2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:junofrst/P2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_COCKTAIL'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:junofrst/P2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:junofrst/P2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_COCKTAIL'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:junofrst/P2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 128};
MERGE (n:KG {id: 'inputs:junofrst/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:junofrst/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 15, modifiers: ['PORT_DIPLOCATION(#SW1":1,2,3,4")'], name: 'Coin A', defaultValue: 15, location: '#SW1":1,2,3,4"', settings: ['2=4C 1C', '5=3C 1C', '8=2C 1C', '4=3C 2C', '1=4C 3C', '15=1C 1C', '3=3C 4C', '7=2C 3C', '14=1C 2C', '6=2C 5C', '13=1C 3C', '12=1C 4C', '11=1C 5C', '10=1C 6C', '9=1C 7C', '0=Free Play']};
MERGE (n:KG {id: 'inputs:junofrst/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 240, modifiers: ['PORT_DIPLOCATION(#SW1":5,6,7,8")'], name: 'Coin B', defaultValue: 240, location: '#SW1":5,6,7,8"', settings: ['32=4C 1C', '80=3C 1C', '128=2C 1C', '64=3C 2C', '16=4C 3C', '240=1C 1C', '48=3C 4C', '112=2C 3C', '224=1C 2C', '96=2C 5C', '208=1C 3C', '192=1C 4C', '176=1C 5C', '160=1C 6C', '144=1C 7C', '0=No Coin B']};
MERGE (n:KG {id: 'inputs:junofrst/DSW2'}) SET n:Port SET n += {tag: 'DSW2', modify: false};
MERGE (n:KG {id: 'inputs:junofrst/DSW2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SW2:1,2")'], name: 'Lives', defaultValue: 3, location: 'SW2:1,2', settings: ['3=3', '2=4', '1=5', '0=256 (Cheat)']};
MERGE (n:KG {id: 'inputs:junofrst/DSW2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 4, modifiers: ['PORT_DIPLOCATION("SW2:3")'], name: 'Cabinet', defaultValue: 0, location: 'SW2:3', settings: ['0=Upright', '4=Cocktail']};
MERGE (n:KG {id: 'inputs:junofrst/DSW2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 8, name: 'Unused', defaultValue: 8};
MERGE (n:KG {id: 'inputs:junofrst/DSW2/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 112, modifiers: ['PORT_DIPLOCATION("SW2:5,6,7")'], name: 'Difficulty', defaultValue: 112, location: 'SW2:5,6,7', settings: ['112=1 (Easiest)', '96=2', '80=3', '64=4', '48=5', '32=6', '16=7', '0=8 (Hardest)']};
MERGE (n:KG {id: 'inputs:junofrst/DSW2/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("SW2:8")'], name: 'Demo Sounds', defaultValue: 0, location: 'SW2:8', settings: ['128=Off', '0=On']};
MATCH (a:KG {id: 'game:junofrst'}), (b:KG {id: 'file:src/mame/konami/junofrst.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 494, sourceColumn: 1, sourceEndLine: 494};
MATCH (a:KG {id: 'game:junofrst'}), (b:KG {id: 'machine:junofrst_state.junofrst'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:junofrst'}), (b:KG {id: 'inputs:junofrst'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:junofrst'}), (b:KG {id: 'romset:junofrst'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/junofrst.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/junofrst.cpp'}), (b:KG {id: 'file:tutankhm.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/junofrst.cpp'}), (b:KG {id: 'file:konamipt.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/junofrst.cpp'}), (b:KG {id: 'file:konami1.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/junofrst.cpp'}), (b:KG {id: 'file:cpu/m6809/m6809.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/junofrst.cpp'}), (b:KG {id: 'file:cpu/mcs48/mcs48.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/junofrst.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/junofrst.cpp'}), (b:KG {id: 'file:machine/74259.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/junofrst.cpp'}), (b:KG {id: 'file:machine/gen_latch.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/junofrst.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/junofrst.cpp'}), (b:KG {id: 'file:sound/ay8910.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/junofrst.cpp'}), (b:KG {id: 'file:sound/dac.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/junofrst.cpp'}), (b:KG {id: 'file:sound/flt_rc.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/junofrst.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/konami/junofrst.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:junofrst_state.junofrst'}), (b:KG {id: 'file:src/mame/konami/junofrst.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 387, sourceColumn: 1, sourceEndLine: 438};
MATCH (a:KG {id: 'machine:junofrst_state.junofrst'}), (b:KG {id: 'handler:junofrst_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:junofrst_state.junofrst'}), (b:KG {id: 'handler:tutankhm_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:junofrst_state.junofrst'}), (b:KG {id: 'bank:junofrst_state.junofrst/mainbank'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:junofrst_state.junofrst'}), (b:KG {id: 'device:junofrst_state.junofrst/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:junofrst_state.junofrst'}), (b:KG {id: 'device:junofrst_state.junofrst/audiocpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:junofrst_state.junofrst'}), (b:KG {id: 'device:junofrst_state.junofrst/mcu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:junofrst_state.junofrst'}), (b:KG {id: 'device:junofrst_state.junofrst/mainlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:junofrst_state.junofrst'}), (b:KG {id: 'device:junofrst_state.junofrst/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:junofrst_state.junofrst'}), (b:KG {id: 'device:junofrst_state.junofrst/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:junofrst_state.junofrst'}), (b:KG {id: 'device:junofrst_state.junofrst/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:junofrst_state.junofrst'}), (b:KG {id: 'device:junofrst_state.junofrst/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:junofrst_state.junofrst'}), (b:KG {id: 'device:junofrst_state.junofrst/soundlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:junofrst_state.junofrst'}), (b:KG {id: 'device:junofrst_state.junofrst/soundlatch2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:junofrst_state.junofrst'}), (b:KG {id: 'device:junofrst_state.junofrst/aysnd'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:junofrst_state.junofrst'}), (b:KG {id: 'device:junofrst_state.junofrst/dac'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:junofrst_state.junofrst'}), (b:KG {id: 'device:junofrst_state.junofrst/filter.0.0'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:junofrst_state.junofrst'}), (b:KG {id: 'device:junofrst_state.junofrst/filter.0.1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:junofrst_state.junofrst'}), (b:KG {id: 'device:junofrst_state.junofrst/filter.0.2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:junofrst'}), (b:KG {id: 'file:src/mame/konami/junofrst.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 310, sourceColumn: 8, sourceEndLine: 310};
MATCH (a:KG {id: 'inputs:junofrst'}), (b:KG {id: 'inputs:junofrst/SYSTEM'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:junofrst'}), (b:KG {id: 'inputs:junofrst/P1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:junofrst'}), (b:KG {id: 'inputs:junofrst/P2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:junofrst'}), (b:KG {id: 'inputs:junofrst/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:junofrst'}), (b:KG {id: 'inputs:junofrst/DSW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:junofrst'}), (b:KG {id: 'file:src/mame/konami/junofrst.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 441, sourceColumn: 1, sourceEndLine: 441};
MATCH (a:KG {id: 'romset:junofrst'}), (b:KG {id: 'region:junofrst/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:junofrst'}), (b:KG {id: 'region:junofrst/audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:junofrst'}), (b:KG {id: 'region:junofrst/mcu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:junofrst'}), (b:KG {id: 'region:junofrst/blitrom'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:tutankhm_state.video_start'}), (b:KG {id: 'handler:tutankhm_state.stars_init'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tutankhm_state.video_start'}), (b:KG {id: 'handler:tutankhm_state.galaxian_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'bank:junofrst_state.junofrst/mainbank'}), (b:KG {id: 'file:src/mame/konami/junofrst.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 349, sourceColumn: 1, sourceEndLine: 362};
MATCH (a:KG {id: 'device:junofrst_state.junofrst/maincpu'}), (b:KG {id: 'map:junofrst_state.main_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:junofrst_state.junofrst/audiocpu'}), (b:KG {id: 'map:junofrst_state.audio_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:junofrst_state.junofrst/mcu'}), (b:KG {id: 'device:junofrst_state.junofrst/mcu/callback:mcu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/mcu'}), (b:KG {id: 'device:junofrst_state.junofrst/mcu/callback:mcu:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/mcu'}), (b:KG {id: 'map:junofrst_state.mcu_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:junofrst_state.junofrst/mcu'}), (b:KG {id: 'map:junofrst_state.mcu_io_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:junofrst_state.junofrst/mainlatch'}), (b:KG {id: 'device:junofrst_state.junofrst/mainlatch/callback:mainlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/mainlatch'}), (b:KG {id: 'device:junofrst_state.junofrst/mainlatch/callback:mainlatch:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/mainlatch'}), (b:KG {id: 'device:junofrst_state.junofrst/mainlatch/callback:mainlatch:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/mainlatch'}), (b:KG {id: 'device:junofrst_state.junofrst/mainlatch/callback:mainlatch:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/mainlatch'}), (b:KG {id: 'device:junofrst_state.junofrst/mainlatch/callback:mainlatch:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/mainlatch'}), (b:KG {id: 'device:junofrst_state.junofrst/mainlatch/callback:mainlatch:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/screen'}), (b:KG {id: 'device:junofrst_state.junofrst/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/screen'}), (b:KG {id: 'device:junofrst_state.junofrst/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/aysnd'}), (b:KG {id: 'audioroute:device:junofrst_state.junofrst/aysnd/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/aysnd'}), (b:KG {id: 'audioroute:device:junofrst_state.junofrst/aysnd/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/aysnd'}), (b:KG {id: 'audioroute:device:junofrst_state.junofrst/aysnd/2'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/aysnd'}), (b:KG {id: 'device:junofrst_state.junofrst/aysnd/callback:aysnd:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/aysnd'}), (b:KG {id: 'device:junofrst_state.junofrst/aysnd/callback:aysnd:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/dac'}), (b:KG {id: 'audioroute:device:junofrst_state.junofrst/dac/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/filter.0.0'}), (b:KG {id: 'audioroute:device:junofrst_state.junofrst/filter.0.0/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/filter.0.1'}), (b:KG {id: 'audioroute:device:junofrst_state.junofrst/filter.0.1/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/filter.0.2'}), (b:KG {id: 'audioroute:device:junofrst_state.junofrst/filter.0.2/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:junofrst/SYSTEM'}), (b:KG {id: 'inputs:junofrst/SYSTEM/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/SYSTEM'}), (b:KG {id: 'inputs:junofrst/SYSTEM/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/SYSTEM'}), (b:KG {id: 'inputs:junofrst/SYSTEM/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/SYSTEM'}), (b:KG {id: 'inputs:junofrst/SYSTEM/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/SYSTEM'}), (b:KG {id: 'inputs:junofrst/SYSTEM/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/SYSTEM'}), (b:KG {id: 'inputs:junofrst/SYSTEM/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/SYSTEM'}), (b:KG {id: 'inputs:junofrst/SYSTEM/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/SYSTEM'}), (b:KG {id: 'inputs:junofrst/SYSTEM/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/P1'}), (b:KG {id: 'inputs:junofrst/P1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/P1'}), (b:KG {id: 'inputs:junofrst/P1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/P1'}), (b:KG {id: 'inputs:junofrst/P1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/P1'}), (b:KG {id: 'inputs:junofrst/P1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/P1'}), (b:KG {id: 'inputs:junofrst/P1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/P1'}), (b:KG {id: 'inputs:junofrst/P1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/P1'}), (b:KG {id: 'inputs:junofrst/P1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/P1'}), (b:KG {id: 'inputs:junofrst/P1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/P2'}), (b:KG {id: 'inputs:junofrst/P2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/P2'}), (b:KG {id: 'inputs:junofrst/P2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/P2'}), (b:KG {id: 'inputs:junofrst/P2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/P2'}), (b:KG {id: 'inputs:junofrst/P2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/P2'}), (b:KG {id: 'inputs:junofrst/P2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/P2'}), (b:KG {id: 'inputs:junofrst/P2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/P2'}), (b:KG {id: 'inputs:junofrst/P2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/P2'}), (b:KG {id: 'inputs:junofrst/P2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/DSW1'}), (b:KG {id: 'inputs:junofrst/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/DSW1'}), (b:KG {id: 'inputs:junofrst/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/DSW2'}), (b:KG {id: 'inputs:junofrst/DSW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/DSW2'}), (b:KG {id: 'inputs:junofrst/DSW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/DSW2'}), (b:KG {id: 'inputs:junofrst/DSW2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/DSW2'}), (b:KG {id: 'inputs:junofrst/DSW2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:junofrst/DSW2'}), (b:KG {id: 'inputs:junofrst/DSW2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:junofrst/maincpu'}), (b:KG {id: 'rom:junofrst/maincpu/jfa_b9.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:junofrst/maincpu'}), (b:KG {id: 'rom:junofrst/maincpu/jfb_b10.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:junofrst/maincpu'}), (b:KG {id: 'rom:junofrst/maincpu/jfc_a10.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:junofrst/maincpu'}), (b:KG {id: 'rom:junofrst/maincpu/jfc1_a4.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:junofrst/maincpu'}), (b:KG {id: 'rom:junofrst/maincpu/jfc2_a5.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:junofrst/maincpu'}), (b:KG {id: 'rom:junofrst/maincpu/jfc3_a6.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:junofrst/maincpu'}), (b:KG {id: 'rom:junofrst/maincpu/jfc4_a7.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:junofrst/maincpu'}), (b:KG {id: 'rom:junofrst/maincpu/jfc5_a8.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:junofrst/maincpu'}), (b:KG {id: 'rom:junofrst/maincpu/jfc6_a9.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:junofrst/audiocpu'}), (b:KG {id: 'rom:junofrst/audiocpu/jfs1_j3.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:junofrst/mcu'}), (b:KG {id: 'rom:junofrst/mcu/jfs2_p4.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:junofrst/blitrom'}), (b:KG {id: 'rom:junofrst/blitrom/jfs3_c7.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:junofrst/blitrom'}), (b:KG {id: 'rom:junofrst/blitrom/jfs4_d7.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:junofrst/blitrom'}), (b:KG {id: 'rom:junofrst/blitrom/jfs5_e7.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'handler:tutankhm_state.stars_init'}), (b:KG {id: 'handler:tutankhm_state.stars_init_scramble'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tutankhm_state.stars_init'}), (b:KG {id: 'handler:tutankhm_state.stars_init_bootleg'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:junofrst_state.main_map'}), (b:KG {id: 'file:src/mame/konami/junofrst.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 264, sourceColumn: 1, sourceEndLine: 282};
MATCH (a:KG {id: 'map:junofrst_state.main_map'}), (b:KG {id: 'map:junofrst_state.main_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:junofrst_state.main_map'}), (b:KG {id: 'map:junofrst_state.main_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:junofrst_state.main_map'}), (b:KG {id: 'map:junofrst_state.main_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:junofrst_state.main_map'}), (b:KG {id: 'map:junofrst_state.main_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:junofrst_state.main_map'}), (b:KG {id: 'map:junofrst_state.main_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:junofrst_state.main_map'}), (b:KG {id: 'map:junofrst_state.main_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:junofrst_state.main_map'}), (b:KG {id: 'map:junofrst_state.main_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:junofrst_state.main_map'}), (b:KG {id: 'map:junofrst_state.main_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:junofrst_state.main_map'}), (b:KG {id: 'map:junofrst_state.main_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:junofrst_state.main_map'}), (b:KG {id: 'map:junofrst_state.main_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:junofrst_state.main_map'}), (b:KG {id: 'map:junofrst_state.main_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:junofrst_state.main_map'}), (b:KG {id: 'map:junofrst_state.main_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:junofrst_state.main_map'}), (b:KG {id: 'map:junofrst_state.main_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:junofrst_state.main_map'}), (b:KG {id: 'map:junofrst_state.main_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:junofrst_state.main_map'}), (b:KG {id: 'map:junofrst_state.main_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:junofrst_state.main_map'}), (b:KG {id: 'map:junofrst_state.main_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:junofrst_state.audio_map'}), (b:KG {id: 'file:src/mame/konami/junofrst.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 285, sourceColumn: 1, sourceEndLine: 295};
MATCH (a:KG {id: 'map:junofrst_state.audio_map'}), (b:KG {id: 'map:junofrst_state.audio_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:junofrst_state.audio_map'}), (b:KG {id: 'map:junofrst_state.audio_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:junofrst_state.audio_map'}), (b:KG {id: 'map:junofrst_state.audio_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:junofrst_state.audio_map'}), (b:KG {id: 'map:junofrst_state.audio_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:junofrst_state.audio_map'}), (b:KG {id: 'map:junofrst_state.audio_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:junofrst_state.audio_map'}), (b:KG {id: 'map:junofrst_state.audio_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:junofrst_state.audio_map'}), (b:KG {id: 'map:junofrst_state.audio_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:junofrst_state.audio_map'}), (b:KG {id: 'map:junofrst_state.audio_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/mcu/callback:mcu:0'}), (b:KG {id: 'handler:dac_byte_interface.data_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/mcu/callback:mcu:1'}), (b:KG {id: 'handler:junofrst_state.i8039_irqen_and_status_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:junofrst_state.mcu_map'}), (b:KG {id: 'file:src/mame/konami/junofrst.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 298, sourceColumn: 1, sourceEndLine: 301};
MATCH (a:KG {id: 'map:junofrst_state.mcu_map'}), (b:KG {id: 'map:junofrst_state.mcu_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:junofrst_state.mcu_io_map'}), (b:KG {id: 'file:src/mame/konami/junofrst.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/konami/junofrst.cpp', sourceLine: 304, sourceColumn: 1, sourceEndLine: 307};
MATCH (a:KG {id: 'map:junofrst_state.mcu_io_map'}), (b:KG {id: 'map:junofrst_state.mcu_io_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/mainlatch/callback:mainlatch:0'}), (b:KG {id: 'handler:junofrst_state.irq_enable_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/mainlatch/callback:mainlatch:1'}), (b:KG {id: 'handler:junofrst_state.coin_counter_2_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/mainlatch/callback:mainlatch:2'}), (b:KG {id: 'handler:junofrst_state.coin_counter_1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/mainlatch/callback:mainlatch:4'}), (b:KG {id: 'handler:junofrst_state.flip_screen_x_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/mainlatch/callback:mainlatch:5'}), (b:KG {id: 'handler:junofrst_state.flip_screen_y_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/screen/callback:screen:0'}), (b:KG {id: 'handler:junofrst_state.screen_update_scramble'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/screen/callback:screen:1'}), (b:KG {id: 'handler:junofrst_state._30hz_irq'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/aysnd/callback:aysnd:0'}), (b:KG {id: 'handler:junofrst_state.portA_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:junofrst_state.junofrst/aysnd/callback:aysnd:1'}), (b:KG {id: 'handler:junofrst_state.portB_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:junofrst_state.main_map/range1'}), (b:KG {id: 'handler:palette_device.write8'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'palette'};
MATCH (a:KG {id: 'map:junofrst_state.main_map/range3'}), (b:KG {id: 'handler:watchdog_timer_device.reset_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:junofrst_state.main_map/range8'}), (b:KG {id: 'handler:ls259_device.write_d0'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'mainlatch'};
MATCH (a:KG {id: 'map:junofrst_state.main_map/range9'}), (b:KG {id: 'handler:junofrst_state.sh_irqtrigger_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:junofrst_state.main_map/range10'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:junofrst_state.main_map/range11'}), (b:KG {id: 'handler:junofrst_state.bankselect_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:junofrst_state.main_map/range12'}), (b:KG {id: 'handler:junofrst_state.blitter_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:junofrst_state.audio_map/range2'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'soundlatch'};
MATCH (a:KG {id: 'map:junofrst_state.audio_map/range3'}), (b:KG {id: 'handler:ay8910_device.address_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'aysnd'};
MATCH (a:KG {id: 'map:junofrst_state.audio_map/range4'}), (b:KG {id: 'handler:ay8910_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'aysnd'};
MATCH (a:KG {id: 'map:junofrst_state.audio_map/range5'}), (b:KG {id: 'handler:ay8910_device.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'aysnd'};
MATCH (a:KG {id: 'map:junofrst_state.audio_map/range6'}), (b:KG {id: 'handler:generic_latch_8_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'soundlatch2'};
MATCH (a:KG {id: 'map:junofrst_state.audio_map/range7'}), (b:KG {id: 'handler:junofrst_state.i8039_irq_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:junofrst_state.mcu_io_map/range0'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'soundlatch2'};
MATCH (a:KG {id: 'handler:junofrst_state.screen_update_scramble'}), (b:KG {id: 'handler:tutankhm_state.scramble_draw_background'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tutankhm_state.scramble_draw_background'}), (b:KG {id: 'handler:tutankhm_state.scramble_draw_stars'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:tutankhm_state.scramble_draw_stars'}), (b:KG {id: 'handler:tutankhm_state.stars_draw_row'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
