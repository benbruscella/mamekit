// mamekit knowledge graph — driver src/mame/universal/mrdo.cpp
// generated 2026-09-05T03:49:51.648Z
CREATE CONSTRAINT mamekit_id IF NOT EXISTS FOR (n:KG) REQUIRE n.id IS UNIQUE;
MERGE (n:KG {id: 'file:src/mame/universal/mrdo.cpp'}) SET n:SourceFile SET n += {path: 'src/mame/universal/mrdo.cpp'};
MERGE (n:KG {id: 'file:emu.h'}) SET n:SourceFile SET n += {path: 'emu.h', external: true};
MERGE (n:KG {id: 'file:mrdo.h'}) SET n:SourceFile SET n += {path: 'mrdo.h', external: true};
MERGE (n:KG {id: 'file:cpu/z80/z80.h'}) SET n:SourceFile SET n += {path: 'cpu/z80/z80.h', external: true};
MERGE (n:KG {id: 'file:sound/sn76496.h'}) SET n:SourceFile SET n += {path: 'sound/sn76496.h', external: true};
MERGE (n:KG {id: 'file:screen.h'}) SET n:SourceFile SET n += {path: 'screen.h', external: true};
MERGE (n:KG {id: 'file:speaker.h'}) SET n:SourceFile SET n += {path: 'speaker.h', external: true};
MERGE (n:KG {id: 'game:mrdo'}) SET n:Game SET n += {name: 'mrdo', year: '1982', company: 'Universal', fullname: 'Mr. Do!', monitor: 'ROT270', cls: 'mrdo_state', init: 'empty_init', flags: 'MACHINE_SUPPORTS_SAVE', kind: 'arcade', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 523, sourceColumn: 1, sourceEndLine: 523};
MERGE (n:KG {id: 'romset:mrdo'}) SET n:RomSet SET n += {name: 'mrdo', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 259, sourceColumn: 1, sourceEndLine: 259};
MERGE (n:KG {id: 'region:mrdo/maincpu'}) SET n:RomRegion SET n += {tag: 'maincpu', size: 65536, flags: '0', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 260, sourceColumn: 2, sourceEndLine: 260};
MERGE (n:KG {id: 'rom:mrdo/maincpu/a4-01.bin'}) SET n:Rom SET n += {file: 'a4-01.bin', offset: 0, size: 8192, crc: '03dcfba2', sha1: 'c15e3d0c4225e0ca120bcd28aca39632575f8e11', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 261, sourceColumn: 2, sourceEndLine: 261};
MERGE (n:KG {id: 'rom:mrdo/maincpu/c4-02.bin'}) SET n:Rom SET n += {file: 'c4-02.bin', offset: 8192, size: 8192, crc: '0ecdd39c', sha1: 'c64b3363593911a676c647bf3dba8fe063fcb0de', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 262, sourceColumn: 2, sourceEndLine: 262};
MERGE (n:KG {id: 'rom:mrdo/maincpu/e4-03.bin'}) SET n:Rom SET n += {file: 'e4-03.bin', offset: 16384, size: 8192, crc: '358f5dc2', sha1: '9fed1f5d1d04935d1b77687c8b2f3bfce970dc08', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 263, sourceColumn: 2, sourceEndLine: 263};
MERGE (n:KG {id: 'rom:mrdo/maincpu/f4-04.bin'}) SET n:Rom SET n += {file: 'f4-04.bin', offset: 24576, size: 8192, crc: 'f4190cfc', sha1: '24f5125d900f944294d4eda068b710c8f1c6d39f', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 264, sourceColumn: 2, sourceEndLine: 264};
MERGE (n:KG {id: 'region:mrdo/gfx1'}) SET n:RomRegion SET n += {tag: 'gfx1', size: 8192, flags: '0', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 266, sourceColumn: 2, sourceEndLine: 266};
MERGE (n:KG {id: 'rom:mrdo/gfx1/s8-09.bin'}) SET n:Rom SET n += {file: 's8-09.bin', offset: 0, size: 4096, crc: 'aa80c5b6', sha1: '76f9f90deb74598470e7ed565237da38dd07e4e9', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 267, sourceColumn: 2, sourceEndLine: 267};
MERGE (n:KG {id: 'rom:mrdo/gfx1/u8-10.bin'}) SET n:Rom SET n += {file: 'u8-10.bin', offset: 4096, size: 4096, crc: 'd20ec85b', sha1: '9762bbe34d3fa209ea719807c723f57cb6bf4e01', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 268, sourceColumn: 2, sourceEndLine: 268};
MERGE (n:KG {id: 'region:mrdo/gfx2'}) SET n:RomRegion SET n += {tag: 'gfx2', size: 8192, flags: '0', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 270, sourceColumn: 2, sourceEndLine: 270};
MERGE (n:KG {id: 'rom:mrdo/gfx2/r8-08.bin'}) SET n:Rom SET n += {file: 'r8-08.bin', offset: 0, size: 4096, crc: 'dbdc9ffa', sha1: '93f29fc106283eecbba3fd69cf3c4658aa38ab9f', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 271, sourceColumn: 2, sourceEndLine: 271};
MERGE (n:KG {id: 'rom:mrdo/gfx2/n8-07.bin'}) SET n:Rom SET n += {file: 'n8-07.bin', offset: 4096, size: 4096, crc: '4b9973db', sha1: '8766c51a345a5e63446e65614c6f665ab5fbe0d7', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 272, sourceColumn: 2, sourceEndLine: 272};
MERGE (n:KG {id: 'region:mrdo/gfx3'}) SET n:RomRegion SET n += {tag: 'gfx3', size: 8192, flags: '0', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 274, sourceColumn: 2, sourceEndLine: 274};
MERGE (n:KG {id: 'rom:mrdo/gfx3/h5-05.bin'}) SET n:Rom SET n += {file: 'h5-05.bin', offset: 0, size: 4096, crc: 'e1218cc5', sha1: 'd946613a1cf1c97f7533a4f8c2d0078d1b7daaa8', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 275, sourceColumn: 2, sourceEndLine: 275};
MERGE (n:KG {id: 'rom:mrdo/gfx3/k5-06.bin'}) SET n:Rom SET n += {file: 'k5-06.bin', offset: 4096, size: 4096, crc: 'b1f68b04', sha1: '25709cd81c03df51f27cd730fecf86a1daa9e27e', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 276, sourceColumn: 2, sourceEndLine: 276};
MERGE (n:KG {id: 'region:mrdo/proms'}) SET n:RomRegion SET n += {tag: 'proms', size: 128, flags: '0', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 278, sourceColumn: 2, sourceEndLine: 278};
MERGE (n:KG {id: 'rom:mrdo/proms/u02--2.bin'}) SET n:Rom SET n += {file: 'u02--2.bin', offset: 0, size: 32, crc: '238a65d7', sha1: 'a5b20184a1989db23544296331462ec4d7be7516', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 279, sourceColumn: 2, sourceEndLine: 279};
MERGE (n:KG {id: 'rom:mrdo/proms/t02--3.bin'}) SET n:Rom SET n += {file: 't02--3.bin', offset: 32, size: 32, crc: 'ae263dc0', sha1: '7072c100b9d692f5bb12b0c9e304425f534481e2', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 280, sourceColumn: 2, sourceEndLine: 280};
MERGE (n:KG {id: 'rom:mrdo/proms/f10--1.bin'}) SET n:Rom SET n += {file: 'f10--1.bin', offset: 64, size: 32, crc: '16ee4ca2', sha1: 'fcba4d103708b9711452009cd29c4f88d2f64cd3', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 281, sourceColumn: 2, sourceEndLine: 281};
MERGE (n:KG {id: 'rom:mrdo/proms/j10--4.bin'}) SET n:Rom SET n += {file: 'j10--4.bin', offset: 96, size: 32, crc: 'ff7fe284', sha1: '3ac8e30011c1fcba0ee8f4dc932f82296c3ba143', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 282, sourceColumn: 2, sourceEndLine: 282};
MERGE (n:KG {id: 'region:mrdo/pal16r6'}) SET n:RomRegion SET n += {tag: 'pal16r6', size: 512, flags: '0', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 284, sourceColumn: 2, sourceEndLine: 284};
MERGE (n:KG {id: 'rom:mrdo/pal16r6/u001_pal16r6cn.j2'}) SET n:Rom SET n += {file: 'u001_pal16r6cn.j2', offset: 0, size: 260, crc: '84dbe498', sha1: '5863342b2db85ffef31b5e9ce26bfd8fca9923b0', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 285, sourceColumn: 2, sourceEndLine: 285};
MERGE (n:KG {id: 'map:mrdo_state.main_map'}) SET n:AddressMap SET n += {cls: 'mrdo_state', name: 'main_map', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 96, sourceColumn: 1, sourceEndLine: 113};
MERGE (n:KG {id: 'map:mrdo_state.main_map/range0'}) SET n:AddressRange SET n += {start: 0, end: 32767, raw: 'map(0x0000, 0x7fff).rom()', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 98, sourceColumn: 2, sourceEndLine: 98, rom: true};
MERGE (n:KG {id: 'map:mrdo_state.main_map/range1'}) SET n:AddressRange SET n += {start: 32768, end: 34815, raw: 'map(0x8000, 0x87ff).ram().w(FUNC(mrdo_state::bgvideoram_w)).share("bgvideoram")', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 99, sourceColumn: 2, sourceEndLine: 99, ram: true, share: 'bgvideoram'};
MERGE (n:KG {id: 'handler:mrdo_state.bgvideoram_w'}) SET n:Handler SET n += {method: 'bgvideoram_w', ownerClass: 'mrdo_state', sourceFile: 'src/mame/universal/mrdo_v.cpp', sourceLine: 182, sourceColumn: 1, sourceEndLine: 186, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_bgvideoram[offset] = data;
	m_bg_tilemap->mark_tile_dirty(offset & 0x3ff);'};
MERGE (n:KG {id: 'map:mrdo_state.main_map/range2'}) SET n:AddressRange SET n += {start: 34816, end: 36863, raw: 'map(0x8800, 0x8fff).ram().w(FUNC(mrdo_state::fgvideoram_w)).share("fgvideoram")', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 100, sourceColumn: 2, sourceEndLine: 100, ram: true, share: 'fgvideoram'};
MERGE (n:KG {id: 'handler:mrdo_state.fgvideoram_w'}) SET n:Handler SET n += {method: 'fgvideoram_w', ownerClass: 'mrdo_state', sourceFile: 'src/mame/universal/mrdo_v.cpp', sourceLine: 188, sourceColumn: 1, sourceEndLine: 194, sourceParameters: 'offs_t offset, uint8_t data', sourceBody: 'm_fgvideoram[offset] = data;
	m_fg_tilemap->mark_tile_dirty(offset & 0x3ff);

	protection_w(data);'};
MERGE (n:KG {id: 'handler:mrdo_state.protection_w'}) SET n:Handler SET n += {method: 'protection_w', ownerClass: 'mrdo_state', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 80, sourceColumn: 1, sourceEndLine: 86, sourceParameters: 'uint8_t data', sourceBody: '// protection via U001 (PAL16R6), but not as simple as the Taito version,
	// it appears that m_pal_u001 outputs are fed back to inputs. The game
	// won\'t work properly after the EXTRA reward when using the Taito protection.
	// Notably, the Taito version NOPped out the EXTRA protection check.'};
MERGE (n:KG {id: 'map:mrdo_state.main_map/range3'}) SET n:AddressRange SET n += {start: 36864, end: 37119, raw: 'map(0x9000, 0x90ff).writeonly().share("spriteram")', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 101, sourceColumn: 2, sourceEndLine: 101, writeonly: true, share: 'spriteram'};
MERGE (n:KG {id: 'map:mrdo_state.main_map/range4'}) SET n:AddressRange SET n += {start: 38912, end: 38912, raw: 'map(0x9800, 0x9800).w(FUNC(mrdo_state::flipscreen_w))', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 102, sourceColumn: 2, sourceEndLine: 102};
MERGE (n:KG {id: 'handler:mrdo_state.flipscreen_w'}) SET n:Handler SET n += {method: 'flipscreen_w', ownerClass: 'mrdo_state', sourceFile: 'src/mame/universal/mrdo_v.cpp', sourceLine: 211, sourceColumn: 1, sourceEndLine: 217, sourceParameters: 'uint8_t data', sourceBody: '/* bits 1-3 control the playfield priority, but they are not used by */
	/* Mr. Do! so we don\'t emulate them */
	m_flipscreen = data & 0x01;
	machine().tilemap().set_flip_all(m_flipscreen ? (TILEMAP_FLIPY | TILEMAP_FLIPX) : 0);'};
MERGE (n:KG {id: 'map:mrdo_state.main_map/range5'}) SET n:AddressRange SET n += {start: 38913, end: 38913, raw: 'map(0x9801, 0x9801).w("sn1", FUNC(sn76489_device::write))', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 103, sourceColumn: 2, sourceEndLine: 103};
MERGE (n:KG {id: 'handler:sn76489_device.write'}) SET n:Handler SET n += {method: 'write', ownerClass: 'sn76489_device', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 104, sourceColumn: 2, sourceEndLine: 104};
MERGE (n:KG {id: 'map:mrdo_state.main_map/range6'}) SET n:AddressRange SET n += {start: 38914, end: 38914, raw: 'map(0x9802, 0x9802).w("sn2", FUNC(sn76489_device::write))', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 104, sourceColumn: 2, sourceEndLine: 104};
MERGE (n:KG {id: 'map:mrdo_state.main_map/range7'}) SET n:AddressRange SET n += {start: 38915, end: 38915, raw: 'map(0x9803, 0x9803).r(FUNC(mrdo_state::protection_r))', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 105, sourceColumn: 2, sourceEndLine: 105};
MERGE (n:KG {id: 'handler:mrdo_state.protection_r'}) SET n:Handler SET n += {method: 'protection_r', ownerClass: 'mrdo_state', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 88, sourceColumn: 1, sourceEndLine: 93, sourceConstants: ['Z80_HL=13'], sourceParameters: '', sourceBody: '// HACK: workaround until accurate PAL emulation
	uint8_t *ROM = memregion("maincpu")->base();
	return ROM[m_maincpu->state_int(Z80_HL)];'};
MERGE (n:KG {id: 'map:mrdo_state.main_map/range8'}) SET n:AddressRange SET n += {start: 40960, end: 40960, raw: 'map(0xa000, 0xa000).portr("P1")', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 106, sourceColumn: 2, sourceEndLine: 106, portRead: 'P1'};
MERGE (n:KG {id: 'map:mrdo_state.main_map/range9'}) SET n:AddressRange SET n += {start: 40961, end: 40961, raw: 'map(0xa001, 0xa001).portr("P2")', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 107, sourceColumn: 2, sourceEndLine: 107, portRead: 'P2'};
MERGE (n:KG {id: 'map:mrdo_state.main_map/range10'}) SET n:AddressRange SET n += {start: 40962, end: 40962, raw: 'map(0xa002, 0xa002).portr("DSW1")', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 108, sourceColumn: 2, sourceEndLine: 108, portRead: 'DSW1'};
MERGE (n:KG {id: 'map:mrdo_state.main_map/range11'}) SET n:AddressRange SET n += {start: 40963, end: 40963, raw: 'map(0xa003, 0xa003).portr("DSW2")', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 109, sourceColumn: 2, sourceEndLine: 109, portRead: 'DSW2'};
MERGE (n:KG {id: 'map:mrdo_state.main_map/range12'}) SET n:AddressRange SET n += {start: 57344, end: 61439, raw: 'map(0xe000, 0xefff).ram()', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 110, sourceColumn: 2, sourceEndLine: 110, ram: true};
MERGE (n:KG {id: 'map:mrdo_state.main_map/range13'}) SET n:AddressRange SET n += {start: 61440, end: 63487, raw: 'map(0xf000, 0xf7ff).w(FUNC(mrdo_state::scrollx_w))', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 111, sourceColumn: 2, sourceEndLine: 111};
MERGE (n:KG {id: 'handler:mrdo_state.scrollx_w'}) SET n:Handler SET n += {method: 'scrollx_w', ownerClass: 'mrdo_state', sourceFile: 'src/mame/universal/mrdo_v.cpp', sourceLine: 196, sourceColumn: 1, sourceEndLine: 199, sourceParameters: 'uint8_t data', sourceBody: 'm_bg_tilemap->set_scrollx(0, data);'};
MERGE (n:KG {id: 'map:mrdo_state.main_map/range14'}) SET n:AddressRange SET n += {start: 63488, end: 65535, raw: 'map(0xf800, 0xffff).w(FUNC(mrdo_state::scrolly_w))', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 112, sourceColumn: 2, sourceEndLine: 112};
MERGE (n:KG {id: 'handler:mrdo_state.scrolly_w'}) SET n:Handler SET n += {method: 'scrolly_w', ownerClass: 'mrdo_state', sourceFile: 'src/mame/universal/mrdo_v.cpp', sourceLine: 201, sourceColumn: 1, sourceEndLine: 208, sourceParameters: 'uint8_t data', sourceBody: '/* This is NOT affected by flipscreen (so stop it happening) */
	if (m_flipscreen)
		m_bg_tilemap->set_scrolly(0,((256 - data) & 0xff));
	else
		m_bg_tilemap->set_scrolly(0, data);'};
MERGE (n:KG {id: 'machine:mrdo_state.mrdo'}) SET n:MachineConfig SET n += {cls: 'mrdo_state', name: 'mrdo', calls: [], stateMembers: ['{"name":"m_pal_u001","bits":8}', '{"name":"m_flipscreen","bits":32,"signed":true}'], resetHandlers: ['mrdo_state.machine_reset'], startHandlers: ['mrdo_state.video_start'], sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 221, sourceColumn: 1, sourceEndLine: 242};
MERGE (n:KG {id: 'handler:mrdo_state.machine_reset'}) SET n:Handler SET n += {method: 'machine_reset', ownerClass: 'mrdo_state', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 39, sourceColumn: 1, sourceEndLine: 43, sourceParameters: '', sourceBody: '// initial outputs are high on power-up
	m_pal_u001 = 0xff;'};
MERGE (n:KG {id: 'handler:mrdo_state.video_start'}) SET n:Handler SET n += {method: 'video_start', ownerClass: 'mrdo_state', sourceFile: 'src/mame/universal/mrdo_v.cpp', sourceLine: 161, sourceColumn: 1, sourceEndLine: 172, sourceParameters: '', sourceBody: 'm_bg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(mrdo_state::get_bg_tile_info)), TILEMAP_SCAN_ROWS, 8,8, 32,32);
	m_fg_tilemap = &machine().tilemap().create(*m_gfxdecode, tilemap_get_info_delegate(*this, FUNC(mrdo_state::get_fg_tile_info)), TILEMAP_SCAN_ROWS, 8,8, 32,32);

	m_bg_tilemap->set_transparent_pen(0);
	m_fg_tilemap->set_transparent_pen(0);

	m_flipscreen = 0;

	save_item(NAME(m_flipscreen));'};
MERGE (n:KG {id: 'handler:mrdo_state.get_bg_tile_info'}) SET n:Handler SET n += {method: 'get_bg_tile_info', ownerClass: 'mrdo_state', sourceFile: 'src/mame/universal/mrdo_v.cpp', sourceLine: 135, sourceColumn: 1, sourceEndLine: 142, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'uint8_t attr = m_bgvideoram[tile_index];
	tileinfo.set(1,
			m_bgvideoram[tile_index + 0x400] + ((attr & 0x80) << 1),
			attr & 0x3f,
			(attr & 0x40) ? TILE_FORCE_LAYER0 : 0);'};
MERGE (n:KG {id: 'handler:mrdo_state.get_fg_tile_info'}) SET n:Handler SET n += {method: 'get_fg_tile_info', ownerClass: 'mrdo_state', sourceFile: 'src/mame/universal/mrdo_v.cpp', sourceLine: 144, sourceColumn: 1, sourceEndLine: 151, sourceParameters: 'tilemap_t &tilemap, tile_data &tileinfo, tilemap_memory_index tile_index', sourceBody: 'uint8_t attr = m_fgvideoram[tile_index];
	tileinfo.set(0,
			m_fgvideoram[tile_index+0x400] + ((attr & 0x80) << 1),
			attr & 0x3f,
			(attr & 0x40) ? TILE_FORCE_LAYER0 : 0);'};
MERGE (n:KG {id: 'device:mrdo_state.mrdo/maincpu'}) SET n:Device SET n += {type: 'Z80', tag: 'maincpu', clock: 4100000, config: ['Z80(config, m_maincpu, 8.2_MHz_XTAL/2)', 'm_maincpu->set_addrmap(AS_PROGRAM, &mrdo_state::main_map)', 'm_maincpu->set_vblank_int("screen", FUNC(mrdo_state::irq0_line_hold))'], sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 224, sourceColumn: 2, sourceEndLine: 224};
MERGE (n:KG {id: 'device:mrdo_state.mrdo/maincpu/callback:maincpu:0'}) SET n:Callback SET n += {signal: 'set_vblank_int', operation: 'set_vblank_int', raw: 'm_maincpu->set_vblank_int("screen", FUNC(mrdo_state::irq0_line_hold))', ownerTag: 'maincpu', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 226, sourceColumn: 2, sourceEndLine: 226, targetTag: 'screen', targetClass: 'mrdo_state', targetMethod: 'irq0_line_hold'};
MERGE (n:KG {id: 'handler:mrdo_state.irq0_line_hold'}) SET n:Handler SET n += {method: 'irq0_line_hold', ownerClass: 'mrdo_state', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 226, sourceColumn: 2, sourceEndLine: 226};
MERGE (n:KG {id: 'device:mrdo_state.mrdo/screen'}) SET n:Device SET n += {type: 'SCREEN', tag: 'screen', clock: null, config: ['screen_device &screen(SCREEN(config, "screen", SCREEN_TYPE_RASTER))', 'screen.set_raw(19.6_MHz_XTAL/4, 312, 8, 248, 262, 32, 224)', 'screen.set_screen_update(FUNC(mrdo_state::screen_update_mrdo))', 'screen.set_palette(m_palette)'], sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 229, sourceColumn: 2, sourceEndLine: 229, configCalls: ['set_raw(4900000,312,8,248,262,32,224)'], clockExpr: 'SCREEN_TYPE_RASTER', screenRaw: [4900000, 312, 8, 248, 262, 32, 224], screenRawExpr: ['19.6_MHz_XTAL/4', '312', '8', '248', '262', '32', '224']};
MERGE (n:KG {id: 'device:mrdo_state.mrdo/screen/callback:screen:0'}) SET n:Callback SET n += {signal: 'set_screen_update', operation: 'set_screen_update', raw: 'screen.set_screen_update(FUNC(mrdo_state::screen_update_mrdo))', ownerTag: 'screen', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 231, sourceColumn: 2, sourceEndLine: 231, targetClass: 'mrdo_state', targetMethod: 'screen_update_mrdo'};
MERGE (n:KG {id: 'handler:mrdo_state.screen_update_mrdo'}) SET n:Handler SET n += {method: 'screen_update_mrdo', ownerClass: 'mrdo_state', sourceFile: 'src/mame/universal/mrdo_v.cpp', sourceLine: 241, sourceColumn: 1, sourceEndLine: 248, sourceParameters: 'screen_device &screen, bitmap_ind16 &bitmap, const rectangle &cliprect', sourceBody: 'bitmap.fill(0, cliprect);
	m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0);
	m_fg_tilemap->draw(screen, bitmap, cliprect, 0, 0);
	draw_sprites(bitmap, cliprect);
	return 0;'};
MERGE (n:KG {id: 'handler:mrdo_state.draw_sprites'}) SET n:Handler SET n += {method: 'draw_sprites', ownerClass: 'mrdo_state', sourceFile: 'src/mame/universal/mrdo_v.cpp', sourceLine: 227, sourceColumn: 1, sourceEndLine: 239, sourceParameters: 'bitmap_ind16 &bitmap,const rectangle &cliprect', sourceBody: 'for (int offs = m_spriteram.bytes() - 4; offs >= 0; offs -= 4)
	{
		if (m_spriteram[offs + 1] != 0)
		{
			m_gfxdecode->gfx(2)->transpen(bitmap,cliprect,
					m_spriteram[offs], m_spriteram[offs + 2] & 0x0f,
					m_spriteram[offs + 2] & 0x10, m_spriteram[offs + 2] & 0x20,
					m_spriteram[offs + 3], 256 - m_spriteram[offs + 1], 0);
		}
	}'};
MERGE (n:KG {id: 'device:mrdo_state.mrdo/gfxdecode'}) SET n:Device SET n += {type: 'GFXDECODE', tag: 'gfxdecode', clock: null, config: ['GFXDECODE(config, m_gfxdecode, m_palette, gfx_mrdo)'], sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 234, sourceColumn: 2, sourceEndLine: 234, clockExpr: 'm_palette'};
MERGE (n:KG {id: 'device:mrdo_state.mrdo/palette'}) SET n:Device SET n += {type: 'PALETTE', tag: 'palette', clock: null, config: ['PALETTE(config, m_palette, FUNC(mrdo_state::palette_init), 64*4 + 16*4, 256)'], sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 235, sourceColumn: 2, sourceEndLine: 235, clockExpr: 'FUNC(mrdo_state::palette_init)'};
MERGE (n:KG {id: 'device:mrdo_state.mrdo/mono'}) SET n:Device SET n += {type: 'SPEAKER', tag: 'mono', clock: null, config: ['SPEAKER(config, "mono").front_center()'], sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 238, sourceColumn: 2, sourceEndLine: 238};
MERGE (n:KG {id: 'device:mrdo_state.mrdo/sn1'}) SET n:Device SET n += {type: 'SN76489', tag: 'sn1', clock: 4100000, config: ['SN76489(config, "sn1", 8.2_MHz_XTAL/2).add_route(ALL_OUTPUTS, "mono", 0.50)'], sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 240, sourceColumn: 2, sourceEndLine: 240};
MERGE (n:KG {id: 'audioroute:device:mrdo_state.mrdo/sn1/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.5, raw: 'SN76489(config, "sn1", 8.2_MHz_XTAL/2).add_route(ALL_OUTPUTS, "mono", 0.50)', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 240, sourceColumn: 2, sourceEndLine: 240};
MERGE (n:KG {id: 'device:mrdo_state.mrdo/sn2'}) SET n:Device SET n += {type: 'SN76489', tag: 'sn2', clock: 4100000, config: ['SN76489(config, "sn2", 8.2_MHz_XTAL/2).add_route(ALL_OUTPUTS, "mono", 0.50)'], sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 241, sourceColumn: 2, sourceEndLine: 241};
MERGE (n:KG {id: 'audioroute:device:mrdo_state.mrdo/sn2/0'}) SET n:AudioRoute SET n += {output: 'ALL_OUTPUTS', target: 'mono', gain: 0.5, raw: 'SN76489(config, "sn2", 8.2_MHz_XTAL/2).add_route(ALL_OUTPUTS, "mono", 0.50)', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 241, sourceColumn: 2, sourceEndLine: 241};
MERGE (n:KG {id: 'inputs:mrdo'}) SET n:InputPorts SET n += {name: 'mrdo', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 116, sourceColumn: 8, sourceEndLine: 116};
MERGE (n:KG {id: 'inputs:mrdo/P1'}) SET n:Port SET n += {tag: 'P1', modify: false};
MERGE (n:KG {id: 'inputs:mrdo/P1/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:mrdo/P1/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:mrdo/P1/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:mrdo/P1/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:mrdo/P1/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', defaultValue: 16};
MERGE (n:KG {id: 'inputs:mrdo/P1/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_START1', defaultValue: 32};
MERGE (n:KG {id: 'inputs:mrdo/P1/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_START2', defaultValue: 64};
MERGE (n:KG {id: 'inputs:mrdo/P1/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_TILT', defaultValue: 128};
MERGE (n:KG {id: 'inputs:mrdo/P2'}) SET n:Port SET n += {tag: 'P2', modify: false};
MERGE (n:KG {id: 'inputs:mrdo/P2/f0'}) SET n:PortField SET n += {kind: 'bit', mask: 1, activeLow: true, type: 'IPT_JOYSTICK_LEFT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 1};
MERGE (n:KG {id: 'inputs:mrdo/P2/f1'}) SET n:PortField SET n += {kind: 'bit', mask: 2, activeLow: true, type: 'IPT_JOYSTICK_DOWN', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 2};
MERGE (n:KG {id: 'inputs:mrdo/P2/f2'}) SET n:PortField SET n += {kind: 'bit', mask: 4, activeLow: true, type: 'IPT_JOYSTICK_RIGHT', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 4};
MERGE (n:KG {id: 'inputs:mrdo/P2/f3'}) SET n:PortField SET n += {kind: 'bit', mask: 8, activeLow: true, type: 'IPT_JOYSTICK_UP', modifiers: ['PORT_4WAY', 'PORT_COCKTAIL'], defaultValue: 8};
MERGE (n:KG {id: 'inputs:mrdo/P2/f4'}) SET n:PortField SET n += {kind: 'bit', mask: 16, activeLow: true, type: 'IPT_BUTTON1', modifiers: ['PORT_COCKTAIL'], defaultValue: 16};
MERGE (n:KG {id: 'inputs:mrdo/P2/f5'}) SET n:PortField SET n += {kind: 'bit', mask: 32, activeLow: true, type: 'IPT_UNUSED', defaultValue: 32};
MERGE (n:KG {id: 'inputs:mrdo/P2/f6'}) SET n:PortField SET n += {kind: 'bit', mask: 64, activeLow: true, type: 'IPT_COIN1', defaultValue: 64};
MERGE (n:KG {id: 'inputs:mrdo/P2/f7'}) SET n:PortField SET n += {kind: 'bit', mask: 128, activeLow: true, type: 'IPT_COIN2', defaultValue: 128};
MERGE (n:KG {id: 'inputs:mrdo/DSW1'}) SET n:Port SET n += {tag: 'DSW1', modify: false};
MERGE (n:KG {id: 'inputs:mrdo/DSW1/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 3, modifiers: ['PORT_DIPLOCATION("SW1:8,7")'], name: 'Difficulty', defaultValue: 3, location: 'SW1:8,7', settings: ['3=Easy', '2=Medium', '1=Hard', '0=Hardest']};
MERGE (n:KG {id: 'inputs:mrdo/DSW1/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 4, modifiers: ['PORT_CODE(KEYCODE_F1)', 'PORT_DIPLOCATION("SW1:6")'], name: 'Rack Test (Cheat)', defaultValue: 4, location: 'SW1:6', settings: ['4=Off', '0=On']};
MERGE (n:KG {id: 'inputs:mrdo/DSW1/f2'}) SET n:PortField SET n += {kind: 'dip', mask: 8, modifiers: ['PORT_DIPLOCATION("SW1:5")'], name: 'Special', defaultValue: 8, location: 'SW1:5', settings: ['8=Easy', '0=Hard']};
MERGE (n:KG {id: 'inputs:mrdo/DSW1/f3'}) SET n:PortField SET n += {kind: 'dip', mask: 16, modifiers: ['PORT_DIPLOCATION("SW1:4")'], name: 'Extra', defaultValue: 16, location: 'SW1:4', settings: ['16=Easy', '0=Hard']};
MERGE (n:KG {id: 'inputs:mrdo/DSW1/f4'}) SET n:PortField SET n += {kind: 'dip', mask: 32, modifiers: ['PORT_DIPLOCATION("SW1:3")'], name: 'Cabinet', defaultValue: 0, location: 'SW1:3', settings: ['0=Upright', '32=Cocktail']};
MERGE (n:KG {id: 'inputs:mrdo/DSW1/f5'}) SET n:PortField SET n += {kind: 'dip', mask: 192, modifiers: ['PORT_DIPLOCATION("SW1:2,1")'], name: 'Lives', defaultValue: 192, location: 'SW1:2,1', settings: ['0=2', '192=3', '128=4', '64=5']};
MERGE (n:KG {id: 'inputs:mrdo/DSW2'}) SET n:Port SET n += {tag: 'DSW2', modify: false};
MERGE (n:KG {id: 'inputs:mrdo/DSW2/f0'}) SET n:PortField SET n += {kind: 'dip', mask: 15, modifiers: ['PORT_DIPLOCATION("SW2:8,7,6,5")'], name: 'Coin B', defaultValue: 15, location: 'SW2:8,7,6,5', settings: ['6=4C 1C', '8=3C 1C', '10=2C 1C', '7=3C 2C', '15=1C 1C', '9=2C 3C', '14=1C 2C', '13=1C 3C', '12=1C 4C', '11=1C 5C', '0=Free Play']};
MERGE (n:KG {id: 'inputs:mrdo/DSW2/f1'}) SET n:PortField SET n += {kind: 'dip', mask: 240, modifiers: ['PORT_DIPLOCATION("SW2:4,3,2,1")'], name: 'Coin A', defaultValue: 240, location: 'SW2:4,3,2,1', settings: ['96=4C 1C', '128=3C 1C', '160=2C 1C', '112=3C 2C', '240=1C 1C', '144=2C 3C', '224=1C 2C', '208=1C 3C', '192=1C 4C', '176=1C 5C', '0=Free Play']};
MERGE (n:KG {id: 'gfxlayout:charlayout'}) SET n:GfxLayout SET n += {name: 'charlayout', width: 8, height: 8, total: 'RGN_FRAC(1,2)', planes: 2, planeOffsets: ['RGN_FRAC(0,2)', 'RGN_FRAC(1,2)'], xOffsets: [7, 6, 5, 4, 3, 2, 1, 0], yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], charIncrement: 64};
MERGE (n:KG {id: 'gfxlayout:spritelayout'}) SET n:GfxLayout SET n += {name: 'spritelayout', width: 16, height: 16, total: 'RGN_FRAC(1,1)', planes: 2, planeOffsets: [4, 0], xOffsets: [3, 2, 1, 0, 11, 10, 9, 8, 19, 18, 17, 16, 27, 26, 25, 24], yOffsets: [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 480], charIncrement: 512};
MERGE (n:KG {id: 'gfxdecode:gfx_mrdo'}) SET n:GfxDecode SET n += {name: 'gfx_mrdo', sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 214, sourceColumn: 8, sourceEndLine: 214};
MERGE (n:KG {id: 'gfxdecode:gfx_mrdo/e0'}) SET n:GfxDecodeEntry SET n += {region: 'gfx1', offset: 0, layout: 'charlayout', colorBase: 0, colorCount: 64, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_mrdo/e1'}) SET n:GfxDecodeEntry SET n += {region: 'gfx2', offset: 0, layout: 'charlayout', colorBase: 0, colorCount: 64, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'gfxdecode:gfx_mrdo/e2'}) SET n:GfxDecodeEntry SET n += {region: 'gfx3', offset: 0, layout: 'spritelayout', colorBase: 256, colorCount: 16, xscale: 1, yscale: 1};
MERGE (n:KG {id: 'device:mrdo_state.mrdo/palette/callback:palette_init'}) SET n:Callback SET n += {signal: 'palette_init', operation: 'palette_init', raw: 'PALETTE(config, m_palette, FUNC(mrdo_state::palette_init), 64*4 + 16*4, 256)', ownerTag: 'palette', targetClass: 'mrdo_state', targetMethod: 'palette_init', entries: 256, sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 235};
MERGE (n:KG {id: 'handler:mrdo_state.palette_init'}) SET n:Handler SET n += {method: 'palette_init', ownerClass: 'mrdo_state', sourceFile: 'src/mame/universal/mrdo_v.cpp', sourceLine: 47, sourceColumn: 1, sourceEndLine: 125, sourceConstants: ['R1=150', 'R2=120', 'R3=100', 'R4=75', 'pull=220'], sourceParameters: 'palette_device &palette', sourceBody: 'constexpr int R1 = 150;
	constexpr int R2 = 120;
	constexpr int R3 = 100;
	constexpr int R4 = 75;
	constexpr int pull = 220;
	constexpr float potadjust = 0.7f;   /* diode voltage drop */

	float pot[16];
	int weight[16];
	for (int i = 0x0f; i >= 0; i--)
	{
		float par = 0;

		if (i & 1) par += 1.0f / float(R1);
		if (i & 2) par += 1.0f / float(R2);
		if (i & 4) par += 1.0f / float(R3);
		if (i & 8) par += 1.0f / float(R4);
		if (par)
		{
			par = 1 / par;
			pot[i] = pull/(pull+par) - potadjust;
		}
		else
			pot[i] = 0;

		weight[i] = 0xff * pot[i] / pot[0x0f];
		if (weight[i] < 0)
			weight[i] = 0;
	}

	const uint8_t *color_prom = memregion("proms")->base();

	for (int i = 0; i < 0x100; i++)
	{
		int bits0, bits2;

		int const a1 = ((i >> 3) & 0x1c) + (i & 0x03) + 0x20;
		int const a2 = ((i >> 0) & 0x1c) + (i & 0x03);

		// red component
		bits0 = (color_prom[a1] >> 0) & 0x03;
		bits2 = (color_prom[a2] >> 0) & 0x03;
		int const r = weight[bits0 + (bits2 << 2)];

		// green component
		bits0 = (color_prom[a1] >> 2) & 0x03;
		bits2 = (color_prom[a2] >> 2) & 0x03;
		int const g = weight[bits0 + (bits2 << 2)];

		// blue component
		bits0 = (color_prom[a1] >> 4) & 0x03;
		bits2 = (color_prom[a2] >> 4) & 0x03;
		int const b = weight[bits0 + (bits2 << 2)];

		palette.set_indirect_color(i, rgb_t(r, g, b));
	}

	// color_prom now points to the beginning of the lookup table
	color_prom += 0x40;

	// characters
	for (int i = 0; i < 0x100; i++)
		palette.set_pen_indirect(i, i);

	// sprites
	for (int i = 0; i < 0x40; i++)
	{
		uint8_t ctabentry = color_prom[i & 0x1f];

		if (i & 0x20)
			ctabentry >>= 4;    // high 4 bits are for sprite color n + 8
		else
			ctabentry &= 0x0f;  // low 4 bits are for sprite color n

		palette.set_pen_indirect(i + 0x100, ctabentry + ((ctabentry & 0x0c) << 3));
	}'};
MATCH (a:KG {id: 'game:mrdo'}), (b:KG {id: 'file:src/mame/universal/mrdo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 523, sourceColumn: 1, sourceEndLine: 523};
MATCH (a:KG {id: 'game:mrdo'}), (b:KG {id: 'machine:mrdo_state.mrdo'}) MERGE (a)-[r:USES_MACHINE]->(b);
MATCH (a:KG {id: 'game:mrdo'}), (b:KG {id: 'inputs:mrdo'}) MERGE (a)-[r:USES_INPUTS]->(b);
MATCH (a:KG {id: 'game:mrdo'}), (b:KG {id: 'romset:mrdo'}) MERGE (a)-[r:USES_ROMSET]->(b);
MATCH (a:KG {id: 'file:src/mame/universal/mrdo.cpp'}), (b:KG {id: 'file:emu.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/universal/mrdo.cpp'}), (b:KG {id: 'file:mrdo.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/universal/mrdo.cpp'}), (b:KG {id: 'file:cpu/z80/z80.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/universal/mrdo.cpp'}), (b:KG {id: 'file:sound/sn76496.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/universal/mrdo.cpp'}), (b:KG {id: 'file:screen.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'file:src/mame/universal/mrdo.cpp'}), (b:KG {id: 'file:speaker.h'}) MERGE (a)-[r:INCLUDES]->(b);
MATCH (a:KG {id: 'machine:mrdo_state.mrdo'}), (b:KG {id: 'file:src/mame/universal/mrdo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 221, sourceColumn: 1, sourceEndLine: 242};
MATCH (a:KG {id: 'machine:mrdo_state.mrdo'}), (b:KG {id: 'handler:mrdo_state.machine_reset'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mrdo_state.mrdo'}), (b:KG {id: 'handler:mrdo_state.video_start'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'machine:mrdo_state.mrdo'}), (b:KG {id: 'device:mrdo_state.mrdo/maincpu'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mrdo_state.mrdo'}), (b:KG {id: 'device:mrdo_state.mrdo/screen'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mrdo_state.mrdo'}), (b:KG {id: 'device:mrdo_state.mrdo/gfxdecode'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mrdo_state.mrdo'}), (b:KG {id: 'gfxdecode:gfx_mrdo'}) MERGE (a)-[r:DECODES]->(b) SET r += {deviceTag: 'gfxdecode'};
MATCH (a:KG {id: 'machine:mrdo_state.mrdo'}), (b:KG {id: 'device:mrdo_state.mrdo/palette'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mrdo_state.mrdo'}), (b:KG {id: 'device:mrdo_state.mrdo/mono'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mrdo_state.mrdo'}), (b:KG {id: 'device:mrdo_state.mrdo/sn1'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'machine:mrdo_state.mrdo'}), (b:KG {id: 'device:mrdo_state.mrdo/sn2'}) MERGE (a)-[r:HAS_DEVICE]->(b);
MATCH (a:KG {id: 'inputs:mrdo'}), (b:KG {id: 'file:src/mame/universal/mrdo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 116, sourceColumn: 8, sourceEndLine: 116};
MATCH (a:KG {id: 'inputs:mrdo'}), (b:KG {id: 'inputs:mrdo/P1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:mrdo'}), (b:KG {id: 'inputs:mrdo/P2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:mrdo'}), (b:KG {id: 'inputs:mrdo/DSW1'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'inputs:mrdo'}), (b:KG {id: 'inputs:mrdo/DSW2'}) MERGE (a)-[r:HAS_PORT]->(b);
MATCH (a:KG {id: 'romset:mrdo'}), (b:KG {id: 'file:src/mame/universal/mrdo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 259, sourceColumn: 1, sourceEndLine: 259};
MATCH (a:KG {id: 'romset:mrdo'}), (b:KG {id: 'region:mrdo/maincpu'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mrdo'}), (b:KG {id: 'region:mrdo/gfx1'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mrdo'}), (b:KG {id: 'region:mrdo/gfx2'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mrdo'}), (b:KG {id: 'region:mrdo/gfx3'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mrdo'}), (b:KG {id: 'region:mrdo/proms'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'romset:mrdo'}), (b:KG {id: 'region:mrdo/pal16r6'}) MERGE (a)-[r:HAS_REGION]->(b);
MATCH (a:KG {id: 'handler:mrdo_state.video_start'}), (b:KG {id: 'handler:mrdo_state.get_bg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'handler:mrdo_state.video_start'}), (b:KG {id: 'handler:mrdo_state.get_fg_tile_info'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'device:mrdo_state.mrdo/maincpu'}), (b:KG {id: 'device:mrdo_state.mrdo/maincpu/callback:maincpu:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mrdo_state.mrdo/maincpu'}), (b:KG {id: 'map:mrdo_state.main_map'}) MERGE (a)-[r:HAS_MAP]->(b) SET r += {space: 'AS_PROGRAM'};
MATCH (a:KG {id: 'device:mrdo_state.mrdo/screen'}), (b:KG {id: 'device:mrdo_state.mrdo/screen/callback:screen:0'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_mrdo'}), (b:KG {id: 'file:src/mame/universal/mrdo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 214, sourceColumn: 8, sourceEndLine: 214};
MATCH (a:KG {id: 'gfxdecode:gfx_mrdo'}), (b:KG {id: 'gfxdecode:gfx_mrdo/e0'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_mrdo'}), (b:KG {id: 'gfxdecode:gfx_mrdo/e1'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_mrdo'}), (b:KG {id: 'gfxdecode:gfx_mrdo/e2'}) MERGE (a)-[r:HAS_ENTRY]->(b);
MATCH (a:KG {id: 'device:mrdo_state.mrdo/palette'}), (b:KG {id: 'device:mrdo_state.mrdo/palette/callback:palette_init'}) MERGE (a)-[r:HAS_CALLBACK]->(b);
MATCH (a:KG {id: 'device:mrdo_state.mrdo/sn1'}), (b:KG {id: 'audioroute:device:mrdo_state.mrdo/sn1/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'device:mrdo_state.mrdo/sn2'}), (b:KG {id: 'audioroute:device:mrdo_state.mrdo/sn2/0'}) MERGE (a)-[r:HAS_AUDIO_ROUTE]->(b);
MATCH (a:KG {id: 'inputs:mrdo/P1'}), (b:KG {id: 'inputs:mrdo/P1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mrdo/P1'}), (b:KG {id: 'inputs:mrdo/P1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mrdo/P1'}), (b:KG {id: 'inputs:mrdo/P1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mrdo/P1'}), (b:KG {id: 'inputs:mrdo/P1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mrdo/P1'}), (b:KG {id: 'inputs:mrdo/P1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mrdo/P1'}), (b:KG {id: 'inputs:mrdo/P1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mrdo/P1'}), (b:KG {id: 'inputs:mrdo/P1/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mrdo/P1'}), (b:KG {id: 'inputs:mrdo/P1/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mrdo/P2'}), (b:KG {id: 'inputs:mrdo/P2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mrdo/P2'}), (b:KG {id: 'inputs:mrdo/P2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mrdo/P2'}), (b:KG {id: 'inputs:mrdo/P2/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mrdo/P2'}), (b:KG {id: 'inputs:mrdo/P2/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mrdo/P2'}), (b:KG {id: 'inputs:mrdo/P2/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mrdo/P2'}), (b:KG {id: 'inputs:mrdo/P2/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mrdo/P2'}), (b:KG {id: 'inputs:mrdo/P2/f6'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mrdo/P2'}), (b:KG {id: 'inputs:mrdo/P2/f7'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mrdo/DSW1'}), (b:KG {id: 'inputs:mrdo/DSW1/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mrdo/DSW1'}), (b:KG {id: 'inputs:mrdo/DSW1/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mrdo/DSW1'}), (b:KG {id: 'inputs:mrdo/DSW1/f2'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mrdo/DSW1'}), (b:KG {id: 'inputs:mrdo/DSW1/f3'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mrdo/DSW1'}), (b:KG {id: 'inputs:mrdo/DSW1/f4'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mrdo/DSW1'}), (b:KG {id: 'inputs:mrdo/DSW1/f5'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mrdo/DSW2'}), (b:KG {id: 'inputs:mrdo/DSW2/f0'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'inputs:mrdo/DSW2'}), (b:KG {id: 'inputs:mrdo/DSW2/f1'}) MERGE (a)-[r:HAS_FIELD]->(b);
MATCH (a:KG {id: 'region:mrdo/maincpu'}), (b:KG {id: 'rom:mrdo/maincpu/a4-01.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mrdo/maincpu'}), (b:KG {id: 'rom:mrdo/maincpu/c4-02.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mrdo/maincpu'}), (b:KG {id: 'rom:mrdo/maincpu/e4-03.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mrdo/maincpu'}), (b:KG {id: 'rom:mrdo/maincpu/f4-04.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mrdo/gfx1'}), (b:KG {id: 'rom:mrdo/gfx1/s8-09.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mrdo/gfx1'}), (b:KG {id: 'rom:mrdo/gfx1/u8-10.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mrdo/gfx2'}), (b:KG {id: 'rom:mrdo/gfx2/r8-08.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mrdo/gfx2'}), (b:KG {id: 'rom:mrdo/gfx2/n8-07.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mrdo/gfx3'}), (b:KG {id: 'rom:mrdo/gfx3/h5-05.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mrdo/gfx3'}), (b:KG {id: 'rom:mrdo/gfx3/k5-06.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mrdo/proms'}), (b:KG {id: 'rom:mrdo/proms/u02--2.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mrdo/proms'}), (b:KG {id: 'rom:mrdo/proms/t02--3.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mrdo/proms'}), (b:KG {id: 'rom:mrdo/proms/f10--1.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mrdo/proms'}), (b:KG {id: 'rom:mrdo/proms/j10--4.bin'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'region:mrdo/pal16r6'}), (b:KG {id: 'rom:mrdo/pal16r6/u001_pal16r6cn.j2'}) MERGE (a)-[r:LOADS]->(b);
MATCH (a:KG {id: 'device:mrdo_state.mrdo/maincpu/callback:maincpu:0'}), (b:KG {id: 'handler:mrdo_state.irq0_line_hold'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:mrdo_state.main_map'}), (b:KG {id: 'file:src/mame/universal/mrdo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b) SET r += {sourceFile: 'src/mame/universal/mrdo.cpp', sourceLine: 96, sourceColumn: 1, sourceEndLine: 113};
MATCH (a:KG {id: 'map:mrdo_state.main_map'}), (b:KG {id: 'map:mrdo_state.main_map/range0'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mrdo_state.main_map'}), (b:KG {id: 'map:mrdo_state.main_map/range1'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mrdo_state.main_map'}), (b:KG {id: 'map:mrdo_state.main_map/range2'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mrdo_state.main_map'}), (b:KG {id: 'map:mrdo_state.main_map/range3'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mrdo_state.main_map'}), (b:KG {id: 'map:mrdo_state.main_map/range4'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mrdo_state.main_map'}), (b:KG {id: 'map:mrdo_state.main_map/range5'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mrdo_state.main_map'}), (b:KG {id: 'map:mrdo_state.main_map/range6'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mrdo_state.main_map'}), (b:KG {id: 'map:mrdo_state.main_map/range7'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mrdo_state.main_map'}), (b:KG {id: 'map:mrdo_state.main_map/range8'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mrdo_state.main_map'}), (b:KG {id: 'map:mrdo_state.main_map/range9'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mrdo_state.main_map'}), (b:KG {id: 'map:mrdo_state.main_map/range10'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mrdo_state.main_map'}), (b:KG {id: 'map:mrdo_state.main_map/range11'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mrdo_state.main_map'}), (b:KG {id: 'map:mrdo_state.main_map/range12'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mrdo_state.main_map'}), (b:KG {id: 'map:mrdo_state.main_map/range13'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'map:mrdo_state.main_map'}), (b:KG {id: 'map:mrdo_state.main_map/range14'}) MERGE (a)-[r:HAS_RANGE]->(b);
MATCH (a:KG {id: 'device:mrdo_state.mrdo/screen/callback:screen:0'}), (b:KG {id: 'handler:mrdo_state.screen_update_mrdo'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_mrdo/e0'}), (b:KG {id: 'gfxlayout:charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_mrdo/e1'}), (b:KG {id: 'gfxlayout:charlayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'gfxdecode:gfx_mrdo/e2'}), (b:KG {id: 'gfxlayout:spritelayout'}) MERGE (a)-[r:USES_LAYOUT]->(b);
MATCH (a:KG {id: 'device:mrdo_state.mrdo/palette/callback:palette_init'}), (b:KG {id: 'handler:mrdo_state.palette_init'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'map:mrdo_state.main_map/range1'}), (b:KG {id: 'handler:mrdo_state.bgvideoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:mrdo_state.main_map/range2'}), (b:KG {id: 'handler:mrdo_state.fgvideoram_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:mrdo_state.main_map/range4'}), (b:KG {id: 'handler:mrdo_state.flipscreen_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:mrdo_state.main_map/range5'}), (b:KG {id: 'handler:sn76489_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'sn1'};
MATCH (a:KG {id: 'map:mrdo_state.main_map/range6'}), (b:KG {id: 'handler:sn76489_device.write'}) MERGE (a)-[r:WRITES]->(b) SET r += {deviceTag: 'sn2'};
MATCH (a:KG {id: 'map:mrdo_state.main_map/range7'}), (b:KG {id: 'handler:mrdo_state.protection_r'}) MERGE (a)-[r:READS]->(b);
MATCH (a:KG {id: 'map:mrdo_state.main_map/range13'}), (b:KG {id: 'handler:mrdo_state.scrollx_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'map:mrdo_state.main_map/range14'}), (b:KG {id: 'handler:mrdo_state.scrolly_w'}) MERGE (a)-[r:WRITES]->(b);
MATCH (a:KG {id: 'handler:mrdo_state.screen_update_mrdo'}), (b:KG {id: 'handler:mrdo_state.draw_sprites'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
MATCH (a:KG {id: 'gfxlayout:charlayout'}), (b:KG {id: 'file:src/mame/universal/mrdo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'gfxlayout:spritelayout'}), (b:KG {id: 'file:src/mame/universal/mrdo.cpp'}) MERGE (a)-[r:DEFINED_IN]->(b);
MATCH (a:KG {id: 'handler:mrdo_state.fgvideoram_w'}), (b:KG {id: 'handler:mrdo_state.protection_w'}) MERGE (a)-[r:CALLS_HANDLER]->(b);
