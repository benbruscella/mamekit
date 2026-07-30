// mamekit knowledge graph — driver src/mame/namco/galaga.cpp
// generated 2026-07-30T09:33:29.960Z
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
MERGE (n:KG {id: 'file:src/mame/namco/namco51.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/namco/namco51.cpp'};
MERGE (n:KG {id: 'file:src/mame/namco/namco53.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/namco/namco53.cpp'};
MERGE (n:KG {id: 'callback:timer/galaga_state.cpu3_interrupt_callback'}) SET n:Callback SET n += {ownerTag: 'cpu3_interrupt_timer', signal: 'timer', operation: 'adjust', targetClass: 'galaga_state', targetMethod: 'cpu3_interrupt_callback', scanlines: [64, 192], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 786, sourceColumn: 1, sourceEndLine: 799};
MERGE (n:KG {id: 'handler:galaga_state.cpu3_interrupt_callback'}) SET n:Handler SET n += {method: 'cpu3_interrupt_callback', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 786, sourceColumn: 1, sourceEndLine: 799, sourceParameters: 'int param', sourceBody: 'int scanline = param;

	if(m_sub2_nmi_mask)
		m_subcpu2->pulse_input_line(INPUT_LINE_NMI, attotime::zero);

	scanline = scanline + 128;
	if (scanline >= 272)
		scanline = 64;

	/* the vertical synch chain is clocked by H256 -- this is probably not important, but oh well */
	m_cpu3_interrupt_timer->adjust(m_screen->time_until_pos(scanline), scanline);'};
MERGE (n:KG {id: 'game:digdug'}) SET n:Game SET n += {name: 'digdug', year: '1982', company: 'Namco', fullname: 'Dig Dug (rev 2)', monitor: 'ROT90', cls: 'digdug_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3587, sourceColumn: 1, sourceEndLine: 3587};
MERGE (n:KG {id: 'romset:digdug'}) SET n:RomSet SET n += {name: 'digdug', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3193, sourceColumn: 1, sourceEndLine: 3193};
MERGE (n:KG {id: 'region:digdug/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1982, sourceColumn: 2, sourceEndLine: 1982};
MERGE (n:KG {id: 'rom:digdug/maincpu/dd1a.1'}) SET n:Rom SET n += {file: 'dd1a.1', offset: 0, size: 4096, crc: 'a80ec984', sha1: '86689980410b9429cd7582c7a76342721c87d030', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3195, sourceColumn: 2, sourceEndLine: 3195};
MERGE (n:KG {id: 'rom:digdug/maincpu/dd1a.2'}) SET n:Rom SET n += {file: 'dd1a.2', offset: 4096, size: 4096, crc: '559f00bd', sha1: 'fde17785df21956d6fd06bcfe675c392dadb1524', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3196, sourceColumn: 2, sourceEndLine: 3196};
MERGE (n:KG {id: 'rom:digdug/maincpu/dd1a.3'}) SET n:Rom SET n += {file: 'dd1a.3', offset: 8192, size: 4096, crc: '8cbc6fe1', sha1: '57b8a5777f8bb9773caf0cafe5408c8b9768cb25', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3197, sourceColumn: 2, sourceEndLine: 3197};
MERGE (n:KG {id: 'rom:digdug/maincpu/dd1a.4'}) SET n:Rom SET n += {file: 'dd1a.4', offset: 12288, size: 4096, crc: 'd066f830', sha1: 'b0a615fe4a5c8742c1e4ef234ef34c369d2723b9', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3198, sourceColumn: 2, sourceEndLine: 3198};
MERGE (n:KG {id: 'region:digdug/sub'}) SET n:RomRegion SET n += {tag: 'sub', size: 65536, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1988, sourceColumn: 2, sourceEndLine: 1988};
MERGE (n:KG {id: 'rom:digdug/sub/dd1a.5'}) SET n:Rom SET n += {file: 'dd1a.5', offset: 0, size: 4096, crc: '6687933b', sha1: 'c16144de7633595ddc1450ddce379f48e7b2195a', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3201, sourceColumn: 2, sourceEndLine: 3201};
MERGE (n:KG {id: 'rom:digdug/sub/dd1a.6'}) SET n:Rom SET n += {file: 'dd1a.6', offset: 4096, size: 4096, crc: '843d857f', sha1: '89b2ead7e478e119d33bfd67376cdf28f83de67a', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3202, sourceColumn: 2, sourceEndLine: 3202};
MERGE (n:KG {id: 'region:digdug/sub2'}) SET n:RomRegion SET n += {tag: 'sub2', size: 65536, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1992, sourceColumn: 2, sourceEndLine: 1992};
MERGE (n:KG {id: 'rom:digdug/sub2/dd1.7'}) SET n:Rom SET n += {file: 'dd1.7', offset: 0, size: 4096, crc: 'a41bce72', sha1: '2b9b74f56aa7939d9d47cf29497ae11f10d78598', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3205, sourceColumn: 2, sourceEndLine: 3205};
MERGE (n:KG {id: 'region:digdug/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 4096, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1995, sourceColumn: 2, sourceEndLine: 1995};
MERGE (n:KG {id: 'rom:digdug/gfx1/dd1.9'}) SET n:Rom SET n += {file: 'dd1.9', offset: 0, size: 2048, crc: 'f14a6fe1', sha1: '0aa63300c2cb887196de590aceb98f3cf06fead4', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3208, sourceColumn: 2, sourceEndLine: 3208};
MERGE (n:KG {id: 'region:digdug/gfx2'}) SET n:RomRegion SET n += {tag: 'gfx2', size: 16384, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1998, sourceColumn: 2, sourceEndLine: 1998};
MERGE (n:KG {id: 'rom:digdug/gfx2/dd1.15'}) SET n:Rom SET n += {file: 'dd1.15', offset: 0, size: 4096, crc: 'e22957c8', sha1: '4700c63f4f680cb8ab8c44e6f3e1712aabd5daa4', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3211, sourceColumn: 2, sourceEndLine: 3211};
MERGE (n:KG {id: 'rom:digdug/gfx2/dd1.14'}) SET n:Rom SET n += {file: 'dd1.14', offset: 4096, size: 4096, crc: '2829ec99', sha1: '3e435c1afb2e44487cd7ba28a93ada2e5ccbb86d', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3212, sourceColumn: 2, sourceEndLine: 3212};
MERGE (n:KG {id: 'rom:digdug/gfx2/dd1.13'}) SET n:Rom SET n += {file: 'dd1.13', offset: 8192, size: 4096, crc: '458499e9', sha1: '578bd839f9218c3cf4feee1223a461144e455df8', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3213, sourceColumn: 2, sourceEndLine: 3213};
MERGE (n:KG {id: 'rom:digdug/gfx2/dd1.12'}) SET n:Rom SET n += {file: 'dd1.12', offset: 12288, size: 4096, crc: 'c58252a0', sha1: 'bd79e39e8a572d2b5c205e6de27ca23e43ec9f51', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3214, sourceColumn: 2, sourceEndLine: 3214};
MERGE (n:KG {id: 'region:digdug/gfx3'}) SET n:RomRegion SET n += {tag: 'gfx3', size: 4096, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2001, sourceColumn: 2, sourceEndLine: 2001};
MERGE (n:KG {id: 'rom:digdug/gfx3/dd1.11'}) SET n:Rom SET n += {file: 'dd1.11', offset: 0, size: 4096, crc: '7b383983', sha1: '57f1e8f5171d13f9f76bd091d81b4423b59f6b42', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3217, sourceColumn: 2, sourceEndLine: 3217};
MERGE (n:KG {id: 'region:digdug/gfx4'}) SET n:RomRegion SET n += {tag: 'gfx4', size: 4096, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2694, sourceColumn: 2, sourceEndLine: 2694};
MERGE (n:KG {id: 'rom:digdug/gfx4/dd1.10b'}) SET n:Rom SET n += {file: 'dd1.10b', offset: 0, size: 4096, crc: '2cf399c2', sha1: '317c48818992f757b1bd0e3997fa99937f81b52c', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3220, sourceColumn: 2, sourceEndLine: 3220};
MERGE (n:KG {id: 'region:digdug/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 544, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2004, sourceColumn: 2, sourceEndLine: 2004};
MERGE (n:KG {id: 'rom:digdug/proms/136007.113'}) SET n:Rom SET n += {file: '136007.113', offset: 0, size: 32, crc: '4cb9da99', sha1: '91a5852a15d4672c29fdcbae75921794651f960c', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3223, sourceColumn: 2, sourceEndLine: 3223};
MERGE (n:KG {id: 'rom:digdug/proms/136007.111'}) SET n:Rom SET n += {file: '136007.111', offset: 32, size: 256, crc: '00c7c419', sha1: '7ea149e8eb36920c3b84984b5ce623729d492fd3', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3224, sourceColumn: 2, sourceEndLine: 3224};
MERGE (n:KG {id: 'rom:digdug/proms/136007.112'}) SET n:Rom SET n += {file: '136007.112', offset: 288, size: 256, crc: 'e9b3e08e', sha1: 'a294cc4da846eb702d61678396bfcbc87d30ea95', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3225, sourceColumn: 2, sourceEndLine: 3225};
MERGE (n:KG {id: 'region:digdug/namco'}) SET n:RomRegion SET n += {tag: 'namco', size: 512, flags: '0', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 2010, sourceColumn: 2, sourceEndLine: 2010};
MERGE (n:KG {id: 'rom:digdug/namco/136007.110'}) SET n:Rom SET n += {file: '136007.110', offset: 0, size: 256, crc: '7a2815b4', sha1: '085ada18c498fdb18ecedef0ea8fe9217edb7b46', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3228, sourceColumn: 2, sourceEndLine: 3228};
MERGE (n:KG {id: 'rom:digdug/namco/136007.109'}) SET n:Rom SET n += {file: '136007.109', offset: 256, size: 256, crc: '77245b66', sha1: '0c4d0bee858b97632411c440bea6948a74759746', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3229, sourceColumn: 2, sourceEndLine: 3229};
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
MERGE (n:KG {id: 'handler:namco_06xx_device.ctrl_r'}) SET n:Handler SET n += {method: 'ctrl_r', ownerClass: 'namco_06xx_device', sourceFile: 'src/mame/namco/namco06.cpp', sourceLine: 174, sourceColumn: 1, sourceEndLine: 177, sourceParameters: '', sourceBody: 'return m_control;'};
MERGE (n:KG {id: 'handler:namco_06xx_device.ctrl_w'}) SET n:Handler SET n += {method: 'ctrl_w', ownerClass: 'namco_06xx_device', sourceFile: 'src/mame/namco/namco06.cpp', sourceLine: 179, sourceColumn: 1, sourceEndLine: 182, sourceParameters: 'uint8_t data', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(namco_06xx_device::ctrl_w_sync),this), data);'};
MERGE (n:KG {id: 'map:digdug_state.digdug_map'}) SET n:AddressMap SET n += {cls: 'digdug_state', name: 'digdug_map', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 921, sourceColumn: 1, sourceEndLine: 937};
MERGE (n:KG {id: 'map:digdug_state.digdug_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 16383, raw: 'map(0x0000, 0x3fff).rom().nopw()', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 923, sourceColumn: 2, sourceEndLine: 923, rom: true, nopw: true};
MERGE (n:KG {id: 'map:digdug_state.digdug_map/range1'}) SET n:AddressRange SET n += {start: 26624, end: 26655, raw: 'map(0x6800, 0x681f).w(m_namco_sound, FUNC(namco_wsg_device::pacman_sound_w))', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 924, sourceColumn: 2, sourceEndLine: 924};
MERGE (n:KG {id: 'map:digdug_state.digdug_map/range2'}) SET n:AddressRange SET n += {start: 26656, end: 26663, raw: 'map(0x6820, 0x6827).w("misclatch", FUNC(ls259_device::write_d0))', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 925, sourceColumn: 2, sourceEndLine: 925};
MERGE (n:KG {id: 'map:digdug_state.digdug_map/range3'}) SET n:AddressRange SET n += {start: 26672, end: 26672, raw: 'map(0x6830, 0x6830).w("watchdog", FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 926, sourceColumn: 2, sourceEndLine: 926};
MERGE (n:KG {id: 'map:digdug_state.digdug_map/range4'}) SET n:AddressRange SET n += {start: 28672, end: 28927, raw: 'map(0x7000, 0x70ff).rw("06xx", FUNC(namco_06xx_device::data_r), FUNC(namco_06xx_device::data_w))', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 927, sourceColumn: 2, sourceEndLine: 927};
MERGE (n:KG {id: 'map:digdug_state.digdug_map/range5'}) SET n:AddressRange SET n += {start: 28928, end: 28928, raw: 'map(0x7100, 0x7100).rw("06xx", FUNC(namco_06xx_device::ctrl_r), FUNC(namco_06xx_device::ctrl_w))', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 928, sourceColumn: 2, sourceEndLine: 928};
MERGE (n:KG {id: 'map:digdug_state.digdug_map/range6'}) SET n:AddressRange SET n += {start: 32768, end: 33791, raw: 'map(0x8000, 0x83ff).ram().w(FUNC(digdug_state::digdug_videoram_w)).share("videoram")', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 929, sourceColumn: 2, sourceEndLine: 929, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'handler:digdug_state.digdug_videoram_w'}) SET n:Handler SET n += {method: 'digdug_videoram_w', ownerClass: 'digdug_state', sourceFile: 'src/mame/namco/digdug.cpp', sourceLine: 180, sourceColumn: 1, sourceEndLine: 184, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[offset] = data;
	m_fg_tilemap->mark_tile_dirty(offset & 0x3ff);'};
MERGE (n:KG {id: 'map:digdug_state.digdug_map/range7'}) SET n:AddressRange SET n += {start: 33792, end: 34815, raw: 'map(0x8400, 0x87ff).ram().share("share1")', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 930, sourceColumn: 2, sourceEndLine: 930, ram: true, share: 'share1'};
MERGE (n:KG {id: 'map:digdug_state.digdug_map/range8'}) SET n:AddressRange SET n += {start: 34816, end: 35839, raw: 'map(0x8800, 0x8bff).ram().share("digdug_objram")', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 931, sourceColumn: 2, sourceEndLine: 931, ram: true, share: 'digdug_objram'};
MERGE (n:KG {id: 'map:digdug_state.digdug_map/range9'}) SET n:AddressRange SET n += {start: 36864, end: 37887, raw: 'map(0x9000, 0x93ff).ram().share("digdug_posram")', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 932, sourceColumn: 2, sourceEndLine: 932, ram: true, share: 'digdug_posram'};
MERGE (n:KG {id: 'map:digdug_state.digdug_map/range10'}) SET n:AddressRange SET n += {start: 38912, end: 39935, raw: 'map(0x9800, 0x9bff).ram().share("digdug_flpram")', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 933, sourceColumn: 2, sourceEndLine: 933, ram: true, share: 'digdug_flpram'};
MERGE (n:KG {id: 'map:digdug_state.digdug_map/range11'}) SET n:AddressRange SET n += {start: 40960, end: 40967, raw: 'map(0xa000, 0xa007).nopr().w(m_videolatch, FUNC(ls259_device::write_d0))', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 934, sourceColumn: 2, sourceEndLine: 934, nopr: true};
MERGE (n:KG {id: 'map:digdug_state.digdug_map/range12'}) SET n:AddressRange SET n += {start: 47104, end: 47167, raw: 'map(0xb800, 0xb83f).rw(FUNC(digdug_state::earom_read), FUNC(digdug_state::earom_write))', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 935, sourceColumn: 2, sourceEndLine: 935};
MERGE (n:KG {id: 'handler:digdug_state.earom_read'}) SET n:Handler SET n += {method: 'earom_read', ownerClass: 'digdug_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 802, sourceColumn: 1, sourceEndLine: 805, sourceParameters: '', sourceBody: 'return m_earom->data();'};
MERGE (n:KG {id: 'handler:digdug_state.earom_write'}) SET n:Handler SET n += {method: 'earom_write', ownerClass: 'digdug_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 807, sourceColumn: 1, sourceEndLine: 811, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_earom->set_address(offset & 0x3f);
	m_earom->set_data(data);'};
MERGE (n:KG {id: 'map:digdug_state.digdug_map/range13'}) SET n:AddressRange SET n += {start: 47168, end: 47168, raw: 'map(0xb840, 0xb840).w(FUNC(digdug_state::earom_control_w))', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 936, sourceColumn: 2, sourceEndLine: 936};
MERGE (n:KG {id: 'handler:digdug_state.earom_control_w'}) SET n:Handler SET n += {method: 'earom_control_w', ownerClass: 'digdug_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 813, sourceColumn: 1, sourceEndLine: 818, sourceConstants: ['CK=1', 'C1=2', 'C2=4', 'CS1=8', 'CS2=16'], sourceParameters: 'uint8_t data', sourceBody: '// CK = DB0, C1 = /DB1, C2 = DB2, CS1 = DB3, /CS2 = GND
	m_earom->set_control(BIT(data, 3), 1, !BIT(data, 1), BIT(data, 2));
	m_earom->set_clk(BIT(data, 0));'};
MERGE (n:KG {id: 'handler:galaga_state.irq1_clear_w'}) SET n:Handler SET n += {method: 'irq1_clear_w', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 733, sourceColumn: 1, sourceEndLine: 738, sourceParameters: 'int state', sourceBody: 'm_main_irq_mask = state;
	if (!m_main_irq_mask)
		m_maincpu->set_input_line(0, CLEAR_LINE);'};
MERGE (n:KG {id: 'handler:galaga_state.irq2_clear_w'}) SET n:Handler SET n += {method: 'irq2_clear_w', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 740, sourceColumn: 1, sourceEndLine: 745, sourceParameters: 'int state', sourceBody: 'm_sub_irq_mask = state;
	if (!m_sub_irq_mask)
		m_subcpu->set_input_line(0, CLEAR_LINE);'};
MERGE (n:KG {id: 'handler:galaga_state.nmion_w'}) SET n:Handler SET n += {method: 'nmion_w', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 747, sourceColumn: 1, sourceEndLine: 750, sourceParameters: 'int state', sourceBody: 'm_sub2_nmi_mask = !state;'};
MERGE (n:KG {id: 'handler:namco_51xx_device.reset'}) SET n:Handler SET n += {method: 'reset', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 64, sourceColumn: 1, sourceEndLine: 68, sourceParameters: 'int state', sourceBody: '// Reset line is active low.
	m_cpu->set_input_line(INPUT_LINE_RESET, state ? CLEAR_LINE : ASSERT_LINE);'};
MERGE (n:KG {id: 'handler:galaga_state.out'}) SET n:Handler SET n += {method: 'out', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 752, sourceColumn: 1, sourceEndLine: 758, sourceParameters: 'uint8_t data', sourceBody: 'm_leds[1] = BIT(data, 0);
	m_leds[0] = BIT(data, 1);
	machine().bookkeeping().coin_counter_w(1,~data & 4);
	machine().bookkeeping().coin_counter_w(0,~data & 8);'};
MERGE (n:KG {id: 'handler:galaga_state.lockout'}) SET n:Handler SET n += {method: 'lockout', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 760, sourceColumn: 1, sourceEndLine: 763, sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_lockout_global_w(state);'};
MERGE (n:KG {id: 'handler:namco_51xx_device.chip_select'}) SET n:Handler SET n += {method: 'chip_select', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 86, sourceColumn: 1, sourceEndLine: 89, sourceParameters: 'int state', sourceBody: 'm_cpu->set_input_line(MB88XX_IRQ_LINE, state ? ASSERT_LINE : CLEAR_LINE);'};
MERGE (n:KG {id: 'handler:namco_51xx_device.rw'}) SET n:Handler SET n += {method: 'rw', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 76, sourceColumn: 1, sourceEndLine: 79, sourceParameters: 'int state', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(namco_51xx_device::rw_sync),this), state);'};
MERGE (n:KG {id: 'handler:namco_51xx_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 91, sourceColumn: 1, sourceEndLine: 94, sourceParameters: '', sourceBody: 'return m_portO;'};
MERGE (n:KG {id: 'handler:namco_51xx_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 96, sourceColumn: 1, sourceEndLine: 99, sourceParameters: 'uint8_t data', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(namco_51xx_device::write_sync),this), data);'};
MERGE (n:KG {id: 'handler:galaga_state.vblank_irq'}) SET n:Handler SET n += {method: 'vblank_irq', ownerClass: 'galaga_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1541, sourceColumn: 1, sourceEndLine: 1548, sourceParameters: 'int state', sourceBody: 'if (state && m_main_irq_mask)
		m_maincpu->set_input_line(0, ASSERT_LINE);

	if (state && m_sub_irq_mask)
		m_subcpu->set_input_line(0, ASSERT_LINE);'};
MERGE (n:KG {id: 'handler:namco_51xx_device.vblank'}) SET n:Handler SET n += {method: 'vblank', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 70, sourceColumn: 1, sourceEndLine: 74, sourceParameters: 'int state', sourceBody: '// The timer is active on falling edges.
	m_cpu->set_input_line(MB88XX_TC_LINE, state ? CLEAR_LINE : ASSERT_LINE);'};
MERGE (n:KG {id: 'machine:digdug_state.digdug'}) SET n:MachineConfig SET n += {cls: 'digdug_state', name: 'digdug', calls: [], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1875, sourceColumn: 1, sourceEndLine: 1952};
MERGE (n:KG {id: 'device:digdug_state.digdug/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 3072000, config: ['Z80(config, m_maincpu, MASTER_CLOCK/6)', 'm_maincpu->set_addrmap(AS_PROGRAM, &digdug_state::digdug_map)'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1878, sourceColumn: 2, sourceEndLine: 1878};
MERGE (n:KG {id: 'device:digdug_state.digdug/sub'}) SET n:Device SET n += {type: 'Z80', tag: 'sub', clock: 3072000, config: ['Z80(config, m_subcpu, MASTER_CLOCK/6)', 'm_subcpu->set_addrmap(AS_PROGRAM, &digdug_state::digdug_map)'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1881, sourceColumn: 2, sourceEndLine: 1881};
MERGE (n:KG {id: 'device:digdug_state.digdug/sub2'}) SET n:Device SET n += {type: 'Z80', tag: 'sub2', clock: 3072000, config: ['Z80(config, m_subcpu2, MASTER_CLOCK/6)', 'm_subcpu2->set_addrmap(AS_PROGRAM, &digdug_state::digdug_map)'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1884, sourceColumn: 2, sourceEndLine: 1884};
MERGE (n:KG {id: 'device:digdug_state.digdug/misclatch'}) SET n:Device SET n += {type: 'LS259', tag: 'misclatch', clock: null, config: ['ls259_device &misclatch(LS259(config, "misclatch"))', 'misclatch.q_out_cb<0>().set(FUNC(galaga_state::irq1_clear_w))', 'misclatch.q_out_cb<1>().set(FUNC(galaga_state::irq2_clear_w))', 'misclatch.q_out_cb<2>().set(FUNC(galaga_state::nmion_w))', 'misclatch.q_out_cb<3>().set_inputline("sub", INPUT_LINE_RESET).invert()', 'misclatch.q_out_cb<3>().append_inputline("sub2", INPUT_LINE_RESET).invert()', 'misclatch.q_out_cb<3>().append("51xx", FUNC(namco_51xx_device::reset))', 'misclatch.q_out_cb<3>().append("53xx", FUNC(namco_53xx_device::reset))'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1887, sourceColumn: 2, sourceEndLine: 1887};
MERGE (n:KG {id: 'device:digdug_state.digdug/misclatch/callback0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'misclatch.q_out_cb<0>().set(FUNC(galaga_state::irq1_clear_w))', ownerTag: 'misclatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1888, sourceColumn: 2, sourceEndLine: 1888, slot: '0', targetClass: 'galaga_state', targetMethod: 'irq1_clear_w'};
MERGE (n:KG {id: 'device:digdug_state.digdug/misclatch/callback1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'misclatch.q_out_cb<1>().set(FUNC(galaga_state::irq2_clear_w))', ownerTag: 'misclatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1889, sourceColumn: 2, sourceEndLine: 1889, slot: '1', targetClass: 'galaga_state', targetMethod: 'irq2_clear_w'};
MERGE (n:KG {id: 'device:digdug_state.digdug/misclatch/callback2'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'misclatch.q_out_cb<2>().set(FUNC(galaga_state::nmion_w))', ownerTag: 'misclatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1890, sourceColumn: 2, sourceEndLine: 1890, slot: '2', targetClass: 'galaga_state', targetMethod: 'nmion_w'};
MERGE (n:KG {id: 'device:digdug_state.digdug/misclatch/callback3'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set_inputline', raw: 'misclatch.q_out_cb<3>().set_inputline("sub", INPUT_LINE_RESET).invert()', ownerTag: 'misclatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1891, sourceColumn: 2, sourceEndLine: 1891, slot: '3', transforms: ['invert'], targetTag: 'sub', inputLine: 'INPUT_LINE_RESET'};
MERGE (n:KG {id: 'device:digdug_state.digdug/misclatch/callback4'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'append_inputline', raw: 'misclatch.q_out_cb<3>().append_inputline("sub2", INPUT_LINE_RESET).invert()', ownerTag: 'misclatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1892, sourceColumn: 2, sourceEndLine: 1892, slot: '3', transforms: ['invert'], targetTag: 'sub2', inputLine: 'INPUT_LINE_RESET'};
MERGE (n:KG {id: 'device:digdug_state.digdug/misclatch/callback5'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'append', raw: 'misclatch.q_out_cb<3>().append("51xx", FUNC(namco_51xx_device::reset))', ownerTag: 'misclatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1893, sourceColumn: 2, sourceEndLine: 1893, slot: '3', targetTag: '51xx', targetClass: 'namco_51xx_device', targetMethod: 'reset'};
MERGE (n:KG {id: 'device:digdug_state.digdug/misclatch/callback6'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'append', raw: 'misclatch.q_out_cb<3>().append("53xx", FUNC(namco_53xx_device::reset))', ownerTag: 'misclatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1894, sourceColumn: 2, sourceEndLine: 1894, slot: '3', targetTag: '53xx', targetClass: 'namco_53xx_device', targetMethod: 'reset'};
MERGE (n:KG {id: 'handler:namco_53xx_device.reset'}) SET n:Handler SET n += {method: 'reset', ownerClass: 'namco_53xx_device', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 63, sourceColumn: 1, sourceEndLine: 67, sourceParameters: 'int state', sourceBody: '// The incoming signal is active low
	m_cpu->set_input_line(INPUT_LINE_RESET, state ? CLEAR_LINE : ASSERT_LINE);'};
MERGE (n:KG {id: 'device:digdug_state.digdug/51xx'}) SET n:Device SET n += {type: 'NAMCO_51XX', tag: '51xx', clock: 1536000, config: ['namco_51xx_device &n51xx(NAMCO_51XX(config, "51xx", MASTER_CLOCK/6/2))', 'n51xx.input_callback<0>().set_ioport("IN0").mask(0x0f)', 'n51xx.input_callback<1>().set_ioport("IN0").rshift(4)', 'n51xx.input_callback<2>().set_ioport("IN1").mask(0x0f)', 'n51xx.input_callback<3>().set_ioport("IN1").rshift(4)', 'n51xx.output_callback().set(FUNC(galaga_state::out))', 'n51xx.lockout_callback().set(FUNC(galaga_state::lockout))'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1897, sourceColumn: 2, sourceEndLine: 1897};
MERGE (n:KG {id: 'device:digdug_state.digdug/51xx/callback0'}) SET n:Callback SET n += {signal: 'input_callback', operation: 'set_ioport', raw: 'n51xx.input_callback<0>().set_ioport("IN0").mask(0x0f)', ownerTag: '51xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1898, sourceColumn: 2, sourceEndLine: 1898, slot: '0', transforms: ['mask(0x0f)'], targetTag: 'IN0', targetPort: 'IN0'};
MERGE (n:KG {id: 'device:digdug_state.digdug/51xx/callback1'}) SET n:Callback SET n += {signal: 'input_callback', operation: 'set_ioport', raw: 'n51xx.input_callback<1>().set_ioport("IN0").rshift(4)', ownerTag: '51xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1899, sourceColumn: 2, sourceEndLine: 1899, slot: '1', transforms: ['rshift(4)'], targetTag: 'IN0', targetPort: 'IN0'};
MERGE (n:KG {id: 'device:digdug_state.digdug/51xx/callback2'}) SET n:Callback SET n += {signal: 'input_callback', operation: 'set_ioport', raw: 'n51xx.input_callback<2>().set_ioport("IN1").mask(0x0f)', ownerTag: '51xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1900, sourceColumn: 2, sourceEndLine: 1900, slot: '2', transforms: ['mask(0x0f)'], targetTag: 'IN1', targetPort: 'IN1'};
MERGE (n:KG {id: 'device:digdug_state.digdug/51xx/callback3'}) SET n:Callback SET n += {signal: 'input_callback', operation: 'set_ioport', raw: 'n51xx.input_callback<3>().set_ioport("IN1").rshift(4)', ownerTag: '51xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1901, sourceColumn: 2, sourceEndLine: 1901, slot: '3', transforms: ['rshift(4)'], targetTag: 'IN1', targetPort: 'IN1'};
MERGE (n:KG {id: 'device:digdug_state.digdug/51xx/callback4'}) SET n:Callback SET n += {signal: 'output_callback', operation: 'set', raw: 'n51xx.output_callback().set(FUNC(galaga_state::out))', ownerTag: '51xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1902, sourceColumn: 2, sourceEndLine: 1902, targetClass: 'galaga_state', targetMethod: 'out'};
MERGE (n:KG {id: 'device:digdug_state.digdug/51xx/callback5'}) SET n:Callback SET n += {signal: 'lockout_callback', operation: 'set', raw: 'n51xx.lockout_callback().set(FUNC(galaga_state::lockout))', ownerTag: '51xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1903, sourceColumn: 2, sourceEndLine: 1903, targetClass: 'galaga_state', targetMethod: 'lockout'};
MERGE (n:KG {id: 'device:digdug_state.digdug/53xx'}) SET n:Device SET n += {type: 'NAMCO_53XX', tag: '53xx', clock: 1536000, config: ['namco_53xx_device &n53xx(NAMCO_53XX(config, "53xx", MASTER_CLOCK/6/2))', 'n53xx.k_port_callback().set("misclatch", FUNC(ls259_device::q7_r)).lshift(3)', 'n53xx.k_port_callback().append("misclatch", FUNC(ls259_device::q6_r)).lshift(2)', 'n53xx.k_port_callback().append("misclatch", FUNC(ls259_device::q5_r)).lshift(1)', 'n53xx.input_callback<0>().set_ioport("DSWA").mask(0x0f)', 'n53xx.input_callback<1>().set_ioport("DSWA").rshift(4)', 'n53xx.input_callback<2>().set_ioport("DSWB").mask(0x0f)', 'n53xx.input_callback<3>().set_ioport("DSWB").rshift(4)'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1905, sourceColumn: 2, sourceEndLine: 1905};
MERGE (n:KG {id: 'device:digdug_state.digdug/53xx/callback0'}) SET n:Callback SET n += {signal: 'k_port_callback', operation: 'set', raw: 'n53xx.k_port_callback().set("misclatch", FUNC(ls259_device::q7_r)).lshift(3)', ownerTag: '53xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1906, sourceColumn: 2, sourceEndLine: 1906, transforms: ['lshift(3)'], targetTag: 'misclatch', targetClass: 'ls259_device', targetMethod: 'q7_r'};
MERGE (n:KG {id: 'handler:ls259_device.q7_r'}) SET n:Handler SET n += {method: 'q7_r', ownerClass: 'ls259_device', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1906, sourceColumn: 2, sourceEndLine: 1906};
MERGE (n:KG {id: 'device:digdug_state.digdug/53xx/callback1'}) SET n:Callback SET n += {signal: 'k_port_callback', operation: 'append', raw: 'n53xx.k_port_callback().append("misclatch", FUNC(ls259_device::q6_r)).lshift(2)', ownerTag: '53xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1907, sourceColumn: 2, sourceEndLine: 1907, transforms: ['lshift(2)'], targetTag: 'misclatch', targetClass: 'ls259_device', targetMethod: 'q6_r'};
MERGE (n:KG {id: 'handler:ls259_device.q6_r'}) SET n:Handler SET n += {method: 'q6_r', ownerClass: 'ls259_device', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1907, sourceColumn: 2, sourceEndLine: 1907};
MERGE (n:KG {id: 'device:digdug_state.digdug/53xx/callback2'}) SET n:Callback SET n += {signal: 'k_port_callback', operation: 'append', raw: 'n53xx.k_port_callback().append("misclatch", FUNC(ls259_device::q5_r)).lshift(1)', ownerTag: '53xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1908, sourceColumn: 2, sourceEndLine: 1908, transforms: ['lshift(1)'], targetTag: 'misclatch', targetClass: 'ls259_device', targetMethod: 'q5_r'};
MERGE (n:KG {id: 'handler:ls259_device.q5_r'}) SET n:Handler SET n += {method: 'q5_r', ownerClass: 'ls259_device', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1908, sourceColumn: 2, sourceEndLine: 1908};
MERGE (n:KG {id: 'device:digdug_state.digdug/53xx/callback3'}) SET n:Callback SET n += {signal: 'input_callback', operation: 'set_ioport', raw: 'n53xx.input_callback<0>().set_ioport("DSWA").mask(0x0f)', ownerTag: '53xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1910, sourceColumn: 2, sourceEndLine: 1910, slot: '0', transforms: ['mask(0x0f)'], targetTag: 'DSWA', targetPort: 'DSWA'};
MERGE (n:KG {id: 'device:digdug_state.digdug/53xx/callback4'}) SET n:Callback SET n += {signal: 'input_callback', operation: 'set_ioport', raw: 'n53xx.input_callback<1>().set_ioport("DSWA").rshift(4)', ownerTag: '53xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1911, sourceColumn: 2, sourceEndLine: 1911, slot: '1', transforms: ['rshift(4)'], targetTag: 'DSWA', targetPort: 'DSWA'};
MERGE (n:KG {id: 'device:digdug_state.digdug/53xx/callback5'}) SET n:Callback SET n += {signal: 'input_callback', operation: 'set_ioport', raw: 'n53xx.input_callback<2>().set_ioport("DSWB").mask(0x0f)', ownerTag: '53xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1912, sourceColumn: 2, sourceEndLine: 1912, slot: '2', transforms: ['mask(0x0f)'], targetTag: 'DSWB', targetPort: 'DSWB'};
MERGE (n:KG {id: 'device:digdug_state.digdug/53xx/callback6'}) SET n:Callback SET n += {signal: 'input_callback', operation: 'set_ioport', raw: 'n53xx.input_callback<3>().set_ioport("DSWB").rshift(4)', ownerTag: '53xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1913, sourceColumn: 2, sourceEndLine: 1913, slot: '3', transforms: ['rshift(4)'], targetTag: 'DSWB', targetPort: 'DSWB'};
MERGE (n:KG {id: 'device:digdug_state.digdug/06xx'}) SET n:Device SET n += {type: 'NAMCO_06XX', tag: '06xx', clock: 48000, config: ['namco_06xx_device &n06xx(NAMCO_06XX(config, "06xx", MASTER_CLOCK/6/64))', 'n06xx.set_maincpu(m_maincpu)', 'n06xx.chip_select_callback<0>().set("51xx", FUNC(namco_51xx_device::chip_select))', 'n06xx.rw_callback<0>().set("51xx", FUNC(namco_51xx_device::rw))', 'n06xx.read_callback<0>().set("51xx", FUNC(namco_51xx_device::read))', 'n06xx.write_callback<0>().set("51xx", FUNC(namco_51xx_device::write))', 'n06xx.chip_select_callback<1>().set("53xx", FUNC(namco_53xx_device::chip_select))', 'n06xx.read_callback<1>().set("53xx", FUNC(namco_53xx_device::read))'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1915, sourceColumn: 2, sourceEndLine: 1915};
MERGE (n:KG {id: 'device:digdug_state.digdug/06xx/callback0'}) SET n:Callback SET n += {signal: 'nmi', operation: 'set_maincpu', raw: 'n06xx.set_maincpu(m_maincpu)', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1916, sourceColumn: 2, sourceEndLine: 1916, inputLine: 'INPUT_LINE_NMI', targetTag: 'maincpu'};
MERGE (n:KG {id: 'device:digdug_state.digdug/06xx/callback1'}) SET n:Callback SET n += {signal: 'chip_select_callback', operation: 'set', raw: 'n06xx.chip_select_callback<0>().set("51xx", FUNC(namco_51xx_device::chip_select))', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1917, sourceColumn: 2, sourceEndLine: 1917, slot: '0', targetTag: '51xx', targetClass: 'namco_51xx_device', targetMethod: 'chip_select'};
MERGE (n:KG {id: 'device:digdug_state.digdug/06xx/callback2'}) SET n:Callback SET n += {signal: 'rw_callback', operation: 'set', raw: 'n06xx.rw_callback<0>().set("51xx", FUNC(namco_51xx_device::rw))', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1918, sourceColumn: 2, sourceEndLine: 1918, slot: '0', targetTag: '51xx', targetClass: 'namco_51xx_device', targetMethod: 'rw'};
MERGE (n:KG {id: 'device:digdug_state.digdug/06xx/callback3'}) SET n:Callback SET n += {signal: 'read_callback', operation: 'set', raw: 'n06xx.read_callback<0>().set("51xx", FUNC(namco_51xx_device::read))', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1919, sourceColumn: 2, sourceEndLine: 1919, slot: '0', targetTag: '51xx', targetClass: 'namco_51xx_device', targetMethod: 'read'};
MERGE (n:KG {id: 'device:digdug_state.digdug/06xx/callback4'}) SET n:Callback SET n += {signal: 'write_callback', operation: 'set', raw: 'n06xx.write_callback<0>().set("51xx", FUNC(namco_51xx_device::write))', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1920, sourceColumn: 2, sourceEndLine: 1920, slot: '0', targetTag: '51xx', targetClass: 'namco_51xx_device', targetMethod: 'write'};
MERGE (n:KG {id: 'device:digdug_state.digdug/06xx/callback5'}) SET n:Callback SET n += {signal: 'chip_select_callback', operation: 'set', raw: 'n06xx.chip_select_callback<1>().set("53xx", FUNC(namco_53xx_device::chip_select))', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1921, sourceColumn: 2, sourceEndLine: 1921, slot: '1', targetTag: '53xx', targetClass: 'namco_53xx_device', targetMethod: 'chip_select'};
MERGE (n:KG {id: 'handler:namco_53xx_device.chip_select'}) SET n:Handler SET n += {method: 'chip_select', ownerClass: 'namco_53xx_device', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 90, sourceColumn: 1, sourceEndLine: 93, sourceParameters: 'int state', sourceBody: 'm_cpu->set_input_line(MB88XX_IRQ_LINE, state ? ASSERT_LINE : CLEAR_LINE);'};
MERGE (n:KG {id: 'device:digdug_state.digdug/06xx/callback6'}) SET n:Callback SET n += {signal: 'read_callback', operation: 'set', raw: 'n06xx.read_callback<1>().set("53xx", FUNC(namco_53xx_device::read))', ownerTag: '06xx', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1922, sourceColumn: 2, sourceEndLine: 1922, slot: '1', targetTag: '53xx', targetClass: 'namco_53xx_device', targetMethod: 'read'};
MERGE (n:KG {id: 'handler:namco_53xx_device.read'}) SET n:Handler SET n += {method: 'read', ownerClass: 'namco_53xx_device', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 95, sourceColumn: 1, sourceEndLine: 98, sourceParameters: '', sourceBody: 'return m_portO;'};
MERGE (n:KG {id: 'device:digdug_state.digdug/videolatch'}) SET n:Device SET n += {type: 'LS259', tag: 'videolatch', clock: null, config: ['LS259(config, m_videolatch)', 'm_videolatch->parallel_out_cb().set(FUNC(digdug_state::bg_select_w)).mask(0x33)', 'm_videolatch->q_out_cb<2>().set(FUNC(digdug_state::tx_color_mode_w))', 'm_videolatch->q_out_cb<3>().set(FUNC(digdug_state::bg_disable_w))', 'm_videolatch->q_out_cb<7>().set(FUNC(digdug_state::flip_screen_set))'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1924, sourceColumn: 2, sourceEndLine: 1924};
MERGE (n:KG {id: 'device:digdug_state.digdug/videolatch/callback0'}) SET n:Callback SET n += {signal: 'parallel_out_cb', operation: 'set', raw: 'm_videolatch->parallel_out_cb().set(FUNC(digdug_state::bg_select_w)).mask(0x33)', ownerTag: 'videolatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1925, sourceColumn: 2, sourceEndLine: 1925, transforms: ['mask(0x33)'], targetClass: 'digdug_state', targetMethod: 'bg_select_w'};
MERGE (n:KG {id: 'handler:digdug_state.bg_select_w'}) SET n:Handler SET n += {method: 'bg_select_w', ownerClass: 'digdug_state', sourceFile: 'src/mame/namco/digdug.cpp', sourceLine: 186, sourceColumn: 1, sourceEndLine: 201, sourceParameters: 'uint8_t data', sourceBody: '// select background picture
	if (m_bg_select != (data & 0x03))
	{
		m_bg_select = data & 0x03;
		m_bg_tilemap->mark_all_dirty();
	}

	// background color bank
	if (m_bg_color_bank != (data & 0x30))
	{
		m_bg_color_bank = data & 0x30;
		m_bg_tilemap->mark_all_dirty();
	}'};
MERGE (n:KG {id: 'device:digdug_state.digdug/videolatch/callback1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_videolatch->q_out_cb<2>().set(FUNC(digdug_state::tx_color_mode_w))', ownerTag: 'videolatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1926, sourceColumn: 2, sourceEndLine: 1926, slot: '2', targetClass: 'digdug_state', targetMethod: 'tx_color_mode_w'};
MERGE (n:KG {id: 'handler:digdug_state.tx_color_mode_w'}) SET n:Handler SET n += {method: 'tx_color_mode_w', ownerClass: 'digdug_state', sourceFile: 'src/mame/namco/digdug.cpp', sourceLine: 203, sourceColumn: 1, sourceEndLine: 208, sourceParameters: 'int state', sourceBody: '// select alpha layer color mode (see tx_get_tile_info)
	m_tx_color_mode = state;
	m_fg_tilemap->mark_all_dirty();'};
MERGE (n:KG {id: 'device:digdug_state.digdug/videolatch/callback2'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_videolatch->q_out_cb<3>().set(FUNC(digdug_state::bg_disable_w))', ownerTag: 'videolatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1927, sourceColumn: 2, sourceEndLine: 1927, slot: '3', targetClass: 'digdug_state', targetMethod: 'bg_disable_w'};
MERGE (n:KG {id: 'handler:digdug_state.bg_disable_w'}) SET n:Handler SET n += {method: 'bg_disable_w', ownerClass: 'digdug_state', sourceFile: 'src/mame/namco/digdug.cpp', sourceLine: 210, sourceColumn: 1, sourceEndLine: 215, sourceParameters: 'int state', sourceBody: '// "disable" background (see bg_get_tile_info)
	m_bg_disable = state;
	m_bg_tilemap->mark_all_dirty();'};
MERGE (n:KG {id: 'device:digdug_state.digdug/videolatch/callback3'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_videolatch->q_out_cb<7>().set(FUNC(digdug_state::flip_screen_set))', ownerTag: 'videolatch', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1928, sourceColumn: 2, sourceEndLine: 1928, slot: '7', targetClass: 'digdug_state', targetMethod: 'flip_screen_set'};
MERGE (n:KG {id: 'handler:digdug_state.flip_screen_set'}) SET n:Handler SET n += {method: 'flip_screen_set', ownerClass: 'digdug_state', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1928, sourceColumn: 2, sourceEndLine: 1928};
MERGE (n:KG {id: 'device:digdug_state.digdug/earom'}) SET n:Device SET n += {type: 'ER2055', tag: 'earom', clock: null, config: ['ER2055(config, m_earom)'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1930, sourceColumn: 2, sourceEndLine: 1930};
MERGE (n:KG {id: 'device:digdug_state.digdug/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, "watchdog")'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1932, sourceColumn: 2, sourceEndLine: 1932};
MERGE (n:KG {id: 'device:digdug_state.digdug/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(MASTER_CLOCK/3, 384, 0, 288, 264, 0, 224)', 'm_screen->set_screen_update(FUNC(digdug_state::screen_update_digdug))', 'm_screen->set_palette(m_palette)', 'm_screen->screen_vblank().set(FUNC(galaga_state::vblank_irq))', 'm_screen->screen_vblank().append("51xx", FUNC(namco_51xx_device::vblank))'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1937, sourceColumn: 2, sourceEndLine: 1937, configCalls: ['set_raw(6144000,384,0,288,264,0,224)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6144000, 384, 0, 288, 264, 0, 224]};
MERGE (n:KG {id: 'device:digdug_state.digdug/screen/callback0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(digdug_state::screen_update_digdug))', ownerTag: 'screen', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1939, sourceColumn: 2, sourceEndLine: 1939, targetClass: 'digdug_state', targetMethod: 'screen_update_digdug'};
MERGE (n:KG {id: 'handler:digdug_state.screen_update_digdug'}) SET n:Handler SET n += {method: 'screen_update_digdug', ownerClass: 'digdug_state', sourceFile: 'src/mame/namco/digdug.cpp', sourceLine: 287, sourceColumn: 1, sourceEndLine: 293, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'm_bg_tilemap->draw(screen, bitmap, cliprect, 0,0);
	m_fg_tilemap->draw(screen, bitmap, cliprect, 0,0);
	draw_sprites(bitmap,cliprect);
	return 0;'};
MERGE (n:KG {id: 'handler:digdug_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'digdug_state', sourceFile: 'src/mame/namco/digdug.cpp', sourceLine: 225, sourceColumn: 1, sourceEndLine: 284, sourceParameters: 'bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'uint8_t *spriteram = m_digdug_objram + 0x380;
	uint8_t *spriteram_2 = m_digdug_posram + 0x380;
	uint8_t *spriteram_3 = m_digdug_flpram + 0x380;
	int offs;

	// mask upper and lower columns
	rectangle visarea = cliprect;
	visarea.min_x = 2*8;
	visarea.max_x = 34*8-1;

	for (offs = 0;offs < 0x80;offs += 2)
	{
		static const int gfx_offs[2][2] =
		{
			{ 0, 1 },
			{ 2, 3 }
		};
		int sprite = spriteram[offs];
		int color = spriteram[offs+1] & 0x3f;
		int sx = spriteram_2[offs+1] - 40+1;
		int sy = 256 - spriteram_2[offs] + 1;   // sprites are buffered and delayed by one scanline
		int flipx = (spriteram_3[offs] & 0x01);
		int flipy = (spriteram_3[offs] & 0x02) >> 1;
		int size  = (sprite & 0x80) >> 7;
		int x,y;

		if (size)
			sprite = (sprite & 0xc0) | ((sprite & ~0xc0) << 2);

		sy -= 16 * size;
		sy = (sy & 0xff) - 32;  // fix wraparound

		if (flip_screen())
		{
			flipx ^= 1;
			flipy ^= 1;
		}

		for (y = 0;y <= size;y++)
		{
			for (x = 0;x <= size;x++)
			{
				uint32_t transmask =  m_palette->transpen_mask(*m_gfxdecode->gfx(1), color, 0x1f);
				m_gfxdecode->gfx(1)->transmask(bitmap,visarea,
					sprite + gfx_offs[y ^ (size * flipy)][x ^ (size * flipx)],
					color,
					flipx,flipy,
					((sx + 16*x) & 0xff), sy + 16*y,transmask);
				/* wraparound */
				m_gfxdecode->gfx(1)->transmask(bitmap,visarea,
					sprite + gfx_offs[y ^ (size * flipy)][x ^ (size * flipx)],
					color,
					flipx,flipy,
					((sx + 16*x) & 0xff) + 0x100, sy + 16*y,transmask);
			}
		}
	}'};
MERGE (n:KG {id: 'device:digdug_state.digdug/screen/callback1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set', raw: 'm_screen->screen_vblank().set(FUNC(galaga_state::vblank_irq))', ownerTag: 'screen', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1941, sourceColumn: 2, sourceEndLine: 1941, targetClass: 'galaga_state', targetMethod: 'vblank_irq'};
MERGE (n:KG {id: 'device:digdug_state.digdug/screen/callback2'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'append', raw: 'm_screen->screen_vblank().append("51xx", FUNC(namco_51xx_device::vblank))', ownerTag: 'screen', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1942, sourceColumn: 2, sourceEndLine: 1942, targetTag: '51xx', targetClass: 'namco_51xx_device', targetMethod: 'vblank'};
MERGE (n:KG {id: 'device:digdug_state.digdug/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_digdug)'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1944, sourceColumn: 2, sourceEndLine: 1944, clockExpr: 'm_palette, gfx_digdug'};
MERGE (n:KG {id: 'device:digdug_state.digdug/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(digdug_state::digdug_palette), 16*2 + 64*4 + 64*4, 32)'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1945, sourceColumn: 2, sourceEndLine: 1945, clockExpr: 'FUNC(digdug_state::digdug_palette), 16*2 + 64*4 + 64*4, 32'};
MERGE (n:KG {id: 'device:digdug_state.digdug/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1948, sourceColumn: 2, sourceEndLine: 1948};
MERGE (n:KG {id: 'device:digdug_state.digdug/namco'}) SET n:Device SET n += {type: 'NAMCO_WSG', tag: 'namco', clock: 96000, config: ['NAMCO_WSG(config, m_namco_sound, MASTER_CLOCK/6/32)', 'm_namco_sound->add_route(ALL_OUTPUTS, "mono", 0.90 * 10.0 / 16.0)'], sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1950, sourceColumn: 2, sourceEndLine: 1950};
MERGE (n:KG {id: 'audioroute:device:digdug_state.digdug/namco/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.5625, raw: 'm_namco_sound->add_route(ALL_OUTPUTS, "mono", 0.90 * 10.0 / 16.0)', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1951, sourceColumn: 2, sourceEndLine: 1951};
MERGE (n:KG {id: 'machine:namco_51xx_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'namco_51xx_device', name: 'device_add_mconfig', calls: [], sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 168, sourceColumn: 1, sourceEndLine: 178};
MERGE (n:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}) SET n:Device SET n += {type: 'MB8843', tag: 'mcu', clock: 1536000, config: ['MB8843(config, m_cpu, DERIVED_CLOCK(1,1))', 'm_cpu->read_k().set(FUNC(namco_51xx_device::K_r))', 'm_cpu->read_r<0>().set(FUNC(namco_51xx_device::R_r<0>))', 'm_cpu->read_r<1>().set(FUNC(namco_51xx_device::R_r<1>))', 'm_cpu->read_r<2>().set(FUNC(namco_51xx_device::R_r<2>))', 'm_cpu->read_r<3>().set(FUNC(namco_51xx_device::R_r<3>))', 'm_cpu->write_o().set(FUNC(namco_51xx_device::O_w))', 'm_cpu->write_p().set(FUNC(namco_51xx_device::P_w))'], sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 170, sourceColumn: 2, sourceEndLine: 170};
MERGE (n:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback0'}) SET n:Callback SET n += {signal: 'read_k', operation: 'set', raw: 'm_cpu->read_k().set(FUNC(namco_51xx_device::K_r))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 171, sourceColumn: 2, sourceEndLine: 171, targetClass: 'namco_51xx_device', targetMethod: 'K_r'};
MERGE (n:KG {id: 'handler:namco_51xx_device.K_r'}) SET n:Handler SET n += {method: 'K_r', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 106, sourceColumn: 1, sourceEndLine: 109, sourceParameters: '', sourceBody: 'return (m_rw << 3) | (m_portO & 0x07);'};
MERGE (n:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback1'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<0>().set(FUNC(namco_51xx_device::R_r<0>))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 172, sourceColumn: 2, sourceEndLine: 172, slot: '0', targetClass: 'namco_51xx_device', targetMethod: 'R_r_0'};
MERGE (n:KG {id: 'handler:namco_51xx_device.R_r_0'}) SET n:Handler SET n += {method: 'R_r_0', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 112, sourceColumn: 1, sourceEndLine: 115, sourceConstants: ['N=0'], sourceParameters: '', sourceBody: 'return m_in[N]();'};
MERGE (n:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback2'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<1>().set(FUNC(namco_51xx_device::R_r<1>))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 173, sourceColumn: 2, sourceEndLine: 173, slot: '1', targetClass: 'namco_51xx_device', targetMethod: 'R_r_1'};
MERGE (n:KG {id: 'handler:namco_51xx_device.R_r_1'}) SET n:Handler SET n += {method: 'R_r_1', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 112, sourceColumn: 1, sourceEndLine: 115, sourceConstants: ['N=1'], sourceParameters: '', sourceBody: 'return m_in[N]();'};
MERGE (n:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback3'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<2>().set(FUNC(namco_51xx_device::R_r<2>))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 174, sourceColumn: 2, sourceEndLine: 174, slot: '2', targetClass: 'namco_51xx_device', targetMethod: 'R_r_2'};
MERGE (n:KG {id: 'handler:namco_51xx_device.R_r_2'}) SET n:Handler SET n += {method: 'R_r_2', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 112, sourceColumn: 1, sourceEndLine: 115, sourceConstants: ['N=2'], sourceParameters: '', sourceBody: 'return m_in[N]();'};
MERGE (n:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback4'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<3>().set(FUNC(namco_51xx_device::R_r<3>))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 175, sourceColumn: 2, sourceEndLine: 175, slot: '3', targetClass: 'namco_51xx_device', targetMethod: 'R_r_3'};
MERGE (n:KG {id: 'handler:namco_51xx_device.R_r_3'}) SET n:Handler SET n += {method: 'R_r_3', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 112, sourceColumn: 1, sourceEndLine: 115, sourceConstants: ['N=3'], sourceParameters: '', sourceBody: 'return m_in[N]();'};
MERGE (n:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback5'}) SET n:Callback SET n += {signal: 'write_o', operation: 'set', raw: 'm_cpu->write_o().set(FUNC(namco_51xx_device::O_w))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 176, sourceColumn: 2, sourceEndLine: 176, targetClass: 'namco_51xx_device', targetMethod: 'O_w'};
MERGE (n:KG {id: 'handler:namco_51xx_device.O_w'}) SET n:Handler SET n += {method: 'O_w', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 117, sourceColumn: 1, sourceEndLine: 120, sourceParameters: 'uint8_t data', sourceBody: 'machine().scheduler().synchronize(timer_expired_delegate(FUNC(namco_51xx_device::O_w_sync),this), data);'};
MERGE (n:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback6'}) SET n:Callback SET n += {signal: 'write_p', operation: 'set', raw: 'm_cpu->write_p().set(FUNC(namco_51xx_device::P_w))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 177, sourceColumn: 2, sourceEndLine: 177, targetClass: 'namco_51xx_device', targetMethod: 'P_w'};
MERGE (n:KG {id: 'handler:namco_51xx_device.P_w'}) SET n:Handler SET n += {method: 'P_w', ownerClass: 'namco_51xx_device', sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 127, sourceColumn: 1, sourceEndLine: 130, sourceParameters: 'uint8_t data', sourceBody: 'm_out(data);'};
MERGE (n:KG {id: 'machine:namco_53xx_device.device_add_mconfig'}) SET n:MachineConfig SET n += {cls: 'namco_53xx_device', name: 'device_add_mconfig', calls: [], sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 134, sourceColumn: 1, sourceEndLine: 144};
MERGE (n:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu'}) SET n:Device SET n += {type: 'MB8843', tag: 'mcu', clock: 1536000, config: ['MB8843(config, m_cpu, DERIVED_CLOCK(1,1))', 'm_cpu->read_k().set(FUNC(namco_53xx_device::K_r))', 'm_cpu->write_o().set(FUNC(namco_53xx_device::O_w))', 'm_cpu->write_p().set(FUNC(namco_53xx_device::P_w))', 'm_cpu->read_r<0>().set(FUNC(namco_53xx_device::R_r<0>))', 'm_cpu->read_r<1>().set(FUNC(namco_53xx_device::R_r<1>))', 'm_cpu->read_r<2>().set(FUNC(namco_53xx_device::R_r<2>))', 'm_cpu->read_r<3>().set(FUNC(namco_53xx_device::R_r<3>))'], sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 136, sourceColumn: 2, sourceEndLine: 136};
MERGE (n:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback0'}) SET n:Callback SET n += {signal: 'read_k', operation: 'set', raw: 'm_cpu->read_k().set(FUNC(namco_53xx_device::K_r))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 137, sourceColumn: 2, sourceEndLine: 137, targetClass: 'namco_53xx_device', targetMethod: 'K_r'};
MERGE (n:KG {id: 'handler:namco_53xx_device.K_r'}) SET n:Handler SET n += {method: 'K_r', ownerClass: 'namco_53xx_device', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 69, sourceColumn: 1, sourceEndLine: 72, sourceParameters: '', sourceBody: 'return m_k();'};
MERGE (n:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback1'}) SET n:Callback SET n += {signal: 'write_o', operation: 'set', raw: 'm_cpu->write_o().set(FUNC(namco_53xx_device::O_w))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 138, sourceColumn: 2, sourceEndLine: 138, targetClass: 'namco_53xx_device', targetMethod: 'O_w'};
MERGE (n:KG {id: 'handler:namco_53xx_device.O_w'}) SET n:Handler SET n += {method: 'O_w', ownerClass: 'namco_53xx_device', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 80, sourceColumn: 1, sourceEndLine: 83, sourceParameters: 'uint8_t data', sourceBody: 'm_portO = data;'};
MERGE (n:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback2'}) SET n:Callback SET n += {signal: 'write_p', operation: 'set', raw: 'm_cpu->write_p().set(FUNC(namco_53xx_device::P_w))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 139, sourceColumn: 2, sourceEndLine: 139, targetClass: 'namco_53xx_device', targetMethod: 'P_w'};
MERGE (n:KG {id: 'handler:namco_53xx_device.P_w'}) SET n:Handler SET n += {method: 'P_w', ownerClass: 'namco_53xx_device', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 85, sourceColumn: 1, sourceEndLine: 88, sourceParameters: 'uint8_t data', sourceBody: 'm_p(data);'};
MERGE (n:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback3'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<0>().set(FUNC(namco_53xx_device::R_r<0>))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 140, sourceColumn: 2, sourceEndLine: 140, slot: '0', targetClass: 'namco_53xx_device', targetMethod: 'R_r_0'};
MERGE (n:KG {id: 'handler:namco_53xx_device.R_r_0'}) SET n:Handler SET n += {method: 'R_r_0', ownerClass: 'namco_53xx_device', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 75, sourceColumn: 1, sourceEndLine: 78, sourceConstants: ['N=0'], sourceParameters: '', sourceBody: 'return m_in[N]();'};
MERGE (n:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback4'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<1>().set(FUNC(namco_53xx_device::R_r<1>))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 141, sourceColumn: 2, sourceEndLine: 141, slot: '1', targetClass: 'namco_53xx_device', targetMethod: 'R_r_1'};
MERGE (n:KG {id: 'handler:namco_53xx_device.R_r_1'}) SET n:Handler SET n += {method: 'R_r_1', ownerClass: 'namco_53xx_device', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 75, sourceColumn: 1, sourceEndLine: 78, sourceConstants: ['N=1'], sourceParameters: '', sourceBody: 'return m_in[N]();'};
MERGE (n:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback5'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<2>().set(FUNC(namco_53xx_device::R_r<2>))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 142, sourceColumn: 2, sourceEndLine: 142, slot: '2', targetClass: 'namco_53xx_device', targetMethod: 'R_r_2'};
MERGE (n:KG {id: 'handler:namco_53xx_device.R_r_2'}) SET n:Handler SET n += {method: 'R_r_2', ownerClass: 'namco_53xx_device', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 75, sourceColumn: 1, sourceEndLine: 78, sourceConstants: ['N=2'], sourceParameters: '', sourceBody: 'return m_in[N]();'};
MERGE (n:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback6'}) SET n:Callback SET n += {signal: 'read_r', operation: 'set', raw: 'm_cpu->read_r<3>().set(FUNC(namco_53xx_device::R_r<3>))', ownerTag: 'mcu', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 143, sourceColumn: 2, sourceEndLine: 143, slot: '3', targetClass: 'namco_53xx_device', targetMethod: 'R_r_3'};
MERGE (n:KG {id: 'handler:namco_53xx_device.R_r_3'}) SET n:Handler SET n += {method: 'R_r_3', ownerClass: 'namco_53xx_device', sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 75, sourceColumn: 1, sourceEndLine: 78, sourceConstants: ['N=3'], sourceParameters: '', sourceBody: 'return m_in[N]();'};
MERGE (n:KG {id: 'inputs:digdug'}) SET n:InputPorts SET n += {name: 'digdug', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1291, sourceColumn: 8, sourceEndLine: 1291};
MERGE (n:KG {id: 'inputs:digdug/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:digdug/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY']};
MERGE (n:KG {id: 'inputs:digdug/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY']};
MERGE (n:KG {id: 'inputs:digdug/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY']};
MERGE (n:KG {id: 'inputs:digdug/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY']};
MERGE (n:KG {id: 'inputs:digdug/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:digdug/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:digdug/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:digdug/IN0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:digdug/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:digdug/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_BUTTON1'};
MERGE (n:KG {id: 'inputs:digdug/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:digdug/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_START1'};
MERGE (n:KG {id: 'inputs:digdug/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_START2'};
MERGE (n:KG {id: 'inputs:digdug/IN1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_COIN1'};
MERGE (n:KG {id: 'inputs:digdug/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_COIN2'};
MERGE (n:KG {id: 'inputs:digdug/IN1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_SERVICE1'};
MERGE (n:KG {id: 'inputs:digdug/IN1/f7'}) SET n:PortField SET n += {kind: 'service', mask: 128, activeLow: true};
MERGE (n:KG {id: 'inputs:digdug/DSWA'}) SET n:Port SET n += {tag: 'DSWA', modify: false};
MERGE (n:KG {id: 'inputs:digdug/DSWA/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 7, name: 'Coin B', defaultValue: 1, location: 'SWA:1,2,3', settings: ['7=3C 1C', '3=2C 1C', '1=1C 1C', '5=2C 3C', '6=1C 2C', '2=1C 3C', '4=1C 6C', '0=1C 7C']};
MERGE (n:KG {id: 'inputs:digdug/DSWA/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 56, name: 'Bonus Life', defaultValue: 24, location: 'SWA:4,5,6', settings: ['32=10K, 40K, Every 40K [if "DSWA",0xc0,NOTEQUALS,0xc0]', '16=10K, 50K, Every 50K [if "DSWA",0xc0,NOTEQUALS,0xc0]', '48=20K, 60K, Every 60K [if "DSWA",0xc0,NOTEQUALS,0xc0]', '8=20K, 70K, Every 70K [if "DSWA",0xc0,NOTEQUALS,0xc0]', '40=10K and 40K Only [if "DSWA",0xc0,NOTEQUALS,0xc0]', '24=20K and 60K Only [if "DSWA",0xc0,NOTEQUALS,0xc0]', '56=10K Only [if "DSWA",0xc0,NOTEQUALS,0xc0]', '0=None [if "DSWA",0xc0,NOTEQUALS,0xc0]', '32=20K, 60K, Every 60K [if "DSWA",0xc0,EQUALS,0xc0]', '16=30K, 80K, Every 80K [if "DSWA",0xc0,EQUALS,0xc0]', '48=20K and 50K Only [if "DSWA",0xc0,EQUALS,0xc0]', '8=20K and 60K Only [if "DSWA",0xc0,EQUALS,0xc0]', '40=30K and 70K Only [if "DSWA",0xc0,EQUALS,0xc0]', '24=20K Only [if "DSWA",0xc0,EQUALS,0xc0]', '56=30K Only [if "DSWA",0xc0,EQUALS,0xc0]', '0=None [if "DSWA",0xc0,EQUALS,0xc0]']};
MERGE (n:KG {id: 'inputs:digdug/DSWA/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 192, name: 'Lives', defaultValue: 128, location: 'SWA:7,8', settings: ['0=1', '64=2', '128=3', '192=5']};
MERGE (n:KG {id: 'inputs:digdug/DSWB'}) SET n:Port SET n += {tag: 'DSWB', modify: false};
MERGE (n:KG {id: 'inputs:digdug/DSWB/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 192, name: 'Coin A', defaultValue: 0, location: 'SWB:1,2', settings: ['64=2C 1C', '0=1C 1C', '192=2C 3C', '128=1C 2C']};
MERGE (n:KG {id: 'inputs:digdug/DSWB/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 32, name: 'Freeze', defaultValue: 32, location: 'SWB:3', settings: ['32=Off', '0=On']};
MERGE (n:KG {id: 'inputs:digdug/DSWB/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 16, name: 'Demo Sounds', defaultValue: 0, location: 'SWB:4', settings: ['16=Off', '0=On']};
MERGE (n:KG {id: 'inputs:digdug/DSWB/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 8, name: 'Allow Continue', defaultValue: 0, location: 'SWB:5', settings: ['8=No', '0=Yes']};
MERGE (n:KG {id: 'inputs:digdug/DSWB/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 4, name: 'Cabinet', defaultValue: 4, location: 'SWB:6', settings: ['4=Upright', '0=Cocktail']};
MERGE (n:KG {id: 'inputs:digdug/DSWB/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 3, name: 'Difficulty', defaultValue: 0, location: 'SWB:7,8', settings: ['0=Easy', '2=Medium', '1=Hard', '3=Hardest']};
MERGE (n:KG {id: 'gfxlayout:charlayout_2bpp'}) SET n:GfxLayout SET n += {name: 'charlayout_2bpp', width: 8, height: 8, total: 'RGN_FRAC(1,1)', planes: 2, planeOffsets: [0, 4], xOffsets: [64, 65, 66, 67, 0, 1, 2, 3], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 128};
MERGE (n:KG {id: 'gfxlayout:charlayout_digdug'}) SET n:GfxLayout SET n += {name: 'charlayout_digdug', width: 8, height: 8, total: 'RGN_FRAC(1,1)', planes: 1, planeOffsets: [0], xOffsets: [7, 6, 5, 4, 3, 2, 1, 0], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxlayout:spritelayout_galaga'}) SET n:GfxLayout SET n += {name: 'spritelayout_galaga', width: 16, height: 16, total: 'RGN_FRAC(1,1)', planes: 2, planeOffsets: [0, 4], xOffsets: [0, 1, 2, 3, 64, 65, 66, 67, 128, 129, 130, 131, 192, 193, 194, 195], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 256, 264, 272, 280, 288, 296, 304, 312], charIncrement: 512};
MERGE (n:KG {id: 'gfxdecode:gfx_digdug'}) SET n:GfxDecode SET n += {name: 'gfx_digdug', sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1522, sourceColumn: 8, sourceEndLine: 1522};
MERGE (n:KG {id: 'gfxdecode:gfx_digdug/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'charlayout_digdug', colorBase: 0, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_digdug/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx2', offset: 0, layout: 'spritelayout_galaga', colorBase: 32, colorCount: 64, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_digdug/e2'}) SET n:GfxDecodeEntry SET n += {region: 'gfx3', offset: 0, layout: 'charlayout_2bpp', colorBase: 288, colorCount: 64, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:digdug'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3587, sourceColumn: 1, sourceEndLine: 3587};
MATCH (a:KG {id: 'game:digdug'}), (b:KG {id: 'machine:digdug_state.digdug'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:digdug'}), (b:KG {id: 'inputs:digdug'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:digdug'}), (b:KG {id: 'romset:digdug'}) MERGE (a)-[r:USES_ROMSET]->(b);
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
MATCH (a:KG {id: 'machine:digdug_state.digdug'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1875, sourceColumn: 1, sourceEndLine: 1952};
MATCH (a:KG {id: 'machine:digdug_state.digdug'}), (b:KG {id: 'callback:timer/galaga_state.cpu3_interrupt_callback'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:digdug_state.digdug'}), (b:KG {id: 'device:digdug_state.digdug/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:digdug_state.digdug'}), (b:KG {id: 'device:digdug_state.digdug/sub'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:digdug_state.digdug'}), (b:KG {id: 'device:digdug_state.digdug/sub2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:digdug_state.digdug'}), (b:KG {id: 'device:digdug_state.digdug/misclatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:digdug_state.digdug'}), (b:KG {id: 'device:digdug_state.digdug/51xx'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:digdug_state.digdug'}), (b:KG {id: 'device:digdug_state.digdug/53xx'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:digdug_state.digdug'}), (b:KG {id: 'device:digdug_state.digdug/06xx'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:digdug_state.digdug'}), (b:KG {id: 'device:digdug_state.digdug/videolatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:digdug_state.digdug'}), (b:KG {id: 'device:digdug_state.digdug/earom'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:digdug_state.digdug'}), (b:KG {id: 'device:digdug_state.digdug/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:digdug_state.digdug'}), (b:KG {id: 'device:digdug_state.digdug/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:digdug_state.digdug'}), (b:KG {id: 'device:digdug_state.digdug/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:digdug_state.digdug'}), (b:KG {id: 'gfxdecode:gfx_digdug'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:digdug_state.digdug'}), (b:KG {id: 'device:digdug_state.digdug/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:digdug_state.digdug'}), (b:KG {id: 'device:digdug_state.digdug/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:digdug_state.digdug'}), (b:KG {id: 'device:digdug_state.digdug/namco'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:digdug'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1291, sourceColumn: 8, sourceEndLine: 1291};
MATCH (a:KG {id: 'inputs:digdug'}), (b:KG {id: 'inputs:digdug/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:digdug'}), (b:KG {id: 'inputs:digdug/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:digdug'}), (b:KG {id: 'inputs:digdug/DSWA'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:digdug'}), (b:KG {id: 'inputs:digdug/DSWB'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:digdug'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 3193, sourceColumn: 1, sourceEndLine: 3193};
MATCH (a:KG {id: 'romset:digdug'}), (b:KG {id: 'region:digdug/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:digdug'}), (b:KG {id: 'region:digdug/sub'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:digdug'}), (b:KG {id: 'region:digdug/sub2'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:digdug'}), (b:KG {id: 'region:digdug/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:digdug'}), (b:KG {id: 'region:digdug/gfx2'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:digdug'}), (b:KG {id: 'region:digdug/gfx3'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:digdug'}), (b:KG {id: 'region:digdug/gfx4'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:digdug'}), (b:KG {id: 'region:digdug/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:digdug'}), (b:KG {id: 'region:digdug/namco'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'callback:timer/galaga_state.cpu3_interrupt_callback'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 786, sourceColumn: 1, sourceEndLine: 799};
MATCH (a:KG {id: 'callback:timer/galaga_state.cpu3_interrupt_callback'}), (b:KG {id: 'handler:galaga_state.cpu3_interrupt_callback'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/maincpu'}), (b:KG {id: 'map:digdug_state.digdug_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:digdug_state.digdug/sub'}), (b:KG {id: 'map:digdug_state.digdug_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:digdug_state.digdug/sub2'}), (b:KG {id: 'map:digdug_state.digdug_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:digdug_state.digdug/misclatch'}), (b:KG {id: 'device:digdug_state.digdug/misclatch/callback0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/misclatch'}), (b:KG {id: 'device:digdug_state.digdug/misclatch/callback1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/misclatch'}), (b:KG {id: 'device:digdug_state.digdug/misclatch/callback2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/misclatch'}), (b:KG {id: 'device:digdug_state.digdug/misclatch/callback3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/misclatch'}), (b:KG {id: 'device:digdug_state.digdug/misclatch/callback4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/misclatch'}), (b:KG {id: 'device:digdug_state.digdug/misclatch/callback5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/misclatch'}), (b:KG {id: 'device:digdug_state.digdug/misclatch/callback6'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/51xx'}), (b:KG {id: 'device:digdug_state.digdug/51xx/callback0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/51xx'}), (b:KG {id: 'device:digdug_state.digdug/51xx/callback1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/51xx'}), (b:KG {id: 'device:digdug_state.digdug/51xx/callback2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/51xx'}), (b:KG {id: 'device:digdug_state.digdug/51xx/callback3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/51xx'}), (b:KG {id: 'device:digdug_state.digdug/51xx/callback4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/51xx'}), (b:KG {id: 'device:digdug_state.digdug/51xx/callback5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/51xx'}), (b:KG {id: 'machine:namco_51xx_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/53xx'}), (b:KG {id: 'device:digdug_state.digdug/53xx/callback0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/53xx'}), (b:KG {id: 'device:digdug_state.digdug/53xx/callback1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/53xx'}), (b:KG {id: 'device:digdug_state.digdug/53xx/callback2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/53xx'}), (b:KG {id: 'device:digdug_state.digdug/53xx/callback3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/53xx'}), (b:KG {id: 'device:digdug_state.digdug/53xx/callback4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/53xx'}), (b:KG {id: 'device:digdug_state.digdug/53xx/callback5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/53xx'}), (b:KG {id: 'device:digdug_state.digdug/53xx/callback6'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/53xx'}), (b:KG {id: 'machine:namco_53xx_device.device_add_mconfig'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/06xx'}), (b:KG {id: 'device:digdug_state.digdug/06xx/callback0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/06xx'}), (b:KG {id: 'device:digdug_state.digdug/06xx/callback1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/06xx'}), (b:KG {id: 'device:digdug_state.digdug/06xx/callback2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/06xx'}), (b:KG {id: 'device:digdug_state.digdug/06xx/callback3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/06xx'}), (b:KG {id: 'device:digdug_state.digdug/06xx/callback4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/06xx'}), (b:KG {id: 'device:digdug_state.digdug/06xx/callback5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/06xx'}), (b:KG {id: 'device:digdug_state.digdug/06xx/callback6'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/videolatch'}), (b:KG {id: 'device:digdug_state.digdug/videolatch/callback0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/videolatch'}), (b:KG {id: 'device:digdug_state.digdug/videolatch/callback1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/videolatch'}), (b:KG {id: 'device:digdug_state.digdug/videolatch/callback2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/videolatch'}), (b:KG {id: 'device:digdug_state.digdug/videolatch/callback3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/screen'}), (b:KG {id: 'device:digdug_state.digdug/screen/callback0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/screen'}), (b:KG {id: 'device:digdug_state.digdug/screen/callback1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/screen'}), (b:KG {id: 'device:digdug_state.digdug/screen/callback2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_digdug'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 1522, sourceColumn: 8, sourceEndLine: 1522};
MATCH (a:KG {id: 'gfxdecode:gfx_digdug'}), (b:KG {id: 'gfxdecode:gfx_digdug/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_digdug'}), (b:KG {id: 'gfxdecode:gfx_digdug/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_digdug'}), (b:KG {id: 'gfxdecode:gfx_digdug/e2'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/namco'}), (b:KG {id: 'audioroute:device:digdug_state.digdug/namco/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:digdug/IN0'}), (b:KG {id: 'inputs:digdug/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:digdug/IN0'}), (b:KG {id: 'inputs:digdug/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:digdug/IN0'}), (b:KG {id: 'inputs:digdug/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:digdug/IN0'}), (b:KG {id: 'inputs:digdug/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:digdug/IN0'}), (b:KG {id: 'inputs:digdug/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:digdug/IN0'}), (b:KG {id: 'inputs:digdug/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:digdug/IN0'}), (b:KG {id: 'inputs:digdug/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:digdug/IN0'}), (b:KG {id: 'inputs:digdug/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:digdug/IN1'}), (b:KG {id: 'inputs:digdug/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:digdug/IN1'}), (b:KG {id: 'inputs:digdug/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:digdug/IN1'}), (b:KG {id: 'inputs:digdug/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:digdug/IN1'}), (b:KG {id: 'inputs:digdug/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:digdug/IN1'}), (b:KG {id: 'inputs:digdug/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:digdug/IN1'}), (b:KG {id: 'inputs:digdug/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:digdug/IN1'}), (b:KG {id: 'inputs:digdug/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:digdug/IN1'}), (b:KG {id: 'inputs:digdug/IN1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:digdug/DSWA'}), (b:KG {id: 'inputs:digdug/DSWA/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:digdug/DSWA'}), (b:KG {id: 'inputs:digdug/DSWA/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:digdug/DSWA'}), (b:KG {id: 'inputs:digdug/DSWA/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:digdug/DSWB'}), (b:KG {id: 'inputs:digdug/DSWB/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:digdug/DSWB'}), (b:KG {id: 'inputs:digdug/DSWB/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:digdug/DSWB'}), (b:KG {id: 'inputs:digdug/DSWB/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:digdug/DSWB'}), (b:KG {id: 'inputs:digdug/DSWB/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:digdug/DSWB'}), (b:KG {id: 'inputs:digdug/DSWB/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:digdug/DSWB'}), (b:KG {id: 'inputs:digdug/DSWB/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:digdug/maincpu'}), (b:KG {id: 'rom:digdug/maincpu/dd1a.1'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:digdug/maincpu'}), (b:KG {id: 'rom:digdug/maincpu/dd1a.2'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:digdug/maincpu'}), (b:KG {id: 'rom:digdug/maincpu/dd1a.3'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:digdug/maincpu'}), (b:KG {id: 'rom:digdug/maincpu/dd1a.4'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:digdug/sub'}), (b:KG {id: 'rom:digdug/sub/dd1a.5'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:digdug/sub'}), (b:KG {id: 'rom:digdug/sub/dd1a.6'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:digdug/sub2'}), (b:KG {id: 'rom:digdug/sub2/dd1.7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:digdug/gfx1'}), (b:KG {id: 'rom:digdug/gfx1/dd1.9'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:digdug/gfx2'}), (b:KG {id: 'rom:digdug/gfx2/dd1.15'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:digdug/gfx2'}), (b:KG {id: 'rom:digdug/gfx2/dd1.14'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:digdug/gfx2'}), (b:KG {id: 'rom:digdug/gfx2/dd1.13'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:digdug/gfx2'}), (b:KG {id: 'rom:digdug/gfx2/dd1.12'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:digdug/gfx3'}), (b:KG {id: 'rom:digdug/gfx3/dd1.11'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:digdug/gfx4'}), (b:KG {id: 'rom:digdug/gfx4/dd1.10b'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:digdug/proms'}), (b:KG {id: 'rom:digdug/proms/136007.113'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:digdug/proms'}), (b:KG {id: 'rom:digdug/proms/136007.111'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:digdug/proms'}), (b:KG {id: 'rom:digdug/proms/136007.112'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:digdug/namco'}), (b:KG {id: 'rom:digdug/namco/136007.110'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:digdug/namco'}), (b:KG {id: 'rom:digdug/namco/136007.109'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'map:digdug_state.digdug_map'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/galaga.cpp', sourceLine: 921, sourceColumn: 1, sourceEndLine: 937};
MATCH (a:KG {id: 'map:digdug_state.digdug_map'}), (b:KG {id: 'map:digdug_state.digdug_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:digdug_state.digdug_map'}), (b:KG {id: 'map:digdug_state.digdug_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:digdug_state.digdug_map'}), (b:KG {id: 'map:digdug_state.digdug_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:digdug_state.digdug_map'}), (b:KG {id: 'map:digdug_state.digdug_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:digdug_state.digdug_map'}), (b:KG {id: 'map:digdug_state.digdug_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:digdug_state.digdug_map'}), (b:KG {id: 'map:digdug_state.digdug_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:digdug_state.digdug_map'}), (b:KG {id: 'map:digdug_state.digdug_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:digdug_state.digdug_map'}), (b:KG {id: 'map:digdug_state.digdug_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:digdug_state.digdug_map'}), (b:KG {id: 'map:digdug_state.digdug_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:digdug_state.digdug_map'}), (b:KG {id: 'map:digdug_state.digdug_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:digdug_state.digdug_map'}), (b:KG {id: 'map:digdug_state.digdug_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:digdug_state.digdug_map'}), (b:KG {id: 'map:digdug_state.digdug_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:digdug_state.digdug_map'}), (b:KG {id: 'map:digdug_state.digdug_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:digdug_state.digdug_map'}), (b:KG {id: 'map:digdug_state.digdug_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/misclatch/callback0'}), (b:KG {id: 'handler:galaga_state.irq1_clear_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/misclatch/callback1'}), (b:KG {id: 'handler:galaga_state.irq2_clear_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/misclatch/callback2'}), (b:KG {id: 'handler:galaga_state.nmion_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/misclatch/callback3'}), (b:KG {id: 'device:digdug_state.digdug/sub'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/misclatch/callback4'}), (b:KG {id: 'device:digdug_state.digdug/sub2'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/misclatch/callback5'}), (b:KG {id: 'handler:namco_51xx_device.reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/misclatch/callback6'}), (b:KG {id: 'handler:namco_53xx_device.reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/51xx/callback4'}), (b:KG {id: 'handler:galaga_state.out'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/51xx/callback5'}), (b:KG {id: 'handler:galaga_state.lockout'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:namco_51xx_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/namco/namco51.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/namco51.cpp', sourceLine: 168, sourceColumn: 1, sourceEndLine: 178};
MATCH (a:KG {id: 'machine:namco_51xx_device.device_add_mconfig'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/53xx/callback0'}), (b:KG {id: 'handler:ls259_device.q7_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/53xx/callback0'}), (b:KG {id: 'device:digdug_state.digdug/misclatch'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/53xx/callback1'}), (b:KG {id: 'handler:ls259_device.q6_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/53xx/callback1'}), (b:KG {id: 'device:digdug_state.digdug/misclatch'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/53xx/callback2'}), (b:KG {id: 'handler:ls259_device.q5_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/53xx/callback2'}), (b:KG {id: 'device:digdug_state.digdug/misclatch'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:namco_53xx_device.device_add_mconfig'}), (b:KG {id: 'file:src/mame/namco/namco53.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/namco/namco53.cpp', sourceLine: 134, sourceColumn: 1, sourceEndLine: 144};
MATCH (a:KG {id: 'machine:namco_53xx_device.device_add_mconfig'}), (b:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/06xx/callback0'}), (b:KG {id: 'device:digdug_state.digdug/maincpu'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/06xx/callback1'}), (b:KG {id: 'handler:namco_51xx_device.chip_select'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/06xx/callback1'}), (b:KG {id: 'device:digdug_state.digdug/51xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/06xx/callback2'}), (b:KG {id: 'handler:namco_51xx_device.rw'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/06xx/callback2'}), (b:KG {id: 'device:digdug_state.digdug/51xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/06xx/callback3'}), (b:KG {id: 'handler:namco_51xx_device.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/06xx/callback3'}), (b:KG {id: 'device:digdug_state.digdug/51xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/06xx/callback4'}), (b:KG {id: 'handler:namco_51xx_device.write'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/06xx/callback4'}), (b:KG {id: 'device:digdug_state.digdug/51xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/06xx/callback5'}), (b:KG {id: 'handler:namco_53xx_device.chip_select'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/06xx/callback5'}), (b:KG {id: 'device:digdug_state.digdug/53xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/06xx/callback6'}), (b:KG {id: 'handler:namco_53xx_device.read'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/06xx/callback6'}), (b:KG {id: 'device:digdug_state.digdug/53xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/videolatch/callback0'}), (b:KG {id: 'handler:digdug_state.bg_select_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/videolatch/callback1'}), (b:KG {id: 'handler:digdug_state.tx_color_mode_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/videolatch/callback2'}), (b:KG {id: 'handler:digdug_state.bg_disable_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/videolatch/callback3'}), (b:KG {id: 'handler:digdug_state.flip_screen_set'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/screen/callback0'}), (b:KG {id: 'handler:digdug_state.screen_update_digdug'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/screen/callback1'}), (b:KG {id: 'handler:galaga_state.vblank_irq'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/screen/callback2'}), (b:KG {id: 'handler:namco_51xx_device.vblank'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:digdug_state.digdug/screen/callback2'}), (b:KG {id: 'device:digdug_state.digdug/51xx'}) MERGE (a)-[r:TARGETS_DEVICE]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_digdug/e0'}), (b:KG {id: 'gfxlayout:charlayout_digdug'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_digdug/e1'}), (b:KG {id: 'gfxlayout:spritelayout_galaga'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_digdug/e2'}), (b:KG {id: 'gfxlayout:charlayout_2bpp'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'map:digdug_state.digdug_map/range1'}), (b:KG {id: 'handler:namco_wsg_device.pacman_sound_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'namco'};
MATCH (a:KG {id: 'map:digdug_state.digdug_map/range2'}), (b:KG {id: 'handler:ls259_device.write_d0'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'misclatch'};
MATCH (a:KG {id: 'map:digdug_state.digdug_map/range3'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:digdug_state.digdug_map/range4'}), (b:KG {id: 'handler:namco_06xx_device.data_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: '06xx'};
MATCH (a:KG {id: 'map:digdug_state.digdug_map/range4'}), (b:KG {id: 'handler:namco_06xx_device.data_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: '06xx'};
MATCH (a:KG {id: 'map:digdug_state.digdug_map/range5'}), (b:KG {id: 'handler:namco_06xx_device.ctrl_r'}) MERGE (a)-[r:READS]->(b) SET r += {deviceTag: '06xx'};
MATCH (a:KG {id: 'map:digdug_state.digdug_map/range5'}), (b:KG {id: 'handler:namco_06xx_device.ctrl_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: '06xx'};
MATCH (a:KG {id: 'map:digdug_state.digdug_map/range6'}), (b:KG {id: 'handler:digdug_state.digdug_videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:digdug_state.digdug_map/range11'}), (b:KG {id: 'handler:ls259_device.write_d0'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'videolatch'};
MATCH (a:KG {id: 'map:digdug_state.digdug_map/range12'}), (b:KG {id: 'handler:digdug_state.earom_read'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:digdug_state.digdug_map/range12'}), (b:KG {id: 'handler:digdug_state.earom_write'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:digdug_state.digdug_map/range13'}), (b:KG {id: 'handler:digdug_state.earom_control_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/namco51.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/namco51.cpp'}), (b:KG {id: 'file:namco51.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/namco51.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback6'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/namco53.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/namco/namco53.cpp'}), (b:KG {id: 'file:namco53.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback5'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu'}), (b:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback6'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'handler:digdug_state.screen_update_digdug'}), (b:KG {id: 'handler:digdug_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:charlayout_digdug'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:spritelayout_galaga'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:charlayout_2bpp'}), (b:KG {id: 'file:src/mame/namco/galaga.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback0'}), (b:KG {id: 'handler:namco_51xx_device.K_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback1'}), (b:KG {id: 'handler:namco_51xx_device.R_r_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback2'}), (b:KG {id: 'handler:namco_51xx_device.R_r_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback3'}), (b:KG {id: 'handler:namco_51xx_device.R_r_2'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback4'}), (b:KG {id: 'handler:namco_51xx_device.R_r_3'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback5'}), (b:KG {id: 'handler:namco_51xx_device.O_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_51xx_device.device_add_mconfig/mcu/callback6'}), (b:KG {id: 'handler:namco_51xx_device.P_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback0'}), (b:KG {id: 'handler:namco_53xx_device.K_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback1'}), (b:KG {id: 'handler:namco_53xx_device.O_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback2'}), (b:KG {id: 'handler:namco_53xx_device.P_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback3'}), (b:KG {id: 'handler:namco_53xx_device.R_r_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback4'}), (b:KG {id: 'handler:namco_53xx_device.R_r_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback5'}), (b:KG {id: 'handler:namco_53xx_device.R_r_2'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:namco_53xx_device.device_add_mconfig/mcu/callback6'}), (b:KG {id: 'handler:namco_53xx_device.R_r_3'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
