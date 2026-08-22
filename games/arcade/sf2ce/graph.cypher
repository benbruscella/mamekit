// mamekit knowledge graph — driver src/mame/capcom/cps1.cpp
// generated 2026-08-22T05:52:50.021Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/capcom/cps1.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/capcom/cps1.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:cps1.h'}) SET n:SourceFile SET n += {path: 'cps1.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:machine/eepromser.h'}) SET n:SourceFile SET n += {path: 'machine/eepromser.h', external: true};
MERGE (n:KG {id: 'file:machine/upd4701.h'}) SET n:SourceFile SET n += {path: 'machine/upd4701.h', external: true};
MERGE (n:KG {id: 'file:sound/ymopm.h'}) SET n:SourceFile SET n += {path: 'sound/ymopm.h', external: true};
MERGE (n:KG {id: 'file:kabuki.h'}) SET n:SourceFile SET n += {path: 'kabuki.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'handler:cps_state.cps1_cps_b_r'}) SET n:Handler SET n += {method: 'cps1_cps_b_r', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 2136, sourceColumn: 1, sourceEndLine: 2180, sourceParameters: 'offs_t offset', sourceBody: '// Some games interrogate a couple of registers on bootup.
	// These are CPS1 board B self test checks. They wander from game to game.
	if (offset == m_game_config->cpsb_addr / 2)
		return m_game_config->cpsb_value;

	// some games use as a protection check the ability to do 16-bit multiplications
	// with a 32-bit result, by writing the factors to two ports and reading the
	// result from two other ports.
	if (offset == m_game_config->mult_result_lo / 2)
		return (m_cps_b_regs[m_game_config->mult_factor1 / 2] *
				m_cps_b_regs[m_game_config->mult_factor2 / 2]) & 0xffff;

	if (offset == m_game_config->mult_result_hi / 2)
		return (m_cps_b_regs[m_game_config->mult_factor1 / 2] *
				m_cps_b_regs[m_game_config->mult_factor2 / 2]) >> 16;

	// Extra input ports (on C-board)
	if (m_game_config->in2_addr != 0 && offset == m_game_config->in2_addr / 2)
		return m_io_in[2]->read();

	// Player 4 controls (on C-board) ("Captain Commando")
	if (m_game_config->in3_addr != 0 && offset == m_game_config->in3_addr / 2)
		return m_io_in[3]->read();

	// raster counters for cps2 & ganbare
	if (m_raster_irq != nullptr)
	{
		if (offset == 0x0e/2)
		{
			// 2-pixel hpos relative to raster counter #3
			return ((m_raster_counter[2] - m_screen->hpos() / 2) << 1 & 0x1fe) | (m_cps_b_regs[0x0e / 2] & 1);
		}
		if (offset == 0x10/2 || offset == 0x12/2)
		{
			// scanline relative to raster counter #1, #2
			return m_raster_counter[offset & 1] & 0x1ff;
		}
	}
#ifdef MAME_DEBUG
	popmessage("CPS-B read port %02x contact MAMEDEV", offset * 2);
#endif
	return 0xffff;', inputMembers: ['m_io_in=IN0,IN1,IN2,IN3']};
MERGE (n:KG {id: 'handler:cps_state.cps1_cps_b_w'}) SET n:Handler SET n += {method: 'cps1_cps_b_w', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 2183, sourceColumn: 1, sourceEndLine: 2243, sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: 'data = COMBINE_DATA(&m_cps_b_regs[offset]);

	// raster counters for cps2 & ganbare
	if (m_raster_irq != nullptr)
	{
		if (offset == 0x0e/2)
		{
			m_raster_reload[2] = data >> 1 & 0xff;
			return;
		}
		if (offset == 0x10/2 || offset == 0x12/2)
		{
			m_raster_reload[offset & 1] = data & 0x1ff;

			// manually reload counter
			if (BIT(data, 15))
				m_raster_counter[offset & 1] = m_raster_reload[offset & 1];
			return;
		}
	}

	// additional outputs on C-board
	if (m_game_config->out2_addr != 0 && offset == m_game_config->out2_addr / 2)
	{
		if (ACCESSING_BITS_0_7)
		{
			if (m_game_config->cpsb_value == 0x0402) // Mercs (CN2 connector)
			{
				machine().bookkeeping().coin_lockout_w(2, BIT(~data, 0));
				m_led_cboard[0] = BIT(data, 1);
				m_led_cboard[1] = BIT(data, 2);
				m_led_cboard[2] = BIT(data, 3);
			}
			else // kod, captcomm, knights
			{
				machine().bookkeeping().coin_lockout_w(2, BIT(~data, 1));
				machine().bookkeeping().coin_lockout_w(3, BIT(~data, 3));
			}
		}
	}

#ifdef MAME_DEBUG
	if (offset != m_game_config->cpsb_addr / 2 &&   // only varth writes here
			offset != m_game_config->mult_factor1 / 2 &&
			offset != m_game_config->mult_factor2 / 2 &&
			offset != m_game_config->layer_control / 2 &&
			offset != m_game_config->unknown1 / 2 &&
			offset != m_game_config->unknown2 / 2 &&
			offset != m_game_config->unknown3 / 2 &&
			offset != m_game_config->priority[0] / 2 &&
			offset != m_game_config->priority[1] / 2 &&
			offset != m_game_config->priority[2] / 2 &&
			offset != m_game_config->priority[3] / 2 &&
			offset != m_game_config->palette_control / 2 &&
			offset != m_game_config->out2_addr / 2 &&
			!m_game_config->bootleg_kludge)
		popmessage("CPS-B write %04x to port %02x contact MAMEDEV", data, offset * 2);
#endif'};
MERGE (n:KG {id: 'game:sf2ce'}) SET n:Game SET n += {name: 'sf2ce', year: '1992', company: 'Capcom', fullname: 'Street Fighter II\': Champion Edition (World 920513)', monitor: 'ROT0', cls: 'cps_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 15084, sourceColumn: 1, sourceEndLine: 15084};
MERGE (n:KG {id: 'romset:sf2ce'}) SET n:RomSet SET n += {name: 'sf2ce', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 10023, sourceColumn: 1, sourceEndLine: 10023};
MERGE (n:KG {id: 'region:sf2ce/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 4194304, flags: '0', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 4082, sourceColumn: 2, sourceEndLine: 4082};
MERGE (n:KG {id: 'rom:sf2ce/maincpu/s92e_23b.8f'}) SET n:Rom SET n += {file: 's92e_23b.8f', offset: 0, size: 524288, crc: '0aaa1a3a', sha1: '774a2b52f7c1876c0e10d8d57a0850ad2d016cf6', groupSize: 2, reverse: true};
MERGE (n:KG {id: 'rom:sf2ce/maincpu/s92_22b.7f'}) SET n:Rom SET n += {file: 's92_22b.7f', offset: 524288, size: 524288, crc: '2bbe15ed', sha1: 'a8e2edef62fa99c5ef701b28bfb6bc42f3af183d', groupSize: 2, reverse: true};
MERGE (n:KG {id: 'rom:sf2ce/maincpu/s92_21a.6f'}) SET n:Rom SET n += {file: 's92_21a.6f', offset: 1048576, size: 524288, crc: '925a7877', sha1: '1960dca35f0ca6f2b399a9fccfbc0132ac6425d1', groupSize: 2, reverse: true};
MERGE (n:KG {id: 'region:sf2ce/gfx'}) SET n:RomRegion SET n += {tag: 'gfx', size: 6291456, flags: '0', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 4089, sourceColumn: 2, sourceEndLine: 4089};
MERGE (n:KG {id: 'rom:sf2ce/gfx/s92-1m.3a'}) SET n:Rom SET n += {file: 's92-1m.3a', offset: 0, size: 524288, crc: '03b0d852', sha1: 'f370f25c96ad2b94f8c53d6b7139100285a25bef', groupSize: 2, skip: 6};
MERGE (n:KG {id: 'rom:sf2ce/gfx/s92-3m.5a'}) SET n:Rom SET n += {file: 's92-3m.5a', offset: 2, size: 524288, crc: '840289ec', sha1: '2fb42a242f60ba7e74009b5a90eb26e035ba1e82', groupSize: 2, skip: 6};
MERGE (n:KG {id: 'rom:sf2ce/gfx/s92-2m.4a'}) SET n:Rom SET n += {file: 's92-2m.4a', offset: 4, size: 524288, crc: 'cdb5f027', sha1: '4c7d944fef200fdfcaf57758b901b5511188ed2e', groupSize: 2, skip: 6};
MERGE (n:KG {id: 'rom:sf2ce/gfx/s92-4m.6a'}) SET n:Rom SET n += {file: 's92-4m.6a', offset: 6, size: 524288, crc: 'e2799472', sha1: '27d3796429338d82a8de246a0ea06dd487a87768', groupSize: 2, skip: 6};
MERGE (n:KG {id: 'rom:sf2ce/gfx/s92-5m.7a'}) SET n:Rom SET n += {file: 's92-5m.7a', offset: 2097152, size: 524288, crc: 'ba8a2761', sha1: '4b696d66c51611e43522bed752654314e76d33b6', groupSize: 2, skip: 6};
MERGE (n:KG {id: 'rom:sf2ce/gfx/s92-7m.9a'}) SET n:Rom SET n += {file: 's92-7m.9a', offset: 2097154, size: 524288, crc: 'e584bfb5', sha1: 'ebdf1f5e2638eed3a65dda82b1ed9151a355f4c9', groupSize: 2, skip: 6};
MERGE (n:KG {id: 'rom:sf2ce/gfx/s92-6m.8a'}) SET n:Rom SET n += {file: 's92-6m.8a', offset: 2097156, size: 524288, crc: '21e3f87d', sha1: '4a4961bb68c3a1ce15f9d393d9c03ecb2466cc29', groupSize: 2, skip: 6};
MERGE (n:KG {id: 'rom:sf2ce/gfx/s92-8m.10a'}) SET n:Rom SET n += {file: 's92-8m.10a', offset: 2097158, size: 524288, crc: 'befc47df', sha1: '520390420da3a0271ba90b0a933e65143265e5cf', groupSize: 2, skip: 6};
MERGE (n:KG {id: 'rom:sf2ce/gfx/s92-10m.3c'}) SET n:Rom SET n += {file: 's92-10m.3c', offset: 4194304, size: 524288, crc: '960687d5', sha1: '2868c31121b1c7564e9767b9a19cdbf655c7ed1d', groupSize: 2, skip: 6};
MERGE (n:KG {id: 'rom:sf2ce/gfx/s92-12m.5c'}) SET n:Rom SET n += {file: 's92-12m.5c', offset: 4194306, size: 524288, crc: '978ecd18', sha1: '648a59706b93c84b4206a968ecbdc3e834c476f6', groupSize: 2, skip: 6};
MERGE (n:KG {id: 'rom:sf2ce/gfx/s92-11m.4c'}) SET n:Rom SET n += {file: 's92-11m.4c', offset: 4194308, size: 524288, crc: 'd6ec9a0a', sha1: 'ed6143f8737013b6ef1684e37c05e037e7a80dae', groupSize: 2, skip: 6};
MERGE (n:KG {id: 'rom:sf2ce/gfx/s92-13m.6c'}) SET n:Rom SET n += {file: 's92-13m.6c', offset: 4194310, size: 524288, crc: 'ed2c67f6', sha1: '0083c0ffaf6fe7659ff0cf822be4346cd6e61329', groupSize: 2, skip: 6};
MERGE (n:KG {id: 'region:sf2ce/audiocpu'}) SET n:RomRegion SET n += {tag: 'audiocpu', size: 98304, flags: '0', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 4117, sourceColumn: 2, sourceEndLine: 4117};
MERGE (n:KG {id: 'rom:sf2ce/audiocpu/s92_09.11a'}) SET n:Rom SET n += {file: 's92_09.11a', offset: 0, size: 32768, crc: '08f6b60e', sha1: '8258fcaca4ac419312531eec67079b97f471179c', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 10044, sourceColumn: 2, sourceEndLine: 10044, continueSegments: [65536, 32768, 32768]};
MERGE (n:KG {id: 'region:sf2ce/oki'}) SET n:RomRegion SET n += {tag: 'oki', size: 262144, flags: '0', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 4121, sourceColumn: 2, sourceEndLine: 4121};
MERGE (n:KG {id: 'rom:sf2ce/oki/s92_18.11c'}) SET n:Rom SET n += {file: 's92_18.11c', offset: 0, size: 131072, crc: '7f162009', sha1: '346bf42992b4c36c593e21901e22c87ae4a7d86d', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 10048, sourceColumn: 2, sourceEndLine: 10048};
MERGE (n:KG {id: 'rom:sf2ce/oki/s92_19.12c'}) SET n:Rom SET n += {file: 's92_19.12c', offset: 131072, size: 131072, crc: 'beade53f', sha1: '277c397dc12752719ec6b47d2224750bd1c07f79', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 10049, sourceColumn: 2, sourceEndLine: 10049};
MERGE (n:KG {id: 'region:sf2ce/aboardplds'}) SET n:RomRegion SET n += {tag: 'aboardplds', size: 512, flags: '0', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 4125, sourceColumn: 2, sourceEndLine: 4125};
MERGE (n:KG {id: 'rom:sf2ce/aboardplds/buf1'}) SET n:Rom SET n += {file: 'buf1', offset: 0, size: 279, crc: 'eb122de7', sha1: 'b26b5bfe258e3e184f069719f9fd008d6b8f6b9b', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 4126, sourceColumn: 2, sourceEndLine: 4126};
MERGE (n:KG {id: 'rom:sf2ce/aboardplds/ioa1'}) SET n:Rom SET n += {file: 'ioa1', offset: 0, size: 279, crc: '59c7ee3b', sha1: 'fbb887c5b4f5cb8df77cec710eaac2985bc482a6', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 4127, sourceColumn: 2, sourceEndLine: 4127};
MERGE (n:KG {id: 'rom:sf2ce/aboardplds/prg1'}) SET n:Rom SET n += {file: 'prg1', offset: 0, size: 279, crc: 'f1129744', sha1: 'a5300f301c1a08a7da768f0773fa0fe3f683b237', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 4128, sourceColumn: 2, sourceEndLine: 4128};
MERGE (n:KG {id: 'rom:sf2ce/aboardplds/rom1'}) SET n:Rom SET n += {file: 'rom1', offset: 0, size: 279, crc: '41dc73b9', sha1: '7d4c9f1693c821fbf84e32dd6ef62ddf14967845', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 4129, sourceColumn: 2, sourceEndLine: 4129};
MERGE (n:KG {id: 'rom:sf2ce/aboardplds/sou1'}) SET n:Rom SET n += {file: 'sou1', offset: 0, size: 279, crc: '84f4b2fe', sha1: 'dcc9e86cc36316fe42eace02d6df75d08bc8bb6d', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 4130, sourceColumn: 2, sourceEndLine: 4130};
MERGE (n:KG {id: 'region:sf2ce/bboardplds'}) SET n:RomRegion SET n += {tag: 'bboardplds', size: 512, flags: '0', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 4132, sourceColumn: 2, sourceEndLine: 4132};
MERGE (n:KG {id: 'rom:sf2ce/bboardplds/s9263b.1a'}) SET n:Rom SET n += {file: 's9263b.1a', offset: 0, size: 279, crc: '0a7ecfe0', sha1: 'f75e7eed4604fcf68273197fe3dd7f0d7a313ada', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 10059, sourceColumn: 2, sourceEndLine: 10059};
MERGE (n:KG {id: 'rom:sf2ce/bboardplds/iob1.12d'}) SET n:Rom SET n += {file: 'iob1.12d', offset: 0, size: 279, crc: '3abc0700', sha1: '973043aa46ec6d5d1db20dc9d5937005a0f9f6ae', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 4755, sourceColumn: 2, sourceEndLine: 4755};
MERGE (n:KG {id: 'rom:sf2ce/bboardplds/bprg1.11d'}) SET n:Rom SET n += {file: 'bprg1.11d', offset: 0, size: 279, crc: '31793da7', sha1: '400fa7ac517421c978c1ee7773c30b9ed0c5d3f3', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 4756, sourceColumn: 2, sourceEndLine: 4756};
MERGE (n:KG {id: 'region:sf2ce/cboardplds'}) SET n:RomRegion SET n += {tag: 'cboardplds', size: 512, flags: '0', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 4758, sourceColumn: 2, sourceEndLine: 4758};
MERGE (n:KG {id: 'rom:sf2ce/cboardplds/ioc1.ic7'}) SET n:Rom SET n += {file: 'ioc1.ic7', offset: 0, size: 260, crc: 'a399772d', sha1: '55471189db573dd61e3087d12c55564291672c77', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 4759, sourceColumn: 2, sourceEndLine: 4759};
MERGE (n:KG {id: 'rom:sf2ce/cboardplds/c632.ic1'}) SET n:Rom SET n += {file: 'c632.ic1', offset: 0, size: 279, crc: '0fbd9270', sha1: 'd7e737b20c44d41e29ca94be56114b31934dde81', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 4760, sourceColumn: 2, sourceEndLine: 4760};
MERGE (n:KG {id: 'map:cps_state.cpu_space_map'}) SET n:AddressMap SET n += {cls: 'cps_state', name: 'cpu_space_map', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 419, sourceColumn: 1, sourceEndLine: 422};
MERGE (n:KG {id: 'map:cps_state.cpu_space_map/range0'}) SET n:AddressRange SET n += {start: 16777202, end: 16777215, raw: 'map(0xfffff2, 0xffffff).before_time(m_maincpu, FUNC(m68000_device::vpa_sync)).after_delay(m_maincpu, FUNC(m68000_device::vpa_after)).r(FUNC(cps_state::irqack_r))', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 421, sourceColumn: 2, sourceEndLine: 421};
MERGE (n:KG {id: 'handler:cps_state.irqack_r'}) SET n:Handler SET n += {method: 'irqack_r', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 407, sourceColumn: 1, sourceEndLine: 417, sourceParameters: 'offs_t offset', sourceBody: '// FC0-FC2(any) + BGACK: VPA and clears both IPL1 and IPL2
	if (!machine().side_effects_disabled())
	{
		m_maincpu->set_input_line(M68K_IRQ_IPL1, CLEAR_LINE);
		m_maincpu->set_input_line(M68K_IRQ_IPL2, CLEAR_LINE);
	}

	return m68000_base_device::autovector(offset + 1);'};
MERGE (n:KG {id: 'map:cps_state.main_map'}) SET n:AddressMap SET n += {cls: 'cps_state', name: 'main_map', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 577, sourceColumn: 1, sourceEndLine: 594};
MERGE (n:KG {id: 'map:cps_state.main_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 4194303, raw: 'map(0x000000, 0x3fffff).rom()', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 579, sourceColumn: 2, sourceEndLine: 579, rom: true};
MERGE (n:KG {id: 'map:cps_state.main_map/range1'}) SET n:AddressRange SET n += {start: 8388608, end: 8388615, raw: 'map(0x800000, 0x800007).portr("IN1")', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 580, sourceColumn: 2, sourceEndLine: 580, portRead: 'IN1'};
MERGE (n:KG {id: 'map:cps_state.main_map/range2'}) SET n:AddressRange SET n += {start: 8388632, end: 8388639, raw: 'map(0x800018, 0x80001f).r(FUNC(cps_state::cps1_dsw_r))', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 582, sourceColumn: 2, sourceEndLine: 582};
MERGE (n:KG {id: 'handler:cps_state.cps1_dsw_r'}) SET n:Handler SET n += {method: 'cps1_dsw_r', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 257, sourceColumn: 1, sourceEndLine: 272, sourceParameters: 'offs_t offset', sourceBody: 'int in = 0xff;
	switch (offset)
	{
		case 0:
			in = m_io_in[0]->read();
			break;
		case 1:
		case 2:
		case 3:
			in = m_dsw[offset - 1]->read();
			break;
	}
	return (in << 8) | 0xff;', inputMembers: ['m_io_in=IN0,IN1,IN2,IN3', 'm_dsw=DSWA,DSWB,DSWC']};
MERGE (n:KG {id: 'map:cps_state.main_map/range3'}) SET n:AddressRange SET n += {start: 8388640, end: 8388641, raw: 'map(0x800020, 0x800021).nopr()', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 583, sourceColumn: 2, sourceEndLine: 583, nopr: true};
MERGE (n:KG {id: 'map:cps_state.main_map/range4'}) SET n:AddressRange SET n += {start: 8388656, end: 8388663, raw: 'map(0x800030, 0x800037).w(FUNC(cps_state::cps1_coinctrl_w))', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 584, sourceColumn: 2, sourceEndLine: 584};
MERGE (n:KG {id: 'handler:cps_state.cps1_coinctrl_w'}) SET n:Handler SET n += {method: 'cps1_coinctrl_w', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 316, sourceColumn: 1, sourceEndLine: 327, sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: 'if (ACCESSING_BITS_8_15)
	{
		machine().bookkeeping().coin_counter_w(0, BIT(data, 8));
		machine().bookkeeping().coin_counter_w(1, BIT(data, 9));
		machine().bookkeeping().coin_lockout_w(0, BIT(~data, 10));
		machine().bookkeeping().coin_lockout_w(1, BIT(~data, 11));

		// bit 15 = CPS-A custom reset?
	}'};
MERGE (n:KG {id: 'map:cps_state.main_map/range5'}) SET n:AddressRange SET n += {start: 8388864, end: 8388927, raw: 'map(0x800100, 0x80013f).w(FUNC(cps_state::cps1_cps_a_w)).share(m_cps_a_regs)', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 586, sourceColumn: 2, sourceEndLine: 586, share: 'cps_a_regs'};
MERGE (n:KG {id: 'handler:cps_state.cps1_cps_a_w'}) SET n:Handler SET n += {method: 'cps1_cps_a_w', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 2115, sourceColumn: 1, sourceEndLine: 2133, sourceConstants: ['CPS1_PALETTE_BASE=5', 'CPS1_VIDEOCONTROL=17'], sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: 'data = COMBINE_DATA(&m_cps_a_regs[offset]);

	// The main CPU writes the palette to gfxram, and the CPS-B custom copies it
	// to the real palette RAM, which is separated from gfxram.
	// This is done ONLY after the palette base register is written to. It is not
	// known what the exact timing should be, how long it should take and when it
	// should happen. We are assuming that the copy happens immediately, since it
	// fixes glitches in the ghouls intro, but it might happen at next vblank.
	if (offset == CPS1_PALETTE_BASE)
		cps1_build_palette(cps1_base(CPS1_PALETTE_BASE, m_palette_align));

#ifdef MAME_DEBUG
	// pzloop2 write to register 24 on startup. This is probably just a bug.
	if (offset > CPS1_VIDEOCONTROL)
		popmessage("write to CPS-A register %02x contact MAMEDEV", offset * 2);
#endif'};
MERGE (n:KG {id: 'handler:cps_state.cps1_build_palette'}) SET n:Handler SET n += {method: 'cps1_build_palette', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 2612, sourceColumn: 1, sourceEndLine: 2646, sourceParameters: 'const uint16_t* const palette_base', sourceBody: 'uint16_t const *palette_ram = palette_base;
	const uint16_t ctrl = m_cps_b_regs[m_game_config->palette_control/2];

	// The palette is copied only for pages that are enabled in the ctrl
	// register. Note that if the first palette pages are skipped, all
	// the following pages are scaled down.
	for (int page = 0; page < 6; ++page)
	{
		if (BIT(ctrl, page))
		{
			for (int offset = 0; offset < 0x200; ++offset)
			{
				const uint16_t palette = *(palette_ram++);

				// from my understanding of the schematics, when the \'brightness\'
				// component is set to 0 it should reduce brightness to 1/3
				const int bright = 0x0f + ((palette >> 12) << 1);

				const int r = ((palette >> 8) & 0x0f) * 0x11 * bright / 0x2d;
				const int g = ((palette >> 4) & 0x0f) * 0x11 * bright / 0x2d;
				const int b = ((palette >> 0) & 0x0f) * 0x11 * bright / 0x2d;

				m_palette->set_pen_color(0x200 * page + offset, rgb_t(r, g, b));
			}
		}
		else
		{
			// skip page in gfxram, but only if we have already copied at least one page
			if (palette_ram != palette_base)
				palette_ram += 0x200;
		}
	}'};
MERGE (n:KG {id: 'handler:cps_state.cps1_base'}) SET n:Handler SET n += {method: 'cps1_base', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 2099, sourceColumn: 1, sourceEndLine: 2111, sourceParameters: 'int offset, int boundary', sourceBody: 'int base = m_cps_a_regs[offset] * 256;

	// The scroll RAM must start on a 0x4000 boundary.
	// Some games do not do this.
	// For example:
	//    Captain commando     - continue screen will not display
	//    Muscle bomber games  - will animate garbage during gameplay
	// Mask out the irrelevant bits.
	base &= ~(boundary - 1);
	return &m_gfxram[(base & 0x3ffff) / 2];'};
MERGE (n:KG {id: 'map:cps_state.main_map/range6'}) SET n:AddressRange SET n += {start: 8388928, end: 8388991, raw: 'map(0x800140, 0x80017f).rw(FUNC(cps_state::cps1_cps_b_r), FUNC(cps_state::cps1_cps_b_w)).share(m_cps_b_regs)', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 589, sourceColumn: 2, sourceEndLine: 589, share: 'cps_b_regs'};
MERGE (n:KG {id: 'map:cps_state.main_map/range7'}) SET n:AddressRange SET n += {start: 8388992, end: 8388999, raw: 'map(0x800180, 0x800187).w(FUNC(cps_state::cps1_soundlatch_w))', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 590, sourceColumn: 2, sourceEndLine: 590};
MERGE (n:KG {id: 'handler:cps_state.cps1_soundlatch_w'}) SET n:Handler SET n += {method: 'cps1_soundlatch_w', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 302, sourceColumn: 1, sourceEndLine: 308, sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: 'if (ACCESSING_BITS_0_7)
		m_soundlatch[0]->write(data & 0xff);
	else
		m_soundlatch[0]->write(data >> 8);'};
MERGE (n:KG {id: 'map:cps_state.main_map/range8'}) SET n:AddressRange SET n += {start: 8389000, end: 8389007, raw: 'map(0x800188, 0x80018f).w(FUNC(cps_state::cps1_soundlatch2_w))', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 591, sourceColumn: 2, sourceEndLine: 591};
MERGE (n:KG {id: 'handler:cps_state.cps1_soundlatch2_w'}) SET n:Handler SET n += {method: 'cps1_soundlatch2_w', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 310, sourceColumn: 1, sourceEndLine: 314, sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: 'if (ACCESSING_BITS_0_7)
		m_soundlatch[1]->write(data & 0xff);'};
MERGE (n:KG {id: 'map:cps_state.main_map/range9'}) SET n:AddressRange SET n += {start: 9437184, end: 9633791, raw: 'map(0x900000, 0x92ffff).ram().w(FUNC(cps_state::cps1_gfxram_w)).share(m_gfxram)', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 592, sourceColumn: 2, sourceEndLine: 592, ram: true, share: 'gfxram'};
MERGE (n:KG {id: 'handler:cps_state.cps1_gfxram_w'}) SET n:Handler SET n += {method: 'cps1_gfxram_w', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 2368, sourceColumn: 1, sourceEndLine: 2381, sourceConstants: ['CPS1_SCROLL1_BASE=1', 'CPS1_SCROLL2_BASE=2', 'CPS1_SCROLL3_BASE=3'], sourceParameters: 'offs_t offset, uint16_t data, uint16_t mem_mask', sourceBody: 'const int page = (offset >> 7) & 0x3c0;
	COMBINE_DATA(&m_gfxram[offset]);

	if (page == (m_cps_a_regs[CPS1_SCROLL1_BASE] & 0x3c0))
		m_bg_tilemap[0]->mark_tile_dirty(offset / 2 & 0x0fff);

	if (page == (m_cps_a_regs[CPS1_SCROLL2_BASE] & 0x3c0))
		m_bg_tilemap[1]->mark_tile_dirty(offset / 2 & 0x0fff);

	if (page == (m_cps_a_regs[CPS1_SCROLL3_BASE] & 0x3c0))
		m_bg_tilemap[2]->mark_tile_dirty(offset / 2 & 0x0fff);'};
MERGE (n:KG {id: 'map:cps_state.main_map/range10'}) SET n:AddressRange SET n += {start: 16711680, end: 16777215, raw: 'map(0xff0000, 0xffffff).ram().share(m_mainram)', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 593, sourceColumn: 2, sourceEndLine: 593, ram: true, share: 'mainram'};
MERGE (n:KG {id: 'map:cps_state.sub_map'}) SET n:AddressMap SET n += {cls: 'cps_state', name: 'sub_map', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 631, sourceColumn: 1, sourceEndLine: 642};
MERGE (n:KG {id: 'map:cps_state.sub_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom()', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 633, sourceColumn: 2, sourceEndLine: 633, rom: true};
MERGE (n:KG {id: 'map:cps_state.sub_map/range1'}) SET n:AddressRange SET n += {start: 32768, end: 49151, raw: 'map(0x8000, 0xbfff).bankr(m_audiobank)', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 634, sourceColumn: 2, sourceEndLine: 634, bankRead: 'audiobank'};
MERGE (n:KG {id: 'map:cps_state.sub_map/range2'}) SET n:AddressRange SET n += {start: 53248, end: 55295, raw: 'map(0xd000, 0xd7ff).ram()', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 635, sourceColumn: 2, sourceEndLine: 635, ram: true};
MERGE (n:KG {id: 'map:cps_state.sub_map/range3'}) SET n:AddressRange SET n += {start: 61440, end: 61441, raw: 'map(0xf000, 0xf001).rw("2151", FUNC(ym2151_device::read), FUNC(ym2151_device::write))', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 636, sourceColumn: 2, sourceEndLine: 636};
MERGE (n:KG {id: 'handler:ym2151_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'ym2151_device', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 636, sourceColumn: 2, sourceEndLine: 636};
MERGE (n:KG {id: 'handler:ym2151_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'ym2151_device', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 636, sourceColumn: 2, sourceEndLine: 636};
MERGE (n:KG {id: 'map:cps_state.sub_map/range4'}) SET n:AddressRange SET n += {start: 61442, end: 61442, raw: 'map(0xf002, 0xf002).rw(m_oki, FUNC(okim6295_device::read), FUNC(okim6295_device::write))', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 637, sourceColumn: 2, sourceEndLine: 637};
MERGE (n:KG {id: 'handler:okim6295_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'okim6295_device', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 637, sourceColumn: 2, sourceEndLine: 637};
MERGE (n:KG {id: 'handler:okim6295_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'okim6295_device', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 637, sourceColumn: 2, sourceEndLine: 637};
MERGE (n:KG {id: 'map:cps_state.sub_map/range5'}) SET n:AddressRange SET n += {start: 61444, end: 61444, raw: 'map(0xf004, 0xf004).w(FUNC(cps_state::cps1_snd_bankswitch_w))', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 638, sourceColumn: 2, sourceEndLine: 638};
MERGE (n:KG {id: 'handler:cps_state.cps1_snd_bankswitch_w'}) SET n:Handler SET n += {method: 'cps1_snd_bankswitch_w', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 292, sourceColumn: 1, sourceEndLine: 295, sourceParameters: 'uint8_t data', sourceBody: 'm_audiobank->set_entry(BIT(data, 0));'};
MERGE (n:KG {id: 'map:cps_state.sub_map/range6'}) SET n:AddressRange SET n += {start: 61446, end: 61446, raw: 'map(0xf006, 0xf006).w(FUNC(cps_state::cps1_oki_pin7_w))', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 639, sourceColumn: 2, sourceEndLine: 639};
MERGE (n:KG {id: 'handler:cps_state.cps1_oki_pin7_w'}) SET n:Handler SET n += {method: 'cps1_oki_pin7_w', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 297, sourceColumn: 1, sourceEndLine: 300, sourceParameters: 'uint8_t data', sourceBody: 'm_oki->set_pin7(BIT(data, 0));'};
MERGE (n:KG {id: 'map:cps_state.sub_map/range7'}) SET n:AddressRange SET n += {start: 61448, end: 61448, raw: 'map(0xf008, 0xf008).r(m_soundlatch[0], FUNC(generic_latch_8_device::read))', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 640, sourceColumn: 2, sourceEndLine: 640};
MERGE (n:KG {id: 'handler:generic_latch_8_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'generic_latch_8_device', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 641, sourceColumn: 2, sourceEndLine: 641};
MERGE (n:KG {id: 'map:cps_state.sub_map/range8'}) SET n:AddressRange SET n += {start: 61450, end: 61450, raw: 'map(0xf00a, 0xf00a).r(m_soundlatch[1], FUNC(generic_latch_8_device::read))', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 641, sourceColumn: 2, sourceEndLine: 641};
MERGE (n:KG {id: 'machine:cps_state.cps1_10MHz'}) SET n:MachineConfig SET n += {cls: 'cps_state', name: 'cps1_10MHz', calls: [], startHandlers: ['cps_state.video_start'], sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3909, sourceColumn: 1, sourceEndLine: 3947};
MERGE (n:KG {id: 'handler:cps_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 2533, sourceColumn: 1, sourceEndLine: 2596, sourceConstants: ['CPS1_PALETTE_ENTRIES=192', 'CPS1_OBJ_BASE=0', 'CPS1_SCROLL1_BASE=1', 'CPS1_SCROLL2_BASE=2', 'CPS1_SCROLL3_BASE=3', 'CPS1_OTHER_BASE=4'], sourceParameters: '', sourceBody: 'MACHINE_RESET_CALL_MEMBER(cps);

	// Put in some const
	m_scroll_size    = 0x4000; // scroll1, scroll2, scroll3
	m_obj_size       = 0x0800;
	m_other_size     = 0x0800;
	m_palette_align  = 0x0400; // minimum alignment is a single palette page (512 colors). Verified on pcb.
	m_palette_size   = CPS1_PALETTE_ENTRIES * 32; // Size of palette RAM
	m_stars_rom_size = 0x2000; // first 0x4000 of gfx ROM are used, but 0x0000-0x1fff is == 0x2000-0x3fff

	// create tilemaps
	m_bg_tilemap[0] = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(cps_state::get_tile0_info)), tilemap_mapper_delegate(*this, FUNC(cps_state::tilemap0_scan)),  8,  8, 64, 64);
	m_bg_tilemap[1] = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(cps_state::get_tile1_info)), tilemap_mapper_delegate(*this, FUNC(cps_state::tilemap1_scan)), 16, 16, 64, 64);
	m_bg_tilemap[2] = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(cps_state::get_tile2_info)), tilemap_mapper_delegate(*this, FUNC(cps_state::tilemap2_scan)), 32, 32, 64, 64);

	// create empty tiles
	memset(m_empty_tile, 0x0f, sizeof(m_empty_tile));

	// front masks will change at runtime to handle sprite occluding
	cps1_update_transmasks();

	m_buffered_obj = make_unique_clear<uint16_t[]>(m_obj_size / 2);

	// clear RAM regions
	memset(m_gfxram, 0, m_gfxram.bytes()); // Clear GFX RAM
	memset(m_cps_a_regs, 0, 0x40); // Clear CPS-A registers
	memset(m_cps_b_regs, 0, 0x40); // Clear CPS-B registers

	// Put in some defaults
	m_cps_a_regs[CPS1_OBJ_BASE]     = 0x9200;
	m_cps_a_regs[CPS1_SCROLL1_BASE] = 0x9000;
	m_cps_a_regs[CPS1_SCROLL2_BASE] = 0x9040;
	m_cps_a_regs[CPS1_SCROLL3_BASE] = 0x9080;
	m_cps_a_regs[CPS1_OTHER_BASE]   = 0x9100;

	// This should never be hit, since game_config is set in machine_reset
	if (!m_game_config)
		throw emu_fatalerror("cps_state::video_start: m_game_config hasn\'t been set up yet");

	// Set up old base
	m_scroll[0] = nullptr;
	m_scroll[1] = nullptr;
	m_scroll[2] = nullptr;
	m_obj = nullptr;
	m_other = nullptr;
	cps1_get_video_base(); // Calculate base pointers
	cps1_get_video_base(); // Calculate old base pointers

	m_screen->register_screen_bitmap(m_dummy_bitmap);

	// state save register
	save_item(NAME(m_last_sprite_offset));
	save_pointer(NAME(m_buffered_obj), m_obj_size / 2);
#if 0
	// these do not need to be saved, because they are recovered from cps_a_regs in cps1_postload
	save_item(NAME(m_scrollx));
	save_item(NAME(m_scrolly));
	save_item(NAME(m_starsx));
	save_item(NAME(m_starsy));
	save_item(NAME(m_stars_enabled));
#endif'};
MERGE (n:KG {id: 'handler:cps_state.cps1_update_transmasks'}) SET n:Handler SET n += {method: 'cps1_update_transmasks', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 2515, sourceColumn: 1, sourceEndLine: 2531, sourceParameters: '', sourceBody: 'for (int i = 0; i < 4; i++)
	{
		uint32_t mask;

		// Get transparency registers
		if (m_game_config->priority[i] != -1)
			mask = m_cps_b_regs[m_game_config->priority[i] / 2] ^ 0xffff;
		else
			mask = 0xffff; // completely transparent if priority masks not defined (qad)

		m_bg_tilemap[0]->set_transmask(i, mask, 0x8000);
		m_bg_tilemap[1]->set_transmask(i, mask, 0x8000);
		m_bg_tilemap[2]->set_transmask(i, mask, 0x8000);
	}'};
MERGE (n:KG {id: 'handler:cps_state.cps1_get_video_base'}) SET n:Handler SET n += {method: 'cps1_get_video_base', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 2246, sourceColumn: 1, sourceEndLine: 2365, sourceConstants: ['CPS1_OBJ_BASE=0', 'CPS1_SCROLL1_BASE=1', 'CPS1_SCROLL2_BASE=2', 'CPS1_SCROLL3_BASE=3', 'CPS1_OTHER_BASE=4', 'CPS1_PALETTE_BASE=5', 'CPS1_SCROLL1_SCROLLX=6', 'CPS1_SCROLL1_SCROLLY=7', 'CPS1_SCROLL2_SCROLLX=8', 'CPS1_SCROLL2_SCROLLY=9', 'CPS1_SCROLL3_SCROLLX=10', 'CPS1_SCROLL3_SCROLLY=11', 'CPS1_STARS1_SCROLLX=12', 'CPS1_STARS1_SCROLLY=13', 'CPS1_STARS2_SCROLLX=14', 'CPS1_STARS2_SCROLLY=15', 'CPS1_VIDEOCONTROL=17'], sourceParameters: '', sourceBody: 'int scroll1xoff = 0, scroll2xoff = 0, scroll3xoff = 0;

	// Re-calculate the VIDEO RAM base
	if (m_scroll[0] != cps1_base(CPS1_SCROLL1_BASE, m_scroll_size))
	{
		m_scroll[0] = cps1_base(CPS1_SCROLL1_BASE, m_scroll_size);
		m_bg_tilemap[0]->mark_all_dirty();
	}
	if (m_scroll[1] != cps1_base(CPS1_SCROLL2_BASE, m_scroll_size))
	{
		m_scroll[1] = cps1_base(CPS1_SCROLL2_BASE, m_scroll_size);
		m_bg_tilemap[1]->mark_all_dirty();
	}
	if (m_scroll[2] != cps1_base(CPS1_SCROLL3_BASE, m_scroll_size))
	{
		m_scroll[2] = cps1_base(CPS1_SCROLL3_BASE, m_scroll_size);
		m_bg_tilemap[2]->mark_all_dirty();
	}

	// Some of the sf2 hacks use only sprite port 0x9100 and the scroll layers are offset
	const uint8_t kludge = m_game_config->bootleg_kludge & 15;
	if (kludge == 0x01)
	{
		m_cps_a_regs[CPS1_OBJ_BASE] = 0x9100;
		scroll1xoff = -0x0c;
		scroll2xoff = -0x0e;
		scroll3xoff = -0x10;
	}
	else if (kludge == 0x0e)
	{
		scroll1xoff = 0xffba;
		scroll2xoff = 0xffc0;
		scroll3xoff = 0xffba;
	}
	else if (kludge == 0x0f)
	{
		scroll1xoff = 0xffc0;
		scroll2xoff = 0xffc0;
		scroll3xoff = 0xffc0;
	}
	else if (kludge == 2)
	{
		m_cps_a_regs[CPS1_OBJ_BASE] = 0x9100;
		scroll1xoff = -0x10;
		scroll2xoff = -0x10;
		scroll3xoff = -0x10;
	}
	else if (kludge == 3)
	{
		scroll1xoff = -0x08;
		scroll2xoff = -0x0b;
		scroll3xoff = -0x0c;
	}
	else if (m_game_config->bootleg_kludge == 0x88) // 3wondersb
	{
		scroll1xoff = 0x4;
		scroll2xoff = 0x6;
		scroll3xoff = 0xa;
		m_cps_b_regs[0x30/2] = 0x3f;
		m_cps_a_regs[CPS1_VIDEOCONTROL] = 0x3e;
		m_cps_a_regs[CPS1_SCROLL2_BASE] = 0x90c0;
		m_cps_a_regs[CPS1_SCROLL3_BASE] = 0x9100;
		m_cps_a_regs[CPS1_PALETTE_BASE] = 0x9140;
	}

	m_obj = cps1_base(CPS1_OBJ_BASE, m_obj_size);
	m_other = cps1_base(CPS1_OTHER_BASE, m_other_size);

	// Get scroll values
	m_scrollx[0] = m_cps_a_regs[CPS1_SCROLL1_SCROLLX] + scroll1xoff;
	m_scrolly[0] = m_cps_a_regs[CPS1_SCROLL1_SCROLLY];
	m_scrollx[1] = m_cps_a_regs[CPS1_SCROLL2_SCROLLX] + scroll2xoff;
	m_scrolly[1] = m_cps_a_regs[CPS1_SCROLL2_SCROLLY];
	m_scrollx[2] = m_cps_a_regs[CPS1_SCROLL3_SCROLLX] + scroll3xoff;
	m_scrolly[2] = m_cps_a_regs[CPS1_SCROLL3_SCROLLY];
	m_starsx[0] = m_cps_a_regs[CPS1_STARS1_SCROLLX];
	m_starsy[0] = m_cps_a_regs[CPS1_STARS1_SCROLLY];
	m_starsx[1] = m_cps_a_regs[CPS1_STARS2_SCROLLX];
	m_starsy[1] = m_cps_a_regs[CPS1_STARS2_SCROLLY];

	// Get layer enable bits
	const uint16_t layercontrol = m_cps_b_regs[m_game_config->layer_control / 2];
	const uint16_t videocontrol = m_cps_a_regs[CPS1_VIDEOCONTROL];
	m_bg_tilemap[0]->enable(layercontrol & m_game_config->layer_enable_mask[0]);
	m_bg_tilemap[1]->enable((layercontrol & m_game_config->layer_enable_mask[1]) && BIT(videocontrol, 2));
	m_bg_tilemap[2]->enable((layercontrol & m_game_config->layer_enable_mask[2]) && BIT(videocontrol, 3));
	m_stars_enabled[0] = layercontrol & m_game_config->layer_enable_mask[3];
	m_stars_enabled[1] = layercontrol & m_game_config->layer_enable_mask[4];

#ifdef MAME_DEBUG
{
	int enablemask = 0;

	if (m_game_config->layer_enable_mask[0] == m_game_config->layer_enable_mask[1])
		enablemask = m_game_config->layer_enable_mask[0];

	if (m_game_config->layer_enable_mask[0] == m_game_config->layer_enable_mask[2])
		enablemask = m_game_config->layer_enable_mask[0];

	if (m_game_config->layer_enable_mask[1] == m_game_config->layer_enable_mask[2])
		enablemask = m_game_config->layer_enable_mask[1];

	if (enablemask)
	{
		if (((layercontrol & enablemask) && (layercontrol & enablemask) != enablemask))
			popmessage("layer %02x contact MAMEDEV", layercontrol & 0xc03f);
	}

	enablemask = m_game_config->layer_enable_mask[0] | m_game_config->layer_enable_mask[1]
			| m_game_config->layer_enable_mask[2]
			| m_game_config->layer_enable_mask[3] | m_game_config->layer_enable_mask[4];

	if (((layercontrol & ~enablemask) & 0x003e) != 0)
		popmessage("layer %02x contact MAMEDEV", layercontrol & 0xc03f);
}
#endif'};
MERGE (n:KG {id: 'handler:cps_state.get_tile0_info'}) SET n:Handler SET n += {method: 'get_tile0_info', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 2452, sourceColumn: 1, sourceEndLine: 2474, sourceConstants: ['GFXTYPE_SCROLL1=2'], sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int code = m_scroll[0][2 * tile_index];
	const uint16_t attr = m_scroll[0][2 * tile_index + 1];

	code = gfxrom_bank_mapper(GFXTYPE_SCROLL1, code);

	// allows us to reproduce a problem seen with a ffight board where USA and Japanese
	// roms have been mixed to be reproduced (ffightub) -- it looks like each column
	// should alternate between the left and right side of the 16x16 tiles
	const uint8_t gfxset = BIT(tile_index, 5);

	tileinfo.set(gfxset,
			code,
			(attr & 0x1f) + 0x20,
			TILE_FLIPYX((attr & 0x60) >> 5));
	tileinfo.group = (attr & 0x0180) >> 7;

	// for out of range tiles, switch to fully transparent data
	// (but still call tileinfo.set, otherwise problems might occur on boot e.g. unsquad)
	if (code == -1)
		tileinfo.pen_data = m_empty_tile;'};
MERGE (n:KG {id: 'handler:cps_state.gfxrom_bank_mapper'}) SET n:Handler SET n += {method: 'gfxrom_bank_mapper', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 2385, sourceColumn: 1, sourceEndLine: 2425, sourceConstants: ['GFXTYPE_SPRITES=1', 'GFXTYPE_SCROLL1=2', 'GFXTYPE_SCROLL2=4', 'GFXTYPE_SCROLL3=8'], sourceParameters: 'int type, int code', sourceBody: 'const struct gfx_range *range = m_game_config->bank_mapper;
	int shift = 0;

	assert(range);

	switch (type)
	{
		case GFXTYPE_SPRITES: shift = 1; break;
		case GFXTYPE_SCROLL1: shift = 0; break;
		case GFXTYPE_SCROLL2: shift = 1; break;
		case GFXTYPE_SCROLL3: shift = 3; break;
	}

	code <<= shift;

	while (range->type)
	{
		if (code >= range->start && code <= range->end)
		{
			if (range->type & type)
			{
				int base = 0;

				for (int i = 0; i < range->bank; ++i)
					base += m_game_config->bank_sizes[i];

				return (base + (code & (m_game_config->bank_sizes[range->bank] - 1))) >> shift;
			}
		}

		++range;
	}

#ifdef MAME_DEBUG
	//popmessage("tile %02x/%04x out of range", type, code >> shift);
#endif

	return -1;'};
MERGE (n:KG {id: 'handler:cps_state.tilemap0_scan'}) SET n:Handler SET n += {method: 'tilemap0_scan', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 2434, sourceColumn: 1, sourceEndLine: 2438, sourceParameters: 'u32 col, u32 row, u32 num_cols, u32 num_rows', sourceBody: '// logical (col,row) -> memory offset
	return (row & 0x1f) + ((col & 0x3f) << 5) + ((row & 0x20) << 6);'};
MERGE (n:KG {id: 'handler:cps_state.get_tile1_info'}) SET n:Handler SET n += {method: 'get_tile1_info', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 2476, sourceColumn: 1, sourceEndLine: 2492, sourceConstants: ['GFXTYPE_SCROLL2=4'], sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int code = m_scroll[1][2 * tile_index];
	const uint16_t attr = m_scroll[1][2 * tile_index + 1];

	code = gfxrom_bank_mapper(GFXTYPE_SCROLL2, code);

	tileinfo.set(2,
			code,
			(attr & 0x1f) + 0x40,
			TILE_FLIPYX((attr & 0x60) >> 5));
	tileinfo.group = (attr & 0x0180) >> 7;

	// for out of range tiles, switch to fully transparent data
	if (code == -1)
		tileinfo.pen_data = m_empty_tile;'};
MERGE (n:KG {id: 'handler:cps_state.tilemap1_scan'}) SET n:Handler SET n += {method: 'tilemap1_scan', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 2440, sourceColumn: 1, sourceEndLine: 2444, sourceParameters: 'u32 col, u32 row, u32 num_cols, u32 num_rows', sourceBody: '// logical (col,row) -> memory offset
	return (row & 0x0f) + ((col & 0x3f) << 4) + ((row & 0x30) << 6);'};
MERGE (n:KG {id: 'handler:cps_state.get_tile2_info'}) SET n:Handler SET n += {method: 'get_tile2_info', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 2494, sourceColumn: 1, sourceEndLine: 2511, sourceConstants: ['GFXTYPE_SCROLL3=8'], sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int code = m_scroll[2][2 * tile_index] & 0x3fff;
	const uint16_t attr = m_scroll[2][2 * tile_index + 1];

	code = gfxrom_bank_mapper(GFXTYPE_SCROLL3, code);

	tileinfo.set(3,
			code,
			(attr & 0x1f) + 0x60,
			TILE_FLIPYX((attr & 0x60) >> 5));
	tileinfo.group = (attr & 0x0180) >> 7;

	// for out of range tiles, switch to fully transparent data
	// (but still call tileinfo.set, otherwise problems might occur on boot e.g. unsquad)
	if (code == -1)
		tileinfo.pen_data = m_empty_tile;'};
MERGE (n:KG {id: 'handler:cps_state.tilemap2_scan'}) SET n:Handler SET n += {method: 'tilemap2_scan', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 2446, sourceColumn: 1, sourceEndLine: 2450, sourceParameters: 'u32 col, u32 row, u32 num_cols, u32 num_rows', sourceBody: '// logical (col,row) -> memory offset
	return (row & 0x07) + ((col & 0x3f) << 3) + ((row & 0x38) << 6);'};
MERGE (n:KG {id: 'bank:cps_state.cps1_10MHz/audiobank'}) SET n:MemoryBank SET n += {tag: 'audiobank', member: 'm_audiobank', startEntry: 0, entries: 2, region: 'audiocpu', offset: 65536, stride: 16384, raw: 'm_audiobank->configure_entries(0, 2, memregion("audiocpu")->base() + 0x10000, 0x4000)', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3909, sourceColumn: 1, sourceEndLine: 3947};
MERGE (n:KG {id: 'device:cps_state.cps1_10MHz/maincpu'}) SET n:Device SET n += {type: 'M68000', tag: 'maincpu', clock: 12000000, config: ['M68000(config, m_maincpu, XTAL(10\'000\'000))', 'm_maincpu->set_interrupt_mixer(false)', 'm_maincpu->set_addrmap(AS_PROGRAM, &cps_state::main_map)', 'm_maincpu->set_addrmap(m68000_base_device::AS_CPU_SPACE, &cps_state::cpu_space_map)', 'm_maincpu->set_vblank_int("screen", FUNC(cps_state::cps1_interrupt))', 'm_maincpu->set_clock(XTAL(12\'000\'000))'], sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3912, sourceColumn: 2, sourceEndLine: 3912};
MERGE (n:KG {id: 'device:cps_state.cps1_10MHz/maincpu/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'set_vblank_int', operation: 'set_vblank_int', raw: 'm_maincpu->set_vblank_int("screen", FUNC(cps_state::cps1_interrupt))', ownerTag: 'maincpu', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3916, sourceColumn: 2, sourceEndLine: 3916, targetTag: 'screen', targetClass: 'cps_state', targetMethod: 'cps1_interrupt'};
MERGE (n:KG {id: 'handler:cps_state.cps1_interrupt'}) SET n:Handler SET n += {method: 'cps1_interrupt', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 348, sourceColumn: 1, sourceEndLine: 354, sourceParameters: 'device_t &device', sourceBody: '/* Strider also has a IRQ4 handler. It is input port related, but the game */
	/* works without it. It is the *only* CPS1 game to have that. */
	/* ...until we found out that ganbare relies on it, see below */
	device.execute().set_input_line(M68K_IRQ_IPL1, ASSERT_LINE);'};
MERGE (n:KG {id: 'device:cps_state.cps1_10MHz/audiocpu'}) SET n:Device SET n += {type: 'Z80', tag: 'audiocpu', clock: 3579545, config: ['Z80(config, m_audiocpu, XTAL(3\'579\'545))', 'm_audiocpu->set_addrmap(AS_PROGRAM, &cps_state::sub_map)'], sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3918, sourceColumn: 2, sourceEndLine: 3918};
MERGE (n:KG {id: 'device:cps_state.cps1_10MHz/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(CPS_PIXEL_CLOCK, CPS_HTOTAL, CPS_HBEND, CPS_HBSTART, CPS_VTOTAL, CPS_VBEND, CPS_VBSTART)', 'm_screen->set_screen_update(FUNC(cps_state::screen_update_cps1))', 'm_screen->screen_vblank().set(FUNC(cps_state::screen_vblank_cps1))', 'm_screen->screen_vblank().append(FUNC(cps_state::cps1_objram_latch))', 'm_screen->set_palette(m_palette)'], configCalls: ['set_raw(8000000,512,64,448,262,16,240)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [8000000, 512, 64, 448, 262, 16, 240]};
MERGE (n:KG {id: 'device:cps_state.cps1_10MHz/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(cps_state::screen_update_cps1))', ownerTag: 'screen', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3926, sourceColumn: 2, sourceEndLine: 3926, targetClass: 'cps_state', targetMethod: 'screen_update_cps1'};
MERGE (n:KG {id: 'handler:cps_state.screen_update_cps1'}) SET n:Handler SET n += {method: 'screen_update_cps1', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 3001, sourceColumn: 1, sourceEndLine: 3052, sourceConstants: ['CPS1_ROWSCROLL_OFFS=16', 'CPS1_VIDEOCONTROL=17'], sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'const uint16_t videocontrol = m_cps_a_regs[CPS1_VIDEOCONTROL];

	flip_screen_set(BIT(videocontrol, 15));

	// Get video memory base registers
	cps1_get_video_base();

	// Find the offset of the last sprite in the sprite table
	find_last_sprite();

	cps1_update_transmasks();

	m_bg_tilemap[0]->set_scrollx(0, m_scrollx[0]);
	m_bg_tilemap[0]->set_scrolly(0, m_scrolly[0]);

	if (BIT(videocontrol, 0)) // linescroll enable
	{
		const int scrly = -m_scrolly[1];

		m_bg_tilemap[1]->set_scroll_rows(1024);

		const int otheroffs = m_cps_a_regs[CPS1_ROWSCROLL_OFFS];

		for (int i = 0; i < 256; i++)
			m_bg_tilemap[1]->set_scrollx((i - scrly) & 0x3ff, m_scrollx[1] + m_other[(i + otheroffs) & 0x3ff]);
	}
	else
	{
		m_bg_tilemap[1]->set_scroll_rows(1);
		m_bg_tilemap[1]->set_scrollx(0, m_scrollx[1]);
	}
	m_bg_tilemap[1]->set_scrolly(0, m_scrolly[1]);
	m_bg_tilemap[2]->set_scrollx(0, m_scrollx[2]);
	m_bg_tilemap[2]->set_scrolly(0, m_scrolly[2]);

	// Games use pen 0xbff as background color; this is used in 3wonders,
	// mtwins (explosion during attract), mercs (intermission).
	// Depending on what type of monitor is connected, it can be glitchy on
	// real hardware if 0xbff is not black.
	bitmap.fill(0xbff, cliprect);

	if (m_region_stars)
	{
		cps1_render_stars(screen, bitmap, cliprect);
	}

	render_layers(screen, bitmap, cliprect);

	return 0;'};
MERGE (n:KG {id: 'handler:cps_state.find_last_sprite'}) SET n:Handler SET n += {method: 'find_last_sprite', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 2684, sourceColumn: 1, sourceEndLine: 2717, sourceParameters: '', sourceBody: 'int offset = 0;

	// Locate the end of table marker
	while (offset < m_obj_size / 2)
	{
		if (BIT(m_game_config->bootleg_kludge, 0, 4) == 3)
		{
			// captcommb - same end of sprite marker as CPS-2
			const int marker = m_buffered_obj[offset + 1];
			if (marker >= 0x8000)
			{
				// Marker found. This is the last sprite.
				m_last_sprite_offset = offset - 4;
				return;
			}
		}
		else
		{
			const int marker = m_buffered_obj[offset + 3];
			if ((marker & 0xff00) == 0xff00)
			{
				// Marker found. This is the last sprite.
				m_last_sprite_offset = offset - 4;
				return;
			}
		}

		offset += 4;
	}
	// Sprites must use full sprite RAM
	m_last_sprite_offset = m_obj_size / 2 - 4;'};
MERGE (n:KG {id: 'handler:cps_state.cps1_render_stars'}) SET n:Handler SET n += {method: 'cps1_render_stars', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 2869, sourceColumn: 1, sourceEndLine: 2930, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'uint8_t const *const stars_rom = m_region_stars->base();

	if (!stars_rom && (m_stars_enabled[0] || m_stars_enabled[1]))
	{
		//popmessage("stars enabled but no stars ROM");
		return;
	}

	if (m_stars_enabled[0])
	{
		for (int offs = 0; offs < m_stars_rom_size / 2; offs++)
		{
			int col = stars_rom[8 * offs + 4];
			if ((col & 0x1f) != 0x0f)
			{
				int sx = (offs / 256) * 32;
				int sy = (offs % 256);
				sx = (sx - m_starsx[1] + (col & 0x1f)) & 0x1ff;
				sy = (sy - m_starsy[1]) & 0xff;
				if (flip_screen())
				{
					sx = 512 - sx;
					sy = 256 - sy;
				}

				const int cnt = (screen.frame_number() / 16) % (BIT(col, 7) ? 15 : 16);
				col = ((col & 0xe0) >> 1) + cnt;

				if (cliprect.contains(sx, sy))
					bitmap.pix(sy, sx) = 0xa00 + col;
			}
		}
	}

	if (m_stars_enabled[1])
	{
		for (int offs = 0; offs < m_stars_rom_size / 2; offs++)
		{
			int col = stars_rom[8 * offs];
			if ((col & 0x1f) != 0x0f)
			{
				int sx = (offs / 256) * 32;
				int sy = (offs % 256);
				sx = (sx - m_starsx[0] + (col & 0x1f)) & 0x1ff;
				sy = (sy - m_starsy[0]) & 0xff;
				if (flip_screen())
				{
					sx = 512 - sx;
					sy = 256 - sy;
				}

				const int cnt = (screen.frame_number() / 16) % (BIT(col, 7) ? 15 : 16);
				col = ((col & 0xe0) >> 1) + cnt;

				if (cliprect.contains(sx, sy))
					bitmap.pix(sy, sx) = 0x800 + col;
			}
		}
	}'};
MERGE (n:KG {id: 'handler:cps_state.render_layers'}) SET n:Handler SET n += {method: 'render_layers', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 2970, sourceColumn: 1, sourceEndLine: 2999, sourceConstants: ['CPS1_PALETTE_BASE=5'], sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: '// Draw layers (0 = sprites, 1-3 = tilemaps)
	const uint16_t layercontrol = m_cps_b_regs[m_game_config->layer_control / 2];
	const uint16_t l0 = (layercontrol >> 0x06) & 0x03;
	const uint16_t l1 = (layercontrol >> 0x08) & 0x03;
	const uint16_t l2 = (layercontrol >> 0x0a) & 0x03;
	const uint16_t l3 = (layercontrol >> 0x0c) & 0x03;
	screen.priority().fill(0, cliprect);

	if (BIT(m_game_config->bootleg_kludge, 7))
		cps1_build_palette(cps1_base(CPS1_PALETTE_BASE, m_palette_align));

	cps1_render_layer(screen, bitmap, cliprect, l0, 0);

	if (l1 == 0)
		cps1_render_high_layer(screen, bitmap, cliprect, l0); // prepare mask for sprites

	cps1_render_layer(screen, bitmap, cliprect, l1, 0);

	if (l2 == 0)
		cps1_render_high_layer(screen, bitmap, cliprect, l1); // prepare mask for sprites

	cps1_render_layer(screen, bitmap, cliprect, l2, 0);

	if (l3 == 0)
		cps1_render_high_layer(screen, bitmap, cliprect, l2); // prepare mask for sprites

	cps1_render_layer(screen, bitmap, cliprect, l3, 0);'};
MERGE (n:KG {id: 'handler:cps_state.cps1_render_layer'}) SET n:Handler SET n += {method: 'cps1_render_layer', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 2933, sourceColumn: 1, sourceEndLine: 2946, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect, int layer, int primask', sourceBody: 'switch (layer)
	{
		case 0:
			cps1_render_sprites(screen, bitmap, cliprect);
			break;
		case 1:
		case 2:
		case 3:
			m_bg_tilemap[layer - 1]->draw(screen, bitmap, cliprect, TILEMAP_DRAW_LAYER1, primask);
			break;
	}'};
MERGE (n:KG {id: 'handler:cps_state.cps1_render_sprites'}) SET n:Handler SET n += {method: 'cps1_render_sprites', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 2720, sourceColumn: 1, sourceEndLine: 2865, sourceConstants: ['GFXTYPE_SPRITES=1'], sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: '#define DRAWSPRITE(CODE,COLOR,FLIPX,FLIPY,SX,SY)                    \\
{                                                                   \\
	if (flip_screen())                                           \\
		m_gfxdecode->gfx(2)->prio_transpen(bitmap,\\
				cliprect,                            \\
				CODE,                                               \\
				COLOR,                                              \\
				!(FLIPX), !(FLIPY),                                  \\
				512-16-(SX), 256-16-(SY), screen.priority(), 0x02, 15);                   \\
	else                                                            \\
		m_gfxdecode->gfx(2)->prio_transpen(bitmap,\\
				cliprect,                            \\
				CODE,                                               \\
				COLOR,                                              \\
				FLIPX, FLIPY,                                        \\
				SX, SY, screen.priority(), 0x02,15);          \\
}

	int baseadd;
	uint16_t const *base = m_buffered_obj.get();

	// some sf2 hacks draw the sprites in reverse order
	if (BIT(m_game_config->bootleg_kludge, 6))
	{
		base += m_last_sprite_offset;
		baseadd = -4;
	}
	else
	{
		baseadd = 4;
	}

	for (int i = m_last_sprite_offset; i >= 0; i -= 4)
	{
		const int x = *(base + 0);
		const int y = *(base + 1);
		int code = *(base + 2);
		const int colour = *(base + 3);
		const int col = colour & 0x1f;
		const bool flipx = BIT(colour, 5);
		const bool flipy = BIT(colour, 6);

		code = gfxrom_bank_mapper(GFXTYPE_SPRITES, code);

		if (code != -1)
		{
			if (colour & 0xff00)
			{
				// handle blocked sprites
				int nx = (colour & 0x0f00) >> 8;
				int ny = (colour & 0xf000) >> 12;
				nx++;
				ny++;

				if (flipy)
				{
					// Y flip
					if (flipx)
					{
						for (int nys = 0; nys < ny; nys++)
						{
							const int sy = (y + nys * 16) & 0x1ff;
							for (int nxs = 0; nxs < nx; nxs++)
							{
								const int sx = (x + nxs * 16) & 0x1ff;

								DRAWSPRITE(
										(code & ~0xf) + ((code + (nx - 1) - nxs) & 0xf) + 0x10 * (ny - 1 - nys),
										col,
										1, 1,
										sx, sy);
							}
						}
					}
					else
					{
						for (int nys = 0; nys < ny; nys++)
						{
							const int sy = (y + nys * 16) & 0x1ff;
							for (int nxs = 0; nxs < nx; nxs++)
							{
								const int sx = (x + nxs * 16) & 0x1ff;

								DRAWSPRITE(
										(code & ~0xf) + ((code + nxs) & 0xf) + 0x10 * (ny - 1 - nys),
										col,
										0, 1,
										sx, sy);
							}
						}
					}
				}
				else
				{
					if (flipx)
					{
						for (int nys = 0; nys < ny; nys++)
						{
							const int sy = (y + nys * 16) & 0x1ff;
							for (int nxs = 0; nxs<nx; nxs++)
							{
								const int sx = (x + nxs * 16) & 0x1ff;

								DRAWSPRITE(
										(code & ~0xf) + ((code + (nx - 1) - nxs) & 0xf) + 0x10 * nys,
										col,
										1, 0,
										sx, sy);
							}
						}
					}
					else
					{
						for (int nys = 0; nys < ny; nys++)
						{
							const int sy = (y + nys * 16) & 0x1ff;
							for (int nxs = 0; nxs < nx; nxs++)
							{
								const int sx = (x + nxs * 16) & 0x1ff;

								DRAWSPRITE(
										(code & ~0xf) + ((code + nxs) & 0xf) + 0x10 * nys,
										col,
										0, 0,
										sx, sy);
							}
						}
					}
				}
			}
			else
			{
				// Simple case... 1 sprite
				DRAWSPRITE(
						code,
						col,
						flipx, flipy,
						x & 0x1ff, y & 0x1ff);
			}
		}
		base += baseadd;
	}
#undef DRAWSPRITE'};
MERGE (n:KG {id: 'handler:cps_state.cps1_render_high_layer'}) SET n:Handler SET n += {method: 'cps1_render_high_layer', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 2948, sourceColumn: 1, sourceEndLine: 2961, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect, int layer', sourceBody: 'switch (layer)
	{
		case 0:
			// there are no high priority sprites
			break;
		case 1:
		case 2:
		case 3:
			m_bg_tilemap[layer - 1]->draw(screen, m_dummy_bitmap, cliprect, TILEMAP_DRAW_LAYER0, 1);
			break;
	}'};
MERGE (n:KG {id: 'device:cps_state.cps1_10MHz/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set', raw: 'm_screen->screen_vblank().set(FUNC(cps_state::screen_vblank_cps1))', ownerTag: 'screen', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3927, sourceColumn: 2, sourceEndLine: 3927, targetClass: 'cps_state', targetMethod: 'screen_vblank_cps1'};
MERGE (n:KG {id: 'handler:cps_state.screen_vblank_cps1'}) SET n:Handler SET n += {method: 'screen_vblank_cps1', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 3054, sourceColumn: 1, sourceEndLine: 3061, sourceParameters: 'int state', sourceBody: 'if (state)
	{
		// Get video memory base registers
		cps1_get_video_base();
	}'};
MERGE (n:KG {id: 'device:cps_state.cps1_10MHz/screen/callback:screen:2'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'append', raw: 'm_screen->screen_vblank().append(FUNC(cps_state::cps1_objram_latch))', ownerTag: 'screen', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3928, sourceColumn: 2, sourceEndLine: 3928, targetClass: 'cps_state', targetMethod: 'cps1_objram_latch'};
MERGE (n:KG {id: 'handler:cps_state.cps1_objram_latch'}) SET n:Handler SET n += {method: 'cps1_objram_latch', ownerClass: 'cps_state', sourceFile: 'src/mame/capcom/cps1_v.cpp', sourceLine: 3063, sourceColumn: 1, sourceEndLine: 3070, sourceParameters: 'int state', sourceBody: 'if (state)
	{
		// CPS1 sprites have to be delayed one frame
		memcpy(m_buffered_obj.get(), m_obj, m_obj_size);
	}'};
MERGE (n:KG {id: 'device:cps_state.cps1_10MHz/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_cps1)'], sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3931, sourceColumn: 2, sourceEndLine: 3931, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:cps_state.cps1_10MHz/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, palette_device::BLACK).set_entries(0xc00)'], sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3932, sourceColumn: 2, sourceEndLine: 3932, clockExpr: 'palette_device::BLACK'};
MERGE (n:KG {id: 'device:cps_state.cps1_10MHz/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3935, sourceColumn: 2, sourceEndLine: 3935};
MERGE (n:KG {id: 'device:cps_state.cps1_10MHz/soundlatch1'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch1', clock: null, config: ['GENERIC_LATCH_8(config, m_soundlatch[0])'], sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3937, sourceColumn: 2, sourceEndLine: 3937};
MERGE (n:KG {id: 'device:cps_state.cps1_10MHz/soundlatch2'}) SET n:Device SET n += {type: 'GENERIC_LATCH_8', tag: 'soundlatch2', clock: null, config: ['GENERIC_LATCH_8(config, m_soundlatch[1])'], sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3938, sourceColumn: 2, sourceEndLine: 3938};
MERGE (n:KG {id: 'device:cps_state.cps1_10MHz/2151'}) SET n:Device SET n += {type: 'YM2151', tag: '2151', clock: 3579545, config: ['ym2151_device &ym2151(YM2151(config, "2151", XTAL(3\'579\'545)))', 'ym2151.irq_handler().set_inputline(m_audiocpu, 0)', 'ym2151.add_route(0, "mono", 0.35)', 'ym2151.add_route(1, "mono", 0.35)'], sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3940, sourceColumn: 2, sourceEndLine: 3940};
MERGE (n:KG {id: 'audioroute:device:cps_state.cps1_10MHz/2151/0'}) SET n:AudioRoute SET n += {output: '0', target: 'mono', gain: 0.35, raw: 'ym2151.add_route(0, "mono", 0.35)', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3942, sourceColumn: 2, sourceEndLine: 3942};
MERGE (n:KG {id: 'audioroute:device:cps_state.cps1_10MHz/2151/1'}) SET n:AudioRoute SET n += {output: '1', target: 'mono', gain: 0.35, raw: 'ym2151.add_route(1, "mono", 0.35)', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3943, sourceColumn: 2, sourceEndLine: 3943};
MERGE (n:KG {id: 'device:cps_state.cps1_10MHz/2151/callback:2151:0'}) SET n:Callback SET n += {signal: 'irq_handler', operation: 'set_inputline', raw: 'ym2151.irq_handler().set_inputline(m_audiocpu, 0)', ownerTag: '2151', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3941, sourceColumn: 2, sourceEndLine: 3941, inputLine: '0', targetTag: 'audiocpu'};
MERGE (n:KG {id: 'device:cps_state.cps1_10MHz/oki'}) SET n:Device SET n += {type: 'OKIM6295', tag: 'oki', clock: 1000000, config: ['OKIM6295(config, m_oki, XTAL(16\'000\'000)/4/4, okim6295_device::PIN7_HIGH).add_route(ALL_OUTPUTS, "mono", 0.30)'], sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3946, sourceColumn: 2, sourceEndLine: 3946};
MERGE (n:KG {id: 'audioroute:device:cps_state.cps1_10MHz/oki/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.3, raw: 'OKIM6295(config, m_oki, XTAL(16\'000\'000)/4/4, okim6295_device::PIN7_HIGH).add_route(ALL_OUTPUTS, "mono", 0.30)', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3946, sourceColumn: 2, sourceEndLine: 3946};
MERGE (n:KG {id: 'machine:cps_state.cps1_12MHz'}) SET n:MachineConfig SET n += {cls: 'cps_state', name: 'cps1_12MHz', calls: ['cps1_10MHz'], startHandlers: ['cps_state.video_start'], devicePatches: ['{"tag":"maincpu","config":["m_maincpu->set_clock(XTAL(12\'000\'000))"],"clock":12000000}'], sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3959, sourceColumn: 1, sourceEndLine: 3965};
MERGE (n:KG {id: 'inputs:cps1_3b'}) SET n:InputPorts SET n += {name: 'cps1_3b', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 829, sourceColumn: 8, sourceEndLine: 829};
MERGE (n:KG {id: 'inputs:cps1_3b/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:cps1_3b/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_COIN1'};
MERGE (n:KG {id: 'inputs:cps1_3b/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_COIN2'};
MERGE (n:KG {id: 'inputs:cps1_3b/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_SERVICE1'};
MERGE (n:KG {id: 'inputs:cps1_3b/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:cps1_3b/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_START1'};
MERGE (n:KG {id: 'inputs:cps1_3b/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_START2'};
MERGE (n:KG {id: 'inputs:cps1_3b/IN0/f6'}) SET n:PortField SET n += {kind: 'service', mask: 64, activeLow: true, defaultValue: 64};
MERGE (n:KG {id: 'inputs:cps1_3b/IN0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:cps1_3b/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:cps1_3b/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:cps1_3b/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:cps1_3b/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:cps1_3b/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:cps1_3b/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:cps1_3b/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:cps1_3b/IN1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:cps1_3b/IN1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:cps1_3b/IN1/f8'}) SET n:PortField SET n += {kind: 'bit', mask: 256, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)']};
MERGE (n:KG {id: 'inputs:cps1_3b/IN1/f9'}) SET n:PortField SET n += {kind: 'bit', mask: 512, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)']};
MERGE (n:KG {id: 'inputs:cps1_3b/IN1/f10'}) SET n:PortField SET n += {kind: 'bit', mask: 1024, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)']};
MERGE (n:KG {id: 'inputs:cps1_3b/IN1/f11'}) SET n:PortField SET n += {kind: 'bit', mask: 2048, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_PLAYER(2)']};
MERGE (n:KG {id: 'inputs:cps1_3b/IN1/f12'}) SET n:PortField SET n += {kind: 'bit', mask: 4096, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_PLAYER(2)']};
MERGE (n:KG {id: 'inputs:cps1_3b/IN1/f13'}) SET n:PortField SET n += {kind: 'bit', mask: 8192, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_PLAYER(2)']};
MERGE (n:KG {id: 'inputs:cps1_3b/IN1/f14'}) SET n:PortField SET n += {kind: 'bit', mask: 16384, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_PLAYER(2)']};
MERGE (n:KG {id: 'inputs:cps1_3b/IN1/f15'}) SET n:PortField SET n += {kind: 'bit', mask: 32768, activeLow: true, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:cps1_6b'}) SET n:InputPorts SET n += {name: 'cps1_6b', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 923, sourceColumn: 8, sourceEndLine: 923};
MERGE (n:KG {id: 'inputs:cps1_6b/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: true};
MERGE (n:KG {id: 'inputs:cps1_6b/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_NAME("P1 Jab Punch")', 'PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:cps1_6b/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_NAME("P1 Strong Punch")', 'PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:cps1_6b/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_NAME("P1 Fierce Punch")', 'PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:cps1_6b/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 4096, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_NAME("P2 Jab Punch")', 'PORT_PLAYER(2)']};
MERGE (n:KG {id: 'inputs:cps1_6b/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 8192, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_NAME("P2 Strong Punch")', 'PORT_PLAYER(2)']};
MERGE (n:KG {id: 'inputs:cps1_6b/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 16384, activeLow: true, type: 'IPT_BUTTON3', modifiers: ['PORT_NAME("P2 Fierce Punch")', 'PORT_PLAYER(2)']};
MERGE (n:KG {id: 'inputs:cps1_6b/IN2'}) SET n:Port SET n += {tag: 'IN2', modify: false};
MERGE (n:KG {id: 'inputs:cps1_6b/IN2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_BUTTON4', modifiers: ['PORT_NAME("P1 Short Kick")', 'PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:cps1_6b/IN2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON5', modifiers: ['PORT_NAME("P1 Forward Kick")', 'PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:cps1_6b/IN2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_BUTTON6', modifiers: ['PORT_NAME("P1 Roundhouse Kick")', 'PORT_PLAYER(1)']};
MERGE (n:KG {id: 'inputs:cps1_6b/IN2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:cps1_6b/IN2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON4', modifiers: ['PORT_NAME("P2 Short Kick")', 'PORT_PLAYER(2)']};
MERGE (n:KG {id: 'inputs:cps1_6b/IN2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON5', modifiers: ['PORT_NAME("P2 Forward Kick")', 'PORT_PLAYER(2)']};
MERGE (n:KG {id: 'inputs:cps1_6b/IN2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_BUTTON6', modifiers: ['PORT_NAME("P2 Roundhouse Kick")', 'PORT_PLAYER(2)']};
MERGE (n:KG {id: 'inputs:cps1_6b/IN2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_UNKNOWN'};
MERGE (n:KG {id: 'inputs:sf2'}) SET n:InputPorts SET n += {name: 'sf2', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 2047, sourceColumn: 1, sourceEndLine: 2047};
MERGE (n:KG {id: 'inputs:sf2/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: true};
MERGE (n:KG {id: 'inputs:sf2/IN0/f0'}) SET n:PortField SET n += {kind: 'service', mask: 64, activeLow: true, defaultValue: 64};
MERGE (n:KG {id: 'inputs:sf2/DSWA'}) SET n:Port SET n += {tag: 'DSWA', modify: false};
MERGE (n:KG {id: 'inputs:sf2/DSWA/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 7, name: 'Coin A', defaultValue: 7, location: 'SW(A)" ":1,2,3', settings: ['0=4C 1C', '1=3C 1C', '2=2C 1C', '7=1C 1C', '6=1C 2C', '5=1C 3C', '4=1C 4C', '3=1C 6C']};
MERGE (n:KG {id: 'inputs:sf2/DSWA/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 56, name: 'Coin B', defaultValue: 56, location: 'SW(A)" ":4,5,6', settings: ['0=4C 1C', '8=3C 1C', '16=2C 1C', '56=1C 1C', '48=1C 2C', '40=1C 3C', '32=1C 4C', '24=1C 6C']};
MERGE (n:KG {id: 'inputs:sf2/DSWA/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 64, name: '2 Coins to Start, 1 to Continue', defaultValue: 64, location: 'SW(A):7', settings: ['64=Off', '0=On']};
MERGE (n:KG {id: 'inputs:sf2/DSWA/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Unused'};
MERGE (n:KG {id: 'inputs:sf2/DSWB'}) SET n:Port SET n += {tag: 'DSWB', modify: false};
MERGE (n:KG {id: 'inputs:sf2/DSWB/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 7, name: 'Difficulty', defaultValue: 4, location: 'SW(B)" ":1,2,3', settings: ['7=0 (Easiest)', '6=1', '5=2', '4=3 (Normal)', '3=4', '2=5', '1=6', '0=7 (Hardest)']};
MERGE (n:KG {id: 'inputs:sf2/DSWB/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 8, name: 'Unused'};
MERGE (n:KG {id: 'inputs:sf2/DSWB/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 16, name: 'Unused'};
MERGE (n:KG {id: 'inputs:sf2/DSWB/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 32, name: 'Unused'};
MERGE (n:KG {id: 'inputs:sf2/DSWB/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 64, name: 'Unused'};
MERGE (n:KG {id: 'inputs:sf2/DSWB/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Unused'};
MERGE (n:KG {id: 'inputs:sf2/DSWC'}) SET n:Port SET n += {tag: 'DSWC', modify: false};
MERGE (n:KG {id: 'inputs:sf2/DSWC/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, name: 'Unused'};
MERGE (n:KG {id: 'inputs:sf2/DSWC/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, name: 'Unused'};
MERGE (n:KG {id: 'inputs:sf2/DSWC/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 4, name: 'Free Play', defaultValue: 4, location: 'SW(C):3', settings: ['4=Off', '0=On']};
MERGE (n:KG {id: 'inputs:sf2/DSWC/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 8, name: 'Freeze', defaultValue: 8, location: 'SW(C):4', settings: ['8=Off', '0=On']};
MERGE (n:KG {id: 'inputs:sf2/DSWC/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 16, name: 'Flip Screen', defaultValue: 16, location: 'SW(C):5', settings: ['16=Off', '0=On']};
MERGE (n:KG {id: 'inputs:sf2/DSWC/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 32, name: 'Demo Sounds', defaultValue: 0, location: 'SW(C):6', settings: ['32=Off', '0=On']};
MERGE (n:KG {id: 'inputs:sf2/DSWC/f6'}) SET n:PortField SET n += {kind: 'dip', mask: 64, name: 'Allow Continue', defaultValue: 0, location: 'SW(C):7', settings: ['64=No', '0=Yes']};
MERGE (n:KG {id: 'inputs:sf2/DSWC/f7'}) SET n:PortField SET n += {kind: 'dip', mask: 128, name: 'Game Mode', defaultValue: 128, location: 'SW(C):8', settings: ['128=Game', '0=Test']};
MERGE (n:KG {id: 'gfxlayout:cps1_layout8x8'}) SET n:GfxLayout SET n += {name: 'cps1_layout8x8', width: 8, height: 8, total: 'RGN_FRAC(1,1)', planes: 4, planeOffsets: [24, 16, 8, 0], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 64, 128, 192, 256, 320, 384, 448], charIncrement: 512};
MERGE (n:KG {id: 'gfxlayout:cps1_layout8x8_2'}) SET n:GfxLayout SET n += {name: 'cps1_layout8x8_2', width: 8, height: 8, total: 'RGN_FRAC(1,1)', planes: 4, planeOffsets: [24, 16, 8, 0], xOffsets: [32, 33, 34, 35, 36, 37, 38, 39], yOffsets: [0, 64, 128, 192, 256, 320, 384, 448], charIncrement: 512};
MERGE (n:KG {id: 'gfxlayout:cps1_layout16x16'}) SET n:GfxLayout SET n += {name: 'cps1_layout16x16', width: 16, height: 16, total: 'RGN_FRAC(1,1)', planes: 4, planeOffsets: [24, 16, 8, 0], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 32, 33, 34, 35, 36, 37, 38, 39], yOffsets: [0, 64, 128, 192, 256, 320, 384, 448, 512, 576, 640, 704, 768, 832, 896, 960], charIncrement: 1024};
MERGE (n:KG {id: 'gfxlayout:cps1_layout32x32'}) SET n:GfxLayout SET n += {name: 'cps1_layout32x32', width: 32, height: 32, total: 'RGN_FRAC(1,1)', planes: 4, planeOffsets: [24, 16, 8, 0], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 32, 33, 34, 35, 36, 37, 38, 39, 64, 65, 66, 67, 68, 69, 70, 71, 96, 97, 98, 99, 100, 101, 102, 103], yOffsets: [0, 128, 256, 384, 512, 640, 768, 896, 1024, 1152, 1280, 1408, 1536, 1664, 1792, 1920, 2048, 2176, 2304, 2432, 2560, 2688, 2816, 2944, 3072, 3200, 3328, 3456, 3584, 3712, 3840, 3968], charIncrement: 4096};
MERGE (n:KG {id: 'gfxdecode:gfx_cps1'}) SET n:GfxDecode SET n += {name: 'gfx_cps1', sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3881, sourceColumn: 1, sourceEndLine: 3881};
MERGE (n:KG {id: 'gfxdecode:gfx_cps1/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx', offset: 0, layout: 'cps1_layout8x8', colorBase: 0, colorCount: 128, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_cps1/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx', offset: 0, layout: 'cps1_layout8x8_2', colorBase: 0, colorCount: 128, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_cps1/e2'}) SET n:GfxDecodeEntry SET n += {region: 'gfx', offset: 0, layout: 'cps1_layout16x16', colorBase: 0, colorCount: 128, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_cps1/e3'}) SET n:GfxDecodeEntry SET n += {region: 'gfx', offset: 0, layout: 'cps1_layout32x32', colorBase: 0, colorCount: 128, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:sf2ce'}), (b:KG {id: 'file:src/mame/capcom/cps1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 15084, sourceColumn: 1, sourceEndLine: 15084};
MATCH (a:KG {id: 'game:sf2ce'}), (b:KG {id: 'machine:cps_state.cps1_12MHz'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:sf2ce'}), (b:KG {id: 'inputs:sf2'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:sf2ce'}), (b:KG {id: 'romset:sf2ce'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/capcom/cps1.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/capcom/cps1.cpp'}), (b:KG {id: 'file:cps1.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/capcom/cps1.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/capcom/cps1.cpp'}), (b:KG {id: 'file:machine/eepromser.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/capcom/cps1.cpp'}), (b:KG {id: 'file:machine/upd4701.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/capcom/cps1.cpp'}), (b:KG {id: 'file:sound/ymopm.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/capcom/cps1.cpp'}), (b:KG {id: 'file:kabuki.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/capcom/cps1.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:cps_state.cps1_12MHz'}), (b:KG {id: 'file:src/mame/capcom/cps1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3959, sourceColumn: 1, sourceEndLine: 3965};
MATCH (a:KG {id: 'machine:cps_state.cps1_12MHz'}), (b:KG {id: 'handler:cps_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:cps_state.cps1_12MHz'}), (b:KG {id: 'machine:cps_state.cps1_10MHz'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'inputs:sf2'}), (b:KG {id: 'file:src/mame/capcom/cps1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 2047, sourceColumn: 1, sourceEndLine: 2047};
MATCH (a:KG {id: 'inputs:sf2'}), (b:KG {id: 'inputs:cps1_6b'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:sf2'}), (b:KG {id: 'inputs:sf2/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:sf2'}), (b:KG {id: 'inputs:sf2/DSWA'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:sf2'}), (b:KG {id: 'inputs:sf2/DSWB'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:sf2'}), (b:KG {id: 'inputs:sf2/DSWC'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:sf2ce'}), (b:KG {id: 'file:src/mame/capcom/cps1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 10023, sourceColumn: 1, sourceEndLine: 10023};
MATCH (a:KG {id: 'romset:sf2ce'}), (b:KG {id: 'region:sf2ce/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:sf2ce'}), (b:KG {id: 'region:sf2ce/gfx'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:sf2ce'}), (b:KG {id: 'region:sf2ce/audiocpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:sf2ce'}), (b:KG {id: 'region:sf2ce/oki'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:sf2ce'}), (b:KG {id: 'region:sf2ce/aboardplds'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:sf2ce'}), (b:KG {id: 'region:sf2ce/bboardplds'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:sf2ce'}), (b:KG {id: 'region:sf2ce/cboardplds'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:cps_state.video_start'}), (b:KG {id: 'handler:cps_state.cps1_update_transmasks'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:cps_state.video_start'}), (b:KG {id: 'handler:cps_state.cps1_get_video_base'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:cps_state.video_start'}), (b:KG {id: 'handler:cps_state.get_tile0_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:cps_state.video_start'}), (b:KG {id: 'handler:cps_state.tilemap0_scan'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:cps_state.video_start'}), (b:KG {id: 'handler:cps_state.get_tile1_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:cps_state.video_start'}), (b:KG {id: 'handler:cps_state.tilemap1_scan'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:cps_state.video_start'}), (b:KG {id: 'handler:cps_state.get_tile2_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:cps_state.video_start'}), (b:KG {id: 'handler:cps_state.tilemap2_scan'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:cps_state.cps1_10MHz'}), (b:KG {id: 'file:src/mame/capcom/cps1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3909, sourceColumn: 1, sourceEndLine: 3947};
MATCH (a:KG {id: 'machine:cps_state.cps1_10MHz'}), (b:KG {id: 'handler:cps_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:cps_state.cps1_10MHz'}), (b:KG {id: 'bank:cps_state.cps1_10MHz/audiobank'}) MERGE (a)-[r:HAS_BANK]->(b);
MATCH (a:KG {id: 'machine:cps_state.cps1_10MHz'}), (b:KG {id: 'device:cps_state.cps1_10MHz/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:cps_state.cps1_10MHz'}), (b:KG {id: 'device:cps_state.cps1_10MHz/audiocpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:cps_state.cps1_10MHz'}), (b:KG {id: 'device:cps_state.cps1_10MHz/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:cps_state.cps1_10MHz'}), (b:KG {id: 'device:cps_state.cps1_10MHz/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:cps_state.cps1_10MHz'}), (b:KG {id: 'gfxdecode:gfx_cps1'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:cps_state.cps1_10MHz'}), (b:KG {id: 'device:cps_state.cps1_10MHz/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:cps_state.cps1_10MHz'}), (b:KG {id: 'device:cps_state.cps1_10MHz/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:cps_state.cps1_10MHz'}), (b:KG {id: 'device:cps_state.cps1_10MHz/soundlatch1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:cps_state.cps1_10MHz'}), (b:KG {id: 'device:cps_state.cps1_10MHz/soundlatch2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:cps_state.cps1_10MHz'}), (b:KG {id: 'device:cps_state.cps1_10MHz/2151'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:cps_state.cps1_10MHz'}), (b:KG {id: 'device:cps_state.cps1_10MHz/oki'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:cps1_6b'}), (b:KG {id: 'file:src/mame/capcom/cps1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 923, sourceColumn: 8, sourceEndLine: 923};
MATCH (a:KG {id: 'inputs:cps1_6b'}), (b:KG {id: 'inputs:cps1_3b'}) MERGE (a)-[r:INCLUDES_PORTS]->(b);
MATCH (a:KG {id: 'inputs:cps1_6b'}), (b:KG {id: 'inputs:cps1_6b/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:cps1_6b'}), (b:KG {id: 'inputs:cps1_6b/IN2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:sf2/IN0'}), (b:KG {id: 'inputs:sf2/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sf2/DSWA'}), (b:KG {id: 'inputs:sf2/DSWA/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sf2/DSWA'}), (b:KG {id: 'inputs:sf2/DSWA/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sf2/DSWA'}), (b:KG {id: 'inputs:sf2/DSWA/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sf2/DSWA'}), (b:KG {id: 'inputs:sf2/DSWA/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sf2/DSWB'}), (b:KG {id: 'inputs:sf2/DSWB/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sf2/DSWB'}), (b:KG {id: 'inputs:sf2/DSWB/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sf2/DSWB'}), (b:KG {id: 'inputs:sf2/DSWB/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sf2/DSWB'}), (b:KG {id: 'inputs:sf2/DSWB/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sf2/DSWB'}), (b:KG {id: 'inputs:sf2/DSWB/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sf2/DSWB'}), (b:KG {id: 'inputs:sf2/DSWB/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sf2/DSWC'}), (b:KG {id: 'inputs:sf2/DSWC/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sf2/DSWC'}), (b:KG {id: 'inputs:sf2/DSWC/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sf2/DSWC'}), (b:KG {id: 'inputs:sf2/DSWC/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sf2/DSWC'}), (b:KG {id: 'inputs:sf2/DSWC/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sf2/DSWC'}), (b:KG {id: 'inputs:sf2/DSWC/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sf2/DSWC'}), (b:KG {id: 'inputs:sf2/DSWC/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sf2/DSWC'}), (b:KG {id: 'inputs:sf2/DSWC/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:sf2/DSWC'}), (b:KG {id: 'inputs:sf2/DSWC/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:sf2ce/maincpu'}), (b:KG {id: 'rom:sf2ce/maincpu/s92e_23b.8f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/maincpu'}), (b:KG {id: 'rom:sf2ce/maincpu/s92_22b.7f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/maincpu'}), (b:KG {id: 'rom:sf2ce/maincpu/s92_21a.6f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/gfx'}), (b:KG {id: 'rom:sf2ce/gfx/s92-1m.3a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/gfx'}), (b:KG {id: 'rom:sf2ce/gfx/s92-3m.5a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/gfx'}), (b:KG {id: 'rom:sf2ce/gfx/s92-2m.4a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/gfx'}), (b:KG {id: 'rom:sf2ce/gfx/s92-4m.6a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/gfx'}), (b:KG {id: 'rom:sf2ce/gfx/s92-5m.7a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/gfx'}), (b:KG {id: 'rom:sf2ce/gfx/s92-7m.9a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/gfx'}), (b:KG {id: 'rom:sf2ce/gfx/s92-6m.8a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/gfx'}), (b:KG {id: 'rom:sf2ce/gfx/s92-8m.10a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/gfx'}), (b:KG {id: 'rom:sf2ce/gfx/s92-10m.3c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/gfx'}), (b:KG {id: 'rom:sf2ce/gfx/s92-12m.5c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/gfx'}), (b:KG {id: 'rom:sf2ce/gfx/s92-11m.4c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/gfx'}), (b:KG {id: 'rom:sf2ce/gfx/s92-13m.6c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/audiocpu'}), (b:KG {id: 'rom:sf2ce/audiocpu/s92_09.11a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/oki'}), (b:KG {id: 'rom:sf2ce/oki/s92_18.11c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/oki'}), (b:KG {id: 'rom:sf2ce/oki/s92_19.12c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/aboardplds'}), (b:KG {id: 'rom:sf2ce/aboardplds/buf1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/aboardplds'}), (b:KG {id: 'rom:sf2ce/aboardplds/ioa1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/aboardplds'}), (b:KG {id: 'rom:sf2ce/aboardplds/prg1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/aboardplds'}), (b:KG {id: 'rom:sf2ce/aboardplds/rom1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/aboardplds'}), (b:KG {id: 'rom:sf2ce/aboardplds/sou1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/bboardplds'}), (b:KG {id: 'rom:sf2ce/bboardplds/s9263b.1a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/bboardplds'}), (b:KG {id: 'rom:sf2ce/bboardplds/iob1.12d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/bboardplds'}), (b:KG {id: 'rom:sf2ce/bboardplds/bprg1.11d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/cboardplds'}), (b:KG {id: 'rom:sf2ce/cboardplds/ioc1.ic7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:sf2ce/cboardplds'}), (b:KG {id: 'rom:sf2ce/cboardplds/c632.ic1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'handler:cps_state.cps1_get_video_base'}), (b:KG {id: 'handler:cps_state.cps1_base'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:cps_state.get_tile0_info'}), (b:KG {id: 'handler:cps_state.gfxrom_bank_mapper'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:cps_state.get_tile1_info'}), (b:KG {id: 'handler:cps_state.gfxrom_bank_mapper'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:cps_state.get_tile2_info'}), (b:KG {id: 'handler:cps_state.gfxrom_bank_mapper'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'bank:cps_state.cps1_10MHz/audiobank'}), (b:KG {id: 'file:src/mame/capcom/cps1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3909, sourceColumn: 1, sourceEndLine: 3947};
MATCH (a:KG {id: 'device:cps_state.cps1_10MHz/maincpu'}), (b:KG {id: 'device:cps_state.cps1_10MHz/maincpu/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:cps_state.cps1_10MHz/maincpu'}), (b:KG {id: 'map:cps_state.main_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:cps_state.cps1_10MHz/maincpu'}), (b:KG {id: 'map:cps_state.cpu_space_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'm68000_base_device::AS_CPU_SPACE'};
MATCH (a:KG {id: 'device:cps_state.cps1_10MHz/audiocpu'}), (b:KG {id: 'map:cps_state.sub_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:cps_state.cps1_10MHz/screen'}), (b:KG {id: 'device:cps_state.cps1_10MHz/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:cps_state.cps1_10MHz/screen'}), (b:KG {id: 'device:cps_state.cps1_10MHz/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:cps_state.cps1_10MHz/screen'}), (b:KG {id: 'device:cps_state.cps1_10MHz/screen/callback:screen:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_cps1'}), (b:KG {id: 'file:src/mame/capcom/cps1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 3881, sourceColumn: 1, sourceEndLine: 3881};
MATCH (a:KG {id: 'gfxdecode:gfx_cps1'}), (b:KG {id: 'gfxdecode:gfx_cps1/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_cps1'}), (b:KG {id: 'gfxdecode:gfx_cps1/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_cps1'}), (b:KG {id: 'gfxdecode:gfx_cps1/e2'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_cps1'}), (b:KG {id: 'gfxdecode:gfx_cps1/e3'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:cps_state.cps1_10MHz/2151'}), (b:KG {id: 'audioroute:device:cps_state.cps1_10MHz/2151/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:cps_state.cps1_10MHz/2151'}), (b:KG {id: 'audioroute:device:cps_state.cps1_10MHz/2151/1'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:cps_state.cps1_10MHz/2151'}), (b:KG {id: 'device:cps_state.cps1_10MHz/2151/callback:2151:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:cps_state.cps1_10MHz/oki'}), (b:KG {id: 'audioroute:device:cps_state.cps1_10MHz/oki/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b'}), (b:KG {id: 'file:src/mame/capcom/cps1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 829, sourceColumn: 8, sourceEndLine: 829};
MATCH (a:KG {id: 'inputs:cps1_3b'}), (b:KG {id: 'inputs:cps1_3b/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b'}), (b:KG {id: 'inputs:cps1_3b/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:cps1_6b/IN1'}), (b:KG {id: 'inputs:cps1_6b/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_6b/IN1'}), (b:KG {id: 'inputs:cps1_6b/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_6b/IN1'}), (b:KG {id: 'inputs:cps1_6b/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_6b/IN1'}), (b:KG {id: 'inputs:cps1_6b/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_6b/IN1'}), (b:KG {id: 'inputs:cps1_6b/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_6b/IN1'}), (b:KG {id: 'inputs:cps1_6b/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_6b/IN2'}), (b:KG {id: 'inputs:cps1_6b/IN2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_6b/IN2'}), (b:KG {id: 'inputs:cps1_6b/IN2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_6b/IN2'}), (b:KG {id: 'inputs:cps1_6b/IN2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_6b/IN2'}), (b:KG {id: 'inputs:cps1_6b/IN2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_6b/IN2'}), (b:KG {id: 'inputs:cps1_6b/IN2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_6b/IN2'}), (b:KG {id: 'inputs:cps1_6b/IN2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_6b/IN2'}), (b:KG {id: 'inputs:cps1_6b/IN2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_6b/IN2'}), (b:KG {id: 'inputs:cps1_6b/IN2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'device:cps_state.cps1_10MHz/maincpu/callback:maincpu:0'}), (b:KG {id: 'handler:cps_state.cps1_interrupt'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:cps_state.main_map'}), (b:KG {id: 'file:src/mame/capcom/cps1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 577, sourceColumn: 1, sourceEndLine: 594};
MATCH (a:KG {id: 'map:cps_state.main_map'}), (b:KG {id: 'map:cps_state.main_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cps_state.main_map'}), (b:KG {id: 'map:cps_state.main_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cps_state.main_map'}), (b:KG {id: 'map:cps_state.main_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cps_state.main_map'}), (b:KG {id: 'map:cps_state.main_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cps_state.main_map'}), (b:KG {id: 'map:cps_state.main_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cps_state.main_map'}), (b:KG {id: 'map:cps_state.main_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cps_state.main_map'}), (b:KG {id: 'map:cps_state.main_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cps_state.main_map'}), (b:KG {id: 'map:cps_state.main_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cps_state.main_map'}), (b:KG {id: 'map:cps_state.main_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cps_state.main_map'}), (b:KG {id: 'map:cps_state.main_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cps_state.main_map'}), (b:KG {id: 'map:cps_state.main_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cps_state.cpu_space_map'}), (b:KG {id: 'file:src/mame/capcom/cps1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 419, sourceColumn: 1, sourceEndLine: 422};
MATCH (a:KG {id: 'map:cps_state.cpu_space_map'}), (b:KG {id: 'map:cps_state.cpu_space_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cps_state.sub_map'}), (b:KG {id: 'file:src/mame/capcom/cps1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/capcom/cps1.cpp', sourceLine: 631, sourceColumn: 1, sourceEndLine: 642};
MATCH (a:KG {id: 'map:cps_state.sub_map'}), (b:KG {id: 'map:cps_state.sub_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cps_state.sub_map'}), (b:KG {id: 'map:cps_state.sub_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cps_state.sub_map'}), (b:KG {id: 'map:cps_state.sub_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cps_state.sub_map'}), (b:KG {id: 'map:cps_state.sub_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cps_state.sub_map'}), (b:KG {id: 'map:cps_state.sub_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cps_state.sub_map'}), (b:KG {id: 'map:cps_state.sub_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cps_state.sub_map'}), (b:KG {id: 'map:cps_state.sub_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cps_state.sub_map'}), (b:KG {id: 'map:cps_state.sub_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:cps_state.sub_map'}), (b:KG {id: 'map:cps_state.sub_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:cps_state.cps1_10MHz/screen/callback:screen:0'}), (b:KG {id: 'handler:cps_state.screen_update_cps1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:cps_state.cps1_10MHz/screen/callback:screen:1'}), (b:KG {id: 'handler:cps_state.screen_vblank_cps1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:cps_state.cps1_10MHz/screen/callback:screen:2'}), (b:KG {id: 'handler:cps_state.cps1_objram_latch'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_cps1/e0'}), (b:KG {id: 'gfxlayout:cps1_layout8x8'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_cps1/e1'}), (b:KG {id: 'gfxlayout:cps1_layout8x8_2'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_cps1/e2'}), (b:KG {id: 'gfxlayout:cps1_layout16x16'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_cps1/e3'}), (b:KG {id: 'gfxlayout:cps1_layout32x32'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:cps_state.cps1_10MHz/2151/callback:2151:0'}), (b:KG {id: 'device:cps_state.cps1_10MHz/audiocpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b/IN0'}), (b:KG {id: 'inputs:cps1_3b/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b/IN0'}), (b:KG {id: 'inputs:cps1_3b/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b/IN0'}), (b:KG {id: 'inputs:cps1_3b/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b/IN0'}), (b:KG {id: 'inputs:cps1_3b/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b/IN0'}), (b:KG {id: 'inputs:cps1_3b/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b/IN0'}), (b:KG {id: 'inputs:cps1_3b/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b/IN0'}), (b:KG {id: 'inputs:cps1_3b/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b/IN0'}), (b:KG {id: 'inputs:cps1_3b/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b/IN1'}), (b:KG {id: 'inputs:cps1_3b/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b/IN1'}), (b:KG {id: 'inputs:cps1_3b/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b/IN1'}), (b:KG {id: 'inputs:cps1_3b/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b/IN1'}), (b:KG {id: 'inputs:cps1_3b/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b/IN1'}), (b:KG {id: 'inputs:cps1_3b/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b/IN1'}), (b:KG {id: 'inputs:cps1_3b/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b/IN1'}), (b:KG {id: 'inputs:cps1_3b/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b/IN1'}), (b:KG {id: 'inputs:cps1_3b/IN1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b/IN1'}), (b:KG {id: 'inputs:cps1_3b/IN1/f8'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b/IN1'}), (b:KG {id: 'inputs:cps1_3b/IN1/f9'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b/IN1'}), (b:KG {id: 'inputs:cps1_3b/IN1/f10'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b/IN1'}), (b:KG {id: 'inputs:cps1_3b/IN1/f11'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b/IN1'}), (b:KG {id: 'inputs:cps1_3b/IN1/f12'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b/IN1'}), (b:KG {id: 'inputs:cps1_3b/IN1/f13'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b/IN1'}), (b:KG {id: 'inputs:cps1_3b/IN1/f14'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:cps1_3b/IN1'}), (b:KG {id: 'inputs:cps1_3b/IN1/f15'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'map:cps_state.main_map/range2'}), (b:KG {id: 'handler:cps_state.cps1_dsw_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:cps_state.main_map/range4'}), (b:KG {id: 'handler:cps_state.cps1_coinctrl_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:cps_state.main_map/range5'}), (b:KG {id: 'handler:cps_state.cps1_cps_a_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:cps_state.main_map/range6'}), (b:KG {id: 'handler:cps_state.cps1_cps_b_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:cps_state.main_map/range6'}), (b:KG {id: 'handler:cps_state.cps1_cps_b_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:cps_state.main_map/range7'}), (b:KG {id: 'handler:cps_state.cps1_soundlatch_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:cps_state.main_map/range8'}), (b:KG {id: 'handler:cps_state.cps1_soundlatch2_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:cps_state.main_map/range9'}), (b:KG {id: 'handler:cps_state.cps1_gfxram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:cps_state.cpu_space_map/range0'}), (b:KG {id: 'handler:cps_state.irqack_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:cps_state.sub_map/range3'}), (b:KG {id: 'handler:ym2151_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: '2151'};
MATCH (a:KG {id: 'map:cps_state.sub_map/range3'}), (b:KG {id: 'handler:ym2151_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: '2151'};
MATCH (a:KG {id: 'map:cps_state.sub_map/range4'}), (b:KG {id: 'handler:okim6295_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'oki'};
MATCH (a:KG {id: 'map:cps_state.sub_map/range4'}), (b:KG {id: 'handler:okim6295_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'oki'};
MATCH (a:KG {id: 'map:cps_state.sub_map/range5'}), (b:KG {id: 'handler:cps_state.cps1_snd_bankswitch_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:cps_state.sub_map/range6'}), (b:KG {id: 'handler:cps_state.cps1_oki_pin7_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:cps_state.sub_map/range7'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'soundlatch1'};
MATCH (a:KG {id: 'map:cps_state.sub_map/range8'}), (b:KG {id: 'handler:generic_latch_8_device.read'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: 'soundlatch2'};
MATCH (a:KG {id: 'handler:cps_state.screen_update_cps1'}), (b:KG {id: 'handler:cps_state.cps1_get_video_base'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:cps_state.screen_update_cps1'}), (b:KG {id: 'handler:cps_state.find_last_sprite'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:cps_state.screen_update_cps1'}), (b:KG {id: 'handler:cps_state.cps1_update_transmasks'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:cps_state.screen_update_cps1'}), (b:KG {id: 'handler:cps_state.cps1_render_stars'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:cps_state.screen_update_cps1'}), (b:KG {id: 'handler:cps_state.render_layers'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:cps_state.screen_vblank_cps1'}), (b:KG {id: 'handler:cps_state.cps1_get_video_base'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:cps1_layout8x8'}), (b:KG {id: 'file:src/mame/capcom/cps1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:cps1_layout8x8_2'}), (b:KG {id: 'file:src/mame/capcom/cps1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:cps1_layout16x16'}), (b:KG {id: 'file:src/mame/capcom/cps1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:cps1_layout32x32'}), (b:KG {id: 'file:src/mame/capcom/cps1.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'handler:cps_state.cps1_cps_a_w'}), (b:KG {id: 'handler:cps_state.cps1_build_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:cps_state.cps1_cps_a_w'}), (b:KG {id: 'handler:cps_state.cps1_base'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:cps_state.render_layers'}), (b:KG {id: 'handler:cps_state.cps1_render_layer'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:cps_state.render_layers'}), (b:KG {id: 'handler:cps_state.cps1_build_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:cps_state.render_layers'}), (b:KG {id: 'handler:cps_state.cps1_base'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:cps_state.render_layers'}), (b:KG {id: 'handler:cps_state.cps1_render_high_layer'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:cps_state.cps1_render_layer'}), (b:KG {id: 'handler:cps_state.cps1_render_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:cps_state.cps1_render_sprites'}), (b:KG {id: 'handler:cps_state.gfxrom_bank_mapper'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
