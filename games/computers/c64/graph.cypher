// mamekit knowledge graph — driver src/mame/commodore/c64.cpp
// generated 2026-09-11T11:45:37.662Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/commodore/c64.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/commodore/c64.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:softlist_dev.h'}) SET n:SourceFile SET n += {path: 'softlist_dev.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:bus/cbmiec/cbmiec.h'}) SET n:SourceFile SET n += {path: 'bus/cbmiec/cbmiec.h', external: true};
MERGE (n:KG {id: 'file:bus/cbmiec/c1541.h'}) SET n:SourceFile SET n += {path: 'bus/cbmiec/c1541.h', external: true};
MERGE (n:KG {id: 'file:bus/c64/exp.h'}) SET n:SourceFile SET n += {path: 'bus/c64/exp.h', external: true};
MERGE (n:KG {id: 'file:bus/vic20/user.h'}) SET n:SourceFile SET n += {path: 'bus/vic20/user.h', external: true};
MERGE (n:KG {id: 'file:bus/pet/cass.h'}) SET n:SourceFile SET n += {path: 'bus/pet/cass.h', external: true};
MERGE (n:KG {id: 'file:bus/vcs_ctrl/ctrl.h'}) SET n:SourceFile SET n += {path: 'bus/vcs_ctrl/ctrl.h', external: true};
MERGE (n:KG {id: 'file:cpu/m6502/m6510.h'}) SET n:SourceFile SET n += {path: 'cpu/m6502/m6510.h', external: true};
MERGE (n:KG {id: 'file:imagedev/snapquik.h'}) SET n:SourceFile SET n += {path: 'imagedev/snapquik.h', external: true};
MERGE (n:KG {id: 'file:cbm_snqk.h'}) SET n:SourceFile SET n += {path: 'cbm_snqk.h', external: true};
MERGE (n:KG {id: 'file:machine/input_merger.h'}) SET n:SourceFile SET n += {path: 'machine/input_merger.h', external: true};
MERGE (n:KG {id: 'file:machine/mos6526.h'}) SET n:SourceFile SET n += {path: 'machine/mos6526.h', external: true};
MERGE (n:KG {id: 'file:machine/pla.h'}) SET n:SourceFile SET n += {path: 'machine/pla.h', external: true};
MERGE (n:KG {id: 'file:machine/ram.h'}) SET n:SourceFile SET n += {path: 'machine/ram.h', external: true};
MERGE (n:KG {id: 'file:sound/mos6581.h'}) SET n:SourceFile SET n += {path: 'sound/mos6581.h', external: true};
MERGE (n:KG {id: 'file:video/mos6566.h'}) SET n:SourceFile SET n += {path: 'video/mos6566.h', external: true};
MERGE (n:KG {id: 'game:c64'}) SET n:Game SET n += {name: 'c64', year: '1982', company: 'Commodore Business Machines', fullname: 'Commodore 64 (NTSC)', monitor: 'ROT0', cls: 'c64_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'computer', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 2294, sourceColumn: 1, sourceEndLine: 2294, classConstants: '{"m_loram":1,"m_hiram":1,"m_charen":1,"m_va14":1,"m_va15":1,"m_cass_rd":1,"m_iec_srq":1}'};
MERGE (n:KG {id: 'romset:c64'}) SET n:RomSet SET n += {name: 'c64', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1949, sourceColumn: 1, sourceEndLine: 1949};
MERGE (n:KG {id: 'region:c64/basic'}) SET n:RomRegion SET n += {tag: 'basic', size: 8192, flags: '0', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1950, sourceColumn: 2, sourceEndLine: 1950};
MERGE (n:KG {id: 'rom:c64/basic/901226-01.u3'}) SET n:Rom SET n += {file: '901226-01.u3', offset: 0, size: 8192, crc: 'f833d117', sha1: '79015323128650c742a3694c9429aa91f355905e', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1951, sourceColumn: 2, sourceEndLine: 1951};
MERGE (n:KG {id: 'region:c64/kernal'}) SET n:RomRegion SET n += {tag: 'kernal', size: 8192, flags: '0', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1953, sourceColumn: 2, sourceEndLine: 1953};
MERGE (n:KG {id: 'rom:c64/kernal/901227-03.u4'}) SET n:Rom SET n += {file: '901227-03.u4', offset: 0, size: 8192, crc: 'dbe3e7c7', sha1: '1d503e56df85a62fee696e7618dc5b4e781df1bb'};
MERGE (n:KG {id: 'region:c64/charom'}) SET n:RomRegion SET n += {tag: 'charom', size: 4096, flags: '0', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 2016, sourceColumn: 2, sourceEndLine: 2016};
MERGE (n:KG {id: 'rom:c64/charom/901225-01.u5'}) SET n:Rom SET n += {file: '901225-01.u5', offset: 0, size: 4096, crc: 'ec4272ee', sha1: 'adc7c31e18c7c7413d54802ef2f4193da14711aa', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 2017, sourceColumn: 2, sourceEndLine: 2017};
MERGE (n:KG {id: 'region:c64/u17'}) SET n:RomRegion SET n += {tag: 'u17', size: 245, flags: '0'};
MERGE (n:KG {id: 'rom:c64/u17/906114-01.u17'}) SET n:Rom SET n += {file: '906114-01.u17', offset: 0, size: 245, crc: '54c89351', sha1: 'efb315f560b6f72444b8f0b2ca4b0ccbcd144a1b', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 2020, sourceColumn: 2, sourceEndLine: 2020};
MERGE (n:KG {id: 'map:c64_state.c64_mem'}) SET n:AddressMap SET n += {cls: 'c64_state', name: 'c64_mem', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 722, sourceColumn: 1, sourceEndLine: 725};
MERGE (n:KG {id: 'map:c64_state.c64_mem/range0'}) SET n:AddressRange SET n += {start: 0, end: 65535, raw: 'map(0x0000, 0xffff).rw(FUNC(c64_state::read), FUNC(c64_state::write))', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 724, sourceColumn: 2, sourceEndLine: 724};
MERGE (n:KG {id: 'handler:c64_state.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 652, sourceColumn: 1, sourceEndLine: 660, sourceParameters: 'offs_t offset', sourceBody: 'int aec = 1, ba = 1;

	// VIC address bus is floating
	offs_t va = 0x3fff;

	return read_memory(offset, va, aec, ba);'};
MERGE (n:KG {id: 'handler:c64_state.read_memory'}) SET n:Handler SET n += {method: 'read_memory', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 489, sourceColumn: 1, sourceEndLine: 573, sourceConstants: ['PLA_OUT_CASRAM=0', 'PLA_OUT_BASIC=1', 'PLA_OUT_KERNAL=2', 'PLA_OUT_CHAROM=3', 'PLA_OUT_IO=5', 'PLA_OUT_ROML=6', 'PLA_OUT_ROMH=7'], sourceParameters: 'offs_t offset, offs_t va, int aec, int ba', sourceBody: 'int rw = 1;
	int io1 = 1, io2 = 1;
	int sphi2 = m_vic->phi0_r();

	int plaout = read_pla(offset, va, rw, !aec, ba);

	uint8_t data = 0xff;

	if (!aec)
	{
		data = m_vic->bus_r();
	}

	if (!BIT(plaout, PLA_OUT_CASRAM))
	{
		if (aec)
		{
			data = m_ram->pointer()[offset];
		}
		else
		{
			data = m_ram->pointer()[(!m_va15 << 15) | (!m_va14 << 14) | va];
		}
	}
	if (!BIT(plaout, PLA_OUT_BASIC))
	{
		data = m_basic[offset & 0x1fff];
	}
	if (!BIT(plaout, PLA_OUT_KERNAL))
	{
		data = m_kernal[offset & 0x1fff];
	}
	if (!BIT(plaout, PLA_OUT_CHAROM))
	{
		data = m_charom[offset & 0xfff];
	}
	if (!BIT(plaout, PLA_OUT_IO))
	{
		switch ((offset >> 8) & 0x0f)
		{
		case 0:
		case 1:
		case 2:
		case 3: // VIC
			data = m_vic->read(offset & 0x3f);
			break;

		case 4:
		case 5:
		case 6:
		case 7: // SID
			data = m_sid->read(offset & 0x1f);
			break;

		case 0x8:
		case 0x9:
		case 0xa:
		case 0xb: // COLOR
			data = m_color_ram[offset & 0x3ff] & 0x0f;
			break;

		case 0xc: // CIA1
			data = m_cia1->read(offset & 0x0f);
			break;

		case 0xd: // CIA2
			data = m_cia2->read(offset & 0x0f);
			break;

		case 0xe: // I/O1
			io1 = 0;
			break;

		case 0xf: // I/O2
			io2 = 0;
			break;
		}
	}

	int roml = BIT(plaout, PLA_OUT_ROML);
	int romh = BIT(plaout, PLA_OUT_ROMH);
	return m_exp->cd_r(offset, data, sphi2, ba, roml, romh, io1, io2);'};
MERGE (n:KG {id: 'handler:c64_state.read_pla'}) SET n:Handler SET n += {method: 'read_pla', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 469, sourceColumn: 1, sourceEndLine: 482, sourceParameters: 'offs_t offset, offs_t va, int rw, int aec, int ba', sourceBody: '//int ba = m_vic->ba_r();
	//int aec = !m_vic->aec_r();
	int sphi2 = m_vic->phi0_r();
	int game = m_exp->game_r(offset, sphi2, ba, rw, m_loram, m_hiram);
	int exrom = m_exp->exrom_r(offset, sphi2, ba, rw, m_loram, m_hiram);
	int cas = 0;

	uint32_t input = BIT(va, 12) << 15 | BIT(va, 13) << 14 | game << 13 | exrom << 12 | rw << 11 | aec << 10 | ba << 9 | BIT(offset, 12) << 8 |
		BIT(offset, 13) << 7 | BIT(offset, 14) << 6 | BIT(offset, 15) << 5 | m_va14 << 4 | m_charen << 3 | m_hiram << 2 | m_loram << 1 | cas;

	return m_pla->read(input);'};
MERGE (n:KG {id: 'handler:c64_state.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 667, sourceColumn: 1, sourceEndLine: 672, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'int aec = 1, ba = 1;

	write_memory(offset, data, aec, ba);'};
MERGE (n:KG {id: 'handler:c64_state.write_memory'}) SET n:Handler SET n += {method: 'write_memory', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 580, sourceColumn: 1, sourceEndLine: 645, sourceConstants: ['PLA_OUT_CASRAM=0', 'PLA_OUT_GRW=4', 'PLA_OUT_IO=5', 'PLA_OUT_ROML=6', 'PLA_OUT_ROMH=7'], sourceParameters: 'offs_t offset, uint8_t data, int aec, int ba', sourceBody: 'int rw = 0;
	offs_t va = 0;
	int io1 = 1, io2 = 1;
	int sphi2 = m_vic->phi0_r();

	int plaout = read_pla(offset, va, rw, !aec, ba);

	if (offset < 0x0002)
	{
		// write to internal CPU register
		data = m_vic->bus_r();
	}

	if (!BIT(plaout, PLA_OUT_CASRAM))
	{
		m_ram->pointer()[offset] = data;
	}
	if (!BIT(plaout, PLA_OUT_IO))
	{
		switch ((offset >> 8) & 0x0f)
		{
		case 0:
		case 1:
		case 2:
		case 3: // VIC
			m_vic->write(offset & 0x3f, data);
			break;

		case 4:
		case 5:
		case 6:
		case 7: // SID
			m_sid->write(offset & 0x1f, data);
			break;

		case 0x8:
		case 0x9:
		case 0xa:
		case 0xb: // COLOR
			if (!BIT(plaout, PLA_OUT_GRW)) m_color_ram[offset & 0x3ff] = data & 0x0f;
			break;

		case 0xc: // CIA1
			m_cia1->write(offset & 0x0f, data);
			break;

		case 0xd: // CIA2
			m_cia2->write(offset & 0x0f, data);
			break;

		case 0xe: // I/O1
			io1 = 0;
			break;

		case 0xf: // I/O2
			io2 = 0;
			break;
		}
	}

	int roml = BIT(plaout, PLA_OUT_ROML);
	int romh = BIT(plaout, PLA_OUT_ROMH);
	m_exp->cd_w(offset, data, sphi2, ba, roml, romh, io1, io2);'};
MERGE (n:KG {id: 'map:c64_state.vic_videoram_map'}) SET n:AddressMap SET n += {cls: 'c64_state', name: 'vic_videoram_map', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 732, sourceColumn: 1, sourceEndLine: 735};
MERGE (n:KG {id: 'map:c64_state.vic_videoram_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 16383, raw: 'map(0x0000, 0x3fff).r(FUNC(c64_state::vic_videoram_r))', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 734, sourceColumn: 2, sourceEndLine: 734};
MERGE (n:KG {id: 'handler:c64_state.vic_videoram_r'}) SET n:Handler SET n += {method: 'vic_videoram_r', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 679, sourceColumn: 1, sourceEndLine: 688, sourceParameters: 'offs_t offset', sourceBody: 'int aec = m_vic->aec_r(), ba = m_vic->ba_r();
	offs_t va = offset;

	// BIT(offset, 15)/BIT(offset, 14) are not connected to VIC so they are floating
	//offset |= 0xc000;

	return read_memory(offset, va, aec, ba);'};
MERGE (n:KG {id: 'map:c64_state.vic_colorram_map'}) SET n:AddressMap SET n += {cls: 'c64_state', name: 'vic_colorram_map', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 742, sourceColumn: 1, sourceEndLine: 745};
MERGE (n:KG {id: 'map:c64_state.vic_colorram_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 1023, raw: 'map(0x000, 0x3ff).r(FUNC(c64_state::vic_colorram_r))', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 744, sourceColumn: 2, sourceEndLine: 744};
MERGE (n:KG {id: 'handler:c64_state.vic_colorram_r'}) SET n:Handler SET n += {method: 'vic_colorram_r', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 695, sourceColumn: 1, sourceEndLine: 710, sourceParameters: 'offs_t offset', sourceBody: 'uint8_t data;

	if (m_vic->aec_r())
	{
		// TODO low nibble of last opcode
		data = 0x0f;
	}
	else
	{
		data = m_color_ram[offset] & 0x0f;
	}

	return data;'};
MERGE (n:KG {id: 'machine:c64_state.ntsc'}) SET n:MachineConfig SET n += {cls: 'c64_state', name: 'ntsc', calls: [], stateMembers: ['{"name":"m_loram","bits":32,"signed":true,"initial":1}', '{"name":"m_hiram","bits":32,"signed":true,"initial":1}', '{"name":"m_charen","bits":32,"signed":true,"initial":1}', '{"name":"m_va14","bits":32,"signed":true,"initial":1}', '{"name":"m_va15","bits":32,"signed":true,"initial":1}', '{"name":"m_exp_dma","bits":32,"signed":true}', '{"name":"m_cass_rd","bits":32,"signed":true,"initial":1}', '{"name":"m_iec_srq","bits":32,"signed":true,"initial":1}', '{"name":"m_user_pa2","bits":32,"signed":true}', '{"name":"m_user_pb","bits":32,"signed":true}'], perfectQuantum: true, resetHandlers: ['c64_state.machine_reset'], sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1494, sourceColumn: 1, sourceEndLine: 1605};
MERGE (n:KG {id: 'handler:c64_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1468, sourceColumn: 1, sourceEndLine: 1482, sourceParameters: '', sourceBody: 'm_maincpu->reset();

	m_vic->reset();
	m_sid->reset();
	m_cia1->reset();
	m_cia2->reset();

	m_iec->reset();
	m_exp->reset();

	m_user->write_3(0);
	m_user->write_3(1);'};
MERGE (n:KG {id: 'softlist:c64_state.ntsc/vic10'}) SET n:SoftwareList SET n += {name: 'vic10', tag: 'cart_list_vic10', status: 'original', filter: 'NTSC'};
MERGE (n:KG {id: 'softlist:c64_state.ntsc/c64_cart'}) SET n:SoftwareList SET n += {name: 'c64_cart', tag: 'cart_list_c64', status: 'original', filter: 'NTSC'};
MERGE (n:KG {id: 'softlist:c64_state.ntsc/c64_cass'}) SET n:SoftwareList SET n += {name: 'c64_cass', tag: 'cass_list', status: 'original', filter: 'NTSC'};
MERGE (n:KG {id: 'softlist:c64_state.ntsc/c64_flop_orig'}) SET n:SoftwareList SET n += {name: 'c64_flop_orig', tag: 'flop525_orig', status: 'original', filter: 'NTSC'};
MERGE (n:KG {id: 'softlist:c64_state.ntsc/c64_flop_misc'}) SET n:SoftwareList SET n += {name: 'c64_flop_misc', tag: 'flop525_misc', status: 'original', filter: 'NTSC'};
MERGE (n:KG {id: 'softlist:c64_state.ntsc/c64_quik'}) SET n:SoftwareList SET n += {name: 'c64_quik', tag: 'quik_list', status: 'original', filter: 'NTSC'};
MERGE (n:KG {id: 'device:c64_state.ntsc/u7'}) SET n:Device SET n += {type: 'M6510', tag: 'u7', clock: 1022727.2142857143, config: ['M6510(config, m_maincpu, XTAL(14\'318\'181)/14)', 'm_maincpu->set_addrmap(AS_PROGRAM, &c64_state::c64_mem)', 'm_maincpu->read_callback().set(FUNC(c64_state::cpu_r))', 'm_maincpu->write_callback().set(FUNC(c64_state::cpu_w))', 'm_maincpu->set_pulls(0x17, 0xc8)', 'm_maincpu->set_dasm_override(FUNC(c64_state::dasm_override))', 'config.set_perfect_quantum(m_maincpu)'], member: 'm_maincpu', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1497, sourceColumn: 2, sourceEndLine: 1497, configCalls: ['set_pulls(23,200)']};
MERGE (n:KG {id: 'device:c64_state.ntsc/u7/callback:u7:0'}) SET n:Callback SET n += {signal: 'read_callback', operation: 'set', raw: 'm_maincpu->read_callback().set(FUNC(c64_state::cpu_r))', ownerTag: 'u7', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1499, sourceColumn: 2, sourceEndLine: 1499, targetClass: 'c64_state', targetMethod: 'cpu_r'};
MERGE (n:KG {id: 'handler:c64_state.cpu_r'}) SET n:Handler SET n += {method: 'cpu_r', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1250, sourceColumn: 1, sourceEndLine: 1270, sourceParameters: '', sourceBody: '/*

	    bit     description

	    P0      1
	    P1      1
	    P2      1
	    P3
	    P4      CASS SENS
	    P5      0

	*/

	uint8_t data = 0x07;

	data |= m_cassette->sense_r() << 4;

	return data;'};
MERGE (n:KG {id: 'device:c64_state.ntsc/u7/callback:u7:1'}) SET n:Callback SET n += {signal: 'write_callback', operation: 'set', raw: 'm_maincpu->write_callback().set(FUNC(c64_state::cpu_w))', ownerTag: 'u7', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1500, sourceColumn: 2, sourceEndLine: 1500, targetClass: 'c64_state', targetMethod: 'cpu_w'};
MERGE (n:KG {id: 'handler:c64_state.cpu_w'}) SET n:Handler SET n += {method: 'cpu_w', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1272, sourceColumn: 1, sourceEndLine: 1297, sourceParameters: 'uint8_t data', sourceBody: '/*

	    bit     description

	    P0      LORAM
	    P1      HIRAM
	    P2      CHAREN
	    P3      CASS WRT
	    P4
	    P5      CASS MOTOR

	*/

	// memory banking
	m_loram = BIT(data, 0);
	m_hiram = BIT(data, 1);
	m_charen = BIT(data, 2);

	// cassette write
	m_cassette->write(BIT(data, 3));

	// cassette motor
	m_cassette->motor_w(BIT(data, 5));'};
MERGE (n:KG {id: 'device:c64_state.ntsc/irq'}) SET n:Device SET n += {type: 'INPUT_MERGER_ANY_HIGH', tag: 'irq', clock: null, config: ['input_merger_device &irq(INPUT_MERGER_ANY_HIGH(config, "irq"))', 'irq.output_handler().set_inputline(m_maincpu, m6510_device::IRQ_LINE)'], sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1505, sourceColumn: 2, sourceEndLine: 1505};
MERGE (n:KG {id: 'device:c64_state.ntsc/irq/callback:irq:0'}) SET n:Callback SET n += {signal: 'output_handler', operation: 'set_inputline', raw: 'irq.output_handler().set_inputline(m_maincpu, m6510_device::IRQ_LINE)', ownerTag: 'irq', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1506, sourceColumn: 2, sourceEndLine: 1506, inputLine: 'm6510_device::IRQ_LINE', targetTag: 'u7'};
MERGE (n:KG {id: 'device:c64_state.ntsc/nmi'}) SET n:Device SET n += {type: 'INPUT_MERGER_ANY_HIGH', tag: 'nmi', clock: null, config: ['INPUT_MERGER_ANY_HIGH(config, m_nmi)', 'm_nmi->output_handler().set_inputline(m_maincpu, m6510_device::NMI_LINE)'], member: 'm_nmi', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1508, sourceColumn: 2, sourceEndLine: 1508};
MERGE (n:KG {id: 'device:c64_state.ntsc/nmi/callback:nmi:0'}) SET n:Callback SET n += {signal: 'output_handler', operation: 'set_inputline', raw: 'm_nmi->output_handler().set_inputline(m_maincpu, m6510_device::NMI_LINE)', ownerTag: 'nmi', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1509, sourceColumn: 2, sourceEndLine: 1509, inputLine: 'm6510_device::NMI_LINE', targetTag: 'u7'};
MERGE (n:KG {id: 'device:c64_state.ntsc/u19'}) SET n:Device SET n += {type: 'MOS6567', tag: 'u19', clock: 1022727.2142857143, config: ['mos6567_device &mos6567(MOS6567(config, MOS6567_TAG, XTAL(14\'318\'181)/14))', 'mos6567.set_cpu(m_maincpu)', 'mos6567.irq_callback().set("irq", FUNC(input_merger_device::in_w<1>))', 'mos6567.set_screen(SCREEN_TAG)', 'mos6567.set_addrmap(0, &c64_state::vic_videoram_map)', 'mos6567.set_addrmap(1, &c64_state::vic_colorram_map)'], member: 'm_vic', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1512, sourceColumn: 2, sourceEndLine: 1512};
MERGE (n:KG {id: 'device:c64_state.ntsc/u19/callback:u19:0'}) SET n:Callback SET n += {signal: 'irq_callback', operation: 'set', raw: 'mos6567.irq_callback().set("irq", FUNC(input_merger_device::in_w<1>))', ownerTag: 'u19', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1514, sourceColumn: 2, sourceEndLine: 1514, targetTag: 'irq', targetClass: 'input_merger_device', targetMethod: 'in_w_1'};
MERGE (n:KG {id: 'handler:input_merger_device.in_w_1'}) SET n:Handler SET n += {method: 'in_w_1', ownerClass: 'input_merger_device', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1838, sourceColumn: 2, sourceEndLine: 1838};
MERGE (n:KG {id: 'device:c64_state.ntsc/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['screen_device &screen(SCREEN(config, SCREEN_TAG, SCREEN_TYPE_RASTER))', 'screen.set_refresh_hz(VIC6567_VRETRACERATE)', 'screen.set_size(VIC6567_COLUMNS, VIC6567_LINES)', 'screen.set_visarea(0, VIC6567_VISIBLECOLUMNS - 1, 0, VIC6567_VISIBLELINES - 1)', 'screen.set_screen_update(MOS6567_TAG, FUNC(mos6567_device::screen_update))'], sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1519, sourceColumn: 2, sourceEndLine: 1519, configCalls: ['set_refresh_hz(59.82610203484728)', 'set_size(512,263)', 'set_visarea(0,417,0,234)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRefreshHz: 59.82610203484728, screenSize: [512, 263], screenVisarea: [0, 417, 0, 234]};
MERGE (n:KG {id: 'device:c64_state.ntsc/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'screen.set_screen_update(MOS6567_TAG, FUNC(mos6567_device::screen_update))', ownerTag: 'screen', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1523, sourceColumn: 2, sourceEndLine: 1523, targetClass: 'mos6567_device', targetMethod: 'screen_update', targetTag: 'u19'};
MERGE (n:KG {id: 'handler:mos6567_device.screen_update'}) SET n:Handler SET n += {method: 'screen_update', ownerClass: 'mos6567_device', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1523, sourceColumn: 2, sourceEndLine: 1523};
MERGE (n:KG {id: 'device:c64_state.ntsc/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1526, sourceColumn: 2, sourceEndLine: 1526};
MERGE (n:KG {id: 'device:c64_state.ntsc/u18'}) SET n:Device SET n += {type: 'MOS6581', tag: 'u18', clock: 1022727.2142857143, config: ['MOS6581(config, m_sid, XTAL(14\'318\'181)/14)', 'm_sid->potx().set(FUNC(c64_state::sid_potx_r))', 'm_sid->poty().set(FUNC(c64_state::sid_poty_r))', 'm_sid->add_route(ALL_OUTPUTS, "mono", 1.00)'], member: 'm_sid', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1527, sourceColumn: 2, sourceEndLine: 1527};
MERGE (n:KG {id: 'audioroute:device:c64_state.ntsc/u18/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 1, raw: 'm_sid->add_route(ALL_OUTPUTS, "mono", 1.00)', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1530, sourceColumn: 2, sourceEndLine: 1530};
MERGE (n:KG {id: 'device:c64_state.ntsc/u18/callback:u18:0'}) SET n:Callback SET n += {signal: 'potx', operation: 'set', raw: 'm_sid->potx().set(FUNC(c64_state::sid_potx_r))', ownerTag: 'u18', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1528, sourceColumn: 2, sourceEndLine: 1528, targetClass: 'c64_state', targetMethod: 'sid_potx_r'};
MERGE (n:KG {id: 'handler:c64_state.sid_potx_r'}) SET n:Handler SET n += {method: 'sid_potx_r', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 911, sourceColumn: 1, sourceEndLine: 938, sourceParameters: '', sourceBody: 'uint8_t data = 0xff;
	vcs_control_port_device *cur1 = m_portswap->read() ? m_joy2 : m_joy1;
	vcs_control_port_device *cur2 = m_portswap->read() ? m_joy1 : m_joy2;

	switch (m_cia1->pa_r() >> 6)
	{
	case 1: data = cur1->read_pot_x(); break;
	case 2: data = cur2->read_pot_x(); break;
	case 3:
		if (cur1->has_pot_x() && cur2->has_pot_x())
		{
			data = 1 / (1 / cur1->read_pot_x() + 1 / cur2->read_pot_x());
		}
		else if (cur1->has_pot_x())
		{
			data = cur1->read_pot_x();
		}
		else if (cur2->has_pot_x())
		{
			data = cur2->read_pot_x();
		}
		break;
	}

	return data;', inputMembers: ['m_portswap=JOYSWAP']};
MERGE (n:KG {id: 'device:c64_state.ntsc/u18/callback:u18:1'}) SET n:Callback SET n += {signal: 'poty', operation: 'set', raw: 'm_sid->poty().set(FUNC(c64_state::sid_poty_r))', ownerTag: 'u18', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1529, sourceColumn: 2, sourceEndLine: 1529, targetClass: 'c64_state', targetMethod: 'sid_poty_r'};
MERGE (n:KG {id: 'handler:c64_state.sid_poty_r'}) SET n:Handler SET n += {method: 'sid_poty_r', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 940, sourceColumn: 1, sourceEndLine: 967, sourceParameters: '', sourceBody: 'uint8_t data = 0xff;
	vcs_control_port_device *cur1 = m_portswap->read() ? m_joy2 : m_joy1;
	vcs_control_port_device *cur2 = m_portswap->read() ? m_joy1 : m_joy2;

	switch (m_cia1->pa_r() >> 6)
	{
	case 1: data = cur1->read_pot_y(); break;
	case 2: data = cur2->read_pot_y(); break;
	case 3:
		if (cur1->has_pot_y() && cur2->has_pot_y())
		{
			data = 1 / (1 / cur1->read_pot_y() + 1 / cur2->read_pot_y());
		}
		else if (cur1->has_pot_y())
		{
			data = cur1->read_pot_y();
		}
		else if (cur2->has_pot_y())
		{
			data = cur2->read_pot_y();
		}
		break;
	}

	return data;', inputMembers: ['m_portswap=JOYSWAP']};
MERGE (n:KG {id: 'device:c64_state.ntsc/u17'}) SET n:Device SET n += {type: 'PLS100', tag: 'u17', clock: null, config: ['PLS100(config, m_pla)'], member: 'm_pla', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1533, sourceColumn: 2, sourceEndLine: 1533};
MERGE (n:KG {id: 'device:c64_state.ntsc/u1'}) SET n:Device SET n += {type: 'MOS6526', tag: 'u1', clock: 1022727.2142857143, config: ['MOS6526(config, m_cia1, XTAL(14\'318\'181)/14)', 'm_cia1->set_tod_clock(60)', 'm_cia1->irq_wr_callback().set("irq", FUNC(input_merger_device::in_w<0>))', 'm_cia1->cnt_wr_callback().set(m_user, FUNC(pet_user_port_device::write_4))', 'm_cia1->sp_wr_callback().set(m_user, FUNC(pet_user_port_device::write_5))', 'm_cia1->pa_rd_callback().set(FUNC(c64_state::cia1_pa_r))', 'm_cia1->pb_rd_callback().set(FUNC(c64_state::cia1_pb_r))', 'm_cia1->pb_wr_callback().set(FUNC(c64_state::cia1_pb_w))'], member: 'm_cia1', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1535, sourceColumn: 2, sourceEndLine: 1535, configCalls: ['set_tod_clock(60)']};
MERGE (n:KG {id: 'device:c64_state.ntsc/u1/callback:u1:0'}) SET n:Callback SET n += {signal: 'irq_wr_callback', operation: 'set', raw: 'm_cia1->irq_wr_callback().set("irq", FUNC(input_merger_device::in_w<0>))', ownerTag: 'u1', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1537, sourceColumn: 2, sourceEndLine: 1537, targetTag: 'irq', targetClass: 'input_merger_device', targetMethod: 'in_w_0'};
MERGE (n:KG {id: 'handler:input_merger_device.in_w_0'}) SET n:Handler SET n += {method: 'in_w_0', ownerClass: 'input_merger_device', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1871, sourceColumn: 2, sourceEndLine: 1871};
MERGE (n:KG {id: 'device:c64_state.ntsc/u1/callback:u1:1'}) SET n:Callback SET n += {signal: 'cnt_wr_callback', operation: 'set', raw: 'm_cia1->cnt_wr_callback().set(m_user, FUNC(pet_user_port_device::write_4))', ownerTag: 'u1', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1538, sourceColumn: 2, sourceEndLine: 1538, targetClass: 'pet_user_port_device', targetMethod: 'write_4', targetTag: 'user'};
MERGE (n:KG {id: 'handler:pet_user_port_device.write_4'}) SET n:Handler SET n += {method: 'write_4', ownerClass: 'pet_user_port_device', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1862, sourceColumn: 2, sourceEndLine: 1862};
MERGE (n:KG {id: 'device:c64_state.ntsc/u1/callback:u1:2'}) SET n:Callback SET n += {signal: 'sp_wr_callback', operation: 'set', raw: 'm_cia1->sp_wr_callback().set(m_user, FUNC(pet_user_port_device::write_5))', ownerTag: 'u1', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1539, sourceColumn: 2, sourceEndLine: 1539, targetClass: 'pet_user_port_device', targetMethod: 'write_5', targetTag: 'user'};
MERGE (n:KG {id: 'handler:pet_user_port_device.write_5'}) SET n:Handler SET n += {method: 'write_5', ownerClass: 'pet_user_port_device', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1863, sourceColumn: 2, sourceEndLine: 1863};
MERGE (n:KG {id: 'device:c64_state.ntsc/u1/callback:u1:3'}) SET n:Callback SET n += {signal: 'pa_rd_callback', operation: 'set', raw: 'm_cia1->pa_rd_callback().set(FUNC(c64_state::cia1_pa_r))', ownerTag: 'u1', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1540, sourceColumn: 2, sourceEndLine: 1540, targetClass: 'c64_state', targetMethod: 'cia1_pa_r'};
MERGE (n:KG {id: 'handler:c64_state.cia1_pa_r'}) SET n:Handler SET n += {method: 'cia1_pa_r', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 974, sourceColumn: 1, sourceEndLine: 1021, sourceParameters: '', sourceBody: '/*

	    bit     description

	    PA0     COL0, JOY B0
	    PA1     COL1, JOY B1
	    PA2     COL2, JOY B2
	    PA3     COL3, JOY B3
	    PA4     COL4, BTNB
	    PA5     COL5
	    PA6     COL6
	    PA7     COL7

	*/

	uint8_t data = 0xff;
	vcs_control_port_device *cur2 = m_portswap->read() ? m_joy1 : m_joy2;

	// joystick
	uint8_t joy_b = cur2->read_joy();

	data &= (0xf0 | (joy_b & 0x0f));
	data &= ~(!BIT(joy_b, 5) << 4);

	// keyboard
	uint8_t cia1_pb = m_cia1->pb_r();
	uint32_t row[8] = { m_row[0]->read(), m_row[1]->read() & m_lock->read(), m_row[2]->read(), m_row[3]->read(),
						m_row[4]->read(), m_row[5]->read(), m_row[6]->read(), m_row[7]->read() };

	for (int i = 0; i < 8; i++)
	{
		if (!BIT(cia1_pb, i))
		{
			if (!BIT(row[7], i)) data &= ~0x80;
			if (!BIT(row[6], i)) data &= ~0x40;
			if (!BIT(row[5], i)) data &= ~0x20;
			if (!BIT(row[4], i)) data &= ~0x10;
			if (!BIT(row[3], i)) data &= ~0x08;
			if (!BIT(row[2], i)) data &= ~0x04;
			if (!BIT(row[1], i)) data &= ~0x02;
			if (!BIT(row[0], i)) data &= ~0x01;
		}
	}

	return data;', inputMembers: ['m_row=ROW0,ROW1,ROW2,ROW3,ROW4,ROW5,ROW6,ROW7', 'm_lock=LOCK', 'm_portswap=JOYSWAP']};
MERGE (n:KG {id: 'device:c64_state.ntsc/u1/callback:u1:4'}) SET n:Callback SET n += {signal: 'pb_rd_callback', operation: 'set', raw: 'm_cia1->pb_rd_callback().set(FUNC(c64_state::cia1_pb_r))', ownerTag: 'u1', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1541, sourceColumn: 2, sourceEndLine: 1541, targetClass: 'c64_state', targetMethod: 'cia1_pb_r'};
MERGE (n:KG {id: 'handler:c64_state.cia1_pb_r'}) SET n:Handler SET n += {method: 'cia1_pb_r', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1043, sourceColumn: 1, sourceEndLine: 1082, sourceParameters: '', sourceBody: '/*

	    bit     description

	    PB0     ROW0, JOY A0
	    PB1     ROW1, JOY A1
	    PB2     ROW2, JOY A2
	    PB3     ROW3, JOY A3
	    PB4     ROW4, BTNA, _LP
	    PB5     ROW5
	    PB6     ROW6
	    PB7     ROW7

	*/

	uint8_t data = 0xff;
	vcs_control_port_device *cur1 = m_portswap->read() ? m_joy2 : m_joy1;

	// joystick
	uint8_t joy_a = cur1->read_joy();

	data &= (0xf0 | (joy_a & 0x0f));
	data &= ~(!BIT(joy_a, 5) << 4);

	// keyboard
	uint8_t cia1_pa = m_cia1->pa_r();

	if (!BIT(cia1_pa, 7)) data &= m_row[7]->read();
	if (!BIT(cia1_pa, 6)) data &= m_row[6]->read();
	if (!BIT(cia1_pa, 5)) data &= m_row[5]->read();
	if (!BIT(cia1_pa, 4)) data &= m_row[4]->read();
	if (!BIT(cia1_pa, 3)) data &= m_row[3]->read();
	if (!BIT(cia1_pa, 2)) data &= m_row[2]->read();
	if (!BIT(cia1_pa, 1)) data &= m_row[1]->read() & m_lock->read();
	if (!BIT(cia1_pa, 0)) data &= m_row[0]->read();

	return data;', inputMembers: ['m_row=ROW0,ROW1,ROW2,ROW3,ROW4,ROW5,ROW6,ROW7', 'm_lock=LOCK', 'm_portswap=JOYSWAP']};
MERGE (n:KG {id: 'device:c64_state.ntsc/u1/callback:u1:5'}) SET n:Callback SET n += {signal: 'pb_wr_callback', operation: 'set', raw: 'm_cia1->pb_wr_callback().set(FUNC(c64_state::cia1_pb_w))', ownerTag: 'u1', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1542, sourceColumn: 2, sourceEndLine: 1542, targetClass: 'c64_state', targetMethod: 'cia1_pb_w'};
MERGE (n:KG {id: 'handler:c64_state.cia1_pb_w'}) SET n:Handler SET n += {method: 'cia1_pb_w', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1084, sourceColumn: 1, sourceEndLine: 1105, sourceParameters: 'uint8_t data', sourceBody: '/*

	    bit     description

	    PB0     ROW0, JOY A0
	    PB1     ROW1, JOY A1
	    PB2     ROW2, JOY A2
	    PB3     ROW3, JOY A3
	    PB4     ROW4, BTNA, _LP
	    PB5     ROW5
	    PB6     ROW6
	    PB7     ROW7

	*/
	vcs_control_port_device *cur1 = m_portswap->read() ? m_joy2 : m_joy1;

	cur1->joy_w(data & 0x1f);

	m_vic->lp_w(BIT(data, 4));', inputMembers: ['m_portswap=JOYSWAP']};
MERGE (n:KG {id: 'device:c64_state.ntsc/u2'}) SET n:Device SET n += {type: 'MOS6526', tag: 'u2', clock: 1022727.2142857143, config: ['MOS6526(config, m_cia2, XTAL(14\'318\'181)/14)', 'm_cia2->set_tod_clock(60)', 'm_cia2->irq_wr_callback().set(m_nmi, FUNC(input_merger_device::in_w<0>))', 'm_cia2->cnt_wr_callback().set(m_user, FUNC(pet_user_port_device::write_6))', 'm_cia2->sp_wr_callback().set(m_user, FUNC(pet_user_port_device::write_7))', 'm_cia2->pa_rd_callback().set(FUNC(c64_state::cia2_pa_r))', 'm_cia2->pa_wr_callback().set(FUNC(c64_state::cia2_pa_w))', 'm_cia2->pb_rd_callback().set(FUNC(c64_state::cia2_pb_r))', 'm_cia2->pb_wr_callback().set(FUNC(c64_state::cia2_pb_w))', 'm_cia2->pc_wr_callback().set(m_user, FUNC(pet_user_port_device::write_8))'], member: 'm_cia2', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1544, sourceColumn: 2, sourceEndLine: 1544, configCalls: ['set_tod_clock(60)']};
MERGE (n:KG {id: 'device:c64_state.ntsc/u2/callback:u2:0'}) SET n:Callback SET n += {signal: 'irq_wr_callback', operation: 'set', raw: 'm_cia2->irq_wr_callback().set(m_nmi, FUNC(input_merger_device::in_w<0>))', ownerTag: 'u2', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1546, sourceColumn: 2, sourceEndLine: 1546, targetClass: 'input_merger_device', targetMethod: 'in_w_0', targetTag: 'nmi'};
MERGE (n:KG {id: 'device:c64_state.ntsc/u2/callback:u2:1'}) SET n:Callback SET n += {signal: 'cnt_wr_callback', operation: 'set', raw: 'm_cia2->cnt_wr_callback().set(m_user, FUNC(pet_user_port_device::write_6))', ownerTag: 'u2', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1547, sourceColumn: 2, sourceEndLine: 1547, targetClass: 'pet_user_port_device', targetMethod: 'write_6', targetTag: 'user'};
MERGE (n:KG {id: 'handler:pet_user_port_device.write_6'}) SET n:Handler SET n += {method: 'write_6', ownerClass: 'pet_user_port_device', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1872, sourceColumn: 2, sourceEndLine: 1872};
MERGE (n:KG {id: 'device:c64_state.ntsc/u2/callback:u2:2'}) SET n:Callback SET n += {signal: 'sp_wr_callback', operation: 'set', raw: 'm_cia2->sp_wr_callback().set(m_user, FUNC(pet_user_port_device::write_7))', ownerTag: 'u2', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1548, sourceColumn: 2, sourceEndLine: 1548, targetClass: 'pet_user_port_device', targetMethod: 'write_7', targetTag: 'user'};
MERGE (n:KG {id: 'handler:pet_user_port_device.write_7'}) SET n:Handler SET n += {method: 'write_7', ownerClass: 'pet_user_port_device', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1873, sourceColumn: 2, sourceEndLine: 1873};
MERGE (n:KG {id: 'device:c64_state.ntsc/u2/callback:u2:3'}) SET n:Callback SET n += {signal: 'pa_rd_callback', operation: 'set', raw: 'm_cia2->pa_rd_callback().set(FUNC(c64_state::cia2_pa_r))', ownerTag: 'u2', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1549, sourceColumn: 2, sourceEndLine: 1549, targetClass: 'c64_state', targetMethod: 'cia2_pa_r'};
MERGE (n:KG {id: 'handler:c64_state.cia2_pa_r'}) SET n:Handler SET n += {method: 'cia2_pa_r', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1170, sourceColumn: 1, sourceEndLine: 1197, sourceConstants: ['CLK=2', 'DATA=3'], sourceParameters: '', sourceBody: '/*

	    bit     description

	    PA0
	    PA1
	    PA2     USER PORT
	    PA3
	    PA4
	    PA5
	    PA6     CLK
	    PA7     DATA

	*/

	uint8_t data = 0;

	// user port
	data |= m_user_pa2 << 2;

	// IEC bus
	data |= m_iec->clk_r() << 6;
	data |= m_iec->data_r() << 7;

	return data;'};
MERGE (n:KG {id: 'device:c64_state.ntsc/u2/callback:u2:4'}) SET n:Callback SET n += {signal: 'pa_wr_callback', operation: 'set', raw: 'm_cia2->pa_wr_callback().set(FUNC(c64_state::cia2_pa_w))', ownerTag: 'u2', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1550, sourceColumn: 2, sourceEndLine: 1550, targetClass: 'c64_state', targetMethod: 'cia2_pa_w'};
MERGE (n:KG {id: 'handler:c64_state.cia2_pa_w'}) SET n:Handler SET n += {method: 'cia2_pa_w', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1199, sourceColumn: 1, sourceEndLine: 1227, sourceConstants: ['ATN=1', 'CLK=2', 'DATA=3', 'OUT=2'], sourceParameters: 'uint8_t data', sourceBody: '/*

	    bit     description

	    PA0     _VA14
	    PA1     _VA15
	    PA2     USER PORT
	    PA3     ATN OUT
	    PA4     CLK OUT
	    PA5     DATA OUT
	    PA6
	    PA7

	*/

	// VIC banking
	m_va14 = BIT(data, 0);
	m_va15 = BIT(data, 1);

	// user port
	m_user->write_m(BIT(data, 2));

	// IEC bus
	m_iec->host_atn_w(!BIT(data, 3));
	m_iec->host_clk_w(!BIT(data, 4));
	m_iec->host_data_w(!BIT(data, 5));'};
MERGE (n:KG {id: 'device:c64_state.ntsc/u2/callback:u2:5'}) SET n:Callback SET n += {signal: 'pb_rd_callback', operation: 'set', raw: 'm_cia2->pb_rd_callback().set(FUNC(c64_state::cia2_pb_r))', ownerTag: 'u2', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1551, sourceColumn: 2, sourceEndLine: 1551, targetClass: 'c64_state', targetMethod: 'cia2_pb_r'};
MERGE (n:KG {id: 'handler:c64_state.cia2_pb_r'}) SET n:Handler SET n += {method: 'cia2_pb_r', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1229, sourceColumn: 1, sourceEndLine: 1232, sourceParameters: '', sourceBody: 'return m_user_pb;'};
MERGE (n:KG {id: 'device:c64_state.ntsc/u2/callback:u2:6'}) SET n:Callback SET n += {signal: 'pb_wr_callback', operation: 'set', raw: 'm_cia2->pb_wr_callback().set(FUNC(c64_state::cia2_pb_w))', ownerTag: 'u2', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1552, sourceColumn: 2, sourceEndLine: 1552, targetClass: 'c64_state', targetMethod: 'cia2_pb_w'};
MERGE (n:KG {id: 'handler:c64_state.cia2_pb_w'}) SET n:Handler SET n += {method: 'cia2_pb_w', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1234, sourceColumn: 1, sourceEndLine: 1244, sourceParameters: 'uint8_t data', sourceBody: 'm_user->write_c((data>>0)&1);
	m_user->write_d((data>>1)&1);
	m_user->write_e((data>>2)&1);
	m_user->write_f((data>>3)&1);
	m_user->write_h((data>>4)&1);
	m_user->write_j((data>>5)&1);
	m_user->write_k((data>>6)&1);
	m_user->write_l((data>>7)&1);'};
MERGE (n:KG {id: 'device:c64_state.ntsc/u2/callback:u2:7'}) SET n:Callback SET n += {signal: 'pc_wr_callback', operation: 'set', raw: 'm_cia2->pc_wr_callback().set(m_user, FUNC(pet_user_port_device::write_8))', ownerTag: 'u2', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1553, sourceColumn: 2, sourceEndLine: 1553, targetClass: 'pet_user_port_device', targetMethod: 'write_8', targetTag: 'user'};
MERGE (n:KG {id: 'handler:pet_user_port_device.write_8'}) SET n:Handler SET n += {method: 'write_8', ownerClass: 'pet_user_port_device', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1878, sourceColumn: 2, sourceEndLine: 1878};
MERGE (n:KG {id: 'device:c64_state.ntsc/tape'}) SET n:Device SET n += {type: 'PET_DATASSETTE_PORT', tag: 'tape', clock: null, config: ['PET_DATASSETTE_PORT(config, m_cassette, cbm_datassette_devices, "c1530")', 'm_cassette->read_handler().set(FUNC(c64_state::cass_rd_w))'], member: 'm_cassette', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1555, sourceColumn: 2, sourceEndLine: 1555, slotOptions: 'cbm_datassette_devices', slotDefault: 'c1530'};
MERGE (n:KG {id: 'device:c64_state.ntsc/tape/callback:tape:0'}) SET n:Callback SET n += {signal: 'read_handler', operation: 'set', raw: 'm_cassette->read_handler().set(FUNC(c64_state::cass_rd_w))', ownerTag: 'tape', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1556, sourceColumn: 2, sourceEndLine: 1556, targetClass: 'c64_state', targetMethod: 'cass_rd_w'};
MERGE (n:KG {id: 'handler:c64_state.cass_rd_w'}) SET n:Handler SET n += {method: 'cass_rd_w', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 155, sourceColumn: 1, sourceEndLine: 155, sourceParameters: 'int state', sourceBody: 'm_cass_rd = state; update_cia1_flag();'};
MERGE (n:KG {id: 'handler:c64_state.update_cia1_flag'}) SET n:Handler SET n += {method: 'update_cia1_flag', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 153, sourceColumn: 1, sourceEndLine: 154, sourceParameters: '', sourceBody: 'm_cia1->flag_w(m_cass_rd & m_iec_srq);'};
MERGE (n:KG {id: 'device:c64_state.ntsc/iec4'}) SET n:Device SET n += {type: 'CBM_IEC_SLOT', tag: 'iec4', clock: 4, config: ['CBM_IEC_SLOT(config, "iec4", 4, cbm_iec_devices, nullptr)']};
MERGE (n:KG {id: 'device:c64_state.ntsc/iec8'}) SET n:Device SET n += {type: 'CBM_IEC_SLOT', tag: 'iec8', clock: null, config: ['CBM_IEC_SLOT(config, "iec8", 8, cbm_iec_devices, "c1541")'], slotOptions: 'cbm_iec_devices', slotDefault: 'c1541'};
MERGE (n:KG {id: 'device:c64_state.ntsc/iec9'}) SET n:Device SET n += {type: 'CBM_IEC_SLOT', tag: 'iec9', clock: 9, config: ['CBM_IEC_SLOT(config, "iec9", 9, cbm_iec_devices, nullptr)']};
MERGE (n:KG {id: 'device:c64_state.ntsc/iec10'}) SET n:Device SET n += {type: 'CBM_IEC_SLOT', tag: 'iec10', clock: 10, config: ['CBM_IEC_SLOT(config, "iec10", 10, cbm_iec_devices, nullptr)']};
MERGE (n:KG {id: 'device:c64_state.ntsc/iec11'}) SET n:Device SET n += {type: 'CBM_IEC_SLOT', tag: 'iec11', clock: 11, config: ['CBM_IEC_SLOT(config, "iec11", 11, cbm_iec_devices, nullptr)']};
MERGE (n:KG {id: 'device:c64_state.ntsc/iec_bus'}) SET n:Device SET n += {type: 'CBM_IEC', tag: 'iec_bus', clock: 0, config: ['CBM_IEC(config, m_iec, 0)', 'm_iec->srq_callback().set(FUNC(c64_state::iec_srq_w))', 'm_iec->data_callback().set(m_user, FUNC(pet_user_port_device::write_9))'], member: 'm_iec'};
MERGE (n:KG {id: 'device:c64_state.ntsc/iec_bus/callback:iec_bus:0'}) SET n:Callback SET n += {signal: 'srq_callback', operation: 'set', raw: 'm_iec->srq_callback().set(FUNC(c64_state::iec_srq_w))', ownerTag: 'iec_bus', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1559, sourceColumn: 2, sourceEndLine: 1559, targetClass: 'c64_state', targetMethod: 'iec_srq_w'};
MERGE (n:KG {id: 'handler:c64_state.iec_srq_w'}) SET n:Handler SET n += {method: 'iec_srq_w', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 156, sourceColumn: 1, sourceEndLine: 156, sourceParameters: 'int state', sourceBody: 'm_iec_srq = state; update_cia1_flag();'};
MERGE (n:KG {id: 'device:c64_state.ntsc/iec_bus/callback:iec_bus:1'}) SET n:Callback SET n += {signal: 'data_callback', operation: 'set', raw: 'm_iec->data_callback().set(m_user, FUNC(pet_user_port_device::write_9))', ownerTag: 'iec_bus', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1560, sourceColumn: 2, sourceEndLine: 1560, targetClass: 'pet_user_port_device', targetMethod: 'write_9', targetTag: 'user'};
MERGE (n:KG {id: 'handler:pet_user_port_device.write_9'}) SET n:Handler SET n += {method: 'write_9', ownerClass: 'pet_user_port_device', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1882, sourceColumn: 2, sourceEndLine: 1882};
MERGE (n:KG {id: 'device:c64_state.ntsc/joy1'}) SET n:Device SET n += {type: 'VCS_CONTROL_PORT', tag: 'joy1', clock: null, config: ['VCS_CONTROL_PORT(config, m_joy1, vcs_control_port_devices, nullptr)', 'm_joy1->trigger_wr_callback().set(MOS6567_TAG, FUNC(mos6567_device::lp_w))'], member: 'm_joy1', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1562, sourceColumn: 2, sourceEndLine: 1562, clockExpr: 'vcs_control_port_devices'};
MERGE (n:KG {id: 'device:c64_state.ntsc/joy1/callback:joy1:0'}) SET n:Callback SET n += {signal: 'trigger_wr_callback', operation: 'set', raw: 'm_joy1->trigger_wr_callback().set(MOS6567_TAG, FUNC(mos6567_device::lp_w))', ownerTag: 'joy1', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1563, sourceColumn: 2, sourceEndLine: 1563, targetClass: 'mos6567_device', targetMethod: 'lp_w', targetTag: 'u19'};
MERGE (n:KG {id: 'handler:mos6567_device.lp_w'}) SET n:Handler SET n += {method: 'lp_w', ownerClass: 'mos6567_device', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1563, sourceColumn: 2, sourceEndLine: 1563};
MERGE (n:KG {id: 'device:c64_state.ntsc/joy2'}) SET n:Device SET n += {type: 'VCS_CONTROL_PORT', tag: 'joy2', clock: null, config: ['VCS_CONTROL_PORT(config, m_joy2, vcs_control_port_devices, "joy")'], member: 'm_joy2', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1564, sourceColumn: 2, sourceEndLine: 1564, slotOptions: 'vcs_control_port_devices', slotDefault: 'joy'};
MERGE (n:KG {id: 'device:c64_state.ntsc/exp'}) SET n:Device SET n += {type: 'C64_EXPANSION_SLOT', tag: 'exp', clock: 1022727.2142857143, config: ['C64_EXPANSION_SLOT(config, m_exp, XTAL(14\'318\'181)/14, c64_expansion_cards, nullptr)', 'm_exp->irq_callback().set("irq", FUNC(input_merger_device::in_w<2>))', 'm_exp->nmi_callback().set(m_nmi, FUNC(input_merger_device::in_w<2>))', 'm_exp->reset_callback().set(FUNC(c64_state::exp_reset_w))', 'm_exp->cd_input_callback().set(FUNC(c64_state::read))', 'm_exp->cd_output_callback().set(FUNC(c64_state::write))', 'm_exp->dma_callback().set(FUNC(c64_state::exp_dma_w))'], member: 'm_exp', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1566, sourceColumn: 2, sourceEndLine: 1566};
MERGE (n:KG {id: 'device:c64_state.ntsc/exp/callback:exp:0'}) SET n:Callback SET n += {signal: 'irq_callback', operation: 'set', raw: 'm_exp->irq_callback().set("irq", FUNC(input_merger_device::in_w<2>))', ownerTag: 'exp', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1567, sourceColumn: 2, sourceEndLine: 1567, targetTag: 'irq', targetClass: 'input_merger_device', targetMethod: 'in_w_2'};
MERGE (n:KG {id: 'handler:input_merger_device.in_w_2'}) SET n:Handler SET n += {method: 'in_w_2', ownerClass: 'input_merger_device', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1890, sourceColumn: 2, sourceEndLine: 1890};
MERGE (n:KG {id: 'device:c64_state.ntsc/exp/callback:exp:1'}) SET n:Callback SET n += {signal: 'nmi_callback', operation: 'set', raw: 'm_exp->nmi_callback().set(m_nmi, FUNC(input_merger_device::in_w<2>))', ownerTag: 'exp', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1568, sourceColumn: 2, sourceEndLine: 1568, targetClass: 'input_merger_device', targetMethod: 'in_w_2', targetTag: 'nmi'};
MERGE (n:KG {id: 'device:c64_state.ntsc/exp/callback:exp:2'}) SET n:Callback SET n += {signal: 'reset_callback', operation: 'set', raw: 'm_exp->reset_callback().set(FUNC(c64_state::exp_reset_w))', ownerTag: 'exp', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1569, sourceColumn: 2, sourceEndLine: 1569, targetClass: 'c64_state', targetMethod: 'exp_reset_w'};
MERGE (n:KG {id: 'handler:c64_state.exp_reset_w'}) SET n:Handler SET n += {method: 'exp_reset_w', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1402, sourceColumn: 1, sourceEndLine: 1408, sourceParameters: 'int state', sourceBody: 'if (!state)
	{
		machine_reset();
	}'};
MERGE (n:KG {id: 'device:c64_state.ntsc/exp/callback:exp:3'}) SET n:Callback SET n += {signal: 'cd_input_callback', operation: 'set', raw: 'm_exp->cd_input_callback().set(FUNC(c64_state::read))', ownerTag: 'exp', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1570, sourceColumn: 2, sourceEndLine: 1570, targetClass: 'c64_state', targetMethod: 'read'};
MERGE (n:KG {id: 'device:c64_state.ntsc/exp/callback:exp:4'}) SET n:Callback SET n += {signal: 'cd_output_callback', operation: 'set', raw: 'm_exp->cd_output_callback().set(FUNC(c64_state::write))', ownerTag: 'exp', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1571, sourceColumn: 2, sourceEndLine: 1571, targetClass: 'c64_state', targetMethod: 'write'};
MERGE (n:KG {id: 'device:c64_state.ntsc/exp/callback:exp:5'}) SET n:Callback SET n += {signal: 'dma_callback', operation: 'set', raw: 'm_exp->dma_callback().set(FUNC(c64_state::exp_dma_w))', ownerTag: 'exp', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1572, sourceColumn: 2, sourceEndLine: 1572, targetClass: 'c64_state', targetMethod: 'exp_dma_w'};
MERGE (n:KG {id: 'handler:c64_state.exp_dma_w'}) SET n:Handler SET n += {method: 'exp_dma_w', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1392, sourceColumn: 1, sourceEndLine: 1400, sourceParameters: 'int state', sourceBody: 'if (m_exp_dma != state)
	{
		m_exp_dma = state;

		m_maincpu->set_input_line(INPUT_LINE_HALT, m_exp_dma);
	}'};
MERGE (n:KG {id: 'device:c64_state.ntsc/user'}) SET n:Device SET n += {type: 'PET_USER_PORT', tag: 'user', clock: null, config: ['PET_USER_PORT(config, m_user, c64_user_port_cards, nullptr)', 'm_user->p3_handler().set(FUNC(c64_state::exp_reset_w))', 'm_user->p4_handler().set(m_cia1, FUNC(mos6526_device::cnt_w))', 'm_user->p5_handler().set(m_cia1, FUNC(mos6526_device::sp_w))', 'm_user->p6_handler().set(m_cia2, FUNC(mos6526_device::cnt_w))', 'm_user->p7_handler().set(m_cia2, FUNC(mos6526_device::sp_w))', 'm_user->p9_handler().set(m_iec, FUNC(cbm_iec_device::host_atn_w))', 'm_user->pb_handler().set(m_cia2, FUNC(mos6526_device::flag_w))', 'm_user->pc_handler().set(FUNC(c64_state::write_user_pb0))', 'm_user->pd_handler().set(FUNC(c64_state::write_user_pb1))', 'm_user->pe_handler().set(FUNC(c64_state::write_user_pb2))', 'm_user->pf_handler().set(FUNC(c64_state::write_user_pb3))', 'm_user->ph_handler().set(FUNC(c64_state::write_user_pb4))', 'm_user->pj_handler().set(FUNC(c64_state::write_user_pb5))', 'm_user->pk_handler().set(FUNC(c64_state::write_user_pb6))', 'm_user->pl_handler().set(FUNC(c64_state::write_user_pb7))', 'm_user->pm_handler().set(FUNC(c64_state::write_user_pa2))'], member: 'm_user', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1574, sourceColumn: 2, sourceEndLine: 1574, clockExpr: 'c64_user_port_cards'};
MERGE (n:KG {id: 'device:c64_state.ntsc/user/callback:user:0'}) SET n:Callback SET n += {signal: 'p3_handler', operation: 'set', raw: 'm_user->p3_handler().set(FUNC(c64_state::exp_reset_w))', ownerTag: 'user', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1575, sourceColumn: 2, sourceEndLine: 1575, targetClass: 'c64_state', targetMethod: 'exp_reset_w'};
MERGE (n:KG {id: 'device:c64_state.ntsc/user/callback:user:1'}) SET n:Callback SET n += {signal: 'p4_handler', operation: 'set', raw: 'm_user->p4_handler().set(m_cia1, FUNC(mos6526_device::cnt_w))', ownerTag: 'user', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1576, sourceColumn: 2, sourceEndLine: 1576, targetClass: 'mos6526_device', targetMethod: 'cnt_w', targetTag: 'u1'};
MERGE (n:KG {id: 'handler:mos6526_device.cnt_w'}) SET n:Handler SET n += {method: 'cnt_w', ownerClass: 'mos6526_device', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1900, sourceColumn: 2, sourceEndLine: 1900};
MERGE (n:KG {id: 'device:c64_state.ntsc/user/callback:user:2'}) SET n:Callback SET n += {signal: 'p5_handler', operation: 'set', raw: 'm_user->p5_handler().set(m_cia1, FUNC(mos6526_device::sp_w))', ownerTag: 'user', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1577, sourceColumn: 2, sourceEndLine: 1577, targetClass: 'mos6526_device', targetMethod: 'sp_w', targetTag: 'u1'};
MERGE (n:KG {id: 'handler:mos6526_device.sp_w'}) SET n:Handler SET n += {method: 'sp_w', ownerClass: 'mos6526_device', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1901, sourceColumn: 2, sourceEndLine: 1901};
MERGE (n:KG {id: 'device:c64_state.ntsc/user/callback:user:3'}) SET n:Callback SET n += {signal: 'p6_handler', operation: 'set', raw: 'm_user->p6_handler().set(m_cia2, FUNC(mos6526_device::cnt_w))', ownerTag: 'user', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1578, sourceColumn: 2, sourceEndLine: 1578, targetClass: 'mos6526_device', targetMethod: 'cnt_w', targetTag: 'u2'};
MERGE (n:KG {id: 'device:c64_state.ntsc/user/callback:user:4'}) SET n:Callback SET n += {signal: 'p7_handler', operation: 'set', raw: 'm_user->p7_handler().set(m_cia2, FUNC(mos6526_device::sp_w))', ownerTag: 'user', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1579, sourceColumn: 2, sourceEndLine: 1579, targetClass: 'mos6526_device', targetMethod: 'sp_w', targetTag: 'u2'};
MERGE (n:KG {id: 'device:c64_state.ntsc/user/callback:user:5'}) SET n:Callback SET n += {signal: 'p9_handler', operation: 'set', raw: 'm_user->p9_handler().set(m_iec, FUNC(cbm_iec_device::host_atn_w))', ownerTag: 'user', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1580, sourceColumn: 2, sourceEndLine: 1580, targetClass: 'cbm_iec_device', targetMethod: 'host_atn_w', targetTag: 'iec_bus'};
MERGE (n:KG {id: 'handler:cbm_iec_device.host_atn_w'}) SET n:Handler SET n += {method: 'host_atn_w', ownerClass: 'cbm_iec_device', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1902, sourceColumn: 2, sourceEndLine: 1902};
MERGE (n:KG {id: 'device:c64_state.ntsc/user/callback:user:6'}) SET n:Callback SET n += {signal: 'pb_handler', operation: 'set', raw: 'm_user->pb_handler().set(m_cia2, FUNC(mos6526_device::flag_w))', ownerTag: 'user', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1581, sourceColumn: 2, sourceEndLine: 1581, targetClass: 'mos6526_device', targetMethod: 'flag_w', targetTag: 'u2'};
MERGE (n:KG {id: 'handler:mos6526_device.flag_w'}) SET n:Handler SET n += {method: 'flag_w', ownerClass: 'mos6526_device', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1903, sourceColumn: 2, sourceEndLine: 1903};
MERGE (n:KG {id: 'device:c64_state.ntsc/user/callback:user:7'}) SET n:Callback SET n += {signal: 'pc_handler', operation: 'set', raw: 'm_user->pc_handler().set(FUNC(c64_state::write_user_pb0))', ownerTag: 'user', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1582, sourceColumn: 2, sourceEndLine: 1582, targetClass: 'c64_state', targetMethod: 'write_user_pb0'};
MERGE (n:KG {id: 'handler:c64_state.write_user_pb0'}) SET n:Handler SET n += {method: 'write_user_pb0', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 145, sourceColumn: 1, sourceEndLine: 145, sourceParameters: 'int state', sourceBody: 'if (state) m_user_pb |= 1; else m_user_pb &= ~1;'};
MERGE (n:KG {id: 'device:c64_state.ntsc/user/callback:user:8'}) SET n:Callback SET n += {signal: 'pd_handler', operation: 'set', raw: 'm_user->pd_handler().set(FUNC(c64_state::write_user_pb1))', ownerTag: 'user', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1583, sourceColumn: 2, sourceEndLine: 1583, targetClass: 'c64_state', targetMethod: 'write_user_pb1'};
MERGE (n:KG {id: 'handler:c64_state.write_user_pb1'}) SET n:Handler SET n += {method: 'write_user_pb1', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 146, sourceColumn: 1, sourceEndLine: 146, sourceParameters: 'int state', sourceBody: 'if (state) m_user_pb |= 2; else m_user_pb &= ~2;'};
MERGE (n:KG {id: 'device:c64_state.ntsc/user/callback:user:9'}) SET n:Callback SET n += {signal: 'pe_handler', operation: 'set', raw: 'm_user->pe_handler().set(FUNC(c64_state::write_user_pb2))', ownerTag: 'user', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1584, sourceColumn: 2, sourceEndLine: 1584, targetClass: 'c64_state', targetMethod: 'write_user_pb2'};
MERGE (n:KG {id: 'handler:c64_state.write_user_pb2'}) SET n:Handler SET n += {method: 'write_user_pb2', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 147, sourceColumn: 1, sourceEndLine: 147, sourceParameters: 'int state', sourceBody: 'if (state) m_user_pb |= 4; else m_user_pb &= ~4;'};
MERGE (n:KG {id: 'device:c64_state.ntsc/user/callback:user:10'}) SET n:Callback SET n += {signal: 'pf_handler', operation: 'set', raw: 'm_user->pf_handler().set(FUNC(c64_state::write_user_pb3))', ownerTag: 'user', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1585, sourceColumn: 2, sourceEndLine: 1585, targetClass: 'c64_state', targetMethod: 'write_user_pb3'};
MERGE (n:KG {id: 'handler:c64_state.write_user_pb3'}) SET n:Handler SET n += {method: 'write_user_pb3', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 148, sourceColumn: 1, sourceEndLine: 148, sourceParameters: 'int state', sourceBody: 'if (state) m_user_pb |= 8; else m_user_pb &= ~8;'};
MERGE (n:KG {id: 'device:c64_state.ntsc/user/callback:user:11'}) SET n:Callback SET n += {signal: 'ph_handler', operation: 'set', raw: 'm_user->ph_handler().set(FUNC(c64_state::write_user_pb4))', ownerTag: 'user', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1586, sourceColumn: 2, sourceEndLine: 1586, targetClass: 'c64_state', targetMethod: 'write_user_pb4'};
MERGE (n:KG {id: 'handler:c64_state.write_user_pb4'}) SET n:Handler SET n += {method: 'write_user_pb4', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 149, sourceColumn: 1, sourceEndLine: 149, sourceParameters: 'int state', sourceBody: 'if (state) m_user_pb |= 16; else m_user_pb &= ~16;'};
MERGE (n:KG {id: 'device:c64_state.ntsc/user/callback:user:12'}) SET n:Callback SET n += {signal: 'pj_handler', operation: 'set', raw: 'm_user->pj_handler().set(FUNC(c64_state::write_user_pb5))', ownerTag: 'user', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1587, sourceColumn: 2, sourceEndLine: 1587, targetClass: 'c64_state', targetMethod: 'write_user_pb5'};
MERGE (n:KG {id: 'handler:c64_state.write_user_pb5'}) SET n:Handler SET n += {method: 'write_user_pb5', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 150, sourceColumn: 1, sourceEndLine: 150, sourceParameters: 'int state', sourceBody: 'if (state) m_user_pb |= 32; else m_user_pb &= ~32;'};
MERGE (n:KG {id: 'device:c64_state.ntsc/user/callback:user:13'}) SET n:Callback SET n += {signal: 'pk_handler', operation: 'set', raw: 'm_user->pk_handler().set(FUNC(c64_state::write_user_pb6))', ownerTag: 'user', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1588, sourceColumn: 2, sourceEndLine: 1588, targetClass: 'c64_state', targetMethod: 'write_user_pb6'};
MERGE (n:KG {id: 'handler:c64_state.write_user_pb6'}) SET n:Handler SET n += {method: 'write_user_pb6', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 151, sourceColumn: 1, sourceEndLine: 151, sourceParameters: 'int state', sourceBody: 'if (state) m_user_pb |= 64; else m_user_pb &= ~64;'};
MERGE (n:KG {id: 'device:c64_state.ntsc/user/callback:user:14'}) SET n:Callback SET n += {signal: 'pl_handler', operation: 'set', raw: 'm_user->pl_handler().set(FUNC(c64_state::write_user_pb7))', ownerTag: 'user', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1589, sourceColumn: 2, sourceEndLine: 1589, targetClass: 'c64_state', targetMethod: 'write_user_pb7'};
MERGE (n:KG {id: 'handler:c64_state.write_user_pb7'}) SET n:Handler SET n += {method: 'write_user_pb7', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 152, sourceColumn: 1, sourceEndLine: 152, sourceParameters: 'int state', sourceBody: 'if (state) m_user_pb |= 128; else m_user_pb &= ~128;'};
MERGE (n:KG {id: 'device:c64_state.ntsc/user/callback:user:15'}) SET n:Callback SET n += {signal: 'pm_handler', operation: 'set', raw: 'm_user->pm_handler().set(FUNC(c64_state::write_user_pa2))', ownerTag: 'user', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1590, sourceColumn: 2, sourceEndLine: 1590, targetClass: 'c64_state', targetMethod: 'write_user_pa2'};
MERGE (n:KG {id: 'handler:c64_state.write_user_pa2'}) SET n:Handler SET n += {method: 'write_user_pa2', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 142, sourceColumn: 30, sourceEndLine: 144, sourceParameters: 'int state', sourceBody: 'm_user_pa2 = state;'};
MERGE (n:KG {id: 'device:c64_state.ntsc/quickload'}) SET n:Device SET n += {type: 'QUICKLOAD', tag: 'quickload', clock: null, config: ['QUICKLOAD(config, "quickload", "p00,prg,t64", CBM_QUICKLOAD_DELAY).set_load_callback(FUNC(c64_state::quickload_c64))'], sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1592, sourceColumn: 2, sourceEndLine: 1592, clockExpr: '"p00,prg,t64"'};
MERGE (n:KG {id: 'device:c64_state.ntsc/quickload/callback:quickload:0'}) SET n:Callback SET n += {signal: 'set_load_callback', delegate: 1, operation: 'set_load_callback', raw: 'QUICKLOAD(config, "quickload", "p00,prg,t64", CBM_QUICKLOAD_DELAY).set_load_callback(FUNC(c64_state::quickload_c64))', ownerTag: 'quickload', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1592, sourceColumn: 2, sourceEndLine: 1592, targetClass: 'c64_state', targetMethod: 'quickload_c64'};
MERGE (n:KG {id: 'handler:c64_state.quickload_c64'}) SET n:Handler SET n += {method: 'quickload_c64', ownerClass: 'c64_state', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1914, sourceColumn: 2, sourceEndLine: 1914};
MERGE (n:KG {id: 'device:c64_state.ntsc/ram'}) SET n:Device SET n += {type: 'RAM', tag: 'ram', clock: null, config: ['RAM(config, RAM_TAG).set_default_size("64K")'], member: 'm_ram', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1604, sourceColumn: 2, sourceEndLine: 1604};
MERGE (n:KG {id: 'inputs:c64'}) SET n:InputPorts SET n += {name: 'c64', sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 762, sourceColumn: 8, sourceEndLine: 762};
MERGE (n:KG {id: 'inputs:c64/ROW0'}) SET n:Port SET n += {tag: 'ROW0', modify: false};
MERGE (n:KG {id: 'inputs:c64/ROW0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("CRSR \\xE2\\x86\\x91 \\xE2\\x86\\x93")', 'PORT_CODE(KEYCODE_DOWN)', 'PORT_CHAR(UCHAR_MAMEKEY(DOWN))', 'PORT_CHAR(UCHAR_MAMEKEY(UP))'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:c64/ROW0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_F3)', 'PORT_CHAR(UCHAR_MAMEKEY(F5))'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:c64/ROW0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_F2)', 'PORT_CHAR(UCHAR_MAMEKEY(F3))'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:c64/ROW0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_F1)', 'PORT_CHAR(UCHAR_MAMEKEY(F1))'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:c64/ROW0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_F4)', 'PORT_CHAR(UCHAR_MAMEKEY(F7))'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:c64/ROW0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("CRSR \\xE2\\x86\\x90 \\xE2\\x86\\x92")', 'PORT_CODE(KEYCODE_RIGHT)', 'PORT_CHAR(UCHAR_MAMEKEY(RIGHT))', 'PORT_CHAR(UCHAR_MAMEKEY(LEFT))'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:c64/ROW0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("Return")', 'PORT_CODE(KEYCODE_ENTER)', 'PORT_CHAR(13)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:c64/ROW0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("INST DEL")', 'PORT_CODE(KEYCODE_BACKSPACE)', 'PORT_CHAR(8)', 'PORT_CHAR(UCHAR_MAMEKEY(INSERT))'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:c64/ROW1'}) SET n:Port SET n += {tag: 'ROW1', modify: false};
MERGE (n:KG {id: 'inputs:c64/ROW1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("Shift (Left)")', 'PORT_CODE(KEYCODE_LSHIFT)', 'PORT_CHAR(UCHAR_SHIFT_1)'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:c64/ROW1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_E)', 'PORT_CHAR(\'E\')'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:c64/ROW1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_S)', 'PORT_CHAR(\'S\')'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:c64/ROW1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_Z)', 'PORT_CHAR(\'Z\')'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:c64/ROW1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_4)', 'PORT_CHAR(\'4\')', 'PORT_CHAR(\'$\')'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:c64/ROW1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_A)', 'PORT_CHAR(\'A\')'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:c64/ROW1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_W)', 'PORT_CHAR(\'W\')'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:c64/ROW1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_3)', 'PORT_CHAR(\'3\')', 'PORT_CHAR(\'#\')'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:c64/ROW2'}) SET n:Port SET n += {tag: 'ROW2', modify: false};
MERGE (n:KG {id: 'inputs:c64/ROW2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_X)', 'PORT_CHAR(\'X\')'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:c64/ROW2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_T)', 'PORT_CHAR(\'T\')'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:c64/ROW2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_F)', 'PORT_CHAR(\'F\')'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:c64/ROW2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_C)', 'PORT_CHAR(\'C\')'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:c64/ROW2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_6)', 'PORT_CHAR(\'6\')', 'PORT_CHAR(\'&\')'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:c64/ROW2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_D)', 'PORT_CHAR(\'D\')'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:c64/ROW2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_R)', 'PORT_CHAR(\'R\')'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:c64/ROW2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_5)', 'PORT_CHAR(\'5\')', 'PORT_CHAR(\'%\')'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:c64/ROW3'}) SET n:Port SET n += {tag: 'ROW3', modify: false};
MERGE (n:KG {id: 'inputs:c64/ROW3/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_V)', 'PORT_CHAR(\'V\')'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:c64/ROW3/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_U)', 'PORT_CHAR(\'U\')'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:c64/ROW3/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_H)', 'PORT_CHAR(\'H\')'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:c64/ROW3/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_B)', 'PORT_CHAR(\'B\')'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:c64/ROW3/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_8)', 'PORT_CHAR(\'8\')', 'PORT_CHAR'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:c64/ROW3/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_G)', 'PORT_CHAR(\'G\')'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:c64/ROW3/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_Y)', 'PORT_CHAR(\'Y\')'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:c64/ROW3/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_7)', 'PORT_CHAR(\'7\')', 'PORT_CHAR(\'\\\'\')'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:c64/ROW4'}) SET n:Port SET n += {tag: 'ROW4', modify: false};
MERGE (n:KG {id: 'inputs:c64/ROW4/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_N)', 'PORT_CHAR(\'N\')'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:c64/ROW4/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_O)', 'PORT_CHAR(\'O\')'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:c64/ROW4/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_K)', 'PORT_CHAR(\'K\')'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:c64/ROW4/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_M)', 'PORT_CHAR(\'M\')'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:c64/ROW4/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_0)', 'PORT_CHAR(\'0\')'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:c64/ROW4/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_J)', 'PORT_CHAR(\'J\')'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:c64/ROW4/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_I)', 'PORT_CHAR(\'I\')'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:c64/ROW4/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_9)', 'PORT_CHAR(\'9\')', 'PORT_CHAR(\')'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:c64/ROW5'}) SET n:Port SET n += {tag: 'ROW5', modify: false};
MERGE (n:KG {id: 'inputs:c64/ROW5/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_COMMA)', 'PORT_CHAR(\',\')', 'PORT_CHAR(\'<\')'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:c64/ROW5/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_OPENBRACE)', 'PORT_CHAR(\'@\')'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:c64/ROW5/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_COLON)', 'PORT_CHAR(\':\')', 'PORT_CHAR(\'[\')'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:c64/ROW5/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_STOP)', 'PORT_CHAR(\'.\')', 'PORT_CHAR(\'>\')'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:c64/ROW5/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_EQUALS)', 'PORT_CHAR(\'-\')'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:c64/ROW5/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_L)', 'PORT_CHAR(\'L\')'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:c64/ROW5/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_P)', 'PORT_CHAR(\'P\')'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:c64/ROW5/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_MINUS)', 'PORT_CHAR(\'+\')'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:c64/ROW6'}) SET n:Port SET n += {tag: 'ROW6', modify: false};
MERGE (n:KG {id: 'inputs:c64/ROW6/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_SLASH)', 'PORT_CHAR(\'/\')', 'PORT_CHAR(\'?\')'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:c64/ROW6/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("\\xE2\\x86\\x91 \\xCF\\x80")', 'PORT_CODE(KEYCODE_END)', 'PORT_CHAR(0x2191)', 'PORT_CHAR(0x03C0)'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:c64/ROW6/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_BACKSLASH)', 'PORT_CHAR(\'=\')'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:c64/ROW6/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("Shift (Right)")', 'PORT_CODE(KEYCODE_RSHIFT)', 'PORT_CHAR(UCHAR_SHIFT_1)'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:c64/ROW6/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("CLR HOME")', 'PORT_CODE(KEYCODE_HOME)', 'PORT_CHAR(UCHAR_MAMEKEY(HOME))'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:c64/ROW6/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_QUOTE)', 'PORT_CHAR(\';\')', 'PORT_CHAR(\']\')'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:c64/ROW6/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_CLOSEBRACE)', 'PORT_CHAR(\'*\')'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:c64/ROW6/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_PGDN)', 'PORT_CHAR(0xA3)'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:c64/ROW7'}) SET n:Port SET n += {tag: 'ROW7', modify: false};
MERGE (n:KG {id: 'inputs:c64/ROW7/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("RUN STOP")', 'PORT_CODE(KEYCODE_ESC)'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:c64/ROW7/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_Q)', 'PORT_CHAR(\'Q\')'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:c64/ROW7/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("CBM")', 'PORT_CODE(KEYCODE_LALT)'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:c64/ROW7/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_SPACE)', 'PORT_CHAR(\' \')'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:c64/ROW7/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_2)', 'PORT_CHAR(\'2\')', 'PORT_CHAR'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:c64/ROW7/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_LCONTROL)', 'PORT_NAME("CTRL")', 'PORT_CHAR(UCHAR_MAMEKEY(LCONTROL))'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:c64/ROW7/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("\\xE2\\x86\\x90")', 'PORT_CODE(KEYCODE_TILDE)', 'PORT_CHAR(0x2190)'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:c64/ROW7/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_CODE(KEYCODE_1)', 'PORT_CHAR(\'1\')', 'PORT_CHAR(\'!\')'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:c64/RESTORE'}) SET n:Port SET n += {tag: 'RESTORE', modify: false};
MERGE (n:KG {id: 'inputs:c64/RESTORE/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("RESTORE")', 'PORT_CODE(KEYCODE_TAB)', 'PORT_WRITE_LINE_MEMBER(FUNC(c64_state::write_restore))'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:c64/LOCK'}) SET n:Port SET n += {tag: 'LOCK', modify: false};
MERGE (n:KG {id: 'inputs:c64/LOCK/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_KEYBOARD', modifiers: ['PORT_NAME("SHIFT LOCK")', 'PORT_CODE(KEYCODE_CAPSLOCK)', 'PORT_TOGGLE', 'PORT_CHAR(UCHAR_MAMEKEY(CAPSLOCK))'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:c64/LOCK/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 127, activeLow: true, type: 'IPT_UNUSED', defaultValue: 127};
MERGE (n:KG {id: 'inputs:c64/JOYSWAP'}) SET n:Port SET n += {tag: 'JOYSWAP', modify: false};
MERGE (n:KG {id: 'inputs:c64/JOYSWAP/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, name: 'Swap joystick ports', defaultValue: 0, settings: ['1=Joystick in swapped port', '0=Joystick in assigned port']};
MERGE (n:KG {id: 'file:src/devices/bus/vcs_ctrl/joystick.cpp'}) SET n:SourceFile SET n += {path: 'src/devices/bus/vcs_ctrl/joystick.cpp'};
MERGE (n:KG {id: 'inputs:vcs_joystick'}) SET n:InputPorts SET n += {name: 'vcs_joystick'};
MERGE (n:KG {id: 'inputs:vcs_joystick/JOY'}) SET n:Port SET n += {tag: 'JOY', modify: false};
MERGE (n:KG {id: 'inputs:vcs_joystick/JOY/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:vcs_joystick/JOY/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:vcs_joystick/JOY/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:vcs_joystick/JOY/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:vcs_joystick/JOY/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_WRITE_LINE_MEMBER(FUNC(vcs_joystick_device::trigger_w))'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:vcs_joystick/JOY/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 208, activeLow: true, type: 'IPT_UNUSED', defaultValue: 208};
MATCH (a:KG {id: 'game:c64'}), (b:KG {id: 'file:src/mame/commodore/c64.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 2294, sourceColumn: 1, sourceEndLine: 2294};
MATCH (a:KG {id: 'game:c64'}), (b:KG {id: 'machine:c64_state.ntsc'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:c64'}), (b:KG {id: 'inputs:c64'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:c64'}), (b:KG {id: 'romset:c64'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/commodore/c64.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/commodore/c64.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/commodore/c64.cpp'}), (b:KG {id: 'file:softlist_dev.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/commodore/c64.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/commodore/c64.cpp'}), (b:KG {id: 'file:bus/cbmiec/cbmiec.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/commodore/c64.cpp'}), (b:KG {id: 'file:bus/cbmiec/c1541.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/commodore/c64.cpp'}), (b:KG {id: 'file:bus/c64/exp.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/commodore/c64.cpp'}), (b:KG {id: 'file:bus/vic20/user.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/commodore/c64.cpp'}), (b:KG {id: 'file:bus/pet/cass.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/commodore/c64.cpp'}), (b:KG {id: 'file:bus/vcs_ctrl/ctrl.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/commodore/c64.cpp'}), (b:KG {id: 'file:cpu/m6502/m6510.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/commodore/c64.cpp'}), (b:KG {id: 'file:imagedev/snapquik.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/commodore/c64.cpp'}), (b:KG {id: 'file:cbm_snqk.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/commodore/c64.cpp'}), (b:KG {id: 'file:machine/input_merger.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/commodore/c64.cpp'}), (b:KG {id: 'file:machine/mos6526.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/commodore/c64.cpp'}), (b:KG {id: 'file:machine/pla.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/commodore/c64.cpp'}), (b:KG {id: 'file:machine/ram.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/commodore/c64.cpp'}), (b:KG {id: 'file:sound/mos6581.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/commodore/c64.cpp'}), (b:KG {id: 'file:video/mos6566.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'file:src/mame/commodore/c64.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1494, sourceColumn: 1, sourceEndLine: 1605};
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'handler:c64_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'softlist:c64_state.ntsc/vic10'}) MERGE (a)-[r:HAS_SOFTLIST]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'softlist:c64_state.ntsc/c64_cart'}) MERGE (a)-[r:HAS_SOFTLIST]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'softlist:c64_state.ntsc/c64_cass'}) MERGE (a)-[r:HAS_SOFTLIST]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'softlist:c64_state.ntsc/c64_flop_orig'}) MERGE (a)-[r:HAS_SOFTLIST]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'softlist:c64_state.ntsc/c64_flop_misc'}) MERGE (a)-[r:HAS_SOFTLIST]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'softlist:c64_state.ntsc/c64_quik'}) MERGE (a)-[r:HAS_SOFTLIST]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'device:c64_state.ntsc/u7'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'device:c64_state.ntsc/irq'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'device:c64_state.ntsc/nmi'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'device:c64_state.ntsc/u19'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'device:c64_state.ntsc/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'device:c64_state.ntsc/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'device:c64_state.ntsc/u18'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'device:c64_state.ntsc/u17'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'device:c64_state.ntsc/u1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'device:c64_state.ntsc/u2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'device:c64_state.ntsc/tape'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'device:c64_state.ntsc/iec4'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'device:c64_state.ntsc/iec8'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'device:c64_state.ntsc/iec9'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'device:c64_state.ntsc/iec10'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'device:c64_state.ntsc/iec11'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'device:c64_state.ntsc/iec_bus'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'device:c64_state.ntsc/joy1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'device:c64_state.ntsc/joy2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'device:c64_state.ntsc/exp'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'device:c64_state.ntsc/user'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'device:c64_state.ntsc/quickload'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:c64_state.ntsc'}), (b:KG {id: 'device:c64_state.ntsc/ram'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:c64'}), (b:KG {id: 'file:src/mame/commodore/c64.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 762, sourceColumn: 8, sourceEndLine: 762};
MATCH (a:KG {id: 'inputs:c64'}), (b:KG {id: 'inputs:c64/ROW0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:c64'}), (b:KG {id: 'inputs:c64/ROW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:c64'}), (b:KG {id: 'inputs:c64/ROW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:c64'}), (b:KG {id: 'inputs:c64/ROW3'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:c64'}), (b:KG {id: 'inputs:c64/ROW4'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:c64'}), (b:KG {id: 'inputs:c64/ROW5'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:c64'}), (b:KG {id: 'inputs:c64/ROW6'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:c64'}), (b:KG {id: 'inputs:c64/ROW7'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:c64'}), (b:KG {id: 'inputs:c64/RESTORE'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:c64'}), (b:KG {id: 'inputs:c64/LOCK'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:c64'}), (b:KG {id: 'inputs:c64/JOYSWAP'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:c64'}), (b:KG {id: 'file:src/mame/commodore/c64.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 1949, sourceColumn: 1, sourceEndLine: 1949};
MATCH (a:KG {id: 'romset:c64'}), (b:KG {id: 'region:c64/basic'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:c64'}), (b:KG {id: 'region:c64/kernal'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:c64'}), (b:KG {id: 'region:c64/charom'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:c64'}), (b:KG {id: 'region:c64/u17'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u7'}), (b:KG {id: 'device:c64_state.ntsc/u7/callback:u7:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u7'}), (b:KG {id: 'device:c64_state.ntsc/u7/callback:u7:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u7'}), (b:KG {id: 'map:c64_state.c64_mem'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:c64_state.ntsc/irq'}), (b:KG {id: 'device:c64_state.ntsc/irq/callback:irq:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/nmi'}), (b:KG {id: 'device:c64_state.ntsc/nmi/callback:nmi:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u19'}), (b:KG {id: 'device:c64_state.ntsc/u19/callback:u19:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u19'}), (b:KG {id: 'map:c64_state.vic_videoram_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: '0'};
MATCH (a:KG {id: 'device:c64_state.ntsc/u19'}), (b:KG {id: 'map:c64_state.vic_colorram_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: '1'};
MATCH (a:KG {id: 'device:c64_state.ntsc/screen'}), (b:KG {id: 'device:c64_state.ntsc/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u18'}), (b:KG {id: 'audioroute:device:c64_state.ntsc/u18/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u18'}), (b:KG {id: 'device:c64_state.ntsc/u18/callback:u18:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u18'}), (b:KG {id: 'device:c64_state.ntsc/u18/callback:u18:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u1'}), (b:KG {id: 'device:c64_state.ntsc/u1/callback:u1:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u1'}), (b:KG {id: 'device:c64_state.ntsc/u1/callback:u1:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u1'}), (b:KG {id: 'device:c64_state.ntsc/u1/callback:u1:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u1'}), (b:KG {id: 'device:c64_state.ntsc/u1/callback:u1:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u1'}), (b:KG {id: 'device:c64_state.ntsc/u1/callback:u1:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u1'}), (b:KG {id: 'device:c64_state.ntsc/u1/callback:u1:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u2'}), (b:KG {id: 'device:c64_state.ntsc/u2/callback:u2:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u2'}), (b:KG {id: 'device:c64_state.ntsc/u2/callback:u2:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u2'}), (b:KG {id: 'device:c64_state.ntsc/u2/callback:u2:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u2'}), (b:KG {id: 'device:c64_state.ntsc/u2/callback:u2:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u2'}), (b:KG {id: 'device:c64_state.ntsc/u2/callback:u2:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u2'}), (b:KG {id: 'device:c64_state.ntsc/u2/callback:u2:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u2'}), (b:KG {id: 'device:c64_state.ntsc/u2/callback:u2:6'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u2'}), (b:KG {id: 'device:c64_state.ntsc/u2/callback:u2:7'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/tape'}), (b:KG {id: 'device:c64_state.ntsc/tape/callback:tape:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/iec_bus'}), (b:KG {id: 'device:c64_state.ntsc/iec_bus/callback:iec_bus:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/iec_bus'}), (b:KG {id: 'device:c64_state.ntsc/iec_bus/callback:iec_bus:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/joy1'}), (b:KG {id: 'device:c64_state.ntsc/joy1/callback:joy1:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/joy2'}), (b:KG {id: 'inputs:vcs_joystick'}) MERGE (a)-[r:USES_INPUTS]->(b) SET r += {option: 'joy'};
MATCH (a:KG {id: 'device:c64_state.ntsc/exp'}), (b:KG {id: 'device:c64_state.ntsc/exp/callback:exp:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/exp'}), (b:KG {id: 'device:c64_state.ntsc/exp/callback:exp:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/exp'}), (b:KG {id: 'device:c64_state.ntsc/exp/callback:exp:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/exp'}), (b:KG {id: 'device:c64_state.ntsc/exp/callback:exp:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/exp'}), (b:KG {id: 'device:c64_state.ntsc/exp/callback:exp:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/exp'}), (b:KG {id: 'device:c64_state.ntsc/exp/callback:exp:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user'}), (b:KG {id: 'device:c64_state.ntsc/user/callback:user:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user'}), (b:KG {id: 'device:c64_state.ntsc/user/callback:user:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user'}), (b:KG {id: 'device:c64_state.ntsc/user/callback:user:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user'}), (b:KG {id: 'device:c64_state.ntsc/user/callback:user:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user'}), (b:KG {id: 'device:c64_state.ntsc/user/callback:user:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user'}), (b:KG {id: 'device:c64_state.ntsc/user/callback:user:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user'}), (b:KG {id: 'device:c64_state.ntsc/user/callback:user:6'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user'}), (b:KG {id: 'device:c64_state.ntsc/user/callback:user:7'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user'}), (b:KG {id: 'device:c64_state.ntsc/user/callback:user:8'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user'}), (b:KG {id: 'device:c64_state.ntsc/user/callback:user:9'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user'}), (b:KG {id: 'device:c64_state.ntsc/user/callback:user:10'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user'}), (b:KG {id: 'device:c64_state.ntsc/user/callback:user:11'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user'}), (b:KG {id: 'device:c64_state.ntsc/user/callback:user:12'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user'}), (b:KG {id: 'device:c64_state.ntsc/user/callback:user:13'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user'}), (b:KG {id: 'device:c64_state.ntsc/user/callback:user:14'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user'}), (b:KG {id: 'device:c64_state.ntsc/user/callback:user:15'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/quickload'}), (b:KG {id: 'device:c64_state.ntsc/quickload/callback:quickload:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW0'}), (b:KG {id: 'inputs:c64/ROW0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW0'}), (b:KG {id: 'inputs:c64/ROW0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW0'}), (b:KG {id: 'inputs:c64/ROW0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW0'}), (b:KG {id: 'inputs:c64/ROW0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW0'}), (b:KG {id: 'inputs:c64/ROW0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW0'}), (b:KG {id: 'inputs:c64/ROW0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW0'}), (b:KG {id: 'inputs:c64/ROW0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW0'}), (b:KG {id: 'inputs:c64/ROW0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW1'}), (b:KG {id: 'inputs:c64/ROW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW1'}), (b:KG {id: 'inputs:c64/ROW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW1'}), (b:KG {id: 'inputs:c64/ROW1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW1'}), (b:KG {id: 'inputs:c64/ROW1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW1'}), (b:KG {id: 'inputs:c64/ROW1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW1'}), (b:KG {id: 'inputs:c64/ROW1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW1'}), (b:KG {id: 'inputs:c64/ROW1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW1'}), (b:KG {id: 'inputs:c64/ROW1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW2'}), (b:KG {id: 'inputs:c64/ROW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW2'}), (b:KG {id: 'inputs:c64/ROW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW2'}), (b:KG {id: 'inputs:c64/ROW2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW2'}), (b:KG {id: 'inputs:c64/ROW2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW2'}), (b:KG {id: 'inputs:c64/ROW2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW2'}), (b:KG {id: 'inputs:c64/ROW2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW2'}), (b:KG {id: 'inputs:c64/ROW2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW2'}), (b:KG {id: 'inputs:c64/ROW2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW3'}), (b:KG {id: 'inputs:c64/ROW3/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW3'}), (b:KG {id: 'inputs:c64/ROW3/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW3'}), (b:KG {id: 'inputs:c64/ROW3/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW3'}), (b:KG {id: 'inputs:c64/ROW3/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW3'}), (b:KG {id: 'inputs:c64/ROW3/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW3'}), (b:KG {id: 'inputs:c64/ROW3/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW3'}), (b:KG {id: 'inputs:c64/ROW3/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW3'}), (b:KG {id: 'inputs:c64/ROW3/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW4'}), (b:KG {id: 'inputs:c64/ROW4/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW4'}), (b:KG {id: 'inputs:c64/ROW4/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW4'}), (b:KG {id: 'inputs:c64/ROW4/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW4'}), (b:KG {id: 'inputs:c64/ROW4/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW4'}), (b:KG {id: 'inputs:c64/ROW4/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW4'}), (b:KG {id: 'inputs:c64/ROW4/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW4'}), (b:KG {id: 'inputs:c64/ROW4/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW4'}), (b:KG {id: 'inputs:c64/ROW4/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW5'}), (b:KG {id: 'inputs:c64/ROW5/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW5'}), (b:KG {id: 'inputs:c64/ROW5/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW5'}), (b:KG {id: 'inputs:c64/ROW5/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW5'}), (b:KG {id: 'inputs:c64/ROW5/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW5'}), (b:KG {id: 'inputs:c64/ROW5/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW5'}), (b:KG {id: 'inputs:c64/ROW5/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW5'}), (b:KG {id: 'inputs:c64/ROW5/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW5'}), (b:KG {id: 'inputs:c64/ROW5/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW6'}), (b:KG {id: 'inputs:c64/ROW6/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW6'}), (b:KG {id: 'inputs:c64/ROW6/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW6'}), (b:KG {id: 'inputs:c64/ROW6/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW6'}), (b:KG {id: 'inputs:c64/ROW6/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW6'}), (b:KG {id: 'inputs:c64/ROW6/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW6'}), (b:KG {id: 'inputs:c64/ROW6/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW6'}), (b:KG {id: 'inputs:c64/ROW6/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW6'}), (b:KG {id: 'inputs:c64/ROW6/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW7'}), (b:KG {id: 'inputs:c64/ROW7/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW7'}), (b:KG {id: 'inputs:c64/ROW7/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW7'}), (b:KG {id: 'inputs:c64/ROW7/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW7'}), (b:KG {id: 'inputs:c64/ROW7/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW7'}), (b:KG {id: 'inputs:c64/ROW7/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW7'}), (b:KG {id: 'inputs:c64/ROW7/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW7'}), (b:KG {id: 'inputs:c64/ROW7/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/ROW7'}), (b:KG {id: 'inputs:c64/ROW7/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/RESTORE'}), (b:KG {id: 'inputs:c64/RESTORE/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/LOCK'}), (b:KG {id: 'inputs:c64/LOCK/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/LOCK'}), (b:KG {id: 'inputs:c64/LOCK/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:c64/JOYSWAP'}), (b:KG {id: 'inputs:c64/JOYSWAP/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:c64/basic'}), (b:KG {id: 'rom:c64/basic/901226-01.u3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:c64/kernal'}), (b:KG {id: 'rom:c64/kernal/901227-03.u4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:c64/charom'}), (b:KG {id: 'rom:c64/charom/901225-01.u5'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:c64/u17'}), (b:KG {id: 'rom:c64/u17/906114-01.u17'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u7/callback:u7:0'}), (b:KG {id: 'handler:c64_state.cpu_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u7/callback:u7:1'}), (b:KG {id: 'handler:c64_state.cpu_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:c64_state.c64_mem'}), (b:KG {id: 'file:src/mame/commodore/c64.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 722, sourceColumn: 1, sourceEndLine: 725};
MATCH (a:KG {id: 'map:c64_state.c64_mem'}), (b:KG {id: 'map:c64_state.c64_mem/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/irq/callback:irq:0'}), (b:KG {id: 'device:c64_state.ntsc/u7'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/nmi/callback:nmi:0'}), (b:KG {id: 'device:c64_state.ntsc/u7'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u19/callback:u19:0'}), (b:KG {id: 'handler:input_merger_device.in_w_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u19/callback:u19:0'}), (b:KG {id: 'device:c64_state.ntsc/irq'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'map:c64_state.vic_videoram_map'}), (b:KG {id: 'file:src/mame/commodore/c64.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 732, sourceColumn: 1, sourceEndLine: 735};
MATCH (a:KG {id: 'map:c64_state.vic_videoram_map'}), (b:KG {id: 'map:c64_state.vic_videoram_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:c64_state.vic_colorram_map'}), (b:KG {id: 'file:src/mame/commodore/c64.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/commodore/c64.cpp', sourceLine: 742, sourceColumn: 1, sourceEndLine: 745};
MATCH (a:KG {id: 'map:c64_state.vic_colorram_map'}), (b:KG {id: 'map:c64_state.vic_colorram_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/screen/callback:screen:0'}), (b:KG {id: 'handler:mos6567_device.screen_update'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/screen/callback:screen:0'}), (b:KG {id: 'device:c64_state.ntsc/u19'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u18/callback:u18:0'}), (b:KG {id: 'handler:c64_state.sid_potx_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u18/callback:u18:1'}), (b:KG {id: 'handler:c64_state.sid_poty_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u1/callback:u1:0'}), (b:KG {id: 'handler:input_merger_device.in_w_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u1/callback:u1:0'}), (b:KG {id: 'device:c64_state.ntsc/irq'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u1/callback:u1:1'}), (b:KG {id: 'handler:pet_user_port_device.write_4'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u1/callback:u1:2'}), (b:KG {id: 'handler:pet_user_port_device.write_5'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u1/callback:u1:3'}), (b:KG {id: 'handler:c64_state.cia1_pa_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u1/callback:u1:4'}), (b:KG {id: 'handler:c64_state.cia1_pb_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u1/callback:u1:5'}), (b:KG {id: 'handler:c64_state.cia1_pb_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u2/callback:u2:0'}), (b:KG {id: 'handler:input_merger_device.in_w_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u2/callback:u2:0'}), (b:KG {id: 'device:c64_state.ntsc/nmi'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u2/callback:u2:1'}), (b:KG {id: 'handler:pet_user_port_device.write_6'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u2/callback:u2:2'}), (b:KG {id: 'handler:pet_user_port_device.write_7'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u2/callback:u2:3'}), (b:KG {id: 'handler:c64_state.cia2_pa_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u2/callback:u2:4'}), (b:KG {id: 'handler:c64_state.cia2_pa_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u2/callback:u2:5'}), (b:KG {id: 'handler:c64_state.cia2_pb_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u2/callback:u2:6'}), (b:KG {id: 'handler:c64_state.cia2_pb_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/u2/callback:u2:7'}), (b:KG {id: 'handler:pet_user_port_device.write_8'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/tape/callback:tape:0'}), (b:KG {id: 'handler:c64_state.cass_rd_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/iec_bus/callback:iec_bus:0'}), (b:KG {id: 'handler:c64_state.iec_srq_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/iec_bus/callback:iec_bus:1'}), (b:KG {id: 'handler:pet_user_port_device.write_9'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/joy1/callback:joy1:0'}), (b:KG {id: 'handler:mos6567_device.lp_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/joy1/callback:joy1:0'}), (b:KG {id: 'device:c64_state.ntsc/u19'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:vcs_joystick'}), (b:KG {id: 'file:src/devices/bus/vcs_ctrl/joystick.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'inputs:vcs_joystick'}), (b:KG {id: 'inputs:vcs_joystick/JOY'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/exp/callback:exp:0'}), (b:KG {id: 'handler:input_merger_device.in_w_2'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/exp/callback:exp:0'}), (b:KG {id: 'device:c64_state.ntsc/irq'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/exp/callback:exp:1'}), (b:KG {id: 'handler:input_merger_device.in_w_2'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/exp/callback:exp:1'}), (b:KG {id: 'device:c64_state.ntsc/nmi'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/exp/callback:exp:2'}), (b:KG {id: 'handler:c64_state.exp_reset_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/exp/callback:exp:3'}), (b:KG {id: 'handler:c64_state.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/exp/callback:exp:4'}), (b:KG {id: 'handler:c64_state.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/exp/callback:exp:5'}), (b:KG {id: 'handler:c64_state.exp_dma_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user/callback:user:0'}), (b:KG {id: 'handler:c64_state.exp_reset_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user/callback:user:1'}), (b:KG {id: 'handler:mos6526_device.cnt_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user/callback:user:1'}), (b:KG {id: 'device:c64_state.ntsc/u1'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user/callback:user:2'}), (b:KG {id: 'handler:mos6526_device.sp_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user/callback:user:2'}), (b:KG {id: 'device:c64_state.ntsc/u1'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user/callback:user:3'}), (b:KG {id: 'handler:mos6526_device.cnt_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user/callback:user:3'}), (b:KG {id: 'device:c64_state.ntsc/u2'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user/callback:user:4'}), (b:KG {id: 'handler:mos6526_device.sp_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user/callback:user:4'}), (b:KG {id: 'device:c64_state.ntsc/u2'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user/callback:user:5'}), (b:KG {id: 'handler:cbm_iec_device.host_atn_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user/callback:user:5'}), (b:KG {id: 'device:c64_state.ntsc/iec_bus'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user/callback:user:6'}), (b:KG {id: 'handler:mos6526_device.flag_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user/callback:user:6'}), (b:KG {id: 'device:c64_state.ntsc/u2'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user/callback:user:7'}), (b:KG {id: 'handler:c64_state.write_user_pb0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user/callback:user:8'}), (b:KG {id: 'handler:c64_state.write_user_pb1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user/callback:user:9'}), (b:KG {id: 'handler:c64_state.write_user_pb2'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user/callback:user:10'}), (b:KG {id: 'handler:c64_state.write_user_pb3'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user/callback:user:11'}), (b:KG {id: 'handler:c64_state.write_user_pb4'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user/callback:user:12'}), (b:KG {id: 'handler:c64_state.write_user_pb5'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user/callback:user:13'}), (b:KG {id: 'handler:c64_state.write_user_pb6'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user/callback:user:14'}), (b:KG {id: 'handler:c64_state.write_user_pb7'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/user/callback:user:15'}), (b:KG {id: 'handler:c64_state.write_user_pa2'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:c64_state.ntsc/quickload/callback:quickload:0'}), (b:KG {id: 'handler:c64_state.quickload_c64'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:c64_state.cpu_w'}), (b:KG {id: 'handler:c64_state.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:c64_state.c64_mem/range0'}), (b:KG {id: 'handler:c64_state.read'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:c64_state.c64_mem/range0'}), (b:KG {id: 'handler:c64_state.write'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:c64_state.vic_videoram_map/range0'}), (b:KG {id: 'handler:c64_state.vic_videoram_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:c64_state.vic_colorram_map/range0'}), (b:KG {id: 'handler:c64_state.vic_colorram_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'handler:c64_state.sid_potx_r'}), (b:KG {id: 'handler:c64_state.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:c64_state.sid_poty_r'}), (b:KG {id: 'handler:c64_state.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:c64_state.cia1_pa_r'}), (b:KG {id: 'handler:c64_state.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:c64_state.cia1_pb_r'}), (b:KG {id: 'handler:c64_state.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:c64_state.cia1_pb_w'}), (b:KG {id: 'handler:c64_state.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:c64_state.cass_rd_w'}), (b:KG {id: 'handler:c64_state.update_cia1_flag'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:c64_state.iec_srq_w'}), (b:KG {id: 'handler:c64_state.update_cia1_flag'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'inputs:vcs_joystick/JOY'}), (b:KG {id: 'inputs:vcs_joystick/JOY/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:vcs_joystick/JOY'}), (b:KG {id: 'inputs:vcs_joystick/JOY/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:vcs_joystick/JOY'}), (b:KG {id: 'inputs:vcs_joystick/JOY/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:vcs_joystick/JOY'}), (b:KG {id: 'inputs:vcs_joystick/JOY/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:vcs_joystick/JOY'}), (b:KG {id: 'inputs:vcs_joystick/JOY/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:vcs_joystick/JOY'}), (b:KG {id: 'inputs:vcs_joystick/JOY/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'handler:c64_state.exp_reset_w'}), (b:KG {id: 'handler:c64_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:c64_state.read'}), (b:KG {id: 'handler:c64_state.read_memory'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:c64_state.write'}), (b:KG {id: 'handler:c64_state.write_memory'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:c64_state.vic_videoram_r'}), (b:KG {id: 'handler:c64_state.read_memory'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:c64_state.read_memory'}), (b:KG {id: 'handler:c64_state.read_pla'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:c64_state.read_memory'}), (b:KG {id: 'handler:c64_state.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:c64_state.write_memory'}), (b:KG {id: 'handler:c64_state.read_pla'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:c64_state.write_memory'}), (b:KG {id: 'handler:c64_state.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:c64_state.read_pla'}), (b:KG {id: 'handler:c64_state.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
