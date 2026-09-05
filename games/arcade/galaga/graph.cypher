// mamekit knowledge graph — driver src/mame/namco/galaga.cpp
// generated 2026-09-05T03:49:33.167Z
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
MERGE (n:KG {id: 'game:galaga'}) SET n:Game SET n += {name: 'galaga', year: '1981', company: 'Namco', fullname: 'Galaga (Namco rev. B)', monitor: 'ROT90', cls: 'galaga_state', init: 'init_galaga', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3572, sourceColumn: 1, sourceEndLine: 3572, romTransforms: ['{"kind":"conditional-byte-swap","region":"gfx1","indexMask":2056,"indexValue":2048,"displacement":8}'], classConstants: '{"m_galaga_gfxbank":0,"m_main_irq_mask":0,"m_sub_irq_mask":0,"m_sub2_nmi_mask":0}'};
MERGE (n:KG {id: 'romset:galaga'}) SET n:RomSet SET n += {name: 'galaga', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2406, sourceColumn: 1, sourceEndLine: 2406};
MERGE (n:KG {id: 'region:galaga/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1982, sourceColumn: 2, sourceEndLine: 1982};
MERGE (n:KG {id: 'rom:galaga/maincpu/gg1_1b.3p'}) SET n:Rom SET n += {file: 'gg1_1b.3p', offset: 0, size: 4096, crc: 'ab036c9f', sha1: 'ca7f5da42d4e76fd89bb0b35198a23c01462fbfe', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2408, sourceColumn: 2, sourceEndLine: 2408};
MERGE (n:KG {id: 'rom:galaga/maincpu/gg1_2b.3m'}) SET n:Rom SET n += {file: 'gg1_2b.3m', offset: 4096, size: 4096, crc: 'd9232240', sha1: 'ab202aa259c3d332ef13dfb8fc8580ce2a5a253d', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2409, sourceColumn: 2, sourceEndLine: 2409};
MERGE (n:KG {id: 'rom:galaga/maincpu/gg1_3.2m'}) SET n:Rom SET n += {file: 'gg1_3.2m', offset: 8192, size: 4096, crc: '753ce503', sha1: '481f443aea3ed3504ec2f3a6bfcf3cd47e2f8f81', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2410, sourceColumn: 2, sourceEndLine: 2410};
MERGE (n:KG {id: 'rom:galaga/maincpu/gg1_4b.2l'}) SET n:Rom SET n += {file: 'gg1_4b.2l', offset: 12288, size: 4096, crc: '499fcc76', sha1: 'ddb8b121903646c320939c7d13f4aa4ebb130378', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2411, sourceColumn: 2, sourceEndLine: 2411};
MERGE (n:KG {id: 'region:galaga/sub'}) SET n:RomRegion SET n += {tag: 'sub', size: 65536, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1988, sourceColumn: 2, sourceEndLine: 1988};
MERGE (n:KG {id: 'rom:galaga/sub/gg1_5b.3f'}) SET n:Rom SET n += {file: 'gg1_5b.3f', offset: 0, size: 4096, crc: 'bb5caae3', sha1: 'e957a581463caac27bc37ca2e2a90f27e4f62b6f', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2414, sourceColumn: 2, sourceEndLine: 2414};
MERGE (n:KG {id: 'region:galaga/sub2'}) SET n:RomRegion SET n += {tag: 'sub2', size: 65536, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1992, sourceColumn: 2, sourceEndLine: 1992};
MERGE (n:KG {id: 'rom:galaga/sub2/gg1_7b.2c'}) SET n:Rom SET n += {file: 'gg1_7b.2c', offset: 0, size: 4096, crc: 'd016686b', sha1: '44c1a04fba3c7c826ff484185cb881b4b22e6657', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2417, sourceColumn: 2, sourceEndLine: 2417};
MERGE (n:KG {id: 'region:galaga/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 4096, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1995, sourceColumn: 2, sourceEndLine: 1995};
MERGE (n:KG {id: 'rom:galaga/gfx1/gg1_9.4l'}) SET n:Rom SET n += {file: 'gg1_9.4l', offset: 0, size: 4096, crc: '58b2f47c', sha1: '62f1279a784ab2f8218c4137c7accda00e6a3490', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2420, sourceColumn: 2, sourceEndLine: 2420};
MERGE (n:KG {id: 'region:galaga/gfx2'}) SET n:RomRegion SET n += {tag: 'gfx2', size: 8192, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1998, sourceColumn: 2, sourceEndLine: 1998};
MERGE (n:KG {id: 'rom:galaga/gfx2/gg1_11.4d'}) SET n:Rom SET n += {file: 'gg1_11.4d', offset: 0, size: 4096, crc: 'ad447c80', sha1: 'e697c180178cabd1d32483c5d8889a40633f7857', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2423, sourceColumn: 2, sourceEndLine: 2423};
MERGE (n:KG {id: 'rom:galaga/gfx2/gg1_10.4f'}) SET n:Rom SET n += {file: 'gg1_10.4f', offset: 4096, size: 4096, crc: 'dd6f1afc', sha1: 'c340ed8c25e0979629a9a1730edc762bd72d0cff', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2424, sourceColumn: 2, sourceEndLine: 2424};
MERGE (n:KG {id: 'region:galaga/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 544, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2004, sourceColumn: 2, sourceEndLine: 2004};
MERGE (n:KG {id: 'rom:galaga/proms/prom-5.5n'}) SET n:Rom SET n += {file: 'prom-5.5n', offset: 0, size: 32, crc: '54603c6b', sha1: '1a6dea13b4af155d9cb5b999a75d4f1eb9c71346', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2427, sourceColumn: 2, sourceEndLine: 2427};
MERGE (n:KG {id: 'rom:galaga/proms/prom-4.2n'}) SET n:Rom SET n += {file: 'prom-4.2n', offset: 32, size: 256, crc: '59b6edab', sha1: '0281de86c236c88739297ff712e0a4f5c8bf8ab9', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2428, sourceColumn: 2, sourceEndLine: 2428};
MERGE (n:KG {id: 'rom:galaga/proms/prom-3.1c'}) SET n:Rom SET n += {file: 'prom-3.1c', offset: 288, size: 256, crc: '4a04bb6b', sha1: 'cdd4bc1013f5c11984fdc4fd10e2d2e27120c1e5', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2429, sourceColumn: 2, sourceEndLine: 2429};
MERGE (n:KG {id: 'region:galaga/namco'}) SET n:RomRegion SET n += {tag: 'namco', size: 512, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2010, sourceColumn: 2, sourceEndLine: 2010};
MERGE (n:KG {id: 'rom:galaga/namco/prom-1.1d'}) SET n:Rom SET n += {file: 'prom-1.1d', offset: 0, size: 256, crc: '7a2815b4', sha1: '085ada18c498fdb18ecedef0ea8fe9217edb7b46', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2432, sourceColumn: 2, sourceEndLine: 2432};
MERGE (n:KG {id: 'rom:galaga/namco/prom-2.5c'}) SET n:Rom SET n += {file: 'prom-2.5c', offset: 256, size: 256, crc: '77245b66', sha1: '0c4d0bee858b97632411c440bea6948a74759746', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2433, sourceColumn: 2, sourceEndLine: 2433};
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
MERGE (n:KG {id: 'map:galaga_state.galaga_map'}) SET n:AddressMap SET n += {cls: 'galaga_state', name: 'galaga_map', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 876, sourceColumn: 1, sourceEndLine: 890};
MERGE (n:KG {id: 'map:galaga_state.galaga_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 16383, raw: 'map(0x0000, 0x3fff).rom().nopw()', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 878, sourceColumn: 2, sourceEndLine: 878, rom: true, nopw: true};
MERGE (n:KG {id: 'map:galaga_state.galaga_map/range1'}) SET n:AddressRange SET n += {start: 26624, end: 26631, raw: 'map(0x6800, 0x6807).r(FUNC(galaga_state::bosco_dsw_r))', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 879, sourceColumn: 2, sourceEndLine: 879};
MERGE (n:KG {id: 'handler:galaga_state.bosco_dsw_r'}) SET n:Handler SET n += {method: 'bosco_dsw_r', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 723, sourceColumn: 1, sourceEndLine: 731, sourceParameters: 'offs_t offset', sourceBody: 'int bit0,bit1;

	bit0 = (ioport("DSWB")->read() >> offset) & 1;
	bit1 = (ioport("DSWA")->read() >> offset) & 1;

	return bit0 | (bit1 << 1);'};
MERGE (n:KG {id: 'map:galaga_state.galaga_map/range2'}) SET n:AddressRange SET n += {start: 26624, end: 26655, raw: 'map(0x6800, 0x681f).w(m_namco_sound, FUNC(namco_wsg_device::pacman_sound_w))', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 880, sourceColumn: 2, sourceEndLine: 880};
MERGE (n:KG {id: 'map:galaga_state.galaga_map/range3'}) SET n:AddressRange SET n += {start: 26656, end: 26663, raw: 'map(0x6820, 0x6827).w("misclatch", FUNC(ls259_device::write_d0))', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 881, sourceColumn: 2, sourceEndLine: 881};
MERGE (n:KG {id: 'map:galaga_state.galaga_map/range4'}) SET n:AddressRange SET n += {start: 26672, end: 26672, raw: 'map(0x6830, 0x6830).w("watchdog", FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 882, sourceColumn: 2, sourceEndLine: 882};
MERGE (n:KG {id: 'map:galaga_state.galaga_map/range5'}) SET n:AddressRange SET n += {start: 28672, end: 28927, raw: 'map(0x7000, 0x70ff).rw("06xx", FUNC(namco_06xx_device::data_r), FUNC(namco_06xx_device::data_w))', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 883, sourceColumn: 2, sourceEndLine: 883};
MERGE (n:KG {id: 'map:galaga_state.galaga_map/range6'}) SET n:AddressRange SET n += {start: 28928, end: 28928, raw: 'map(0x7100, 0x7100).rw("06xx", FUNC(namco_06xx_device::ctrl_r), FUNC(namco_06xx_device::ctrl_w))', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 884, sourceColumn: 2, sourceEndLine: 884};
MERGE (n:KG {id: 'map:galaga_state.galaga_map/range7'}) SET n:AddressRange SET n += {start: 32768, end: 34815, raw: 'map(0x8000, 0x87ff).ram().w(FUNC(galaga_state::galaga_videoram_w)).share("videoram")', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 885, sourceColumn: 2, sourceEndLine: 885, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'handler:galaga_state.galaga_videoram_w'}) SET n:Handler SET n += {method: 'galaga_videoram_w', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga_v.cpp', sourceLine: 173, sourceColumn: 1, sourceEndLine: 177, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[offset] = data;
	m_fg_tilemap->mark_tile_dirty(offset & 0x3ff);'};
MERGE (n:KG {id: 'map:galaga_state.galaga_map/range8'}) SET n:AddressRange SET n += {start: 34816, end: 35839, raw: 'map(0x8800, 0x8bff).ram().share("galaga_ram1")', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 886, sourceColumn: 2, sourceEndLine: 886, ram: true, share: 'galaga_ram1'};
MERGE (n:KG {id: 'map:galaga_state.galaga_map/range9'}) SET n:AddressRange SET n += {start: 36864, end: 37887, raw: 'map(0x9000, 0x93ff).ram().share("galaga_ram2")', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 887, sourceColumn: 2, sourceEndLine: 887, ram: true, share: 'galaga_ram2'};
MERGE (n:KG {id: 'map:galaga_state.galaga_map/range10'}) SET n:AddressRange SET n += {start: 38912, end: 39935, raw: 'map(0x9800, 0x9bff).ram().share("galaga_ram3")', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 888, sourceColumn: 2, sourceEndLine: 888, ram: true, share: 'galaga_ram3'};
MERGE (n:KG {id: 'map:galaga_state.galaga_map/range11'}) SET n:AddressRange SET n += {start: 40960, end: 40967, raw: 'map(0xa000, 0xa007).w(m_videolatch, FUNC(ls259_device::write_d0))', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 889, sourceColumn: 2, sourceEndLine: 889};
MERGE (n:KG {id: 'handler:galaga_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 836, sourceColumn: 1, sourceEndLine: 839, sourceParameters: '', sourceBody: 'm_cpu3_interrupt_timer->adjust(m_screen->time_until_pos(64), 64);'};
MERGE (n:KG {id: 'handler:galaga_state.irq1_clear_w'}) SET n:Handler SET n += {method: 'irq1_clear_w', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 733, sourceColumn: 1, sourceEndLine: 738, sourceParameters: 'int state', sourceBody: 'm_main_irq_mask = state;
	if (!m_main_irq_mask)
		m_maincpu->set_input_line(0, CLEAR_LINE);'};
MERGE (n:KG {id: 'handler:galaga_state.irq2_clear_w'}) SET n:Handler SET n += {method: 'irq2_clear_w', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 740, sourceColumn: 1, sourceEndLine: 745, sourceParameters: 'int state', sourceBody: 'm_sub_irq_mask = state;
	if (!m_sub_irq_mask)
		m_subcpu->set_input_line(0, CLEAR_LINE);'};
MERGE (n:KG {id: 'handler:galaga_state.nmion_w'}) SET n:Handler SET n += {method: 'nmion_w', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 747, sourceColumn: 1, sourceEndLine: 750, sourceParameters: 'int state', sourceBody: 'm_sub2_nmi_mask = !state;'};
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
MERGE (n:KG {id: 'handler:namco_54xx_device.chip_select'}) SET n:Handler SET n += {method: 'chip_select', ownerClass: 'namco_54xx_device', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 97, sourceColumn: 1, sourceEndLine: 100, sourceConstants: ['MB88XX_IRQ_LINE=0'], sourceParameters: 'int state', sourceBody: 'm_cpu->set_input_line(MB88XX_IRQ_LINE, state ? ASSERT_LINE : CLEAR_LINE);'};
MERGE (n:KG {id: 'handler:namco_54xx_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'namco_54xx_device', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 86, sourceColumn: 1, sourceEndLine: 89, sourceParameters: 'uint8_t data', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(namco_54xx_device::write_sync),this), data);'};
MERGE (n:KG {id: 'handler:namco_54xx_device.write_sync'}) SET n:Handler SET n += {method: 'write_sync', ownerClass: 'namco_54xx_device', sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 91, sourceColumn: 1, sourceEndLine: 94, sourceParameters: 'int param', sourceBody: 'm_latched_cmd = param;'};
MERGE (n:KG {id: 'handler:starfield_05xx_device.draw_starfield'}) SET n:Handler SET n += {method: 'draw_starfield', ownerClass: 'starfield_05xx_device', sourceFile: 'src/mame/namco/starfield_05xx.cpp', sourceLine: 606, sourceColumn: 1, sourceEndLine: 658, sourceConstants: ['STARS_COLOR_BASE=512', 'VISIBLE_LINES=224', 'STARFIELD_PIXEL_WIDTH=256', 'LFSR_HIT_MASK=64020', 'LFSR_HIT_VALUE=30720'], sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect, int flip', sourceBody: 'if (!m_enable)
		return;

	uint16_t pre_vis_cycle_count = m_pre_vis_cycle_count;
	uint16_t post_vis_cycle_count = m_post_vis_cycle_count;

	// Advance the LFSR during the pre-visible portion of the frame
	do { m_lfsr = get_next_lfsr_state(m_lfsr); } while (--pre_vis_cycle_count);

	// Now we are in visible portion of the frame - Output all LFSR hits here
	for (int y = m_offset_y; y < VISIBLE_LINES + m_offset_y; y++)
	{
		for (int x = m_offset_x; x < STARFIELD_PIXEL_WIDTH + m_offset_x; x++)
		{
			// Check lfsr for hit
			if ((m_lfsr&LFSR_HIT_MASK) == LFSR_HIT_VALUE)
			{
				uint8_t star_set = bitswap<2>(m_lfsr, 10, 8);

				if ((m_set_a == star_set) || (m_set_b == star_set))
				{
					// don\'t draw the stars that are beyond the X limit
					if (x < m_limit_x)
					{
						int dx = x;

						if (flip) dx += 64;

						if (cliprect.contains(dx, y))
						{
							uint8_t color;

							color  = (m_lfsr>>5)&0x7;
							color |= (m_lfsr<<3)&0x18;
							color |= (m_lfsr<<2)&0x20;
							color = (~color)&0x3F;

							bitmap.pix(y, dx) = STARS_COLOR_BASE + color;
						}
					}
				}
			}

			// Advance LFSR
			m_lfsr = get_next_lfsr_state(m_lfsr);
		}
	}

	// Advance the LFSR during the post-visible portion of the frame
	do { m_lfsr = get_next_lfsr_state(m_lfsr); } while (--post_vis_cycle_count);'};
MERGE (n:KG {id: 'handler:starfield_05xx_device.get_next_lfsr_state'}) SET n:Handler SET n += {method: 'get_next_lfsr_state', ownerClass: 'starfield_05xx_device', sourceFile: 'src/mame/namco/starfield_05xx.cpp', sourceLine: 592, sourceColumn: 1, sourceEndLine: 603, sourceParameters: 'uint16_t lfsr', sourceBody: 'uint16_t bit;

	// 16-bit FIBONACCI-style LFSR with taps at 16,13,11, and 6
	// These taps produce a maximal sequence of 65,535 steps.

	bit = ((lfsr >> 0) ^ (lfsr >> 3) ^ (lfsr >> 5) ^ (lfsr >> 10));
	lfsr = (lfsr >> 1) | (bit << 15);

	return lfsr;'};
MERGE (n:KG {id: 'handler:galaga_state.vblank_irq'}) SET n:Handler SET n += {method: 'vblank_irq', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1541, sourceColumn: 1, sourceEndLine: 1548, sourceParameters: 'int state', sourceBody: 'if (state && m_main_irq_mask)
		m_maincpu->set_input_line(0, ASSERT_LINE);

	if (state && m_sub_irq_mask)
		m_subcpu->set_input_line(0, ASSERT_LINE);'};
MERGE (n:KG {id: 'handler:namco_51xx_device.vblank'}) SET n:Handler SET n += {method: 'vblank', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 70, sourceColumn: 1, sourceEndLine: 74, sourceConstants: ['MB88XX_TC_LINE=1'], sourceParameters: 'int state', sourceBody: '// The timer is active on falling edges.
	m_cpu->set_input_line(MB88XX_TC_LINE, state ? CLEAR_LINE : ASSERT_LINE);'};
MERGE (n:KG {id: 'machine:galaga_state.galaga'}) SET n:MachineConfig SET n += {cls: 'galaga_state', name: 'galaga', calls: [], stateMembers: ['{"name":"m_galaga_gfxbank","bits":32}', '{"name":"m_main_irq_mask","bits":8}', '{"name":"m_sub_irq_mask","bits":8}', '{"name":"m_sub2_nmi_mask","bits":8}'], resetHandlers: ['galaga_state.machine_reset'], startHandlers: ['galaga_state.video_start'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1653, sourceColumn: 1, sourceEndLine: 1727};
MERGE (n:KG {id: 'handler:galaga_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga_v.cpp', sourceLine: 154, sourceColumn: 1, sourceEndLine: 162, sourceParameters: '', sourceBody: 'm_fg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(galaga_state::get_tile_info)), tilemap_mapper_delegate(*this, FUNC(galaga_state::tilemap_scan)), 8,8,36,28);
	m_fg_tilemap->configure_groups(*m_gfxdecode->gfx(0), 0x1f);

	m_galaga_gfxbank = 0;

	save_item(NAME(m_galaga_gfxbank));'};
MERGE (n:KG {id: 'handler:galaga_state.get_tile_info'}) SET n:Handler SET n += {method: 'get_tile_info', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga_v.cpp', sourceLine: 131, sourceColumn: 1, sourceEndLine: 144, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: '/* the hardware has two character sets, one normal and one x-flipped. When
	   screen is flipped, character y flip is done by the hardware inverting the
	   timing signals, while x flip is done by selecting the 2nd character set.
	   We reproduce this here, but since the tilemap system automatically flips
	   characters when screen is flipped, we have to flip them back. */
	int color = m_videoram[tile_index + 0x400] & 0x3f;
	tileinfo.set(0,
			(m_videoram[tile_index] & 0x7f) | (flip_screen() ? 0x80 : 0) | (m_galaga_gfxbank << 8),
			color,
			flip_screen() ? TILE_FLIPX : 0);
	tileinfo.group = color;'};
MERGE (n:KG {id: 'handler:galaga_state.tilemap_scan'}) SET n:Handler SET n += {method: 'tilemap_scan', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga_v.cpp', sourceLine: 120, sourceColumn: 1, sourceEndLine: 128, sourceParameters: 'u32 col, u32 row, u32 num_cols, u32 num_rows', sourceBody: 'row += 2;
	col -= 2;
	if (col & 0x20)
		return row + ((col & 0x1f) << 5);
	else
		return col + (row << 5);'};
MERGE (n:KG {id: 'device:galaga_state.galaga/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 3072000, config: ['Z80(config, m_maincpu, MASTER_CLOCK/6)', 'm_maincpu->set_addrmap(AS_PROGRAM, &galaga_state::galaga_map)'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1656, sourceColumn: 2, sourceEndLine: 1656};
MERGE (n:KG {id: 'device:galaga_state.galaga/sub'}) SET n:Device SET n += {type: 'Z80', tag: 'sub', clock: 3072000, config: ['Z80(config, m_subcpu, MASTER_CLOCK/6)', 'm_subcpu->set_addrmap(AS_PROGRAM, &galaga_state::galaga_map)'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1659, sourceColumn: 2, sourceEndLine: 1659};
MERGE (n:KG {id: 'device:galaga_state.galaga/sub2'}) SET n:Device SET n += {type: 'Z80', tag: 'sub2', clock: 3072000, config: ['Z80(config, m_subcpu2, MASTER_CLOCK/6)', 'm_subcpu2->set_addrmap(AS_PROGRAM, &galaga_state::galaga_map)'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1662, sourceColumn: 2, sourceEndLine: 1662};
MERGE (n:KG {id: 'device:galaga_state.galaga/misclatch'}) SET n:Device SET n += {type: 'LS259', tag: 'misclatch', clock: null, config: ['ls259_device &misclatch(LS259(config, "misclatch"))', 'misclatch.q_out_cb<0>().set(FUNC(galaga_state::irq1_clear_w))', 'misclatch.q_out_cb<1>().set(FUNC(galaga_state::irq2_clear_w))', 'misclatch.q_out_cb<2>().set(FUNC(galaga_state::nmion_w))', 'misclatch.q_out_cb<3>().set_inputline("sub", INPUT_LINE_RESET).invert()', 'misclatch.q_out_cb<3>().append_inputline("sub2", INPUT_LINE_RESET).invert()', 'misclatch.q_out_cb<3>().append("51xx", FUNC(namco_51xx_device::reset))', 'misclatch.q_out_cb<3>().append("54xx", FUNC(namco_54xx_device::reset))'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1665, sourceColumn: 2, sourceEndLine: 1665};
MERGE (n:KG {id: 'device:galaga_state.galaga/misclatch/callback:misclatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'misclatch.q_out_cb<0>().set(FUNC(galaga_state::irq1_clear_w))', ownerTag: 'misclatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1666, sourceColumn: 2, sourceEndLine: 1666, slot: '0', targetClass: 'galaga_state', targetMethod: 'irq1_clear_w'};
MERGE (n:KG {id: 'device:galaga_state.galaga/misclatch/callback:misclatch:1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'misclatch.q_out_cb<1>().set(FUNC(galaga_state::irq2_clear_w))', ownerTag: 'misclatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1667, sourceColumn: 2, sourceEndLine: 1667, slot: '1', targetClass: 'galaga_state', targetMethod: 'irq2_clear_w'};
MERGE (n:KG {id: 'device:galaga_state.galaga/misclatch/callback:misclatch:2'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'misclatch.q_out_cb<2>().set(FUNC(galaga_state::nmion_w))', ownerTag: 'misclatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1668, sourceColumn: 2, sourceEndLine: 1668, slot: '2', targetClass: 'galaga_state', targetMethod: 'nmion_w'};
MERGE (n:KG {id: 'device:galaga_state.galaga/misclatch/callback:misclatch:3'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set_inputline', raw: 'misclatch.q_out_cb<3>().set_inputline("sub", INPUT_LINE_RESET).invert()', ownerTag: 'misclatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1669, sourceColumn: 2, sourceEndLine: 1669, slot: '3', transforms: ['invert'], targetTag: 'sub', inputLine: 'INPUT_LINE_RESET'};
MERGE (n:KG {id: 'device:galaga_state.galaga/misclatch/callback:misclatch:4'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'append_inputline', raw: 'misclatch.q_out_cb<3>().append_inputline("sub2", INPUT_LINE_RESET).invert()', ownerTag: 'misclatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1670, sourceColumn: 2, sourceEndLine: 1670, slot: '3', transforms: ['invert'], targetTag: 'sub2', inputLine: 'INPUT_LINE_RESET'};
MERGE (n:KG {id: 'device:galaga_state.galaga/misclatch/callback:misclatch:5'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'append', raw: 'misclatch.q_out_cb<3>().append("51xx", FUNC(namco_51xx_device::reset))', ownerTag: 'misclatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1671, sourceColumn: 2, sourceEndLine: 1671, slot: '3', targetTag: '51xx', targetClass: 'namco_51xx_device', targetMethod: 'reset'};
MERGE (n:KG {id: 'device:galaga_state.galaga/misclatch/callback:misclatch:6'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'append', raw: 'misclatch.q_out_cb<3>().append("54xx", FUNC(namco_54xx_device::reset))', ownerTag: 'misclatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1672, sourceColumn: 2, sourceEndLine: 1672, slot: '3', targetTag: '54xx', targetClass: 'namco_54xx_device', targetMethod: 'reset'};
MERGE (n:KG {id: 'device:galaga_state.galaga/51xx'}) SET n:Device SET n += {type: 'NAMCO_51XX', tag: '51xx', clock: 1536000, config: ['namco_51xx_device &n51xx(NAMCO_51XX(config, "51xx", MASTER_CLOCK/6/2))', 'n51xx.input_callback<0>().set_ioport("IN0").mask(0x0f)', 'n51xx.input_callback<1>().set_ioport("IN0").rshift(4)', 'n51xx.input_callback<2>().set_ioport("IN1").mask(0x0f)', 'n51xx.input_callback<3>().set_ioport("IN1").rshift(4)', 'n51xx.output_callback().set(FUNC(galaga_state::out))', 'n51xx.lockout_callback().set(FUNC(galaga_state::lockout))'], cls: 'namco_51xx_device', clsHierarchy: ['namco_51xx_device'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1674, sourceColumn: 2, sourceEndLine: 1674};
MERGE (n:KG {id: 'device:galaga_state.galaga/51xx/callback:51xx:0'}) SET n:Callback SET n += {signal: 'input_callback', operation: 'set_ioport', raw: 'n51xx.input_callback<0>().set_ioport("IN0").mask(0x0f)', ownerTag: '51xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1675, sourceColumn: 2, sourceEndLine: 1675, slot: '0', transforms: ['mask(0x0f)'], targetTag: 'IN0', targetPort: 'IN0'};
MERGE (n:KG {id: 'device:galaga_state.galaga/51xx/callback:51xx:1'}) SET n:Callback SET n += {signal: 'input_callback', operation: 'set_ioport', raw: 'n51xx.input_callback<1>().set_ioport("IN0").rshift(4)', ownerTag: '51xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1676, sourceColumn: 2, sourceEndLine: 1676, slot: '1', transforms: ['rshift(4)'], targetTag: 'IN0', targetPort: 'IN0'};
MERGE (n:KG {id: 'device:galaga_state.galaga/51xx/callback:51xx:2'}) SET n:Callback SET n += {signal: 'input_callback', operation: 'set_ioport', raw: 'n51xx.input_callback<2>().set_ioport("IN1").mask(0x0f)', ownerTag: '51xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1677, sourceColumn: 2, sourceEndLine: 1677, slot: '2', transforms: ['mask(0x0f)'], targetTag: 'IN1', targetPort: 'IN1'};
MERGE (n:KG {id: 'device:galaga_state.galaga/51xx/callback:51xx:3'}) SET n:Callback SET n += {signal: 'input_callback', operation: 'set_ioport', raw: 'n51xx.input_callback<3>().set_ioport("IN1").rshift(4)', ownerTag: '51xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1678, sourceColumn: 2, sourceEndLine: 1678, slot: '3', transforms: ['rshift(4)'], targetTag: 'IN1', targetPort: 'IN1'};
MERGE (n:KG {id: 'device:galaga_state.galaga/51xx/callback:51xx:4'}) SET n:Callback SET n += {signal: 'output_callback', operation: 'set', raw: 'n51xx.output_callback().set(FUNC(galaga_state::out))', ownerTag: '51xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1679, sourceColumn: 2, sourceEndLine: 1679, targetClass: 'galaga_state', targetMethod: 'out'};
MERGE (n:KG {id: 'device:galaga_state.galaga/51xx/callback:51xx:5'}) SET n:Callback SET n += {signal: 'lockout_callback', operation: 'set', raw: 'n51xx.lockout_callback().set(FUNC(galaga_state::lockout))', ownerTag: '51xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1680, sourceColumn: 2, sourceEndLine: 1680, targetClass: 'galaga_state', targetMethod: 'lockout'};
MERGE (n:KG {id: 'device:galaga_state.galaga/54xx'}) SET n:Device SET n += {type: 'NAMCO_54XX', tag: '54xx', clock: 1536000, config: ['namco_54xx_device &n54xx(NAMCO_54XX(config, "54xx", MASTER_CLOCK/6/2))', 'n54xx.set_discrete("discrete")', 'n54xx.set_basenote(NODE_01)'], cls: 'namco_54xx_device', clsHierarchy: ['namco_54xx_device'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1682, sourceColumn: 2, sourceEndLine: 1682};
MERGE (n:KG {id: 'device:galaga_state.galaga/06xx'}) SET n:Device SET n += {type: 'NAMCO_06XX', tag: '06xx', clock: 48000, config: ['namco_06xx_device &n06xx(NAMCO_06XX(config, "06xx", MASTER_CLOCK/6/64))', 'n06xx.set_maincpu(m_maincpu)', 'n06xx.chip_select_callback<0>().set("51xx", FUNC(namco_51xx_device::chip_select))', 'n06xx.rw_callback<0>().set("51xx", FUNC(namco_51xx_device::rw))', 'n06xx.read_callback<0>().set("51xx", FUNC(namco_51xx_device::read))', 'n06xx.write_callback<0>().set("51xx", FUNC(namco_51xx_device::write))', 'n06xx.write_callback<3>().set("54xx", FUNC(namco_54xx_device::write))', 'n06xx.chip_select_callback<3>().set("54xx", FUNC(namco_54xx_device::chip_select))'], cls: 'namco_06xx_device', clsHierarchy: ['namco_06xx_device'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1686, sourceColumn: 2, sourceEndLine: 1686};
MERGE (n:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:0'}) SET n:Callback SET n += {signal: 'nmi', operation: 'set_maincpu', raw: 'n06xx.set_maincpu(m_maincpu)', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1687, sourceColumn: 2, sourceEndLine: 1687, inputLine: 'INPUT_LINE_NMI', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:1'}) SET n:Callback SET n += {signal: 'chip_select_callback', operation: 'set', raw: 'n06xx.chip_select_callback<0>().set("51xx", FUNC(namco_51xx_device::chip_select))', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1688, sourceColumn: 2, sourceEndLine: 1688, slot: '0', targetTag: '51xx', targetClass: 'namco_51xx_device', targetMethod: 'chip_select'};
MERGE (n:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:2'}) SET n:Callback SET n += {signal: 'rw_callback', operation: 'set', raw: 'n06xx.rw_callback<0>().set("51xx", FUNC(namco_51xx_device::rw))', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1689, sourceColumn: 2, sourceEndLine: 1689, slot: '0', targetTag: '51xx', targetClass: 'namco_51xx_device', targetMethod: 'rw'};
MERGE (n:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:3'}) SET n:Callback SET n += {signal: 'read_callback', operation: 'set', raw: 'n06xx.read_callback<0>().set("51xx", FUNC(namco_51xx_device::read))', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1690, sourceColumn: 2, sourceEndLine: 1690, slot: '0', targetTag: '51xx', targetClass: 'namco_51xx_device', targetMethod: 'read'};
MERGE (n:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:4'}) SET n:Callback SET n += {signal: 'write_callback', operation: 'set', raw: 'n06xx.write_callback<0>().set("51xx", FUNC(namco_51xx_device::write))', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1691, sourceColumn: 2, sourceEndLine: 1691, slot: '0', targetTag: '51xx', targetClass: 'namco_51xx_device', targetMethod: 'write'};
MERGE (n:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:5'}) SET n:Callback SET n += {signal: 'write_callback', operation: 'set', raw: 'n06xx.write_callback<3>().set("54xx", FUNC(namco_54xx_device::write))', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1692, sourceColumn: 2, sourceEndLine: 1692, slot: '3', targetTag: '54xx', targetClass: 'namco_54xx_device', targetMethod: 'write'};
MERGE (n:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:6'}) SET n:Callback SET n += {signal: 'chip_select_callback', operation: 'set', raw: 'n06xx.chip_select_callback<3>().set("54xx", FUNC(namco_54xx_device::chip_select))', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1693, sourceColumn: 2, sourceEndLine: 1693, slot: '3', targetTag: '54xx', targetClass: 'namco_54xx_device', targetMethod: 'chip_select'};
MERGE (n:KG {id: 'device:galaga_state.galaga/videolatch'}) SET n:Device SET n += {type: 'LS259', tag: 'videolatch', clock: null, config: ['LS259(config, m_videolatch)', 'm_videolatch->q_out_cb<7>().set(FUNC(galaga_state::flip_screen_set))'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1695, sourceColumn: 2, sourceEndLine: 1695};
MERGE (n:KG {id: 'device:galaga_state.galaga/videolatch/callback:videolatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_videolatch->q_out_cb<7>().set(FUNC(galaga_state::flip_screen_set))', ownerTag: 'videolatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1697, sourceColumn: 2, sourceEndLine: 1697, slot: '7', targetClass: 'galaga_state', targetMethod: 'flip_screen_set'};
MERGE (n:KG {id: 'handler:galaga_state.flip_screen_set'}) SET n:Handler SET n += {method: 'flip_screen_set', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1697, sourceColumn: 2, sourceEndLine: 1697};
MERGE (n:KG {id: 'device:galaga_state.galaga/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog").set_vblank_count(m_screen, 8)'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1699, sourceColumn: 2, sourceEndLine: 1699};
MERGE (n:KG {id: 'device:galaga_state.galaga/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(MASTER_CLOCK/3, 384, 0, 288, 264, 0, 224)', 'm_screen->set_screen_update(FUNC(galaga_state::screen_update_galaga))', 'm_screen->set_video_attributes(VIDEO_ALWAYS_UPDATE)', 'm_screen->screen_vblank().set(FUNC(galaga_state::screen_vblank_galaga))', 'm_screen->screen_vblank().append(FUNC(galaga_state::vblank_irq))', 'm_screen->screen_vblank().append("51xx", FUNC(namco_51xx_device::vblank))', 'm_screen->set_palette("palette")'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1704, sourceColumn: 2, sourceEndLine: 1704, configCalls: ['set_raw(6144000,384,0,288,264,0,224)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6144000, 384, 0, 288, 264, 0, 224], screenRawExpr: ['MASTER_CLOCK/3', '384', '0', '288', '264', '0', '224'], screenVideoAttributes: ['VIDEO_ALWAYS_UPDATE']};
MERGE (n:KG {id: 'device:galaga_state.galaga/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(galaga_state::screen_update_galaga))', ownerTag: 'screen', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1706, sourceColumn: 2, sourceEndLine: 1706, targetClass: 'galaga_state', targetMethod: 'screen_update_galaga'};
MERGE (n:KG {id: 'handler:galaga_state.screen_update_galaga'}) SET n:Handler SET n += {method: 'screen_update_galaga', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga_v.cpp', sourceLine: 241, sourceColumn: 1, sourceEndLine: 248, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'bitmap.fill(m_palette->black_pen(), cliprect);
	m_starfield->draw_starfield(bitmap,cliprect, 0);
	draw_sprites(bitmap,cliprect);
	m_fg_tilemap->draw(screen, bitmap, cliprect);
	return 0;'};
MERGE (n:KG {id: 'handler:galaga_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga_v.cpp', sourceLine: 193, sourceColumn: 1, sourceEndLine: 237, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'uint8_t *spriteram = &m_galaga_ram1[0x380];
	uint8_t *spriteram_2 = &m_galaga_ram2[0x380];
	uint8_t *spriteram_3 = &m_galaga_ram3[0x380];

	for (int offs = 0; offs < 0x80; offs += 2)
	{
		static const int gfx_offs[2][2] =
		{
			{ 0, 1 },
			{ 2, 3 }
		};
		const int sprite = spriteram[offs] & 0x7f;
		const int color = spriteram[offs + 1] & 0x3f;
		int sx = spriteram_2[offs + 1] - 40 + 0x100*(spriteram_3[offs + 1] & 3);
		int sy = 256 - spriteram_2[offs] + 1;   // sprites are buffered and delayed by one scanline
		int flipx = (spriteram_3[offs] & 0x01);
		int flipy = (spriteram_3[offs] & 0x02) >> 1;
		const int sizex = (spriteram_3[offs] & 0x04) >> 2;
		const int sizey = (spriteram_3[offs] & 0x08) >> 3;

		sy -= 16 * sizey;
		sy = (sy & 0xff) - 32;  // fix wraparound

		if (flip_screen())
		{
			flipx ^= 1;
			flipy ^= 1;
		}

		for (int y = 0; y <= sizey; y++)
		{
			for (int x = 0; x <= sizex; x++)
			{
				m_gfxdecode->gfx(1)->transmask(bitmap,cliprect,
					sprite + gfx_offs[y ^ (sizey * flipy)][x ^ (sizex * flipx)],
					color,
					flipx,flipy,
					sx + 16*x, sy + 16*y,
					m_palette->transpen_mask(*m_gfxdecode->gfx(1), color, 0x0f));
			}
		}
	}'};
MERGE (n:KG {id: 'device:galaga_state.galaga/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set', raw: 'm_screen->screen_vblank().set(FUNC(galaga_state::screen_vblank_galaga))', ownerTag: 'screen', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1708, sourceColumn: 2, sourceEndLine: 1708, targetClass: 'galaga_state', targetMethod: 'screen_vblank_galaga'};
MERGE (n:KG {id: 'handler:galaga_state.screen_vblank_galaga'}) SET n:Handler SET n += {method: 'screen_vblank_galaga', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga_v.cpp', sourceLine: 252, sourceColumn: 1, sourceEndLine: 268, sourceParameters: 'int state', sourceBody: '// falling edge
	if (!state)
	{
		// Galaga only scrolls in X direction - the SCROLL_Y pins
		// of the 05XX chip are tied to ground.
		const uint8_t speed_index_X = (m_videolatch->q2_r()<<2) | (m_videolatch->q1_r()<<1) | (m_videolatch->q0_r()<<0);
		const uint8_t speed_index_Y = 0;
		m_starfield->set_scroll_speed(speed_index_X,speed_index_Y);

		m_starfield->set_active_starfield_sets(m_videolatch->q3_r(), m_videolatch->q4_r() | 2);

		// _STARCLR signal enables/disables starfield
		m_starfield->enable_starfield(m_videolatch->q5_r());
	}'};
MERGE (n:KG {id: 'device:galaga_state.galaga/screen/callback:screen:2'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'append', raw: 'm_screen->screen_vblank().append(FUNC(galaga_state::vblank_irq))', ownerTag: 'screen', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1709, sourceColumn: 2, sourceEndLine: 1709, targetClass: 'galaga_state', targetMethod: 'vblank_irq'};
MERGE (n:KG {id: 'device:galaga_state.galaga/screen/callback:screen:3'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'append', raw: 'm_screen->screen_vblank().append("51xx", FUNC(namco_51xx_device::vblank))', ownerTag: 'screen', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1710, sourceColumn: 2, sourceEndLine: 1710, targetTag: '51xx', targetClass: 'namco_51xx_device', targetMethod: 'vblank'};
MERGE (n:KG {id: 'device:galaga_state.galaga/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_galaga)'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1713, sourceColumn: 2, sourceEndLine: 1713, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:galaga_state.galaga/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(galaga_state::galaga_palette), 64*4 + 64*4 + 4 + 64, 32+64)'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1714, sourceColumn: 2, sourceEndLine: 1714, clockExpr: 'FUNC(galaga_state::galaga_palette)'};
MERGE (n:KG {id: 'device:galaga_state.galaga/starfield'}) SET n:Device SET n += {type: 'STARFIELD_05XX', tag: 'starfield', clock: 0, config: ['STARFIELD_05XX(config, m_starfield)', 'm_starfield->set_starfield_config(STARFIELD_X_OFFSET_GALAGA, 0, STARFIELD_X_LIMIT_GALAGA)'], cls: 'starfield_05xx_device', clsHierarchy: ['starfield_05xx_device'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1716, sourceColumn: 2, sourceEndLine: 1716, configCalls: ['set_starfield_config(16,0,272)']};
MERGE (n:KG {id: 'device:galaga_state.galaga/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1720, sourceColumn: 2, sourceEndLine: 1720};
MERGE (n:KG {id: 'device:galaga_state.galaga/namco'}) SET n:Device SET n += {type: 'NAMCO_WSG', tag: 'namco', clock: 96000, config: ['NAMCO_WSG(config, m_namco_sound, MASTER_CLOCK/6/32)', 'm_namco_sound->add_route(ALL_OUTPUTS, "mono", 0.90 * 10.0 / 16.0)'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1722, sourceColumn: 2, sourceEndLine: 1722};
MERGE (n:KG {id: 'audioroute:device:galaga_state.galaga/namco/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.5625, raw: 'm_namco_sound->add_route(ALL_OUTPUTS, "mono", 0.90 * 10.0 / 16.0)', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1723, sourceColumn: 2, sourceEndLine: 1723};
MERGE (n:KG {id: 'device:galaga_state.galaga/discrete'}) SET n:Device SET n += {type: 'DISCRETE', tag: 'discrete', clock: null, config: ['DISCRETE(config, "discrete", galaga_discrete).add_route(ALL_OUTPUTS, "mono", 0.90)'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1726, sourceColumn: 2, sourceEndLine: 1726, clockExpr: 'galaga_discrete'};
MERGE (n:KG {id: 'audioroute:device:galaga_state.galaga/discrete/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.9, raw: 'DISCRETE(config, "discrete", galaga_discrete).add_route(ALL_OUTPUTS, "mono", 0.90)', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1726, sourceColumn: 2, sourceEndLine: 1726};
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
MERGE (n:KG {id: 'inputs:galaga'}) SET n:InputPorts SET n += {name: 'galaga', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1068, sourceColumn: 8, sourceEndLine: 1068};
MERGE (n:KG {id: 'inputs:galaga/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:galaga/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_UNUSED', defaultValue: 1};
MERGE (n:KG {id: 'inputs:galaga/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_2WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:galaga/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_UNUSED', defaultValue: 4};
MERGE (n:KG {id: 'inputs:galaga/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_2WAY'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:galaga/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_UNUSED', defaultValue: 16};
MERGE (n:KG {id: 'inputs:galaga/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_2WAY', 'PORT_COCKTAIL'], defaultValue: 32};
MERGE (n:KG {id: 'inputs:galaga/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_UNUSED', defaultValue: 64};
MERGE (n:KG {id: 'inputs:galaga/IN0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_2WAY', 'PORT_COCKTAIL'], defaultValue: 128};
MERGE (n:KG {id: 'inputs:galaga/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:galaga/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 1};
MERGE (n:KG {id: 'inputs:galaga/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:galaga/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_START1', defaultValue: 4};
MERGE (n:KG {id: 'inputs:galaga/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_START2', defaultValue: 8};
MERGE (n:KG {id: 'inputs:galaga/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_COIN1', defaultValue: 16};
MERGE (n:KG {id: 'inputs:galaga/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_COIN2', defaultValue: 32};
MERGE (n:KG {id: 'inputs:galaga/IN1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_SERVICE1', defaultValue: 64};
MERGE (n:KG {id: 'inputs:galaga/IN1/f7'}) SET n:PortField SET n += {kind: 'service', mask: 128, activeLow: true, defaultValue: 128};
MERGE (n:KG {id: 'inputs:galaga/DSWA'}) SET n:Port SET n += {tag: 'DSWA', modify: false};
MERGE (n:KG {id: 'inputs:galaga/DSWA/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SWB:1,2")'], name: 'Difficulty', defaultValue: 3, location: 'SWB:1,2', settings: ['3=Easy', '0=Medium', '1=Hard', '2=Hardest']};
MERGE (n:KG {id: 'inputs:galaga/DSWA/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 4, name: 'Unused', defaultValue: 4};
MERGE (n:KG {id: 'inputs:galaga/DSWA/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 8, modifiers: ['PORT_DIPLOCATION("SWB:4")'], name: 'Demo Sounds', defaultValue: 0, location: 'SWB:4', settings: ['8=Off', '0=On']};
MERGE (n:KG {id: 'inputs:galaga/DSWA/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 16, modifiers: ['PORT_DIPLOCATION("SWB:5")'], name: 'Freeze', defaultValue: 16, location: 'SWB:5', settings: ['16=Off', '0=On']};
MERGE (n:KG {id: 'inputs:galaga/DSWA/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 32, modifiers: ['PORT_DIPLOCATION("SWB:6")'], name: 'Rack Test', defaultValue: 32, location: 'SWB:6', settings: ['32=Off', '0=On']};
MERGE (n:KG {id: 'inputs:galaga/DSWA/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 64, name: 'Unused', defaultValue: 64};
MERGE (n:KG {id: 'inputs:galaga/DSWA/f6'}) SET n:PortField SET n += {kind: 'dip', mask: 128, modifiers: ['PORT_DIPLOCATION("SWB:8")'], name: 'Cabinet', defaultValue: 128, location: 'SWB:8', settings: ['128=Upright', '0=Cocktail']};
MERGE (n:KG {id: 'inputs:galaga/DSWB'}) SET n:Port SET n += {tag: 'DSWB', modify: false};
MERGE (n:KG {id: 'inputs:galaga/DSWB/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 7, modifiers: ['PORT_DIPLOCATION("SWA:1,2,3")'], name: 'Coinage', defaultValue: 7, location: 'SWA:1,2,3', settings: ['4=4C 1C', '2=3C 1C', '6=2C 1C', '7=1C 1C', '1=2C 3C', '3=1C 2C', '5=1C 3C', '0=Free Play']};
MERGE (n:KG {id: 'inputs:galaga/DSWB/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 56, modifiers: ['PORT_DIPLOCATION("SWA:4,5,6")'], name: 'Bonus Life', defaultValue: 16, location: 'SWA:4,5,6', settings: ['32=20K, 60K, Every 60K [if "DSWB",0xc0,NOTEQUALS,0xc0]', '24=20K and 60K Only [if "DSWB",0xc0,NOTEQUALS,0xc0]', '16=20K, 70K, Every 70K [if "DSWB",0xc0,NOTEQUALS,0xc0]', '48=20K, 80K, Every 80K [if "DSWB",0xc0,NOTEQUALS,0xc0]', '56=30K and 80K Only [if "DSWB",0xc0,NOTEQUALS,0xc0]', '8=30K, 100K, Every 100K [if "DSWB",0xc0,NOTEQUALS,0xc0]', '40=30K, 120K, Every 120K [if "DSWB",0xc0,NOTEQUALS,0xc0]', '0=None [if "DSWB",0xc0,NOTEQUALS,0xc0]', '32=30K, 100K, Every 100K [if "DSWB",0xc0,EQUALS,0xc0]', '24=30K and 150K Only [if "DSWB",0xc0,EQUALS,0xc0]', '16=30K, 120K, Every 120K [if "DSWB",0xc0,EQUALS,0xc0]', '48=30K, 150K, Every 150K [if "DSWB",0xc0,EQUALS,0xc0]', '56=30K Only [if "DSWB",0xc0,EQUALS,0xc0]', '8=30K and 100K Only [if "DSWB",0xc0,EQUALS,0xc0]', '40=30K and 120K Only [if "DSWB",0xc0,EQUALS,0xc0]', '0=None [if "DSWB",0xc0,EQUALS,0xc0]']};
MERGE (n:KG {id: 'inputs:galaga/DSWB/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 192, modifiers: ['PORT_DIPLOCATION("SWA:7,8")'], name: 'Lives', defaultValue: 128, location: 'SWA:7,8', settings: ['0=2', '128=3', '64=4', '192=5']};
MERGE (n:KG {id: 'gfxlayout:charlayout_2bpp'}) SET n:GfxLayout SET n += {name: 'charlayout_2bpp', width: 8, height: 8, total: 'RGN_FRAC(1,1)', planes: 2, planeOffsets: [0, 4], xOffsets: [64, 65, 66, 67, 0, 1, 2, 3], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 128};
MERGE (n:KG {id: 'gfxlayout:spritelayout_galaga'}) SET n:GfxLayout SET n += {name: 'spritelayout_galaga', width: 16, height: 16, total: 'RGN_FRAC(1,1)', planes: 2, planeOffsets: [0, 4], xOffsets: [0, 1, 2, 3, 64, 65, 66, 67, 128, 129, 130, 131, 192, 193, 194, 195], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 256, 264, 272, 280, 288, 296, 304, 312], charIncrement: 512};
MERGE (n:KG {id: 'gfxdecode:gfx_galaga'}) SET n:GfxDecode SET n += {name: 'gfx_galaga', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1511, sourceColumn: 8, sourceEndLine: 1511};
MERGE (n:KG {id: 'gfxdecode:gfx_galaga/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'charlayout_2bpp', colorBase: 0, colorCount: 64, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_galaga/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx2', offset: 0, layout: 'spritelayout_galaga', colorBase: 256, colorCount: 64, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'device:galaga_state.galaga/palette/callback:palette_init'}) SET n:Callback SET n += {signal: 'palette_init', operation: 'palette_init', raw: 'PALETTE(config, m_palette, FUNC(galaga_state::galaga_palette), 64*4 + 64*4 + 4 + 64, 32+64)', ownerTag: 'palette', targetClass: 'galaga_state', targetMethod: 'galaga_palette', entries: 96, sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1714};
MERGE (n:KG {id: 'handler:galaga_state.galaga_palette'}) SET n:Handler SET n += {method: 'galaga_palette', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga_v.cpp', sourceLine: 45, sourceColumn: 1, sourceEndLine: 111, sourceParameters: 'palette_device &palette', sourceBody: 'const uint8_t *color_prom = memregion("proms")->base();
	

	// compute the color output resistor weights
	double rweights[3], gweights[3], bweights[2];
	compute_resistor_weights(0, 255, -1.0,
			3, &TABLE(0, 1000, 470, 220), rweights, 0, 0,
			3, &TABLE(0, 1000, 470, 220), gweights, 0, 0,
			2, &TABLE(1, 1000, 470, 220), bweights, 0, 0);

	// core palette
	for (int i = 0; i < 32; i++)
	{
		int bit0, bit1, bit2;

		// red component
		bit0 = BIT(*color_prom, 0);
		bit1 = BIT(*color_prom, 1);
		bit2 = BIT(*color_prom, 2);
		int const r = combine_weights(rweights, bit0, bit1, bit2);

		// green component
		bit0 = BIT(*color_prom, 3);
		bit1 = BIT(*color_prom, 4);
		bit2 = BIT(*color_prom, 5);
		int const g = combine_weights(gweights, bit0, bit1, bit2);

		// blue component
		bit0 = BIT(*color_prom, 6);
		bit1 = BIT(*color_prom, 7);
		int const b = combine_weights(bweights, bit0, bit1);

		palette.set_indirect_color(i, rgb_t(r, g, b));
		color_prom++;
	}

	// r/g low bit is n/c and effectively becomes a pulldown
	double rsweights[2], gsweights[2], bsweights[2];
	compute_resistor_weights(0, 255, -1.0,
			2, &TABLE(1, 1000, 470, 220), rsweights, TABLE(0, 1000, 470, 220), 0,
			2, &TABLE(1, 1000, 470, 220), gsweights, TABLE(0, 1000, 470, 220), 0,
			2, &TABLE(1, 1000, 470, 220), bsweights, 0, 0);

	// palette for the stars
	for (int i = 0; i < 64; i++)
	{
		int const r = combine_weights(rsweights, BIT(i, 0), BIT(i, 1));
		int const g = combine_weights(gsweights, BIT(i, 2), BIT(i, 3));
		int const b = combine_weights(bsweights, BIT(i, 4), BIT(i, 5));

		palette.set_indirect_color(32 + i, rgb_t(r, g, b));
	}

	// characters
	for (int i = 0; i < 64*4; i++)
		palette.set_pen_indirect(i, (*color_prom++ & 0x0f) | 0x10);

	// sprites
	for (int i = 0; i < 64*4; i++)
		palette.set_pen_indirect(64*4 + i, *color_prom++ & 0x0f);

	// now the stars
	for (int i = 0; i < 64; i++)
		palette.set_pen_indirect(64*4 + 64*4 + i, 32 + i);'};
MATCH (a:KG {id: 'game:galaga'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3572, sourceColumn: 1, sourceEndLine: 3572};
MATCH (a:KG {id: 'game:galaga'}), (b:KG {id: 'machine:galaga_state.galaga'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:galaga'}), (b:KG {id: 'inputs:galaga'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:galaga'}), (b:KG {id: 'romset:galaga'}) MERGE (a)-[r:USES_ROMSET]->(b);
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
MATCH (a:KG {id: 'machine:galaga_state.galaga'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1653, sourceColumn: 1, sourceEndLine: 1727};
MATCH (a:KG {id: 'machine:galaga_state.galaga'}), (b:KG {id: 'handler:galaga_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:galaga_state.galaga'}), (b:KG {id: 'handler:galaga_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:galaga_state.galaga'}), (b:KG {id: 'callback:timer/galaga_state.cpu3_interrupt_callback'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:galaga_state.galaga'}), (b:KG {id: 'device:galaga_state.galaga/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaga_state.galaga'}), (b:KG {id: 'device:galaga_state.galaga/sub'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaga_state.galaga'}), (b:KG {id: 'device:galaga_state.galaga/sub2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaga_state.galaga'}), (b:KG {id: 'device:galaga_state.galaga/misclatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaga_state.galaga'}), (b:KG {id: 'device:galaga_state.galaga/51xx'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaga_state.galaga'}), (b:KG {id: 'device:galaga_state.galaga/54xx'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaga_state.galaga'}), (b:KG {id: 'device:galaga_state.galaga/06xx'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaga_state.galaga'}), (b:KG {id: 'device:galaga_state.galaga/videolatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaga_state.galaga'}), (b:KG {id: 'device:galaga_state.galaga/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaga_state.galaga'}), (b:KG {id: 'device:galaga_state.galaga/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaga_state.galaga'}), (b:KG {id: 'device:galaga_state.galaga/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaga_state.galaga'}), (b:KG {id: 'gfxdecode:gfx_galaga'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:galaga_state.galaga'}), (b:KG {id: 'device:galaga_state.galaga/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaga_state.galaga'}), (b:KG {id: 'device:galaga_state.galaga/starfield'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaga_state.galaga'}), (b:KG {id: 'device:galaga_state.galaga/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaga_state.galaga'}), (b:KG {id: 'device:galaga_state.galaga/namco'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:galaga_state.galaga'}), (b:KG {id: 'device:galaga_state.galaga/discrete'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:galaga'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1068, sourceColumn: 8, sourceEndLine: 1068};
MATCH (a:KG {id: 'inputs:galaga'}), (b:KG {id: 'inputs:galaga/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:galaga'}), (b:KG {id: 'inputs:galaga/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:galaga'}), (b:KG {id: 'inputs:galaga/DSWA'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:galaga'}), (b:KG {id: 'inputs:galaga/DSWB'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:galaga'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2406, sourceColumn: 1, sourceEndLine: 2406};
MATCH (a:KG {id: 'romset:galaga'}), (b:KG {id: 'region:galaga/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:galaga'}), (b:KG {id: 'region:galaga/sub'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:galaga'}), (b:KG {id: 'region:galaga/sub2'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:galaga'}), (b:KG {id: 'region:galaga/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:galaga'}), (b:KG {id: 'region:galaga/gfx2'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:galaga'}), (b:KG {id: 'region:galaga/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:galaga'}), (b:KG {id: 'region:galaga/namco'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:galaga_state.video_start'}), (b:KG {id: 'handler:galaga_state.get_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:galaga_state.video_start'}), (b:KG {id: 'handler:galaga_state.tilemap_scan'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'callback:timer/galaga_state.cpu3_interrupt_callback'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 786, sourceColumn: 1, sourceEndLine: 799};
MATCH (a:KG {id: 'callback:timer/galaga_state.cpu3_interrupt_callback'}), (b:KG {id: 'handler:galaga_state.cpu3_interrupt_callback'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/maincpu'}), (b:KG {id: 'map:galaga_state.galaga_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:galaga_state.galaga/sub'}), (b:KG {id: 'map:galaga_state.galaga_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:galaga_state.galaga/sub2'}), (b:KG {id: 'map:galaga_state.galaga_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:galaga_state.galaga/misclatch'}), (b:KG {id: 'device:galaga_state.galaga/misclatch/callback:misclatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/misclatch'}), (b:KG {id: 'device:galaga_state.galaga/misclatch/callback:misclatch:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/misclatch'}), (b:KG {id: 'device:galaga_state.galaga/misclatch/callback:misclatch:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/misclatch'}), (b:KG {id: 'device:galaga_state.galaga/misclatch/callback:misclatch:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/misclatch'}), (b:KG {id: 'device:galaga_state.galaga/misclatch/callback:misclatch:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/misclatch'}), (b:KG {id: 'device:galaga_state.galaga/misclatch/callback:misclatch:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/misclatch'}), (b:KG {id: 'device:galaga_state.galaga/misclatch/callback:misclatch:6'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/51xx'}), (b:KG {id: 'device:galaga_state.galaga/51xx/callback:51xx:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/51xx'}), (b:KG {id: 'device:galaga_state.galaga/51xx/callback:51xx:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/51xx'}), (b:KG {id: 'device:galaga_state.galaga/51xx/callback:51xx:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/51xx'}), (b:KG {id: 'device:galaga_state.galaga/51xx/callback:51xx:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/51xx'}), (b:KG {id: 'device:galaga_state.galaga/51xx/callback:51xx:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/51xx'}), (b:KG {id: 'device:galaga_state.galaga/51xx/callback:51xx:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/51xx'}), (b:KG {id: 'machine:namco_51xx_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/54xx'}), (b:KG {id: 'machine:namco_54xx_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/06xx'}), (b:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/06xx'}), (b:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/06xx'}), (b:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/06xx'}), (b:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/06xx'}), (b:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/06xx'}), (b:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/06xx'}), (b:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:6'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/videolatch'}), (b:KG {id: 'device:galaga_state.galaga/videolatch/callback:videolatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/screen'}), (b:KG {id: 'device:galaga_state.galaga/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/screen'}), (b:KG {id: 'device:galaga_state.galaga/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/screen'}), (b:KG {id: 'device:galaga_state.galaga/screen/callback:screen:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/screen'}), (b:KG {id: 'device:galaga_state.galaga/screen/callback:screen:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_galaga'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1511, sourceColumn: 8, sourceEndLine: 1511};
MATCH (a:KG {id: 'gfxdecode:gfx_galaga'}), (b:KG {id: 'gfxdecode:gfx_galaga/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_galaga'}), (b:KG {id: 'gfxdecode:gfx_galaga/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/palette'}), (b:KG {id: 'device:galaga_state.galaga/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/namco'}), (b:KG {id: 'audioroute:device:galaga_state.galaga/namco/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/discrete'}), (b:KG {id: 'audioroute:device:galaga_state.galaga/discrete/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:galaga/IN0'}), (b:KG {id: 'inputs:galaga/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/IN0'}), (b:KG {id: 'inputs:galaga/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/IN0'}), (b:KG {id: 'inputs:galaga/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/IN0'}), (b:KG {id: 'inputs:galaga/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/IN0'}), (b:KG {id: 'inputs:galaga/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/IN0'}), (b:KG {id: 'inputs:galaga/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/IN0'}), (b:KG {id: 'inputs:galaga/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/IN0'}), (b:KG {id: 'inputs:galaga/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/IN1'}), (b:KG {id: 'inputs:galaga/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/IN1'}), (b:KG {id: 'inputs:galaga/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/IN1'}), (b:KG {id: 'inputs:galaga/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/IN1'}), (b:KG {id: 'inputs:galaga/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/IN1'}), (b:KG {id: 'inputs:galaga/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/IN1'}), (b:KG {id: 'inputs:galaga/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/IN1'}), (b:KG {id: 'inputs:galaga/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/IN1'}), (b:KG {id: 'inputs:galaga/IN1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/DSWA'}), (b:KG {id: 'inputs:galaga/DSWA/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/DSWA'}), (b:KG {id: 'inputs:galaga/DSWA/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/DSWA'}), (b:KG {id: 'inputs:galaga/DSWA/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/DSWA'}), (b:KG {id: 'inputs:galaga/DSWA/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/DSWA'}), (b:KG {id: 'inputs:galaga/DSWA/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/DSWA'}), (b:KG {id: 'inputs:galaga/DSWA/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/DSWA'}), (b:KG {id: 'inputs:galaga/DSWA/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/DSWB'}), (b:KG {id: 'inputs:galaga/DSWB/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/DSWB'}), (b:KG {id: 'inputs:galaga/DSWB/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:galaga/DSWB'}), (b:KG {id: 'inputs:galaga/DSWB/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:galaga/maincpu'}), (b:KG {id: 'rom:galaga/maincpu/gg1_1b.3p'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:galaga/maincpu'}), (b:KG {id: 'rom:galaga/maincpu/gg1_2b.3m'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:galaga/maincpu'}), (b:KG {id: 'rom:galaga/maincpu/gg1_3.2m'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:galaga/maincpu'}), (b:KG {id: 'rom:galaga/maincpu/gg1_4b.2l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:galaga/sub'}), (b:KG {id: 'rom:galaga/sub/gg1_5b.3f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:galaga/sub2'}), (b:KG {id: 'rom:galaga/sub2/gg1_7b.2c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:galaga/gfx1'}), (b:KG {id: 'rom:galaga/gfx1/gg1_9.4l'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:galaga/gfx2'}), (b:KG {id: 'rom:galaga/gfx2/gg1_11.4d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:galaga/gfx2'}), (b:KG {id: 'rom:galaga/gfx2/gg1_10.4f'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:galaga/proms'}), (b:KG {id: 'rom:galaga/proms/prom-5.5n'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:galaga/proms'}), (b:KG {id: 'rom:galaga/proms/prom-4.2n'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:galaga/proms'}), (b:KG {id: 'rom:galaga/proms/prom-3.1c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:galaga/namco'}), (b:KG {id: 'rom:galaga/namco/prom-1.1d'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:galaga/namco'}), (b:KG {id: 'rom:galaga/namco/prom-2.5c'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'map:galaga_state.galaga_map'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 876, sourceColumn: 1, sourceEndLine: 890};
MATCH (a:KG {id: 'map:galaga_state.galaga_map'}), (b:KG {id: 'map:galaga_state.galaga_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaga_state.galaga_map'}), (b:KG {id: 'map:galaga_state.galaga_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaga_state.galaga_map'}), (b:KG {id: 'map:galaga_state.galaga_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaga_state.galaga_map'}), (b:KG {id: 'map:galaga_state.galaga_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaga_state.galaga_map'}), (b:KG {id: 'map:galaga_state.galaga_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaga_state.galaga_map'}), (b:KG {id: 'map:galaga_state.galaga_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaga_state.galaga_map'}), (b:KG {id: 'map:galaga_state.galaga_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaga_state.galaga_map'}), (b:KG {id: 'map:galaga_state.galaga_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaga_state.galaga_map'}), (b:KG {id: 'map:galaga_state.galaga_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaga_state.galaga_map'}), (b:KG {id: 'map:galaga_state.galaga_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaga_state.galaga_map'}), (b:KG {id: 'map:galaga_state.galaga_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:galaga_state.galaga_map'}), (b:KG {id: 'map:galaga_state.galaga_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/misclatch/callback:misclatch:0'}), (b:KG {id: 'handler:galaga_state.irq1_clear_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/misclatch/callback:misclatch:1'}), (b:KG {id: 'handler:galaga_state.irq2_clear_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/misclatch/callback:misclatch:2'}), (b:KG {id: 'handler:galaga_state.nmion_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/misclatch/callback:misclatch:3'}), (b:KG {id: 'device:galaga_state.galaga/sub'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/misclatch/callback:misclatch:4'}), (b:KG {id: 'device:galaga_state.galaga/sub2'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/misclatch/callback:misclatch:5'}), (b:KG {id: 'handler:namco_51xx_device.reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/misclatch/callback:misclatch:6'}), (b:KG {id: 'handler:namco_54xx_device.reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/51xx/callback:51xx:4'}), (b:KG {id: 'handler:galaga_state.out'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/51xx/callback:51xx:5'}), (b:KG {id: 'handler:galaga_state.lockout'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:namco_51xx_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/namco/namco51.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 168, sourceColumn: 1, sourceEndLine: 178};
MATCH (a:KG {id: 'machine:namco_51xx_device.device_add_mconfig'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:namco_54xx_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/namco/namco54.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/namco54.cpp', sourceLine: 136, sourceColumn: 1, sourceEndLine: 143};
MATCH (a:KG {id: 'machine:namco_54xx_device.device_add_mconfig'}), (b:KG {id: 'device:namco_54xx_device.device_add_mconfig/mcu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:0'}), (b:KG {id: 'device:galaga_state.galaga/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:1'}), (b:KG {id: 'handler:namco_51xx_device.chip_select'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:1'}), (b:KG {id: 'device:galaga_state.galaga/51xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:2'}), (b:KG {id: 'handler:namco_51xx_device.rw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:2'}), (b:KG {id: 'device:galaga_state.galaga/51xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:3'}), (b:KG {id: 'handler:namco_51xx_device.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:3'}), (b:KG {id: 'device:galaga_state.galaga/51xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:4'}), (b:KG {id: 'handler:namco_51xx_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:4'}), (b:KG {id: 'device:galaga_state.galaga/51xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:5'}), (b:KG {id: 'handler:namco_54xx_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:5'}), (b:KG {id: 'device:galaga_state.galaga/54xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:6'}), (b:KG {id: 'handler:namco_54xx_device.chip_select'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/06xx/callback:06xx:6'}), (b:KG {id: 'device:galaga_state.galaga/54xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/videolatch/callback:videolatch:0'}), (b:KG {id: 'handler:galaga_state.flip_screen_set'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/screen/callback:screen:0'}), (b:KG {id: 'handler:galaga_state.screen_update_galaga'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/screen/callback:screen:1'}), (b:KG {id: 'handler:galaga_state.screen_vblank_galaga'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/screen/callback:screen:2'}), (b:KG {id: 'handler:galaga_state.vblank_irq'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/screen/callback:screen:3'}), (b:KG {id: 'handler:namco_51xx_device.vblank'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/screen/callback:screen:3'}), (b:KG {id: 'device:galaga_state.galaga/51xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_galaga/e0'}), (b:KG {id: 'gfxlayout:charlayout_2bpp'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_galaga/e1'}), (b:KG {id: 'gfxlayout:spritelayout_galaga'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:galaga_state.galaga/palette/callback:palette_init'}), (b:KG {id: 'handler:galaga_state.galaga_palette'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:galaga_state.galaga_map/range1'}), (b:KG {id: 'handler:galaga_state.bosco_dsw_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:galaga_state.galaga_map/range2'}), (b:KG {id: 'handler:namco_wsg_device.pacman_sound_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'namco'};
MATCH (a:KG {id: 'map:galaga_state.galaga_map/range3'}), (b:KG {id: 'handler:ls259_device.write_d0'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'misclatch'};
MATCH (a:KG {id: 'map:galaga_state.galaga_map/range4'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:galaga_state.galaga_map/range5'}), (b:KG {id: 'handler:namco_06xx_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: '06xx'};
MATCH (a:KG {id: 'map:galaga_state.galaga_map/range5'}), (b:KG {id: 'handler:namco_06xx_device.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: '06xx'};
MATCH (a:KG {id: 'map:galaga_state.galaga_map/range6'}), (b:KG {id: 'handler:namco_06xx_device.ctrl_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: '06xx'};
MATCH (a:KG {id: 'map:galaga_state.galaga_map/range6'}), (b:KG {id: 'handler:namco_06xx_device.ctrl_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: '06xx'};
MATCH (a:KG {id: 'map:galaga_state.galaga_map/range7'}), (b:KG {id: 'handler:galaga_state.galaga_videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:galaga_state.galaga_map/range11'}), (b:KG {id: 'handler:ls259_device.write_d0'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'videolatch'};
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
MATCH (a:KG {id: 'handler:namco_54xx_device.write'}), (b:KG {id: 'handler:namco_54xx_device.write_sync'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:galaga_state.screen_update_galaga'}), (b:KG {id: 'handler:starfield_05xx_device.draw_starfield'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:galaga_state.screen_update_galaga'}), (b:KG {id: 'handler:galaga_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:charlayout_2bpp'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:spritelayout_galaga'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'handler:namco_06xx_device.data_w'}), (b:KG {id: 'handler:namco_06xx_device.write_sync'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_06xx_device.ctrl_w'}), (b:KG {id: 'handler:namco_06xx_device.ctrl_w_sync'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
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
MATCH (a:KG {id: 'handler:starfield_05xx_device.draw_starfield'}), (b:KG {id: 'handler:starfield_05xx_device.get_next_lfsr_state'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_06xx_device.ctrl_w_sync'}), (b:KG {id: 'handler:namco_06xx_device.set_nmi'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_51xx_device.O_w'}), (b:KG {id: 'handler:namco_51xx_device.O_w_sync'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_54xx_device.O_w'}), (b:KG {id: 'handler:namco_54xx_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:namco_54xx_device.R1_w'}), (b:KG {id: 'handler:namco_54xx_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
