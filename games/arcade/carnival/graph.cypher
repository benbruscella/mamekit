// mamekit knowledge graph — driver src/mame/sega/vicdual.cpp
// generated 2026-09-05T03:49:19.304Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/sega/vicdual.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/sega/vicdual.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:vicdual.h'}) SET n:SourceFile SET n += {path: 'vicdual.h', external: true};
MERGE (n:KG {id: 'file:vicdual-97271p.h'}) SET n:SourceFile SET n += {path: 'vicdual-97271p.h', external: true};
MERGE (n:KG {id: 'file:vicdual-97269pb.h'}) SET n:SourceFile SET n += {path: 'vicdual-97269pb.h', external: true};
MERGE (n:KG {id: 'file:cpu/i8085/i8085.h'}) SET n:SourceFile SET n += {path: 'cpu/i8085/i8085.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:depthch.lh'}) SET n:SourceFile SET n += {path: 'depthch.lh', external: true};
MERGE (n:KG {id: 'game:carnival'}) SET n:Game SET n += {name: 'carnival', year: '1980', company: 'Sega', fullname: 'Carnival (upright, AY8912 music)', monitor: 'ROT270', cls: 'carnival_state', init: 'empty_init', flags: 'MACHINE_IMPERFECT_SOUND | MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 5326, sourceColumn: 1, sourceEndLine: 5326};
MERGE (n:KG {id: 'romset:carnival'}) SET n:RomSet SET n += {name: 'carnival', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 4678, sourceColumn: 1, sourceEndLine: 4678};
MERGE (n:KG {id: 'region:carnival/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 3773, sourceColumn: 2, sourceEndLine: 3773};
MERGE (n:KG {id: 'rom:carnival/maincpu/epr-651.u33'}) SET n:Rom SET n += {file: 'epr-651.u33', offset: 0, size: 1024, crc: '9f2736e6', sha1: 'c3fb9197b5e83dc7d5335de2268e0acb30cf8328', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 4680, sourceColumn: 2, sourceEndLine: 4680};
MERGE (n:KG {id: 'rom:carnival/maincpu/epr-652.u32'}) SET n:Rom SET n += {file: 'epr-652.u32', offset: 1024, size: 1024, crc: 'a1f58beb', sha1: 'e027beca7bf3ef5ef67e2195f909332fd194b5dc', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 4681, sourceColumn: 2, sourceEndLine: 4681};
MERGE (n:KG {id: 'rom:carnival/maincpu/epr-653.u31'}) SET n:Rom SET n += {file: 'epr-653.u31', offset: 2048, size: 1024, crc: '67b17922', sha1: '46cdfd0371dec61a5440c2111660729c0f0ecdb8', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 4682, sourceColumn: 2, sourceEndLine: 4682};
MERGE (n:KG {id: 'rom:carnival/maincpu/epr-654.u30'}) SET n:Rom SET n += {file: 'epr-654.u30', offset: 3072, size: 1024, crc: 'befb09a5', sha1: 'da44b6a869b5eb0705e01fee4478696f6bef9de8', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 4683, sourceColumn: 2, sourceEndLine: 4683};
MERGE (n:KG {id: 'rom:carnival/maincpu/epr-655.u29'}) SET n:Rom SET n += {file: 'epr-655.u29', offset: 4096, size: 1024, crc: '623fcdad', sha1: '35890964f5cf799c141002916641089ccec0fcc9', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 4684, sourceColumn: 2, sourceEndLine: 4684};
MERGE (n:KG {id: 'rom:carnival/maincpu/epr-656.u28'}) SET n:Rom SET n += {file: 'epr-656.u28', offset: 5120, size: 1024, crc: '53040332', sha1: 'ff7a06d93cb890abf0616770774668396d128ba3', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 4685, sourceColumn: 2, sourceEndLine: 4685};
MERGE (n:KG {id: 'rom:carnival/maincpu/epr-657.u27'}) SET n:Rom SET n += {file: 'epr-657.u27', offset: 6144, size: 1024, crc: 'f2537467', sha1: '262b859098f4f7e5e9bf2f83bda833044824226e', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 4686, sourceColumn: 2, sourceEndLine: 4686};
MERGE (n:KG {id: 'rom:carnival/maincpu/epr-658.u26'}) SET n:Rom SET n += {file: 'epr-658.u26', offset: 7168, size: 1024, crc: 'fcc3854e', sha1: '7adbd6ca6f636dec75fa6eccdf3381686e074bc6', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 4687, sourceColumn: 2, sourceEndLine: 4687};
MERGE (n:KG {id: 'rom:carnival/maincpu/epr-659.u8'}) SET n:Rom SET n += {file: 'epr-659.u8', offset: 8192, size: 1024, crc: '28be8d69', sha1: '2d9ac9a53f00fe2282e4317585e6bddadb676c0f', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 4688, sourceColumn: 2, sourceEndLine: 4688};
MERGE (n:KG {id: 'rom:carnival/maincpu/epr-660.u7'}) SET n:Rom SET n += {file: 'epr-660.u7', offset: 9216, size: 1024, crc: '3873ccdb', sha1: '56be81fdee8947758ba966915c0739e5560a7f94', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 4689, sourceColumn: 2, sourceEndLine: 4689};
MERGE (n:KG {id: 'rom:carnival/maincpu/epr-661.u6'}) SET n:Rom SET n += {file: 'epr-661.u6', offset: 10240, size: 1024, crc: 'd9a96dff', sha1: '0366acf3418901bfeeda59d4cd51fe8ceaad4577', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 4690, sourceColumn: 2, sourceEndLine: 4690};
MERGE (n:KG {id: 'rom:carnival/maincpu/epr-662.u5'}) SET n:Rom SET n += {file: 'epr-662.u5', offset: 11264, size: 1024, crc: 'd893ca72', sha1: '564176ab7f3757d51db8eef9fbc4228fa2ce328f', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 4691, sourceColumn: 2, sourceEndLine: 4691};
MERGE (n:KG {id: 'rom:carnival/maincpu/epr-663.u4'}) SET n:Rom SET n += {file: 'epr-663.u4', offset: 12288, size: 1024, crc: 'df8c63c5', sha1: 'e8d0632b5cb5bd7f698485531f3edeb13efdc685', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 4692, sourceColumn: 2, sourceEndLine: 4692};
MERGE (n:KG {id: 'rom:carnival/maincpu/epr-664.u3'}) SET n:Rom SET n += {file: 'epr-664.u3', offset: 13312, size: 1024, crc: '689a73e8', sha1: 'b4134e8d892df7ba3352e4d3f581923decae6e54', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 4693, sourceColumn: 2, sourceEndLine: 4693};
MERGE (n:KG {id: 'rom:carnival/maincpu/epr-665.u2'}) SET n:Rom SET n += {file: 'epr-665.u2', offset: 14336, size: 1024, crc: '28e7b2b6', sha1: '57eb5dd0f11da8ff8001e76036264246d6bc27d2', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 4694, sourceColumn: 2, sourceEndLine: 4694};
MERGE (n:KG {id: 'rom:carnival/maincpu/epr-666.u1'}) SET n:Rom SET n += {file: 'epr-666.u1', offset: 15360, size: 1024, crc: '4eec7fae', sha1: 'cdc858165136c55b01511805c9d4dc6bc598fe1f', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 4695, sourceColumn: 2, sourceEndLine: 4695};
MERGE (n:KG {id: 'region:carnival/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 32, flags: '0', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 3933, sourceColumn: 2, sourceEndLine: 3933};
MERGE (n:KG {id: 'rom:carnival/proms/316-0633.u49'}) SET n:Rom SET n += {file: '316-0633.u49', offset: 0, size: 32, crc: 'f0084d80', sha1: '95ec912ac2c64cd58a50c68afc0993746841a531', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 4698, sourceColumn: 2, sourceEndLine: 4698};
MERGE (n:KG {id: 'region:carnival/audiocpu'}) SET n:RomRegion SET n += {tag: 'audiocpu', size: 1024, flags: '0', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 4700, sourceColumn: 2, sourceEndLine: 4700};
MERGE (n:KG {id: 'rom:carnival/audiocpu/epr-412.u5'}) SET n:Rom SET n += {file: 'epr-412.u5', offset: 0, size: 1024, crc: '0dbaa2b0', sha1: 'eae7fc362a0ff8f908c42e093c7dbb603659373c', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 4701, sourceColumn: 2, sourceEndLine: 4701};
MERGE (n:KG {id: 'region:carnival/user1'}) SET n:RomRegion SET n += {tag: 'user1', size: 32, flags: '0', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 3781, sourceColumn: 2, sourceEndLine: 3781};
MERGE (n:KG {id: 'rom:carnival/user1/316-0206.u14'}) SET n:Rom SET n += {file: '316-0206.u14', offset: 0, size: 32, crc: '9617d796', sha1: '7cff2741866095ff42eadd8022bea349ec8d2f39', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 4375, sourceColumn: 2, sourceEndLine: 4375};
MERGE (n:KG {id: 'map:carnival_state.mboard_map'}) SET n:AddressMap SET n += {cls: 'carnival_state', name: 'mboard_map', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 241, sourceColumn: 1, sourceEndLine: 244};
MERGE (n:KG {id: 'map:carnival_state.mboard_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 1023, raw: 'map(0x0000, 0x03ff).rom()', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 243, sourceColumn: 2, sourceEndLine: 243, rom: true};
MERGE (n:KG {id: 'handler:vicdual_state.videoram_w'}) SET n:Handler SET n += {method: 'videoram_w', ownerClass: 'vicdual_state', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 849, sourceColumn: 1, sourceEndLine: 854, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '//  m_screen->update_now();
	m_screen->update_partial(m_screen->vpos());
	m_videoram[offset] = data;'};
MERGE (n:KG {id: 'handler:vicdual_state.characterram_w'}) SET n:Handler SET n += {method: 'characterram_w', ownerClass: 'vicdual_state', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 857, sourceColumn: 1, sourceEndLine: 862, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: '//  m_screen->update_now();
	m_screen->update_partial(m_screen->vpos());
	m_characterram[offset] = data;'};
MERGE (n:KG {id: 'handler:vicdual_state.assert_coin_status'}) SET n:Handler SET n += {method: 'assert_coin_status', ownerClass: 'vicdual_state', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 714, sourceColumn: 1, sourceEndLine: 717, sourceParameters: '', sourceBody: 'm_coin_status = 1;'};
MERGE (n:KG {id: 'handler:vicdual_state.palette_bank_w'}) SET n:Handler SET n += {method: 'palette_bank_w', ownerClass: 'vicdual_state', sourceFile: 'src/mame/sega/vicdual_v.cpp', sourceLine: 26, sourceColumn: 1, sourceEndLine: 30, sourceParameters: 'uint8_t data', sourceBody: 'm_screen->update_partial(m_screen->vpos());
	m_palette_bank = data & 3;'};
MERGE (n:KG {id: 'map:vicdual_state.vicdual_dualgame_map'}) SET n:AddressMap SET n += {cls: 'vicdual_state', name: 'vicdual_dualgame_map', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 1924, sourceColumn: 1, sourceEndLine: 1930};
MERGE (n:KG {id: 'map:vicdual_state.vicdual_dualgame_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 16383, raw: 'map(0x0000, 0x3fff).mirror(0x4000).rom()', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 1926, sourceColumn: 2, sourceEndLine: 1926, mirror: 16384, rom: true};
MERGE (n:KG {id: 'map:vicdual_state.vicdual_dualgame_map/range1'}) SET n:AddressRange SET n += {start: 32768, end: 33791, raw: 'map(0x8000, 0x83ff).mirror(0x7000).ram().w(FUNC(vicdual_state::videoram_w)).share("videoram")', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 1927, sourceColumn: 2, sourceEndLine: 1927, mirror: 28672, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'map:vicdual_state.vicdual_dualgame_map/range2'}) SET n:AddressRange SET n += {start: 33792, end: 34815, raw: 'map(0x8400, 0x87ff).mirror(0x7000).ram()', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 1928, sourceColumn: 2, sourceEndLine: 1928, mirror: 28672, ram: true};
MERGE (n:KG {id: 'map:vicdual_state.vicdual_dualgame_map/range3'}) SET n:AddressRange SET n += {start: 34816, end: 36863, raw: 'map(0x8800, 0x8fff).mirror(0x7000).ram().w(FUNC(vicdual_state::characterram_w)).share("characterram")', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 1929, sourceColumn: 2, sourceEndLine: 1929, mirror: 28672, ram: true, share: 'characterram'};
MERGE (n:KG {id: 'map:carnival_state.carnival_io_map'}) SET n:AddressMap SET n += {cls: 'carnival_state', name: 'carnival_io_map', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 2120, sourceColumn: 1, sourceEndLine: 2131, globalMask: 127};
MERGE (n:KG {id: 'map:carnival_state.carnival_io_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 0, raw: 'map(0x00, 0x00).mirror(0x7c).portr("IN0")', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 2124, sourceColumn: 2, sourceEndLine: 2124, mirror: 124, portRead: 'IN0'};
MERGE (n:KG {id: 'map:carnival_state.carnival_io_map/range1'}) SET n:AddressRange SET n += {start: 1, end: 1, raw: 'map(0x01, 0x01).mirror(0x7c).portr("IN1")', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 2125, sourceColumn: 2, sourceEndLine: 2125, mirror: 124, portRead: 'IN1'};
MERGE (n:KG {id: 'map:carnival_state.carnival_io_map/range2'}) SET n:AddressRange SET n += {start: 2, end: 2, raw: 'map(0x02, 0x02).mirror(0x7c).portr("IN2")', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 2126, sourceColumn: 2, sourceEndLine: 2126, mirror: 124, portRead: 'IN2'};
MERGE (n:KG {id: 'map:carnival_state.carnival_io_map/range3'}) SET n:AddressRange SET n += {start: 3, end: 3, raw: 'map(0x03, 0x03).mirror(0x7c).portr("IN3")', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 2127, sourceColumn: 2, sourceEndLine: 2127, mirror: 124, portRead: 'IN3'};
MERGE (n:KG {id: 'map:carnival_state.carnival_io_map/range4'}) SET n:AddressRange SET n += {start: 0, end: 127, raw: 'map(0x00, 0x7f).w(FUNC(carnival_state::carnival_io_w))', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 2130, sourceColumn: 2, sourceEndLine: 2130};
MERGE (n:KG {id: 'handler:carnival_state.carnival_io_w'}) SET n:Handler SET n += {method: 'carnival_io_w', ownerClass: 'carnival_state', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 1866, sourceColumn: 1, sourceEndLine: 1872, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'if (offset & 0x01) carnival_audio_1_w(data);
	if (offset & 0x02) carnival_audio_2_w(data);
	if (offset & 0x08) assert_coin_status();
	if (offset & 0x40) palette_bank_w(data);'};
MERGE (n:KG {id: 'handler:carnival_state.carnival_audio_1_w'}) SET n:Handler SET n += {method: 'carnival_audio_1_w', ownerClass: 'carnival_state', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 145, sourceColumn: 1, sourceEndLine: 208, sourceConstants: ['OUT_CARNIVAL_PORT_1_RIFLE=1', 'OUT_CARNIVAL_PORT_1_CLANG=2', 'OUT_CARNIVAL_PORT_1_DUCK1=4', 'OUT_CARNIVAL_PORT_1_DUCK2=8', 'OUT_CARNIVAL_PORT_1_DUCK3=16', 'OUT_CARNIVAL_PORT_1_PIPEHIT=32', 'OUT_CARNIVAL_PORT_1_BONUS1=64', 'OUT_CARNIVAL_PORT_1_BONUS2=128', 'SND_CARNIVAL_BONUS1=1', 'SND_CARNIVAL_BONUS2=2', 'SND_CARNIVAL_CLANG=3', 'SND_CARNIVAL_DUCK1=4', 'SND_CARNIVAL_DUCK2=5', 'SND_CARNIVAL_DUCK3=6', 'SND_CARNIVAL_PIPEHIT=7', 'SND_CARNIVAL_RIFLE=9'], sourceParameters: 'uint8_t data', sourceBody: 'int bitsChanged;
	int bitsGoneHigh;
	int bitsGoneLow;

	bitsChanged  = m_port1State ^ data;
	bitsGoneHigh = bitsChanged & data;
	bitsGoneLow  = bitsChanged & ~data;

	m_port1State = data;

	if (bitsGoneLow & OUT_CARNIVAL_PORT_1_RIFLE)
	{
		PLAY(m_samples, SND_CARNIVAL_RIFLE, 0);
	}

	if (bitsGoneLow & OUT_CARNIVAL_PORT_1_CLANG)
	{
		PLAY(m_samples, SND_CARNIVAL_CLANG, 0);
	}

	if (bitsGoneLow & OUT_CARNIVAL_PORT_1_DUCK1)
	{
		PLAY(m_samples, SND_CARNIVAL_DUCK1, 1);
	}
	if (bitsGoneHigh & OUT_CARNIVAL_PORT_1_DUCK1)
	{
		STOP(m_samples, SND_CARNIVAL_DUCK1);
	}

	if (bitsGoneLow & OUT_CARNIVAL_PORT_1_DUCK2)
	{
		PLAY(m_samples, SND_CARNIVAL_DUCK2, 1);
	}
	if (bitsGoneHigh & OUT_CARNIVAL_PORT_1_DUCK2)
	{
		STOP(m_samples, SND_CARNIVAL_DUCK2);
	}

	if (bitsGoneLow & OUT_CARNIVAL_PORT_1_DUCK3)
	{
		PLAY(m_samples, SND_CARNIVAL_DUCK3, 1);
	}
	if (bitsGoneHigh & OUT_CARNIVAL_PORT_1_DUCK3)
	{
		STOP(m_samples, SND_CARNIVAL_DUCK3);
	}

	if (bitsGoneLow & OUT_CARNIVAL_PORT_1_PIPEHIT)
	{
		PLAY(m_samples, SND_CARNIVAL_PIPEHIT, 0);
	}

	if (bitsGoneLow & OUT_CARNIVAL_PORT_1_BONUS1)
	{
		PLAY(m_samples, SND_CARNIVAL_BONUS1, 0);
	}

	if (bitsGoneLow & OUT_CARNIVAL_PORT_1_BONUS2)
	{
		PLAY(m_samples, SND_CARNIVAL_BONUS2, 0);
	}'};
MERGE (n:KG {id: 'handler:carnival_state.carnival_audio_2_w'}) SET n:Handler SET n += {method: 'carnival_audio_2_w', ownerClass: 'carnival_state', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 210, sourceColumn: 1, sourceEndLine: 234, sourceConstants: ['OUT_CARNIVAL_PORT_2_BEAR=4', 'OUT_CARNIVAL_PORT_2_RANKING=32', 'SND_CARNIVAL_BEAR=0', 'SND_CARNIVAL_RANKING=8'], sourceParameters: 'uint8_t data', sourceBody: 'int bitsChanged;
	//int bitsGoneHigh;
	int bitsGoneLow;

	bitsChanged  = m_port2State ^ data;
	//bitsGoneHigh = bitsChanged & data;
	bitsGoneLow  = bitsChanged & ~data;

	m_port2State = data;

	if (bitsGoneLow & OUT_CARNIVAL_PORT_2_BEAR)
	{
		PLAY(m_samples, SND_CARNIVAL_BEAR, 0);
	}

	if (bitsGoneLow & OUT_CARNIVAL_PORT_2_RANKING)
	{
		PLAY(m_samples, SND_CARNIVAL_RANKING, 0);
	}

	// d4: music board MCU reset
	m_audiocpu->set_input_line(INPUT_LINE_RESET, (data & 0x10) ? CLEAR_LINE : ASSERT_LINE);'};
MERGE (n:KG {id: 'machine:carnival_state.carnivala_audio'}) SET n:MachineConfig SET n += {cls: 'carnival_state', name: 'carnivala_audio', calls: [], stateMembers: ['{"name":"m_coin_status","bits":8}', '{"name":"m_palette_bank","bits":8}', '{"name":"m_samurai_protection_data","bits":8}', '{"name":"m_port1State","bits":32,"signed":true}', '{"name":"m_port2State","bits":32,"signed":true}', '{"name":"m_musicdata","bits":32,"signed":true}', '{"name":"m_musicbus","bits":32,"signed":true}'], sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 282, sourceColumn: 1, sourceEndLine: 298};
MERGE (n:KG {id: 'device:carnival_state.carnivala_audio/audiocpu'}) SET n:Device SET n += {type: 'I8035', tag: 'audiocpu', clock: 3579545, config: ['I8035(config, m_audiocpu, XTAL(3\'579\'545))', 'm_audiocpu->set_addrmap(AS_PROGRAM, &carnival_state::mboard_map)', 'm_audiocpu->p1_out_cb().set(FUNC(carnival_state::carnivala_music_port_1_w))', 'm_audiocpu->p2_out_cb().set(FUNC(carnival_state::carnivala_music_port_2_w))', 'm_audiocpu->t1_in_cb().set(FUNC(carnival_state::carnival_music_port_t1_r))'], sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 285, sourceColumn: 2, sourceEndLine: 285};
MERGE (n:KG {id: 'device:carnival_state.carnivala_audio/audiocpu/callback:audiocpu:0'}) SET n:Callback SET n += {signal: 'p1_out_cb', operation: 'set', raw: 'm_audiocpu->p1_out_cb().set(FUNC(carnival_state::carnivala_music_port_1_w))', ownerTag: 'audiocpu', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 287, sourceColumn: 2, sourceEndLine: 287, targetClass: 'carnival_state', targetMethod: 'carnivala_music_port_1_w'};
MERGE (n:KG {id: 'handler:carnival_state.carnivala_music_port_1_w'}) SET n:Handler SET n += {method: 'carnivala_music_port_1_w', ownerClass: 'carnival_state', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 267, sourceColumn: 1, sourceEndLine: 272, sourceParameters: 'uint8_t data', sourceBody: '// P1: AY8912 d0-d7
	m_musicdata = data;
	carnival_psg_latch();'};
MERGE (n:KG {id: 'handler:carnival_state.carnival_psg_latch'}) SET n:Handler SET n += {method: 'carnival_psg_latch', ownerClass: 'carnival_state', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 255, sourceColumn: 1, sourceEndLine: 265, sourceParameters: '', sourceBody: 'if (m_musicbus & 1)
	{
		// BDIR W, BC1 selects address or data
		if (m_musicbus & 2)
			m_psg->address_w(m_musicdata);
		else
			m_psg->data_w(m_musicdata);
	}'};
MERGE (n:KG {id: 'device:carnival_state.carnivala_audio/audiocpu/callback:audiocpu:1'}) SET n:Callback SET n += {signal: 'p2_out_cb', operation: 'set', raw: 'm_audiocpu->p2_out_cb().set(FUNC(carnival_state::carnivala_music_port_2_w))', ownerTag: 'audiocpu', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 288, sourceColumn: 2, sourceEndLine: 288, targetClass: 'carnival_state', targetMethod: 'carnivala_music_port_2_w'};
MERGE (n:KG {id: 'handler:carnival_state.carnivala_music_port_2_w'}) SET n:Handler SET n += {method: 'carnivala_music_port_2_w', ownerClass: 'carnival_state', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 274, sourceColumn: 1, sourceEndLine: 280, sourceParameters: 'uint8_t data', sourceBody: '// P2 d6: AY8912 BDIR(R/W)
	// P2 d7: AY8912 BC1
	m_musicbus = data >> 6 & 3;
	carnival_psg_latch();'};
MERGE (n:KG {id: 'device:carnival_state.carnivala_audio/audiocpu/callback:audiocpu:2'}) SET n:Callback SET n += {signal: 't1_in_cb', operation: 'set', raw: 'm_audiocpu->t1_in_cb().set(FUNC(carnival_state::carnival_music_port_t1_r))', ownerTag: 'audiocpu', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 289, sourceColumn: 2, sourceEndLine: 289, targetClass: 'carnival_state', targetMethod: 'carnival_music_port_t1_r'};
MERGE (n:KG {id: 'handler:carnival_state.carnival_music_port_t1_r'}) SET n:Handler SET n += {method: 'carnival_music_port_t1_r', ownerClass: 'carnival_state', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 246, sourceColumn: 1, sourceEndLine: 250, sourceParameters: '', sourceBody: '// T1: comms from audio port 2 d3
	return ~m_port2State >> 3 & 1;'};
MERGE (n:KG {id: 'device:carnival_state.carnivala_audio/psg'}) SET n:Device SET n += {type: 'AY8912', tag: 'psg', clock: 1193181.6666666667, config: ['AY8912(config, m_psg, XTAL(3\'579\'545)/3).add_route(ALL_OUTPUTS, "mono", 0.25)'], sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 291, sourceColumn: 2, sourceEndLine: 291};
MERGE (n:KG {id: 'audioroute:device:carnival_state.carnivala_audio/psg/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.25, raw: 'AY8912(config, m_psg, XTAL(3\'579\'545)/3).add_route(ALL_OUTPUTS, "mono", 0.25)', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 291, sourceColumn: 2, sourceEndLine: 291};
MERGE (n:KG {id: 'device:carnival_state.carnivala_audio/samples'}) SET n:Device SET n += {type: 'SAMPLES', tag: 'samples', clock: null, config: ['SAMPLES(config, m_samples)', 'm_samples->set_channels(10)', 'm_samples->set_samples_names(carnival_sample_names)', 'm_samples->add_route(ALL_OUTPUTS, "mono", 0.5)'], sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 294, sourceColumn: 2, sourceEndLine: 294, configCalls: ['set_channels(10)']};
MERGE (n:KG {id: 'audioroute:device:carnival_state.carnivala_audio/samples/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.5, raw: 'm_samples->add_route(ALL_OUTPUTS, "mono", 0.5)', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 297, sourceColumn: 2, sourceEndLine: 297};
MERGE (n:KG {id: 'machine:vicdual_state.vicdual_root'}) SET n:MachineConfig SET n += {cls: 'vicdual_state', name: 'vicdual_root', calls: [], stateMembers: ['{"name":"m_coin_status","bits":8}', '{"name":"m_palette_bank","bits":8}', '{"name":"m_samurai_protection_data","bits":8}', '{"name":"m_port1State","bits":32,"signed":true}', '{"name":"m_port2State","bits":32,"signed":true}'], sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 918, sourceColumn: 1, sourceEndLine: 928};
MERGE (n:KG {id: 'device:vicdual_state.vicdual_root/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 1933560, config: ['Z80(config, m_maincpu, VICDUAL_MAIN_CPU_CLOCK)'], sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 921, sourceColumn: 2, sourceEndLine: 921};
MERGE (n:KG {id: 'device:vicdual_state.vicdual_root/coinstate'}) SET n:Device SET n += {type: 'TIMER', tag: 'coinstate', clock: null, config: ['TIMER(config, m_coinstate_timer).configure_generic(FUNC(vicdual_state::clear_coin_status))'], sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 923, sourceColumn: 2, sourceEndLine: 923};
MERGE (n:KG {id: 'device:vicdual_state.vicdual_root/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(VICDUAL_PIXEL_CLOCK, VICDUAL_HTOTAL, VICDUAL_HBEND, VICDUAL_HBSTART, VICDUAL_VTOTAL, VICDUAL_VBEND, VICDUAL_VBSTART)', 'm_screen->set_screen_update(FUNC(vicdual_state::screen_update_color))'], sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 926, sourceColumn: 2, sourceEndLine: 926, configCalls: ['set_raw(5156160,328,0,256,262,0,224)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [5156160, 328, 0, 256, 262, 0, 224], screenRawExpr: ['VICDUAL_PIXEL_CLOCK', 'VICDUAL_HTOTAL', 'VICDUAL_HBEND', 'VICDUAL_HBSTART', 'VICDUAL_VTOTAL', 'VICDUAL_VBEND', 'VICDUAL_VBSTART']};
MERGE (n:KG {id: 'handler:vicdual_state.screen_update_color'}) SET n:Handler SET n += {method: 'screen_update_color', ownerClass: 'vicdual_state', sourceFile: 'src/mame/sega/vicdual_v.cpp', sourceLine: 81, sourceColumn: 1, sourceEndLine: 136, sourceParameters: 'screen_device &screen, bitmap_rgb32 &bitmap, const rectangle &cliprect', sourceBody: 'uint8_t const *const color_prom = (uint8_t *)m_proms->base();
	uint8_t x = 0;
	uint8_t y = cliprect.min_y;
	uint8_t video_data = 0;
	pen_t back_pen = 0;
	pen_t fore_pen = 0;

	while (1)
	{
		if ((x & 0x07) == 0)
		{
			offs_t offs;

			/* read the character code */
			offs = (y >> 3 << 5) | (x >> 3);
			uint8_t char_code = m_videoram[offs];

			/* read the appropriate line of the character ram */
			offs = (char_code << 3) | (y & 0x07);
			video_data = m_characterram[offs];

			/* get the foreground and background colors from the PROM */
			offs = (char_code >> 5) | (m_palette_bank << 3);
			back_pen = TABLE((color_prom[offs, rgb_t::black(), rgb_t(0x00, 0xff, 0x00), rgb_t(0x00, 0x00, 0xff), rgb_t(0x00, 0xff, 0xff), rgb_t(0xff, 0x00, 0x00), rgb_t(0xff, 0xff, 0x00), rgb_t(0xff, 0x00, 0xff), rgb_t::white()) >> 1) & 0x07];
			fore_pen = TABLE((color_prom[offs, rgb_t::black(), rgb_t(0x00, 0xff, 0x00), rgb_t(0x00, 0x00, 0xff), rgb_t(0x00, 0xff, 0xff), rgb_t(0xff, 0x00, 0x00), rgb_t(0xff, 0xff, 0x00), rgb_t(0xff, 0x00, 0xff), rgb_t::white()) >> 5) & 0x07];
		}

		// this does nothing by default, but is used to enable overrides
		back_pen = choose_pen(x, y, back_pen);

		/* plot the current pixel */
		pen_t pen = (video_data & 0x80) ? fore_pen : back_pen;
		bitmap.pix(y, x) = pen;

		/* next pixel */
		video_data <<= 1;
		x++;

		/* end of line? */
		if (x == 0)
		{
			/* end of region to update? */
			if (y == cliprect.max_y)
			{
				break;
			}

			/* next row */
			y = y + 1;
		}
	}

	return 0;'};
MERGE (n:KG {id: 'handler:vicdual_state.choose_pen'}) SET n:Handler SET n += {method: 'choose_pen', ownerClass: 'vicdual_state', sourceFile: 'src/mame/sega/vicdual_v.cpp', sourceLine: 150, sourceColumn: 1, sourceEndLine: 153, sourceParameters: 'uint8_t x, uint8_t y, pen_t back_pen', sourceBody: 'return back_pen;'};
MERGE (n:KG {id: 'machine:vicdual_state.vicdual_dualgame_root'}) SET n:MachineConfig SET n += {cls: 'vicdual_state', name: 'vicdual_dualgame_root', calls: ['vicdual_root'], stateMembers: ['{"name":"m_coin_status","bits":8}', '{"name":"m_palette_bank","bits":8}', '{"name":"m_samurai_protection_data","bits":8}', '{"name":"m_port1State","bits":32,"signed":true}', '{"name":"m_port2State","bits":32,"signed":true}'], devicePatches: ['{"tag":"screen","config":["m_screen->set_screen_update(FUNC(vicdual_state::screen_update_color))"]}'], sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 2971, sourceColumn: 1, sourceEndLine: 2980};
MERGE (n:KG {id: 'machine:vicdual_state.vicdual_dualgame_root/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(vicdual_state::screen_update_color))', ownerTag: 'screen', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 2979, sourceColumn: 2, sourceEndLine: 2979, targetClass: 'vicdual_state', targetMethod: 'screen_update_color'};
MERGE (n:KG {id: 'machine:carnival_state.carnival'}) SET n:MachineConfig SET n += {cls: 'carnival_state', name: 'carnival', calls: ['vicdual_dualgame_root', 'carnivala_audio'], stateMembers: ['{"name":"m_coin_status","bits":8}', '{"name":"m_palette_bank","bits":8}', '{"name":"m_samurai_protection_data","bits":8}', '{"name":"m_port1State","bits":32,"signed":true}', '{"name":"m_port2State","bits":32,"signed":true}', '{"name":"m_musicdata","bits":32,"signed":true}', '{"name":"m_musicbus","bits":32,"signed":true}'], perfectQuantum: true, sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 3043, sourceColumn: 1, sourceEndLine: 3055};
MERGE (n:KG {id: 'device:carnival_state.carnival/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 3053, sourceColumn: 2, sourceEndLine: 3053};
MERGE (n:KG {id: 'handler:vicdual_state.get_vcounter'}) SET n:Handler SET n += {method: 'get_vcounter', ownerClass: 'vicdual_state', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 781, sourceColumn: 1, sourceEndLine: 791, sourceConstants: ['VICDUAL_HSEND=304', 'VICDUAL_VTOTAL=262'], sourceParameters: '', sourceBody: 'int vcounter = m_screen->vpos();

	/* the vertical synch counter gets incremented at the end of HSYNC,
	   compensate for this */
	if (m_screen->hpos() >= VICDUAL_HSEND)
		vcounter = (vcounter + 1) % VICDUAL_VTOTAL;

	return vcounter;'};
MERGE (n:KG {id: 'handler:vicdual_state.coin_status_r'}) SET n:Handler SET n += {method: 'coin_status_r', ownerClass: 'vicdual_state', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 719, sourceColumn: 1, sourceEndLine: 722, sourceParameters: '', sourceBody: 'return m_coin_status;'};
MERGE (n:KG {id: 'handler:vicdual_state.cblank_comp_r'}) SET n:Handler SET n += {method: 'cblank_comp_r', ownerClass: 'vicdual_state', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 806, sourceColumn: 1, sourceEndLine: 809, sourceParameters: '', sourceBody: 'return (vblank_comp_r() && !m_screen->hblank());'};
MERGE (n:KG {id: 'handler:vicdual_state.vblank_comp_r'}) SET n:Handler SET n += {method: 'vblank_comp_r', ownerClass: 'vicdual_state', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 800, sourceColumn: 1, sourceEndLine: 803, sourceConstants: ['VICDUAL_VBSTART=224'], sourceParameters: '', sourceBody: 'return (get_vcounter() < VICDUAL_VBSTART);'};
MERGE (n:KG {id: 'handler:vicdual_state.timer_value_r'}) SET n:Handler SET n += {method: 'timer_value_r', ownerClass: 'vicdual_state', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 812, sourceColumn: 1, sourceEndLine: 816, sourceParameters: '', sourceBody: '// return the state of the timer (old code claims "4MHz square wave", but it was toggled once every 2msec, or 500Hz)
	return machine().time().as_ticks(500) & 1;'};
MERGE (n:KG {id: 'inputs:carnival'}) SET n:InputPorts SET n += {name: 'carnival', sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 2601, sourceColumn: 8, sourceEndLine: 2601};
MERGE (n:KG {id: 'inputs:carnival/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:carnival/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 1};
MERGE (n:KG {id: 'inputs:carnival/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 2};
MERGE (n:KG {id: 'inputs:carnival/IN0/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 4, modifiers: ['PORT_DIPLOCATION("SW1:1")'], name: 'Unused', defaultValue: 0, location: 'SW1:1', settings: ['4=Off', '0=On']};
MERGE (n:KG {id: 'inputs:carnival/IN0/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 8, modifiers: ['PORT_DIPLOCATION("SW1:5")'], name: 'Unused', defaultValue: 0, location: 'SW1:5', settings: ['8=Off', '0=On']};
MERGE (n:KG {id: 'inputs:carnival/IN0/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 16, modifiers: ['PORT_DIPLOCATION("DOOR:1")'], name: 'Demo Sounds', defaultValue: 0, location: 'DOOR:1', settings: ['16=Off', '0=On']};
MERGE (n:KG {id: 'inputs:carnival/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 32};
MERGE (n:KG {id: 'inputs:carnival/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 192, activeLow: true, type: 'IPT_UNUSED', defaultValue: 192};
MERGE (n:KG {id: 'inputs:carnival/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:carnival/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 1};
MERGE (n:KG {id: 'inputs:carnival/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 2};
MERGE (n:KG {id: 'inputs:carnival/IN1/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 4, modifiers: ['PORT_DIPLOCATION("SW1:2")'], name: 'Unused', defaultValue: 0, location: 'SW1:2', settings: ['4=Off', '0=On']};
MERGE (n:KG {id: 'inputs:carnival/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_MEMBER(FUNC(vicdual_state::cblank_comp_r))'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:carnival/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_2WAY'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:carnival/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_2WAY'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:carnival/IN1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 192, activeLow: true, type: 'IPT_UNUSED', defaultValue: 192};
MERGE (n:KG {id: 'inputs:carnival/IN2'}) SET n:Port SET n += {tag: 'IN2', modify: false};
MERGE (n:KG {id: 'inputs:carnival/IN2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 1};
MERGE (n:KG {id: 'inputs:carnival/IN2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 2};
MERGE (n:KG {id: 'inputs:carnival/IN2/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 4, modifiers: ['PORT_DIPLOCATION("SW1:3")'], name: 'Unused', defaultValue: 0, location: 'SW1:3', settings: ['4=Off', '0=On']};
MERGE (n:KG {id: 'inputs:carnival/IN2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_MEMBER(FUNC(vicdual_state::timer_value_r))'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:carnival/IN2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_START1', defaultValue: 16};
MERGE (n:KG {id: 'inputs:carnival/IN2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 32};
MERGE (n:KG {id: 'inputs:carnival/IN2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 192, activeLow: true, type: 'IPT_UNUSED', defaultValue: 192};
MERGE (n:KG {id: 'inputs:carnival/IN3'}) SET n:Port SET n += {tag: 'IN3', modify: false};
MERGE (n:KG {id: 'inputs:carnival/IN3/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 1};
MERGE (n:KG {id: 'inputs:carnival/IN3/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 2};
MERGE (n:KG {id: 'inputs:carnival/IN3/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 4, modifiers: ['PORT_DIPLOCATION("SW1:4")'], name: 'Unused', defaultValue: 0, location: 'SW1:4', settings: ['4=Off', '0=On']};
MERGE (n:KG {id: 'inputs:carnival/IN3/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: false, type: 'IPT_CUSTOM', modifiers: ['PORT_READ_LINE_MEMBER(FUNC(vicdual_state::coin_status_r))'], defaultValue: 0};
MERGE (n:KG {id: 'inputs:carnival/IN3/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_UNKNOWN', defaultValue: 16};
MERGE (n:KG {id: 'inputs:carnival/IN3/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_START2', defaultValue: 32};
MERGE (n:KG {id: 'inputs:carnival/IN3/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 192, activeLow: true, type: 'IPT_UNUSED', defaultValue: 192};
MERGE (n:KG {id: 'inputs:carnival/COIN'}) SET n:Port SET n += {tag: 'COIN', modify: false};
MERGE (n:KG {id: 'inputs:carnival/COIN/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: false, type: 'IPT_COIN1', modifiers: ['PORT_CHANGED_MEMBER(DEVICE_SELF, FUNC(vicdual_state::coin_changed), 0)'], defaultValue: 0};
MATCH (a:KG {id: 'game:carnival'}), (b:KG {id: 'file:src/mame/sega/vicdual.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 5326, sourceColumn: 1, sourceEndLine: 5326};
MATCH (a:KG {id: 'game:carnival'}), (b:KG {id: 'machine:carnival_state.carnival'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:carnival'}), (b:KG {id: 'inputs:carnival'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:carnival'}), (b:KG {id: 'romset:carnival'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/vicdual.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/vicdual.cpp'}), (b:KG {id: 'file:vicdual.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/vicdual.cpp'}), (b:KG {id: 'file:vicdual-97271p.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/vicdual.cpp'}), (b:KG {id: 'file:vicdual-97269pb.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/vicdual.cpp'}), (b:KG {id: 'file:cpu/i8085/i8085.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/vicdual.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/vicdual.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/sega/vicdual.cpp'}), (b:KG {id: 'file:depthch.lh'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:carnival_state.carnival'}), (b:KG {id: 'file:src/mame/sega/vicdual.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 3043, sourceColumn: 1, sourceEndLine: 3055};
MATCH (a:KG {id: 'machine:carnival_state.carnival'}), (b:KG {id: 'machine:vicdual_state.vicdual_dualgame_root'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:carnival_state.carnival'}), (b:KG {id: 'machine:carnival_state.carnivala_audio'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 1};
MATCH (a:KG {id: 'machine:carnival_state.carnival'}), (b:KG {id: 'map:carnival_state.carnival_io_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_IO', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:carnival_state.carnival'}), (b:KG {id: 'device:carnival_state.carnival/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:carnival'}), (b:KG {id: 'file:src/mame/sega/vicdual.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 2601, sourceColumn: 8, sourceEndLine: 2601};
MATCH (a:KG {id: 'inputs:carnival'}), (b:KG {id: 'inputs:carnival/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:carnival'}), (b:KG {id: 'inputs:carnival/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:carnival'}), (b:KG {id: 'inputs:carnival/IN2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:carnival'}), (b:KG {id: 'inputs:carnival/IN3'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:carnival'}), (b:KG {id: 'inputs:carnival/COIN'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:carnival'}), (b:KG {id: 'file:src/mame/sega/vicdual.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 4678, sourceColumn: 1, sourceEndLine: 4678};
MATCH (a:KG {id: 'romset:carnival'}), (b:KG {id: 'region:carnival/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:carnival'}), (b:KG {id: 'region:carnival/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:carnival'}), (b:KG {id: 'region:carnival/audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:carnival'}), (b:KG {id: 'region:carnival/user1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'machine:vicdual_state.vicdual_dualgame_root'}), (b:KG {id: 'file:src/mame/sega/vicdual.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 2971, sourceColumn: 1, sourceEndLine: 2980};
MATCH (a:KG {id: 'machine:vicdual_state.vicdual_dualgame_root'}), (b:KG {id: 'machine:vicdual_state.vicdual_root'}) MERGE (a)-[r:CALLS]->(b) SET r += {order: 0};
MATCH (a:KG {id: 'machine:vicdual_state.vicdual_dualgame_root'}), (b:KG {id: 'map:vicdual_state.vicdual_dualgame_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:vicdual_state.vicdual_dualgame_root'}), (b:KG {id: 'machine:vicdual_state.vicdual_dualgame_root/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:carnival_state.carnivala_audio'}), (b:KG {id: 'file:src/mame/sega/vicdual.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 282, sourceColumn: 1, sourceEndLine: 298};
MATCH (a:KG {id: 'machine:carnival_state.carnivala_audio'}), (b:KG {id: 'device:carnival_state.carnivala_audio/audiocpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:carnival_state.carnivala_audio'}), (b:KG {id: 'device:carnival_state.carnivala_audio/psg'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:carnival_state.carnivala_audio'}), (b:KG {id: 'device:carnival_state.carnivala_audio/samples'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:carnival_state.carnival_io_map'}), (b:KG {id: 'file:src/mame/sega/vicdual.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 2120, sourceColumn: 1, sourceEndLine: 2131};
MATCH (a:KG {id: 'map:carnival_state.carnival_io_map'}), (b:KG {id: 'map:carnival_state.carnival_io_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:carnival_state.carnival_io_map'}), (b:KG {id: 'map:carnival_state.carnival_io_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:carnival_state.carnival_io_map'}), (b:KG {id: 'map:carnival_state.carnival_io_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:carnival_state.carnival_io_map'}), (b:KG {id: 'map:carnival_state.carnival_io_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:carnival_state.carnival_io_map'}), (b:KG {id: 'map:carnival_state.carnival_io_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN0'}), (b:KG {id: 'inputs:carnival/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN0'}), (b:KG {id: 'inputs:carnival/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN0'}), (b:KG {id: 'inputs:carnival/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN0'}), (b:KG {id: 'inputs:carnival/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN0'}), (b:KG {id: 'inputs:carnival/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN0'}), (b:KG {id: 'inputs:carnival/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN0'}), (b:KG {id: 'inputs:carnival/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN1'}), (b:KG {id: 'inputs:carnival/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN1'}), (b:KG {id: 'inputs:carnival/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN1'}), (b:KG {id: 'inputs:carnival/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN1'}), (b:KG {id: 'inputs:carnival/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN1'}), (b:KG {id: 'inputs:carnival/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN1'}), (b:KG {id: 'inputs:carnival/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN1'}), (b:KG {id: 'inputs:carnival/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN2'}), (b:KG {id: 'inputs:carnival/IN2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN2'}), (b:KG {id: 'inputs:carnival/IN2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN2'}), (b:KG {id: 'inputs:carnival/IN2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN2'}), (b:KG {id: 'inputs:carnival/IN2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN2'}), (b:KG {id: 'inputs:carnival/IN2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN2'}), (b:KG {id: 'inputs:carnival/IN2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN2'}), (b:KG {id: 'inputs:carnival/IN2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN3'}), (b:KG {id: 'inputs:carnival/IN3/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN3'}), (b:KG {id: 'inputs:carnival/IN3/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN3'}), (b:KG {id: 'inputs:carnival/IN3/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN3'}), (b:KG {id: 'inputs:carnival/IN3/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN3'}), (b:KG {id: 'inputs:carnival/IN3/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN3'}), (b:KG {id: 'inputs:carnival/IN3/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN3'}), (b:KG {id: 'inputs:carnival/IN3/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:carnival/COIN'}), (b:KG {id: 'inputs:carnival/COIN/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:carnival/maincpu'}), (b:KG {id: 'rom:carnival/maincpu/epr-651.u33'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:carnival/maincpu'}), (b:KG {id: 'rom:carnival/maincpu/epr-652.u32'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:carnival/maincpu'}), (b:KG {id: 'rom:carnival/maincpu/epr-653.u31'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:carnival/maincpu'}), (b:KG {id: 'rom:carnival/maincpu/epr-654.u30'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:carnival/maincpu'}), (b:KG {id: 'rom:carnival/maincpu/epr-655.u29'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:carnival/maincpu'}), (b:KG {id: 'rom:carnival/maincpu/epr-656.u28'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:carnival/maincpu'}), (b:KG {id: 'rom:carnival/maincpu/epr-657.u27'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:carnival/maincpu'}), (b:KG {id: 'rom:carnival/maincpu/epr-658.u26'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:carnival/maincpu'}), (b:KG {id: 'rom:carnival/maincpu/epr-659.u8'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:carnival/maincpu'}), (b:KG {id: 'rom:carnival/maincpu/epr-660.u7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:carnival/maincpu'}), (b:KG {id: 'rom:carnival/maincpu/epr-661.u6'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:carnival/maincpu'}), (b:KG {id: 'rom:carnival/maincpu/epr-662.u5'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:carnival/maincpu'}), (b:KG {id: 'rom:carnival/maincpu/epr-663.u4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:carnival/maincpu'}), (b:KG {id: 'rom:carnival/maincpu/epr-664.u3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:carnival/maincpu'}), (b:KG {id: 'rom:carnival/maincpu/epr-665.u2'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:carnival/maincpu'}), (b:KG {id: 'rom:carnival/maincpu/epr-666.u1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:carnival/proms'}), (b:KG {id: 'rom:carnival/proms/316-0633.u49'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:carnival/audiocpu'}), (b:KG {id: 'rom:carnival/audiocpu/epr-412.u5'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:carnival/user1'}), (b:KG {id: 'rom:carnival/user1/316-0206.u14'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'machine:vicdual_state.vicdual_root'}), (b:KG {id: 'file:src/mame/sega/vicdual.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 918, sourceColumn: 1, sourceEndLine: 928};
MATCH (a:KG {id: 'machine:vicdual_state.vicdual_root'}), (b:KG {id: 'device:vicdual_state.vicdual_root/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:vicdual_state.vicdual_root'}), (b:KG {id: 'device:vicdual_state.vicdual_root/coinstate'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:vicdual_state.vicdual_root'}), (b:KG {id: 'device:vicdual_state.vicdual_root/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:vicdual_state.vicdual_dualgame_map'}), (b:KG {id: 'file:src/mame/sega/vicdual.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 1924, sourceColumn: 1, sourceEndLine: 1930};
MATCH (a:KG {id: 'map:vicdual_state.vicdual_dualgame_map'}), (b:KG {id: 'map:vicdual_state.vicdual_dualgame_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:vicdual_state.vicdual_dualgame_map'}), (b:KG {id: 'map:vicdual_state.vicdual_dualgame_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:vicdual_state.vicdual_dualgame_map'}), (b:KG {id: 'map:vicdual_state.vicdual_dualgame_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:vicdual_state.vicdual_dualgame_map'}), (b:KG {id: 'map:vicdual_state.vicdual_dualgame_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'machine:vicdual_state.vicdual_dualgame_root/callback:screen:0'}), (b:KG {id: 'handler:vicdual_state.screen_update_color'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:carnival_state.carnivala_audio/audiocpu'}), (b:KG {id: 'device:carnival_state.carnivala_audio/audiocpu/callback:audiocpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:carnival_state.carnivala_audio/audiocpu'}), (b:KG {id: 'device:carnival_state.carnivala_audio/audiocpu/callback:audiocpu:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:carnival_state.carnivala_audio/audiocpu'}), (b:KG {id: 'device:carnival_state.carnivala_audio/audiocpu/callback:audiocpu:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:carnival_state.carnivala_audio/audiocpu'}), (b:KG {id: 'map:carnival_state.mboard_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:carnival_state.carnivala_audio/psg'}), (b:KG {id: 'audioroute:device:carnival_state.carnivala_audio/psg/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:carnival_state.carnivala_audio/samples'}), (b:KG {id: 'audioroute:device:carnival_state.carnivala_audio/samples/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'map:carnival_state.carnival_io_map/range4'}), (b:KG {id: 'handler:carnival_state.carnival_io_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN1/f3'}), (b:KG {id: 'handler:vicdual_state.cblank_comp_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN2/f3'}), (b:KG {id: 'handler:vicdual_state.timer_value_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:carnival/IN3/f3'}), (b:KG {id: 'handler:vicdual_state.coin_status_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:vicdual_state.vicdual_dualgame_map/range1'}), (b:KG {id: 'handler:vicdual_state.videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:vicdual_state.vicdual_dualgame_map/range3'}), (b:KG {id: 'handler:vicdual_state.characterram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:vicdual_state.screen_update_color'}), (b:KG {id: 'handler:vicdual_state.choose_pen'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:carnival_state.carnivala_audio/audiocpu/callback:audiocpu:0'}), (b:KG {id: 'handler:carnival_state.carnivala_music_port_1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:carnival_state.carnivala_audio/audiocpu/callback:audiocpu:1'}), (b:KG {id: 'handler:carnival_state.carnivala_music_port_2_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:carnival_state.carnivala_audio/audiocpu/callback:audiocpu:2'}), (b:KG {id: 'handler:carnival_state.carnival_music_port_t1_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:carnival_state.mboard_map'}), (b:KG {id: 'file:src/mame/sega/vicdual.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/sega/vicdual.cpp', sourceLine: 241, sourceColumn: 1, sourceEndLine: 244};
MATCH (a:KG {id: 'map:carnival_state.mboard_map'}), (b:KG {id: 'map:carnival_state.mboard_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'handler:carnival_state.carnival_io_w'}), (b:KG {id: 'handler:carnival_state.carnival_audio_1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:carnival_state.carnival_io_w'}), (b:KG {id: 'handler:carnival_state.carnival_audio_2_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:carnival_state.carnival_io_w'}), (b:KG {id: 'handler:vicdual_state.assert_coin_status'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:carnival_state.carnival_io_w'}), (b:KG {id: 'handler:vicdual_state.palette_bank_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:vicdual_state.cblank_comp_r'}), (b:KG {id: 'handler:vicdual_state.vblank_comp_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:carnival_state.carnivala_music_port_1_w'}), (b:KG {id: 'handler:carnival_state.carnival_psg_latch'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:carnival_state.carnivala_music_port_2_w'}), (b:KG {id: 'handler:carnival_state.carnival_psg_latch'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:vicdual_state.vblank_comp_r'}), (b:KG {id: 'handler:vicdual_state.get_vcounter'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
