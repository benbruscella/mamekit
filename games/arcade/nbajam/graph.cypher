// mamekit knowledge graph — driver src/mame/williams/midtunit.cpp
// generated 2026-09-24T02:29:31.535Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/williams/midtunit.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/williams/midtunit.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:midtunit.h'}) SET n:SourceFile SET n += {path: 'midtunit.h', external: true};
MERGE (n:KG {id: 'file:machine/nvram.h'}) SET n:SourceFile SET n += {path: 'machine/nvram.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:williamssound.h'}) SET n:SourceFile SET n += {path: 'williamssound.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6809/m6809.h'}) SET n:SourceFile SET n += {path: 'cpu/m6809/m6809.h', external: true};
MERGE (n:KG {id: 'file:machine/6821pia.h'}) SET n:SourceFile SET n += {path: 'machine/6821pia.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6800/m6800.h'}) SET n:SourceFile SET n += {path: 'cpu/m6800/m6800.h', external: true};
MERGE (n:KG {id: 'file:sound/hc55516.h'}) SET n:SourceFile SET n += {path: 'sound/hc55516.h', external: true};
MERGE (n:KG {id: 'file:sound/okim6295.h'}) SET n:SourceFile SET n += {path: 'sound/okim6295.h', external: true};
MERGE (n:KG {id: 'file:sound/ymopm.h'}) SET n:SourceFile SET n += {path: 'sound/ymopm.h', external: true};
MERGE (n:KG {id: 'file:src/mame/shared/williamssound.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/shared/williamssound.cpp'};
MERGE (n:KG {id: 'file:machine/rescap.h'}) SET n:SourceFile SET n += {path: 'machine/rescap.h', external: true};
MERGE (n:KG {id: 'file:sound/dac.h'}) SET n:SourceFile SET n += {path: 'sound/dac.h', external: true};
MERGE (n:KG {id: 'file:src/mame/williams/midtview.ipp'}) SET n:SourceFile SET n += {path: 'src/mame/williams/midtview.ipp'};
MERGE (n:KG {id: 'game:nbajam'}) SET n:Game SET n += {initTables: ['{"name":"m_nbajam_prot_table","bits":32,"arrayLength":128,"initialValues":[556284731,607729723,824720187,808139064,824720187,808139064,590294831,641219387,556284731,607729723,824840740,808128800,824840740,808128800,590161979,641219387,725302075,774778414,959986459,943405851,993737499,976894490,725302075,774778414,725170235,774778414,960109080,943397659,993729307,976886296,725170235,774778414,18885435,70330427,287320891,270608443,287320891,270608443,52902715,103820089,154151737,203632431,422718982,405875218,422718982,405875218,187770939,237385787,52902715,103820089,287320891,270608443,321337656,304363832,52902715,103820089,187770939,237385787,422718982,405875218,456339205,439364369,187770939,237385787,556284731,607729723,824720187,808139064,824720187,808139064,590294831,641219387,556284731,607729723,824840740,808128800,824840740,808128800,590161979,641219387,725302075,774778414,959986459,943405851,993737499,976894490,725302075,774778414,725170235,774778414,960109080,943397659,993729307,976886296,725170235,774778414,18885435,70330427,287320891,270608443,287320891,270608443,52902715,103820089,154151737,203632431,422718982,405875218,422718982,405875218,187770939,237385787,52902715,103820089,287320891,270608443,321337656,304363832,52902715,103820089,187770939,237385787,422718982,405875218,456339205,439364369,187770939,237385787]}'], name: 'nbajam', year: '1993', company: 'Midway', fullname: 'NBA Jam (rev 3.01 4/07/93)', monitor: 'ROT0', cls: 'midtunit_adpcm_state', init: 'init_nbajam', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 1832, sourceColumn: 1, sourceEndLine: 1832, installedHandlers: ['{"space":"AS_PROGRAM","kind":"read","target":"m_maincpu","start":28393504,"end":28463167,"className":"midtunit_adpcm_state","method":"nbajam_prot_r","cpu":"maincpu"}', '{"space":"AS_PROGRAM","kind":"write","target":"m_maincpu","start":28393504,"end":28463167,"className":"midtunit_adpcm_state","method":"nbajam_prot_w","cpu":"maincpu"}', '{"space":"AS_PROGRAM","kind":"ram","target":"m_adpcm_sound->get_cpu()","start":64426,"end":64468,"className":"","method":"","cpu":"adpcm:cpu"}']};
MERGE (n:KG {id: 'handler:midtunit_adpcm_state.nbajam_prot_r'}) SET n:Handler SET n += {method: 'nbajam_prot_r', ownerClass: 'midtunit_adpcm_state', sourceFile: 'src/mame/williams/midtunit_m.cpp', sourceLine: 254, sourceColumn: 1, sourceEndLine: 263, sourceParameters: '', sourceBody: 'uint16_t const result = m_nbajam_prot_queue[m_nbajam_prot_index];
	if (!machine().side_effects_disabled())
	{
		if (m_nbajam_prot_index < 4)
			m_nbajam_prot_index++;
	}
	return result;'};
MERGE (n:KG {id: 'handler:midtunit_adpcm_state.nbajam_prot_w'}) SET n:Handler SET n += {method: 'nbajam_prot_w', ownerClass: 'midtunit_adpcm_state', sourceFile: 'src/mame/williams/midtunit_m.cpp', sourceLine: 265, sourceColumn: 1, sourceEndLine: 276, sourceParameters: 'offs_t offset, uint16_t data', sourceBody: 'int const table_index = (offset >> 6) & 0x7f;
	uint32_t const protval = m_nbajam_prot_table[table_index];

	m_nbajam_prot_queue[0] = data;
	m_nbajam_prot_queue[1] = ((protval >> 24) & 0xff) << 9;
	m_nbajam_prot_queue[2] = ((protval >> 16) & 0xff) << 9;
	m_nbajam_prot_queue[3] = ((protval >> 8) & 0xff) << 9;
	m_nbajam_prot_queue[4] = ((protval >> 0) & 0xff) << 9;
	m_nbajam_prot_index = 0;'};
MERGE (n:KG {id: 'romset:nbajam'}) SET n:RomSet SET n += {name: 'nbajam', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 1261, sourceColumn: 1, sourceEndLine: 1261};
MERGE (n:KG {id: 'region:nbajam/adpcm:cpu'}) SET n:RomRegion SET n += {tag: 'adpcm:cpu', size: 327680, flags: '0', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 674, sourceColumn: 2, sourceEndLine: 674};
MERGE (n:KG {id: 'rom:nbajam/adpcm:cpu/l2_nba_jam_u3_sound_rom.u3'}) SET n:Rom SET n += {file: 'l2_nba_jam_u3_sound_rom.u3', offset: 65536, size: 131072, crc: '3a3ea480', sha1: 'd12a45cba5c35f046b176661d7877fa4fd0e6c13', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 1263, sourceColumn: 2, sourceEndLine: 1263, reloadOffsets: [196608]};
MERGE (n:KG {id: 'region:nbajam/adpcm:oki'}) SET n:RomRegion SET n += {tag: 'adpcm:oki', size: 1048576, flags: '0', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 677, sourceColumn: 2, sourceEndLine: 677};
MERGE (n:KG {id: 'rom:nbajam/adpcm:oki/l1_nba_jam_u12_sound_rom.u12'}) SET n:Rom SET n += {file: 'l1_nba_jam_u12_sound_rom.u12', offset: 0, size: 524288, crc: 'b94847f1', sha1: 'e7efa0a379bfa91fe4ffb75f07a5dfbfde9a96b4', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 1267, sourceColumn: 2, sourceEndLine: 1267};
MERGE (n:KG {id: 'rom:nbajam/adpcm:oki/l1_nba_jam_u13_sound_rom.u13'}) SET n:Rom SET n += {file: 'l1_nba_jam_u13_sound_rom.u13', offset: 524288, size: 524288, crc: 'b6fe24bd', sha1: 'f70f75b5570a2b368ebc74d2a7d264c618940430', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 1268, sourceColumn: 2, sourceEndLine: 1268};
MERGE (n:KG {id: 'region:nbajam/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 1048576, flags: '0'};
MERGE (n:KG {id: 'rom:nbajam/maincpu/l3_nba_jam_game_rom_uj12.uj12'}) SET n:Rom SET n += {file: 'l3_nba_jam_game_rom_uj12.uj12', offset: 0, size: 524288, crc: 'b93e271c', sha1: 'b0e9f055376a4a4cd1115a81f71c933903c251b1', skip: 1};
MERGE (n:KG {id: 'rom:nbajam/maincpu/l3_nba_jam_game_rom_ug12.ug12'}) SET n:Rom SET n += {file: 'l3_nba_jam_game_rom_ug12.ug12', offset: 1, size: 524288, crc: '407d3390', sha1: 'a319bc890d94310e44fe2ec98bfc95665a662701', skip: 1};
MERGE (n:KG {id: 'region:nbajam/video'}) SET n:RomRegion SET n += {tag: 'video', size: 12582912, flags: '0', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 687, sourceColumn: 2, sourceEndLine: 687};
MERGE (n:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_ug14.ug14'}) SET n:Rom SET n += {file: 'l1_nba_jam_game_rom_ug14.ug14', offset: 0, size: 524288, crc: '04bb9f64', sha1: '9e1a8c37e14cb6fe67f4aa3caa9022f356f1ca64', skip: 3};
MERGE (n:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_uj14.uj14'}) SET n:Rom SET n += {file: 'l1_nba_jam_game_rom_uj14.uj14', offset: 1, size: 524288, crc: 'b34b7af3', sha1: '0abb74d2f414bc9da0380a81beb134f3a87c1a0a', skip: 3};
MERGE (n:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_ug19.ug19'}) SET n:Rom SET n += {file: 'l1_nba_jam_game_rom_ug19.ug19', offset: 2, size: 524288, crc: 'a8f22fbb', sha1: '514208a9d6d0c8c2d7847cc02d4387eac90be659', skip: 3};
MERGE (n:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_uj19.uj19'}) SET n:Rom SET n += {file: 'l1_nba_jam_game_rom_uj19.uj19', offset: 3, size: 524288, crc: '8130a8a2', sha1: 'f23f124024285d07d8cf822817b62e42c38b82db', skip: 3};
MERGE (n:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_ug16.ug16'}) SET n:Rom SET n += {file: 'l1_nba_jam_game_rom_ug16.ug16', offset: 2097152, size: 524288, crc: '8591c572', sha1: '237bab2e93abf438a84be3603505db5de59922af', skip: 3};
MERGE (n:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_uj16.uj16'}) SET n:Rom SET n += {file: 'l1_nba_jam_game_rom_uj16.uj16', offset: 2097153, size: 524288, crc: 'd2e554f1', sha1: '139aa39bd48b8605058ece188f9f5e6793561fcb', skip: 3};
MERGE (n:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_ug20.ug20'}) SET n:Rom SET n += {file: 'l1_nba_jam_game_rom_ug20.ug20', offset: 2097154, size: 524288, crc: '44fd6221', sha1: '1d6754bf2c24950080523f66b77407931babba29', skip: 3};
MERGE (n:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_uj20.uj20'}) SET n:Rom SET n += {file: 'l1_nba_jam_game_rom_uj20.uj20', offset: 2097155, size: 524288, crc: 'f9cebbb6', sha1: '6202e490bc5658bd0741422f841540fcd037cfee', skip: 3};
MERGE (n:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_ug17.ug17'}) SET n:Rom SET n += {file: 'l1_nba_jam_game_rom_ug17.ug17', offset: 4194304, size: 524288, crc: '6f921886', sha1: '72542249ca6602dc4816952765c1810f064ff394', skip: 3};
MERGE (n:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_uj17.uj17'}) SET n:Rom SET n += {file: 'l1_nba_jam_game_rom_uj17.uj17', offset: 4194305, size: 524288, crc: 'b2e14981', sha1: '5cec9b7fcaa6d0ce5bff689541fc98db435c5b5f', skip: 3};
MERGE (n:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_ug22.ug22'}) SET n:Rom SET n += {file: 'l1_nba_jam_game_rom_ug22.ug22', offset: 4194306, size: 524288, crc: 'ab05ed89', sha1: '4153d098fbaeac963d93f26dcd9d8bc33a48a734', skip: 3};
MERGE (n:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_uj22.uj22'}) SET n:Rom SET n += {file: 'l1_nba_jam_game_rom_uj22.uj22', offset: 4194307, size: 524288, crc: '59a95878', sha1: 'b95165987853f164842ab2b5895ea95484a1d78b', skip: 3};
MERGE (n:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_ug18.ug18'}) SET n:Rom SET n += {file: 'l1_nba_jam_game_rom_ug18.ug18', offset: 6291456, size: 524288, crc: '5162d3d6', sha1: '14d377977510b7793e4006a7a5089dbfd785d7d1', skip: 3};
MERGE (n:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_uj18.uj18'}) SET n:Rom SET n += {file: 'l1_nba_jam_game_rom_uj18.uj18', offset: 6291457, size: 524288, crc: 'fdee0037', sha1: '3bcc740f4bdb3236822cd6e7ed06241804351cca', skip: 3};
MERGE (n:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_ug23.ug23'}) SET n:Rom SET n += {file: 'l1_nba_jam_game_rom_ug23.ug23', offset: 6291458, size: 524288, crc: '7b934c7a', sha1: 'a6992fb3c50429ac4fa15bd91612ae0c0b8f961d', skip: 3};
MERGE (n:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_uj23.uj23'}) SET n:Rom SET n += {file: 'l1_nba_jam_game_rom_uj23.uj23', offset: 6291459, size: 524288, crc: '427d2eee', sha1: '4985e3dd9c9e1bedd5a900958bf549656debd494', skip: 3};
MERGE (n:KG {id: 'map:midtunit_base_state.main_map'}) SET n:AddressMap SET n += {cls: 'midtunit_base_state', name: 'main_map', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 43, sourceColumn: 1, sourceEndLine: 63, unmapHigh: true};
MERGE (n:KG {id: 'map:midtunit_base_state.main_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 4194303, raw: 'map(0x00000000, 0x003fffff).rw(m_video, FUNC(midtunit_video_device::midtunit_vram_r), FUNC(midtunit_video_device::midtunit_vram_w))', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 46, sourceColumn: 2, sourceEndLine: 46};
MERGE (n:KG {id: 'handler:midtunit_video_device.midtunit_vram_r'}) SET n:Handler SET n += {method: 'midtunit_vram_r', ownerClass: 'midtunit_video_device', sourceFile: 'src/mame/williams/midtunit_v.cpp', sourceLine: 301, sourceColumn: 1, sourceEndLine: 308, sourceParameters: 'offs_t offset', sourceBody: 'offset *= 2;
	if (m_videobank_select)
		return (m_local_videoram[offset] & 0x00ff) | (m_local_videoram[offset + 1] << 8);
	else
		return (m_local_videoram[offset] >> 8) | (m_local_videoram[offset + 1] & 0xff00);'};
MERGE (n:KG {id: 'handler:midtunit_video_device.midtunit_vram_w'}) SET n:Handler SET n += {method: 'midtunit_vram_w', ownerClass: 'midtunit_video_device', sourceFile: 'src/mame/williams/midtunit_v.cpp', sourceLine: 261, sourceColumn: 1, sourceEndLine: 278, sourceConstants: ['DMA_PALETTE=8'], sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: 'offset *= 2;
	if (m_videobank_select)
	{
		if (ACCESSING_BITS_0_7)
			m_local_videoram[offset] = (data & 0xff) | ((m_dma_register[DMA_PALETTE] & 0xff) << 8);
		if (ACCESSING_BITS_8_15)
			m_local_videoram[offset + 1] = ((data >> 8) & 0xff) | (m_dma_register[DMA_PALETTE] & 0xff00);
	}
	else
	{
		if (ACCESSING_BITS_0_7)
			m_local_videoram[offset] = (m_local_videoram[offset] & 0xff) | ((data & 0xff) << 8);
		if (ACCESSING_BITS_8_15)
			m_local_videoram[offset + 1] = (m_local_videoram[offset + 1] & 0xff) | (data & 0xff00);
	}'};
MERGE (n:KG {id: 'map:midtunit_base_state.main_map/range1'}) SET n:AddressRange SET n += {start: 16777216, end: 20971519, raw: 'map(0x01000000, 0x013fffff).ram()', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 47, sourceColumn: 2, sourceEndLine: 47, ram: true};
MERGE (n:KG {id: 'map:midtunit_base_state.main_map/range2'}) SET n:AddressRange SET n += {start: 20971520, end: 21102591, raw: 'map(0x01400000, 0x0141ffff).rw(FUNC(midtunit_base_state::cmos_r), FUNC(midtunit_base_state::cmos_w)).share(m_nvram)', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 48, sourceColumn: 2, sourceEndLine: 48, share: 'nvram'};
MERGE (n:KG {id: 'handler:midtunit_base_state.cmos_r'}) SET n:Handler SET n += {method: 'cmos_r', ownerClass: 'midtunit_base_state', sourceFile: 'src/mame/williams/midtunit_m.cpp', sourceLine: 93, sourceColumn: 1, sourceEndLine: 96, sourceParameters: 'offs_t offset', sourceBody: 'return m_nvram[offset];'};
MERGE (n:KG {id: 'handler:midtunit_base_state.cmos_w'}) SET n:Handler SET n += {method: 'cmos_w', ownerClass: 'midtunit_base_state', sourceFile: 'src/mame/williams/midtunit_m.cpp', sourceLine: 78, sourceColumn: 1, sourceEndLine: 90, sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: 'if (1)// m_cmos_write_enable
	{
		COMBINE_DATA(m_nvram+offset);
		m_cmos_write_enable = 0;
	}
	else
	{
		LOGCMOS("%08X:Unexpected CMOS W @ %05X\\n", m_maincpu->pc(), offset);
		popmessage("Bad CMOS write");
	}'};
MERGE (n:KG {id: 'map:midtunit_base_state.main_map/range3'}) SET n:AddressRange SET n += {start: 21495808, end: 22020095, raw: 'map(0x01480000, 0x014fffff).w(FUNC(midtunit_base_state::cmos_enable_w))', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 49, sourceColumn: 2, sourceEndLine: 49};
MERGE (n:KG {id: 'handler:midtunit_base_state.cmos_enable_w'}) SET n:Handler SET n += {method: 'cmos_enable_w', ownerClass: 'midtunit_base_state', sourceFile: 'src/mame/williams/midtunit_m.cpp', sourceLine: 72, sourceColumn: 1, sourceEndLine: 75, sourceParameters: 'uint16_t data', sourceBody: 'm_cmos_write_enable = 1;'};
MERGE (n:KG {id: 'map:midtunit_base_state.main_map/range4'}) SET n:AddressRange SET n += {start: 23068672, end: 23068687, raw: 'map(0x01600000, 0x0160000f).portr("IN0")', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 50, sourceColumn: 2, sourceEndLine: 50, portRead: 'IN0'};
MERGE (n:KG {id: 'map:midtunit_base_state.main_map/range5'}) SET n:AddressRange SET n += {start: 23068688, end: 23068703, raw: 'map(0x01600010, 0x0160001f).portr("IN1")', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 51, sourceColumn: 2, sourceEndLine: 51, portRead: 'IN1'};
MERGE (n:KG {id: 'map:midtunit_base_state.main_map/range6'}) SET n:AddressRange SET n += {start: 23068704, end: 23068719, raw: 'map(0x01600020, 0x0160002f).portr("IN2")', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 52, sourceColumn: 2, sourceEndLine: 52, portRead: 'IN2'};
MERGE (n:KG {id: 'map:midtunit_base_state.main_map/range7'}) SET n:AddressRange SET n += {start: 23068720, end: 23068735, raw: 'map(0x01600030, 0x0160003f).portr("DSW")', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 53, sourceColumn: 2, sourceEndLine: 53, portRead: 'DSW'};
MERGE (n:KG {id: 'map:midtunit_base_state.main_map/range8'}) SET n:AddressRange SET n += {start: 25165824, end: 25690111, raw: 'map(0x01800000, 0x0187ffff).ram().w(m_palette, FUNC(palette_device::write16)).share("palette")', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 54, sourceColumn: 2, sourceEndLine: 54, ram: true, share: 'palette'};
MERGE (n:KG {id: 'handler:palette_device.write16'}) SET n:Handler SET n += {method: 'write16', ownerClass: 'palette_device', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 54, sourceColumn: 2, sourceEndLine: 54};
MERGE (n:KG {id: 'map:midtunit_base_state.main_map/range9'}) SET n:AddressRange SET n += {start: 27787264, end: 27787519, raw: 'map(0x01a80000, 0x01a800ff).rw(m_video, FUNC(midtunit_video_device::dma_r), FUNC(midtunit_video_device::dma_w))', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 55, sourceColumn: 2, sourceEndLine: 55};
MERGE (n:KG {id: 'handler:midtunit_video_device.dma_r'}) SET n:Handler SET n += {method: 'dma_r', ownerClass: 'midtunit_video_device', sourceFile: 'src/mame/williams/midtunit_v.cpp', sourceLine: 640, sourceColumn: 1, sourceEndLine: 648, sourceParameters: 'offs_t offset', sourceBody: '// rmpgwt sometimes reads register 0, expecting it to return the
	// current DMA status; thus we map register 0 to register 1
	// openice does it as well
	if (offset == 0)
		offset = 1;
	return m_dma_register[offset];'};
MERGE (n:KG {id: 'handler:midtunit_video_device.dma_w'}) SET n:Handler SET n += {method: 'dma_w', ownerClass: 'midtunit_video_device', sourceFile: 'src/mame/williams/midtunit_v.cpp', sourceLine: 697, sourceColumn: 1, sourceEndLine: 838, sourceConstants: ['LOG_DMA=0', 'DEBUG_MIDTUNIT_BLITTER=0', 'XPOSMASK=1023', 'YPOSMASK=511', 'DMA_LRSKIP=0', 'DMA_COMMAND=1', 'DMA_OFFSETLO=2', 'DMA_OFFSETHI=3', 'DMA_XSTART=4', 'DMA_YSTART=5', 'DMA_WIDTH=6', 'DMA_HEIGHT=7', 'DMA_PALETTE=8', 'DMA_COLOR=9', 'DMA_SCALE_X=10', 'DMA_SCALE_Y=11', 'DMA_TOPCLIP=12', 'DMA_BOTCLIP=13', 'DMA_UNKNOWN_E=14', 'DMA_CONFIG=15', 'DMA_LEFTCLIP=16', 'DMA_RIGHTCLIP=17'], sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: 'static const uint8_t register_map[2][16] =
	{
		{ 0,1,2,3,4,5,6,7,8,9,10,11,16,17,14,15 },
		{ 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15 }
	};
	int const regbank = (m_dma_register[DMA_CONFIG] >> 5) & 1;
	int pixels = 0;

	// blend with the current register contents
	int regnum = register_map[regbank][offset];
	COMBINE_DATA(&m_dma_register[regnum]);

	// only writes to DMA_COMMAND actually cause actions
	if (regnum != DMA_COMMAND)
		return;

	// high bit triggers action
	int const command = m_dma_register[DMA_COMMAND];
	m_dma_irq_cb(CLEAR_LINE);
	if (!(command & 0x8000))
		return;

	auto profile = g_profiler.start(PROFILER_USER1);

	// determine bpp
	int const bpp = (command >> 12) & 7;

	// fill in the basic data
	m_dma_state.xpos = m_dma_register[DMA_XSTART] & XPOSMASK;
	m_dma_state.ypos = m_dma_register[DMA_YSTART] & YPOSMASK;
	m_dma_state.width = m_dma_register[DMA_WIDTH] & 0x3ff;
	m_dma_state.height = m_dma_register[DMA_HEIGHT] & 0x3ff;
	m_dma_state.palette = m_dma_register[DMA_PALETTE] & 0x7f00;
	m_dma_state.color = m_dma_register[DMA_COLOR] & 0xff;

	// fill in the rev 2 data
	m_dma_state.yflip = (command & 0x20) >> 5;
	m_dma_state.preskip = (command >> 8) & 3;
	m_dma_state.postskip = (command >> 10) & 3;
	m_dma_state.xstep = m_dma_register[DMA_SCALE_X] ? m_dma_register[DMA_SCALE_X] : 0x100;
	m_dma_state.ystep = m_dma_register[DMA_SCALE_Y] ? m_dma_register[DMA_SCALE_Y] : 0x100;

	// clip the clippers
	m_dma_state.topclip = m_dma_register[DMA_TOPCLIP] & 0x1ff;
	m_dma_state.botclip = m_dma_register[DMA_BOTCLIP] & 0x1ff;
	m_dma_state.leftclip = m_dma_register[DMA_LEFTCLIP] & 0x3ff;
	m_dma_state.rightclip = m_dma_register[DMA_RIGHTCLIP] & 0x3ff;

	// determine the offset
	uint32_t gfxoffset = m_dma_register[DMA_OFFSETLO] | (m_dma_register[DMA_OFFSETHI] << 16);

	// special case: drawing mode C doesn\'t need to know about any pixel data
	if ((command & 0x0f) == 0x0c)
		gfxoffset = 0;

	// determine the location
	if (!m_gfx_rom_large && gfxoffset >= 0x2000000)
		gfxoffset -= 0x2000000;
	if (gfxoffset >= 0xf8000000)
		gfxoffset -= 0xf8000000;
	if (gfxoffset < 0x10000000)
		m_dma_state.offset = gfxoffset;
	else
	{
		LOGDMACTRL("DMA source out of range: %08X\\n", gfxoffset);
		goto skipdma;
	}

	if (LOG_DMA || DEBUG_MIDTUNIT_BLITTER)
	{
		if (machine().input().code_pressed(KEYCODE_COLON))
		{
			logerror("DMA command %04X: (bpp=%d skip=%d xflip=%d yflip=%d preskip=%d postskip=%d)\\n",
					command, (command >> 12) & 7, (command >> 7) & 1, (command >> 4) & 1, (command >> 5) & 1, (command >> 8) & 3, (command >> 10) & 3);
			logerror("  offset=%08X pos=(%d,%d) w=%d h=%d clip=(%d,%d)-(%d,%d)\\n", gfxoffset, m_dma_state.xpos, m_dma_state.ypos,
					m_dma_state.width, m_dma_state.height, m_dma_state.leftclip, m_dma_state.topclip, m_dma_state.rightclip, m_dma_state.botclip);
			logerror("  palette=%04X color=%04X lskip=%02X rskip=%02X xstep=%04X ystep=%04X test=%04X config=%04X\\n",
					m_dma_register[DMA_PALETTE], m_dma_register[DMA_COLOR],
					m_dma_register[DMA_LRSKIP] >> 8, m_dma_register[DMA_LRSKIP] & 0xff,
					m_dma_register[DMA_SCALE_X], m_dma_register[DMA_SCALE_Y], m_dma_register[DMA_UNKNOWN_E],
					m_dma_register[DMA_CONFIG]);
			logerror("----\\n");
		}
	}

	// there seems to be two types of behavior for the DMA chip
	// for MK1 and MK2, the upper byte of the LRSKIP is the
	// starting skip value, and the lower byte is the ending
	// skip value; for the NBA Jam, Hangtime, and Open Ice, the
	// full word seems to be the starting skip value.
	if (command & 0x40)
	{
		m_dma_state.startskip = m_dma_register[DMA_LRSKIP] & 0xff;
		m_dma_state.endskip = m_dma_register[DMA_LRSKIP] >> 8;
	}
	else
	{
		m_dma_state.startskip = 0;
		m_dma_state.endskip = m_dma_register[DMA_LRSKIP];
	}

	if (m_log_png)
	{
		if (command & 0x80)
		{
			log_bitmap(command, bpp ? bpp : 8, true);
		}
		else
		{
			log_bitmap(command, bpp ? bpp : 8, false);
		}
	}

	// then draw
	if (m_dma_state.xstep == 0x100 && m_dma_state.ystep == 0x100)
	{
		if (command & 0x80)
			((this)->*(m_dma_draw_skip_noscale[(command & 0x1f)*8 + bpp]))();
		else
			((this)->*(m_dma_draw_noskip_noscale[(command & 0x1f)*8 + bpp]))();

		pixels = m_dma_state.width * m_dma_state.height;
	}
	else
	{
		if (command & 0x80)
			((this)->*(m_dma_draw_skip_scale[(command & 0x1f)*8 + bpp]))();
		else
			((this)->*(m_dma_draw_noskip_scale[(command & 0x1f)*8 + bpp]))();

		if (m_dma_state.xstep && m_dma_state.ystep)
			pixels = ((m_dma_state.width << 8) / m_dma_state.xstep) * ((m_dma_state.height << 8) / m_dma_state.ystep);
		else
			pixels = 0;
	}

	// signal we\'re done
skipdma:
	m_dma_timer->adjust(attotime::from_nsec(41 * pixels));'};
MERGE (n:KG {id: 'handler:midtunit_video_device.log_bitmap'}) SET n:Handler SET n += {method: 'log_bitmap', ownerClass: 'midtunit_video_device', sourceFile: 'src/mame/williams/midtunit_v.cpp', sourceLine: 870, sourceColumn: 1, sourceEndLine: 1087, sourceConstants: ['PIXEL_SKIP=0', 'PIXEL_COLOR=1', 'PIXEL_COPY=2', 'DMA_OFFSETLO=2', 'DMA_OFFSETHI=3'], sourceParameters: 'int command, int bpp, bool Skip', sourceBody: 'uint32_t const raw_offset = m_dma_register[DMA_OFFSETLO] | (m_dma_register[DMA_OFFSETHI] << 16);
	if (m_logged_rom[raw_offset >> 6] & (1ULL << (raw_offset & 0x3f)))
		return;

	int Zero = PIXEL_SKIP;
	int NonZero = PIXEL_SKIP;
	switch (command & 0xf)
	{
	case 1:  Zero = PIXEL_COPY;  NonZero = PIXEL_SKIP;  break;
	case 2:  Zero = PIXEL_SKIP;  NonZero = PIXEL_COPY;  break;
	case 3:  Zero = PIXEL_COPY;  NonZero = PIXEL_COPY;  break;
	case 4:  Zero = PIXEL_COLOR; NonZero = PIXEL_SKIP;  break;
	case 5:  Zero = PIXEL_COLOR; NonZero = PIXEL_SKIP;  break;
	case 6:  Zero = PIXEL_COLOR; NonZero = PIXEL_COPY;  break;
	case 7:  Zero = PIXEL_COLOR; NonZero = PIXEL_COPY;  break;
	case 8:  Zero = PIXEL_SKIP;  NonZero = PIXEL_COLOR; break;
	case 9:  Zero = PIXEL_COPY;  NonZero = PIXEL_COLOR; break;
	case 10: Zero = PIXEL_SKIP;  NonZero = PIXEL_COLOR; break;
	case 11: Zero = PIXEL_COPY;  NonZero = PIXEL_COLOR; break;
	case 12: Zero = PIXEL_COLOR; NonZero = PIXEL_COLOR; break;
	case 13: Zero = PIXEL_COLOR; NonZero = PIXEL_COLOR; break;
	case 14: Zero = PIXEL_COLOR; NonZero = PIXEL_COLOR; break;
	case 15: Zero = PIXEL_COLOR; NonZero = PIXEL_COLOR; break;
	default: return;
	}

	emu_file file(m_log_path, OPEN_FLAG_WRITE | OPEN_FLAG_CREATE | OPEN_FLAG_CREATE_PATHS);

	char name_buf[256];
	snprintf(name_buf, 255, "0x%08x.png", raw_offset);
	auto const filerr = file.open(name_buf);
	if (filerr)
	{
		return;
	}

	m_logged_rom[raw_offset >> 6] |= 1ULL << (raw_offset & 0x3f);

	m_log_bitmap.allocate(m_dma_state.width, m_dma_state.height);
	m_log_bitmap.fill(0);

	uint8_t const *const base = m_dma_state.gfxrom;
	uint32_t offset = m_dma_state.offset;
	uint16_t const pal = m_dma_state.palette;
	uint16_t const color = pal | m_dma_state.color;
	int const mask = (1 << bpp) - 1;

	// loop over the height
	for (int y = 0; y < m_dma_state.height; y++)
	{
		int const startskip = m_dma_state.startskip;
		[[maybe_unused]] int endskip = m_dma_state.endskip;
		int width = m_dma_state.width;
		int ix = 0;
		int tx;
		uint32_t o = offset;
		int pre = 0, post = 0;

		// handle skipping
		if (Skip)
		{
			uint8_t const value = EXTRACTGEN(0xff);
			o += 8;

			// adjust for preskip
			pre = (value & 0x0f) << m_dma_state.preskip;
			tx = pre;
			ix += tx;

			// adjust for postskip
			post = ((value >> 4) & 0x0f) << m_dma_state.postskip;
			width -= post;
			endskip -= post;
		}

		// handle start skip
		if (ix < startskip)
		{
			tx = (startskip - ix);
			ix += tx;
			o += tx * bpp;
		}

		// handle end skip
		if (width > m_dma_state.width - m_dma_state.endskip)
			width = m_dma_state.width - m_dma_state.endskip;

		bitmap_rgb32::pixel_t *d = &m_log_bitmap.pix(y, ix);

		// determine destination pointer

		// loop until we draw the entire width
		while (ix < width)
		{
			if (Zero == NonZero)
			{
				// special case similar handling of zero/non-zero
				if (Zero == PIXEL_COLOR)
					*d = m_palette->palette()->entry_list_raw()[color];
				else if (Zero == PIXEL_COPY)
					*d = m_palette->palette()->entry_list_raw()[(EXTRACTGEN(mask)) | pal];
			}
			else
			{
				// otherwise, read the pixel and look
				int const pixel = (EXTRACTGEN(mask));

				// non-zero pixel case
				if (pixel)
				{
					if (NonZero == PIXEL_COLOR)
						*d = m_palette->palette()->entry_list_raw()[color];
					else if (NonZero == PIXEL_COPY)
						*d = m_palette->palette()->entry_list_raw()[pixel | pal];
				}

				// zero pixel case
				else
				{
					if (Zero == PIXEL_COLOR)
						*d = m_palette->palette()->entry_list_raw()[color];
					else if (Zero == PIXEL_COPY)
						*d = m_palette->palette()->entry_list_raw()[pal];
				}
			}

			// advance to the next pixel
			ix++;
			d++;
			o += bpp;
		}

		// advance to the next row
		width = m_dma_state.width;
		if (Skip)
		{
			offset += 8;
			width -= pre + post;
			if (width > 0) offset += width * bpp;
		}
		else
		{
			offset += width * bpp;
		}
	}

	util::png_write_bitmap(file, nullptr, m_log_bitmap, 0, nullptr);

	if (m_log_json)
	{
		rapidjson::StringBuffer s;
		rapidjson::PrettyWriter<rapidjson::StringBuffer> writer(s);
		emu_file json(m_log_path, OPEN_FLAG_WRITE | OPEN_FLAG_CREATE | OPEN_FLAG_CREATE_PATHS);

		snprintf(name_buf, 255, "0x%08x.json", raw_offset);
		auto const jsonerr = json.open(name_buf);
		if (jsonerr)
		{
			return;
		}

		writer.StartObject();
		writer.Key("DMAState");
		writer.StartObject();

		auto hex_buf = util::string_format("0x%08x", raw_offset);
		writer.Key("MemoryAddress");
		writer.String(hex_buf.c_str());

		hex_buf = util::string_format("0x%08x", m_dma_state.offset >> 3);
		writer.Key("ROMSourceOffsetByte");
		writer.String(hex_buf.c_str());

		writer.Key("ROMSourceOffsetBit");
		writer.Int(m_dma_state.offset & 7);

		writer.Key("Size");
		writer.StartArray();
		writer.Int(m_dma_state.width);
		writer.Int(m_dma_state.height);
		writer.EndArray();

		writer.Key("BitsPerPixel");
		writer.Uint(bpp);

		writer.Key("PaletteBank");
		writer.Uint(m_dma_state.palette >> 8);

		writer.Key("FGColor");
		writer.Uint(m_dma_state.color);

		writer.Key("YFlip");
		writer.Bool(m_dma_state.yflip ? true : false);

		writer.Key("PreSkipScale");
		writer.Uint(m_dma_state.preskip);

		writer.Key("PostSkipScale");
		writer.Uint(m_dma_state.postskip);

		writer.Key("RowSkipBits");
		writer.Int(m_dma_state.rowbits);

		writer.Key("StartPixelsToSkip");
		writer.Int(m_dma_state.startskip);

		writer.Key("EndPixelsToSkip");
		writer.Int(m_dma_state.endskip);

		writer.EndObject();
		writer.EndObject();

		json.puts(s.GetString());
		json.close();
	}'};
MERGE (n:KG {id: 'map:midtunit_base_state.main_map/range10'}) SET n:AddressRange SET n += {start: 28311552, end: 28311583, raw: 'map(0x01b00000, 0x01b0001f).w(m_video, FUNC(midtunit_video_device::midtunit_control_w))', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 56, sourceColumn: 2, sourceEndLine: 56};
MERGE (n:KG {id: 'handler:midtunit_video_device.midtunit_control_w'}) SET n:Handler SET n += {method: 'midtunit_control_w', ownerClass: 'midtunit_video_device', sourceFile: 'src/mame/williams/midtunit_v.cpp', sourceLine: 351, sourceColumn: 1, sourceEndLine: 369, sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: '/*
	    other important bits:
	        bit 2 (0x0004) is toggled periodically
	*/
	LOGCTRL("T-unit control = %04X\\n", data);

	COMBINE_DATA(&m_midtunit_control);

	// gfx bank select is bit 7
	if (!(m_midtunit_control & 0x0080) || !m_gfx_rom_large)
		m_gfxbank_offset[0] = 0x000000;
	else
		m_gfxbank_offset[0] = 0x800000;

	// video bank select is bit 5
	m_videobank_select = (m_midtunit_control >> 5) & 1;'};
MERGE (n:KG {id: 'map:midtunit_base_state.main_map/range11'}) SET n:AddressRange SET n += {start: 30937184, end: 30937215, raw: 'map(0x01d81060, 0x01d8107f).w("watchdog", FUNC(watchdog_timer_device::reset16_w))', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 58, sourceColumn: 2, sourceEndLine: 58};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset16_w'}) SET n:Handler SET n += {method: 'reset16_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 58, sourceColumn: 2, sourceEndLine: 58};
MERGE (n:KG {id: 'map:midtunit_base_state.main_map/range12'}) SET n:AddressRange SET n += {start: 32505856, end: 32505887, raw: 'map(0x01f00000, 0x01f0001f).w(m_video, FUNC(midtunit_video_device::midtunit_control_w))', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 59, sourceColumn: 2, sourceEndLine: 59};
MERGE (n:KG {id: 'map:midtunit_base_state.main_map/range13'}) SET n:AddressRange SET n += {start: 33554432, end: 134217727, raw: 'map(0x02000000, 0x07ffffff).r(m_video, FUNC(midtunit_video_device::midtunit_gfxrom_r)).share("video")', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 60, sourceColumn: 2, sourceEndLine: 60, share: 'video'};
MERGE (n:KG {id: 'handler:midtunit_video_device.midtunit_gfxrom_r'}) SET n:Handler SET n += {method: 'midtunit_gfxrom_r', ownerClass: 'midtunit_video_device', sourceFile: 'src/mame/williams/midtunit_v.cpp', sourceLine: 238, sourceColumn: 1, sourceEndLine: 243, sourceParameters: 'offs_t offset', sourceBody: 'uint8_t const *const base = &m_gfxrom[m_gfxbank_offset[(offset >> 21) & 1]];
	offset = (offset & 0x01fffff) * 2;
	return base[offset] | (base[offset + 1] << 8);'};
MERGE (n:KG {id: 'map:midtunit_base_state.main_map/range14'}) SET n:AddressRange SET n += {start: 528482304, end: 536870911, raw: 'map(0x1f800000, 0x1fffffff).rom().region("maincpu", 0)', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 61, sourceColumn: 2, sourceEndLine: 61, rom: true, region: 'maincpu', regionOffset: 0};
MERGE (n:KG {id: 'map:midtunit_base_state.main_map/range15'}) SET n:AddressRange SET n += {start: 4286578688, end: 4294967295, raw: 'map(0xff800000, 0xffffffff).rom().region("maincpu", 0)', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 62, sourceColumn: 2, sourceEndLine: 62, rom: true, region: 'maincpu', regionOffset: 0};
MERGE (n:KG {id: 'map:midtunit_adpcm_state.main_adpcm_map'}) SET n:AddressMap SET n += {cls: 'midtunit_adpcm_state', name: 'main_adpcm_map', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 65, sourceColumn: 1, sourceEndLine: 71, calls: ['main_map']};
MERGE (n:KG {id: 'map:midtunit_adpcm_state.main_adpcm_map/range0'}) SET n:AddressRange SET n += {start: 30408704, end: 30408735, raw: 'map(0x01d00000, 0x01d0001f).r(FUNC(midtunit_adpcm_state::sound_state_r))', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 69, sourceColumn: 2, sourceEndLine: 69};
MERGE (n:KG {id: 'handler:midtunit_adpcm_state.sound_state_r'}) SET n:Handler SET n += {method: 'sound_state_r', ownerClass: 'midtunit_adpcm_state', sourceFile: 'src/mame/williams/midtunit_m.cpp', sourceLine: 527, sourceColumn: 1, sourceEndLine: 538, sourceParameters: '', sourceBody: '//  LOGSOUND("%s:Sound status read\\n", machine().describe_context());

	if (m_fake_sound_state)
	{
		if (!machine().side_effects_disabled())
			m_fake_sound_state--;
		return 0;
	}
	return ~0;'};
MERGE (n:KG {id: 'map:midtunit_adpcm_state.main_adpcm_map/range1'}) SET n:AddressRange SET n += {start: 30412832, end: 30412863, raw: 'map(0x01d01020, 0x01d0103f).rw(FUNC(midtunit_adpcm_state::sound_r), FUNC(midtunit_adpcm_state::sound_w))', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 70, sourceColumn: 2, sourceEndLine: 70};
MERGE (n:KG {id: 'handler:midtunit_adpcm_state.sound_r'}) SET n:Handler SET n += {method: 'sound_r', ownerClass: 'midtunit_adpcm_state', sourceFile: 'src/mame/williams/midtunit_m.cpp', sourceLine: 540, sourceColumn: 1, sourceEndLine: 546, sourceParameters: '', sourceBody: 'if (!machine().side_effects_disabled())
		LOGSOUND("%08X:Sound data read\\n", m_maincpu->pc());

	return ~0;'};
MERGE (n:KG {id: 'handler:midtunit_adpcm_state.sound_w'}) SET n:Handler SET n += {method: 'sound_w', ownerClass: 'midtunit_adpcm_state', sourceFile: 'src/mame/williams/midtunit_m.cpp', sourceLine: 548, sourceColumn: 1, sourceEndLine: 566, sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: '// check for out-of-bounds accesses
	if (!offset)
	{
		LOGSOUND("%08X:Unexpected write to sound (lo) = %04X\\n", m_maincpu->pc(), data);
		return;
	}

	// call through based on the sound type
	if (ACCESSING_BITS_0_7 && ACCESSING_BITS_8_15)
	{
		m_adpcm_sound->reset_write(~data & 0x100);
		m_adpcm_sound->write(data & 0xff);

		// the games seem to check for $82 loops, so this should be just barely enough
		m_fake_sound_state = 128;
	}'};
MERGE (n:KG {id: 'handler:williams_adpcm_sound_device.reset_write'}) SET n:Handler SET n += {method: 'reset_write', ownerClass: 'williams_adpcm_sound_device', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 657, sourceColumn: 1, sourceEndLine: 670, sourceParameters: 'int state', sourceBody: '// going high halts the CPU
	if (state)
	{
		bank_select_w(0);
		device_reset();
		m_cpu->set_input_line(INPUT_LINE_RESET, ASSERT_LINE);
	}

	// going low resets and reactivates the CPU
	else
		m_cpu->set_input_line(INPUT_LINE_RESET, CLEAR_LINE);'};
MERGE (n:KG {id: 'handler:williams_adpcm_sound_device.bank_select_w'}) SET n:Handler SET n += {method: 'bank_select_w', ownerClass: 'williams_adpcm_sound_device', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 688, sourceColumn: 1, sourceEndLine: 691, sourceParameters: 'u8 data', sourceBody: 'm_rombank->set_entry(data & 0x07);'};
MERGE (n:KG {id: 'handler:williams_adpcm_sound_device.device_reset'}) SET n:Handler SET n += {method: 'device_reset', ownerClass: 'williams_adpcm_sound_device', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 820, sourceColumn: 1, sourceEndLine: 830, sourceConstants: ['M6809_IRQ_LINE=0', 'M6809_FIRQ_LINE=1'], sourceParameters: '', sourceBody: '// reset interrupt states
	m_sound_int_state = 0;
	m_cpu->set_input_line(M6809_FIRQ_LINE, CLEAR_LINE);
	m_cpu->set_input_line(M6809_IRQ_LINE, CLEAR_LINE);
	m_cpu->set_input_line(INPUT_LINE_NMI, CLEAR_LINE);

	m_sync_command_timer->adjust(attotime::never);
	m_irq_clear_timer->adjust(attotime::never);'};
MERGE (n:KG {id: 'handler:williams_adpcm_sound_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'williams_adpcm_sound_device', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 647, sourceColumn: 1, sourceEndLine: 650, sourceParameters: 'u16 data', sourceBody: 'm_sync_command_timer->adjust(attotime::zero, data);'};
MERGE (n:KG {id: 'handler:ym2151_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'ym2151_device', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 740, sourceColumn: 2, sourceEndLine: 740};
MERGE (n:KG {id: 'handler:ym2151_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'ym2151_device', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 740, sourceColumn: 2, sourceEndLine: 740};
MERGE (n:KG {id: 'handler:dac_byte_interface.data_w'}) SET n:Handler SET n += {method: 'data_w', ownerClass: 'dac_byte_interface', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 1242, sourceColumn: 2, sourceEndLine: 1242};
MERGE (n:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map'}) SET n:AddressMap SET n += {cls: 'williams_adpcm_sound_device', name: 'williams_adpcm_map', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 736, sourceColumn: 1, sourceEndLine: 748};
MERGE (n:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 8191, raw: 'map(0x0000, 0x1fff).ram()', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 738, sourceColumn: 2, sourceEndLine: 738, ram: true};
MERGE (n:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range1'}) SET n:AddressRange SET n += {start: 8192, end: 8192, raw: 'map(0x2000, 0x2000).mirror(0x03ff).w(FUNC(williams_adpcm_sound_device::bank_select_w))', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 739, sourceColumn: 2, sourceEndLine: 739, mirror: 1023};
MERGE (n:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range2'}) SET n:AddressRange SET n += {start: 9216, end: 9217, raw: 'map(0x2400, 0x2401).mirror(0x03fe).rw("ym2151", FUNC(ym2151_device::read), FUNC(ym2151_device::write))', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 740, sourceColumn: 2, sourceEndLine: 740, mirror: 1022};
MERGE (n:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range3'}) SET n:AddressRange SET n += {start: 10240, end: 10240, raw: 'map(0x2800, 0x2800).mirror(0x03ff).w("dac", FUNC(dac_byte_interface::data_w))', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 741, sourceColumn: 2, sourceEndLine: 741, mirror: 1023};
MERGE (n:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range4'}) SET n:AddressRange SET n += {start: 11264, end: 11264, raw: 'map(0x2c00, 0x2c00).mirror(0x03ff).rw("oki", FUNC(okim6295_device::read), FUNC(okim6295_device::write))', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 742, sourceColumn: 2, sourceEndLine: 742, mirror: 1023};
MERGE (n:KG {id: 'handler:okim6295_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'okim6295_device', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 742, sourceColumn: 2, sourceEndLine: 742};
MERGE (n:KG {id: 'handler:okim6295_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'okim6295_device', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 742, sourceColumn: 2, sourceEndLine: 742};
MERGE (n:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range5'}) SET n:AddressRange SET n += {start: 12288, end: 12288, raw: 'map(0x3000, 0x3000).mirror(0x03ff).r(FUNC(williams_adpcm_sound_device::command_r))', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 743, sourceColumn: 2, sourceEndLine: 743, mirror: 1023};
MERGE (n:KG {id: 'handler:williams_adpcm_sound_device.command_r'}) SET n:Handler SET n += {method: 'command_r', ownerClass: 'williams_adpcm_sound_device', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 710, sourceColumn: 1, sourceEndLine: 718, sourceConstants: ['M6809_IRQ_LINE=0'], sourceParameters: '', sourceBody: 'm_cpu->set_input_line(M6809_IRQ_LINE, CLEAR_LINE);

	// don\'t clear the external IRQ state for a short while; this allows the
	// self-tests to pass
	m_irq_clear_timer->adjust(attotime::from_usec(10));
	return m_latch;'};
MERGE (n:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range6'}) SET n:AddressRange SET n += {start: 13312, end: 13312, raw: 'map(0x3400, 0x3400).mirror(0x03ff).w(FUNC(williams_adpcm_sound_device::oki6295_bank_select_w))', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 744, sourceColumn: 2, sourceEndLine: 744, mirror: 1023};
MERGE (n:KG {id: 'handler:williams_adpcm_sound_device.oki6295_bank_select_w'}) SET n:Handler SET n += {method: 'oki6295_bank_select_w', ownerClass: 'williams_adpcm_sound_device', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 699, sourceColumn: 1, sourceEndLine: 702, sourceParameters: 'u8 data', sourceBody: 'm_okibank->set_entry(data & 7);'};
MERGE (n:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range7'}) SET n:AddressRange SET n += {start: 15360, end: 15360, raw: 'map(0x3c00, 0x3c00).mirror(0x03ff).w(FUNC(williams_adpcm_sound_device::talkback_w))', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 745, sourceColumn: 2, sourceEndLine: 745, mirror: 1023};
MERGE (n:KG {id: 'handler:williams_adpcm_sound_device.talkback_w'}) SET n:Handler SET n += {method: 'talkback_w', ownerClass: 'williams_adpcm_sound_device', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 725, sourceColumn: 1, sourceEndLine: 729, sourceParameters: 'u8 data', sourceBody: 'm_talkback = data;
	logerror("ADPCM Talkback = %02X\\n", data);'};
MERGE (n:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range8'}) SET n:AddressRange SET n += {start: 16384, end: 49151, raw: 'map(0x4000, 0xbfff).bankr("rombank")', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 746, sourceColumn: 2, sourceEndLine: 746, bankRead: 'rombank'};
MERGE (n:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range9'}) SET n:AddressRange SET n += {start: 49152, end: 65535, raw: 'map(0xc000, 0xffff).bankr("romupper")', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 747, sourceColumn: 2, sourceEndLine: 747, bankRead: 'romupper'};
MERGE (n:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_oki_map'}) SET n:AddressMap SET n += {cls: 'williams_adpcm_sound_device', name: 'williams_adpcm_oki_map', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 755, sourceColumn: 1, sourceEndLine: 759};
MERGE (n:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_oki_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 131071, raw: 'map(0x00000, 0x1ffff).bankr("okibank")', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 757, sourceColumn: 2, sourceEndLine: 757, bankRead: 'okibank'};
MERGE (n:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_oki_map/range1'}) SET n:AddressRange SET n += {start: 131072, end: 262143, raw: 'map(0x20000, 0x3ffff).rom().region("oki", 0x60000)', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 758, sourceColumn: 2, sourceEndLine: 758, rom: true, region: 'oki', regionOffset: 393216};
MERGE (n:KG {id: 'machine:midtunit_base_state.tunit_core'}) SET n:MachineConfig SET n += {cls: 'midtunit_base_state', name: 'tunit_core', calls: [], stateMembers: ['{"name":"m_cmos_write_enable","bits":8}'], sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 603, sourceColumn: 1, sourceEndLine: 633};
MERGE (n:KG {id: 'device:midtunit_base_state.tunit_core/video'}) SET n:Device SET n += {type: 'MIDTUNIT_VIDEO', tag: 'video', clock: null, config: ['MIDTUNIT_VIDEO(config, m_video, m_palette)', 'm_video->dma_irq_cb().set_inputline(m_maincpu, 0)'], member: 'm_video', cls: 'midtunit_video_device', clsHierarchy: ['midtunit_video_device'], sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 608, sourceColumn: 2, sourceEndLine: 608, clockExpr: 'm_palette', startHandler: 'midtunit_video_device.device_start', deviceTimers: ['m_dma_timer=midtunit_video_device.dma_done']};
MERGE (n:KG {id: 'device:midtunit_base_state.tunit_core/video/callback:video:0'}) SET n:Callback SET n += {signal: 'dma_irq_cb', operation: 'set_inputline', raw: 'm_video->dma_irq_cb().set_inputline(m_maincpu, 0)', ownerTag: 'video', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 609, sourceColumn: 2, sourceEndLine: 609, inputLine: '0', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:midtunit_base_state.tunit_core/maincpu'}) SET n:Device SET n += {type: 'TMS34010', tag: 'maincpu', clock: 50000000, config: ['TMS34010(config, m_maincpu, CPU_CLOCK)', 'm_maincpu->set_halt_on_reset(false)', 'm_maincpu->set_pixel_clock(PIXEL_CLOCK)', 'm_maincpu->set_pixels_per_clock(2)', 'm_maincpu->set_scanline_ind16_callback(m_video, FUNC(midtunit_video_device::scanline_update))', 'm_maincpu->set_shiftreg_in_callback(m_video, FUNC(midtunit_video_device::to_shiftreg))', 'm_maincpu->set_shiftreg_out_callback(m_video, FUNC(midtunit_video_device::from_shiftreg))', 'm_maincpu->set_screen("screen")'], member: 'm_maincpu', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 612, sourceColumn: 2, sourceEndLine: 612, configCalls: ['set_pixel_clock(4000000)', 'set_pixels_per_clock(2)', 'set_screen("screen")']};
MERGE (n:KG {id: 'device:midtunit_base_state.tunit_core/maincpu/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'set_scanline_ind16_callback', delegate: 1, operation: 'set_scanline_ind16_callback', raw: 'm_maincpu->set_scanline_ind16_callback(m_video, FUNC(midtunit_video_device::scanline_update))', ownerTag: 'maincpu', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 616, sourceColumn: 2, sourceEndLine: 616, targetClass: 'midtunit_video_device', targetMethod: 'scanline_update', targetTag: 'video'};
MERGE (n:KG {id: 'handler:midtunit_video_device.scanline_update'}) SET n:Handler SET n += {method: 'scanline_update', ownerClass: 'midtunit_video_device', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 616, sourceColumn: 2, sourceEndLine: 616};
MERGE (n:KG {id: 'device:midtunit_base_state.tunit_core/maincpu/callback:maincpu:1'}) SET n:Callback SET n += {signal: 'set_shiftreg_in_callback', delegate: 1, operation: 'set_shiftreg_in_callback', raw: 'm_maincpu->set_shiftreg_in_callback(m_video, FUNC(midtunit_video_device::to_shiftreg))', ownerTag: 'maincpu', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 617, sourceColumn: 2, sourceEndLine: 617, targetClass: 'midtunit_video_device', targetMethod: 'to_shiftreg', targetTag: 'video'};
MERGE (n:KG {id: 'handler:midtunit_video_device.to_shiftreg'}) SET n:Handler SET n += {method: 'to_shiftreg', ownerClass: 'midtunit_video_device', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 617, sourceColumn: 2, sourceEndLine: 617};
MERGE (n:KG {id: 'device:midtunit_base_state.tunit_core/maincpu/callback:maincpu:2'}) SET n:Callback SET n += {signal: 'set_shiftreg_out_callback', delegate: 1, operation: 'set_shiftreg_out_callback', raw: 'm_maincpu->set_shiftreg_out_callback(m_video, FUNC(midtunit_video_device::from_shiftreg))', ownerTag: 'maincpu', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 618, sourceColumn: 2, sourceEndLine: 618, targetClass: 'midtunit_video_device', targetMethod: 'from_shiftreg', targetTag: 'video'};
MERGE (n:KG {id: 'handler:midtunit_video_device.from_shiftreg'}) SET n:Handler SET n += {method: 'from_shiftreg', ownerClass: 'midtunit_video_device', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 618, sourceColumn: 2, sourceEndLine: 618};
MERGE (n:KG {id: 'device:midtunit_base_state.tunit_core/nvram'}) SET n:Device SET n += {type: 'NVRAM', tag: 'nvram', clock: null, config: ['NVRAM(config, "nvram", nvram_device::DEFAULT_ALL_0)'], sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 621, sourceColumn: 2, sourceEndLine: 621, clockExpr: 'nvram_device::DEFAULT_ALL_0'};
MERGE (n:KG {id: 'device:midtunit_base_state.tunit_core/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog")'], sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 623, sourceColumn: 2, sourceEndLine: 623};
MERGE (n:KG {id: 'device:midtunit_base_state.tunit_core/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette).set_format(palette_device::xRGB_555, 32768)'], member: 'm_palette', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 626, sourceColumn: 2, sourceEndLine: 626, paletteEntries: 32768};
MERGE (n:KG {id: 'device:midtunit_base_state.tunit_core/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['screen_device &screen(SCREEN(config, "screen", SCREEN_TYPE_RASTER))', 'screen.set_raw(PIXEL_CLOCK * 2, 506, 100, 500, 289, 20, 274)', 'screen.set_screen_update("maincpu", FUNC(tms34010_device::tms340x0_ind16))', 'screen.set_palette(m_palette)'], sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 628, sourceColumn: 2, sourceEndLine: 628, configCalls: ['set_raw(8000000,506,100,500,289,20,274)', 'set_palette("palette")'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [8000000, 506, 100, 500, 289, 20, 274], screenRawExpr: ['PIXEL_CLOCK * 2', '506', '100', '500', '289', '20', '274']};
MERGE (n:KG {id: 'device:midtunit_base_state.tunit_core/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'screen.set_screen_update("maincpu", FUNC(tms34010_device::tms340x0_ind16))', ownerTag: 'screen', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 631, sourceColumn: 2, sourceEndLine: 631, targetTag: 'maincpu', targetClass: 'tms34010_device', targetMethod: 'tms340x0_ind16', indexed: 1};
MERGE (n:KG {id: 'handler:tms34010_device.tms340x0_ind16'}) SET n:Handler SET n += {method: 'tms340x0_ind16', ownerClass: 'tms34010_device', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 631, sourceColumn: 2, sourceEndLine: 631};
MERGE (n:KG {id: 'machine:midtunit_adpcm_state.tunit_adpcm'}) SET n:MachineConfig SET n += {cls: 'midtunit_adpcm_state', name: 'tunit_adpcm', calls: ['tunit_core'], stateMembers: ['{"name":"m_cmos_write_enable","bits":8}', '{"name":"m_fake_sound_state","bits":8}', '{"name":"m_mk_prot_index","bits":8}', '{"name":"m_nbajam_prot_queue","bits":16,"arrayLength":5}', '{"name":"m_nbajam_prot_index","bits":8}', '{"name":"m_jdredd_prot_index","bits":8}', '{"name":"m_jdredd_prot_max","bits":8}'], resetHandlers: ['midtunit_adpcm_state.machine_reset'], sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 636, sourceColumn: 1, sourceEndLine: 646};
MERGE (n:KG {id: 'handler:midtunit_adpcm_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'midtunit_adpcm_state', sourceFile: 'src/mame/williams/midtunit_m.cpp', sourceLine: 501, sourceColumn: 1, sourceEndLine: 508, sourceParameters: '', sourceBody: 'midtunit_base_state::machine_reset();

	// reset sound
	m_adpcm_sound->reset_write(1);
	m_adpcm_sound->reset_write(0);'};
MERGE (n:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/rombank'}) SET n:MemoryBank SET n += {tag: 'rombank', member: 'm_rombank', startEntry: 0, entries: 8, region: 'adpcm:cpu', offset: 65536, stride: 32768, raw: 'm_rombank->configure_entries(0, 8, &rom[0x10000], 0x8000)', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 787, sourceColumn: 1, sourceEndLine: 813};
MERGE (n:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/romupper'}) SET n:MemoryBank SET n += {tag: 'romupper', member: 'romupper', startEntry: 0, entries: 1, region: 'adpcm:cpu', offset: 311296, stride: 0, raw: 'membank("romupper")->set_base(&rom[0x10000 + 0x4000 + 7 * 0x8000])', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 787, sourceColumn: 1, sourceEndLine: 813};
MERGE (n:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/okibank/2'}) SET n:MemoryBank SET n += {tag: 'okibank', member: 'm_okibank', startEntry: 0, entries: 1, region: 'adpcm:oki', offset: 262144, stride: 0, raw: 'm_okibank->configure_entry(0, &rom[0x40000])', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 787, sourceColumn: 1, sourceEndLine: 813};
MERGE (n:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/okibank/3'}) SET n:MemoryBank SET n += {tag: 'okibank', member: 'm_okibank', startEntry: 1, entries: 1, region: 'adpcm:oki', offset: 262144, stride: 0, raw: 'm_okibank->configure_entry(1, &rom[0x40000])', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 787, sourceColumn: 1, sourceEndLine: 813};
MERGE (n:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/okibank/4'}) SET n:MemoryBank SET n += {tag: 'okibank', member: 'm_okibank', startEntry: 2, entries: 1, region: 'adpcm:oki', offset: 131072, stride: 0, raw: 'm_okibank->configure_entry(2, &rom[0x20000])', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 787, sourceColumn: 1, sourceEndLine: 813};
MERGE (n:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/okibank/5'}) SET n:MemoryBank SET n += {tag: 'okibank', member: 'm_okibank', startEntry: 3, entries: 1, region: 'adpcm:oki', offset: 0, stride: 0, raw: 'm_okibank->configure_entry(3, &rom[0x00000])', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 787, sourceColumn: 1, sourceEndLine: 813};
MERGE (n:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/okibank/6'}) SET n:MemoryBank SET n += {tag: 'okibank', member: 'm_okibank', startEntry: 4, entries: 1, region: 'adpcm:oki', offset: 917504, stride: 0, raw: 'm_okibank->configure_entry(4, &rom[0xe0000])', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 787, sourceColumn: 1, sourceEndLine: 813};
MERGE (n:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/okibank/7'}) SET n:MemoryBank SET n += {tag: 'okibank', member: 'm_okibank', startEntry: 5, entries: 1, region: 'adpcm:oki', offset: 786432, stride: 0, raw: 'm_okibank->configure_entry(5, &rom[0xc0000])', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 787, sourceColumn: 1, sourceEndLine: 813};
MERGE (n:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/okibank/8'}) SET n:MemoryBank SET n += {tag: 'okibank', member: 'm_okibank', startEntry: 6, entries: 1, region: 'adpcm:oki', offset: 655360, stride: 0, raw: 'm_okibank->configure_entry(6, &rom[0xa0000])', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 787, sourceColumn: 1, sourceEndLine: 813};
MERGE (n:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/okibank/9'}) SET n:MemoryBank SET n += {tag: 'okibank', member: 'm_okibank', startEntry: 7, entries: 1, region: 'adpcm:oki', offset: 524288, stride: 0, raw: 'm_okibank->configure_entry(7, &rom[0x80000])', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 787, sourceColumn: 1, sourceEndLine: 813};
MERGE (n:KG {id: 'device:midtunit_adpcm_state.tunit_adpcm/speaker'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'speaker', clock: null, config: ['SPEAKER(config, "speaker").front_center()'], sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 643, sourceColumn: 2, sourceEndLine: 643};
MERGE (n:KG {id: 'device:midtunit_adpcm_state.tunit_adpcm/adpcm'}) SET n:Device SET n += {type: 'WILLIAMS_ADPCM_SOUND', tag: 'adpcm', clock: null, config: ['WILLIAMS_ADPCM_SOUND(config, m_adpcm_sound).add_route(ALL_OUTPUTS, "speaker", 1.0)'], member: 'm_adpcm_sound', cls: 'williams_adpcm_sound_device', clsHierarchy: ['williams_adpcm_sound_device'], sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 645, sourceColumn: 2, sourceEndLine: 645, startHandler: 'williams_adpcm_sound_device.device_start', deviceTimers: ['m_sync_command_timer=williams_adpcm_sound_device.sync_command', 'm_irq_clear_timer=williams_adpcm_sound_device.irq_clear']};
MERGE (n:KG {id: 'audioroute:device:midtunit_adpcm_state.tunit_adpcm/adpcm/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'speaker', gain: 1, raw: 'WILLIAMS_ADPCM_SOUND(config, m_adpcm_sound).add_route(ALL_OUTPUTS, "speaker", 1.0)', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 645, sourceColumn: 2, sourceEndLine: 645};
MERGE (n:KG {id: 'machine:williams_adpcm_sound_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'williams_adpcm_sound_device', name: 'device_add_mconfig', calls: [], stateMembers: ['{"name":"m_latch","bits":8}', '{"name":"m_talkback","bits":8}', '{"name":"m_sound_int_state","bits":8}'], sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 766, sourceColumn: 1, sourceEndLine: 780};
MERGE (n:KG {id: 'device:williams_adpcm_sound_device.device_add_mconfig/cpu'}) SET n:Device SET n += {type: 'MC6809E', tag: 'cpu', clock: 2000000, config: ['MC6809E(config, m_cpu, ADPCM_MASTER_CLOCK / 4)', 'm_cpu->set_addrmap(AS_PROGRAM, &williams_adpcm_sound_device::williams_adpcm_map)'], member: 'm_cpu', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 768, sourceColumn: 2, sourceEndLine: 768};
MERGE (n:KG {id: 'device:williams_adpcm_sound_device.device_add_mconfig/ym2151'}) SET n:Device SET n += {type: 'YM2151', tag: 'ym2151', clock: 3579545, config: ['ym2151_device &ym2151(YM2151(config, "ym2151", ADPCM_FM_CLOCK))', 'ym2151.irq_handler().set_inputline("cpu", M6809_FIRQ_LINE)', 'ym2151.add_route(ALL_OUTPUTS, *this, 0.10)'], sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 771, sourceColumn: 2, sourceEndLine: 771};
MERGE (n:KG {id: 'audioroute:device:williams_adpcm_sound_device.device_add_mconfig/ym2151/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: '^', gain: 0.1, raw: 'ym2151.add_route(ALL_OUTPUTS, *this, 0.10)', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 773, sourceColumn: 2, sourceEndLine: 773};
MERGE (n:KG {id: 'device:williams_adpcm_sound_device.device_add_mconfig/ym2151/callback:ym2151:0'}) SET n:Callback SET n += {signal: 'irq_handler', operation: 'set_inputline', raw: 'ym2151.irq_handler().set_inputline("cpu", M6809_FIRQ_LINE)', ownerTag: 'ym2151', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 772, sourceColumn: 2, sourceEndLine: 772, targetTag: 'cpu', inputLine: 'M6809_FIRQ_LINE'};
MERGE (n:KG {id: 'device:williams_adpcm_sound_device.device_add_mconfig/dac'}) SET n:Device SET n += {type: 'AD7524', tag: 'dac', clock: 0, config: ['AD7524(config, "dac", 0).add_route(ALL_OUTPUTS, *this, 0.10)'], sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 775, sourceColumn: 2, sourceEndLine: 775};
MERGE (n:KG {id: 'audioroute:device:williams_adpcm_sound_device.device_add_mconfig/dac/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: '^', gain: 0.1, raw: 'AD7524(config, "dac", 0).add_route(ALL_OUTPUTS, *this, 0.10)', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 775, sourceColumn: 2, sourceEndLine: 775};
MERGE (n:KG {id: 'device:williams_adpcm_sound_device.device_add_mconfig/oki'}) SET n:Device SET n += {type: 'OKIM6295', tag: 'oki', clock: 1000000, config: ['okim6295_device &oki(OKIM6295(config, "oki", ADPCM_MASTER_CLOCK/8, okim6295_device::PIN7_HIGH))', 'oki.set_addrmap(0, &williams_adpcm_sound_device::williams_adpcm_oki_map)', 'oki.add_route(ALL_OUTPUTS, *this, 0.15)'], sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 777, sourceColumn: 2, sourceEndLine: 777};
MERGE (n:KG {id: 'audioroute:device:williams_adpcm_sound_device.device_add_mconfig/oki/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: '^', gain: 0.15, raw: 'oki.add_route(ALL_OUTPUTS, *this, 0.15)', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 779, sourceColumn: 2, sourceEndLine: 779};
MERGE (n:KG {id: 'machine:midtunit_video_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'midtunit_video_device', name: 'device_add_mconfig', calls: [], stateMembers: ['{"name":"m_midtunit_control","bits":16}', '{"name":"m_gfx_rom_large","bits":1}', '{"name":"m_gfxbank_offset","bits":32,"arrayLength":2}', '{"name":"m_videobank_select","bits":8}', '{"name":"m_dma_register","bits":16,"arrayLength":18}', '{"name":"m_dma_debug","bits":1}', '{"name":"m_doing_debug_dma","bits":1}', '{"name":"m_debug_dma_bpp","bits":32,"signed":true}', '{"name":"m_debug_dma_mode","bits":32,"signed":true}', '{"name":"m_debug_dma_command","bits":32,"signed":true}', '{"name":"m_log_png","bits":1}', '{"name":"m_log_json","bits":1}'], sourceFile: 'src/mame/williams/midtview.ipp', sourceLine: 42, sourceColumn: 1, sourceEndLine: 49};
MERGE (n:KG {id: 'device:midtunit_video_device.device_add_mconfig/debugscreen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'debugscreen', clock: null, config: ['screen_device &debugscreen(SCREEN(config, "debugscreen", SCREEN_TYPE_RASTER))', 'debugscreen.set_raw(8000000 * 2, 506, 100, 500, 289, 20, 274)', 'debugscreen.set_screen_update(FUNC(midtunit_video_device::debug_screen_update))'], sourceFile: 'src/mame/williams/midtview.ipp', sourceLine: 44, sourceColumn: 2, sourceEndLine: 44, configCalls: ['set_raw(16000000,506,100,500,289,20,274)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [16000000, 506, 100, 500, 289, 20, 274], screenRawExpr: ['8000000 * 2', '506', '100', '500', '289', '20', '274']};
MERGE (n:KG {id: 'device:midtunit_video_device.device_add_mconfig/debugscreen/callback:debugscreen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'debugscreen.set_screen_update(FUNC(midtunit_video_device::debug_screen_update))', ownerTag: 'debugscreen', sourceFile: 'src/mame/williams/midtview.ipp', sourceLine: 46, sourceColumn: 2, sourceEndLine: 46, targetClass: 'midtunit_video_device', targetMethod: 'debug_screen_update'};
MERGE (n:KG {id: 'handler:midtunit_video_device.debug_screen_update'}) SET n:Handler SET n += {method: 'debug_screen_update', ownerClass: 'midtunit_video_device', sourceFile: 'src/mame/williams/midtview.ipp', sourceLine: 263, sourceColumn: 1, sourceEndLine: 279, sourceParameters: 'screen_device &screen, bitmap_rgb32 &bitmap, const rectangle &cliprect', sourceBody: 'do_dma_debug_inputs();
	const pen_t *pens = m_debug_palette->pens();
	for (int y = 0; y <= cliprect.max_y; y++)
	{
		uint32_t *dest = &bitmap.pix(y);
		uint16_t *src = &m_debug_videoram[y * 512];
		for (int x = 0; x < cliprect.max_x; x++)
		{
			*dest = pens[*src & 0x7fff];
			src++;
			dest++;
		}
	}
	return 0;'};
MERGE (n:KG {id: 'handler:midtunit_video_device.do_dma_debug_inputs'}) SET n:Handler SET n += {method: 'do_dma_debug_inputs', ownerClass: 'midtunit_video_device', sourceFile: 'src/mame/williams/midtview.ipp', sourceLine: 70, sourceColumn: 1, sourceEndLine: 261, sourceParameters: '', sourceBody: 'static const char* const mode_strs[0x20] = {
		"None", "P0", "P1", "P0P1", "C0", "C0", "C0P1", "C0P1", "C1", "P0C1", "C1", "P0C1", "C0C1", "C0C1", "C0C1", "C0C1",
		"None", "P0F", "P1F", "P0P1F", "C0F", "C0F", "C0P1F", "C0P1F", "C1F", "P0C1F", "C1F", "P0C1F", "C0C1F", "C0C1F", "C0C1F", "C0C1F"
	};

	bool do_blit = false;
	if (machine().input().code_pressed_once(KEYCODE_M))
	{
		m_dma_debug = !m_dma_debug;
		if (m_dma_debug)
		{
			for (pen_t i = 0; i < 32768; i++)
			{
				m_debug_palette->set_pen_color(i, m_palette->pen_color(i));
			}
			do_blit = true;
		}
	}
	else if (machine().input().code_pressed_once(KEYCODE_O))
	{
		m_debug_dma_state.rowbits++;
		do_blit = true;
		popmessage("DMA RowBits: %d", m_debug_dma_state.rowbits);
	}
	else if (machine().input().code_pressed_once(KEYCODE_U))
	{
		m_debug_dma_state.rowbits--;
		if (m_debug_dma_state.rowbits < 0)
			m_debug_dma_state.rowbits = 0;
		else
			do_blit = true;
		popmessage("DMA RowBits: %d", m_debug_dma_state.rowbits);
	}
	else if (machine().input().code_pressed_once(KEYCODE_PGDN))
	{
		m_debug_dma_state.offset += 0x10000;
		do_blit = true;
		popmessage("DMA Offset: %08x", m_debug_dma_state.offset);
	}
	else if (machine().input().code_pressed_once(KEYCODE_PGUP))
	{
		uint32_t old_offset = m_debug_dma_state.offset;
		m_debug_dma_state.offset -= 0x10000;
		if (old_offset < m_debug_dma_state.offset)
			m_debug_dma_state.offset = 0;
		else
			do_blit = true;
		popmessage("DMA Offset: %08x", m_debug_dma_state.offset);
	}
	else if (machine().input().code_pressed_once(KEYCODE_END))
	{
		m_debug_dma_state.offset += 0x100;
		do_blit = true;
		popmessage("DMA Offset: %08x", m_debug_dma_state.offset);
	}
	else if (machine().input().code_pressed_once(KEYCODE_HOME))
	{
		uint32_t old_offset = m_debug_dma_state.offset;
		m_debug_dma_state.offset -= 0x100;
		if (old_offset < m_debug_dma_state.offset)
			m_debug_dma_state.offset = 0;
		else
			do_blit = true;
		popmessage("DMA Offset: %08x", m_debug_dma_state.offset);
	}
	else if (machine().input().code_pressed_once(KEYCODE_DEL))
	{
		m_debug_dma_state.offset++;
		do_blit = true;
		popmessage("DMA Offset: %08x", m_debug_dma_state.offset);
	}
	else if (machine().input().code_pressed_once(KEYCODE_INSERT))
	{
		uint32_t old_offset = m_debug_dma_state.offset;
		m_debug_dma_state.offset--;
		if (old_offset < m_debug_dma_state.offset)
			m_debug_dma_state.offset = 0;
		else
			do_blit = true;
		popmessage("DMA Offset: %08x", m_debug_dma_state.offset);
	}
	else if (machine().input().code_pressed_once(KEYCODE_RIGHT))
	{
		m_debug_dma_state.width += machine().input().code_pressed(KEYCODE_LCONTROL) ? 16 : 1;
		if (m_debug_dma_state.width > 512)
			m_debug_dma_state.width = 512;
		else
			do_blit = true;
		popmessage("DMA Width: %d", m_debug_dma_state.width);
	}
	else if (machine().input().code_pressed_once(KEYCODE_LEFT))
	{
		m_debug_dma_state.width -= machine().input().code_pressed(KEYCODE_LCONTROL) ? 16 : 1;
		if (m_debug_dma_state.width < 0)
			m_debug_dma_state.width = 0;
		else
			do_blit = true;
		popmessage("DMA Width: %d", m_debug_dma_state.width);
	}
	else if (machine().input().code_pressed_once(KEYCODE_UP))
	{
		m_debug_dma_state.height += machine().input().code_pressed(KEYCODE_LCONTROL) ? 16 : 1;
		if (m_debug_dma_state.height > 512)
			m_debug_dma_state.height = 512;
		else
			do_blit = true;
		popmessage("DMA Height: %d", m_debug_dma_state.height);
	}
	else if (machine().input().code_pressed_once(KEYCODE_DOWN))
	{
		m_debug_dma_state.height -= machine().input().code_pressed(KEYCODE_LCONTROL) ? 16 : 1;
		if (m_debug_dma_state.height < 0)
			m_debug_dma_state.height = 0;
		else
			do_blit = true;
		popmessage("DMA Height: %d", m_debug_dma_state.height);
	}
	else if (machine().input().code_pressed_once(KEYCODE_I))
	{
		m_debug_dma_state.palette += 0x0100;
		do_blit = true;
		popmessage("DMA Palette: %04x", m_debug_dma_state.palette);
	}
	else if (machine().input().code_pressed_once(KEYCODE_K))
	{
		m_debug_dma_state.palette -= 0x0100;
		do_blit = true;
		popmessage("DMA Palette: %04x", m_debug_dma_state.palette);
	}
	else if (machine().input().code_pressed_once(KEYCODE_L))
	{
		m_debug_dma_state.color++;
		if (m_debug_dma_state.color == 0x0100)
			m_debug_dma_state.color = 0;
		do_blit = true;
		popmessage("DMA Color: %02x", m_debug_dma_state.color);
	}
	else if (machine().input().code_pressed_once(KEYCODE_J))
	{
		m_debug_dma_state.color--;
		if (m_debug_dma_state.color == 0xffff)
			m_debug_dma_state.color = 0x00ff;
		do_blit = true;
		popmessage("DMA Color: %02x", m_debug_dma_state.color);
	}
	else if (machine().input().code_pressed_once(KEYCODE_H))
	{
		m_debug_dma_bpp++;
		if (m_debug_dma_bpp > 7)
			m_debug_dma_bpp = 7;
		else
			do_blit = true;
		popmessage("DMA BitsPerPixel: %d", m_debug_dma_bpp ? m_debug_dma_bpp : 8);
	}
	else if (machine().input().code_pressed_once(KEYCODE_G))
	{
		m_debug_dma_bpp--;
		if (m_debug_dma_bpp < 0)
			m_debug_dma_bpp = 0;
		else
			do_blit = true;
		popmessage("DMA BitsPerPixel: %d", m_debug_dma_bpp ? m_debug_dma_bpp : 8);
	}
	else if (machine().input().code_pressed_once(KEYCODE_Y))
	{
		m_debug_dma_mode++;
		if (m_debug_dma_mode > 0x1f)
			m_debug_dma_mode = 0x1f;
		else
			do_blit = true;
		popmessage("DMA Mode: %s (%02x)", mode_strs[m_debug_dma_mode], m_debug_dma_mode);
	}
	else if (machine().input().code_pressed_once(KEYCODE_T))
	{
		m_debug_dma_mode--;
		if (m_debug_dma_mode < 0)
			m_debug_dma_mode = 0;
		else
			do_blit = true;
		popmessage("DMA Mode: %s (%02x)", mode_strs[m_debug_dma_mode], m_debug_dma_mode);
	}
	else if (machine().input().code_pressed_once(KEYCODE_F))
	{
		m_debug_dma_state.yflip = 1 - m_debug_dma_state.yflip;
		do_blit = true;
	}

	if (do_blit)
		do_debug_blit();'};
MERGE (n:KG {id: 'handler:midtunit_video_device.do_debug_blit'}) SET n:Handler SET n += {method: 'do_debug_blit', ownerClass: 'midtunit_video_device', sourceFile: 'src/mame/williams/midtview.ipp', sourceLine: 60, sourceColumn: 1, sourceEndLine: 68, sourceParameters: '', sourceBody: 'm_dma_state = m_debug_dma_state;
	m_debug_dma_command = m_debug_dma_mode * 8 + m_debug_dma_bpp;
	m_doing_debug_dma = true;
	memset(&m_debug_videoram[0], 0, 0x100000);
	((this)->*(m_dma_draw_noskip_noscale[m_debug_dma_command]))();
	m_doing_debug_dma = false;'};
MERGE (n:KG {id: 'device:midtunit_video_device.device_add_mconfig/debugpalette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'debugpalette', clock: null, config: ['PALETTE(config, m_debug_palette).set_format(palette_device::xRGB_555, 32768)'], member: 'm_debug_palette', sourceFile: 'src/mame/williams/midtview.ipp', sourceLine: 48, sourceColumn: 2, sourceEndLine: 48, paletteEntries: 32768};
MERGE (n:KG {id: 'handler:midtunit_video_device.device_start'}) SET n:Handler SET n += {method: 'device_start', ownerClass: 'midtunit_video_device', sourceFile: 'src/mame/williams/midtunit_v.cpp', sourceLine: 191, sourceColumn: 1, sourceEndLine: 222, sourceConstants: ['DEBUG_MIDTUNIT_BLITTER=0'], sourceParameters: '', sourceBody: 'debug_init();

	// allocate memory
	m_local_videoram = std::make_unique<uint16_t[]>(0x100000/2);

#if DEBUG_MIDTUNIT_BLITTER
	m_debug_videoram = std::make_unique<uint16_t[]>(0x100000/2);
#endif

	m_logged_rom.reset();
	m_log_png = false;

	m_dma_timer = timer_alloc(FUNC(midtunit_video_device::dma_done), this);

	// reset all the globals
	memset(&m_dma_state, 0, sizeof(dma_state));
	m_dma_state.gfxrom = &m_gfxrom[0];

	// register for state saving
	save_item(NAME(m_midtunit_control));
	save_item(NAME(m_gfxbank_offset));
	save_pointer(NAME(m_local_videoram), 0x100000/sizeof(m_local_videoram[0]));
	save_item(NAME(m_videobank_select));
	save_item(NAME(m_dma_register));

	INIT_TEMPLATED_DMA_DRAW_GROUP(m_dma_draw_skip_scale,     true,  true);
	INIT_TEMPLATED_DMA_DRAW_GROUP(m_dma_draw_noskip_scale,   false, true);
	INIT_TEMPLATED_DMA_DRAW_GROUP(m_dma_draw_skip_noscale,   true,  false);
	INIT_TEMPLATED_DMA_DRAW_GROUP(m_dma_draw_noskip_noscale, false, false);'};
MERGE (n:KG {id: 'handler:midtunit_video_device.debug_init'}) SET n:Handler SET n += {method: 'debug_init', ownerClass: 'midtunit_video_device', sourceFile: 'src/mame/williams/midtunit_v.cpp', sourceLine: 91, sourceColumn: 1, sourceEndLine: 98, sourceParameters: '', sourceBody: 'if (machine().debug_flags & DEBUG_FLAG_ENABLED)
	{
		using namespace std::placeholders;
		machine().debugger().console().register_command("midblit", CMDFLAG_CUSTOM_HELP, 1, 4, std::bind(&midtunit_video_device::debug_commands, this, _1));
	}'};
MERGE (n:KG {id: 'handler:midtunit_video_device.dma_done'}) SET n:Handler SET n += {method: 'dma_done', ownerClass: 'midtunit_video_device', sourceFile: 'src/mame/williams/midtunit_v.cpp', sourceLine: 626, sourceColumn: 1, sourceEndLine: 630, sourceConstants: ['DMA_COMMAND=1'], sourceParameters: 'int param', sourceBody: 'm_dma_register[DMA_COMMAND] &= ~0x8000; // tell the cpu we\'re done
	m_dma_irq_cb(ASSERT_LINE);'};
MERGE (n:KG {id: 'handler:williams_adpcm_sound_device.device_start'}) SET n:Handler SET n += {method: 'device_start', ownerClass: 'williams_adpcm_sound_device', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 787, sourceColumn: 1, sourceEndLine: 813, sourceParameters: '', sourceBody: '// configure banks
	u8 *rom = memregion("cpu")->base();
	m_rombank->configure_entries(0, 8, &rom[0x10000], 0x8000);
	membank("romupper")->set_base(&rom[0x10000 + 0x4000 + 7 * 0x8000]);

	// expand ADPCM data
	rom = memregion("oki")->base();
	// it is assumed that U12 is loaded @ 0x00000 and U13 is loaded @ 0x40000
	m_okibank->configure_entry(0, &rom[0x40000]);
	m_okibank->configure_entry(1, &rom[0x40000]);
	m_okibank->configure_entry(2, &rom[0x20000]);
	m_okibank->configure_entry(3, &rom[0x00000]);
	m_okibank->configure_entry(4, &rom[0xe0000]);
	m_okibank->configure_entry(5, &rom[0xc0000]);
	m_okibank->configure_entry(6, &rom[0xa0000]);
	m_okibank->configure_entry(7, &rom[0x80000]);

	// register for save states
	save_item(NAME(m_latch));
	save_item(NAME(m_talkback));
	save_item(NAME(m_sound_int_state));

	m_sync_command_timer = timer_alloc(FUNC(williams_adpcm_sound_device::sync_command), this);
	m_irq_clear_timer = timer_alloc(FUNC(williams_adpcm_sound_device::irq_clear), this);'};
MERGE (n:KG {id: 'handler:williams_adpcm_sound_device.sync_command'}) SET n:Handler SET n += {method: 'sync_command', ownerClass: 'williams_adpcm_sound_device', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 837, sourceColumn: 1, sourceEndLine: 846, sourceConstants: ['M6809_IRQ_LINE=0'], sourceParameters: 'int param', sourceBody: 'm_latch = param & 0xff;
	if (!(param & 0x200))
	{
		m_cpu->set_input_line(M6809_IRQ_LINE, ASSERT_LINE);
		m_sound_int_state = 1;
		machine().scheduler().perfect_quantum(attotime::from_usec(100));
	}'};
MERGE (n:KG {id: 'handler:williams_adpcm_sound_device.irq_clear'}) SET n:Handler SET n += {method: 'irq_clear', ownerClass: 'williams_adpcm_sound_device', sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 848, sourceColumn: 1, sourceEndLine: 851, sourceParameters: 'int param', sourceBody: 'm_sound_int_state = 0;'};
MERGE (n:KG {id: 'inputs:nbajam'}) SET n:InputPorts SET n += {name: 'nbajam', sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 390, sourceColumn: 8, sourceEndLine: 390};
MERGE (n:KG {id: 'inputs:nbajam/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:nbajam/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:nbajam/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:nbajam/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:nbajam/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:nbajam/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_NAME("P1 Shoot / Block")', 'PORT_PLAYER(1)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:nbajam/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_NAME("P1 Pass / Steal")', 'PORT_PLAYER(1)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:nbajam/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_NAME("P1 Turbo")', 'PORT_PLAYER(1)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:nbajam/IN0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNUSED', defaultValue: 128};
MERGE (n:KG {id: 'inputs:nbajam/IN0/f8'}) SET n:PortField SET n += {kind: 'bit', mask: 256, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)'], defaultValue: 256};
MERGE (n:KG {id: 'inputs:nbajam/IN0/f9'}) SET n:PortField SET n += {kind: 'bit', mask: 512, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)'], defaultValue: 512};
MERGE (n:KG {id: 'inputs:nbajam/IN0/f10'}) SET n:PortField SET n += {kind: 'bit', mask: 1024, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)'], defaultValue: 1024};
MERGE (n:KG {id: 'inputs:nbajam/IN0/f11'}) SET n:PortField SET n += {kind: 'bit', mask: 2048, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)'], defaultValue: 2048};
MERGE (n:KG {id: 'inputs:nbajam/IN0/f12'}) SET n:PortField SET n += {kind: 'bit', mask: 4096, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_NAME("P2 Shoot / Block")', 'PORT_PLAYER(2)'], defaultValue: 4096};
MERGE (n:KG {id: 'inputs:nbajam/IN0/f13'}) SET n:PortField SET n += {kind: 'bit', mask: 8192, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_NAME("P2 Pass / Steal")', 'PORT_PLAYER(2)'], defaultValue: 8192};
MERGE (n:KG {id: 'inputs:nbajam/IN0/f14'}) SET n:PortField SET n += {kind: 'bit', mask: 16384, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_NAME("P2 Turbo")', 'PORT_PLAYER(2)'], defaultValue: 16384};
MERGE (n:KG {id: 'inputs:nbajam/IN0/f15'}) SET n:PortField SET n += {kind: 'bit', mask: 32768, activeLow: true, type: 'IPT_UNUSED', defaultValue: 32768};
MERGE (n:KG {id: 'inputs:nbajam/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:nbajam/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_COIN1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:nbajam/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_COIN2', defaultValue: 2};
MERGE (n:KG {id: 'inputs:nbajam/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_START1', defaultValue: 4};
MERGE (n:KG {id: 'inputs:nbajam/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_TILT', defaultValue: 8};
MERGE (n:KG {id: 'inputs:nbajam/IN1/f4'}) SET n:PortField SET n += {kind: 'service', mask: 16, activeLow: true, defaultValue: 16};
MERGE (n:KG {id: 'inputs:nbajam/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_START2', defaultValue: 32};
MERGE (n:KG {id: 'inputs:nbajam/IN1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_SERVICE1', defaultValue: 64};
MERGE (n:KG {id: 'inputs:nbajam/IN1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_COIN3', defaultValue: 128};
MERGE (n:KG {id: 'inputs:nbajam/IN1/f8'}) SET n:PortField SET n += {kind: 'bit', mask: 256, activeLow: true, type: 'IPT_COIN4', defaultValue: 256};
MERGE (n:KG {id: 'inputs:nbajam/IN1/f9'}) SET n:PortField SET n += {kind: 'bit', mask: 512, activeLow: true, type: 'IPT_START3', defaultValue: 512};
MERGE (n:KG {id: 'inputs:nbajam/IN1/f10'}) SET n:PortField SET n += {kind: 'bit', mask: 1024, activeLow: true, type: 'IPT_START4', defaultValue: 1024};
MERGE (n:KG {id: 'inputs:nbajam/IN1/f11'}) SET n:PortField SET n += {kind: 'bit', mask: 2048, activeLow: true, type: 'IPT_VOLUME_DOWN', defaultValue: 2048};
MERGE (n:KG {id: 'inputs:nbajam/IN1/f12'}) SET n:PortField SET n += {kind: 'bit', mask: 4096, activeLow: true, type: 'IPT_VOLUME_UP', defaultValue: 4096};
MERGE (n:KG {id: 'inputs:nbajam/IN1/f13'}) SET n:PortField SET n += {kind: 'bit', mask: 57344, activeLow: true, type: 'IPT_UNUSED', defaultValue: 57344};
MERGE (n:KG {id: 'inputs:nbajam/IN2'}) SET n:Port SET n += {tag: 'IN2', modify: false};
MERGE (n:KG {id: 'inputs:nbajam/IN2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_PLAYER(3)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:nbajam/IN2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_PLAYER(3)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:nbajam/IN2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(3)'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:nbajam/IN2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(3)'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:nbajam/IN2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_NAME("P3 Shoot / Block")', 'PORT_PLAYER(3)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:nbajam/IN2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_NAME("P3 Pass / Steal")', 'PORT_PLAYER(3)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:nbajam/IN2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_NAME("P3 Turbo")', 'PORT_PLAYER(3)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:nbajam/IN2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNUSED', defaultValue: 128};
MERGE (n:KG {id: 'inputs:nbajam/IN2/f8'}) SET n:PortField SET n += {kind: 'bit', mask: 256, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_PLAYER(4)'], defaultValue: 256};
MERGE (n:KG {id: 'inputs:nbajam/IN2/f9'}) SET n:PortField SET n += {kind: 'bit', mask: 512, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_PLAYER(4)'], defaultValue: 512};
MERGE (n:KG {id: 'inputs:nbajam/IN2/f10'}) SET n:PortField SET n += {kind: 'bit', mask: 1024, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(4)'], defaultValue: 1024};
MERGE (n:KG {id: 'inputs:nbajam/IN2/f11'}) SET n:PortField SET n += {kind: 'bit', mask: 2048, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(4)'], defaultValue: 2048};
MERGE (n:KG {id: 'inputs:nbajam/IN2/f12'}) SET n:PortField SET n += {kind: 'bit', mask: 4096, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_NAME("P4 Shoot / Block")', 'PORT_PLAYER(4)'], defaultValue: 4096};
MERGE (n:KG {id: 'inputs:nbajam/IN2/f13'}) SET n:PortField SET n += {kind: 'bit', mask: 8192, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_NAME("P4 Pass / Steal")', 'PORT_PLAYER(4)'], defaultValue: 8192};
MERGE (n:KG {id: 'inputs:nbajam/IN2/f14'}) SET n:PortField SET n += {kind: 'bit', mask: 16384, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_NAME("P4 Turbo")', 'PORT_PLAYER(4)'], defaultValue: 16384};
MERGE (n:KG {id: 'inputs:nbajam/IN2/f15'}) SET n:PortField SET n += {kind: 'bit', mask: 32768, activeLow: true, type: 'IPT_UNUSED', defaultValue: 32768};
MERGE (n:KG {id: 'inputs:nbajam/DSW'}) SET n:Port SET n += {tag: 'DSW', modify: false};
MERGE (n:KG {id: 'inputs:nbajam/DSW/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, name: 'Test Switch', defaultValue: 1, settings: ['1=Off', '0=On']};
MERGE (n:KG {id: 'inputs:nbajam/DSW/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, name: 'Powerup Test', defaultValue: 0, settings: ['0=Off', '2=On']};
MERGE (n:KG {id: 'inputs:nbajam/DSW/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 4, name: 'Unused', defaultValue: 4, settings: ['4=Off', '0=On']};
MERGE (n:KG {id: 'inputs:nbajam/DSW/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 8, name: 'Unused', defaultValue: 8, settings: ['8=Off', '0=On']};
MERGE (n:KG {id: 'inputs:nbajam/DSW/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 16, name: 'Unused', defaultValue: 16, settings: ['16=Off', '0=On']};
MERGE (n:KG {id: 'inputs:nbajam/DSW/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 32, name: 'Video Clips', defaultValue: 32, settings: ['0=Off', '32=On']};
MERGE (n:KG {id: 'inputs:nbajam/DSW/f6'}) SET n:PortField SET n += {kind: 'dip', mask: 64, name: 'Dollar Bill Validator', defaultValue: 64, settings: ['0=Installed', '64=Not Present']};
MERGE (n:KG {id: 'inputs:nbajam/DSW/f7'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Players', defaultValue: 128, settings: ['0=2', '128=4']};
MERGE (n:KG {id: 'inputs:nbajam/DSW/f8'}) SET n:PortField SET n += {kind: 'dip', mask: 768, name: 'Coin Counters', defaultValue: 768, settings: ['768=1 Counter, 1 count/coin', '512=1 Counter, Totalizing', '256=2 Counters, 1 count/coin']};
MERGE (n:KG {id: 'inputs:nbajam/DSW/f9'}) SET n:PortField SET n += {kind: 'dip', mask: 3072, name: 'Country', defaultValue: 3072, settings: ['3072=USA', '2048=French', '1024=German']};
MERGE (n:KG {id: 'inputs:nbajam/DSW/f10'}) SET n:PortField SET n += {kind: 'dip', mask: 28672, name: 'Coinage', defaultValue: 28672, settings: ['28672=1', '12288=2', '20480=3', '4096=4', '24576=ECA', '0=Free Play']};
MERGE (n:KG {id: 'inputs:nbajam/DSW/f11'}) SET n:PortField SET n += {kind: 'dip', mask: 32768, name: 'Coinage Source', defaultValue: 0, settings: ['32768=Dipswitch', '0=CMOS']};
MATCH (a:KG {id: 'game:nbajam'}), (b:KG {id: 'file:src/mame/williams/midtunit.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 1832, sourceColumn: 1, sourceEndLine: 1832};
MATCH (a:KG {id: 'game:nbajam'}), (b:KG {id: 'machine:midtunit_adpcm_state.tunit_adpcm'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:nbajam'}), (b:KG {id: 'inputs:nbajam'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:nbajam'}), (b:KG {id: 'romset:nbajam'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'game:nbajam'}), (b:KG {id: 'handler:midtunit_adpcm_state.nbajam_prot_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'game:nbajam'}), (b:KG {id: 'handler:midtunit_adpcm_state.nbajam_prot_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'file:src/mame/williams/midtunit.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/williams/midtunit.cpp'}), (b:KG {id: 'file:midtunit.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/williams/midtunit.cpp'}), (b:KG {id: 'file:machine/nvram.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/williams/midtunit.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/williams/midtunit.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/williams/midtunit.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:midtunit_adpcm_state.tunit_adpcm'}), (b:KG {id: 'file:src/mame/williams/midtunit.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 636, sourceColumn: 1, sourceEndLine: 646};
MATCH (a:KG {id: 'machine:midtunit_adpcm_state.tunit_adpcm'}), (b:KG {id: 'handler:midtunit_adpcm_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:midtunit_adpcm_state.tunit_adpcm'}), (b:KG {id: 'machine:midtunit_base_state.tunit_core'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:midtunit_adpcm_state.tunit_adpcm'}), (b:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/rombank'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:midtunit_adpcm_state.tunit_adpcm'}), (b:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/romupper'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:midtunit_adpcm_state.tunit_adpcm'}), (b:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/okibank/2'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:midtunit_adpcm_state.tunit_adpcm'}), (b:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/okibank/3'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:midtunit_adpcm_state.tunit_adpcm'}), (b:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/okibank/4'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:midtunit_adpcm_state.tunit_adpcm'}), (b:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/okibank/5'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:midtunit_adpcm_state.tunit_adpcm'}), (b:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/okibank/6'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:midtunit_adpcm_state.tunit_adpcm'}), (b:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/okibank/7'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:midtunit_adpcm_state.tunit_adpcm'}), (b:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/okibank/8'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:midtunit_adpcm_state.tunit_adpcm'}), (b:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/okibank/9'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:midtunit_adpcm_state.tunit_adpcm'}), (b:KG {id: 'map:midtunit_adpcm_state.main_adpcm_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:midtunit_adpcm_state.tunit_adpcm'}), (b:KG {id: 'device:midtunit_adpcm_state.tunit_adpcm/speaker'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:midtunit_adpcm_state.tunit_adpcm'}), (b:KG {id: 'device:midtunit_adpcm_state.tunit_adpcm/adpcm'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:nbajam'}), (b:KG {id: 'file:src/mame/williams/midtunit.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 390, sourceColumn: 8, sourceEndLine: 390};
MATCH (a:KG {id: 'inputs:nbajam'}), (b:KG {id: 'inputs:nbajam/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:nbajam'}), (b:KG {id: 'inputs:nbajam/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:nbajam'}), (b:KG {id: 'inputs:nbajam/IN2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:nbajam'}), (b:KG {id: 'inputs:nbajam/DSW'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:nbajam'}), (b:KG {id: 'file:src/mame/williams/midtunit.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 1261, sourceColumn: 1, sourceEndLine: 1261};
MATCH (a:KG {id: 'romset:nbajam'}), (b:KG {id: 'region:nbajam/adpcm:cpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:nbajam'}), (b:KG {id: 'region:nbajam/adpcm:oki'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:nbajam'}), (b:KG {id: 'region:nbajam/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:nbajam'}), (b:KG {id: 'region:nbajam/video'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:midtunit_adpcm_state.machine_reset'}), (b:KG {id: 'handler:williams_adpcm_sound_device.reset_write'}) MERGE (a)-[r:CALLS_HANDLER]->(b) SET r += {finder: 'm_adpcm_sound.reset_write'};
MATCH (a:KG {id: 'machine:midtunit_base_state.tunit_core'}), (b:KG {id: 'file:src/mame/williams/midtunit.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 603, sourceColumn: 1, sourceEndLine: 633};
MATCH (a:KG {id: 'machine:midtunit_base_state.tunit_core'}), (b:KG {id: 'device:midtunit_base_state.tunit_core/video'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:midtunit_base_state.tunit_core'}), (b:KG {id: 'device:midtunit_base_state.tunit_core/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:midtunit_base_state.tunit_core'}), (b:KG {id: 'device:midtunit_base_state.tunit_core/nvram'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:midtunit_base_state.tunit_core'}), (b:KG {id: 'device:midtunit_base_state.tunit_core/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:midtunit_base_state.tunit_core'}), (b:KG {id: 'device:midtunit_base_state.tunit_core/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:midtunit_base_state.tunit_core'}), (b:KG {id: 'device:midtunit_base_state.tunit_core/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/rombank'}), (b:KG {id: 'file:src/mame/shared/williamssound.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 787, sourceColumn: 1, sourceEndLine: 813};
MATCH (a:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/romupper'}), (b:KG {id: 'file:src/mame/shared/williamssound.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 787, sourceColumn: 1, sourceEndLine: 813};
MATCH (a:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/okibank/2'}), (b:KG {id: 'file:src/mame/shared/williamssound.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 787, sourceColumn: 1, sourceEndLine: 813};
MATCH (a:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/okibank/3'}), (b:KG {id: 'file:src/mame/shared/williamssound.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 787, sourceColumn: 1, sourceEndLine: 813};
MATCH (a:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/okibank/4'}), (b:KG {id: 'file:src/mame/shared/williamssound.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 787, sourceColumn: 1, sourceEndLine: 813};
MATCH (a:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/okibank/5'}), (b:KG {id: 'file:src/mame/shared/williamssound.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 787, sourceColumn: 1, sourceEndLine: 813};
MATCH (a:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/okibank/6'}), (b:KG {id: 'file:src/mame/shared/williamssound.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 787, sourceColumn: 1, sourceEndLine: 813};
MATCH (a:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/okibank/7'}), (b:KG {id: 'file:src/mame/shared/williamssound.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 787, sourceColumn: 1, sourceEndLine: 813};
MATCH (a:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/okibank/8'}), (b:KG {id: 'file:src/mame/shared/williamssound.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 787, sourceColumn: 1, sourceEndLine: 813};
MATCH (a:KG {id: 'bank:midtunit_adpcm_state.tunit_adpcm/okibank/9'}), (b:KG {id: 'file:src/mame/shared/williamssound.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 787, sourceColumn: 1, sourceEndLine: 813};
MATCH (a:KG {id: 'map:midtunit_adpcm_state.main_adpcm_map'}), (b:KG {id: 'file:src/mame/williams/midtunit.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 65, sourceColumn: 1, sourceEndLine: 71};
MATCH (a:KG {id: 'map:midtunit_adpcm_state.main_adpcm_map'}), (b:KG {id: 'map:midtunit_base_state.main_map'}) MERGE (a)-[r:INCLUDES_MAP]->(b);
MATCH (a:KG {id: 'map:midtunit_adpcm_state.main_adpcm_map'}), (b:KG {id: 'map:midtunit_adpcm_state.main_adpcm_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midtunit_adpcm_state.main_adpcm_map'}), (b:KG {id: 'map:midtunit_adpcm_state.main_adpcm_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:midtunit_adpcm_state.tunit_adpcm/adpcm'}), (b:KG {id: 'audioroute:device:midtunit_adpcm_state.tunit_adpcm/adpcm/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:midtunit_adpcm_state.tunit_adpcm/adpcm'}), (b:KG {id: 'machine:williams_adpcm_sound_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'device:midtunit_adpcm_state.tunit_adpcm/adpcm'}), (b:KG {id: 'handler:williams_adpcm_sound_device.device_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN0'}), (b:KG {id: 'inputs:nbajam/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN0'}), (b:KG {id: 'inputs:nbajam/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN0'}), (b:KG {id: 'inputs:nbajam/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN0'}), (b:KG {id: 'inputs:nbajam/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN0'}), (b:KG {id: 'inputs:nbajam/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN0'}), (b:KG {id: 'inputs:nbajam/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN0'}), (b:KG {id: 'inputs:nbajam/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN0'}), (b:KG {id: 'inputs:nbajam/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN0'}), (b:KG {id: 'inputs:nbajam/IN0/f8'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN0'}), (b:KG {id: 'inputs:nbajam/IN0/f9'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN0'}), (b:KG {id: 'inputs:nbajam/IN0/f10'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN0'}), (b:KG {id: 'inputs:nbajam/IN0/f11'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN0'}), (b:KG {id: 'inputs:nbajam/IN0/f12'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN0'}), (b:KG {id: 'inputs:nbajam/IN0/f13'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN0'}), (b:KG {id: 'inputs:nbajam/IN0/f14'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN0'}), (b:KG {id: 'inputs:nbajam/IN0/f15'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN1'}), (b:KG {id: 'inputs:nbajam/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN1'}), (b:KG {id: 'inputs:nbajam/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN1'}), (b:KG {id: 'inputs:nbajam/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN1'}), (b:KG {id: 'inputs:nbajam/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN1'}), (b:KG {id: 'inputs:nbajam/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN1'}), (b:KG {id: 'inputs:nbajam/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN1'}), (b:KG {id: 'inputs:nbajam/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN1'}), (b:KG {id: 'inputs:nbajam/IN1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN1'}), (b:KG {id: 'inputs:nbajam/IN1/f8'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN1'}), (b:KG {id: 'inputs:nbajam/IN1/f9'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN1'}), (b:KG {id: 'inputs:nbajam/IN1/f10'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN1'}), (b:KG {id: 'inputs:nbajam/IN1/f11'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN1'}), (b:KG {id: 'inputs:nbajam/IN1/f12'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN1'}), (b:KG {id: 'inputs:nbajam/IN1/f13'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN2'}), (b:KG {id: 'inputs:nbajam/IN2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN2'}), (b:KG {id: 'inputs:nbajam/IN2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN2'}), (b:KG {id: 'inputs:nbajam/IN2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN2'}), (b:KG {id: 'inputs:nbajam/IN2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN2'}), (b:KG {id: 'inputs:nbajam/IN2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN2'}), (b:KG {id: 'inputs:nbajam/IN2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN2'}), (b:KG {id: 'inputs:nbajam/IN2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN2'}), (b:KG {id: 'inputs:nbajam/IN2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN2'}), (b:KG {id: 'inputs:nbajam/IN2/f8'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN2'}), (b:KG {id: 'inputs:nbajam/IN2/f9'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN2'}), (b:KG {id: 'inputs:nbajam/IN2/f10'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN2'}), (b:KG {id: 'inputs:nbajam/IN2/f11'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN2'}), (b:KG {id: 'inputs:nbajam/IN2/f12'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN2'}), (b:KG {id: 'inputs:nbajam/IN2/f13'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN2'}), (b:KG {id: 'inputs:nbajam/IN2/f14'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/IN2'}), (b:KG {id: 'inputs:nbajam/IN2/f15'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/DSW'}), (b:KG {id: 'inputs:nbajam/DSW/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/DSW'}), (b:KG {id: 'inputs:nbajam/DSW/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/DSW'}), (b:KG {id: 'inputs:nbajam/DSW/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/DSW'}), (b:KG {id: 'inputs:nbajam/DSW/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/DSW'}), (b:KG {id: 'inputs:nbajam/DSW/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/DSW'}), (b:KG {id: 'inputs:nbajam/DSW/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/DSW'}), (b:KG {id: 'inputs:nbajam/DSW/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/DSW'}), (b:KG {id: 'inputs:nbajam/DSW/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/DSW'}), (b:KG {id: 'inputs:nbajam/DSW/f8'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/DSW'}), (b:KG {id: 'inputs:nbajam/DSW/f9'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/DSW'}), (b:KG {id: 'inputs:nbajam/DSW/f10'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:nbajam/DSW'}), (b:KG {id: 'inputs:nbajam/DSW/f11'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:nbajam/adpcm:cpu'}), (b:KG {id: 'rom:nbajam/adpcm:cpu/l2_nba_jam_u3_sound_rom.u3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:nbajam/adpcm:oki'}), (b:KG {id: 'rom:nbajam/adpcm:oki/l1_nba_jam_u12_sound_rom.u12'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:nbajam/adpcm:oki'}), (b:KG {id: 'rom:nbajam/adpcm:oki/l1_nba_jam_u13_sound_rom.u13'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:nbajam/maincpu'}), (b:KG {id: 'rom:nbajam/maincpu/l3_nba_jam_game_rom_uj12.uj12'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:nbajam/maincpu'}), (b:KG {id: 'rom:nbajam/maincpu/l3_nba_jam_game_rom_ug12.ug12'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:nbajam/video'}), (b:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_ug14.ug14'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:nbajam/video'}), (b:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_uj14.uj14'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:nbajam/video'}), (b:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_ug19.ug19'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:nbajam/video'}), (b:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_uj19.uj19'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:nbajam/video'}), (b:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_ug16.ug16'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:nbajam/video'}), (b:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_uj16.uj16'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:nbajam/video'}), (b:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_ug20.ug20'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:nbajam/video'}), (b:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_uj20.uj20'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:nbajam/video'}), (b:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_ug17.ug17'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:nbajam/video'}), (b:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_uj17.uj17'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:nbajam/video'}), (b:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_ug22.ug22'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:nbajam/video'}), (b:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_uj22.uj22'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:nbajam/video'}), (b:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_ug18.ug18'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:nbajam/video'}), (b:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_uj18.uj18'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:nbajam/video'}), (b:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_ug23.ug23'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:nbajam/video'}), (b:KG {id: 'rom:nbajam/video/l1_nba_jam_game_rom_uj23.uj23'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'handler:williams_adpcm_sound_device.reset_write'}), (b:KG {id: 'handler:williams_adpcm_sound_device.bank_select_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:williams_adpcm_sound_device.reset_write'}), (b:KG {id: 'handler:williams_adpcm_sound_device.device_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:midtunit_base_state.tunit_core/video'}), (b:KG {id: 'device:midtunit_base_state.tunit_core/video/callback:video:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:midtunit_base_state.tunit_core/video'}), (b:KG {id: 'machine:midtunit_video_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'device:midtunit_base_state.tunit_core/video'}), (b:KG {id: 'handler:midtunit_video_device.device_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:midtunit_base_state.tunit_core/maincpu'}), (b:KG {id: 'device:midtunit_base_state.tunit_core/maincpu/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:midtunit_base_state.tunit_core/maincpu'}), (b:KG {id: 'device:midtunit_base_state.tunit_core/maincpu/callback:maincpu:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:midtunit_base_state.tunit_core/maincpu'}), (b:KG {id: 'device:midtunit_base_state.tunit_core/maincpu/callback:maincpu:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:midtunit_base_state.tunit_core/screen'}), (b:KG {id: 'device:midtunit_base_state.tunit_core/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/williamssound.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/williamssound.cpp'}), (b:KG {id: 'file:williamssound.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/williamssound.cpp'}), (b:KG {id: 'file:machine/6821pia.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/williamssound.cpp'}), (b:KG {id: 'file:machine/rescap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/williamssound.cpp'}), (b:KG {id: 'file:cpu/m6809/m6809.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/williamssound.cpp'}), (b:KG {id: 'file:cpu/m6800/m6800.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/williamssound.cpp'}), (b:KG {id: 'file:sound/dac.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/williamssound.cpp'}), (b:KG {id: 'file:sound/hc55516.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/williamssound.cpp'}), (b:KG {id: 'file:sound/okim6295.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/shared/williamssound.cpp'}), (b:KG {id: 'file:sound/ymopm.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'map:midtunit_base_state.main_map'}), (b:KG {id: 'file:src/mame/williams/midtunit.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/williams/midtunit.cpp', sourceLine: 43, sourceColumn: 1, sourceEndLine: 63};
MATCH (a:KG {id: 'map:midtunit_base_state.main_map'}), (b:KG {id: 'map:midtunit_base_state.main_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midtunit_base_state.main_map'}), (b:KG {id: 'map:midtunit_base_state.main_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midtunit_base_state.main_map'}), (b:KG {id: 'map:midtunit_base_state.main_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midtunit_base_state.main_map'}), (b:KG {id: 'map:midtunit_base_state.main_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midtunit_base_state.main_map'}), (b:KG {id: 'map:midtunit_base_state.main_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midtunit_base_state.main_map'}), (b:KG {id: 'map:midtunit_base_state.main_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midtunit_base_state.main_map'}), (b:KG {id: 'map:midtunit_base_state.main_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midtunit_base_state.main_map'}), (b:KG {id: 'map:midtunit_base_state.main_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midtunit_base_state.main_map'}), (b:KG {id: 'map:midtunit_base_state.main_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midtunit_base_state.main_map'}), (b:KG {id: 'map:midtunit_base_state.main_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midtunit_base_state.main_map'}), (b:KG {id: 'map:midtunit_base_state.main_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midtunit_base_state.main_map'}), (b:KG {id: 'map:midtunit_base_state.main_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midtunit_base_state.main_map'}), (b:KG {id: 'map:midtunit_base_state.main_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midtunit_base_state.main_map'}), (b:KG {id: 'map:midtunit_base_state.main_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midtunit_base_state.main_map'}), (b:KG {id: 'map:midtunit_base_state.main_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midtunit_base_state.main_map'}), (b:KG {id: 'map:midtunit_base_state.main_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:midtunit_adpcm_state.main_adpcm_map/range0'}), (b:KG {id: 'handler:midtunit_adpcm_state.sound_state_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:midtunit_adpcm_state.main_adpcm_map/range1'}), (b:KG {id: 'handler:midtunit_adpcm_state.sound_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:midtunit_adpcm_state.main_adpcm_map/range1'}), (b:KG {id: 'handler:midtunit_adpcm_state.sound_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'machine:williams_adpcm_sound_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/shared/williamssound.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 766, sourceColumn: 1, sourceEndLine: 780};
MATCH (a:KG {id: 'machine:williams_adpcm_sound_device.device_add_mconfig'}), (b:KG {id: 'device:williams_adpcm_sound_device.device_add_mconfig/cpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:williams_adpcm_sound_device.device_add_mconfig'}), (b:KG {id: 'device:williams_adpcm_sound_device.device_add_mconfig/ym2151'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:williams_adpcm_sound_device.device_add_mconfig'}), (b:KG {id: 'device:williams_adpcm_sound_device.device_add_mconfig/dac'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:williams_adpcm_sound_device.device_add_mconfig'}), (b:KG {id: 'device:williams_adpcm_sound_device.device_add_mconfig/oki'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'handler:williams_adpcm_sound_device.device_start'}), (b:KG {id: 'handler:williams_adpcm_sound_device.sync_command'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:williams_adpcm_sound_device.device_start'}), (b:KG {id: 'handler:williams_adpcm_sound_device.irq_clear'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:midtunit_video_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/williams/midtview.ipp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/williams/midtview.ipp', sourceLine: 42, sourceColumn: 1, sourceEndLine: 49};
MATCH (a:KG {id: 'machine:midtunit_video_device.device_add_mconfig'}), (b:KG {id: 'device:midtunit_video_device.device_add_mconfig/debugscreen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:midtunit_video_device.device_add_mconfig'}), (b:KG {id: 'device:midtunit_video_device.device_add_mconfig/debugpalette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'handler:midtunit_video_device.device_start'}), (b:KG {id: 'handler:midtunit_video_device.debug_init'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:midtunit_video_device.device_start'}), (b:KG {id: 'handler:midtunit_video_device.dma_done'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:midtunit_base_state.tunit_core/maincpu/callback:maincpu:0'}), (b:KG {id: 'handler:midtunit_video_device.scanline_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:midtunit_base_state.tunit_core/maincpu/callback:maincpu:0'}), (b:KG {id: 'device:midtunit_base_state.tunit_core/video'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:midtunit_base_state.tunit_core/maincpu/callback:maincpu:1'}), (b:KG {id: 'handler:midtunit_video_device.to_shiftreg'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:midtunit_base_state.tunit_core/maincpu/callback:maincpu:1'}), (b:KG {id: 'device:midtunit_base_state.tunit_core/video'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:midtunit_base_state.tunit_core/maincpu/callback:maincpu:2'}), (b:KG {id: 'handler:midtunit_video_device.from_shiftreg'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:midtunit_base_state.tunit_core/maincpu/callback:maincpu:2'}), (b:KG {id: 'device:midtunit_base_state.tunit_core/video'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:midtunit_base_state.tunit_core/screen/callback:screen:0'}), (b:KG {id: 'handler:tms34010_device.tms340x0_ind16'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:midtunit_base_state.tunit_core/screen/callback:screen:0'}), (b:KG {id: 'device:midtunit_base_state.tunit_core/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'map:midtunit_base_state.main_map/range0'}), (b:KG {id: 'handler:midtunit_video_device.midtunit_vram_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'video'};
MATCH (a:KG {id: 'map:midtunit_base_state.main_map/range0'}), (b:KG {id: 'handler:midtunit_video_device.midtunit_vram_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'video'};
MATCH (a:KG {id: 'map:midtunit_base_state.main_map/range2'}), (b:KG {id: 'handler:midtunit_base_state.cmos_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:midtunit_base_state.main_map/range2'}), (b:KG {id: 'handler:midtunit_base_state.cmos_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:midtunit_base_state.main_map/range3'}), (b:KG {id: 'handler:midtunit_base_state.cmos_enable_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:midtunit_base_state.main_map/range8'}), (b:KG {id: 'handler:palette_device.write16'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'palette'};
MATCH (a:KG {id: 'map:midtunit_base_state.main_map/range9'}), (b:KG {id: 'handler:midtunit_video_device.dma_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'video'};
MATCH (a:KG {id: 'map:midtunit_base_state.main_map/range9'}), (b:KG {id: 'handler:midtunit_video_device.dma_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'video'};
MATCH (a:KG {id: 'map:midtunit_base_state.main_map/range10'}), (b:KG {id: 'handler:midtunit_video_device.midtunit_control_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'video'};
MATCH (a:KG {id: 'map:midtunit_base_state.main_map/range11'}), (b:KG {id: 'handler:watchdog_timer_device.reset16_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:midtunit_base_state.main_map/range12'}), (b:KG {id: 'handler:midtunit_video_device.midtunit_control_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'video'};
MATCH (a:KG {id: 'map:midtunit_base_state.main_map/range13'}), (b:KG {id: 'handler:midtunit_video_device.midtunit_gfxrom_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'video'};
MATCH (a:KG {id: 'handler:midtunit_adpcm_state.sound_w'}), (b:KG {id: 'handler:williams_adpcm_sound_device.reset_write'}) MERGE (a)-[r:CALLS_HANDLER]->(b) SET r += {finder: 'm_adpcm_sound.reset_write'};
MATCH (a:KG {id: 'handler:midtunit_adpcm_state.sound_w'}), (b:KG {id: 'handler:williams_adpcm_sound_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b) SET r += {finder: 'm_adpcm_sound.write'};
MATCH (a:KG {id: 'device:williams_adpcm_sound_device.device_add_mconfig/cpu'}), (b:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:williams_adpcm_sound_device.device_add_mconfig/ym2151'}), (b:KG {id: 'audioroute:device:williams_adpcm_sound_device.device_add_mconfig/ym2151/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:williams_adpcm_sound_device.device_add_mconfig/ym2151'}), (b:KG {id: 'device:williams_adpcm_sound_device.device_add_mconfig/ym2151/callback:ym2151:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:williams_adpcm_sound_device.device_add_mconfig/dac'}), (b:KG {id: 'audioroute:device:williams_adpcm_sound_device.device_add_mconfig/dac/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:williams_adpcm_sound_device.device_add_mconfig/oki'}), (b:KG {id: 'audioroute:device:williams_adpcm_sound_device.device_add_mconfig/oki/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:williams_adpcm_sound_device.device_add_mconfig/oki'}), (b:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_oki_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: '0'};
MATCH (a:KG {id: 'device:midtunit_video_device.device_add_mconfig/debugscreen'}), (b:KG {id: 'device:midtunit_video_device.device_add_mconfig/debugscreen/callback:debugscreen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'handler:midtunit_video_device.dma_w'}), (b:KG {id: 'handler:midtunit_video_device.log_bitmap'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map'}), (b:KG {id: 'file:src/mame/shared/williamssound.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 736, sourceColumn: 1, sourceEndLine: 748};
MATCH (a:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map'}), (b:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map'}), (b:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map'}), (b:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map'}), (b:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map'}), (b:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map'}), (b:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map'}), (b:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map'}), (b:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map'}), (b:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map'}), (b:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:williams_adpcm_sound_device.device_add_mconfig/ym2151/callback:ym2151:0'}), (b:KG {id: 'device:williams_adpcm_sound_device.device_add_mconfig/cpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_oki_map'}), (b:KG {id: 'file:src/mame/shared/williamssound.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/shared/williamssound.cpp', sourceLine: 755, sourceColumn: 1, sourceEndLine: 759};
MATCH (a:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_oki_map'}), (b:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_oki_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_oki_map'}), (b:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_oki_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:midtunit_video_device.device_add_mconfig/debugscreen/callback:debugscreen:0'}), (b:KG {id: 'handler:midtunit_video_device.debug_screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range1'}), (b:KG {id: 'handler:williams_adpcm_sound_device.bank_select_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range2'}), (b:KG {id: 'handler:ym2151_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'ym2151'};
MATCH (a:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range2'}), (b:KG {id: 'handler:ym2151_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'ym2151'};
MATCH (a:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range3'}), (b:KG {id: 'handler:dac_byte_interface.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'dac'};
MATCH (a:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range4'}), (b:KG {id: 'handler:okim6295_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'oki'};
MATCH (a:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range4'}), (b:KG {id: 'handler:okim6295_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'oki'};
MATCH (a:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range5'}), (b:KG {id: 'handler:williams_adpcm_sound_device.command_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range6'}), (b:KG {id: 'handler:williams_adpcm_sound_device.oki6295_bank_select_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:williams_adpcm_sound_device.williams_adpcm_map/range7'}), (b:KG {id: 'handler:williams_adpcm_sound_device.talkback_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:midtunit_video_device.debug_screen_update'}), (b:KG {id: 'handler:midtunit_video_device.do_dma_debug_inputs'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:midtunit_video_device.do_dma_debug_inputs'}), (b:KG {id: 'handler:midtunit_video_device.do_debug_blit'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
