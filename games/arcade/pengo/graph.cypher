// mamekit knowledge graph — driver src/mame/pacman/pengo.cpp
// generated 2026-08-22T05:52:38.777Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/pacman/pengo.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/pacman/pengo.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:pacman.h'}) SET n:SourceFile SET n += {path: 'pacman.h', external: true};
MERGE (n:KG {id: 'file:machine/segacrpt_device.h'}) SET n:SourceFile SET n += {path: 'machine/segacrpt_device.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:machine/74259.h'}) SET n:SourceFile SET n += {path: 'machine/74259.h', external: true};
MERGE (n:KG {id: 'file:machine/gen_latch.h'}) SET n:SourceFile SET n += {path: 'machine/gen_latch.h', external: true};
MERGE (n:KG {id: 'file:sound/ay8910.h'}) SET n:SourceFile SET n += {path: 'sound/ay8910.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'file:src/mame/pacman/pacman.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/pacman/pacman.cpp'};
MERGE (n:KG {id: 'file:jumpshot.h'}) SET n:SourceFile SET n += {path: 'jumpshot.h', external: true};
MERGE (n:KG {id: 'file:pacplus.h'}) SET n:SourceFile SET n += {path: 'pacplus.h', external: true};
MERGE (n:KG {id: 'file:cpu/s2650/s2650.h'}) SET n:SourceFile SET n += {path: 'cpu/s2650/s2650.h', external: true};
MERGE (n:KG {id: 'file:machine/nvram.h'}) SET n:SourceFile SET n += {path: 'machine/nvram.h', external: true};
MERGE (n:KG {id: 'file:sound/sn76496.h'}) SET n:SourceFile SET n += {path: 'sound/sn76496.h', external: true};
MERGE (n:KG {id: 'game:pengo'}) SET n:Game SET n += {name: 'pengo', year: '1982', company: 'Sega', fullname: 'Pengo (World, not encrypted, rev A)', monitor: 'ROT90', cls: 'pengo_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 786, sourceColumn: 1, sourceEndLine: 786};
MERGE (n:KG {id: 'romset:pengo'}) SET n:RomSet SET n += {name: 'pengo', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 411, sourceColumn: 1, sourceEndLine: 411};
MERGE (n:KG {id: 'region:pengo/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 412, sourceColumn: 2, sourceEndLine: 412};
MERGE (n:KG {id: 'rom:pengo/maincpu/epr-5128.ic8'}) SET n:Rom SET n += {file: 'epr-5128.ic8', offset: 0, size: 4096, crc: '3dfeb20e', sha1: 'a387b72501da77bf38b58619d2099083a0463e1f', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 413, sourceColumn: 2, sourceEndLine: 413};
MERGE (n:KG {id: 'rom:pengo/maincpu/epr-5129.ic7'}) SET n:Rom SET n += {file: 'epr-5129.ic7', offset: 4096, size: 4096, crc: '1db341bd', sha1: 'd1c66bb9cf479e6960dbcd35c820097a81eaa555', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 414, sourceColumn: 2, sourceEndLine: 414};
MERGE (n:KG {id: 'rom:pengo/maincpu/epr-5130.ic15'}) SET n:Rom SET n += {file: 'epr-5130.ic15', offset: 8192, size: 4096, crc: '7c2842d5', sha1: 'a8a568da68babd0ccb9f2cee4182fc01c3138494', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 415, sourceColumn: 2, sourceEndLine: 415};
MERGE (n:KG {id: 'rom:pengo/maincpu/epr-5131a.ic14'}) SET n:Rom SET n += {file: 'epr-5131a.ic14', offset: 12288, size: 4096, crc: '6e3c1f2f', sha1: '2ee821b0f6e0f3cfeae7f5ff25a6e9bd977efce0', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 416, sourceColumn: 2, sourceEndLine: 416};
MERGE (n:KG {id: 'rom:pengo/maincpu/epr-5132.ic21'}) SET n:Rom SET n += {file: 'epr-5132.ic21', offset: 16384, size: 4096, crc: '95f354ff', sha1: 'fdebc68a6d87f8ecdf52a57a34ae5ae844a13510', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 417, sourceColumn: 2, sourceEndLine: 417};
MERGE (n:KG {id: 'rom:pengo/maincpu/epr-5133.ic20'}) SET n:Rom SET n += {file: 'epr-5133.ic20', offset: 20480, size: 4096, crc: '0fdb04b8', sha1: 'ed814d58318c1055e475ff678609d189727bf9b4', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 418, sourceColumn: 2, sourceEndLine: 418};
MERGE (n:KG {id: 'rom:pengo/maincpu/epr-5134.ic32'}) SET n:Rom SET n += {file: 'epr-5134.ic32', offset: 24576, size: 4096, crc: 'e5920728', sha1: '0ac5ffdad7bdcb32e630b9582e1b1aaece5198c9', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 419, sourceColumn: 2, sourceEndLine: 419};
MERGE (n:KG {id: 'rom:pengo/maincpu/epr-5135a.ic31'}) SET n:Rom SET n += {file: 'epr-5135a.ic31', offset: 28672, size: 4096, crc: '13de47ed', sha1: '332b484d47c9921ed93432755bb2d7a9d4628939', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 420, sourceColumn: 2, sourceEndLine: 420};
MERGE (n:KG {id: 'region:pengo/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 16384, flags: '0', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 422, sourceColumn: 2, sourceEndLine: 422};
MERGE (n:KG {id: 'rom:pengo/gfx1/epr-1640.ic92'}) SET n:Rom SET n += {file: 'epr-1640.ic92', offset: 0, size: 4096, crc: 'd7eec6cd', sha1: 'e542bcc28f292be9a0a29d949de726e0b55e654a', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 423, sourceColumn: 2, sourceEndLine: 423, continueSegments: [8192, 4096, 4096]};
MERGE (n:KG {id: 'rom:pengo/gfx1/epr-1695.ic105'}) SET n:Rom SET n += {file: 'epr-1695.ic105', offset: 4096, size: 4096, crc: '5bfd26e9', sha1: 'bdec535e486b43a8f5550334beff423eeace10b2', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 425, sourceColumn: 2, sourceEndLine: 425, continueSegments: [12288, 4096, 4096]};
MERGE (n:KG {id: 'region:pengo/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 1056, flags: '0', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 428, sourceColumn: 2, sourceEndLine: 428};
MERGE (n:KG {id: 'rom:pengo/proms/pr1633.ic78'}) SET n:Rom SET n += {file: 'pr1633.ic78', offset: 0, size: 32, crc: '3a5844ec', sha1: '680eab0e1204c9b74adc11588461651b474021bb', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 429, sourceColumn: 2, sourceEndLine: 429};
MERGE (n:KG {id: 'rom:pengo/proms/pr1634.ic88'}) SET n:Rom SET n += {file: 'pr1634.ic88', offset: 32, size: 1024, crc: '766b139b', sha1: '3fcd66610fcaee814953a115bf5e04788923181f', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 430, sourceColumn: 2, sourceEndLine: 430};
MERGE (n:KG {id: 'region:pengo/namco'}) SET n:RomRegion SET n += {tag: 'namco', size: 512, flags: '0', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 432, sourceColumn: 2, sourceEndLine: 432};
MERGE (n:KG {id: 'rom:pengo/namco/pr1635.ic51'}) SET n:Rom SET n += {file: 'pr1635.ic51', offset: 0, size: 256, crc: 'c29dea27', sha1: '563c9770028fe39188e62630711589d6ed242a66', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 433, sourceColumn: 2, sourceEndLine: 433};
MERGE (n:KG {id: 'rom:pengo/namco/pr1636.ic70'}) SET n:Rom SET n += {file: 'pr1636.ic70', offset: 256, size: 256, crc: '77245b66', sha1: '0c4d0bee858b97632411c440bea6948a74759746', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 434, sourceColumn: 2, sourceEndLine: 434};
MERGE (n:KG {id: 'map:pengo_state.pengo_map'}) SET n:AddressMap SET n += {cls: 'pengo_state', name: 'pengo_map', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 120, sourceColumn: 1, sourceEndLine: 135};
MERGE (n:KG {id: 'map:pengo_state.pengo_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom()', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 122, sourceColumn: 2, sourceEndLine: 122, rom: true};
MERGE (n:KG {id: 'map:pengo_state.pengo_map/range1'}) SET n:AddressRange SET n += {start: 32768, end: 33791, raw: 'map(0x8000, 0x83ff).ram().w(FUNC(pengo_state::pacman_videoram_w)).share("videoram")', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 123, sourceColumn: 2, sourceEndLine: 123, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'handler:pengo_state.pacman_videoram_w'}) SET n:Handler SET n += {method: 'pacman_videoram_w', ownerClass: 'pengo_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 235, sourceColumn: 1, sourceEndLine: 239, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:pengo_state.pengo_map/range2'}) SET n:AddressRange SET n += {start: 33792, end: 34815, raw: 'map(0x8400, 0x87ff).ram().w(FUNC(pengo_state::pacman_colorram_w)).share("colorram")', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 124, sourceColumn: 2, sourceEndLine: 124, ram: true, share: 'colorram'};
MERGE (n:KG {id: 'handler:pengo_state.pacman_colorram_w'}) SET n:Handler SET n += {method: 'pacman_colorram_w', ownerClass: 'pengo_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 241, sourceColumn: 1, sourceEndLine: 245, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_colorram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:pengo_state.pengo_map/range3'}) SET n:AddressRange SET n += {start: 34816, end: 36847, raw: 'map(0x8800, 0x8fef).ram().share("mainram")', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 125, sourceColumn: 2, sourceEndLine: 125, ram: true, share: 'mainram'};
MERGE (n:KG {id: 'map:pengo_state.pengo_map/range4'}) SET n:AddressRange SET n += {start: 36848, end: 36863, raw: 'map(0x8ff0, 0x8fff).ram().share("spriteram")', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 126, sourceColumn: 2, sourceEndLine: 126, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:pengo_state.pengo_map/range5'}) SET n:AddressRange SET n += {start: 36864, end: 36895, raw: 'map(0x9000, 0x901f).w(m_namco_sound, FUNC(namco_wsg_device::pacman_sound_w))', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 127, sourceColumn: 2, sourceEndLine: 127};
MERGE (n:KG {id: 'handler:namco_wsg_device.pacman_sound_w'}) SET n:Handler SET n += {method: 'pacman_sound_w', ownerClass: 'namco_wsg_device', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1455, sourceColumn: 2, sourceEndLine: 1455};
MERGE (n:KG {id: 'map:pengo_state.pengo_map/range6'}) SET n:AddressRange SET n += {start: 36896, end: 36911, raw: 'map(0x9020, 0x902f).writeonly().share("spriteram2")', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 128, sourceColumn: 2, sourceEndLine: 128, writeonly: true, share: 'spriteram2'};
MERGE (n:KG {id: 'map:pengo_state.pengo_map/range7'}) SET n:AddressRange SET n += {start: 36864, end: 36927, raw: 'map(0x9000, 0x903f).portr("DSW2")', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 129, sourceColumn: 2, sourceEndLine: 129, portRead: 'DSW2'};
MERGE (n:KG {id: 'map:pengo_state.pengo_map/range8'}) SET n:AddressRange SET n += {start: 36928, end: 36991, raw: 'map(0x9040, 0x907f).portr("DSW1")', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 130, sourceColumn: 2, sourceEndLine: 130, portRead: 'DSW1'};
MERGE (n:KG {id: 'map:pengo_state.pengo_map/range9'}) SET n:AddressRange SET n += {start: 36928, end: 36935, raw: 'map(0x9040, 0x9047).w(m_mainlatch, FUNC(ls259_device::write_d0))', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 131, sourceColumn: 2, sourceEndLine: 131};
MERGE (n:KG {id: 'handler:ls259_device.write_d0'}) SET n:Handler SET n += {method: 'write_d0', ownerClass: 'ls259_device', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1454, sourceColumn: 2, sourceEndLine: 1454};
MERGE (n:KG {id: 'map:pengo_state.pengo_map/range10'}) SET n:AddressRange SET n += {start: 36976, end: 36976, raw: 'map(0x9070, 0x9070).w(m_watchdog, FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 132, sourceColumn: 2, sourceEndLine: 132};
MERGE (n:KG {id: 'handler:watchdog_timer_device.reset_w'}) SET n:Handler SET n += {method: 'reset_w', ownerClass: 'watchdog_timer_device', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1459, sourceColumn: 2, sourceEndLine: 1459};
MERGE (n:KG {id: 'map:pengo_state.pengo_map/range11'}) SET n:AddressRange SET n += {start: 36992, end: 37055, raw: 'map(0x9080, 0x90bf).portr("IN1")', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 133, sourceColumn: 2, sourceEndLine: 133, portRead: 'IN1'};
MERGE (n:KG {id: 'map:pengo_state.pengo_map/range12'}) SET n:AddressRange SET n += {start: 37056, end: 37119, raw: 'map(0x90c0, 0x90ff).portr("IN0")', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 134, sourceColumn: 2, sourceEndLine: 134, portRead: 'IN0'};
MERGE (n:KG {id: 'map:pengo_state.decrypted_opcodes_map'}) SET n:AddressMap SET n += {cls: 'pengo_state', name: 'decrypted_opcodes_map', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 138, sourceColumn: 1, sourceEndLine: 143};
MERGE (n:KG {id: 'map:pengo_state.decrypted_opcodes_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom().share(m_decrypted_opcodes)', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 140, sourceColumn: 2, sourceEndLine: 140, rom: true, share: 'decrypted_opcodes'};
MERGE (n:KG {id: 'map:pengo_state.decrypted_opcodes_map/range1'}) SET n:AddressRange SET n += {start: 34816, end: 36847, raw: 'map(0x8800, 0x8fef).ram().share("mainram")', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 141, sourceColumn: 2, sourceEndLine: 141, ram: true, share: 'mainram'};
MERGE (n:KG {id: 'map:pengo_state.decrypted_opcodes_map/range2'}) SET n:AddressRange SET n += {start: 36848, end: 36863, raw: 'map(0x8ff0, 0x8fff).ram().share("spriteram")', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 142, sourceColumn: 2, sourceEndLine: 142, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:pacman_state.pacman_map'}) SET n:AddressMap SET n += {cls: 'pacman_state', name: 'pacman_map', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1049, sourceColumn: 1, sourceEndLine: 1068};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 16383, raw: 'map(0x0000, 0x3fff).mirror(0x8000).rom()', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1052, sourceColumn: 2, sourceEndLine: 1052, mirror: 32768, rom: true};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range1'}) SET n:AddressRange SET n += {start: 16384, end: 17407, raw: 'map(0x4000, 0x43ff).mirror(0xa000).ram().w(FUNC(pacman_state::pacman_videoram_w)).share("videoram")', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1053, sourceColumn: 2, sourceEndLine: 1053, mirror: 40960, ram: true, share: 'videoram'};
MERGE (n:KG {id: 'handler:pacman_state.pacman_videoram_w'}) SET n:Handler SET n += {method: 'pacman_videoram_w', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 235, sourceColumn: 1, sourceEndLine: 239, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_videoram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range2'}) SET n:AddressRange SET n += {start: 17408, end: 18431, raw: 'map(0x4400, 0x47ff).mirror(0xa000).ram().w(FUNC(pacman_state::pacman_colorram_w)).share("colorram")', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1054, sourceColumn: 2, sourceEndLine: 1054, mirror: 40960, ram: true, share: 'colorram'};
MERGE (n:KG {id: 'handler:pacman_state.pacman_colorram_w'}) SET n:Handler SET n += {method: 'pacman_colorram_w', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 241, sourceColumn: 1, sourceEndLine: 245, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_colorram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset);'};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range3'}) SET n:AddressRange SET n += {start: 18432, end: 19455, raw: 'map(0x4800, 0x4bff).mirror(0xa000).r(FUNC(pacman_state::pacman_read_nop)).nopw()', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1055, sourceColumn: 2, sourceEndLine: 1055, mirror: 40960, nopw: true};
MERGE (n:KG {id: 'handler:pacman_state.pacman_read_nop'}) SET n:Handler SET n += {method: 'pacman_read_nop', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1030, sourceColumn: 1, sourceEndLine: 1039, sourceParameters: '', sourceBody: '// Return value of reading the bus with no devices enabled.
	// This seems to be common but more tests are needed. Ms Pacman reads bytes in sequence
	// until it hits a 0 for a delimiter, including empty areas.  It writes to "random"
	// addresses each time. This causes the maze to invert sometimes.  See code at $95c3 where
	// level($4e13)=134. DW
	// tests on exactly what determines the value returned have thus far proved inconclusive
	return 0xbf;'};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range4'}) SET n:AddressRange SET n += {start: 19456, end: 20463, raw: 'map(0x4c00, 0x4fef).mirror(0xa000).ram()', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1056, sourceColumn: 2, sourceEndLine: 1056, mirror: 40960, ram: true};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range5'}) SET n:AddressRange SET n += {start: 20464, end: 20479, raw: 'map(0x4ff0, 0x4fff).mirror(0xa000).ram().share("spriteram")', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1057, sourceColumn: 2, sourceEndLine: 1057, mirror: 40960, ram: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range6'}) SET n:AddressRange SET n += {start: 20480, end: 20487, raw: 'map(0x5000, 0x5007).mirror(0xaf38).w(m_mainlatch, FUNC(ls259_device::write_d0))', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1058, sourceColumn: 2, sourceEndLine: 1058, mirror: 44856};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range7'}) SET n:AddressRange SET n += {start: 20544, end: 20575, raw: 'map(0x5040, 0x505f).mirror(0xaf00).w(m_namco_sound, FUNC(namco_wsg_device::pacman_sound_w))', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1059, sourceColumn: 2, sourceEndLine: 1059, mirror: 44800};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range8'}) SET n:AddressRange SET n += {start: 20576, end: 20591, raw: 'map(0x5060, 0x506f).mirror(0xaf00).writeonly().share("spriteram2")', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1060, sourceColumn: 2, sourceEndLine: 1060, mirror: 44800, writeonly: true, share: 'spriteram2'};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range9'}) SET n:AddressRange SET n += {start: 20592, end: 20607, raw: 'map(0x5070, 0x507f).mirror(0xaf00).nopw()', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1061, sourceColumn: 2, sourceEndLine: 1061, mirror: 44800, nopw: true};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range10'}) SET n:AddressRange SET n += {start: 20608, end: 20608, raw: 'map(0x5080, 0x5080).mirror(0xaf3f).nopw()', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1062, sourceColumn: 2, sourceEndLine: 1062, mirror: 44863, nopw: true};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range11'}) SET n:AddressRange SET n += {start: 20672, end: 20672, raw: 'map(0x50c0, 0x50c0).mirror(0xaf3f).w(m_watchdog, FUNC(watchdog_timer_device::reset_w))', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1063, sourceColumn: 2, sourceEndLine: 1063, mirror: 44863};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range12'}) SET n:AddressRange SET n += {start: 20480, end: 20480, raw: 'map(0x5000, 0x5000).mirror(0xaf3f).portr("IN0")', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1064, sourceColumn: 2, sourceEndLine: 1064, mirror: 44863, portRead: 'IN0'};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range13'}) SET n:AddressRange SET n += {start: 20544, end: 20544, raw: 'map(0x5040, 0x5040).mirror(0xaf3f).portr("IN1")', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1065, sourceColumn: 2, sourceEndLine: 1065, mirror: 44863, portRead: 'IN1'};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range14'}) SET n:AddressRange SET n += {start: 20608, end: 20608, raw: 'map(0x5080, 0x5080).mirror(0xaf3f).portr("DSW1")', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1066, sourceColumn: 2, sourceEndLine: 1066, mirror: 44863, portRead: 'DSW1'};
MERGE (n:KG {id: 'map:pacman_state.pacman_map/range15'}) SET n:AddressRange SET n += {start: 20672, end: 20672, raw: 'map(0x50c0, 0x50c0).mirror(0xaf3f).portr("DSW2")', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1067, sourceColumn: 2, sourceEndLine: 1067, mirror: 44863, portRead: 'DSW2'};
MERGE (n:KG {id: 'map:pacman_state.writeport'}) SET n:AddressMap SET n += {cls: 'pacman_state', name: 'writeport', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1475, sourceColumn: 1, sourceEndLine: 1479, globalMask: 255};
MERGE (n:KG {id: 'map:pacman_state.writeport/range0'}) SET n:AddressRange SET n += {start: 0, end: 0, raw: 'map(0x00, 0x00).w(FUNC(pacman_state::pacman_interrupt_vector_w))', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1478, sourceColumn: 2, sourceEndLine: 1478};
MERGE (n:KG {id: 'handler:pacman_state.pacman_interrupt_vector_w'}) SET n:Handler SET n += {method: 'pacman_interrupt_vector_w', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 394, sourceColumn: 1, sourceEndLine: 397, sourceParameters: 'uint8_t data', sourceBody: 'm_interrupt_vector = data;'};
MERGE (n:KG {id: 'machine:pengo_state.pengo'}) SET n:MachineConfig SET n += {cls: 'pengo_state', name: 'pengo', calls: ['pacman'], startHandlers: ['pacman_state.video_start_pengo'], devicePatches: ['{"tag":"maincpu","config":["m_maincpu->remove_irq_acknowledge_callback()"]}', '{"tag":"mainlatch","config":["m_mainlatch->q_out_cb<2>().set(FUNC(pengo_state::pengo_palettebank_w))","m_mainlatch->q_out_cb<4>().set(FUNC(pengo_state::coin_counter_w<0>))","m_mainlatch->q_out_cb<5>().set(FUNC(pengo_state::coin_counter_w<1>))","m_mainlatch->q_out_cb<6>().set(FUNC(pengo_state::pengo_colortablebank_w))","m_mainlatch->q_out_cb<7>().set(FUNC(pengo_state::pengo_gfxbank_w))"]}'], removedAddrMaps: ['maincpu=AS_IO'], sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 350, sourceColumn: 1, sourceEndLine: 370};
MERGE (n:KG {id: 'handler:pacman_state.video_start_pengo'}) SET n:Handler SET n += {method: 'video_start_pengo', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 446, sourceColumn: 1, sourceEndLine: 460, sourceParameters: '', sourceBody: 'init_save_state();

	m_charbank = 0;
	m_spritebank = 0;
	m_palettebank = 0;
	m_colortablebank = 0;
	m_flipscreen = 0;
	m_bgpriority = 0;
	m_inv_spr = 0;
	m_xoffsethack = 0;

	m_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(pacman_state::pacman_get_tile_info)), tilemap_mapper_delegate(*this, FUNC(pacman_state::pacman_scan_rows)), 8, 8, 36, 28);'};
MERGE (n:KG {id: 'handler:pacman_state.init_save_state'}) SET n:Handler SET n += {method: 'init_save_state', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 195, sourceColumn: 1, sourceEndLine: 205, sourceParameters: '', sourceBody: 'save_item(NAME(m_charbank));
	save_item(NAME(m_spritebank));
	save_item(NAME(m_palettebank));
	save_item(NAME(m_colortablebank));
	save_item(NAME(m_flipscreen));
	save_item(NAME(m_bgpriority));
	save_item(NAME(m_irq_mask));
	save_item(NAME(m_interrupt_vector));'};
MERGE (n:KG {id: 'handler:pacman_state.pacman_get_tile_info'}) SET n:Handler SET n += {method: 'pacman_get_tile_info', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 180, sourceColumn: 1, sourceEndLine: 186, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'int code = m_videoram[tile_index] | (m_charbank << 8);
	int attr = (m_colorram[tile_index] & 0x1f) | (m_colortablebank << 5) | (m_palettebank << 6);

	tileinfo.set(0, code, attr, 0);'};
MERGE (n:KG {id: 'handler:pacman_state.pacman_scan_rows'}) SET n:Handler SET n += {method: 'pacman_scan_rows', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 170, sourceColumn: 1, sourceEndLine: 178, sourceParameters: 'u32 col, u32 row, u32 num_cols, u32 num_rows', sourceBody: 'row += 2;
	col -= 2;
	if (col & 0x20)
		return row + ((col & 0x1f) << 5);
	else
		return col + (row << 5);'};
MERGE (n:KG {id: 'machine:pengo_state.pengo/callback:mainlatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch->q_out_cb<2>().set(FUNC(pengo_state::pengo_palettebank_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 360, sourceColumn: 2, sourceEndLine: 360, slot: '2', targetClass: 'pengo_state', targetMethod: 'pengo_palettebank_w'};
MERGE (n:KG {id: 'handler:pengo_state.pengo_palettebank_w'}) SET n:Handler SET n += {method: 'pengo_palettebank_w', ownerClass: 'pengo_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 462, sourceColumn: 1, sourceEndLine: 466, sourceParameters: 'int state', sourceBody: 'm_palettebank = state;
	m_bg_tilemap->mark_all_dirty();'};
MERGE (n:KG {id: 'machine:pengo_state.pengo/callback:mainlatch:1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch->q_out_cb<4>().set(FUNC(pengo_state::coin_counter_w<0>))', ownerTag: 'mainlatch', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 361, sourceColumn: 2, sourceEndLine: 361, slot: '4', targetClass: 'pengo_state', targetMethod: 'coin_counter_w_0'};
MERGE (n:KG {id: 'handler:pengo_state.coin_counter_w_0'}) SET n:Handler SET n += {method: 'coin_counter_w_0', ownerClass: 'pengo_state', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 115, sourceColumn: 1, sourceEndLine: 118, sourceConstants: ['Which=0'], sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(Which, state);'};
MERGE (n:KG {id: 'machine:pengo_state.pengo/callback:mainlatch:2'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch->q_out_cb<5>().set(FUNC(pengo_state::coin_counter_w<1>))', ownerTag: 'mainlatch', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 362, sourceColumn: 2, sourceEndLine: 362, slot: '5', targetClass: 'pengo_state', targetMethod: 'coin_counter_w_1'};
MERGE (n:KG {id: 'handler:pengo_state.coin_counter_w_1'}) SET n:Handler SET n += {method: 'coin_counter_w_1', ownerClass: 'pengo_state', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 115, sourceColumn: 1, sourceEndLine: 118, sourceConstants: ['Which=1'], sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(Which, state);'};
MERGE (n:KG {id: 'machine:pengo_state.pengo/callback:mainlatch:3'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch->q_out_cb<6>().set(FUNC(pengo_state::pengo_colortablebank_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 363, sourceColumn: 2, sourceEndLine: 363, slot: '6', targetClass: 'pengo_state', targetMethod: 'pengo_colortablebank_w'};
MERGE (n:KG {id: 'handler:pengo_state.pengo_colortablebank_w'}) SET n:Handler SET n += {method: 'pengo_colortablebank_w', ownerClass: 'pengo_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 468, sourceColumn: 1, sourceEndLine: 472, sourceParameters: 'int state', sourceBody: 'm_colortablebank = state;
	m_bg_tilemap->mark_all_dirty();'};
MERGE (n:KG {id: 'machine:pengo_state.pengo/callback:mainlatch:4'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch->q_out_cb<7>().set(FUNC(pengo_state::pengo_gfxbank_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 364, sourceColumn: 2, sourceEndLine: 364, slot: '7', targetClass: 'pengo_state', targetMethod: 'pengo_gfxbank_w'};
MERGE (n:KG {id: 'handler:pengo_state.pengo_gfxbank_w'}) SET n:Handler SET n += {method: 'pengo_gfxbank_w', ownerClass: 'pengo_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 474, sourceColumn: 1, sourceEndLine: 479, sourceParameters: 'int state', sourceBody: 'm_spritebank = state;
	m_charbank = state;
	m_bg_tilemap->mark_all_dirty();'};
MERGE (n:KG {id: 'machine:pengo_state.pengou'}) SET n:MachineConfig SET n += {cls: 'pengo_state', name: 'pengou', calls: ['pengo'], removedAddrMaps: ['maincpu=AS_OPCODES'], sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 372, sourceColumn: 1, sourceEndLine: 377};
MERGE (n:KG {id: 'machine:pacman_state.pacman'}) SET n:MachineConfig SET n += {cls: 'pacman_state', name: 'pacman', calls: [], startHandlers: ['pacman_state.video_start_pacman'], sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3705, sourceColumn: 1, sourceEndLine: 3747};
MERGE (n:KG {id: 'handler:pacman_state.video_start_pacman'}) SET n:Handler SET n += {method: 'video_start_pacman', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 208, sourceColumn: 1, sourceEndLine: 226, sourceParameters: '', sourceBody: 'init_save_state();

	m_charbank = 0;
	m_spritebank = 0;
	m_palettebank = 0;
	m_colortablebank = 0;
	m_flipscreen = 0;
	m_bgpriority = 0;
	m_inv_spr = 0;
	m_interrupt_vector = 0;

	/* In the Pac Man based games (NOT Pengo) the first two sprites must be offset */
	/* one pixel to the left to get a more correct placement */
	m_xoffsethack = 1;

	m_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(pacman_state::pacman_get_tile_info)), tilemap_mapper_delegate(*this, FUNC(pacman_state::pacman_scan_rows)), 8, 8, 36, 28);'};
MERGE (n:KG {id: 'device:pacman_state.pacman/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 3072000, config: ['Z80(config, m_maincpu, 18.432_MHz_XTAL / 6)', 'm_maincpu->set_addrmap(AS_PROGRAM, &pacman_state::pacman_map)', 'm_maincpu->set_addrmap(AS_IO, &pacman_state::writeport)', 'm_maincpu->set_irq_acknowledge_callback(FUNC(pacman_state::interrupt_vector_r))', 'm_maincpu->remove_irq_acknowledge_callback()'], sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3708, sourceColumn: 2, sourceEndLine: 3708};
MERGE (n:KG {id: 'device:pacman_state.pacman/maincpu/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'set_irq_acknowledge_callback', operation: 'set_irq_acknowledge_callback', raw: 'm_maincpu->set_irq_acknowledge_callback(FUNC(pacman_state::interrupt_vector_r))', ownerTag: 'maincpu', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3711, sourceColumn: 2, sourceEndLine: 3711, targetClass: 'pacman_state', targetMethod: 'interrupt_vector_r'};
MERGE (n:KG {id: 'handler:pacman_state.interrupt_vector_r'}) SET n:Handler SET n += {method: 'interrupt_vector_r', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 399, sourceColumn: 1, sourceEndLine: 402, sourceParameters: 'int irqline', sourceBody: 'return m_interrupt_vector;'};
MERGE (n:KG {id: 'device:pacman_state.pacman/mainlatch'}) SET n:Device SET n += {type: 'LS259', tag: 'mainlatch', clock: null, config: ['LS259(config, m_mainlatch)', 'm_mainlatch->q_out_cb<0>().set(FUNC(pacman_state::irq_mask_w))', 'm_mainlatch->q_out_cb<1>().set("namco", FUNC(namco_wsg_device::sound_enable_w))', 'm_mainlatch->q_out_cb<3>().set(FUNC(pacman_state::flipscreen_w))', 'm_mainlatch->q_out_cb<7>().set(FUNC(pacman_state::coin_counter_w))', 'm_mainlatch->q_out_cb<2>().set(FUNC(pengo_state::pengo_palettebank_w))', 'm_mainlatch->q_out_cb<4>().set(FUNC(pengo_state::coin_counter_w<0>))', 'm_mainlatch->q_out_cb<5>().set(FUNC(pengo_state::coin_counter_w<1>))', 'm_mainlatch->q_out_cb<6>().set(FUNC(pengo_state::pengo_colortablebank_w))', 'm_mainlatch->q_out_cb<7>().set(FUNC(pengo_state::pengo_gfxbank_w))'], sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3713, sourceColumn: 2, sourceEndLine: 3713};
MERGE (n:KG {id: 'device:pacman_state.pacman/mainlatch/callback:mainlatch:0'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch->q_out_cb<0>().set(FUNC(pacman_state::irq_mask_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3714, sourceColumn: 2, sourceEndLine: 3714, slot: '0', targetClass: 'pacman_state', targetMethod: 'irq_mask_w'};
MERGE (n:KG {id: 'handler:pacman_state.irq_mask_w'}) SET n:Handler SET n += {method: 'irq_mask_w', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 380, sourceColumn: 1, sourceEndLine: 385, sourceParameters: 'int state', sourceBody: 'm_irq_mask = state;
	if (!state)
		m_maincpu->set_input_line(INPUT_LINE_IRQ0, CLEAR_LINE);'};
MERGE (n:KG {id: 'device:pacman_state.pacman/mainlatch/callback:mainlatch:1'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch->q_out_cb<1>().set("namco", FUNC(namco_wsg_device::sound_enable_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3715, sourceColumn: 2, sourceEndLine: 3715, slot: '1', targetTag: 'namco', targetClass: 'namco_wsg_device', targetMethod: 'sound_enable_w'};
MERGE (n:KG {id: 'handler:namco_wsg_device.sound_enable_w'}) SET n:Handler SET n += {method: 'sound_enable_w', ownerClass: 'namco_wsg_device', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3892, sourceColumn: 2, sourceEndLine: 3892};
MERGE (n:KG {id: 'device:pacman_state.pacman/mainlatch/callback:mainlatch:2'}) SET n:Callback SET n += {signal: 'q_out_cb', operation: 'set', raw: 'm_mainlatch->q_out_cb<3>().set(FUNC(pacman_state::flipscreen_w))', ownerTag: 'mainlatch', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3716, sourceColumn: 2, sourceEndLine: 3716, slot: '3', targetClass: 'pacman_state', targetMethod: 'flipscreen_w'};
MERGE (n:KG {id: 'handler:pacman_state.flipscreen_w'}) SET n:Handler SET n += {method: 'flipscreen_w', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 247, sourceColumn: 1, sourceEndLine: 251, sourceParameters: 'int state', sourceBody: 'm_flipscreen = state;
	m_bg_tilemap->set_flip(m_flipscreen * (TILEMAP_FLIPX + TILEMAP_FLIPY));'};
MERGE (n:KG {id: 'handler:pacman_state.coin_counter_w'}) SET n:Handler SET n += {method: 'coin_counter_w', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 493, sourceColumn: 1, sourceEndLine: 496, sourceParameters: 'int state', sourceBody: 'machine().bookkeeping().coin_counter_w(0, state);'};
MERGE (n:KG {id: 'device:pacman_state.pacman/watchdog'}) SET n:Device SET n += {type: 'WATCHDOG_TIMER', tag: 'watchdog', clock: null, config: ['WATCHDOG_TIMER(config, m_watchdog)', 'm_watchdog->set_vblank_count("screen", 16)'], sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3725, sourceColumn: 2, sourceEndLine: 3725};
MERGE (n:KG {id: 'device:pacman_state.pacman/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_pacman)'], sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3729, sourceColumn: 2, sourceEndLine: 3729, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:pacman_state.pacman/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(pacman_state::pacman_palette), 128 * 4, 32)'], sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3731, sourceColumn: 2, sourceEndLine: 3731, clockExpr: 'FUNC(pacman_state::pacman_palette)'};
MERGE (n:KG {id: 'device:pacman_state.pacman/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['SCREEN(config, m_screen, SCREEN_TYPE_RASTER)', 'm_screen->set_raw(18.432_MHz_XTAL / 3, 384, 0, 288, 264, 0  , 224  )', 'm_screen->set_screen_update(FUNC(pacman_state::screen_update_pacman))', 'm_screen->set_palette(m_palette)', 'm_screen->screen_vblank().set(FUNC(pacman_state::vblank_irq))'], sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3733, sourceColumn: 2, sourceEndLine: 3733, configCalls: ['set_raw(6144000,384,0,288,264,0,224)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [6144000, 384, 0, 288, 264, 0, 224]};
MERGE (n:KG {id: 'device:pacman_state.pacman/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'm_screen->set_screen_update(FUNC(pacman_state::screen_update_pacman))', ownerTag: 'screen', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3736, sourceColumn: 2, sourceEndLine: 3736, targetClass: 'pacman_state', targetMethod: 'screen_update_pacman'};
MERGE (n:KG {id: 'handler:pacman_state.screen_update_pacman'}) SET n:Handler SET n += {method: 'screen_update_pacman', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 362, sourceColumn: 1, sourceEndLine: 376, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'if (m_bgpriority != 0)
		bitmap.fill(0, cliprect);
	else
		m_bg_tilemap->draw(screen, bitmap, cliprect, TILEMAP_DRAW_OPAQUE, 0);

	if (m_spriteram != nullptr)
		draw_sprites(screen, bitmap, cliprect);

	if (m_bgpriority != 0)
		m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0);

	return 0;'};
MERGE (n:KG {id: 'handler:pacman_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman_v.cpp', sourceLine: 274, sourceColumn: 1, sourceEndLine: 360, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'uint8_t *spriteram = m_spriteram;
	uint8_t *spriteram_2 = m_spriteram2;

	rectangle spriteclip(2*8, 34*8-1, 0*8, 28*8-1);
	spriteclip &= cliprect;

	/* Draw the sprites. Note that it is important to draw them exactly in this */
	/* order, to have the correct priorities. */
	for (int offs = m_spriteram.bytes() - 2; offs > 2*2; offs -= 2)
	{
		int color;
		int sx,sy;
		uint8_t fx,fy;

		if (m_inv_spr)
		{
			sx = spriteram_2[offs + 1];
			sy = 240 - (spriteram_2[offs]);
		}
		else
		{
			sx = 272 - spriteram_2[offs + 1];
			sy = spriteram_2[offs] - 31;
		}

		fx = (spriteram[offs] & 1) ^ m_inv_spr;
		fy = (spriteram[offs] & 2) ^ ((m_inv_spr) << 1);

		color = (spriteram[offs + 1] & 0x1f) | (m_colortablebank << 5) | (m_palettebank << 6);

		m_gfxdecode->gfx(1)->transmask(bitmap,spriteclip,
				(spriteram[offs] >> 2) | (m_spritebank << 6),
				color,
				fx,fy,
				sx,sy,
				m_palette->transpen_mask(*m_gfxdecode->gfx(1), color & 0x3f, 0));

		/* also plot the sprite with wraparound (tunnel in Crush Roller) */
		m_gfxdecode->gfx(1)->transmask(bitmap,spriteclip,
				(spriteram[offs] >> 2) | (m_spritebank << 6),
				color,
				fx,fy,
				sx - 256,sy,
				m_palette->transpen_mask(*m_gfxdecode->gfx(1), color & 0x3f, 0));
	}

	/* In the Pac Man based games (NOT Pengo) the first two sprites must be offset */
	/* one pixel to the left to get a more correct placement */
	for (int offs = 2*2; offs >= 0; offs -= 2)
	{
		int color;
		int sx,sy;
		uint8_t fx,fy;

		if (m_inv_spr)
		{
			sx = spriteram_2[offs + 1];
			sy = 240 - (spriteram_2[offs]);
		}
		else
		{
			sx = 272 - spriteram_2[offs + 1];
			sy = spriteram_2[offs] - 31;
		}
		color = (spriteram[offs + 1] & 0x1f) | (m_colortablebank << 5) | (m_palettebank << 6);

		fx = (spriteram[offs] & 1) ^ m_inv_spr;
		fy = (spriteram[offs] & 2) ^ ((m_inv_spr) << 1);

		m_gfxdecode->gfx(1)->transmask(bitmap,spriteclip,
				(spriteram[offs] >> 2) | (m_spritebank << 6),
				color,
				fx,fy,
				sx,sy + m_xoffsethack,
				m_palette->transpen_mask(*m_gfxdecode->gfx(1), color & 0x3f, 0));

		/* also plot the sprite with wraparound (tunnel in Crush Roller) */
		m_gfxdecode->gfx(1)->transmask(bitmap,spriteclip,
				(spriteram[offs] >> 2) | (m_spritebank << 6),
				color,
				fx,fy,
				sx - 256,sy + m_xoffsethack,
				m_palette->transpen_mask(*m_gfxdecode->gfx(1), color & 0x3f, 0));
	}'};
MERGE (n:KG {id: 'device:pacman_state.pacman/screen/callback:screen:1'}) SET n:Callback SET n += {signal: 'screen_vblank', operation: 'set', raw: 'm_screen->screen_vblank().set(FUNC(pacman_state::vblank_irq))', ownerTag: 'screen', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3738, sourceColumn: 2, sourceEndLine: 3738, targetClass: 'pacman_state', targetMethod: 'vblank_irq'};
MERGE (n:KG {id: 'handler:pacman_state.vblank_irq'}) SET n:Handler SET n += {method: 'vblank_irq', ownerClass: 'pacman_state', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 362, sourceColumn: 1, sourceEndLine: 366, sourceParameters: 'int state', sourceBody: 'if (state && m_irq_mask)
		m_maincpu->set_input_line(INPUT_LINE_IRQ0, ASSERT_LINE);'};
MERGE (n:KG {id: 'device:pacman_state.pacman/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()']};
MERGE (n:KG {id: 'device:pacman_state.pacman/namco'}) SET n:Device SET n += {type: 'NAMCO_WSG', tag: 'namco', clock: 96000, config: ['NAMCO_WSG(config, m_namco_sound, 18.432_MHz_XTAL / 6 / 32)', 'm_namco_sound->add_route(ALL_OUTPUTS, "mono", 1.0)'], sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3745, sourceColumn: 2, sourceEndLine: 3745};
MERGE (n:KG {id: 'audioroute:device:pacman_state.pacman/namco/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 1, raw: 'm_namco_sound->add_route(ALL_OUTPUTS, "mono", 1.0)', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3746, sourceColumn: 2, sourceEndLine: 3746};
MERGE (n:KG {id: 'inputs:pengo'}) SET n:InputPorts SET n += {name: 'pengo', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 169, sourceColumn: 8, sourceEndLine: 169};
MERGE (n:KG {id: 'inputs:pengo/IN0'}) SET n:Port SET n += {tag: 'IN0', modify: false};
MERGE (n:KG {id: 'inputs:pengo/IN0/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY']};
MERGE (n:KG {id: 'inputs:pengo/IN0/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY']};
MERGE (n:KG {id: 'inputs:pengo/IN0/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY']};
MERGE (n:KG {id: 'inputs:pengo/IN0/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY']};
MERGE (n:KG {id: 'inputs:pengo/IN0/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_COIN1', modifiers: ['PORT_IMPULSE(2)']};
MERGE (n:KG {id: 'inputs:pengo/IN0/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_COIN2', modifiers: ['PORT_IMPULSE(2)']};
MERGE (n:KG {id: 'inputs:pengo/IN0/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_COIN3', modifiers: ['PORT_IMPULSE(2)']};
MERGE (n:KG {id: 'inputs:pengo/IN0/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_BUTTON1'};
MERGE (n:KG {id: 'inputs:pengo/IN1'}) SET n:Port SET n += {tag: 'IN1', modify: false};
MERGE (n:KG {id: 'inputs:pengo/IN1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:pengo/IN1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:pengo/IN1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:pengo/IN1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:pengo/IN1/f4'}) SET n:PortField SET n += {kind: 'service', mask: 16, activeLow: true, defaultValue: 16};
MERGE (n:KG {id: 'inputs:pengo/IN1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_START1'};
MERGE (n:KG {id: 'inputs:pengo/IN1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_START2'};
MERGE (n:KG {id: 'inputs:pengo/IN1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL']};
MERGE (n:KG {id: 'inputs:pengo/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:pengo/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 1, name: 'Bonus Life', defaultValue: 0, location: 'SW1:1', settings: ['0=30000', '1=50000']};
MERGE (n:KG {id: 'inputs:pengo/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 2, name: 'Demo Sounds', defaultValue: 0, location: 'SW1:2', settings: ['2=Off', '0=On']};
MERGE (n:KG {id: 'inputs:pengo/DSW1/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 4, name: 'Cabinet', defaultValue: 0, location: 'SW1:3', settings: ['0=Upright', '4=Cocktail']};
MERGE (n:KG {id: 'inputs:pengo/DSW1/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 24, name: 'Lives', defaultValue: 16, location: 'SW1:4,5', settings: ['24=2', '16=3', '8=4', '0=5']};
MERGE (n:KG {id: 'inputs:pengo/DSW1/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 32, name: 'Rack Test (Cheat)', defaultValue: 32, location: 'SW1:6', settings: ['32=Off', '0=On']};
MERGE (n:KG {id: 'inputs:pengo/DSW1/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 192, name: 'Difficulty', defaultValue: 128, location: 'SW1:7,8', settings: ['192=Easy', '128=Medium', '64=Hard', '0=Hardest']};
MERGE (n:KG {id: 'inputs:pengo/DSW2'}) SET n:Port SET n += {tag: 'DSW2', modify: false};
MERGE (n:KG {id: 'inputs:pengo/DSW2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 15, name: 'Coin A', defaultValue: 12, location: 'SW2:1,2,3,4', settings: ['0=4C 1C', '8=3C 1C', '4=2C 1C', '9=2 Coins/1 Credit 5/3', '5=2 Coins/1 Credit 4/3', '12=1C 1C', '13=1 Coin/1 Credit 5/6', '3=1 Coin/1 Credit 4/5', '11=1 Coin/1 Credit 2/3', '2=1C 2C', '7=1 Coin/2 Credits 5/11', '15=1 Coin/2 Credits 4/9', '10=1C 3C', '6=1C 4C', '14=1C 5C', '1=1C 6C']};
MERGE (n:KG {id: 'inputs:pengo/DSW2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 240, name: 'Coin B', defaultValue: 192, location: 'SW2:5,6,7,8', settings: ['0=4C 1C', '128=3C 1C', '64=2C 1C', '144=2 Coins/1 Credit 5/3', '80=2 Coins/1 Credit 4/3', '192=1C 1C', '208=1 Coin/1 Credit 5/6', '48=1 Coin/1 Credit 4/5', '176=1 Coin/1 Credit 2/3', '32=1C 2C', '112=1 Coin/2 Credits 5/11', '240=1 Coin/2 Credits 4/9', '160=1C 3C', '96=1C 4C', '224=1C 5C', '16=1C 6C']};
MERGE (n:KG {id: 'gfxlayout:tilelayout'}) SET n:GfxLayout SET n += {name: 'tilelayout', width: 8, height: 8, total: 'RGN_FRAC(1,2)', planes: 2, planeOffsets: [0, 4], xOffsets: [64, 65, 66, 67, 0, 1, 2, 3], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 128};
MERGE (n:KG {id: 'gfxlayout:spritelayout'}) SET n:GfxLayout SET n += {name: 'spritelayout', width: 16, height: 16, total: 'RGN_FRAC(1,2)', planes: 2, planeOffsets: [0, 4], xOffsets: [64, 65, 66, 67, 128, 129, 130, 131, 192, 193, 194, 195, 0, 1, 2, 3], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 256, 264, 272, 280, 288, 296, 304, 312], charIncrement: 512};
MERGE (n:KG {id: 'gfxdecode:gfx_pengo'}) SET n:GfxDecode SET n += {name: 'gfx_pengo', sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 338, sourceColumn: 8, sourceEndLine: 338};
MERGE (n:KG {id: 'gfxdecode:gfx_pengo/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'tilelayout', colorBase: 0, colorCount: 128, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_pengo/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 8192, layout: 'spritelayout', colorBase: 0, colorCount: 128, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_pacman'}) SET n:GfxDecode SET n += {name: 'gfx_pacman', sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3668, sourceColumn: 8, sourceEndLine: 3668};
MERGE (n:KG {id: 'gfxdecode:gfx_pacman/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'tilelayout', colorBase: 0, colorCount: 128, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_pacman/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 4096, layout: 'spritelayout', colorBase: 0, colorCount: 128, xscale: 1, yscale: 1};
MATCH (a:KG {id: 'game:pengo'}), (b:KG {id: 'file:src/mame/pacman/pengo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 786, sourceColumn: 1, sourceEndLine: 786};
MATCH (a:KG {id: 'game:pengo'}), (b:KG {id: 'machine:pengo_state.pengou'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:pengo'}), (b:KG {id: 'inputs:pengo'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:pengo'}), (b:KG {id: 'romset:pengo'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pengo.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pengo.cpp'}), (b:KG {id: 'file:pacman.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pengo.cpp'}), (b:KG {id: 'file:machine/segacrpt_device.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pengo.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pengo.cpp'}), (b:KG {id: 'file:machine/74259.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pengo.cpp'}), (b:KG {id: 'file:machine/gen_latch.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pengo.cpp'}), (b:KG {id: 'file:sound/ay8910.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pengo.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pengo.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:pengo_state.pengou'}), (b:KG {id: 'file:src/mame/pacman/pengo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 372, sourceColumn: 1, sourceEndLine: 377};
MATCH (a:KG {id: 'machine:pengo_state.pengou'}), (b:KG {id: 'machine:pengo_state.pengo'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'inputs:pengo'}), (b:KG {id: 'file:src/mame/pacman/pengo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 169, sourceColumn: 8, sourceEndLine: 169};
MATCH (a:KG {id: 'inputs:pengo'}), (b:KG {id: 'inputs:pengo/IN0'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:pengo'}), (b:KG {id: 'inputs:pengo/IN1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:pengo'}), (b:KG {id: 'inputs:pengo/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:pengo'}), (b:KG {id: 'inputs:pengo/DSW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:pengo'}), (b:KG {id: 'file:src/mame/pacman/pengo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 411, sourceColumn: 1, sourceEndLine: 411};
MATCH (a:KG {id: 'romset:pengo'}), (b:KG {id: 'region:pengo/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:pengo'}), (b:KG {id: 'region:pengo/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:pengo'}), (b:KG {id: 'region:pengo/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:pengo'}), (b:KG {id: 'region:pengo/namco'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'machine:pengo_state.pengo'}), (b:KG {id: 'file:src/mame/pacman/pengo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 350, sourceColumn: 1, sourceEndLine: 370};
MATCH (a:KG {id: 'machine:pengo_state.pengo'}), (b:KG {id: 'handler:pacman_state.video_start_pengo'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:pengo_state.pengo'}), (b:KG {id: 'machine:pacman_state.pacman'}) MERGE (a)-[r:CALLS]->(b);
MATCH (a:KG {id: 'machine:pengo_state.pengo'}), (b:KG {id: 'map:pengo_state.pengo_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_PROGRAM', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:pengo_state.pengo'}), (b:KG {id: 'map:pengo_state.decrypted_opcodes_map'}) MERGE (a)-[r:PATCHES_MAP]->(b) SET r += {space: 'AS_OPCODES', deviceTag: 'maincpu'};
MATCH (a:KG {id: 'machine:pengo_state.pengo'}), (b:KG {id: 'gfxdecode:gfx_pengo'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode', override: true};
MATCH (a:KG {id: 'machine:pengo_state.pengo'}), (b:KG {id: 'machine:pengo_state.pengo/callback:mainlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:pengo_state.pengo'}), (b:KG {id: 'machine:pengo_state.pengo/callback:mainlatch:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:pengo_state.pengo'}), (b:KG {id: 'machine:pengo_state.pengo/callback:mainlatch:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:pengo_state.pengo'}), (b:KG {id: 'machine:pengo_state.pengo/callback:mainlatch:3'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'machine:pengo_state.pengo'}), (b:KG {id: 'machine:pengo_state.pengo/callback:mainlatch:4'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'inputs:pengo/IN0'}), (b:KG {id: 'inputs:pengo/IN0/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pengo/IN0'}), (b:KG {id: 'inputs:pengo/IN0/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pengo/IN0'}), (b:KG {id: 'inputs:pengo/IN0/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pengo/IN0'}), (b:KG {id: 'inputs:pengo/IN0/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pengo/IN0'}), (b:KG {id: 'inputs:pengo/IN0/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pengo/IN0'}), (b:KG {id: 'inputs:pengo/IN0/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pengo/IN0'}), (b:KG {id: 'inputs:pengo/IN0/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pengo/IN0'}), (b:KG {id: 'inputs:pengo/IN0/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pengo/IN1'}), (b:KG {id: 'inputs:pengo/IN1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pengo/IN1'}), (b:KG {id: 'inputs:pengo/IN1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pengo/IN1'}), (b:KG {id: 'inputs:pengo/IN1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pengo/IN1'}), (b:KG {id: 'inputs:pengo/IN1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pengo/IN1'}), (b:KG {id: 'inputs:pengo/IN1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pengo/IN1'}), (b:KG {id: 'inputs:pengo/IN1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pengo/IN1'}), (b:KG {id: 'inputs:pengo/IN1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pengo/IN1'}), (b:KG {id: 'inputs:pengo/IN1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pengo/DSW1'}), (b:KG {id: 'inputs:pengo/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pengo/DSW1'}), (b:KG {id: 'inputs:pengo/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pengo/DSW1'}), (b:KG {id: 'inputs:pengo/DSW1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pengo/DSW1'}), (b:KG {id: 'inputs:pengo/DSW1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pengo/DSW1'}), (b:KG {id: 'inputs:pengo/DSW1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pengo/DSW1'}), (b:KG {id: 'inputs:pengo/DSW1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pengo/DSW2'}), (b:KG {id: 'inputs:pengo/DSW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:pengo/DSW2'}), (b:KG {id: 'inputs:pengo/DSW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:pengo/maincpu'}), (b:KG {id: 'rom:pengo/maincpu/epr-5128.ic8'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pengo/maincpu'}), (b:KG {id: 'rom:pengo/maincpu/epr-5129.ic7'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pengo/maincpu'}), (b:KG {id: 'rom:pengo/maincpu/epr-5130.ic15'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pengo/maincpu'}), (b:KG {id: 'rom:pengo/maincpu/epr-5131a.ic14'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pengo/maincpu'}), (b:KG {id: 'rom:pengo/maincpu/epr-5132.ic21'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pengo/maincpu'}), (b:KG {id: 'rom:pengo/maincpu/epr-5133.ic20'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pengo/maincpu'}), (b:KG {id: 'rom:pengo/maincpu/epr-5134.ic32'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pengo/maincpu'}), (b:KG {id: 'rom:pengo/maincpu/epr-5135a.ic31'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pengo/gfx1'}), (b:KG {id: 'rom:pengo/gfx1/epr-1640.ic92'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pengo/gfx1'}), (b:KG {id: 'rom:pengo/gfx1/epr-1695.ic105'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pengo/proms'}), (b:KG {id: 'rom:pengo/proms/pr1633.ic78'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pengo/proms'}), (b:KG {id: 'rom:pengo/proms/pr1634.ic88'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pengo/namco'}), (b:KG {id: 'rom:pengo/namco/pr1635.ic51'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:pengo/namco'}), (b:KG {id: 'rom:pengo/namco/pr1636.ic70'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'handler:pacman_state.video_start_pengo'}), (b:KG {id: 'handler:pacman_state.init_save_state'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:pacman_state.video_start_pengo'}), (b:KG {id: 'handler:pacman_state.pacman_get_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:pacman_state.video_start_pengo'}), (b:KG {id: 'handler:pacman_state.pacman_scan_rows'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:pacman_state.pacman'}), (b:KG {id: 'file:src/mame/pacman/pacman.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3705, sourceColumn: 1, sourceEndLine: 3747};
MATCH (a:KG {id: 'machine:pacman_state.pacman'}), (b:KG {id: 'handler:pacman_state.video_start_pacman'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:pacman_state.pacman'}), (b:KG {id: 'device:pacman_state.pacman/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:pacman_state.pacman'}), (b:KG {id: 'device:pacman_state.pacman/mainlatch'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:pacman_state.pacman'}), (b:KG {id: 'device:pacman_state.pacman/watchdog'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:pacman_state.pacman'}), (b:KG {id: 'device:pacman_state.pacman/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:pacman_state.pacman'}), (b:KG {id: 'gfxdecode:gfx_pacman'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:pacman_state.pacman'}), (b:KG {id: 'device:pacman_state.pacman/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:pacman_state.pacman'}), (b:KG {id: 'device:pacman_state.pacman/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:pacman_state.pacman'}), (b:KG {id: 'device:pacman_state.pacman/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:pacman_state.pacman'}), (b:KG {id: 'device:pacman_state.pacman/namco'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'map:pengo_state.pengo_map'}), (b:KG {id: 'file:src/mame/pacman/pengo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 120, sourceColumn: 1, sourceEndLine: 135};
MATCH (a:KG {id: 'map:pengo_state.pengo_map'}), (b:KG {id: 'map:pengo_state.pengo_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pengo_state.pengo_map'}), (b:KG {id: 'map:pengo_state.pengo_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pengo_state.pengo_map'}), (b:KG {id: 'map:pengo_state.pengo_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pengo_state.pengo_map'}), (b:KG {id: 'map:pengo_state.pengo_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pengo_state.pengo_map'}), (b:KG {id: 'map:pengo_state.pengo_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pengo_state.pengo_map'}), (b:KG {id: 'map:pengo_state.pengo_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pengo_state.pengo_map'}), (b:KG {id: 'map:pengo_state.pengo_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pengo_state.pengo_map'}), (b:KG {id: 'map:pengo_state.pengo_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pengo_state.pengo_map'}), (b:KG {id: 'map:pengo_state.pengo_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pengo_state.pengo_map'}), (b:KG {id: 'map:pengo_state.pengo_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pengo_state.pengo_map'}), (b:KG {id: 'map:pengo_state.pengo_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pengo_state.pengo_map'}), (b:KG {id: 'map:pengo_state.pengo_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pengo_state.pengo_map'}), (b:KG {id: 'map:pengo_state.pengo_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pengo_state.decrypted_opcodes_map'}), (b:KG {id: 'file:src/mame/pacman/pengo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 138, sourceColumn: 1, sourceEndLine: 143};
MATCH (a:KG {id: 'map:pengo_state.decrypted_opcodes_map'}), (b:KG {id: 'map:pengo_state.decrypted_opcodes_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pengo_state.decrypted_opcodes_map'}), (b:KG {id: 'map:pengo_state.decrypted_opcodes_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pengo_state.decrypted_opcodes_map'}), (b:KG {id: 'map:pengo_state.decrypted_opcodes_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_pengo'}), (b:KG {id: 'file:src/mame/pacman/pengo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/pacman/pengo.cpp', sourceLine: 338, sourceColumn: 8, sourceEndLine: 338};
MATCH (a:KG {id: 'gfxdecode:gfx_pengo'}), (b:KG {id: 'gfxdecode:gfx_pengo/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_pengo'}), (b:KG {id: 'gfxdecode:gfx_pengo/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'machine:pengo_state.pengo/callback:mainlatch:0'}), (b:KG {id: 'handler:pengo_state.pengo_palettebank_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:pengo_state.pengo/callback:mainlatch:1'}), (b:KG {id: 'handler:pengo_state.coin_counter_w_0'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:pengo_state.pengo/callback:mainlatch:2'}), (b:KG {id: 'handler:pengo_state.coin_counter_w_1'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:pengo_state.pengo/callback:mainlatch:3'}), (b:KG {id: 'handler:pengo_state.pengo_colortablebank_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:pengo_state.pengo/callback:mainlatch:4'}), (b:KG {id: 'handler:pengo_state.pengo_gfxbank_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pacman.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pacman.cpp'}), (b:KG {id: 'file:pacman.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pacman.cpp'}), (b:KG {id: 'file:jumpshot.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pacman.cpp'}), (b:KG {id: 'file:pacplus.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pacman.cpp'}), (b:KG {id: 'file:cpu/s2650/s2650.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pacman.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pacman.cpp'}), (b:KG {id: 'file:machine/nvram.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pacman.cpp'}), (b:KG {id: 'file:sound/ay8910.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pacman.cpp'}), (b:KG {id: 'file:sound/sn76496.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pacman.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/pacman/pacman.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'handler:pacman_state.video_start_pacman'}), (b:KG {id: 'handler:pacman_state.init_save_state'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:pacman_state.video_start_pacman'}), (b:KG {id: 'handler:pacman_state.pacman_get_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:pacman_state.video_start_pacman'}), (b:KG {id: 'handler:pacman_state.pacman_scan_rows'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/maincpu'}), (b:KG {id: 'device:pacman_state.pacman/maincpu/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/maincpu'}), (b:KG {id: 'map:pacman_state.pacman_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:pacman_state.pacman/maincpu'}), (b:KG {id: 'map:pacman_state.writeport'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_IO'};
MATCH (a:KG {id: 'device:pacman_state.pacman/mainlatch'}), (b:KG {id: 'device:pacman_state.pacman/mainlatch/callback:mainlatch:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/mainlatch'}), (b:KG {id: 'device:pacman_state.pacman/mainlatch/callback:mainlatch:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/mainlatch'}), (b:KG {id: 'device:pacman_state.pacman/mainlatch/callback:mainlatch:2'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_pacman'}), (b:KG {id: 'file:src/mame/pacman/pacman.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 3668, sourceColumn: 8, sourceEndLine: 3668};
MATCH (a:KG {id: 'gfxdecode:gfx_pacman'}), (b:KG {id: 'gfxdecode:gfx_pacman/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_pacman'}), (b:KG {id: 'gfxdecode:gfx_pacman/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/screen'}), (b:KG {id: 'device:pacman_state.pacman/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/screen'}), (b:KG {id: 'device:pacman_state.pacman/screen/callback:screen:1'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/namco'}), (b:KG {id: 'audioroute:device:pacman_state.pacman/namco/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'map:pengo_state.pengo_map/range1'}), (b:KG {id: 'handler:pengo_state.pacman_videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:pengo_state.pengo_map/range2'}), (b:KG {id: 'handler:pengo_state.pacman_colorram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:pengo_state.pengo_map/range5'}), (b:KG {id: 'handler:namco_wsg_device.pacman_sound_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'namco'};
MATCH (a:KG {id: 'map:pengo_state.pengo_map/range9'}), (b:KG {id: 'handler:ls259_device.write_d0'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'mainlatch'};
MATCH (a:KG {id: 'map:pengo_state.pengo_map/range10'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'gfxdecode:gfx_pengo/e0'}), (b:KG {id: 'gfxlayout:tilelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_pengo/e1'}), (b:KG {id: 'gfxlayout:spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/maincpu/callback:maincpu:0'}), (b:KG {id: 'handler:pacman_state.interrupt_vector_r'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'file:src/mame/pacman/pacman.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1049, sourceColumn: 1, sourceEndLine: 1068};
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map'}), (b:KG {id: 'map:pacman_state.pacman_map/range15'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:pacman_state.writeport'}), (b:KG {id: 'file:src/mame/pacman/pacman.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/pacman/pacman.cpp', sourceLine: 1475, sourceColumn: 1, sourceEndLine: 1479};
MATCH (a:KG {id: 'map:pacman_state.writeport'}), (b:KG {id: 'map:pacman_state.writeport/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/mainlatch/callback:mainlatch:0'}), (b:KG {id: 'handler:pacman_state.irq_mask_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/mainlatch/callback:mainlatch:1'}), (b:KG {id: 'handler:namco_wsg_device.sound_enable_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/mainlatch/callback:mainlatch:2'}), (b:KG {id: 'handler:pacman_state.flipscreen_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_pacman/e0'}), (b:KG {id: 'gfxlayout:tilelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_pacman/e1'}), (b:KG {id: 'gfxlayout:spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/screen/callback:screen:0'}), (b:KG {id: 'handler:pacman_state.screen_update_pacman'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:pacman_state.pacman/screen/callback:screen:1'}), (b:KG {id: 'handler:pacman_state.vblank_irq'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:tilelayout'}), (b:KG {id: 'file:src/mame/pacman/pengo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:spritelayout'}), (b:KG {id: 'file:src/mame/pacman/pengo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map/range1'}), (b:KG {id: 'handler:pacman_state.pacman_videoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map/range2'}), (b:KG {id: 'handler:pacman_state.pacman_colorram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map/range3'}), (b:KG {id: 'handler:pacman_state.pacman_read_nop'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:pacman_state.pacman_map/range6'}), (b:KG {id: 'handler:ls259_device.write_d0'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'mainlatch'};
MATCH (a:KG {id: 'map:pacman_state.pacman_map/range7'}), (b:KG {id: 'handler:namco_wsg_device.pacman_sound_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'namco'};
MATCH (a:KG {id: 'map:pacman_state.pacman_map/range11'}), (b:KG {id: 'handler:watchdog_timer_device.reset_w'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'watchdog'};
MATCH (a:KG {id: 'map:pacman_state.writeport/range0'}), (b:KG {id: 'handler:pacman_state.pacman_interrupt_vector_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:pacman_state.screen_update_pacman'}), (b:KG {id: 'handler:pacman_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
