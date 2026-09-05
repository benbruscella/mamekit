// mamekit knowledge graph — driver src/mame/namco/galaga.cpp
// generated 2026-09-05T03:50:26.229Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/namco/galaga.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/namco/galaga.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:bosco.h'}) SET n:SourceFile SET n += {path: 'bosco.h', external: true};
MERGE (n:KG {id: 'file:digdug.h'}) SET n:SourceFile SET n += {path: 'digdug.h', external: true};
MERGE (n:KG {id: 'file:galaga.h'}) SET n:SourceFile SET n += {path: 'galaga.h', external: true};
MERGE (n:KG {id: 'file:xevious.h'}) SET n:SourceFile SET n += {path: 'xevious.h', external: true};
MERGE (n:KG {id: 'file:namco52.h'}) SET n:SourceFile SET n += {path: 'namco52.h', external: true};
MERGE (n:KG {id: 'file:namco54.h'}) SET n:SourceFile SET n += {path: 'namco54.h', external: true};
MERGE (n:KG {id: 'file:cpu/mb88xx/mb88xx.h'}) SET n:SourceFile SET n += {path: 'cpu/mb88xx/mb88xx.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:namco06.h'}) SET n:SourceFile SET n += {path: 'namco06.h', external: true};
MERGE (n:KG {id: 'file:namco50.h'}) SET n:SourceFile SET n += {path: 'namco50.h', external: true};
MERGE (n:KG {id: 'file:namco51.h'}) SET n:SourceFile SET n += {path: 'namco51.h', external: true};
MERGE (n:KG {id: 'file:namco53.h'}) SET n:SourceFile SET n += {path: 'namco53.h', external: true};
MERGE (n:KG {id: 'file:machine/rescap.h'}) SET n:SourceFile SET n += {path: 'machine/rescap.h', external: true};
MERGE (n:KG {id: 'file:machine/watchdog.h'}) SET n:SourceFile SET n += {path: 'machine/watchdog.h', external: true};
MERGE (n:KG {id: 'file:sound/samples.h'}) SET n:SourceFile SET n += {path: 'sound/samples.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:src/mame/namco/namco54.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/namco/namco54.cpp'};
MERGE (n:KG {id: 'file:src/mame/namco/namco50.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/namco/namco50.cpp'};
MERGE (n:KG {id: 'file:src/mame/namco/namco51.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/namco/namco51.cpp'};
MERGE (n:KG {id: 'callback:timer/galaga_state.cpu3_interrupt_callback'}) SET n:Callback SET n += {ownerTag: 'cpu3_interrupt_timer', signal: 'timer', operation: 'adjust', targetClass: 'galaga_state', targetMethod: 'cpu3_interrupt_callback', startClass: 'galaga_state', startMethod: 'machine_start', scanlines: [64, 192], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 786, sourceColumn: 1, sourceEndLine: 799};
MERGE (n:KG {id: 'handler:galaga_state.cpu3_interrupt_callback'}) SET n:Handler SET n += {method: 'cpu3_interrupt_callback', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 786, sourceColumn: 1, sourceEndLine: 799, sourceParameters: 'int param', sourceBody: 'int scanline = param;

	if(m_sub2_nmi_mask)
		m_subcpu2->pulse_input_line(INPUT_LINE_NMI, attotime::zero);

	scanline = scanline + 128;
	if (scanline >= 272)
		scanline = 64;

	/* the vertical synch chain is clocked by H256 -- this is probably not important, but oh well */
	m_cpu3_interrupt_timer->adjust(m_screen->time_until_pos(scanline), scanline);'};
MERGE (n:KG {id: 'game:xevious'}) SET n:Game SET n += {name: 'xevious', year: '1982', company: 'Namco', fullname: 'Xevious (Namco)', monitor: 'ROT90', cls: 'xevious_state', init: 'init_xevious', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3578, sourceColumn: 1, sourceEndLine: 3578, classConstants: '{"m_galaga_gfxbank":0,"m_main_irq_mask":0,"m_sub_irq_mask":0,"m_sub2_nmi_mask":0}'};
MERGE (n:KG {id: 'romset:xevious'}) SET n:RomSet SET n += {name: 'xevious', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2665, sourceColumn: 1, sourceEndLine: 2665};
MERGE (n:KG {id: 'region:xevious/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1982, sourceColumn: 2, sourceEndLine: 1982};
MERGE (n:KG {id: 'rom:xevious/maincpu/xvi_1.3p'}) SET n:Rom SET n += {file: 'xvi_1.3p', offset: 0, size: 4096, crc: '09964dda', sha1: '4882b25b0938a903f3a367455ba788a30759b5b0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2667, sourceColumn: 2, sourceEndLine: 2667};
MERGE (n:KG {id: 'rom:xevious/maincpu/xvi_2.3m'}) SET n:Rom SET n += {file: 'xvi_2.3m', offset: 4096, size: 4096, crc: '60ecce84', sha1: '8adc60a5fcbca74092518dbc570ffff0f04c5b17', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2668, sourceColumn: 2, sourceEndLine: 2668};
MERGE (n:KG {id: 'rom:xevious/maincpu/xvi_3.2m'}) SET n:Rom SET n += {file: 'xvi_3.2m', offset: 8192, size: 4096, crc: '79754b7d', sha1: 'c6a154858716e1f073b476824b183de20e06d093', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2669, sourceColumn: 2, sourceEndLine: 2669};
MERGE (n:KG {id: 'rom:xevious/maincpu/xvi_4.2l'}) SET n:Rom SET n += {file: 'xvi_4.2l', offset: 12288, size: 4096, crc: 'c7d4bbf0', sha1: '4b846de204d08651253d3a141677c8a31626af07', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2670, sourceColumn: 2, sourceEndLine: 2670};
MERGE (n:KG {id: 'region:xevious/sub'}) SET n:RomRegion SET n += {tag: 'sub', size: 65536, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1988, sourceColumn: 2, sourceEndLine: 1988};
MERGE (n:KG {id: 'rom:xevious/sub/xvi_5.3f'}) SET n:Rom SET n += {file: 'xvi_5.3f', offset: 0, size: 4096, crc: 'c85b703f', sha1: '15f1c005b9d806a384ab1f2240b9c580bfe83893', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2673, sourceColumn: 2, sourceEndLine: 2673};
MERGE (n:KG {id: 'rom:xevious/sub/xvi_6.3j'}) SET n:Rom SET n += {file: 'xvi_6.3j', offset: 4096, size: 4096, crc: 'e18cdaad', sha1: '6b79efee1a9642edb9f752101737132401248aed', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2674, sourceColumn: 2, sourceEndLine: 2674};
MERGE (n:KG {id: 'region:xevious/sub2'}) SET n:RomRegion SET n += {tag: 'sub2', size: 65536, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1992, sourceColumn: 2, sourceEndLine: 1992};
MERGE (n:KG {id: 'rom:xevious/sub2/xvi_7.2c'}) SET n:Rom SET n += {file: 'xvi_7.2c', offset: 0, size: 4096, crc: 'dd35cf1c', sha1: 'f8d1f8e019d8198308443c2e7e815d0d04b23d14', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2677, sourceColumn: 2, sourceEndLine: 2677};
MERGE (n:KG {id: 'region:xevious/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 4096, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1995, sourceColumn: 2, sourceEndLine: 1995};
MERGE (n:KG {id: 'rom:xevious/gfx1/xvi_12.3b'}) SET n:Rom SET n += {file: 'xvi_12.3b', offset: 0, size: 4096, crc: '088c8b26', sha1: '9c3b61dfca2f84673a78f7f66e363777a8f47a59', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2680, sourceColumn: 2, sourceEndLine: 2680};
MERGE (n:KG {id: 'region:xevious/gfx2'}) SET n:RomRegion SET n += {tag: 'gfx2', size: 8192, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1998, sourceColumn: 2, sourceEndLine: 1998};
MERGE (n:KG {id: 'rom:xevious/gfx2/xvi_13.3c'}) SET n:Rom SET n += {file: 'xvi_13.3c', offset: 0, size: 4096, crc: 'de60ba25', sha1: '32bc09be5ff8b52ee3a26e0ac3ebc2d4107badb7', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2683, sourceColumn: 2, sourceEndLine: 2683};
MERGE (n:KG {id: 'rom:xevious/gfx2/xvi_14.3d'}) SET n:Rom SET n += {file: 'xvi_14.3d', offset: 4096, size: 4096, crc: '535cdbbc', sha1: 'fb9ffe5fc43e0213231267e98d605d43c15f61e8', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2684, sourceColumn: 2, sourceEndLine: 2684};
MERGE (n:KG {id: 'region:xevious/gfx3'}) SET n:RomRegion SET n += {tag: 'gfx3', size: 40960, flags: '0', fills: [36864, 4096, 0], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2001, sourceColumn: 2, sourceEndLine: 2001};
MERGE (n:KG {id: 'rom:xevious/gfx3/xvi_15.4m'}) SET n:Rom SET n += {file: 'xvi_15.4m', offset: 0, size: 8192, crc: 'dc2c0ecb', sha1: '19ddbd9805f77f38c9a9a1bb30dba6c720b8609f', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2687, sourceColumn: 2, sourceEndLine: 2687};
MERGE (n:KG {id: 'rom:xevious/gfx3/xvi_17.4p'}) SET n:Rom SET n += {file: 'xvi_17.4p', offset: 8192, size: 8192, crc: 'dfb587ce', sha1: 'acff2bf5cde85a16cdc98a52cdea11f77fadf25a', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2688, sourceColumn: 2, sourceEndLine: 2688};
MERGE (n:KG {id: 'rom:xevious/gfx3/xvi_16.4n'}) SET n:Rom SET n += {file: 'xvi_16.4n', offset: 16384, size: 4096, crc: '605ca889', sha1: '3bf380ef76c03822a042ecc73b5edd4543c268ce', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2689, sourceColumn: 2, sourceEndLine: 2689};
MERGE (n:KG {id: 'rom:xevious/gfx3/xvi_18.4r'}) SET n:Rom SET n += {file: 'xvi_18.4r', offset: 20480, size: 8192, crc: '02417d19', sha1: 'b5f830dd2cf25cf154308d2e640f0ecdcda5d8cd', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2690, sourceColumn: 2, sourceEndLine: 2690};
MERGE (n:KG {id: 'region:xevious/gfx4'}) SET n:RomRegion SET n += {tag: 'gfx4', size: 16384, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2694, sourceColumn: 2, sourceEndLine: 2694};
MERGE (n:KG {id: 'rom:xevious/gfx4/xvi_9.2a'}) SET n:Rom SET n += {file: 'xvi_9.2a', offset: 0, size: 4096, crc: '57ed9879', sha1: '3106d1aacff06cf78371bd19967141072b32b7d7', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2695, sourceColumn: 2, sourceEndLine: 2695};
MERGE (n:KG {id: 'rom:xevious/gfx4/xvi_10.2b'}) SET n:Rom SET n += {file: 'xvi_10.2b', offset: 4096, size: 8192, crc: 'ae3ba9e5', sha1: '49064b25667ffcd81137cd5e800df4b78b182a46', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2696, sourceColumn: 2, sourceEndLine: 2696};
MERGE (n:KG {id: 'rom:xevious/gfx4/xvi_11.2c'}) SET n:Rom SET n += {file: 'xvi_11.2c', offset: 12288, size: 4096, crc: '31e244dd', sha1: '3f7eac12863697a98e1122111801606759e44b2a', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2697, sourceColumn: 2, sourceEndLine: 2697};
MERGE (n:KG {id: 'region:xevious/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 2816, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2004, sourceColumn: 2, sourceEndLine: 2004};
MERGE (n:KG {id: 'rom:xevious/proms/xvi-8.6a'}) SET n:Rom SET n += {file: 'xvi-8.6a', offset: 0, size: 256, crc: '5cc2727f', sha1: '0dc1e63a47a4cb0ba75f6f1e0c15e408bb0ee2a1', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2700, sourceColumn: 2, sourceEndLine: 2700};
MERGE (n:KG {id: 'rom:xevious/proms/xvi-9.6d'}) SET n:Rom SET n += {file: 'xvi-9.6d', offset: 256, size: 256, crc: '5c8796cc', sha1: '63015e3c0874afc6b1ca032f1ffb8f90562c77c8', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2701, sourceColumn: 2, sourceEndLine: 2701};
MERGE (n:KG {id: 'rom:xevious/proms/xvi-10.6e'}) SET n:Rom SET n += {file: 'xvi-10.6e', offset: 512, size: 256, crc: '3cb60975', sha1: 'c94d5a5dd4d8a08d6d39c051a4a722581b903f45', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2702, sourceColumn: 2, sourceEndLine: 2702};
MERGE (n:KG {id: 'rom:xevious/proms/xvi-7.4h'}) SET n:Rom SET n += {file: 'xvi-7.4h', offset: 768, size: 512, crc: '22d98032', sha1: 'ec6626828c79350417d08b98e9631ad35edd4a41', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2703, sourceColumn: 2, sourceEndLine: 2703};
MERGE (n:KG {id: 'rom:xevious/proms/xvi-6.4f'}) SET n:Rom SET n += {file: 'xvi-6.4f', offset: 1280, size: 512, crc: '3a7599f0', sha1: 'a4bdf58c190ca16fc7b976c97f41087a61fdb8b8', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2704, sourceColumn: 2, sourceEndLine: 2704};
MERGE (n:KG {id: 'rom:xevious/proms/xvi-4.3l'}) SET n:Rom SET n += {file: 'xvi-4.3l', offset: 1792, size: 512, crc: 'fd8b9d91', sha1: '87ddf0b9d723aabb422d6d416aa9ec6bc246bf34', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2705, sourceColumn: 2, sourceEndLine: 2705};
MERGE (n:KG {id: 'rom:xevious/proms/xvi-5.3m'}) SET n:Rom SET n += {file: 'xvi-5.3m', offset: 2304, size: 512, crc: 'bf906d82', sha1: '776168a73d3b9f0ce05610acc8a623deae0a572b', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2706, sourceColumn: 2, sourceEndLine: 2706};
MERGE (n:KG {id: 'region:xevious/pals_vidbd'}) SET n:RomRegion SET n += {tag: 'pals_vidbd', size: 512, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2708, sourceColumn: 2, sourceEndLine: 2708};
MERGE (n:KG {id: 'rom:xevious/pals_vidbd/xvi-3.1f'}) SET n:Rom SET n += {file: 'xvi-3.1f', offset: 0, size: 279, crc: '9192d57a', sha1: '5f36db93b6083767f93aa3a0e4bc2d4fc7e27f9c', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2709, sourceColumn: 2, sourceEndLine: 2709};
MERGE (n:KG {id: 'region:xevious/namco'}) SET n:RomRegion SET n += {tag: 'namco', size: 512, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2010, sourceColumn: 2, sourceEndLine: 2010};
MERGE (n:KG {id: 'rom:xevious/namco/xvi-2.7n'}) SET n:Rom SET n += {file: 'xvi-2.7n', offset: 0, size: 256, crc: '550f06bc', sha1: '816a0fafa0b084ac11ae1af70a5186539376fc2a', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2712, sourceColumn: 2, sourceEndLine: 2712};
MERGE (n:KG {id: 'rom:xevious/namco/xvi-1.5n'}) SET n:Rom SET n += {file: 'xvi-1.5n', offset: 256, size: 256, crc: '77245b66', sha1: '0c4d0bee858b97632411c440bea6948a74759746', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2713, sourceColumn: 2, sourceEndLine: 2713};
MERGE (n:KG {id: 'handler:namco_wsg_device.pacman_sound_w'}) SET n:Handler SET n += {method: 'pacman_sound_w', ownerClass: 'namco_wsg_device', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 924, sourceColumn: 2, sourceEndLine: 924};
MERGE (n:KG {id: 'handler:ls259_device.write_d0'}) SET n:Handler SET n += {method: 'write_d0', ownerClass: 'ls259_device', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 934, sourceColumn: 2, sourceEndLine: 934};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 926, sourceColumn: 2, sourceEndLine: 926};
MERGE (n:KG {id: 'handler:namco_06xx_device.data_r'}) SET n:Handler SET n += {method: 'data_r', ownerClass: 'namco_06xx_device', sourceFile: 'src/mame/namco/namco06.cpp', sourceLine: 135, sourceColumn: 1, sourceEndLine: 151, sourceParameters: 'offs_t offset', sourceBody: 'uint8_t result = 0xff;

	if (!BIT(m_control, 4))
	{
		logerror("%s: 06XX \'%s\' read in write mode %02x\\n",machine().describe_context(),tag(),m_control);
		return 0;
	}

	if (BIT(m_control, 0)) result &= m_read[0](0);
	if (BIT(m_control, 1)) result &= m_read[1](0);
	if (BIT(m_control, 2)) result &= m_read[2](0);
	if (BIT(m_control, 3)) result &= m_read[3](0);

	return result;'};
MERGE (n:KG {id: 'handler:namco_06xx_device.data_w'}) SET n:Handler SET n += {method: 'data_w', ownerClass: 'namco_06xx_device', sourceFile: 'src/mame/namco/namco06.cpp', sourceLine: 154, sourceColumn: 1, sourceEndLine: 157, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(namco_06xx_device::write_sync),this), data);'};
MERGE (n:KG {id: 'handler:namco_06xx_device.write_sync'}) SET n:Handler SET n += {method: 'write_sync', ownerClass: 'namco_06xx_device', sourceFile: 'src/mame/namco/namco06.cpp', sourceLine: 159, sourceColumn: 1, sourceEndLine: 171, sourceParameters: 'int param', sourceBody: 'if (BIT(m_control, 4))
	{
		logerror("%s: 06XX \'%s\' write in read mode %02x\\n",machine().describe_context(),tag(),m_control);
		return;
	}

	if (BIT(m_control, 0)) m_write[0](0, param);
	if (BIT(m_control, 1)) m_write[1](0, param);
	if (BIT(m_control, 2)) m_write[2](0, param);
	if (BIT(m_control, 3)) m_write[3](0, param);'};
MERGE (n:KG {id: 'handler:namco_06xx_device.ctrl_r'}) SET n:Handler SET n += {method: 'ctrl_r', ownerClass: 'namco_06xx_device', sourceFile: 'src/mame/namco/namco06.cpp', sourceLine: 174, sourceColumn: 1, sourceEndLine: 177, sourceParameters: '', sourceBody: 'return m_control;'};
MERGE (n:KG {id: 'handler:namco_06xx_device.ctrl_w'}) SET n:Handler SET n += {method: 'ctrl_w', ownerClass: 'namco_06xx_device', sourceFile: 'src/mame/namco/namco06.cpp', sourceLine: 179, sourceColumn: 1, sourceEndLine: 182, sourceParameters: 'uint8_t data', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(namco_06xx_device::ctrl_w_sync),this), data);'};
MERGE (n:KG {id: 'handler:namco_06xx_device.ctrl_w_sync'}) SET n:Handler SET n += {method: 'ctrl_w_sync', ownerClass: 'namco_06xx_device', sourceFile: 'src/mame/namco/namco06.cpp', sourceLine: 184, sourceColumn: 1, sourceEndLine: 225, sourceParameters: 'int param', sourceBody: 'm_control = param;

	// The upper 3 control bits are the clock divider.
	if ((m_control & 0xe0) == 0)
	{
		// If the divider is zero, stop the timer.
		m_nmi_timer->adjust(attotime::never);
		m_timer_state = false;
		set_nmi(CLEAR_LINE);
		m_chipsel[0](0, CLEAR_LINE);
		m_chipsel[1](0, CLEAR_LINE);
		m_chipsel[2](0, CLEAR_LINE);
		m_chipsel[3](0, CLEAR_LINE);
		// RW is left as-is
	}
	else
	{
		// NMI is cleared immediately if this is a read.
		// It will be suppressed the next clock cycle.
		if (BIT(m_control, 4))
		{
			set_nmi(CLEAR_LINE);
			m_read_stretch = true;
		}
		else
		{
			m_read_stretch = false;
		}

		uint8_t num_shifts = (m_control & 0xe0) >> 5;
		uint8_t divisor = 1 << num_shifts;
		attotime period = attotime::from_hz(clock() / divisor) / 2;

		// Delay to the next falling clock edge.
		attotime now = machine().time();
		u64 total_ticks = now.as_ticks(clock());
		attotime delay = attotime::from_ticks(total_ticks + 1, clock()) - now;
		m_nmi_timer->adjust(delay, 0, period);
	}'};
MERGE (n:KG {id: 'handler:namco_06xx_device.set_nmi'}) SET n:Handler SET n += {method: 'set_nmi', ownerClass: 'namco_06xx_device', sourceFile: 'src/mame/namco/namco06.cpp', sourceLine: 228, sourceColumn: 1, sourceEndLine: 234, sourceParameters: 'int state', sourceBody: 'if (!m_nmicpu->suspended(SUSPEND_REASON_HALT | SUSPEND_REASON_RESET | SUSPEND_REASON_DISABLE))
	{
		m_nmicpu->set_input_line(INPUT_LINE_NMI, state ? ASSERT_LINE : CLEAR_LINE);
	}'};
MERGE (n:KG {id: 'map:xevious_state.xevious_map'}) SET n:AddressMap SET n += {cls: 'xevious_state', name: 'xevious_map', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 899, sourceColumn: 1, sourceEndLine: 918};
MERGE (n:KG {id: 'map:xevious_state.xevious_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 16383, raw: 'map(0x0000, 0x3fff).rom().nopw()', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 901, sourceColumn: 2, sourceEndLine: 901, rom: true, nopw: true};
MERGE (n:KG {id: 'map:xevious_state.xevious_map/range1'}) SET n:AddressRange SET n += {start: 26624, end: 26631, raw: 'map(0x6800, 0x6807).r(FUNC(xevious_state::bosco_dsw_r))', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 902, sourceColumn: 2, sourceEndLine: 902};
MERGE (n:KG {id: 'handler:xevious_state.bosco_dsw_r'}) SET n:Handler SET n += {method: 'bosco_dsw_r', ownerClass: 'xevious_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 723, sourceColumn: 1, sourceEndLine: 731, sourceParameters: 'offs_t offset', sourceBody: 'int bit0,bit1;

	bit0 = (ioport("DSWB")->read() >> offset) & 1;
	bit1 = (ioport("DSWA")->read() >> offset) & 1;

	return bit0 | (bit1 << 1);'};
MERGE (n:KG {id: 'map:xevious_state.xevious_map/range2'}) SET n:AddressRange SET n += {start: 26624, end: 26655, raw: 'map(0x6800, 0x681f).w(m_namco_sound, FUNC(namco_wsg_device::pacman_sound_w))', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 903, sourceColumn: 2, sourceEndLine: 903};
MERGE (n:KG {id: 'map:xevious_state.xevious_map/range3'}) SET n:AddressRange SET n += {start: 26656, end: 26663, raw: 'map(0x6820, 0x6827).w("misclatch", FUNC(ls259_device::write_d0))', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 904, sourceColumn: 2, sourceEndLine: 904};
MERGE (n:KG {id: 'map:xevious_state.xevious_map/range4'}) SET n:AddressRange SET n += {start: 26672, end: 26672, raw: 'map(0x6830, 0x6830).w("watchdog", FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 905, sourceColumn: 2, sourceEndLine: 905};
MERGE (n:KG {id: 'map:xevious_state.xevious_map/range5'}) SET n:AddressRange SET n += {start: 28672, end: 28927, raw: 'map(0x7000, 0x70ff).rw("06xx", FUNC(namco_06xx_device::data_r), FUNC(namco_06xx_device::data_w))', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 906, sourceColumn: 2, sourceEndLine: 906};
MERGE (n:KG {id: 'map:xevious_state.xevious_map/range6'}) SET n:AddressRange SET n += {start: 28928, end: 28928, raw: 'map(0x7100, 0x7100).rw("06xx", FUNC(namco_06xx_device::ctrl_r), FUNC(namco_06xx_device::ctrl_w))', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 907, sourceColumn: 2, sourceEndLine: 907};
MERGE (n:KG {id: 'map:xevious_state.xevious_map/range7'}) SET n:AddressRange SET n += {start: 30720, end: 32767, raw: 'map(0x7800, 0x7fff).ram().share("share1")', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 908, sourceColumn: 2, sourceEndLine: 908, ram: true, share: 'share1'};
MERGE (n:KG {id: 'map:xevious_state.xevious_map/range8'}) SET n:AddressRange SET n += {start: 32768, end: 34815, raw: 'map(0x8000, 0x87ff).ram().share("xevious_sr1")', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 909, sourceColumn: 2, sourceEndLine: 909, ram: true, share: 'xevious_sr1'};
MERGE (n:KG {id: 'map:xevious_state.xevious_map/range9'}) SET n:AddressRange SET n += {start: 36864, end: 38911, raw: 'map(0x9000, 0x97ff).ram().share("xevious_sr2")', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 910, sourceColumn: 2, sourceEndLine: 910, ram: true, share: 'xevious_sr2'};
MERGE (n:KG {id: 'map:xevious_state.xevious_map/range10'}) SET n:AddressRange SET n += {start: 40960, end: 43007, raw: 'map(0xa000, 0xa7ff).ram().share("xevious_sr3")', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 911, sourceColumn: 2, sourceEndLine: 911, ram: true, share: 'xevious_sr3'};
MERGE (n:KG {id: 'map:xevious_state.xevious_map/range11'}) SET n:AddressRange SET n += {start: 45056, end: 47103, raw: 'map(0xb000, 0xb7ff).ram().w(FUNC(xevious_state::xevious_fg_colorram_w)).share("fg_colorram")', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 912, sourceColumn: 2, sourceEndLine: 912, ram: true, share: 'fg_colorram'};
MERGE (n:KG {id: 'handler:xevious_state.xevious_fg_colorram_w'}) SET n:Handler SET n += {method: 'xevious_fg_colorram_w', ownerClass: 'xevious_state', sourceFile: 'src/mame/namco/xevious.cpp', sourceLine: 173, sourceColumn: 1, sourceEndLine: 177, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_xevious_fg_colorram[offset] = data;
	m_fg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:xevious_state.xevious_map/range12'}) SET n:AddressRange SET n += {start: 47104, end: 49151, raw: 'map(0xb800, 0xbfff).ram().w(FUNC(xevious_state::xevious_bg_colorram_w)).share("bg_colorram")', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 913, sourceColumn: 2, sourceEndLine: 913, ram: true, share: 'bg_colorram'};
MERGE (n:KG {id: 'handler:xevious_state.xevious_bg_colorram_w'}) SET n:Handler SET n += {method: 'xevious_bg_colorram_w', ownerClass: 'xevious_state', sourceFile: 'src/mame/namco/xevious.cpp', sourceLine: 185, sourceColumn: 1, sourceEndLine: 189, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_xevious_bg_colorram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:xevious_state.xevious_map/range13'}) SET n:AddressRange SET n += {start: 49152, end: 51199, raw: 'map(0xc000, 0xc7ff).ram().w(FUNC(xevious_state::xevious_fg_videoram_w)).share("fg_videoram")', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 914, sourceColumn: 2, sourceEndLine: 914, ram: true, share: 'fg_videoram'};
MERGE (n:KG {id: 'handler:xevious_state.xevious_fg_videoram_w'}) SET n:Handler SET n += {method: 'xevious_fg_videoram_w', ownerClass: 'xevious_state', sourceFile: 'src/mame/namco/xevious.cpp', sourceLine: 167, sourceColumn: 1, sourceEndLine: 171, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_xevious_fg_videoram[offset] = data;
	m_fg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:xevious_state.xevious_map/range14'}) SET n:AddressRange SET n += {start: 51200, end: 53247, raw: 'map(0xc800, 0xcfff).ram().w(FUNC(xevious_state::xevious_bg_videoram_w)).share("bg_videoram")', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 915, sourceColumn: 2, sourceEndLine: 915, ram: true, share: 'bg_videoram'};
MERGE (n:KG {id: 'handler:xevious_state.xevious_bg_videoram_w'}) SET n:Handler SET n += {method: 'xevious_bg_videoram_w', ownerClass: 'xevious_state', sourceFile: 'src/mame/namco/xevious.cpp', sourceLine: 179, sourceColumn: 1, sourceEndLine: 183, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_xevious_bg_videoram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:xevious_state.xevious_map/range15'}) SET n:AddressRange SET n += {start: 53248, end: 53375, raw: 'map(0xd000, 0xd07f).w(FUNC(xevious_state::xevious_vh_latch_w))', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 916, sourceColumn: 2, sourceEndLine: 916};
MERGE (n:KG {id: 'handler:xevious_state.xevious_vh_latch_w'}) SET n:Handler SET n += {method: 'xevious_vh_latch_w', ownerClass: 'xevious_state', sourceFile: 'src/mame/namco/xevious.cpp', sourceLine: 191, sourceColumn: 1, sourceEndLine: 219, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'int reg;
	int scroll = data + ((offset&0x01)<<8);   /* A0 -> D8 */

	reg = (offset&0xf0)>>4;

	switch (reg)
	{
	case 0:
		m_bg_tilemap->set_scrollx(0,scroll);
		break;
	case 1:
		m_fg_tilemap->set_scrollx(0,scroll);
		break;
	case 2:
		m_bg_tilemap->set_scrolly(0,scroll);
		break;
	case 3:
		m_fg_tilemap->set_scrolly(0,scroll);
		break;
	case 7:
		flip_screen_set(scroll & 1);
		break;
	default:
			logerror("CRTC WRITE REG: %x  Data: %03x\\n",reg, scroll);
			break;
	}'};
MERGE (n:KG {id: 'map:xevious_state.xevious_map/range16'}) SET n:AddressRange SET n += {start: 61440, end: 65535, raw: 'map(0xf000, 0xffff).rw(FUNC(xevious_state::xevious_bb_r), FUNC(xevious_state::xevious_bs_w))', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 917, sourceColumn: 2, sourceEndLine: 917};
MERGE (n:KG {id: 'handler:xevious_state.xevious_bb_r'}) SET n:Handler SET n += {method: 'xevious_bb_r', ownerClass: 'xevious_state', sourceFile: 'src/mame/namco/xevious.cpp', sourceLine: 228, sourceColumn: 1, sourceEndLine: 270, sourceParameters: 'offs_t offset', sourceBody: 'uint8_t *rom2a = memregion("gfx4")->base();
	uint8_t *rom2b = rom2a+0x1000;
	uint8_t *rom2c = rom2a+0x3000;
	int adr_2b,adr_2c;
	int dat1,dat2;

	/* get BS to 12 bit data from 2A,2B */
	adr_2b = ((m_xevious_bs[1] & 0x7e) << 6) | ((m_xevious_bs[0] & 0xfe) >> 1);

	if (adr_2b & 1)
	{
		/* high bits select */
		dat1 = ((rom2a[adr_2b >> 1] & 0xf0) << 4) | rom2b[adr_2b];
	}
	else
	{
		/* low bits select */
		dat1 = ((rom2a[adr_2b >> 1] & 0x0f) << 8) | rom2b[adr_2b];
	}

	adr_2c = ((dat1 & 0x1ff) << 2) | ((m_xevious_bs[1] & 1) << 1) | (m_xevious_bs[0] & 1);
	if (dat1 & 0x400) adr_2c ^= 1;
	if (dat1 & 0x200) adr_2c ^= 2;

	if (offset & 1)
	{
		/* return BB1 */
		dat2 = rom2c[adr_2c | 0x800];
	}
	else
	{
		/* return BB0 */
		dat2 = rom2c[adr_2c];
		/* swap bit 6 & 7 */
		dat2 = bitswap<8>(dat2, 6,7,5,4,3,2,1,0);
		/* flip x & y */
		if (dat1 & 0x400) dat2 ^= 0x40;
		if (dat1 & 0x200) dat2 ^= 0x80;
	}
	return dat2;'};
MERGE (n:KG {id: 'handler:xevious_state.xevious_bs_w'}) SET n:Handler SET n += {method: 'xevious_bs_w', ownerClass: 'xevious_state', sourceFile: 'src/mame/namco/xevious.cpp', sourceLine: 223, sourceColumn: 1, sourceEndLine: 226, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_xevious_bs[offset & 1] = data;'};
MERGE (n:KG {id: 'handler:galaga_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 836, sourceColumn: 1, sourceEndLine: 839, sourceParameters: '', sourceBody: 'm_cpu3_interrupt_timer->adjust(m_screen->time_until_pos(64), 64);'};
MERGE (n:KG {id: 'handler:galaga_state.irq1_clear_w'}) SET n:Handler SET n += {method: 'irq1_clear_w', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 733, sourceColumn: 1, sourceEndLine: 738, sourceParameters: 'int state', sourceBody: 'm_main_irq_mask = state;
	if (!m_main_irq_mask)
		m_maincpu->set_input_line(0, CLEAR_LINE);'};
MERGE (n:KG {id: 'handler:galaga_state.irq2_clear_w'}) SET n:Handler SET n += {method: 'irq2_clear_w', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 740, sourceColumn: 1, sourceEndLine: 745, sourceParameters: 'int state', sourceBody: 'm_sub_irq_mask = state;
	if (!m_sub_irq_mask)
		m_subcpu->set_input_line(0, CLEAR_LINE);'};
MERGE (n:KG {id: 'handler:galaga_state.nmion_w'}) SET n:Handler SET n += {method: 'nmion_w', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 747, sourceColumn: 1, sourceEndLine: 750, sourceParameters: 'int state', sourceBody: 'm_sub2_nmi_mask = !state;'};
MERGE (n:KG {id: 'handler:namco_50xx_device.reset'}) SET n:Handler SET n += {method: 'reset', ownerClass: 'namco_50xx_device', sourceFile: 'src/mame/namco/namco50.cpp', sourceLine: 138, sourceColumn: 1, sourceEndLine: 142, sourceParameters: 'int state', sourceBody: '// The incoming signal is active low
	m_cpu->set_input_line(INPUT_LINE_RESET, state ? CLEAR_LINE : ASSERT_LINE);'};
MERGE (n:KG {id: 'handler:namco_51xx_device.reset'}) SET n:Handler SET n += {method: 'reset', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 64, sourceColumn: 1, sourceEndLine: 68, sourceParameters: 'int state', sourceBody: '// Reset line is active low.
	m_cpu->set_input_line(INPUT_LINE_RESET, state ? CLEAR_LINE : ASSERT_LINE);'};
MERGE (n:KG {id: 'handler:namco_54xx_device.reset'}) SET n:Handler SET n += {method: 'reset', ownerClass: 'namco_54xx_device', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 56, sourceColumn: 1, sourceEndLine: 60, sourceParameters: 'int state', sourceBody: '// The incoming signal is active low
	m_cpu->set_input_line(INPUT_LINE_RESET, state ? CLEAR_LINE : ASSERT_LINE);'};
MERGE (n:KG {id: 'handler:galaga_state.out'}) SET n:Handler SET n += {method: 'out', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 752, sourceColumn: 1, sourceEndLine: 758, sourceParameters: 'uint8_t data', sourceBody: 'm_leds[1] = BIT(data, 0);
	m_leds[0] = BIT(data, 1);
	machine().bookkeeping().coin_counter_w(1,~data & 4);
	machine().bookkeeping().coin_counter_w(0,~data & 8);'};
MERGE (n:KG {id: 'handler:galaga_state.lockout'}) SET n:Handler SET n += {method: 'lockout', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 760, sourceColumn: 1, sourceEndLine: 763, sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_lockout_global_w(state);'};
MERGE (n:KG {id: 'handler:namco_51xx_device.chip_select'}) SET n:Handler SET n += {method: 'chip_select', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 86, sourceColumn: 1, sourceEndLine: 89, sourceConstants: ['MB88XX_IRQ_LINE=0'], sourceParameters: 'int state', sourceBody: 'm_cpu->set_input_line(MB88XX_IRQ_LINE, state ? ASSERT_LINE : CLEAR_LINE);'};
MERGE (n:KG {id: 'handler:namco_51xx_device.rw'}) SET n:Handler SET n += {method: 'rw', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 76, sourceColumn: 1, sourceEndLine: 79, sourceParameters: 'int state', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(namco_51xx_device::rw_sync),this), state);'};
MERGE (n:KG {id: 'handler:namco_51xx_device.rw_sync'}) SET n:Handler SET n += {method: 'rw_sync', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 81, sourceColumn: 1, sourceEndLine: 84, sourceParameters: 'int param', sourceBody: 'm_rw = param;'};
MERGE (n:KG {id: 'handler:namco_51xx_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 91, sourceColumn: 1, sourceEndLine: 94, sourceParameters: '', sourceBody: 'return m_portO;'};
MERGE (n:KG {id: 'handler:namco_51xx_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 96, sourceColumn: 1, sourceEndLine: 99, sourceParameters: 'uint8_t data', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(namco_51xx_device::write_sync),this), data);'};
MERGE (n:KG {id: 'handler:namco_51xx_device.write_sync'}) SET n:Handler SET n += {method: 'write_sync', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 101, sourceColumn: 1, sourceEndLine: 104, sourceParameters: 'int param', sourceBody: 'm_portO = param;'};
MERGE (n:KG {id: 'handler:namco_50xx_device.chip_select'}) SET n:Handler SET n += {method: 'chip_select', ownerClass: 'namco_50xx_device', sourceFile: 'src/mame/namco/namco50.cpp', sourceLine: 180, sourceColumn: 1, sourceEndLine: 183, sourceConstants: ['MB88XX_IRQ_LINE=0'], sourceParameters: 'int state', sourceBody: 'm_cpu->set_input_line(MB88XX_IRQ_LINE, state ? ASSERT_LINE : CLEAR_LINE);'};
MERGE (n:KG {id: 'handler:namco_50xx_device.rw'}) SET n:Handler SET n += {method: 'rw', ownerClass: 'namco_50xx_device', sourceFile: 'src/mame/namco/namco50.cpp', sourceLine: 170, sourceColumn: 1, sourceEndLine: 173, sourceParameters: 'int state', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(namco_50xx_device::rw_sync),this), state);'};
MERGE (n:KG {id: 'handler:namco_50xx_device.rw_sync'}) SET n:Handler SET n += {method: 'rw_sync', ownerClass: 'namco_50xx_device', sourceFile: 'src/mame/namco/namco50.cpp', sourceLine: 175, sourceColumn: 1, sourceEndLine: 178, sourceParameters: 'int param', sourceBody: 'm_rw = param;'};
MERGE (n:KG {id: 'handler:namco_50xx_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'namco_50xx_device', sourceFile: 'src/mame/namco/namco50.cpp', sourceLine: 195, sourceColumn: 1, sourceEndLine: 198, sourceParameters: '', sourceBody: 'return m_portO;'};
MERGE (n:KG {id: 'handler:namco_50xx_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'namco_50xx_device', sourceFile: 'src/mame/namco/namco50.cpp', sourceLine: 185, sourceColumn: 1, sourceEndLine: 188, sourceParameters: 'uint8_t data', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(namco_50xx_device::write_sync),this), data);'};
MERGE (n:KG {id: 'handler:namco_50xx_device.write_sync'}) SET n:Handler SET n += {method: 'write_sync', ownerClass: 'namco_50xx_device', sourceFile: 'src/mame/namco/namco50.cpp', sourceLine: 190, sourceColumn: 1, sourceEndLine: 193, sourceParameters: 'int param', sourceBody: 'm_cmd = param;'};
MERGE (n:KG {id: 'handler:namco_54xx_device.chip_select'}) SET n:Handler SET n += {method: 'chip_select', ownerClass: 'namco_54xx_device', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 97, sourceColumn: 1, sourceEndLine: 100, sourceConstants: ['MB88XX_IRQ_LINE=0'], sourceParameters: 'int state', sourceBody: 'm_cpu->set_input_line(MB88XX_IRQ_LINE, state ? ASSERT_LINE : CLEAR_LINE);'};
MERGE (n:KG {id: 'handler:namco_54xx_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'namco_54xx_device', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 86, sourceColumn: 1, sourceEndLine: 89, sourceParameters: 'uint8_t data', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(namco_54xx_device::write_sync),this), data);'};
MERGE (n:KG {id: 'handler:namco_54xx_device.write_sync'}) SET n:Handler SET n += {method: 'write_sync', ownerClass: 'namco_54xx_device', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 91, sourceColumn: 1, sourceEndLine: 94, sourceParameters: 'int param', sourceBody: 'm_latched_cmd = param;'};
MERGE (n:KG {id: 'handler:galaga_state.vblank_irq'}) SET n:Handler SET n += {method: 'vblank_irq', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1541, sourceColumn: 1, sourceEndLine: 1548, sourceParameters: 'int state', sourceBody: 'if (state && m_main_irq_mask)
		m_maincpu->set_input_line(0, ASSERT_LINE);

	if (state && m_sub_irq_mask)
		m_subcpu->set_input_line(0, ASSERT_LINE);'};
MERGE (n:KG {id: 'handler:namco_51xx_device.vblank'}) SET n:Handler SET n += {method: 'vblank', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 70, sourceColumn: 1, sourceEndLine: 74, sourceConstants: ['MB88XX_TC_LINE=1'], sourceParameters: 'int state', sourceBody: '// The timer is active on falling edges.
	m_cpu->set_input_line(MB88XX_TC_LINE, state ? CLEAR_LINE : ASSERT_LINE);'};
MERGE (n:KG {id: 'handler:xevious_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'xevious_state', sourceFile: 'src/mame/namco/xevious.cpp', sourceLine: 143, sourceColumn: 1, sourceEndLine: 157, sourceParameters: '', sourceBody: 'm_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(xevious_state::get_bg_tile_info)), TILEMAP_SCAN_ROWS, 8, 8, 64, 32);
	m_fg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(xevious_state::get_fg_tile_info)), TILEMAP_SCAN_ROWS, 8, 8, 64, 32);

	m_bg_tilemap->set_scrolldx(-20,288+27);
	m_bg_tilemap->set_scrolldy(-16,-16);
	m_fg_tilemap->set_scrolldx(-32,288+32);
	m_fg_tilemap->set_scrolldy(-18,-10);
	m_fg_tilemap->set_transparent_pen(0);
	m_xevious_bs[0] = 0;
	m_xevious_bs[1] = 0;

	save_item(NAME(m_xevious_bs));'};
MERGE (n:KG {id: 'handler:xevious_state.get_bg_tile_info'}) SET n:Handler SET n += {method: 'get_bg_tile_info', ownerClass: 'xevious_state', sourceFile: 'src/mame/namco/xevious.cpp', sourceLine: 124, sourceColumn: 1, sourceEndLine: 133, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'uint8_t code = m_xevious_bg_videoram[tile_index];
	uint8_t attr = m_xevious_bg_colorram[tile_index];
	uint8_t color = ((attr & 0x3c) >> 2) | ((code & 0x80) >> 3) | ((attr & 0x03) << 5);
	tileinfo.set(1,
			code + ((attr & 0x01) << 8),
			color,
			TILE_FLIPYX((attr & 0xc0) >> 6));'};
MERGE (n:KG {id: 'handler:xevious_state.get_fg_tile_info'}) SET n:Handler SET n += {method: 'get_fg_tile_info', ownerClass: 'xevious_state', sourceFile: 'src/mame/namco/xevious.cpp', sourceLine: 108, sourceColumn: 1, sourceEndLine: 122, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'uint8_t attr = m_xevious_fg_colorram[tile_index];

	/* the hardware has two character sets, one normal and one x-flipped. When
	   screen is flipped, character y flip is done by the hardware inverting the
	   timing signals, while x flip is done by selecting the 2nd character set.
	   We reproduce this here, but since the tilemap system automatically flips
	   characters when screen is flipped, we have to flip them back. */
	uint8_t color = ((attr & 0x03) << 4) | ((attr & 0x3c) >> 2);
	tileinfo.set(0,
			m_xevious_fg_videoram[tile_index] | (flip_screen() ? 0x100 : 0),
			color,
			TILE_FLIPYX((attr & 0xc0) >> 6) ^ (flip_screen() ? TILE_FLIPX : 0));'};
MERGE (n:KG {id: 'handler:xevious_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'xevious_state', sourceFile: 'src/mame/namco/xevious.cpp', sourceLine: 326, sourceColumn: 1, sourceEndLine: 403, sourceParameters: 'bitmap_ind16 &bitmap,const rectangle &cliprect', sourceBody: 'uint8_t *spriteram = m_xevious_sr3 + 0x780;
	uint8_t *spriteram_2 = m_xevious_sr1 + 0x780;
	uint8_t *spriteram_3 = m_xevious_sr2 + 0x780;
	int offs,sx,sy;

	for (offs = 0;offs < 0x80;offs += 2)
	{
		if ((spriteram[offs + 1] & 0x40) == 0)  /* I\'m not sure about this one */
		{
			int bank,code,color,flipx,flipy;
			uint32_t transmask;

			if (spriteram_3[offs] & 0x80)
			{
				bank = 2;
				code = (spriteram[offs] & 0x3f) + 0x100;
			}
			else
			{
				bank = 2;
				code = spriteram[offs];
			}

			color = spriteram[offs + 1] & 0x7f;
			flipx = spriteram_3[offs] & 4;
			flipy = spriteram_3[offs] & 8;

			sx = spriteram_2[offs + 1] - 40 + 0x100*(spriteram_3[offs + 1] & 1);
			sy = 28*8-spriteram_2[offs]-1;

			if (flip_screen())
			{
				flipx = !flipx;
				flipy = !flipy;
			}

			transmask = m_palette->transpen_mask(*m_gfxdecode->gfx(bank), color, 0x80);

			if (spriteram_3[offs] & 2)  /* double height (?) */
			{
				if (spriteram_3[offs] & 1)  /* double width, double height */
				{
					code &= ~3;
					m_gfxdecode->gfx(bank)->transmask(bitmap,cliprect,
							code+3,color,flipx,flipy,
							flipx ? sx : sx+16,flipy ? sy-16 : sy,transmask);
					m_gfxdecode->gfx(bank)->transmask(bitmap,cliprect,
							code+1,color,flipx,flipy,
							flipx ? sx : sx+16,flipy ? sy : sy-16,transmask);
				}
				code &= ~2;
				m_gfxdecode->gfx(bank)->transmask(bitmap,cliprect,
						code+2,color,flipx,flipy,
						flipx ? sx+16 : sx,flipy ? sy-16 : sy,transmask);
				m_gfxdecode->gfx(bank)->transmask(bitmap,cliprect,
						code,color,flipx,flipy,
						flipx ? sx+16 : sx,flipy ? sy : sy-16,transmask);
			}
			else if (spriteram_3[offs] & 1) /* double width */
			{
				code &= ~1;
				m_gfxdecode->gfx(bank)->transmask(bitmap,cliprect,
						code,color,flipx,flipy,
						flipx ? sx+16 : sx,flipy ? sy-16 : sy,transmask);
				m_gfxdecode->gfx(bank)->transmask(bitmap,cliprect,
						code+1,color,flipx,flipy,
						flipx ? sx : sx+16,flipy ? sy-16 : sy,transmask);
			}
			else    /* normal */
			{
				m_gfxdecode->gfx(bank)->transmask(bitmap,cliprect,
						code,color,flipx,flipy,sx,sy,transmask);
			}
		}
	}'};
MERGE (n:KG {id: 'machine:xevious_state.xevious'}) SET n:MachineConfig SET n += {cls: 'xevious_state', name: 'xevious', calls: [], stateMembers: ['{"name":"m_galaga_gfxbank","bits":32}', '{"name":"m_main_irq_mask","bits":8}', '{"name":"m_sub_irq_mask","bits":8}', '{"name":"m_sub2_nmi_mask","bits":8}', '{"name":"m_xevious_bs","bits":32,"signed":true,"arrayLength":2}'], resetHandlers: ['galaga_state.machine_reset'], startHandlers: ['xevious_state.video_start'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1766, sourceColumn: 1, sourceEndLine: 1838};
MERGE (n:KG {id: 'device:xevious_state.xevious/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 3072000, config: ['Z80(config, m_maincpu, MASTER_CLOCK/6)', 'm_maincpu->set_addrmap(AS_PROGRAM, &xevious_state::xevious_map)'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1769, sourceColumn: 2, sourceEndLine: 1769};
MERGE (n:KG {id: 'device:xevious_state.xevious/sub'}) SET n:Device SET n += {type: 'Z80', tag: 'sub', clock: 3072000, config: ['Z80(config, m_subcpu, MASTER_CLOCK/6)', 'm_subcpu->set_addrmap(AS_PROGRAM, &xevious_state::xevious_map)'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1772, sourceColumn: 2, sourceEndLine: 1772};
MERGE (n:KG {id: 'device:xevious_state.xevious/sub2'}) SET n:Device SET n += {type: 'Z80', tag: 'sub2', clock: 3072000, config: ['Z80(config, m_subcpu2, MASTER_CLOCK/6)', 'm_subcpu2->set_addrmap(AS_PROGRAM, &xevious_state::xevious_map)'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1775, sourceColumn: 2, sourceEndLine: 1775};
MERGE (n:KG {id: 'device:xevious_state.xevious/misclatch'}) SET n:Device SET n += {type: 'LS259', tag: 'misclatch', clock: null, config: ['ls259_device &misclatch(LS259(config, "misclatch"))', 'misclatch.q_out_cb<0>().set(FUNC(galaga_state::irq1_clear_w))', 'misclatch.q_out_cb<1>().set(FUNC(galaga_state::irq2_clear_w))', 'misclatch.q_out_cb<2>().set(FUNC(galaga_state::nmion_w))', 'misclatch.q_out_cb<3>().set_inputline("sub", INPUT_LINE_RESET).invert()', 'misclatch.q_out_cb<3>().append_inputline("sub2", INPUT_LINE_RESET).invert()', 'misclatch.q_out_cb<3>().append("50xx", FUNC(namco_50xx_device::reset))', 'misclatch.q_out_cb<3>().append("51xx", FUNC(namco_51xx_device::reset))', 'misclatch.q_out_cb<3>().append("54xx", FUNC(namco_54xx_device::reset))'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1778, sourceColumn: 2, sourceEndLine: 1778};
MERGE (n:KG {id: 'device:xevious_state.xevious/misclatch/callback:misclatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'misclatch.q_out_cb<0>().set(FUNC(galaga_state::irq1_clear_w))', ownerTag: 'misclatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1779, sourceColumn: 2, sourceEndLine: 1779, slot: '0', targetClass: 'galaga_state', targetMethod: 'irq1_clear_w'};
MERGE (n:KG {id: 'device:xevious_state.xevious/misclatch/callback:misclatch:1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'misclatch.q_out_cb<1>().set(FUNC(galaga_state::irq2_clear_w))', ownerTag: 'misclatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1780, sourceColumn: 2, sourceEndLine: 1780, slot: '1', targetClass: 'galaga_state', targetMethod: 'irq2_clear_w'};
MERGE (n:KG {id: 'device:xevious_state.xevious/misclatch/callback:misclatch:2'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'misclatch.q_out_cb<2>().set(FUNC(galaga_state::nmion_w))', ownerTag: 'misclatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1781, sourceColumn: 2, sourceEndLine: 1781, slot: '2', targetClass: 'galaga_state', targetMethod: 'nmion_w'};
MERGE (n:KG {id: 'device:xevious_state.xevious/misclatch/callback:misclatch:3'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set_inputline', raw: 'misclatch.q_out_cb<3>().set_inputline("sub", INPUT_LINE_RESET).invert()', ownerTag: 'misclatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1782, sourceColumn: 2, sourceEndLine: 1782, slot: '3', transforms: ['invert'], targetTag: 'sub', inputLine: 'INPUT_LINE_RESET'};
MERGE (n:KG {id: 'device:xevious_state.xevious/misclatch/callback:misclatch:4'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'append_inputline', raw: 'misclatch.q_out_cb<3>().append_inputline("sub2", INPUT_LINE_RESET).invert()', ownerTag: 'misclatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1783, sourceColumn: 2, sourceEndLine: 1783, slot: '3', transforms: ['invert'], targetTag: 'sub2', inputLine: 'INPUT_LINE_RESET'};
MERGE (n:KG {id: 'device:xevious_state.xevious/misclatch/callback:misclatch:5'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'append', raw: 'misclatch.q_out_cb<3>().append("50xx", FUNC(namco_50xx_device::reset))', ownerTag: 'misclatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1784, sourceColumn: 2, sourceEndLine: 1784, slot: '3', targetTag: '50xx', targetClass: 'namco_50xx_device', targetMethod: 'reset'};
MERGE (n:KG {id: 'device:xevious_state.xevious/misclatch/callback:misclatch:6'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'append', raw: 'misclatch.q_out_cb<3>().append("51xx", FUNC(namco_51xx_device::reset))', ownerTag: 'misclatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1785, sourceColumn: 2, sourceEndLine: 1785, slot: '3', targetTag: '51xx', targetClass: 'namco_51xx_device', targetMethod: 'reset'};
MERGE (n:KG {id: 'device:xevious_state.xevious/misclatch/callback:misclatch:7'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'append', raw: 'misclatch.q_out_cb<3>().append("54xx", FUNC(namco_54xx_device::reset))', ownerTag: 'misclatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1786, sourceColumn: 2, sourceEndLine: 1786, slot: '3', targetTag: '54xx', targetClass: 'namco_54xx_device', targetMethod: 'reset'};
MERGE (n:KG {id: 'device:xevious_state.xevious/50xx'}) SET n:Device SET n += {type: 'NAMCO_50XX', tag: '50xx', clock: 1536000, config: ['NAMCO_50XX(config, "50xx", MASTER_CLOCK/6/2)'], cls: 'namco_50xx_device', clsHierarchy: ['namco_50xx_device'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1788, sourceColumn: 2, sourceEndLine: 1788};
MERGE (n:KG {id: 'device:xevious_state.xevious/51xx'}) SET n:Device SET n += {type: 'NAMCO_51XX', tag: '51xx', clock: 1536000, config: ['namco_51xx_device &n51xx(NAMCO_51XX(config, "51xx", MASTER_CLOCK/6/2))', 'n51xx.input_callback<0>().set_ioport("IN0").mask(0x0f)', 'n51xx.input_callback<1>().set_ioport("IN0").rshift(4)', 'n51xx.input_callback<2>().set_ioport("IN1").mask(0x0f)', 'n51xx.input_callback<3>().set_ioport("IN1").rshift(4)', 'n51xx.output_callback().set(FUNC(galaga_state::out))', 'n51xx.lockout_callback().set(FUNC(galaga_state::lockout))'], cls: 'namco_51xx_device', clsHierarchy: ['namco_51xx_device'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1790, sourceColumn: 2, sourceEndLine: 1790};
MERGE (n:KG {id: 'device:xevious_state.xevious/51xx/callback:51xx:0'}) SET n:Callback SET n += {signal: 'input_callback', operation: 'set_ioport', raw: 'n51xx.input_callback<0>().set_ioport("IN0").mask(0x0f)', ownerTag: '51xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1791, sourceColumn: 2, sourceEndLine: 1791, slot: '0', transforms: ['mask(0x0f)'], targetTag: 'IN0', targetPort: 'IN0'};
MERGE (n:KG {id: 'device:xevious_state.xevious/51xx/callback:51xx:1'}) SET n:Callback SET n += {signal: 'input_callback', operation: 'set_ioport', raw: 'n51xx.input_callback<1>().set_ioport("IN0").rshift(4)', ownerTag: '51xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1792, sourceColumn: 2, sourceEndLine: 1792, slot: '1', transforms: ['rshift(4)'], targetTag: 'IN0', targetPort: 'IN0'};
MERGE (n:KG {id: 'device:xevious_state.xevious/51xx/callback:51xx:2'}) SET n:Callback SET n += {signal: 'input_callback', operation: 'set_ioport', raw: 'n51xx.input_callback<2>().set_ioport("IN1").mask(0x0f)', ownerTag: '51xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1793, sourceColumn: 2, sourceEndLine: 1793, slot: '2', transforms: ['mask(0x0f)'], targetTag: 'IN1', targetPort: 'IN1'};
MERGE (n:KG {id: 'device:xevious_state.xevious/51xx/callback:51xx:3'}) SET n:Callback SET n += {signal: 'input_callback', operation: 'set_ioport', raw: 'n51xx.input_callback<3>().set_ioport("IN1").rshift(4)', ownerTag: '51xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1794, sourceColumn: 2, sourceEndLine: 1794, slot: '3', transforms: ['rshift(4)'], targetTag: 'IN1', targetPort: 'IN1'};
MERGE (n:KG {id: 'device:xevious_state.xevious/51xx/callback:51xx:4'}) SET n:Callback SET n += {signal: 'output_callback', operation: 'set', raw: 'n51xx.output_callback().set(FUNC(galaga_state::out))', ownerTag: '51xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1795, sourceColumn: 2, sourceEndLine: 1795, targetClass: 'galaga_state', targetMethod: 'out'};
MERGE (n:KG {id: 'device:xevious_state.xevious/51xx/callback:51xx:5'}) SET n:Callback SET n += {signal: 'lockout_callback', operation: 'set', raw: 'n51xx.lockout_callback().set(FUNC(galaga_state::lockout))', ownerTag: '51xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1796, sourceColumn: 2, sourceEndLine: 1796, targetClass: 'galaga_state', targetMethod: 'lockout'};
MERGE (n:KG {id: 'device:xevious_state.xevious/54xx'}) SET n:Device SET n += {type: 'NAMCO_54XX', tag: '54xx', clock: 1536000, config: ['namco_54xx_device &n54xx(NAMCO_54XX(config, "54xx", MASTER_CLOCK/6/2))', 'n54xx.set_discrete("discrete")', 'n54xx.set_basenote(NODE_01)'], cls: 'namco_54xx_device', clsHierarchy: ['namco_54xx_device'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1798, sourceColumn: 2, sourceEndLine: 1798};
MERGE (n:KG {id: 'device:xevious_state.xevious/06xx'}) SET n:Device SET n += {type: 'NAMCO_06XX', tag: '06xx', clock: 48000, config: ['namco_06xx_device &n06xx(NAMCO_06XX(config, "06xx", MASTER_CLOCK/6/64))', 'n06xx.set_maincpu(m_maincpu)', 'n06xx.chip_select_callback<0>().set("51xx", FUNC(namco_51xx_device::chip_select))', 'n06xx.rw_callback<0>().set("51xx", FUNC(namco_51xx_device::rw))', 'n06xx.read_callback<0>().set("51xx", FUNC(namco_51xx_device::read))', 'n06xx.write_callback<0>().set("51xx", FUNC(namco_51xx_device::write))', 'n06xx.chip_select_callback<2>().set("50xx", FUNC(namco_50xx_device::chip_select))', 'n06xx.rw_callback<2>().set("50xx", FUNC(namco_50xx_device::rw))', 'n06xx.read_callback<2>().set("50xx", FUNC(namco_50xx_device::read))', 'n06xx.write_callback<2>().set("50xx", FUNC(namco_50xx_device::write))', 'n06xx.write_callback<3>().set("54xx", FUNC(namco_54xx_device::write))', 'n06xx.chip_select_callback<3>().set("54xx", FUNC(namco_54xx_device::chip_select))'], cls: 'namco_06xx_device', clsHierarchy: ['namco_06xx_device'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1802, sourceColumn: 2, sourceEndLine: 1802};
MERGE (n:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:0'}) SET n:Callback SET n += {signal: 'nmi', operation: 'set_maincpu', raw: 'n06xx.set_maincpu(m_maincpu)', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1803, sourceColumn: 2, sourceEndLine: 1803, inputLine: 'INPUT_LINE_NMI', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:1'}) SET n:Callback SET n += {signal: 'chip_select_callback', operation: 'set', raw: 'n06xx.chip_select_callback<0>().set("51xx", FUNC(namco_51xx_device::chip_select))', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1804, sourceColumn: 2, sourceEndLine: 1804, slot: '0', targetTag: '51xx', targetClass: 'namco_51xx_device', targetMethod: 'chip_select'};
MERGE (n:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:2'}) SET n:Callback SET n += {signal: 'rw_callback', operation: 'set', raw: 'n06xx.rw_callback<0>().set("51xx", FUNC(namco_51xx_device::rw))', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1805, sourceColumn: 2, sourceEndLine: 1805, slot: '0', targetTag: '51xx', targetClass: 'namco_51xx_device', targetMethod: 'rw'};
MERGE (n:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:3'}) SET n:Callback SET n += {signal: 'read_callback', operation: 'set', raw: 'n06xx.read_callback<0>().set("51xx", FUNC(namco_51xx_device::read))', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1806, sourceColumn: 2, sourceEndLine: 1806, slot: '0', targetTag: '51xx', targetClass: 'namco_51xx_device', targetMethod: 'read'};
MERGE (n:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:4'}) SET n:Callback SET n += {signal: 'write_callback', operation: 'set', raw: 'n06xx.write_callback<0>().set("51xx", FUNC(namco_51xx_device::write))', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1807, sourceColumn: 2, sourceEndLine: 1807, slot: '0', targetTag: '51xx', targetClass: 'namco_51xx_device', targetMethod: 'write'};
MERGE (n:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:5'}) SET n:Callback SET n += {signal: 'chip_select_callback', operation: 'set', raw: 'n06xx.chip_select_callback<2>().set("50xx", FUNC(namco_50xx_device::chip_select))', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1808, sourceColumn: 2, sourceEndLine: 1808, slot: '2', targetTag: '50xx', targetClass: 'namco_50xx_device', targetMethod: 'chip_select'};
MERGE (n:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:6'}) SET n:Callback SET n += {signal: 'rw_callback', operation: 'set', raw: 'n06xx.rw_callback<2>().set("50xx", FUNC(namco_50xx_device::rw))', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1809, sourceColumn: 2, sourceEndLine: 1809, slot: '2', targetTag: '50xx', targetClass: 'namco_50xx_device', targetMethod: 'rw'};
MERGE (n:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:7'}) SET n:Callback SET n += {signal: 'read_callback', operation: 'set', raw: 'n06xx.read_callback<2>().set("50xx", FUNC(namco_50xx_device::read))', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1810, sourceColumn: 2, sourceEndLine: 1810, slot: '2', targetTag: '50xx', targetClass: 'namco_50xx_device', targetMethod: 'read'};
MERGE (n:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:8'}) SET n:Callback SET n += {signal: 'write_callback', operation: 'set', raw: 'n06xx.write_callback<2>().set("50xx", FUNC(namco_50xx_device::write))', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1811, sourceColumn: 2, sourceEndLine: 1811, slot: '2', targetTag: '50xx', targetClass: 'namco_50xx_device', targetMethod: 'write'};
MERGE (n:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:9'}) SET n:Callback SET n += {signal: 'write_callback', operation: 'set', raw: 'n06xx.write_callback<3>().set("54xx", FUNC(namco_54xx_device::write))', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1812, sourceColumn: 2, sourceEndLine: 1812, slot: '3', targetTag: '54xx', targetClass: 'namco_54xx_device', targetMethod: 'write'};
MERGE (n:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:10'}) SET n:Callback SET n += {signal: 'chip_select_callback', operation: 'set', raw: 'n06xx.chip_select_callback<3>().set("54xx", FUNC(namco_54xx_device::chip_select))', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1813, sourceColumn: 2, sourceEndLine: 1813, slot: '3', targetTag: '54xx', targetClass: 'namco_54xx_device', targetMethod: 'chip_select'};
MERGE (n:KG {id: 'device:xevious_state.xevious/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog").set_vblank_count(m_screen, 8)'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1815, sourceColumn: 2, sourceEndLine: 1815};
MERGE (n:KG {id: 'device:xevious_state.xevious/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(MASTER_CLOCK/3, 384, 0, 288, 264, 0, 224)', 'm_screen->set_screen_update(FUNC(xevious_state::screen_update_xevious))', 'm_screen->set_palette(m_palette)', 'm_screen->screen_vblank().set(FUNC(galaga_state::vblank_irq))', 'm_screen->screen_vblank().append("51xx", FUNC(namco_51xx_device::vblank))'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1820, sourceColumn: 2, sourceEndLine: 1820, configCalls: ['set_raw(6144000,384,0,288,264,0,224)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6144000, 384, 0, 288, 264, 0, 224], screenRawExpr: ['MASTER_CLOCK/3', '384', '0', '288', '264', '0', '224']};
MERGE (n:KG {id: 'device:xevious_state.xevious/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(xevious_state::screen_update_xevious))', ownerTag: 'screen', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1822, sourceColumn: 2, sourceEndLine: 1822, targetClass: 'xevious_state', targetMethod: 'screen_update_xevious'};
MERGE (n:KG {id: 'handler:xevious_state.screen_update_xevious'}) SET n:Handler SET n += {method: 'screen_update_xevious', ownerClass: 'xevious_state', sourceFile: 'src/mame/namco/xevious.cpp', sourceLine: 406, sourceColumn: 1, sourceEndLine: 412, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'm_bg_tilemap->draw(screen, bitmap, cliprect, 0,0);
	draw_sprites(bitmap,cliprect);
	m_fg_tilemap->draw(screen, bitmap, cliprect, 0,0);
	return 0;'};
MERGE (n:KG {id: 'device:xevious_state.xevious/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set', raw: 'm_screen->screen_vblank().set(FUNC(galaga_state::vblank_irq))', ownerTag: 'screen', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1824, sourceColumn: 2, sourceEndLine: 1824, targetClass: 'galaga_state', targetMethod: 'vblank_irq'};
MERGE (n:KG {id: 'device:xevious_state.xevious/screen/callback:screen:2'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'append', raw: 'm_screen->screen_vblank().append("51xx", FUNC(namco_51xx_device::vblank))', ownerTag: 'screen', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1825, sourceColumn: 2, sourceEndLine: 1825, targetTag: '51xx', targetClass: 'namco_51xx_device', targetMethod: 'vblank'};
MERGE (n:KG {id: 'device:xevious_state.xevious/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_xevious)'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1827, sourceColumn: 2, sourceEndLine: 1827, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:xevious_state.xevious/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(xevious_state::xevious_palette), 128*4 + 64*8 + 64*2, 128+1)'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1828, sourceColumn: 2, sourceEndLine: 1828, clockExpr: 'FUNC(xevious_state::xevious_palette)'};
MERGE (n:KG {id: 'device:xevious_state.xevious/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1831, sourceColumn: 2, sourceEndLine: 1831};
MERGE (n:KG {id: 'device:xevious_state.xevious/namco'}) SET n:Device SET n += {type: 'NAMCO_WSG', tag: 'namco', clock: 96000, config: ['NAMCO_WSG(config, m_namco_sound, MASTER_CLOCK/6/32)', 'm_namco_sound->add_route(ALL_OUTPUTS, "mono", 0.90 * 10.0 / 16.0)'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1833, sourceColumn: 2, sourceEndLine: 1833};
MERGE (n:KG {id: 'audioroute:device:xevious_state.xevious/namco/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.5625, raw: 'm_namco_sound->add_route(ALL_OUTPUTS, "mono", 0.90 * 10.0 / 16.0)', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1834, sourceColumn: 2, sourceEndLine: 1834};
MERGE (n:KG {id: 'device:xevious_state.xevious/discrete'}) SET n:Device SET n += {type: 'DISCRETE', tag: 'discrete', clock: null, config: ['DISCRETE(config, "discrete", galaga_discrete).add_route(ALL_OUTPUTS, "mono", 0.90)'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1837, sourceColumn: 2, sourceEndLine: 1837, clockExpr: 'galaga_discrete'};
MERGE (n:KG {id: 'audioroute:device:xevious_state.xevious/discrete/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.9, raw: 'DISCRETE(config, "discrete", galaga_discrete).add_route(ALL_OUTPUTS, "mono", 0.90)', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1837, sourceColumn: 2, sourceEndLine: 1837};
MERGE (n:KG {id: 'machine:namco_54xx_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'namco_54xx_device', name: 'device_add_mconfig', calls: [], stateMembers: ['{"name":"m_basenode","bits":32,"signed":true}', '{"name":"m_latched_cmd","bits":8}'], sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 136, sourceColumn: 1, sourceEndLine: 143};
MERGE (n:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu'}) SET n:Device SET n += {type: 'MB8844', tag: 'mcu', clock: 1536000, config: ['MB8844(config, m_cpu, DERIVED_CLOCK(1,1))', 'm_cpu->read_k().set(FUNC(namco_54xx_device::K_r))', 'm_cpu->write_o().set(FUNC(namco_54xx_device::O_w))', 'm_cpu->read_r<0>().set(FUNC(namco_54xx_device::R0_r))', 'm_cpu->write_r<1>().set(FUNC(namco_54xx_device::R1_w))'], sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 138, sourceColumn: 2, sourceEndLine: 138};
MERGE (n:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu/callback:mcu:0'}) SET n:Callback SET n += {signal: 'read_k', operation: 'set', raw: 'm_cpu->read_k().set(FUNC(namco_54xx_device::K_r))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 139, sourceColumn: 2, sourceEndLine: 139, targetClass: 'namco_54xx_device', targetMethod: 'K_r'};
MERGE (n:KG {id: 'handler:namco_54xx_device.K_r'}) SET n:Handler SET n += {method: 'K_r', ownerClass: 'namco_54xx_device', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 62, sourceColumn: 1, sourceEndLine: 65, sourceParameters: '', sourceBody: 'return m_latched_cmd >> 4;'};
MERGE (n:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu/callback:mcu:1'}) SET n:Callback SET n += {signal: 'write_o', operation: 'set', raw: 'm_cpu->write_o().set(FUNC(namco_54xx_device::O_w))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 140, sourceColumn: 2, sourceEndLine: 140, targetClass: 'namco_54xx_device', targetMethod: 'O_w'};
MERGE (n:KG {id: 'handler:namco_54xx_device.O_w'}) SET n:Handler SET n += {method: 'O_w', ownerClass: 'namco_54xx_device', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 72, sourceColumn: 1, sourceEndLine: 78, sourceParameters: 'offs_t offset, uint8_t data, uint8_t mem_mask', sourceBody: 'if (mem_mask == 0x0f)
		m_discrete->write(NAMCO_54XX_0_DATA(m_basenode), data & 0x0f);
	else
		m_discrete->write(NAMCO_54XX_1_DATA(m_basenode), data >> 4);'};
MERGE (n:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu/callback:mcu:2'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<0>().set(FUNC(namco_54xx_device::R0_r))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 141, sourceColumn: 2, sourceEndLine: 141, slot: '0', targetClass: 'namco_54xx_device', targetMethod: 'R0_r'};
MERGE (n:KG {id: 'handler:namco_54xx_device.R0_r'}) SET n:Handler SET n += {method: 'R0_r', ownerClass: 'namco_54xx_device', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 67, sourceColumn: 1, sourceEndLine: 70, sourceParameters: '', sourceBody: 'return m_latched_cmd & 0x0f;'};
MERGE (n:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu/callback:mcu:3'}) SET n:Callback SET n += {signal: 'write_r', operation: 'set', raw: 'm_cpu->write_r<1>().set(FUNC(namco_54xx_device::R1_w))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 142, sourceColumn: 2, sourceEndLine: 142, slot: '1', targetClass: 'namco_54xx_device', targetMethod: 'R1_w'};
MERGE (n:KG {id: 'handler:namco_54xx_device.R1_w'}) SET n:Handler SET n += {method: 'R1_w', ownerClass: 'namco_54xx_device', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 80, sourceColumn: 1, sourceEndLine: 83, sourceParameters: 'uint8_t data', sourceBody: 'm_discrete->write(NAMCO_54XX_2_DATA(m_basenode), data & 0x0f);'};
MERGE (n:KG {id: 'machine:namco_50xx_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'namco_50xx_device', name: 'device_add_mconfig', calls: [], stateMembers: ['{"name":"m_rw","bits":8}', '{"name":"m_cmd","bits":8}', '{"name":"m_portO","bits":8}'], sourceFile: 'src/mame/namco/namco50.cpp', sourceLine: 238, sourceColumn: 1, sourceEndLine: 245};
MERGE (n:KG {id: 'device:namco_50xx_device.device_add_mconfig/mcu'}) SET n:Device SET n += {type: 'MB8842', tag: 'mcu', clock: 1536000, config: ['MB8842(config, m_cpu, DERIVED_CLOCK(1,1))', 'm_cpu->read_k().set(FUNC(namco_50xx_device::K_r))', 'm_cpu->read_r<0>().set(FUNC(namco_50xx_device::R0_r))', 'm_cpu->read_r<2>().set(FUNC(namco_50xx_device::R2_r))', 'm_cpu->write_o().set(FUNC(namco_50xx_device::O_w))'], sourceFile: 'src/mame/namco/namco50.cpp', sourceLine: 240, sourceColumn: 2, sourceEndLine: 240};
MERGE (n:KG {id: 'device:namco_50xx_device.device_add_mconfig/mcu/callback:mcu:0'}) SET n:Callback SET n += {signal: 'read_k', operation: 'set', raw: 'm_cpu->read_k().set(FUNC(namco_50xx_device::K_r))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco50.cpp', sourceLine: 241, sourceColumn: 2, sourceEndLine: 241, targetClass: 'namco_50xx_device', targetMethod: 'K_r'};
MERGE (n:KG {id: 'handler:namco_50xx_device.K_r'}) SET n:Handler SET n += {method: 'K_r', ownerClass: 'namco_50xx_device', sourceFile: 'src/mame/namco/namco50.cpp', sourceLine: 145, sourceColumn: 1, sourceEndLine: 148, sourceParameters: '', sourceBody: 'return m_cmd >> 4;'};
MERGE (n:KG {id: 'device:namco_50xx_device.device_add_mconfig/mcu/callback:mcu:1'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<0>().set(FUNC(namco_50xx_device::R0_r))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco50.cpp', sourceLine: 242, sourceColumn: 2, sourceEndLine: 242, slot: '0', targetClass: 'namco_50xx_device', targetMethod: 'R0_r'};
MERGE (n:KG {id: 'handler:namco_50xx_device.R0_r'}) SET n:Handler SET n += {method: 'R0_r', ownerClass: 'namco_50xx_device', sourceFile: 'src/mame/namco/namco50.cpp', sourceLine: 150, sourceColumn: 1, sourceEndLine: 153, sourceParameters: '', sourceBody: 'return m_cmd & 0x0f;'};
MERGE (n:KG {id: 'device:namco_50xx_device.device_add_mconfig/mcu/callback:mcu:2'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<2>().set(FUNC(namco_50xx_device::R2_r))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco50.cpp', sourceLine: 243, sourceColumn: 2, sourceEndLine: 243, slot: '2', targetClass: 'namco_50xx_device', targetMethod: 'R2_r'};
MERGE (n:KG {id: 'handler:namco_50xx_device.R2_r'}) SET n:Handler SET n += {method: 'R2_r', ownerClass: 'namco_50xx_device', sourceFile: 'src/mame/namco/namco50.cpp', sourceLine: 155, sourceColumn: 1, sourceEndLine: 158, sourceParameters: '', sourceBody: 'return m_rw & 1;'};
MERGE (n:KG {id: 'device:namco_50xx_device.device_add_mconfig/mcu/callback:mcu:3'}) SET n:Callback SET n += {signal: 'write_o', operation: 'set', raw: 'm_cpu->write_o().set(FUNC(namco_50xx_device::O_w))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco50.cpp', sourceLine: 244, sourceColumn: 2, sourceEndLine: 244, targetClass: 'namco_50xx_device', targetMethod: 'O_w'};
MERGE (n:KG {id: 'handler:namco_50xx_device.O_w'}) SET n:Handler SET n += {method: 'O_w', ownerClass: 'namco_50xx_device', sourceFile: 'src/mame/namco/namco50.cpp', sourceLine: 160, sourceColumn: 1, sourceEndLine: 163, sourceParameters: 'uint8_t data', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(namco_50xx_device::O_w_sync),this), data);'};
MERGE (n:KG {id: 'handler:namco_50xx_device.O_w_sync'}) SET n:Handler SET n += {method: 'O_w_sync', ownerClass: 'namco_50xx_device', sourceFile: 'src/mame/namco/namco50.cpp', sourceLine: 165, sourceColumn: 1, sourceEndLine: 168, sourceParameters: 'int param', sourceBody: 'm_portO = param;'};
MERGE (n:KG {id: 'machine:namco_51xx_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'namco_51xx_device', name: 'device_add_mconfig', calls: [], stateMembers: ['{"name":"m_portO","bits":8}', '{"name":"m_rw","bits":8}'], sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 168, sourceColumn: 1, sourceEndLine: 178};
MERGE (n:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}) SET n:Device SET n += {type: 'MB8843', tag: 'mcu', clock: 1536000, config: ['MB8843(config, m_cpu, DERIVED_CLOCK(1,1))', 'm_cpu->read_k().set(FUNC(namco_51xx_device::K_r))', 'm_cpu->read_r<0>().set(FUNC(namco_51xx_device::R_r<0>))', 'm_cpu->read_r<1>().set(FUNC(namco_51xx_device::R_r<1>))', 'm_cpu->read_r<2>().set(FUNC(namco_51xx_device::R_r<2>))', 'm_cpu->read_r<3>().set(FUNC(namco_51xx_device::R_r<3>))', 'm_cpu->write_o().set(FUNC(namco_51xx_device::O_w))', 'm_cpu->write_p().set(FUNC(namco_51xx_device::P_w))'], sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 170, sourceColumn: 2, sourceEndLine: 170};
MERGE (n:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:0'}) SET n:Callback SET n += {signal: 'read_k', operation: 'set', raw: 'm_cpu->read_k().set(FUNC(namco_51xx_device::K_r))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 171, sourceColumn: 2, sourceEndLine: 171, targetClass: 'namco_51xx_device', targetMethod: 'K_r'};
MERGE (n:KG {id: 'handler:namco_51xx_device.K_r'}) SET n:Handler SET n += {method: 'K_r', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 106, sourceColumn: 1, sourceEndLine: 109, sourceParameters: '', sourceBody: 'return (m_rw << 3) | (m_portO & 0x07);'};
MERGE (n:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:1'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<0>().set(FUNC(namco_51xx_device::R_r<0>))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 172, sourceColumn: 2, sourceEndLine: 172, slot: '0', targetClass: 'namco_51xx_device', targetMethod: 'R_r_0'};
MERGE (n:KG {id: 'handler:namco_51xx_device.R_r_0'}) SET n:Handler SET n += {method: 'R_r_0', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 112, sourceColumn: 1, sourceEndLine: 115, sourceConstants: ['N=0'], sourceParameters: '', sourceBody: 'return m_in[N]();'};
MERGE (n:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:2'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<1>().set(FUNC(namco_51xx_device::R_r<1>))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 173, sourceColumn: 2, sourceEndLine: 173, slot: '1', targetClass: 'namco_51xx_device', targetMethod: 'R_r_1'};
MERGE (n:KG {id: 'handler:namco_51xx_device.R_r_1'}) SET n:Handler SET n += {method: 'R_r_1', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 112, sourceColumn: 1, sourceEndLine: 115, sourceConstants: ['N=1'], sourceParameters: '', sourceBody: 'return m_in[N]();'};
MERGE (n:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:3'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<2>().set(FUNC(namco_51xx_device::R_r<2>))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 174, sourceColumn: 2, sourceEndLine: 174, slot: '2', targetClass: 'namco_51xx_device', targetMethod: 'R_r_2'};
MERGE (n:KG {id: 'handler:namco_51xx_device.R_r_2'}) SET n:Handler SET n += {method: 'R_r_2', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 112, sourceColumn: 1, sourceEndLine: 115, sourceConstants: ['N=2'], sourceParameters: '', sourceBody: 'return m_in[N]();'};
MERGE (n:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:4'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<3>().set(FUNC(namco_51xx_device::R_r<3>))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 175, sourceColumn: 2, sourceEndLine: 175, slot: '3', targetClass: 'namco_51xx_device', targetMethod: 'R_r_3'};
MERGE (n:KG {id: 'handler:namco_51xx_device.R_r_3'}) SET n:Handler SET n += {method: 'R_r_3', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 112, sourceColumn: 1, sourceEndLine: 115, sourceConstants: ['N=3'], sourceParameters: '', sourceBody: 'return m_in[N]();'};
MERGE (n:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:5'}) SET n:Callback SET n += {signal: 'write_o', operation: 'set', raw: 'm_cpu->write_o().set(FUNC(namco_51xx_device::O_w))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 176, sourceColumn: 2, sourceEndLine: 176, targetClass: 'namco_51xx_device', targetMethod: 'O_w'};
MERGE (n:KG {id: 'handler:namco_51xx_device.O_w'}) SET n:Handler SET n += {method: 'O_w', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 117, sourceColumn: 1, sourceEndLine: 120, sourceParameters: 'uint8_t data', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(namco_51xx_device::O_w_sync),this), data);'};
MERGE (n:KG {id: 'handler:namco_51xx_device.O_w_sync'}) SET n:Handler SET n += {method: 'O_w_sync', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 122, sourceColumn: 1, sourceEndLine: 125, sourceParameters: 'int param', sourceBody: 'm_portO = param;'};
MERGE (n:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:6'}) SET n:Callback SET n += {signal: 'write_p', operation: 'set', raw: 'm_cpu->write_p().set(FUNC(namco_51xx_device::P_w))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 177, sourceColumn: 2, sourceEndLine: 177, targetClass: 'namco_51xx_device', targetMethod: 'P_w'};
MERGE (n:KG {id: 'handler:namco_51xx_device.P_w'}) SET n:Handler SET n += {method: 'P_w', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 127, sourceColumn: 1, sourceEndLine: 130, sourceParameters: 'uint8_t data', sourceBody: 'm_out(data);'};
MERGE (n:KG {id: 'inputs:xevious'}) SET n:InputPorts SET n += {name: 'xevious', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1174, sourceColumn: 8, sourceEndLine: 1174};
MERGE (n:KG {id: 'inputs:xevious/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:xevious/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:xevious/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:xevious/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:xevious/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:xevious/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:xevious/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:xevious/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 64};
MERGE (n:KG {id: 'inputs:xevious/IN0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_8WAY', 'PORT_COCKTAIL'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:xevious/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:xevious/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:xevious/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:xevious/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_START1', defaultValue: 4};
MERGE (n:KG {id: 'inputs:xevious/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_START2', defaultValue: 8};
MERGE (n:KG {id: 'inputs:xevious/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_COIN1', defaultValue: 16};
MERGE (n:KG {id: 'inputs:xevious/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_COIN2', defaultValue: 32};
MERGE (n:KG {id: 'inputs:xevious/IN1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_SERVICE1', defaultValue: 64};
MERGE (n:KG {id: 'inputs:xevious/IN1/f7'}) SET n:PortField SET n += {kind: 'service', mask: 128, activeLow: true, defaultValue: 128};
MERGE (n:KG {id: 'inputs:xevious/DSWA'}) SET n:Port SET n += {tag: 'DSWA', modify: false};
MERGE (n:KG {id: 'inputs:xevious/DSWA/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SWA:1,2")'], name: 'Coin A', defaultValue: 3, location: 'SWA:1,2', settings: ['1=2C 1C', '3=1C 1C', '0=2C 3C', '2=1C 2C']};
MERGE (n:KG {id: 'inputs:xevious/DSWA/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 28, modifiers: ['PORT_DIPLOCATION("SWA:3,4,5")'], name: 'Bonus Life', defaultValue: 28, location: 'SWA:3,4,5', settings: ['24=10K, 40K, Every 40K [if "DSWA",0x60,NOTEQUALS,0x00]', '20=10K, 50K, Every 50K [if "DSWA",0x60,NOTEQUALS,0x00]', '16=20K, 50K, Every 50K [if "DSWA",0x60,NOTEQUALS,0x00]', '28=20K, 60K, Every 60K [if "DSWA",0x60,NOTEQUALS,0x00]', '12=20K, 70K, Every 70K [if "DSWA",0x60,NOTEQUALS,0x00]', '8=20K, 80K, Every 80K [if "DSWA",0x60,NOTEQUALS,0x00]', '4=20K and 60K Only [if "DSWA",0x60,NOTEQUALS,0x00]', '0=None [if "DSWA",0x60,NOTEQUALS,0x00]', '24=10K, 50K, Every 50K [if "DSWA",0x60,EQUALS,0x00]', '20=20K, 50K, Every 50K [if "DSWA",0x60,EQUALS,0x00]', '16=20K, 60K, Every 60K [if "DSWA",0x60,EQUALS,0x00]', '28=20K, 70K, Every 70K [if "DSWA",0x60,EQUALS,0x00]', '12=20K, 80K, Every 80K [if "DSWA",0x60,EQUALS,0x00]', '8=30K, 100K, Every 100K [if "DSWA",0x60,EQUALS,0x00]', '4=20K and 80K Only [if "DSWA",0x60,EQUALS,0x00]', '0=None [if "DSWA",0x60,EQUALS,0x00]']};
MERGE (n:KG {id: 'inputs:xevious/DSWA/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 96, modifiers: ['PORT_DIPLOCATION("SWA:6,7")'], name: 'Lives', defaultValue: 96, location: 'SWA:6,7', settings: ['64=1', '32=2', '96=3', '0=5']};
MERGE (n:KG {id: 'inputs:xevious/DSWA/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("SWA:8")'], name: 'Cabinet', defaultValue: 128, location: 'SWA:8', settings: ['128=Upright', '0=Cocktail']};
MERGE (n:KG {id: 'inputs:xevious/DSWB'}) SET n:Port SET n += {tag: 'DSWB', modify: false};
MERGE (n:KG {id: 'inputs:xevious/DSWB/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_BUTTON2', defaultValue: 1};
MERGE (n:KG {id: 'inputs:xevious/DSWB/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, modifiers: ['PORT_DIPLOCATION("SWB:2")'], name: 'Flags Award Bonus Life', defaultValue: 2, location: 'SWB:2', settings: ['0=No', '2=Yes']};
MERGE (n:KG {id: 'inputs:xevious/DSWB/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 12, modifiers: ['PORT_DIPLOCATION("SWB:3,4")'], name: 'Coin B', defaultValue: 12, location: 'SWB:3,4', settings: ['4=2C 1C', '12=1C 1C', '0=2C 3C', '8=1C 2C']};
MERGE (n:KG {id: 'inputs:xevious/DSWB/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON2', modifiers: ['PORT_COCKTAIL'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:xevious/DSWB/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 96, modifiers: ['PORT_DIPLOCATION("SWB:6,7")'], name: 'Difficulty', defaultValue: 96, location: 'SWB:6,7', settings: ['64=Easy', '96=Normal', '32=Hard', '0=Hardest']};
MERGE (n:KG {id: 'inputs:xevious/DSWB/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("SWB:8")'], name: 'Freeze', defaultValue: 128, location: 'SWB:8', settings: ['128=Off', '0=On']};
MERGE (n:KG {id: 'gfxlayout:bgcharlayout'}) SET n:GfxLayout SET n += {name: 'bgcharlayout', width: 8, height: 8, total: 'RGN_FRAC(1,2)', planes: 2, planeOffsets: [0, 'RGN_FRAC(1,2)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxlayout:spritelayout_xevious'}) SET n:GfxLayout SET n += {name: 'spritelayout_xevious', width: 16, height: 16, total: 'RGN_FRAC(1,2)', planes: 3, planeOffsets: ['RGN_FRAC(1,2)+4', 0, 4], xOffsets: [0, 1, 2, 3, 64, 65, 66, 67, 128, 129, 130, 131, 192, 193, 194, 195], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 256, 264, 272, 280, 288, 296, 304, 312], charIncrement: 512};
MERGE (n:KG {id: 'gfxlayout:gfx_8x8x1'}) SET n:GfxLayout SET n += {name: 'gfx_8x8x1', width: 8, height: 8, total: 'RGN_FRAC(1,1)', planes: 1, planeOffsets: ['RGN_FRAC(0,1)'], xOffsets: [0, 1, 2, 3, 4, 5, 6, 7], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxdecode:gfx_xevious'}) SET n:GfxDecode SET n += {name: 'gfx_xevious', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1516, sourceColumn: 8, sourceEndLine: 1516};
MERGE (n:KG {id: 'gfxdecode:gfx_xevious/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'gfx_8x8x1', colorBase: 1024, colorCount: 64, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_xevious/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx2', offset: 0, layout: 'bgcharlayout', colorBase: 0, colorCount: 128, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_xevious/e2'}) SET n:GfxDecodeEntry SET n += {region: 'gfx3', offset: 0, layout: 'spritelayout_xevious', colorBase: 512, colorCount: 64, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'device:xevious_state.xevious/palette/callback:palette_init'}) SET n:Callback SET n += {signal: 'palette_init', operation: 'palette_init', raw: 'PALETTE(config, m_palette, FUNC(xevious_state::xevious_palette), 128*4 + 64*8 + 64*2, 128+1)', ownerTag: 'palette', targetClass: 'xevious_state', targetMethod: 'xevious_palette', entries: 129, sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1828};
MERGE (n:KG {id: 'handler:xevious_state.xevious_palette'}) SET n:Handler SET n += {method: 'xevious_palette', ownerClass: 'xevious_state', sourceFile: 'src/mame/namco/xevious.cpp', sourceLine: 30, sourceColumn: 1, sourceEndLine: 100, sourceParameters: 'palette_device &palette', sourceBody: 'const uint8_t *color_prom = memregion("proms")->base();
	auto const TOTAL_COLORS = [this] (int gfxn) { return m_gfxdecode->gfx(gfxn)->colors() * m_gfxdecode->gfx(gfxn)->granularity(); };

	for (int i = 0; i < 128; i++)
	{
		int bit0, bit1, bit2, bit3;

		// red component
		bit0 = BIT(color_prom[0], 0);
		bit1 = BIT(color_prom[0], 1);
		bit2 = BIT(color_prom[0], 2);
		bit3 = BIT(color_prom[0], 3);
		int const r = 0x0e * bit0 + 0x1f * bit1 + 0x43 * bit2 + 0x8f * bit3;
		// green component
		bit0 = BIT(color_prom[256], 0);
		bit1 = BIT(color_prom[256], 1);
		bit2 = BIT(color_prom[256], 2);
		bit3 = BIT(color_prom[256], 3);
		int const g = 0x0e * bit0 + 0x1f * bit1 + 0x43 * bit2 + 0x8f * bit3;
		// blue component
		bit0 = BIT(color_prom[2*256], 0);
		bit1 = BIT(color_prom[2*256], 1);
		bit2 = BIT(color_prom[2*256], 2);
		bit3 = BIT(color_prom[2*256], 3);
		int const b = 0x0e * bit0 + 0x1f * bit1 + 0x43 * bit2 + 0x8f * bit3;

		palette.set_indirect_color(i, rgb_t(r, g, b));
		color_prom++;
	}

	// color 0x80 is used by sprites to mark transparency
	palette.set_indirect_color(0x80, rgb_t(0, 0, 0));

	color_prom += 128;  // the bottom part of the PROM is unused
	color_prom += 2*256;
	// color_prom now points to the beginning of the lookup table

	// background tiles
	for (int i = 0; i < TOTAL_COLORS(1); i++)
	{
		palette.set_pen_indirect(
				m_gfxdecode->gfx(1)->colorbase() + i,
				(color_prom[0] & 0x0f) | ((color_prom[TOTAL_COLORS(1)] & 0x0f) << 4));

		color_prom++;
	}
	color_prom += TOTAL_COLORS(1);

	// sprites
	for (int i = 0; i < TOTAL_COLORS(2); i++)
	{
		int const c = (color_prom[0] & 0x0f) | ((color_prom[TOTAL_COLORS(2)] & 0x0f) << 4);

		palette.set_pen_indirect(
				m_gfxdecode->gfx(2)->colorbase() + i,
				(c & 0x80) ? (c & 0x7f) : 0x80);

		color_prom++;
	}
	color_prom += TOTAL_COLORS(2);

	// foreground characters
	for (int i = 0; i < TOTAL_COLORS(0); i++)
	{
		palette.set_pen_indirect(
				m_gfxdecode->gfx(0)->colorbase() + i,
				BIT(i, 0) ? (i >> 1) : 0x80);
	}'};
MATCH (a:KG {id: 'game:xevious'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3578, sourceColumn: 1, sourceEndLine: 3578};
MATCH (a:KG {id: 'game:xevious'}), (b:KG {id: 'machine:xevious_state.xevious'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:xevious'}), (b:KG {id: 'inputs:xevious'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:xevious'}), (b:KG {id: 'romset:xevious'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/galaga.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/galaga.cpp'}), (b:KG {id: 'file:bosco.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/galaga.cpp'}), (b:KG {id: 'file:digdug.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/galaga.cpp'}), (b:KG {id: 'file:galaga.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/galaga.cpp'}), (b:KG {id: 'file:xevious.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/galaga.cpp'}), (b:KG {id: 'file:namco52.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/galaga.cpp'}), (b:KG {id: 'file:namco54.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/galaga.cpp'}), (b:KG {id: 'file:cpu/mb88xx/mb88xx.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/galaga.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/galaga.cpp'}), (b:KG {id: 'file:namco06.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/galaga.cpp'}), (b:KG {id: 'file:namco50.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/galaga.cpp'}), (b:KG {id: 'file:namco51.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/galaga.cpp'}), (b:KG {id: 'file:namco53.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/galaga.cpp'}), (b:KG {id: 'file:machine/rescap.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/galaga.cpp'}), (b:KG {id: 'file:machine/watchdog.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/galaga.cpp'}), (b:KG {id: 'file:sound/samples.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/galaga.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:xevious_state.xevious'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1766, sourceColumn: 1, sourceEndLine: 1838};
MATCH (a:KG {id: 'machine:xevious_state.xevious'}), (b:KG {id: 'handler:galaga_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:xevious_state.xevious'}), (b:KG {id: 'handler:xevious_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:xevious_state.xevious'}), (b:KG {id: 'callback:timer/galaga_state.cpu3_interrupt_callback'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:xevious_state.xevious'}), (b:KG {id: 'device:xevious_state.xevious/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:xevious_state.xevious'}), (b:KG {id: 'device:xevious_state.xevious/sub'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:xevious_state.xevious'}), (b:KG {id: 'device:xevious_state.xevious/sub2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:xevious_state.xevious'}), (b:KG {id: 'device:xevious_state.xevious/misclatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:xevious_state.xevious'}), (b:KG {id: 'device:xevious_state.xevious/50xx'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:xevious_state.xevious'}), (b:KG {id: 'device:xevious_state.xevious/51xx'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:xevious_state.xevious'}), (b:KG {id: 'device:xevious_state.xevious/54xx'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:xevious_state.xevious'}), (b:KG {id: 'device:xevious_state.xevious/06xx'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:xevious_state.xevious'}), (b:KG {id: 'device:xevious_state.xevious/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:xevious_state.xevious'}), (b:KG {id: 'device:xevious_state.xevious/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:xevious_state.xevious'}), (b:KG {id: 'device:xevious_state.xevious/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:xevious_state.xevious'}), (b:KG {id: 'gfxdecode:gfx_xevious'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:xevious_state.xevious'}), (b:KG {id: 'device:xevious_state.xevious/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:xevious_state.xevious'}), (b:KG {id: 'device:xevious_state.xevious/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:xevious_state.xevious'}), (b:KG {id: 'device:xevious_state.xevious/namco'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:xevious_state.xevious'}), (b:KG {id: 'device:xevious_state.xevious/discrete'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:xevious'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1174, sourceColumn: 8, sourceEndLine: 1174};
MATCH (a:KG {id: 'inputs:xevious'}), (b:KG {id: 'inputs:xevious/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:xevious'}), (b:KG {id: 'inputs:xevious/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:xevious'}), (b:KG {id: 'inputs:xevious/DSWA'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:xevious'}), (b:KG {id: 'inputs:xevious/DSWB'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:xevious'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2665, sourceColumn: 1, sourceEndLine: 2665};
MATCH (a:KG {id: 'romset:xevious'}), (b:KG {id: 'region:xevious/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:xevious'}), (b:KG {id: 'region:xevious/sub'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:xevious'}), (b:KG {id: 'region:xevious/sub2'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:xevious'}), (b:KG {id: 'region:xevious/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:xevious'}), (b:KG {id: 'region:xevious/gfx2'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:xevious'}), (b:KG {id: 'region:xevious/gfx3'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:xevious'}), (b:KG {id: 'region:xevious/gfx4'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:xevious'}), (b:KG {id: 'region:xevious/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:xevious'}), (b:KG {id: 'region:xevious/pals_vidbd'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:xevious'}), (b:KG {id: 'region:xevious/namco'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:xevious_state.video_start'}), (b:KG {id: 'handler:xevious_state.get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:xevious_state.video_start'}), (b:KG {id: 'handler:xevious_state.get_fg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'callback:timer/galaga_state.cpu3_interrupt_callback'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 786, sourceColumn: 1, sourceEndLine: 799};
MATCH (a:KG {id: 'callback:timer/galaga_state.cpu3_interrupt_callback'}), (b:KG {id: 'handler:galaga_state.cpu3_interrupt_callback'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/maincpu'}), (b:KG {id: 'map:xevious_state.xevious_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:xevious_state.xevious/sub'}), (b:KG {id: 'map:xevious_state.xevious_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:xevious_state.xevious/sub2'}), (b:KG {id: 'map:xevious_state.xevious_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:xevious_state.xevious/misclatch'}), (b:KG {id: 'device:xevious_state.xevious/misclatch/callback:misclatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/misclatch'}), (b:KG {id: 'device:xevious_state.xevious/misclatch/callback:misclatch:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/misclatch'}), (b:KG {id: 'device:xevious_state.xevious/misclatch/callback:misclatch:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/misclatch'}), (b:KG {id: 'device:xevious_state.xevious/misclatch/callback:misclatch:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/misclatch'}), (b:KG {id: 'device:xevious_state.xevious/misclatch/callback:misclatch:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/misclatch'}), (b:KG {id: 'device:xevious_state.xevious/misclatch/callback:misclatch:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/misclatch'}), (b:KG {id: 'device:xevious_state.xevious/misclatch/callback:misclatch:6'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/misclatch'}), (b:KG {id: 'device:xevious_state.xevious/misclatch/callback:misclatch:7'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/50xx'}), (b:KG {id: 'machine:namco_50xx_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/51xx'}), (b:KG {id: 'device:xevious_state.xevious/51xx/callback:51xx:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/51xx'}), (b:KG {id: 'device:xevious_state.xevious/51xx/callback:51xx:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/51xx'}), (b:KG {id: 'device:xevious_state.xevious/51xx/callback:51xx:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/51xx'}), (b:KG {id: 'device:xevious_state.xevious/51xx/callback:51xx:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/51xx'}), (b:KG {id: 'device:xevious_state.xevious/51xx/callback:51xx:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/51xx'}), (b:KG {id: 'device:xevious_state.xevious/51xx/callback:51xx:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/51xx'}), (b:KG {id: 'machine:namco_51xx_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/54xx'}), (b:KG {id: 'machine:namco_54xx_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx'}), (b:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx'}), (b:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx'}), (b:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx'}), (b:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx'}), (b:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx'}), (b:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx'}), (b:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:6'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx'}), (b:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:7'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx'}), (b:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:8'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx'}), (b:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:9'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx'}), (b:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:10'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/screen'}), (b:KG {id: 'device:xevious_state.xevious/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/screen'}), (b:KG {id: 'device:xevious_state.xevious/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/screen'}), (b:KG {id: 'device:xevious_state.xevious/screen/callback:screen:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_xevious'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1516, sourceColumn: 8, sourceEndLine: 1516};
MATCH (a:KG {id: 'gfxdecode:gfx_xevious'}), (b:KG {id: 'gfxdecode:gfx_xevious/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_xevious'}), (b:KG {id: 'gfxdecode:gfx_xevious/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_xevious'}), (b:KG {id: 'gfxdecode:gfx_xevious/e2'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/palette'}), (b:KG {id: 'device:xevious_state.xevious/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/namco'}), (b:KG {id: 'audioroute:device:xevious_state.xevious/namco/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/discrete'}), (b:KG {id: 'audioroute:device:xevious_state.xevious/discrete/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:xevious/IN0'}), (b:KG {id: 'inputs:xevious/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/IN0'}), (b:KG {id: 'inputs:xevious/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/IN0'}), (b:KG {id: 'inputs:xevious/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/IN0'}), (b:KG {id: 'inputs:xevious/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/IN0'}), (b:KG {id: 'inputs:xevious/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/IN0'}), (b:KG {id: 'inputs:xevious/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/IN0'}), (b:KG {id: 'inputs:xevious/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/IN0'}), (b:KG {id: 'inputs:xevious/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/IN1'}), (b:KG {id: 'inputs:xevious/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/IN1'}), (b:KG {id: 'inputs:xevious/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/IN1'}), (b:KG {id: 'inputs:xevious/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/IN1'}), (b:KG {id: 'inputs:xevious/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/IN1'}), (b:KG {id: 'inputs:xevious/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/IN1'}), (b:KG {id: 'inputs:xevious/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/IN1'}), (b:KG {id: 'inputs:xevious/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/IN1'}), (b:KG {id: 'inputs:xevious/IN1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/DSWA'}), (b:KG {id: 'inputs:xevious/DSWA/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/DSWA'}), (b:KG {id: 'inputs:xevious/DSWA/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/DSWA'}), (b:KG {id: 'inputs:xevious/DSWA/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/DSWA'}), (b:KG {id: 'inputs:xevious/DSWA/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/DSWB'}), (b:KG {id: 'inputs:xevious/DSWB/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/DSWB'}), (b:KG {id: 'inputs:xevious/DSWB/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/DSWB'}), (b:KG {id: 'inputs:xevious/DSWB/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/DSWB'}), (b:KG {id: 'inputs:xevious/DSWB/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/DSWB'}), (b:KG {id: 'inputs:xevious/DSWB/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:xevious/DSWB'}), (b:KG {id: 'inputs:xevious/DSWB/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:xevious/maincpu'}), (b:KG {id: 'rom:xevious/maincpu/xvi_1.3p'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/maincpu'}), (b:KG {id: 'rom:xevious/maincpu/xvi_2.3m'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/maincpu'}), (b:KG {id: 'rom:xevious/maincpu/xvi_3.2m'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/maincpu'}), (b:KG {id: 'rom:xevious/maincpu/xvi_4.2l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/sub'}), (b:KG {id: 'rom:xevious/sub/xvi_5.3f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/sub'}), (b:KG {id: 'rom:xevious/sub/xvi_6.3j'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/sub2'}), (b:KG {id: 'rom:xevious/sub2/xvi_7.2c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/gfx1'}), (b:KG {id: 'rom:xevious/gfx1/xvi_12.3b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/gfx2'}), (b:KG {id: 'rom:xevious/gfx2/xvi_13.3c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/gfx2'}), (b:KG {id: 'rom:xevious/gfx2/xvi_14.3d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/gfx3'}), (b:KG {id: 'rom:xevious/gfx3/xvi_15.4m'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/gfx3'}), (b:KG {id: 'rom:xevious/gfx3/xvi_17.4p'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/gfx3'}), (b:KG {id: 'rom:xevious/gfx3/xvi_16.4n'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/gfx3'}), (b:KG {id: 'rom:xevious/gfx3/xvi_18.4r'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/gfx4'}), (b:KG {id: 'rom:xevious/gfx4/xvi_9.2a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/gfx4'}), (b:KG {id: 'rom:xevious/gfx4/xvi_10.2b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/gfx4'}), (b:KG {id: 'rom:xevious/gfx4/xvi_11.2c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/proms'}), (b:KG {id: 'rom:xevious/proms/xvi-8.6a'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/proms'}), (b:KG {id: 'rom:xevious/proms/xvi-9.6d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/proms'}), (b:KG {id: 'rom:xevious/proms/xvi-10.6e'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/proms'}), (b:KG {id: 'rom:xevious/proms/xvi-7.4h'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/proms'}), (b:KG {id: 'rom:xevious/proms/xvi-6.4f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/proms'}), (b:KG {id: 'rom:xevious/proms/xvi-4.3l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/proms'}), (b:KG {id: 'rom:xevious/proms/xvi-5.3m'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/pals_vidbd'}), (b:KG {id: 'rom:xevious/pals_vidbd/xvi-3.1f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/namco'}), (b:KG {id: 'rom:xevious/namco/xvi-2.7n'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:xevious/namco'}), (b:KG {id: 'rom:xevious/namco/xvi-1.5n'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 899, sourceColumn: 1, sourceEndLine: 918};
MATCH (a:KG {id: 'map:xevious_state.xevious_map'}), (b:KG {id: 'map:xevious_state.xevious_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map'}), (b:KG {id: 'map:xevious_state.xevious_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map'}), (b:KG {id: 'map:xevious_state.xevious_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map'}), (b:KG {id: 'map:xevious_state.xevious_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map'}), (b:KG {id: 'map:xevious_state.xevious_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map'}), (b:KG {id: 'map:xevious_state.xevious_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map'}), (b:KG {id: 'map:xevious_state.xevious_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map'}), (b:KG {id: 'map:xevious_state.xevious_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map'}), (b:KG {id: 'map:xevious_state.xevious_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map'}), (b:KG {id: 'map:xevious_state.xevious_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map'}), (b:KG {id: 'map:xevious_state.xevious_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map'}), (b:KG {id: 'map:xevious_state.xevious_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map'}), (b:KG {id: 'map:xevious_state.xevious_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map'}), (b:KG {id: 'map:xevious_state.xevious_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map'}), (b:KG {id: 'map:xevious_state.xevious_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map'}), (b:KG {id: 'map:xevious_state.xevious_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map'}), (b:KG {id: 'map:xevious_state.xevious_map/range16'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/misclatch/callback:misclatch:0'}), (b:KG {id: 'handler:galaga_state.irq1_clear_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/misclatch/callback:misclatch:1'}), (b:KG {id: 'handler:galaga_state.irq2_clear_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/misclatch/callback:misclatch:2'}), (b:KG {id: 'handler:galaga_state.nmion_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/misclatch/callback:misclatch:3'}), (b:KG {id: 'device:xevious_state.xevious/sub'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/misclatch/callback:misclatch:4'}), (b:KG {id: 'device:xevious_state.xevious/sub2'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/misclatch/callback:misclatch:5'}), (b:KG {id: 'handler:namco_50xx_device.reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/misclatch/callback:misclatch:6'}), (b:KG {id: 'handler:namco_51xx_device.reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/misclatch/callback:misclatch:7'}), (b:KG {id: 'handler:namco_54xx_device.reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:namco_50xx_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/namco/namco50.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/namco50.cpp', sourceLine: 238, sourceColumn: 1, sourceEndLine: 245};
MATCH (a:KG {id: 'machine:namco_50xx_device.device_add_mconfig'}), (b:KG {id: 'device:namco_50xx_device.device_add_mconfig/mcu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/51xx/callback:51xx:4'}), (b:KG {id: 'handler:galaga_state.out'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/51xx/callback:51xx:5'}), (b:KG {id: 'handler:galaga_state.lockout'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:namco_51xx_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/namco/namco51.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 168, sourceColumn: 1, sourceEndLine: 178};
MATCH (a:KG {id: 'machine:namco_51xx_device.device_add_mconfig'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:namco_54xx_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/namco/namco54.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 136, sourceColumn: 1, sourceEndLine: 143};
MATCH (a:KG {id: 'machine:namco_54xx_device.device_add_mconfig'}), (b:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:0'}), (b:KG {id: 'device:xevious_state.xevious/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:1'}), (b:KG {id: 'handler:namco_51xx_device.chip_select'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:1'}), (b:KG {id: 'device:xevious_state.xevious/51xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:2'}), (b:KG {id: 'handler:namco_51xx_device.rw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:2'}), (b:KG {id: 'device:xevious_state.xevious/51xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:3'}), (b:KG {id: 'handler:namco_51xx_device.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:3'}), (b:KG {id: 'device:xevious_state.xevious/51xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:4'}), (b:KG {id: 'handler:namco_51xx_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:4'}), (b:KG {id: 'device:xevious_state.xevious/51xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:5'}), (b:KG {id: 'handler:namco_50xx_device.chip_select'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:5'}), (b:KG {id: 'device:xevious_state.xevious/50xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:6'}), (b:KG {id: 'handler:namco_50xx_device.rw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:6'}), (b:KG {id: 'device:xevious_state.xevious/50xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:7'}), (b:KG {id: 'handler:namco_50xx_device.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:7'}), (b:KG {id: 'device:xevious_state.xevious/50xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:8'}), (b:KG {id: 'handler:namco_50xx_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:8'}), (b:KG {id: 'device:xevious_state.xevious/50xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:9'}), (b:KG {id: 'handler:namco_54xx_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:9'}), (b:KG {id: 'device:xevious_state.xevious/54xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:10'}), (b:KG {id: 'handler:namco_54xx_device.chip_select'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/06xx/callback:06xx:10'}), (b:KG {id: 'device:xevious_state.xevious/54xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/screen/callback:screen:0'}), (b:KG {id: 'handler:xevious_state.screen_update_xevious'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/screen/callback:screen:1'}), (b:KG {id: 'handler:galaga_state.vblank_irq'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/screen/callback:screen:2'}), (b:KG {id: 'handler:namco_51xx_device.vblank'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/screen/callback:screen:2'}), (b:KG {id: 'device:xevious_state.xevious/51xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_xevious/e0'}), (b:KG {id: 'gfxlayout:gfx_8x8x1'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_xevious/e1'}), (b:KG {id: 'gfxlayout:bgcharlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_xevious/e2'}), (b:KG {id: 'gfxlayout:spritelayout_xevious'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:xevious_state.xevious/palette/callback:palette_init'}), (b:KG {id: 'handler:xevious_state.xevious_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map/range1'}), (b:KG {id: 'handler:xevious_state.bosco_dsw_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map/range2'}), (b:KG {id: 'handler:namco_wsg_device.pacman_sound_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'namco'};
MATCH (a:KG {id: 'map:xevious_state.xevious_map/range3'}), (b:KG {id: 'handler:ls259_device.write_d0'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'misclatch'};
MATCH (a:KG {id: 'map:xevious_state.xevious_map/range4'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:xevious_state.xevious_map/range5'}), (b:KG {id: 'handler:namco_06xx_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: '06xx'};
MATCH (a:KG {id: 'map:xevious_state.xevious_map/range5'}), (b:KG {id: 'handler:namco_06xx_device.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: '06xx'};
MATCH (a:KG {id: 'map:xevious_state.xevious_map/range6'}), (b:KG {id: 'handler:namco_06xx_device.ctrl_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: '06xx'};
MATCH (a:KG {id: 'map:xevious_state.xevious_map/range6'}), (b:KG {id: 'handler:namco_06xx_device.ctrl_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: '06xx'};
MATCH (a:KG {id: 'map:xevious_state.xevious_map/range11'}), (b:KG {id: 'handler:xevious_state.xevious_fg_colorram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map/range12'}), (b:KG {id: 'handler:xevious_state.xevious_bg_colorram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map/range13'}), (b:KG {id: 'handler:xevious_state.xevious_fg_videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map/range14'}), (b:KG {id: 'handler:xevious_state.xevious_bg_videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map/range15'}), (b:KG {id: 'handler:xevious_state.xevious_vh_latch_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map/range16'}), (b:KG {id: 'handler:xevious_state.xevious_bb_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:xevious_state.xevious_map/range16'}), (b:KG {id: 'handler:xevious_state.xevious_bs_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/namco50.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/namco50.cpp'}), (b:KG {id: 'file:namco50.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'device:namco_50xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_50xx_device.device_add_mconfig/mcu/callback:mcu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_50xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_50xx_device.device_add_mconfig/mcu/callback:mcu:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_50xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_50xx_device.device_add_mconfig/mcu/callback:mcu:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_50xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_50xx_device.device_add_mconfig/mcu/callback:mcu:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/namco51.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/namco51.cpp'}), (b:KG {id: 'file:namco51.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/namco51.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:6'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/namco54.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/namco54.cpp'}), (b:KG {id: 'file:namco54.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu/callback:mcu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu/callback:mcu:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu/callback:mcu:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu/callback:mcu:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'handler:namco_51xx_device.rw'}), (b:KG {id: 'handler:namco_51xx_device.rw_sync'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_51xx_device.write'}), (b:KG {id: 'handler:namco_51xx_device.write_sync'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_50xx_device.rw'}), (b:KG {id: 'handler:namco_50xx_device.rw_sync'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_50xx_device.write'}), (b:KG {id: 'handler:namco_50xx_device.write_sync'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_54xx_device.write'}), (b:KG {id: 'handler:namco_54xx_device.write_sync'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:xevious_state.screen_update_xevious'}), (b:KG {id: 'handler:xevious_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:gfx_8x8x1'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:bgcharlayout'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:spritelayout_xevious'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'handler:namco_06xx_device.data_w'}), (b:KG {id: 'handler:namco_06xx_device.write_sync'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_06xx_device.ctrl_w'}), (b:KG {id: 'handler:namco_06xx_device.ctrl_w_sync'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_50xx_device.device_add_mconfig/mcu/callback:mcu:0'}), (b:KG {id: 'handler:namco_50xx_device.K_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_50xx_device.device_add_mconfig/mcu/callback:mcu:1'}), (b:KG {id: 'handler:namco_50xx_device.R0_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_50xx_device.device_add_mconfig/mcu/callback:mcu:2'}), (b:KG {id: 'handler:namco_50xx_device.R2_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_50xx_device.device_add_mconfig/mcu/callback:mcu:3'}), (b:KG {id: 'handler:namco_50xx_device.O_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:0'}), (b:KG {id: 'handler:namco_51xx_device.K_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:1'}), (b:KG {id: 'handler:namco_51xx_device.R_r_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:2'}), (b:KG {id: 'handler:namco_51xx_device.R_r_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:3'}), (b:KG {id: 'handler:namco_51xx_device.R_r_2'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:4'}), (b:KG {id: 'handler:namco_51xx_device.R_r_3'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:5'}), (b:KG {id: 'handler:namco_51xx_device.O_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback:mcu:6'}), (b:KG {id: 'handler:namco_51xx_device.P_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu/callback:mcu:0'}), (b:KG {id: 'handler:namco_54xx_device.K_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu/callback:mcu:1'}), (b:KG {id: 'handler:namco_54xx_device.O_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu/callback:mcu:2'}), (b:KG {id: 'handler:namco_54xx_device.R0_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu/callback:mcu:3'}), (b:KG {id: 'handler:namco_54xx_device.R1_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_06xx_device.ctrl_w_sync'}), (b:KG {id: 'handler:namco_06xx_device.set_nmi'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_50xx_device.O_w'}), (b:KG {id: 'handler:namco_50xx_device.O_w_sync'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_51xx_device.O_w'}), (b:KG {id: 'handler:namco_51xx_device.O_w_sync'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_54xx_device.O_w'}), (b:KG {id: 'handler:namco_54xx_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_54xx_device.R1_w'}), (b:KG {id: 'handler:namco_54xx_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
